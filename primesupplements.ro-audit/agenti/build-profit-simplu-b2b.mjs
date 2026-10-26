// Tabel simplu (intern): preț listă B2B fără TVA, comision agent 5 %, profit Prime în lei (după cost Oblio și comision).
// Sursa: Anexa 3 din contractul agentului. Rulare: node agenti/build-profit-simplu-b2b.mjs
import { readFileSync, writeFileSync } from "node:fs";
const DATA = "2026-10-26";
const anexa = readFileSync(new URL(`./CONTRACT-AGENT-VANZARI-TRIF-${DATA}.md`, import.meta.url), "utf8");
const num = s => parseFloat(String(s).replace(/\./g, "").replace(",", "."));
const rows = [];
for (const line of anexa.split("\n")) {
  const c = line.split("|").map(x => x.trim());
  if (c.length >= 12 && /^\d/.test(c[2]) && /%/.test(c[3])) rows.push({ name: c[1], cost: num(c[4]), list: num(c[5]) });
}
for (const r of rows) { r.com = r.list * 0.05; r.profit = r.list - r.cost - r.com; }
const f = n => n.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const tl = rows.reduce((s, r) => s + r.list, 0), tc = rows.reduce((s, r) => s + r.com, 0), tp = rows.reduce((s, r) => s + r.profit, 0);
const md = ["| Produs | Preț B2B fără TVA | Comision agent 5 % | Profit Prime (lei) |", "| --- | --- | --- | --- |",
  ...rows.map(r => `| ${r.name} | ${r.list} | ${f(r.com)} | ${f(r.profit)} |`)].join("\n");
const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><title>Profit Prime la prețurile B2B – tabel simplu (intern)</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--red:#ec1e24;--black:#111;--grey:#666;--line:#e3e3e3}
*{box-sizing:border-box}body{margin:0;font-family:Poppins,"Segoe UI",Arial,sans-serif;font-size:12px;color:var(--black);background:#fff}
.page{max-width:760px;margin:0 auto;padding:0 16px 20px}
header{background:var(--black);color:#fff;padding:12px 18px;display:flex;justify-content:space-between;align-items:center;border-bottom:4px solid var(--red);border-radius:0 0 6px 6px}
header .brand{font-weight:800;font-size:20px;letter-spacing:2px;text-transform:uppercase}header .brand span{color:var(--red)}
header .meta{text-align:right;font-size:10.5px;color:#ccc}header .meta b{color:var(--red)}
h1{font-size:17px;text-transform:uppercase;letter-spacing:1px;margin:16px 0 4px}.sub{color:var(--grey);margin:0 0 12px;font-size:11px}
table{width:100%;border-collapse:collapse}thead th{background:var(--black);color:#fff;text-align:left;padding:7px 8px;font-size:10px;text-transform:uppercase;letter-spacing:.5px}
th.num,td.num{text-align:right;white-space:nowrap}tbody td{padding:5px 8px;border-bottom:1px solid var(--line)}
td.b{font-weight:700}td.p{font-weight:700;color:var(--red)}tr.tot td{background:#eee;font-weight:700}
@media print{@page{size:A4;margin:10mm}.page{max-width:none;padding:0}header,thead th,tr.tot td{-webkit-print-color-adjust:exact;print-color-adjust:exact}thead{display:table-header-group}tr{break-inside:avoid}}
</style></head><body><div class="page">
<header><div class="brand">Prime <span>Supplements</span></div><div class="meta"><b>DOCUMENT INTERN</b><br>Profitul Prime la prețurile B2B de listă · ${DATA.split("-").reverse().join(".")}</div></header>
<h1>Preț B2B, comision agent, profit Prime</h1>
<p class="sub">Lei pe bucată, fără TVA. Prețul B2B este prețul de listă din portofoliu. Profit Prime = preț B2B − cost de achiziție (Oblio, ultimul NIR) − comision agent 5 %. Fără transport și fără costuri fixe.</p>
<table><thead><tr><th>Produs</th><th class="num">Preț B2B fără TVA</th><th class="num">Comision agent 5 %</th><th class="num">Profit Prime (lei)</th></tr></thead><tbody>
${rows.map(r => `<tr><td>${esc(r.name)}</td><td class="num b">${r.list}</td><td class="num">${f(r.com)}</td><td class="num p">${f(r.profit)}</td></tr>`).join("\n")}
<tr class="tot"><td>Total (câte o bucată din fiecare, ${rows.length} produse)</td><td class="num">${f(tl)}</td><td class="num">${f(tc)}</td><td class="num">${f(tp)}</td></tr>
</tbody></table></div></body></html>`;
writeFileSync(new URL(`./PROFIT-SIMPLU-B2B-${DATA}.html`, import.meta.url), "\ufeff" + html, "utf8");
writeFileSync(new URL(`./PROFIT-SIMPLU-B2B-${DATA}.md`, import.meta.url), `# Profit Prime la prețurile B2B de listă – tabel simplu (intern, ${DATA.split("-").reverse().join(".")})\n\nLei pe bucată, fără TVA. Profit Prime = preț B2B de listă − cost Oblio − comision agent 5 %. Fără transport și costuri fixe. Sursa: Anexa 3 din contractul agentului; generat de \`build-profit-simplu-b2b.mjs\`; PDF: \`PROFIT-SIMPLU-B2B-${DATA}.pdf\`.\n\n${md}\n| **Total (câte o bucată din fiecare)** | ${f(tl)} | ${f(tc)} | ${f(tp)} |\n`, "utf8");
console.log(md); console.log(`\nTotal | ${f(tl)} | ${f(tc)} | ${f(tp)}`);
