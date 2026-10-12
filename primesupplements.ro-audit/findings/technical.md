# Technical SEO findings: primesupplements.ro (final, 2026-10-12)

Category: Technical SEO (22% of health score). Specialist method: claude-seo `seo-technical` (nine areas: crawlability, indexability, security, URL structure, mobile, Core Web Vitals, structured data presence, JavaScript rendering, IndexNow).

## Scope & method

What was checked and with what:
- Crawlability: `$R/../tech/live/robots.txt` (116 lines, HTTP 200 `text/plain`) read line by line and run through `agentic_fix.py robots --file ... --json`; sitemap index `$R/sitemap.xml` + 13 children `$R/sitemaps/child0..12.xml`, `$R/sitemaps/all-urls.txt` (1,151 URLs) classified and de-duplicated with a Python pass; crawl depth derived from `snippets/pagination.liquid`, `sections/main-blog.liquid`, `sections/main-collection.liquid`, `templates/collection.json` and the live `pagination__current` text.
- Indexability: `$R/parsed/*.json` (24 pages: title, canonical, meta robots, hreflang, H1); live `layout/theme.liquid` pulled read-only through the Admin GraphQL API (`themes(roles:[MAIN]).files(filenames:["layout/theme.liquid"])`, theme 179784286583 "Impact", updated 2026-09-22) because `$R/theme/layout__theme.liquid` was not present in the evidence set; 14 throttled live `curl` requests (UA from the context file, 2 s apart, two 429s handled with a 30 s back-off) saved under `scratchpad/live-tech/`, plus the earlier capture set `scratchpad/tech/live/` (vendors, types, tag, empty search, thank-you, 404, http/www chain).
- Security/redirects: response headers from the live requests above.
- URL structure: sitemap URL lengths, percent-encoding, handle patterns; canonical vs sitemap vs og:url encoding on `$R/pages/article.html`.
- Mobile: viewport meta on all 13 local main-store pages and in `layout/theme.liquid`.
- CWV (static only): HTML/head/inline-script weight, script and stylesheet counts, font loading, resource hints across `$R/home.html`, `$R/pages/*.html`, `$R/pages/products/*.html`; `$R/perf/*.txt` asset sizes.
- JS rendering: visible-word counts of raw `<body>` text after stripping scripts/styles for product, article and collection HTML; product-card counts.
- Structured data: block counts only (details owned by the schema specialist).
- IndexNow: platform knowledge + absence of any key file reference.

Could not check: field or lab Core Web Vitals (no PSI/CrUX quota, no Chromium), Google's rendered DOM, `/collections/vendors?q=` live this session (429 twice; used the earlier capture), B2B store robots.txt (not in local evidence; context fact used), Pandectes banner intrusiveness.

## Score

**52/100** (Technical SEO).
Rationale: the platform fundamentals pass (HTTPS, 301s, SSR, self-canonicals, real 404s, 2026 Shopify robots.txt, valid sitemaps), but the index is structurally doubled twice over (575 `/ro-hu/` duplicates + 58 B2B cross-domain duplicates), six utility/empty collections and a thank-you page are indexable and in the sitemap, the blog's 354 articles sit behind a 59-page prev/next-only archive, and every page ships a mis-ordered 157–189 KB `<head>` with a zoom-locked viewport.

Category breakdown (score only what was measured):

| Category | Status | Score | Checks behind it |
|---|---|---|---|
| Crawlability | warn | 55 | robots.txt valid and current (pass); sitemap valid but 50% duplicate (fail); blog depth 59 clicks (fail); vendors/types/tag traps not blocked (warn); lastmod churn (warn) |
| Indexability | fail | 35 | self-canonicals (pass); `/ro-hu/` duplicates (fail); B2B duplicates (fail); utility/empty collections, thank-you, empty search indexable (fail); no robots-meta logic in theme (fail) |
| Security | pass | 80 | HTTPS + HSTS + XFO + nosniff + frame-ancestors (pass); no Referrer-Policy/Permissions-Policy, HSTS no preload (warn, platform-managed); og:image http (warn) |
| URL structure | warn | 65 | clean hyphenated handles (pass); 3 percent-encoded, case mismatch (warn); 57 URLs > 100 chars (warn); 2-hop www chain, trailing-slash 200 (warn) |
| Mobile | warn | 70 | responsive theme, viewport present (pass); `maximum-scale=1.0` (fail); content parity (pass) |
| Core Web Vitals | not measured | n/a | static risk signals only: 617 KB HTML, 145 KB inline JS, 20 external scripts, 2 render-blocking Google Fonts CSS, sync script before charset |
| Structured data | warn | 40 | present on every template (pass); invalid JSON and duplicated blocks (fail, see schema specialist) |
| JS rendering | pass | 95 | all primary content in raw HTML; Judge.me reviews JS-only (warn) |
| IndexNow | not implemented | n/a | Shopify has no native IndexNow; info only |

## What works

- HTTPS enforced: `http://www.primesupplements.ro/` -> 301 -> `https://www...` -> 301 -> `https://primesupplements.ro/`; `https://primesupplements1.myshopify.com/products/creatina-creapure` -> 301 to the primary domain (`scratchpad/live-tech/myshop.hdr`).
- Headers on every 200: `strict-transport-security: max-age=7889238`, `x-frame-options: DENY`, `x-content-type-options: nosniff`, `content-security-policy: block-all-mixed-content; frame-ancestors 'none'; upgrade-insecure-requests;`, HTTP/2 via Cloudflare.
- Self-referencing canonical on all 24 parsed pages (`$R/parsed/*.json`, `canonical` field); `?sort_by=price-ascending` and `?filter.v.price.gte=50` canonicalise to the bare collection URL; `?page=2` is self-canonical with `rel="prev"/"next"` and title suffix "– Pagina 2".
- `/search?q=creatina` is served with `x-robots-tag: noindex, nofollow` (`scratchpad/live-tech/search.hdr`).
- robots.txt is Shopify's current (2026) default: disallows `/collections/*sort_by*`, `/collections/*filter*&*filter*`, `+`/`%2B` tag combinations, `/cart/`, `/checkout`, `/account`, `/*?*preview_theme_id=*`; declares `Sitemap: https://primesupplements.ro/sitemap.xml`. (This corrects the context file, which said sort_by was not blocked.)
- Unknown URLs return a real HTTP 404 (`/this-page-does-not-exist-xyz` -> 404, title "404 negăsit", `cache-control: private, no-store`).
- Sitemap index is well-formed; the 185 product entries carry `<lastmod>` and one `<image:image>` each; the 354 article entries have lastmod spread over 90 distinct dates.
- Server-side rendering: raw HTML of `/products/baton-proteic-capsuni` contains 1,039 visible words (description, "Ingrediente", add-to-cart), the citicolina article 2,367 words, `/collections/all` 24 `<product-card>` elements. No SPA shell, no `pushState`/`replaceState` in raw HTML (no back-button hijack signal).
- `<html lang="ro">`; hreflang triplet (`x-default`, `ro`, `ro-HU`) is consistent with return links on every sampled page.
- Googlebot and other bots are excluded from Shopify's web-pixel loader (`/Googlebot|Storebot-Google|bingbot|.../` regex in the inline `wpmLoader`), which reduces crawl-time JavaScript.
- Theme assets are light (theme.css 27 KB br, theme.js 35 KB, vendor.min.js 21 KB), loaded as ES modules; theme fonts (Barlow n4/n7 woff2) and theme.css are preloaded.
- Largest HTML (homepage, 617 KB) is well under Googlebot's 2 MB fetch cap; `<title>` and `<link rel="canonical">` sit within the first 1.5 KB.

## Findings

### TECH-01 — The /ro-hu/ "Ungaria" market publishes a full second copy of the site (575 duplicate URLs, self-canonical, identical Romanian content and RON prices)
- Severity: High
- Evidence: `$R/sitemaps/all-urls.txt` = 1,151 URLs: 576 primary + 575 under `/ro-hu/` (exact mirror: 185 products, 23 collections, 354 articles, 11 pages, blog index, home). Sitemap index lists the six content sitemaps twice (`/sitemap_products_1.xml...` and `/ro-hu/sitemap_products_1.xml...`). Live `GET /ro-hu/products/creatina-creapure` -> 200, `<link rel="canonical" href="https://primesupplements.ro/ro-hu/products/creatina-creapure">`, `og:url` also `/ro-hu/...`, `<html lang="ro">`, 41 "RON" price mentions, 72 internal links all prefixed `/ro-hu/` (`scratchpad/live-tech/rohu_product.body`). `$R/pages/homepage-ro-hu.html` is byte-for-byte the same page as `$R/home.html` (2,950 words, same title, same H1) apart from 175 `/ro-hu/` links and canonical `https://primesupplements.ro/ro-hu` (no trailing slash, while the sitemap lists `/ro-hu` and the page is served at `/ro-hu/`). `$R/work/hu-reduceri.html` shows even the empty "Reduceri" collection is duplicated. hreflang on every page: `x-default` -> primary, `ro` -> primary, `ro-HU` -> `/ro-hu/...`. Admin facts (context): Hungarian locale unpublished, market currency null, default locale `ro`.
- Affected scope: every indexable URL (575 of 1,151 sitemap URLs) plus all paginated/parameter variants (`?page=2` on `/ro-hu/collections/all` is also linked via hreflang on `scratchpad/live-tech/page2.body`).
- Recommendation (Shopify-aware):
  1. Preferred: Admin -> Settings -> Markets -> "Ungaria" -> Domains and languages -> remove the `/ro-hu` subfolder web presence (serve Hungary from the primary domain) or deactivate the market until a translated `hu` locale is published. This removes the `/ro-hu/` sitemaps, the `ro-HU` hreflang tags and the duplicate URLs at the source. After the change verify `/ro-hu/products/creatina-creapure` returns 301 or 404 (Shopify URL redirects do not support wildcards, so rely on the 404 + canonical history; Google drops them within a few weeks).
  2. If the market must stay live: in `layout/theme.liquid` replace `<link rel="canonical" href="{{ canonical_url }}">` with
     ```liquid
     {%- liquid
       assign canonical_href = canonical_url
       if localization.country.iso_code == 'HU'
         assign canonical_href = canonical_url | replace_first: 'primesupplements.ro/ro-hu', 'primesupplements.ro'
         if canonical_href == 'https://primesupplements.ro'
           assign canonical_href = 'https://primesupplements.ro/'
         endif
       endif
     -%}
     <link rel="canonical" href="{{ canonical_href }}">
     {%- if localization.country.iso_code == 'HU' -%}<meta name="robots" content="noindex, follow">{%- endif -%}
     ```
     and remove the `ro-HU` hreflang by leaving the market without a web presence (hreflang is emitted by `content_for_header`; it cannot be edited in Liquid).
- Falsifiability: after the fix `curl -s https://primesupplements.ro/sitemap.xml | grep -c ro-hu` must return 0 and `/ro-hu/...` must not return a self-canonical 200. If GSC still reports `/ro-hu/` URLs as "Indexed" four weeks later, the fix failed.
- Leading indicator: Search Console Pages report: "Duplicate, Google chose different canonical than user" and "Alternate page with proper canonical tag" counts; Crawl stats "total crawl requests" dropping by ~40–50%.
- Effort: S (admin setting) / M (Liquid fallback)
- Confidence: 0.95

### TECH-02 — The B2B store b2b.primesupplements.ro is an indexable cross-domain duplicate of the product catalogue (58 same-handle product URLs)
- Severity: High
- Evidence: `$R/pages/b2b-products-sitemap.xml` lists 58 `<loc>` entries using the same handles as the main store (`https://b2b.primesupplements.ro/products/baton-proteic-capsuni`, `/products/creatina-creapure`, ...). `$R/pages/b2b-product.html`: canonical `https://b2b.primesupplements.ro/products/creatina-creapure` (self, not the main store), no `<meta name="robots">`, no hreflang, 0 links to `primesupplements.ro`, title "Creatina (Creapure®) 500g/100 serv – PRIME SPORT SUPPLEMENTS SRL / 46260823" (the legal entity + CUI used as the store name). `$R/pages/b2b.html` (940 KB) canonical `https://b2b.primesupplements.ro/`, title "PRIME SPORT SUPPLEMENTS SRL / 46260823". Context: B2B robots.txt is Shopify default (crawlable), no password page.
- Affected scope: 58 product pages (the supplements core range) + B2B home/collections; also the main-store `/pages/inregistrare-b2b` links to it.
- Recommendation: a wholesale store should not compete with the retail store in Google. Either (a) enable the storefront password on the B2B store (Online Store -> Preferences -> Restrict access -> password; Shopify then returns 302 to `/password` for all storefront URLs and the sitemap is withdrawn), which is standard for B2B-only stores, or (b) keep it open but add to its `layout/theme.liquid` `<meta name="robots" content="noindex, nofollow">` and a `templates/robots.txt.liquid` with `User-agent: *` / `Disallow: /`, and change the store name from "PRIME SPORT SUPPLEMENTS SRL / 46260823" to "Prime Supplements B2B". Do not use cross-domain canonicals to the retail store: Google would then show retail prices for wholesale pages and the signal is ambiguous.
- Falsifiability: `curl -sI https://b2b.primesupplements.ro/products/creatina-creapure` returns 302 to `/password` (option a) or the page contains `noindex` (option b). If `site:b2b.primesupplements.ro` still returns product pages after 6 weeks, the fix failed.
- Leading indicator: `site:b2b.primesupplements.ro` result count (currently indexable) trending to 0; GSC for the main store no longer listing b2b URLs as "Google-selected canonical".
- Effort: S
- Confidence: 0.9

### TECH-03 — Five utility collections are indexable and in the sitemap, three of them full-catalogue duplicates of each other
- Severity: High
- Evidence: `$R/sitemaps/child3.xml` lists `/collections/all`, `/collections/cele-mai-vandute`, `/collections/lansate-recent`, `/collections/11-tva`, `/collections/frontpage` (and their `/ro-hu/` twins in `child9.xml`). `$R/parsed/pages_collection-all.json`: title "All Products" (English), H1 "All Products", canonical self, no meta robots, 969 words; pagination text "1 / 8" (24 products per page, `templates/collection.json` `products_per_page: 24`). Context/Admin: `all`, `cele-mai-vandute`, `lansate-recent` each contain all 185 active products (shown as 195 incl. ghost types) in a different sort order; `11-tva` is an internal VAT grouping (15 products, title "11% TVA", H1 "11% TVA", `$R/parsed/pages_collection-11tva.json`); `frontpage` holds 1 product; 8 of the 23 collections have no SEO title/description and all have empty descriptions. `layout/theme.liquid` contains no `<meta name="robots">` logic at all (verified in the live file), so nothing on the store can be noindexed today.
- Affected scope: 5 collections x up to 8 paginated pages x 2 markets = up to ~80 listing URLs that re-list the same 185 products; the "All Products" title is also reused by `/collections/all/<tag>` and `/collections/types?q=` (TECH-07/08).
- Recommendation: 
  1. No-code, Shopify-native: Settings -> Custom data -> Collections -> add definition namespace `seo`, key `hidden`, type Integer; set `1` on `all`, `cele-mai-vandute`, `lansate-recent`, `11-tva`, `frontpage` (and `reduceri`, TECH-05). Shopify then injects `noindex` through `content_for_header` and drops the URL from the sitemap. Do the same on the page `thank-you` (TECH-06).
  2. Belt-and-braces in `layout/theme.liquid`, directly after the canonical tag (the exact noindex rule block, also covering TECH-05/06/07/08/19):
     ```liquid
     {%- liquid
       assign seo_noindex = false
       assign utility_collections = 'all,cele-mai-vandute,lansate-recent,11-tva,frontpage,reduceri' | split: ','
       if request.page_type == 'collection'
         if utility_collections contains collection.handle
           assign seo_noindex = true
         endif
         if collection.handle == 'vendors' or collection.handle == 'types'
           assign seo_noindex = true
         endif
         if current_tags.size > 0
           assign seo_noindex = true
         endif
         if collection.products_count == 0
           assign seo_noindex = true
         endif
       endif
       if request.page_type == 'blog' and current_tags.size > 0
         assign seo_noindex = true
       endif
       if request.page_type == 'page' and page.handle == 'thank-you'
         assign seo_noindex = true
       endif
       if request.page_type == 'search'
         assign seo_noindex = true
       endif
     -%}
     {%- if seo_noindex -%}
       <meta name="robots" content="noindex, follow">
     {%- endif -%}
     ```
  3. Keep `/collections/all` as the internal "all products" hub for users (noindex, follow keeps link equity flowing) and make the real category collections (pudra-proteica, creatina, aminoacizi, ...) the indexable listing pages.
- Falsifiability: `curl -s https://primesupplements.ro/collections/all | grep -c 'noindex'` = 1 and `grep -c '/collections/all<' $sitemap` = 0. If GSC shows `/collections/cele-mai-vandute` still "Indexed" after a recrawl, the metafield/Liquid did not apply.
- Leading indicator: GSC "Excluded by noindex tag" rising by the number of utility URLs; impressions moving from `/collections/all?page=N` to category collections.
- Effort: S
- Confidence: 0.9

### TECH-04 — The blog archive is 59 pages deep with prev/next-only pagination (6 articles per page), so most of the 354 articles are 20–59 clicks from any hub
- Severity: High
- Evidence: `$R/pages/blog-index.html` pagination text `1 / 59` (`pagination__current`), 11 distinct article links on the page, only `href="/blogs/news?page=2"` (twice) as pagination links; `snippets/pagination.liquid` renders only `paginate.previous` and `paginate.next` (no `paginate.parts` numbered links); `sections/main-blog.liquid` schema `articles_per_page` min 5 / max 24 / default 6; 354 published articles -> ceil(354/6) = 59 pages. 346 of 355 articles have no tags (5 distinct tags), so no tag hubs exist; the homepage links to the blog index only. `rel="next"` is present but Google stopped using it in 2019.
- Affected scope: ~340 of 354 articles (everything beyond page 2), i.e. the site's largest content asset; also collections (`/collections/all` 8 pages, `/collections/haine-mnx` 4 pages) share the same prev/next-only snippet.
- Recommendation:
  1. Theme editor -> Blog -> "Articles per page" = 24 (max) -> 15 pages.
  2. Add numbered links in `snippets/pagination.liquid` between the prev and next anchors:
     ```liquid
     {%- for part in paginate.parts -%}
       {%- if part.is_link -%}
         <a class="pagination__item" {% if facet %}is="facet-link"{% endif %} href="{{ part.url }}{{ hash }}" aria-label="{{ 'general.accessibility.go_to_page' | t: index: part.title }}">{{ part.title }}</a>
       {%- elsif part.title == paginate.current_page -%}
         <span class="pagination__item pagination__item--current" aria-current="page">{{ part.title }}</span>
       {%- else -%}
         <span class="pagination__item pagination__item--disabled">{{ part.title }}</span>
       {%- endif -%}
     {%- endfor -%}
     ```
     (Shopify emits first, last and a window around the current page, so page 15 becomes reachable in 2 clicks.)
  3. Tag the 354 articles into 8–12 topic tags (creatina, proteine, aminoacizi, arzatoare, vitamine, antrenament, nutritie, MNX) and link `/blogs/news/tagged/<tag>` hubs from the blog index and from `sections/main-article.liquid` (related-articles block using `blog.articles` filtered by tag); add 3–5 "related articles" links per product page (`sections/main-product.liquid`) for the most-linked products.
  4. Add an HTML sitemap page (`/pages/harta-site`) listing all collections and article hubs, linked from `sections/footer.liquid`.
- Falsifiability: after the change, a crawl (Screaming Frog, depth report) shows max click depth from `/` <= 5 for all `/blogs/news/*` URLs; if the depth histogram still has URLs at depth > 10, it failed.
- Leading indicator: GSC "Crawled - currently not indexed" and "Discovered - currently not indexed" counts for `/blogs/news/` URLs; crawl frequency of deep articles in Crawl Stats.
- Effort: M
- Confidence: 0.9

### TECH-05 — The empty "Reduceri" collection is a 200, indexable, in both sitemaps (soft-404 candidate)
- Severity: Medium
- Evidence: `$R/parsed/pages_collection-reduceri.json`: title "Reduceri", H1 "Reduceri", canonical self, 400 words (all header/footer boilerplate), 0 product cards; `$R/sitemaps/child3.xml` and `child9.xml` both list it; `$R/work/hu-reduceri.html` confirms the `/ro-hu/` twin. Admin: 0 products, no SEO title/description, empty description. Meanwhile 144 of 185 products carry compare-at prices, so the page could be populated automatically.
- Affected scope: 2 URLs today; it is linked from navigation so it is crawled on every visit.
- Recommendation: either turn it into an automated collection (condition "Compare at price is greater than 0" -> it would list the 144 discounted products and become a genuinely useful "Reduceri" landing page with a 150-word description and SEO title "Reduceri suplimente | Prime Supplements"), or set `seo.hidden = 1` until it has products. The `collection.products_count == 0` branch in the TECH-03 block covers it automatically.
- Falsifiability: GSC URL inspection for `/collections/reduceri` shows "Indexed" with products or "Excluded by noindex"; "Soft 404" would mean neither fix applied.
- Leading indicator: GSC Pages report "Soft 404" count.
- Effort: S
- Confidence: 0.9

### TECH-06 — /pages/thank-you is indexable and in the sitemap (English title, no H1, no meta description)
- Severity: Medium
- Evidence: live `GET /pages/thank-you` -> 200, `<title>Thank you</title>`, canonical self, no `<meta name="robots">`, no `<meta name="description">`, no `<h1>`, 459 visible words of which the page-specific text is a B2B registration confirmation ("...contul tău va fi aprobat"), 220 KB HTML (`scratchpad/live-tech/thankyou.body`); listed in `$R/sitemaps/child2.xml` and `child8.xml`.
- Affected scope: 2 URLs; it is a post-form page with no search value.
- Recommendation: set metafield `seo.hidden = 1` on the page (removes from sitemap + noindex) and/or rely on the `page.handle == 'thank-you'` branch of the TECH-03 Liquid block. Rename the title to "Mulțumim – înregistrare B2B" for users.
- Falsifiability: sitemap no longer contains `/pages/thank-you`; page source contains `noindex`.
- Leading indicator: GSC "Excluded by noindex" includes the URL; no impressions for "thank you" queries.
- Effort: S
- Confidence: 0.95

### TECH-07 — Shopify's automatic vendor/type pseudo-collections are live, indexable and self-canonical (`/collections/vendors?q=primesupplements1` and `/collections/types?q=`)
- Severity: Medium
- Evidence: `scratchpad/tech/live/vendors.body`: 200, `<title>primesupplements1</title>`, H1 "primesupplements1" (the myshopify handle used as vendor on 64 products), canonical `https://primesupplements.ro/collections/vendors?q=primesupplements1`, 24 product cards, no meta description. `scratchpad/tech/live/types.body`: `/collections/types?q=` -> 200, title "Prime Supplements", **empty H1** (`<split-lines></split-lines>`), 24 product cards, canonical self; `/collections/types?q=Supliment` -> 404 (productType is empty on 185/185 products). robots.txt has no rule for `/collections/vendors` or `/collections/types`. Internal exposure is low: 0 vendor links in 14 local pages because `templates/product.json` has no "vendor" block and `settings.show_vendor` is off, but `snippets/vendor.liquid` would emit `url_for_vendor` links the moment a vendor block is added.
- Affected scope: 2 known URLs + 1 per distinct vendor value ("Prime Supplements", "primesupplements1") and any `q=` value a crawler tries.
- Recommendation: (1) fix the data: vendor "primesupplements1" -> "Prime Supplements" on 64 products and populate productType (ecommerce specialist); (2) noindex these templates via the `collection.handle == 'vendors' or 'types'` branch (TECH-03 block); (3) add to `templates/robots.txt.liquid` (see TECH-26) `Disallow: /collections/vendors`, `Disallow: /*/collections/vendors`, `Disallow: /collections/types`, `Disallow: /*/collections/types` once the noindex has been picked up.
- Falsifiability: `curl -s 'https://primesupplements.ro/collections/vendors?q=primesupplements1' | grep -c noindex` = 1.
- Leading indicator: GSC query report no longer shows the page for "primesupplements1"; "Excluded by noindex" includes `/collections/vendors`.
- Effort: S
- Confidence: 0.85

### TECH-08 — Tag-filtered collection and blog URLs are 200, self-canonical and indexable with duplicated titles
- Severity: Medium
- Evidence: live `GET /collections/all/creatina` -> 200, canonical `https://primesupplements.ro/collections/all/creatina`, title "All Products" and H1 "All Products" (identical to `/collections/all`), 3 product cards, no meta description (`scratchpad/live-tech/tagurl.body`). `scratchpad/tech/live/tag.body`: `/blogs/news/tagged/sanatate` -> 200, canonical self, title "Ultimele articole" and H1 "Ultimele articole" (identical to the blog index). Admin: 97 distinct product tags with case/plural variants x 23 collections = up to 2,231 crawlable tag URLs; robots.txt only blocks `+` combinations. No internal links to tag URLs were found in the sampled pages (`snippets/blog-post-card.liquid` prints tags as text badges), so exposure comes from external links and sitemaps of other sites.
- Affected scope: potentially thousands of thin URLs; 1 confirmed per pattern.
- Recommendation: noindex via `current_tags.size > 0` branches (TECH-03 block) for both collection and blog templates; in the long run, if blog tag hubs are built (TECH-04), remove the blog branch and instead give those hubs unique titles: in `sections/main-blog.liquid` the H1/title should use `{{ current_tags | join: ', ' }}` when set. Normalise the 97 tags (lower-case, singular) in Admin.
- Falsifiability: `/collections/all/creatina` source contains `noindex`; blog tag hub titles differ from "Ultimele articole".
- Leading indicator: GSC "Duplicate without user-selected canonical" / "Crawled - currently not indexed" for `/collections/*/*` and `/tagged/` URLs.
- Effort: S
- Confidence: 0.85

### TECH-09 — `<meta charset>` is the third element of `<head>` (byte 1,078, after a synchronous external script and a JSON-LD block), breaking the 1,024-byte rule
- Severity: Medium
- Evidence: live `layout/theme.liquid` head starts with `{% render 'schema-organization' %}` then `<script src="{{ 'pandectes-rules.js' | file_url }}"></script>` then `<meta charset="utf-8">` then the viewport. Rendered result on all 13 main-store pages: first element `<script type="application/ld+json">` (Organization, ~1 KB), `pandectes-rules.js` at byte 1,022 (synchronous, no `defer`/`async`, a file on the shop CDN), `<meta charset>` at byte 1,078 (`charset_pos: 1078` in the head analysis; the HTML spec requires the charset declaration within the first 1,024 bytes and before any script). On `$R/pages/article-thin-lcarnitine.html` the charset is at byte 2,254 because an app injects a further script ahead of it. Browsers must pre-scan or re-parse when the encoding is declared late, and the synchronous script blocks parsing of everything after it (title, canonical, viewport, CSS preloads) until the cookie-rules file is downloaded.
- Affected scope: every page of the store (layout file).
- Recommendation: reorder the head in `layout/theme.liquid`:
  ```liquid
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="{{ settings.header_background }}">
    <title>...</title>
    {%- if page_description -%}<meta name="description" content="{{ page_description | escape }}">{%- endif -%}
    <link rel="canonical" href="{{ canonical_href }}">
    {%- comment -%} consent rules must still precede content_for_header, which loads the trackers {%- endcomment -%}
    <script src="{{ 'pandectes-rules.js' | file_url }}"></script>
    {% render 'schema-organization' %}
  ```
  Keep `pandectes-rules.js` synchronous only if Pandectes "blocking mode" is enabled; otherwise add `defer`. Move the Organization JSON-LD to the end of `<head>` (position has no SEO meaning).
- Falsifiability: `curl -s https://primesupplements.ro/ | head -c 1024 | grep -c 'meta charset'` = 1; Lighthouse "charset declared" audit passes.
- Leading indicator: Lighthouse best-practices audit `charset`, and a lower "Eliminate render-blocking resources" estimate.
- Effort: S
- Confidence: 0.95

### TECH-10 — Viewport `maximum-scale=1.0, minimum-scale=1.0` disables pinch-zoom on every page
- Severity: Medium
- Evidence: `layout/theme.liquid`: `<meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0, maximum-scale=1.0">`; present verbatim in all 13 local pages and in the live `/ro-hu/` product. Lighthouse accessibility audit "[user-scalable=no] is used / maximum-scale less than 5" fails; WCAG 2.2 SC 1.4.4 (Resize text) fails; Safari ignores it but Chrome on Android honours it.
- Affected scope: all pages, all mobile users (mobile-first indexing crawler sees the same).
- Recommendation: `<meta name="viewport" content="width=device-width, initial-scale=1">` (Impact's own default). Note: this is not a ranking factor, but it is part of the page-experience/accessibility checks and of Google's mobile usability expectations.
- Falsifiability: `grep -c 'maximum-scale' $(curl -s https://primesupplements.ro/)` = 0; Lighthouse a11y "meta-viewport" passes.
- Leading indicator: Lighthouse accessibility score; mobile bounce rate on product pages.
- Effort: S
- Confidence: 1.0

### TECH-11 — Every page ships 221–617 KB of HTML with a 157–189 KB `<head>`, 131–170 KB of inline JavaScript and 67–72 script tags
- Severity: Medium
- Evidence (head analysis of local captures): homepage 617 KB (head 167 KB, inline JS 145 KB, inline CSS 43 KB, 69 `<script>` of which 20 external); product pages 337–393 KB (head 166 KB, inline JS 147–152 KB, 71–72 scripts); `/collections/all` 430 KB (head 188 KB, inline JS 168 KB); `/pages/contact` 221 KB for 221 words of content. Largest inline blocks on the homepage: `window.jdgmSettings` 30.4 KB (Judge.me), Shopify web-pixel loader 24.6 KB, `window.mktr` 19.3 KB (themarketer.com), `window.PandectesSettings` 16.3 KB. External scripts: 12 from `cdn.shopify.com/extensions/` app embeds (koala-upsell-gift 120 KB, dondy-whatsapp 64 KB br, judgeme loader, pop-convert, affiliate-by-secomapp x2, estimator, bloggenauto tracking.js), 6 first-party, plus GTM, portable-wallets 78 KB br, perf-kit 26 KB br, es-modules-shim 15 KB (`$R/perf/*.txt`). Five render-blocking stylesheets in head (theme.css, bss-custom.css, 2x Google Fonts CSS, judgeme shopify_v2.css). INP risk: six consent/marketing/chat/upsell apps attach listeners on every page.
- Affected scope: all templates; mobile LCP/INP most exposed (no field data available, see Limitations).
- Recommendation: (1) uninstall or disable app embeds not in use site-wide (Theme editor -> App embeds): pop-convert, estimator, bloggenauto tracking.js (the blog generator does not need a storefront pixel), affiliate-by-secomapp if the programme is inactive; load the WhatsApp bubble only after first interaction; (2) move the Judge.me settings blob out of every page by enabling Judge.me "Load widget asynchronously / minimal settings"; (3) load Microsoft Clarity, TikTok, Pinterest, Facebook through GTM with consent-gated triggers instead of separate inline snippets; (4) after TECH-09/12, re-measure with PSI once quota is available. Target: HTML < 250 KB on product pages, < 10 external scripts.
- Falsifiability: `curl -s https://primesupplements.ro/products/creatina-creapure | wc -c` < 260,000 and `grep -c '<script' ` < 45 after the clean-up; if not, apps were not removed.
- Leading indicator: PSI/CrUX INP and LCP p75 on mobile for the product template; GSC Core Web Vitals report "Poor URLs".
- Effort: M
- Confidence: 0.8

### TECH-12 — The Fontify app loads Google Fonts Poppins (all 18 styles) + Bebas Neue render-blocking while the theme preloads its own Barlow fonts that are then overridden
- Severity: Medium
- Evidence: `$R/home.html` contains `<!-- BEGIN app block: shopify://apps/fontify/blocks/app-embed/... -->` followed by `<link rel="preconnect" href="https://cdn.nitroapps.co">`, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400&display=swap">` and `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;...;1,900&display=swap">` (18 weight/style variants), plus two duplicate `rel="prefetch"` of the same CSS. The theme itself (`layout/theme.liquid`) preloads `settings.heading_font`/`settings.text_font` = Barlow (`barlow_n7...woff2`, `barlow_n4...woff2`, 2 x `<link rel="preload" as="font">`) and `--heading-font-family: Barlow` / `--text-font-family: Barlow` in css-variables; Fontify then overrides with a `Poppins ... !important` rule. Net effect: two unused font preloads, two render-blocking cross-origin CSS requests (fonts.googleapis.com was 0 bytes on HEAD in `$R/perf/asset-sizes-part2.txt`, i.e. a full extra connection), 18 Poppins faces declared of which a theme uses 2–3.
- Affected scope: all pages.
- Recommendation: remove Fontify; set Poppins and Bebas Neue as the theme fonts in Theme settings -> Typography (both are in Shopify's font library, served from `fonts.shopifycdn.com` with the preloads the theme already emits), so Barlow preloads disappear and only the used weights (400/500/700) load. If Fontify must stay, configure only the weights used and drop the `prefetch` duplicates.
- Falsifiability: `grep -c 'fonts.googleapis.com' home.html` = 0 and `grep -c 'barlow' home.html` = 0 after the change.
- Leading indicator: Lighthouse "Ensure text remains visible during webfont load" and "Eliminate render-blocking resources"; LCP on the homepage hero text.
- Effort: S
- Confidence: 0.9

### TECH-13 — 2,582 blog links point at primesupplements1.myshopify.com, so every product link in the blog is a 301 hop
- Severity: Medium
- Evidence: `$R/shopify/catalog-analysis.md` (context): 2,582 in-body links to `primesupplements1.myshopify.com` in 349 articles (1,602 product, 534 `/cart/`, 446 collection links), each product linked twice (primary + myshopify). Verified on `$R/pages/article-2026-citicolina.html`: 23 `primesupplements1.myshopify.com` links in the raw HTML. Live `https://primesupplements1.myshopify.com/products/creatina-creapure` -> 301 to the primary domain (`cache-control: private, no-store`). The 534 `/cart/...` links are disallowed in robots.txt (`Disallow: /cart/`), so they are dead ends for crawlers.
- Affected scope: 349 of 354 articles; the most-linked products (creatina-monohidrat..., creatina-creapure, fiber-blood-orange, 23–25 articles each) receive half their internal links through redirects.
- Recommendation: bulk find/replace in article bodies (Admin API `articleUpdate` or the BlogGenAuto settings "store URL" set to `https://primesupplements.ro`): `https://primesupplements1.myshopify.com/` -> `https://primesupplements.ro/`; convert `/cart/<variant>:1` links into product-page links; de-duplicate the double product links. Owned by the blog clean-up task, flagged here because it is a redirect/crawl-efficiency defect.
- Falsifiability: `grep -c myshopify.com` on any article HTML = 0 after the job.
- Leading indicator: GSC Links report "Top linked pages (internal)" showing primary-domain product URLs with 2x the link counts; Crawl stats "redirect" response share dropping.
- Effort: M
- Confidence: 0.95

### TECH-14 — Sitemap `<lastmod>` churn: all 185 products and 21/23 collections carry today's timestamp
- Severity: Low
- Evidence: `$R/sitemaps/child1.xml`: 185/185 product `<lastmod>` = `2026-10-12T17:33:42+03:00` (one identical timestamp); `child3.xml`: 21 of 23 collections `2026-10-12`. Articles are healthy (354 entries, 90 distinct dates, newest 2026-09-14 x22). Shopify sets lastmod from `updated_at`; an app or sync is touching every product (inventory sync, BSS B2B pricing, Koala, or the daily data pull) so lastmod carries no signal and Google will learn to ignore it.
- Affected scope: 185 products + 21 collections (x2 markets).
- Recommendation: identify the writer in Admin -> Settings -> Notifications/Activity or Admin API `events` for one product; move inventory/price syncs to only write when values change. Verify with tomorrow's sitemap that product lastmod values spread out again.
- Falsifiability: `grep -o '<lastmod>[^<]*' sitemap_products_1.xml | sort -u | wc -l` > 20 within a week; if it stays 1, a daily writer is still active.
- Leading indicator: GSC Crawl stats "By purpose: refresh" share for product URLs.
- Effort: S
- Confidence: 0.7

### TECH-15 — Trailing-slash variants return 200 (duplicate URL per page, mitigated by canonical)
- Severity: Low
- Evidence: live `GET /products/baton-proteic-capsuni/` -> 200, 345,073 bytes (identical to the non-slash page), canonical and og:url `https://primesupplements.ro/products/baton-proteic-capsuni` (`scratchpad/live-tech/slash.*`). No internal links with trailing slashes were found in 14 local pages. Shopify does not 301 trailing slashes and URL redirects have no wildcard support.
- Affected scope: every URL (platform behaviour).
- Recommendation: nothing to change on the platform; keep the canonical (already correct) and make sure external/campaign links and the blog never use the slash form. Monitor in GSC.
- Falsifiability: GSC Pages "Duplicate, Google chose different canonical" listing `/.../` URLs would mean the canonical is being overridden.
- Leading indicator: count of trailing-slash URLs in GSC "Alternate page with proper canonical tag".
- Effort: S
- Confidence: 0.9

### TECH-16 — http://www is a two-hop redirect chain
- Severity: Low
- Evidence: `http://www.primesupplements.ro/` -> 301 `https://www.primesupplements.ro/` -> 301 `https://primesupplements.ro/` (`scratchpad/live-tech/http_www.hdr`, `www_https.hdr`; same chain on a product URL in `scratchpad/tech/live/chain_httpwww.hdr`). `http://primesupplements.ro/` and `https://www...` are single hops. HSTS is not on the preload list and lacks `includeSubDomains`, so the first hop is unavoidable for a first visit.
- Affected scope: any inbound link/typed URL using `http://www`.
- Recommendation: platform-managed on Shopify/Cloudflare; the practical fix is to make sure every external citation, directory, GBP, social profile and ad uses `https://primesupplements.ro/` (non-www). Optional: submit to hstspreload.org requires `includeSubDomains; preload`, which Shopify does not expose.
- Falsifiability: `curl -sIL http://www.primesupplements.ro/ | grep -c '^HTTP/'` = 3 today; cannot be reduced on Shopify.
- Leading indicator: backlink audit share of `http://www` link targets.
- Effort: S
- Confidence: 1.0

### TECH-17 — Three handles contain Romanian diacritics (percent-encoded) and the canonical tag uses a different encoding case than the sitemap/hreflang
- Severity: Low
- Evidence: `$R/sitemaps/all-urls.txt`: `/pages/termeni-%C8%99i-condi%C8%9Bii`, `/blogs/news/bcaa-vs-eaa-diferen%C8%9Be-%C8%99i-beneficii-pentru-culturisti-ghid-complet`, `/blogs/news/water-out-tinctura-solu%C8%9Bia-naturala-pentru-eliminarea-reten%C8%9Biei-de-apa` (upper-case hex). `$R/pages/article.html`: canonical and og:url use lower-case `%c8%9be-%c8%99i` while hreflang on the same page uses upper-case `%C8%9Be-%C8%99i`. Three byte-different spellings of the same URL on one page; Google normalises percent-encoding case, but reporting tools and some crawlers do not.
- Affected scope: 3 URLs (x2 markets).
- Recommendation: rename the handles to ASCII (`termeni-si-conditii`, `bcaa-vs-eaa-diferente-si-beneficii-pentru-culturisti`, `water-out-tinctura-solutia-naturala-retentie-apa`) with "Create a URL redirect" ticked in Admin; keep future handles ASCII-only (BlogGenAuto setting).
- Falsifiability: sitemap no longer contains `%C8`; old URLs 301.
- Leading indicator: GSC shows the ASCII URL as canonical.
- Effort: S
- Confidence: 0.9

### TECH-18 — URL hygiene: 57 sitemap URLs exceed 100 characters, 42 article handles end in -2…-5 and 134 contain English fragments
- Severity: Low
- Evidence: `$R/sitemaps/all-urls.txt`: 57 primary URLs > 100 chars (1 > 120; longest 124: `/blogs/news/creatina-si-volumizarea-musculara-secretele-absorbtiei-creatinei-optimizare-rezultate`; one product: `/products/pachet-mix-arome-bautura-instant-frutilu-fara-zahar-18-plicuri-x-10g-set-degustare`, 119). 42 article handles end in `-2..-5` (e.g. `/blogs/news/acetyl-l-carnitine-l-carnitine-1000-80-caps-2`, `...-budget-smart-supplementation-s` and `-s-2`), i.e. regenerated topics. 134 article handles contain English words (`-travel-`, `-workout-`, `-benefits-`, `-guide-`...). Several slugs repeat the head term 2–3 times (`spirulina-spirulina-...-spirulina`).
- Affected scope: ~140 of 354 articles.
- Recommendation: handle these during the blog consolidation (content specialist): when merging `-2` duplicates, keep the shorter handle and 301 the rest; cap new handles at 5–7 words, Romanian only. Do not mass-rename good-ranking URLs just for length.
- Falsifiability: count of sitemap URLs > 100 chars decreasing after consolidation.
- Leading indicator: none direct; track via the cannibalisation groups in catalog-analysis.md.
- Effort: M
- Confidence: 0.8

### TECH-19 — The empty `/search` page is indexable while `/search?q=` is not
- Severity: Low
- Evidence: `scratchpad/tech/live/search_empty.*`: `GET /search` -> 200, no `x-robots-tag`, canonical `https://primesupplements.ro/search`, title "Caută", meta description = the homepage description ("Magazin online cu suplimente nutritive..."); `GET /search?q=creatina` -> `x-robots-tag: noindex, nofollow` (header). Linked site-wide from the header (2 `/search` links on every page).
- Affected scope: 1 URL (x2 markets).
- Recommendation: `request.page_type == 'search'` branch in the TECH-03 block (`noindex, follow`).
- Falsifiability: `/search` source contains `noindex`.
- Leading indicator: GSC "Excluded by noindex" includes `/search`.
- Effort: S
- Confidence: 0.95

### TECH-20 — `og:image` is emitted with `http://` on every page
- Severity: Low
- Evidence: `$R/home.html`: `<meta property="og:image" content="http://primesupplements.ro/cdn/shop/files/prime-supplements.jpg?v=1747657200&width=2048">`; product pages likewise (`http://primesupplements.ro/cdn/shop/files/01_BATONPROTEIC_strawberry_front.jpg...`), one insecure URL per page; `og:image:secure_url` is https. Source: `snippets/social-meta-tags.liquid` (context). The CSP `upgrade-insecure-requests` hides this in browsers but Facebook/LinkedIn/WhatsApp scrapers fetch the literal http URL and some reject it.
- Affected scope: all pages.
- Recommendation: in `snippets/social-meta-tags.liquid` output `{{ image | image_url: width: 1200 }}` prefixed with `https:` (Shopify returns protocol-relative `//`), or `| replace: 'http://', 'https://'`.
- Falsifiability: `grep -c 'content="http://'` on any page = 0.
- Leading indicator: Facebook Sharing Debugger shows no warning for the image.
- Effort: S
- Confidence: 1.0

### TECH-21 — Stale resource hints: `dns-prefetch productreviews.shopifycdn.com` (retired Shopify Product Reviews) and `preconnect cdn.nitroapps.co` (Fontify) open connections that nothing uses
- Severity: Low
- Evidence: `layout/theme.liquid` hard-codes `<link rel="dns-prefetch" href="https://productreviews.shopifycdn.com">`; Judge.me is the review app (dns-prefetch to cdn.judge.me, cdn1.judge.me, api.judge.me also present). `cdn.nitroapps.co` appears exactly once on the page (the preconnect itself, injected by the Fontify app block) with no asset loaded from it. Also two `rel="prefetch"` duplicates of the two Google Fonts CSS files already loaded as stylesheets.
- Affected scope: all pages (4 wasted hints).
- Recommendation: delete the `productreviews.shopifycdn.com` line from `layout/theme.liquid`; removing Fontify (TECH-12) removes the other three.
- Falsifiability: hints absent from the page source.
- Leading indicator: none (micro-optimisation).
- Effort: S
- Confidence: 0.95

### TECH-22 — Security headers are platform-limited: HSTS 91 days without preload/includeSubDomains, no Referrer-Policy or Permissions-Policy, minimal CSP
- Severity: Low
- Evidence: all 200 responses: `strict-transport-security: max-age=7889238` (about 91 days, no `includeSubDomains`, no `preload`); `content-security-policy: block-all-mixed-content; frame-ancestors 'none'; upgrade-insecure-requests;` (no `default-src`/`script-src`); no `referrer-policy` (only the Cloudflare 429 challenge page sends `referrer-policy: same-origin`); no `permissions-policy`. `x-frame-options: DENY` and `x-content-type-options: nosniff` present.
- Affected scope: all responses; Shopify does not let merchants set response headers.
- Recommendation: no action possible on Shopify; document as accepted. Security headers are not a ranking input (HTTPS is the only lightweight signal). If a strict `Referrer-Policy` is wanted, `<meta name="referrer" content="strict-origin-when-cross-origin">` can be added to `layout/theme.liquid` (also protects affiliate/UTM leakage).
- Falsifiability: n/a (platform).
- Leading indicator: none.
- Effort: S
- Confidence: 1.0

### TECH-23 — 30 fully out-of-stock products are indexable and in the sitemap; the index also lists two empty child sitemaps
- Severity: Low
- Evidence: `$R/shopify/products-all.json`: 30 rows with `inventory_total <= 0` / `available_any = false` (22 MNX apparel, 8 supplements); all 185 products are in `$R/sitemaps/child1.xml` (no availability filter, Shopify default). `child6.xml` and `child12.xml` (`sitemap_metaobject_pages_1.xml` and its `/ro-hu/` twin) are empty `<urlset>` files still referenced by the index.
- Affected scope: 30 products (x2 markets); 2 empty sitemaps (harmless).
- Recommendation: for products that will not return, set status Draft/Archived and 301 the handle to the parent collection (Admin -> URL redirects); for seasonal apparel keep them live but show "Anunță-mă când revine" and the alternatives block (Impact "Complementary products"), and let the schema specialist mark `availability: OutOfStock`. Empty child sitemaps need no action.
- Falsifiability: sitemap product count drops by the number archived; archived handles 301.
- Leading indicator: GSC "Soft 404" for product URLs; Merchant Center "out of stock" disapprovals.
- Effort: S
- Confidence: 0.85

### TECH-24 — IndexNow is not implemented
- Severity: Info
- Evidence: Shopify does not ping IndexNow natively; no `/<key>.txt` or `indexnow` reference in the theme, robots.txt or headers. Bing/Yandex share in Romania is small, and Google does not consume IndexNow.
- Affected scope: n/a.
- Recommendation: optional; if Bing traffic becomes material, use an IndexNow Shopify app or Bing Webmaster Tools' URL submission API. Not a priority.
- Falsifiability: n/a.
- Leading indicator: Bing Webmaster Tools "Index Explorer" freshness.
- Effort: S
- Confidence: 0.9

### TECH-25 — JavaScript rendering passes; only Judge.me review content is JS-injected
- Severity: Info
- Evidence: raw-HTML visible words: product 1,039 (`$R/pages/product.html`, description + "Ingrediente" + buy box present), article 2,367 (`$R/pages/article-2026-citicolina.html`), collection grid 24 `<product-card>` in `$R/pages/collection-all.html`; `is_spa` could not be computed by `render_page.py` (sandbox proxy, see context), so rendered output was not compared. The Judge.me widget is loaded by `judgeme-775/assets/loader.js` and no review text or `aggregateRating` string exists in any product HTML (`judgeme_jsonld: False` on 14 pages), so review content and star ratings are invisible to non-rendering agents and to Google until render.
- Affected scope: all product pages.
- Recommendation: enable Judge.me "Rich snippets / JSON-LD in theme" (adds `aggregateRating` to the server HTML) and its "Preloaded reviews" option (schema specialist owns the markup). No SSR work needed on the theme.
- Falsifiability: `grep -c aggregateRating` on a product page with reviews = 1.
- Leading indicator: GSC "Review snippets" enhancement report appearing.
- Effort: S
- Confidence: 0.85

### TECH-26 — robots.txt is Shopify's 2026 default (correcting the context): sort_by and multi-filter are blocked; gaps remain for vendors/types/tag/ro-hu URLs
- Severity: Info
- Evidence: `scratchpad/tech/live/robots.txt` (116 lines): `Disallow: /collections/*sort_by*`, `/*/collections/*sort_by*`, `/collections/*filter*&*filter*`, `/collections/*+*`, `/blogs/*+*`, `/*?*preview_theme_id=*`, `/cart/`, `/checkout`, `/account`, `/cart.js`, `/recommendations/products`; `Allow: /` for `*`; a separate `adsbot-google` group; `Sitemap:` declared; no rule for `/search`, `/collections/vendors`, `/collections/types`, `/collections/<handle>/<tag>`, `/blogs/news/tagged/`, `/ro-hu/`; no AI-crawler rules and no `Content-Signal` (`agentic_fix.py robots` proposes `Content-Signal: search=yes, ai-input=yes, ai-train=no`; owned by seo-agentic). `/search?q=` relies on the `x-robots-tag` header instead.
- Affected scope: site-wide crawl policy.
- Recommendation: create `templates/robots.txt.liquid` only after the noindex rules (TECH-03) have been crawled, so Google sees the noindex before being blocked:
  ```liquid
  {%- for group in robots.default_groups -%}
    {{ group.user_agent }}
    {%- for rule in group.rules %}
    {{ rule }}
    {%- endfor -%}
    {%- if group.user_agent.value == '*' %}
    Disallow: /collections/vendors
    Disallow: /*/collections/vendors
    Disallow: /collections/types
    Disallow: /*/collections/types
    {%- endif %}
    {%- if group.sitemap != blank %}
    {{ group.sitemap }}
    {%- endif %}
  {%- endfor -%}
  ```
  Do not disallow `/ro-hu/` (Google must see its canonical/noindex) and do not disallow `/search` (the header already handles it).
- Falsifiability: `curl -s https://primesupplements.ro/robots.txt | grep -c vendors` = 2.
- Leading indicator: GSC Crawl stats "Blocked by robots.txt" count for `/collections/vendors`.
- Effort: S
- Confidence: 0.95

### TECH-27 — 404 handling is correct; the error page has no H1 and canonicalises to /404
- Severity: Info
- Evidence: `GET /this-page-does-not-exist-xyz` -> HTTP 404, title "404 negăsit", `<link rel="canonical" href="https://primesupplements.ro/404">`, no `<h1>`, 75 links, 219 KB, `cache-control: private, no-store`; `GET /collections/types?q=Supliment` also 404.
- Affected scope: error template.
- Recommendation: add an H1 ("Pagina nu a fost găsită") and a search box + top-collection links to `templates/404.json`; the canonical to `/404` is a Shopify default and harmless.
- Falsifiability: 404 page contains an `<h1>`.
- Leading indicator: GSC "Not found (404)" list staying stable (no new broken internal links).
- Effort: S
- Confidence: 0.9

### TECH-28 — Structured data is present on every template but duplicated and partly invalid (detail owned by the schema specialist)
- Severity: Info
- Evidence: JSON-LD block counts: homepage 2, product 3–4, collection 2, article 2 from the theme plus 4 embedded by BlogGenAuto inside the article body (6 on `$R/pages/article-2026-citicolina.html`: duplicated Article/BreadcrumbList/FAQPage/Person). `layout/theme.liquid` has `{%- comment -%}{%- render 'microdata-schema' -%}{%- endcomment -%}` (the theme's maintained snippet disabled) and custom snippets with the newline-escaping bug described in the context (Product JSON invalid on 7/13 sampled products, Article on 2/2).
- Affected scope: all product and article pages.
- Recommendation: see findings/schema.md. From the technical side: structured data is in the initial HTML (good: no JS injection delay).
- Falsifiability: Rich Results Test parses every product page without "Parsing error".
- Leading indicator: GSC "Products"/"Merchant listings" enhancement report item counts.
- Effort: M
- Confidence: 0.9

## Limitations

- Core Web Vitals could not be measured (PSI quota exhausted, no CrUX, no Chromium); CWV statements are static-analysis risk signals only, not scores.
- `/collections/vendors?q=primesupplements1` returned the Cloudflare "Verifying your connection..." 429 twice this session; evidence comes from the earlier capture in `scratchpad/tech/live/vendors.body`. The same bot protection means any future crawl of the site must be rate-limited.
- `$R/theme/layout__theme.liquid` was absent; the live layout was read through a single read-only Admin GraphQL query (`themes.files`, theme 179784286583). No store data was modified.
- The B2B store's robots.txt and password state were taken from the context file, not re-fetched.
- Google's rendered DOM was not compared with raw HTML (render_page.py is blocked in the sandbox); SSR conclusions are based on raw-HTML word counts.
- Full-site crawl depth was derived from pagination settings and page counts, not from a crawler run.
- Pandectes banner behaviour (interstitial vs small banner) was not assessed; its settings blob did not expose a readable layout key.
