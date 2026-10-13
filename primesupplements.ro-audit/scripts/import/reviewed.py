import json, sys
J = '/root/.claude/projects/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/subagents/workflows/wf_151c723e-190/journal.jsonl'
ev = [json.loads(l) for l in open(J) if l.strip()]
lab = {e['key']: e.get('label') for e in ev if e.get('type') == 'started'}
done = {}
for e in ev:
    if e.get('type') == 'result' and (lab.get(e['key']) or '').startswith('review:'):
        done[int(lab[e['key']].split(':')[1])] = e.get('result')
items = json.load(open(sys.argv[1] + '/repair/items.json'))
handles = []
for n in sorted(done):
    r = done[n] or {}
    batch = items[(n - 1) * 8: n * 8]
    print(f'review {n}: reviewed={r.get("reviewed")} fixed={r.get("fixed")} reverted={r.get("reverted")} notes={str(r.get("notes"))[:300]}')
    handles += [i['final_handle'] for i in batch]
json.dump(handles, open(sys.argv[1] + '/import/reviewed-handles.json', 'w'))
print('reviewed batches', sorted(done), 'handles', len(handles))
