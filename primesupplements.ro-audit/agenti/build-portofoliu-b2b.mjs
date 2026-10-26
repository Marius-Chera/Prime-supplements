// Generează agenti/PORTOFOLIU-B2B-<data>.html din:
//  - agenti/data/produse-site-<data>.json  (prețurile live de pe primesupplements.ro, products.json)
//  - lista B2B de listă din Anexa 3 a contractului agentului (26.10.2026)
//  - pozele din ședințele foto (Shopify Files) și imaginile AI din articolele de blog
// Rulare: node agenti/build-portofoliu-b2b.mjs
import { readFileSync, writeFileSync } from "node:fs";

const DATA = "2026-10-26";
const site = JSON.parse(readFileSync(new URL(`./data/produse-site-${DATA}.json`, import.meta.url), "utf8"));
const byHandle = Object.fromEntries(site.map(p => [p.handle, p]));

// Preț recomandat la raft: prețul întreg de pe site + 2,5 % (2–3 %), rotunjit la leu.
const RAFT_PLUS = 0.025;
const CDN = "https://cdn.shopify.com/s/files/1/0917/5138/3415/files/";

// name = denumirea din Anexa 3; base = prețul de site cu TVA folosit în Anexa 3; b2b = preț listă B2B fără TVA; vat = cota TVA
const groups = [
  { name: "Proteine și gainer", items: [
    { name: "Prime Whey – proteină din zer, 1 kg", handle: "prime-whey-1000g", base: 215, b2b: 142, vat: 21,
      blurb: "Concentrat proteic din zer, 33 de porții, 7 arome. Cel mai vândut produs Prime, baza oricărui raft de sală." },
    { name: "Prime Whey – proteină din zer, 2 kg", handle: "prime-whey-2000g", base: 390, b2b: 274, vat: 21,
      blurb: "Același Prime Whey în tubul mare de 2 kg, 66 de porții, cel mai bun preț pe porție pentru clienții fideli." },
    { name: "Izolat proteic Pure Isolate – 2 kg", handle: "pure-isolate-2000g", base: 510, b2b: 391, vat: 11,
      blurb: "Izolat proteic din zer, cu conținut redus de lactoză, carbohidrați și grăsimi. Pentru definire și clienții pretențioși." },
    { name: "Prime Whey Go – cutie 15 plicuri x 30 g", handle: "prime-whey-go", base: 150, b2b: 87, vat: 21,
      blurb: "Prime Whey la plic de 30 g, porție unică. Ideal la recepție, pentru vânzare la bucată sau ca mostră." },
    { name: "Gainer Emperor Mass – 3 kg", handle: "emperor-mass_3000g", base: 390, b2b: 299, vat: 11,
      blurb: "Gainer cu 40 % proteină, carbohidrați și creatină, 3 kg. Pentru clienții care vor masă și nu reușesc să mănânce destul." },
  ]},
  { name: "Creatină", items: [
    { name: "Creatină Creapure® – 500 g", handle: "creatina-creapure", base: 180, b2b: 104, vat: 21,
      blurb: "Creatină monohidrată Creapure®, produsă în Germania, 100 de porții de 5 g. Cel mai cunoscut brand de creatină din lume." },
    { name: "Creatină Creapure® – 300 g", handle: "creatina-creapure", variant: "300", base: 115, b2b: 67, vat: 21,
      blurb: "Aceeași creatină Creapure®, în tubul de 300 g (60 de porții), la un preț de intrare mai mic." },
    { name: "Creatină monohidrată micronizată – 300 g", handle: "creatina-monohidrat-micronized-300g-fara-aroma", base: 98, b2b: 57, vat: 21,
      blurb: "Creatină monohidrată micronizată, fără aromă, 60 de porții. Varianta accesibilă, cu cea mai bună marjă la raft." },
    { name: "Creatină Ready To Go – cutie 25 plicuri x 10 g", handle: "creatine-ready-to-go-plicuri-prime-supplements", base: 110, b2b: 64, vat: 21,
      blurb: "Creatină efervescentă la plic, cu aromă, 25 de plicuri. Se vinde și la bucată, direct la recepție." },
  ]},
  { name: "Aminoacizi", items: [
    { name: "Aminoacizi esențiali EAA – 500 g", handle: "eaa-aminoacizi-esentiali", base: 185, b2b: 107, vat: 21,
      blurb: "Toți cei 9 aminoacizi esențiali, pudră aromată, 83 de porții. Pentru antrenament și recuperare." },
    { name: "Recovery BCAA 4:1:1 – 500 g", handle: "recovery-bcaa-500g", base: 150, b2b: 87, vat: 21,
      blurb: "BCAA în raport 4:1:1, pudră aromată, 62 de porții. Produsul clasic de recuperare, cerut de clienți." },
    { name: "L-glutamină Kyowa® – 500 g", handle: "recovery-glutamin", base: 175, b2b: 101, vat: 21,
      blurb: "L-glutamină Kyowa Quality®, materie primă japoneză, 100 de porții de 5 g, cu sau fără aromă." },
  ]},
  { name: "Pre-workout, intra-workout și shot-uri", items: [
    { name: "Pre-workout Nitrox 3D – 500 g", handle: "nitrox", base: 190, b2b: 110, vat: 21,
      blurb: "Pre-workout complet cu cafeină, citrulină, beta-alanină și creatină, 500 g, 4 arome. Cel mai cerut pre-workout Prime." },
    { name: "Pre-workout Nitrox No-Stim – 660 g", handle: "nitrox-no-stim", base: 205, b2b: 119, vat: 21,
      blurb: "Pre-workout fără stimulente, pentru antrenamentele de seară și clienții sensibili la cafeină. 660 g." },
    { name: "Pre-workout Combat Pro – 500 g", handle: "combat-pro", base: 170, b2b: 98, vat: 21,
      blurb: "Pre-workout cu cafeină, formulă echilibrată, 500 g, 4 arome. Alternativa accesibilă la Nitrox 3D." },
    { name: "Pre-workout Combat Pro 2.0 – 660 g", handle: "combat-pro-2-0-660g-30-serv", base: 205, b2b: 136, vat: 21,
      blurb: "Versiunea concentrată, 660 g, 30 de porții mari. Pentru sportivii avansați." },
    { name: "Cluster Bomb intra-workout – 1 kg", handle: "cluster-bomb-1000g", base: 220, b2b: 127, vat: 21,
      blurb: "Carbohidrați Cluster Dextrin® cu electroliți, 1 kg. Pentru antrenamentele lungi și sporturile de anduranță." },
    { name: "Glycerol Max Pump – 500 g", handle: "glycerol-max-pump-500g-125-serv", base: 110, b2b: 64, vat: 21,
      blurb: "Monostearat de glicerol pudră, 125 de porții. Se combină cu orice pre-workout." },
    { name: "Energy Pump Shot – cutie 20 x 25 ml", handle: "energy-pump", base: 190, b2b: 110, vat: 21,
      blurb: "Pre-workout lichid în fiolă de 25 ml, cutie de 20. Se vinde la bucată la recepție, înainte de antrenament." },
    { name: "Fat Burning Booster Shot – cutie 20 x 25 ml", handle: "fat-burning-booster", base: 170, b2b: 98, vat: 21,
      blurb: "Shot lichid cu L-carnitină și cafeină, 25 ml, cutie de 20. Produs de impuls, rotație rapidă la frigiderul sălii." },
  ]},
  { name: "Arzătoare și definire", items: [
    { name: "Thermo Core – 120 capsule", handle: "thermo-core-120-caps", base: 115, b2b: 67, vat: 21,
      blurb: "Capsule cu L-carnitină, ceai verde și cafeină, 120 de capsule (60 de porții)." },
    { name: "Water Out – 120 capsule", handle: "water-out-120-caps", base: 115, b2b: 67, vat: 21,
      blurb: "Extracte din plante (păpădie, urzică, coada-calului) în capsule, 120 de capsule. Cerut în perioadele de definire." },
    { name: "Water Out tinctură – 500 ml", handle: "water-out-500-ml", base: 73, b2b: 42, vat: 21,
      blurb: "Aceeași formulă din plante, ca tinctură de 500 ml, gama Prime Health." },
    { name: "L-carnitină 1000 – 80 capsule", handle: "l-carnitine-1000-80-caps", base: 100, b2b: 58, vat: 21,
      blurb: "L-carnitină 1000 mg per capsulă, 80 de capsule. Unul dintre cele mai căutate suplimente la sală." },
  ]},
  { name: "Vitamine, minerale și plante", items: [
    { name: "Fiber – băutură cu fibre, 500 g", handle: "fiber-blood-orange", base: 130, b2b: 82, vat: 11,
      blurb: "Băutură cu fibre solubile, aromă de portocală roșie, 50 de porții." },
    { name: "Daily Vitamin Formula – 30 plicuri", handle: "daily-vitamin-formula", base: 160, b2b: 93, vat: 21,
      blurb: "Multivitamine și minerale la plic, 30 de plicuri (o lună). Se vinde și la bucată." },
    { name: "Complete Collagen lichid – 500 ml", handle: "complete-collagen", base: 165, b2b: 102, vat: 21,
      blurb: "Colagen hidrolizat lichid, 500 ml, gama Prime Health. Cerut de clientele sălilor și de persoanele active peste 40 de ani." },
    { name: "Omega-3 – 80 capsule", handle: "omega-3", base: 69, b2b: 40, vat: 21,
      blurb: "Ulei de pește cu EPA și DHA, 80 de capsule. Produs de bază, cu rotație constantă tot anul." },
    { name: "Vitamina D3 + K2 – 80 capsule", handle: "vitamina-d3-k2", base: 80, b2b: 46, vat: 21,
      blurb: "Vitamina D3 2000 UI cu K2, 80 de capsule. Cel mai căutat produs din toamnă până în primăvară." },
    { name: "Vitamina C 1000 mg – 80 capsule", handle: "vitamin-c-1000-80-caps", base: 59, b2b: 34, vat: 21,
      blurb: "Vitamina C 1000 mg, 80 de capsule. Preț mic, vânzare ușoară la recepție." },
    { name: "Magneziu bisglicinat 300 mg – 80 capsule", handle: "magneziu-bisglicinat-80-caps", base: 90, b2b: 52, vat: 21,
      blurb: "Magneziu bisglicinat (forma chelatată, bine tolerată), 80 de capsule, gama Prime Health." },
    { name: "Citrat de magneziu – 80 capsule", handle: "magnesium-citrate-80-caps", base: 70, b2b: 40, vat: 21,
      blurb: "Citrat de magneziu, 80 de capsule. Varianta accesibilă de magneziu." },
    { name: "Citrat de zinc 40 mg – 80 capsule", handle: "zinc-citrate-80-caps", base: 55, b2b: 32, vat: 21,
      blurb: "Citrat de zinc 40 mg, 80 de capsule." },
    { name: "Potassium Complex – 80 capsule", handle: "potassium-complex-80-caps", base: 67, b2b: 39, vat: 21,
      blurb: "Potasiu și magneziu în capsule, 80 de capsule. Pentru electroliți și perioadele cu transpirație intensă." },
    { name: "Picolinat de crom – 80 capsule", handle: "supliment-alimentar-chromium-picolinate-80-caps", base: 60, b2b: 35, vat: 21,
      blurb: "Picolinat de crom 200 µg, 80 de capsule." },
    { name: "NAC 500 mg – 80 capsule", handle: "nac-80-caps", base: 85, b2b: 49, vat: 21,
      blurb: "N-acetilcisteină 500 mg, 80 de capsule." },
    { name: "Taurină 1000 mg – 80 capsule", handle: "taurine-80-caps", base: 50, b2b: 29, vat: 21,
      blurb: "Taurină 1000 mg, 80 de capsule. Preț mic, produs de completare." },
    { name: "Coenzima Q10 200 mg – 80 capsule", handle: "coenzima-q10-80-caps", base: 95, b2b: 55, vat: 21,
      blurb: "Coenzima Q10 200 mg per capsulă, 80 de capsule, gama Prime Health." },
    { name: "Ashwagandha KSM-66 – 80 capsule", handle: "ashwagandha-ksm-66", base: 80, b2b: 46, vat: 21,
      blurb: "Extract de ashwagandha KSM-66® (cel mai studiat extract), 80 de capsule vegetale, gama Prime Health." },
    { name: "Citrus Bergamot – 80 capsule", handle: "citrus-bergamot", base: 160, b2b: 99, vat: 21,
      blurb: "Extract de bergamotă Bergamonte® 500 mg, 80 de capsule vegetale, gama Prime Health." },
    { name: "Turmeric cu piperină – 80 capsule", handle: "turmeric-extract-80-caps", base: 95, b2b: 55, vat: 21,
      blurb: "Extract de turmeric cu piperină (pentru absorbție), 80 de capsule." },
    { name: "Silimarină – 80 capsule", handle: "silimarina-80-caps", base: 100, b2b: 58, vat: 21,
      blurb: "Extract de silimarină (armurariu), 80 de capsule." },
    { name: "Spirulină – 80 capsule", handle: "spirulina-80-caps", base: 75, b2b: 43, vat: 21,
      blurb: "Spirulină în capsule, 80 de capsule." },
    { name: "Nattokinază – 60 capsule", handle: "enzima-nattokinaza-80-caps", base: 60, b2b: 35, vat: 21,
      blurb: "Enzimă nattokinază 100 mg, 60 de capsule." },
    { name: "Testo Revive tinctură – 500 ml", handle: "testo-revive-500-ml", base: 73, b2b: 42, vat: 21,
      blurb: "Tinctură din plante (tribulus, maca, ginseng), 500 ml, gama Prime Health." },
    { name: "Cardio Calm tinctură – 500 ml", handle: "cardio-calm-500-ml", base: 73, b2b: 42, vat: 21,
      blurb: "Tinctură din plante (păducel, valeriană, roiniță), 500 ml, gama Prime Health." },
    { name: "Scorțișoară Ceylon bio – 200 g", handle: "scortisoara-ceylon-bio-200g", base: 55, b2b: 35, vat: 11,
      blurb: "Scorțișoară de Ceylon pudră, certificată bio, 200 g." },
  ]},
  { name: "Alimente funcționale", items: [
    { name: "Batoane proteice – cutie 12 x 55 g", handle: "baton-proteic-ciocolata-fructe-de-padure", base: 155, b2b: 98, vat: 11,
      blurb: "Prime Delicious Bar, baton proteic de 55 g, 4 arome, cutie de 12. Produsul de impuls numărul 1 la recepție." },
    { name: "Cremă de orez Creamy Rice – 1 kg", handle: "crema-de-orez-tort-de-ciocolata", base: 65, b2b: 50, vat: 11,
      blurb: "Cremă de orez pregelatinizată, 1 kg, 22 de porții, 7 arome. Micul dejun și masa de dinainte de antrenament, gata în 1 minut." },
    { name: "Instant Oat Cream – 800 g", handle: "instant-oat-cream-800g-25-serv", base: 65, b2b: 41, vat: 11,
      blurb: "Cremă de ovăz instant, 800 g, 25 de porții." },
    { name: "Unt de arahide Prime Health – 600 g", handle: "unt-de-arahide", base: 50, b2b: 32, vat: 11,
      blurb: "Unt de arahide 100 %, fără zahăr și ulei de palmier, 600 g." },
    { name: "Unt de migdale Prime Health – 600 g", handle: "unt-de-migdale", base: 92, b2b: 70, vat: 11,
      blurb: "Unt de migdale 100 %, 600 g." },
    { name: "Unt de caju Prime Health – 600 g", handle: "unt-de-caju", base: 90, b2b: 73, vat: 11,
      blurb: "Unt de caju 100 %, 600 g." },
  ]},
  { name: "Accesorii Prime", items: [
    { name: "Shaker Prime 600 ml", handle: "prime-shaker-customised", base: 35, b2b: 20, vat: 21,
      blurb: "Shaker Prime de 600 ml, negru transparent, cu logo. Accesoriul care duce brandul în sală." },
    { name: "Prosop de sală Prime", handle: "prosop-negru", base: 65, b2b: 38, vat: 21,
      blurb: "Prosop de sală negru, 50 x 100 cm, cu logo Prime brodat." },
  ]},
];

// Articole din blogul Prime (primesupplements.ro/blogs/news) – imagine, handle, titlu, mini-rezumat
const ART = "https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/";
const articole = [
  ["blog-cata-proteina-pe-zi-calcul.jpg?v=1791916897", "cata-proteina-trebuie-zi-calcul-greutate-obiectiv", "Câtă proteină pe zi: calcul pe greutate și obiectiv",
   "Un adult sedentar are nevoie de circa 0,8 g de proteine pe kilogram corp pe zi; cine se antrenează cu greutăți ajunge la 1,6–2,2 g/kg. Calculul e simplu: greutatea înmulțită cu ținta, împărțită pe 3–5 mese. Pudra proteică acoperă doar diferența care lipsește din mâncare – argumentul cu care recomanzi Prime Whey la raft."],
  ["blog-izolat-vs-concentrat-proteic-ghid-combinare-2026-1786536796132.png?v=1792126796", "izolat-vs-concentrat-proteic", "Izolat vs concentrat proteic: merită diferența de preț?",
   "Izolatul are mai multe proteine și mai puțini carbohidrați și grăsimi la 100 g: Pure Isolate ajunge la 87 g proteine la 100 g și sub 1 g carbohidrați. Concentratul (Prime Whey) rămâne alegerea bună pentru buget, dacă lactatele sunt tolerate. Ambele se pot combina: izolatul după antrenament, concentratul în restul zilei."],
  ["blog-creapure-vs-creatina-monohidrata-obisnuita.jpg?v=1792123883", "creapure-vs-creatina-monohidrata-obisnuita", "Creapure® vs creatină monohidrată obișnuită: ce diferă",
   "Creapure® este o marcă înregistrată de creatină monohidrată produsă în Germania; molecula și mențiunea autorizată în UE (3 g pe zi cresc performanța în eforturi scurte și intense) sunt aceleași. Diferențele se citesc pe etichetă: ingredientul declarat, doza, porțiile. Prime are ambele: Creapure® (300 și 500 g) și creatina micronizată de 300 g, la preț mai mic."],
  ["blog-cand-se-ia-creatina-inainte-sau-dupa-antrenament.jpg?v=1792296840", "cand-se-ia-creatina-inainte-sau-dupa-antrenament", "Când se ia creatina: înainte sau după antrenament?",
   "Eticheta nu fixează un moment: contează doza zilnică (3–5 g la Creapure®), luată și în zilele fără antrenament. Cel mai bun moment este cel pe care clientul îl poate respecta zi de zi, cu apă sau în shake. Articolul dă trei rutine simple și cele cinci greșeli frecvente."],
  ["blog-gainer-ce-este-cum-functioneaza-cine-are-nevoie-din-sedinta-foto-plaja-nitrox-3d-emperor-mass-recovery-bcaa-2.jpg?v=1792839733", "gainer-ce-este-cum-functioneaza-cine-are-nevoie", "Gainer: ce este, cum funcționează și cine are nevoie de el",
   "Gainerul este o pudră cu proteine și carbohidrați pentru cei care nu reușesc să mănânce destule calorii. Se adaugă la mese, nu le înlocuiește. Pe etichetă contează proteina la 100 g și zaharurile: Emperor Mass are 39,7 g proteine la 100 g, raport aproape 1:1 cu carbohidrații, față de 15–25 % la gainerele obișnuite."],
  ["blog-magneziu-sportivi-cat-iei-eticheta.jpg?v=1792695730", "magneziu-sportivi-cat-iei-eticheta", "Magneziul la sportivi: cât iei și ce verifici pe etichetă",
   "Magneziul se alege după forma lui, cantitatea pe doza zilnică și procentul din VNR, nu după cifra mare de pe față. La Magneziul bisglicinat Prime Health, doza este 3 capsule pe zi (un flacon ajunge cam 26 de zile) și contribuie la funcționarea normală a sistemului muscular."],
  ["blog-vitamina-d-iarna-scade-mentii.jpg?v=1792665296", "vitamina-d-iarna-scade-mentii", "Vitamina D iarna: de ce scade și cum o menții",
   "Pielea produce vitamina D doar la soare, iar din noiembrie până în februarie soarele e prea jos. Nivelul real îl arată o analiză. Pe eticheta Vitamina D3 + K2 Prime, doza este o capsulă o dată la 2 zile, la o masă cu grăsimi. Produsul cu cea mai mare căutare din sezonul rece."],
];

// LOCAL=1: imaginile se iau din folderul local (pentru PDF – CDN-ul trimite WebP către Chrome și PDF-ul ar crește de 5 ori)
const LOCAL = process.env.LOCAL === "1";
const IMGDIR = `PORTOFOLIU-B2B-${DATA}-img`;
// CLIENT=nutrafit: varianta pentru distribuitorul NUTRAFIT DISTRIBUTIONS S.R.L. (platformă B2B care revinde firmelor):
// aceleași prețuri B2B Prime; preț recomandat Nutrafit = B2B + o treime din diferența până la prețul de raft final (fără TVA);
// preț de raft final pentru magazinul care cumpără de la Nutrafit = prețul de site + 5,5 % (5–6 %), rotunjit la leu.
const NUTRAFIT = process.env.CLIENT === "nutrafit";
const CLIENT = { name: "NUTRAFIT DISTRIBUTIONS S.R.L.", cui: "RO46566904", reg: "J2022005085233", addr: "București, Sector 2, Calea Moșilor nr. 158, et. 4, camera 4, modul 652" };
const RAFT_PLUS_FINAL = 0.055;
const picList = [];
const pic = (url, file) => { picList.push({ url, file }); return LOCAL ? `${IMGDIR}/${file}` : url; };
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const lei = n => n.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const lei0 = n => n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });
const img = (src, w) => src.includes("?") ? `${src}&width=${w}` : `${src}?width=${w}`;

const warnings = [];
let count = 0;
for (const g of groups) for (const it of g.items) {
  const p = byHandle[it.handle];
  if (!p) { warnings.push(`LIPSĂ pe site: ${it.name} (${it.handle})`); it.site = it.base; it.img = null; continue; }
  let v = p.variants[0];
  if (it.variant) v = p.variants.find(x => x.title.includes(it.variant)) || v;
  const full = v.compare_at && v.compare_at > v.price ? v.compare_at : v.price;
  it.site = full;
  it.promo = v.compare_at && v.compare_at > v.price ? v.price : null;
  it.img = p.image;
  it.url = `https://primesupplements.ro/products/${p.handle}`;
  if (full !== it.base) warnings.push(`Preț site diferit de baza din Anexa 3: ${it.name}: site ${full} vs Anexa ${it.base}`);
  it.b2bGross = Math.round(it.b2b * (1 + it.vat / 100) * 100) / 100;
  it.raft = Math.round(it.site * (1 + RAFT_PLUS));
  it.profitNet = (it.raft - it.b2bGross) / (1 + it.vat / 100);
  it.profitPct = (it.raft - it.b2bGross) / it.b2bGross * 100;
  if (NUTRAFIT) {
    const k = 1 + it.vat / 100;
    it.raftF = Math.round(it.site * (1 + RAFT_PLUS_FINAL));      // raft final, cu TVA
    const raftNet = it.raftF / k;
    it.nf = Math.round(it.b2b + (raftNet - it.b2b) / 3);          // preț recomandat Nutrafit, fără TVA
    it.nfGross = it.nf * k;
    it.nfGain = it.nf - it.b2b; it.nfPct = it.nfGain / it.b2b * 100;
    it.shopGain = raftNet - it.nf; it.shopPct = it.shopGain / it.nf * 100;
    if (it.shopPct < 15) warnings.push(`Nutrafit: magazinul final rămâne sub 15 % la ${it.name} (${it.shopPct.toFixed(0)} %)`);
  }
  count++;
}
for (const w of warnings) console.warn("! " + w);

const card = it => `
    <article class="card">
      ${it.img ? `<div class="ph"><img loading="lazy" src="${esc(pic(img(it.img, 420), `produs-${it.handle}${it.variant ? "-" + it.variant : ""}.jpg`))}" alt="${esc(it.name)}"></div>` : `<div class="ph"></div>`}
      <div class="cb">
        <h4>${esc(it.name)}</h4>
        <p>${esc(it.blurb)}</p>
        ${NUTRAFIT
          ? `<div class="pr"><span class="lbl">B2B Prime</span> <b class="red">${lei0(it.b2b)} lei</b> <span class="sep">·</span> <span class="lbl">Nutrafit</span> <b>${lei0(it.nf)} lei</b> <small>fără TVA</small> <span class="sep">·</span> <span class="lbl">Raft</span> <b>${lei0(it.raftF)} lei</b></div>`
          : `<div class="pr"><span class="lbl">Preț site</span> <b>${lei0(it.site)} lei</b> <span class="sep">·</span> <span class="lbl">B2B</span> <b class="red">${lei0(it.b2b)} lei</b> <small>fără TVA</small></div>`}
      </div>
    </article>`;
const cards = groups.map(g => `
<section class="grp">
  <div class="keep"><h3>${esc(g.name)}</h3>
  <div class="cards">${g.items.slice(0, 4).map(card).join("")}</div></div>
  ${g.items.length > 4 ? `<div class="cards">${g.items.slice(4).map(card).join("")}</div>` : ""}
</section>`).join("");

const rows = groups.map(g => `<tr class="grp"><td colspan="8">${esc(g.name)}</td></tr>` + g.items.map(it => NUTRAFIT ? `
<tr>
  <td>${esc(it.name)}</td>
  <td class="num tva">${it.vat}%</td>
  <td class="num"><s>${lei0(it.site)}</s></td>
  <td class="num b">${lei0(it.b2b)}</td>
  <td class="num raft">${lei0(it.nf)}</td>
  <td class="num">${lei(it.nfGain)} <span class="tva">(${Math.round(it.nfPct)}%)</span></td>
  <td class="num raft">${lei0(it.raftF)}</td>
  <td class="num pct">${lei(it.shopGain)} <span class="tva">(${Math.round(it.shopPct)}%)</span></td>
</tr>` : `
<tr>
  <td>${esc(it.name)}</td>
  <td class="num tva">${it.vat}%</td>
  <td class="num"><s>${lei0(it.site)}</s></td>
  <td class="num b">${lei0(it.b2b)}</td>
  <td class="num">${lei(it.b2bGross)}</td>
  <td class="num raft">${lei0(it.raft)}</td>
  <td class="num">${lei(it.profitNet)}</td>
  <td class="num pct">${Math.round(it.profitPct)}%</td>
</tr>`).join("")).join("");

const html = `<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${NUTRAFIT ? "Portofoliu B2B Nutrafit – Prime Supplements" : "Portofoliu B2B – Prime Supplements"}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root { --red: #ec1e24; --black: #111; --grey: #666; --line: #e3e3e3; --bg: #f6f6f6; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #fff; color: var(--black); font-family: Poppins, "Segoe UI", Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.5; }
  img { display: block; max-width: 100%; }
  .page { max-width: 1120px; margin: 0 auto; padding: 0 20px 30px; }
  header { background: var(--black); color: #fff; padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; gap: 16px; border-bottom: 5px solid var(--red); border-radius: 0 0 6px 6px; }
  header img { height: 42px; width: auto; }
  header .meta { text-align: right; font-size: 11.5px; color: #ccc; line-height: 1.45; }
  header .meta b { color: #fff; }
  .hero { display: grid; grid-template-columns: 1.15fr 1fr; gap: 24px; align-items: center; margin: 26px 0 10px; }
  .hero img { width: 100%; height: 360px; object-fit: cover; border-radius: 8px; }
  .kicker { color: var(--red); text-transform: uppercase; letter-spacing: 2px; font-weight: 700; font-size: 11.5px; margin: 0 0 6px; }
  h1 { font-size: 30px; line-height: 1.15; margin: 0 0 12px; text-transform: uppercase; letter-spacing: .5px; }
  h1 span { color: var(--red); }
  .hero p { margin: 0 0 10px; font-size: 14px; }
  h2 { font-size: 20px; text-transform: uppercase; letter-spacing: 1px; margin: 34px 0 6px; padding-left: 12px; border-left: 5px solid var(--red); }
  .sub { color: var(--grey); margin: 0 0 14px; }
  .why { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 14px 0 6px; }
  .why div { background: var(--bg); border-top: 4px solid var(--red); padding: 12px 14px; border-radius: 0 0 6px 6px; }
  .why b { display: block; text-transform: uppercase; font-size: 11px; letter-spacing: .8px; color: var(--red); margin-bottom: 4px; }
  .arts { display: grid; grid-template-columns: 1fr; gap: 12px; }
  .art { display: grid; grid-template-columns: 220px 1fr; gap: 14px; align-items: start; border: 1px solid var(--line); border-radius: 8px; padding: 10px; }
  .art img { width: 220px; aspect-ratio: 16 / 10; object-fit: cover; border-radius: 6px; background: #eee; }
  .art h4 { margin: 0 0 4px; font-size: 14px; line-height: 1.3; }
  .art p { margin: 0 0 6px; font-size: 12px; color: #333; }
  .art a { font-size: 11px; color: var(--red); text-decoration: none; word-break: break-all; }
  .grp h3 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 22px 0 10px; color: var(--black); background: var(--bg); padding: 7px 12px; border-left: 4px solid var(--red); }
  .cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 12px; }
  .keep { break-inside: avoid; page-break-inside: avoid; }
  .card { border: 1px solid var(--line); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: #fff; }
  .card .ph { background: #f2f2f2; aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center; }
  .card .ph img { width: 100%; height: 100%; object-fit: contain; mix-blend-mode: multiply; }
  .card .cb { padding: 10px 12px 12px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
  .card h4 { margin: 0; font-size: 13px; line-height: 1.3; }
  .card p { margin: 0; font-size: 11.5px; color: #333; flex: 1; }
  .card .pr { font-size: 11.5px; border-top: 1px solid var(--line); padding-top: 7px; }
  .card .pr .lbl { color: var(--grey); text-transform: uppercase; font-size: 9.5px; letter-spacing: .5px; }
  .card .pr .sep { color: #bbb; margin: 0 4px; }
  .card .pr small { color: var(--grey); }
  .red { color: var(--red); }
  .cond { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px 18px; background: var(--bg); padding: 12px 16px; border-left: 4px solid var(--red); margin: 0 0 16px; border-radius: 0 6px 6px 0; }
  .cond div b { display: block; text-transform: uppercase; font-size: 10px; letter-spacing: .6px; color: var(--red); }
  table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
  thead th { background: var(--black); color: #fff; text-align: left; padding: 8px 8px; font-size: 10px; text-transform: uppercase; letter-spacing: .5px; vertical-align: bottom; line-height: 1.25; }
  thead th.num, td.num { text-align: right; white-space: nowrap; }
  tbody td { padding: 5px 8px; border-bottom: 1px solid var(--line); }
  tbody tr.grp td { background: #eee; font-weight: 700; text-transform: uppercase; font-size: 10.5px; letter-spacing: .5px; padding-top: 7px; }
  td.b { font-weight: 700; color: var(--red); }
  td.raft { font-weight: 600; }
  td.pct { font-weight: 700; }
  td.tva { color: var(--grey); font-size: 10.5px; }
  td s { color: var(--black); }
  .legend { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 18px; font-size: 11px; color: #333; margin: 12px 0 0; }
  .legend b { color: var(--black); }
  .note { margin-top: 10px; color: var(--grey); font-size: 10.5px; }
  footer { margin-top: 26px; background: var(--black); color: #ddd; padding: 14px 20px; font-size: 11.5px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; border-radius: 6px; }
  footer b { color: #fff; }
  @media print {
    @page { size: A4; margin: 9mm; }
    html, body { font-size: 10.5px; }
    .page { max-width: none; padding: 0; }
    header, footer, thead th, tr.grp td, .why div, .cond, .grp h3 { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .hero { grid-template-columns: 1fr 1fr; }
    .hero img { height: 250px; }
    .cards { grid-template-columns: repeat(4, 1fr); }
    .card, .art, .why div, tr { break-inside: avoid; page-break-inside: avoid; }
    .grp h3, h2 { break-after: avoid; page-break-after: avoid; }
    .card .ph img { mix-blend-mode: normal; }
    .card .ph { background: #fff; }
    /* imaginile vin deja decupate de pe CDN (crop=center), ca PDF-ul să păstreze JPEG-ul original */
    .hero img, .art img, .card .ph img { object-fit: fill; border-radius: 0; }
    .pb { break-before: page; page-break-before: always; }
    thead { display: table-header-group; }
    a { color: inherit; text-decoration: none; }
  }
  @media screen and (max-width: 900px) {
    .hero, .why, .cond { grid-template-columns: 1fr; }
    .hero img { height: 240px; }
    .art { grid-template-columns: 1fr; }
    .art img { width: 100%; }
    .cards { grid-template-columns: repeat(2, 1fr); }
    header { flex-direction: column; align-items: flex-start; }
    header .meta { text-align: left; }
    .legend { grid-template-columns: 1fr; }
  }
  @media screen and (max-width: 520px) { .cards { grid-template-columns: 1fr 1fr; } }
</style>
</head>
<body>
<div class="page">
  <header>
    <img src="${CDN}logo-site-alb.svg?v=1747640243" alt="Prime Supplements">
    <div class="meta"><b>PRIME SPORT SUPPLEMENTS SRL</b> · CUI 46260823<br>Cisnădie, Str. Ioan Virgil Ispas 17A, jud. Sibiu<br>0775 286 584 · contact@primesupplements.ro · primesupplements.ro</div>
  </header>

  <section class="hero">
    <img src="${IMGDIR}/hero.jpg" alt="Sportivă pregătindu-și micul dejun cu Prime Whey">
    <div>
      ${NUTRAFIT ? `<p class="kicker">Portofoliu de prezentare pentru ${esc(CLIENT.name)}</p>
      <h1>Produsele <span>Prime</span> pe platforma B2B Nutrafit</h1>
      <p>Prime Supplements este un brand românesc de suplimente sportive, din Sibiu. Produsele sunt fabricate în Uniunea Europeană și acoperă tot ce cere un client de sală sau de magazin: proteine, creatină, aminoacizi, pre-workout, arzătoare, vitamine și minerale, alimente funcționale și accesorii.</p>
      <p>Acest portofoliu este pregătit pentru <b>${esc(CLIENT.name)}</b> (CUI ${CLIENT.cui}, ${CLIENT.reg}; ${esc(CLIENT.addr)}), partener distribuitor care listează produsele Prime pe platforma sa B2B și le revinde sălilor, magazinelor și cabinetelor.</p>
      <p><b>${count} produse</b> în lista B2B · prețuri B2B Prime neschimbate · preț recomandat de revânzare pentru Nutrafit și preț de raft final pentru clienții Nutrafit, ca politică comercială comună.</p>`
      : `<p class="kicker">Portofoliu de prezentare pentru parteneri</p>
      <h1>Suplimente <span>Prime</span> pentru sala, magazinul sau cabinetul tău</h1>
      <p>Prime Supplements este un brand românesc de suplimente sportive, din Sibiu. Produsele sunt fabricate în Uniunea Europeană și acoperă tot ce cere un client de sală: proteine, creatină, aminoacizi, pre-workout, arzătoare, vitamine și minerale, alimente funcționale și accesorii.</p>
      <p>Vindem online pe primesupplements.ro și, prin agentul nostru de vânzări, sălilor de fitness, magazinelor și cabinetelor care vor un raft cu produse de calitate, marjă clară și livrare rapidă.</p>
      <p><b>${count} produse</b> în lista B2B · livrare Cargus în 1–2 zile lucrătoare · raft și materiale de prezentare gratuite pentru parteneri.</p>`}
    </div>
  </section>

  ${NUTRAFIT ? `<h2>Politica comercială pe trei niveluri de preț</h2>
  <div class="why">
    <div><b>1. Preț B2B Prime</b>Prețul la care Nutrafit cumpără de la Prime, fără TVA. Este aceeași listă B2B pe care o avem cu toți partenerii; nu se schimbă.</div>
    <div><b>2. Preț recomandat Nutrafit</b>Prețul la care Nutrafit revinde firmelor de pe platforma sa, fără TVA: prețul B2B Prime plus o treime din diferența până la prețul de raft final. Nutrafit păstrează astfel, de regulă, 8–17 % pe produs (mai puțin la unturi).</div>
    <div><b>3. Preț de raft final</b>Prețul cu TVA la care magazinul, sala sau cabinetul vinde consumatorului: prețul de pe primesupplements.ro + 5–6 %, rotunjit la leu. Firma care cumpără de la Nutrafit rămâne, de regulă, cu 15–30 % pe produs (mai puțin la unturi).</div>
    <div><b>De ce peste prețul de site</b>Site-ul Prime rămâne referința de preț pentru consumator; raftul partenerilor stă puțin peste el, ca nimeni din lanț să nu vândă sub site și fiecare verigă să aibă marja ei.</div>
    <div><b>Promoțiile de pe site</b>Reducerile temporare de pe primesupplements.ro nu schimbă prețul de raft recomandat; baza este întotdeauna prețul întreg (cel tăiat). Volumele mari, pachetele și hainele: la cerere.</div>
    <div><b>Brand vizibil</b>Peste 100 de articole de blog, rețele sociale active, ședințe foto profesionale și fișe de produs pe care Nutrafit le poate prelua pe platformă.</div>
  </div>`
  : `<h2>De ce Prime pentru afacerea ta</h2>
  <div class="why">
    <div><b>Marjă clară</b>Cumperi la prețul B2B, vinzi la prețul recomandat de raft (prețul de pe site + 2–3 %). Profitul fiecărui produs e în tabelul de la final.</div>
    <div><b>Raft și materiale gratuite</b>Stand/raft Prime, pliante, afișe și mostre pentru degustare, în limita stocului. Agentul vizitează lunar sălile partenere.</div>
    <div><b>Livrare rapidă</b>Comandă minimă 500 lei fără TVA; transport gratuit prin Cargus de la 1.000 lei fără TVA; livrare în 1–2 zile lucrătoare.</div>
    <div><b>Un singur furnizor</b>Peste 50 de produse, de la proteină și creatină la vitamine și batoane. Un raft complet dintr-o singură comandă.</div>
    <div><b>Brand vizibil</b>Site cu peste 100 de articole de blog, rețele sociale active, ședințe foto profesionale pe care le poți folosi în sală.</div>
    <div><b>Facturare simplă</b>Factură fiscală emisă de Prime Sport Supplements SRL (Oblio); avans sau ramburs la primele comenzi, apoi termen de plată de 14 zile.</div>
  </div>`}

  <h2>Din blogul Prime</h2>
  <p class="sub">Peste 100 de articole pe primesupplements.ro/blogs/news explică fiecare produs, doza și momentul administrării, doar cu mențiuni autorizate în UE. Partenerii pot trimite clienților linkul articolului în loc să explice ei la recepție. Câteva exemple:</p>
  <div class="arts">
    ${articole.map(([f, h, t, r], i) => `<article class="art"><img loading="lazy" src="${pic(ART + f + "&width=560&height=350&crop=center", `blog-${i}.jpg`)}" alt="${esc(t)}"><div><h4>${esc(t)}</h4><p>${esc(r)}</p><a href="https://primesupplements.ro/blogs/news/${h}">primesupplements.ro/blogs/news/${h}</a></div></article>`).join("\n    ")}
  </div>

  <h2>Produsele Prime</h2>
  <p class="sub">${count} produse din lista B2B, pe categorii. Prețul de site este prețul întreg de pe primesupplements.ro; prețul B2B este în lei, fără TVA.</p>
  ${cards}

  <h2 class="pb">${NUTRAFIT ? "Lista de prețuri B2B și politica de preț Nutrafit" : "Lista de prețuri B2B"}</h2>
  <p class="sub">Valabilă de la ____.____.2026 · prețuri în lei · prețul de site este prețul întreg (tăiat) de pe primesupplements.ro la ${DATA.split("-").reverse().join(".")} · cota de TVA este trecută la fiecare produs${NUTRAFIT ? " · prețurile B2B Prime și Nutrafit sunt fără TVA, prețul de raft final este cu TVA" : ""}</p>

  <div class="cond">
    <div><b>Comandă minimă</b>500 lei fără TVA</div>
    <div><b>Transport</b>Gratuit prin Cargus de la 1.000 lei fără TVA; sub acest prag, la cost</div>
    <div><b>Livrare</b>1–2 zile lucrătoare de la confirmare, în limita stocului</div>
    <div><b>Plată</b>Avans sau ramburs la primele 3 comenzi; apoi factură cu termen de 14 zile</div>
    <div><b>Facturare</b>Factură fiscală emisă de Prime Sport Supplements SRL (Oblio)</div>
    <div><b>Comenzi</b>Prin agent (telefon/WhatsApp) sau la contact@primesupplements.ro · 0775 286 584</div>
  </div>

  <table>
    <thead>
      ${NUTRAFIT ? `<tr>
        <th>Produs</th>
        <th class="num">TVA</th>
        <th class="num">Preț site<br>(cu TVA)</th>
        <th class="num">Preț B2B Prime<br>fără TVA</th>
        <th class="num">Preț recomandat<br>Nutrafit, fără TVA</th>
        <th class="num">Câștig Nutrafit<br>/ buc. (fără TVA)</th>
        <th class="num">Preț raft final<br>(cu TVA)</th>
        <th class="num">Câștig magazin<br>/ buc. (fără TVA)</th>
      </tr>` : `<tr>
        <th>Produs</th>
        <th class="num">TVA</th>
        <th class="num">Preț site<br>(cu TVA)</th>
        <th class="num">Preț B2B<br>fără TVA</th>
        <th class="num">Preț B2B<br>cu TVA</th>
        <th class="num">Preț recomandat<br>la raft (cu TVA)</th>
        <th class="num">Profit / buc.<br>(fără TVA)</th>
        <th class="num">Profit %</th>
      </tr>`}
    </thead>
    <tbody>${rows}
    </tbody>
  </table>

  ${NUTRAFIT ? `<div class="legend">
    <div><b>Preț site</b> – prețul întreg de pe primesupplements.ro (cel tăiat când produsul e la ofertă); referința pentru tot lanțul.</div>
    <div><b>Preț B2B Prime</b> – prețul la care Nutrafit cumpără de la Prime, fără TVA (cota din coloana TVA).</div>
    <div><b>Preț recomandat Nutrafit</b> – prețul de revânzare către firmele de pe platforma Nutrafit, fără TVA: B2B Prime + o treime din diferența până la raft. Câștigul Nutrafit = diferența față de B2B Prime, în lei și ca procent din prețul de achiziție.</div>
    <div><b>Preț raft final</b> – prețul de site + 5–6 %, rotunjit la leu, cu TVA, la care vinde magazinul sau sala. Câștigul magazinului = raftul fără TVA minus prețul Nutrafit, în lei și ca adaos la prețul de achiziție. Prețurile recomandate sunt orientative; fiecare firmă își stabilește liber prețul.</div>
  </div>` : `<div class="legend">
    <div><b>Preț site</b> – prețul întreg de pe primesupplements.ro (cel tăiat când produsul e la ofertă).</div>
    <div><b>Preț B2B</b> – prețul la care cumpără partenerul, fără și cu TVA (cota din coloana TVA).</div>
    <div><b>Preț recomandat la raft</b> – prețul de site + 2–3 %, rotunjit la leu. Partenerul își stabilește liber prețul de vânzare.</div>
    <div><b>Profit</b> – diferența dintre prețul de raft și prețul B2B, fără TVA, în lei pe bucată și ca procent din prețul de achiziție (adaos comercial).</div>
  </div>`}
  <p class="note">Prețuri pentru volume mari, îmbrăcăminte Prime și MNX, pachete și alte produse: la cerere, prin agent. Prețurile pot fi actualizate cu 15 zile înainte. Imaginile sunt orientative; aromele disponibile se confirmă la comandă.</p>

  <footer>
    <div><b>Comenzi B2B:</b> 0775 286 584 (și WhatsApp) · contact@primesupplements.ro</div>
    <div><b>Produs în Uniunea Europeană</b> · primesupplements.ro</div>
  </footer>
</div>
</body>
</html>`;

const out = new URL(NUTRAFIT ? `./PORTOFOLIU-B2B-NUTRAFIT-${DATA}.html` : `./PORTOFOLIU-B2B-${DATA}.html`, import.meta.url);
writeFileSync(out, "﻿" + html, "utf8");
writeFileSync(new URL("./data/portofoliu-imagini.json", import.meta.url), JSON.stringify(picList, null, 1));
console.log(`scris ${out.pathname} – ${count} produse, ${warnings.length} avertismente`);
