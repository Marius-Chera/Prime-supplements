# Audit automatizări theMarketer — primesupplements.ro

Data auditului: 15.10.2026 · Mod: doar citire (nu am modificat nimic în cont) · Fereastra metricilor: 17.07–15.10.2026 (90 de zile)

Confidențialitate: în acest document nu apar adrese de email sau nume de clienți. Unde dau un exemplu concret, folosesc doar id-ul de contact theMarketer (24 de caractere), ca să poată fi deschis în aplicație.

---

## 0. Cum am reconstruit automatizările

API-ul theMarketer nu deschide editorul de automatizări. Am refăcut fiecare flux din date:

| Sursă | Ce am folosit |
|---|---|
| `get_report` (email, scope automation, 90 de zile) | trimise, deschideri unice, click-uri unice, tranzacții, venit, dezabonări, bounce, reclamații. Le-am verificat și pe ferestrele 18.01–17.04 și 18.04–16.07.2026. |
| `get_entered_automation`, zilnic 02–15.10.2026 (toate paginile) | 2.032 intrări în 14 zile. Le-am pseudonimizat (litere, nu emailuri) în `work/entries_*.txt` și le-am numărat cu `tally.py` și `tally_sum.py`. |
| `get_contact_details` pentru 14 contacte (log de livrare, activitate, comenzi, consimțământ) | subiecte exacte, ore de trimitere, ordinea emailurilor, întârzieri, ieșirea la comandă |
| `get_audience_history`, `list_contacts`, `get_audience_breakdown` | de unde vine eticheta „inactivi” și dezabonarea în masă |
| `list_coupons`, `list_transactional_messages` | 0 cupoane și 0 mesaje tranzacționale (email și SMS) în ultimele 30 de zile |
| Storefront (curl pe homepage și pe o pagină de produs) | dacă există wishlist; cum își ia theMarketer prenumele |
| Shopify Admin (`abandonedCheckouts`, 02–15.10) | checkout-uri abandonate și consimțământul lor, pentru punctul „abandon checkout” |
| Knowledge base theMarketer | numele opțiunilor din editor (re-intrare, frequency capping, întârziere până la o oră fixă) |

Limite:
- Nu am văzut conținutul (HTML) emailurilor din automatizări. În logul de livrare nu există link public „view in browser”. Linkurile din activitate (`/automation/<id>?report=true`) sunt pagini din aplicație, cu login. Șablonul, alt text-ul, dark mode-ul, footerul și afirmațiile din corpul emailurilor trebuie deci verificate în editor (checklist la §7).
- Întârzierile sunt deduse din orele de trimitere observate la contactele din eșantion, nu citite din editor.
- „Intrări” înseamnă că un contact a intrat în flux, nu că a primit email. Contactele fără consimțământ, cele care ies la comandă și duplicatele de eveniment nu primesc nimic. În 14 zile au fost 2.032 de intrări și doar 713 emailuri trimise.

---

## 1. Concluzia pe scurt

1. **Opt automatizări trimit emailuri, iar patru nu au trimis nimic din ianuarie.** Automatizările cu ref 1, 2, 5 și 8 nu apar în rapoarte din 18.01.2026 până azi și nu au avut nicio intrare în ultimele 14 zile. Se potrivesc cu ce a găsit agenția: automatizarea de wishlist, cele două incomplete și, probabil, un „sunset” sau un Welcome mai vechi. Verdict: le arhivăm după o verificare în aplicație.
2. **Performanța reală e mult sub cea raportată.** În 90 de zile automatizările au trimis 3.794 de emailuri, cu doar 49 de click-uri unice (1,29 % din emailurile trimise). Totuși, theMarketer le atribuie 77 de tranzacții și 25.090 lei. La 5 din 8 fluxuri sunt mai multe tranzacții decât click-uri, deci atribuirea se face pe deschidere sau pe livrare. Estimez că emailurile au produs efectiv 10–20 de comenzi în 90 de zile, adică 4–7 pe lună.
3. **Bug grav: „Remind customers to reorder” trimite „Gata să le cumperi din nou?” la 0–2 minute DUPĂ comandă.** Am văzut asta în 6 cazuri, la 3 clienți diferiți. Fluxul arată ca o confirmare de comandă, doar că sună absurd.
4. **Coșul abandonat e acoperit de două ori, confirmat.** „Cart abandonment” și „Cart abandonment similar products” pornesc pe același declanșator. În 154 din cele 188 de zile-contact cu intrare în „Cart abandonment” (82 %), contactul a intrat și în „similar products”. Am văzut și două emailuri de coș trimise aceluiași om în același minut (14.10, 16:26).
5. **Clienții primesc prea multe emailuri și la ore nepotrivite.** Exemple din eșantion:
   - un abonat nou a primit 9 emailuri în 11 zile;
   - un client fidel, circa 20 în 23 de zile;
   - unele zile au adus până la 4 emailuri;
   - ore de trimitere observate: 00:18, 00:40, 01:12, 03:06, 03:26 și 03:40.

   Nu există nicio limită de frecvență între fluxuri.
6. **Fluxurile nu exclud cumpărătorii.** Exemple:
   - „Product follow-up” („Încă te gândești la asta?”) pleacă și după ce omul a cumpărat;
   - „Bounce follow-up” ajunge și la clienți fideli;
   - cine se abonează la checkout primește „Oferte uimitoare doar pentru tine!” în ziua în care a cumpărat.
7. **Personalizarea e stricată.** Când un contact nu și-a dat numele, aplicația theMarketer din temă îi pune ca prenume partea din fața „@” a adresei de email (funcția `mailName`). Așa apar subiecte de tipul „Încă te gândești la asta, {partea din email}?”. La contactele importate, prenumele și numele sunt adesea inversate.
8. **Subiectele sunt slabe și unele încalcă regulile casei:**
   - lipsesc diacriticele;
   - un subiect conține un URL („Bun venit la https://www.primesupplements.ro!”);
   - apare un superlativ („Nu rata cele mai bune oferte!”);
   - apare o urgență falsă („Ultima sansa…”, deși nu expiră nimic);
   - două fluxuri diferite au același subiect.
9. **„Sunset după 30 de zile” (punctul agenției) e doar pe jumătate corect.**
   - „Inactivity behavior” e un win-back de 2 emailuri, trimis la 30 de zile fără nicio vizită pe site. Nu dezabonează și nu etichetează pe nimeni.
   - Dezabonarea în masă a fost un eveniment unic, pe **10.07.2026**: într-o singură zi, numărul dezabonaților a crescut cu 2.314.
   - În aceeași perioadă s-a pus eticheta „inactivi”, care e acum pe 2.307 contacte.
   - Printre cei 2.203 contacte cu eticheta „inactivi” care sunt încă dezabonați, 311 sunt cumpărători.
10. **Wishlist: confirmat.** Configurația theMarketer de pe site are `"wishlist_engine":"none"`, iar `/pages/wishlist` dă 404. Automatizarea de wishlist nu are cum să pornească.
11. **Fluxuri lipsă:** client nou (onboarding după prima comandă), reaprovizionare reală pe produs, win-back pentru cumpărători, sunset corect (pe lipsa de interacțiune cu emailurile), anunț „înapoi în stoc” și o ramură de abandon checkout. Pentru checkout, atenție: doar 11 din cele 42 de checkout-uri abandonate cu email din ultimele 14 zile aveau consimțământ de marketing. Lista completă e la §6.

Ce aș face mâine, fără niciun risc (detalii la §8): opresc RR, „similar products”, „Bounce follow-up” și „Inactivity behavior”. Asta elimină 1.615 din 3.794 de emailuri pe 90 de zile (43 %). Pierderea maximă e de 20 de tranzacții atribuite, care stau pe numai 24 de click-uri unice. Apoi, la fluxurile rămase, pun orele de trimitere între 09:00 și 20:00, opresc re-intrarea și adaug excluderea cumpărătorilor.

---

## 2. Tabel general (17.07–15.10.2026)

Rata de click unic din theMarketer se calculează din deschideri (practic, CTOR). Am pus separat și click-urile raportate la emailurile trimise.

| Ref | Automatizare | ID (creată) | Trimise | Deschideri unice (rată) | Click-uri unice (% din trimise / % din deschideri) | Tranz. atribuite | Venit atribuit | Lei/email | Dezabonări | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| 12 | Cross sell | 696f6e6442d74696320ee134 (20.01.2026) | 840 | 149 (17,7 %) | 7 (0,83 % / 4,7 %) | 20 | 7.789,50 | 9,27 | 4 | **Contopit** în fluxul post-comandă |
| 6 | Welcome series 2 | 696f6c4ff8dbc4c7200f28c9 (20.01.2026) | 692 | 230 (33,2 %) | 11 (1,59 % / 4,8 %) | 20 | 5.761,33 | 8,33 | 8 (1,16 %) | **Păstrat și refăcut** (4–5 emailuri) |
| 7 | Bounce follow-up (abandon site) | 696f6c923e7112961f0096da (20.01.2026) | 615 | 129 (21,0 %) | 9 (1,46 % / 7,0 %) | 9 | 2.324,09 | 3,78 | 4 | **Oprit** |
| 4 | Remind customers to reorder | 6862b6757163af43b901e1ed (30.06.2025) | 447 | 78 (17,5 %) | 6 (1,34 % / 7,7 %) | 7 | 2.381,30 | 5,33 | 1 | **Oprit imediat**, refăcut pe produs |
| 11 | Product follow-up (abandon navigare) | 696f6e585ade8453f10815b6 (20.01.2026) | 334 | 77 (23,1 %) | 3 (0,90 % / 3,9 %) | 6 | 1.671,20 | 5,00 | 0 | **Reparat** |
| 10 | Cart abandonment similar products | 696f6cd3a6575726ba0b55e8 (20.01.2026) | 322 | 93 (28,9 %) | 5 (1,55 % / 5,4 %) | 3 | 846,35 | 2,63 | 0 | **Oprit** (duplicat), recomandările mutate în fluxul de coș |
| 3 | Cart abandonment | 6862b5c5fd9dc29f6a0f5a6f (30.06.2025) | 313 | 68 (21,7 %) | 4 (1,28 % / 5,9 %) | 11 | 3.998,90 | 12,78 | 0 | **Păstrat și reparat** (fluxul principal de coș) |
| 9 | Inactivity behavior | (id nevăzut) | 231 | 80 (34,6 %) | 4 (1,73 % / 5,0 %) | 1 | 317,00 | 1,37 | 2 | **Oprit**, înlocuit cu win-back pe ultima comandă |
| 1, 2, 5, 8 | (fără trimiteri din 18.01.2026) | — | 0 | — | — | 0 | 0 | — | — | **Arhivat** după verificare în aplicație |
| | **Total** | | **3.794** | **904 (23,8 %)** | **49 (1,29 %)** | **77** | **25.089,67** | 6,61 | **19** | |

Alte date:
- Bounce: 0. Reclamații spam: 0. Nu s-au trimis SMS-uri din automatizări în 90 de zile.
- Comparativ, campaniile au avut 51–66 % deschideri (umflate de Apple Mail Privacy Protection) și 0,1–2,7 % click-uri.
- Deschiderile automatizărilor (17–35 %) sunt clar sub cele ale campaniilor. Nu e normal pentru niște fluxuri care ar trebui să aibă cea mai mare intenție de cumpărare. Agenția are dreptate pe acest punct.

**Atribuirea.** theMarketer leagă o comandă de un email deschis sau livrat, nu de un click. La Cross sell sunt 20 de tranzacții pe 7 click-uri, la Welcome 20 pe 11, la Cart abandonment 11 pe 4, la Remind 7 pe 6 și la Product follow-up 6 pe 3. Cross sell și Remind ajung la clienți care oricum recomandă des, așa că următoarea lor comandă e trecută automat în contul emailului. Cifra de 25.090 lei nu e venit produs de automatizări. Pentru măsurare corectă: UTM pe toate linkurile și raportare pe click în GA4 sau Shopify.

**Volumul în timp.** Automatizările au trimis 2.671 de emailuri între 18.01 și 17.04, 2.711 între 18.04 și 16.07 și 3.794 între 17.07 și 15.10. Creșterea din ultimul trimestru vine aproape în întregime din Welcome (137 → 692), adică din pop-up-ul cu eticheta „abonare pop-up” (aproximativ 4 abonări pe zi).

---

## 3. Cine intră în automatizări (02–15.10.2026)

| Zi | Intrări | Contacte | CA | SP | CS | RR | W2 | BF | PF | IB | Contacte cu CA și SP în aceeași zi |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 02.10 | 126 | 37 | 16 | 21 | 18 | 32 | 3 | 16 | 4 | 16 | 9 |
| 03.10 | 48 | 18 | 11 | 11 | 6 | 8 | 0 | 0 | 0 | 12 | 5 |
| 04.10 | 92 | 25 | 13 | 12 | 9 | 12 | 13 | 16 | 2 | 15 | 8 |
| 05.10 | 148 | 34 | 20 | 18 | 30 | 40 | 17 | 8 | 1 | 14 | 13 |
| 06.10 | 154 | 39 | 17 | 18 | 28 | 28 | 25 | 22 | 6 | 10 | 12 |
| 07.10 | 249 | 53 | 38 | 32 | 35 | 62 | 16 | 38 | 11 | 17 | 23 |
| 08.10 | 131 | 35 | 12 | 13 | 17 | 25 | 25 | 22 | 7 | 10 | 6 |
| 09.10 | 133 | 35 | 14 | 16 | 11 | 16 | 10 | 40 | 12 | 14 | 8 |
| 10.10 | 111 | 18 | 23 | 15 | 8 | 12 | 18 | 14 | 11 | 10 | 6 |
| 11.10 | 134 | 32 | 16 | 16 | 13 | 20 | 21 | 23 | 12 | 13 | 10 |
| 12.10 | 206 | 47 | 25 | 25 | 27 | 47 | 27 | 23 | 16 | 16 | 14 |
| 13.10 | 141 | 40 | 25 | 19 | 13 | 21 | 21 | 26 | 4 | 12 | 11 |
| 14.10 | 179 | 37 | 24 | 23 | 33 | 54 | 7 | 18 | 10 | 10 | 15 |
| 15.10 (parțial) | 180 | 40 | 24 | 26 | 21 | 37 | 30 | 25 | 4 | 13 | 14 |
| **Total** | **2.032** | **490 zile-contact** | **278** | **265** | **269** | **414** | **233** | **291** | **100** | **182** | **154** |

Abrevieri: CA = Cart abandonment, SP = Cart abandonment similar products, CS = Cross sell, RR = Remind customers to reorder, W2 = Welcome series 2, BF = Bounce follow-up, PF = Product follow-up, IB = Inactivity behavior.

| Automatizare | Intrări în 14 zile | Zile-contact | Emailuri trimise 02–15.10 | Deschideri unice 02–15.10 |
|---|---|---|---|---|
| Remind customers to reorder | 414 | 110 | 83 | 19 |
| Bounce follow-up | 291 | 116 | 95 | 21 |
| Cart abandonment | 278 | 188 | 63 | 12 |
| Cross sell | 269 | 184 | 171 | 28 |
| Cart abandonment similar products | 265 | 193 | 73 | 31 |
| Welcome series 2 | 233 | 83 | 143 | 47 |
| Inactivity behavior | 182 | 161 | 24 | 13 |
| Product follow-up | 100 | 41 | 61 | 13 |
| **Total** | **2.032** | **490** | **713** | **184** |

Tipare care se repetă:
- **La fiecare comandă**, clientul intră de 4 ori în RR și de 2 ori în CS. Exemplu: RR, CS, RR, RR, CS, RR, câteodată cu un IB între ele.
- **La fiecare abonare**, contactul intră de 3 ori în W2, câte o dată pentru fiecare eveniment de consimțământ: email, SMS și push prin API, sau popup. Aproape mereu intră și o dată în IB. Emailurile de bun venit nu pleacă de mai multe ori.
- **Coș:** în 227 de zile-contact a existat cel puțin un flux de coș. În 154 dintre ele (68 %) contactul a intrat în ambele fluxuri. 34 au intrat doar în CA și 39 doar în SP, iar o parte dintre acestea sunt perechi rupte la miezul nopții.
- **Re-intrare nelimitată în coș.** Un contact a intrat în CA de 12 ori și în SP de 6 ori într-o singură zi (10.10), la fiecare modificare a coșului.
- **IB fără altă activitate:** 32 de zile-contact, dintre care 19 cu exact 2 intrări. Sunt contactele care au atins pragul de 30 de zile fără vizită.
- **Contactul proprietarului** intră și el în BF, PF și IB. Asta strică puțin statisticile, dar îl ajută să vadă ce primesc clienții.

---

## 4. Fiecare automatizare în parte

### 4.1 Welcome series 2 (ref 6) — păstrat și refăcut

- **Scop:** primul contact cu abonatul nou.
- **Declanșator (dedus):** abonare la email. Vine din pop-up-ul theMarketer, cu eticheta „abonare pop-up”, sau prin API din Shopify, când clientul bifează abonarea la checkout. Contactul intră de 3 ori, câte o dată pentru fiecare consimțământ (email, SMS, push), dar emailurile se trimit o singură dată.
- **Emailuri observate:**

| # | Subiect (exact) | Când pleacă |
|---|---|---|
| E1 | „Bun venit la https://www.primesupplements.ro!” | la 2–4 minute după abonare |
| E2 | „Oferte uimitoare doar pentru tine!” | la exact 24 de ore după E1 (același minut) |

- **Metrici (90 de zile):** 692 trimise, 33,2 % deschideri (cea mai bună rată), 11 click-uri unice (1,6 %), 20 de tranzacții și 5.761 lei atribuite, 8 dezabonări (1,16 % — rata cea mai mare dintre fluxuri).
- **Probleme, cu dovezi:**
  1. Are doar 2 emailuri, confirmat. Nu prezintă brandul, nu ajută la alegere și nu arată recenzii.
  2. Subiectul E1 conține un URL. E un semnal de spam și arată generat automat. Lipsesc diacriticele.
  3. Nu exclude cumpărătorii. Cine se abonează la checkout primește „Oferte uimitoare doar pentru tine!” chiar în ziua comenzii. Exemplu: contactul 6a955b726c4c85af710815a3 a primit Welcome E1 la 13:50, a comandat la 17:44 și a primit Welcome E2 a doua zi.
  4. Se suprapune cu alte fluxuri din prima zi. Contactul 6ac3428a7b4c683cda0a423a s-a abonat pe 05.10 la 09:24. Pe 05.10 a primit Welcome E1 și BF E1. Pe 06.10 a primit newsletterul, Welcome E2 și BF E2 (3 emailuri într-o zi). Până pe 15.10 ajunsese la 9 emailuri, deși îl deschisese doar pe primul. De aici, foarte probabil, rata mare de dezabonare.
  5. Un contact a primit cele 2 emailuri de bun venit (09–10.07.2026) deși nu are niciun eveniment de abonare în istoricul de consimțământ, doar „Added using acquisition website”. E vorba de contactul 6a4f2d293dea58244505938b. Trebuie verificat în editor dacă fluxul e setat să trimită și contactelor neabonate.
  6. Pop-up-ul promite 5 % reducere (codul WELCOME5, din Shopify: o folosire per client, se cumulează cu alte reduceri). Nu am putut verifica dacă E1 conține codul și condițiile lui; trebuie văzut în editor.
- **Verdict:** păstrăm declanșatorul și refacem fluxul: 4–5 emailuri în 10–14 zile. Primul aduce codul și condițiile lui. Urmează un email despre brand, unul despre cum alegi produsul, unul cu recenzii reale și condiții clare. Fluxul se oprește la comandă. Abonații de la checkout (cumpărătorii) intră în fluxul „Client nou”, nu aici. Textele se pot lua din `doc_shopify_full.md` §1.

### 4.2 Cart abandonment (ref 3) — păstrat ca singurul flux de coș, reparat

- **Scop:** recuperarea coșului.
- **Declanșator (dedus):** adăugare în coș fără comandă. Fluxul se oprește corect la comandă. Contactul 6a955b726c4c85af710815a3 a avut coș între 05:43 și 05:51, a comandat la 05:53 și nu a primit niciun email de coș.
- **Emailuri observate:**

| # | Subiect (exact) | Când pleacă |
|---|---|---|
| E1 | „Cosul de cumparaturi te asteapta!” | după abandon (întârzierea exactă nu reiese din date) |
| E2 | „Ultima sansa sa-ti cumperi preferatele!” | la 12 ore după E1: 13:10 → 01:12, 15:04 → 03:06, 21:12 → 09:14, 08:54 → 20:56 |

- **Metrici:** 313 trimise, 21,7 % deschideri (slab pentru un coș), 4 click-uri, 11 tranzacții și 3.999 lei atribuite. Are cel mai bun randament: 12,78 lei pe email.
- **Probleme:**
  1. Se dublează cu „similar products” (§4.3).
  2. Pauza de 12 ore trimite E2 noaptea (01:12, 03:06, 03:40 în logul proprietarului).
  3. „Ultima sansa” e o urgență falsă: nu expiră nimic, coșul rămâne salvat. E un risc pe Legea 363/2007, anexa 1, pct. 7.
  4. Re-intrarea e nelimitată (12 intrări într-o zi pentru același contact).
  5. Lipsesc diacriticele.
  6. E2 a fost trimis fără E1 cel puțin o dată. Contactul 67f8fe2e7d4207bbea08314c a primit doar „Ultima sansa…”, în aceeași zi în care a creat coșul.
- **Verdict:** îl păstrăm ca singurul flux de coș:
  - 3 emailuri: la 1 oră, la 24 de ore și la 72 de ore;
  - toate trimise între 09:00 și 20:00, cu „Delay until a specific time of the day”;
  - bifat „Exclude contacts who have not exited this automation flow yet” și „Enable frequency capping” la 7 zile;
  - filtru „Buyer in the last X days” = 3 zile;
  - fără urgență falsă;
  - blocul de produse recomandate din SP mutat în E3.

  Textele se pot lua din `doc_shopify_full.md` §3, cu ideile din §4 pentru E2–E3.

### 4.3 Cart abandonment similar products (ref 10) — oprit (duplicat)

- **Scop:** aceeași recuperare de coș, dar cu produse din aceeași categorie.
- **Declanșator:** același ca la „Cart abandonment”. Agenția are dreptate: sunt două automatizări active pe același declanșator.
- **Emailuri observate:**

| # | Subiect (exact) | Când pleacă |
|---|---|---|
| E1 | „Pe acestea le-ai vazut?” | după abandon |
| E2 | „Credem ca te-ar incanta aceste articole” | la 48 de ore după E1: 19.09 15:42 → 21.09 15:44; 30.06 19:24 → 02.07 19:26 |

  Subiectul lui E2 e **identic** cu cel al lui E2 din Cross sell.
- **Metrici:** 322 trimise (mai multe decât fluxul principal), 28,9 % deschideri, 5 click-uri, 3 tranzacții, 846 lei, 2,63 lei pe email.
- **Dovezi că e duplicat:**
  - 82 % din zilele-contact cu CA au și SP;
  - pe 14.10, la 16:26, contactul 67f8fe2e7d4207bbea08314c a primit în același minut „Ultima sansa…” (CA) și „Pe acestea le-ai vazut?” (SP);
  - în 14 zile, SP a trimis 73 de emailuri, iar CA 63.

  Raportarea împarte veniturile între două fluxuri, iar clientul primește 4 emailuri pentru un singur coș.
- **Verdict:** îl oprim. Recomandările de produse se mută în E3 din fluxul de coș.

### 4.4 Product follow-up (ref 11) — abandon navigare, reparat

- **Scop:** cine a văzut un produs și nu l-a pus în coș.
- **Emailuri observate:**

| # | Subiect (exact) | Când pleacă |
|---|---|---|
| E1 | „Inca te gandesti la asta, {prenume}?” | la circa 4 ore după vizualizare: proprietarul a văzut produsul la 09:02 și a primit emailul la 13:10; alt contact a fost ultima dată pe site la 15:54 și a primit la 19:54 |
| E2 | „Inca nu te-ai hotarat?” | la 24 de ore după E1 |

- **Metrici:** 334 trimise, 23,1 % deschideri, 3 click-uri (0,9 %, cea mai slabă rată), 6 tranzacții, 1.671 lei.
- **Probleme:**
  1. **Pleacă și după cumpărare.** Contactul 685b905b2edfce82a607954f a comandat pe 29.09 la 17:16 și a primit E1 la 21:04 și E2 a doua zi. Contactul 6a955b726c4c85af710815a3 a comandat pe 31.08 la 17:44 și a primit E1 la 21:42.
  2. Se trimite noaptea (22:52, 23:54, 23:56).
  3. Prenumele e luat din adresa de email (§5.3).
  4. Se suprapune cu BF și CA în aceeași zi.
- **Verdict:** îl reparăm:
  - 1 email (eventual 2), cu produsul văzut și recenzii reale;
  - filtre: fără comandă în ultimele 3 zile, fără coș activ;
  - frequency capping la 14 zile;
  - trimitere doar între 09:00 și 20:00.

  Textele se pot lua din `doc_shopify_full.md` §2.

### 4.5 Bounce follow-up (ref 7) — abandon site, oprit

- **Scop:** cine a intrat pe site și a plecat (vizită fără interacțiune).
- **Declanșator (dedus):** o sesiune pe site fără comandă. Contactul intră de 2–3 ori pe sesiune și reintră la 7–21 de zile: proprietarul pe 14.09 și 23.09, un abonat nou pe 05.10 și 14.10, un client pe 18.09 și 09.10.
- **Emailuri observate:**

| # | Subiect (exact) | Când pleacă |
|---|---|---|
| E1 | „De ce atat de grabit?” | la circa 30 de minute după sesiune (vizită la 06:10, email la 06:42) |
| E2 | „Nu rata cele mai bune oferte!” | la exact 24 de ore după E1 |

- **Metrici:** 615 trimise (al treilea volum ca mărime, pe semnalul cu cea mai mică intenție), 21 % deschideri, 9 click-uri, 9 tranzacții, 2.324 lei, 4 dezabonări.
- **Probleme:**
  1. Lovește abonații noi chiar din prima zi (Welcome la 09:28, BF la 20:30).
  2. Ajunge la clienți fideli: contactul 685b905b2edfce82a607954f l-a primit pe 02.10 și pe 09.10, între comenzile din 29.09 și 10.10.
  3. Se trimite noaptea (00:40, 23:44, 23:46, 22:56).
  4. „Cele mai bune oferte” e un superlativ, interzis de regulile casei.
  5. „De ce atât de grăbit?” sună ciudat și poate părea că urmărim clientul.
- **Verdict:** îl oprim. Vizitatorii fără interacțiune primesc oricum newsletterul. Cine a văzut un produs e prins de PF, iar cine a pus în coș, de CA. Dacă vrem totuși să-l păstrăm: 1 singur email, maximum unul la 30 de zile, doar pentru cei care nu au cumpărat niciodată, au cel puțin 2 pagini vizitate și nu sunt în primele 7 zile de la abonare.

### 4.6 Cross sell (ref 12) — contopit în fluxul post-comandă

- **Scop:** după comandă, să propună produse complementare.
- **Declanșator:** comanda plasată. Contactul intră de 2 ori pe comandă.
- **Emailuri observate:**

| # | Subiect (exact) | Când pleacă |
|---|---|---|
| E1 | „Iti place noua ta achizitie?” | la exact 7 zile după comandă: 30.06 14:20 → 07.07 14:20; 02.09 11:22 → 09.09 11:24; 18.09 16:00 → 25.09 16:02 |
| E2 | „Credem ca te-ar incanta aceste articole” | la 24 de ore după E1 (același subiect ca SP E2) |

- **Metrici:** 840 trimise (cel mai mare volum), 17,7 % deschideri (slab), 7 click-uri (0,83 %), 20 de tranzacții și 7.790 lei atribuite. Raportul de 2,9 tranzacții la un click arată că sunt trecute în contul emailului comenzile pe care clienții fideli le-ar fi dat oricum.
- **Probleme:**
  1. E1 întreabă „Îți place?”, dar nu cere o recenzie și nu explică cum se folosește produsul.
  2. E2 vinde din nou la doar o zi după E1.
  3. Clienții care comandă o dată la 10–14 zile primesc CS de la fiecare comandă, plus RR, PF și BF. Exemplu: contactul 67fbed20571b2d2b6307084a a primit 11 emailuri în 9 zile (08–16.09), iar 16 dintre emailurile lui au rămas nedeschise la rând.
  4. Subiectul lui E2 e același ca la alt flux.
- **Verdict:** îl contopim în două fluxuri noi:
  - „Client nou”, după prima comandă (§6);
  - „Client existent”, după comenzile 2+: 1–2 emailuri (cum folosești produsul, cererea de recenzie, produse complementare pe categorie la 14–21 de zile).

  Cele două fluxuri au frequency capping comun.

### 4.7 Remind customers to reorder (ref 4) — oprit imediat

- **Scop teoretic:** să-i amintească clientului să comande din nou când i se termină produsul.
- **Ce face de fapt:** trimite „Gata sa le cumperi din nou, {prenume}?” la **0–2 minute după comandă**:

| Comandă (dată, oră) | Email RR | Contact |
|---|---|---|
| 13.05.2026 18:09 | 18:10 | 67d95dcbd0ffa0049102debf |
| 30.06.2026 14:20 | 14:20 | 67d95dcbd0ffa0049102debf |
| 18.09.2026 16:00 | 16:02 | 685b905b2edfce82a607954f |
| 29.09.2026 17:16 | 17:18 | 685b905b2edfce82a607954f |
| 10.10.2026 16:49 | 16:50 | 685b905b2edfce82a607954f |
| 14.10.2026 05:53 | 05:54 | 6a955b726c4c85af710815a3 |

  Contactul intră de 4 ori pe comandă. Proprietarul l-a primit de 6 ori între iulie și septembrie, la fiecare comandă de test.
- **Metrici:** 447 trimise, 17,5 % deschideri (cea mai mică), 6 click-uri, 7 tranzacții și 2.381 lei atribuite. Acestea sunt comenzile următoare ale clienților fideli, nu efectul emailului.
- **Verdict:** îl **oprim imediat**. Întârzierea e practic zero, deci fluxul nu are sens. Îl înlocuim cu o reaprovizionare pe produs:
  - întârzierea se calculează din cantitatea din ambalaj și doza zilnică de pe etichetă (`top50/label_facts.md`);
  - fluxul se oprește dacă produsul a fost recomandat între timp.

  Textele se pot lua din `doc_shopify_full.md` §6.

### 4.8 Inactivity behavior (ref 9) — oprit, înlocuit

- **Scop:** recâștigarea celor care nu mai vin pe site.
- **Declanșator (dovedit):** **30 de zile de la ultima vizită pe site**, la ora vizitei.

| Ultima vizită pe site | E1 | E2 | Contact |
|---|---|---|---|
| 02.09 11:22 | 02.10 11:30 | 03.10 11:32 | 67d95dcbd0ffa0049102debf |
| 03.09 03:18 | 03.10 03:26 | 04.10 03:28 | 67d95dcbd0ffa0049102e2d1 |
| 04.09 05:13 | 04.10 05:20 | 05.10 05:22 | 6a9a292d32a24bdcb705c47a |

  Contactul reintră în flux la fiecare 30 de zile de pauză. Primul contact din tabel l-a primit și pe 12–13.06, și pe 02–03.10.
- **Emailuri:**
  - E1: „S-a intamplat ceva, {prenume}?”;
  - E2: „{prenume} ne este dor de tine!”, la 24 de ore după E1.

  Prenumele apare greșit: nume de familie, „Contact” sau partea din email.
- **Metrici:** 231 trimise, 34,6 % deschideri (umflate de Apple MPP), 4 click-uri, 1 tranzacție, 317 lei (1,37 lei pe email, cel mai slab), 2 dezabonări.
- **Nu dezabonează și nu etichetează.** Contactul 67d95dcbd0ffa0049102debf nu a deschis niciun email, niciodată. După ambele cicluri a rămas abonat și primește campaniile în continuare.
- **Probleme:**
  1. 30 de zile fără vizită nu înseamnă inactivitate pentru un cumpărător de suplimente. Ciclul lui de recumpărare e de 30–60 de zile sau mai mult, iar mulți citesc newsletterul fără să intre pe site: contactul 67d95dcbd0ffa0049102e2d1 a deschis 7 campanii în aceeași lună.
  2. Trimite la 03:26 dimineața.
  3. Tonul „S-a întâmplat ceva?” nu oferă nimic util.
- **Verdict:** îl oprim. În locul lui facem două fluxuri:
  - win-back pentru cumpărători, la 60/90/120 de zile de la ultima comandă;
  - sunset pe lipsa de interacțiune cu emailurile (§6).

  Textele se pot lua din `doc_shopify_full.md` §7.

### 4.9 Automatizările fără trimiteri (ref 1, 2, 5, 8) — arhivate

- Nu au nicio trimitere în ferestrele 18.01–17.04, 18.04–16.07 și 17.07–15.10.2026 și nicio intrare în 02–15.10.
- Le pun în dreptul punctelor agenției astfel:
  - **wishlist:** nu poate porni, pentru că pe site `wishlist_engine` este `"none"`, nu există buton de wishlist, iar `/pages/wishlist` și `/apps/mktr/wishlist` dau 404;
  - **„Automatizări incomplete — Link 1, Link 2”:** cele două fluxuri incomplete;
  - **a patra:** probabil un „Welcome series” mai vechi (numele „Welcome series 2” sugerează asta) sau un flux de tip sunset.
- **Verdict:** le deschidem în aplicație, notăm declanșatorul și blocurile, apoi le **arhivăm** (nu le ștergem, ca să rămână istoricul). Dacă vreuna are un bloc „Unsubscribe” sau „Add tag inactivi”, o oprim prima.

---

## 5. Probleme care țin de toate fluxurile

### 5.1 Eticheta „inactivi” și dezabonarea în masă (punctul agenției despre sunset)

| Fapt | Valoare |
|---|---|
| Dezabonați la email, 09.07.2026 | 1.545 |
| Dezabonați la email, 10.07.2026 | 3.859 (**+2.314 într-o zi**) |
| După 10.07 | creștere normală, circa 4 pe zi (4.180 pe 28.09) |
| Contacte cu eticheta „inactivi” | 2.307, create între 18.03.2025 și 09.07.2026 (niciunul creat după 09.07) |
| … dintre care încă dezabonate | 2.203 (data dezabonării e goală, iar istoricul de consimțământ nu are nicio intrare de dezabonare) |
| … dintre care s-au abonat la loc | 104 (de exemplu prin API, la o comandă nouă) |
| Printre cei 2.203: cumpărători (etapa „purchase”) | 311 |
| Printre cei 2.203: veniți dintr-o comandă | 349 |
| Printre cei 2.203: interacțiune „activă” | 352 |

Concluzie:
- Dezabonarea nu vine de la „Inactivity behavior” și nici de la vreo regulă de 30 de zile care rulează în continuare. A fost o **acțiune unică, pe 10.07.2026**: un import sau o acțiune în masă, ori o automatizare de tip sunset pornită o singură dată pe toate contactele de atunci și apoi oprită.
- Pragul a fost „inactiv”, nu „30 de zile”. Un contact creat pe 09.07 la 08:10 a primit eticheta a doua zi.
- Agenția are dreptate că 30 de zile e prea puțin și că înainte de sunset trebuie un win-back. Greșește când presupune că un flux de sunset rulează acum.

Oportunitate, de decis cu proprietarul (și cu juristul, unde e cazul): cei 311 cumpărători și cei 352 „activi” dintre dezabonații în masă nu s-au dezabonat singuri. Dacă există dovada consimțământului inițial (importul din 18.03.2025 are „Subscribe to email using import”), putem face o campanie unică de reconfirmare, care să-i readucă doar pe cei care confirmă.

Curățarea automată a listei e activă: un contact e curățat după 24 de emailuri HTML nedeschise. Momentan sunt 0 contacte curățate. La frecvența de acum, cineva care nu deschide ajunge la 24 în 5–6 săptămâni. Contactul proprietarului e la 16 din 24, iar contactul 67fbed20571b2d2b6307084a tot la 16 din 24. Cine are Apple MPP pare că deschide tot, deci nu va fi curățat niciodată. Curățarea rămâne pornită, dar trebuie precedată de win-back și de reducerea frecvenței.

### 5.2 Frecvența și orele de trimitere

Cazuri reale, anonimizate:

| Contact | Perioadă | Emailuri primite | Detaliu |
|---|---|---|---|
| Abonat nou din pop-up (6ac3428a7b4c683cda0a423a) | 05–15.10 | 9 în 11 zile | W1, BF1, apoi newsletter + W2 + BF2 (3 într-o zi), newsletter, BF1, BF2. A deschis doar primul. |
| Abonat de la checkout (67f8fe2e7d4207bbea08314c) | 14–15.10 | 6 în 30 de ore | W1, CA E2 + SP E1 (același minut), PF1, W2, PF2. 0 deschideri. |
| Client fidel (685b905b2edfce82a607954f) | 18.09–10.10 | circa 20 în 23 de zile | RR după fiecare comandă, PF după comandă, CS ×2, BF ×2, CA ×2, SP, plus 6 newslettere |
| Client (67fbed20571b2d2b6307084a) | 08–16.09 | 11 în 9 zile | RR, newsletter, CA1, CA2, PF1, PF2, BF1, CS1, BF2, newsletter, CS2 |
| Proprietarul (67d95a652b9a2ae68606b421) | 14–23.09 | 12 în 10 zile | BF ×3, CS ×2, PF ×2, CA (la 03:40), SP ×2, newsletter ×2 |

Ore de trimitere observate: 00:18 (RR), 00:40 (BF), 01:12 (CA), 03:06 (CA), 03:26 și 03:28 (IB), 03:40 (CA), 22:52 (PF), 22:56 (BF), 23:44 și 23:46 (BF), 23:54 și 23:56 (PF).

Regula propusă pentru noul sistem:
- emailurile automate pleacă doar între 09:00 și 20:00;
- maximum 1 email automat pe zi și 3 pe săptămână pe contact; excepția e coșul, la 1 oră de la abandon;
- newsletterul nu se trimite cuiva care a primit un email automat în aceeași zi;
- toate fluxurile se opresc la comandă.

### 5.3 Prenumele luat din adresa de email

- **Cauza:** blocul theMarketer din temă (`shopify://apps/themarketer/blocks/mktr_core`) are funcția `mailName = function (email) { … email.split("@")[0].split(/[\._]/) … }`. Când formularul nu cere numele, aplicația face prenume și nume din partea dinaintea „@”.
- **Efect:**
  - subiecte de tipul „Încă te gândești la asta, {partea din email}?” (2 contacte în eșantion);
  - la contactele importate, numele de familie apare în locul prenumelui (3 contacte în eșantion; „Contact” la o adresă de firmă).
- **Ce facem:** scoatem prenumele din subiecte. În corpul emailului îl folosim doar cu text de rezervă („Salut,”). Separat, sincronizarea care rulează acum din Shopify poate aduce prenume corecte pentru clienți.

### 5.4 Subiectele

| Problemă | Exemple | De ce contează |
|---|---|---|
| Lipsesc diacriticele | „Cosul de cumparaturi te asteapta!”, „Inca te gandesti la asta”, „Iti place noua ta achizitie?” | Arată neprofesionist și nu seamănă cu campaniile, care au diacritice. Agenția zice că abonatul „percepe doi expeditori diferiți”, și are dreptate. |
| URL în subiect | „Bun venit la https://www.primesupplements.ro!” | Semnal de spam |
| Superlativ | „Nu rata cele mai bune oferte!” | Regula casei: fără superlative |
| Urgență falsă | „Ultima sansa sa-ti cumperi preferatele!” | Legea 363/2007, anexa 1, pct. 7 (`brief_legal.md` §3) |
| Același subiect în două fluxuri | „Credem ca te-ar incanta aceste articole” (SP E2 și CS E2) | Clientul nu le poate deosebi, iar raportarea se amestecă |
| Ton nepotrivit | „De ce atat de grabit?”, „S-a intamplat ceva?” | Poate părea că îl urmărim pe client |

### 5.5 Consimțământ și date

- **Consimțământ triplu din checkout.** La 3 contacte (67d95dcbd0ffa0049102debf, 6a9a292d32a24bdcb705c47a și 67f8fe2e7d4207bbea08314c), API-ul a înregistrat abonarea la email, SMS și push în aceeași secundă. Trebuie verificat în conectorul Shopify–theMarketer că acordul pentru SMS nu e dedus din bifa de email. Consimțământul pentru SMS trebuie să fie separat.
- **Welcome fără abonare.** Un contact fără niciun eveniment de abonare a primit Welcome (§4.1). De verificat dacă există fluxuri care trimit și contactelor neabonate.
- **Cookie-uri.** Declanșatoarele de navigare, coș și vizită se bazează pe urmărirea pe site. După `brief_legal.md` §1, această urmărire are voie să pornească doar după acordul pentru cookie-uri de marketing (pe site e instalat Pandectes GDPR). De verificat că scriptul theMarketer e condiționat de acest acord.
- **Cupoane.** theMarketer are 0 cupoane. Nicio automatizare și niciun pop-up nu generează coduri unice. WELCOME5 e un cod static din Shopify.
- **Mesaje tranzacționale.** theMarketer nu a trimis niciun email sau SMS tranzacțional în ultimele 30 de zile. Confirmarea comenzii și notificarea de expediere trebuie deci să rămână pornite în Shopify (sunt tranzacționale, nu marketing). Blocarea emailurilor din Shopify trebuie să se aplice doar la marketing.

### 5.6 Ce nu am putut verifica (de bifat în editor)

- [ ] Șablonul fiecărui email: alt text la imagini, versiune pentru dark mode, fonturi și culori de brand, un singur buton principal, footer complet (Prime Sport Supplements SRL, CUI, adresă, link de dezabonare, link spre politica de confidențialitate).
- [ ] Afirmațiile din corpul emailurilor: doar mențiuni de sănătate autorizate, cu condițiile lor; fără „arde grăsimi”, „detox”, „imunitate” sau „recuperare rapidă”; fără superlative; avertisment pentru cafeină unde e cazul. Campaniile din istoric au avut astfel de probleme (de exemplu „arzătoarele de grăsimi”, august 2026; „SUPER BLACK FRIDAY”, noiembrie 2025), deci e probabil ca și șabloanele automatizărilor să le aibă.
- [ ] Dacă Welcome E1 conține codul WELCOME5 și condițiile lui.
- [ ] Setările de re-intrare și de frequency capping ale fiecărui flux.
- [ ] Dacă vreun flux are blocuri „Unsubscribe” sau „Add tag”.
- [ ] Dacă în lista de declanșatoare există un declanșator de checkout (în knowledge base apar doar „Cart abandonment” și „Cart abandonment similar products”). În cronologia contactelor nu apare niciun eveniment de checkout, doar adăugare în coș și comandă.

---

## 6. Ce spune agenția și ce arată datele

| Punctul agenției | Verdict | Dovada |
|---|---|---|
| Double opt-in oprit | Probabil adevărat (nu se vede direct prin API) | Istoricul de consimțământ arată „Subscribe to email using popup” imediat, fără pas de confirmare. Legea din România nu îl cere, dar e cea mai bună dovadă de consimțământ. Costul: cam 20–30 % mai puține abonări. |
| Welcome cu doar 2 emailuri | **Confirmat** | E1 trimis imediat, E2 la 24 de ore |
| Șabloane neoptimizate la abandon site, navigare și coș | Nu se poate verifica prin API | Subiectele și orele de trimitere confirmă că fluxurile sunt slab lucrate |
| Două automatizări de coș pe același declanșator | **Confirmat** | 82 % suprapunere și 2 emailuri în același minut (§4.3) |
| Lipsește abandonul de checkout | **Parțial** | theMarketer nu înregistrează evenimente de checkout pe acest magazin. În 02–15.10 au fost 45 de checkout-uri abandonate în Shopify, de 11.108 lei în total (în medie 247 lei). 3 nu au email, 31 nu au consimțământ de marketing și nu pot primi emailuri de marketing (`brief_legal.md` §1.2). Cele 11 cu consimțământ (2.251 lei) au intrat deja în fluxul de coș din theMarketer. Golul real e lipsa unui mesaj separat, cu intenție mai mare, plus prea puțini oameni care bifează abonarea la checkout. |
| Lipsește fluxul pentru client nou | **Confirmat** | Cross sell la 7 zile nu e un onboarding, iar RR trimite greșit imediat după comandă |
| Automatizări incomplete | **Confirmat indirect** | 4 automatizări fără nicio trimitere din ianuarie |
| Automatizare de wishlist fără wishlist pe site | **Confirmat** | `"wishlist_engine":"none"`, 404 pe paginile de wishlist |
| Sunset după 30 de zile | **Parțial greșit** | IB e un win-back după 30 de zile fără vizită și nu dezabonează. Dezabonarea în masă a fost un eveniment unic, pe 10.07.2026 (§5.1). Concluzia lor („prea devreme, puneți win-back înainte”) rămâne valabilă. |
| Rate de deschidere mici la automatizări | **Confirmat** | 17–35 %, față de 51–66 % la campanii. Cauze: trimiteri noaptea, prea multe emailuri, subiecte fără diacritice, emailuri trimise unor oameni care tocmai au cumpărat |
| Fără segmentare | **Confirmat pentru automatizări** | Niciun flux nu exclude cumpărătorii recenți și nu există limită de frecvență între fluxuri |

---

## 7. Automatizări lipsă (de construit în theMarketer)

În ordinea priorității. Copy-ul există deja în `doc_shopify_full.md` și trebuie doar adaptat la theMarketer, cu regulile de la §5.2.

| # | Flux | Declanșator și filtre | Emailuri | De ce |
|---|---|---|---|---|
| 1 | **Client nou** (înlocuiește Cross sell și Welcome pentru cumpărători) | Prima comandă (comenzi = 1). Ieșire dacă vine a doua comandă. | 4: ziua 1 (mulțumire și ce urmează), ziua 4 (cum folosești produsul, cu doza de pe etichetă), ziua 10 (recenzie Judge.me și produse complementare), ziua 21 (pregătirea celei de-a doua comenzi) — §5 | Golul semnalat de agenție. A doua comandă e cea mai importantă pentru un magazin de consumabile. |
| 2 | **Reaprovizionare pe produs** (înlocuiește RR) | Comanda unui produs X, cu întârziere = cantitatea din ambalaj împărțită la doza zilnică, minus 5–7 zile. Ieșire dacă X e recomandat. | 1 email pe produs — §6 | Cel mai „curat” venit pe care îl poate aduce emailul, fără niciun spam |
| 3 | **Coș** (CA reparat, include checkout) | Coș abandonat, doar contacte abonate. Fără comandă. Re-intrare blocată 7 zile. | 3: la 1 oră, la 24 de ore (livrare, plată, retur fără să prezentăm drepturile legale ca avantaj), la 72 de ore (recomandări) — §3 și §4 | Unește CA și SP și acoperă și checkout-ul |
| 4 | **Welcome refăcut** | Abonare din pop-up sau formular, doar cine nu a cumpărat. Ieșire la comandă. | 4–5 în 10–14 zile — §1 | Rata cea mai mare de deschidere |
| 5 | **Win-back cumpărători** (înlocuiește IB) | Ultima comandă la 60, 90 și 120 de zile, fără comandă între timp | 2–3 — §7 | Recuperează clienți care au plecat |
| 6 | **Sunset pe interacțiune cu emailurile** | Niciun click în 150–180 de zile și nicio comandă în 180 de zile | 1 email „Mai vrei să primești emailurile noastre?”. Cine nu răspunde e exclus din campanii (segment de suprimare), nu dezabonat. | Protejează reputația domeniului fără să pierdem consimțământul |
| 7 | **Înapoi în stoc** | Abonare la produs epuizat, dacă theMarketer oferă alertă de produs; altfel, segmentul celor care au văzut produsul | 1 | Crema de orez a avut 5 campanii „a revenit în stoc” între iulie și septembrie |
| 8 | **Cerere de recenzie** | Inclusă în fluxul Client nou. Verificăm întâi că Judge.me nu trimite deja propriul email de recenzie. | 0–1 | Recenziile reale ajută toate celelalte emailuri |
| 9 | **Navigare** (PF reparat) | Produs văzut, fără coș și fără comandă, maximum o dată la 14 zile | 1–2 — §2 | Cel mai mic efort, dar trebuie făcut corect |

Nu recomand: price drop, aniversare (nu avem date de naștere: câmpul e gol la contactele verificate) și SMS automat (abia după ce consimțământul pentru SMS e verificat).

---

## 8. Ce aș face imediat (în aplicație, în circa o oră, fără risc)

1. Opresc **Remind customers to reorder** (bug: trimite la 0–2 minute după comandă).
2. Opresc **Cart abandonment similar products** (duplicat).
3. Opresc **Bounce follow-up** și **Inactivity behavior**.
4. În **Cart abandonment**, **Product follow-up**, **Welcome series 2** și **Cross sell**:
   - activez „Delay until a specific time of the day” (între 09:00 și 20:00) pe fiecare pauză;
   - activez „Exclude contacts who have not exited this automation flow yet” și „Enable frequency capping” (7 zile la coș, 14 la navigare);
   - pun filtru „Buyer in the last X days” = 3 la PF și la Welcome E2.
5. Rescriu subiectele: cu diacritice, fără URL, fără superlative, fără urgență falsă, fără prenume. De exemplu:

   | Flux | Subiect nou |
   |---|---|
   | Welcome E1 | „Bun venit la Prime Supplements — codul tău de 5 %” |
   | Welcome E2 | „Cum alegi produsele potrivite pentru tine” |
   | CA E1 | „Ai lăsat ceva în coș” |
   | CA E2 | „Coșul tău e încă salvat” |
   | PF | „Încă te interesează produsul văzut?” |
   | CS E1 | „Cum ți se pare comanda?” |

   Toate trebuie verificate cu `brief_legal.md` înainte de publicare.
6. Deschid ref 1, 2, 5 și 8, notez ce conțin și le arhivez.
7. Trimit un test din fiecare flux rămas pe adresa proprietarului și bifez checklistul de la §5.6.

**Efect:** 43 % mai puține emailuri automate (circa 1.615 la 90 de zile). Se pierd cel mult 20 de tranzacții atribuite (24 de click-uri), cele mai multe dintre ele atribuite doar pe deschidere. Automatizările noi (§7) se construiesc după aceea, în designul sistemului.

---

## 9. Fișiere de lucru

- `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/themarketer/system/work/entries_2026-10-02.txt` … `entries_2026-10-15.txt` — intrările pseudonimizate (fără emailuri), câte un fișier pe zi
- `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/themarketer/system/tally.py` și `tally_sum.py` — numărătorile pe zi și pe 14 zile
- `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/themarketer/system/work/dl_site/` — homepage și pagina de produs salvate pentru verificarea wishlist-ului și a funcției `mailName`
