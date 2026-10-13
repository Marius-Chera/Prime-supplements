"""build_chunk.py S tag: (re)build vars for reviewed, not-yet-scheduled handles; atomic writes; write groups for the chunk."""
import json, os, sys, hashlib
S, tag = sys.argv[1], sys.argv[2]
items = {i['final_handle']: i for i in json.load(open(S + '/repair/items.json'))}
sched_p = S + '/import/scheduled.json'
sched = json.load(open(sched_p)) if os.path.exists(sched_p) else []
rep = {r['final']: r for r in json.load(open(S + '/import/validate-report.json'))}
ok_extra = {'<table 1->0', '<img 8->6'}
todo, blocked = [], []
for h in json.load(open(S + '/import/reviewed-handles.json')):
    if h in sched: continue
    if [p for p in rep[h]['problems'] if p not in ok_extra]: blocked.append((h, rep[h]['problems'])); continue
    it = items[h]
    v = json.load(open(f"{S}/blog-apply/vars/{it['handle']}.json"))
    body = open(f"{S}/bodies5/{os.path.basename(it['out'])}", encoding='utf-8').read()
    tmp = f"{S}/import/vars/.{h}.tmp"
    json.dump({'id': v['id'], 'article': {'body': body}}, open(tmp, 'w'), ensure_ascii=False)
    os.replace(tmp, f"{S}/import/vars/{h}.json")
    todo.append(h)
groups = [todo[i:i + 4] for i in range(0, len(todo), 4)]
json.dump(sched + todo, open(sched_p, 'w'))
json.dump(groups, open(f"{S}/import/groups-{tag}.json", 'w'))
print('chunk', tag, 'articles', len(todo), 'groups', len(groups), 'blocked', blocked)
print(json.dumps(groups))
