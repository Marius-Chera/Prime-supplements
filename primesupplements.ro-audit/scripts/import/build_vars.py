"""Build body-only articleUpdate variables from bodies5, keyed by the article's current (final) handle."""
import json, os, sys, hashlib
S = sys.argv[1]
out = S + '/import/vars'; os.makedirs(out, exist_ok=True)
items = json.load(open(S + '/repair/items.json'))
idx = []
for it in items:
    v = json.load(open(f"{S}/blog-apply/vars/{it['handle']}.json"))
    body = open(f"{S}/bodies5/{os.path.basename(it['out'])}", encoding='utf-8').read()
    json.dump({'id': v['id'], 'article': {'body': body}}, open(f"{out}/{it['final_handle']}.json", 'w'), ensure_ascii=False)
    idx.append({'handle': it['final_handle'], 'id': v['id'], 'sha256': hashlib.sha256(body.encode()).hexdigest(), 'bytes': len(body.encode())})
json.dump(idx, open(S + '/import/index.json', 'w'), indent=1)
hs = [x['handle'] for x in idx]
groups = [hs[i:i + 6] for i in range(0, len(hs), 6)]
json.dump(groups, open(S + '/import/groups.json', 'w'))
print(len(idx), 'vars;', len(groups), 'groups; total MB', round(sum(x['bytes'] for x in idx) / 1e6, 2))
