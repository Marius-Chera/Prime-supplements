// Chera Protocol – generează CSV-ul de import Shopify pentru sesiunile cu rezervare (27.10.2026).
// Fiecare variantă = un interval „AAAA-LL-ZZ OO:MM” (ora României), stoc 1. După plată stocul devine 0
// și intervalul dispare din calendarul de pe site (assets/booking.js).
//
// Prima creare (produse noi, cu descriere, poză, SEO):
//   node sesiuni/genereaza-intervale.mjs --complet --de-la 2026-10-29 --saptamani 4
// Adaugi săptămâni noi (păstrează orele vândute/blocate din Admin → Products → Inventory → Export, sau Products → Export):
//   node sesiuni/genereaza-intervale.mjs --export "C:\Users\mariu\Downloads\inventory_export.csv" --saptamani 5
// Opțiuni: --doar <handle>  (un singur produs), --out <fișier.csv>
// Import: Admin → Products → Import → fișierul → bifat „Overwrite products with matching handles”.
// Ghid complet: ../SESIUNI-REZERVARI-GHID.md
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DIR = dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(readFileSync(join(DIR, "program-sesiuni.json"), "utf8"));
const STORE_CDN = "https://bp66vh-bq.myshopify.com/cdn/shop/files/";
const MAX_VARIANTE = 240; // Liquid (product.variants) arată cel mult 250 de variante pe pagina produsului

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf(n); return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : d; };
const flag = (n) => args.includes(n);

const pad = (n) => String(n).padStart(2, "0");
// „acum” în ora României, ca text comparabil „AAAA-LL-ZZ OO:MM”
const roNow = () => {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Bucharest", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}`;
};
const NOW = roNow();
const ymd = (d) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
const addDays = (s, n) => { const d = new Date(s + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return ymd(d); };

const start = arg("--de-la", addDays(NOW.slice(0, 10), 1));
const weeks = Number(arg("--saptamani", "4"));
const end = addDays(start, weeks * 7); // exclusiv
const only = arg("--doar", null);
const complet = flag("--complet");
const exportPath = arg("--export", null);
const ZILE = ["d", "l", "ma", "mi", "j", "v", "s"];
const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const fromMin = (m) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

// --- CSV ---
function parseCsv(text) {
  const rows = []; let row = [], f = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(f); f = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(f); rows.push(row); row = []; f = ""; }
    else f += c;
  }
  if (f !== "" || row.length) { row.push(f); rows.push(row); }
  const head = rows.shift().map((h) => h.replace(/^\uFEFF/, "").trim());
  return rows.filter((r) => r.some((x) => x !== "")).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}
const cell = (v) => { const s = v == null ? "" : String(v); return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
const pick = (r, ...names) => { for (const n of names) if (r[n] != null && r[n] !== "") return r[n]; return ""; };

// Stocul actual din exportul adminului (Products → Export) sau dintr-un fișier simplu handle,interval,stoc
const existing = {}; // handle -> Map(interval -> stoc)
if (exportPath) {
  for (const r of parseCsv(readFileSync(exportPath, "utf8"))) {
    const h = pick(r, "URL handle", "Handle", "handle");
    const v = pick(r, "Option1 value", "Option1 Value", "interval");
    const q = pick(r, "Inventory quantity", "Variant Inventory Qty", "Available", "Available (not editable)", "On hand", "On hand (current)", "stoc");
    if (!h || !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(v)) continue;
    (existing[h] ||= new Map()).set(v, q === "" ? 1 : Math.max(0, Math.min(1, Number(q))));
  }
}

const cols = complet
  ? ["URL handle", "Title", "Description", "Vendor", "Type", "Tags", "Published on online store", "Status", "SKU", "Option1 name", "Option1 value", "Price", "Inventory tracker", "Inventory quantity", "Continue selling when out of stock", "Weight value (grams)", "Requires shipping", "Fulfillment service", "Product image URL", "Image position", "Image alt text", "SEO title", "SEO description", "Durata (minute) (product.metafields.chera.durata)", "Întrebare sesiune (product.metafields.chera.intrebare)"]
  : ["URL handle", "Title", "SKU", "Option1 name", "Option1 value", "Price", "Inventory tracker", "Inventory quantity", "Continue selling when out of stock", "Requires shipping", "Fulfillment service"];
const lines = [cols.join(",")];
let errors = 0;

for (const s of cfg.sesiuni) {
  if (only && s.handle !== only) continue;
  const slots = new Map(); // interval -> stoc
  // 1) ce există deja (din export), fără trecut: vândute/blocate rămân 0, adăugate manual rămân
  for (const [v, q] of existing[s.handle] || []) if (v > NOW) slots.set(v, q);
  // 2) intervalele din program
  for (let d = start; d < end; d = addDays(d, 1)) {
    if (cfg.zileLibere.includes(d)) continue;
    const zi = ZILE[new Date(d + "T00:00:00Z").getUTCDay()];
    for (const fereastra of s.program[zi] || []) {
      const [a, b] = fereastra.split("-").map(toMin);
      for (let m = a; m + (s.durataMinute || cfg.durataMinute) <= b; m += s.pasMinute || cfg.pasMinute) {
        const v = `${d} ${fromMin(m)}`;
        if (v > NOW && !slots.has(v)) slots.set(v, 1);
      }
    }
  }
  const list = [...slots.entries()].sort((x, y) => (x[0] < y[0] ? -1 : 1));
  const sold = list.filter(([, q]) => q === 0).length;
  if (list.length > MAX_VARIANTE) { console.error(`EROARE ${s.handle}: ${list.length} intervale > ${MAX_VARIANTE}. Scurtează perioada (--saptamani) sau programul.`); errors++; continue; }
  if (!list.length) { console.error(`ATENȚIE ${s.handle}: niciun interval.`); continue; }
  list.forEach(([v, q], i) => {
    const r = {
      "URL handle": s.handle,
      "SKU": `${s.sku}-${v.replace(/[-: ]/g, "").slice(0, 12)}`,
      "Option1 value": v,
      "Price": s.pret.toFixed(2),
      "Inventory tracker": "shopify",
      "Inventory quantity": q,
      "Continue selling when out of stock": "deny",
      "Weight value (grams)": 0,
      "Requires shipping": "false",
      "Fulfillment service": "manual",
    };
    if (i === 0) {
      Object.assign(r, { Title: s.titlu, "Option1 name": "Data și ora" });
      if (complet) Object.assign(r, {
        Description: s.descriere, Vendor: "Chera Protocol", Type: s.tip, Tags: s.tags, "Published on online store": "true", Status: "active",
        "Product image URL": STORE_CDN + `sesiune-${s.handle}${cfg.pozaSufix || ""}.png`, "Image position": 1, "Image alt text": `${s.titlu} – sesiune cu Marius Chera`,
        "SEO title": s.seoTitlu, "SEO description": s.seoDescriere,
        "Durata (minute) (product.metafields.chera.durata)": s.durataMinute || cfg.durataMinute, "Întrebare sesiune (product.metafields.chera.intrebare)": s.intrebare || "",
      });
    }
    lines.push(cols.map((c) => cell(r[c])).join(","));
  });
  console.log(`${s.handle}: ${list.length} intervale (${list[0][0]} … ${list[list.length - 1][0]}), din care ${sold} vândute/blocate păstrate la 0`);
}

if (errors) process.exit(1);
mkdirSync(join(DIR, "import"), { recursive: true });
const out = arg("--out", join(DIR, "import", `sesiuni-${complet ? "complet" : "variante"}-${NOW.slice(0, 10)}.csv`));
writeFileSync(out, "\uFEFF" + lines.join("\n") + "\n");
console.log("Scris:", out);
