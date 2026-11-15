# Pagina de produs „vizuală” – cum o face Genius Nutrition și cum o facem noi (15.11.2026)

**Nimic nu a fost modificat în magazinul nostru** (temă, produse, aplicații). Pe site-ul Genius doar citire, prin browserul
aplicației: 2 pagini de produs deschise și ~12 cereri publice (`.js`, `/products.json`, 3 pagini de colecție), la câteva
secunde distanță. Cererile din linia de comandă au primit 429 (blocare anti-bot), de aceea am folosit browserul.

Ce s-a verificat la ei: **31 de produse** – top 20 cele mai vândute (colecția sortată „best-selling”) + 11 din alte colecții
(vitamine, arzătoare, gainer, accesorii, superalimente, omega). Am folosit și cele două exemple trimise de Marius
(ISOLATE-X5 și CREA-F7).

Fișierele livrate (toate în `pagina-produs-vizuala/`):

| Fișier | Ce e |
|---|---|
| `prototip-recovery-bcaa.html` | prototipul (se deschide cu dublu-click; merge pe desktop și pe telefon) |
| `liquid/sections/prime-pagina-vizuala.liquid` | secțiunea pentru temă (NU e urcată) |
| `liquid/assets/prime-pagina-vizuala.css` | CSS-ul secțiunii, un singur fișier pentru tot catalogul |
| `liquid/METAFIELD-DEFINITII.md` | definiția metafield-ului + scrierea în masă (nimic rulat) |
| `date/recovery-bcaa-500g.json` + `.eticheta.txt` | datele produsului-pilot și eticheta din care vin |
| `scripts/valideaza-pagina-vizuala.mjs` | verificarea dinainte de publicare |
| `mentiuni-autorizate.json` | lista mențiunilor de sănătate permise (Reg. 432/2012) |
| `PROMPT-GENERARE.md` | promptul reutilizabil pentru fiecare produs |

---

## 1. Pe scurt

- **La ei nu e o aplicație și nici o secțiune de temă.** E HTML + CSS generat (aproape sigur cu AI) și lipit **în descrierea
  fiecărui produs** (`body_html`), cu `<style>` inline de 9–16 KB. Fiecare produs are propriul prefix de clase, propria culoare și
  propria copie a CSS-ului. 187 din 200 de produse au `<style>` în descriere; 93 au deja șablonul nou („-landing”).
- **Arată bine, dar tehnic e fragil:** JSON-LD-ul Product e **invalid** (Google nu vede prețul, stocul și stelele din schema
  lor), pagina are **3 de H1**, conținutul e ascuns în al doilea tab („Despre produs”), textul e static (nu se schimbă cu
  aroma), 18 din 20 de pagini sunt fără diacritice, iar una e în engleză. Au și multe afirmații de sănătate neautorizate.
- **Pentru noi recomand varianta B:** o singură secțiune Liquid în tema Impact, alimentată dintr-un metafield JSON pe produs.
  Designul e unul singur, în culorile și fonturile Prime. Pentru fiecare produs se schimbă doar datele, generate cu AI
  **numai din etichetă**, verificate automat și apoi aprobate.
- **Ce avem deja ne ajută mult:** metafield-urile `custom.beneficii_cheie / despre_produs / ingrediente / detalii_produs`
  (scrise în octombrie pentru tot catalogul) conțin deja datele de pe etichetă. Recenziile (Judge.me), „Merge perfect cu”,
  „În stoc” și estimarea livrării sunt deja pe pagină. Lipsește doar partea vizuală.

---

## 2. Cum e făcută pagina la Genius Nutrition (cu dovezi)

### 2.1 Tema și locul conținutului
- `Shopify.theme` pe pagina live: `{"name":"Copy of Pursuit(MHT-dev) TEST METAFIELD","role":"main","schema_name":"Pursuit","schema_version":"1.0.7","theme_store_id":1654}`.
  Tema publicată e o copie botezată „TEST METAFIELD”: au încercat varianta cu metafield-uri, dar conținutul nou a rămas în descriere.
- Secțiunile paginii: `template--21249156088147__main` (produsul) + recomandări + 2 secțiuni custom. **Nu există o secțiune
  dedicată**: conținutul vizual e în `div#tab2.tab-pane > div.rte > section.bcaax5-landing`, adică tab-ul „Despre produs”,
  care afișează `product.description`.
- Dovada că e în descriere: `GET /products/bcaa-x5-360g-26serv.js` → `description` are 29.118 caractere și începe cu
  `<style>\n.bcaax5-landing{\n  --bg:#ffffff;\n  --bg-soft:#fffdf3; … --accent:#d7ad00; …`.
- **Nu e page builder:** în pagină nu e niciun script PageFly, GemPages, Shogun sau Replo. Aplicațiile găsite: Stamped.io
  (recenzii), Tidio (chat), PushOwl, GoAffPro (afiliați), Seal Subscriptions, Hextom (bară promo), Wishlist Hero, Appikon
  (back in stock), GDPR cookie, TikTok pixel, Instafeed.
- Celelalte tab-uri: „Beneficii cheie”, „Ingrediente”, „Detalii produs” sunt metafield-uri rich text
  (`div.metafield-rich_text_field`), aceeași idee ca la noi. „Valori nutritionale” (tab3) are **387 KB**: 18 tabele
  (câte unul pe aromă), 4 imagini base64 și CSS **neizolat** (`details{…}`, `summary::before{content:"+"}`) care se aplică pe
  toată pagina.

### 2.2 Cum izolează CSS-ul și cum arată pe mobil
- Fiecare produs are prefixul lui: `bcaax5-`, `isolatex5-`, `craf7-`, `wheyx5-`, `eaaf7-`, `glut`, `iwy2` etc. CSS-ul
  începe cu `.bcaax5-landing{ …variabile…; isolation:isolate; container-type:inline-size }`, apoi
  `.bcaax5-landing *{box-sizing:border-box}` și un reset `.bcaax5-landing :is(h1,h2,h3,p,ul,figure){margin:0;padding:0}`.
- Fonturi: niciunul propriu, doar `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif` (arată diferit pe
  Windows față de iPhone).
- Mobil: `@media(max-width:1100px)`, `989px` (pragul temei Pursuit) și `680px`; doar 3 din 16 produse folosesc container queries.
- **Culoarea se schimbă de la produs la produs**: galben `#d7ad00` (BCAA-X5), roz `#C41C7E` (ISOLATE-X5, iBurn, iWhey Isolate),
  gri-albastru `#607E91` (CREA-F7), verde mentă `#4CDD9E` (WHEY-X5), verde `#22c55e` (Glutamine), turcoaz `#00b4cc` (HYDRA-X5),
  roșu `#D71920` (MASS-G7), albastru `#1e7bd6` (batoane) etc. Nu au o identitate unitară.

### 2.3 Randat pe server sau injectat cu JS?
Pe server: HTML-ul brut al paginii (`fetch(location.pathname)`) conține `class="bcaax5-landing"` de 2 ori (tab desktop +
acordeon mobil), deci Google îl vede fără JS. Dar textul e **duplicat**: fraza „Clear doses for every main active ingredient”
apare de **12 ori** în HTML-ul brut (tab, acordeon, JSON-LD, JSON-ul aplicației de wishlist etc.). Pagina are 1,1–1,3 MB de HTML.

### 2.4 Se schimbă textul cu aroma?
**Nu.** Descrierea e un singur câmp pe produs. Pe BCAA-X5, cu varianta „Pepene” selectată (poza principală spune „aroma de
pepene”), descrierea arată poza `BCAA-X5_360g_26serv_Genius_Nutrition_Pineapple.png` și titlul „Formula per serving -
Pineapple”. Schema JSON-LD folosește poza `…_Watermelon.png`. Același tipar apare la top 20: o singură poză de aromă în
descriere (Nectarine la CREA-F7, Raspberry-Lime la EAA-F7, Watermelon la Glutamine, Pepene la WARCRY ULTRA, Chocolate la iWhey),
deși produsele au 2–11 arome.

### 2.5 JSON-LD, tabel nutrițional, FAQ
- `Organization` – valid.
- `Product` (cu `Offer` și `AggregateRating`) – **JSON invalid**: `Bad control character in string literal … position 343`.
  Cauza: șablonul lor pune descrierea întreagă (cu `<style>` și rânduri noi) în `"description": "&lt;style&gt;\n.bcaax5-landing{…`
  fără filtrul `json`. Verificat pe BCAA-X5 și ISOLATE-X5. Cum vine din șablon, e foarte probabil pe toate produsele cu
  descriere pe mai multe rânduri. **Google ignoră tot blocul**, deci fără stele și preț din schema lor (Stamped.io afișează
  „96 Recenzii” doar vizual).
- Tabel nutrițional: în tab-ul separat (imagini + tabele), nu în descrierea vizuală.
- FAQ: în 7 din top 20 (secțiune de text, fără `FAQPage`).

### 2.6 Partea de sus a paginii
- Stele + număr: badge Stamped.io (`span.stamped-product-reviews-badge` → „96 Recenzii”).
- „In stoc si gata de livrare” / „Stoc epuizat” / text de precomandă: texte din temă, după stocul variantei.
- „Adauga in cos” + „Cumpara acum”: formularul temei + butonul dinamic Shopify.
- „Se potriveste bine cu”: `div.complementary-products` cu `data-url="/recommendations/products?section_id=…&product_id=…"`,
  adică recomandările Shopify (intenția „complementary”, setată din aplicația Search & Discovery).

### 2.7 Cum fac aceste pagini (concluzia din 31 de produse)
Sunt **două generații**. Datele aproximative vin din data urcării pozei din descriere (`?v=` din URL):

| Generația | Produse (exemple) | Cum arată |
|---|---|---|
| **2024 – începutul lui 2025** | Creatine Monohydrate (`gn-creatine-v2`, 08.2024), iDROPS (`idrops-new`), WARCRY PWO (`wcp-new`), Omega-3, Creapure (`creapure-new`), Sirop zero | 400–650 de cuvinte, tabel, uneori FAQ, unele cu diacritice |
| **2026, „landing”** | CREA-F7 (03.2026), WHEY-X5 (28.03), iWhey Isolate (29.03), ISOLATE-X5 (31.03), CREA-X5 (23.04), BCAA-X5 (05.10.2026) | 760–2.000 de cuvinte, același schelet: badge → H1 → intro cu valori colorate → pastile → 4 cifre mari → card cu poza + 2 mini-carduri → 2 carduri („Complete formula” / „Ce face X diferit”) → grilă de roluri pe ingrediente cu coduri (BCAA, GLN, CM…) → doze pe porție → arome → „pentru cine” → mod de folosire → final |

Top 20 cele mai vândute (ordinea de pe `/collections/all?sort_by=best-selling`, 15.11.2026):

| # | Produs | KB | Prefix | Culoare | Cuvinte | Diacritice | Poza din descriere | Afirmații riscante găsite |
|---|---|---|---|---|---|---|---|---|
| 1 | Creatine Monohydrate 400 g | 28 | gn-creatine-v2 | – | 639 | nu | 08.2024 | – |
| 2 | WHEY-X5 900 g | 26 | wheyx5 | #4CDD9E | 1092 | nu | 03.2026 | – |
| 3 | WHEY-X5 2000 g | 26 | wheyx5 | #4CDD9E | 1092 | nu | 03.2026 | – |
| 4 | CREA-F7 | 26 | craf7 | #607E91 | 1166 | nu | 03.2026 (Nectarine) | revoluționar, superior, absorbție rapidă, clinic |
| 5 | ISOLATE-X5 2000 g | 32 | isolatex5 | #C41C7E | 1492 | nu | 03.2026 (lifestyle) | absorbție rapidă, recuperare rapidă, superior |
| 6 | iDROPS 30 ml | 19 | idrops-new | – | 420 | da | 08.2024 | – |
| 7 | iWHEY 2000 g | 27 | iwy2 | #0ea5e9 | 1272 | nu | 07.2025 (Chocolate) | catabolism, hormoni, anabolic, imunitate, previne, garantat |
| 8 | WARCRY 400 g | 36 | wcp | #f2b41b | 778 | nu | 09.2025 | – |
| 9 | WHEY-X5 baton | 23 | wxbar | #7397C4 | 905 | nu | 05.2025 | – |
| 10 | BCAA-X5 | 28 | bcaax5 | #d7ad00 | 760 | nu (engleză) | 10.2026 (Pineapple) | – (dar „¹4”) |
| 11 | WARCRY PWO 330 ml | 24 | wcp-new | – | 441 | nu | 08.2024 | – |
| 12 | Multilayer bar | 27 | mlb | #1e7bd6 | 1581 | nu | 06.2025 | – |
| 13 | iWHEY 900 g | 27 | iwy | #0ea5e9 | 1252 | nu | 07.2025 | ca la iWHEY 2000 g |
| 14 | iWHEY Isolate 900 g | 29 | iwhey | #C41C7E | 1420 | nu | 03.2026 | superior, absorbție rapidă, hormoni |
| 15 | Ashwagandha | 22 | ash | #667F70 | 1166 | nu | 03.2026 | somn, stres, hormoni, testosteron, imunitate, clinic |
| 16 | Sirop zero calorii | 21 | syrup-zero | – | 525 | nu | 03.2025 | – |
| 17 | COLLAGEN-X5 | 24 | colx5 | #db2777 | 1209 | nu | 09.2025 | articulații, superior, absorbție rapidă, clinic |
| 18 | Omega-3 90 caps | 21 | omega3 | – | 627 | nu | 08.2024 | – |
| 19 | Creapure | 23 | creapure-new | – | 496 | nu | 05.2026 | – |
| 20 | CREA-X5 Liposomal | 28 | creax5 | #c41c7e | 1292 | nu | 04.2026 | superior, stres, clinic |

Toate 20 au `<style>` inline în descriere și câte un H1 în descriere. Alte 11 verificate (EAA-F7, Glutamine, HYDRA-X5, WARCRY ULTRA, Magnesium
Bisglycinate, D3+K2, iBurn, MASS-G7, Super Greens, Omega-3T, centura GG-1) arată la fel. iBurn are „slăbire/arde”, Super Greens
„detoxifiere avansată”, EAA-F7 „anabolic/catabolism/previne/detox”, Glutamine „catabolism/garantat/arde”.

Dovezi că sunt generate cu AI, pagină cu pagină, și lipite manual în editorul HTML al descrierii:
1. Același schelet și aceleași nume de clase pe toate, schimbat doar prefixul (`bcaax5-icon-card`, `craf7-…`, `eaaf7-…`).
2. Rămășițe de la alt produs: în CSS-ul BCAA-X5 scrie `/* HERO IMAGE FIX Keep the CREA-F7 visual frame … */`, iar MASS-G7
   folosește prefixul `iwhey` (copiat de la iWhey).
3. BCAA-X5 a ieșit integral în engleză (85 de cuvinte englezești detectate, titluri „What makes BCAA-X5® different”,
   „Directions”), deși restul site-ului e în română.
4. Bifa „¹4” / „¹3”: în CSS scrie literal `content:"¹4"` (lista) și `content:"¹3"` (punctele cheie). La CREA-F7 apar corect
   `content:"✔"` și `content:"✓"`. Codurile CSS `\2714` (✔) și `\2713` (✓) s-au stricat la copiere: `\27` a devenit „¹”.
5. 18 din 20 de pagini sunt fără diacritice și au adjective tipice („premium”, „formula revolutionara”, „absorbtie superioara”).

---

## 3. Greșelile lor (de evitat la noi)

| # | Greșeala | Unde (exemple) | Efect |
|---|---|---|---|
| 1 | JSON-LD Product invalid (descrierea brută în schema) | BCAA-X5, ISOLATE-X5 (din șablon) | Google ignoră preț, stoc și stele din schemă |
| 2 | 3 de H1 pe pagină (titlul temei + H1 din descriere × 2) | toate cele 31 | semnal SEO confuz |
| 3 | Conținutul vizual stă în tab-ul 2, închis implicit (tab activ: „Beneficii cheie”); pe mobil, acordeoane închise | toate | cei mai mulți nu-l văd |
| 4 | Același text ~6–12 copii în HTML; tab-ul de valori nutriționale de 387 KB; 1,1–1,3 MB HTML | BCAA-X5, ISOLATE-X5 | pagină grea, mai ales pe telefon |
| 5 | Textul și poza nu urmează aroma (Pineapple afișat la Pepene) | BCAA-X5 + majoritatea | confuzie, aspect neîngrijit |
| 6 | Text în engleză pe site românesc | BCAA-X5 (integral), iBurn, Magnesium, D3+K2 (parțial) | încredere și SEO pe română |
| 7 | Fără diacritice | 18 din top 20 | text neprofesionist, potrivire mai slabă la căutări |
| 8 | Caractere stricate „¹4”, „¹3” | BCAA-X5 | se vede imediat |
| 9 | O culoare și un CSS diferit pe fiecare produs (9–16 KB fiecare) | toate | fără identitate de brand; orice schimbare de design = sute de editări manuale |
| 10 | CSS neizolat în tab-ul de nutriție (`details{}`, `summary::before`) | BCAA-X5 | poate strica alte elemente din pagină |
| 11 | **Afirmații neautorizate** (Reg. 1924/2006): „previne catabolismul”, „anabolic”, „hormoni”, „imunitate” pe whey, „detoxifiere avansata” (Super Greens), „arde”, „slăbire” (iBurn), „somn/stres/testosteron” (Ashwagandha), „articulații” (Collagen), „absorbție rapidă/superioară”, „recuperare rapidă”, „clinic” | iWhey, iWhey 900, EAA-F7, Glutamine, iBurn, Ashwagandha, Collagen, CREA-F7, ISOLATE-X5 | risc ANPC/DSV și la Google Merchant |
| 12 | Tema live se numește „Copy of … TEST METAFIELD” | publicată | lucru neterminat / greu de întreținut |

---

## 4. Ce avem noi acum (primesupplements.ro, citit pe 15.11)

- **Tema:** Impact 6.7.1 (theme_store 1190), publicată ca „Prime – fără retur la vedere (15.11)”. 213 produse în `/products.json`.
- **Stil:** fundal `#f0f0f0`, text `#1a1a1a`, accent roșu `#E91D23` (rgb 233 29 35), butoane-pastilă cu raza 60 px, carduri
  rotunjite 12 / 24 px. Titluri **Bebas Neue**, text **Poppins** (găzduite la noi, `snippets/fontify-fonts.liquid`), bază Barlow.
- **Pagina de produs** (`templates/product.json`): blocuri titlu → recenzii Judge.me („Nicio recenzie” la Recovery BCAA;
  19 recenzii, nota 5,0 la Creapure) → preț → „Produs în Uniunea Europeană” → stoc („În stoc”) → arome → cantitate →
  „Adaugă în coș” → estimarea livrării („Ajunge marți, 17 nov. – miercuri, 18 nov.”) → **„Merge perfect cu”** (produse complementare, deja
  existente) → descriere → apoi secțiunea **tabs** cu cele 4 metafield-uri `custom.*`. Nu avem „Cumpără acum” (butonul dinamic
  e oprit din temă; se poate porni doar cu aprobarea lui Marius, e schimbare de design).
- **Descrierea** (`body_html`) e text simplu, fără `<style>`, cu H2 „Pe scurt”, „Ingrediente”, „Detalii produs”, ghid și FAQ.
  Datele de etichetă sunt deja transcrise (ex. Recovery BCAA: 7100 mg BCAA, 4733,4 / 1183,3 / 1183,3 mg, B6 1,5 mg = 106% VNR).
- **JSON-LD:** `Organization` + `Product` (cu `Offer`; `AggregateRating` când există recenzii) + `BreadcrumbList`, **valid**.
  Un singur H1. Aici suntem deja peste ei.

---

## 5. Variantele pentru noi

| | **A. HTML + CSS în descriere** (ca Genius) | **B. Secțiune Liquid + metafield JSON** (recomandat) | **C. Page builder** (PageFly, GemPages…) |
|---|---|---|---|
| Efort inițial | mic (o pagină) | mediu: secțiune + CSS + definiție, ~1 zi | mic–mediu + învățarea aplicației |
| Pe sute de produse | greu: fiecare produs are HTML propriu, ~25–30 KB | ușor: același design, doar date (~3–4 KB JSON pe produs), scrise în masă prin API | greu: pagini făcute de mână sau șabloane plătite; datele nu vin din etichetă |
| Mentenanță | o schimbare de design = editarea tuturor descrierilor | o schimbare = un fișier CSS / Liquid | depinzi de aplicație; dezinstalarea lasă cod rămas |
| Viteză | CSS dublat pe fiecare produs, HTML mare | CSS ~6 KB, o dată pentru tot site-ul (cache); HTML mic | JS și CSS în plus de la aplicație; de regulă cea mai lentă |
| SEO | riscul de H1 dublu, text dublat în feed-uri, descriere „murdară” în Google Shopping / Merchant feed | HTML curat, randat pe server, un singur H1, descrierea rămâne text pentru feed-uri | randat de aplicație; uneori bun, dar cu cod greu |
| Risc pentru temă | CSS-ul scapă ușor (ca `details{}` la ei) | zero pe produsele fără metafield (secțiunea nu apare); totul sub `.ppv` | mediu; aplicațiile modifică șabloanele |
| La schimbarea temei | merge, dar arată „străin” în noua temă | copiezi 2 fișiere în tema nouă; datele rămân în metafield | rămâne legat de aplicație |
| Cost | 0 | 0 | 20–60 $/lună |

**Recomandare: B.** Motivul principal: datele (adică conținutul) sunt separate de design. Le generăm din etichetă, le validăm
automat și le scriem în masă. Designul rămâne unul singur, în stilul Prime, și se schimbă dintr-un loc. Mai e și un motiv
practic: catalogul a trecut deja prin metafield-uri în octombrie (`custom.beneficii_cheie` etc.), deci fluxul e cunoscut.

De ce un singur metafield JSON (`prime.pagina_vizuala`) și nu metaobjects: se scrie dintr-o bucată, se poate reveni din
fișierul din repo, iar noi edităm în repo, nu în admin. Se poate trece pe metaobjects mai târziu fără să schimbăm designul.

---

## 6. Prototipul (Recovery BCAA 4:1:1 – 500 g)

`pagina-produs-vizuala/prototip-recovery-bcaa.html` – dublu-click, se deschide în orice browser. Conține:
1. **Partea de sus**, ca pe pagina noastră actuală: titlu, stele Judge.me („Fii primul care lasă o recenzie”), preț, stoc pe
   aromă (Pear e indisponibil și scrie asta), arome, „Adaugă în coș” + „Cumpără acum” (doar ca propunere), „Merge perfect cu”.
2. **Secțiunea nouă**: badge negru („BCAA 4:1:1 · 7100 mg BCAA · Vitamina B6 · 62 de porții”), titlu Bebas Neue, intro cu
   valorile în roșu, etichete, poza variantei în card cu 2 mini-carduri (Porție / Pe zi), banda neagră cu 4 cifre
   (7100 mg · 4733 mg · 1,5 mg · 62), cardul „Porția de 8 g, din tabelul nutrițional” + cardul „Ce are Recovery BCAA”,
   grila „Ce face fiecare ingredient” (LEU, ILE, VAL, B6, 0 g, ARO), aromele (cea selectată e evidențiată) și modul de folosire.
3. **Aroma contează:** schimbi Cherry → Pear și se schimbă poza de sus, poza din secțiune și aroma evidențiată.
4. Datele lipsă se văd: la Cherry, ingredientele de aromă și colorantul nu sunt transcrise în magazin, deci apare marcajul
   galben „DE VERIFICAT”. Validatorul blochează publicarea până se completează de pe tub.

Verificat în browserul aplicației: desktop 800 px și telefon 375 px, fără scroll orizontal. Pe telefon cifrele se așază 2 × 2
și cardurile unul sub altul. Schimbarea aromei funcționează.

Mențiuni de sănătate folosite: **doar la vitamina B6** (1,5 mg = 106% VNR, deci peste pragul de 15%): „Vitamina B6 contribuie
la metabolismul normal al proteinelor și al glicogenului și la reducerea oboselii și extenuării.” (Reg. 432/2012). Despre BCAA
și leucină scrie doar ce sunt și cât conțin: EFSA nu a autorizat nicio mențiune pentru ele.

---

## 7. Fluxul de generare cu AI pentru tot catalogul

1. **Datele de intrare** pe produs: metafield-urile existente `custom.ingrediente` + `custom.detalii_produs` (transcrierea
   etichetei din octombrie) + lista variantelor, salvate ca `date/<handle>.eticheta.txt`. Unde transcrierea e incompletă
   (ca la Cherry), o poză clară a etichetei din `D:\Prime Supplements`.
2. **Generarea** cu `PROMPT-GENERARE.md` → `date/<handle>.json`. Regulile: doar din etichetă, „DE VERIFICAT” unde lipsește,
   română cu diacritice, doar mențiunile din `mentiuni-autorizate.json`, fără texte de la concurenți.
3. **Validarea automată** (`node pagina-produs-vizuala/scripts/valideaza-pagina-vizuala.mjs pagina-produs-vizuala/date`):
   - structura (exact 4 cifre, 3–9 carduri, limite de lungime, `[[ ]]` pereche);
   - **fiecare cifră** din badge, cifre, tabel și intro trebuie să existe în `<handle>.eticheta.txt`;
   - „DE VERIFICAT” rămas = blocant;
   - cuvinte interzise (previne, catabolism, anabolic, hormoni, detox, slăbire, „absorbție rapidă” etc.);
   - orice „contribuie la …” trebuie să fie identic cu o mențiune autorizată;
   - efecte atribuite ingredientelor fără mențiune (ex. „Leucina stimulează…”) = eroare;
   - text fără diacritice, caractere stricate („¹4”), avertisment pentru engleză.
   Testat: fișierul pilot trece. O copie stricată intenționat (cifră 7500 inventată, „stimulează sinteza și previne
   catabolismul”, frază în engleză) e prinsă cu 4 erori.
4. **Verificarea umană:** Marius (sau Adelina) se uită la 3 produse-pilot pe tema duplicat, pe desktop și pe telefon.
5. **Scrierea în masă** prin Admin API (`metafieldsSet`, câte 25 pe apel), cu citire înapoi și comparare, log în
   `applied/logs/pagina-vizuala/`. Detalii: `liquid/METAFIELD-DEFINITII.md`. Importul CSV e posibil, dar JSON-ul în celulă
   CSV se strică ușor, deci recomand API-ul pe care îl folosim deja.

---

## 8. Planul, pas cu pas (nimic pornit; fiecare pas cu „da” de la Marius)

| Pas | Ce | Cine | Efort |
|---|---|---|---|
| 0 | Marius aprobă designul din prototip (sau cere schimbări) | Marius | 15 min |
| 1 | Duplicat nepublicat al temei live; urcăm `prime-pagina-vizuala.liquid` + CSS; o punem în `product.json` între produs și tab-uri | Claude | 1–2 h |
| 2 | Definiția metafield-ului `prime.pagina_vizuala` (json) | Claude, cu OK | 10 min |
| 3 | Pilot pe 3 produse (Recovery BCAA, Creatină Creapure, Prime Whey 2 kg): eticheta completată, JSON generat, validat, scris, verificat pe duplicat (desktop + mobil, schimbarea aromei, Lighthouse, Rich Results Test) | Claude + Marius | 2–3 h |
| 4 | Restul suplimentelor (~150; fără haine și accesorii la început), pe loturi de 20–25: generare + validare + eventual poze de etichetă | Claude | ~10 min/produs ≈ 20–25 h, pe mai multe zile |
| 5 | Scrierea în masă + citire înapoi | Claude | 1 h |
| 6 | Publicarea temei duplicat (doar după OK final) | Marius / Claude cu OK | 15 min |

Atenție la calendar: `DE-FACUT.md` (pct. 13) mută lucrările mari de SEO după 1.12.2026, iar pe 25–27.11 e Late Black Friday.
Recomand: pașii 0–3 acum (nu ating site-ul live), pașii 4–6 după 1.12.

De verificat pe tema duplicat (scris și în cod): numele exact al evenimentului de schimbare a variantei în Impact 6.7.1
(secțiunea ascultă `variant:change`; dacă nu vine, rămâne poza randată pe server). Tot acolo verificăm să nu dublăm textul:
secțiunea nouă **nu** repetă descrierea și tab-urile, doar le rezumă vizual.

---

## 9. Ce NU am făcut
- Nimic urcat în temă, nicio definiție de metafield creată, niciun produs modificat.
- Nu am copiat texte, poze sau cod de la Genius. Prototipul și CSS-ul sunt scrise de la zero, în stilul Prime.
  De la ei am preluat doar ideea de structură (badge, cifre mari, carduri pe ingrediente).
