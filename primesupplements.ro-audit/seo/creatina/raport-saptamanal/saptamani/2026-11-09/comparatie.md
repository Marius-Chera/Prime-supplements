# Creatină SEO – comparație săptămâna 09–15.11.2026 (a patra săptămână „după”)

Rulat joi, 19.11.2026. „Înainte” = `baseline.json`, **8 săptămâni (17.08–11.10.2026)**, cu intervalul min–max. Unde scrie „12 săpt.”, cifra vine din perioada tabloului de bord live (20.07–11.10.2026). Săptămâna 05–11.10 nu e folosită ca reper.

Date: Shopify Analytics (ShopifyQL), toate cele 14 interogări din runbook (Q1–Q11, Q2b, Q7b), `SINCE 2026-10-12 UNTIL 2026-11-15`. Brut: `raw/rezultate_shopifyql.json`. Calcul: `python3 -I scripts/week_compare.py saptamani/2026-11-09/raw/rezultate_shopifyql.json`.

Verificări de consistență: toate trec (Q6 = Q10, Q2 ≤ Q1, Q2b = Q2, Q7b = Q7, în toate cele 5 săptămâni). Săptămânile 12.10–08.11 au revenit identice cu rularea din 12.11 (totalurile tuturor interogărilor se potrivesc). Controlul de drift pe „înainte” nu s-a refăcut (se face în prima rulare din lună; pe 12.11 a ieșit identic).

## Cifrele

| Indicator | Înainte, 8 săpt. (medie, min–max) | 19–25.10 | 26.10–01.11 | 02–08.11 | **09–15.11** | Media „după” (4 săpt.) | Verdict 09–15.11 |
|---|---|---|---|---|---|---|---|
| Vizite Google **fără etichetă de reclamă**, cele 4 pagini (organic, limită superioară) | 9,8 (2–16) | 9 | 4 | 18 | **13** | 11,0 | în interval (saltul din 02–08.11 nu s-a confirmat) |
| din care Creapure® | 2,9 (0–5) | 7 | 2 | 13 | **5** | 6,8 | în interval (egal cu maximul) |
| Vizite din reclame Google Shopping (cpc), cele 4 pagini | 18,0 (7–25) | 4 | 4 | 10 | **7** | 6,3 | în interval (la minim) |
| Vizite Google, cele 4 pagini (cifra veche, amestecată) | 27,8 (9–40) | 13 | 8 | 28 | **20** | 17,3 | în interval |
| Vizite Google Creapure® + micronizată (amestecat) | 20,9 (6–29) | 11 | 6 | 22 | **17** | 14,0 | în interval |
| Cota creatinei din vizitele Google ale magazinului | 3,8 % (1,2–5,4 %) | 1,9 % | 1,0 % | 2,6 % | **2,4 %** (20/841) | 1,9 % | în interval |
| Toate vizitele pe cele 4 pagini (orice sursă) | 77,6 (61–115) | 73 | 68 | 103 | **70** | 78,5 | în interval |
| **Comenzi cu creatină** (distincte) | 21,3 (12–27) | 22 | 25 | 41 | **34** | 30,5 | **peste maxim, a doua săptămână la rând** |
| din care din căutare | 8 (4–14) | 3 | 5 | 11 | **7** | 6,5 | în interval |
| din care fără sursă (direct, aplicații) | 12,6 (8–17) | 18 | 20 | 25 | **26** | 22,3 | peste maxim, a patra săptămână la rând |
| din care din rețele sociale | 0–1 pe săptămână | 1 | 0 | 5 | **1** | 1,8 | normal |
| Creatină, total bucăți / lei brut | 23,8 / 2.558 (13–33 / 1.354–3.901) | 23 / 2.754 | 27 / 3.174 | 47 / 4.347 | **34 / 2.980** | 32,8 / 3.314 | bucăți peste maxim (cu 1), lei în interval |
| Cota creatinei din comenzile magazinului | 18,7 % (13,8–26,2 %) | 19,0 % | 18,9 % | 23,3 % | **19,8 %** (34/172) | 20,2 % | în interval |
| **Creapure®**: comenzi / bucăți / lei brut | 14,5 / 15,8 / 1.932 (7–24 / 7–29 / 868–3.658) | 17 / 17 / 2.258 | 22 / 24 / 2.948 | 34 / 37 / 3.689 | **26 / 26 / 2.471** | 24,8 / 26,0 / 2.842 | comenzi peste maxim (a doua săptămână la rând); bucăți și lei în interval |
| **Micronizată**: comenzi / bucăți / lei brut | 6 / 6,9 / 545 (3–12 / 3–13 / 243–1.053) | 5 / 5 / 405 | 3 / 3 / 226 | 7 / 8 / 509 | **8 / 8 / 509** | 5,8 / 6,0 / 412 | în interval |
| Plicuri Ready to Go (context): comenzi / bucăți / lei | 0,75 / 1,1 / 81 | 1 / 1 / 91 | 0 / 0 / 0 | 1 / 2 / 149 | **0 / 0 / 0** | 0,5 / 0,8 / 60 | în interval |
| Articole de blog despre creatină: vizite / din căutare | 19,5 / 16,8 (8–77 / 5–73) | 66 / 30 | 21 / 18 | 37 / 22 | **35 / 27** | 39,8 / 24,3 | în interval |
| Vizite Google, tot magazinul | 731,5 (596–863) | 693 | 836 | 1.094 | **841** | 866,0 | în interval |
| din care fără etichetă de reclamă | 525,5 (427–564) | 590 | 717 | 987 | **733** | 756,8 | peste maxim, a cincea săptămână la rând |
| din care reclame (cpc) | 205,8 (109–312) | 102 | 114 | 107 | **106** | 107,3 | sub minim (reclamele Shopping rămân reduse) |
| Comenzi, tot magazinul | 118 (71–188) | 116 | 132 | 176 | **172** | 149,0 | în interval |

Micronizata și colecția au 0–1 vizite pe zi, deci se urmăresc pe 4 săptămâni (Google fără etichetă de reclamă, 19.10–15.11): micronizată 7 (0, 0, 2, 5), colecție 7 (2, 0, 2, 3). Runbook-ul nu are aceste cifre pe pagină pentru perioada „înainte”, așa că nu le dau verdict; e de urmărit că micronizata a avut 5 în ultima săptămână.

Aceleași repere pe perioada tabloului de bord (**12 săpt., 20.07–11.10**, din cele 4 interogări salvate în raportul live, rulate pe 19.11 fără eroare; acolo „căutare” = toate motoarele, iar creatina se alege după titlul produsului):

| Indicator | Înainte, 12 săpt. (medie, min–max) | 09–15.11 | Verdict |
|---|---|---|---|
| Vizite din căutare, cele 4 pagini | 29,7 (9–50) | 20 | în interval |
| Comenzi cu creatină | 21,3 (12–27) | 34 | peste maxim |
| din care din căutare | 7,8 (4–14) | 7 | în interval |
| Creapure®, comenzi | 13,8 (7–24) | 26 | peste maxim |
| Micronizată, comenzi | 6,7 (3–12) | 8 | în interval |
| Vizite din căutare, tot magazinul | 709,3 (599–868) | 845 | în interval |

## Ce înseamnă

**Încă nicio schimbare confirmată din SEO pe paginile de creatină.**

1. **Partea care ține de SEO:** vizitele din Google fără etichetă de reclamă pe cele 4 pagini au fost 13, în intervalul „înainte” (2–16). Saltul la 18 din 02–08.11 a fost o singură săptămână, deci regula (2–3 săptămâni la rând peste maxim) nu e îndeplinită. Suntem în săptămâna a patra după schimbare, încă în fereastra de 2–6 săptămâni. Media celor 4 săptămâni „după” (11,0) e puțin peste media „înainte” (9,8), dar diferența e de o vizită pe săptămână.
2. **Comenzile cu creatină sunt peste maxim a doua săptămână la rând (41, apoi 34), dar nu din căutare.** Din căutare au venit 7 (interval 4–14). Creșterea vine din comenzile fără sursă (26). Toată săptămâna a fost cu prețuri reduse, iar cota creatinei din comenzile magazinului (19,8 %) e în intervalul „înainte”. Nu se poate atribui SEO-ului.
3. **Blogul:** articolul „Ce este creatina” a adus 13 vizite din căutare într-o săptămână (2 în săptămâna anterioară). Articolele despre creatină au în total 27 de vizite din căutare, în intervalul „înainte”.
4. **Pe tot magazinul**, vizitele din Google fără etichetă de reclamă sunt peste maximul „înainte” de cinci săptămâni la rând (733 față de maximul 564). Câștigul e confirmat, dar e al întregului site, nu doar al paginilor de creatină.

## Factori perturbatori în 09–15.11 (din jurnal)

- **Prețuri reduse toată săptămâna:** Creapure® 500 g 140 lei, 300 g 90 lei, micronizată 77 lei. Din vânzările pe zile se vede că reducerea s-a încheiat pe 16.11 (500 g 180 lei, 300 g 115 lei, micronizată 98 lei, cutia de plicuri 110 lei).
- **Reduceri la comandă** pe Creapure® și micronizată: 325 lei în total pe săptămână (coloana `discounts`); n-am verificat ce coduri au fost.
- **Tema nouă „Prime Coș”**, publicată pe 15.11 la 00:54: estimarea livrării, „Merge perfect cu” și banda de garanții pe toate paginile de produs. Afectează doar ultima zi a săptămânii.
- **Reclame:** Google Shopping a rămas redus (106 vizite cpc pe tot magazinul; 7 pe Creapure®). Testul ChatGPT Ads (02–15.11) a avut un grup Creapure®; din 16.11 grupurile cu suplimente sunt pe pauză. Pe Meta, din 30.10 a cheltuit doar „[CL] Supplements General”.
- **Stoc:** Creapure® 500 g a scăzut la 11 bucăți pe 19.11 (30 pe 12.11). Dacă se termină, vânzările scad din alt motiv decât SEO.

## Ce s-a schimbat pe paginile de creatină în ultimele 7 zile (12–19.11)

- **Creapure®, 16.11:** captură nouă din lista oficială creapure.com pusă ca a doua poză, iar captura veche din iunie 2025 a fost scoasă. Cele 3 linkuri spre creapure.com duc acum direct la pagina „buy here”. Titlul SEO, meta descrierea, beneficiile, ingredientele și cuvintele de căutare sunt neschimbate față de 15.10 (Admin API).
- **Micronizată și colecție:** titlul SEO, meta descrierea și câmpurile de conținut sunt neschimbate. „Actualizat 19.11” în Shopify vine din sincronizări: niciun câmp de conținut nu are o dată nouă.
- **Doar pe tema PILOT, nepublicată:** câmpurile pentru pagina vizuală, scrise pe 15.11 la Creapure® și la micronizată. Nu apar pe site.
- **Articole:** nou pe 18.11, „Creatina pentru vegetarieni și vegani: de ce contează”. Actualizat pe 16.11: „Creatina: contraindicații” (secțiunea despre ficat și o întrebare frecventă). Mai multe articole despre creatină apar actualizate în masă pe 13.11 la 13:42. Ce s-a schimbat în ele nu am verificat.
- **După săptămâna măsurată:** prețurile au revenit la normal pe 16.11, iar campania Meta „[NOU] 3 Creatina Creapure” (24 lei/zi) a pornit pe 19.11. Ambele vor afecta comenzile din 16–22.11 și din săptămânile următoare. Campania de Late Black Friday (25–27.11, codul LATEBF20) e planificată în JURNAL.md.

## Ce nu s-a rulat și ce nu se poate măsura

- Nu s-au rulat: citirea paginilor live (secțiunile 2.1–2.2 din runbook), numărarea linkurilor interne din articole (2.4) și verificarea de vizibilitate cu căutări web (3).
- Pozițiile reale din Google.ro, afișările și clicurile pe paginile de creatină cer Search Console, care nu e conectat la această sarcină. Din 16.11 el e citit de aplicația Prime Vizibilitate (JURNAL.md), dar nu și de acest raport.
- Sursa „search” din Shopify conține și reclamele Google Shopping. Coloana „fără etichetă” le scoate pe cele etichetate cpc, dar nu separă clicurile organice de listările gratuite din Shopping și de reclamele fără etichete.
- Vânzările nu pot fi legate de pagina de intrare, doar de sursa comenzii.
