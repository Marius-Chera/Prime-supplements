// Copie de siguranță: descarcă pozele ACTUALE din magazin (cele care vor fi înlocuite), ca să le putem pune înapoi.
// Salvează în D:/Prime Supplements/backup-poze-magazin-2026-11-16/ (în afara repo-ului) + magazin/backup-index.json
// Sursa listei: magazin/manifest-sursa.json = [[mediaId, produs, urlActual, fisierNou], ...]
import fs from 'node:fs';
const M = JSON.parse(fs.readFileSync('magazin/manifest-sursa.json', 'utf8'));
const DIR = 'D:/Prime Supplements/backup-poze-magazin-2026-11-16/';
fs.mkdirSync(DIR, { recursive: true });
const idx = [];
for (const [id, prod, url] of M) {
  const name = url.split('/').pop();
  const f = DIR + name;
  if (!fs.existsSync(f)) {
    const r = await fetch(url, { headers: { accept: 'image/png,image/jpeg' } });
    if (!r.ok) throw new Error(r.status + ' ' + url);
    fs.writeFileSync(f, Buffer.from(await r.arrayBuffer()));
    await new Promise((s) => setTimeout(s, 300));
  }
  idx.push({ id, prod, url, backup: f, bytes: fs.statSync(f).size });
}
fs.writeFileSync('magazin/backup-index.json', JSON.stringify(idx, null, 1));
console.log('backup', idx.length, Math.round(idx.reduce((s, x) => s + x.bytes, 0) / 1e6) + ' MB');
