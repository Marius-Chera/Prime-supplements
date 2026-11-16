# Decupare cu AI open-source, local și gratuit (rembg + modelul isnet-general-use, ~180 MB, descărcat o singură dată în ~/.u2net).
# Recunoaște forma produsului, deci nu taie reflexiile gri de pe plasticul negru (ca decuparea după culoare).
# Utilizare: uv run --no-project --with "rembg[cpu]" --with pillow python -I -X utf8 scripts/decupare_ai.py FOLDER_INTRARE FOLDER_IESIRE
import sys, glob, os, re
from rembg import remove, new_session
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
s = new_session('isnet-general-use')
for f in sorted(glob.glob(os.path.join(src, '*.png')) + glob.glob(os.path.join(src, '*.jpg'))):
    nume = re.sub(r'[^a-z0-9]+', '-', os.path.splitext(os.path.basename(f))[0].lower()).strip('-')
    out = remove(Image.open(f).convert('RGB'), session=s, post_process_mask=True)
    out.save(os.path.join(dst, nume + '.png'))
    print('ok', nume)
