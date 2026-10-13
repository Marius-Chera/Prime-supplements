import json,sys,re,subprocess,hashlib
# usage: staged_put.py <transcript> <xgoogdate> <localroot> ; maps staged filename (prefix__dir__file.txt) to local path
J,date,root=sys.argv[1:4]
urls=[]
for line in open(J,encoding='utf-8'):
    if 'stagedTargets' in line and f'X-Goog-Date={date}' in line:
        for u in re.findall(r'https://shopify-staged-uploads\.storage\.googleapis\.com/tmp/91751383415/files/[0-9a-f-]+/[A-Za-z0-9_.\-]+\.txt\?X-Goog-Algorithm=[^"\\]+', line):
            if u not in urls: urls.append(u)
out=[]
for u in urls:
    name=re.search(r'/files/[0-9a-f-]+/([^?]+)\.txt\?',u).group(1)
    rel=name.split('__',1)[1].replace('__','/') if name.startswith('r') and name[1:2].isdigit() else name.replace('__','/')
    path=f'{root}/{rel}'
    r=subprocess.run(['curl','-sS','-X','PUT','-H','Content-Type: text/plain','--data-binary','@'+path,'-o','/dev/null','-w','%{http_code}',u],capture_output=True,text=True)
    res=u.split('?')[0]
    g=subprocess.run(['curl','-sS',res],capture_output=True)
    ok=hashlib.md5(g.stdout).hexdigest()==hashlib.md5(open(path,'rb').read()).hexdigest()
    print(r.stdout,'readback-ok' if ok else 'READBACK-MISMATCH',rel,hashlib.md5(open(path,'rb').read()).hexdigest())
    out.append({'filename':rel,'body':{'type':'URL','value':res}})
print(json.dumps(out,separators=(',',':')))
