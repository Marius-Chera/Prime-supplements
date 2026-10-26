# Închiderea completă a magazinului B2B (b2b.primesupplements.ro) – ghid pentru proprietar, 26.10.2026

Decizie nouă (26.10, seara): magazinul B2B se **închide complet**; **fără redirect** – proprietarul șterge înregistrarea CNAME `b2b` de la furnizorul domeniului (secțiunea D rămâne doar ca variantă respinsă), nu doar se pune parolă (înlocuiește E21 din `SETARI-VANZARI-2026-10-16.md` și întrebarea 1 din `seo/PLAN-DUPA-BLACK-FRIDAY-2026.md`). Vânzările B2B merg prin agent + Oblio (`agenti/`).

Magazinul B2B este un magazin Shopify **separat**: admin `kuqr0h-en.myshopify.com`, adresa publică `b2b.primesupplements.ro`. Magazinul principal este `primesupplements1.myshopify.com`. Verifică în bara de adresă a browserului că ești în **kuqr0h-en** înainte de orice pas de mai jos. Dezactivarea se face doar din contul de **proprietar al magazinului** (store owner).

## A. Înainte de închidere (în magazinul B2B)

1. **Comenzi deschise.** Comenzi → filtrul „Neonorate” (Unfulfilled) și „Neplătite”. Dacă există, le rezolvi sau le anulezi înainte.
2. **Export de date** (după dezactivare nu mai ai acces la admin):
   - Comenzi → Exportă → „Toate comenzile” → CSV pentru Excel. Păstrezi fișierul în `D:\Prime Supplements\` (evidență contabilă).
   - Clienți → Exportă → toți clienții → CSV (lista partenerilor B2B, de dat agentului / pentru anunț).
   - Produse → Exportă (opțional; prețurile vechi B2B sunt deja salvate în Anexa 3 a contractului, coloana „Vechi B2B”).
3. **Aplicații.** Setări → Aplicații și canale de vânzare → dezinstalezi fiecare aplicație (mai ales cele cu abonament). Shopify oprește facturarea aplicațiilor la dezactivare, dar abonamentele plătite în afara Shopify nu se opresc singure.
4. **Facturi Shopify.** Setări → Facturare: nu trebuie să existe facturi neplătite; altfel dezactivarea e blocată.
5. **Plăți.** Setări → Plăți: dacă e activ Shopify Payments, soldul rămas se plătește în continuare în contul bancar după dezactivare; nu schimba contul. Dacă e doar Netopia/ramburs, nimic de făcut.
6. **Anunțul partenerilor.** Un e-mail scurt către clienții B2B cu cont: magazinul se închide, comenzile se dau la contact@primesupplements.ro / 0775 286 584 sau prin agent; facturare Oblio.

## B. Eliberarea domeniului (în magazinul B2B)

7. Setări → Domenii → apasă pe `b2b.primesupplements.ro` → **Elimină** (Remove domain). Confirmi. Domeniul `.myshopify.com` nu se poate șterge, rămâne.
   De ce: cât timp domeniul e legat de magazinul B2B, nu poate fi conectat la magazinul principal (pasul 10).

## C. Dezactivarea magazinului (în magazinul B2B)

8. Setări → **Plan** → jos de tot, linkul **Dezactivează magazinul** (Deactivate store).
   - Shopify îți oferă întâi „Pause and build” (abonament redus) – **refuzi**, alegi dezactivarea.
   - Alegi motivul (de ex. „Închid afacerea / nu mai am nevoie de acest magazin”), introduci parola contului, confirmi.
   - Primești e-mail de confirmare. Abonamentul se oprește; nu se mai facturează nimic de la data dezactivării.
9. Verificare: în fereastră privată, `https://kuqr0h-en.myshopify.com` trebuie să arate pagina „This store is unavailable”.
   Shopify păstrează datele o vreme și permite reactivarea din același cont (Setări → Plan), dar tratează pasul ca definitiv: nu te baza pe reactivare.

## D. Redirectarea vechilor adrese spre magazinul principal (în magazinul principal, primesupplements1) – recomandat

Google are ~110 adrese `b2b.primesupplements.ro/products/...` în index (raportul GSC din 26.10, A6) cu **aceleași handle-uri** ca produsele de pe site. Dacă domeniul rămâne mort, devin 404 și se pierd; dacă îl conectezi la magazinul principal, Shopify face automat **301** de la fiecare adresă veche la aceeași cale pe primesupplements.ro (ex. `/products/creatina-creapure` → `https://primesupplements.ro/products/creatina-creapure`).

10. În adminul magazinului principal: Setări → Domenii → **Conectează domeniul existent** → scrii `b2b.primesupplements.ro` → Următorul.
11. Shopify verifică DNS-ul: subdomeniul trebuie să aibă înregistrarea **CNAME `b2b` → `shops.myshopify.com`**. Înregistrarea există deja (așa mergea magazinul B2B); dacă Shopify spune că nu o găsește, o verifici/adaugi la furnizorul domeniului (serverele de nume kemo.services, același loc unde ai înregistrările CNAME pentru e-mail). Apoi „Verifică conexiunea”.
12. După conectare, în lista Domenii, `b2b.primesupplements.ro` apare cu „Redirecționează către primesupplements.ro” (comportamentul implicit pentru domeniile secundare). Nu îl faci domeniu principal. Certificatul SSL se emite în până la 48 h.
13. Verificare (fereastră privată): `https://b2b.primesupplements.ro/products/creatina-creapure` → ajunge pe `https://primesupplements.ro/products/creatina-creapure`. Spune-mi când ai făcut pasul 12: verific eu din aplicație toate cele 58 de adrese vechi cu `curl` și notez în jurnal.

Alternativa (dacă nu vrei redirect): ștergi înregistrarea CNAME `b2b` la furnizorul domeniului; adresele vechi nu mai răspund deloc, Google le scoate din index în câteva săptămâni, fără transfer spre site.

## E. După

14. **Search Console:** nimic de cerut (fără Removals). Proprietatea de domeniu `primesupplements.ro` acoperă și subdomeniul; dacă există o proprietate separată `b2b.primesupplements.ro`, o lași 2 luni ca să vezi scăderea, apoi o ștergi din GSC. Verificarea programată „Verificare GSC 23.11” urmărește oricum „b2b în index”.
15. **Tema magazinului principal:** curățenia B2B (atributele BSS, CSS-ul și scriptul inlinat) a fost făcută pe 26.10 pe copia „Prime – fără B2B (26.10)” și pe tema de Black Friday (`backups/b2b-ungaria-cleanup-2026-10-26/changes.md`); tema live nu e atinsă. Rămâne la tine: publici copia „Prime – fără B2B (26.10)” sau aștepți publicarea temei de Black Friday pe 30.10 (o conține deja). Linkurile și pagina B2B sunt scoase din 17.10; redirectul `/pages/inregistrare-b2b` → `/pages/contact` rămâne.
16. **Contractul agentului:** nimic de schimbat (Anexa 3 nu depinde de magazinul B2B).

## Ce nu se poate face din aplicație
Dezactivarea și domeniile cer contul de proprietar logat în browserul tău (Opera); eu nu am acces la el și nu fac pașii în locul tău. Pot verifica rezultatul (DNS, redirecturi, index) după fiecare pas.

## Stare 26.10 (captură proprietar) și textul pentru extensie

Setări → Plan arată „Store deactivates on Nov 14, 2026”: planul Basic e deja oprit, Shopify dezactivează magazinul automat pe 14.11. Nu există buton „Dezactivează magazinul”; nu se apasă „Reactivate plan”. Până la 14.11 storefront-ul e public. Textul de mai jos (dat proprietarului pe 26.10) face curățenia rămasă din adminul B2B prin extensia Chrome; CNAME-ul `b2b` se șterge de proprietar la furnizorul domeniului.

```text
Lucrezi în Shopify Admin al magazinului B2B: kuqr0h-en.myshopify.com (PRIME SPORT SUPPLEMENTS, adresa b2b.primesupplements.ro). NU în magazinul principal primesupplements1. Dacă tab-ul deschis nu e kuqr0h-en, oprește-te și spune-mi. Scop: magazinul B2B să dispară complet (se dezactivează automat pe 14.11.2026) și să nu mai apară în Google. Fă pașii în ordine și raportează la final ce ai găsit și ce ai schimbat.

1. Setări → Plan: confirmă textul „Store deactivates on Nov 14, 2026”. NU apăsa „Reactivate plan”.
2. Setări → Plăți → Shopify Payments: citește soldul (balance) și plățile în așteptare. Nu schimba nimic; doar raportează suma. Dacă e sold, îmi spui ca să actualizez eu datele contului.
3. Setări → Facturare: raportează facturile neplătite (dacă sunt).
4. Comenzi: filtrează „Unfulfilled” și „Unpaid”; raportează câte sunt (numere de comandă), nu le modifica.
5. Comenzi → Export → All orders → CSV for Excel; Clienți → Export → All customers → CSV. Descarcă fișierele (cere-mi acordul la descărcare) și spune-mi unde sunt.
6. Magazin online → Preferințe → „Restrict access to visitors with the password”: bifează, parola [PAROLA ALEASĂ DE MINE], mesaj: „Magazin închis. Pentru comenzi B2B: contact@primesupplements.ro, 0775 286 584.” Salvează. În aceeași pagină, dacă există, scoate codurile Google Analytics / Facebook Pixel.
7. Setări → Aplicații și canale de vânzare: listează toate aplicațiile instalate și dezinstalează-le pe toate (confirmă fiecare dezinstalare). Raportează lista.
8. Setări → Domenii: dacă b2b.primesupplements.ro e în listă, apasă pe el → Remove domain → confirmă. Rămâne doar kuqr0h-en.myshopify.com. Raportează.
9. Setări → Canale de vânzare: dacă e conectat Google & YouTube sau alt canal, deconectează-l (confirmă).
10. Verificare finală într-un tab privat: https://b2b.primesupplements.ro/products/creatina-creapure și https://kuqr0h-en.myshopify.com/products.json – ambele trebuie să ducă la pagina de parolă (sau să nu mai răspundă dacă am șters CNAME-ul). Raportează codul/rezultatul.
11. Apoi deschide https://search.google.com/search-console (contul contact@primesupplements.ro): în lista de proprietăți, spune-mi dacă există una pentru b2b.primesupplements.ro. Nu cere eliminări (Removals) și nu șterge proprietatea; doar raportează.

Raport final: starea înainte/după la fiecare pas, fără să scrii parola.
```
