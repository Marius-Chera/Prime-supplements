import json,sys
d=json.load(open(sys.argv[1]))
A=d['audits']
def show(id, n=40):
    a=A[id]; det=a.get('details',{})
    print('\n#####',id,'::',a.get('displayValue',''), a.get('score'))
    def walk(items, ind='  '):
        for it in items[:n]:
            if isinstance(it,dict):
                node=it.get('node') or {}
                out={k:v for k,v in it.items() if k not in('node','subItems') and not isinstance(v,(dict,list))}
                if node: out['sel']=node.get('selector'); out['snip']=(node.get('snippet') or '')[:220]; out['why']=(node.get('explanation') or '')[:300]
                for k in ('url','source'):
                    if isinstance(it.get(k),dict): out[k]=it[k].get('url') or it[k].get('value')
                print(ind+json.dumps(out,ensure_ascii=False)[:700])
                si=it.get('subItems',{}).get('items') if isinstance(it.get('subItems'),dict) else None
                if si: walk(si, ind+'    ')
    if det.get('type')=='list':
        for sub in det.get('items',[]):
            if sub.get('type')=='table': walk(sub.get('items',[]))
            elif sub.get('type')=='network-tree' or 'chains' in sub: print(json.dumps(sub)[:6000])
            else: print(json.dumps(sub,ensure_ascii=False)[:3000])
    elif det.get('type') in ('table','opportunity'): walk(det.get('items',[]))
    elif det: print(json.dumps(det,ensure_ascii=False)[:5000])
for id in sys.argv[2:]: show(id)
