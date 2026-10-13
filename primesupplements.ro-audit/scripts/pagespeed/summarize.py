import json,sys
d=json.load(open(sys.argv[1]))
A=d['audits']
for k,c in d['categories'].items():
    print('==',k,c['score'])
    for r in c['auditRefs']:
        a=A[r['id']]
        s=a.get('score'); m=a.get('scoreDisplayMode')
        if m in ('notApplicable','manual') : continue
        if s is None or s<0.9 or m=='informative' and a.get('details',{}).get('items'):
            dv=a.get('displayValue','')
            print(f"  [{s}] {m} {r['id']} w={r.get('weight')} :: {a['title']} {dv}")
m=A
for k in ['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index','interactive']:
    print(k, m[k].get('displayValue'))
