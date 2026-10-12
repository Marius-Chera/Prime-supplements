## 10. Autoritate, brand și backlink-uri

**Scor specialist (la momentul auditului):** 18/100 — un singur specialist (authority): Backlink Health Score conform skill-ului seo-backlinks este INSUFFICIENT DATA / Not Assessed (0/7 factori scorați; singura sursă este Common Crawl, unde domeniul lipsește; `validate_backlink_report.py` → PASS), iar 18/100 este scorul de categorie pentru semnalele de autoritate *măsurabile*: zero mențiuni terțe în 15 interogări de brand, absență din graful CC în timp ce gymbeam.ro este clasat, `sameAs` greșit pe 3/3 rețele, 431 recenzii Judge.me și entitatea autorului invizibile în afara site-ului și 2 776 linkuri de ieșire/redirecționate în blog (194 „Powered by BlogGenAuto” dofollow + 2 582 myshopify) care scurg sau irosesc echitate. **Scor combinat: 18/100** (un singur specialist alimentează secțiunea).

**Scor estimat după remedierile din 12.10.2026:** 22/100 pe magazinul live — s-a închis doar scurgerea handle-ului „primesupplements1” ca brand/autor (vendor „Prime Supplements” 108 / „MNX” 87 pe 195 produse, 17 articole re-atribuite lui Marius Chera; AUTHORITY-13). În tema de test nepublicată „Impact – SEO fixes 2026-10-12” (id 193875083639) stau gata `sameAs` corect cu YouTube, `legalName`/`taxID`/telefon/adresă, `foundingDate` 2022, autor `Person` cu `jobTitle`, `aggregateRating` din Judge.me și neutralizarea la randare a linkurilor BlogGenAuto (`nofollow sponsored`) și myshopify (relative) — după publicare estimăm ~35/100. Componenta care cântărește cel mai mult (backlink-uri, mențiuni, măsurare: AUTHORITY-01/02/04/15) nu s-a mișcat și depinde de planul de linkuri P0–P3 din AUTHORITY-02; noindex-ul B2B, ștergerea `/ro-hu` și importul corpurilor curățate rămân la proprietar.

### Ce funcționează

- NAP consecvent on-site: footer-ul (pe fiecare pagină) și /pages/contact afișează identic „PRIME SPORT SUPPLEMENTS SRL · 46260823 · J32/1155/2022 · 0775286584 · contact@primesupplements.ro · Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A” (`$R/pages/page-contact.html`, `$R/home.html`).
- Organization JSON-LD există pe fiecare pagină, cu `@id` stabil (`https://primesupplements.ro/#organization`), logo și array `sameAs` (`$R/theme/snippets__schema-organization.liquid`) — containerul este corect, doar valorile erau greșite (AUTHORITY-03).
- Amprentă socială reală: canalul YouTube `@primesupplementsro` verificat live (HTTP 200, `<title>Prime Supplements - YouTube`); footer-ul leagă Facebook, Instagram, YouTube, TikTok cu `rel="noopener"` și aria-label-uri în română.
- Corpus real de recenzii: caruselul Judge.me raportează **431 recenzii** (`data-number-of-reviews='431'` în `$R/home.html`); produse individuale afișează 44, 17, 14, 13 recenzii. Linkul de atribuire al Judge.me este corect `rel='nofollow noopener'`.
- Linkurile de ieșire obligatorii legal (anpc.ro, consumer-redress.ec.europa.eu) sunt prezente site-wide (24/24 pagini parsate) — semnal de încredere pentru cumpărătorii români.
- „Sursele” blogului indică domenii reputate (ncbi.nlm.nih.gov 327, who.int 235, mayoclinic.org 257, fda.gov 67) — niciun link către rețele spam/casino/pharma în cele 355 articole.
- Nicio dovadă de linkuri toxice de intrare sau de acțiune manuală (nu s-a putut găsi nimic, ceea ce este o altă problemă).

### Constatări

#### AUTHORITY-01 — Domeniul lipsește din graful web Common Crawl, în timp ce competitorul principal este clasat

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | S (măsurare) / L (câștigare de linkuri) | 0.85 |

**Dovezi:** `/root/.cache/claude-seo/commoncrawl/primesupplements.ro-cc-main-2026-jan-feb-mar-combined.json` → `"in_crawl": false, "in_rankings": false, "pagerank": null, "harmonic_centrality": null, "n_hosts": null, "note": "Domain not found in Common Crawl data. It may be too new, too small, or not yet crawled."`. Comparație pe aceeași ediție (sursă CC 0.50): gymbeam.ro `in_rankings: true, pagerank_rank 372,270, harmonic_centrality_rank 7,453,268, n_hosts 2`; bodyline.ro `in_rankings: true, pagerank_rank 10,228,379`; proteinshop.ro absent (ca și ținta). `backlinks_auth.py --check` → `"tier": 0` („Basic (Common Crawl + Verify only)”). `$R/backlinks/` este un director gol; fișierele din cache sunt dovada efectivă.

**Impact / pagini afectate:** întregul domeniu (toate cele 1 151 URL-uri din sitemap); fiecare pagină care vrea să se claseze depinde de acest graf de linkuri gol. Absența din CC nu înseamnă neapărat zero backlink-uri (CC eșantionează), dar competitorul direct este vizibil în același eșantion, iar proteinshop.ro — cu amprentă comparabilă — lipsește la fel.

**Recomandare:** tratați domeniul ca neavând prezență măsurabilă în graful de linkuri și (a) măsurați întâi — verificați proprietatea în Google Search Console (raportul Links) și în Bing Webmaster Tools (raport gratuit de backlink-uri + cheie API pentru `bing_webmaster.py`), adăugați o cheie Moz gratuită în `/root/.config/claude-seo/backlinks-api.json`, ca `moz_api.py metrics primesupplements.ro` să întoarcă DA/linking root domains (detalii în AUTHORITY-04); (b) executați planul de linkuri P0–P2 din AUTHORITY-02. Nu cumpărați linkuri: profilul este gol, deci chiar și câteva linkuri plătite ar fi majoritatea lui și trivial de detectat.

**Cum verificăm (falsificabilitate):** un raport GSC Links sau Moz `linking_root_domains` ≥ 20 ar arăta că CC pur și simplu a ratat domeniul; re-rulați `commoncrawl_graph.py primesupplements.ro` la următoarea ediție trimestrială.

**Indicator timpuriu:** numărul „Top linking sites” din GSC; Moz linking root domains; `in_rankings` din CC devine true.

#### AUTHORITY-02 — Zero mențiuni terțe găsite pentru brand, firmă, fondator sau produse

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | L | 0.7 |

**Dovezi:** 15 interogări brand/entitate nu au întors nicio pagină care să menționeze magazinul: `"prime supplements" romania suplimente`; `"primesupplements.ro"`; `"prime supplements" sibiu OR cisnadie`; `"prime sport supplements" srl 46260823`; `"PRIME NITROX" OR "Combat PRO" OR "Pure Isolate" "prime supplements"`; `"prime supplements" pareri OR recenzii OR review romania`; `"prime supplements" emag OR olx OR facebook OR instagram OR tiktok OR youtube romania`; `"bloggenauto" "prime supplements"`; `"Marius Chera" nutritionist OR culturism OR NPC`; `site:primesupplements.ro`; `"primesupplements"`; `"PRIME SPORT SUPPLEMENTS" ... "J32/1155/2022"`; `"prime supplements" creatina OR creapure OR "mnx" magazin romania`; `"primesupplements1.myshopify.com" OR "b2b.primesupplements.ro"`; `"chera23" OR "Marius Chera" linkedin ...`. Fiecare set de rezultate era despre alte branduri „Prime” (Prime Nutrition/Blackstone Labs, Prime Biome, Prime Naturals/primeomega3.ro, Prime Hydration). Interogările de control pentru competitori au scos pagini terțe: gymbeam.ro → pagina de magazin compari.ro (`https://www.compari.ro/stores/gymbeam-ro-s126255/`, premiul „Magazinul Anului 2025”), acoperire forbes.ro despre venituri, stack3d.com, mensfitness.co.uk; proteinshop.ro → nimic (amprentă comparabilă cu ținta). Inventar: **0 directoare, 0 marketplace-uri, 0 presă, 0 forumuri, 0 pagini de influenceri, 0 pagini publice Trustpilot/Judge.me, 0 entități Wikipedia/Wikidata.** Caveat: motorul de căutare din sandbox este US-centric și nu a onorat `site:`/potrivirea exactă (a spus-o explicit), deci „negăsit” = „nescos la suprafață de acest motor”.

**Impact / pagini afectate:** entitatea de brand (eligibilitate Knowledge Graph / răspunsuri AI) și fiecare pagină: fără co-citări, Google/Bing/LLM-urile nu pot confirma că „Prime Supplements” din Cisnădie este o entitate distinctă de celelalte branduri „Prime”, iar blogul de 354 articole nu are nicio corroborare externă.

**Recomandare:** sprintul de citări P1 plus planul complet de linkuri/mențiuni pentru un brand românesc de suplimente sportive:
- **P0 — igienă înainte de outreach (săptămâna 1, S/M):** publicați tema de test (`sameAs`, câmpurile Organization, `foundingDate`: AUTHORITY-03/11/12; autor Person: AUTHORITY-10; `aggregateRating`: AUTHORITY-09); importați corpurile curățate (AUTHORITY-05/06); noindex pe B2B și eliminarea `/ro-hu` (AUTHORITY-07/08); activați pagina publică Judge.me; verificați GSC + Bing WMT + cheia Moz (AUTHORITY-04); pagina de autor.
- **P1 — citări și profiluri deținute (săptămânile 2–4):** Google Business Profile + Bing Places pentru sediul din Cisnădie (același string NAP); înregistrare compari.ro (+ feed-uri shopmania.ro / price.ro); vânzător eMAG marketplace + pagină de brand (catalogul are deja GTIN pe 188/395 variante); revendicare Trustpilot; pagină de companie LinkedIn; programe de furnizori — listare Creapure licensed-brand (AlzChem, codul de 6 cifre de pe cutie), pagini de parteneri KSM-66 și Kyowa; FRCF: listare lector/partener pentru Marius Chera.
- **P2 — media câștigată și parteneriate (lunile 2–3):** pagini pentru sportivii cu card PRO NPC + bio-uri reciproce; sponsorizarea unui eveniment regional FRCF/NPC (link de pe pagina sponsorilor + presa locală din Sibiu: Turnul Sfatului, Tribuna, Sibiu 100% — de verificat că mai apar); pitch-uri cu povestea fondatorului către forbes.ro / revistabiz.ro / capital.ro (amprenta gymbeam arată că aceste redacții acoperă categoria); 5–10 YouTuberi/TikTokeri de fitness din România (heepsy.com/es/top-youtube/fitness/romania a apărut ca sursă de liste) cu seeding de produs și landing page urmărit; citate de expert pentru redacțiile de sănătate (csid.ro, doc.ro — de verificat) folosind credențiala de nutriționist certificat.
- **P3 — active și monitorizare (trimestrul 2):** cele trei active din AUTHORITY-15; export lunar GSC/Bing/Moz; Google Alerts pentru string-urile de brand; re-rulare `/seo backlinks primesupplements.ro` cu Moz configurat; fără disavow (nu se cunosc linkuri toxice).
Țintă: ≥ 25 domenii distincte care menționează „Prime Supplements” + „Cisnădie” sau CUI-ul în 90 de zile.

**Cum verificăm (falsificabilitate):** o căutare Google/Bing din România pentru `"prime supplements" cisnadie` care întoarce pagini compari/termene/presă ar arăta că motorul folosit aici a sub-eșantionat rezultatele românești; un raport GSC Links cu > 20 site-uri de legătură ar falsifica și el „fără amprentă”.

**Indicator timpuriu:** numărul de URL-uri terțe care menționează brandul (urmărit lunar cu Google Alerts pentru „Prime Supplements”, „primesupplements.ro”, „Prime Sport Supplements”).

#### AUTHORITY-03 — `sameAs` din Organization nu coincide cu profilurile sociale reale pe niciuna dintre cele trei rețele și omite YouTube

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | S | 0.95 |

**Dovezi:** `$R/theme/snippets__schema-organization.liquid` hard-codează `"sameAs": ["https://www.facebook.com/primesupplements.ro", "https://www.instagram.com/primesupplements.ro", "https://www.tiktok.com/@primesupplements"]`. Footer-ul (setările Shopify de social media, randate prin `snippets/social-media` din `sections__footer.liquid`) leagă `https://www.facebook.com/primesupplementsro`, `https://www.instagram.com/primesupplements_ro/`, `https://www.youtube.com/@primesupplementsro`, `https://www.tiktok.com/@primesupplements.ro` (fiecare de 2x în `$R/home.html`). 0 din 3 URL-uri `sameAs` coincid; YouTube (singurul profil verificat live: HTTP 200, titlu „Prime Supplements - YouTube”) lipsește. Verificări live: tiktok `@primesupplements.ro` și `@primesupplements` ambele 200 cu titlu generic (`unverifiable_js`); facebook `/primesupplementsro` → 400 la redirectul de login, `/primesupplements.ro` → 200 la redirectul de login (`unverifiable_js`). Magazinul B2B afișează în plus profilurile placeholder Shopify (AUTHORITY-07). Remediere: `theme-fixes/snippets/schema-organization.liquid` (tema de test) emite exact cele 4 URL-uri din footer, inclusiv YouTube.

**Impact / pagini afectate:** fiecare pagină a magazinului principal (snippet randat din `layout/theme.liquid`) = 1 151 URL-uri din sitemap incl. /ro-hu; Google/Bing primeau pe fiecare pagină trei profiluri care nu sunt ale firmei, deci entitatea nu putea fi reconciliată cu canalele reale.

**Recomandare:** Verificare: după publicarea temei, Rich Results Test / validatorul Schema pe homepage trebuie să arate `sameAs` identic cu href-urile din footer (4 valori). Rămâne: (1) confirmați în Shopify Admin → Settings → Social media, logându-vă în fiecare rețea, că handle-urile Facebook/Instagram/TikTok chiar există — auditul a putut verifica doar YouTube; (2) opțional, ca `sameAs` și footer-ul să nu mai poată diverge niciodată, derivați lista din aceleași setări (snippet-ul de test le hard-codează încă):

```liquid
{%- assign same_as = "" | split: "" -%}
{%- for key in "social_facebook,social_instagram,social_youtube,social_tiktok,social_pinterest,social_linkedin" | split: "," -%}
  {%- assign v = settings[key] -%}
  {%- if v != blank -%}{%- assign same_as = same_as | push: v -%}{%- endif -%}
{%- endfor -%}
"sameAs": {{ same_as | json }},
```

(verificați id-urile exacte în `config/settings_schema.json` al temei Impact; Impact le numește `social_facebook`, `social_instagram`, `social_youtube`, `social_tiktok`…).

**Cum verificăm (falsificabilitate):** Rich Results Test / validatorul Schema pe homepage arată valori `sameAs` identice cu href-urile din footer.

**Indicator timpuriu:** Knowledge Panel Google / cardul de entitate Bing arată linkurile sociale corecte; diff `sameAs` = 0 în baseline-ul de drift.

#### AUTHORITY-04 — Nicio sursă de date de backlink-uri scorabilă nu este configurată (GSC, Bing WMT, Moz)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 1.0 |

**Dovezi:** `backlinks_auth.py --check --json`: moz `available: false` („No Moz API key found”), bing `available: false`, keywordseverywhere `available: false`; audit-context.md §4: fără credențiale GSC/GA4. În consecință toți cei 7 factori ai skill-ului sunt `Not Assessed` (validator PASS pe `<scratch>/authority-backlink-report.json`).

**Impact / pagini afectate:** procesul de audit/măsurare pentru întregul domeniu; blochează orice monitorizare de viteză a linkurilor, ancore sau toxicitate — un vârf de linkuri negative-SEO sau de la scrapere ar trece neobservat, iar efectul planului din AUTHORITY-02 nu poate fi dovedit.

**Recomandare:** (1) proprietate GSC de tip domeniu pentru `primesupplements.ro` și pentru `b2b.primesupplements.ro`; export lunar Links → „Top linking sites”. (2) Bing Webmaster Tools: import din GSC, creați o cheie API și salvați-o ca `bing_api_key` în `/root/.config/claude-seo/backlinks-api.json`. (3) cheie Moz gratuită (2 500 rânduri/lună) ca `moz_api_key`. Re-rulați apoi `/seo backlinks primesupplements.ro` pentru un Backlink Health Score real.

**Cum verificăm (falsificabilitate):** `backlinks_auth.py --check` raportează tier ≥ 1.

**Indicator timpuriu:** numărul tier-ului; prima rulare cu scor.

#### AUTHORITY-05 — 194 articole poartă un link „Powered by BlogGenAuto” șablonat, dofollow și cu contrast scăzut

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | M | 0.95 |

**Dovezi:** markup exact în corpurile articolelor (`$R/shopify/articles-p*.json`): 192x `<a href="https://bloggenauto.com" target="_blank" rel="noopener" style="color: #9aa0a6; text-decoration: none;">Powered by BlogGenAuto</a>` + 2x același cu ordinea atributelor inversată. Fără `rel="nofollow"`/`"sponsored"`; text gri #9aa0a6 pe alb. `articles-all.json`: `has_powered_by_bloggenauto_link` = 194/355 (55 % din blog). bloggenauto.com este al 6-lea cel mai linkat domeniu extern site-wide (194 linkuri). Aplicația injectează și `cdn.shopify.com/extensions/.../bloggenauto-245/assets/tracking.js` de două ori pe fiecare pagină de articol (`$R/pages/article*.html`). Căutare web: BlogGenAuto este aplicația Shopify „AI SEO Blog Writer” (`https://apps.shopify.com/seo-auto-write-easy-blog`). Remediere: `theme-fixes/sections/main-article.liquid` (liniile 114–115) rescrie la randare ambele variante de atribut în `rel="nofollow sponsored noopener"` și scoate `target="_blank"`; corpurile curățate (`blog-cleanup/cleaned-bodies.tar.gz`; `cleanup-report.json`: `remaining_bloggen` = 0 pe toate cele 355 articole) elimină complet cele 194 linkuri, dar importul nu a fost executat.

**Impact / pagini afectate:** 194 articole (+ duplicatele /ro-hu = 388 URL-uri). (a) Este tiparul „linkuri distribuite pe scară largă în șabloane” numit în politica Google de link spam, cu o ancoră stilizată să nu fie observată; (b) este o declarație citibilă de mașină că 55 % din blog este generat automat, pe un site care a publicat 127 articole într-o singură lună (expunere la scaled content abuse); (c) fiecare link cedează echitate unui terț din pagini care nu au de unde.

**Recomandare:** Verificare: după publicarea temei, `curl -s https://primesupplements.ro/blogs/news/<handle> | grep -o '<a[^>]*bloggenauto[^>]*>'` arată `rel="nofollow sponsored noopener"` pe un eșantion din cele 194 articole. Rămâne pentru proprietar: importul corpurilor curățate cu Matrixify (foaia Blog Posts: ID, Body HTML; `blog-cleanup/matrixify-blog-posts.csv.gz`) sau un script Admin API de o singură trecere, echivalent cu regex-ul specialistului, urmat de `articleUpdate`:

```python
re.sub(r'<a[^>]*href="https://bloggenauto\.com"[^>]*>Powered by BlogGenAuto</a>', '', body)
```

Dacă termenii aplicației impun atribuirea, păstrați-o cu `rel="nofollow sponsored"` și fără stilizarea de culoare. Dezactivați embed-ul `tracking.js` (sau dezinstalați aplicația) dacă nu mai este folosită — altfel fiecare articol nou vine iar cu linkul dofollow în sursă.

**Cum verificăm (falsificabilitate):** `grep -c bloggenauto.com` peste corpurile re-exportate = 0 (sau fiecare ancoră rămasă are `rel="nofollow sponsored"`).

**Indicator timpuriu:** numărul de articole cu linkul (194 → 0); raportul de linkuri externe din GSC nu mai listează bloggenauto.com.

#### AUTHORITY-06 — 2 582 linkuri din corpul articolelor către primesupplements1.myshopify.com (incl. 534 linkuri /cart/) redirecționează, dublează și irosesc echitatea internă

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | M | 0.95 |

**Dovezi:** totaluri `articles-all.json`: `myshopify_links` = 2 582 în 349 articole; `cart_links` = 534; defalcare conform catalog-analysis.md: 1 602 produse, 534 /cart/, 446 colecții; fiecare link de produs apare de două ori (domeniul principal + myshopify). `$R/pages/article.html` conține `primesupplements1.myshopify.com` de 7 ori. Hostul myshopify dă 301 către domeniul principal (audit-context.md). `/cart` este Disallow în robots.txt, deci 534 linkuri indică un URL pe care Googlebot poate să nu-l acceseze. Remediere: `theme-fixes/sections/main-article.liquid` (liniile 110–111) șterge la randare prefixul `https://primesupplements1.myshopify.com` / `http://…`, deci linkurile devin relative pe domeniul principal, fără hop 301; corpurile curățate rescriu toate cele 2 582 linkuri (`myshopify_links_rewritten`; `remaining_myshopify` = 0 pe 355 articole), dar `blog-cleanup/clean.py` (linia 32: „cart permalinks kept on the primary domain”) păstrează permalink-urile /cart/ — cele 534 rămân linkuri către un URL blocat.

**Impact / pagini afectate:** 349/354 articole (698 URL-uri cu /ro-hu). PageRank-ul intern trecea printr-un hop 301 pe 2 048 linkuri și se înfunda pe 534 linkuri /cart/; ancorele dublate dublează numărul de linkuri pe pagină (diluare); hostname-ul myshopify era expus ca string de brand în ancore (AUTHORITY-13). Dacă redirectul myshopify s-ar schimba vreodată (de ex. redenumirea magazinului), 2 582 linkuri s-ar rupe deodată.

**Recomandare:** Verificare: după publicare, `curl -s https://primesupplements.ro/blogs/news/<handle> | grep -c myshopify.com` = 0 pe un eșantion de 10 articole. Rămâne: (1) importul corpurilor curățate (vezi AUTHORITY-05), ca sursa să fie corectă, nu doar randarea; (2) într-o trecere pe care `clean.py` nu o acoperă: înlocuiți linkurile `/cart/<variant>:1` cu URL-ul produsului (sau eliminați-le când același produs este deja linkat în paragraf), apoi dedublați href-urile identice din același paragraf; păstrați un link per produs per secțiune.

**Cum verificăm (falsificabilitate):** `sum(myshopify_links)` într-un re-export = 0 și `cart_links` = 0.

**Indicator timpuriu:** crawl Shopify „Online store → Links” / Screaming Frog: 0 redirecturi 301 interne din corpurile de blog.

#### AUTHORITY-07 — Magazinul B2B este o a doua entitate indexabilă, cu CUI-ul drept nume, profiluri sociale placeholder Shopify și catalog duplicat

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | S | 0.9 |

**Dovezi:** `$R/pages/b2b.html`: Organization JSON-LD și `<meta>` name = `"PRIME SPORT SUPPLEMENTS SRL / 46260823"`; href-uri footer/social = `http://facebook.com/shopify`, `http://instagram.com/shopify`, `https://tiktok.com/@shopify`, `https://www.youtube.com/shopify` (valorile implicite ale temei, niciodată înlocuite); 0 linkuri înapoi către primesupplements.ro; fără noindex/canonical; `$R/pages/b2b-products-sitemap.xml` listează 58 URL-uri de produs cu aceleași handle-uri ca magazinul principal. Toate cele 24/24 pagini parsate ale magazinului principal leagă `https://b2b.primesupplements.ro` (2 linkuri fiecare: „Inregistrare B2B”, „Logare B2B”) — un link de ieșire site-wide către un catalog duplicat. Stare: remediation-status.md — noindex/parolă pe magazinul B2B este acțiune a proprietarului pe celălalt magazin, nimic aplicat.

**Impact / pagini afectate:** hostul b2b (58 produse + colecții) și fiecare pagină a magazinului principal. Orice partener wholesale, distribuitor sau listă de prețuri ajunge natural pe hostul b2b; entitatea „PRIME SPORT SUPPLEMENTS SRL / 46260823” cu profilurile Shopify concurează cu „Prime Supplements” pentru Knowledge Graph; Google poate alege URL-ul b2b drept canonic pentru conținutul duplicat (duplicatele cross-domain intră explicit în regulile sale de canonicalizare).

**Recomandare:** (1) faceți magazinul B2B neindexabil: Shopify Admin (magazinul B2B) → Online Store → Preferences → password protection, sau adăugați `<meta name="robots" content="noindex,nofollow">` în layout-ul lui și `Disallow: /` într-un `robots.txt.liquid` custom; (2) redenumiți magazinul B2B în „Prime Supplements B2B” și setați-i social media la handle-urile reale; (3) păstrați linkurile din footer-ul magazinului principal către login-ul B2B (în regulă), dar nu este nevoie de „Inregistrare” și „Logare” ca două linkuri externe pe fiecare pagină — un singur link către `/pages/inregistrare-b2b` pe domeniul principal este suficient.

**Cum verificăm (falsificabilitate):** `curl -I https://b2b.primesupplements.ro/` arată `X-Robots-Tag: noindex` sau o pagină cu parolă; `site:b2b.primesupplements.ro` întoarce 0.

**Indicator timpuriu:** acoperirea GSC a proprietății b2b scade la 0 indexate; niciun URL b2b ales drept canonic pentru produsele magazinului principal (URL Inspection).

#### AUTHORITY-08 — Piața duplicat /ro-hu/ împarte fiecare semnal off-site între două seturi de URL-uri

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | S | 0.85 |

**Dovezi:** sitemap-ul are 575 URL-uri duplicate sub /ro-hu/ (1 151 în total); fiecare pagină /ro-hu este self-canonical, cu hreflang ro / ro-HU / x-default, conținut românesc identic și prețuri RON (`$R/pages/homepage-ro-hu.html`; audit-context.md). Butoanele de share social și orice URL copiat de pe o pagină /ro-hu poartă URL-ul /ro-hu, deci share-urile, mențiunile, recenziile și backlink-urile pot acumula pe `/ro-hu/products/...` în loc de `/products/...`. Stare: `webPresenceDelete` pe `gid://shopify/MarketWebPresence/73400189303` a fost validat, nu executat (schimbare de setări de vânzare = decizia proprietarului; remediation-status.md).

**Impact / pagini afectate:** 575 URL-uri duplicate; fiecare link sau mențiune câștigată prin planul din AUTHORITY-02 se poate pierde pe varianta necanonică (detaliile tehnice și redirecturile: secțiunea 9).

**Recomandare:** (unghiul de autoritate; dedup-ul aparține specialiștilor tehnic/international) până există conținut maghiar, eliminați web presence-ul pieței Ungaria (Settings → Markets → Ungaria → Domains and languages → eliminați subfolder-ul /ro-hu), ca piața să se rezolve pe domeniul principal; Shopify va face 301 /ro-hu/* → /* și va consolida toate semnalele (importul celor 575 redirecturi 1:1 este descris în secțiunea 9). Dacă Ungaria se păstrează, publicați locale-ul hu cu traduceri reale și HUF înainte de a-l promova.

**Cum verificăm (falsificabilitate):** `curl -I https://primesupplements.ro/ro-hu/` → 301 către `/`; numărul de URL-uri din sitemap 575.

**Indicator timpuriu:** GSC „Duplicate, Google chose different canonical” → 0; toate linkurile de intrare ajung pe URL-urile primare.

#### AUTHORITY-09 — Cele 431 recenzii Judge.me sunt invizibile off-site: fără pagină publică de recenzii, fără markup rich-snippet, fără profiluri terțe de recenzii

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.9 |

**Dovezi:** carusel `$R/home.html` `data-number-of-reviews='431'`; badge-uri de produs 44, 17, 14, 13, 9, 8, 7 recenzii (`$R/pages/collection-all.html`); 12 din 40 badge-uri de pe homepage arată `data-number-of-reviews='0'`. Pagina publică de magazin: `https://judge.me/reviews/stores/primesupplements.ro` → 404 „Not Found”; `https://judge.me/reviews/stores/primesupplements1.myshopify.com` → 404. Pagini de produs: 0 apariții `jdgm-rich-snippet` / `aggregateRating` în `product-creatina-creapure.html` și `product.html` (Product JSON-LD custom omite `aggregateRating`; blocul rich-snippet Judge.me nu este randat). `https://www.trustpilot.com/review/primesupplements.ro` → 403 „Verifying Connection” (neverificabil, dar niciun profil nu a apărut nici în căutare). Niciun Google Business Profile găsit. Remediere: `theme-fixes/snippets/schema-product-enhanced.liquid` (liniile 22–23, 51–57) emite `aggregateRating` (`ratingValue`, `bestRating`, `worstRating`, `ratingCount`) din `product.metafields.reviews.rating` / `reviews.rating_count` (metafield-urile standard scrise de Judge.me) când `rating_count > 0`.

**Impact / pagini afectate:** 185 pagini de produs + entitatea magazinului; recenziile sunt singurul activ al brandului confirmat de terți și nu se văd nici în SERP (fără stele), nici în afara site-ului.

**Recomandare:** Verificare: după publicare, Rich Results Test pe `/products/creatina-creapure` arată „Product snippets” cu stele; dacă nu, verificați în Judge.me → Settings → Integrations că metafield-urile `reviews.rating` / `reviews.rating_count` sunt scrise (altfel blocul se omite silențios). Rămâne pentru proprietar (setări de aplicație și conturi terțe): (1) Judge.me → Settings → „Reviews page”: activați pagina publică de magazin și creați `/pages/recenzii` cu widget-ul „All reviews” (HTML-ul referențiază deja `jdgm-all-reviews-page`, dar pagina nu există); (2) revendicați Trustpilot (gratuit) și Google Business Profile; (3) trimiteți recenziile Judge.me în Google Shopping prin feed-ul său de product reviews. Recenziile sunt singurul activ corroborat de terți pe care îl are brandul — expuneți-le.

**Cum verificăm (falsificabilitate):** Rich Results Test arată „Product snippets” cu stele pe `creatina-creapure`; `judge.me/reviews/stores/...` întoarce 200.

**Indicator timpuriu:** numărul de URL-uri de produs cu „Review snippets” valide în GSC Enhancements; numărul de recenzii Trustpilot.

#### AUTHORITY-10 — Entitatea autorului expert („Marius Chera, Nutriționist Certificat”) este necoroborată, marcată inconsistent și fără pagină de autor

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | M | 0.85 |

**Dovezi:** byline-uri pe 355 articole: „Marius Chera , Nutriționist Certificat” 325, „primesupplements1” 18, „Marius Chera” 10, „Sorin Cristea” 2 (catalog-analysis.md). Snippet-ul temei `schema-article.liquid` emite `"author": {"@type": "Organization", "name": "Prime Supplements"}` (în `$R/pages/article.html`, bloc JSON invalid), în timp ce JSON-LD-ul BlogGenAuto din corp emite un `Person` în 344 articole → două entități de autor contradictorii pe pagină. Bio-ul boilerplate se termină cu URL-ul brut `www.linkedin.com/in/chera23` (337 linkuri) și afirmă „8” vs „10 NPC PRO Cards” și „15 ani” vs „18 ani” în articole diferite. /pages/despre-noi: „Marius Chera a conceput firma PRIME SUPPLEMENTS in anul 2022 … primul antrenor roman care a reusit sa antreneze sportivi care au obtinut cardul PRO din cadrul organizatiei NPC”. Căutarea „Marius Chera” / „chera23” (3 interogări) nu a scos nimic. `$R/shopify/pages.json` are 11 pagini — niciuna de autor. Remediere: live, 17 articole atribuite contului „primesupplements1” au fost re-atribuite lui „Marius Chera” (`applied/articles-plan.json`: Marius Chera 352, Sorin Cristea 2 din 354); în tema de test, `theme-fixes/snippets/schema-article.liquid` (liniile 12–20, 50–64) emite autor `Person` cu `name` „Marius Chera” (partea dinaintea virgulei), `jobTitle` „Nutriționist certificat”, `sameAs` LinkedIn, `url` → `/pages/despre-noi`, `worksFor` → `#organization`, iar JSON-LD-ul din corp devine inert (`main-article.liquid` linia 112).

**Impact / pagini afectate:** 354 articole (semnalul E-E-A-T al întregului blog) + entitatea de brand: tot blogul se sprijină pe o credențială pe care nimeni din afara site-ului nu o confirmă.

**Recomandare:** Verificare: după publicare, Rich Results Test pe un articol arată un singur autor `Person` (nu și Organization); `grep -c '"@type": *"Person"'` pe HTML-ul livrat = 1. Rămâne: (1) creați `/pages/marius-chera` cu Person JSON-LD (`name`, `jobTitle`, `worksFor` → `#organization`, `sameAs` [LinkedIn, Instagram, pagini de rezultate FRCF/NPC, YouTube], credențiale — emitentul certificatului, listarea ca lector FRCF — și fotografie) și mutați `url`-ul autorului din snippet de pe `/pages/despre-noi` pe această pagină, în linia snippet-ului specialistului:

```liquid
"author": {"@type":"Person","name": {{ article.author | json }}, "url": "https://primesupplements.ro/pages/marius-chera"}
```

(2) o singură ortografie a byline-ului și un singur set de fapte în bio (8 sau 10 carduri PRO, 15 sau 18 ani) — `clean.py` normalizează caseta de autor la import; (3) coroborare terță: mențiune pe site-ul FRCF, pagini de rezultate NPC/IFBB care numesc sportivii antrenați, 2–3 interviuri — cele mai valoroase linkuri pe care le poate obține un brand românesc de suplimente.

**Cum verificăm (falsificabilitate):** Rich Results Test arată un singur autor Person per articol; o căutare după numele autorului întoarce ≥ 3 pagini independente.

**Indicator timpuriu:** intrare în Knowledge Graph pentru autor; numărul de mențiuni independente.

#### AUTHORITY-11 — Schema Organization omite adresa, telefonul, legalName și identificatorii fiscali, deși NAP-ul este pe fiecare pagină

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.95 |

**Dovezi:** `schema-organization.liquid` are `contactPoint` cu `contactType` și `availableLanguage: ["Romanian","Hungarian"]`, dar fără `telephone`, `address`, `legalName`, `taxID`/`vatID`, `email`; footer-ul le tipărește pe toate (CUI 46260823, J32/1155/2022, 0775286584, Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A). „Hungarian” este declarată limbă disponibilă deși locale-ul hu este nepublicat. Adresa este scrisă „Cisnadie” (fără diacritice) pe site; forma din registru este „Cisnădie” — o singură formă peste tot (schema + GBP + directoare). Remediere: `theme-fixes/snippets/schema-organization.liquid` emite `@type ["Organization","OnlineStore"]`, `legalName` „PRIME SPORT SUPPLEMENTS SRL”, `taxID` „46260823”, `telephone` „+40775286584`, `email`, `address` PostalAddress (Str. Ioan Virgil Ispas, Nr. 17A / Cisnădie / Sibiu / RO), `contactPoint` cu telefon + e-mail și `availableLanguage: ["ro"]`; lipsesc încă `vatID` și `postalCode`.

**Impact / pagini afectate:** toate paginile (un singur snippet); fără acești identificatori, entitatea nu poate fi legată de înregistrarea ONRC și de viitoarele citări (GBP, Bing Places, compari.ro, marketplace-uri) prin același NAP.

**Recomandare:** Verificare: după publicare, validatorul Schema pe homepage arată `legalName`, `taxID`, `telephone`, `address.addressLocality` = „Cisnădie”. Rămâne: confirmați dacă firma este plătitoare de TVA și, dacă da, adăugați `"vatID": "RO46260823"`; completați `postalCode`; folosiți exact aceeași formă a NAP-ului în footer, GBP, Bing Places, compari.ro și profilurile de marketplace. Blocul propus de specialist (referință):

```json
"legalName": "PRIME SPORT SUPPLEMENTS SRL",
"taxID": "46260823",
"vatID": "RO46260823",
"email": "contact@primesupplements.ro",
"telephone": "+40775286584",
"address": {"@type":"PostalAddress","streetAddress":"Str. Ioan Virgil Ispas Nr. 17A","addressLocality":"Cisnădie","addressRegion":"Sibiu","postalCode":"<fill>","addressCountry":"RO"},
"contactPoint": {"@type":"ContactPoint","contactType":"customer service","telephone":"+40775286584","email":"contact@primesupplements.ro","availableLanguage":["Romanian"]}
```

(confirmați că vatID se aplică; renunțați la „Hungarian” până la publicarea hu).

**Cum verificăm (falsificabilitate):** validatorul de schema arată câmpurile; diff-ul string-ului NAP între listări = 0.

**Indicator timpuriu:** GBP verificat; citări cu NAP identic.

#### AUTHORITY-12 — `foundingDate` 2020 din schema Organization contrazice registrul (J32/1155/2022) și pagina Despre noi („in anul 2022”)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.9 |

**Dovezi:** `schema-organization.liquid`: `"foundingDate": "2020"`; footer/contact: număr de înregistrare `J32/1155/2022`; `$R/pages/page-despre-noi.html`: „Marius Chera a conceput firma PRIME SUPPLEMENTS in anul 2022”. Remediere: `theme-fixes/snippets/schema-organization.liquid` → `"foundingDate": "2022"`.

**Impact / pagini afectate:** toate paginile; un fapt de entitate contrazis de propriile pagini ale site-ului scade încrederea în restul grafului (Knowledge Graph reconciliază datele de înființare cu registrele publice).

**Recomandare:** Verificare: după publicare, `curl -s https://primesupplements.ro/ | grep -o '"foundingDate": *"[0-9-]*"'` → `"2022"`. Rămâne, opțional: înlocuiți cu data exactă ONRC (de ex. `"2022-06-xx"`) și păstrați o singură poveste a înființării pe /pages/despre-noi.

**Cum verificăm (falsificabilitate):** toate cele trei surse spun același an.

**Indicator timpuriu:** nu este nevoie (remediere de o linie).

#### AUTHORITY-13 — Handle-ul myshopify „primesupplements1” se scurge ca nume de brand/autor/vendor

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | FIXED (live 12.10.2026) | S | 0.95 |

**Dovezi:** vendor = „primesupplements1” pe 64/185 produse (`products-all.json`), randat de ~25–36 ori pe fiecare pagină de produs și expus la `https://primesupplements.ro/collections/vendors?q=primesupplements1`; autor „primesupplements1” pe 18 articole; string-ul apare în 2 582 ancore de blog (AUTHORITY-06). Magazinul B2B adaugă un al treilea string de brand („PRIME SPORT SUPPLEMENTS SRL / 46260823”). Remediere live (remediation-status.md): `vendor` setat „Prime Supplements” (108) / „MNX” (87) pe 195 produse (`applied/products-plan.json`: 98 / 87 pe cele 185 active); 17 articole re-atribuite lui „Marius Chera” (`applied/articles-plan.json`: 352 Marius Chera, 2 Sorin Cristea). Snippet-ul de produs din tema de test mapează în plus orice `vendor` rămas „primesupplements1” pe „Prime Supplements” (`schema-product-enhanced.liquid` liniile 13–15).

**Impact / pagini afectate:** 64 produse, 18 articole, 349 corpuri de articole; rezoluția de entitate (Google/Bing/LLM-uri) vedea trei nume pentru un singur brand, iar „primesupplements1” putea apărea ca brand în feed-urile Shopping și în răspunsurile AI.

**Recomandare:** Verificare: `https://primesupplements.ro/collections/vendors?q=primesupplements1` nu mai listează produse și `grep -c primesupplements1` pe un export de produse = 0; în Admin → Blog posts filtrați după autor și confirmați 0 articole cu „primesupplements1” (specialistul a numărat 18 pe 355, inclusiv articolul nepublicat; 17 au fost re-atribuite). Rămâne: string-ul din cele 2 582 ancore dispare la randare după publicarea temei și din sursă la importul corpurilor (AUTHORITY-06); redenumirea magazinului B2B (AUTHORITY-07).

**Cum verificăm (falsificabilitate):** `grep -c primesupplements1` peste produsele/articolele exportate = 0.

**Indicator timpuriu:** atributul de brand în Merchant Center; fațeta vendor.

#### AUTHORITY-14 — Profilul de linkuri de ieșire al blogului este boilerplate: aceleași 7 domenii străine de autoritate în 349 articole, fără surse de reglementare românești/UE, fără co-citare locală

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | M | 0.85 |

**Dovezi:** totaluri `external_link_targets` (articles-all.json): linkedin.com 337, ncbi.nlm.nih.gov 327, healthline.com 276, mayoclinic.org 257, who.int 235, bloggenauto.com 194, fda.gov 67, webmd.com 66, wikipedia.org 20; hosturi externe distincte în 355 articole ≈ 12. 0 linkuri către efsa.europa.eu, ms.ro (notificare suplimente), ansvsa.ro, anad.gov.ro, frcf.ro sau orice publicație românească. 6 articole fără linkuri externe; 24 pagini parsate fără secțiune de parteneri/presă; /pages/despre-noi numește „furnizori de top” fără să numească vreunul.

**Impact / pagini afectate:** 354 articole. Un tipar uniform de citare produs de generator este o amprentă de scaled content, iar site-ul nu co-citează niciodată entitățile românești (FRCF, ANAD, registrul de notificare al Ministerului Sănătății) de pe ale căror pagini ar trebui să fie linkat mai târziu.

**Recomandare:** în curățarea editorială a blogului (după importul corpurilor — `blog-cleanup/clean.py` normalizează caseta de autor, dar nu adaugă surse), adăugați 1–2 citări românești/UE per articol acolo unde afirmația este de reglementare (registrul EFSA de health claims, notificarea ANSVSA/MS), linkați paginile sportivilor/federației când sunt numiți și scoateți linkul LinkedIn din corpul bio-ului (mutați-l pe pagina de autor din AUTHORITY-10).

**Cum verificăm (falsificabilitate):** hosturi externe distincte pe blog > 30 și ≥ 1 sursă de reglementare românească/UE în ≥ 50 % din articole.

**Indicator timpuriu:** diversitatea hosturilor de ieșire într-un export lunar.

#### AUTHORITY-15 — Fără active care să atragă linkuri: 354 articole șablonate, fără pagină de autor, unelte, date sau secțiune „parteneri”/presă

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | L | 0.8 |

**Dovezi:** tot conținutul este pagini de produs (185, descriere mediană 303 cuvinte la suplimente, 0 la MNX), 23 colecții cu descrieri goale la audit (17 au primit descrieri pe 12.10.2026) și 354 articole BlogGenAuto cu titluri datate 2026 (279/355) și 47 grupuri de keyword-uri care se canibalizează (catalog-analysis.md). Ingredientele brandate cu programe de listare la furnizor apar doar în 3 produse (Creapure 1, KSM-66 1, Kyowa 1) și nu sunt folosite ca ancore de entitate. Homepage/Despre noi nu conțin nicio secțiune de parteneri, sportivi, logo-uri de presă sau certificări (grep pentru partener/sponsor/ambasador/NPC/IFBB în `$R/home.html`: 0 potriviri în afara scripturilor).

**Impact / pagini afectate:** strategia de linkuri site-wide — nu există nimic la care un jurnalist, o federație sau un furnizor să aibă motiv să trimită.

**Recomandare:** construiți 3 active în trimestrul următor: (a) pagina „Suplimentele Prime notificate la Ministerul Sănătății” cu numărul de notificare al fiecărui produs (unică, citabilă, construiește încredere în RO); (b) un mic studiu de date din propriul catalog/comenzi („Cât costă 1 g de creatină în România 2026: analiză 40 de produse”) propus redacțiilor de business forbes.ro/revistabiz/capital.ro; (c) pagini pentru sportivii cu card PRO NPC antrenați de Marius Chera (fiecare sportiv leagă înapoi din social/bio). Calendarul P0–P3 complet: AUTHORITY-02.

**Cum verificăm (falsificabilitate):** fiecare activ câștigă ≥ 3 domenii referitoare în 90 de zile (GSC Links).

**Indicator timpuriu:** domenii referitoare per activ.

#### AUTHORITY-16 — Igienă minoră de ieșire: linkul WhatsApp site-wide trece printr-un scurtător terț

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.8 |

**Dovezi:** 24/24 pagini parsate leagă `https://wa.link/anvvmm` (widget-ul Dondy WhatsApp) în loc de `https://wa.me/40775286584`; destinația nu este verificabilă din HTML, iar numărul nu este expus crawlerelor.

**Impact / pagini afectate:** toate paginile; un semnal NAP în minus (telefonul din link) și o dependență de un domeniu terț pentru canalul principal de contact.

**Recomandare:** configurați widget-ul (Apps → Dondy WhatsApp Chat → numărul de telefon) cu numărul direct `wa.me/40775286584`, ca href-ul să expună consecvent telefonul din NAP.

**Cum verificăm (falsificabilitate):** href-ul din footer = URL wa.me.

**Indicator timpuriu:** niciunul.

### Ce nu am putut măsura

- Metrici de backlink-uri (domenii referitoare, ancore, toxicitate, viteză, raport follow/nofollow): singura sursă disponibilă este Common Crawl (tier 0), unde domeniul lipsește; fără chei Moz, Bing Webmaster, Keywords Everywhere, DataForSEO și fără GSC/GA4 în sandbox, Backlink Health Score este Not Assessed prin regula skill-ului (validator PASS).
- Mențiuni de brand în SERP-ul românesc: motorul WebSearch al sandbox-ului este US-centric și a ignorat operatorii `site:`/potrivire exactă; directoarele românești, Google Business Profile și marketplace-urile pot lista firma fără să fi fost scoase la suprafață — „0 mențiuni” înseamnă „0 găsite în 15 interogări”.
- Existența profilurilor Facebook/Instagram/TikTok și a paginii Trustpilot: ziduri de login sau bot-check (`unverifiable_js`, Trustpilot 403 „Verifying Connection”); doar YouTube a fost verificat (HTTP 200). Buget: 8 cereri live throttled (2 s între ele), niciuna către magazin.
- Agregatoare ale registrului comerțului, Google Business Profile și profilul LinkedIn `linkedin.com/in/chera23`: neaccesate în bugetul de cereri; fără headless browser în rulările specialistului.
- Contorizările (194 linkuri BlogGenAuto, 2 582 linkuri myshopify, 534 linkuri cart) au fost re-verificate din `articles-all.json`; defalcarea pe tip (1 602/534/446) provine din catalog-analysis.md și nu a fost recalculată.
- Nicio cerere live către magazin: toate dovezile on-site provin din copiile locale datate 2026-10-12 (bot protection 429 după burst-uri), deci starea live de după remedieri este dedusă din planurile aplicate (`applied/*.json`) și din fișierele temei de test (`theme-fixes/`), nu din HTML re-descărcat.
