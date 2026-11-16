# Consistența încadrării: cât din cadru ocupă produsul (bounding box al pixelilor diferiți de fundal),
# unde e centrul, culoarea fundalului. Doar poza principală (#1). Scrie date/incadrare.json
import json
from PIL import Image
import numpy as np
rez = {}
for site in ('genius', 'prime'):
    for p in json.load(open(f'date/{site}-poze.json', encoding='utf-8')):
        if p['idx'] != 1: continue
        im = Image.open(p['fisier']).convert('RGB'); im.thumbnail((800, 800))
        a = np.asarray(im).astype(int)
        bg = np.median(np.concatenate([a[:6].reshape(-1, 3), a[-6:].reshape(-1, 3), a[:, :6].reshape(-1, 3), a[:, -6:].reshape(-1, 3)]), axis=0)
        diff = np.abs(a - bg).sum(axis=2) > 30
        ys, xs = np.where(diff)
        if len(xs) == 0: continue
        H, W = diff.shape
        rez[f"{site}/{p['handle']}"] = dict(fundal=[int(v) for v in bg], latime_pct=round((xs.max()-xs.min())/W*100), inaltime_pct=round((ys.max()-ys.min())/H*100),
            centru_x_pct=round((xs.max()+xs.min())/2/W*100), sus_pct=round(ys.min()/H*100), jos_pct=round(ys.max()/H*100))
json.dump(rez, open('date/incadrare.json', 'w'), indent=1)
for site in ('genius', 'prime'):
    v = [x for k, x in rez.items() if k.startswith(site)]
    h = [x['inaltime_pct'] for x in v]
    print(site, 'n', len(v), 'înălțime produs % cadru: medie', round(np.mean(h)), 'min', min(h), 'max', max(h), 'abatere', round(float(np.std(h)), 1),
          '| fundaluri:', sorted(set(tuple(x['fundal']) for x in v))[:6])
