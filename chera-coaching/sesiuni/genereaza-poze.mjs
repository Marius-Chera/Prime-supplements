// Poze de produs pentru sesiuni (1200x1500, 4:5), în stilul pozelor de la programe: poza din galerie (Shopify Files)
// ca fundal, ștampila Chera Protocol, numele sesiunii, detaliile și prețul.
// Rulare: node sesiuni/genereaza-poze.mjs  →  sesiuni/poze/sesiune-<handle>.png (se urcă în Content → Files cu același nume)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "..");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = join(DIR, "poze");
const TMP = join(OUT, "_html");
mkdirSync(TMP, { recursive: true });

const cfg = JSON.parse(readFileSync(join(DIR, "program-sesiuni.json"), "utf8"));
const stamp = readFileSync(join(ROOT, "brand/logo/stampila/chera-protocol-stampila-inchis.svg"), "utf8");
const font = (f) => pathToFileURL(join(ROOT, "brand/fonts", f)).href;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const s of cfg.sesiuni) {
  const photo = `https://bp66vh-bq.myshopify.com/cdn/shop/files/${s.poza.fisier}?width=1200`;
  const name = s.poza.nume;
  const size = name.length > 16 ? 130 : name.length > 14 ? 150 : 180;
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:BC;src:url("${font("BarlowCondensed-ExtraBold.ttf")}")}
@font-face{font-family:BCB;src:url("${font("BarlowCondensed-Bold.ttf")}")}
@font-face{font-family:B;src:url("${font("Barlow-SemiBold.ttf")}")}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:1500px;background:#0d0d0d;overflow:hidden}
body{position:relative;color:#f5f1ec;font-family:B,sans-serif}
.photo{position:absolute;inset:0;background:url("${photo}") center top/cover no-repeat}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,13,13,.55) 0%,rgba(13,13,13,0) 26%,rgba(13,13,13,0) 44%,rgba(13,13,13,.9) 70%,#0d0d0d 100%)}
.bar{position:absolute;left:0;top:0;width:100%;height:16px;background:#ec1e24}
.logo{position:absolute;top:72px;left:80px;width:300px}
.logo svg{width:100%;height:auto;display:block}
.mid{position:absolute;left:90px;right:90px;bottom:84px}
.eye{font-family:BCB;font-size:46px;letter-spacing:.3em;color:#ec1e24;text-transform:uppercase}
.name{font-family:BC;font-size:${size}px;line-height:.9;text-transform:uppercase;margin-top:14px;text-shadow:0 4px 30px rgba(0,0,0,.6)}
.rule{width:120px;height:8px;background:#ec1e24;margin:30px 0 24px}
.sub{font-size:34px;line-height:1.3;color:#d9d3cc}
.foot{display:flex;justify-content:space-between;align-items:flex-end;margin-top:34px;padding-top:26px;border-top:1px solid rgba(245,241,236,.25);
  font-family:BCB;font-size:36px;letter-spacing:.14em;text-transform:uppercase;color:#a39d96}
.foot b{font-family:BC;font-size:76px;letter-spacing:0;color:#f5f1ec;line-height:1}
</style></head><body>
<div class="photo"></div><div class="shade"></div><div class="bar"></div>
<div class="logo">${stamp}</div>
<div class="mid"><div class="eye">Sesiune individuală</div><div class="name">${esc(name)}</div><div class="rule"></div>
<div class="sub">${esc(s.poza.sub)}<br>Alegi ziua și ora, plătești online</div>
<div class="foot"><span>Rezervare în calendar</span><b>${s.durataMinute || cfg.durataMinute} min</b></div></div>
</body></html>`;
  const hp = join(TMP, `sesiune-${s.handle}.html`);
  writeFileSync(hp, html);
  const png = join(OUT, `sesiune-${s.handle}${cfg.pozaSufix || ""}.png`); // fără preț pe poză: prețul se schimbă din admin
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--allow-file-access-from-files",
    "--window-size=1200,1500", "--virtual-time-budget=8000", `--screenshot=${png}`, pathToFileURL(hp).href], { stdio: "ignore" });
  console.log(png);
}
