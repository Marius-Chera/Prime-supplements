# Automatizările theMarketer: puține, dar bune

**16.10.2026** · Pentru: Marius · Pregătit de: Claude · Documentul conține doar cifre. Nu apare niciun nume, nicio adresă și niciun telefon de client.

**Cine face ce.** theMarketer nu permite crearea, editarea sau oprirea automatizărilor prin API. De aceea toate schimbările din automatizări le faci tu, în aplicație: lista Automation, iar cercul verde din stânga fiecărui rând înseamnă pauză. Te ghidez la fiecare pas. Îmi trimiți o captură de ecran, îți spun exact ce bifezi, apoi verific prin API că a mers. Segmentele, campaniile, tagurile și intervalele de reaprovizionare le fac eu, prin API.

---

## a) Răspunsul pe scurt

Din cele 10 rânduri pe care le vezi, plus cele fără trimiteri de sub ele, păstrăm **5 automatizări, cu 10 emailuri în total**. Trei sunt de bază și pornesc sigur: **Welcome**, **Coș** și **Reaprovizionare**. Două sunt mici și pornesc doar dacă editorul are filtrele de care au nevoie: **Client nou** și **Vizită fără comandă** (aceasta din urmă în probă 90 de zile). Fiecare pornește dintr-un gest al omului: s-a abonat, a lăsat un coș, a cumpărat prima dată, i se termină produsul, a trecut pe site și a plecat. Avem un singur flux pentru fiecare gest, fără dubluri. Azi apeși pauză pe 7 rânduri. Asta oprește 980 din cele 1.359 de emailuri automate din ultimele 30 de zile (72 %). Fluxurile respective au adus în 12 luni doar 3 comenzi reale, toate din „Bounce follow-up”, pe care îl repornim mai târziu cu un singur email pe lună. Mai multe fluxuri nu înseamnă aici mai multe comenzi: Cross sell a trimis 840 de emailuri în 90 de zile și a adus 0 comenzi.

---

## b) Ce faci cu fiecare rând din lista ta

Două rânduri au același nume („Remind customers to reorder”), iar șapte au aceeași dată (20 Jan 2026). De aceea fiecare rând e scris cu data creării și cu cifra din coloana **Completed**.

| # | Rândul din lista ta | Decizie | De ce | Când |
|---|---|---|---|---|
| R1 | **Remind customers to reorder** · creat 20 Jan 2026 · Completed **0** | **Devine fluxul Reaprovizionare.** Îl redenumești „Reaprovizionare 2026”. | Nu a trimis nimic din ianuarie, deci pornește cu raportul curat. De pe 15.10 produsele au intervale, așa că ar putea începe să trimită un text pe care nu l-a verificat nimeni. Dacă testul din săptămâna 1 nu arată nicio intrare, facem fluxul nou din șablon și îl arhivăm pe acesta. | Azi: pauză. Săptămâna 1: refăcut, pornit, testat. |
| R2 | **Cross sell** · 20 Jan 2026 · Completed **156** | **Devine fluxul Client nou**, ca o copie nouă („Client nou 2026”). R2 se arhivează. | E cel mai mare expeditor: 283 de emailuri în 30 de zile, cu 2 intrări la fiecare comandă. A avut 2 click-uri unice în 30 de zile și 0 comenzi reale în 12 luni. Cele „6 tranzacții / 1.795,60 lei” sunt comenzi puse de theMarketer pe seama emailului după o simplă deschidere. Nu îl modifici pe loc: cei 47 de oameni aflați acum în flux sunt mai ales clienți fideli și ar primi emailuri de primă comandă. | Azi: pauză. Săptămâna 2: arhivat. |
| R3 | **Product follow-up** · 20 Jan 2026 · Completed **71** | **Elimină** (pauză acum, arhivezi după) | 130 de emailuri în 30 de zile, 3 click-uri unice în 90 de zile (0,9 %, cea mai slabă rată) și 0 comenzi reale în 12 luni. A plecat și după cumpărare, noaptea (22:52–23:56), cu prenumele ghicit din adresa de email. Pentru vizitatori păstrăm un singur flux, pe cel care a vândut (R6). | Azi: pauză. Săptămâna 1: arhivat. |
| R4 | **Cart abandonment similar products** · 20 Jan 2026 · Completed **62** | **Elimină** (pauză acum, arhivezi după) | E dublura lui R10, pe același declanșator. În 82 % din zilele cu coș, omul a intrat în ambele fluxuri. Două emailuri de coș au ajuns la același om în același minut (14.10, 16:26). 124 de emailuri în 30 de zile și 0 comenzi reale în 12 luni. Agenția a cerut scoaterea dublurii. Recomandările lui se mută în emailul 2 de coș. | Azi: pauză. Săptămâna 1: arhivat. |
| R5 | **Inactivity behavior** · 20 Jan 2026, editat 12.10.2026 · Completed **61** | **Elimină** (pauză acum, arhivezi după) | E fluxul pe care agenția îl numește „sunset la 30 de zile”. Pornește după 30 de zile fără vizită pe site, ceea ce e normal pentru cine ia suplimente, și trimite la ora vizitei (03:26). 0 comenzi reale în 12 luni. De pe 12.10 nu mai trimite niciun email, dar încă primește contacte, așa că nu știm ce blocuri are acum. Îl înlocuiește campania lunară de recâștigare, pe care o fac eu. | Azi: pauză, plus o captură cu declanșatorul și blocurile. Săptămâna 1: arhivat. |
| R6 | **Bounce follow-up** · 20 Jan 2026 · Completed **100** | **Păstrezi și repari.** Devine „Vizită fără comandă”, în probă. | „Bounce” înseamnă aici un vizitator care a plecat de pe site, nu un email întors. Dintre fluxurile pentru vizitatori, e singurul care a vândut: 3 comenzi reale în 12 luni (una pe 11.10, prima comandă a unui client nou) și 9 click-uri unice în 90 de zile. Azi însă trimite 198 de emailuri pe lună: câte 2 la o vizită, noaptea, cu „cele mai bune oferte”, inclusiv abonaților în prima zi și clienților fideli. Rămâne cu un singur email pe lună, doar pentru cine n-a cumpărat. | Azi: pauză. Săptămâna 3: reparat și repornit, doar dacă editorul are filtrele (vezi §c.5). |
| R7 | **Welcome series 2** · 20 Jan 2026 · Completed **115** | **Păstrezi și repari.** Devine Welcome cu 4 emailuri. | E cel mai bun flux. A adus 5 din cele 12 comenzi reale din automatizări în 12 luni și 4 din cele 7 din ultimele 90 de zile, plus 3 prime comenzi doar în 1–15 octombrie. Are 6 din cele 21 de click-uri unice din ultimele 30 de zile. Probleme: subiectul lui E1 conține un URL, iar E2 („Oferte uimitoare doar pentru tine!”) pleacă și la cine tocmai a cumpărat. | Azi: reparație rapidă (10 min). Săptămâna 1: 4 emailuri. |
| R8 | **Automatizare cupon mail** · 18 Nov 2025 · Paused · Completed **0** | **Elimină.** E deja pe pauză, doar îl arhivezi. | 0 trimiteri din ianuarie. Un flux de cupon încalcă regula casei: singurul cod este WELCOME5. | Azi: arhivat. |
| R9 | **Remind customers to reorder** · creat 30 Jun 2025 · Completed **192** | **Elimină.** E prima pauză de azi. | Aici e bug-ul: trimite „Gata să le cumperi din nou?” la 0–2 minute după comandă (6 cazuri dovedite, la 3 clienți). 159 de emailuri în 30 de zile și 0 comenzi reale în 12 luni. Treaba lui o preia R1 refăcut. | Azi: primul click. Îl arhivezi după ce trece testul lui R1 (săptămâna 1). |
| R10 | **Cart abandonment** · creat 30 Jun 2025 · Completed **75** | **Păstrezi și repari.** Devine Coș. | Are cel mai bun randament pe email: 2 comenzi reale la 313 emailuri în 90 de zile și 3 comenzi în 12 luni. Se oprește corect la comandă. De reparat: E2 pleacă la 12 ore după E1, deci noaptea (01:12, 03:06, 03:40); „Ultima sansa” promite un termen care nu există; intrarea în flux e nelimitată (12 intrări într-o zi). | Azi: reparație rapidă (15 min). Săptămâna 2: texte noi. |
| sub R10 | **Toate rândurile de sub R10** care au 0 la In progress și 0 la Completed, printre ele cel de wishlist | **Elimină** (pauză acum, arhivezi după) | Nicio trimitere din 18.01.2026 și nicio intrare în cele 14 zile verificate. Fluxul de wishlist nu are cum să pornească: site-ul nu are wishlist (/pages/wishlist dă 404). Fluxurile „incomplete” din auditul agenției nu le mai terminăm. Le înlocuiesc cele 5 fluxuri de mai jos. | Azi, cel târziu înainte de 10.11. Atunci schimb taguri prin API, iar o schimbare de tag poate porni un flux vechi. |

**Câte rânduri sunt sub R10 nu știm sigur.** Derulezi până la capăt și tratezi la fel fiecare rând cu 0 / 0. Îl deschizi și faci o captură cu declanșatorul și blocurile. Dacă rulează, îl pui pe pauză, începând cu cele care au un bloc „Unsubscribe” sau „Add tag”. Apoi îl arhivezi, nu îl ștergi, ca să rămână istoricul. Dacă lista nu are buton de arhivare, îl lași pe pauză și îl redenumești „OPRIT · numele vechi”.

**Despre coloanele Transactions și Revenue.** theMarketer trece la email orice comandă a cuiva care a primit sau a deschis un email, chiar fără click. În ultimele 30 de zile, cele 8 fluxuri care trimit au avut doar 21 de click-uri unice la 1.359 de emailuri. În Shopify, după click, automatizările au adus 12 comenzi în 12 luni (Welcome 5, Cart abandonment 3, Bounce follow-up 3, fluxul de cupon 1) și 7 în ultimele 90 de zile. Restul fluxurilor: 0.

---

## c) Automatizările care rămân

**Reguli comune pentru toate cele 5:**
- Fiecare email pornește din șablonul unic „Prime · Master 2026”.
- Subiectul nu conține prenumele (azi e ghicit din adresa de email).
- În blocurile de produs apare doar prețul de azi, fără preț tăiat, cu prețul pe unitate (de exemplu „360 lei · 180 lei/kg”). Dacă blocul nu poate afișa prețul pe unitate, scoți prețul din bloc.
- Emailurile pleacă între 08:00 și 21:00, cu „Delay until a specific time of the day”. Două excepții, ambele la câteva minute după un gest al omului: Welcome E1 și Coș E1.
- La „Campaign UTM”: `utm_source=themarketer`, `utm_medium=email` (azi e `automation`, iar Shopify nu îl socotește email) și `utm_campaign=flow-<flux>-e<nr>`.

### 1. Welcome (din R7, „Welcome series 2”, redenumit „Welcome 2026”)
- **Ce face:** primește abonatul nou, îi trimite codul promis în pop-up și îl ajută să aleagă primul produs. E singurul flux care aduce clienți noi.
- **Declanșator:** abonare la email din pop-up sau din formulare. După ce pornește double opt-in, contează doar abonarea confirmată. „Include imported contacts” e oprit, ca importurile din Shopify și cei 1.042 de contacte reactivate să nu intre. Dacă editorul are filtru pe tag, E1 pleacă doar celor cu tag de formular („abonare pop-up”, „abonare footer”). Atunci cei abonați la checkout trec direct în Client nou.
- **Emailuri (4):**
  - E1, la 5 minute: codul WELCOME5 (5 % la toată comanda, o singură dată per client). Subiect: „Codul tău de 5 % e aici”.
  - E2, în ziua 3, la 18:30: povestea magazinului, fără vânzare.
  - E3, în ziua 6, la 18:30: cum alegi produsul, cu doza de pe etichetă și doar mențiunile oficiale.
  - E4, în ziua 10, la 10:00: recenzii reale din Judge.me, livrarea și returul.
  - E2, E3 și E4 pleacă doar de luni până sâmbătă, ca să nu cadă peste newsletterul de duminică.
  - Textele sunt în SYSTEM.md §4.1.
- **Cum se oprește:**
  - Imediat după E1, filtrul „Buyer in the last 365 days” scoate clienții. Ei primesc codul, apoi doar newsletterul.
  - Înainte de E2, E3 și E4, filtrele „Buyer in the last 4 / 7 / 11 days” scot pe oricine a comandat între timp.
  - Fluxul are „Only once”. Azi un abonat intră de 3 ori.
  - Smart sending e oprit, ca E1 să plece imediat.
- **Comenzi estimate în luna a 3-a:** 1,5–3 pe lună (azi ~1,3).

### 2. Coș (din R10, „Cart abandonment”)
- **Ce face:** amintește coșul lăsat și răspunde la ce îl ține pe om în loc: livrarea, plata, returul.
- **Declanșator:** coș abandonat de 60 de minute, doar la abonații email. Același flux prinde și checkout-urile abandonate. În 14 zile, doar 11 din 42 de checkout-uri abandonate cu email aveau acord de marketing, iar toate 11 intraseră deja în R10. Un flux separat de checkout le-ar fi scris acelorași oameni de două ori. O ramură separată de checkout se adaugă doar dacă editorul are un filtru pe evenimentul „checkout început”, cu fereastră în ore sau zile. Nu folosești filtrul „Funnel”: el înseamnă „cel mai departe pas din ultimele 3 luni” și ar trimite textul greșit în ambele direcții.
- **Emailuri (2):**
  - E1, la o oră după abandon: „Ce ai pus în coș e tot acolo”.
  - E2, a doua zi la 19:00: „Bine de știut înainte să comanzi”. Conține livrarea gratuită peste 300 de lei, plata cu cardul, prin transfer sau ramburs, livrarea Cargus în 1–3 zile lucrătoare și returul, plus 3 produse potrivite sub coș.
  - Nu apar „Ultima șansă”, coduri sau SMS. Textele sunt în SYSTEM.md §4.3.
- **Cum se oprește:**
  - Comanda: înainte de E2, filtrul „Buyer in the last 2 days” scoate pe cine a comandat. Se oprește și la dezabonare.
  - „Multiple times”, cu frequency capping de 7 zile: după o intrare, omul nu mai intră 7 zile.
  - „Exclude contacts who have not exited this automation flow yet” e pornit.
  - Smart sending e oprit.
- **Comenzi estimate în luna a 3-a:** 1–2,5 pe lună (azi ~0,7).

### 3. Reaprovizionare (din R1, redenumit „Reaprovizionare 2026”)
- **Ce face:** trimite un singur memento când se apropie de final produsul cumpărat.
- **Declanșator:** comanda cu statusul „fulfilled”. Azi R9 pornește la orice status, de 4 ori pe comandă. Întârzierea vine din „Delay by product recurrence”, pe intervalele puse de mine pe 15.10 la 31 de produse: de exemplu Creamy Rice 20 de zile, Prime Whey 1 kg 30, Prime Whey 2 kg 60, Pure Isolate 65, Creapure 90, magneziu bisglicinat 24, D3 + K2 145. Produsele fără interval (haine, accesorii, zinc, citrat de magneziu, produsele cu nume care sugerează un efect) nu primesc nimic.
- **Emailuri (1 pe produs):**
  - Pleacă după interval, în prima marți, vineri sau sâmbătă, la 10:00 („Delay until a specific day(s) of the week”). Așa nu cade lângă newsletterul de duminică sau lângă campania de miercuri.
  - Subiect: „Îți mai ajunge ce ai comandat?”. Textul spune „dacă îl iei zilnic, probabil se apropie de final”, nu „ți s-a terminat”. Fără cod.
  - Textul e în SYSTEM.md §4.7.1.
- **Cum se oprește:**
  - Filtrul „Buyer in the last 14 days” scoate pe cine și-a refăcut deja rezerva.
  - Fluxul are „Multiple times”.
  - **Frequency capping e oprit.** Capping-ul nu rărește emailurile. El blochează intrarea în flux, așa că a doua comandă dintr-o lună n-ar mai primi niciun memento.
  - „Exclude contacts who have not exited…” e oprit.
  - **Smart sending e pornit.** Așa nu pleacă două mementouri în aceeași zi, de exemplu pentru două arome de Creamy Rice.
- **Comenzi estimate în luna a 3-a:** 1–2,5 pe lună (azi 0, din cauza bug-ului). Mementourile de 20–30 de zile încep de la jumătatea lui noiembrie, cele de 60 de zile la sfârșitul lui decembrie, iar cele de 90 abia la sfârșitul lui ianuarie.

### 4. Client nou (copie nouă, în locul lui R2, „Client nou 2026”)
- **Ce face:** după prima comandă, îi spune omului ce urmează cu coletul și cum folosește produsul. E punctul „Client nou” din auditul agenției.
- **Declanșator:** comanda „fulfilled”, **doar dacă e prima comandă**. Filtrul e segmentul de sistem „Shopping - First time buyers” (sau „număr de comenzi = 1”) și se pune după prima pauză, ca segmentul să fi văzut deja comanda.
- **Dacă editorul nu are niciun filtru de primă comandă, nu îl construim acum.** Fără filtru ar intra aproape numai clienți fideli, adică am repeta greșeala din Cross sell. Îl reluăm când bifa de la checkout aduce clienți noi.
- **Emailuri (2):**
  - E1, a doua zi după expediere, la 10:00: mulțumire, livrare Cargus în 1–3 zile lucrătoare, cum se folosește produsul la doza de pe etichetă (doar mențiunile oficiale), întrebări pe email sau pe WhatsApp.
  - E2, în ziua 14, la 18:30: ce se potrivește cu comanda și livrarea gratuită peste 300 de lei.
  - Dacă editorul are filtru pe produs, E2 nu pleacă pentru produsele cu interval de 30 de zile sau mai puțin, de exemplu Creamy Rice, magneziul bisglicinat sau Prime Whey 1 kg. Pentru ele vine Reaprovizionarea.
- **Cum se oprește:**
  - Filtrul „Buyer in the last 13 days” se pune înainte de E2.
  - Fluxul are „Only once”, iar smart sending e oprit.
  - Fluxul nu trimite cod și nu cere recenzie (cererea o trimite Judge.me).
- **Comenzi estimate în luna a 3-a:** 0,1–0,5 pe lună. Azi ar ajunge la ~10 clienți noi abonați pe lună, pentru că 0 din 41 de clienți noi au bifat abonarea la checkout.

### 5. Vizită fără comandă (din R6, „Bounce follow-up”, reparat, în probă)
- **Ce face:** trimite un singur email cuiva care a trecut pe site, n-a cumpărat niciodată și nu e deja în Welcome sau în Coș.
- **Declanșator:** vizita pe site fără comandă, adică declanșatorul existent. Trei filtre scot omul din flux:
  - „Buyer in the last 365 days”;
  - a primit emailul 1 de coș în ultimele 2 zile;
  - s-a abonat în ultimele 10 zile, deci e încă în Welcome.
- **Dacă editorul nu are ultimele două filtre, fluxul rămâne pe pauză.** Fără ele, un abonat nou ar primi încă un email în prima săptămână.
- **Emailuri (1):**
  - Pleacă a doua zi, la 18:30. Subiect: „Te ajutăm să alegi?”, fără prenume și fără superlative.
  - Conține ce verifici înainte să alegi (porția, câte zile îți ajunge, modul de folosire, aroma), două ghiduri și WhatsApp-ul.
  - Pornește doar după verificarea cookie-urilor (pasul 6 din §g).
- **Cum se oprește:** „Multiple times”, cu frequency capping de 30 de zile, deci cel mult un email pe lună de om. Smart sending e pornit.
- **Proba:** la 90 de zile de la repornire număr comenzile și click-urile. Dacă are sub 2 comenzi cu atingere de email sau peste 0,5 % dezabonări, îl arhivezi.
- **Comenzi estimate în luna a 3-a:** 0–0,5 pe lună (azi ~0,25: 3 comenzi în 12 luni, la ~198 de emailuri pe lună).

**Volumul după refacere:** cam 600–850 de emailuri automate pe lună, față de 1.359 azi, deși lista a crescut de la 1.304 la 2.343 de abonați după reactivare.

---

## d) Ce facem fără automatizări

Acestea le fac eu prin API. Tu doar aprobi.

- **Newsletterul de duminică, la 18:00.** Sunt 6 ediții programate, între 18.10 și 22.11. Le pornesc „Skip recently messaged contacts”. Le scot abonații din primele 10 zile (sunt în Welcome) și cei 1.042 de reactivați, până răspund. Dacă segmentul nou nu e evaluat până sâmbătă, pentru ediția din 18.10 folosesc doar segmente care există deja.
- **Recâștigare, în locul lui R5.** O campanie pe lună, în prima marți, la 18:30: pe 03.11, iar în decembrie pe 08.12, pentru că 01.12 e sărbătoare. Are „Skip recently messaged contacts” pornit.
  - Merge la abonații a căror ultimă comandă a fost acum 100–135 de zile. Prima dată folosesc 100–180 de zile, ca să prind restanțele.
  - Scot din ea: cine a comandat în ultimele 7 zile, cine a primit recâștigarea luna trecută, cumpărătorii de D3 + K2 și Glycerol din ultimele 6 luni (au interval mai lung), abonații noi, reactivații și contactele scoase la sunset.
  - Nu conține cod. Estimare: 0,2–0,5 comenzi pe lună.
- **Sunset, punctul agenției.** Campania „Mai vrei să primești emailurile noastre?” pleacă în prima marți din lună, la 19:00: pe 10.11, apoi pe 08.12.
  - Merge doar la cine a primit cel puțin 5 campanii în 90 de zile și, în același timp, n-a dat niciun click în 180 de zile, n-a cumpărat în 180 de zile și n-a fost pe site în 90 de zile.
  - Cine nu dă click în 14 zile primește tagul `email-inactiv` și iese din toate campaniile. Nu e dezabonat.
  - Cei 1.042 de reactivați sunt excluși până în februarie 2027. Pe 10.11, celor care au reacționat le înlocuiesc tagul `reactivare-2026-10` cu `reactivare-2026-10-gata`, în loc să îl șterg doar. Altfel ar primi în decembrie a treia întrebare „mai vrei?” în mai puțin de două luni.
- **Curățarea automată theMarketer o oprești tu** (pasul 5 din §g). Ea dezabonează un contact după 24 de emailuri nedeschise, exact ce agenția numește greșit. Sunsetul cu tag face aceeași treabă fără dezabonare.
- **Stoc revenit** (Creamy Rice, D3 + K2, nattokinază). O campanie în ziua în care stocul revine cu adevărat, cu subiectul „Vești bune: [produsul] e din nou în stoc”.
  - Merge la cumpărătorii produsului din ultimele 6 luni și la cei care l-au văzut în ultimele 3 luni, fără cei care au comandat în ultimele 7 zile.
  - Pleacă cel mult o dată pe lună pentru fiecare produs. În săptămânile fără campanii din calendar (09–15.11 și 23–29.11) se mută în lunea de după.
  - Crema de orez revenită în stoc a adus 9 din cele 14 comenzi din campanii din ultimele 6 luni.
- **Recenzii: doar Judge.me** (432 de recenzii, media 4,87). Trimite o cerere la 10–14 zile după expediere și cel mult un memento. Modulul de recenzii theMarketer rămâne oprit, ca nimeni să nu primească două cereri.
- **Reactivarea celor 1.042 de contacte.** Nu sunt ~800: restul listei a fost citit abia la import. Cele 2 emailuri sunt programate pe 20.10 și 27.10, la 18:30. Curățarea se face pe 10.11, după regula aprobată de tine. Niciun reactivat n-a intrat într-o automatizare pe 16.10. Cu R5 pe pauză și cu „Include imported contacts” oprit în Welcome, nici nu vor intra.
- **Clienții fideli nu au flux separat.** Primesc produsele potrivite în emailul de reaprovizionare și în emailul 2 de coș, plus campaniile pe categorie.
- **Bifa de abonare la checkout** (în Shopify, 5 minute, o faci tu). Azi 0 din 41 de clienți noi o bifează. E pârghia cea mai mare pe care o avem: din ea se hrănesc Client nou, Reaprovizionarea și Coșul.
- **Ce nu facem:**
  - SMS automat: acordul SMS e înregistrat în aceeași secundă cu cel de email, deci nu e dovedit separat;
  - aniversare: câmpul cu data nașterii e gol;
  - scădere de preț: ar cere prețul de referință pe 30 de zile;
  - wishlist: site-ul nu are wishlist;
  - coduri noi de reducere.

---

## e) Câte emailuri poate primi un client în 30 de zile

Se numără doar emailurile de marketing. Nu se numără confirmarea și livrarea comenzii (vin din Shopify), emailul de confirmare a abonării și cererea Judge.me.

| Tip de client | Cel mult în 30 de zile | Ce primește |
|---|---:|---|
| Abonat nou, fără coș și fără comandă | **9** | Welcome 4 (zilele 0, 3, 6 și 10). Newsletter cel mult 3, pentru că e exclus în primele 10 zile. Cel mult o campanie, pentru că e exclus 21 de zile. Cel mult un email „Vizită fără comandă”, doar după ziua 10. În primele 7 zile: 3 emailuri. |
| **Abonat nou care lasă un coș în aceeași vizită** (cazul des întâlnit) | **11** | Welcome 4, Coș 2, newsletter 3, o campanie și un email de vizită. În ziua 0 primește Welcome E1 și Coș E1, adică 2 în aceeași zi. În ziua 1 vine Coș E2, apoi Welcome E2 în ziua 3 și E3 în ziua 6. Asta înseamnă 5 emailuri în primele 7 zile. Dacă cumpără, iese din Welcome și din Coș. |
| Client nou, abonat la checkout | **9** (11 dacă mai lasă și un coș) | Primește Welcome E1 cu codul, valabil și pentru comanda următoare, apoi iese din Welcome. Urmează Client nou E1 și E2 (ziua 14) și Reaprovizionarea în ziua ~20–30, pentru produsele scurte. Newsletter între 3 și 5. Nicio campanie, pentru că e exclus 30 de zile. Fără filtru pe produs, poate primi atât Client nou E2, cât și Reaprovizionarea. |
| Client fidel (Creamy Rice la 3–4 săptămâni) | **11** (de obicei 6–8) | Reaprovizionare 1–2, newsletter până la 5 și cel mult 2 campanii. După fiecare comandă e exclus 14 zile din campanii și primește cel mult o campanie la 14 zile. Coș 2, dacă lasă un coș. |
| Abonat inactiv (fără click în 180 de zile) | **6**, apoi 1, apoi 0 | Nicio automatizare nu pornește pentru el. Primește newsletterul (până la 5) cât timp merge la toată lista, plus întrebarea de sunset. După ce mut newsletterul doar pe cei implicați, rămâne cu 1. Dacă nu dă click în 14 zile după întrebare, primește tagul `email-inactiv` și 0 campanii. |
| Unul dintre cei 1.042 de reactivați | **2** până pe 10.11 | Doar cele 2 emailuri de reactivare (20.10 și 27.10). |

**Azi, pentru comparație:** un abonat nou a primit 9 emailuri în 11 zile, din care 3 într-o singură zi. Un client fidel a primit ~20 în 23 de zile. Unele emailuri au plecat între 00:18 și 03:40.

**Regulile și limitele lor:**
- **Ținta:** cel mult 3 emailuri de marketing în 7 zile, cel mult unul pe zi, numai între 08:00 și 21:00.
- **Două excepții:** Coș E1 pleacă la o oră după ce omul a plecat de pe site, la orice oră, chiar și în ziua în care a primit Welcome E1. Welcome E1 pleacă la 5 minute după abonare, deci și noaptea, pentru că omul tocmai a cerut codul. Perechea de emailuri de coș poate fi al 4-lea email dintr-o săptămână.
- **theMarketer nu are o setare pentru „3 în 7 zile”.** E o țintă pe care o verific lunar pe 20 de contacte. Dacă mai mult de 2 din 20 o depășesc, pun întâi pe pauză „Vizită fără comandă”, iar apoi campania de miercuri trece la o dată la două săptămâni.
- **Smart sending (24 de ore)** blochează un email doar în fluxurile care îl au pornit și doar dacă alt email a plecat înaintea lui. theMarketer nu are o ordine de prioritate între fluxuri. De aceea fluxurile importante pleacă la 10:00, iar cele care pot aștepta la 18:30.

---

## f) Comenzi: azi și în luna a 3-a

Comenzile reale le măsor în Shopify, după click pe un link din email (UTM `themarketer`), nu după coloana Transactions din theMarketer.

| | Azi (pe lună) | Luna a 3-a, ianuarie 2027 (de la prudent la bază) |
|---|---:|---:|
| **Cele 5 automatizări** | **~2,3** (7 în 90 de zile: Welcome 4, Coș 2, Bounce 1) | **4–9** |
| · Welcome | ~1,3 | 1,5–3 |
| · Coș | ~0,7 | 1–2,5 |
| · Reaprovizionare | 0 (bug) | 1–2,5 |
| · Client nou | 0 (nu există) | 0,1–0,5 |
| · Vizită fără comandă | ~0,3 | 0–0,5 |
| Campaniile mele (newsletter, recâștigare, stoc revenit, campanii pe categorie) | ~2,7 (8 în 90 de zile) | 3–6 |
| **Tot emailul, după click** (ultima vizită înainte de comandă) | **~5** (15 în 90 de zile) | **7–15** |
| Tot emailul, cu orice atingere (emailul a fost prima sau ultima vizită) | ~7 (14 în 61 de zile) | 9–19 |

**Ce înseamnă pentru țintele tale:**
- **50 de comenzi pe lună din email nu se ating până în ianuarie.**
- **Nici „+20–30 de comenzi față de acum”.** Realist e un plus de 2 până la 12 comenzi pe lună cu atingere de email. Asta e de 1,5–3 ori mai mult decât azi.
- Mai multe automatizări nu schimbă cifra. Ce o schimbă e lista: bifa de abonare la checkout (azi 0 din 41 de clienți noi), abonările confirmate din pop-up și din footer, câți dintre cei 1.042 de reactivați rămân și campania de stoc revenit la crema de orez.

**Cum măsurăm:**
- **Pe 1 ale fiecărei luni îți trimit raportul.** Pentru fiecare flux: comenzile după click și cele cu orice atingere (din Shopify), click-urile unice și dezabonările.
- **Coloana Transactions din theMarketer e doar informativă.** Ea numără comenzile după o deschidere sau după o simplă livrare a emailului.
- **Linkurile cu WELCOME5** trec prin /discount/WELCOME5, care poate pierde UTM-ul. De aceea UTM-ul se pune în interiorul linkului de redirect. Îți dau linkurile gata făcute și le testăm o dată cu o comandă de test. Altfel Welcome, cel mai bun flux, ar părea că nu vinde.
- **Regula de oprire pentru Welcome, Coș și Reaprovizionare:** dacă un flux are 0 comenzi în 60 de zile, îl pui pe pauză.
- **Regula pentru fluxurile mici:** Client nou și Vizită fără comandă au prea puțini destinatari pentru o judecată la 60 de zile. Le judecăm la 90 de zile, pe click-uri și comenzi.

---

## g) Ordinea de lucru, pas cu pas

Toate schimbările din automatizări le faci tu, în aplicație. Pentru fiecare pas îmi trimiți o captură, iar eu îți spun exact ce bifezi.

### ACUM (azi, ~1 oră)

1. **Pauzele (3 min).** Apeși cercul verde, în această ordine: R9 (Remind customers to reorder, 30 Jun 2025), R4 (Cart abandonment similar products), R6 (Bounce follow-up), R5 (Inactivity behavior), R2 (Cross sell), R3 (Product follow-up), R1 (Remind customers to reorder, 20 Jan 2026). Se opresc 980 din 1.359 de emailuri pe lună. R5 nu mai trimite deja din 12.10, deci câștigul real de acum înainte e de ~890 de emailuri pe lună.
2. **Captura lui R5 (2 min).** Îl deschizi și îmi trimiți o captură cu declanșatorul și blocurile, pentru că s-a schimbat pe 12.10. Dacă are un bloc „Add tag”, „Unsubscribe” sau SMS, îmi spui. Verific apoi câteva contacte care au trecut prin el (doar după id).
3. **Rândurile fără trimiteri (10 min).** Pentru R8 și pentru toate rândurile de sub R10 cu 0 / 0 aplici pașii de sub tabelul de la §b: captură, pauză, arhivare.
4. **Smart sending (2 min).** Settings > Email setup > Smart Sending: intervalul de 24 de ore. Dacă nu se poate, pui maximul permis.
5. **Curățarea automată (1 min).** Settings > Cleanup subscribers: oprit.
6. **Cookie-urile (5 min).** Îți trimit pașii exacți: fereastră privată, apoi F12 > Network. Verifici dacă scriptul theMarketer se încarcă înainte să accepți cookie-urile de marketing. Dacă se încarcă, pui R10 pe pauză până se repară bannerul de cookie-uri. Legea cere acordul înainte, iar în 2025 un magazin online a primit o amendă de 20.000 de lei exact pentru asta.
7. **Reparația rapidă la R10, Cart abandonment, 30 Jun 2025 (15 min).**
   - În „Start of automation”: „Multiple times”, „Enable frequency capping” = 7 zile și „Exclude contacts who have not exited this automation flow yet” pornit.
   - Înainte de E2: „Time delay” de 20 de ore cu „Delay until a specific time of the day” = 19:00, apoi „Filter” > „Buyer in the last 2 days” → ies.
   - Subiectele: E1 „Ce ai pus în coș e tot acolo”, E2 „Bine de știut înainte să comanzi”.
   - În corpul lui E2 ștergi orice „ultima șansă”, superlativ sau „ofertă”.
   - La „Campaign UTM”: themarketer / email / flow-cart-e1 și flow-cart-e2.
8. **Reparația rapidă la R7, Welcome series 2 (10 min).**
   - Pui la E1 subiectul „Codul tău de 5 % e aici”.
   - În corpul lui E1 verifici condițiile codului: trebuie să scrie „5 % la toată comanda, o singură dată per client”, nu „la prima comandă”.
   - Ștergi E2 („Oferte uimitoare doar pentru tine!”) împreună cu pauza dinaintea lui. Până la varianta cu 4 emailuri, Welcome are doar E1.

### SĂPTĂMÂNA 1 (19–25.10)

9. **Două răspunsuri pentru mine (5 min).** (a) Dozele de pe etichetă pentru Omega-3, Ashwagandha, L-carnitină și taurină, ca să le pun intervalul. (b) Da sau nu pentru scoaterea din blocurile de recomandare a celor 12 produse cu nume care sugerează un efect. Fără un „da”, în emailuri folosim 3 carduri fixe: Prime Whey 2 kg, Creatină Creapure și Creamy Rice tort de ciocolată.
10. **Șablonul unic (20 min).** Îți trimit HTML-ul. La început e cel al newsletterelor, deja testat, în modul luminos. Îl salvezi în builder ca „Prime · Master 2026”, iar toate emailurile refăcute pornesc din el. Înainte să pornești un flux verifici trei lucruri: alt text la fiecare imagine, linkul de dezabonare vizibil și un singur buton. Testul complet de dark mode pe 3 clienți de email îl facem în luna a 2-a.
11. **Reaprovizionarea în R1 (30 min, plus o comandă de test).**
    - **Întâi redenumești R1** în „Reaprovizionare 2026”. Azi R1 și R9 au același nume, iar API-ul îmi arată doar numele.
    - Îmi trimiți o captură cu declanșatorul actual.
    - Setezi totul ca la §c.3. Emailul îl faci din șablonul master, cu textul din SYSTEM.md §4.7.1 și UTM-ul flow-reorder-e1. Apoi pornești fluxul.
    - **Testul (îl pregătesc eu).** Pun intervalul de o zi pe un produs care se vinde rar. Tu plasezi o comandă internă cu acel produs și cu încă unul care are alt interval, apoi o marchezi „fulfilled”. Imediat după aceea pun intervalul la loc.
    - A doua zi verific prin API. Trebuie să apară intrări „Reaprovizionare 2026” și niciun email în minutele de după comandă. Abia atunci arhivezi R9.
    - Dacă nu apare nicio intrare, pui R1 pe pauză și faci fluxul nou din Post Purchase > Remind customers to reorder. R1 îl arhivezi.
    - Reaprovizionarea e primul flux refăcut, pentru că mementourile au nevoie de 20–90 de zile până încep să vândă.
12. **Welcome cu 4 emailuri, în R7 (~75 min).**
    - Adaugi E2, E3 și E4 din SYSTEM.md §4.1, din șablonul master.
    - Pauzele: 3 zile până la 18:30, 3 zile până la 18:30, 4 zile până la 10:00. Toate au „Delay until a specific day(s) of the week” = luni–sâmbătă.
    - Filtrele: 365 de zile după E1, apoi 4, 7 și 11 zile.
    - În „Start of automation”: „Only once” și „Include imported contacts” oprit.
    - Folosești linkurile WELCOME5 cu UTM-ul în interior, pe care ți le dau eu. Trimiți un test din fiecare email. Redenumești fluxul „Welcome 2026”.
    - **Textele despre frecvență se schimbă tot acum, ca promisiunea să fie adevărată:**
      - Titlul pop-up-ului: „5 % la următoarea comandă” (codul nu e limitat la prima comandă).
      - Textul pop-up-ului: „Lasă-ne adresa de email. După ce confirmi abonarea, îți trimitem codul WELCOME5 și 3 emailuri scurte de bun venit, apoi ghidul de duminică, emailuri despre produsele, noutățile și ofertele Prime și un memento dacă lași produse în coș. De obicei, 1–2 emailuri pe săptămână.”
      - Bifa de la checkout, din Shopify: „Vreau emailurile Prime: ghidul săptămânal, noutăți și oferte (de obicei 1–2 pe săptămână).” Tot atunci verifici că bifa apare pe ecranul de checkout, pe telefon și pe desktop.
      - În Welcome E1 și E4 fraza despre frecvență devine: „…cel mult un email pe săptămână despre produse. Dacă lași ceva în coș sau comanzi, îți scriem și despre asta.”
      - Textele pentru formularele din footer și de pe blog ți le dau când le facem. Sunt în review_legal.md L2.
13. **Double opt-in, doar după teste.** Îl pornești numai dacă sunt îndeplinite două condiții:
    - îți confirm că sincronizarea Shopify s-a terminat;
    - testul pe surse a trecut: o comandă de test cu bifa de abonare și un contact de test creat de mine prin API.

    Dacă vreunul dintre ei primește email de confirmare, DOI rămâne oprit și scrii la iam@themarketer.com: „Se aplică double opt-in și abonărilor venite din comenzi, importuri și API?”. Altfel, abonații de la checkout care nu confirmă ar ieși din Client nou, Reaprovizionare și Coș. Când pornești DOI, în aceeași sesiune schimbi mesajul de succes al pop-up-ului: „Mai e un pas: deschide emailul de la noi și apasă «Confirm abonarea». Codul vine în emailul de după confirmare.” Tot atunci scoți codul din pop-up, dacă apare acolo. DOI costă cam 20–35 % din abonările noi, dar în listă rămân doar adrese reale.
14. **Arhivări (5 min).** Arhivezi R3, R4 și R5, care sunt pe pauză din ziua 1.

### SĂPTĂMÂNA 2 (26.10–01.11)

15. **Coșul refăcut, în R10 (~40 min).**
    - E1 pleacă la 60 de minute. Textele sunt cele din SYSTEM.md §4.3.
    - În E2 pui blocul „Frequently Bought Together” doar dacă mi-ai răspuns „da” la pasul 9. Altfel pui cele 3 carduri fixe.
    - Testul pentru preț: cu Creamy Rice tort de ciocolată în coș, emailul trebuie să arate doar „60 lei”, fără „65 lei” tăiat.
    - Ramura de checkout o adaugi doar dacă găsești filtrul pe evenimentul de checkout (§c.2).
16. **Client nou (~40 min).**
    - Cauți întâi filtrul de primă comandă.
    - Dacă îl găsești: duplici R2 (sau pornești din Post Purchase > Cross sell) și setezi statusul „fulfilled”, filtrul după prima pauză, cele 2 emailuri din SYSTEM.md §4.5.1 și §4.5.3, filtrul de 13 zile, „Only once” și UTM-urile flow-client-nou-e1 și flow-client-nou-e2. Trimiți un test, pornești fluxul și arhivezi R2.
    - Dacă nu există filtrul, arhivezi R2 și ne oprim aici.

### SĂPTĂMÂNA 3 (02–08.11)

17. **Vizită fără comandă, în R6 (~15 min).** Lucrul se face doar dacă există cele două filtre de la §c.5. Ștergi E2, adaugi filtrele, pui pauza de o zi până la 18:30, frequency capping de 30 de zile și smart sending pornit. Pui noul subiect și textul nou, trimiți un test și repornești fluxul. Proba ține 90 de zile. Dacă filtrele nu există, R6 rămâne pe pauză.

### LUNAR (fac eu)

18. Pe 1 ale lunii îți trimit raportul de comenzi reale pe fiecare flux și verificarea pe 20 de contacte (câte emailuri au primit în 7 zile). Campaniile din calendar: recâștigarea pe 03.11, sunsetul pe 10.11 și stocul revenit, când revine stocul.

---

## Ce am păstrat din auditul agenției

| Punctul agenției | Ce facem |
|---|---|
| Double opt-in | Da, după testul pe surse (pasul 13). |
| Welcome cu 4 emailuri | Da, în R7. |
| Abandon site și abandon navigare | Păstrăm unul singur, cel care a vândut: R6, cu un email pe lună, în probă. R3 se oprește, pentru că a adus 0 comenzi în 12 luni. E singura abatere voită de la lista lor. |
| Două fluxuri de coș pe același declanșator | R4 se oprește și rămâne R10. |
| Lipsește abandonul de checkout | E inclus în fluxul de coș. O ramură separată facem doar dacă editorul are filtru pe evenimentul de checkout. |
| Lipsește fluxul pentru client nou | Îl facem, dacă editorul are filtru de primă comandă. |
| Automatizări incomplete, wishlist | Le arhivăm. |
| Sunset după 30 de zile | R5 se oprește. Facem sunset la 180 de zile, cu recâștigare înainte și fără dezabonare, ca o campanie lunară. Curățarea automată se oprește. |
| Rate de deschidere mici | Am scos cauzele: trimiterile noaptea, dublurile, subiectele fără diacritice și emailurile către cine tocmai a cumpărat. Judecăm după click-uri și comenzi, nu după deschideri, pe care Apple Mail le umflă. |
| Un singur șablon, dark mode, alt text | Folosim șablonul „Prime · Master 2026” din săptămâna 1. Testul de dark mode îl facem în luna a 2-a. |
| Segmentare | O fac eu, prin API. |
| Teste A/B | Facem un singur test cumulat: subiectul newsletterului, împărțit 50/50 timp de 8 săptămâni. La volumul nostru, alte teste ar arăta doar zgomot. |

## Stare aplicată (16.10.2026, prin extensia Chrome)

| Automatizare | Status |
|---|---|
| Welcome series 2 | Running |
| Cart abandonment | Running |
| Cross sell | Paused (16.10; 47 contacte în curs au ieșit din flux) |
| Product follow-up | Paused (16.10; 2 contacte în curs au ieșit din flux) |
| Cart abandonment similar products | Paused |
| Inactivity behavior | Paused |
| Bounce follow-up | Paused |
| Remind customers to reorder (x2), Automatizare cupon mail | șterse de proprietar |

Notă: „Stop” în theMarketer scoate contactele aflate în flux (nu există opțiune de păstrare).
Setări: smart sending 24h, SMS quiet hours 20:00–10:00, automated scheduling OFF.
Rutina „Newsletter blog duminică” dezactivată (dubla newsletterul din theMarketer de duminică 18:00).
