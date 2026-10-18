from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np, json, sys, os
F="/usr/share/fonts/opentype/inter/"
BLKI=F+"InterDisplay-BlackItalic.otf"; XBI=F+"InterDisplay-ExtraBoldItalic.otf"; XB=F+"Inter-ExtraBold.otf"; SB=F+"Inter-SemiBold.otf"; MD=F+"Inter-Medium.otf"
RED=(236,30,36)
HERE=os.path.dirname(os.path.abspath(__file__))
LOGO=Image.open(os.environ.get("PRIME_LOGO",os.path.join(HERE,"logo-white.png"))).convert("RGBA")
def ft(p,s): return ImageFont.truetype(p,s)
def cut(path,th,er,bt=None):
    im=Image.open(path).convert("RGB")
    def ff(t):
        m=im.copy()
        for c in [(0,0),(im.width-1,0),(0,im.height-1),(im.width-1,im.height-1),(im.width//2,im.height-1),(im.width//2,0)]:
            ImageDraw.floodfill(m,c,(255,0,255),thresh=t)
        return (np.array(m)!=np.array([255,0,255])).any(axis=2)
    a=ff(th)
    ys,xs=np.nonzero(a); y0,y1=ys.min(),ys.max()
    if bt:  # stricter key in the bottom part, kills the soft floor shadow
        b=ff(bt); cut_y=int(y0+(y1-y0)*0.88); a[cut_y:]=a[cut_y:]&b[cut_y:]
        if bt>=60:  # dark jar: drop light-grey floor shadow pixels near the base
            px=np.array(im).astype(int); lum=px.mean(axis=2); sat=px.max(axis=2)-px.min(axis=2)
            low=int(y0+(y1-y0)*0.90); a[low:]&=~((lum[low:]>95)&(sat[low:]<45))
    if bt and bt<60:  # white tub: cut each column just below its dark base contour line
        lum=np.array(im.convert("L")).astype(int); start=int(y0+(y1-y0)*0.75)
        for x in range(im.width):
            col=lum[start:,x]; idx=np.nonzero(col<215)[0]
            if len(idx): a[start+idx[-1]+2:,x]=False
            else: a[start:,x]=False
    # clamp to the body width measured at mid-height (removes shadow wings)
    mid=a[int(y0+(y1-y0)*0.45):int(y0+(y1-y0)*0.6)]; cols=np.nonzero(mid.any(axis=0))[0]
    a[:,:max(cols.min()-2,0)]=False; a[:,cols.max()+3:]=False
    a=Image.fromarray(a.astype(np.uint8)*255).filter(ImageFilter.MinFilter(er)).filter(ImageFilter.GaussianBlur(1.0))
    im.putalpha(a); return im.crop(im.getbbox())
def icon():
    # the "7" mark of the original logo (right part)
    w,h=LOGO.size; return LOGO.crop((int(w*0.70),0,w,h))
def background(W,H,gy):
    y,x=np.mgrid[0:H,0:W]; b=np.zeros((H,W,3),np.float32); b[:]=(9,9,11)
    d=np.sqrt(((x-W/2)/(W*0.7))**2+((y-gy)/(H*0.42))**2); g=np.clip(1-d,0,1)**2.2
    b+=g[...,None]*np.array([95,8,12])
    v=np.sqrt(((x-W/2)/W)**2+((y-H/2)/H)**2); b*=(1-0.6*np.clip(v*1.3,0,1))[...,None]
    b+=np.random.default_rng(7).normal(0,4.5,(H,W,1))
    C=Image.fromarray(np.clip(b,0,255).astype(np.uint8)).convert("RGBA")
    # giant watermark of the logo mark
    ic=icon(); s=H*0.95/ic.height; ic=ic.resize((int(ic.width*s),int(ic.height*s)),Image.LANCZOS)
    a=ic.split()[3].point(lambda v:int(v*0.06)); wm=Image.new("RGBA",ic.size,(255,255,255,0)); wm.putalpha(a)
    C.alpha_composite(wm,(int(W*0.30),int(H*0.03)))
    # red slanted band behind product
    band=Image.new("L",(W,H),0); bd=ImageDraw.Draw(band); t=H*0.16; sk=W*0.32
    bd.polygon([(0,gy-t*0.15+sk*0.5),(W,gy-t*0.15-sk*0.5),(W,gy+t*0.85-sk*0.5),(0,gy+t*0.85+sk*0.5)],fill=255)
    gr=np.tile(np.linspace(0.35,1.0,W),(H,1)); band=Image.fromarray((np.array(band)*gr).astype(np.uint8))
    red=Image.new("RGBA",(W,H),RED+(255,)); red.putalpha(band); C.alpha_composite(red)
    # thin accent stripes parallel to band
    L=Image.new("RGBA",(W,H),(0,0,0,0)); ld=ImageDraw.Draw(L)
    for off,al in [(-t*0.42,120),(-t*0.52,60)]:
        ld.line([(0,gy+off+sk*0.5),(W,gy+off-sk*0.5)],fill=RED+(al,),width=6)
    C.alpha_composite(L)
    return C
def place(C,p,H,cx,cy,maxw,gap):
    ims=[cut(path,p.get("th",60),p.get("er",3),p.get("bt")) for path in p["img"]]
    ims=[i.resize((int(i.width*H/i.height),H),Image.LANCZOS) for i in ims]
    tot=sum(i.width for i in ims)+gap*(len(ims)-1)
    if tot>maxw:
        s=maxw/tot; ims=[i.resize((int(i.width*s),int(i.height*s)),Image.LANCZOS) for i in ims]; gap=int(gap*s); tot=sum(i.width for i in ims)+gap*(len(ims)-1)
    n=len(ims); x=cx-tot//2; pos=[]
    for i in ims: pos.append(x); x+=i.width+gap
    hmax=max(i.height for i in ims); top=cy-hmax//2
    ys=[top+(hmax-i.height)+(0 if n<3 or k==1 else 26) for k,i in enumerate(ims)]
    # rim glow + soft drop shadow (no floor, no reflection)
    glow=Image.new("L",C.size,0); shad=Image.new("L",C.size,0)
    for k,i in enumerate(ims):
        glow.paste(i.split()[3],(pos[k],ys[k]),i.split()[3]); shad.paste(i.split()[3],(pos[k]+18,ys[k]+28),i.split()[3])
    sh=Image.new("RGBA",C.size,(0,0,0,0)); sh.putalpha(shad.filter(ImageFilter.GaussianBlur(30)).point(lambda v:int(v*0.7))); C.alpha_composite(sh)
    gl=Image.new("RGBA",C.size,(255,70,70,0)); gl.putalpha(glow.filter(ImageFilter.GaussianBlur(45)).point(lambda v:int(v*0.55))); C.alpha_composite(gl)
    for k in ([0,2,1] if n==3 else range(n)): C.alpha_composite(ims[k],(pos[k],ys[k]))
    return top,top+hmax
def logo(C,x,y,w):
    s=w/LOGO.width; l=LOGO.resize((w,int(LOGO.height*s)),Image.LANCZOS); C.alpha_composite(l,(x,y)); return l.height
def pill(d,x,y,txt,f,fill,tc,pad=26,h=58,outline=None):
    w=d.textlength(txt,font=f)
    d.rounded_rectangle((x,y,x+w+2*pad,y+h),radius=h//2,fill=fill,outline=outline,width=3 if outline else 0)
    d.text((x+pad,y+h/2),txt,font=f,fill=tc,anchor="lm"); return w+2*pad
def fit(d,txt,path,size,maxw):
    f=ft(path,size)
    while d.textlength(txt,font=f)>maxw: size-=3; f=ft(path,size)
    return f
def make(p,out,story):
    W,H=(1080,1920) if story else (1080,1350)
    gy=H*0.50 if story else H*0.47
    C=background(W,H,gy); d=ImageDraw.Draw(C)
    top=230 if story else 64
    logo(C,64,top,300)
    f=ft(XB,28); tw=d.textlength(p["tag"],font=f)+52; pill(d,W-64-tw,top+8,p["tag"],f,RED,"white")
    if story:
        f1=fit(d,p["h1"],BLKI,150,W-110); f2=fit(d,p["h2"],BLKI,150,W-110)
        y=top+150
        d.text((W//2,y),p["h1"],font=f1,fill="white",anchor="ma")
        d.text((W//2,y+f1.size*0.98),p["h2"],font=f2,fill=RED,anchor="ma")
        y2=y+f1.size*0.98+f2.size*1.14
        d.text((W//2,y2),p["sub"],font=ft(SB,38),fill=(230,230,230),anchor="ma")
        hh=560 if len(p["img"])==1 else 430
        a,b=place(C,p,hh,W//2,int(y2+70+hh/2),W-70,-50); d=ImageDraw.Draw(C)
        # chips
        fc=ft(XB,27); ws=[d.textlength(t,font=fc)+52 for t in p["chips"]]; tot=sum(ws)+14*(len(ws)-1); x=W/2-tot/2
        for t,w in zip(p["chips"],ws): pill(d,x,b+50,t,fc,(0,0,0),"white",outline=(255,255,255)); x+=w+14
        yc=b+140
        for j,l in enumerate(p.get("claim",[])): d.text((W//2,yc+j*36),l,font=ft(MD,26),fill=(200,200,200),anchor="ma")
        y=H-330
        d.rounded_rectangle((140,y,W-140,y+124),radius=62,fill="white")
        d.text((W//2,y+62),"CODUL MEU: ________",font=ft(BLKI,48),fill=(12,12,12),anchor="mm")
        d.text((W//2,y+168),"link în bio  •  primesupplements.ro",font=ft(SB,30),fill=(215,215,215),anchor="mm")
    else:
        nc=len(p.get("claim",[]))
        hh=(540-25*nc) if len(p["img"])==1 else 400
        a,b=place(C,p,hh,W//2,int(gy-10-12*nc),W-90,-45); d=ImageDraw.Draw(C)
        f1=fit(d,p["h1"],BLKI,100,W-128); f2=fit(d,p["h2"],BLKI,100,W-128)
        y=b+40
        d.text((64,y),p["h1"],font=f1,fill="white"); d.text((64,y+f1.size*0.98),p["h2"],font=f2,fill=RED)
        y2=y+f1.size*0.98+f2.size*1.18
        d.text((64,y2),p["sub"],font=ft(SB,32),fill=(230,230,230))
        for j,l in enumerate(p.get("claim",[])): d.text((64,H-92-26-(nc-1-j)*29),l,font=ft(MD,22),fill=(175,175,175),anchor="ls")
        d.rectangle((0,H-92,W,H),fill=RED)
        d.text((64,H-46),"primesupplements.ro",font=ft(BLKI,38),fill="white",anchor="lm")
        d.text((W-64,H-46),"COD ÎN BIO  →",font=ft(XB,30),fill="white",anchor="rm")
    C.convert("RGB").save(out,quality=93)
if __name__=="__main__":
    cfg=json.load(open(sys.argv[1])); out=sys.argv[2]; os.makedirs(out,exist_ok=True)
    for p in cfg:
        make(p,f"{out}/{p['slug']}-feed.jpg",False); make(p,f"{out}/{p['slug']}-story.jpg",True)
