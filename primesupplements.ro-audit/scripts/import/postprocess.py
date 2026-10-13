"""bodies4 -> bodies5: cart permalinks become product links; two pre-existing dead article links repointed."""
import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from headings2 import fix_tokens
S = sys.argv[1]
vm = json.load(open(S + '/import/variant-map.json'))
DEAD = {'/blogs/news/ovaz-instant-secrete-nutritie-crema-ovaz-energy': '/products/instant-oat-cream-800g-25-serv',
        '/blogs/news/instant-oat-cream-800g-25-serv-healthy-eating-on-budget': '/products/instant-oat-cream-800g-25-serv'}
os.makedirs(S + '/bodies5', exist_ok=True)
ALTS = json.load(open(S + '/import/empty-alts.json'))
BROKEN = set(ALTS.pop('broken', []))
import html as _html
def images(b, tot):
    # 1) drop paragraphs that only hold a broken (404) image
    for u in BROKEN:
        b, n = re.subn(r'<p>\s*<img\b[^>]*src="' + re.escape(_html.escape(u, quote=True)).replace('&amp;', '(?:&amp;|&)') + r'"[^>]*>\s*</p>\s*', '', b)
        if not n: b, n = re.subn(r'<p>\s*<img\b[^>]*src="' + re.escape(u) + r'"[^>]*>\s*</p>\s*', '', b)
        tot['broken_img_removed'] = tot.get('broken_img_removed', 0) + n
    def fix(m):
        tag = m.group(0)
        src = re.search(r'src="([^"]+)"', tag)
        if not src: return tag
        u = _html.unescape(src.group(1))
        # 2) empty alt -> reviewed alt text written from the image itself
        a = re.search(r'\salt="([^"]*)"', tag)
        if (not a or not a.group(1).strip()) and u in ALTS:
            alt = _html.escape(ALTS[u], quote=True)
            tag = re.sub(r'\salt="[^"]*"', f' alt="{alt}"', tag) if a else tag.replace('<img', f'<img alt="{alt}"', 1)
            tot['alt_filled'] = tot.get('alt_filled', 0) + 1
        # 3) request a rendition close to the displayed size instead of the original upload
        if 'cdn.shopify.com/s/files/' in u and 'width=' not in u:
            st = re.search(r'style="([^"]*)"', tag); st = st.group(1) if st else ''
            w = re.search(r'(?<![-\w])width:\s*(\d+)px', st)
            px = min(int(w.group(1)) * 2, 1600) if w else 1600
            new = u + ('&' if '?' in u else '?') + f'width={px}'
            tag = tag.replace(src.group(0), 'src="' + _html.escape(new, quote=True).replace('&#x27;', "'") + '"')
            tot['width_param'] = tot.get('width_param', 0) + 1
        return tag
    return re.sub(r'<img\b[^>]*>', fix, b)
items = json.load(open(S + '/repair/items.json'))
tot = {'cart': 0, 'dead': 0, 'missing': 0}
for it in items:
    src = it['out']
    if not os.path.exists(src): tot['missing'] += 1; continue
    b = open(src, encoding='utf-8').read()
    def rep(m):
        h = vm.get(m.group(1))
        if not h: raise SystemExit('unknown variant ' + m.group(1))
        tot['cart'] += 1
        return f'href="/products/{h}"'
    b = re.sub(r'href="/cart/(\d+):1"', rep, b)
    for k, v in DEAD.items():
        n = b.count(f'href="{k}"'); tot['dead'] += n
        b = b.replace(f'href="{k}"', f'href="{v}"')
    b, n = re.subn(r'^(?:\s*</div>)+\s*', '', b)  # stray leading close tags left by the earlier cleanup; Shopify drops them anyway
    tot['stray'] = tot.get('stray', 0) + n
    # BlogGenAuto 'closes' headings with a second opening tag (<h2>T<h2></h2></h2>): repair, then drop empty attribute-less headings
    b, c, d, u = fix_tokens(b)
    b, e = re.subn(r'<(h[1-6])>\s*</\1>', '', b)
    tot['heading_closed'] = tot.get('heading_closed', 0) + c; tot['stray_closers'] = tot.get('stray_closers', 0) + d; tot['empty_headings'] = tot.get('empty_headings', 0) + e
    b = images(b, tot)
    open(S + '/bodies5/' + os.path.basename(src), 'w', encoding='utf-8').write(b)
print(tot)
