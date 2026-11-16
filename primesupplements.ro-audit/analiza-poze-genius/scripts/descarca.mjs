// Pas 1b: descarcă pozele produselor selectate la rezoluția originală (fără parametri de redimensionare),
// cerând explicit formatul original (Accept fără webp/avif), max 1 request/secundă.
// Scrie date/<site>-poze.json: [{handle, titlu, idx, url, alt, w, h, format, bytes, contentType, fisier}]
// Utilizare: node scripts/descarca.mjs genius|prime|nutriland
import fs from 'node:fs';
import path from 'node:path';
const site = process.argv[2] || 'genius';
const SEL = JSON.parse(fs.readFileSync('date/selectie.json', 'utf8'))[site];
const prods = JSON.parse(fs.readFileSync(`date/${site}-products.json`, 'utf8'));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = [];
const dir = `poze/${site}`;
fs.mkdirSync(dir, { recursive: true });
for (const sel of SEL) {
  const [handle, maxImg] = Array.isArray(sel) ? sel : [sel, 1];
  const p = prods.find((x) => x.handle === handle);
  if (!p) { console.log('LIPSĂ', handle); continue; }
  for (const [idx, img] of p.images.slice(0, maxImg).entries()) {
    const url = img.src.split('?')[0];
    const ext = path.extname(url).toLowerCase() || '.bin';
    const fisier = `${dir}/${handle}__${idx + 1}${ext}`;
    let bytes, contentType;
    if (fs.existsSync(fisier)) {
      bytes = fs.statSync(fisier).size; contentType = 'cache';
    } else {
      const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'image/png,image/jpeg,image/*;q=0.5' } });
      contentType = res.headers.get('content-type');
      const buf = Buffer.from(await res.arrayBuffer());
      bytes = buf.length;
      fs.writeFileSync(fisier, buf);
      await sleep(1100);
    }
    out.push({ handle, titlu: p.title, tip: p.product_type, creat: p.created_at.slice(0, 10), idx: idx + 1, url, alt: img.alt, w: img.width, h: img.height, format: ext.slice(1), bytes, contentType, fisier });
    console.log(handle, idx + 1, img.width + 'x' + img.height, (bytes / 1e6).toFixed(2) + ' MB', contentType);
  }
}
fs.writeFileSync(`date/${site}-poze.json`, JSON.stringify(out, null, 1));
