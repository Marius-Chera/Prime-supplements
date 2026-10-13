"""live_check.py S handle...: check imported articles on the storefront (cache-busted)."""
import sys, subprocess, re, json, random, html, os
S = sys.argv[1]
items = {i['final_handle']: i for i in json.load(open(S + '/repair/items.json'))}
bad = 0
home = subprocess.run(['curl', '-sS', '-A', 'Mozilla/5.0', '--max-time', '60', f'https://primesupplements.ro/?cb={random.randint(1, 10**9)}'], capture_output=True, text=True).stdout
B_MS, B_BG = home.count('myshopify.com'), len(re.findall('(?i)bloggenauto|bloggenai', home))
for h in sys.argv[2:]:
    u = f'https://primesupplements.ro/blogs/news/{h}?cb={random.randint(1, 10**9)}'
    b = subprocess.run(['curl', '-sS', '-A', 'Mozilla/5.0', '--max-time', '60', u], capture_output=True, text=True).stdout
    want = open(f"{S}/bodies5/{os.path.basename(items[h]['out'])}", encoding='utf-8').read()
    # a distinctive sentence from the intended body must be on the page
    txt = [t.strip() for t in re.split(r'<[^>]+>', want) if len(t.strip()) > 80]
    probe = html.unescape(txt[len(txt) // 2])[:70] if txt else ''
    page = html.unescape(b)
    r = {'myshopify': b.count('myshopify.com') - B_MS, 'bloggen': len(re.findall('(?i)bloggenauto|bloggenai', b)) - B_BG, 'Published:': b.count('Published:'),
         '/cart/ link': len(re.findall(r'href="/cart/\d', b)), 'disclaimer': 'nu înlocuiesc sfatul medicului' in page, 'body probe': probe in page}
    ok = not (r['myshopify'] or r['bloggen'] or r['Published:'] or r['/cart/ link']) and r['disclaimer'] and r['body probe']
    bad += not ok
    print('OK  ' if ok else 'FAIL', h, '' if ok else r)
print('failed', bad)
