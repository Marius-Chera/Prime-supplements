# Analiza zgomotului: abaterea standard a reziduului trece-sus (imagine - blur 3x3) în zona centrală a produsului.
# Foto reală (senzor) => zgomot > ~1.0; randare 3D curată => ~0.2-0.6. Scrie date/zgomot.json
import json, sys
from PIL import Image, ImageFilter
import numpy as np
rez = {}
for site in ('genius', 'prime'):
    for p in json.load(open(f'date/{site}-poze.json', encoding='utf-8')):
        im = Image.open(p['fisier']).convert('L')
        w, h = im.size
        s = 1200 / w
        im = im.resize((1200, int(h * s)), Image.BOX) if w > 1200 else im
        a = np.asarray(im, dtype=np.float32)
        b = np.asarray(im.filter(ImageFilter.BoxBlur(1)), dtype=np.float32)
        r = a - b
        H, W = a.shape
        # blocuri 24x24 din centrul imaginii; păstrăm cele mai "plate" 10% (zone uniforme de ambalaj/fundal ne-alb)
        vals = []
        for y in range(int(H*.25), int(H*.85)-24, 24):
            for x in range(int(W*.25), int(W*.75)-24, 24):
                blk = a[y:y+24, x:x+24]
                if 15 < blk.mean() < 240:
                    vals.append((blk.std(), r[y:y+24, x:x+24].std()))
        vals.sort()
        flat = [v[1] for v in vals[:max(5, len(vals)//10)]]
        rez[f"{site}/{p['handle']}#{p['idx']}"] = round(float(np.median(flat)), 3) if flat else None
json.dump(rez, open('date/zgomot.json', 'w'), indent=1)
for site in ('genius', 'prime'):
    v = [x for k, x in rez.items() if k.startswith(site) and x is not None]
    print(site, 'mediana', round(float(np.median(v)), 3), 'min', min(v), 'max', max(v), 'n', len(v))
