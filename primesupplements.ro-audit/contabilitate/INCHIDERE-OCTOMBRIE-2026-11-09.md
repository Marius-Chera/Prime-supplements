# Închiderea lunii octombrie 2026 – verificare Oblio (9.11.2026)

Cerere: proprietarul a cerut, la închiderea de lună, verificarea în Oblio a recepțiilor (NIR) făcute de angajați, a corespondenței între facturile primite în SPV și recepțiile noastre, a inventarelor și a tot ce se poate verifica pe octombrie, cu identificarea greșelilor.

Metodă: doar citire, din Oblio (contul proprietarului, Claude in Chrome), rapoartele pentru 1–31.10.2026: Documente furnizori, Wallet SPV (inclusiv PDF-urile facturilor primite), Raport stocuri (toate cele 3 gestiuni, toate paginile), Inventar, Transferuri, Bon de consum, Raport facturi, Raport fără descărcare de gestiune, Raport încasări, Registru casă, starea e-Factura. Nimic nu a fost modificat în Oblio. Datele brute (fără date personale) sunt în `contabilitate/inchidere-2026-10/`.

## 0. Pe scurt – ce trebuie corectat sau lămurit

| # | Constatare | Gravitate | Cine |
|---|---|---|---|
| 1 | **Factura PRS15807 (5.10, 2.260 lei, Clubul Sportiv Universitar Sibiu) NU descarcă gestiunea**: 4 × Prime Whey 2 kg, 4 × Creapure 300 g, 5 cutii batoane (discount 100 %), 3 × Magna Shot etc. Stocul din Oblio e mai mare decât cel real cu aceste cantități. | mare | angajați / proprietar – de refăcut cu descărcare de gestiune sau de scos marfa prin bon de consum |
| 2 | **3 facturi storno din 28–29.10 nu readuc marfa în stoc** (PRS16398 −266 lei: 2 × Fat Burning Booster Shot; PRS16406 −150 lei: 3 × KSM-66 Ashwagandha; PRS16431 −104 lei: 2 × Liver Protect). Dacă marfa s-a întors fizic, stocul Oblio e mai mic decât cel real. | medie | angajați – de confirmat dacă produsele s-au întors; dacă da, NIR de retur / inventar |
| 3 | **Returul către Nutrafit din 7.10 (storno BWB 101465, −2.282,65 lei: 24 Core Choco, 24 Core Cookies, 120 Protein Brownie, 96 Blondie) nu are niciun document în Oblio** (nici în sept., nici în oct., nici în nov.). Stocurile actuale ale acestor produse în SHOP sunt mici (7 / 18 / 6 / 0), deci marfa a ieșit probabil printr-un inventar anterior, fără legătură cu factura storno. | medie | angajați – de spus cum s-a scos marfa; contabilul – factura storno trebuie să aibă corespondent |
| 4 | **3 NIR-uri cu date din septembrie introduse în octombrie** (după numerotare, între 14 și 21.10): NIRPRS8209 (Muscle Shop POS-14222, 26.09, 1.500,01), NIRPRS8210 (Muscle Shop 14228, 26.09, 567,01), NIRPRS8211 (Muscle Shop 13993, 5.09, 1.007,99); tot atunci a fost introdus și avansul Urban Body Studios 2197 (18.09, 18.004,80, fără NIR – corect, e avans). Modifică retroactiv luna septembrie (stoc + achiziții). | medie | contabil – de știut că septembrie s-a schimbat după închidere |
| 5 | **Registrul de casă: sold 199.317,31 lei la 31.10** (sold inițial 169.252,75 + încasări 30.064,56; zero plăți, zero depuneri la bancă în octombrie). Dacă numerarul se depune la bancă sau se plătesc furnizori cash, operațiunile nu sunt trecute în Oblio. | medie | contabil / proprietar |
| 6 | **Facturi neîncasate**: 90 facturi din octombrie cu rest de încasat 69.472,19 lei, din care **43 cu scadența depășită la 9.11: 31.416,05 lei** (lista în §6). | medie | proprietar / agent – de urmărit încasarea |
| 7 | **e-Factura – 7 facturi vechi netrimise** (din aprilie 2026, 5 către persoane fizice: 411, 483, 1.200, 250, 2.287 lei; plus 2 stornouri: ian. −124,50 și mar. −272). În octombrie: PRS16209 (939,66 lei, client din Slovenia – nerezident, nu e obligatorie) și PRS15944 (anulată). Cele 50 „netrimise” de pe 9.11 sunt facturile de azi, în termen. | mică | contabil – trimise sau clarificate |
| 8 | **Inventarele sunt folosite ca ajustări de stoc** pentru cadouri, produse expirate, produse pentru reels, deschidere cutii (23 de inventare în octombrie, diferență netă −301,46 lei). Contabil, aceste ieșiri ar trebui să fie bon de consum / protocol, cu document, nu „diferență de inventar”. În numerotare lipsesc INVPRS 8258, 8259, 8261, 8269, 8270 (șterse sau ciorne?). | mică | contabil + angajați – regulă de lucru |
| 9 | Diferențe de rotunjire NIR vs factură SPV (sub 0,05 lei la 8 facturi Muscle Shop / Nutrafit) și **o diferență de 0,27 lei** la Nutrafit 101514 (SPV 712,96 vs NIRPRS8216 712,69). | mică | – (informativ) |
| 10 | **Plățile către furnizori nu sunt înregistrate în Oblio** (toate cele 18 documente furnizori din octombrie au „plătit 0,00”). Nu e greșeală dacă plățile se țin la contabil, dar raportul „Rest de plată” din Oblio nu e de folosit. | informativ | – |

**Rezolvat:** punctul 6 din DE-FACUT („NIR D3 NIRPRS8215: antet 1.084,45 vs linii 15.222,24”) **nu e o greșeală**. Factura Urban Body Studios 2239 (21.10) conține: 1.023 buc D3+K2 × 14,88 = 15.222,24 lei, **minus avansul facturat pe 18.09 cu factura 2197** (1.000 buc × 14,88 = −14.880 lei), plus transport 554 lei = 896,24 + TVA = 1.084,45 lei. NIR-ul are corect 1.023 buc la 14,88 lei (cost unitar fără TVA); antetul e valoarea facturii finale. Singura observație: transportul de 554 lei nu e inclus în costul de achiziție (nici nu e obligatoriu).

**Fără probleme:** numerotarea facturilor e continuă (PRS15712–PRS16470, 759 facturi, 0 lipsă); NIR-urile pentru toate facturile de marfă primite în SPV în octombrie există și au valorile corecte; **nu există stoc negativ** la 31.10 în nicio gestiune (SHOP 702 produse / 354 cu stoc; ONLINE 752 / 433; EVENIMENT 82 / 43); transferurile între gestiuni (15 note GES0167–GES0183) au valoare ieșire = valoare intrare; nu există bonuri de consum în octombrie.

## 1. Recepții (NIR) vs facturi primite în SPV

În SPV au intrat în octombrie 50 de documente (lista completă în `inchidere-2026-10/spv-primite-oct.tsv`). Dintre ele, facturile de **marfă** și corespondentul lor în Oblio:

| Furnizor | Factură SPV | Valoare SPV | NIR Oblio | Valoare NIR | Observație |
|---|---|---|---|---|---|
| Pro Nutrition Impex | FPL 1037 (29.09) | 75.152,73 | NIRPRS8199 (29.09) | 75.152,73 | ok (septembrie) |
| Pro Nutrition Impex | FPL 1062 (8.10) | 192.851,97 | NIRPRS8204 (9.10) | 192.851,97 | ok |
| Pro Nutrition Impex | FPL 1070 (14.10) | 59.972,35 | NIRPRS8207 (14.10) | 59.972,35 | ok |
| Pro Nutrition Impex | FPL 1040 (30.09), FPL 1055 (7.10) | 375,10 / 937,75 | – | – | cutii de carton (ambalaje), nu marfă – fără NIR e acceptabil |
| Muscle Shop | POS-14753 | 4.135,50 | NIRPRS8201 | 4.135,50 | ok |
| Muscle Shop | POS-14769 | 480,01 | NIRPRS8202 | 480,00 | −0,01 |
| Muscle Shop | POS-14836 | 2.538,04 | NIRPRS8205 | 2.538,00 | −0,04 |
| Muscle Shop | POS-14889 | 87,00 | NIRPRS8206 | 86,99 | −0,01 |
| Muscle Shop | POS-14895 | 726,73 | NIRPRS8208 | 726,75 | +0,02 |
| Muscle Shop | POS-14990 | 621,02 | NIRPRS8213 | 621,00 | −0,02 |
| Muscle Shop | POS-15005 | 10.150,48 | NIRPRS8214 | 10.150,50 | +0,02 |
| Muscle Shop | POS-15008 | 3.509,99 | NIRPRS8217 | 3.509,99 | ok |
| Muscle Shop | POS-15110 | 4.465,52 | NIRPRS8219 | 4.465,50 | −0,02 |
| Nutrafit | BWB 101465 (7.10) | **−2.282,65** | **lipsă** | – | **retur fără document** (vezi §0 pct. 3) |
| Nutrafit | BWB 101512 | 806,05 | NIRPRS8218 | 806,04 | −0,01 |
| Nutrafit | BWB 101514 | 712,96 | NIRPRS8216 | 712,69 | **−0,27** |
| Nutrafit | BWB 101524 | 996,36 | NIRPRS8221 | 996,36 | ok |
| Nutrafit | BWB 101525 | 1.377,74 | NIRPRS8220 | 1.377,72 | −0,02 |
| Faunus Plant | FPLN 48 (7.10, primită 19.10) | 4.537,50 | NIRPRS8212 (21.10) | 4.537,50 | ok |
| Urban Body Studios | 2239 (21.10) | 1.084,45 | NIRPRS8215 (21.10) | 1.084,45 (1.023 buc D3+K2) | ok – vezi explicația de mai sus |
| Attila the Hun | 029 (6.10) | 181,00 | NIRPRS8203 (9.10) | 181,00 | ok |
| ARBOS d.o.o. (Slovenia) | – (intracomunitar, nu trece prin SPV) | – | NIRPRS8200 (1.10) | 5.644,20 | ok |

Restul documentelor din SPV sunt servicii și consumabile (curierat Cargus/FAN, chirie Piețe Sibiu, leasing BT și UniCredit, Orange, Digi, Netopia, theMarketer, Eurotax, Meda Consult, Cleverly Digital, Drip Motion, executor judecătoresc, tipărituri Sunimprof Rottaprint 5.876,12 / Print Shop Transilvania / Xpert Print, ambalaje BrandPaper și DC Folie, Jumbo, Altex, Cafe AZ, Wolt, un PFA colaborator). Nu au nevoie de NIR de marfă.

Total documente furnizori în Oblio în octombrie: 18, 289.234,31 lei cu TVA (240.226,74 fără TVA). Pe furnizori: Pro Nutrition 252.824,32; Muscle Shop 26.714,23; Faunus Plant 4.537,50; Nutrafit 3.892,81; Urban Body Studios 1.084,45; Attila the Hun 181,00. Lista: `inchidere-2026-10/nir-oct.tsv`.

Numerotarea NIR: 8201–8208 și 8212–8221 au date din octombrie; **8209, 8210, 8211 au date din septembrie**, dar au fost emise între 8208 (14.10) și 8212 (21.10) – vezi §0 pct. 4.

## 2. Stocuri la 31.10.2026
- Raportul de stocuri, 1–31.10, toate paginile: **niciun produs cu stoc negativ** în SHOP (702 produse, 354 cu stoc), ONLINE (752 produse, 433 cu stoc) sau EVENIMENT (82 produse, 43 cu stoc).
- Mișcări (valori din raport, fără TVA): ONLINE intrări 265.324,81 / ieșiri 172.366,30 / vânzări la preț de vânzare 564.962,93; SHOP intrări 38.946,36 / ieșiri 21.835,02 / vânzări 59.336,73; EVENIMENT intrări 1.635,64 / ieșiri 3.398,89 / vânzări 4.734,64.
- **Raport fără descărcare de gestiune** (octombrie): 4 documente – PRS15807 (2.260 lei) și stornourile PRS16398, PRS16406, PRS16431 (§0 pct. 1–2).

## 3. Inventare (23 în octombrie, `inchidere-2026-10/inventare-oct.tsv`)
Diferență netă −301,46 lei (minusuri 1.935,41; plusuri 1.633,95). Cele mai mari: ONLINE −626,98 (22.10, fără mențiune), ONLINE −487,18 (16.10, „cadou deschidere Kom Fitness”), ONLINE +412,80 (5.10), ONLINE +323,31 (7.10, „lipsă stoc / corecție după numărătoare fizică”), ONLINE +313,77 (30.10, „corecție inventar”), SHOP +299,53 (30.10, „deschidere cutie pentru vânzare la plic”), SHOP −238,36 (9.10, „produse pentru reels”), SHOP −218,08 și −119,87 (produse expirate). Două inventare cu diferență 0 (8264, 8265). Recomandarea pentru contabil e la §0 pct. 8.

## 4. Transferuri și bonuri de consum
15 note de transfer (GES0167–GES0183; lipsesc din listă 0181 și 0182 – probabil în noiembrie sau șterse), toate cu valoare ieșire = valoare intrare, în principal ONLINE → SHOP (cele mai mari: GES0167, 1.10, 5.466,40 și GES0173, 13.10, 5.445,87). Niciun bon de consum în octombrie. Lista: `inchidere-2026-10/transferuri-oct.tsv`.

## 5. Facturi emise
- 759 facturi PRS15712–PRS16470, fără lipsuri în numerotare; total 270.925,67 lei (include 25 de stornouri, −7.540,92 lei); 1 anulată (PRS15944, 220 lei); 0 ciorne; 1 factură în EUR; 11 bonuri fiscale emise din Oblio (5.464 lei).
- Încasări înregistrate în octombrie: 915 încasări, 274.424,12 lei – ramburs 127.695,24 (425), card 70.781,92 (212), bon fiscal 40.499,76 (252), ordin de plată 20.865,20 (20), chitanță 14.582,00 (6).

## 6. Facturi neîncasate din octombrie (la 9.11.2026)
90 facturi, rest de încasat 69.472,19 lei. **Scadență depășită: 43 facturi, 31.416,05 lei**, cele mai mari:

| Factură | Data | Scadența | Rest (lei) | Client |
|---|---|---|---|---|
| PRS15772 | 2.10 | 27.10 | 4.213,00 | Olimpic Fitnes Star SRL (mai are și PRS16424, 5.060 lei, scadentă 19.11) |
| PRS15807 | 5.10 | 15.10 | 2.260,00 | Clubul Sportiv Universitar din Sibiu |
| PRS16054 | 14.10 | 4.11 | 1.873,56 | Cybex Fitness SRL |
| PRS16052 | 14.10 | 4.11 | 1.582,00 | Kom Gym Project & Design SRL |
| PRS15773 | 2.10 | 27.10 | 1.375,00 | persoană fizică |
| PRS15742 | 1.10 | 11.10 | 994,00 | persoană fizică |
| PRS16043 | 13.10 | 3.11 | 973,00 | Downtown Fitness SRL |
| PRS16053 | 14.10 | 4.11 | 920,00 | Ovi Gym Moto SRL |
| PRS16432 | 29.10 | 29.10 | 891,00 | persoană fizică |
| PRS15912 | 8.10 | 18.10 | 870,00 | Extrem Nicola Sport SRL |
| PRS15832 | 5.10 | 15.10 | 847,00 | Teo & Co SRL |
| PRS16034 | 13.10 | 13.10 | 820,00 | persoană fizică |
| PRS15980 | 12.10 | 2.11 | 779,00 | MD Concept Fitness SRL |
| PRS15886 | 7.10 | 17.10 | 727,50 | persoană fizică |

Alte sume mari, încă în termen: Sas Gym Fitness Club 4.776,81 (17.11), Kom Gym 2.534 (10.11), Active Dee 1.787,47 (20.11) + 1.040 (9.11), MD Concept 1.676 (10.11), Unic Gym 1.104,81, Ovi Gym 1.057,84, Celsius Studio 1.043, Fitnesswelt 926,99, Cybex 880, Stay Fit Iride 880.

## 7. Registru de casă (octombrie)
Sold inițial 1.10: 169.252,75 lei; încasări 30.064,56 lei (94 bonuri fiscale 15.482,56 + 6 chitanțe 14.582,00); plăți 0; sold final 31.10: 199.317,31 lei. Un sold de casă de aproape 200.000 lei fără nicio ieșire înseamnă, cel mai probabil, că depunerile la bancă și plățile în numerar nu sunt operate în Oblio (§0 pct. 5).

## 8. e-Factura
Panoul de control: 45 facturi netrimise, 0 cu erori. Detaliu: 7 vechi (aprilie 2026 + 2 stornouri din ianuarie și martie), 1 din octombrie către client nerezident (PRS16209, nu e obligatorie), 1 anulată, restul facturile din 9.11 (în termenul de 5 zile). Facturi primite: 0 cu erori.

## 9. Ce să ceară proprietarul angajaților (scurt)
1. PRS15807 (CSU Sibiu, 5.10): de ce nu descarcă gestiunea; refăcută cu descărcare sau marfa scoasă prin bon de consum.
2. Stornourile PRS16398 / 16406 / 16431: s-a întors marfa? dacă da, de pus înapoi în stoc cu document.
3. Returul Nutrafit din 7.10 (264 buc batoane/brownie, 2.282,65 lei): prin ce document a ieșit marfa din Oblio.
4. De ce facturile Muscle Shop din 5.09 și 26.09 au fost recepționate abia în 14–21.10 (NIR 8209–8211); pe viitor recepția se face în luna facturii.
5. Cadourile, produsele pentru conținut și produsele expirate: ieșire pe bon de consum (cu mențiune), nu pe inventar.

## Tehnic (pentru sesiunile viitoare)
Endpoint-uri Oblio citite din pagină cu `getjqxhr(url, {page, filters:{"daterange-interval":"dd/mm/yyyy - dd/mm/yyyy", ...}, from_javascript:1}, "POST","json")`: `/report/get_expenses` (răspuns în `suppliers`; filtrele `document_numberf` și `supplierf_id` dau 500), `/report/get_docs` (`doc: invoice | tax_receipt`; `statusf` 661 = netrimise e-Factura, 662 = erori, 2 = anulate, 10 = storno, 6 = neîncasate; cu `stock_unload:1` = raportul fără descărcare), `/report/get_inventory` (`gestiune`), `/report/get_transfer` (`gestiune1/2`), `/report/get_consumption`, `/report/get_register` (`punct_lucru`, `currency_id`, `displayCategory:1`), `/report/get_collect`, `/report/get_stocks_inventory` (`fk_gestiune_id`, `only_select`, `product_name`; pagini de 50–70 produse, numărul maxim de pagini se ia din `pager`; `totals.stock` = stocul la finalul intervalului). NIR-ul se citește din `/expenses/get_preview/<id>`, factura din `/docs/get_preview/invoice/<id>` (HTML cu `<tr>`). PDF-urile din SPV (`/utils/show_file/...`) se pot citi în pagină cu pdf.js de pe cdnjs (`import()` merge pe oblio.eu). Ecranul tab-ului îngheață la screenshot pe paginile Oblio, dar JS merge; buclele lungi rulează în fundal cu rezultatele în `localStorage`; două bucle grele în paralel dau 502/504.
