// Generează pagina-produs-vizuala/TOATE-PRODUSELE.md din inventar.json + date/*.json + poze/jpg/index.json.
// Rulare: node pagina-produs-vizuala/scripts/inventar.mjs   (doar citește fișiere locale, nu atinge magazinul)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const inv = JSON.parse(readFileSync(join(root, 'inventar.json'), 'utf8'));
const poze = JSON.parse(readFileSync(join(root, 'poze', 'jpg', 'index.json'), 'utf8'));
const scrise = existsSync(join(root, 'scrise-pilot.json')) ? JSON.parse(readFileSync(join(root, 'scrise-pilot.json'), 'utf8')) : {};
const cuv = s => (s.match(/[\p{L}\d][\p{L}\d’'-]*/gu) || []).length;

const rows = [];
let nPag = 0, nCur = 0, nSp = 0, nScris = 0;
for (const [h, id, titlu] of inv.produse) {
  const f = join(root, 'date', h + '.json');
  const d = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null;
  const url = d?.imagine?.url || '';
  const sportiva = /sportiv|sedinta-foto/.test(url);
  const disp = poze.filter(p => p.handle === h && p.women).map(p => p.file);
  const c = d?.curiozitati;
  const w = c ? cuv([c.intro, ...(c.sectiuni || []).flatMap(s => [s.intrebare, s.raspuns])].join(' ')) : 0;
  if (d) nPag++; if (c) nCur++; if (sportiva) nSp++; if (scrise[h]) nScris++;
  rows.push(`| ${h} | ${id} | ${titlu} | ${d ? 'da' : '**nu**'} | ${c ? `da (${w})` : '**nu**'} | ${sportiva ? 'da' : disp.length ? `în repo: ${disp[0]}` : '**nu**'} | ${scrise[h] || '–'} |`);
}

const md = `# Toate produsele – pagina vizuală + „Curiozități” (tema PILOT 194315649399)

Generat de \`scripts/inventar.mjs\` (${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC). Sursa listei: \`inventar.json\` (${inv.citit}).
Excluse: ${inv.excluse}.

Rezumat: **${inv.produse.length} produse**; JSON pagină vizuală: ${nPag}; cu Curiozități: ${nCur}; cu sportivă în dreapta: ${nSp}; scrise pe PILOT (metafield) cu versiunea curentă: ${nScris}.

Coloane: *JSON* = \`date/<handle>.json\` există; *Curiozități* = câmpul \`curiozitati\` (în paranteză numărul de cuvinte); *Sportivă* = \`imagine.url\` e o poză cu sportivă (sau ce poză există în \`poze/jpg\`); *PILOT* = data scrierii metafield-ului cu versiunea curentă.

| Handle | ID | Produs | JSON | Curiozități | Sportivă | PILOT |
|---|---|---|---|---|---|---|
${rows.join('\n')}
`;
writeFileSync(join(root, 'TOATE-PRODUSELE.md'), md);
console.log(`${inv.produse.length} produse; JSON ${nPag}; curiozități ${nCur}; sportivă ${nSp}; scrise ${nScris}`);
