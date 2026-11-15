import sys, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
D = sys.argv[1]
logo = Image.open(os.path.join(D, 'logo.png')).convert('RGBA')
F_BIG = 'C:/Windows/Fonts/impact.ttf'
F_TXT = 'C:/Windows/Fonts/arialbd.ttf'
RED = (236, 30, 36)

def cover(im, W, H):
    r = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    x = (im.width - W) // 2; y = (im.height - H) // 2
    return im.crop((x, y, x + W, y + H))

def band(im, top, h):
    W = im.width
    ov = Image.new('RGBA', im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    # fade above the band
    for i in range(60):
        a = int(170 * (i / 60))
        d.line([(0, top - 60 + i), (W, top - 60 + i)], fill=(0, 0, 0, a))
    d.rectangle([0, top, W, top + h], fill=(0, 0, 0, 215))
    d.rectangle([0, top, W, top + 6], fill=RED + (255,))
    im = Image.alpha_composite(im.convert('RGBA'), ov)
    d = ImageDraw.Draw(im)
    # logo left
    lw = 230; lg = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
    im.alpha_composite(lg, (48, top + (h - lg.height) // 2 + 3))
    # "CODUL MEU:" + empty white box
    ft = ImageFont.truetype(F_BIG, 46)
    tx = 330; ty = top + (h - 56) // 2 + 3
    d.text((tx, ty), 'CODUL MEU:', font=ft, fill=(255, 255, 255))
    bx = tx + d.textlength('CODUL MEU:', font=ft) + 22
    d.rounded_rectangle([bx, top + 30, W - 48, top + h - 24], radius=14, fill=(255, 255, 255), outline=RED, width=4)
    return im.convert('RGB')

for name in sorted(os.listdir(os.path.join(D, 'raw'))):
    if not name.endswith('.png'): continue
    im = Image.open(os.path.join(D, 'raw', name)).convert('RGB')
    if 'story' in name:
        im = cover(im, 1080, 1920); im = band(im, 1470, 170)
    else:
        im = cover(im, 1080, 1350); im = band(im, 1350 - 170, 170)
    out = os.path.join(D, 'out', 'afiliati-2026-11-' + name.replace('.png', '.jpg'))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.save(out, 'JPEG', quality=90, optimize=True, progressive=True)
    im.resize((im.width // 3, im.height // 3)).save(out.replace('.jpg', '-mic.jpg').replace(os.sep + 'out' + os.sep, os.sep + 'prev' + os.sep) if False else os.path.join(D, 'prev', name.replace('.png', '.jpg')), 'JPEG', quality=80) if os.makedirs(os.path.join(D, 'prev'), exist_ok=True) is None else None
    print('ok', out)
