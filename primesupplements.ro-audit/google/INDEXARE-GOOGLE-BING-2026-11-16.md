# Indexarea în Google și Bing (16.11.2026)

Verificare cerută de Marius („cum verificăm dacă toate paginile sunt indexate în Google și Bing?” → „Da, verifică acum”). **Doar citire. Nu am cerut indexarea niciunei pagini și nu am modificat nimic.** Google Search Console a fost citit din browserul aplicației (contact@); Bing Webmaster Tools din Chrome, unde am intrat cu „Sign in with Google” pe contul contact@ (fără parolă).

## Google Search Console
**Paginile din sitemap** (filtrul „All submitted pages”; datele Google sunt din 13.11; sitemap citit pe 13.11, 399 de adrese descoperite, status Success):

| | Pagini |
|---|---:|
| **Indexate** | **402** |
| Neindexate | 11 |

**Cele 11 neindexate:**
- **„Descoperită – neindexată încă” (9):** `agents.md` (fișier pentru agenți, normal să nu fie indexat) și 8 pachete. Din ele, 4 sunt pachete Black Friday: `pachet-cut-black-friday`, `pachet-intra-black-friday`, `pachet-pre-workout-power-black-friday`, `pachet-recuperare-black-friday`. Celelalte 4: `pachet-energy-nitrox-no-stim-energy-pump-shot-cutie-20-fiole`, `pachet-focus-daily-vitamin-formula-ashwagandha-ksm-66-magneziu-bisglicinat`, `pachet-pump-combat-pro-creatina-creapure®-300-g-glycerol-max-pump`, `pachet-strength-creatina-creapure®-500-g-magneziu-bisglicinat-vitamina-d3-k2`. Pachetele sunt pagini noi, cu conținut asemănător produselor din ele, iar Google le-a pus la coadă. Toate 8 sunt încă în sitemap.
- **„Accesată – neindexată” (2):** `mnx-golden-era-cotton-shorts-rosewood`, `mnx-shorts-golden-era-2-0-red` (haine MNX, aproape identice cu alte variante).

**Toate paginile cunoscute de Google** (inclusiv cele din afara sitemapului): 604 indexate și circa 2.850 neindexate. Neindexarea e normală aici. Cele mai mari grupe: blocate de robots.txt (1.014: coș, căutare, conturi), redirecturi (828), canonical alternativ (167), 404 (87: produse și pachete șterse), noindex (68, intenționat), duplicate (55 + 295) și „accesată – neindexată” (325, mai ales fișiere JS din temă, feed-uri `.atom` și `llms-full.txt`). Plus 25 „indexate, deși blocate de robots.txt” (pagini de cont, deja cunoscute din 26.10).

**Verificare individuală (URL Inspection, 16.11):**
- `/pages/pentru-asistenti-ai`: **URL is on Google, indexată**.
- `/blogs/news/nac-glutationul-legatura-exista` (publicat pe 15.11): **indexat** în mai puțin de o zi.

## Bing Webmaster Tools
- Sitemap: trimis pe 23.10, citit ultima dată pe 7.11, Success, 622 de adrese descoperite.
- Site Explorer (primesupplements.ro): **845 indexate**, 0 erori, 21 avertismente, 13 excluse; 158 de clicuri și 1,2 K afișări în 6 luni. Apare încă și `b2b.primesupplements.ro` (magazinul B2B închis pe 14.11), care iese singur când Bing îl recitește.
- URL Inspection: `/pages/pentru-asistenti-ai` **indexată** (observație Bing: titlul SEO e prea lung, 71 de caractere, plus 2 imagini fără alt); `/blogs/news/nac-glutationul-legatura-exista` **indexat**.
- Recomandările Bing de pe pagina principală:
  - „Some of your recently published pages were not submitted via IndexNow”;
  - „Some of your important new pages are missing from your sitemaps”;
  - „not enough inbound links from high quality domains” (știut, pașii 16–17 din plan).

## Concluzie
- **Google:** 402 din 413 pagini din sitemap sunt indexate (97 %). Cele 11 rămase sunt pachete noi sau duplicate de haine, nu pagini importante. Articolele noi intră în index în aproximativ o zi.
- **Bing:** tot ce am verificat e indexat. Bing recitește sitemapul mai rar (ultima dată pe 7.11). IndexNow ar trimite paginile noi imediat.

## Ce se poate face (fiecare cere acordul lui Marius)
1. **Pachetele Black Friday** (4 neindexate): după Late Black Friday (27.11) decizi dacă rămân ca produse. Dacă nu, le scoatem din sitemap sau le redirecționăm. Nu are rost să cerem indexarea acum.
2. **Cererea de indexare** în Google și Bing pentru pagina AI (s-a schimbat azi) și pentru cele 4 pachete permanente (Energy, Focus, Pump, Strength). Sunt câteva clicuri pe „Request indexing”.
3. **IndexNow pentru Bing:** o aplicație gratuită de Shopify sau trimitere manuală prin „URL Submission” la fiecare articol nou. E de evaluat cu regula „aplicații cât mai puține”.
4. **Titlul SEO al paginii AI** e de 71 de caractere, iar Bing recomandă sub 70. Se poate scurta la „Prime Supplements pe scurt: firmă, produse, livrare” (51), fără „| Prime Supplements” la final.

## Repetare
Aceleași citiri lunar sau după fiecare val mare de pagini noi: GSC Pagini → filtrul „All submitted pages” și Bing Site Explorer + Sitemaps.
