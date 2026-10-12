"""Clean BlogGenAuto artefacts out of Shopify article bodies (dry run: writes cleaned
HTML to files + a stats report; never touches the store)."""
import json, re, glob, sys, collections, html
S, B = sys.argv[1], sys.argv[2]
PRIMARY = 'https://primesupplements.ro'
stats = collections.Counter(); per_article = []

def strip_block_by_comment(body, comment_label, end_tag):
    """Remove from an HTML comment marker up to the matching closing tag of the first element after it."""
    pat = re.compile(r'<!--\s*' + comment_label + r'\s*-->\s*<' + end_tag + r'\b.*?</' + end_tag + r'>', re.S)
    new, n = pat.subn('', body)
    return new, n

def clean(body, handle):
    c = collections.Counter(); b = body or ''
    # 1. embedded JSON-LD and all scripts (tracking to railway.app etc.)
    b, n = re.subn(r'<script\b[^>]*type="application/ld\+json"[^>]*>.*?</script>', '', b, flags=re.S); c['ldjson_removed'] += n
    b, n = re.subn(r'<script\b.*?</script>', '', b, flags=re.S); c['scripts_removed'] += n
    # 2. generator comments
    b, n = re.subn(r'<!--\s*BlogGenAI[^>]*-->', '', b); c['generator_comments_removed'] += n
    # 3. in-body breadcrumbs nav and metadata bar (the theme renders date/author itself)
    b, n = strip_block_by_comment(b, 'Breadcrumbs', 'nav'); c['breadcrumb_nav_removed'] += n
    b, n = re.subn(r'<nav class="breadcrumbs"[^>]*>.*?</nav>', '', b, flags=re.S); c['breadcrumb_nav_removed'] += n
    b, n = strip_block_by_comment(b, 'Article Metadata Bar', 'div'); c['metadata_bar_removed'] += n
    b, n = re.subn(r'<div class="article-metadata"[^>]*>.*?</div>\s*</div>', '', b, flags=re.S); c['metadata_bar_removed'] += n
    # 3b. BlogGenAuto "Published / Updated / By" box at the top of the body (fabricated dates; the theme renders the real date and author)
    b, n = re.subn(r'<div[^>]*>\s*<p[^>]*>\s*<strong>Published:</strong>.*?</div>', '', b, flags=re.S); c['published_box_removed'] += n
    b, n = re.subn(r'<p[^>]*>\s*<strong>Published:</strong>.*?</p>', '', b, flags=re.S); c['published_line_removed'] += n
    # 3c. decorative "source" links that point at a homepage (no path) are not citations: keep the text, drop the link
    b, n = re.subn(r'<a\b[^>]*href="https?://(?:www\.)?(?:ncbi\.nlm\.nih\.gov|pubmed\.ncbi\.nlm\.nih\.gov|nih\.gov|who\.int|healthline\.com|examine\.com|mayoclinic\.org|efsa\.europa\.eu|webmd\.com|medicalnewstoday\.com|sciencedirect\.com|nutrition\.org|jissn\.biomedcentral\.com|hopkinsmedicine\.org|health\.harvard\.edu|clevelandclinic\.org|nhs\.uk|fda\.gov|ods\.od\.nih\.gov|europepmc\.org|cochrane\.org|bmj\.com|thelancet\.com|nature\.com|springer\.com|wiley\.com|frontiersin\.org|mdpi\.com)/?"[^>]*>(.*?)</a>', r'\1', b, flags=re.S); c['decorative_source_links_unlinked'] += n
    # 4. "Powered by BlogGenAuto" paragraph/link
    b, n = re.subn(r'<p[^>]*>\s*<a[^>]*href="https?://(?:www\.)?bloggenauto\.com[^"]*"[^>]*>\s*Powered by BlogGenAuto\s*</a>\s*</p>', '', b, flags=re.S); c['powered_by_removed'] += n
    b, n = re.subn(r'<a[^>]*href="https?://(?:www\.)?bloggenauto\.com[^"]*"[^>]*>.*?</a>', '', b, flags=re.S); c['bloggenauto_links_removed'] += n
    # 5. hard-coded prices and fake urgency lines in product cards
    b, n = re.subn(r'<p[^>]*>\s*[\d.,]+\s*(?:lei|RON)\s*</p>', '', b); c['hardcoded_prices_removed'] += n
    b, n = re.subn(r'<p[^>]*>\s*⚡?\s*În limita stocului disponibil\s*</p>', '', b); c['urgency_lines_removed'] += n
    # 6. links: myshopify + wrong domain -> primary domain (relative), cart permalinks kept on the primary domain
    b, n = re.subn(r'https?://primesupplements1\.myshopify\.com(/[^"\'\s<>]*)?', lambda m: (m.group(1) or '/'), b); c['myshopify_links_rewritten'] += n
    b, n = re.subn(r'https?://(?:www\.)?primesupplements1\.com(/[^"\'\s<>]*)?', lambda m: (m.group(1) or '/'), b); c['wrongdomain_links_rewritten'] += n
    b, n = re.subn(r'href="https?://(?:www\.)?primesupplements\.ro(/[^"]*)"', lambda m: 'href="' + m.group(1) + '"', b); c['absolute_primary_links_relativised'] += n
    # 7. remove target="_blank" on internal links (keeps users on site; agents/crawlers see normal links)
    b, n = re.subn(r'(<a\b[^>]*href="/[^"]*"[^>]*)\s+target="_blank"', r'\1', b); c['target_blank_removed'] += n
    # 8. demote in-body H1 to H2 (the theme already renders the title as H1)
    b, n = re.subn(r'<h1\b([^>]*)>', r'<h2\1>', b); b = re.sub(r'</h1>', '</h2>', b); c['h1_demoted'] += n
    # 9. empty alt on inline images: leave for now (handled by image task) but count
    c['img_empty_alt'] += len(re.findall(r'<img[^>]*alt=""', b))
    # 9b. consistent author box: one verified bio, link to the About page, descriptive alt, no nofollow self-link
    BIO = ('Marius Chera – antrenor de culturism și nutriționist sportiv, fondatorul Prime Supplements (2022). '
           'Lector la cursurile de instructori din cadrul FRCF, a pregătit sportivi care au obținut carduri PRO și titluri europene și mondiale IFBB. '
           'Specializat în online coaching, îmbină experiența din competiții cu știința nutriției sportive.')
    b, n = re.subn(r'(<p[^>]*itemprop="description"[^>]*>).*?(</p>)', lambda m: m.group(1) + BIO + m.group(2), b, flags=re.S); c['author_bio_normalised'] += n
    b, n = re.subn(r'<a href="/" rel="noopener noreferrer" itemprop="url"', '<a href="/pages/despre-noi" itemprop="url"', b); c['author_link_fixed'] += n
    b, n = re.subn(r'alt="Marius Chera , Nutritionist &amp; Bodybuilding Coach"', 'alt="Marius Chera, antrenor de culturism și nutriționist sportiv"', b); c['author_alt_fixed'] += n
    # 10. collapse leftover whitespace runs
    b = re.sub(r'\n{3,}', '\n\n', b).strip()
    return b, c

rows = []
for f in sorted(glob.glob(f'{S}/articles-p*.json')):
    for e in json.load(open(f))['data']['articles']['edges']:
        n = e['node']; nb, c = clean(n['body'], n['handle'])
        stats.update(c)
        open(f'{B}/cleaned/{n["handle"]}.html', 'w').write(nb)
        rows.append({'id': n['id'], 'handle': n['handle'], 'author': (n['author'] or {}).get('name'), 'before': len(n['body'] or ''), 'after': len(nb), 'changes': dict(c), 'remaining_myshopify': len(re.findall(r'myshopify\.com', nb)), 'remaining_scripts': len(re.findall(r'<script', nb)), 'remaining_bloggen': len(re.findall(r'(?i)bloggen', nb))})
json.dump(rows, open(f'{B}/cleanup-report.json', 'w'), ensure_ascii=False, indent=0)
print('articles', len(rows)); 
for k, v in sorted(stats.items()): print(f'{v:6d} {k}')
print('remaining myshopify refs:', sum(r['remaining_myshopify'] for r in rows), '| remaining scripts:', sum(r['remaining_scripts'] for r in rows), '| remaining bloggen mentions:', sum(r['remaining_bloggen'] for r in rows))
print('size before/after (MB):', round(sum(r['before'] for r in rows)/1e6, 2), round(sum(r['after'] for r in rows)/1e6, 2))
