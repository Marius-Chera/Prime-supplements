# Creatine program: store fixes (15.10.2026, ~23:10–23:20 UTC)

Scope: primesupplements.ro, creatine cluster. Text and SEO fields only. I did not change any product title, handle, price, template or theme file. I did not touch the seo, descriptionHtml, custom.* metafields or alts of products A or B (another agent applied those at 23:03 and 23:10).

Backups (each file is new, nothing was overwritten). They are in `/home/user/Prime-supplements/primesupplements.ro-audit/backups/seo-creatina-2026-10-15/`:
- `creatina.metafields.before.json`: custom.hub_articles and the full custom.seo_text rich-text value
- `articles/cum-se-ia-creatina.cardfields.before.json` and `articles/creatina-pastile-sau-praf.cardfields.before.json`: title, summary, image alt, SEO title and SEO description
- `creatina-monohidrat-micronized-300g-fara-aroma.dietary-preferences.before.json`
- Applied record: `creatina.fixstore.applied.json`

## 1. Collection „creatina”: hub cards + seo_text. DONE, verified live

**Before (live).** custom.hub_articles listed 6 handles. The theme renders the first ones that exist: ce-este-creatina, cum-se-ia-creatina, in-cat-timp-face-efect-creatina. Their cards printed:
- „beneficii pentru masă musculară”
- „energia folosită în eforturile scurte și intense”
- „În cât timp face efect creatina”
- the alt „Dozajul optim de creatină pentru rezultate maxime în 2026”
- the loading dose „20 g pe zi”

custom.seo_text held the 2025 keyword copy: „forță, masă și explozie musculară”, „dovedite științific”, „rezultate reale și rapide”, „Începe transformarea”, and an http:// contact link. The theme section that shows it is disabled, but the API could still read it.

**Candidate check.** I checked all published creatine articles, about 60 in total. Every card (title, summary, image alt) had at least one problem:
- an effect, result or safety statement
- loading-dose wording
- a superlative
- an alt like „Dublezi Rezultatele”

None could be picked as it was. So I applied the reviewed card texts from final/creatina.json notes[22], which cover only the card fields:
- **cum-se-ia-creatina**
  - title → „Cum se ia creatina: doza de pe etichetă”
  - summary → the label-dose text from the notes
  - image alt → „Borcan de sticlă cu pudră albă și linguriță de măsură plină, lângă un carnet deschis și o ganteră”
  - I checked the alt against the image. The image itself is unchanged: same ArticleImage id and the same file.
- **creatina-pastile-sau-praf**
  - title was already the planned one
  - summary → „Pudră din tub sau plicuri efervescente: diferă ambalajul, lista de ingrediente și modul de administrare de pe etichetă. Alegi forma care ți se potrivește; doza este cea de pe eticheta produsului.”
  - alt → „Tub de pudră deschis, linguriță de măsură plină și un pahar cu apă pe o masă albă” (checked against the image)
- Both articles are published. I did not change any article body, handle or SEO title.
- custom.hub_articles = ["cum-se-ia-creatina", "creatina-pastile-sau-praf"]. plicuri-creatina-ready-to-go stays out. It needs card edits and the body edits from legal #3 first; those belong to the blog program.
- custom.seo_text = empty rich-text root. The metafield id is kept and nothing renders.

**After (live, curl at ~23:15, HTTP 200).**
- „Ghiduri și sfaturi utile” shows exactly these 2 cards, with the new titles, excerpts and alts.
- In the visible text, these terms appear 0 times: „masă musculară”, „energia”, „face efect”, „rezultate maxime”, „rezultate”, „optim”, „maxim”, „sigur”, „efecte secundare”, „eficien”, „forță”, „recuper”.
- The only raw-HTML hits are the CDN image file name „blog-dozaj-optim-creatina-rezultate-2026…png” and third-party cookie/app scripts. Renaming the file would need a re-upload, so it is out of scope.

**Left for the blog program.** These are not on the collection page, but they appear on the article page and in Google:
- cum-se-ia-creatina still has SEO title „…doza pe zi și momentul optim”.
- Its meta description still says „saturarea musculară” and „creatină monohidrată pură”.
- The bodies of both articles still need their † compliance rewrite.

## 2. Product B, „Despre produs” tab and Page 704641139063: NOT EDITED (the plan's premise is wrong)

- The Page „Creatina custom” (handle creatina-custom, page template creatina-despre-produs) has an **empty body**. Its page template has main-page disabled and shows a hard-coded custom-liquid section.
- In the live MAIN theme (gid://shopify/OnlineStoreTheme/193875083639), `templates/product.creatina2.json` contains the tab „Despre produs” as block `liquid_M8br49` (type `liquid`). Its HTML is **hard-coded in the template**. That block does not read custom.despre_produs_custom (the Page) or custom.despre_produs.
- The live product page shows exactly that hard-coded text: „PRIME Supplements® · Hardcore Sports Nutrition / CREATINĂ MONOHIDRATĂ MICRONIZATĂ / Un singur ingredient… / fără arome, aditivi sau ingrediente de umplutură / Fără aditivi / O formulă simplă, de la PRIME Supplements.”
- Writing the reviewed despre_produs text into the Page body would therefore change nothing visible. I did not write it.
- B's final notes[22] and the B apply record assume the tab „renders Page 704641139063”. Both should be corrected: the text lives in the template itself.
- Where the Page is used: only product B's custom.despre_produs_custom points to it (I checked all ~200 products). No menu links to it, and neither the B page nor the collection page links to it. But **/pages/creatina-custom is a separate live, indexable URL** and it is listed in sitemap_pages_1.xml. It has a self-canonical, no noindex, and the title „Creatină monohidrată micronizată – un singur ingredient | Prime”. It shows the same hard-coded block, so it duplicates or competes with product B.
- **Owner decisions (theme or template; writes to the MAIN theme are blocked for the agent):**
  - (a) Preferred: in the theme editor, replace block liquid_M8br49 with a „tab” block whose content is `{{ product.metafields.custom.despre_produs | metafield_tag }}`. That shows the reviewed text the other agent has already written. Or move B to the standard product template.
  - (b) Interim, text inside the same block (from notes[22]):
    - „fără arome, aditivi sau ingrediente de umplutură” → „un singur ingredient: creatină monohidrată (100%), fără aromă”
    - chip „Fără aditivi” → „Un singur ingredient”
    - „O formulă simplă, de la PRIME Supplements.” → „De la Prime Supplements.”
    - „PRIME Supplements®” → „PRIME Supplements”, unless a trademark registration is shown
    - H2 → p or h3
  - (c) Hide /pages/creatina-custom from search (seo.hidden = 1) or unpublish it. Product B does not depend on it.

## 3. shopify.dietary-preferences: DONE on B; A had none

- Product B (creatina-monohidrat-micronized-300g-fara-aroma) had [Vegetarian, Vegan]. Neither is on the label, and the label says „poate conține urme de lapte, ou, soia, gluten”. I backed up and deleted the metafield with metafieldsDelete, scoped to that one key.
- Read-back:
  - shopify.flavor (Unflavored), age-group (Adults) and detailed-ingredients (Creatine) are unchanged.
  - custom.despre_produs_custom is untouched.
- Product A (creatina-creapure) has no shopify-namespace metafields, so there was nothing to change.

**Other Vegan claims I noticed (not changed, for the owner):**
- Every product's shopify.dietary-preferences: no other product has Vegan or Vegetarian. prime-whey-go has „High protein”, and the Frutilu tasting pack has „Fără zahăr”.
- **spirulina-80-caps** and **silimarina-80-caps** carry the tag „vegan”. Their own descriptions say the gelatine capsule makes them not suitable for vegans. The tag contradicts the label facts and should be removed.
- **Frutilu instant drinks** (third-party brand; at least 12 pages, e.g. apricot, chocolate, cola, energy-cranberry, ice-tea peach/lemon, lemon-lime, mango, watermelon, pineapple, strawberry, sport-red-orange) say „vegan, fără gluten, fără lactoză, conform specificațiilor produsului”. These come from the product specification and are not checked against label photos in label_facts.md. They should be confirmed against the Frutilu labels.

## 4. Judge.me on product B: reported only

- B has 2 reviews in Judge.me, average 3.0. They appear on the page and in its rating markup.
- The review that shows an e-mail address as the author name:
  - **1 star**, dated **18.09.2026 15:45 UTC**
  - title „Certificare există”, text „Are certificare GMP sau NSF?”
  - Judge.me review id f5b0f9d5-c707-4265-b7f6-499dc4ea7598
- Owner action in Judge.me:
  - change the display name to initials
  - per strategy §6.4, consider turning this into a Q&A with a facts-only answer. The 1-star rating is from a question, not a product experience.
- Side note: Judge.me still stores the old product title „CREATINE MONOHYDRATE 300g/60serv” for B (data-product-title). It syncs on Judge.me's side.

## Rollback
- Articles: `articleUpdate(id, {title, summary, image:{altText}})` with the values in the cardfields backups.
- Collection: `metafieldsSet` hub_articles and seo_text with the values in `creatina.metafields.before.json`.
- Product B: `metafieldsSet` shopify.dietary-preferences (list.metaobject_reference) with the value in the dietary-preferences backup.
