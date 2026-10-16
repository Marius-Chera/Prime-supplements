# Sincronizare abonati Shopify -> theMarketer (15.10.2026)

Doar cifre, fara adrese. Detaliile per contact sunt in folderul private/ (chmod 700).

## Rezultat

| | Inainte | Dupa |
|---|---|---|
| Abonati email (theMarketer) | 1.276 | 1.304 (+26 din sincronizare, +2 inscrieri organice in timpul rularii) |
| Tag `sync-shopify-2026-10` | 0 | 23 |
| Tag `reactivare-2026-10` | 0 | 3 (doar testul din etapa 0) |
| Tag `shopify-fara-nume-fara-comenzi` | 0 | 2 |

## Etape

| Etapa | Randuri trimise | Create | Actualizate | Lasate neatinse (existau deja) | Invalide | Blacklist |
|---|---|---|---|---|---|---|
| 0 - test reabonare (G_REACT) | 3 | 0 | 3 | - | 0 | 0 |
| 1 - G_REST (update_existing=false) | 1.277 | 13 | - | 1.239 | 0 | 25 |
| 2 - G_NOTSUB (update_existing=true) | 11 | 0 | 10 | - | 0 | 1 |
| 3 - G_REACT restul | **neexecutata** (801 pregatite) | | | | | |

- Etapa 0: cele 3 contacte sunt abonate la email, cu tag exact `reactivare-2026-10`, numele pastrate.
- Welcome series 2: **nu a pornit** pentru contactele reabonate si nici pentru cele 13 create prin import (verificat la +5 si +35 minute).

## Ce am scos inainte de import (protectie livrabilitate si consimtamant)

| Motiv | G_REST | G_NOTSUB | G_REACT |
|---|---|---|---|
| Semnalate de verificarea de calitate (sintaxa, domenii temporare, greseli de domeniu) | 9 | 2 | 20 |
| Adresa pe domeniul propriu primesupplements.ro | 1 | 0 | 1 |
| Inscrieri suspecte de tip bot (fara nume, fara comenzi, domenii straine sau blocul din 17.06.2025 15:24-15:27 la migrarea din WooCommerce) | 332 | 0 | 612 |
| Domenii scrise gresit (ex. gamail, uahoo, icolud) sau adrese de test | 6 | 0 | 5 |
| Dezabonati de bunavoie (au apasat dezabonare) | 0 | 0 | 0 |

Cele 20 de contacte `inactivi` care s-au dezabonat singure nu apar in niciun fisier. Celelalte contacte `inactivi` verificate (9 din G_REACT) au fost scoase administrativ la curatarea din 13.07, nu de ei.

## Probleme gasite

1. **Importul cu subscribe=true aboneaza si la SMS** orice contact care are telefon. In etapa 2 au primit abonare SMS 8 contacte fara acord SMS, iar abonarea SMS a fost anulata imediat (emailul ramane activ). Etapa 3 ar face la fel pentru contactele reactivate care au telefon, asa ca are nevoie de o regula: pastram doar acordurile SMS existente si anulam SMS-ul pus de import.
2. **Etapa 3 a fost oprita**: o citire necesara pentru planul de SMS a fost refuzata de sistemul de permisiuni. Cele 801 randuri sunt pregatite (651 cu nume sau cumparatori, 150 fara nume si fara comenzi).
3. **G_REST nu e complet sincronizat**: 1.239 de randuri existau deja si au ramas cum erau. Dintr-un esantion de 10, 2 sunt inca dezabonate cu tag `inactivi` (lipseau din exportul partial). Estimare: circa 250-420 de abonati Shopify raman dezabonati in theMarketer din acest motiv.
4. G_REACT este lista scoasa la curatarea din 13.07 (contacte care nu deschideau). Recomandare: un singur email de reactivare, intai catre cumparatori, apoi scoatere automata a celor care nu deschid in 30-45 de zile.
