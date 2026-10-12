import sys
from html.parser import HTMLParser
VOID={'br','img','hr','meta','link','input','source','wbr','col','area','base','embed','param','track'}
class P(HTMLParser):
    def __init__(s): super().__init__(); s.stack=[]; s.err=0
    def handle_starttag(s,t,a):
        if t not in VOID: s.stack.append(t)
    def handle_endtag(s,t):
        if t in VOID: return
        if s.stack and s.stack[-1]==t: s.stack.pop()
        elif t in s.stack:
            while s.stack and s.stack[-1]!=t: s.stack.pop(); s.err+=1
            s.stack.pop()
        else: s.err+=1
def score(path):
    p=P(); p.feed(open(path,encoding='utf-8').read()); p.close(); return p.err+len(p.stack)
if __name__=='__main__':
    import glob,os
    a,b=sys.argv[1],sys.argv[2]; worse=[]
    for f in glob.glob(b+'/*.html'):
        o=os.path.join(a,os.path.basename(f))
        if os.path.exists(o) and score(f)>score(o): worse.append((os.path.basename(f),score(o),score(f)))
    print('files where balance got worse:',len(worse)); [print(' ',w) for w in worse[:10]]
