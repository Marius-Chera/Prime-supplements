# Analiza facturilor Shopify: unde pierdem bani și ce mai putem tăia (15.11.2026)

Cererea lui Marius: „analizează absolut toate facturile Shopify… unde pierdem cei mai mulți bani și unde mai putem economisi… de ce plătim «Transaction fees»… chiar dacă putem economisi 10 euro lunar”. Apoi: „analizează toate facturile din ultimele 12 luni”.

**Sursa datelor.** Am citit, doar citire, Setări → Facturare din admin, cu browserul din aplicație. Am folosit API-ul intern al paginii, așa că am fiecare rând al fiecărei facturi. Sunt toate cele 30 de facturi existente, din 31.07.2025 până pe 12.11.2026. Le-am pus rând cu rând în `facturi-shopify-2025-07_2026-11.csv`. Am mai folosit:
- încasările pe procesator, din Shopify Analytics;
- pagina Plan, cu abonamentele active și tarifele;
- pagina de ajutor Shopify despre Shopify Tax.

**Nu am modificat nimic în magazin.**

Cursul folosit este **4,50 lei/$**. L-am calculat din facturi: 1% din încasările Netopia în lei ≈ taxa facturată în $.

---

## 1. Pe scurt

- **În ultimele 12 luni Shopify ne-a luat 8.451,52 $ (≈ 38.000 lei).** Sunt 23 de facturi, de pe 28.11.2025 până pe 12.11.2026, în medie **≈ 704 $/lună (≈ 3.170 lei)**.
- **Peste jumătate din bani au mers la UpPromote:** 4.336,56 $ (≈ 19.500 lei), adică 51%. Am înlocuit-o pe 15.11, dar **e încă instalată și se reînnoiește pe 2.12.2026** (199,99 $). Până la dezinstalare plătim și 1% din fiecare comandă cu cod de afiliat.
- **Pe locul 2 sunt „Transaction fees”:** 1.395,37 $ (≈ 6.300 lei), adică 16,5%. Sunt **1% din fiecare plată cu cardul prin Netopia**, ca pedeapsă de la Shopify pentru că nu folosim Shopify Payments. Explicația completă e la §3.
- **O taxă nouă, Shopify Tax**, a apărut pe 24.10.2026 (37,20 $). **Corectat la 15.11, după verificarea în admin:** Shopify estimează pentru noi **~5 €/lună (~300 lei/an)**, nu 4.500–5.000 lei/an cât calculasem din tariful general. Prea puțin ca să merite riscul unei schimbări (vezi §4).
- **Am oprit deja aplicații de ≈ 1.740 $/an (≈ 7.800 lei):** Koala ×2, Pop Convert, BlogGenAuto, Fontify și YouTube Gallery. Niciuna nu mai apare pe factura din 12.11.
- **După UpPromote, factura Shopify scade de la ~704 $ la ~275 $ pe lună.** Cu măsurile de la §5 poate ajunge la **~245 $/lună**. Fără Transaction fees ar fi încă mai puțin (vezi §3).

## 2. Unde s-au dus banii în 12 luni (28.11.2025–12.11.2026)

| # | Pe ce | $ | lei (≈) | % | Stare la 15.11 |
|---|---|---:|---:|---:|---|
| 1 | UpPromote, abonament 199,99 $/lună | 2.399,88 | 10.800 | 28,4% | înlocuit 15.11; **încă instalat, se reînnoiește pe 2.12** |
| 2 | UpPromote, 1% din comenzile cu cod („usage”), 2.377 de comenzi | 1.936,68 | 8.715 | 22,9% | curge până la dezinstalare |
| 3 | **Transaction fees (1% pe plățile Netopia)** | 1.395,37 | 6.280 | 16,5% | activ, crește cu vânzările |
| 4 | Plan Grow (92 $/lună) | 1.104,00 | 4.970 | 13,1% | activ |
| 5 | Koala Upsells & Gifts (29,99 $) | 329,89 | 1.485 | 3,9% | oprit (ultima dată 11.10) |
| 6 | Upsell Koala Bundles (59,99 $) | 239,96 | 1.080 | 2,8% | oprit (ultima dată 15.03) |
| 7 | Pop Convert (21 $/lună) | 231,00 | 1.040 | 2,7% | oprit (ultima dată 11.10) |
| 8 | BlogGenAuto (24,90 $) | 199,20 | 895 | 2,4% | oprit (ultima dată 11.10) |
| 9 | Judge.me (15 $) | 195,00 | 880 | 2,3% | activ; aplicația proprie e amânată după 20–25.12 |
| 10 | Pandectes GDPR (9 $) | 117,00 | 525 | 1,4% | activ; necesar legal |
| 11 | Dondy WhatsApp (6,99 $) | 83,88 | 375 | 1,0% | activ |
| 12 | Simprosys (6,74 $) | 81,75 | 370 | 1,0% | activ (Merchant Center) |
| 13 | Shopify Tax | 37,20 | 165 | 0,4% | **nou din 24.10.2026** |
| 14 | Fontify (3 $) | 36,00 | 160 | 0,4% | oprit (ultima dată 11.10) |
| 15 | YouTube Gallery (5,99 $) | 35,94 | 160 | 0,4% | oprit (ultima dată 25.08) |
| 16 | Delivery Estimator (1,99 $) | 23,88 | 105 | 0,3% | activ |
| 17 | Shopify Email | 4,89 | 22 | 0,1% | după consum |
| | **Total** | **8.451,52** | **≈ 38.030** | 100% | |

**Pe luni (data facturii):** cea mai mare lună a fost noiembrie 2025, cu 858 $. Cea mai mică a fost decembrie 2025, cu 555 $. În rest, între 610 și 777 $. Pragul de facturare e 480 $: Shopify trage o factură de fiecare dată când datoria ajunge la 480 $, plus una la sfârșitul ciclului. De aceea apar două facturi pe lună. Pragul nu costă nimic în plus.

**Bani dați pe aplicații nefolosite.** Pop Convert a luat 21 $/lună timp de 13 luni (273 $ în total), deși popup-urile le face theMarketer. Fontify a fost plătit și când era dezactivat (audit 18.10). Koala Bundles a mers 8 luni (480 $). Lecția: **la fiecare aplicație dezinstalată, verificăm pe factura următoare că a dispărut.** Am pus verificarea în §6.

## 3. De ce plătim „Transaction fees”

**Ce sunt.** Shopify ia un comision suplimentar pe fiecare plată făcută printr-un procesator extern, adică altul decât Shopify Payments. Comisionul depinde de plan:

| Plan | Comision pe procesator extern |
|---|---|
| Basic (32 $/lună) | 2% |
| **Grow (92 $/lună) – al nostru** | **1%** |
| Advanced (399 $/lună) | 0,6% |
| Plus | 0,2% |

**Ce se taxează la noi:**
- **Plățile cu cardul prin Netopia: da, 1%.**
- Rambursul (COD): nu. E metodă de plată manuală, iar Shopify nu ia nimic pe ea.
- Shopify Payments: nu.

**Verificat pe cifre.** Prin Netopia au intrat 627.904 lei în 15.11.2025–14.11.2026. 1% din asta înseamnă ≈ 6.280 lei ≈ 1.395 $, exact cât e pe facturi.

**De când.** În iulie–august 2025 magazinul încasa cu cardul prin **Shopify Payments** (55.177 lei și 50.893 lei) și nu exista niciun rând „Transaction fees”. Din **septembrie 2025** s-a trecut pe Netopia și au început cele 1%. În martie 2026 au mai trecut 17.165 lei prin Shopify Payments, o singură dată.

**Cât ne costă de fapt o plată cu cardul azi:**
- Netopia ia ≈ 1,89% cu TVA, adică 669,52 lei din 35.377,56 lei procesați, după rapoartele reale importate în Prime Expediere pe 13.11. Fără TVA e ≈ 1,56%.
- Shopify mai adaugă 1%.
- **Total ≈ 2,9% pe plată** (≈ 2,56% dacă TVA-ul de pe comisionul Netopia se deduce).

**Cât ar costa cu Shopify Payments pe Grow:**
- 1,7% + 1,25 lei pe plată cu card standard;
- 2,8% + 1,25 lei pe carduri internaționale sau Amex;
- 0% Transaction fees.

La o plată medie de ~330 lei, asta înseamnă ≈ 2,1%.

**Economia posibilă:** ≈ 0,5–0,8% din plățile cu cardul. La ritmul din ultimele 5 luni (~64.000 lei/lună prin card, ~770.000 lei/an) înseamnă **≈ 3.700–6.200 lei/an**. În plus ar apărea Apple Pay, Google Pay și Shop Pay direct în checkout. Pe 88% din sesiuni de pe mobil, asta ajută și la conversie.

**De ce nu e o recomandare automată.**
- Pe 23.10.2026 ai decis „NU Shopify Payments, rămâne Netopia”, pentru că rapoartele Netopia sunt mult mai clare (`ISTORIC-DISCUTII.md`).
- Între timp, tab-ul Încasări din Prime Expediere e construit pe rapoartele Netopia.
- Pe magazinul B2B, Shopify Payments a avut plățile oprite din 23.09 (lipseau datele contului).

**Decizia rămâne a ta.** Dacă vrei s-o reluăm, întâi verificăm:
1. de ce s-a renunțat la Shopify Payments în septembrie 2025;
2. eligibilitatea pentru suplimente;
3. cât durează plățile către bancă (payout).

**Nu ajută:**
- **trecerea pe Basic:** comisionul se dublează la 2%, adică +7.700 lei/an, iar abonamentul scade doar cu ~2.700 lei/an;
- **trecerea pe Advanced:** abonamentul crește cu +13.000 lei/an, iar comisionul scade doar cu ~3.000 lei/an.

**Grow e planul potrivit.**

## 4. Shopify Tax: taxa nouă care crește din 2027

**Ce e.** Shopify calculează TVA-ul în checkout („Shopify Tax”, activ pentru Uniunea Europeană). Pagina oficială de prețuri spune:
- taxa e gratuită până la 100.000 € vânzări;
- după aceea costă **0,25% din fiecare comandă** pe planul Grow, cu maximum 0,99 € pe comandă și 5.000 € pe an.
- **Până la 31.12.2026 pragul de 100.000 € se reia în fiecare an. Din 1.01.2027 pragul se socotește pe toată viața magazinului.** Noi l-am depășit demult, deci **din ianuarie plătim pe fiecare comandă, tot anul.**

**Cât ne costă: corectat la 15.11.** Prima estimare (0,25% din toate vânzările, ~4.500–5.000 lei/an) era **greșită**.
- În 12 luni, Shopify Tax a apărut pe facturi o singură dată: 37,20 $.
- Pagina Setări → Taxe → Uniunea Europeană → „Downgrade service” spune: *„Based on your global sales of the last 12 months, we estimate Shopify Tax will only cost your shop €5 per month in the EU.”*
- Deci **≈ 5 €/lună, ≈ 300 lei/an.** Probabil se taxează doar o parte din comenzi. Cele mai multe produse au cotă fixată de noi: „Uncategorized products 21” și colecția „11% TVA” → România 11%.

**Verificat 15.11 (doar citire, nimic salvat): Shopify permite trecerea.** În Uniunea Europeană avem trei variante:

| Serviciu | Cost | Ce face |
|---|---|---|
| **Shopify Tax** (activ acum) | ~5 €/lună la noi | Calculează TVA-ul automat pe țară și pe categorie de produs. Calculează TVA-ul la transport proporțional, când în coș sunt produse cu 11% și cu 21%. Face facturi TVA din Shopify, validează codurile de TVA la B2B și urmărește pragurile UE. |
| **Basic Tax** | gratuit | Aplică automat cota fiecărei țări în care ești înregistrat. Păstrează excepțiile noastre (11% / 21%) și scutirile pentru clienți și B2B. Nu face TVA proporțional la transport și nici facturi TVA din Shopify. |
| **Manual Tax** | gratuit | Scrii tu cotele pe țară. Excepțiile se pot pune doar la nivel de țară, fără scutiri. Shopify o marchează „Lowest compliance”. |

**Ce înseamnă „TVA manual”, concret.** Prețurile de pe site rămân aceleași, cu TVA inclus. Clientul plătește exact cât plătește acum. Se schimbă doar **cine calculează partea de TVA din preț**, pe care Shopify o scrie în comandă:
- **acum:** o calculează Shopify, după regulile lui;
- **pe manual:** după cotele scrise de noi (România 21%, produsele din colecția „11% TVA” 11%).

**De ce contează la noi.**
- **Prime Expediere face factura din Oblio cu cota de TVA din comanda Shopify** (`prime-expediere/src/calc/invoice.ts`: `vatPercentage` = cota de pe rândul comenzii; transportul are mereu 21%).
- **Prime Afiliați scade TVA-ul tot după cota din comandă**, înainte să calculeze comisionul.
- Dacă după schimbare o comandă vine cu altă cotă, de exemplu 21% în loc de 11% la un produs alimentar, **factura fiscală iese greșită**.

**Atenție la schimbare:**
- Shopify avertizează că schimbarea poate fi definitivă.
- Basic Tax rămâne disponibil doar pentru că magazinul colecta TVA înainte de 13.05.2026.
- După trecerea pe Manual, nu mai poți reveni la Basic.

**Recomandare:** **rămânem pe Shopify Tax.** Economia (~300 lei/an) e sub pragul tău de 10 €/lună, iar riscul de facturi cu TVA greșit nu merită. Reevaluăm doar dacă facturile din 2027 arată constant peste ~20 €/lună. Atunci trecem pe **Basic Tax**, nu pe Manual, după un test pe câteva comenzi și cu acordul contabilei.

## 5. Ce mai putem tăia, în ordinea banilor

| # | Măsura | Economie/an | Cine | Când |
|---|---|---:|---|---|
| 1 | **Dezinstalarea UpPromote** după verificarea codurilor din Prime Afiliați. UpPromote șterge codurile la dezinstalare și noi le recreăm, cum scrie în planul de tranziție. Opriți și scripturile din temă. | **≈ 19.500 lei** (≈ 360 $/lună) | Marius dezinstalează, Claude verifică | **înainte de 2.12.2026**, când e reînnoirea. Ideal acum: fiecare zi costă ~5 $ în comisioane |
| 2 | ~~Shopify Tax → rate manuale~~: verificat 15.11, **nu merită** (§4) | ~300 lei | – | se reevaluează în 2027, pe facturi |
| 3 | Shopify Payments în loc de Netopia (§3) | ≈ 3.700–6.200 lei | **decizia ta (acum e „nu”, din 23.10)** | doar dacă vrei să reluăm |
| 4 | Plan Grow plătit **anual**: 83 $/lună în loc de 92 $ | **≈ 490 lei** (108 $) | Marius: Setări → Plan → „Switch to yearly” (plătești 996 $ odată) | oricând |
| 5 | Delivery Estimator + Dondy WhatsApp → cod propriu în temă (`livrare/PRIME-COS-PLAN-2026-11-14.md`, `APLICATII-DE-CLONAT-2026-11-14.md`) | ≈ 485 lei (8,98 $/lună) + site mai rapid | Claude, cu aprobarea ta | după Late Black Friday |
| 6 | Judge.me → aplicația proprie de recenzii | ≈ 810 lei (15 $/lună) | decis: după 20–25.12 | ian. 2027 |
| 7 | Cardul cu care plătești Shopify (Visa •••• 3480). Facturile sunt în **dolari**: dacă e card în lei, banca adaugă comision de schimb, de obicei 1,5–2,5%. Pe ~4.000 $/an după tăieri, asta înseamnă ~60–100 $. Soluția e un card legat de un cont în USD (BT are) sau un card fără comision de schimb. | ≈ 270–450 lei | Marius: verifici în extrasul BT o plată către Shopify (ex. 12.11, 493,95 $) | oricând |
| 8 | Pragul de facturare (480 $) | 0 lei | – | nu e nevoie de nimic |

**Ce rămâne și de ce:**
- **Pandectes (9 $):** Google cere banner de consimțământ certificat; risc legal.
- **Simprosys (6,74 $):** alimentează Merchant Center. Nu umblăm la el înainte de Black Friday și Crăciun.
- **Planul Grow:** e cel mai ieftin la volumul nostru de plăți cu cardul (§3).

**Factura lunară Shopify, estimată:**

| Situația | $/lună | lei/lună (≈) |
|---|---:|---:|
| Media ultimelor 12 luni | 704 | 3.170 |
| După UpPromote + aplicațiile deja oprite (decembrie 2026) | ~275 | ~1.240 |
| Din 2027, dacă nu facem nimic (+ Shopify Tax ~5 €) | ~280 | ~1.260 |
| Din 2027, cu măsurile 4, 5 și 6 (fără Shopify Payments) | ~245 | ~1.100 |
| La fel, plus Shopify Payments (fără Transaction fees; comisionul de card trece la Shopify) | ~100 | ~450 |

Transaction fees cresc odată cu vânzările: la 1% din ~64.000 lei/lună prin card înseamnă ~142 $/lună.

## 6. Verificări de făcut

- **După dezinstalarea UpPromote:** factura de prag sau de ciclu nu mai are UpPromote, nici abonament, nici „usage”.
- **Factura de ciclu din ~24.11.2026:** trebuie să conțină doar Grow, Transaction fees, Delivery Estimator, Dondy și eventual Shopify Tax. Nu trebuie să mai apară Koala, Pop Convert, BlogGenAuto sau Fontify.
- **Pe 15.11, pagina Plan afișează ca abonamente active doar UpPromote** (reînnoire 2.12) **și Simprosys** (reînnoire 24.11). Judge.me și Pandectes au fost facturate pe 12.11, deci încă se plătesc. Verificăm pe facturile următoare.

## 7. În afara facturii Shopify (pentru o analiză următoare)

Costurile mari ale firmei care nu trec prin Shopify:
- comisioanele Netopia (~1,9% pe card);
- Cargus: transport și taxa de ramburs;
- coletele ramburs refuzate;
- theMarketer;
- reclamele;
- Oblio;
- Cloudflare (gratuit acum).

Pot fi analizate la fel, din rapoartele lor. Datele Netopia și Cargus există deja în Prime Expediere.
