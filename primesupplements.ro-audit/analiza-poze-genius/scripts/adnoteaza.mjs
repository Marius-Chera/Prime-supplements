// Imagini adnotate pentru raportul HTML (uz intern): săgeți + etichete numerotate pe efecte.
// Coordonatele sunt în spațiul imaginii redimensionate la 1000 px lățime.
import sharp from 'sharp';
const A = [
  ['adnotat-bcaa', 'poze/genius/bcaa-x5-360g-26serv__1.png', [
    [1, 'Bandă holografică (folie) – gradient curcubeu randat', 330, 222, 60, 120],
    [2, 'Capac alb mat: lumină moale de sus, fără zgomot', 500, 70, 760, 40],
    [3, 'Text perfect drept + curbat corect pe cilindru', 470, 380, 760, 300],
    [4, 'Splash = desen tipărit pe etichetă, nu efect', 640, 560, 840, 470],
    [5, 'Reflexie pe podea, blur care crește cu distanța', 450, 900, 120, 960],
    [6, 'Umbră de contact foarte fină sub bază', 500, 846, 800, 980],
  ]],
  ['adnotat-isolate', 'poze/genius/isolate-x5-2000g-60serv__1.png', [
    [1, 'Benzi speculare verticale (2 softbox-uri / HDRI)', 425, 200, 120, 60],
    [2, 'Plastic negru lucios: reflexii fizic corecte pe umăr', 640, 210, 820, 120],
    [3, 'Litere cu contur holografic (folie)', 520, 445, 760, 380],
    [4, 'Rim light: contur deschis pe marginea borcanului', 736, 640, 880, 560],
    [5, 'Reflexie pe podea + întunecare spre contact', 520, 960, 130, 900],
  ]],
  ['adnotat-cell', 'poze/genius/cell-x7-720g-45serv__2.png', [
    [1, 'Podea umedă cu reflexii colorate (scenă 3D)', 520, 900, 130, 960],
    [2, 'Jeleuri 3D cu subsurface scattering', 330, 690, 120, 560],
    [3, 'Stropi de apă (simulare sau stoc compus)', 250, 520, 90, 420],
    [4, 'Fundal negru + lumini de contur', 860, 200, 760, 90],
  ]],
  ['adnotat-plaja', 'poze/genius/whey-x5-2000g-61serv__2.jpg', [
    [1, 'Fundal tip AI/stoc: palmieri, mare, bokeh', 150, 180, 60, 60],
    [2, 'Text mic neclar/„topit” – semn de generare AI', 300, 690, 90, 870],
    [3, 'Pahar + spumă cu textură nerealistă', 820, 650, 820, 950],
    [4, 'Borcanele: etichete corecte = randare/compoziție', 640, 330, 760, 120],
  ]],
];
for (const [nume, f, marks] of A) {
  const m = await sharp(f).metadata();
  const W = 1000, H = Math.round(m.height * W / m.width);
  const base = await sharp(f).flatten({ background: '#ffffff' }).resize(W).toBuffer();
  let svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><defs><marker id="a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ff1f5a"/></marker></defs>`;
  for (const [n, txt, tx, ty, lx, ly] of marks) {
    const w = Math.min(470, 18 + txt.length * 8.2);
    const bx = Math.max(4, Math.min(W - w - 4, lx - w / 2)), by = Math.max(4, Math.min(H - 34, ly - 15));
    svg += `<line x1="${lx}" y1="${ly}" x2="${tx}" y2="${ty}" stroke="#ff1f5a" stroke-width="3" marker-end="url(#a)"/>`;
    svg += `<rect x="${bx}" y="${by}" width="${w}" height="30" rx="6" fill="#111" opacity=".86"/><text x="${bx + 10}" y="${by + 20}" font-family="Arial" font-size="14" fill="#fff"><tspan font-weight="bold" fill="#ff7aa0">${n}.</tspan> ${txt}</text>`;
  }
  svg += '</svg>';
  await sharp(base).composite([{ input: Buffer.from(svg) }]).jpeg({ quality: 84 }).toFile(`decupaje/${nume}.jpg`);
  console.log(nume);
}
