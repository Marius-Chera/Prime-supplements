# On-Page SEO findings: primesupplements.ro (key: onpage) — DRAFT v1 (will be overwritten)

## Scope & method
Checked: title/meta/H1/heading hierarchy/canonical/OG/Twitter/hreflang/internal links/anchor text/pagination/language consistency across the whole catalog (185 products, 23 collections, 354 articles, 11 pages) using $R/shopify/products-all.json, articles-all.json, articles-p1..p8.json (body HTML), pages.json, catalog-analysis.md, the 24 parsed pages in $R/parsed/*.json, theme sources in $R/theme/, local HTML in $R/pages/. Scripts: metadata_template.py on 6 pairs; 5 throttled live requests (collections/all?page=2, blogs/news?page=2, 3 article pages). Could not check: article SEO title/description fields are not in the export (pending GraphQL read), Search Console CTR data, rendered DOM.

## Score
38/100 (draft)

## Findings (draft; full versions with evidence, scope, fix, falsifiability, leading indicator, effort and confidence in the final file)
- ONPAGE-01 High: 105/185 products without SEO title (16 supplements, 89 MNX) → <title> = raw product name.
- ONPAGE-02 High: 104/185 products without SEO description; 79 have no meta at all (empty description), 12 fall back to dosage text, 13 to other body text.
- ONPAGE-03 High: title template has no brand suffix; brand inconsistent (| PRIME Supplements 16, | PrimeSupplements 15, | Prime Supplements 1).
- ONPAGE-04 Medium: 47 SEO titles > 60 chars; 16 effective titles < 25 chars; 17 raw titles > 60 (Frutilu up to 122) remain as H1.
- ONPAGE-05 Medium: 35 metas > 160; templated "Descoperiți … Alegeți PRIME Supplements …" (40/36); 2 duplicate metas.
- ONPAGE-06 High: H1 = product.title: 100 English-worded H1s, 78 ", colour" suffixes, 14 "500g/83 serv" H1s, 2 H1s on creatina-monohidrat page, English H1 vs Romanian title (Creapure, Monohydrate).
- ONPAGE-07 Medium: diacritics inconsistency (22 ASCII-Romanian titles, "Pudra proteica" title vs "Pudre Proteice" H1, homepage meta without diacritics).
- ONPAGE-08 High: homepage title "Prime Supplements - Hardcore Sports Nutrition", 216-char meta, H1 is the logo, English H2.
- ONPAGE-09 High: 9/23 collections without SEO title/meta, "All Products"/"11% TVA"/"Reduceri (0 products)" indexable, 22/23 empty descriptions.
- ONPAGE-10 Medium: collection H1/title mismatch, og:title from collection.title, thin collections (1-3 products).
- ONPAGE-11 High: article titles 321/354 > 60 chars, 279 with "2026", SEO titles truncated at 70 chars with English/French fragments.
- ONPAGE-12 Medium: 26 articles with a second H1 in body; 352 start with English "Published: …" line.
- ONPAGE-13 High: blog discoverability: 11/page, 33 pages, prev/next-only pagination, same 3 articles linked site-wide, 21 articles with zero inbound article links.
- ONPAGE-14 High: 2582 links to primesupplements1.myshopify.com in 349 articles; 194 dofollow BlogGenAuto links.
- ONPAGE-15 Medium: empty/generic anchors (44 empty on home, 28 on collection pages, "Vezi toate" x8).
- ONPAGE-16 Medium: no visible breadcrumbs on any template.
- ONPAGE-17 Low: image alt 493/493 missing in Admin; twitter:image:alt empty.
- ONPAGE-18 Low: og:image http, twitter:card summary, og:title ≠ <title>, twitter:description = dosage text.
- ONPAGE-19 Low: paginated titles "All Products – Pagina 2".
- ONPAGE-20 Medium: untranslated English strings on lang="ro" pages.
- ONPAGE-21 Low: typos in headings ("placã", "Ghida Completa", "Ocasii", "Protéine").
- ONPAGE-22 Medium: 11/11 store pages without SEO fields; 3/3 section-built pages without H1; "Thank you" indexable.
- ONPAGE-23 Low: blog index "Ultimele articole", no meta.
- ONPAGE-24 Info: /ro-hu duplicates every title/meta/H1 (international owns).
- ONPAGE-25 Low: vendor "primesupplements1" visible in product HTML / author on 18 articles.
- ONPAGE-26 Low: 19 near-duplicate title groups / 45 products.

## Limitations
Draft; see final version.
