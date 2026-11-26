// Prezentarea sportivilor Prime Supplements (26.11.2026, cerută de Marius).
// Date: agenti/data/sportivi-afiliati-2026-11-26.json (afiliații activi din Prime Afiliați, doar nume, ordonați după comenzi).
// Stilul vine din portofoliul național (același <style>), ca cele două PDF-uri să arate la fel.
// Reguli: fără Suci Lucian (pleacă), fără cadre cu bărbați neidentificați; numărul total de afiliați apare la cererea expresă a lui Marius (26.11).
// Rulare: node agenti/build-prezentare-sportivi.mjs → HTML; PDF cu Chrome headless (vezi JURNAL 26.11).
import { readFileSync, writeFileSync } from "node:fs";

const DATA = "2026-11-26";
const S = JSON.parse(readFileSync(new URL(`./data/sportivi-afiliati-${DATA}.json`, import.meta.url), "utf8"));
const nat = readFileSync(new URL(`./PORTOFOLIU-PRIME-NATIONAL-${DATA}.html`, import.meta.url), "utf8");
const style = nat.match(/<style>[\s\S]*?<\/style>/)[0];
const IMG = `PORTOFOLIU-NATIONAL-${DATA}-img`;
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const nume = S.nume.filter(n => !/suci/i.test(n));
const total = nume.length;
const top = nume.slice(0, 12);
const alfabetic = [...nume].sort((a, b) => a.localeCompare(b, "ro"));
const head = (n, t) => `<div class="ph"><span>${t}</span><span>${String(n).padStart(2, "0")}</span></div>`;
const logo = `<img class="logo" src="${IMG}/logo-prime-alb.svg" alt="Prime Supplements">`;

const extra = `<style>
  .strip3 img { height:72mm !important; }
  .big { font-size:120px; font-weight:900; line-height:.9; color:var(--red); }
  .toplist { display:grid; grid-template-columns:repeat(3,1fr); gap:3mm; margin-top:4mm; }
  .toplist div { background:var(--black); color:#fff; padding:10px 12px; border-bottom:3px solid var(--red); display:flex; gap:10px; align-items:center; }
  .toplist i { font-style:normal; font-size:22px; font-weight:900; color:var(--red); width:9mm; }
  .toplist b { font-size:12.5px; text-transform:uppercase; line-height:1.2; }
  .names { columns:3; column-gap:6mm; font-size:12px; margin-top:5mm; }
  .names div { break-inside:avoid; padding:3px 0 3px 8px; border-left:2px solid var(--red); margin-bottom:2.6mm; line-height:1.25; }
  .steps { display:grid; grid-template-columns:repeat(4,1fr); gap:3mm; margin-top:4mm; }
  .steps div { border-top:4px solid var(--red); background:var(--bg); padding:9px 11px; font-size:10px; }
  .steps b { display:block; font-size:20px; font-weight:900; color:var(--red); line-height:1.1; }
  .steps strong { display:block; text-transform:uppercase; font-size:10.5px; margin-bottom:2px; }
  .hero3 { display:grid; grid-template-columns:1.25fr 1fr; gap:4mm; margin-top:4mm; }
  .hero3 figure { margin:0; background:var(--black); color:#fff; }
  .hero3 img { width:100%; object-fit:cover; display:block; }
  .hero3 figcaption { padding:8px 11px 10px; border-top:3px solid var(--red); }
  .hero3 figcaption b { display:block; font-size:15px; text-transform:uppercase; }
  .hero3 figcaption span { font-size:10px; color:#ccc; }
</style>`;

const html = `<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sportivii Prime Supplements – echipa de parteneri 2026</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
${style}
${extra}
</head>
<body>

<!-- 1. COPERTĂ -->
<section class="page cover">
  <img class="bgimg" src="${IMG}/cluster-1.jpg" style="object-position:58% 30%" alt="">
  <div class="shade"></div>
  <div class="top">${logo}<small>Echipa de sportivi<br>${DATA.split("-").reverse().join(".")}</small></div>
  <div class="bottom">
    <p class="kick">Sportivii și creatorii care recomandă Prime Supplements</p>
    <h1>Echipa<br><span>Prime Supplements</span></h1>
    <p class="sub">Culturiști, competitori de fitness, antrenori personali și creatori de conținut din toată țara, care folosesc zilnic produsele noastre și le recomandă comunităților lor.</p>
    <div class="stats">
      <div><b>${total}</b><span>afiliați activi</span></div>
      <div><b>3</b><span>sportivi în ședințele foto 2026</span></div>
      <div><b>10</b><span>carduri IFBB Pro obținute de sportivii pregătiți de fondator</span></div>
      <div><b>10%</b><span>reducere cu codul fiecărui sportiv</span></div>
    </div>
  </div>
</section>

<!-- 2. FEȚELE BRANDULUI -->
<section class="page">
  ${head(2, "Fețele brandului")}
  <p class="kick">Sportivii din campaniile Prime Supplements</p>
  <h2>Antrenați zilnic, <span>fotografiați în sală</span></h2>
  <p class="lead">Sportivii care apar în ședințele foto și în campaniile Prime Supplements din 2026.</p>
  <div class="hero3">
    <figure><img src="${IMG}/crema-de-orez-3.jpg" style="height:172mm;object-position:50% 25%" alt="Mihai Diaconu cu Creamy Rice"><figcaption><b>Mihai Diaconu</b><span>Culturism · fața campaniei Creamy Rice</span></figcaption></figure>
    <div style="display:grid;gap:4mm">
      <figure><img src="${IMG}/cluster-1.jpg" style="height:77mm;object-position:55% 25%" alt="Ana Savici cu Cluster Bomb"><figcaption><b>Ana Savici</b><span>Fitness · ședința foto Prime Supplements 2026</span></figcaption></figure>
      <figure><img src="${IMG}/nitrox-no-stim-5.jpg" style="height:77mm" alt="Paula Adelina Chera cu Nitrox"><figcaption><b>Paula Adelina Chera</b><span>Fitness · Evo Gym Sibiu</span></figcaption></figure>
    </div>
  </div>
  <div class="founder">
    <img src="${IMG}/logo-prime-alb.svg" alt="" style="width:100%;max-width:52mm">
    <div><span class="r">Fondator și antrenor</span><b>Marius Chera</b>Fost sportiv de performanță (vicecampion la Mr. Olympia Amateur Spania 2016, până la 90 kg) și antrenor de culturism, în culturism din 2009; lector la cursurile de instructori ale Federației Române de Culturism și Fitness. Sportivi pregătiți de el au obținut carduri PRO în organizația NPC și titluri europene și mondiale IFBB. Fiecare produs Prime Supplements trece mai întâi prin sala lui.</div>
  </div>
  <div class="pf"><span>Sportivii apar cu acordul lor, în baza colaborării cu Prime Supplements.</span><span>primesupplements.ro</span></div>
</section>

<!-- 3. PROGRAMUL DE AFILIERE -->
<section class="page">
  ${head(3, "Programul de afiliere")}
  <p class="kick">Prime Afiliați</p>
  <div class="two" style="grid-template-columns:auto 1fr;gap:8mm;align-items:center">
    <div class="big">${total}</div>
    <div><h2 style="margin:0">de afiliați <span>activi</span></h2><p class="lead" style="margin:4px 0 0">sportivi, antrenori și creatori care recomandă Prime Supplements cu codul lor personal, la 26 noiembrie 2026.</p></div>
  </div>
  <div class="steps">
    <div><b>1</b><strong>Cod personal</strong>Fiecare sportiv are un cod unic; clienții lui primesc 10% reducere pe primesupplements.ro.</div>
    <div><b>2</b><strong>Comision</strong>Pentru fiecare comandă livrată cu codul lui, sportivul primește comision.</div>
    <div><b>3</b><strong>Aplicație proprie</strong>Comenzile, comisionul și materialele de promovare se văd în contul de afiliat Prime Afiliați.</div>
    <div><b>4</b><strong>Contract</strong>Colaborare pe bază de contract, pentru persoane fizice, PFA și firme.</div>
  </div>
  <h3 style="margin-top:7mm">Cei mai activi parteneri</h3>
  <p class="sub" style="color:var(--grey);margin:0">Ordonați după numărul de comenzi aduse prin codul personal.</p>
  <div class="toplist">${top.map((n, i) => `<div><i>${i + 1}</i><b>${esc(n)}</b></div>`).join("")}</div>
  <div class="strip strip3" style="margin-top:6mm">
    <img src="${IMG}/sportiva-instant-oats-prime-health-1.jpg" alt="Sportivă cu Instant Oats Prime Supplements">
    <img src="${IMG}/shaker-prime-1.jpg" alt="Shaker Prime Supplements">
    <img src="${IMG}/crema-de-orez-1.jpg" alt="Mihai Diaconu cu Creamy Rice">
  </div>
  <div class="pf"><span>Sursa: aplicația Prime Afiliați, afiliați activi la 26.11.2026</span><span>primesupplements.ro</span></div>
</section>

<!-- 4. TOȚI SPORTIVII -->
<section class="page">
  ${head(4, "Echipa completă")}
  <p class="kick">Toți afiliații activi</p>
  <h2>${total} de oameni care <span>recomandă Prime Supplements</span></h2>
  <p class="lead">În ordine alfabetică.</p>
  <div class="names">${alfabetic.map(n => `<div>${esc(n)}</div>`).join("")}</div>
  <div class="pf"><span>Lista afiliaților activi din Prime Afiliați, 26.11.2026</span><span>primesupplements.ro</span></div>
</section>

<!-- 5. CONTACT -->
<section class="page contact">
  <img class="bgimg" src="${IMG}/crema-de-orez-3.jpg" style="object-position:50% 20%" alt="">
  <div class="shade"></div>
  <div class="in">
    ${logo}
    <p class="kick">Vrei să faci parte din echipă?</p>
    <h1>Devino sportiv<br><span>Prime Supplements.</span></h1>
    <div class="cgrid">
      <div><b>Scrie-ne</b>contact@primesupplements.ro<br>0775 286 584 (și WhatsApp)</div>
      <div><b>Online</b>primesupplements.ro<br>Instagram · TikTok · Facebook</div>
      <div><b>Firma</b>PRIME SPORT SUPPLEMENTS SRL<br>CUI 46260823 · Cisnădie, jud. Sibiu</div>
    </div>
  </div>
</section>

</body>
</html>`;

const out = new URL(`./PREZENTARE-SPORTIVI-PRIME-SUPPLEMENTS-${DATA}.html`, import.meta.url);
writeFileSync(out, "﻿" + html, "utf8");
console.log(`scris ${out.pathname}: ${total} afiliați activi`);
