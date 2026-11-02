// Ghidul recepției: portofoliu-ghid pentru recepțiile sălilor partenere (A4 portret, fără prețuri).
// Imagini: agenti/GHID-RECEPTII-img/. Rulare: node agenti/build-ghid-receptii.mjs ; PDF cu Chrome headless --print-to-pdf.
import { writeFileSync } from "node:fs";

const DATA = "2026-11-02";
const IMG = "GHID-RECEPTII-img";
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

// Produsele pentru recepție. Câmpuri: ce este, arome, pentru cine, când, ce spui la recepție, expunere.
const produse = [
  { tag: "Vedeta recepției", name: "Prime Delicious Bar", sub: "baton proteic, 55 g · cutie de 12", img: "produs-baton-proteic-ciocolata-fructe-de-padure",
    arome: ["Căpșuni", "Caramel sărat", "Cocos și caramel", "Ciocolată și fructe de pădure"],
    aromeImg: ["produs-baton-proteic-capsuni", "produs-baton-proteic-caramel-sarat", "produs-baton-proteic-cocos-si-caramel", "produs-baton-proteic-ciocolata-fructe-de-padure"],
    ce: "Baton proteic cu glazură, gustarea cu proteine pentru după antrenament sau pentru drum.",
    cine: "Toți membrii, inclusiv cei care nu iau suplimente. Cel mai ușor produs de vândut la recepție.",
    cand: "După antrenament sau ca gustare între mese, când nu e timp de o masă.",
    spui: "„Ai mâncat ceva după antrenament? Avem batonul Prime, cu proteine, în patru arome. Cel cu caramel sărat e preferatul sălii.”",
    expunere: "Pe tejghea, lângă casă, cu toate cele patru arome la vedere. Se reumple zilnic." },
  { tag: "Înainte de antrenament", name: "Energy Pump Shot", sub: "pre-workout lichid, fiolă de 25 ml · cutie de 20", img: "produs-energy-pump",
    arome: ["Wild Berries (fructe de pădure)"],
    ce: "Pre-workout lichid cu cafeină, gata de băut, o fiolă = o porție. Nu are nevoie de shaker sau apă.",
    cine: "Membrii care vin obosiți la antrenament, seara după birou, sau cei care nu vor pudră.",
    cand: "Cu 15–20 de minute înainte de antrenament. Nu seara târziu (conține cafeină).",
    spui: "„Vii direct de la muncă? Ia o fiolă de Energy Pump, o bei aici, la recepție, și intri în sală.”",
    expunere: "În frigiderul de băuturi (se bea rece) sau pe tejghea, lângă batoane." },
  { tag: "Definire", name: "Fat Burning Booster Shot", sub: "fiolă de 25 ml · cutie de 20", img: "produs-fat-burning-booster",
    arome: ["Forest Fruits (fructe de pădure)"],
    ce: "Shot lichid cu L-carnitină și cafeină, o fiolă = o porție, pentru perioadele de definire și antrenamentele cardio.",
    cine: "Membrii care fac cardio, clasele de grup, cei în perioadă de slăbit (fără promisiuni: produsul însoțește antrenamentul, nu îl înlocuiește).",
    cand: "Înainte de cardio sau de antrenament. Nu seara târziu (conține cafeină).",
    spui: "„Faci cardio azi? Avem shotul cu L-carnitină, se bea înainte, direct din fiolă.”",
    expunere: "În frigider, lângă Energy Pump. Cele două fiole se vând bine împreună." },
  { tag: "La plic", name: "Creatină Ready To Go", sub: "plic efervescent de 10 g · cutie de 25", img: "produs-creatine-ready-to-go-plicuri-prime-supplements",
    arome: ["Blue Moon", "Pink Madness"],
    ce: "Creatină monohidrată cu aromă, la plic efervescent: se dizolvă într-un pahar cu apă, fără pudră și fără măsură.",
    cine: "Membrii care vor să încerce creatina fără să cumpere un tub, sau care au uitat creatina acasă.",
    cand: "Zilnic, 1 plic (3 g de creatină pe zi cresc performanța fizică în eforturi scurte și intense), inclusiv în zilele fără antrenament.",
    spui: "„Iei creatină? Avem și la plic, un plic pe zi, se dizolvă în apă. Încearcă un plic azi, după antrenament.”",
    expunere: "Într-un suport de plicuri pe tejghea, lângă casă, cu ambele arome." },
  { tag: "La plic", name: "Prime Whey Go", sub: "proteină din zer la plic, 30 g · cutie de 15", img: "produs-prime-whey-go",
    arome: ["Chocolate Coconut", "Bourbon Vanilla", "Strawberry Cheesecake", "White Chocolate Raspberry", "Toffee Chocolate", "Salted Caramel", "Blueberry Vanilla"],
    ce: "Prime Whey în porție unică de 30 g: un plic, un shaker cu apă, shake-ul de după antrenament.",
    cine: "Membrii noi, care nu au încă proteină, și cei care vor să guste aromele înainte de tubul de 1 kg.",
    cand: "După antrenament sau ca gustare, oricând lipsește proteina din zi.",
    spui: "„Nu ai proteină la tine? Un plic Prime Whey Go, îl pui în shaker cu apă și gata. Așa alegi și aroma pentru tubul mare.”",
    expunere: "Suport de plicuri pe tejghea, lângă creatina la plic. Shakerul Prime alături." },
  { tag: "Produsul de bază", name: "Prime Whey 1 kg", sub: "concentrat proteic din zer, 33 de porții", img: "produs-prime-whey-1000g",
    arome: ["Blueberry Vanilla", "Chocolate Coconut", "Salted Caramel", "Strawberry Cheesecake", "Toffee Chocolate", "White Chocolate Raspberry", "Bourbon Vanilla"],
    ce: "Proteina din zer Prime, tubul de 1 kg. Proteinele contribuie la creșterea și menținerea masei musculare.",
    cine: "Oricine se antrenează constant și nu ajunge la necesarul de proteine din mâncare. Produsul cu care pornesc cei mai mulți.",
    cand: "O porție (30 g) după antrenament sau în locul unei gustări; 1–2 porții pe zi, în funcție de mese.",
    spui: "„Câtă proteină mănânci pe zi? Dacă nu ajungi la 1,6 g pe kilogram, un shake Prime Whey acoperă diferența. Ai 7 arome, îți dau un plic să guști.”",
    expunere: "Pe raftul din spatele recepției, la vedere, 2–3 arome. Plicul Prime Whey Go e mostra lui." },
  { tag: "Mic dejun", name: "Creamy Rice", sub: "cremă de orez, 1 kg, 22 de porții", img: "produs-crema-de-orez-tort-de-ciocolata",
    arome: ["Tort de ciocolată", "Brioșă cu afine", "Caramel sărat", "Plăcintă cu cocos", "Sirop de arțar", "Biscuiți cu cremă", "Fără aromă"],
    ce: "Cremă de orez pregelatinizată: carbohidrați cu digestie ușoară, gata în un minut cu apă sau lapte, fără fiert.",
    cine: "Cei care se antrenează dimineața, cei în perioadă de masă și oricine vrea un mic dejun rapid și sățios.",
    cand: "Micul dejun sau masa de dinainte de antrenament (cu 60–90 de minute înainte). Merge și cu un plic de Prime Whey în ea.",
    spui: "„Ce mănânci înainte de antrenament? Crema de orez e gata într-un minut, o faci și la birou. Tort de ciocolată e cea mai cerută.”",
    expunere: "Pe raft, lângă Prime Whey. Se vinde bine împreună cu proteina (mic dejun proteic)." },
  { tag: "Creatină", name: "Creatină micronizată", sub: "creatină monohidrată fără aromă, 300 g, 60 de porții", img: "produs-creatina-monohidrat-micronized-300g-fara-aroma",
    arome: ["Fără aromă"],
    ce: "Creatină monohidrată micronizată, fără aromă, se pune în shake sau în orice băutură. Varianta accesibilă de creatină.",
    cine: "Membrii care vor creatina cea mai simplă, la cel mai bun preț pe porție, sau care o amestecă în proteină.",
    cand: "O măsură (5 g) pe zi, zilnic, în orice moment; nu contează ora, contează regularitatea.",
    spui: "„Creatina e cel mai studiat supliment din sală: 3 g pe zi, în fiecare zi. Asta e varianta fără aromă, o pui în shake.”",
    expunere: "Pe raft, lângă Creapure. Tubul alb iese în evidență între cele negre." },
  { tag: "Creatină premium", name: "Creatină Creapure®", sub: "creatină monohidrată Creapure®, 300 g sau 500 g", img: "produs-creatina-creapure",
    arome: ["Fără aromă · 300 g (60 de porții)", "Fără aromă · 500 g (100 de porții)"],
    ce: "Creatină monohidrată de marcă Creapure®, produsă în Germania, cu puritate garantată de producător.",
    cine: "Membrii care știu ce caută și întreabă de Creapure, sportivii de performanță, cei care vor „cea mai bună”.",
    cand: "3–5 g pe zi, zilnic, cu apă sau în shake, inclusiv în zilele fără antrenament.",
    spui: "„Dacă vrei creatina cu cea mai bună reputație, Creapure e marca germană pe care o au toți profesioniștii. Aceeași creatină, puritate verificată.”",
    expunere: "Pe raft, la nivelul ochilor. Tubul de 300 g e intrarea, cel de 500 g pentru fideli." },
  { tag: "Înainte de antrenament", name: "Nitrox 3D", sub: "pre-workout pudră, 500 g", img: "produs-nitrox",
    arome: ["Cherry", "Pineapple Mango", "Passion Fruit", "Strawberry Lime"],
    ce: "Pre-workout complet, cu cafeină, citrulină, beta-alanină și creatină. O măsură în shaker cu apă, înainte de antrenament.",
    cine: "Membrii avansați, cei care se antrenează greu și vor un pre-workout „adevărat”, nu doar o fiolă.",
    cand: "Cu 20–30 de minute înainte de antrenament. Nu seara târziu. Începătorii pornesc cu jumătate de măsură.",
    spui: "„Fiola e pentru azi; dacă vrei pre-workout în fiecare zi, Nitrox 3D iese mai bine la porție și are patru arome.”",
    expunere: "Pe raft, lângă shakere. Fiola Energy Pump de pe tejghea e mostra lui." },
  { tag: "Recuperare", name: "Aminoacizi EAA", sub: "aminoacizi esențiali pudră, 500 g, 83 de porții", img: "produs-eaa-aminoacizi-esentiali",
    arome: ["Peach Ice Tea", "Blueberry", "Strawberry & Kiwi", "Tropical"],
    ce: "Toți cei nouă aminoacizi esențiali, pudră cu aromă de băutură răcoritoare. Se bea în timpul antrenamentului sau în locul sucului.",
    cine: "Cei care se antrenează lung, cei care țin post intermitent și membrii care nu vor shake de proteine la sală.",
    cand: "În timpul antrenamentului (în sticla de apă) sau între mese.",
    spui: "„Ce bei la antrenament? EAA e ca un suc, dar cu aminoacizi. Peach Ice Tea e aroma cu care nu dai greș.”",
    expunere: "Pe raft, lângă Nitrox 3D." },
  { tag: "Zilnic", name: "Daily Vitamin Formula", sub: "vitamine și minerale la plic, 30 de plicuri", img: "produs-daily-vitamin-formula",
    arome: ["Plicuri de băut, cu aromă"],
    ce: "Multivitamine și minerale la plic, o doză pe zi dizolvată în apă. O cutie = o lună.",
    cine: "Membrii care iau deja vitamine, cei care mănâncă pe fugă, sezonul rece.",
    cand: "Un plic pe zi, dimineața, cu apă.",
    spui: "„Iei vitamine? Astea sunt la plic, un plic pe zi, cutia ține o lună. Se vând mult toamna.”",
    expunere: "Pe raft sau la casă, în sezonul rece, lângă Vitamina D3 + K2." },
  { tag: "Sezonul rece", name: "Vitamina D3 + K2", sub: "80 de capsule, Prime Health", img: "produs-vitamina-d3-k2",
    arome: ["Capsule"],
    ce: "Vitamina D3 cu K2, o capsulă o dată la două zile. Vitamina D contribuie la funcționarea normală a sistemului imunitar și la menținerea sănătății oaselor.",
    cine: "Toți membrii, din octombrie până în martie, când soarele nu ajunge. Produsul cu cea mai mare cerere din sezonul rece.",
    cand: "O capsulă la două zile, la o masă cu grăsimi.",
    spui: "„Iarna nu ai de unde lua vitamina D de la soare. O capsulă la două zile, flaconul ține aproape jumătate de an.”",
    expunere: "La casă, în sezonul rece, cu un mic afiș „Vitamina D pentru iarnă”." },
  { tag: "Mic dejun", name: "Instant Oat Cream", sub: "cremă de ovăz instant, 800 g, 25 de porții", img: "produs-instant-oat-cream-800g-25-serv",
    arome: ["Chocolate", "Cookie"],
    ce: "Ovăz instant măcinat fin, cu aromă: se face cu apă sau lapte, fără fiert, ca o cremă.",
    cine: "Cei care vor ovăz la micul dejun, dar nu au timp să-l fiarbă; alternativa la crema de orez.",
    cand: "Micul dejun sau masa de dinainte de antrenament.",
    spui: "„Mănânci ovăz dimineața? Ăsta e gata într-un minut, fără fiert, cu gust de ciocolată sau de biscuite.”",
    expunere: "Pe raft, lângă Creamy Rice." },
  { tag: "Accesoriu", name: "Shaker Prime", sub: "600 ml, negru transparent", img: "produs-prime-shaker-customised",
    arome: ["Negru transparent, logo Prime"],
    ce: "Shakerul Prime de 600 ml, cu sită, pentru proteină, creatină sau EAA.",
    cine: "Membrii noi, cei care și-au uitat shakerul acasă, cei care cumpără primul tub de proteină.",
    cand: "La orice vânzare de pudră: „Ai shaker?”",
    spui: "„Ai shaker? Îl iei pe-al nostru, 600 ml, cu sită, și ai și plicul de proteină pentru azi.”",
    expunere: "Pe tejghea, lângă plicuri, și pe raft, lângă tuburi. Duce brandul în sală." },
];

const card = p => `
<article class="card">
  <div class="pic"><img src="${IMG}/${p.img}.jpg" alt="${esc(p.name)}"></div>
  <div class="body">
    <p class="tag">${esc(p.tag)}</p>
    <h2>${esc(p.name)}</h2>
    <p class="sub">${esc(p.sub)}</p>
    <p class="ce">${esc(p.ce)}</p>
    ${p.aromeImg ? `<div class="arome-img">${p.aromeImg.map((f, i) => `<figure><img src="${IMG}/${f}.jpg" alt=""><figcaption>${esc(p.arome[i])}</figcaption></figure>`).join("")}</div>`
      : `<div class="arome"><b>${p.arome.length > 1 ? "Arome" : "Variantă"}:</b> ${p.arome.map(esc).join(" · ")}</div>`}
    <dl>
      <div><dt>Pentru cine</dt><dd>${esc(p.cine)}</dd></div>
      <div><dt>Când se ia</dt><dd>${esc(p.cand)}</dd></div>
      <div class="spui"><dt>Ce spui la recepție</dt><dd>${esc(p.spui)}</dd></div>
      <div><dt>Unde se expune</dt><dd>${esc(p.expunere)}</dd></div>
    </dl>
  </div>
</article>`;

const html = `<!doctype html>
<html lang="ro"><head><meta charset="utf-8">
<title>Ghidul recepției – Prime Supplements</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
<style>
  :root { --red: #ec1e24; --ink: #111; --grey: #666; --line: #e6e6e6; --bg: #f5f5f5; }
  * { box-sizing: border-box; }
  html, body { margin: 0; background: #fff; color: var(--ink); font-family: Poppins, "Segoe UI", Arial, sans-serif; font-size: 10.5pt; line-height: 1.45; }
  img { display: block; }
  .page { position: relative; width: 210mm; min-height: 297mm; padding: 14mm 15mm 16mm; break-after: page; page-break-after: always; background: #fff; }
  .page:last-child { break-after: auto; page-break-after: auto; }
  .foot { position: absolute; left: 15mm; right: 15mm; bottom: 7mm; font-size: 7.5pt; color: #9a9a9a; display: flex; justify-content: space-between; }
  .kicker { color: var(--red); text-transform: uppercase; letter-spacing: 2px; font-weight: 700; font-size: 8.5pt; margin: 0 0 2mm; }
  h1 { font-size: 26pt; line-height: 1.1; margin: 0 0 4mm; font-weight: 800; }
  h1 span { color: var(--red); }
  h2 { font-size: 17pt; line-height: 1.15; margin: 0 0 1mm; font-weight: 800; }
  h3 { font-size: 12pt; margin: 6mm 0 2mm; font-weight: 700; border-left: 4px solid var(--red); padding-left: 3mm; }
  p { margin: 0 0 2mm; }
  /* copertă */
  .cover { padding: 0; overflow: hidden; height: 297mm; }
  .cover img.hero { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .cover .shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.15) 40%, rgba(0,0,0,.75) 100%); }
  .cover .logo { position: absolute; left: 15mm; top: 14mm; height: 14mm; }
  .cover .text { position: absolute; left: 15mm; right: 15mm; bottom: 22mm; color: #fff; }
  .cover h1 { font-size: 34pt; color: #fff; }
  .cover p { font-size: 12.5pt; font-weight: 300; color: #fff; max-width: 150mm; }
  .cover .foot { color: rgba(255,255,255,.8); }
  /* intro */
  .steps { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4mm; margin: 3mm 0 2mm; }
  .steps div { background: var(--bg); border-top: 3px solid var(--red); padding: 4mm; border-radius: 0 0 2mm 2mm; font-size: 9.5pt; }
  .steps b { display: block; font-size: 9pt; text-transform: uppercase; letter-spacing: .6px; color: var(--red); margin-bottom: 1.5mm; }
  .steps i { display: block; font-style: normal; font-weight: 800; font-size: 20pt; color: #ddd; line-height: 1; margin-bottom: 1mm; }
  .zones { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; }
  .zones div { border: 1px solid var(--line); border-radius: 2mm; padding: 4mm; font-size: 9.5pt; }
  .zones b { display: block; color: var(--ink); margin-bottom: 1mm; }
  ul.rules { margin: 0; padding-left: 5mm; font-size: 9.5pt; } ul.rules li { margin-bottom: 1.2mm; }
  /* carduri produs */
  .card { display: grid; grid-template-columns: 52mm 1fr; gap: 6mm; border: 1px solid var(--line); border-radius: 3mm; padding: 5mm; margin-bottom: 6mm; break-inside: avoid; page-break-inside: avoid; }
  .card .pic { background: var(--bg); border-radius: 2mm; display: flex; align-items: center; justify-content: center; padding: 3mm; min-height: 52mm; }
  .card .pic img { max-width: 100%; max-height: 60mm; object-fit: contain; mix-blend-mode: multiply; }
  .card .tag { color: var(--red); text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; font-size: 8pt; margin: 0 0 1mm; }
  .card .sub { color: var(--grey); font-size: 9pt; margin-bottom: 2mm; }
  .card .ce { font-size: 9.8pt; margin-bottom: 2.5mm; }
  .arome { font-size: 9pt; background: var(--bg); padding: 2mm 3mm; border-radius: 1.5mm; margin-bottom: 2.5mm; }
  .arome-img { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2mm; margin-bottom: 2.5mm; }
  .arome-img figure { margin: 0; text-align: center; font-size: 7.5pt; line-height: 1.2; }
  .arome-img img { width: 100%; aspect-ratio: 1/1; object-fit: contain; background: var(--bg); border-radius: 1.5mm; mix-blend-mode: multiply; }
  dl { margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 2mm 4mm; }
  dl div { font-size: 8.8pt; }
  dl .spui { grid-column: 1 / -1; background: #fff3f3; border-left: 3px solid var(--red); padding: 2mm 3mm; border-radius: 0 1.5mm 1.5mm 0; }
  dt { font-weight: 700; text-transform: uppercase; font-size: 7.5pt; letter-spacing: .6px; color: var(--grey); }
  .spui dt { color: var(--red); }
  dd { margin: 0; }
  /* FAQ */
  .faq div { border-bottom: 1px solid var(--line); padding: 2.5mm 0; font-size: 9.5pt; }
  .faq b { display: block; color: var(--ink); }
  .contact { background: var(--ink); color: #ddd; padding: 5mm 6mm; border-radius: 2mm; margin-top: 6mm; font-size: 9.5pt; }
  .contact b { color: #fff; }
  @media print { @page { size: A4; margin: 0; } * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .card .pic img, .arome-img img { mix-blend-mode: normal; } .card .pic, .arome-img img { background: #fff; border: 1px solid var(--line); } }
  @media screen { body { background: #777; padding: 10mm; } .page { margin: 0 auto 10mm; box-shadow: 0 4px 24px rgba(0,0,0,.3); } }
</style></head>
<body>

<section class="page cover">
  <img class="hero" src="${IMG}/batoane-fiole.jpg" alt="">
  <div class="shade"></div>
  <img class="logo" src="${IMG}/logo-prime-alb.svg" alt="Prime Supplements">
  <div class="text">
    <p class="kicker" style="color:#ff6b6f">Pentru sălile partenere</p>
    <h1>Ghidul <span>recepției</span> Prime</h1>
    <p>Ce produse ții la recepție, pentru cine sunt, când se iau și ce spui membrului în zece secunde. Batoane, shot-uri, plicuri și produsele mici care se vând singure.</p>
  </div>
  <div class="foot"><span>Prime Sport Supplements SRL · primesupplements.ro</span><span>Ediția ${DATA.split("-").reverse().join(".")}</span></div>
</section>

<section class="page">
  <p class="kicker">Cum folosești ghidul</p>
  <h1>Trei întrebări și un raft bine așezat.</h1>
  <p>Recepția vinde cel mai mult când întreabă, nu când așteaptă. Fiecare produs din ghid are o propoziție gata de spus. Nu promitem efecte: spunem ce conține produsul, pentru cine e și când se ia.</p>
  <h3>Cele trei întrebări de la recepție</h3>
  <div class="steps">
    <div><i>1</i><b>Ce antrenament faci azi?</b>Forță sau greu → creatină, pre-workout (fiolă sau Nitrox). Cardio sau clasă → Fat Burning Shot, EAA în sticla de apă.</div>
    <div><i>2</i><b>Ai mâncat înainte / mănânci după?</b>Nu a mâncat → Creamy Rice sau baton acum. Nu are ce mânca după → baton, plic Prime Whey Go, shaker.</div>
    <div><i>3</i><b>Ce iei deja?</b>Nimic → începe cu batonul și un plic. Proteină → creatină. Creatină → Creapure sau pre-workout. Toate → vitamine, D3 + K2 iarna.</div>
  </div>
  <h3>Unde se expune ce</h3>
  <div class="zones">
    <div><b>Tejghea, lângă casă (impuls)</b>Batoane, toate cele 4 arome, în cutia deschisă. Suport cu plicuri: Creatină Ready To Go și Prime Whey Go. Shakerul Prime.</div>
    <div><b>Frigiderul de băuturi</b>Energy Pump Shot și Fat Burning Booster Shot, reci, pe raftul de la nivelul ochilor, lângă apă.</div>
    <div><b>Raftul din spatele recepției (la vedere)</b>Prime Whey 1 kg (2–3 arome), Creamy Rice, Creatină Creapure și micronizată, Nitrox 3D, EAA, Instant Oat Cream.</div>
    <div><b>La casă, sezonier</b>Toamnă–iarnă: Vitamina D3 + K2 și Daily Vitamin Formula, cu un afiș mic. Vară: shot-urile și EAA în față.</div>
  </div>
  <h3>Regulile casei</h3>
  <ul class="rules">
    <li>Mostra vinde tubul: plicul Prime Whey Go e mostra pentru Prime Whey 1 kg, fiola Energy Pump e mostra pentru Nitrox 3D.</li>
    <li>Produsele cu cafeină (shot-uri, Nitrox 3D) nu se recomandă seara târziu, minorilor, femeilor însărcinate sau celor sensibili la cafeină.</li>
    <li>Suplimentele nu înlocuiesc o alimentație variată. Nu promitem slăbire, masă sau rezultate; descriem produsul și doza de pe etichetă.</li>
    <li>Cutia de batoane și suporturile de plicuri se reumplu în fiecare dimineață; un raft gol nu vinde.</li>
    <li>Comenzile de reaprovizionare: prin agentul Prime sau la contact@primesupplements.ro · 0775 286 584.</li>
  </ul>
  <div class="foot"><span>Ghidul recepției Prime</span><span>2</span></div>
</section>

${(() => { const pages = []; let i = 0, n = 3;
  // batoanele singure pe pagină (card mare), apoi câte două carduri pe pagină
  pages.push(`<section class="page">${card(produse[0])}<h3>Cum se vând batoanele</h3><ul class="rules"><li>Cutia deschisă pe tejghea, cu toate aromele la vedere; o aromă lipsă = vânzări lipsă.</li><li>Întrebarea de aur după antrenament: „Ai mâncat ceva?”.</li><li>Pachet de 3 batoane pentru cei care vin de 3 ori pe săptămână.</li><li>Aroma de încercat prima dată: caramel sărat; pentru cei cărora nu le place dulcele: ciocolată și fructe de pădure.</li></ul><img src="${IMG}/plaja-bar-5.jpg" alt="" style="width:100%;height:78mm;object-fit:cover;border-radius:3mm;margin-top:5mm"><div class="foot"><span>Ghidul recepției Prime</span><span>${n++}</span></div></section>`);
  for (i = 1; i < produse.length; i += 2) {
    pages.push(`<section class="page">${card(produse[i])}${produse[i + 1] ? card(produse[i + 1]) : ""}<div class="foot"><span>Ghidul recepției Prime</span><span>${n++}</span></div></section>`);
  }
  pages.push(`<section class="page">
  <p class="kicker">Întrebări frecvente la recepție</p>
  <h1>Răspunsuri scurte, corecte.</h1>
  <div class="faq">
    <div><b>„Creatina îmi face rău la rinichi?”</b>La adulții sănătoși, 3–5 g pe zi este doza de pe etichetă și cea studiată. Cine are o afecțiune sau ia medicamente întreabă medicul. Nu dăm sfaturi medicale la recepție.</div>
    <div><b>„Când se ia creatina, înainte sau după?”</b>Nu contează ora, contează zilnic. Cu apă sau în shake, și în zilele fără antrenament.</div>
    <div><b>„Proteina îngrașă?”</b>Proteina e un aliment, nu un medicament: o porție de Prime Whey are cam cât un iaurt mare. Contează totalul zilei, nu shake-ul.</div>
    <div><b>„Pot bea două fiole?”</b>O fiolă pe zi. Conțin cafeină; nu seara, nu cu cafea multă, nu la minori sau în sarcină.</div>
    <div><b>„Batonul e bun pentru slăbit?”</b>E o gustare cu proteine, mai bună decât o napolitană. Slăbitul vine din total calorii și antrenament, nu dintr-un baton.</div>
    <div><b>„Ce aromă e cea mai bună?”</b>La Prime Whey și Whey Go: Salted Caramel și Strawberry Cheesecake. La batoane: caramel sărat. La Creamy Rice: tort de ciocolată. La Nitrox: Cherry.</div>
    <div><b>„Unde văd compoziția?”</b>Pe etichetă și pe primesupplements.ro, fiecare produs are pagina lui cu tabelul nutrițional și un articol din blog care explică folosirea.</div>
    <div><b>„E produs în România?”</b>Brandul e românesc, din Sibiu; produsele sunt fabricate în Uniunea Europeană.</div>
  </div>
  <div class="contact"><b>Reaprovizionare și întrebări:</b> agentul Prime al sălii · contact@primesupplements.ro · 0775 286 584 (și WhatsApp) · primesupplements.ro<br>Prețurile de raft le stabilește sala; lista de prețuri B2B și prețurile recomandate sunt în documentul separat primit de la agent.</div>
  <div class="foot"><span>Ghidul recepției Prime · Produs în Uniunea Europeană</span><span>${n}</span></div>
</section>`);
  return pages.join("\n"); })()}

<script>
  const n = +new URLSearchParams(location.search).get("page");
  if (n) { document.body.style.cssText = "background:#fff;padding:0;margin:0"; document.querySelectorAll(".page").forEach((s, i) => { if (i + 1 !== n) s.remove(); else s.style.margin = "0"; }); }
</script>
</body></html>`;

writeFileSync(new URL(`./GHID-RECEPTII-${DATA}.html`, import.meta.url), "﻿" + html, "utf8");
console.log("scris, produse:", produse.length);
