// Contractul agentului (Trif E.E. Alexandru PFA) ca documente separate, gata de tipărit:
// contractul (art. 1–10) + câte un PDF pentru fiecare dintre cele 6 anexe, cu tabele de completat lunar.
// Sursa textului: CONTRACT-AGENT-VANZARI-TRIF-2026-11-02.md; prețurile: data/preturi-b2b-2026-10-26.json.
// Rulare: node agenti/build-contract-anexe.mjs  → agenti/CONTRACT-TRIF-2026-11-02/*.html + *.pdf (Edge headless)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "CONTRACT-TRIF-2026-11-02");
mkdirSync(OUT, { recursive: true });
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const CONTRACT_NO = "nr. ______ din ____.____.2026";
const PARTIES = "PRIME SPORT SUPPLEMENTS S.R.L. (Comitent) × TRIF E.E. ALEXANDRU PFA (Agent)";

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const f2 = n => Number(n).toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ---------- CSS comun ----------
const css = (orientation = "portrait") => `
:root{--red:#ec1e24;--black:#111;--grey:#666;--line:#cfcfcf;--bg:#f5f5f5}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff;color:var(--black);font-family:Poppins,"Segoe UI",Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4}
.page{padding:0}
header{background:var(--black);color:#fff;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:4px solid var(--red)}
header .brand{font-weight:800;font-size:19px;letter-spacing:2px;text-transform:uppercase}header .brand span{color:var(--red)}
header .meta{text-align:right;font-size:10px;color:#ddd;line-height:1.35}header .meta b{color:#fff;font-size:11px}
h1{font-size:16px;text-transform:uppercase;letter-spacing:1px;margin:14px 0 2px}
h2{font-size:12.5px;text-transform:uppercase;letter-spacing:.6px;margin:14px 0 6px;color:var(--black);border-left:4px solid var(--red);padding-left:8px}
h3{font-size:12px;margin:12px 0 4px}
.sub{color:var(--grey);margin:0 0 10px;font-size:10.5px}
p{margin:5px 0;text-align:justify}
ul{margin:4px 0 8px 18px}li{margin:2px 0}
.box{background:var(--bg);border-left:4px solid var(--red);padding:8px 12px;margin:8px 0 12px;font-size:10.5px}
.fields{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px 18px;margin:8px 0 10px;font-size:10.5px}
.fields div{border-bottom:1px solid var(--black);padding:6px 0 2px}.fields b{text-transform:uppercase;font-size:9px;letter-spacing:.5px;color:var(--grey);display:block}
table{width:100%;border-collapse:collapse;margin:6px 0 10px}
thead th{background:var(--black);color:#fff;text-align:left;padding:6px 6px;font-size:9.5px;text-transform:uppercase;letter-spacing:.4px;vertical-align:bottom}
tbody td{padding:5px 6px;border:1px solid var(--line);vertical-align:top}
tbody tr:nth-child(even) td{background:#fafafa}
td.num,th.num{text-align:right;white-space:nowrap}
td.c,th.c{text-align:center}
td.b{font-weight:700}td.red{font-weight:700;color:var(--red)}
tr.grp td{background:#e9e9e9;font-weight:700;text-transform:uppercase;font-size:9.5px;letter-spacing:.5px}
tr.tot td{background:#eee;font-weight:700}
tr.blank td{height:30px}tr.tall td{height:46px}tr.xtall td{height:58px}
.sign{margin-top:16px;display:grid;grid-template-columns:1fr 1fr;gap:24px;font-size:10.5px}
.sign div{border-top:1px solid var(--black);padding-top:6px}
.sign3{grid-template-columns:1fr 1fr 1fr}
.note{font-size:9.5px;color:var(--grey);margin-top:8px}
.tva{color:var(--grey);font-size:9px}
footer{margin-top:14px;font-size:9.5px;color:var(--grey);display:flex;justify-content:space-between;border-top:1px solid var(--line);padding-top:6px}
.pb{break-before:page}
@page{size:A4 ${orientation};margin:11mm 10mm}
@media print{header,thead th,tr.grp td,tr.tot td,.box{-webkit-print-color-adjust:exact;print-color-adjust:exact}thead{display:table-header-group}tr{break-inside:avoid}}
`;

const shell = (title, metaTop, body, orientation = "portrait") => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title>
<style>${css(orientation)}</style></head><body><div class="page">
<header><div class="brand">Prime <span>Supplements</span></div><div class="meta"><b>${esc(metaTop)}</b><br>Contract de agent comercial ${esc(CONTRACT_NO)}<br>${esc(PARTIES)}</div></header>
${body}
</div></body></html>`;

const signAgentPrime = (extra = "") => `<div class="sign${extra ? " sign3" : ""}"><div>Agent: Trif Alexandru<br>Semnătura: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Data: ________</div>${extra ? `<div>${extra}</div>` : ""}<div>Verificat Prime: Marius Chera<br>Semnătura: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Data: ________</div></div>`;
const blankRows = (cols, n, cls = "blank", firstCol = null) => Array.from({ length: n }, (_, i) => `<tr class="${cls}">${Array.from({ length: cols }, (_, c) => `<td>${c === 0 && firstCol ? firstCol(i) : ""}</td>`).join("")}</tr>`).join("\n");

// ---------- md → html (corpul contractului) ----------
function inline(s) {
  s = esc(s);
  s = s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  s = s.replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2">$1</a>');
  return s;
}
function mdToHtml(md) {
  const lines = md.split(/\r?\n/);
  let out = "", inList = false, inTable = false;
  const closeAll = () => { if (inList) { out += "</ul>\n"; inList = false; } if (inTable) { out += "</tbody></table>\n"; inTable = false; } };
  for (const l of lines) {
    if (/^\s*$/.test(l)) { closeAll(); continue; }
    if (/^---\s*$/.test(l)) { closeAll(); continue; }
    let m;
    if ((m = l.match(/^(#{1,3})\s+(.*)/))) { closeAll(); const n = m[1].length; out += `<h${n}>${inline(m[2])}</h${n}>\n`; continue; }
    if (/^\|/.test(l)) {
      if (/^\|\s*-{3}/.test(l)) continue;
      const cells = l.split("|").slice(1, -1).map(x => x.trim());
      if (!inTable) { closeAll(); out += `<table><thead><tr>${cells.map(c => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>\n`; inTable = true; continue; }
      out += `<tr>${cells.map(c => `<td>${inline(c)}</td>`).join("")}</tr>\n`; continue;
    }
    if ((m = l.match(/^-\s+(.*)/))) { if (inTable) closeAll(); if (!inList) { out += "<ul>\n"; inList = true; } out += `<li>${inline(m[1])}</li>\n`; continue; }
    closeAll(); out += `<p>${inline(l)}</p>\n`;
  }
  closeAll();
  return out;
}

// ---------- surse ----------
const md = readFileSync(join(HERE, "CONTRACT-AGENT-VANZARI-TRIF-2026-11-02.md"), "utf8").replace(/^\ufeff/, "");
const bodyMd = md.split(/\n## Anexa 1/)[0].replace(/^# .*\n/, "");
const products = JSON.parse(readFileSync(join(HERE, "data", "preturi-b2b-2026-10-26.json"), "utf8").replace(/^\ufeff/, ""));
const groups = [
  ["Proteine și gainer", [1, 2, 3, 4, 5]], ["Creatină", [6, 7, 8, 9]], ["Aminoacizi", [10, 11, 12]],
  ["Pre-workout, intra-workout și shot-uri", [13, 14, 15, 16, 17, 18, 19, 20]], ["Arzătoare și definire", [23, 24, 25, 26]],
  ["Vitamine, minerale și plante", [21, 22, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]],
  ["Alimente funcționale", [48, 49, 50, 51, 52, 53]], ["Accesorii Prime", [54, 55]],
];
const gyms = [
  ["18GYM Sibiu Dumbrava", "Piața Unirii 10 (magazinul Dumbrava), tel. 0771 748 198", "Sibiu"], ["Stay Fit Gym Malului", "Str. Malului 8", "Sibiu"],
  ["Stay Fit Gym Promenada", "Str. Lector 1–3A (Promenada Mall)", "Sibiu"], ["Stay Fit Gym Shopping City", "Str. Sibiului 5, Shopping City, et. 1", "Șelimbăr"],
  ["BeFIT Hipodrom III", "Aleea Seviș 2A, parter", "Sibiu"], ["BeFIT Metalurgiștilor", "Str. Metalurgiștilor 1–3, et. 2", "Sibiu"],
  ["BeFIT Șerbota (Trei Stejari)", "Str. Șerbota 1A", "Sibiu"], ["Evo Gym Fitness Center", "Str. Oituz 34", "Sibiu"],
  ["GymTonic (Tonic Fitness Center)", "Str. Oituz 34", "Sibiu"], ["Wolf Gym Fitness & Bodybuilding", "Str. Vasile Aaron 27A", "Sibiu"],
  ["Unic Gym", "Str. Ștefan cel Mare 147", "Sibiu"], ["Global Gym Fitness Fun / RActiv", "Bd. Victoriei 42, et. 1", "Sibiu"],
  ["Fitnesswelt Râului", "Str. Râului 34", "Sibiu"], ["Body Time", "Str. Rahovei 65", "Sibiu"],
  ["GYMBOdance Sport Center", "Str. Mărășești 9", "Sibiu"], ["Green Diamond", "Ștrand II, Str. Profesor Aurel Popa", "Sibiu"],
  ["Xbody Sibiu", "Str. Școala de Înot 28", "Sibiu"], ["Eco Sports Dome", "Str. Tractorului 14", "Sibiu"],
  ["Future Training", "Șos. Alba Iulia 6, et. 3", "Sibiu"], ["Aria Sport", "Șos. Alba Iulia 100", "Sibiu"],
  ["Connect Wellness Club", "Calea Cisnădiei 50, et. 1", "Sibiu"], ["Nix Sport", "DJ 106A nr. 135", "Sibiu"],
  ["Nixi Fitness (doar femei; de verificat)", "Str. Henri Coandă", "Sibiu"], ["ACTIV Fitness (de verificat)", "Aleea Călărașilor 10", "Sibiu"],
  ["Cycling Sibiu", "Bd. Victoriei 42, et. 2 (în RActiv)", "Sibiu"], ["Studio Pilates", "Str. Costache Negruzzi 3", "Sibiu"],
  ["Nor Pilates Studio", "Str. Ion Agârbiceanu 11", "Sibiu"], ["Reform Studio Pilates", "Str. Cornel Irimie 20", "Sibiu"],
  ["Avangard Gym Plus", "Str. Regele Ferdinand 5, bl. B2", "Șelimbăr"], ["ProGym 24H", "Str. Câmpului 30, tel. 0753 139 567", "Șelimbăr"],
  ["MUR Fitness Studio", "Bd. Mihai Viteazul 1, ap. 7, parter", "Șelimbăr"], ["Super Fit Studio (de verificat)", "Str. Doamna Stanca 5F, tel. 0759 355 655", "Șelimbăr"],
  ["Fitnesswelt Arhitecților", "Str. Liviu Ciulei 2, tel. 0726 704 447", "Cisnădie"], ["Aria Cisnădie (Sport, Spa & bazin)", "Str. Măgurii 200", "Cisnădie"],
  ["Sala Polivalentă Măgura", "Str. Măgurii B1", "Cisnădie"],
];

const docs = [];

// ---------- 0. Contractul ----------
docs.push({
  file: "0-CONTRACT-AGENT-COMERCIAL", orientation: "portrait", title: "Contract de agent comercial",
  html: shell("Contract de agent comercial – Prime × Trif E.E. Alexandru PFA", "CONTRACT DE AGENT COMERCIAL",
    mdToHtml(bodyMd) + `<p class="note">Anexele 1–6 sunt documente separate și fac parte integrantă din contract: 1 – Decontarea combustibilului; 2 – Sălile din Sibiu (vizita lunară); 3 – Lista de prețuri B2B; 4 – Comisionul Agentului; 5 – Traseul anual pe regiuni și evenimentele; 6 – Contactele noi (minimum 10 pe lună).</p>`),
});

// ---------- 1. Decont combustibil ----------
docs.push({
  file: "ANEXA-1-DECONT-COMBUSTIBIL", orientation: "landscape", title: "Anexa 1 – Decontarea combustibilului",
  html: shell("Anexa 1 – Decontarea combustibilului", "ANEXA 1 – DECONTAREA COMBUSTIBILULUI (art. 6)", `
<h1>Foaia de parcurs și decontul de combustibil</h1>
<p class="sub">Se completează pentru fiecare zi cu deplasări în interesul Comitentului și se trimite până pe 3 ale lunii următoare, cu bonurile fiscale emise pe PRIME SPORT SUPPLEMENTS S.R.L., CUI RO46260823. Se plătește o dată cu comisionul.</p>
<div class="fields"><div><b>Luna / anul</b>&nbsp;</div><div><b>Autoturism (marca, nr. înmatriculare)</b>&nbsp;</div><div><b>Consum mediu agreat (l/100 km)</b>&nbsp;</div></div>
<div class="box">Se decontează: vizitele lunare la sălile din Anexa 2, contactele noi din Anexa 6, livrările către clienți, deplasările pe regiuni din Anexa 5 și evenimentele aprobate. Deplasările în afara județului Sibiu și evenimentele se aprobă înainte, în scris, cu bugetul estimat. Nu se decontează deplasările personale, amenzile, masa, telefonul sau întreținerea autoturismului.</div>
<table><thead><tr><th style="width:9%">Data</th><th style="width:18%">Traseu (de la – la)</th><th style="width:20%">Săli / clienți vizitați</th><th style="width:16%">Scop (vizită lunară / contact nou / livrare / eveniment)</th><th class="num" style="width:6%">Km</th><th style="width:13%">Bon fiscal nr. și data</th><th class="num" style="width:7%">Litri</th><th class="num" style="width:9%">Lei (cu TVA)</th></tr></thead><tbody>
${blankRows(8, 20)}
<tr class="tot"><td colspan="4">TOTAL LUNĂ</td><td></td><td></td><td></td><td></td></tr>
</tbody></table>
${signAgentPrime("Aprobat la plată: ______ lei<br>Data: ________")}
`, "landscape"),
});

// ---------- 2. Sălile din Sibiu ----------
const gymRows = gyms.map((g, i) => `<tr class="blank"><td class="c">${i + 1}</td><td class="b">${esc(g[0])}</td><td>${esc(g[1])}</td><td>${esc(g[2])}</td><td></td><td></td><td class="c"></td><td></td><td></td></tr>`).join("\n")
  + blankRows(9, 3, "blank", i => `${gyms.length + i + 1}`);
docs.push({
  file: "ANEXA-2-SALI-SIBIU-VIZITA-LUNARA", orientation: "landscape", title: "Anexa 2 – Sălile din Sibiu, vizita lunară",
  html: shell("Anexa 2 – Sălile din Sibiu, vizita lunară", "ANEXA 2 – SĂLILE DIN SIBIU, ȘELIMBĂR ȘI CISNĂDIE: VIZITA LUNARĂ (art. 3.2)", `
<h1>Vizita lunară la toate sălile</h1>
<p class="sub">Fiecare sală se vizitează o dată pe lună. La vizită se completează: data, cu cine și ce s-a discutat, dacă produsele Prime au fost introduse în sală (DA / NU), dacă s-a propus sistemul de produse în regim de consignație (DA / NU și răspunsul sălii) și pasul următor. Tabelul completat, cu fotografiile de la raft, se trimite până pe 3 ale lunii următoare. Sălile nou deschise se adaugă pe rândurile libere.</p>
<div class="fields"><div><b>Luna / anul</b>&nbsp;</div><div><b>Agent</b>Trif Alexandru</div><div><b>Săli cu produse Prime la începutul lunii</b>&nbsp;</div></div>
<table><thead><tr><th class="c" style="width:3%">Nr.</th><th style="width:14%">Sala</th><th style="width:15%">Adresa</th><th style="width:6%">Localitate</th><th style="width:7%">Data vizitei</th><th style="width:22%">Cu cine și ce s-a discutat</th><th class="c" style="width:7%">Produse introduse (DA/NU)</th><th style="width:13%">Consignație propusă (DA/NU, răspuns)</th><th style="width:13%">Pasul următor</th></tr></thead><tbody>
${gymRows}
</tbody></table>
${signAgentPrime()}
<div class="pb"></div>
<h1>Proces-verbal de predare-primire – produse în regim de consignație</h1>
<p class="sub">Se semnează cu fiecare sală la instalarea raftului Prime (art. 8.5). Un exemplar rămâne la sală, unul la Prime.</p>
<div class="fields"><div><b>Sala (denumire societate)</b>&nbsp;</div><div><b>CUI / Reg. com.</b>&nbsp;</div><div><b>Adresa</b>&nbsp;</div><div><b>Reprezentant (nume, funcție, telefon)</b>&nbsp;</div><div><b>Data predării</b>&nbsp;</div><div><b>Raft / stand Prime (descriere, nr. inventar)</b>&nbsp;</div></div>
<p>Între PRIME SPORT SUPPLEMENTS S.R.L., prin agent Trif Alexandru, și sala de mai sus s-a predat în folosință gratuită raftul/standul Prime împreună cu stocul inițial de produse de mai jos, aflat în proprietatea PRIME SPORT SUPPLEMENTS S.R.L. până la facturare. Sala vinde produsele la prețul recomandat, păstrează raftul în locul agreat, nu îl mută și nu îl înstrăinează, permite accesul agentului pentru verificare săptămânală și inventar lunar și răspunde de produsele lipsă la inventar, la prețul B2B din Anexa 3. Produsele vândute se facturează lunar de Prime, la prețul B2B, cu termen de plată de 14 zile.</p>
<table><thead><tr><th class="c" style="width:4%">Nr.</th><th>Produs</th><th class="num" style="width:10%">Buc.</th><th class="num" style="width:16%">Preț B2B fără TVA (lei)</th><th class="num" style="width:16%">Valoare (lei)</th><th style="width:18%">Observații (lot, valabilitate)</th></tr></thead><tbody>
${blankRows(6, 12, "blank", i => `${i + 1}`)}
<tr class="tot"><td colspan="4">TOTAL STOC ÎN CUSTODIE</td><td></td><td></td></tr>
</tbody></table>
<div class="sign sign3"><div>Prime (agent): Trif Alexandru<br>Semnătura:</div><div>Sala (reprezentant):<br>Semnătura și ștampila:</div><div>Data:</div></div>
`, "landscape"),
});

// ---------- 3. Lista de prețuri B2B ----------
let priceRows = "";
for (const [g, idx] of groups) {
  priceRows += `<tr class="grp"><td colspan="5">${esc(g)}</td></tr>\n`;
  for (const i of idx) { const p = products[i - 1]; priceRows += `<tr><td>${esc(p.name)}</td><td class="c">${p.vat}%</td><td class="num">${p.reg}</td><td class="num red">${p.list}</td><td class="num">${f2(p.listG)}</td></tr>\n`; }
}
docs.push({
  file: "ANEXA-3-LISTA-PRETURI-B2B", orientation: "portrait", title: "Anexa 3 – Lista de prețuri B2B",
  html: shell("Anexa 3 – Lista de prețuri B2B", "ANEXA 3 – LISTA DE PREȚURI B2B (art. 8.2)", `
<h1>Lista de prețuri B2B</h1>
<p class="sub">Prețurile la care Prime vinde clienților B2B (săli, magazine, farmacii). <b>Agentul nu are voie să ofere prețuri mai mici</b>; orice excepție se aprobă în scris de Comitent, înainte de comandă. Prețul recomandat la raft este prețul întreg de pe primesupplements.ro (26.10.2026). Cota de TVA este cea din Oblio. Lista se actualizează de Comitent cu 15 zile înainte (art. 7.3).</p>
<div class="box">Condiții standard (art. 8.3): comandă minimă 500 lei fără TVA · transport gratuit prin Cargus de la 1.000 lei fără TVA, sub acest prag la cost · plată în avans sau ramburs la primele 3 comenzi, apoi factură cu termen de 14 zile · materiale de prezentare gratuite · hainele MNX, pachetele promoționale și băuturile Frutilu: doar la cerere, cu preț aprobat de Comitent.</div>
<table><thead><tr><th>Produs</th><th class="c" style="width:7%">TVA</th><th class="num" style="width:17%">Preț recomandat la raft (cu TVA)</th><th class="num" style="width:16%">Preț B2B fără TVA</th><th class="num" style="width:16%">Preț B2B cu TVA</th></tr></thead><tbody>
${priceRows}
</tbody></table>
<p class="note">${products.length} produse. Prețuri în lei. Valabilă de la ____.____.2026 până la înlocuirea printr-o listă nouă.</p>
<div class="sign"><div>Comitent: PRIME SPORT SUPPLEMENTS S.R.L., Marius Chera<br>Semnătura și ștampila:</div><div>Agent: TRIF E.E. ALEXANDRU PFA, Trif Alexandru<br>Semnătura:</div></div>
`),
});

// ---------- 4. Comisionul ----------
let comRows = ""; let tl = 0, tc = 0;
for (const [g, idx] of groups) {
  comRows += `<tr class="grp"><td colspan="3">${esc(g)}</td></tr>\n`;
  for (const i of idx) { const p = products[i - 1]; const c = Math.round(p.list * 5) / 100; tl += p.list; tc += c; comRows += `<tr><td>${esc(p.name)}</td><td class="num">${p.list}</td><td class="num red">${f2(c)}</td></tr>\n`; }
}
docs.push({
  file: "ANEXA-4-COMISIONUL-AGENTULUI", orientation: "portrait", title: "Anexa 4 – Comisionul Agentului",
  html: shell("Anexa 4 – Comisionul Agentului", "ANEXA 4 – COMISIONUL AGENTULUI (art. 5)", `
<h1>Comisionul pe produs: 5% din prețul de listă B2B</h1>
<p class="sub">Comisionul se calculează la prețul de listă B2B fără TVA (Anexa 3) pentru produsele vândute clienților din portofoliul Agentului și se datorează după încasarea facturii de către Comitent. Pentru produsele noi se aplică același procent la prețul de listă comunicat de Comitent.</p>
<div class="box"><b>Procedura lunară.</b> Până pe <b>20</b> ale lunii Comitentul trimite situația lunii anterioare (facturile emise clienților din portofoliu și încasate). <b>Agentul emite factura de comision cel târziu pe 28 ale lunii, pentru luna anterioară</b>; Comitentul o plătește în 10 zile de la primire. Facturile neîncasate intră în situația lunii în care se încasează; după 90 de zile de la scadență nu se mai datorează comision. Factura de comision se emite cu TVA, cu mențiunea „Comision agent comercial conform contract ${esc(CONTRACT_NO)} – luna ______”.</div>
<table><thead><tr><th>Produs</th><th class="num" style="width:22%">Preț de listă B2B fără TVA (lei)</th><th class="num" style="width:22%">Comision agent 5% (lei / buc.)</th></tr></thead><tbody>
${comRows}
<tr class="tot"><td>Total (câte o bucată din fiecare, ${products.length} produse)</td><td class="num">${f2(tl)}</td><td class="num">${f2(tc)}</td></tr>
</tbody></table>
<div class="pb"></div>
<h1>Situația lunară a comisionului</h1>
<p class="sub">Se completează de Comitent până pe 20 ale lunii, pentru luna anterioară, și se trimite Agentului. Totalul este baza facturii de comision (emisă până pe 28).</p>
<div class="fields"><div><b>Luna / anul</b>&nbsp;</div><div><b>Întocmit (Prime)</b>&nbsp;</div><div><b>Data trimiterii către Agent</b>&nbsp;</div></div>
<table><thead><tr><th style="width:13%">Nr. factură Prime</th><th style="width:9%">Data</th><th>Client B2B</th><th class="num" style="width:17%">Valoare netă produse (lei, fără TVA)</th><th style="width:11%">Data încasării</th><th class="num" style="width:13%">Comision 5% (lei)</th></tr></thead><tbody>
${blankRows(6, 18)}
<tr class="tot"><td colspan="3">TOTAL COMISION DE FACTURAT (fără TVA)</td><td></td><td></td><td></td></tr>
</tbody></table>
${signAgentPrime()}
`),
});

// ---------- 5. Traseul anual ----------
docs.push({
  file: "ANEXA-5-TRASEU-ANUAL-SI-EVENIMENTE", orientation: "landscape", title: "Anexa 5 – Traseul anual pe regiuni și evenimentele",
  html: shell("Anexa 5 – Traseul anual pe regiuni și evenimentele", "ANEXA 5 – TRASEUL ANUAL PE REGIUNI, EVENIMENTELE ȘI CLIENȚII EXISTENȚI (art. 3.4)", `
<h1>Planul anual pe regiuni</h1>
<p class="sub">O dată pe an, fiecare regiune este parcursă pentru: (1) menținerea legăturii cu toate sălile și persoanele juridice cu care Prime colaborează deja (lista clienților B2B activi din Oblio, dată de Comitent); (2) vizitarea de săli, magazine de suplimente și farmacii noi, cărora li se propune oferta B2B și regimul de consignație; (3) organizarea sau participarea la evenimente: deschideri de săli, promovări și degustări, competiții și expoziții de fitness. Calendarul exact se fixează în ianuarie; deplasările se aprobă și se decontează conform art. 6. Lanțurile naționale se abordează întâi la sediul central, apoi la cluburile locale.</p>
<table><thead><tr><th style="width:9%">Trimestru</th><th style="width:15%">Regiune</th><th style="width:22%">Orașe principale</th><th style="width:15%">Clienți existenți de vizitat</th><th style="width:15%">Prospectare: săli / magazine / farmacii noi</th><th style="width:14%">Evenimente planificate</th><th style="width:10%">Zile de deplasare</th></tr></thead><tbody>
<tr><td class="b">T1 (ian–mar)</td><td>Județul Sibiu + lanțuri (sedii centrale)</td><td>Mediaș, Avrig, Agnita, Dumbrăveni, Cisnădie; Stay Fit (75 centre, 26 orașe), 18GYM (~49 cluburi), World Class (~36), BeFIT (22)</td><td>toate sălile din Anexa 2 + clienții din județ</td><td>minimum 10 contacte noi pe lună (Anexa 6)</td><td>deschideri de săli în Sibiu</td><td>în județ, fără cazare</td></tr>
<tr><td class="b">T2 (apr–iun)</td><td>Transilvania Sud și Centru</td><td>Brașov, Făgăraș, Sfântu Gheorghe; Alba Iulia, Sebeș, Blaj, Târgu Mureș, Sighișoara</td><td>clienții activi din regiune</td><td>săli, magazine, farmacii din orașele parcurse</td><td>competiții de fitness / culturism din regiune</td><td>2 deplasări × 2 zile</td></tr>
<tr><td class="b">T3 (iul–sep)</td><td>Transilvania Nord, Banat, Crișana</td><td>Cluj-Napoca, Turda, Bistrița, Dej; Timișoara, Arad, Oradea, Deva, Hunedoara</td><td>clienții activi din regiune</td><td>săli, magazine, farmacii din orașele parcurse</td><td>expoziții de fitness și nutriție sportivă</td><td>2 deplasări × 2–3 zile</td></tr>
<tr><td class="b">T4 (oct–dec)</td><td>Muntenia, Oltenia, Moldova, Dobrogea</td><td>București, Pitești, Râmnicu Vâlcea, Craiova, Ploiești; Iași, Bacău, Suceava, Galați, Constanța</td><td>telefon + e-mail; vizite la cei care confirmă</td><td>telefon / e-mail; vizite doar la cei interesați</td><td>promovări în sălile partenere (sezonul de iarnă)</td><td>1–2 deplasări, după interes</td></tr>
</tbody></table>
<h2>Calendarul anului ______ (se completează în ianuarie, de comun acord)</h2>
<table><thead><tr><th style="width:10%">Luna</th><th style="width:20%">Regiune / orașe</th><th style="width:22%">Clienți existenți de vizitat</th><th style="width:20%">Săli / magazine / farmacii noi țintite</th><th style="width:18%">Eveniment (dacă e cazul)</th><th style="width:10%">Aprobat (da, data)</th></tr></thead><tbody>
${blankRows(6, 12, "blank", i => ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"][i])}
</tbody></table>
<div class="pb"></div>
<h1>Evidența contactelor din țară</h1>
<p class="sub">Se completează la fiecare regiune parcursă (aceeași structură ca Anexa 6) și se trimite cu raportul lunar.</p>
<table><thead><tr><th style="width:7%">Data</th><th style="width:11%">Regiune / oraș</th><th style="width:15%">Sala / magazin / farmacie</th><th class="c" style="width:7%">Client existent / nou</th><th style="width:22%">Cu cine și ce s-a discutat</th><th class="c" style="width:7%">Ofertă B2B prezentată (DA/NU)</th><th style="width:13%">Consignație propusă (DA/NU, răspuns)</th><th style="width:18%">Rezultat și pasul următor</th></tr></thead><tbody>
${blankRows(8, 14)}
</tbody></table>
<h1>Evenimente</h1>
<p class="sub">Se aprobă de Comitent cu minimum 14 zile înainte; combustibilul, taxele de drum și parcarea se decontează conform art. 6.2.</p>
<table><thead><tr><th style="width:8%">Data</th><th style="width:24%">Eveniment (deschidere sală / promovare / competiție / expoziție)</th><th style="width:14%">Loc</th><th style="width:22%">Ce face Agentul (degustare, stand, prezentare, raft)</th><th style="width:12%">Buget aprobat (lei, data)</th><th style="width:20%">Rezultat (contacte, comenzi)</th></tr></thead><tbody>
${blankRows(6, 7)}
</tbody></table>
${signAgentPrime()}
`, "landscape"),
});

// ---------- 6. Contacte noi ----------
docs.push({
  file: "ANEXA-6-CONTACTE-NOI-LUNAR", orientation: "landscape", title: "Anexa 6 – Contactele noi, minimum 10 pe lună",
  html: shell("Anexa 6 – Contactele noi, minimum 10 pe lună", "ANEXA 6 – CONTACTELE NOI: MINIMUM 10 SĂLI, MAGAZINE SAU FARMACII PE LUNĂ (art. 3.1)", `
<h1>Contactele noi din luna ______________ ${"".padEnd(0)}</h1>
<p class="sub">Minimum 10 potențiali clienți noi pe lună (săli de fitness, magazine de suplimente, farmacii, cluburi sportive) în care produsele Prime nu sunt în vânzare. Pentru fiecare se scrie exact ce s-a discutat și cu cine, dacă s-a prezentat oferta B2B și dacă s-a propus sistemul de produse în regim de consignație, iar la refuz motivul exact (preț, are alt furnizor, nu vinde suplimente, decide altcineva, revenire la o dată anume etc.). Se trimite până pe 3 ale lunii următoare și se adaugă în tabelul comun al portofoliului.</p>
<div class="fields"><div><b>Luna / anul</b>&nbsp;</div><div><b>Agent</b>Trif Alexandru</div><div><b>Contacte noi în lună (număr)</b>&nbsp;</div></div>
<table><thead><tr><th class="c" style="width:3%">Nr.</th><th style="width:6%">Data</th><th style="width:12%">Sala / magazin / farmacie</th><th style="width:10%">Localitate, adresă</th><th style="width:11%">Persoana de decizie (nume, funcție, telefon)</th><th style="width:16%">Ce s-a discutat</th><th class="c" style="width:6%">Ofertă B2B prezentată (DA/NU)</th><th style="width:9%">Consignație propusă (DA/NU, răspuns)</th><th style="width:8%">Rezultat: comandă / interesat / refuz</th><th style="width:10%">Motivul refuzului (exact)</th><th style="width:9%">Pasul următor și data</th></tr></thead><tbody>
${blankRows(11, 14, "tall", i => `${i + 1}`)}
</tbody></table>
${signAgentPrime()}
`, "landscape"),
});

// ---------- scriere + PDF ----------
const made = [];
for (const d of docs) {
  const base = `CONTRACT-TRIF-2026-11-02-${d.file}`;
  const htmlPath = join(OUT, base + ".html");
  const pdfPath = join(OUT, base + ".pdf");
  writeFileSync(htmlPath, "\ufeff" + d.html, "utf8");
  const url = "file:///" + htmlPath.replace(/\\/g, "/").replace(/ /g, "%20");
  try {
    execFileSync(EDGE, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdfPath}`, url], { stdio: "ignore", timeout: 60000 });
    made.push(base + ".pdf");
  } catch (e) { console.error("PDF failed for", base, e.message); }
}
console.log("done:", made.length, "PDF", "\n" + made.join("\n"));
