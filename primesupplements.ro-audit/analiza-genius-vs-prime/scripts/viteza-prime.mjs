// Audit de viteză doar pentru Prime (17.11.2026): 10 pagini × {mobile, desktop} × 3 rulări, Lighthouse local.
// Pe lângă scoruri, extrage CE încetinește: elementul LCP + fazele lui, scripturile grele, terții, JS nefolosit,
// imagini, resurse blocante, cauzele CLS. Ieșire: ../../viteza-2026-11-17/
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../../viteza-2026-11-17/', import.meta.url));
fs.mkdirSync(`${OUT}lighthouse`, { recursive: true });
const ORIGIN = 'https://primesupplements.ro';
const PAGES = {
  home: '/',
  cat_proteine: '/collections/pudra-proteica',
  cat_preworkout: '/collections/suplimente-pre-workout',
  prod_whey: '/products/prime-whey-2000g',
  prod_creatina: '/products/creatina-monohidrat-micronized-300g-fara-aroma',
  prod_preworkout: '/products/nitrox',
  articol: '/blogs/news/ce-este-creatina',
  blog: '/blogs/news',
  cautare: '/search?q=proteina',
  cos: '/cart',
};
const RUNS = Number(process.env.RUNS || 3);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const resFile = `${OUT}rezultate.json`;
const results = fs.existsSync(resFile) ? JSON.parse(fs.readFileSync(resFile, 'utf8')) : {};
const items = (a, id) => a[id]?.details?.items || [];
const ent = e => (typeof e === 'string' ? e : e?.text) || '';

const chrome = await chromeLauncher.launch({ chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new', '--no-first-run', '--lang=ro-RO'] });
for (let run = 1; run <= RUNS; run++) for (const ff of ['mobile', 'desktop']) for (const [key, path] of Object.entries(PAGES)) {
  const id = `${key}_${ff}_${run}`;
  if (results[id]) continue;
  try {
    const r = await lighthouse(ORIGIN + path, { port: chrome.port, output: ['json', 'html'], logLevel: 'error', locale: 'ro' }, ff === 'desktop' ? desktopConfig : undefined);
    const lhr = r.lhr; const a = lhr.audits;
    const lcpEl = items(a, 'largest-contentful-paint-element');
    const lcpNode = lcpEl[0]?.items?.[0]?.node || lcpEl[0]?.node;
    const lcpPhases = (lcpEl[1]?.items || []).map(i => ({ faza: i.phase || i.label, ms: Math.round(i.timing) }));
    results[id] = {
      key, ff, run, url: ORIGIN + path, fetchTime: lhr.fetchTime,
      perf: Math.round(lhr.categories.performance.score * 100),
      lcp: a['largest-contentful-paint'].numericValue, fcp: a['first-contentful-paint'].numericValue,
      cls: a['cumulative-layout-shift'].numericValue, tbt: a['total-blocking-time'].numericValue,
      si: a['speed-index'].numericValue, ttfb: a['server-response-time']?.numericValue,
      bytes: a['total-byte-weight'].numericValue, requests: items(a, 'network-requests').length,
      dom: a['dom-size']?.numericValue ?? a['dom-size-insight']?.numericValue,
      lcpElement: lcpNode ? { selector: lcpNode.selector, snippet: (lcpNode.snippet || '').slice(0, 300) } : null,
      lcpPhases,
      thirdParty: items(a, 'third-party-summary').map(i => ({ entity: ent(i.entity), kb: Math.round((i.transferSize || 0) / 1024), mainThreadMs: Math.round(i.mainThreadTime || 0), blockingMs: Math.round(i.blockingTime || 0) })).slice(0, 15),
      bootup: items(a, 'bootup-time').map(i => ({ url: i.url, totalMs: Math.round(i.total), scriptMs: Math.round(i.scripting) })).slice(0, 10),
      unusedJs: items(a, 'unused-javascript').map(i => ({ url: i.url, kbWasted: Math.round((i.wastedBytes || 0) / 1024), kbTotal: Math.round((i.totalBytes || 0) / 1024) })).slice(0, 10),
      renderBlocking: items(a, 'render-blocking-resources').concat(items(a, 'render-blocking-insight')).map(i => ({ url: i.url, ms: Math.round(i.wastedMs || 0), kb: Math.round((i.totalBytes || i.transferSize || 0) / 1024) })),
      images: items(a, 'image-delivery-insight').concat(items(a, 'uses-responsive-images'), items(a, 'modern-image-formats')).map(i => ({ url: i.url, kbWasted: Math.round((i.wastedBytes || 0) / 1024) })).filter(i => i.url).slice(0, 10),
      clsCulprits: items(a, 'layout-shifts').concat(items(a, 'layout-shift-elements')).map(i => ({ score: i.score, node: i.node?.selector || '' })).slice(0, 5),
      failing: Object.values(a).filter(x => x.score !== null && x.score < 0.9 && ['numeric', 'binary', 'metricSavings'].includes(x.scoreDisplayMode) && x.details?.type !== 'debugdata').map(x => x.id).slice(0, 40),
    };
    if (run === 1) { fs.writeFileSync(`${OUT}lighthouse/${key}_${ff}.html`, r.report[1]); fs.writeFileSync(`${OUT}lighthouse/${key}_${ff}.json`, r.report[0]); }
    fs.writeFileSync(resFile, JSON.stringify(results, null, 1));
    console.error(id, results[id].perf, Math.round(results[id].lcp), results[id].cls.toFixed(3));
  } catch (e) { console.error('EROARE', id, e.message); }
  await sleep(2500);
}
await chrome.kill();
console.error('GATA viteza-prime');
