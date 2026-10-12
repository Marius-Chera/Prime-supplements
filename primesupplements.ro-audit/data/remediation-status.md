# Remediation already applied (2026-10-12, same day as the audit)

The owner asked for every problem to be fixed, not only reported. The following changes were APPLIED to the live store through the Admin API before the synthesis; findings that these changes resolve must be reported as "Fixed on 2026-10-12 (verify)" with the verification step, not as open work. Everything else stays open and goes into the action plan.

## Live store (applied, verified by read-back)
- 195 products: `seo.title` + `seo.description` rewritten in Romanian (45-60 / 120-158 chars, " | Prime Supplements" suffix where it fits, no EU-non-compliant health claims); `vendor` set to "Prime Supplements" (108) or "MNX" (87); `productType` set (Proteine, Creatină, Aminoacizi, Pre-workout & intra-workout, Arzătoare de grăsimi, Vitamine, Minerale, Suplimente din plante, Suplimente pentru sănătate, Colagen, Omega-3, Gainer, Batoane proteice, Cremă de orez și ovăz, Băuturi instant, Fibre și digestie, Unt de nuci și semințe, Tricouri, Hanorace, Pantaloni, Pantaloni scurți, Pantaloni de trening, Maiouri, Șepci, Shakere, Accesorii sală, Pachete); Shopify Standard Product Taxonomy `category` set on all 195 (e.g. hb-1-9-6-3 Creatine, hb-1-9-6-8 Protein Supplements, fb-2-11-9 Rice, aa-1-1-2-2 T-shirts). Plans: `applied/products-plan.json`.
- 23 collections: SEO title + description rewritten; 17 category collections received a 3-paragraph body description (`descriptionHtml`) with product facts. Plan: `applied/collections-plan.json`.
- 354 of 355 articles: `global.title_tag` and `global.description_tag` metafields rewritten (reviewed copy, 45-60 / 120-158 chars, one topic each so the 47 cannibalising groups now have differentiated titles); 17 articles whose author was the store account "primesupplements1" re-attributed to "Marius Chera". Plan: `applied/articles-plan.json`.
- 493 of 493 product images: descriptive Romanian `alt` written from the actual image (packaging, flavour, view angle, worn/flat). Plan: `applied/alt-text-plan.json`.

- 11 of 11 pages (contact, despre-noi, politici, B2B, thank-you, creatina-custom): `global.title_tag` + `description_tag` metafields written (were all empty).

## Staging theme (uploaded to the unpublished duplicate "Impact – SEO fixes 2026-10-12", id 193875083639; the OWNER must preview and publish)
- `layout/theme.liquid`: charset + viewport first (no `maximum-scale`), title template with brand suffix and homepage override, homepage meta description, `noindex,follow` for utility collections (all, cele-mai-vandute, lansate-recent, 11-tva, frontpage, reduceri, vendors, types), page thank-you, search, cart, password, customer templates.
- `snippets/schema-product-enhanced.liquid`: valid Product JSON-LD (json filter), per-variant Offer with numeric price, priceValidUntil, availability, sku/gtin, hasMerchantReturnPolicy (14 days, RO), shippingDetails (20 RON / free ≥ 300 RON), aggregateRating from Judge.me metafields, brand from vendor.
- `snippets/schema-article.liquid`: valid Article JSON-LD with Person author (Marius Chera, jobTitle), publisher, image, wordCount.
- `snippets/schema-collection.liquid`: CollectionPage + ItemList + BreadcrumbList.
- `snippets/schema-organization.liquid`: Organization/OnlineStore with legalName, taxID, telephone, address (Cisnădie), real sameAs profiles; WebSite + SearchAction on the homepage.
- `snippets/schema-breadcrumb-enhanced.liquid`: breadcrumb skips utility collections.
- `snippets/social-meta-tags.liquid`: og:image https.
- `sections/main-article.liquid`: render-time neutralisation of BlogGenAuto artefacts (myshopify links → relative, embedded JSON-LD/scripts inert, "Powered by" link nofollow/sponsored).
Files: `theme-fixes/`.

## Prepared but NOT applied (needs the owner)
- Cleaned article bodies for all 355 articles (`blog-cleanup/cleaned-bodies.tar.gz`, `blog-cleanup/cleanup-report.json`, script `blog-cleanup/clean.py`): removes 1,379 embedded JSON-LD blocks, 347 scripts, 194 "Powered by BlogGenAuto" links, 534 hard-coded prices, 533 urgency lines, rewrites 2,582 myshopify links, demotes 26 extra H1s, normalises the author box. Bulk import was blocked by the integration policy in this environment; apply with Matrixify (Blog Posts sheet: ID, Body HTML) or a 20-line Admin API script.
- Hungary market web presence (`gid://shopify/MarketWebPresence/73400189303`, the `/ro-hu/` duplicate tree): `webPresenceDelete` validated, not executed (selling-settings change = owner decision).
- B2B store noindex/password: owner action on the other store.
- Theme publish: owner action after preview.
- Consolidation of the ~190 duplicate/cannibalising articles (301 map in the cluster findings): editorial decision, not executed.
