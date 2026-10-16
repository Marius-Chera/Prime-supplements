# Sistemul de email și SMS Prime Supplements pe theMarketer

**Data:** 15.10.2026, revizuit pe 16.10.2026 (lista corecturilor e la final, „Ce s-a corectat la revizie”) · **Pentru:** Marius Chera, Prime Sport Supplements SRL · **Platformă:** theMarketer (domeniul primesupplements.ro, expeditor contact@primesupplements.ro) · **Autor:** Claude

**Ce este documentul:** planul complet al sistemului de email și SMS, cu setările exacte, textele fiecărui email și ordinea în care se pune în funcțiune. Se bazează pe cele patru audituri din același folder (`audit_campaigns.md`, `audit_automations.md`, `audit_audience.md`, `audit_catalog.md`), pe auditul agenției (`agency_audit/audit.txt`), pe planul anterior pentru Shopify (`email/doc_shopify_full.md`, din care am reluat textele, adaptate) și pe documentația publică theMarketer (sursele sunt la Anexa A). Versiunea de față include corecturile din reviewul juridic (`review_legal.md`) și din reviewul de fezabilitate (`review_feasibility.md`); unde cele două se contraziceau, a câștigat reviewul juridic.

**Ce NU face documentul:** nu schimbă nimic în cont. Automatizările nu pot fi create sau editate prin API, așa că le faci tu în aplicație, după pașii de la §10. Segmentele marcate **[API]** le creează pasul următor (build), prin API.

**Confidențialitate:** documentul conține doar cifre și id-uri. Nu conține adrese de email, nume de clienți sau numere de telefon. În citatele din recenzii, numele autorului îl completezi tu din Judge.me (prenume și inițiala), acolo unde scrie [autor].

**Regulile casei, valabile în tot documentul:** doar mențiuni de sănătate autorizate, cuvânt cu cuvânt, cu condițiile lor (Reg. 1924/2006, Reg. 432/2012) și doar dacă sunt pe eticheta produsului (Legea 56/2021 art. 7(5)); fără „arde grăsimi”, „detox”, promisiuni de „imunitate”, „recuperare rapidă”; „creștere musculară” doar ca mențiunea autorizată pentru proteine; fără superlative („cel mai bun”, „nr. 1”, „maxim”); avertisment pentru cafeină unde e cazul; fără preț vechi (tăiat) în emailuri și cu prețul pe unitate lângă orice preț (§4.0); nu numim niciodată producătorul, fabrica sau furnizorul; **fără Black Friday**; **nu creăm coduri noi de reducere fără tine** (singurul cod folosit este WELCOME5, 5 %, o dată pe client); frecvență rezonabilă, fără spam.

---

## Pe scurt

1. **Azi emailul aduce, măsurat cinstit, ~5 comenzi pe lună** (click pe un link din email, ultima vizită înainte de comandă, în Shopify) și **~7 pe lună** dacă număr și comenzile la care emailul a fost prima vizită (14 în 61 de zile; 6 în septembrie). theMarketer raportează 75–81 pe lună, pentru că trece în contul emailului orice comandă a cuiva care a primit sau a deschis un email.
2. **Ținta de 50 de comenzi pe lună din email (cu click) nu e realistă în ianuarie.** Realist: **15–25 last-click, adică 20–30 cu atingere de email**, de 3–4 ori mai mult decât azi (rampa de bază, cu atingere: ~10 în noiembrie, ~15 în decembrie, ~20 în ianuarie). 50 cu atingere devine plauzibil abia când lista implicată trece de ~3.000 de contacte și peste 25 % din clienții noi se abonează la checkout, probabil în T2 2027. Calculul, pe fiecare flux, cu scenariile prudent, de bază și optimist, e la §2.
3. **De unde vin comenzile în scenariul de bază** (ianuarie, last-click, ~15): campaniile segmentate (~2,5), Welcome (~2,3), abandonul de coș și checkout (~2,3), reaprovizionarea pe produs (~2,2), newsletterul de duminică (~1,9), VIP și stoc revenit (~1), restul din client existent, recâștigare, navigare, client nou și SMS. Plus ~25 % comenzi la care emailul a fost prima atingere. **Ce mută cifra cel mai mult:** acordul de marketing la checkout (azi doar 20 % din cumpărători îl au), campania de stoc revenit la crema de orez și reaprovizionarea pornită din săptămâna 1.
4. **„Să nu deranjeze”:** țintă de **maximum 3 emailuri de marketing pe contact în 7 zile** (campanii și automatizări la un loc; în plus, cel mult cele 2 mementouri ale unui coș pe care omul l-a lăsat singur), maximum 1 pe zi și **niciun email între 21:00 și 08:00** (singura excepție, la ambele: emailul 1 de coș, la o oră după ce omul a plecat de pe site). theMarketer nu are o limită pe 7 zile: o ținem prin calendar, excluderi și orele fluxurilor și o verificăm lunar pe 20 de contacte (§3.1). SMS maximum 1 pe săptămână și 2 pe lună, doar cu acord SMS dovedit, niciodată în aceeași zi cu un email pe același subiect. Cine nu mai dă click 180 de zile e întrebat o dată și apoi scos din campanii, nu dezabonat.
5. **Ce faci tu, în ordine** (detalii la §10.1, ~11–12 ore în prima lună): **ziua 1, ~2–2,5 ore:** oprești 4 automatizări (inclusiv bug-ul care trimite „Gata să le cumperi din nou?” la 2 minute după comandă), faci reparațiile rapide, setezi smart sending și orele SMS, ștergi DMARC-ul dublat, verifici bifa de abonare de la checkout (azi nu aduce aproape niciun abonat) și verifici că trackingul theMarketer se încarcă doar după acordul pentru cookie-uri. **Săptămâna 1:** reaprovizionarea și fluxul pentru client existent (cele mai multe comenzi pe ora ta de muncă) și șablonul interimar; eu creez segmentele și verific, contact cu contact, cine poate fi reactivat. **Săptămâna 2:** Welcome cu 4 emailuri și double opt-in (după ce se termină sincronizarea), pop-up-urile și formularele cu textele noi de acord, fluxul de coș, navigarea, restul DNS-ului. **Săptămâna 3:** recâștigarea. **Luna 2:** client nou, VIP, stoc revenit, șablonul master complet.
6. **Decizii care îți aparțin** (le-am marcat **„decizie proprietar”** în text): un eventual cod pentru a doua comandă sau pentru recâștigare (implicit: fără cod); limitarea WELCOME5 doar la prima comandă (implicit: nu, codul rămâne „o dată per client”); dezactivarea celor 70 de produse vechi WooCommerce din catalog; un P.S. „Nu facem Black Friday”, fără promisiune de preț (§5); un cadou la prag de comandă în loc de reducere; abonații importați fără dovada acordului (implicit: excluși din campanii, §9.2); golirea prenumelor ghicite din adresa de email; cei 2.203 contacte scoase administrativ pe 10.07 care nu sunt abonați în Shopify (implicit: nu-i contactăm deloc; o reconfirmare doar cu avizul unui jurist).

---

## 1. Diagnostic

### 1.1 Ce e greșit azi, în 10 rânduri

1. **Măsurarea minte:** theMarketer atribuie 75–81 de comenzi pe lună emailului, dar are mai puține click-uri decât comenzi (septembrie: 73 de click-uri, 81 de comenzi). Shopify, după click, vede ~5 pe lună (iul. 6, aug. 5, sep. 4, 1–15 oct. 5) și ~7 cu orice atingere (14 în 61 de zile). Emailul face ~1 % din cele ~560 de comenzi lunare.
2. **Lista e mică și a fost tăiată greșit:** 1.304 abonați email și 601 SMS. Pe 10.07.2026 s-au scos manual 2.304 abonați email și 625 SMS, printre ei 395 de oameni care deschideau sau dădeau click și 178 de clienți cu mai multe comenzi. Doar 20 % din cei 3.174 de cumpărători au acord de marketing.
3. **Creșterea listei e lentă:** un singur pop-up, 2,2 % rată de înscriere, ~100 de abonări pe lună, afișat doar în ~47 % din sesiuni; formularul din footer trimite abonații în Shopify, nu în theMarketer; 45 % din abonații din pop-up nu au deschis niciodată un email; fără double opt-in. **La checkout, bifa de abonare nu aduce practic pe nimeni:** într-un eșantion de 100 de comenzi Shopify (15–17.09 și 01–02.10), 0 din 41 de clienți noi s-au abonat la comandă.
4. **Automatizările trimit mult și vând puțin:** 3.794 de emailuri în 90 de zile, 49 de click-uri unice (1,29 %), 7 comenzi după click. Cross sell (840 de emailuri), Remind to reorder (447), Product follow-up (334) și coșul cu produse similare (322) n-au adus nicio comandă după click în 61 de zile.
5. **Bug grav:** „Remind customers to reorder” trimite „Gata sa le cumperi din nou?” la 0–2 minute după comandă (6 cazuri, 3 clienți), pentru că niciun produs nu avea interval de recumpărare. Azi am setat intervalul la 31 de produse (§10.2); fluxul rămâne de refăcut.
6. **Dubluri și presiune:** două fluxuri de coș pe același declanșator (82 % suprapunere, două emailuri în același minut); un abonat nou a primit 9 emailuri în 11 zile, un client fidel ~20 în 23 de zile; trimiteri la 00:18–03:40; smart sending oprit peste tot.
7. **Campaniile au probleme legale și tehnice:** mențiuni de sănătate neautorizate în 11 din 18 campanii citite („BOOST DE' IMUNITATE”, „DETOXIFIERE”, „RECUPERARE MAI RAPIDĂ”), urgență falsă la NAC, footer negru pe negru (dezabonarea nu se vede), produse vechi WooCommerce cu imagini 404 și prețuri greșite (batoane 144 lei în email, 100 lei pe site).
8. **Campaniile nu sunt segmentate:** toate merg la toată lista, CTR 0,1–2,7 % (mediana ~0,5 %). Singurul subiect care vinde măsurabil e crema de orez (9 din cele 14 comenzi după click din 6 luni).
9. **Livrabilitatea e bună la cifre** (bounce 0 %, plângeri 0,02 %), **dar DNS-ul are o problemă ascunsă:** două înregistrări DMARC (ceea ce, după standard, înseamnă că domeniul nu are DMARC valid), SPF fără Google Workspace, fără DKIM pentru Google și pentru Shopify.
10. **Datele de raportare sunt stricate:** automatizările trimit `utm_medium=automation`, deci Shopify nu le vede ca email; la campanii `utm_campaign` e subiectul, cu emoji; prenumele e ghicit din adresa de email (subiecte de tipul „Încă te gândești la asta, {partea din email}?”).

### 1.2 Auditul agenției: ce e corect, ce e greșit, ce lipsește

| Ce a spus agenția | Verdict | Ce arată datele și ce adăugăm |
|---|---|---|
| Double opt-in dezactivat | **Corect** (dovadă indirectă) | 45 % din abonații din pop-up nu deschid niciodată, există adrese temporare și greșite, iar sincronizarea a scos ~944 de înscrieri de tip bot. Nuanță: GDPR cere un acord pe care îl poți dovedi (art. 7(1)), nu neapărat DOI; DOI se justifică aici prin calitatea listei și costă ~30–35 % din abonații noi. Activăm DOI doar pentru formulare, abia după ce se termină sincronizarea, iar WELCOME5 pleacă abia după confirmare (§8.1). La checkout, adresa e verificată doar de o comandă finalizată (vezi §8.1). |
| Welcome cu doar 2 emailuri, recomandat 4 | **Corect** | Facem 4 emailuri plus emailul de confirmare (§4.1). Problema mai mare: E2 („Oferte uimitoare doar pentru tine!”) pleacă și la cine tocmai a cumpărat, iar subiectul E1 conține un URL. |
| Abandon site, navigare și coș: șabloane neoptimizate | **Corect, dar incomplet** | Mai grave decât șablonul: trimiterile noaptea, lipsa excluderii cumpărătorilor, subiectele fără diacritice, prenumele ghicit din email. „Bounce follow-up” (abandon site) îl oprim de tot (§4.14). |
| Două fluxuri de coș pe același declanșator | **Corect** | 82 % suprapunere, 2 emailuri în același minut. Rămâne un singur flux de coș (§4.3). |
| Lipsește abandonul de checkout | **Parțial** | theMarketer primește evenimentul `initiate_checkout`, dar nu are un șablon de checkout documentat. Doar ~26 % din checkout-urile abandonate au acord de marketing (11 din 42 cu email, în 14 zile), iar theMarketer identifică ~40 de contacte pe lună la pasul de checkout: rămân ~10–20 de abonați pe lună. Pornim cu un singur flux de coș, care prinde și checkout-urile (varianta C, §4.2). Ramura separată, cu SMS, o facem doar dacă editorul are un filtru pe evenimentul de checkout. |
| Lipsește fluxul pentru client nou | **Corect** | Cross sell la 7 zile nu e onboarding. Facem 3 emailuri, cu doza și modul de folosire (§4.5), în luna a 2-a: valorează ~0,3 comenzi pe lună, deci vine după reaprovizionare și client existent. |
| Automatizări incomplete | **Corect** | 4 automatizări fără nicio trimitere din ianuarie. Le arhivăm după ce notăm ce conțin. |
| Wishlist fără wishlist pe site | **Corect** | `wishlist_engine: none`, evenimentele de wishlist nu ajung. Arhivăm. |
| Sunset după doar 30 de zile | **Parțial greșit** | „Inactivity behavior” e un win-back la 30 de zile fără vizită pe site și nu dezabonează pe nimeni. Pierderea mare a fost curățarea manuală din 10.07 (−2.304). Concluzia lor rămâne bună: sunset la 180 de zile, cu întrebare înainte și fără dezabonare (§4.10). |
| Rate de deschidere mici la automatizări | **Corect ca simptom, greșit ca metrică** | Deschiderile sunt umflate de Apple Mail și de scannere. Măsurăm click-uri și comenzi după click, nu deschideri. |
| Șablonul campaniilor: dark mode, fonturi, alt text | **Corect, dar incomplet** | Lipsesc din auditul lor: footer invizibil (risc GDPR și de spam), mențiuni de sănătate ilegale, produse vechi cu prețuri greșite, buton principal gri, 28 % din click-uri pe homepage (§7). |
| Fără segmentare | **Corect** | Condițiile există pe planul actual (cumpărat pe categorie 6 luni, status de cumpărător, click pe campanii). Lista exactă e la §6. |
| **Ce n-a văzut agenția** | | Atribuirea umflată de ~15 ori; bug-ul de reaprovizionare la 2 minute; DMARC dublat; formularul din footer care trimite în Shopify; trimiterile noaptea și presiunea de 9 emailuri în 11 zile; 80 % din cumpărători fără acord; mențiunile ilegale din campanii; UTM-urile automatizărilor. |

---

## 2. Matematica până la 50 de comenzi pe lună

### 2.1 Cum numărăm o comandă „din email”

- **Indicatorul principal: comenzi cu atingere de email.** Comandă Shopify la care prima **sau** ultima vizită din parcursul clientului vine dintr-un link din email sau SMS theMarketer (UTM `utm_source=themarketer` sau domeniul de tracking `mktr.primesupplements.ro`). Așa a fost numărat și auditul (14 comenzi în 61 de zile).
- **Indicatorul conservator: comenzi last-click UTM.** Doar comenzile la care ultima vizită vine din email. Raportul ShopifyQL după `order_utm_source`.
- **Indicatorul theMarketer („tranzacții atribuite”, „venit atribuit”)** rămâne în rapoarte doar informativ. Nu se iau decizii după el.
- **De ce nu deschiderile:** Apple Mail Privacy Protection și scannerele antivirus „deschid” singure emailurile. Rata de deschidere a „sărit” de la ~15 % la ~50 % doar prin scoaterea inactivilor, fără mai multe deschideri reale.

### 2.2 Ipotezele: scenariul de bază și cel optimist

**Baza** folosește media Klaviyo (transformată în click pe serie: ×1,3–2, după numărul de emailuri) și conversiile măsurate în cont. **Optimistul** păstrează valorile din prima versiune a acestui document. **Prudentul** e în tabelul de la §2.3. Calculul pe fiecare coloană e în `review_work/funnel.py`.

| Ipoteză | Bază | Optimist | De unde |
|---|---:|---:|---|
| Conversie click → comandă, campanii | 4 % newsletter, 6,5 % segmentate | 7–8 % | Contul: 216 click-uri unice → 14 comenzi UTM în 6 luni (6,5 %); crema de orez 10–20 % |
| Conversie click → comandă, fluxuri | 15 % (8 % navigare, 12 % recâștigare, 20 % reaprovizionare, 25 % checkout) | 20–28 % | Contul: 49 de click-uri → 7 comenzi UTM în 90 de zile (14 %) |
| Click unic / destinatar, newsletter | 0,7 % | 1,0 % | Azi ~0,5 % (bot-urile scoase). Klaviyo: 1,69 % la campanii |
| Click unic / destinatar, campanii segmentate | 2,0 % | 2,5 % | Crema de orez trimisă la toată lista: 1,0–1,3 % |
| Click pe serie, Welcome (cel puțin un click în cele 4 emailuri) | 13 % | 25 % | Azi ~3 % (11 click-uri unice la ~336 de abonați în 90 de zile); Klaviyo, pe email: media 6,5 %, primii 10 % 13,3 % |
| Click pe serie, coș (2 emailuri) | 10 % | 20 % | Contul: 1,28–1,55 % pe email; Klaviyo, pe email: 6,0 % / 11,3 % |
| Click pe serie, checkout | 15 % | 40 % | Klaviyo (coș): 6,0 % / 11,3 % pe email |
| Click, reaprovizionare | 8 % | 15 % | Contul: 1,34 % (fluxul cu bug); Klaviyo, post-purchase: 5,1 % / 10,5 % |
| Abonați noi confirmați pe lună | 120 (prudent 90) | 160 | Azi ~112 înscrieri pe lună (336 în 90 de zile), neconfirmate; DOI păstrează ~65 %; dublarea afișărilor pop-up-ului nu e dovedită |
| Audiența newsletterului (implicați) | 1.600 (prudent 1.200) | 1.900 | `active_email` = 1.324 (inclusiv deschideri și vizite); 45 % din abonații din pop-up nu deschid niciodată; sincronizarea e încă în curs |
| Clienți noi abonați pe lună | 20 (prudent 10) | 35 | Azi 0 din 41 în eșantion; cifra depinde în întregime de reparația bifei de la checkout |
| Mementouri de reaprovizionare pe lună | 140 | 170 | ~560 de comenzi × ~35 % de la abonați × ~85 % cu produs care are interval; depinde de câți cumpărători sunt abonați |
| Checkout-uri abandonate de abonați | 20 (prudent 10) | 35 | theMarketer: ~40 de contacte identificate pe lună la pasul de checkout, toate stările de acord; 26–35 % cu acord |
| Coșuri abandonate de abonați | 100 | 110 | Azi fluxul de coș ajunge la ~70–100 de contacte pe lună |
| Campanii segmentate pe lună | 3 × 650 | 4 × 650 | Calendarul din noiembrie are 2 (două săptămâni fără campanii, din cauza Black Friday), plus 2 campanii de restanțe |
| Comenzi cu prima atingere din email, peste last-click | +25 % | +25 % | Contul: 14 comenzi cu atingere, din care 11 last-click |
| Dublă numărare între fluxuri | — | −15 % | Aceeași comandă ar fi numărată la Welcome și la coș, la reaprovizionare și la campanie; last-click o dă unui singur flux |

Benchmark, ca reper: la Klaviyo, rata medie de comandă pe destinatar la coș e 3,33 %, iar aceea e o rată *atribuită*, mai generoasă decât last-click-ul nostru. Prima versiune a documentului punea 4–11 % în last-click, pe un cont care azi are o cincime din rata medie de click Klaviyo. De aceea valorile ei au trecut în coloana „optimist”.

### 2.3 Calculul pe fiecare sursă (luna a 3-a, ianuarie 2027, last-click)

| # | Sursă | Destinatari pe lună (bază) | Click (bază) | Click → comandă (bază) | Prudent | **Bază** | Optimist | Azi, last-click |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | Welcome (DOI + 4 emailuri) | 120 abonați noi | 13 % (pe serie) | 15 % | 1,3 | **2,3** | 8,0 | ~2 |
| 2 | Abandon checkout (în fluxul de coș, varianta C) | 20 | 15 % | 25 % | 0,3 | **0,8** | 3,9 | 0 |
| 3 | Abandon coș (2 emailuri) | 100 | 10 % | 15 % | 0,8 | **1,5** | 4,4 | ~0–1 |
| 4 | Abandon navigare (1 email) | 120 | 5,6 % | 8 % | 0,4 | **0,5** | 0,9 | 0 |
| 5 | Client nou (3 emailuri) | 20 | 10 % | 15 % | 0,1 | **0,3** | 1,8 | 0 |
| 6 | Client existent (1 email) | 90 | 5 % | 15 % | 0,4 | **0,7** | 1,4 | 0 (Cross sell: 0) |
| 7 | Reaprovizionare pe produs (1 email pe produs) | 140 | 8 % | 20 % | 1,2 | **2,2** | 7,1 | 0 (bug) |
| 8 | Recâștigare 75/120 + campania de restanțe | 90 + restanțe | 5 % | 12 % | 0,2 | **0,5** | 1,4 | ~0 |
| 9 | VIP, stoc revenit | 50–300, după eveniment | — | — | 0,5 | **1,0** | 2,0 | — |
| 10 | Newsletter de duminică (4,3 pe lună) | 1.600 × 4,3 ≈ 6.900 | 0,7 % | 4 % | 0,8 | **1,9** | 5,7 | ~1 |
| 11 | Campanii segmentate | 3 × 650 = 1.950 | 2,0 % | 6,5 % | 1,2 | **2,5** | 5,2 | ~1–2 (azi, campanii la toată lista) |
| 12 | SMS (doar acord SMS dovedit) | 10–150 | — | — | 0,3 | **0,7** | 2,0 | 0 |
| | **Total last-click** | | | | **7,7** | **15,0** | 43,9 (~37 după −15 %) | **~5** |
| | **Total cu prima atingere (×1,25)** | | | | **9,6** | **18,8** | ~47 | **~7** |

**Ce înseamnă:** în ianuarie, realist sunt **15–25 de comenzi last-click și 20–30 cu atingere de email**, de 3–4 ori mai mult decât azi. Asta e deja o creștere mare. 50 de comenzi cu atingere cer ca toate ipotezele optimiste să iasă deodată, în 3 luni. Devin plauzibile când lista implicată trece de ~3.000 de contacte și peste 25 % din clienții noi se abonează la checkout (probabil T2 2027).

**Ce închide golul, în ordinea efectului:**

1. **Acordul la checkout.** Doar 20 % din cei 3.174 de cumpărători au acord de marketing. Fiecare +10 puncte procentuale înseamnă ~18 clienți noi abonați pe lună, care intră în reaprovizionare, client existent și campanii. Efectul se adună lună de lună.
2. **Crema de orez, la fiecare revenire în stoc.** 5 din cele 14 comenzi măsurate în 61 de zile vin de aici. Campania o pregătește Claude prin API în ziua revenirii, iar tu doar aprobi testul (§4.12).
3. **Reaprovizionarea pornită din săptămâna 1** (§4.7): orice comandă livrată înainte de pornirea fluxului nu va primi niciodată memento.
4. **Decizie proprietar + jurist (doar menționată, nu recomandată fără aviz):** Legea 506/2004 art. 12(2) permite emailuri despre produse similare către clienții existenți fără abonare, dacă li s-a oferit clar posibilitatea de a refuza la colectare și în fiecare mesaj. În theMarketer ar însemna abonarea lor, un tag dedicat și excluderea tagului din toate campaniile, deci un risc de configurare. Nu se face fără avizul juristului și fără acordul tău.

**Unde e riscul:** dacă lista implicată rămâne sub ~1.400 de contacte și CTR-ul newsletterului la 0,5 %, totalul cade spre scenariul prudent (~8 last-click, ~10 cu atingere). De aceea primele săptămâni pun accent pe reaprovizionare, sincronizare, bifa de la checkout și formulare, nu pe mai multe trimiteri.

### 2.4 Rampa realistă

| Lună | Ce rulează | Cu atingere email, bază | din care last-click | Cu atingere, optimist |
|---|---|---:|---:|---:|
| Noiembrie 2026 | Reaprovizionarea și client existent (din săptămâna 1), Welcome, coșul și navigarea (din săptămâna 2), recâștigarea (din săptămâna 3), newsletterul, 2 campanii segmentate și 2 de restanțe, reactivarea | ~10 | ~8 | ~17 |
| Decembrie 2026 | Plus client nou, VIP, stoc revenit; campaniile de cadouri și termenul de livrare de Crăciun | ~15 | ~12 | ~30 |
| Ianuarie 2027 | Plus reaprovizionarea „la zi” pentru comenzile din noiembrie–decembrie, sezonul de început de an la sală | **~20** | ~15 | ~45 |

### 2.5 KPI și ținte pe lună (scenariul de bază)

| Indicator | Azi | Noiembrie | Decembrie | Ianuarie | Unde îl citești |
|---|---:|---:|---:|---:|---|
| Comenzi cu atingere email (Shopify) | ~7 | 10 | 15 | **20** | Raportul lunar (§2.6) |
| din care last-click UTM | ~5 | 8 | 12 | 15 | Shopify, `order_utm_source` |
| Venit last-click UTM (lei) | ~1.100 | ~2.100 | ~3.200 | ~4.000 | Shopify |
| Abonați email implicați (fără suprimați) | ~1.100 (activi) | 1.400 | 1.500 | 1.600 | theMarketer, segmentul „E · Implicați 180 zile” |
| Abonați noi confirmați | ~100 (neconfirmați) | 80 | 100 | 120 | Audience > Signup forms + segmentul „P · Abonați noi 11 zile (în Welcome)” |
| Click-uri unice umane (campanii + fluxuri) | ~105 | 120 | 140 | 160 | `get_report` email `unique-clicks`, fără click-urile pe iconițele sociale |
| CTR unic campanii (click / livrate) | ~0,5 % | ≥ 0,6 % | ≥ 0,8 % | ≥ 1,0 % | raportul campaniei |
| Dezabonări pe trimitere | 0,24 % campanii, 0,5 % fluxuri | < 0,3 % / < 0,5 % | la fel | la fel | `unsubscribe-rate` |
| Plângeri pe campanie | 0,02 % | < 0,08 % | < 0,08 % | < 0,08 % | `complaint-rate` (pragul Gmail e 0,1 %) |
| Bounce hard pe trimitere | 0 % | < 0,5 % (reactivare < 2 %) | < 0,5 % | < 0,5 % | `bounce-rate` |
| Contacte cu > 3 emailuri de marketing în 7 zile (fără mementourile de coș) | multe | 0 în eșantion (alarmă: > 2 din 20, P5 la §3.1) | 0 | 0 | eșantion de 20 de contacte, `get_contact_details` jurnal de livrare |
| Emailuri trimise între 21:00 și 08:00 | multe | 0 (excepție: coș E1 la 1 oră) | 0 | 0 | același eșantion |

**Țintele sunt pe scenariul de bază.** Dacă două luni la rând sunt depășite, treci la țintele scenariului optimist (ultima coloană de la §2.4).

### 2.6 Cum măsurăm

1. **O singură convenție UTM** (o pui în secțiunea **„Campaign UTM”** a fiecărui bloc „Send email” din automatizări și în pasul de tracking al fiecărei campanii):
   - `utm_source=themarketer` (litere mici, peste tot);
   - `utm_medium=email` (și la automatizări; azi e `automation`) sau `utm_medium=sms`;
   - `utm_campaign`: la fluxuri `flow-<nume>-e<n>` (ex. `flow-welcome-e1`, `flow-checkout-sms`, `flow-reorder-e1`), la newsletter `newsletter-AAAA-LL-ZZ` (convenția deja folosită de jobul de newsletter), la campanii `promo-AAAA-LL-ZZ-<subiect-scurt>`, la reactivare `reactivare-2026-10-b<lot>`, la sunset `sunset-AAAA-LL`. Fără emoji și fără diacritice;
   - `utm_content`: `buton`, `hero`, `produs-<handle>`, `ghid-<handle>`.
2. **Lunar, pe 1 ale lunii, Claude face raportul de 5 cifre** (îl pot programa ca sarcină lunară, dacă vrei): comenzi cu atingere email (citite comandă cu comandă din `customerJourneySummary` în Shopify, ca în audit), comenzi și venit last-click (ShopifyQL după `order_utm_source`/`order_utm_campaign`, cu `themarketer` și `TheMarketer`, pentru istoricul vechi), abonați noi confirmați, dezabonări reale, plângeri. Pe fiecare flux și pe fiecare campanie: click-uri unice și comenzi după click.
3. **În theMarketer** te uiți la: click-uri unice, dezabonări, plângeri și bounce, pe campanie și pe automatizare (Analytics și raportul fiecărei automatizări). „Revenue”/„Transactions” le notezi separat, ca informație.
4. **În Shopify** (pentru tine, fără Claude): Analytics > Reports, rapoartele din categoria Marketing / sesiuni și vânzări după parametrii UTM, filtru „UTM source” = themarketer. Numele exacte ale rapoartelor pot diferi pe ecran.
5. **Testul de incrementalitate** (opțional, din luna a 3-a): 10 % din audiența newsletterului, aleși aleatoriu de Claude prin API și marcați cu tagul `control-10`, nu primesc newsletterul 4 săptămâni. Diferența de comenzi pe abonat între cei care l-au primit și grupul de control e efectul real al newsletterului. **Același lucru pentru reaprovizionare:** o parte din comenzile de reaprovizionare s-ar fi făcut oricum (clienții de creatină și de proteină comandă din nou la 20–90 de zile), iar „cu atingere de email” nu înseamnă automat „în plus”. Fără A/B în automatizări, compari din Shopify rata de recumpărare la 90 de zile a cumpărătorilor abonați (primesc memento) cu a celor neabonați, înainte și după pornirea fluxului.

---

## 3. Regulile de presiune („să nu deranjeze”)

### 3.1 Limitele

| Regulă | Valoare | Cum se aplică în theMarketer |
|---|---|---|
| Emailuri de marketing pe contact | **țintă: maximum 3 în 7 zile**, campanii și automatizări la un loc; în plus, cel mult cele 2 mementouri ale unui coș lăsat de om | theMarketer **nu are o limită pe 7 zile**: smart sending impune doar un interval minim între două mesaje, iar fluxurile cu smart sending oprit trec oricum. O ținem prin calendar (1 newsletter + cel mult 1 campanie segmentată pe săptămână), prin excluderi (abonații noi și cumpărătorii din ultimele 14 zile nu primesc campanii segmentate), prin pauzele și orele fluxurilor (§3.2) și prin fixurile P1–P6 de mai jos. O verificăm lunar pe un eșantion de 20 de contacte |
| Emailuri pe zi | **maximum 1** | Settings > Email setup: intervalul **Smart Sending = 24 de ore** (documentația nu dă un maxim: dacă maximul permis e mai mic, pui maximul și îl notezi aici). La campanii, comutatorul **„Skip recently messaged contacts”** pornit. La fluxurile marcate „pornit” în §3.2, **„Enable smart sending”** pornit în blocul „Start of automation” |
| Excepție de la „1 pe zi” | **singura excepție permisă:** emailul 1 de coș (sau de checkout), la 1 oră de la abandon, inclusiv în ziua în care omul a primit Welcome E1 | Fluxul de coș are smart sending **oprit**: omul tocmai a fost pe site. Welcome are și el smart sending oprit, ca E1 să plece imediat după confirmare |
| Ore de trimitere | **08:00–21:00**; țintă 10:00 sau 18:30–19:30 | Fiecare „Time delay” din fluxuri are **„Delay until a specific time of the day”** (ora din fișa fluxului). Campaniile se programează doar în acest interval. theMarketer nu are „ore de liniște” pentru email; ele există doar pentru SMS |
| SMS | maximum **1 pe săptămână și 2 pe lună** pe contact, niciodată în aceeași zi cu un email pe același subiect, doar la segmentul „SMS · Acord dovedit” | Settings > SMS > „Quiet hours”: **From 20:00, To 10:00**; intervalul Smart Sending pe canalul SMS la **168 de ore**, dacă valoarea e permisă (altfel regula rămâne țintă, verificată lunar); SMS doar la stoc revenit (crema de orez) și în ramura de checkout, dacă există (§4.2) |
| Abonați noi | în primele 11 zile primesc doar seria Welcome (și, dacă lasă un coș, cele 2 mementouri) | Segmentul „P · Abonați noi 11 zile (în Welcome)” e exclus din toate campaniile |
| Cumpărători recenți | în 14 zile după comandă nu primesc campanii cu produse | Segmentul „X · Au comandat în ultimele 14 zile” e exclus din campaniile segmentate (newsletterul de duminică pleacă la toți) |
| Oboseală | cei marcați „Fatigued” nu primesc campanii promoționale | Excludere: segmentul de sistem „Subscriber fatigue – Fatigued”. **Nu o socotim printre protecții:** scorul crește cu fiecare deschidere, iar deschiderile automate din Apple Mail îi țin pe aproape toți „sănătoși” |
| Subiect repetat | același produs sau subiect cel mult o dată la 14 zile către același segment; niciodată două emailuri aproape identice la 24 de ore | Calendarul de la §5 |

**Exemple de încărcare reală, după reguli** (simulările din `review_feasibility.md` §3, cu fixurile aplicate):
- **Abonat nou din pop-up:** confirmare (ziua 0), Welcome E1 (ziua 0), E2 (ziua 3), E3 (ziua 6), E4 (ziua 10); din ziua 11, doar newsletterul și, dacă e în segment, o campanie pe săptămână. Prima săptămână: 3 emailuri de marketing.
- **Abonat nou care lasă un coș în aceeași vizită** (cazul frecvent: ia codul și pleacă): Welcome E1 + coș E1 în ziua 0 (singura excepție de la „1 pe zi”), coș E2 a doua zi la 19:00, Welcome E2 în ziua 3, E3 în ziua 6. Sunt 5 emailuri în 7 zile, din care 2 sunt mementourile coșului lăsat de el. Navigarea nu se adaugă (P1).
- **Client nou:** Client nou E1 (ziua 1), E2 (ziua 4), newsletterul de duminică, E3 (ziua 12), apoi reaprovizionarea la intervalul produsului. Fără campanii segmentate 14 zile.
- **Abonat care lasă un coș:** coș E1 la 1 oră, E2 a doua zi la 19:00; newsletterul nu pleacă dacă E2 a plecat în ultimele 24 de ore.
- **Abonat implicat, fără comandă, după Welcome:** 1,5–2 emailuri pe săptămână.

**Cum ținem ținta** (fixurile P1–P6 din `review_feasibility.md` §3.3):
- **P1 · Abonații noi:** Welcome E2 în ziua 3, E3 în ziua 6, E4 în ziua 10. Navigarea pleacă doar cu filtrul „a primit emailul 1 de coș în ultimele 2 zile → ies”; fără acest filtru, rămâne oprită în prima lună.
- **P2 · Cumpărătorii:** campaniile segmentate exclud „X · Au comandat în ultimele 14 zile”. Newsletterul de duminică pleacă la toți.
- **P3 · Recâștigarea:** 2 emailuri, la 75 și la 120 de zile, la 18:30, cu smart sending pornit; reaprovizionarea de la 10:00 o blochează în aceeași zi.
- **P4 · Săptămâna de sunset:** campania segmentată din acea săptămână exclude „E · Candidați sunset”.
- **P5 · Regula de oprire:** la verificarea lunară pe 20 de contacte, dacă mai mult de 2 au primit peste 3 emailuri de marketing în 7 zile (fără mementourile de coș), oprești întâi navigarea, apoi treci campania segmentată la o dată la două săptămâni.
- **P6 · SMS:** maximum 1 pe săptămână, prin intervalul smart sending de pe canalul SMS (168 de ore, dacă e permis).

### 3.2 Ce fluxuri respectă smart sending (theMarketer nu are prioritate între fluxuri)

theMarketer nu are un rang între fluxuri: are doar intervalul minim dintre mesaje (Settings > Email setup) și un comutator pe fiecare flux și pe fiecare campanie. Un flux cu smart sending **oprit** trimite oricum. Un flux cu smart sending **pornit** e blocat doar dacă **înainte** de el, în interval, a plecat deja alt mesaj. Ordinea o decide ora, nu un rang. De aceea: **fluxurile importante pleacă la 10:00, cele care pot aștepta la 18:30.**

| Flux | Smart sending în flux | Ora | De ce |
|---|---|---|---|
| Abandon coș (și checkout, în varianta C) | oprit | E1 la 1 oră de la abandon; E2 a doua zi la 19:00 | intenția cea mai mare; omul tocmai a fost pe site |
| Welcome | oprit (E1 trebuie să plece imediat) | E1 la 5 minute de la confirmare; E2–E3 la 18:30; E4 la 10:00 | promisiunea din pop-up |
| Client nou E1–E3 | oprit | E1 la 10:00; E2–E3 la 18:30 | informație despre o comandă reală |
| Reaprovizionare | **pornit** | 10:00, marți, vineri sau sâmbătă | oprește două mementouri în aceeași zi (două produse cu același interval); cade la peste 24 de ore după newsletter și după campania de miercuri |
| Stoc revenit, VIP | pornit | 10:00 (stoc), 18:30 (VIP) | eveniment rar |
| Abandon navigare | pornit | 18:30 | intenție mică |
| Client existent (cross-sell) | pornit | 18:30 | poate aștepta |
| Recâștigare | pornit | 18:30 | poate aștepta; reaprovizionarea de la 10:00 o blochează în aceeași zi |
| Campanie segmentată | „Skip recently messaged contacts” pornit | miercuri, 19:30 | |
| Newsletter de duminică | „Skip recently messaged contacts” pornit | duminică, 18:00 | |
| Sunset (întrebarea de reconfirmare) | „Skip recently messaged contacts” pornit | prima marți din lună, 19:00 | |

Fluxurile care pot aștepta au și **filtre de excludere**: navigarea nu pleacă la cine a comandat în ultimele 3 zile sau a primit emailul 1 de coș în ultimele 2 zile (§4.4); client existent și recâștigarea nu pleacă la cine a comandat de curând (filtrul „Shopper status > Buyer in the last X days”).

**De verificat la primul test** (documentația nu spune): când un email dintr-o automatizare cu smart sending e blocat de interval, e amânat sau sărit? Te uiți în raportul automatizării după 7 zile. Dacă e sărit și pierdem emailuri importante, oprim smart sending la acel flux. Tot la primul test verifici că emailul de confirmare DOI nu blochează Welcome E1 (n-ar trebui: Welcome are smart sending oprit).

### 3.3 SMS doar la momente cu intenție mare

- **Da:** (1) crema de orez revenită în stoc, doar cumpărătorilor ei din ultimele 6 luni, maximum o dată pe lună; (2) checkout abandonat, a treia zi la 11:00, doar dacă n-a comandat și (dacă filtrul există) n-a dat click pe niciun email din flux, și doar dacă există ramura separată de checkout (varianta A sau B din §4.2; implicit nu există).
- **Nu:** newsletter, campanii de produs, recâștigare, sărbători.
- **Doar contactele cu acord SMS dovedit:** auditul a găsit acorduri pentru email, SMS și push înregistrate în aceeași secundă, inclusiv la abonările din pop-up, deci nici tagul „abonare pop-up” nu dovedește un acord SMS separat. **Înainte de primul SMS**, Claude citește istoricul de consimțământ la 5 abonați recenți din pop-up care au telefon. Dacă SMS-ul apare în aceeași secundă cu emailul, fără bifă separată în formular, nu trimitem niciun SMS până nu există bifa separată. Apoi Claude pune tagul `acord-sms-dovedit`, contact cu contact, doar celor la care istoricul arată acordul SMS dat printr-un formular cu text SMS separat (pop-up-ul nou din §8.2 sau, pentru cel vechi, după ce verifici că avea o bifă SMS separată), și raportează doar cifrele. SMS pleacă doar la segmentul „SMS · Acord dovedit”. Importul din sincronizare a abonat automat la SMS 8 contacte fără acord; abonarea SMS a fost anulată imediat. Dacă nu trimitem SMS deloc, pierderea e sub o comandă pe lună.
- **Text fără diacritice** (alfabetul GSM, 160 de caractere pe SMS), cu numele magazinului la început și linkul de dezabonare SMS la final.

### 3.4 Sunset: întâi întrebăm, apoi scoatem din campanii (nu dezabonăm)

- **Recâștigarea vine înainte:** cumpărătorii primesc emailurile de la 75 și 120 de zile fără comandă (§4.9).
- **Candidat la sunset:** abonat de peste 180 de zile, care a primit **cel puțin 5 campanii în ultimele 90 de zile** și **n-a dat click pe niciuna în 180 de zile**, fără comandă în 180 de zile și fără activitate pe site în 90 de zile (segmentul „E · Candidați sunset”). Condiția cu 5 campanii primite îi ține afară pe cei reabonați recent la sincronizare.
- **Întrebarea:** o dată pe lună, campania „Mai vrei să primești emailurile noastre?” (§4.10) merge la candidații noi.
- **După 14 zile fără click:** contactul primește tagul `email-inactiv` (Claude îl pune prin API, lunar) și iese din toate campaniile. Rămâne abonat: primește în continuare emailurile de comandă și, dacă revine pe site, emailurile de coș și checkout. Dacă dă click sau comandă, tagul se scoate.
- **Păstrare:** un contact cu `email-inactiv` sau din „Reactivare 2026-10 · neconfirmați” care timp de 24 de luni nu dă click, nu comandă și nu vizitează site-ul este dezabonat și șters din theMarketer (datele de comandă rămân în Shopify, pentru contabilitate). Perioada se scrie la fel în politica de confidențialitate (de confirmat cu un jurist).
- **Dezabonarea** se face doar la cererea omului, la hard bounce (theMarketer o face automat) sau la termenul de păstrare de mai sus.
- **Curățarea automată theMarketer** (după 24 de emailuri HTML nedeschise) o **oprești** (Settings > Cleanup subscribers): contactul curățat e dezabonat, ceea ce contrazice regula de mai sus, iar sunsetul lunar cu tag face aceeași treabă fără dezabonare. Deschiderile umflate de Apple Mail o fac oricum aproape fără efect.

### 3.5 Opțiunea „mai rar”

- **În subsolul fiecărui email de marketing:** „Vrei mai puține emailuri? Răspunde cu «MAI RAR» și îți trimitem doar ghidul de duminică și mementourile legate de coșul și comenzile tale.” Răspunsurile ajung la contact@primesupplements.ro.
- **Ce faci la un răspuns „MAI RAR”:** pui pe contact tagul `frecventa-redusa` (Audience > Contacts > contactul > Tags) sau îmi trimiți lista de id-uri. Segmentul „X · Frecvență redusă” e exclus din campaniile segmentate și din fluxurile de stoc revenit, VIP, navigare, client existent și recâștigare. Rămân: newsletterul de duminică, fluxurile de comandă (client nou, reaprovizionare), coș și checkout. **De verificat pe ecran:** excluderea din fluxuri cere un filtru pe tag sau pe segment în editorul de automatizări, care nu e documentat. Dacă nu există, promisiunea nu se poate ține: scoți fraza cu „MAI RAR” din subsol și din emailuri (Welcome E4, recâștigare E2) și lași doar dezabonarea.
- **Orice răspuns care cere oprirea emailurilor** („stop”, „dezabonare”, „nu mai vreau”) = dezabonare din theMarketer în cel mult 2 zile lucrătoare (Audience > Contacts > contactul > Unsubscribe). Nu se tratează ca „MAI RAR”.
- **Varianta automată (luna a 2-a, de testat):** o pagină de destinație theMarketer (Audience > Landing pages) cu un formular „Vreau mai puține emailuri”, care pune singur tagul `frecventa-redusa`. Linkul ei înlocuiește fraza cu „MAI RAR”.

---

## 4. Automatizările

### 4.0 Harta fluxurilor și setările comune

| § | Flux | Ce facem | Șablon în theMarketer (Automation > „+ Create journey”) | Declanșator | Emailuri | Smart sending | Re-intrare |
|---|---|---|---|---|---|---|---|
| 4.1 | Welcome | **refacem** (vechiul „Welcome series 2”, `696f6c4ff8dbc4c7200f28c9`, se oprește când pornește cel nou) | New subscribers > Welcome series | abonare confirmată (DOI) | confirmare + 4 | oprit | „Only once” |
| 4.2 | Abandon checkout | **implicit în fluxul de coș** (varianta C); flux sau ramură separată doar dacă editorul are filtru pe evenimentul de checkout | Cart related > Cart abandonment (sau un șablon de checkout, dacă apare în listă) | checkout început, fără comandă, după 60 min | în varianta C, cele 2 de la 4.3; separat: 2 + 1 SMS | oprit | „Multiple times”, capping 7 zile, „Exclude contacts who have not exited…” pornit |
| 4.3 | Abandon coș | **reparăm** „Cart abandonment” (`6862b5c5fd9dc29f6a0f5a6f`); **oprim** „Cart abandonment similar products” (`696f6cd3a6575726ba0b55e8`) | Cart related > Cart abandonment | coș abandonat, după 60 min | 2 | oprit | ca la 4.2 |
| 4.4 | Abandon navigare | **reparăm** „Product follow-up” (`696f6e585ade8453f10815b6`); în luna 1, doar dacă există filtrul pe emailul de coș (P1) | cel existent | produs văzut, fără coș | 1 | pornit | „Multiple times”, capping 14 zile |
| 4.5 | Client nou | **nou**, în luna 2 | Post Purchase > Cross sell (îl refolosim ca schelet) | comandă „fulfilled”, prima comandă | 3 | oprit | „Only once” |
| 4.6 | Client existent | **nou**, în săptămâna 1, înlocuiește „Cross sell” (`696f6e6442d74696320ee134`) | Post Purchase > Cross sell | comandă „fulfilled”, a 2-a și următoarele | 1 | pornit | „Multiple times”, capping 30 zile |
| 4.7 | Reaprovizionare | **refacem**, în săptămâna 1; vechiul „Remind customers to reorder” (`6862b6757163af43b901e1ed`) se oprește **în ziua 1** | Post Purchase > Remind customers to reorder | comandă „fulfilled” + intervalul produsului | 1 pe produs | **pornit** | „Multiple times”, **fără** frequency capping, „Exclude contacts who have not exited…” **oprit** |
| 4.8 | Cerere de recenzie | doar **Judge.me**, nimic în theMarketer | — | — | 0 | — | — |
| 4.9 | Recâștigare 75/120 | **nou**, în săptămâna 3, înlocuiește „Inactivity behavior” | Post Purchase > Cross sell, cu întârzieri lungi | comandă „fulfilled”, fără altă comandă | 2 | pornit | „Multiple times”, fără capping, „Exclude…” oprit |
| 4.10 | Sunset | **campanie lunară** + tag | Campaigns | segment | 1 | „Skip recently messaged contacts” | — |
| 4.11 | VIP | **nou**, în luna 2 | Post Purchase > Cross sell | a 3-a comandă | 1 | pornit | „Only once” |
| 4.12 | Stoc revenit | **nou** dacă există șablonul, altfel campanie pregătită de Claude prin API | de căutat în listă: „Back in stock” | produs revenit în stoc | 1 (+1 SMS la crema de orez) | pornit | — |
| 4.13 | Aniversare, scădere de preț | **nu acum** (§4.13) | — | — | — | — | — |
| 4.14 | Bounce follow-up, wishlist, Inactivity behavior, refs 1/2/5/8 | **oprim și arhivăm** | — | — | — | — | — |

**Cum refaci un flux fără să deranjezi pe nimeni:** construiești fluxul nou, îl salvezi oprit, trimiți câte un test din fiecare email, apoi, în același minut, pornești fluxul nou (butonul verde din lista Automation) și îl oprești pe cel vechi. Fluxurile vechi nu le ștergi: le arhivezi, ca să rămână istoricul.

**Setări comune pentru toate fluxurile:**

- **„Start of automation”:** „Include imported contacts” **oprit** (unde apare), ca importurile din Shopify să nu pornească fluxuri. „Enable smart sending” după tabelul de mai sus.
- **Fiecare „Time delay”:** pornești **„Delay until a specific time of the day”** la ora din fișa fluxului (10:00, 18:30 sau 19:00). Excepție: emailul 1 de checkout și de coș, care pleacă la 1 oră de la abandon. Dacă editorul aplică ora fixă după durata aleasă, emailul pleacă a doua zi la acea oră; e în regulă.
- **Fiecare „Send email”:** subiectul și preheaderul („Preview text”) din fișă; expeditorul „Prime Supplements” <contact@primesupplements.ro>, reply-to contact@primesupplements.ro; în **„Campaign UTM”** pui convenția de la §2.6; la **„Email content”** pornești din șablonul „Prime · Master 2026” (§7).
- **Fără prenume în subiect, salut simplu „Salut!” în corp.** Prenumele din theMarketer e ghicit din adresa de email la abonații din pop-up și e inversat la o parte din contactele importate.
- **Blocuri de produs:** doar produse din feedul Shopify (`/products/…`), niciodată cele vechi `/produs/…`. Blocurile dinamice (coș, produs văzut, produs de reaprovizionat, recomandări) iau singure prețul și imaginea din feed. Recomandările nu mai scot haine și accesorii: azi am exclus din recomandări 121 de produse (§10.2).
- **Fără preț vechi în emailuri.** În toate blocurile de produs, statice și dinamice, din campanii și din automatizări, oprești afișarea prețului vechi („old price” / „full price”) și a etichetei de reducere („-X %”). Rămâne doar prețul de azi. Dacă blocul dinamic nu permite asta, scoți prețul din bloc: rămân imaginea, numele și butonul. **Testul obligatoriu:** un email de test cu Creamy Rice tort de ciocolată în coș trebuie să arate doar „60 lei”, fără „65 lei” tăiat. De ce: feedul are acum prețuri comparate (Creamy Rice 65/60, batoane 155/100, EAA 185/175, magneziu 90/60), iar un preț tăiat într-un email e anunțarea unei reduceri, care ar cere cel mai mic preț din ultimele 30 de zile (HG 947/2000 art. 4¹; Directiva 98/6 art. 6a).
- **Prețul pe unitate:** unde apare un preț, apare și prețul pe unitate (HG 947/2000, publicitatea pentru vânzarea la distanță), de exemplu „360 lei · 180 lei/kg”, la capsule „· X lei/capsulă”. Pe cardurile statice îl scrii de mână; dacă un bloc dinamic nu îl poate afișa, aplici regula de mai sus (fără preț în bloc).
- **De verificat separat** (nu e strict în emailuri): prețurile comparate de pe paginile de produs trebuie să fie, la rândul lor, cel mai mic preț din ultimele 30 de zile. Altfel pagina însăși încalcă regula, iar WELCOME5 se adaugă peste o reducere nevalidă.
- **Produsele cu nume care sugerează un efect** (Cluster Insulin Bomb, Recovery Glutamin, Recovery BCAA, Fat Burning Booster Shot, Thermo Core, Energy Pump Shot, Water Out, Testo Revive, Cardio Calm, Liver Protect) nu apar în textele scrise de noi. Pot apărea doar în blocurile care arată ce a ales omul (coș, produs văzut). **Din blocurile de recomandare sunt excluse obligatoriu**, înainte să pornească orice flux cu recomandări (4.3 E2, 4.5 E3, 4.6, 4.7): Claude aplică prin API excluderea celor 12 id-uri (`audit_catalog.md` §9.3). Dacă excluderea s-ar aplica și pe site și nu vrei asta, în emailuri nu folosești blocuri de recomandare, ci doar cele 3 carduri statice (Prime Whey 2 kg, Creatină Creapure®, Creamy Rice tort de ciocolată).
- **Coduri de reducere:** doar **WELCOME5**, blocul **„Discount”** cu „Used code type” = multi-use, valoarea „5%”. Coduri unice generate de theMarketer („unique codes”) **nu** folosim: ar fi coduri noi, deci **decizie proprietar**.
- **Subsolul comun** (în șablon, §7.3) conține datele firmei, dezabonarea, opțiunea „mai rar” și mențiunea pentru suplimente. În fluxurile cu blocuri dinamice de produs (coș, checkout, navigare, reaprovizionare, client existent, recâștigare) subsolul are și rândul pentru cafeină: „Dacă produsul conține cafeină: nu se recomandă copiilor sau femeilor însărcinate, și nici persoanelor sub 18 ani, femeilor care alăptează sau persoanelor sensibile la cafeină. Cantitatea de cafeină pe porție e pe etichetă; nu o combina cu alte surse de cafeină.”
- **Ieșire la comandă:** după fiecare „Time delay” pui un **„Filter”** > „E-commerce data” > „Shopper status” > **„Buyer in the last X days”**, cu X din fișă. Cine a comandat iese din flux.
- **Semnătura:** „Spor la antrenament, Marius Chera, fondator Prime Supplements” (fluxurile de relație) sau „Echipa Prime Supplements” (coș și checkout).
- **Linkuri:** butoanele duc la `/products/<handle>` sau `/collections/<handle>`, niciodată la homepage. Doar logoul duce la homepage.
- **Răspunsurile la emailuri** respectă aceleași reguli: fără promisiuni de efect, fără „arde grăsimi” sau „slăbire”, doar mențiunile de pe etichetă. Dacă cineva scrie despre o afecțiune sau un tratament, îi răspundem „discută cu medicul” și nu păstrăm detaliile în theMarketer.

**Ce trebuie verificat pe ecran** (documentația theMarketer nu le descrie; dacă lipsesc, folosești varianta de rezervă din fișă): filtrul pe numărul de comenzi, pe categoria sau pe produsul cumpărat și pe segment sau tag (`number_of_transactions`, `purchased_category` și `purchased_product` sunt documentate doar ca reguli de segment); un filtru pe **evenimentul** de checkout, cu fereastră în ore sau zile (nu cel pe „Funnel”, care înseamnă „cel mai departe pas atins în ultimele 3 luni”); „Automation activity” cu opțiunea „Clicked”; blocurile de recomandare în emailurile din automatizări; opțiunea de a ascunde prețul vechi în blocurile de produs; un șablon dedicat de checkout și unul de stoc revenit; comportamentul smart sending în automatizări (amânare sau sărire).

### 4.1 Welcome (confirmare + 4 emailuri, 10 zile)

- **Scop:** prima comandă a abonatului nou, cu promisiunea din pop-up ținută (WELCOME5).
- **Declanșator:** abonare **confirmată** la email (cu double opt-in pornit, theMarketer abonează contactul abia după click pe linkul de confirmare; de verificat la test). Template: New subscribers > Welcome series. Numele fluxului: „Welcome 2026 (4 emailuri)”.
- **Filtre:** imediat **după emailul 1**, **Filter** „Buyer in the last 365 days” → ies (clienții recenți care se abonează din pop-up primesc emailul 1, cu codul promis, apoi doar newsletterul). Dacă editorul are filtru pe numărul de comenzi = 0 sau pe segmentul de sistem „Shopping - Nonbuyers lifetime”, îl folosești în locul lui.
- **Ieșire:** comanda (filtrele de după fiecare pauză), dezabonarea.
- **Setări:** Run flow „Only once”; „Include imported contacts” oprit; smart sending oprit.
- **Linkurile cu WELCOME5:** UTM-ul se pune **în calea de redirect**, codificat, pentru că nu e documentat că Shopify îl păstrează peste redirectul `/discount/…`. Exemplu (E1): `https://primesupplements.ro/discount/WELCOME5?redirect=%2Fcollections%2Fsuplimente-sala%3Futm_source%3Dthemarketer%26utm_medium%3Demail%26utm_campaign%3Dflow-welcome-e1%26utm_content%3Dbuton`. Îl testezi o dată: click din emailul de test, apoi te uiți în Shopify, la sesiune sau la comanda de test, dacă apare `utm_source=themarketer`.
- **Schema:**

```text
Start (abonare confirmată) → Time delay 5 minute → Send email 1 (WELCOME5)
→ Filter: Buyer in the last 365 days → ies (clienții recenți primesc doar E1, apoi newsletterul)
→ Time delay 3 zile, until 18:30 → Filter: Buyer in the last 4 days → ies → Send email 2 (povestea)
→ Time delay 3 zile, until 18:30 → Filter: Buyer in the last 7 days → ies → Send email 3 (cum alegi)
→ Time delay 4 zile, until 10:00 → Filter: Buyer in the last 11 days → ies → Send email 4 (recenzii și condiții)
```

#### 4.1.0 Emailul de confirmare (double opt-in, fără marketing)

- **Subiect:** Confirmă abonarea la Prime Supplements · **Alternativ:** Un click și ești abonat
- **Preheader:** Apasă butonul ca să confirmi abonarea la Prime Supplements.
- **CTA:** Confirm abonarea → linkul de confirmare generat de theMarketer
- **Blocuri dinamice:** niciunul. **Cod:** niciunul (codul vine în emailul 1, după confirmare).

> Salut!
>
> Ai cerut să primești emailurile Prime Supplements. Ca să fim siguri că adresa e a ta, apasă butonul de mai jos.
>
> **[ Confirm abonarea ]**
>
> După confirmare primești emailul de bun venit promis în formular.
>
> Nu tu ai cerut abonarea? Ignoră acest email. Fără confirmare nu te abonăm și nu-ți mai scriem.
>
> PRIME SPORT SUPPLEMENTS SRL · CUI 46260823 · Cisnădie, jud. Sibiu · contact@primesupplements.ro

#### 4.1.1 Email 1 · Codul de bun venit (la 5 minute după confirmare) · `flow-welcome-e1`

- **Subiect:** Codul tău de 5 % e aici · **Alternativ (A/B):** Bun venit la Prime Supplements. Poftim cei 5 % promiși
- **Preheader:** WELCOME5: 5 % la toată comanda, o singură dată per client. Peste 300 de lei, livrarea e gratuită.
- **CTA:** Alege primul produs → `https://primesupplements.ro/discount/WELCOME5?redirect=%2Fcollections%2Fsuplimente-sala%3Futm_source%3Dthemarketer%26utm_medium%3Demail%26utm_campaign%3Dflow-welcome-e1%26utm_content%3Dbuton` (linkul Shopify care pune codul singur în coș, cu UTM-ul în calea de redirect)
- **Blocuri dinamice:** blocul „Discount” (WELCOME5, 5 %, multi-use); 3 carduri de produs statice din feed: Prime Whey 2 kg, Creatină Creapure®, Creamy Rice tort de ciocolată, cu prețul de azi și prețul pe unitate, fără preț vechi (§4.0).
- **Cod:** WELCOME5, justificat: e promisiunea din pop-up.

> Salut!
>
> Bine ai venit la Prime Supplements. Ți-am promis 5 % reducere și mă țin de cuvânt:
>
> **[Blocul Discount: WELCOME5 · 5 % la toată comanda]**
>
> Îl scrii în coș, la „Cod de reducere”, sau apeși butonul de mai jos și se aplică singur. Se folosește o singură dată și nu expiră, așa că îl folosești când ești gata.
>
> Nu știi de unde să începi? Iată câteva dintre produsele cele mai comandate în ultimele 3 luni:
>
> - **Prime Whey 2 kg:** pudră proteică pe bază de concentrat din zer, cu aproximativ 24 g de proteine la porția de 30 g (conform declarației nutriționale), 66 de porții, 7 arome.
> - **Creatină Creapure®:** un singur ingredient, creatină monohidrat micronizată, la 300 g sau 500 g.
> - **Creamy Rice:** cremă de orez care se prepară fără fierbere, în 7 variante (6 arome și una fără aromă).
>
> **[Carduri de produs: Prime Whey 2 kg · Creatină Creapure® · Creamy Rice tort de ciocolată]**
>
> **[ Alege primul produs ]**
>
> **Bine de știut:**
>
> - Livrarea e gratuită la comenzile de peste 300 de lei, altfel costă 20 de lei. Cargus aduce coletul în 1–3 zile lucrătoare.
> - Plătești cu cardul, prin transfer bancar sau ramburs, la curier.
> - Ai o întrebare? Răspunde la acest email sau scrie-ne pe WhatsApp la 0775 286 584. Luni–vineri, 8:00–18:00, răspundem în medie într-o oră.
>
> În următoarele 10 zile îți mai trimit cel mult 3 emailuri scurte: cine suntem, cum alegi produsele și ce spun clienții. Apoi primești ghidul de duminică și cel mult un email pe săptămână despre produse. Dacă lași ceva în coș sau comanzi, îți scriem și despre asta.
>
> Te poți opune oricând emailurilor de marketing: apeși „Dezabonare” la finalul oricărui email și nu mai primești emailuri de marketing de la noi.
>
> Spor la antrenament, Marius Chera, fondator Prime Supplements

#### 4.1.2 Email 2 · Povestea și valorile (ziua 3, 18:30) · `flow-welcome-e2`

- **Subiect:** De ce am pornit Prime Supplements · **Alternativ:** Din Cisnădie, pentru oricine trage tare la sală
- **Preheader:** Povestea pe scurt și cele trei lucruri după care ne ghidăm.
- **CTA:** Vezi produsele Prime → `https://primesupplements.ro/collections/suplimente-sala`; link în text: „Cunoaște-l pe Marius” → `https://primesupplements.ro/pages/autor-marius-chera`
- **Blocuri dinamice:** niciunul. **Cod:** WELCOME5 doar în P.S.

> Salut!
>
> Sunt Marius Chera, antrenor de culturism și fondatorul Prime Supplements. Am pregătit sportivi care au obținut cardul PRO în organizația NPC, iar în 2022 am lansat Prime Supplements la Cisnădie, lângă Sibiu.
>
> Am pornit cu o misiune simplă: să educăm și să inspirăm sportivii și să le explicăm pe înțeles ce iau și de ce. De aici vine și motto-ul nostru, **HARDCORE SPORTS NUTRITION**. Nu e despre etichete care țipă, ci despre mentalitatea de a trage puțin mai tare decât data trecută.
>
> Ne ghidăm după trei lucruri:
>
> 1. **Spunem clar ce e în produs.** Pe fiecare etichetă găsești cantitățile pe porție, iar pe site, lista completă a ingredientelor.
> 2. **Folosim ingrediente cu nume.** Creatina noastră este Creapure®, iar Prime Supplements apare pe creapure.com ca brand partener Creapure® din România. Izolatul proteic conține enzimele Digezyme®. Sunt mărci pe care le poți verifica singur.
> 3. **Explicăm, nu doar vindem.** Pe blog găsești peste 120 de ghiduri gratuite despre proteine, creatină, vitamine și alimentația pentru sală. Dacă ai o întrebare, ne scrii și îți răspundem noi.
>
> Din 2022 am primit peste 8.600 de comenzi din toată țara. Mulțumesc că ești de-acum și tu în echipă.
>
> **[ Vezi produsele Prime ]**
>
> Vrei să știi mai multe despre mine și despre cum lucrăm? [Cunoaște-l pe Marius →]
>
> Marius
>
> P.S. Codul tău WELCOME5 e încă valabil: 5 % la toată comanda, o singură dată.

#### 4.1.3 Email 3 · Cum alegi și ce aleg des clienții (ziua 6, 18:30) · `flow-welcome-e3`

- **Subiect:** Ce aleg cel mai des clienții Prime · **Alternativ:** De aici încep mulți clienți Prime
- **Preheader:** Câteva dintre produsele cele mai comandate în ultimele 3 luni, cu nota dată de clienți, și cum alegi pe obiectivul tău.
- **CTA:** Vezi cele mai vândute → `https://primesupplements.ro/discount/WELCOME5?redirect=%2Fcollections%2Fsuplimente-sala%3Fsort_by%3Dbest-selling%26utm_source%3Dthemarketer%26utm_medium%3Demail%26utm_campaign%3Dflow-welcome-e3%26utm_content%3Dbuton`
- **Blocuri dinamice:** 4 carduri statice (Prime Whey 2 kg, Pure Isolate 2 kg, Creatină Creapure®, Creamy Rice tort de ciocolată). Nu folosi blocul „Bestsellers”: poate scoate Cluster sau produse cu nume de efect. Notele și numărul de recenzii le actualizezi o dată pe trimestru, din Judge.me.
- **Cod:** WELCOME5 în P.S. și în linkul butonului.

> Salut!
>
> Nu știi de unde să începi? Câteva dintre produsele cele mai comandate în ultimele trei luni:
>
> - **Prime Whey 2 kg** · nota 4,75 din 5, din 44 de recenzii. Pudră proteică pe bază de concentrat din zer, cu aproximativ 24 g de proteine la porția de 30 g. 66 de porții, 7 arome. Există și varianta de 1 kg, cu 33 de porții.
>
> - **Pure Isolate 2 kg** · nota 4,77 din 5, din 13 recenzii. Izolat din zer microfiltrat, cu enzimele Digezyme®. 74 de porții de 27 g, 7 arome.
>
> - **Creatină Creapure®** · nota 5,0 din 5, din 17 recenzii. Un singur ingredient: creatină monohidrat micronizată Creapure®. 300 g (60 de porții) sau 500 g (100 de porții).
>
> - **Creamy Rice** · nota 5,0 din 5 la aroma tort de ciocolată, din 33 de recenzii. Cremă de orez pregelatinizată, care se prepară fără fierbere: o porție de 45 g cu 150–200 ml de apă sau lapte rece. 22 de porții la 1 kg.
>
> - **EAA** · nota 5,0 din 5, din 7 recenzii. Opt aminoacizi esențiali, într-o pudră cu aromă. 83 de porții la 500 g, 4 arome.
>
> **[Carduri de produs: Prime Whey 2 kg · Pure Isolate 2 kg · Creatină Creapure® · Creamy Rice]**
>
> **Cum alegi, pe scurt:**
>
> - **Vrei mai multe proteine în zi?** Proteinele contribuie la creșterea masei musculare și la menținerea masei musculare. Pudra acoperă doar diferența care îți lipsește din mâncare. Calculul îl găsești în [ghidul „Câtă proteină pe zi”](https://primesupplements.ro/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv).
> - **Te antrenezi intens, în serii scurte?** Creatina crește performanța fizică în eforturi succesive din timpul exercițiilor fizice de scurtă durată și de mare intensitate. Efectul benefic se obține în condițiile unui consum zilnic de 3 g de creatină. Produsul se adresează adulților care efectuează exerciții fizice de mare intensitate.
> - **Vrei o masă rapidă înainte de sală?** Crema de orez se prepară în câteva secunde, fără fierbere: o porție de 45 g are 32–35 g de carbohidrați, după aromă. Vezi [ghidul despre crema de orez](https://primesupplements.ro/blogs/news/cum-alegi-crema-de-orez).
>
> **[ Vezi cele mai vândute ]**
>
> Nu știi ce ți se potrivește? Răspunde la acest email cu obiectivul tău (masă musculară, performanță la antrenament sau o rutină mai simplă) și îți recomandăm noi.
>
> Marius
>
> P.S. Cu WELCOME5 ai 5 % la toată comanda, o singură dată, iar peste 300 de lei livrarea e gratuită.

*Setare tehnică:* mențiunea pentru creatină e formularea oficială din Reg. 432/2012, aceeași ca pe pagina Creapure® și în newsletterele din 01.11 și 29.11. Eticheta creatinei de 300 g are o variantă echivalentă; la următorul tiraj o aliniezi la textul oficial. (De confirmat cu un jurist: textul oficial exact din Jurnalul Oficial, versiunea în limba română.)

#### 4.1.4 Email 4 · Recenzii, condiții clare și ce te interesează (ziua 10, 10:00) · `flow-welcome-e4`

- **Subiect:** 4,87 din 5: ce spun clienții Prime · **Alternativ:** Nu ne crede pe cuvânt. Citește-i pe ei.
- **Preheader:** Recenzii de la cumpărători verificați, plus livrarea, plata și returul, pe scurt.
- **CTA:** Alege-ți primul produs → `https://primesupplements.ro/discount/WELCOME5?redirect=%2Fcollections%2Fsuplimente-sala%3Futm_source%3Dthemarketer%26utm_medium%3Demail%26utm_campaign%3Dflow-welcome-e4%26utm_content%3Dbuton`
- **Blocuri dinamice:** niciunul. Cele 4 linkuri de categorie alimentează automat preferințele contactului în theMarketer (categoria vizitată), pe care le folosim la segmentare.
- **Cod:** WELCOME5.

> Salut!
>
> Până acum, clienții noștri au lăsat 432 de recenzii pe Judge.me, cu nota medie 4,87 din 5. Dintre ele, 249 sunt de la cumpărători verificați, adică de la oameni care au comandat produsul, iar nota lor medie este 4,9. Câteva dintre ele:
>
> „Un produs foarte bun, aroma delicioasă, se omogenizează ușor.” [autor], Prime Whey 2 kg, cumpărător verificat
>
> „Toate produsele sunt calitative, prețurile super accesibile […] pudrele proteice se amestecă foarte bine, au un gust extraordinar de bun, la fel și gama de aminoacizi.” [autor], cumpărător verificat
>
> „Preț bun, calitatea e simplă de analizat: CREAPURE!” [autor], Creatină Creapure®, cumpărător verificat
>
> **Ce știi sigur când comanzi de la noi:**
>
> - **Livrare:** prin Cargus, în 1–3 zile lucrătoare. Gratuită peste 300 de lei, altfel 20 de lei.
> - **Plată:** cu cardul (prin Netopia), prin transfer bancar sau ramburs, la curier.
> - **Retur:** ca la orice cumpărătură online, ai 14 zile de la primirea coletului să te răzgândești. Transportul la retur îl plătești tu, iar suplimentele desigilate nu se mai pot returna, din motive de igienă.
> - **Ajutor:** contact@primesupplements.ro sau 0775 286 584 (și WhatsApp), luni–vineri, 8:00–18:00.
>
> **Ce te interesează cel mai mult?** Alege un subiect și îți scriem mai des despre el:
> [Proteine](https://primesupplements.ro/collections/pudra-proteica) · [Creatină](https://primesupplements.ro/collections/creatina) · [Cremă de orez](https://primesupplements.ro/collections/crema-de-orez) · [Vitamine și minerale](https://primesupplements.ro/collections/vitamine-si-minerale)
>
> **[ Alege-ți primul produs ]**
>
> De acum îți scriem doar când avem ceva util: duminică, ghidul săptămânii de pe blog, cel mult un email pe săptămână despre produse și mementourile legate de coșul și comenzile tale. Vrei și mai rar? Răspunde cu „MAI RAR”.
>
> Marius
>
> P.S. WELCOME5 e încă al tău: 5 % la toată comanda, o singură dată, fără dată de expirare.

*Citatele* sunt reale, de la cumpărători verificați Judge.me (lista în `email/reviews.md`). Am adăugat doar diacriticele și punctuația; „[…]” marchează o parte scurtată.

### 4.2 Abandon checkout (implicit în fluxul de coș; separat: 2 emailuri + 1 SMS, 3 zile)

- **Scop:** comanda cu cea mai mare intenție: omul a ajuns la checkout, și-a scris adresa și n-a plătit.
- **Cine:** doar contactele **abonate la email** (regula legală: emailul de checkout e marketing, iar cine n-a cumpărat nu intră la excepția „client existent”). Cei ~74 % care nu bifează abonarea nu primesc nimic.
- **Volumul real:** theMarketer identifică ~40 de contacte pe lună la pasul de checkout, indiferent de acord; cu 26–35 % abonați, rămân **~10–20 pe lună**. Cifra de ~96 de checkout-uri abandonate pe lună vine din Shopify, iar integrarea nu documentează că adresa scrisă în checkout ajunge în theMarketer.
- **Cum îl construiești:**
  - **C (implicit).** Un singur flux de coș, cu textele de la 4.3, care merg și pentru checkout. Pierdem SMS-ul și diferențierea, nu și recuperarea.
  - **A.** Doar dacă în „+ Create journey” > „Cart related” apare un șablon de checkout abandonat: îl folosești, iar în fluxul de coș (4.3) adaugi un filtru care îi scoate pe cei care au început checkout-ul.
  - **B.** Doar dacă editorul are un filtru pe **evenimentul** de checkout („Initiate checkout”), cu fereastră în ore sau zile: un flux „Abandon coș + checkout” din șablonul „Cart abandonment”, cu filtrul imediat după start („Da” → ramura de checkout de mai jos, „Nu” → ramura de coș, 4.3). **Nu folosi filtrul pe „Funnel”:** înseamnă „cel mai departe pas atins în ultimele 3 luni”, deci un client care a comandat în august și azi abandonează un checkout ar ajunge pe ramura de coș, iar cine a abandonat un checkout acum două luni și azi doar pune ceva în coș ar ajunge pe ramura de checkout.
  - Abia cu A sau B adaugi și SMS-ul. După 14 zile, Claude numără cu `get_entered_automation` câte intrări au venit din checkout.
- **Setări:** abandon după **60 de minute** („Start of automation”); Run flow „Multiple times”; „Enable frequency capping” = 7 zile; „Exclude contacts who have not exited this automation flow yet.” pornit; smart sending **oprit**.
- **Ieșire:** comandă, dezabonare. **Blocuri dinamice:** produsele din coș (blocul șablonului „Cart abandonment”, cu butonul care deschide coșul).
- **Cod:** fără reducere. WELCOME5 apare în E2 doar pe o sub-ramură pentru contactele cu 0 comenzi, dacă editorul are filtru pe numărul de comenzi; altfel rândul nu apare deloc. Nu oferim un cod nou la abandon: clienții învață să lase coșul ca să primească reduceri.

```text
Start (checkout început, fără comandă, 60 min)
→ Send email 1
→ Time delay 20 ore, until 19:00 → Filter: Buyer in the last 2 days → ies → Send email 2
→ Time delay 1 zi, until 11:00 → Filter: Buyer in the last 3 days → ies
   → Filter: a dat click pe emailul 1 sau 2 („Campaign activity” > „Automation activity” > „Clicked”, doar dacă opțiunea există; altfel SMS-ul pleacă doar pe condiția „nu a comandat”) → ies
   → Filter: abonat SMS, în segmentul „SMS · Acord dovedit” → altfel ies → Send sms 1
```

#### 4.2.1 Email 1 · Comanda a rămas la un pas (la 1 oră) · `flow-checkout-e1`

- **Subiect:** Comanda ta a rămas la un pas · **Alternativ:** Coșul tău e salvat. Continui de unde ai rămas?
- **Preheader:** Produsele tale sunt încă acolo. Dacă ceva n-a mers la plată, te ajutăm.
- **CTA:** Finalizează comanda → butonul blocului de coș

> Salut!
>
> Ai început o comandă, dar n-ai ajuns până la capăt. Am păstrat produsele, ca să continui de unde ai rămas:
>
> **[Blocul cu produsele din coș]**
>
> **[ Finalizează comanda ]**
>
> S-a întâmplat ceva la plată? Poți plăti și ramburs, la curier. Ai o întrebare despre aromă, gramaj sau doză? Răspunde la acest email sau scrie-ne pe WhatsApp la 0775 286 584 și te ajutăm să termini comanda.
>
> Echipa Prime Supplements

#### 4.2.2 Email 2 · Răspunsuri scurte (a doua zi, 19:00) · `flow-checkout-e2`

- **Subiect:** Livrare, plată, retur: răspunsuri scurte · **Alternativ:** Ai o întrebare înainte să comanzi?
- **Preheader:** Livrare în 1–3 zile lucrătoare, plată și la curier, răspuns în medie într-o oră.
- **CTA:** Mă întorc la comandă → butonul blocului de coș

> Salut!
>
> Produsele din coș sunt încă acolo. Dacă te-a oprit ceva, poate te ajută răspunsurile de mai jos.
>
> **„Cât costă livrarea?”** 20 de lei. La comenzile de peste 300 de lei e gratuită: o vezi în checkout, înainte să plătești.
>
> **„Când ajunge?”** Cargus livrează în 1–3 zile lucrătoare de la comandă.
>
> **„Pot plăti la livrare?”** Da, ramburs, la curier. Poți plăti și cu cardul sau prin transfer bancar.
>
> **„Dacă mă răzgândesc?”** Ca la orice cumpărătură online, ai 14 zile de la primirea coletului să te răzgândești. Suplimentele desigilate nu se mai pot returna, din motive de igienă. Transportul la retur îl plătești tu.
>
> **„Nu știu ce aromă sau ce gramaj să aleg.”** Scrie-ne. Răspundem în medie într-o oră, luni–vineri, 8:00–18:00.
>
> **[Blocul cu produsele din coș]**
>
> **[ Mă întorc la comandă ]**
>
> [Doar pe sub-ramura „0 comenzi”, dacă există:] Prima comandă la noi? Cu codul WELCOME5 ai 5 % la toată comanda. Îl scrii la „Cod de reducere”, în checkout.
>
> Acesta e ultimul email despre această comandă. Dacă ai decis să nu comanzi acum, e în regulă: rămânem aici pentru când ai nevoie.
>
> Echipa Prime Supplements

#### 4.2.3 SMS · a treia zi, 11:00, doar acord SMS dovedit, doar în varianta A sau B · `flow-checkout-sms`

- **Text (fără diacritice, ~130 de caractere fără linkuri):** `Prime Supplements: produsele tale sunt salvate in cos: [link cos] Ajutor pe WhatsApp: 0775286584. Dezabonare SMS: [link dezabonare]`
- **Alternativ (pentru test, după 2 luni):** `Prime Supplements: ai uitat produsele in cos. Le gasesti aici: [link cos] Raspundem pe WhatsApp: 0775286584. STOP SMS: [link]`
- **Setări:** linkul coșului îl ia blocul SMS din șablon; linkul de dezabonare îl adaugă theMarketer (verifici la „Send test SMS”); expeditor alfanumeric „PrimeSuppl” (de verificat ce permite contul); cost ~0,034 EUR pe SMS.

### 4.3 Abandon coș (2 emailuri, un singur flux)

- **Scop:** cine a pus produse în coș și a plecat fără să ajungă la checkout.
- **Ce reparăm:** păstrăm „Cart abandonment” ca singurul flux de coș; în varianta C (implicită) prinde și checkout-urile abandonate (§4.2). **Oprim în ziua 1** „Cart abandonment similar products”: e duplicat pe același declanșator. Recomandările de produse se mută în emailul 2. Fluxul refăcut pornește doar după verificarea trackingului și a politicii de confidențialitate (§10.1, pasul 8b).
- **Setări:** abandon după 60 de minute; Run flow „Multiple times”; capping 7 zile; „Exclude contacts who have not exited…” pornit; smart sending oprit. Fără urgență falsă: fraza „Ultima șansă” dispare, pentru că nu expiră nimic.
- **Ieșire:** comandă, checkout început (trece în ramura de checkout dacă e varianta A sau B), dezabonare.
- **Blocuri dinamice:** produsele din coș, fără preț vechi (§4.0); în E2, sub ele, blocul de recomandare **„Frequently Bought Together”** (sau „Others You May Like”, dacă primul nu e disponibil în automatizări), doar după excluderea celor 12 produse cu nume de efect (§4.0). Dacă builder-ul automatizărilor nu are blocuri de recomandare sau excluderea nu s-a aplicat, folosești 3 carduri statice: Prime Whey 2 kg, Creatină Creapure®, Creamy Rice tort de ciocolată.
- **Cod:** fără.

```text
Start (coș abandonat, 60 min) → [doar varianta A: Filter: a început checkout-ul → ies]
→ Send email 1
→ Time delay 20 ore, until 19:00 → Filter: Buyer in the last 2 days → ies → Send email 2
```

#### 4.3.1 Email 1 · Ce ai pus în coș e tot acolo (la 1 oră) · `flow-cart-e1`

- **Subiect:** Ce ai pus în coș e tot acolo · **Alternativ:** Ai nevoie de un sfat pentru coșul tău?
- **Preheader:** Produsele alese sunt salvate. Pentru aromă sau gramaj, răspunde-ne și te ajutăm.
- **CTA:** Vezi coșul → butonul blocului de coș

> Salut!
>
> Ai adăugat produse în coș, dar n-ai trecut încă la comandă. Iată ce ai ales:
>
> **[Blocul cu produsele din coș]**
>
> **[ Vezi coșul ]**
>
> Nu te-ai hotărât încă? Întreabă-ne orice: ce aromă să iei, ce gramaj ți se potrivește sau cum combini produsele. Răspunde la acest email sau scrie-ne pe WhatsApp la 0775 286 584 și îți explicăm pe înțeles.
>
> Echipa Prime Supplements

#### 4.3.2 Email 2 · Bine de știut, plus ce se potrivește (a doua zi, 19:00) · `flow-cart-e2`

- **Subiect:** Bine de știut înainte să comanzi · **Alternativ:** Poți plăti și ramburs, la livrare
- **Preheader:** Livrare gratuită peste 300 de lei, coletul în 1–3 zile lucrătoare, răspuns de la un om.
- **CTA:** Mergi la coș → butonul blocului de coș

> Salut!
>
> Revenim pe scurt la coșul tău:
>
> **[Blocul cu produsele din coș]**
>
> **[ Mergi la coș ]**
>
> Înainte să comanzi, iată ce e bine de știut:
>
> - **Livrare gratuită peste 300 de lei.** Sub această sumă, livrarea costă 20 de lei. Costul final îl vezi în checkout, înainte să plătești.
> - **Plătești cum preferi:** cu cardul, prin transfer bancar sau ramburs, la curier.
> - **Coletul ajunge în 1–3 zile lucrătoare.** Îl aduce Cargus, până la ușa ta.
> - **Vorbești cu un om.** Răspunde la acest email sau scrie-ne pe WhatsApp, la 0775 286 584. Luni–vineri, 8:00–18:00, îți răspundem în medie într-o oră.
>
> **Clienții care au ales aceste produse au mai luat:**
>
> **[Blocul „Frequently Bought Together”, 3 produse]**
>
> Nu e nicio grabă. Acesta e ultimul email despre coș: când ești gata, butonul de mai sus îți deschide coșul.
>
> Echipa Prime Supplements

### 4.4 Abandon navigare (1 email)

- **Scop:** cine s-a uitat la un produs și a plecat fără să-l pună în coș.
- **Ce reparăm la „Product follow-up”:** un singur email, nu două; pleacă a doua zi la 18:30, nu noaptea; nu pleacă la cumpărători; fără prenume în subiect; capping 14 zile; smart sending pornit.
- **Filtre:** „Buyer in the last 3 days” → ies; „Automation activity” > emailul 1 din fluxul de coș, în ultimele 2 zile → ies (îi preia fluxul de coș); dacă editorul permite, ies și cei adăugați în ultimele 11 zile (sunt în Welcome). **Dacă filtrul pe emailul de coș nu există, navigarea rămâne oprită în prima lună:** valorează ~0,5 comenzi pe lună și e cea mai mare sursă de emailuri în plus pentru abonații noi.
- **Pornire:** doar după verificarea trackingului și a politicii de confidențialitate (§10.1, pasul 8b). Emailul spune „te-ai uitat pe site la acest produs”, deci trackingul trebuie să aibă acord pentru cookie-uri, iar politica trebuie să descrie profilarea.
- **Blocuri dinamice:** produsul văzut (blocul șablonului), fără preț vechi (§4.0). **Cod:** WELCOME5 doar pe o sub-ramură „0 comenzi”, dacă filtrul există; altfel fără.

```text
Start (produs văzut, fără coș) → Time delay 1 zi, until 18:30
→ Filter: Buyer in the last 3 days → ies → Filter: a primit emailul 1 de coș în ultimele 2 zile → ies → [Filter: adăugat în ultimele 11 zile → ies]
→ Send email 1
```

#### 4.4.1 Email 1 · Te ajutăm să alegi? (a doua zi, 18:30) · `flow-browse-e1`

- **Subiect:** Te ajutăm să alegi? · **Alternativ:** Patru lucruri de verificat înainte să alegi
- **Preheader:** Porția, câte zile îți ajunge, modul de folosire și aroma. Plus o recomandare de la noi.
- **CTA:** Vezi din nou produsul → linkul blocului de produs

> Salut!
>
> Ieri te-ai uitat pe site la acest produs:
>
> **[Blocul cu produsul văzut]**
>
> **[ Vezi din nou produsul ]**
>
> Dacă nu te-ai hotărât încă, e normal. Un produs pe care îl iei zi de zi merită ales cu atenție. Uite ce verifici pe pagina lui:
>
> 1. **Ce conține o porție.** Pe pagină găsești cantitățile pe porție și ingredientele.
> 2. **Câte zile îți ajunge.** Împarte numărul de porții la câte porții iei pe zi.
> 3. **Cum se folosește.** Modul de folosire și doza zilnică recomandată sunt pe pagină și pe etichetă. Doza nu o depășești.
> 4. **Aroma.** Dacă produsul are mai multe arome, citește în recenzii ce spun alți clienți despre gust.
>
> Ai o afecțiune, ești însărcinată, alăptezi sau iei medicamente? Discută cu medicul înainte să începi un supliment nou.
>
> **Nu știi dacă ți se potrivește?** Răspunde la acest email cu obiectivul tău și îți recomandăm noi. Ne găsești și pe WhatsApp, la 0775 286 584.
>
> Două ghiduri care te ajută: [Câtă proteină pe zi](https://primesupplements.ro/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv) · [Cum alegi crema de orez](https://primesupplements.ro/blogs/news/cum-alegi-crema-de-orez)
>
> [Doar pe sub-ramura „0 comenzi”, dacă există:] P.S. Prima comandă la noi? Cu WELCOME5 ai 5 % la toată comanda, o singură dată.
>
> Spor la antrenament, Marius Chera, fondator Prime Supplements

### 4.5 Client nou (3 emailuri, 12 zile; în luna a 2-a)

- **Scop:** să știe ce urmează cu coletul, să folosească produsul corect și să facă a doua comandă (la un magazin de consumabile, a doua comandă decide dacă omul rămâne client).
- **Declanșator:** Post Purchase, „Start of automation” cu statusul comenzii **„fulfilled”** (magazinul nu trimite „Delivered”; „fulfilled” exclude și comenzile anulate). Numele fluxului: „Client nou 2026”.
- **Filtre:** **doar prima comandă**, cu filtrul pus **după prima pauză** (nu imediat după start), ca segmentul să fi apucat să vadă comanda: segmentul de sistem **„Shopping - First time buyers”**, dacă filtrul acceptă segmente (există deja, nu așteaptă evaluarea unui segment nou), altfel filtrul pe numărul de comenzi = 1. **Dacă nu există niciun astfel de filtru**, fluxul 4.5 și fluxul 4.6 se contopesc într-unul singur „După comandă” cu emailurile 1, 2 și 3 de mai jos (subiectul E1 devine „Mulțumesc pentru comandă”).
- **De ce în luna a 2-a și doar 3 emailuri:** varianta cu cascada pe 7 + 5 categorii costa ~5–6 ore pentru ~0,3 comenzi pe lună. Emailul 2 și emailul 3 au câte o singură variantă; cascada pe categorii revine în discuție după 3 luni, dacă emailul 2 are click-uri. Emailul 4 nu se face: filtrul pe produsul cumpărat nu e documentat, iar reaprovizionarea pe 31 de produse face aceeași treabă (§4.5.4 rămâne ca rezervă).
- **Ieșire:** a doua comandă (înaintea emailului 3), dezabonare.
- **Setări:** Run flow „Only once”; smart sending oprit; „Include imported contacts” oprit.
- **Cod:** fără. **Fără cerere de recenzie** (o trimite Judge.me, §4.8).

```text
Start (comandă fulfilled)
→ Time delay until 10:00 (a doua zi dacă e după 10:00) → Filter: Shopping - First time buyers (altfel ies) → Send email 1 (mulțumire, ce urmează)
→ Time delay 3 zile, until 18:30 → Send email 2 (cum folosești; o singură variantă)
→ Time delay 8 zile, until 18:30 → Filter: Buyer in the last 10 days → ies → Send email 3 (ce se potrivește)
```

#### 4.5.1 Email 1 · Mulțumire și ce urmează (după expediere, 10:00) · `flow-client-nou-e1`

- **Subiect:** Mulțumesc pentru prima comandă · **Alternativ:** Ce urmează după prima ta comandă
- **Preheader:** Când ajunge coletul, cum îl urmărești și cui scrii dacă ai o întrebare.
- **CTA:** Scrie-ne pe WhatsApp → `https://wa.me/40775286584`
- **Blocuri dinamice:** produsele din comandă, fără prețuri (dacă șablonul Post Purchase are blocul; altfel lipsește rândul „Ce ai comandat”).

> Salut!
>
> Sunt Marius Chera, fondatorul Prime Supplements. Îți mulțumesc pentru prima comandă! Îți scriu pe scurt ce urmează, ca să știi exact la ce să te aștepți.
>
> **Ce ai comandat:** [blocul cu produsele din comandă]
>
> **Ce urmează:**
>
> 1. **Coletul a plecat sau pleacă azi spre tine.** Cargus îl aduce în 1–3 zile lucrătoare. Weekendul și sărbătorile legale nu se pun la socoteală.
> 2. **Linkul de urmărire** vine pe email separat, de la noi. Nu-l găsești? Uită-te și în Spam sau Promoții.
> 3. **Ține telefonul pornit în ziua livrării**, ca să te poată contacta curierul.
> 4. **Ai ales plata ramburs?** Pregătește suma din emailul de confirmare a comenzii.
>
> **Ai o întrebare despre comandă?** Răspunde la acest email sau scrie-ne pe WhatsApp, la 0775 286 584. Luni–vineri, 8:00–18:00, răspundem în medie într-o oră. Spune-ne și numărul comenzii, ca să te ajutăm mai repede.
>
> **[ Scrie-ne pe WhatsApp ]**
>
> Peste câteva zile, când coletul ar trebui să fi ajuns, îți trimit un email scurt despre cum folosești ce ai comandat.
>
> Te poți opune oricând emailurilor de marketing: apeși „Dezabonare” la finalul oricărui email. Emailurile despre comenzi și livrare le primești în continuare.
>
> Spor la antrenament, Marius Chera, fondator Prime Supplements

#### 4.5.2 Email 2 · Cum folosești ce ai comandat (ziua 3–4, 18:30) · `flow-client-nou-e2`

- **Subiect:** Cum folosești ce ai comandat · **Alternativ:** Ți-a ajuns coletul? Uite cum începi
- **Preheader:** Doza de pe etichetă, cum îl prepari și cum îl păstrezi, pe scurt.
- **CTA:** Trimite-ne o întrebare → `mailto:contact@primesupplements.ro`
- **O singură variantă:** un singur email 2, cu toate blocurile de mai jos, fiecare cu titlul „Dacă ai luat …” (de exemplu „Dacă ai luat proteină”). Cascada de **Filter** pe categoria cumpărată (Proteine, Creatină, Cremă de orez, Vitamine și minerale / Prime Health, Aminoacizi, Pre-workout, altfel General), cu câte un „Send email” pe ramură, revine în discuție după 3 luni, doar dacă emailul 2 are click-uri și editorul are filtrul pe categorie.

**Corpul comun:**

> Salut!
>
> Dacă totul a mers bine, coletul tău a ajuns. Dacă nu a ajuns sau ceva nu e în regulă cu el, răspunde la acest email și rezolvăm.
>
> Acum, partea importantă: cum folosești ce ai comandat. Întâi, câteva reguli valabile pentru orice supliment:
>
> - **Citește eticheta înainte de prima folosire.** Acolo găsești porția, modul de preparare și doza zilnică recomandată.
> - **Nu depăși doza zilnică recomandată.** Mai mult nu înseamnă mai bine.
> - **Păstrează produsele la loc uscat și răcoros**, cu ambalajul bine închis și departe de îndemâna copiilor.
> - **Ai o afecțiune, ești însărcinată, alăptezi sau iei medicamente?** Discută cu medicul înainte să începi.
>
> **[BLOCUL PE CATEGORIE, de mai jos]**
>
> Nu știi sigur când iei un produs sau cum îl combini cu ce folosești deja? Scrie-ne numele produsului și obiectivul tău, iar noi îți explicăm pe înțeles.
>
> **[ Trimite-ne o întrebare ]**
>
> Peste o săptămână îți scriu ce se potrivește cu produsele tale.
>
> Marius

**Blocurile pe categorie (doza și modul de folosire, după etichete și paginile de produs):**

- **Proteine (Prime Whey, Pure Isolate, Prime Whey Go):**
  > **Proteina ta.** O porție de Prime Whey are aproximativ 30 g (66 de porții la 2 kg, 33 la 1 kg), iar una de Pure Isolate are 27 g (74 de porții la 2 kg). Pe etichetă găsești cu cât lichid o amesteci. Modul de administrare pentru Prime Whey: o porție de aproximativ 30 g, cu apă sau lapte, după antrenament sau ca gustare între mese. Pure Isolate: după antrenament sau pe parcursul zilei. Proteinele contribuie la creșterea masei musculare și la menținerea masei musculare. Contează însă câte proteine mănânci în total pe zi, din toate sursele: [Câtă proteină pe zi: calcul pe greutate și obiectiv →](https://primesupplements.ro/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv)
- **Creatină (Creapure®, creatină monohidrat 300 g, Ready To Go):**
  > **Creatina ta.** O iei zilnic, și în zilele fără antrenament, după doza de pe etichetă. La Creapure® doza e de 3–5 g pe zi (o porție are 5 g: 60 de porții la 300 g, 100 la 500 g). La creatina monohidrat de 300 g urmezi schema de pe etichetă (½ măsură = 5 g). Plicurile Ready To Go: un plic pe zi, cu 30–60 de minute înainte de antrenament; după 8 săptămâni, eticheta recomandă o pauză de 2–3 săptămâni. Creatina crește performanța fizică în eforturi succesive din timpul exercițiilor fizice de scurtă durată și de mare intensitate. Efectul benefic se obține în condițiile unui consum zilnic de 3 g de creatină. Produsul se adresează adulților care efectuează exerciții fizice de mare intensitate. Bea suficientă apă pe parcursul zilei.
- **Cremă de orez (Creamy Rice):**
  > **Crema ta de orez.** O porție are 45 g (o măsură), iar 1 kg are 22 de porții. O amesteci cu 150–200 ml de apă sau lapte rece până devine cremoasă: nu trebuie fiartă. O poți mânca așa, o poți pune într-un shake proteic sau poți amesteca o porție de proteină în ea. O porție are 32–35 g de carbohidrați, după aromă, și o poți mânca înainte de antrenament sau la micul dejun. [Cum alegi crema de orez →](https://primesupplements.ro/blogs/news/cum-alegi-crema-de-orez)
- **Vitamine și minerale (Prime Health):**
  > **Vitaminele și mineralele tale.** Fiecare are doza ei pe etichetă. Câteva exemple din gama noastră: **Magneziu bisglicinat** – 3 capsule pe zi (un flacon de 80 ajunge ~26 de zile); nu depăși 3 capsule pe zi. **Vitamina C 1000** – o capsulă pe zi. **Vitamina D3 + K2** – o capsulă **o dată la 2 zile**, nu zilnic; conține soia. Modul de administrare îl găsești pe eticheta fiecăruia.
- **Aminoacizi (EAA):**
  > **EAA.** O porție are 6 g (83 de porții la 500 g) și se ia de 1–3 ori pe zi, amestecată cu apă, de exemplu în timpul antrenamentului.
- **Pre-workout (de exemplu Combat Pro):**
  > **Pre-workout-ul tău.** O porție pe zi, cu 20–30 de minute înainte de antrenament, după eticheta produsului. Combat Pro conține 300 mg de cafeină pe porție: nu-l lua seara, nu-l combina cu cafea sau cu alte produse cu cafeină și nu depăși o porție pe zi. Nu se recomandă persoanelor sub 18 ani, femeilor însărcinate sau care alăptează și persoanelor sensibile la cafeină.
- **General (orice alt produs, inclusiv extractele din plante):**
  > **Produsele tale.** Pe eticheta fiecărui produs găsești porția, modul de folosire și doza zilnică recomandată. Extractele din plante (de exemplu turmericul, silimarina sau bergamota) au fiecare doza și modul de administrare pe etichetă; urmezi eticheta produsului tău și, dacă iei medicamente, întrebi medicul înainte.

*De verificat înainte de pornire:* timpul de 20–30 de minute la pre-workout și doza de pe eticheta Pure Isolate le confirmi pe eticheta fizică. **Mențiunea pentru magneziu nu apare azi:** condiția de doză e îndeplinită (3 capsule pe zi, ~64 % din valoarea de referință), dar eticheta tipărește o formulare neautorizată, nu „reducerea oboselii și extenuării”, iar comunicările comerciale pot folosi doar informațiile de pe etichetă (Legea 56/2021 art. 7(5)). Doar după ce eticheta tipărește formularea autorizată adaugi, după doza de magneziu, ca propoziție separată: „Magneziul contribuie la reducerea oboselii și extenuării. Efectul se referă la doza zilnică de 3 capsule.”

#### 4.5.3 Email 3 · Ce se potrivește cu ce ai comandat (ziua 12, 18:30) · `flow-client-nou-e3`

- **Subiect:** Ce se potrivește cu ce ai comandat · **Alternativ:** Proteină, creatină, cremă de orez: cum le combini
- **Preheader:** Combinații simple pentru rutina ta, din produsele pe care le iei deja.
- **CTA:** Vezi toate suplimentele → `https://primesupplements.ro/collections/suplimente-sala`
- **Blocuri dinamice:** **o singură variantă:** blocul **„Frequently Bought Together”** (3 produse), dacă există în automatizări și după excluderea celor 12 produse cu nume de efect (§4.0); altfel blocul „General” de mai jos. Celelalte blocuri pe categorie rămân pentru cascada de mai târziu (§4.5.2).
- **Cod:** fără.

> Salut!
>
> Au trecut câteva zile de când ai primit produsele Prime. Azi îți arăt, pe scurt, ce se potrivește cu ce ai comandat și cum le pui împreună în rutina de zi cu zi.
>
> **[BLOCUL PE CATEGORIE sau „Frequently Bought Together”]**
>
> **Pentru zi cu zi: Prime Health.** Dacă vrei să-ți completezi alimentația cu vitamine și minerale, le găsești în gama Prime Health. Înainte să alegi, uită-te la ce mănânci deja. [Vezi gama Prime Health →](https://primesupplements.ro/collections/prime-health)
>
> **[ Vezi toate suplimentele ]**
>
> **Ai întrebări?** Despre doze, despre cum combini produsele sau despre ce să alegi mai departe: apasă „Răspunde” și scrie-ne.
>
> Marius

**Blocurile pe categorie:**

- **A luat proteină:** „**Creatină Creapure®:** un singur ingredient, creatină monohidrat micronizată, la 300 g sau 500 g. Sfatul meu: pune porția zilnică de creatină în shake-ul de proteină, ca să n-o uiți. [Vezi creatina →](https://primesupplements.ro/products/creatina-creapure) · **Creamy Rice:** amestecă o porție de proteină în crema de orez gata preparată și ai într-un singur bol și carbohidrați, și proteine. [Vezi crema de orez →](https://primesupplements.ro/collections/crema-de-orez)”
- **A luat creatină:** „**Prime Whey:** pudră proteică pe bază de concentrat din zer, cu aproximativ 24 g de proteine la porția de 30 g, în 7 arome, la 2 kg sau 1 kg. Pune creatina în shake-ul de proteină și le iei pe amândouă dintr-o dată. [Vezi pudrele proteice →](https://primesupplements.ro/collections/pudra-proteica) · **Creamy Rice:** o masă rapidă înainte de antrenament, gata fără fierbere. [Vezi crema de orez →](https://primesupplements.ro/collections/crema-de-orez)”
- **A luat cremă de orez:** „**Prime Whey sau Pure Isolate:** amestecă o porție în crema de orez și ai un bol cu carbohidrați și proteine. [Vezi pudrele proteice →](https://primesupplements.ro/collections/pudra-proteica) · **Altă aromă de Creamy Rice:** ai 7 variante, de la caramel sărat la brioșă cu afine. [Vezi toate aromele →](https://primesupplements.ro/collections/crema-de-orez)”
- **A luat vitamine sau minerale:** „Cei care iau magneziu bisglicinat aleg des și Vitamina C 1000 sau Vitamina D3 + K2 (cea din urmă o dată la 2 zile). Fiecare are doza ei pe etichetă; nu le dubla. [Vezi vitaminele și mineralele →](https://primesupplements.ro/collections/vitamine-si-minerale)” (D3 + K2 doar cât e în stoc.)
- **General:** „**Trei produse de bază pentru sală:** proteina (Prime Whey sau Pure Isolate) acoperă proteinele care îți lipsesc din mâncare; creatina Creapure® se ia zilnic și o poți pune în shake; crema de orez e o masă rapidă înainte de antrenament. [Vezi cele mai vândute →](https://primesupplements.ro/collections/suplimente-sala?sort_by=best-selling)”

#### 4.5.4 Email 4 · Pregătim a doua comandă (rezervă, implicit nu se face) · `flow-client-nou-e4`

- **Când îl faci:** doar dacă editorul are filtru pe produsul cumpărat (ca să-i scoți pe cei care primesc în curând reaprovizionarea: cremă de orez, Prime Whey 1 kg, magneziu bisglicinat, Potassium Complex, Combat Pro, Emperor Mass) și doar după 3 luni de date. Se pune la ziua 25, 18:30, cu Filter „Buyer in the last 20 days” → ies.

- **Subiect:** Cum stai cu rezervele? · **Alternativ:** Pregătim a doua comandă?
- **Preheader:** Ce ai comandat data trecută, produse comandate des și livrare gratuită peste 300 de lei.
- **CTA:** Comandă din nou → `https://primesupplements.ro/collections/suplimente-sala?sort_by=best-selling`
- **Blocuri dinamice:** produsele din comandă (dacă există blocul) și 4 carduri statice (Prime Whey 2 kg, Pure Isolate 2 kg, Creatină Creapure®, Creamy Rice tort de ciocolată).
- **Cod:** fără. **Decizie proprietar:** un cod pentru a doua comandă (implicit: nu). Dacă îl aprobi, îl creezi în Shopify cu dată reală de final și îl scrii exact, cu condițiile lui; prețul de referință e cel mai mic preț din ultimele 30 de zile.

> Salut!
>
> Au trecut trei săptămâni de la prima ta comandă. Dacă folosești produsele zilnic, uită-te cât ți-a mai rămas. Ca să nu rămâi fără ele, comandă cu câteva zile înainte să se termine: Cargus livrează în 1–3 zile lucrătoare.
>
> **Ce ai comandat data trecută:** [blocul cu produsele din comandă]
>
> **Ce aleg cel mai des clienții noștri:**
>
> **[Carduri: Prime Whey 2 kg · Pure Isolate 2 kg · Creatină Creapure® · Creamy Rice]**
>
> **[ Comandă din nou ]**
>
> **Bine de știut:** livrarea e gratuită la comenzile de peste 300 de lei, altfel costă 20 de lei. Plătești cu cardul, prin transfer bancar sau ramburs.
>
> **Nu știi ce să adaugi?** Răspunde cu obiectivul tău și cu ce folosești acum, iar noi îți recomandăm ce ți se potrivește.
>
> Mulțumim că ești în echipa Prime.
>
> Spor la antrenament, Marius

### 4.6 Client existent (cross-sell pe categorie, 1 email)

- **Scop:** înlocuiește „Cross sell”, care trimitea la fiecare comandă două emailuri („Iti place noua ta achizitie?” și „Credem ca te-ar incanta aceste articole”, același subiect ca alt flux) și n-a adus nicio comandă după click.
- **Declanșator:** Post Purchase, comandă „fulfilled”; **Filter**, după prima pauză: a 2-a comandă sau mai mult (segmentul de sistem **„Shopping - Repeat buyers”**, dacă filtrul acceptă segmente; altfel filtrul pe numărul de comenzi > 1). **Pornește în săptămâna 1**, în același minut în care oprești „Cross sell”. Dacă nu există niciun filtru pe comenzi sau pe segment, nu-l construiești acum: oprești totuși „Cross sell”, iar în luna 2 faci fluxul unic „După comandă” (§4.5).
- **Setări:** Run flow „Multiple times”; capping **30 de zile** (cel mult un email de acest fel pe lună); smart sending pornit.
- **Ieșire:** o nouă comandă în cele 14 zile.
- **Blocuri dinamice:** „Frequently Bought Together” (3 produse); dacă nu există în automatizări, „Others You May Like”; dacă nici acesta, 3 carduri statice. Blocurile de recomandare doar după excluderea celor 12 produse cu nume de efect; fără preț vechi (§4.0).

```text
Start (comandă fulfilled) → Time delay 14 zile, until 18:30
→ Filter: Shopping - Repeat buyers (sau comenzi > 1; altfel ies) → Filter: Buyer in the last 13 days → ies → Send email 1
```

#### 4.6.1 Email 1 · O idee pentru următoarea comandă (ziua 14, 18:30) · `flow-client-existent-e1`

- **Subiect:** Ce se potrivește cu ce ai comandat · **Alternativ:** O idee pentru următoarea comandă
- **Preheader:** Ce aleg alți clienți împreună cu produsele tale. Livrare gratuită peste 300 de lei.
- **CTA:** Vezi recomandările → linkul primului produs din bloc (sau `https://primesupplements.ro/collections/suplimente-sala?sort_by=best-selling`)
- **Cod:** fără.

> Salut!
>
> Mulțumim că ai comandat din nou de la noi. Ne-am uitat ce aleg alți clienți împreună cu produsele tale:
>
> **[Blocul „Frequently Bought Together”, 3 produse]**
>
> **[ Vezi recomandările ]**
>
> Un sfat practic: dacă pui în aceeași comandă produsele pe care le iei zilnic, ajungi mai ușor la 300 de lei și livrarea e gratuită.
>
> Ai o întrebare despre doze sau combinații? Răspunde la acest email.
>
> Spor la antrenament, Marius Chera, fondator Prime Supplements

### 4.7 Reaprovizionare pe produs (1 email pe produs)

- **Scop:** emailul care aduce cele mai multe comenzi „curate”: omul primește un memento când i se termină produsul, după doza minimă de pe etichetă.
- **Ce reparăm:** fluxul vechi trimitea la 0–2 minute după comandă, pentru că intervalul produselor era 0. **Azi am setat intervalul la 31 de produse** (tabelul complet în `audit_catalog.md` §6), de exemplu: Prime Whey 2 kg 60 de zile, 1 kg 30; Pure Isolate 65; Creapure® 90; creatină 300 g 55; Creamy Rice (toate aromele) 20; EAA 75; magneziu bisglicinat 24; Vitamina C 1000 70; D3 + K2 145; Combat Pro 20. Produsele fără interval (haine, accesorii, produsele vechi, cele cu nume de efect, zinc, citrat de magneziu) nu primesc nimic.
- **Template:** Post Purchase > **„Remind customers to reorder”**, flux nou „Reaprovizionare 2026”; vechiul (`6862b6757163af43b901e1ed`) se oprește azi.
- **Setări „Start of automation”:** Order status **„fulfilled”**; Run flow **„Multiple times”**; **„Enable frequency capping”** **oprit** (capping-ul blochează **intrarea** în flux, nu amână emailul: cine comandă de două ori în 14 zile, des la suplimente, n-ar mai primi niciun memento pentru produsele din a doua comandă); **„Exclude contacts who have not exited this automation flow yet.”** **oprit** (altfel nu mai pleacă nicio reamintire până nu e recumpărat produsul cel mai vechi); **„Enable smart sending”** **pornit** (oprește două mementouri în aceeași zi pentru două produse cu același interval, de exemplu două arome Creamy Rice).
- **„Time delay”:** **„Delay by product recurrence”** pornit, plus **„Delay until a specific day(s) of the week”** = marți, vineri și sâmbătă, la **10:00**. Așa mementoul cade la peste 24 de ore după newsletterul de duminică (18:00) și după campania de miercuri (19:30), iar smart sending nu-l blochează din cauza lor.
- **Testul înainte de pornire:** o comandă internă cu 2 produse cu intervale diferite; a doua zi Claude citește `get_entered_automation` (o intrare sau două?) și jurnalul de livrare al contactului de test.
- **Pornire:** în **săptămâna 1**. Orice comandă livrată înainte de pornirea fluxului nu va primi niciodată memento.
- **Filtru:** „Buyer in the last 14 days” → ies (cine a comandat de curând și-a făcut deja rezerva).
- **Al doilea email:** nu. Un singur memento pe produs.
- **Blocuri dinamice:** produsul de reaprovizionat (blocul șablonului) și, dedesubt, „Frequently Bought Together” (dacă există și după excluderea celor 12 produse cu nume de efect). Fără preț vechi (§4.0). Combat Pro (300 mg de cafeină pe porție) are interval, deci subsolul fluxului are rândul pentru cafeină (§4.0).
- **Cod:** fără. WELCOME5 nu se aplică (toți au deja o comandă).

```text
Start (comandă fulfilled) → Time delay: Delay by product recurrence (until marți, vineri sau sâmbătă, 10:00)
→ Filter: Buyer in the last 14 days → ies → Send email 1
```

#### 4.7.1 Email 1 · Îți mai ajunge ce ai comandat? · `flow-reorder-e1`

- **Subiect:** Îți mai ajunge ce ai comandat? · **Alternativ:** Cum stai cu rezervele?
- **Preheader:** Dacă îl iei zilnic, după doza de pe etichetă, probabil se apropie de final.
- **CTA:** Comandă din nou → linkul produsului din bloc

> Salut!
>
> Produsul de mai jos l-ai comandat acum câteva săptămâni. Dacă îl iei zilnic, după doza de pe etichetă, probabil se apropie de final:
>
> **[Blocul cu produsul de reaprovizionat]**
>
> **[ Comandă din nou ]**
>
> Ca să nu rămâi fără, comandă cu câteva zile înainte să se termine: Cargus livrează în 1–3 zile lucrătoare. Dacă îl iei mai rar sau ai făcut pauze, probabil mai ai destul, iar acest email poate să aștepte.
>
> **Livrare gratuită peste 300 de lei.** Dacă pui în aceeași comandă și alt produs pe care îl folosești, ajungi mai ușor la prag:
>
> **[Blocul „Frequently Bought Together”, 3 produse]**
>
> **Vrei să schimbi ceva?** Altă aromă, alt gramaj sau o recomandare pentru obiectivul tău de acum: răspunde la acest email sau scrie-ne pe WhatsApp, la 0775 286 584.
>
> Spor la antrenament, Marius Chera, fondator Prime Supplements

**De reținut:** theMarketer probabil nu ține cont de numărul de bucăți (2 × Prime Whey 1 kg primesc memento tot la 30 de zile), iar la Creapure® intervalul e cel al variantei de 500 g. De aceea textul spune „probabil” și „dacă îl iei zilnic”, nu „ți s-a terminat”. **Decizie proprietar** (rămasă din auditul catalogului): intervalele pentru Omega-3, Ashwagandha, L-carnitină și taurină, după ce confirmi câte capsule pe zi scrie pe etichetă; zinc și citrat de magneziu rămân fără memento din cauza notei de siguranță.

### 4.8 Cererea de recenzie (Judge.me, nimic în theMarketer)

- **Recenziile rămân pe Judge.me** (432 de recenzii, media 4,87). Modulul de recenzii theMarketer rămâne neactivat (0 recenzii), ca omul să nu primească două cereri.
- **În Judge.me** (Shopify Admin > Apps > Judge.me > Settings > Review request) verifici: o singură cerere, la 10–14 zile după expediere, plus cel mult un memento; textul fără promisiuni de efect.
- **În theMarketer** niciun flux nu cere recenzie. „Product follow-up” nu e o cerere de recenzie: e abandonul de navigare (§4.4).
- Recenziile reale le folosim manual, citate exact, în Welcome E4 și în campanii.

### 4.9 Recâștigare cumpărători (75 și 120 de zile fără comandă)

- **Scop:** clientul care n-a mai comandat; înlocuiește „Inactivity behavior” (2 emailuri la 30 de zile fără **vizită**, trimise la 03:26, cu „S-a intamplat ceva, {prenume}?”).
- **Declanșator:** Post Purchase, comandă „fulfilled”, flux nou „Recâștigare 2026”. Fiecare comandă pornește propria numărătoare, iar numărătorile vechi se opresc la filtru când omul comandă din nou.
- **Setări:** Run flow „Multiple times”; **fără** frequency capping (altfel ultima comandă n-ar mai porni numărătoarea); „Exclude contacts who have not exited…” **oprit**; smart sending **pornit**; ambele emailuri la **18:30**, ca mementoul de reaprovizionare de la 10:00 să le blocheze în aceeași zi (theMarketer nu are prioritate între fluxuri, §3.2).
- **De ce 2 emailuri, nu 3:** emailul „Refă-ți rezervele” de la 90 de zile repeta mementoul de reaprovizionare (un client cu Prime Whey 2 kg primea în aceeași zi și reaprovizionarea, și recâștigarea). Au rămas întrebarea de la 75 de zile și cea de la 120.
- **Clienții care au comandat înainte de pornirea fluxului:** îi prinde **campania „Recâștigare · restanțe”** (§5), trimisă pe segmentul „R · În risc (60–120 zile)”, cu textul emailului 1.
- **Cod:** fără în emailul 1. În emailul 2, rândul cu cod e **decizie proprietar** (implicit oprit). Un cod aprobat și trimis întregului segment e „disponibil multor clienți”, deci prețul de referință e cel mai mic preț din ultimele 30 de zile, ca la §4.5.4.

```text
Start (comandă fulfilled)
→ Time delay 75 zile, until 18:30 → Filter: Buyer in the last 74 days → ies → Send email 1
→ Time delay 45 zile, until 18:30 → Filter: Buyer in the last 119 days → ies → Send email 2
```

Filtrul e întârzierea minus o zi: iese oricine a comandat după comanda care a pornit numărătoarea, inclusiv în primele zile după ea (altfel cine comandă de două ori la câteva zile distanță ar primi două emailuri de recâștigare).

#### 4.9.1 Email 1 · Ce mai faci și ce e nou (ziua 75, 18:30) · `flow-winback-e1`

- **Subiect:** Cum merge antrenamentul? · **Alternativ:** Ce e nou la Prime de la ultima ta comandă
- **Preheader:** Ghiduri noi pe blog, ce aleg acum clienții și o recomandare pentru tine, dacă ne răspunzi.
- **CTA:** Vezi cele mai vândute → `https://primesupplements.ro/collections/suplimente-sala?sort_by=best-selling`
- **Blocuri dinamice:** 4 carduri statice (Prime Whey 2 kg, Pure Isolate 2 kg, Creatină Creapure®, Creamy Rice). Ghidurile le schimbi o dată la 1–2 luni.

> Salut!
>
> Sunt Marius Chera, fondatorul Prime Supplements. A trecut ceva vreme de la ultima ta comandă și voiam să te întreb simplu: cum merge antrenamentul? Cum ți s-au părut produsele?
>
> Iată, pe scurt, ce găsești acum la noi.
>
> **Ghiduri noi pe blog, în fiecare zi.** Două dintre ele:
>
> - [Câtă proteină pe zi: calcul pe greutate și obiectiv →](https://primesupplements.ro/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv)
> - [Cum alegi crema de orez →](https://primesupplements.ro/blogs/news/cum-alegi-crema-de-orez)
>
> **Ce aleg cel mai des clienții noștri:**
>
> **[Carduri: Prime Whey 2 kg · Pure Isolate 2 kg · Creatină Creapure® · Creamy Rice]**
>
> **[ Vezi cele mai vândute ]**
>
> **Vrei o recomandare pentru tine?** Răspunde la acest email cu obiectivul tău de acum și cu ce suplimente ai folosit până acum. Îți recomandăm noi ce ți se potrivește.
>
> Spor la antrenament, Marius Chera, fondator Prime Supplements

#### 4.9.2 Email 2 · O întrebare și o recomandare (ziua 120, 18:30) · `flow-winback-e2`

- **Subiect:** Te mai interesează suplimentele Prime? · **Alternativ:** O întrebare scurtă de la Marius
- **Preheader:** Spune-ne ce te-ar ajuta acum sau alege să primești doar ghidul de duminică.
- **CTA:** Vezi ce e nou → `https://primesupplements.ro/collections/suplimente-sala?sort_by=created-descending`

> Salut!
>
> Au trecut patru luni de la ultima ta comandă și nu vreau să-ți aglomerez inboxul. Așa că te întreb direct: ce te-ar ajuta acum?
>
> - **Vrei o recomandare pe obiectivul tău?** Răspunde la acest email cu ce urmărești acum și îți scriem noi.
> - **Vrei mai puține emailuri?** Răspunde cu „MAI RAR” și primești doar ghidul de duminică și mementourile legate de coș și comenzi.
> - **Nu mai vrei emailuri de la noi?** Linkul de dezabonare e la finalul acestui email.
>
> Dacă vrei să vezi ce s-a schimbat pe site, butonul de mai jos te duce la produsele noi.
>
> **[ Vezi ce e nou ]**
>
> [Opțional, doar dacă proprietarul aprobă un cod creat în Shopify:] Pentru că ai mai comandat de la noi, ai codul [COD]: [X] % la [toată comanda], o singură utilizare, valabil până pe [DATA], ora 23:59. După această dată nu mai funcționează.
>
> Acesta e ultimul email din această serie.
>
> Marius

### 4.10 Sunset (corectat: întâi întrebăm, apoi suprimăm, nu dezabonăm)

- **Ce era:** nu există un flux de sunset activ. „Inactivity behavior” (30 de zile fără vizită) e un win-back și îl oprim. Pierderea mare de abonați a fost curățarea manuală din 10.07.
- **Cum funcționează noul sunset:** campanie lunară, nu automatizare (theMarketer nu documentează un declanșator „fără click de X zile”).
  1. **Prima marți din lună, 19:00:** campania „Mai vrei să primești emailurile noastre?” către segmentul **„E · Candidați sunset”** (cel puțin 5 campanii primite în 90 de zile și niciun click în 180 de zile, fără comandă în 180 de zile, fără activitate pe site 90 de zile), excluzând tagul `email-inactiv`. UTM `sunset-AAAA-LL`. În săptămâna sunsetului, campania segmentată exclude „E · Candidați sunset” (P4).
  2. **După 14 zile:** Claude citește prin API cine a primit campania și n-a dat click și le pune tagul **`email-inactiv`** (citește tagurile existente și adaugă tagul, fără să le șteargă pe celelalte).
  3. Segmentul **„X · Sunset suprimați”** (tag `email-inactiv`) e exclus din **toate campaniile**. Fluxurile de comandă, coș și checkout rămân, pentru că pornesc doar dacă omul revine pe site.
  4. **Revenirea:** lunar, cine are `email-inactiv` și a dat click sau a comandat în ultimele 30 de zile pierde tagul.
- **Prima rulare:** marți, 10.11.2026 (după ce s-au stabilizat fluxurile și reactivarea).

#### 4.10.1 Campania „Mai vrei să primești emailurile noastre?” · `sunset-AAAA-LL`

- **Subiect:** Mai vrei să primești emailurile noastre? · **Alternativ:** Rămânem în legătură?
- **Preheader:** Un click și rămâi pe listă. Dacă nu mai vrei, te dezabonezi la fel de simplu.
- **CTA:** Da, vreau în continuare → `https://primesupplements.ro/blogs/news` (orice click pe orice link înseamnă „da”)
- **Blocuri dinamice:** niciunul. **Cod:** niciunul.

> Salut!
>
> De câteva luni n-ai mai apăsat pe niciun link din emailurile noastre. E în regulă: poate primești prea multe emailuri sau poate acum nu te interesează suplimentele.
>
> Nu vrem să-ți aglomerăm inboxul, așa că te întreb direct: mai vrei să primești emailurile noastre?
>
> **Dacă da**, apasă butonul de mai jos. Un singur click e suficient: te duce la ghidurile de pe blog și așa știm că vrei să rămâi.
>
> **[ Da, vreau în continuare ]**
>
> Dacă rămâi, primești duminică ghidul săptămânii de pe blog și cel mult un email pe săptămână despre produse, plus mementourile legate de coșul și comenzile tale.
>
> **Dacă nu**, apasă linkul de dezabonare de la finalul acestui email. Te scoatem imediat de pe listă.
>
> **Dacă nu apeși nimic** în următoarele 14 zile, nu-ți mai trimitem newsletterul și campaniile. Rămân doar emailurile legate de ce faci pe site (de exemplu un coș lăsat neterminat) și cele despre comenzi. Te-ai răzgândit mai târziu? Scrie-ne la contact@primesupplements.ro și te punem înapoi.
>
> Oricum alegi, emailurile despre comenzi și livrare le primești în continuare.
>
> Mulțumim că ne-ai citit până acum. Marius Chera, fondator Prime Supplements

### 4.11 VIP și clienți recurenți (1 email + acces înainte)

- **Cine e VIP:** cel puțin 3 comenzi, valoare totală peste 900 de lei, ultima comandă în ultimele 6 luni (segmentul „L · VIP”). Media unei comenzi e ~283 de lei, deci pragul e atins de clienții cu adevărat fideli.
- **Fluxul (luna 2):** Post Purchase, comandă „fulfilled”; **Filter** a 3-a comandă (filtru pe numărul de comenzi = 3, nedocumentat în editor); Run flow „Only once”; Time delay 2 zile, until 18:30; smart sending pornit. Dacă filtrul nu există: o campanie lunară, prima joi din lună, către VIP-ii noi (segmentul „L · VIP” fără cei care au primit deja emailul, prin „Newsletter activity” > „received” > campania anterioară).
- **Ce primesc VIP-ii în plus, fără reduceri:** anunțul de stoc revenit și aromele noi cu 24 de ore înaintea celorlalți (campania pe segmentul VIP pleacă cu o zi mai devreme); linia directă pe WhatsApp.
- **Decizie proprietar:** un cadou real la a 3-a comandă (de exemplu un shaker, trimis în colet) sau un cadou la prag de comandă. Ar fi legal fără cod de reducere, doar dacă e adevărat și fără condiții ascunse.

#### 4.11.1 Email 1 · Mulțumesc pentru a treia comandă · `flow-vip-e1`

- **Subiect:** Mulțumesc pentru a treia comandă · **Alternativ:** Ești de-acum printre clienții noștri fideli
- **Preheader:** O linie directă cu noi și anunțurile de stoc cu o zi înaintea tuturor.
- **CTA:** Scrie-mi pe WhatsApp → `https://wa.me/40775286584`

> Salut!
>
> Ai comandat a treia oară de la noi, și asta contează mult pentru un brand mic din Cisnădie. Îți mulțumesc.
>
> De acum:
>
> - **Afli primul** când revine în stoc un produs sau când lansăm o aromă nouă, cu o zi înaintea celorlalți abonați.
> - **Ai o linie directă:** dacă ai o întrebare despre doze, combinații sau o comandă, scrie-mi pe WhatsApp și îți răspundem cu prioritate, în timpul programului.
>
> **[ Scrie-mi pe WhatsApp ]**
>
> Și dacă ai o idee despre ce ar trebui să mai avem pe site, răspunde la acest email. Citesc personal sugestiile.
>
> Spor la antrenament, Marius Chera, fondator Prime Supplements

### 4.12 Stoc revenit (și de ce nu facem „scădere de preț”)

- **Stoc revenit:** crema de orez a avut 5 campanii „a revenit în stoc” între iulie și septembrie, iar D3 + K2, zincul și nattokinaza sunt epuizate acum. Pagina de funcționalități theMarketer menționează alerte „back-in-stock”, dar documentația nu arată șablonul. **Pasul 1:** cauți în „+ Create journey” un șablon „Back in stock”. Dacă există: declanșator „produs revenit în stoc” pentru cei care l-au văzut în ultimele 90 de zile, 1 email, Filter „Buyer in the last 7 days” → ies, smart sending pornit. **Dacă nu există:** campania o pregătește **Claude prin API** în ziua revenirii (tu doar aprobi testul), pe segmentul „au văzut produsul X în 3 luni” + „au cumpărat X în 6 luni”, fără cei care au comandat în ultimele 7 zile și fără „X · Frecvență redusă”; VIP-ii cu 24 de ore înainte. Crema de orez a adus 5 din cele 14 comenzi măsurate în 61 de zile: aici nu sărim nicio revenire.
- **SMS:** doar la crema de orez, doar cumpărătorilor ei din ultimele 6 luni cu acord SMS dovedit („SMS · Acord dovedit”), cel mult o dată pe lună, niciodată în aceeași zi cu emailul (SMS-ul a doua zi la 11:00, doar celor care n-au dat click pe email).
- **Regula de adevăr:** „a revenit în stoc” doar dacă stocul e real în ziua trimiterii; „toate aromele” doar dacă toate sunt în stoc; „s-a epuizat în X zile” doar cu dovada din Shopify.

#### 4.12.1 Email · [Produsul] e din nou în stoc · `flow-stoc-e1` sau `promo-AAAA-LL-ZZ-stoc-<produs>`

- **Subiect:** [Produsul] e din nou în stoc · **Alternativ:** A revenit: [produsul]
- **Preheader:** Toate aromele disponibile acum [doar dacă e adevărat]. Livrare în 1–3 zile lucrătoare.
- **CTA:** Vezi produsul → `/products/<handle>` sau `/collections/crema-de-orez`
- **Blocuri dinamice:** produsul revenit (bloc de produs din feed, cu prețul de azi și prețul pe unitate, fără preț vechi).

> Salut!
>
> Vești bune: [produsul] e din nou în stoc.
>
> **[Cardul produsului]**
>
> **[ Vezi produsul ]**
>
> [Doar la crema de orez:] O porție are 45 g și se prepară cu 150–200 ml de apă sau lapte rece, fără fierbere. Ai 7 variante, de la caramel sărat la brioșă cu afine.
>
> Comandă la timp: Cargus livrează în 1–3 zile lucrătoare, iar peste 300 de lei livrarea e gratuită.
>
> Echipa Prime Supplements

**SMS stoc revenit (crema de orez):** `Prime Supplements: Crema de orez Creamy Rice e din nou in stoc. O gasesti aici: [link] Dezabonare SMS: [link]`

**Scădere de preț („price drop”): nu acum.** Un email automat cu „prețul a scăzut de la X la Y” trebuie să arate ca preț de referință cel mai mic preț din ultimele 30 de zile (HG 947/2000 art. 4¹, regula Omnibus). Feedul theMarketer are doar „prețul întreg” și „prețul de acum”, deci nu garantează asta. Dacă vrei să anunți o reducere reală, o faci prin campanie, cu prețul de referință verificat în ziua trimiterii.

### 4.13 Aniversare: nu acum

Câmpul „Birthday” e gol la toate contactele. Un câmp de dată a nașterii în pop-up ar scădea înscrierile. **Revenim în T1 2027:** câmp opțional „ziua ta (zi și lună)” în pagina de preferințe; emailul de aniversare ar fi doar o urare și un ghid, fără cod (un cod ar fi decizie proprietar).

### 4.14 Ce oprim și de ce

| Automatizare | Id | Ce face de fapt | Decizie | Când |
|---|---|---|---|---|
| Remind customers to reorder (vechi) | `6862b6757163af43b901e1ed` | „Gata sa le cumperi din nou?” la 0–2 minute după comandă; intră de 4 ori pe comandă | **Oprit**, arhivat | **ziua 1** |
| Cart abandonment similar products | `696f6cd3a6575726ba0b55e8` | Al doilea flux de coș pe același declanșator (82 % suprapunere) | **Oprit**, arhivat | **ziua 1** |
| Bounce follow-up | `696f6c923e7112961f0096da` | **Nu e despre emailurile care nu ajung („bounce” de email).** „Bounce” înseamnă aici vizitator care a intrat pe site și a plecat fără să interacționeze (abandon de site). Trimitea „De ce atat de grabit?” și „Nu rata cele mai bune oferte!” (superlativ), noaptea, inclusiv abonaților noi în prima zi și clienților fideli | **Oprit**, arhivat. Cine a văzut un produs e prins de navigare, cine a pus în coș de fluxul de coș, restul primesc newsletterul | **ziua 1** |
| Inactivity behavior | (id de citit în aplicație) | Win-back la 30 de zile fără vizită pe site, la ora vizitei (03:26) | **Oprit**, înlocuit cu §4.9 și §4.10 | **ziua 1** |
| Cross sell | `696f6e6442d74696320ee134` | 2 emailuri la fiecare comandă, 840 în 90 de zile, 0 comenzi după click | **Oprit** în minutul în care pornește 4.6 (săptămâna 1); până atunci îi pui „Delay until a specific time” 18:30 | săptămâna 1 |
| Welcome series 2 | `696f6c4ff8dbc4c7200f28c9` | 2 emailuri, URL în subiect, E2 și la cumpărători | **Înlocuit** de 4.1; până atunci: Filter „Buyer in the last 1 day” înainte de E2 | săptămâna 2 |
| Cart abandonment | `6862b5c5fd9dc29f6a0f5a6f` | E2 noaptea, „Ultima sansa”, re-intrare nelimitată | **Reparat** în ziua 1 (ore, capping 7 zile, subiecte, fără preț vechi în bloc), apoi refăcut (4.3, varianta C din 4.2) | ziua 1 / săptămâna 2 |
| Product follow-up | `696f6e585ade8453f10815b6` | Pleacă și după cumpărare, noaptea | **Reparat** în ziua 1 (filtru cumpărători, filtrul pe emailul de coș, oră, capping 14 zile) sau **oprit** până în luna 2, dacă editorul nu are filtrul pe emailul de coș; apoi 1 singur email (4.4) | ziua 1 / săptămâna 2 |
| Wishlist + refs 1, 2, 5, 8 (fără trimiteri din ianuarie) | de citit în aplicație | Wishlist nu poate porni (`wishlist_engine: none`); celelalte sunt incomplete | Notezi declanșatorul și blocurile, apoi **arhivezi**. Dacă vreunul are un bloc „Unsubscribe” sau „Add tag inactivi”, îl oprești primul | ziua 1 |

---

## 5. Calendarul de campanii: 8 săptămâni (19.10–13.12.2026), fără Black Friday

**Reguli pentru toate campaniile din calendar:**

- **Newsletterul de blog**, duminică la 18:00, îl pregătește jobul de newsletter (7 ediții, 18.10–29.11, HTML-urile sunt gata în `themarketer/newsletter/`). **Nu îl dublăm.** La 15.10, seara, nu apărea încă nicio campanie programată sau ciornă de newsletter în theMarketer: verifici în Campaigns > Scheduled până sâmbătă, 17.10. Când segmentele sunt create, pasul de build le pune pe newsletter audiența și excluderile de mai jos (prin `update_campaign`, fără să schimbe conținutul). Edițiile din 06.12 și 13.12 rămân de pregătit.
- **Audiența newsletterului:** „E · Implicați 180 zile”. **Excluderi:** „P · Abonați noi 11 zile (în Welcome)”, „X · Sunset suprimați”, „X · Igienă”, „Reactivare 2026-10 · neconfirmați” (**din ziua 0**: cei reactivați primesc doar emailul de reactivare până dau click sau comandă), „X · Acord nedovedit”, „X · Checkout fără comandă, neconfirmați”. „Skip recently messaged contacts” pornit.
- **Newsletterul din 18.10 (urgent):** segmentele noi apar cu 0 contacte până la prima evaluare, iar referințele între segmente au întârziere. Dacă „E · Implicați 180 zile” nu are un număr evaluat până sâmbătă, 17.10, la 12:00, Claude pune pe newsletterul din 18.10 audiența „toți abonații email”, cu două excluderi care există deja și nu așteaptă evaluarea: segmentul de sistem „Activity - Inactive lifetime” și segmentul „Reactivare 2026-10 (de confirmat)”. Abia de la ediția următoare trece la audiența de mai sus.
- **Cel mult o campanie segmentată pe săptămână**, miercuri la 19:30 (ziua și ora care au mers în istoric; A/B pe oră la §10.4), pe un segment de categorie. **Excluderi standard:** „X · Au comandat în ultimele 14 zile”, „P · Abonați noi 11 zile (în Welcome)”, „X · Sunset suprimați”, „X · Frecvență redusă”, „X · Igienă”, „X · Acord nedovedit”, „X · Checkout fără comandă, neconfirmați”, „Reactivare 2026-10 · neconfirmați”, „Subscriber fatigue – Fatigued”, plus cumpărătorii produsului promovat, unde e cazul; în săptămâna unui sunset, și „E · Candidați sunset”. „Skip recently messaged contacts” pornit.
- **Fără reduceri și fără cuvântul „ofertă”** în campaniile din calendar. Dacă vrei o reducere reală, e **decizie proprietar**, cu prețul de referință Omnibus verificat în ziua trimiterii și cu dată reală de final.
- **În săptămânile Black Friday nu trimitem campanii cu produse:** 09–15.11 (Black Friday-ul marilor magazine din România cade de obicei în a doua vineri din noiembrie) și 23–29.11 (Black Friday internațional, 27.11). Pleacă doar newsletterul de duminică și emailurile automate.
- **Cardurile de produs nu arată preț tăiat** (regula de la §4.0: doar prețul de azi, plus prețul pe unitate). Mai multe produse au acum preț comparat în feed (magneziu bisglicinat 60/90, batoane 100/155, EAA 175/185, Creamy Rice 60/65). O reducere reală se anunță doar prin decizie proprietar, cu prețul de referință Omnibus scris de mână, verificat în ziua trimiterii.
- **Înainte de fiecare trimitere:** checklistul de la §7.5.

| Săpt. | Newsletter (duminică 18:00, jobul de newsletter) | Campania segmentată (miercuri 19:30) | Alte trimiteri | Note |
|---|---|---|---|---|
| 0 · 15–18.10 | 18.10 · „Magneziul: când îl iei și ce doză urmezi” (subiect corectat) | — | — | Ziua 1 din §10.1: oprirea fluxurilor greșite, smart sending, DMARC-ul dublat. **Ediția din 18.10, de corectat de jobul de newsletter până sâmbătă, 17.10:** subiectul din stânga; preheaderul „Ghid nou pe blog: cum alegi momentul din zi și cum citești doza de pe ambalaj.”; introducerea „Am publicat un ghid nou despre magneziu: când îl iei, ce doză urmezi și când e bine să întrebi medicul.”; se șterge bulina „În UE nu există o mențiune de sănătate autorizată pentru magneziu și somn.” (un email care vinde magneziu și vorbește de trei ori despre somn creează o mențiune implicită) |
| 1 · 19–25.10 | 25.10 · „Câtă proteină îți trebuie pe zi? Calculul simplu” | **21.10 · Bolul Prime: cremă de orez + proteină.** Segment: „C · Proteine” ∪ „I · Interesați proteine”, fără „C · Cremă de orez”. Subiect A: „Micul dejun de sală, gata în 2 minute” · B: „Cremă de orez + proteină: rețeta simplă”. Unghi: rețeta (45 g de cremă de orez + 150–200 ml de lapte rece + o porție de proteină), 7 arome. CTA: „Alege aroma” → `/collections/crema-de-orez`. UTM `promo-2026-10-21-bol-orez` | Reactivare, lotul 1 (ma 20.10, 10:00) și lotul 2 (jo 22.10, 10:00), dacă etapa 3 a sincronizării e gata și contactele au trecut cele trei verificări de la §9.3 | Crema de orez e singurul subiect care a vândut după click; aici merge doar la cine n-a cumpărat-o |
| 2 · 26.10–01.11 | 01.11 · „Creatina Creapure®: cum o folosești zilnic” | **28.10 · Vitamine și minerale, cu doza corectă.** Segment: „C · Vitamine și minerale” ∪ „I · Interesați vitamine”. Subiect A: „Magneziu, vitamina C, D3 + K2: doza corectă, pe scurt” · B: „Ce scrie pe etichetă, pe înțeles”. Unghi: doza de pe etichetă la fiecare produs (magneziu 3 capsule pe zi, vitamina C o capsulă, D3 + K2 o capsulă la 2 zile, doar dacă e în stoc); mențiunile autorizate doar lângă produsul lor și doar dacă sunt tipărite pe eticheta lui (azi eticheta de magneziu bisglicinat nu are formularea autorizată, deci fără mențiune la magneziu, §4.5.2); fără „imunitate” ca promisiune, fără „boost”. CTA: „Vezi vitaminele și mineralele” → `/collections/vitamine-si-minerale` | Reactivare, lotul 3 (ma 27.10) și lotul 4 (jo 29.10) | Ediția din 01.11 trimite la ghidul `creatina-creapure-ghid`, pe care planul anterior îl ținea în afara emailurilor din prudență: îl recitești înainte de trimitere |
| 3 · 02–08.11 | 08.11 · „Crema de orez înainte de sală: când și cât” | **04.11 · Izolat sau concentrat?** Segment: „C · Proteine” ∪ „I · Interesați proteine”, fără „R · În risc (60–120 zile)” (au primit emailul de marți). Subiect A: „Izolat sau concentrat: diferența pe etichetă” · B: „Iarna te antrenezi mai mult în sală? Alege proteina potrivită”. Unghi: proteina în sezonul rece, când antrenamentele se mută în sală; proteine la 100 g, porții, ingrediente și preț, cu prețul pe kg, recalculat în ziua trimiterii (azi: Prime Whey 2 kg: 360 lei (180 lei/kg, ≈ 5,45 lei pe porție); Pure Isolate 2 kg: 480 lei (240 lei/kg, ≈ 6,49 lei pe porție)), ghidul de blog despre izolat și concentrat. Fără „fără lactoză”, „digestie”, „absorbție”, „pur/pură”: comparăm doar proteina la 100 g, porția, ingredientele și prețul. CTA: „Compară pe site” → `/collections/pudra-proteica` | **Ma 03.11 · Recâștigare · restanțe (1):** segment „R · În risc (60–120 zile)”, textul emailului 4.9.1, UTM `promo-2026-11-03-recastigare` | — |
| 4 · 09–15.11 | 15.11 · „EAA în post intermitent: rup postul sau nu?” | **Fără campanie** (Black Friday-ul magazinelor mari) | **Ma 10.11 · Sunset #1** (§4.10) | Săptămâna cu cel mai mult zgomot în inbox: noi tăcem |
| 5 · 16–22.11 | 22.11 · „Cum citești eticheta unei proteine whey” | **18.11 · Planul de rezerve pentru iarnă.** Segment: „L · Clienți recurenți (2+)”, fără „L · VIP” (VIP-ii îl primesc ma 17.11, 19:30). Subiect A: „Cât îți ține fiecare produs (tabel simplu)” · B: „Planul tău de rezerve până la Anul Nou”. Unghi: tabel cu câte zile ține fiecare ambalaj la doza de pe etichetă (Prime Whey 2 kg ~66 zile la o porție pe zi, Pure Isolate ~74, Creapure® 500 g ~100 la 5 g, Creamy Rice ~22, magneziu bisglicinat ~26, EAA ~83) și „comandă o dată pentru tot ce iei, peste 300 de lei livrarea e gratuită”. CTA: „Vezi cele mai vândute” | **Jo 19.11 · Recâștigare · restanțe (2):** segment „R · Pierduți (120–365 zile)”, fără „L · Clienți recurenți (2+)” (au primit emailul de miercuri) | Util, fără reducere, exact în perioada în care alții dau reduceri |
| 6 · 23–29.11 | 29.11 · „Creatina în plicuri: cum o iei corect” | **Fără campanie** (Black Friday, 27.11) | — | **Decizie proprietar:** în newsletterul din 22.11, P.S.-ul „P.S. Nu facem Black Friday. Îți scriem în continuare, ca de obicei, ghidul de duminică.” Fără promisiune de preț: feedul are prețuri comparate active și există coduri de influenceri active, deci „prețurile rămân aceleași toată luna” ar putea deveni fals |
| 7 · 30.11–06.12 | 06.12 · **de pregătit:** „Vitamina D3 + K2: când o iei (o capsulă la 2 zile)”, doar dacă D3 + K2 e din nou în stoc; altfel „Creatina și proteina împreună” | **02.12 · Cadouri pentru sportivi.** Segment: „E · Implicați 90 zile”. Subiect A: „Cadou pentru cineva care merge la sală? 3 idei pe buget” · B: „Idei de cadou pentru sportivi, sub 100, 200 și 300 de lei”. Unghi: sub 100 de lei (Creamy Rice, cutia de 12 batoane, shakerul Prime 600 ml), sub 200 (Creatină Creapure®, Prime Whey 1 kg), peste 300 cu livrare gratuită (Prime Whey 2 kg); termenul real de livrare pentru Crăciun. Rând obligatoriu în corp: „Suplimentele sunt pentru adulți: nu se recomandă persoanelor sub 18 ani, femeilor însărcinate sau care alăptează.” Cardurile cu preț au și prețul pe unitate. CTA: „Vezi ideile de cadou” → o colecție dedicată, dacă o creezi, altfel `/collections/suplimente-sala?sort_by=best-selling` | — | 30.11 și 01.12 sunt sărbători legale: Cargus nu livrează. Termenul de Crăciun (propus: joi, 17.12, ora 12:00) îl confirmi cu Cargus înainte de 02.12 |
| 8 · 07–13.12 | 13.12 · **de pregătit:** rutina de sală în vacanța de sărbători (articolul săptămânii din calendarul blogului); produs: porțiile gata dozate (Creatină Ready To Go, Prime Whey Go) | **09.12 · Ultimele zile de livrare înainte de Crăciun.** Segment: cei care au dat click pe campania din 02.12 („Newsletter activity” > „clicked” > campania 02.12) ∪ „L · VIP”. Subiect A: „Comandă până joi, 17.12, ora 12:00: Cargus estimează livrarea înainte de Crăciun, pentru adresele din România.” · B: „Termenul estimat pentru cadourile de Crăciun”. Unghi: termenul real, 3 idei de cadou, ramburs. CTA: „Comandă la timp” | **Ma 08.12 · Sunset #2** | Termen real, confirmat cu curierul; după termen nu mai trimitem nimic despre Crăciun |

**Volum estimat pe 8 săptămâni:** 8 newslettere × ~1.500 + 6 campanii segmentate × ~300–1.200 + 2 campanii de restanțe + 2 de sunset + reactivarea (cel mult ~800, după verificarea de la §9.3) ≈ 18.000 de emailuri din campanii. Un abonat implicat primește în medie 1,3–1,6 emailuri din campanii pe săptămână.

---

## 6. Segmentele

**Reguli de construcție:** doar condițiile permise pe planul actual (`get_audience_options kind=segment_conditions`, `audit_audience.md` §4). Limite de reținut: „purchased_category/product” acoperă **ultimele 6 luni**, „viewed_*” și „funnel_step” **ultimele 3 luni**, „newsletter_activity” vede **doar campaniile** (nu automatizările), deschiderile sunt umflate de Apple Mail, deci implicarea se măsoară pe click, comandă sau activitate pe site. Categoriile sunt dublate (vechi și noi, cu și fără diacritice): fiecare segment le include pe toate. Produsele Shopify apar și în categoriile vechi (de exemplu Prime Whey e și în „Pudre Proteice”). Un segment nou apare cu 0 contacte până la prima evaluare. **[API]** = îl creează pasul de build prin `create_segment`, cu exact aceste reguli.

### 6.1 Implicare

| Nume | Potrivire | Reguli | Folosit la | Build |
|---|---|---|---|---|
| E · Implicați 30 zile | any | `newsletter_activity` clicked `any_sent_30_days` · `shopper_status` bought_in_last 30 days · `date_added` within 30 | raportare, teste A/B | **[API]** |
| E · Implicați 90 zile | any | `newsletter_activity` clicked `any_sent_90_days` · `shopper_status` bought_in_last 90 days · `date_added` within 45 · `funnel_step` is view_category · `funnel_step` is search · `funnel_step` is view_product · `funnel_step` is add_to_cart · `funnel_step` is initiate_checkout | campaniile de sezon (cadouri) | **[API]** |
| E · Implicați 180 zile | any | `newsletter_activity` clicked `any_sent_180_days` · `shopper_status` bought_in_last 180 days · `date_added` within 90 · `segment` is „E · Implicați 90 zile” | **audiența newsletterului** | **[API]** (după cel de 90) |
| E · Niciodată deschis (abonați de peste 30 de zile) | all | `segment` is „Activity - Inactive lifetime” (sistem) · `date_added` not_within 30 | excludere din campaniile cu produse | **[API]** |
| E · Candidați sunset | all | `newsletter_activity` not_clicked `any_sent_180_days` · `newsletter_activity` received `at_least_5_in_90_days` · `segment` is_not „X · Cumpărători 180 zile” · `date_added` not_within 180 · `segment` is_not „E · Implicați 90 zile” · `tag` is_not „reactivare-2026-10” (după primul sunset se adaugă și `tag` is_not „email-inactiv”) | campania lunară de sunset | **[API]** (după „X · Cumpărători 180 zile”) |

`shopper_status did_not_buy_in_last` nu e documentat pentru cei care n-au cumpărat niciodată, iar candidații tipici sunt tocmai abonații din pop-up fără comandă. De aceea cumpărătorii se exclud prin segmentul „X · Cumpărători 180 zile”, iar condiția „cel puțin 5 campanii primite în 90 de zile” îi ține afară pe cei care abia au fost reabonați la sincronizare.

### 6.2 Cumpărători pe categorie (ultimele 6 luni)

| Nume | Potrivire | Reguli (`purchased_category`, toate variantele) | Build |
|---|---|---|---|
| C · Proteine | — | Pudre Proteice (67d95b090839f5bea004f3a7) | **[API]** |
| C · Creatină | — | Creatina (68552d1d830bb87b330ba052), Creatină (6acdd84a472b8477b605efeb), Suplimente > Creatina (67d95b080839f5bea004f3a5) | **[API]** |
| C · Pre-workout | — | Pre-Workout (67d95b090839f5bea004f3a8), Shoturi (67d95b090839f5bea004f3aa) | **[API]** |
| C · Cremă de orez | — | Crema de orez (6a46b9e654db89511e0baf77), Cremă de orez (6acdd84a472b8477b605efec) | **[API]** |
| C · Vitamine și minerale | — | Vitamine și Minerale (68552d1d830bb87b330ba050), Suplimente > Vitamine și Minerale (67d95b080839f5bea004f3a2), Prime Health (67d95b080839f5bea004f3a0) | **[API]** |
| C · Aminoacizi | any | `purchased_category` Aminoacizi (68552d1d830bb87b330ba051), Suplimente > Aminoacizi (67d95b080839f5bea004f3a3) · `purchased_product` is EAA `68552d1e830bb87b330ba072` | **[API]** |

Nu facem segmente după cumpărarea unor produse care sugerează o problemă de sănătate (ficat, inimă, tensiune, hormoni, retenție de apă): ar grupa oamenii după date de sănătate (GDPR art. 9). Segmentul „C · Extracte din plante” din prima versiune a fost scos.

### 6.3 Interes (au văzut categoria în ultimele 3 luni)

| Nume | Regulă (`viewed_category`) | Build |
|---|---|---|
| I · Interesați proteine | Pudre Proteice (67d95b090839f5bea004f3a7) | **[API]** |
| I · Interesați creatină | cele 3 categorii de creatină de mai sus | **[API]** |
| I · Interesați cremă de orez | cele 2 categorii de cremă de orez | **[API]** |
| I · Interesați vitamine | cele 3 categorii de vitamine, minerale și Prime Health | **[API]** |

### 6.4 Ciclu de viață și RFM simplificat (contul are doar cele 4 grupe RFM de bază)

| Nume | Potrivire | Reguli | Folosit la | Build |
|---|---|---|---|---|
| L · Abonați fără comandă | all | `subscribed_to` is email · `segment` is „Shopping - Nonbuyers lifetime” (sistem) | campanii pentru prima comandă | **[API]** |
| L · Clienți cu o comandă | all | `number_of_transactions` greater_than 0 · `number_of_transactions` less_than 2 | rezerva pentru filtrul din 4.5 | **[API]** |
| L · Clienți recurenți (2+) | — | `number_of_transactions` greater_than 1 | 4.6, campania din 18.11 | **[API]** |
| L · VIP | all | `number_of_transactions` greater_than 2 · `lifetime_value` greater_than 900 · `shopper_status` bought_in_last 6 months | 4.11, acces cu 24 de ore înainte | **[API]** |
| R · În risc (60–120 zile) | all | `number_of_transactions` greater_than 0 · `shopper_status` did_not_buy_in_last 60 days · `shopper_status` bought_in_last 120 days | restanțe recâștigare (03.11) | **[API]** |
| R · Pierduți (120–365 zile) | all | `number_of_transactions` greater_than 0 · `shopper_status` did_not_buy_in_last 120 days · `shopper_status` bought_in_last 365 days | restanțe recâștigare (19.11) | **[API]** |
| R · Recurenți în risc | all | `number_of_transactions` greater_than 1 · `shopper_status` did_not_buy_in_last 60 days · `shopper_status` bought_in_last 365 days | raportare; prioritate la recâștigare | **[API]** |

### 6.5 Abonați noi, pop-up și reactivare

| Nume | Potrivire | Reguli | Folosit la | Build |
|---|---|---|---|---|
| P · Abonați pop-up fără comandă | all | `tag` is „abonare pop-up” · `segment` is „Shopping - Nonbuyers lifetime” | campanii pentru prima comandă, raportare | **[API]** |
| P · Abonați noi 11 zile (în Welcome) | all | `date_added` within 11 · `segment` is „Shopping - Nonbuyers lifetime” | **excludere din toate campaniile** | **[API]** |
| Reactivare 2026-10 (de confirmat) | — | `tag` is „reactivare-2026-10” | audiența loturilor de reactivare | **[API]** |
| Reactivare 2026-10 · confirmați | all | `tag` is „reactivare-2026-10” · `segment` is_not „Reactivare 2026-10 · neconfirmați” | raportare | **[API]** (după cel de neconfirmați) |
| Reactivare 2026-10 · neconfirmați | all | `tag` is „reactivare-2026-10” · `newsletter_activity` not_clicked `any_sent_30_days` · `shopper_status` did_not_buy_in_last 30 days | **excludere din toate campaniile, din ziua 0** (iese cine dă click sau comandă) | **[API]** |

Limită: `date_added` e data creării contactului, nu data abonării. Un contact creat demult (de exemplu un vizitator urmărit pe site) care se abonează abia acum nu intră în „P · Abonați noi 11 zile”. Riscul e mic: primește în prima săptămână și un newsletter.

**Confirmarea rămâne:** fereastra de 30 de zile e mobilă, așa că, la 30 de zile după fiecare lot, Claude scoate tagul `reactivare-2026-10` de la cei care au dat click sau au comandat (rămân în audiența normală). Altfel un om confirmat care nu dă click o lună ar fi exclus din nou.

### 6.6 Excluderi, frecvență și SMS

| Nume | Potrivire | Reguli | Build |
|---|---|---|---|
| X · Au comandat în ultimele 14 zile | — | `shopper_status` bought_in_last 14 days | **[API]** |
| X · Cumpărători 180 zile | — | `shopper_status` bought_in_last 180 days | **[API]** |
| X · Acord nedovedit | — | `tag` is „acord-nedovedit” (tagul îl pune Claude după verificarea abonaților importați, §9.2) | **[API]**, cu `skip_value_check` |
| X · Checkout fără comandă, neconfirmați | all | `subscribed_to` is email · `segment` is „Shopping - Nonbuyers lifetime” · `newsletter_activity` not_clicked `any_sent_180_days` · `date_added` within 180 · `tag` is_not „abonare pop-up” · `tag` is_not „abonare footer” · `tag` is_not „abonare blog” · `tag` is_not „reactivare-2026-10” · `tag` is_not „sync-shopify-2026-10” | **[API]**; la prima evaluare, build-ul verifică numărul: dacă prinde mult peste ~10–20 de contacte noi pe lună, prinde și alte surse și se restrânge |
| X · Igienă (adrese de evitat) | any | `email` contains „1secmail” · „anonmails” · „gmail.con” · „yahoo.con” · „gamil.” · „gmai.com” · „gnail.” · „icloud.con” · „@example.” · `deliverability` soft_bounced_in_last 30 days · `deliverability` hard_bounced_in_last 180 days | **[API]** |
| X · Sunset suprimați | — | `tag` is „email-inactiv” | **[API]**, cu `skip_value_check`, după primul sunset (tagul nu există încă) |
| X · Frecvență redusă | — | `tag` is „frecventa-redusa” | **[API]**, cu `skip_value_check` |
| (sistem) Subscriber fatigue – Fatigued | — | segment de sistem, nu se creează | — |
| SMS · Acord dovedit | all | `subscribed_to` is sms · `tag` is „acord-sms-dovedit” · `phone` is_not_empty | **[API]**, cu `skip_value_check`; tagul îl pune Claude doar după verificarea contact cu contact de la §3.3 |
| SMS · Cumpărători cremă de orez | all | `segment` is „SMS · Acord dovedit” · `segment` is „C · Cremă de orez” | **[API]** |

**Segmentul existent „inactivi curatare”** (`6a50f45aa1ebe8ee240f89b1`, tag „inactivi”) rămâne, dar nu se folosește ca excludere: conține și 104 oameni care s-au abonat din nou.

**Ordinea de creare pentru build:** întâi segmentele fără referințe (E · Implicați 90, categoriile, interesul, R, X, inclusiv „X · Cumpărători 180 zile” și „X · Au comandat în ultimele 14 zile”, „Reactivare 2026-10 · neconfirmați”, tagurile), apoi cele care referă alte segmente (E · Implicați 180, E · Candidați sunset, Reactivare confirmați, SMS · Cumpărători cremă de orez). După 24 de ore, build-ul citește numărul de contacte din fiecare (`list_segments`) și raportează segmentele goale sau suspect de mari.

---

## 7. Șablonul (un singur set de brand pentru campanii și automatizări)

### 7.1 Șablonul „Prime · Master 2026”

| Element | Specificație |
|---|---|
| Structură | HTML pe tabele, lățime **600 px**, centrat; `lang="ro"`; `<title>` = subiectul; preheaderul în câmpul „Preview text”, plus spații invizibile după el ca inboxul să nu completeze cu primul text din email |
| Culori | fundal exterior **#f0f0f0**; corp **#ffffff**; text **#1a1a1a**; accent și buton **#e91d23** cu text alb; linii #e5e5e5; subsol **#1a1a1a** cu text #f0f0f0 |
| Font | **Arial**, Helvetica, sans-serif peste tot (fără Times de rezervă); corp 16 px / 24 px; H1 24–28 px, bold, maximum 8 cuvinte, **text real, nu imagine** |
| Antet | logoul Prime în PNG transparent, cu contur alb subțire (se vede pe fundal deschis și închis), alt „Prime Supplements”, legat la homepage. **E singurul link spre homepage.** Variantă de rezervă: numele „PRIME SUPPLEMENTS” ca text, cu o linie roșie de 3 px dedesubt (așa arată newsletterele pregătite de job) |
| Buton principal | **unul singur pe email**: fundal #e91d23, text #ffffff, 18 px bold, înălțime minimă 44 px, colțuri rotunjite 6 px, lat pe mobil; text de acțiune concret („Alege aroma”, „Finalizează comanda”). Contrastul alb pe #e91d23 e 4,5:1, deci textul rămâne la minimum 18 px bold |
| Linkuri secundare | text #e91d23 subliniat; toate cu diacritice („Comandă”, nu „Comanda”) |
| Imagini | JPG, 1200 px lățime afișate la 600, **≤ 200 KB**; **alt text la fiecare imagine**, care spune mesajul („Cremă de orez Prime Creamy Rice, 7 arome”); fără text esențial doar în imagine; fără butoane desenate în imagine; fără .avif |
| Produse | maximum 3 carduri, doar din feedul Shopify, cu prețul de azi și prețul pe unitate; **fără preț vechi și fără eticheta „-X %”**, în campanii și în automatizări, la blocurile statice și la cele dinamice (§4.0); buton „Vezi produsul” |
| Dimensiune | HTML sub 100 KB (Gmail taie emailurile de peste ~102 KB) |
| Linkuri | doar spre `/products/` sau `/collections/` sau articole de blog, cu UTM curat (§2.6), fără parametri de căutare Shopify (`?_pos=…`) |

### 7.2 Modulele

| Modul | Conținut | Unde se folosește |
|---|---|---|
| M1 Antet | logo sau numele ca text, linie roșie | toate |
| M2 Titlu + text + buton | H1, 2–4 rânduri, butonul principal | toate |
| M3 Imagine principală | o imagine cu alt text, legată la același URL ca butonul | campanii, Welcome |
| M4 Card produs (1–3) | imagine, nume, o propoziție factuală (porții, gramaj), **prețul de azi și prețul pe unitate** (de exemplu „360 lei · 180 lei/kg”; la capsule, „· X lei/capsulă”), „Vezi produsul” | campanii, fluxuri |
| M5 Bloc dinamic | produsele din coș, produsul văzut, produsul de reaprovizionat, recomandările („Frequently Bought Together”, „Recommended For You”, „Others You May Like”); fără preț vechi (dacă blocul nu permite, fără preț), recomandările doar după excluderea celor 12 produse cu nume de efect | fluxuri |
| M6 Discount | blocul „Discount” cu WELCOME5 (multi-use, 5 %) și condițiile scrise sub el | Welcome |
| M7 Recenzie | citat exact Judge.me, [autor], produsul, „cumpărător verificat”; nota 4,87 din 432 de recenzii | Welcome E4, campanii |
| M8 Bara de încredere | „Livrare gratuită peste 300 de lei · Plată ramburs · Cargus 1–3 zile lucrătoare · WhatsApp 0775 286 584” | coș, checkout, campanii |
| M9 Ghid de blog | imaginea articolului, titlul, 2 rânduri, „Citește ghidul” | newsletter, Welcome, recâștigare |
| M10 Mențiune de sănătate | doar formularea autorizată de pe etichetă, lângă produsul ei, cu condiția (doza) | unde e cazul |
| M11 Avertisment cafeină | „Conține cafeină ([X] mg pe porție). Nu se recomandă copiilor sau femeilor însărcinate, și nici persoanelor sub 18 ani, femeilor care alăptează sau persoanelor sensibile la cafeină. Nu o combina cu alte surse de cafeină.” | orice email cu un produs cu cafeină |
| M12 Subsolul comun | §7.3 | toate |

### 7.3 Subsolul comun (text exact)

> Primești acest email pentru că te-ai abonat la emailurile Prime Supplements pe primesupplements.ro. Vrei mai puține emailuri? Răspunde cu „MAI RAR” și îți trimitem doar ghidul de duminică și mementourile legate de coșul și comenzile tale. Nu mai vrei deloc? [Dezabonare]({{unsubscribe_link}}) · [Politica de confidențialitate](https://primesupplements.ro/policies/privacy-policy)
>
> PRIME SPORT SUPPLEMENTS SRL · CUI 46260823 · J32/1155/2022 · Str. Ioan Virgil Ispas nr. 17A, 555300 Cisnădie, jud. Sibiu · 0775 286 584 · contact@primesupplements.ro
>
> Este importantă o alimentație variată și echilibrată și un stil de viață sănătos. Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată. Nu depășiți doza zilnică recomandată. A nu se lăsa la îndemâna copiilor mici.

Linkul de dezabonare e `{{unsubscribe_link}}` (cerut de theMarketer), vizibil, cu text #f0f0f0 pe #1a1a1a (contrast ~16:1). Iconițele sociale sunt opționale, la final, cu alt text („Instagram Prime Supplements” etc.).

### 7.4 Dark mode

- În `<head>`: `<meta name="color-scheme" content="light dark">` și `<meta name="supported-color-schemes" content="light dark">`.
- `@media (prefers-color-scheme: dark)` (Apple Mail, Outlook pe Mac și iOS): fundal exterior #121212, corp #1e1e1e, text #f0f0f0, text secundar #bdbdbd, linii #333333, linkuri #ff6b6f; butonul rămâne #e91d23 cu text alb; subsolul #000000 cu text #e5e5e5. Aceleași reguli și pe selectorii `[data-ogsc]` pentru Outlook.com și aplicațiile Outlook.
- Gmail pe telefon inversează singur culorile și ignoră aceste reguli. De aceea: logo transparent cu contur alb, imaginile de produs pe fundal propriu (alb) în carduri, niciun text important în imagini, fără negru pur pe imagini transparente.
- **Testul obligatoriu** înainte de prima trimitere a șablonului master: Apple Mail pe iPhone (luminos și întunecat), Gmail pe Android (întunecat) și Outlook pe desktop. Restul clienților (Gmail pe web și pe iOS, Outlook.com, un client cu imaginile blocate) îi verifici după pornire.
- **Până la șablonul master** (luna 2), fluxurile și campaniile folosesc ca șablon interimar HTML-ul newsletterelor pregătite de job (deja testat, blocat pe modul luminos), cu subsolul comun de la §7.3.
- Newsletterele din 18.10–29.11, pregătite de job, sunt blocate pe modul luminos (`color-scheme: light`) și testate. Rămân așa. Din 06.12, newsletterul folosește șablonul master.

### 7.5 Checklistul înainte de „Trimite” (campanii) și de „Pornește” (fluxuri)

1. Fiecare afirmație despre efect e **identică** cu o mențiune autorizată care apare pe eticheta produsului? Altfel o ștergi și descrii produsul (ingrediente, cantitate pe porție, mod de folosire, aromă, preț).
2. Nicio imagine nu conține text de efect sau sloganuri de pe ambalaj (DETOX, IMMUNITY, FAT BURNER, ENERGY…).
3. Cuvinte interzise: detox, imunitate (ca promisiune), arde grăsimi, slăbire, recuperare (rapidă), forță, „cel mai bun”, „nr. 1”, „maxim”, „premium” ca superlativ, „doar azi”, „ultima șansă”, „stoc limitat” (dacă nu sunt adevărate și dovedite).
4. Produs cu cafeină: modulul M11.
5. Prețurile din email sunt cele de pe site **în ziua trimiterii**; niciun preț tăiat (§4.0).
6. Toate linkurile duc la `/products/`, `/collections/` sau la blog, cu UTM-ul corect; niciun link `/produs/`.
7. Imaginea principală are alt text, ≤ 200 KB, și duce la produs sau la colecție; un singur buton principal.
8. Subsolul se citește, dezabonarea e vizibilă; testul a fost văzut pe telefon, în modul întunecat.
9. Segmentul e ales (nu „toți abonații”), excluderile standard sunt puse, „Skip recently messaged contacts” e pornit, același segment n-a mai primit același subiect în ultimele 14 zile.
10. Nu se numește producătorul, fabrica sau furnizorul (doar „fabricat în UE”, dacă e nevoie).
11. Blocurile dinamice nu arată preț vechi și nu recomandă produse cu nume de efect (§4.0).
12. Unde apare un preț, apare și prețul pe unitate (§4.0, modulul M4).

### 7.6 Ce reparăm la șabloanele de acum

| # | Problemă găsită | Reparația |
|---|---|---|
| 1 | Subsol negru pe negru (dezabonare, contact și „vezi în browser” invizibile); lipsesc firma, CUI-ul și adresa | Subsolul comun §7.3 în toate emailurile, campanii și automatizări |
| 2 | Imaginea principală e text în imagine, fără alt, 0,4–1,9 MB, legată la homepage; butoane desenate în imagine | Modulul M2 + M3: titlu ca text, imagine ≤ 200 KB cu alt, legată la produs |
| 3 | Buton principal gri, transparent, înaintea textului; 3–10 butoane „Comanda” în 6 culori | Un singur buton roșu plin, după text; linkuri secundare în text |
| 4 | Produse vechi WooCommerce în blocuri (imagini 404, prețuri greșite: batoane 144 față de 100 lei) | Doar carduri din feedul Shopify; **decizie proprietar:** dezactivăm cele 70 de produse vechi din catalog (pot face asta prin API) |
| 5 | `lang="en"`, `<title>` gol, Times New Roman ca rezervă, lățime 700 px, umbră | Șablonul master |
| 6 | Fără dark mode; logo JPG cu fundal alb; stiluri lipite din ChatGPT | §7.4 |
| 7 | Subiecte fără diacritice în automatizări, URL în subiect, emoji la începutul subiectului, engleză („Back in Stock”, „BOOST”), superlative, urgență falsă | Subiectele din §4 și §5; emoji doar ca test A/B, niciodată la început |
| 8 | Prenumele ghicit din adresa de email în subiecte | Fără prenume în subiecte; „Salut!” în corp |
| 9 | `utm_medium=automation`, `utm_campaign` = subiectul cu emoji | Convenția UTM §2.6 |
| 10 | Blocul „Recomandate pentru tine” scotea haine .avif | Rezolvat azi: 121 de produse excluse din recomandări (§10.2) |
| 11 | Mențiuni neautorizate în 11 din 18 campanii, inclusiv în imagini | Checklistul §7.5, obligatoriu |

---

## 8. Formulare și creșterea listei

### 8.1 Double opt-in

- **Unde se pornește:** documentația publică theMarketer nu arată calea exactă. Pagina integrării Shopify descrie setarea **„Double opt-in setting”**, care stabilește dacă emailul de confirmare îl trimite site-ul sau theMarketer. Cauți în ordinea: (1) aplicația theMarketer din Shopify (Shopify Admin > Apps > theMarketer > setări); (2) theMarketer > Settings > Email setup (`https://app.themarketer.com/settings/email-settings`); (3) setările fiecărui formular (Audience > Signup forms > formularul). Alegi ca **theMarketer** să trimită confirmarea. Dacă nu o găsești, scrii la iam@themarketer.com: „Vreau double opt-in pentru popup și formularele embedded, cu emailul de confirmare trimis de theMarketer.”
- **Pentru cine:** doar înscrierile noi din pop-up și din formularele embedded. Abonații existenți nu trebuie să confirme. La checkout nu folosim DOI. Adresa e verificată doar dacă urmează o comandă. Cine bifează abonarea și abandonează checkout-ul primește doar fluxul de coș și checkout (§4.2–4.3). Intră în campanii abia după o comandă sau un click pe un email (segmentul „X · Checkout fără comandă, neconfirmați”, exclus din campanii).
- **Când îl pornești:** **abia după ce jobul de sincronizare raportează că a terminat.** Singura setare de DOI documentată e în integrarea Shopify și nu e documentat că s-ar putea limita doar la formulare. Dacă s-ar aplica și abonărilor venite din Shopify (comandă, import, API), sincronizarea ar trimite emailuri de confirmare la sute de clienți, iar cei care nu confirmă n-ar mai fi abonați (contul are acum ~2.300 de contacte cu email, +1.054 în ultimele 7 zile). Înainte de pornire faci două teste: o abonare la checkout (comandă de test) și un import API al unei adrese de test (îl face Claude). Dacă vreuna primește confirmare, DOI rămâne oprit și scrii la iam@themarketer.com: „Se aplică double opt-in și surselor order, import și api?”
- **De ce DOI, pe scurt:** GDPR cere un acord pe care îl poți dovedi (art. 7(1)), nu neapărat DOI. Aici DOI se justifică prin calitatea listei (sincronizarea a scos ~944 de înscrieri de tip bot) și costă ~30–35 % din abonații noi.
- **Emailul de confirmare:** textul de la §4.1.0, fără marketing.
- **Numele codului WELCOME5** nu mai apare în pop-up (pop-up-ul spune „codul de bun venit”); codul vine în Welcome E1, după confirmare.
- **Dovada consimțământului** (GDPR art. 7(1)): data și ora, formularul, textul exact afișat, momentul confirmării. Le vezi în istoricul de consimțământ al contactului; păstrezi și o captură cu textul pop-up-ului la fiecare schimbare.
- **Testul:** te abonezi cu o adresă personală nouă din pop-up. Trebuie să vină emailul de confirmare; după click, Welcome E1 cu codul. Fără click, nu trebuie să vină nimic.

### 8.2 Pop-up-urile (cel existent `6863a57bdaba617ac50e875f`, refăcut pentru desktop, plus o copie pentru mobil)

Calea: Audience > Signup forms > pop-up-ul existent > editare.

| Setare | Valoare |
|---|---|
| Afișare (Display rules) | **„Page landing”** cu **„Time delay” 30 de secunde**, plus **„Exit intent”** (pe desktop) |
| Pagini | produse, colecții, blog, homepage. **Nu** pe coș, cont și paginile de politici, doar dacă editorul are reguli pe URL (nedocumentat); checkout-ul Shopify e oricum pe alt domeniu, unde scriptul nu rulează |
| Frecvență | cea mai rară opțiune din listă (cel puțin „once a week”) pentru cine l-a închis. „Niciodată pentru abonați”: o alegi doar dacă opțiunea există pe ecran; altfel verifici, într-un browser în care ești abonat, dacă pop-up-ul mai apare |
| Dispozitive | **două pop-up-uri cu același text și același tag:** unul „LightBox” doar pe desktop (casetă centrată, cu fundal întunecat în spate) și unul „Slide-in” doar pe mobil, de jos, care acoperă cel mult o treime din ecran (un „Slide-in” nu poate apărea în centrul ecranului pe desktop) |
| Câmpuri | email (obligatoriu); telefon, **doar dacă e bifată căsuța SMS** (altfel câmpul nu apare sau nu se salvează). Fără prenume. Bifa SMS și câmpul de telefon există doar dacă editorul are un câmp de acord SMS separat și nebifat; altfel scoți câmpul de telefon. **Decizie proprietar:** golim prin API prenumele deduse din adresa de email? |
| Tag | „abonare pop-up” (existent) |
| Pop-up de succes | textul de mai jos |

**Textele pop-up-ului:**

- **Titlu:** 5 % la următoarea comandă
- **Text:** Lasă-ne adresa de email. După ce confirmi abonarea, îți trimitem codul de bun venit și, în primele 10 zile, 3 emailuri scurte de prezentare, apoi ghidul de duminică, emailuri despre produsele, noutățile și ofertele Prime și un memento dacă lași produse în coș. De obicei, 1–2 emailuri pe săptămână.
- **Buton:** Vreau codul
- **Bifa SMS (nebifată, doar dacă editorul are câmpul separat):** Vreau și SMS-uri când revine în stoc un produs sau când las produse în coș (maximum 2 pe lună).
- **Text mic, sub buton:** Codul de bun venit: 5 % la toată comanda, o singură utilizare per client. Te poți dezabona oricând, din linkul din fiecare email. Detalii în [Politica de confidențialitate](https://primesupplements.ro/policies/privacy-policy). Produsele noastre sunt pentru adulți.
- **Pop-up de succes:** Mai e un pas: deschide emailul de la noi și apasă „Confirm abonarea”. Codul vine în emailul de după confirmare. (Nu-l găsești? Uită-te în Promoții sau Spam.)

### 8.3 Formulare embedded (noi)

Calea: Audience > Signup forms > „Create signup form” > „Embedded forms” > layout > „Form code” (codul HTML) > îl pui în temă.

| Formular | Unde | Titlu și text | Buton | Tag |
|---|---|---|---|---|
| Footer | în locul formularului de newsletter din footerul temei (care trimite azi abonații în Shopify, nu în theMarketer) | „Ghidul de duminică” · „Un ghid util pe săptămână despre proteine, creatină și alimentația pentru sală, plus emailuri despre produsele și ofertele Prime (de obicei 1–2 pe săptămână). Te dezabonezi oricând, din linkul din fiecare email.” | Mă abonez | „abonare footer” |
| Blog | la finalul fiecărui articol | „Ți-a fost util? Primește ghidul săptămânii duminică la 18:00, plus noutăți și oferte Prime (de obicei 1–2 emailuri pe săptămână).” | Trimite-mi ghidul | „abonare blog” |

Mesajul de confirmare la ambele (cu DOI): „Verifică-ți emailul și confirmă abonarea. După confirmare primești emailul de bun venit, cu codul de bun venit.” Schimbarea în temă o face cine editează tema (o pot pregăti eu pe tema de test, cu aprobarea ta).

**Varianta B** (dacă vrei să păstrezi promisiunea „doar ghidul” la footer și blog): contactele cu tag „abonare footer” sau „abonare blog” se exclud din Welcome E2–E4, din campaniile segmentate și din fluxurile de stoc revenit, VIP, navigare, client existent și recâștigare. Primesc doar Welcome E1, newsletterul și, dacă lasă un coș, fluxul de coș; în textul formularului scrii și „plus un memento dacă lași produse în coș”. Excluderea din fluxuri cere filtrul pe tag (§3.5). Implicit folosim textele din tabel.

### 8.4 Politica de stimulente

- Singurul stimulent: **WELCOME5** (5 %, o dată pe client, fără dată de expirare), trimis după confirmare.
- **Fără coduri noi** (de exemplu 10 % la abonare, cod de coș abandonat, cod de aniversare) fără decizia ta.
- **De testat în luna a 3-a (decizie proprietar):** un stimulent fără reducere, de exemplu un ghid PDF „Câtă proteină și creatină îți trebuie: calculul simplu” sau un cadou fizic la prima comandă peste un prag.
- Pop-up-ul vechi din temă („10 % pentru clubul VIP”) rămâne oprit.
- **Decizie proprietar** (alternativă): limitezi WELCOME5 în Shopify la clienții fără comenzi și păstrezi „la prima comandă”; atunci emailul 1 către un cumpărător existent spune clar că WELCOME5 e doar pentru prima comandă. Implicit nu schimbăm codul: în Shopify, WELCOME5 îl poate folosi o dată orice client care nu l-a folosit încă.

### 8.5 Acordul la checkout (Shopify) și acordul SMS

- **Email:** Shopify Admin > Settings > Checkout > Marketing options > Email: bifa de abonare afișată și **nebifată implicit**. Textul ei îl schimbi din Online Store > Themes > ⋯ > Edit default theme content, căutând „Email me with news and offers”, în: „Vreau emailurile Prime: ghidul săptămânal, noutăți și oferte (de obicei 1–2 pe săptămână).” Azi bifa nu aduce aproape niciun abonat (0 din 41 de clienți noi în eșantionul din 15.09–02.10), deci verifici întâi că apare pe ecranul de checkout, pe telefon și pe desktop. Ținta: ~15 % din clienții noi.
- **SMS:** bifă separată, tot nebifată (Settings > Checkout > Marketing options > SMS, dacă o folosești).
- **De verificat în conectorul Shopify–theMarketer:** acordul SMS nu trebuie dedus din bifa de email (auditul a găsit email, SMS și push înregistrate în aceeași secundă la 3 contacte). Până la verificare nu pleacă niciun SMS de marketing; apoi doar la „SMS · Acord dovedit” (§3.3).

### 8.6 Celelalte formulare și pop-up-uri trebuie oprite

- Pop Convert (instalat în Shopify): verifici că nu afișează un al doilea pop-up.
- Shopify Forms, dacă a fost creat un pop-up după planul din 13–15.10: îl oprești (Apps > Forms > formularul > Turn form off) și oprești și „Forms” din App embeds. Altfel abonații ajung în Shopify, nu în theMarketer, și vizitatorul vede două pop-up-uri.
- Shopify Messaging: toate automatizările oprite (decizia ta: emailurile de marketing pleacă doar din theMarketer). **Notificările de comandă și de livrare din Shopify rămân pornite**: sunt tranzacționale.

### 8.7 Ținta de creștere

| Sursă | Azi pe lună | Țintă pe lună (luna a 3-a, bază) |
|---|---:|---:|
| Pop-up-urile (desktop și mobil, 30 s + exit intent) | ~100–112 | ~130–150 de înscrieri × ~65 % confirmă ≈ 85–100 |
| Formular footer | 0 în theMarketer | ~10–15 |
| Formular blog | 0 | ~5–10 |
| Checkout (bifa Shopify, sincronizată) | ~0–5 (0 din 41 de clienți noi în eșantion) | ~15–20 |
| **Total abonați noi** | **~100 (neconfirmați)** | **~115–145 (≈ 100–120 confirmați din formulare + 15–20 de la checkout)** |

Dublarea afișărilor pop-up-ului nu e dovedită, iar pauza de 30 de secunde scade afișările. Dacă după 2 luni pop-up-urile trec de ~150 de înscrieri pe lună, treci la ținta optimistă (~200 de înscrieri, ~160 de confirmați).

---

## 9. Livrabilitate

### 9.1 DNS și autentificare (le face cine administrează domeniul, la registrar)

| Pas | Când | Ce |
|---|---|---|
| 1 | **ziua 1** | **Ștergi înregistrarea DMARC în plus** `v=DMARC1; p=none;` și o păstrezi pe cea cerută de theMarketer: `v=DMARC1; p=none; adkim=r; aspf=r; pct=0;`. Două înregistrări DMARC = niciun DMARC valid. |
| 2 | săptămâna 2 | **SPF** pe domeniul principal: `v=spf1 include:_spf.google.com include:amazonses.com ~all` (adaugă Google Workspace, de pe care răspunzi clienților). |
| 3 | săptămâna 2 | **DKIM Google Workspace:** Admin console > Apps > Google Workspace > Gmail > Authenticate email > generezi cheia și adaugi TXT-ul `google._domainkey`, apoi „Start authentication”. |
| 4 | săptămâna 2 | **DKIM Shopify:** Shopify Admin > Settings > Notifications > Sender email > Authenticate > adaugi CNAME-urile `shopify1/2/3._domainkey`. Contează pentru confirmările de comandă. |
| 5 | după pașii 2–4 | Claude rulează validarea domeniului în theMarketer (`validate_domain`) și verifică DNS-ul public. |
| 6 | **săptămâna 2**, după pașii 2–5 | DMARC cu raportare și aplicare pe tot traficul, încă fără blocare: `v=DMARC1; p=none; pct=100; adkim=r; aspf=r; rua=mailto:dmarc@primesupplements.ro` (creezi un alias `dmarc@` în Google Workspace sau folosești un serviciu gratuit de rapoarte DMARC). Rulezi din nou validarea theMarketer; dacă theMarketer o respinge pentru că așteaptă exact `pct=0`, îi scrii la iam@themarketer.com înainte să revii. |
| 7 | după 30 de zile cu rapoarte curate (theMarketer, Google și Shopify trec toate) | `p=quarantine; pct=25` → după 2 săptămâni `pct=50` → după încă 2 săptămâni `pct=100`. **Nu treci la quarantine înainte de pașii 2–4**, altfel confirmările de comandă și emailurile tale din Gmail pot ajunge în Spam. |
| 8 | săptămâna 2 | **Google Postmaster Tools** (gratuit): adaugi domeniul, ca să vezi rata de spam raportată de Gmail. |
| 9 | la primul test | În Gmail, „Show original” pe un email theMarketer: SPF, DKIM și DMARC „PASS”, plus antetul de dezabonare dintr-un click (`List-Unsubscribe`). |

**Expeditorul:** un singur expeditor, contact@primesupplements.ro, numele „Prime Supplements”. Expeditorul secundar `…@primesupplements.ro.mktrmail.com` nu se mai folosește.

### 9.2 Igiena listei

- **Hard bounce:** theMarketer dezabonează automat. **Soft bounce** repetat: contactul intră în „X · Igienă” 30 de zile.
- **Adrese temporare, greșeli de tastare, boți:** segmentul „X · Igienă”, exclus din tot. Sincronizarea a scos deja ~944 de înscrieri suspecte de tip bot și ~44 de adrese cu probleme (domenii temporare, greșeli de tastare, adrese de test) (`sync_report.md`).
- **Curățarea automată theMarketer** (după 24 de emailuri HTML nedeschise) o oprești (§3.4): dezabonează, iar sunsetul cu tag face aceeași treabă fără dezabonare.
- **Sunset** lunar (§3.4, §4.10).
- **Niciodată:** liste cumpărate sau copiate; reabonarea celor care s-au dezabonat singuri; importuri „abonat” fără dovada acordului.
- **Abonații deja importați (sursa „import”, 581, plus tagurile „import 25.06” și „Update 13.11”):** Claude verifică prin API câți au și acord în Shopify (SUBSCRIBED, cu dată) sau au dat click sau au comandat după abonare. Aceștia rămân. Ceilalți primesc tagul `acord-nedovedit` și intră în segmentul „X · Acord nedovedit”, exclus din campanii până la decizia ta. Raportăm doar cifrele.
- **Cei 2.203 contacte scoase administrativ pe 10.07, care nu sunt abonați în Shopify:** rămân neabonați și **nu primesc niciun email, nici de reconfirmare** (un email care întreabă „vrei să te reabonezi?” e el însuși comunicare comercială). **Decizie proprietar, doar cu avizul unui jurist:** o singură reconfirmare, numai pentru contactele cu dovada acordului inițial (data, sursa, textul) și fără nicio dezabonare sau plângere făcută de ei, în theMarketer sau în Shopify.

### 9.3 Încălzirea grupului reactivat (tag `reactivare-2026-10`)

Grupul: abonații Shopify scoși din theMarketer la curățarea din iulie, reabonați la sincronizare (3 acum, ~800 pregătiți în etapa 3, care așteaptă regula pentru SMS). Au acord în Shopify, dar n-au primit nimic de la noi de 3 luni, iar o parte nu deschideau nici înainte.

**Înainte de etapa 3, fiecare dintre cele 801 contacte trece trei verificări. Cine pică una nu e reabonat.** Azi doar 9 contacte au fost verificate individual; un contact poate apărea SUBSCRIBED în Shopify deși s-a dezabonat din theMarketer, iar reabonarea lui ar încălca Legea 506/2004 art. 12 și GDPR art. 7(3) și 21(3).

1. În theMarketer, dezabonarea vine din curățarea administrativă din iulie (data curățării, nu un click pe „Dezabonare”). Contactul nu are plângere de spam și nu are hard bounce.
2. În Shopify, `emailMarketingConsent.marketingState = SUBSCRIBED`, cu `consentUpdatedAt` completat. Dacă `marketingOptInLevel = UNKNOWN`, rămâne neabonat până ai dovada din WooCommerce: data, formularul și textul.
3. Nu are nicio dezabonare, în niciun sistem, după data acordului.

Claude raportează doar cifrele: câți trec, câți pică și din ce motiv. Lista nominală, dacă e nevoie, stă doar în `themarketer/private/` (chmod 700). **Data curățării** se scrie la fel peste tot: 10.07.2026, după evoluția audienței din theMarketer (`sync_report.md` scrie 13.07; la verificarea de mai sus contează data din istoricul de consimțământ al fiecărui contact).

| Lot | Când | Cine | Câți |
|---|---|---|---:|
| 1 | ma 20.10, 10:00 | cumpărători cu o comandă în ultimele 12 luni | ~100 |
| 2 | jo 22.10, 10:00 | ceilalți cumpărători | ~150 |
| 3 | ma 27.10, 10:00 | abonați cu nume, fără comenzi | ~250 |
| 4 | jo 29.10, 10:00 | restul (fără nume și fără comenzi) | ~300 |

- **Un singur email** (mai jos), fără reducere. Nu intră în Welcome și nu primesc alte campanii până nu dau click sau comandă (segmentul „Reactivare 2026-10 · neconfirmați” e exclus din toate campaniile din ziua 0). Cifrele loturilor sunt dinainte de verificare; după ea pot fi mai mici.
- **Oprire:** dacă un lot are bounce hard ≥ 2 % sau plângeri ≥ 0,1 %, loturile următoare se opresc și analizăm.
- **După 30 de zile:** cine a dat click sau a comandat e „confirmat”: Claude îi scoate tagul `reactivare-2026-10` și primește campaniile normale. Ceilalți rămân în „Reactivare 2026-10 · neconfirmați”, exclus din campanii (rămân abonați; dezabonare la cerere sau la termenul de păstrare de la §3.4).

#### 9.3.1 Emailul de reactivare · `reactivare-2026-10-b<lot>`

- **Subiect:** Mai vrei vești de la Prime Supplements? · **Alternativ:** O întrebare scurtă despre emailurile noastre
- **Preheader:** Un click și rămâi pe listă: un ghid pe săptămână și noutățile reale. Fără spam.
- **CTA:** Da, rămân → `https://primesupplements.ro/blogs/news`
- **Blocuri dinamice:** niciunul. **Cod:** fără.

> Salut!
>
> Te-ai abonat cândva la emailurile Prime Supplements, dar de câteva luni nu ți-am mai scris. Am făcut curățenie în listă și vrem să-i păstrăm doar pe cei care chiar vor să ne citească.
>
> Dacă rămâi, primești:
>
> - **duminică, la 18:00**, un ghid practic de pe blog (proteine, creatină, alimentație pentru sală);
> - **cel mult un email pe săptămână** despre produse: stocuri revenite, arome noi, sfaturi de folosire;
> - mementourile legate de coșul și comenzile tale.
>
> **[ Da, rămân ]**
>
> Un singur click e suficient. Dacă nu apeși nimic, nu-ți mai trimitem campanii; rămân doar emailurile legate de ce faci pe site (de exemplu un coș lăsat neterminat) și cele despre comenzi.
>
> Nu mai vrei emailuri de la noi? Linkul de dezabonare e chiar mai jos.
>
> Mulțumim, Marius Chera, fondator Prime Supplements

### 9.4 Praguri de alarmă

| Indicator | Țintă | Alarmă: ce faci |
|---|---|---|
| Plângeri spam (pe campanie) | < 0,08 % | ≥ 0,1 %: oprești campaniile segmentate o săptămână, verifici subiectul, segmentul, frecvența |
| Bounce hard (pe trimitere) | < 0,5 % | ≥ 2 %: oprești trimiterea (sau lotul de reactivare), verifici sursa adreselor |
| Dezabonări (pe campanie) | < 0,3 % | > 0,5 %: subiectul sau segmentul n-a fost potrivit; mai rar către acel segment |
| Dezabonări Welcome | < 0,8 % | > 1,2 %: mai puține emailuri sau pauze mai lungi |
| Rata de spam în Google Postmaster | < 0,1 % | > 0,3 %: Gmail începe să blocheze; pauză la campanii și analiză |
| Click-uri unice pe newsletter | ≥ 1 % | < 0,5 % două săptămâni la rând: schimbi unghiul și testezi subiectul |

---

## 10. Punerea în funcțiune

### 10.1 Lista ta de pași, în ordine (meniurile theMarketer apar în engleză)

Ordinea urmează comenzile pe ora ta de muncă (`review_feasibility.md` §4) și condițiile legale: fiecare flux pornește doar după verificările lui. În total ~11–12 ore în prima lună.

**Ziua 1 (~2–2,5 ore): oprim ce strică**

1. **Automation** (lista): oprești cu comutatorul **„Remind customers to reorder”** (`6862b6757163af43b901e1ed`), **„Cart abandonment similar products”** (`696f6cd3a6575726ba0b55e8`), **„Bounce follow-up”** (`696f6c923e7112961f0096da`) și **„Inactivity behavior”**.
2. **Automation:** deschizi wishlist-ul și automatizările fără trimiteri din ianuarie (refs 1, 2, 5, 8), notezi declanșatorul și blocurile, apoi le arhivezi.
3. **Reparații rapide**, până la refacere:
   - „Cart abandonment”: „Start of automation” > „Enable frequency capping” = 7 zile și „Exclude contacts who have not exited…” pornit; la „Time delay” dinaintea E2, „Delay until a specific time of the day” = 19:00; subiectele: E1 „Ce ai pus în coș e tot acolo”, E2 „Bine de știut înainte să comanzi”; în blocul de coș oprești prețul vechi, dacă blocul are opțiunea (§4.0).
   - „Product follow-up”: dacă editorul are filtrul „Automation activity” pe emailul de coș (§4.4), îl repari: Filter „Buyer in the last 3 days” la început, filtrul pe emailul de coș, capping 14 zile, „Delay until a specific time of the day” = 18:30, subiect „Te ajutăm să alegi?”, ștergi al doilea email. **Dacă filtrul nu există, îl oprești** până în luna 2.
   - „Welcome series 2”: Filter „Buyer in the last 1 day” înainte de E2; subiectul E1 „Codul tău de 5 % e aici” (fără URL).
   - „Cross sell”: „Delay until a specific time of the day” = 18:30 (îl oprești în săptămâna 1, când pornește 4.6).
4. **Settings > Email setup:** intervalul **Smart Sending = 24 de ore** (dacă maximul permis e mai mic, pui maximul și notezi valoarea). **Settings > Cleanup subscribers:** oprești curățarea automată (§3.4).
5. **Settings > SMS > Quiet hours:** From **20:00**, To **10:00**. Intervalul Smart Sending pe SMS: 168 de ore, dacă e permis.
6. **Campaigns:** arhivezi cele 14 ciorne (inclusiv „Super Black Friday SMS”, „30% summer”, „dsfdf”). **Campaigns > Automated Scheduling:** verifici că e oprit (ar alege singur subiecte și produse, fără verificarea mențiunilor).
7. **DNS:** doar pasul 1 de la §9.1 (ștergerea DMARC-ului în plus, ~5 minute). Pașii 2–4 îi faci în săptămâna 2.
8. **Shopify:** Apps > Messaging > Automations: toate oprite; Shopify Forms și Pop Convert: niciun pop-up activ; notificările de comandă rămân pornite. **Settings > Checkout > Marketing options:** verifici că bifa de abonare prin email apare la checkout, nebifată, pe telefon și pe desktop, și îi pui textul nou de la §8.5 (azi n-a adus niciun abonat din 41 de clienți noi).

**8b. Trackingul și politica.** Verifici, cu bannerul de cookie-uri, că scriptul theMarketer se încarcă **doar după acordul pentru cookie-uri de marketing** (în fereastră privată: fără acord, în theMarketer nu apare niciun eveniment „view_product” sau „add_to_cart”). În politica de confidențialitate verifici că scrie:
- theMarketer este persoana împuternicită pentru email, SMS și trackingul de pe site;
- folosim produsele văzute, coșul și categoriile cumpărate pentru emailuri personalizate;
- te poți opune oricând acestei profilări;
- cât timp păstrăm datele (§3.4).

**Fluxurile 4.2–4.4 (checkout, coș, navigare) nu pornesc înainte de această verificare.** Dacă scriptul se încarcă fără acord, oprești și „Cart abandonment” și „Product follow-up” până se repară bannerul.

**Săptămâna 1 (19–25.10, ~3 ore): fluxurile după comandă și fundația**

9. **Înainte de orice flux cu blocuri de produs:** Claude aplică prin API excluderea celor 12 produse cu nume de efect din recomandări; tu verifici în editor că blocurile nu arată prețul vechi (testul cu Creamy Rice, §4.0).
10. **Reaprovizionare 2026** (§4.7): fără capping, smart sending pornit, marți, vineri și sâmbătă la 10:00, cu testul pe 2 produse.
11. **Client existent** (§4.6): pornești noul flux și, în același minut, oprești „Cross sell”.
12. **Șablonul interimar** (§7.4): HTML-ul newsletterelor, deja testat, cu subsolul comun de la §7.3, pentru fluxurile noi. Șablonul master complet vine în luna 2.
13. **Segmentele [API]** le creez eu (§6); îți trimit numărul de contacte din fiecare.
14. **Abonații importați** (§9.2): verific prin API dovada acordului celor 581 și pun tagul `acord-nedovedit` celor fără dovadă; îți trimit cifrele.
15. **Sincronizarea, etapa 3** (~800 de contacte): doar contactele care trec cele trei verificări de la §9.3, cu regula: păstrăm doar acordurile SMS existente și anulăm SMS-ul pus de import. Apoi reactivarea pe loturi (§9.3).
16. Newsletterul din 25.10: verifici că e programat, cu audiența și excluderile din §5.

**Săptămâna 2 (26.10–01.11, ~4 ore): Welcome, formulare, coș**

17. **Double opt-in** (§8.1), doar după ce sincronizarea s-a terminat și după cele două teste pe surse; apoi testul cu o adresă personală.
18. **Welcome** (§4.1, 4 emailuri), **pop-up-urile** (§8.2) și **formularele embedded** (§8.3), cu textele noi de acord: construiești, trimiți teste, pornești noul flux și oprești „Welcome series 2” în același minut.
19. **Fluxul de coș** refăcut (§4.3, varianta C din §4.2) și **navigarea** (§4.4, doar cu filtrul pe emailul de coș), după pasul 8b.
20. **DNS:** pașii 2–4 de la §9.1, apoi DMARC pasul 6 și Google Postmaster (§9.1).

**Săptămâna 3 (02–08.11, ~2 ore): recâștigarea**

21. **Recâștigare** (§4.9, 2 emailuri). Ma 03.11: campania „Recâștigare · restanțe (1)”, pregătită de Claude.
22. Ramura separată de checkout (§4.2, varianta A sau B), doar dacă editorul are filtrul pe evenimentul de checkout.

**Săptămâna 4 (09–15.11): curățenie**

23. Ma 10.11: **Sunset #1** (§4.10); cauți șablonul de stoc revenit (§4.12).
24. **Decizii proprietar** rămase (lista din „Pe scurt”, punctul 6).

**Luna 2 (16.11–15.12):** **Client nou** (§4.5, 3 emailuri, o singură variantă, ~1,5 ore); **VIP** (§4.11); **stoc revenit** (§4.12); **șablonul master** complet, testat pe Apple Mail iOS, Gmail Android și Outlook desktop (§7.4).

**Înainte de primul SMS:** verificarea acordului SMS de la §3.3 (Claude), apoi doar segmentul „SMS · Acord dovedit”.

**Lunar:** pe 1 ale lunii, raportul de 5 cifre (§2.6); prima marți, sunset; tagurile `email-inactiv` (14 zile după sunset) și scoaterea tagului `reactivare-2026-10` la cei confirmați; verificarea pe 20 de contacte a țintei „3 în 7 zile” (§3.1, P5); o dată pe trimestru, notele și numărul de recenzii din emailuri.

### 10.2 Ce am făcut deja prin API (15.10.2026)

| Ce | Detaliu | Unde e documentat |
|---|---|---|
| 4 audituri, doar citire | campanii, automatizări, audiență și livrabilitate, catalog | fișierele `audit_*.md` din acest folder |
| Interval de recumpărare la 31 de produse | de la 0 la valoarea din etichetă (de ex. Prime Whey 2 kg 60, Creapure® 90, Creamy Rice 20) | `audit_catalog.md` §6 |
| 121 de produse excluse din recomandări | îmbrăcăminte, accesorii, shakere, 2 produse-cadou; rămân active în catalog | `audit_catalog.md` §7 |
| Sincronizarea abonaților Shopify, etapele 0–2 (alt job) | +26 de abonați; taguri `sync-shopify-2026-10` (23), `reactivare-2026-10` (3, test), `shopify-fara-nume-fara-comenzi` (2); SMS pus din greșeală de import anulat la 8 contacte; etapa 3 (~800) neexecutată | `themarketer/sync_report.md` |
| Newsletterele 18.10–29.11 (alt job) | 7 ediții HTML gata, cu UTM `newsletter-AAAA-LL-ZZ`; programarea în theMarketer e în lucru (la 15.10 seara nu apar încă programate) | `themarketer/newsletter/plan.json` |
| **Ce nu am făcut** | nicio automatizare modificată (API-ul nu are acces la editorul de automatizări), niciun segment creat, nicio campanie trimisă, niciun cod de reducere, niciun contact atins de acest job | — |

### 10.3 Ce face pasul de build prin API (după aprobarea ta)

1. Creează segmentele marcate **[API]** (§6), în ordinea de la §6, și raportează numărul de contacte. Dacă „E · Implicați 180 zile” nu e evaluat până sâmbătă, 17.10, la 12:00, pune pe newsletterul din 18.10 audiența de rezervă de la §5.
2. Pune pe newsletterele programate audiența și excluderile din §5 (doar audiența, nu conținutul).
3. **Verificări de acord, doar în cifre:** cele trei verificări pe fiecare dintre cele 801 contacte de reactivat (§9.3), înainte de etapa 3; dovada acordului la cei 581 de abonați importați și tagul `acord-nedovedit` (§9.2); înainte de primul SMS, verificarea acordului SMS și tagul `acord-sms-dovedit` (§3.3). Lista nominală, dacă e nevoie, stă doar în `themarketer/private/` (chmod 700).
4. Pregătește ca **ciorne** (nimic trimis): reactivarea pe 4 loturi, „Recâștigare · restanțe” (1 și 2), „Sunset #1”, campaniile segmentate din 21.10, 28.10 și 04.11, cu șablonul interimar și UTM-urile din §2.6, și, la fiecare revenire în stoc a cremei de orez, campania de stoc revenit (§4.12). Le trimite ca test pe adresa ta.
5. **Înainte de primul flux cu recomandări:** exclude din recomandări cele 12 produse cu nume de efect (§4.0). La cererea ta: dezactivează cele 70 de produse vechi WooCommerce; setează intervalele rămase (Omega-3, Ashwagandha, L-carnitină, taurină) după ce confirmi doza.
6. Lunar: raportul de 5 cifre și tagurile de sunset; la 30 de zile după fiecare lot de reactivare, scoaterea tagului `reactivare-2026-10` la cei care au dat click sau au comandat.

### 10.4 Planul pe 30, 60 și 90 de zile, cu teste A/B

| Perioadă | Ce trebuie să fie gata | Teste | Ținta lunii (bază, cu atingere email) |
|---|---|---|---|
| **Zilele 1–30** (16.10–15.11) | Opririle din ziua 1, DMARC-ul dublat, bifa de la checkout, verificarea trackingului; reaprovizionarea și client existent; segmentele; Welcome, DOI, pop-up-urile și formularele; coșul și navigarea; recâștigarea; reactivarea | **T1** subiectul newsletterului: întrebare vs. afirmație (fără emoji în ambele), 50/50 la fiecare ediție | ~10 în noiembrie |
| **Zilele 31–60** (16.11–15.12) | Client nou, VIP, stoc revenit, sunset, șablonul master; primul raport lunar; DMARC cu `rua` | T1 continuă; **T4** ora: miercuri 19:30 vs. „theMarketer optimal time” (criteriul „buying”), 50/50 la fiecare campanie segmentată | ~15 în decembrie |
| **Zilele 61–90** (16.12–15.01) | Optimizare după cifre; DMARC `p=quarantine` treptat; testul de incrementalitate (10 % control la newsletter, comparația de recumpărare la reaprovizionare); pagina „mai rar” | concluzia pentru T1 și T4, după 8 săptămâni cumulate | ~20 în ianuarie |

**Reguli pentru teste:** la volumul nostru, ca să deosebești un CTR de 1,0 % de unul de 1,5 % (putere 80 %, α = 0,05) îți trebuie ~7.700 de destinatari pe variantă; un segment de 650 împărțit 50/50 dă 3–8 click-uri pe variantă. De aceea am renunțat la testele T2, T3, T5, T6, T7 și T8 din prima versiune: diferențele ar fi zgomot. T1 și T4 rămân, dar **cumulate**: fiecare trimitere se împarte 50/50, timp de 8 săptămâni, iar concluzia se trage la final, pe click-uri unice și pe comenzile UTM însumate. Testul A/B îl pornești la pasul de subiect al campaniei; când poți alege criteriul, alegi **click-urile**, nu deschiderile. Restul schimbărilor le faci pe bază de bun-simț, nu pe bază de test. Fiecare test se notează (data, variantele, click-uri, comenzi, concluzia) într-un jurnal pe care îl țin eu în acest folder.

---

## Anexa A. Surse

**Documentația theMarketer** (centrul de ajutor help.themarketer.com răspunde cu 403 la citire automată; am folosit knowledge base-ul public de pe themarketer.com):

- Welcome series, „+ Create journey”, „Start of automation”, „Time delay”, „Delay until a specific time of the day”, filtrul „Purchased from”: https://themarketer.com/resources/knowledge-base/how-to-create-an-automated-welcome-series
- Coș abandonat, „Cart related”, „Run flow”, „Enable frequency capping”, „Exclude contacts who have not exited this automation flow yet.”, „Buyer in the last X days”, SMS în fluxuri: https://themarketer.com/resources/knowledge-base/how-to-create-an-automated-cart-abandonment-series
- Reaprovizionare, „Post Purchase”, „Remind customers to reorder”, „Delay by product recurrence”, intervalul pe produs (E-commerce > Products > Recurrence): https://themarketer.com/resources/knowledge-base/how-to-set-up-automated-replenishment-emails
- Smart Sending (Settings > Email setup; „Skip recently messaged contacts”; „Enable smart sending” în automatizări; interval implicit 1 oră): https://themarketer.com/resources/knowledge-base/what-is-themarketer-smart-sending
- Oboseala abonaților (scorul „Fatigue”): https://themarketer.com/resources/knowledge-base/subscriber-fatigue
- Coduri de reducere în emailuri (blocul „Discount”, coduri multi-use și unique): https://themarketer.com/resources/knowledge-base/how-to-add-discount-codes-to-your-emails
- SMS quiet hours (implicit 22:00–09:00, Settings > SMS): https://themarketer.com/resources/knowledge-base/how-to-edit-sms-quiet-hours
- Pop-up (Audience > Signup forms; „Page landing”, „Exit intent”, „Scroll depth”, „Click count”, „Inactivity”; „Tag contacts”): https://themarketer.com/resources/knowledge-base/how-to-create-a-popup-form
- Formular embedded („Form code”, mesaj de confirmare cu double opt-in): https://themarketer.com/resources/knowledge-base/how-to-create-an-embedded-form
- Optimal time (criterii „opening” și „buying”): https://themarketer.com/resources/knowledge-base/themarketer-optimal-time
- Best specific time: https://themarketer.com/resources/knowledge-base/themarketer-best-specific-time
- Recomandări de produs (11 tipuri: „Recommended For You”, „Frequently Bought Together”, „Others You May Like” etc.): https://themarketer.com/resources/knowledge-base/personalized-product-grid-recommendation
- Automated Scheduling (newsletter automat cu AI): https://themarketer.com/resources/knowledge-base/how-to-set-up-automated-scheduling
- Segmente (Audience > Segments > Create segment): https://themarketer.com/resources/knowledge-base/how-to-create-a-segment
- Integrarea Shopify („Double opt-in setting”, feedul de produse): https://themarketer.com/integrations/shopify
- Double opt-in (glosar): https://themarketer.com/resources/glossary/double-opt-in
- Funcționalități (welcome, coș abandonat, alerte de preț, stoc revenit, aniversări, loialitate): https://themarketer.com/features/marketing-automation
- Curățarea abonaților (contactul curățat e dezabonat): https://themarketer.com/resources/knowledge-base/cleaning-up-subscribers
- Landing pages: https://themarketer.com/resources/knowledge-base/how-to-create-and-edit-landing-pages
- Test A/B pe campanii (blog theMarketer; câștigătorul ales automat după o perioadă): https://blog.themarketer.com/how-to-run-an-email-split-test/ și https://themarketer.com/resources/knowledge-base/how-long-should-your-subject-lines-be

**Benchmark-uri:** Klaviyo, raportul 2024 (mediana ratei de comandă pe fluxuri 1,71 %, primii 10 % 5,71 %): https://resources.klaviyo.com/2024-benchmark-report/p/1 · Klaviyo, benchmark-uri pe industrie (fluxuri vs. campanii, click 5,58 % vs. 1,69 %): https://www.klaviyo.com/uk/marketing-resources/email-benchmarks-by-industry · Klaviyo, click pe tip de flux și rata medie de comandă la coș (3,33 %): https://www.klaviyo.com/blog/abandoned-cart-benchmarks

**Reguli și surse noi din revizuire:** prețul pe unitate în publicitatea pentru vânzarea la distanță (HG 947/2000): https://www.avocatnet.ro/articol_13012/Modalitatea-de-indicare-a-preturilor-Reglementare-si-sanctiuni.html · UTM pierdut la redirectul Shopify (nedocumentat oficial, de testat): https://community.shopify.dev/t/passing-utms-using-storefront-api-and-graphql/1562

**Date și reguli interne:** `review_legal.md`, `review_feasibility.md`, `review_work/funnel.py`, `top50/legal_top50.md`, `audit_campaigns.md`, `audit_automations.md`, `audit_audience.md`, `audit_catalog.md`, `agency_audit/audit.txt`, `email/brief_legal.md`, `email/brief_store.md`, `email/reviews.md`, `top50/label_facts.md`, `blog-automation/GHID-REDACTIONAL.md`, `email/doc_shopify_full.md`, `themarketer/sync_report.md`, `themarketer/newsletter/plan.json`. Verificări live azi: `list_campaigns` (programate și ciorne), `list_segments`, `list_products`, `get_audience_options` (categoriile și produsele pentru segmente).

## Anexa B. Ce există în theMarketer și ce rămâne de confirmat pe ecran

| Funcționalitate | Există? | Unde | Sursa |
|---|---|---|---|
| Welcome | da | Automation > + Create journey > New subscribers > Welcome series | KB welcome |
| Coș abandonat (exact și produse similare) | da | Cart related > Cart abandonment / Cart abandonment similar products | KB coș |
| Checkout abandonat | **neconfirmat** ca șablon; evenimentul `initiate_checkout` ajunge în theMarketer (~40 de contacte identificate pe lună) | implicit în fluxul de coș (varianta C, §4.2); ramură separată doar cu filtru pe eveniment, nu pe „Funnel” | `get_integration_health`, `analyze_audience` |
| Abandon navigare și abandon site | da, în cont („Product follow-up”, „Bounce follow-up”) | lista Automation | contul |
| Post-cumpărare, cross-sell | da („Cross sell” în cont) | Post Purchase | contul |
| Reaprovizionare pe produs | da | Post Purchase > Remind customers to reorder + Recurrence pe produs | KB reaprovizionare |
| Win-back | da, ca „Inactivity behavior” (pe vizite); îl facem pe comenzi, din Post Purchase | Post Purchase | contul |
| Aniversare | menționat în funcționalități; câmpul e gol | — | pagina de funcționalități |
| Scădere de preț, stoc revenit | menționate („price alerts”, „back-in-stock alerts”); șabloanele **neconfirmate** | de căutat în + Create journey | pagina de funcționalități |
| Loialitate | da (puncte sau niveluri), neconfigurat; în segmente cere Ecommerce Pro | Loyalty | KB loialitate, `get_audience_options` |
| Declanșatori pe tag sau segment | tag: da (schimbarea tagurilor pornește automatizările de tag); segment: **neconfirmat** | — | documentația API |
| Smart sending / limită de frecvență | da: interval minim pe canal (implicit 1 oră) și comutator pe campanie și pe automatizare; **nu** există limită de N mesaje în X zile și nici prioritate între fluxuri; capping-ul pe automatizare blochează re-intrarea, nu amână emailul | Settings > Email setup; Start of automation | KB smart sending, KB coș, KB reaprovizionare |
| Double opt-in | da (setare în integrarea Shopify); calea exactă și aplicarea doar la formulare **neconfirmate** (se pornește după sincronizare, cu test pe surse) | §8.1 | integrarea Shopify |
| Blocuri de recomandare | da în campanii; în automatizări **neconfirmat** | builder > blocul de produse | KB recomandări |
| Coduri dinamice | da (unique codes, doar în automatizări) | blocul Discount | KB coduri |
| Test A/B | da pe campanii; în automatizări nedocumentat | pasul de subiect al campaniei | API (`ab_test`), blog theMarketer |
| Ora optimă | da („theMarketer optimal time”, „best specific time”) | pasul de programare al campaniei | KB optimal time |
| Ore de liniște | doar SMS | Settings > SMS | KB quiet hours |
| Filtre în automatizări pe număr de comenzi, categorie, produs, segment sau tag | **neconfirmate** (documentate doar ca reguli de segment); variantele de rezervă sunt în fișe | editorul de automatizări | `get_audience_options`, KB |
| „Automation activity” > „Clicked” | **neconfirmat** (KB arată „Purchased from”) | Filter > Campaign activity | KB welcome |
| Pop-up: „ascunde pentru abonați”, reguli pe URL, câmp de acord SMS separat | **nedocumentate**; documentate: frecvența „once a week”, layout „LightBox” și „Slide-in”, limitarea pe dispozitiv | Audience > Signup forms | KB pop-up |
| Curățarea automată a abonaților | da; contactul curățat e **dezabonat** (o oprim) | Settings > Cleanup subscribers | KB curățare |

---

## Ce s-a corectat la revizie (16.10.2026)

Am aplicat cele două revizuiri din 15.10: `review_legal.md` (6 probleme blocante, 17 majore, 20 minore) și `review_feasibility.md` (punctele F1–F17, fixurile P1–P6 și recalculul). Unde se contraziceau, a câștigat reviewul juridic. De exemplu, textele de acord din formulare și din emailuri sunt cele juridice, nu variantele din reviewul de fezabilitate.

**Juridic**
- **Acord și reactivare:** cele 801 contacte de reactivat se verifică fiecare, pe trei condiții (L1, §9.3). Abonații importați fără dovada acordului sunt excluși din campanii (M11). Cei 2.203 nu primesc nici reconfirmare fără avizul unui jurist (M14). Data curățării e 10.07 peste tot (m20). Contactele suprimate au un termen de păstrare de 24 de luni (M16).
- **Texte de acord și frecvență:** pop-up-ul, footerul, blogul și bifa de la checkout descriu tot ce trimitem: „de obicei 1–2 emailuri pe săptămână” (L2). Welcome E1 și E4, sunsetul, reactivarea, recâștigarea și subsolul spun același lucru, iar „MAI RAR” promite doar ce se poate ține (M1). Un răspuns „stop” înseamnă dezabonare în cel mult 2 zile lucrătoare (m13).
- **WELCOME5:** clienții recenți primesc emailul 1, cu codul promis. Condițiile sunt peste tot „5 % la toată comanda, o singură dată per client”. Pop-up-ul spune „la următoarea comandă” și nu numește codul înainte de confirmare (L3, m8, m10).
- **Prețuri și recomandări:** niciun bloc de produs nu arată preț vechi; regula se verifică cu testul pe Creamy Rice (L4). Unde apare un preț, apare și prețul pe unitate (M9). Cele 12 produse cu nume de efect se exclud obligatoriu din recomandări (L5).
- **Tracking:** fluxurile de coș și navigare pornesc doar după verificarea cookie-urilor și a politicii de confidențialitate (L6, pasul 8b).
- **Mențiuni și descrieri:**
  - creatina are doar formularea oficială (M4);
  - mențiunea pentru magneziu iese până apare pe etichetă (M3);
  - au ieșit „sursă de carbohidrați” (M5), „să performeze mai bine” (M6) și Cluster și Kyowa® din Welcome E2 (M7);
  - Prime Whey e descris după etichetă (M8);
  - superlativele și clasamentul numerotat au ieșit (m1–m3);
  - au fost corectate returul, modul de folosire, avertismentul pentru cafeină, subsolul și „absorbție” (m4–m6, m11, m18, m19).
- **SMS:** pleacă doar la segmentul „SMS · Acord dovedit”, după verificarea fiecărui contact (M2).
- **Alte corecturi:**
  - segmentul pe extracte din plante a fost scos (M10);
  - abonații de la checkout fără comandă sunt excluși din campanii (M12);
  - emailul de stoc revenit nu mai spune „Ți-am promis” (M13);
  - P.S.-ul de Black Friday nu mai promite prețuri (M15);
  - newsletterul din 18.10 nu mai leagă magneziul de somn (M17);
  - campaniile din 04.11, 02.12 și 09.12 sunt corectate (m14, m15);
  - prenumele a fost scos din pop-up (m9).

**Fezabilitate**
- **Ținta:** scenariul de bază e ~15 comenzi last-click și ~20 cu atingere de email în ianuarie, cu scenariile prudent și optimist alături (§2). Punctul de plecare e ~7 cu atingere, iar Welcome aduce azi ~2.
- **Setări inexistente sau citite greșit:**
  - reaprovizionarea merge fără capping, cu smart sending, marți, vineri și sâmbătă (F1);
  - „prioritatea între fluxuri” nu există: am înlocuit-o cu regula orelor (F2);
  - „3 în 7 zile” e o țintă verificată lunar, nu o garanție (F3);
  - pentru checkout, varianta C e implicită (F5);
  - filtrele și setările nedocumentate au o variantă de rezervă (F4, F6–F8);
  - curățarea automată se oprește (F10);
  - segmentele de sunset și de reactivare sunt reparate (F11, F12);
  - DOI pornește după sincronizare (F13);
  - UTM-ul linkurilor WELCOME5 stă în calea de redirect (F14).
- **Presiunea pe contact:**
  - Welcome trimite în zilele 3, 6 și 10;
  - navigarea pornește doar cu filtrul pe emailul de coș;
  - campaniile îi exclud pe cumpărători 14 zile;
  - recâștigarea trimite la 75 și la 120 de zile, la 18:30;
  - în săptămâna sunsetului, campania segmentată îi exclude pe candidații la sunset;
  - verificarea lunară are o regulă de oprire (P1–P6).
- **Ordinea:**
  - reaprovizionarea și client existent pornesc în săptămâna 1;
  - client nou (3 emailuri) și VIP vin în luna 2;
  - restul DNS-ului se face în săptămâna 2;
  - până la șablonul master se folosește un șablon interimar;
  - din testele A/B rămân doar T1 și T4, cumulate (F16).

**Corecturi proprii, pentru consecvență**
- **Filtrele de recâștigare** sunt întârzierea minus o zi (74 și 119), nu 70 și 115. Altfel, un client cu două comenzi la câteva zile distanță ar primi două emailuri de recâștigare.
- **Emailul de reactivare** păstrează fraza „Dacă nu apeși nimic, nu-ți mai trimitem campanii”. Acum e adevărată, pentru că neconfirmații sunt excluși din ziua 0; în locul corecturii m16 am adăugat fraza despre coș și comenzi.
- **Textul pop-up-ului** spune în plus că urmează 3 emailuri scurte de bun venit.
- **Segmentul „P · Abonați noi”** are acum 11 zile, ca seria Welcome.
- **„MAI RAR”:** dacă editorul nu poate exclude un tag din fluxuri, fraza iese din emailuri.
