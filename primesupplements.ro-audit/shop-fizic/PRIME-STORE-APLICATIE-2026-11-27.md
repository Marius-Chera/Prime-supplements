# Prime Store – aplicația magazinului fizic (27.11.2026)

**Adresa:** https://prime-store.prime-expediere.workers.dev (Cloudflare, contul Prime; **separată de Shopify**, cum a cerut Marius).
**Cod:** repo local `D:\Proiecte Claude\Prime Supplements\prime-store` (git local, fără GitHub deocamdată). Baza: D1 `prime-store`; documente: R2 `prime-store-docs`.
**Cheile** (SETUP_TOKEN pentru primul cont, SYNC_TOKEN pentru Oblio) sunt doar în `prime-store/CHEI.local.txt` (ignorat de git) și ca secrete Cloudflare.

## Ce a cerut Marius (27.11)
- Profitul exact al magazinului fizic (gestiunea Oblio **SHOP - PRIME SUPPLEMENTS**, id 229951).
- Loc pentru facturi și bonuri: toate cheltuielile magazinului, inclusiv salariul angajatei, calculate exact.
- Închiderea de zi preluată automat din Oblio; „poți lua de la Oblio din încasări tot ce s-a emis prin bon fiscal”.
- Stoc cu notificare: produsele vândute în ultimele 60 de zile care nu mai au stoc deloc + ce trebuie comandat.
- Notificare când un produs expiră; data de expirare se trece de mână; „un tabel cu toate produsele și să preia termenele de expirare” (tab-ul TERMENE DE EXPIRARE SHOP).
- Integrarea tabelului completat zilnic de angajată (tab-ul MAGAZIN SHOP: Z, încasări, nr. clienți, cash în plic/seif, decontări cu justificare; decontări cu factură, bon, poză sau doar explicație, de ex. oamenii plătiți la descărcat marfă).
- Raportul lunar (tab-ul „Raport lunar SHOP si ONLINE”): media de vânzări și statisticile exacte pe luni.
- Aplicația nu se integrează în Shopify, stă separat pe Cloudflare.

## Ce face aplicația
| Secțiune | Cine vede | Ce face |
|---|---|---|
| **Azi** | toți | alertele + închiderea zilei (vânzător, clienți, total Z, din care card/numerar, cash în plic, informări, zi de eveniment) + plățile din casă cu poză/PDF sau explicație obligatorie „fără document”; verificarea casei: numerar − plăți − plic = 0 |
| **Registru zilnic** | toți | tabelul lunii, ca în foaie, cu bonurile din Oblio alături de Z (diferențele apar cu roșu) |
| **Cheltuieli** | proprietari | facturi/bonuri urcate (R2), categorie, furnizor, TVA deductibil, plătit din; **costuri lunare fixe** (salariu cu taxele angajatorului, chirie, utilități) care intră singure în fiecare lună |
| **Profit** | proprietari | vânzări fără TVA − costul de achiziție al mărfii vândute (Oblio „Profit pe produs”) − cheltuielile magazinului ± diferențele de inventar = **profit net**; pe luni pentru tot anul; top produse și produse vândute în pierdere |
| **Raport lunar** | proprietari | zile analizate, clienți, vânzări, medie clienți/zi, medie vânzări/zi, medie lei/client, media anuală, media pe zilele săptămânii |
| **Stoc & comenzi** | toți (costul doar proprietarii) | ce trebuie comandat: stoc zero / sub stoc minim / se termină în < 14 zile, la ritmul din ultimele 60 de zile, cantitatea propusă pentru 30 de zile; tabelul tuturor produselor din gestiunea SHOP |
| **Expirări** | toți | adăugare cu căutare după nume sau cod de bare (din stocul Oblio), data „31.12.2026” sau „12.2026”, stările ca în foaie (EXPIRAT, EXPIRĂ ÎN 30 ZILE / 2 / 3 LUNI, VERIFICĂ DATA), status pe raft / scos / vândut |
| **Setări** | proprietari | conturi (nume + PIN), butonul de sincronizare Oblio |

**Conturi:** proprietar (PIN 6+ cifre) vede tot; angajat (PIN 4+ cifre) completează doar azi și ultimele 3 zile, nu vede profitul, salariile și facturile. 5 PIN-uri greșite → blocat 15 minute.

**Categoriile care NU intră în profitul magazinului** (dar se văd separat): „Cheltuială a firmei, nu a magazinului” (combustibilul/telefonul agentului Alex Trif, ședințele foto, dosarul USAMV), „Bani predați (Marius / bancă)” și „Bani de recuperat” (produse luate „de achitat”).

## De unde vin datele din Oblio
API-ul public Oblio **nu** dă bonurile fiscale (doar stocul pe gestiune). De aceea un script rulează în pagina Oblio deja logată (bookmark „Prime Store ← Oblio” din Setări sau Claude din Chrome). Scriptul doar citește, nu modifică nimic în Oblio:
- `/report/get_collect` cu tipul 3 = **Bon fiscal**: bonurile din Încasări (păstrate doar cele care descarcă din gestiunea SHOP);
- `/report/get_stocks_inventory` cu `check_daily=1`, `daily_type=2` (vânzare), `stock_type=10` (bon fiscal), `fk_gestiune_id=229951`: cantitățile vândute pe produs și bon;
- `/report/get_profit` cu `fk_gestiune_id=229951`, pe zi: vânzarea netă fără TVA, costul de achiziție și profitul pe produs;
- `/report/get_stocks_inventory` cu `only_select=0`: stocul la zi și costul unitar;
- `/report/get_inventory` cu `gestiune=229951`: diferențele de inventar (ex. INVPRS 8293 din 25.11: −49,43 lei).

Cât timp o zi nu e sincronizată, profitul ei se **estimează** din Z (÷1,18; cost cu marja medie de 39 % din analiza SHOP din 29.10) și e marcat „estimat”.

## Importat din foaia Google „PRIME” (27.11)
- **Registrul zilnic 1.08–26.11.2026:** 101 zile, 59 de plăți din casă împărțite pe categorii (după text: Alex Trif / combustibil / ședință foto → firmă; „cash manager” → bani predați; „de achitat” → de recuperat; plase, lapte, hârtie, office → consumabile etc.). Toate au documentul „fără – importat din foaia MAGAZIN SHOP”; facturile se pot atașa ulterior (+ fișier).
- **Corectură:** în foaie, 24.11 apare de două ori; al doilea rând (7 clienți, 1.309 lei) se potrivește exact cu cele 7 bonuri fiscale din Oblio din 25.11 → importat ca 25.11, iar rândul „25.11” (828 lei) ca 26.11.
- **Termene de expirare:** 41 de produse (3 „In stock”, restul „Scos din gestiune/scos de la raft”).
- **Raportul lunar ianuarie–iulie 2026** (fără registru zilnic): zile, clienți, vânzări din foaie. August–noiembrie se calculează din registru.
- **De verificat:** pentru octombrie, raportul din foaie spune 47.743,89 lei / 193 clienți, însă suma zilelor din tab-ul MAGAZIN SHOP dă **40.156,36 lei / 239 clienți** (iar rândul de total din foaie, 33.184,16 lei). După sincronizarea Oblio se vede cifra reală din bonuri.

## Ce mai trebuie (de la Marius)
1. **Primul cont:** pe adresa aplicației, „Cheia de instalare” = SETUP_TOKEN din `prime-store/CHEI.local.txt`, numele și un PIN de 6+ cifre. Apoi, din Setări: conturile pentru Adelina (proprietar), Claudia și Ștefan (angajați).
2. **Costurile fixe:** salariul angajatei (costul total al angajatorului), chiria spațiului din Str. Rahovei 45A, utilitățile, internetul, contabilitatea (Cheltuieli → Costuri lunare fixe), cu luna de început.
3. **Sincronizarea Oblio:** în Oblio logat, butonul „Prime Store ← Oblio”; prima dată cere cheia SYNC_TOKEN din același fișier (Marius o lipește, Claude nu o scrie în pagini). Prima rulare aduce tot anul 2026 (1.01 → azi; durează câteva minute).
4. **Angajata:** din ziua stabilită de Marius, completează în aplicație în loc de foaia Google (de pe telefon sau de pe PC-ul din magazin; se poate pune pe ecranul telefonului ca aplicație).
5. De verificat categoriile puse automat la import (ex. „rafturi depozit”, „băieți depozit”: magazin sau depozitul online?).

## Completare 27.11 (după prima sincronizare)
- Marius: **„era altă casă de marcat primele luni din an”**. În ianuarie–februarie, Oblio are doar o parte din bonuri (ex. 5.01: 2 bonuri, 343,50 lei). Regula din aplicație: când bonurile Oblio acoperă sub 90 % din Z (în zilele sincronizate sau din totalul lunii din raportul vechi), vânzarea se ia din Z, iar costul mărfii cu **marja reală din bonurile Oblio** ale lunii; luna apare „Oblio X % din Z” la Profit.
- Cheia de sincronizare se lipește acum într-un panou din pagina Oblio (căsuța „prompt” era închisă automat cât Claude lucra în tab). Prima sincronizare (1.01 → 27.11) pornită pe 27.11; durează ~1 oră, tab-ul Oblio rămâne deschis.
