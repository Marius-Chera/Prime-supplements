// Descarcă pozele candidate din magazin (originalul, fără redimensionare) în D:/Prime Supplements/backup-poze-magazin-2026-11-16-lot2/
// (servesc și ca backup înainte de înlocuire). Citește magazin/catalog/candidate.json; scrie magazin/catalog/candidate-local.json
import fs from 'node:fs';
const C = JSON.parse(fs.readFileSync('magazin/catalog/candidate.json', 'utf8')).filter((i) => i.type);
const DIR = 'D:/Prime Supplements/backup-poze-magazin-2026-11-16-lot2/';
fs.mkdirSync(DIR, { recursive: true });
const out = [];
for (const [k, i] of C.entries()) {
  const name = i.url.split('?')[0].split('/').pop();
  const f = DIR + name;
  if (!fs.existsSync(f)) {
    const r = await fetch(i.url.split('?')[0], { headers: { accept: 'image/png,image/jpeg' } });
    if (!r.ok) { console.log('EROARE', r.status, name); continue; }
    fs.writeFileSync(f, Buffer.from(await r.arrayBuffer()));
    await new Promise((s) => setTimeout(s, 150));
  }
  out.push({ nr: k + 1, ...i, filename: name, local: f });
}
fs.writeFileSync('magazin/catalog/candidate-local.json', JSON.stringify(out, null, 1));
console.log('ok', out.length);
