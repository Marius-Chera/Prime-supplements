# Plan: articolele vechi de blog, rescrise cu surse PubMed și poze OpenArt (13.11.2026)

Cererea proprietarului (13.11.2026): articolele de pe primesupplements.ro să fie „cele mai complete”, pe întrebările pe care oamenii le pun în ChatGPT și Gemini, credibile (surse PubMed și alte surse oficiale), cu poze OpenArt; automatizarea zilnică să meargă mai departe fără să se bată cap în cap cu rescrierile („să se posteze și cele vechi și cele noi”); articolele BlogGenAuto cu cuvinte riscante să fie șterse.

Excepție față de decizia din 25.10 („reparațiile SEO după 1.12”): proprietarul a cerut explicit lucrul pe articole acum; Late Black Friday (25–27.11) nu se atinge.

## 1. Ce s-a făcut pe 13.11.2026 (lotul de probă, aprobat de proprietar: „Da, începe cu cele 5”)

| Articol | Ce s-a schimbat | Surse | Poză |
|---|---|---|---|
| `ce-este-creatina` | rescris complet (definiție, mențiunea UE verbatim, forme, doză, 5 mituri, FAQ), titlu nou | Brosnan 2007, Kreider 2017, Antonio 2021, Reg. 432/2012 | OpenArt (Creapure® în sală) |
| `cand-se-ia-glutamina` | rescris; scris deschis că în UE nu există mențiune pentru glutamină | Gleeson 2008, Cruzat 2018, Reg. 432/2012 | OpenArt (Recovery Glutamin, alergare) |
| `cand-se-ia-vitamina-d3-k2` | rescris (masa cu grăsimi, doza o dată la 2 zile, MK-7, anticoagulante), titlu nou | Dawson-Hughes 2015, Mulligan 2010, Schurgers 2007, Reg. 432/2012 | OpenArt (D3/omega-3 cu alimente cu grăsimi) |
| `izolat-vs-concentrat-proteic` | rescris (tabel Pure Isolate vs Prime Whey, lactoză, doză de proteine) | Jäger 2017, Morton 2018, Tang 2009, Shaukat 2010, Reg. 432/2012 | OpenArt (Pure Isolate în bucătărie) |
| `magneziu-bisglicinat-cum-iti-dai-seama-daca` | rescris (forme organice, sportivi, doză, doar cele 3 mențiuni de pe etichetă), titlu nou | Pardo 2021, Nielsen 2006, Volpe 2015, Reg. 432/2012 | **poza veche păstrată** (vezi §4) |

Toate: aceeași adresă și aceeași dată de publicare (nu apar ca postări noi), titlu SEO + meta descriere trimise împreună, backup în `backups/blog-pubmed-2026-11-13/`, sursele HTML în acest folder (`build.mjs` + `articole.mjs` → `<handle>.html`). Verificat live: titlul nou, poza OpenArt și linkurile PubMed apar pe pagina publică.

## 1b. Ultimele 50 de articole aduse la 100/100 (13.11.2026, după-amiaza)

Cererea proprietarului: „adu toate articolele ultimele 50 la 100 SEO + 100 AI”. Cele 50 de articole cele mai noi (13.11 → 16.10) au acum 100 SEO și 100 AI, cu 3–5 studii PubMed, secțiunea „Surse” și scorurile în metafield-uri; aceeași adresă și aceeași dată. Detalii și tabelul înainte/după: `SCORURI-ULTIMELE-50.md`. Orice articol din coada de la §5 publicat pe 16.10.2026 sau mai târziu (lista din `SCORURI-ULTIMELE-50.md`) e deja la 100/100 și se sare; rescrierile următoare continuă cu articolele mai vechi.

Rămase de la acest lot: poza pentru `vitamina-d-imunitate-ce-spune-ue` (Gemini sau OpenArt, când există credite) și eticheta „hub:” afișată deasupra titlului (modificare de temă, DE-FACUT 29).

## 2. Cum nu se bat cap în cap rutina zilnică și rescrierile

- **Articolele noi:** rutina zilnică publică în continuare 1 articol/zi la 09:00 (ora României). Din 13.11 ea citește ghidul nou (`blog-automatizare-ghid-redactional-2026-11-13.txt`) și biblioteca de surse (`blog-automatizare-surse-pubmed-2026-11-13.txt`) din Shopify Files: 3–6 surse PubMed verificate pe articol, secțiunea „Surse”, OpenArt ca primă opțiune pentru poză când există credite. Promptul rutinei din claude.ai se actualizează cu textul din `blog-automation/PROMPT-ROUTINE.md` (rutina nu apare în lista de rutine accesibilă din aplicația de pe calculator, deci proprietarul lipește textul).
- **Articolele vechi:** se rescriu **pe loc** (aceeași adresă, aceeași dată), deci nu ocupă sloturi de publicare și nu apar în flux ca articole noi. Ritm propus: 5 articole pe zi lucrătoare, din aplicația de pe calculator, în ordinea din §5.
- **Pauză:** 24–27.11 (Late Black Friday) nu se rescrie nimic.
- Lucrul de pe calculator evită orele 06:45–07:30 și 08:45–09:15 (rularea rutinei și publicarea).

## 3. Articole BlogGenAuto propuse pentru scoatere de pe site (așteaptă „da” de la proprietar)

Criteriu: articol publicat de aplicația BlogGenAuto (înainte de 11.10.2026), fără surse, cu cel puțin 2 termeni de boală/tratament (tensiune, colesterol, diabet, ficat/hepatic, detox, „previne”, „tratează”, „vindecă”, testosteron, anxietate, depresie, mucolitic) și sub 15 vizite în 90 de zile, plus articolele al căror **subiect** e o afecțiune (tensiune, colesterol, ficat, potență, diuretice). Total: **28 de articole**, ~73 de vizite în 90 de zile la un loc.

**Recomandarea mea: ascundere (unpublish) + redirect 301**, nu ștergere definitivă: efectul pentru Google e același (pagina dispare, vizitatorul ajunge pe o pagină bună), dar se poate reveni oricând. Ștergerea definitivă se face doar dacă proprietarul o cere explicit.

| Articol | Vizite 90 z | Problema | Redirect propus |
|---|---|---|---|
| cand-se-ia-nac-dimineata-sau-seara | 14 | previne, mucolitic, hepatic | /products/nac-80-caps |
| hibiscus-tensiunea-arteriala-rezultate | 13 | tensiune, colesterol | /collections/prime-health |
| colesterol-7-semne-colesterol-marit-ghid | 11 | tensiune, colesterol | /collections/prime-health |
| tincturi-pentru-potenta | 9 | subiect: potență | /collections/prime-health |
| cand-se-consuma-ovazul-instant | 7 | hepatic, colesterol, diabet | /products/instant-oat-cream-800g-25-serv |
| spirulina-beneficii-doza-optima | 7 | detox, hepatic | /blogs/news/prospect-spirulina-cum-sa-alegi-spirulina-de |
| glutamina-efecte-secundare | 7 | tratează, hepatic | /blogs/news/cand-se-ia-glutamina |
| water-out-tinctura-retentie-apa | 5 | detox, hepatic, tensiune | /products/water-out-500-ml |
| zinc-citrat-cum-sa-stii-daca-zincul | <5 | vindecă, testosteron | /products/zinc-citrate-80-caps |
| zinc-citrat-zincul-pentru-imunitate-solutii-buget | <5 | vindecă, testosteron | /products/zinc-citrate-80-caps |
| nac-supliment-utilizarea-n-acetilcisteinei-termen-lung | <5 | tratează, previne, tensiune | /products/nac-80-caps |
| nac-600mg-semne-nevoie-nac-rezultate-reale | <5 | tratează, detox, mucolitic, hepatic | /products/nac-80-caps |
| doza-zilnica-de-fibre | <5 | tratează, previne, diabet | /products/fiber-blood-orange |
| lipsa-de-fibre-simptome | <5 | colesterol, diabet | /products/fiber-blood-orange |
| pudra-sfecla-rosie-30-de-zile-cu-pre | <5 | tratează, previne, tensiune | /collections/suplimente-pre-workout |
| cum-alegi-omega-3 | <5 | tratează, previne, tensiune, anxietate, depresie | /blogs/news/omega-3-sportivi-epa-dha-doza |
| ce-este-taurina | <5 | tensiune, anxietate | /blogs/news/taurina-doza-si-cand-se-ia |
| pre-workout-ce-este-cum-se-ia | <5 | hepatic, tensiune | /collections/suplimente-pre-workout |
| cum-alegi-un-pre-workout | <5 | tensiune, anxietate | /collections/suplimente-pre-workout |
| aminoacizi-recuperare-pe-varste | <5 | tratează, hepatic | /collections/aminoacizi |
| unt-de-migdale-reteta-unt-de-migdale-rezultate-reale | <5 | colesterol, diabet | /blogs/news/unt-arahide-migdale-caju-comparatie-nutritionala |
| cum-te-ajuta-combat-pro-sa-ti-cresti-masa-musculara | <5 | tensiune, diabet | /blogs/news/combat-pro-combat-pro-2-0-diferente-alegi |
| hipertensiune-arteriala-semne-nevoie-suplimente-inima-dozaj | <5 | subiect: hipertensiune | /collections/prime-health |
| detox-ficat-pentru-sportivi | <5 | subiect: „detox” ficat | /collections/prime-health |
| protectie-ficat-dozaj-silimarina-protectie-ficat-studii | <5 | subiect: protecția ficatului | /collections/prime-health |
| cand-se-iau-diureticele-naturale | <5 | subiect: diuretice | /products/water-out-500-ml |
| nattokinaza-6-semne-circulatie-sange-ingreunata | <5 | subiect: circulație | /collections/prime-health |
| tricou-sala-cele-mai-bune-tricouri-yoga | <5 | articol despre haine, cu termeni de sănătate | /collections/haine-mnx |

Înainte de execuție: backup al fiecărui articol în `backups/`, verificarea că fiecare țintă de redirect există și e publicată, apoi `articleUpdate(isPublished:false)` + `urlRedirectCreate`, verificare `curl -I` → 301. Celelalte 53 de articole BlogGenAuto cu cuvinte riscante rămân și se rescriu (sunt în coada din §5).

## 4. Poze OpenArt

- Cont OpenArt: planul Starter, **0 credite** pe 13.11.2026; o poză Nano Banana 2 (16:9, 1K, cu poza produsului ca referință) costă **20 de credite**. Pozele noi se generează când se reînnoiesc creditele (rutina o face singură, pasul 0a din ghid; din aplicația de pe calculator, pentru rescrieri).
- Poze de blog deja generate și încă nefolosite (16:9, fără text): Nitrox 3D cu femeie la kettlebell (`S0dV38tamXLxFyCOfloI`), scenă pre-workout fără produs (`evHHgZkLgjhAd2Z1czHi`), bărbat cu shaker în bucătărie, fără produs (`TW8dBPQigorQilUEt1gH`), mână care pune creatină în shaker, fără produs (`7RL0WGO8zUFFyomQNjtH`). Restul celor ~60 de poze din cont sunt 4:5, pentru rețele sociale (Crăciun, Anul Nou, iarnă), nu pentru blog.
- **Respinse:** magneziu pe noptieră (`eYKKyegLcqTTPnzGoWsw`, eticheta scrie „50 CAPS” în loc de 80, iar dormitorul seara sugerează somn = mențiune neautorizată; copia locală `poze/NEFOLOSITA-magneziu-dormitor-50caps.jpg`) și varianta fără produs (`djIB4nsfRhuhaLVgnX1t`). Articolul despre magneziu primește o poză nouă la reînnoirea creditelor (scenă propusă: sală de forță, flaconul lângă un shaker, lumină de zi).

## 5. Coada de rescriere (140 de articole, în ordine)

Ordinea: vizite în ultimele 90 de zile × 2, +20 dacă e despre un produs principal, +10 dacă spune „studii” fără link, +5 dacă are cuvinte riscante, +5 dacă e BlogGenAuto. Lista completă cu toate câmpurile: `inventar-173-articole-2026-11-13.json`. Primele 25 sunt loturile 2–6 (câte 5). Vizitele vin din Shopify Analytics (pagina de intrare, 90 de zile); „<5” = sub pragul raportului.

| # | Articol | Vizite 90 z | „Studii” fără link | Cuvinte riscante | Poză | Origine |
|---|---|---|---|---|---|---|
| 1 | `ceai-diuretic-sfatul-medicului-cauze-retentie-apa` | 122 | 0 | – | AI BlogGenAuto | BlogGenAuto |
| 2 | `scortisoara-ceylon-scortisoara-ieftina-vs-ceylon-diferenta` | 57 | 0 | ficat, hepat | AI BlogGenAuto | BlogGenAuto |
| 3 | `cum-se-prepara-crema-de-orez` | 48 | 0 | – | alta | rutina Claude/manual |
| 4 | `prospect-spirulina-cum-sa-alegi-spirulina-de` | 46 | 2 | slăbi, ficat, hepat, antiinflamat | AI BlogGenAuto | BlogGenAuto |
| 5 | `creatina-si-proteina-impreuna` | 30 | 2 | – | AI BlogGenAuto | BlogGenAuto |
| 6 | `epa-dha-explicate-cat-omega-3-trebuie-zi` | 32 | 0 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 7 | `l-carnitina-pentru-cine-este-potrivita` | 32 | 3 | – | AI BlogGenAuto | BlogGenAuto |
| 8 | `adevarul-despre-spirulina-90-zile-spirulina-evaluare-studii` | 29 | 12 | arde grăsim, slăbi, imunitat, ficat | AI BlogGenAuto | BlogGenAuto |
| 9 | `cata-proteina-trebuie-zi-calcul-greutate-obiectiv` | 19 | 1 | slăbi | AI Gemini/OpenArt | rutina Claude/manual |
| 10 | `retete-crema-orez-6-idei-dulci-proteice` | 26 | 0 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 11 | `cum-se-ia-creatina` | 22 | 0 | – | AI BlogGenAuto | BlogGenAuto |
| 12 | `coenzima-q10-si-omega-3` | 16 | 2 | – | AI BlogGenAuto | BlogGenAuto |
| 13 | `proteina-din-zer-vs-vegetala` | 13 | 3 | slăbi, ficat | AI BlogGenAuto | BlogGenAuto |
| 14 | `cand-se-ia-proteina` | 15 | 1 | – | AI BlogGenAuto | BlogGenAuto |
| 15 | `retete-rapide-proteina-whey-micul-dejun` | 19 | 0 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 16 | `glutamina-kyowa-inseamna-fermentatia-puritatea` | 16 | 0 | ficat | AI Gemini/OpenArt | rutina Claude/manual |
| 17 | `efecte-secundare-proteina-whey` | 14 | 0 | – | AI BlogGenAuto | BlogGenAuto |
| 18 | `creapure-vs-creatina-monohidrata-obisnuita` | 16 | 0 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 19 | `ovaz-si-balonare-reactii-digestive` | 16 | 3 | previn, ficat, colesterol, antiinflamat | AI BlogGenAuto | BlogGenAuto |
| 20 | `creatina-si-retentia-de-apa` | 8 | 13 | – | AI BlogGenAuto | BlogGenAuto |
| 21 | `taurina-doza-si-cand-se-ia` | 20 | 0 | hepat, tensiun | AI BlogGenAuto | BlogGenAuto |
| 22 | `cu-ce-se-combina-creatina` | 12 | 0 | – | alta | BlogGenAuto |
| 23 | `cum-se-ia-arzatorul-de-grasimi` | 14 | 1 | slăbi, tensiun | AI BlogGenAuto | BlogGenAuto |
| 24 | `creatina-dupa-40-de-ani` | 6 | 1 | – | AI BlogGenAuto | BlogGenAuto |
| 25 | `pauza-de-creatina` | 11 | 0 | – | poza produs | BlogGenAuto |
| 26 | `izolat-proteic-beneficii` | 8 | 0 | ficat | AI BlogGenAuto | BlogGenAuto |
| 27 | `crema-orez-inainte-antrenament-cand-cat-mananci` | 10 | 0 | diabet | AI Gemini/OpenArt | rutina Claude/manual |
| 28 | `magneziu-seara-somn-il-iei-doza` | 10 | 0 | tensiun | AI Gemini/OpenArt | rutina Claude/manual |
| 29 | `creatina-pastile-sau-praf` | 5 | 3 | – | AI BlogGenAuto | BlogGenAuto |
| 30 | `proteina-whey-femei-mituri-folosesti` | 12 | 0 | – | sedinta | rutina Claude/manual |
| 31 | `creatina-creapure-ghid` | 7 | 0 | ficat | poza produs | BlogGenAuto |
| 32 | `vitamina-c-doza-pe-varste` | 7 | 0 | ficat | AI BlogGenAuto | BlogGenAuto |
| 33 | `in-cat-timp-face-efect-creatina` | 9 | 0 | – | poza produs | BlogGenAuto |
| 34 | `gatit-cu-pudra-proteica` | 9 | 0 | – | alta | BlogGenAuto |
| 35 | `izolat-proteic-intoleranta-lactoza-trebuie-sa-stii` | 11 | 0 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 36 | `glutamina-beneficii` | 6 | 0 | ficat | AI BlogGenAuto | BlogGenAuto |
| 37 | `crom-picolinat-beneficii` | <5 | 1 | slăbi, diabet | AI BlogGenAuto | BlogGenAuto |
| 38 | `cum-alegi-creatina` | 5 | 0 | ficat | AI BlogGenAuto | BlogGenAuto |
| 39 | `nac-600-mg-cum-sa-combini-n-acetilcisteina` | <5 | 4 | tratea | AI BlogGenAuto | BlogGenAuto |
| 40 | `vitamine-b12-90-zile-vitamina-d3-k2` | <5 | 2 | slăbi, imunitat, ficat | alta | BlogGenAuto |
| 41 | `bcaa-vs-eaa` | <5 | 2 | ficat | alta | BlogGenAuto |
| 42 | `cata-vitamina-d-zi-doze-analize-greseli` | 7 | 0 | imunitat, ficat | poza produs | rutina Claude/manual |
| 43 | `pre-workout-cu-creatina` | 7 | 0 | – | poza produs | BlogGenAuto |
| 44 | `multivitamine-plicuri-alegi-formula-zilnica` | 19 | 0 | – | sedinta | rutina Claude/manual |
| 45 | `vitamina-c-fierul-iei-impreuna` | 6 | 0 | ficat | sedinta | rutina Claude/manual |
| 46 | `semne-deficit-magneziu-sa-urmaresti` | <5 | 2 | diabet | poza produs | rutina Claude/manual |
| 47 | `crema-orez-glicemia-inseamna-indicele-glicemic` | <5 | 1 | diabet | sedinta | rutina Claude/manual |
| 48 | `creatina-contraindicatii-cine-nu-o-ia` | <5 | 3 | ficat, testosteron | AI Gemini/OpenArt | rutina Claude/manual |
| 49 | `leucina-aminoacidul-cheie-muschi` | 10 | 1 | ficat | AI Gemini/OpenArt | rutina Claude/manual |
| 50 | `vitamina-d-imunitate-ce-spune-ue` | <5 | 1 | tratea, previn, imunitat | alta | rutina Claude/manual |
| 51 | `vitamina-c-sportivi-doza-ce-spune-ue` | <5 | 1 | previn, ficat | AI Gemini/OpenArt | rutina Claude/manual |
| 52 | `eaa-post-intermitent-rupe-postul-nu` | <5 | 1 | ficat | AI Gemini/OpenArt | rutina Claude/manual |
| 53 | `crema-de-orez-dimineata` | <5 | 1 | – | AI BlogGenAuto | BlogGenAuto |
| 54 | `batoane-proteice-pentru-refacere` | <5 | 2 | – | AI BlogGenAuto | BlogGenAuto |
| 55 | `combinatii-arzatoare-de-grasimi` | 10 | 2 | – | AI BlogGenAuto | BlogGenAuto |
| 56 | `cum-combini-batoanele-proteice-cu-creatina` | <5 | 2 | – | AI BlogGenAuto | BlogGenAuto |
| 57 | `doza-optima-izolat-proteic` | <5 | 4 | – | AI BlogGenAuto | BlogGenAuto |
| 58 | `picolinat-crom-cand-se-ia-doza` | 7 | 0 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 59 | `faza-de-incarcare-creatina-formula-eticheta` | 7 | 0 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 60 | `5-idei-de-deserturi-delicioase-cu-crema-de-orez` | 7 | 0 | – | alta | rutina Claude/manual |
| 61 | `l-carnitina-rezultate` | 6 | 3 | slăbi | AI BlogGenAuto | BlogGenAuto |
| 62 | `glutamina-alergare-sporturi-anduranta` | <5 | 2 | – | sedinta | rutina Claude/manual |
| 63 | `creatina-sau-creatinina-diferenta` | <5 | 2 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 64 | `magneziu-sportivi-cat-iei-eticheta` | <5 | 3 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 65 | `zinc-citrat-dozaj-optim-zinc-imunitate-evaluare` | 5 | 3 | vindec | AI BlogGenAuto | BlogGenAuto |
| 66 | `cum-alegi-un-arzator-de-grasimi` | 5 | 3 | slăbi, ficat | AI BlogGenAuto | BlogGenAuto |
| 67 | `oboseala-post-antrenament-batoane-proteice` | <5 | 0 | slăbi | AI BlogGenAuto | BlogGenAuto |
| 68 | `semne-deficit-proteic` | <5 | 0 | ficat | AI BlogGenAuto | BlogGenAuto |
| 69 | `magneziu-bisglicinat-rezultate-30-de-zile` | <5 | 0 | anxiet | AI BlogGenAuto | BlogGenAuto |
| 70 | `izolat-proteic-pentru-slabit` | <5 | 0 | slăbi | AI BlogGenAuto | BlogGenAuto |
| 71 | `dextrina-ciclica-vs-maltodextrina` | 5 | 6 | slăbi, ficat | alta | BlogGenAuto |
| 72 | `proteina-cum-alegi-pudra-proteica-calitate` | <5 | 0 | slăbi | AI BlogGenAuto | BlogGenAuto |
| 73 | `aminoacizi-esentiali-dozaj` | 7 | 2 | – | AI BlogGenAuto | BlogGenAuto |
| 74 | `cum-alegi-ovazul-instant` | 7 | 2 | – | AI BlogGenAuto | BlogGenAuto |
| 75 | `cromul-glicemia-spune-mentiunea-aprobata-ue` | <5 | 0 | ficat, tensiun, diabet | sedinta | rutina Claude/manual |
| 76 | `cluster-insulin-bomb-zilele-cardio-forta` | <5 | 0 | ficat | sedinta | rutina Claude/manual |
| 77 | `shake-proteic-apa-lapte-diferente-alegi` | <5 | 0 | ficat | sedinta | rutina Claude/manual |
| 78 | `vitamina-d-iarna-scade-mentii` | <5 | 0 | ficat | AI Gemini/OpenArt | rutina Claude/manual |
| 79 | `gainer-cu-proteina-sau-gainer-cu-zahar-cum-alegi` | <5 | 0 | ficat | AI Gemini/OpenArt | rutina Claude/manual |
| 80 | `citesti-eticheta-unei-proteine-whey-verifici` | <5 | 0 | ficat | sedinta | rutina Claude/manual |
| 81 | `plicuri-creatina-ready-to-go` | <5 | 0 | – | poza produs | BlogGenAuto |
| 82 | `crema-orez-transforma-antrenamente-crema-orez-blueberry` | <5 | 0 | – | AI BlogGenAuto | BlogGenAuto |
| 83 | `glutamina-combinatii` | <5 | 0 | – | AI BlogGenAuto | BlogGenAuto |
| 84 | `gainer-sau-proteina` | <5 | 0 | – | AI BlogGenAuto | BlogGenAuto |
| 85 | `gainer-pentru-masa-musculara` | <5 | 0 | – | alta | BlogGenAuto |
| 86 | `glicerol-culturism-pompare-musculara` | 5 | 3 | – | alta | BlogGenAuto |
| 87 | `l-carnitina-pentru-slabit-pareri` | 6 | 0 | tratea, ficat | AI BlogGenAuto | BlogGenAuto |
| 88 | `cand-se-ia-coenzima-q10-dimineata-masa-grasimi` | 8 | 0 | ficat | AI Gemini/OpenArt | rutina Claude/manual |
| 89 | `gainer-vs-whey-care-te-ajuta-sa-iei-in-greutate` | <5 | 0 | – | sedinta | rutina Claude/manual |
| 90 | `creatina-femei-beneficii-doza-mituri` | <5 | 0 | – | sedinta | rutina Claude/manual |
| 91 | `cum-iei-gainerul-doza-moment-cu-ce-il-combini` | <5 | 0 | – | sedinta | rutina Claude/manual |
| 92 | `baton-proteic-inainte-antrenament-idee-buna` | <5 | 0 | – | sedinta | rutina Claude/manual |
| 93 | `omega-3-sportivi-epa-dha-doza` | <5 | 0 | – | sedinta | rutina Claude/manual |
| 94 | `gainer-ce-este-cum-functioneaza-cine-are-nevoie` | <5 | 0 | – | sedinta | rutina Claude/manual |
| 95 | `cum-citesti-eticheta-creatinei-ce-verifici` | <5 | 0 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 96 | `cand-se-ia-creatina-inainte-sau-dupa-antrenament` | <5 | 0 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 97 | `la-ce-ajuta-creatina-mentiunea-autorizata` | <5 | 0 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 98 | `gustari-proteice-birou-idei-sub-250-kcal` | <5 | 0 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 99 | `budinca-proteica-din-crema-de-orez-cu-ciocolata-desert-cremos-gata-rapid` | <5 | 0 | – | alta | rutina Claude/manual |
| 100 | `cum-alegi-crema-de-orez` | <5 | 0 | – | AI BlogGenAuto | rutina Claude/manual |
| 101 | `thermo-core-ghid` | <5 | 3 | slăbi, tensiun | AI BlogGenAuto | BlogGenAuto |
| 102 | `bcaa-doza-si-cand-se-iau` | <5 | 2 | ficat, hepat | AI BlogGenAuto | BlogGenAuto |
| 103 | `beta-alanina-cum-sa-citesti-eticheta-suplimente` | <5 | 1 | ficat, tensiun | AI BlogGenAuto | BlogGenAuto |
| 104 | `pre-workout-nu-mai-are-efect` | <5 | 1 | ficat | AI BlogGenAuto | BlogGenAuto |
| 105 | `bcaa-ce-sunt-si-beneficii` | <5 | 3 | imunitat, ficat | AI BlogGenAuto | BlogGenAuto |
| 106 | `ashwagandha-ksm-66-beneficii` | <5 | 15 | testosteron | AI BlogGenAuto | BlogGenAuto |
| 107 | `carbohidrati-intra-workout-rezultate` | <5 | 3 | ficat, diabet | AI BlogGenAuto | BlogGenAuto |
| 108 | `arzatoarele-de-grasimi-functioneaza` | <5 | 7 | slăbi, ficat | AI BlogGenAuto | BlogGenAuto |
| 109 | `taurina-efecte-secundare` | <5 | 2 | tensiun | AI BlogGenAuto | BlogGenAuto |
| 110 | `taurina-rezultate-30-de-zile` | <5 | 2 | tensiun | AI BlogGenAuto | BlogGenAuto |
| 111 | `ce-este-intra-workout` | 5 | 0 | ficat | AI BlogGenAuto | BlogGenAuto |
| 112 | `fibre-dieta-antiinflamatoare` | <5 | 10 | ficat | AI BlogGenAuto | BlogGenAuto |
| 113 | `ashwagandha-in-cat-timp-face-efect` | <5 | 12 | ficat | AI BlogGenAuto | BlogGenAuto |
| 114 | `arzatoare-de-grasimi-efecte-secundare` | <5 | 4 | slăbi | AI BlogGenAuto | BlogGenAuto |
| 115 | `apa-de-cocos-intra-workout` | <5 | 2 | diabet | AI BlogGenAuto | BlogGenAuto |
| 116 | `potasiu-si-retentia-de-apa` | 5 | 0 | slăbi, ficat, tensiun | AI BlogGenAuto | BlogGenAuto |
| 117 | `ovaz-instant-secrete-nutritie-crema-ovaz-energie` | <5 | 1 | slăbi, ficat, antiinflamat | AI BlogGenAuto | BlogGenAuto |
| 118 | `cum-combini-aminoacizii-esentiali` | <5 | 6 | ficat, diabet | AI BlogGenAuto | BlogGenAuto |
| 119 | `intra-workout-dozaj-optim-carbohidrati-combatere-stres` | <5 | 1 | ficat | alta | BlogGenAuto |
| 120 | `digestie-suplimente-fibre-alimentatie-rezultate-maxime` | 5 | 0 | diabet | AI BlogGenAuto | BlogGenAuto |
| 121 | `vitamine-k-ce-vitamine-aleg-expertii-sanatatea` | <5 | 3 | ficat | AI BlogGenAuto | BlogGenAuto |
| 122 | `coenzima-q10-ubiquinona-ubiquinol-forma-alegi` | <5 | 1 | tensiun | AI Gemini/OpenArt | rutina Claude/manual |
| 123 | `alpinia-galanga-beneficii` | <5 | 4 | – | AI BlogGenAuto | BlogGenAuto |
| 124 | `suplimente-de-fibre-pe-varste` | <5 | 3 | – | AI BlogGenAuto | BlogGenAuto |
| 125 | `citicolina-ghid-pre-workout-fara-cafeina` | <5 | 5 | – | alta | BlogGenAuto |
| 126 | `bei-mai-multa-apa-7-trucuri-care-chiar-functioneaza` | 6 | 0 | – | AI Gemini/OpenArt | rutina Claude/manual |
| 127 | `frutilu-energy-bautura-cafeina-fara-zahar-cand-bei` | <5 | 1 | – | sedinta | rutina Claude/manual |
| 128 | `cum-combini-bcaa` | <5 | 0 | ficat | poza produs | BlogGenAuto |
| 129 | `aminoacizi-rezultate-in-cat-timp` | <5 | 0 | imunitat, hepat | AI BlogGenAuto | BlogGenAuto |
| 130 | `aminoacizi-esentiali-ce-sunt` | <5 | 0 | ficat | AI BlogGenAuto | BlogGenAuto |
| 131 | `proteine-dupa-30-de-ani` | <5 | 0 | ficat, testosteron | AI BlogGenAuto | BlogGenAuto |
| 132 | `coenzima-q10-rezultate` | <5 | 0 | ficat | AI BlogGenAuto | BlogGenAuto |
| 133 | `combat-pro-combat-pro-2-0-diferente-alegi` | <5 | 0 | tensiun | sedinta | rutina Claude/manual |
| 134 | `bauturi-fara-zahar-indulcite-stevia-trebuie-sa-stii` | <5 | 0 | diabet | AI Gemini/OpenArt | rutina Claude/manual |
| 135 | `antrenamente-peste-90-minute-carbohidrati-hidratare` | <5 | 0 | ficat | AI Gemini/OpenArt | rutina Claude/manual |
| 136 | `cum-se-ia-l-carnitina` | <5 | 0 | – | AI BlogGenAuto | BlogGenAuto |
| 137 | `unt-de-arahide-beneficii-sportivi` | <5 | 0 | – | AI BlogGenAuto | BlogGenAuto |
| 138 | `multivitamine-efecte-secundare` | <5 | 0 | – | AI BlogGenAuto | BlogGenAuto |
| 139 | `ce-este-un-pre-workout-fara-cofeina` | <5 | 0 | – | alta | BlogGenAuto |
| 140 | `unt-arahide-migdale-caju-comparatie-nutritionala` | <5 | 0 | – | sedinta | rutina Claude/manual |
