"""check_all.py [handles...]: one storefront fetch per article (paced, backs off on Cloudflare 429) and all checks:
full visible text, every href and alt of the local final body, hub link, author link, no linkedin/myshopify/BlogGenAuto/Published:/cart, disclaimer."""
import sys, os, re, html, json, subprocess, random, time
F = '/home/user/Prime-supplements/primesupplements.ro-audit/applied/article-bodies/final'
plan = json.load(open('/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/hublinks/plan.json'))
def get(u):
    for attempt in range(5):
        r = subprocess.run(['curl', '-sS', '-A', 'Mozilla/5.0', '--max-time', '60', '-w', '\n%{http_code}', u], capture_output=True, text=True).stdout
        body, _, code = r.rpartition('\n')
        if code == '200' and 'Verifying your connection' not in body[:3000]: return body
        time.sleep(90 * (attempt + 1))
    return ''
def norm(s):
    s = re.sub(r'(?is)<(script|style)\b.*?</\1>', ' ', s); s = re.sub(r'(?s)<!--.*?-->', ' ', s)
    s = re.sub(r'<[^>]+>', ' ', s); s = html.unescape(s).replace('\xa0', ' ')
    return re.sub(r'\s+', ' ', s).strip()
hs = sys.argv[1:] or sorted(f[:-5] for f in os.listdir(F) if f.endswith('.html'))
home = get(f'https://primesupplements.ro/?cb={random.randint(1, 10**9)}')
B = {k: home.count(k) for k in ('myshopify.com', 'linkedin.com/in/', '/pages/autor-marius-chera"')}
bad = []
for h in hs:
    time.sleep(6)
    local = open(f'{F}/{h}.html', encoding='utf-8').read()
    page = get(f'https://primesupplements.ro/blogs/news/{h}?cb={random.randint(1, 10**9)}')
    if not page: print('NOPAGE', h, flush=True); bad.append(h); continue
    t = plan[h]['target']
    hrefs = set(html.unescape(x) for x in re.findall(r'href="([^"]+)"', local)); phrefs = set(html.unescape(x) for x in re.findall(r'href="([^"]+)"', page))
    alts = set(html.unescape(x) for x in re.findall(r'alt="([^"]*)"', local)); palts = set(html.unescape(x) for x in re.findall(r'alt="([^"]*)"', page))
    r = {'text': norm(local) in norm(page), 'missing': [x for x in hrefs - phrefs][:3] + [f'alt:{x}' for x in alts - palts][:3],
         'hub': any(x in page for x in re.findall(rf'<a [^>]*href="/collections/{t}"[^>]*>.*?</a>', local, re.S)),
         'author': page.count('/pages/autor-marius-chera"') > B['/pages/autor-marius-chera"'],
         'linkedin': page.count('linkedin.com/in/') - B['linkedin.com/in/'], 'myshopify': page.count('myshopify.com') - B['myshopify.com'],
         'bloggen': len(re.findall('(?i)bloggenauto|bloggenai', page)) - len(re.findall('(?i)bloggenauto|bloggenai', home)),
         'published': page.count('Published:'), 'cart': len(re.findall(r'href="/cart/\d', page)),
         'disclaimer': 'nu înlocuiesc sfatul medicului' in html.unescape(page)}
    ok = r['text'] and not r['missing'] and r['hub'] and r['author'] and r['linkedin'] <= 0 and r['myshopify'] <= 0 and r['bloggen'] <= 0 and not r['published'] and not r['cart'] and r['disclaimer']
    if not ok: bad.append(h)
    print('OK  ' if ok else 'FAIL', h, '' if ok else r, flush=True)
print('checked', len(hs), 'failed', len(bad), bad)
