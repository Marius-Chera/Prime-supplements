// Amprenta tehnică pentru 11 magazine (25.11.2026). Doar citire, pagini publice, 1 cerere / 1,5 s pe site.
// Homepage: platformă, greutate, scripturi, terți (tracking, recenzii, chat, e-mail). robots.txt: boți AI.
// Sitemap: număr de produse / colecții / articole. Un produs din sitemap: JSON-LD, H1, titlu, cuvinte.
// Uz: node scripts/amprenta-concurenti.mjs [site ...]   Ieșire: ../../analiza-concurenta-2026-11-25/date/amprenta.json
import * as cheerio from 'cheerio';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../../analiza-concurenta-2026-11-25/date/', import.meta.url));
export const SITES = {
  prime: 'https://primesupplements.ro', genius: 'https://geniusnutrition.ro', gymbeam: 'https://gymbeam.ro',
  dynutrition: 'https://dynutrition.ro', vitabolic: 'https://www.suplimente-vitabolic.ro', nutriland: 'https://www.nutriland.ro',
  gymstack: 'https://gym-stack.ro', pronutrition: 'https://www.pronutrition.ro', naturalplus: 'https://naturalplus.ro',
  scitec: 'https://scitecnutrition.ro', balkan: 'https://balkan.ro',
};
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function get(u) {
  await sleep(1500);
  try { const r = await fetch(u, { headers: { 'user-agent': UA, 'accept-language': 'ro-RO,ro;q=0.9' }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
    return { status: r.status, url: r.url, text: await r.text() };
  } catch (e) { return { status: 0, url: u, text: '', err: String(e.message || e) }; }
}
const TERTI = {
  'GA4/gtag': /googletagmanager\.com\/gtag|gtag\(/, 'GTM': /googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]+/, 'Meta pixel': /connect\.facebook\.net|fbq\(/,
  'TikTok pixel': /analytics\.tiktok\.com|ttq\./, 'Clarity': /clarity\.ms/, 'Hotjar': /hotjar/, 'Google Ads': /AW-\d{6,}/,
  'Klaviyo': /klaviyo/, 'theMarketer': /themarketer/, 'Omnisend': /omnisend/, 'Mailchimp': /mailchimp|chimpstatic/, 'Brevo': /sendinblue|brevo/,
  'Judge.me': /judge\.me|judgeme/, 'Stamped': /stamped\.io/, 'Trustpilot': /trustpilot/, 'Yotpo': /yotpo/, 'Loox': /loox\.io/, 'Okendo': /okendo/, 'Trusted.ro': /trusted\.ro/,
  'Tidio': /tidio/, 'Gorgias': /gorgias/, 'Zendesk': /zendesk|zdassets/, 'Smartsupp': /smartsupp/, 'WhatsApp': /wa\.me\/|api\.whatsapp/,
  'Upsell/cross-sell': /rebuy|frequently.?bought|cross-?sell|upsell/i, 'Abonamente': /seal-subscriptions|recharge|subscri(ption|be-and-save)|abonament/i,
  'Fidelitate/puncte': /smile\.io|loyaltylion|rivo|puncte de fidelitate|program(ul)? de fidelitate|loyalty/i,
  'Push': /onesignal|pushowl|webpush|pushengage/i, 'Căutare dedicată': /searchanise|boost-?commerce|algolia|klevu|doofinder|luigisbox/i,
  'Rate': /tbi ?bank|mokka|paypo|plata în rate|rate fără dobândă/i, 'Easybox': /easybox/i, 'Cookie CMP': /cookiebot|pandectes|onetrust|cookieyes|complianz|termly/i,
};
const PLATF = [['Shopify', /cdn\.shopify\.com|Shopify\.theme/], ['Magento', /Magento|mage\/|requirejs-config/], ['WooCommerce', /woocommerce|wp-content/], ['PrestaShop', /prestashop/i],
  ['Gomag', /gomag/i], ['MerchantPro', /merchantpro/i], ['Shoptet', /shoptet/i], ['Next.js', /__NEXT_DATA__|_next\/static/], ['Nuxt', /__NUXT__/]];
const BOTI = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'CCBot', 'Bytespider', 'Applebot-Extended'];

function boti(robots) {
  const grupuri = []; let cur = null;
  for (const l of robots.split(/\r?\n/)) { const m = l.match(/^\s*([A-Za-z-]+)\s*:\s*(.*?)\s*$/); if (!m) continue; const [, k, v] = m;
    if (/user-agent/i.test(k)) { if (!cur || cur.reguli.length) { cur = { ua: [], reguli: [] }; grupuri.push(cur); } cur.ua.push(v); }
    else if (cur && /^(dis)?allow$/i.test(k)) cur.reguli.push([k.toLowerCase(), v]); }
  const out = {}; for (const b of BOTI) { const g = grupuri.find(g => g.ua.some(u => u.toLowerCase() === b.toLowerCase()));
    out[b] = g ? (g.reguli.some(([k, v]) => k === 'disallow' && v === '/') ? 'blocat' : 'numit') : 'implicit'; }
  return out;
}
async function sitemapUrls(origin, robots) {
  const start = [...robots.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map(m => m[1]); if (!start.length) start.push(origin + '/sitemap.xml');
  const urls = []; const coada = [...new Set(start)]; let n = 0;
  while (coada.length && n < 40) { const u = coada.shift(); n++; const r = await get(u); if (r.status !== 200) continue;
    const locs = [...r.text.matchAll(/<loc>\s*(?:<!\[CDATA\[)?\s*([^<\s\]]+)/g)].map(m => m[1].replace(/&amp;/g, '&'));
    if (/<sitemapindex/i.test(r.text)) coada.push(...locs.filter(l => !/image|video/i.test(l))); else urls.push(...locs); }
  return urls;
}
const tipUrl = u => { let p; try { p = decodeURI(new URL(u).pathname).toLowerCase(); } catch { return 'altele'; }
  if (/\/blog|\/articol|\/news|\/stiri|\/sfaturi|\/ghid/.test(p)) return 'articol';
  if (/\/collections\/[^/]+$|\/categor|\/c\//.test(p)) return 'categorie';
  if (/\/products?\/|\/produs\/|\/p\/|-p\d+$|\.html$/.test(p)) return 'produs'; return 'altele'; };
function jsonld($) {
  const tipuri = new Set(); let rating = null, oferta = false;
  $('script[type="application/ld+json"]').each((_, e) => { try { const walk = o => { if (!o || typeof o !== 'object') return; if (Array.isArray(o)) return o.forEach(walk);
      const t = o['@type']; (Array.isArray(t) ? t : [t]).filter(Boolean).forEach(x => tipuri.add(x));
      if (o.aggregateRating) rating = { valoare: o.aggregateRating.ratingValue, numar: o.aggregateRating.reviewCount || o.aggregateRating.ratingCount };
      if (o.offers) oferta = true; Object.values(o).forEach(walk); }; walk(JSON.parse($(e).html())); } catch {} });
  return { tipuri: [...tipuri], rating, oferta };
}
const doar = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
const FIS = OUT + 'amprenta.json';
for (const [site, origin] of Object.entries(SITES)) {
  if (doar.length && !doar.includes(site)) continue;
  const o = { origin };
  const h = await get(origin + '/'); o.home = { status: h.status, url: h.url, kb: Math.round(h.text.length / 1024) };
  const $ = cheerio.load(h.text);
  o.platforma = (PLATF.find(([, re]) => re.test(h.text)) || ['necunoscut'])[0];
  o.home.scripturi = $('script[src]').length; o.home.titlu = $('title').first().text().trim(); o.home.descriere = $('meta[name="description"]').attr('content') || '';
  o.home.h1 = $('h1').map((_, e) => $(e).text().trim().replace(/\s+/g, ' ')).get().slice(0, 3);
  const hosts = new Set(); $('script[src]').each((_, e) => { try { hosts.add(new URL($(e).attr('src'), origin).host); } catch {} });
  o.home.domeniiScripturi = [...hosts].sort();
  o.terti = Object.entries(TERTI).filter(([, re]) => re.test(h.text)).map(([k]) => k);
  const txt = $('body').text().replace(/\s+/g, ' ');
  o.home.livrareGratuita = (txt.match(/livrare (?:gratuit[ăa]|gratis)[^.!|]{0,80}?\d[\d.,]*\s*(lei|ron)/i) || txt.match(/(peste|de la)\s*\d[\d.,]*\s*(lei|ron)[^.!|]{0,40}(livrare|transport) gratu/i) || [null])[0];
  o.home.jsonld = jsonld($).tipuri;
  const rb = await get(origin + '/robots.txt'); o.robots = rb.status === 200 ? boti(rb.text) : { status: rb.status };
  const ll = await get(origin + '/llms.txt'); o.llms = ll.status === 200 && !/<html/i.test(ll.text.slice(0, 300)) ? { kb: +(ll.text.length / 1024).toFixed(1), genericShopify: /Agent Instructions|shop\.app|UCP/i.test(ll.text) } : null;
  const urls = await sitemapUrls(origin, rb.status === 200 ? rb.text : '');
  const cnt = { produs: 0, categorie: 0, articol: 0, altele: 0 }; urls.forEach(u => cnt[tipUrl(u)]++); o.sitemap = { total: urls.length, ...cnt };
  const prod = urls.filter(u => tipUrl(u) === 'produs');
  const ales = prod.find(u => /whey/i.test(u)) || prod.find(u => /protein/i.test(u)) || prod[0];
  if (ales) { const p = await get(ales); const $p = cheerio.load(p.text); const ld = jsonld($p);
    o.produs = { url: ales, status: p.status, titlu: $p('title').first().text().trim(), descriereMetaCaractere: ($p('meta[name="description"]').attr('content') || '').length,
      h1: $p('h1').length, cuvinte: $p('body').text().replace(/\s+/g, ' ').split(' ').length, jsonld: ld.tipuri, rating: ld.rating, oferta: ld.oferta,
      ogImage: !!$p('meta[property="og:image"]').attr('content'), canonical: $p('link[rel="canonical"]').attr('href') || null }; }
  const vechi = fs.existsSync(FIS) ? JSON.parse(fs.readFileSync(FIS, 'utf8')) : {};
  fs.writeFileSync(FIS, JSON.stringify({ ...vechi, cand: new Date().toISOString(), [site]: o }, null, 1));
  console.log(site, o.platforma, JSON.stringify(o.sitemap), (o.produs?.jsonld || []).join(','), o.terti.length);
}
console.log('GATA');
