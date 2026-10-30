/* Chera Protocol – a doua extindere a concluziilor (27.10.2026, cererea proprietarului: de 5 ori mai mult
   în cardurile „Cum ești / Cum te antrenezi / Cum mănânci”; suplimentele personale sunt în protocolul de la final).
   Persoana I, fără nume de autori. Se încarcă după quiz-rezultat.js. Format supliment: {n: nume, d: doză, t: când, w: de ce}. */
Object.assign(window.CHERA_EXT, {

/* ===== completări pe tipuri: cum ești, cum te antrenezi, cum mănânci ===== */
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
  ]
 }
},

/* ===== dezechilibrul, complet: dietă și stil de viață ===== */
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
  life: [
   "Lumină naturală 10–20 de minute în prima oră după trezire.",
   "Antrenament dimineața sau la prânz, nu seara târziu.",
   "Obiective săptămânale mici, scrise și bifate.",
   "Duș rece 1–3 minute dimineața, dacă îl tolerezi.",
   "Mai puțin scroll pe telefon: dopamina ieftină îți consumă motivația pentru cea care contează.",
   "Muzica ta preferată la antrenament.",
   "Un partener de antrenament sau o competiție prietenoasă.",
   "7–8 ore de somn; lipsa somnului scade sensibilitatea la dopamină."
  ]
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
  life: [
   "Somn 7–8 ore: memoria și tehnica se consolidează în somn.",
   "Exerciții de coordonare și tehnică la începutul antrenamentului.",
   "Fără multitasking în sală: un exercițiu, o serie, atenție completă.",
   "20 de minute de citit pe zi, fără telefon.",
   "O mișcare nouă învățată în fiecare lună.",
   "Pauze de 5 minute la fiecare 50 de minute de lucru la birou.",
   "Alcoolul limitat; e printre primele care îți strică claritatea.",
   "Verifică cu medicul medicamentele cu efect anticolinergic (unele antialergice vechi și somnifere)."
  ]
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
  life: [
   "Respirație lentă 5 minute seara (inspiri 4 secunde, ții 7, expiri 8).",
   "Plimbare zilnică de 30 de minute, de preferat în natură.",
   "Mai puține stimulente: pre-workout fără stimulente sau cu doză mică.",
   "Antrenamentul nu mai târziu de ora 20.",
   "Telefonul departe cu o oră înainte de somn.",
   "Dormitor răcoros, întunecat și liniștit.",
   "Stretching sau yoga de 1–2 ori pe săptămână.",
   "Sauna de 1–2 ori pe săptămână, dacă ai acces."
  ]
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
  life: [
   "Lumină naturală dimineața, 20 de minute.",
   "Iarna, o lampă de lumină (10.000 lux) 20–30 de minute dimineața.",
   "3–4 antrenamente moderate pe săptămână, nu epuizante.",
   "Contact social real, nu doar online.",
   "Somn la ore regulate, inclusiv în weekend.",
   "5 minute de jurnal seara: trei lucruri care au mers bine.",
   "Ieșiri în natură în weekend.",
   "Alcool puțin: îți scade dispoziția în zilele următoare."
  ]
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

/* ===== protocolul personal de suplimente (31.10.2026, cererea lui Marius: diferit de bază, individualizat după test) =====
   Pornește din planurile lui reale (notițele din Chera Hub) și din suplimentele de stabilizare. Fără medicamente pe rețetă, fără doping, fără 5-HTP/triptofan.
   Se compune din: neurotip + neurotransmițătorul pe minus (și nivelul) + obiectiv + somn, cafea, zile de antrenament, ani de sală.
   Nu conține nimic din lista de bază (creatină, proteină, omega-3, D3 + K2, magneziu).
   Format rând: {k: cheie unică, m: moment, n: nume, d: doză, d2: doză la 2B/3, t: când, w: de ce, stim, adv: nu la începători, intra: cade la 3 antrenamente, warn}. */
(function(){
const MOMENTS=[["am","Dimineața"],["meal","La mese"],["pre","Înainte de antrenament"],["intra","În timpul antrenamentului"],["post","După antrenament"],["pm","Seara"]];

const R={
 tirozina:{k:"tirozina",m:"am",n:"L-tirozină",d:"500–1.500 mg (începi cu 500)",d2:"500 mg",t:"pe stomacul gol, niciodată seara",w:"Materia primă a dopaminei; o simți în zilele cu stres.",warn:"tirozina"},
 complexB:{k:"complexB",m:"am",n:"Complex B activ (B6 ca P5P, folat metilat, B12)",d:"1 capsulă",t:"cu mâncare",w:"Transformă ce mănânci în dopamină și serotonină."},
 rhodiola:{k:"rhodiola",m:"am",n:"Rhodiola rosea (3% rosavine)",d:"200–400 mg",t:"6–8 săptămâni, apoi 2 pauză",w:"Pentru oboseala de stres; îți readuce cheful."},
 alcar:{k:"alcar",m:"am",n:"Acetil-L-carnitină",d:"1–2 g",t:"pe stomacul gol",w:"Energie mentală când ești în ceață."},
 citicolina:{k:"colina",m:"am",n:"Citicolină (CDP-colină)",d:"250–500 mg",t:"la aceeași oră în fiecare zi",w:"Colina de care ai nevoie pentru concentrare și memorie."},
 alphagpc:{k:"colina",m:"pre",n:"Alpha-GPC",d:"300–600 mg",t:"cu 45–60 de minute înainte",w:"Varianta mea pentru forță: se simte la conexiunea cu bara."},
 b5:{k:"b5",m:"am",n:"Vitamina B5",d:"250–500 mg",t:"cu mâncare",w:"Cofactor direct pentru acetilcolină."},
 gaba:{k:"gaba",m:"pm",n:"GABA",d:"1 g",t:"înainte de somn",w:"Îl am de ani de zile în planuri, la cei care nu se pot opri seara."},
 zma:{k:"zma",m:"pm",n:"ZMA",d:"3 capsule",t:"înainte de somn, pe stomacul gol",w:"Cât timp îl iei, magneziul de la bază scade la jumătate."},
 glicina:{k:"glicina",m:"pm",n:"Glicină",d:"3 g",t:"înainte de culcare",w:"Adormi mai ușor și dormi mai adânc, fără somnolență dimineața."},
 ashwa:{k:"ashwa",m:"pm",n:"Ashwagandha (KSM-66)",d:"300–600 mg",t:"8 săptămâni, apoi 2–4 pauză",w:"Scade senzația de stres în perioadele grele.",warn:"ashwa"},
 sofran:{k:"sofran",m:"am",n:"Șofran (extract standardizat)",d:"30 mg",t:"cu mâncare",w:"Dispoziție mai bună pe definire și iarna."},
 inozitol:{k:"inozitol",m:"pm",n:"Inozitol",d:"2–4 g",t:"dizolvat în apă",w:"Liniște și somn la cei care analizează mult."},
};

/* neurotransmițătorul pe minus: pe minus = toate trei, de susținut = primele două */
const DEF={D:["tirozina","complexB","rhodiola"],A:["colina","alcar","b5"],G:["gaba","zma","ashwa"],S:["sofran","inozitol","complexB"]};
/* a doua scală, dacă e tot pe minus: un singur produs */
const SECOND={D:"tirozina",A:"citicolina",G:"gaba",S:"sofran"};

/* neurotipul: mai ales ce faci în jurul antrenamentului, în ordinea priorității */
const TYPE={
 "1A":[
  {k:"citrulina",m:"pre",n:"Citrulină malat + suc de rodie",d:"5 g + un pahar",t:"la masa de dinaintea sălii",w:"Din planurile mele de forță: pompă și pauze mai eficiente."},
  {k:"turmeric",m:"meal",n:"Turmeric (curcumin)",d:"2–3 g",t:"în omleta de dimineață",w:"Greutățile mari încarcă articulațiile; îl pun direct în prima masă."},
  {k:"eaa",m:"intra",n:"EAA + sare roz",d:"10 g + 1 g",t:"în apă, pe durata antrenamentului",w:"Antrenamente scurte: fără carbohidrați, doar aminoacizi.",intra:1,warn:"sare"},
  {k:"cafeina",m:"pre",n:"Cafeină",d:"200 mg",t:"doar în ziua cu exercițiul principal",w:"O păstrez pentru ziua cea mai grea, ca să rămână eficientă.",stim:1},
  {k:"zma",m:"pm",n:"ZMA",d:"3 capsule",t:"înainte de somn, pe stomacul gol",w:"Cât timp îl iei, magneziul de la bază scade la jumătate."}
 ],
 "1B":[
  {k:"beta",m:"pre",n:"Beta-alanină",d:"3–4 g",t:"împărțit în 2 prize",w:"Pentru eforturile de 30 de secunde – 4 minute. Furnicăturile sunt normale.",adv:1},
  {k:"intracarb",m:"intra",n:"Cluster dextrin + EAA",d:"25 g + 10 g",t:"pe durata antrenamentului",w:"Faci mult și mănânci puțin: așa nu cazi la jumătate.",intra:1},
  {k:"colagen",m:"pre",n:"Colagen + vitamina C",d:"10–15 g + 50 mg",t:"cu 30–60 de minute înainte",w:"Pentru tendoane, punctul tău slab la sărituri și viteză."},
  {k:"bicarb",m:"intra",n:"Bicarbonat de sodiu + sare roz",d:"1 g + 1 g",t:"în sticla de antrenament",w:"Îl pun la cei care transpiră mult și fac efort repetat.",adv:1,intra:1,warn:"sare"},
  {k:"potasiu",m:"meal",n:"Potasiu gluconat",d:"2 × 99 mg",t:"la prima și la ultima masă",w:"Îl pierzi prin transpirație; lipsa lui se simte la crampe."},
  {k:"cafeina",m:"pre",n:"Cafeină",d:"100–200 mg",t:"doar înainte de sport sau de sprinturi",w:"Viteză de reacție; nu ai nevoie de doze mari.",stim:1}
 ],
 "2A":[
  {k:"citrulina",m:"pre",n:"Citrulină malat + beta-alanină",d:"5 g + 3 g",t:"cu 30 de minute înainte",w:"Pre-ul din cele mai multe planuri ale mele de fizic."},
  {k:"enzime",m:"meal",n:"Enzime digestive",d:"1–2 capsule",t:"la jumătatea mesei mari",w:"Mănânci variat și mult; așa folosești ce mănânci."},
  {k:"eaa",m:"intra",n:"EAA",d:"10–15 g",t:"pe durata antrenamentului",w:"Recuperare când entuziasmul te duce la volum mare.",intra:1},
  {k:"glutamina",m:"pm",n:"Glutamină",d:"10 g",t:"la ultima masă",w:"O dau tuturor celor care fac volum mare."},
  {k:"colina",m:"am",n:"Citicolină",d:"250 mg",t:"în zilele cu mult lucru mental",w:"Profilul tău trăiește din acetilcolină."}
 ],
 "2B":[
  {k:"citrulina",m:"pre",n:"Citrulină malat + arginină lichidă",d:"7 g + 10 ml",t:"cu 30 de minute înainte, fără cafeină",w:"Pre-ul meu de pompă, fără stimulente, pentru cei care dorm prost după cafea."},
  {k:"intracarb",m:"intra",n:"Cluster dextrin + EAA",d:"25 g + 10 g",t:"pe durata antrenamentului",w:"Carbohidrații din timpul efortului țin cortizolul mai jos.",intra:1},
  {k:"gaba",m:"pm",n:"GABA",d:"1 g",t:"la ultima masă",w:"Seara mea standard, când stresul de peste zi trece în noapte."},
  {k:"ps",m:"pm",n:"Fosfatidilserină",d:"200 mg",t:"în zilele cu antrenamente dure",w:"Tamponează cortizolul după efort."},
  {k:"teanina",m:"am",n:"L-teanină",d:"100–200 mg",t:"cu cafeaua de dimineață",w:"Păstrezi cafeaua, fără agitație."}
 ],
 "3":[
  {k:"shake",m:"am",n:"Shake-ul de la trezire",d:"500 ml apă călduță, o lămâie, 1 g sare roz, 10 g glutamină",t:"cu 30 de minute înainte de masa 1",w:"La tine contează și ritualul fix, nu doar ce e în pahar.",warn:"sare"},
  {k:"citrulina",m:"pre",n:"Citrulină malat",d:"4 g",t:"cu 30 de minute înainte",w:"Cel mai simplu pre din planurile mele: nimic care să te tureze."},
  {k:"glicina",m:"pm",n:"Glicină",d:"3 g",t:"la aceeași oră, înainte de culcare",w:"Somnul e primul lucru pe care îl protejez la tine."},
  {k:"eaa",m:"intra",n:"EAA",d:"10 g",t:"pe durata antrenamentului",w:"Recuperarea ta e mai lentă decât a altora.",intra:1},
  {k:"enzime",m:"meal",n:"Enzime digestive",d:"1 capsulă",t:"la jumătatea mesei mari",w:"Când ești stresat, digestia se oprește prima."}
 ]
};

/* obiectivul */
const GOAL={
 scena:[
  {k:"crom",m:"meal",n:"Crom picolinat + acid alfa-lipoic",d:"200 mg + 300 mg",t:"la mesele cu mulți carbohidrați",w:"Vreau fiecare gram de carbohidrați în mușchi; îl am în planurile de concurs.",warn:"glicemie"},
  {k:"ficat",m:"meal",n:"Silimarină + NAC",d:"1.000 mg + 600 mg",t:"la masa 2",w:"Susținere pentru ficat: pe pregătire el duce tot."},
  {k:"enzime",m:"meal",n:"Enzime digestive",d:"2 capsule",t:"la jumătatea meselor mari",w:"Digestia decide cât folosești din ce mănânci."}
 ],
 sportiv:[
  {k:"vitc",m:"meal",n:"Vitamina C + zinc picolinat",d:"1 g + 22 mg",t:"la prima masă",w:"Le am în aproape toate planurile de fizic: recuperare și imunitate."}
 ],
 start:[
  {k:"multi",m:"meal",n:"Complex de vitamine și minerale",d:"1 doză",t:"la prima masă",w:"Primul lucru pe care îl dau cuiva care pornește: dieta nouă are goluri."}
 ]
};

/* contextul din chestionar */
const CTX={
 sleep:(s)=>({k:"glicina",m:"pm",n:"Glicină",d:"3 g",t:"înainte de culcare",w:`Dormi ${s}. Asta repar înainte de orice altceva.`}),
 caf:{k:"teanina",m:"am",n:"L-teanină",d:"200 mg",t:"cu prima cafea",w:"Bei 3 sau mai multe cafele pe zi: pun asta la prima și tai una după-amiaza."},
 days:(n)=>({k:"glutamina",m:"pm",n:"Glutamină",d:"10–20 g",t:"la ultima masă",w:`La ${n} antrenamente pe săptămână limita ta e recuperarea, nu efortul.`}),
 years:{k:"leucina",m:"intra",n:"Leucină",d:"5 g",t:"în sticla de antrenament",w:"După atâția ani, corpul cere un semnal mai puternic ca să mai construiască.",adv:1,intra:1}
};

/* ce spun eu despre combinația de rezultate: neurotip + neurotransmițătorul pe minus (0 = echilibru bun) */
const COMBO={
 "1A":{
  "0":"Ești Luptător și echilibrul îți e bun, deci nu am ce repara: merg direct pe seriile grele și pe recuperarea articulațiilor.",
  D:"Luptător cu dopamina pe minus: la profilul tău asta înseamnă de obicei epuizare, nu lipsă de voință. Întâi tai din volum și din stimulente, iar suplimentele îți refac motorul.",
  A:"Ai forță, dar concentrarea și conexiunea cu bara au scăzut. Pun accent pe colină înainte de antrenament, nu pe mai multă cafeină.",
  G:"Natura ta cere cafea și greu, dar GABA pe minus îmi spune că ești turat. La sportivii mei cu tiparul ăsta scot stimulentele și adaug calmul de seară; forța revine când dormi.",
  S:"Luptător cu serotonina pe minus: te ții tare ziua și cazi seara. Îți dau ce te ține stabil, plus carbohidrați la cină, nu încă un stimulent."},
 "1B":{
  "0":"Sistem nervos rapid și echilibru bun: protocolul tău e despre putere pe efort scurt, hidratare și tendoane.",
  D:"Atlet cu dopamina pe minus: alergi pe rezerve și de obicei mănânci prea puțin pentru tot ce faci. Îți refac cheful și îți pun carbohidrați în timpul efortului.",
  A:"Viteza de reacție e punctul tău forte și acum a scăzut. Aici pun colina înainte de antrenament, exact când ai nevoie de coordonare.",
  G:"Te încarci repede și nu mai cobori. Îți las explozia în sală, dar seara lucrez doar pe calm și după-amiaza fără stimulente.",
  S:"Ai nevoie de noutate, dar acum și plăcerea de a face lucruri a scăzut. Îți stabilizez dispoziția și păstrez antrenamentele scurte, cu joc în ele."},
 "2A":{
  "0":"Cameleon cu echilibru bun: răspunzi la aproape orice, așa că rămân pe pompă și recuperare, ca să nu te împrăștii în zece produse.",
  D:"Răspunzi la orice metodă, dar acum îți lipsește cheful. Îți susțin motivația dimineața și păstrez pre-workout-ul simplu.",
  A:"Acetilcolina e chiar motorul profilului tău, iar când e pe minus se vede întâi la memorie și la tehnică. Aici investesc cel mai mult.",
  G:"Entuziasmul te ține turat și noaptea. La Cameleoni văd asta când fac prea mult: scad stimulentele și mut greul protocolului seara.",
  S:"Ești adaptabil, dar acum te încarcă totul. Îți stabilizez dispoziția dimineața și somnul seara, apoi revenim la varietate."},
 "2B":{
  "0":"Artist cu echilibru bun: te ține senzația din mușchi, deci îți fac un pre-workout de pompă, fără stimulente, și îți protejez somnul.",
  D:"Artist cu dopamina pe minus: te simți plat și conexiunea cu mușchiul nu mai vine. Pornesc cu doza mică de tirozină, pentru că la sistemul tău sensibil mai mult nu înseamnă mai bine.",
  A:"Simți mai puțin mușchiul și pierzi firul în serie. La tine colina lucrează direct pe conexiunea minte-mușchi, de aceea o pun prima.",
  G:"Exact tiparul tău clasic: stres, cortizol, nopți agitate. Protocolul e aproape tot seara, plus carbohidrați în timpul antrenamentului și nicio cafeină în pre.",
  S:"Sensibil și fără chef: aici grijile și poftele de seară merg împreună. Lucrez pe dispoziție dimineața și pe somn seara, fără nimic care te agită."},
 "3":{
  "0":"Strateg cu echilibru bun: nu adaug nimic fără motiv. Aceleași produse, la aceleași ore, ca un ritual la care nu mai trebuie să te gândești.",
  D:"Strateg cu dopamina pe minus: ai rutina, dar ai pierdut scânteia. Doza de dimineață e mică și la oră fixă; nu schimb nimic altceva deodată.",
  A:"Analizezi mult, iar acum te obosește și ceața. Îți pun colina dimineața, la oră fixă, pentru birou și pentru tehnică.",
  G:"Mintea care nu se oprește seara e punctul tău slab acum. Îți fac un ritual de seară simplu, mereu în aceeași ordine: te liniștește și ritualul, nu doar capsulele.",
  S:"Serotonina e chiar axa profilului tău, deci aici contează cel mai mult. Dimineața dispoziție, seara somn, carbohidrați la cină; merg lent, câte un produs pe rând."}
};
const ALL_HIGH="Toate cele patru scale sunt ridicate, deci nu lucrez pe un neurotransmițător anume: întâi somnul, caloriile și stimulentele. Până vorbim îți las doar ce te ajută să te recuperezi.";

const WARN={
 tirozina:"Tirozina nu se ia dacă iei medicamente pentru tiroidă, antidepresive de tip IMAO sau ai tensiune mare necontrolată.",
 ashwa:"Ashwagandha nu se ia la hipertiroidie, în sarcină sau cu sedative fără aviz medical.",
  glicemie:"Cromul și acidul alfa-lipoic nu se iau peste medicamente pentru glicemie fără aviz medical.",
 sare:"La tensiune mare, fără sare sau bicarbonat adăugat."
};
const DEF_WARN={
 D:"Fără mucuna (L-dopa) și fără stimulente puternice fără aviz medical. Dacă lipsa de chef durează peste 2–3 săptămâni sau vine cu tristețe, vorbește cu un medic.",
 A:"Dacă ai probleme reale de memorie sau confuzie, mergi întâi la medic.",
 G:"Combinațiile sedative nu se iau cu alcool sau cu somnifere.",
 S:"Triptofanul sau 5-HTP se discută doar cu mine și niciodată împreună cu antidepresive, medicamente pentru migrenă (triptani) sau tramadol. Dacă tristețea durează peste două săptămâni sau ai gânduri negre, vorbește cu un medic sau cu un psiholog."
};

function protocolFor(type,bal,ctx){
 const def=(bal.allHigh||bal.level==="ok")?"0":bal.top, crit=bal.level==="crit", sens=(type==="2B"||type==="3");
 const c=ctx||{}, sleepVery=c.sleep==="sub 6 ore", sleepLow=sleepVery||c.sleep==="6–7 ore", caf3=c.caffeine==="3 sau mai multe", caf0=c.caffeine==="0";
 const days=Number(c.days)||4, beginner=c.years==="sub 1 an"||c.goal==="start", veteran=c.years==="peste 5 ani", scena=c.goal==="scena";
 const cap=bal.allHigh?5:(beginner?5:(scena?8:(def==="0"?6:7)));
 /* stimulentele cad la profilurile sensibile și când somnul, cafeaua sau GABA spun asta */
 const stimOff=sens||def==="G"||def==="D"||def==="S"||caf3||caf0||sleepLow;
 const allowed=r=>!(r.stim&&stimOff)&&!(r.adv&&beginner)&&!(r.intra&&days<=3&&!(type==="1B"||scena));
 const picked=[], seen={};
 const add=r=>{ if(!r||seen[r.k]||picked.length>=cap||!allowed(r)) return false; seen[r.k]=1; picked.push(r); return true; };
 const rowFor=key=>{
  if(key==="colina") return (type==="1A"||type==="1B")?R.alphagpc:R.citicolina;
  const r=R[key]; return r&&(sens||!crit)&&r.d2?Object.assign({},r,{d:r.d2}):r;
 };
 /* 1. contextul (cel mult două rânduri) */
 const ctxRows=[];
 if(sleepLow) ctxRows.push(CTX.sleep(sleepVery?"sub 6 ore":"6–7 ore"));
 if(caf3) ctxRows.push(CTX.caf);
 if(days>=5) ctxRows.push(CTX.days(days));
 if(veteran) ctxRows.push(CTX.years);
 ctxRows.filter(allowed).slice(0,2).forEach(add);
 /* 2. neurotransmițătorul pe minus */
 if(def!=="0"){
  DEF[def].slice(0,crit?3:2).forEach(k=>add(rowFor(k)));
  const second=bal.sorted&&bal.sorted[1];
  if(second&&second[1]>=22&&!(second[0]==="D"&&def==="G")) add(rowFor(SECOND[second[0]]));
 }
 /* 3. neurotipul, 4. obiectivul, apoi restul neurotipului până la plafon */
 const typeRows=TYPE[type]||TYPE["2A"];
 typeRows.filter(allowed).slice(0,2).forEach(add);
 if(!bal.allHigh) (GOAL[c.goal]||[]).slice(0,scena?2:1).forEach(add);
 typeRows.forEach(add);
 const groups=MOMENTS.map(([m,label])=>({label,rows:picked.filter(r=>r.m===m)})).filter(g=>g.rows.length);

 const notes=[];
 if(def!=="0") notes.push(crit?"Le iei 8 săptămâni, apoi refacem testul.":"Scorul e la limită: le confirm eu la prima discuție, înainte să le cumperi.");
 if(sens) notes.push("Introduci câte un produs la 3–4 zile, ca să vezi ce simți.");
 if((type==="1A"||type==="1B")&&stimOff) notes.push(caf0?"Nu bei cafea și nu te pun eu să începi: pre-ul tău rămâne fără stimulente.":(def==="G"?"Am scos cafeina din pre-ul tău cât timp GABA e pe minus.":((def==="D"||def==="S")?"Am scos cafeina din pre-ul tău până îți revine echilibrul.":(caf3?"Am scos cafeina din pre-ul tău: bei deja destulă.":"Am scos cafeina din pre-ul tău până când dormi peste 7 ore."))));
 const hasPeri=groups.some(g=>g.rows[0].m==="pre"||g.rows[0].m==="intra");
 if(days<=3&&!seen.eaa&&!seen.intracarb) notes.push("La 3 antrenamente pe săptămână nu-ți trebuie nimic în timpul lor: apă e destul.");
 else if(hasPeri) notes.push("În zilele de pauză sari peste „înainte” și „în timpul”.");
 const warnKeys=picked.map(r=>r.warn).filter(Boolean);
 if(c.goal!=="start"&&!bal.allHigh){
  const crom=seen.crom?"":"; pe masă, crom 200 mg cu acid alfa-lipoic 300 mg la mesele cu mulți carbohidrați";
  notes.push("Pe definire adaug 3 g de carnitină înainte de cardio"+crom+".");
  if(crom) warnKeys.push("glicemie");
 }
 const warns=[...new Set(warnKeys)].map(k=>WARN[k]);
 warns.unshift(`Dacă iei anticoagulante sau ai o operație programată, întreabă medicul înainte de omega-3${seen.turmeric?" și de turmeric":""}.`);
 if(def!=="0") warns.push(DEF_WARN[def]);

 const facts=[c.sleep?"somn "+c.sleep:"",c.caffeine?(caf0?"fără cafea":"cafea: "+c.caffeine+" pe zi"):"",c.days?c.days+" antrenamente pe săptămână":"",c.years?"în sală de "+c.years:""].filter(Boolean);
 return {intro:bal.allHigh?ALL_HIGH:((COMBO[type]||COMBO["2A"])[def]),facts,groups,notes,warns,count:picked.length};
}
window.CHERA_EXT.protocolFor=protocolFor;
})();
