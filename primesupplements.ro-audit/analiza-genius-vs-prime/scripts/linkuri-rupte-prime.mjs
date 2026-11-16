// Caută paginile Prime care au linkuri către URL-uri 404 sau redirecționate (din crawl). 1 cerere/s.
import fs from 'node:fs'; import * as cheerio from 'cheerio'; import { fileURLToPath } from 'node:url';
const D = fileURLToPath(new URL('../date/', import.meta.url));
const j = JSON.parse(fs.readFileSync(D + 'prime-crawl.json', 'utf8'));
const tinte = new Map(j.rows.filter(r => r.status === 404 || r.redirects > 0).map(r => [new URL(r.url).pathname, r.status === 404 ? '404' : 'redirect']));
const surse = j.rows.filter(r => r.status === 200 && !/tagged|\?page/.test(r.url) && /\/(blogs|pages|collections)\//.test(r.url) || r.url === 'https://primesupplements.ro/').map(r => r.url);
const gasit = [];
for (const u of surse) { let h = ''; try { h = await (await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/131' } })).text(); } catch { await new Promise(r => setTimeout(r, 5000)); continue; } const $ = cheerio.load(h);
  $('a[href]').each((_, e) => { try { const p = decodeURI(new URL($(e).attr('href'), u).pathname); if (tinte.has(p)) gasit.push({ sursa: u, tinta: p, tip: tinte.get(p) }); } catch {} });
  await new Promise(r => setTimeout(r, 2000)); }
fs.writeFileSync(D + 'prime-linkuri-rupte.json', JSON.stringify({ verificate: surse.length, gasit }, null, 1)); console.log('GATA', surse.length, gasit.length);
