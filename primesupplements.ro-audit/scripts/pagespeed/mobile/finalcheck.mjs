import puppeteer from 'puppeteer-core';
import fs from 'fs';
const axe = fs.readFileSync(new URL('./node_modules/axe-core/axe.min.js', import.meta.url), 'utf8');
const browser = await puppeteer.launch({executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', headless: 'new', args: ['--no-sandbox','--proxy-server=http://127.0.0.1:33241','--disable-dev-shm-usage']});
const page = await browser.newPage();
await page.setViewport({width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true});
await page.goto('https://primesupplements.ro/?preview_theme_id=193875083639', {waitUntil: 'networkidle2', timeout: 90000});
const pages = ['/', '/products/prime-whey-2000g', '/products/pure-isolate-2000g', '/collections/pudra-proteica', '/blogs/news/ce-este-intra-workout', '/blogs/news/ce-este-creatina', '/blogs/news/carbohidrati-intra-workout-rezultate', '/pages/contact', '/search?q=creatina'];
for (const p of pages) {
  const r = await page.goto('https://primesupplements.ro' + p, {waitUntil: 'networkidle2', timeout: 90000});
  const raw = await r.text();
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } window.scrollTo(0, 0); });
  await new Promise(r => setTimeout(r, 1500));
  const scrollTop = await page.evaluate(() => document.scrollingElement.scrollTop);
  await page.addScriptTag({content: axe});
  const v = await page.evaluate(async () => {
    const res = await axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']}});
    return res.violations.map(x => [x.id, x.nodes.filter(n => !n.target.join(' ').includes('PBarNext')).map(n => n.target.join(' ').slice(-60) + ' :: ' + (n.any[0]?.message || '').slice(0, 90))]).filter(x => x[1].length);
  });
  const tools = await page.$$eval('form[toolname]', fs => fs.map(f => f.getAttribute('toolname')));
  const dups = tools.filter((t, i) => tools.indexOf(t) !== i);
  const broken = await page.$$eval('img', im => im.filter(i => i.complete && i.naturalWidth === 0 && i.src && !i.src.startsWith('data:')).map(i => i.src.slice(-70)));
  console.log(`${r.status()} ${p} preview=${raw.includes('193875083639')} liquidErr=${(raw.match(/Liquid (syntax )?error/gi) || []).length} scrollTop=${scrollTop} dupTools=${dups.length} brokenImgs=${broken.length}`);
  for (const [id, nodes] of v) console.log(`   axe ${id} (${nodes.length}): ${nodes.slice(0, 3).join(' | ')}`);
  if (broken.length) console.log('   broken:', broken.join(' , '));
}
await browser.close();
