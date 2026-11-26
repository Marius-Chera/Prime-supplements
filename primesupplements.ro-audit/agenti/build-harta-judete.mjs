// Transformă GeoJSON-ul județelor (codeforgermany/click_that_hood, romania.geojson) în contururi SVG simplificate.
// Rulare (o singură dată): node agenti/build-harta-judete.mjs <cale romania.geojson>
// Ieșire: agenti/data/harta-judete-svg.json  { w, h, proj:{minLon,maxLat,k,cos}, judete:{COD:{name,d,cx,cy}} }
import { readFileSync, writeFileSync } from "node:fs";

const src = process.argv[2];
const g = JSON.parse(readFileSync(src, "utf8"));
const NAME2COD = {
  "Alba": "AB", "Arad": "AR", "Arges": "AG", "Bacau": "BC", "Bihor": "BH", "Bistrita-Nasaud": "BN", "Botosani": "BT",
  "Brasov": "BV", "Braila": "BR", "Bucuresti": "B", "Buzau": "BZ", "Caras-Severin": "CS", "Calarasi": "CL", "Cluj": "CJ",
  "Constanta": "CT", "Covasna": "CV", "Dambovita": "DB", "Dolj": "DJ", "Galati": "GL", "Giurgiu": "GR", "Gorj": "GJ",
  "Harghita": "HR", "Hunedoara": "HD", "Ialomita": "IL", "Iasi": "IS", "Ilfov": "IF", "Maramures": "MM", "Mehedinti": "MH",
  "Mures": "MS", "Neamt": "NT", "Olt": "OT", "Prahova": "PH", "Satu Mare": "SM", "Salaj": "SJ", "Sibiu": "SB",
  "Suceava": "SV", "Teleorman": "TR", "Timis": "TM", "Tulcea": "TL", "Vaslui": "VS", "Valcea": "VL", "Vrancea": "VN",
};

let minLon = 99, maxLon = -99, minLat = 99, maxLat = -99;
const rings = f => f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
for (const f of g.features) for (const poly of rings(f)) for (const ring of poly) for (const [x, y] of ring) {
  minLon = Math.min(minLon, x); maxLon = Math.max(maxLon, x); minLat = Math.min(minLat, y); maxLat = Math.max(maxLat, y);
}
const cos = Math.cos(((minLat + maxLat) / 2) * Math.PI / 180);
const W = 1000, k = W / ((maxLon - minLon) * cos), H = Math.round((maxLat - minLat) * k);
const P = ([x, y]) => [(x - minLon) * cos * k, (maxLat - y) * k];

// Douglas–Peucker pe puncte proiectate
function dp(pts, eps) {
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  let idx = 0, dmax = 0;
  const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + b[0] * a[1] - b[1] * a[0]) / len;
    if (d > dmax) { dmax = d; idx = i; }
  }
  if (dmax <= eps) return [a, b];
  return dp(pts.slice(0, idx + 1), eps).slice(0, -1).concat(dp(pts.slice(idx), eps));
}

const judete = {};
for (const f of g.features) {
  const cod = NAME2COD[f.properties.name];
  if (!cod) throw new Error("Județ necunoscut: " + f.properties.name);
  let d = "", A = 0, cx = 0, cy = 0;
  for (const poly of rings(f)) for (const ring of poly) {
    // inel închis (primul punct = ultimul): se simplifică pe două jumătăți, altfel DP îl reduce la 2 puncte
    const pr = ring.map(P), m = Math.floor(pr.length / 2);
    const pts = dp(pr.slice(0, m + 1), 0.9).slice(0, -1).concat(dp(pr.slice(m), 0.9));
    if (pts.length < 4) continue;
    d += "M" + pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join("L") + "Z";
    for (let i = 0; i < pts.length - 1; i++) { // centroid poligon
      const c = pts[i][0] * pts[i + 1][1] - pts[i + 1][0] * pts[i][1];
      A += c; cx += (pts[i][0] + pts[i + 1][0]) * c; cy += (pts[i][1] + pts[i + 1][1]) * c;
    }
  }
  judete[cod] = { name: f.properties.name, d, cx: +(cx / (3 * A)).toFixed(1), cy: +(cy / (3 * A)).toFixed(1) };
}
const out = { w: W, h: H, proj: { minLon, maxLat, k, cos }, judete };
writeFileSync(new URL("./data/harta-judete-svg.json", import.meta.url), JSON.stringify(out));
console.log(`OK ${Object.keys(judete).length} județe, ${W}x${H}, ${JSON.stringify(out).length} octeți`);
