from PIL import Image, ImageDraw, ImageFont
import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/psi')
from colormath import cr,de2000
F='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
fT=ImageFont.truetype(FB,30); fH=ImageFont.truetype(FB,22); fN=ImageFont.truetype(F,19); fS=ImageFont.truetype(FB,18)
rows=[('button','1. Butonul roșu („Cumpără acum”, „Adaugă în coș”, „Trimite”)','#ec1e24 → #e91d23 · contrast 4,39 → 4,50 · ΔE2000 = 0,69: sub pragul de percepție, nu se vede',1.0,None),
      ('instock','2. Textul „În stoc” (homepage + pagina de produs)','#00a341 → #007f2b · contrast 2,92 → 4,53 pe gri (3,33 → 5,16 pe alb) · SE VEDE: verde mai închis',1.0,None),
      ('reviewer','3. Numele recenzenților Judge.me (caruselul de pe homepage)','opacitate 0,600 → 0,613 (#707070 → #6d6d6d) · contrast 4,34 → 4,54 · ΔE2000 = 1,17: practic nu se vede',1.0,None),
      ('dots','4. Punctele galeriei de produs (mobil)','distanța dintre puncte 16 → 18 px · SE VEDE, minor (zona de atingere de 24 px se mărește invizibil)',2.0,None),
      ('anpc','5. Siglele ANPC în footer (mobil)','siglele nu mai sunt turtite (proporțiile reale), cu ~10% mai scunde · SE VEDE, minor',1.0,None)]
W=1240; pad=30; blocks=[]
for id,title,note,scale,crop in rows:
    suf='-name' if id=='reviewer' else ''
    a=Image.open(f'{id}-before{suf}.png').convert('RGB'); b=Image.open(f'{id}-after{suf}.png').convert('RGB')
    if crop: a=a.crop(crop); b=b.crop(crop)
    if scale!=1.0: a=a.resize((int(a.width*scale),int(a.height*scale)),Image.LANCZOS); b=b.resize((int(b.width*scale),int(b.height*scale)),Image.LANCZOS)
    maxw=(W-3*pad)//2
    if a.width>maxw:
        r=maxw/a.width; a=a.resize((maxw,int(a.height*r)),Image.LANCZOS); b=b.resize((maxw,int(b.height*r)),Image.LANCZOS)
    h=100+a.height+30
    blk=Image.new('RGB',(W,h),'white'); d=ImageDraw.Draw(blk)
    d.text((pad,8),title,font=fH,fill=(20,20,20)); d.text((pad,40),note,font=fN,fill=(80,80,80))
    x1=pad; x2=pad*2+maxw
    d.text((x1,72),'ÎNAINTE (acum)',font=fS,fill=(120,120,120)); d.text((x2,72),'DUPĂ',font=fS,fill=(0,110,40))
    blk.paste(a,(x1,100)); blk.paste(b,(x2,100))
    d.rectangle((x1-1,99,x1+a.width,100+a.height),outline=(210,210,210)); d.rectangle((x2-1,99,x2+b.width,100+b.height),outline=(210,210,210))
    d.line((pad,h-2,W-pad,h-2),fill=(225,225,225),width=2)
    blocks.append(blk)
head=Image.new('RGB',(W,200),'white'); d=ImageDraw.Draw(head)
d.text((pad,24),'Micro-schimbări care duc Accesibilitatea la 100 (aprobarea ta)',font=fT,fill=(10,10,10))
intro=['Capturi din tema de test pe mobil, cu schimbarea simulată în browser (rândul 3: același text,',
       'același font). Nimic nu este aplicat încă. 1 și 3 nu se văd (sub pragul de percepție); 2, 4 și 5',
       'se văd puțin. Fără 2 și 4 homepage-ul nu poate ajunge la 100 la Accesibilitate.',
       'Răspunde „da” (la toate) sau numerele pe care le vrei.']
for i,line in enumerate(intro):
    assert d.textlength(line,font=fN)<=W-2*pad, line
    d.text((pad,72+i*26),line,font=fN,fill=(70,70,70))
H=head.height+sum(b.height for b in blocks)+20
sheet=Image.new('RGB',(W,H),'white'); sheet.paste(head,(0,0)); y=head.height
for b in blocks: sheet.paste(b,(0,y)); y+=b.height
sheet.save('aprobare-micro-schimbari.png'); print(sheet.size)
