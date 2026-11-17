# Schema pe articole și FAQPage din întrebările vizibile (18.11.2026)

Cerut de Marius pe 17.11 („Da, pregătește-le”), după prima măsurătoare a Scorului Prime (88,2). Pierderile pe care le acoperă: BreadcrumbList lipsă pe 167 de pagini (−3,0) și FAQPage lipsă pe 220 de pagini cu întrebări vizibile (−1,7). Schimbarea e **doar JSON-LD în `<head>`** și nu schimbă nimic din ce se vede pe site.

## Fișierele (pe o copie nepublicată a temei live „Prime – meniu mobil fonturi v2 (16.11)”, 194333770103)
- `snippets/schema-organization.liquid`: e identic cu live (MD5 `28d16b86…`), plus 2 rânduri la final care randează `schema-pagina-extra`;
- `snippets/schema-pagina-extra.liquid`, nou, alege ce schemă se pune după tipul paginii:
  - pe articole și pagini, BreadcrumbList (`schema-breadcrumb-page`);
  - pe articole, produse și colecții, FAQPage (`schema-faq-auto`);
- `snippets/schema-breadcrumb-page.liquid`, nou: Pagina principală > Blog > articol, respectiv Pagina principală > pagină;
- `snippets/schema-faq-auto.liquid`, nou, citește secțiunea „Întrebări frecvente” deja vizibilă:
  - în articole și în textul SEO al colecțiilor: `<h3>întrebare?</h3><p>răspuns</p>`;
  - în descrierile de produs: `<p><strong>întrebare?</strong></p><p>răspuns</p>`.

  Ia doar întrebările care se termină cu „?” și scrie blocul numai când găsește cel puțin 2 întrebări. Textul e identic cu cel de pe pagină, deci conformitatea UE rămâne cea a textelor deja aprobate.

## Stare
**18.11, blocat:** magazinul are deja 20 de teme, maximul Shopify, iar `themeDuplicate` nu creează copia. Marius trebuie să șteargă câteva teme vechi; ștergerea prin API e blocată pentru Claude. După aceea: copie → upsert → verificare în previzualizare (JSON-LD valid pe un articol, un produs și o colecție) → Marius publică.
