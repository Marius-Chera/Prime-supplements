# Teardown competitori – paginile de creatină care rankează în România · 15.10.2026

Magazin: primesupplements.ro (Shopify, tema Impact). Pagini-țintă: **PRODUS A** `creatina-creapure` (gid://shopify/Product/14971467268471), **PRODUS B** `creatina-monohidrat-micronized-300g-fara-aroma` (gid://shopify/Product/15404872368503), **COLECȚIA** `creatina` (gid://shopify/Collection/671131369847). Document de cercetare (read-only); nu s-a modificat nimic în magazin.

## 0. Metodă, acoperire și limite

- **Selecția paginilor:** (1) competitorii numiți de proprietar (Genius Nutrition, Vitabolic, Pro Nutrition, DY Nutrition); (2) brandurile cu site RO (GymBeam, Myprotein, Scitec, BioTechUSA, Weider, Olimp, Optimum Nutrition); (3) retailerii/farmaciile/marketplace-urile care domină SERP-ul tranzacțional conform `serp_comercial.md` §A (Farmacia Tei, Dr.Max, Decathlon, eMAG, Nutriland, Compari, Allnutrition, gym-stack, HighEnergy, Body Line); (4) paginile informaționale din top 5 pe „creatina” / „cea mai bună creatină” (gym-stack, HyperFit, TopGuides, Pareri Adevarate, Regina Maria, blogul DY). Total: **58 de înregistrări** (51 de pagini cu HTML complet + 7 blocate, documentate din rezumate WebFetch și snippet-uri Google).
- **Descărcare:** `curl -sL` cu UA de browser și `Accept-Language: ro-RO` (script `fetch_comp.sh`), fișierele în `serp_pages/` (crawl anterior, 15.10 ora 15:05) și `comp/` (crawl nou). **Blocate de Cloudflare/captcha** la curl (4 user-agent-i) și la WebFetch: pronutrition.ro (×2), decathlon.ro produs, drmax.ro (×2), emag.ro (511), compari.ro. Pentru Decathlon categoria a răspuns la WebFetch; pentru restul am folosit titlurile/snippet-urile Google (WebSearch extended cu `allowed_domains`) și paginile acelorași produse la retailerii care permit crawl-ul (Farmacia Tei, Nutriland, gym-stack). highenergy.ro și scitec.ro (categoria) livrează HTML gol (randare JavaScript) – marcate ca neevaluabile.
- **Parsare:** `parse_pages.py` (stdlib, rulat cu `python3 -I`) extrage title + lungime, meta description + lungime, H1/H2/H3 (fără header/footer/nav), numărul de cuvinte din conținutul principal (aproximativ – include cardurile de produse și widgeturile), tipurile JSON-LD (inclusiv @graph), AggregateRating, întrebările FAQPage, tabele, `<details>`, imagini (fără header/footer; „product-like” = URL de produs/CDN), video/iframe YouTube, select-uri/variante, widgeturi de recenzii, linkuri către bloguri/ghiduri și ~55 de semnale lexicale (ce este, cum se ia, efecte secundare, încărcare, dozare pe kg, micronizat, Creapure, dizolvare, păstrare, femei, vegan, claim 3 g, claim autorizat, masă musculară, forță, energie, recuperare, sigur, cea mai bună/pură, puritate %, testat în laborator, GMP/ISO/HACCP, studii, preț etc.). Rezultatele brute: `parsed_serp.json/.txt`, `parsed_comp.json/.txt`; textul lizibil al paginilor-cheie: `dump_B.txt … dump_H.txt` (`dump_text.py`).
- **Lungimea title-urilor** este măsurată pe textul `<title>`; la Genius HTML-ul conține span-uri ascunse care dublează titlul – am folosit `og:title`.
- **Numărul de cuvinte** este un proxy: la Farmacia Tei include lista de farmacii cu stoc, la GymBeam include recenziile și secțiunea „Logistică”, la temele Shopify (inclusiv a noastră) textul tab-urilor apare de 2–3 ori în HTML (desktop + mobil). Folosește-l pentru ordinea de mărime, nu pentru comparații fine.
- **Prețurile** apar doar ca observație de teardown; nu se preiau în niciun text de pe site. **Numele competitorilor** rămân în acest document intern; nu apar niciodată pe site.

## 1. Sinteza executivă

1. **Cea mai completă pagină de produs din România este GymBeam** (ambele: Creapure® și 100 % micronizată): 5 600–6 000 de cuvinte, 8–10 H2 tematice, FAQ vizibil + schema **FAQPage + QAPage**, tabel comparativ al propriilor forme (formă / materie primă / porție / preț pe porție / aditivi / pentru cine), 4 grafice (sisteme energetice, % creatină pură per formă, saturare cu/fără încărcare, omnivor vs vegetarian), secțiune „Rezultatele testelor de laborator”, 7 surse științifice numerotate, cod QS verificabil pe creapure.com, „Actualizat: mai 2026”, 6 linkuri către ghiduri, 1 693 / 8 595 recenzii, 4–5 gramaje × 3–5 arome. Este și pagina cu **cele mai multe claim-uri neconforme** („1–2 repetări în plus”, „mușchi vizibil mai plini în 3 săptămâni”, cronologie pe săptămâni, sarcopenie, cognitiv, GLP-1) și cu publicitate comparativă denigratoare la adresa „brandurilor locale mici”.
2. **Competitorii numiți de proprietar au pagini subțiri.** Genius: 700 de cuvinte unice, fără definiții, fără FAQ pe Creapure® (produsul era **stoc epuizat** la crawl), cu 5 claim-uri neconforme în „Beneficii cheie” (inclusiv „previne afecțiunile neurodegenerative”); pagina de 400 g are însă un FAQ vizibil de 7 întrebări (fără schema) și folosește claim-ul EFSA parafrazat de 6 ori. DY: 1 000 de cuvinte, 3 întrebări în acordeon, doză zilnică de 10 g, claim-uri de forță/masă/recuperare/creier; FAQ-ul util (10 întrebări) e pe colecție, nu pe produs. Vitabolic: meta description „creatina” (8 caractere), preț în EUR, 750 de cuvinte, dar o definiție corectă a micronizării. Pro Nutrition: blocat; din snippet-uri, pagina se bazează pe „99,9 % puritate testată”, cod QS, 5 g/zi, pauză după 8 săptămâni, „fără cofeină” și pe sute de recenzii, iar categoria /produse/creatina.html are titlu de ghid și un blog care rankează pe „creatina”.
3. **Paginile care câștigă interogările tranzacționale („fara aroma”, „300g”, „500g”, „pret”) sunt ale farmaciilor (Farmacia Tei, Dr.Max) și ale Nutriland**, nu prin conținut, ci prin șablon: titlu `Creatina monohidrata fara aroma, 300 g, OstroVit`, EAN, data expirării, stoc pe locații, scoruri „calitate-preț / răspunde așteptărilor / ar recomanda”, opțiuni de livrare cu prețuri și termene, „Cumpărate frecvent împreună”, tab Q&A, link către un ghid de ingredient. Nutriland adaugă „Cost pe porție” + „~88 de zile”, FAQPage cu 5–6 întrebări specifice produsului, badge „Produs în UE”, consultant AI, comparator – pe un boilerplate de 15 secțiuni despre gust/miros/textură/caking care e identic pe toate produsele.
4. **Formulări conforme există și la competitori** – dovadă că claim-ul autorizat poate fi linia-erou: Myprotein (nota 1: „Creatina s-a dovedit a crește semnificativ performanța fizică în cadrul sesiunilor de antrenament scurte, cu exerciții de intensitate ridicată. Efectul benefic este obținut printr-un aport zilnic de 3 g de creatină.”), Scitec („Creatina crește performanța fizică* … *Efect demonstrat științific, aprobat de EFSA”), Genius 400 g, cardurile Allnutrition („CREȘTE PERFORMANȚA FIZICĂ”). Toți ceilalți amestecă claim-ul cu forță/masă/recuperare/energie/creier.
5. **Elemente pe care NICIO pagină RO nu le acoperă bine (spațiu liber):** (a) Creapure® vs monohidrat generic explicat cu criterii obiective și fără denigrare; (b) cum verifici listarea unui brand pe creapure.com (noi suntem listați – competitorii o afirmă, nu o arată cu link); (c) relația „micronizată” ↔ Creapure® (GymBeam afirmă că AlzChem nu produce Creapure® micronizată – **de verificat pe eticheta produsului A** înainte de a folosi cuvântul în textele noi); (d) cât ține un tub la 3 g vs 5 g pe zi; (e) protocol de dozare după greutate **de pe etichetă** (doar Weider are unul, vechi, cu pauze); (f) păstrare după deschidere (doar DY); (g) sediment/dizolvare explicate onest (doar boilerplate-ul Nutriland); (h) contraindicații clare (sarcină, alăptare, sub 18 ani) – rare; (i) combinarea cu alte produse din gamă care conțin creatină, cu „nu depăși doza” (nimeni); (j) FAQ specific produsului în schema FAQPage (GymBeam, Nutriland, HyperFit doar); (k) surse (GymBeam) și dată de actualizare (GymBeam, HyperFit); (l) claim-ul 55+ cu condițiile lui (Myprotein îl amintește doar în FAQ-ul categoriei).
6. **Paginile noastre azi** (secțiunea F): A are claim-ul EFSA verbatim (×7), 5 întrebări, 2 gramaje, 17 recenzii 5,0, dar fără definiție a creatinei, fără volum de apă, fără păstrare/alergeni, fără link spre creapure.com (menționat de 12 ori, nelinkat), fără „fabricat în UE într-o unitate certificată ISO și HACCP” (permis de etichetă), fără linkuri către ghiduri, fără FAQPage, doar 2 imagini. B are definiția micronizării, pașii de preparare, alergeni, păstrare, „Fabricat pentru”, dar nu reproduce protocolul de pe etichetă, nu are „fără aromă” în title, are o recenzie de 1★ care întreabă de certificare (răspunsul permis: „unitate certificată ISO și HACCP”), 3 imagini, rating 3,0 (2). Colecția e corect scurtă și trimite la 3 ghiduri.

## 2. Șabloane care rankează (din title/H1/meta ale paginilor descărcate)

| Element | Ce fac paginile din top | Observație pentru A / B |
|---|---|---|
| Title produs | `Creatina monohidrata fara aroma, 300 g, OstroVit : Farmacia Tei online` (70) · `Creatină monohidrată 100% Creapure® - GymBeam \| GymBeam.ro` (58) · `100% Creatină monohidrată micronizată - GymBeam \| GymBeam.ro` (60) · `Creapure® 300g \| Genius Nutrition®` (33) · `100% Creatine Monohydrate (300 gr.) - Scitec Nutrition` (54) · `Creatină monohidrat Creapure® gust neutru 300g DECATHLON` (57) | Concept + „monohidrat(ă)” + atribut (Creapure® / micronizată / fără aromă) + gramaj + brand. Title-ul B nu conține „fără aromă” (9/9 titluri care rankează pe „fara aroma” îl au). Title-urile prea lungi (Nutriland 110–125, Olimp 92–97, Vitabolic 102) sunt trunchiate. |
| H1 | Genius/Olimp/Nutriland pun gramajul și porțiile în H1 („CREATINE WITH CREAPURE® 300g/100serv”, „… 250g (83 de portii)”) | H1 = titlul produsului (nu se schimbă); porțiile intră în prima propoziție din Descriere. |
| Meta description | Cele bune: 130–155 caractere, cu „3 g”, „fără aromă”, gramaj, porții. Cele slabe: „creatina” (Vitabolic), text generic de magazin (GymBeam categorie), preț în meta (Farmacia Tei), 250–360 caractere (Olimp, Vitabolic categorie), emoji ✅⭐ (Nutriland, gym-stack), lipsă (TopGuides). | Ale noastre sunt în interval (152 / 145). |
| H2 care apar la cele mai complete pagini | „Ce este Creapure®”, „Pentru cine este potrivită”, „Dozaj și mod de administrare”, „Cum recunoașteți Creapure® original”, „Rezultatele testelor de laborator”, „FAQ”, „Cum se dozează creatina”, „Creatină micronizată – o pulbere mai fină care se dizolvă mai bine”, „Ce conțin…?”, „Cum trebuie consumate…?”, „Informații nutriționale”, „Întrebări frecvente despre…” | Vezi blueprint-ul §5. |
| Semnale de încredere | QS code + sigiliu Creapure® (GymBeam, Genius, Pro Nutrition), teste HPLC/lot (GymBeam), IFS/GMP/HACCP/cGMP (GymBeam, DY, Genius „prezentat de producător”), Informed Sport (Myprotein), Cologne List (GymBeam), „Produs în UE” (Nutriland, Scitec, noi), EAN + data expirării (Farmacia Tei), recenzii cu număr (toți), test de utilizatori (Decathlon), testimoniale (BioTech) | Permise la noi: listarea pe creapure.com (cu link), „fabricat în UE într-o unitate certificată ISO și HACCP”, EAN/GTIN în schema, recenziile Judge.me reale, „Produs pentru: Prime Sport Supplements SRL…”. Nepermise: „99,9 % puritate” fără certificat propriu de lot, „testat în laborator” fără raport publicabil, „calitate farmaceutică”. |

## 3. Matricea elementelor (pagini de produs; ✓ = prezent, ◐ = parțial, – = absent, ? = necunoscut)

Legenda coloanelor: FAQ = FAQ vizibil · FS = schema FAQPage · TC = tabel comparativ · Dz = doză în g + volum de lichid · Înc = protocol de încărcare explicat · Kg = dozare după greutate · CeE = „ce este creatina” · Expl = Creapure®/micronizată explicate · Ctr = efecte secundare/contraindicații · Rec = recenzii cu număr · Vid = video · Img = ≥ 5 imagini de produs · Gr = ≥ 2 gramaje · Gh = linkuri către ghiduri · EFSA = claim-ul autorizat cu condiția 3 g · Disc = disclaimer supliment · Fab = fabricat în / certificări · Dur = cât ține ambalajul · Păs = păstrare · Alg = alergeni · PtC = pentru cine · Src = surse · QS = cod/sigiliu Creapure®

| Pagină | FAQ | FS | TC | Dz | Înc | Kg | CeE | Expl | Ctr | Rec | Vid | Img | Gr | Gh | EFSA | Disc | Fab | Dur | Păs | Alg | PtC | Src | QS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Genius Creapure® 300 g | – | – | – | ✓ | – | – | – | ◐ | – | ✓ 66 | – | ✓ | – | – | – | ✓ | ◐ | ◐ | ✓ | – | ◐ | – | ✓ |
| Genius Monohydrate 400 g | ✓ 7 | – | – | ✓ | – | – | ◐ | – | – | – | – | ✓ | – | – | ✓ | ✓ | – | ◐ | ✓ | – | – | – | n/a |
| Vitabolic 300 g (site propriu) | – | – | – | ✓ | – | – | ✓ | ✓ | – | ✓ 3 | – | ✓ | – | – | ◐ | ✓ | ✓ | ◐ | – | ◐ | – | – | n/a |
| Pro Nutrition Creapure® (snippet) | ? | ? | ? | ✓ | – | – | ? | ? | ? | ✓ | ? | ? | ? | ✓ | ? | ✓ | ✓ | ? | ? | ? | ? | ? | ✓ |
| DY Monohidrată 300 g | ✓ 3 | – | – | ✓ | – | – | – | – | – | ✓ 78 | – | ✓ | ✓ | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | n/a |
| GymBeam Creapure® | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ◐ | ✓ 1 693 | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ◐ | ✓ | ✓ | ✓ | ✓ |
| GymBeam micronizată | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ◐ | ✓ 8 595 | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ◐ | ✓ | ✓ | ✓ | n/a |
| Myprotein pulbere | – | – | – | ◐ | – | – | – | – | – | ✓ 138 | – | ✓ | ✓ | – | ✓ | ✓ | – | ◐ | ◐ | ✓ | ◐ | – | n/a |
| Scitec 300 g | – | – | – | ✓ | – | – | – | – | – | ✓ 202 | – | – | ◐ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ◐ | n/a |
| BioTechUSA 500 g | – | – | – | ✓ | – | – | ◐ | ✓ | – | ✓ 5 247 | – | ✓ | ✓ | – | ◐ | ✓ | ✓ | ◐ | – | ✓ | ✓ | ✓ | n/a |
| Weider Pure Creatine 250 g | – | – | – | ✓ | ✓ | ✓ | ◐ | – | – | ✓ 30 | – | ✓ | ◐ | – | – | – | ✓ | – | ✓ | – | – | – | n/a |
| Weider Premium Creapure® 375 g | – | – | – | ✓ | – | – | ◐ | ◐ | – | ✓ 2 | – | ✓ | – | – | ✓ | – | – | ◐ | – | – | – | – | – |
| Olimp pudră 250 g | – | – | – | ✓ | – | – | ✓ | – | – | ✓ 40 | ✓ | ◐ | – | – | – | ◐ | – | ◐ | ✓ | ◐ | ◐ | ✓ | n/a |
| Decathlon Creapure® 300 g (snippet) | ? | ? | ? | ✓ | – | – | ? | ? | ✓ | ✓ test | ? | ? | – | ? | ? | ? | ✓ | ◐ | ? | ? | ? | ? | ? |
| Farmacia Tei – OstroVit 300 g | – | – | – | ✓ | – | – | – | – | – | ✓ 6 | – | ✓ | ◐ | ✓ | – | ✓ | – | – | ◐ | – | – | – | n/a |
| Nutriland – Scitec 300 g | ✓ | ✓ 5 | – | ✓ | ◐ | – | ◐ | ◐ | – | ✓ 2 | – | ✓ | – | – | ✓ | ◐ | ✓ | ✓ | ✓ | ◐ | ◐ | – | n/a |
| **Prime A – Creapure® (azi)** | ✓ 5 | – | – | ◐ | – | – | – | ◐ | – | ✓ 17 | – | – (2) | ✓ | – | ✓ | ✓ | ◐ | ✓ | – | – | ✓ | – | ◐ (menționat, nelinkat) |
| **Prime B – micronizată 300 g (azi)** | ✓ 5 | – | – | ✓ | – (eticheta îl are) | – (eticheta îl are) | – | ✓ | – | ✓ 2 | – | – (3) | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | n/a |

Frecvențe (16 pagini de competitori cu date): FAQ vizibil 6/16 · FAQPage 3/16 · tabel comparativ 2/16 · doză + lichid 15/16 · încărcare explicată 3/16 · dozare după kg 2/16 · „ce este creatina” 5/16 (+4 parțial) · Creapure®/micronizată explicate 4/16 · contraindicații clare 2/16 · recenzii cu număr 15/16 · video 3/16 · ≥ 5 imagini 12/16 · ≥ 2 gramaje 6/16 · linkuri către ghiduri 4/16 · claim EFSA cu 3 g 8/16 · disclaimer 11/16 · fabricat/certificări 10/16 · cât ține ambalajul 5/16 · păstrare 8/16 · alergeni 8/16 · pentru cine 6/16 · surse 4/16 · cod QS 3/4 pagini Creapure®.


## 4. Teardown pagină cu pagină (58 de înregistrări)

## A. Competitorii numiți de proprietar

### 1. Genius Nutrition – produs Creapure® 300 g
- **URL:** https://geniusnutrition.ro/products/creapure
- **Metodă:** curl (HTML complet)
- **Title:** Creapure® 300g | Genius Nutrition® (34 caractere; HTML-ul conține span-uri ascunse care dublează textul)
- **Meta description (114 caractere):** Comanda online Creatina Creapure® de la Genius Nutrition in Romania. 100% Creapure Creatine fabricata in Germania.
- **H1:** CREATINE WITH CREAPURE® 300g/100serv; CREATINE WITH CREAPURE® creatina monohidrata pura; CREATINE WITH CREAPURE® creatina monohidrata pura
- **H2:** Formula bazata exclusiv pe Creapure®.; Un ingredient simplu pentru efort fizic intens.; Ce contine CREATINE WITH CREAPURE®?; Cum poate fi utilizata?; Cum se foloseste CREATINE WITH CREAPURE®; CREATINE WITH CREAPURE® by Genius Nutrition®; Formula bazata exclusiv pe Creapure®.; Un ingredient simplu pentru efort fizic intens.; Ce contine CREATINE WITH CREAPURE®?; Cum poate fi utilizata?; Cum se foloseste CREATINE WITH CREAPURE®; CREATINE WITH CREAPURE® by Genius Nutrition®; Întreabă consultantul AI
- **H3:** Ce defineste formula; Creatina monohidrata; Sistem energetic; 3000 mg per cupa; 100 portii; Pre-antrenament; 150 ml lichid; Ce defineste formula; Creatina monohidrata; Sistem energetic; 3000 mg per cupa; 100 portii; Pre-antrenament; 150 ml lichid; Cos de cumparaturi
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1395
- **JSON-LD:** AggregateRating, Brand, BreadcrumbList, DefinedRegion, ListItem, MerchantReturnPolicy, MonetaryAmount, Offer, OfferShippingDetails, Organization, Product, ProductGroup, QuantitativeValue, ShippingDeliveryTime · AggregateRating 4.7 (66)
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 4 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 0 · Creapure 46 · dizolvare 0 · păstrare 4 · femei 4 · vegan 2 · claim 3 g 2 · „crește performanța fizică” 0 · disclaimer 2 · masă musculară 0 · forță 2 · energie 2 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 4 · studii 0 · preț (lei) 4
- **FAQ vizibil:** nu (acordeoanele sunt tab-uri: Beneficii cheie / Despre produs / Valori nutriționale / Ingrediente / Detalii produs)
- **Tabele:** 2 (valori nutriționale)
- **Dozare / protocol:** 1–2 cupe (1 cupă = 3 g = 3000 mg) cu ~150 ml apă sau băutură cu carbohidrați, ~20 min înainte de antrenament; fără protocol de încărcare; fără dozare după greutate
- **Recenzii:** widget stamped, review; numere vizibile în text: –
- **Imagini / video:** 6 imagini de produs (galerie) + bannere; fără video
- **Variante / mărimi:** o singură variantă: 300 g, Unflavored (la crawl: STOC EPUIZAT, precomandă)
- **Trust / USP:** „Fiecare recipient include sigiliul original Creapure® și numărul de identificare al licenței” (18GN15); „fără aditivi, conservanți și coloranți”; „0 g zaharuri, 0 g fillers”; „produs prezentat de producător ca fabricat conform GMP și HACCP”; cupă inclusă; widget „Întreabă consultantul AI”; politică retur + livrare în schema
- **Linkuri interne către ghiduri:** 0 linkuri către ghiduri/blog
- **Claim-uri folosite – NECONFORME (nu copiem):** „Mărește forța și rezistența fizică”, „Hidratează și volumizează celula musculară”, „Crește nivelul de ATP”, „Stimulează sinteza proteinelor”, „Previne afecțiunile neurodegenerative” (claim de boală – interzis), „Sistem energetic”
- **Claim-uri conforme / neutre:** „Creatina participă la sistemele energetice utilizate în eforturile fizice de intensitate ridicată” (neutru); „un ingredient simplu pentru efort fizic intens”
- **Ce NU răspunde pagina:** ce este creatina; ce este Creapure® și cum verifici licența; Creapure® vs monohidrat generic; micronizată sau nu; când se ia în zilele fără antrenament; cât ține tubul (doar „100 porții”); efecte secundare / retenție de apă; alergeni; păstrare după deschidere; femei / vegani; combinare cu proteine (doar „băutură cu carbohidrați”)

### 2. Genius Nutrition – produs Creatine Monohydrate 400 g (micronizată)
- **URL:** https://geniusnutrition.ro/products/creatine-monohydrate-400g
- **Metodă:** curl (HTML complet)
- **Title:** Creatine Monohydrate 400g | Genius Nutrition® (45 caractere; HTML-ul conține span-uri ascunse care dublează textul)
- **Meta description (122 caractere):** Comanda online in Romania Creatina Monohidrata 400g de la Genius Nutrition. Premium creatine monohydrate 100% micronizata.
- **H1:** CREATINE MONOHYDRATE 400g/133serv; CREATINE MONOHYDRATE; CREATINE MONOHYDRATE
- **H2:** CREATINE MONOHYDRATE; CREATINE MONOHYDRATE; Întreabă consultantul AI
- **H3:** 3000 mg per portie; Performanta fizica; Formula simpla; Creatina; Recipient; Portii; Micronizata; 3000 mg per portie; Performanta fizica; Formula simpla; Creatina; Recipient; Portii; Micronizata; Cos de cumparaturi
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1480
- **JSON-LD:** Brand, BreadcrumbList, DefinedRegion, ListItem, MerchantReturnPolicy, MonetaryAmount, Offer, OfferShippingDetails, Organization, Product, ProductGroup, QuantitativeValue, ShippingDeliveryTime
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 12 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 38 · Creapure 0 · dizolvare 2 · păstrare 4 · femei 4 · vegan 2 · claim 3 g 8 · „crește performanța fizică” 6 · disclaimer 2 · masă musculară 0 · forță 2 · energie 8 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 4
- **FAQ vizibil:** DA, vizibil, 7 întrebări în <details> (Câtă creatină conține o porție? Câte porții? Este micronizată? Are aromă? Cum se administrează în zilele de antrenament / de pauză? La ce contribuie creatina?) – FĂRĂ schema FAQPage
- **Tabele:** 4 (componentă/cantitate, valori nutriționale)
- **Dozare / protocol:** zile de antrenament: 3 g cu 250 ml apă înainte de antrenament; zile de pauză: 3 g între mese; „o măsură per administrare”; fără încărcare; fără dozare după greutate
- **Recenzii:** widget stamped, review; numere vizibile în text: –
- **Imagini / video:** 6 imagini de produs; fără video
- **Variante / mărimi:** o singură variantă: 400 g, fără aromă (în stoc)
- **Trust / USP:** „Formula simplă. 3 g per porție”; „aproximativ 133 porții”; „100% micronizată”; „fără aditivi, conservanți și coloranți”; cupă inclusă; „Întreabă consultantul AI”
- **Linkuri interne către ghiduri:** 0 linkuri către ghiduri/blog
- **Claim-uri folosite – NECONFORME (nu copiem):** în „Beneficii cheie”: „Crește producția de energie (ATP)”, „Mărește forța și rezistența fizică”, „Stimulează sinteza proteinelor”, „Hidratează și volumizează celula musculară”, „Previne afecțiunile neurodegenerative” (claim de boală)
- **Claim-uri conforme / neutre:** „Creatina crește performanța fizică în serii succesive de exerciții scurte, de intensitate ridicată, la un aport zilnic de 3 g” (parafrază apropiată de claim-ul autorizat, repetată de 6 ori) + disclaimerul complet
- **Ce NU răspunde pagina:** ce este creatina (o frază); ce înseamnă micronizată (doar „da”); efecte secundare; încărcare; cât ține recipientul în zile; dizolvare/sediment; alergeni; vegani; femei; comparație cu Creapure®; păstrare după deschidere

### 3. Genius Nutrition – colecție /collections/creatina
- **URL:** https://geniusnutrition.ro/collections/creatina
- **Metodă:** curl
- **Title:** Creatina | Magazin Online Genius Nutrition® (43 caractere)
- **Meta description (138 caractere):** Comanda online suplimente cu creatina: Creatina Monohidrata, Creatina HCL, Creatina Creapure de la Genius Nutrition cu livrare in Romania.
- **H1:** –
- **H2:** –
- **H3:** Cos de cumparaturi
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 375
- **JSON-LD:** BreadcrumbList, ListItem, Organization
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 2 · Creapure 3 · dizolvare 0 · păstrare 0 · femei 0 · vegan 5 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 0 · energie 2 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 17
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** –
- **Recenzii:** widget stamped, review; numere vizibile în text: 176, 224, 66, 4, 19
- **Imagini / video:** 14 imagini de card
- **Variante / mărimi:** 7 carduri de produs (300 g, 400 g, 405 g CREAF7, 720 g…)
- **Trust / USP:** meta description enumeră tipurile (Monohidrată, HCL, Creapure) + „livrare în România”; numere de recenzii Stamped pe carduri (176, 224, 66…)
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** –
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** fără H1, fără text de categorie, fără ghid, fără FAQ – pagina rankează doar prin brand

### 4. Vitabolic – produs 100% Micronized Creatine Monohydrate 300 g (site propriu)
- **URL:** https://www.suplimente-vitabolic.ro/catalog-suplimente/creatina-si-volumizatoare/suta-la-suta-creatine-micronized-400g
- **Metodă:** curl
- **Title:** 100% Micronized Creatine Monohydrate 300g - Creatină - Vitabolic - Magazin online suplimente naturiste (102 caractere)
- **Meta description (8 caractere):** creatina
- **H1:** 100% Micronized Creatine Monohydrate 300g
- **H2:** Descriere; Rating
- **H3:** Evaluează acest produs (100% Micronized Creatine Monohydrate 300g); Opinia clienților:
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 729
- **JSON-LD:** AdministrativeArea, AggregateRating, Brand, BreadcrumbList, ContactPoint, Country, ImageObject, ListItem, Offer, OnlineStore, OpeningHoursSpecification, Organization, PostalAddress, Product, PropertyValue, WebPage, WebSite · AggregateRating 4.7 (3)
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 3 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 8 · Creapure 0 · dizolvare 3 · păstrare 0 · femei 0 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 3 · forță 0 · energie 1 · recuperare 2 · sigur 1 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 1 · preț (lei) 3
- **FAQ vizibil:** nu
- **Tabele:** 1 (valori nutriționale)
- **Dozare / protocol:** 1 cupă (3 g) pe zi, dizolvată în suc, apă sau băutura favorită; aromată: 1 cupă cu vârf (4 g); fără încărcare
- **Recenzii:** widget review; numere vizibile în text: 3
- **Imagini / video:** 10 (galerie + thumbnails); fără video
- **Variante / mărimi:** arome: natural flavor (100 porții × 3 g), blueberry, raspberry (75 porții × 4 g); 1 variantă de gramaj (URL spune 400g, pagina 300 g); preț afișat în EUR
- **Trust / USP:** „Fabricat în Spania, EU”; definiție scurtă a micronizării („pulbere foarte fină… particule măsurate în microni… solubilitate crescută”); „creatina monohidrat este cea mai studiată formă”; listare pe creapure.com (produsul Creapure separat)
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** „Suplimente esențiale pentru a construi masa musculară!”, „Stimularea țesutului muscular”, „Volum crescut al celulelor musculare”, „Refacere mai rapidă post-antrenament”, „Sinteză crescută a glicogenului”, „ritmul rapid cu care se construiește masa musculară”, „sigură și eficientă”
- **Claim-uri conforme / neutre:** „Crește performanța musculară de intensitate înaltă” (aproximativ, fără condiția 3 g)
- **Ce NU răspunde pagina:** meta description = „creatina” (8 caractere – snippet-ul Google e luat din text); când se ia; încărcare; efecte secundare; păstrare; alergeni (text generic de contaminare încrucișată); cât ține flaconul; Creapure® vs micronizată

### 5. Vitabolic – categorie Creatină (site propriu)
- **URL:** https://www.suplimente-vitabolic.ro/catalog-suplimente/creatina-si-volumizatoare/vitabolic
- **Metodă:** curl
- **Title:** Creatină - Vitabolic - Catalog produse - Vitabolic - Magazin online suplimente naturiste (88 caractere)
- **Meta description (358 caractere):** Creatina este o substanta care se gaseste in mod natural in corpul uman, cea mai mare parte in muschii scheletici. Principalul rol al creatinei este acela de a produce energie si de a volumiza muschi. Creatina este unul din cel mai consumat supliment nutritiv de catre practicantii culturismului, comercializandu-se sub diferite forme: praf, capsule, lichid.
- **H1:** –
- **H2:** –
- **H3:** –
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 201
- **JSON-LD:** AdministrativeArea, BreadcrumbList, CollectionPage, ContactPoint, Country, ImageObject, ListItem, OnlineStore, OpeningHoursSpecification, Organization, PostalAddress, PropertyValue, WebSite
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 0 · Creapure 0 · dizolvare 0 · păstrare 0 · femei 0 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 1 · forță 0 · energie 0 · recuperare 1 · sigur 1 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 3
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** –
- **Recenzii:** widget niciunul; numere vizibile în text: –
- **Imagini / video:** 0 server-side
- **Variante / mărimi:** listă de produse (JS)
- **Trust / USP:** –
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** meta description (358 caractere): „produce energie și… volumiza mușchi”, „cel mai consumat supliment”
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** fără H1/H2, 200 de cuvinte, fără conținut – nu este un competitor de conținut

### 6. Vitabolic (via Farmacia Tei) – produs „Creatina, 300 g, Vitabolic” (= Pure Creatine Creapure®, 100 porții)
- **URL:** https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina/creatina-300-g-vitabolic-p384268
- **Metodă:** curl
- **Title:** Creatina, 300 g, Vitabolic : Farmacia Tei online (48 caractere)
- **Meta description (232 caractere):** Pret: 106,00 Lei - 100 portii - Proprietati:- creatina poate ajuta muschii sa produca energie in timpul ridicarilor grele sau al exercitiilor fizice de mare intensitate;- creatina poate contribui la cresterea masei musculare, spores
- **H1:** Creatina, 300 g, Vitabolic
- **H2:** Eticheta produs; Optiuni Livrare; Informații Produs; Cumparate frecvent impreuna; Alte produse ale brandului Vitabolic
- **H3:** Creatina, 300 g, Vitabolic [8435483512405]; Creatina, 300 g, Vitabolic [8435483512405]
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 943
- **JSON-LD:** Brand, BreadcrumbList, ListItem, Offer, Organization, Product
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 2 · Creapure 2 · dizolvare 1 · păstrare 2 · femei 3 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 1 · forță 0 · energie 2 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 22
- **FAQ vizibil:** tab „Întrebări și răspunsuri (0)”
- **Tabele:** 1 (valori nutriționale)
- **Dozare / protocol:** din descrierea Tei (pe scurt)
- **Recenzii:** widget opinii, review; numere vizibile în text: 2, 6, 2, 5
- **Imagini / video:** ~21 imagini de produs/related (galerie Tei); H2 „Eticheta produs” = poza etichetei; fără video
- **Variante / mărimi:** 1 (300 g); alte gramaje ca linkuri
- **Trust / USP:** șablonul Farmacia Tei: EAN, data expirării, „Vândut de”, disponibilitate pe farmacii, scor „calitate-preț / răspunde așteptărilor / ar recomanda”, opțiuni livrare (Pachetomat, Click&Collect), voucher; link către ghidul „info-tei/ingrediente-active/creatina”
- **Linkuri interne către ghiduri:** 1 (ghid ingredient Tei)
- **Claim-uri folosite – NECONFORME (nu copiem):** meta: „creatina poate ajuta mușchii să producă energie în timpul ridicărilor grele…; poate contribui la creșterea masei musculare…” + prețul în meta description
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** tot ce e educațional: ce este Creapure®, când se ia, încărcare, efecte secundare, cât ține, alergeni

### 7. Vitabolic (via Farmacia Tei) – produs „Creatina monohidrata, 300 g, Vitabolic” (micronizată, fără aromă)
- **URL:** https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina/creatina-monohidrata-300-g-vitabolic-p400783
- **Metodă:** curl
- **Title:** Creatina monohidrata, 300 g, Vitabolic : Farmacia Tei online (60 caractere)
- **Meta description (213 caractere):** fara aroma - Proprietati:- poate contribui la stimularea tesutului muscular;- poate contribui la volumul crescut al celulelor musculare;- refacere mai rapida post-antrenament;- sinteza crescuta a glicogenului;- cr
- **H1:** Creatina monohidrata, 300 g, Vitabolic
- **H2:** Eticheta produs; Informații Produs; Cumparate frecvent impreuna; Alte produse ale brandului Vitabolic
- **H3:** Creatina monohidrata, 300 g, Vitabolic [8435569318662]; Creatina monohidrata, 300 g, Vitabolic [8435569318662]
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 866
- **JSON-LD:** Brand, BreadcrumbList, ListItem, Offer, Organization, Product
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 2 · Creapure 1 · dizolvare 1 · păstrare 2 · femei 3 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 0 · energie 0 · recuperare 1 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 18
- **FAQ vizibil:** tab Q&A (0)
- **Tabele:** 1
- **Dozare / protocol:** 1 cupă (3 g)/zi
- **Recenzii:** widget opinii, review; numere vizibile în text: 2, 6, 2, 5
- **Imagini / video:** ~21; fără video
- **Variante / mărimi:** 1 (300 g)
- **Trust / USP:** idem șablon Tei (fără scor de opinii – produs nou)
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** meta: „poate contribui la stimularea țesutului muscular; volumul crescut al celulelor musculare; refacere mai rapidă post-antrenament; sinteză crescută a glicogenului”
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** idem – pagină de catalog, nu de conținut

### 8. Vitabolic (via Nutriland) – produs „Creatina monohidratata micronizata, pudra, 300g, Vitabolic”
- **URL:** https://www.nutriland.ro/products/micronized-creatine-monohydrate-pudra-300g-vitabolic-supliment-crestere-masa-musculara
- **Metodă:** curl
- **Title:** Creatina monohidratata micronizata, pudra, 300g, Vitabolic, Supliment crestere masa musculara - Nutriland – Nutriland® (118 caractere)
- **Meta description (175 caractere):** Creatina monohidratata micronizata, pudra, 300g, Vitabolic, Supliment crestere masa musculara ➜ Achizitioneaza de pe Nutriland ➤ beneficiezi de ✅ Calitate ✅ Preturi accesibile
- **H1:** Creatina monohidratata micronizata, pudra, 300g, Vitabolic, Supliment crestere masa musculara
- **H2:** Întreabă consultantul AI; Creatina monohidratata micronizata, pudra, 300g, Vitabolic, Supliment crestere masa musculara - detalii produs; Intrebari Frecvente despre Creatina monohidratata micronizata, pudra, 300g, Vitabolic, Supliment crestere masa musculara; Informatii suplimentare; Compară cu produse similare; FAQ; E-BOOK 1: Cum sa iti optimizezi antrenamentele cu ajutorul suplimentelor, nivel: INCEPATOR
- **H3:** De 14 ani; Transport GRATUIT; EasyBox & GLS; Plata; 1. Gustul si aromele sunt subiective; 2. Ce inseamna Unflavoured / Fara aroma?; 3. Mirosul produsului; 4. Textura, consistenta si solubilitatea; 5. Prepararea si utilizarea corecta; 6. Diferente intre producatori si loturi; 7. Preferinta personala versus neconformitate; 8. Alegerea produsului si politica de retur; 1. Higroscopicitatea – de ce unele ingrediente atrag umiditatea?; 2. Ce este fenomenul de Caking (aglomerare si compactare)?; 3. De ce pot aparea bulgarasi inclusiv in creatina monohidrata?; 4. Aglomerarea afecteaza calitatea sau eficienta produsului?; 5. Cum se poate utiliza un produs care prezinta aglomerari?; 6. Cum poate fi limitata formarea aglomerarilor?; 7. Informatii importante privind conformitatea produsului
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 5704
- **JSON-LD:** Answer, Brand, BreadcrumbList, FAQPage, ListItem, MerchantReturnPolicy, Offer, OfferShippingDetails, Organization, Product, ProductGroup, Question · FAQPage cu 6 întrebări
- **Semnale text (număr de apariții):** „ce este” 1 · „cum se ia/administrare” 3 · „efecte secundare” 1 · încărcare 3 · menținere 0 · dozare după kg 1 · micronizat 16 · Creapure 0 · dizolvare 10 · păstrare 8 · femei 3 · vegan 2 · claim 3 g 1 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 10 · forță 0 · energie 1 · recuperare 10 · sigur 2 · cea mai bună/pură 6 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 36
- **FAQ vizibil:** DA – H2 „Întrebări Frecvente despre…” + schema FAQPage cu 6 întrebări (toate aromele conțin doar creatină? câtă creatină/porție și câte porții? alergeni? trebuie fază de încărcare? cum prepari? e normal să rămână particule?)
- **Tabele:** 1
- **Dozare / protocol:** 3 g, o porție pe zi, fără încărcare
- **Recenzii:** widget judge.me, jdgm, yotpo, loox, okendo, review; numere vizibile în text: –
- **Imagini / video:** ~28 (galerie + related); fără video
- **Variante / mărimi:** arome (natural / raspberry / blueberry) – 4 oferte în schema
- **Trust / USP:** „Cost pe porție” + „~100 zile”; „Produs în UE”; „De 14 ani retailerul român #1”; transport gratuit >300 lei; consultant AI; „Compară cu produse similare”; e-book; ghid generic de 15 secțiuni despre gust/„fără aromă”/miros/textură/caking (boilerplate pe toate produsele)
- **Linkuri interne către ghiduri:** 0 (dar FAQ intern)
- **Claim-uri folosite – NECONFORME (nu copiem):** titlu + H1 + meta: „Supliment creștere masă musculară”; în text „masă musculară” ×10, „recuperare” ×10, „fără efecte secundare” ×1
- **Claim-uri conforme / neutre:** 3 g/zi menționat
- **Ce NU răspunde pagina:** Creapure® vs micronizată; când se ia; efecte secundare reale; păstrare după deschidere (doar generic)

### 9. Vitabolic (via suplimente.ro) – produs „Creatină Monohidrată Micronizată 100% pură – 300g”
- **URL:** https://www.suplimente.ro/performanta-sportiva/creatina/vitabolic-creatina-monohidrata-micronizata-100-pura-300g
- **Metodă:** curl
- **Title:** Creatină Monohidrată Micronizată 100% pură - 300g | Vitabolic (61 caractere)
- **Meta description (168 caractere):** Creatină Monohidrată Micronizată 100% pură – 300 g, pulbere disponibilă cu aromă sau fără aromă. Produs fabricat conform standardelor GMP. Supliment original Vitabolic.
- **H1:** Creatină Monohidrată Micronizată 100% pură - 300g
- **H2:** –
- **H3:** Optiuni disponibile; PRODUSE SIMILARE; PROMOTII; ALȚII AU CUMPĂRAT ȘI...
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1386
- **JSON-LD:** Brand, BreadcrumbList, ListItem, Offer, Organization, Product, SearchAction, WebSite
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 1 · menținere 2 · dozare după kg 0 · micronizat 16 · Creapure 0 · dizolvare 4 · păstrare 3 · femei 1 · vegan 4 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 3 · forță 3 · energie 5 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 1 · studii 0 · preț (lei) 3
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** fază de încărcare + menținere menționate (incarcare ×1, mentinere ×2)
- **Recenzii:** widget review; numere vizibile în text: –
- **Imagini / video:** ~21 (incl. related); fără video
- **Variante / mărimi:** cu/fără aromă (2 oferte)
- **Trust / USP:** „Produs fabricat conform standardelor GMP”; „supliment original Vitabolic”
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** „masă musculară” ×3, „forță” ×3, „energie” ×5
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** pagină de retailer standard, fără FAQ, fără schema de recenzii

### 10. Pro Nutrition – produs „Creatine Creapure®” (pulbere)
- **URL:** https://www.pronutrition.ro/creatine-creapurer.html
- **Metodă:** BLOCAT (Cloudflare 403 la curl cu 4 UA diferite și la WebFetch) – date din snippet-urile Google (WebSearch extended, allowed_domains=pronutrition.ro)
- **Title:** Creatine Creapure® Pro Nutrition - Creatină monohidrată (54 caractere)
- **Meta description:** (nedisponibil; paginile de recenzii au titlul „Creatine Creapure® 99,9% Puritate testată”)
- **H1:** (nedisponibil)
- **H2/H3:** (din snippet-uri) materia primă Creapure® de la AlzChem, Trostberg, Germania; „minimum 99,9% puritate, fiecare lot testat individual”; cod QS pe fiecare ambalaj, verificabil pe site-ul AlzChem; doza uzuală 5 g/zi, zilnic, inclusiv în zilele fără antrenament; dizolvare „1 g creatină / 100 ml fluide”, în băuturi fără cofeină; „după 8 săptămâni de consum regulat se recomandă o pauză de câteva săptămâni”; disclaimer; nu copiilor / gravidelor
- **Cuvinte:** necunoscut
- **FAQ vizibil:** necunoscut
- **Tabele:** necunoscut
- **Dozare / protocol:** 5 g/zi; pauză după 8 săptămâni; 1 g/100 ml; fără cofeină
- **Imagini / video:** necunoscut
- **Variante / mărimi:** pulbere 500 g (Dr.Max: „Creatina monohidrata Creapure, 500g, Pro Nutrition”); frații de gamă: Creatine (Creapure®) capsules 150 caps, Creatine 1000, Creanabol, Krea-Drive (pH 11,5), Creatine FX efervescent (plicuri cu vitamina C)
- **Trust / USP:** recenzii multe (URL-uri cu reviews-page=71 → sute de recenzii); „99,9% puritate testată” în title-ul paginilor de recenzii; categorie proprie /produse/creatina.html cu titlu de ghid („Creatina - Beneficii, Creatina Monohidrată și Mod de administrare”) și subcategorie „Creatina Monohidrată: Suplimentul esențial pentru performanță și recuperare”; blog „Creatina: beneficii, administrare corectă, mituri și contraindicații” care rankează pe „creatina” și „cea mai bună creatină”
- **Linkuri interne către ghiduri:** categorie ↔ blog (structură de hub)
- **Claim-uri folosite – NECONFORME (nu copiem):** „recuperare” în titlul subcategoriei; „99,9% puritate” (fapt AlzChem, acceptabil doar cu sursă)
- **Claim-uri conforme / neutre:** probabil claim-ul EFSA (nedeterminat)
- **Ce NU răspunde pagina:** nedeterminabil fără HTML; pauza după 8 săptămâni și „fără cofeină” nu au bază în etichetă/EFSA

### 11. Pro Nutrition – produs „Creatine powder” (monohidrat non-Creapure)
- **URL:** https://www.pronutrition.ro/creatine-powder.html
- **Metodă:** BLOCAT (403) – doar titlu din SERP
- **Title:** Creatine powder (15 caractere)
- **Meta description:** (nedisponibil)
- **H1:** (nedisponibil)
- **H2/H3:** (nedisponibil)
- **Cuvinte:** necunoscut
- **FAQ vizibil:** necunoscut
- **Tabele:** necunoscut
- **Dozare / protocol:** necunoscut
- **Imagini / video:** necunoscut
- **Variante / mărimi:** (Decathlon listează „PRO NUTRITION Creatină monohidrată pudră”)
- **Trust / USP:** –
- **Linkuri interne către ghiduri:** –
- **Claim-uri folosite – NECONFORME (nu copiem):** –
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** –

### 12. DY Nutrition – produs „Creatină Monohidrată DY Nutrition” 300 g
- **URL:** https://dynutrition.ro/products/creatina-monohidrat-300g
- **Metodă:** curl
- **Title:** Creatină Monohidrată DY Nutrition – DY Nutrition Romania (56 caractere)
- **Meta description (154 caractere):** 100% creatină monohidrată pură, 5g/porție. Crește energia, forța și rezistența musculară. Fără fază de încărcare, ușor de mixat. Produs la standarde cGMP.
- **H1:** Creatină Monohidrată DY Nutrition
- **H2:** Customer Reviews
- **H3:** Reviews in Other Languages
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 982
- **JSON-LD:** Brand, Offer, Organization, Product, ProductGroup
- **Semnale text (număr de apariții):** „ce este” 1 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 1 · menținere 0 · dozare după kg 0 · micronizat 0 · Creapure 0 · dizolvare 3 · păstrare 2 · femei 2 · vegan 3 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 1 · masă musculară 4 · forță 8 · energie 7 · recuperare 9 · sigur 2 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 1 · studii 1 · preț (lei) 3
- **FAQ vizibil:** DA, 3 întrebări în <details> (Este creatina potrivită pentru femei? Pentru cine este potrivit? Este potrivit pentru vegani?) – FĂRĂ schema FAQPage; H2 „ÎNTREBĂRI FRECVENTE”
- **Tabele:** 0 (acordeoane DESCRIERE / INGREDIENTE CHEIE / RECOMANDĂRI)
- **Dozare / protocol:** porție 1 măsură (5 g); DOZĂ ZILNICĂ RECOMANDATĂ 2 măsuri (10 g!); 60 porții = 30 zile; 250 ml apă rece; în timpul sau imediat după antrenament; zile de repaus: dimineața + după o masă; „fără fază de încărcare”; păstrare 5–30 °C, „după deschidere nu păstrați mai mult de 6 luni”; alergeni (unitate cu lapte, soia, ouă, nuci)
- **Recenzii:** widget judge.me, jdgm, yotpo, trustpilot, loox, okendo, review; numere vizibile în text: 78
- **Imagini / video:** galerie mare (parserul numără ~42 imagini incl. related); fără video
- **Variante / mărimi:** gramaj: 300 g / 500 g / 1000 g (3 oferte în schema); fără aromă
- **Trust / USP:** „Supliment produs respectând standardele de calitate farmaceutice cGMP” + link „AFLĂ MAI MULTE DESPRE FABRICĂ”; „fără gluten, aspartam, potrivit pentru vegani”; Judge.me 78 recenzii afișate (fără AggregateRating în JSON-LD); semnătura Dorian Yates; cod QR către documente QC (din blog)
- **Linkuri interne către ghiduri:** 0 către ghiduri (blogul DY e separat)
- **Claim-uri folosite – NECONFORME (nu copiem):** meta: „Crește energia, forța și rezistența musculară”; text: „Contribuie la creșterea masei musculare slabe”, „Îmbunătățește performanța… prin creșterea forței și a rezistenței”, „Reducerea oboselii”, „Recuperare rapidă”, „Sănătatea creierului… concentrării”, „Cel mai cercetat supliment din toate timpurile”, „testate pentru siguranță”, „potrivit pentru toată lumea”
- **Claim-uri conforme / neutre:** „esențială pentru eforturi intense și de scurtă durată” (parțial); disclaimer complet prezent
- **Ce NU răspunde pagina:** ce este creatina (doar în FAQ-ul colecției); micronizată?; Creapure?; efecte secundare; retenție; cât ține (30 zile la 10 g); dizolvare; de ce 10 g/zi (depășește doza studiată de 3–5 g – de notat, nu de copiat)

### 13. DY Nutrition – colecție /collections/creatine
- **URL:** https://dynutrition.ro/collections/creatine
- **Metodă:** curl
- **Title:** Creatină pură, efecte dovedite pentru forță și performanță – DY Nutrition Romania (81 caractere)
- **Meta description (158 caractere):** Suplimentele DY cu creatină sunt ușor absorbite de organism, completate cu ingrediente premium, oferind creatină de înaltă calitate pentru performanță optimă.
- **H1:** Creatină
- **H2:** Creatină monohidrată DY Nutrition 150g, 15 serviri; Creatină Monohidrată DY Nutrition; The Creatine DY Nutrition 400g, 40 de serviri
- **H3:** –
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 747
- **JSON-LD:** Organization
- **Semnale text (număr de apariții):** „ce este” 2 · „cum se ia/administrare” 3 · „efecte secundare” 0 · încărcare 0 · menținere 2 · dozare după kg 0 · micronizat 2 · Creapure 0 · dizolvare 1 · păstrare 0 · femei 2 · vegan 0 · claim 3 g 1 · „crește performanța fizică” 1 · disclaimer 0 · masă musculară 7 · forță 5 · energie 0 · recuperare 2 · sigur 1 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 11
- **FAQ vizibil:** DA, 10 întrebări în <details> (Ce este creatina? La ce ajută? Câte grame pe zi? Cum se ia? Ce este creatina monohidrată? În cât timp își face efectul? Ce se întâmplă dacă nu mai iei? Potrivită pentru începători? Pot lua în definire? Potrivită pentru femei?) – FĂRĂ schema FAQPage
- **Tabele:** 0
- **Dozare / protocol:** în FAQ: 3–5 g/zi; menținere
- **Recenzii:** widget judge.me, jdgm, trustpilot, review; numere vizibile în text: –
- **Imagini / video:** 9
- **Variante / mărimi:** 3 produse (150 g, 300 g, The Creatine 400 g)
- **Trust / USP:** title de 81 caractere „Creatină pură, efecte dovedite pentru forță și performanță – DY Nutrition Romania”
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** title + meta („efecte dovedite pentru forță”, „creatină de înaltă calitate pentru performanță optimă”); FAQ cu „masă musculară” ×7
- **Claim-uri conforme / neutre:** claim EFSA menționat o dată
- **Ce NU răspunde pagina:** fără text de categorie în afara FAQ; fără schema

### 14. DY Nutrition – articol „Tot ce trebuie să știi despre creatină” (rankează pe „creatina”)
- **URL:** https://dynutrition.ro/blogs/press-releases/tot-ce-trebuie-sa-știi-despre-creatina-ce-este-cum-funcționeza-și-de-ce-ar-trebui-sa-o-folosești
- **Metodă:** curl
- **Title:** Tot ce trebuie să știi despre creatină: Ce este, cum funcționeză și de – DY Nutrition Romania (93 caractere)
- **Meta description (320 caractere):** Industria fitnessului și a suplimentelor este atât de saturată încât este ușor să fii atras de promisiuni care sună prea bine ca să fie adevărate. De la ambalaje atrăgătoare la produse care promit miracole, există multe opțiuni care, din păcate, nu sunt susținute de dovezi științifice și oferă beneficii limitate. La DY
- **H1:** Tot ce trebuie să știi despre creatină: Ce este, cum funcționeză și de ce ar trebui să o folosești.
- **H2:** Industria fitnessului și a suplimentelor este atât de saturată încât este ușor să fii atras de promisiuni care sună prea bine ca să fie adevărate. De la ambalaje atrăgătoare la produse care promit miracole, există multe opțiuni care, din păcate, nu sunt susținute de dovezi științifice și oferă beneficii limitate.; Consumi suficientă proteină?; Perfomanță fără compromis
- **H3:** Ce este creatina?; Cum funcționează creatina?; Alte beneficii ale creatinei; Tipuri de creatină; Este necesar să iei creatină sub formă de supliment?; Cum să folosești creatina monohidrat?; Când ar trebui să iei creatina?; De unde poți cumpăra creatină?; Lasă un comentariu
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 935
- **JSON-LD:** Article, Organization, Person, WebPage
- **Semnale text (număr de apariții):** „ce este” 5 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 1 · menținere 0 · dozare după kg 0 · micronizat 0 · Creapure 0 · dizolvare 0 · păstrare 0 · femei 0 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 3 · forță 1 · energie 3 · recuperare 3 · sigur 1 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 1 · studii 0 · preț (lei) 1
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** 5 g/zi standard; încărcare opțională (20 g × 5–7 zile); „nu încerca dry scooping”; oricând în zi; 1 kg carne de vită = 4,5 g
- **Recenzii:** widget judge.me, jdgm, trustpilot, review; numere vizibile în text: –
- **Imagini / video:** 4
- **Variante / mărimi:** –
- **Trust / USP:** H3-uri clare (Ce este? Cum funcționează? Alte beneficii; Tipuri; E necesar suplimentul? Cum să folosești; Când; De unde cumperi) + CTA către produse
- **Linkuri interne către ghiduri:** 2 articole vecine + produse
- **Claim-uri folosite – NECONFORME (nu copiem):** listă de claim-uri de boală: „prevenirea și tratarea unor boli neurologice”, „scade nivelul glicemiei”, „osteoporoză”, „fertilitatea masculină”, „îmbătrânirea pielii”, „sarcopenie”, „funcții cognitive”
- **Claim-uri conforme / neutre:** definiția creatinei (3 aminoacizi; fosfocreatină; ATP) – factual
- **Ce NU răspunde pagina:** efecte secundare; Creapure; micronizată; dozare după greutate


## B. Branduri internaționale cu site RO

### 15. GymBeam – produs „Creatină monohidrată 100% Creapure®”
- **URL:** https://gymbeam.ro/creatina-creapure-gymbeam.html
- **Metodă:** curl
- **Title:** Creatină monohidrată 100% Creapure® - GymBeam | GymBeam.ro (58 caractere)
- **Meta description (171 caractere):** Creatina monohidrată 100% Creapure® de cea mai înaltă calitate, fabricată în Germania. Crește performanța fizică în timpul exercițiilor intense. Potrivită pentru sportivi.
- **H1:** Creatină monohidrată 100% Creapure® - GymBeam; Creatina monohidrată 100% Creapure® – creatină germană originală cu o puritate de 99,9%
- **H2:** Ce se întâmplă cu voi dacă luați Creatina monohidrată 100% Creapure® timp de 4 săptămâni; Pentru cine este potrivită creatina; Cu ce diferă Creapure® de la GymBeam față de alți vânzători; Puritatea de 99,9% nu este marketing, ci date reale; Dozaj și mod de administrare; Cum recunoașteți Creapure® original; Rezultatele testelor de laborator; FAQ
- **H3:** Puritate de 99,9%; Mai multă forță la seturi; Peste 50 de studii; Fabricată în Germania; Săptămâna 1-2:; Săptămâna 2-3:; Săptămâna 4+:; Conținutul de impurități: Creapure® vs creatinele generice; Surse și dovezi științifice; Descrierea produsului; Recenzii; Popularitate; Compoziție; Informații despre alergeni; Ambalare; Logistică; Descrierea produsului; Compoziție; Informații despre alergeni; Ambalare; Recenzii; Popularitate; Logistică; Creatină monohidrată 100% Creapure® - GymBeam … (+7)
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 5613
- **JSON-LD:** AggregateOffer, AggregateRating, Answer, Brand, BreadcrumbList, Certification, FAQPage, ItemPage, ListItem, Offer, Organization, Person, Product, PropertyValue, QAPage, Question, Rating, Review, SpeakableSpecification, VideoObject · AggregateRating 4.7 (1693) · FAQPage cu 12 întrebări
- **Semnale text (număr de apariții):** „ce este” 5 · „cum se ia/administrare” 5 · „efecte secundare” 2 · încărcare 0 · menținere 0 · dozare după kg 1 · micronizat 19 · Creapure 80 · dizolvare 14 · păstrare 4 · femei 17 · vegan 14 · claim 3 g 2 · „crește performanța fizică” 1 · disclaimer 0 · masă musculară 15 · forță 11 · energie 2 · recuperare 3 · sigur 5 · cea mai bună/pură 4 · puritate % 7 · testat lab 7 · GMP/ISO/HACCP 5 · studii 7 · preț (lei) 40
- **FAQ vizibil:** DA – H2 „FAQ” + schema FAQPage (6 Q&A redacționale) + QAPage (6 întrebări de clienți cu răspunsuri); întrebări: Ce este Creapure®? Cum ar trebui să administrez? Ce gust are pudra fără aromă? Ce este creatina micronizată și cum se deosebește? Ce tip recomandați pe termen lung? Este sigură pentru tractul GI? Cum maximizez creșterea masei musculare? + Q clienți (cupa are câte grame? vine cu cupă? când revine pe stoc?)
- **Tabele:** 11 (tabel comparativ 4 produse proprii: formă, materie primă, porție zilnică, preț/porție, aditivi, pentru cine; impurități DCD/DHT vs limite EFSA; compoziție; logistică)
- **Dozare / protocol:** 3 g standard, „chiar și 5 g pe zi pe termen lung”, „peste 90 kg → 5 g”, „10–20 g pentru cognitiv/longevitate” (!); 1 măsură (5 g) în 250–300 ml apă/suc/shake; oricând; „saturare completă în 3–4 săptămâni”; zilnic incl. zile fără antrenament; încărcare opțională (explicată pe produsul micronizat)
- **Recenzii:** widget trustpilot, review; numere vizibile în text: 1693, 1415, 173, 46, 21
- **Imagini / video:** ~27 imagini de produs (galerie, grafice, certificate, teste de laborator); VideoObject în schema; fără iframe YouTube în HTML
- **Variante / mărimi:** 4 gramaje (250 g / 500 g / 1000 g / 1250 g = 50–250 doze) × 3 arome (fără aromă, lămâie-lime, portocală); preț/kg afișat
- **Trust / USP:** „Creapure® original de la singurul producător german, AlzChem”, „puritate verificată în laborator 99,9%”, „ambalat în fabrica noastră proprie certificată din Germania (IFS, BIO, GMP, HACCP)”, cod QS 18GM09 verificabil pe creapure.com, „testăm regulat și publicăm rezultatele testelor de laborator pe pagina produsului”, Cologne List®, FSSC 22000, HPLC pe lot, grafic de impurități (AlzChem 2019), „Cum recunoașteți Creapure® original” (cristale ~80 mesh; „AlzChem nu fabrică o versiune micronizată de Creapure®”), 7 surse științifice numerotate, „Actualizat: mai 2026”, schema Certification, Trustpilot, 1693 recenzii (4,7), livrare gratuită >199 lei, retur gratuit, „poate ajunge vineri 16.10”
- **Linkuri interne către ghiduri:** 6 articole de blog (creatina pentru femei, creatina pentru creier, memoria musculară…) + categorii
- **Claim-uri folosite – NECONFORME (nu copiem):** „veți reuși cu 1–2 repetări în plus”, „mușchi vizibil mai plini în 3 săptămâni”, cronologie pe săptămâni (apă intracelulară +1–2 kg; +1–2 repetări; recuperare), „recuperare mai rapidă”, „încetinește pierderea musculară legată de vârstă (sarcopenia)”, „susține funcțiile cognitive”, „GLP-1 (Ozempic…) – minimizați pierderea de masă musculară”, „fese mai ferme”, „Peste 50 de studii”/„680 de studii”, „cel mai eficient supliment ergogenic (ISSN)”, 10–20 g/zi; publicitate comparativă denigratoare („brandurile locale mici… unități fără certificare”)
- **Claim-uri conforme / neutre:** claim-ul EFSA redat corect: „la un aport zilnic de 3 g, crește performanța fizică în timpul intervalelor succesive de scurtă durată de exerciții de intensitate ridicată” + sursa EFSA 2011; claim-ul 55+ citat ca sursă EFSA 2016
- **Ce NU răspunde pagina:** efecte secundare reale (doar „sigură pentru tract GI”); retenția prezentată ca beneficiu; rinichi/creatinină serică; păstrare după deschidere; cât ține un ambalaj în zile; alergeni (secțiune există); contraindicații (sarcină/alăptare/minori) absente din text

### 16. GymBeam – produs „100% Creatină monohidrată micronizată”
- **URL:** https://gymbeam.ro/creatina-monohidrata-gymbeam.html
- **Metodă:** curl
- **Title:** 100% Creatină monohidrată micronizată - GymBeam | GymBeam.ro (60 caractere)
- **Meta description (155 caractere):** 100% Creatină monohidrată contribuie la performanța fizică. Vă permite să vă antrenați intens, să faceți mai multe repetări sau să sprintați mai mult timp.
- **H1:** 100% Creatină monohidrată micronizată - GymBeam; 100% Creatină monohidrată micronizată – creatină perfect solubilă, fabricată în Germania, cu puritate verificată în laborator
- **H2:** Creatină micronizată – o pulbere mai fină care se dizolvă mai bine; De ce creatină monohidrată?; Câtă creatină pură se găsește într-un gram; Ce poate face creatina; Cum acționează creatina în primele patru săptămâni?; Creatina pentru femei și pentru sportivii activi; De ce să alegeți 100% Creatină monohidrată micronizată de la GymBeam?; Cum se dozează creatina; Rezultatele testelor de laborator; FAQ
- **H3:** Fabricată în Germania; Testată în laborator prin metoda HPLC; Micronizată 200 mesh; Potrivită pentru vegani; Săptămânile 1-2:; Săptămânile 2-3:; Săptămâna 4+:; Surse și dovezi științifice; Descrierea produsului; Recenzii; Popularitate; Compoziție; Informații despre alergeni; Logistică; Descrierea produsului; Compoziție; Informații despre alergeni; Recenzii; Popularitate; Logistică; 100% Creatină monohidrată micronizată - GymBeam; Experiențele clienților:; Dieta GLP-1: Ce să mâncați și ce suplimente să luați când slăbiți cu Ozempic?; Planul alimentar personalizat ChatGPT: O revoluție în pierderea în greutate sau un pericol pentru sănătate? … (+4)
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 6024
- **JSON-LD:** AggregateOffer, AggregateRating, Answer, Brand, BreadcrumbList, Certification, FAQPage, ItemPage, ListItem, Offer, Organization, Person, Product, PropertyValue, QAPage, Question, Rating, Review, SpeakableSpecification, VideoObject · AggregateRating 4.8 (8595) · FAQPage cu 12 întrebări
- **Semnale text (număr de apariții):** „ce este” 1 · „cum se ia/administrare” 2 · „efecte secundare” 0 · încărcare 6 · menținere 0 · dozare după kg 1 · micronizat 18 · Creapure 6 · dizolvare 23 · păstrare 4 · femei 20 · vegan 16 · claim 3 g 4 · „crește performanța fizică” 2 · disclaimer 0 · masă musculară 15 · forță 20 · energie 4 · recuperare 5 · sigur 3 · cea mai bună/pură 5 · puritate % 0 · testat lab 12 · GMP/ISO/HACCP 4 · studii 6 · preț (lei) 63
- **FAQ vizibil:** DA – H2 „FAQ” + FAQPage (6 Q&A: Ce efect are creatina? Ce cantitate ar trebui să iau? Cel mai bun moment? Cauzează căderea părului? Beneficii pentru femei? De ce variază textura de la lot la lot? Include cupă?) + QAPage (clienți: când expiră? ajută la volum? se poate în timpul antrenamentului? de ce s-a scumpit?)
- **Tabele:** 9 + 4 grafice (sisteme energetice ATP-CP; % creatină pură per formă: monohidrat 87,9 % vs tri-creatină citrat 66 % vs piruvat 60 %; saturare cu/fără încărcare – Hultman 1996; nivel muscular omnivor vs vegetarian)
- **Dozare / protocol:** H2 „Cum se dozează creatina”: 5 g = 1 cupă în 250 ml; 3–5 g; oricând; zilnic; încărcare 20 g/zi 1 săptămână opțională vs 3 g/zi → saturare în ~4 săptămâni; „nu depășiți 5 g”
- **Recenzii:** widget trustpilot, review; numere vizibile în text: 8595, 7483, 711, 200, 82
- **Imagini / video:** ~20 imagini de produs + 4 grafice SVG; VideoObject în schema
- **Variante / mărimi:** 5 gramaje (250 g … 1500 g = 50–300 doze) × 5 arome (fără aromă, măr verde, lămâie-lime, mango-maracuja…); preț/kg
- **Trust / USP:** „Fabricată în Germania – producție proprie IFS · ISO · HACCP”, „testată în laborator prin metoda HPLC – puritate verificată pentru fiecare lot”, „micronizată 200 mesh (≥70 % trece prin sită de 200 mesh)”, „potrivită pentru vegani – creatina nu este de origine animală”, H2 „Rezultatele testelor de laborator”, „Surse și dovezi științifice”, 8595 recenzii (4,8), tabel comparativ, preț/kg
- **Linkuri interne către ghiduri:** 6 articole blog
- **Claim-uri folosite – NECONFORME (nu copiem):** „Adăugați câteva repetări în plus”, „diferența o veți simți în primele trei săptămâni”, „recuperare mai rapidă”, „sarcopenie”, „creier și concentrare… memoria”, „GLP-1”, „corp mai puternic și posterior mai ferm”, „1–2 kg pe cântar”
- **Claim-uri conforme / neutre:** claim EFSA corect cu 3 g + sursă; „micronizarea nu modifică structura chimică” (factual)
- **Ce NU răspunde pagina:** efecte secundare (parțial în FAQ); contraindicații; păstrare; rinichi; cafeină

### 17. GymBeam – categorie /creatina
- **URL:** https://gymbeam.ro/creatina
- **Metodă:** curl
- **Title:** Creatină | GymBeam.ro (21 caractere)
- **Meta description (195 caractere):** Suntem un magazin online cu suplimente nutritive, îmbrăcăminte, echipamente&accessorii pentru fitness în care veți găsi o gamă variată de produse, prețuri convenabile și metodă de livrare rapidă.
- **H1:** Creatină
- **H2:** –
- **H3:** –
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1503
- **JSON-LD:** AggregateOffer, Brand, BreadcrumbList, CollectionPage, ContactPoint, EntryPoint, ImageObject, ItemList, ListItem, Offer, OnlineStore, Organization, Person, Product, SearchAction, SpeakableSpecification, Thing, WebSite
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 1 · micronizat 3 · Creapure 10 · dizolvare 3 · păstrare 0 · femei 10 · vegan 23 · claim 3 g 0 · „crește performanța fizică” 1 · disclaimer 0 · masă musculară 6 · forță 4 · energie 1 · recuperare 0 · sigur 0 · cea mai bună/pură 1 · puritate % 0 · testat lab 1 · GMP/ISO/HACCP 0 · studii 1 · preț (lei) 54
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** –
- **Recenzii:** widget trustpilot, review; numere vizibile în text: –
- **Imagini / video:** 27 carduri
- **Variante / mărimi:** 20 de oferte în ItemList
- **Trust / USP:** schema CollectionPage + ItemList + OnlineStore; 2 linkuri către ghiduri de blog („Cum să alegeți cea mai bună creatină”, „Tot ce trebuie să știți despre creatină și formele acesteia”)
- **Linkuri interne către ghiduri:** 2 ghiduri
- **Claim-uri folosite – NECONFORME (nu copiem):** meta description generică de magazin (195 caractere, fără creatină)
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** title 21 caractere, fără text de categorie – rankează prin autoritate de domeniu

### 18. GymBeam – categorie /creatina-monohidrat
- **URL:** https://gymbeam.ro/creatina-monohidrat
- **Metodă:** curl
- **Title:** Creatină monohidrată | GymBeam.ro (33 caractere)
- **Meta description (140 caractere):** Creatina Monohidrată este o categorie de produse care acoperă suplimente, care susțin regenerarea ATP. Astfel pot crește performanța fizică.
- **H1:** Creatină monohidrată
- **H2:** –
- **H3:** –
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1191
- **JSON-LD:** AggregateOffer, Brand, BreadcrumbList, CollectionPage, ContactPoint, EntryPoint, ImageObject, ItemList, ListItem, Offer, OnlineStore, Organization, Person, Product, SearchAction, SpeakableSpecification, Thing, WebSite
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 2 · „efecte secundare” 0 · încărcare 6 · menținere 1 · dozare după kg 1 · micronizat 2 · Creapure 7 · dizolvare 0 · păstrare 4 · femei 10 · vegan 26 · claim 3 g 0 · „crește performanța fizică” 1 · disclaimer 0 · masă musculară 6 · forță 2 · energie 2 · recuperare 1 · sigur 0 · cea mai bună/pură 1 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 1 · preț (lei) 56
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** –
- **Recenzii:** widget trustpilot, review; numere vizibile în text: –
- **Imagini / video:** 26
- **Variante / mărimi:** 20 de oferte
- **Trust / USP:** meta 140: „suplimente care susțin regenerarea ATP. Astfel pot crește performanța fizică”; aceleași 2 ghiduri
- **Linkuri interne către ghiduri:** 2
- **Claim-uri folosite – NECONFORME (nu copiem):** „masă musculară” ×6 în carduri
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** fără text de categorie

### 19. Myprotein – produs „Creatină monohidrată pulbere”
- **URL:** https://www.myprotein.ro/p/sports-nutrition/creatina-monohidrata/12456626/
- **Metodă:** curl
- **Title:** Cumpără Creatină monohidrată pulbere | MYPROTEIN™ (49 caractere)
- **Meta description (153 caractere):** Monohidratul de creatină este un supliment de antrenament conceput pentru toți sportivii care doresc să-și crească forța și rezistența. Livrare gratuită.
- **H1:** Creatină monohidrată
- **H2:** Informații Nutriționale; Recommended for you; Informații Nutriționale; Recommended for you; Modal Title
- **H3:** Când se utilizează produsul Creatină monohidrată?; Cu ce se combină bine produsul Creatină monohidrată?; Berry Burst:; Zmeură albastră:; Fără aromă:; Frequently bought with; Când se utilizează produsul Creatină monohidrată?; Cu ce se combină bine produsul Creatină monohidrată?; Berry Burst:; Zmeură albastră:; Fără aromă:; Frequently bought with
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1285
- **JSON-LD:** AggregateRating, Brand, BreadcrumbList, ListItem, Offer, Organization, Person, Place, Product, ProductGroup, PropertyValue, QuantitativeValue, Rating, Review, SaleEvent, UnitPriceSpecification · AggregateRating 4.65 (138)
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 0 · Creapure 0 · dizolvare 0 · păstrare 2 · femei 28 · vegan 30 · claim 3 g 2 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 4 · energie 4 · recuperare 4 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 4 · preț (lei) 4
- **FAQ vizibil:** nu pe produs (FAQ-ul e pe categorie)
- **Tabele:** 2 (Informații nutriționale)
- **Dozare / protocol:** 1 cupă (3 g) imediat după antrenament, „de preferință cu un shake de proteine și carbohidrați”; sau oricând cu apă/lapte/suc; fără încărcare
- **Recenzii:** widget opinii, review; numere vizibile în text: 138
- **Imagini / video:** ~40 (galerie + related); fără video
- **Variante / mărimi:** 100 g / 250 g / 500 g / 1 kg (29 / 83 / 166 / 333 porții) × arome (fără aromă = 100 % creatină; Berry Burst = 76 %; Zmeură albastră = 74 %); 15 oferte în schema; „Frequently bought with” (Impact Whey, Omega-3)
- **Trust / USP:** „Una dintre cele mai cercetate forme de creatină din lume”; badge Vegan/Vegetarian; 138 recenzii (4,65) cu schema Review; ingrediente pe aromă cu % creatină; avertisment E129; livrare gratuită >325 RON; coduri de reducere (RO30, 1+1)
- **Linkuri interne către ghiduri:** 0 ghiduri
- **Claim-uri folosite – NECONFORME (nu copiem):** meta: „să-și crească forța și rezistența”; „Poate ajuta la creșterea forței”; „Perfect pentru toate sporturile”
- **Claim-uri conforme / neutre:** nota 1: „Creatina s-a dovedit a crește semnificativ performanța fizică în cadrul sesiunilor de antrenament scurte, cu exerciții de intensitate ridicată. Efectul benefic este obținut printr-un aport zilnic de 3 g de creatină.” (cel mai apropiat de textul oficial dintre competitori)
- **Ce NU răspunde pagina:** ce este creatina; micronizată?; Creapure?; efecte secundare; păstrare; cât ține; încărcare; femei/vegani (doar badge)

### 20. Myprotein – categorie Creatină monohidrată
- **URL:** https://www.myprotein.ro/c/nutrition/creatine/creatine-monohydrate/
- **Metodă:** curl
- **Title:** Creatină monohidrată – Creatina | Myprotein RO (46 caractere)
- **Meta description (151 caractere):** Creatina monohidrată este una dintre cele mai cercetate forme de creatină din lume și, după s-a demonstrat științific, îmbunătățește performanța fizică
- **H1:** Creatină monohidrată
- **H2:** Filtre; Shop Creatină monohidrată at Myprotein; Pentru cine este creatina monohidrată; Când să folosești creatina monohidrată; Beneficiile creatinei monohidrate; Cele mai populare produse; FAQs; Modal Title
- **H3:** Performanță în exercițiile de intensitate ridicată; Format versatil, integrare ușoară; Potrivită pentru adulții care practică antrenament de rezistență; Puritate și calitate Myprotein; Ce este creatina monohidrată?; Cum funcționează creatina monohidrată?; Care este doza recomandată de creatină monohidrată?; Creatina monohidrată este potrivită și pentru adulții cu vârsta de peste 55 de ani?; Care este diferența dintre creatina monohidrată simplă și Creatină monohidrată Elite?; Ce înseamnă testarea Informed Sport?; Când este cel mai bun moment să iei creatina monohidrată?; Pot combina creatina monohidrată cu alte suplimente?; Cine a formulat produsele cu creatină monohidrată Myprotein?; Ce formate de creatină monohidrată sunt disponibile la Myprotein?
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1588
- **JSON-LD:** AggregateRating, BreadcrumbList, ItemList, ListItem, Offer, Product · AggregateRating 4.65 (138)
- **Semnale text (număr de apariții):** „ce este” 1 · „cum se ia/administrare” 3 · „efecte secundare” 0 · încărcare 2 · menținere 2 · dozare după kg 0 · micronizat 1 · Creapure 3 · dizolvare 2 · păstrare 0 · femei 28 · vegan 29 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 4 · energie 6 · recuperare 5 · sigur 3 · cea mai bună/pură 1 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 5 · studii 0 · preț (lei) 10
- **FAQ vizibil:** DA – H2 „FAQs” cu 10 H3 (Ce este creatina monohidrată? Cum funcționează? Care este doza? Este potrivită și pentru adulții peste 55 de ani? Diferența simplă vs Elite? Ce înseamnă testarea Informed Sport? Cel mai bun moment? Pot combina cu alte suplimente? Cine a formulat produsele? Ce formate?) – FĂRĂ schema FAQPage (ItemList + Product + AggregateRating)
- **Tabele:** 0
- **Dozare / protocol:** în FAQ: 3 g/zi; încărcare/menținere menționate
- **Recenzii:** widget opinii, review; numere vizibile în text: –
- **Imagini / video:** 13 carduri
- **Variante / mărimi:** 13 produse (pudră, Elite, gummies, pliculețe)
- **Trust / USP:** H2 „Pentru cine este”, „Când să folosești”, „Beneficiile”; H3 „Puritate și calitate Myprotein”, „Informed Sport”; menționează claim-ul 55+ (singurul competitor)
- **Linkuri interne către ghiduri:** 0 (dar 3 articole Myprotein rankează separat)
- **Claim-uri folosite – NECONFORME (nu copiem):** „forță” ×4, „energie” ×6, „recuperare” ×5, „sigur” ×3
- **Claim-uri conforme / neutre:** meta: „s-a demonstrat științific, îmbunătățește performanța fizică”
- **Ce NU răspunde pagina:** efecte secundare; retenție; micronizată; Creapure

### 21. Scitec Nutrition – produs „100% Creatine Monohydrate (300 gr.)”
- **URL:** https://scitec.ro/100-creatine-monohidrate/scitec-nutrition-100-creatine-monohydrate-300-gr-p2164
- **Metodă:** curl (HTML server-side minimal, galerie JS)
- **Title:** 100% Creatine Monohydrate (300 gr.) - Scitec Nutrition (54 caractere)
- **Meta description (132 caractere):** Scitec Nutrition 100% Creatine Monohydrate (300 gr.) Creatină, 100% creatine monohidrate Cumpără online pe Scitec Nutrition Romania.
- **H1:** 100% Creatine Monohydrate (300 gr.)
- **H2:** Părerile clienților; Compoziția; Alte ambalaje ale produsului; Descriere; 100% Creatine Monohydrate
- **H3:** Scitec 100% Creatine Monohydrate; Dezvoltat și utilizat de sportivi de top
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 449
- **JSON-LD:** AggregateRating, Brand, DietarySupplement, Offer, Product, PropertyValue · AggregateRating 4.3 (202)
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 1 · micronizat 1 · Creapure 0 · dizolvare 1 · păstrare 1 · femei 1 · vegan 1 · claim 3 g 1 · „crește performanța fizică” 1 · disclaimer 0 · masă musculară 0 · forță 0 · energie 0 · recuperare 0 · sigur 2 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 3
- **FAQ vizibil:** nu
- **Tabele:** 1 (valori nutriționale: 3,4 g → creatină 3000 mg)
- **Dozare / protocol:** 1 porție (3,4 g = ½ lingură dozatoare) în 300 ml, cu 30 min înainte de antrenament; zile de odihnă: înainte de masă; „nu este necesară ciclizarea”; „ambalajul de 1 kg ajunge pentru mai mult de jumătate de an”
- **Recenzii:** widget review; numere vizibile în text: –
- **Imagini / video:** 0 în HTML (galerie JS); fără video
- **Variante / mărimi:** 300 g (88 porții) / 500 g (147) / 1000 g (294) ca pagini separate; 300 g aromatizat separat
- **Trust / USP:** schema DietarySupplement + Product + AggregateRating 4,3 (202) cu distribuția stelelor; „Vegan”; „Țara de origine: UE”; „Dezvoltat și utilizat de sportivi de top”
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** „supliment bine studiat și sigur”
- **Claim-uri conforme / neutre:** „Creatina crește performanța fizică*” + „*Efect demonstrat științific, aprobat de EFSA” + „se recomandă un aport zilnic de 3 g” (compliant)
- **Ce NU răspunde pagina:** ce este creatina; micronizată (doar în lista de ingrediente); efecte secundare; încărcare; alergeni (doar facility EN); păstrare după deschidere

### 22. Scitec Nutrition – produs 500 g
- **URL:** https://scitec.ro/100-creatine-monohidrate/scitec-nutrition-100-creatine-monohydrate-500-gr-p9581
- **Metodă:** curl
- **Title:** 100% Creatine Monohydrate (500 gr.) - Scitec Nutrition (54 caractere)
- **Meta description (132 caractere):** Scitec Nutrition 100% Creatine Monohydrate (500 gr.) Creatină, 100% creatine monohidrate Cumpără online pe Scitec Nutrition Romania.
- **H1:** 100% Creatine Monohydrate (500 gr.)
- **H2:** Părerile clienților; Compoziția; Alte ambalaje ale produsului; Descriere; 100% Creatine Monohydrate
- **H3:** Scitec 100% Creatine Monohydrate
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 383
- **JSON-LD:** AggregateRating, Brand, DietarySupplement, Offer, Product, PropertyValue · AggregateRating 4.3 (202)
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 1 · Creapure 0 · dizolvare 1 · păstrare 0 · femei 0 · vegan 1 · claim 3 g 0 · „crește performanța fizică” 1 · disclaimer 0 · masă musculară 0 · forță 0 · energie 0 · recuperare 0 · sigur 2 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 3
- **FAQ vizibil:** nu
- **Tabele:** 1
- **Dozare / protocol:** idem 300 g
- **Recenzii:** widget review; numere vizibile în text: –
- **Imagini / video:** 0 în HTML
- **Variante / mărimi:** 500 g (147 porții)
- **Trust / USP:** idem
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** idem
- **Claim-uri conforme / neutre:** idem
- **Ce NU răspunde pagina:** idem – conținut duplicat cu 300 g (meta identică în afară de gramaj)

### 23. Scitec Nutrition – categorie Creatină
- **URL:** https://scitec.ro/creatina-c47
- **Metodă:** curl – pagină randată JS (1 cuvânt server-side)
- **Title:** Creatină (8 caractere)
- **Meta description (112 caractere):** Descoperă creatina perfectă pentru scopurile tale. Alege creatina monohidrată, pudră sau pastile de pe Scitec.ro
- **H1:** –
- **H2:** –
- **H3:** –
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 0
- **JSON-LD:** niciunul
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 0 · Creapure 0 · dizolvare 0 · păstrare 0 · femei 0 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 0 · energie 0 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 0
- **FAQ vizibil:** –
- **Tabele:** –
- **Dozare / protocol:** –
- **Recenzii:** widget niciunul; numere vizibile în text: –
- **Imagini / video:** –
- **Variante / mărimi:** –
- **Trust / USP:** meta 112: „Alege creatina monohidrată, pudră sau pastile de pe Scitec.ro”
- **Linkuri interne către ghiduri:** –
- **Claim-uri folosite – NECONFORME (nu copiem):** –
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** nu se poate evalua (JS)

### 24. BioTechUSA – produs „100% Creatine Monohydrate – 500 g Fără aromă”
- **URL:** https://shop.biotechusa.ro/products/100-micronized-creatine-monohydrate-500-g
- **Metodă:** curl
- **Title:** 100% Creatine Monohydrate - 500 g Fără aromă (44 caractere)
- **Meta description (165 caractere):** Creșteți performanța fizică și construiți mușchi și mai mari! Încercați acum pudra micronizată 100% creatină monohidrat, fără aromă, cu conținut de creatină 3000 mg!
- **H1:** 100% Creatine Monohydrate - 500 g Fără aromă
- **H2:** Ce conțin 100% Creatine Monohydrate?; Cum trebuie consumate 100% Creatine Monohydrate?; Ingrediente; Creatină și funcțiile cognitive – fundal de cercetare
- **H3:** –
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1926
- **JSON-LD:** AggregateRating, Brand, Offer, Organization, Product · AggregateRating 4.9 (5247)
- **Semnale text (număr de apariții):** „ce este” 1 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 1 · menținere 0 · dozare după kg 1 · micronizat 7 · Creapure 0 · dizolvare 11 · păstrare 0 · femei 3 · vegan 0 · claim 3 g 3 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 15 · energie 8 · recuperare 6 · sigur 1 · cea mai bună/pură 2 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 3 · preț (lei) 6
- **FAQ vizibil:** nu (secțiune „Creatină și funcțiile cognitive – fundal de cercetare” cu 3 studii)
- **Tabele:** 1 (ingrediente active: 3,4 g → 3 g creatină)
- **Dozare / protocol:** 1 porție (3,4 g = 1 lingură dozatoare) în 300 ml, 1 porție/zi; 147 porții; „înainte, în timpul sau după antrenament”; fără încărcare
- **Recenzii:** widget judge.me, jdgm, yotpo, loox, okendo, review; numere vizibile în text: 247, 247, 100, 247
- **Imagini / video:** ~45 (galerie, bannere pe sporturi, portrete testimoniale); fără video
- **Variante / mărimi:** 300 g / 500 g / 1000 g fără aromă + 300 g yuzu, litchi, cinnamon plum, sangria; preț/kg
- **Trust / USP:** 4,9 din 5 247 recenzii + „Rezumatul recenziilor generat de AI” (gust, dizolvare, eficacitate); „Și jucătorii FC Barcelona consumă acest produs!”; 4 testimoniale cu nume; cifre corporate (230.000 teste anual, 18 audituri externe, 2 baze de producție); badge-uri „Fără aspartam / ulei de palmier / zahăr”; „200 mesh”; „calitate farmaceutică”; secțiuni pe tip de sport (anduranță, luptă, forță, tehnice)
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** meta: „construiți mușchi și mai mari!”; „Îți poți crește nivelul de forță cu până la 20 %”, „susținerea funcției cerebrale”, „recuperare mai rapidă”, „scade riscul de balonare, se îmbunătățește biodisponibilitatea”, „crește… anduranța”, „explozivitate”, „concentrare mentală, timp de reacție”, „eficiență și siguranță garantate”, „puritate garantată”, „cel mai bun supliment pentru antrenamentele la sală”
- **Claim-uri conforme / neutre:** „Doar 3 g de creatină pe zi sunt suficiente pentru a obține efectul dorit”
- **Ce NU răspunde pagina:** ce este creatina (o frază); Creapure vs; efecte secundare; retenție; păstrare; cât ține (147 porții, implicit); alergeni (facility list, prezent)

### 25. BioTechUSA – colecție Creatine
- **URL:** https://shop.biotechusa.ro/collections/creatine
- **Metodă:** curl
- **Title:** Creatine (8 caractere)
- **Meta description (154 caractere):** Creatina este esențială pentru energie și performanța fizică. BioTechUSA RO oferă suplimente de creatină de înaltă calitate, susținând excelența sportivă.
- **H1:** Creatine
- **H2:** Importanța Suplimentelor cu Creatină pentru Performanța Sportivă; Ce este creatina?; De ce este importantă suplimentarea creatinei?; Ce suplimente de creatină sunt oferite de BioTechUSA?
- **H3:** –
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1301
- **JSON-LD:** niciunul
- **Semnale text (număr de apariții):** „ce este” 2 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 1 · micronizat 1 · Creapure 0 · dizolvare 1 · păstrare 0 · femei 2 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 3 · energie 3 · recuperare 0 · sigur 2 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 33
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** în text: 3 g/zi
- **Recenzii:** widget judge.me, jdgm, okendo, review; numere vizibile în text: 4, 5, 113, 247, 247
- **Imagini / video:** ~23 carduri
- **Variante / mărimi:** ≈10 produse
- **Trust / USP:** text de categorie de ~1 300 cuvinte cu H2 „Ce este creatina?”, „De ce este importantă suplimentarea?”, „Ce suplimente oferă BioTechUSA?”
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** „energie” ×3, „forță” ×3, „sigur” ×2
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** title de 8 caractere („Creatine”), fără schema

### 26. Weider (importator oficial RO) – produs „Pure Creatine Powder 250g” (Global Line)
- **URL:** https://www.weider.ro/magazin-proteine/creatina/pure-creatine-powder-250g
- **Metodă:** curl
- **Title:** Pure Creatine Powder 250g. Creatina. Global Line. Weider.ro (59 caractere)
- **Meta description (154 caractere):** Cumpara Pure Creatine Powder 250g direct de la importator! Creatina Global Line la un pret avantajos cu livrare gratuita. Suplimente si nutritie sportiva.
- **H1:** Pure Creatine Powder 250g
- **H2:** Descriere produs; Informații nutriționale; Specificații produs; 30 de recenzii pentru Pure Creatine Powder 250g
- **H3:** Pure Creatine Powder 600g; Creatine 200 MESH 300gr (cherry lollipop); Maximum KREA-GENIC Powder 554gr; Premium Creatine HYDROCHLORIDE 150cps; Pure Creatine 100 capsule; Premium Pure Creatine 375gr
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1274
- **JSON-LD:** AggregateRating, BreadcrumbList, EntryPoint, ImageObject, ListItem, Offer, Organization, Person, Product, PropertyValueSpecification, Rating, ReadAction, Review, SearchAction, UnitPriceSpecification, WebPage, WebSite · AggregateRating 4.87 (30)
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 0 · „efecte secundare” 1 · încărcare 0 · menținere 1 · dozare după kg 1 · micronizat 0 · Creapure 0 · dizolvare 0 · păstrare 4 · femei 0 · vegan 2 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 1 · energie 3 · recuperare 1 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 11
- **FAQ vizibil:** nu
- **Tabele:** 3 (informații nutriționale per 3,4 g: creatină monohidrat 3400 mg, din care creatină 3000 mg; atribute)
- **Dozare / protocol:** PROTOCOL DUPĂ GREUTATE: „Sub 90 kg: primele 5–7 zile câte o linguriță cu băutură bogată în carbohidrați, două porții pe zi între mese; apoi menținere 3–5 săptămâni, ½–1 linguriță pe zi, de preferat înainte de antrenament; apoi pauză 4–6 săptămâni. Peste 90 kg – se dublează cantitățile.”; „reduceți consumul de cafea la maximum 4 cești pe zi”; „1 linguriță = 5 g = 1,1 kg carne de vită”
- **Recenzii:** widget review; numere vizibile în text: –
- **Imagini / video:** ~22 (galerie + related); fără video
- **Variante / mărimi:** 250 g (și 600 g ca produs separat); fără aromă
- **Trust / USP:** „Importator oficial Weider®”, „Din 1936”, „Peste 90 de ani de excelență”, „creatină de calitate testată și certificată – fabricată în Germania”, retur 14 zile, transport gratuit >250 lei, Easybox/GLS 24–72 h; 30 recenzii (4,87) cu schema Review; cross-sell „amestecați cu Anabolic Evolution”; banner Black Friday
- **Linkuri interne către ghiduri:** 1 (blog general)
- **Claim-uri folosite – NECONFORME (nu copiem):** „depozitare imediată de energie pentru antrenamente performante”, „ritmul de creștere este accelerat”, „mușchii arată mai plini”, „Efecte secundare pozitive”, „cu cât mai mult ATP, cu atât mai mult pot fi îmbunătățite performanțele”
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** ce este creatina (ATP-centric); Creapure (nu e Creapure); micronizată; efecte secundare reale; păstrare; contraindicații; de ce pauză (fără sursă)

### 27. Weider (importator oficial RO) – produs „Premium Pure Creatine 375gr” (100 % Creapure®)
- **URL:** https://www.weider.ro/magazin-proteine/creatina/pure-creatine-375gr
- **Metodă:** curl
- **Title:** Premium Pure Creatine 375gr.Creatina monohidrat pură. Weider.ro (63 caractere)
- **Meta description (140 caractere):** Cumpara Premium Pure Creatine 375gr direct de la importator! Creatina monohidrat pură la un pret avantajos. Suplimente si nutritie sportiva.
- **H1:** Premium Pure Creatine 375gr; Creatina monohidrat pură
- **H2:** Descriere produs; Informații nutriționale; Specificații produs; 2 recenzii pentru Premium Pure Creatine 375gr
- **H3:** Informații produs creatina monohidrat pură:; Pure Creatine 200 capsule; CREATINĂ MICRONIZATĂ 300g/310g; Creatine 200 MESH 300gr (cherry lollipop); Maximum Krea-Genic 200 capsule; Maximum KREA-GENIC Powder 554gr; Pure Creatine 100 capsule
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1072
- **JSON-LD:** AggregateRating, BreadcrumbList, EntryPoint, ImageObject, ListItem, Offer, Organization, Person, Product, PropertyValueSpecification, Rating, ReadAction, Review, SearchAction, UnitPriceSpecification, WebPage, WebSite · AggregateRating 5.00 (2)
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 3 · Creapure 4 · dizolvare 1 · păstrare 0 · femei 0 · vegan 2 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 1 · energie 1 · recuperare 1 · sigur 2 · cea mai bună/pură 1 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 2 · preț (lei) 14
- **FAQ vizibil:** nu
- **Tabele:** 4
- **Dozare / protocol:** 1 porție (3,4 g, cupă inclusă) pe zi timp de 6 săptămâni, apoi pauză 2–4 săptămâni; „la aproximativ aceeași oră, în fiecare zi, indiferent dacă te antrenezi sau nu”; „însoțită de multă apă”
- **Recenzii:** widget review; numere vizibile în text: 2, 2, 2, 2
- **Imagini / video:** ~23; fără video
- **Variante / mărimi:** 375 g (~110 porții × 3,4 g) × 5 arome (neutru, watermelon, fresh lemonade, cherry, tropical dragon fruit); la crawl: stoc epuizat
- **Trust / USP:** „100 % creatină Creapure®”; formula „PC + ADP ⇔ C + ATP”; H3 „De ce creatină monohidrat?”, „Când este cel mai bine să consumi creatina?”; 2 recenzii (5,0)
- **Linkuri interne către ghiduri:** 1 (blog)
- **Claim-uri folosite – NECONFORME (nu copiem):** „cea mai pură creatină de pe piață”, „cea mai studiată formă… sigură și eficientă”, „unul dintre cele mai bune și mai de încredere produse”, „te va ajuta să obții rezultate excelente la sală”, „puterea maximă posibilă”
- **Claim-uri conforme / neutre:** „îmbunătățește performanța fizică în serii succesive de exerciții scurte, de mare intensitate” (parafrază, fără condiția 3 g explicită, dar porția = 3 g)
- **Ce NU răspunde pagina:** ce este Creapure® concret (doar „numele de marcă”); micronizată; efecte secundare; păstrare; alergeni; de ce pauză

### 28. Weider (via gym-stack) – produs „Creatina Monohidrata, Weider, Creapure Creatine Monohydrate, 600g”
- **URL:** https://gym-stack.ro/products/creatina-pudra-weider-pure-creatine-monohydrate-600g
- **Metodă:** curl
- **Title:** Creatina Monohidrata, Weider, Creapure Creatine Monohydrate, 600g (65 caractere)
- **Meta description (176 caractere):** Creatina Monohidrata, Weider, Creapure Creatine Monohydrate, 600g ➜ Achizitioneaza acum la preturi accesibile✅Calitate garantata⭐Imbunatateste-ti antrenamentele cu gym-stack.ro
- **H1:** Creatina Monohidrata, Weider, Creapure Creatine Monohydrate, 600g
- **H2:** –
- **H3:** Detaliile produsului
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 865
- **JSON-LD:** AggregateRating, Brand, BreadcrumbList, ListItem, Offer, Product · AggregateRating 5.0 (1)
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 0 · menținere 1 · dozare după kg 0 · micronizat 0 · Creapure 2 · dizolvare 0 · păstrare 1 · femei 1 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 7 · forță 1 · energie 0 · recuperare 7 · sigur 1 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 7
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** menținere menționată
- **Recenzii:** widget judge.me, yotpo, loox, okendo, review; numere vizibile în text: –
- **Imagini / video:** 1 imagine de produs
- **Variante / mărimi:** 600 g
- **Trust / USP:** meta cu emoji ✅⭐; AggregateRating 5,0 (1)
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** „masă musculară” ×7, „recuperare” ×7
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** pagină de retailer minimă

### 29. Olimp Sport Nutrition RO – produs „Creatine monohydrate powder 250g (83 de portii)”
- **URL:** https://olimpsport.ro/collections/creatina/products/creatina-monohidrata-olimp-sport-nutrition
- **Metodă:** curl
- **Title:** Creatina monohidrata | Olimp Sport Nutrition Creatine Monohydrate – Olimp Sport Nutrition Romania (97 caractere)
- **Meta description (272 caractere):** Creatina monohidrata Olimp Sport Nutrition Creatina monohidrata | Creatina monohidrata sub forma de pudra, produs recomandat pentru sportivi si oameni activi. Produsul contine creatina monidrata de calitate farmaceutica. Consumul de creatina creste nivelul de performanta.
- **H1:** Creatina monohidrata | Olimp Sport Nutrition | Creatine monohydrate powder 250g (83 de portii)
- **H2:** Share this Product; Customer Reviews; More from this collection
- **H3:** INFORMATII GENERALE CREATINA MONOHIDRATA; DESCRIERE PRODUS OLIMP CREATINA MONOHIDTRATA PUDRA | 250g (83 portii); ALTE INFORMATII
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 578
- **JSON-LD:** niciunul
- **Semnale text (număr de apariții):** „ce este” 1 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 3 · Creapure 0 · dizolvare 0 · păstrare 2 · femei 0 · vegan 0 · claim 3 g 1 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 0 · energie 0 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 1 · preț (lei) 6
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** 3 g pe zi în 200 ml apă, la aceeași oră în fiecare zi (zi de antrenament sau fără); „consum recomandat: 3 g creatină/zi”
- **Recenzii:** widget judge.me, jdgm, opinii, review; numere vizibile în text: 40, 40, 14
- **Imagini / video:** 2 imagini de produs + 1 iframe YouTube
- **Variante / mărimi:** 250 g (83 porții × 3 g)
- **Trust / USP:** Judge.me 40 recenzii (98 % 5★) – FĂRĂ JSON-LD deloc; link către fișa NIH ODS; istoricul companiei (Olimp Laboratories, farmaceutic, din 1990); „calitate farmaceutică”
- **Linkuri interne către ghiduri:** 1 extern (NIH)
- **Claim-uri folosite – NECONFORME (nu copiem):** H1/meta: „Consumul de creatină crește nivelul de performanță”; „pentru a câștiga mușchi, a spori puterea”
- **Claim-uri conforme / neutre:** „3 g creatină/zi”
- **Ce NU răspunde pagina:** title 97 și meta 272 caractere (trunchiate în SERP); micronizată (menționată în ingrediente); efecte secundare; păstrare după deschidere; alergeni (text generic); Creapure (produsul UE Olimp e Creapure, cel RO nu o spune)

### 30. Olimp Sport Nutrition RO – produs „Creatine 1250 Mega Caps | 120 capsule (40 de portii)”
- **URL:** https://olimpsport.ro/collections/creatina/products/creatina-monohidrata-micronizata-olimp-sport-nutrition
- **Metodă:** curl
- **Title:** Creatina monohidrata micronizata | Olimp Sport Creatine 1250 – Olimp Sport Nutrition Romania (92 caractere)
- **Meta description (314 caractere):** Creatina monohidrata micronizata Olimp Sport Nutrition Creatine 1250 Mega Caps | Probabil cele mai puternice capsule de creatina din lume! 1250 MG DE CREATINA MONOHIDRATA MICRONIZATA ÎN CAPSULE! Utilizare recomandată Creatina 1250 : luați 3 capsule pe zi în timpul antrenamentelor. Consumați cantități mari de apă.
- **H1:** Creatina monohidrata micronizata | Olimp Sport Nutrition | Creatine 1250 Mega Caps | 120 capsule (40 de portii)
- **H2:** Share this Product; Customer Reviews; More from this collection
- **H3:** INFORMATII GENERALE CREATINA MONOHIDRATA MICRONIZATA; DESCRIERE PRODUS CREATINA MONOHIDRATA MICRONIZATA 1250; concentratie PER PORTIE de 1 capsula :
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 412
- **JSON-LD:** niciunul
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 10 · Creapure 0 · dizolvare 0 · păstrare 2 · femei 0 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 0 · energie 1 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 6
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** 3 capsule pe zi în timpul antrenamentelor sau în zilele de concurs; „consumați cantități mari de apă”
- **Recenzii:** widget judge.me, jdgm, opinii, review; numere vizibile în text: 14, 14, 40
- **Imagini / video:** 2 + YouTube
- **Variante / mărimi:** 120 capsule
- **Trust / USP:** 14 recenzii; fără schema
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** meta: „Probabil cele mai puternice capsule de creatină din lume!”
- **Claim-uri conforme / neutre:** „consum recomandat: 3 g creatină/zi”
- **Ce NU răspunde pagina:** meta 314 caractere; conținut minim (412 cuvinte)

### 31. Olimp Sport Nutrition RO – colecție Creatina
- **URL:** https://olimpsport.ro/collections/creatina
- **Metodă:** curl
- **Title:** Creatina monohidrata | Olimp Sport Nutrition | LIVRARE GRATUITA – Olimp Sport Nutrition Romania (95 caractere)
- **Meta description (253 caractere):** Creatina - creatina si creatina monohidrata / micronizata ajuta in cresterea masei musculara , generare de energie , recuperare mai rapida dupa antrenament. Creatina monohidrata si normala se gaseste in suplimente sub forma de capsule , pastile si pudra
- **H1:** –
- **H2:** –
- **H3:** –
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 101
- **JSON-LD:** niciunul
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 1 · Creapure 0 · dizolvare 0 · păstrare 0 · femei 0 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 0 · energie 0 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 8
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** –
- **Recenzii:** widget judge.me, jdgm, opinii, review; numere vizibile în text: 40, 14
- **Imagini / video:** 2
- **Variante / mărimi:** 2 produse
- **Trust / USP:** title 95 caractere cu „LIVRARE GRATUITA”
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** meta 253: „ajută în creșterea masei musculare, generare de energie, recuperare mai rapidă după antrenament”
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** fără H1/H2, 101 cuvinte

### 32. Optimum Nutrition RO (distribuitor) – categorie /creatina
- **URL:** https://www.optimumnutrition.ro/creatina
- **Metodă:** curl
- **Title:** Creatina de cea mai buna calitate - Optimum Nutrition Romania (61 caractere)
- **Meta description (228 caractere):** Optimum Nutrition ofera creatina de inalta calitate pentru sporirea performantei sportive si stimularea cresterii si refacerii musculare. Descopera produsele noastre de calitate superioara pentru a-ti atinge obiectivele fitness.
- **H1:** Creatina de cea mai buna calitate - Optimum Nutrition Romania
- **H2:** Creatine pentru volum muscular, rezistenta si refacere (6)
- **H3:** –
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 574
- **JSON-LD:** niciunul
- **Semnale text (număr de apariții):** „ce este” 1 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 0 · Creapure 0 · dizolvare 0 · păstrare 0 · femei 0 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 4 · forță 2 · energie 1 · recuperare 4 · sigur 0 · cea mai bună/pură 2 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 7
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** în text: dozare și administrare generică
- **Recenzii:** widget niciunul; numere vizibile în text: –
- **Imagini / video:** 6 carduri
- **Variante / mărimi:** 6 produse (187 g, 247,5 g, 317 g, 360 g, plicuri 10 × 3,4 g, 180 tablete)
- **Trust / USP:** text de categorie ~500 cuvinte („Creatina: Beneficii, Funcționare și Rol…”, Ce este creatina? 3 aminoacizi; beneficii 1–4; Dozare); „4.5 din 19 voturi”; fără schema
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** title „Creatina de cea mai bună calitate” (superlativ); meta 228: „stimularea creșterii și refacerii musculare”; „creșterea masei musculare”, „sinteză proteică”, „reducând durerea și inflamația musculară”
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** FAQ; Creapure; micronizată explicată; efecte secundare


## C. Retaileri, farmacii, marketplace-uri (paginile care domină SERP-ul tranzacțional)

### 33. Decathlon RO – categorie /sanatate-si-nutritie/creatina
- **URL:** https://www.decathlon.ro/sanatate-si-nutritie/creatina
- **Metodă:** curl BLOCAT (403 „Just a moment”); WebFetch a reușit (rezumat)
- **Title:** Creatină monohidrată - suplimente pentru mușchi (dedus din prima linie; head-ul nu a fost expus)
- **Meta description:** (nedisponibilă în rezumat)
- **H1:** Creatină Monohidrată - Pudră și Capsule
- **H2/H3:** H2: „CE ESTE ȘI CUI ESTE RECOMANDATĂ CREATINA MONOHIDRATĂ?”, „CARE SUNT BENEFICIILE CREATINEI MONOHIDRATE PASTILE?”, „FAQ”; H3: „Cum se administrează corect creatina monohidrată pastile?”, „Există diferențe între creatina monohidrată pastile și creatina pudră?”
- **Cuvinte:** ~550 (intro 60, ghid 400, FAQ 100–110)
- **FAQ vizibil:** DA (2 întrebări H3; fără informație despre schema)
- **Tabele:** necunoscut
- **Dozare / protocol:** doar generic (timing, hidratare, consecvență) – fără grame
- **Imagini / video:** carduri
- **Variante / mărimi:** 50 de produse / 2 pagini: Decathlon Creapure® 300 g, ON 317 g, Weider gummies / 200 MESH 310 g / zmeură 300 g, Vitabolic 100 % Micronized (fără aromă, blueberry, raspberry, banana-ananas, 1 kg) + Pure Creatine Creapure 300 g + 1000 mg caps, Pro Nutrition Creapure pudră + 150 capsule, OstroVit 1 kg, GoldNutrition, 226ERS, Pillar Performance, NOW Foods; multe „Exclusiv Online” (marketplace)
- **Trust / USP:** „suplimente și vitamine certificate și testate”; filtre; link-uri către categorii sport
- **Linkuri interne către ghiduri:** 0 ghiduri
- **Claim-uri folosite – NECONFORME (nu copiem):** „conțin cantitatea optimă zilnică pentru doze sigure, fără efecte secundare”, „Administrarea constantă poate contribui și la creșterea forței musculare”, „recuperarea mai rapidă după efort”, „este sigură”, „cea mai bine documentată din punct de vedere științific”, „producerea rapidă a energiei”
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** doza în grame; încărcare; ce înseamnă Creapure®; contraindicații; micronizată vs standard; comparație doză pastile vs pudră

### 34. Decathlon RO (marcă proprie) – produs „Creatină monohidrat Creapure® gust neutru 300g”
- **URL:** https://www.decathlon.ro/p/creatina-monohidrat-creapure-gust-neutru-300g/_/R-p-327680
- **Metodă:** BLOCAT (403 la curl ×4 UA și WebFetch) – date din snippet-uri Google (allowed_domains=decathlon.ro)
- **Title:** Creatină monohidrat Creapure® gust neutru 300g DECATHLON (57 caractere)
- **Meta description:** (nedisponibil)
- **H1:** (probabil = titlul)
- **H2/H3:** (nedisponibil)
- **Cuvinte:** necunoscut
- **FAQ vizibil:** necunoscut
- **Tabele:** necunoscut
- **Dozare / protocol:** 85 porții × 3,5 g (3 g creatină); 1 doză/zi, „o lingură cu vârf”, în 150–250 ml apă sau shaker, înainte de antrenament
- **Imagini / video:** necunoscut
- **Variante / mărimi:** 300 g; URL-uri duplicate pentru același produs (R-p-327680 cu 2 slug-uri + /creatina-monohidrata-creapure-id_8601333.html)
- **Trust / USP:** „origine Germania, asamblat în Franța”; „testat și validat de o echipă de utilizatori prin platforma de co-creație: 4,2/5, 83 % l-au găsit eficient”; preț 84,99–99,99 RON (333 RON/kg); cod APP10
- **Linkuri interne către ghiduri:** necunoscut
- **Claim-uri folosite – NECONFORME (nu copiem):** „contraindicat în insuficiență renală sau hepatică, gravide, sub 14 ani” (avertisment, nu claim); „83 % eficient pentru performanță” (test intern)
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** nedeterminabil

### 35. Dr.Max (OstroVit etc.) – produs „Creatina monohidrata fara aroma, 300g, OstroVit” + categorie Creatina
- **URL:** https://www.drmax.ro/creatina-monohidrata-fara-aroma-300g-ostrovit ; https://www.drmax.ro/suplimente-alimentare/suplimente-pentru-sportivi/creatina
- **Metodă:** BLOCAT (403 ×4 UA + WebFetch) – snippet-uri Google
- **Title:** Creatina monohidrata fara aroma, 300g, OstroVit (produs) / „Creatina” (categorie) (47 caractere)
- **Meta description:** (nedisponibil)
- **H1:** (probabil = titlu)
- **H2/H3:** (nedisponibil)
- **Cuvinte:** necunoscut
- **FAQ vizibil:** necunoscut
- **Tabele:** necunoscut
- **Dozare / protocol:** porție 2,5 g, 1–2 porții/zi în 100–150 ml (snippet)
- **Imagini / video:** necunoscut
- **Variante / mărimi:** OstroVit 300 g fără aroma (33,94 lei din 48,49); categoria mai listează Vitabolic 300 g (71,27 lei, fără aromă / banana-ananas), BioTechUSA 300 g, OstroVit capsule, Olimp 250 g, Pro Nutrition Creapure 500 g, Weider Pure Creatine 250 g (99,99 lei)
- **Trust / USP:** farmacie online; prețuri mici; articole Dr.Max („Ce suplimente se recomandă pentru rezistența la alergare”); listă de ingrediente din snippet conține aromă/taurină/sucraloză/B6 deși produsul e „fără aromă” (text greșit pe pagină)
- **Linkuri interne către ghiduri:** articole Dr.Max
- **Claim-uri folosite – NECONFORME (nu copiem):** necunoscut
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** nedeterminabil

### 36. eMAG – categorie /creatina/c + pagini de căutare
- **URL:** https://www.emag.ro/creatina/c
- **Metodă:** BLOCAT (511 captcha) – titluri din SERP
- **Title:** Creatina. Vezi Preturi si Comanda Online - eMAG.ro (50 caractere)
- **Meta description:** (nedisponibil)
- **H1:** (nedisponibil)
- **H2/H3:** (nedisponibil)
- **Cuvinte:** necunoscut
- **FAQ vizibil:** –
- **Tabele:** –
- **Dozare / protocol:** –
- **Imagini / video:** –
- **Variante / mărimi:** marketplace: GymBeam 500 g/1 kg, ON 317 g, SFD 500 g, Real Pharm 500 g (unele Creapure), Natural Plus 500/900 g, GoldNutrition caps, Bandini Creapure 500 g…
- **Trust / USP:** pagini de căutare indexate: „Cauți creatina monohidrat? Alege din oferta eMAG.ro”, „…creatina monohidrata creapure”, „…pastile creatina monohidrata”; titluri de produs cu „pudra pentru dezvoltare masa musculara”
- **Linkuri interne către ghiduri:** –
- **Claim-uri folosite – NECONFORME (nu copiem):** titluri de produs ale vânzătorilor cu „dezvoltare masă musculară”
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** nedeterminabil

### 37. Compari.ro – comparator creatina.compari.ro (+ subpagini pe brand)
- **URL:** https://creatina.compari.ro/
- **Metodă:** BLOCAT (403 Cloudflare, WebFetch 403)
- **Title:** Creatina Preturi, Oferte, Creatine Magazine, Creatine ieftine (șablon, din SERP: „Creatina BioTechUSA Preturi, Oferte…”, „Creatina Weider…”, „Creatina Scitec Nutrition…”)
- **Meta description:** (nedisponibil)
- **H1:** (nedisponibil)
- **H2/H3:** (nedisponibil)
- **Cuvinte:** necunoscut
- **FAQ vizibil:** –
- **Tabele:** –
- **Dozare / protocol:** –
- **Imagini / video:** –
- **Variante / mărimi:** agregator
- **Trust / USP:** pagini pe brand indexate
- **Linkuri interne către ghiduri:** –
- **Claim-uri folosite – NECONFORME (nu copiem):** –
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** nedeterminabil

### 38. Farmacia Tei – categorie Creatina (cel mai frecvent domeniu în SERP)
- **URL:** https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina
- **Metodă:** curl
- **Title:** Creatina Pentru Forta, Efort Si Progres Sustinut : Farmacia Tei online (70 caractere)
- **Meta description (88 caractere):** Un sprijin valoros in rutina sportiva, pentru obiective clare si antrenamente constante.
- **H1:** Produse în categoria SUPLIMENTE PENTRU SPORTIVI - CREATINA
- **H2:** SUPLIMENTE PENTRU SPORTIVI
- **H3:** –
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 961
- **JSON-LD:** BreadcrumbList, ListItem
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 6 · Creapure 4 · dizolvare 0 · păstrare 0 · femei 2 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 0 · energie 0 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 60
- **FAQ vizibil:** nu (flag „întrebări” = tab-ul Q&A de pe carduri)
- **Tabele:** 0
- **Dozare / protocol:** –
- **Recenzii:** widget review; numere vizibile în text: 2, 5, 2, 3, 2
- **Imagini / video:** ~79 carduri (123 alt-uri goale)
- **Variante / mărimi:** ~40 carduri/pagină (OstroVit ×15, Vitabolic ×4, BioTech, Olimp, Pro Nutrition, Scitec…)
- **Trust / USP:** schema BreadcrumbList; filtre; „în stoc”, număr recenzii pe card; meta 88 caractere (scurtă)
- **Linkuri interne către ghiduri:** 0 (ghidul /info-tei/ingrediente-active/creatina e linkat din pagina de căutare și din produse)
- **Claim-uri folosite – NECONFORME (nu copiem):** title: „Creatina Pentru Forta, Efort Si Progres Sustinut”
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** fără text de categorie; rankează prin autoritate + volum de produse

### 39. Farmacia Tei – pagină de căutare internă /cauti/creatina (indexată, rankează)
- **URL:** https://comenzi.farmaciatei.ro/cauti/creatina
- **Metodă:** curl
- **Title:** Cauti "creatina"? Alege din oferta Farmacia Tei online (54 caractere)
- **Meta description (183 caractere):** Ai cautat creatina. Alege din oferta Farmacia Tei online. Oferta completa de medicamente, dermatocosmetice si suplimente cu expediere rapida din stoc, livrare acasa sau la Pachetomat.
- **H1:** Rezultate cautare CREATINA
- **H2:** –
- **H3:** –
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 907
- **JSON-LD:** niciunul
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 6 · Creapure 5 · dizolvare 0 · păstrare 0 · femei 2 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 0 · energie 0 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 58
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** –
- **Recenzii:** widget review; numere vizibile în text: 6, 2, 2, 6, 4
- **Imagini / video:** ~76
- **Variante / mărimi:** ~40 rezultate
- **Trust / USP:** title „Cauti "creatina"? Alege din oferta Farmacia Tei online”; H1 „Rezultate cautare CREATINA”; 3 linkuri către info-tei (ingrediente-active/creatina)
- **Linkuri interne către ghiduri:** 3
- **Claim-uri folosite – NECONFORME (nu copiem):** –
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** pagină de căutare; conținut zero

### 40. OstroVit (via Farmacia Tei) – produs „Creatina monohidrata fara aroma, 300 g, OstroVit” (tipul de pagină care rankează cel mai des pe „fara aroma”, „300g”, „pret”)
- **URL:** https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina/creatina-monohidrata-fara-aroma-300-g-ostrovit-p376136
- **Metodă:** curl
- **Title:** Creatina monohidrata fara aroma, 300 g, OstroVit : Farmacia Tei online (70 caractere)
- **Meta description (265 caractere):** Pret: 48,50 Lei - poate contribui la cresterea masei musculare - Proprietati:- poate contribui la cresterea fortei si rezistentei la antrenamente;- poate contribui la cresterea masei musculare.Mod de administrare:Se adauga o portie de 2.5 g (echivalentul a jumatate
- **H1:** Creatina monohidrata fara aroma, 300 g, OstroVit
- **H2:** Optiuni Livrare; Informații Produs; Cumparate frecvent impreuna; Alte produse ale brandului Ostrovit
- **H3:** Creatina monohidrata fara aroma, 300 g, OstroVit [5902232610253]
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1264
- **JSON-LD:** AggregateRating, Brand, BreadcrumbList, ListItem, Offer, Organization, Product, ProductGroup · AggregateRating 4.17 (6)
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 2 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 0 · Creapure 3 · dizolvare 1 · păstrare 1 · femei 2 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 1 · masă musculară 3 · forță 1 · energie 1 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 33
- **FAQ vizibil:** tab „Întrebări și răspunsuri (0)”
- **Tabele:** 1
- **Dozare / protocol:** 2,5 g (½ măsură) în 100–150 ml apă, shaker, 1–2 porții/zi „în funcție de necesitățile individuale și nivelul de activitate fizică”
- **Recenzii:** widget review; numere vizibile în text: 6, 2, 6, 2, 5
- **Imagini / video:** ~34 (galerie + related; 55 alt-uri goale); fără video
- **Variante / mărimi:** 300 g; „Alte arome: Măr verde”; „Altă cantitate: 500 g” ca linkuri
- **Trust / USP:** EAN, „Data expirării: 10-11-2027”, „Vândut de: Farmacia Tei SRL”, AggregateRating 4,17 (6), „Opinia cumpărătorilor: 86,7 % scor calitate-preț / 83,3 % răspunde așteptărilor / 83,3 % ar recomanda”, disponibilitate + preț în 14 farmacii, 4 opțiuni de livrare cu prețuri și termene, voucher 15 %, „Cumpărate frecvent împreună”, declinare de răspundere privind eticheta
- **Linkuri interne către ghiduri:** 1 (ghid ingredient)
- **Claim-uri folosite – NECONFORME (nu copiem):** H1-subtitlu + meta: „poate contribui la creșterea masei musculare”; „poate contribui la creșterea forței și rezistenței la antrenamente”; prețul în meta description
- **Claim-uri conforme / neutre:** disclaimer complet
- **Ce NU răspunde pagina:** tot ce e educațional (ce este, cum acționează, când, efecte secundare, cât ține – doar „Prezentare: 300 g”)

### 41. OstroVit Creapure (via Farmacia Tei) – produs „Creatina monohidrata Creapure Natural, 250 g, OstroVit”
- **URL:** https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina/creatina-monohidrata-creapure-natural-250-g-ostrovit-p391175
- **Metodă:** curl
- **Title:** Creatina monohidrata Creapure Natural, 250 g, OstroVit : Farmacia Tei online (76 caractere)
- **Meta description (251 caractere):** Pret: 87,50 Lei - 3 grame de creatina per portie - Proprietati:- supliment alimentar sub forma de pudra cu creatina monohidrata.Mod de administrare:Adaugati o portie de 3.5 g (1/2 masura) in 100-150 ml de apa intr-un shaker. Agitati si consumati.In fu
- **H1:** Creatina monohidrata Creapure Natural, 250 g, OstroVit
- **H2:** Eticheta produs; Optiuni Livrare; Informații Produs; Cumparate frecvent impreuna; Alte produse ale brandului Ostrovit
- **H3:** Creatina monohidrata Creapure Natural, 250 g, OstroVit [5903933919775]; Creatina monohidrata Creapure Natural, 250 g, OstroVit [5903933919775]
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1208
- **JSON-LD:** Brand, BreadcrumbList, ListItem, Offer, Organization, Product, ProductGroup, PropertyValue
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 0 · Creapure 10 · dizolvare 0 · păstrare 1 · femei 3 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 0 · energie 0 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 30
- **FAQ vizibil:** tab Q&A
- **Tabele:** 2
- **Dozare / protocol:** 3,5 g (½ măsură) în 100–150 ml apă; „3 grame de creatină per porție”
- **Recenzii:** widget opinii, review; numere vizibile în text: 5, 6, 4, 2, 5
- **Imagini / video:** ~34; H2 „Eticheta produs” (foto etichetă)
- **Variante / mărimi:** 250 g; arome cola-rom, măr-mentă ca produse separate
- **Trust / USP:** idem șablon Tei; Creapure ×10 în text
- **Linkuri interne către ghiduri:** 1
- **Claim-uri folosite – NECONFORME (nu copiem):** meta cu preț
- **Claim-uri conforme / neutre:** „3 grame de creatină per porție”
- **Ce NU răspunde pagina:** ce este Creapure; efecte secundare; etc.

### 42. BioTechUSA (via Farmacia Tei) – produs „Creatina monohidrata 100% Creatine Monohydrate, 300 g, Biotech USA”
- **URL:** https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina/creatina-monohidrata-100-creatine-monohydrate-300-g-biotech-usa-p338090
- **Metodă:** curl
- **Title:** Creatina monohidrata 100% Creatine Monohydrate, 300 g, Biot : Farmacia Tei online (81 caractere)
- **Meta description (276 caractere):** produsul este fara aroma si se poate combina cu alte suplimente nutritive - Proprietati:- creatina poate contribui la cresterea performantelor la antrenamentele fizice cu intensitate crescuta;- creatina monohidrata 100% micronizata este un produs pur de calitate farmaceutica 
- **H1:** Creatina monohidrata 100% Creatine Monohydrate, 300 g, Biotech USA
- **H2:** Informații Produs; Cumparate frecvent impreuna; Alte produse ale brandului Biotechusa
- **H3:** Creatina monohidrata 100% Creatine Monohydrate, 300 g, Biotech USA [5999076204274]
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 931
- **JSON-LD:** AggregateRating, Brand, BreadcrumbList, ListItem, Offer, Organization, Product · AggregateRating 5.00 (2)
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 1 · menținere 1 · dozare după kg 0 · micronizat 3 · Creapure 0 · dizolvare 1 · păstrare 2 · femei 3 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 1 · masă musculară 0 · forță 0 · energie 1 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 11
- **FAQ vizibil:** tab Q&A (0)
- **Tabele:** 2
- **Dozare / protocol:** „o doză (5 g) în 500 ml apă; încărcare: 4 doze/zi în prima săptămână (2 înainte + 2 după antrenament); menținere: 2 doze/zi” – contrazice eticheta oficială (3,4 g/zi)
- **Recenzii:** widget review; numere vizibile în text: 2, 4, 4
- **Imagini / video:** ~14
- **Variante / mărimi:** 300 g
- **Trust / USP:** AggregateRating 5,0 (2); linkuri către info-tei (obezitate!, aminoacizi, nutriția post-antrenament)
- **Linkuri interne către ghiduri:** 5 (info-tei)
- **Claim-uri folosite – NECONFORME (nu copiem):** „produs pur de calitate farmaceutică”
- **Claim-uri conforme / neutre:** „creatina poate contribui la creșterea performanțelor la antrenamentele fizice cu intensitate crescută”
- **Ce NU răspunde pagina:** idem

### 43. Nutriland – colecție Creatina monohidrata (RO; există și /en/ duplicat)
- **URL:** https://www.nutriland.ro/collections/creatina-monohidrata
- **Metodă:** curl
- **Title:** Creatina Monohidrata: Pudra & Capsule | Suplimente Sportive – Nutriland® (72 caractere)
- **Meta description (129 caractere):** Creatina monohidrata - Descopera gama variata de Creatina monohidrata pe site-ul Nutriland - Comanda acum - Livrare in toata tara
- **H1:** Creatina monohidrata
- **H2:** Deal of the DAY; Categorii similare; Creatina monohidrata – solutie eficienta pentru forta si performanta
- **H3:** Creatina monohidrata pastile si alte forme – cum alegi varianta potrivita pentru tine?
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 2100
- **JSON-LD:** BreadcrumbList, ListItem
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 1 · micronizat 6 · Creapure 4 · dizolvare 1 · păstrare 0 · femei 2 · vegan 5 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 19 · forță 5 · energie 8 · recuperare 15 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 80
- **FAQ vizibil:** nu (flag faq=1 din filtre)
- **Tabele:** 0
- **Dozare / protocol:** –
- **Recenzii:** widget judge.me, jdgm, review; numere vizibile în text: –
- **Imagini / video:** ~76 (32 alt-uri goale)
- **Variante / mărimi:** ~76 carduri (Scitec, Evogen, Body Attack Creapure, OstroVit, Kevin Levrone, Dorian Yates, Genius Creapure, BioTech, Vitabolic…)
- **Trust / USP:** H2 „Creatina monohidrata – soluție eficientă pentru forță și performanță” + H3 „pastile și alte forme – cum alegi varianta potrivită” (text de categorie ~600 cuvinte); filtre „Tip afecțiune”, „Funcție”, „Formă”, „Aromă”; „Deal of the DAY”; țara de fabricație pe card
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** „masă musculară” ×19, „recuperare” ×15, „energie” ×8
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** FAQ; schema (doar Breadcrumb); versiunea EN indexată (title EN) = conținut duplicat

### 44. Scitec (via Nutriland) – produs „Creatina monohidrata 300g, pudra, Scitec Nutrition, Supliment crestere masa musculara”
- **URL:** https://www.nutriland.ro/products/creatina-monohidrata-300g
- **Metodă:** curl
- **Title:** Creatina monohidrata 300g, pudra, Scitec Nutrition, Supliment crestere masa musculara - Nutriland – Nutriland® (110 caractere)
- **Meta description (167 caractere):** Creatina monohidrata 300g, pudra, Scitec Nutrition, Supliment crestere masa musculara ➜ Achizitioneaza de pe Nutriland ➤ beneficiezi de ✅ Calitate ✅ Preturi accesibile
- **H1:** Creatina monohidrata 300g, pudra, Scitec Nutrition, Supliment crestere masa musculara
- **H2:** Întreabă consultantul AI; Creatina monohidrata 300g, pudra, Scitec Nutrition, Supliment crestere masa musculara - detalii produs; Intrebari Frecvente despre Creatina monohidrata 300g, pudra, Scitec Nutrition, Supliment crestere masa musculara; Informatii suplimentare; Compară cu produse similare; FAQ; E-BOOK 1: Cum sa iti optimizezi antrenamentele cu ajutorul suplimentelor, nivel: INCEPATOR; Customer Reviews
- **H3:** De 14 ani; Transport GRATUIT; EasyBox & GLS; Plata; 1. Gustul si aromele sunt subiective; 2. Ce inseamna Unflavoured / Fara aroma?; 3. Mirosul produsului; 4. Textura, consistenta si solubilitatea; 5. Prepararea si utilizarea corecta; 6. Diferente intre producatori si loturi; 7. Preferinta personala versus neconformitate; 8. Alegerea produsului si politica de retur; 1. Higroscopicitatea – de ce unele ingrediente atrag umiditatea?; 2. Ce este fenomenul de Caking (aglomerare si compactare)?; 3. De ce pot aparea bulgarasi inclusiv in creatina monohidrata?; 4. Aglomerarea afecteaza calitatea sau eficienta produsului?; 5. Cum se poate utiliza un produs care prezinta aglomerari?; 6. Cum poate fi limitata formarea aglomerarilor?; 7. Informatii importante privind conformitatea produsului
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 5726
- **JSON-LD:** Answer, Brand, BreadcrumbList, FAQPage, ListItem, MerchantReturnPolicy, Offer, OfferShippingDetails, Organization, Product, Question · FAQPage cu 5 întrebări
- **Semnale text (număr de apariții):** „ce este” 1 · „cum se ia/administrare” 3 · „efecte secundare” 0 · încărcare 1 · menținere 0 · dozare după kg 1 · micronizat 2 · Creapure 0 · dizolvare 9 · păstrare 8 · femei 2 · vegan 4 · claim 3 g 1 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 11 · forță 2 · energie 1 · recuperare 12 · sigur 1 · cea mai bună/pură 6 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 36
- **FAQ vizibil:** DA – H2 „Întrebări Frecvente despre…” + schema FAQPage 5 Q (Conține și alte ingrediente? Câtă creatină/porție? Vegani/alergii? Cum prepari și când? Câte porții și cum păstrezi?) + H2 „FAQ” generic (15 H3 despre gust/miros/textură/caking)
- **Tabele:** 1
- **Dozare / protocol:** ½ cupă = 3,4 g în 300 ml; 1 servire/zi; antrenament: cu 30 min înainte; pauză: înainte de masă
- **Recenzii:** widget judge.me, jdgm, yotpo, loox, okendo, review; numere vizibile în text: 2, 2
- **Imagini / video:** ~29 (11 alt-uri goale)
- **Variante / mărimi:** 300 g (2 oferte)
- **Trust / USP:** „Cost pe porție: 1,42 lei”, „88 de porții (~88 de zile)”, badge „Produs în Uniunea Europeană”, „De 14 ani retailerul român #1 în nutriție sportivă”, „Transport GRATUIT >300 lei”, EasyBox/GLS „3800 lockere”, „Întreabă consultantul AI”, „Compară cu produse similare”, E-book, MerchantReturnPolicy + OfferShippingDetails, Judge.me
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** title/H1/meta „Supliment crestere masa musculara”; bullets „Îmbunătățește forța musculară”, „Accelerează procesul de recuperare”, „Ajută la creșterea în masă musculară”
- **Claim-uri conforme / neutre:** „O doză zilnică de 3 g de creatină sprijină performanța în exerciții pe termen scurt și de intensitate ridicată”
- **Ce NU răspunde pagina:** Creapure vs; micronizată; efecte secundare; retenție; (boilerplate-ul de 15 secțiuni acoperă sedimentul și „fără aromă ≠ fără gust”)

### 45. Genius Creapure (via Nutriland) – produs „Creatina CREAPURE® 300g, pudra, Genius Nutrition, Creatina monohidrata Fara aroma, Puritate ridicata”
- **URL:** https://www.nutriland.ro/products/creapure
- **Metodă:** curl
- **Title:** Creatina CREAPURE® 300g, pudra, Genius Nutrition, Creatina monohidrata Fara aroma, Puritate ridicata - Nutriland – Nutriland® (125 caractere)
- **Meta description (182 caractere):** Creatina CREAPURE® 300g, pudra, Genius Nutrition, Creatina monohidrata Fara aroma, Puritate ridicata ➜ Achizitioneaza de pe Nutriland ➤ beneficiezi de ✅ Calitate ✅ Preturi accesibile
- **H1:** Creatina CREAPURE® 300g, pudra, Genius Nutrition, Creatina monohidrata Fara aroma, Puritate ridicata
- **H2:** Întreabă consultantul AI; Creatina CREAPURE® 300g, pudra, Genius Nutrition, Creatina monohidrata Fara aroma, Puritate ridicata - detalii produs; Informatii suplimentare; Compară cu produse similare; FAQ; E-BOOK 1: Cum sa iti optimizezi antrenamentele cu ajutorul suplimentelor, nivel: INCEPATOR
- **H3:** De 14 ani; Transport GRATUIT; EasyBox & GLS; Plata; 1. Gustul si aromele sunt subiective; 2. Ce inseamna Unflavoured / Fara aroma?; 3. Mirosul produsului; 4. Textura, consistenta si solubilitatea; 5. Prepararea si utilizarea corecta; 6. Diferente intre producatori si loturi; 7. Preferinta personala versus neconformitate; 8. Alegerea produsului si politica de retur; 1. Higroscopicitatea – de ce unele ingrediente atrag umiditatea?; 2. Ce este fenomenul de Caking (aglomerare si compactare)?; 3. De ce pot aparea bulgarasi inclusiv in creatina monohidrata?; 4. Aglomerarea afecteaza calitatea sau eficienta produsului?; 5. Cum se poate utiliza un produs care prezinta aglomerari?; 6. Cum poate fi limitata formarea aglomerarilor?; 7. Informatii importante privind conformitatea produsului
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 5524
- **JSON-LD:** Brand, BreadcrumbList, ListItem, MerchantReturnPolicy, Offer, OfferShippingDetails, Organization, Product
- **Semnale text (număr de apariții):** „ce este” 1 · „cum se ia/administrare” 3 · „efecte secundare” 0 · încărcare 1 · menținere 1 · dozare după kg 1 · micronizat 2 · Creapure 12 · dizolvare 7 · păstrare 9 · femei 3 · vegan 2 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 4 · forță 2 · energie 1 · recuperare 12 · sigur 1 · cea mai bună/pură 6 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 39
- **FAQ vizibil:** H2 „FAQ” generic (boilerplate) – fără FAQ specific, fără FAQPage
- **Tabele:** 1
- **Dozare / protocol:** idem Genius (3 g)
- **Recenzii:** widget judge.me, jdgm, yotpo, loox, okendo, review; numere vizibile în text: –
- **Imagini / video:** ~30
- **Variante / mărimi:** 300 g (2 oferte)
- **Trust / USP:** title de 125 caractere; același șablon Nutriland
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** „recuperare” ×12 (boilerplate)
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** Creapure explicat (doar „Puritate ridicată”)

### 46. Allnutrition (SFD) – categorie Creatină
- **URL:** https://allnutrition.ro/Creatina-k981.html
- **Metodă:** curl
- **Title:** Nutriție sportivă - Creatină • CEL MAI IEFTIN • Allnutrition.ro (63 caractere)
- **Meta description (115 caractere):** Cei mai buni ARZĂTORI DE GRĂSIMI! Cele mai ieftine PROTEINE, cei mai ieftini GAINERS și CARBO. Realizare în 12 ore!
- **H1:** Creatină
- **H2:** Ce este creatina?; Cum acționează creatina?; Cum trebuie dozată creatina?
- **H3:** CREȘTEREA REZISTENȚEI; SPRIJIN PENTRU REGENERARE; PROBABIL CELE MAI MICI PREȚURI DIN INDUSTRIE; ALLNUTRITION Creatină Monohidrată (Creatine Muscle Max) - 1000g; ALLNUTRITION Creatină Monohidrată (Creatine Muscle Max) - 500g; SFD NUTRITION Creatină Monohidrată - 500g; SFD NUTRITION Creatină Monohidrată - 1000g; ALLNUTRITION Creatină Monohidrată (Creatine Muscle Max) - 250g; SFD NUTRITION Creatină Monohidrată - 250g; SFD NUTRITION Creatină Monohidrată - 400 CAPSULE; SFD NUTRITION Creatină monohidrat - 120 comprimate; ALLNUTRITION Creatină - 20 comprimate; ALLNUTRITION Creatină Monohidrată (XtraCaps) - 360 CAPSULE; SFD NUTRITION Creatină Monohidrată - 200 CAPSULE; ALLDEYNN Creatină Monohidrată (CREAROSE) - 225g; ALLNUTRITION Creatină cu electroliți - 300 g; ALLNUTRITION 6 x Creatina 20 comprimate; Olimp Kre-Alkalyn 2500 Mega Caps - 120 capsule; Hi-Tec Nutrition AMG - 875g; Olimp Rocky Athletes Creatine - 200g; Trec NitroBolon - 150 capsule; ActivLab Creatine Powder Super - 500g; Iron Horse Crea Fight 2.0 - 840g; Animal Animal Creatine Chews - 120 tablete … (+5)
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1642
- **JSON-LD:** niciunul
- **Semnale text (număr de apariții):** „ce este” 1 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 5 · Creapure 0 · dizolvare 4 · păstrare 1 · femei 2 · vegan 1 · claim 3 g 0 · „crește performanța fizică” 11 · disclaimer 0 · masă musculară 8 · forță 8 · energie 3 · recuperare 4 · sigur 2 · cea mai bună/pură 3 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 13 · preț (lei) 35
- **FAQ vizibil:** nu
- **Tabele:** 2
- **Dozare / protocol:** H2 „Cum trebuie dozată creatina?” (text de categorie)
- **Recenzii:** widget niciunul; numere vizibile în text: –
- **Imagini / video:** ~30
- **Variante / mărimi:** ~28 carduri (SFD, Allnutrition, Olimp, Trec, ActivLab…)
- **Trust / USP:** H2 „Ce este creatina?”, „Cum acționează creatina?”, „Cum trebuie dozată creatina?”; carduri cu claim-ul autorizat în majuscule „CREȘTE PERFORMANȚA FIZICĂ” + „FĂRĂ ADAOS DE ZAHĂR” + „EFICIENȚĂ CONFIRMATĂ PRIN STUDII” + „83 DE PORȚII”; „Preț minim 30 zile” (Omnibus) pe carduri; „CEL MAI IEFTIN” în title
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** title „CEL MAI IEFTIN”; H3 „CREȘTEREA REZISTENȚEI”, „SPRIJIN PENTRU REGENERARE”; meta despre arzătoare de grăsimi (irelevantă)
- **Claim-uri conforme / neutre:** „Monohidratul de creatină crește performanța fizică” (pe carduri)
- **Ce NU răspunde pagina:** FAQ; schema; Creapure

### 47. Body Line (Platinium Pure Creatine, Creapure®) – produs „Creatina Monohidrata Creapure® PURE CREATINE 300g”
- **URL:** https://bodyline.ro/cresterea-masei-musculare/creatina-monohidrata/
- **Metodă:** curl
- **Title:** Creatina Monohidrata Creapure® Pure Creatine Doar 89 Lei (56 caractere)
- **Meta description (131 caractere):** Creatina Monohidrata Creapure® Germania - Formula complexă Pure Creatine 300 g de creatină pură pentru volum masă musculară, forță.
- **H1:** Creatina Monohidrata Creapure® PURE CREATINE 300g. Body Line. -51% REDUCERE
- **H2:** Te întrebi dacă ar trebui să iei creatină?; Ce este creatina?; ALEGE PLATINIUM PURE CREATINE; Alege PLATINIUM; PURE; CREATINE; PLATINIUM PURE CREATINE conține creatina monohidrata; 9 recenzii pentru Creatina Monohidrata Creapure® PURE CREATINE 300g. Body Line. -51% REDUCERE; Autentificare; Înregistrare
- **H3:** OBȚINE PERFORMANȚA CU; PLATINIUM PURE CREATINE; – Creatina Monohidrata Creapure® –; CE ESTE Creapure®?; PURE CREATINE Creatina monohidrata Creapure®; CUM CREȘTI APORTUL DE CREATINĂ?; CREATINA MONOHIDRATĂ; Ce beneficii oferă PLATINIUM PURE CREATINE?; Cum acționează Creatina Monohidrata de la Creapure® Germania?; Când se ia creatina monohidrata?; Ce efecte are creatina monohidrat?; Cum se administrează Creatina Monohidrata?; PREZENTARE; Te-ar mai putea interesa:; Produse similare
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 2415
- **JSON-LD:** AggregateRating, ContactPoint, ImageObject, ItemPage, Offer, Organization, Person, Place, PostalAddress, Product, Rating, Review, WebSite · AggregateRating 4.44 (9)
- **Semnale text (număr de apariții):** „ce este” 4 · „cum se ia/administrare” 2 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 0 · micronizat 1 · Creapure 24 · dizolvare 3 · păstrare 2 · femei 0 · vegan 0 · claim 3 g 1 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 19 · forță 4 · energie 5 · recuperare 5 · sigur 1 · cea mai bună/pură 10 · puritate % 1 · testat lab 0 · GMP/ISO/HACCP 0 · studii 3 · preț (lei) 50
- **FAQ vizibil:** nu (dar H3 sub formă de întrebări: Ce este creatina? CE ESTE Creapure®? Cum crești aportul? Ce beneficii? Cum acționează? Când se ia? Ce efecte are? Cum se administrează?)
- **Tabele:** 0
- **Dozare / protocol:** în text (cum se administrează)
- **Recenzii:** widget review; numere vizibile în text: 9, 9, 9, 9
- **Imagini / video:** ~33 (bannere); fără video
- **Variante / mărimi:** 300 g (și 400 g menționat)
- **Trust / USP:** AggregateRating 4,44 (9) + Review; title cu preț „Doar 89 Lei”; H1 cu „-51% REDUCERE”; URL în categoria „cresterea-masei-musculare”
- **Linkuri interne către ghiduri:** 1 (blog)
- **Claim-uri folosite – NECONFORME (nu copiem):** „masă musculară” ×19, „cea mai bună” ×9, „cea mai pură”, meta „volum masă musculară, forță”
- **Claim-uri conforme / neutre:** claim 3 g menționat o dată
- **Ce NU răspunde pagina:** structură de ghid, dar răspunsurile sunt marketing; fără FAQ schema; fără alergeni/păstrare

### 48. Scitec (via gym-stack) – produs „Creatina Monohidrata, Scitec Nutrition, 100% Creatine Monohydrate, 300g”
- **URL:** https://gym-stack.ro/products/creatina-monohidrata-scitec-nutrion-100-creatine-monohydrate-300g
- **Metodă:** curl
- **Title:** Creatina Monohidrata, Scitec Nutrition, 100% Creatine Monohydrate, 300 (70 caractere)
- **Meta description (180 caractere):** Creatina monohidrata, Scitec Nutrion, 100% Creatine Monohydrate, 300g ➜ Achizitioneaza acum la preturi accesibile✅Calitate garantata⭐Imbunatateste-ti antrenamentele cu gym-stack.ro
- **H1:** Creatina Monohidrata, Scitec Nutrition, 100% Creatine Monohydrate, 300g
- **H2:** –
- **H3:** Detaliile produsului
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 941
- **JSON-LD:** AggregateRating, Brand, BreadcrumbList, ListItem, Offer, Product · AggregateRating 0 (0)
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 1 · menținere 1 · dozare după kg 1 · micronizat 0 · Creapure 0 · dizolvare 1 · păstrare 1 · femei 1 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 4 · forță 0 · energie 2 · recuperare 2 · sigur 1 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 8
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** încărcare/menținere menționate; dozare după kg menționată
- **Recenzii:** widget judge.me, yotpo, loox, okendo, review; numere vizibile în text: –
- **Imagini / video:** 2
- **Variante / mărimi:** 300 g
- **Trust / USP:** AggregateRating cu valoare 0 din 0 recenzii în JSON-LD (markup greșit)
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** „masă musculară” ×4
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** pagină de retailer minimă

### 49. HighEnergy – blog „Cea mai bună creatină monohidrată: Ghid și Recomandări” + colecție + produse (DY 300 g, Genius 400 g)
- **URL:** https://highenergy.ro/blog/news/cea-mai-buna-creatina-monohidrata
- **Metodă:** curl 200, dar conținutul e randat 100 % în JavaScript (HTML server-side: 13 cuvinte, title generic „Magazin Online Suplimente Sportive”); doar <head>-ul blogului e complet
- **Title:** Cea mai bună creatină monohidrată: Ghid și Recomandări - HighEnergy.ro - Your Performance, Our Job! (99 caractere)
- **Meta description:** Cauți cea mai bună creatină monohidrată? Descoperă diferența dintre creatina micronizată, Creapure și capsule, plus recomandări de top pentru forță și masă musculară. (166)
- **H1:** (JS)
- **H2/H3:** (JS)
- **Cuvinte:** necunoscut
- **FAQ vizibil:** necunoscut
- **Tabele:** necunoscut
- **Dozare / protocol:** necunoscut
- **Imagini / video:** necunoscut
- **Variante / mărimi:** colecția: OstroVit 500 g etc.
- **Trust / USP:** schema BlogPosting + Organization în head; „Produse testate anti-dopping”, „Produse 100% originale”, transport gratuit >200 lei; autor Tudor Șulea pe articole
- **Linkuri interne către ghiduri:** –
- **Claim-uri folosite – NECONFORME (nu copiem):** meta: „forță și masă musculară”
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** nu se poate evalua corpul paginii (JS); Google îl rankează prin randare


## D. Pagini informaționale care rankează top 5 pe „creatina” / „cea mai bună creatină”

### 50. gym-stack (ghid) – articol „Cea mai bună creatină monohidrată” (rankează pe 7/16 interogări)
- **URL:** https://gym-stack.ro/blogs/news/cea-mai-buna-creatina-monohidrata
- **Metodă:** curl
- **Title:** Cea mai bună creatină monohidrată (33 caractere)
- **Meta description (123 caractere):** Descopera cea mai bună creatină monohidrată ✅ Sfaturi & Recomandări de la specialiști. Vezi prețuri, diferențe și beneficii
- **H1:** Cea mai bună creatină monohidrată
- **H2:** 1. Cea mai bună creatină monihidrată - Clasificare TOP 3; 2. Cum să alegi cea mai bună creatină monohidrată - aspecte pe care trebuie să le ai în vedere; 3. Branduri de creatină monohidrată recomandate de gym-stack.ro; 4. Cum se folosește creatina monohidrată și cum o poți integra în dietă pentru rezultate optime; Întrebări și răspunsuri frecvente despre creatina monohidrată
- **H3:** 3.1. Brandul BioTechUSA; 3.2. Brandul Evogen Nutrition; 3.3. Brandul Scitec Nutrition
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 3015
- **JSON-LD:** Article, Organization, Person, WebPage
- **Semnale text (număr de apariții):** „ce este” 3 · „cum se ia/administrare” 5 · „efecte secundare” 1 · încărcare 10 · menținere 2 · dozare după kg 0 · micronizat 9 · Creapure 1 · dizolvare 6 · păstrare 0 · femei 0 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 15 · forță 9 · energie 7 · recuperare 10 · sigur 1 · cea mai bună/pură 5 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 2 · preț (lei) 6
- **FAQ vizibil:** DA – H2 „Întrebări și răspunsuri frecvente” – FĂRĂ FAQPage (doar Article)
- **Tabele:** 4 (tabel comparativ TOP 3: Produs / Caracteristici / …)
- **Dozare / protocol:** H2 „4. Cum se folosește… și cum o poți integra în dietă”: încărcare ×10, menținere, timing ×9, combinare cu proteine ×3
- **Recenzii:** widget judge.me, review; numere vizibile în text: –
- **Imagini / video:** 4
- **Variante / mărimi:** TOP 3 (BioTechUSA, Evogen, Scitec) – cuprinsul anunță Raw Nutrition/ProSupps (inconsistent)
- **Trust / USP:** cuprins cu ancore; H2 numerotate (1. Clasificare TOP 3; 2. Cum să alegi – aspecte; 3. Branduri recomandate; 4. Cum se folosește; FAQ); 7 liste ordonate; 3 000 cuvinte; Article + Person schema
- **Linkuri interne către ghiduri:** 2 articole (arginină, BCAA)
- **Claim-uri folosite – NECONFORME (nu copiem):** „masă musculară” ×15, „recuperare” ×10, „energie” ×7, „absorbție rapidă”
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** Creapure vs generic (1 mențiune); efecte secundare (1); sursele

### 51. HyperFit (ghid) – articol „Cea mai bună Creatină în 2026 — Top Creatine disponibile în România”
- **URL:** https://hyperfit.ro/blogs/nutritie/cea-mai-buna-creatina-top-creatine-disponibile-in-romania
- **Metodă:** curl
- **Title:** Cea mai bună Creatină în 2026 — Top Creatine disponibile în România – HyperFit.ro (81 caractere)
- **Meta description (158 caractere):** Top 5 creatine disponibile pe HyperFit.ro — de la monohidrată pură la formule avansate cu 6 tipuri. DY Nutrition, Genius Nutrition, Optimum Nutrition, Weider.
- **H1:** Cea mai bună Creatină în 2026 — Top Creatine disponibile în România
- **H2:** Top creatine disponibile pe HyperFit.ro; Întrebări frecvente despre creatină
- **H3:** The Creatine, DY Nutrition, 400g | Complex cu creatina, beta-alanina, taurina, vitamine B; Micronised Creatine Powder, Optimum Nutrition, 317g | Creatina monohidrata micronizata; Pure Creatine Powder, Weider | Creatina monohidrata Creapure®; CREAF7, Genius Nutrition, 405g | Complex cu 6 tipuri de creatina; Premium Pure Creatine, Weider, 375g | Creatina 100% Creapure®; Micronised Creatine Powder, Optimum Nutrition, 247,5g | Cu aromă; Creatine Monohydrate, DY Nutrition, 300g | Creatina monohidrata; Creatine 200 MESH Cherry Lollipop, Weider, 300g; Premium Pure Creatine Gummies, Weider, 60 jeleuri; Creatine Monohydrate, Genius Nutrition, 400g | Creatina monohidrat micronizata; Cumpară după obiectiv; Categorii populare
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1805
- **JSON-LD:** Answer, BlogPosting, BreadcrumbList, ContactPoint, EntryPoint, FAQPage, ImageObject, ItemList, ListItem, Organization, Question, SearchAction, WebPage, WebSite · FAQPage cu 5 întrebări
- **Semnale text (număr de apariții):** „ce este” 3 · „cum se ia/administrare” 4 · „efecte secundare” 1 · încărcare 1 · menținere 1 · dozare după kg 0 · micronizat 9 · Creapure 16 · dizolvare 3 · păstrare 0 · femei 0 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 1 · masă musculară 6 · forță 0 · energie 5 · recuperare 2 · sigur 0 · cea mai bună/pură 8 · puritate % 2 · testat lab 0 · GMP/ISO/HACCP 0 · studii 2 · preț (lei) 29
- **FAQ vizibil:** DA – H2 „Întrebări frecvente despre creatină” + schema FAQPage 5 Q (Cât creatină iau pe zi? Monohidrată vs Creapure® – diferența? Pudră, capsule sau jeleuri? Cu aromă sau fără? Când se ia?)
- **Tabele:** 10
- **Dozare / protocol:** FAQ: 3–5 g/zi; încărcare 20 g × 5 zile opțională; oricând, zilnic
- **Recenzii:** widget judge.me, jdgm, review; numere vizibile în text: –
- **Imagini / video:** ~23
- **Variante / mărimi:** top 10 produse (DY, ON, Weider ×4, Genius ×2) cu mini-tabele Format/Tip/Arome/Preț
- **Trust / USP:** „Cum am ales – criteriile noastre” (tip/puritate, doză ≥3 g, format, ingrediente adiționale, preț per gram de creatină activă); „Shortlist rapid” pe obiective; „Actualizat 5 iulie 2026”; „5 min de citit”; BlogPosting + ItemList + FAQPage; 13 linkuri către alte ghiduri; „Creapure® 99,95 % verificată independent pe fiecare lot”
- **Linkuri interne către ghiduri:** 13
- **Claim-uri folosite – NECONFORME (nu copiem):** „peste 1 000 de studii clinice”, „masă musculară” ×6, „energie” ×5
- **Claim-uri conforme / neutre:** „Nu există beneficiu dovedit pentru doze mai mari” (prudent)
- **Ce NU răspunde pagina:** efecte secundare; micronizată explicată; dizolvare

### 52. TopGuides (afiliat) – articol „Cea Mai Bună Creatină în 2026”
- **URL:** https://topguides.ro/top-cea-mai-buna-creatina/
- **Metodă:** curl
- **Title:** Cea Mai Bună Creatină în 2026 (29 caractere)
- **Meta description (0 caractere):** – LIPSĂ
- **H1:** Cea Mai Bună Creatină în 2026
- **H2:** Top cea mai bună creatină; Ce este faza de încărcare în consumul de creatină?; Care sunt sursele naturale de creatină?; Ce alte suplimente poți folosi pentru a-ți spori performanțele sportive?; Top 7 Cele mai Bune Proteine 2026
- **H3:** 1. The Creatine DYNutrition; 2. Creatină Impact; 3. Creatină micronizată monohidrată Optimum Nutrition; 4. Creatină monohidrată Olimp Sport Nutrition; 5. Pudră monohidrată de creatină Amix; Abonează-te la lista noastră
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 3009
- **JSON-LD:** Article, BreadcrumbList, EntryPoint, ImageObject, ListItem, Organization, Person, PropertyValueSpecification, ReadAction, SearchAction, WebPage, WebSite
- **Semnale text (număr de apariții):** „ce este” 3 · „cum se ia/administrare” 4 · „efecte secundare” 0 · încărcare 8 · menținere 2 · dozare după kg 1 · micronizat 13 · Creapure 0 · dizolvare 4 · păstrare 0 · femei 1 · vegan 1 · claim 3 g 1 · „crește performanța fizică” 1 · disclaimer 0 · masă musculară 11 · forță 6 · energie 9 · recuperare 4 · sigur 2 · cea mai bună/pură 10 · puritate % 1 · testat lab 1 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 0
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** H2 „Ce este faza de încărcare?”; dozare după kg menționată
- **Recenzii:** widget review; numere vizibile în text: –
- **Imagini / video:** 15 + 2 YouTube
- **Variante / mărimi:** top 5 (DY The Creatine, Impact/Myprotein, ON, Olimp, Amix)
- **Trust / USP:** H2 „Care sunt sursele naturale de creatină?”, „Ce alte suplimente…?”; Article schema; video
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** „masă musculară” ×11, „energie” ×9
- **Claim-uri conforme / neutre:** claim 3 g ×1
- **Ce NU răspunde pagina:** META DESCRIPTION LIPSĂ; title 29 caractere fără brand; fără FAQ

### 53. Pareri Adevarate (afiliat) – articol „Cea Mai Buna Creatina Monohidrata 2026”
- **URL:** https://pareriadevarate.ro/cea-mai-buna/creatina/monohidrata/
- **Metodă:** curl
- **Title:** Cea Mai Buna Creatina Monohidrata 2026 - Pareri AdevarateAd (59 caractere)
- **Meta description (194 caractere):** Descoperiti beneficiile si utilizarile celei mai bune creatine monohidratate. Sfaturi pentru administrare si selectie, plus informatii despre cum va poate imbunatati performanta in antrenamente.
- **H1:** Cea Mai Buna Creatina Monohidrata 2026
- **H2:** Cea Mai Buna Creatina Monohidrata - Beneficii si Sfaturi
- **H3:** Beneficiile Cea Mai Bune Creatine Monohidrata; Mod de Utilizare; Intrebari Frecvente; Sfaturi pentru Administrarea Corecta; Concluzie
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 968
- **JSON-LD:** ImageObject, NewsArticle, Organization, WebPage
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 8 · „efecte secundare” 1 · încărcare 3 · menținere 1 · dozare după kg 0 · micronizat 1 · Creapure 0 · dizolvare 0 · păstrare 0 · femei 2 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 4 · forță 1 · energie 1 · recuperare 2 · sigur 1 · cea mai bună/pură 278 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 1 · preț (lei) 0
- **FAQ vizibil:** H3 „Intrebari Frecvente” (fără schema)
- **Tabele:** 2
- **Dozare / protocol:** H3 „Mod de Utilizare”; încărcare ×3
- **Recenzii:** widget review; numere vizibile în text: –
- **Imagini / video:** 6
- **Variante / mărimi:** tabele afiliate
- **Trust / USP:** NewsArticle schema
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** „cea mai bună” ×278 (keyword stuffing); „masă musculară” ×4
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** meta 194 caractere; conținut subțire (968 cuvinte)

### 54. Regina Maria (articol medical – rankează pe 6/16 interogări, inclusiv comerciale) – articol „Creatina: ce este, cum se utilizează, contraindicații”
- **URL:** https://www.reginamaria.ro/articole-medicale/alimentatie-sanatoasa/creatina-ce-este-cum-se-utilizeaza-contraindicatii
- **Metodă:** curl
- **Title:** Creatina: ce este, cum se utilizeaza, contraindicatii | Reginamaria.ro (70 caractere)
- **Meta description (143 caractere):** Creatina este un supliment alimentar popular in randul sportivilor. Afla ce este creatina, ce rol are, cum se administreaza si cand e indicata.
- **H1:** Creatina: ce este, cum se utilizează, contraindicații
- **H2:** Alege sectiunea; Bine cu tine; Sanatatea copiilor; Sanatatea femeii si sarcina; Sanatatea barbatului; Sanatatea familiei; Contactează-ne!; Ce este creatina?; Tipuri de suplimente de creatină și eficiența lor; Despre creatină și utilizarea sa în sport; Efectele creatinei asupra organismului; Creatina: efecte negative și contraindicații; Cum se utilizează creatina corect?; Distribuie; Inspiră si lasă-te inspirat!
- **H3:** Creatina monohidrat; Creatina etil ester (CEE); Creatina hidroclorid (HCl); Creatina alcalină; Creatina malat; Creatina fosfat; Creatina combinată (creatina cu carbohidrați sau proteine); Formele de prezentare ale creatinei: pudră, capsule, tablete și lichid; Care este cea mai eficientă formă de creatină?; Cum ajută creatina în sport?; Este creatina un supliment sigur?; Cine poate beneficia de suplimentarea cu creatină?; Proteine și creatina – o combinație benefică?; Creatina sub formă de pastile – o alternativă convenabilă; Efectele creatinei asupra performanței fizice și musculare; Efectele creatinei asupra recuperării musculare; Efectele creatinei asupra funcției cognitive; Efectele creatinei asupra femeilor; La ce ajută creatina în afara sportului?; Efecte negative posibile ale creatinei; Contraindicații și precauții; Ce spun medicii despre creatină?; Recomandări pentru o administrare corectă; Când să iei creatina? … (+2)
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 4055
- **JSON-LD:** Article, BreadcrumbList, ContactPoint, ImageObject, ItemPage, ListItem, MedicalOrganization, Person, PostalAddress
- **Semnale text (număr de apariții):** „ce este” 7 · „cum se ia/administrare” 12 · „efecte secundare” 3 · încărcare 1 · menținere 2 · dozare după kg 0 · micronizat 2 · Creapure 0 · dizolvare 12 · păstrare 0 · femei 8 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 12 · forță 11 · energie 7 · recuperare 12 · sigur 13 · cea mai bună/pură 3 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 30 · preț (lei) 0
- **FAQ vizibil:** nu (dar 26 H3, multe sub formă de întrebări)
- **Tabele:** 0
- **Dozare / protocol:** H2 „Cum se utilizează creatina corect?”, H3 „Recomandări pentru o administrare corectă”, „Când să iei creatina?”; încărcare/menținere; dizolvare ×12
- **Recenzii:** widget niciunul; numere vizibile în text: –
- **Imagini / video:** 8
- **Variante / mărimi:** –
- **Trust / USP:** H2: Ce este creatina? / Tipuri de suplimente și eficiența lor (monohidrat, CEE, HCl, alcalină, malat, fosfat, combinată) / Despre creatină și utilizarea în sport / Efectele asupra organismului / Efecte negative și contraindicații / Cum se utilizează corect?; H3 „Care este cea mai eficientă formă?”, „Este creatina un supliment sigur?”, „Proteine și creatina – o combinație benefică?”, „Ce spun medicii?”, „Surse:”; 4 055 cuvinte; schema Article + MedicalOrganization; cuprins cu ancore; „retenție” ×5, „rinichi” ×7, „creatinină” ×6
- **Linkuri interne către ghiduri:** 40 (ancore interne + alte articole)
- **Claim-uri folosite – NECONFORME (nu copiem):** (articol medical, nu produs) – „masă musculară” ×12, „recuperare” ×12, „sigur” ×13
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** Creapure (0 mențiuni); micronizată (2); dozare după greutate; produse


## E. Sursa ingredientului

### 55. Creapure® (AlzChem) – pagina „BUY HERE” – listă oficială de branduri licențiate (Prime Supplements e listat pentru România)
- **URL:** https://www.creapure.com/en/buy-here/
- **Metodă:** curl
- **Title:** BUY HERE | Creapure (19 caractere)
- **Meta description (0 caractere):** – LIPSĂ
- **H1:** –
- **H2:** Creapure ® Quality Seal: Where it's on the label, there's quality inside.; Creapure ® Products
- **H3:** –
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1874
- **JSON-LD:** niciunul
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 0 · „efecte secundare” 0 · încărcare 1 · menținere 0 · dozare după kg 0 · micronizat 1 · Creapure 47 · dizolvare 0 · păstrare 0 · femei 0 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 0 · forță 0 · energie 0 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 0
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** –
- **Recenzii:** widget niciunul; numere vizibile în text: –
- **Imagini / video:** 422 (logo-uri, 56 fără alt)
- **Variante / mărimi:** filtre pe țară/furnizor (2 select-uri); 422 logo-uri
- **Trust / USP:** H2 „Creapure® Quality Seal: Where it's on the label, there's quality inside.”; H2 „Creapure® Products”; fără meta description; fără schema
- **Linkuri interne către ghiduri:** 0
- **Claim-uri folosite – NECONFORME (nu copiem):** –
- **Claim-uri conforme / neutre:** –
- **Ce NU răspunde pagina:** – (sursă de linkare/citare pentru noi: „listat pe creapure.com”)


## F. Paginile noastre (referință de pornire, live 15.10.2026)

### 56. PRIME SUPPLEMENTS (noi) – referință – PRODUS A – creatina-creapure
- **URL:** https://primesupplements.ro/products/creatina-creapure
- **Metodă:** curl (live 15.10.2026)
- **Title:** Creatină Creapure® monohidrată 300/500 g | Prime Supplements (60 caractere)
- **Meta description (152 caractere):** Creatină Creapure®: pulbere cu un singur ingredient, creatină monohidrată Creapure®. Tub de 300 g (60 de porții) sau 500 g (100 de porții), 3–5 g pe zi.
- **H1:** Creatină monohidrat micronizată Creapure®
- **H2:** Pe scurt; Ingrediente; Detalii produs; S-ar putea să-ți placă; Customer Reviews; Cele mai vândute; Categorii populare; Creatină Creapure®: un singur ingredient, în tub de 300 g sau 500 g
- **H3:** Cantități declarate; Cantități declarate; Cantități declarate; Ce este Creapure®; Cum o folosești; Pentru cine este; Creapure® sau celelalte forme de creatină Prime; Întrebări frecvente
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 2239
- **JSON-LD:** AggregateRating, Brand, BreadcrumbList, ContactPoint, Country, DefinedRegion, ImageObject, ListItem, MerchantReturnPolicy, MonetaryAmount, Offer, OfferShippingDetails, OnlineStore, Organization, Person, PostalAddress, Product, QuantitativeValue, ShippingDeliveryTime · AggregateRating 5.0 (17)
- **Semnale text (număr de apariții):** „ce este” 2 · „cum se ia/administrare” 3 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 1 · micronizat 21 · Creapure 47 · dizolvare 1 · păstrare 0 · femei 0 · vegan 0 · claim 3 g 8 · „crește performanța fizică” 7 · disclaimer 4 · masă musculară 0 · forță 0 · energie 0 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 40
- **FAQ vizibil:** DA – H3 „Întrebări frecvente” în seo_produs cu 5 întrebări (Ce este creatina Creapure®? Câte grame pe zi? 300 g sau 500 g: ce diferă? Are aromă sau îndulcitori? Cine nu ar trebui să o folosească?) – FĂRĂ schema FAQPage
- **Tabele:** 0
- **Dozare / protocol:** 3–5 g/zi; „consumi suficiente lichide”; fără volum de apă; fără timing; fără încărcare; fără dozare după greutate; „la 5 g pe zi, tuburile ajung pentru 60, respectiv 100 de zile”
- **Recenzii:** widget judge.me, jdgm, review; numere vizibile în text: 17, 17, 44, 14, 17
- **Imagini / video:** 2 imagini media (galerie) – parserul numără ~20 incl. produsele recomandate; fără video
- **Variante / mărimi:** 2 variante: 500 g/100 porții și 300 g/60 porții (2 oferte); fără aromă
- **Trust / USP:** claim-ul EFSA verbatim + condiția 3 g (×7); „Prime Supplements apare pe site-ul creapure.com ca producător partener din România; captura listării este în galeria produsului” (creapure.com menționat de 12 ori, dar FĂRĂ link); badge „Produs în Uniunea Europeană”; Judge.me 17 recenzii (5,0) cu AggregateRating; schema Product + Offer + Shipping + Return + Breadcrumb + OnlineStore; H3 „Creapure® sau celelalte forme de creatină Prime” (comparație internă)
- **Linkuri interne către ghiduri:** 0 către ghidurile din blog (ce-este-creatina, cum-se-ia-creatina, in-cat-timp-face-efect-creatina există în colecție, nu pe produs)
- **Claim-uri folosite – NECONFORME (nu copiem):** – (compliant)
- **Claim-uri conforme / neutre:** claim EFSA verbatim; disclaimer complet
- **Ce NU răspunde pagina:** ce este creatina (definiție) – lipsește; ce înseamnă „micronizată” pe acest produs (titlul spune „micronizată Creapure®” – de verificat cu eticheta: GymBeam afirmă că AlzChem nu produce Creapure® micronizată); cum verifici sigiliul/licența Creapure®; Creapure® vs monohidrat generic (criterii obiective); volum de apă / mod de preparare; zile fără antrenament; dizolvare/sediment; păstrare; alergeni; „Produs pentru:”; „fabricat în UE într-o unitate certificată ISO și HACCP” (permis de etichetă, nefolosit); retenție/efecte secundare (răspuns prin avertismentele etichetei); femei/vegani; combinare cu Prime Whey / EAA / pre-workout (Nitrox NO-STIM are 2200 mg creatină – de menționat la „nu depăși doza”); cost pe porție (fără preț: „împarte prețul la 60/100”); tabel-listă comparativ al celor 3 forme (există parțial ca H3); surse (EFSA 2011)

### 57. PRIME SUPPLEMENTS (noi) – referință – PRODUS B – creatina-monohidrat-micronized-300g-fara-aroma
- **URL:** https://primesupplements.ro/products/creatina-monohidrat-micronized-300g-fara-aroma
- **Metodă:** curl (live)
- **Title:** Creatină monohidrată micronizată 300 g | Prime Supplements (58 caractere)
- **Meta description (145 caractere):** Creatină monohidrată micronizată fără aromă: tub de 300 g, 60 de porții de 5 g, 5000 mg creatină pe porție, un singur ingredient, măsură inclusă.
- **H1:** Creatină monohidrat micronizată – fără aromă, 300 g
- **H2:** CREATINĂ MONOHIDRATĂ MICRONIZATĂ; CREATINĂ MONOHIDRATĂ MICRONIZATĂ; S-ar putea să-ți placă; Customer Reviews; Cele mai vândute; Categorii populare; Creatină monohidrată micronizată: 5000 mg pe porție, fără aromă
- **H3:** Cantități declarate; Cantități declarate; Ce înseamnă creatină micronizată; Cum o prepari; Trei forme de creatină Prime: cum alegi; Întrebări frecvente
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 1517
- **JSON-LD:** AggregateRating, Brand, BreadcrumbList, ContactPoint, Country, DefinedRegion, ImageObject, ListItem, MerchantReturnPolicy, MonetaryAmount, Offer, OfferShippingDetails, OnlineStore, Organization, Person, PostalAddress, Product, QuantitativeValue, ShippingDeliveryTime · AggregateRating 3.0 (2)
- **Semnale text (număr de apariții):** „ce este” 0 · „cum se ia/administrare” 5 · „efecte secundare” 0 · încărcare 0 · menținere 0 · dozare după kg 1 · micronizat 24 · Creapure 3 · dizolvare 3 · păstrare 2 · femei 5 · vegan 0 · claim 3 g 4 · „crește performanța fizică” 3 · disclaimer 1 · masă musculară 0 · forță 0 · energie 0 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 1 · studii 0 · preț (lei) 43
- **FAQ vizibil:** DA – 5 întrebări (monohidrată sau micronizată? câte grame pe zi? cât ține un tub? conține alergeni? cine nu ar trebui?) – FĂRĂ FAQPage
- **Tabele:** 0 (liste „Cantități declarate”)
- **Dozare / protocol:** 5 g (½ măsură) în 300–500 ml apă; „urmează doza zilnică de pe etichetă”; fără protocolul de pe etichetă (încărcare 1½–3 măsuri 5–15 zile după greutate: g = kg/3; menținere ½–1½ măsuri 6–8 săptămâni) – eticheta îl are, pagina nu
- **Recenzii:** widget judge.me, jdgm, review; numere vizibile în text: 2, 2, 44, 14, 17
- **Imagini / video:** 3 imagini media; fără video
- **Variante / mărimi:** 1 variantă: 300 g / 60 porții
- **Trust / USP:** „5000 mg creatină monohidrată per porție”; „măsură de dozare inclusă”; „Fabricat pentru: Prime Sport Supplements SRL…” (adresa completă – OK); alergeni (urme lapte, ou, soia, gluten); păstrare; H3 „Ce înseamnă creatină micronizată” (definiție corectă); H3 „Cum o prepari” (3 pași); H3 „Trei forme de creatină Prime: cum alegi”; Judge.me 2 recenzii (3,0 – una de 1★ întreabă „Are certificare GMP sau NSF?”)
- **Linkuri interne către ghiduri:** 0 către ghiduri
- **Claim-uri folosite – NECONFORME (nu copiem):** – (compliant)
- **Claim-uri conforme / neutre:** claim EFSA verbatim + 3 g; disclaimer
- **Ce NU răspunde pagina:** ce este creatina; când se ia / zile fără antrenament; protocolul de pe etichetă (încărcare după greutate) – lipsă; de ce 60 porții = 60 zile doar la 5 g (la 3 g: 100 zile); dizolvare/sediment; „unitate certificată ISO și HACCP” (răspuns la recenzia de 1★); femei/vegani; combinare cu produsele Prime; micronizată vs Creapure® (criterii); surse; title fără „fără aromă”; H2 din tab repetat de 2 ori („CREATINĂ MONOHIDRATĂ MICRONIZATĂ”)

### 58. PRIME SUPPLEMENTS (noi) – referință – COLECȚIA creatina
- **URL:** https://primesupplements.ro/collections/creatina
- **Metodă:** curl (live)
- **Title:** Creatină monohidrată: pudră și plicuri | Prime Supplements (58 caractere)
- **Meta description (154 caractere):** Creatină monohidrată în trei formate: Creapure® 300 g sau 500 g, pudră micronizată fără aromă 300 g și plicuri efervescente Ready To Go de 10 g (5000 mg).
- **H1:** Creatină
- **H2:** Alte categorii; Ghiduri și sfaturi utile
- **H3:** –
- **Cuvinte (conținut principal fără header/footer/nav, aprox., include cardurile de produse):** 464
- **JSON-LD:** BreadcrumbList, CollectionPage, ContactPoint, Country, ImageObject, ItemList, ListItem, OnlineStore, Organization, Person, PostalAddress
- **Semnale text (număr de apariții):** „ce este” 1 · „cum se ia/administrare” 1 · „efecte secundare” 0 · încărcare 2 · menținere 0 · dozare după kg 0 · micronizat 3 · Creapure 2 · dizolvare 1 · păstrare 1 · femei 0 · vegan 0 · claim 3 g 0 · „crește performanța fizică” 0 · disclaimer 0 · masă musculară 1 · forță 0 · energie 1 · recuperare 0 · sigur 0 · cea mai bună/pură 0 · puritate % 0 · testat lab 0 · GMP/ISO/HACCP 0 · studii 0 · preț (lei) 38
- **FAQ vizibil:** nu
- **Tabele:** 0
- **Dozare / protocol:** banner: „5 g per porție… plicul în 200–300 ml”
- **Recenzii:** widget judge.me, jdgm, review; numere vizibile în text: 17, 2, 1
- **Imagini / video:** 10
- **Variante / mărimi:** 3 produse (Creapure®, micronizată 300 g, Ready To Go plicuri)
- **Trust / USP:** banner scurt (≈70 cuvinte) + bloc „Ghiduri și sfaturi utile” cu 3 articole (ce-este-creatina, cum-se-ia-creatina, in-cat-timp-face-efect-creatina); schema CollectionPage + ItemList + Breadcrumb
- **Linkuri interne către ghiduri:** 4 (blog)
- **Claim-uri folosite – NECONFORME (nu copiem):** –
- **Claim-uri conforme / neutre:** „pentru adulții care fac antrenamente de mare intensitate”
- **Ce NU răspunde pagina:** fără FAQ (corect – colecția rămâne scurtă); filtre „Cantitate: 300g” doar

## 5. Analiza golurilor de conținut – ce trebuie să conțină paginile A și B ca să fie mai complete, mai structurate și mai citabile decât toate cele de mai sus

Principiu: fiecare element de mai jos are o **bază permisă** – (E) fapt de pe etichetă (`label_facts.md`, fotografiile produsului, datele din magazin), (C) claim-ul autorizat redat verbatim cu condiția lui, (F) fapt verificabil/neutru (aritmetică din etichetă, definiții chimice, listarea pe creapure.com), (L) text legal obligatoriu. Elementele marcate **⚠ decizie proprietar/jurist** nu se publică fără confirmare.

### 5.1 Ce au competitorii și noi nu (și putem adăuga legal)

| Element | Cine îl are | Cum îl facem noi (bază) |
|---|---|---|
| Definiția creatinei („ce este”) | GymBeam, Vitabolic, Olimp, DY (colecție), toate ghidurile | H3 „Ce este creatina”: compus prezent natural în organism, mai ales în mușchi; se găsește și în alimente (carne, pește); produsul aduce creatină monohidrată, 5000 mg/porție (F+E). Fără „aminoacid” (nu este), fără efecte. |
| Ce este Creapure® + cum verifici | GymBeam (QS), Genius (sigiliu + nr. licență), Pro Nutrition (QS) | H3 „Ce este Creapure® și cum verifici”: marcă înregistrată de creatină monohidrată; pe tub scrie „made of Creapure®”; Prime Supplements este listat pe creapure.com ca brand partener – **cu link** https://www.creapure.com (F). Dacă eticheta A are un cod de licență/sigiliu, îl reproducem (E) – **de verificat pe eticheta spate a produsului A (netranscrisă în label_facts)**. Fără „purest creatine in the world”, fără „99,9 %” (nu avem certificatul nostru de lot), fără „Germania” dacă nu e pe etichetă. |
| Ce înseamnă „micronizată” | GymBeam (200 mesh), Vitabolic, BioTech, noi (B) | B: deja corect; adăugăm „aceeași substanță, particule mai fine, se amestecă mai ușor; poate rămâne sediment – agită și bea imediat” (F). **A: ⚠** – titlul spune „micronizată Creapure®”; GymBeam afirmă că AlzChem nu produce Creapure® micronizată. Până la confirmarea etichetei A, textele noi pentru A nu insistă pe „micronizată” (titlul/H1 nu se schimbă; sugestie de titlu în note pentru proprietar). |
| Doză + volum de lichid + pași de preparare | 15/16 competitori | A: lipsește volumul de apă → **de luat de pe eticheta A** (B are 300–500 ml). B: păstrăm cei 3 pași (E). |
| Protocolul de pe etichetă (încărcare după greutate: g/zi = kg ÷ 3, 5–15 zile; menținere ½–1½ măsuri, 6–8 săptămâni) | Weider (protocol vechi <90/>90 kg), BioTech via Tei (4 doze/zi), GymBeam (grafic saturare) | **⚠ decizie jurist:** eticheta B îl tipărește (E) – poate fi redat ca „Mod de administrare conform etichetei”, ca listă pe greutăți (60 kg → 20 g = 4 × ½ măsură; 70 kg → ~23 g; 80 kg → ~27 g; 90 kg → 30 g = 3 măsuri), urmat obligatoriu de „Efectul benefic se obține în condițiile unui consum zilnic de 3 g de creatină” și „nu depăși doza recomandată pentru consumul zilnic”. Briful legal (`legal_top50.md` §3.2) cere să NU promovăm faza de încărcare – deci se redă doar ca informație de etichetă, fără „rezultate mai rapide”, fără cronologie pe săptămâni. Varianta minimă-sigură: „Eticheta descrie o perioadă de încărcare și una de menținere; doza zilnică de 3 g este suficientă pentru efectul menționat.” |
| Zile fără antrenament / momentul zilei | Genius 400 g, Scitec, Olimp, DY, GymBeam, HyperFit | (E/F) „Se ia zilnic, conform etichetei, inclusiv în zilele fără antrenament; momentul zilei nu este o condiție a mențiunii de sănătate.” Fără „înainte de antrenament crește…”. |
| Cât ține ambalajul | Nutriland („~88 de zile”, cost/porție), Scitec („1 kg > jumătate de an”), GymBeam (doze) | (F, aritmetică din etichetă) A: 300 g = 60 de porții de 5 g (60 de zile la 5 g; 100 de zile la 3 g); 500 g = 100 de porții (100 / ~166 de zile). B: 60 de porții (60 / 100 de zile). Fără preț/cost pe porție în text (tema afișează prețul; „împarte prețul afișat la numărul de porții” e permis). |
| Pentru cine este / pentru cine nu | GymBeam, Myprotein (categorie), DY (FAQ), BioTech (pe sporturi) | (C+E) „pentru adulții care fac antrenamente de mare intensitate” + restricțiile etichetei: nu sub 18 ani, nu în sarcină/alăptare, consult medical la afecțiuni/tratament. Fără liste de sporturi cu beneficii. |
| Femei / vegani | GymBeam, DY, Myprotein (badge) | (F/E) „Doza de pe etichetă este aceeași pentru adulți, indiferent de sex; creatina nu este un hormon.” „Lista de ingrediente nu conține ingrediente de origine animală; produsul poate conține urme de lapte și ou (vezi alergeni) – nu purtăm o certificare vegană.” Fără „echilibru hormonal”, „fese mai ferme”, „beneficiază cel mai mult”. |
| Efecte secundare / retenție / rinichi | Regina Maria (articol), GymBeam (FAQ „sigură pentru tract GI”), Decathlon (contraindicații), DY blog | (E/L) Răspundem cu avertismentele etichetei + „consultă medicul dacă ai o afecțiune (de exemplu renală) sau urmezi un tratament” + „nu depăși doza”. **⚠** Fraza neutră „la începutul utilizării greutatea poate crește ușor, pentru că creatina este stocată în mușchi împreună cu apă” este o descriere de efect, nu un claim de beneficiu – de validat cu juristul; altfel se omite. Fără „sigură”, „fără efecte secundare”. |
| Păstrare după deschidere, alergeni, „Produs pentru”, unitate certificată | DY (5–30 °C, 6 luni), Scitec, Nutriland, Farmacia Tei (EAN, expirare) | (E) textul de păstrare de pe etichetă; alergeni (urme lapte, ou, soia, gluten); „Produs pentru: Prime Sport Supplements SRL, Str. Ioan Virgil Ispas nr. 17A, 555300 Cisnădie, jud. Sibiu”; „Fabricat în UE într-o unitate certificată ISO și HACCP” (linie comună din label_facts – răspunde și recenziei de 1★ de pe B). EAN în schema (B: 6421766064107; A: de luat din Shopify). Niciodată numele producătorului. |
| Comparație între formele proprii (tabel) | GymBeam (tabel 4 produse), noi (H3 text) | (E) Tabel-ca-listă (rich text fără tabele): Creapure® 300/500 g · micronizată 300 g · Ready To Go plicuri 10 g – ingredient, creatină/porție, porții, aromă/îndulcitori, măsură, formă. Fără „mai bun/mai puternic” (`legal_top50.md` §8). |
| Combinare cu alte produse din gamă | Myprotein (Impact Whey), Weider (Anabolic Evolution), GymBeam (shake proteic) | (E/F) „Pulberea fără aromă se poate adăuga în shake-ul cu Prime Whey sau cu EAA.” + atenționare unică pe piață: „Nitrox NO-STIM conține 2200 mg creatină monohidrată per porție – dacă le combini, însumează creatina ca să nu depășești doza zilnică.” Fără „absorbție mai bună cu carbohidrați”. Cofeina: nu există condiție pe etichetă → nu afirmăm nimic. |
| FAQ în schema FAQPage | GymBeam, Nutriland, HyperFit | FAQ-ul din `custom.seo_produs` dublat în JSON-LD FAQPage de temă (dacă politica temei permite) – 10–14 întrebări (lista §5.3). |
| Surse + dată de actualizare | GymBeam (7 surse), HyperFit („Actualizat 5 iulie 2026”) | (F) O linie „Surse: Regulamentul (UE) 432/2012 – mențiunea de sănătate pentru creatină; Regulamentul (UE) 2017/672; eticheta produsului, lot …” + „Informații actualizate: octombrie 2026”. |
| Linkuri către ghiduri | GymBeam (6), HyperFit (13), Farmacia Tei (ghid ingredient) | Din A și B către `/blogs/news/ce-este-creatina`, `/blogs/news/cum-se-ia-creatina`, `/blogs/news/in-cat-timp-face-efect-creatina` (există în colecție) + ghidul Creapure® și „cu ce se combină creatina” dacă există (`serp_comercial.md` §D.3). |
| Imagini | GymBeam 20–27, BioTech 45, Myprotein 40, Genius 6; noi 2–3 | Nu e în scopul textului, dar e un gol: etichetă spate lizibilă (valori + mod de administrare), măsura cu 5 g, pulberea în shaker, captura listării creapure.com (A o are). Alt-texturi descriptive (vezi §5.4). |
| Video | GymBeam (VideoObject), Olimp (YouTube), TopGuides | Sugestie proprietar: un clip de 20–30 s „cum prepari porția” → VideoObject real. Nu marcăm VideoObject fără video. |
| Claim-ul 55+ | Myprotein (categorie, FAQ) | (C) Doar dacă proprietarul vrea un paragraf dedicat, cu toate condițiile (3 g/zi + antrenament de rezistență ≥ 3×/săptămână, 65–75 % 1RM, câteva săptămâni, adulți > 55 ani) – briful legal recomandă în mod normal omiterea. |

### 5.2 Blueprint pe câmpurile temei (fără schimbarea designului)

- **descriptionHtml („Descriere”, feed + JSON-LD + căutare):** 120–180 de cuvinte, în ordinea: ce este produsul (supliment alimentar pentru adulți, pulbere, un singur ingredient) → cantitate/porții/porție (5 g = 5000 mg) → claim-ul autorizat verbatim + „Efectul benefic se obține în condițiile unui consum zilnic de 3 g de creatină” → pentru adulții care fac antrenamente de mare intensitate → fără aromă (se amestecă în apă/shake) → A: listat pe creapure.com (link) / B: micronizată, măsură inclusă → fraza-disclaimer obligatorie. Fără prețuri, fără comparații cu alte branduri.
- **custom.beneficii_cheie (listă, ≤ 255 caractere/element, 5–6 elemente):** 1) claim-ul autorizat + condiția 3 g; 2) „5 g (½ măsură) = 5000 mg creatină monohidrată; tub de 300 g = 60 de porții” (A: + 500 g = 100 de porții); 3) „Un singur ingredient: creatină monohidrată [Creapure®]; fără arome, îndulcitori sau coloranți”; 4) „Fără aromă: se amestecă în apă sau în shake-ul proteic; măsură inclusă”; 5) „Fabricat în UE într-o unitate certificată ISO și HACCP; produs pentru Prime Sport Supplements SRL, Cisnădie”; 6) A: „Prime Supplements este listat pe creapure.com ca brand Creapure®” / B: „Pulbere micronizată: particule fine, se amestecă ușor”.
- **custom.despre_produs (rich text):** H2 cu numele produsului + H3: „Ce este creatina” · „Ce este Creapure® și cum verifici” (A) / „Ce înseamnă micronizată” (B) · „Cum o iei” (porție, lichid, pași; „Mod de administrare conform etichetei” incl. ⚠ protocolul; zilnic; nu depăși doza) · „Pentru cine este și pentru cine nu” · „Cât ține un tub” · „Cu ce o combini din gama Prime” (+ atenționarea Nitrox NO-STIM) · „Păstrare și alergeni” · paragraful-disclaimer obligatoriu (textul exact din brief). Persoana a II-a, „tu”.
- **custom.ingrediente (rich text, fără tabele):** „Creatină monohidrată [micronizată] [(Creapure®)].” + „Valori per porție (5 g): creatină monohidrată 5000 mg” + alergeni (urme) + „Produs pentru: …” + „Fabricat în UE”.
- **custom.detalii_produs (listă):** denumire de pe etichetă · cantitate netă · porție · porții · creatină/porție · aromă · măsură · mod de administrare (scurt) · păstrare · atenționări (sub 18, sarcină/alăptare, afecțiuni) · alergeni · produs pentru · fabricat în UE (unitate certificată ISO și HACCP) · EAN · brand.
- **custom.seo_produs (rich text):** H2 propriu (A: „Creatină Creapure®: ce este, cum o iei și cât ține un tub”; B: „Creatină monohidrată micronizată fără aromă: cum o prepari, cât ține și pentru cine este”) → H3 „Creapure® sau creatină monohidrată obișnuită: criterii obiective” (A) / „Micronizată sau Creapure®: ce diferă în gama Prime” (B) → H3 „Cum alegi o creatină monohidrată” (răspunsul la „cea mai bună creatină”: ingredient unic, creatină per porție declarată, număr de porții, aromă/îndulcitori, măsură, listare Creapure®, etichetă completă – fără „a noastră e cea mai bună”) → H3 „Întrebări frecvente” (lista §5.3) → „Surse / actualizat”.
- **SEO title / meta (din `serp_comercial.md` §D.1):** A „Creatină monohidrată Creapure® 300 g / 500 g | Prime Supplements” (60); B „Creatină micronizată 300 g fără aromă | Prime Supplements” (55). Meta 140–155 cu „3 g”, porții, „fără aromă”, „un singur ingredient”.
- **Alt-texturi (fileUpdate):** „Creatină monohidrată Creapure® Prime Supplements, tub de 500 g, 100 de porții – față” / „… etichetă spate cu valori și mod de administrare” / „Captură creapure.com: Prime Supplements listat ca brand Creapure®”; B: „Creatină monohidrată micronizată fără aromă Prime Supplements 300 g, 60 de porții” / „… măsura de dozare, ½ măsură = 5 g”.
- **custom.short_description (≤ 300):** o propoziție cu ingredient, porție, porții, claim-ul scurt + 3 g, fără aromă.
- **custom.cantitate:** „300 g (60 de porții)” / „500 g (100 de porții)” / „300 g (60 de porții de 5 g)”.
- **shopify--discovery--product_search_boost.queries:** lista din `serp_comercial.md` §D.6 (creatina, creatina monohidrata, creatina creapure, creapure, creatina micronizata, creatina fara aroma, creatina pudra, creatina 300g, creatina 500g, creatina pura, creatine monohydrate, unflavoured, micronized…).
- **Colecția `creatina`:** descrierea rămâne ≤ 80 de cuvinte, doar `<p>` (ca acum), cu cele 3 formate + „5 g per porție” + „pentru adulții care fac antrenamente de mare intensitate”; blocul „Ghiduri” rămâne. SEO title/meta deja în șablon.
- **Schema (temă, dacă politica permite):** FAQPage din FAQ-ul seo_produs; Product.description = Descriere; gtin13 din barcode; image cu alt; BreadcrumbList există. Nu: Certification (nu avem document propriu publicabil), VideoObject fără video, AggregateRating fabricat (Judge.me real: A 5,0/17, B 3,0/2 – se afișează așa cum sunt).

### 5.3 Întrebări FAQ candidate (deduplicate din FAQ-urile competitorilor + `serp_comercial.md` §B) și baza răspunsului

| Întrebare | Sursa (cine o are) | Baza răspunsului permis |
|---|---|---|
| Ce este creatina? | DY col., GymBeam, Myprotein cat., ghiduri | F: compus natural din organism/mușchi; din alimente (carne, pește); produsul = creatină monohidrată |
| Ce este Creapure®? (A) | GymBeam, Body Line, noi | F+E: marcă înregistrată de creatină monohidrată; „made of Creapure®” pe tub; listat pe creapure.com (link) |
| Ce înseamnă creatină micronizată? E altă substanță? (B; A ⚠) | GymBeam FAQ, Vitabolic, noi | F: aceeași substanță, particule mai fine, se amestecă mai ușor |
| Câtă creatină iei pe zi? | toți | E+C: porția de pe etichetă (5 g); efectul la 3 g/zi; nu depăși doza |
| Trebuie fază de încărcare? | Nutriland FAQ, GymBeam, DY blog, HyperFit | E/C: ⚠ eticheta B descrie încărcare/menținere; 3 g/zi este condiția mențiunii; fără promisiuni de viteză |
| Când se ia: înainte/după antrenament, în zilele libere? | Genius 400 g, Scitec, GymBeam, Weider, DY, HyperFit | E/F: zilnic, conform etichetei; momentul nu e o condiție |
| Cu câtă apă și cum o prepari? Rămân particule? | Nutriland FAQ, GymBeam, noi (B) | E/F: 300–500 ml (B; A de pe etichetă), ½ măsură, agită, bea imediat; sedimentul e normal |
| Cât ține un tub de 300 g / 500 g? | Nutriland, Scitec, noi | F: 60/100 porții → 60/100 zile la 5 g; 100/166 zile la 3 g |
| Are aromă, îndulcitori, coloranți? Ce gust are? | GymBeam FAQ, Nutriland, noi | E: un singur ingredient; gust neutru |
| Conține alergeni? E potrivită pentru vegani? | Nutriland FAQ, DY FAQ, GymBeam | E: urme de lapte, ou, soia, gluten; fără ingrediente de origine animală, fără certificare vegană |
| E potrivită pentru femei? | DY FAQ, GymBeam FAQ, Myprotein | E/F: aceeași doză pentru adulți; nu e hormon; nu în sarcină/alăptare |
| Cine nu ar trebui să o ia? Are efecte secundare? | Decathlon, Regina Maria, noi | E/L: sub 18, sarcină/alăptare, afecțiuni/tratament → medic; nu depăși doza; ⚠ fraza despre apă |
| Creapure® sau creatină monohidrată obișnuită – ce diferă? (A/B) | HyperFit FAQ, GymBeam | F: ambele sunt creatină monohidrată; Creapure® = marcă + listare verificabilă; în gama Prime ambele au 5000 mg/porție – alegi după preferință/buget (fără „mai pură/mai bună”) |
| Cum verific dacă un produs Creapure® este autentic? (A) | GymBeam | F: sigiliul de pe etichetă + lista de branduri de pe creapure.com (link) |
| Pot combina creatina cu proteine / pre-workout / EAA? | Myprotein, Weider, Regina Maria | E/F: da, în shake; Nitrox NO-STIM conține 2200 mg creatină – însumează doza |
| Ce se întâmplă dacă nu mai iau creatină? / În cât timp face efect? | DY col. FAQ, Vitabolic | ⚠ nu răspundem pe produs (claim de rezultat/timp); trimitem la ghidul din blog `in-cat-timp-face-efect-creatina`, care trebuie să rămână la claim-ul autorizat |
| Cum păstrez produsul după deschidere? | DY, Nutriland FAQ | E: textul de păstrare de pe etichetă; capac închis |
| Vine cu măsură? Câte grame are ½ măsură? | GymBeam Q&A | E: da; ½ măsură = 5 g (B; A de confirmat) |
| 300 g sau 500 g – ce diferă? (A) | noi | E: doar porțiile |
| Cum aleg cea mai bună creatină monohidrată? | gym-stack, HyperFit, HighEnergy, TopGuides | F: criterii obiective (vezi §5.2 seo_produs), niciodată „a noastră e cea mai bună” |

### 5.4 Ce fac competitorii și NU copiem (lista de dispozitive neconforme văzute)

- Claim-uri de efect în afara mențiunii autorizate: masă musculară, forță, rezistență, energie/ATP „crește”, recuperare, oboseală, creier/concentrare/memorie, sarcopenie, GLP-1, fertilitate, glicemie, osteoporoză, „previne afecțiunile neurodegenerative”, „sănătatea creierului” (Genius, DY, GymBeam, BioTech, Weider, Vitabolic, Olimp, ON, Nutriland, Farmacia Tei, Body Line, ghiduri).
- Cronologii și promisiuni cuantificate: „1–2 repetări în plus”, „mușchi vizibil mai plini în 3 săptămâni”, „+1–2 kg”, „forță cu până la 20 %”, „83 % l-au găsit eficient”.
- Superlative și puritate fără dovezi proprii: „cea mai pură creatină de pe piață”, „cel mai bun supliment”, „probabil cele mai puternice capsule din lume”, „99,9 % puritate” (fără certificat de lot al brandului), „calitate farmaceutică”, „puritate garantată”, „retailerul #1”, „CEL MAI IEFTIN”.
- „Sigură”, „fără efecte secundare”, „efecte secundare pozitive”, „testate pentru siguranță”, „aprobat legal”.
- Prețuri/reduceri în title/meta/H1 („Doar 89 Lei”, „-51% REDUCERE”, „Pret: 48,50 Lei – …”), emoji în meta, Black Friday.
- Doze peste etichetă/studii: 10 g/zi (DY), „10–20 g pentru cognitiv” (GymBeam), 4 doze/zi (BioTech via Tei), pauze/ciclare fără bază (Weider, Pro Nutrition), „fără cofeină” ca regulă.
- Publicitate comparativă denigratoare („brandurile locale mici… fără certificare”), numirea competitorilor, testimoniale cu nume de sportivi fără bază, „și jucătorii FC Barcelona consumă”, AggregateRating 0/0 în schema (gym-stack), FAQ vizibil fără schema (Genius, DY, Myprotein, gym-stack) sau schema fără FAQ specific (boilerplate Nutriland).

### 5.5 Elemente de decis cu proprietarul înainte de redactare

1. **Eticheta spate a produsului A** (Creapure®): porție exactă, măsură, volum de lichid, mod de administrare, alergeni, dacă scrie „micronizată” și dacă are cod de licență/sigiliu Creapure® – `label_facts.md` conține doar fața. Până atunci, A folosește datele din magazin (3–5 g/zi, 60/100 porții) și nu adaugă afirmații noi despre micronizare sau cod.
2. **Protocolul de încărcare de pe eticheta B** (⚠): redat ca text de etichetă sau omis (varianta minimă-sigură din §5.1).
3. **Fraza neutră despre apa din mușchi** (⚠) și **claim-ul 55+** (în mod normal omis).
4. **Sugestii de titlu de produs (nu se aplică fără acord):** B „Creatină monohidrată micronizată fără aromă, 300 g” (titlul actual are „monohidrat” și cratimă); A rămâne, cu verificarea cuvântului „micronizată”.
5. **Video de preparare** (20–30 s) și **fotografii noi** (etichetă spate, măsură cu 5 g) – singurele elemente ale blueprint-ului care nu sunt text.

## 6. Fișiere

- Acest raport: `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/competitors.md`
- Pagini descărcate: `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/serp_pages/` (crawl 1, `fetch_log.txt`) și `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/comp/` (crawl 2, `fetch_log.txt`, `fetch_log_retry.txt`)
- Parser și rezultate: `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/parse_pages.py`, `parsed_serp.json`, `parsed_serp.txt`, `parsed_comp.json`, `parsed_comp.txt`; text lizibil: `dump_text.py`, `dump_B.txt` … `dump_H.txt`; generator: `gen_competitors.py`, `teardown_part.md`, `head_part.md`, `tail_part.md`
- Cercetarea SERP anterioară (poziții, întrebări, variante de cuvinte-cheie): `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/serp_comercial.md`
- Fapte de etichetă (autoritative): `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/top50/label_facts.md`; brief legal: `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/email/brief_legal.md`, `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/top50/legal_top50.md`
