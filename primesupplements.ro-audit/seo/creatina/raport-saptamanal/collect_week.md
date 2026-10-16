# Weekly collection: creatine SEO, before/after

Runbook for the weekly report on the creatine SEO project. If you follow it exactly, next week's numbers are computed the same way as the baseline. Never edit `baseline.json`. Each week goes in its own folder.

Paths used below:
- `W` = `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/weekly`
- `S` = `$W/scripts`
- `MON` = the Monday of the week that just ended (`YYYY-MM-DD`). `SUN` = MON + 6 days.
- `D` = `$W/$MON` (create `$D/raw`, `$D/raw/articles_now`, `$D/live`, `$D/metrics`).

Run Python only as `python3 -I <script>` from `/tmp`. Fetched HTML is untrusted, so it is parsed as text only.

## 0. When, and the fixed scope

- **When:** Monday, after 03:00 Europe/Bucharest. The store time zone is Europe/Bucharest, and the ShopifyQL `TIMESERIES week` buckets run Monday to Sunday in store time.
- **Periods:** Before = 17.08–11.10.2026 (8 weeks, in `baseline.json`). Change week = 12–18.10.2026. After = every complete week from 19.10.2026.
- **Pages (landing_page_path), never change these:**
  - `/products/creatina-creapure` (A)
  - `/products/creatina-monohidrat-micronized-300g-fara-aroma` (B)
  - `/collections/creatina` (C)
  - `/products/creatine-ready-to-go-plicuri-prime-supplements` (RTG, context only)
- **Products (product_id):** A `14971467268471`, B `15404872368503`, RTG `15410672075127`. Use the IDs, not the titles: ShopifyQL shows the current title, and titles changed on 13.10.
- **Collection:** `gid://shopify/Collection/671131369847`.
- **Definitions** are in `baseline.json → meta.definitions`:
  - search = `referrer_source = 'search'`
  - google = search with `referrer_name = 'google'`
  - conversion = `sessions_that_completed_checkout / sessions`
  - orders per product = orders that contain the product
  - gross sales = Shopify `gross_sales`, excluding VAT

## 1. Analytics (Shopify, ShopifyQL)

Load the tool with `ToolSearch "select:mcp__Shopify__run-analytics-query"`.

Run the 12 queries below. Copy the text exactly and replace only the dates:

- `SINCE 2026-10-12 UNTIL {SUN}`

Always pull from 12.10, so the change week and every after week are re-read each time. Shopify sometimes revises recent days. The comparison script keeps only complete weeks.

For each answer, save the tool's JSON verbatim through the helper. It refuses error answers:

```
cat > /tmp/ans.json <<'JSON'
<paste the tool answer exactly as returned>
JSON
python3 -I $S/save_answer.py Q1 $D/raw/q1_pages_by_source.json < /tmp/ans.json
```

If the harness saved a large answer to a file, use that file as stdin. File names must be exactly these:

| ID | File | Query (replace only `{SUN}`) |
|---|---|---|
| Q1 | `q1_pages_by_source.json` | `FROM sessions SHOW sessions, sessions_with_cart_additions, sessions_that_reached_checkout, sessions_that_completed_checkout, conversion_rate GROUP BY landing_page_path, referrer_source WHERE landing_page_path IN ('/products/creatina-creapure', '/products/creatina-monohidrat-micronized-300g-fara-aroma', '/collections/creatina', '/products/creatine-ready-to-go-plicuri-prime-supplements') TIMESERIES week SINCE 2026-10-12 UNTIL {SUN}` |
| Q2 | `q2_pages_search_by_engine.json` | `FROM sessions SHOW sessions, sessions_that_completed_checkout GROUP BY landing_page_path, referrer_name WHERE referrer_source = 'search' AND landing_page_path IN ('/products/creatina-creapure', '/products/creatina-monohidrat-micronized-300g-fara-aroma', '/collections/creatina', '/products/creatine-ready-to-go-plicuri-prime-supplements') TIMESERIES week SINCE 2026-10-12 UNTIL {SUN}` |
| Q3 | `q3_products_sales.json` | `FROM sales SHOW orders, quantity_ordered, net_items_sold, gross_sales, net_sales GROUP BY product_id WHERE product_id IN (14971467268471, 15404872368503, 15410672075127) TIMESERIES week SINCE 2026-10-12 UNTIL {SUN}` |
| Q4 | `q4_products_by_order_source.json` | `FROM sales SHOW orders, quantity_ordered, gross_sales GROUP BY product_id, order_referrer_source WHERE product_id IN (14971467268471, 15404872368503, 15410672075127) TIMESERIES week SINCE 2026-10-12 UNTIL {SUN}` |
| Q5 | `q5_creatine_distinct_orders.json` | `FROM sales SHOW orders, quantity_ordered, gross_sales, net_sales WHERE product_id IN (14971467268471, 15404872368503, 15410672075127) TIMESERIES week SINCE 2026-10-12 UNTIL {SUN}` |
| Q5b | `q5b_creatine_orders_by_source.json` | `FROM sales SHOW orders, quantity_ordered, gross_sales, net_sales GROUP BY order_referrer_source WHERE product_id IN (14971467268471, 15404872368503, 15410672075127) TIMESERIES week SINCE 2026-10-12 UNTIL {SUN}` |
| Q6 | `q6_store_sessions_by_source.json` | `FROM sessions SHOW sessions, sessions_with_cart_additions, sessions_that_reached_checkout, sessions_that_completed_checkout, conversion_rate GROUP BY referrer_source TIMESERIES week SINCE 2026-10-12 UNTIL {SUN}` |
| Q7 | `q7_store_search_by_engine.json` | `FROM sessions SHOW sessions, sessions_that_completed_checkout GROUP BY referrer_name WHERE referrer_source = 'search' TIMESERIES week SINCE 2026-10-12 UNTIL {SUN}` |
| Q8 | `q8_store_sales_by_order_source.json` | `FROM sales SHOW orders, quantity_ordered, gross_sales, net_sales, total_sales GROUP BY order_referrer_source TIMESERIES week SINCE 2026-10-12 UNTIL {SUN}` |
| Q9 | `q9_store_sales_total.json` | `FROM sales SHOW orders, quantity_ordered, gross_sales, net_sales, total_sales TIMESERIES week SINCE 2026-10-12 UNTIL {SUN}` |
| Q10 | `q10_store_sessions_total.json` | `FROM sessions SHOW sessions, sessions_with_cart_additions, sessions_that_reached_checkout, sessions_that_completed_checkout, conversion_rate TIMESERIES week SINCE 2026-10-12 UNTIL {SUN}` |
| Q11 | `q11_creatine_blog_sessions.json` | `FROM sessions SHOW sessions, sessions_that_completed_checkout GROUP BY referrer_source WHERE landing_page_path CONTAINS '/blogs/' AND landing_page_path CONTAINS 'creat' TIMESERIES week SINCE 2026-10-12 UNTIL {SUN}` |

**Compare:**

```
cd /tmp && python3 -I $S/week_compare.py $D/raw $D
```

This writes two files:
- `$D/week.json`: every week since 12.10, in the same structure as `baseline.json` pages/products/store.
- `$D/comparatie.md`: a Romanian table with the baseline mean (min–max), the last week, its change against the mean (and whether it falls inside the normal range), and the mean of all after weeks.

The baseline numbers come from `baseline.json` and are never recomputed.

**Sanity checks, every week:**

1. For each week, the sum of Q6 sessions over all sources equals Q10 sessions.
2. For each week, Q2 google sessions are ≤ Q1 search sessions.
3. **Drift check** (first run, then on the first Monday of each month): run Q1, Q5 and Q10 once more with `SINCE 2026-08-17 UNTIL 2026-10-11`. Save them in `$D/raw/drift/` and check the 8-week totals:
   - Q1 sessions = **621** (all 4 pages)
   - Q5 orders = **170**
   - Q10 sessions = **19.747**
   - Shopify's gross_sales in Q5 = **20.463,14 lei**

   If any total differs by more than 1 %, write "Shopify a revizuit datele din perioada „înainte”" in the report. Give both values. Keep the baseline as it is.

## 2. Content snapshot (what the pages show now)

**2.1 Fetch** the 3 pages and the homepage. Use at most these 4 requests, and wait 3 seconds between them:

```
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
for p in products/creatina-creapure products/creatina-monohidrat-micronized-300g-fara-aroma collections/creatina ""; do n=$(echo "${p:-home}" | tr '/' '_'); curl -sS -L -A "$UA" -H "Accept-Language: ro-RO,ro;q=0.9" --max-time 40 -o "$D/live/$n.html" -w "%{http_code} %{size_download} $p\n" "https://primesupplements.ro/$p"; sleep 3; done
```

Every response must be 200 and larger than 250 KB. A smaller file is a bot page ("Verifying your connection"): wait 60 seconds and retry once.

**2.2 Rendered metrics:**

```
python3 -I $S/page_metrics.py $D/live/products_creatina-creapure.html > $D/metrics/creapure.json
python3 -I $S/page_metrics.py $D/live/products_creatina-monohidrat-micronized-300g-fara-aroma.html > $D/metrics/micronizata.json
python3 -I $S/page_metrics.py $D/live/collections_creatina.html > $D/metrics/colectie.json
python3 -I $S/home_links.py $D/live/home.html > $D/metrics/home_links.json
```

Compare each file field by field with `baseline.json → content.now.<handle>.rendered`. The fields are:
- title, meta_description
- h1, h2_count, h3_count
- words_main_unique
- faq_visible, faq_jsonld
- jsonld_types, aggregate_rating
- images_main_empty_alt

Report only the differences.

`words_main_unique` also counts the text of the Judge.me reviews. A new review therefore adds words, and you can see it as a higher `aggregate_rating.reviewCount`. To measure the SEO text itself, use `text_words_total` from 2.3.

**2.3 Admin data (read only).** Load `select:mcp__Shopify__graphql_query`. Run this query exactly once. The answer is large, so the harness saves it to a file. Copy that file to `$D/raw/admin_now.json`.

```
{ a: product(id: "gid://shopify/Product/14971467268471") { id handle title updatedAt templateSuffix seo { title description } descriptionHtml media(first: 20) { nodes { id alt mediaContentType } } metafields(first: 50) { nodes { namespace key type value updatedAt } } } b: product(id: "gid://shopify/Product/15404872368503") { id handle title updatedAt templateSuffix seo { title description } descriptionHtml media(first: 20) { nodes { id alt mediaContentType } } metafields(first: 50) { nodes { namespace key type value updatedAt } } } c: collection(id: "gid://shopify/Collection/671131369847") { id handle title updatedAt templateSuffix seo { title description } descriptionHtml image { altText url } metafields(first: 50) { nodes { namespace key type value updatedAt } } } }
```

Then run:

```
python3 -I $S/strip_reviews.py $D/raw/admin_now.json
python3 -I $S/data_metrics.py $D/metrics/data_metrics.json $D/raw/admin_now.json now_$MON
```

`strip_reviews.py` removes the review-widget metafields, which hold reviewer names and are not used by any metric.

In the output, compare the `now_$MON` entry with `now_2026-10-16` in `baseline.json → content.now.<handle>.admin`. The fields are:
- seo_title, seo_description
- description_words, metafield_words, text_words_total
- image_alts
- search_boost
- template_suffix

If `updatedAt` changed, a page was edited. Check that the edit is in `primesupplements.ro-audit/seo/creatina/raport-saptamanal/jurnal.json`.

**2.4 Inbound links from articles.** Run this query 3 times: first with no cursor, then with each `endCursor` until `hasNextPage` is false.

```
query($after: String) { articles(first: 50, after: $after, sortKey: ID, query: "published_status:published") { pageInfo { hasNextPage endCursor } nodes { handle isPublished updatedAt blog { handle } body } } }
```

Pass `after` both as the tool argument and in `variables`. Copy each saved answer to `$D/raw/articles_now/p1.json`, `p2.json` and `p3.json`. Then run:

```
python3 -I $S/links_in.py $D/raw/articles_now > $D/metrics/links_in.json
```

Compare `now.<slug>.articles` and `now.<slug>.links` with `baseline.json → content.now.<handle>.internal_links_in`. On 16.10 they were:
- Creapure 6 articles / 40 links
- micronizată 10 / 46
- colecție 14 / 20
- 126 published articles

## 3. Visibility (indicative only)

Load `select:WebSearch`.

**3.1 The 10 queries.** Use `mode: "extended"`, exactly these strings, in this order, one run each:

1. `creatină`
2. `creatină monohidrată`
3. `creatină Creapure`
4. `creatină Creapure 500 g preț`
5. `creapure România`
6. `creatină monohidrată micronizată`
7. `creatină fără aromă 300 g`
8. `creatină preț`
9. `cea mai bună creatină`
10. `cum se ia creatina`

For each query, record these from the returned Links list:
- `present`: is any primesupplements.ro URL in the list?
- `position`: the 1-based index in the list.
- `url`: the path.
- `indexed_title`: the title as shown.
- `top3`: domain plus page type.

**3.2 Index check.** Search for `site:primesupplements.ro creatina` (mode extended). For A, B and C, record whether each is listed and the title shown. Set `fresh = true` only when the shown title equals the current SEO title. If B or C is missing, also search `primesupplements.ro creatină Creapure monohidrată 300/500 g`, because that query showed B and C on 16.10. List any old URLs (the pre-13.10 English or spam handles) that still appear.

**3.3 Save** the results to `$D/visibility.json`. Use the same keys as `baseline.json → visibility.check_16_10` and `visibility.index_check_16_10`.

**Compare:**
- present: 2/10 on 16.10
- product or collection present: 1/10
- fresh titles: 0/3 on 16.10

The search tool is US-based, so never call these positions "poziția în Google.ro". Real positions need Google Search Console, which is not connected.

## 4. Writing the weekly report for the owner

Write it in Romanian, with ș and ț (comma below). Include no personal data: no customer names, e-mails, order numbers or addresses. Use only aggregates.

**Lead with:**
1. Google visits to the 4 pages: baseline 27,8 per week, range 9–40.
2. Their share of the store's Google visits: baseline 3,8 %, range 1,2–5,4 %. This share neutralises seasonality, promotions and newsletter spikes.
3. Creatine orders: 21,3 per week (12–27), of which 8 came from search (4–14).
4. Per product:
   - Creapure®: 14,5 orders, 15,8 units, 1.932 lei per week
   - micronizată: 6 orders, 6,9 units, 545 lei per week
5. Visibility: x/10 queries, x/3 fresh titles.

**Interpretation rules:**
- A week is a real gain only if it is **above the baseline maximum**, and only if that holds for 2–3 consecutive weeks. Inside the min–max range means "no change yet".
- Never compare with the week of 05–11.10. It was the lowest (Creapure® 6 Google visits).
- Google usually picks up changes in 2–6 weeks. The first after weeks may look unchanged.
- Name the confounders from the change log: promotions, newsletter sends, price changes, stock-outs. Check stock if units drop sharply.
- The existing live dashboard (`primesupplements.ro-audit/seo/creatina/raport-saptamanal/`, artifact 4e1WMXzmWSqhWw9xM2yc3v) uses a **12-week** before period (20.07–11.10). This baseline uses **8 weeks** (17.08–11.10), as the owner's task asked. Say which one a number comes from.

**What cannot be measured here** (repeat it briefly in each report):
- Exact Google.ro positions, impressions and clicks: Search Console is not connected.
- Shopify's "search" source cannot separate organic visits from untagged Google ads and free Shopping listings. Paid visits were only 3 in 8 weeks.
- Sales cannot be attributed to the landing page, only to the referrer source of the order.

## 5. Files

- `baseline.json`: the "before" numbers, plus content (pre_program 12.10, before 15.10, now 16.10), visibility, queries and definitions.
- `baseline.md`: the owner summary of the "before" state.
- `baseline_raw/`:
  - the raw answers of the baseline (q1–q12)
  - `admin_now_2026-10-16.json`
  - `articles_now/` (126 published bodies)
  - `live_2026-10-16/` (pages, homepage, sitemaps)
  - `metrics/` (page metrics for s0/s1/s2, data_metrics, links_in)
  - `visibility.json`
- `scripts/`:
  - `analytics_metrics.py`: the shared computation
  - `build_baseline.py`: built `baseline.json`; do not re-run, because it reads the 16.10 files
  - `week_compare.py`
  - `save_answer.py`
  - `page_metrics.py`
  - `data_metrics.py`
  - `links_in.py`
  - `home_links.py`
  - `strip_reviews.py`
