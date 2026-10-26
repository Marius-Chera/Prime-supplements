// Generează agenti/RENTABILITATE-B2B-<data>.html (document INTERN, nu se dă clienților):
// profitul Prime în lei la prețul de listă și la prețul minim B2B, din Anexa 3 a contractului agentului (costuri Oblio).
// Rulare: node agenti/build-rentabilitate-b2b.mjs ; PDF: Chrome headless --print-to-pdf (A4 landscape, vezi JURNAL 26.10).
import { readFileSync, writeFileSync } from "node:fs";

const DATA = "2026-10-26";
const anexa = readFileSync(new URL(`./CONTRACT-AGENT-VANZARI-TRIF-${DATA}.md`, import.meta.url), "utf8");
const num = s => parseFloat(String(s).replace(/\./g, "").replace(",", "."));
const COM = 0.05, TRANSP = 0.03, RAFT_PLUS = 0.025;

const rows = [];
for (const line of anexa.split("\n")) {
  const c = line.split("|").map(x => x.trim());
  if (c.length >= 12 && /^\d/.test(c[2]) && /%/.test(c[3])) rows.push({ name: c[1], site: num(c[2]), vat: parseInt(c[3]), cost: num(c[4]), list: num(c[5]), min: num(c[6]) });
}
const calc = (r, price) => { const com = price * COM; const p = price - r.cost - com; return { com, p, pct: p / price * 100, pT: p - price * TRANSP, pctT: (p - price * TRANSP) / price * 100 }; };
for (const r of rows) {
  r.L = calc(r, r.list); r.M = calc(r, r.min);
  r.raft = Math.round(r.site * (1 + RAFT_PLUS)); r.b2bG = r.list * (1 + r.vat / 100);
  r.partner = (r.raft - r.b2bG) / (1 + r.vat / 100); r.partnerPct = (r.raft - r.b2bG) / r.b2bG * 100;
}
rows.sort((a, b) => a.L.pct - b.L.pct);

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const f = n => n.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const cls = pct => pct < 22 ? " low" : pct >= 40 ? " high" : "";
const tot = k => rows.reduce((s, r) => s + k(r), 0);
const tl = tot(r => r.list), tc = tot(r => r.cost), tp = tot(r => r.L.p), tm = tot(r => r.min), tpm = tot(r => r.M.p);

const html = `<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rentabilitate B2B – Prime Supplements (intern)</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root { --red: #ec1e24; --black: #111; --grey: #666; --line: #e3e3e3; --bg: #f6f6f6; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #fff; color: var(--black); font-family: Poppins, "Segoe UI", Arial, sans-serif; font-size: 11px; line-height: 1.4; }
  .page { max-width: 1180px; margin: 0 auto; padding: 0 16px 24px; }
  header { background: var(--black); color: #fff; padding: 12px 18px; display: flex; justify-content: space-between; align-items: center; border-bottom: 4px solid var(--red); border-radius: 0 0 6px 6px; }
  header .brand { font-weight: 800; font-size: 20px; letter-spacing: 2px; text-transform: uppercase; } header .brand span { color: var(--red); }
  header .meta { text-align: right; font-size: 10.5px; color: #ccc; } header .meta b { color: var(--red); }
  h1 { font-size: 18px; text-transform: uppercase; letter-spacing: 1px; margin: 16px 0 4px; }
  .sub { color: var(--grey); margin: 0 0 10px; font-size: 10.5px; }
  .kpi { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 10px 0 14px; }
  .kpi div { background: var(--bg); border-top: 4px solid var(--red); padding: 8px 12px; border-radius: 0 0 6px 6px; }
  .kpi b { display: block; text-transform: uppercase; font-size: 9.5px; letter-spacing: .6px; color: var(--red); } .kpi .v { font-size: 16px; font-weight: 700; }
  table { width: 100%; border-collapse: collapse; }
  thead th { background: var(--black); color: #fff; text-align: left; padding: 6px 6px; font-size: 9px; text-transform: uppercase; letter-spacing: .4px; vertical-align: bottom; line-height: 1.2; }
  thead th.num, td.num { text-align: right; white-space: nowrap; }
  tbody td { padding: 4px 6px; border-bottom: 1px solid var(--line); }
  td.b { font-weight: 700; } td.low { color: var(--red); font-weight: 700; } td.high { color: #1a7f37; font-weight: 700; }
  tbody tr.tot td { background: #eee; font-weight: 700; }
  th.grpL, td.grpL { border-left: 2px solid #999; }
  .concl { margin-top: 14px; font-size: 11px; } .concl li { margin-bottom: 4px; }
  .note { color: var(--grey); font-size: 10px; margin-top: 8px; }
  @media print {
    @page { size: A4 landscape; margin: 8mm; }
    .page { max-width: none; padding: 0; }
    header, thead th, tr.tot td, .kpi div { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    thead { display: table-header-group; } tr { break-inside: avoid; }
    .concl { break-inside: avoid; }
  }
</style>
</head>
<body>
<div class="page">
  <header>
    <div class="brand">Prime <span>Supplements</span></div>
    <div class="meta"><b>DOCUMENT INTERN – nu se dă clienților</b><br>Rentabilitatea prețurilor B2B · ${DATA.split("-").reverse().join(".")} · costuri Oblio (ultimul NIR), Anexa 3 a contractului agentului</div>
  </header>

  <h1>Cât câștigă Prime la fiecare produs B2B</h1>
  <p class="sub">Toate sumele sunt în lei, pe bucată, fără TVA. <b>Profit Prime</b> = preț B2B − cost de achiziție (Oblio) − comision agent 5 % din prețul facturat. <b>După transport</b> scade și ~3 % pentru Cargus (doar la comenzile peste 1.000 lei fără TVA, unde transportul e gratuit). <b>Prețul de listă</b> este cel din portofoliu / lista pentru săli; <b>prețul minim</b> este discountul maxim pe care îl poate da agentul (comenzi peste 2.000 lei sau rulaj peste 5.000 lei / 3 luni). <b>Câștigul partenerului</b> este la prețul recomandat de raft (prețul de site + 2,5 %). Produsele sunt ordonate de la marja cea mai mică la cea mai mare. Nu sunt incluse costurile fixe (chirie, salarii, contabilitate) și ambalajul.</p>

  <div class="kpi">
    <div><b>Produse în listă</b><span class="v">${rows.length}</span></div>
    <div><b>Profit mediu la listă (coș 1 buc. din fiecare)</b><span class="v">${(tp / tl * 100).toFixed(1).replace(".", ",")} %</span> ${f(tp)} lei la ${f(tl)} lei vânzare</div>
    <div><b>Profit mediu la preț minim</b><span class="v">${(tpm / tm * 100).toFixed(1).replace(".", ",")} %</span> ${f(tpm)} lei la ${f(tm)} lei vânzare</div>
    <div><b>Produse sub 22 % la listă</b><span class="v">${rows.filter(r => r.L.pct < 22).length}</span> niciunul sub 15 % nici la minim</div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Produs</th>
        <th class="num">TVA</th>
        <th class="num">Preț site<br>(cu TVA)</th>
        <th class="num">Cost Oblio<br>fără TVA</th>
        <th class="num grpL">Preț listă B2B<br>fără TVA</th>
        <th class="num">Comision<br>5 %</th>
        <th class="num">Profit Prime<br>la listă (lei)</th>
        <th class="num">Profit %</th>
        <th class="num">După transport<br>3 % (lei / %)</th>
        <th class="num grpL">Preț minim<br>fără TVA</th>
        <th class="num">Profit Prime<br>la minim (lei)</th>
        <th class="num">Profit %</th>
        <th class="num grpL">Preț raft<br>recomandat</th>
        <th class="num">Câștig partener<br>(lei, fără TVA)</th>
        <th class="num">Adaos<br>partener</th>
      </tr>
    </thead>
    <tbody>
${rows.map(r => `      <tr>
        <td>${esc(r.name)}</td><td class="num">${r.vat}%</td><td class="num">${r.site}</td><td class="num">${f(r.cost)}</td>
        <td class="num b grpL">${r.list}</td><td class="num">${f(r.L.com)}</td><td class="num b${cls(r.L.pct)}">${f(r.L.p)}</td><td class="num${cls(r.L.pct)}">${Math.round(r.L.pct)}%</td><td class="num">${f(r.L.pT)} / ${Math.round(r.L.pctT)}%</td>
        <td class="num b grpL">${r.min}</td><td class="num${cls(r.M.pct)}">${f(r.M.p)}</td><td class="num${cls(r.M.pct)}">${Math.round(r.M.pct)}%</td>
        <td class="num grpL">${r.raft}</td><td class="num">${f(r.partner)}</td><td class="num">${Math.round(r.partnerPct)}%</td>
      </tr>`).join("\n")}
      <tr class="tot"><td>Total coș (1 buc. din fiecare)</td><td></td><td></td><td class="num">${f(tc)}</td><td class="num grpL">${f(tl)}</td><td class="num">${f(tl * COM)}</td><td class="num">${f(tp)}</td><td class="num">${Math.round(tp / tl * 100)}%</td><td class="num">${f(tp - tl * TRANSP)} / ${Math.round((tp - tl * TRANSP) / tl * 100)}%</td><td class="num grpL">${f(tm)}</td><td class="num">${f(tpm)}</td><td class="num">${Math.round(tpm / tm * 100)}%</td><td class="grpL" colspan="3"></td></tr>
    </tbody>
  </table>

  <div class="concl">
    <b>Concluzii (26.10.2026)</b>
    <ol>
      <li><b>Toate cele ${rows.length} de produse sunt rentabile</b> și la listă, și la minim: nimic sub 15 % profit după comision (regula din Anexa 3); după transport, cele mai slabe rămân la 17 %.</li>
      <li><b>Marjele cele mai subțiri în lei</b> (roșu): Instant Oat Cream ${f(rows.find(r => r.name.startsWith("Instant Oat")).L.p)}, prosop ${f(rows.find(r => r.name.startsWith("Prosop")).L.p)}, cremă de orez ${f(rows.find(r => r.name.startsWith("Cremă de orez")).L.p)}, unt de migdale ${f(rows.find(r => r.name.startsWith("Unt de migdale")).L.p)}, unt de caju ${f(rows.find(r => r.name.startsWith("Unt de caju")).L.p)} lei pe bucată. Sunt produse de completare a comenzii, nu de profit.</li>
      <li><b>Banii vin din produsele mari</b>, chiar cu procent mic: Pure Isolate ${f(rows.find(r => r.name.startsWith("Izolat")).L.p)}, Gainer ${f(rows.find(r => r.name.startsWith("Gainer")).L.p)}, Prime Whey 2 kg ${f(rows.find(r => r.name.includes("2 kg")).L.p)} lei pe bucată la listă. Prime Whey 1 kg, cel mai vândut, lasă ${f(rows.find(r => r.name.includes("1 kg")).L.p)} lei la listă și ${f(rows.find(r => r.name.includes("1 kg")).M.p)} la minim: agentul nu coboară sub listă decât la volume reale.</li>
      <li><b>Unt de caju și unt de migdale</b> sunt cazurile limită: 20–21 % pentru Prime și doar 14–21 % pentru partener, pentru că prețul de site e mic față de cost. Ori rămân „la cerere”, ori se urcă prețul de site.</li>
      <li>Coloanele verzi (≥ 40 %) arată unde agentul are loc de negociere: capsule, creatină micronizată și Ready To Go, EAA, shot-uri, Fiber, batoane.</li>
    </ol>
  </div>
  <p class="note">Sursa: ${"agenti/PROFIT-B2B-" + DATA + ".md"} (costuri Oblio pe NIR) și Anexa 3 din ${"agenti/CONTRACT-AGENT-VANZARI-TRIF-" + DATA + ".md"}; generat de agenti/build-rentabilitate-b2b.mjs.</p>
</div>
</body>
</html>`;

writeFileSync(new URL(`./RENTABILITATE-B2B-${DATA}.html`, import.meta.url), "﻿" + html, "utf8");
console.log(`scris RENTABILITATE-B2B-${DATA}.html – ${rows.length} produse`);
