# Blog consolidation plan: summary

Generated 2026-10-12 from 14 per-hub decision files into `plan/blog-consolidation.json`. Read-only: no Shopify mutations were run.

**355 articles: 121 kept, 234 redirected (301 + unpublish). 92 kept articles get a new handle; all 121 kept articles get a new title.**

Redirect targets: 211 to a kept article (4 of them in another hub), 11 to a hub collection, 12 to a product page.

## Validation

Checked against `recon/shopify/articles-all.json` (355 handles), `collections-plan.json` (23 collections) and `products-all.json` (185 products):

- Every article handle appears exactly once (355/355, no unknown handles).
- Every `/blogs/news/` redirect target is the final handle of a kept article; no redirect points to itself or to another redirected handle (no chains).
- Final handles are unique, match `^[a-z0-9-]{3,60}$`, and none takes the current handle of another article (kept-and-renamed or redirected).
- New titles are all 65 characters or fewer (longest 60), and none contains 2025 or 2026.
- Every kept article has at least 2 tags (4 to 5 in practice).
- All `/collections/` targets exist in the collections plan; all `/products/` targets exist and are ACTIVE.

Result after fixes: **0 problems**.

## Counts per hub

| Hub | Collection | Articles | Kept | Redirected | Renamed | Retitled | → article | → collection | → product | New articles suggested |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| creatina | creatina | 71 | 11 | 60 | 11 | 11 | 60 | 0 | 0 | 2 |
| pudra-proteica | pudra-proteica | 34 | 14 | 20 | 13 | 14 | 18 | 1 | 1 | 1 |
| aminoacizi | aminoacizi | 51 | 16 | 35 | 16 | 16 | 30 | 2 | 3 | 1 |
| arzator-de-grasimi | arzator-de-grasimi | 47 | 12 | 35 | 11 | 12 | 33 | 0 | 2 | 0 (+2 in place) |
| vitamine-si-minerale | vitamine-si-minerale | 24 | 16 | 8 | 9 | 16 | 6 | 0 | 2 | 1 (+1 in place) |
| prime-health | prime-health | 39 | 16 | 23 | 7 | 16 | 23 | 0 | 0 | 0 |
| suplimente-pre-workout | suplimente-pre-workout | 22 | 13 | 9 | 9 | 13 | 8 | 0 | 1 | 2 (+3 in place) |
| crema-de-orez | crema-de-orez | 10 | 5 | 5 | 3 | 5 | 3 | 1 | 1 | 2 |
| bauturi | bauturi | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 |
| batoane-proteice | batoane-proteice | 3 | 3 | 0 | 3 | 3 | 0 | 0 | 0 | 1 |
| alimente-sanatoase | alimente-sanatoase | 46 | 9 | 37 | 7 | 9 | 29 | 7 | 1 | 0 |
| haine-mnx | haine-mnx | 2 | 1 | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| antrenament-general | suplimente-sala | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| legacy-2025 | (none; tagged by topic hub) | 6 | 5 | 1 | 3 | 5 | 1 | 0 | 0 | 0 |
| **Total** | | **355** | **121** | **234** | **92** | **121** | **211** | **11** | **12** | **12** (+6) |

## Suggested new articles

12 new URLs to create:

| Hub | Handle | Title |
|---|---|---|
| aminoacizi | `glutamina-pentru-intestin-si-digestie` | Glutamina pentru intestin și digestie: beneficii și cum se ia |
| batoane-proteice | `batoane-proteice-ghid-comparatie` | Batoane proteice: comparație pe arome și macronutrienți |
| bauturi | `bauturi-instant-fara-zahar-frutilu-ghid` | Băuturi instant fără zahăr Frutilu: arome și când le folosești |
| bauturi | `electroliti-si-hidratare-la-sala` | Electroliți și hidratare la sală: ce bei la antrenament |
| creatina | `creatina-efecte-secundare` | Creatina efecte secundare: ce spun studiile |
| creatina | `creatina-prime-vs-gymbeam` | Creatina Prime vs GymBeam: comparație |
| crema-de-orez | `crema-de-orez-ce-este-cum-se-prepara` * | Crema de orez: ce este, cum se prepară și când o mănânci |
| crema-de-orez | `crema-de-orez-vs-ovaz-instant` * | Crema de orez vs ovăz instant: diferențe și ce alegi |
| pudra-proteica | `cata-proteina-pe-zi-masa-musculara` | Câtă proteină pe zi pentru masă musculară |
| suplimente-pre-workout | `pre-workout-efecte-secundare` | Pre-workout: efecte secundare și cum le eviți |
| suplimente-pre-workout | `citrulina-beneficii` | Citrulina: beneficii, doză și diferența pură vs malat |
| vitamine-si-minerale | `magneziu-bisglicinat-vs-citrat` | Magneziu bisglicinat vs citrat: diferențe și ce formă alegi |

\* Handle proposed during consolidation; the hub file gave only the title.

6 suggestions that are **not** new URLs (do not create a separate article):

- arzator-de-grasimi: `arzatoare-de-grasimi-efecte-secundare` (Arzătoare de grăsimi: efecte secundare și contraindicații): fulfilled in place: rewrite kept article l-carnitine-fat-burning-booster-meal-replacement (renamed to arzatoare-de-grasimi-efecte-secundare).
- arzator-de-grasimi: `thermo-core-ghid` (Thermo Core: ghid de ingrediente, dozaj și administrare): fulfilled in place: rewrite kept article acetyl-l-carnitine-thermo-core-120-caps-sleep (renamed to thermo-core-ghid).
- suplimente-pre-workout: `pre-workout-ce-este-cum-se-ia` (Pre-workout: ce este, cum se ia și ce mănânci înainte): fulfilled in place: rewrite kept article pre-workout-havok-suplimente-pre-workout-si-alimentatia (renamed to pre-workout-ce-este-cum-se-ia).
- suplimente-pre-workout: `ce-este-intra-workout` (Ce este intra-workout și 4 semne că ai nevoie de el): fulfilled in place: rewrite kept article omega-3-beneficii-cluster-insulin-bomb-1000g-signs (renamed to ce-este-intra-workout).
- suplimente-pre-workout: `dextrina-ciclica-vs-maltodextrina` (Dextrină ciclică vs maltodextrină la intra-workout): fulfilled in place: rewrite kept article dextrina-ciclica-intra-workout-cum-sa-alegi-carbohidratii-intra (renamed to dextrina-ciclica-vs-maltodextrina).
- vitamine-si-minerale: `vitamina-d3-k2-dozaj` (Vitamina D3+K2: doza zilnică și cum o ajustezi): do not create: expand kept spoke cand-se-ia-vitamina-d3-k2 with a dosage section (same intent, per hub notes).

## Fixes applied during consolidation

- haine-mnx: redirect magneziu-l-treonat-shaker-premium-accesorizat-500-ml was missing "published"; set to false like the other 233 redirects (its hub notes already say published false).
- suplimente-pre-workout: redirect magneziu-l-treonat-glycerol-max-pump-500g-125 re-pointed /products/glycerol-max-pump-500g-125-serv -> /blogs/news/glicerol-culturism-pompare-musculara (cross-hub kept spoke in legacy-2025; both hub files ask for this re-point).
- suplimente-pre-workout: redirect magneziu-bisglicinat-combat-pro-2-0-660g re-pointed /products/combat-pro-2-0-660g-30-serv -> /blogs/news/cum-te-ajuta-combat-pro-sa-ti-cresti-masa-musculara (cross-hub kept spoke in legacy-2025; both hub files ask for this re-point).
- suplimente-pre-workout: redirect apa-de-cocos-nitrox-no-stim-antrenamente-seara re-pointed /products/nitrox-no-stim -> /blogs/news/ce-este-un-pre-workout-fara-cofeina (cross-hub kept spoke in legacy-2025; both hub files ask for this re-point).
- crema-de-orez: suggested article 'Crema de orez: ce este, cum se prepară și când o mănânci' had no handle; proposed crema-de-orez-ce-este-cum-se-prepara (slug of the title's head, checked unique).
- crema-de-orez: suggested article 'Crema de orez vs ovăz instant: diferențe și ce alegi' had no handle; proposed crema-de-orez-vs-ovaz-instant (slug of the title's head, checked unique).

## Follow-ups for the apply step

- Renames (92): create a 301 from each old handle to the new one (handle update with redirect, or an explicit URL redirect). The 234 redirects already point at final handles, so no chains form.
- crema-de-orez: when `crema-de-orez-ce-este-cum-se-prepara` is published, re-point the two recipe redirects (`creatina-monohidratata-crema-de-orez-biscuiti-cu` now → /collections/crema-de-orez, `omega-3-6-9-crema-de-orez-plactina-cu` now → /products/crema-de-orez-plactina-cu-cocos) straight to it; update the redirect, do not chain.
- creatina: the suggested `creatina-efecte-secundare` shares the `efecte-secundare` intent with kept `creatina-si-retentia-de-apa` (which also receives 3 side-effect redirects). Before publishing it, narrow the kept article to water retention and re-point those 3 redirects to the new article, or drop the suggestion.
- vitamine-si-minerale: expand `cand-se-ia-vitamina-d3-k2` with a dosage section instead of creating `vitamina-d3-k2-dozaj`.
- arzator-de-grasimi and suplimente-pre-workout: 5 "new" spokes are delivered by rewriting the kept, renamed articles listed above.
- legacy-2025: kept articles carry the `hub:` tag of their topic hub (aminoacizi, suplimente-pre-workout, arzator-de-grasimi). Update the Combat PRO article to Combat PRO 2.0 during the rewrite; aminoacizi collection guides should link `bcaa-vs-eaa`.
- antrenament-general (collection suplimente-sala) and bauturi have no current articles; bauturi gets 2 new spokes.
