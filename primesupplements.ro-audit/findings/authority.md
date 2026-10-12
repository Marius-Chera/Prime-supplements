# Authority, backlinks and brand presence — primesupplements.ro

Audit date: 2026-10-12. Key: `authority`. Evidence root `$R` = /tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/recon

## Scope & method

What was checked
- Backlink data tier: `claude-seo run backlinks_auth.py --check --json` → **tier 0** ("Basic (Common Crawl + Verify only)"); Moz, Bing Webmaster and Keywords Everywhere keys absent; no DataForSEO, GSC or GA4 (audit-context.md §4).
- Common Crawl web graph (release cc-main-2026-jan-feb-mar), cached results in `/root/.cache/claude-seo/commoncrawl/` for primesupplements.ro, gymbeam.ro, bodyline.ro, proteinshop.ro (`$R/backlinks/` is an empty directory; the cache files are the actual evidence).
- Skill rule compliance: `validate_backlink_report.py --report <scratch>/authority-backlink-report.json` → `status: PASS` with every backlink factor recorded as `Not Assessed` (Common-Crawl-only case; see "Score").
- Brand presence: 19 WebSearch queries (15 brand/entity queries + 4 competitor/opportunity queries; list in AUTHORITY-02). Caveat: the search tool is US-centric and did not honour `site:` or exact-match operators (it said so explicitly), so "not found" means "not surfaced by this engine", not "does not exist".
- 8 throttled live requests (2 s apart, none to the store): YouTube, TikTok (x2), Facebook (x2), Trustpilot, Judge.me public store page (x2 slugs).
- On-site entity signals from local copies: `$R/theme/snippets__schema-organization.liquid`, `$R/home.html` (footer social links, Judge.me badges), `$R/pages/page-contact.html`, `$R/pages/page-despre-noi.html`, `$R/pages/b2b.html`, `$R/pages/article*.html`, `$R/parsed/*.json` (24 pages, external-link inventory), `$R/shopify/articles-all.json` (355 rows: `has_powered_by_bloggenauto_link`, `myshopify_links`, `cart_links`, `external_link_targets`, `ldjson_types`), `$R/shopify/articles-p*.json` (raw anchor markup), `$R/shopify/products-all.json` (vendors, branded ingredients), `$R/shopify/catalog-analysis.md`.

What could not be checked
- Referring domains, anchors, toxicity, velocity, follow ratio (no scoreable source). Instagram/Facebook/TikTok profile existence (login walls / JS rendering → `unverifiable_js`). Trustpilot (403 bot check). Romanian business-register aggregators and Google Business Profile (not surfaced by the engine; not fetchable within budget). LinkedIn profile `linkedin.com/in/chera23` (not fetched).

## Score

**Authority category score: 18/100.**
Backlink Health Score (skill definition): **INSUFFICIENT DATA — Not Assessed (0/7 factors scored)**; the only source is Common Crawl, where the domain is absent, so no numeric backlink-health number is produced (validator PASS). The 18/100 is the audit-level category score for *measurable* authority signals: zero third-party mentions surfaced in 15 brand queries, absence from the CC graph while the main competitor is ranked, Organization `sameAs` wrong on 3/3 networks, 431 Judge.me reviews and the author entity invisible off-site, and 2,776 outbound/redirecting links in the blog (194 dofollow "Powered by BlogGenAuto" + 2,582 myshopify) that leak or waste equity.

## What works
- NAP is consistent on-site: footer (every page) and /pages/contact both show "PRIME SPORT SUPPLEMENTS SRL · 46260823 · J32/1155/2022 · 0775286584 · contact@primesupplements.ro · Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A" (`$R/pages/page-contact.html`, `$R/home.html`).
- Organization JSON-LD exists on every page with a stable `@id` (`https://primesupplements.ro/#organization`), logo and `sameAs` array (`$R/theme/snippets__schema-organization.liquid`) — the container is right, only its values are wrong (AUTHORITY-03).
- Real social footprint: YouTube channel `@primesupplementsro` verified live (HTTP 200, `<title>Prime Supplements - YouTube`); footer links Facebook, Instagram, YouTube, TikTok with `rel="noopener"` and Romanian aria-labels.
- Real review corpus: Judge.me store carousel reports **431 reviews** (`data-number-of-reviews='431'` in `$R/home.html`); individual products show 44, 17, 14, 13 reviews. Judge.me's own attribution link is correctly `rel='nofollow noopener'`.
- Legally required outbound links (anpc.ro, consumer-redress.ec.europa.eu) are present site-wide (24/24 parsed pages) — a trust signal for Romanian shoppers.
- The blog's "sources" point to reputable domains (ncbi.nlm.nih.gov 327, who.int 235, mayoclinic.org 257, fda.gov 67) — no links to spam/casino/pharma networks were found in 355 articles.
- No evidence of toxic inbound links or a manual action (nothing could be found at all, which is a different problem).

## Findings

### AUTHORITY-01 — Domain absent from the Common Crawl web graph while the lead competitor is ranked
- Severity: High
- Evidence: `/root/.cache/claude-seo/commoncrawl/primesupplements.ro-cc-main-2026-jan-feb-mar-combined.json` → `"in_crawl": false, "in_rankings": false, "pagerank": null, "harmonic_centrality": null, "n_hosts": null, "note": "Domain not found in Common Crawl data. It may be too new, too small, or not yet crawled."` Comparison (same release, source CC 0.50): gymbeam.ro `in_rankings: true, pagerank_rank 372,270, harmonic_centrality_rank 7,453,268, n_hosts 2`; bodyline.ro `in_rankings: true, pagerank_rank 10,228,379`; proteinshop.ro absent (like the target). `backlinks_auth.py --check` → `"tier": 0`.
- Affected scope: whole domain (all 1,151 sitemap URLs); every ranking page depends on this.
- Recommendation: treat the domain as having no measurable link graph presence and (a) measure first — verify the property in Google Search Console (Links report) and Bing Webmaster Tools (free backlink report + API key for `bing_webmaster.py`), add a free Moz API key to `/root/.config/claude-seo/backlinks-api.json` so `moz_api.py metrics primesupplements.ro` returns DA/linking root domains; (b) execute the link plan below (P0–P2). Do not buy links; the profile is empty, so even a handful of paid links would be the majority of it and trivially detectable.
- Falsifiability: a GSC Links report or Moz `linking_root_domains` ≥ 20 would show CC simply missed the domain; re-run `commoncrawl_graph.py primesupplements.ro` on the next quarterly release.
- Leading indicator: GSC "Top linking sites" count; Moz linking root domains; CC `in_rankings` flips to true.
- Effort: S (measurement) / L (earning links)
- Confidence: 0.85

### AUTHORITY-02 — Zero third-party brand mentions surfaced for the brand, company, founder or products
- Severity: High
- Evidence: 15 brand/entity queries returned no page that mentions the store: `"prime supplements" romania suplimente`; `"primesupplements.ro"`; `"prime supplements" sibiu OR cisnadie`; `"prime sport supplements" srl 46260823`; `"PRIME NITROX" OR "Combat PRO" OR "Pure Isolate" "prime supplements"`; `"prime supplements" pareri OR recenzii OR review romania`; `"prime supplements" emag OR olx OR facebook OR instagram OR tiktok OR youtube romania`; `"bloggenauto" "prime supplements"`; `"Marius Chera" nutritionist OR culturism OR NPC`; `site:primesupplements.ro`; `"primesupplements"`; `"PRIME SPORT SUPPLEMENTS" ... "J32/1155/2022"`; `"prime supplements" creatina OR creapure OR "mnx" magazin romania`; `"primesupplements1.myshopify.com" OR "b2b.primesupplements.ro"`; `"chera23" OR "Marius Chera" linkedin ...`. Every result set was about unrelated "Prime" brands (Prime Nutrition/Blackstone Labs, Prime Biome, Prime Naturals/primeomega3.ro, Prime Hydration). Control queries for competitors did surface third-party pages: gymbeam.ro → compari.ro store page (`compari.ro/stores/gymbeam-ro-s126255/`, "Magazinul Anului 2025" award), forbes.ro revenue coverage, stack3d.com, mensfitness.co.uk; proteinshop.ro → none (comparable footprint to the target). Brand-mention inventory found: **0 directories, 0 marketplaces, 0 press, 0 forums, 0 influencer pages, 0 Trustpilot/Judge.me public pages, 0 Wikipedia-like entities.**
- Affected scope: brand entity (Knowledge Graph / AI-answer eligibility), every page.
- Recommendation: run the P1 citation sprint (AUTHORITY plan below): compari.ro store listing, Google Business Profile + Bing Places for the Cisnădie office, eMAG marketplace brand page (the catalog already has GTINs on 188/395 variants), Trustpilot claim, supplier brand listings (Creapure/KSM-66/Kyowa), FRCF/NPC athlete pages, 3–5 Romanian press/podcast interviews with Marius Chera. Target: ≥ 25 distinct referring domains that mention "Prime Supplements" + "Cisnădie" or the CUI within 90 days.
- Falsifiability: a Google/Bing search in Romania for `"prime supplements" cisnadie` returning compari/termene/press pages would show the engine used here under-sampled Romanian results; a GSC Links report with > 20 linking sites would also falsify "no footprint".
- Leading indicator: count of third-party URLs mentioning the brand (track monthly with Google Alerts for "Prime Supplements", "primesupplements.ro", "Prime Sport Supplements").
- Effort: L
- Confidence: 0.7 (engine is US-centric; operators not honoured)

### AUTHORITY-03 — Organization `sameAs` disagrees with the real social profiles on all three networks and omits YouTube
- Severity: High
- Evidence: `$R/theme/snippets__schema-organization.liquid` hard-codes `"sameAs": ["https://www.facebook.com/primesupplements.ro", "https://www.instagram.com/primesupplements.ro", "https://www.tiktok.com/@primesupplements"]`. The footer (merchant-configured Shopify social settings, rendered via `snippets/social-media` in `sections__footer.liquid`) links `https://www.facebook.com/primesupplementsro`, `https://www.instagram.com/primesupplements_ro/`, `https://www.youtube.com/@primesupplementsro`, `https://www.tiktok.com/@primesupplements.ro` (each 2x in `$R/home.html`). 0 of 3 `sameAs` URLs match; YouTube (the one profile verified live: HTTP 200, title "Prime Supplements - YouTube") is missing. Live checks: tiktok `@primesupplements.ro` and `@primesupplements` both 200 with generic title (`unverifiable_js`); facebook `/primesupplementsro` → 400 at login redirect, `/primesupplements.ro` → 200 at login redirect (`unverifiable_js`). The B2B store additionally advertises Shopify's placeholder socials (AUTHORITY-07).
- Affected scope: every page of the main store (snippet rendered from layout/theme.liquid) = 1,151 sitemap URLs incl. /ro-hu.
- Recommendation: stop hard-coding; derive from the same settings the footer uses so the two can never diverge:
  ```liquid
  {%- assign same_as = "" | split: "" -%}
  {%- for key in "social_facebook,social_instagram,social_youtube,social_tiktok,social_pinterest,social_linkedin" | split: "," -%}
    {%- assign v = settings[key] -%}
    {%- if v != blank -%}{%- assign same_as = same_as | push: v -%}{%- endif -%}
  {%- endfor -%}
  "sameAs": {{ same_as | json }},
  ```
  (check the exact setting ids in `config/settings_schema.json` of the Impact theme; Impact names them `social_facebook`, `social_instagram`, `social_youtube`, `social_tiktok`…). Then confirm in Shopify Admin → Settings → Social media that the handles are the ones that exist (log into each network; the audit could not verify Facebook/Instagram/TikTok).
- Falsifiability: Rich Results Test / Schema validator on the homepage shows `sameAs` values identical to the footer hrefs.
- Leading indicator: Google Knowledge Panel / Bing entity card shows the correct social links; `sameAs` diff = 0 in the drift baseline.
- Effort: S
- Confidence: 0.95

### AUTHORITY-04 — No scoreable backlink data source is configured (GSC, Bing WMT, Moz)
- Severity: Medium
- Evidence: `backlinks_auth.py --check --json`: moz `available: false` ("No Moz API key found"), bing `available: false`, keywordseverywhere `available: false`; audit-context.md §4: no GSC/GA4 credentials. Consequently all 7 skill factors are `Not Assessed` (validator PASS on `<scratch>/authority-backlink-report.json`).
- Affected scope: audit/measurement process; prevents any link-velocity, anchor or toxicity monitoring.
- Recommendation: (1) GSC property for `primesupplements.ro` (domain property) and `b2b.primesupplements.ro`; export Links → "Top linking sites" monthly. (2) Bing Webmaster Tools: import from GSC, create API key, store as `bing_api_key` in `/root/.config/claude-seo/backlinks-api.json`. (3) Moz free API key (2,500 rows/month) as `moz_api_key`. Re-run `/seo backlinks primesupplements.ro` afterwards to get a real Backlink Health Score.
- Falsifiability: `backlinks_auth.py --check` reports tier ≥ 1.
- Leading indicator: tier number; first scored run.
- Effort: S
- Confidence: 1.0

### AUTHORITY-05 — 194 articles carry a templated, dofollow, low-contrast "Powered by BlogGenAuto" link
- Severity: High
- Evidence: exact markup in article bodies (`$R/shopify/articles-p*.json`): 192x `<a href="https://bloggenauto.com" target="_blank" rel="noopener" style="color: #9aa0a6; text-decoration: none;">Powered by BlogGenAuto</a>` + 2x same with attribute order swapped. No `rel="nofollow"`/`"sponsored"`; grey #9aa0a6 text on white. `articles-all.json`: `has_powered_by_bloggenauto_link` = 194/355 (55% of the blog). bloggenauto.com is the 6th most-linked external domain site-wide (194 links). The app also injects `cdn.shopify.com/extensions/.../bloggenauto-245/assets/tracking.js` twice per article page (`$R/pages/article*.html`). Web search: BlogGenAuto is a Shopify app "AI SEO Blog Writer" (`apps.shopify.com/seo-auto-write-easy-blog`).
- Affected scope: 194 articles (plus their /ro-hu duplicates = 388 URLs).
- Why it matters: (a) it is the "widely distributed links in templates" pattern named in Google's link-spam policy, with a styled-to-be-unnoticed anchor; (b) it is a machine-readable disclosure that 55% of the blog is auto-generated, on a site already publishing 127 articles in one month (scaled-content-abuse exposure); (c) each link passes equity to a third party from pages that have none to spare.
- Recommendation: remove the anchor from all 194 bodies via a one-off Admin API pass (read each article, apply `re.sub(r'<a[^>]*href="https://bloggenauto\.com"[^>]*>Powered by BlogGenAuto</a>', '', body)`, write back with `articleUpdate`) — do this in the blog clean-up task, not in the theme. If the merchant must keep attribution (check the app's terms), set `rel="nofollow sponsored"` and remove the colour styling. Also disable the app's "tracking.js" embed if the app is no longer used.
- Falsifiability: `grep -c bloggenauto.com` over re-exported article bodies = 0 (or every remaining anchor has rel="nofollow sponsored").
- Leading indicator: number of articles with the link (194 → 0); external-link report in GSC no longer lists bloggenauto.com.
- Effort: M
- Confidence: 0.95

### AUTHORITY-06 — 2,582 in-body links to primesupplements1.myshopify.com (incl. 534 /cart/ links) redirect, duplicate and waste internal equity
- Severity: High
- Evidence: `articles-all.json` totals: `myshopify_links` = 2,582 across 349 articles; `cart_links` = 534; split per catalog-analysis.md: 1,602 product, 534 /cart/, 446 collection links; every product link appears twice (primary domain + myshopify). `$R/pages/article.html` contains `primesupplements1.myshopify.com` 7 times. The myshopify host 301s to the primary domain (audit-context.md). `/cart` is disallowed in robots.txt, so 534 links point to a URL Googlebot may not fetch.
- Affected scope: 349/354 articles (698 URLs with /ro-hu).
- Why it matters for authority: internal PageRank flows through a 301 hop on 2,048 links and dead-ends on 534 /cart/ links; the duplicated anchors double link counts on each page (dilution); and the myshopify hostname is exposed as a brand string in anchors (see AUTHORITY-12). If the myshopify redirect ever changes (e.g. a store rename), 2,582 links break at once.
- Recommendation: in the same bulk pass as AUTHORITY-05: rewrite `https://primesupplements1.myshopify.com/products/<h>` → `/products/<h>`, `/collections/<h>` → `/collections/<h>`; replace `/cart/<variant>:1` add-to-cart links with the product URL (or drop them when the same product is already linked in the paragraph); then dedupe identical hrefs within a paragraph. Keep one link per product per section.
- Falsifiability: `sum(myshopify_links)` in a re-export = 0 and `cart_links` = 0.
- Leading indicator: Shopify "Online store → Links" crawl / Screaming Frog: 0 internal 301s from blog bodies.
- Effort: M
- Confidence: 0.95

### AUTHORITY-07 — The B2B store is an indexable second entity with a CUI-as-name, Shopify placeholder socials and a duplicate catalog
- Severity: Medium
- Evidence: `$R/pages/b2b.html`: Organization JSON-LD and `<meta>` name = `"PRIME SPORT SUPPLEMENTS SRL / 46260823"`; footer/social hrefs = `http://facebook.com/shopify`, `http://instagram.com/shopify`, `https://tiktok.com/@shopify`, `https://www.youtube.com/shopify` (theme defaults never replaced); 0 links back to primesupplements.ro; no noindex/canonical; `$R/pages/b2b-products-sitemap.xml` lists 58 product URLs with the same handles as the main store. All 24/24 parsed main-store pages link to b2b.primesupplements.ro (2 links each: "Inregistrare B2B", "Logare B2B") — a site-wide outbound to a duplicate catalog.
- Affected scope: the b2b host (58 products + collections) and every main-store page.
- Why it matters: any wholesale partner, distributor or price-list link naturally lands on the b2b host; the entity "PRIME SPORT SUPPLEMENTS SRL / 46260823" with Shopify's social profiles competes with "Prime Supplements" for the Knowledge Graph; Google can choose the b2b URL as canonical for duplicated product content (cross-domain duplicates are explicitly within its canonicalisation rules).
- Recommendation: (1) make the B2B store non-indexable: Shopify Admin (B2B store) → Online Store → Preferences → password protection, or add `<meta name="robots" content="noindex,nofollow">` in its layout and `Disallow: /` in a custom robots.txt.liquid; (2) rename the B2B store to "Prime Supplements B2B" and set its social settings to the real handles; (3) keep the main-store footer links to the B2B login (fine) but no need for both "Inregistrare" and "Logare" as separate external links on every page — one link to `/pages/inregistrare-b2b` on the main domain is enough.
- Falsifiability: `curl -I https://b2b.primesupplements.ro/` shows `X-Robots-Tag: noindex` or a password page; `site:b2b.primesupplements.ro` returns 0.
- Leading indicator: GSC coverage for the b2b property drops to 0 indexed; no b2b URLs chosen as canonical for main-store products (URL Inspection).
- Effort: S
- Confidence: 0.9

### AUTHORITY-08 — /ro-hu/ duplicate market splits every off-site signal between two URL sets
- Severity: Medium
- Evidence: sitemap has 575 URLs duplicated under /ro-hu/ (1,151 total); each /ro-hu page is self-canonical with hreflang ro / ro-HU / x-default and identical Romanian content and RON prices (`$R/pages/homepage-ro-hu.html`; audit-context.md). The social share buttons and any copied URL on a /ro-hu page carry the /ro-hu URL, so shares, mentions, reviews and backlinks can accrue to `/ro-hu/products/...` instead of `/products/...`.
- Affected scope: 575 duplicated URLs.
- Recommendation (authority angle; the technical specialist owns the dedupe): until Hungarian content exists, remove the Hungary market's web presence (Settings → Markets → Ungaria → Domains and languages → remove the /ro-hu subfolder) so the market resolves on the primary domain; Shopify will 301 /ro-hu/* → /* and consolidate all signals. If Hungary is kept, publish the hu locale with real translations and HUF before promoting it.
- Falsifiability: `curl -I https://primesupplements.ro/ro-hu/` → 301 to `/`; sitemap count 575.
- Leading indicator: GSC "Duplicate, Google chose different canonical" count → 0; all inbound links land on primary URLs.
- Effort: S
- Confidence: 0.85

### AUTHORITY-09 — 431 Judge.me reviews are invisible off-site: no public reviews page, no rich-snippet markup, no third-party review profiles
- Severity: Medium
- Evidence: `$R/home.html` carousel `data-number-of-reviews='431'`; product badges 44, 17, 14, 13, 9, 8, 7 reviews (`$R/pages/collection-all.html`); 12 of 40 homepage badges show `data-number-of-reviews='0'`. Public store page: `https://judge.me/reviews/stores/primesupplements.ro` → 404 "Not Found"; `https://judge.me/reviews/stores/primesupplements1.myshopify.com` → 404. Product pages: 0 occurrences of `jdgm-rich-snippet` / `aggregateRating` in `product-creatina-creapure.html` and `product.html` (the custom Product JSON-LD omits `aggregateRating`; Judge.me's rich-snippet block is not rendered). Trustpilot `trustpilot.com/review/primesupplements.ro` → 403 "Verifying Connection" (unverifiable, but no profile surfaced in search either). No Google Business Profile surfaced.
- Affected scope: 185 product pages + store entity.
- Recommendation: (1) Judge.me → Settings → "Reviews page" / enable the public Judge.me store page and "Rich snippets" (once the theme's Product JSON-LD is fixed, pass `aggregateRating` from `product.metafields.reviews.rating` / `rating_count`); (2) create a `/pages/recenzii` page with the Judge.me "All reviews" widget (the HTML already references `jdgm-all-reviews-page` — the page itself does not exist); (3) claim Trustpilot (free) and Google Business Profile; (4) send Judge.me reviews to Google Shopping via its product reviews feed. Reviews are the only third-party-corroborated asset the brand has; expose them.
- Falsifiability: Rich Results Test shows "Product snippets" with review stars on `creatina-creapure`; `judge.me/reviews/stores/...` returns 200.
- Leading indicator: number of product URLs with "Review snippets" valid in GSC enhancements; Trustpilot review count.
- Effort: S
- Confidence: 0.9

### AUTHORITY-10 — The expert author entity ("Marius Chera, Nutriționist Certificat") is uncorroborated, inconsistently marked up and has no author page
- Severity: Medium
- Evidence: bylines across 355 articles: "Marius Chera , Nutriționist Certificat" 325, "primesupplements1" 18, "Marius Chera" 10, "Sorin Cristea" 2 (catalog-analysis.md). Theme snippet `schema-article.liquid` outputs `"author": {"@type": "Organization", "name": "Prime Supplements"}` (seen in `$R/pages/article.html`, block invalid JSON) while the BlogGenAuto body JSON-LD outputs a `Person` in 344 articles → two conflicting author entities per page. The boilerplate bio ends with the bare URL `www.linkedin.com/in/chera23` (337 links) and claims "8" vs "10 NPC PRO Cards" and "15 ani" vs "18 ani" in different articles. /pages/despre-noi says "Marius Chera a conceput firma PRIME SUPPLEMENTS in anul 2022 … primul antrenor roman care a reusit sa antreneze sportivi care au obtinut cardul PRO din cadrul organizatiei NPC". Web search for "Marius Chera" / "chera23" (3 queries) surfaced nothing. `$R/shopify/pages.json` has 11 pages — none is an author page.
- Affected scope: 354 articles (E-E-A-T signal for the whole blog) + brand entity.
- Recommendation: (1) create `/pages/marius-chera` (author page) with Person JSON-LD: `name`, `jobTitle`, `worksFor` → `#organization`, `sameAs` [LinkedIn, Instagram, FRCF/NPC result pages, YouTube], credentials (certificate issuer, FRCF lecturer listing), photo; (2) fix `schema-article.liquid` to emit `"author": {"@type":"Person","name": {{ article.author | json }}, "url": "https://primesupplements.ro/pages/marius-chera"}` and strip the duplicate body JSON-LD; (3) normalise bylines (reassign the 18 "primesupplements1" articles; one spelling); (4) make one canonical bio with one set of facts; (5) obtain third-party corroboration: FRCF website mention, NPC/IFBB results pages naming the coached athletes, 2–3 interviews (these are the highest-value links a Romanian supplement brand can get).
- Falsifiability: Rich Results Test shows one Person author per article; a search for the author's name returns ≥ 3 independent pages.
- Leading indicator: Knowledge Graph entry for the author; independent mentions count.
- Effort: M
- Confidence: 0.85

### AUTHORITY-11 — Organization schema omits address, telephone, legalName and tax identifiers although the NAP is on every page
- Severity: Low
- Evidence: `schema-organization.liquid` has `contactPoint` with `contactType` and `availableLanguage: ["Romanian","Hungarian"]` but no `telephone`, no `address`, no `legalName`, no `taxID`/`vatID`, no `email`; the footer prints all of them (CUI 46260823, J32/1155/2022, 0775286584, Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A). "Hungarian" is claimed as an available language while the hu locale is unpublished. Address spelled "Cisnadie" (no diacritics) on-site; the registry form is "Cisnădie" — keep one form everywhere (schema + GBP + directories).
- Affected scope: all pages (one snippet).
- Recommendation: add to the Organization block:
  ```json
  "legalName": "PRIME SPORT SUPPLEMENTS SRL",
  "taxID": "46260823",
  "vatID": "RO46260823",
  "email": "contact@primesupplements.ro",
  "telephone": "+40775286584",
  "address": {"@type":"PostalAddress","streetAddress":"Str. Ioan Virgil Ispas Nr. 17A","addressLocality":"Cisnădie","addressRegion":"Sibiu","postalCode":"<fill>","addressCountry":"RO"},
  "contactPoint": {"@type":"ContactPoint","contactType":"customer service","telephone":"+40775286584","email":"contact@primesupplements.ro","availableLanguage":["Romanian"]}
  ```
  (confirm vatID applies; drop "Hungarian" until hu is published). Use the identical NAP string in GBP, Bing Places, compari.ro and marketplace profiles.
- Falsifiability: schema validator shows the fields; NAP string diff across listings = 0.
- Leading indicator: GBP verified; citations with identical NAP.
- Effort: S
- Confidence: 0.95

### AUTHORITY-12 — `foundingDate` 2020 in the Organization schema contradicts the registry (J32/1155/2022) and the About page ("in anul 2022")
- Severity: Low
- Evidence: `schema-organization.liquid`: `"foundingDate": "2020"`; footer/contact: registration number `J32/1155/2022`; `$R/pages/page-despre-noi.html`: "Marius Chera a conceput firma PRIME SUPPLEMENTS in anul 2022".
- Affected scope: all pages.
- Recommendation: set `"foundingDate": "2022"` (or the exact ONRC date, e.g. "2022-06-xx"), and keep one founding story on /pages/despre-noi.
- Falsifiability: all three sources state the same year.
- Leading indicator: none needed (one-line fix).
- Effort: S
- Confidence: 0.9

### AUTHORITY-13 — The myshopify handle "primesupplements1" leaks as a brand/author/vendor name
- Severity: Low
- Evidence: vendor = "primesupplements1" on 64/185 products (`products-all.json`), rendered ~25–36 times per product page and exposed at `/collections/vendors?q=primesupplements1`; article author "primesupplements1" on 18 articles; the string appears in 2,582 blog anchors (AUTHORITY-06). The B2B store name adds a third brand string ("PRIME SPORT SUPPLEMENTS SRL / 46260823").
- Affected scope: 64 products, 18 articles, 349 article bodies.
- Why it matters: entity resolution (Google/Bing/LLMs) sees three names for one brand; "primesupplements1" can surface as the brand in Shopping feeds and in AI answers.
- Recommendation: bulk-set vendor = "Prime Supplements" (supplements) / "MNX" (apparel, if MNX is a separate line), reassign the 18 articles to the real author, and apply AUTHORITY-06/07.
- Falsifiability: `grep -c primesupplements1` over exported products/articles = 0.
- Leading indicator: Merchant Center brand attribute; vendor facet.
- Effort: S
- Confidence: 0.95

### AUTHORITY-14 — Blog outbound profile is boilerplate: the same 7 foreign authority domains in 349 articles, no Romanian or EU regulatory sources, no local co-citation
- Severity: Low
- Evidence: `external_link_targets` totals (articles-all.json): linkedin.com 337, ncbi.nlm.nih.gov 327, healthline.com 276, mayoclinic.org 257, who.int 235, bloggenauto.com 194, fda.gov 67, webmd.com 66, wikipedia.org 20; total distinct external hosts across 355 articles ≈ 12. 0 links to efsa.europa.eu, ms.ro (notificare suplimente), ansvsa.ro, anad.gov.ro, frcf.ro or any Romanian publication. 6 articles have no external links; 24 parsed pages show no partner/press section; /pages/despre-noi names "furnizori de top" without naming any.
- Affected scope: 354 articles.
- Why it matters: a uniform generator-produced citation pattern is a scaled-content fingerprint, and the site never co-cites the Romanian entities (FRCF, ANAD, Ministerul Sănătății notification register) whose pages it should later be linked from.
- Recommendation: in the blog clean-up, add 1–2 Romanian/EU citations per article where a claim is regulatory (EFSA health claims register, ANSVSA/MS notification), link athletes/federation pages when named, and cut the LinkedIn link from the bio body (put it on the author page).
- Falsifiability: distinct external hosts across the blog > 30 and ≥ 1 Romanian/EU regulatory source in ≥ 50% of articles.
- Leading indicator: outbound-host diversity in a monthly export.
- Effort: M
- Confidence: 0.85

### AUTHORITY-15 — No link-earning assets: 354 templated articles, no author page, no tools, no data, no "parteneri"/press section
- Severity: Info
- Evidence: all content is product pages (185, median description 303 words for supplements, 0 for MNX), 23 collections with empty descriptions, and 354 BlogGenAuto articles with 2026-dated titles (279/355) and 47 cannibalising keyword groups (catalog-analysis.md). Branded ingredients with supplier-listing programmes appear in only 3 products (Creapure 1, KSM-66 1, Kyowa 1) and are not used as entity hooks. Homepage/About contain no partners, athletes, press logos or certifications section (grep for partener/sponsor/ambasador/NPC/IFBB in `$R/home.html`: 0 matches outside scripts).
- Affected scope: site-wide link strategy.
- Recommendation: build 3 assets in the next quarter: (a) "Suplimentele Prime notificate la Ministerul Sănătății" page listing each product's notification number (unique, citable, trust-building in RO); (b) a small data study from own catalog/orders ("Cât costă 1 g de creatină în România 2026: analiză 40 de produse") pitched to forbes.ro/revistabiz/capital.ro business desks; (c) athlete/coach pages for the NPC PRO card athletes trained by Marius Chera (each athlete links back from their socials/bios).
- Falsifiability: each asset gains ≥ 3 referring domains within 90 days (GSC Links).
- Leading indicator: referring domains per asset.
- Effort: L
- Confidence: 0.8

### AUTHORITY-16 — Minor outbound hygiene: site-wide WhatsApp link goes through a third-party shortener
- Severity: Info
- Evidence: 24/24 parsed pages link `https://wa.link/anvvmm` (Dondy WhatsApp widget) instead of `https://wa.me/40775286584`; the destination is not verifiable from the HTML and the number is not exposed to crawlers.
- Affected scope: all pages.
- Recommendation: configure the widget with the direct `wa.me` number (also exposes the NAP phone consistently).
- Falsifiability: footer href = wa.me URL.
- Leading indicator: none.
- Effort: S
- Confidence: 0.8

## Brand-mention inventory (what exists off-site, with URLs)

| Type | Found | Evidence |
|---|---|---|
| Directories / business registers | none surfaced | 2 queries incl. `"J32/1155/2022"`, `46260823` → other companies only |
| Price comparison / marketplaces (compari.ro, eMAG, OLX, Glovo) | none surfaced | competitor control: gymbeam.ro on compari.ro |
| Press / media | none surfaced | 15 queries |
| Forums / communities | none surfaced | — |
| Influencers / athletes | none surfaced | — |
| Review platforms | Judge.me on-site only (431 reviews); public page 404; Trustpilot unverifiable (403) | live checks |
| Social profiles (owned) | YouTube `@primesupplementsro` verified (200); TikTok `@primesupplements.ro` / `@primesupplements`, Facebook `/primesupplementsro` / `/primesupplements.ro`, Instagram `/primesupplements_ro/` unverifiable (login/JS) | live checks + `$R/home.html` |
| Wikipedia / Wikidata / Knowledge Graph | none | — |
| Supplier/brand listings (Creapure, KSM-66, Kyowa) | not found for this brand | 1 query |

## Risks (authority dilution / policy)
1. Scaled AI content with a visible generator footer link on 194 pages (AUTHORITY-05) — link-spam pattern + scaled-content-abuse exposure.
2. Three competing brand strings and two hostnames per product (main, /ro-hu, b2b) — entity and canonical dilution (AUTHORITY-07, -08, -13).
3. 2,582 redirecting/dead-end internal links (AUTHORITY-06).
4. Zero external corroboration of the author's credentials while the whole blog leans on them (AUTHORITY-10).
5. No measurement: a negative-SEO or scraper-link spike would go unnoticed (AUTHORITY-04).

## Prioritised link / mention plan (Romanian sports-supplement brand)

P0 — hygiene before outreach (week 1, S/M effort): fix `sameAs` + Organization fields + foundingDate (03, 11, 12); strip BlogGenAuto links and rewrite myshopify/cart links (05, 06); noindex B2B and remove /ro-hu presence (07, 08); enable Judge.me public page + rich snippets (09); verify GSC + Bing WMT + Moz key (04); author page + Person schema (10).

P1 — citations and owned profiles (weeks 2–4): Google Business Profile + Bing Places for the Cisnădie office (same NAP string); compari.ro store registration (+ shopmania.ro / price.ro feeds); eMAG marketplace seller + brand page (GTINs exist for 188/395 variants); Trustpilot claim; LinkedIn company page; supplier programmes — Creapure licensed-brand listing (AlzChem, 6-digit seal code on the tub), KSM-66 and Kyowa brand-partner pages; FRCF: lecturer/partner listing for Marius Chera.

P2 — earned media and partnerships (months 2–3): athlete pages for the NPC PRO card athletes + reciprocal bios; sponsor one FRCF/NPC regional event (sponsor page link + local Sibiu press: verify current outlets such as Turnul Sfatului, Tribuna, Sibiu 100%); founder story pitches to forbes.ro / revistabiz.ro / capital.ro (gymbeam's footprint shows these desks cover the category); 5–10 Romanian fitness YouTubers/TikTokers (heepsy.com/es/top-youtube/fitness/romania surfaced as a list source) with product seeding and a tracked landing page; expert quotes for health desks (csid.ro, doc.ro — verify) using the certified-nutritionist credential.

P3 — assets and monitoring (quarter 2): the three link-earning assets in AUTHORITY-15; monthly GSC/Bing/Moz export; Google Alerts for brand strings; re-run `/seo backlinks primesupplements.ro` with Moz configured; no disavow needed (no toxic inbound known).

## Limitations
- Backlink metrics: Common Crawl only (domain absent) → no referring-domain, anchor, toxicity, velocity or follow-ratio data; Backlink Health Score is Not Assessed by rule (validator PASS).
- WebSearch engine is US-centric and ignored `site:`/exact-match operators; Romanian directories, GBP and marketplaces may list the company without being surfaced. Treat "0 mentions" as "0 surfaced in 15 queries".
- Facebook/Instagram/TikTok/Trustpilot pages are login- or bot-walled (`unverifiable_js`); only YouTube was verified.
- Counts for 194 BlogGenAuto links, 2,582 myshopify links and 534 cart links were re-verified from `articles-all.json`; per-type split (1,602/534/446) is from catalog-analysis.md.
- No live requests were made to the store; all on-site evidence is from local copies dated 2026-10-12.
