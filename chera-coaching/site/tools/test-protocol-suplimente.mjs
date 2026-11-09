// Test exhaustiv v2: produse cu nume + firmă, Prime majoritar, Swanson ≤ 5 (în sistem și în fiecare protocol).
import fs from "node:fs";
import vm from "node:vm";
const dir = process.argv[2];
const ctx = vm.createContext({ window: {}, console });
for (const f of ["quiz-rezultat.js", "quiz-suplimente.js"]) vm.runInContext(fs.readFileSync(dir + "/" + f, "utf8"), ctx, { filename: f });
const X = ctx.window.CHERA_EXT;
const BRAND = /\((Prime Supplements|Swanson)\)/;
const FORBIDDEN = /bicarbonat|gluconat|sare roz|picolinat de zinc|zinc picolinat|automat|5-htp|melatonin|rhodiola|alpha-gpc|acetil-l-carnitin|inozitol|fosfatidilserin|teanin|acid alfa-lipoic/i;

const TYPES = ["1A", "1B", "2A", "2B", "3"], SC = ["D", "A", "G", "S"];
const bals = [];
bals.push({ label: "ok", allHigh: false, level: "ok", top: "D", topVal: 12, sorted: [["D", 12], ["A", 11], ["G", 10], ["S", 9]] });
bals.push({ label: "allHigh", allHigh: true, level: "crit", top: "G", topVal: 24, sorted: [["G", 24], ["D", 23], ["A", 22], ["S", 21]] });
for (const top of SC) for (const level of ["warn", "crit"]) for (const second of [false, true]) {
  const others = SC.filter(k => k !== top);
  const sorted = [[top, level === "crit" ? 26 : 18], [others[0], second ? 23 : 12], [others[1], 11], [others[2], 10]];
  bals.push({ label: `${top}-${level}${second ? "-2nd" : ""}`, allHigh: false, level, top, topVal: sorted[0][1], sorted });
}
const goals = ["scena", "sportiv", "start"], sleeps = ["sub 6 ore", "6–7 ore", "7–8 ore", "peste 8 ore"], cafs = ["0", "1–2", "3 sau mai multe"], dayss = ["3", "4", "5", "6"], yearss = ["sub 1 an", "1–3 ani", "3–5 ani", "peste 5 ani"];

let combos = 0, errors = [], names = new Map(), counts = {}, variants = new Set(), swansonMax = 0, primeMinority = 0;
for (const type of TYPES) for (const bal of bals) for (const goal of goals) for (const sleep of sleeps) for (const caffeine of cafs) for (const days of dayss) for (const years of yearss) {
  combos++;
  const P = X.protocolFor(type, bal, { goal, sleep, caffeine, days, years, name: "Test" });
  const rows = P.groups.flatMap(g => g.rows);
  const keys = rows.map(r => r.k);
  if (new Set(keys).size !== keys.length) errors.push(`chei duplicate ${type} ${bal.label} ${goal}: ${keys}`);
  const ns = rows.map(r => r.n); if (new Set(ns).size !== ns.length) errors.push(`produs repetat ${type} ${bal.label} ${goal}: ${ns}`);
  if (rows.length < 4 || rows.length > 8) errors.push(`${rows.length} rânduri la ${type} ${bal.label} ${goal} ${sleep} ${caffeine} ${days} ${years}`);
  counts[rows.length] = (counts[rows.length] || 0) + 1;
  let sw = 0, pr = 0;
  for (const r of rows) {
    names.set(r.n, (names.get(r.n) || 0) + 1);
    if (!BRAND.test(r.n) && !BRAND.test(r.d)) errors.push(`fără firmă: "${r.n}"`);
    if (/\(Swanson\)/.test(r.n)) sw++; else pr++;
  }
  swansonMax = Math.max(swansonMax, sw);
  if (sw > 5) errors.push(`${sw} produse Swanson la ${type} ${bal.label} ${goal}`);
  if (sw > pr) { primeMinority++; if (primeMinority < 5) errors.push(`Swanson (${sw}) > Prime (${pr}) la ${type} ${bal.label} ${goal} ${sleep} ${caffeine} ${days} ${years}`); }
  const text = [P.intro, ...P.notes, ...rows.flatMap(r => [r.n, r.d, r.t, r.w])].join(" | ");
  const m = text.match(FORBIDDEN) || text.match(/\bAI\b/); if (m) errors.push(`termen interzis "${m[0]}" la ${type} ${bal.label} ${goal}`);
  if (!/primesupplements\.ro/.test(P.notes.join(" "))) errors.push(`lipsește nota de cumpărare la ${type} ${bal.label} ${goal}`);
  variants.add(rows.map(r => r.k + ":" + r.d).join(";"));
}
const uniq = [...new Set(errors)];
const swansonDistinct = [...names.keys()].filter(n => /\(Swanson\)/.test(n));
console.log(`combinații: ${combos}; variante distincte: ${variants.size}; erori distincte: ${uniq.length}; Swanson distincte: ${swansonDistinct.length}; max Swanson/protocol: ${swansonMax}; protocoale cu Swanson > Prime: ${primeMinority}`);
console.log("rânduri per protocol:", JSON.stringify(counts));
console.log("produse folosite (" + names.size + "):"); for (const [n, c] of [...names].sort((a, b) => b[1] - a[1])) console.log("  " + c.toString().padStart(6) + "  " + n);
if (uniq.length || swansonDistinct.length > 5) { console.log("ERORI:"); uniq.slice(0, 30).forEach(e => console.log("  - " + e)); process.exit(1); }
console.log("\nBAZA:"); X.base.forEach(b => { console.log("  • " + b.n + " · " + b.d + " · " + b.t); if (!BRAND.test(b.n)) { console.log("  !! fără firmă"); process.exit(1); } });
const show = (type, bal, c) => { const P = X.protocolFor(type, bal, c); console.log(`\n=== ${type} · ${bal.label} · ${c.goal} · somn ${c.sleep} · cafea ${c.caffeine} · ${c.days} zile · ${c.years} ===\n${P.intro}`); P.groups.forEach(g => { console.log("  " + g.label.toUpperCase()); g.rows.forEach(r => console.log(`   • ${r.n} · ${r.d} · ${r.t}`)); }); P.notes.forEach(n => console.log("  ! " + n)); };
show("1A", bals.find(b => b.label === "G-crit"), { goal: "sportiv", sleep: "6–7 ore", caffeine: "1–2", days: "4", years: "3–5 ani" });
show("2B", bals.find(b => b.label === "S-crit-2nd"), { goal: "scena", sleep: "sub 6 ore", caffeine: "3 sau mai multe", days: "6", years: "peste 5 ani" });
show("3", bals.find(b => b.label === "A-crit"), { goal: "start", sleep: "7–8 ore", caffeine: "0", days: "3", years: "sub 1 an" });
