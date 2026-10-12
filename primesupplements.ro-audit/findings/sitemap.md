# Sitemap audit: primesupplements.ro (key: sitemap) — DRAFT (first pass)

## Scope & method
Checked: sitemap index + 13 child sitemaps (local copies $R/sitemaps/child0..12.xml, all-urls.txt), robots.txt (live), catalog coverage vs $R/shopify/products-all.json, articles-all.json, pages.json; image entries; lastmod/changefreq; /ro-hu/ tree; B2B store sitemap; live status of key URLs (11 throttled curl requests).
Draft written after first analysis pass; final version follows.

## Score
52/100 (draft)

## Findings (draft list)
- SITEMAP-01 /ro-hu/ duplicate tree: 575 of 1151 URLs (High)
- SITEMAP-02 product lastmod equals request time (185 identical values, change on every fetch) (Medium)
- SITEMAP-03 collection lastmod bulk-refreshed (21/23 identical to the second) (Low)
- SITEMAP-04 utility collections all / cele-mai-vandute / lansate-recent / 11-tva / frontpage in sitemap (Medium)
- SITEMAP-05 empty Reduceri collection in sitemap (Medium)
- SITEMAP-06 thank-you page in sitemap (Medium)
- SITEMAP-07 image entries: featured image only (185/493), deprecated empty captions (Low)
- SITEMAP-08 changefreq on all 1151 URLs (Info)
- SITEMAP-09 index without lastmod (Info)
- SITEMAP-10 empty metaobject sitemaps (Info)
- SITEMAP-11 agentic discovery sitemap lists generic agents.md (Info)
- SITEMAP-12 diacritic handles: sitemap uses %C8%99 uppercase, canonical lowercase (Low)
- SITEMAP-13 30 out-of-stock products in sitemap (Low)
- SITEMAP-14 B2B store sitemap duplicates 52 product handles (High)
- SITEMAP-15 354 machine-generated articles pass through sitemap unfiltered (Medium)
