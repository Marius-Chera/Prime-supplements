import json,re
U="https://primesupplements.ro"
old={p['handle']:p for p in json.load(open('old_html.json'))}
ids={p['handle']:p['id'] for p in json.load(open('old_seo.json'))}
DISC="Nu. Prețul pachetului este deja redus și nu se cumulează cu alte coduri de reducere, inclusiv codurile partenerilor și sportivilor Prime."
LINKS={"Prime Whey – proteină din zer, 2 kg":"/products/prime-whey-2000g","Prime Whey – proteină din zer, 1 kg":"/products/prime-whey-1000g",
"Creatină monohidrată Creapure®":"/products/creatina-creapure","Shaker Prime 600 ml":"/products/prime-shaker-customised","Nitrox 3D":"/products/nitrox",
"Aminoacizi esențiali EAA":"/products/eaa-aminoacizi-esentiali","L-glutamină Recovery Glutamin Kyowa®":"/products/recovery-glutamin",
"Fiber – băutură cu fibre":"/products/fiber-blood-orange","Tricou supradimensionat bărbați Prime Hammer 3.0":"/products/tricou-oversized-barbati-hammer-3-0-prime-negru",
"Pantaloni scurți waffle bărbați Prime Hammer 3.0":"/products/pantaloni-scurti-waffle-barbati-hammer-3-0-prime-negri","Maiou fitness bărbați Prime Edge":"/products/maieu-fitness-barbati-edge-prime-negru",
"Pantaloni de trening bărbați Prime Hammer 3.0":"/products/pantaloni-trening-barbati-hammer-3-0-prime-negri","Thermo Core":"/products/thermo-core-120-caps","Water Out":"/products/water-out-120-caps",
"Cremă de orez Prime Creamy Rice":"/collections/crema-de-orez","Omega-3 din ulei de pește":"/products/omega-3","Magneziu bisglicinat 300 mg":"/products/magneziu-bisglicinat-80-caps",
"Vitamina C 1000 mg":"/products/vitamin-c-1000-80-caps","baton proteic căpșuni":"/products/baton-proteic-capsuni","baton proteic caramel sărat":"/products/baton-proteic-caramel-sarat","baton proteic cocos și caramel":"/products/baton-proteic-cocos-si-caramel"}
BLOG={}
for h,t in [("creapure-vs-creatina-monohidrata-obisnuita","Creapure® vs creatină monohidrată obișnuită: ce diferă"),("cata-proteina-trebuie-zi-calcul-greutate-obiectiv","Câtă proteină pe zi: calcul pe greutate și obiectiv"),("cum-se-ia-creatina","Cum se ia creatina: doza de pe etichetă"),("cum-se-prepara-crema-de-orez","Cum se prepară crema de orez?"),("budinca-proteica-din-crema-de-orez-cu-ciocolata-desert-cremos-gata-rapid","Budincă proteică din cremă de orez cu ciocolată"),("crema-de-orez-dimineata","Crema de orez dimineața: rutina matinală pentru energie"),("in-cat-timp-face-efect-creatina","În cât timp face efect creatina: primele 30 de zile"),("pre-workout-cu-creatina","Pre-workout cu creatină: cum le combini corect"),("pre-workout-ce-este-cum-se-ia","Pre-workout: ce este, cum se ia și ce mănânci înainte"),("aminoacizi-esentiali-dozaj","Aminoacizi esențiali: dozaj și când se iau suplimentele EAA"),("cand-se-ia-glutamina","Când se ia glutamina: dimineața, seara sau după antrenament"),("glutamina-combinatii","Glutamina: combinații cu creatină, proteine și BCAA"),("doza-zilnica-de-fibre","Doza zilnică de fibre: cât și când să iei"),("thermo-core-ghid","Thermo Core: ghid de ingrediente, dozaj și administrare"),("cum-se-ia-l-carnitina","Cum se ia L-carnitina: doza pe zi și cum citești eticheta"),("5-idei-de-deserturi-delicioase-cu-crema-de-orez","5 idei de deserturi cu crema de orez"),("cum-alegi-crema-de-orez","Cum alegi crema de orez"),("epa-dha-explicate-cat-omega-3-trebuie-zi","EPA și DHA explicate: cât Omega-3 îți trebuie pe zi"),("magneziu-seara-somn-il-iei-doza","Magneziul seara: cum îl iei și ce doză"),("vitamina-c-sportivi-doza-ce-spune-ue","Vitamina C pentru sportivi: doza, momentul și ce spune UE"),("gustari-proteice-birou-idei-sub-250-kcal","Gustări proteice pentru birou: idei sub 250 de kcal"),("batoane-proteice-pentru-refacere","Batoane proteice pentru refacere: ce contează în compoziție"),("oboseala-post-antrenament-batoane-proteice","Oboseala post-antrenament și când te ajută un baton proteic")]:
  BLOG[h]=t
D={
"pachet-starter-forta-prime-whey-2kg-creatina-creapure":dict(
 t="Pachet proteină whey 2 kg + creatină Creapure® | -15%",
 m="Pachet proteină din zer Prime Whey 2 kg + creatină Creapure® 500 g: 455 lei în loc de 540 lei. 7 arome la alegere. Livrare rapidă în toată România.",
 i="Pachetul Starter Forță reunește cele mai căutate două suplimente pentru sală: <strong>proteina din zer Prime Whey 2 kg</strong> și <strong>creatina monohidrată Creapure®</strong> 500 g. Este cel mai comandat duo de pe site și îl primești cu 85 de lei mai ieftin decât dacă ai cumpăra produsele separat. Aroma de proteină o alegi mai sus, din 7 variante.",
 w=["Te antrenezi de cel puțin 3 ori pe săptămână și vrei proteina și creatina într-o singură comandă","Faci antrenamente de forță, sprint sau HIIT","Vrei un preț mai bun pe porție la proteina whey de 2 kg"],
 f=[("Se pot lua proteina și creatina împreună?","Da. Mulți clienți pun porția de creatină direct în shake-ul de proteine. Important este ca aportul de creatină să fie zilnic și constant, conform etichetei."),("Cât durează pachetul?","Creatina de 500 g are 100 de porții, adică aproximativ 3 luni la o porție pe zi. Durata proteinei depinde de câte porții iei pe zi; numărul de porții este trecut pe etichetă."),("Ce aromă de Prime Whey să aleg?","Ai 7 arome. Pentru gusturi clasice alege Bourbon Vanilla, Toffee Chocolate sau Salted Caramel; pentru gusturi fructate, Strawberry Cheesecake, Blueberry Vanilla sau White Chocolate Raspberry."),("Pot folosi un cod de reducere?",DISC)],
 b=["creapure-vs-creatina-monohidrata-obisnuita","cata-proteina-trebuie-zi-calcul-greutate-obiectiv","cum-se-ia-creatina"]),
"pachet-mic-dejun-proteic-prime-whey-2kg-crema-de-orez":dict(
 t="Pachet proteină whey + cremă de orez pentru mic dejun | -15%",
 m="Prime Whey 2 kg + 2 creme de orez de 1 kg (tort de ciocolată, plăcintă cu cocos) la 419 lei în loc de 495 lei. Mic dejun proteic gata în câteva minute.",
 i="Un mic dejun bogat în proteine, cu gust de desert: <strong>proteina din zer Prime Whey 2 kg</strong> și două <strong>creme de orez Prime Creamy Rice</strong> de 1 kg, cu aromă de tort de ciocolată și de plăcintă cu cocos. Economisești 76 de lei față de prețul produselor cumpărate separat.",
 w=["Vrei un mic dejun rapid, gata în câteva minute","Îți place să-ți prepari porridge sau budincă proteică acasă","Vrei să adaugi proteine în prima masă a zilei"],
 f=[("Cum prepar crema de orez cu proteină?","Prepari crema de orez cu apă caldă sau lapte, conform etichetei, apoi adaugi o porție de Prime Whey și amesteci. Rezultatul este o cremă consistentă, ca o budincă."),("Pot schimba aromele de cremă de orez?","Pachetul conține aromele tort de ciocolată și plăcintă cu cocos. Celelalte arome le găsești separat în colecția Cremă de orez."),("Pot folosi un cod de reducere?",DISC)],
 b=["cum-se-prepara-crema-de-orez","budinca-proteica-din-crema-de-orez-cu-ciocolata-desert-cremos-gata-rapid","crema-de-orez-dimineata"]),
"pachet-starter-incepator-prime-whey-1kg-creapure-shaker":dict(
 t="Pachet suplimente începători: whey, creatină, shaker | -17%",
 m="Pachet pentru începători la sală: Prime Whey 1 kg, creatină Creapure® 500 g și shaker Prime 600 ml la 335 lei în loc de 405 lei. Alegi aroma de proteină.",
 i="Începi la sală și nu știi de unde să pornești? Pachetul Starter Începător are cele trei lucruri de bază: <strong>proteină din zer Prime Whey 1 kg</strong>, <strong>creatină monohidrată Creapure®</strong> 500 g și <strong>shakerul Prime</strong> de 600 ml. Economisești 70 de lei (-17%) față de prețul produselor separat.",
 w=["Ești la primele luni de sală","Vrei să încerci proteina în format de 1 kg înainte să treci la 2 kg","Cauți un cadou pentru cineva care începe sala"],
 f=[("Ce suplimente iau ca începător la sală?","Proteina și creatina sunt cele mai simple puncte de pornire. Proteinele contribuie la creșterea și menținerea masei musculare. Creatina crește performanța fizică în exerciții scurte, intense și repetate; efectul benefic se obține la un aport zilnic de 3 g."),("Shakerul este inclus în preț?","Da. Pachetul conține shakerul Prime de 600 ml, pe lângă proteină și creatină."),("Pot folosi un cod de reducere?",DISC)],
 b=["cata-proteina-trebuie-zi-calcul-greutate-obiectiv","cum-se-ia-creatina","in-cat-timp-face-efect-creatina"]),
"pachet-pre-workout-power-nitrox-3d-creatina-creapure":dict(
 t="Pachet pre-workout Nitrox 3D + creatină Creapure® | -16%",
 m="Pre-workout Nitrox 3D 500 g + creatină Creapure® 500 g la 309 lei în loc de 370 lei. 4 arome de pre-workout la alegere. Livrare rapidă în toată România.",
 i="Pentru antrenamentele grele: <strong>pre-workout-ul Nitrox 3D</strong> (500 g, 25 de porții) și <strong>creatina monohidrată Creapure®</strong> 500 g, într-o singură comandă. Economisești 61 de lei față de prețul separat. Aroma de Nitrox 3D o alegi mai sus.",
 w=["Te antrenezi intens: forță, crossfit, HIIT","Folosești deja pre-workout și vrei să adaugi creatina în rutină","Tolerezi bine cafeina"],
 f=[("Pot lua pre-workout și creatină în aceeași zi?","Da, sunt produse diferite. Nitrox 3D se ia înainte de antrenament, iar creatina zilnic, inclusiv în zilele fără antrenament. Respectă doza de pe fiecare etichetă."),("Nitrox 3D conține cafeină?","Da. Nu se recomandă copiilor, femeilor însărcinate sau care alăptează și persoanelor sensibile la cafeină. Evită să-l iei seara, aproape de ora de culcare."),("Pot folosi un cod de reducere?",DISC)],
 b=["pre-workout-cu-creatina","pre-workout-ce-este-cum-se-ia","creapure-vs-creatina-monohidrata-obisnuita"]),
"pachet-recuperare-eaa-glutamina-kyowa":dict(
 t="Pachet aminoacizi EAA + L-glutamină Kyowa® | -16%",
 m="Aminoacizi esențiali EAA 500 g + L-glutamină Kyowa® 500 g la 285 lei în loc de 340 lei. Alegi aroma pentru fiecare. Livrare rapidă în toată România.",
 i="Pachetul Recuperare reunește <strong>aminoacizii esențiali EAA</strong> (500 g) și <strong>L-glutamina Kyowa®</strong> (500 g), două produse pe care sportivii le comandă des împreună. Economisești 55 de lei și alegi aroma pentru fiecare: 4 arome de EAA și 5 variante de glutamină, inclusiv fără aromă.",
 w=["Te antrenezi des și vrei o băutură cu aminoacizi în timpul antrenamentului","Vrei să combini EAA cu glutamina","Preferi pudrele care se amestecă ușor în apă"],
 f=[("Care e diferența dintre EAA și BCAA?","BCAA conțin trei aminoacizi: leucină, izoleucină și valină. EAA conțin toți aminoacizii esențiali, inclusiv cei trei din BCAA."),("Când se iau EAA și glutamina?","Cel mai des în timpul sau după antrenament, fiecare conform dozei de pe propria etichetă."),("Pot folosi un cod de reducere?",DISC)],
 b=["aminoacizi-esentiali-dozaj","cand-se-ia-glutamina","glutamina-combinatii"]),
"pachet-daily-fit-fiber-creatina-creapure":dict(
 t="Pachet fibre Fiber + creatină Creapure® 500 g | -16%",
 m="Băutura cu fibre Fiber 500 g (portocală roșie) + creatină Creapure® 500 g la 259 lei în loc de 310 lei. Două produse pentru rutina zilnică, la preț de pachet.",
 i="Două produse simple pentru fiecare zi: <strong>Fiber</strong>, băutura cu fibre cu aromă de portocală roșie (500 g), și <strong>creatina monohidrată Creapure®</strong> 500 g. Economisești 51 de lei față de prețul produselor separat.",
 w=["Vrei să adaugi fibre în alimentație într-un mod practic","Iei creatină zilnic și vrei s-o legi de o rutină de dimineață","Preferi băuturile cu aromă de fructe în locul capsulelor"],
 f=[("Cum se ia Fiber?","De preferat dimineața sau înainte de masă, cu un pahar mare de apă, conform dozei de pe etichetă."),("Pot amesteca creatina în băutura Fiber?","Da. Creatina monohidrată Creapure® nu are aromă și se poate amesteca în orice băutură. Bea suficientă apă în cursul zilei."),("Pot folosi un cod de reducere?",DISC)],
 b=["doza-zilnica-de-fibre","cum-se-ia-creatina","creapure-vs-creatina-monohidrata-obisnuita"]),
"pachet-set-hammer-3-0-tricou-pantaloni-scurti":dict(
 t="Set haine sală bărbați Prime Hammer 3.0: tricou + șort | -15%",
 m="Set echipament de sală pentru bărbați: tricou oversized + pantaloni scurți waffle Prime Hammer 3.0, negri, la 245 lei în loc de 290 lei. Mărimi S–5XL.",
 i="Ținuta completă pentru sală din linia <strong>Prime Hammer 3.0</strong>: <strong>tricoul oversized</strong> și <strong>pantalonii scurți waffle</strong>, ambele negre. Economisești 45 de lei față de cumpărarea separată și alegi mărimea pentru fiecare piesă.",
 w=["Vrei un outfit de sală asortat, gata ales","Preferi croiala lejeră, oversized","Cauți un cadou pentru cineva care merge la sală"],
 f=[("Cum aleg mărimea tricoului?","Tricoul are croială oversized, deci vine lejer. Dacă vrei un fit mai aproape de corp, alege o mărime mai mică. Dacă nu ești sigur, scrie-ne pe WhatsApp."),("Pot alege mărimi diferite pentru tricou și pantaloni?","Da. Alegi separat mărimea tricoului și mărimea pantalonilor scurți."),("Pot folosi un cod de reducere?",DISC)],
 b=[]),
"pachet-set-antrenament-hammer-maiou-pantaloni-trening":dict(
 t="Set sală bărbați Prime: maiou Edge + pantaloni trening | -15%",
 m="Set echipament de antrenament pentru bărbați: maiou fitness Prime Edge + pantaloni de trening Prime Hammer 3.0, negri, la 238 lei în loc de 280 lei.",
 i="Setul de antrenament Prime pentru bărbați: <strong>maioul fitness Edge</strong> și <strong>pantalonii de trening Hammer 3.0</strong>, ambele negre. Economisești 42 de lei față de cumpărarea separată și alegi mărimea pentru fiecare piesă.",
 w=["Te antrenezi în sală și vrei libertate de mișcare la umeri și brațe","Vrei pantaloni de trening pentru încălzire și pentru drumul spre sală","Cauți un cadou pentru cineva care merge la sală"],
 f=[("Pot alege mărimi diferite pentru maiou și pantaloni?","Da. Alegi separat mărimea maioului (S/M până la 4XL/5XL) și a pantalonilor (S–XL)."),("Ce culoare au piesele?","Ambele piese sunt negre, cu logo Prime."),("Pot folosi un cod de reducere?",DISC)],
 b=[]),
"pachet-duo-capsule-thermo-core-water-out":dict(
 t="Pachet Thermo Core + Water Out, 2 × 120 capsule | -15%",
 m="Thermo Core 120 capsule (L-carnitină, ceai verde, cafeină) + Water Out 120 capsule (urzică, păpădie, sparanghel) la 195 lei în loc de 230 lei.",
 i="Cele două formule în capsule Prime comandate cel mai des împreună: <strong>Thermo Core</strong>, cu L-carnitină, extract de ceai verde, cafeină și capsaicină, și <strong>Water Out</strong>, cu extracte din urzică, păpădie și sparanghel. Primești câte 120 de capsule din fiecare, cu 35 de lei mai puțin decât separat.",
 w=["Ai folosit deja produsele separat și vrei să le comanzi împreună","Preferi suplimentele în capsule, ușor de luat oriunde","Nu ești sensibil la cafeină (Thermo Core conține cafeină)"],
 f=[("Pot lua Thermo Core și Water Out în aceeași zi?","Fiecare produs se ia separat, conform etichetei, fără a depăși doza zilnică recomandată. Dacă ai afecțiuni sau urmezi un tratament, întreabă medicul înainte."),("Thermo Core conține cafeină?","Da. Nu se recomandă copiilor, femeilor însărcinate sau care alăptează și persoanelor sensibile la cafeină."),("Pot folosi un cod de reducere?",DISC)],
 b=["thermo-core-ghid","cum-se-ia-l-carnitina"]),
"pachet-trio-crema-de-orez-3-arome":dict(
 t="Cremă de orez Prime, pachet 3 arome × 1 kg | -16%",
 m="Pachet 3 × cremă de orez Prime Creamy Rice 1 kg: tort de ciocolată, biscuiți cu cremă și plăcintă cu cocos, la 168 lei în loc de 200 lei.",
 i="Cele mai comandate trei arome de <strong>cremă de orez Prime Creamy Rice</strong>, câte 1 kg din fiecare: tort de ciocolată, biscuiți cu cremă și plăcintă cu cocos. Economisești 32 de lei și ai 3 kg de cremă de orez, ca să alternezi gustul de la o zi la alta.",
 w=["Mănânci des cremă de orez și nu vrei să rămâi fără","Vrei să încerci mai multe arome deodată","Îți faci deserturi și budinci proteice acasă"],
 f=[("Ce este crema de orez?","Un preparat din orez măcinat fin, gata în câteva minute cu apă sau lapte. O poți mânca la micul dejun, ca gustare sau înainte de antrenament."),("Cum se prepară?","Conform etichetei: amesteci pudra cu apă caldă sau lapte și o lași puțin să se îngroașe. Poți adăuga proteină, fructe sau unt de arahide."),("Pot folosi un cod de reducere?",DISC)],
 b=["cum-se-prepara-crema-de-orez","5-idei-de-deserturi-delicioase-cu-crema-de-orez","cum-alegi-crema-de-orez"]),
"pachet-rutina-zilnica-omega-3-magneziu-vitamina-c":dict(
 t="Pachet vitamine zilnice: Omega-3, magneziu, vitamina C | -21%",
 m="Pachet Omega-3 (80 capsule), magneziu bisglicinat 300 mg și vitamina C 1000 mg la 149 lei în loc de 190 lei. Rutina zilnică de suplimente, la preț de pachet.",
 i="Trei suplimente de bază pentru rutina zilnică, într-un singur pachet: <strong>Omega-3 din ulei de pește</strong>, <strong>magneziu bisglicinat 300 mg</strong> și <strong>vitamina C 1000 mg</strong>, câte 80 de capsule. Economisești 41 de lei (-21%), cea mai mare reducere dintre pachetele Prime.",
 w=["Vrei o rutină simplă de suplimente, fără să cauți fiecare produs separat","Te antrenezi și vrei să-ți completezi alimentația","Iei deja unul dintre produse și vrei să le ai pe toate trei"],
 f=[("Le pot lua pe toate trei în aceeași zi?","Da. Fiecare se ia separat, conform dozei de pe propria etichetă, de preferat în timpul mesei."),("Ce formă de magneziu conține pachetul?","Bisglicinat de magneziu, 300 mg, în capsule."),("Pot folosi un cod de reducere?",DISC)],
 b=["epa-dha-explicate-cat-omega-3-trebuie-zi","magneziu-seara-somn-il-iei-doza","vitamina-c-sportivi-doza-ce-spune-ue"]),
"pachet-mix-9-batoane-proteice":dict(
 t="Batoane proteice Prime, pachet 9 bucăți, 3 arome | -16%",
 m="Pachet 9 batoane proteice Prime de 55 g: câte 3 cu căpșuni, caramel sărat și cocos cu caramel, la 64 lei în loc de 76,50 lei. Gustarea pentru birou și sală.",
 i="Nouă <strong>batoane proteice Prime</strong> de 55 g, câte trei din fiecare aromă preferată: căpșuni, caramel sărat și cocos cu caramel. Plătești 64 de lei în loc de 76,50 lei, adică aproximativ 7,11 lei pe baton.",
 w=["Vrei o gustare la îndemână în geantă sau la birou","Cauți o alternativă la dulciuri după sală","Vrei să încerci toate cele trei arome"],
 f=[("Cât cântărește un baton?","55 g. Valorile nutriționale și alergenii sunt trecuți pe ambalajul fiecărui baton."),("Pot alege alte arome?","Pachetul are aromele fixe. Batoanele se găsesc și separat, în colecția Batoane proteice."),("Pot folosi un cod de reducere?",DISC)],
 b=["gustari-proteice-birou-idei-sub-250-kcal","batoane-proteice-pentru-refacere","oboseala-post-antrenament-batoane-proteice"]),
}
out=[]
for h,d in D.items():
  html=old[h]['descriptionHtml']
  assert len(d['t'])<=62,(h,len(d['t'])); assert 120<=len(d['m'])<=160,(h,len(d['m']))
  # intro: replace 2nd paragraph
  ps=re.findall(r"<p>.*?</p>",html)
  html=html.replace(ps[1],"<p>"+d['i']+"</p>",1)
  # links in list
  def li(mo):
    s=mo.group(1)
    for k,v in sorted(LINKS.items(),key=lambda x:-len(x[0])):
      if k in s and '<a ' not in s:
        s=s.replace(k,f'<a href="{v}">{k}</a>',1)
    return "<li>"+s+"</li>"
  html=re.sub(r"<li>(.*?)</li>",li,html)
  who="<h2>Pentru cine este pachetul</h2><ul>"+"".join(f"<li>{x}</li>" for x in d['w'])+"</ul>"
  anchor=re.search(r"<h2>(De ce împreună|Mod de utilizare|Mărimi)</h2>",html).group(0)
  html=html.replace(anchor,who+anchor,1)
  faq="<h2>Întrebări frecvente</h2>"+"".join(f"<h3>{q}</h3><p>{a}</p>" for q,a in d['f'])
  if d['b']: faq+="<h2>Citește și</h2><ul>"+"".join(f'<li><a href="/blogs/news/{b}">{BLOG[b]}</a></li>' for b in d['b'])+"</ul>"
  html=html.replace("<p><strong>Important:",faq+"<p><strong>Important:",1)
  assert html.count("Important:")==1 and html.count("Întrebări frecvente")==1
  out.append(dict(id=ids[h],handle=h,descriptionHtml=html,seo=dict(title=d['t'],description=d['m'])))
json.dump(out,open('pachete_new.json','w'),ensure_ascii=False)
print(len(out)); print(out[0]['descriptionHtml'])
for o in out: print(len(o['seo']['title']),len(o['seo']['description']),o['handle'], o['descriptionHtml'].count('<a '))
