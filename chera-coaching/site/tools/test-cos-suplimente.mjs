// Test coș pregătit: (1) toate combinațiile de protocol au un coș valid; (2) fiecare handle + variantă există pe primesupplements.ro (citire publică);
// (3) cartLive cu fetch real și cu fetch simulat (aromă epuizată, produs epuizat, rețea căzută).
import fs from "node:fs";
import vm from "node:vm";
const dir = process.argv[2];
const sandbox = { window: {}, console, fetch, AbortController, setTimeout, clearTimeout };
const ctx = vm.createContext(sandbox);
for (const f of ["quiz-rezultat.js", "quiz-suplimente.js"]) vm.runInContext(fs.readFileSync(dir + "/" + f, "utf8"), ctx, { filename: f });
const X = ctx.window.CHERA_EXT, S = X.shop;
const src = fs.readFileSync(dir + "/quiz-suplimente.js", "utf8");
const shopMap = Object.fromEntries([...src.matchAll(/^ (\w+):\["([^"]+)",(\d+),"([^"]+)"(?:,"[^"]+")?\],?$/gm)].map(m => [m[1], { handle: m[2], id: Number(m[3]), label: m[4] }]));
const errors = [];
console.log("produse în hartă:", Object.keys(shopMap).length);

/* (1) toate combinațiile */
const TYPES = ["1A", "1B", "2A", "2B", "3"], SC = ["D", "A", "G", "S"], bals = [];
bals.push({ label: "ok", allHigh: false, level: "ok", top: "D", topVal: 12, sorted: [["D", 12], ["A", 11], ["G", 10], ["S", 9]] });
bals.push({ label: "allHigh", allHigh: true, level: "crit", top: "G", topVal: 24, sorted: [["G", 24], ["D", 23], ["A", 22], ["S", 21]] });
for (const top of SC) for (const level of ["warn", "crit"]) for (const second of [false, true]) { const o = SC.filter(k => k !== top); bals.push({ label: `${top}-${level}${second ? "-2nd" : ""}`, allHigh: false, level, top, topVal: level === "crit" ? 26 : 18, sorted: [[top, level === "crit" ? 26 : 18], [o[0], second ? 23 : 12], [o[1], 11], [o[2], 10]] }); }
let combos = 0, sizes = {}, urls = new Set(), usedKeys = new Map();
for (const type of TYPES) for (const bal of bals) for (const goal of ["scena", "sportiv", "start"]) for (const sleep of ["sub 6 ore", "6–7 ore", "7–8 ore", "peste 8 ore"]) for (const caffeine of ["0", "1–2", "3 sau mai multe"]) for (const days of ["3", "4", "5", "6"]) for (const years of ["sub 1 an", "1–3 ani", "3–5 ani", "peste 5 ani"]) {
  combos++;
  const P = X.protocolFor(type, bal, { goal, sleep, caffeine, days, years });
  const rows = P.groups.flatMap(g => g.rows), where = `${type} ${bal.label} ${goal} ${sleep} ${caffeine} ${days} ${years}`;
  for (const r of rows) {
    const prime = /\(Prime Supplements\)/.test(r.n) || /\(Prime Supplements\)/.test(r.d), sw = /\(Swanson\)/.test(r.n);
    if (prime && !(r.p && r.p.length)) errors.push(`rând Prime fără produs de coș: ${r.n}`);
    if (sw && r.p) errors.push(`rând Swanson cu produs de coș: ${r.n}`);
    for (const k of r.p || []) if (!shopMap[k]) errors.push(`cheie necunoscută ${k} la ${r.n}`);
  }
  const expect = [...new Set(rows.flatMap(r => r.p || []))];
  if (JSON.stringify(expect) !== JSON.stringify(P.cart)) errors.push(`coș ≠ rânduri la ${where}`);
  if (!P.cart.length) errors.push(`coș gol la ${where}`);
  const c = S.build(P.cart);
  if (!/^https:\/\/primesupplements\.ro\/cart\/(\d+:1)(,\d+:1)*\?discount=CHERA10&utm_source=chera-protocol&utm_medium=evaluare&utm_campaign=protocol-suplimente$/.test(c.url)) errors.push(`URL greșit: ${c.url}`);
  const ids = c.items.map(x => x.id); if (new Set(ids).size !== ids.length) errors.push(`variantă dublată la ${where}`);
  if (!P.notes.some(n => /butonul de mai jos \(10% reducere\)/.test(n))) errors.push(`lipsește nota cu butonul la ${where}`);
  sizes[P.cart.length] = (sizes[P.cart.length] || 0) + 1; urls.add(c.url); P.cart.forEach(k => usedKeys.set(k, (usedKeys.get(k) || 0) + 1));
}
console.log(`combinații: ${combos}; coșuri distincte: ${urls.size}; produse Prime pe coș: ${JSON.stringify(sizes)}`);
const baseKeys = S.keysOf(X.base); console.log("chei bază:", baseKeys.join(", "));
const never = Object.keys(shopMap).filter(k => !usedKeys.has(k) && !baseKeys.includes(k)); if (never.length) errors.push("produse din hartă nefolosite: " + never);

/* (2) harta față de magazinul real (citire publică /products/<handle>.js) */
let live = 0;
for (const [k, m] of Object.entries(shopMap)) {
  const r = await fetch(`https://primesupplements.ro/products/${m.handle}.js`);
  if (!r.ok) { errors.push(`${k}: ${m.handle} → HTTP ${r.status}`); continue; }
  const j = await r.json(), v = j.variants.find(x => x.id === m.id);
  if (!v) errors.push(`${k}: varianta ${m.id} nu există la ${m.handle}`);
  else { live++; console.log(`  ${k.padEnd(11)} ${String(m.id)}  ${v.available ? "pe stoc " : "FĂRĂ STOC"}  ${(v.price / 100).toFixed(2).padStart(7)} lei  ${j.title}${j.variants.length > 1 ? " · " + v.title : ""}`); if (!v.available) errors.push(`${k}: varianta preferată nu e pe stoc`); }
}
console.log(`variante confirmate pe magazin: ${live}/${Object.keys(shopMap).length}`);

/* (3) cartLive: real + cazuri simulate */
const sample = X.protocolFor("1A", bals.find(b => b.label === "G-crit"), { goal: "sportiv", sleep: "6–7 ore", caffeine: "1–2", days: "4", years: "3–5 ani" });
const real = await S.live(sample.cart);
console.log("\ncoș real 1A-G sportiv:", real.items.map(i => i.label + (i.variant ? " · " + i.variant : "")).join("; "));
console.log("total:", real.total / 100, "lei; cu 10%:", real.net / 100, "lei; lipsă:", real.missing.join(",") || "nimic");
console.log(real.url);
if (real.items.length !== sample.cart.length || real.total == null) errors.push("cartLive real: lipsesc produse sau total");
const realFetch = sandbox.fetch;
// aroma preferată epuizată → prima disponibilă; produs epuizat complet → scos și anunțat; rețea căzută → varianta preferată, fără total
ctx.fetch = async (u) => { const h = u.split("/products/")[1].replace(".js", "");
  if (h === "eaa-aminoacizi-esentiali") return { ok: true, json: async () => ({ variants: [{ id: 55179991515511, title: "Tropical", available: false, price: 13700 }, { id: 55179991449975, title: "Blueberry", available: true, price: 13700 }] }) };
  if (h === "zinc-citrate-80-caps") return { ok: true, json: async () => ({ variants: [{ id: 55179986305399, title: "Default Title", available: false, price: 5500 }] }) };
  if (h === "nitrox-no-stim") throw new Error("rețea");
  return { ok: true, json: async () => ({ variants: [{ id: shopMap[Object.keys(shopMap).find(k => shopMap[k].handle === h)].id, title: "Default Title", available: true, price: 5000 }] }) }; };
const sim = await vm.runInContext(`window.CHERA_EXT.shop.live(["eaa","zinc","nostim","vitc"])`, ctx);
console.log("\nsimulare:", JSON.stringify({ items: sim.items.map(i => [i.k, i.id, i.variant, i.price]), missing: sim.missing, total: sim.total, url: sim.url }));
if (sim.items.find(i => i.k === "eaa").id !== 55179991449975) errors.push("simulare: aroma de rezervă nu a fost aleasă");
if (sim.missing.join() !== "Citrat de zinc 40 mg" || sim.items.some(i => i.k === "zinc")) errors.push("simulare: produsul fără stoc nu a fost scos");
if (sim.items.find(i => i.k === "nostim").id !== 55180000756087 || sim.total !== null) errors.push("simulare: rețea căzută tratată greșit");
if (/55179986305399/.test(sim.url)) errors.push("simulare: URL-ul conține produsul fără stoc");
ctx.fetch = realFetch;

const uniq = [...new Set(errors)];
console.log(`\nerori distincte: ${uniq.length}`); uniq.slice(0, 25).forEach(e => console.log("  - " + e));
process.exit(uniq.length ? 1 : 0);
