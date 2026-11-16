// Pas 1a: citește catalogul public Shopify (/products.json), politicos: max 1 request/secundă.
// Utilizare: node scripts/catalog.mjs genius|prime|nutriland
import fs from 'node:fs';
const SITES = {
  genius: 'https://geniusnutrition.ro',
  prime: 'https://primesupplements.ro',
  nutriland: 'https://www.nutriland.ro',
};
const site = process.argv[2] || 'genius';
const base = SITES[site];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const all = [];
for (let page = 1; page <= 10; page++) {
  const url = `${base}/products.json?limit=250&page=${page}`;
  const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/json' } });
  console.log(res.status, url);
  if (!res.ok) break;
  const j = await res.json();
  if (!j.products?.length) break;
  all.push(...j.products);
  await sleep(1200);
}
fs.writeFileSync(`date/${site}-products.json`, JSON.stringify(all, null, 1));
console.log(site, 'produse:', all.length);
