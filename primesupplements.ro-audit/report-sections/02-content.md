## 2. Calitatea conținutului și arhitectura tematică

**Scor specialist (la momentul auditului):** 27/100 — `content` (calitatea conținutului, E-E-A-T) 29/100: model intern Experience 4/20, Expertise 7/25, Authoritativeness 5/25, Trustworthiness 13/30, banda „Very low E-E-A-T”, pentru că 347/354 articole publicate sunt ieșire BlogGenAuto nerevizuită pe subiecte YMYL, cu „surse” care sunt doar homepage-uri (NCBI 330/330, Healthline 276/276, Mayo 258/258, WHO 236/236), sub o acreditare neverificabilă, 102/185 produse sub 50 de cuvinte și 23/23 colecții fără text; `cluster` (arhitectură tematică, hub-and-spoke) 24/100: 355 articole (~530k cuvinte) stau pe 13 hub-uri comerciale cu zero text, zero linkuri hub→spoke și fără taxonomie, 78 articole despre creatină pentru 3 produse, 42 regenerări literale (handle-uri -2…-5) și 26 grupuri intenție×hub cu 4-11 URL-uri concurente; **scor combinat 27/100** = media celor două, justificată de faptul că ambii specialiști converg spre aceeași cauză-rădăcină (blog generat automat la scară, așezat pe categorii goale) și niciunul nu găsește un factor compensator.

**Scor estimat după remedierile din 12.10.2026:** 35/100 — pe magazinul live s-au rezolvat constatările „de date” (descrieri pe 17 colecții-categorie, titluri/meta SEO diferențiate pentru 354 articole, 195 produse, 23 colecții și 11 pagini, alt pe 493/493 imagini de produs, 17 articole re-atribuite autorului), iar neutralizarea la randare a artefactelor BlogGenAuto și schema Article/CollectionPage sunt gata în tema de test; constatările Critical/High de E-E-A-T (CONTENT-01…04), consolidarea celor ~225 URL-uri canibalizate și linkurile hub→spoke rămân deschise sau în așteptarea proprietarului, deci creșterea este de ~8 puncte (content 29→37, cluster 24→33).

### Ce funcționează

- Structura articolelor este consecventă și scanabilă: mediana 1.529 cuvinte (p25 1.416 / p75 1.620), mediana 16 H2 + 24 H3, tabele în 348/355, bloc FAQ în 344/355, „key takeaways” în 321/355, 338 articole menționează studii (cu rezerva din CONTENT-02: linkurile duc la homepage-uri); propoziții de 18-21 cuvinte în medie, 19-25% peste 25 de cuvinte (normal pentru română).
- Corpurile nu sunt copii literale unele ale altora: Jaccard maxim pe shingle de 5 cuvinte între oricare două articole este 0,083 (`catalog-analysis.md`), deci duplicarea este de intenție/temă, nu de text.
- Volum mare de linkuri interne: 5.702 linkuri interne (mediana 17/articol), 114 produse distincte linkate, 446 linkuri către colecții; 349/355 articole linkează produse (1.602 linkuri), 243/355 linkează o colecție în corp; produsele creatină primesc 142 linkuri din articole, aminoacizi 102, fibre 92; graful articol→articol este dens (1.146 muchii distincte, mediana 3 linkuri de intrare), chiar dacă neplanificat.
- Cele șase articole din 2025 scrise de om (fără marker BlogGenAI) arată cunoaștere directă a produsului și țintesc interogări reale, distincte: `glycerolul-secretul-...` citează pe nume un studiu din Journal of Strength and Conditioning Research, `water-out-tinctura-...` (2.816 cuvinte) explică fiecare ingredient; pentru „bcaa vs eaa” și „izolat vs concentrat” SERP-ul nu are nicio pagină românească de autoritate.
- Descrierile suplimentelor de bază sunt substanțiale: creatina-creapure 600 cuvinte, pure-isolate-2000g 653, thermo-core-120-caps 747, maxim 988; 36/85 suplimente listează ingredientele, 32/85 au valori nutriționale.
- Metadatele de produs nu sunt șablonate: `metadata_template.py` pe 81 perechi → `site_risk: low`, `templated_ratio: 0.0`, doar 19 semnalări `brand-suffix-in-description`.
- Bazele de încredere există: recenziile Judge.me se afișează pe paginile de produs (17 pe creatina-creapure, 4 pe baton-proteic-capsuni), paginile legale sunt reale (termeni-și-condiții 3.952 cuvinte, politica-de-confidentialitate 2.132, politica-de-retur 1.122), pagina de contact are NAP, HTTPS.
- `content_humanize.py` nu a găsit caractere invizibile/watermark în niciunul dintre cele 12 corpuri scanate.
- Cârligele de temă pentru hub-uri există deja: `templates/collection.json` conține o secțiune `rich-text` (dezactivată, `disabled: true`, liniile 218-230) legată de `{{ collection.metafields.custom.seo_text | metafield_tag }}` și o secțiune `blog-posts` „Ghiduri și sfaturi utile”; `sections/main-blog.liquid` suportă filtrarea pe taguri (liniile 73-90, `show_tags`), deci hub-urile editoriale se pot construi doar cu taguri.

### Constatări

#### CONTENT-01 — Blogul este conținut generat automat la scară, nerevizuit, pe subiecte YMYL (expunere la „scaled content abuse”)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Critical | PENDING (acțiune proprietar) | L | 0.9 |

**Dovezi:** 347/355 corpuri conțin comentariul HTML `BlogGenAI`, 347 au JSON-LD injectat, 312 blocuri `<style>`, 309 handler-e `onclick=`, 347 taguri `<script>` non-JSON-LD (parsarea `articles-p*.json`); extensia `bloggenauto` (tracking.js) este în HTML-ul homepage-ului. Viteză de publicare: 2026-05 = 127 articole (săptămâna ISO 20: 46, W21: 40, W22: 36), 2026-06 = 71; 10 articole pe 2026-05-15, 9 pe 2026-05-18, 8 în alte patru zile, 7/zi în alte zece zile. Șablon identic pe fiecare pagină: „Key Takeaways” (etichetă în engleză) 321/355, butoane „Share / Post” 349/355, „Top 5 probleme pe care X le rezolvă” 299/355, FAQ 344/355, card de preț în corp „⚡ În limita stocului disponibil” 348/355 (533 carduri, mediana 2/articol), CTA-uri cu săgeată („Cumpără Acum →”, „Comandă acum →”) 1.825 în total, mediana 6/articol, caseta „Parte dintr-o colecție” 241/355. Placeholder-e de prompt ajunse în producție: `Person.jobTitle` = `"Professional title based on niche"` în **26** articole publicate (15 din septembrie 2026, ex. `intra-workout-dozaj-optim-carbohidrati-combatere-stres`, `taurina-ce-este-recovery-bcaa-500g-how-to`, `creatine-side-effects-creatine-ready-to-go-plicuri`, `proteina-whey-isolate-prime-whey-go-budget-protein`). Scurgeri de limbă: 349/355 corpuri încep cu „Published: May 15, 2026 | Updated: …”; un articol publicat are titlu englezesc (`fat-burner-x10-pareri-l-carnitine-1000-80-caps`: „Exploring the Science Behind L-Carnitine 1000: How It Transforms Fat…”); o ciornă integral în engleză, nepublicată (`creatine-monohydrate-creatina-creapure-debunking-common-supplement`, „Buy Now / While supplies last”); 191 handle-uri conțin fragmente de prompt în engleză (`-healthy-eating-for-busy-people`, `-debunking-common`, `-signs-your-body`). Derivă tematică: `tricou-sala-cele-mai-bune-tricouri-yoga` (1.346 cuvinte despre tricouri de yoga, semnat „Nutriționist Certificat”, citând Healthline pentru „hainele care ne fac să ne simțim bine pot îmbunătăți performanța”). Niciun semnal de experiență directă în corpurile 2026 eșantionate (fără fotografii originale, studii de caz cu sportivi, date de laborator/COA, „am testat”); `content_quality.py` a dat 79-87/100 doar pe densitate (lexicon englez). Testul Who/How/Why: Who = neverificabil (CONTENT-04), How = nicio declarație că textul este generat AI, Why = fiecare articol este pagină de vânzare (348/355 cu butoane de cumpărare).

**Impact / pagini afectate:** 347 din 354 articole publicate (98%), adică ~31% din cele 1.151 URL-uri din sitemap (x2 cu duplicatele /ro-hu/). Risc de clasificare „scaled content abuse” și de acțiune manuală pe întreg `/blogs/news/`.

**Recomandare:** Deja făcut: titlurile și meta-descrierile SEO ale celor 354 articole au fost rescrise și diferențiate pe live (`applied/articles-plan.json`); neutralizarea artefactelor BlogGenAuto la randare este în tema de test; corpurile curățate pentru toate cele 355 articole sunt pregătite (`blog-cleanup/cleaned-bodies.tar.gz`, `blog-cleanup/matrixify-blog-posts.csv.gz`, `blog-cleanup/cleanup-report.json`). Rămâne proprietarului: 1. Oprește auto-publicarea BlogGenAuto astăzi (Apps → BlogGenAuto → pauză la program); nu dezinstala încă (tracking.js/CSS sunt referențiate din corpuri). 2. Triază cele 347 articole generate în trei găleți după harta din CONTENT-05 / CLUSTER-04: **păstrează & rescrie** (~110-130, cele mai bune per temă), **comasează + 301** (~190), **șterge + 301 către pilonul/colecția cea mai apropiată** (tot ce nu are intenție distinctă, ex. articolul despre tricouri de yoga). În Shopify, schimbarea unui handle sau ștergerea cere redirect manual (Online Store → Navigation → URL redirects; import CSV în masă). 3. Pentru fiecare articol păstrat: revizie editorială umană de către autorul numit (fapte, surse, dozaj, siguranță), eliminarea „chrome-ului” de generator (carduri de preț, cele 6 CTA-uri, „Top 5 probleme”, etichete în engleză), adăugarea unei linii „Cum scriem” (ex. „Articol redactat cu asistență AI și verificat de Marius Chera la data de …”). 4. Cadență pe care oamenii o pot revizui (maximum 4-6 articole/săptămână).

**Cum verificăm (falsificabilitate):** dacă clasificarea „scaled content” nu ar fi un risc, o interogare `site:` ar arăta toate cele 354 articole indexate, cu afișări; un raport GSC „Pages” cu „Crawled – currently not indexed” în masă pe `/blogs/news/` sau o notificare de acțiune manuală confirmă problema.

**Indicator timpuriu:** numărul de pagini indexate în GSC pentru `/blogs/news/*` și afișările per articol la 4-8 săptămâni după triaj; ponderea articolelor cu ≥1 clic.

#### CONTENT-02 — Toate „sursele științifice” sunt linkuri către homepage-uri; blogul nu conține nicio citare reală

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | L | 0.95 |

**Dovezi:** (parsarea HTML a celor 355 corpuri) `ncbi.nlm.nih.gov` este linkat de 330 de ori — **330/330 duc la `https://www.ncbi.nlm.nih.gov`** (0 către `/pmc/articles/` sau `/pubmed/`); `healthline.com` 276/276 → rădăcină, `mayoclinic.org` 258/258 → rădăcină, `who.int` 236/236 → rădăcină; 0 referințe `doi.org` sau PMID în 355 corpuri; EFSA menționată o dată; ANSVSA/Ministerul Sănătății niciodată. Formulări tipice: „Conform studiilor publicate de NCBI, viteza cu care corpul poate procesa proteinele dictează rata de recuperare” (`izolat-proteic-emperor-mass_3000g-protein-for-muscle`); „Studiile recente de pe NCBI arată că extractul de bergamotă nu doar că scade LDL-ul...” (`colesterol-7-semne-colesterol-marit-ghid`); „Potrivit Mayo Clinic, acestea ajută la reducerea oboselii” (`apa-de-cocos-nitrox-no-stim-antrenamente-seara`). 848 paragrafe menționează „studii/cercetări”; 315 (37%) nu conțin niciun link, restul de 63% linkează un homepage. Statistici inventate prezentate ca rezultate: carduri „38% Reducere LDL / 25% Scădere Trigliceride / 42% Creștere HDL / 100% Ingrediente Naturale” (`colesterol-7-semne-...`), carduri „% Reducere/Scădere/Creștere” în 47 articole, „cu până la N%” în 58, „N% dintre” în 37 corpuri, 19 titluri cu procent („Greșeala de Puritate a Creatinei pe care 85% dintre Sportivi o fac în 2026”, „Eroarea în protecția ficatului pe care 75% dintre sportivii de peste 35 de ani o fac”). `content_verify.py` a returnat `claim_count: 0` pe toate cele 12 corpuri (detector de afirmații doar în engleză), deci constatarea vine din inspecție directă.

**Impact / pagini afectate:** 347 articole; fiecare articol care atinge un rezultat de sănătate. Expertiza și încrederea (YMYL) nu pot fi demonstrate cu linkuri către homepage-uri; cardurile cu procente neacoperite sunt afirmații medicale false.

**Recomandare:** Pentru fiecare articol păstrat, înlocuiește linkurile către homepage cu o listă numerotată „Surse” de referințe specifice, verificabile (PubMed ID / DOI / numărul opiniei EFSA; ex. creatină: Kreider et al. 2017, ISSN position stand, doi:10.1186/s12970-017-0173-z). Șterge fiecare procent și card statistic fără sursă. Regulă editorială: niciun „studiile arată” fără link către studiu. Păstrează linkurile externe `rel="noopener"` (nu nofollow) către sursele reale. Nici curățarea pregătită în `blog-cleanup/clean.py`, nici tema de test nu ating citările — aceasta este muncă editorială pe articolele supraviețuitoare.

**Cum verificăm (falsificabilitate):** dacă linkurile ar fi citări reale, lista de URL-uri ar conține căi la nivel de articol; parsarea arată 100% URL-uri rădăcină.

**Indicator timpuriu:** numărul de linkuri `/pmc/`, `/pubmed/`, `doi.org`, `efsa.europa.eu` în corpurile articolelor (țintă ≥3 per articol YMYL); numărul de carduri statistice „%” (țintă 0 fără sursă).

#### CONTENT-03 — Afirmații medicale fără disclaimere, informații de siguranță sau revizie medicală

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | M (temă) + L (editorial) | 0.9 |

**Dovezi:** (scanarea corpusului de 355 corpuri) Un disclaimer „nu înlocuiește / nu substituie” apare în **8/355**; „consultă (un) medic” în 32/355; formularea obligatorie UE pentru suplimente („supliment alimentar”, „dietă variată și echilibrată”) în 17/355. Subiecte atinse fără aceste protecții: colesterol 62 articole, tensiune arterială 56, diabet 32, depresie/anxietate 33, sarcină/alăptare 20, copii 20, cancer 5; verbe „tratează/tratament” 46, „vindec-” 15, „previne bolile/cancer/diabet” 25. Exemple: `colesterol-7-semne-colesterol-marit-ghid` spune că bergamota „acționează similar cu statinele naturale, dar fără efectele secundare”, „inhibă enzima HMG-CoA reductaza”, „nu provoacă dureri musculare sau oboseală, fiind o opțiune excelentă pentru utilizarea pe termen lung” și oferă un „Tabel valori colesterol” cu praguri de diagnostic; `hibiscus-si-tensiunea-arteriala-...` pretinde „inhibarea naturală a enzimei de conversie a angiotensinei (ACE)”; `alpha-booster-testosterone-...` susține că extractele „modula axa hipotalamo-hipofizo-testiculară”; `ceai-diuretic-sfatul-medicului-...` (titlu „Sfatul medicului”, autor `primesupplements1`) recomandă „cure de 10-14 zile” de diuretice; `gymbeam-creatine-...-5` recomandă o fază de încărcare de 20 g/zi fără avertisment renal. Două titluri pretind sfat medical („Sfatul medicului: ...”, „Sfatul Medicului: De Ce Nu Funcționează Suplimentele Pentru Inimă...”) deși niciun medic nu este numit pe site. Pagini de produs: text de avertismente pe 15/85 suplimente, disclaimer 11/85, dozaj 28/85 (scan `descriptionHtml`); HTML-ul paginilor de produs are 0 potriviri pentru „Avertismente”, „nu înlocuiește”, „ANSVSA/notificare” (`product.html`, `product-creatina-creapure.html`).

**Impact / pagini afectate:** ~200+ articole cu vocabular de boală/afecțiune; 85 produse-suplimente. Criteriile QRG YMYL „Lowest” (sfat medical fără calificare) se aplică direct.

**Recomandare:** Temă: adaugă un bloc fix de disclaimer în `sections/main-article.liquid` (după conținut, înainte de `schema-article`) și în tab-ul de descriere din `snippets/product-info.liquid`, de exemplu:

```liquid
{%- if blog.handle == 'news' -%}
<aside class="prose text-subdued text-sm" data-disclaimer>
  <p>Informațiile din acest articol au scop educativ și nu înlocuiesc sfatul medicului sau al farmacistului. Suplimentele alimentare nu țin locul unei diete variate și echilibrate și al unui stil de viață sănătos. Consultă medicul înainte de a folosi suplimente dacă ai o afecțiune, urmezi un tratament, ești însărcinată sau alăptezi. A nu se depăși doza zilnică recomandată. A nu se lăsa la îndemâna copiilor.</p>
</aside>
{%- endif -%}
```

Editorial: elimină limbajul de tratament/vindecare/prevenire a bolilor; păstrează doar afirmațiile de sănătate permise pentru ingredient (registrul de afirmații autorizate, Regulamentul UE 1924/2006; ex. creatină: „increases physical performance in successive bursts of short-term, high-intensity exercise” la 3 g/zi); adaugă un paragraf de contraindicații în fiecare articol YMYL; re-intitulează cele două articole „Sfatul medicului” sau pune-le sub revizia unui medic numit. Șablon de produs: câmpuri obligatorii „Avertismente” și „Mod de administrare” (metafield-uri `custom.warnings`, `custom.dosage`) randate pe fiecare supliment. Notă: tema de test din 12.10.2026 nu include blocul de disclaimer; meta-descrierile de produs rescrise pe live evită deja afirmațiile de sănătate neconforme UE.

**Cum verificăm (falsificabilitate):** un evaluator care aplică criteriile QRG YMYL „Lowest” ar găsi pagini care dau sfaturi medicale fără calificare; absența disclaimerului este o verificare binară.

**Indicator timpuriu:** % de articole/produse cu blocul de disclaimer (țintă 100%); numărul de expresii „tratează/vindecă/previne boala” (țintă 0).

#### CONTENT-04 — Identitatea autorului este neverificabilă și inconsecventă intern; nu există pagină de autor; 18 articole au ca autor handle-ul magazinului

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | M | 0.9 |

**Dovezi:** Valorile câmpului Shopify `author`: „Marius Chera , Nutriționist Certificat” 325, „primesupplements1” 18 (handle-ul myshopify, ex. `vitamine-b12-90-zile-vitamina-d3-k2`, `ceai-diuretic-sfatul-medicului-cauze-retentie-apa`, `psv-nac-administrarea-n-acetilcisteinei-dimineata-seara`, `tricou-sala-cele-mai-bune-tricouri-yoga`, `crema-orez-transforma-antrenamente-crema-orez-blueberry`), „Marius Chera” 10, „Sorin Cristea” 2 (fără nicio biografie pentru Sorin Cristea). Tema tipărește `article.author` ca text simplu (`snippets/blog-post-card.liquid` linia 86, `article-banner`): fără link, nicio pagină de autor în `pages.json`. Acreditarea „Nutriționist Certificat” apare în 336 corpuri și 325 câmpuri de autor, dar nicăieri nu se dă emitentul, numărul, anul sau instituția; pagina Despre noi îl descrie pe Marius Chera doar ca „unul dintre cei mai cunoscuți antrenori de culturism”, niciodată ca nutriționist. Faptele din bio derivă între generații de boilerplate: „18 ani de experiență” (346 corpuri) vs „15 ani experiență” (3, articolele 2025 re-ștampilate în martie 2026); „8 NPC PRO Cards” (340) vs „10 NPC PRO Cards” (8); „Lector la cursurile de instructori din cadrul FRCF” (333) absent de pe pagina Despre noi; `Person.jobTitle` încorporat are 6 valori diferite („Antrenor de culturism și nutriționist sportiv” 47, „Expert Nutriție Sportivă și Biohacking” 42, „Expert Nutriție Sportivă & Biohacking” 41, „Expert Nutriție Sportivă & Antrenor Culturism” 35, „Nutriționist Sportiv & Antrenor Culturism” 12, placeholder „Professional title based on niche” 26). Două entități Article cu autori diferiți pe aceeași pagină: Article-ul BlogGenAuto spune `author: Person "Marius Chera , Nutriționist Certificat"`, iar `schema-article` al temei (randat în `<main>` de `main-article.liquid`) spune `author: Organization "Prime Supplements"` (`article-2026-citicolina.html`). Faptele despre companie se contrazic: Despre noi și bio spun „conceput în anul 2022” (J32/1155/2022 confirmă); Organization JSON-LD de pe homepage spune `"foundingDate": "2020"` (`$R/home.html`). Caseta de autor este boilerplate identic în 345 articole („Specializat în online coaching, aplică tehnici de Biohacking și Anti-aging...” verbatim în 345; 333 și 325 pentru celelalte două propoziții).

**Impact / pagini afectate:** toate cele 355 articole; pagina Despre noi; entitatea Organization.

**Recomandare:** Deja făcut (live): 17 articole cu autorul „primesupplements1” au fost re-atribuite lui „Marius Chera” (specialistul a numărat 18 valori, inclusiv ciorna nepublicată în engleză — de confirmat că niciun articol publicat nu mai are acest autor). Gata în tema de test: `schema-article.liquid` emite un singur Article cu `author` de tip Person (Marius Chera, jobTitle), publisher, image, wordCount. Pregătit, în așteptarea importului (Matrixify): `blog-cleanup/clean.py` normalizează caseta de autor la o singură bio în 349 corpuri (`author_bio_normalised: 349`), repară linkul autorului către `/pages/despre-noi` (11) și alt-ul fotografiei (346), iar eliminarea JSON-LD-ului încorporat face să dispară cele 26 `jobTitle` placeholder. Rămâne proprietarului: 1. Creează `/pages/marius-chera` (pagină de autor): fotografie, nume complet, acreditarea exactă cu emitent și an („Nutriționist certificat – [instituție], [an], certificat nr. ...”), dovada rolului de lector FRCF, palmares, sportivi antrenați cu clasări verificabile, apariții media, LinkedIn/Instagram și o declarație „Cum scriem articolele” (redactare asistată AI + revizie umană + politică de surse); adaugă `Person` JSON-LD cu `sameAs`, `jobTitle`, `alumniOf`/`hasCredential`. 2. Temă: în `snippets/article-banner.liquid` / `blog-post-card.liquid` înfășoară `{{ article.author }}` în `<a href="/pages/marius-chera" rel="author">`; scoate acreditarea din șirul de autor (setează autorul Shopify „Marius Chera” pe toate cele 325+10 articole) și randează acreditarea de pe pagina de autor. 3. Atribuie cele 2 articole „Sorin Cristea” unui revizor real sau adaugă o bio pentru Sorin Cristea. 4. O singură bio canonică cu un singur set de fapte (ani, carduri, rol de lector); corectează `foundingDate` la 2022 în `snippets/schema-organization.liquid` (varianta din tema de test adaugă legalName, taxID, telefon, adresă — de verificat și anul).

**Cum verificăm (falsificabilitate):** dacă acreditările ar fi verificabile, un cititor ar putea găsi organismul emitent; azi nicio pagină de pe site nu numește unul.

**Indicator timpuriu:** pagina de autor live și linkată din 100% din byline-uri; 0 articole cu autorul „primesupplements1”; o singură variantă de bio.

#### CONTENT-05 / CLUSTER-04 — Canibalizare tematică în fiecare hub: serii regenerate și clustere ancorate pe produs concurează pentru aceeași intenție (26 grupuri intenție×hub cu ≥4 articole)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | L | 0.85 |

**Dovezi:** (ambii specialiști High.) `content`: 42 handle-uri se termină în -2/-3/-4/-5 și formează 28 serii regenerate, fiecare legată de un produs și un prompt, ex. `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara` ×5 (2026-03-12 → 2026-09-13; titluri „Cum să iei Creatină în Călătorii”, „Creatina în Călătorii: Așteptări Realiste”, „De ce Strategia ta de Creatină Eșuează”, „Cum să Maximizezi Antrenamentele de Toamnă cu Creatina”), `creatine-benefits-creatina-monohidrat-...` ×4, `creatine-gummies-creatina-monohidrat-...` ×4, `before-and-after-creatine-creatine-ready-to-go-plicuri` ×4, `acetyl-l-carnitine-l-carnitine-1000-80-caps` ×4 și 23 perechi precum `instant-oat-cream-800g-25-serv-mindful-eating-practices` („Mâncatul conștient cu ovăz: Tot ce trebuie să știi în 2026”) vs `-2` („Alimentația conștientă cu ovăz: Tot ce trebuie să știi în 2026”), `fiber-blood-orange-building-balanced-meals` („Secretele Absorbției Fibrelor: Cum să obții cu 40% mai multă energie”) vs `-2` („...cu 50% Mai Multe Beneficii”). La nivel de titlu: 68 titluri despre creatină, 44 despre fibre/ovăz/cremă de orez, 35 despre L-carnitină/arzătoare/slăbit, 26 BCAA/EAA, 24 proteină/izolat/gainer; 47 grupuri de 3 cuvinte-cheie acoperă 164 articole; 719 perechi de titluri cu similaritate > 0,6; prefixul „De ce strategia ta de ...” este folosit de 9 ori, „6 semne că ai nevoie ...” de 4 ori. Ancore de produs în handle: instant-oat-cream-800g-25-serv 22 articole, fiber-blood-orange 21, creatina-monohidrat-micronized-300g-fara 18, creatina-creapure 18, creatine-ready-to-go-plicuri 16, thermo-core 16, magneziu 14, prime-whey 12, eaa-aminoacizi 12, recovery-glutamin 12, l-carnitine-1000 11, water-out 11, recovery-bcaa-500g 11. Textele nu sunt copii (Jaccard max 0,083), deci problema este „multe pagini pentru o interogare”; blogul nu are hub-uri care să dezambiguizeze (346/355 fără taguri). `cluster`: grupurile `primary_keyword_guess` din `catalog-analysis.md` („de ce strategia” 9, „cum sa stii” 8, „protocolul complet de” 8, „6 semne ca” 8, „dozajul optim de” 7...) sunt primele cuvinte ale titlurilor șablonate și amestecă produse fără legătură (ex. „de ce strategia” conține zinc, gainer, taurină, fibre, water-out, omega-3, ficat, creatină). Regruparea pe entitate-temă × intenție dă seturile reale de canibalizare (≥4 articole): prime-health „semne că ai nevoie” 8, intra-workout „hidratare” 7, aminoacizi „semne” 6 / „combinații” 6 / „rezultate în N zile” 6 / „dozaj” 4, arzător-de-grăsimi „rezultate” 6 / „semne” 5 / „calitate ieftin vs premium” 5, prime-health „rezultate” 5 / „când se ia” 4, cremă-de-orez „calitate” 5 / „rutină matinală” 4 / „semne” 4, vitamine „rezultate” 4, plus cele 11 grupuri de creatină din CLUSTER-03. Perechi concrete în afara creatinei: `fat-burner-thermo-core-120-caps-weight` („Secretele arzătoarelor de grăsimi: 40% mai multă eficiență”) vs `fat-burner-fat-burning-booster-weight-loss-2` („...50% Mai Multă Eficiență prin Abonamente”); `l-carnitine-thermo-core-120-caps-travel` vs `l-carnitine-1000-80-caps-travel-weight-loss-tips` (ambele „ieftin vs premium ... în vacanță”); `l-carnitine-fat-burning-booster-meal-replacement` vs `l-carnitine-thermo-core-120-caps-meal` (ambele „Rutina matinală cu arzătoare de grăsimi”); `fat-burner-pareri-water-out-120-caps-motivation` vs `-2`; `l-glutamina-eaa-aminoacizi-esentiali-bioavailability-why` vs `l-glutamina-recovery-bcaa-500g-bioavailability-why` („Greșeala de absorbție a aminoacizilor pe care 85% o fac”, similaritate titlu 0,86); `instant-oat-cream-800g-25-serv-whole-foods-vs-processed-compa` vs `-2`; `fiber-blood-orange-building-balanced-meals` vs `-2`.

**Impact / pagini afectate:** ≥164 articole în grupuri suprapuse (~73 doar despre creatină); ~160 articole în afara hub-ului creatină; la nivel de blog 355 → ~110-130 spoke-uri supraviețuitoare.

**Recomandare:** Deja făcut (live): titlurile SEO ale celor 354 articole au fost rescrise cu o singură temă fiecare, deci cele 47 grupuri canibalizante au acum titluri diferențiate în SERP. Pregătit (decizie editorială a proprietarului, neexecutat): harta de consolidare cu 301 din constatările `cluster` (CLUSTER-03/05/12/13 și planul hub-and-spoke). Regula aplicată: un articol per (hub × intenție), cu intenția în {ce este/beneficii, dozaj & când se ia, efecte secundare/contraindicații, rezultate & cât durează, cum alegi/calitate, combinații, pe vârste, călătorii, ghid produs X}; înainte de ștergere, extrage GSC „Pages” pe ultimele 3 luni și păstrează URL-ul cu clicuri când grupul are vreunul. Harta `content` (supraviețuitor = cel mai complet / cel mai linkat; restul 301 către el; faptele unice se mută în supraviețuitor):

| Cluster (articles today) | Pillar to keep/create | Spokes to keep (max) | Merge/301 |
|---|---|---|---|
| Creatină (73: monohidrat 18, Creapure 18, Ready-to-Go 16, generic 21) | "Creatină monohidrat: ghid complet (dozare, timing, siguranță, mituri)" | dozare & încărcare; dimineața vs seara; pauze/ciclare; creatină în călătorii; creatină și hidratare/retenție; efecte secundare & rinichi; Creapure vs monohidrat; creatină pe vârste; creatină pentru femei (9) | gymbeam-creatine ×5 → 1 "călătorii"; creatine-benefits ×4 + creatine-gummies ×4 → timing/rutină; before-and-after ×4 + creatine-side-effects ×3 → siguranță/rezultate; remaining ~50 → pillar |
| Fibre (21 fiber-blood-orange) | "Fibre prebiotice (inulină + acacia): ghid" | digestie/balonare; glicemie & pofte; energie; antiinflamator; buget; combinații (6) | all 7 "-2" pairs → base; ~8 others → pillar |
| Ovăz instant (22) | "Crema de ovăz instant: ghid de utilizare" | mic dejun/rutină; rețete; digestie (3) | 7 pairs → base; rest → pillar |
| Arzătoare & L-carnitină (47: thermo-core 16, l-carnitine 11, fat-burning-booster 10, pareri 10) | "Arzătoare de grăsimi: ce funcționează (și ce nu)" + "L-carnitină: doză, timing, rezultate" | ieftin vs premium; pe vârste; 8/12 săptămâni jurnal; combinații; monitorizare (5) | acetyl-l-carnitine ×4, l-carnitine-pareri ×3, l-carnitine-15-reducere ×3, acetyl-15-reducere ×3, fat-burner ×2, x10-pareri ×2 → spokes |
| Water Out / retenție (11 + 2 diuretic) | "Retenția de apă: cauze și diuretice naturale" | contraindicații; sportivi/definire (2) | fat-burner-pareri-water-out ×2 → pillar |
| Glutamină (16), BCAA/EAA (25), Taurină (10), Magneziu (14), Zinc (7), NAC (9), Whey/Isolate/Gainer (19) | one pillar each | 2-3 each | rest → pillar |

Țintă: ~120-140 articole supraviețuitoare (planul `cluster`: ~105 păstrate + ~21 noi = ~126 spoke-uri pe 12 hub-uri, ~225 URL-uri cu 301, 1 ciornă ștearsă). Schimbă handle-urile doar la comasare (Shopify creează automat redirectul când „Create a URL redirect” este bifat la schimbarea handle-ului).

**Cum verificăm (falsificabilitate):** GSC „Queries” pentru ex. „creatina in calatorii” arată azi mai multe URL-uri /blogs/news/ alternând; după consolidare un singur URL trebuie să țină afișările. Numărul de perechi de titluri cu similaritate > 0,6 (719 în `catalog-analysis.md`) scade sub 100.

**Indicator timpuriu:** numărul de URL-uri /blogs/news/ care primesc afișări pentru aceeași interogare principală (țintă 1); articole cu ≥1 clic / total; numărul de interogări GSC cu 2+ URL-uri de blog clasate tinde la 0; poziția medie a URL-ului păstrat se îmbunătățește după așezarea 301-urilor (4-8 săptămâni).

#### CLUSTER-03 — Clusterul creatină: 78 articole (115.757 cuvinte) pentru 3 produse acoperă ~15 intenții, fiecare scrisă de 3-11 ori

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | L | 0.9 |

**Dovezi:** Gruparea titlu-intenție peste cele 78 articole din hub-ul creatină (scratchpad `cluster/intent_groups.json`): „rezultate în N zile/săptămâni” 11, „semne că ai nevoie de creatină” 7, „calitate/puritate/ieftin vs premium” 7, „dimineața sau seara / când se ia” 7, „stagnare/plafonare a forței” 6, „pe vârste / după 40 de ani” 6, „călătorii/deplasare” 5, „hidratare + creatină” 5, „rutină de dimineață” 5, „pauză de creatină” 3, „absorbție” 3. Cvasi-duplicate literale: `creatina-si-volumizarea-musculara-cum-sa-stii-daca-creatina` („Cum să știi dacă creatina este potrivită pentru tine: Ghid 2026”) vs `monohydrate-creatine-cum-sa-stii-daca-creatina` („...potrivită pentru tine în 2026”), raport titlu 0,96; `before-and-after-creatine-creatina-monohidrat-micronized-300g-fara` („Momentul optim pentru doza de creatină: Dimineața sau seara în 2026?”) vs `creatine-gummies-creatina-monohidrat-micronized-300g-fara-4` („Momentul Optim pentru Creatină: Dimineața sau Seara în Sezonul 2026?”) vs `creatine-monohydrate-cand-sa-iei-creatina-dimineata` („Dimineața vs Seara: Când să iei creatină...”); `creatine-kinase-creatina-creapure-future-trends-in` („Greșeala de Puritate ... 85%”) vs `-2` („Greșeala de dozare ... 85%”). WebSearch pentru „cand se ia creatina dimineata sau seara” arată un SERP slab (forum.softpedia + pagini spam în engleză): o singură pagină românească consolidată poate ranka, trei nu.

**Impact / pagini afectate:** 78 articole → păstrează 17 spoke-uri, re-atribuie 7 altor hub-uri, 301 pentru ~54.

**Recomandare:** Pregătit, neexecutat (decizie editorială): harta de consolidare de mai jos (păstrat = cele mai multe linkuri de intrare / cel mai recent / handle românesc; mută secțiunile unice din cele redirecționate; 301 prin Shopify „URL redirects”; păstrează handle-ul articolului menținut sau redenumește-l cu opțiunea de auto-redirect):

| Intent (spoke keyword) | KEEP | 301 -> keep |
|---|---|---|
| când se ia creatina (dimineața/seara) | `creatine-monohydrate-cand-sa-iei-creatina-dimineata` | `before-and-after-creatine-creatina-monohidrat-micronized-300g-fara`, `creatine-gummies-creatina-monohidrat-micronized-300g-fara-4`, `creatine-benefits-creatina-monohidrat-micronized-300g-fara-2`, `magneziu-creatina-creapure-morning-vs-evening`, `creatina-si-volumizarea-musculara-rutina-dimineata-creatina-optimizare-sezoniera` |
| dozaj optim creatina | `best-creatine-monohydrate-dozaj-optim-creatina-rezultate-2026` | `creatine-kinase-creatina-creapure-future-trends-in-2`, `creatine-monohydrate-side-effects-cum-sa-iei-corect-suplimentele` |
| când apar rezultatele | `creatina-si-volumizarea-musculara-cand-apar-rezultate-creatina-30` | `creatine-pastile-creatina-monohidrat-micronized-300g-fara`, `before-and-after-creatine-creatine-ready-to-go-plicuri-2` |
| pauza de creatina | `pure-creatine-cand-sa-iei-pauza-de` | `gymbeam-creatine-creatine-ready-to-go-plicuri`, `creatine-side-effects-creatine-ready-to-go-plicuri-2` |
| semne că ai nevoie / e potrivită | `creatina-si-volumizarea-musculara-cum-sa-stii-daca-creatina` | `monohydrate-creatine-cum-sa-stii-daca-creatina`, `creatine-benefits-creatina-creapure-understanding-dosage-recommend`, `creatine-monohydrate-semne-corp-nevoie-creatina-hidratare`, `creatine-kinase-creatina-creapure-understanding-dosage-recommend`, `creatine-side-effects-creatina-creapure-signs-your-body` |
| creatina ieftina vs Creapure (calitate, etichete) | `creatine-pastile-creatina-creapure-seasonal-supplementation-adjus` | `creatine-kinase-creatina-creapure-future-trends-in`, `before-and-after-creatine-creatina-creapure-bioavailability-why-absorption`, `creatina-si-volumizarea-musculara-de-ce-calitatea-creatinei-conteaza`, `creatine-side-effects-creatine-ready-to-go-plicuri`, `monohydrate-creatine-benefits-secrete-etichete-creatina-eficienta-maxima`, `creatine-kinase-creatina-creapure-bioavailability-why-absorption` |
| tipuri de creatina (pudra/plicuri/pastile) | `creatine-pastile-creatine-ready-to-go-plicuri` | `creatine-side-effects-creatine-ready-to-go-plicuri-3`, `creatine-ready-to-go-plicuri-prime-supplements-how-to-transition-between-supp` |
| creatina si hidratare | `creatine-monohydrate-creatina-monohidrat-micronized-300g-fara` | `creatine-benefits-creatina-monohidrat-micronized-300g-fara-3` |
| creatina in calatorii | `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara` (12 inbound; rename to `creatina-in-calatorii`) | `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-3`, `creatine-kinase-creatine-ready-to-go-plicuri` |
| stagnarea fortei / plafonare | `creatine-creatina-creapure-combining-supplements-with` (11 inbound) | `creatina-si-volumizarea-musculara-stagnarea-fortei-cand-sa-ceri`, `creatine-pastile-creatina-creapure-how-to-evaluate`, `creatine-pastile-creatina-creapure-combining-supplements-with`, `creatine-pastile-creatina-creapure-how-to-read`, `micronized-creatine-monohydrate-plafonare-fizica-creatina-combinatii-suplimente`, `monohydrate-creatine-5-semne-stagnare-forta-creatina`, `creatine-gummies-creatina-creapure-how-to-read`, `creatine-gummies-creatina-monohidrat-micronized-300g-fara-2` |
| creatina pe varste / dupa 40 | `creatine-powder-de-ce-nu-vezi-rezultate` | `creatine-kinase-creatina-creapure-supplements-and-food`, `creatine-monohydrate-creatina-creapure-how-to-evaluate`, `creatine-benefits-creatina-monohidrat-micronized-300g-fara`, `creatine-gummies-creatina-monohidrat-micronized-300g-fara-3` |
| cum combini creatina | `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-2` (rename `cum-combini-creatina`) | `creatine-gummies-creatina-monohidrat-micronized-300g-fara` ("de ce esueaza rutina"), `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-4`, `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-5` |
| creatina masa musculara / forta: mituri | `creatine-side-effects-creatina-monohidrat-micronized-300g-fara` | `creatine-benefits-creatina-monohidrat-micronized-300g-fara-4`, `creatina-si-volumizarea-musculara-ce-iau-expertii-forta-mituri`, `omega-3-creatina-monohidrat-micronized-300g-fara`, `creapure-creatine-monohydrate-moduri-maximizare-forta-creatina-alimente`, `creatine-monohydrate-creatina-performanta-stiinta-2026` |
| termen lung / depozitare | `creatine-ready-to-go-plicuri-prime-supplements-budget-smart-supplementation-s` | `...-budget-smart-supplementation-s-2`, `creatine-gummies-creatine-ready-to-go-plicuri` |
| absorbtie | `creatina-si-volumizarea-musculara-secretele-absorbtiei-creatinei-optimizare-rezultate` | — |
| product spoke: Creapure | `creatine-monohydrate-creatina-creapure-signs-your-body` | `creatine-monohydrate-creatina-creapure-debunking-common-supplement` (unpublished EN draft: delete) |
| product spoke: Ready To Go plicuri | `creatine-ready-to-go-plicuri-prime-supplements-how-to-store-supplements-prope` | `before-and-after-creatine-creatine-ready-to-go-plicuri-4`, `before-and-after-creatine-creatine-ready-to-go-plicuri`, `before-and-after-creatine-creatine-ready-to-go-plicuri-3`, `creatine-ready-to-go-plicuri-prime-supplements-supplements-for-seasonal-welln` |
| re-assign to other hubs | `creatina-monohidrata-baton-proteic-capsuni-how-to` -> batoane; `creatina-monohidratata-nac-80-caps-debunking-common`, `creatina-liver-protect-500-ml-understanding` -> prime-health; `creatina-monohidrata-nitrox-no-stim-combining-supplements` -> pre-workout; `creatina-monohidratata-crema-de-orez-biscuiti-cu` -> crema-de-orez; `creatina-pure-isolate-2000g-most-common` -> pudra-proteica; `creatina-citrulina-intraworkout-90-zile-carbohidrati-intra-workout` -> intra-workout | |

Pilonul: colecția `/collections/creatina` cu ghidul `seo_text` (CONTENT-08 / CLUSTER-01) linkând cele 17 spoke-uri; fiecare spoke linkează hub-ul cu ancora „creatină monohidrată” / „creatină Creapure” și 2-3 spoke-uri surori. Spoke-uri de creat: `creatina-efecte-secundare` (niciun articol RO nu răspunde direct) și `creatina-prime-vs-gymbeam` (comparație comercială).

**Cum verificăm (falsificabilitate):** după redirecturi, `site:primesupplements.ro "dimineața sau seara" creatină` trebuie să returneze un singur URL de blog; CSV-ul de redirecturi trebuie să conțină ~54 rânduri cu surse `/blogs/news/` care răspund 301 (verificare cu `curl -sI`).

**Indicator timpuriu:** interogarea GSC „cand se ia creatina” arată un singur URL cu poziție în creștere în 6-8 săptămâni; raportul de canibalizare (interogări cu >1 URL clasat) pentru „creatin*” scade la 0.

#### CLUSTER-05 — 42 handle-uri terminate în -2/-3/-4/-5 sunt regenerări ale aceluiași brief produs × unghi și trebuie comasate în articolul de bază

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | M | 0.9 |

**Dovezi:** `catalog-analysis.md` „All numeric-suffix handles” (42) și „Numeric-suffix handles vs their base article”: Jaccard pe corp 0,008-0,065 (textele sunt rescrise, nu copiate), dar brief-ul este identic: `instant-oat-cream-800g-25-serv-*` ×10 regenerări (healthy-cooking-methods, healthy-eating-for-busy-people, mindful-eating-practices, seasonal-eating-benefits, gut-healthy-food-choices, healthy-food-swaps-that-work, whole-foods-vs-processed-compa...), `fiber-blood-orange-*` ×8, `creatine-benefits-creatina-monohidrat-...` -2/-3/-4, `creatine-gummies-...` -2/-3/-4, `gymbeam-creatine-...` -2/-3/-4/-5, `before-and-after-creatine-creatine-ready-to-go-plicuri` -2/-3/-4, `acetyl-l-carnitine-l-carnitine-1000-80-caps` -2/-3/-4, `acetyl-l-carnitine-15-reducere-pachet-thermo-core` -2/-3, `l-carnitine-15-reducere-pachet-thermo-core` -2/-3, `l-carnitine-pareri-l-carnitine-1000-80-caps` -2/-3, `creatine-side-effects-creatine-ready-to-go-plicuri` -2/-3, `fat-burner-pareri-water-out-120-caps-motivation-2`, `fat-burner-fat-burning-booster-weight-loss-2`, `fat-burner-x10-pareri-fat-burning-booster-weight-loss-2`, `creatine-kinase-creatina-creapure-future-trends-in-2`, `creatine-ready-to-go-plicuri-prime-supplements-budget-smart-supplementation-s-2`. Shopify adaugă `-2` doar când generatorul retrimite același handle, adică BlogGenAuto a rulat același brief de 2-5 ori. Cauza: coada de cuvinte-cheie a aplicației a fost re-rulată lunar (vârfuri 2026-05: 127, -06: 71, -07: 27, -08: 29, -09: 31). Aceleași 42 handle-uri sunt citate și de `content` în CONTENT-05 / CLUSTER-04.

**Impact / pagini afectate:** 42 articole (~62.000 cuvinte) care concurează direct cu articolul lor de bază.

**Recomandare:** Inclus în harta de consolidare pregătită (neexecutată). Pentru fiecare serie păstrează handle-ul de bază (sau cel cu cele mai multe linkuri de intrare, ex. `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara` are 12), mută orice H2 unic în el, apoi 301 de la handle-urile cu sufix la cel păstrat. Import CSV în Shopify Admin > Navigation > URL redirects (`Redirect from,Redirect to`). Pune pe pauză / dezinstalează coada de auto-publicare BlogGenAuto înainte, altfel luna viitoare apare `-6`.

**Cum verificăm (falsificabilitate):** `grep -c -- '-[2-5]$' <(curl -s https://primesupplements.ro/sitemap_articles_1.xml | grep -o 'blogs/news/[^<]*')` returnează 0 după schimbare; toate cele 42 URL-uri vechi răspund 301.

**Indicator timpuriu:** paginile de blog din sitemap scad imediat de la 354 la ~310; GSC „Pages” arată mai puține „Duplicate, Google chose different canonical”.

#### CLUSTER-12 — Glutamină: 16 articole pentru un singur produs (`recovery-glutamin`), 4 dintre ele sub prefixul `glutamina-si-sanatatea-stomacului-` deși niciunul nu este despre sănătatea stomacului

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | M | 0.85 |

**Dovezi:** `glutamina-si-sanatatea-stomacului-efecte-secundare-glutamina-ghid-complet` („Efecte secundare glutamină”), `...-suplimente-recuperare-virste-glutamina-2026` („Suplimentele de recuperare pe vârste”), `...-cand-sa-iei-glutamina-semne` („Când să iei glutamină”), `...-combinatii-glutamina-suplimente-2026-etape` („Combinații de glutamină”) + 12 articole `*-recovery-glutamin-*` (`glutamina-recovery-glutamin-signs-your-body` „6 Simptome Ascunse ale Recuperării Lente”, `l-glutamina-beneficii-recovery-glutamin-future-trends-in` „6 Semne că recuperarea ta are nevoie de glutamină”, `aminoacizi-esentiali-recovery-glutamin-morning-vs-evening` „Când să Iei Glutamina”, `taurina-recovery-glutamin-supplements-and-hydration` „Când se ia glutamina pentru hidratare”, `bcaa-recovery-glutamin-how-to-store` „depozitare a glutaminei”, `bcaa-recovery-glutamin-natural-vs-synthetic`, `taurina-beneficii-recovery-glutamin-debunking-common-supplement` „calitatea glutaminei”...). Trei dintre ele răspund la „când să iei glutamina”. Interogarea reală „glutamina si sanatatea stomacului / glutamina intestin” (singurul unghi intestinal pe care SERP-ul îl cere, cf. rezultatul darwin-nutrition) nu este acoperită de niciunul dintre cele patru.

**Impact / pagini afectate:** 16 articole → păstrează 4.

**Recomandare:** Inclus în planul de consolidare (neexecutat). Păstrează: `glutamina-si-sanatatea-stomacului-efecte-secundare-glutamina-ghid-complet` (redenumire `glutamina-efecte-secundare`), `glutamina-si-sanatatea-stomacului-cand-sa-iei-glutamina-semne` (redenumire `cand-se-ia-glutamina`, comasează `aminoacizi-esentiali-recovery-glutamin-morning-vs-evening` + `taurina-recovery-glutamin-supplements-and-hydration` + `glutamina-recovery-glutamin-signs-your-body` + `l-glutamina-beneficii-recovery-glutamin-future-trends-in`), `glutamina-si-sanatatea-stomacului-combinatii-glutamina-suplimente-2026-etape` (redenumire `glutamina-combinatii`) și scrie un spoke nou `glutamina-pentru-intestin-si-digestie` (interogarea reală). 301 pentru restul de 12 către cel mai apropiat spoke păstrat; `bcaa-recovery-glutamin-how-to-store` → pagina de produs `/products/recovery-glutamin`.

**Cum verificăm (falsificabilitate):** `grep -c glutamin sitemap_articles_1.xml` ≤ 5.

**Indicator timpuriu:** GSC: interogările „glutamina” se mapează la câte un singur URL.

#### CLUSTER-13 — Seria „protein-a” / „protine”: spoke-urile cele mai linkate ale hub-ului pudră proteică au handle-uri cu cuvântul-cheie scris greșit, iar hub-ul nu are un spoke-pilon „izolat vs concentrat” / „cum alegi proteina” linkat

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | PENDING (acțiune proprietar) | S | 0.8 |

**Dovezi:** `protein-a-ghid-izolat-proteic-performanta-2026` (9 linkuri de intrare), `protein-a-cum-sa-stii-daca-timing`, `protine-whey-isolate-refacere-musculara-semne-deficit-proteic` (13 linkuri de intrare, cel mai linkat articol din blog), `proteina-cum-alegi-pudra-proteica-calitate`. „protein-a” și „protine” sunt erori de tokenizare ale lui „proteina”. Articolul scris de om `protein-izolat-vs-concentrat-proteic-ghid` (1.552 cuvinte, 2026-08-19) țintește singura interogare al cărei SERP este slab (WebSearch „izolat proteic vs concentrat proteic”: primele rezultate sunt blogurile B2B nutrada.com în 7 limbi și nakednutrition.com/pl), dar are 0 linkuri de intrare. Intenția „timing” este scrisă de 3 ori (`protein-a-cum-sa-stii-daca-timing`, `whey-isolate-proteina-prime-whey-go-protein-timing`, `whey-protein-isolate-rutina-matinala-...`).

**Impact / pagini afectate:** 31 articole pudră proteică → păstrează 10.

**Recomandare:** Inclus în planul de consolidare (neexecutat). Redenumește cele două handle-uri greșite cu redirect (`ghid-izolat-proteic`, `semne-deficit-proteic`); promovează `protein-izolat-vs-concentrat-proteic-ghid` ca spoke de vârf al hub-ului, linkat din textul colecției și din fiecare spoke de proteină păstrat; păstrează un singur articol de timing (`whey-isolate-proteina-prime-whey-go-protein-timing`, redenumit `cand-se-ia-proteina`) și 301 pentru celelalte două; de creat `cata-proteina-pe-zi-masa-musculara`.

**Cum verificăm (falsificabilitate):** niciun handle care să corespundă `^protein-a-|^protine-`.

**Indicator timpuriu:** URL-ul `izolat-vs-concentrat` câștigă afișări pentru „izolat vs concentrat” în 6 săptămâni.

#### CONTENT-06 — Descrieri de produs lipsă sau subțiri: 102 produse sub 50 de cuvinte, inclusiv produsul cel mai linkat din blog

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | L | 0.95 |

**Dovezi:** (`products-all.json`, `descriptionHtml` brut) 102/185 produse < 50 cuvinte, 119 < 150, 140 < 300; mediana MNX apparel 0 cuvinte (80/100 produse MNX au descriere goală; informații despre material/mărime pe doar 19/100); mediana suplimente 303. Suplimente cu descriere goală/aproape goală: `nitrox` (0 cuvinte), `creatina-monohidrat-micronized-300g-fara-aroma` (0 cuvinte; este produsul linkat din 25 de articole), `prime-shaker-customised` 0, `instant-drink-frutilu-watermelon-10g` 0, `-pineapple-10g` 0, `frutilu-instant-drink-strawberry-10-g` 0, `-sport-red-orange-10-g` 0, `instant-drink-frutilu-green-apple-10g` 19, `-ice-tea-peach-10g` 23, `-ice-tea-lemon-10g` 23, `pachet-mix-arome-...-set-degustare` 14, `unt-de-caju` 37, `sapca-prime` 31, `prosop-negru` 55, `scortisoara-ceylon-bio-200g` 88. Lacune de structură pe cele 85 suplimente: ingrediente 36, valori nutriționale 32, dozaj 28, avertismente 15, disclaimer 11, text de beneficii 46. 12 descrieri *încep* cu „Mod de administrare”/„Ingrediente”, așa că, la 104 produse fără meta-descriere SEO, meta cădea pe textul de dozaj (live la audit: `product.html` `<meta name="description" content="Mod de administrare După cum este necesar în ceea ce privește compoziția di...">`). Încredere la nivel de pagină: HTML-ul de produs are 0 apariții pentru „Valori nutritive”, „Avertismente”, „ANSVSA”, lot/expirare, TUV/IFS/HALAL (certificările sunt revendicate doar pe pagina Despre noi).

**Impact / pagini afectate:** 102 produse sub 50 de cuvinte (89 MNX, 13 suplimente); 85 suplimente pentru lacunele de structură. Produsele cu 0 cuvinte nu pot ranka decât pe nume.

**Recomandare:** Deja făcut (live): simptomul meta-descrierii a dispărut — toate cele 195 produse au `seo.description` rescrisă (120-158 caractere) și `productType` + categorie din taxonomia Shopify setate. Descrierile propriu-zise rămân de scris. Adoptă un șablon per tip și completează prin metafield-uri, astfel încât tema să randeze tab-uri consecvente (`snippets/product-info.liquid` are deja blocuri pliabile): Suplimente: Ce este & pentru cine (60-80 cuvinte) → Beneficii (doar afirmații autorizate UE) → Ingrediente + tabel nutrițional per porție (metafield `custom.nutrition_table`, rich text sau JSON) → Mod de administrare → Avertismente → Certificări (link către PDF-urile certificatelor) → FAQ 3-5 (din clusterul de articole) → meta-descrierea SEO scrisă separat (niciodată dozaj). MNX apparel: material & gramaj, croi/fit, înălțimea modelului/mărimea purtată, îngrijire, mărimi + ghid de mărimi, origine/producție, 80-150 cuvinte + un prim paragraf unic per model (variante de culoare: vezi CONTENT-07). Ordinea priorității: creatina-monohidrat-micronized-300g-fara-aroma, nitrox, cele 4 arome Frutilu goale, apoi cele 80 pagini MNX goale.

**Cum verificăm (falsificabilitate):** produsele cu descriere de 0 cuvinte nu pot ranka decât pe nume; afișările GSC pentru acele handle-uri vor fi aproape zero.

**Indicator timpuriu:** produse < 150 cuvinte (țintă 0); produse cu tabel nutrițional (țintă 85/85).

#### CONTENT-07 — Conținut de produs duplicat și cvasi-duplicat (variante publicate ca produse separate, descrieri clonate)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.85 |

**Dovezi:** Descrieri identice: `prime-whey-1000g`, `prime-whey-2000g`, `prime-whey-go` (aceleași primele 400 de caractere); `mnx-hoodie-industrial-bronze` = `mnx-hoodie-industrial-dusty-rose`. 19 grupuri de titluri cvasi-duplicate / 45 produse: culorile MNX (`mnx-extra-t-shirt-basic-black/-grey/-white`, `mnx-workout-top-hammer-3-0-white/-black/-grey`, `mnx-ribbed-shorts-hammer-black/-white/-grey`, ...) și aromele Frutilu (19 produse Frutilu; 14 dintre ele au descrieri de ~270-320 cuvinte după un singur șablon: „🥭 GUST INTENS DE MANGO • CU STEVIA • FARA ZAHAR...” vs „🥤 GUST INCONFUNDABIL DE COLA • CU STEVIA • FARA ZAHAR...”, aceeași ordine a secțiunilor „De ce sa alegi...”). Meta-descrieri SEO la audit: 31/81 se terminau cu un CTA de brand („Alegeți PRIME Supplements pentru produse de calitate superioară!” 12, „...pentru rezultate excelente!” 7, „...pentru rezultate optime!” 5, „Alegeți PRIME Apparel pentru calitate superioară!” 4, „...pentru produse de calitate!” 3); `metadata_template.py`: 19 semnalări `brand-suffix-in-description`, risc de site scăzut. Magazinul B2B republică aceleași handle-uri/descrieri (fapt din context), agravând duplicarea.

**Impact / pagini afectate:** 45 produse în grupuri de titluri + 5 cu descrieri clonate + 19 Frutilu.

**Recomandare:** Deja făcut (live): meta-descrierile SEO au fost rescrise pentru toate cele 195 produse (propoziția-CTA a dispărut), iar `vendor` este acum „MNX” pe 87 produse de îmbrăcăminte. Rămâne: (a) comasează culorile MNX într-un singur produs cu opțiunea Culoare (tema Impact suportă swatch-uri de culoare); dacă afacerea insistă pe produse separate, scrie un prim paragraf unic per culoare și setează `rel=canonical` către culoarea principală prin temă (`{% if product.metafields.custom.canonical_handle %}`); (b) la fel pentru aromele Frutilu sau diferențiază-le real (note de gust, caz de utilizare, diferențe de ingrediente, valori nutriționale per aromă); (c) rescrie cele trei descrieri Prime Whey în jurul mărimii/cazului de utilizare (1 kg încercare, 2 kg valoare, plicuri Go); (d) B2B: noindex/parolă pe magazinul b2b.primesupplements.ro (acțiune proprietar, vezi secțiunea tehnică).

**Cum verificăm (falsificabilitate):** Google alege un singur URL de culoare drept canonic pentru grup; intrările GSC „Duplicate, Google chose different canonical” pentru handle-urile MNX ar confirma.

**Indicator timpuriu:** numărul de URL-uri MNX/Frutilu raportate ca duplicate în GSC (țintă 0).

#### CONTENT-08 / CLUSTER-01 — Toate cele 23 pagini de colecție nu au conținut editorial: 0 cuvinte de hub pe 23/23 colecții, în timp ce o secțiune `seo_text` pregătită stă dezactivată în șablon

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | FIXED (live 12.10.2026) | M | 0.95 |

**Dovezi:** (ambii specialiști High.) La audit 23/23 colecții aveau descriere goală (doar „Bauturi” avea două cuvinte, „Bauturi Sport”); conținutul principal al paginilor de colecție era de 343-971 cuvinte doar din navigare + carduri de produs (`collection-creatina.html` 490 cuvinte, `collection.html` /pudra-proteica 517, `collection-reduceri.html` 343 cu 0 produse); `$R/pages/collection.html`, `collection-creatina.html`, `collection-haine-mnx.html`, `collection-all.html`: niciun element `collection__description` nu randa text („collection description text: NONE”); `schema-collection.liquid` emitea `"description": ""`. 8 colecții nu aveau nici titlu/descriere SEO. Cauza este de date, nu de temă: în `templates/collection.json` secțiunea `banner` (tip `collection-banner`) are `"show_collection_description": true`, deci textul introdus în Admin → Collections → Description se randează imediat; în plus secțiunea `rich_text_e4zxV9` (tip `rich-text`, poziția 7 în `order`) conține `"content": "{{ collection.metafields.custom.seo_text | metafield_tag }}"` și `"disabled": true` — cineva a construit cârligul pentru text de hub și nu l-a pornit niciodată. Rezultat la audit: 530k cuvinte de spoke-uri indicau spre piloni care nu conțineau decât un grid de produse; cuvântul-cheie-pilon al fiecărui cluster („creatina”, „pudra proteica”, „arzatoare de grasimi”, „aminoacizi”...) nu avea nicio pagină pe site care să-l explice.

**Impact / pagini afectate:** 13 hub-uri comerciale / 23 colecții (46 URL-uri cu /ro-hu/), paginile-categorie pentru fiecare interogare comercială (creatină, pudră proteică, arzătoare, aminoacizi, pre-workout...).

**Recomandare:** Verificare: `remediation-status.md` consemnează pe live titlu + descriere SEO rescrise pentru 23/23 colecții și o descriere `descriptionHtml` de 3 paragrafe cu fapte despre produse pe 17 colecții-categorie (`applied/collections-plan.json`). Confirmă în Admin → Collections că textul apare și pe front-end: `curl -s https://primesupplements.ro/collections/creatina | grep -c 'collection__description'` ≥ 1 și CollectionPage JSON-LD (în tema de test `schema-collection.liquid` emite CollectionPage + ItemList + BreadcrumbList) nu mai are `"description": ""`. Rămâne: (1) opțional, activează secțiunea `rich_text_e4zxV9` (`"disabled": false`, mutată sub `main` în `order`) și creează definiția de metafield `custom.seo_text` (rich text) pentru un ghid de 350-600 cuvinte per hub (ce este categoria, pentru cine, cum alegi — formă, doză, timing — cele 3-6 produse și 4-8 linkuri cu ancore-cheie către spoke-urile păstrate, CLUSTER-02/03); Liquid pentru randare doar când există text:

```liquid
{%- assign seo_text = collection.metafields.custom.seo_text | metafield_tag -%}
{%- if seo_text != blank -%}
<section class="container collection-seo-text prose"><h2 class="h3">Ghid {{ collection.title }}</h2>{{ seo_text }}</section>
{%- endif -%}
```

(2) Nu scrie text pentru `all`, `cele-mai-vandute`, `lansate-recent`, `11-tva`, `frontpage` (noindex,follow pregătit în tema de test); golește sau populează `reduceri` (0 produse). (3) Pentru `creatina` exemplul specialistului: „Creatina monohidrat Prime Supplements: Creapure® 500 g, monohidrat micronizat 300 g și plicuri Ready-to-Go. Dozare 3-5 g/zi, fără fază de încărcare obligatorie... [link la ghidul complet]” + „Cum alegi” + 3 FAQ sub grid (secțiune Impact „rich text”/„FAQ” în `templates/collection.json`).

**Cum verificăm (falsificabilitate):** dacă textul de categorie ar fi irelevant, paginile-categorie ale competitorilor (gymbeam.ro, proteinshop.ro) ar fi și ele fără text; ele au 200-600 cuvinte. Dacă după publicare `curl -s https://primesupplements.ro/collections/creatina | grep -c 'collection-seo-text'` este 0 sau CollectionPage JSON-LD încă are `"description": ""`, fix-ul nu a ajuns pe site.

**Indicator timpuriu:** colecții cu ≥150 cuvinte (țintă 13/13); afișări GSC pe interogări de categorie non-brand („creatina”, „pudra proteica”) pentru cele 13 URL-uri de colecție în 4-6 săptămâni; număr de cuvinte pe paginile de colecție > 300.

#### CLUSTER-02 — Hub-urile nu linkează spre spoke-urile lor: fiecare colecție arată aceleași 3 articole recente, deci hub-ul creatină linkează articole despre ovăz și L-carnitină și niciunul dintre cele 78 ale sale

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | M | 0.95 |

**Dovezi:** `templates__collection.json`, secțiunea `blog_posts_VYj9G8` (tip `blog-posts`, bloc `blog_TeK4Cm` cu `"blog": "news"`) randează cele mai noi postări ale singurului blog, fără filtru per colecție. Dovadă randată: `collection.html`, `collection-creatina.html`, `collection-haine-mnx.html`, `collection-all.html` conțin exact aceleași 3 href-uri de articol: `/blogs/news/l-carnitine-1000-80-caps-travel-weight-loss-tips`, `/blogs/news/instant-oat-cream-800g-25-serv-mindful-eating-practices-2`, `/blogs/news/omega-3-crema-de-orez-blueberry-muffin` (titlul „Ghiduri și sfaturi utile”). Homepage-ul arată aceleași 3. Deci linkuri hub→spoke = 0 pentru toate cele 13 hub-uri; regula obligatorie „pilonul linkează fiecare spoke” a modelului hub-and-spoke eșuează pentru 355/355 spoke-uri.

**Impact / pagini afectate:** 23 colecții, 355 articole.

**Recomandare:** Înlocuiește blocul generic cu o listă curatoriată per colecție. Creează metafield-ul `custom.guides` (tip `list.article_reference`, 4-8 articole per hub = spoke-urile păstrate din planul de cluster) și randează-l în secțiunea `blog-posts` existentă (fallback pe potrivire de tag). Notă: `blogs.news.articles` în Liquid este plafonat la cele mai noi 50 de articole, deci o buclă pe tag singură nu poate ajunge la un blog de 355 de articole — lista din metafield este necesară.

```liquid
{%- assign guides = collection.metafields.custom.guides.value -%}
{%- if guides != blank -%}
  <h2 class="h3">Ghiduri {{ collection.title | downcase }}</h2>
  <div class="blog-posts scroll-area bleed md:unbleed">
  {%- for article in guides limit: 8 -%}{%- render 'blog-post-card', article: article -%}{%- endfor -%}
  </div>
{%- endif -%}
```

Adaugă aceleași 4-8 linkuri și ca ancore text în `seo_text` (CONTENT-08 / CLUSTER-01), ca linkurile să existe în conținutul de corp, nu doar într-un carusel. Matricea de linkuri obligatorie a specialistului: hub → fiecare spoke păstrat (metafield `custom.guides` + ancore în `seo_text`); spoke → hub (link din șablon, CLUSTER-08, + o ancoră în primele 150 de cuvinte cu termenul-cap); spoke → 2-3 produse ale hub-ului; recomandat spoke ↔ 2-3 spoke-uri surori și hub ↔ pagina de tag (CONTENT-14 / CLUSTER-10). Model de adiacență (un hub):

```json
{"hub":"/collections/creatina","links":[
 {"from":"hub","to":"creatine-monohydrate-cand-sa-iei-creatina-dimineata","type":"mandatory","anchor":"când se ia creatina"},
 {"from":"creatine-monohydrate-cand-sa-iei-creatina-dimineata","to":"hub","type":"mandatory","anchor":"creatină monohidrată"},
 {"from":"creatine-monohydrate-cand-sa-iei-creatina-dimineata","to":"best-creatine-monohydrate-dozaj-optim-creatina-rezultate-2026","type":"recommended","anchor":"dozajul optim de creatină"},
 {"from":"creatine-monohydrate-cand-sa-iei-creatina-dimineata","to":"pure-creatine-cand-sa-iei-pauza-de","type":"recommended","anchor":"pauza de creatină"},
 {"from":"creatine-monohydrate-cand-sa-iei-creatina-dimineata","to":"/products/creatina-monohidrat-micronized-300g-fara-aroma","type":"product","anchor":"creatină monohidrată micronizată 300 g"},
 {"from":"creatine-monohydrate-cand-sa-iei-creatina-dimineata","to":"creatina-citrulina-intraworkout-90-zile-carbohidrati-intra-workout","type":"optional","anchor":"creatină cu carbohidrați intra-workout"}
]}
```

**Cum verificăm (falsificabilitate):** `grep -o '/blogs/news/[^"]*' collection-creatina.html | sort -u` trebuie să listeze doar articole despre creatină și să difere de `collection-haine-mnx.html`.

**Indicator timpuriu:** raport de linkuri interne (Screaming Frog sau `parse_html.py`): fiecare spoke păstrat câștigă ≥1 link de intrare din hub-ul său; adâncimea de crawl a spoke-urilor păstrate ≤ 2 de la homepage.

#### CLUSTER-08 — Linkurile spoke→hub ajung la doar 7 din 13 hub-uri; 112 articole nu au niciun link către o colecție; vitamine-si-minerale (51 articole), crema-de-orez (25), pre-workout (10), intra-workout (5), batoane și bauturi primesc 0 linkuri din corp; 40 de linkuri merg la generica „cele-mai-vandute”

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | M | 0.9 |

**Dovezi:** Href-uri extrase din corpuri (`articles-p*.json`): `/collections/creatina` 100, `aminoacizi` 86, `alimente-sanatoase` 86, `arzator-de-grasimi` 82, `cele-mai-vandute` 40, `pudra-proteica` 32, `prime-health` 20, toate celelalte 0 (total 446 în 243 articole; 112 articole cu 0). Meniul din header/footer linkează toate cele 17 colecții din fiecare pagină (`article.html`: 17 href-uri de colecție ×2), dar acelea sunt linkuri de navigare la nivel de site, nu contextuale. Fiecare articol poartă în schimb 534 linkuri `/cart/` de adăugare în coș și întregul set de linkuri duplicat pe `primesupplements1.myshopify.com` (2.582 linkuri), deci linkul către hub este singurul tip de link care lipsește.

**Impact / pagini afectate:** 355 articole / 6 hub-uri cu zero linkuri de intrare din corp.

**Recomandare:** (1) La nivel de șablon: în `sections/main-article.liquid` randează un link către hub dintr-un metafield, ca fiecare articol să-și linkeze hub-ul fără editarea corpurilor:

```liquid
{%- assign hub = article.metafields.custom.hub_collection.value -%}
{%- if hub -%}
<p class="article__hub-link">Vezi toate produsele din categoria <a href="{{ hub.url }}">{{ hub.title }}</a>.</p>
{%- endif -%}
```

(2) La nivel de corp (în timpul consolidării): înlocuiește linkurile `cele-mai-vandute` cu hub-ul specific și adaugă o ancoră-cheie către hub în paragraful introductiv. (3) Setează în masă `custom.hub_collection` din `cluster/hub_map.json` prin Admin API (`metafieldsSet`). Tema de test din 12.10.2026 nu conține acest bloc; curățarea pregătită rescrie linkurile myshopify ca relative, dar nu adaugă linkuri către hub.

**Cum verificăm (falsificabilitate):** re-rulează extragerea de href-uri: fiecare hub are ≥ numărul spoke-urilor sale ca linkuri de intrare din corp/șablon; 0 articole fără link către hub.

**Indicator timpuriu:** linkurile interne de intrare ale paginilor de colecție (Screaming Frog „Inlinks”) cresc de la ~2 (meniu) la 10-80.

#### CLUSTER-09 — Acoperirea produselor este inversată: 5 produse absorb 234 linkuri din articole, în timp ce 31 din 85 suplimente (toate cele 19 băuturi Frutilu, 3 din 7 arome de cremă de orez, colagen, turmeric, citrat de magneziu) au 0, iar 8 articole linkează două produse care nu mai există

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.9 |

**Dovezi:** Produse distincte linkate din articole: 55 din 185. Top: `creatina-monohidrat-micronized-300g-fara-aroma` 50 articole, `creatina-creapure` 46, `fiber-blood-orange` 46, `creatine-ready-to-go-plicuri-prime-supplements` 46, `instant-oat-cream-800g-25-serv` 46. Suplimente cu zero linkuri: `complete-collagen`, `magnesium-citrate-80-caps`, `turmeric-extract-80-caps`, `unt-de-caju`, `crema-de-orez-fara-aroma`, `crema-de-orez-caramel-sarat`, `crema-de-orez-sirop-de-artar`, `baton-proteic-ciocolata-fructe-de-padure`, toate cele 19 `instant-drink-frutilu-*` / `frutilu-instant-drink-*` + `pachet-mix-arome-bautura-instant-frutilu-...` (întregul hub bauturi). Ținte-fantomă: `15-reducere-pachet-thermo-core-water-out-1-14-august` (pachet promoțional datat, august) linkat de 6 articole și încorporat în 12 handle-uri (`*-15-reducere-pachet-thermo-core*`), `liver-protect-500-ml` linkat de 2 (`content` numără 12, respectiv 4 articole cu linkuri către aceste produse dispărute, CONTENT-09). 100 produse MNX apparel: 1 articol (`tricou-sala-cele-mai-bune-tricouri-yoga`).

**Impact / pagini afectate:** 31 suplimente + 99 produse MNX fără niciun sprijin editorial; 8 articole cu linkuri către produse 404/redirecționate.

**Recomandare:** Umple golurile cu câte un spoke-ghid de cumpărare per hub care listează toate produsele lui (bauturi: „Băuturi instant fără zahăr Frutilu: arome, când le folosești”; crema-de-orez: „Crema de orez: arome, mod de preparare, pre/post antrenament”; batoane: „Batoane proteice Prime: comparație pe aromă/macros”). Înlocuiește linkurile `15-reducere-pachet...` și `liver-protect-500-ml` cu `/collections/arzator-de-grasimi` și produsul hepatic curent. MNX apparel nu are nevoie de spoke-uri de blog; are nevoie de textul colecției (CONTENT-08 / CLUSTER-01). Linkurile către produsele dispărute nu sunt tratate nici de curățarea pregătită, nici de tema de test.

**Cum verificăm (falsificabilitate):** scriptul de acoperire a produselor arată 0 suplimente cu 0 linkuri din articole și 0 linkuri către handle-uri absente din `products-all.json`.

**Indicator timpuriu:** „Inlinks” interne per pagină de produs ≥ 2 pentru fiecare supliment.

#### CLUSTER-14 — Patru hub-uri nu au (aproape) niciun spoke, în timp ce patru produse sunt supra-deservite: bauturi (19 produse / 0 articole), batoane (4 / 0), intra-workout (4 / 5), pre-workout (7 / 10) față de L-carnitine 1000 (28 articole), ovăz instant (22), fibre (21)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.85 |

**Dovezi:** Harta hub-urilor (regulă de atribuire: cuvânt-cheie în capul handle-ului, altfel în handle/titlu, altfel colecția produsului linkat; harta completă în scratchpad `cluster/hub_map.json`):

| Hub (collection) | Products in hub | Articles mapped | Article words | Products linked from >=1 article | Article links to hub products | Body links to the hub collection |
|---|---|---|---|---|---|---|
| /collections/creatina | 3 | 78 | 115,757 | 3/3 | 142 | 100 (50 articles) |
| /collections/aminoacizi | 4 | 51 | 74,544 | 4/4 | 102 | 86 |
| /collections/vitamine-si-minerale | 13 | 51 | 79,359 | 11/13 | 92 | **0** |
| /collections/arzator-de-grasimi | 4 | 44 | 65,704 | 4/4 | 78 | 82 |
| /collections/prime-health | 13 | 34 | 50,608 | 11/13 | 64 | 20 |
| /collections/pudra-proteica | 5 | 31 | 46,708 | 5/5 | 68 | 32 |
| /collections/crema-de-orez | 7 | 25 | 37,861 | 4/7 | 10 | **0** |
| /collections/alimente-sanatoase (fibre) | 2 | 23 | 35,429 | 2/2 | 92 | 86 |
| /collections/suplimente-pre-workout | 7 | 10 | 14,340 | 7/7 | 54 | **0** |
| /collections/suplimente-intra-workout | 4 | 5 | 7,145 | 4/4 | 62 | **0** |
| /collections/batoane-proteice | 4 | 0 | 0 | 3/4 | 6 | **0** |
| /collections/bauturi | 19 | 0 | 0 | **0/19** | **0** | **0** |
| /collections/haine-mnx | 87 | 1 | 1,351 | 1/87 | 2 | 0 |
| orphan / no hub | — | 2 | — | — | — | — |
| (generic) /collections/cele-mai-vandute | 185 | — | — | — | — | 40 |

Numărul de articole cu produsul încorporat în handle (`handle_parts.json`): `l-carnitine-1000-80-caps` 28, `creatina-monohidrat-...` 22, `instant-oat-cream-800g-25-serv` 22, `fiber-blood-orange` 21, `creatina-creapure` 18, `creatine-ready-to-go-plicuri` 16. Hub-ul crema-de-orez (7 produse: cremă de orez fără aromă, caramel sărat, sirop de arțar, blueberry muffin, biscuiți...) primește 25 articole, dintre care 22 despre „ovăz instant”, adică despre un singur produs dintr-o altă subcategorie; produsele de cremă de orez primesc 10 linkuri în total. Pre-workout, hub-ul cu cele mai multe produse după vitamine (7), are 10 articole, dintre care doar 1 încorporează un produs. Orfani: `cum-te-ajuta-combat-pro-sa-ti-cresti-masa-musculara`, `glycerolul-secretul-culturistilor-...`; 77 articole se potrivesc cu mai mult de un hub.

**Impact / pagini afectate:** 4 hub-uri sub-deservite, 3 produse supra-deservite.

**Recomandare:** Listă de goluri de conținut (câte un spoke, 1.200-1.800 cuvinte, interogare românească în handle): bauturi — `bauturi-instant-fara-zahar-frutilu-ghid`, `electroliti-si-hidratare-la-sala`; batoane — `batoane-proteice-ghid-comparatie`, `baton-proteic-inainte-sau-dupa-antrenament`; intra-workout — `ce-este-intra-workout`, `dextrina-ciclica-vs-maltodextrina`, `carbohidrati-intra-workout-dozaj`; pre-workout — `pre-workout-ce-este-si-cum-se-ia`, `pre-workout-fara-cofeina` (există: `ce-este-un-pre-workout-fara-cofeina`, de extins de la 950 cuvinte), `beta-alanina-beneficii`, `citrulina-beneficii`, `pre-workout-efecte-secundare`; crema-de-orez — `crema-de-orez-ce-este-si-cum-se-prepara`, `crema-de-orez-vs-ovaz-instant`. Oprește producția de articole despre L-carnitină/ovăz/fibre.

**Cum verificăm (falsificabilitate):** fiecare hub are ≥ 3 spoke-uri și ≥ 1 spoke care linkează fiecare produs al hub-ului.

**Indicator timpuriu:** afișări non-brand pentru „pre workout”, „intra workout”, „batoane proteice”, „bauturi instant fara zahar” apar în GSC.

#### CONTENT-09 — Igiena linkurilor din corp: 2.582 linkuri myshopify, 534 linkuri directe de adăugare în coș, 194 linkuri dofollow „Powered by BlogGenAuto”, linkuri către produse promoționale dispărute

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | M | 0.95 |

**Dovezi:** (parsarea HTML a corpurilor) 2.582 linkuri către `primesupplements1.myshopify.com` în 349 articole (1.602 produs, 534 coș, 446 colecție); fiecare link de produs există de două ori (domeniul principal + myshopify), ex. pagina live: 27 apariții myshopify. 534 linkuri de adăugare în coș de forma `https://primesupplements1.myshopify.com/cart/55180000756087:1` (deep-link pe ID de variantă, `target="_blank"`; /cart este interzis în robots.txt) — se strică dacă o variantă este re-creată și ocolesc pagina de produs. 194 articole se termină cu `<a href="https://bloggenauto.com" target="_blank" rel="noopener" style="color: #9aa0a6;...">Powered by BlogGenAuto</a>` (confirmat prin fetch live; fără `nofollow`/`sponsored`; gri `#9aa0a6` cu contrast scăzut pe alb). Politica Google privind link-spam-ul listează „widely distributed links in the footers or templates of various sites” și cere `rel="sponsored"`/`nofollow` pentru astfel de linkuri de widget; 194 linkuri externe identice sunt și o amprentă evidentă de automatizare. 353 articole folosesc `target="_blank"` pe linkuri interne; 309 au handler-e `onclick` de share. Linkuri către produse care nu mai există: `15-reducere-pachet-thermo-core-water-out-1-14-august` (pachet promoțional expirat, august) din 12 articole, `liver-protect-500-ml` din 4. 6 articole (setul 2025) nu linkează niciun produs; 112 nu linkează nicio colecție; MNX apparel (100 produse) este linkat dintr-un singur articol.

**Impact / pagini afectate:** 349 articole.

**Recomandare:** Verificare: tema de test (`theme-fixes/sections/main-article.liquid`, liniile 110-115) curăță la randare corpul articolului — `replace: 'https://primesupplements1.myshopify.com', ''` (linkuri relative pe domeniul principal), `<script type="application/ld+json">` → `type="text/plain" data-disabled="ld+json"`, `<script>` → `type="text/plain" data-disabled="inline"`, iar linkul `https://bloggenauto.com` primește `rel="nofollow sponsored noopener"`; după publicarea temei: `curl -s https://primesupplements.ro/blogs/news/apa-de-cocos-nitrox-no-stim-antrenamente-seara | grep -c 'myshopify.com'` = 0 și `grep -o 'rel="[^"]*" href="https://bloggenauto.com"\|href="https://bloggenauto.com" rel="[^"]*"'` conține `sponsored`. Rămâne, în așteptarea importului corpurilor curățate (Matrixify, foaia Blog Posts: ID, Body HTML; `blog-cleanup/matrixify-blog-posts.csv.gz`): `cleanup-report.json` consemnează 2.582 linkuri myshopify rescrise, 2.229 linkuri absolute relativizate, 194 linkuri „Powered by BlogGenAuto” eliminate, 534 prețuri hard-codate și 533 linii de urgență eliminate, 3.115 `target="_blank"` eliminate; 0 referințe myshopify/script/bloggen rămase în corpurile curățate. Netratate de nicio pregătire: înlocuirea butoanelor `/cart/<id>:1` cu link către pagina de produs, re-direcționarea celor 16 linkuri către produse dispărute (`thermo-core-120-caps` / `water-out-120-caps`) și adăugarea a 1-2 linkuri contextuale per articol către colecția relevantă și, unde are sens, către MNX.

**Cum verificăm (falsificabilitate):** ia orice articol și caută `myshopify.com` și `bloggenauto.com`; ambele trebuie să returneze 0 după fix.

**Indicator timpuriu:** numărul de ancore myshopify/cart/bloggenauto în corpurile articolelor (țintă 0).

#### CONTENT-10 — Integritatea datelor: o linie „Published:” hard-codată, în engleză, contrazice data reală de publicare pe 315 articole; niciun semnal real de actualizare

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.9 |

**Dovezi:** 349/355 corpuri încep cu `Published: <Month> <d>, 2026 | Updated: <same date>`; data hard-codată diferă de `publishedAt` din Shopify pe **315/349** (ex. `apa-de-cocos-nitrox-no-stim-antrenamente-seara`: corpul are `<time datetime="2026-09-11">September 11, 2026</time>`, tema tipărește `<time>11 oct. 2026</time>`, iar Article JSON-LD încorporat spune 2026-10-11 — trei date pe o singură pagină). „Updated:” este mereu egal cu „Published:” (0 semnale reale de actualizare); doar 29 articole au `updatedAt` > `publishedAt`, și acelea sunt piesele din 2025 a căror singură schimbare a fost înlocuirea bio-ului („Actualizat: 12 martie 2026”). Data proprie a temei este corectă și localizată. Verificare suplimentară la sinteză: scriptul pregătit `blog-cleanup/clean.py` elimină bara de metadate doar unde este delimitată de comentariul „Article Metadata Bar” — `metadata_bar_removed: 3` în `cleanup-report.json` — deci linia „Published:” rămâne în ~346 corpuri curățate; regula trebuie extinsă înainte de import.

**Impact / pagini afectate:** 349 articole; semnalele `datePublished`/`dateModified` sunt contradictorii pe fiecare dintre ele.

**Recomandare:** Șterge antetul de dată/byline/share al generatorului din fiecare corp (în același script de curățare ca CONTENT-09, după extinderea regulii); păstrează doar byline-ul temei; când un articol este revizuit real, nu modifica `article.published_at` — afișează `article.updated_at` printr-un metafield `custom.last_reviewed` randat ca „Verificat medical la ...” și mapează-l la `dateModified` în `schema-article.liquid` (varianta din tema de test emite Article valid; de adăugat maparea).

**Cum verificăm (falsificabilitate):** datele vizibile de pe o pagină trebuie să coincidă cu `datePublished` din JSON-LD-ul ei; azi nu coincid.

**Indicator timpuriu:** articole cu date contradictorii (țintă 0).

#### CONTENT-11 — Markup injectat de generator în corpuri: H1 duplicate, JSON-LD în corp care dublează schema temei, categorii de breadcrumb inventate, CSS/JS inline

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S-M | 0.9 |

**Dovezi:** 347 corpuri încorporează JSON-LD Article + FAQPage (mediana 5 întrebări) + BreadcrumbList + Person (`has_ldjson_in_body` 347), care coexistă cu `schema-article` al temei, deci fiecare pagină poartă două entități Article (autor Person vs Organization, CONTENT-04). 26 corpuri conțin un `<h1>` (25 identice cu titlul → două H1 pe pagină; pagina live `apa-de-cocos` arată `<h1 class="h0">` + `<h1>` în corp cu același text; 17 din cele 26 au fost publicate în septembrie 2026, deci defectul este recent și continuu). BreadcrumbList încorporat numește categorii care nu există ca pagini („Nutriție Sportivă” 94, „Nutriție și Sănătate” 22, „Nutriție și Suplimente” 21, „Sănătate Digestivă” 13), iar în 32 articole URL-ul ultimului element de breadcrumb este un slug inexistent (ex. `.../citicolina-conexiune-musculara-rutina-seara-2026` pentru articolul de la `.../citicolina-conexiune-musculara-rutina-antrenament-seara-travel-2026`). 312 corpuri au blocuri `<style>`, 285 au `font-size ≤ 12px` inline, 243 conțin emoji, 347 conțin taguri `<script>` non-JSON-LD. FAQPage nu mai are funcție SERP din mai 2026 (doar Info).

**Impact / pagini afectate:** 347 articole.

**Recomandare:** Verificare: după publicarea temei de test, în HTML-ul unui articol toate `<script type="application/ld+json">` din corp apar ca `<script type="text/plain" data-disabled="ld+json">` (inerte), iar singurul JSON-LD Article activ este cel din `snippets/schema-article.liquid` (autor Person, publisher, image, wordCount) — test: `grep -c 'application/ld+json' <pagină>` trebuie să fie egal cu numărul de blocuri ale temei, nu +3 per articol. Rămâne, la importul corpurilor curățate (Matrixify): `cleanup-report.json` consemnează 1.379 blocuri JSON-LD și 347 scripturi eliminate fizic, 26 H1 retrogradate la H2, 3 nav-uri de breadcrumb eliminate; de confirmat după import: `grep -c '<script' body` = 0 și un singur H1 per pagină; păstrează FAQ doar ca HTML vizibil.

**Cum verificăm (falsificabilitate):** `grep -c '<script' body` trebuie să fie 0; un singur H1 per pagină.

**Indicator timpuriu:** pagini cu >1 H1 (țintă 0); articole cu JSON-LD în corp (țintă 0).

#### CONTENT-12 / CLUSTER-16 — Titlurile sunt datate cu anul, prea lungi și construite pe tipare clickbait; 311 teasere sunt trunchiate cu „...”; generatorul va re-crea fiecare intenție în 2027

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | FIXED (live 12.10.2026) | M | 0.8 |

**Dovezi:** (`content` Medium, `cluster` Low — păstrată severitatea mai mare.) 279/355 titluri conțin „2026” (0 conțin 2025; devin învechite pe 2027-01-01 și sunt deja „anul trecut” pentru teme evergreen); 245 > 65 caractere (mediana 69, 6 > 100, maxim 134: „Cum să Transformi Bioflavonoidele și Ceaiul Verde în Aliați Puternici în Lupta împotriva Grăsimilor: Ghida Completa pentru Thermo Core” — cu greșeala „Ghida”); la audit tag-ul title = titlul paginii, fără sufix de brand. Tipare: „Semne că/ale ...” 44, „Cum să ...” 38, „Ghid(ul) complet” 24, „Aprobat/Recomandat de experți” 21, „Secretul/Secretele” 20, „%” în titlu 19, „Greșeala/Eroarea ... pe care ... o fac” 10, „În sfârșit: ...” 9, „ieftin vs premium” 7; 36 titluri încorporează un nume de produs. Teaserele de articole similare și de pe pagina Despre noi sunt trunchiate dur la ~55 caractere cu „...” în 311 corpuri („Cum să asociezi suplimentele pre-workout fără stimulent...”). `cluster`: variantele sezoniere coexistă deja: `before-and-after-creatine-creatine-ready-to-go-plicuri` („...în Sezonul Rece 2026”) vs `creatine-ready-to-go-plicuri-prime-supplements-supplements-for-seasonal-welln` („...în sezonul 2026”) vs `gymbeam-creatine-...-5` („...de Toamnă”); doar 29 articole au fost vreodată actualizate după publicare.

**Impact / pagini afectate:** 355 articole (+ cardurile din indexul blogului, blocul „Informații utile” de pe homepage); 279 titluri datate.

**Recomandare:** Verificare: pe live, `global.title_tag` (45-60 caractere, o singură temă, fără an unde nu e justificat) și `global.description_tag` (120-158 caractere) au fost rescrise pentru 354/355 articole (`applied/articles-plan.json`, ex. `acetyl-l-carnitine-15-reducere-pachet-thermo-core` → „Pachete de slăbit: de ce contează calitatea și cum le alegi”); confirmă cu `curl -s <articol> | grep -o '<title>[^<]*'` că SERP-ul vede titlul nou; sufixul de brand din șablonul de title este în tema de test. Rămâne pentru articolele păstrate: rescrie și `article.title` (H1-ul vizibil) după regula ≤ 60 caractere, cuvântul-cheie principal primul, fără an decât dacă conținutul este datat (ex. o lansare de produs din 2026), fără cifre fără sursă, fără „experții/secretul” — ex. „Cum să iei creatina: doză, moment, pauze” în loc de „De ce Strategia ta de Creatină Eșuează în 2026 (și Soluția)”; repară teaserele trunchiate scriind un `article.excerpt` real (gol pe 6, auto-trunchiat în rest) ≤ 160 caractere; regulă editorială „un URL per intenție, reîmprospătat anual” cu `dateModified` onest și coada automată BlogGenAuto dezactivată.

**Cum verificăm (falsificabilitate):** CTR în GSC per tipar de titlu; titlurile datate pierd afișări în T1 2027; după rescriere, titluri cu an < 20.

**Indicator timpuriu:** titluri > 60 caractere (țintă < 10%); titluri cu an (țintă < 5%); URL-uri noi de blog pe lună ≤ 4.

#### CONTENT-13 / CLUSTER-06 — Slug-urile conțin fragmente de prompt în engleză, nume de competitori, SKU-uri de produs și sufixe numerice; cuvântul-cheie din URL nu are legătură cu titlul și conținutul

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.8 |

**Dovezi:** (ambii specialiști Medium.) `content`: 191 handle-uri conțin fragmente în engleză (`-protein-for-muscle`, `-how-to-store-supplements-prope`, `-whole-foods-vs-processed-compa` — mai multe tăiate la mijlocul cuvântului); 10 handle-uri conțin branduri de competitori niciodată menționate în titlu sau corp ca o comparație (`gymbeam-creatine-...` ×6, `proteina-on-whey-gold-standard-prime-whey-go-...`, `proteina-whey-gold-standard-prime-whey-2000g-...`, `proteina-whey-optimum-nutrition-emperor-mass_3000g-...`, `gainer-gymbeam-prime-whey-2000g-protein-myths`; „GymBeam” apare în 22 corpuri — detaliat în CLUSTER-07); handle-urile poartă gramaje (`-800g-25-serv`, `_3000g`, `-120-caps`); 42 se termină în -2..-5; 2 sunt non-ASCII (`bcaa-vs-eaa-diferențe-și-...`, `water-out-tinctura-soluția-...`); 1 are 85 caractere. `cluster` (`cluster/handle_parts.json`): 246/355 handle-uri au forma `<cuvânt-cheie englez>-<handle produs>-<unghi englez>`; 101 încep cu un cuvânt-cheie englez; în 30 tema din handle și tema din titlu indică hub-uri diferite, în 72 produsul încorporat aparține altui hub decât titlul. Exemple: `creatine-gummies-creatina-creapure-how-to-read` = „Epuizarea Musculară: Când să te Îngrijorezi și Cum să Alegi Creatina” (nimic despre gummies sau citit); `creatine-kinase-creatina-creapure-supplements-and-food` = „Creatina pe Vârste” (creatin-kinaza este o enzimă sanguină, interogare medicală); `fat-burner-pareri-water-out-120-caps-healthy` = „De ce strategia ta de gustări sănătoase eșuează”; `magneziu-bisglicinat-prime-whey-2000g-future-trends` = „Pudre proteice pentru stagnarea musculară”; `omega-3-combat-pro-how-long-until` = „Pre-Workout și Hrana”; `magneziu-l-treonat-shaker-premium-accesorizat-500-ml` = „Ghidul Shaker-elor Fitness”. Capete de cuvinte-cheie repetate ca termeni de căutare US-English: `creatine-gummies` ×6, `creatine-kinase` ×6, `before-and-after-creatine` ×6, `creatine-pastile` ×6, `acetyl-l-carnitine` ×8, `fat-burner-x10(-pareri)` ×8 (X10 nu este produs Prime). 34 titluri nu conțin nicio entitate-temă („Provocările de slăbit în grup”, „De ce strategia ta de nutriție la restaurant eșuează”). Costul mai mare decât semnalul minor al cuvintelor din URL: URL-ul, titlul și H1-ul nu cad niciodată de acord asupra unei singure interogări românești, iar fragmentele englezești apar în breadcrumb-urile din SERP.

**Impact / pagini afectate:** ~230-250 articole; dintre ele ~110 vor supraviețui consolidării.

**Recomandare:** Nu redenumi în masă (fiecare redenumire costă un redirect și echitate de link); repară slug-urile doar pentru articolele care supraviețuiesc consolidării și sunt rescrise, cu ≤ 5 cuvinte românești egale cu interogarea-țintă (`/blogs/news/creatina-in-calatorii`, `cand-se-ia-creatina`, `creatina-pauza`, `glutamina-efecte-secundare`, `l-carnitina-slabit`, `izolat-vs-concentrat-proteic`), cu „Create a URL redirect” bifat; rescrie titlul să înceapă cu aceeași interogare; nu atinge handle-urile articolelor care oricum vor primi 301; păstrează handle-urile ASCII (redirecționează cele două cu diacritice); scoate numele competitorilor dacă articolul nu este o comparație onestă. Depinde de decizia de consolidare (PENDING în CONTENT-05 / CLUSTER-04).

**Cum verificăm (falsificabilitate):** pentru fiecare spoke păstrat, primele 2-3 cuvinte ale handle-ului apar verbatim în titlu (verificare prin script); 0 handle-uri non-ASCII; GSC confirmă că URL-urile redirecționate nu mai primesc afișări.

**Indicator timpuriu:** ponderea articolelor supraviețuitoare cu slug românesc ≤ 5 cuvinte; CTR pe URL-urile de blog în GSC crește (breadcrumb/URL mai curat în SERP).

#### CLUSTER-07 — 13 articole folosesc nume de competitori ca termen-țintă (GymBeam ×7, Optimum Nutrition / Gold Standard ×3, Dr Max, Farmacia Tei, MyProtein) fără să compare nimic

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.85 |

**Dovezi:** handle-uri `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara` (+ -2..-5), `gymbeam-creatine-creatine-ready-to-go-plicuri`, `gainer-gymbeam-prime-whey-2000g-protein-myths`, `proteina-on-whey-gold-standard-prime-whey-go-protein-for`, `proteina-whey-gold-standard-prime-whey-2000g-reading-protein`, `proteina-whey-optimum-nutrition-emperor-mass_3000g-protein-for-recovery`, `magneziu-bisglicinat-dr-max-liver-protect-500-ml-supplements`, `nac-farmacia-tei-greseli-depozitare-n-acetilcisteina-preventie`, `my-protein-ghid-rezultate-combinatii-izolat-proteic`. Titluri: „Cum să iei Creatină în Călătorii”, „Descoperă Puterea Prime Whey” — brandul apare doar în URL. „gymbeam creatine” este o interogare navigațională pentru gymbeam.ro; astfel de pagini nu pot ranka, iar URL-ul promite o comparație care nu există.

**Impact / pagini afectate:** 13 articole.

**Recomandare:** Fie elimină brandul din handle la consolidare (majoritatea sunt deja în listele de 301 din CLUSTER-03), fie construiește deliberat 2-3 spoke-uri reale de comparație sub hub-uri („Creatină Prime vs GymBeam: compoziție, preț per porție, Creapure”) cu tabel comparativ — acestea pot ranka pe interogări „X vs Y” și sunt spoke-uri legitime cu intenție comercială (planul propune `creatina-prime-vs-gymbeam`).

**Cum verificăm (falsificabilitate):** 0 handle-uri care corespund `gymbeam|optimum|gold-standard|dr-max|farmacia-tei|my-protein` dacă pagina nu are un tabel comparativ sub un H2.

**Indicator timpuriu:** niciunul așteptat de la eliminare; pentru paginile reale de comparație: afișări pe interogări „prime supplements vs ...”.

#### CONTENT-14 / CLUSTER-10 — Fără hub-uri tematice sau taxonomie: 346/355 articole fără taguri, 5 taguri pe 9 articole, blog intitulat „Ultimele articole”, singura cale de navigare sunt 33 de pagini de paginare cronologică

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M (content) / S + S (cluster) | 0.85 |

**Dovezi:** (ambii specialiști Medium.) 5 taguri în total (`preworkout` 3, `arderea grasimilor` 2, `longevitate` 2, `sanatate` 2, `aminoacizi` 1); un singur blog, `<h1>Ultimele articole</h1>`, 11 postări pe pagină → ~33 pagini adâncime; nicio pagină de categorie, deci categoriile de breadcrumb inventate de generator (CONTENT-11) nu au corespondent real; colecțiile nu linkează articolele despre produsele lor; `sections/main-blog.liquid` suportă un text introductiv (`section.settings.content`) care este gol. `cluster`: `blog-index.html` randează `/blogs/news/tagged/aminoacizi|arderea-grasimilor|longevitate|preworkout|sanatate` ca bară de filtre (deci `/tagged/aminoacizi` este o pagină indexabilă cu 1 articol); `sections__main-blog.liquid` paginează `blog.articles` câte 11 → 33 pagini; `templates__article.json` are doar `main-article`, `comments`, `navigation` (nicio secțiune de articole similare; textul „Articole Similare” din corpuri este injectat de BlogGenAuto). Google nu poate deduce gruparea tematică din structura site-ului; pagina 20+ a blogului este la 20 de clicuri de homepage.

**Impact / pagini afectate:** indexul blogului + 354-355 articole.

**Recomandare:** Creează 8-12 taguri care corespund hub-urilor (`creatina`, `proteine`, `aminoacizi`, `arzatoare-de-grasimi`, `vitamine-minerale`, `prime-health`, `pre-workout`, `intra-workout`, `crema-de-orez`, `fibre`, `batoane`, `bauturi`), aplică exact un tag de hub pe fiecare articol supraviețuitor și șterge cele 5 taguri actuale; `/blogs/news/tagged/<hub>` devine hub-ul editorial: linkat din `seo_text`-ul colecției („Toate ghidurile despre creatină”) și, invers, pagina de tag linkează colecția printr-o mică mapare Liquid `tag -> collection url` în `main-blog` (pagina de tag folosește aceeași secțiune); scrie un intro de 100-150 cuvinte per hub; ridică `articles_per_page` la 24; redenumește blogul „Ghiduri de nutriție sportivă”; ține numărul de taguri la 12 ca să nu apară pagini de tag subțiri. Nicio pregătire din 12.10.2026 nu acoperă tagurile.

**Cum verificăm (falsificabilitate):** 0 articole fără taguri; `blog.all_tags.size` == 12; fiecare pagină de tag listează ≥ 5 articole; hub-urile de tag au afișări în GSC; adâncimea de crawl a articolelor ≤ 3.

**Indicator timpuriu:** articole accesibile în ≤ 3 clicuri de la homepage (țintă 100%); raport de adâncime: 95% din URL-urile de blog la adâncime ≤ 3.

#### CLUSTER-11 — Linkarea articol→articol este generată, nu planificată: 22 articole au 0 linkuri de intrare din articole, 132 au < 3, 41% din muchii traversează hub-urile, 7 articole nu linkează nimic, 2 linkuri indică handle-uri inexistente

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.9 |

**Dovezi:** Graful intra-blog din `articles-p*.json`: 1.146 muchii distincte articol→articol, 678 în același hub, 468 între hub-uri; grad de intrare mediana 3, maxim 13 (`protine-whey-isolate-refacere-musculara-semne-deficit-proteic`). 0 linkuri de intrare (22): `bcaa-vs-eaa-diferențe-și-beneficii-pentru-culturisti-ghid-complet`, `ce-este-un-pre-workout-fara-cofeina`, `water-out-tinctura-soluția-naturala-...`, `protein-izolat-vs-concentrat-proteic-ghid`, `vitamine-b12-90-zile-vitamina-d3-k2`, `alpha-booster-testosterone-ce-spun-studiile-tincturi-potenta`, `reglarea-tensiunii-din-plante-...`, `glycerolul-secretul-culturistilor-...`, `cum-te-ajuta-combat-pro-...`, `tricou-sala-cele-mai-bune-tricouri-yoga`, `cum-contribuie-l-carnitine-1000-la-arderea-grasimilor`, `nac-1000-mg-transformare-obiceiuri-sanatoase-nac-energie`, `protectie-ficat-eroare-protectie-ficat-sportivi-peste`, `magneziu-glicinat-coenzima-q10-80-caps-debunking`, `taurina-beneficii-recovery-bcaa-500g-how-long`, `apa-de-cocos-nitrox-no-stim-antrenamente-seara`, `creatine-kinase-creatina-creapure-bioavailability-why-absorption`, `l-carnitine-1000-80-caps-travel-weight-loss-tips`, `omega-3-crema-de-orez-blueberry-muffin`, `instant-oat-cream-800g-25-serv-mindful-eating-practices-2`, `gainer-gymbeam-prime-whey-2000g-protein-myths`, `creatine-monohydrate-creatina-creapure-debunking-common-supplement`. Ținte rupte: `/blogs/news/ovaz-instant-secrete-nutritie-crema-ovaz-energy` (handle-ul real se termină în `-energie`) și `/blogs/news/instant-oat-cream-800g-25-serv-healthy-eating-on-budget` (real: `-on-a-budget`). Setul cu 0 linkuri de intrare conține tocmai cele mai bune articole scrise de om (bcaa-vs-eaa, izolat-vs-concentrat, pre-workout fără cofeină).

**Impact / pagini afectate:** 355 articole; 2 linkuri rupte.

**Recomandare:** Adaugă un bloc de articole similare la nivel de temă în `templates/article.json` (Impact livrează o secțiune `blog-posts`/„featured blog”; randează 3-4 articole care împart tag-ul de hub, sau o listă `custom.related_articles`), ca fiecare spoke să primească ≥ 3 linkuri de intrare de la surori indiferent de corp. Repară cele 2 href-uri rupte. La consolidare, re-direcționează linkurile care țintesc handle-uri redirecționate către handle-ul păstrat (evită 1.474 linkuri care trec prin 301).

**Cum verificăm (falsificabilitate):** script de grad de intrare: 0 articole cu < 3 linkuri de intrare; 0 href-uri către handle-uri absente din `articles-all.json`.

**Indicator timpuriu:** numărul de orfani în crawl-ul Screaming Frog = 0.

#### CONTENT-15 — Pagina Despre noi și conținutul de încredere al brandului sunt slabe: fără H1, certificări neverificabile, an de înființare contradictoriu, fără echipă

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S-M | 0.9 |

**Dovezi:** `page-despre-noi.html` — 718 cuvinte, fără `<h1>` (doar un `<h2>Informații utile</h2>` din blocul de blog), majoritatea textului fără diacritice („piata”, „sustine”, „cunosti”), pretinde „Certificările cuprind ... TUV, IFS, HALAL, Cologne List for Athletes” fără numere de certificat, PDF-uri sau numele producătorului; fără echipă, fără fotografii, fără adresă pe pagină; înființare declarată 2022 vs `foundingDate` 2020 în Organization JSON-LD de pe homepage; `pages.json`: contact, despre-noi, thank-you, creatina-custom, inregistrare-b2b au 0-2 cuvinte de corp CMS (construite din secțiuni), `thank-you` este indexabilă; `creatina-custom` 277 cuvinte fără H1.

**Impact / pagini afectate:** paginile Despre noi, Contact, Thank-you, Creatina custom; entitatea Organization. Un evaluator care caută „cine răspunde de acest site” nu găsește o entitate și persoane verificabile.

**Recomandare:** Deja făcut (live): `global.title_tag` + `description_tag` scrise pentru 11/11 pagini (erau goale). Gata în tema de test: `schema-organization.liquid` cu legalName, taxID, telephone, adresă (Cisnădie), profiluri sameAs reale, WebSite + SearchAction pe homepage; `noindex,follow` pe șablonul `thank-you`. Rămâne: reconstruiește `/pages/despre-noi` cu un H1 („Despre Prime Supplements”), blocul entitate juridică + adresă + CUI, anul de înființare 2022, partenerul de producție/certificările cu linkuri către certificate (URL-ul listării Cologne List® dacă este reală), secțiune de echipă (Marius Chera cu link către pagina de autor, Sorin Cristea), fotografii cu facilități/sportivi reali, un paragraf „Cum formulăm produsele”; verifică `foundingDate` = 2022 în snippet-ul din tema de test; adaugă H1 pe `creatina-custom`.

**Cum verificăm (falsificabilitate):** un evaluator care caută „cine răspunde de site” trebuie să găsească pe pagina Despre noi o entitate numită, verificabilă, și persoane.

**Indicator timpuriu:** pagina Despre noi are H1, adresă, linkuri către certificate (binar).

#### CONTENT-16 / CLUSTER-15 — Articolele vechi scrise de om sunt subțiri sau orfane față de catalog, deși sunt singurele cu intenții curate, distincte

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.9 |

**Dovezi:** (ambii specialiști Low.) `cum-contribuie-l-carnitine-1000-la-arderea-grasimilor` 73 cuvinte (`content_quality.py`: 68/100, semnalări `thin-content`, `low-density`; singurul articol < 300 cuvinte), `glycerolul-secretul-...` 472 cuvinte, `bcaa-vs-eaa-...` 517 cuvinte (72/100, `low-density`); toate cele șase articole din 2025 au 0 linkuri către produse și 0 linkuri externe; 2 au 0 linkuri interne; 2 au handle-uri non-ASCII (`bcaa-vs-eaa-diferențe-și-beneficii-pentru-culturisti-ghid-complet`, `water-out-tinctura-soluția-naturala-...`); sunt singurele fără markerul BlogGenAI și cele mai bune candidate pentru conținut de „Experience” autentic. `cluster`: `bcaa-vs-eaa` 517 cuvinte, 0 linkuri de intrare, deși „bcaa vs eaa” este o interogare de comparație al cărei SERP este integral în engleză (WebSearch: setforset, strengthlog, adamkempfitness, bodybuilding.com, myprotein.ae — nicio pagină românească); `water-out-tinctura-...` 2.816 cuvinte, 0 linkuri de intrare; `ce-este-un-pre-workout-fara-cofeina` 950 cuvinte, 0 linkuri de intrare; `glycerolul-...` și `cum-te-ajuta-combat-pro-...` nu sunt atribuite niciunui hub.

**Impact / pagini afectate:** 6 articole.

**Recomandare:** Extinde cele trei articole subțiri la 900-1.200 cuvinte cu material direct (protocoale de sportivi, fotografii, COA) și adaugă linkuri către produse și colecții; extinde `bcaa-vs-eaa` la 1.500+ cuvinte cu tabel comparativ și fă-l spoke-ul principal al hub-ului aminoacizi (redenumire `bcaa-vs-eaa`, redirect de la URL-ul cu diacritice); redirecționează stub-ul de 73 de cuvinte despre L-carnitină către spoke-ul păstrat `l-carnitina-slabit`; redenumește `water-out-tinctura-...` în ASCII; etichetează articolele despre glicerol și Combat PRO în pre-workout și linkează-le din textul hub-ului pre-workout; păstrează handle-urile vechi unde nu se redenumește.

**Cum verificăm (falsificabilitate):** re-rularea `content_quality.py` trebuie să elimine semnalarea `thin-content`; 0 articole publicate < 300 cuvinte; 0 handle-uri non-ASCII.

**Indicator timpuriu:** cuvinte și linkuri interne pe aceste 6 URL-uri; afișări pentru „bcaa vs eaa” în GSC.

#### CONTENT-17 — Șiruri de interfață în engleză și nelocalizate în interiorul conținutului

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.85 |

**Dovezi:** „Key Takeaways” în 321 corpuri, „Share / Post” 349, „Table of Contents” 37, „Published:/Updated:/By:” 349, „Buy Now / While supplies last” în ciorna englezească; titlul homepage-ului la audit „Prime Supplements - Hardcore Sports Nutrition” și titlul Judge.me „Let customers speak for us” (context); 96 titluri de produs în engleză (93 MNX, ex. „MNX Ribbed shorts Hammer 3.0, black”).

**Impact / pagini afectate:** 349 articole, homepage, 96 produse.

**Recomandare:** Deja făcut (live): titlurile SEO ale produselor sunt acum în română (`<title>`), iar titlul homepage-ului este suprascris în tema de test. Rămâne: localizează etichetele în scriptul de curățare — `blog-cleanup/clean.py` nu are încă o regulă pentru „Key Takeaways” → „Pe scurt”, „Table of Contents” → „Cuprins”, butoanele „Share / Post”; titluri românești de produs pentru MNX („Pantaloni scurți MNX Hammer 3.0, negru”) păstrând numele englezesc al modelului; traduce titlul Judge.me din setările aplicației (acțiune proprietar).

**Cum verificăm (falsificabilitate):** grep pentru etichetele englezești returnează 0.

**Indicator timpuriu:** numărul de șiruri de interfață în engleză în corpuri.

#### CONTENT-18 — Semnale de conținut din imagini: alt lipsă pe 19 imagini principale și 43 imagini din corp; 493/493 imagini de produs fără alt

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | FIXED (live 12.10.2026) | M | 0.9 |

**Dovezi:** `featured_image_alt` false pe 19 articole; 43/2.210 imagini din corp fără alt; 493/493 imagini de produs fără alt pe 185 produse (`catalog-analysis.md`); imaginile din corpurile articolelor sunt vizualuri generice furnizate de generator (nicio fotografie originală de produs/sportiv observată în corpurile eșantionate). Severitate Low din perspectiva conținutului; constatarea completă aparține specialistului de imagini.

**Impact / pagini afectate:** 19 + 43 imagini de articol, 185 produse.

**Recomandare:** Verificare: `remediation-status.md` consemnează `alt` descriptiv în română scris din imaginea reală (ambalaj, aromă, unghi, purtat/întins) pe 493/493 imagini de produs (`applied/alt-text-plan.json`); confirmă cu `images_without_alt` = 0 într-un nou export `products-all.json` sau cu `curl -s https://primesupplements.ro/products/creatina-creapure | grep -c 'alt=""'` ≈ 0 pentru imaginile de produs. Rămâne: alt pe cele 19 imagini principale și 43 imagini din corp (scriptul de curățare doar numără `img_empty_alt`: 46, nu le completează); pentru articolele păstrate înlocuiește vizualurile de stoc cu fotografii originale (prim-planuri de etichetă, dozatoare, sportivi), care alimentează și semnalul de Experience.

**Cum verificăm (falsificabilitate):** numărul `images_without_alt` din `products-all.json`.

**Indicator timpuriu:** imagini de produs cu alt (țintă 100%); imagini de articol fără alt (țintă 0).

#### CLUSTER-17 — Verificare de realitate SERP: termenii-cap aparțin farmaciilor și publisherilor medicali; țintele câștigabile sunt intențiile long-tail românești, exact unde blogul are 3-11 URL-uri concurente fiecare

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | — | 0.6 |

**Dovezi:** WebSearch (instrument cu părtinire US, calitativ): „creatina beneficii” → medlife.ro, drmax.ro, catena.ro, antena3.ro (conținut plătit); „pudra proteica pentru masa musculara” → drmax.ro (categorie + produse), medlife.ro, decathlon.ro; „arzatoare de grasimi eficiente” → catena.ro categorie/produse, bulk.com/ro; „l carnitina slabit pareri” → advertoriale bzi.ro, substack, worldclass.ro; „cand se ia creatina dimineata sau seara” → forum.softpedia + spam în engleză, nicio autoritate românească; „izolat proteic vs concentrat proteic” → nutrada.com (blog B2B de ingrediente) ×7 limbi; „bcaa vs eaa diferente” → doar pagini în engleză; „glutamina beneficii efecte secundare” → nicio pagină românească în top (hola.com, decathlon.pt, pubmed). `site:primesupplements.ro creatina` a returnat 0 URL-uri primesupplements.ro (instrumentul nu onorează `site:`; de tratat ca neverificat, de confirmat în GSC). Termeni-cap: colecțiile trebuie să-i poarte (CONTENT-08 / CLUSTER-01), cu domeniile farmaciilor ca plafon realist (pozițiile 5-10). Long-tail: o singură pagină românească puternică per intenție poate lua top 3.

**Impact / pagini afectate:** strategie (întregul plan de clustere).

**Recomandare:** Harta de ținte folosită în planul de cluster: hub-uri = termeni-cap (creatină, pudră proteică, arzătoare de grăsimi, aminoacizi, vitamine și minerale, pre-workout, intra-workout, cremă de orez, batoane proteice, băuturi instant); spoke-uri = intenții long-tail cu SERP slab (când se ia X, X dimineața sau seara, X efecte secundare, X vs Y, X pentru slăbit păreri, cât durează până apar rezultatele). Nu mai scrie articole „beneficii” împotriva medlife/drmax; scrie paginile de comparație și dozare pe care ele nu le au.

**Cum verificăm (falsificabilitate):** raportul de interogări GSC după 8 săptămâni: spoke-urile long-tail păstrate în top 10 pentru interogarea din handle.

**Indicator timpuriu:** afișări pe interogări „X vs Y” / „cand se ia”.

### Ce nu am putut măsura

- **Fără Search Console, GA4 sau date de SERP** (sandbox fără chei Google; cota anonimă PageSpeed Insights epuizată, CrUX/GSC/GA4/Indexing API indisponibile): impactul este dedus din proprietățile conținutului, nu măsurat; starea de indexare a celor 354 articole este necunoscută; alegerea URL-ului păstrat în fiecare grup de intenție a folosit ca proxy linkurile de intrare, recența și calitatea handle-ului — de înlocuit cu URL-ul care are clicuri când GSC devine disponibil, înainte de a executa lista de 301.
- **Suprapunerea SERP este calitativă**: WebSearch (disponibil doar agentului `cluster`) este părtinitor US, a returnat pagini în spaniolă/portugheză/engleză pentru interogări românești și nu a onorat `site:`; numerele de URL-uri comune pe perechi nu au putut fi calculate, deci grupările se bazează pe dovezi de titlu/handle/produs plus 9 citiri calitative de SERP; agentul `content` nu avea WebSearch deloc.
- **Fără volume de căutare** (fără DataForSEO/Keywords Everywhere): judecățile „câștigabil” se sprijină doar pe compoziția SERP.
- **Scorerele din plugin folosesc lexicoane englezești** (`content_quality.py`, `content_verify.py` — `claim_count: 0` pe toate cele 12 corpuri, `content_humanize.py`): numerele lor sunt raportate ca atare, dar evaluarea în română se bazează pe citire directă și scanări regex deterministe; toate scorurile sunt euristici, nu semnale Google.
- **Eșantionare**: 15 din 355 corpuri au fost citite integral sau parțial; cifrele la nivel de corpus vin din scanări deterministe ale tuturor celor 355, dar judecățile calitative sunt eșantionate.
- **Acuratețea medicală** a fost evaluată doar ca plauzibilitate și sursare; un clinician trebuie să revizuiască piesele YMYL înainte de republicare. Acreditările autorului (carduri NPC PRO, lector FRCF, „Nutriționist Certificat”) nu au fost verificate în niciun registru.
- **Atribuirea la hub-uri este bazată pe reguli** (cuvânt-cheie în handle/titlu, apoi colecția produsului linkat); 77 articole s-au potrivit cu mai mult de un hub și au fost rezolvate prin precedența handle-ului; ~5% din atribuiri pot necesita corecție manuală.
- **Metafield-ul `collection.metafields.custom.seo_text`** nu a putut fi citit (ar fi necesitat o citire Admin API); paginile randate nu arată niciun astfel de text și secțiunea este `disabled: true`.
- **Cereri live limitate**: scripturile din plugin care preiau URL-uri eșuează în sandbox („Refusing configured HTTP proxy”), iar magazinul răspunde 429 („Verifying your connection...”) după rafale, deci s-a făcut o singură cerere live (`apa-de-cocos`, HTTP 200, 272 KB); restul vine din setul local de dovezi din 2026-10-12 și din exporturile Shopify Admin; fără browser headless, randarea JS a paginilor nu a fost observată (nu este critică pentru această secțiune).
