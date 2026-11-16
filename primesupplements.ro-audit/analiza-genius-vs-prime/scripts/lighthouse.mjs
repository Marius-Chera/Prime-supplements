// Lighthouse: LH_PAGES × {mobile, desktop} × 3 rulări, alternând site-urile; salvează JSON + HTML + mediane.
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SET, LH_PAGES } from './pagini.mjs';

const OUT = fileURLToPath(new URL('../lighthouse/', import.meta.url));
const RUNS = 3;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const median = a => { const s = [...a].filter(x => x != null).sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : null; };
const resFile = `${OUT}rezultate.json`;
const results = fs.existsSync(resFile) ? JSON.parse(fs.readFileSync(resFile, 'utf8')) : {};

const chrome = await chromeLauncher.launch({ chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new', '--no-first-run', '--lang=ro-RO'] });
for (const ff of ['mobile', 'desktop']) for (const key of LH_PAGES) for (let run = 1; run <= RUNS; run++) for (const site of ['prime', 'genius']) {
  const id = `${site}_${key}_${ff}_${run}`;
  if (results[id]) continue;
  const url = SET[site].origin + SET[site].pages[key];
  try {
    const r = await lighthouse(url, { port: chrome.port, output: ['json', 'html'], logLevel: 'error', locale: 'ro' }, ff === 'desktop' ? desktopConfig : undefined);
    const lhr = r.lhr; const a = lhr.audits;
    const thirdParty = (a['third-party-summary']?.details?.items || []).map(i => ({ entity: typeof i.entity === 'string' ? i.entity : i.entity?.text, transferSize: i.transferSize, blockingTime: i.blockingTime, mainThreadTime: i.mainThreadTime }));
    const net = a['network-requests']?.details?.items || [];
    const byType = {}; for (const i of net) { const t = i.resourceType || 'Other'; byType[t] = byType[t] || { n: 0, bytes: 0 }; byType[t].n++; byType[t].bytes += i.transferSize || 0; }
    results[id] = { site, key, ff, run, url, fetchTime: lhr.fetchTime,
      perf: lhr.categories.performance.score * 100, a11y: lhr.categories.accessibility.score * 100,
      bp: lhr.categories['best-practices'].score * 100, seo: lhr.categories.seo.score * 100,
      lcp: a['largest-contentful-paint'].numericValue, cls: a['cumulative-layout-shift'].numericValue, tbt: a['total-blocking-time'].numericValue,
      fcp: a['first-contentful-paint'].numericValue, si: a['speed-index'].numericValue, ttfb: a['server-response-time']?.numericValue,
      totalBytes: a['total-byte-weight'].numericValue, requests: net.length, byType, thirdParty: thirdParty.slice(0, 25) };
    if (run === 1) { fs.writeFileSync(`${OUT}${site}_${key}_${ff}.html`, r.report[1]); fs.writeFileSync(`${OUT}${site}_${key}_${ff}.json`, r.report[0]); }
    fs.writeFileSync(resFile, JSON.stringify(results, null, 1));
    console.error(id, results[id].perf, Math.round(results[id].lcp));
  } catch (e) { console.error('EROARE', id, e.message); }
  await sleep(3000);
}
await chrome.kill();

const med = {};
for (const r of Object.values(results)) { const k = `${r.site}|${r.key}|${r.ff}`; (med[k] ||= []).push(r); }
const rows = Object.entries(med).map(([k, rs]) => { const [site, key, ff] = k.split('|'); const o = { site, key, ff, n: rs.length };
  for (const m of ['perf', 'a11y', 'bp', 'seo', 'lcp', 'cls', 'tbt', 'fcp', 'si', 'ttfb', 'totalBytes', 'requests']) o[m] = median(rs.map(r => r[m])); return o; });
fs.writeFileSync(`${OUT}mediane.json`, JSON.stringify(rows, null, 1));
fs.writeFileSync(`${OUT}mediane.csv`, 'site,pagina,dispozitiv,rulari,performance,accessibility,best_practices,seo,lcp_ms,cls,tbt_ms,fcp_ms,speed_index_ms,ttfb_ms,bytes,requests\n' +
  rows.map(o => [o.site, o.key, o.ff, o.n, o.perf, o.a11y, o.bp, o.seo, Math.round(o.lcp), o.cls?.toFixed(3), Math.round(o.tbt), Math.round(o.fcp), Math.round(o.si), Math.round(o.ttfb), o.totalBytes, o.requests].join(',')).join('\n'));
console.error('GATA lighthouse');
