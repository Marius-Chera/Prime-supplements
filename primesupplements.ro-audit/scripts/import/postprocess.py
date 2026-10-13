"""bodies4 -> bodies5: cart permalinks become product links; two pre-existing dead article links repointed."""
import json, re, sys, os
S = sys.argv[1]
vm = json.load(open(S + '/import/variant-map.json'))
DEAD = {'/blogs/news/ovaz-instant-secrete-nutritie-crema-ovaz-energy': '/products/instant-oat-cream-800g-25-serv',
        '/blogs/news/instant-oat-cream-800g-25-serv-healthy-eating-on-budget': '/products/instant-oat-cream-800g-25-serv'}
os.makedirs(S + '/bodies5', exist_ok=True)
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
    open(S + '/bodies5/' + os.path.basename(src), 'w', encoding='utf-8').write(b)
print(tot)
