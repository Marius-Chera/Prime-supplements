// Coada Pinterest: completează programarea până la limita de 100 de pinuri programate.
// Pasul 1: node build-csv-coada.mjs --free <N> [--from YYYY-MM-DD]
//   → coada/pinterest-coada.csv (N pinuri: produs, haină, articol pe rând) + coada/ultima.json
// Pasul 2 (doar după „Încărcare reușită” în Pinterest): node build-csv-coada.mjs --confirm
//   → marchează pinurile din ultima.json ca programat_pinterest în lista.json.
import fs from 'fs';
const CDN = 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/';
const SRC = [
  { dir: 'pinuri-produse', board: () => 'Produse Prime Supplements' },
  { dir: 'pinuri-haine', board: () => 'Haine de sală Prime' },
  { dir: 'pinuri-articole', board: a => a.board },
];
// Grila zilnică în UTC (România = UTC+2): 6 locuri pentru articole + 6 locuri suplimentare.
const SLOTS = ['06:00', '09:00', '12:00', '15:00', '17:00', '19:00', '08:00', '10:30', '14:00', '16:00', '18:30', '20:00'].sort();
const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const load = d => JSON.parse(fs.readFileSync(d + '/lista.json', 'utf8'));
const save = (d, l) => fs.writeFileSync(d + '/lista.json', JSON.stringify(l, null, 1));
fs.mkdirSync('coada', { recursive: true });

if (process.argv.includes('--confirm')) {
  const last = JSON.parse(fs.readFileSync('coada/ultima.json', 'utf8'));
  for (const s of SRC) {
    const l = load(s.dir); let n = 0;
    for (const a of l) { const x = last.items.find(y => y.dir === s.dir && y.file === a.file); if (x) { a.programat_pinterest = true; a.publish = x.publish; n++; } }
    save(s.dir, l); console.log(s.dir, 'marcate', n);
  }
  last.confirmat = new Date().toISOString(); fs.writeFileSync('coada/ultima.json', JSON.stringify(last, null, 1));
  process.exit(0);
}

const free = parseInt(arg('--free') ?? '0', 10);
const tomorrow = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
const from = arg('--from') || tomorrow;
const lists = SRC.map(s => ({ ...s, l: load(s.dir) }));
const taken = new Set(lists.flatMap(s => s.l.filter(a => a.programat_pinterest).map(a => a.publish)));
const queues = lists.map(s => s.l.filter(a => !a.programat_pinterest && !a.postat_acum)
  .map(a => ({ a, dir: s.dir, board: s.board(a) })));
const order = []; while (queues.some(q => q.length)) for (const q of queues) { const x = q.shift(); if (x) order.push(x); }
const pick = order.slice(0, Math.max(0, free));
const items = []; let day = new Date(from + 'T00:00:00Z'); let i = 0;
while (items.length < pick.length && i < 400) {
  for (const s of SLOTS) {
    if (items.length >= pick.length) break;
    const t = day.toISOString().slice(0, 10) + 'T' + s + ':00';
    if (taken.has(t) || new Date(t + 'Z') < new Date(Date.now() + 3 * 3600e3)) continue;
    const p = pick[items.length]; items.push({ dir: p.dir, file: p.a.file, title: p.a.title, board: p.board, publish: t, a: p.a });
  }
  day.setUTCDate(day.getUTCDate() + 1); i++;
}
const esc = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
const rows = [['Title', 'Media URL', 'Pinterest board', 'Thumbnail', 'Description', 'Link', 'Publish date', 'Keywords'],
  ...items.map(x => [x.a.title, CDN + x.a.file, x.board, '', x.a.description, x.a.link, x.publish, x.a.keywords])];
fs.writeFileSync('coada/pinterest-coada.csv', '﻿' + rows.map(r => r.map(esc).join(',')).join('\r\n'));
fs.writeFileSync('coada/ultima.json', JSON.stringify({ creat: new Date().toISOString(), free, items: items.map(({ a, ...x }) => x) }, null, 1));
const left = order.length - items.length;
console.log(`CSV: ${items.length} pinuri` + (items.length ? ` (${items[0].publish} → ${items.at(-1).publish})` : '') + `; rămân în coadă: ${left}`);
