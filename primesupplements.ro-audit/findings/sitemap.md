# Sitemap audit: primesupplements.ro (findings key: sitemap)

Audit date 2026-10-12. Evidence root $R = /tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/recon. Work files: $S = /tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/sitemap-work (analysis script analyze_sitemaps.py, live/ responses).

## Scope & method
Method: claude-seo "seo-sitemap" agent/skill (validity, limits, lastmod accuracy, deprecated tags, robots declaration, coverage vs catalogue, noindex/redirect/404 URLs, image-extension rules, quality gates). `sitemap_discovery.py` cannot run in this sandbox (proxy policy), so discovery was done from the local index copy plus live curl.

Checked:
- Sitemap index $R/sitemap.xml (13 children) and every child $R/sitemaps/child0..12.xml (mapping: 0 agentic_discovery, 1 products, 2 pages, 3 collections, 4 blogs, 5 articles, 6 metaobject_pages, 7-12 the same six under /ro-hu/), plus all-urls.txt (1151 URLs). Parsed with xml.etree ($S/analyze_sitemaps.py): XML validity, namespaces, url/lastmod/changefreq/priority counts, lastmod distribution and W3C format, image:image / image:title / image:caption counts, duplicates, scheme, encoding, query strings.
- Coverage vs Shopify Admin exports: $R/shopify/products-all.json (185 active products), articles-all.json (355 articles, 354 published), pages.json (11 pages), collection membership counts derived from products-all.json (23 collections).
- Live (11 throttled curl requests, UA from the context file, 2 s apart, no 429): GET /robots.txt, HEAD /sitemap.xml, GET sitemap_products_1.xml (second fetch, for lastmod behaviour), GET /ro-hu/sitemap.xml, HEAD /ro-hu, HEAD /ro-hu/products/baton-proteic-capsuni, HEAD /pages/thank-you, HEAD /collections/reduceri, HEAD /sitemap_metaobject_pages_1.xml, GET b2b.primesupplements.ro/robots.txt, GET b2b.primesupplements.ro/sitemap.xml. Responses saved under $S/live/.
- Shopify Admin (read-only GraphQL, markets + shopLocales) to confirm the root cause of the /ro-hu/ tree.
- Shopify docs (shopify.dev "Optimize storefront SEO", "Unlisted product status", "Customize robots.txt") for the exact admin levers that change sitemap content.
- B2B store sitemap $R/pages/b2b-products-sitemap.xml vs main catalogue handles.
- Page-level signals of sitemap URLs from $R/parsed/*.json (canonical, robots meta, hreflang) and $R/pages/article.html.

Not checked (see Limitations): Google Search Console sitemap report (no access), HTTP status of all 1151 URLs (bot protection; sampled 6), theme page templates for thank-you/b2b (not in the local theme export).

## Score
52/100. Structure, validity, size and catalogue coverage are flawless because Shopify generates the files (185/185 products, 354/354 published articles, 11/11 pages, 23/23 collections, robots.txt declares the index). The score is dragged down by what the sitemap tells Google: 575 of 1151 URLs (50.0%) are the /ro-hu/ market duplicates of the other half, 370 product entries carry a lastmod equal to the moment of the request (so Google must discard lastmod), 10-12 URLs are utility/empty/thank-you pages that should not be submitted, the B2B store submits 52 duplicate product handles on a second host, and 708 entries are unfiltered machine-generated articles.

## What works
- All 13 files parse as valid XML (sitemaps.org 0.9 + Google image 1.1 namespaces), split by content type behind one index, 1151 URLs / 660,023 bytes in total (largest child 234,346 bytes): 2.3% of the 50,000-URL limit, 0.5% of the 50 MB limit.
- robots.txt (live, 3,644 bytes) line 116: `Sitemap: https://primesupplements.ro/sitemap.xml`; the index answers `content-type: application/xml; charset=utf-8`, HTTP/2 200 (ETag `page_cache:91751383415:SitemapIndexController:...`), cf-cache-status DYNAMIC (always fresh).
- Coverage is complete: every active product handle in products-all.json is in sitemap_products_1.xml and vice versa (0 missing, 0 extra); 354 published articles in / 354 out; the single unpublished article (creatine-monohydrate-creatina-creapure-debunking-common-supplement) is correctly absent; 11/11 pages; 23/23 collections. The 33-page-deep blog pagination therefore does not limit discovery.
- All 1151 `<loc>` values are https, on the primary host, unique (0 duplicates), with no query strings, no sort/filter/pagination URLs, no uppercase letters outside percent-encoding, no trailing-slash variants.
- Article lastmod is genuine: 354 distinct values that track Admin updatedAt (e.g. 22 articles stamped 2026-09-14, the bulk-edit day in articles-all.json); page lastmod is genuine (contact 2025-04-30, creatina-custom 2026-09-14).
- The 6 live-checked sitemap URLs all return 200 (no redirect chains, no 404s): /, /ro-hu, /ro-hu/products/baton-proteic-capsuni, /pages/thank-you, /collections/reduceri, /sitemap_metaobject_pages_1.xml.
- /ro-hu/sitemap.xml returns 404, so there is a single entry point (the root index); no stray sitemap files.
- No `<priority>` tags; image entries respect the 1,000-images-per-URL cap (max 1 per URL).

## Findings

### SITEMAP-01 — The /ro-hu/ market subfolder duplicates every URL in the sitemap (575 of 1151)
- Severity: High
- Evidence: Index lists 6 `/ro-hu/` children (sitemap_products_1, pages_1, collections_1, blogs_1, articles_1, metaobject_pages_1). child7..12.xml contain 185 products + `https://primesupplements.ro/ro-hu` (homepage, no trailing slash) + 11 pages + 23 collections + 1 blog + 354 articles = 575 URLs. Set comparison in $S/analyze_sitemaps.py: `ro-hu set == main set minus agents.md` (only agents.md has no /ro-hu/ twin). Live: HEAD /ro-hu → 200, HEAD /ro-hu/products/baton-proteic-capsuni → 200 (no redirect). Both trees are self-canonical and both emit the same hreflang triplet (parsed/home.json and parsed/pages_homepage-ro-hu.json: x-default → /, ro → /, ro-HU → /ro-hu; article.html: ro-HU → /ro-hu/blogs/news/...). Root cause confirmed in Admin (GraphQL, read-only): Market "Ungaria" gid://shopify/Market/97830830455 status ACTIVE with web presence gid://shopify/MarketWebPresence/73400189303, subfolderSuffix "hu", defaultLocale "ro", alternateLocales []; shopLocales: hu published=false, ro primary. The market serves the same Romanian content and RON prices (context fact), so the /ro-hu/ tree is a byte-for-byte duplicate that hreflang labels as "Romanian for Hungary".
- Affected scope: 575 URLs = 50.0% of the sitemap (every product, collection, page, article and the homepage).
- Recommendation: Decide what Hungary is. (A, recommended now) Settings → Markets → Ungaria → "Domains and languages" → remove the `/ro-hu` subfolder web presence (or set the market to inactive until Hungarian content exists). Shopify regenerates sitemap.xml in real time: the 6 `/ro-hu/` children and the ro-HU hreflang tags disappear immediately; total drops to 576 URLs. Shopify has no wildcard redirects, so verify live after the change whether `/ro-hu/products/...` returns 301 or 404; a 404 on URLs that were never anything but duplicates is acceptable (Google consolidates on the root URLs already named as ro/x-default), but if GSC shows /ro-hu/ URLs with clicks, add individual URL redirects (Online Store → Navigation → URL redirects) for those. (B, only if Hungary is a real target) publish the `hu` locale (Translate & Adapt, full translations incl. SEO fields), set it as the market's default locale, enable HUF pricing, keep the tree and let hreflang become hu-HU. (C, stop-gap if the market must stay as is) in layout/theme.liquid, before `</head>`:
  ```liquid
  {%- if localization.market.handle == 'ungaria' -%}
    <meta name="robots" content="noindex, follow">
    <link rel="canonical" href="{{ canonical_url | replace: 'primesupplements.ro/ro-hu/', 'primesupplements.ro/' | replace: 'primesupplements.ro/ro-hu', 'primesupplements.ro/' }}">
  {%- else -%}
    <link rel="canonical" href="{{ canonical_url }}">
  {%- endif -%}
  ```
  (remove the theme's existing canonical line). Note that C leaves the 575 URLs in the sitemap (Shopify sitemaps cannot be edited), so GSC will report "Submitted URL marked noindex"; A is the clean fix.
- Falsifiability: After the change, `curl https://primesupplements.ro/sitemap.xml | grep -c ro-hu` returns 0 and the children sum to 576 URLs; if /ro-hu/ children remain, the market web presence was not removed.
- Leading indicator: number of `<loc>` containing `/ro-hu/` across all children (575 → 0); GSC Pages report "Duplicate, Google chose different canonical than user" and "Alternate page with proper canonical tag" counts for /ro-hu/ URLs.
- Effort: S (A) / L (B)
- Confidence: 0.95

### SITEMAP-02 — Product lastmod is the sitemap generation time, identical for all 185 products and different on every fetch
- Severity: Medium
- Evidence: child1.xml: 185/185 product entries carry `<lastmod>2026-10-12T17:33:42+03:00</lastmod>` (1 distinct value; the file was saved at 14:33 UTC = 17:33 +03:00). child7.xml (/ro-hu/ products, fetched 5 s later): 185/185 = `2026-10-12T17:33:47+03:00`. Live re-fetch of sitemap_products_1.xml at 18:43 local ($S/live/products_live.body): 185/185 = `2026-10-12T18:43:36+03:00`. Admin updatedAt disagrees for all 185 products (products-all.json: e.g. citrus-bergamot updatedAt 2026-10-07T07:35:48Z, vitamina-d3-k2 2026-09-16T01:01:57Z; only 41 products were updated at all on 2026-10-12). Same pattern on the separate B2B store (57/57 = 2026-10-12T17:48:30+03:00), so it is platform behaviour, not a store setting. The homepage entry inside the products sitemap has no lastmod at all.
- Affected scope: 370 product entries (185 + 185 /ro-hu/); indirectly the whole sitemap's lastmod credibility.
- Recommendation: Nothing in Admin or theme changes this (the sitemap is generated by Shopify and not editable). Treat product lastmod as absent: after real product changes (new descriptions, SEO titles, images, the schema fixes), request indexing through Search Console URL Inspection for the changed URLs, and keep genuine freshness signals on-page (updated Product JSON-LD, visible content). If a supplementary product sitemap with true dates is wanted, it has to come from an app that generates and hosts its own XML (Shopify Files on cdn.shopify.com is a different host and would only be accepted if declared via `Sitemap:` in templates/robots.txt.liquid). Do not spend budget beyond that; the main sitemap keeps working for discovery.
- Falsifiability: Fetch sitemap_products_1.xml twice 60 s apart; if the lastmod values are identical across fetches and differ between products, the finding no longer holds.
- Leading indicator: GSC Crawl stats → "By purpose: refresh" share for /products/ URLs after a real catalogue change (should rise when Google trusts freshness signals).
- Effort: S
- Confidence: 0.95

### SITEMAP-03 — Collection lastmod is bulk-stamped (21 of 23 within two seconds)
- Severity: Low
- Evidence: child3.xml: 23 entries, only 4 distinct lastmod values; 11 entries = `2026-10-12T14:41:08+03:00`, 10 entries = `2026-10-12T14:41:07+03:00` (frontpage, accesorii-sala, arzator-de-grasimi, ... , all, 11-tva, haine-mnx, crema-de-orez, bauturi); only alimente-sanatoase (2026-10-08T14:40:42+03:00) and reduceri (2025-06-23T11:36:44+03:00, the empty collection) differ. Cause: automated collections re-stamp updated_at whenever a member product is touched, and products are being rewritten in batches (products-all.json updatedAt clusters: 9 products at 2026-09-07T14:51, 7 at 2026-10-12T11:09, 6 at 2026-10-12T09:50, 6 at 2026-10-09T11:10 — a sync job, not manual edits).
- Affected scope: 42 collection entries (21 × 2 trees); 23 collections' freshness signal.
- Recommendation: Identify the app that rewrites products daily (Settings → Apps and sales channels → each app → "App permissions" with write_products; candidates seen on the site: Koala upsell/gift, Judge.me, affiliate app, BlogGenAuto, inventory/ERP sync) and limit it to the fields it needs; collection lastmod then becomes meaningful again. No sitemap-side action exists.
- Falsifiability: After taming the sync, child3.xml shows ≥10 distinct lastmod values spread over weeks.
- Leading indicator: distinct lastmod values in sitemap_collections_1.xml (4 → ≥10).
- Effort: S
- Confidence: 0.8

### SITEMAP-04 — Utility and triple-duplicate collections are submitted as indexable landing pages (all, cele-mai-vandute, lansate-recent, 11-tva, frontpage)
- Severity: Medium
- Evidence: sitemap_collections_1.xml lists /collections/all, /collections/cele-mai-vandute and /collections/lansate-recent; products-all.json shows all three contain exactly the same 185 products (the complete catalogue), i.e. three URLs (six with /ro-hu/) for one list, each with its own ?page=N series. /collections/11-tva (15 products: scortisoara-ceylon-bio-200g, emperor-mass_3000g, pure-isolate-2000g, unt-de-arahide, unt-de-migdale, unt-de-caju, instant-oat-cream-800g-25-serv, fiber-blood-orange and the 7 crema-de-orez SKUs) is an internal VAT grouping, title "11% TVA", no SEO title/description (context). /collections/frontpage is the theme's "Home page" collection with 1 product (baton-proteic-capsuni). All five are 200, self-canonical, no robots meta (parsed/pages_collection-all.json, pages_collection-11tva.json), have no description and no image (7 collections lack an image entry in the sitemap: frontpage, cele-mai-vandute, lansate-recent, reduceri, all, 11-tva, crema-de-orez).
- Affected scope: 5 collections = 10 sitemap URLs (plus their paginated variants); 23 collections total.
- Recommendation: Use Shopify's documented sitemap/noindex lever, the `seo.hidden` metafield (namespace `seo`, key `hidden`, type number_integer, value 1): Shopify then adds `<meta name="robots" content="noindex,nofollow">` AND removes the resource from the sitemap (shopify.dev/docs/apps/build/marketing/optimize-storefront-seo; caveat: hidden resources also leave storefront search, which is fine here). Create the definition once (Settings → Custom data → Collections → Add definition, namespace+key `seo.hidden`, Integer) and set 1 on 11-tva and frontpage (both keep working for tax overrides and the homepage section because the collection stays published). For the three full-catalogue lists keep ONE as the browse-all page (recommend /collections/all with SEO title "Toate produsele | Prime Supplements" and a 150-250-word description) and either hide the other two with seo.hidden=1 or make them real: "Cele mai vândute" as a manual/tag-based list of the 12-24 true best-sellers, "Lansate recent" by tag `nou` with the last 90 days of launches. Equivalent Admin GraphQL (to be run by the store owner, not by this audit): `metafieldsSet(metafields:[{ownerId:"gid://shopify/Collection/<id>", namespace:"seo", key:"hidden", type:"number_integer", value:"1"}])`.
- Falsifiability: After the change sitemap_collections_1.xml lists 18-20 URLs and GET /collections/11-tva contains `noindex,nofollow`; if the URL is still in the sitemap, the metafield was created in the wrong namespace/type.
- Leading indicator: GSC "Duplicate, Google chose different canonical" for /collections/cele-mai-vandute and /collections/lansate-recent; number of collection URLs in the sitemap (23 → 18-20).
- Effort: S
- Confidence: 0.85

### SITEMAP-05 — The empty "Reduceri" collection is submitted while 144 products actually carry a discount
- Severity: Medium
- Evidence: child3.xml entry `https://primesupplements.ro/collections/reduceri` (and /ro-hu/collections/reduceri), lastmod 2025-06-23T11:36:44+03:00 (untouched for 16 months), no image; products-all.json: 0 products in `reduceri`; live HEAD → 200; page title "Reduceri", no SEO title/description, indexable ($R/pages/collection-reduceri.html). Meanwhile 144/185 products have compare_at_any = true, i.e. the store has a genuine sale inventory that this page does not show. An indexable, linked, submitted page with zero items is a soft-404 candidate and wastes the strongest commercial intent keyword in the niche ("reduceri suplimente").
- Affected scope: 2 URLs; 144 discounted products without a hub page.
- Recommendation: Admin → Products → Collections → Reduceri → change to Automated, condition "Compare-at price is greater than 0" (optionally AND "Inventory stock is greater than 0"); add SEO title "Reduceri suplimente și haine de sală | Prime Supplements", meta description, a short intro text and an image; link it from the main menu. If the business does not want a sale hub, set seo.hidden=1 instead (see SITEMAP-04) so it leaves the sitemap.
- Falsifiability: /collections/reduceri renders ≥1 product; GSC no longer lists it under Soft 404 / Crawled-currently not indexed.
- Leading indicator: product count on the collection page (0 → ~100+); impressions for the URL in GSC.
- Effort: S
- Confidence: 0.9

### SITEMAP-06 — The B2B thank-you confirmation page is submitted and indexable
- Severity: Medium
- Evidence: child2.xml entry `https://primesupplements.ro/pages/thank-you` (lastmod 2025-06-16T09:13:27+03:00) and the /ro-hu/ twin; pages.json: handle thank-you, templateSuffix "thank-you-b2b", body "" (empty CMS body, section-built); live HEAD → 200; no robots rule anywhere in the exported theme (`grep -ri noindex $R/theme/` → 0 hits). It is the post-registration redirect target of /pages/inregistrare-b2b (template "b2b", body 100 chars, also submitted).
- Affected scope: 2 URLs (4 with /ro-hu/).
- Recommendation: Online Store → Pages → thank-you → Metafields → `seo.hidden` = 1 (definition under Settings → Custom data → Pages). The page stays published (the B2B form still redirects to it) but gets noindex,nofollow and leaves sitemap_pages_1.xml. Theme-only fallback (does NOT remove it from the sitemap): in layout/theme.liquid before `</head>` `{%- if page.handle == 'thank-you' -%}<meta name="robots" content="noindex, nofollow">{%- endif -%}`. Keep inregistrare-b2b indexable but give it a real H1/intro and SEO title (B2B specialist scope).
- Falsifiability: sitemap_pages_1.xml lists 10 URLs and /pages/thank-you serves the noindex meta.
- Leading indicator: pages count in sitemap_pages_1.xml (11 → 10); GSC indexed status of /pages/thank-you.
- Effort: S
- Confidence: 0.9

### SITEMAP-07 — Image entries cover only the featured image (185 of 493 product images) and use deprecated tags
- Severity: Low
- Evidence: child1.xml: exactly one `<image:image>` per product (185 images; products-all.json totals 493 product images; 128 products have more images than the sitemap exposes, e.g. baton-proteic-capsuni image_count 2 → 1 in sitemap). Every product image entry carries `<image:title>` and an empty `<image:caption></image:caption>` (185/185 empty); article entries carry `<image:title>` (354) and `<image:caption>` (335); Google deprecated caption/title/geo_location/license in 2022 and ignores them. Collections: 16/23 with an image (the 7 without are listed in SITEMAP-04). Product images in the sitemap are on cdn.shopify.com (allowed for image extensions).
- Affected scope: 185 products (370 entries), 354 articles, 7 collections.
- Recommendation: Platform-generated, not editable. The lever is on-page: Google discovers gallery images from the product HTML, so make them discoverable and described (currently 493/493 product images have empty alt, images specialist). Upload a collection image for the 7 collections without one (Admin → Collections → Image) so the collection sitemap and OG tags get an image. Deprecated tags: no action.
- Falsifiability: Google Images impressions for /products/ pages in GSC do not grow after alt text is added (would indicate discovery, not description, is the bottleneck).
- Leading indicator: collections with `<image:image>` in sitemap_collections_1.xml (16 → 23); Google Images impressions in GSC Search type = Image.
- Effort: S
- Confidence: 0.9

### SITEMAP-08 — `<changefreq>` on all 1151 entries (ignored by Google)
- Severity: Info
- Evidence: every `<url>` has a changefreq: `daily` on 418 entries (home, 370 products, 46 collections), `weekly` on 733 (pages, blogs, articles, agents.md); `<priority>` is absent. Google ignores changefreq and priority.
- Affected scope: 1151 entries.
- Recommendation: None possible (Shopify output); harmless.
- Falsifiability: n/a
- Leading indicator: n/a
- Effort: S
- Confidence: 1.0

### SITEMAP-09 — Sitemap index carries no `<lastmod>` per child and an XML comment
- Severity: Info
- Evidence: $R/sitemap.xml: 13 `<sitemap><loc>` entries, 0 `<lastmod>`; a comment node ("This is the parent sitemap ... can not be edited manually, but is kept up to date in real time"); product/page/collection child locs use `?from=...&amp;to=...` (valid, entity-escaped). Without index-level lastmod Google re-fetches all 13 children on every visit (660 KB, trivial at this size).
- Affected scope: index file.
- Recommendation: None (Shopify output); size makes it irrelevant.
- Falsifiability: n/a
- Leading indicator: n/a
- Effort: S
- Confidence: 1.0

### SITEMAP-10 — Two empty metaobject sitemaps are referenced by the index
- Severity: Info
- Evidence: child6.xml and child12.xml (sitemap_metaobject_pages_1.xml and /ro-hu/ twin): 172 bytes each, `<urlset>` with 0 `<url>`; live HEAD → 200. No metaobject definitions with "web pages" rendering exist in the store.
- Affected scope: 2 index entries.
- Recommendation: No defect. Opportunity for the content plan: metaobject-driven pages (e.g. ingredient glossary "creatina", "beta-alanina", athlete/ambassador pages) would be added to this sitemap automatically once a metaobject definition has storefront access + "web pages" enabled and a template (templates/metaobject/<definition>.json) exists.
- Falsifiability: n/a
- Leading indicator: URL count in sitemap_metaobject_pages_1.xml.
- Effort: M (if pursued)
- Confidence: 0.9

### SITEMAP-11 — The agentic discovery sitemap submits a generic Shopify Markdown file
- Severity: Info
- Evidence: child0.xml (sitemap_agentic_discovery.xml) contains one entry, `https://primesupplements.ro/agents.md`, changefreq weekly, no lastmod, no /ro-hu/ twin. $R/agents.md is Shopify's boilerplate "Agent Instructions" (identical content to /llms.txt and /llms-full.txt, context fact), i.e. the sitemap asks Google to index a text document with no site-specific information. robots.txt line 2 also advertises it.
- Affected scope: 1 URL.
- Recommendation: Platform-controlled (Shopify agent layer); no Admin switch to remove it was found and it does no harm. The useful work is in the agentic specialist's scope (real llms.txt content), not in the sitemap.
- Falsifiability: n/a
- Leading indicator: whether agents.md appears in `site:primesupplements.ro` results.
- Effort: S
- Confidence: 0.8

### SITEMAP-12 — Three diacritic handles are percent-encoded with a different hex case than their canonical tags
- Severity: Low
- Evidence: sitemap URLs (uppercase hex): `/pages/termeni-%C8%99i-condi%C8%9Bii`, `/blogs/news/bcaa-vs-eaa-diferen%C8%9Be-%C8%99i-beneficii-pentru-culturisti-ghid-complet`, `/blogs/news/water-out-tinctura-solu%C8%9Bia-naturala-pentru-eliminarea-reten%C8%9Biei-de-apa` (×2 with /ro-hu/). On the article page ($R/pages/article.html) `<link rel="canonical">` and og:url use lowercase hex (`diferen%c8%9be-%c8%99i`) while the hreflang tags on the same page use uppercase (`diferen%C8%9Be-%C8%99i`) — three byte-different spellings of one URL across sitemap, canonical and hreflang. articles-all.json flags exactly these 2 article handles (handle_has_percent_or_diacritics) and pages.json the page handle `termeni-și-condiții`. RFC 3986 treats hex case as equivalent and Google normalises it, but mixed forms still fragment reporting and are a known trigger for "Duplicate, Google chose different canonical".
- Affected scope: 3 URLs (6 entries).
- Recommendation: Rename the handles to ASCII with "Create a URL redirect" ticked (Shopify adds the 301): `termeni-si-conditii`, `bcaa-vs-eaa-diferente-si-beneficii-pentru-culturisti-ghid-complet`, `water-out-tinctura-solutia-naturala-pentru-eliminarea-retentiei-de-apa`; update the footer/legal menu link to the new page handle; configure BlogGenAuto to transliterate diacritics in generated handles.
- Falsifiability: `grep -c '%' $R/sitemaps/*.xml` equivalents on the live files return 0 and the old URLs 301.
- Leading indicator: count of `%`-encoded `<loc>` entries (6 → 0).
- Effort: S
- Confidence: 0.75

### SITEMAP-13 — 30 products with zero available inventory remain submitted and indexable
- Severity: Low
- Evidence: products-all.json available_any = false for 30 of the 185 sitemap products: 22 MNX apparel (mnx-extra-t-shirt-industrial-black/-bronze/-navy-blue, mnx-extra-t-shirt-hc-2-0-limited-white/-black/-burgundy/-dark-grey, mnx-extra-t-shirt-basic-grey/-vivid-red/-light-pink, mnx-workout-top-golden-era-deep-purple, mnx-workout-top-hammer-3-0-white/-black/-grey, mnx-ribbed-shorts-hammer-black/-white/-grey/-green-lint, mnx-shorts-golden-era-2-0-black, mnx-extra-t-shirt-embossed-mosaic-blue, mnx-shaker-600-ml, tricou-sala-made-of-iron-bumbac-premium-negru) and 8 supplements/accessories (vitamina-d3-k2, zinc-citrate-80-caps, sapca-prime, baton-proteic-ciocolata-fructe-de-padure, water-out-500-ml, shaker-premium-accesorizat-500-ml, instant-oat-cream-800g-25-serv, enzima-nattokinaza-80-caps). instant-oat-cream-800g-25-serv is one of the 5 most-linked products from the blog (23 articles) and is sold out everywhere.
- Affected scope: 30 products (60 entries) = 16% of the product sitemap.
- Recommendation: Products that will be restocked within weeks: keep them (sitemap + page with back-in-stock capture). Discontinued MNX colourways: set status Draft or Archived (Shopify drops them from the sitemap and the URL 404s) and add a URL redirect to the surviving colour or the style's collection; or use the Unlisted product status (noindex + removed from sitemap, still purchasable by link) where available in the Admin. Restock or mark pre-order the 8 supplement SKUs, starting with instant-oat-cream-800g-25-serv.
- Falsifiability: After clean-up, count of sitemap products with available_any = false < 10.
- Leading indicator: number of sold-out products in the sitemap (30 → <10); GSC Merchant/Shopping "out of stock" warnings.
- Effort: S-M
- Confidence: 0.8

### SITEMAP-14 — The B2B store publishes a crawlable sitemap with 52 of the retail store's product handles
- Severity: High
- Evidence: Live GET https://b2b.primesupplements.ro/sitemap.xml → 200 (1,018 bytes, 6 children: agentic_discovery, products_1, pages_1, collections_1, blogs_1, metaobject_pages_1). $R/pages/b2b-products-sitemap.xml: 57 product URLs + homepage; 52 handles are identical to retail handles (e.g. /products/baton-proteic-capsuni, /products/creatina-creapure) with the same image filenames (01_BATONPROTEIC_strawberry_front.jpg); lastmod 2026-10-12T17:48:30+03:00 on 57/57. b2b robots.txt (live, 3,660 bytes) is Shopify's default: `User-agent: * / Allow: /`, Sitemap declared, no `Disallow: /`; b2b pages have no noindex and no cross-domain canonical (context). 5 handles exist only in B2B: baton-proteic-alune-si-caramel, baton-proteic-ciocolata-caramel, baton-proteic-ciocolata-portocale, baton-proteic-lamaie-fructe-de-padure, liver-protect-500-ml (retail products missing from the main catalogue/sitemap if they are sold retail).
- Affected scope: 52 retail product URLs duplicated on a second host; 5 products missing from retail.
- Recommendation: Wholesale buyers log in, so the store should not be a public, submitted site: (1) Online Store → Preferences → "Restrict access to visitors with the password" on the B2B store (every URL then renders the password page, which Shopify serves with noindex), or at minimum (2) add templates/robots.txt.liquid on the B2B theme with `User-agent: *\nDisallow: /` (omit the Sitemap line) and `<meta name="robots" content="noindex, nofollow">` in its layout/theme.liquid; (3) if it must stay public, emit a cross-domain canonical on the 52 shared handles: `<link rel="canonical" href="https://primesupplements.ro/products/{{ product.handle }}">` in the B2B theme's product template. Also decide whether the 5 B2B-only flavours should be published to the retail store (they would join sitemap_products_1.xml automatically).
- Falsifiability: `site:b2b.primesupplements.ro` returns 0 results after 4-8 weeks; retail product URLs no longer show the B2B URL as Google-selected canonical in GSC URL Inspection.
- Leading indicator: indexed pages for b2b.primesupplements.ro (site: query); GSC "Duplicate, Google chose different canonical" for /products/ with a b2b.* canonical.
- Effort: S-M
- Confidence: 0.85

### SITEMAP-15 — Quality gate: 708 of 1151 entries are unfiltered machine-generated articles
- Severity: Medium
- Evidence: sitemap_articles_1.xml = 354 URLs (×2 = 708, 61.5% of all entries), every one with changefreq weekly. articles-all.json: 347/355 bodies contain the BlogGenAI marker, 42 handles end in -2/-3/-4/-5 (regenerated topics), 47 title-keyword cannibalisation groups covering 164 articles, 279 titles contain 2025/2026, publishing bursts up to 10 articles on 2026-05-15 (127 in 2026-05). The seo-sitemap skill's "Penalty risk" table classifies "AI-generated pages without human review" as unsafe at scale; the sitemap presents all 354 as equally crawl-worthy. Location-page gates: 0 location pages, no doorway risk.
- Affected scope: 354 articles (708 entries).
- Recommendation: The sitemap should reflect the blog clean-up decided by the content/cannibalisation specialists: for each of the 47 groups keep the winner and hide or merge the losers (Admin → Blog posts → Visibility: Hidden, plus URL redirect to the winner); hide the 42 regenerated `-2/-3/-4/-5` variants unless they are the better article. Shopify removes hidden articles from sitemap_articles automatically (verified: the one unpublished article is absent today). Resubmit sitemap.xml in GSC afterwards and watch the "Crawled - currently not indexed" bucket for /blogs/news/.
- Falsifiability: article count in sitemap_articles_1.xml stays at 354 after the clean-up → the hidden flag was not applied.
- Leading indicator: URL count in sitemap_articles_1.xml (354 → ~250-290); GSC "Crawled - currently not indexed" for /blogs/news/.
- Effort: M
- Confidence: 0.7

## Limitations
- No Search Console access: submitted/indexed counts, sitemap processing errors, "Discovered/Crawled - currently not indexed" buckets and Google-selected canonicals could not be read.
- HTTP status was verified live for 6 sitemap URLs only (bot protection; 11 total requests). The crawl of the other 1,145 URLs was not possible; the Admin exports were used as the ground truth for existence/publication instead.
- `sitemap_discovery.py` and the other fetching plugin scripts cannot run in this sandbox (proxy policy, not a site issue); discovery used the local index copy plus curl.
- The theme export under $R/theme does not include the page templates (page.thank-you-b2b.json, page.b2b.json), so no template-level robots rules could be inspected (the exported layout/theme.liquid and sections contain no robots meta).
- Shopify's exact behaviour for /ro-hu/ URLs after removing the market web presence (301 vs 404) must be verified live after the change.
- $R/sitemaps/all-urls.txt lacks a trailing newline (wc reports 1150 lines for 1151 URLs); cosmetic, counts above come from the XML.

## Appendix: how Shopify decides what goes into this sitemap (what actually changes the content)
- sitemap.xml and all children are generated by Shopify in real time; they cannot be edited, no app can edit them, the theme cannot alter them. The only theme-side hook is templates/robots.txt.liquid, which can add extra `Sitemap:` lines (e.g. for an app-generated supplementary sitemap).
- Products appear when status = Active AND the product is published to the Online Store sales channel AND available in the market being rendered. Removing a product: set status Draft/Archived (URL 404s), or untick Online Store under Sales channels (URL 404s), or set metafield `seo.hidden` = 1 (page stays live, gets noindex,nofollow, leaves sitemap and storefront search), or use the Unlisted product status (noindex, not in sitemap, still purchasable by link). A `noindex` added in theme code does NOT remove the URL from the sitemap.
- Collections appear when published to the Online Store channel; remove via Sales channels (404), `seo.hidden` = 1 (stays live, noindex, out of sitemap) or deletion. Automated collections re-stamp lastmod whenever a member product changes.
- Pages, blogs and articles appear when visible; Visibility → Hidden removes them (404), `seo.hidden` = 1 keeps them live and removes them from the sitemap. Renaming a handle with "Create a URL redirect" swaps the sitemap URL instantly and adds a 301.
- Markets: every market web presence with a subfolder (here /ro-hu) adds a complete duplicate set of child sitemaps to the root index; removing the subfolder/web presence or deactivating the market removes the set; publishing an alternate locale on a market adds yet another set (e.g. /ro-hu/hu/...). Changing a market's default locale changes page content but not the URL set.
- Images: product entries carry only the featured image, articles their featured image, collections their collection image (set in Admin → Collections → Image). Deprecated title/caption tags are emitted by Shopify and ignored by Google.
- lastmod: pages and articles reflect updated_at; collections reflect updated_at (bulk-stamped by automated rules); products are stamped with the generation time on every request (platform behaviour, cannot be influenced).
- The agentic discovery sitemap and agents.md are part of Shopify's agent layer and have no Admin switch.
