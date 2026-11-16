# Varianta E: automatizare în serie (Python + Pillow + numpy), fără unelte plătite.
# Ia o poză de produs (PNG transparent SAU JPG pe fundal uniform deschis) și produce un packshot în stilul
# „studio alb lucios”: fundal alb pur, produs centrat la înălțime fixă, umbră de contact + umbră moale,
# reflexie pe podea cu fade în gradient și blur progresiv, plus luciu discret (2 benzi verticale de lumină).
# Eticheta NU se deformează: produsul e doar scalat uniform (fără warp); benzile de lumină sunt sub 14 % opacitate.
#
# Utilizare:
#   uv run --no-project --with pillow --with numpy --with scipy python -I -X utf8 scripts/stil_genius.py IN OUT [--lucios 0..1] [--latura 2000]
import sys, argparse
from PIL import Image, ImageFilter, ImageChops, ImageDraw
import numpy as np
from scipy import ndimage

ap = argparse.ArgumentParser()
ap.add_argument('intrare'); ap.add_argument('iesire')
ap.add_argument('--latura', type=int, default=2000)        # 2000x2000 px
ap.add_argument('--inaltime', type=float, default=0.70)    # produsul ocupă 70 % din înălțimea cadrului (fără reflexie)
ap.add_argument('--lucios', type=float, default=1.0)       # 0 = fără benzi de lumină
ap.add_argument('--reflexie', type=float, default=0.22)    # opacitatea reflexiei la contact
ap.add_argument('--toleranta', type=float, default=22)     # diferența față de fundal la decupare (55 pentru produse închise la culoare)
ap.add_argument('--eroziune', type=int, default=3)         # px tăiați de pe margine (anti-halou)
ap.add_argument('--umbra_lum', type=float, default=256)    # 256 = oprit; altfel: gri desaturat mai deschis de atât = fundal (taie și luciul de pe margini!)
ap.add_argument('--masca', default=None)                   # opțional: salvează masca pentru verificare
ap.add_argument('--decupat', default=None)                 # opțional: salvează și PNG-ul transparent decupat strâns (pentru efecte CSS)
a = ap.parse_args()

src = Image.open(a.intrare)
src.load()

# ---------- 1. Decupare ----------
if src.mode in ('RGBA', 'LA') and np.asarray(src.convert('RGBA'))[:, :, 3].min() < 250:
    rgba = src.convert('RGBA')  # are deja transparență
else:
    rgb = np.asarray(src.convert('RGB')).astype(np.int16)
    h, w = rgb.shape[:2]
    border = np.concatenate([rgb[:8].reshape(-1, 3), rgb[-8:].reshape(-1, 3), rgb[:, :8].reshape(-1, 3), rgb[:, -8:].reshape(-1, 3)])
    bg = np.median(border, axis=0)
    dist = np.abs(rgb - bg).max(axis=2)
    cand = dist < a.toleranta                       # pixeli „cât fundalul”
    # + umbra/reflexia gri de pe masa de studio (deschisă la culoare și fără saturație)
    lum = rgb.mean(axis=2); sat = rgb.max(axis=2) - rgb.min(axis=2)
    cand |= (lum > a.umbra_lum) & (sat < 14)
    lab, _ = ndimage.label(cand)
    margini = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    fundal = np.isin(lab, margini[margini > 0])     # doar fundalul legat de margini (nu golurile din etichetă)
    obiect = ~fundal
    obiect = ndimage.binary_opening(obiect, iterations=2)
    obiect = ndimage.binary_fill_holes(obiect)
    # reflexia produsului în masa lucioasă de studio (sub bază): în ultimele 12 % din înălțime, tăiem pixelii deschiși și puțin saturați
    ys = np.where(obiect.any(axis=1))[0]
    if len(ys):
        y_cut = int(ys.max() - (ys.max() - ys.min()) * 0.12)
        jos = np.zeros_like(obiect); jos[y_cut:] = True
        obiect &= ~(jos & (lum > 110) & (sat < 32))
        obiect = ndimage.binary_opening(obiect, iterations=2)
    obiect = ndimage.binary_erosion(obiect, iterations=a.eroziune)  # tăiem franjul gri de pe margine
    # păstrăm cea mai mare componentă (produsul)
    lab2, n2 = ndimage.label(obiect)
    if n2 > 1:
        sizes = ndimage.sum(obiect, lab2, range(1, n2 + 1))
        obiect = lab2 == (np.argmax(sizes) + 1)
    alpha = Image.fromarray((obiect * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
    rgba = src.convert('RGB').convert('RGBA'); rgba.putalpha(alpha)
    if a.masca: alpha.save(a.masca)

bbox = rgba.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox()
prod = rgba.crop(bbox)
if a.decupat:
    t = prod.copy(); t.thumbnail((1200, 1200), Image.LANCZOS); t.save(a.decupat, optimize=True)

# ---------- 2. Scalare uniformă (fără deformare) și poziționare ----------
L = a.latura
ph = int(L * a.inaltime)
pw = int(prod.width * ph / prod.height)
if pw > L * 0.82:
    pw = int(L * 0.82); ph = int(prod.height * pw / prod.width)
prod = prod.resize((pw, ph), Image.LANCZOS)
x0 = (L - pw) // 2
y_contact = int(L * 0.80)          # linia podelei (ca la Genius: produsul jos-centru, reflexia sub el)
y0 = y_contact - ph

canvas = Image.new('RGBA', (L, L), (255, 255, 255, 255))

# ---------- 3. Reflexie pe podea: flip vertical + fade + blur progresiv ----------
refl = prod.transpose(Image.FLIP_TOP_BOTTOM)
rh = int(ph * 0.34)
refl = refl.crop((0, 0, pw, rh))
# blur progresiv: 3 benzi cu blur crescător (podea „semi-lucioasă”)
parts = []
for i, rad in enumerate((0.6, 2.5, 5.5)):
    y1, y2 = int(rh * i / 3), int(rh * (i + 1) / 3)
    parts.append(refl.filter(ImageFilter.GaussianBlur(rad)).crop((0, y1, pw, y2)))
refl2 = Image.new('RGBA', (pw, rh))
yy = 0
for pimg in parts:
    refl2.paste(pimg, (0, yy)); yy += pimg.height
grad = np.linspace(a.reflexie, 0, rh) ** 1.4 / (a.reflexie ** 0.4)
grad = np.clip(grad, 0, 1)
ra = np.asarray(refl2.getchannel('A')).astype(np.float32) * grad[:, None]
refl2.putalpha(Image.fromarray(ra.astype(np.uint8)))
canvas.alpha_composite(refl2, (x0, y_contact - 2))

# ---------- 4. Umbre: umbră moale largă + umbră de contact strânsă ----------
sh = Image.new('L', (L, L), 0)
d = ImageDraw.Draw(sh)
d.ellipse((x0 - pw * 0.04, y_contact - pw * 0.035, x0 + pw * 1.04, y_contact + pw * 0.05), fill=70)
sh = sh.filter(ImageFilter.GaussianBlur(pw * 0.045))
sh2 = Image.new('L', (L, L), 0)
d2 = ImageDraw.Draw(sh2)
d2.ellipse((x0 + pw * 0.04, y_contact - pw * 0.012, x0 + pw * 0.96, y_contact + pw * 0.014), fill=150)
sh2 = sh2.filter(ImageFilter.GaussianBlur(pw * 0.009))
shadow = ImageChops.lighter(sh, sh2)
black = Image.new('RGBA', (L, L), (0, 0, 0, 255)); black.putalpha(shadow)
canvas.alpha_composite(black)

# ---------- 5. Produsul + luciu discret (benzi verticale de lumină, ca softbox-urile dintr-un studio) ----------
canvas.alpha_composite(prod, (x0, y0))
if a.lucios > 0:
    xs = np.linspace(0, 1, pw)
    def banda(c, lat, op):
        return op * np.exp(-((xs - c) / lat) ** 2)
    prof = banda(0.18, 0.045, 0.14) + banda(0.80, 0.03, 0.10) + banda(0.50, 0.25, 0.03)
    prof = np.clip(prof * a.lucios, 0, 0.2)
    m = np.tile(prof[None, :], (ph, 1))
    # atenuare sus/jos ca să nu „ardă” marginile
    vy = np.clip(np.sin(np.linspace(0, np.pi, ph)) * 1.3, 0, 1)[:, None]
    m = m * vy * (np.asarray(prod.getchannel('A')).astype(np.float32) / 255)
    light = Image.new('RGBA', (pw, ph), (255, 255, 255, 0))
    light.putalpha(Image.fromarray((m * 255).astype(np.uint8)))
    canvas.alpha_composite(light, (x0, y0))
    # contur luminos fin pe margini (rim light): margine alfa erodată, foarte discret
    al = prod.getchannel('A')
    rim = ImageChops.subtract(al, al.filter(ImageFilter.MinFilter(5))).filter(ImageFilter.GaussianBlur(1.5))
    rim = rim.point(lambda v: int(v * 0.22 * a.lucios))
    rl = Image.new('RGBA', (pw, ph), (255, 255, 255, 0)); rl.putalpha(rim)
    canvas.alpha_composite(rl, (x0, y0))

out = canvas.convert('RGB')
if a.iesire.lower().endswith('.webp'):
    out.save(a.iesire, 'WEBP', quality=86, method=6)
else:
    out.save(a.iesire, quality=90, optimize=True, progressive=True)
print('ok', a.iesire, out.size)
