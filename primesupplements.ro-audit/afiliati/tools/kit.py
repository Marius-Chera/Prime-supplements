from PIL import Image, ImageDraw, ImageFont, ImageFilter
TH={"shaker":45}
import sys
FB="/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf"; FS="/usr/share/fonts/opentype/inter/Inter-Bold.otf"
RED=(237,28,36); BLK=(25,25,25)
def cut(name,th=8):
    im=Image.open(name).convert("RGB")
    bg=im.getpixel((5,5))
    m=im.copy(); 
    for c in [(0,0),(im.width-1,0),(0,im.height-1),(im.width-1,im.height-1)]:
        ImageDraw.floodfill(m,c,(255,0,255),thresh=th)
    a=Image.new("L",im.size,255); px=m.load(); ap=a.load()
    for y in range(im.height):
        for x in range(im.width):
            if px[x,y]==(255,0,255): ap[x,y]=0
    a=a.filter(ImageFilter.GaussianBlur(1))
    im.putalpha(a); return im.crop(im.getbbox())

from PIL import Image, ImageDraw, ImageFont, ImageFilter
RED=(237,28,36)
def grad(W,H):
    C=Image.new("RGB",(W,H),(14,14,16)); g=Image.new("L",(W,H),0); gd=ImageDraw.Draw(g)
    gd.ellipse((-W*0.3,H*0.18,W*1.3,H*0.85),fill=120); g=g.filter(ImageFilter.GaussianBlur(160))
    C.paste(Image.new("RGB",(W,H),(120,14,18)),(0,0),g); return C
def fit(d,txt,font,maxw,size):
    while d.textlength(txt,font=ImageFont.truetype(font,size))>maxw: size-=2
    return ImageFont.truetype(font,size)
def place(C,names,H,cy,maxw,gap=-40):
    ims=[cut(n) for n in names]
    ims=[i.resize((int(i.width*H/i.height),H),Image.LANCZOS) for i in ims]
    tot=sum(i.width for i in ims)+gap*(len(ims)-1)
    if tot>maxw:
        s=maxw/tot; ims=[i.resize((int(i.width*s),int(i.height*s)),Image.LANCZOS) for i in ims]; tot=maxw; gap=int(gap*s)
    x=(C.width-tot)//2; base=cy+max(i.height for i in ims)//2; pos=[]
    for i in ims: pos.append(x); x+=i.width+gap
    order=[0,2,1] if len(ims)==3 else range(len(ims))
    for k in order:
        i=ims[k]
        sh=Image.new("RGBA",(i.width,50),(0,0,0,0)); ImageDraw.Draw(sh).ellipse((20,0,i.width-20,50),fill=(0,0,0,160))
        sh=sh.filter(ImageFilter.GaussianBlur(14)); C.paste(sh,(pos[k],base-25),sh)
        glow=Image.new("RGBA",i.size,(255,255,255,0)); 
        C.paste(i,(pos[k],base-i.height),i)
    return base
def make(out,W,H,names,tag,title,sub,claim,story):
    C=grad(W,H); d=ImageDraw.Draw(C)
    top=260 if story else 70
    d.text((W//2,top),"PRIME SUPPLEMENTS",font=ImageFont.truetype(FS,30),fill=(200,200,200),anchor="mm")
    d.rectangle((W//2-60,top+30,W//2+60,top+36),fill=RED)
    # tag pill
    f=ImageFont.truetype(FB,34); tw=d.textlength(tag,font=f)
    py=top+90; d.rounded_rectangle((W//2-tw/2-30,py-32,W//2+tw/2+30,py+32),radius=32,fill=RED)
    d.text((W//2,py),tag,font=f,fill="white",anchor="mm")
    ft=fit(d,title,FB,W-120,104 if story else 92)
    d.text((W//2,py+120),title,font=ft,fill="white",anchor="mm")
    d.text((W//2,py+205),sub,font=fit(d,sub,FS,W-140,44),fill=(215,215,215),anchor="mm")
    ph=700 if story else 560; cy=py+260+ph//2+(0 if story else 10)
    base=place(C,names,ph,cy,W-60 if story else W-100,-90 if story else -40)
    yb=base+70
    if claim:
        fc=ImageFont.truetype(FS,30)
        for j,l in enumerate(claim.split("\n")):
            d.text((W//2,yb+j*40),l,font=fc,fill=(225,225,225),anchor="mm")
    if story:
        # space for affiliate code sticker
        y=H-330; d.rounded_rectangle((140,y-60,W-140,y+60),radius=60,outline="white",width=4)
        d.text((W//2,y),"CODUL MEU: ________",font=ImageFont.truetype(FB,44),fill="white",anchor="mm")
        d.text((W//2,y+105),"primesupplements.ro",font=ImageFont.truetype(FS,32),fill=(200,200,200),anchor="mm")
    else:
        d.rectangle((0,H-110,W,H),fill=RED)
        d.text((W//2,H-55),"primesupplements.ro  •  link în bio",font=ImageFont.truetype(FB,40),fill="white",anchor="mm")
    C.save(out,quality=92)

# Folosire: python3 kit.py config.json  (config: listă de {slug, imagini:[căi jpg fundal alb], tag, titlu, subtitlu, text})
# Textul de jos folosește DOAR afirmații autorizate UE (sau text fără afirmație de sănătate).
if __name__=="__main__":
    import json,sys,os
    cfg=json.load(open(sys.argv[1])); out=sys.argv[2] if len(sys.argv)>2 else "."
    os.makedirs(out,exist_ok=True)
    for p in cfg:
        make(f"{out}/{p['slug']}-feed.jpg",1080,1350,p["imagini"],p["tag"],p["titlu"],p["subtitlu"],p.get("text",""),False)
        make(f"{out}/{p['slug']}-story.jpg",1080,1920,p["imagini"],p["tag"],p["titlu"],p["subtitlu"],p.get("text",""),True)
