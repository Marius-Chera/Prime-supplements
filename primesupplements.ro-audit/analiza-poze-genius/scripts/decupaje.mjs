// Pas 4: decupaje mărite (zoom) pe zonele cu efecte. Regiuni în fracții din imagine: [x, y, w, h].
// Utilizare: node scripts/decupaje.mjs  -> decupaje/zoom-<nume>.png
import sharp from 'sharp';
const Z = [
  ['bcaa-capac', 'poze/genius/bcaa-x5-360g-26serv__1.png', [0.22, 0.03, 0.56, 0.22], 2],
  ['bcaa-banda-holo', 'poze/genius/bcaa-x5-360g-26serv__1.png', [0.22, 0.20, 0.30, 0.12], 3],
  ['bcaa-reflexie-podea', 'poze/genius/bcaa-x5-360g-26serv__1.png', [0.18, 0.78, 0.64, 0.22], 2],
  ['bcaa-margine-dreapta', 'poze/genius/bcaa-x5-360g-26serv__1.png', [0.68, 0.40, 0.12, 0.20], 4],
  ['bcaa-text-mic', 'poze/genius/bcaa-x5-360g-26serv__1.png', [0.26, 0.62, 0.22, 0.10], 4],
  ['isolate-capac-negru', 'poze/genius/isolate-x5-2000g-60serv__1.png', [0.30, 0.0, 0.40, 0.14], 3],
  ['isolate-umar-highlight', 'poze/genius/isolate-x5-2000g-60serv__1.png', [0.20, 0.10, 0.60, 0.22], 2],
  ['isolate-baza-reflexie', 'poze/genius/isolate-x5-2000g-60serv__1.png', [0.18, 0.80, 0.64, 0.20], 2],
  ['isolate-litere-holo', 'poze/genius/isolate-x5-2000g-60serv__1.png', [0.28, 0.42, 0.44, 0.10], 3],
  ['cell-scena', 'poze/genius/cell-x7-720g-45serv__2.png', [0.15, 0.55, 0.70, 0.40], 1.5],
  ['whey-plaja', 'poze/genius/whey-x5-2000g-61serv__2.jpg', [0.25, 0.30, 0.55, 0.60], 1.2],
  ['warcry-capac', 'poze/genius/warcry-400g__1.png', [0.20, 0.03, 0.60, 0.22], 2],
  ['baton-produs', 'poze/genius/whey-x5-protein-bar-48g__1.png', [0.0, 0.35, 0.6, 0.35], 1.5],
  ['prime-bcaa-capac', 'poze/prime/recovery-bcaa-500g__1.jpg', [0.25, 0.18, 0.50, 0.20], 2],
  ['prime-bcaa-baza', 'poze/prime/recovery-bcaa-500g__1.jpg', [0.22, 0.62, 0.56, 0.20], 2],
];
for (const [nume, f, [x, y, w, h], scale] of Z) {
  const m = await sharp(f).metadata();
  const left = Math.round(x * m.width), top = Math.round(y * m.height);
  const width = Math.round(w * m.width), height = Math.round(h * m.height);
  const outW = Math.min(1600, Math.round(width * Math.min(scale, 1600 / width)));
  // pentru zoom real: decupăm din original (3800 px) și redimensionăm doar dacă depășește 1600 px
  await sharp(f).flatten({ background: '#ff00ff' }).extract({ left, top, width, height }).resize(Math.min(outW, 1600)).png().toFile(`decupaje/zoom-${nume}.png`);
  console.log(nume, width + 'x' + height);
}
