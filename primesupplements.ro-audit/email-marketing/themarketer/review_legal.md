# Review adversarial: lege, brand, confidențialitate — `SYSTEM.md`

**Data:** 15.10.2026 · **Obiect:** `themarketer/system/SYSTEM.md` (versiunea din 15.10, 23:31, 1.534 de rânduri), toate textele de email și SMS, textele formularelor și regulile de trimitere · **Autor:** Claude · **Nu este consultanță juridică.** Punctele marcate „(de confirmat cu un jurist)” au o interpretare incertă.

**Ce am comparat:** `email/brief_legal.md` (regulile pe lege), `top50/legal_top50.md` (formulările oficiale ale mențiunilor și capcanele, regula casei), `top50/label_facts.md` (etichetele; „eticheta câștigă”), `email/brief_store.md`, `email/reviews.md`, pagina live Prime Whey 2 kg (copie locală din 13.10), `themarketer/sync_report.md`, `system/audit_audience.md`, `system/audit_catalog.md`, newsletterele din `themarketer/newsletter/` și `newsletter/review.md`. Verificări pe web: formularea mențiunii pentru creatină folosită în România și regula din HG 947/2000 despre prețul pe unitate în publicitate (surse la final).

**Confidențialitatea acestui fișier:** conține doar citate din `SYSTEM.md`, cifre și id-uri. Nu conține adrese de email, nume sau telefoane de clienți.

---

## Pe scurt

- **6 probleme blocante** (le corectezi înainte să pornești fluxul sau trimiterea respectivă), **17 majore**, **20 minore**. Am verificat **16 reguli** care sunt deja corecte (§F).
- **Cele mai grave:**
  - **L1.** Reactivarea celor 801 de contacte (etapa 3 a sincronizării) are dovada verificată doar pe un eșantion. Trebuie verificat fiecare contact: cine s-a dezabonat singur sau a făcut plângere nu poate fi reabonat. Riscul e o amendă ca la Elefant Online.
  - **L2.** Formularele cer acordul pentru „ghidul de duminică” și „maximum 2 emailuri pe săptămână”. Sistemul trimite însă și seria Welcome, campanii de produs și fluxuri de abandon, până la 3 emailuri pe săptămână. Acordul nu acoperă ce trimitem.
  - **L3.** Pop-up-ul promite codul WELCOME5, dar fluxul Welcome îi scoate pe cumpărători înainte de emailul cu codul. Promisiunea nu se ține.
  - **L4.** Blocurile de produs din feed pot afișa singure prețul tăiat. Feedul are deja prețuri comparate: Creamy Rice 65/60, batoane 155/100, EAA 185/175, magneziu 90/60. Asta înseamnă reducere anunțată fără verificarea Omnibus.
  - **L5.** Recomandările automate pot scoate produse ca „Fat Burning Booster Shot” sau „Water Out”, chiar în emailurile în care scrie „îți recomandăm”.
  - **L6.** Fluxurile de navigare și de coș depind de trackingul de pe site. Planul nu verifică dacă trackingul se încarcă doar după acordul pentru cookie-uri.
- **Mențiuni de sănătate:**
  - creatina are două formulări diferite în sistem;
  - mențiunea pentru magneziu nu e tipărită pe etichetă;
  - „sursă de carbohidrați” e o formulă de mențiune nutrițională care nu există (newsletterul a scos-o deja);
  - „să-i ajutăm pe sportivi să performeze mai bine” e o promisiune generală;
  - Welcome E2 numește Cluster și glutamina Kyowa®, adică exact produsele cu nume de efect.
- **Conform:**
  - **Black Friday:** nu există nicio campanie de Black Friday.
  - **Producătorul:** nu e numit nicăieri.
  - **Coduri:** nu se propune niciun cod nou fără marcajul „decizie proprietar”. Excepție: P.S.-ul despre Black Friday conține o promisiune de preț (M15).

**Legendă:** **L** = blocant · **M** = major · **m** = minor. „r. N” = rândul din `SYSTEM.md`.

---

## A. Blocante

### L1 · Reactivarea: verificare contact cu contact, nu pe eșantion
- **Unde:** §9.3 (r. 1359) și §10.1, pasul 14 (etapa 3 a sincronizării, 801 rânduri).
- **Citat:** „Au acord valid în Shopify, dar n-au primit nimic de la noi de 3 luni, iar o parte nu deschideau nici înainte.”
- **De ce:**
  - `sync_report.md` spune că doar **9 contacte din G_REACT** au fost verificate individual ca scoase administrativ. Au fost excluse 20 de contacte care s-au dezabonat singure.
  - Shopify poate arăta încă SUBSCRIBED pentru cineva care s-a dezabonat din theMarketer. Reabonarea lui încalcă Legea 506/2004 art. 12 și GDPR art. 7(3) și 21(3); ANSPDCP a amendat Elefant Online exact pentru asta.
  - **Dovada acordului:** GDPR art. 7(1) cere dovada acordului, nu doar starea SUBSCRIBED. O parte din abonații Shopify vin din migrarea din WooCommerce (blocul din 17.06.2025), unde dovada lipsește adesea.
  - **Datele nu se potrivesc:** `SYSTEM.md` scrie 10.07, raportul de sincronizare scrie 13.07.
- **Înlocuire exactă** (§9.3, după primul paragraf, și condiție la pasul 14):
  > **Înainte de etapa 3, fiecare dintre cele 801 contacte trece trei verificări. Cine pică una nu e reabonat.**
  > (1) În theMarketer, dezabonarea vine din curățarea administrativă din iulie (data curățării, nu un click pe „Dezabonare”). Contactul nu are plângere de spam și nu are hard bounce.
  > (2) În Shopify, `emailMarketingConsent.marketingState = SUBSCRIBED`, cu `consentUpdatedAt` completat. Dacă `marketingOptInLevel = UNKNOWN`, rămâne neabonat până ai dovada din WooCommerce: data, formularul și textul.
  > (3) Nu are nicio dezabonare, în niciun sistem, după data acordului.
  > Claude raportează doar cifrele: câți trec, câți pică și din ce motiv. Data curățării se scrie la fel peste tot, după jurnalul theMarketer.

### L2 · Acordul cerut în formulare nu acoperă ce trimitem
- **Unde:** §8.2 pop-up (r. 1282), §8.3 footer și blog (r. 1294–1295), §8.5 bifa de la checkout (r. 1308).
- **Citate:**
  - „Lasă-ne adresa de email. După ce confirmi abonarea, îți trimitem codul WELCOME5 și, în fiecare duminică, ghidul săptămânii de pe blog. Maximum 2 emailuri pe săptămână.”
  - „Un ghid util pe săptămână despre proteine, creatină și alimentația pentru sală. Fără spam, te dezabonezi dintr-un click.”
  - „Ți-a fost util? Primește ghidul săptămânii duminică la 18:00.”
  - „Vreau ghidul săptămânal și ofertele Prime pe email (maximum 2 pe săptămână).”
- **De ce:**
  - **Acord specific și informat** (GDPR art. 4(11), 7(2); Legea 506/2004 art. 12(1)). Abonatul din footer sau de pe blog acceptă „un ghid pe săptămână”, dar primește seria Welcome (4 emailuri în 9 zile), campania segmentată săptămânală și fluxurile de abandon. Asta depășește scopul acceptat.
  - **Promisiune falsă de frecvență** (Legea 363/2007 art. 6). Regula din §3.1 e „maximum 3 în 7 zile”. Prima săptămână din Welcome are 3 emailuri de marketing plus confirmarea. Coșul și checkout-ul au smart sending oprit, deci pot depăși orice plafon.
- **Înlocuire exactă:**
  - **Text pop-up:**
    > Lasă-ne adresa de email. După ce confirmi abonarea, îți trimitem codul WELCOME5, apoi ghidul de duminică, emailuri despre produsele, noutățile și ofertele Prime și un memento dacă lași produse în coș. De obicei, 1–2 emailuri pe săptămână.
  - **Formular footer, text:**
    > Un ghid util pe săptămână despre proteine, creatină și alimentația pentru sală, plus emailuri despre produsele și ofertele Prime (de obicei 1–2 pe săptămână). Te dezabonezi oricând, din linkul din fiecare email.
  - **Formular blog, text:**
    > Ți-a fost util? Primește ghidul săptămânii duminică la 18:00, plus noutăți și oferte Prime (de obicei 1–2 emailuri pe săptămână).
  - **Bifa de la checkout:**
    > Vreau emailurile Prime: ghidul săptămânal, noutăți și oferte (de obicei 1–2 pe săptămână).
  - **Varianta B** (dacă vrei să păstrezi promisiunea „doar ghidul”): contactele cu tag „abonare footer” sau „abonare blog” se exclud din Welcome E2–E4, din campaniile segmentate și din fluxurile de prioritate 6–9. Primesc doar Welcome E1, newsletterul și, dacă lasă un coș, fluxul de coș. Aici ai nevoie și de varianta „mementouri de coș” în textul formularului.

### L3 · Codul promis în pop-up nu ajunge la clienții existenți, iar condițiile codului diferă de la un text la altul
- **Unde:** §4.1, filtrele (r. 260) și schema (r. 266); §8.2, titlul pop-up-ului (r. 1281) și textul mic (r. 1285); preheaderul E1 (r. 295), P.S.-urile din E2, E3, E4 (r. 357, 395, 433), emailul de confirmare (r. 286).
- **Citate:**
  - „Start (abonare confirmată) → Filter: Buyer in the last 365 days → ies”
  - „**Titlu:** 5 % la prima comandă” și, în același pop-up, „WELCOME5: 5 % la toată comanda, o singură utilizare per client.”
- **De ce:**
  - **Promisiune neținută.** Un client din ultimele 12 luni apasă „Vreau codul”, confirmă abonarea și nu primește nimic. Asta e practică înșelătoare (Legea 363/2007 art. 6 și Anexa 1 pct. 5).
  - **Condiții contradictorii în același formular.** Legea 365/2002 art. 6(2)(c) cere condiții clare. În Shopify, WELCOME5 **nu** e limitat la prima comandă (`brief_store.md` §6): îl poate folosi o dată orice client care nu l-a folosit încă. Pop-up-ul spune însă „la prima comandă”.
- **Înlocuire exactă:**
  - **Schema §4.1:**
    ```text
    Start (abonare confirmată) → Time delay 5 minute → Send email 1 (WELCOME5)
    → Filter: Buyer in the last 365 days → ies (clienții recenți primesc doar E1, apoi newsletterul)
    → Time delay 2 zile, until 18:30 → Filter: Buyer in the last 3 days → ies → Send email 2 (povestea)
    → (restul neschimbat)
    ```
    Și la „Filtre” (r. 260): „Imediat **după emailul 1**, Filter «Buyer in the last 365 days» → ies.”
  - **Titlu pop-up:** „5 % la următoarea comandă”.
  - **Textul mic al pop-up-ului:** vezi m8.
  - **Preheaderul E1:** „WELCOME5: 5 % la toată comanda, o singură dată per client. Peste 300 de lei, livrarea e gratuită.”
  - **P.S. E2:** „P.S. Codul tău WELCOME5 e încă valabil: 5 % la toată comanda, o singură dată.”
  - **P.S. E3:** „P.S. Cu WELCOME5 ai 5 % la toată comanda, o singură dată, iar peste 300 de lei livrarea e gratuită.”
  - **P.S. E4:** „P.S. WELCOME5 e încă al tău: 5 % la toată comanda, o singură dată, fără dată de expirare.”
  - **Emailul de confirmare:** vezi m10.
  - **Decizie proprietar** (alternativă): limitezi WELCOME5 în Shopify la clienții fără comenzi și păstrezi „la prima comandă”. În acest caz, emailul 1 către un cumpărător existent spune clar că WELCOME5 e doar pentru prima comandă. Implicit nu schimbăm codul.

### L4 · Prețuri tăiate afișate automat de blocurile din feed
- **Unde:** §4.0, „Blocuri de produs” (r. 246); §7.1, „Produse”; §7.2, M4 și M5; toate fluxurile cu bloc dinamic (coș, checkout, navigare, reaprovizionare, client existent, recâștigare, stoc revenit); Welcome E1, cu „3 carduri de produs statice din feed”.
- **Citat:** „Blocurile dinamice (coș, produs văzut, produs de reaprovizionat, recomandări) iau singure prețul și imaginea din feed.”
- **De ce:**
  - **Planul se contrazice.** §4.12 spune corect că feedul are „prețul întreg” și „prețul de acum”, iar §5 interzice prețul tăiat în campanii. Regula nu e însă aplicată și blocurilor din automatizări, care pleacă singure, fără verificare.
  - **Feedul are deja prețuri comparate.** Creamy Rice 65/60, batoane 155/100, EAA 185/175, magneziu 90/60. Un preț tăiat într-un email este anunțarea unei reduceri, deci trebuie să arate cel mai mic preț din ultimele 30 de zile (HG 947/2000 art. 4¹; Directiva 98/6 art. 6a).
- **Înlocuire exactă** (în §4.0, după „Blocuri de produs”, și în §7.1, rândul „Produse”):
  > **Fără preț vechi în emailuri.** În toate blocurile de produs, statice și dinamice, din campanii și din automatizări, oprești afișarea prețului vechi („old price” / „full price”) și a etichetei de reducere („-X %”). Rămâne doar prețul de azi. Dacă blocul dinamic nu permite asta, scoți prețul din bloc: rămân imaginea, numele și butonul. **Testul obligatoriu:** un email de test cu Creamy Rice tort de ciocolată în coș trebuie să arate doar „60 lei”, fără „65 lei” tăiat.
- **De verificat separat** (nu e strict în emailuri): prețurile comparate de pe paginile de produs trebuie să fie, la rândul lor, cel mai mic preț din ultimele 30 de zile. Altfel pagina însăși încalcă regula, iar WELCOME5 se adaugă peste o reducere nevalidă.

### L5 · Recomandările automate pot promova produse cu nume de efect
- **Unde:** §4.0 (r. 247) și blocurile „Frequently Bought Together”, „Recommended For You” și „Others You May Like” din 4.3.2 (r. 568), 4.5.3 (r. 721, 728), 4.6 (r. 780, 798), 4.7 (r. 817, 843), 4.9.2 (r. 906, 916).
- **Citat:** „**Decizie proprietar:** le excludem și din recomandări (12 id-uri, gata de aplicat prin API, `audit_catalog.md` §9.3)?”
- **De ce:**
  - **Recomandarea e a noastră.** Când emailul spune „Pe baza comenzilor tale, îți recomandăm:” sau „Clienții care au ales aceste produse au mai luat:” și blocul scoate „Fat Burning Booster Shot”, „Thermo Core”, „Water Out”, „Liver Protect” sau „Cluster Insulin Bomb”, noi promovăm un produs al cărui nume sugerează un efect neautorizat.
  - **Temei:** Reg. 1924/2006 art. 1(3) (marca sau numele comercial e o mențiune) și regula casei „fără «arde grăsimi»”. E altceva decât coșul, unde omul a ales singur produsul.
- **Înlocuire exactă** (r. 247, a doua jumătate):
  > Pot apărea doar în blocurile care arată ce a ales omul (coș, produs văzut). **Din blocurile de recomandare sunt excluse obligatoriu**, înainte să pornească orice flux cu recomandări (4.3 E2, 4.5 E3, 4.6, 4.7, 4.9 E2). Claude aplică prin API excluderea celor 12 id-uri. Dacă excluderea s-ar aplica și pe site și nu vrei asta, în emailuri nu folosești blocuri de recomandare, ci doar cele 3 carduri statice (Prime Whey 2 kg, Creatină Creapure®, Creamy Rice tort de ciocolată).

### L6 · Trackingul de pe site și transparența (fluxurile de navigare, coș și checkout și segmentele „I · …”)
- **Unde:** §4.2–4.4, §6.3, §10.1. `SYSTEM.md` nu are nicio regulă pentru asta, deși `audit_audience.md` (r. 357) a semnalat problema.
- **Citat:** „Ieri te-ai uitat pe site la acest produs:” (4.4.1)
- **De ce:**
  - **Cookie-uri:** evenimentele „produs văzut” și „coș” vin din scriptul theMarketer. Legea 506/2004 art. 4(5) cere acord pentru cookie-urile de marketing înainte să se încarce scriptul. În 2025, ANSPDCP a dat o amendă de 20.000 de lei unui magazin online exact pentru asta.
  - **Transparență:** emailul care spune „te-ai uitat la acest produs” presupune că politica de confidențialitate descrie trackingul și profilarea (GDPR art. 13 și 21).
- **Înlocuire exactă** (pas nou în §10.1, „Ziua 1”, după pasul 8):
  > **8b. Trackingul și politica.** Verifici, cu bannerul de cookie-uri, că scriptul theMarketer se încarcă **doar după acordul pentru cookie-uri de marketing** (în fereastră privată: fără acord, în theMarketer nu apare niciun eveniment „view_product” sau „add_to_cart”). În politica de confidențialitate verifici că scrie:
  > - theMarketer este persoana împuternicită pentru email, SMS și trackingul de pe site;
  > - folosim produsele văzute, coșul și categoriile cumpărate pentru emailuri personalizate;
  > - te poți opune oricând acestei profilări;
  > - cât timp păstrăm datele (vezi M16).
  >
  > **Fluxurile 4.2–4.4 nu pornesc înainte de această verificare.**

---

## B. Majore

### M1 · Ce le spunem abonaților despre frecvență nu se potrivește cu ce trimite sistemul
- **Unde și citate:**
  - **Welcome E1** (r. 324): „Apoi primești ghidul de duminică și, cel mult o dată pe săptămână, un email despre produse.”
  - **Welcome E4** (r. 429): „…și cel mult o dată pe săptămână un email despre produse.”
  - **Sunset** (r. 977): „Dacă rămâi, primești o dată pe săptămână ghidul săptămânii de pe blog. Despre produse îți scriem cel mult o dată pe săptămână.”
  - **„MAI RAR”** (r. 211, r. 937 și subsolul de la r. 1207): „Răspunde cu «MAI RAR» și îți trimitem doar ghidul de duminică.” În §3.5 (r. 212) scrie însă: „Rămân: newsletterul de duminică, fluxurile de comandă, checkout, coș și reaprovizionare.”
- **De ce:**
  - Coșul, checkout-ul, navigarea, reaprovizionarea și recâștigarea sunt tot emailuri despre produse.
  - **„MAI RAR”:** promitem „doar ghidul”, dar continuăm 4 tipuri de emailuri de marketing. Asta înseamnă o opoziție parțială nerespectată (GDPR art. 21(2)–(3)) și o informare înșelătoare (Legea 363/2007 art. 6).
- **Înlocuire exactă:**
  - **Welcome E1:**
    > Apoi primești ghidul de duminică și cel mult un email pe săptămână despre produse. Dacă lași ceva în coș sau comanzi, îți scriem și despre asta.
  - **Welcome E4:**
    > De acum îți scriem doar când avem ceva util: duminică, ghidul săptămânii de pe blog, cel mult un email pe săptămână despre produse și mementourile legate de coșul și comenzile tale. Vrei și mai rar? Răspunde cu „MAI RAR”.
  - **Sunset:**
    > Dacă rămâi, primești duminică ghidul săptămânii de pe blog și cel mult un email pe săptămână despre produse, plus mementourile legate de coșul și comenzile tale.
  - **Subsolul §7.3 și §3.5:**
    > Vrei mai puține emailuri? Răspunde cu „MAI RAR” și îți trimitem doar ghidul de duminică și mementourile legate de coșul și comenzile tale.
  - **Recâștigare E3** (r. 937):
    > Răspunde cu „MAI RAR” și primești doar ghidul de duminică și mementourile legate de coș și comenzi.
  - **Varianta B:** păstrezi „doar ghidul de duminică” și excluzi `frecventa-redusa` și din fluxurile de navigare, reaprovizionare, client existent și recâștigare. Rămân doar coșul și checkout-ul, iar textul spune asta.

### M2 · Segmentul „SMS · Acord sigur (pop-up)” nu dovedește că acordul SMS vine din pop-up
- **Unde:** §6.6 (r. 1162), §3.3, §4.2.3, §4.12.
- **Citat:** „`subscribed_to` is sms · `tag` is „abonare pop-up” · `phone` is_not_empty”
- **De ce:**
  - Tagul „abonare pop-up” se pune la abonarea pe email. Dacă același contact a primit ulterior abonare SMS din conectorul Shopify (acordul SMS dedus din bifa de email, semnalat în audit), segmentul îl consideră „sigur”.
  - Nu știm nici ce text SMS avea pop-up-ul vechi.
  - **Temei:** Legea 506/2004 art. 12(1) (acord expres, prealabil) și GDPR art. 7(1) (dovada).
- **Înlocuire exactă** (§6.6 și §3.3, a treia bulină):
  > **SMS · Acord dovedit:** `subscribed_to` is sms · `tag` is „acord-sms-dovedit” · `phone` is_not_empty. Tagul îl pune Claude doar contactelor la care istoricul de consimțământ arată acordul SMS dat printr-un formular cu text SMS separat (pop-up-ul nou din §8.2 sau, pentru cel vechi, după ce verifici că avea o bifă SMS separată). Verificarea se face contact cu contact; raportăm doar cifrele. Până atunci nu pleacă niciun SMS de marketing.

### M3 · Mențiunea pentru magneziu nu e tipărită pe etichetă
- **Unde:** Client nou E2, blocul „Vitamine și minerale” (r. 706); nota de la r. 714; campania din 28.10 (§5).
- **Citat:** „**Magneziu bisglicinat** – 3 capsule pe zi (un flacon de 80 ajunge ~26 de zile); la această doză, magneziul contribuie la reducerea oboselii și extenuării; nu depăși 3 capsule pe zi.”
- **De ce:**
  - **Legea 56/2021 art. 7(5).** Comunicările comerciale pot folosi „exclusiv informațiile prezente pe eticheta suplimentului alimentar”.
  - **Ce scrie pe etichetă** (`label_facts.md`): eticheta de magneziu bisglicinat are formularea **neautorizată** „îmbunătățește sănătatea mintală … metabolismul adecvat … producția de energie”, nu „reducerea oboselii și extenuării”. Condiția de 15 % VNR e îndeplinită, dar mențiunea nu e pe etichetă.
  - Regula casei din `SYSTEM.md` (r. 11) spune exact asta: „doar dacă sunt pe eticheta produsului”.
  - **Formatul:** mențiunea e și inserată la mijlocul unei fraze. Regula din `legal_top50.md` §2.2 cere o propoziție separată pentru fiecare mențiune.
- **Înlocuire exactă** (r. 706, doar partea despre magneziu):
  > **Magneziu bisglicinat** – 3 capsule pe zi (un flacon de 80 ajunge ~26 de zile); nu depăși 3 capsule pe zi.
- **Doar după ce eticheta tipărește formularea autorizată**, adaugi după ea:
  > Magneziul contribuie la reducerea oboselii și extenuării. Efectul se referă la doza zilnică de 3 capsule.
- **Nota de la r. 714:** adaugi „…și doar dacă formularea autorizată e tipărită pe etichetă (azi nu este)”.
- **Campania din 28.10:** se aplică aceeași condiție.

### M4 · Mențiunea pentru creatină: o singură formulare, cea oficială
- **Unde:** Welcome E3 (r. 386), Client nou E2, blocul creatină (r. 702), nota tehnică (r. 397).
- **Citat:** „Creatina crește performanța fizică în cadrul exercițiilor fizice succesive, scurte, de intensitate mare. Efectul benefic se obține în condițiile unui consum zilnic de cel puțin 3 g de creatină.”
- **De ce:**
  - **Formulări diferite.** Regula casei (`legal_top50.md` §3.2), `brief_legal.md` §4.2, pagina Creapure® și newsletterele din 01.11 și 29.11 folosesc toate formularea oficială. Textul din SYSTEM e varianta de pe eticheta creatinei de 300 g. Două formulări în același sistem cresc riscul de eroare.
  - **„Cel puțin 3 g”** nu apare în condiția oficială („consum zilnic de 3 g”).
  - **„Doza de menținere”** (r. 702) trimite la faza de încărcare, pe care regula casei o interzice în texte („Never: … loading phase”).
- **Înlocuire exactă:**
  - **r. 386, după „Te antrenezi intens, în serii scurte?”:**
    > Creatina crește performanța fizică în eforturi succesive din timpul exercițiilor fizice de scurtă durată și de mare intensitate. Efectul benefic se obține în condițiile unui consum zilnic de 3 g de creatină. Produsul se adresează adulților care efectuează exerciții fizice de mare intensitate.
  - **r. 702:**
    > **Creatina ta.** O iei zilnic, și în zilele fără antrenament, după doza de pe etichetă. La Creapure® doza e de 3–5 g pe zi (o porție are 5 g: 60 de porții la 300 g, 100 la 500 g). La creatina monohidrat de 300 g urmezi schema de pe etichetă (½ măsură = 5 g). Plicurile Ready To Go: un plic pe zi, cu 30–60 de minute înainte de antrenament; după 8 săptămâni, eticheta recomandă o pauză de 2–3 săptămâni. Creatina crește performanța fizică în eforturi succesive din timpul exercițiilor fizice de scurtă durată și de mare intensitate. Efectul benefic se obține în condițiile unui consum zilnic de 3 g de creatină. Produsul se adresează adulților care efectuează exerciții fizice de mare intensitate. Bea suficientă apă pe parcursul zilei.
  - **r. 397:**
    > *Setare tehnică:* mențiunea pentru creatină e formularea oficială din Reg. 432/2012, aceeași ca pe pagina Creapure® și în newsletterele din 01.11 și 29.11. Eticheta creatinei de 300 g are o variantă echivalentă; la următorul tiraj o aliniezi la textul oficial.
- **De confirmat cu un jurist:** textul oficial exact din Jurnalul Oficial, versiunea în limba română.

### M5 · „Sursă de carbohidrați”: formulă de mențiune nutrițională neautorizată
- **Unde:** Welcome E3 (r. 387), Client nou E2, blocul cremă de orez (r. 704).
- **Citate:**
  - „Crema de orez e o sursă de carbohidrați care se prepară în câteva secunde.”
  - „E o sursă de carbohidrați, bună ca masă rapidă înainte de antrenament sau la micul dejun.”
- **De ce:**
  - Reg. 1924/2006 art. 8(1): sunt permise doar mențiunile nutriționale din anexă, iar „sursă de carbohidrați” nu e acolo.
  - Reviewul newsletterului (08.11) a scos deja aceeași formulare din același motiv. Sistemul trebuie să fie consecvent.
- **Înlocuire exactă:**
  - **r. 387:**
    > **Vrei o masă rapidă înainte de sală?** Crema de orez se prepară în câteva secunde, fără fierbere: o porție de 45 g are 32–35 g de carbohidrați, după aromă. Vezi [ghidul despre crema de orez](https://primesupplements.ro/blogs/news/cum-alegi-crema-de-orez).
  - **r. 704, ultima frază a blocului:**
    > O porție are 32–35 g de carbohidrați, după aromă, și o poți mânca înainte de antrenament sau la micul dejun.
- Valorile vin din fișele tehnice (`label_facts.md`): între 32,6 g (tort de ciocolată) și 35,1 g (natur) la 45 g.

### M6 · Welcome E2: promisiune generală de performanță
- **Unde:** r. 341.
- **Citat:** „Am pornit cu o misiune simplă: să educăm, să inspirăm și să-i ajutăm pe sportivi să performeze mai bine.”
- **De ce:** „Să performeze mai bine”, spus de un brand de suplimente, e o referire generală la un beneficiu legat de sănătate (performanța fizică). Reg. 1924/2006 art. 10(3) o permite doar însoțită de o mențiune autorizată specifică, iar emailul nu are niciuna.
- **Înlocuire exactă:**
  > Am pornit cu o misiune simplă: să educăm și să inspirăm sportivii și să le explicăm pe înțeles ce iau și de ce.

### M7 · Welcome E2 numește produsele cu nume de efect
- **Unde:** r. 346.
- **Citat:** „Creatina noastră este Creapure®, carbohidrații din Cluster sunt Cluster Dextrin®, glutamina este Kyowa®, iar izolatul proteic conține enzimele Digezyme®.”
- **De ce:**
  - „Cluster” înseamnă „Cluster Insulin Bomb”, iar glutamina Kyowa® înseamnă „L-glutamină Recovery Glutamin Kyowa®” (`audit_catalog.md`). Ambele sunt pe lista din §4.0 cu produse care „nu apar în textele scrise de noi” (Reg. 1924/2006 art. 1(3)).
  - E2 merge la toți abonații noi.
- **Înlocuire exactă:**
  > 2. **Folosim ingrediente cu nume.** Creatina noastră este Creapure®, iar Prime Supplements apare pe creapure.com ca brand partener Creapure® din România. Izolatul proteic conține enzimele Digezyme®. Sunt mărci pe care le poți verifica singur.
- Formularea despre creapure.com e permisă de `label_facts.md`. Digezyme® rămâne fără nicio mențiune despre digestie sau absorbție.

### M8 · Prime Whey: descrierea proteinei și modul de administrare
- **Unde:** Welcome E1 (r. 310), Welcome E3 (r. 371), Client nou E3 (r. 741), Client nou E2, blocul proteine (r. 700).
- **Citate:**
  - „proteină din zer concentrat, 82 g de proteine la 100 g de produs”
  - „Prime Whey se poate lua de 1–4 ori pe zi, după cât îți lipsește din mâncare”
- **De ce:**
  - **Compoziția.** Prime Whey are glicină și L-lizină adăugate. Regula casei (`legal_top50.md` §3.1) cere „X g proteine per porție (conform declarației nutriționale)” și interzice orice formulare care sugerează că toată proteina e din zer (Reg. 1169/2011 art. 7(1)(a)).
  - **Cifra.** Tubul (Bourbon Vanilla) declară 81,5 g la 100 g și 24,4 g la porția de 30 g; celelalte arome au valori apropiate. Eticheta are prioritate.
  - **Modul de administrare.** „1–4 ori pe zi” nu apare pe pagina produsului. Pagina spune: „o porție (aproximativ 30 g) cu apă sau lapte, după antrenament sau ca gustare între mese” (Legea 56/2021 art. 7(5)).
- **Înlocuire exactă:**
  - **r. 310:**
    > **Prime Whey 2 kg:** pudră proteică pe bază de concentrat din zer, cu aproximativ 24 g de proteine la porția de 30 g (conform declarației nutriționale), 66 de porții, 7 arome.
  - **r. 371, după notă:**
    > Pudră proteică pe bază de concentrat din zer, cu aproximativ 24 g de proteine la porția de 30 g. 66 de porții, 7 arome. Există și varianta de 1 kg, cu 33 de porții.
  - **r. 741:**
    > **Prime Whey:** pudră proteică pe bază de concentrat din zer, cu aproximativ 24 g de proteine la porția de 30 g, în 7 arome, la 2 kg sau 1 kg.
  - **r. 700, fraza despre Prime Whey:**
    > Modul de administrare pentru Prime Whey: o porție de aproximativ 30 g, cu apă sau lapte, după antrenament sau ca gustare între mese.
- Pentru Pure Isolate rămâne verificarea pe etichetă, deja cerută la r. 714.

### M9 · Prețul pe unitatea de măsură în emailurile cu preț
- **Unde:** §7.2, M4 „Card produs … preț”; campania din 04.11 (r. 1083: „Prime Whey 2 kg 360 lei / 66 porții ≈ 5,45 lei”); campania de cadouri din 02.12 (praguri de 100, 200 și 300 de lei).
- **De ce:** HG 947/2000 (republicată) cere ca în publicitatea pentru vânzarea la distanță să apară atât prețul de vânzare, cât și prețul pe unitatea de măsură. Un email cu preț intră aici. Prețul pe porție e util, dar nu înlocuiește prețul pe kg. (De confirmat cu un jurist: articolul exact; costul conformării e mic.)
- **Înlocuire exactă** (rândul M4 din §7.2):
  > M4 Card produs (1–3) | imagine, nume, o propoziție factuală (porții, gramaj), **prețul de azi și prețul pe unitate** (de exemplu „360 lei · 180 lei/kg”; la capsule, „· X lei/capsulă”), „Vezi produsul”
- **Campania din 04.11:** „Prime Whey 2 kg: 360 lei (180 lei/kg, ≈ 5,45 lei pe porție); Pure Isolate 2 kg: 480 lei (240 lei/kg, ≈ 6,49 lei pe porție)”, recalculat în ziua trimiterii.
- **Blocurile dinamice:** dacă nu pot afișa prețul pe unitate, aplici regula de la L4 (fără preț în bloc).

### M10 · Segmentul „C · Extracte din plante”: deduce date de sănătate
- **Unde:** §6.2 (r. 1117).
- **Citat:** „turmeric … silimarină … Liver Protect … Cardio Calm … Testo Revive … Water Out … **Folosit doar pentru conținut neutru**”
- **De ce:**
  - Un segment cu cumpărătorii „Liver Protect”, „Cardio Calm” sau „Testo Revive” grupează oamenii după o posibilă problemă de sănătate (ficat, inimă, testosteron). E risc de date din categoria specială (GDPR art. 9), fără acord explicit.
  - Instrucțiunile conectorului theMarketer interzic datele de sănătate.
  - Segmentul nu e folosit în nicio campanie sau flux (minimizarea datelor, GDPR art. 5(1)(c)).
- **Înlocuire exactă:** scoți rândul „C · Extracte din plante” din §6.2 și din lista de build, și adaugi sub tabel:
  > Nu facem segmente după cumpărarea unor produse care sugerează o problemă de sănătate (ficat, inimă, tensiune, hormoni, retenție de apă).

### M11 · Abonații din importuri: dovada acordului nu e verificată
- **Unde:** §5 și §6.1, audiența newsletterului („E · Implicați 180 zile”); §9.2, „Niciodată … importuri «abonat» fără dovada acordului”.
- **De ce:**
  - `audit_audience.md` arată **581 de abonați cu sursa „import”**, plus tagurile „import 25.06” (1 abonat) și „Update 13.11” (11 abonați).
  - Regula din §9.2 privește doar importurile viitoare. Pe cei deja importați îi folosim fără să știm de unde vine acordul (GDPR art. 7(1); cazul Cucina di Fabio, art. 25).
- **Înlocuire exactă** (o bulină nouă în §9.2):
  > **Abonații deja importați (sursa „import”, 581):** Claude verifică prin API câți au și acord în Shopify (SUBSCRIBED, cu dată) sau au dat click sau au comandat după abonare. Aceștia rămân. Ceilalți intră în segmentul „X · Acord nedovedit”, exclus din campanii până la decizia ta. Raportăm doar cifrele.

### M12 · Abonarea la checkout nu verifică adresa când nu urmează nicio comandă
- **Unde:** §1.2 (r. 45) și §8.1 (r. 1259).
- **Citat:** „La checkout nu e nevoie (adresa e confirmată de comandă).”
- **De ce:**
  - Afirmația e adevărată doar dacă urmează o comandă. Cine bifează abonarea și abandonează checkout-ul (~26 % din checkout-urile abandonate) e abonat fără nicio verificare a adresei.
  - Asta e exact situația din amenda Cucina di Fabio (GDPR art. 25: adresele trebuie să fie ale celor care s-au abonat).
- **Înlocuire exactă:**
  - **r. 1259:**
    > La checkout nu folosim DOI. Adresa e verificată doar dacă urmează o comandă. Cine bifează abonarea și abandonează checkout-ul primește doar fluxul de checkout (4.2). Intră în campanii abia după o comandă sau un click pe un email (segmentul „X · Checkout fără comandă, neconfirmați”, exclus din campanii).
  - **r. 45:** schimbi „La checkout nu e nevoie: adresa e verificată de comandă.” cu „La checkout, adresa e verificată doar de o comandă finalizată (vezi §8.1).”

### M13 · Stoc revenit: „Ți-am promis” nu e adevărat pentru varianta de campanie
- **Unde:** §4.12.1 (r. 1030).
- **Citat:** „Ți-am promis că te anunțăm: [produsul] e din nou în stoc.”
- **De ce:** Varianta de rezervă merge la segmentul „au văzut produsul X” ∪ „au cumpărat X”. Acești oameni n-au cerut să fie anunțați, deci afirmația e falsă (Legea 363/2007 art. 6). Doar un flux „Back in stock” cu înscriere explicită ar face-o adevărată.
- **Înlocuire exactă:**
  > Vești bune: [produsul] e din nou în stoc.

### M14 · Reconfirmarea celor 2.203 contacte: implicit nu-i contactăm
- **Unde:** §9.2 (r. 1355).
- **Citat:** „**Decizie proprietar** (cu un jurist, dacă vrei): o singură campanie de reconfirmare, doar pentru cei cu dovada acordului inițial.”
- **De ce:**
  - Un email care întreabă „vrei să te reabonezi?” e el însuși comunicare comercială. ICO a amendat Honda și Flybe în 2017 exact pentru asta.
  - Contactele nu sunt abonate nici în Shopify, deci e posibil să se fi dezabonat chiar ei.
  - Formularea „cu un jurist, dacă vrei” e prea permisivă.
- **Înlocuire exactă:**
  > **Cei 2.203 contacte scoase administrativ pe [data din jurnal], care nu sunt abonați în Shopify:** rămân neabonați și **nu primesc niciun email, nici de reconfirmare**. **Decizie proprietar, doar cu avizul unui jurist:** o singură reconfirmare, numai pentru contactele cu dovada acordului inițial (data, sursa, textul) și fără nicio dezabonare sau plângere făcută de ei, în theMarketer sau în Shopify.

### M15 · P.S.-ul „Nu facem Black Friday” conține o promisiune de preț
- **Unde:** §5, săptămâna 6 (r. 1086).
- **Citat:** „Nu facem Black Friday: prețurile noastre rămân aceleași toată luna”
- **De ce:**
  - E o garanție de preț pe o lună. Feedul are prețuri comparate active (Creamy Rice, batoane, EAA, magneziu), iar în magazin există coduri de influenceri active.
  - Orice schimbare de preț sau orice promoție din noiembrie face fraza falsă (Legea 363/2007 art. 6).
  - Rămâne decizie proprietar; nu e o campanie de Black Friday.
- **Înlocuire exactă:**
  > P.S. Nu facem Black Friday. Îți scriem în continuare, ca de obicei, ghidul de duminică.

### M16 · Nicio limită de păstrare pentru contactele suprimate
- **Unde:** §3.4, §4.10, §9.3, „după 30 de zile” (cei neconfirmați rămân abonați fără termen).
- **Citat:** „Rămâne abonat: primește în continuare emailurile de comandă și, dacă revine pe site, emailurile de coș și checkout.”
- **De ce:** GDPR art. 5(1)(e) (limitarea stocării). Contactele `email-inactiv` și „Reactivare 2026-10 · neconfirmați” rămân în baza de marketing pe termen nelimitat. Și acordul vechi, nefolosit ani la rând, devine greu de apărat. (De confirmat cu un jurist: perioada, aliniată cu politica de confidențialitate.)
- **Înlocuire exactă** (bulină nouă în §3.4):
  > **Păstrare:** un contact cu `email-inactiv` sau din „Reactivare 2026-10 · neconfirmați” care timp de 24 de luni nu dă click, nu comandă și nu vizitează site-ul este dezabonat și șters din theMarketer (datele de comandă rămân în Shopify, pentru contabilitate). Perioada se scrie la fel în politica de confidențialitate.

### M17 · Newsletterul din 18.10 leagă magneziul de somn (în afara textelor din SYSTEM, dar e în calendar și pleacă primul)
- **Unde:** §5, săptămâna 0 (r. 1080); `newsletter/2026-10-18.html` și `plan.json`.
- **Citate:**
  - **Subiect:** „Magneziul seara: cum îl iei și ce doză alegi”
  - **Preheader:** „… și ce spune UE despre somn”
  - **Intro:** „pentru cei care iau magneziul seara: … ce se poate spune, legal, despre magneziu și somn”
- **De ce:**
  - Fraza „nu există mențiune autorizată” e corectă. Dar un email care vinde magneziu și vorbește de trei ori despre somn creează, prin context, asocierea magneziu–somn, adică o mențiune implicită.
  - Regula casei (`legal_top50.md`): „Magnesium: no sleep, cramp, stress or anxiety claim exists.”
  - Pleacă duminică, 18.10. Decizia e a jobului de newsletter.
- **Înlocuire exactă:**
  - **Subiect:**
    > Magneziul: când îl iei și ce doză urmezi
  - **Preheader:**
    > Ghid nou pe blog: cum alegi momentul din zi și cum citești doza de pe ambalaj.
  - **Intro:**
    > Am publicat un ghid nou despre magneziu: când îl iei, ce doză urmezi și când e bine să întrebi medicul.
  - **Bulina „În UE nu există o mențiune de sănătate autorizată pentru magneziu și somn.”:** o ștergi.

---

## C. Minore

| # | Unde | Citat | De ce | Înlocuire exactă |
|---|---|---|---|---|
| m1 | Reactivare, r. 1385 | „cel mai util ghid de pe blog” | Superlativ (regula casei) | „un ghid practic de pe blog” |
| m2 | Welcome E1, r. 308; E3, r. 361, 369–379; Client nou E4, r. 749 | „Iată ce aleg cei mai mulți clienți” · „De aici încep cei mai mulți clienți Prime” · „Acestea sunt produsele pe care clienții le aleg cel mai des:” urmat de lista numerotată 1–5 · „cele mai alese produse” | „Cei mai mulți” înseamnă majoritatea, ceea ce nu e adevărat (Prime Whey 2 kg e în ~23 % din comenzi). Clasamentul numerotat sare peste Cluster și adună aromele Creamy Rice altfel decât vânzările (Legea 363/2007 art. 6) | E1: „Iată câteva dintre produsele cele mai comandate în ultimele 3 luni:” · E3, alternativa: „De aici încep mulți clienți Prime” · E3, r. 369: „Câteva dintre produsele cele mai comandate în ultimele trei luni:”, cu lista **fără numere** (buline) · E4, preheader: „Ce ai comandat data trecută, produse comandate des și livrare gratuită peste 300 de lei.” |
| m3 | Welcome E3, r. 379 | „Cei 8 aminoacizi esențiali” | Aminoacizii esențiali sunt 9; produsul are 8 | „Opt aminoacizi esențiali, într-o pudră cu aromă.” |
| m4 | Welcome E2, r. 349 | „Până acum am livrat peste 8.600 de comenzi” | 8.676 e numărul de comenzi, inclusiv cele anulate sau returnate | „Din 2022 am primit peste 8.600 de comenzi din toată țara.” |
| m5 | Checkout E2, r. 492 | „ai 14 zile pentru retur, cât timp produsul e sigilat” | Termenul curge de la primire. „Sigilat” e condiție doar la suplimente, nu la shakere sau haine | „Ca la orice cumpărătură online, ai 14 zile de la primirea coletului să te răzgândești. Suplimentele desigilate nu se mai pot returna, din motive de igienă. Transportul la retur îl plătești tu.” |
| m6 | Client nou E2, r. 706 și 712 | „Le poți lua la masă, cu un pahar de apă.” · „se iau de obicei o capsulă pe zi, la masă” | Moduri de folosire care nu sunt pe toate etichetele (Legea 56/2021 art. 7(5)) | r. 706: „Modul de administrare îl găsești pe eticheta fiecăruia.” · r. 712: „Extractele din plante (de exemplu turmericul, silimarina sau bergamota) au fiecare doza și modul de administrare pe etichetă; urmezi eticheta produsului tău și, dacă iei medicamente, întrebi medicul înainte.” |
| m7 | Pop-up, r. 1285; footer, r. 1294 | „Te poți dezabona oricând, dintr-un click.” · „te dezabonezi dintr-un click” | Promisiune neverificată: pagina theMarketer poate cere confirmare (reviewul newsletterului a scos aceeași frază) | „Te poți dezabona oricând, din linkul din fiecare email.” |
| m8 | Pop-up, r. 1282 și 1285 | „îți trimitem codul WELCOME5” · „WELCOME5: 5 % la toată comanda…” | §8.1 spune „Codul WELCOME5 nu mai apare în pop-up”: numele codului e dat înainte de confirmare | Text: „…îți trimitem codul de bun venit…” · text mic: „Codul de bun venit: 5 % la toată comanda, o singură utilizare per client. Te poți dezabona oricând, din linkul din fiecare email. Detalii în Politica de confidențialitate. Produsele noastre sunt pentru adulți.” |
| m9 | Pop-up, r. 1275 | „prenume (opțional); telefon (opțional), cu bifa SMS separată” | Minimizarea datelor (GDPR art. 5(1)(c)): prenumele nu e folosit („Salut!”), iar telefonul fără bifa SMS nu are niciun scop. Prenumele deja ghicite din adresa de email sunt date inexacte (art. 5(1)(d)) | „Câmpuri: email (obligatoriu); telefon, **doar dacă e bifată căsuța SMS** (altfel câmpul nu apare sau nu se salvează). Fără prenume. **Decizie proprietar:** golim prin API prenumele deduse din adresa de email?” |
| m10 | Confirmare DOI, r. 276 și 286 | „Apasă butonul și îți trimitem codul WELCOME5 și ghidul de duminică.” · „După confirmare îți trimitem codul de bun venit: 5 % la prima comandă.” | Emailul de confirmare trebuie să fie fără marketing (`brief_legal.md` §1.3). Procentul și „prima comandă” îl transformă în ofertă și contrazic L3 | Preheader: „Apasă butonul ca să confirmi abonarea la Prime Supplements.” · corp: „După confirmare primești emailul de bun venit promis în formular.” |
| m11 | Recâștigare E1, r. 889 | „Cum alegi crema de orez: pregelatinizare și absorbție →” | „Absorbție” în titlul linkului sugerează un efect (`reviews.md` respinge „absorbție bună” ca mențiune) | „[Cum alegi crema de orez →](https://primesupplements.ro/blogs/news/cum-alegi-crema-de-orez)” |
| m12 | Welcome E3, r. 391 și invitațiile „Răspunde … îți recomandăm noi” (E1, E3, navigare, client nou, recâștigare) | „(masă musculară, definire sau performanță la antrenament)” | Răspunsurile echipei sunt tot comunicări comerciale, deci aceleași reguli. Oamenii pot trimite date de sănătate. „Definire” împinge spre slăbit și „arzătoare” | r. 391: „(masă musculară, performanță la antrenament sau o rutină mai simplă)” · regulă nouă în §4.0: „**Răspunsurile la emailuri** respectă aceleași reguli: fără promisiuni de efect, fără «arde grăsimi» sau «slăbire», doar mențiunile de pe etichetă. Dacă cineva scrie despre o afecțiune sau un tratament, îi răspundem «discută cu medicul» și nu păstrăm detaliile în theMarketer.” |
| m13 | §3.5, r. 211–212 | doar „MAI RAR” are o procedură | Cine răspunde „STOP”, „dezabonează-mă” sau „nu mai vreau” trebuie scos repede. Altfel e cazul Elefant Online (GDPR art. 12(3), 21(3)) | Bulină nouă: „**Orice răspuns care cere oprirea emailurilor** («stop», «dezabonare», «nu mai vreau») = dezabonare din theMarketer în cel mult 2 zile lucrătoare (Audience > Contacts > contactul > Unsubscribe). Nu se tratează ca «MAI RAR».” |
| m14 | Campania din 02.12, r. 1087; campania din 09.12 | „Cadou pentru cineva care merge la sală? 3 idei pe buget” · „Comandă până joi, 17.12, ca să ajungă de Crăciun” | Suplimentele „nu se recomandă persoanelor sub 18 ani, femeilor însărcinate sau care alăptează” (eticheta). Cadoul poate ajunge la oricine. Termenul de livrare e o estimare a curierului | Rând nou în corpul campaniei din 02.12: „Suplimentele sunt pentru adulți: nu se recomandă persoanelor sub 18 ani, femeilor însărcinate sau care alăptează.” · campania din 09.12: „Comandă până joi, 17.12, ora 12:00: Cargus estimează livrarea înainte de Crăciun, pentru adresele din România.” |
| m15 | Campania din 04.11, r. 1083 | „Izolat sau concentrat: diferența pe etichetă” | Unghiul nu are încă limite. Riscul tipic e „fără lactoză”, „se digeră mai ușor”, „absorbție rapidă”, „mai pur” (regula casei §3.1: Pure Isolate „fără/sărac în lactoză” doar dacă scrie pe etichetă, iar pentru Digezyme® nimic despre digestie) | Adaugi la unghi: „Fără «fără lactoză», «digestie», «absorbție», «pur/pură»: comparăm doar proteina la 100 g, porția, ingredientele și prețul (cu prețul pe kg, M9).” |
| m16 | Sunset, r. 981; reactivare, r. 1390 | „nu-ți mai trimitem nici newsletterul, nici ofertele” · „Dacă nu apeși nimic, nu-ți mai trimitem campanii.” | Fluxurile de coș și checkout rămân, iar neconfirmații primesc newsletterul încă 30 de zile | Sunset: „…nu-ți mai trimitem newsletterul și campaniile. Rămân doar emailurile legate de ce faci pe site (de exemplu un coș lăsat neterminat) și cele despre comenzi.” · reactivare: „Dacă nu apeși nimic în 30 de zile, nu-ți mai trimitem campanii.” |
| m17 | SMS checkout, r. 508 | „comanda ta e salvata in cos” | Nu există nicio comandă, ci un coș | „Prime Supplements: produsele tale sunt salvate in cos: [link cos] Ajutor pe WhatsApp: 0775286584. Dezabonare SMS: [link dezabonare]” |
| m18 | Subsolul §7.3, r. 1211 | „Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată…” | Mențiunile pentru proteine apar și la produse care pot fi alimente, nu suplimente (Prime Whey, de verificat pe etichetă). Pentru alimente, art. 10(2)(a) cere fraza generală (`legal_top50.md` §2.3) | Prima frază a subsolului: „Este importantă o alimentație variată și echilibrată și un stil de viață sănătos. Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată.” Apoi rămâne „Nu depășiți doza zilnică recomandată. A nu se lăsa la îndemâna copiilor mici.” |
| m19 | §4.0, r. 249 (rândul cafeinei) și 4.7 (reaprovizionare) | „Produsele cu cafeină nu se recomandă copiilor, persoanelor sub 18 ani, femeilor însărcinate sau care alăptează. Citește avertismentele de pe etichetă.” | Combat Pro (300 mg cafeină pe porție) are interval de reaprovizionare. Mementoul „Dacă îl iei zilnic…” ajunge și la el. Rândul nu reia formularea de pe etichetă din Reg. 1169/2011, Anexa III, pct. 4.2, cerută de `audit_catalog.md` | „Dacă produsul conține cafeină: nu se recomandă copiilor sau femeilor însărcinate, și nici persoanelor sub 18 ani, femeilor care alăptează sau persoanelor sensibile la cafeină. Cantitatea de cafeină pe porție e pe etichetă; nu o combina cu alte surse de cafeină.” |
| m20 | §9.3 și sync | „la curățarea din iulie” / „pe 10.07” | `sync_report.md` scrie 13.07. Data intră în verificarea de la L1 | Scrii data din jurnalul theMarketer, la fel peste tot (§1.1, §1.2, §4.10, §9.2, §9.3) |

---

## D. Producătorul, Black Friday, coduri noi

- **Producătorul:** nu e numit nicăieri. Mărcile de ingrediente (Creapure®, Digezyme®, Cluster Dextrin®, Kyowa®) sunt pe etichete și în numele produselor, nu sunt producătorul contractual. Cluster Dextrin® și Kyowa® ies oricum din text prin M7. §7.5, pasul 10 („doar «fabricat în UE»”) e corect.
- **Black Friday:** nicio campanie de Black Friday. Săptămânile 09–15.11 și 23–29.11 sunt fără campanii de produs. „Super Black Friday SMS” se arhivează. Singura referire la Black Friday e P.S.-ul marcat „decizie proprietar”, corectat la M15.
- **Coduri noi:** niciun cod nou nu apare fără marcaj. Codul pentru a doua comandă (4.5.4), codul de recâștigare (4.9.3), cadoul VIP (4.11), stimulentul din testul T8 și codurile unice theMarketer sunt toate marcate „decizie proprietar”, implicit oprite. Placeholder-ul de la 4.9.3 cere cod creat în Shopify, cu dată reală de final.
  - **Completare:** dacă aprobi un cod de recâștigare trimis întregului segment, el e „disponibil multor clienți”. Se aplică deci aceeași regulă ca la 4.5.4: prețul de referință e cel mai mic preț din ultimele 30 de zile.

## E. Confidențialitatea documentului `SYSTEM.md`

- **Rezultat:** conform.
- **Adrese de email:** doar contact@primesupplements.ro, aliasul propus dmarc@primesupplements.ro și iam@themarketer.com.
- **Telefoane:** doar numărul magazinului.
- **Clienți:** niciun nume. Recenziile au „[autor]”. Contactele apar doar ca cifre, iar automatizările, segmentele și produsele prin id-urile lor.
- **Recomandare pentru build:** rapoartele din L1, M2 și M11 se fac tot în cifre. Lista nominală, dacă e nevoie, stă doar în `themarketer/private/` (chmod 700), ca la sincronizare.

## F. Verificat și conform (nu schimbi)

1. **Coș și checkout:** abandonul de checkout merge doar la abonații la email (Legea 506/2004 art. 12(2)); cei fără acord nu primesc nimic.
2. **DOI:** double opt-in, cu WELCOME5 trimis abia după confirmare. Emailul de confirmare are datele firmei și „Nu tu ai cerut abonarea?”.
3. **Dreptul de opoziție:** apare separat în primul email (Welcome E1, Client nou E1), conform GDPR art. 21(4).
4. **Subsolul comun:** are firma, CUI-ul, J-ul, sediul, telefonul, emailul, dezabonarea vizibilă (`{{unsubscribe_link}}`), politica de confidențialitate și fraza pentru suplimente. Contrastul e corectat.
5. **Urgență falsă:** nu există. „Ultima șansă” dispare. Stocul revenit e anunțat doar cu stoc real, iar termenul de Crăciun doar confirmat cu curierul.
6. **Scăderea de preț automată:** fluxul „price drop” e respins corect (Omnibus).
7. **Recenziile:** citatele corespund exact cu `reviews.md` (s-au schimbat doar diacriticele și punctuația). Cumpărătorii verificați sunt separați de total (Directiva 2019/2161, pct. 23b–23c și art. 7(6)).
8. **Mențiunea pentru proteine:** în forma combinată e acceptată de regula casei (`legal_top50.md` §3.1, „low risk”) și apare pe pagina Prime Whey. EAA nu primește mențiunea pentru proteine.
9. **Pre-workout:** blocul are cafeina (300 mg), interdicțiile pentru sub 18 ani, sarcină și alăptare și „nu depăși o porție pe zi”.
10. **Dreptul de retur:** prezentat „ca la orice cumpărătură online”, fără să fie vândut ca avantaj (Legea 363/2007, Anexa 1, pct. 10). Excepția pentru produsele desigilate e menționată.
11. **SMS:**
    - ore de liniște 20:00–10:00;
    - cel mult 2 pe lună;
    - niciodată în aceeași zi cu un email pe același subiect;
    - „Prime Supplements:” la început și link de dezabonare;
    - acordul SMS pus din greșeală la import se anulează.
12. **Sunset:** suprimă din campanii, nu dezabonează. Dezabonarea se face doar la cerere sau la hard bounce.
13. **Datele de pe site:** WhatsApp, programul, livrarea (20 de lei, gratuită peste 300), plata și curierul corespund cu `brief_store.md`.
14. **Autorul:** „cardul PRO în organizația NPC” vine de pe pagina verificată a autorului. Afirmațiile neverificate (FRCF, IFBB, TÜV, „primul antrenor”) nu apar.
15. **Vitamine:** D3 + K2 „o capsulă o dată la 2 zile” și „conține soia” corespund cu eticheta. Fără „imunitate” ca promisiune și fără „boost”.
16. **Checklistul §7.5:** cuvintele interzise, imaginile cu sloganuri și verificarea mențiunii pe etichetă sunt corecte. Lipsesc doar prețul pe unitate (M9) și blocurile dinamice (L4, L5), care trebuie adăugate în checklist:
    > 11. Blocurile dinamice nu arată preț vechi și nu recomandă produse cu nume de efect (L4, L5).
    > 12. Unde apare un preț, apare și prețul pe unitate (M9).

## G. Ordinea în care aplici

1. **Înainte de etapa 3 a sincronizării:** L1, M11, m20.
2. **Ziua 1 sau săptămâna 1, înainte de pop-up, DOI și formulare:** L2, L3, m7, m8, m9, m10, M12.
3. **Înainte de orice flux cu bloc de produs sau recomandări:** L4, L5, L6, M9, m19.
4. **La copierea textelor în fluxuri (săptămânile 2–3):** M1, M3, M4, M5, M6, M7, M8, m1–m6, m11, m12, m16, m17, m18.
5. **Înainte de primul SMS:** M2.
6. **În calendar:** M17 (până sâmbătă, 17.10), m15 (04.11), M15 (22.11), m14 (02.12 și 09.12), M13 (la primul stoc revenit).
7. **Reguli de proces:** M10, M14, M16, m13.

## Surse noi folosite în acest review

- [WebSearch: formularea mențiunii pentru creatină în comerțul din România](https://www.drmax.ro/creatina-monohidrata-micronizata-ultra-pura-252g-vivo) (doar ca reper: textele comercianților preiau formularea oficială „în eforturi succesive din timpul exercițiilor fizice de scurtă durată și de mare intensitate”); [Reg. 2017/672](https://www.boe.es/doue/2017/097/L00024-00026.pdf) (mențiunea separată pentru adulții de peste 55 de ani)
- [Avocatnet: modalitatea de indicare a prețurilor (HG 947/2000)](https://www.avocatnet.ro/articol_13012/Modalitatea-de-indicare-a-preturilor-Reglementare-si-sanctiuni.html): „În cazul publicității destinate vânzării la distanță este obligatorie informarea asupra prețului de vânzare și asupra prețului pe unitatea de măsură”
- Restul temeiurilor sunt cele din `email/brief_legal.md` (sursele S1–S29) și `top50/legal_top50.md`.
