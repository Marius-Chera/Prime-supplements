from PIL import Image, ImageDraw, ImageFont, ImageFilter
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import social_white as S
from kit3 import cut, ft
INK,RED,GREY=S.INK,S.RED,S.GREY; BLK,XB,SB,MD,RG=S.BLK,S.XB,S.SB,S.MD,S.RG
W,H=1080,1350
def wrap(d,t,f,mw):
    out=[];line=""
    for w in t.split():
        tt=(line+" "+w).strip()
        if d.textlength(tt,font=f)<=mw: line=tt
        else: out.append(line); line=w
    if line: out.append(line)
    return out
def header(C,d,p):
    lw=230; l=S.LOGO.resize((lw,int(S.LOGO.height*lw/S.LOGO.width)),Image.LANCZOS); C.alpha_composite(l,(70,70))
    S.tracked(d,(W-70,110),p["tag"],ft(SB,24),RED,4,"r")
def footer(d,p):
    cta=p.get("cta","Comandă pe primesupplements.ro"); fc=ft(XB,28); tw=d.textlength(cta,font=fc); by=H-150; bh=72
    d.rounded_rectangle((70,by,70+tw+(120 if p.get("comment") else 70),by+bh),radius=36,fill=INK)
    x=105
    if p.get("comment"):
        d.ellipse((92,by+18,128,by+54),outline="white",width=3); d.polygon([(100,by+50),(96,by+60),(108,by+52)],fill="white"); x=146
    d.text((x,by+bh/2),cta,font=fc,fill="white",anchor="lm")
    d.text((W-70,by+bh/2),"primesupplements.ro",font=ft(SB,24),fill=GREY,anchor="rm")
def headline(d,y,p,size=78):
    d.rectangle((70,y,130,y+6),fill=RED); y+=30
    f1=S.fit(d,p["h1"],BLK,size,W-140); d.text((70,y),p["h1"],font=f1,fill=INK); y+=f1.size*1.02
    if p.get("h2"):
        f2=S.fit(d,p["h2"],BLK,size,W-140); d.text((70,y),p["h2"],font=f2,fill=RED); y+=f2.size*1.2
    return y
def tick(d,x,y,col=RED,s=22): d.line([(x,y+s*0.55),(x+s*0.4,y+s),(x+s,y)],fill=col,width=5)
def dash(d,x,y,col=GREY,s=22): d.line([(x,y+s*0.5),(x+s,y+s*0.5)],fill=col,width=5)
def claimline(d,y,p):
    for j,l in enumerate(p.get("claim",[])): d.text((70,y+j*28),l,font=ft(RG,21),fill=(150,150,155))
def product(C,p,ph,cy,maxw=W-200):
    base,pos=S.products(C,p,ph,W//2,cy,maxw,p.get("gap",40)); return base
def t_prod(C,d,p):
    base=product(C,p,p.get("ph",440),400); d=ImageDraw.Draw(C)
    y=headline(d,base+60,p,74)
    f=ft(SB,32)
    for b in p["bullets"]:
        tick(d,72,y+4); d.text((112,y),b,font=f,fill=INK); y+=54
    claimline(d,y+10,p); return d
def t_proc(C,d,p):
    base=product(C,p,p.get("ph",330),330); d=ImageDraw.Draw(C)
    y=headline(d,base+50,p,64)
    f=ft(SB,28); fh=ft(XB,24)
    S.tracked(d,(70,y+22),"E PENTRU TINE DACĂ",fh,RED,3); y+=44
    for b in p["pro"]:
        for k,l in enumerate(wrap(d,b,f,W-200)): 
            if k==0: tick(d,72,y+4)
            d.text((112,y),l,font=f,fill=INK); y+=40
        y+=6
    y+=10; S.tracked(d,(70,y+22),"POATE NU E PENTRU TINE DACĂ",fh,GREY,3); y+=44
    for b in p["con"]:
        for k,l in enumerate(wrap(d,b,f,W-200)):
            if k==0: dash(d,72,y+4)
            d.text((112,y),l,font=f,fill=(90,90,96)); y+=40
        y+=6
    claimline(d,y+4,p); return d
def t_howto(C,d,p):
    base=product(C,p,p.get("ph",380),360); d=ImageDraw.Draw(C)
    y=headline(d,base+50,p,70); f=ft(SB,30)
    for i,s in enumerate(p["steps"],1):
        d.ellipse((70,y-4,120,y+46),fill=INK); d.text((95,y+21),str(i),font=ft(BLK,28),fill="white",anchor="mm")
        ls=wrap(d,s,f,W-240)
        for k,l in enumerate(ls): d.text((140,y+4+k*40),l,font=f,fill=INK)
        y+=max(70,40*len(ls)+28)
    claimline(d,y,p); return d
def t_text(C,d,p):
    y=300
    if p.get("myth"):
        for lab,txt,col in [("MIT",p["myth"],GREY),("ADEVĂR",p["fact"],RED)]:
            S.tracked(d,(70,y),lab,ft(XB,28),col,5); y+=30
            f=ft(BLK,58)
            for l in wrap(d,txt,f,W-140): d.text((70,y),l,font=f,fill=INK if col==RED else (140,140,146)); y+=66
            y+=60
    else:
        d.rectangle((70,y,130,y+6),fill=RED); y+=40
        f=S.fit(d,max(p["big"],key=len),BLK,104,W-140)
        for i,l in enumerate(p["big"]): d.text((70,y),l,font=f,fill=RED if i==len(p["big"])-1 else INK); y+=f.size*1.04
        y+=30
    for l in wrap(d,p.get("sub",""),ft(MD,32),W-140): d.text((70,y),l,font=ft(MD,32),fill=GREY); y+=46
    return d
def t_photo(C,d,p):
    im=Image.open(p["photo"]).convert("RGB"); bw,bh=W-140,p.get("photo_h",780)
    s=max(bw/im.width,bh/im.height); im=im.resize((int(im.width*s)+1,int(im.height*s)+1),Image.LANCZOS)
    fy=p.get("focus_y",0.3); x=(im.width-bw)//2; yy=int((im.height-bh)*fy); im=im.crop((x,yy,x+bw,yy+bh))
    m=Image.new("L",im.size,0); ImageDraw.Draw(m).rounded_rectangle((0,0,bw,bh),radius=28,fill=255)
    sh=Image.new("L",C.size,0); sh.paste(m,(80,175)); sh=sh.filter(ImageFilter.GaussianBlur(24)).point(lambda v:int(v*0.25))
    C.alpha_composite(Image.merge("RGBA",[Image.new("L",C.size,0)]*3+[sh]))
    C.paste(im,(70,160),m); d=ImageDraw.Draw(C)
    y=160+bh+40; d.rectangle((70,y,130,y+6),fill=RED); y+=26
    f1=S.fit(d,p["h1"],BLK,64,W-140); d.text((70,y),p["h1"],font=f1,fill=INK); y+=f1.size*1.02
    if p.get("h2"): f2=S.fit(d,p["h2"],BLK,64,W-140); d.text((70,y),p["h2"],font=f2,fill=RED); y+=f2.size*1.15
    d.text((70,y),p.get("sub",""),font=ft(MD,28),fill=GREY)
    return d
def make(p,out):
    C=S.bg(W,H); d=ImageDraw.Draw(C); header(C,d,p)
    d={"prod":t_prod,"proc":t_proc,"howto":t_howto,"text":t_text,"photo":t_photo}[p["type"]](C,d,p) if p["type"]!="poll" else None
    if p["type"]=="poll":
        C2=None; S.make(p,out,False); return
    footer(ImageDraw.Draw(C),p); C.convert("RGB").save(out,quality=93)
if __name__=="__main__":
    cfg=json.load(open(sys.argv[1])); o=sys.argv[2]; os.makedirs(o,exist_ok=True)
    only=sys.argv[3].split(",") if len(sys.argv)>3 else None
    for p in cfg:
        if only and p["slug"] not in only: continue
        make(p,f"{o}/{p['slug']}.jpg")
