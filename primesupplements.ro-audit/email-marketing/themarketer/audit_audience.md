# Audit theMarketer: audiență, formulare, livrabilitate și celelalte module

**Data:** 15.10.2026 · **Pentru:** Marius Chera, Prime Sport Supplements SRL · **Platformă:** theMarketer (domeniul primesupplements.ro, expeditor contact@primesupplements.ro)
**Perimetru:** audiența, segmentele, formularele, double opt-in, livrabilitatea (DNS și rate), costurile, loialitatea, recenziile, creditul tranzacțional, comenzile atribuite. Plus măsurarea comenzilor reale venite din email, direct din Shopify. Campaniile au audit separat (`audit_campaigns.md`), la fel automatizările.
**Mod de lucru:** doar citire. Nu s-a modificat nimic în theMarketer, Shopify sau DNS. Contactele nu au fost atinse (sincronizarea celor 3.080 de abonați Shopify rulează în paralel, în alt job).
**Confidențialitate:** documentul conține doar numere. Nu conține adrese de email, nume sau numere de telefon.

---

## 0. Pe scurt

1. **Emailul aduce măsurabil ~5 comenzi pe lună dintr-un click (ultima vizită înainte de comandă), sau ~6 în jumătate de lună dacă număr orice atingere.** În Shopify, sursa ultimei vizite (UTM last-click) dă: iulie 6, august 5, septembrie 4, octombrie (1–15) 5. Am citit și parcursul clientului (`customerJourneySummary`) la toate cele **1.079 de comenzi** din 16.08–15.10. **14 comenzi** au o atingere theMarketer (prima sau ultima vizită): august (16–31) 2, septembrie 6, octombrie (1–15) 6. **Ritmul actual e ~12 comenzi pe lună. Ținta de 50 înseamnă de ~4 ori mai mult.**
2. **theMarketer raportează de 9–20 de ori mai multe comenzi decât aduce emailul (în medie ~15).** Raportează 75–81 de comenzi pe lună (august–septembrie), dar înregistrează mai puține click-uri decât comenzi (septembrie: 73 de click-uri, 81 de comenzi). Prin urmare **~93–95% din „comenzile atribuite” sunt comenzi ale unor abonați care au primit sau au deschis un email** și au cumpărat oricum.
3. **Singurul flux care aduce măsurabil clienți NOI este Welcome.** Din 28.09 până azi au venit 4 prime comenzi din „Welcome series 2”, plus o primă comandă din „Bounce follow-up”. Cele 5 comenzi din campanii au venit toate de la clienți care mai cumpăraseră (a 2-a până la a 4-a comandă). 4 dintre ele au fost despre crema de orez.
4. **Lista e mică: 1.276 de abonați email și 601 SMS.** Crește net cu ~100 pe lună (popup ~100 pe lună). **Pe 10.07.2026, o curățare manuală a scos din listă 2.304 abonați email într-o singură zi.** Tot atunci au fost scoși și **625 de abonați SMS**. Ziua coincide cu crearea segmentului „inactivi curatare” și a tagului „inactivi”. Printre cei 2.307 cu tagul „inactivi”, **421 deschiseseră sau dăduseră click cândva** și **178 sunt clienți cu mai multe comenzi**.
5. **45% din abonații veniți prin popup nu au deschis și nu au dat click niciodată** (122 din 270). Din toți abonații veniți după 17.07, 43% sunt la fel (148 din 343). Baza mai conține adrese temporare și adrese greșite: 18 la `1secmail`, plus `gmail.con`, `gamil.com`, `yahoo.con` și altele. Cele mai multe nu mai sunt abonate. **Asta susține recomandarea agenției de a activa double opt-in.**
6. **Problemă DNS pe care nu a văzut-o nimeni: domeniul are DOUĂ înregistrări DMARC.** Când există două înregistrări, standardul (RFC 7489) spune că serverul care primește emailul o tratează ca și cum **nu ar exista nicio politică DMARC**. Tot în DNS: SPF-ul principal nu include Google Workspace, deși mailboxurile sunt pe Google (MX = smtp.google.com). Lipsesc și DKIM pentru Google Workspace și DKIM pentru Shopify. Emailurile theMarketer trec totuși autentificarea (SES, DKIM aliniat, MAIL FROM pe `nwl.`), iar ratele sunt bune: **bounce 0%** la campanii și 0,05% la automatizări, **plângeri 0,02%** (3 în 90 de zile), **dezabonări 0,24%** la campanii și 0,5% la automatizări.
7. **Formulare: există un singur popup.** E activ din 15.07.2026, adică din ziua în care a fost creat codul WELCOME5. A avut 15.282 de afișări și 334 de înscrieri, deci o rată de **2,2%**. **Se afișează doar în ~45–49% din sesiuni.** Nu există niciun formular embedded în theMarketer. Formularul din footer trimite abonații în Shopify, de aceea 3.080 de abonați Shopify nu sunt în theMarketer. **WELCOME5 a fost folosit de 10 ori** din 346 de înscrieri (2,9%).
8. **Problema de consimțământ e mai mare decât cea de livrabilitate.** theMarketer are 3.174 de cumpărători, dar **doar 621 sunt abonați (20%)**. 1.741 de contacte venite din comenzi nu au dat niciodată acordul pentru marketing. Conform regulii casei (fără soft opt-in), nu primesc emailuri de marketing. Principala sursă de creștere este sincronizarea celor 3.080 de abonați Shopify, cu reguli clare (vezi §11).
9. **Datele pentru segmentare au limite.** Genul este „unknown” la 100% din contacte. RFM are doar cele 4 grupe simple (contul nu are Ecommerce Pro). Câmpul „Birthday” e gol peste tot. **Categoriile apar dublate:** cele vechi din WooCommerce, cele Shopify și cele noi cu diacritice, create ~13.10 („Creatină”, „Cremă de orez”). Un segment pe categorie trebuie să le includă pe toate. Există un singur segment custom, „inactivi curatare”.
10. **Celelalte module:**
    - loialitatea nu e configurată;
    - recenziile theMarketer sunt goale (0). Judge.me are 432 de recenzii, cu media 4,87, și rămâne sistemul de recenzii;
    - emailul tranzacțional theMarketer e în sandbox, cu sold 0 (nefolosit; comenzile sunt confirmate de Shopify);
    - creditul SMS e 40,43 EUR, adică ~808 SMS;
    - planul costă 67 lei pe lună (2.501–5.000 de contacte; acum se numără 1.280). După sincronizare rămâne în același prag.
11. **Rapoartele Shopify nu văd automatizările ca email.** Automatizările trimit `utm_source=theMarketer&utm_medium=automation`, deci în Shopify apar ca „unknown source” sau Gmail. La campanii, `utm_campaign` este chiar subiectul emailului, cu emoji. Ca toate cifrele să fie corecte de acum înainte, trebuie o convenție UTM unică (§11).

---

## 1. Linia de bază, lună cu lună

Toate cifrele de mai jos au fost citite azi din theMarketer și Shopify. „Abonați” înseamnă contacte care pot primi email de marketing. „Comenzi UTM” sunt comenzile Shopify în care ultima vizită avea `utm_source = TheMarketer/theMarketer` (ShopifyQL, `order_utm_*`). „Atingere email” înseamnă că prima **sau** ultima vizită din parcursul Shopify vine din theMarketer (citit comandă cu comandă, doar pentru 16.08–15.10).

| Indicator | Mai | Iun | Iul | Aug | Sep | Oct (1–15) |
|---|---|---|---|---|---|---|
| Abonați email, la sfârșitul lunii | 3.198 | 3.196 | 982 | 1.090 | 1.191 | **1.276** |
| Variație netă abonați | −25 | −2 | −2.214 (din care −2.304 pe 10.07) | +108 | +101 | +85 |
| Abonați SMS, la sfârșitul lunii | 1.028 | 1.035 | 477 (−625 pe 10.07) | 539 | 579 | **601** |
| Înscrieri prin popup | — (popup oprit) | — | 58 (de la 15.07) | 114 | 97 | 77 |
| Afișări popup / rată de înscriere | — | — | — | 4.776 / 2,39% | 4.451 / 2,18% | 3.710 / 2,08% |
| Dezabonări reale (campanii + automatizări) | n/d | n/d | 14 (17–31.07) | 25 | 20 | 7 |
| Plângeri spam | n/d | n/d | 0 | 3 | 0 | 0 |
| Bounce-uri hard noi (total cumulat) | +12 (130) | +5 (135) | +4 (139) | +1 (140) | 0 (140) | +1 (141) |
| Abonați „activi” / „inactivi” (theMarketer) | 1.252 / 1.946 | 1.274 / 1.922 | 930 / 52 | 1.002 / 88 | 1.069 / 122 | 1.108 / 168 |
| Emailuri trimise: campanii | 9.626 | 9.601 | 6.949 | 6.211 | 8.113 | 2.452 |
| Emailuri trimise: automatizări | 770 | 1.041 | 1.117 | 1.252 | 1.240 | 782 |
| Click-uri raportate de theMarketer (campanii + automatizări) | 32 | 57 | 94 | 71 | 73 | 32 |
| **Comenzi atribuite de theMarketer** (campanii + automatizări email) | 25 | 39 | 63 | 75 | 81 | 55 |
| Venit atribuit de theMarketer (lei) | 11.525 | 14.774 | 23.920 | 25.508 | 31.078 | 19.417 |
| **Comenzi UTM Shopify, last-click** (campanii / automatizări) | **1** (1/0) | **2** (1/1) | **6** (5/1) | **5** (3/2) | **4** (3/1) | **5** (1/4) |
| Venit UTM Shopify (lei) | 50 | 772 | 1.351 | 1.283 | 643 | 1.134 |
| **Comenzi cu atingere email** (prima sau ultima vizită) | — | — | — | 2 (doar 16–31.08) | **6** | **6** |
| Comenzi „atribuite pe deschidere” (theMarketer minus UTM) | ~24 | ~37 | ~57 | ~70 | ~77 | ~50 |
| Comenzi Shopify totale | 319 | 471 | 578 | 512 | 495 | 345 |
| **Ponderea reală a emailului în comenzi** (last-click) | 0,3% | 0,4% | 1,0% | 1,0% | 0,8% | 1,4% |
| SMS trimise / comenzi atribuite SMS | 0 / 0 | 1.994 / 20 | 2.758 / 19 | 0 / 0 | 0 / 0 | 0 / 0 |

**Cum se citește tabelul:**
- **Abonați:** creșterea organică e ~+100 pe lună, aproape toată din popup. Din iulie, numărul real de dezabonări e mic (~20–25 pe lună, ~0,3% pe trimitere). **Lista se pierde la curățări, nu prin dezabonări.**
- **„Inactivi” crește cu ~40 pe lună.** Sunt abonați noi care nu deschid niciodată un email (§3.6).
- **Comenzi:** theMarketer numără ~15 ori mai mult decât arată Shopify (338 față de 23 de comenzi UTM, mai–15 octombrie). Click-urile sunt mai puține decât comenzile atribuite, deci atribuirea se face pe deschidere sau pe primire, nu pe click. **Pentru decizii folosim „Comenzi UTM” și „Atingere email”.**
- **Ce înseamnă ținta:** 50 de comenzi pe lună din email ar fi ~10% din comenzile magazinului, față de ~1% acum.

**Seria pe 15 luni din theMarketer** (`get_order_trend`, comenzi „atribuite” față de restul). Includem seria ca să se vadă că nici atribuirea largă nu a trecut niciodată de ~14%:

| Lună | Aug 25 | Sep 25 | Oct 25 | Nov 25 | Dec 25 | Ian 26 | Feb 26 | Mar 26 | Apr 26 | Mai 26 | Iun 26 | Iul 26 | Aug 26 | Sep 26 | Oct 26 (1–15) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Comenzi atribuite theMarketer | 29 | 18 | 1 | 27 | 23 | 54 | 10 | 52 | 30 | 25 | 59 | 82 | 75 | 81 | 55 |
| Celelalte comenzi | 285 | 331 | 303 | 379 | 158 | 244 | 257 | 383 | 325 | 294 | 412 | 494 | 437 | 411 | 290 |

---

## 2. Comenzile reale venite din email, citite comandă cu comandă în Shopify

**Metodă.** Am folosit `orders(query:"created_at:>=2026-08-16")` cu `customerJourneySummary { customerOrderIndex, firstVisit, lastVisit { source, utmParameters } }`. Am parcurs toate cele 22 de pagini, **1.079 de comenzi**: august 16–31 = 241, septembrie = 493, octombrie 1–15 = 345. Totalurile lunare se potrivesc cu theMarketer (492 / 345). O comandă intră în numărătoare dacă prima sau ultima vizită are UTM theMarketer sau vine de pe domeniul de tracking `mktr.primesupplements.ro`. Am notat doar numere și tipul de mesaj.

| # | Data | Mesaj | Tip | Atingere | Comanda nr. a clientului |
|---|---|---|---|---|---|
| 1 | 20.08 | Cart abandonment | automatizare | ultima vizită | a 2-a |
| 2 | 25.08 | NAC („Reducere Limitată” → „Oferta încă este disponibilă”) | campanie | prima și ultima | a 2-a |
| 3 | 02.09 | „Crema de orez Prime a revenit în stoc” | campanie | ultima | a 2-a |
| 4 | 19.09 | Cart abandonment | automatizare | doar prima (ultima = direct) | a 10-a |
| 5 | 25.09 | link prin `mktr.primesupplements.ro`, fără UTM | necunoscut (email sau SMS theMarketer) | doar prima | a 29-a |
| 6 | 28.09 | Welcome series 2 (deschis din Gmail) | automatizare | ultima | **prima comandă** |
| 7 | 29.09 | „Crema de Orez Prime a revenit! Comandă acum!” | campanie | prima și ultima | a 4-a |
| 8 | 30.09 | „Crema de orez a revenit în stoc! Toate aromele…” | campanie | ultima | a 2-a |
| 9 | 01.10 | aceeași campanie „Toate aromele” | campanie | ultima (prima = Facebook plătit) | a 4-a |
| 10 | 02.10 | Inactivity behavior | automatizare | doar prima | a 3-a |
| 11 | 08.10 | Welcome series 2 | automatizare | ultima | **prima comandă** |
| 12 | 11.10 | Bounce follow-up (abandon site) | automatizare | ultima (prima = Google Shopping) | **prima comandă** |
| 13 | 15.10 | Welcome series 2 | automatizare | ultima (prima = Google Shopping) | **prima comandă** |
| 14 | 15.10 | Welcome series 2 (alt email din serie) | automatizare | ultima (prima = Facebook) | **prima comandă** |

**Totaluri.** 14 comenzi în 61 de zile: 11 din ultima vizită și 3 doar din prima vizită. Pe tipuri: **8 din automatizări**, 5 din campanii, 1 neidentificată. **5 dintre ele sunt prime comenzi**, toate din Welcome sau din abandon site. În plus, 3 comenzi au ultima vizită din aplicația Gmail fără UTM. Pot fi emailuri Shopify (confirmare, livrare) sau linkuri fără UTM, deci nu le număr.

**Verificare.** ShopifyQL last-click dă septembrie = 3 campanii + 1 automatizare și octombrie = 1 + 4. Numărătoarea comandă cu comandă dă exact aceleași cifre, deci metodele se confirmă reciproc.

**Ce înseamnă:**
- Welcome și abandonul de site aduc clienți noi. Campaniile aduc a doua comandă a clienților existenți.
- Nicio comandă nu a venit din „Cross sell” (840 de trimiteri în 90 de zile), din „Remind customers to reorder” (447), din „Product follow-up” (334) sau din „Cart abandonment similar products” (322).
- Fluxurile de recumpărare există, dar nu produc nimic măsurabil. Detaliile sunt în auditul de automatizări.

---

## 3. Audiența

### 3.1 Numărul de contacte pe statusuri

| Status | Contacte | Observații |
|---|---|---|
| Total contacte | 6.032 (6.033 la sfârșitul auditului; sincronizarea adaugă contacte) | |
| Abonați email | **1.276** | dintre care 597 au și telefon |
| Neabonați email (orice alt status) | 4.756 | filtrul `unsubscribed` din API = toți cei care nu sunt abonați |
| … din care nu s-au abonat niciodată | 2.012 | 1.741 vin din comenzi, 271 din trackingul de pe site |
| … din care dezabonați sau scoși | ~2.744 | breakdown: 2.718 scoși de pe toate canalele, 141 hard bounce, 0 blacklist, 0 cleaned |
| Abonați SMS | **601** | 597 sunt și abonați email, 4 doar SMS |
| Push / mobile push / loialitate | 0 / 0 / 0 | |
| Ultimele 7 zile, email | +44 / −5 | |
| Ultimele 7 zile, SMS | +6 / −9 | |

Graficul „total-unsubscribed-emails” crește cu ~4,4 pe zi chiar și după 10.07. Nu sunt dezabonări: în 90 de zile au existat doar **62** de dezabonări reale (`unsubscribed_after=17.07`). Graficul numără și contactele noi create din comenzi fără acord de marketing: 872 de contacte noi din 17.07, dintre care doar 343 abonate.

### 3.2 Sursa contactelor

| Sursă | Total | Abonați email | Observații |
|---|---|---|---|
| import | 2.591 | 581 | 1.650 dintre ei au tagul „inactivi”; doar 1 abonat dintre cei 58 cu tagul „import 25.06” |
| order (comandă) | 2.383 | 239 | **doar 10% abonați**; 1.741 nu au dat niciodată acord |
| website (tracking) | 718 | 177 | |
| popup | 286 | 270 | 340 au tagul „abonare pop-up”; 69 au telefon; 69 au cumpărat cândva |
| api | 53 | 8 | probabil sincronizarea în curs |
| embedded_form | 0 | 0 | **nu există formular embedded** |
| landing_page | 0 | 0 | |
| launcher | 0 | 0 | |

Abonați noi din 17.07: **343**. Pe surse: popup 266, order 37, website 29, restul alte surse.

### 3.3 RFM (doar grupele simple; cele 10 avansate cer Ecommerce Pro și au 0 contacte)

| Grupă RFM | Contacte | Abonați email |
|---|---|---|
| Mai multe comenzi, valoare mare (`many_time_buyer_high_aov`) | 288 | 121 |
| Mai multe comenzi, valoare mică (`many_time_buyer_low_aov`) | 415 | 137 |
| O comandă, valoare mare (`one_time_buyer_high_aov`) | 656 | 118 |
| O comandă, valoare mică (`one_time_buyer_low_aov`) | 1.815 | 245 |
| **Total cumpărători** | **3.174** | **621 (20%)** |
| champions, loyal, at_risk, cant_lose, potential_loyalist, promising, hibernating, new_customer, needs_attention, lost | 0 | 0 |

Dintre abonați, 655 nu au cumpărat niciodată (1.276 − 621). Din cei 703 clienți cu mai multe comenzi, doar **258 pot primi email de marketing**.

### 3.4 Activitate, gen și etapa din funnel

| Dimensiune | Valori |
|---|---|
| Activitate, toate contactele | activi 1.759 · inactivi 3.816 · cleaned 0 |
| Activitate, abonați | activi **1.109 (87%)** · inactivi **167 (13%)** |
| Activitate, abonați din popup | activi 148 · **inactivi 122 (45%)** |
| Gen | **unknown 6.033 (100%)**; male 0 · female 0. Segmentarea pe gen nu e posibilă |
| Ultima etapă din funnel atinsă, abonați | awareness 129 · interest 91 · consideration 282 · intent 65 · evaluation 34 · purchase 300 (restul fără etapă) |
| Câmpuri custom | doar „Birthday”, gol peste tot |

„Activ” înseamnă că a deschis, a dat click sau a fost urmărit pe site cel puțin o dată. Deschiderile sunt umflate de Apple Mail Privacy, care declanșează automat deschiderea. Prin urmare „activ” supraestimează implicarea reală. Pentru segmente de implicare reală folosiți **click-ul**: `newsletter_activity clicked …` sau `rating ≥ 1`.

### 3.5 Curățarea din 10.07.2026: ce s-a pierdut

| Metrică | 09.07 | 10.07 | Diferență |
|---|---|---|---|
| Abonați email | 3.207 | 903 | **−2.304** |
| … dintre ei „inactivi” (nu deschiseseră niciodată) | 1.913 | 4 | −1.909 |
| … dintre ei „activi” (deschiseseră sau dăduseră click cândva) | 1.294 | 899 | **−395** |
| Abonați SMS | 1.043 | 418 | **−625** |

- **E o operațiune manuală, făcută o singură dată, nu automatizarea de sunset.** Segmentul custom „inactivi curatare” (regula: `tag is "inactivi"`) are un id care corespunde datei de 10.07.2026, iar tagul „inactivi” e pus pe 2.307 contacte.
- **Cine are tagul „inactivi”:**
  - 1.650 din import și 376 din comenzi;
  - **421 erau „activi”**, deci deschiseseră sau dăduseră click cândva;
  - **178 sunt clienți cu mai multe comenzi** (83 cu valoare mare și 95 cu valoare mică);
  - 104 s-au abonat din nou la email, iar 94 sunt din nou abonați SMS.
- **Concluzie:**
  - eliminarea celor 1.909 care nu deschiseseră niciodată nimic a fost corectă și a ajutat livrabilitatea. După curățare, campaniile au trimis mai puține emailuri și au avut mai multe click-uri: 149 față de 122 în trimestrul anterior;
  - au fost scoși însă și 395 de oameni implicați, plus 625 de consimțăminte SMS, pentru inactivitate pe email, adică pe alt canal.
- **Ce facem acum:** nu re-abonăm pe nimeni în masă. Cum îi tratăm pe cei 421 + 178 la sincronizarea Shopify este o decizie a proprietarului (§11, P0-2).

### 3.6 Calitatea adreselor

- **Furnizori de email:** în baza de date apar 305 domenii, printre care:
  - **adrese temporare:** `1secmail.com/.net/.org`, 18 contacte, niciunul abonat. Plus `anonmails.de`, domenii `*.click`, `*.dynainbox.com`, `*.openinvestmentapp.com` (8, niciunul abonat);
  - **greșeli de tastare:** `gmail.con`, `gamil.com`, `gmai.com`, `gnail.com`, `gmsil.com`, `gmail.com.com`, `yahoo.con`, `tahoo.com`, `yahhoo.com`, `icolud.com`, `icloud.con` și altele. câteva par să fie încă abonate; trebuie verificate manual, pentru că o căutare după text prinde și nume obișnuite;
  - zeci de domenii de firme din SUA, tipice pentru înscrieri automate (boți).
- **Lista de abonați e totuși relativ curată.** Adresele proaste sunt aproape toate neabonate, iar bounce-ul pe automatizări e ~0.
- **Semnalul principal: 45% din abonații din popup nu deschid nimic, niciodată.** Explicațiile posibile, neverificabile din API:
  1. codul WELCOME5 apare chiar în popup, deci nu mai e nevoie de email;
  2. emailul Welcome ajunge în Spam sau Promoții (vezi problema DMARC, §7);
  3. adrese reale, dar nefolosite.
- **Concluzie:** în toate cele trei cazuri, double opt-in, cu codul trimis abia după confirmare, curăță lista (§6).

### 3.7 Tagurile și segmentele existente

- **Taguri:** „import 25.06” (58 de contacte, 1 abonat), „abonare pop-up” (340, 323 abonați), „Update 13.11” (102, 11 abonați), „inactivi” (2.307, 104 abonați).
- **Segmente custom:** unul singur, „inactivi curatare” (`6a50f45aa1ebe8ee240f89b1`), cu regula `tag is "inactivi"` și **104 abonați email / 94 SMS**. Atenție: nu e un segment de excludere sigur. Conține și oameni care s-au abonat din nou.
- **Segmente de sistem (36, nu se pot folosi ca filtru în API, dar se pot folosi în reguli):**
  - **Activity:** Active 30 days / Active 3 months / Active lifetime / Inactive 3 months / Inactive lifetime / New subscribers;
  - **Subscriber fatigue:** Enthusiastic / Engaged / Interested / Distracted / Fatigued. **Utile pentru „să nu deranjăm”: excludeți „Fatigued” și „Distracted” din campanii;**
  - **Shopping:** Buyers lifetime / Buyers 30 days / Nonbuyers lifetime / First time buyers / Repeat buyers;
  - **Gender:** Male / Female / Unknown (inutile, totul e unknown);
  - **Funnel:** View homepage / View category / Search / View product / Add to cart / Initiate checkout / Order;
  - **RFM:** Multi time high aov / Multi time / One time high aov / One time;
  - **Frequency:** 1 / 2 / 3 / 4 / 5 / mai mult de 5 comenzi.

---

## 4. Condițiile de segmentare permise de planul actual

Lista vine din `get_audience_options kind=segment_conditions`, catalogul live al domeniului: 38 de condiții permise.

| Condiție (cheie) | Tab | Operatori | Valoare și limitări |
|---|---|---|---|
| `newsletter_activity` | Campaign activity | opened, not_opened, clicked, not_clicked, purchased, not_purchased, received, not_received | latest_sent, any_sent_7/30/90/180/365_days, at_least_5_in_30_days, at_least_5_in_90_days, any_last_5, all_last_5, specific_campaign. Doar campanii email; `all_last_5` prinde și contactele fără istoric |
| `sms_activity` | Campaign activity | la fel | la fel (fără at_least_5) |
| `push_activity` | Campaign activity | la fel | la fel (neutilizat) |
| `viewed_category` | On-site | is | id-uri de categorie; **fereastră fixă de 3 luni** |
| `viewed_brand` | On-site | is | brand; 3 luni |
| `viewed_product` | On-site | is | produs (nume sau SKU); 3 luni |
| `purchased_category` | On-site | is | categorii; **fereastra = events_expire_months (6 luni)** |
| `purchased_brand` | On-site | is | brand; 6 luni |
| `purchased_product` | On-site | is | produs; 6 luni |
| `not_purchased_category` | On-site | is | **fereastră de 3 luni**, deci nu e complementul lui purchased_category (6 luni) |
| `source` | Subscriber data | is, is_not | website, import, popup, order, embedded_form, landing_page, api, launcher |
| `subscribed_to` | Subscriber data | is, is_not | email, sms, push, mobile_push, loyalty (is_not = dezabonat explicit) |
| `activity` | Subscriber data | active_in_last, inactive_for | zile sau luni; „activ” = a deschis sau a dat click |
| `deliverability` | Subscriber data | soft_bounced_in_last, hard_bounced_in_last | zile sau luni |
| `segment` | Subscriber data | is, is_not | alt segment (custom sau system-…); apartenența la un segment custom se actualizează cu o rulare întârziere |
| `date_added` | Subscriber data | is_after, is_before, is, within, not_within | dată sau număr de zile |
| `name` | Subscriber data | contains | text |
| `email` | Subscriber data | contains, does_not_contain | text (util pentru excluderea domeniilor temporare) |
| `email_provider` | Subscriber data | is, is_not | domeniu (305 valori) |
| `gender` | Subscriber data | is, is_not | inutil (100% unknown) |
| `rating` | Subscriber data | is, is_not, greater_than, less_than | 0–5 (1 = un click, 2–5 = benzi după rata de click). **Cel mai bun indicator de implicare reală** |
| `tag` | Subscriber data | is, is_not | cele 4 taguri |
| `city` / `county` / `country` | Subscriber data | is (country și is_not) | valori brute, nenormalizate (ex. „Arges” și „Argeș”) |
| `phone` | Subscriber data | is_empty, is_not_empty | |
| `age` | Subscriber data | is, between | gol în practică |
| `device` | Subscriber data | is, is_not | windows, macos, android, ios, … |
| `display_size` | Subscriber data | is, is_not | mobile, desktop, tablet |
| `lifetime_value` | E-commerce | greater_than, less_than | lei |
| `average_order_value` | E-commerce | greater_than, less_than | lei |
| `number_of_transactions` | E-commerce | greater_than, less_than | număr de comenzi, pe toată durata |
| `shopper_status` | E-commerce | bought_in_last, did_not_buy_in_last | zile sau luni. **Baza pentru recumpărare și win-back** |
| `favorite_category` / `favorite_brand` / `favorite_product` | E-commerce | is (category și is_not) | top 5 după interacțiuni, **nu** „a cumpărat” |
| `rfm_group` | RFM | is, is_not | doar cele 4 grupe simple |
| `funnel_step` | Funnels | is | view_homepage … order; cea mai avansată etapă din ultimele 3 luni |

**Indisponibile pe acest plan:** `store_name`, `store_city`, `store_country` (nu există magazine fizice), `nps`, `loyalty_tier`, `loyalty_points` (cer Ecommerce Pro).

**Categorii și branduri, de reținut la construirea segmentelor:**
- **Brandurile din feed:** „Prime Supplements”, „primesupplements1” (vechi), „N/A”, „MNX”, „Frutilu”. Un segment „Prime” trebuie să includă primele trei.
- **Categoriile sunt dublate.** Un segment pe categorie trebuie să includă **toate** variantele. Exemple, căutate în `purchased_category`:
  - Creatină: `Creatina (68552d1d830bb87b330ba052)`, `Creatină (6acdd84a472b8477b605efeb)`, `Suplimente > Creatina (67d95b080839f5bea004f3a5)`;
  - Cremă de orez: `Crema de orez (6a46b9e654db89511e0baf77)`, `Cremă de orez (6acdd84a472b8477b605efec)`;
  - Vitamine: `Vitamine și Minerale (68552d1d830bb87b330ba050)`, `Suplimente > Vitamine și Minerale (67d95b080839f5bea004f3a2)`;
  - Aminoacizi: `Aminoacizi (68552d1d830bb87b330ba051)`, `Suplimente > Aminoacizi (67d95b080839f5bea004f3a3)`;
  - Proteine: `Pudre Proteice (67d95b090839f5bea004f3a7)`, `Batoane Proteice (67d95b080839f5bea004f39e)`;
  - Altele: `Pre-Workout (67d95b090839f5bea004f3a8)`, `Intra-workout (67d95b090839f5bea004f3a6)`, `Arzătoare de grăsimi (67d95b080839f5bea004f3a1)`, `Alimente sănătoase (67d95b090839f5bea004f3ab)`, `Prime Health (67d95b080839f5bea004f3a0)`, `Bauturi (6a6382a631ee199cbf008a75)`, `Haine MNX (69c6057409ecb40205050065)`, `Accesorii (67d95b080839f5bea004f3a4)`;
  - Fără valoare pentru segmentare: „11 TVA”, „11% TVA”, „All Products”, „Home page”, „Cele mai vândute”, „Lansate recent”.
- **Categoriile noi cu diacritice** („Creatină”, „Cremă de orez”) au apărut după redenumirea tipurilor de produs din programul SEO (~13.10). Un segment făcut doar pe ele pierde istoricul. Unul făcut doar pe cele vechi pierde comenzile noi.

---

## 5. Formulare

| Element | Ce am găsit |
|---|---|
| Popupuri | **unul singur** (id `6863a57bdaba617ac50e875f`, creat în iulie 2025, afișări doar din 15.07.2026) |
| Afișări / înscrieri, 18.07–15.10 | **15.282 / 334, adică 2,19%** (august 2,39%, septembrie 2,18%, octombrie 2,08%) |
| Înscrieri de la pornire | 346 (~3,8 pe zi) |
| Acoperire | ~4.450–4.780 de afișări pe lună la ~9.700–9.950 de sesiuni, deci popupul apare în **~45–49% din sesiuni** (probabil din cauza limitei de frecvență sau a întârzierii) |
| Formulare embedded | **0 afișări, 0 înscrieri.** Nu există. Formularul din footer trimite abonații în Shopify, nu în theMarketer |
| Landing page / launcher | 0 |
| WELCOME5 (Shopify) | activ din 15.07.2026, o singură utilizare pe client. **Folosit de 10 ori** (iulie 2, august 2, septembrie 3, octombrie 3), adică 2,9% din înscrieri |
| Comenzi atribuite popupului în theMarketer | 0 (comenzile se atribuie emailului Welcome) |
| Abonați din popup care au cumpărat cândva | 69 din 286 (24%), unii poate înainte de înscriere |
| Telefon lăsat în popup | 69 din 270 de abonați (26%) |

**Observații:**
- **Rata de 2,2% e corectă pentru un popup simplu, dar volumul e mic: ~100 de înscrieri pe lună.** Pentru o listă care să susțină 50 de comenzi pe lună, înscrierile trebuie cel puțin dublate. Câteva variante, fără mai multă presiune pe vizitator:
  - un formular embedded în footer sau pe blog, legat de theMarketer;
  - un al doilea declanșator (exit intent pe pagina de produs);
  - afișare și pe pagina de produs și pe coș.
- **Pe Shopify e instalată și aplicația Pop Convert** (`brief_store.md`). Trebuie verificat că nu afișează și ea un popup. Două popupuri deranjează, iar înscrierile din Pop Convert ar ajunge în Shopify, nu în theMarketer.
- **Codul de 5% e folosit rar (2,9%).** Ori nu e citit (vezi cei 45% care nu deschid), ori 5% nu e un motiv suficient. Nu propun un cod nou fără acordul tău (regula casei).

---

## 6. Double opt-in

- **Starea actuală:** niciun tool din theMarketer nu arată această setare. Auditul agenției spune că double opt-in e **dezactivat**. Centrul de ajutor theMarketer (help.themarketer.com) a răspuns cu 403 la citire automată.
  - Glosarul theMarketer descrie double opt-in ca „o confirmare prin email înainte de a intra în baza de abonați” și spune că reduce bounce-urile hard.
  - Articolul despre formulare embedded spune doar că, „dacă folosiți double opt-in”, mesajul de confirmare de după trimitere trebuie să ceară verificarea inboxului. Același mesaj se editează din editorul formularului: Audience > Signup forms > formular > „Confirmation message”.
  - **Unde e setarea:** nu am putut confirma calea exactă. Verificați în aplicație la Setări > Email settings (link `https://app.themarketer.com/settings/email-settings`) și la setările fiecărui formular. Dacă nu apare, scrieți la suportul theMarketer (iam@themarketer.com).
- **Argumente pentru activare, din datele contului:**
  - 45% din abonații din popup nu interacționează niciodată;
  - în bază există adrese temporare și adrese cu greșeli de tastare;
  - Welcome are cea mai mare rată de dezabonare (1,16%) și singurele bounce-uri din automatizări din ultimele 90 de zile (0,29%);
  - riscul legal: amenda Cucina di Fabio (art. 25 GDPR) a fost dată tocmai pentru că firma nu a verificat că adresa aparține persoanei (`brief_legal.md`).
- **Argument contra:** se pierd de obicei 20–40% din înscrieri. Contează mai puțin dacă oricum ~45% nu deschid niciodată.
- **Recomandarea mea:**
  - activăm double opt-in **doar pentru înscrierile noi** (popup și formulare), fără să-i retrimitem pe abonații existenți;
  - WELCOME5 apare **doar în emailul trimis după confirmare**, nu în popup și nici în emailul de confirmare. Emailul de confirmare nu conține marketing;
  - păstrăm dovada consimțământului: data și ora, formularul, textul exact afișat și confirmarea;
  - și pe Shopify există o setare echivalentă (Settings > Notifications > Customer notifications > Marketing double opt-in). Ea contează pentru abonații care vin prin sincronizare.

---

## 7. Livrabilitate

### 7.1 Rate (ultimele 90 de zile, 17.07–15.10)

| Metrică | Campanii | Automatizări | Prag uzual (Gmail/Yahoo) | Verdict |
|---|---|---|---|---|
| Bounce rate | **0%** (trimestrul anterior: vârf de 0,34% pe 05.05, campania D3+K2) | **0,05%** (numai Welcome series 2: 0,29%) | < 2% | foarte bun |
| Plângeri | **0,02%** (3: NAC 60 lei, Crema de orez pentru rutina ta, Izolat 92%) | 0% | < 0,1% (maxim 0,3%) | bun |
| Dezabonări | **0,24%** (47) | **0,5%** (19) | < 0,3–0,5% | ok la campanii, mare la Welcome |
| Dezabonări pe campanie | cele mai mari: Izolat 92% 0,68% (7) · Arzătoare 0,48% (5) · Magneziu bisglicinat 0,43% · Vitamine 0,43% · NAC „Reducere limitată” 0,41% | | | sunt exact campaniile cu mențiuni de sănătate problematice (vezi auditul de campanii) |
| Dezabonări pe automatizare | | Welcome series 2: **1,16%** (8) · Inactivity behavior 0,87% (2) · Bounce follow-up 0,65% (4) · Cross sell 0,48% (4) · Remind to reorder 0,22% (1) | | Welcome e prima impresie și pierde cei mai mulți oameni |
| Hard bounce în listă | 141 în total, 3 noi în 90 de zile | | | listă curată după 10.07 |

### 7.2 Domeniul de trimitere

**Ce raportează theMarketer (`get_sending_domain`):** domeniul `primesupplements.ro` este **validat** și cele 11 înregistrări așteptate sunt găsite:
- **DKIM:** 6 CNAME-uri `*._domainkey` → `dkim.amazonses.com`;
- **SPF pe domeniul principal:** `v=spf1 include:amazonses.com ~all`;
- **DMARC:** `v=DMARC1; p=none; adkim=r; aspf=r; pct=0;`;
- **tracking:** `mktr.` → `api4.mktr2.com`;
- **MAIL FROM:** `nwl.`, cu SPF și MX `feedback-smtp.eu-central-1.amazonses.com`;
- **expeditori:** implicit `contact@primesupplements.ro`, numele afișat „Primesupplements.ro”, reply-to contact@. Există și un expeditor secundar `primesupplementsro@primesupplements.ro.mktrmail.com`, nealiniat la domeniu, folosit în iulie 2025. **Nu trebuie folosit.**

**Ce am verificat în plus, prin DNS public (Cloudflare și Google DNS, 15.10.2026):**

| Verificare | Rezultat | Impact |
|---|---|---|
| `_dmarc.primesupplements.ro` TXT | **două înregistrări:** `v=DMARC1; p=none;` **și** `v=DMARC1; p=none; adkim=r; aspf=r; pct=0;` | **Critic, ușor de reparat.** Cu două înregistrări DMARC, serverul care primește emailul trebuie să ignore DMARC (RFC 7489 §6.6.3). Domeniul pare să nu aibă DMARC, deși cerința minimă Gmail/Yahoo este o înregistrare DMARC validă. Validatorul theMarketer caută doar înregistrarea lui, de aceea nu a semnalat dublura |
| MX | `smtp.google.com` (Google Workspace) | mailboxurile, inclusiv contact@, sunt pe Google |
| SPF pe domeniul principal | `v=spf1 include:amazonses.com ~all`, **fără** `include:_spf.google.com` | emailurile trimise din Gmail sau Workspace de la @primesupplements.ro (răspunsuri către clienți) eșuează la SPF |
| DKIM Google (`google._domainkey`) | **lipsește** (NXDOMAIN) | emailurile din Workspace nu au DKIM aliniat → DMARC eșuează → risc de Spam |
| DKIM Shopify (`shopify1/2/3._domainkey`) | **lipsește** | notificările Shopify (confirmare comandă, livrare) pleacă „via shopifyemail.com”, neautentificate pe domeniu |
| BIMI | lipsește | normal; BIMI cere p=quarantine sau p=reject |
| Raportare DMARC (`rua`) | lipsește | nu există vizibilitate asupra cine trimite în numele domeniului |

**Concluzie:** emailurile theMarketer sunt autentificate corect (DKIM SES aliniat, MAIL FROM pe `nwl.`). Ratele sunt sub toate pragurile, iar volumul (~100–600 de emailuri pe zi) e departe de pragul de „bulk sender” (5.000 pe zi). **DNS-ul domeniului are însă trei probleme care afectează mai ales Gmail:** DMARC invalid, SPF fără Google și Workspace fără DKIM. Se repară în 15 minute, la registrar (§11, P0-1).

### 7.3 Trackingul pe site (`get_integration_health`, ultimele 48 de ore)

- Tracking activ. Ajung toate evenimentele: view_homepage, view_category, view_product, search, add_to_cart, remove_from_cart, initiate_checkout, order, generic_page_view.
- **add_to_wishlist și remove_from_wishlist nu ajung.** Asta confirmă constatarea agenției: automatizarea de wishlist nu se poate declanșa.
- `initiate_checkout` vine, deci **un flux de abandon checkout se poate construi.**
- De verificat separat, fără date în API: scriptul theMarketer trebuie să se încarce **doar după acordul pentru cookie-uri de marketing** (Legea 506/2004 art. 4(5), vezi `brief_legal.md`).

---

## 8. Celelalte module

| Modul | Stare | Observații |
|---|---|---|
| **Cost** (`get_costs`) | plan 2.501–5.000 de contacte, **67 lei pe lună**, următorul prag 107 lei; se numără acum 1.280 de contacte; fără discount; facturare 01.02.2027; credit email 0; pauză posibilă până la 3 luni | Dacă după sincronizare abonații trec de 5.000, planul crește la 107 lei. Maximul teoretic e 1.276 + 3.080 = 4.356, deci rămâne în prag. **Cost pe comandă reală azi: ~6,7 lei** (67 lei / ~10 comenzi pe lună). La 50 de comenzi ar fi ~1,3 lei |
| **Loialitate** | **neconfigurată** (fără tipuri, praguri sau reguli) | Nivelurile și punctele în segmente cer Ecommerce Pro. Nu e o prioritate pentru ținta de 50 de comenzi |
| **Recenzii theMarketer** | **0 recenzii** (colectare „products”, nimic aprobat sau în așteptare) | Judge.me pe Shopify: **432 de recenzii, media 4,87**, dintre care 249 de la cumpărători verificați cu media 4,9; 306 recenzii pe 53 de produse. **Recomandare: rămânem pe Judge.me, nu activăm recenziile theMarketer**, ca să nu primească clientul două cereri de recenzie. De verificat dacă automatizarea „Product follow-up” (334 de trimiteri în 90 de zile) nu dublează cererea de recenzie trimisă de Judge.me |
| **Email tranzacțional theMarketer** | **sandbox**, sold 0 EUR, plan p1 (25 EUR / 25.000), auto top-up oprit | Nefolosit. Confirmările de comandă le trimite Shopify. Rămâne așa |
| **Credit SMS** | **40,43 EUR ≈ 808 SMS** (0,034 EUR / SMS), nu e în sandbox | Campaniile SMS au fost oprite după iulie (iunie: 1.994 trimise / 20 comenzi atribuite; iulie: 2.758 / 19). Nu există automatizări SMS. Atenție: un SMS a fost trimis de două ori pe 15.07 (vezi auditul de campanii) |
| **Comenzi** (`list_orders`) | Statisticile lunare se potrivesc cu `get_ecommerce_stats` (septembrie: newsletter 57 de comenzi / 23.085 lei, automatizări 24 / 7.993 lei) | Același client poate fi atribuit de mai multe ori în aceeași lună, din campanii diferite. Încă un semn de atribuire largă |
| **Push / mobile push** | 0 abonați | neutilizat |

---

## 9. Auditul agenției față de datele contului

| Ce spune agenția | Ce arată datele | Verdict |
|---|---|---|
| Double opt-in dezactivat | Nu se poate citi din API. Datele indirecte îl susțin: 45% din abonații din popup nu deschid niciodată, există adrese temporare și greșite, Welcome are cele mai multe dezabonări | **De acord.** Activăm pentru înscrieri noi, iar codul se trimite după confirmare (§6) |
| Sunset după doar 30 de zile, prea devreme, fără win-back înainte | Pierderea mare a fost **curățarea manuală din 10.07** (−2.304 email, −625 SMS), inclusiv 421 de oameni implicați și 178 de clienți cu mai multe comenzi. „Inactivity behavior” a trimis 231 de emailuri în 90 de zile, cu 2 dezabonări și 1 comandă la prima vizită | **De acord, cu o completare:** sunsetul trebuie să **excludă** contactul din campanii, nu să-l dezaboneze. Pentru suplimente, pragul trebuie să fie 120–180 de zile fără click. Inactivitatea pe email nu trebuie să ducă la pierderea abonamentului SMS |
| Lipsă segmentare pe activitate, categorie și momentul recumpărării | Confirmat: există un singur segment custom (tagul „inactivi”). Condițiile necesare există: `purchased_category` pe 6 luni, `shopper_status`, `activity`, `newsletter_activity`, `rating`, segmentele „Subscriber fatigue” | **De acord.** Limite reale: gen 100% necunoscut, RFM doar simplu, categorii dublate (§4) |
| Rate de deschidere mici la automatizări | Deschiderile sunt umflate de Apple Mail Privacy și de scannere. Contează click-urile și comenzile UTM: automatizările au adus 8 comenzi în 61 de zile, 5 dintre ele prime comenzi | Parțial. **Măsurați după click și UTM, nu după deschideri** |
| Lipsește abandonul de checkout | `initiate_checkout` vine în theMarketer. În Shopify, ~845 de sesiuni ajung la checkout și 463 îl finalizează pe lună, deci **~380 de checkouturi abandonate pe lună** | **De acord.** E cea mai mare sursă de comenzi recuperabile (§10). Se trimite doar abonaților, conform regulii legale din `brief_legal.md` §1.2 |
| Automatizare de wishlist fără wishlist pe site | Confirmat: evenimentele de wishlist nu ajung | **De acord: dezactivăm** |
| Două automatizări de abandon coș pe același trigger | Nu e în perimetrul acestui audit. În 61 de zile, „Cart abandonment” a adus 2 comenzi (o dată ultima vizită, o dată prima), iar „…similar products” niciuna | Se tratează în auditul de automatizări |
| **Ce nu a văzut agenția** | DMARC dublat (deci invalid), SPF fără Google, fără DKIM Workspace și Shopify. Atribuire umflată de ~15 ori. 80% din cumpărători fără acord de marketing. Formularul din footer trimite abonații în Shopify, nu în theMarketer. Pierderea SMS din 10.07. UTM la automatizări (`medium=automation`). Categorii dublate după redenumire. Popup afișat în doar ~jumătate din sesiuni | adăugate în acest audit |

---

## 10. Pot aduce acești abonați 50 de comenzi pe lună? (estimare)

**Date măsurate:**
- trafic: ~9.950 de sesiuni pe lună; ~1.100 de sesiuni cu produse în coș; ~845 ajung la checkout; ~463 finalizează;
- abandon: **~380 de checkouturi** și ~260 de coșuri fără checkout abandonate pe lună;
- popup: ~100 de înscrieri pe lună;
- abonați și cumpărători: 1.276 de abonați (+3.080 din Shopify, suprapunere necunoscută); 621 de cumpărători abonați; 703 clienți cu mai multe comenzi (258 abonați);
- clienți Shopify în septembrie: ~216 care revin și ~181 noi.

**Ipotezele mele** (benchmarkuri uzuale pentru magazine mici de suplimente, nu garanții). Toate se măsoară prin UTM sau atingere email, nu prin „atribuit” theMarketer:

| Sursă | Volum lunar | Ipoteză | Comenzi pe lună |
|---|---|---|---|
| Abandon checkout + coș (doar abonați, maxim 2 emailuri) | ~640 de abandonuri; ~25–35% au email cunoscut și sunt abonați → ~160–220 | 4–7% revin și cumpără | **7–14** |
| Welcome cu 4 emailuri + popup mai vizibil | 100 → 150–200 de înscrieri | 6–10% fac prima comandă în 30 de zile (azi ~4–5 pe lună, din care 4 Welcome în 3 săptămâni) | **9–18** |
| Recumpărare pe categorie (proteină, creatină, cremă de orez) | 621 → ~1.500–2.000 de cumpărători abonați după sincronizare; ~10–15% ajung lunar la momentul recumpărării → 150–300 | 4–6% | **6–15** |
| Campanii segmentate, maxim 1 pe săptămână | ~3.000–3.500 de abonați implicați × 4 = 12.000–14.000 de trimiteri | CTR 1,5–2% (azi 0,1–2,7%), 4–6% din click-uri devin comenzi | **7–17** |
| Post-cumpărare, cross-sell, win-back | — | — | **2–5** |
| **Total** | | | **~31–69, mijloc ~45–50** |

**Concluzie:**
- **50 de comenzi pe lună e realist în 3–6 luni**, dar numai dacă se întâmplă toate trei lucrurile de mai jos:
  1. lista crește prin sincronizarea Shopify și prin acord la checkout;
  2. abandonul de checkout și coș funcționează doar pe abonați;
  3. Welcome, recumpărarea și campaniile sunt construite pe segmente.
- **Fără sincronizare, cu doar 1.276 de abonați, plafonul realist e ~20–30 pe lună.**

**Reguli „să nu deranjăm” care rezultă din date:**
- maxim **1 campanie pe săptămână** pe segmentul implicat;
- maxim **3 emailuri de marketing pe contact în 7 zile**, fluxuri incluse;
- fluxurile au prioritate față de campanii și se opresc la cumpărare;
- „Subscriber fatigue – Fatigued/Distracted” se exclud din campanii;
- campaniile cu rata de dezabonare de peste 0,4% au fost cele cu promisiuni de efect. Copy-ul fără mențiuni neautorizate reduce dezabonările.

---

## 11. Recomandări pentru zonele auditate aici

**P0: săptămâna aceasta, fără risc pentru clienți**
1. **Reparat DNS-ul, la registrar.** Le face proprietarul sau cine administrează domeniul:
   - **ștergeți DMARC-ul în plus** `v=DMARC1; p=none;` și **păstrați-l exact pe cel cerut de theMarketer** (`v=DMARC1; p=none; adkim=r; aspf=r; pct=0;`). Apoi rulați validarea din theMarketer (Setări > Email settings);
   - **mai târziu**, puteți adăuga raportare `rua=mailto:…` și puteți scoate `pct=0`, dar numai după ce verificați că validatorul theMarketer acceptă înregistrarea modificată;
   - **SPF pe domeniul principal:** `v=spf1 include:_spf.google.com include:amazonses.com ~all`;
   - **DKIM Google Workspace:** Admin console > Apps > Google Workspace > Gmail > Authenticate email > generați cheia și adăugați TXT-ul `google._domainkey`;
   - **DKIM Shopify:** Settings > Notifications > Sender email > Authenticate. Adaugă CNAME-urile `shopify1/2/3._domainkey`.
2. **Reguli pentru sincronizarea celor 3.080 de abonați Shopify.** Le transmitem jobului de sincronizare; nu se schimbă nimic fără tine:
   - **nu re-abonați pe nimeni care s-a dezabonat singur**, nici în theMarketer, nici în Shopify;
   - cei cu tagul „inactivi” care sunt `SUBSCRIBED` în Shopify: îi marcați cu tagul „resync-inactivi”. Primesc **un singur** email de re-confirmare, fără reducere. Dacă nu dau click în 30 de zile, sunt suprimați, adică excluși din campanii, nu dezabonați;
   - importați doar contactele cu `emailMarketingConsent.marketingState = SUBSCRIBED`; păstrați data și sursa consimțământului.
3. **O singură convenție UTM** pentru campanii și automatizări:
   - `utm_source=themarketer`;
   - `utm_medium=email`, la fel pentru automatizări. Tipul fluxului merge în `utm_campaign`;
   - `utm_campaign=flow-welcome-2`, `flow-abandon-checkout`, `nl-2026-10-20-crema-orez` (fără emoji și fără diacritice);
   - `utm_content=hero/buton/produs-<handle>`.
   - Așa vor apărea și automatizările ca „email” în rapoartele Shopify.
4. **Raport lunar de 5 cifre**, extras din aceleași surse ca §1:
   - comenzi UTM last-click;
   - comenzi cu atingere email;
   - abonați noi;
   - dezabonări reale;
   - plângeri.
   - **„Venitul atribuit” theMarketer nu mai e folosit pentru decizii.**

**P1: în 2–4 săptămâni**

5. **Double opt-in** pentru înscrieri noi, cu WELCOME5 doar în emailul de după confirmare (§6).
6. **Captarea abonaților:**
   - un formular embedded theMarketer în footer, care să înlocuiască formularul Shopify sau să ruleze alături de el;
   - verificat că popupul nu se suprapune cu Pop Convert;
   - popupul afișat și pe paginile de produs și pe coș;
   - verificat de ce apare doar în ~jumătate din sesiuni.
7. **Sunset ca suprimare, nu ca dezabonare:**
   - 120–180 de zile fără click → excludere din campanii;
   - înainte de excludere, un mesaj de win-back;
   - dezabonare automată doar la hard bounce sau la cerere;
   - inactivitatea pe email nu atinge consimțământul SMS.
8. **Segmentele de bază**, cu reguli din §4; designul complet se face separat:
   - implicați 90 de zile (`rating ≥ 1` sau `newsletter_activity clicked any_sent_90_days`);
   - noi 30 de zile (`date_added within 30`);
   - cumpărători pe categorie, cu toate variantele de categorie;
   - recumpărare (`shopper_status bought_in_last X` + `did_not_buy_in_last Y` + categorie);
   - clienți cu mai multe comenzi (`number_of_transactions > 1`);
   - excluderi: `Subscriber fatigue – Fatigued`, `deliverability hard_bounced_in_last 90`, `email contains 1secmail`.
9. **Dezactivată automatizarea de wishlist.** De verificat dacă „Product follow-up” nu dublează cererile de recenzie Judge.me.

**P2: după ce se stabilizează**

10. După 30 de zile cu un singur DMARC curat: adăugată raportarea `rua`. După încă 60 de zile, cu rapoarte curate: `p=quarantine`.
11. Normalizate categoriile din feed (unificat „Creatina/Creatină” și restul) și brandurile („primesupplements1” și „N/A” → „Prime Supplements”). Curățate tagurile vechi („import 25.06”, „Update 13.11”).
12. Câmp „Gen” sau „Obiectiv” cerut opțional în popup sau în Welcome. Datele de sănătate rămân interzise prin regulile platformei.

---

## 12. Surse și limitări

- **theMarketer (citire):**
  - audiență: `get_audience_breakdown`, `get_audience_evolution`, `get_audience_history` (12 metrici citite: abonați email și SMS, dezabonați, bounce, activi, inactivi, pe 17.04–15.10, 90 de zile + perioada anterioară; 180 de zile în total);
  - segmente și opțiuni: `list_segments` (cu reguli), `get_audience_options` (overview, segment_conditions, segment_values pentru email_provider și purchased_category);
  - contacte: `list_contacts` cu `count_only` (surse, statusuri, RFM 14 grupe, activitate, gen, SMS, taguri, funnel, date de abonare și dezabonare, căutări pe domenii);
  - rapoarte: `get_report` pe email (bounce-rate, complaint-rate, unsubscribe-rate, unsubscribed, complaints, bounced; campanii și automatizări) și pe forms (impressions, subscribed-users, subscribe-rate, total-subscribed-users; popups și embedded);
  - restul modulelor: `get_sending_domain`, `get_costs`, `get_loyalty_program`, `get_reviews_overview`, `list_reviews`, `get_transactional_credits`, `get_order_trend` (lunar), `get_ecommerce_stats` (90 de zile, perioada anterioară, mai–octombrie lunar), `list_orders` (doar statistici, sursele popup, newsletter și email_automation), `get_integration_health`.
- **Shopify:**
  - `graphql_query` pe `orders.customerJourneySummary`, 1.079 de comenzi, 16.08–15.10 (60 de zile; doar numărătoare);
  - `codeDiscountNodeByCode(WELCOME5)` și `ordersCount` cu `discount_code:WELCOME5`;
  - ShopifyQL: `order_utm_source/medium` lunar aprilie–octombrie, comenzi, clienți noi și reveniți, funnelul de sesiuni, sesiuni pe referrer.
- **DNS public:** Cloudflare DoH și Google DoH, pentru MX, TXT, DMARC, DKIM Google și Shopify, BIMI.
- **Web:**
  - [themarketer.com – Double Opt-In (glosar)](https://themarketer.com/resources/glossary/double-opt-in);
  - [themarketer.com – Opt-in settings (glosar)](https://themarketer.com/resources/glossary/opt-in-settings);
  - [themarketer.com – How to create an embedded form](https://themarketer.com/resources/knowledge-base/how-to-create-an-embedded-form);
  - help.themarketer.com a răspuns cu 403.
- **Limitări:**
  - starea double opt-in nu a putut fi citită;
  - o comandă cumpărată de pe alt dispozitiv decât cel pe care s-a dat click nu e prinsă de UTM, deci numărul real e puțin mai mare decât cel UTM, dar mult mai aproape de el decât de theMarketer;
  - în Shopify, lunile sunt în UTC (diferență de 3 ore față de ora României la granița lunii);
  - dezabonările pe lună pentru mai–iunie nu pot fi separate de contactele noi neabonate, deci apar „n/d”;
  - numărul de contacte s-a schimbat ușor în timpul auditului din cauza sincronizării în curs (6.032 → 6.033).
