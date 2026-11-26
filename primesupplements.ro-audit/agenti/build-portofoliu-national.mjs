// Portofoliu de prezentare a firmei, cu harta partenerilor B2B pe județe (26.11.2026).
// Date: agenti/data/parteneri-pj-2026-11-26.json (din SAGA, firme cu CUI facturate 01.01.2025–31.10.2026)
//       agenti/data/harta-judete-svg.json (din build-harta-judete.mjs)
// Imagini locale: agenti/PORTOFOLIU-NATIONAL-2026-11-26-img/ (JPEG, ca PDF-ul să rămână mic)
// Rulare: node agenti/build-portofoliu-national.mjs  → HTML; PDF cu Chrome headless (vezi JURNAL 26.11).
// Regulă: Suci Lucian NU apare (pleacă de la Prime) – nici nume, nici poze; cadrele cu bărbați neidentificați nu se folosesc.
import { readFileSync, writeFileSync } from "node:fs";

const DATA = "2026-11-26";
const P = JSON.parse(readFileSync(new URL(`./data/parteneri-pj-${DATA}.json`, import.meta.url), "utf8"));
const M = JSON.parse(readFileSync(new URL("./data/harta-judete-svg.json", import.meta.url), "utf8"));
const IMG = `PORTOFOLIU-NATIONAL-${DATA}-img`;
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Reședințele de județ (lat, lon) – pin-urile stau în orașul principal al județului
const SEAT = {
  AB: ["Alba Iulia", 46.07, 23.58], AR: ["Arad", 46.18, 21.31], AG: ["Pitești", 44.86, 24.87], BC: ["Bacău", 46.57, 26.91],
  BH: ["Oradea", 47.07, 21.92], BN: ["Bistrița", 47.13, 24.50], BT: ["Botoșani", 47.75, 26.67], BV: ["Brașov", 45.65, 25.60],
  BR: ["Brăila", 45.27, 27.96], B: ["București", 44.43, 26.10], BZ: ["Buzău", 45.15, 26.82], CS: ["Reșița", 45.30, 21.89],
  CL: ["Călărași", 44.20, 27.33], CJ: ["Cluj-Napoca", 46.77, 23.59], CT: ["Constanța", 44.18, 28.63], CV: ["Sf. Gheorghe", 45.86, 25.79],
  DB: ["Târgoviște", 44.93, 25.46], DJ: ["Craiova", 44.32, 23.80], GL: ["Galați", 45.44, 28.05], GR: ["Giurgiu", 43.90, 25.97],
  GJ: ["Târgu Jiu", 45.04, 23.27], HR: ["Miercurea Ciuc", 46.36, 25.80], HD: ["Deva", 45.88, 22.90], IL: ["Slobozia", 44.56, 27.36],
  IS: ["Iași", 47.16, 27.59], IF: ["Ilfov", 44.50, 25.66], MM: ["Baia Mare", 47.66, 23.58], MH: ["Drobeta-Tr. Severin", 44.63, 22.66],
  MS: ["Târgu Mureș", 46.54, 24.56], NT: ["Piatra Neamț", 46.93, 26.37], OT: ["Slatina", 44.43, 24.37], PH: ["Ploiești", 44.94, 26.02],
  SM: ["Satu Mare", 47.79, 22.89], SJ: ["Zalău", 47.19, 23.06], SB: ["Sibiu", 45.80, 24.15], SV: ["Suceava", 47.65, 26.26],
  TR: ["Alexandria", 43.97, 25.33], TM: ["Timișoara", 45.75, 21.23], TL: ["Tulcea", 45.18, 28.80], VS: ["Vaslui", 46.64, 27.73],
  VL: ["Râmnicu Vâlcea", 45.10, 24.37], VN: ["Focșani", 45.70, 27.18],
};
const NUME = {
  AB: "Alba", AR: "Arad", AG: "Argeș", BC: "Bacău", BH: "Bihor", BN: "Bistrița-Năsăud", BT: "Botoșani", BV: "Brașov", BR: "Brăila",
  B: "București", BZ: "Buzău", CS: "Caraș-Severin", CL: "Călărași", CJ: "Cluj", CT: "Constanța", CV: "Covasna", DB: "Dâmbovița",
  DJ: "Dolj", GL: "Galați", GR: "Giurgiu", GJ: "Gorj", HR: "Harghita", HD: "Hunedoara", IL: "Ialomița", IS: "Iași", IF: "Ilfov",
  MM: "Maramureș", MH: "Mehedinți", MS: "Mureș", NT: "Neamț", OT: "Olt", PH: "Prahova", SM: "Satu Mare", SJ: "Sălaj", SB: "Sibiu",
  SV: "Suceava", TR: "Teleorman", TM: "Timiș", TL: "Tulcea", VS: "Vaslui", VL: "Vâlcea", VN: "Vrancea",
};
const proj = (lat, lon) => [(lon - M.proj.minLon) * M.proj.cos * M.proj.k, (M.proj.maxLat - lat) * M.proj.k];

const cnt = P.firme_pe_judet;
const judeteCu = Object.keys(cnt).length;
const parteneri = P.parteneri.map(([brand, oras, jud, tip, top, nota]) => ({ brand, oras, jud, tip, top: !!top, nota }));
const sali = parteneri.filter(p => p.tip === "lant" || p.tip === "sala");
const cluburi = parteneri.filter(p => p.tip === "club");
const magazine = parteneri.filter(p => p.tip === "magazin");

// ---------- Harta ----------
const maxC = Math.max(...Object.values(cnt));
const fill = c => !c ? "#e9e9e9" : c >= 20 ? "#b5121b" : c >= 8 ? "#ec1e24" : c >= 4 ? "#f2595d" : "#f7a3a5";
const paths = Object.entries(M.judete).map(([cod, j]) =>
  `<path d="${j.d}" fill="${fill(cnt[cod])}" fill-rule="evenodd" stroke="#fff" stroke-width="1.6"><title>${NUME[cod]}</title></path>`).join("");
// numele sălilor-vedetă lângă pin
const vedete = {};
for (const p of parteneri) if (p.top && p.tip !== "club" && p.tip !== "magazin") (vedete[p.jud] ??= []).includes(p.brand) || vedete[p.jud].push(p.brand);
// unde scriem eticheta (dx, dy, aliniere) ca să nu se suprapună
const LBL = {
  B: [26, 2, "start"], SB: [0, 40, "middle"], TM: [0, 40, "middle"], BH: [-26, -6, "end"], MS: [24, 0, "start"],
  BN: [24, -14, "start"], MM: [24, -16, "start"], SM: [-22, -14, "end"], AB: [-26, -4, "end"], AG: [0, 34, "middle"],
  DJ: [0, 34, "middle"], MH: [-6, 34, "middle"], BR: [22, -2, "start"], BC: [22, 0, "start"], CJ: [0, 36, "middle"],
};
const pins = Object.entries(cnt).sort((a, b) => a[1] - b[1]).map(([cod, c]) => {
  const [, lat, lon] = SEAT[cod];
  const [x, y] = proj(lat, lon);
  const r = 13 + Math.sqrt(c / maxC) * 15;
  const v = vedete[cod];
  const [dx, dy, an] = LBL[cod] || [0, r + 18, "middle"];
  const label = v ? `<text x="${(x + dx).toFixed(1)}" y="${(y + dy).toFixed(1)}" text-anchor="${an}" class="lb">${v.slice(0, 4).map((b, i) => `<tspan x="${(x + dx).toFixed(1)}" dy="${i ? 17 : 0}">${esc(b)}</tspan>`).join("")}</text>` : "";
  return `<g><path d="M${x.toFixed(1)},${(y + 2).toFixed(1)} l-${(r * .55).toFixed(1)},-${(r * 1.05).toFixed(1)} a${r.toFixed(1)},${r.toFixed(1)} 0 1,1 ${(r * 1.1).toFixed(1)},0 z" class="pin" transform="translate(0,${(-r * .55).toFixed(1)})"/>` +
    `<text x="${x.toFixed(1)}" y="${(y - r * 1.55 + 5).toFixed(1)}" text-anchor="middle" class="pn">${c}</text>${label}</g>`;
}).join("");
const top = Object.entries(cnt).sort((a, b) => b[1] - a[1]).slice(0, 10);
const bars = top.map(([j, c]) => `<div class="bar"><span>${esc(NUME[j])}</span><i style="width:${(c / top[0][1] * 100).toFixed(0)}%"></i><b>${c}</b></div>`).join("");
const map = `<svg class="map" viewBox="-10 -70 ${M.w + 20} ${M.h + 110}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Harta partenerilor B2B Prime Supplements pe județe">
  <style>.pin{fill:#111;stroke:#fff;stroke-width:2.5}.pn{fill:#fff;font:700 17px Poppins,Arial,sans-serif}.lb{fill:#111;font:600 14.5px Poppins,Arial,sans-serif;paint-order:stroke;stroke:#fff;stroke-width:5px;stroke-linejoin:round}</style>
  ${paths}${pins}</svg>`;

// ---------- Listele ----------
const byJud = {};
for (const p of [...sali, ...magazine]) (byJud[p.jud] ??= []).push(p);
const judOrd = Object.keys(byJud).sort((a, b) => (cnt[b] || 0) - (cnt[a] || 0) || NUME[a].localeCompare(NUME[b], "ro"));
const listaJud = judOrd.map(j => `<div class="jl"><b>${esc(NUME[j])}<span>${cnt[j]} ${cnt[j] === 1 ? "firmă" : "firme"}</span></b>${
  byJud[j].map(p => `<i class="${p.top ? "t" : ""}">${esc(p.brand)}${p.oras && !["Bistrița-Năsăud", "Argeș", "Alba", "Mureș", "Timiș", "Olt", "Sălaj", "Maramureș", "Ilfov"].includes(p.oras) ? ` <small>${esc(p.oras)}</small>` : ""}</i>`).join("")}</div>`).join("");
const fara = Object.keys(cnt).filter(j => !byJud[j]).map(j => NUME[j]);

const lanturi = [...sali.filter(p => p.top && p.tip === "lant"), ...sali.filter(p => p.top && p.tip !== "lant")];
const tile = p => `<div class="tile ${p.tip === "lant" ? "lant" : ""}"><b>${esc(p.brand)}</b><span>${esc(p.nota || p.oras)}</span></div>`;
const clubTile = p => `<div class="club ${p.top ? "top" : ""}"><b>${esc(p.brand)}</b><span>${esc(p.oras)}</span></div>`;

// ---------- Produse ----------
const produse = [
  ["Prime Whey", "Proteină din zer · 1 și 2 kg · 7 arome", "prime-whey-1000g"],
  ["Pure Isolate", "Izolat proteic din zer · 2 kg", "pure-isolate-2000g"],
  ["Prime Whey Go", "Proteină la plic · 15 × 30 g", "prime-whey-go"],
  ["Emperor Mass", "Gainer cu 40 % proteină · 3 kg", "emperor-mass_3000g"],
  ["Creatine Creapure®", "Creatină monohidrată · 300 și 500 g", "creatina-creapure"],
  ["Creatină micronizată", "Monohidrat fără aromă · 300 g", "creatina-monohidrat-micronized-300g-fara-aroma"],
  ["Creatine Ready To Go", "Creatină la plic · 25 × 10 g", "creatine-ready-to-go-plicuri-prime-supplements"],
  ["EAA", "Aminoacizi esențiali · 500 g", "eaa-aminoacizi-esentiali"],
  ["Recovery BCAA 4:1:1", "Aminoacizi ramificați · 500 g", "recovery-bcaa-500g"],
  ["Nitrox 3D", "Pre-workout · 500 g", "nitrox"],
  ["Combat Pro 2.0", "Pre-workout concentrat · 660 g", "combat-pro-2-0-660g-30-serv"],
  ["Cluster Bomb", "Intra-workout Cluster Dextrin® · 1 kg", "cluster-bomb-1000g"],
  ["Energy Pump Shot", "Pre-workout lichid · 20 × 25 ml", "energy-pump"],
  ["Thermo Core", "Capsule cu L-carnitină și ceai verde", "thermo-core-120-caps"],
  ["Creamy Rice", "Cremă de orez · 1 kg · 7 arome", "crema-de-orez-tort-de-ciocolata"],
  ["Delicious Bar", "Baton proteic · 12 × 55 g", "baton-proteic-ciocolata-fructe-de-padure"],
  ["Magneziu bisglicinat", "Prime Health · 80 capsule", "magneziu-bisglicinat-80-caps"],
  ["Vitamina D3 + K2", "Prime Health · 80 capsule", "vitamina-d3-k2"],
  ["Complete Collagen", "Colagen hidrolizat lichid · 500 ml", "complete-collagen"],
  ["Ashwagandha KSM-66®", "Prime Health · 80 capsule", "ashwagandha-ksm-66"],
];
const prodCards = produse.map(([n, d, h]) => `<div class="pc"><img src="${IMG}/produs-${h}.jpg" alt="${esc(n)}"><b>${esc(n)}</b><span>${esc(d)}</span></div>`).join("");

const logo = `<img class="logo" src="${IMG}/logo-prime-alb.svg" alt="Prime Supplements">`;
const head = (n, t) => `<div class="ph"><span>${t}</span><span>${String(n).padStart(2, "0")}</span></div>`;

const html = `<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Prime Supplements – Prezentarea companiei și rețeaua de parteneri 2026</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  :root { --red:#ec1e24; --dark:#b5121b; --black:#0d0d0d; --grey:#6b6b6b; --line:#e4e4e4; --bg:#f5f5f5; }
  * { box-sizing:border-box; }
  html,body { margin:0; padding:0; font-family:Poppins,"Segoe UI",Arial,sans-serif; color:var(--black); font-size:11px; line-height:1.5; background:#888; }
  img { display:block; max-width:100%; }
  .page { width:210mm; height:297mm; margin:10mm auto; background:#fff; position:relative; overflow:hidden; padding:16mm 14mm 14mm; }
  .ph { position:absolute; top:6mm; left:14mm; right:14mm; display:flex; justify-content:space-between; font-size:8.5px; letter-spacing:2px; text-transform:uppercase; color:var(--grey); font-weight:600; }
  .pf { position:absolute; bottom:6mm; left:14mm; right:14mm; display:flex; justify-content:space-between; font-size:8.5px; color:var(--grey); border-top:1px solid var(--line); padding-top:2.5mm; }
  .kick { color:var(--red); text-transform:uppercase; letter-spacing:2.5px; font-weight:700; font-size:10px; margin:0 0 4px; }
  h1 { font-size:44px; line-height:1.02; margin:0; text-transform:uppercase; font-weight:900; letter-spacing:.5px; }
  h2 { font-size:26px; line-height:1.1; margin:0 0 8px; text-transform:uppercase; font-weight:800; }
  h2 span, h1 span { color:var(--red); }
  h3 { font-size:13px; text-transform:uppercase; letter-spacing:1px; margin:0 0 6px; }
  p { margin:0 0 8px; }
  .lead { font-size:12.5px; color:#222; }

  /* copertă */
  .cover { padding:0; background:var(--black); color:#fff; }
  .cover .bgimg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:60% 20%; opacity:.62; }
  .cover .shade { position:absolute; inset:0; background:linear-gradient(180deg,rgba(0,0,0,.85) 0%,rgba(0,0,0,.15) 34%,rgba(0,0,0,.15) 52%,rgba(0,0,0,.95) 80%); }
  .cover .top { position:absolute; top:14mm; left:14mm; right:14mm; display:flex; justify-content:space-between; align-items:center; }
  .cover .logo { height:46px; width:auto; }
  .cover .top small { font-size:9px; letter-spacing:2px; text-transform:uppercase; color:#ddd; text-align:right; }
  .cover .bottom { position:absolute; left:14mm; right:14mm; bottom:16mm; }
  .cover .kick { color:var(--red); }
  .cover h1 { font-size:50px; }
  .cover .sub { font-size:14px; color:#eee; max-width:150mm; margin:10px 0 18px; }
  .cover .stats { display:grid; grid-template-columns:repeat(4,1fr); border-top:3px solid var(--red); }
  .cover .stats div { padding:10px 10px 0 0; }
  .cover .stats b { display:block; font-size:30px; font-weight:800; line-height:1; }
  .cover .stats span { font-size:9.5px; text-transform:uppercase; letter-spacing:1px; color:#ccc; }

  /* despre */
  .two { display:grid; grid-template-columns:1.05fr 1fr; gap:9mm; align-items:start; }
  .photo { width:100%; object-fit:cover; border-radius:4px; }
  .facts { display:grid; grid-template-columns:repeat(3,1fr); gap:3mm; margin:6mm 0; }
  .facts div { background:var(--black); color:#fff; padding:9px 11px; border-bottom:3px solid var(--red); }
  .facts b { display:block; font-size:24px; font-weight:800; line-height:1.1; }
  .facts span { font-size:9px; text-transform:uppercase; letter-spacing:.8px; color:#cfcfcf; }
  .vals { display:grid; grid-template-columns:1fr 1fr; gap:3mm 5mm; }
  .vals div { border-left:3px solid var(--red); padding:2px 0 2px 9px; }
  .vals b { display:block; text-transform:uppercase; font-size:10px; letter-spacing:.8px; }
  .timeline { display:grid; grid-template-columns:repeat(4,1fr); gap:3mm; margin-top:7mm; }
  .timeline div { border-top:3px solid var(--black); padding-top:5px; font-size:10px; }
  .timeline b { display:block; color:var(--red); font-size:15px; }

  /* hartă */
  .mapwrap { position:relative; margin:1mm -9mm 0; }
  .map { width:100%; height:auto; }
  .legend { display:flex; gap:12px; flex-wrap:wrap; align-items:center; font-size:9.5px; color:#333; margin:1mm 0 3mm; }
  .legend i { display:inline-block; width:12px; height:12px; border-radius:2px; vertical-align:-2px; margin-right:4px; }
  .legend .pinl { display:inline-block; width:12px; height:12px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); background:#111; margin-right:5px; vertical-align:-2px; }
  .bars { display:grid; grid-template-columns:1fr 1fr; gap:1.6mm 8mm; margin-top:4mm; }
  .bar { display:grid; grid-template-columns:28mm 1fr 8mm; align-items:center; gap:2mm; font-size:9.5px; }
  .bar i { display:block; height:8px; background:var(--red); }
  .bar b { text-align:right; }
  .band { display:grid; grid-template-columns:repeat(4,1fr); gap:3mm; margin-top:2mm; }
  .band div { background:var(--bg); padding:8px 10px; border-top:3px solid var(--red); }
  .band b { display:block; font-size:22px; font-weight:800; line-height:1.1; }
  .band span { font-size:9px; text-transform:uppercase; letter-spacing:.7px; color:#444; }

  /* lanțuri */
  .tiles { display:grid; grid-template-columns:repeat(4,1fr); gap:2mm; margin:3mm 0 4mm; }
  .tile { border:1px solid var(--line); padding:7px 9px; min-height:14mm; display:flex; flex-direction:column; justify-content:center; background:#fff; }
  .tile b { font-size:13.5px; line-height:1.15; text-transform:uppercase; font-weight:800; }
  .tile span { font-size:9px; color:var(--grey); margin-top:2px; }
  .tile.lant { background:var(--black); color:#fff; border-color:var(--black); border-bottom:3px solid var(--red); }
  .tile.lant span { color:#ccc; }
  .jgrid { columns:4; column-gap:4mm; font-size:8.6px; }
  .jl { break-inside:avoid; margin:0 0 3mm; }
  .jl b { display:flex; justify-content:space-between; border-bottom:2px solid var(--black); text-transform:uppercase; font-size:9.5px; letter-spacing:.6px; margin-bottom:2px; }
  .jl b span { color:var(--red); font-weight:700; text-transform:none; letter-spacing:0; }
  .jl i { display:block; font-style:normal; line-height:1.32; }
  .jl i.t { font-weight:700; }
  .jl small { color:var(--grey); font-size:8.5px; }

  /* cluburi */
  .clubs { display:grid; grid-template-columns:repeat(3,1fr); gap:2.5mm; margin:3mm 0 4mm; }
  .club { border:1px solid var(--line); padding:5px 9px; display:flex; flex-direction:column; }
  .club b { font-size:11.5px; text-transform:uppercase; line-height:1.2; }
  .club span { font-size:9px; color:var(--grey); }
  .club.top { border:none; background:var(--red); color:#fff; }
  .club.top span { color:#ffe1e2; }
  .shops { display:grid; grid-template-columns:repeat(4,1fr); gap:2.5mm; }

  /* sportivi */
  .ath { display:grid; grid-template-columns:repeat(3,1fr); gap:4mm; margin:4mm 0; }
  .ath figure { margin:0; background:var(--black); color:#fff; }
  .ath img { width:100%; height:112mm; object-fit:cover; }
  .ath figcaption { padding:8px 10px 10px; border-top:3px solid var(--red); }
  .ath figcaption b { display:block; font-size:13px; text-transform:uppercase; }
  .ath figcaption span { font-size:9.5px; color:#ccc; }
  .team { display:grid; grid-template-columns:repeat(5,1fr); gap:2.5mm; margin-top:3mm; }
  .team div { background:var(--bg); padding:7px 10px; border-left:3px solid var(--red); }
  .team b { display:block; font-size:11px; text-transform:uppercase; }
  .team span { font-size:9px; color:var(--grey); }
  .founder { display:grid; grid-template-columns:1fr 2.2fr; gap:5mm; background:var(--black); color:#fff; padding:5mm; margin-top:4mm; align-items:center; }
  .founder b { font-size:16px; text-transform:uppercase; display:block; }
  .founder .r { color:var(--red); font-weight:700; text-transform:uppercase; letter-spacing:1.5px; font-size:9px; }

  /* produse */
  .pgrid { display:grid; grid-template-columns:repeat(5,1fr); gap:3mm; margin-top:4mm; }
  .pc img { margin:4px 0 6px; }
  .pc { border:1px solid var(--line); padding:5px 6px 7px; text-align:center; }
  .pc img { width:100%; aspect-ratio:1/1; object-fit:contain; margin-bottom:3px; }
  .pc b { display:block; font-size:10px; text-transform:uppercase; line-height:1.2; }
  .pc span { display:block; font-size:8.3px; color:var(--grey); line-height:1.3; }
  .cats { display:flex; flex-wrap:wrap; gap:2mm; margin:2mm 0 0; }
  .cats span { background:var(--black); color:#fff; font-size:9px; padding:3px 9px; text-transform:uppercase; letter-spacing:.6px; }

  /* de ce */
  .why { display:grid; grid-template-columns:1fr 1fr; gap:4mm; margin-top:4mm; }
  .why div { border:1px solid var(--line); padding:10px 12px; border-top:4px solid var(--red); }
  .why b { display:block; text-transform:uppercase; font-size:11px; margin-bottom:3px; }
  .strip { display:grid; grid-template-columns:repeat(3,1fr); gap:3mm; margin-top:4mm; }
  .strip img { width:100%; height:122mm; object-fit:cover; }

  /* contact */
  .contact { background:var(--black); color:#fff; }
  .contact .bgimg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:.5; }
  .contact .shade { position:absolute; inset:0; background:linear-gradient(180deg,rgba(0,0,0,.9),rgba(0,0,0,.35) 40%,rgba(0,0,0,.95) 75%); }
  .contact .in { position:absolute; left:14mm; right:14mm; bottom:18mm; }
  .contact .logo { height:44px; margin-bottom:10mm; }
  .contact h1 { font-size:40px; }
  .cgrid { display:grid; grid-template-columns:repeat(3,1fr); gap:4mm; margin-top:8mm; border-top:3px solid var(--red); padding-top:5mm; font-size:11px; }
  .cgrid b { display:block; text-transform:uppercase; color:var(--red); font-size:9.5px; letter-spacing:1.2px; }
  .note { font-size:8.5px; color:var(--grey); margin-top:3mm; }

  @media print {
    @page { size:A4; margin:0; }
    html,body { background:#fff; }
    .page { margin:0; break-after:page; page-break-after:always; }
    * { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  }
</style>
</head>
<body>

<!-- 1. COPERTĂ -->
<section class="page cover">
  <img class="bgimg" src="${IMG}/crema-de-orez-3.jpg" alt="">
  <div class="shade"></div>
  <div class="top">${logo}<small>Prezentarea companiei<br>${DATA.split("-").reverse().join(".")}</small></div>
  <div class="bottom">
    <p class="kick">Brand românesc de nutriție sportivă · Sibiu</p>
    <h1>Prime Supplements<br><span>în toată România</span></h1>
    <p class="sub">Suplimente sportive produse în Uniunea Europeană, prezente în rețelele mari de săli de fitness, la cluburi sportive profesioniste și în magazinele de specialitate din ${judeteCu} de județe.</p>
    <div class="stats">
      <div><b>${P.firme_total}</b><span>firme partenere B2B</span></div>
      <div><b>${judeteCu}</b><span>județe cu parteneri</span></div>
      <div><b>${cluburi.length}</b><span>cluburi și asociații sportive</span></div>
      <div><b>50+</b><span>produse proprii</span></div>
    </div>
  </div>
</section>

<!-- 2. DESPRE -->
<section class="page">
  ${head(2, "Prime Supplements · Despre noi")}
  <div class="two">
    <div>
      <p class="kick">Cine suntem</p>
      <h2>Făcut în sală,<br><span>pentru sală.</span></h2>
      <p class="lead">Prime Supplements a pornit în 2022 la Sibiu, din experiența de peste 15 ani în culturism și antrenament a fondatorului, Marius Chera. Am construit brandul de la raftul sălii, nu din birou: fiecare produs răspunde unei cereri reale a sportivilor și a clienților de sală.</p>
      <p>Astăzi avem o gamă completă de nutriție sportivă: proteine, creatină, aminoacizi, pre-workout, produse pentru definire, vitamine și minerale (gama Prime Health), alimente funcționale și accesorii. Produsele sunt fabricate în Uniunea Europeană, cu ingrediente de marcă acolo unde contează: Creapure®, Kyowa®, KSM-66®, Cluster Dextrin®.</p>
      <p>Vindem online pe primesupplements.ro, în toate cele 42 de județe, și direct către săli, cluburi și magazine, prin echipa noastră de vânzări B2B.</p>
      <div class="facts">
        <div><b>2022</b><span>anul înființării</span></div>
        <div><b>${P.facturi_pj.toLocaleString("ro-RO")}</b><span>livrări B2B facturate din 2025</span></div>
        <div><b>4,8★</b><span>scor pe Google</span></div>
      </div>
      <div class="vals">
        <div><b>Etichete clare</b>Doze, porții și ingrediente scrise cinstit; doar mențiuni de sănătate autorizate în UE.</div>
        <div><b>Gust care se vinde</b>Arome testate de sportivi; clienții revin pentru gust, nu doar pentru preț.</div>
        <div><b>Livrare rapidă</b>Stoc propriu în Cisnădie, livrare Cargus în 1–2 zile lucrătoare.</div>
        <div><b>Aproape de parteneri</b>Agent dedicat, raft și materiale de prezentare pentru săli.</div>
      </div>
    </div>
    <div>
      <img class="photo" style="height:150mm;object-position:55% 30%" src="${IMG}/cluster-1.jpg" alt="Sportivă Prime Supplements cu Cluster Bomb în sală">
      <img class="photo" style="height:78mm;margin-top:3mm" src="${IMG}/produse-prime-whey-1.jpg" alt="Produse Prime Whey">
    </div>
  </div>
  <div class="timeline">
    <div><b>2022</b>Se înființează Prime Sport Supplements SRL, în Sibiu.</div>
    <div><b>2023–2024</b>Gama crește la peste 50 de produse; primele săli partenere.</div>
    <div><b>2025</b>Rețele naționale de săli și cluburi sportive profesioniste.</div>
    <div><b>2026</b>${P.firme_total} de firme partenere în ${judeteCu} de județe.</div>
  </div>
  <div class="pf"><span>PRIME SPORT SUPPLEMENTS SRL · CUI 46260823</span><span>primesupplements.ro</span></div>
</section>

<!-- 3. HARTA -->
<section class="page">
  ${head(3, "Prezența noastră în România")}
  <p class="kick">Harta partenerilor B2B</p>
  <h2>Prezenți în <span>${judeteCu} de județe</span></h2>
  <p class="lead" style="max-width:170mm">Fiecare pin arată câte firme (săli, cluburi, magazine) au cumpărat Prime Supplements direct de la noi, cu factură, între ianuarie 2025 și octombrie 2026. Lângă pin: o parte dintre sălile cunoscute din județ. Online livrăm în toate cele 42 de județe.</p>
  <div class="legend">
    <span><span class="pinl"></span>număr de firme partenere</span>
    <span><i style="background:#b5121b"></i>20+</span><span><i style="background:#ec1e24"></i>8–19</span><span><i style="background:#f2595d"></i>4–7</span><span><i style="background:#f7a3a5"></i>1–3</span><span><i style="background:#e9e9e9"></i>clienți online</span>
  </div>
  <div class="mapwrap">${map}</div>
  <div class="band">
    <div><b>${P.firme_total}</b><span>firme partenere</span></div>
    <div><b>${sali.filter(s => s.tip === "lant").length}</b><span>rețele mari de săli</span></div>
    <div><b>${sali.length}+</b><span>săli și studiouri numite</span></div>
    <div><b>42 / 42</b><span>județe cu livrare online</span></div>
  </div>
  <h3 style="margin-top:5mm">Primele 10 județe după numărul de firme partenere</h3>
  <div class="bars">${bars}</div>
  <div class="pf"><span>Sursa: facturile Prime Sport Supplements către persoane juridice, 01.01.2025–31.10.2026</span><span>primesupplements.ro</span></div>
</section>

<!-- 4. LANȚURI ȘI SĂLI -->
<section class="page">
  ${head(4, "Rețeaua de săli partenere")}
  <p class="kick">Săli de fitness care lucrează cu Prime Supplements</p>
  <h2>De la <span>marile lanțuri</span> la sala de cartier</h2>
  <p class="lead">Prime Supplements este pe rafturile și la recepția unora dintre cele mai cunoscute săli din țară. În negru: rețelele de săli cu mai multe locații.</p>
  <div class="tiles">${lanturi.map(tile).join("")}</div>
  <h3>Toți partenerii numiți, pe județe</h3>
  <div class="jgrid">${listaJud}</div>
  ${fara.length ? `<p class="note">În ${fara.join(", ")} lucrăm cu alte firme (cabinete, studiouri, comercianți) pe care nu le numim aici.</p>` : ""}
  <div class="pf"><span>Numele sălilor sunt mărcile sub care funcționează firmele partenere.</span><span>primesupplements.ro</span></div>
</section>

<!-- 5. CLUBURI -->
<section class="page">
  ${head(5, "Sport de performanță")}
  <div class="two" style="grid-template-columns:1.2fr 1fr">
    <div>
      <p class="kick">Cluburi sportive</p>
      <h2>Alegerea <span>sportivilor de performanță</span></h2>
      <p class="lead">Cluburi profesioniste de fotbal, cluburi universitare și municipale cu zeci de secții, academii de box, natație și culturism își aprovizionează sportivii cu Prime Supplements.</p>
      <div class="clubs" style="grid-template-columns:1fr 1fr">${cluburi.map(clubTile).join("")}</div>
    </div>
    <div>
      <img class="photo" style="height:128mm" src="${IMG}/sportiva-biceps-produs-prime-1.jpg" alt="Sportivă Prime Supplements cu Recovery">
      <img class="photo" style="height:72mm;margin-top:3mm" src="${IMG}/produse-recovery-eaa-shaker-1.jpg" alt="Recovery, EAA și shaker Prime Supplements">
    </div>
  </div>
  <h3 style="margin-top:3mm">Magazine, distribuitori și farmacii</h3>
  <div class="shops">${magazine.map(p => `<div class="club"><b>${esc(p.brand)}</b><span>${esc(p.oras)}</span></div>`).join("")}</div>
  <div class="pf"><span>Cluburile apar cu denumirea lor oficială prescurtată.</span><span>primesupplements.ro</span></div>
</section>

<!-- 6. SPORTIVI -->
<section class="page">
  ${head(6, "Echipa Prime Supplements")}
  <p class="kick">Sportivii Prime Supplements</p>
  <h2>Oameni reali, <span>rezultate reale</span></h2>
  <p class="lead">Produsele Prime Supplements sunt folosite și promovate de sportivi care se antrenează zilnic: culturiști, competitori de fitness și antrenori personali din toată țara.</p>
  <div class="ath">
    <figure><img src="${IMG}/crema-de-orez-1.jpg" alt="Mihai Diaconu cu Creamy Rice"><figcaption><b>Mihai Diaconu</b><span>Culturism · fața campaniei Creamy Rice</span></figcaption></figure>
    <figure><img src="${IMG}/cluster-1.jpg" style="object-position:55% 30%" alt="Ana Savici cu Cluster Bomb"><figcaption><b>Ana Savici</b><span>Fitness · ședința foto Prime Supplements 2026</span></figcaption></figure>
    <figure><img src="${IMG}/nitrox-no-stim-5.jpg" alt="Paula Adelina Chera cu Nitrox"><figcaption><b>Paula Adelina Chera</b><span>Fitness · Evo Gym</span></figcaption></figure>
  </div>
  <h3>Sportivi parteneri Prime Supplements</h3>
  <div class="team">
    <div><b>Mădălin Nuică</b><span>Timișoara</span></div>
    <div><b>Andrei Olteanu</b><span>București</span></div>
    <div><b>Petruț Paiș</b><span>Onești, Bacău</span></div>
    <div><b>Emilian Săcuiu</b><span>Prahova</span></div>
    <div><b>Darius Stana</b><span>Arad</span></div>
  </div>
  <div class="founder">
    <img src="${IMG}/logo-prime-alb.svg" alt="" style="width:100%;max-width:52mm">
    <div><span class="r">Fondator</span><b>Marius Chera</b>Sportiv IFBB Pro și antrenor de culturism cu peste 15 ani de experiență, lector la cursurile de instructori ale Federației Române de Culturism și Fitness. A pregătit sportivi care au obținut carduri PRO și titluri europene și mondiale. Fiecare produs Prime Supplements trece mai întâi prin sala lui.</div>
  </div>
  <div class="pf"><span>Sportivii apar cu acordul lor, în baza contractelor de colaborare cu Prime Supplements.</span><span>primesupplements.ro</span></div>
</section>

<!-- 7. PRODUSE -->
<section class="page">
  ${head(7, "Gama Prime Supplements")}
  <p class="kick">Produsele</p>
  <h2>O gamă completă, <span>dintr-o singură sursă</span></h2>
  <p class="lead">Peste 50 de produse proprii, pe 8 categorii. Câteva dintre cele mai cerute la sală:</p>
  <div class="cats"><span>Proteine și gainer</span><span>Creatină</span><span>Aminoacizi</span><span>Pre și intra-workout</span><span>Definire</span><span>Vitamine și minerale · Prime Health</span><span>Alimente funcționale</span><span>Accesorii</span></div>
  <div class="pgrid">${prodCards}</div>
  <p class="note">Lista completă de prețuri B2B Prime Supplements, cu marja recomandată la raft, se trimite separat partenerilor.</p>
  <div class="pf"><span>Produse fabricate în Uniunea Europeană</span><span>primesupplements.ro</span></div>
</section>

<!-- 8. DE CE PRIME -->
<section class="page">
  ${head(8, "Pentru parteneri")}
  <p class="kick">De ce Prime Supplements</p>
  <h2>Un brand care <span>vinde singur</span> la recepție</h2>
  <div class="why">
    <div><b>Marjă clară pentru raft</b>Preț B2B fix, preț recomandat la raft puțin peste site; nimeni din lanț nu vinde sub site.</div>
    <div><b>Raft și materiale gratuite</b>Stand Prime Supplements, afișe, pliante și mostre pentru degustare. Agentul vizitează lunar sălile partenere.</div>
    <div><b>Livrare în 1–2 zile</b>Stoc propriu în Cisnădie, Cargus în toată țara; transport gratuit de la 1.000 lei fără TVA.</div>
    <div><b>Produse de impuls</b>Plicuri de proteină și creatină, shot-uri, batoane: se vând la bucată, direct la recepție.</div>
    <div><b>Brand vizibil online</b>Peste 350 de articole pe blog, Instagram, TikTok, Pinterest, Google (4,8★) și ChatGPT; clienții sălii ne găsesc și acasă.</div>
    <div><b>Fidelizare</b>Program propriu de puncte Prime Puncte și sportivi parteneri care aduc clienți în sălile partenere.</div>
  </div>
  <div class="strip">
    <img src="${IMG}/sportiva-instant-oats-prime-health-1.jpg" alt="Instant Oats și Prime Health în sală">
    <img src="${IMG}/plicuri-prime-whey-1.jpg" alt="Plicuri Prime Whey Go">
    <img src="${IMG}/batoane-fiole.jpg" alt="Batoane și shot-uri Prime Supplements">
  </div>
  <div class="pf"><span>Condițiile comerciale complete: în lista de prețuri B2B</span><span>primesupplements.ro</span></div>
</section>

<!-- 9. CONTACT -->
<section class="page contact">
  <img class="bgimg" src="${IMG}/thermo-core-water-out-1.jpg" alt="">
  <div class="shade"></div>
  <div class="in">
    ${logo}
    <p class="kick">Hai în echipa Prime Supplements</p>
    <h1>Adu Prime Supplements<br><span>în sala ta.</span></h1>
    <div class="cgrid">
      <div><b>Comenzi B2B</b>0775 286 584 (și WhatsApp)<br>contact@primesupplements.ro</div>
      <div><b>Online</b>primesupplements.ro<br>livrare în toate cele 42 de județe</div>
      <div><b>Firma</b>PRIME SPORT SUPPLEMENTS SRL<br>CUI 46260823 · J32/1155/2022<br>Cisnădie, Str. Ioan Virgil Ispas 17A, jud. Sibiu</div>
    </div>
  </div>
</section>

</body>
</html>`;

const out = new URL(`./PORTOFOLIU-PRIME-NATIONAL-${DATA}.html`, import.meta.url);
writeFileSync(out, "﻿" + html, "utf8");
console.log(`scris ${out.pathname}: ${parteneri.length} parteneri numiți (${sali.length} săli, ${cluburi.length} cluburi, ${magazine.length} magazine), ${judeteCu} județe`);
