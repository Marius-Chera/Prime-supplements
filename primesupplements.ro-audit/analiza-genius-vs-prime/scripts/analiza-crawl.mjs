// Sumar din date/<site>-crawl.json -> date/sumar-crawl.json
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const D = fileURLToPath(new URL('../date/', import.meta.url));
const tip = u => { const p = new URL(u).pathname; if (p === '/') return 'home';
  if (/^\/collections\/[^/]+\/products\//.test(p)) return 'produs-in-colectie'; if (p.startsWith('/products/')) return 'produs';
  if (p.startsWith('/collections')) return 'colectie'; if (/^\/blogs\/[^/]+\/[^/]+/.test(p)) return 'articol'; if (p.startsWith('/blogs')) return 'blog';
  if (p.startsWith('/pages')) return 'pagina'; if (p.startsWith('/policies')) return 'politica'; return 'altele'; };
const med = a => { const s = a.filter(x => x != null && !isNaN(x)).sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : null; };
const pct = (a, b) => b ? +(a / b * 100).toFixed(1) : 0;
const out = {};
for (const site of ['genius', 'prime']) {
  const j = JSON.parse(fs.readFileSync(`${D}${site}-crawl.json`, 'utf8')); const rows = j.rows;
  const ok = rows.filter(r => r.status === 200 && r.title !== undefined);
  const byStatus = {}; rows.forEach(r => byStatus[r.status] = (byStatus[r.status] || 0) + 1);
  const byTip = {}; ok.forEach(r => (byTip[tip(r.url)] ||= []).push(r));
  const dup = f => { const m = {}; ok.forEach(r => { const v = (r[f] || '').trim(); if (v) (m[v] ||= []).push(r.url); }); return Object.entries(m).filter(([, u]) => u.length > 1).map(([v, u]) => ({ v, n: u.length, ex: u.slice(0, 3) })).sort((a, b) => b.n - a.n); };
  const canonDiff = ok.filter(r => r.canonical && decodeURI(r.canonical.replace(/\/$/, '')) !== decodeURI(r.final.replace(/\/$/, '')));
  const imgs = ok.reduce((a, r) => a + (r.imgs || 0), 0);
  const perTip = Object.fromEntries(Object.entries(byTip).map(([t, rs]) => [t, {
    n: rs.length, words_med: med(rs.map(r => r.words)), mainWords_med: med(rs.map(r => r.mainWords)),
    titleLen_med: med(rs.map(r => r.title.length)), descLen_med: med(rs.map(r => r.metaDesc.length)),
    farDesc: rs.filter(r => !r.metaDesc).length, h1_lipsa: rs.filter(r => !r.h1?.length).length, h1_multiplu: rs.filter(r => r.h1?.length > 1).length,
    htmlKB_med: Math.round(med(rs.map(r => r.htmlBytes)) / 1024), scripts_med: med(rs.map(r => r.scripts)), ms_med: med(rs.map(r => r.ms)),
    jsonld: Object.entries(rs.flatMap(r => r.jsonldTypes || []).reduce((m, t) => (m[t] = (m[t] || 0) + 1, m), {})).sort((a, b) => b[1] - a[1]).slice(0, 14),
    breadcrumbHtml: rs.filter(r => r.breadcrumbHtml).length, depth_med: med(rs.filter(r => r.depth >= 0).map(r => r.depth)),
  }]));
  out[site] = {
    data: j.date, crawl: rows.length, byStatus, perTip,
    redirectChains: rows.filter(r => r.redirects > 1).map(r => r.chain).slice(0, 10), redirects: rows.filter(r => r.redirects > 0).length,
    errors4xx: rows.filter(r => r.status >= 400).map(r => ({ url: r.url, status: r.status, inlinks: r.inlinks })).slice(0, 40),
    noindex: ok.filter(r => /noindex/i.test(r.robots)).map(r => r.url), canonicalDiferit: canonDiff.length, canonicalDiferitEx: canonDiff.slice(0, 8).map(r => [r.url, r.canonical]),
    farCanonical: ok.filter(r => !r.canonical).length,
    titluriDuplicate: dup('title').slice(0, 10), descrieriDuplicate: dup('metaDesc').slice(0, 10),
    titluLung60: ok.filter(r => r.title.length > 60).length, titluScurt30: ok.filter(r => r.title.length < 30).length,
    descLunga160: ok.filter(r => r.metaDesc.length > 160).length, descScurta70: ok.filter(r => r.metaDesc && r.metaDesc.length < 70).length, farDesc: ok.filter(r => !r.metaDesc).length,
    imagini: imgs, altLipsa: ok.reduce((a, r) => a + r.noAlt, 0), altGol: ok.reduce((a, r) => a + r.emptyAlt, 0), lazy: ok.reduce((a, r) => a + r.lazy, 0), webp: ok.reduce((a, r) => a + r.webp, 0), farDim: ok.reduce((a, r) => a + r.noDims, 0),
    altLipsaSauGolPct: pct(ok.reduce((a, r) => a + r.noAlt + r.emptyAlt, 0), imgs),
    lang: [...new Set(ok.map(r => r.lang))], ogImageLipsa: ok.filter(r => !r.ogImage).length, twitterCard: [...new Set(ok.map(r => r.twitterCard))], favicon: ok.some(r => r.favicon),
    cedilla: ok.filter(r => r.cedilla > 5).length, cedillaEx: ok.filter(r => r.cedilla > 5).slice(0, 5).map(r => [r.url, r.cedilla]),
    faraDiacritice: ok.filter(r => r.words > 150 && r.diacritics / r.words < 0.02).map(r => r.url).slice(0, 15),
    adancime: ok.reduce((m, r) => (m[r.depth] = (m[r.depth] || 0) + 1, m), {}),
    sitemapNeatinsePrinLinkuri: j.sitemapNotReachedByLinks, sitemapNeatinseEx: j.sitemapNotReachedSample.slice(0, 15), coadaRamasa: j.queueLeft,
    paramUrlCount: j.paramUrlCount, paramKeys: Object.entries(j.paramUrls.flatMap(([u]) => [...new URL(u).searchParams.keys()]).reduce((m, k) => (m[k] = (m[k] || 0) + 1, m), {})).sort((a, b) => b[1] - a[1]).slice(0, 10),
    produsInColectieLinkuri: rows.filter(r => tip(r.url) === 'produs-in-colectie').length,
    trailingSlash: rows.filter(r => r.url.endsWith('/') && new URL(r.url).pathname !== '/').length,
  };
}
fs.writeFileSync(`${D}sumar-crawl.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1).slice(0, 200));
