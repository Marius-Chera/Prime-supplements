"""Validate repaired article bodies (bodies4) against the finalized ones (bodies3) before import."""
import json, re, sys, os, glob, html
sys.path.insert(0, sys.argv[1] + '/scripts')
from html_balance import score
S = sys.argv[1]
BODYDIR = sys.argv[2] if len(sys.argv) > 2 else 'bodies4'
items = json.load(open(S + '/repair/items.json'))
plan = json.load(open(S + '/plan/blog-consolidation.json'))
kept_final = {i['final_handle'] for i in items}
prods = json.load(open(S + '/recon/shopify/products-all.json'))
prods = prods if isinstance(prods, list) else prods.get('products', prods.get('nodes', []))
prod_handles = {p['handle'] for p in prods if (p.get('status') or 'ACTIVE').upper() == 'ACTIVE'} | set(json.load(open(S + '/import/variant-map.json')).values())
cols = json.load(open('/home/user/Prime-supplements/primesupplements.ro-audit/applied/collections-plan.json'))
cols = cols if isinstance(cols, list) else cols.get('collections', [])
col_handles = {c['handle'] for c in cols}
pages = {'autor-marius-chera', 'contact', 'despre-noi', 'politica-de-livrare', 'politica-de-retur', 'termeni-si-conditii', 'inregistrare-b2b'}
report = []
for it in items:
    b3 = it['body']; b4 = os.path.join(S, BODYDIR, os.path.basename(it['out']))
    row = {'handle': it['handle'], 'final': it['final_handle'], 'problems': []}
    if not os.path.exists(b4):
        row['problems'].append('MISSING bodies4'); report.append(row); continue
    o, n = open(b3, encoding='utf-8').read(), open(b4, encoding='utf-8').read()
    P = row['problems']
    if score(b4) > score(b3): P.append(f'html balance worse {score(b3)}->{score(b4)}')
    ratio = len(n) / max(1, len(o))
    row['ratio'] = round(ratio, 3)
    if ratio < 0.6: P.append(f'body shrank to {ratio:.0%}')
    for pat, name in [(r'myshopify\.com', 'myshopify'), (r'(?i)bloggenauto|bloggenai', 'bloggen'), (r'Published:', 'Published:'),
                      (r'<script', 'script'), (r'application/ld\+json', 'jsonld'), (r'href="[^"]*/cart/', 'cart link'),
                      (r'Key Takeaways|Table of Contents', 'english label'), (r'<h1', 'h1')]:
        c = len(re.findall(pat, re.sub(r'<!--.*?-->', '', n, flags=re.S)))
        if c: P.append(f'{name} x{c}')
    for tag in ['<img', '<table', 'class="author author-box"']:
        if n.count(tag) < o.count(tag): P.append(f'{tag} {o.count(tag)}->{n.count(tag)}')
    if 'nu înlocuiesc sfatul medicului' not in n and 'nu inlocuiesc sfatul medicului' not in n: P.append('disclaimer missing')
    yrs = re.findall(r'<h[2-4][^>]*>[^<]*\b202[56]\b', n)
    if yrs: P.append(f'year in heading x{len(yrs)}')
    for h in re.findall(r'href="([^"]+)"', n):
        u = html.unescape(h)
        m = re.match(r'(?:https?://(?:www\.)?primesupplements\.ro)?/(blogs/news|products|collections|pages)/([^/?#"]+)', u)
        if not m: continue
        kind, hd = m.group(1), m.group(2)
        ok = (kind == 'blogs/news' and hd in kept_final) or (kind == 'products' and hd in prod_handles) or \
             (kind == 'collections' and hd in col_handles) or (kind == 'pages' and hd in pages)
        if not ok: P.append(f'link? /{kind}/{hd}')
    report.append(row)
bad = [r for r in report if r['problems']]
json.dump(report, open(S + '/import/validate-report.json', 'w'), ensure_ascii=False, indent=1)
print('items', len(report), 'with problems', len(bad))
from collections import Counter
cnt = Counter(p.split(' ')[0] if not p.startswith('link?') else 'link?' for r in bad for p in r['problems'])
print(cnt.most_common())
for r in bad[:25]: print(r['handle'][:60], r.get('ratio'), r['problems'][:6])
