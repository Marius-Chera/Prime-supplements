# Ghidul tău theMarketer: ce faci, în ordine

**Data:** 16.10.2026 · **Pentru:** Marius Chera, Prime Sport Supplements SRL · **Cont:** theMarketer, domeniul primesupplements.ro, expeditor contact@primesupplements.ro · **Autor:** Claude

**Ce e ghidul:** lista ta de pași, în ordinea în care îi faci. La fiecare pas găsești:
- unde intri în theMarketer sau în Shopify;
- ce apeși și ce scrii;
- textul de lipit, luat cuvânt cu cuvânt din `SYSTEM.md`, unde a trecut prin reviewul juridic;
- cum verifici că a mers;
- cât durează.

Planul complet, cu motivele fiecărei decizii, e în `SYSTEM.md`. Ce am construit azi prin API e în `build_log.md`. Toate trei sunt în același folder.

**Cum îl folosești:**
- Bifezi pașii pe rând. Un pas care are nevoie de altul spune asta la început, la „Înainte”.
- Meniurile theMarketer sunt în engleză și le scriu exact cum apar în documentația lor. Pe ecran, numele pot diferi puțin.
- Unde scrie „spune-mi …”, pasul îl fac eu prin API, după ce îmi scrii.
- Când un pas spune „dacă opțiunea nu există”, folosești varianta de rezervă scrisă imediat după. Nu inventa altă variantă.

**Timp total estimat:** ~15 ore în prima lună (ziua 0 până la săptămâna 4), plus ~20 de minute pe săptămână pentru campania de miercuri; ~4 ore și 40 de minute în luna a 2-a; apoi ~30 de minute pe lună.

**Ce nu face ghidul:** nu creează coduri de reducere (singurul cod e WELCOME5, 5 %, o dată per client), nu face Black Friday și nu trimite nimic fără testul tău.

---

## Cei 5 pași cu cel mai mare efect asupra comenzilor (PRIORITATE 1)

Cifrele sunt din scenariul de bază din `SYSTEM.md` §2.3: comenzi pe lună, last-click, în ianuarie 2027.

| Pas | Ce | Când | Efect estimat |
|---|---|---|---|
| **8** | Bifa de abonare la checkout (Shopify), afișată și cu text nou | ziua 1 | Indirect, dar cel mai mare. Azi doar 20 % din cumpărători au acord de marketing și 0 din 41 de clienți noi s-au abonat la comandă. Fiecare +10 puncte procentuale înseamnă ~18 abonați noi pe lună, care primesc reaprovizionarea și campaniile |
| **12** | Fluxul „Reaprovizionare 2026” | săptămâna 1 | ~2,2 comenzi pe lună. Orice comandă livrată înainte de pornire nu va primi niciodată memento |
| **17** | O campanie segmentată pe săptămână (miercuri, 19:30), începând cu 21.10 | săptămâna 1 și apoi săptămânal | ~2,5 comenzi pe lună. Crema de orez e subiectul care vinde cel mai bine după click |
| **19** | „Welcome 2026” (confirmare + 4 emailuri), pop-up-urile noi și formularele | săptămâna 2 | ~2,3 comenzi pe lună |
| **20** | Fluxul de coș refăcut (prinde și checkout-urile) și navigarea | săptămâna 2 | ~2,3 comenzi pe lună (coș + checkout), ~0,5 navigare |

Restul pașilor fie protejează lista și reputația domeniului (fără ei, cei 5 de mai sus ar merge mai prost), fie aduc sub o comandă pe lună fiecare.

---

## Ce am făcut deja prin API (16.10.2026)

- **40 de segmente noi**, după `SYSTEM.md` §6: 35 exact după plan și 5 versiuni corectate „(v2)”. Lista cu id-uri și numărul de membri e la Anexa A și în `build_log.md`. Segmentele se actualizează singure.
- **Nu am atins** contactele, campaniile, automatizările sau cupoanele.

### Ce trebuie să știi înainte (constatări noi, de la build)

1. **Audiența de newsletter din plan e mai mică decât credeam.** „E · Implicați 180 zile” are **697** de abonați email, nu ~1.600. Dacă newsletterul ar merge doar la ei, ~600 de oameni n-ar mai primi nimic, fără să fi fost întrebați. **Recomandarea mea:** newsletterul rămâne la „toți abonații email”, cu excluderile de la pasul 0.2. Sunsetul lunar (pasul 26) îi întreabă pe cei care nu dau click și îi scoate doar pe cei care nu răspund. Asta e și regula „întâi întrebăm” din plan.
2. **Primul sunset (10.11) va întreba ~620 de oameni.** „E · Candidați sunset” are acum 626 de abonați email. La rata de click de azi, cei mai mulți vor primi tagul `email-inactiv`. Newsletterul va ajunge apoi la ~700–800 de oameni care chiar citesc. E rezultatul corect: mai puține emailuri ignorate înseamnă o livrabilitate mai bună.
3. **Reactivarea e deja în curs, altfel decât în `SYSTEM.md` §9.3** (jobul de reactivare, cu aprobarea ta):
   - 1.042 de contacte reabonate;
   - două emailuri, pe 20.10 și 27.10, la 18:30;
   - curățarea din 10.11: cine nu reacționează e dezabonat, pentru că emailurile le spun „te scoatem din listă”.

   Pașii 16 și 27 țin cont de asta. §9.3 (loturi, un singur email) nu se mai aplică.
4. **Newsletterul din 18.10 are încă subiectul și preheaderul vechi** („Magneziul seara…”, „…ce spune UE despre somn”), pe care reviewul juridic a cerut să le schimbi. Pasul 0.1, **până sâmbătă**.
5. **Cinci segmente din plan n-au mers din prima și au acum o versiune „(v2)”:**
   - interes pentru proteine și pentru vitamine: vizitele pe colecții nu ajung pe categoriile vechi;
   - reactivare confirmați și neconfirmați, checkout fără comandă: condiția „n-a dat click” prinde doar oamenii care au primit deja o campanie.

   Folosește doar variantele „(v2)”. Pe celelalte le poți șterge (pasul 0.3).

---

## Ziua 0 · până sâmbătă, 17.10, ora 12:00 (~45 min)

### Pasul 0.1 · Corectezi newsletterul din 18.10 · ~15 min

- **Unde:** Campaigns > Scheduled > „Newsletter 2026-10-18 · Magneziul seara: cum îl iei și ce doză” > Edit.
- **Ce faci:** schimbi subiectul și preheaderul (pasul „Subject”), apoi, în editorul de conținut, introducerea și o bulină. Programarea (duminică, 18:00) rămâne.
- **Ce scrii:**
  - **Subiect:** Magneziul: când îl iei și ce doză urmezi
  - **Preheader:** Ghid nou pe blog: cum alegi momentul din zi și cum citești doza de pe ambalaj.
  - **Introducerea (înlocuiește primul paragraf):** Am publicat un ghid nou despre magneziu: când îl iei, ce doză urmezi și când e bine să întrebi medicul.
  - **Ștergi bulina:** „În UE nu există o mențiune de sănătate autorizată pentru magneziu și somn.” Un email care vinde magneziu și vorbește de trei ori despre somn creează o mențiune implicită.
- **Varianta mai simplă:** îmi scrii „corectează newsletterul din 18.10” și îl corectează jobul de newsletter, prin API.
- **Verificare:** „Send test” pe adresa ta. Subiectul e cel nou, iar căutarea după „somn” în email (Ctrl+F) nu mai găsește nimic în textul scris de noi.

### Pasul 0.2 · Excluderile și smart sending pe newsletterele programate · ~25 min

- **Unde:** Campaigns > Scheduled > fiecare campanie „Newsletter 2026-…” (18.10, 25.10, 01.11, 08.11, 15.11, 22.11) > Edit > pasul cu audiența.
- **Ce faci:**
  - **Audiența rămâne „toți abonații email”** (vezi mai sus, punctul 1).
  - **Păstrezi excluderea existentă** „Reactivare 2026-10 · de confirmat (v2)” până la curățarea din 10.11 (pasul 27).
  - **Adaugi la „Exclude segments”:**
    - P · Abonați noi 11 zile (în Welcome)
    - X · Igienă (adrese de evitat)
    - X · Checkout fără comandă, neconfirmați (v2)
    - X · Acord nedovedit
    - X · Sunset suprimați
  - **Pornești** comutatorul **„Skip recently messaged contacts”**.
  - Verifici că există și newsletterul din 29.11 (HTML-ul e gata, dar azi nu apare programat). Dacă lipsește, îmi scrii.
- **Varianta mai simplă:** îmi scrii „aplică excluderile pe newslettere” și le pune jobul de newsletter, prin API (doar audiența, nu conținutul).
- **Verificare:** la fiecare newsletter, rezumatul campaniei arată cele 6 excluderi și smart sending pornit. „X · Acord nedovedit” și „X · Sunset suprimați” sunt goale azi. Se umplu singure mai târziu, deci excluderea lor e pusă din timp.

### Pasul 0.3 · (opțional) Ștergi segmentele înlocuite · ~5 min

- **Unde:** Audience > Segments.
- **Ce faci:** cauți și ștergi exact aceste 5 segmente, cele **fără** „(v2)” în nume:
  - I · Interesați proteine
  - I · Interesați vitamine
  - Reactivare 2026-10 · neconfirmați
  - Reactivare 2026-10 · confirmați
  - X · Checkout fără comandă, neconfirmați

  Nu le folosește nimic. Dacă le lași, nu se întâmplă nimic rău, dar e ușor să alegi din greșeală varianta greșită. **Nu șterge** „Reactivare 2026-10 (de confirmat)”, „Reactivare 2026-10 · de confirmat (v2)” sau „Reactivare 2026-10 – fără reacție la e-mail 1”: sunt ale jobului de reactivare.
- **Verificare:** căutarea „Interesați” arată doar 2 segmente cu „(v2)” și pe cele de creatină și cremă de orez.

---

## Ziua 1 · oprim ce strică (~2 ore și 55 min)

### Pasul 1 · Oprești 4 automatizări · ~10 min

- **Unde:** Automation (lista automatizărilor).
- **Ce faci:** cu comutatorul de pe rândul fiecăreia, oprești:
  - „Remind customers to reorder” (`6862b6757163af43b901e1ed`): trimite „Gata sa le cumperi din nou?” la 2 minute după comandă;
  - „Cart abandonment similar products” (`696f6cd3a6575726ba0b55e8`): al doilea flux de coș pe același declanșator;
  - „Bounce follow-up” (`696f6c923e7112961f0096da`): abandonul de site, trimis noaptea;
  - „Inactivity behavior”: recâștigarea la 30 de zile fără vizită, trimisă la 03:26. Fără ea, nici contactele reactivate nu mai intră aici.

  Id-ul se vede în adresa paginii când deschizi automatizarea.
- **Verificare:** cele 4 apar oprite în listă. A doua zi, raportul fiecăreia nu are trimiteri noi.

### Pasul 2 · Arhivezi automatizările moarte · ~20 min

- **Unde:** Automation > wishlist-ul și automatizările fără trimiteri din ianuarie (refs 1, 2, 5, 8; sunt cele de care vorbește agenția la „automatizări incomplete”).
- **Ce faci:** le deschizi pe rând, faci o captură de ecran cu declanșatorul și blocurile, apoi le arhivezi. Dacă vreuna are un bloc „Unsubscribe” sau „Add tag inactivi”, o oprești prima.
- **Verificare:** nu mai apar în lista automatizărilor active. Capturile le păstrezi într-un folder.

### Pasul 3 · Reparații rapide, până la refacere · ~45 min

- **Unde:** Automation > fiecare flux > editorul (blocurile „Start of automation”, „Time delay”, „Send email”, „Filter”).
- **Ce faci:**
  - **„Cart abandonment”** (`6862b5c5fd9dc29f6a0f5a6f`):
    - în „Start of automation”: „Enable frequency capping” = 7 zile și „Exclude contacts who have not exited this automation flow yet.” pornit;
    - la „Time delay” dinaintea emailului 2: „Delay until a specific time of the day” = 19:00;
    - subiectele: E1 `Ce ai pus în coș e tot acolo`, E2 `Bine de știut înainte să comanzi`;
    - în blocul de coș oprești prețul vechi („old price” / „full price”) și eticheta „-X %”, dacă blocul are opțiunea.
  - **„Product follow-up”** (`696f6e585ade8453f10815b6`):
    - **dacă** la „Filter” există „Automation activity” cu alegerea emailului 1 din „Cart abandonment”: pui la început Filter > E-commerce data > Shopper status > „Buyer in the last 3 days” → ies, apoi filtrul „a primit emailul 1 de coș în ultimele 2 zile” → ies; capping 14 zile; „Delay until a specific time of the day” = 18:30; subiectul `Te ajutăm să alegi?`; ștergi al doilea email;
    - **dacă filtrul nu există**, oprești fluxul până în luna 2.
  - **„Welcome series 2”** (`696f6c4ff8dbc4c7200f28c9`): Filter „Buyer in the last 1 day” → ies, imediat înainte de emailul 2; subiectul E1 `Codul tău de 5 % e aici` (fără URL în subiect).
  - **„Cross sell”** (`696f6e6442d74696320ee134`): „Delay until a specific time of the day” = 18:30. Îl oprești la pasul 13.
- **Verificare:** la fiecare flux, „Send test” la emailul schimbat. Subiectul e cel nou, iar în blocul de coș nu apare niciun preț tăiat.

### Pasul 4 · Smart sending și curățarea automată · ~10 min

- **Unde:** Settings > Email setup, apoi Settings > Cleanup subscribers.
- **Ce faci:**
  - **Smart Sending:** intervalul la **24 de ore**. Dacă maximul permis e mai mic, pui maximul și îmi scrii valoarea.
  - **Cleanup subscribers:** oprești curățarea automată. Ea **dezabonează** contactele după 24 de emailuri nedeschise, iar sunsetul nostru face aceeași treabă fără dezabonare.
- **Verificare:** după salvare, valoarea rămâne 24 de ore și curățarea apare oprită.

### Pasul 5 · Orele de liniște pentru SMS · ~5 min

- **Unde:** Settings > SMS > „Quiet hours”.
- **Ce faci:** From **20:00**, To **10:00**. Dacă există un interval Smart Sending pe SMS, îl pui la **168 de ore** (un SMS pe săptămână). Dacă valoarea nu e permisă, regula rămâne o țintă, pe care o verific lunar.
- **Verificare:** orele salvate apar în pagină.

### Pasul 6 · Curățenie în campanii · ~15 min

- **Unde:** Campaigns > Drafts, apoi Campaigns > Automated Scheduling.
- **Ce faci:**
  - **Arhivezi ciornele vechi** (14, printre ele „Super Black Friday SMS”, „30% summer”, „dsfdf”). **Nu atingi:**
    - cele două ciorne „NU TRIMITE – test reactivare…”;
    - campaniile al căror nume începe cu „Newsletter 2026-” sau „Reactivare 2026-10”.
  - **Automated Scheduling:** verifici că e oprit. Altfel alege singur subiecte și produse, fără verificarea mențiunilor de sănătate.
- **Verificare:** în Drafts rămân doar ciornele de test ale reactivării. Automated Scheduling apare oprit.

### Pasul 7 · DMARC-ul dublat · ~10 min

- **Unde:** la registrarul domeniului (sau la cine îl administrează), zona DNS, înregistrările TXT pentru `_dmarc.primesupplements.ro`.
- **Ce faci:** sunt două. **Ștergi** `v=DMARC1; p=none;` și **o păstrezi** pe `v=DMARC1; p=none; adkim=r; aspf=r; pct=0;`. Două înregistrări DMARC înseamnă, după standard, că domeniul nu are deloc DMARC valid.
- **Verificare:** după ~1 oră, îmi scrii „verifică DMARC” și verific DNS-ul public și validarea domeniului în theMarketer.

### Pasul 8 · Bifa de abonare la checkout · PRIORITATE 1 · ~20 min

- **Unde:** Shopify Admin > Settings > Checkout > Marketing options > Email. Textul îl schimbi din Online Store > Themes > ⋯ > Edit default theme content, căutând „Email me with news and offers”. Dacă nu-l găsești acolo, e în Settings > Languages, la traducerile pentru checkout.
- **Ce faci:** bifa de abonare prin email e **afișată** și **nebifată implicit**. Îi schimbi textul.
- **Ce scrii (textul bifei):** Vreau emailurile Prime: ghidul săptămânal, noutăți și oferte (de obicei 1–2 pe săptămână).
- **De ce e prioritar:** din 3.174 de cumpărători, doar 20 % au acord de marketing. Într-un eșantion de 100 de comenzi, 0 din 41 de clienți noi s-au abonat la checkout. Fără acord, cumpărătorii nu primesc nici reaprovizionarea, nici campaniile. Efectul se adună lună de lună.
- **Verificare:**
  1. Pe telefon și pe desktop, pui un produs în coș, mergi la checkout și te uiți: bifa apare, nebifată, cu textul nou.
  2. După 7 zile, îmi scrii „câți clienți noi s-au abonat la checkout?”. Ținta e ~15 % din clienții noi; azi e ~0 %.

### Pasul 9 · Shopify: un singur sistem de email și de pop-up · ~10 min

- **Unde:** Shopify Admin > Apps.
- **Ce faci:**
  - **Messaging > Automations:** toate oprite (decizia ta: emailurile de marketing pleacă doar din theMarketer). Notificările de comandă și de livrare din Shopify **rămân pornite**: sunt tranzacționale.
  - **Forms:** dacă există un pop-up, Turn form off, apoi oprești „Forms” și din Online Store > Themes > Customize > App embeds.
  - **Pop Convert:** verifici că nu afișează niciun pop-up.
- **Verificare:** într-o fereastră privată, pe site, apare doar pop-up-ul theMarketer (sau niciunul, dacă trackingul așteaptă acordul de cookie-uri, pasul 10).

### Pasul 10 · Trackingul după acordul de cookie-uri și politica de confidențialitate · ~30 min

- **De ce:** fluxurile de coș, checkout și navigare spun „te-ai uitat la acest produs”. Asta e legal doar dacă trackingul are acord pentru cookie-uri, iar politica descrie profilarea. **Pașii 19 și 20 nu pornesc înainte de acest pas.**
- **Ce faci:**
  1. Într-o fereastră privată, pe primesupplements.ro, **nu** accepți cookie-urile de marketing. Te uiți la 2–3 produse și pui unul în coș.
  2. Îmi scrii „verifică trackingul fără acord”. Mă uit în theMarketer dacă au apărut evenimente `view_product` sau `add_to_cart` din acea sesiune. Nu trebuie să apară.
  3. În Shopify Admin > Settings > Policies > Privacy policy verifici că scrie:
     - theMarketer este persoana împuternicită pentru email, SMS și trackingul de pe site;
     - folosim produsele văzute, coșul și categoriile cumpărate pentru emailuri personalizate;
     - te poți opune oricând acestei profilări;
     - cât timp păstrăm datele (24 de luni pentru contactele care nu mai reacționează, `SYSTEM.md` §3.4, de confirmat cu un jurist).
- **Dacă trackingul pornește fără acord:** oprești „Cart abandonment” și „Product follow-up” până se repară bannerul de cookie-uri.
- **Verificare:** eu îți confirm 0 evenimente fără acord. Politica are cele 4 puncte.

---

## Setări comune pentru toate fluxurile (le aplici la pașii 12–31)

Le citești o dată. La fiecare flux de mai jos scriu doar ce e diferit.

- **„Start of automation”:** „Include imported contacts” **oprit** (unde apare), ca importurile din Shopify să nu pornească fluxuri. Smart sending, „Run flow” și capping-ul sunt la fiecare flux.
- **Fiecare „Time delay”:** pornești **„Delay until a specific time of the day”**, cu ora din fișa fluxului (10:00, 18:30 sau 19:00). Singura excepție e emailul 1 de coș, care pleacă la o oră de la abandon. Dacă editorul aplică ora fixă după durata aleasă, emailul pleacă a doua zi la acea oră; e în regulă.
- **După fiecare „Time delay”:** un **„Filter”** > „E-commerce data” > „Shopper status” > **„Buyer in the last X days”**, cu X din fișă. Cine a comandat iese din flux.
- **Fiecare „Send email”:**
  - subiectul și „Preview text” (preheaderul) din textul de lipit;
  - expeditor „Prime Supplements” <contact@primesupplements.ro>, reply-to contact@primesupplements.ro;
  - **„Campaign UTM”:** `utm_source=themarketer`, `utm_medium=email` (nu `automation`), `utm_campaign=` codul din titlul emailului (de exemplu `flow-reorder-e1`), `utm_content=buton`;
  - **„Email content”:** pornești de la șablonul interimar (pasul 14).
- **Fără prenume în subiect.** În corp salutul e simplu, „Salut!”. Prenumele din theMarketer e ghicit din adresa de email.
- **Fără preț vechi:** în toate blocurile de produs oprești „old price” / „full price” și eticheta „-X %”. Dacă blocul nu permite, scoți prețul din bloc. Unde apare un preț, apare și prețul pe unitate (de exemplu „360 lei · 180 lei/kg”).
- **Produsele cu nume de efect** (Cluster Insulin Bomb, Recovery Glutamin, Recovery BCAA, Fat Burning Booster Shot, Thermo Core, Energy Pump Shot, Water Out, Testo Revive, Cardio Calm, Liver Protect) nu apar în textele noastre. Apar cel mult în blocurile cu ce a ales omul (coș, produs văzut).
- **Singurul cod:** WELCOME5, în blocul **„Discount”**, cu „Used code type” = multi-use, valoarea 5 %. Fără coduri unice generate de theMarketer.
- **Subsolul:** cel de la pasul 14. În fluxurile cu blocuri dinamice de produs (coș, checkout, navigare, reaprovizionare, client existent, recâștigare) adaugi sub el rândul pentru cafeină:
  > Dacă produsul conține cafeină: nu se recomandă copiilor sau femeilor însărcinate, și nici persoanelor sub 18 ani, femeilor care alăptează sau persoanelor sensibile la cafeină. Cantitatea de cafeină pe porție e pe etichetă; nu o combina cu alte surse de cafeină.
- **Linkuri:** butoanele duc la `/products/…` sau `/collections/…`, niciodată la homepage. Doar logoul duce la homepage.
- **Cum schimbi un flux fără să deranjezi pe nimeni:**
  1. construiești fluxul nou și îl salvezi oprit;
  2. trimiți câte un test din fiecare email;
  3. în același minut pornești fluxul nou și îl oprești pe cel vechi;
  4. pe cel vechi nu-l ștergi: îl arhivezi.

---

## Săptămâna 1 · 19–25.10 · fluxurile după comandă și fundația (~3 ore)

### Pasul 11 · Recomandările fără produsele cu nume de efect · ~15 min

- **Ce faci:** îmi scrii „exclude cele 12 produse din recomandări”. Le exclud prin API (`audit_catalog.md` §9.3). Dacă excluderea s-ar aplica și pe site și nu vrei asta, nu folosești blocuri de recomandare în emailuri, ci 3 carduri statice: Prime Whey 2 kg, Creatină Creapure®, Creamy Rice tort de ciocolată.
- **Testul prețului vechi:** în editorul de automatizări, într-un bloc de produs, pui Creamy Rice tort de ciocolată și trimiți un test. Feedul are azi 60 lei, cu prețul întreg 65 lei.
- **Verificare:** emailul de test arată doar „60 lei”, fără „65 lei” tăiat și fără „-8 %”. Dacă apare prețul tăiat și blocul nu-l poate ascunde, în toate fluxurile folosești blocuri fără preț.

### Pasul 12 · „Reaprovizionare 2026” · PRIORITATE 1 · ~60 min

- **Înainte:** pasul 1 (vechiul „Remind customers to reorder” oprit) și pasul 11.
- **Unde:** Automation > „+ Create journey” > Post Purchase > **„Remind customers to reorder”**. Numele fluxului: „Reaprovizionare 2026”.
- **Intervalele:** sunt deja puse prin API la 31 de produse (de exemplu Prime Whey 2 kg 60 de zile, Creapure® 90, Creamy Rice 20). Le vezi în E-commerce > Products > produsul > Recurrence. Produsele fără interval nu primesc memento.
- **„Start of automation”:**
  - Order status **„fulfilled”**;
  - Run flow **„Multiple times”**;
  - „Enable frequency capping” **oprit**;
  - „Exclude contacts who have not exited this automation flow yet.” **oprit**;
  - „Enable smart sending” **pornit**;
  - „Include imported contacts” oprit.
- **„Time delay”:** „Delay by product recurrence” **pornit**, plus „Delay until a specific day(s) of the week” = **marți, vineri și sâmbătă**, la **10:00**.
- **Schema:**

```text
Start (comandă fulfilled) → Time delay: Delay by product recurrence (until marți, vineri sau sâmbătă, 10:00)
→ Filter: Buyer in the last 14 days → ies → Send email 1
```

- **UTM:** `utm_campaign=flow-reorder-e1`. Subsolul are rândul pentru cafeină (Combat Pro are interval).

#### Text de lipit · Email 1 · Îți mai ajunge ce ai comandat? · `flow-reorder-e1` (SYSTEM.md §4.7.1)

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

- **Testul:** faci o comandă internă cu 2 produse cu intervale diferite și o marchezi „fulfilled”. A doua zi îmi scrii „verifică reaprovizionarea”. Mă uit cu `get_entered_automation` dacă au intrat una sau două intrări și la data programată a emailului.
- **Verificare:** fluxul e pornit, testul arată o intrare pentru fiecare produs cu interval, iar „Send test” arată blocul cu produsul, fără preț tăiat. **Pornește-l în săptămâna 1:** orice comandă livrată înainte nu va primi niciodată memento.

### Pasul 13 · „Client existent 2026” (înlocuiește „Cross sell”) · ~40 min

- **Unde:** Automation > „+ Create journey” > Post Purchase > **„Cross sell”**, folosit ca schelet. Numele fluxului: „Client existent 2026”.
- **„Start of automation”:**
  - comandă „fulfilled”;
  - Run flow „Multiple times”;
  - „Enable frequency capping” = **30 de zile**;
  - smart sending **pornit**.
- **Filtrul de după pauză:**
  - segmentul de sistem **„Shopping - Repeat buyers”**, dacă filtrul acceptă segmente;
  - altfel, numărul de comenzi > 1;
  - **dacă nu există niciunul**, nu construiești fluxul acum. Oprești totuși „Cross sell”, iar în luna 2 faci fluxul unic „După comandă” (pasul 30).
- **Schema:**

```text
Start (comandă fulfilled) → Time delay 14 zile, until 18:30
→ Filter: Shopping - Repeat buyers (sau comenzi > 1; altfel ies) → Filter: Buyer in the last 13 days → ies → Send email 1
```

- **UTM:** `utm_campaign=flow-client-existent-e1`.

#### Text de lipit · Email 1 · O idee pentru următoarea comandă (ziua 14, 18:30) · `flow-client-existent-e1` (SYSTEM.md §4.6.1)

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

- **În același minut:** pornești „Client existent 2026” și oprești „Cross sell” (`696f6e6442d74696320ee134`).
- **Verificare:** „Send test” arată 3 produse recomandate, fără preț tăiat și fără produse cu nume de efect. După 14 zile, raportul fluxului are primele trimiteri, toate la 18:30.

### Pasul 14 · Șablonul interimar · ~30 min

- **Ce e:** un singur aspect pentru toate emailurile noi din fluxuri, până la șablonul master din luna 2 (pasul 33). Copiază aspectul newsletterelor pregătite de job, care sunt deja testate.
- **Ce faci:** în editorul unui email (drag & drop) construiești:
  - **antetul:** textul „PRIME SUPPLEMENTS”, cu o linie roșie de 3 px (#e91d23) dedesubt;
  - **corpul:** alb (#ffffff), pe fundal #f0f0f0, lățime 600 px, text #1a1a1a, Arial 16 px;
  - **un singur buton:** #e91d23, text alb, 18 px bold, colțuri rotunjite de 6 px;
  - **subsolul:** fundal #1a1a1a, text #f0f0f0, cu textul de mai jos.

  Îl salvezi ca șablon („Save as template”) cu numele **„Prime · Interimar 2026”**. Dacă editorul nu are salvare ca șablon, faci primul email complet și îl duplici pentru celelalte.

#### Text de lipit · Subsolul comun (SYSTEM.md §7.3)

> Primești acest email pentru că te-ai abonat la emailurile Prime Supplements pe primesupplements.ro. Vrei mai puține emailuri? Răspunde cu „MAI RAR” și îți trimitem doar ghidul de duminică și mementourile legate de coșul și comenzile tale. Nu mai vrei deloc? [Dezabonare]({{unsubscribe_link}}) · [Politica de confidențialitate](https://primesupplements.ro/policies/privacy-policy)
>
> PRIME SPORT SUPPLEMENTS SRL · CUI 46260823 · J32/1155/2022 · Str. Ioan Virgil Ispas nr. 17A, 555300 Cisnădie, jud. Sibiu · 0775 286 584 · contact@primesupplements.ro
>
> Este importantă o alimentație variată și echilibrată și un stil de viață sănătos. Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată. Nu depășiți doza zilnică recomandată. A nu se lăsa la îndemâna copiilor mici.

Linkul de dezabonare e `{{unsubscribe_link}}` (cerut de theMarketer), vizibil, cu text #f0f0f0 pe #1a1a1a (contrast ~16:1). Iconițele sociale sunt opționale, la final, cu alt text („Instagram Prime Supplements” etc.).

- **Verificare:** un test pe telefon, în modul întunecat. Dezabonarea se vede și se poate apăsa, iar datele firmei se citesc.

### Pasul 15 · Segmentele (gata, doar te uiți) · ~5 min

- **Unde:** Audience > Segments.
- **Ce faci:** nimic de construit. Cele 40 de segmente sunt create și se actualizează singure. Lista, cu ce face fiecare, e la Anexa A.
- **Verificare:** segmentele din Anexa A au cifre apropiate de cele de acolo. Patru sunt goale azi, prin construcție: „X · Acord nedovedit”, „X · Sunset suprimați”, „X · Frecvență redusă”, „SMS · Acord dovedit”. Plus „SMS · Cumpărători cremă de orez”, care depinde de „SMS · Acord dovedit”.

### Pasul 16 · Reactivarea: doar urmărești · ~10 min

- **Ce se întâmplă singur:**
  - **marți, 20.10, la 18:30:** „Reactivare 2026-10 – e-mail 1 (20.10)” pleacă la 1.042 de contacte;
  - **marți, 27.10, la 18:30:** pleacă e-mailul 2, doar la cei care n-au deschis și n-au dat click pe primul.
- **Ce faci:**
  - **miercuri, 21.10:** Campaigns > Sent > e-mailul 1 > raportul. **Bounce hard sub 2 %, plângeri sub 0,1 %.** Dacă le depășește: Campaigns > Scheduled > e-mailul 2 > Pause și îmi scrii.
  - **între 21 și 26.10:** Audience > Segments > „Reactivare 2026-10 – fără reacție la e-mail 1” trebuie să aibă ~1.042 minus cei care au reacționat. Dacă are 0, îmi scrii (segmentul se reface și e-mailul 2 se mută pe el).
- **Verificare:** raportul e-mailului 1 e în praguri, iar segmentul pentru e-mailul 2 nu e gol.

### Pasul 17 · O campanie segmentată pe săptămână · PRIORITATE 1 · ~20 min pe campanie

- **Cine o face:**
  - **eu**, pregătesc fiecare campanie ca **ciornă** (nu trimit nimic), cu șablonul interimar și UTM-urile corecte, și îți trimit un test pe contact@primesupplements.ro. Îmi scrii „pregătește campania din 21.10” cu cel puțin 2 zile înainte;
  - **tu** verifici testul cu checklistul de la Anexa B și apeși **Schedule**.
- **Setări la fiecare campanie:**
  - miercuri la **19:30**;
  - **„Skip recently messaged contacts” pornit**;
  - fără reduceri și fără cuvântul „ofertă”;
  - carduri fără preț tăiat, cu preț pe unitate.
- **Excluderile standard** (le pui la toate campaniile segmentate și la restanțe):
  - X · Au comandat în ultimele 14 zile
  - P · Abonați noi 11 zile (în Welcome)
  - X · Sunset suprimați
  - X · Frecvență redusă
  - X · Igienă (adrese de evitat)
  - X · Acord nedovedit
  - X · Checkout fără comandă, neconfirmați (v2)
  - E · Niciodată deschis (abonați de peste 30 de zile)
  - Subscriber fatigue - Fatigued
  - **Reactivare 2026-10 · de confirmat (v2):** toți reactivații, pentru că emailul lor promite doar ghidul săptămânal (vezi pasul 27).
- **Calendarul** (`SYSTEM.md` §5; în săptămânile 09–15.11 și 23–29.11 nu trimitem campanii cu produse):

| Data | Campania | Segment (plus excluderile standard) | Subiect A / B | Buton → link | UTM |
|---|---|---|---|---|---|
| mi 21.10, 19:30 | Bolul Prime: cremă de orez + proteină | „C · Proteine” ∪ „I · Interesați proteine (v2)”, fără „C · Cremă de orez” | Micul dejun de sală, gata în 2 minute / Cremă de orez + proteină: rețeta simplă | Alege aroma → `/collections/crema-de-orez` | `promo-2026-10-21-bol-orez` |
| mi 28.10, 19:30 | Vitamine și minerale, cu doza corectă | „C · Vitamine și minerale” ∪ „I · Interesați vitamine (v2)” | Magneziu, vitamina C, D3 + K2: doza corectă, pe scurt / Ce scrie pe etichetă, pe înțeles | Vezi vitaminele și mineralele → `/collections/vitamine-si-minerale` | `promo-2026-10-28-vitamine-doza` |
| ma 03.11, 18:30 | Recâștigare · restanțe (1), textul emailului 4.9.1 (pasul 22) | „R · În risc (60–120 zile)” (azi 110) | Cum merge antrenamentul? / Ce e nou la Prime de la ultima ta comandă | Vezi cele mai vândute → `/collections/suplimente-sala?sort_by=best-selling` | `promo-2026-11-03-recastigare` |
| mi 04.11, 19:30 | Izolat sau concentrat? | „C · Proteine” ∪ „I · Interesați proteine (v2)”, fără „R · În risc (60–120 zile)” | Izolat sau concentrat: diferența pe etichetă / Iarna te antrenezi mai mult în sală? Alege proteina potrivită | Compară pe site → `/collections/pudra-proteica` | `promo-2026-11-04-izolat-concentrat` |
| mi 11.11 | **fără campanie** (Black Friday-ul magazinelor mari) | — | — | — | — |
| ma 17.11, 19:30 | Planul de rezerve pentru iarnă (VIP, cu o zi înainte) | „L · VIP” | Cât îți ține fiecare produs (tabel simplu) / Planul tău de rezerve până la Anul Nou | Vezi cele mai vândute | `promo-2026-11-17-rezerve-vip` |
| mi 18.11, 19:30 | Planul de rezerve pentru iarnă | „L · Clienți recurenți (2+)”, fără „L · VIP” | la fel | Vezi cele mai vândute | `promo-2026-11-18-rezerve` |
| jo 19.11, 18:30 | Recâștigare · restanțe (2), textul emailului 4.9.1 | „R · Pierduți (120–365 zile)”, fără „L · Clienți recurenți (2+)” | Cum merge antrenamentul? / Ce e nou la Prime de la ultima ta comandă | Vezi cele mai vândute | `promo-2026-11-19-recastigare` |
| mi 25.11 | **fără campanie** (Black Friday, 27.11) | — | — | — | — |
| mi 02.12, 19:30 | Cadouri pentru sportivi | „E · Implicați 90 zile” | Cadou pentru cineva care merge la sală? 3 idei pe buget / Idei de cadou pentru sportivi, sub 100, 200 și 300 de lei | Vezi ideile de cadou | `promo-2026-12-02-cadouri` |
| mi 09.12, 19:30 | Ultimele zile de livrare înainte de Crăciun | cei care au dat click pe campania din 02.12 ∪ „L · VIP” | Comandă până joi, 17.12, ora 12:00: Cargus estimează livrarea înainte de Crăciun, pentru adresele din România. / Termenul estimat pentru cadourile de Crăciun | Comandă la timp | `promo-2026-12-09-termen-craciun` |

- **Reguli pentru texte:** unghiul fiecărei campanii, cu ce are voie să spună, e în `SYSTEM.md` §5. Exemple: la vitamine, mențiunile autorizate doar dacă sunt pe eticheta produsului (azi niciuna la magneziu); la proteine, fără „fără lactoză”, „digestie”, „absorbție”, „pur/pură”; la cadouri, rândul obligatoriu „Suplimentele sunt pentru adulți: nu se recomandă persoanelor sub 18 ani, femeilor însărcinate sau care alăptează.” Termenul de Crăciun (17.12, 12:00) îl confirmi cu Cargus înainte de 02.12.
- **Verificare:** după fiecare campanie, în raport: CTR ≥ 0,6 % în noiembrie (azi ~0,5 %), dezabonări < 0,3 %, plângeri < 0,08 %. Comenzile le număr eu din Shopify, după UTM.

---

## Săptămâna 2 · 26.10–01.11 · Welcome, formulare, coș (~5 ore)

### Pasul 18 · Double opt-in · ~30 min

- **Înainte:** sincronizarea abonaților Shopify s-a terminat (16.10). Pasul 14 (șablonul).
- **Unde** (cauți în ordine):
  1. Shopify Admin > Apps > theMarketer > setări > **„Double opt-in setting”**;
  2. theMarketer > Settings > Email setup (`https://app.themarketer.com/settings/email-settings`);
  3. Audience > Signup forms > formularul.

  Alegi ca **theMarketer** să trimită emailul de confirmare. Dacă nu găsești setarea, scrii la iam@themarketer.com: „Vreau double opt-in pentru popup și formularele embedded, cu emailul de confirmare trimis de theMarketer.”
- **Pentru cine:** doar înscrierile noi din pop-up și din formularele embedded. La checkout nu folosim DOI.
- **Imediat după ce îl pornești, două teste pe surse:**
  1. o comandă de test cu bifa de abonare: **nu** trebuie să vină email de confirmare;
  2. îmi scrii „testează importul” și import prin API o adresă de test: **nu** trebuie să vină confirmare.

  Dacă vreunul primește confirmare, oprești DOI pe loc și scrii la iam@themarketer.com: „Se aplică double opt-in și surselor order, import și api?”

#### Text de lipit · Emailul de confirmare (double opt-in, fără marketing) (SYSTEM.md §4.1.0)

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

- **Verificare:** te abonezi din pop-up cu o adresă personală nouă. Vine emailul de confirmare cu textul de mai sus. După click, contactul apare abonat (Audience > Contacts). Fără click, nu vine nimic altceva.

### Pasul 19 · „Welcome 2026”, pop-up-urile și formularele · PRIORITATE 1 · ~2 ore și 30 min

- **Înainte:** pașii 10 (tracking), 14 (șablon) și 18 (DOI).

**A. Fluxul Welcome**

- **Unde:** Automation > „+ Create journey” > New subscribers > **Welcome series**. Numele fluxului: **„Welcome 2026 (4 emailuri)”**.
- **„Start of automation”:**
  - declanșator: abonarea **confirmată**;
  - Run flow **„Only once”**;
  - „Include imported contacts” oprit;
  - smart sending **oprit** (E1 trebuie să plece imediat).
- **Filtre:** imediat după emailul 1, Filter „Buyer in the last 365 days” → ies (clienții recenți primesc doar E1, cu codul promis). Dacă editorul are filtru pe numărul de comenzi = 0 sau pe segmentul „Shopping - Nonbuyers lifetime”, îl folosești pe acela.
- **Blocul „Discount”** în E1: codul WELCOME5, „Used code type” = multi-use, 5 %.
- **Linkurile cu WELCOME5** au UTM-ul în calea de redirect, exact cum sunt scrise în texte. Le copiezi întocmai.
- **Schema:**

```text
Start (abonare confirmată) → Time delay 5 minute → Send email 1 (WELCOME5)
→ Filter: Buyer in the last 365 days → ies (clienții recenți primesc doar E1, apoi newsletterul)
→ Time delay 3 zile, until 18:30 → Filter: Buyer in the last 4 days → ies → Send email 2 (povestea)
→ Time delay 3 zile, until 18:30 → Filter: Buyer in the last 7 days → ies → Send email 3 (cum alegi)
→ Time delay 4 zile, until 10:00 → Filter: Buyer in the last 11 days → ies → Send email 4 (recenzii și condiții)
```

#### Text de lipit · Email 1 · Codul de bun venit (la 5 minute după confirmare) · `flow-welcome-e1` (SYSTEM.md §4.1.1)

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

#### Text de lipit · Email 2 · Povestea și valorile (ziua 3, 18:30) · `flow-welcome-e2` (SYSTEM.md §4.1.2)

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

#### Text de lipit · Email 3 · Cum alegi și ce aleg des clienții (ziua 6, 18:30) · `flow-welcome-e3` (SYSTEM.md §4.1.3)

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

#### Text de lipit · Email 4 · Recenzii, condiții clare și ce te interesează (ziua 10, 10:00) · `flow-welcome-e4` (SYSTEM.md §4.1.4)

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

**B. Pop-up-urile**

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

**C. Formularele embedded**

Calea: Audience > Signup forms > „Create signup form” > „Embedded forms” > layout > „Form code” (codul HTML) > îl pui în temă.

| Formular | Unde | Titlu și text | Buton | Tag |
|---|---|---|---|---|
| Footer | în locul formularului de newsletter din footerul temei (care trimite azi abonații în Shopify, nu în theMarketer) | „Ghidul de duminică” · „Un ghid util pe săptămână despre proteine, creatină și alimentația pentru sală, plus emailuri despre produsele și ofertele Prime (de obicei 1–2 pe săptămână). Te dezabonezi oricând, din linkul din fiecare email.” | Mă abonez | „abonare footer” |
| Blog | la finalul fiecărui articol | „Ți-a fost util? Primește ghidul săptămânii duminică la 18:00, plus noutăți și oferte Prime (de obicei 1–2 emailuri pe săptămână).” | Trimite-mi ghidul | „abonare blog” |

Mesajul de confirmare la ambele (cu DOI): „Verifică-ți emailul și confirmă abonarea. După confirmare primești emailul de bun venit, cu codul de bun venit.” Schimbarea în temă o face cine editează tema (o pot pregăti eu pe tema de test, cu aprobarea ta).

**Varianta B** (dacă vrei să păstrezi promisiunea „doar ghidul” la footer și blog): contactele cu tag „abonare footer” sau „abonare blog” se exclud din Welcome E2–E4, din campaniile segmentate și din fluxurile de stoc revenit, VIP, navigare, client existent și recâștigare. Primesc doar Welcome E1, newsletterul și, dacă lasă un coș, fluxul de coș; în textul formularului scrii și „plus un memento dacă lași produse în coș”. Excluderea din fluxuri cere filtrul pe tag (§3.5). Implicit folosim textele din tabel.

**D. Pornirea**

- În același minut: pornești „Welcome 2026 (4 emailuri)”, pornești pop-up-urile noi și oprești „Welcome series 2” (`696f6c4ff8dbc4c7200f28c9`).
- Formularele embedded intră în temă abia după ce le aprobi pe tema de test (le pot pregăti eu).
- **Verificare:**
  1. Te abonezi din pop-up, pe desktop și pe telefon, cu adrese noi. Vine confirmarea. După click, în ~5 minute vine E1, cu blocul WELCOME5.
  2. Apeși butonul din E1: coșul are codul aplicat, iar în Shopify sesiunea (sau comanda de test) arată `utm_source=themarketer`.
  3. Pop-up-ul apare după ~30 de secunde, nu pe coș. Contactul are tagul „abonare pop-up”.
  4. După 3 zile, E2 pleacă la 18:30.

### Pasul 20 · Fluxul de coș refăcut și navigarea · PRIORITATE 1 · ~75 min

- **Înainte:** pașii 10 (tracking și politică) și 11 (recomandări).

**A. Coșul (prinde și checkout-urile: varianta C din `SYSTEM.md` §4.2)**

- **Unde:** Automation > „Cart abandonment” (`6862b5c5fd9dc29f6a0f5a6f`). Îl refaci pe acesta sau creezi unul nou din „+ Create journey” > Cart related > Cart abandonment și îl oprești pe cel vechi în același minut. Cât ești în „Cart related”, te uiți dacă există un șablon de **checkout abandonat**. Dacă există, îl folosești la pasul 23.
- **„Start of automation”:**
  - abandon după **60 de minute**;
  - Run flow „Multiple times”;
  - „Enable frequency capping” = 7 zile;
  - „Exclude contacts who have not exited this automation flow yet.” pornit;
  - smart sending **oprit**.
- **Fără reducere.** Fraza „Ultima șansă” dispare: nu expiră nimic.
- **Schema:**

```text
Start (coș abandonat, 60 min) → [doar varianta A: Filter: a început checkout-ul → ies]
→ Send email 1
→ Time delay 20 ore, until 19:00 → Filter: Buyer in the last 2 days → ies → Send email 2
```

- **UTM:** `flow-cart-e1`, `flow-cart-e2`.

#### Text de lipit · Email 1 · Ce ai pus în coș e tot acolo (la 1 oră) · `flow-cart-e1` (SYSTEM.md §4.3.1)

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

#### Text de lipit · Email 2 · Bine de știut, plus ce se potrivește (a doua zi, 19:00) · `flow-cart-e2` (SYSTEM.md §4.3.2)

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

**B. Navigarea („Product follow-up”, un singur email)**

- **Doar dacă** la pasul 3 ai găsit filtrul pe emailul 1 de coș („Automation activity”). Altfel fluxul rămâne oprit până în luna 2.
- **Setări:**
  - Run flow „Multiple times”, capping 14 zile;
  - smart sending **pornit**;
  - pleacă a doua zi, la 18:30;
  - ștergi al doilea email.
- **Schema:**

```text
Start (produs văzut, fără coș) → Time delay 1 zi, until 18:30
→ Filter: Buyer in the last 3 days → ies → Filter: a primit emailul 1 de coș în ultimele 2 zile → ies → [Filter: adăugat în ultimele 11 zile → ies]
→ Send email 1
```

- **UTM:** `flow-browse-e1`.

#### Text de lipit · Email 1 · Te ajutăm să alegi? (a doua zi, 18:30) · `flow-browse-e1` (SYSTEM.md §4.4.1)

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

- **Verificare:**
  1. Cu adresa ta, pui un produs în coș și pleci. După ~1 oră vine coș E1, a doua zi la 19:00 vine E2. Niciun preț tăiat, iar blocul de recomandări nu conține produse cu nume de efect.
  2. După ce comanzi, nu mai vine nimic.
  3. Navigarea: te uiți la un produs fără să-l pui în coș și a doua zi la 18:30 vine „Te ajutăm să alegi?”. Dacă în aceeași zi ai primit coș E1, nu vine.

### Pasul 21 · Restul DNS-ului · ~45 min

- **Unde:** la registrar (zona DNS), în Google Workspace Admin și în Shopify Admin.
- **Ce faci:** pașii 2, 3, 4, 6 și 8 din tabelul de mai jos. Pasul 1 l-ai făcut în ziua 1. Pasul 5 îl fac eu: îmi scrii „validează domeniul”. Pasul 7 vine după 30 de zile de rapoarte curate.

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

- **Verificare:** în Gmail, la un email theMarketer, „Show original” arată SPF, DKIM și DMARC „PASS”. Google Postmaster Tools arată domeniul adăugat.

---

## Săptămâna 3 · 02–08.11 · recâștigarea (~1 oră și 45 min)

### Pasul 22 · „Recâștigare 2026” (75 și 120 de zile fără comandă) · ~45 min

- **Unde:** Automation > „+ Create journey” > Post Purchase > „Cross sell”, folosit ca schelet, cu întârzieri lungi. Numele fluxului: „Recâștigare 2026”. „Inactivity behavior” e deja oprit (pasul 1).
- **„Start of automation”:**
  - comandă „fulfilled”;
  - Run flow „Multiple times”;
  - **fără** frequency capping;
  - „Exclude contacts who have not exited…” **oprit**;
  - smart sending **pornit**;
  - ambele emailuri la **18:30**.
- **Schema** (filtrul e întârzierea minus o zi, ca un client cu două comenzi la câteva zile distanță să nu primească două emailuri):

```text
Start (comandă fulfilled)
→ Time delay 75 zile, until 18:30 → Filter: Buyer in the last 74 days → ies → Send email 1
→ Time delay 45 zile, until 18:30 → Filter: Buyer in the last 119 days → ies → Send email 2
```

- **UTM:** `flow-winback-e1`, `flow-winback-e2`.

#### Text de lipit · Email 1 · Ce mai faci și ce e nou (ziua 75, 18:30) · `flow-winback-e1` (SYSTEM.md §4.9.1)

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

#### Text de lipit · Email 2 · O întrebare și o recomandare (ziua 120, 18:30) · `flow-winback-e2` (SYSTEM.md §4.9.2)

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

- **Rândul cu cod din E2** îl **ștergi**, dacă nu aprobi un cod (pasul 29; implicit, fără cod).
- **Clienții care au comandat înainte de pornire** îi prind campaniile „Recâștigare · restanțe” din 03.11 și 19.11 (pasul 17).
- **Verificare:** „Send test” la ambele emailuri, apoi fluxul pornit. Primele trimiteri vin după 75 de zile, în ianuarie.

### Pasul 23 · (opțional) Ramura separată de checkout · ~30 min

- **Doar dacă** ai găsit la pasul 20 un șablon de checkout abandonat (varianta A) sau editorul are un filtru pe **evenimentul** „Initiate checkout”, cu fereastră în ore sau zile (varianta B). **Nu folosi filtrul pe „Funnel”:** înseamnă „cel mai departe pas atins în ultimele 3 luni”, nu checkout-ul de azi. Dacă nu există niciuna, nu faci nimic: fluxul de coș prinde deja checkout-urile.
- **Setări:** ca la coș (60 de minute, „Multiple times”, capping 7 zile, smart sending oprit). În varianta A, în fluxul de coș adaugi filtrul care îi scoate pe cei care au început checkout-ul.
- **Schema:**

```text
Start (checkout început, fără comandă, 60 min)
→ Send email 1
→ Time delay 20 ore, until 19:00 → Filter: Buyer in the last 2 days → ies → Send email 2
→ Time delay 1 zi, until 11:00 → Filter: Buyer in the last 3 days → ies
   → Filter: a dat click pe emailul 1 sau 2 („Campaign activity” > „Automation activity” > „Clicked”, doar dacă opțiunea există; altfel SMS-ul pleacă doar pe condiția „nu a comandat”) → ies
   → Filter: abonat SMS, în segmentul „SMS · Acord dovedit” → altfel ies → Send sms 1
```

#### Text de lipit · Email 1 · Comanda a rămas la un pas (la 1 oră) · `flow-checkout-e1` (SYSTEM.md §4.2.1)

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

#### Text de lipit · Email 2 · Răspunsuri scurte (a doua zi, 19:00) · `flow-checkout-e2` (SYSTEM.md §4.2.2)

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

#### Text de lipit · SMS · a treia zi, 11:00, doar acord SMS dovedit, doar în varianta A sau B · `flow-checkout-sms` (SYSTEM.md §4.2.3)

- **Text (fără diacritice, ~130 de caractere fără linkuri):** `Prime Supplements: produsele tale sunt salvate in cos: [link cos] Ajutor pe WhatsApp: 0775286584. Dezabonare SMS: [link dezabonare]`
- **Alternativ (pentru test, după 2 luni):** `Prime Supplements: ai uitat produsele in cos. Le gasesti aici: [link cos] Raspundem pe WhatsApp: 0775286584. STOP SMS: [link]`
- **Setări:** linkul coșului îl ia blocul SMS din șablon; linkul de dezabonare îl adaugă theMarketer (verifici la „Send test SMS”); expeditor alfanumeric „PrimeSuppl” (de verificat ce permite contul); cost ~0,034 EUR pe SMS.

- **SMS-ul** îl adaugi doar după pasul 34 (acordul SMS verificat).
- **Verificare:** un checkout de test, abandonat după ce ai scris adresa. Primești emailurile de checkout, nu și pe cele de coș.

### Pasul 24 · Marți, 03.11 · „Recâștigare · restanțe (1)” · ~10 min

- **Ce faci:** cu 2 zile înainte îmi scrii „pregătește restanțele 1”. Primești testul, îl verifici cu checklistul de la Anexa B și apeși Schedule. Segmentul, excluderile și UTM-ul sunt în calendarul de la pasul 17.
- **Verificare:** raportul de a doua zi: plângeri < 0,1 %, dezabonări < 0,5 %.

### Pasul 25 · Verificarea după primele 7–14 zile de fluxuri · ~20 min

- **Ce faci:**
  1. **Automation > fiecare flux nou > raportul.** Cauți emailuri blocate de smart sending: au fost amânate sau sărite? Documentația nu spune. Dacă se sar emailuri importante (de exemplu reaprovizionarea), oprești smart sending la acel flux.
  2. Verifici că emailul de confirmare DOI nu a blocat Welcome E1 (n-ar trebui: Welcome are smart sending oprit).
  3. Îmi scrii „raportul fluxurilor”. Număr intrările pe fiecare flux, câte au venit din checkout, click-urile unice și comenzile după click din Shopify.
- **Verificare:** fiecare flux are trimiteri doar între 08:00 și 21:00. Singura excepție e coș E1, la o oră de la abandon.

---

## Săptămâna 4 · 09–15.11 · curățenie (~1 oră și 15 min)

### Pasul 26 · Marți, 10.11, ora 19:00 · Sunset #1 · ~20 min

- **Cine o face:** îmi scrii „pregătește sunsetul din 10.11” și îl fac ciornă, sau îl faci tu din Campaigns > Create campaign > Email.
- **Setări:**
  - segmentul **„E · Candidați sunset”** (azi 626 de abonați email), cu excluderea „X · Sunset suprimați”;
  - „Skip recently messaged contacts” pornit;
  - UTM `sunset-2026-11`;
  - fără cod.

  În săptămâna asta nu e nicio campanie segmentată (11.11), deci nu se suprapune nimic.

#### Text de lipit · Campania „Mai vrei să primești emailurile noastre?” · `sunset-AAAA-LL` (SYSTEM.md §4.10.1)

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

- **După 14 zile (marți, 24.11):** îmi scrii „aplică sunsetul”. Pun tagul `email-inactiv` celor care au primit campania și n-au dat click. Ei intră automat în „X · Sunset suprimați”, exclus din toate campaniile. Rămân abonați: primesc în continuare emailurile despre comenzi și, dacă revin pe site, pe cele de coș. Tot atunci fac și „E · Candidați sunset (v2)”, cu regula în plus „tag is not email-inactiv” (§6.1).
- **Verificare:** raportul campaniei arată plângeri < 0,1 %. Pe 24.11, „X · Sunset suprimați” are aproximativ numărul celor care n-au dat click.

### Pasul 27 · Marți, 10.11 · Curățarea reactivării și două decizii · ~15 min

- **Ce se face:** regula jobului de reactivare (`reactivation_report.md` §5):
  - cine **n-a reacționat** la niciunul dintre cele două emailuri este dezabonat de la email și primește tagul `inactivi-2026-11`. Emailurile le-au spus „te scoatem din listă”;
  - cine **a reacționat** pierde tagul `reactivare-2026-10`.
- **Decizia 1 · ce înseamnă „a reacționat”.** **Recomandarea mea: doar click sau comandă.** Emailurile spun „un singur click e de ajuns”, iar deschiderile sunt umflate de Apple Mail. Regula din raport numără și deschiderile.
- **Decizia 2 · promisiunea din emailul 1.** Emailul 1 spune „O dată pe săptămână îți trimitem un singur e-mail, cu un ghid scurt de pe blogul nostru”. **Recomandarea mea:** cei care rămân primesc tagul `reactivat-doar-ghid`, nu rămân fără tag. Creez segmentul „X · Reactivați doar ghid” și îl pun în locul excluderii „Reactivare 2026-10 · de confirmat (v2)”, la campaniile segmentate și la restanțe. Ei primesc newsletterul de duminică, ca promis. Pentru fluxurile de coș și navigare, de confirmat cu un jurist. Varianta prudentă: îi excluzi și de acolo, dacă editorul are filtru pe segment.
- **Ce faci:** îmi scrii „curățarea din 10.11: click / click și deschidere; doar ghid: da / nu”. Fac pașii prin API și îți trimit doar cifrele. Apoi, pe newslettere, excluderea „Reactivare 2026-10 · de confirmat (v2)” rămâne goală și o poți scoate.
- **Verificare:** după curățare, tagul `reactivare-2026-10` are 0 contacte, iar SMS-ul rămâne 0 pe ambele taguri.

### Pasul 28 · Cauți șablonul de stoc revenit · ~10 min

- **Unde:** Automation > „+ Create journey”, în toate categoriile. Cauți „Back in stock”.
- **Ce faci:** îmi spui dacă există. Dacă da, la pasul 32 faci fluxul. Dacă nu, campania de stoc revenit o pregătesc eu, în ziua revenirii.
- **Verificare:** știi răspunsul: există sau nu există.

### Pasul 29 · Deciziile care îți aparțin · ~30 min

Le citești și îmi scrii alegerea. Până atunci rămâne valoarea implicită.

| Decizie | Implicit | Ce face alegerea |
|---|---|---|
| Un cod pentru a doua comandă sau pentru recâștigare (E2) | fără cod | Un cod aprobat îl creezi în Shopify, cu dată reală de final; prețul de referință e cel mai mic preț din ultimele 30 de zile |
| WELCOME5 doar la prima comandă | nu: rămâne „o dată per client” | Dacă da, îl limitezi în Shopify la clienții fără comenzi, iar textul E1 se schimbă |
| Dezactivarea celor 70 de produse vechi WooCommerce din catalogul theMarketer | — | Le dezactivez prin API: nu mai apar cu imagini lipsă și prețuri greșite |
| P.S. „Nu facem Black Friday” în newsletterul din 22.11 | nu | Textul exact: „P.S. Nu facem Black Friday. Îți scriem în continuare, ca de obicei, ghidul de duminică.” Fără promisiune de preț |
| Cadou fizic la a 3-a comandă (VIP) sau la un prag de comandă | nu | Legal fără cod, doar dacă e adevărat și fără condiții ascunse |
| Abonații importați fără dovada acordului (581 + tagurile „import 25.06”, „Update 13.11”) | excluși din campanii | Le verific prin API dovada acordului și pun tagul `acord-nedovedit` celor fără dovadă. Atinge contacte, deci doar cu OK-ul tău |
| Golirea prenumelor ghicite din adresa de email | — | Le golesc prin API; subiectele noi nu folosesc oricum prenumele |
| Cei ~1.160 de contacte scoase pe 10.07, care nu sunt abonați în Shopify | nu-i contactăm deloc | O reconfirmare doar cu avizul unui jurist |
| Intervalele de reaprovizionare la Omega-3, Ashwagandha, L-carnitină, taurină | fără interval | Îmi scrii câte capsule pe zi scrie pe etichetă, iar eu pun intervalul |
| Numele expeditorului | campaniile de azi folosesc „Primesupplements.ro” | Recomand „Prime Supplements” peste tot, ca fluxurile și campaniile să pară același expeditor |

---

## Luna 2 · 16.11–15.12 (~4 ore și 40 min)

### Pasul 30 · „Client nou 2026” (3 emailuri, 12 zile) · ~90 min

- **Unde:** Automation > „+ Create journey” > Post Purchase > „Cross sell”, folosit ca schelet. Numele fluxului: „Client nou 2026”.
- **„Start of automation”:**
  - comandă **„fulfilled”** (magazinul nu trimite „Delivered”);
  - Run flow „Only once”;
  - smart sending **oprit**;
  - „Include imported contacts” oprit.
- **Filtrul pentru prima comandă** îl pui **după prima pauză**:
  - segmentul de sistem „Shopping - First time buyers”;
  - altfel, numărul de comenzi = 1;
  - **dacă nu există niciunul**, fluxurile „Client nou” și „Client existent” devin unul singur, „După comandă”, cu emailurile de mai jos. Subiectul E1 devine „Mulțumesc pentru comandă”.
- **Fără cerere de recenzie:** o trimite Judge.me.
- **Schema:**

```text
Start (comandă fulfilled)
→ Time delay until 10:00 (a doua zi dacă e după 10:00) → Filter: Shopping - First time buyers (altfel ies) → Send email 1 (mulțumire, ce urmează)
→ Time delay 3 zile, until 18:30 → Send email 2 (cum folosești; o singură variantă)
→ Time delay 8 zile, until 18:30 → Filter: Buyer in the last 10 days → ies → Send email 3 (ce se potrivește)
```

- **UTM:** `flow-client-nou-e1`, `-e2`, `-e3`.

#### Text de lipit · Email 1 · Mulțumire și ce urmează (după expediere, 10:00) · `flow-client-nou-e1` (SYSTEM.md §4.5.1)

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

#### Text de lipit · Email 2 · Cum folosești ce ai comandat (ziua 3–4, 18:30) · `flow-client-nou-e2` (SYSTEM.md §4.5.2)

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

#### Text de lipit · Email 3 · Ce se potrivește cu ce ai comandat (ziua 12, 18:30) · `flow-client-nou-e3` (SYSTEM.md §4.5.3)

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

- **Verificare:** „Send test” la toate 3 emailurile. La E2 confirmi pe etichetele fizice cele două puncte „de verificat”. Apoi pornești fluxul.

### Pasul 31 · VIP (a 3-a comandă) · ~30 min

- **Unde:** Automation > „+ Create journey” > Post Purchase.
- **Setări:**
  - comandă „fulfilled”;
  - Filter: a 3-a comandă (numărul de comenzi = 3);
  - Run flow „Only once”;
  - Time delay 2 zile, until 18:30;
  - smart sending pornit;
  - UTM `flow-vip-e1`.
- **Dacă filtrul nu există:** o campanie lunară, prima joi din lună, la segmentul „L · VIP”. Exclusi cei care au primit-o deja: „Newsletter activity” > „received” > campania anterioară.

#### Text de lipit · Email 1 · Mulțumesc pentru a treia comandă · `flow-vip-e1` (SYSTEM.md §4.11.1)

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

- **Verificare:** testul arată linkul WhatsApp funcțional (`https://wa.me/40775286584`).

### Pasul 32 · Stoc revenit · ~30 min

- **Dacă există șablonul „Back in stock”** (pasul 28):
  - declanșator „produs revenit în stoc”, pentru cei care l-au văzut în ultimele 90 de zile;
  - un singur email;
  - Filter „Buyer in the last 7 days” → ies;
  - smart sending pornit.
- **Dacă nu există:** în ziua în care revine un produs (de exemplu crema de orez, D3 + K2 sau zincul), îmi scrii „stoc revenit: [produsul]”. Pregătesc campania pe cei care l-au văzut în 3 luni sau l-au cumpărat în 6 luni (pentru crema de orez: „I · Interesați cremă de orez” ∪ „C · Cremă de orez”), cu excluderile standard. VIP-ii o primesc cu 24 de ore înainte. Tu aprobi testul.
- **Regula de adevăr:** „a revenit în stoc” doar dacă stocul e real în ziua trimiterii; „toate aromele” doar dacă toate sunt în stoc. Azi toate cele 7 variante Creamy Rice sunt în stoc.

#### Text de lipit · Email · [Produsul] e din nou în stoc · `flow-stoc-e1` sau `promo-AAAA-LL-ZZ-stoc-<produs>` (SYSTEM.md §4.12.1)

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

- **SMS-ul** pleacă doar după pasul 34, doar la „SMS · Cumpărători cremă de orez”, a doua zi la 11:00, doar celor care n-au dat click pe email. Cel mult o dată pe lună.
- **Verificare:** testul arată prețul de azi și prețul pe unitate, fără preț tăiat.

### Pasul 33 · Șablonul master „Prime · Master 2026” · ~2 ore

- **Ce faci:** refaci șablonul interimar după specificația de mai jos și îl testezi. Din 06.12, newsletterul și toate fluxurile îl folosesc.

#### Specificația (SYSTEM.md §7.1)

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

#### Dark mode (SYSTEM.md §7.4)

- În `<head>`: `<meta name="color-scheme" content="light dark">` și `<meta name="supported-color-schemes" content="light dark">`.
- `@media (prefers-color-scheme: dark)` (Apple Mail, Outlook pe Mac și iOS): fundal exterior #121212, corp #1e1e1e, text #f0f0f0, text secundar #bdbdbd, linii #333333, linkuri #ff6b6f; butonul rămâne #e91d23 cu text alb; subsolul #000000 cu text #e5e5e5. Aceleași reguli și pe selectorii `[data-ogsc]` pentru Outlook.com și aplicațiile Outlook.
- Gmail pe telefon inversează singur culorile și ignoră aceste reguli. De aceea: logo transparent cu contur alb, imaginile de produs pe fundal propriu (alb) în carduri, niciun text important în imagini, fără negru pur pe imagini transparente.
- **Testul obligatoriu** înainte de prima trimitere a șablonului master: Apple Mail pe iPhone (luminos și întunecat), Gmail pe Android (întunecat) și Outlook pe desktop. Restul clienților (Gmail pe web și pe iOS, Outlook.com, un client cu imaginile blocate) îi verifici după pornire.
- **Până la șablonul master** (luna 2), fluxurile și campaniile folosesc ca șablon interimar HTML-ul newsletterelor pregătite de job (deja testat, blocat pe modul luminos), cu subsolul comun de la §7.3.
- Newsletterele din 18.10–29.11, pregătite de job, sunt blocate pe modul luminos (`color-scheme: light`) și testate. Rămân așa. Din 06.12, newsletterul folosește șablonul master.

- **Verificare:** testul pe Apple Mail pe iPhone (luminos și întunecat), Gmail pe Android (întunecat) și Outlook pe desktop. Logoul se vede, butonul e roșu cu text alb, dezabonarea se citește, emailul are sub 100 KB.

### Pasul 34 · Înainte de primul SMS · ~10 min

- **Ce fac eu:** citesc istoricul de consimțământ la 5 abonați recenți din pop-up care au telefon. Dacă acordul SMS e înregistrat în aceeași secundă cu emailul, fără bifă separată în formular, nu trimitem niciun SMS până nu există bifa separată în pop-up (pasul 19). Altfel pun tagul `acord-sms-dovedit`, contact cu contact, doar celor cu acord SMS dovedit, și îți trimit cifrele.
- **Ce faci tu:** îmi scrii „verifică acordul SMS” și aprobi tagurile.
- **Reguli pentru SMS:**
  - doar la segmentul „SMS · Acord dovedit” (sau „SMS · Cumpărători cremă de orez”);
  - cel mult 1 pe săptămână și 2 pe lună;
  - text fără diacritice, cu „Prime Supplements:” la început și linkul de dezabonare la final.
- **Verificare:** „SMS · Acord dovedit” are membri doar după verificare.

---

## Pasul 35 · Lunar (~30 min pe lună)

- **Pe 1 ale lunii:** îți trimit raportul de 5 cifre:
  - comenzi cu atingere de email (Shopify);
  - comenzi și venit last-click;
  - abonați noi confirmați;
  - dezabonări;
  - plângeri.

  Dacă vrei, îl programez ca sarcină lunară. „Tranzacțiile” din theMarketer le notăm doar informativ: azi sunt umflate de ~15 ori.
- **Prima marți din lună:** sunsetul (pasul 26). La 14 zile după, tagul `email-inactiv`.
- **Eșantionul de 20 de contacte** (îl fac eu): niciun contact cu peste 3 emailuri de marketing în 7 zile (fără mementourile de coș) și niciun email între 21:00 și 08:00. Dacă mai mult de 2 din 20 depășesc, oprești întâi navigarea, apoi treci campania segmentată la o dată la două săptămâni.
- **Răspunsurile la emailuri:**
  - „MAI RAR”: Audience > Contacts > contactul > Tags > `frecventa-redusa`;
  - „stop”, „dezabonare”, „nu mai vreau”: Audience > Contacts > contactul > Unsubscribe, în cel mult 2 zile lucrătoare;
  - cine scrie despre o afecțiune primește răspunsul „discută cu medicul”, iar detaliile nu se păstrează în theMarketer.
- **O dată pe trimestru:** actualizezi notele și numărul de recenzii din Welcome E3 și E4, din Judge.me.
- **Pragurile de alarmă:**

| Indicator | Țintă | Alarmă: ce faci |
|---|---|---|
| Plângeri spam (pe campanie) | < 0,08 % | ≥ 0,1 %: oprești campaniile segmentate o săptămână, verifici subiectul, segmentul, frecvența |
| Bounce hard (pe trimitere) | < 0,5 % | ≥ 2 %: oprești trimiterea (sau lotul de reactivare), verifici sursa adreselor |
| Dezabonări (pe campanie) | < 0,3 % | > 0,5 %: subiectul sau segmentul n-a fost potrivit; mai rar către acel segment |
| Dezabonări Welcome | < 0,8 % | > 1,2 %: mai puține emailuri sau pauze mai lungi |
| Rata de spam în Google Postmaster | < 0,1 % | > 0,3 %: Gmail începe să blocheze; pauză la campanii și analiză |
| Click-uri unice pe newsletter | ≥ 1 % | < 0,5 % două săptămâni la rând: schimbi unghiul și testezi subiectul |

---

## Anexa A · Segmentele (create pe 16.10.2026)

Cifrele sunt abonații email la prima evaluare. Se schimbă zilnic. Id-urile complete și regulile sunt în `build_log.md`.

| Segment | Id | Abonați email | La ce îl folosești |
|---|---|---:|---|
| E · Implicați 30 zile | `6ad1726b27f58d99080fa022` | 286 | raportare, teste A/B; baza pentru reactivare (v2) |
| E · Implicați 90 zile | `6ad1726f049eafefc608b1fd` | 587 | campania de cadouri (02.12) |
| E · Implicați 180 zile | `6ad172f7f1d4c6e0cd071d59` | 697 | raportare (nu ca audiență de newsletter, vezi mai sus) |
| E · Niciodată deschis (abonați de peste 30 de zile) | `6ad17270f95f3132e50be1c6` | 947 | excludere din campaniile segmentate |
| E · Candidați sunset | `6ad172fafea1bb7f02022d63` | 626 | sunsetul lunar |
| C · Proteine | `6ad1729924f4de61e208d855` | 241 | campaniile din 21.10 și 04.11 |
| C · Creatină | `6ad1729bc3b9bd57900cc52c` | 132 | campanii pe creatină |
| C · Pre-workout | `6ad1729c98c07e19db0e7d5b` | 105 | campanii pe pre-workout (cu avertismentul pentru cafeină) |
| C · Cremă de orez | `6ad1729d727c10d0f807eee8` | 179 | stoc revenit; excludere la 21.10 |
| C · Vitamine și minerale | `6ad1729e9d64d022430ccf19` | 199 | campania din 28.10 |
| C · Aminoacizi | `6ad1729f47cf41686b0b7d0d` | 82 | campanii pe EAA |
| I · Interesați proteine (v2) | `6ad173e5cc6c8283940f2765` | 312 | campaniile din 21.10 și 04.11 |
| I · Interesați creatină | `6ad172aad41be3dfdb00c04d` | 84 | campanii pe creatină |
| I · Interesați cremă de orez | `6ad172ad092bbf1ea50123b2` | 241 | stoc revenit |
| I · Interesați vitamine (v2) | `6ad173e919d8a374fc0e183c` | 133 | campania din 28.10 |
| L · Abonați fără comandă | `6ad172b020cea36ef60e2c4f` | 1.405 | campanii pentru prima comandă |
| L · Clienți cu o comandă | `6ad172b20c9007be7a070a0e` | 451 | rezerva pentru filtrul de la pasul 30 |
| L · Clienți recurenți (2+) | `6ad172b40c0153fe610e94a1` | 487 | campania din 18.11 |
| L · VIP | `6ad172b51be4cc419d09edff` | 193 | VIP (pasul 31), 17.11, stoc revenit cu 24 de ore înainte |
| R · În risc (60–120 zile) | `6ad172bc39966404cd0c35bd` | 110 | restanțe (1), 03.11 |
| R · Pierduți (120–365 zile) | `6ad172bfa5c927ee5e0265e6` | 167 | restanțe (2), 19.11 |
| R · Recurenți în risc | `6ad172c14dc6bb66c30522c3` | 173 | raportare |
| P · Abonați pop-up fără comandă | `6ad172c3e735825c370b0794` | 216 | raportare, campanii pentru prima comandă |
| P · Abonați noi 11 zile (în Welcome) | `6ad172c53116d1a3dc047d65` | 66 | **excludere din toate campaniile** |
| Reactivare 2026-10 · neconfirmați (v2) | `6ad173ec8aeb4a67c90dc231` | 1.038 | cine n-a dat click și n-a comandat în 30 de zile; verificarea din 10.11 |
| Reactivare 2026-10 · confirmați (v2) | `6ad173ef36c2a06946042af5` | 4 | raportare |
| X · Au comandat în ultimele 14 zile | `6ad172c6ccd965f987077922` | 95 | excludere din campaniile segmentate |
| X · Cumpărători 180 zile | `6ad172c86d8a18d77d09cd99` | 380 | folosit în „E · Candidați sunset” |
| X · Acord nedovedit | `6ad172dd6d39c4f462075e01` | 0 | excludere (se umple după verificarea din pasul 29) |
| X · Checkout fără comandă, neconfirmați (v2) | `6ad173f2a097608aa90d1512` | 17 | excludere din toate campaniile |
| X · Igienă (adrese de evitat) | `6ad172cbf737a11bc604a07d` | 27 | excludere din toate campaniile |
| X · Sunset suprimați | `6ad172e2a08ad81d7104a271` | 0 | excludere din toate campaniile (se umple din 24.11) |
| X · Frecvență redusă | `6ad172e48d141988610e2a0f` | 0 | excludere din campaniile segmentate |
| SMS · Acord dovedit | `6ad172e601ad1e3597027d70` | 0 | singura audiență SMS (după pasul 34) |
| SMS · Cumpărători cremă de orez | `6ad172feef36304d010105f2` | 0 | SMS la stoc revenit |
| Reactivare 2026-10 · de confirmat (v2) *(jobul de reactivare)* | `6ad1678705a9707c810ef1e0` | 1.042 | audiența emailului 1 de reactivare; excludere până la 10.11 |
| Reactivare 2026-10 – fără reacție la e-mail 1 *(jobul de reactivare)* | `6ad165dd0e95411168089f2f` | 0 până pe 20.10 | audiența emailului 2 de reactivare |

Segmentele de sistem folosite: „Subscriber fatigue - Fatigued” (excludere), „Shopping - First time buyers” și „Shopping - Repeat buyers” (filtrele din fluxuri), „Shopping - Nonbuyers lifetime”.

## Anexa B · Checklistul înainte de „Trimite” și de „Pornește” (SYSTEM.md §7.5)

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
