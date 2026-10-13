import puppeteer from 'puppeteer-core';
const [,, url] = process.argv;
const browser = await puppeteer.launch({executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', headless: 'new',
  args: ['--no-sandbox','--proxy-server=http://127.0.0.1:33241','--disable-dev-shm-usage']});
const page = await browser.newPage();
await page.setViewport({width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true});
await page.evaluateOnNewDocument(() => {
  const d = Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'href');
  Object.defineProperty(HTMLLinkElement.prototype, 'href', {set(v) { if (String(v) === 'null' || v === null) console.log('HREFNULL ' + new Error().stack); return d.set.call(this, v); }, get() { return d.get.call(this); }, configurable: true});
  const sa = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(n, v) { if (n === 'href' && (v === null || String(v) === 'null')) console.log('SETATTRNULL ' + new Error().stack); return sa.call(this, n, v); };
});
page.on('console', m => { const t = m.text(); if (/NULL/.test(t)) console.log(t.slice(0, 1500)); });
await page.goto(url, {waitUntil: 'networkidle2', timeout: 90000});
await new Promise(r => setTimeout(r, 3000));
await browser.close();
