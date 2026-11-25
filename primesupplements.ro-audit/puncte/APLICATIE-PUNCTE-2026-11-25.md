# Prime Puncte – aplicația proprie de puncte de fidelitate (25.11.2026)

Cererea lui Marius (25.11): „putem face o aplicatie separata puncte de fidelitate? iar toate discounturile aici sa nu se poata combina cu cupoanele afiliatilor?” Mai târziu, tot pe 25.11: „modifica la 24 luni” (expirarea).
Context: `analiza-concurenta-2026-11-25/STRATEGIE.md` D4 și §7 (GymBeam, GymStack și Pro Nutrition au puncte, Prime nu). Decizia e în `ISTORIC-DISCUTII.md` (25.11).

**Stare (25.11.2026, seara): LIVE** (Marius: „Pornim acum”). Programul pornit, linkul „Punctele mele” e în meniul contului de client și în subsol, regulamentul e public, punctele se calculează retroactiv de la 26.09.2026, iar e-mailurile pleacă tuturor membrilor care nu le-au oprit. Testul în checkout nu s-a făcut (decizia lui Marius: „Fără test în checkout”); combinarea e garantată de setările codului și de pază, verificate pe setările reale. Oprire: `PORNIRE-LIVE.md`.

Codul: `D:\Proiecte Claude\Prime Supplements\prime-puncte\` (repo git local separat, ca `prime-indexare`; fără GitHub deocamdată).

---

## 1. Regulile (exact ce a cerut Marius)

| Regulă | Cum e făcută |
|---|---|
| 1 punct pe 1 leu cheltuit | `floor(currentSubtotal)` al comenzii: produsele **după reduceri și retururi**, cu TVA, **fără transport** |
| 100 de puncte = 3 lei | `pointsToLei` |
| Bonus 100 la cont nou | la **înscrierea în program** pe `/apps/puncte` (vezi §5, decizia 3) |
| Bonus 50 pentru o recenzie, 100 cu poză (Judge.me) | doar cumpărători verificați, recenzii publicate, **indiferent de notă**; un singur bonus pe produs și client |
| Bonus 150 de ziua clientului | clientul își scrie **ziua și luna** (fără an, opțional) pe pagina de puncte, **o singură dată, și primește 50 de puncte la completare**. După aceea data **nu se mai schimbă din pagină** (o corectură se face din panou, fără bonus nou). Cei 150 vin o dată pe an, dacă are cel puțin o comandă livrată și data a fost salvată cu cel puțin 30 de zile înainte. 29 februarie se sărbătorește pe 28 în anii obișnuiți. Data se scrie și în **metafield-ul clientului** `prime_puncte.zi_nastere` („LL-ZZ”), doar în live (regulile confirmate de Marius în sesiunea principală, 25.11) |
| Punctele se primesc după livrare | în așteptare de la plasare; disponibile la **ultima expediere + 14 zile** (vezi §5, decizia 2) |
| Se anulează la retur, rambursare sau anulare | înainte de livrare: linia se anulează. După livrare: se scade diferența (dacă punctele au fost deja folosite, rămâne o „datorie” acoperită din punctele următoare) |
| Maximum 20 % din comandă | cod cu **valoare fixă** și **subtotal minim = 5 × valoarea** (ex.: 500 de puncte = 15 lei, comandă minimă 75 lei) |
| Nu pe pachetele din Reduceri | codul se aplică **doar pe colecția „Eligibile coduri reducere (intern)”** (gid 699312505207: 222 de produse = toate cele 237, fără cele 15 pachete din Reduceri; verificat 25.11) |
| Expiră după **24 de luni** | fiecare lot de puncte expiră la 24 de luni de la data la care a devenit disponibil; folosirea consumă întâi punctele cele mai vechi |
| **Nu se combină cu codurile de afiliat** | codul de puncte: `DiscountCodeBasic`, PRODUCT, `combinesWith { productDiscounts: false, orderDiscounts: false, shippingDiscounts: true }`. **Codurile de afiliat NU se modifică.** |

Detalii de folosire: din 100 în 100 de puncte, minimum 100, maximum 5.000 pe cod. Codul e unic (`PP-XXXXXXXX`), de o singură folosire, legat de client și valabil 30 de zile. Clientul poate avea un singur cod activ. Dacă nu-l folosește sau îl anulează, punctele revin. Dacă o comandă plătită cu un cod de puncte e anulată, punctele codului revin.

## 2. De ce nu se poate combina cu codurile de afiliat (verificat în Shopify, citire, 25.11)

Shopify aplică două reduceri împreună **doar dacă fiecare o permite pe clasa celeilalte**.

| Reducere activă | Clasă | product / order / shipping | Cu codul de puncte |
|---|---|---|---|
| ~100 de coduri de afiliat (geo10, rammy10, chera10, PrimeVIP …) | PRODUCT | true / false / true | **NU** (punctele au product=false) |
| WELCOME5 | PRODUCT | true / true / true | **NU** |
| LATEBF20 | PRODUCT | false / false / true | **NU** |
| oferta pe cantitate (viitoare, fără combinare) | PRODUCT | false / false / true | **NU** |
| transport gratuit (cod sau automat) | SHIPPING | – | **DA** |

Asta e testat în `prime-puncte/test/rules.test.ts`. În plus, pagina „Combinare” din panoul aplicației recitește oricând reducerile active și semnalează în roșu dacă vreuna s-ar combina.

**Paza (`src/guard.ts`)** e singura cale către Shopify. Înainte să plece orice cod, verifică: prefixul PP-, combinesWith product=false și order=false, o singură folosire, un singur client, doar colecția eligibilă, subtotalul minim ≥ 5 × valoarea, valoarea ≤ 300 lei și data de expirare. Orice altă mutație e blocată: modificarea codurilor de afiliat, produse, clienți, rambursări, ștergeri, temă. **În umbră e blocată orice scriere.**

## 3. Arhitectura (după modelul Prime Afiliați)

- **Cloudflare Worker + D1 pe contul Cloudflare Prime** (`prime-puncte`). Deploy doar cu `node scripts/wr.mjs deploy`. Costul e zero (planul gratuit).
- **Aplicație separată în Dev Dashboard**: „Prime Puncte”, embedded, cu propriul client ID și secret. Nu e o versiune a aplicației Afiliați: Marius a cerut o aplicație separată, iar regulile de pază sunt diferite.
- Autentificarea, criptarea tokenului (ENC_KEY), schimbul de token și semnătura App Proxy sunt copiate din Afiliați.

**Scope-uri** (minimul necesar):
- `read_orders` – comenzile (puncte, retururi, coduri folosite);
- `write_customers` (include citirea) – găsirea clientului după e-mail (recenzii Judge.me, căutarea din panou), prenumele de pe pagină și **doar** metafield-ul `prime_puncte.zi_nastere`. Paza respinge orice alt metafield sau orice altă schimbare de client;
- `write_discounts` – doar crearea și oprirea codurilor PP-, prin pază.

**Webhook-uri** (în versiunea aplicației, URL `https://prime-puncte.prime-expediere.workers.dev/webhooks`, verificate cu HMAC):
- `orders/create`, `orders/updated`, `orders/cancelled`, `refunds/create` → comanda se recitește din Admin API și se aplică;
- `app/uninstalled` → se șterge tokenul;
- `customers/data_request`, `customers/redact`, `shop/redact` (GDPR) → la redact se șterge tot ce ține de client.

**Lucrul periodic (fără cron):** contul Cloudflare gratuit are maximum 5 cron-uri și sunt ocupate de celelalte aplicații (25.11), așa că rularea pornește la cererile care vin (webhook-urile comenzilor, pagina, panoul): o dată la cel mult o oră se reiau comenzile modificate (plasa de siguranță pentru webhook-uri pierdute), punctele ajunse la termen devin disponibile, se închid codurile expirate, se citesc recenziile Judge.me și se scriu zilele de naștere în metafield (doar live); o dată pe zi, după ora 8, se dau bonusurile de zi de naștere. Rularea se rezervă în D1, ca să nu pornească de două ori. Fără costuri; dacă se eliberează un cron, aceeași funcție merge și din cron.

**Unde vede clientul soldul: pagina `primesupplements.ro/apps/puncte`** (App Proxy, subpath `puncte`, prefix `apps`, URL `https://prime-puncte.prime-expediere.workers.dev/proxy`):
- se afișează **în tema magazinului** (răspuns `application/liquid`: antet și subsol Prime);
- dacă clientul nu e logat, vede „Intră în cont” și regulile;
- la prima vizită logat vede regulile și bifa de acord, apoi butonul „Intră și primește 100 de puncte”;
- după înscriere vede soldul (disponibil, în așteptare, ce expiră curând), „Folosește punctele” (alege suma, primește codul), codul activ cu „Anulează”, data nașterii și istoricul;
- formularele sunt simple (fără JavaScript), în stilul e-mailurilor Prime: negru, roșu #ec1e24 și butoane uppercase.
- Recomandarea mea: pagina separată `/apps/puncte`, plus un link „Punctele mele” în meniul contului și în subsol. **Linkul e o schimbare de temă → separat, cu „da”.** Un bloc în pagina contului nu se poate pune direct: noile conturi Shopify nu permit Liquid acolo, ar trebui o extensie de cont.

**Panoul din Shopify Admin** (Aplicații → Prime Puncte):
- Panou: înscriși, clienți cu puncte, puncte disponibile (= datoria în lei), puncte în așteptare și expirate, totaluri pe tipuri, coduri generate;
- Client: căutare după e-mail sau id, registrul complet, codurile și ajustarea manuală (cu motiv obligatoriu);
- Setări: data de pornire, clienții de test, zilele de așteptare, valabilitatea codului și maximul pe cod. Regulile de bază rămân în cod și nu se pot schimba din panou: 1 punct/leu, 3 lei/100, 20 %, 24 de luni, bonusurile;
- Combinare: verificarea live descrisă la §2.

**Date personale (minime):** în D1 stau doar id-ul clientului Shopify și ziua/luna nașterii, fără e-mail, nume sau an. E-mailul din recenzii se folosește doar ca să găsim clientul și nu se salvează. **Nimic în repo.**

## 4. Mod umbră → live

- **Umbră (acum, `MODE=shadow`):** aplicația citește comenzile și calculează punctele în D1. Pagina `/apps/puncte` o văd **doar clienții de test** din Setări (Marius, Adelina); ceilalți văd „pornește în curând”. Codurile generate sunt **simulate** și nu se creează nimic în Shopify. Paza blochează orice scriere.
- **Live:** doar după „da”-ul lui Marius, cu `MODE=live` în `wrangler.jsonc` și deploy.

## 5. Decizii pentru Marius (înainte de live)

1. **Excepția de la regula „fără coduri de reducere noi (doar WELCOME5)”** pentru codurile PP- generate de aplicație. **Cere „da”.**
2. **„După livrare”:** Shopify nu știe când se livrează coletul (`deliveredAt` e gol la toate comenzile Cargus, iar cele cu ramburs rămân „PENDING”). Propun ca punctele să devină disponibile la **14 zile după expediere**, adică livrarea plus perioada de retur. Mai târziu se poate lega statusul „livrat” din Total Admin (Cargus).
3. **„Cont nou”:** Shopify creează un client și la comenzile fără cont, deci bonusul de 100 l-am legat de **înscrierea în program** (prima intrare pe `/apps/puncte`, cu acordul pentru reguli). Punctele din comenzi se strâng oricum, iar la înscriere clientul vede „Ai deja X puncte”.
4. **Data de pornire:** implicit **1.01.2027** (calendarul din STRATEGIE: „Ianuarie: programul de puncte”). Comenzile de dinainte nu primesc puncte, fără retroactiv. Se schimbă din Setări.
5. **Se primesc puncte și pe pachetele din Reduceri?** Acum da, pe tot ce plătește clientul. Doar **folosirea** e exclusă pe pachete. Dacă vrea și fără câștig pe pachete, se schimbă ușor.
6. **Recenziile:** trebuie tokenul privat Judge.me, pe care **îl pune Marius ca secret** (`JUDGEME_API_TOKEN`; nu cer chei). Fără el, bonusurile pentru recenzii nu se acordă. Bonusul e indiferent de notă, ca să nu fie recenzii „cumpărate”.
7. **Numărul pe cod:** maximum 5.000 de puncte (150 lei), un singur cod activ odată, valabil 30 de zile. Se schimbă din Setări.
8. **Data nașterii: rezolvată (Marius, în sesiunea principală, 25.11, „ok continua … cu regulile ce am discutat aici”).** Câmp opțional, o singură completare cu +50 de puncte, fără schimbări din pagină și metafield de client. Toate sunt făcute.
   - **Rămâne:** trimiterea datei în câmpul Birthday din theMarketer, pentru urarea din T1 2027 (`email-marketing/themarketer/SYSTEM.md`). Workerul ar avea nevoie de cheia API theMarketer, pe care n-o cer, și de un endpoint de actualizare a contactului, pe care nu l-am verificat. Variantă simplă, de făcut când pornește urarea: un export lunar din metafield în theMarketer, dintr-o sesiune cu conectorul theMarketer.
9. **Expirarea: 24 de luni.** Mesajul din sesiunea principală mai spunea 12 luni, dar Marius a scris direct aici „modifica la 24 luni”, după aceea. Confirmat de Marius pe 25.11: „Da, 24 de luni”.

## 6. Pornirea umbrei – FĂCUT pe 25.11 (Claude, în browserul aplicației, cu acordul lui Marius: „fa tu tot, ai permisiunea mea”)

1. Dev Dashboard (dev.shopify.com) → aplicație nouă **„Prime Puncte”** → versiunea `v1-mod-umbra`:
   - App URL: `https://prime-puncte.prime-expediere.workers.dev`, embedded;
   - Scopes: `read_orders,write_customers,write_discounts`;
   - App proxy: prefix `apps`, subpath `puncte`, URL `https://prime-puncte.prime-expediere.workers.dev/proxy`;
   - Webhooks (API 2025-10): cele de la §3, către `https://prime-puncte.prime-expediere.workers.dev/webhooks`;
   - Release, apoi Install pe magazin.
2. **Făcut pe 25.11 de Claude:** D1 `prime-puncte` (629ab131-…) creată, migrațiile aplicate, `ENC_KEY` pus, Workerul publicat în umbră la https://prime-puncte.prime-expediere.workers.dev (răspunde; fără semnătură Shopify, pagina/panoul/webhook-urile refuză cu 401). Rămâne, după ce Marius creează aplicația: client ID-ul în `wrangler.jsonc` + redeploy (Claude) și `SHOPIFY_API_SECRET`, pe care îl lipește Marius în terminal (`node scripts/wr.mjs secret put SHOPIFY_API_SECRET` în folderul prime-puncte), nu în chat.
3. Marius deschide aplicația din admin o dată (token), iar Claude trece în Setări clienții de test.

## 7. Testul de combinare în checkout (după „da”)

Testul în checkout cere un cod real în magazin și intrarea în checkout. CLAUDE.md spune „Nu intra în checkout pe site”, iar sarcina spune „nu schimba nimic fără da”, **așa că nu l-am făcut.** Ce am verificat: setările reale ale tuturor reducerilor active (citire), regula de combinare în teste și verificarea din panou.

Planul, cu „da”, pe un produs de test și **fără nicio comandă**:
1. Aplicația în live doar pentru clientul de test; se generează un cod de 100 de puncte (3 lei, minim 15 lei).
2. Coș cu un produs eligibil peste 15 lei → checkout → se aplică codul PP- → reducerea de 3 lei apare.
3. Se adaugă `geo10` (afiliat) → Shopify trebuie să refuze combinarea („nu poate fi folosit împreună”). La fel cu WELCOME5.
4. Coș peste 300 lei: livrarea gratuită rămâne, împreună cu codul PP-.
5. Coș doar cu un pachet din Reduceri: codul nu se aplică. Coș sub subtotalul minim: codul nu se aplică.
6. Se închide checkout-ul fără plată; codul de test se anulează din pagină și punctele revin.

## 8. Textul pentru politica de confidențialitate (de pus cu „da”)

> **Programul Prime Puncte.** Dacă te înscrii în programul de fidelitate Prime Puncte, păstrăm istoricul punctelor tale (punctele primite din comenzi, recenzii și bonusuri, punctele folosite și codurile generate), legat de contul tău de client, și, dacă ne-o spui, ziua și luna nașterii (fără an). Data e opțională și o folosim doar ca să-ți oferim bonusul de ziua ta și să-ți trimitem o urare. Temeiul este executarea contractului (regulamentul programului) și, pentru data nașterii, consimțământul tău, pe care îl poți retrage oricând. Datele se păstrează cât timp ai contul și, după ștergerea contului, se șterg. Ca să-ți acordăm punctele pentru recenzii, potrivim adresa de e-mail din recenzia Judge.me cu contul tău de client; adresa nu se păstrează în program. Datele sunt găzduite la Cloudflare (UE/SUA, cu clauze contractuale standard).

(Fără vreo mențiune de AI. Formularea finală trebuie pusă în pagina de politică existentă.)

## 9. Teste (prime-puncte, `npm test`, 52 de teste)

- `rules.test.ts`: regulile (1 punct/leu, 3 lei/100, 20 %, 24 de luni, bonusurile), punctele comenzii, disponibilitatea după expediere, soldul FIFO cu expirare și datorie, codul exact trimis spre Shopify, refuzul oricărui cod care s-ar putea combina, **combinarea cu setările reale ale codurilor de afiliat, WELCOME5 și LATEBF20**, ziua de naștere;
- `ledger.test.ts` (D1 în memorie, cu aceleași migrații): comenzi, anulări, retur parțial, idempotența, înscriere, zi de naștere, recenzii, cod simulat, cod refuzat de Shopify (punctele nu se pierd), anulare, expirare, cod folosit la limită, comanda anulată cu cod, setările protejate, GDPR;
- `guard.test.ts`: umbra blochează tot; în live trece doar codul PP- corect, iar orice altceva e blocat;
- `page.test.ts`: pagina fără Liquid și cu datele scăpate, regulile afișate, scriptul panoului valid, semnătura App Proxy și HMAC-ul webhook-urilor.

Verificat și în browser, local (`prime-puncte-dev`, port 8792): pagina clientului pe desktop și pe telefon, generarea unui cod simulat (300 de puncte → 9 lei, minim 45 lei), anularea (punctele revin), panoul (Panou, Client, Setări).

### 6b. Ce s-a făcut concret pe 25.11 (seara)
- Dev Dashboard: aplicația „Prime Puncte” creată, `v1-mod-umbra`, apoi `v2-pagina-puncte` cu App Proxy `apps/puncte` → `…/proxy`. Shopify a cerut în plus scope-ul **`write_app_proxy`** (obligatoriu pentru App Proxy). Declarația „Network access”: niciun host sau origine externă.
- Formularul de versiune **nu are câmp pentru webhook-uri** (se declară doar prin CLI), așa că aplicația se abonează singură prin API la prima deschidere (`ORDERS_CREATE/UPDATED/CANCELLED`, `REFUNDS_CREATE`, `APP_UNINSTALLED`). Paza permite abonarea doar spre adresa noastră. Webhook-urile GDPR (`customers/redact` etc.) nu se pot abona prin API; sunt obligatorii doar pentru aplicațiile din App Store, iar endpoint-ul există.
- Instalată pe magazin (Install, cu acordul lui Marius); client ID-ul e în `wrangler.jsonc`. Client secret-ul l-a pus Marius în terminal: prima lipire a fost greșită (49 de caractere), a doua corectă (38). Pentru data viitoare, `scripts/pune-secret.ps1` ia secretul din clipboard și îl verifică.
- Clienții de test în Setări: Marius și Adelina (id-urile sunt doar în D1).
- Prima sincronizare: 77 de comenzi citite, 0 puncte (data de pornire e 1.01.2027).

## 5b. Deciziile lui Marius (25.11, seara)
1. **Codurile PP- – DA**, ca excepție de la „fără coduri noi (doar WELCOME5)”, la pornirea live.
2. **Puncte disponibile la 14 zile după expediere** (cum era propus).
3. **Bonusul de 100 la înscrierea în program** (prima intrare pe /apps/puncte), nu la orice client creat de Shopify.
4. **Retroactiv, ultimele 60 de zile:** comenzile de după 26.09.2026 primesc puncte (`startAt` = 2026-09-26 în Setări). 60 de zile e și cât lasă Shopify să citească aplicația, fără `read_all_orders`.
5. **Regulă nouă (Marius: „mai pune o regula ca sa foloseasca punctele trebuie minim 1 recenzie in ultimele 30 zile”):** ca să genereze un cod din puncte, clientul trebuie să fi scris **cel puțin o recenzie Judge.me în ultimele 30 de zile** (publicată, de la cumpărător verificat, orice notă). Pagina îi explică asta în locul formularului. Regula are nevoie de tokenul Judge.me, fără de care nimeni nu poate folosi punctele.
   - **De reținut (legal):** recenziile scrise pentru că aduc puncte sunt recenzii stimulate. Regula UE (Omnibus) cere ca magazinul să nu păstreze doar recenziile bune și să spună cum verifică recenziile. Recompensa nu depinde de notă (așa e făcută), iar regulamentul și eventual widgetul Judge.me trebuie să spună că recenziile pot primi puncte.
6. Fără răspuns încă: punctele pe pachete (acum: da), limitele pe cod (acum: max. 5.000 de puncte, 30 de zile), tokenul Judge.me (acum sau mai târziu).

### 5c. Calculul retroactiv pe 60 de zile (25.11, seara; mod umbră, clienții nu văd nimic)
- 1.182 de comenzi (26.09–25.11.2026), **874 de clienți**, **377.278 de puncte ≈ 11.318 lei** (3 % din ce au plătit pe produse). Din ele, **≈ 8.746 lei sunt deja disponibile** (expediate de peste 14 zile) și **≈ 2.572 lei în așteptare**.
- Asta e suma maximă datorată, nu un cost sigur. Un client își poate folosi punctele doar cu o recenzie în ultimele 30 de zile și doar pentru maximum 20 % dintr-o comandă nouă de cel puțin 5 × valoarea codului. Punctele expiră după 24 de luni.
- Tehnic: planul gratuit Cloudflare dă 10 ms de procesor pe cerere, deci sincronizarea merge pe bucăți de 20 de comenzi, iar panoul le rulează una după alta.

### 5d. Judge.me conectat (25.11, seara)
- Marius a pus tokenul privat Judge.me cu `scripts/pune-token-judgeme.ps1`, care îl ia din clipboard și nu-l afișează (secretul `JUDGEME_API_TOKEN`).
- Judge.me marchează cumpărătorii verificați cu **„verified-purchase”**, nu cu „buyer”. Aplicația le acceptă pe amândouă. Nu primesc puncte recenziile marcate „nothing” (neverificate), „email” (doar e-mail confirmat) și cele nepublicate.
- De la 26.09 sunt 69 de recenzii. **28 de bonusuri acordate (1.500 de puncte = 45 lei)**. **11 clienți au acum o recenzie în ultimele 30 de zile**, deci și-ar putea folosi punctele după pornirea live.
- Recenziile se citesc pe bucăți de câte 15, odată cu sincronizarea comenzilor.

### 5e. E-mailurile despre puncte (25.11, seara; Marius: „Da, fă-le”)
- Trei e-mailuri prin theMarketer (tranzacțional), în designul Prime:
  1. **„Ai X puncte Prime = Y lei”**: cel mult unul pe săptămână, când devin disponibile puncte din comenzi. Conține calculul clientului: câte puncte intră într-un cod, comanda minimă (5 × reducerea) și de ce (20 %); peste 5.000 de puncte, că restul rămân în cont; fără recenzie recentă, pasul de dinainte.
  2. **„X puncte Prime expiră pe …”**: cu 30 de zile înainte, o dată pe fiecare dată de expirare.
  3. **„La mulți ani! Ai primit 1.000 de puncte”**: în ziua bonusului.
- Doar membrii înscriși care nu au oprit e-mailurile (buton pe pagina de puncte și link în subsolul fiecărui e-mail). **În mod umbră pleacă doar la clienții de test** (Marius, Adelina). E-mailul clientului se ia din Shopify la trimitere și nu se salvează.
- Cheile theMarketer (`THEMARKETER_API_KEY`, `THEMARKETER_CUSTOMER_ID`) au fost puse pe 25.11 din Chrome-ul lui Marius (Settings → Technical integration → butoanele Copy de la REST KEY și Customer ID) și salvate din clipboard cu `scripts/secret-din-clipboard.ps1`. Valorile n-au trecut prin chat, iar clipboard-ul a fost golit după.
- **Test trimis pe 25.11:** câte un e-mail din fiecare fel la Marius și la Adelina (6 în total, toate „trimis”). Prenumele scrise numai cu majuscule (de ex. „CHERA” în contul Adelinei) apar acum normal („Chera”).
- Bonusul de ziua clientului: **1.000 de puncte (30 lei)**, plus 50 la completarea zilei (Marius, 25.11).
