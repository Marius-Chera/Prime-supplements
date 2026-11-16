// Construiește RAPORT-POZE.html din RAPORT-POZE.md și inserează imaginile (adnotate, decupaje, screenshot-uri, demo).
// Imaginile Genius stau în decupaje/ și screenshots/ (doar local, în .gitignore).
import fs from 'node:fs';
import { marked } from 'marked';
const md = fs.readFileSync('RAPORT-POZE.md', 'utf8');
let html = marked.parse(md);
const fig = (src, cap) => `<figure><img loading="lazy" src="${src}" alt="${cap.replace(/"/g, '')}"><figcaption>${cap}</figcaption></figure>`;
const grid = (...f) => `<div class="figs">${f.join('')}</div>`;
const insert = (afterHeadingText, block) => {
  const re = new RegExp(`(<h2[^>]*>[^<]*${afterHeadingText}[^<]*</h2>)`);
  html = html.replace(re, `$1\n${block}`);
};
insert('Catalogul efectelor', grid(
  fig('decupaje/adnotat-bcaa.jpg', 'BCAA-X5: efectele numerotate (randare 3D pe alb)'),
  fig('decupaje/adnotat-isolate.jpg', 'ISOLATE-X5: luciu de studio pe plastic negru, rim light, reflexie'),
  fig('decupaje/adnotat-cell.jpg', 'CELL-X7, poza 2: scenă 3D (jeleuri, stropi, podea udă)'),
  fig('decupaje/adnotat-plaja.jpg', 'WHEY-X5, poza 2: scenă probabil AI + borcane randate'),
) + '<h3>Zoom pe efecte (decupaje din originalul de 3800 px)</h3>' + grid(
  fig('decupaje/zoom-bcaa-reflexie-podea.png', 'Reflexia: lizibilă la contact, dâre verticale mai jos = blur fizic de randor'),
  fig('decupaje/zoom-bcaa-banda-holo.png', 'Banda holografică: gradient perfect neted, fără zgomot'),
  fig('decupaje/zoom-isolate-umar-highlight.png', 'Benzi speculare pe umărul negru: urmează exact geometria'),
  fig('decupaje/zoom-bcaa-margine-dreapta.png', 'Margine: eticheta se întunecă și se comprimă pe cilindru'),
  fig('decupaje/zoom-isolate-baza-reflexie.png', 'Baza ISOLATE-X5 și reflexia'),
  fig('decupaje/zoom-prime-bcaa-capac.png', 'Comparație: fotografie Prime (zgomot de senzor, fundal gri)'),
) + '<h3>Planșele de contact</h3>' + grid(
  fig('decupaje/plansa-genius.jpg', 'Genius: 61 de poze, același unghi, aceeași lumină'),
  fig('decupaje/plansa-prime.jpg', 'Prime: 29 de poze, fundal gri, mărime variabilă în cadru'),
));
insert('Ce e în imagine', grid(
  fig('screenshots/genius-card-A-fara-hover.png', 'Card Genius fără hover'),
  fig('screenshots/genius-card-B-hover.png', 'Card Genius la hover: apare a doua poză (singurul efect din cod pe card)'),
  fig('screenshots/genius-p-bcaa-x5-mobil.png', 'Pagina de produs pe mobil (390 px)'),
  fig('screenshots/genius-col-proteine-mobil.png', 'Categoria pe mobil'),
));
insert('Pozele lor vs pozele noastre', grid(
  fig('screenshots/genius-col-proteine-desktop.png', 'Genius – categoria Proteine (desktop)'),
  fig('screenshots/prime-col-proteine-desktop.png', 'Prime – categoria Proteine (desktop)'),
  fig('screenshots/genius-col-proteine-mobil.png', 'Genius pe mobil'),
  fig('screenshots/prime-col-proteine-mobil.png', 'Prime pe mobil'),
));
insert('Rezultatul demo', grid(
  fig('demo/recovery-bcaa-500g-inainte-dupa.jpg', 'Recovery BCAA: înainte / după script'),
  fig('demo/pure-isolate-2000g-inainte-dupa.jpg', 'Pure Isolate: înainte / după script'),
  fig('demo/creatina-creapure-inainte-dupa.jpg', 'Creatină Creapure: înainte / după script'),
  fig('demo/test-flacon-alb-magneziu-ESEC-decupare.jpg', 'Limita: flacon alb pe gri – decuparea automată mănâncă marginile'),
) + '<p><a href="demo/card-css.html">Deschide demo-ul CSS pe card (varianta D) →</a></p>');
const page = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Analiză poze Genius</title><style>
:root{--bg:#fff;--text:#14171f;--muted:#5d6472;--line:#e3e6eb;--accent:#ec1e24;--code:#f1f3f6}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#121418;--text:#e9ecf1;--muted:#a3abb8;--line:#2a2f37;--code:#1d2128}}
:root[data-theme="dark"]{--bg:#121418;--text:#e9ecf1;--muted:#a3abb8;--line:#2a2f37;--code:#1d2128}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.6 Poppins,system-ui,Arial,sans-serif}
main{max-width:1100px;margin:0 auto;padding:24px 16px 80px}
h1{font-size:28px;line-height:1.25}h2{margin-top:44px;border-bottom:2px solid var(--accent);padding-bottom:6px}
table{border-collapse:collapse;width:100%;font-size:14px;display:block;overflow-x:auto}th,td{border:1px solid var(--line);padding:7px 9px;vertical-align:top;text-align:left}th{background:var(--code)}
code{background:var(--code);padding:1px 5px;border-radius:4px;font-size:13px}
.figs{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;margin:16px 0}
figure{margin:0;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff}figure img{width:100%;display:block}
figcaption{font-size:13px;color:#333;padding:8px 10px;background:#f7f8fa}
a{color:var(--accent)}hr{border:0;border-top:1px solid var(--line);margin:32px 0}
</style></head><body><main>${html}</main></body></html>`;
fs.writeFileSync('RAPORT-POZE.html', page);
console.log('ok', Math.round(page.length / 1024) + ' KB');
