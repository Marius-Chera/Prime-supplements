# Trecerea de la UpPromote la Prime Afiliați – 1 decembrie 2026

Marius a aprobat aplicația pe 14.11 („arată bine aplicația, sunt mulțumit”). Anunțul pleacă singur pe 29.11 (`ANUNT-PLATFORMA-NOUA-2026-12-01.md`). Până pe 1.12 trebuie să fie adevărat tot ce promite anunțul:
- codul rămâne;
- linkul vechi din bio merge;
- comisionul din noiembrie rămâne al afiliatului;
- intrarea se face cu e-mailul de afiliat.

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
