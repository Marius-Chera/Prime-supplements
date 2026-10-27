// „Programul meu personalizat” (ușa C): poza produsului (stilul pozelor de la sesiuni) + CSV de import Shopify.
// Rulare: node chera-coaching/programe/personalizat/genereaza-personalizat.mjs
//   → poza: programe/personalizat/program-personalizat.png (se urcă în Content → Files cu același nume)
//   → CSV:  programe/personalizat/import-program-personalizat.csv (Products → Import; produs nou, fără „Overwrite”)
// După import: în produs, Theme template = „program” (formularul cu date și poze înainte de plată, sections/main-program.liquid).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "..", "..");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const P = {
  handle: "program-personalizat",
  titlu: "Programul meu personalizat",
  pret: 500,
  tip: "Program personalizat",
  tags: "program-personalizat",
  descriere: "<p>Completezi formularul de mai jos: datele tale, scopul, cum te antrenezi și ce mănânci acum, plus trei poze (față, lateral, spate). Apoi plătești, iar eu îți scriu programul complet, 100% pe datele tale: antrenament, dietă și suplimente.</p><p>Fără consultanță săptămânală: primești programul și îl aplici singur. Vrei o actualizare peste câteva luni? Îl comanzi din nou, cu datele noi. Dacă treci la coaching, prețul programului se scade din prima lună.</p>",
  seoTitlu: "Program personalizat de antrenament, dietă și suplimente | Chera Protocol",
  seoDescriere: "Programul tău, scris de Marius Chera pe datele tale: antrenament, dietă și suplimente. Completezi formularul cu poze, plătești o dată, 500 lei.",
  poza: { fisier: "chera-galerie-64.jpg", eye: "Ușa C · Start singur", nume: "Program personalizat", sub: "Antrenament + dietă + suplimente<br>scrise de mine pe datele tale", foot: "Formular · poze · plată", b: "1 la 1" },
};

// --- poza ---
const stamp = readFileSync(join(ROOT, "brand/logo/stampila/chera-protocol-stampila-inchis.svg"), "utf8");
const font = (f) => pathToFileURL(join(ROOT, "brand/fonts", f)).href;
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:BC;src:url("${font("BarlowCondensed-ExtraBold.ttf")}")}
@font-face{font-family:BCB;src:url("${font("BarlowCondensed-Bold.ttf")}")}
@font-face{font-family:B;src:url("${font("Barlow-SemiBold.ttf")}")}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:1500px;background:#0d0d0d;overflow:hidden}
body{position:relative;color:#f5f1ec;font-family:B,sans-serif}
.photo{position:absolute;inset:0;background:url("https://bp66vh-bq.myshopify.com/cdn/shop/files/${P.poza.fisier}?width=1200") center top/cover no-repeat}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,13,13,.55) 0%,rgba(13,13,13,0) 26%,rgba(13,13,13,0) 40%,rgba(13,13,13,.9) 66%,#0d0d0d 100%)}
.bar{position:absolute;left:0;top:0;width:100%;height:16px;background:#ec1e24}
.logo{position:absolute;top:72px;left:80px;width:300px}.logo svg{width:100%;height:auto;display:block}
.mid{position:absolute;left:90px;right:90px;bottom:84px}
.eye{font-family:BCB;font-size:46px;letter-spacing:.3em;color:#ec1e24;text-transform:uppercase}
.name{font-family:BC;font-size:150px;line-height:.9;text-transform:uppercase;margin-top:14px;text-shadow:0 4px 30px rgba(0,0,0,.6)}
.rule{width:120px;height:8px;background:#ec1e24;margin:30px 0 24px}
.sub{font-size:34px;line-height:1.3;color:#d9d3cc}
.foot{display:flex;justify-content:space-between;align-items:flex-end;margin-top:34px;padding-top:26px;border-top:1px solid rgba(245,241,236,.25);font-family:BCB;font-size:36px;letter-spacing:.14em;text-transform:uppercase;color:#a39d96}
.foot b{font-family:BC;font-size:76px;letter-spacing:0;color:#f5f1ec;line-height:1}
</style></head><body><div class="photo"></div><div class="shade"></div><div class="bar"></div><div class="logo">${stamp}</div>
<div class="mid"><div class="eye">${P.poza.eye}</div><div class="name">${P.poza.nume}</div><div class="rule"></div><div class="sub">${P.poza.sub}</div>
<div class="foot"><span>${P.poza.foot}</span><b>${P.poza.b}</b></div></div></body></html>`;
mkdirSync(join(DIR, "_html"), { recursive: true });
const hp = join(DIR, "_html", `${P.handle}.html`);
writeFileSync(hp, html);
const png = join(DIR, `${P.handle}.png`);
execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--allow-file-access-from-files",
  "--window-size=1200,1500", "--virtual-time-budget=8000", `--screenshot=${png}`, pathToFileURL(hp).href], { stdio: "ignore" });

// --- CSV ---
const cell = (v) => { const s = v == null ? "" : String(v); return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
const row = {
  "URL handle": P.handle, Title: P.titlu, Description: P.descriere, Vendor: "Chera Protocol", Type: P.tip, Tags: P.tags,
  "Published on online store": "true", Status: "active", SKU: "PROG-PERS", "Option1 name": "Title", "Option1 value": "Default Title",
  Price: P.pret.toFixed(2), "Inventory tracker": "", "Continue selling when out of stock": "deny", "Weight value (grams)": 0,
  "Requires shipping": "false", "Fulfillment service": "manual",
  "Product image URL": `https://bp66vh-bq.myshopify.com/cdn/shop/files/${P.handle}.png`, "Image position": 1, "Image alt text": `${P.titlu} – Marius Chera`,
  "SEO title": P.seoTitlu, "SEO description": P.seoDescriere,
};
const cols = Object.keys(row);
writeFileSync(join(DIR, `import-${P.handle}.csv`), "\uFEFF" + cols.join(",") + "\n" + cols.map((c) => cell(row[c])).join(",") + "\n");
console.log(png, join(DIR, `import-${P.handle}.csv`));
