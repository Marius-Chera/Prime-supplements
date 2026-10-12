# Shopify configuration findings: primesupplements.ro (2026-10-12)

Category: Shopify configuration (feeds Technical SEO). Method: Admin GraphQL read-only queries (shop, markets, web presences, themes, products, collections, blogs, articles, files), theme files of the published Impact theme (id 179784286583), live robots.txt/sitemap captures under `scratchpad/recon/`, and the data gathered while applying the fixes (product/article/collection mutations, media alt updates).

## Scope & method
- Store: primesupplements1.myshopify.com, primary domain primesupplements.ro, currency RON, language ro. Published theme "Impact" (updated 2026-09-22); staging duplicate 193875083639 "Impact – SEO fixes 2026-10-12 (Claude, nepublicată)" holds all theme fixes.
- Markets: a second market (Hungary) with web presence `gid://shopify/MarketWebPresence/73400189303` publishes the whole catalogue under `/ro-hu/` (575 URLs in the sitemap). A B2B store on a separate domain republishes 58 product URLs.
- Catalogue: 195 products (185 active, 7 draft, 3 unlisted), 23 collections, 1 blog ("news") with 355 articles, 493 product images.
- Could not check: app list and app embeds (no `read_apps` scope), checkout settings, Shopify Search & Discovery filters, Google & YouTube channel status, Shop app listing.

## Score
**45/100** before fixes; the data-layer problems (vendor, product type, taxonomy, SEO fields, alt text, collection descriptions, article SEO fields) are now fixed on the live store; the configuration problems (Hungary market, B2B duplicate, apps, theme publish) remain for the owner.

## What works
- Primary domain with HTTPS, www → apex 301, Shopify's current robots.txt, valid sitemap index.
- Products use clean hyphenated handles; variants carry prices and SKUs; Judge.me supplies reviews.
- The theme exposes the SEO title/description fields of products, collections and articles (Shopify `global.title_tag` / `description_tag` metafields), which is what the fixes rely on.

## Findings

### SHOPIFY-01 [Critical] Hungary market web presence duplicates the entire site under /ro-hu/
- Evidence: `recon/sitemaps/all-urls.txt` lists 575 `/ro-hu/...` URLs (50% of the sitemap); `recon/pages/homepage-ro-hu.html` is the Romanian homepage with the same content, `hreflang` pairs point to identical Romanian copies; web presence id `gid://shopify/MarketWebPresence/73400189303` (market "Hungary", default locale ro).
- Affected scope: every indexable URL (products, collections, pages, blog).
- Recommendation: delete the Hungary web presence (Settings → Markets → Hungary → Domains and languages → remove the `/ro-hu` subfolder) or, if the market must stay, give it a Hungarian locale and translated content; until then it is pure duplication. The mutation `webPresenceDelete(id: "gid://shopify/MarketWebPresence/73400189303")` was validated but deliberately NOT executed: it changes selling settings, so it is the owner's call.
- Falsifiability: `/sitemap.xml` children no longer contain `/ro-hu/`; `curl -I https://primesupplements.ro/ro-hu/` returns 404 or 301.
- Leading indicator: GSC "Duplicate, Google chose different canonical" count drops.
- Effort: S · Confidence: 0.98

### SHOPIFY-02 [High] B2B storefront republishes 58 product URLs on a second domain
- Evidence: `recon/pages/b2b.html`, `recon/pages/b2b-products-sitemap.xml`: 58 product pages with the same titles/descriptions, no canonical back to primesupplements.ro, no password.
- Recommendation: enable password protection on the B2B store (Online Store → Preferences → Restrict access) or add `<meta name="robots" content="noindex">` in its theme.liquid and remove it from its sitemap; B2B buyers log in anyway.
- Falsifiability: `curl -I <b2b>/products/<handle>` returns 302 to `/password` or the HTML carries noindex.
- Effort: S · Confidence: 0.95

### SHOPIFY-03 [High] Vendor "primesupplements1", empty product types and taxonomy (FIXED)
- Evidence before: 64 products with vendor `primesupplements1` (the myshopify handle), 0/185 with a product type, 121 without a standard taxonomy category; Product JSON-LD printed the vendor as brand.
- Applied: all 195 products now carry vendor "Prime Supplements" or "MNX", a Romanian product type (Proteine, Creatină, Aminoacizi, Pre-workout & intra-workout, Arzătoare de grăsimi, Vitamine, Minerale, Suplimente din plante, Batoane proteice, Cremă de orez și ovăz, Băuturi instant, Tricouri, Hanorace, Pantaloni scurți, Maiouri, Shakere, Accesorii sală, Pachete, …) and a Shopify Standard Product Taxonomy category (e.g. `hb-1-9-6-3` Creatine, `hb-1-9-6-8` Protein Supplements, `fb-2-11-9` Rice).
- Remaining: the Google & YouTube channel should be re-synced so Merchant Center picks up brand/type/category.
- Falsifiability: `products(query:"vendor:primesupplements1")` returns 0; `products(query:"product_type:''")` returns 0.
- Effort: done · Confidence: 1.0

### SHOPIFY-04 [High] Missing SEO titles/descriptions on products, collections and articles (FIXED)
- Evidence before: 105/185 products without SEO title, 23 collections without descriptions, 20 articles without title_tag, generic/keyword-stuffed metas elsewhere.
- Applied: 195 product SEO titles + descriptions (45–60 / 120–158 chars, brand suffix, EU health-claim compliant), 23 collection SEO titles + descriptions and 17 new collection body descriptions, 354 article `global.title_tag` + `description_tag` metafields rewritten, 17 articles re-attributed from the store account to the author.
- Falsifiability: `articles(first:5, query:"...").metafield(namespace:"global", key:"title_tag")` returns the new values; product `seo.title` is non-null for all products.
- Effort: done · Confidence: 1.0

### SHOPIFY-05 [Medium] Product images had no alt text (FIXED)
- Evidence before: 493/493 product media without alt.
- Applied: 493 descriptive Romanian alt texts written from the actual images (front/back/label/worn/colour variant) via `fileUpdate`.
- Remaining: theme section images (hero, category tiles) are set in the theme editor and still need alt text (see VISUAL-04).
- Effort: done · Confidence: 1.0

### SHOPIFY-06 [Medium] Utility and automated collections are indexable and in the sitemap
- Evidence: `/collections/all`, `/collections/cele-mai-vandute`, `/collections/lansate-recent`, `/collections/11-tva`, `/collections/frontpage`, `/collections/reduceri`, `/collections/vendors?q=`, `/collections/types?q=`, `/pages/thank-you` return 200 with no robots meta.
- Applied on the staging theme: `layout/theme.liquid` emits `<meta name="robots" content="noindex,follow">` for these templates/handles. Shopify still lists them in the sitemap until they are noindexed (Shopify drops noindexed pages from the sitemap automatically once the theme is published).
- Owner action: publish the staging theme after previewing.
- Effort: S · Confidence: 0.9

### SHOPIFY-07 [Medium] Blog bodies generated by BlogGenAuto embed scripts, invalid JSON-LD and myshopify links
- Evidence: 347/355 articles contain `<script type="application/ld+json">` blocks (1,379 in total) plus 347 inline scripts, 3,117 absolute links to `primesupplements1.myshopify.com`, 194 "Powered by BlogGenAuto" followed links, 534 hard-coded prices.
- Applied: render-time neutralisation in `sections/main-article.liquid` on the staging theme (links rewritten to the primary domain, embedded scripts rendered inert, generator link nofollow/sponsored). Cleaned bodies for all 355 articles are prepared (`blog-cleanup/cleaned/*.html`, `bulk-articles-cleanup.jsonl`) but the bulk import could not be executed from this environment (bulk mutations are blocked by the integration policy); a Matrixify/CSV import or a short Admin API script by the owner applies them in one go.
- Effort: M · Confidence: 0.95

### SHOPIFY-08 [Low] Draft/unlisted products share collections with live products
- Evidence: 7 DRAFT and 3 UNLISTED products sit in automated collections ("cele-mai-vandute", "lansate-recent"); the unlisted ones are reachable by URL and indexable.
- Recommendation: decide per product: publish (bundles Nitrox3D+Creapure, Fiber+Creapure are good SEO targets) or archive; keep the unlisted ones out of the sitemap by setting them to draft when not sold.
- Effort: S · Confidence: 0.85

## Limitations
- App inventory, checkout, Search & Discovery and sales channel settings are outside the granted API scopes; the Pandectes banner and Judge.me were inferred from the rendered HTML.
