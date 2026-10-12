# Legacy WooCommerce/WordPress redirect plan: primesupplements.ro (SXO-04)

Date: 2026-10-12. Read-only planning: no Shopify mutations were run. The live site got 11 GET requests, 2 s apart, with the Chrome 130 UA, and no redirects were followed.

Deliverable: `legacy-redirects.csv` (header `Redirect from,Redirect to`) has **35 data rows**. That is 13 legacy paths, each with its trailing-slash variant (26 rows), plus 9 dead Shopify product URLs.
It can be imported in Shopify Admin > Online Store > Navigation > URL redirects > Import. Every row's "from" path was verified as **not** already in the Shopify redirect table, and every target was checked against the current product, collection and page handles.

## 1. Sources

| Source | What it gave |
|---|---|
| `findings/sxo.md` SXO-04 (and the `site:` table on line 56; live verification on line 60) | SERP URLs: `www.primesupplements.ro/categorie-produs/suplimente/`, `/categorie-produs/suplimente/?v=1eb2628f4187`, `/categorie-produs/suplimente/vitamine-si-minerale`, `/collections/suplimente-pre-workout?v=1eb2628f4187`. The www URL takes 3 hops to reach content. |
| `findings/local.md` LOCAL-03 | The footer address links to `https://www.primesupplements.ro/cart/#` on every page. That is a www hop, not a missing path. |
| `findings/*.md` grep for `?v=` | The other hits are Shopify CDN asset versions (`/cdn/shop/...?v=`), which are not legacy URLs. |
| `scratchpad/recon/shopify/articles-p1.json` (article `glycerolul-secretul-culturistilor-profesionisti-pentru-un-antrenament-eficient`) | An in-body link to `https://www.primesupplements.ro/produs/glycerol-max-pump-500g-125-serv/?customize_changeset_uuid=`. This is a WordPress customizer leftover. |
| `scratchpad/geo-live/yt.html` (YouTube search results) | Video descriptions link to `https://www.primesupplements.ro/categorie-produs/suplimente/`. |
| `scratchpad/recon/backlinks/` | Empty. No backlink export exists. |
| `scratchpad/recon/parsed/`, `recon/pages/` | No `categorie-produs` or `/produs/` references. |
| **Shopify Admin `urlRedirects` (read-only GraphQL)** | The existing redirect table: 171 non-`/ro-hu` rules. Snapshot saved in `plan/legacy-work/existing-redirects.json`. |
| Shopify Admin `products(query: handle:...)` (read-only) | Status of the 10 handles that existing redirects point to but that are missing from `products-all.json`. |
| `recon/shopify/products-all.json` (185 products), `applied/collections-plan.json` (23 collections), `recon/shopify/pages.json` (11 pages) | The set of valid targets. |
| Wayback Machine CDX (`web.archive.org`) | **Unreachable** from this sandbox (connection reset at the egress proxy, twice in this session). There is no archived URL inventory, so the full WooCommerce URL list is still unknown. |

### Existing redirect table (what is already covered)
- `/produs/<h>` -> `/products/<h>` and root `/<h>` -> `/products/<h>` for 71 WooCommerce product slugs (142 rules). This covers all 61 products created in Shopify on migration day (2025-05-05). The chromium product is covered via its old handle.
- 17 `/categorie-produs/...` rules: 14 flat, plus nested `/categorie-produs/suplimente/{aminoacizi-suplimente,creatina,vitamine-si-minerale}`.
- 9 `/collections/<old>` -> `/collections/<new>` rules from collection handle renames, and 3 `/products/<old>` -> `/products/<new>` rules.
- **Trailing slash:** the table stores slash-less paths, yet `/produs/glycerol-max-pump-500g-125-serv/` and `/categorie-produs/suplimente/` both return 301 live. Shopify therefore matches a trailing-slash request against the slash-less rule.

## 2. Live checks (2026-10-12, `https://primesupplements.ro`, not following redirects)

| Path | Result |
|---|---|
| `/magazin/` | 404 |
| `/cos/` | 404 |
| `/contul-meu/` | 404 |
| `/finalizare-comanda/` | 404 |
| `/despre-noi/` | 404 |
| `/termeni-si-conditii/` | 404 |
| `/blog/` | 404 |
| `/glycerolul-secretul-culturistilor-profesionisti-pentru-un-antrenament-eficient/` (possible WP post slug at the root) | 404 |
| `/categorie-produs/suplimente/pudre-proteice/` (nested variant missing from the table) | 404 |
| `/products/baton-proteic-alune-si-caramel` (target of an existing `/produs/` rule) | 404 |
| `/produs/glycerol-max-pump-500g-125-serv/` | 301 -> `/products/glycerol-max-pump-500g-125-serv` (already redirected; excluded) |

SXO-04 already verified the other already-redirected cases (`/categorie-produs/suplimente/`, `/categorie-produs/suplimente/vitamine-si-minerale`). They are excluded from the CSV. Raw output: `plan/legacy-work/live-check.tsv`.

## 3. Mapping logic and the rows in the CSV

1. **WooCommerce system pages** (Romanian WooCommerce default slugs, consistent with the store's `/produs/` and `/categorie-produs/` bases; all 4 are live 404):
   - `/magazin` (shop) -> `/collections/all`
   - `/cos` (cart) -> `/cart`
   - `/contul-meu` (my account) -> `/account`
   - `/finalizare-comanda` (checkout) -> `/cart`. A Shopify checkout cannot be entered without a cart, so it goes to the cart.
2. **WordPress static pages at the root -> `/pages/<handle>`**. The Shopify pages were copied from the WP site; the policy pages still say "www.primesupplements.ro". WordPress builds slugs from the title and strips diacritics.
   - Mapped: `despre-noi`, `contact`, `termeni-si-conditii`, `politica-de-confidentialitate`, `politica-de-cookies`, `politica-de-livrare`, `politica-de-plata`, `politica-de-retur`.
   - The terms page's Shopify handle contains diacritics. Its target uses the percent-encoded form that the live footer and sitemap use: `/pages/termeni-%C8%99i-condi%C8%9Bii`.
3. **Blog index:** `/blog` -> `/blogs/news` (live 404).
4. **Dead Shopify-era product URLs.** Existing `/produs/<h>` and `/<h>` rules point to these, but each returns 404 today. Mapped to the closest category collection, because no equivalent product is live:
   - 4 discontinued protein-bar flavours (DRAFT): `baton-proteic-alune-si-caramel`, `-ciocolata-caramel`, `-ciocolata-portocale`, `-lamaie-fructe-de-padure` -> `/collections/batoane-proteice`
   - `blender-prime-bottle` (DRAFT shaker) -> `/collections/accesorii-sala`
   - `maiou-basic-prime`, `t-shirt-body-tight`, `tricou-femei-basic-alb`, `tricou-femei-basic-negru` (deleted) -> `/collections/echipament-sala`
   - `liver-protect-500-ml` is UNLISTED but still served, so it needs no redirect.
   - Shopify applies a URL redirect only when the path would 404. If a draft product is republished, its page wins automatically.
5. **Trailing slash:** each legacy WooCommerce/WordPress path (groups 1-3) has a second row with the trailing slash, as requested. The live tests above show Shopify already matches `/x/` against a `/x` rule. If the import reports the slash rows as duplicates, skip them; nothing is lost. Shopify-era `/products/...` URLs never had a trailing slash, so they have one row each.

## 4. Existing redirects to repoint (not in the CSV, because these paths are already redirected)

These 30 existing rules create a 2-hop chain (12 rules) or end on a 404 (18 rules). To fix them, re-import this block with **"Overwrite existing redirects that have the same path"** ticked, or edit each one in Admin. Importing `legacy-redirects.csv` alone already makes the 18 dead ends resolve, but in 2 hops. This block makes everything 1 hop. It also fixes the SERP and YouTube URL `/categorie-produs/suplimente/`, which currently goes `-> /collections/suplimente -> /collections/suplimente-sala`.

```csv
Redirect from,Redirect to
/categorie-produs/suplimente,/collections/suplimente-sala
/categorie-produs/suplimente/aminoacizi-suplimente,/collections/aminoacizi
/categorie-produs/accesorii,/collections/accesorii-sala
/categorie-produs/aminoacizi-suplimente,/collections/aminoacizi
/categorie-produs/arzatoare-de-grasimi,/collections/arzator-de-grasimi
/categorie-produs/imbracaminte,/collections/echipament-sala
/categorie-produs/intra-workout,/collections/suplimente-intra-workout
/categorie-produs/pre-workout,/collections/suplimente-pre-workout
/categorie-produs/pudre-proteice,/collections/pudra-proteica
/categorie-produs/shoturi,/collections/shot-pre-workout
/chromium-picolinate-80-caps,/products/supliment-alimentar-chromium-picolinate-80-caps
/produs/chromium-picolinate-80-caps,/products/supliment-alimentar-chromium-picolinate-80-caps
/baton-proteic-alune-si-caramel,/collections/batoane-proteice
/produs/baton-proteic-alune-si-caramel,/collections/batoane-proteice
/baton-proteic-ciocolata-caramel,/collections/batoane-proteice
/produs/baton-proteic-ciocolata-caramel,/collections/batoane-proteice
/baton-proteic-ciocolata-portocale,/collections/batoane-proteice
/produs/baton-proteic-ciocolata-portocale,/collections/batoane-proteice
/baton-proteic-lamaie-fructe-de-padure,/collections/batoane-proteice
/produs/baton-proteic-lamaie-fructe-de-padure,/collections/batoane-proteice
/blender-prime-bottle,/collections/accesorii-sala
/produs/blender-prime-bottle,/collections/accesorii-sala
/maiou-basic-prime,/collections/echipament-sala
/produs/maiou-basic-prime,/collections/echipament-sala
/t-shirt-body-tight,/collections/echipament-sala
/produs/t-shirt-body-tight,/collections/echipament-sala
/tricou-femei-basic-alb,/collections/echipament-sala
/produs/tricou-femei-basic-alb,/collections/echipament-sala
/tricou-femei-basic-negru,/collections/echipament-sala
/produs/tricou-femei-basic-negru,/collections/echipament-sala
```

Keep the `/collections/<old>` -> `/collections/<new>` rules. They still catch direct links to the renamed collection handles.

## 5. Optional pattern-derived rows (not in the CSV: no evidence the URLs existed)

Add these only if GSC (Pages > Not found, or the "Crawled - currently not indexed" export) or a Wayback inventory shows them. They are harmless if added, because a redirect for a path that never existed costs nothing.

- **Nested child categories.** Google showed `/categorie-produs/suplimente/vitamine-si-minerale`, so `suplimente` was a parent category. The migration only created nested rules for 3 children, which suggests the rest were top level. If not, add:
  - `/categorie-produs/suplimente/{pudre-proteice,pre-workout,intra-workout,arzatoare-de-grasimi,shoturi,batoane-proteice,prime-health,alimente-sanatoase}`, mapped to the same targets as their flat versions.
- **WordPress post permalinks.** The site's WP-era posts are unknown. Six articles were published 2025-05-26/28. The glycerol one contains a WP customizer link, so its text came from WordPress. If the WP permalink structure was `/%postname%/`, the old URLs were:
  - `/ce-este-un-pre-workout-fara-cofeina/`
  - `/cum-te-ajuta-combat-pro-sa-ti-cresti-masa-musculara/`
  - `/cum-contribuie-l-carnitine-1000-la-arderea-grasimilor/`
  - `/glycerolul-secretul-culturistilor-profesionisti-pentru-un-antrenament-eficient/`
  - `/bcaa-vs-eaa-diferente-si-beneficii-pentru-culturisti-ghid-complet/`
  - `/water-out-tinctura-solutia-naturala-pentru-eliminarea-retentiei-de-apa/`

  Each would map to `/blogs/news/<same Shopify handle>`. The last two Shopify handles contain diacritics, so their targets would be percent-encoded. WordPress's install default is `/%year%/%monthnum%/%day%/%postname%/`, which cannot be reconstructed without the WP post dates. Blog category and tag archives (`/category/...`, `/tag/...`) and WooCommerce tag archives (`/eticheta-produs/...`) are also unknown.
- **Account sub-endpoints** (`/contul-meu/comenzi/`, `/contul-meu/parola-pierduta/`, ...) were not added. Shopify redirects are exact-path with no wildcard, these are login-only pages, and there is no evidence any were indexed.

## 6. Query-string cases (cannot be fixed with a path redirect; note only)

Shopify URL redirects match the path only. They fire only when that path would 404, and the incoming query string is appended to the target.

| URL seen | Today | Why a redirect row can't fix it / what to do |
|---|---|---|
| `/categorie-produs/suplimente/?v=1eb2628f4187` (WooCommerce "geolocate with page caching" cache-buster) | 301 -> `/collections/suplimente?v=...` -> 301 -> `/collections/suplimente-sala?v=...` (200, canonical to the clean URL) | The path rule already fires. Repointing it (section 4) makes it 1 hop. `?v=` is carried along, and the canonical consolidates it. |
| `/collections/suplimente-pre-workout?v=1eb2628f4187` | 200, canonical to the clean URL | The path exists, so Shopify never consults the redirect table. A `?v=` row would be ignored, which corrects SXO-04 recommendation (2). The canonical does the job. Use GSC Removals > "Clear cached URL" / Outdated content if it lingers. |
| `/produs/glycerol-max-pump-500g-125-serv/?customize_changeset_uuid=` (article body link, www host) | 301 www -> apex, then 301 -> `/products/glycerol-max-pump-500g-125-serv?customize_changeset_uuid=` | Fix the source instead: edit the link in article `glycerolul-secretul-culturistilor-profesionisti-pentru-un-antrenament-eficient` to `/products/glycerol-max-pump-500g-125-serv`. |
| WP search `/?s=...`, WooCommerce `?add-to-cart=...`, `?orderby=` | Home or collection returns 200 | Same limitation. No action; these are not indexed URLs in the evidence. |

## 7. www host
Rows are path-only. Shopify applies them on the primary domain after the domain-level `www -> apex` 301, so no `www` rows are needed. The www hop itself cannot be removed on Shopify (TECH finding). Reduce the hops at the source:
- Update the YouTube video descriptions to `https://primesupplements.ro/collections/suplimente-sala`.
- Fix the footer address link (LOCAL-03).
- Edit the glycerol article link.

Then use GSC to verify the www property, submit the sitemap, and request "Outdated content" removal for the 4 legacy SERP URLs (SXO-04 step 3).

## 8. Out of scope here
`/ro-hu/*` redirects are planned separately in `scratchpad/redirects/ro-hu-redirects.csv` (575 rows; a staged upload exists in `redirects/upload-response.txt`). None of those paths overlap this CSV.
