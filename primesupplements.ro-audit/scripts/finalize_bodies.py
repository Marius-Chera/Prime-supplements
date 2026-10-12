"""Final pass on cleaned article bodies (after clean.py), driven by the blog consolidation plan.
usage: finalize_bodies.py <cleaned dir> <blog-consolidation.json> <out dir>
- Romanian labels for the generator's English headings; byline without the unverified 'Nutriționist Certificat' title;
- author box links to the on-site author page (the old href 'www.linkedin.com/in/chera23' was a broken relative link);
- short medical disclaimer before the author box (YMYL);
- in-body links to redirected articles go straight to their target; links to renamed articles use the new handle;
- 'Articole similare' cards that point to redirected articles are removed (the block is removed when it ends up empty)."""
import json, re, sys, os, glob, collections
SRC, PLAN, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(OUT, exist_ok=True)
plan = json.load(open(PLAN))
dec = {d['handle']: d for d in plan['decisions']}
final_handle = {h: (d.get('new_handle') or h) for h, d in dec.items() if d['action'] == 'keep'}
redirect_to = {h: d['target'] for h, d in dec.items() if d['action'] == 'redirect'}
DISCLAIMER = ('<p><em>Informațiile din acest articol au caracter general și nu înlocuiesc sfatul medicului sau al unui specialist în nutriție. '
              'Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată. Consultați medicul înainte de a începe un supliment, '
              'mai ales în caz de sarcină, alăptare, afecțiuni sau tratament medicamentos.</em></p>\n')
stats = collections.Counter()

def map_href(h):
    """h = article handle (no blog prefix); returns new href or None if unchanged."""
    if h in redirect_to: return redirect_to[h]
    if h in final_handle and final_handle[h] != h: return '/blogs/news/' + final_handle[h]
    return None

def process(body):
    b = body
    for a, z in (('>Key Takeaways<', '>Pe scurt<'), ('>Table of Contents<', '>Cuprins<'), ('<strong>Table of Contents</strong>', '<strong>Cuprins</strong>'), ('>FAQ<', '>Întrebări frecvente<')):
        n = b.count(a); b = b.replace(a, z); stats['label_' + a.strip('<>/')] += n
    n = b.count('Marius Chera , Nutriționist Certificat'); b = b.replace('Marius Chera , Nutriționist Certificat', 'Marius Chera'); stats['byline_fixed'] += n
    n = b.count('antrenor de culturism și nutriționist sportiv'); b = b.replace('antrenor de culturism și nutriționist sportiv', 'antrenor de culturism'); stats['bio_title_fixed'] += n
    b, n = re.subn(r'<a href="(?:https?://)?(?:www\.)?linkedin\.com/in/chera23/?" target="_blank" rel="noopener noreferrer" itemprop="url"', '<a href="/pages/autor-marius-chera" itemprop="url"', b); stats['author_link_fixed'] += n
    b, n = re.subn(r'<a href="/pages/despre-noi" itemprop="url"', '<a href="/pages/autor-marius-chera" itemprop="url"', b); stats['author_link_fixed'] += n
    # related cards
    def card(m):
        h = m.group(1)
        if h in redirect_to: stats['related_card_removed'] += 1; return ''
        if h in final_handle and final_handle[h] != h:
            stats['related_card_relinked'] += 1
            return m.group(0).replace(f'href="/blogs/news/{h}"', f'href="/blogs/news/{final_handle[h]}"', 1)
        return m.group(0)
    b = re.sub(r'\s*<a href="/blogs/news/([^"#?]+)"[^>]*class="related-post-card"[^>]*>.*?</a>', card, b, flags=re.S)
    b, n = re.subn(r'(?:<!--\s*Related Posts\s*-->\s*)?(?:<style>(?:(?!</style>).)*?related-post-card(?:(?!</style>).)*?</style>\s*)?<div[^>]*>\s*<h3[^>]*>Articole Similare</h3>\s*<div class="related-posts-grid"[^>]*>\s*</div>\s*</div>', '', b, flags=re.S)
    stats['related_block_removed'] += n
    # other in-body article links
    def link(m):
        new = map_href(m.group(2))
        if not new: return m.group(0)
        stats['body_link_rewritten'] += 1
        return f'{m.group(1)}{new}{m.group(3) or ""}"'
    b = re.sub(r'(href=")/blogs/news/([^"#?]+)([#?][^"]*)?"', link, b)
    # disclaimer
    if 'nu înlocuiesc sfatul medicului' not in b:
        i = b.find('<div class="author author-box"')
        if i < 0: i = b.find('<!-- Related Posts -->')
        if i < 0:
            m = re.search(r'<style>(?:(?!</style>).)*?related-post-card', b, re.S); i = m.start() if m else -1
        b = (b[:i] + DISCLAIMER + b[i:]) if i >= 0 else (b.rstrip() + '\n' + DISCLAIMER)
        stats['disclaimer_added'] += 1
    return b

written = 0
for h, d in dec.items():
    if d['action'] != 'keep': continue
    src = f'{SRC}/{h}.html'
    if not os.path.exists(src): stats['missing_source'] += 1; continue
    nb = process(open(src, encoding='utf-8').read())
    open(f'{OUT}/{h}.html', 'w', encoding='utf-8').write(nb); written += 1
print('written', written); print(dict(stats))
left = 0
for f in glob.glob(f'{OUT}/*.html'):
    s = open(f, encoding='utf-8').read()
    for hh in re.findall(r'href="/blogs/news/([^"#?]+)', s):
        if hh in redirect_to: left += 1
print('links to redirected articles left:', left)
