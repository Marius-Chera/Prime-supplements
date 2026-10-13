import puppeteer from 'puppeteer-core';
import fs from 'fs';
const out = process.argv[2];
const axe = fs.readFileSync(new URL('./node_modules/axe-core/axe.min.js', import.meta.url), 'utf8');
const browser = await puppeteer.launch({executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', headless: 'new', args: ['--no-sandbox','--proxy-server=http://127.0.0.1:33241','--disable-dev-shm-usage']});
const page = await browser.newPage();
await page.setViewport({width: 1350, height: 940});
await page.goto('https://primesupplements.ro/?preview_theme_id=193875083639', {waitUntil: 'networkidle2', timeout: 90000});
await page.goto('https://primesupplements.ro/products/prime-whey-2000g', {waitUntil: 'networkidle2', timeout: 90000});
await page.addScriptTag({content: axe});
await new Promise(r => setTimeout(r, 4000));
await page.addStyleTag({content: '*{animation:none!important;transition:none!important}'});
await page.evaluate(() => { if (window.pcTarget && window.pcTarget.host) window.pcTarget.host.style.display = 'none'; });
const run = async (tag) => {
  const r = await page.evaluate(async () => { const res = await axe.run(document, {runOnly: ['aria-required-parent', 'aria-required-children']}); return res.violations.map(v => [v.id, v.nodes.length]); });
  const box = await page.evaluate(() => { const t = document.querySelector('x-tabs.tabs-inner'); t.scrollIntoView({block: 'center'}); const r = t.getBoundingClientRect(); return {x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: Math.min(r.height, 700)}; });
  await new Promise(r => setTimeout(r, 800));
  const tablist = await page.evaluate(() => { const s = document.querySelector('x-tabs.tabs-inner').shadowRoot.querySelector('[part="tab-list"]'); const cs = getComputedStyle(s); const r = s.getBoundingClientRect(); return {tag: s.tagName, display: cs.display, grid: cs.gridTemplateColumns, w: r.width, h: r.height, after: getComputedStyle(s, '::after').width}; });
  const btns = await page.evaluate(() => Array.from(document.querySelectorAll('x-tabs.tabs-inner > button')).map(b => { const r = b.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)]; }));
  await page.screenshot({path: `${out}-${tag}.png`, clip: {x: box.x, y: box.y, width: box.w, height: box.h}, captureBeyondViewport: true});
  console.log(tag, JSON.stringify(r), JSON.stringify(tablist), JSON.stringify(btns));
};
await run('before');
await page.evaluate(() => {
  const root = document.querySelector('x-tabs.tabs-inner').shadowRoot;
  const slot = root.querySelector('slot[name="title"]');
  const div = document.createElement('div');
  div.setAttribute('role', 'tablist'); div.setAttribute('part', 'tab-list');
  slot.removeAttribute('role'); slot.removeAttribute('part');
  slot.replaceWith(div); div.appendChild(slot);
});
await run('after');
// click second tab to verify the component still works
await page.evaluate(() => document.querySelectorAll('x-tabs.tabs-inner > button')[1].click());
await new Promise(r => setTimeout(r, 800));
console.log('after-click selected', await page.evaluate(() => [document.querySelector('x-tabs.tabs-inner').getAttribute('selected-index'), Array.from(document.querySelectorAll('x-tabs.tabs-inner > [slot=content]')).map(p => p.hidden)]));
await browser.close();
