# Audit campanii theMarketer — primesupplements.ro

**Data:** 15.10.2026 · **Pentru:** Marius Chera, Prime Sport Supplements SRL · **Platformă:** theMarketer (domeniu primesupplements.ro, expeditor contact@primesupplements.ro)
**Perimetru:** campaniile email și SMS (fără automatizări, care au audit separat). Doar citire, nimic nu a fost modificat în cont.

---

## 0. Pe scurt

1. **Cifrele din theMarketer arată de ~30 de ori mai mult venit (și de 16 ori mai multe comenzi) decât aduce emailul în realitate.** Pentru cele 26 de campanii din ultimele 6 luni, theMarketer raportează **228 de tranzacții / 89.064 lei**. Shopify, care numără doar comenzile venite dintr-un click pe link (UTM `TheMarketer / email`), vede **14 comenzi / 2.806 lei**. theMarketer atribuie unei campanii orice comandă a unui abonat care a *deschis* emailul în zilele următoare, chiar fără niciun click. Iar deschiderile sunt umflate de Apple Mail Privacy și de scannerele antivirus.
2. **Emailul aduce azi, măsurabil, ~5 comenzi pe lună** (campanii și automatizări împreună, după UTM): iulie 6, august 5, septembrie 4, octombrie 5 până pe 15. Ținta de 50 de comenzi pe lună înseamnă de 10 ori mai mult. Campaniile singure nu pot duce asta, vezi §6.5.
3. **Un singur subiect vinde măsurabil: crema de orez (stoc nou, preț).** A adus 9 din cele 14 comenzi UTM, iar oferta NAC încă 3. Vitaminele, creatina, Liver Protect, pre-workout, batoanele, arzătoarele, D3+K2 și izolatul au adus **0 comenzi din click**.
4. **Probleme critice, de rezolvat înainte de următoarea trimitere:**
   - **mențiuni de sănătate neautorizate** în **11 din 18** campanii citite integral, multe *în imagini*: „BOOST DE' IMUNITATE”, „DETOXIFIERE – Susține eliminarea toxinelor din organism”, „SĂNĂTATE MENTALĂ”, „CREȘTE FORȚA ȘI PUTEREA”, „RECUPERARE MAI RAPIDĂ”, „transformă grăsimea în energie, eficientizând pierderea în greutate”;
   - **produse din vechiul magazin WooCommerce** în blocurile de produs (6 din 18 campanii), cu imagini care dau 404 și prețuri greșite: batoane 144 lei în email față de 100 lei pe site, Emperor Mass 240 față de 340, Magnesium Citrate 65 față de 54;
   - **footer cu text negru pe fundal negru**: linkul de dezabonare, emailul de contact și „vezi în browser” nu se văd; datele firmei lipsesc;
   - **urgență falsă la NAC**: „Doar acum”, „Reducere limitată”, „în timp ce stocurile sunt încă disponibile”, deși prețul redus rulează din 28.07, iar azi e și mai mic (55 lei);
   - **afirmație falsă de compoziție**: NAC „apreciat pentru aportul său de N-acetilcisteină și glutation”. Produsul conține doar NAC.
5. **Template-ul încurcă click-ul:**
   - hero-ul e o imagine-text fără alt, de 0,4–1,9 MB, legată la homepage în 10 din 12 campanii recente;
   - butonul principal e gri și transparent, apoi urmează 3–10 butoane mici „Comanda”;
   - nu există variantă pentru dark mode;
   - **28% din click-uri ajung pe homepage**, nu pe produs.
6. **Frecvența medie e acceptabilă** (1,4 campanii pe săptămână din iulie; dezabonări 0,25% pe trimitere), dar are vârfuri iritante:
   - 2 emailuri aproape identice despre crema de orez la 24 de ore distanță (29 și 30.09);
   - crema de orez de 6 ori în 12 săptămâni;
   - SMS-ul „Magneziu” trimis de 2 ori în 42 de minute (15.07);
   - SMS și email în aceeași oră (20.07, 28.07).

   Problema principală e **relevanța și execuția**, nu volumul.

---

## 1. Ce am verificat și cum

- **`list_campaigns`, paginile 1–4, toate statusurile:**
  - 44 de campanii email trimise (30.06.2025 → 09.10.2026), dintre care 26 în ultimele 6 luni (din 15.04.2026);
  - 11 SMS trimise (7 în ultimele 6 luni);
  - 14 ciorne.
- **Citite integral**, cu HTML-ul pagină cu pagină plus raportul overview, benchmark și links: **18 campanii**:
  - cele **12 cele mai recente**: 09.10 → 18.08;
  - **cele mai bune 3 la lei/destinatar**: Back in Stock 20.07 (`6a5e25dc…`), Liver Protect 16.09 și Batoane 09.10 (ultimele două sunt deja printre cele 12); în plus, Izolat 14.08 (nr. 4, conține mențiunea „recuperare rapidă”);
  - **cele mai slabe 3**: NITROX 03.06 (`6a1fd39a…`), Sezonul rece 06.10 (deja printre cele 12) și Hanorac MNX 22.05 (`6a10380c…`); în plus, D3+K2 05.05 (nr. 4);
  - **NAC 04.08** (`6a71a75f…`), pentru mențiunea „detoxifiere”.
- **Imaginile hero** au fost descărcate și citite, pentru textul din ele.
- **Linkurile și imaginile** au fost verificate prin HTTP: redirecturi, 404, păstrarea UTM.
- **Prețurile din email** au fost comparate cu prețurile live din Shopify.
- **Shopify Analytics**: comenzi după `order_utm_source / medium / campaign` pe 90, 180 și 365 de zile, plus comenzi pe sursă de trafic.
- **Limite:**
  - conținutul SMS nu e disponibil prin API, doar statisticile;
  - blocurile de produs se randează azi din feed, deci la produsele Shopify prețul afișat poate diferi de cel din ziua trimiterii; la produsele vechi WooCommerce feedul nu s-a mai sincronizat de ~1 an, deci ce se vede azi e exact ce s-a trimis;
  - UTM „ultimul click” **subestimează** (cine dă click pe telefon și cumpără de pe laptop nu e numărat), iar theMarketer **supraestimează**. Adevărul e între ele și mult mai aproape de UTM decât de theMarketer.

---

## 2. Cifrele, citite corect

### 2.1 Toate campaniile email din ultimele 6 luni

„Deschideri unice %” = deschideri unice / livrate (theMarketer afișează un procent ceva mai mare). CTR = click-uri unice / livrate. CTOR = click-uri unice / deschideri unice. „Lei/destinatar” = venit atribuit de theMarketer / livrate. **Ultima coloană** = comenzi Shopify cu UTM `TheMarketer/email` și `utm_campaign` = subiectul campaniei (180 de zile).

| Data | Zi, ora RO | Campanie | ID | Livrate | Deschideri unice % | Click-uri unice | CTR % | CTOR % | Tranz. atribuite tM | Venit atribuit tM (lei) | **Lei / destinatar** | Dezab. | **Comenzi UTM Shopify (lei)** |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 2026-10-09 | Vi 19:30 | Gustarea perfectă (batoane) | `6ac897dade43f37db4094f7f` | 1.239 | 44,2 | 5 | 0,40 | 0,9 | 16 | 6.790 | **5,48** | 4 | **0** |
| 2026-10-06 | Ma 09:00 | Pregătit pentru sezonul rece (vitamine) | `6ac3e8e15520050c8908766a` | 1.213 | 46,3 | 3 | 0,25 | 0,5 | 4 | 634 | **0,52** | 0 | **0** |
| 2026-09-30 | Mi 20:00 | Crema de orez a revenit în stoc! Toate aromele | `6abcb4b5d1685da98a06ba22` | 1.191 | 47,2 | 12 | 1,01 | 2,1 | 13 | 4.219 | **3,54** | 1 | **2 (493)** |
| 2026-09-29 | Ma 20:00 | Crema de Orez Prime a revenit! Comandă acum | `6abba94428b7e927c20020e5` | 1.184 | 48,4 | 15 | 1,27 | 2,6 | 9 | 2.876 | **2,43** | 1 | **1 (130)** |
| 2026-09-25 | Vi 19:30 | Descoperă gama de vitamine și minerale | `6ab24bd9db7b7d9db6012b55` | 1.172 | 48,2 | 3 | 0,26 | 0,5 | 10 | 3.179 | **2,71** | 5 | **0** |
| 2026-09-22 | Ma 19:30 | Creatina pe care merită să o ai | `6ab24aa2c38ee069ab09a062` | 1.169 | 48,3 | 7 | 0,60 | 1,2 | 9 | 3.491 | **2,99** | 2 | **0** |
| 2026-09-16 | Mi 19:30 | Liver Protect la super promoție | `6aaab496f147b507aa04080f` | 1.157 | 50,4 | 5 | 0,43 | 0,9 | 9 | 6.430 | **5,56** | 2 | **0** |
| 2026-09-09 | Mi 19:00 | Descoperă Pre-Workout-ul potrivit | `6aa13ef6d641c8cbe102edb2` | 1.136 | 49,6 | 2 | 0,18 | 0,4 | 12 | 4.986 | **4,39** | 0 | **0** |
| 2026-09-02 | Mi 19:00 | Crema de orez a revenit în stoc (02.09) | `6a9805f8c88a288c030ed191` | 1.104 | 53,3 | 7 | 0,63 | 1,2 | 13 | 4.175 | **3,78** | 2 | **1 (193)** |
| 2026-08-24 | Lu 19:30 | Oferta încă disponibilă! NAC la 60 LEI | `6a8c00cff1c0c3335f0b7118` | 1.063 | 53,3 | 6 | 0,56 | 1,1 | 6 | 2.100 | **1,98** | 4 | **1 (182)** |
| 2026-08-20 | Jo 19:30 | Ofertă nouă: Pachet Health (cadou >450 lei) | `6a8589ea529bd5655d09ebdd` | 1.046 | 55,3 | 1 | 0,10 | 0,2 | 7 | 2.130 | **2,04** | 2 | **0** |
| 2026-08-18 | Ma 18:53 | Transformă Grăsimea în Energie (arzătoare) | `6a82b3e75a160a1be0065a7a` | 1.040 | 53,7 | 5 | 0,48 | 0,9 | 6 | 1.730 | **1,66** | 5 | **0** |
| 2026-08-14 | Vi 19:17 | Izolat proteic 92% | `6a7c2f4739f8e22c6d0b7f8d` | 1.035 | 54,7 | 11 | 1,06 | 1,9 | 12 | 4.959 | **4,79** | 7 | **0** |
| 2026-08-11 | Ma 19:00 | Crema de orez pentru rutina ta (preț special) | `6a7ae288d0259346b9034ca5` | 1.026 | 54,6 | 10 | 0,97 | 1,8 | 9 | 3.365 | **3,28** | 0 | **1 (110)** |
| 2026-08-04 | Ma 19:00 | NAC la doar 60 LEI | `6a71a75f10e7fa710a0b3e28` | 1.001 | 43,2 | 7 | 0,70 | 1,6 | 7 | 2.739 | **2,74** | 1 | **1 (260)** |
| 2026-07-28 | Ma 19:00 | Reducere limitată la NAC | `6a68b8e7d204e419840f8f55` | 970 | 44,4 | 9 | 0,93 | 2,1 | 8 | 2.586 | **2,67** | 4 | **1 (128)** |
| 2026-07-20 | Lu 20:00 | Back in Stock! Crema de Orez | `6a5e25dc881800a524075b69` | 933 | 46,4 | 11 | 1,18 | 2,5 | 11 | 7.384 | **7,91** | 3 | **0** |
| 2026-07-17 | Vi 09:00 | Magneziu Bisglicinat a revenit în stoc | `6a59513cc6fa69aec1004193` | 931 | 45,5 | 2 | 0,21 | 0,5 | 3 | 1.279 | **1,37** | 4 | **0** |
| 2026-07-13 | Lu 09:00 | Doar 45 lei/kg! Cremă de Orez | `6a53a63decae10668c085669` | 910 | 47,8 | 10 | 1,10 | 2,3 | 9 | 3.490 | **3,84** | 4 | **2 (400)** |
| 2026-07-05 | Du 19:00 | OFERTĂ SPECIALĂ: Cremă de Orez 45 LEI | `6a4a46ee29eeeb74ce054def` | 3.204 | 15,0 | 23 | 0,72 | 4,8 | 14 | 3.625 | **1,13** | 1 | **2 (466)** |
| 2026-06-27 | Sâ 10:00 | Ultimele zile reduceri până la 30% | `6a3cfa8d5f7ad66aaa08f549` | 3.199 | 14,1 | 13 | 0,41 | 2,9 | 11 | 4.367 | **1,37** | 5 | **0** |
| 2026-06-15 | Lu 10:01 | Summer Sale | `6a2f9e137fef5aa1370a4fc5` | 3.199 | 11,8 | 19 | 0,59 | 5,0 | 10 | 4.072 | **1,27** | 4 | **1 (394)** |
| 2026-06-03 | Mi 19:30 | NITROX | `6a1fd39a8c1a47131a000e2f` | 3.199 | 12,4 | 6 | 0,19 | 1,5 | 3 | 831 | **0,26** | 3 | **0** |
| 2026-05-22 | Vi 19:00 | Hanorac MNX | `6a10380c1d182f36f90884ea` | 3.198 | 14,9 | 10 | 0,31 | 2,1 | 5 | 2.181 | **0,68** | 3 | **0** |
| 2026-05-12 | Ma 19:00 | Shaker MNX 600 ml | `6a02d617430096e9830ca25a` | 3.203 | 15,8 | 7 | 0,22 | 1,4 | 7 | 3.098 | **0,97** | 8 | **1 (50)** |
| 2026-05-05 | Ma 20:00 | Vitamina D3+K2 | `69f9c5a082aa6cee730706be` | 3.213 | 20,3 | 7 | 0,22 | 1,1 | 5 | 2.348 | **0,73** | 10 | **0** |
| **Total 26** | | | | **42.935** | **31,3** | **216** | **0,50** | **1,6** | **228** | **89.064** | **2,07** | **85** | **14 (2.806)** |

**Observații:**
- Lista a fost curățată pe 13.07: au fost scoși ~2.300 de contacte etichetate „inactivi”. De atunci se trimite la ~900–1.240 de destinatari, în loc de ~3.200. Lei/destinatar și rata de deschidere au „crescut” doar pentru că a scăzut numitorul.
- **Deschiderile unice absolute au rămas aceleași** (≈ 380–650 înainte, ≈ 430–590 după). Contactele scoase nu deschideau oricum. Curățarea a fost bună pentru livrabilitate.
- Click-urile unice pe campanie: 1–15 după curățare. **CTOR mediu 1,3%**, iar fără roboți e și mai mic.

### 2.2 De ce „venitul atribuit” nu e venit generat de email

| Dovadă | Campanie | Ce arată |
|---|---|---|
| Tranzacții > click-uri, „rata de conversie” peste 100% | Pachet Health 20.08 (`6a8589ea…`) | 1 click în total, 7 tranzacții atribuite, „conversie 700%”. Batoane: 7 click-uri (5 unice), 16 tranzacții (228,6%). Pre-workout: 3 click-uri (2 unice), 12 tranzacții (400%). |
| Comenzile vin în zile fără click-uri | Batoane 09.10 (`6ac897da…`) | Timeline: 13 din 16 tranzacții (≈ 6.390 din 6.790 lei) sunt în 12–15.10, zile cu 0 click-uri. |
| Produsele cumpărate nu sunt cele promovate | Batoane 09.10 | Top produse comandate: Prime Whey 2 kg (11), cremă de orez (8+7). **Niciun baton** în top 10. |
| | Sezonul rece 06.10 (`6ac3e8e1…`) | Comandat: cremă de orez, Fiber, unt de migdale. **Nicio vitamină** din cele 9 promovate. |
| | Crema de orez „toate aromele” 30.09 (`6abcb4b5…`) | Pe primul loc: Frutilu (10+10 bucăți). |
| | Izolat 14.08 (`6a7c2f47…`) | 10 click-uri pe Pure Isolate, dar Pure Isolate nu apare în top 10 comenzi; pe primul loc tot Frutilu. |
| Click-uri de robot | NAC 24.08 (`6a8c00cf…`) | Fiecare dintre cele 4 iconițe sociale are exact 1 click, plus 3 produse vechi cu câte 1 click. Ultima deschidere și ultimul click sunt la 2 secunde distanță (scanner antivirus). |
| Shopify UTM, 90 de zile | toate | Newsletter: **8 comenzi / 1.495 lei** (theMarketer: 164 / 65.052 lei). Automatizări: **7 comenzi / 1.692 lei** (theMarketer: 77 / 25.090 lei). |
| Shopify UTM, 12 luni pe lună | toate | nov 2, dec 1, ian 4, feb 0, mar 2, apr 1, mai 1, iun 2, iul 6, aug 5, sep 4, oct (1–15) 5. **33 de comenzi în 12 luni.** |
| Sesiuni Shopify cu referrer email | toate | 90 de zile: 15 sesiuni din Gmail (3 cu checkout) și 2 sesiuni „themarketer”. Click-urile din aplicațiile de email apar de regulă ca „direct”, deci UTM-ul e singura măsură curată. |

**Concluzie:** cifrele din theMarketer arată cine *a primit și a deschis* emailul și apoi a cumpărat oricum. Ce *a generat* emailul sunt cele ~5 comenzi pe lună cu UTM, poate de 1,5–2 ori mai multe dacă socotim cumpărăturile făcute de pe alt dispozitiv. **Toate deciziile de conținut trebuie luate după click-uri și comenzi UTM, nu după „venit atribuit”.**

### 2.3 De ce sunt atât de puține click-uri la atâtea deschideri

Deschiderile unice sunt 44–55% (benchmark-ul contului 59,6% față de 21,8% în industrie), dar CTR-ul e 0,1–1,3% (contul 1,29% față de 3,4% în industrie). Cauzele, în ordinea importanței:

1. **Deschiderile sunt în mare parte deschideri „de mașină”** (Apple Mail Privacy Protection preîncarcă emailul; scannerele antivirus îl deschid și dau click). Rata reală de citire e probabil 15–25%. Dovezi: rata de deschidere a „sărit” de la ~15% la ~50% doar prin scoaterea inactivilor, fără mai multe deschideri absolute; click-urile pe toate iconițele sociale la NAC 24.08.
2. **Mesajul e într-o imagine fără text alternativ și fără legătură cu oferta.** În 10 din cele 12 campanii recente, hero-ul (0,4–1,9 MB PNG, `alt=""`) duce la **homepage**, nu la produs sau colecție. Unele imagini au butoane false desenate („DESCOPERĂ TOATĂ COLECȚIA →”, „COMANDĂ ACUM”) care duc tot la homepage. În Outlook, pe date mobile sau cu imaginile blocate, emailul începe cu un pătrat gol și un buton gri.
3. **Butonul principal aproape nu se vede:** contur gri de 1 px, fundal transparent, text negru „Comandă aici”, pus înaintea textului. Excepția confirmă regula: Izolat 14.08, singurul cu buton roșu plin spre produs, are 10 click-uri pe produs, cel mai mult din seria recentă.
4. **Prea multe alegeri:** grile de 3–9 produse, fiecare cu butonul ei „Comanda” (fără diacritice, în 6 nuanțe diferite de roșu și bleumarin: #E40101, #EA3908, #FF002C, #D62D2D, #A30018, #011F31). Sezonul rece are 10 butoane.
5. **Blocuri de produs stricate:** în 6 campanii, imaginile produselor vechi dau 404, iar prețurile sunt greșite sau lipsesc.
6. **Nu există motiv de click în afară de „cumpără”**: nici rețetă, nici ghid, nici recenzii, nici noutate reală în afară de stoc. Același subiect se repetă (crema de orez de 6 ori, NAC de 3 ori).
7. **Aceeași campanie merge la toată lista**, fără segmentare: vitamine la cei care cumpără doar proteină, hanorace la toți, restock la cei care tocmai au cumpărat.

### 2.4 Ce conținut câștigă (după click-uri și comenzi UTM, nu după venit atribuit)

| Tip de conținut | Campanii (6 luni) | CTR mediu | Comenzi UTM | Verdict |
|---|---|---:|---:|---|
| **Cremă de orez: revenire în stoc / preț 45–60 lei/kg** | 13.07, 20.07, 11.08, 02.09, 29.09, 30.09 (+ 05.07) | **0,6–1,3%** (cel mai mare, ~1,0% în medie) | **9** (1.792 lei) | **Câștigător clar.** Produs propriu, consum recurent, arome. Dar trebuie trimis segmentat, nu de 6 ori la toată lista. |
| Ofertă cu preț pe un produs (NAC 60 lei) | 28.07, 04.08, 24.08 | 0,6–0,9% | 3 (570 lei) | Merge, dar textul are mențiuni ilegale și urgență falsă. |
| Reducere generală (Summer Sale -30%) | 15.06, 27.06 | 0,4–0,6% | 1 (394 lei) | Slab, raportat la cât costă reducerea. |
| Produs unic, fără ofertă (creatină, NITROX, D3+K2, izolat, Liver Protect) | 5 campanii | 0,2–1,1% | **0** | Nu vinde. Izolat a adus click-uri, dar nicio comandă. |
| Gamă sau categorie (vitamine x2, pre-workout, arzătoare, batoane) | 5 campanii | 0,2–0,5% | **0** | Cele mai slabe. |
| Merch MNX (shaker, hanorac) | 12.05, 22.05 | 0,2–0,3% | 1 (50 lei) | Nu la toată lista. Doar ca adaos sau pentru clienți fideli. |
| Cadou la prag de comandă (Pachet Health ≥ 450 lei) | 20.08 | 0,1% | 0 | Idee bună și legală (fără cod de reducere), execuție slabă: buton spre homepage, un singur click. De retestat cu ofertă clară și buton spre o colecție. |

### 2.5 Zile și ore

- 21 din 26 de trimiteri au plecat seara (18:53–20:00, ora României), mai ales marți, miercuri și vineri. Doar 5 au plecat dimineața (09:00–10:00).
- Seara: 2,25 lei/destinatar și CTR 0,50%. Dimineața: 1,46 lei/destinatar și **același CTR, 0,50%**. Comparația e distorsionată de subiect și de mărimea listei (2 din cele 5 trimiteri de dimineață au mers la lista mare de 3.200), nu arată un efect al orei.
- **Concluzie:** ora nu e problema. Păstrați seara (marți–joi, 19:30). Testați „theMarketer optimal time – criteriu *buying*” (calculează ora pentru fiecare abonat din istoricul de comenzi) pe 50% din listă, timp de 4 campanii.

### 2.6 Frecvență, creșterea listei, dezabonări

- **Campanii email:**
  - din 13.07: 19 în 13,4 săptămâni, adică **1,4 pe săptămână**;
  - 6 săptămâni au avut câte 2 emailuri (10.08, 17.08, 21.09, 28.09, 05.10 și săptămâna din 13.07);
  - intervale de doar **1 zi** (29→30.09, același subiect) și de 2–3 zile (22, 25, 29, 30.09: 4 emailuri în 9 zile).
- **SMS:**
  - 7 în ultimele 6 luni (iunie–iulie, niciunul din august), la ~430–1.000 de numere;
  - **dublura 15.07**: „Magneziu Bisglicinat a revenit în stoc!” plecat la 16:00 și din nou la 16:42 către aceleași 428 de numere; a doua trimitere a avut 0 tranzacții;
  - SMS în aceeași oră cu emailul pe același subiect: 20.07 (email 17:00, SMS 17:13) și 28.07 (ambele la 16:00);
  - SMS și email la 1–2 zile distanță: Summer Sale 15–16.06 și 27–29.06.
- **Automatizări:** se adaugă peste campanii. Un abonat nou primește seria de bun venit (2 emailuri) în aceeași săptămână cu 1–2 campanii, deci poate ajunge la **3–4 emailuri pe săptămână** în prima săptămână. „Smart sending” (sărirea celor contactați recent) e **dezactivat** la toate campaniile.
- **Dezabonări** din campanii: 85 la 42.935 de livrări în 6 luni (0,20%); 51 la 20.520 din 13.07 (0,25%). Plângeri (în rapoartele citite): 1 la Izolat, 1 la NITROX. Maxime: Izolat 14.08 (7 dezabonări, 0,68%), arzătoare 18.08 (0,48%), vitamine 25.09 (0,43%), D3+K2 (10 dezabonări). Istoric: „Cadou de Crăciun” 01.12.2025 (49 de dezabonări, 1,43%) și Black Friday 16.11.2025 (27).
- **Creșterea listei:** destinatari 910 (13.07) → 1.239 (09.10), adică **+329 în 88 de zile (+3,7 pe zi net)**, aproape exact ritmul pop-up-ului (~4 pe zi). Dezabonările (~0,6 pe zi din campanii) sunt mici față de intrări.
- **Concluzie:** lista tolerează frecvența actuală. Problema e repetarea aceluiași subiect și trimiterea fără segmentare. Pragul propus e în §6.3.

---

## 3. Constatări (severitate, dovezi, campanie)

Severitate: **CRITIC** = risc legal sau de reputație, de oprit imediat · **MARE** = taie direct din click-uri și comenzi · **MEDIU** = calitate și consecvență · **MIC** = igienă.

| # | Severitate | Constatare | Campanii (ID) |
|---|---|---|---|
| C1 | CRITIC | Mențiuni de sănătate neautorizate sau implicite (text și imagini) | 11 din 18 citite, vezi §3.1 |
| C2 | CRITIC | Produse vechi WooCommerce în blocurile de produs: imagini 404, prețuri greșite, linkuri `/produs/` | Batoane 09.10, Vitamine 25.09, Creatina 22.09, Pre-workout 09.09, NAC 24.08, NAC 04.08 |
| C3 | CRITIC | Footer: text #000000 pe fundal #000000; dezabonare, contact și „vezi în browser” invizibile; lipsesc denumirea firmei, CUI și adresa | Toate campaniile citite (același șablon) |
| C4 | CRITIC | Urgență falsă sau ofertă neclară: „Doar acum”, „Reducere limitată”, „în limita stocului” la un preț redus care durează de 2,5 luni; „super promoție” fără preț; „ofertă limitată” la hanorac fără preț | NAC 28.07, 04.08, 24.08 · Liver Protect 16.09 · Hanorac 22.05 |
| C5 | CRITIC | Compoziție falsă: NAC „aportul său de N-acetilcisteină și glutation” | NAC 24.08 `6a8c00cf…` |
| M1 | MARE | Atribuirea theMarketer (pe deschidere, mai multe zile) e luată drept rezultat, ceea ce duce la decizii greșite de conținut | Toate |
| M2 | MARE | Hero = imagine-text, `alt=""`, 0,4–1,9 MB PNG, legată la homepage; butoane false desenate în imagine | 18 din 18 fără alt; 10 din 12 recente spre homepage |
| M3 | MARE | Buton principal slab (contur gri, transparent), plus 3–10 butoane „Comanda” în culori diferite | 16 din 18 |
| M4 | MARE | Fără segmentare (audience = „all”) și smart sending oprit | Toate cele 44 |
| M5 | MARE | Repetiție și vârfuri de frecvență: crema de orez de 6 ori în 12 săptămâni, două emailuri la 24 h, SMS duplicat, SMS și email în aceeași oră | 29 și 30.09; SMS 15.07 ×2; 20.07; 28.07 |
| M6 | MARE | Lipsa avertismentelor obligatorii (cafeină, mențiunea generală despre suplimente, doza) | Pre-workout 09.09, NITROX 03.06, Arzătoare 18.08, D3+K2 05.05 |
| M7 | MARE | Dark mode inexistent; stiluri lipite din ChatGPT (fundal alb forțat); logo JPG cu fundal alb; footer negru | Toate; Izolat 14.08 cel mai grav |
| M8 | MARE | Prețuri lipsă în blocuri (casete goale) | Pre-workout 09.09, NAC 24.08, Hanorac 22.05 |
| D1 | MEDIU | UTM: `utm_campaign={{subject_line}}` (emoji și diacritice în rapoarte); parametri interni de căutare Shopify în linkuri (`?_pos=1&_psq=…&_ss=e`); buton spre pagina de căutare | Creatina 22.09, NAC 04.08 și 24.08, NITROX 03.06, D3+K2 05.05; Back in Stock 20.07 |
| D2 | MEDIU | Blocul personalizat „Recomandate pentru tine” scoate acum îmbrăcăminte nouă cu imagini .avif (nu se afișează în Outlook) | Liver Protect 16.09, Pachet Health 20.08 |
| D3 | MEDIU | Produse nepotrivite în context: nattokinază și silimarină într-un email „imunitate”; Fat Burning Booster într-un email pre-workout | Sezonul rece 06.10, Pre-workout 09.09 |
| D4 | MEDIU | Subiecte și preheadere: engleză („Back in Stock”, „BOOST”), greșeli („BOOST DE' IMUNITATE”, spații duble, „toata”), ton amestecat („Profitați… colecția dumneavoastră” lângă „tu”), emoji la început aproape peste tot | multe |
| D5 | MEDIU | Inconsecvență de conținut: „4 arome” pe 29.09, apoi „toate aromele” (7 în text, 5 în imagine) pe 30.09; imaginea batoanelor arată aroma „Berries”, care nu e în stoc | 6abba944…, 6abcb4b5…, 6ac897da… |
| D6 | MEDIU | HTML: `lang="en"`, `<title>` gol, font de rezervă Times New Roman pe container, lățime 700 px, umbră pe container | Toate |
| D7 | MIC | 14 ciorne, dintre care una „dsfdf”/„rgge” (12.10.2026), o dublură „Pregătit pentru sezonul rece”, ~10 fără nume și o ciornă „Super Black Friday SMS”: risc de trimitere din greșeală | ciorne |
| D8 | MIC | Black Friday 2025 trimis (16.11.2025, „Până la –50%… cele mai mari reduceri ale anului”); regula actuală este fără Black Friday | `6916f89b…` |
| D9 | MIC | Iulie–august 2025: expeditor pe domeniul comun `…@primesupplements.ro.mktrmail.com` și 5 adrese interne ca destinatari suplimentari. **Rezolvat în 2026** (contact@primesupplements.ro) | `6899d762…`, `688c4c26…`, `687f4dad…` și altele |

### 3.1 C1 — Mențiuni de sănătate: citate exacte

Reguli: Reg. 1924/2006 art. 10 (doar mențiuni autorizate, cu condițiile lor) și art. 1(3) (nume comerciale care sugerează un efect); Reg. 432/2012 (formulări exacte); Legea 56/2021 art. 7(5) (în publicitate, doar informații de pe etichetă). Cuvintele „detox”, „imunitate” (ca promisiune), „arde grăsimi” și „recuperare rapidă” sunt interzise prin regulile casei. Etichetele produselor au sloganuri în engleză (ENERGY, IMMUNITY, DETOX, LIVER FUNCTION…) care **nu se copiază**.

| Campanie (ID) | Unde | Text exact | Problema |
|---|---|---|---|
| Transformă grăsimea… 18.08 (`6a82b3e7…`) | Subiect | „💪 Transformă Grăsimea în Energie cu arzătoarele de grăsimi Prime!” | Promisiune de efect pe metabolismul grăsimilor; nu există mențiune autorizată |
| | Preheader | „Arzătoarele de grăsimi stimulează metabolismul și transformă grăsimea în energie, eficientizând pierderea în greutate.” | Promisiune de slăbire (art. 12 b interzice și rata sau cantitatea de slăbire) |
| | Body | „…când obiectivul tău este să reduci procentul de grăsime și să obții un fizic mai definit, poți adăuga… suplimentele potrivite” | Efect implicit |
| | Imagine (ambalaj) | „FAT BURNING BOOSTER – DESTROY FATTY CELLS”, „THERMO CORE FAT BURNER – Energy, Appetite control, Fat metabolism” | Sloganuri neautorizate afișate în reclamă; fără avertisment pentru cafeină |
| Izolat 92% 14.08 (`6a7c2f47…`) | Preheader | „Izolatul proteic din zer cu 92% proteine favorizează creșterea musculară și recuperarea rapidă post-antrenament, fiind ideal pentru rezultate optime.” | „Recuperare rapidă” e neautorizată; creșterea musculară e permisă doar ca „Proteinele contribuie la creșterea masei musculare” |
| | Body | „Susține recuperarea, imunitatea și te ajută să-ți păstrezi masa musculară chiar și când ții dietă.” · „absorbție rapidă” · „Concentrație maximă de proteine” | Recuperare, imunitate și absorbție sunt neautorizate; „maximă” e superlativ |
| Creatina 22.09 (`6ab24aa2…`) | Body | „Susține forța și performanța în timpul antrenamentelor de intensitate ridicată” · „Sprijină producerea de energie necesară efortului exploziv” · preheader „Simplu. Pur. Eficient.” | Altă formulare decât cea autorizată; „forța” e permisă doar la adulți peste 55 de ani, cu antrenament de rezistență; lipsește condiția de 3 g pe zi |
| | Imagine | „Forță mai mare, performanță și rezultate reale!” · „CREȘTE FORȚA ȘI PUTEREA” · „SUSȚINE CREȘTEREA MUSCULARĂ” · „RECUPERARE MAI RAPIDĂ” | Toate neautorizate pentru creatină |
| NAC 04.08 (`6a71a75f…`) | Preheader | „NAC este aliatul ideal pentru cei care își doresc susținerea detoxifierii organismului și a unei recuperări optime. Doar acum…” | NAC nu are nicio mențiune autorizată; „detox” interzis; urgență falsă |
| | Body | „…un supliment apreciat pentru susținerea proceselor naturale de detoxifiere, echilibrului mental și recuperării.” | La fel; „echilibru mental” se apropie de o mențiune medicală |
| NAC 04.08 și 24.08 | Imagine | „DETOXIFIERE – Susține eliminarea toxinelor din organism” · „SĂNĂTATE MENTALĂ – Susține claritatea mentală și echilibrul emoțional” · „PERFORMANȚĂ și recuperare optimă”; pe etichetă: „DETOX • MENTAL HEALTH • GLUTATHIONE PRECURSOR” | Cel mai grav vizual |
| NAC 24.08 (`6a8c00cf…`) | Body | „Un produs apreciat pentru aportul său de N-acetilcisteină și glutation” | **Fals**: produsul conține doar NAC |
| Sezonul rece 06.10 (`6ac3e8e1…`) | Body (H1, în engleză) | „BOOST YOUR IMMUNITY 🍂” | „Boost” imunitar e neautorizat (autorizat: „…contribuie la funcționarea normală a sistemului imunitar”, doar la vitaminele C și D și la zinc) |
| | Imagine | „BOOST DE' IMUNITATE” · „VITAMINE ȘI MINERALE PENTRU O TOAMNĂ MAI PUTERNICĂ” · „SUSȚINE SISTEMUL IMUNITAR” · „REDUCE OBOSEALA” · „AJUTĂ LA GESTIONAREA STRESULUI” · „PENTRU O STARE GENERALĂ MAI BUNĂ” | Puse generic pe 9 produse, inclusiv nattokinază, silimarină și turmeric, care nu au nicio mențiune; „stres” nu are mențiune autorizată; „reduce oboseala” e o parafrază (autorizat: „contribuie la reducerea oboselii și extenuării”) |
| Vitamine 25.09 (`6ab24bd9…`) | Imagine | Etichete vizibile: Silymarin „NATURAL DETOX • LIVER FUNCTION”, Spirulina „ENERGY • IMMUNITY • BALANCE” | Sloganuri de etichetă care nu au voie în reclamă |
| Liver Protect 16.09 (`6aaab496…`) | Imagine | „Susținerea funcției hepatice normale” · „Sprijin pentru digestie” | Mențiuni botanice „on hold”: varianta prudentă e să nu promitem efecte |
| | Preheader | „…un mix concentrat de extracte vegetale benefice!” | Beneficiu implicit |
| | Nume produs | „Liver Protect” | Art. 1(3): un nume care sugerează un efect trebuie însoțit de o mențiune autorizată, iar pentru plante nu există una. De discutat cu un jurist; în email, folosiți și denumirea descriptivă „extract hidrogliceric din plante, 500 ml” |
| Pre-workout 09.09 (`6aa13ef6…`) | Preheader | „Primește un boost de energie cu selecția de Pre-Workout de la Prime!” | Mențiunile despre cafeină și energie sunt neautorizate; avertismentul pentru cafeină lipsește |
| NITROX 03.06 (`6a1fd39a…`) | Preheader | „Cu NITROX, primești energia, focusul și pump-ul necesar pentru a te antrena la intensitate maximă!” | Neautorizat |
| | Body | „✔ Energie și concentrare susținute ✔ Rezistență fizică îmbunătățită ✔ Pump muscular și vascularizare optimizate ✔ Recuperare mai eficientă după efort ✔ Susținerea metabolismului energetic și a stării generale de bine” | Neautorizat; avertismentul pentru cafeină lipsește |
| D3+K2 05.05 (`69f9c5a0…`) | Subiect | „…suport complet pentru sănătatea ta” | Mențiune generală (art. 10(3)) |
| | Body | „combinația esențială pentru oase puternice, imunitate și echilibru zilnic” · „sprijină sănătatea cardiovasculară” · „ajută la menținerea forței musculare” · „formulă ideală pentru utilizare zilnică” | Cardiovascular: neautorizat. „Forța musculară”: formulare greșită (autorizat: „funcției normale a sistemului muscular”). **Contradicție cu eticheta**: 1 capsulă **la 2 zile** (4000 UI). „Contribuie la funcționarea normală a sistemului imunitar” e corect |
| Pachet Health 20.08 (`6a8589ea…`) | Body | „Ai grijă de tine…” · „Un duo creat… pentru un plus de susținere zi de zi.” | Mențiune generală fără mențiune specifică (art. 10(3)): mic |
| Batoane 09.10 (`6ac897da…`) | Imagine | „ENERGIE PENTRU ZIUA TA” | Mic: pentru un aliment poate fi acceptat ca aport caloric, dar evitați-l |

În **niciun** email nu apare mențiunea generală obligatorie pentru suplimente („Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată și un stil de viață sănătos. Nu depășiți doza zilnică recomandată. A nu se lăsa la îndemâna copiilor mici.”).

### 3.2 C2 — Feedul vechi WooCommerce din catalogul theMarketer

- Catalogul theMarketer are **70 de produse vechi**: URL `www.primesupplements.ro/produs/…`, imagini `…/wp-content/uploads/…` care **dau 404**, ultima sincronizare acum ~1 an, toate „out of stock” și **niciunul dezactivat**. Lângă ele sunt 209 produse Shopify, cu nume aproape identice. În editor, cine caută „baton” sau „creatina” găsește ambele variante și le alege pe cele vechi.
- **Linkurile `/produs/x/`** fac un redirect 301 spre `/products/x`. UTM-ul se păstrează (verificat), deci click-ul funcționează. Excepție: `/produs/baton-proteic-alune-si-caramel/` duce la colecție, pentru că produsul nu mai există.
- **Prețurile afișate în email față de Shopify azi:**
  - Batoane: **144 Lei** față de **100 lei** cutia de 12 sau 8,5 lei bucata;
  - Creapure 500 g: **170** față de **180**;
  - Emperor Mass 3 kg: **240** față de **340**;
  - Combat PRO: **160** față de **140**;
  - Magnesium Citrate: **65** față de **54**.

  Un preț afișat greșit într-o comunicare comercială e o practică înșelătoare (Legea 363/2007) și strică încrederea: clientul vede alt preț pe site.
- **Imaginile hero** au 0,4–1,9 MB. Formatul .avif al produselor de îmbrăcăminte noi nu se afișează în Outlook pe desktop.

### 3.3 C3 — Footer invizibil și lipsa datelor firmei

În toate șabloanele, tabelul `data-comp="footer"` are `bgcolor="rgb(0, 0, 0)"`, iar textele din el au `color: #000000`. Asta înseamnă:
- „Dacă doriți să vă dezabonați, faceți clic **Aici**” e negru pe negru;
- linkul `contact@primesupplements.ro` e negru pe negru;
- „Vizualizați acest e-mail ca pagină web” e negru pe negru.

Se văd doar iconițele sociale, care sunt albe. Consecințe:
- dezabonarea nu e „la fel de ușoară ca abonarea” (GDPR art. 7(3), art. 21);
- Gmail și Yahoo cer ca expeditorii în masă să aibă un link de dezabonare vizibil, pe lângă antetul List-Unsubscribe;
- cine nu găsește linkul apasă **„Spam”**, ceea ce strică reputația domeniului.

Lipsesc și **denumirea firmei, CUI-ul și adresa**: PRIME SPORT SUPPLEMENTS SRL, CUI 46260823, J32/1155/2022, Str. Ioan Virgil Ispas nr. 17A, Cisnădie, jud. Sibiu (Legea 365/2002, informarea despre furnizor).

### 3.4 C4 — Urgență și prețuri de referință

- **NAC:**
  - 28.07: „🔥 Reducere Limitată la NAC – Profită Acum!”, „Stoc limitat, preț special… Nu rata oferta!”;
  - 04.08: „Doar acum, este disponibil la 60 LEI în loc de 85 LEI.”;
  - 24.08: „🚨 Oferta încă este disponibilă!… în timp ce stocurile sunt încă disponibile!”, „Oferta este valabilă în limita stocului disponibil.”

  Azi NAC costă **55 lei** (preț comparat 85). Prețul redus nu a fost „doar acum”: Legea 363/2007, anexa 1, pct. 7, interzice declarațiile false că o ofertă e disponibilă doar pentru foarte scurt timp. Prețul de referință de 85 lei trebuie să fie cel mai mic preț din cele 30 de zile dinaintea reducerii (HG 947/2000 art. 4¹), iar procentul se calculează față de acesta.
- **Liver Protect 16.09**: subiectul spune „la super promoție”, dar **corpul emailului nu are niciun preț și nicio ofertă**. Azi produsul costă 20 lei, față de 73 lei prețul comparat.
- **Hanorac MNX 22.05**: „Reducere specială disponibilă acum”, „Profită de oferta limitată”, dar emailul nu are niciun preț.
- **Back in Stock 20.07**: „Grăbește-te să cumperi înainte să se epuizeze stocul!”, „S-a epuizat în doar 14 zile”. E în regulă **doar dacă e adevărat** și se bazează pe stocul real; păstrați dovada.

### 3.5 M2/M3/M7 — Template: ce e greșit tehnic

**Hero:**
- `<img alt …>` (alt gol) în toate cele 18 campanii;
- imagini de 1080–1672 px lățime, PNG, **0,4–1,9 MB** (ex. Batoane 1,89 MB, Crema de orez 1,83 MB, Pre-workout 1,58 + 1,24 MB);
- 10 din 12 duc la `https://www.primesupplements.ro` (homepage), plus un redirect www → fără www;
- **28% din click-uri** (27 din 95 în cele 12 rapoarte) ajung pe homepage, prin logo sau hero.

**Butoane:**
- principal: `border:1px solid #727272; background:transparent; color:#000; padding:5px 20px` („Comandă aici”, „Vezi produsele aici”), înaintea textului;
- secundare: „Comanda” (fără ă), 12 px, 6 culori diferite.

**Dark mode și HTML:**
- lipsesc `<meta name="color-scheme">` și `@media (prefers-color-scheme: dark)`;
- fundal alb forțat (`bgcolor rgb(255,255,255)`), text #000;
- logo JPG cu fundal alb (`logo_resized.jpg`, alt „logo”) devine un dreptunghi alb pe fundal închis;
- la Izolat 14.08, textul e lipit din ChatGPT cu stiluri inline (`font-family:-apple-system-body, ui-sans-serif…; color: rgb(13,13,13); background-color: rgb(255,255,255)`), ceea ce dă cutii albe în dark mode și font diferit;
- `lang="en"`, `<title>` gol, container de 700 px cu `font-family:'Times New Roman'` ca rezervă și umbră;
- preheaderul nu e urmat de spații de umplere, deci unii clienți completează previzualizarea cu „Comandă aici…”.

**Bine:** HTML-ul are 17–62 KB, sub pragul de 102 KB la care Gmail taie emailul. Imaginile produselor Shopify au alt descriptiv.

### 3.6 Expeditor, preheadere, subiecte

- **Expeditor:** „Primesupplements.ro” <contact@primesupplements.ro>, reply-to contact@primesupplements.ro, pe domeniu propriu (SPF, DKIM, DMARC). Corect și consecvent în 2026. Propunere de test: „Prime Supplements” sau „Marius · Prime Supplements” pentru încredere.
- **Preheadere:** există la toate. Prea des conțin mențiunea problematică (vezi §3.1) sau repetă subiectul. Unele sunt prea lungi (Vitamine 25.09: ~190 de caractere; în inbox se văd ~40–90).
- **Subiecte:**
  - emoji la începutul subiectului în 13 din ultimele 19 campanii;
  - engleză („Back in Stock!”, „Summer Sale”, „BOOST”);
  - greșeli și neglijențe: „Crema de orez  a revenit” (două spații), „15% REDUCERE la toata gama” (ian.);
  - superlativ: „unul dintre cele mai apreciate hanorace MNX”.

---

## 4. Ce păstrăm

1. **Domeniul propriu de trimitere** (contact@primesupplements.ro, SPF, 6 DKIM, DMARC) și reply-to-ul real. Sunt deja corecte.
2. **Ritmul de ~1 campanie pe săptămână, seara.** Lista îl tolerează (0,2–0,25% dezabonări, aproape zero plângeri). Nu trimiteți mai des.
3. **Anunțurile despre crema de orez** (stoc nou, arome, preț pe kg): singurul conținut care aduce comenzi măsurabile (9 din 14) și cel mai mare CTR (1,0–1,3%). Produs propriu, consum recurent.
4. **Focus pe un singur produs, cu buton plin spre produs și hero legat de produs**: Izolat 14.08 (10 click-uri pe produs) și Hanorac 22.05 (toate cele 10 click-uri pe produs). Formatul aduce click-uri; mai trebuie oferta și segmentul potrivit.
5. **Hero legat de colecție sau produs**, cum a fost la Vitamine 25.09, Arzătoare 18.08 și Izolat 14.08. Trebuie făcut așa la fiecare email.
6. **Blocul personalizat „Recomandate pentru tine”**: a luat 3 din 6 click-uri la Liver Protect. Păstrați-l, dar limitați-l la suplimente și alimente, fără .avif.
7. **Cadou la un prag de comandă** (Pachet Health ≥ 450 lei): alternativă legală la codurile de reducere noi. De retestat cu execuție corectă.
8. **Curățarea listei din iulie**: nu s-a pierdut nicio deschidere reală. De completat cu o secvență de win-back înainte de sunset, cum recomandă și agenția.
9. **Mesajul sincer din Back in Stock 20.07** („S-a epuizat în doar 14 zile”), dacă e adevărat: e dovadă socială reală.

## 5. Ce oprim

1. **Orice efect promis care nu e o mențiune autorizată de pe etichetă**, în text sau în **imagine**: imunitate „boost”, detox, sănătate mentală, arderea grăsimilor, pierdere în greutate, recuperare (rapidă), forță, absorbție rapidă, sănătate cardiovasculară, „suport complet pentru sănătate”. Și sloganurile în engleză de pe ambalaje folosite ca argument.
2. **Blocurile cu produse vechi** (`/produs/…`, `wp-content`) și prețurile scrise manual în imagini.
3. **„Doar acum”, „Reducere limitată”, „în limita stocului”, „Grăbește-te”** când nu e adevărat. **„Super promoție” fără preț.**
4. **Același subiect de două ori în 48 de ore** către toată lista; **SMS în aceeași zi cu emailul**; SMS-uri duplicate.
5. **Hero spre homepage** și **butoane desenate în imagine**.
6. **Grile de 6–9 produse cu câte un buton fiecare.**
7. **Copy lipit din ChatGPT cu tot cu formatare**, și textele în engleză în emailurile românești.
8. **Black Friday** (regula casei) și campaniile de tip „până la –50%, cele mai mari reduceri ale anului”.
9. **Măsurarea după „venit atribuit” theMarketer.** Măsurați după comenzile UTM din Shopify și după click-uri.
10. **Trimiterea la „toți abonații” pentru orice subiect de nișă**: vitamine, arzătoare, merch, NAC.

---

## 6. Corecturi concrete

### 6.1 P0: înainte de următoarea campanie (săptămâna aceasta)

| # | Acțiune | Cum | Verificare |
|---|---|---|---|
| 1 | **Dezactivați cele 70 de produse vechi WooCommerce** din catalogul theMarketer | Fiecare produs cu URL `/produs/` primește „disabled”, prin `update_product` sau din aplicație, Products. Alternativ, cereți suportului theMarketer ștergerea feedului WooCommerce vechi | `list_products search="/produs/"` nu mai arată niciun produs activ |
| 2 | **Footer nou în șablonul de bază**, pentru campanii și automatizări | Fundal închis cu text deschis (#FFFFFF sau #E5E5E5, contrast ≥ 4.5:1) **sau** fundal deschis cu text închis. Dezabonare vizibilă („Dezabonează-te”), „Ești abonat pentru că te-ai înscris pe primesupplements.ro”, PRIME SPORT SUPPLEMENTS SRL · CUI 46260823 · J32/1155/2022 · Str. Ioan Virgil Ispas nr. 17A, Cisnădie, jud. Sibiu · 0775 286 584 · contact@primesupplements.ro, plus mențiunea standard pentru suplimente | Trimiteți un test pe Gmail, Outlook și iPhone, în light și dark mode |
| 3 | **Checklist pentru mențiuni**, obligatoriu înainte de „Trimite” | Vezi §6.4. Verificați subiectul, preheaderul, corpul **și textul din imagini** | Aprobare scrisă de Marius înainte de programare |
| 4 | **UTM curat** | `utm_source=themarketer`, `utm_medium=email`, `utm_campaign=AAAA-LL-ZZ-subiect-scurt` (fără emoji și diacritice), `utm_content=hero / buton / produs-<handle>` la fiecare link. Fără `?_pos=…&_psq=…`. Linkuri directe spre `/products/<handle>` sau `/collections/<handle>` | Raportul Shopify „order_utm_campaign” e lizibil |
| 5 | **Curățenie la ciorne**: arhivați cele 14, inclusiv „Super Black Friday SMS” | Din aplicație, Archive | `list_campaigns status=draft` e gol |
| 6 | **Corectați oferta NAC** | Dacă prețul de 55 lei e permanent, comunicați-l ca preț, nu ca „reducere limitată”. Dacă e promoție, puneți data reală de sfârșit și prețul minim din cele 30 de zile | Pagina de produs arată prețul de referință corect |

### 6.2 P1: șablonul nou de campanie (2–3 săptămâni)

Un singur șablon de brand, comun pentru campanii și automatizări, cum cere și agenția:
- **Lățime 600 px.** Fonturi: Arial sau Helvetica pentru tot (fără Times de rezervă). `lang="ro"`, `<title>` = subiectul. `<meta name="color-scheme" content="light dark">` și `<meta name="supported-color-schemes" content="light dark">`, plus stiluri `@media (prefers-color-scheme: dark)`.
- **Logo** PNG transparent (sau două variante, pentru fundal deschis și închis), alt „Prime Supplements”, legat la homepage. **E singurul link spre homepage.**
- **Titlul (H1) ca text real**, nu în imagine, 24–28 px, maxim 8 cuvinte. Imediat sub el, 2–4 rânduri de text și un **singur buton principal**:
  - plin, cu culoarea de brand **#E40101** și text alb, 16–18 px, bold, minimum 44 px înălțime, lat pe mobil;
  - text de acțiune concret: „Alege aroma”, „Vezi prețul”, „Comandă crema de orez”;
  - același link ca hero-ul.
- **Imaginea hero:**
  - JPG, 1200 px lățime (afișată la 600), **≤ 200 KB**;
  - alt text care spune mesajul („Cremă de orez Prime, 7 arome, înapoi în stoc”);
  - legată la același URL ca butonul;
  - fără text esențial *doar* în imagine și fără butoane desenate.
- **Maximum 3 produse, doar din Shopify** (`/products/…`), cu preț real (inclusiv prețul tăiat și cel mai mic preț din 30 de zile, dacă e reducere) și buton „Vezi produsul”. Toate butoanele secundare au aceeași culoare și diacritice („Comandă”).
- **Bloc de încredere:** 1–2 recenzii reale Judge.me citate exact, cu prenume și inițială (sursa: reviews.md), „Livrare gratuită peste 300 lei” (confirmat) și „Produs al brandului Prime Supplements”.
- **Mențiunea pentru suplimente** în subsol, avertismentul pentru cafeină la produsele cu cafeină și doza, acolo unde mențiunea o cere.
- **Testat** în Gmail (web și Android), Apple Mail (iOS, cu dark mode) și Outlook (Windows), cu imaginile blocate.

### 6.3 P1: segmentare și cadență

**Segmente pentru campanii** (create în theMarketer; tag-urile și datele de comandă există deja prin integrare):

| Segment | Definiție | Ce primește |
|---|---|---|
| Implicați 90 de zile | click la un email, vizită pe site sau comandă în ultimele 90 de zile (nu doar deschidere) | Campania săptămânală principală |
| Cumpărători cremă de orez | au comandat cremă de orez | Restock, arome noi, rețete, preț pe kg |
| Cumpărători proteine / creatină | Prime Whey, Pure Isolate, creatină | Noutăți, combinații, recenzii; reaprovizionare (automatizare) |
| Cumpărători vitamine și minerale | categoria Vitamine și minerale / Prime Health | Campanii de vitamine, maximum 1 pe lună |
| Interesați pre-workout / energie | au văzut sau cumpărat produse din categorie | Pre-workout, cu avertisment de cafeină |
| Abonați fără comandă | abonați fără nicio comandă | Primul ghid de produs, recenzii, WELCOME5 (codul existent; nu se creează coduri noi) |
| Excludere temporară | au comandat în ultimele 7 zile | Excluși din campaniile promoționale |

**Cadență:**
- maximum **1 campanie pe săptămână** către „Implicați 90 de zile” și maximum **1 email segmentat** suplimentar pe săptămână;
- activați **Smart sending** („Skip recently messaged contacts”) la toate campaniile, cu fereastra de **24 de ore** setată în Settings, Email setup, ca o campanie să nu cadă peste un email din automatizări;
- **SMS:** maximum 2 pe lună, niciodată în aceeași zi cu emailul pe același subiect, doar pentru restock-ul cremei de orez la cumpărătorii ei sau pentru o ofertă reală cu termen;
- **Restock:** un singur email către segmentul relevant, plus un reminder doar celor care au dat click și nu au cumpărat, după 48 de ore. Nu două emailuri la toată lista.

### 6.4 Checklist înainte de trimitere

1. Fiecare afirmație despre efect e **identică** cu o mențiune autorizată care apare **pe eticheta produsului** (vezi `brief_legal.md` §4.2 și `label_facts.md`)? Dacă nu: ștergeți și descrieți produsul (ingrediente, cantitate pe porție, mod de folosire, aromă, preț).
2. Imaginile conțin vreun text de efect sau sloganuri de pe ambalaj (DETOX, IMMUNITY, FAT BURNER…)? Le scoateți sau decupați.
3. Cuvinte interzise: detox, imunitate (ca promisiune), arde grăsimi, slăbire, recuperare rapidă, forță, „cel mai bun”, „nr. 1”, „maxim”, „premium” ca superlativ.
4. Produs cu cafeină: „Conține cafeină. Nu se recomandă copiilor, femeilor însărcinate sau care alăptează.”, conform etichetei.
5. Mențiunea generală pentru suplimente apare în subsol.
6. Prețurile din email sunt identice cu cele de pe site **în ziua trimiterii**. La reducere: prețul de referință = cel mai mic preț din ultimele 30 de zile.
7. Nicio urgență care nu e adevărată (termen real, stoc real).
8. Toate linkurile duc la `/products/` sau `/collections/`, cu UTM curat. Niciun link `/produs/`, niciun link spre căutare.
9. Hero cu alt text, ≤ 200 KB, legat la produs sau colecție. Un singur buton principal.
10. Test trimis și văzut pe telefon în dark mode. Footerul se citește.
11. Segment ales (nu „toți”), smart sending activ, nicio altă campanie în ultimele 48 de ore către același segment.

### 6.5 Măsurare și ce înseamnă „50 de comenzi pe lună”

- **KPI-uri pe campanie:**
  - comenzi UTM Shopify (`order_utm_campaign`) și venit UTM;
  - click-uri unice umane (fără cele de pe iconițe sociale sau din aceeași secundă);
  - CTR ≥ 1,5–2% și CTOR ≥ 5%;
  - dezabonări < 0,3%.

  „Venitul atribuit” din theMarketer se trece separat, doar informativ.
- **Testul de incrementalitate:** timp de 4 săptămâni, excludeți aleator 10% din segmentul principal (grup de control). Diferența de comenzi pe abonat dintre cei care au primit emailurile și grupul de control e efectul real al emailului.
- **Calcul realist pentru campanii** după corecturi:
  - ~3.000–3.500 de destinatari implicați (după sincronizarea abonaților din Shopify, în curs);
  - × 4 campanii pe lună × CTR 2% × 4–5% conversie din click (site-ul convertește ~5% din sesiuni);
  - = **~10–14 comenzi pe lună din campanii.**

  Restul de ~35–40 până la 50 trebuie să vină din **automatizări**: abandon de coș și de checkout, navigare, reaprovizionare la 30–45 de zile pentru proteine, creatină și cremă de orez, bun venit, client nou, win-back. Ele lovesc oamenii exact când au intenție. Automatizările au audit separat.
- **Testele A/B** (funcția există în theMarketer), câte unul pe rând:
  - subiect fără emoji față de subiect cu emoji;
  - expeditor „Prime Supplements” față de „Primesupplements.ro”;
  - ora: „optimal time – buying” față de marți 19:30;
  - hero-imagine față de titlu-text cu fotografie de produs.

### 6.6 Exemple de reformulare conformă

Mențiunile se folosesc doar dacă apar pe eticheta produsului respectiv.

| În loc de | Folosiți |
|---|---|
| „Izolatul… favorizează creșterea musculară și recuperarea rapidă” | „Pure Isolate: proteină din zer izolată, [X] g proteine pe porție. Proteinele contribuie la creșterea masei musculare.” + mențiunea generală pentru suplimente |
| „CREȘTE FORȚA ȘI PUTEREA / RECUPERARE MAI RAPIDĂ” (creatină) | „Creatina crește performanța fizică în cadrul exercițiilor fizice succesive, scurte, de intensitate mare. Efectul benefic se obține în condițiile unui consum zilnic de cel puțin 3 g de creatină.” (formularea de pe etichetă) |
| „BOOST DE IMUNITATE / REDUCE OBOSEALA / AJUTĂ LA GESTIONAREA STRESULUI” | La Vitamina C 1000: „Vitamina C contribuie la funcționarea normală a sistemului imunitar” și „…la reducerea oboselii și extenuării”. La magneziu: „Magneziul contribuie la reducerea oboselii și extenuării”. Fiecare mențiune stă **lângă produsul ei**, nu generic pe toată grila. Nimic despre stres |
| „NAC… susținerea detoxifierii… echilibrului mental… aport de glutation” | „NAC (N-acetilcisteină), 80 de capsule, 1 capsulă pe zi, conform etichetei. Preț: 55 lei.” Fără efect. Fără „glutation” |
| „Transformă grăsimea în energie… pierderea în greutate” | Fără mențiune de efect. „Thermo Core, 120 de capsule: L-carnitină și extract de ceai verde. Conține cafeină…” + mod de folosire. Recomandare: nu promovați deloc categoria arzătoare prin email, pentru că nu se poate face legal convingător |
| „sprijină sănătatea cardiovasculară… forței musculare” (D3+K2) | „Vitamina D contribuie la menținerea sănătății sistemului osos” și „…la menținerea funcției normale a sistemului muscular”. „1 capsulă la 2 zile (4000 UI vitamina D3).” |
| „Liver Protect la super promoție… extracte vegetale benefice” | „Liver Protect, extract hidrogliceric din plante (armurariu, anghinare, turmeric, păpădie, ginseng, salvie), 500 ml. Preț: X lei (cel mai mic preț din ultimele 30 de zile: Y lei).” |

---

## Anexa A: Cele 18 campanii citite integral (pe scurt)

| Campanie | ID | Hero → | Produse | Ce merge | Ce nu merge |
|---|---|---|---|---|---|
| Batoane 09.10 | 6ac897dade43f37db4094f7f | homepage | 3 produse vechi (404, 144 lei) | text OK, fără mențiuni | prețuri și imagini greșite; 0 comenzi UTM |
| Sezonul rece 06.10 | 6ac3e8e15520050c8908766a | homepage | 9 Shopify | — | „BOOST YOUR IMMUNITY”, imagine cu mențiuni, 10 butoane, trimis dimineața, 0,25% CTR |
| Crema de orez „toate aromele” 30.09 | 6abcb4b5d1685da98a06ba22 | homepage | 7 Shopify | 2 comenzi UTM, CTR 1% | la 24 h după un email aproape identic; arome în engleză |
| Crema de orez „4 arome” 29.09 | 6abba94428b7e927c20020e5 | homepage | 4 Shopify | 1 comandă UTM, cele mai multe click-uri unice (15) | dublat a doua zi |
| Vitamine și minerale 25.09 | 6ab24bd9db7b7d9db6012b55 | colecție ✓ | vechi (404) | — | etichete DETOX/IMMUNITY în imagine, 3 click-uri |
| Creatina 22.09 | 6ab24aa2c38ee069ab09a062 | homepage | 3 vechi „Oferte speciale” fără reducere | 4 creatine comandate (atribuite) | mențiuni în text și imagine; prețuri greșite |
| Liver Protect 16.09 | 6aaab496f147b507aa04080f | homepage | bloc personalizat | AOV 714 lei, blocul personalizat aduce click-uri | „super promoție” fără preț; botanice |
| Pre-workout 09.09 | 6aa13ef6d641c8cbe102edb2 | homepage | NITROX vechi + Fat Burning + No-Stim, fără prețuri | — | fără avertisment cafeină, 2 click-uri |
| Crema de orez 02.09 | 6a9805f8c88a288c030ed191 | homepage | 4 Shopify | 1 comandă UTM | — |
| NAC 24.08 | 6a8c00cff1c0c3335f0b7118 | homepage | 3 vechi | 1 comandă UTM | glutation fals, detox, urgență falsă, click-uri de robot |
| Pachet Health 20.08 | 6a8589ea529bd5655d09ebdd | homepage | bloc personalizat | ofertă cadou legală | 1 click, buton spre homepage |
| Arzătoare 18.08 | 6a82b3e75a160a1be0065a7a | colecție ✓ | 3 Shopify | — | cel mai grav subiect și preheader; 0,48% dezabonări |
| Izolat 14.08 | 6a7c2f4739f8e22c6d0b7f8d | produs ✓ | Shopify | buton roșu plin, 10 click-uri pe produs | mențiuni; stiluri ChatGPT; 7 dezabonări + 1 plângere; 0 comenzi UTM |
| NAC 04.08 | 6a71a75f10e7fa710a0b3e28 | produs ✓ | batoane vechi | 1 comandă UTM | detox, „doar acum” |
| Back in Stock 20.07 | 6a5e25dc881800a524075b69 | homepage | 7 Shopify | cel mai mare venit atribuit; mesaj de stoc real | buton spre căutare; 0 comenzi UTM |
| Hanorac MNX 22.05 | 6a10380c1d182f36f90884ea | — | 1 produs (.avif) | toate cele 10 click-uri pe produs | „ofertă limitată” fără preț; trimis la toată lista |
| D3+K2 05.05 | 69f9c5a082aa6cee730706be | homepage (imagine jos) | — | o mențiune corectă (imunitar, vitamina D) | cardiovascular, „forță”, contradicție cu doza; 10 dezabonări |
| NITROX 03.06 | 6a1fd39a8c1a47131a000e2f | homepage (imagine jos) | — | — | 5 efecte neautorizate, fără avertisment; 0,26 lei/destinatar |

## Anexa B: Surse

- theMarketer: `list_campaigns` p. 1–4; `get_campaign_details` (summary, audience, schedule, tracking, content) și `get_campaign_report` (overview, benchmark, links, timeline) pentru cele 18 campanii; `list_products` (catalog: 70 de produse `/produs/` și 209 `/products/`).
- Shopify Analytics (ShopifyQL): `FROM sales SHOW orders, total_sales GROUP BY order_utm_source, order_utm_medium SINCE -90d`; `… WHERE order_utm_source = 'TheMarketer' OR … GROUP BY order_utm_medium, order_utm_campaign SINCE -180d`; `… TIMESERIES month SINCE -365d`; sesiuni pe referrer, 90 de zile.
- Verificări HTTP (curl) pe linkurile `/produs/…`, imaginile `wp-content` (404), imaginile hero (dimensiuni și greutate) și prețurile Shopify live (`/products/<handle>.js`).
- Reguli: `scratchpad/email/brief_legal.md` (Reg. 1924/2006, Reg. 432/2012, Legea 56/2021, Legea 363/2007, HG 947/2000 art. 4¹), `scratchpad/top50/label_facts.md`, `scratchpad/email/brief_store.md`, `scratchpad/email/reviews.md`.
- Documentație theMarketer: [optimal time](https://themarketer.com/resources/knowledge-base/themarketer-optimal-time) · [smart sending](https://themarketer.com/resources/knowledge-base/what-is-themarketer-smart-sending) · [subscriber fatigue](https://themarketer.com/resources/knowledge-base/subscriber-fatigue). Fereastra exactă de atribuire nu e documentată public; se confirmă cu suportul theMarketer.
- Auditul agenției (`agency_audit/audit.txt`), §3 Campanii: confirmat și detaliat aici (template ineficient, fără dark mode, fără alt text, fără segmentare).
