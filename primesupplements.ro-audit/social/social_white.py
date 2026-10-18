from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np, json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kit3 import cut, ft, F
BLK=F+"InterDisplay-Black.otf"; XB=F+"InterDisplay-ExtraBold.otf"; SB=F+"Inter-SemiBold.otf"; MD=F+"Inter-Medium.otf"; RG=F+"Inter-Regular.otf"
RED=(236,30,36); INK=(17,17,19); GREY=(120,120,126)
LOGO=Image.open(os.path.join(os.path.dirname(os.path.abspath(__file__)),"kit3/logo-dark.png")).convert("RGBA")
def bg(W,H):
    y,x=np.mgrid[0:H,0:W]; b=np.zeros((H,W,3),np.float32); b[:]=(250,249,247)
    d=np.sqrt(((x-W/2)/(W*0.8))**2+((y-H*0.45)/(H*0.6))**2); b-= (np.clip(d,0,1)**2*10)[...,None]
    return Image.fromarray(np.clip(b,0,255).astype(np.uint8)).convert("RGBA")
def tracked(d,xy,txt,f,fill,tr,anchor="l"):
    w=sum(d.textlength(c,font=f) for c in txt)+tr*(len(txt)-1); x,y=xy
    if anchor=="m": x-=w/2
    if anchor=="r": x-=w
    for c in txt: d.text((x,y),c,font=f,fill=fill,anchor="ls"); x+=d.textlength(c,font=f)+tr
def fit(d,t,p,s,mw):
    f=ft(p,s)
    while d.textlength(t,font=f)>mw: s-=3; f=ft(p,s)
    return f
def products(C,p,H,cx,cy,maxw,gap):
    ims=[cut(i,p.get("th",60),p.get("er",3),p.get("bt",110)) for i in p["img"]]
    ims=[i.resize((int(i.width*H/i.height),H),Image.LANCZOS) for i in ims]
    tot=sum(i.width for i in ims)+gap*(len(ims)-1)
    if tot>maxw:
        s=maxw/tot; ims=[i.resize((int(i.width*s),int(i.height*s)),Image.LANCZOS) for i in ims]; gap=int(gap*s); tot=sum(i.width for i in ims)+gap*(len(ims)-1)
    x=cx-tot//2; hmax=max(i.height for i in ims); base=cy+hmax//2; pos=[]
    for i in ims:
        a=i.split()[3]
        sh=Image.new("L",C.size,0); sh.paste(a.resize((i.width,max(8,i.height//14))),(x+6,base-6))
        sh=sh.filter(ImageFilter.GaussianBlur(18)).point(lambda v:int(v*0.35))
        C.alpha_composite(Image.merge("RGBA",[Image.new("L",C.size,0)]*3+[sh]))
        soft=Image.new("L",C.size,0); soft.paste(a,(x+14,base-i.height+22)); soft=soft.filter(ImageFilter.GaussianBlur(26)).point(lambda v:int(v*0.18))
        C.alpha_composite(Image.merge("RGBA",[Image.new("L",C.size,0)]*3+[soft]))
        C.alpha_composite(i,(x,base-i.height)); pos.append((x,i.width)); x+=i.width+gap
    return base,pos
def make(p,out,story):
    W,H=(1080,1920) if story else (1080,1350)
    C=bg(W,H); d=ImageDraw.Draw(C)
    top=230 if story else 70
    lw=230; l=LOGO.resize((lw,int(LOGO.height*lw/LOGO.width)),Image.LANCZOS); C.alpha_composite(l,(70,top))
    tracked(d,(W-70,top+40),p["tag"],ft(SB,24),RED,4,"r")
    # product area
    ph=p.get("ph",620 if story else 520)
    cy=int(H*0.43) if story else int(H*0.40)
    if p.get("stack"):
        n=len(p["img"]); bw=W-300 if story else W-340; rowh=(560 if story else 470)//n
        y0=cy-(rowh*n)//2; base=y0+rowh*n; d=ImageDraw.Draw(C)
        for k,(im,lab) in enumerate(zip(p["img"],p["labels"])):
            i=cut(im,p.get("th",60),p.get("er",3),p.get("bt",110)); bw2=min(bw,int(rowh*0.86*i.width/i.height)); i=i.resize((bw2,int(i.height*bw2/i.width)),Image.LANCZOS)
            yy=y0+k*rowh+(rowh-i.height)//2; xx=W-70-bw+(bw-bw2)//2
            soft=Image.new("L",C.size,0); soft.paste(i.split()[3],(xx+12,yy+18)); soft=soft.filter(ImageFilter.GaussianBlur(20)).point(lambda v:int(v*0.22))
            C.alpha_composite(Image.merge("RGBA",[Image.new("L",C.size,0)]*3+[soft])); C.alpha_composite(i,(xx,yy))
            d=ImageDraw.Draw(C); cyy=yy+i.height//2
            d.ellipse((80,cyy-36,152,cyy+36),outline=INK,width=3); d.text((116,cyy),lab,font=ft(BLK,38),fill=INK,anchor="mm")
        pos=[]; base=base-40
    else:
        base,pos=products(C,p,ph,W//2,cy,W-160,p.get("gap",40)); d=ImageDraw.Draw(C)
    if p.get("labels") and pos:
        for (x,w),lab in zip(pos,p["labels"]):
            cx=x+w//2; d.ellipse((cx-30,base+28,cx+30,base+88),outline=INK,width=3)
            d.text((cx,base+58),lab,font=ft(BLK,32),fill=INK,anchor="mm")
    # headline block
    y=(base+(140 if (p.get("labels") and not p.get("stack")) else 80))
    d.rectangle((70,y,130,y+6),fill=RED); y+=34
    f1=fit(d,p["h1"],BLK,96 if story else 84,W-140); d.text((70,y),p["h1"],font=f1,fill=INK); y+=f1.size*1.02
    f2=fit(d,p["h2"],BLK,96 if story else 84,W-140); d.text((70,y),p["h2"],font=f2,fill=RED); y+=f2.size*1.25
    d.text((70,y),p["sub"],font=ft(MD,32 if story else 30),fill=GREY); y+=60
    for j,l2 in enumerate(p.get("claim",[])): d.text((70,y+j*30),l2,font=ft(RG,22),fill=(150,150,155))
    # comment CTA
    cta=p["cta"]; fc=ft(XB,30 if story else 28); tw=d.textlength(cta,font=fc)
    by=H-(300 if story else 150); bh=72
    d.rounded_rectangle((70,by,70+tw+120,by+bh),radius=36,fill=INK)
    d.ellipse((92,by+18,128,by+54),outline="white",width=3); d.polygon([(100,by+50),(96,by+60),(108,by+52)],fill="white")
    d.text((146,by+bh/2),cta,font=fc,fill="white",anchor="lm")
    d.text((W-70,by+bh/2),"primesupplements.ro",font=ft(SB,24),fill=GREY,anchor="rm")
    C.convert("RGB").save(out,quality=94)
if __name__=="__main__":
    cfg=json.load(open(sys.argv[1])); o=sys.argv[2]; os.makedirs(o,exist_ok=True)
    for p in cfg: make(p,f"{o}/{p['slug']}-feed.jpg",False); make(p,f"{o}/{p['slug']}-story.jpg",True)
