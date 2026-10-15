# SERP comercial – creatină (Google România, proxy) · 15.10.2026

Magazin: primesupplements.ro · Pagini-țintă: PRODUS A `creatina-creapure` (Creatină monohidrat micronizată Creapure®, 300 g / 500 g), PRODUS B `creatina-monohidrat-micronized-300g-fara-aroma` (300 g, fără aromă), COLECȚIA `creatina`.

## 0. Metodă și limite (citește înainte de a folosi cifrele)

- Instrument: `WebSearch` mode `extended`. Instrumentul este geolocalizat US; pentru interogările fără diacritice („creatina”, „creatina monohidrata”, „creatina creapure”, „creatina 300g”, „creatina 500g”, „creatina monohidrata pura”, „creatina 100% monohidrat”, cele două „vs”) prima rulare a întors SERP-uri spaniole/braziliene/US. Pentru fiecare dintre acestea am rulat o a doua (uneori a treia) formulare în română (diacritice, „românia”, „lei”) – tabelele de mai jos arată rezultatele RO, iar rularea brută este notată în câmpul „Variante rulate”. Concluzie: pozițiile sunt un **proxy** al Google RO, nu un rank-tracker; folosește-le pentru *cine* rankează și *cu ce tip de pagină/titlu*, nu pentru poziții exacte.
- Google HTML prin `curl` (încercat în sesiunea anterioară: `raw/google_*.html`, `live/google/test.html`) nu returnează rezultate (pagină JS) – nu există SERP Google brut salvat.
- „People also ask”: WebSearch nu expune caseta PAA. Întrebările din §B provin din (1) **Google Suggest RO real** (`hl=ro&gl=ro`, salvat în `creatina/suggest_raw.txt`, sesiunea anterioară), (2) FAQ-urile marcate schema.org `FAQPage/QAPage` pe paginile competitorilor (GymBeam, HyperFit, Myprotein), (3) titlurile paginilor care rankează pe întrebări, (4) firele de forum (Softpedia, ROmedic, TPU, Kudika). Sunt deduplicate și scrise în română corectă (ș/ț cu virgulă).
- Paginile competitorilor au fost descărcate (`creatina/serp_pages/*.html`, log în `fetch_log.txt`) pentru title/meta/H1/H2/schema; Decathlon, Dr.Max, eMAG, Compari și Pro Nutrition blochează curl (Cloudflare/captcha) – pentru ele folosesc titlurile din SERP.
- Prețurile apar în snippet-uri doar ca **context competitiv**; nu se preiau în niciun text de pe site.

## 1. Rezumat executiv

1. **primesupplements.ro este practic absent din top 10** pe toate cele 16 interogări comerciale. Singura apariție comercială: #10 la „creatina creapure 300g lei” cu `/products/creatina-creapure`, indexat încă cu **titlul vechi** („Creatina Creapure - Supliment pentru Performanță Fizică”) – Google nu a re-crawl-uit titlul nou; apariții informaționale: #5 la „câtă creatină pe zi” (`/blogs/news/cum-se-ia-creatina`), #7–#8 la „micronizată sau monohidrată – diferența” (2 articole de blog). Indirect: creapure.com/en/buy-here listează Prime Supplements ca brand partener Creapure® pentru România (fapt confirmat în `label_facts.md`, poate fi menționat și linkat).
2. **Cine domină** (frecvență pe cele 16 interogări de bază, tabel §A): Farmacia Tei (+Bebe Tei) 14 interogări / 24 apariții, Dr.Max 11, GymBeam 9, Decathlon 7, Nutriland 7, gym-stack 7, Genius Nutrition 6, Regina Maria 6 (medical), DY Nutrition 5, Myprotein 5, HighEnergy 5, eMAG 4, Pro Nutrition 4, Allnutrition 3, Altex 3, Compari 2, Vitabolic 2 (+ prin retaileri), HyperFit 2, Optimum Nutrition RO 2, Scitec 1 (+ ShopBuilder 1), Olimp 1. Dintre competitorii numiți de proprietar: **Genius Nutrition** este cel mai vizibil (pagini de produs „Creapure® 300g” și „Creatine Monohydrate 400g” + colecția), **DY Nutrition** rankează cu produsul „Creatină Monohidrată” 300 g, **Vitabolic** cu „100% Micronized Creatine Monohydrate 300g” și prin Farmacia Tei/Decathlon/Nutriland, **Pro Nutrition** mai ales prin retaileri (Dr.Max, Altex, Farmacia Tei) și cu blogul; Weider, Olimp, BioTechUSA apar în principal **prin retaileri** (Dr.Max, Farmacia Tei, Decathlon), nu cu site-urile proprii.
3. **Tipul de pagină care câștigă** diferă pe intenție: termenii generici („creatina”, „creatină”, „cea mai bună creatină”) sunt **informaționali** (articole, Wikipedia, clinici) – nicio pagină de produs nu rankează; termenii cu atribut (monohidrată / micronizată / fără aromă / Creapure / 300g / 500g / pură / 100%) sunt **tranzacționali** – rankează pagini de produs single-ingredient cu titlu-șablon `Creatină monohidrată [micronizată] [fără aromă], 300 g, Brand` și categorii/căutări interne ale farmaciilor online.
4. **Șabloane de titlu care rankează**: (a) farmacii: „Creatina monohidrata fara aroma, 300 g, OstroVit” (fără diacritice, gramaj cu spațiu, brand la final); (b) branduri: „Creatină monohidrată 100% Creapure® - GymBeam | GymBeam.ro”, „Creapure® 300g | Genius Nutrition®”, „100% Creatine Monohydrate (300 gr.) - Scitec”; (c) Decathlon: „Creatină monohidrat Creapure® gust neutru 300g”. Elemente cu frecvență mare în titluri: gramajul (în ~75 % din titlurile de produs), „monohidrat(ă)” (~80 %), „Creapure®” cu ® (6/10 pe interogările Creapure), „micronizată” (7/10 pe „micronizata”), „fără aromă / gust neutru” (9/9 pe „fara aroma”), „100 %” (5/9 pe „pura”/„100 %”), anul „2026” pe ghiduri, „pret/ieftin” doar pe comparatoare.
5. **Nișe libere în română**: „Creapure® vs creatină monohidrat obișnuită” (top 10 = NCBI + bloguri EN, zero RO), „este Creapure® micronizată?” (GymBeam afirmă pe pagina ON că AlzChem nu face Creapure micronizată – de verificat cu eticheta produsului A înainte de a folosi „micronizată” în textele despre Creapure®), „cum recunoști Creapure® original (cod QS)”, „câte porții are 300 g / 500 g”, „creatină la plic / efervescentă” (Cosmo Pharm o revendică drept premieră – colecția noastră are Ready-To-Go 10 g).

## 2. Rezultate pe interogare

### 1. „creatina”

**Variante rulate:** Rulare brută (fără diacritice): SERP-ul returnat a fost spaniol/US (mdsaude.com, merckmanuals.com, walmart.com, nutriumpfg.com, en.wikipedia Creatinase, amway.com, clevelandclinic.org, medlineplus.gov) → irelevant pentru RO. A doua rulare: „creatina” restrânsă la domenii .ro (listă de 30 de domenii RO, deci NU un SERP natural, ci un proxy). A treia rulare: „creatina romania lei” (intenție comercială).

**primesupplements.ro:** NU apare în rulările naturale; apare #5 doar în rularea filtrată pe domenii .ro (blog „ce este creatina”), nu cu pagina de produs.

**Intenție dominantă:** Mixtă, dominant INFORMAȚIONAL („ce este creatina”, beneficii, contraindicații): 8 din 10 rezultate sunt articole (3 dintre ele de la lanțuri de farmacii/clinici: Regina Maria, Farmacia Tei, Catena, Dr.Max). Paginile de produs nu rankează pe cuvântul simplu; categoriile (GymBeam, Farmacia Tei, Dr.Max) apar doar când se adaugă semnale comerciale.

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.reginamaria.ro/articole-medicale/alimentatie-sanatoasa/creatina-ce-este-cum-se-utilizeaza-contraindicatii | reginamaria.ro (Regina Maria (medical)) | articol | Creatina: ce este, cum se utilizeaza, contraindicatii |
| 2 | https://comenzi.farmaciatei.ro/info-tei/ingrediente-active/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | articol | Creatina: Ce este, Surse, Beneficii, Riscuri si reactii adv |
| 3 | https://www.catena.ro/ce-este-creatina-si-care-sunt-beneficiile-ei | catena.ro (Catena (farmacie)) | articol | Creatina: ce este, ce beneficii are, surse naturale |
| 4 | https://www.drmax.ro/articole/creatina-ce-este-care-sunt-beneficiile-si-contraindicatiile | drmax.ro (Dr.Max) | articol | Creatina: ce este, care sunt beneficiile si contraindicatiile |
| 5 | https://primesupplements.ro/blogs/news/ce-este-creatina | primesupplements.ro (PRIME SUPPLEMENTS) | articol | Ce este creatina: beneficii pentru masă musculară și mituri (PRIME – doar în rularea filtrată pe .ro) |
| 6 | https://gymbeam.ro/creatina | gymbeam.ro | categorie | Creatină / GymBeam.ro |
| 7 | https://www.pronutrition.ro/blog/post/creatina-beneficii-administrare-mituri.html | pronutrition.ro (Pro Nutrition) | articol | Creatina: beneficii, administrare corectă, mituri și contraindicații |
| 8 | https://dynutrition.ro/blogs/press-releases/tot-ce-trebuie-sa-stii-despre-creatina-ce-este-cum-functioneza-si-de-ce-ar-trebui-sa-o-folosesti | dynutrition.ro (DY Nutrition) | articol | Tot ce trebuie să știi despre creatină |
| 9 | https://www.myprotein.ro/blog/suplimente/ce-este-creatina-beneficii-dozarea-si-efecte-secundare/ | myprotein.ro | articol | Ce este creatina? (beneficii, dozare, efecte secundare) |
| 10 | https://highenergy.ro/blog/news/creatina-ce-este-si-cum-funcioneaza-in-organism | highenergy.ro | articol | Creatina: Ce este și cum funcționează în organism? |
| 11 | https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | categorie | [„creatina romania lei”] Creatina Pentru Forta, Efort Si Progres Sustinut |
| 12 | https://www.drmax.ro/suplimente-alimentare/suplimente-pentru-sportivi/creatina | drmax.ro (Dr.Max) | categorie | [„creatina romania lei”] Creatina – categorie Dr.Max |
| 13 | https://www.optimumnutrition.ro/creatina | optimumnutrition.ro (Optimum Nutrition RO) | categorie | [„creatina romania lei”] Creatina de cea mai buna calitate - Optimum Nutrition Romania |
| 14 | https://altex.ro/creatina/cpl/ | altex.ro | marketplace / comparator | [„creatina romania lei”] Creatina – listare Altex |
| 15 | https://dynutrition.ro/collections/creatine | dynutrition.ro (DY Nutrition) | categorie | [„creatina romania lei”] Creatina Premium – DY |
| 16 | https://olimpsport.ro/collections/creatina | olimpsport.ro | categorie | [„creatina romania lei”] Creatina monohidrata / Olimp Sport Nutrition / LIVRARE GRATUITA |

**Șabloane de titlu:** „Creatina: ce este, …” + listă de subteme în titlu (beneficii / contraindicații / cum se utilizează / surse / riscuri); „Tot ce trebuie să știi despre creatină”; fără gramaje, fără „Creapure” pe acest termen generic.

**Snippet / definiție vizibilă:** Definiție tip snippet (Regina Maria / Catena / Myprotein): creatina este un compus natural produs în ficat, rinichi și pancreas din arginină, glicină și metionină; ~95 % se află în mușchiul scheletic sub formă de fosfocreatină și regenerează ATP; creatina monohidrat = forma cea mai studiată; doză de menținere 3–5 g/zi. Diferența creatină vs creatinină este explicată explicit (confuzie frecventă).

**Întrebări asociate (PAA-style):** Ce este creatina? · Ce este creatina și la ce ajută? · Care este diferența dintre creatină și creatinină? · Creatina are contraindicații? · Cum se utilizează creatina?

### 2. „creatină”

**Variante rulate:** Rulare brută cu diacritice – SERP natural, rezultate RO.

**primesupplements.ro:** Nu apare.

**Intenție dominantă:** INFORMAȚIONAL (definiție). Wikipedia #1, apoi articole medicale/farmacii; o singură categorie comercială (GymBeam).

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://ro.wikipedia.org/wiki/Creatin%C4%83 | ro.wikipedia.org (Wikipedia RO) | enciclopedie | Creatină – Wikipedia |
| 2 | https://www.reginamaria.ro/articole-medicale/alimentatie-sanatoasa/creatina-ce-este-cum-se-utilizeaza-contraindicatii | reginamaria.ro (Regina Maria (medical)) | articol | Creatina: ce este, cum se utilizeaza, contraindicatii |
| 3 | https://www.catena.ro/ce-este-creatina-si-care-sunt-beneficiile-ei | catena.ro (Catena (farmacie)) | articol | Creatina: ce este, ce beneficii are, surse naturale |
| 4 | https://comenzi.farmaciatei.ro/info-tei/ingrediente-active/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | articol | Creatina: Ce este, Surse, Beneficii, Riscuri si reactii adv |
| 5 | https://www.drmax.ro/articole/creatina-ce-este-care-sunt-beneficiile-si-contraindicatiile | drmax.ro (Dr.Max) | articol | Creatina: ce este, care sunt beneficiile si contraindicatiile |
| 6 | https://en.wikipedia.org/wiki/Creatinase | en.wikipedia.org | zgomot (irelevant) | Creatinase (zgomot) |
| 7 | https://www.myprotein.ro/blog/suplimente/ce-este-creatina-beneficii-dozarea-si-efecte-secundare/ | myprotein.ro | articol | Ce este creatina? |
| 8 | https://gymbeam.ro/creatina | gymbeam.ro | categorie | Creatină / GymBeam.ro |
| 9 | https://dynutrition.ro/blogs/press-releases/tot-ce-trebuie-sa-stii-despre-creatina-ce-este-cum-functioneza-si-de-ce-ar-trebui-sa-o-folosesti | dynutrition.ro (DY Nutrition) | articol | Tot ce trebuie să știi despre creatină |

**Șabloane de titlu:** „Creatina: ce este, …” (fără diacritice chiar și pe site-urile medicale); H1 cu diacritice; nici un gramaj.

**Snippet / definiție vizibilă:** Wikipedia RO: compus organic care, la vertebrate, se află majoritar fosforilat și ajută la regenerarea ATP, mai ales în țesutul muscular și cerebral. Catena: sintetizată din arginină, glicină și metionină în ficat, rinichi, pancreas.

**Întrebări asociate (PAA-style):** Ce este creatina? · Din ce se produce creatina în organism? · Care sunt sursele naturale de creatină? · Ce beneficii are creatina? · Creatina are efecte secundare?

### 3. „creatina monohidrata”

**Variante rulate:** Rulare brută (fără diacritice): SERP spaniol (walmart.com, tuasaude.com, eltiempo.com, iogenixnutrition, centromedicoabc, masmusculo.com, mdnlabs.mx, farmaciasanpablo.com.mx, fitia.app) → irelevant. A doua rulare: „creatină monohidrată” (diacritice). A treia: „creatină monohidrată românia”.

**primesupplements.ro:** Nu apare (nici produsul B, nici colecția).

**Intenție dominantă:** COMERCIAL-INVESTIGAȚIONAL: mix de categorii (Myprotein, GymBeam, Decathlon), produse single-ingredient (Genius 400 g, DY 300 g, Decathlon Creapure 300 g, Naturecan) și 2–3 articole-ghid („cea mai bună creatină monohidrată”, „totul despre”).

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://comenzi.farmaciatei.ro/cauti/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | căutare internă retailer | Cauti "creatina"? Alege din oferta Farmacia Tei online |
| 2 | https://www.reginamaria.ro/articole-medicale/alimentatie-sanatoasa/creatina-ce-este-cum-se-utilizeaza-contraindicatii | reginamaria.ro (Regina Maria (medical)) | articol | Creatina: ce este, cum se utilizeaza, contraindicatii |
| 3 | https://www.myprotein.ro/c/nutrition/creatine/creatine-monohydrate/ | myprotein.ro | categorie | Creatină monohidrată – Creatina / Myprotein RO |
| 4 | https://geniusnutrition.ro/products/creatine-monohydrate-400g | geniusnutrition.ro (Genius Nutrition) | produs | Creatine Monohydrate 400g / Genius Nutrition® |
| 5 | https://dynutrition.ro/products/creatina-monohidrat-300g | dynutrition.ro (DY Nutrition) | produs | Creatină Monohidrată DY Nutrition |
| 6 | https://gym-stack.ro/blogs/news/cea-mai-buna-creatina-monohidrata | gym-stack.ro | articol | Cea mai bună creatină monohidrată |
| 7 | https://gymbeam.ro/creatina-monohidrat | gymbeam.ro | categorie | Creatină monohidrată / GymBeam.ro |
| 8 | https://comenzi.farmaciatei.ro/info-tei/ingrediente-active/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | articol | Creatina: Ce este, Surse, Beneficii, Riscuri |
| 9 | https://www.myprotein.ro/blog/suplimente/totul-despre-creatina-monohidrat/ | myprotein.ro | articol | Totul despre creatina monohidrat - Myprotein Blog |
| 10 | https://www.decathlon.ro/toate-sporturile/cross-training/creatina | decathlon.ro | categorie | [+românia] Creatină monohidrată – Decathlon |
| 11 | https://www.decathlon.ro/p/creatina-monohidrat-creapure-gust-neutru-300g/_/R-p-327680 | decathlon.ro | produs | [+românia] Creatină monohidrat Creapure® gust neutru 300g DECATHLON |
| 12 | https://www.decathlon.ro/sanatate-si-nutritie/creatina | decathlon.ro | categorie | [+românia] Creatină monohidrată - suplimente pentru mușchi |
| 13 | https://www.naturecan.ro/products/creatina-monohidrata | naturecan.ro | produs | [+românia] Cumpără Creatină monohidrată / Naturecan RO |
| 14 | https://nmn.ro/produs/creatina-monohidrata/ | nmn.ro | produs | [+românia] Creatină monohidrată - Suplimente Antiaging - nmn.ro |

**Șabloane de titlu:** Titlu = „Creatină monohidrată” + brand + (gramaj) ; „Creatine Monohydrate 400g | Genius Nutrition®”; „Creatină Monohidrată DY Nutrition”; „Creatină monohidrat Creapure® gust neutru 300g”; „Cumpără Creatină monohidrată”. Gramajul apare în ~40 % din titlurile de produs.

**Snippet / definiție vizibilă:** Regina Maria (snippet): „Creatina monohidrată este cea mai cunoscută, utilizată și studiată formă de creatină. Este cea mai accesibilă formă de creatină din punct de vedere al prețului și raportului cost-beneficiu.” GymBeam: monohidratul „conține cam 90 % creatină pură” (legătură cu o moleculă de apă). Myprotein: „crește performanța fizică în exercițiile repetate de scurtă durată și intensitate ridicată” (claim autorizat). DY: porție 5 g, „fără fază de încărcare”. Genius: 3 g/porție.

**Întrebări asociate (PAA-style):** Ce este creatina monohidrată? · Cum funcționează creatina monohidrată? · Care este doza recomandată de creatină monohidrată? · Creatina monohidrată este potrivită și pentru adulții peste 55 de ani? · Când este cel mai bun moment să iei creatina monohidrată? · Pot combina creatina monohidrată cu alte suplimente? · Creatina monohidrată are nevoie de fază de încărcare?

### 4. „creatina creapure”

**Variante rulate:** Rulare brută: SERP US (amazon.com ×4, hsnstore.eu ×2, creapure.com, bareperformancenutrition, steelfitusa). „creatină Creapure®”: tot internațional (sunday.de, bpn, body-attack.de, myprotein.com, hsnstore.eu, creapure.com ×2, musclefeast, earthnutri). Rulări RO utile: „creatina creapure 300g lei” și „creatină Creapure românia pret”.

**primesupplements.ro:** DA: #10 la „creatina creapure 300g lei” cu /products/creatina-creapure (snippet indexat cu titlul vechi „Creatina Creapure - Supliment pentru Performanță Fizică” → Google încă nu a re-crawl-uit noul title). Absent la „creatină Creapure românia pret” și la rulările brute.

**Intenție dominantă:** COMERCIAL (tranzacțional): 8 din 10 sunt pagini de produs; comparatoare (Compari) și căutări eMAG pe varianta cu „pret”. Decathlon domină cu marca proprie Creapure 300 g (2 URL-uri + categoria).

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.decathlon.ro/p/creatina-monohidrata-creapure-neutra-300g/_/R-p-327680 | decathlon.ro | produs | Creatină monohidrată certificată Creapure® fără aromă 300g |
| 2 | https://www.decathlon.ro/sanatate-si-nutritie/creatina | decathlon.ro | categorie | Creatină monohidrată - suplimente pentru mușchi |
| 3 | https://www.decathlon.ro/p/creatina-monohidrat-creapure-gust-neutru-300g/_/R-p-327680 | decathlon.ro | produs | Creatină monohidrat Creapure® gust neutru 300g DECATHLON |
| 4 | https://geniusnutrition.ro/products/creapure | geniusnutrition.ro (Genius Nutrition) | produs | Creapure® 300g / Genius Nutrition® |
| 5 | https://www.nutriland.ro/en/collections/creatina-monohidrata/products/creapure | nutriland.ro | produs | Creatine CREAPURE® 300g, powder, Genius Nutrition … High purity - Nutriland |
| 6 | https://www.nutriland.ro/en/collections/creatina | nutriland.ro | categorie | Creatine Nutriland |
| 7 | https://www.nutriland.ro/en/products/creatina-monohidrata-creapure-r-pudra-300g-quamtrax-supliment-pentru-crestere-masa-musculara | nutriland.ro | produs | Creatine monohydrate Creapure®, powder, 300g, Quamtrax |
| 8 | https://bodyline.ro/cresterea-masei-musculare/creatina-monohidrata/ | bodyline.ro (Body Line) | produs | Creatina Monohidrata Creapure® Pure Creatine Doar 89 Lei |
| 9 | https://www.nutrivor.ro/product/creatine-drink-300g-etixx-sports-nutrition/ | nutrivor.ro | produs | Creatina creapure 300g-etixx sports nutrition - Nutrivor |
| 10 | https://primesupplements.ro/products/creatina-creapure | primesupplements.ro (PRIME SUPPLEMENTS) | produs | Creatina Creapure - Supliment pentru Performanță Fizică (PRIME, #10 – titlul indexat este cel VECHI; titlul live este „Creatină Creapure® monohidrată 300/500 g / Prime Supplements”) |
| 11 | https://www.drmax.ro/creatina-monohidrata-creapure-500g-pro-nutrition | drmax.ro (Dr.Max) | produs | [+pret] Creatina monohidrata Creapure, 500g, Pro Nutrition |
| 12 | https://creatina.compari.ro/gymbeam/creatine-monohydrate-creapure-250-g-p423809571/ | creatina.compari.ro | marketplace / comparator | [+pret] GymBeam Creatine Monohydrate Creapure 250 g (Creatina) - Preturi |
| 13 | https://creatina.compari.ro/nutrend/creatine-monohydrate-creapure-500-g-p219280836/ | creatina.compari.ro | marketplace / comparator | [+pret] Nutrend Creatine Monohydrate Creapure 500 g - Preturi |
| 14 | https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina/creatina-monohidrata-better-creatine-creapure-300-g-way-better-p363230 | comenzi.farmaciatei.ro (Farmacia Tei) | produs | [+pret] Creatina monohidrata Better Creatine Creapure, 300 g, Way B |
| 15 | https://creatina.compari.ro/ | creatina.compari.ro | marketplace / comparator | [+pret] Creatina Preturi, Oferte, Creatine Magazine, Creatine ieftine |
| 16 | https://gymbeam.ro/creatina-creapure-gymbeam.html | gymbeam.ro | produs | [+pret] Creatină monohidrată micronizată (Creapure 100%®) / live: Creatină monohidrată 100% Creapure® - GymBeam |
| 17 | https://www.emag.ro/search/creatina+monohidrata+creapure | emag.ro | căutare internă retailer | [+pret] Cauți creatina monohidrata creapure? Alege din oferta eMAG.ro |
| 18 | https://www.brainmarket.ro/brainmax-creatine--creapure---creatina-monohidrat--500-g/ | brainmarket.ro | produs | [+pret] BrainMax Creatine® (Creapure®), Creatina monohidrat, 500 g |

**Șabloane de titlu:** „Creatină monohidrat(ă) Creapure® + gust neutru / fără aromă + 300g” (Decathlon); „Creapure® 300g | Brand” (Genius); „Creatine Monohydrate Creapure 250 g / 500 g – Preturi” (Compari); „Creatina Monohidrata Creapure® Pure Creatine Doar 89 Lei” (Body Line – preț în titlu). Semnul ® apare în 6 din 10 titluri. Gramajul apare în 9 din 10.

**Snippet / definiție vizibilă:** Creapure.com (snippet internațional): fabricat exclusiv în Germania, Trostberg, de AlzChem; puritate ≥ 99,9 %; testat pentru DCD, DHT, creatinină; lista Köln; vegan. GymBeam (RO, claim de diferențiere): „creatină germană originală cu o puritate de 99,9 %”, „Rezultatele testelor de laborator”, „Cum recunoașteți Creapure® original” (cod QS). Creapure.com „Buy here”: listează brandurile partenere din România – printre ele Prime Supplements (confirmat în label_facts).

**Întrebări asociate (PAA-style):** Ce este Creapure®? · Prin ce diferă Creapure® de creatina monohidrat obișnuită? · Cum recunosc Creapure® original (sigla, codul QS)? · Creapure® este micronizată? · Cât costă creatina Creapure în România? · Ce gust are creatina Creapure fără aromă? · Cum se administrează creatina Creapure?

### 5. „creatina micronizata”

**Variante rulate:** Rulare brută – SERP natural RO (fără diacritice).

**primesupplements.ro:** Nu apare (produsul B are exact acest termen în titlu, dar nu este în top 10).

**Intenție dominantă:** COMERCIAL: 6 produse (Optimum Nutrition Micronised Creatine 317 g apare de 3 ori prin 3 retaileri), 2 căutări interne (Farmacia Tei, eMAG), 1 categorie, 1 articol medical.

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.drmax.ro/creatina-monohidrata-micronizata-ultra-pura-252g-vivo | drmax.ro (Dr.Max) | produs | Creatina monohidrata micronizata ultra pura, 252g, Vivo |
| 2 | https://comenzi.farmaciatei.ro/cauti/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | căutare internă retailer | Cauti "creatina"? Alege din oferta Farmacia Tei online |
| 3 | https://gymbeam.ro/creatina-micronizata-optimum-nutrition.html | gymbeam.ro | produs | Creatină micronizată - Optimum Nutrition (GymBeam) |
| 4 | https://www.emag.ro/search/creatina+micronizata | emag.ro | căutare internă retailer | Cauți creatina micronizata? Alege din oferta eMAG.ro |
| 5 | https://www.reginamaria.ro/articole-medicale/alimentatie-sanatoasa/creatina-ce-este-cum-se-utilizeaza-contraindicatii | reginamaria.ro (Regina Maria (medical)) | articol | Creatina: ce este, cum se utilizeaza, contraindicatii |
| 6 | https://gym-stack.ro/products/creatina-micronizata-on-creatine-micronised-317g | gym-stack.ro | produs | Creatina Monohidrata Micronizata, Optimum Nutrition, Micronised Creatine, 317g |
| 7 | https://www.suplimente-vitabolic.ro/catalog-suplimente/creatina-si-volumizatoare/suta-la-suta-creatine-micronized-400g | suplimente-vitabolic.ro | produs | 100% Micronized Creatine Monohydrate 300g - Creatină - Vitabolic |
| 8 | https://www.nutriland.ro/en/products/creatina-317g | nutriland.ro | produs | Micronized creatine monohydrate 317g, powder, Optimum Nutrition |
| 9 | https://www.myprotein.ro/c/nutrition/creatine/creatine-monohydrate/ | myprotein.ro | categorie | Creatină monohidrată – Myprotein |
| 10 | https://gymbeam.ro/creatina-creapure-gymbeam.html | gymbeam.ro | produs | Creatină monohidrată 100% Creapure® - GymBeam |

**Șabloane de titlu:** „Creatina monohidrata micronizata (ultra pura), 252g, Brand” (Dr.Max – gramaj + brand la final); „100% Micronized Creatine Monohydrate 300g” (Vitabolic – engleză); „Creatină micronizată - Optimum Nutrition”; cuvântul „micronizată/micronized” apare în 7 din 10 titluri; gramajul în 5 din 10.

**Snippet / definiție vizibilă:** GymBeam (snippet): „Acest proces nu modifică structura chimică a creatinei în sine” – micronizarea = particule mai fine, dizolvare mai bună. Regina Maria: forma micronizată „îmbunătățește solubilitatea în apă și digestibilitatea”. ATENȚIE (GymBeam, pagina ON): „AlzChem nu fabrică o versiune micronizată de Creapure®” – afirmație a unui competitor; de verificat față de eticheta produsului A înainte de a folosi „micronizată” lângă „Creapure®” în texte (titlul produsului nu se schimbă).

**Întrebări asociate (PAA-style):** Ce este creatina micronizată? · Care este diferența dintre creatina micronizată și creatina monohidrată obișnuită? · Creatina micronizată se dizolvă mai bine? · Creatina micronizată este mai eficientă? · Creapure® este micronizată?

### 6. „creatina pudra”

**Variante rulate:** Rulare brută – SERP natural RO.

**primesupplements.ro:** Nu apare.

**Intenție dominantă:** COMERCIAL: produse (Olimp 250 g, Vitaking 250 g, Pro Nutrition Creatine Powder, GoldNutrition 280 g) + categorii (Nutriland, Nutriline).

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.drmax.ro/podra-de-creatina-momohidrata-250g-olimp-sport-nutrition | drmax.ro (Dr.Max) | produs | Pudra de creatina monohidrata, 250g, Olimp Sport Nutrition |
| 2 | https://comenzi.farmaciatei.ro/cauti/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | căutare internă retailer | Cauti "creatina"? – Farmacia Tei |
| 3 | https://comenzi.farmaciatei.ro/vitamine-si-suplimente/metabolism/aminoacizi/creatina-monohidrata-pudra-250-g-vitaking-p351821 | comenzi.farmaciatei.ro (Farmacia Tei) | produs | Creatina monohidrata pudra, 250 g, Vitaking |
| 4 | https://www.reginamaria.ro/articole-medicale/alimentatie-sanatoasa/creatina-ce-este-cum-se-utilizeaza-contraindicatii | reginamaria.ro (Regina Maria (medical)) | articol | Creatina: ce este, cum se utilizeaza, contraindicatii |
| 5 | https://www.nutriland.ro/en/collections/creatina | nutriland.ro | categorie | Creatine Nutriland |
| 6 | https://www.nutriland.ro/en/collections/creatina-monohidrata | nutriland.ro | categorie | Nutriland™ Creatine Monohydrate |
| 7 | https://nutriline.ro/creatina-pudra | nutriline.ro | categorie | CREATINA PUDRA - NUTRILINE |
| 8 | https://www.pronutrition.ro/creatine-powder.html | pronutrition.ro (Pro Nutrition) | produs | Creatine powder – Pro Nutrition |
| 9 | https://goldnutrition.ro/endurance/creatina-monohidrata-goldnutrition-creatine-powder-280g | goldnutrition.ro | produs | Creatina monohidrata, GoldNutrition, Creatine Powder, 280g |

**Șabloane de titlu:** „Pudra de creatina monohidrata, 250g, Brand” / „Creatina monohidrata pudra, 250 g, Brand” (ordinea cuvintelor variază; farmaciile pun gramajul + brandul la final, separate prin virgulă); „Creatine Powder” în engleză la branduri.

**Snippet / definiție vizibilă:** Snippet Pro Nutrition/Vitaking: „doza uzuală 3–5 g/zi, zilnic, inclusiv în zilele de odihnă; efectul benefic se obține cu un aport zilnic de 3 g” (formularea legală a claim-ului). Vitaking: nerecomandat sub 18 ani, sarcină, alăptare.

**Întrebări asociate (PAA-style):** Cum se ia creatina pudră? · Câtă creatină pudră pe zi? · Creatina pudră sau capsule – care e mai bună? · Cu ce se amestecă creatina pudră (apă, suc)?

### 7. „creatina 300g”

**Variante rulate:** Rulare brută: SERP brazilian (amazon.com.br, sanavita, probiotica, integralmedica ×2, maxtitanium, soldiersnutrition, qntsport.com.pe, muscledefinition, newnutrition) → irelevant. A doua rulare: „creatina 300g lei romania”; vezi și „creatina creapure 300g lei” la Q4.

**primesupplements.ro:** Nu apare (produsul B = 300 g; produsul A are varianta 300 g).

**Intenție dominantă:** COMERCIAL (tranzacțional, orientat pe preț): produse cu „300g” în titlu + listări retail/marketplace (Altex, Decathlon, Farmacia Tei).

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://comenzi.farmaciatei.ro/cauti/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | căutare internă retailer | Cauti "creatina"? – Farmacia Tei |
| 2 | https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina/creatina-300-g-vitabolic-p384268 | comenzi.farmaciatei.ro (Farmacia Tei) | produs | Creatina, 300 g, Vitabolic : Farmacia Tei online |
| 3 | https://altex.ro/creatina/cpl/ | altex.ro | marketplace / comparator | Creatina – Altex |
| 4 | https://www.decathlon.ro/sanatate-si-nutritie/creatina | decathlon.ro | categorie | Creatină monohidrată - suplimente pentru mușchi |
| 5 | https://www.drmax.ro/creatina-sub-forma-de-pulbere-creatine-monohydrate-300g-biotechusa | drmax.ro (Dr.Max) | produs | Creatina sub forma de pulbere Creatine Monohydrate, 300g, BioTechUSA |
| 6 | https://www.nutriland.ro/en/collections/creatina/products/creatina-monohidrata-pudra-300g-evogen-supliment-alimentar | nutriland.ro | produs | Creatine monohydrate, powder, 300g, Evogen, Micronized |
| 7 | https://www.nutriland.ro/products/creatina-300g | nutriland.ro | produs | Creatina 300g, pudra, Gaspari Nutrition, Supliment crestere masa musculara |
| 8 | https://gym-stack.ro/collections/creatina-produse | gym-stack.ro | categorie | Creatina + (Gym-Stack) |
| 9 | https://www.sportguru.ro/sporturi/fitness/nutritie/creatina | sportguru.ro | categorie | Nutritie fitness - Creatina (SportGuru) |

**Șabloane de titlu:** „Creatina, 300 g, Brand” (Farmacia Tei); „…Creatine Monohydrate, 300g, BioTechUSA” (Dr.Max); „Creatina 300g, pudra, Brand, Supliment crestere masa musculara” (Nutriland – claim nepermis în titlu). Gramajul scris „300g” (fără spațiu) în majoritatea titlurilor; Farmacia Tei folosește „300 g”.

**Snippet / definiție vizibilă:** Prețuri vizibile în snippet-uri: ~48,50 lei (OstroVit 300 g) până la ~155 lei (Creapure premium); Vitabolic 300 g 73,50–106 lei; Decathlon Creapure 300 g 99,99 lei. (Doar pentru context competitiv – NU se afișează prețuri în texte.)

**Întrebări asociate (PAA-style):** Câte porții are un tub de creatină de 300 g? · Cât ține o creatină de 300 g? · Ce creatină de 300 g să aleg?

### 8. „creatina 500g”

**Variante rulate:** Rulare brută: SERP brazilian/US (mercadolivre, amazon.com, blackskull ×2, maxtitanium, lojamaismu ×2, soldiersnutrition, ibspot) → irelevant. A doua rulare: „creatina 500g lei romania”.

**primesupplements.ro:** Nu apare (produsul A are varianta 500 g, dar titlul live „300/500 g” nu este încă indexat).

**Intenție dominantă:** COMERCIAL, puternic orientat pe PREȚ: comparatoare (price.ro, Altex), căutări eMAG, categorii de farmacii; doar 2 pagini de produs.

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.drmax.ro/dieta-si-nutritie/sport/suplimente-pentru-sportivi/creatina | drmax.ro (Dr.Max) | categorie | Creatina – categorie Dr.Max |
| 2 | https://www.emag.ro/search/creatina+500g | emag.ro | căutare internă retailer | Cauți creatina 500g? Alege din oferta eMAG.ro |
| 3 | https://comenzi.farmaciatei.ro/cauti/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | căutare internă retailer | Cauti "creatina"? – Farmacia Tei |
| 4 | https://www.price.ro/rezultate~creatina-500-g.html | price.ro | marketplace / comparator | Creatina 500 g preturi, rezultate creatina 500 g lista produse & preturi |
| 5 | https://www.remediumfarm.ro/vitamine-suplimente/suplimente-sportivi/creatina-pudra-500g-z-konzept-52558.html | remediumfarm.ro (Remedium Farm) | produs | Creatina pudra, 500g, Z-Konzept - Pret 110,00 lei |
| 6 | https://comenzi.bebetei.ro/suplimente-alimentare-si-produse-naturiste/suplimente-pentru-sportivi/creatina | comenzi.bebetei.ro (Farmacia Tei (Bebe Tei)) | categorie | Suplimente Cu Creatina - Putere Si Performanta Sportiva : Bebe Tei |
| 7 | https://altex.ro/creatina/cpl/ | altex.ro | marketplace / comparator | Creatina – Altex |
| 8 | https://highenergy.ro/creatina/ostrovit-creatina-monohidrata-diverse-arome-500g.html | highenergy.ro | produs | Creatină Monohidrată OstroVit - Diverse Arome 500g |
| 9 | https://allnutrition.ro/Creatina-k981.html | allnutrition.ro | categorie | Nutriție sportivă - Creatină • CEL MAI IEFTIN • Allnutrition.ro |

**Șabloane de titlu:** „Creatina pudra, 500g, Brand - Pret 110,00 lei” (preț în titlu); „Creatină Monohidrată Brand - Diverse Arome 500g”; „• CEL MAI IEFTIN •”; „preturi / lista produse & preturi”.

**Snippet / definiție vizibilă:** Snippet-uri cu prețuri: monohidrat simplu 500 g ~45–80 lei; Creapure 500 g ~139–195 lei. (Context competitiv – nu se preiau prețuri în texte.)

**Întrebări asociate (PAA-style):** Câte porții are creatina de 500 g? · Merită să cumpăr creatină de 500 g sau 300 g? · Cât costă creatina de 500 g?

### 9. „creatina fara aroma”

**Variante rulate:** Rulare brută – SERP natural RO.

**primesupplements.ro:** Nu apare (deși produsul B are „fără aromă” în titlu și H1).

**Intenție dominantă:** COMERCIAL (tranzacțional): 8 din 9 sunt pagini de produs; Farmacia Tei + Bebe Tei (același grup) ocupă 6 poziții cu titluri-șablon.

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.drmax.ro/creatina-monohidrata-fara-aroma-300g-ostrovit | drmax.ro (Dr.Max) | produs | Creatina monohidrata fara aroma, 300g, OstroVit |
| 2 | https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina/creatina-monohidrata-fara-aroma-300-g-scitec-nutrition-p363914 | comenzi.farmaciatei.ro (Farmacia Tei) | produs | Creatina monohidrata fara aroma, 300 g, Scitec Nutrition |
| 3 | https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina/creatina-monohidrata-fara-aroma-500-g-ostrovit-p376134 | comenzi.farmaciatei.ro (Farmacia Tei) | produs | Creatina monohidrata fara aroma, 500 g, OstroVit |
| 4 | https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina/creatina-monohidrata-fara-aroma-200-g-gold-nutrition-p380082 | comenzi.farmaciatei.ro (Farmacia Tei) | produs | Creatina monohidrata fara aroma, 200 g, Gold Nutrition |
| 5 | https://comenzi.farmaciatei.ro/cauti/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | căutare internă retailer | Cauti "creatina"? – Farmacia Tei |
| 6 | https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina/creatina-hcl-fara-aroma-45-g-con-cret-p395104 | comenzi.farmaciatei.ro (Farmacia Tei) | produs | Creatina HCL fara aroma, 45 g, Con-Cret |
| 7 | https://comenzi.bebetei.ro/suplimente-alimentare-si-produse-naturiste/suplimente-pentru-sportivi/creatina/creatina-monohidrata-fara-aroma-500-g-ostrovit-p411911 | comenzi.bebetei.ro (Farmacia Tei (Bebe Tei)) | produs | Creatina Monohidrata fara aroma, 500 g, OstroVit : Bebe Tei |
| 8 | https://highenergy.ro/creatina/creatina-creapure-kinetica-creatine-100-fara-aroma-500g.html | highenergy.ro | produs | Creatină Creapure Kinetica Creatine 100% Fără Aromă 500g |
| 9 | https://www.naturitas.ro/p/suplimente/sport/creatina/100-creatina-monohidrat-fara-aroma-500-g-biotechusa | naturitas.ro | produs | 100% creatina monohidrat, fara aroma - Naturitas |

**Șabloane de titlu:** Șablon dominant: „Creatina monohidrata fara aroma, {gramaj} g, {Brand}” (fără diacritice, virgule, gramaj cu spațiu); varianta „Creatină Creapure Brand Creatine 100% Fără Aromă 500g”. Toate titlurile conțin „fara aroma/fără aromă”; 8 din 9 conțin gramajul.

**Snippet / definiție vizibilă:** OstroVit (snippet): porție 2,5 g în 100–150 ml apă, 1–2 porții/zi. Scitec: „nu depășiți 10 g odată”. BioTechUSA: varianta fără aromă „se amestecă ușor în shake-uri sau alte băuturi”. Interesul este pentru sinonimele: „fără aromă” = „gust neutru” = „neutra” = „unflavoured/unflavored”.

**Întrebări asociate (PAA-style):** Ce gust are creatina fără aromă? · Creatina fără aromă se dizolvă în apă? · Cu ce se amestecă creatina fără aromă? · Creatina cu aromă sau fără – ce aleg?

### 10. „cea mai buna creatina”

**Variante rulate:** Rulare brută – SERP natural RO. Rulare suplimentară: „creatina pareri forum romania care creatina” (intenție de recenzii/forum).

**primesupplements.ro:** Nu apare.

**Intenție dominantă:** INFORMAȚIONAL-COMERCIAL (ghid de alegere / top): 9 din 9 sunt articole (3 afiliate: Pareri Adevarate, TopGuides, Linia de Start; 5 bloguri de magazine; 1 medical). Nicio pagină de produs nu rankează pe „cea mai bună creatină” → răspunsul se dă prin criterii obiective, în articol/FAQ, nu prin auto-proclamare.

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.reginamaria.ro/articole-medicale/alimentatie-sanatoasa/creatina-ce-este-cum-se-utilizeaza-contraindicatii | reginamaria.ro (Regina Maria (medical)) | articol | Creatina: ce este, cum se utilizeaza, contraindicatii |
| 2 | https://pareriadevarate.ro/cea-mai-buna/creatina/monohidrata/ | pareriadevarate.ro (Pareri Adevarate (afiliat)) | articol | Cea Mai Buna Creatina Monohidrata 2026 - Pareri Adevarate |
| 3 | https://www.pronutrition.ro/blog/post/creatina-beneficii-administrare-mituri.html | pronutrition.ro (Pro Nutrition) | articol | Creatina: beneficii, administrare corectă, mituri și contraindicații |
| 4 | https://gym-stack.ro/blogs/news/cea-mai-buna-creatina-monohidrata | gym-stack.ro | articol | Cea mai bună creatină monohidrată |
| 5 | https://topguides.ro/top-cea-mai-buna-creatina/ | topguides.ro (TopGuides (afiliat)) | articol | Cea Mai Bună Creatină în 2026 - TopGuides |
| 6 | https://hyperfit.ro/blogs/nutritie/cea-mai-buna-creatina-top-creatine-disponibile-in-romania | hyperfit.ro | articol | Cea mai bună Creatină în 2026 — Top Creatine disponibile în România |
| 7 | https://highenergy.ro/blog/news/cea-mai-buna-creatina-monohidrata | highenergy.ro | articol | Cea mai bună creatină monohidrată: Ghid și Recomandări |
| 8 | https://allnutrition.ro/blog-8/Ce_tipuri_de_creatina_exista_Cea_mai_buna_creatina-blog854.html | allnutrition.ro | articol | Ce tipuri de creatină există? Cea mai bună creatină |
| 9 | https://allnutrition.ro/blog-8/Ce_creatina_sa_alegeti_Care_forma_este_cea_mai_buna-blog3516.html | allnutrition.ro | articol | Ce creatină să alegeți? Care formă este cea mai bună? |
| 10 | https://forum.softpedia.com/topic/1110893-creatina-hcl-pareri/ | forum.softpedia.com | forum / Q&A | [forum] Creatina HCL pareri - Forumul Softpedia |
| 11 | https://forum.softpedia.com/topic/973600-pareri-proteina-creatina/ | forum.softpedia.com | forum / Q&A | [forum] Pareri proteina & creatina? - Forumul Softpedia |
| 12 | https://www.romedic.ro/forum/creatina-ucigasa-99086 | romedic.ro | forum / Q&A | [forum] creatina ucigasa – ROmedic |
| 13 | https://www.romedic.ro/forum/creatina-si-sala-29633 | romedic.ro | forum / Q&A | [forum] creatina si sala – ROmedic |
| 14 | https://liniadestart.ro/cea-mai-buna-creatina/ | liniadestart.ro (Linia de Start (afiliat)) | articol | [forum] ▷ Cea Mai Buna Creatina - Recenzii In Iulie 2026 |
| 15 | https://www.tpu.ro/sport/salut-vreau-sa-iau-creatina-si-inca-sunt-nelamurit-si-am-nevoie-de-niste-pareri-va-rog-sa-veniti-si-cu-argumente/ | tpu.ro | forum / Q&A | [forum] Vreau sa iau creatina … păreri – TPU |
| 16 | https://www.sfatulmedicului.ro/arhiva_medicala/creatina | sfatulmedicului.ro | articol | [forum] Creatina – SfatulMedicului (arhivă) |

**Șabloane de titlu:** „Cea mai bună creatină (monohidrată) în 2026” + „Top / Ghid și Recomandări / Pareri / Recenzii”; anul în titlu la 4 din 9; H2-uri „Clasificare TOP 3”, „Cum să alegi”, „Branduri recomandate”, „Întrebări frecvente”.

**Snippet / definiție vizibilă:** Consens în snippet-uri: monohidratul este forma cea mai studiată și cu cel mai bun raport cost-beneficiu; Creapure® este menționat ca reper de puritate (99,95 % / 99,9 %); HCL/malat/tamponată nu au dovezi superioare; alegerea depinde de buget, toleranță digestivă, aromă vs fără aromă, pudră vs capsule. Produse citate frecvent în topuri: ON Creatine Powder, Olimp, Weider Pure Creatine (Creapure), Genius 400 g („cel mai bun preț per porție”), OstroVit Creapure, Scitec.

**Întrebări asociate (PAA-style):** Care este cea mai bună creatină? · Care este cea mai bună creatină monohidrată? · Cum aleg o creatină bună (criterii)? · Ce tipuri de creatină există? · Creatina monohidrat sau HCL? · Pudră, capsule sau jeleuri – ce aleg? · Ce creatină recomandați pentru începători?

### 11. „creatina pret”

**Variante rulate:** Rulare brută – SERP natural RO.

**primesupplements.ro:** Nu apare.

**Intenție dominantă:** COMERCIAL orientat pe PREȚ: categorii (Dr.Max, GymBeam, Allnutrition ×2), comparator (Compari), căutare internă, 2 produse.

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.drmax.ro/dieta-si-nutritie/sport/suplimente-pentru-sportivi/creatina | drmax.ro (Dr.Max) | categorie | Creatina – categorie Dr.Max |
| 2 | https://www.decathlon.ro/p/creatina-pudra-317g/_/R-p-X8350123 | decathlon.ro | produs | CREATINĂ PUDRĂ 317g OPTIMUM NUTRITION – Decathlon |
| 3 | https://comenzi.farmaciatei.ro/info-tei/ingrediente-active/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | articol | Creatina: Ce este, Surse, Beneficii, Riscuri – Farmacia Tei |
| 4 | https://creatina.compari.ro/ | creatina.compari.ro | marketplace / comparator | Creatina Preturi, Oferte, Creatine Magazine, Creatine ieftine |
| 5 | https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina/creatine-1000-mg-60-capsule-zenyth-p368875 | comenzi.farmaciatei.ro (Farmacia Tei) | produs | Creatine, 1000 mg, 60 capsule, Zenyth |
| 6 | https://comenzi.farmaciatei.ro/cauti/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | căutare internă retailer | Cauti "creatina"? – Farmacia Tei |
| 7 | https://gymbeam.ro/creatina | gymbeam.ro | categorie | Creatină / GymBeam.ro |
| 8 | https://allnutrition.ro/Monohidrati-k1012.html | allnutrition.ro | categorie | Nutriție sportivă - Creatină - Creatină monohidrat • CEL MAI IEFTIN • |
| 9 | https://allnutrition.ro/Creatina-k981.html | allnutrition.ro | categorie | Nutriție sportivă - Creatină • CEL MAI IEFTIN • |
| 10 | https://en.wikipedia.org/wiki/Creatinase | en.wikipedia.org | zgomot (irelevant) | Creatinase (zgomot) |

**Șabloane de titlu:** „Creatina Preturi, Oferte, … Creatine ieftine”; „• CEL MAI IEFTIN •”; categorii simple „Creatină | Brand”. Cuvântul „pret/preturi/ieftin” apare în 3 din 10 titluri.

**Snippet / definiție vizibilă:** Snippet-uri cu intervale de preț (monohidrat 250–500 g ≈ 30–80 lei; premium/Creapure ≈ 97–170 lei; capsule ≈ 50–75 lei). Nu se preiau în texte.

**Întrebări asociate (PAA-style):** Cât costă creatina? · Care este cea mai ieftină creatină bună? · De ce diferă atât de mult prețurile la creatină? · Cât costă creatina la farmacie?

### 12. „creatina monohidrat micronizata”

**Variante rulate:** Rulare brută – SERP natural RO.

**primesupplements.ro:** Nu apare (termenul este aproape identic cu titlurile produselor A și B).

**Intenție dominantă:** COMERCIAL: 6 produse, GymBeam ocupă 3 poziții (micronizată proprie, ON, Creapure); Dr.Max 2; Genius 1.

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.drmax.ro/creatina-monohidrata-micronizata-ultra-pura-252g-vivo | drmax.ro (Dr.Max) | produs | Creatina monohidrata micronizata ultra pura, 252g, Vivo |
| 2 | https://www.drmax.ro/creatina-monohidrata-micronizata-250g-vitaking | drmax.ro (Dr.Max) | produs | Creatina monohidrata micronizata, 250g, Vitaking |
| 3 | https://comenzi.farmaciatei.ro/cauti/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | căutare internă retailer | Cauti "creatina"? – Farmacia Tei |
| 4 | https://geniusnutrition.ro/products/creatine-monohydrate-400g | geniusnutrition.ro (Genius Nutrition) | produs | Creatine Monohydrate 400g / Genius Nutrition® |
| 5 | https://gymbeam.ro/creatina-monohidrata-gymbeam.html | gymbeam.ro | produs | 100% Creatină monohidrată micronizată - GymBeam |
| 6 | https://gymbeam.ro/creatina-micronizata-optimum-nutrition.html | gymbeam.ro | produs | Creatină micronizată - Optimum Nutrition (GymBeam) |
| 7 | https://www.nutriland.ro/en/collections/creatina-monohidrata | nutriland.ro | categorie | Nutriland™ Creatine Monohydrate |
| 8 | https://gym-stack.ro/blogs/news/cea-mai-buna-creatina-monohidrata | gym-stack.ro | articol | Cea mai bună creatină monohidrată |
| 9 | https://gymbeam.ro/creatina-creapure-gymbeam.html | gymbeam.ro | produs | Creatină monohidrată 100% Creapure® - GymBeam |

**Șabloane de titlu:** „Creatina monohidrata micronizata (ultra pura), {gramaj}, Brand” (Dr.Max); „100% Creatină monohidrată micronizată - Brand”; „Creatine Monohydrate 400g | Brand”. „100 %” și „micronizată” sunt diferențiatorii din titlu; gramaj în 4 din 9.

**Snippet / definiție vizibilă:** GymBeam (H1 live): „creatină perfect solubilă, fabricată în Germania, cu puritate verificată în laborator”; H2: „Câtă creatină pură se găsește într-un gram”, „Cum acționează creatina în primele patru săptămâni?”, „Rezultatele testelor de laborator”, FAQ (FAQPage + QAPage schema). Genius (H2): „400 g. Aproximativ 133 portii. 3 g per portie.”, „O masura de 3 g pe zi.”, „Intrebari frecvente”.

**Întrebări asociate (PAA-style):** Ce este creatina monohidrată micronizată? · Creatina micronizată are același efect ca monohidratul clasic? · Câtă creatină pură este într-un gram de monohidrat? · Cum se dozează creatina micronizată? · De ce poate varia textura creatinei de la un lot la altul?

### 13. „creapure romania”

**Variante rulate:** Rulare brută – SERP natural (mix RO + creapure.com).

**primesupplements.ro:** Nu apare direct; apare INDIRECT prin creapure.com/en/buy-here (lista brandurilor partenere din România include Prime Supplements).

**Intenție dominantă:** COMERCIAL + NAVIGAȚIONAL (cine vinde Creapure în RO): produse Creapure (Genius, Way Better, Vitabolic, Decathlon), 2 pagini oficiale creapure.com, 1 PR, 1 top.

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://geniusnutrition.ro/products/creapure | geniusnutrition.ro (Genius Nutrition) | produs | Creapure® 300g / Genius Nutrition® |
| 2 | https://www.creapure.com/en/creapure-mono-products | creapure.com (Creapure (AlzChem)) | site brand ingredient | Creapure® mono products – creapure.com |
| 3 | https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina/creatina-monohidrata-better-creatine-creapure-300-g-way-better-p363230 | comenzi.farmaciatei.ro (Farmacia Tei) | produs | Creatina monohidrata Better Creatine Creapure, 300 g, Way B |
| 4 | https://www.creapure.com/en/buy-here/ | creapure.com (Creapure (AlzChem)) | site brand ingredient | BUY HERE / Creapure (listează brandurile partenere, inclusiv Prime Supplements) |
| 5 | http://www.saptamanamedicala.ro/articole/COSMO-PHARM-lanseaza-in-premiera-in-Romania-creatina-la-plic-Creatine-Creapurer-pentru-utilizare-zilnica | saptamanamedicala.ro (Săptămâna Medicală) | articol | COSMO PHARM lansează în premieră în România creatina la plic: Creatine Creapure® |
| 6 | https://www.nutriland.ro/en/products/vitabolic-pure-creatine-300g | nutriland.ro | produs | Creapure Creatine, powder, 300g, Vitabolic – Nutriland |
| 7 | https://en.wikipedia.org/wiki/Creaca | en.wikipedia.org | zgomot (irelevant) | Creaca (zgomot) |
| 8 | https://hyperfit.ro/blogs/nutritie/cea-mai-buna-creatina-top-creatine-disponibile-in-romania | hyperfit.ro | articol | Cea mai bună Creatină în 2026 — Top Creatine disponibile în România |
| 9 | https://www.decathlon.ro/p/creatina-monohidrata-certificata-creapure-fara-aroma-300g/_/R-p-327680 | decathlon.ro | produs | Creatină monohidrat Creapure® gust neutru 300g |

**Șabloane de titlu:** „Creapure® 300g | Brand”; „Creatina monohidrata … Creapure, 300 g, Brand”; „Creapure Creatine, powder, 300g, Brand”; „certificată Creapure®”; aproape toate includ 300 g.

**Snippet / definiție vizibilă:** Creapure.com: brandurile partenere din România listate – Chemp, Body Line (Platinum Pure Creatine), Pro Nutrition, Bavarian Elite, Vitabolic (Pure Creatine), Protella, Genius Nutrition, Prime Supplements. Codul QS din 6 cifre (stânga-jos pe ambalaj) se verifică pe creapure.com. Cosmo Pharm: „creatina la plic Creapure® – premieră în România” (format plic = concurent direct pentru Ready-To-Go).

**Întrebări asociate (PAA-style):** Cine vinde Creapure® în România? · Care branduri din România sunt partenere Creapure®? · Cum verific dacă un produs este Creapure® original? · Creapure® la plic există în România?

### 14. „creatina magazin online”

**Variante rulate:** Rulare brută – SERP natural RO. Rulare suplimentară: „creatina suplimente romania”.

**primesupplements.ro:** Nu apare (colecția /collections/creatina nu rankează).

**Intenție dominantă:** NAVIGAȚIONAL-COMERCIAL (găsește un magazin): homepage-uri de magazine + categorii „creatina”; eMAG categorie. Cuvintele „magazin online” din title/meta ale competitorilor sunt decisive.

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://shopbuilder.ro/creatina-c47 | shopbuilder.ro (Scitec (ShopBuilder)) | categorie | Creatină – ShopBuilder (magazinul Scitec) |
| 2 | https://www.suplimente-vitabolic.ro/ | suplimente-vitabolic.ro | homepage magazin | Vitabolic - Magazin online suplimente naturiste |
| 3 | https://ultra-slim.ro/ | ultra-slim.ro | homepage magazin | Magazin Online Proteine, Creatina, Aminoacizi, Suplimente si echipament sportiv |
| 4 | https://www.suplimente-vitabolic.ro/catalog-suplimente/creatina-si-volumizatoare/suta-la-suta-creatine-micronized-400g | suplimente-vitabolic.ro | produs | 100% Micronized Creatine Monohydrate 300g - Creatină - Vitabolic - Magazin online suplimente naturiste |
| 5 | https://gym-stack.ro/ | gym-stack.ro | homepage magazin | Magazin suplimente sportive si nutritive sala: Producatori de top! |
| 6 | https://www.fit4pro.ro/nutritie-sportiva/culturism/sanatate-si-creatina/ | fit4pro.ro | articol | Sănătate și… creatină - Magazin online de suplimente nutritive pentru sportivi |
| 7 | https://proteinplanet.ro/ | proteinplanet.ro (Protein Planet) | homepage magazin | Protein Planet |
| 8 | https://www.emag.ro/creatina/c | emag.ro | marketplace / comparator | Creatina. Vezi Preturi si Comanda Online - eMAG.ro |
| 9 | https://geniusnutrition.ro/collections/creatina | geniusnutrition.ro (Genius Nutrition) | categorie | Creatina / Magazin Online Genius Nutrition® |
| 10 | https://comenzi.farmaciatei.ro/dieta-si-wellness/suplimente-pentru-sportivi/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | categorie | [suplimente romania] Creatina Pentru Forta, Efort Si Progres Sustinut |
| 11 | https://www.drmax.ro/suplimente-alimentare/suplimente-pentru-sportivi/creatina | drmax.ro (Dr.Max) | categorie | [suplimente romania] Creatina – Dr.Max |
| 12 | https://www.decathlon.ro/sanatate-si-nutritie/creatina | decathlon.ro | categorie | [suplimente romania] Creatină monohidrată - suplimente pentru mușchi |
| 13 | https://www.nutriland.ro/en | nutriland.ro | homepage magazin | [suplimente romania] Sports supplements store - Nutriland |
| 14 | https://www.optimumnutrition.ro/creatina | optimumnutrition.ro (Optimum Nutrition RO) | categorie | [suplimente romania] Creatina de cea mai buna calitate - Optimum Nutrition Romania |

**Șabloane de titlu:** „Creatina | Magazin Online Brand®” (Genius); „… - Creatină - Vitabolic - Magazin online suplimente naturiste” (Vitabolic repetă „magazin online” în fiecare title); „Creatina. Vezi Preturi si Comanda Online - eMAG.ro”; „Creatina Pentru Forta, Efort Si Progres Sustinut” (Farmacia Tei – claim de forță în titlu).

**Snippet / definiție vizibilă:** Genius (meta categorie): „Comanda online suplimente cu creatina: Creatina Monohidrata, Creatina HCL, Creatina Creapure de la Genius Nutrition cu livrare in Romania.” – enumerarea tipurilor + „livrare în România” este șablonul care rankează.

**Întrebări asociate (PAA-style):** De unde cumpăr creatină online în România? · Ce magazin online de suplimente are creatină bună? · Creatina se găsește la farmacie?

### 15. „creatina monohidrata pura”

**Variante rulate:** Rulare brută: SERP spaniol/US (amazon.com ×2, tuasaude, nutrify.com.br, sinintermediarios.co, nutriactivity, hsnstore.eu ×2, ebay) → irelevant. A doua rulare: „creatină monohidrată pură”.

**primesupplements.ro:** Nu apare.

**Intenție dominantă:** COMERCIAL-INVESTIGAȚIONAL: produse single-ingredient (DY, GymBeam, Body Line Creapure, Pro Nutrition Creapure, NaturalPlus) + ghiduri „cea mai bună”.

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://dynutrition.ro/products/creatina-monohidrat-300g | dynutrition.ro (DY Nutrition) | produs | Creatină Monohidrată DY Nutrition |
| 2 | https://gymbeam.ro/creatina-monohidrata-gymbeam.html | gymbeam.ro | produs | 100% Creatină monohidrată micronizată - GymBeam |
| 3 | https://bodyline.ro/cresterea-masei-musculare/creatina-monohidrata/ | bodyline.ro (Body Line) | produs | Creatina Monohidrata Creapure® Pure Creatine Doar 89 Lei |
| 4 | https://gym-stack.ro/blogs/news/cea-mai-buna-creatina-monohidrata | gym-stack.ro | articol | Cea mai bună creatină monohidrată |
| 5 | https://naturalplus.ro/blogs/news/creatina-monohidrata-100-pura-supliment-alimentar-pentru-performanta-si-crestere-musculara | naturalplus.ro | articol | Creatină Monohidrată 100% Pură - Supliment Alimentar pentru Performanță și Creștere Musculară |
| 6 | https://www.pronutrition.ro/creatine-creapurer.html | pronutrition.ro (Pro Nutrition) | produs | Creatine Creapure® Pro Nutrition - Creatină monohidrată |
| 7 | https://www.bodyworld.eu/ro/ro/creatina-monohidrat-c259 | bodyworld.eu | categorie | Creatină Monohidrat – BodyWorld |
| 8 | https://naturalplus.ro/en/products/creatina-monohidratata | naturalplus.ro | produs | Creatină Monohidrată – NaturalPlus |
| 9 | https://highenergy.ro/blog/news/cea-mai-buna-creatina-monohidrata | highenergy.ro | articol | Cea mai bună creatină monohidrată: Ghid și Recomandări |

**Șabloane de titlu:** „Creatină Monohidrată 100% Pură”; „Pure Creatine”; „Creatine Creapure® Brand - Creatină monohidrată”. „Pură/100 %” apare în 5 din 9 titluri sau H1.

**Snippet / definiție vizibilă:** DY (snippet): „creatină monohidrată 100 % pură, 5 g/porție”; NaturalPlus: „fără adaosuri de zahăr, grăsimi sau alți aditivi”; Pro Nutrition: Creapure® = „creatină monohidrată de înaltă puritate, produsă în Germania”; „efectul benefic se obține cu un consum zilnic de cel puțin 3 g de creatină”. GymBeam: „puritate verificată în laborator” (publică rezultate).

**Întrebări asociate (PAA-style):** Ce înseamnă creatină monohidrată pură / 100 %? · Cum verific puritatea creatinei? · Creatina pură are aditivi? · Creapure® vs creatină pură generică – care e diferența?

### 16. „creatina 100% monohidrat”

**Variante rulate:** Rulare brută: SERP spaniol (amazon.com ×2, biotechusa.es, hsnstore.eu ×2, vitaminplanet.es, americannutrition.es, foodtech.cl, ibspot) → irelevant. A doua rulare: „creatină 100% monohidrat românia”.

**primesupplements.ro:** Nu apare.

**Intenție dominantă:** COMERCIAL: 6 produse (Scitec 300/500 g, GymBeam, Genius, DY, Myprotein) + 2 categorii + 1 căutare internă.

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.decathlon.ro/sanatate-si-nutritie/creatina | decathlon.ro | categorie | Creatină monohidrată - suplimente pentru mușchi |
| 2 | https://comenzi.farmaciatei.ro/cauti/creatina | comenzi.farmaciatei.ro (Farmacia Tei) | căutare internă retailer | Cauti "creatina"? – Farmacia Tei |
| 3 | https://geniusnutrition.ro/products/creatine-monohydrate-400g | geniusnutrition.ro (Genius Nutrition) | produs | Creatine Monohydrate 400g / Genius Nutrition® |
| 4 | https://dynutrition.ro/products/creatina-monohidrat-300g | dynutrition.ro (DY Nutrition) | produs | Creatină Monohidrată DY Nutrition |
| 5 | https://gymbeam.ro/creatina-monohidrat | gymbeam.ro | categorie | Creatină monohidrată / GymBeam.ro |
| 6 | https://gymbeam.ro/creatina-monohidrata-gymbeam.html | gymbeam.ro | produs | 100% Creatină monohidrată micronizată - GymBeam |
| 7 | https://scitec.ro/100-creatine-monohidrate/scitec-nutrition-100-creatine-monohydrate-300-gr-p2164 | scitec.ro | produs | 100% Creatine Monohydrate (300 gr.) - Scitec Nutrition |
| 8 | https://scitec.ro/100-creatine-monohidrate/scitec-nutrition-100-creatine-monohydrate-500-gr-q9581 | scitec.ro | produs | 100% Creatine Monohydrate (500 gr.) - Scitec Nutrition |
| 9 | https://www.myprotein.ro/p/sports-nutrition/creatina-monohidrata/12456626/ | myprotein.ro | produs | Cumpără Creatină monohidrată pulbere / MYPROTEIN™ |

**Șabloane de titlu:** „100% Creatine Monohydrate (300 gr.) - Brand” (Scitec – engleză, „gr.”); „100% Creatină monohidrată micronizată - Brand”; „Cumpără Creatină monohidrată pulbere | BRAND™”. „100 %” la început de titlu la 3 din 9.

**Snippet / definiție vizibilă:** Scitec (snippet): 3,4 g/porție; „produs în UE, ingredientele principale pot fi din afara UE”; Myprotein: „varianta fără aromă conține creatină monohidrat 100 %”; GymBeam: „testată regulat prin metoda HPLC”.

**Întrebări asociate (PAA-style):** Ce înseamnă „100 % creatină monohidrat”? · Creatina 100 % monohidrat are și alte ingrediente? · Unde este fabricată creatina (UE / Germania)?

### 17. „[extra] creatina micronizata vs monohidrata”

**Variante rulate:** Rulare brută („creatina micronizata vs monohidrata diferenta”): SERP spaniol/portughez (chilesuplementos, newpharma.cl, nutrisuplementos.pe, enasport, suplenet, topcreatina, palikostienda, iherb es, tiendavitalica). A doua rulare: „creatină micronizată sau monohidrată care este diferența”.

**primesupplements.ro:** DA: #7 și #8 cu două articole de blog (nu cu paginile de produs).

**Intenție dominantă:** INFORMAȚIONAL (comparație).

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://agerpres.ro/ots/creatina-monohidrat-vs-creatina-hcl-ce-alegi-cand-stomacul-decide-in-locul-tau--661333 | agerpres.ro | articol | Creatina monohidrat vs creatina HCl: ce alegi când stomacul decide în locul tău - AGERPRES (advertorial) |
| 2 | https://gym-stack.ro/blogs/news/cea-mai-buna-creatina-monohidrata | gym-stack.ro | articol | Cea mai bună creatină monohidrată |
| 3 | https://gymbeam.ro/creatina-micronizata-optimum-nutrition.html | gymbeam.ro | produs | Creatină micronizată - Optimum Nutrition |
| 4 | https://www.myprotein.ro/blog/suplimente/totul-despre-creatina-monohidrat/ | myprotein.ro | articol | Totul despre creatina monohidrat - Myprotein Blog |
| 5 | https://www.bodyworld.eu/ro/ro/creatina-monohidrat-c259 | bodyworld.eu | categorie | Creatină Monohidrat – BodyWorld |
| 6 | https://www.boost4life.ro/blogs/blog/de-ce-tot-mai-multi-oameni-iau-creatina-monohidrat-si-ce-spune-stiinta | boost4life.ro | articol | De ce tot mai mulți oameni iau creatină monohidrat - și ce spune știința |
| 7 | https://primesupplements.ro/blogs/news/micronized-creatine-monohydrate-plafonare-fizica-creatina-combinatii-suplimente | primesupplements.ro (PRIME SUPPLEMENTS) | articol | Plafonarea fizică: Când să te îngrijorezi și cum te ajută creatina în 2026 (PRIME #7) |
| 8 | https://primesupplements.ro/blogs/news/creatine-gummies-creatina-monohidrat-micronized-300g-fara-2 | primesupplements.ro (PRIME SUPPLEMENTS) | articol | Creatine Gummies vs. Monohidrat: 6 Semne de Stagnare Musculară în 2026 (PRIME #8) |
| 9 | https://clinicaltrials.gov/study/NCT06677359 | clinicaltrials.gov | articol | Impact of Creatine Monohydrate Micronized Supplementation … Older Adults (studiu) |

**Șabloane de titlu:** „X vs Y: ce alegi…”; „Totul despre…”; „ce spune știința”.

**Snippet / definiție vizibilă:** BodyWorld (snippet): micronizată ≈ 200 µm vs ≈ 500 µm standard → suprafață mai mare, solubilitate mai bună; Myprotein: „varianta micronizată este recomandată pentru că este eficientă și ieftină”; consens: aceeași substanță, aceeași eficiență, diferă doar dizolvarea/confortul digestiv.

**Întrebări asociate (PAA-style):** Care este diferența dintre creatina micronizată și monohidratul clasic? · Creatina micronizată lasă sediment în pahar? · Creatina HCL este mai bună decât monohidratul?

### 18. „[extra] creapure vs creatina monohidrata obisnuita”

**Variante rulate:** Rulare brută: SERP spaniol (fmasonline, merkabici, daliaramos, mgnutrition, familiasanaorganizada, biotechusa.es, topcreatina, fitstore.es, deportesluna). A doua rulare: „ce este creapure și prin ce diferă de creatina monohidrat obișnuită” → rezultate științifice (NCBI/PMC ×4, clinicaltrials) + hsnstore.eu, proteinsuppliesaustralia, xendurance. Nicio pagină RO în top 10 → NIȘĂ LIBERĂ pentru o secțiune/FAQ în română.

**primesupplements.ro:** Nu apare.

**Intenție dominantă:** INFORMAȚIONAL (comparație) – fără rezultate RO.

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12291177/ | ncbi.nlm.nih.gov | articol | Creatine monohydrate versus creatine hydrochloride … RCT |
| 2 | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3479057/ | ncbi.nlm.nih.gov | articol | A buffered form of creatine does not promote greater changes … than creatine monohydrate |
| 3 | https://www.hsnstore.eu/blog/supplements/sport-performance/creatine/differences-between-creatine-monohydrate-and-creapure/ | hsnstore.eu | articol | Differences Between Creatine Monohydrate and Creapure |
| 4 | https://www.proteinsuppliesaustralia.com.au/blogs/articles/creatine-vs-creapure-which-is-better | proteinsuppliesaustralia.com.au | articol | Creatine vs Creapure: Which is Better? |
| 5 | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9126436/ | ncbi.nlm.nih.gov | articol | Pharmacokinetic Evaluation of a Single 5-Gram Bolus of Creatine Monohydrate… |
| 6 | https://xendurance.com/blogs/blog/is-creapure-creatine-truly-superior-a-deep-dive-into-benefits-science-and-comparisons | xendurance.com | articol | Is Creapure® Creatine Truly Superior? |

**Șabloane de titlu:** „Creatine vs Creapure: Which is Better?”; „Differences Between…”.

**Snippet / definiție vizibilă:** Creapure® = marcă de creatină monohidrat (AlzChem, Trostberg), nu o formă chimică diferită; diferența = puritate/control al fabricației/trasabilitate (DCD, DHT, creatinină), nu eficiență superioară; preț mai mare.

**Întrebări asociate (PAA-style):** Creapure® este mai eficientă decât creatina monohidrat obișnuită? · Merită să plătesc mai mult pentru Creapure®? · Ce impurități poate avea creatina (DCD, DHT, creatinină)?

### 19. „[extra] cum se ia / cand se ia creatina”

**Variante rulate:** Rulare: „cum se ia creatina cand se ia inainte sau dupa antrenament”.

**primesupplements.ro:** Nu apare (PRIME are articolul /blogs/news/cum-se-ia-creatina, care rankează #5 la „câtă creatină pe zi”).

**Intenție dominantă:** INFORMAȚIONAL (mod de administrare).

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://vilgain.ro/cand-este-cel-mai-bine-sa-luati-creatina | vilgain.ro | articol | Când este cel mai bine să luați creatină? |
| 2 | https://www.biod.ro/cand-se-ia-creatina/ | biod.ro | articol | Cand se ia Creatina - Creatina Inainte sau Dupa Antrenament |
| 3 | https://www.reginamaria.ro/articole-medicale/alimentatie-sanatoasa/creatina-ce-este-cum-se-utilizeaza-contraindicatii | reginamaria.ro (Regina Maria (medical)) | articol | Creatina: ce este, cum se utilizeaza, contraindicatii |
| 4 | https://sportaholic.ro/cand-se-ia-creatina/ | sportaholic.ro | articol | Cand se ia creatina? Inainte sau dupa antrenament. Afla aici |
| 5 | https://goldnutrition.ro/blog/creatina-tot-ce-trebuie-sa-stii | goldnutrition.ro | articol | Creatina Monohidrata: tot ce trebuie să știi în 2026 |
| 6 | https://zitamine.ro/blogs/vitamine-si-suplimente-naturale/cand-iei-suplimente-sportive-inainte-sau-dupa-sala | zitamine.ro | articol | Când iei suplimente sportive: Înainte sau după sală? |
| 7 | https://transylvanianutrition.com/blogs/blogs/cand-se-ia-creatina-inainte-sau-dupa-antrenament-1776319710284 | transylvanianutrition.com | articol | Cand se ia creatina: inainte sau dupa antrenament? |
| 8 | https://www.steroizi.ro/cand-sa-iei-creatina/ | steroizi.ro | articol | Cand sa iei creatina - steroizi.ro |

**Șabloane de titlu:** „Când se ia creatina? Înainte sau după antrenament” – întrebarea exactă în titlu.

**Snippet / definiție vizibilă:** Consens: 3–5 g/zi, zilnic (și în zilele fără antrenament); momentul contează puțin; ușor avantaj după antrenament cu carbohidrați/proteine; faza de încărcare opțională (20 g/zi, 5–7 zile).

**Întrebări asociate (PAA-style):** Când se ia creatina: înainte sau după antrenament? · Se ia creatina și în zilele fără antrenament? · Creatina se ia dimineața sau seara? · Creatina se ia înainte sau după masă? · Cu cât timp înainte de antrenament se ia creatina?

### 20. „[extra] cata creatina pe zi / faza de incarcare”

**Variante rulate:** Rulare: „câtă creatină pe zi 3g sau 5g faza de încărcare”.

**primesupplements.ro:** DA: #5 cu articolul „Cum se ia creatina: doza pe zi și momentul optim”.

**Intenție dominantă:** INFORMAȚIONAL (dozaj).

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.secom.ro/blogs/ghidul-secom/totul-despre-creatina-ce-este-beneficii-si-cum-se-administreaza-corect | secom.ro | articol | Totul despre creatina: beneficii, dozaj si cum se ia corect – Secom |
| 2 | https://www.myprotein.ro/blog/suplimente/creatina-incarcare-sau-ciclizare-dozaj-recomandat/ | myprotein.ro | articol | Creatina: încărcare sau ciclizare, dozaj recomandat – Myprotein |
| 3 | https://www.advancednutrition.ro/blog/despre-creatina.html | advancednutrition.ro | articol | Creatina ᐈ Ce este, cum funcționează și cum să o folosești corect |
| 4 | https://www.ocnamuresonline.ro/13281-faza-de-incarcare-cu-creatina-este-necesara-pentru-tine-sau-nu | ocnamuresonline.ro | articol | Faza de încărcare cu creatină |
| 5 | https://primesupplements.ro/blogs/news/cum-se-ia-creatina | primesupplements.ro (PRIME SUPPLEMENTS) | articol | Cum se ia creatina: doza pe zi și momentul optim (PRIME #5) |
| 6 | https://bigprotein.ro/creatina-beneficii-doze-ghid/ | bigprotein.ro | articol | Creatina: Tot Ce Trebuie Să Știi în 2026 (Doze, Beneficii) |
| 7 | https://suplepro.ro/cata-creatina-ar-trebui-sa-consumi-zilnic/ | suplepro.ro | articol | Câtă creatină ar trebui să consumi zilnic? |
| 8 | https://transylvanianutrition.com/blogs/blogs/mituri-despre-creatina-20260305-fw0r | transylvanianutrition.com | articol | Mituri despre creatina: adevărul bazat pe știință |
| 9 | https://allnutrition.ro/blog-8/Cand_incepe_sa_functioneze_creatina-blog2486.html | allnutrition.ro | articol | Când începe să funcționeze creatina? |

**Șabloane de titlu:** „Câtă creatină … pe zi?”; „Faza de încărcare … este necesară?”; „Tot ce trebuie să știi în 2026 (Doze, Beneficii)”.

**Snippet / definiție vizibilă:** 3–5 g/zi menținere; încărcare opțională 20 g/zi în 4 doze × 5–7 zile; fără încărcare saturația vine în ~3–4 săptămâni; reper 0,03 g/kg; „când începe să funcționeze” = 2–4 săptămâni.

**Întrebări asociate (PAA-style):** Câtă creatină trebuie să iau pe zi? · 3 g sau 5 g de creatină pe zi? · Este necesară faza de încărcare? · După cât timp începe să funcționeze creatina? · Cât timp se ia creatina / se face pauză?

### 21. „[extra] creatina pentru femei”

**Variante rulate:** Rulare: „creatina pentru femei beneficii”.

**primesupplements.ro:** Nu apare.

**Intenție dominantă:** INFORMAȚIONAL (segment femei / menopauză / 40+).

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.herbalife.com/ro-ro/resurse-pentru-wellness/in-spatele-stiintei/creatina-pentru-femei | herbalife.com | articol | Este creatina sigură pentru femei? Poate ajuta în timpul menopauzei? |
| 2 | https://ro.iherb.com/blog/creatine-women-benefits/1942 | ro.iherb.com | articol | Creatina pentru femei: 5 beneficii Incredibile |
| 3 | https://dynutrition.ro/blogs/press-releases/este-creatina-un-supliment-potrivit-si-pentru-femei | dynutrition.ro (DY Nutrition) | articol | Este creatina un supliment potrivit și pentru femei? – DY |
| 4 | https://bodyline.ro/creatina-pentru-femei/ | bodyline.ro (Body Line) | articol | Creatina Pentru Femei, Pro Sau Contra. Cele 10 Beneficii. |
| 5 | https://hyperfit.ro/blogs/nutritie/creatina-pentru-femei | hyperfit.ro | articol | Creatina pentru femei: Tipuri, beneficii si mituri |
| 6 | https://zitamine.ro/blogs/vitamine-si-suplimente-naturale/creatina-beneficii-efecte-supliment | zitamine.ro | articol | Creatina: Beneficii, efecte și tot ce trebuie să știi |
| 7 | https://bodyshapetransformation.com/creatina-pentru-femei-dupa-40-ce-beneficii-are-si-de-ce-se-vorbeste-atat-de-mult-despre-ea/ | bodyshapetransformation.com | articol | Creatina pentru femei după 40 |
| 8 | https://vreinuvrei.ro/creatina-ar-putea-aduce-beneficii-mai-mari-femeilor-decat-barbatilor-arata-noi-cercetari/ | vreinuvrei.ro | articol | Creatina ar putea aduce beneficii mai mari femeilor… |
| 9 | https://med.ro/nutritie/creatina/ | med.ro | articol | Creatina: tot ce trebuie sa stii despre consum, beneficii si riscuri - Med.Ro |

**Șabloane de titlu:** „Creatina pentru femei: …”, „după 40”, „menopauză”, „pro sau contra”.

**Snippet / definiție vizibilă:** Întrebările recurente: siguranță pentru femei, îngrășare/retenție, menopauză, 40+. (Pentru paginile noastre: răspuns doar cu claim-ul autorizat + claim-ul 55+ cu condițiile complete; fără promisiuni.)

**Întrebări asociate (PAA-style):** Este creatina bună pentru femei? · Creatina îngrașă femeile? · Creatina este utilă la menopauză / după 40 de ani?

### 22. „[extra] creatina ingrasa / retine apa / efecte secundare / rinichi”

**Variante rulate:** Rulări: „creatina ingrasa retine apa” și „creatina efecte secundare rinichi ingrasa”.

**primesupplements.ro:** Nu apare.

**Intenție dominantă:** INFORMAȚIONAL (temeri/mituri).

| # | URL | Domeniu | Tip pagină | Titlu / notă |
|---|-----|---------|------------|--------------|
| 1 | https://www.kudika.ro/comunitate/forum/view_topic/41046/Creatina-ingrasa.html | kudika.ro | forum / Q&A | Creatina ingrasa? – forum Kudika |
| 2 | https://www.secom.ro/blogs/ghidul-secom/totul-despre-creatina-ce-este-beneficii-si-cum-se-administreaza-corect | secom.ro | articol | Totul despre creatina – Secom |
| 3 | https://suplimentezone.ro/este-creatina-sanatoasa-retine-apa-in-organism/ | suplimentezone.ro | articol | Este creatina sanatoasa? Reține apa în organism? |
| 4 | https://hyperfit.ro/blogs/nutritie/creatina-efecte-negative | hyperfit.ro | articol | Creatina: Exista efecte negative, contraindicații și riscuri reale? |
| 5 | https://www.cosmopharm.eu/sfatul-specialistului/creatina-monohidrat-si-retentia-de-apa-ce-se-intampla-daca-nu-te-hidratezi-corect/ | cosmopharm.eu | articol | Creatina și retenția de apă: mit sau realitate? - Cosmo Pharm |
| 6 | https://www.pronutrition.ro/blog/post/creatina-mituri-realitati-demontate.html | pronutrition.ro (Pro Nutrition) | articol | Creatina: demontarea miturilor – Pro Nutrition |
| 7 | https://www.tpu.ro/sport/buna-ziua-daca-iau-creatina-sa-ma-ingras-si-dupa-o-perioada-intrerup-cum-sa-fac-sa-nu-slabesc-la-loc-sa-iau-pe-langa_1/ | tpu.ro | forum / Q&A | Daca iau creatina sa ma ingras… – TPU |
| 8 | https://www.medlife.ro/articole-medicale/creatina-beneficii-proprietati-utilizari | medlife.ro (MedLife (medical)) | articol | Creatina: beneficii, proprietati, utilizari – MedLife |
| 9 | https://dozadesanatate.ro/este-creatina-sigura-pentru-rinichi/ | dozadesanatate.ro | articol | Este creatina sigură pentru rinichi? |
| 10 | https://www.topculturism.ro/efectele-adverse-ale-creatinei-tot-ce-trebuie-sa-stii/ | topculturism.ro | articol | Efectele adverse ale creatinei |
| 11 | https://medro.org/luarea-de-creatina-te-ingrasa | medro.org | articol | Luarea de creatină te îngrașă? - MedRo |

**Șabloane de titlu:** Întrebarea exactă în titlu: „Creatina îngrașă?”, „Este creatina sigură pentru rinichi?”, „mit sau realitate?”.

**Snippet / definiție vizibilă:** Consens: creșterea inițială 1–2 kg = apă intracelulară, nu grăsime; creatinina serică poate crește fără afectare renală; precauție la afecțiuni renale preexistente. (Pentru site: NU se fac afirmații de siguranță – „sigură”, „fără efecte secundare” sunt interzise; se trimite la avertismentele de pe etichetă și la medic.)

**Întrebări asociate (PAA-style):** Creatina îngrașă? · Creatina reține apă? · Creatina afectează rinichii? · Creatina are efecte secundare? · Creatina crește creatinina din analize? · Creatina cauzează căderea părului?

## A. Tabel de frecvență a domeniilor (16 interogări de bază, rezultatele RO)

| Domeniu | Competitor / grup | Interogări (din 16) | Apariții totale | Tipuri de pagini care rankează |
|---------|-------------------|---------------------|-----------------|--------------------------------|
| comenzi.farmaciatei.ro | Farmacia Tei | 14 | 24 | căutare internă retailer ×9, produs ×9, articol ×4, categorie ×2 |
| drmax.ro | Dr.Max | 11 | 13 | produs ×7, categorie ×4, articol ×2 |
| gymbeam.ro | GymBeam | 9 | 13 | produs ×8, categorie ×5 |
| decathlon.ro | Decathlon | 7 | 11 | categorie ×6, produs ×5 |
| nutriland.ro | Nutriland | 7 | 11 | produs ×6, categorie ×4, homepage magazin ×1 |
| gym-stack.ro | Gym-Stack | 7 | 7 | articol ×4, produs ×1, categorie ×1, homepage magazin ×1 |
| geniusnutrition.ro | Genius Nutrition | 6 | 6 | produs ×5, categorie ×1 |
| reginamaria.ro | Regina Maria (medical) | 6 | 6 | articol ×6 |
| dynutrition.ro | DY Nutrition | 5 | 6 | produs ×3, articol ×2, categorie ×1 |
| myprotein.ro | MyProtein | 5 | 6 | articol ×3, categorie ×2, produs ×1 |
| highenergy.ro | HighEnergy | 5 | 5 | articol ×3, produs ×2 |
| emag.ro | eMAG | 4 | 4 | căutare internă retailer ×3, marketplace / comparator ×1 |
| pronutrition.ro | Pro Nutrition | 4 | 4 | articol ×2, produs ×2 |
| allnutrition.ro | Allnutrition | 3 | 5 | categorie ×3, articol ×2 |
| altex.ro | Altex | 3 | 3 | marketplace / comparator ×3 |
| creatina.compari.ro | Compari | 2 | 4 | marketplace / comparator ×4 |
| suplimente-vitabolic.ro | Vitabolic | 2 | 3 | produs ×2, homepage magazin ×1 |
| bodyline.ro | Body Line | 2 | 2 | produs ×2 |
| catena.ro | Catena (farmacie) | 2 | 2 | articol ×2 |
| comenzi.bebetei.ro | Farmacia Tei (Bebe Tei) | 2 | 2 | categorie ×1, produs ×1 |
| hyperfit.ro | HyperFit | 2 | 2 | articol ×2 |
| optimumnutrition.ro | Optimum Nutrition RO | 2 | 2 | categorie ×2 |
| primesupplements.ro | PRIME SUPPLEMENTS | 2 | 2 | articol ×1, produs ×1 |
| creapure.com | Creapure (AlzChem) | 1 | 2 | site brand ingredient ×2 |
| forum.softpedia.com | — | 1 | 2 | forum / Q&A ×2 |
| naturalplus.ro | NaturalPlus | 1 | 2 | articol ×1, produs ×1 |
| romedic.ro | — | 1 | 2 | forum / Q&A ×2 |
| scitec.ro | Scitec | 1 | 2 | produs ×2 |
| bodyworld.eu | BodyWorld | 1 | 1 | categorie ×1 |
| brainmarket.ro | BrainMarket | 1 | 1 | produs ×1 |
| fit4pro.ro | Fit4Pro | 1 | 1 | articol ×1 |
| goldnutrition.ro | GoldNutrition | 1 | 1 | produs ×1 |
| liniadestart.ro | Linia de Start (afiliat) | 1 | 1 | articol ×1 |
| naturecan.ro | Naturecan | 1 | 1 | produs ×1 |
| naturitas.ro | Naturitas | 1 | 1 | produs ×1 |
| nmn.ro | nmn.ro | 1 | 1 | produs ×1 |
| nutriline.ro | Nutriline | 1 | 1 | categorie ×1 |
| nutrivor.ro | Nutrivor | 1 | 1 | produs ×1 |
| olimpsport.ro | Olimp | 1 | 1 | categorie ×1 |
| pareriadevarate.ro | Pareri Adevarate (afiliat) | 1 | 1 | articol ×1 |
| price.ro | price.ro | 1 | 1 | marketplace / comparator ×1 |
| proteinplanet.ro | Protein Planet | 1 | 1 | homepage magazin ×1 |
| remediumfarm.ro | Remedium Farm | 1 | 1 | produs ×1 |
| ro.wikipedia.org | Wikipedia RO | 1 | 1 | enciclopedie ×1 |
| saptamanamedicala.ro | Săptămâna Medicală | 1 | 1 | articol ×1 |
| sfatulmedicului.ro | — | 1 | 1 | articol ×1 |
| shopbuilder.ro | Scitec (ShopBuilder) | 1 | 1 | categorie ×1 |
| sportguru.ro | SportGuru | 1 | 1 | categorie ×1 |
| topguides.ro | TopGuides (afiliat) | 1 | 1 | articol ×1 |
| tpu.ro | — | 1 | 1 | forum / Q&A ×1 |
| ultra-slim.ro | Ultra-Slim | 1 | 1 | homepage magazin ×1 |

**Competitorii numiți de proprietar – unde și cu ce rankează:**

| Brand | Site propriu în top 10? | Prin retaileri | Pagini care rankează |
|-------|-------------------------|----------------|----------------------|
| Genius Nutrition | DA (6 interogări) | Nutriland (Creapure 300g), HyperFit (top) | `/products/creapure` („Creapure® 300g”), `/products/creatine-monohydrate-400g` („Creatine Monohydrate 400g”, 133 porții × 3 g, H2 „Intrebari frecvente”), `/collections/creatina` (meta: „Creatina Monohidrata, Creatina HCL, Creatina Creapure… livrare in Romania”) |
| Vitabolic | DA (2) | Farmacia Tei („Creatina, 300 g, Vitabolic”), Decathlon, Nutriland („Creapure Creatine 300g Vitabolic”) | produs „100% Micronized Creatine Monohydrate 300g” (meta description = doar „creatina” – slab), homepage „Magazin online suplimente naturiste”; listat pe creapure.com |
| Pro Nutrition | DA (4) | Dr.Max („Creatina monohidrata Creapure, 500g, Pro Nutrition”), Altex, Farmacia Tei (capsule 150) | `/creatine-creapurer.html` („Creatine Creapure® Pro Nutrition - Creatină monohidrată”), `/creatine-powder.html`, blog „beneficii, administrare, mituri” (rankează pe „creatina” și „cea mai buna creatina”); listat pe creapure.com |
| DY Nutrition | DA (5) | HyperFit (top) | `/products/creatina-monohidrat-300g` („Creatină Monohidrată DY Nutrition”, meta: „100% creatină monohidrată pură, 5g/porție… Fără fază de încărcare… cGMP”), `/collections/creatine`, blog „Tot ce trebuie să știi despre creatină”, blog „creatina pentru femei” |
| GymBeam | DA (9) | eMAG, Compari | `/creatina-creapure-gymbeam.html` (FAQPage + QAPage + Certification + VideoObject schema, H2 „Puritatea de 99,9 %…”, „Cum recunoașteți Creapure® original”, „Rezultatele testelor de laborator”), `/creatina-monohidrata-gymbeam.html`, `/creatina-micronizata-optimum-nutrition.html`, categorii `/creatina`, `/creatina-monohidrat` |
| Myprotein | DA (5) | eMAG | categoria `/c/nutrition/creatine/creatine-monohydrate/` (H3-uri FAQ: „Creatina monohidrată este potrivită și pentru adulții peste 55 de ani?” etc.), produs „Cumpără Creatină monohidrată pulbere”, 3 articole de blog |
| eMAG | DA (4) | — | categoria `/creatina/c` („Creatina. Vezi Preturi si Comanda Online”), pagini de căutare `/search/creatina+…` (micronizata, 500g, monohidrata creapure) |
| Decathlon | DA (7) | — | produs marcă proprie „Creatină monohidrat Creapure® gust neutru 300g” (2 URL-uri), categorii `/sanatate-si-nutritie/creatina`, ON 317 g |
| Scitec | DA (1) + ShopBuilder (1) | Farmacia Tei („…fara aroma, 300 g, Scitec”), gym-stack | „100% Creatine Monohydrate (300 gr.)” / „(500 gr.)” |
| Weider | NU | Dr.Max, Decathlon, topuri („Weider Pure Creatine (Creapure)”) | — |
| Olimp | DA (1) | Dr.Max („Pudra de creatina monohidrata, 250g, Olimp”), eMAG | categoria `/collections/creatina` (title cu „LIVRARE GRATUITA”) |
| BioTechUSA | NU (site RO absent) | Dr.Max („…Creatine Monohydrate, 300g, BioTechUSA”), Naturitas („100% creatina monohidrat, fara aroma”) | — |
| Optimum Nutrition | DA (optimumnutrition.ro, 2) | GymBeam, gym-stack, Nutriland, Decathlon (Micronised Creatine 317 g) | categoria „Creatina de cea mai buna calitate - Optimum Nutrition Romania” |
| OstroVit | NU (site propriu) | Dr.Max, Farmacia Tei, Bebe Tei, HighEnergy (cele mai multe apariții pe „fara aroma”, „500g”, „pret”) | — |

**Alți jucători relevanți (nenumiți de proprietar):** Farmacia Tei / Bebe Tei (cel mai frecvent domeniu – pagini de produs cu titlu-șablon + pagina de căutare internă `/cauti/creatina` + articol „ingrediente active”), Dr.Max (produse + categorie + articol), Nutriland (produse/colecții în engleză!), gym-stack (ghid „Cea mai bună creatină monohidrată” + produse), HighEnergy (ghid + produse), HyperFit (top 2026 cu FAQPage), Allnutrition (categorii „CEL MAI IEFTIN” + bloguri), Regina Maria (articol medical care rankează pe 6 din 16 interogări – inclusiv comerciale), Compari/price.ro/Altex (comparatoare), afiliați (Pareri Adevarate, TopGuides, Linia de Start), Body Line (Creapure, preț în titlu), Naturecan, GoldNutrition, Nutriline, Z-Konzept/Remedium Farm, Way Better, Quamtrax, Kinetica, Cosmo Pharm (Creapure la plic).

## B. Întrebările pe care le pun oamenii (deduplicate, română)

Sursa fiecărei întrebări: **S** = Google Suggest RO (real), **F** = FAQ schema/FAQ vizibil la competitori, **T** = titlu de pagină care rankează, **Fo** = forum. Grupate pe intenție; cele marcate ★ sunt direct utile pentru FAQ-ul din `custom.seo_produs` al produselor A/B (răspuns doar cu fapte de etichetă + claim-urile autorizate).

**Definiție / ce este**

| Întrebare | Sursă |
|-----------|-------|
| Ce este creatina? | S,T |
| Ce este creatina monohidrată? | F,T |
| Ce este creatina micronizată? ★ | S,F |
| Ce este Creapure®? ★ | F,T |
| Care este diferența dintre creatină și creatinină (serică)? | S,T |
| Creatina este un aminoacid? | S |
| În ce alimente se găsește creatina? | S,T |
| Ce rol are creatina în organism? | S |

**Alegere / comparație (comercial)**

| Întrebare | Sursă |
|-----------|-------|
| Care este cea mai bună creatină? (răspuns prin criterii, nu prin auto-proclamare) | S,T |
| Care este cea mai bună creatină monohidrată? | S,T |
| Cea mai bună creatină pentru femei / bărbați / începători? | S |
| Creatina micronizată sau monohidrată – care este diferența? ★ | S,F,T |
| Creapure® vs creatina monohidrat obișnuită – care este diferența? ★ | F,T,Fo |
| Creapure® este micronizată? ★ | F |
| Creatina monohidrat sau HCL? | T,Fo |
| Pudră, capsule, jeleuri sau plicuri – ce aleg? ★ | F,S |
| Creatina cu aromă sau fără aromă? ★ | F,S |
| Ce înseamnă creatină 100 % / pură? ★ | T |
| Cum verific puritatea creatinei (teste de laborator, HPLC, cod QS Creapure®)? ★ | F |
| Cum recunosc Creapure® original? ★ | F |
| Ce tipuri de creatină există? | T |
| Creatina ieftină este la fel de bună? | S |

**Dozare / administrare**

| Întrebare | Sursă |
|-----------|-------|
| Cum se ia creatina? ★ | S,T |
| Câtă creatină pe zi – 3 g sau 5 g? ★ | S,T,F |
| Când se ia creatina: înainte sau după antrenament? ★ | S,T,F |
| Se ia creatina și în zilele fără antrenament? ★ | T |
| Creatina se ia dimineața sau seara? | S |
| Creatina se ia înainte sau după masă / pe stomacul gol? | S |
| Este necesară faza de încărcare? ★ | S,T |
| Cât timp se ia creatina și se face pauză? | S |
| După cât timp începe să funcționeze creatina? | T |
| Cu ce se amestecă creatina (apă, suc, shake)? ★ | S,F |
| Câte grame are o măsură / cupa este inclusă? ★ | F |
| Creatina se poate lua cu proteine / cafea / alcool? | S |
| Câte porții are tubul de 300 g / 500 g? ★ | T |
| Creatina expiră? Cât este valabilă după deschidere? | F |

**Efecte / temeri (de tratat prudent – fără claim-uri de siguranță)**

| Întrebare | Sursă |
|-----------|-------|
| Creatina îngrașă? Reține apă? | S,T,Fo |
| Creatina afectează rinichii? | S,T,Fo |
| Creatina are efecte secundare / contraindicații? | S,T |
| Creatina crește creatinina la analize? | S,T |
| Creatina cauzează căderea părului? | F |
| Creatina este bună pentru femei / la menopauză / după 40–50 de ani? | S,T |
| Creatina ajută creierul / memoria? | S |
| Creatina la 14–17 ani? | Fo |
| Creatina în sarcină / alăptare? | S |
| Creatina este sigură pentru stomac (balonare)? | F |

**Preț / unde cumpăr**

| Întrebare | Sursă |
|-----------|-------|
| Cât costă creatina? (nu se răspunde cu prețuri în text) | S,T |
| Cine vinde Creapure® în România? ★ | T |
| De unde cumpăr creatină online / la farmacie? | S,T |
| Creatina de la Lidl / Carrefour / dm este bună? | S |

## C. Variante de cuvinte-cheie (forme tastate real vs forme din titlurile care rankează)

Observație generală din Google Suggest RO: **toate** sugestiile sunt fără diacritice („creatina monohidrata”, „creatina creapure”, „creatina fara aroma”). Google tratează formele cu/fără diacritice ca echivalente pentru ranking, dar snippet-ul și bold-ul urmează forma tastată. Paginile care rankează folosesc ambele: farmaciile (Tei, Dr.Max) și Genius/Vitabolic/Olimp scriu fără diacritice; GymBeam, Myprotein, Decathlon, DY scriu cu diacritice. Recomandare pentru paginile noastre: title/H1/meta cu diacritice corecte (ș, ț cu virgulă), iar `shopify--discovery--product_search_boost.queries` + textul din `seo_produs` să conțină și formele fără diacritice și formele englezești de pe etichetă.

| Concept | Forme tastate (Suggest RO / SERP) | Forme din titlurile care rankează | Note |
|---------|-----------------------------------|-----------------------------------|------|
| creatină | creatina · creatina monohidrata · creatina creapure · creatina micronizata · creatina pudra · creatina pret · creatina fara aroma · creatina 300g · creatina 500g · creatina pura | Creatină / Creatina / Creatine | Suggest: top 10 pe „creatina” = monohidrata, beneficii, gymbeam, farmacia tei, creapure, jeleuri, serica, micronizata |
| monohidrat | creatina monohidrata · creatina monohidrat · creatine monohidrat · creatine monohidrata · creatina monohidrate | Creatină monohidrată · Creatina Monohidrata · Creatină Monohidrat · Creatine Monohydrate · 100% Creatine Monohydrate | eMAG indexează pagini de căutare pentru fiecare variantă ortografică → toate formele au volum |
| micronizată | creatina micronizata · creatina monohidrata micronizata · creatina micronizata creapure · creatina micronizata vs monohidrata · creatina micronizata ce este | micronizată · micronizata · Micronized · Micronised · „ultra pura” | Suggest leagă „micronizata” de Optimum Nutrition (317 g / 634 g) și GymBeam |
| Creapure® | creatina creapure · creapure · creapure creatina · creatina creapure monohidrata · creatina creapure 500g · creatina creapure pret · creapure romania · creapure® · creapure germany | Creapure® (cu ®) · Creapure · „certificată Creapure®” · „100% Creapure®” · „Creatine WITH Creapure®” | Suggest: „creatina creapure” + capsule / 500g / gymbeam / farmacia tei / dr max / decathlon / weider / pret |
| fără aromă | creatina fara aroma · creatina monohidrata fara aroma · creatina pudra fara aroma · creatina creapure fara aroma · creatina monohidrata fara aroma 300g/500g | fara aroma · Fără Aromă · gust neutru · neutra · Unflavoured / Unflavored · No aroma | Decathlon folosește „gust neutru” și „fără aromă” pe două URL-uri ale aceluiași produs; eticheta B: „Unflavoured” |
| pudră | creatina pudra · creatina pudra fara aroma · creatina pulbere | pudra · Pudră · pulbere · Powder · „sub forma de pulbere” | Myprotein: „pulbere”; farmacii: „pudra” |
| gramaj | creatina 300g · creatina 500g · creatina 300g creapure · creatina 500g creapure · creatina 300g pura · creatina 500g monohidrata | 300g · 300 g · 500 g · (300 gr.) · 317g · 400g · 250g · „300/500 g” | Tastat fără spațiu („300g”); pe site se scrie cu spațiu („300 g”) – ambele forme în search boost |
| pură / 100 % | creatina pura · creatina monohidrata pura · creatina 100% monohidrat · creatina 300g 100 pura | 100% Pură · 100% Creatină monohidrată · Pure Creatine · „ultra pura” · 100% Creatine Monohydrate | „Pură” este acceptabil ca descriere a compoziției (un singur ingredient); NU „cea mai pură” |
| preț | creatina pret · creatina pret farmacie · creatina pret romania · creatina pret bun · creatina ieftina · creatina pret analiza (≠ supliment) | Preturi · Oferte · ieftine · „CEL MAI IEFTIN” · „Doar 89 Lei” | Nu se afișează prețuri în texte; intenția se acoperă prin „porții per tub” și „cost per porție” fără cifre de preț |
| cea mai bună | cea mai buna creatina · cea mai buna creatina monohidrata · cea mai buna creatina creapure · cea mai buna creatina pentru femei / barbati / de pe piata / din lume / forum / capsule | Cea mai bună creatină (monohidrată) în 2026 · Top · Ghid și Recomandări · Pareri · Recenzii | Răspuns permis: criterii obiective (formă, ingredient unic, puritate verificabilă, porții, gramaj, aromă) – niciodată „a noastră este cea mai bună” |
| recenzii / păreri | creatina pareri · creatina forum · creatina reddit · creatina lidl pareri | Pareri · Recenzii · „Părerile clienților” · „Customer Reviews” | Fără recenzii/număr de recenzii inventate; doar recenziile reale din app |
| formă | creatina capsule · creatina pastile · creatina jeleuri · creatina plicuri · creatina efervescenta · creatina lichida · creatina hcl | capsule · tablete · jeleuri (gummies) · plic · efervescent · HCL · Kre-Alkalyn | Plicurile efervescente Ready-To-Go acoperă „creatina plicuri / efervescenta” |
| administrare | cum se ia creatina · cand se ia creatina · cata creatina pe zi · creatina inainte sau dupa antrenament · creatina faza de incarcare · pauza creatina · cat timp se ia creatina | Cum se ia · Când se ia · Câtă creatină pe zi · Faza de încărcare | Toate fără diacritice în Suggest |
| temeri | creatina ingrasa · creatina retine apa · creatina rinichi · creatina efecte secundare · creatina contraindicatii · creatina reactii adverse | îngrașă · reține apă · rinichi · efecte secundare · contraindicații | Se tratează prudent, fără claim-uri de siguranță |
| segmente | creatina pentru femei · creatina dupa 40 ani · creatina dupa 50 ani · creatina la copii / 14 ani · creatina in sarcina | pentru femei · după 40 · menopauză · 55+ | 55+ doar cu claim-ul autorizat complet (antrenament de rezistență regulat, 3 g/zi) |
| branduri/retaileri în coadă | creatina gymbeam · farmacia tei · dr max · decathlon · emag · lidl · carrefour · dm · secom · cosmopharm · dy nutrition · pro nutrition · biotech · balkan · evogen · ostrovit · optimum nutrition | — | Nu se numesc competitori pe site; doar pentru înțelegerea pieței |

## D. Ce înseamnă pentru paginile A, B și colecție (concluzii operaționale)

1. **Intenția termenilor cu atribut este tranzacțională** → paginile de produs pot rankează direct, dar numai cu titluri-șablon complete: concept + „monohidrat(ă)” + atribut (micronizată / Creapure® / fără aromă) + gramaj + brand. Titlurile live actuale („Creatină Creapure® monohidrată 300/500 g | Prime Supplements”, „Creatină monohidrată micronizată 300 g | Prime Supplements”) respectă șablonul; lipsesc din titlul B cuvintele „fără aromă” (9/9 titluri care rankează pe „fara aroma” le conțin) și din titlul A „micronizată” (în H1 există). Sugestii de title (nu de titlu de produs, care nu se schimbă): A „Creatină monohidrată Creapure® 300 g / 500 g | Prime Supplements” (60), B „Creatină monohidrată micronizată 300 g, fără aromă | Prime Supplements” (62 – de scurtat la „Creatină micronizată 300 g fără aromă | Prime Supplements”, 55).
2. **Google încă afișează titlul vechi** al paginii A („Creatina Creapure - Supliment pentru Performanță Fizică”) → după aplicare, cere re-indexare (Search Console → URL Inspection) pentru ambele produse și colecție.
3. **Termenii generici („creatina”, „creatină”, „cea mai bună creatină”) sunt informaționali** → se câștigă cu articole/ghiduri, nu cu pagina de produs; `seo_produs` (H2 + H3 + FAQ) trebuie să acopere întrebările ★ din §B pentru a prinde coada lungă și AI Overviews, iar colecția rămâne scurtă (banner) și trimite către ghidurile existente din blog (`ce-este-creatina`, `cum-se-ia-creatina`, `creatina-creapure-ghid`, `cu-ce-se-combina-creatina`).
4. **Diferențiatorii pe care competitorii îi folosesc și care sunt permisibili la noi** (numai cu fapte de etichetă): ingredient unic; număr de porții și grame per porție (Genius pune „400 g. Aproximativ 133 portii. 3 g per portie.” în H2); „fabricat în UE”; Creapure® cu ® + linkul creapure.com și faptul că Prime Supplements este brand listat; măsura inclusă; gust neutru → se amestecă în orice băutură; claim-ul autorizat verbatim cu condiția 3 g/zi. **Nepermise** (dar folosite de competitori): „99,9 % puritate” fără certificat propriu, „cea mai pură”, „crește masa musculară/forța”, „recuperare”, „energie”, „sigură”, prețuri, „cel mai ieftin”.
5. **Schema**: GymBeam (cel mai complet competitor) marchează FAQPage + QAPage + Certification + VideoObject pe produs; HyperFit are FAQPage pe ghid. Produsele noastre au Product/Offer/AggregateRating/Breadcrumb, dar **fără FAQPage** – FAQ-ul din `seo_produs` ar trebui dublat în JSON-LD FAQPage (temă) dacă politica temei o permite.
6. **Search boost (`shopify--discovery--product_search_boost.queries`)** pentru A/B: creatina, creatina monohidrata, creatina monohidrat, creatina creapure, creapure, creatina micronizata, creatina fara aroma, creatina pudra, creatina 300g, creatina 500g, creatina pura, creatina 100% monohidrat, creatine monohydrate, creatine, gust neutru, unflavoured, micronized, creatina plicuri (doar pentru Ready-To-Go).

## E. Fișiere

- Acest raport: `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/serp_comercial.md`
- Google Suggest RO brut: `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/suggest_raw.txt`
- Pagini competitori descărcate (title/meta/H1/H2/schema): `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/serp_pages/`
- Generator: `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/gen_serp.py`
