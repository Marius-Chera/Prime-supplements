import puppeteer from 'puppeteer-core';
import fs from 'fs';
const [,, themeId, outdir, ...paths] = process.argv;
fs.mkdirSync(outdir, {recursive: true});
const browser = await puppeteer.launch({executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', headless: 'new', args: ['--no-sandbox','--proxy-server=http://127.0.0.1:33241','--disable-dev-shm-usage']});
const page = await browser.newPage();
await page.setViewport({width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true});
await page.goto(`https://primesupplements.ro/?preview_theme_id=${themeId}`, {waitUntil: 'networkidle2', timeout: 90000});
for (const p of paths) {
  const r = await page.goto('https://primesupplements.ro' + p, {waitUntil: 'networkidle2', timeout: 90000});
  const raw = await r.text();
  fs.writeFileSync(`${outdir}/${p.replace(/[^a-z0-9]+/gi, '_')}.raw.html`, raw);
  fs.writeFileSync(`${outdir}/${p.replace(/[^a-z0-9]+/gi, '_')}.dom.html`, await page.content());
  console.log(r.status(), p, raw.length);
  await new Promise(r => setTimeout(r, 2500));
}
await browser.close();
