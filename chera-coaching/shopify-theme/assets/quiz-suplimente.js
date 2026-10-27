/* Chera Protocol – a doua extindere a concluziilor (27.10.2026, cererea proprietarului: de 5 ori mai mult
   în cardurile „Cum ești / Cum te antrenezi / Cum mănânci” și suplimente mult mai detaliate).
   Persoana I, fără nume de autori. Se încarcă după quiz-rezultat.js. Format supliment: {n: nume, d: doză, t: când, w: de ce}. */
Object.assign(window.CHERA_EXT, {

/* ===== completări pe tipuri: cum ești, cum te antrenezi, cum mănânci, stack-ul de suplimente ===== */
more: {
 "1A": {
  who: [
   "Ai toleranță mare la stres și la stimulente; te simți cel mai bine sub presiune, dar ai nevoie de victorii rapide ca să rămâi implicat.",
   "Sistemul tău nervos se recuperează repede după efort scurt și greu, dar se consumă la efort lung și monoton.",
   "Ești dominant în grup: îți place să conduci și să fii cel mai puternic din sală.",
   "Corpul tău tinde spre densitate și forță mai mult decât spre volum; mușchii tăi cresc din tensiune mare, nu din pompare.",
   "Te plictisesc detaliile; preferi un plan simplu, clar, cu ținte măsurabile.",
   "Sari ușor peste încălzire și peste săptămânile ușoare, iar de aici vin aproape toate accidentările la profilul tău."
  ],
  train: [
   "La exercițiul principal al zilei lucrezi cu 80–90% din maxim: 4–6 serii de 3–5 repetări, apoi treci la volum moderat pentru restul antrenamentului.",
   "Folosește serii în val: 5-3-1, apoi încă o dată 5-3-1 cu puțin mai mult. A doua undă iese aproape mereu mai puternică decât prima.",
   "Fiecare grupă de 2 ori pe săptămână cu volum mic e mai bine pentru tine decât o dată pe săptămână cu volum mare.",
   "Înainte de seriile grele, 2–3 sărituri sau o aruncare cu mingea medicinală: îți pornesc sistemul nervos și cresc forța din prima serie.",
   "Stimulentele merg la tine, dar păstrează o zi pe săptămână fără cafeină, ca să nu-ți crească toleranța."
  ],
  diet: [
   "Poți folosi o fereastră de mâncat mai scurtă (10–12 ore) fără probleme, cât timp proteinele rămân la țintă.",
   "În zilele de pauză carbohidrații scad cu 30–50%; grăsimile urcă puțin ca să rămână caloriile.",
   "Mâncare simplă și repetitivă: aceleași 4–5 mese de bază, ca să nu pierzi timp și energie gândindu-te la ele."
  ],
  stack: [
   {n:"Creatină monohidrat", d:"5 g", t:"zilnic, oricând, inclusiv în zilele de pauză", w:"Forță, densitate musculară și recuperare între seriile grele. Cel mai studiat supliment din sport; pentru profilul tău e baza."},
   {n:"Cafeină", d:"3 mg/kg corp (200–300 mg la 80 kg)", t:"cu 30–45 de minute înainte de antrenament, nu după ora 14", w:"Crește forța și puterea pe seriile scurte. O zi pe săptămână fără, ca să rămână eficientă."},
   {n:"L-tirozină", d:"500–1.000 mg", t:"înainte de antrenamentele cele mai grele sau în zilele cu somn puțin", w:"Susține dopamina când stresul și oboseala o consumă; păstrează motivația în blocurile grele."},
   {n:"Omega-3 (EPA + DHA)", d:"2–3 g", t:"la mese", w:"Articulații și tendoane solicitate de greutățile mari, inflamație mai mică între antrenamente."},
   {n:"Magneziu bisglicinat", d:"300–400 mg", t:"seara", w:"Profilul tău se încarcă repede ziua; magneziul te ajută să cobori seara și să dormi adânc."},
   {n:"Vitamina D3 + K2", d:"2.000–4.000 UI + 100 µg", t:"dimineața, cu o masă cu grăsimi", w:"Forță, testosteron în limite normale, imunitate. Doza o ajustăm după analiza 25-OH vitamina D."},
   {n:"Rhodiola rosea (3% rosavine)", d:"200–400 mg", t:"dimineața, în blocurile grele de 6–8 săptămâni", w:"Adaptogen pentru oboseala de la volum și stres; o folosești în cicluri, cu 2 săptămâni pauză."}
  ]
 },
 "1B": {
  who: [
   "Ai cel mai rapid sistem nervos dintre toate profilurile: reacționezi, înveți și te plictisești repede.",
   "Ai nevoie de noutate și de joc; rutina îți scade motivația mai repede decât oboseala.",
   "Corpul tău e de obicei atletic, cu talie mică și articulații elastice, dar mai puțin rezistente la volum mare.",
   "Ești bun la mișcări complexe și explozive; la izolările lente te pierzi.",
   "Faci ușor prea multe sporturi deodată și nu mănânci destul pentru tot ce faci.",
   "Te motivează performanța: cât de sus sari, cât de repede alergi, cât ridici, nu doar cum arăți."
  ],
  train: [
   "Antrenament de contrast: o serie grea de 3–5 repetări urmată imediat de o mișcare explozivă pentru aceeași grupă (genuflexiune, apoi săritură; împins, apoi aruncare).",
   "Seturi cluster: 5 × 2 repetări grele cu 15 secunde pauză între ele, pentru forță fără oboseală acumulată.",
   "Schimbi complet exercițiile la 2 săptămâni; păstrezi doar mișcarea de bază ca reper de progres.",
   "Izolările le faci puține, dar în ritm alert, nu lente și lungi.",
   "Antrenamentele de dimineață sau de prânz îți merg cel mai bine, când sistemul nervos e proaspăt."
  ],
  diet: [
   "Gustare cu carbohidrați rapizi dacă ai sport sau al doilea antrenament în aceeași zi.",
   "Fructele și orezul stau în jurul antrenamentului; leguminoasele și fibrele multe, departe de el.",
   "Nu sari peste micul dejun: performanța ta depinde de rezerva de glicogen."
  ],
  stack: [
   {n:"Creatină monohidrat", d:"5 g", t:"zilnic", w:"Putere pe eforturile scurte și explozive; recuperare între sprinturi și serii."},
   {n:"Beta-alanină", d:"3,2 g pe zi, împărțit în 2–4 prize", t:"zilnic, cu mesele", w:"Tamponează aciditatea din mușchi la eforturile de 30 de secunde – 4 minute. Furnicăturile sunt normale și dispar dacă împarți doza."},
   {n:"Electroliți", d:"500–1.000 mg sodiu pe litru", t:"în timpul antrenamentului și al sportului", w:"Transpiri mult; fără electroliți scade performanța și apar crampele."},
   {n:"Colagen + vitamina C", d:"10–15 g colagen + 50 mg vitamina C", t:"cu 30–60 de minute înainte de antrenament", w:"Sprijin pentru tendoane și ligamente, punctul tău slab la volum și sărituri."},
   {n:"Cafeină", d:"2–3 mg/kg corp", t:"înainte de antrenament", w:"Viteză de reacție și putere; nu ai nevoie de doze mari."},
   {n:"Omega-3", d:"2 g EPA + DHA", t:"la mese", w:"Recuperare articulară și inflamație mai mică."},
   {n:"Carbohidrați intra (ciclodextrină sau maltodextrină)", d:"25–40 g", t:"în timpul antrenamentelor de peste 75 de minute", w:"Păstrează intensitatea până la final, fără să cazi la jumătatea antrenamentului."}
  ]
 },
 "2A": {
  who: [
   "Ești echilibrat între forță și volum: nu ai o slăbiciune clară, dar nici un avantaj extrem.",
   "Te adaptezi social; în sală vorbești cu toată lumea și îți place să fii apreciat.",
   "Ai nevoie de varietate, dar nu de haos: schimbare planificată.",
   "Corpul tău răspunde bine la aproape orice metodă 3–4 săptămâni, apoi se adaptează și stagnezi dacă nu schimbi ceva.",
   "Ești sensibil la recunoaștere: un compliment sau o poză bună te motivează o săptămână întreagă.",
   "Riști să te împrăștii: prea multe obiective deodată și niciunul dus la capăt."
  ],
  train: [
   "Blocuri de 3 săptămâni de tensiune (6–8 repetări, tempo controlat), urmate de 3 săptămâni de volum metabolic (12–15 repetări, pauze scurte).",
   "Fiecare grupă din trei unghiuri: un exercițiu compus greu, unul în stretch, unul în contracție maximă.",
   "Superserii între grupe antagoniste, ca să faci mai mult în mai puțin timp fără să scadă calitatea.",
   "Notezi cum te simți după fiecare metodă: la tine contează ce îți place, pentru că atunci ești constant.",
   "Nu treci de 4 tehnici de intensitate pe săptămână pe aceeași grupă."
  ],
  diet: [
   "Raport de pornire: aproximativ 40% carbohidrați, 30% proteine, 30% grăsimi, ajustat după testul de toleranță.",
   "Variezi sursele: rotești carnea, peștele și carbohidrații ca să nu te plictisești de plan.",
   "Cina cu carbohidrați moderați dacă ai dormit prost noaptea trecută."
  ],
  stack: [
   {n:"Creatină monohidrat", d:"5 g", t:"zilnic", w:"Forță și volum; te ajută să duci blocurile de tensiune cu greutăți mai mari."},
   {n:"Proteină din zer (izolat)", d:"30–40 g", t:"după antrenament sau când nu atingi proteinele din mâncare", w:"Comoditate, nu magie: te ajută să ajungi zilnic la țintă."},
   {n:"Omega-3 cu DHA mare", d:"2 g (cel puțin 1 g DHA)", t:"la mese", w:"Concentrare și recuperare; profilul tău folosește mult acetilcolina, iar DHA susține membranele neuronale."},
   {n:"Citicolină", d:"250 mg", t:"dimineața, în zilele cu mult lucru mental", w:"Concentrare și conexiune minte-mușchi în zilele aglomerate."},
   {n:"Magneziu bisglicinat", d:"300 mg", t:"seara", w:"Somn și recuperare; nu lași entuziasmul de ziua să-ți strice noaptea."},
   {n:"Vitamina D3 + K2", d:"2.000 UI + 100 µg", t:"dimineața", w:"Bază pentru imunitate, oase și forță."},
   {n:"Multivitamine și minerale", d:"1 doză", t:"dimineața, cu mâncare", w:"Pe definire, când mănânci mai puțin și mai monoton."}
  ]
 },
 "2B": {
  who: [
   "Sistemul tău nervos e sensibil la stres și la cortizol: stresul de acasă sau de la muncă se vede imediat în sală și în oglindă.",
   "Ai nevoie de relație cu antrenorul; un plan trimis fără explicații nu funcționează la tine.",
   "Mușchii tăi răspund foarte bine la tensiune controlată și la pump; greutățile maxime te stresează mai mult decât te ajută.",
   "Ești atent la detalii și observi schimbări mici în corp înaintea altora.",
   "Când ești stresat, mănânci emoțional, mai ales seara.",
   "Îți merge cel mai bine când antrenamentul e un moment de liniște, nu încă o sursă de presiune."
  ],
  train: [
   "Exercițiile de bază în 6–8 repetări cu tempo lent, nu în 3–5: tensiunea vine din control, nu din greutatea maximă.",
   "Pre-oboseală: un exercițiu de izolare înaintea celui compus, ca să simți mușchiul țintă și să folosești greutate mai mică.",
   "Serii de 30–45 de secunde sub tensiune; numeri secundele, nu doar repetările.",
   "Eviți testele de maximă și antrenamentele haotice, grăbite: te încarcă de cortizol.",
   "Pauze de 90 de secunde: destul să-ți revii, nu atât cât să te răcești."
  ],
  diet: [
   "În offseason carbohidrați la fiecare masă principală; pe definire îi păstrezi dimineața (puțini), după antrenament și seara.",
   "O gustare cu carbohidrați și proteine înainte de culcare dacă te trezești noaptea.",
   "Cafeaua niciodată pe stomacul gol; o bei după micul dejun."
  ],
  stack: [
   {n:"Magneziu bisglicinat", d:"300–400 mg", t:"seara, cu o oră înainte de somn", w:"Calmează sistemul nervos și relaxează mușchii; baza pentru profilul tău."},
   {n:"L-teanină", d:"100–200 mg", t:"cu cafeaua de dimineață sau în zilele tensionate", w:"Atenție calmă: îți ia agitația de la cafea fără să te adoarmă."},
   {n:"Glicină", d:"3 g", t:"înainte de culcare", w:"Adormi mai ușor și dormi mai adânc; scade ușor temperatura corpului."},
   {n:"Ashwagandha (KSM-66)", d:"300–600 mg", t:"seara, în cicluri de 8 săptămâni cu 2–4 pauză", w:"Scade cortizolul în perioadele de stres și pe definire."},
   {n:"Fosfatidilserină", d:"200–400 mg", t:"seara, în perioadele cu mult stres sau antrenamente dure", w:"Tamponează răspunsul de cortizol după efort."},
   {n:"Creatină monohidrat", d:"3–5 g", t:"zilnic", w:"Volum și pump mai bune; ajută și la oboseala mentală."},
   {n:"Omega-3", d:"2 g", t:"la mese", w:"Dispoziție și recuperare."},
   {n:"Vitamina D3 + K2", d:"2.000–4.000 UI + 100 µg", t:"dimineața", w:"Dispoziție și imunitate, mai ales iarna; doza după analize."}
  ]
 },
 "3": {
  who: [
   "Ai cea mai mare sensibilitate la stres dintre toate profilurile; nesiguranța te consumă mai mult decât efortul.",
   "Ai nevoie de control: să știi ce faci azi, mâine și peste o lună.",
   "Corpul tău răspunde bine la volum moderat și repetări multe, cu tempo lent, și mai slab la greutăți maxime.",
   "Ești foarte constant când ai un plan în care crezi; poți urma aceeași rutină luni întregi.",
   "La testări și la concursuri ai emoții de performanță și pierzi din ce poți de fapt.",
   "Îți trebuie mai mult timp de recuperare între antrenamentele grele decât altora."
  ],
  train: [
   "Aparatele și cablurile sunt prietenii tăi: stabilitate mare, risc mic, progres pe care îl poți urmări precis.",
   "10–15 repetări la majoritatea exercițiilor, cu 3–4 secunde pe negativ.",
   "Nu duci fiecare serie la eșec: lași 1–2 repetări în rezervă și duci la eșec doar ultima serie de la ultimul exercițiu.",
   "Aceeași oră și aceeași încălzire la fiecare antrenament; încălzirea e și ritualul care te liniștește.",
   "Frecvență mai mare, volum moderat: fiecare grupă de 2 ori pe săptămână, cu mai puține serii pe ședință."
  ],
  diet: [
   "Micul dejun poate avea carbohidrați (ovăz, fructe, pâine integrală); te liniștește pentru restul zilei.",
   "Low-carb doar scurt, cu mine, și niciodată mai mult de 2–3 zile la rând.",
   "Un ceai de mușețel sau o gustare cu lactate seara, ca parte din rutina de somn."
  ],
  stack: [
   {n:"Vitamina D3 + K2", d:"2.000–4.000 UI + 100 µg", t:"dimineața, cu grăsimi", w:"Dispoziție, imunitate, forță; profilul tău e cel mai sensibil la lipsa luminii."},
   {n:"Omega-3 (EPA mare)", d:"2–3 g", t:"la mese", w:"Dispoziție stabilă și inflamație mică."},
   {n:"Magneziu bisglicinat", d:"400 mg", t:"seara", w:"Somn adânc, mușchi relaxați, mai puțină neliniște."},
   {n:"Creatină monohidrat", d:"3–5 g", t:"zilnic", w:"Forță și energie mentală."},
   {n:"Glicină", d:"3 g", t:"înainte de culcare", w:"Somn mai bun fără somnolență dimineața."},
   {n:"Inozitol", d:"2–4 g", t:"seara, dizolvat în apă", w:"Liniște și somn mai bun la oamenii care analizează mult."},
   {n:"Șofran (extract standardizat)", d:"30 mg", t:"dimineața", w:"Dispoziție mai bună în perioadele grele, pe definire și iarna."},
   {n:"Complex B (forme active)", d:"1 doză", t:"dimineața, cu mâncare", w:"Energie și cofactori pentru serotonină."}
  ]
 }
},

/* ===== dezechilibrul, complet: dietă, suplimente detaliate, stil de viață, atenționări ===== */
deficitFull: {
 D: {
  diet: [
   "Mic dejun cu 30–40 g de proteine din carne, ouă sau pește și grăsimi bune (nuci, avocado), fără dulce.",
   "Tirozină din alimente în fiecare zi: vită, curcan, pui, ouă, brânzeturi maturate, migdale, semințe de dovleac.",
   "Carbohidrații mutați în a doua parte a zilei; dimineața te încetinesc.",
   "Fără zahăr dimineața: vârful și căderea de glicemie îți scad energia la prânz.",
   "Cafeaua la 30–60 de minute după trezire, nu imediat; maximum 2–3 pe zi, ultima înainte de ora 14.",
   "Carne roșie de 2–3 ori pe săptămână pentru fier și B12; feritina și B12 merită verificate la analize.",
   "Deficitul caloric nu mai mare de 20% cât timp dopamina e jos.",
   "Ciocolată neagră 85% (20 g) ca gustare, în loc de dulciuri.",
   "Prânz proteic cu carbohidrați moderați, ca să nu ai somnolență după-amiaza.",
   "Apă suficientă: o deshidratare de 2% scade energia și motivația mai mult decât crezi."
  ],
  supp: [
   {n:"L-tirozină", d:"500–1.500 mg (începi cu 500)", t:"dimineața pe stomacul gol; la nevoie încă o doză înainte de antrenament", w:"Precursorul dopaminei; ajută mai ales în zilele cu stres, somn puțin sau deficit caloric."},
   {n:"Complex B activ (B6 ca P5P, folat metilat, B12)", d:"1 capsulă", t:"dimineața, cu mâncare", w:"Cofactorii de care are nevoie corpul ca să transforme tirozina în dopamină."},
   {n:"Omega-3", d:"2–3 g EPA + DHA", t:"la mese", w:"Membrane neuronale sănătoase și receptori de dopamină mai sensibili."},
   {n:"Creatină monohidrat", d:"5 g", t:"zilnic", w:"Energie celulară și în creier; scade oboseala mentală, nu doar pe cea musculară."},
   {n:"Rhodiola rosea (3% rosavine)", d:"200–400 mg", t:"dimineața; 6–8 săptămâni, apoi 2 săptămâni pauză", w:"Adaptogen pentru oboseala de stres; îți readuce cheful de antrenament."},
   {n:"Acetil-L-carnitină", d:"1–2 g", t:"dimineața", w:"Energie mentală și motivație."},
   {n:"Cafeină + L-teanină", d:"100 mg + 200 mg", t:"înainte de antrenament", w:"Concentrare fără agitație și fără prăbușirea de după."},
   {n:"Magneziu bisglicinat", d:"300 mg", t:"seara", w:"Ca dopamina pornită ziua să nu-ți strice somnul."},
   {n:"Fier + vitamina C", d:"doar dacă feritina e scăzută, doza după analize", t:"dimineața, la 2 ore distanță de cafea și lactate", w:"Fierul puțin e una dintre cele mai des ratate cauze de lipsă de energie."}
  ],
  life: [
   "Lumină naturală 10–20 de minute în prima oră după trezire.",
   "Antrenament dimineața sau la prânz, nu seara târziu.",
   "Obiective săptămânale mici, scrise și bifate.",
   "Duș rece 1–3 minute dimineața, dacă îl tolerezi.",
   "Mai puțin scroll pe telefon: dopamina ieftină îți consumă motivația pentru cea care contează.",
   "Muzica ta preferată la antrenament.",
   "Un partener de antrenament sau o competiție prietenoasă.",
   "7–8 ore de somn; lipsa somnului scade sensibilitatea la dopamină."
  ],
  warn: "Tirozina nu se ia seara și nu se ia dacă iei medicamente pentru tiroidă, antidepresive de tip IMAO sau ai tensiune mare necontrolată. Fără mucuna (L-dopa) și fără stimulente puternice fără aviz medical. Dacă lipsa de chef durează peste 2–3 săptămâni sau vine cu tristețe, vorbește cu un medic."
 },
 A: {
  diet: [
   "2–4 ouă întregi zilnic: gălbenușul e cea mai bogată sursă alimentară de colină.",
   "Ficat de vită sau de pui o dată pe săptămână.",
   "Pește gras (somon, macrou, sardine) de 2–3 ori pe săptămână.",
   "Nuci, migdale și semințe zilnic, 20–30 g.",
   "O lingură de lecitină (soia sau floarea-soarelui) în shake, dacă nu mănânci ouă.",
   "Grăsimile nu coboară sub 0,8 g/kg, nici pe definire.",
   "Carbohidrați moderați, fără vârfuri mari care aduc ceață după masă.",
   "Legume crucifere (broccoli, conopidă, varză de Bruxelles) de câteva ori pe săptămână.",
   "Apă constantă; gura și pielea uscate sunt și semn de hidratare slabă.",
   "Fără mese foarte mari la prânz în zilele cu mult lucru mental."
  ],
  supp: [
   {n:"Citicolină (CDP-colină)", d:"250–500 mg", t:"dimineața", w:"Colină plus suport pentru membranele neuronale; concentrare și memorie."},
   {n:"sau Alpha-GPC", d:"300–600 mg", t:"dimineața sau cu 45–60 de minute înainte de antrenament", w:"Varianta cu efect mai bun pe forță și conexiunea minte-mușchi. Iei una dintre cele două, nu amândouă."},
   {n:"Omega-3 cu DHA mare", d:"1–2 g DHA", t:"la mese", w:"DHA e materialul de construcție al creierului."},
   {n:"Acetil-L-carnitină", d:"1–2 g", t:"dimineața", w:"Furnizează grupări acetil pentru acetilcolină; energie mentală."},
   {n:"Vitamina B5 (acid pantotenic)", d:"250–500 mg", t:"dimineața", w:"Cofactor direct pentru producția de acetilcolină."},
   {n:"Fosfatidilserină", d:"100–300 mg", t:"seara, dacă ai și stres", w:"Memorie și răspuns mai bun la stres."},
   {n:"Bacopa monnieri (50% bacozide)", d:"300 mg", t:"cu o masă cu grăsimi", w:"Memorie și învățare; efectul apare după 6–8 săptămâni."},
   {n:"Creatină monohidrat", d:"5 g", t:"zilnic", w:"Energie pentru creier, nu doar pentru mușchi."},
   {n:"Huperzină A", d:"50–100 µg", t:"doar în cicluri scurte, la recomandarea mea", w:"Menține acetilcolina mai mult timp; o folosesc rar și controlat."}
  ],
  life: [
   "Somn 7–8 ore: memoria și tehnica se consolidează în somn.",
   "Exerciții de coordonare și tehnică la începutul antrenamentului.",
   "Fără multitasking în sală: un exercițiu, o serie, atenție completă.",
   "20 de minute de citit pe zi, fără telefon.",
   "O mișcare nouă învățată în fiecare lună.",
   "Pauze de 5 minute la fiecare 50 de minute de lucru la birou.",
   "Alcoolul limitat; e printre primele care îți strică claritatea.",
   "Verifică cu medicul medicamentele cu efect anticolinergic (unele antialergice vechi și somnifere)."
  ],
  warn: "Huperzina A doar în cicluri scurte, la recomandarea mea, și niciodată cu medicamente pentru memorie sau anticolinergice. Bacopa poate da greață pe stomacul gol. Dacă ai probleme reale de memorie sau confuzie, mergi întâi la medic."
 },
 G: {
  diet: [
   "Carbohidrați complecși seara (orez, cartof, ovăz): te liniștesc și îți îmbunătățesc somnul.",
   "Magneziu din alimente: verdețuri, semințe de dovleac, cacao, migdale.",
   "Fără cafeină după prânz.",
   "Fără deficit caloric agresiv: foamea mare e stres pentru sistemul tău nervos.",
   "Alimente fermentate zilnic (chefir, iaurt, varză murată): intestinul sănătos ajută echilibrul GABA.",
   "Ceai de mușețel sau de melisă seara.",
   "Glicină din alimente: supă de oase, gelatină, colagen.",
   "Cina cu proteine și carbohidrați împreună, la 2–3 ore înainte de culcare.",
   "Mese regulate, fără să ajungi la foame mare între ele.",
   "Alcoolul limitat: relaxarea de la el e urmată de o noapte mai agitată."
  ],
  supp: [
   {n:"Magneziu bisglicinat", d:"300–400 mg", t:"seara", w:"Primul supliment pentru tensiune și somn; forma bisglicinat nu dă probleme digestive."},
   {n:"L-teanină", d:"200 mg", t:"dimineața cu cafeaua și/sau seara", w:"Relaxare fără somnolență; liniștește agitația de zi."},
   {n:"Taurină", d:"1–3 g", t:"seara", w:"Efect calmant asupra sistemului nervos; ajută și la crampe."},
   {n:"Glicină", d:"3 g", t:"înainte de culcare", w:"Adormi mai repede și dormi mai adânc."},
   {n:"Ashwagandha (KSM-66)", d:"300–600 mg", t:"seara; 8 săptămâni, apoi 2–4 pauză", w:"Scade cortizolul și senzația de stres."},
   {n:"Fosfatidilserină", d:"200–400 mg", t:"seara", w:"Tamponează cortizolul după antrenamentele grele și zilele stresante."},
   {n:"Inozitol", d:"2–4 g", t:"seara, în apă", w:"Liniște și somn la oamenii cu mintea care nu se oprește."},
   {n:"Vitamina B6 (P5P)", d:"25–50 mg", t:"dimineața", w:"Cofactor pentru producția de GABA."},
   {n:"ZMA (zinc, magneziu, B6)", d:"1 doză", t:"seara, pe stomacul gol", w:"Alternativă simplă dacă vrei un singur produs seara."}
  ],
  life: [
   "Respirație lentă 5 minute seara (inspiri 4 secunde, ții 7, expiri 8).",
   "Plimbare zilnică de 30 de minute, de preferat în natură.",
   "Mai puține stimulente: pre-workout fără stimulente sau cu doză mică.",
   "Antrenamentul nu mai târziu de ora 20.",
   "Telefonul departe cu o oră înainte de somn.",
   "Dormitor răcoros, întunecat și liniștit.",
   "Stretching sau yoga de 1–2 ori pe săptămână.",
   "Sauna de 1–2 ori pe săptămână, dacă ai acces."
  ],
  warn: "Ashwagandha nu se ia la hipertiroidie, în sarcină sau cu sedative fără aviz medical. Valeriana și combinațiile sedative nu se iau cu alcool sau cu somnifere. Taurina și magneziul în doze mari pot da scaune moi; urci treptat."
 },
 S: {
  diet: [
   "Carbohidrați la cină: ajută triptofanul să ajungă la creier.",
   "Triptofan din alimente zilnic: curcan, ouă, lactate, banane, ovăz, semințe de dovleac.",
   "Mese regulate; fără low-carb lung și fără post prelungit.",
   "Pește gras de 2–3 ori pe săptămână.",
   "Vitamina B6 din alimente: banane, cartofi, năut, pui.",
   "Ovăz sau orez seara, în special în zilele grele.",
   "Ouă și pește pentru vitamina D din alimente.",
   "30 g de fibre pe zi: cea mai mare parte din serotonina corpului se produce în intestin.",
   "Ciocolată neagră cu măsură, ca parte din plan, nu ca recompensă vinovată.",
   "Poftele de seară nu se rezolvă cu voință: le prevenim cu o cină consistentă."
  ],
  supp: [
   {n:"Vitamina D3 + K2", d:"2.000–4.000 UI + 100 µg (după analiza 25-OH)", t:"dimineața, cu grăsimi", w:"Lipsa de vitamina D e strâns legată de dispoziția scăzută, mai ales iarna."},
   {n:"Omega-3 cu EPA mare", d:"2–3 g", t:"la mese", w:"EPA are cel mai bun efect pe dispoziție dintre componentele omega-3."},
   {n:"Magneziu bisglicinat", d:"300 mg", t:"seara", w:"Somn și liniște."},
   {n:"Complex B (forme active)", d:"1 doză", t:"dimineața", w:"B6, folat și B12: cofactori pentru serotonină."},
   {n:"Șofran (extract standardizat)", d:"30 mg", t:"dimineața", w:"Susține dispoziția; e unul dintre cele mai bine studiate extracte pentru asta."},
   {n:"Probiotic cu mai multe tulpini", d:"1 doză", t:"dimineața", w:"Intestin sănătos, serotonină din intestin."},
   {n:"Glicină", d:"3 g", t:"seara", w:"Somn mai adânc, fără trezirile de dimineață devreme."},
   {n:"Inozitol", d:"2–4 g", t:"seara", w:"Liniște și mai puține griji repetitive."},
   {n:"5-HTP", d:"50–100 mg", t:"seara, doar cu acordul meu", w:"Precursor direct al serotoninei; îl folosesc rar și niciodată cu medicamente pentru dispoziție."}
  ],
  life: [
   "Lumină naturală dimineața, 20 de minute.",
   "Iarna, o lampă de lumină (10.000 lux) 20–30 de minute dimineața.",
   "3–4 antrenamente moderate pe săptămână, nu epuizante.",
   "Contact social real, nu doar online.",
   "Somn la ore regulate, inclusiv în weekend.",
   "5 minute de jurnal seara: trei lucruri care au mers bine.",
   "Ieșiri în natură în weekend.",
   "Alcool puțin: îți scade dispoziția în zilele următoare."
  ],
  warn: "Triptofanul sau 5-HTP se discută doar cu mine și niciodată împreună cu antidepresive, medicamente pentru migrenă (triptani) sau tramadol: risc de sindrom serotoninergic. Sunătoarea nu o recomand din același motiv. Dacă tristețea durează peste două săptămâni sau ai gânduri negre, vorbește cu un medic sau cu un psiholog."
 }
},

/* ===== baza pentru toată lumea ===== */
base: [
 {n:"Creatină monohidrat", d:"3–5 g", t:"zilnic, oricând", w:"Forță, volum muscular, recuperare. Nu trebuie încărcată și nu trebuie ciclată."},
 {n:"Proteină din zer sau izolat", d:"30–40 g", t:"când nu atingi proteinele din mâncare, de obicei după antrenament", w:"Comoditate; mâncarea rămâne baza."},
 {n:"Omega-3", d:"2 g EPA + DHA", t:"la mese", w:"Articulații, inflamație, inimă, creier."},
 {n:"Vitamina D3 + K2", d:"2.000 UI + 100 µg (doza finală după analize)", t:"dimineața", w:"Imunitate, oase, forță, dispoziție."},
 {n:"Magneziu bisglicinat", d:"200–400 mg", t:"seara", w:"Somn și recuperare; aproape toți sportivii pierd magneziu prin transpirație."},
 {n:"Electroliți", d:"după cât transpiri", t:"în timpul antrenamentelor de peste 60 de minute", w:"Performanță și fără crampe."},
 {n:"Multivitamine și minerale", d:"1 doză", t:"dimineața, cu mâncare", w:"Asigurare pe definire, când mănânci mai puțin."},
 {n:"Fibre (psyllium)", d:"5–10 g", t:"cu apă multă, departe de suplimente", w:"Dacă mănânci puține legume; digestie și sațietate pe definire."}
]
});
