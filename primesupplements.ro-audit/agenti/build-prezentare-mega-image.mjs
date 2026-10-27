// Prezentarea brandului Prime Supplements pentru listare la Mega Image (deck 16:9, fără prețuri).
// Imagini: agenti/PREZENTARE-PRIME-MEGA-IMAGE-img/ (produse, ședințe foto, imagini AI, logo).
// Rulare: node agenti/build-prezentare-mega-image.mjs ; PDF: Chrome headless --print-to-pdf (vezi JURNAL 27.10.2026).
import { writeFileSync } from "node:fs";

const DATA = "2026-10-27";
const IMG = "PREZENTARE-PRIME-MEGA-IMAGE-img";
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const prod = (file, name, sub) => `<div class="cell"><div class="ph"><img src="${IMG}/produs-${file}.jpg" alt="${esc(name)}"></div><label>${esc(name)}</label>${sub ? `<small>${esc(sub)}</small>` : ""}</div>`;
const photo = (file, cls = "") => `<img class="photo ${cls}" src="${IMG}/${file}" alt="">`;
const logoW = `<img class="logo" src="${IMG}/logo-prime-alb.svg" alt="Prime Supplements">`;
const logoB = `<img class="logo" src="${IMG}/logo-prime.png" alt="Prime Supplements">`;

const slides = [
  // 1 Cover
  `<section class="slide cover">
    ${photo("sala-kettlebell.jpg", "full")}
    <div class="shade"></div>
    <div class="tl">${logoW}</div>
    <div class="cover-text">
      <p class="kicker">Prezentare de brand pentru Mega Image</p>
      <h1>Nutriție sportivă <span>din România</span>,<br>pentru fiecare zi.</h1>
      <p class="lead">Prime Supplements: proteine, creatină, batoane proteice și alimente funcționale, fabricate în Uniunea Europeană.</p>
    </div>
    <div class="foot">Prime Sport Supplements SRL · Sibiu · primesupplements.ro</div>
  </section>`,

  // 2 Cine suntem
  `<section class="slide split">
    <div class="col">${photo("ai-bucatarie.jpg", "tall")}</div>
    <div class="col text">
      <p class="kicker">Cine suntem</p>
      <h2>Un brand românesc de suplimente sportive, din Sibiu.</h2>
      <p>Prime Supplements s-a născut în sala de forță și a crescut online, pe primesupplements.ro, și în sălile de fitness din țară. Produsele sunt fabricate în Uniunea Europeană, cu etichete în limba română și doar cu mențiuni de sănătate autorizate în UE.</p>
      <ul class="facts">
        <li><b>55+</b> produse: proteine, creatină, aminoacizi, pre-workout, vitamine și minerale, alimente funcționale, accesorii</li>
        <li><b>100+</b> articole de blog care explică fiecare produs, doza și momentul administrării</li>
        <li><b>Săli partenere</b> cu raft Prime și agent de vânzări dedicat</li>
        <li><b>Comunitate</b> activă pe Instagram, Facebook, TikTok și YouTube</li>
      </ul>
    </div>
    <div class="foot">02 · Cine suntem</div>
  </section>`,

  // 3 Brand identity
  `<section class="slide split">
    <div class="col id">
      <div class="logobox">${logoW}</div>
      <div class="swatches">
        <div><i style="background:#111"></i>Negru<small>fundal premium, ambalaje</small></div>
        <div><i style="background:#ec1e24"></i>Roșu Prime<small>accent, energie</small></div>
        <div><i style="background:#fff;border:1px solid #ddd"></i>Alb<small>claritate, gama Prime Health</small></div>
        <div><i style="background:#2e7d32"></i>Verde<small>gama Prime Health (sănătate)</small></div>
      </div>
      <div class="type"><b>Aa</b><span>Poppins · titluri bold, majuscule, text curent regular. Aceeași familie pe site, e-mail și materiale de raft.</span></div>
    </div>
    <div class="col text">
      <p class="kicker">Brand identity</p>
      <h2>Direct, sportiv, de încredere.</h2>
      <h3>Poziționare</h3>
      <p>Suplimente de calitate europeană, explicate pe înțelesul tuturor, la un raport corect între calitate și accesibilitate. Pentru cei care fac sport și pentru cei care vor doar să mănânce mai bine.</p>
      <h3>Tone of voice</h3>
      <p>Vorbim clar, fără promisiuni goale: ce conține produsul, cât iei și când. Mențiuni de sănătate doar cele autorizate în UE.</p>
      <p class="kw">Performanță. Claritate. Accesibil.</p>
    </div>
    <div class="foot">03 · Brand identity</div>
  </section>`,

  // 4 Gama de bază
  `<section class="slide grid-page">
    <div class="head"><p class="kicker">Produse de bază</p><h2>Gama de bază: ce caută orice sportiv.</h2><p class="sub">Proteine, creatină, aminoacizi și pre-workout. Produsele cu care a pornit brandul și care se vând cel mai bine.</p></div>
    <div class="grid g4">
      ${prod("prime-whey-1000g", "Prime Whey", "concentrat proteic din zer, 7 arome")}
      ${prod("pure-isolate-2000g", "Pure Isolate", "izolat proteic din zer")}
      ${prod("creatina-creapure", "Creatină Creapure®", "creatină monohidrată, Germania")}
      ${prod("eaa-aminoacizi-esentiali", "EAA", "aminoacizi esențiali")}
      ${prod("nitrox", "Nitrox 3D", "pre-workout")}
      ${prod("emperor-mass_3000g", "Emperor Mass", "gainer cu 40 % proteină")}
      ${prod("recovery-bcaa-500g", "Recovery BCAA", "aminoacizi 4:1:1")}
      ${prod("creatina-monohidrat-micronized-300g-fara-aroma", "Creatină micronizată", "fără aromă, 300 g")}
    </div>
    <div class="foot">04 · Produse de bază</div>
  </section>`,

  // 5 În sală
  `<section class="slide trio">
    <div class="head"><p class="kicker">Brandul în acțiune</p><h2>Făcut în sală, testat de sportivi.</h2></div>
    <div class="three">
      ${photo("sala-ramat.jpg")}
      ${photo("sala-nostim.jpg")}
      ${photo("ai-sala.jpg")}
    </div>
    <p class="caption">Ședințe foto proprii, în săli partenere. Materiale disponibile pentru raft, afișe și comunicare în magazin.</p>
    <div class="foot">05 · Ședințe foto</div>
  </section>`,

  // 6 Formate mici
  `<section class="slide grid-page">
    <div class="head"><p class="kicker">Formate mici, gata de raft</p><h2>Porție unică, cumpărare de impuls.</h2><p class="sub">Produsele Prime gândite pentru raftul de lângă casă: plic, fiolă, baton. Se vând la bucată, nu cer explicații și intră în coș în drum spre casă.</p></div>
    <div class="grid g4">
      ${prod("prime-whey-go", "Prime Whey Go", "proteină la plic, 30 g")}
      ${prod("creatine-ready-to-go-plicuri-prime-supplements", "Creatină Ready To Go", "plic efervescent, 10 g")}
      ${prod("energy-pump", "Energy Pump Shot", "pre-workout lichid, fiolă 25 ml")}
      ${prod("fat-burning-booster", "Fat Burning Booster Shot", "fiolă 25 ml")}
      ${prod("baton-proteic-ciocolata-fructe-de-padure", "Prime Delicious Bar", "baton proteic, 55 g")}
      ${prod("daily-vitamin-formula", "Daily Vitamin Formula", "vitamine și minerale la plic")}
      ${prod("crema-de-orez-tort-de-ciocolata", "Creamy Rice", "cremă de orez, 1 kg")}
      ${prod("prime-shaker-customised", "Shaker Prime", "600 ml")}
    </div>
    <div class="foot">06 · Formate mici</div>
  </section>`,

  // 7 Formate mici lifestyle
  `<section class="slide duo">
    <div class="two">
      ${photo("batoane-fiole.jpg")}
      <div class="text">
        <p class="kicker">Formate mici</p>
        <h2>De la casa de marcat direct în geanta de sală.</h2>
        <p>Batoanele, fiolele și plicurile Prime au ambalaj individual, cod de bare pe fiecare bucată și termen de valabilitate lung. Se expun la raft, la casă sau în frigiderul de băuturi.</p>
        <p>Fiecare produs are pe primesupplements.ro o pagină cu compoziția completă și un articol de blog care explică folosirea.</p>
      </div>
    </div>
    <div class="foot">07 · Formate mici</div>
  </section>`,

  // 8 Batoane
  `<section class="slide bars">
    <div class="left">
      <p class="kicker">Batoane proteice & high-protein</p>
      <h2>Prime Delicious Bar: proteină la pachet.</h2>
      <p>Baton proteic de 55 g, în patru arome: căpșuni, caramel sărat, cocos și caramel, ciocolată și fructe de pădure. Gustarea pentru după antrenament, pentru birou sau pentru drum.</p>
      <div class="grid g4 small">
        ${prod("baton-proteic-capsuni", "Căpșuni")}
        ${prod("baton-proteic-caramel-sarat", "Caramel sărat")}
        ${prod("baton-proteic-cocos-si-caramel", "Cocos și caramel")}
        ${prod("baton-proteic-ciocolata-fructe-de-padure", "Ciocolată și fructe de pădure")}
      </div>
    </div>
    <div class="right">${photo("plaja-bar-1.jpg", "tall")}${photo("plaja-bar-5.jpg", "tall")}</div>
    <div class="foot">08 · Batoane proteice</div>
  </section>`,

  // 9 High-protein / alimentație conștientă
  `<section class="slide grid-page">
    <div class="head"><p class="kicker">High-protein și alimentație conștientă</p><h2>Micul dejun proteic, gata într-un minut.</h2><p class="sub">Alimente funcționale pentru cei care vor să mănânce mai bine, nu doar să se antreneze: cremă de orez, cremă de ovăz, unturi 100 % din nuci și semințe, fibre, vitamine.</p></div>
    <div class="grid g4">
      ${prod("crema-de-orez-tort-de-ciocolata", "Creamy Rice", "cremă de orez, 7 arome")}
      ${prod("instant-oat-cream-800g-25-serv", "Instant Oat Cream", "cremă de ovăz")}
      ${prod("unt-de-arahide", "Unt de arahide", "100 % arahide, Prime Health")}
      ${prod("unt-de-migdale", "Unt de migdale", "100 % migdale, Prime Health")}
      ${prod("fiber-blood-orange", "Fiber", "băutură cu fibre")}
      ${prod("vitamina-d3-k2", "Vitamina D3 + K2", "Prime Health")}
      ${prod("omega-3", "Omega-3", "ulei de pește")}
      ${prod("magneziu-bisglicinat-80-caps", "Magneziu bisglicinat", "Prime Health")}
    </div>
    <div class="foot">09 · High-protein și Prime Health</div>
  </section>`,

  // 10 Moodboard
  `<section class="slide mood">
    <div class="collage">
      <div class="big">${photo("exterior-whey.jpg")}</div>
      ${photo("ai-whey-duo.jpg")}${photo("plaja-capsule.jpg")}${photo("prime-health.jpg")}${photo("ai-urban.jpg")}${photo("plaja-shaker.jpg")}${photo("plaja-nitrox.jpg")}
    </div>
    <p class="kw center">Sport. Bucătărie. Cotidian. Comunitate.</p>
    <div class="foot">10 · Visual story</div>
  </section>`,

  // 11 De ce Prime la Mega Image
  `<section class="slide why-page">
    <div class="head"><p class="kicker">Parteneriat</p><h2>De ce Prime pe rafturile Mega Image.</h2></div>
    <div class="why">
      <div><b>Brand românesc, cu comunitate</b>Clienți care ne caută deja online și în săli; blogul și rețelele sociale aduc cererea spre raft.</div>
      <div><b>Gamă completă dintr-o sursă</b>De la baton și plic la proteină, creatină și vitamine: un raft de nutriție sportivă cu un singur furnizor.</div>
      <div><b>Formate de retail</b>Produse cu ambalaj individual, cod de bare, etichetă în română, termen lung. Gata de listare, fără adaptări.</div>
      <div><b>Suport de marketing</b>Ședințe foto profesionale, fișe de produs, articole de blog, campanii pe social media și materiale la raft.</div>
      <div><b>Logistică simplă</b>Stoc în Sibiu, livrare Cargus în 1–2 zile lucrătoare, facturare electronică, comenzi și reaprovizionare printr-o persoană dedicată.</div>
      <div><b>Conformitate</b>Produse fabricate în Uniunea Europeană, suplimente notificate, mențiuni de sănătate doar cele autorizate în UE.</div>
    </div>
    <div class="foot">11 · De ce Prime</div>
  </section>`,

  // 12 Propunere de sortiment
  `<section class="slide split">
    <div class="col text">
      <p class="kicker">Propunere de listare</p>
      <h2>Două trepte, un singur raft.</h2>
      <h3>Treapta 1 · raftul de impuls, lângă casă</h3>
      <ul class="list">
        <li>Prime Delicious Bar, 4 arome</li>
        <li>Prime Whey Go, plic 30 g</li>
        <li>Creatină Ready To Go, plic 10 g</li>
        <li>Energy Pump Shot și Fat Burning Booster Shot, fiole 25 ml</li>
        <li>Shaker Prime 600 ml</li>
      </ul>
      <h3>Treapta 2 · raftul de nutriție sportivă</h3>
      <ul class="list">
        <li>Prime Whey 1 kg, Creatină Creapure® 300 g</li>
        <li>Creamy Rice 1 kg, unt de arahide și de migdale</li>
        <li>Vitamina D3 + K2, Magneziu bisglicinat, Omega-3</li>
      </ul>
      <p class="small">Sortimentul se adaptează pe format de magazin; condițiile comerciale se discută separat.</p>
    </div>
    <div class="col">${photo("plaja-nitrox.jpg", "tall")}</div>
    <div class="foot">12 · Propunere de listare</div>
  </section>`,

  // 13 Închidere
  `<section class="slide cover end">
    ${photo("ai-urban.jpg", "full")}
    <div class="shade dark"></div>
    <div class="cover-text center">
      ${logoW}
      <h1>Hai să aducem nutriția sportivă<br><span>mai aproape de casă.</span></h1>
      <p class="lead">Marius Chera · Prime Sport Supplements SRL · Cisnădie, jud. Sibiu<br>0775 286 584 · contact@primesupplements.ro · primesupplements.ro</p>
    </div>
    <div class="foot">Produs în Uniunea Europeană · CUI 46260823</div>
  </section>`,
];

const html = `<!doctype html>
<html lang="ro"><head><meta charset="utf-8">
<title>Prime Supplements – prezentare de brand pentru Mega Image</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
<style>
  :root { --red: #ec1e24; --ink: #111; --grey: #666; --line: #e6e6e6; --bg: #f5f5f5; }
  * { box-sizing: border-box; }
  html, body { margin: 0; background: #fff; color: var(--ink); font-family: Poppins, "Segoe UI", Arial, sans-serif; }
  img { display: block; }
  .slide { position: relative; width: 297mm; height: 167mm; overflow: hidden; background: #fff; padding: 13mm 16mm 12mm; break-after: page; page-break-after: always; }
  .slide:last-child { break-after: auto; page-break-after: auto; }
  .foot { position: absolute; left: 16mm; bottom: 5mm; font-size: 8pt; color: #9a9a9a; letter-spacing: .3px; }
  .cover .foot { color: rgba(255,255,255,.8); }
  .kicker { color: var(--red); text-transform: uppercase; letter-spacing: 2px; font-weight: 700; font-size: 9pt; margin: 0 0 3mm; }
  h1 { font-size: 32pt; line-height: 1.1; margin: 0 0 5mm; font-weight: 800; letter-spacing: -.3px; }
  h1 span { color: var(--red); }
  h2 { font-size: 24pt; line-height: 1.12; margin: 0 0 3mm; font-weight: 800; }
  h3 { font-size: 9pt; text-transform: uppercase; letter-spacing: 1.5px; color: var(--red); margin: 6mm 0 1.5mm; }
  p { font-size: 11pt; line-height: 1.5; margin: 0 0 2.5mm; color: #333; }
  p.sub { color: var(--grey); max-width: 230mm; }
  p.small { font-size: 9pt; color: var(--grey); margin-top: 5mm; }
  .lead { font-size: 13pt; font-weight: 300; }
  .kw { font-size: 15pt; font-weight: 700; color: var(--ink); margin-top: 5mm; }
  .kw.center { text-align: center; margin-top: 4mm; }
  .head { margin-bottom: 5mm; }
  .photo { object-fit: cover; width: 100%; height: 100%; border-radius: 3mm; }
  .photo.full { position: absolute; inset: 0; width: 100%; height: 100%; border-radius: 0; }
  .shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.35) 55%, rgba(0,0,0,.1) 100%); }
  .shade.dark { background: rgba(0,0,0,.6); }
  .logo { height: 14mm; width: auto; }
  .tl { position: absolute; left: 16mm; top: 13mm; }
  .cover-text { position: absolute; left: 16mm; bottom: 22mm; max-width: 175mm; color: #fff; }
  .cover-text h1, .cover-text p { color: #fff; }
  .cover-text .kicker { color: #ff6b6f; }
  .cover-text.center { left: 0; right: 0; top: 50%; bottom: auto; transform: translateY(-50%); text-align: center; max-width: none; display: flex; flex-direction: column; align-items: center; }
  .cover-text.center .logo { height: 16mm; margin-bottom: 8mm; }
  .end h1 { font-size: 30pt; }
  /* split */
  .split { display: grid; grid-template-columns: 1fr 1.15fr; gap: 12mm; }
  .col { min-height: 0; height: 128mm; }
  .col.text { display: flex; flex-direction: column; justify-content: center; }
  .col.id { display: flex; flex-direction: column; justify-content: center; gap: 7mm; }
  .photo.tall { height: 100%; }
  .facts { list-style: none; padding: 0; margin: 4mm 0 0; }
  .facts li { font-size: 10.5pt; margin-bottom: 2.5mm; padding-left: 6mm; position: relative; color: #333; }
  .facts li::before { content: ""; position: absolute; left: 0; top: 2mm; width: 3mm; height: 3mm; background: var(--red); border-radius: 50%; }
  .facts b { color: var(--ink); }
  .list { margin: 0; padding-left: 5mm; }
  .list li { font-size: 10.5pt; margin-bottom: 1.5mm; color: #333; }
  .logobox { background: var(--ink); padding: 8mm; border-radius: 3mm; display: flex; justify-content: center; }
  .logobox .logo { height: 18mm; }
  .swatches { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; }
  .swatches div { display: flex; flex-direction: column; font-size: 10pt; font-weight: 600; }
  .swatches i { width: 12mm; height: 12mm; border-radius: 50%; display: block; margin-bottom: 1.5mm; }
  .swatches small { font-weight: 400; color: var(--grey); font-size: 8.5pt; }
  .type { display: flex; align-items: center; gap: 6mm; border-top: 1px solid var(--line); padding-top: 4mm; }
  .type b { font-size: 32pt; font-weight: 800; }
  .type span { font-size: 9pt; color: var(--grey); line-height: 1.4; }
  /* grids */
  .grid { display: grid; gap: 5mm; }
  .grid.g4 { grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(2, 1fr); height: 104mm; }
  .grid.g4.small { height: 42mm; grid-template-rows: 1fr; margin-top: 5mm; }
  .cell { display: flex; flex-direction: column; min-height: 0; }
  .cell .ph { flex: 1; min-height: 0; background: var(--bg); border-radius: 3mm; display: flex; align-items: center; justify-content: center; padding: 3mm; }
  .cell .ph img { max-width: 100%; max-height: 100%; width: auto; height: 100%; object-fit: contain; mix-blend-mode: multiply; }
  .cell label { font-size: 9.5pt; text-align: center; margin-top: 1.5mm; font-weight: 700; line-height: 1.2; }
  .cell small { font-size: 8pt; color: var(--grey); text-align: center; }
  /* trio / duo */
  .three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5mm; height: 96mm; }
  .caption { font-size: 9.5pt; color: var(--grey); margin-top: 4mm; }
  .two { display: grid; grid-template-columns: 1.2fr 1fr; gap: 12mm; height: 132mm; }
  .two .text { display: flex; flex-direction: column; justify-content: center; }
  .bars { display: grid; grid-template-columns: 1.35fr 1fr; gap: 10mm; }
  .bars .right { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; height: 132mm; }
  .bars .left { display: flex; flex-direction: column; justify-content: center; }
  /* moodboard */
  .collage { display: grid; grid-template-columns: 1.5fr 1fr 1fr; grid-template-rows: repeat(3, 36mm); gap: 4mm; }
  .collage .big { grid-row: 1 / 4; height: 116mm; }
  .collage .big .photo { height: 100%; }
  .collage > .photo { height: 36mm; }
  /* why */
  .why { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5mm; }
  .why div { background: var(--bg); border-top: 3px solid var(--red); padding: 5mm 6mm; border-radius: 0 0 3mm 3mm; font-size: 10pt; line-height: 1.45; color: #333; min-height: 46mm; }
  .why b { display: block; text-transform: uppercase; font-size: 9pt; letter-spacing: .8px; color: var(--ink); margin-bottom: 2mm; }
  @media print { @page { size: 297mm 167mm; margin: 0; } * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .cell .ph img { mix-blend-mode: normal; } .cell .ph { background: #fff; border: 1px solid var(--line); } }
  @media screen { body { background: #777; padding: 10mm; } .slide { margin: 0 auto 10mm; box-shadow: 0 4px 24px rgba(0,0,0,.3); } }
</style></head>
<body>
${slides.join("\n")}
<script>
  // ?slide=N: afișează doar slide-ul N (pentru capturi de verificare cu Chrome headless --screenshot)
  const n = +new URLSearchParams(location.search).get("slide");
  if (n) { document.body.style.cssText = "background:#fff;padding:0;margin:0"; document.querySelectorAll(".slide").forEach((s, i) => { if (i + 1 !== n) s.remove(); else s.style.margin = "0"; }); }
</script>
</body></html>`;

writeFileSync(new URL(`./PREZENTARE-PRIME-MEGA-IMAGE-${DATA}.html`, import.meta.url), "﻿" + html, "utf8");
console.log("scris, slide-uri:", slides.length);
