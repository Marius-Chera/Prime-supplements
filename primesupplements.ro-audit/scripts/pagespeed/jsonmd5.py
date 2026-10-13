import json,re,hashlib,sys
def shop_serialize(d):
    return json.dumps(d,separators=(',',':')).replace('/','\\/')
def load(path):
    t=open(path,encoding='utf-8').read()
    return json.loads(re.sub(r'^/\*.*?\*/\s*','',t,flags=re.S))
if __name__=='__main__':
    for p in sys.argv[1:]:
        s=shop_serialize(load(p)); print(hashlib.md5(s.encode()).hexdigest(), len(s.encode()), p)
