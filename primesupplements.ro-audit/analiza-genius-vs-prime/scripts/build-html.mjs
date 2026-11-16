// RAPORT.md -> RAPORT.html (cu galeria de screenshot-uri; căi relative la screenshots/)
import fs from 'node:fs'; import { fileURLToPath } from 'node:url'; import { marked } from 'marked';
const R = fileURLToPath(new URL('../', import.meta.url));
const md = fs.readFileSync(R + 'RAPORT.md', 'utf8');
const P = [['home', 'Homepage'], ['cat_proteine', 'Categorie proteine'], ['cat_creatina', 'Categorie creatină'], ['cat_preworkout', 'Categorie pre-workout'], ['prod_whey', 'Produs whey'], ['prod_creatina', 'Produs creatină'], ['prod_preworkout', 'Produs pre-workout'], ['prod_amino', 'Produs EAA'], ['prod_omega3', 'Produs omega-3'], ['cautare', 'Căutare „proteina”'], ['cos', 'Coș'], ['blog', 'Blog'], ['articol', 'Articol'], ['despre', 'Despre noi'], ['contact', 'Contact'], ['livrare', 'Livrare'], ['retur', 'Retur'], ['faq', 'FAQ / pagina AI'], ['p404', 'Pagina 404']];
const fig = (s, k, v, lab) => `<figure><a href="screenshots/${s}_${k}_${v}.jpg" target="_blank"><img loading="lazy" src="screenshots/${s}_${k}_${v}_viewport.jpg" alt="${lab}: ${s === 'genius' ? 'Genius' : 'Prime'}, ${v}"></a><figcaption>${s === 'genius' ? 'Genius' : 'Prime'} · ${v}</figcaption></figure>`;
const gal = P.map(([k, lab]) => `<section class="pair"><h3>${lab}</h3><div class="row desk">${fig('genius', k, 'desktop', lab)}${fig('prime', k, 'desktop', lab)}</div><div class="row mob">${fig('genius', k, 'mobil', lab)}${fig('prime', k, 'mobil', lab)}</div></section>`).join('\n');
const body = marked.parse(md).replace('<h2>8. Anexe</h2>', `<h2 id="capturi">Capturi de ecran (primul ecran; click = pagina întreagă)</h2>${gal}\n<h2>8. Anexe</h2>`);
const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Genius vs Prime – analiză 16.11.2026</title>
<style>
:root{--bg:#fff;--fg:#1b1b1f;--mut:#5c5f66;--line:#e3e4e8;--acc:#ec1e24;--soft:#f6f6f8}
@media (prefers-color-scheme:dark){:root{--bg:#141417;--fg:#ececf0;--mut:#a3a6ad;--line:#2c2d33;--soft:#1d1e22}}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
main{max-width:1100px;margin:0 auto;padding:24px 16px 80px}
h1{font-size:1.9rem;line-height:1.25;border-bottom:4px solid var(--acc);padding-bottom:.4em}
h2{margin-top:2.2em;border-bottom:1px solid var(--line);padding-bottom:.25em}h3{margin-top:1.6em}
table{border-collapse:collapse;width:100%;display:block;overflow-x:auto;font-size:.9rem;margin:1em 0}
th,td{border:1px solid var(--line);padding:6px 8px;vertical-align:top;text-align:left}th{background:var(--soft)}
code{background:var(--soft);padding:1px 4px;border-radius:4px;font-size:.88em;word-break:break-word}
.pair{border:1px solid var(--line);border-radius:10px;padding:8px 14px 14px;margin:16px 0}
.row{display:grid;gap:12px;margin-top:8px}.desk{grid-template-columns:1fr 1fr}.mob{grid-template-columns:repeat(2,minmax(0,220px))}
figure{margin:0}figure img{width:100%;height:auto;border:1px solid var(--line);border-radius:6px;display:block}
figcaption{font-size:.8rem;color:var(--mut)}
@media (max-width:640px){.desk{grid-template-columns:1fr}}
</style></head><body><main>${body}</main></body></html>`;
fs.writeFileSync(R + 'RAPORT.html', html); console.log('RAPORT.html', Math.round(html.length / 1024), 'KB');
