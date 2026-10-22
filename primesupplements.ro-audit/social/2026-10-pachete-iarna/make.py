import sys; sys.path.insert(0,'.')
from kit3 import cut
from PIL import Image, ImageDraw, ImageFont, ImageFilter
F='/usr/share/fonts/opentype/inter/'
def f(n,s): return ImageFont.truetype(F+n,s)
def make(imgs,badge,title,sub,out):
  W=1200;C=Image.new('RGB',(W,W),(240,240,240));d=ImageDraw.Draw(C)
  # floor shadow band
  sh=Image.new('L',(W,W),0);ds=ImageDraw.Draw(sh);ds.rectangle([30,840,W-30,872],fill=60);sh=sh.filter(ImageFilter.GaussianBlur(14))
  C.paste((205,205,205),(0,0),sh)
  cuts=[cut(p,8,3) for p in imgs]
  n=len(cuts);maxh=560 if n<3 else 520;slotw=(W-120)//n
  for i,im in enumerate(cuts):
    im=im.crop(im.getbbox()); sc=min(maxh/im.height,(slotw-30)/im.width); im=im.resize((int(im.width*sc),int(im.height*sc)),Image.LANCZOS)
    cx=60+slotw*i+slotw//2; C.paste(im,(cx-im.width//2,860-im.height),im)
  # badge parallelogram
  d.polygon([(80,60),(390,60),(360,210),(60,210)],fill=(233,29,35))
  bf=f('Inter-Bold.otf',96);tw=d.textlength(badge,font=bf);d.text((225-tw/2,80),badge,font=bf,fill='white')
  pf=f('Inter-Bold.otf',30);t='PACHET PRIME';tw=d.textlength(t,font=pf);d.text((1140-tw,82),t,font=pf,fill=(26,26,26));d.rectangle([1140-tw-18,120,1140,126],fill=(233,29,35))
  d.rectangle([0,920,W,W],fill=(26,26,26))
  tf=f('Inter-Bold.otf',62);tw=d.textlength(title,font=tf);d.text(((W-tw)/2,965),title,font=tf,fill='white')
  sf=f('Inter-SemiBold.otf',34);tw=d.textlength(sub,font=sf);d.text(((W-tw)/2,1062),sub,font=sf,fill=(200,200,200))
  C.save(out,quality=90)
S='pk3/src/'
make([S+'d3.jpg']*3,'-34%','CURA DE IARNĂ D3 + K2','3 × Vitamina D3 + K2, 80 capsule','pk3/pachet-cura-de-iarna-d3-k2.jpg')
make([S+'d3.jpg',S+'mag.jpg',S+'nac.jpg'],'-20%','PACHET IARNĂ COMPLET','Vitamina D3 + K2 + Magneziu bisglicinat + NAC','pk3/pachet-iarna-complet.jpg')
make([S+'mag.jpg']*2,'-18%','DUO MAGNEZIU','2 × Magneziu bisglicinat 300 mg, 80 capsule','pk3/pachet-duo-magneziu.jpg')
from PIL import Image as I
s=I.new('RGB',(1800,600),'white')
for k,n in enumerate(['pachet-cura-de-iarna-d3-k2','pachet-iarna-complet','pachet-duo-magneziu']): s.paste(I.open('pk3/'+n+'.jpg').resize((600,600)),(600*k,0))
s.save('pk3/prev.jpg')
