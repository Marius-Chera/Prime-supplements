"""Build the blog consolidation apply set.
usage: build_blog_apply.py <blog-consolidation.json> <articles-plan.json> <articles-all.json> <final bodies dir> <out dir>
Outputs: out/vars/<handle>.json (kept articles: articleUpdate variables), out/redirects.csv (redirected articles),
out/unpublish.json ([{id, handle}]), out/hub-articles.json ({collection_handle: [final handles, max 6]}), out/summary.json"""
import json, sys, os, csv, collections
PLAN, APLAN, AALL, BODIES, OUT = sys.argv[1:6]
os.makedirs(f'{OUT}/vars', exist_ok=True)
plan = json.load(open(PLAN)); ids = {a['handle']: a['id'] for a in json.load(open(APLAN))}
seo = {a['handle']: a for a in json.load(open(APLAN))}
meta = {a['handle']: a for a in json.load(open(AALL))}
INTENT_ORDER = ['ce-este', 'beneficii', 'dozaj', 'cand-se-ia', 'rezultate', 'efecte', 'cum-alegi', 'combinatii', 'comparatie', 'pe-varste', 'ghid-produs', 'altele']
def irank(intent):
    for i, k in enumerate(INTENT_ORDER):
        if (intent or '').startswith(k): return i
    return len(INTENT_ORDER)
final = {d['handle']: (d.get('new_handle') or d['handle']) for d in plan['decisions'] if d['action'] == 'keep'}
kept, redirects, unpub, problems = [], [], [], []
hubs = collections.defaultdict(list)
for d in plan['decisions']:
    h = d['handle']
    if d['action'] == 'keep':
        aid = ids.get(h)
        if not aid: problems.append((h, 'no article id')); continue
        bf = f'{BODIES}/{h}.html'
        if not os.path.exists(bf): problems.append((h, 'no final body')); continue
        art = {'title': d['new_title'], 'tags': d['tags'], 'body': open(bf, encoding='utf-8').read()}
        if final[h] != h: art['handle'] = final[h]; art['redirectNewHandle'] = True
        author = (meta.get(h, {}).get('author') or '')
        if author.startswith('Marius Chera') or author == 'primesupplements1': art['author'] = {'name': 'Marius Chera'}
        t = d['new_title'].strip(); tt = t + ' | Prime Supplements' if len(t) + 20 <= 60 else t
        art['metafields'] = [{'namespace': 'global', 'key': 'title_tag', 'type': 'single_line_text_field', 'value': tt}]
        json.dump({'id': aid, 'article': art}, open(f'{OUT}/vars/{h}.json', 'w'), ensure_ascii=False)
        kept.append(h)
        hubs[d.get('hub')].append((irank(d.get('intent')), -int(meta.get(h, {}).get('internal_links') or 0), final[h]))
    else:
        tgt = d['target']
        redirects.append(('/blogs/news/' + h, tgt))
        if ids.get(h): unpub.append({'id': ids[h], 'handle': h})
        else: problems.append((h, 'redirect without article id (unpublish manually or already draft)'))
hub_coll = {hh.get('key') or hh.get('hub'): hh.get('collection_handle') for hh in plan.get('hubs', [])}
hub_articles = {}
for hub, items in hubs.items():
    coll = hub_coll.get(hub)
    if not coll or coll in ('all',): continue
    hub_articles.setdefault(coll, [])
    hub_articles[coll] += [x[2] for x in sorted(items)]
hub_articles = {k: v[:6] for k, v in hub_articles.items()}
with open(f'{OUT}/redirects.csv', 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['Redirect from', 'Redirect to']); w.writerows(redirects)
json.dump(unpub, open(f'{OUT}/unpublish.json', 'w'), indent=0)
json.dump(hub_articles, open(f'{OUT}/hub-articles.json', 'w'), ensure_ascii=False, indent=1)
summary = {'kept': len(kept), 'redirects': len(redirects), 'unpublish': len(unpub), 'hub_collections': {k: len(v) for k, v in hub_articles.items()}, 'problems': problems,
           'renamed': sum(1 for h in kept if final[h] != h), 'avg_body_kb': round(sum(os.path.getsize(f'{BODIES}/{h}.html') for h in kept) / max(1, len(kept)) / 1024, 1)}
json.dump(summary, open(f'{OUT}/summary.json', 'w'), indent=1, ensure_ascii=False)
print(json.dumps(summary, ensure_ascii=False, indent=1))
