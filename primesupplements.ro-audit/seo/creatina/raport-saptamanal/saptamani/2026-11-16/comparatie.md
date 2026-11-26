# Creatină SEO – comparație săptămâna 16–22.11.2026 (a cincea săptămână „după”)

Rulat joi, 26.11.2026. „Înainte” = `baseline.json`, **8 săptămâni (17.08–11.10.2026)**, cu intervalul min–max. Unde scrie „12 săpt.”, cifra vine din perioada tabloului de bord live (20.07–11.10.2026). Săptămâna 05–11.10 nu e folosită ca reper.

Date: Shopify Analytics (ShopifyQL), toate cele 14 interogări din runbook (Q1–Q11, Q2b, Q7b), `SINCE 2026-10-12 UNTIL 2026-11-22`. Brut: `raw/rezultate_shopifyql.json` (construit cu `scripts/add_week.py` din `raw/randuri_noi.json`). Calcul: `python3 -I scripts/week_compare.py saptamani/2026-11-16/raw/rezultate_shopifyql.json`.

Verificări de consistență: toate trec (Q6 = Q10, Q2 ≤ Q1, Q2b = Q2, Q7b = Q7, în toate cele 6 săptămâni). Săptămânile 12.10–15.11 au revenit cu aceleași totaluri ca la rularea din 19.11, la toate interogările. Controlul de drift pe „înainte” nu s-a refăcut (se face în prima rulare din lună).

## Cifrele

| Indicator | Înainte, 8 săpt. (medie, min–max) | 19–25.10 | 26.10–01.11 | 02–08.11 | 09–15.11 | **16–22.11** | Media „după” (5 săpt.) | Verdict 16–22.11 |
|---|---|---|---|---|---|---|---|---|
| Vizite Google **fără etichetă de reclamă**, cele 4 pagini (organic, limită superioară) | 9,8 (2–16) | 9 | 4 | 18 | 13 | **8** | 10,4 | în interval |
| din care Creapure® | 2,9 (0–5) | 7 | 2 | 13 | 5 | **4** | 6,2 | în interval |
| Vizite din reclame Google Shopping (cpc), cele 4 pagini | 18,0 (7–25) | 4 | 4 | 10 | 7 | **10** | 7,0 | în interval |
| Vizite Google, cele 4 pagini (cifra veche, amestecată) | 27,8 (9–40) | 13 | 8 | 28 | 20 | **18** | 17,4 | în interval |
| Vizite Google Creapure® + micronizată (amestecat) | 20,9 (6–29) | 11 | 6 | 22 | 17 | **16** | 14,4 | în interval |
| Cota creatinei din vizitele Google ale magazinului | 3,8 % (1,2–5,4 %) | 1,9 % | 1,0 % | 2,6 % | 2,4 % | **2,9 %** (18/618) | 2,1 % | în interval |
| Toate vizitele pe cele 4 pagini (orice sursă) | 77,6 (61–115) | 73 | 68 | 103 | 70 | **62** | 75,2 | în interval (aproape de minim) |
| **Comenzi cu creatină** (distincte) | 21,3 (12–27) | 22 | 25 | 41 | 34 | **23** | 29,0 | în interval (seria peste maxim s-a oprit la 2 săptămâni) |
| din care din căutare | 8 (4–14) | 3 | 5 | 11 | 7 | **8** | 6,8 | în interval |
| din care fără sursă (direct, aplicații) | 12,6 (8–17) | 18 | 20 | 25 | 26 | **15** | 20,8 | în interval |
| din care din rețele sociale | 0–1 pe săptămână | 1 | 0 | 5 | 1 | **0** | 1,4 | normal |
| Creatină, total bucăți / lei brut | 23,8 / 2.558 (13–33 / 1.354–3.901) | 23 / 2.754 | 27 / 3.174 | 47 / 4.347 | 34 / 2.980 | **23 / 2.503** | 30,8 / 3.151 | în interval |
| Cota creatinei din comenzile magazinului | 18,7 % (13,8–26,2 %) | 19,0 % | 18,9 % | 23,3 % | 19,8 % | **23,7 %** (23/97) | 20,9 % | în interval |
| **Creapure®**: comenzi / bucăți / lei brut | 14,5 / 15,8 / 1.932 (7–24 / 7–29 / 868–3.658) | 17 / 17 / 2.258 | 22 / 24 / 2.948 | 34 / 37 / 3.689 | 26 / 26 / 2.471 | **18 / 18 / 2.098** | 23,4 / 24,4 / 2.693 | în interval |
| **Micronizată**: comenzi / bucăți / lei brut | 6 / 6,9 / 545 (3–12 / 3–13 / 243–1.053) | 5 / 5 / 405 | 3 / 3 / 226 | 7 / 8 / 509 | 8 / 8 / 509 | **5 / 5 / 405** | 5,6 / 5,8 / 411 | în interval |
| Plicuri Ready to Go (context): comenzi / bucăți / lei | 0,75 / 1,1 / 81 | 1 / 1 / 91 | 0 / 0 / 0 | 1 / 2 / 149 | 0 / 0 / 0 | **0 / 0 / 0** | 0,4 / 0,6 / 48 | în interval |
| Articole de blog despre creatină: vizite / din căutare | 19,5 / 16,8 (8–77 / 5–73) | 66 / 30 | 21 / 18 | 37 / 22 | 35 / 27 | **19 / 12** | 35,6 / 21,8 | în interval |
| Vizite Google, tot magazinul | 731,5 (596–863) | 693 | 836 | 1.094 | 841 | **618** | 816,4 | în interval (aproape de minim) |
| din care fără etichetă de reclamă | 525,5 (427–564) | 590 | 717 | 987 | 733 | **540** | 713,4 | în interval (după 5 săptămâni peste maxim) |
| din care reclame (cpc) | 205,8 (109–312) | 102 | 114 | 107 | 106 | **76** | 101,0 | sub minim |
| Toate vizitele, tot magazinul | 2.468 (1.970–3.332) | 2.985 | 3.427 | 3.715 | 2.763 | **2.028** | 2.984 | în interval (aproape de minim) |
| Comenzi, tot magazinul | 118 (71–188) | 116 | 132 | 176 | 172 | **97** | 138,6 | în interval |

Micronizata și colecția au 0–1 vizite pe zi, deci se urmăresc pe 4 săptămâni (Google fără etichetă de reclamă, 26.10–22.11): micronizată 9 (0, 2, 5, 2), colecție 7 (0, 2, 3, 2). Runbook-ul nu are aceste cifre pe pagină pentru perioada „înainte”, așa că nu le dau verdict.

Aceleași repere pe perioada tabloului de bord (**12 săpt., 20.07–11.10**, din cele 4 interogări salvate în raportul live, rulate pe 26.11 fără eroare; acolo „căutare” = toate motoarele, iar creatina se alege după titlul produsului):

| Indicator | Înainte, 12 săpt. (medie, min–max) | 16–22.11 | Verdict |
|---|---|---|---|
| Vizite din căutare, cele 4 pagini | 29,7 (9–50) | 18 | în interval |
| Comenzi cu creatină | 21,3 (12–27) | 23 | în interval |
| din care din căutare | 7,8 (4–14) | 8 | în interval |
| Creapure®, comenzi | 13,8 (7–24) | 18 | în interval |
| Micronizată, comenzi | 6,7 (3–12) | 5 | în interval |
| Vizite din căutare, tot magazinul | 709,3 (599–868) | 622 | în interval |

## Ce înseamnă

**Încă nicio schimbare confirmată din SEO pe paginile de creatină.** Toți indicatorii sunt în intervalul „înainte”.

1. **Partea care ține de SEO:** vizitele din Google fără etichetă de reclamă pe cele 4 pagini au fost 8 (interval 2–16). În cinci săptămâni „după”, o singură săptămână a depășit maximul (18, în 02–08.11), deci regula de 2–3 săptămâni la rând nu e îndeplinită. Media „după” (10,4) e practic egală cu media „înainte” (9,8). A fost a cincea săptămână din fereastra de 2–6 săptămâni în care Google preia schimbările.
2. **Comenzile cu creatină au revenit în interval (23) exact când prețurile au revenit la normal.** Cele două săptămâni peste maxim (41 și 34) au fost amândouă la prețuri reduse, deci creșterea de atunci a venit din promoție, nu din SEO. Comenzile din căutare (8) sunt la media „înainte”.
3. **Tot magazinul a avut o săptămână slabă:** 97 de comenzi și 2.028 de vizite, aproape de minimul „înainte”. Creatina a scăzut mai puțin decât restul: cota ei din comenzi a fost 23,7 % (medie „înainte” 18,7 %, în interval), iar cota din vizitele Google 2,9 %.
4. **Vizitele din Google fără etichetă de reclamă pe tot magazinul** au coborât la 540, sub maximul „înainte” (564), după cinci săptămâni peste. Câștigul pe tot site-ul trebuie urmărit în continuare; o săptămână nu schimbă concluzia.
5. **Blogul:** articolele despre creatină au adus 12 vizite din căutare (27 în săptămâna anterioară), în interval. „Ce este creatina”, care avusese 13 vizite din căutare în 09–15.11, nu mai apare în 16–22.11.

## Factori perturbatori în 16–22.11 (din jurnal)

- **Prețuri normale din 16.11** (Creapure® 500 g 180 lei, 300 g 115 lei, micronizată 98 lei), după 17 zile de prețuri reduse. E prima săptămână „după” comparabilă ca preț cu perioada „înainte”.
- **Reduceri la comandă** pe Creapure® și micronizată: 196 lei în total pe săptămână (coloana `discounts`); n-am verificat ce coduri au fost.
- **Retururi sau anulări:** la Creapure® s-au comandat 18 bucăți, dar vânzarea netă e de 15 bucăți.
- **Reclame:** campania Meta „[NOU] 3 Creatina Creapure – public nou” (24 lei/zi) rulează din 19.11; vizitele din rețele sociale pe pagina Creapure® au fost 17 (11 în săptămâna anterioară), cu 0 comenzi din rețele sociale. Google Shopping a rămas redus (76 de vizite cpc pe tot magazinul; 8 pe Creapure®).
- **Stoc:** Creapure® 500 g are 6 bucăți pe 26.11 (11 pe 19.11, 30 pe 12.11). Dacă se termină, vânzările scad din alt motiv decât SEO. Cutia de plicuri Pink Madness e pe 0, Blue Moon are 2.

## Ce s-a schimbat pe paginile de creatină în ultimele 7 zile (19–26.11)

- **Conținut:** nimic. Titlurile SEO, meta descrierile, textele alternative și câmpurile de conținut ale celor 3 produse și ale colecției sunt neschimbate (Admin API, 26.11). „Actualizat 25–26.11” în Shopify vine din sincronizări de stoc și din recenzii.
- **Tema, 24.11:** a fost publicată tema „Prime – schema articole + FAQ (24.11)”. Pagina Creapure® are acum date structurate FAQPage, iar articolele au BreadcrumbList și FAQPage (din JURNAL.md; nu am recitit pagina live).
- **Articole:** niciun articol despre creatină publicat sau modificat în 19–26.11. Pentru 27.11 e programat „Gainer cu creatină și glutamină: ce aduc ingredientele adăugate” (eticheta Gainer).
- **În git:** pe `seo/creatina/` și `backups/seo-creatina-*` există doar commitul raportului din 19.11.
- **După săptămâna măsurată:** Late Black Friday, codul LATEBF20 (20 %, 25–28.11), cu e-mail, SMS și postări. Va afecta comenzile din 23–29.11.
- **Din JURNAL.md (Search Console, prin aplicația Prime Vizibilitate, 23–25.11):** poziția medie pentru „creatina” a slăbit de la 14,5 la 21 (53 de afișări); „creatina creapure” e pe 17,1. Cifrele nu sunt citite de acest raport. Textele de produs și de colecție sunt programate după 1.12 în `seo/PLAN-DUPA-BLACK-FRIDAY-2026.md`.

## Ce nu s-a rulat și ce nu se poate măsura

- Nu s-au rulat: citirea paginilor live (secțiunile 2.1–2.2 din runbook), numărarea linkurilor interne din articole (2.4) și verificarea de vizibilitate cu căutări web (3).
- Pozițiile reale din Google.ro, afișările și clicurile pe paginile de creatină cer Search Console, care nu e conectat la această sarcină.
- Sursa „search” din Shopify conține și reclamele Google Shopping. Coloana „fără etichetă” le scoate pe cele etichetate cpc, dar nu separă clicurile organice de listările gratuite din Shopping și de reclamele fără etichete.
- Vânzările nu pot fi legate de pagina de intrare, doar de sursa comenzii.
