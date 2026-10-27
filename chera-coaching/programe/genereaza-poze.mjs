// Poze de produs pentru programele digitale (1200x1500, 4:5): ștampila Chera Protocol + numele programului.
// Rulare: node programe/genereaza-poze.mjs  →  programe/poze/<handle>.png
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

const programe = JSON.parse(readFileSync(join(DIR, "programe.json"), "utf8"));
const stamp = readFileSync(join(ROOT, "brand/logo/stampila/chera-protocol-stampila-inchis.svg"), "utf8");
const font = (f) => pathToFileURL(join(ROOT, "brand/fonts", f)).href;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const p of programe) {
  const name = p.title.replace(/^Program\s+/i, "");
  const size = name.length > 16 ? 150 : name.length > 10 ? 190 : 240;
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:BC;src:url("${font("BarlowCondensed-ExtraBold.ttf")}")}
@font-face{font-family:BCB;src:url("${font("BarlowCondensed-Bold.ttf")}")}
@font-face{font-family:B;src:url("${font("Barlow-SemiBold.ttf")}")}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:1500px;background:#0d0d0d;overflow:hidden}
body{position:relative;color:#f5f1ec;font-family:B,sans-serif;
  background:radial-gradient(120% 70% at 50% 0%,#1d1d1d 0%,#0d0d0d 60%)}
.frame{position:absolute;inset:48px;border:2px solid #2a2a2a}
.bar{position:absolute;left:0;top:0;width:100%;height:18px;background:#ec1e24}
.logo{position:absolute;top:150px;left:50%;transform:translateX(-50%);width:520px}
.logo svg{width:100%;height:auto;display:block}
.mid{position:absolute;left:110px;right:110px;top:640px}
.eye{font-family:BCB;font-size:56px;letter-spacing:.32em;color:#ec1e24;text-transform:uppercase}
.name{font-family:BC;font-size:${size}px;line-height:.9;text-transform:uppercase;margin-top:18px;letter-spacing:-.005em}
.rule{width:140px;height:10px;background:#ec1e24;margin:44px 0 36px}
.sub{font-size:40px;line-height:1.3;color:#c9c4bd}
.foot{position:absolute;left:110px;right:110px;bottom:120px;display:flex;justify-content:space-between;align-items:flex-end;
  font-family:BCB;font-size:44px;letter-spacing:.14em;text-transform:uppercase;color:#8d8882}
.foot b{font-family:BC;font-size:84px;letter-spacing:0;color:#f5f1ec}
</style></head><body>
<div class="bar"></div><div class="frame"></div>
<div class="logo">${stamp}</div>
<div class="mid"><div class="eye">Program digital</div><div class="name">${esc(name)}</div><div class="rule"></div>
<div class="sub">${esc(p.sub)}<br>Nivel: ${esc(p.level)}</div></div>
<div class="foot"><span>PDF · descărcare imediată</span><b>200 lei</b></div>
</body></html>`;
  const hp = join(TMP, `${p.handle}.html`);
  writeFileSync(hp, html);
  const png = join(OUT, `${p.handle}.png`);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
    "--window-size=1200,1500", "--virtual-time-budget=3000", `--screenshot=${png}`, pathToFileURL(hp).href], { stdio: "ignore" });
  console.log(png);
}
