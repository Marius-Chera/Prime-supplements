// Playwright (Chrome instalat): screenshot-uri 1440/390, HTML brut vs randat, JSON-LD randat, axe-core,
// rețea (third-party), elemente fixe pe mobil, teste de căutare. Doar citire: nu adaugă în coș, nu intră în checkout.
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import * as cheerio from 'cheerio';
import { SET } from './pagini.mjs';
const require = createRequire(import.meta.url);
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const ROOT = fileURLToPath(new URL('../', import.meta.url));
const SHOTS = ROOT + 'screenshots/'; const DATA = ROOT + 'date/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const only = process.argv[2]; // opțional: o singură pagină
const words = s => (s.match(/[\p{L}\d]+/gu) || []).length;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';

const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const outFile = DATA + 'browser-audit.json';
const all = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};

async function dismiss(page) {
  // cookie: alegem varianta cea mai restrictivă; pop-up-uri: Escape / butoane „închide”
  for (const re of [/^(refuz|refuză|respinge|resping|doar (cele )?necesare|decline|reject)/i]) {
    const b = page.getByRole('button', { name: re }).first(); if (await b.isVisible().catch(() => false)) { await b.click().catch(() => {}); await sleep(800); }
  }
  await page.keyboard.press('Escape').catch(() => {}); await sleep(400);
  for (const sel of ['[aria-label*="close" i]:visible', '[aria-label*="închide" i]:visible', 'button.needsclick[aria-label*="Close" i]']) {
    const els = page.locator(sel); const n = Math.min(await els.count().catch(() => 0), 3);
    for (let i = 0; i < n; i++) { const e = els.nth(i); const box = await e.boundingBox().catch(() => null);
      if (box && box.width < 80 && await e.isVisible().catch(() => false)) { const inDialog = await e.evaluate(el => !!el.closest('[role="dialog"],[class*="popup" i],[class*="modal" i],[id*="popup" i]')).catch(() => false); if (inDialog) await e.click({ timeout: 1500 }).catch(() => {}); } }
  }
}

async function measureFixed(page) {
  return page.evaluate(() => { const vw = innerWidth, vh = innerHeight; let area = 0; const items = [];
    for (const el of document.querySelectorAll('body *')) { const cs = getComputedStyle(el); if (cs.position !== 'fixed' && cs.position !== 'sticky') continue;
      if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue; const r = el.getBoundingClientRect();
      const w = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0)), h = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      if (w * h < 400) continue; if (el.parentElement && ['fixed', 'sticky'].includes(getComputedStyle(el.parentElement).position)) continue;
      area += w * h; items.push({ tag: el.tagName, cls: (el.className?.toString() || '').slice(0, 60), id: el.id, top: Math.round(r.top), h: Math.round(h), pct: +(w * h / (vw * vh) * 100).toFixed(1) }); }
    return { pct: +(area / (vw * vh) * 100).toFixed(1), items }; });
}

for (const site of ['prime', 'genius']) for (const [key, path] of Object.entries(SET[site].pages)) {
  if (only && key !== only) continue;
  if (!only && all[`${site}_${key}`]?.status === 200) continue;
  const url = SET[site].origin + path; const id = `${site}_${key}`; const rec = { url };
  // HTML brut
  const raw = await fetch(url, { headers: { 'user-agent': UA } }); const rawHtml = await raw.text(); rec.status = raw.status;
  const $ = cheerio.load(rawHtml); $('script,style,noscript,svg,template').remove(); rec.rawWords = words($('body').text());
  for (const vp of [{ n: 'desktop', w: 1440, h: 900 }, { n: 'mobil', w: 390, h: 844 }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, userAgent: vp.n === 'mobil' ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Mobile Safari/537.36' : UA, locale: 'ro-RO', isMobile: vp.n === 'mobil', hasTouch: vp.n === 'mobil', deviceScaleFactor: 1 });
    const page = await ctx.newPage(); const reqs = [];
    page.on('response', async r => { try { const h = new URL(r.url()).host; const len = Number(r.headers()['content-length'] || 0); reqs.push({ host: h, type: r.request().resourceType(), len }); } catch {} });
    try { await page.goto(url, { waitUntil: 'load', timeout: 60000 }); } catch (e) { rec[vp.n + '_err'] = e.message; }
    await sleep(4000); await dismiss(page); await sleep(800);
    if (vp.n === 'desktop') {
      rec.renderedWords = words(await page.evaluate(() => document.body.innerText));
      rec.jsonld = await page.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { return JSON.parse(s.textContent); } catch { return { __invalid: s.textContent.slice(0, 200) }; } }));
      rec.microdata = await page.evaluate(() => [...new Set([...document.querySelectorAll('[itemtype]')].map(e => e.getAttribute('itemtype')))]);
      await page.addScriptTag({ content: AXE }).catch(() => {});
      const axe = await page.evaluate(async () => { try { const r = await window.axe.run(document, { resultTypes: ['violations'] }); return r.violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, help: v.help })); } catch (e) { return { err: e.message }; } });
      rec.axe = axe;
      const own = new URL(url).host; const tp = {};
      for (const r of reqs) { if (r.host.endsWith(own) || r.host === 'cdn.shopify.com' || r.host.endsWith('shopifycdn.com')) continue; tp[r.host] = tp[r.host] || { n: 0, bytes: 0 }; tp[r.host].n++; tp[r.host].bytes += r.len; }
      rec.requestsDesktop = reqs.length; rec.thirdPartyHosts = Object.entries(tp).sort((a, b) => b[1].n - a[1].n).map(([h, v]) => ({ host: h, ...v }));
      rec.h1Rendered = await page.evaluate(() => [...document.querySelectorAll('h1')].map(h => h.innerText.trim()).filter(Boolean));
    } else {
      rec.fixedTop = await measureFixed(page);
      await page.evaluate(() => scrollTo(0, innerHeight * 1.5)); await sleep(1500);
      rec.fixedScrolled = await measureFixed(page);
      await page.evaluate(() => scrollTo(0, 0)); await sleep(500);
    }
    await page.screenshot({ path: `${SHOTS}${id}_${vp.n}_viewport.jpg`, type: 'jpeg', quality: 70 });
    // full page: scroll pentru lazy-load, limită 12000 px
    await page.evaluate(async () => { for (let y = 0; y < Math.min(document.body.scrollHeight, 12000); y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); });
    await sleep(800);
    const H = await page.evaluate(() => Math.min(document.documentElement.scrollHeight, 12000));
    rec[vp.n + '_height'] = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: `${SHOTS}${id}_${vp.n}.jpg`, type: 'jpeg', quality: 55, clip: { x: 0, y: 0, width: vp.w, height: H }, fullPage: true }).catch(e => rec[vp.n + '_shotErr'] = e.message);
    await ctx.close();
  }
  if (rec.status === 429) { console.error("429 – pauză 5 min", id); await sleep(300000); continue; }
  all[id] = rec; fs.writeFileSync(outFile, JSON.stringify(all, null, 1)); console.error(id, rec.status, rec.rawWords, rec.renderedWords);
  await sleep(10000);
  await sleep(2000);
}
// Căutare: sugestii (endpoint public Shopify predictive search) pentru termeni cu/fără greșeli
const termeni = ['proteina', 'creatina', 'wey', 'preworkout', 'izolat', 'bcaa'];
const cautare = {};
for (const site of ['prime', 'genius']) for (const t of termeni) {
  const u = `${SET[site].origin}/search/suggest.json?q=${encodeURIComponent(t)}&resources[type]=product&resources[limit]=10&resources[options][fields]=title,product_type,variants.title,tag`;
  const r = await fetch(u, { headers: { 'user-agent': UA } }); let titles = [];
  try { titles = (await r.json()).resources.results.products.map(p => p.title); } catch {}
  cautare[`${site}_${t}`] = { status: r.status, n: titles.length, titles }; await sleep(1500);
}
all.__cautare = cautare; fs.writeFileSync(outFile, JSON.stringify(all, null, 1));
await browser.close(); console.error('GATA browser-audit');
