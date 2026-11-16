// Crawl politicos, doar HTML brut (fără JS). Uz: node scripts/crawl.mjs genius|prime [max] [delayMs]
// Respectă robots.txt (grupul *), max 1 cerere / DELAY ms, pauză la 429.
import * as cheerio from 'cheerio';
import fs from 'node:fs';

const SITES = { genius: 'https://geniusnutrition.ro', prime: 'https://primesupplements.ro' };
const name = process.argv[2];
const ORIGIN = SITES[name];
const HOST = new URL(ORIGIN).host;
const MAX = Number(process.argv[3] || 500);
const DELAY = Number(process.argv[4] || 1500);
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
import { fileURLToPath } from 'node:url';
const OUT = fileURLToPath(new URL('../date/', import.meta.url));
const sleep = ms => new Promise(r => setTimeout(r, ms));

const robotsTxt = fs.readFileSync(`${OUT}${name}-robots.txt`, 'utf8');
const disallow = [];
{ let inStar = false;
  for (const line of robotsTxt.split(/\r?\n/)) {
    const [k, ...v] = line.split(':'); const val = v.join(':').trim();
    if (/^user-agent$/i.test(k.trim())) inStar = val === '*';
    else if (inStar && /^disallow$/i.test(k.trim()) && val) disallow.push(val);
  } }
const toRe = p => new RegExp('^' + p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$'));
const disRe = disallow.map(toRe);
const allowed = u => { const x = new URL(u); const p = x.pathname + x.search; return !disRe.some(r => r.test(p)); };

const sitemap = fs.readFileSync(`${OUT}${name}-sitemap-urls.tsv`, 'utf8').trim().split('\n').map(l => l.split('\t')[1]).filter(Boolean);
const sitemapSet = new Set(sitemap.map(u => { try { return decodeURI(u); } catch { return u; } }));

const norm = (href, base) => {
  try { const u = new URL(href, base); if (u.host !== HOST && u.host !== 'www.' + HOST) return null;
    u.hash = ''; u.host = HOST; u.protocol = 'https:'; let s = u.toString(); try { s = decodeURI(s); } catch {} return s; } catch { return null; }
};
const crawlable = u => { const x = new URL(u); if (/\.(jpg|jpeg|png|webp|gif|svg|pdf|zip|js|css|xml|txt|md|json)$/i.test(x.pathname)) return false;
  if (/^\/(cart|account|checkouts|apps|tools|cdn|services)/.test(x.pathname)) return false;
  const keys = [...x.searchParams.keys()]; return keys.length === 0 || (keys.length === 1 && keys[0] === 'page'); };

const pages = new Map(); const inlinks = new Map(); const paramUrls = new Map();
const queue = [{ url: ORIGIN + '/', depth: 0 }]; const seen = new Set([ORIGIN + '/']);

async function get(url) {
  const chain = []; let cur = url; let res;
  for (let i = 0; i < 6; i++) {
    for (let t = 0; t < 4; t++) {
      const t0 = Date.now();
      try { res = await fetch(encodeURI(cur), { redirect: 'manual', headers: { 'user-agent': UA, 'accept-language': 'ro-RO,ro;q=0.9' } }); }
      catch (e) { res = { status: 0, headers: new Headers(), text: async () => '' }; }
      res.ms = Date.now() - t0;
      if (res.status !== 429 && res.status !== 430) break;
      console.error('429 – pauză 60 s', cur); await sleep(60000);
    }
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      chain.push(`${res.status} ${cur}`); cur = new URL(res.headers.get('location'), cur).toString(); await sleep(DELAY); continue; }
    break;
  }
  const body = (res.headers.get('content-type') || '').includes('html') ? await res.text() : '';
  return { status: res.status, final: cur, chain, body, ms: res.ms };
}

function extract(html) {
  const $ = cheerio.load(html);
  const jsonld = []; $('script[type="application/ld+json"]').each((_, e) => { try { jsonld.push(JSON.parse($(e).text())); } catch { jsonld.push({ __invalid: true }); } });
  const types = new Set(); const walk = o => { if (!o || typeof o !== 'object') return; if (Array.isArray(o)) return o.forEach(walk);
    if (o['@type']) [].concat(o['@type']).forEach(t => types.add(t)); Object.values(o).forEach(v => typeof v === 'object' && walk(v)); };
  jsonld.forEach(walk);
  const imgs = $('img'); let noAlt = 0, emptyAlt = 0, lazy = 0, webp = 0, noDims = 0;
  imgs.each((_, e) => { const a = $(e).attr('alt'); if (a === undefined) noAlt++; else if (!a.trim()) emptyAlt++;
    if ($(e).attr('loading') === 'lazy') lazy++; const s = ($(e).attr('src') || '') + ($(e).attr('srcset') || '');
    if (/\.webp|\.avif|format=webp|format=avif/i.test(s)) webp++; if (!$(e).attr('width') || !$(e).attr('height')) noDims++; });
  const links = []; $('a[href]').each((_, e) => links.push($(e).attr('href')));
  $('script,style,noscript,svg,template').remove();
  const text = $('body').text().replace(/\s+/g, ' ').trim();
  const mainText = ($('main').text() || '').replace(/\s+/g, ' ').trim();
  const words = s => (s.match(/[\p{L}\d]+/gu) || []).length;
  const $h = cheerio.load(html);
  return {
    title: $h('title').first().text().trim(), metaDesc: $h('meta[name="description"]').attr('content')?.trim() || '',
    canonical: $h('link[rel="canonical"]').attr('href') || '', robots: $h('meta[name="robots"]').attr('content') || '',
    lang: $h('html').attr('lang') || '', h1: $h('h1').map((_, e) => $h(e).text().replace(/\s+/g, ' ').trim()).get(),
    h2count: $h('h2').length, h3count: $h('h3').length,
    ogTitle: $h('meta[property="og:title"]').attr('content') || '', ogImage: $h('meta[property="og:image"]').attr('content') || '',
    ogType: $h('meta[property="og:type"]').attr('content') || '', twitterCard: $h('meta[name="twitter:card"]').attr('content') || '',
    favicon: $h('link[rel~="icon"]').attr('href') || '', hreflang: $h('link[rel="alternate"][hreflang]').length,
    pagNext: $h('link[rel="next"]').attr('href') || '', breadcrumbHtml: $h('[class*="breadcrumb" i], nav[aria-label*="breadcrumb" i]').length > 0,
    imgs: imgs.length, noAlt, emptyAlt, lazy, webp, noDims, words: words(text), mainWords: words(mainText),
    diacritics: (text.match(/[ăâîșțşţ]/gi) || []).length, cedilla: (text.match(/[şţ]/gi) || []).length,
    jsonldTypes: [...types], jsonldInvalid: jsonld.filter(j => j.__invalid).length, htmlBytes: Buffer.byteLength(html),
    scripts: $h('script').length, links,
  };
}

let n = 0;
async function crawlOne(url, depth) {
  if (!allowed(url)) { pages.set(url, { url, depth, status: 'robots-blocked' }); return; }
  const r = await get(url); n++;
  const rec = { url, depth, status: r.status, final: r.final, redirects: r.chain.length, chain: r.chain.join(' > '), ms: r.ms, inSitemap: sitemapSet.has(url) };
  if (r.body) {
    const x = extract(r.body); const links = x.links; delete x.links; Object.assign(rec, x);
    let internal = 0, external = 0;
    for (const h of links) { const u = norm(h, r.final);
      if (!u) { if (/^https?:/.test(h)) external++; continue; } internal++;
      inlinks.set(u, (inlinks.get(u) || 0) + 1);
      if ([...new URL(u).searchParams.keys()].some(k => k !== 'page')) { paramUrls.set(u, (paramUrls.get(u) || 0) + 1); continue; }
      if (!seen.has(u) && crawlable(u)) { seen.add(u); queue.push({ url: u, depth: depth + 1 }); } }
    rec.internalLinks = internal; rec.externalLinks = external;
  }
  pages.set(url, rec);
  if (n % 25 === 0) console.error(`${name}: ${n} pagini, coadă ${queue.length}`);
}

while (queue.length && n < MAX) { const { url, depth } = queue.shift(); await crawlOne(url, depth); await sleep(DELAY); }
const missing = [...sitemapSet].filter(u => !pages.has(u) && crawlable(u));
let extra = 0; for (const u of missing) { if (extra++ >= 150) break; await crawlOne(u, -1); await sleep(DELAY); }

const rows = [...pages.values()].map(p => ({ ...p, inlinks: inlinks.get(p.url) || 0 }));
fs.writeFileSync(`${OUT}${name}-crawl.json`, JSON.stringify({ origin: ORIGIN, date: new Date().toISOString(), disallow, rows,
  paramUrls: [...paramUrls.entries()].sort((a, b) => b[1] - a[1]).slice(0, 300), paramUrlCount: paramUrls.size,
  queueLeft: queue.length, sitemapNotReachedByLinks: missing.length, sitemapNotReachedSample: missing.slice(0, 200) }, null, 1));
const cols = ['url', 'status', 'depth', 'inSitemap', 'inlinks', 'redirects', 'chain', 'final', 'ms', 'title', 'metaDesc', 'canonical', 'robots', 'lang', 'h1', 'h2count', 'words', 'mainWords', 'imgs', 'noAlt', 'emptyAlt', 'lazy', 'webp', 'noDims', 'jsonldTypes', 'jsonldInvalid', 'htmlBytes', 'scripts', 'internalLinks', 'externalLinks', 'ogTitle', 'ogImage', 'twitterCard', 'breadcrumbHtml', 'diacritics', 'cedilla'];
const esc = v => { const s = Array.isArray(v) ? v.join(' | ') : (v ?? '').toString(); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
fs.writeFileSync(`${OUT}${name}-crawl.csv`, '﻿' + cols.join(',') + '\n' + rows.map(r => cols.map(c => esc(r[c])).join(',')).join('\n'));
console.error(`${name}: GATA, ${rows.length} URL-uri`);
