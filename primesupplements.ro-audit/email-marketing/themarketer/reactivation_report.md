# Reactivare abonați Shopify în theMarketer (etapa 3) – 16.10.2026

Doar cifre, fără adrese. Detaliile per contact sunt în `private/` (chmod 700): `g_react_stage3_final.json`, `g_react_stage3_ids.json`, `reactivation_log.json`, `sms_pre_inactivi_ids.txt`, `sms_fix_b1..b6_ids.txt`, `excl_stage3_extra.txt`, `tm_inact-c.tsv` (completat), `tm_inact-d.tsv`.

Aprobare: proprietarul, „Da, cu cele 2 e-mailuri”, pentru abonații Shopify scoși de curățarea `inactivi` (nu s-au dezabonat ei), fără SMS.

## 1. Lista completată înainte de import

| | Număr |
|---|---|
| Contacte `inactivi` + dezabonate, citite inițial | 1.710 din 2.203 |
| Pagini lipsă citite acum (114–147, sortare după email) | 504 rânduri, 493 noi; total unic 2.203 = totalul din API |
| G_REACT recalculat (abonați Shopify care sunt `inactivi` + dezabonați) | 1.864 (1.442 vechi + 422 noi) |
| Dintre cei 422 noi, scoși: semnalări de calitate / bot suspect / greșeli sau test | 7 / 167 / 1 |
| Rânduri noi adăugate în etapa 3 | **247** |
| Scoși din cele 801 pregătite anterior | 3: 2 conturi de test (nume „Test” în Shopify) și 1 contact care s-a reabonat singur între timp |
| **Fișierul final pentru etapa 3** | **1.045 de rânduri** (844 cu nume sau cumpărători, din care 654 cumpărători; 201 fără nume și fără comenzi) |

Verificări pe fișierul final: 0 dezabonați de bunăvoie (cei 20 cu dată de dezabonare au rămas în afara listei), 0 adrese pe domeniul propriu, 0 duplicate Gmail (puncte sau „+”), 0 contacte cu acord SMS existent.

**Atenție:** sunt 1.042 de contacte reactivate (3 din etapa 0 + 1.039 acum), nu „~800” cum scria în întrebarea pentru proprietar. Diferența de 247 vine din partea de listă care nu fusese citită. Sunt aceeași categorie de oameni, cu aceleași excluderi, dar merită spus proprietarului.

## 2. Importul pe loturi (doar `{email}`, subscribe=true, update_existing=true, tag `reactivare-2026-10`)

Înainte de import: 95 de contacte `inactivi` aveau deja acord SMS. Niciunul nu e în etapa 3, deci numărul corect de acorduri SMS la final, pe tagul de reactivare, este **0**.

| Lot | Rânduri | Actualizate | Blacklist (neatinse) | Invalide | SMS pus de import, anulat | Tag `reactivare-2026-10` după | Abonați email total după |
|---|---|---|---|---|---|---|---|
| înainte | – | – | – | – | – | 3 | 1.304 |
| 1 | 200 | 199 | 1 | 0 | 46 | 202 | 1.503 |
| 2 | 200 | 200 | 0 | 0 | 78 | 402 | 1.703 |
| 3 | 200 | 197 | 3 | 0 | 27 | 599 | 1.900 |
| 4 | 200 | 200 | 0 | 0 | 43 | 799 | 2.100 |
| 5 | 200 | 199 | 1 | 0 | 43 | 998 | 2.299 |
| 6 | 45 | 44 | 1 | 0 | 12 | 1.042 | 2.343 |
| **Total** | **1.045** | **1.039** | **6** | **0** | **249** | | |

- Niciun contact nou nu a fost creat (0 importați), nimeni nu a fost dezabonat de la email și nimeni nu a fost șters.
- SMS: după fiecare lot am listat `reactivare-2026-10` + SMS abonat și am pus `subscribed_to_sms=false` pe toți (niciunul nu era în setul cu acord SMS existent). Emailul a rămas abonat.
- Verificare finală: `reactivare-2026-10` + SMS abonat = **0** (corect: 0 acorduri existente). `inactivi` + SMS abonat = **95**, neschimbat. `reactivare-2026-10` + email abonat = 1.042. `inactivi` + dezabonat: 2.199 → 1.160.
- Welcome series 2 și celelalte automatizări: niciun contact reactivat nu a intrat în vreo automatizare pe 16.10 (verificat după ultimul lot).
- Efect secundar documentat al importului: tagurile sunt înlocuite. Toți au acum doar `reactivare-2026-10` (tagul `inactivi` și, la câțiva, `abonare pop-up` sau `Update 13.11` au dispărut). Numele nu au fost atinse.

## 3. Cele două e-mailuri

| | E-mail 1 | E-mail 2 |
|---|---|---|
| Campanie programată | `6ad165acf101fc9ea509159e` „Reactivare 2026-10 – e-mail 1 (20.10)” | `6ad16665437c808f0407cb5f` „Reactivare 2026-10 – e-mail 2 (27.10)” |
| Trimitere | marți 20.10.2026, 18:30 ora României (15:30 UTC) | marți 27.10.2026, 18:30 ora României (16:30 UTC) |
| Subiect | Mai vrei să primești ghidurile noastre? | Ultimul e-mail, dacă nu vrei să rămâi |
| Audiență | segment „Reactivare 2026-10 (de confirmat)” (`custom::6ad159700764df9f8d0b71f4`, tag `reactivare-2026-10`) | segment nou „Reactivare 2026-10 – fără reacție la e-mail 1” (`custom::6ad165dd0e95411168089f2f`) |
| UTM | themarketer / email / `reactivare-2026-10-e1` | themarketer / email / `reactivare-2026-10-e2` |
| Draft de test | `6ad16560263296081f0231d7` „NU TRIMITE – test reactivare” | `6ad166330054276f6f0c4a3d` „NU TRIMITE – test reactivare (e-mail 2)” |

- Ambele au fost trimise ca test la contact@primesupplements.ro și verificate după randare: diacritice corecte, linkurile de dezabonare se rezolvă, un singur buton mare „Da, vreau să le primesc în continuare” → https://primesupplements.ro/blogs/news, linia „Nu mai vreau e-mailuri” → `{{unsubscribe_link}}`, subsolul cu datele firmei, fără coduri de reducere, fără prețuri, fără mențiuni de sănătate. Sender implicit: Primesupplements.ro <contact@primesupplements.ro>. Smart sending și ora optimă sunt oprite.
- Segmentul pentru e-mailul 2: tag `reactivare-2026-10` ȘI nu a deschis e-mailul 1 ȘI nu a dat click pe e-mailul 1 (`newsletter_activity` / `specific_campaign`). A fost creat cu `skip_value_check`, pentru că tagul nu apare încă în catalogul de taguri al contului, iar e-mailul 1 nu e trimis încă. Acum are 0 membri, cum era de așteptat înainte de trimitere.
- HTML-ul este în `reactivation/email1.html` și `reactivation/email2.html`. Generatorul este `reactivation/build.py`.

## 4. De verificat înainte de trimiteri (important)

1. **Segmentul „de confirmat” arată încă 3 membri** (ultima evaluare: 15.10 23:04 UTC, înainte de import). Lista de contacte e corectă (1.042), dar evaluarea segmentului rulează în fundal. Segmentul contează în două locuri:
   - **Newsletterul de duminică 18.10, 18:00 (15:00 UTC)** exclude acest segment. Dacă segmentul nu se actualizează până atunci, cei 1.042 de contacte neconfirmate primesc newsletterul înaintea întrebării.
   - **E-mailul 1 (20.10)** pleacă la acest segment. Dacă nu se actualizează, pleacă doar la 3 contacte.
   Pe 17.10, verifică în `list_segments` că „Reactivare 2026-10 (de confirmat)” are ≈1.042 de membri și că `last_processed` este după 16.10 00:00. Dacă nu are, refă evaluarea din aplicație sau amână newsletterul de pe 18.10.
2. **Segmentul pentru e-mailul 2.** Între 21 și 26.10, verifică dacă are ≈1.042 minus cei care au deschis sau au dat click. Dacă rămâne 0, condiția nu se leagă de o campanie programată. Atunci refă segmentul după 20.10, fără `skip_value_check`, și mută pe el campania `6ad16665437c808f0407cb5f` cu `update_campaign` (segments).
3. **Automatizări.** Contactele reactivate sunt abonate, deci pot intra în automatizările de marketing. Cel mai probabil în „Inactivity behavior” (recâștigare după 30 de zile fără vizită), dar și în coș, cross-sell și reaprovizionare. Pe 16.10 nu a intrat niciunul. Recomandare: în aplicație, adaugă la „Inactivity behavior” filtrul de excludere a segmentului „Reactivare 2026-10 (de confirmat)” până la 10.11. Prin API nu se poate.
4. **Deschiderile.** Deschiderile includ și deschideri automate (Apple Mail Privacy, scannere antivirus). Cine are „deschidere” automată nu primește e-mailul 2 și, după regula de mai jos, rămâne abonat. E-mailurile spun „un click e de ajuns”. Dacă proprietarul vrea criteriul strict, curățarea poate folosi doar click-ul.

## 5. Regula de curățare pentru 10.11.2026

Se aplică doar contactelor care au încă tagul `reactivare-2026-10`.

| Grup | Condiție | Acțiune |
|---|---|---|
| Fără reacție | nu au deschis și nu au dat click nici pe e-mailul 1 (`6ad165acf101fc9ea509159e`), nici pe e-mailul 2 (`6ad16665437c808f0407cb5f`) | dezabonare de la email (`unsubscribe_contact` sau `update_contact subscribed_to_email=false`) și tag `inactivi-2026-11` în locul lui `reactivare-2026-10`. SMS-ul nu se atinge (este deja dezabonat). |
| Cu reacție | au deschis sau au dat click pe e-mailul 1 sau pe e-mailul 2 | se scoate tagul `reactivare-2026-10` (fără alte schimbări de consimțământ), ca să primească newsletterul |
| Dezabonați singuri între timp | au apăsat dezabonarea | rămân dezabonați. Se scoate doar tagul. Nu se reabonează nimeni. |

Pași: (a) segment `tag reactivare-2026-10` + `not_opened`/`not_clicked` pe ambele campanii = grupul fără reacție; (b) restul tagului = grupul cu reacție; (c) verificări după: `reactivare-2026-10` = 0, `inactivi-2026-11` = grupul (a), SMS abonat pe ambele taguri = 0. Înainte de modificarea tagurilor, verifică dacă există automatizări pe taguri, pentru că `update_contact` cu taguri le declanșează.

## 6. Note

- Auditul anterior (work/notes.md) atribuie scoaterea din listă unei curățări manuale din iulie, nu unei reguli automate de 30 de zile. Concluzia pentru consimțământ rămâne aceeași: istoricele verificate (9 + 3 noi) nu au niciun eveniment de dezabonare făcut de persoană, iar cei 20 de dezabonați de bunăvoie sunt excluși.
- Nu s-au făcut commituri git.
