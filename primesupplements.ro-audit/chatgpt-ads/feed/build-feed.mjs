// Generează feed-ul de produse pentru ChatGPT Business Hub (OpenAI product feed, JSONL).
// Intrare: unul sau mai multe fișiere JSON cu răspunsul GraphQL Admin `products` (pagini),
// filtrate deja pe tipurile de produse permise de OpenAI Commerce Policies (fără suplimente).
// Utilizare: node build-feed.mjs <out.jsonl> <pagina1.json> [<pagina2.json> ...]
// Spec: https://developers.openai.com/commerce/specs/file-upload/products.md

import fs from 'node:fs';

const [out, ...inputs] = process.argv.slice(2);
if (!out || !inputs.length) {
  console.error('node build-feed.mjs <out.jsonl> <pagina.json>...');
  process.exit(1);
}

// Tipuri permise (politica OpenAI interzice suplimentele ingerabile cu efecte de sănătate/culturism).
const ALLOWED = new Set([
  'Tricouri', 'Maiouri', 'Pantaloni scurți', 'Pantaloni', 'Hanorace', 'Șepci',
  'Accesorii sală', 'Shakere', 'Unt de nuci și semințe', 'Cremă de orez și ovăz',
]);

const CATEGORY = {
  'Tricouri': 'Apparel & Accessories > Clothing > Activewear > T-Shirts',
  'Maiouri': 'Apparel & Accessories > Clothing > Activewear > Tank Tops',
  'Pantaloni scurți': 'Apparel & Accessories > Clothing > Activewear > Shorts',
  'Pantaloni': 'Apparel & Accessories > Clothing > Activewear > Pants',
  'Hanorace': 'Apparel & Accessories > Clothing > Activewear > Hoodies',
  'Șepci': 'Apparel & Accessories > Clothing Accessories > Hats > Baseball Caps',
  'Accesorii sală': 'Sporting Goods > Exercise & Fitness > Fitness Accessories',
  'Shakere': 'Sporting Goods > Exercise & Fitness > Shaker Bottles',
  'Unt de nuci și semințe': 'Food, Beverages & Tobacco > Food Items > Nut Butters',
  'Cremă de orez și ovăz': 'Food, Beverages & Tobacco > Food Items > Grains, Rice & Cereal > Cereal & Granola',
};

const SELLER = 'Prime Supplements';
const RETURN_POLICY = 'https://primesupplements.ro/policies/refund-policy';
const PRIVACY = 'https://primesupplements.ro/policies/privacy-policy';

const numId = (gid) => String(gid).split('/').pop();
const jpg = (url) => (url ? url + (url.includes('?') ? '&' : '?') + 'format=jpg&width=1200' : null);
const money = (v) => `${Number(v).toFixed(2)} RON`;
const clean = (s) => String(s || '').replace(/\s+/g, ' ').trim();

function validGtin(code) {
  if (!/^(\d{8}|\d{12}|\d{13}|\d{14})$/.test(code || '')) return false;
  const d = code.split('').map(Number);
  const check = d.pop();
  const sum = d.reverse().reduce((s, n, i) => s + n * (i % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === check;
}

const rows = [];
const skipped = [];
for (const file of inputs) {
  const page = JSON.parse(fs.readFileSync(file, 'utf8')).data.products.nodes;
  for (const p of page) {
    if (!ALLOWED.has(p.productType)) { skipped.push(`${p.handle} (tip ${p.productType})`); continue; }
    if (!p.onlineStoreUrl) { skipped.push(`${p.handle} (nepublicat în magazin)`); continue; }
    const productImg = p.featuredMedia?.image?.url;
    const variants = p.variants.nodes;
    const multi = variants.length > 1;
    for (const v of variants) {
      const vid = numId(v.id);
      const img = v.media?.nodes?.[0]?.image?.url || productImg;
      if (!img) { skipped.push(`${p.handle} / ${v.title} (fără imagine)`); continue; }
      const price = Number(v.price);
      const compare = Number(v.compareAtPrice || 0);
      const opts = (v.selectedOptions || []).filter((o) => o.value !== 'Default Title');
      const row = {
        item_id: vid,
        title: clean(multi && v.title !== 'Default Title' ? `${p.title} – ${v.title}` : p.title).slice(0, 150),
        description: clean(p.description).slice(0, 5000) || clean(p.title),
        url: `${p.onlineStoreUrl}?variant=${vid}`,
        brand: clean(p.vendor) || 'Prime',
        seller_name: SELLER,
        image_url: jpg(img),
        availability: v.availableForSale ? 'in_stock' : 'out_of_stock',
        price: money(compare > price ? compare : price),
        target_countries: ['RO'],
        store_country: 'RO',
        is_eligible_search: true,
        condition: 'new',
        product_category: CATEGORY[p.productType],
        accepts_returns: true,
        return_deadline_in_days: 14,
        return_policy: RETURN_POLICY,
        seller_privacy_policy: PRIVACY,
      };
      if (compare > price) row.sale_price = money(price);
      const gtin = v.barcodes?.nodes?.[0]?.value;
      if (validGtin(gtin)) row.gtin = gtin;
      if (multi) {
        row.group_id = `P${numId(p.id)}`;
        row.listing_has_variations = true;
        const dict = {};
        for (const o of opts) dict[o.name.toLowerCase()] = o.value;
        if (Object.keys(dict).length) row.variant_dict = dict;
      }
      rows.push(row);
    }
  }
}

fs.writeFileSync(out, rows.map((r) => JSON.stringify(r)).join('\n') + '\n', 'utf8');
const inStock = rows.filter((r) => r.availability === 'in_stock').length;
console.log(`rânduri: ${rows.length} (în stoc: ${inStock}), produse sărite: ${skipped.length}`);
for (const s of skipped) console.log('  sărit:', s);
