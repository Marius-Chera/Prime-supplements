import puppeteer from 'puppeteer-core';
import fs from 'fs';
const [,, outdir, themeId] = process.argv;
fs.mkdirSync(outdir, {recursive: true});
const PAGES = {home: '/', product: '/products/prime-whey-2000g', collection: '/collections/pudra-proteica', article: '/blogs/news/ce-este-intra-workout'};
const VIEWS = {mobile: {width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true}, desktop: {width: 1350, height: 940, deviceScaleFactor: 1}};
const browser = await puppeteer.launch({executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', headless: 'new',
  args: ['--no-sandbox', '--proxy-server=http://127.0.0.1:33241', '--disable-dev-shm-usage', '--font-render-hinting=none']});
const sleep = ms => new Promise(r => setTimeout(r, ms));
for (const [vname, vp] of Object.entries(VIEWS)) {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport(vp);
  if (vp.isMobile) await page.setUserAgent('Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36');
  await page.emulateMediaFeatures([{name: 'prefers-reduced-motion', value: 'reduce'}]);
  if (themeId) await page.goto(`https://primesupplements.ro/?preview_theme_id=${themeId}`, {waitUntil: 'networkidle2', timeout: 90000});
  for (const [pname, path] of Object.entries(PAGES)) {
    const errors = [];
    page.removeAllListeners('console');
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
    await page.goto('https://primesupplements.ro' + path, {waitUntil: 'networkidle2', timeout: 90000});
    // scroll through the page to trigger lazy content, then back to top
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
    await sleep(3500);
    // remove third-party overlays that change between loads (popups, chat, preview bar), freeze carousels
    await page.evaluate(() => {
      document.querySelectorAll('#PBarNextFrameWrapper, [id^="dondy"], .dondy-whatsapp, #shopify-pc__banner, #web-pixels-manager-sandbox-container').forEach(e => e.remove());
      if (window.pcTarget && window.pcTarget.host) window.pcTarget.host.remove();
      document.querySelectorAll('body > div').forEach(d => { if (d.shadowRoot) d.remove(); });
      const st = document.createElement('style');
      st.textContent = '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important} .jdgm-carousel-wrapper, .jdgm-carousel, [class*="whatsapp"], [id*="whatsapp"] {visibility:hidden!important}';
      document.head.appendChild(st);
    });
    await sleep(800);
    const file = `${outdir}/${pname}-${vname}.png`;
    await page.screenshot({path: file, fullPage: true});
    const info = await page.evaluate(() => ({title: document.title, h: document.body.scrollHeight, fonts: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight + ' ' + f.style).sort().join(' | '), viewport: document.querySelector('meta[name=viewport]').content}));
    console.log(vname, pname, JSON.stringify(info), 'consoleErrors:', errors.length, errors.slice(0, 3).join(' || '));
    await sleep(1500);
  }
  await ctx.close();
}
await browser.close();
