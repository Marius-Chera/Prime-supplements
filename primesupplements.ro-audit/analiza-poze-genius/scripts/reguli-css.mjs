// Extrage regulile CSS exacte care ating imaginea de produs din card (Genius, pagină colecție) + testează hover pe card.
import fs from 'node:fs';
import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport: { width: 1366, height: 900 } });
await p.goto('https://geniusnutrition.ro/collections/aminoacizi', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(4000);
const reguli = await p.evaluate(() => {
  const out = [];
  for (const sh of document.styleSheets) {
    let rules; try { rules = sh.cssRules; } catch { continue; }
    const walk = (rs) => { for (const r of rs) {
      if (r.cssRules && !r.selectorText && r.type !== 7) walk(r.cssRules);
      const t = r.cssText;
      if (/product-card__image|zoom-fade|product-card:hover|list-view-item:hover|image-loader/.test(t)) out.push((sh.href || 'inline').split('/').pop().split('?')[0] + ' :: ' + t.slice(0, 600));
    } };
    walk(rules);
  }
  return out;
});
const card = p.locator('.product-card').first();
await card.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
const box = await card.boundingBox();
const clip = { x: box.x - 10, y: box.y - 10, width: box.width + 20, height: box.height + 20 };
await p.screenshot({ path: 'screenshots/genius-card-A-fara-hover.png', clip });
const imgs0 = await card.evaluate((c) => [...c.querySelectorAll('img')].map((i) => [i.currentSrc.split('/').pop().slice(0, 70), getComputedStyle(i).opacity]));
await card.hover(); await p.waitForTimeout(1000);
await p.screenshot({ path: 'screenshots/genius-card-B-hover.png', clip });
const imgs1 = await card.evaluate((c) => [...c.querySelectorAll('img')].map((i) => [i.currentSrc.split('/').pop().slice(0, 70), getComputedStyle(i).opacity]));
fs.writeFileSync('date/reguli-css-genius.txt', reguli.join('\n\n') + '\n\nHOVER înainte: ' + JSON.stringify(imgs0) + '\nHOVER după: ' + JSON.stringify(imgs1) + '\n');
console.log(reguli.length, JSON.stringify(imgs0), JSON.stringify(imgs1));
await b.close();
