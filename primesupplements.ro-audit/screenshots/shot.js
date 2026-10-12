const { chromium } = require('playwright');
(async () => {
  const url = process.argv[2]; const out = process.argv[3]; const mobile = process.argv[4] === 'mobile';
  const browser = await chromium.launch({ proxy: { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' } });
  const ctx = await browser.newContext(mobile
    ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' }
    : { viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  const t0 = Date.now();
  const resp = await page.goto(url, { waitUntil: 'load', timeout: 90000 });
  const loadMs = Date.now() - t0;
  await page.waitForTimeout(1500);
  await page.screenshot({ path: out, fullPage: false });
  const info = await page.evaluate(() => ({
    title: document.title, h1: [...document.querySelectorAll('h1')].map(h => h.innerText.trim()).slice(0, 3),
    scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth,
    viewport: document.querySelector('meta[name=viewport]')?.content || null,
    imgsNoAlt: [...document.images].filter(i => !i.alt).length, imgs: document.images.length,
    ctaAboveFold: [...document.querySelectorAll('a,button')].filter(e => { const r = e.getBoundingClientRect(); return r.top >= 0 && r.bottom <= window.innerHeight && r.width > 0 && /cump|comand|adaug|vezi|cos|cart/i.test(e.innerText); }).map(e => e.innerText.trim()).slice(0, 5),
    fontSizeBody: getComputedStyle(document.body).fontSize,
  }));
  console.log(JSON.stringify({ url, status: resp && resp.status(), loadMs, mobile, ...info }));
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
