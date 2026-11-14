# Trecerea de la UpPromote la Prime Afiliați – 1 decembrie 2026

> **ACTUALIZARE 15.11.2026: trecerea s-a făcut pe 15.11, la cererea lui Marius.**
> - Data de pornire e 3.11.
> - Aplicația e live.
> - Rutina de pe 29.11 a fost oprită.
> - Anunțul este `sabloane/afiliati-anunt-platforma-noua.html`, varianta din 15.11.
> - Detaliile sunt în JURNAL.md, 15.11. Planul de mai jos rămâne doar ca istoric.

Marius a aprobat aplicația pe 14.11 („arată bine aplicația, sunt mulțumit”). Anunțul pleacă singur pe 29.11 (`ANUNT-PLATFORMA-NOUA-2026-12-01.md`). Până pe 1.12 trebuie să fie adevărat tot ce promite anunțul:
- codul rămâne;
- linkul vechi din bio merge;
- comisionul din noiembrie rămâne al afiliatului;
- intrarea se face cu e-mailul de afiliat.

## Stare la 14.11 (noaptea) – ce e gata și ce mai așteaptă
| # | Stare |
|---|---|
| 1 | ⏳ **Așteaptă exportul de la Marius** (textul pentru extensie e mai jos, la „Cererea exportului”). |
| 2 | ✅ parțial: din lista „Prime – Afiliați” (Google Sheet) **73 de afiliați** au acum în aplicație numele, e-mailul (pentru logare și blocarea auto-comenzilor) și comisionul (10%), legați de codurile preluate (73/73 potriviri). Toți cei 107 au link `?ref=<cod>`. Codul `WELCOME5` (al magazinului, preluat greșit ca „afiliat”) e oprit, cu cele 8 comenzi respinse. Rămân din export: tipul PF/PFA/SRL, ID-ul UpPromote și cei 34 de coduri fără rând în listă (unele nu sunt afiliați: `PRIME1`, `PrimeVIP`, `BF10`, `spring10`, `chera10`, `Marius10`… – de confirmat). Datele personale sunt doar în D1. |
| 3 | ✅ **Scriptul e făcut și testat pe site** în tema nepublicată **„Prime – link afiliați Prime Afiliați (14.11)”** (copie exactă a temei live + `snippets/prime-afiliati-ref.liquid` și o linie în `layout/theme.liquid`): `?ref=` și linkurile vechi `?sca_ref=<id>.<…>` → cookie `prime_ref` (30 de zile) + atributul ascuns de coș `_prime_ref` + un clic în aplicație. Previzualizare: https://primesupplements.ro/?preview_theme_id=194306834807. **Decizia lui Marius (14.11): se publică după Late Black Friday** („așteptăm să terminăm cu Black Friday”). Pe **28.11** Claude reface copia din tema live de atunci (cele 2 fișiere, verificate cu MD5) și o testează; Marius o publică pe 28–30.11. Până atunci linkurile merg prin UpPromote, ca acum. Linkurile vechi se leagă de afiliat după ID-ul UpPromote din export (clicurile primite până atunci se leagă singure la import). Fișierele: `theme-fixes/afiliati-link-2026-11-14/`. |
| 4 | ⏳ Marius (contabilul). |
| 5 | ✅ **Data de pornire 1.12.2026 setată în aplicație** (Setări → „Trecerea de la UpPromote”): 654 de comenzi de dinainte apar „În soldul UpPromote” și nu mai sunt „de plătit”. **„Sold preluat din UpPromote”** se completează în fișa fiecărui afiliat (aprobat + în așteptare); partea în așteptare se aprobă singură la 14 zile după 1.12; după ce intră într-o plată nu se mai poate schimba. Testat local (plata aprobată o singură dată, modificarea după plată refuzată). |
| 6 | ⏳ **Formularul v2 se completează în Dev Dashboard când Marius e gata să apese Release** (Dev Dashboard nu păstrează ciorne, iar tab-ul s-a închis de două ori): nume `v2-portal-afiliati`, scopes `read_orders,read_products,read_discounts,read_customers`, App proxy `apps` / `afiliati` → `https://prime-afiliati.prime-expediere.workers.dev/proxy`. Marius apasă **Release**, apoi aprobă permisiunea în Shopify. Dev Dashboard nu păstrează ciorne: dacă tab-ul se închide, se completează din nou cu valorile de aici. `v3` = aceleași valori + `write_discounts` (după testul din pasul 7). |
| 7 | ⏳ după pasul 6. |
| 8 | ✅ textul e gata: `POLITICA-COOKIES-PRIME-AFILIATI-2026-11-14.md` → aprobă Marius. |
| 9 | ✅ rutina lunară `trig_01Bhur1tumHTnu32bfqgYSwg` nu mai pomenește UpPromote (și nu-l pomenește în e-mailuri); raportul din 2.12 are cardul „Deschide panoul tău” spre `/apps/afiliati` (`sabloane/afiliati-raport-lunar.html`). |

### Cererea exportului (text pentru extensia Chrome)
```
Deschide în Chrome adminul Shopify al magazinului primesupplements1, aplicația UpPromote (Apps → UpPromote). Doar citire și export, nu schimba nimic.
1. Affiliates → selectează toate → Export (CSV). Vreau coloanele: ID, prenume, nume, e-mail, cod de cupon, program, comision %, metodă de plată, link de afiliat, stare.
2. Payments → Unpaid (sau „Pending payment”) → Export: soldul neplătit al fiecărui afiliat (aprobat și în așteptare).
3. Payments → Paid / History → Export: plățile făcute (data, suma, afiliatul, metoda).
4. Settings → General: notează valoarea „Cookie” (câte zile) și dacă comisionul se calculează cu sau fără taxe/TVA.
Salvează fișierele CSV în Descărcări și spune-mi numele lor. Nu le trimite nicăieri și nu lipi datele personale în chat.
```

## Săptămâna 1 (14–21.11): datele
| # | Ce | Cine | De ce |
|---|---|---|---|
| 1 | **Exportul din UpPromote:** lista afiliaților (nume, e-mail, cod, comision %, tip de plată), soldurile neplătite, istoricul plăților și linkurile de afiliat. Din Affiliates → Export și Payments → Export, sau cu extensia. | Marius | Fără e-mailuri afiliații nu pot intra în panou; fără solduri nu știm ce e deja plătit. |
| 2 | **Importul în aplicație:** e-mailul, prenumele, tipul PF/PFA/SRL, comisionul fiecăruia, ID-ul UpPromote. Ca a doua sursă, lista „Prime – Afiliați” din Google Sheet. | Claude | Logarea cu e-mail + comisioanele reale (azi e 10% implicit). |
| 3 | **Scriptul de link din temă:** `?ref=` → atribuirea; recunoaște și linkurile vechi UpPromote și le leagă de același afiliat; clicurile ajung în Analiză. | Claude face, Marius publică tema | „Linkul din bio merge în continuare”. |
| 4 | Contabilul: comisionul se calculează cu sau fără TVA (bifa din Setări) | Marius | Baza corectă de calcul. |

## Săptămâna 2 (22–28.11): deschiderea portalului (în test)
| # | Ce | Cine |
|---|---|---|
| 5 | **„Data de pornire” 1.12 în aplicație:** comisioanele de dinainte se socotesc ale UpPromote (nu apar „de plătit” a doua oară). Soldul neplătit din UpPromote al fiecărui afiliat intră ca „Sold preluat din UpPromote”. | Claude |
| 6 | **Release `v2-portal-afiliati`** (App Proxy + `read_customers`) și aprobarea permisiunii; apoi o versiune `v3` cu `write_discounts`, ca afiliații să-și poată genera voucherele. | Marius (2 clicuri pe fiecare) |
| 7 | **Test cu afiliați de test:** Marius și Adelina, fiecare cu e-mailul lui. Intră pe `/apps/afiliati`, verifică panoul și fac un test de voucher. | Marius, Adelina, Claude |
| 8 | **Politica de cookie-uri:** secțiunea „UpPromote” devine „Prime Afiliați” (același text, aprobat pe 23.10). | Claude scrie, Marius aprobă |
| 9 | **Rutina lunară de e-mailuri** (zilele 2–4): textul nu mai pomenește UpPromote, iar raportul din decembrie trimite la panoul nou. | Claude |

## Zilele de trecere
| Când | Ce | Cine |
|---|---|---|
| **sâmbătă 29.11, 10:00** | Pleacă e-mailul către toți afiliații (automat); primești rezumatul și postezi mesajul în grupul de WhatsApp. | rutina, Marius |
| **duminică 30.11, seara** | Ultima sincronizare și ultimul export al soldurilor din UpPromote (fotografia finală). UpPromote rămâne instalat. | Claude, Marius |
| **luni 1.12, dimineața** | Aplicația trece din „mod umbră” în live (cu „da”-ul tău); pozele lunii se generează la 06:00; memento în grup; urmărim primele logări și răspundem la întrebări. | Claude, Marius |
| **1–10.12** | Cele două aplicații merg în paralel (UpPromote doar pentru verificare). Comparăm cifrele din noiembrie. | Claude |
| **înainte de 11.12** | Anularea abonamentului UpPromote (factura vine pe 11). Înainte salvăm lista tuturor codurilor; o avem deja în aplicație și o verificăm. Abia apoi dezinstalare și scoaterea scripturilor UpPromote din temă. | Marius (dezinstalarea), Claude (verificarea) |

## Ce poate merge prost și ce facem
- **Un afiliat nu poate intra:** e-mailul lui din aplicație e altul decât cel cu care intră. Angajatul îl corectează în fișa afiliatului.
- **Linkul vechi nu e recunoscut:** codul de reducere merge oricum, deci comanda tot se atribuie dacă clientul folosește codul.
- **UpPromote șterge codurile la dezinstalare:** le recreăm din aplicație (avem lista completă). De aceea dezinstalăm abia după verificare.
