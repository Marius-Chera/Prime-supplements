// Comparații înainte/după (demo, doar produse Prime) + detaliu 1:1 pe etichetă, ca dovadă că textul nu e deformat.
import sharp from 'sharp';
const P = ['recovery-bcaa-500g', 'pure-isolate-2000g', 'creatina-creapure'];
const lab = (t, w) => Buffer.from(`<svg width="${w}" height="56"><rect width="100%" height="100%" fill="#111"/><text x="20" y="37" font-size="26" font-family="Arial" font-weight="bold" fill="#fff">${t}</text></svg>`);
for (const p of P) {
  const a = await sharp(`poze/prime/${p}__1.jpg`).resize(1000, 1000, { fit: 'contain', background: '#fff' }).toBuffer();
  const b = await sharp(`demo/${p}-dupa.jpg`).resize(1000, 1000).toBuffer();
  await sharp({ create: { width: 2000, height: 1056, channels: 3, background: '#fff' } })
    .composite([{ input: lab('ÎNAINTE – poza actuală de pe site', 1000), left: 0, top: 0 }, { input: lab('DUPĂ – script (varianta E), fără editare manuală', 1000), left: 1000, top: 0 }, { input: a, left: 0, top: 56 }, { input: b, left: 1000, top: 56 }])
    .jpeg({ quality: 86 }).toFile(`demo/${p}-inainte-dupa.jpg`);
  // ce greutate are un export web realist (1500 px WebP) – cât ar servi Shopify
  const w = await sharp(`demo/${p}-dupa.jpg`).resize(1500).webp({ quality: 82 }).toFile(`demo/${p}-dupa-1500.webp`);
  console.log(p, 'webp 1500px', Math.round(w.size / 1024) + ' KB');
}
