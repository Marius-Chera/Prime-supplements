// Prezentarea lui Marius Chera – fondator și CEO Prime Supplements, antrenor, fost sportiv (26.11.2026, cerută de Marius).
// Surse: pagina de autor aprobată (backups/pagina-autor-2026-10-23), Turnul Sfatului 16.06 și 10.07.2016, NovaTV Mediaș 06.2016,
//        UN PODCAST ep. 105 (2025), bio-urile lui de Instagram (10 IFBB Pro, 223 locuri 1, 26 locuri 1 NPC Pro Qualifiers), datele firmei din SAGA/Prime Afiliați.
// NU se scrie „sportiv IFBB Pro” despre Marius (cele 10 carduri sunt ale sportivilor lui) și nici „nutriționist certificat”.
// Pozele: doar decupaje cu Marius singur (agenti/prezentare-marius-chera-img), fără sportivii de lângă el.
// Rulare: node agenti/build-prezentare-marius-chera.mjs → HTML; PDF cu Chrome headless.
import { readFileSync, writeFileSync } from "node:fs";

const DATA = "2026-11-26";
const nat = readFileSync(new URL(`./PORTOFOLIU-PRIME-NATIONAL-${DATA}.html`, import.meta.url), "utf8");
const style = nat.match(/<style>[\s\S]*?<\/style>/)[0];
const P = JSON.parse(readFileSync(new URL(`./data/parteneri-pj-${DATA}.json`, import.meta.url), "utf8"));
const S = JSON.parse(readFileSync(new URL(`./data/sportivi-afiliati-${DATA}.json`, import.meta.url), "utf8"));
const IMG = "prezentare-marius-chera-img";
const LOGO = `PORTOFOLIU-NATIONAL-${DATA}-img/logo-prime-alb.svg`;
const head = (n, t) => `<div class="ph"><span>${t}</span><span>${String(n).padStart(2, "0")}</span></div>`;
const judete = Object.keys(P.firme_pe_judet).length;

const rezultate = [
  ["2012", "Pro Nutrition Grand Prix România", "juniori 80 kg", "locul 10"],
  ["2013", "Pro Nutrition Grand Prix România", "juniori 80 kg", "locul 2"],
  ["2014", "Campionatul Național de Culturism pentru Juniori", "+80 kg și open", "campion absolut"],
  ["2014", "Tiger Classic România", "open seniori 85 kg", "campion absolut"],
  ["2015", "Arnold Amateur Europe", "culturism juniori", "locul 2"],
  ["2016", "Mr. Olympia Amateur Spania, Marbella", "culturism până la 90 kg", "locul 2"],
];

const extra = `<style>
  .cover .bgimg { object-position:40% 18%; opacity:.7; }
  .res { width:100%; border-collapse:collapse; margin-top:4mm; font-size:11px; }
  .res td { padding:7px 8px; border-bottom:1px solid var(--line); }
  .res td.y { font-weight:900; color:var(--red); font-size:15px; width:16mm; }
  .res td.p { font-weight:800; text-transform:uppercase; text-align:right; white-space:nowrap; }
  .res tr.g td.p { color:var(--red); }
  .quote { background:var(--black); color:#fff; padding:7mm 8mm; border-left:5px solid var(--red); font-size:20px; font-weight:800; line-height:1.25; text-transform:uppercase; margin-top:5mm; }
  .quote small { display:block; font-size:10px; font-weight:500; text-transform:none; color:#bbb; margin-top:3mm; letter-spacing:.3px; }
  .kpi { display:grid; grid-template-columns:repeat(3,1fr); gap:3mm; margin:4mm 0; }
  .kpi div { background:var(--black); color:#fff; padding:9px 11px; border-bottom:3px solid var(--red); }
  .kpi b { display:block; font-size:30px; font-weight:900; line-height:1; }
  .kpi span { font-size:9px; text-transform:uppercase; letter-spacing:.8px; color:#cfcfcf; }
  .roles { display:grid; grid-template-columns:1fr 1fr; gap:3mm 6mm; margin-top:4mm; }
  .roles div { border-left:3px solid var(--red); padding:2px 0 2px 10px; font-size:10.5px; }
  .roles b { display:block; text-transform:uppercase; font-size:11px; }
</style>`;

const html = `<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Marius Chera – fondator și CEO Prime Supplements</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
${style}
${extra}
</head>
<body>

<!-- 1. COPERTĂ -->
<section class="page cover">
  <img class="bgimg" src="${IMG}/marius-praga-prime.jpg" alt="">
  <div class="shade"></div>
  <div class="top"><img class="logo" src="${LOGO}" alt="Prime Supplements"><small>Profil<br>${DATA.split("-").reverse().join(".")}</small></div>
  <div class="bottom">
    <p class="kick">Fondator și CEO · Prime Supplements</p>
    <h1>Marius<br><span>Chera</span></h1>
    <p class="sub">Fost sportiv de performanță, antrenor de culturism și omul care a construit Prime Supplements: de la sala din Sibiu la ${P.firme_total} de firme partenere în ${judete} de județe.</p>
    <div class="stats">
      <div><b>2009</b><span>primul antrenament de culturism</span></div>
      <div><b>2016</b><span>vicecampion Mr. Olympia Amateur Spania</span></div>
      <div><b>10</b><span>carduri IFBB Pro obținute de sportivii lui</span></div>
      <div><b>2022</b><span>fondează Prime Supplements</span></div>
    </div>
  </div>
</section>

<!-- 2. SPORTIVUL -->
<section class="page">
  ${head(2, "Marius Chera · Sportivul")}
  <div class="two" style="grid-template-columns:1.25fr 1fr">
    <div>
      <p class="kick">Parcursul sportiv</p>
      <h2>De la 60 la 100 kg<br><span>și pe podium în Europa</span></h2>
      <p class="lead">Marius a crescut în Sibiu și a jucat baschet la juniorii CSU Sibiu în liceu. La 17 ani, în februarie 2009, a intrat pentru prima dată într-o sală de forță, cu în jur de 60 kg. Câțiva ani mai târziu urca pe scenă cu aproape 100 kg de mușchi, iar presa din Sibiu îl numea „Hulk din Sibiu”.</p>
      <p>A concurat cinci sezoane, între 2012 și 2016, la nivel național și internațional, pentru Power Gym Mediaș. Pentru Mr. Olympia Amateur 2016 s-a pregătit cu antrenorul elvețian Patrick Tuor și, la primul lui concurs la seniori, a terminat pe locul 2.</p>
      <table class="res">${rezultate.map(([y, c, k, p]) => `<tr class="${/campion|locul 2/.test(p) ? "g" : ""}"><td class="y">${y}</td><td><b>${c}</b><br><span style="color:var(--grey)">${k}</span></td><td class="p">${p}</td></tr>`).join("")}</table>
      <p class="note">Absolvent al Universității „Lucian Blaga” din Sibiu.</p>
    </div>
    <div>
      <img class="photo" style="height:200mm;object-position:50% 20%" src="${IMG}/marius-empro.jpg" alt="Marius Chera">
    </div>
  </div>
  <div class="kpi" style="grid-template-columns:repeat(4,1fr);margin-top:6mm">
    <div><b>5</b><span>sezoane de concurs (2012–2016)</span></div>
    <div><b>2</b><span>titluri de campion absolut (2014)</span></div>
    <div><b>2</b><span>podiumuri internaționale</span></div>
    <div><b>~100 kg</b><span>pe scenă, pornind de la 60 kg</span></div>
  </div>
  <div class="pf"><span>Surse: Turnul Sfatului (16.06 și 10.07.2016), NovaTV Mediaș (06.2016), primesupplements.ro</span><span>primesupplements.ro</span></div>
</section>

<!-- 3. ANTRENORUL -->
<section class="page">
  ${head(3, "Marius Chera · Antrenorul")}
  <div class="two" style="grid-template-columns:1fr 1.2fr">
    <div>
      <img class="photo" style="height:228mm;object-position:40% 15%" src="${IMG}/marius-pro-card-scena.jpg" alt="Marius Chera pe scenă la Romania Muscle Fest, cu un card IFBB Pro">
    </div>
    <div>
      <p class="kick">Antrenor de culturism</p>
      <h2>Unul dintre cele mai mari<br><span>echipe de culturism din România</span></h2>
      <p class="lead">După anii de concurs, Marius s-a dedicat pregătirii sportivilor. Lucrează cu culturiști și competitoare de fitness la toate nivelurile, de la primul concurs până la etapele internaționale, în sală și online: plan de antrenament, plan alimentar, ajustări săptămânale și pregătirea pentru scenă.</p>
      <div class="kpi">
        <div><b>10</b><span>carduri IFBB Pro</span></div>
        <div><b>223</b><span>locuri 1 în concursuri</span></div>
        <div><b>26</b><span>locuri 1 la NPC Pro Qualifiers</span></div>
      </div>
      <p>Sportivi pregătiți de el au obținut carduri PRO în organizația NPC (IFBB Pro League), titluri europene și mondiale. Mulți dintre ei sunt astăzi și în echipa de sportivi Prime Supplements.</p>
      <p>Este lector la cursurile de instructori din cadrul Federației Române de Culturism și Fitness (FRCF), unde predă viitorilor antrenori bazele pregătirii în culturism și fitness.</p>
      <div class="quote">„M-au desconsiderat.<br>Am răspuns cu <span style="color:var(--red)">10 carduri IFBB Pro</span>.”<small>Marius Chera</small></div>
    </div>
  </div>
  <div class="pf"><span>Cifrele echipei: bio-urile oficiale ale lui Marius Chera și ale echipei lui, noiembrie 2026</span><span>primesupplements.ro</span></div>
</section>

<!-- 4. CEO -->
<section class="page">
  ${head(4, "Marius Chera · CEO Prime Supplements")}
  <p class="kick">Antreprenorul</p>
  <h2>Prime Supplements: <span>din sală, pentru sală</span></h2>
  <p class="lead">În 2022 Marius a fondat PRIME SPORT SUPPLEMENTS SRL, la Cisnădie, lângă Sibiu, pornind de la ce cereau zilnic sportivii lui și clienții sălilor. Astăzi Prime Supplements este un brand românesc de nutriție sportivă, cu o echipă care se ocupă de produse, etichete, depozit, livrări și relația cu clienții.</p>
  <div class="kpi" style="grid-template-columns:repeat(4,1fr)">
    <div><b>${P.firme_total}</b><span>firme partenere B2B</span></div>
    <div><b>${judete}</b><span>județe cu parteneri</span></div>
    <div><b>${S.total_activi}</b><span>afiliați activi</span></div>
    <div><b>50+</b><span>produse proprii</span></div>
  </div>
  <div class="roles">
    <div><b>Produse și formule</b>Alege formulele și ingredientele cu nume verificabile (Creapure®, Kyowa®, KSM-66®, Cluster Dextrin®) și testează fiecare produs în sală.</div>
    <div><b>Rețeaua de săli</b>Prime Supplements e prezent în lanțuri ca Stay Fit Gym, Downtown Fitness, SAS Gym, Gym One, 18GYM și Oxygen Gym.</div>
    <div><b>Sport de performanță</b>Parteneriate cu CS Rapid București, CSU Sibiu și Dinamo București (baschet); cluburi precum FC Hermannstadt și CSU Oradea își aprovizionează sportivii cu Prime Supplements; sponsor Platinum la Valahia Warriors (NPC).</div>
    <div><b>Educație</b>Coordonează ghidurile de pe blogul primesupplements.ro, partea de antrenament și nutriție sportivă, doar cu mențiuni de sănătate autorizate în UE.</div>
    <div><b>Sportivi parteneri</b>Programul propriu Prime Afiliați, cu ${S.total_activi} de sportivi, antrenori și creatori activi.</div>
    <div><b>Digital</b>Magazin online, aplicații proprii pentru afiliați și fidelizare (Prime Puncte), prezență pe Instagram, TikTok, Pinterest și Google.</div>
  </div>
  <div class="strip" style="margin-top:5mm">
    <img src="PORTOFOLIU-NATIONAL-${DATA}-img/produse-prime-whey-1.jpg" alt="Prime Whey">
    <img src="PORTOFOLIU-NATIONAL-${DATA}-img/cluster-1.jpg" style="object-position:55% 25%" alt="Sportivă cu Cluster Bomb">
    <img src="PORTOFOLIU-NATIONAL-${DATA}-img/batoane-fiole.jpg" alt="Batoane și shot-uri Prime Supplements">
  </div>
  <div class="pf"><span>PRIME SPORT SUPPLEMENTS SRL · CUI 46260823 · J32/1155/2022</span><span>primesupplements.ro</span></div>
</section>

<!-- 5. CONTACT -->
<section class="page contact">
  <img class="bgimg" src="${IMG}/marius-pro-card-scena.jpg" style="object-position:40% 20%" alt="">
  <div class="shade"></div>
  <div class="in">
    <img class="logo" src="${LOGO}" alt="Prime Supplements">
    <p class="kick">Marius Chera · Fondator și CEO</p>
    <h1>Din sală,<br><span>pentru sală.</span></h1>
    <div class="cgrid">
      <div><b>Prime Supplements</b>contact@primesupplements.ro<br>0775 286 584</div>
      <div><b>Online</b>primesupplements.ro<br>Instagram @marius.chera</div>
      <div><b>Firma</b>PRIME SPORT SUPPLEMENTS SRL<br>CUI 46260823 · Cisnădie, jud. Sibiu</div>
    </div>
  </div>
</section>

</body>
</html>`;

const out = new URL(`./PREZENTARE-MARIUS-CHERA-CEO-${DATA}.html`, import.meta.url);
writeFileSync(out, "﻿" + html, "utf8");
console.log(`scris ${out.pathname}`);
