// Pas 2: efectele sunt în imagine sau în cod? Playwright (Chrome instalat), pagini publice, 1 pagină pe rând.
// Pentru fiecare pagină: screenshot fără/cu hover pe cardul de produs, video scurt (recordVideo),
// inventar DOM (video/canvas/model-viewer/lottie/three/gif), stilurile calculate pe <img> și pe strămoși
// (filter, box-shadow, mix-blend-mode, -webkit-box-reflect, mask, transform, transition, animation, ::before/::after),
// lista @keyframes, și comparația URL afișat vs fișier CDN. Utilizare: node scripts/inspecteaza.mjs genius|prime
import fs from 'node:fs';
import { chromium } from 'playwright-core';
const site = process.argv[2] || 'genius';
const PAGINI = {
  genius: [
    ['home', 'https://geniusnutrition.ro/'],
    ['col-proteine', 'https://geniusnutrition.ro/collections/proteine'],
    ['col-aminoacizi', 'https://geniusnutrition.ro/collections/aminoacizi'],
    ['col-produse-noi', 'https://geniusnutrition.ro/collections/produse-noi'],
    ['p-bcaa-x5', 'https://geniusnutrition.ro/products/bcaa-x5-360g-26serv'],
    ['p-isolate-x5', 'https://geniusnutrition.ro/products/isolate-x5-2000g-60serv'],
    ['p-cell-x7', 'https://geniusnutrition.ro/products/cell-x7-720g-45serv'],
  ],
  prime: [
    ['home', 'https://primesupplements.ro/'],
    ['col-proteine', 'https://primesupplements.ro/collections/proteine'],
    ['p-recovery-bcaa', 'https://primesupplements.ro/products/recovery-bcaa-500g'],
  ],
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const raport = {};
for (const [nume, url] of PAGINI[site]) {
  for (const [disp, vp] of [['desktop', { width: 1366, height: 900 }], ['mobil', { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({
      viewport: vp, deviceScaleFactor: disp === 'mobil' ? 3 : 1, isMobile: disp === 'mobil', hasTouch: disp === 'mobil',
      recordVideo: disp === 'desktop' ? { dir: `video/${site}-${nume}`, size: vp } : undefined,
      userAgent: disp === 'mobil' ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Mobile Safari/537.36' : undefined,
    });
    const page = await ctx.newPage();
    const imgReq = [];
    page.on('response', (r) => {
      const ct = r.headers()['content-type'] || '';
      if (/image|video|json.*lottie/.test(ct) || /\.(mp4|webm|lottie|glb|gltf)(\?|$)/.test(r.url())) imgReq.push({ url: r.url().slice(0, 220), ct, len: +(r.headers()['content-length'] || 0) });
    });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await sleep(3500);
    // închide eventuale bannere cookie fără a accepta (Escape)
    await page.keyboard.press('Escape').catch(() => {});
    // derulăm lent ca să încarce lazy-load
    for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 500); await sleep(400); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(800);
    const info = await page.evaluate(() => {
      const props = ['filter', 'boxShadow', 'mixBlendMode', 'webkitBoxReflect', 'maskImage', 'webkitMaskImage', 'transform', 'transition', 'animationName', 'backgroundImage', 'opacity', 'clipPath'];
      const pick = (cs) => Object.fromEntries(props.map((p) => [p, cs[p]]).filter(([, v]) => v && !['none', 'normal', 'auto', '1', 'all 0s ease 0s', 'all', ''].includes(v) && !/^none/.test(v)));
      const imgs = [...document.querySelectorAll('img')].filter((i) => /products|files/.test(i.currentSrc || i.src) && i.getBoundingClientRect().width > 120).slice(0, 6);
      const desc = imgs.map((img) => {
        const chain = [];
        let el = img;
        for (let k = 0; k < 6 && el; k++, el = el.parentElement) {
          const s = pick(getComputedStyle(el));
          const b = getComputedStyle(el, '::before'), a = getComputedStyle(el, '::after');
          const pb = b.content && b.content !== 'none' ? pick(b) : null;
          const pa = a.content && a.content !== 'none' ? pick(a) : null;
          chain.push({ tag: el.tagName.toLowerCase(), cls: (el.className?.baseVal ?? el.className ?? '').toString().slice(0, 80), stil: s, before: pb && Object.keys(pb).length ? { content: b.content, ...pb } : null, after: pa && Object.keys(pa).length ? { content: a.content, ...pa } : null });
        }
        const r = img.getBoundingClientRect();
        return { src: (img.currentSrc || img.src).slice(0, 200), afisat: `${Math.round(r.width)}x${Math.round(r.height)}`, natural: `${img.naturalWidth}x${img.naturalHeight}`, alt: img.alt, loading: img.loading, srcsetN: (img.srcset || '').split(',').length, chain };
      });
      const kf = [];
      for (const sh of document.styleSheets) { try { for (const r of sh.cssRules) if (r.type === 7) kf.push(r.name); } catch {} }
      const q = (s) => document.querySelectorAll(s).length;
      return {
        imagini: desc,
        keyframes: [...new Set(kf)].slice(0, 60),
        elemente: { video: q('video'), canvas: q('canvas'), modelViewer: q('model-viewer'), lottie: q('lottie-player,dotlottie-player,[data-animation-path]'), iframe: q('iframe'), gif: [...document.images].filter((i) => /\.gif|\.apng/i.test(i.currentSrc)).length, svgAnim: q('animate,animateTransform') },
        scripturi: [...document.scripts].map((s) => s.src).filter((s) => /three|lottie|gsap|model-viewer|spline|webgl|swiper|aos|tilt/i.test(s)).slice(0, 10),
        tema: window.Shopify?.theme ? { name: window.Shopify.theme.name, schema: window.Shopify.theme.schema_name, ver: window.Shopify.theme.schema_version } : null,
      };
    });
    await page.screenshot({ path: `screenshots/${site}-${nume}-${disp}.png` });
    // hover pe primul card de produs (doar desktop)
    let hover = null;
    if (disp === 'desktop') {
      const card = page.locator('a[href*="/products/"] img').first();
      if (await card.count()) {
        await card.scrollIntoViewIfNeeded();
        await sleep(600);
        const box = await card.boundingBox();
        const clip = box ? { x: Math.max(0, box.x - 20), y: Math.max(0, box.y - 20), width: Math.min(vp.width, box.width + 40), height: box.height + 120 } : undefined;
        await page.mouse.move(5, 5);
        await sleep(500);
        const st0 = await card.evaluate((i) => { const c = getComputedStyle(i); return { t: c.transform, f: c.filter, o: c.opacity, src: i.currentSrc.slice(0, 160) }; });
        await page.screenshot({ path: `screenshots/${site}-${nume}-card-fara-hover.png`, clip });
        await card.hover();
        await sleep(900);
        const st1 = await card.evaluate((i) => { const c = getComputedStyle(i); return { t: c.transform, f: c.filter, o: c.opacity, src: i.currentSrc.slice(0, 160) }; });
        await page.screenshot({ path: `screenshots/${site}-${nume}-card-hover.png`, clip });
        // al doilea <img> vizibil în același card (swap de imagine la hover)?
        const swap = await card.evaluate((i) => { const a = i.closest('a,li,.card,.product-card,div'); return a ? [...a.querySelectorAll('img')].map((x) => ({ src: x.currentSrc.slice(0, 120), op: getComputedStyle(x).opacity })) : []; });
        hover = { inainte: st0, dupa: st1, imaginiInCard: swap };
        await sleep(1500);
      }
    }
    raport[`${nume}-${disp}`] = { url, ...info, hover, cereriMedia: imgReq.slice(0, 40), nrCereriMedia: imgReq.length, kbMedia: Math.round(imgReq.reduce((s, r) => s + r.len, 0) / 1024) };
    console.log(nume, disp, 'img', info.imagini.length, 'kf', info.keyframes.length, JSON.stringify(info.elemente), hover ? 'hover:' + JSON.stringify([hover.inainte.t, hover.dupa.t, hover.inainte.src === hover.dupa.src]) : '');
    await ctx.close();
    await sleep(1200);
  }
}
fs.writeFileSync(`date/inspectie-${site}.json`, JSON.stringify(raport, null, 1));
await browser.close();
