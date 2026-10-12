"""Compose productUpdate variables from reviewed tab content.
usage: compose_products.py <plan/products dir> <products-tabs.json> <out dir>"""
import json, sys, glob, os, re, html
sys.path.insert(0, os.path.dirname(__file__))
from richtext import blocks_to_rt
PD, DATA, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(OUT, exist_ok=True)
src = {p['id']: p for p in json.load(open(DATA))}

def inline_html(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>', s)
    return s

def blocks_html(blocks, hlevel=3):
    out = []
    for b in blocks or []:
        if 'p' in b: out.append(f'<p>{inline_html(b["p"])}</p>')
        elif 'h' in b: out.append(f'<h{hlevel}>{inline_html(b["h"])}</h{hlevel}>')
        elif 'ul' in b: out.append('<ul>' + ''.join(f'<li>{inline_html(i)}</li>' for i in b['ul']) + '</ul>')
        elif 'ol' in b: out.append('<ol>' + ''.join(f'<li>{inline_html(i)}</li>' for i in b['ol']) + '</ol>')
    return '\n'.join(out)

def valid_blocks(blocks):
    if blocks is None: return True
    if not isinstance(blocks, list) or not blocks: return False
    for b in blocks:
        if not isinstance(b, dict) or not (set(b) & {'p', 'h', 'ul', 'ol'}): return False
    return 'h' not in blocks[0]

items, problems = [], []
for f in sorted(glob.glob(f'{PD}/batch-*.json'), key=lambda x: int(re.search(r'(\d+)', os.path.basename(x)).group(1))):
    for it in json.load(open(f)):
        rv = str(it.get('review', ''))
        if rv.startswith('rejected'):
            problems.append((it.get('handle'), rv)); continue
        p = src.get(it['id'])
        if not p: problems.append((it.get('handle'), 'unknown id')); continue
        ben, det = it.get('beneficii_cheie') or [], it.get('detalii_produs') or []
        if not (isinstance(ben, list) and all(isinstance(x, str) and 0 < len(x) <= 255 for x in ben)): problems.append((p['handle'], 'beneficii invalid')); continue
        if not (isinstance(det, list) and all(isinstance(x, str) and 0 < len(x) <= 255 for x in det)): problems.append((p['handle'], 'detalii invalid')); continue
        if not all(valid_blocks(it.get(k)) for k in ('despre_produs', 'ingrediente', 'seo_produs')) or not it.get('despre_produs'):
            problems.append((p['handle'], 'blocks invalid')); continue
        title = (it.get('new_title') or p['title']).strip()
        if not (5 <= len(title) <= 70): problems.append((p['handle'], f'title length {len(title)}')); continue
        mf = [
            {'namespace': 'custom', 'key': 'beneficii_cheie', 'type': 'list.single_line_text_field', 'value': json.dumps(ben, ensure_ascii=False)},
            {'namespace': 'custom', 'key': 'despre_produs', 'type': 'rich_text_field', 'value': blocks_to_rt(it['despre_produs'])},
            {'namespace': 'custom', 'key': 'detalii_produs', 'type': 'list.single_line_text_field', 'value': json.dumps(det, ensure_ascii=False)},
        ]
        if it.get('ingrediente'): mf.append({'namespace': 'custom', 'key': 'ingrediente', 'type': 'rich_text_field', 'value': blocks_to_rt(it['ingrediente'])})
        if it.get('seo_produs'): mf.append({'namespace': 'custom', 'key': 'seo_produs', 'type': 'rich_text_field', 'value': blocks_to_rt(it['seo_produs'])})
        parts = [blocks_html(it['despre_produs'])]
        if ben: parts.append('<h2>Beneficii cheie</h2>\n<ul>' + ''.join(f'<li>{inline_html(x)}</li>' for x in ben) + '</ul>')
        if it.get('ingrediente'): parts.append('<h2>Ingrediente</h2>\n' + blocks_html(it['ingrediente']))
        if det: parts.append('<h2>Detalii produs</h2>\n<ul>' + ''.join(f'<li>{inline_html(x)}</li>' for x in det) + '</ul>')
        desc = '\n'.join(parts)
        var = {'product': {'id': p['id'], 'title': title, 'descriptionHtml': desc, 'metafields': mf}}
        path = f'{OUT}/{p["handle"]}.json'
        json.dump(var, open(path, 'w'), ensure_ascii=False)
        items.append({'handle': p['handle'], 'id': p['id'], 'file': path, 'title_changed': title != p['title'], 'bytes': os.path.getsize(path)})
json.dump(items, open(f'{OUT}/_index.json', 'w'), indent=0)
print('composed', len(items), 'problems', len(problems)); [print(' ', x) for x in problems[:30]]
print('title changes', sum(i['title_changed'] for i in items), 'avg bytes', sum(i['bytes'] for i in items) // max(1, len(items)))
