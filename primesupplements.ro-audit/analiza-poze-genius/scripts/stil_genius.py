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
ap.add_argument('--imbunatatire', type=float, default=0)  # 0 = fără; 1 = contrast +5 %, culoare +6 %, claritate (unsharp 60 %)
ap.add_argument('--masca', default=None)                  # opțional: salvează masca pentru verificare
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
if a.imbunatatire > 0:
    # „enhance” discret, aplicat doar pe produs, la rezoluția finală: contrast, culoare, claritate (unsharp mask)
    from PIL import ImageEnhance
    k = a.imbunatatire
    alpha_p = prod.getchannel('A')
    rgb_p = prod.convert('RGB')
    rgb_p = ImageEnhance.Contrast(rgb_p).enhance(1 + 0.05 * k)
    rgb_p = ImageEnhance.Color(rgb_p).enhance(1 + 0.06 * k)
    rgb_p = rgb_p.filter(ImageFilter.UnsharpMask(radius=2, percent=int(60 * k), threshold=2))
    prod = rgb_p.convert('RGBA'); prod.putalpha(alpha_p)
x0 = (L - pw) // 2
y_contact = int(L * 0.80)          # linia podelei (ca la Genius: produsul jos-centru, reflexia sub el)
y0 = y_contact - ph

canvas = Image.new('RGBA', (L, L), (255, 255, 255, 255))

# ---------- 3. Reflexie pe podea, oglindită PE FIECARE COLOANĂ față de baza reală a obiectului ----------
# (la borcane baza e o curbă, la cutiile așezate pe colț baza e în „V”: un simplu flip ar lăsa obiectul să „plutească”)
P = np.asarray(prod).astype(np.float32)
A_ = P[:, :, 3]
has = (A_ > 128).any(axis=0)
yb = np.where(has, ph - 1 - np.argmax((A_ > 128)[::-1], axis=0), -1)   # ultimul rând opac pe fiecare coloană
rh = int(ph * 0.34)
R = np.zeros((L, L, 4), np.float32)
D = np.full((L, L), -1.0, np.float32)            # distanța față de bază (pentru fade și blur)
cols = np.where(has)[0]
for dd in range(rh):
    src = yb[cols] - dd
    ok = src >= 0
    c = cols[ok]; s_ = src[ok]
    dy = y0 + yb[c] + 1 + dd
    inb = dy < L
    c, s_, dy = c[inb], s_[inb], dy[inb]
    R[dy, x0 + c] = P[s_, c]
    D[dy, x0 + c] = dd / rh
fade = np.where(D >= 0, np.clip(1 - D, 0, 1) ** 1.6 * a.reflexie, 0)
R[:, :, 3] *= fade
Rimg = Image.fromarray(np.clip(R, 0, 255).astype(np.uint8), 'RGBA')
Rblur = Rimg.filter(ImageFilter.GaussianBlur(6))
w = Image.fromarray((np.clip(D * 1.4, 0, 1) * 255).astype(np.uint8))   # blur crescător cu distanța
canvas.alpha_composite(Image.composite(Rblur, Rimg.filter(ImageFilter.GaussianBlur(0.7)), w))

# ---------- 4. Umbre: umbră moale largă + umbră de contact care urmează baza ----------
sh = Image.new('L', (L, L), 0)
d = ImageDraw.Draw(sh)
d.ellipse((x0 - pw * 0.04, y_contact - pw * 0.035, x0 + pw * 1.04, y_contact + pw * 0.05), fill=60)
sh = sh.filter(ImageFilter.GaussianBlur(pw * 0.045))
cm = np.zeros((L, L), np.uint8)
cc = cols[(yb[cols] >= 0)]
cy = np.clip(y0 + yb[cc], 0, L - 1)
inner = (cc > pw * 0.02) & (cc < pw * 0.98)      # nu înnegrim colțurile extreme
cm[cy[inner], x0 + cc[inner]] = 255
sh2 = Image.fromarray(cm).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(max(2, pw * 0.008))).point(lambda v: int(min(255, v * 1.6) * 0.6))
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
