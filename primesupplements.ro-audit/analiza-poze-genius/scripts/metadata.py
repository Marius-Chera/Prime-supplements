# Pas 3: metadata pe toate pozele descărcate (înlocuiește exiftool, care nu e instalat pe PC).
# Citește: mod culoare/transparență, DPI, chunk-uri PNG (tEXt/iTXt: Software, XMP), EXIF, profil ICC,
# istoricul XMP (xmpMM:History = pașii din Photoshop), CreatorTool, C2PA (Content Credentials).
# Scrie date/metadata-<site>.json.  Utilizare: uv run --no-project --with pillow --with numpy --with c2pa-python python -I scripts/metadata.py genius
import sys, json, re, io, os
from PIL import Image, ExifTags
import numpy as np

site = sys.argv[1]
poze = json.load(open(f'date/{site}-poze.json', encoding='utf-8'))
try:
    import c2pa
except Exception:
    c2pa = None

def xmp_fields(x):
    def grab(tag):
        m = re.findall(rf'{tag}="([^"]*)"', x) + re.findall(rf'<{tag}>([^<]*)</{tag}>', x)
        return m
    hist = re.findall(r'stEvt:action="([^"]*)"[^>]*?stEvt:softwareAgent="([^"]*)"', x)
    hist += [(a, s) for s, a in re.findall(r'stEvt:softwareAgent="([^"]*)"[^>]*?stEvt:action="([^"]*)"', x)]
    hist_li = re.findall(r'<stEvt:action>([^<]*)</stEvt:action>.*?<stEvt:softwareAgent>([^<]*)</stEvt:softwareAgent>', x, re.S)
    return {
        'CreatorTool': grab('xmp:CreatorTool'),
        'CreateDate': grab('xmp:CreateDate')[:1],
        'ModifyDate': grab('xmp:ModifyDate')[:1],
        'DocumentAncestors': len(re.findall(r'<rdf:li>(?:xmp\.did|adobe:docid|uuid)', x)),
        'History': (hist or hist_li)[:40],
        'ColorMode': grab('photoshop:ColorMode'),
        'ICCProfile': grab('photoshop:ICCProfile'),
        'Layers': grab('photoshop:LayerName')[:20],
        'TextLayers': grab('photoshop:LayerText')[:20],
        'Format': grab('dc:format'),
        'DigitalSourceType': grab('Iptc4xmpExt:DigitalSourceType'),
        'firefly_or_genai': bool(re.search(r'firefly|generative|trainedAlgorithmicMedia|compositeWithTrainedAlgorithmicMedia', x, re.I)),
        'keystring_3d': re.findall(r'(KeyShot|Blender|Cinema 4D|Maxon|Redshift|Octane|V-Ray|Corona|Substance|Dimension|Pacdora|Esko|Studio Store Visualizer)', x, re.I)[:10],
    }

rez = []
for p in poze:
    f = p['fisier']
    d = {k: p.get(k) for k in ('handle', 'idx', 'url', 'alt', 'w', 'h', 'format', 'bytes', 'fisier')}
    raw = open(f, 'rb').read()
    im = Image.open(io.BytesIO(raw))
    d['mode'] = im.mode
    d['dpi'] = [round(float(v)) for v in im.info.get('dpi', ())] or None
    # transparență: există pixeli cu alfa < 255?
    d['transparent'] = False
    if im.mode in ('RGBA', 'LA') or 'transparency' in im.info:
        a = np.asarray(im.convert('RGBA'))[:, :, 3]
        d['transparent'] = bool((a < 250).any())
        d['alfa_pct_transparent'] = round(float((a < 10).mean() * 100), 1)
        d['alfa_pct_semitransparent'] = round(float(((a >= 10) & (a < 245)).mean() * 100), 2)
    # culoarea colțurilor (fundal)
    rgb = np.asarray(im.convert('RGB'))
    h, w = rgb.shape[:2]
    corners = [rgb[5, 5], rgb[5, w - 6], rgb[h - 6, 5], rgb[h - 6, w - 6]]
    d['colturi_rgb'] = [list(map(int, c)) for c in corners]
    # chunk-uri text PNG / info
    info = {k: (v if isinstance(v, (str, int, float)) else str(v)[:80]) for k, v in im.info.items() if k not in ('icc_profile', 'exif', 'XML:com.adobe.xmp', 'xmp')}
    d['info'] = {k: (v[:200] if isinstance(v, str) else v) for k, v in info.items()}
    # ICC
    icc = im.info.get('icc_profile')
    if icc:
        m = re.search(rb'desc.{8}(.{4})', icc)
        try:
            from PIL import ImageCms
            prof = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            d['icc'] = ImageCms.getProfileDescription(prof).strip()
        except Exception:
            d['icc'] = 'prezent (necitit)'
    else:
        d['icc'] = None
    # EXIF
    try:
        ex = im.getexif()
        d['exif'] = {ExifTags.TAGS.get(k, k): str(v)[:120] for k, v in ex.items()}
    except Exception:
        d['exif'] = {}
    # XMP: din info sau căutat brut în fișier
    xmp = im.info.get('XML:com.adobe.xmp') or im.info.get('xmp')
    if isinstance(xmp, bytes):
        xmp = xmp.decode('utf-8', 'ignore')
    if not xmp:
        m = re.search(rb'<x:xmpmeta.*?</x:xmpmeta>', raw, re.S)
        xmp = m.group(0).decode('utf-8', 'ignore') if m else None
    d['xmp_len'] = len(xmp) if xmp else 0
    d['xmp'] = xmp_fields(xmp) if xmp else None
    # semnături brute în fișier (Photoshop "8BIM", "Adobe", "Photoshop", "GIMP", "Canva", tinypng etc.)
    d['semnaturi'] = sorted(set(s.decode('latin1') for s in re.findall(rb'(Adobe Photoshop[^\x00<"]{0,40}|Photoshop|Adobe ImageReady|GIMP[^\x00]{0,10}|Canva|Figma|Affinity|Lightroom|Capture One|KeyShot|Blender|Cinema 4D|Firefly|Midjourney|DALL|Stable Diffusion|tinypng|ImageOptim|Shopify|c2pa|jumbf|8BIM)', raw[:400000] + raw[-200000:])))[:15]
    # C2PA
    d['c2pa'] = None
    if c2pa:
        try:
            with c2pa.Reader(f) as r:
                d['c2pa'] = json.loads(r.json())
        except Exception as e:
            d['c2pa'] = f'nimic ({type(e).__name__})'
    rez.append(d)
    x = d['xmp'] or {}
    print(p['handle'], p['idx'], d['mode'], 'transp' if d['transparent'] else 'opac', d['icc'], d['dpi'], 'XMP' if d['xmp_len'] else '-', (x.get('CreatorTool') or [''])[:1], len(x.get('History') or []), d['semnaturi'][:5], 'C2PA' if isinstance(d['c2pa'], dict) else '')

json.dump(rez, open(f'date/metadata-{site}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
