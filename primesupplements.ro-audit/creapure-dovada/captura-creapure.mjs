// Captura dovezii Creapure: cardul Prime Supplements din lista oficiala creapure.com/en/buy-here
// Pagina lor NU se modifica; se face doar scroll la card si se decupeaza zona lui.
// Rulare: node captura-creapure.mjs   (foloseste puppeteer-core din ../analiza-genius-vs-prime)
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const puppeteer = require('../analiza-genius-vs-prime/node_modules/puppeteer-core');
const dir = path.dirname(fileURLToPath(import.meta.url));
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = 'https://www.creapure.com/en/buy-here/';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--lang=en-US'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
// cookie banner: doar il ascundem vizual daca acopera cardul (nu acceptam nimic)
await page.addStyleTag({ content: '#usercentrics-root,#CybotCookiebotDialog,.cookie-banner,[id*=cookie i]{display:none!important}' });

const box = await page.evaluate(async () => {
  const card = [...document.querySelectorAll('.simple-product-card')].find(c => /PRIME SUPPLEMENTS/.test(c.innerText));
  if (!card) return null;
  const outer = card.closest('[class*=col]') || card;
  outer.scrollIntoView({ block: 'center' });
  await new Promise(r => setTimeout(r, 2500)); // lazy images
  const r = outer.getBoundingClientRect();
  return { x: r.x, y: r.y, width: r.width, height: r.height, text: card.innerText, href: card.querySelector('a')?.href };
});
if (!box) throw new Error('Cardul Prime Supplements nu a fost gasit pe creapure.com');
await page.waitForFunction(() => {
  const card = [...document.querySelectorAll('.simple-product-card')].find(c => /PRIME SUPPLEMENTS/.test(c.innerText));
  return [...(card.closest('[class*=col]') || card).querySelectorAll('img')].every(i => i.complete && !i.src.startsWith('data:'));
}, { timeout: 15000 }).catch(() => console.warn('imaginile lazy nu s-au incarcat complet'));

const pad = 16;
const handle = await page.evaluateHandle(() => {
  const card = [...document.querySelectorAll('.simple-product-card')].find(c => /PRIME SUPPLEMENTS/.test(c.innerText));
  return card.closest('[class*=col]') || card;
});
await handle.evaluate(e => { e.style.padding = '12px'; e.style.background = '#fff'; });
await handle.screenshot({ path: path.join(dir, 'card-prime-creapure.png') });
void pad;
await page.screenshot({ path: path.join(dir, 'pagina-creapure-viewport.png') });
const zi = new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Bucharest' });
fs.writeFileSync(path.join(dir, 'captura-info.json'), JSON.stringify({ url: URL, data: zi, card: box.text, link: box.href }, null, 2));

// imaginea pentru galerie (1600x1600): cardul real + adresa + data
const png = fs.readFileSync(path.join(dir, 'card-prime-creapure.png')).toString('base64');
const html = `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet"><style>
*{box-sizing:border-box;margin:0}body{width:800px;height:800px;font-family:Poppins,sans-serif;background:#f4f6f3;display:flex;flex-direction:column;align-items:center;padding:28px 40px}
.bar{width:100%;background:#fff;border:1px solid #d9ddd6;border-radius:12px;padding:10px 16px;display:flex;align-items:center;gap:10px;font-size:15px;color:#333}
.bar .lock{width:18px;height:18px}.bar b{font-weight:600}
h1{font-size:23px;font-weight:700;color:#111;margin:20px 0 4px;text-align:center}
p.sub{font-size:14px;color:#555;text-align:center;margin-bottom:14px}
.shot{flex:1;min-height:0;display:flex;align-items:center;justify-content:center}
.shot img{max-height:100%;max-width:100%;border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.12);background:#fff}
.foot{font-size:13px;color:#666;margin-top:14px;text-align:center}
</style></head><body>
<div class="bar"><svg class="lock" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg><span>https://www.<b>creapure.com</b>/en/buy-here/</span></div>
<h1>Prime Supplements în lista oficială Creapure®</h1>
<p class="sub">Captură reală din pagina „Buy here” a creapure.com · ${zi}</p>
<div class="shot"><img src="data:image/png;base64,${png}"></div>
<div class="foot">Verifică singur: creapure.com → Buy here → țara „Romania” → Prime Supplements</div>
</body></html>`;
await page.setViewport({ width: 800, height: 800, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'load', timeout: 60000 }); await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(dir, 'creapure-dovada-galerie.png') });
await browser.close();
console.log('OK', zi, box.text.replace(/\s+/g, ' '), box.href);
