// Lighthouse pe homepage-ul celor 11 magazine (25.11.2026): {mobile, desktop} × 3 rulări, alternând site-urile; mediana.
// Ieșire: ../../analiza-concurenta-2026-11-25/date/lighthouse.json + lighthouse-mediane.csv
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../../analiza-concurenta-2026-11-25/date/', import.meta.url));
const SITES = {
  prime: 'https://primesupplements.ro/', genius: 'https://geniusnutrition.ro/', gymbeam: 'https://gymbeam.ro/',
  dynutrition: 'https://dynutrition.ro/', vitabolic: 'https://www.suplimente-vitabolic.ro/', nutriland: 'https://www.nutriland.ro/',
  gymstack: 'https://gym-stack.ro/', pronutrition: 'https://www.pronutrition.ro/', naturalplus: 'https://naturalplus.ro/',
  scitec: 'https://scitecnutrition.ro/', balkan: 'https://balkan.ro/',
};
const RUNS = 3;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const median = a => { const s = a.filter(x => x != null).sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : null; };
fs.mkdirSync(OUT, { recursive: true });
const FIS = OUT + 'lighthouse.json';
const res = fs.existsSync(FIS) ? JSON.parse(fs.readFileSync(FIS, 'utf8')) : {};
const chrome = await chromeLauncher.launch({ chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new', '--no-first-run', '--lang=ro-RO'] });
for (const ff of ['mobile', 'desktop']) for (let run = 1; run <= RUNS; run++) for (const [site, url] of Object.entries(SITES)) {
  const id = `${site}_${ff}_${run}`; if (res[id]) continue;
  try {
    const { lhr } = await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error', locale: 'ro' }, ff === 'desktop' ? desktopConfig : undefined);
    const a = lhr.audits; const c = lhr.categories;
    res[id] = { site, ff, run, url, perf: c.performance.score * 100, a11y: c.accessibility.score * 100, bp: c['best-practices'].score * 100, seo: c.seo.score * 100,
      lcp: a['largest-contentful-paint'].numericValue, cls: a['cumulative-layout-shift'].numericValue, tbt: a['total-blocking-time'].numericValue,
      ttfb: a['server-response-time']?.numericValue, totalBytes: a['total-byte-weight'].numericValue, requests: (a['network-requests']?.details?.items || []).length };
    fs.writeFileSync(FIS, JSON.stringify(res, null, 1)); console.error(id, res[id].perf, Math.round(res[id].lcp));
  } catch (e) { console.error('EROARE', id, e.message); }
  await sleep(2000);
}
await chrome.kill();
const grup = {}; for (const r of Object.values(res)) (grup[`${r.site}|${r.ff}`] ||= []).push(r);
const rows = Object.entries(grup).map(([k, rs]) => { const [site, ff] = k.split('|'); const o = { site, ff, n: rs.length };
  for (const m of ['perf', 'a11y', 'bp', 'seo', 'lcp', 'cls', 'tbt', 'ttfb', 'totalBytes', 'requests']) o[m] = median(rs.map(r => r[m])); return o; });
fs.writeFileSync(OUT + 'lighthouse-mediane.csv', 'site,dispozitiv,rulari,performance,accessibility,best_practices,seo,lcp_ms,cls,tbt_ms,ttfb_ms,kb,cereri\n' +
  rows.map(o => [o.site, o.ff, o.n, o.perf, o.a11y, o.bp, o.seo, Math.round(o.lcp), o.cls?.toFixed(3), Math.round(o.tbt), Math.round(o.ttfb), Math.round(o.totalBytes / 1024), o.requests].join(',')).join('\n'));
console.error('GATA lighthouse');
