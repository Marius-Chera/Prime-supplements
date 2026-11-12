# Creatină SEO – comparație săptămâna 02–08.11.2026 (a treia săptămână „după”)

Rulat joi, 12.11.2026. „Înainte” = `baseline.json`, **8 săptămâni (17.08–11.10.2026)**, cu intervalul min–max. Unde scrie „12 săpt.”, cifra vine din perioada tabloului de bord live (20.07–11.10.2026). Săptămâna 05–11.10 nu e folosită ca reper.

Date: Shopify Analytics (ShopifyQL), toate cele 14 interogări din runbook (Q1–Q11, Q2b, Q7b), `SINCE 2026-10-12 UNTIL 2026-11-08`. Brut: `raw/rezultate_shopifyql.json`. Calcul: `../../scripts/week_compare.py` (script nou, în repo; cele vechi erau într-un folder temporar și s-au pierdut).

Verificări de consistență: toate trec (Q6 = Q10, Q2 ≤ Q1, Q2b = Q2, Q7b = Q7, în toate cele 4 săptămâni). Controlul de drift pe „înainte”: 170 de comenzi, 20.463,14 lei, 621 de vizite pe cele 4 pagini, 19.747 de vizite pe magazin – identice cu `baseline.json`, deci Shopify nu a revizuit perioada. Săptămânile 12.10–01.11 au aceleași cifre ca la rularea din 05.11.

## Cifrele

| Indicator | Înainte, 8 săpt. (medie, min–max) | 12–18.10 (schimbării) | 19–25.10 | 26.10–01.11 | **02–08.11** | Media „după” (3 săpt.) | Verdict 02–08.11 |
|---|---|---|---|---|---|---|---|
| Vizite Google **fără etichetă de reclamă**, cele 4 pagini (organic, limită superioară) | 9,8 (2–16) | 6 | 9 | 4 | **18** | 10,3 | **peste maxim, prima săptămână** |
| din care Creapure® | 2,9 (0–5) | 3 | 7 | 2 | **13** | 7,3 | **peste maxim** (a mai fost peste pe 19–25.10, dar nu la rând) |
| Vizite din reclame Google Shopping (cpc), cele 4 pagini | 18,0 (7–25) | 29 | 4 | 4 | **10** | 6,0 | în interval (revenire parțială) |
| Vizite Google, cele 4 pagini (cifra veche, amestecată) | 27,8 (9–40) | 35 | 13 | 8 | **28** | 16,3 | în interval |
| Vizite Google Creapure® + micronizată (amestecat) | 20,9 (6–29) | 26 | 11 | 6 | **22** | 13,0 | în interval |
| Cota creatinei din vizitele Google ale magazinului | 3,8 % (1,2–5,4 %) | 3,4 % | 1,9 % | 1,0 % | **2,6 %** (28/1.094) | 1,8 % | în interval |
| Toate vizitele pe cele 4 pagini (orice sursă) | 77,6 (61–115) | 78 | 73 | 68 | **103** | 81,3 | în interval |
| **Comenzi cu creatină** (distincte) | 21,3 (12–27) | 24 | 22 | 25 | **41** | 29,3 | **peste maxim, prima săptămână** |
| din care din căutare | 8 (4–14) | 9 | 3 | 5 | **11** | 6,3 | în interval |
| din care fără sursă (direct, aplicații) | 12,6 (8–17) | 15 | 18 | 20 | **25** | 21,0 | peste maxim (a treia săptămână la rând) |
| din care din rețele sociale | 0–1 pe săptămână | 0 | 1 | 0 | **5** | 2,0 | neobișnuit (reel-ul din 03.11) |
| Creatină, total bucăți / lei brut | 23,8 / 2.558 (13–33 / 1.354–3.901) | 26 / 2.922 | 23 / 2.754 | 27 / 3.174 | **47 / 4.347** | 32,3 / 3.425 | peste maxim |
| Cota creatinei din comenzile magazinului | 18,7 % (13,8–26,2 %) | 13,4 % | 19,0 % | 18,9 % | **23,3 %** (41/176) | 20,4 % | în interval |
| **Creapure®**: comenzi / bucăți / lei brut | 14,5 / 15,8 / 1.932 (7–24 / 7–29 / 868–3.658) | 17 / 17 / 2.198 | 17 / 17 / 2.258 | 22 / 24 / 2.948 | **34 / 37 / 3.689** | 24,3 / 26,0 / 2.965 | **peste maxim** la toate trei (la lei, cu doar 31 de lei) |
| **Micronizată**: comenzi / bucăți / lei brut | 6 / 6,9 / 545 (3–12 / 3–13 / 243–1.053) | 6 / 7 / 542 | 5 / 5 / 405 | 3 / 3 / 226 | **7 / 8 / 509** | 5,0 / 5,3 / 380 | în interval |
| Plicuri Ready to Go (context): comenzi / bucăți / lei | 0,75 / 1,1 / 81 | 1 / 2 / 182 | 1 / 1 / 91 | 0 / 0 / 0 | **1 / 2 / 149** | 0,7 / 1,0 / 80 | în interval |
| Articole de blog despre creatină: vizite / din căutare | 19,5 / 16,8 (8–77 / 5–73) | 38 / 28 | 66 / 30 | 21 / 18 | **37 / 22** | 41,3 / 23,3 | în interval |
| Vizite Google, tot magazinul | 731,5 (596–863) | 1.043 | 693 | 836 | **1.094** | 874,3 | peste maxim |
| din care fără etichetă de reclamă | 525,5 (427–564) | 604 | 590 | 717 | **987** | 764,7 | peste maxim, a patra săptămână la rând |
| din care reclame (cpc) | 205,8 (109–312) | 438 | 102 | 114 | **107** | 107,7 | sub minim (reclamele rămân reduse) |
| Comenzi, tot magazinul | 118 (71–188) | 179 | 116 | 132 | **176** | 141,3 | în interval |

Aceleași repere pe perioada tabloului de bord (**12 săpt., 20.07–11.10**, din cele 4 interogări salvate în raportul live; acolo „căutare” = toate motoarele, iar creatina se alege după titlul produsului):

| Indicator | Înainte, 12 săpt. (medie, min–max) | 02–08.11 | Verdict |
|---|---|---|---|
| Vizite din căutare, cele 4 pagini | 29,7 (9–50) | 28 | în interval |
| Comenzi cu creatină | 21,3 (12–27) | 41 | peste maxim |
| din care din căutare | 7,8 (4–14) | 11 | în interval |
| Creapure®, comenzi | 13,8 (7–24) | 34 | peste maxim |
| Micronizată, comenzi | 6,7 (3–12) | 7 | în interval |
| Vizite din căutare, tot magazinul | 709,3 (599–868) | 1.107 | peste maxim |

## Ce înseamnă

**Prima săptămână cu semnale peste maximul „înainte”, dar încă nu un câștig confirmat.** Regula cere 2–3 săptămâni la rând peste maxim; aceasta este prima.

1. **Partea care ține de SEO:** vizitele din Google fără etichetă de reclamă pe cele 4 pagini au fost 18 (maximul „înainte” era 16), dintre care 13 pe Creapure® (maximul era 5). Suntem în săptămâna a treia după schimbare, adică în fereastra de 2–6 săptămâni în care Google preia modificările. Cifrele sunt mici (o diferență de 2 vizite față de maxim), așa că verdictul se dă abia dacă și 09–15.11 și 16–22.11 rămân peste 16.
2. **Comenzile au sărit mult, dar nu din căutare.** 41 de comenzi cu creatină (maximul era 27), însă cele din căutare sunt 11, în intervalul obișnuit (4–14). Creșterea vine din comenzi fără sursă (25) și din rețele sociale (5). Cota creatinei din comenzile magazinului (23,3 %) e în intervalul „înainte”, deci o bună parte din salt e mișcarea întregului magazin (176 de comenzi, aproape de maximul de 188).
3. **Pe tot magazinul**, vizitele din Google fără etichetă de reclamă sunt peste maximul „înainte” de patru săptămâni la rând (604, 590, 717, 987 față de maximul 564). Acesta e un câștig confirmat după regula noastră, dar e al întregului site (articolele zilnice de blog, curățenia tehnică), nu doar al paginilor de creatină.

## Factori perturbatori în săptămâna 02–08.11 (din jurnal)

- **Prețuri reduse** din 30.10, încă în vigoare pe 12.11: Creapure® 500 g 140 lei (barat 180), 300 g 90 lei (barat 115), micronizată 77 lei (barat 98), cutia de plicuri 90 lei (barat 110). E cea mai probabilă cauză a comenzilor în plus; de aceea leii au crescut mai puțin decât bucățile.
- **Reel-ul cu Prime Whey + Creatină Creapure®** publicat pe 03.11 la 20:00 (Instagram + Facebook). A doua zi, 04.11, a fost vârful săptămânii: 11 comenzi cu Creapure® într-o zi. Comenzile din rețele sociale: 5 (în „înainte”, cel mult 1 pe săptămână).
- **Reduceri aplicate la comandă** (coduri sau reduceri automate) pe creatină în toate cele 7 zile: 685 lei în total pe săptămână (coloana `discounts` din ShopifyQL); nu am verificat ce coduri.
- **Pachetele Black Friday** sunt active până la 15.11 (JURNAL.md, 09.11); nu am verificat dacă includ creatină.
- **Reclame:** Google Shopping a revenit parțial pe Creapure® (7 vizite cpc, față de 3 și 3 în săptămânile anterioare; „înainte” 6–23). Pe cele 4 pagini au mai intrat 12 vizite din reclame Facebook și 2 din newsletter (theMarketer). Campania de test ChatGPT Ads (02–15.11, are un grup Creapure®) a adus 2 vizite cu sursa chatgpt.com.
- **Stoc** (citit pe 12.11): Creapure® 500 g 30 buc., 300 g 195 buc., micronizată 216 buc. – fără rupturi. Cutia de plicuri Pink Madness e pe 0, Blue Moon 11.

## Verificarea paginilor (12.11, doar citire)

Shopify arată „actualizat” pe 11–12.11 la toate cele 3 produse și la colecție. Verificat: titlurile SEO, meta descrierile, textele alternative ale pozelor, șabloanele și datele de modificare ale tuturor câmpurilor de conținut (beneficii, ingrediente, detalii, text SEO, cuvinte de căutare, ghidul colecției) sunt neschimbate față de 15–23.10. Actualizările sunt sincronizări de stoc și preț. Textul descrierilor nu a fost recitit cuvânt cu cuvânt.

Articole noi despre creatină în ultimele 7 zile (05–12.11): niciunul. Ultimul este „Creatina pentru femei” din 03.11; pe 05.11 i s-a schimbat doar poza principală.

## Ce nu s-a rulat și ce nu se poate măsura

- Nu s-au rulat: citirea paginilor live (secțiunea 2.1–2.2 din runbook), numărarea linkurilor interne din articole (2.4) și verificarea de vizibilitate cu căutări web (3).
- Pozițiile reale din Google.ro, afișările și clicurile pe paginile de creatină cer Search Console; nu e conectat la această sarcină.
- Sursa „search” din Shopify conține și reclamele Google Shopping. Coloana „fără etichetă” le scoate pe cele etichetate cpc, dar tot nu separă clicurile organice de listările gratuite din Shopping și de reclamele fără etichete.
- Vânzările nu pot fi legate de pagina de intrare, doar de sursa comenzii.
