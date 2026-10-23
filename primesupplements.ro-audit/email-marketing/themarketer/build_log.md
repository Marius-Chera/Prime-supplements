# Jurnalul de build theMarketer · segmentele din SYSTEM.md §6

**Data:** 16.10.2026, 00:40–00:47 UTC · **Domeniu:** primesupplements.ro · **Ce s-a făcut:** doar segmente noi, prin `create_segment`. **Nu s-au atins** contacte, campanii, automatizări sau cupoane. **Nu s-a șters** niciun segment. Documentul conține doar cifre și id-uri.

## 0. Verificări înainte de creare

- **`list_segments` înainte de build:** 4 segmente custom, toate păstrate:
  - `6a50f45aa1ebe8ee240f89b1` „inactivi curatare” (`tag is "inactivi"`), 105 email / 95 SMS;
  - `6ad159700764df9f8d0b71f4` „Reactivare 2026-10 (de confirmat)” (`tag is "reactivare-2026-10"`), al jobului de reactivare. **Nu l-am recreat.** Arată încă 3 membri (ultima evaluare 15.10, 23:04 UTC), dar nu-l mai folosește nicio campanie programată;
  - `6ad165dd0e95411168089f2f` „Reactivare 2026-10 – fără reacție la e-mail 1” (jobul de reactivare, audiența e-mailului 2 din 27.10);
  - `6ad1678705a9707c810ef1e0` „Reactivare 2026-10 · de confirmat (v2)” (jobul de reactivare), 1.042 email: audiența e-mailului 1 din 20.10 și excluderea de pe newsletterele programate.
- **`get_audience_options kind=segment_conditions`:** 38 de condiții permise, aceleași ca în `audit_audience.md` §4. Indisponibile: `store_*`, `nps`, `loyalty_*`.
- **`get_audience_options kind=segment_values`:** toate id-urile de categorie din §6.2 există exact cum le scrie planul, iar `viewed_category` folosește aceleași id-uri. Nu a apărut nicio variantă nouă de categorie:
  - Pudre Proteice `67d95b090839f5bea004f3a7`;
  - Creatina `68552d1d830bb87b330ba052`, Creatină `6acdd84a472b8477b605efeb`, Suplimente > Creatina `67d95b080839f5bea004f3a5`;
  - Pre-Workout `67d95b090839f5bea004f3a8`, Shoturi `67d95b090839f5bea004f3aa`;
  - Crema de orez `6a46b9e654db89511e0baf77`, Cremă de orez `6acdd84a472b8477b605efec`;
  - Vitamine și Minerale `68552d1d830bb87b330ba050`, Suplimente > Vitamine și Minerale `67d95b080839f5bea004f3a2`, Prime Health `67d95b080839f5bea004f3a0`;
  - Aminoacizi `68552d1d830bb87b330ba051`, Suplimente > Aminoacizi `67d95b080839f5bea004f3a3`;
  - produsul EAA `68552d1e830bb87b330ba072`. Mai există varianta veche WooCommerce `67d95b090839f5bea004f3cc`, pe care planul n-o include; comenzile pe ea sunt mai vechi de 6 luni, deci nu contează pentru `purchased_product`.
- **Catalogul de taguri** arată doar 4 taguri: „import 25.06”, „abonare pop-up”, „Update 13.11”, „inactivi”. Tagurile `reactivare-2026-10` și `sync-shopify-2026-10` sunt pe contacte, dar nu apar încă în catalog. `acord-nedovedit`, `email-inactiv`, `frecventa-redusa`, `acord-sms-dovedit`, `abonare footer` și `abonare blog` nu există încă. Segmentele care le folosesc au fost create cu `skip_value_check`, cu toate celelalte valori în forma stocată (cheile `system-…` și id-urile de 24 de caractere).

## 1. Segmentele create (40)

Numărul de membri e cel de la prima evaluare, la 1–5 minute după creare (16.10, 00:40–00:47 UTC). „Email” înseamnă membri abonați la email; „SMS”, membri abonați la SMS.

### 1.1 Exact după plan (35)

| # | Nume | Id | Potrivire | Reguli, cum le-a stocat theMarketer | Email / SMS |
|---|---|---|---|---|---:|
| 1 | E · Implicați 30 zile | `6ad1726b27f58d99080fa022` | any | newsletter_activity clicked any_sent_30_days · shopper_status bought in last 30 days · date_added within 30 days | 286 / 168 |
| 2 | E · Implicați 90 zile | `6ad1726f049eafefc608b1fd` | any | newsletter_activity clicked any_sent_90_days · shopper_status bought in last 90 days · date_added within 45 days · funnel_step is view_category / search / view_product / add_to_cart / initiate_checkout | 587 / 331 |
| 3 | E · Niciodată deschis (abonați de peste 30 de zile) | `6ad17270f95f3132e50be1c6` | all | segment is „Activity - Inactive lifetime” · date_added not within 30 days | 947 / 48 |
| 4 | C · Proteine | `6ad1729924f4de61e208d855` | — | purchased_category is [Pudre Proteice] | 241 / 216 |
| 5 | C · Creatină | `6ad1729bc3b9bd57900cc52c` | — | purchased_category is [Creatina, Creatină, Suplimente > Creatina] | 132 / 117 |
| 6 | C · Pre-workout | `6ad1729c98c07e19db0e7d5b` | — | purchased_category is [Pre-Workout, Shoturi] | 105 / 96 |
| 7 | C · Cremă de orez | `6ad1729d727c10d0f807eee8` | — | purchased_category is [Crema de orez, Cremă de orez] | 179 / 174 |
| 8 | C · Vitamine și minerale | `6ad1729e9d64d022430ccf19` | — | purchased_category is [Vitamine și Minerale, Suplimente > Vitamine și Minerale, Prime Health] | 199 / 180 |
| 9 | C · Aminoacizi | `6ad1729f47cf41686b0b7d0d` | any | purchased_category is [Aminoacizi, Suplimente > Aminoacizi] · purchased_product is `68552d1e830bb87b330ba072` | 82 / 79 |
| 10 | I · Interesați proteine | `6ad172a8f6aadf3ddd057fff` | — | viewed_category is [Pudre Proteice] | **0 / 0**, înlocuit de #36 |
| 11 | I · Interesați creatină | `6ad172aad41be3dfdb00c04d` | — | viewed_category is [cele 3 categorii de creatină] | 84 / 67 |
| 12 | I · Interesați cremă de orez | `6ad172ad092bbf1ea50123b2` | — | viewed_category is [cele 2 categorii de cremă de orez] | 241 / 156 |
| 13 | I · Interesați vitamine | `6ad172ae9bc574667408f40c` | — | viewed_category is [cele 3 categorii de vitamine, minerale, Prime Health] | **0 / 0**, înlocuit de #37 |
| 14 | L · Abonați fără comandă | `6ad172b020cea36ef60e2c4f` | all | subscribed_to is email · segment is „Shopping - Nonbuyers lifetime” | 1.405 / 42 |
| 15 | L · Clienți cu o comandă | `6ad172b20c9007be7a070a0e` | all | number_of_transactions greater than 0 · less than 2 | 451 / 225 |
| 16 | L · Clienți recurenți (2+) | `6ad172b40c0153fe610e94a1` | — | number_of_transactions greater than 1 | 487 / 334 |
| 17 | L · VIP | `6ad172b51be4cc419d09edff` | all | number_of_transactions greater than 2 · lifetime_value greater than 900 · shopper_status bought in last 6 months | 193 / 173 |
| 18 | R · În risc (60–120 zile) | `6ad172bc39966404cd0c35bd` | all | number_of_transactions greater than 0 · did not buy in last 60 days · bought in last 120 days | 110 / 93 |
| 19 | R · Pierduți (120–365 zile) | `6ad172bfa5c927ee5e0265e6` | all | number_of_transactions greater than 0 · did not buy in last 120 days · bought in last 365 days | 167 / 94 |
| 20 | R · Recurenți în risc | `6ad172c14dc6bb66c30522c3` | all | number_of_transactions greater than 1 · did not buy in last 60 days · bought in last 365 days | 173 / 113 |
| 21 | P · Abonați pop-up fără comandă | `6ad172c3e735825c370b0794` | all | tag is „abonare pop-up” · segment is „Shopping - Nonbuyers lifetime” | 216 / 2 |
| 22 | P · Abonați noi 11 zile (în Welcome) | `6ad172c53116d1a3dc047d65` | all | date_added within 11 days · segment is „Shopping - Nonbuyers lifetime” | 66 / 1 |
| 23 | Reactivare 2026-10 · neconfirmați | `6ad172dc02144f354706f5bc` | all | tag is „reactivare-2026-10” · newsletter_activity not clicked any_sent_30_days · segment is not `system-shopping-buyers_30_days` (`skip_value_check`) | **3 / 0**, regulă defectă, înlocuit de #38 |
| 24 | X · Au comandat în ultimele 14 zile | `6ad172c6ccd965f987077922` | — | shopper_status bought in last 14 days | 95 / 93 |
| 25 | X · Cumpărători 180 zile | `6ad172c86d8a18d77d09cd99` | — | shopper_status bought in last 180 days | 380 / 342 |
| 26 | X · Acord nedovedit | `6ad172dd6d39c4f462075e01` | — | tag is „acord-nedovedit” (`skip_value_check`) | 0 (tagul nu există încă) |
| 27 | X · Checkout fără comandă, neconfirmați | `6ad172e170c6fd3d1608ee14` | all | subscribed_to is email · segment is `system-shopping-nonbuyers_lifetime` · newsletter_activity not clicked any_sent_180_days · date_added within 180 days · tag is not „abonare pop-up” / „abonare footer” / „abonare blog” / „reactivare-2026-10” / „sync-shopify-2026-10” (`skip_value_check`) | 17 / 0, înlocuit de #40 |
| 28 | X · Igienă (adrese de evitat) | `6ad172cbf737a11bc604a07d` | any | email contains „1secmail” / „anonmails” / „gmail.con” / „yahoo.con” / „gamil.” / „gmai.com” / „gnail.” / „icloud.con” / „@example.” · deliverability soft bounced in last 30 days · hard bounced in last 180 days | 27 / 10 |
| 29 | X · Sunset suprimați | `6ad172e2a08ad81d7104a271` | — | tag is „email-inactiv” (`skip_value_check`) | 0 (tagul vine după primul sunset) |
| 30 | X · Frecvență redusă | `6ad172e48d141988610e2a0f` | — | tag is „frecventa-redusa” (`skip_value_check`) | 0 |
| 31 | SMS · Acord dovedit | `6ad172e601ad1e3597027d70` | all | subscribed_to is sms · tag is „acord-sms-dovedit” · phone is not empty (`skip_value_check`) | 0 (tagul vine după verificarea de la §3.3) |
| 32 | E · Implicați 180 zile | `6ad172f7f1d4c6e0cd071d59` | any | newsletter_activity clicked any_sent_180_days · bought in last 180 days · date_added within 90 days · segment is „E · Implicați 90 zile” | 697 / 385 |
| 33 | E · Candidați sunset | `6ad172fafea1bb7f02022d63` | all | newsletter_activity not clicked any_sent_180_days · received at_least_5_in_90_days · segment is not `6ad172c86d8a18d77d09cd99` (X · Cumpărători 180 zile) · date_added not within 180 days · segment is not `6ad1726f049eafefc608b1fd` (E · Implicați 90 zile) · tag is not „reactivare-2026-10” (`skip_value_check`) | 626 / 214 |
| 34 | Reactivare 2026-10 · confirmați | `6ad172fdc29f05dc150f04ba` | all | tag is „reactivare-2026-10” · segment is not `6ad172dc02144f354706f5bc` (`skip_value_check`) | **1.039 / 0**, greșit din cauza lui #23, înlocuit de #39 |
| 35 | SMS · Cumpărători cremă de orez | `6ad172feef36304d010105f2` | all | segment is „SMS · Acord dovedit” · segment is „C · Cremă de orez” | 0 (până la tagul `acord-sms-dovedit`) |

„Reactivare 2026-10 (de confirmat)” **nu** a fost creat: există deja (`6ad159700764df9f8d0b71f4`).

### 1.2 Corecturi după prima evaluare (5 segmente „(v2)”)

API-ul nu poate edita sau șterge un segment. De aceea versiunile corectate au primit sufixul „(v2)”. Cele 5 segmente de mai sus marcate „înlocuit” nu sunt folosite nicăieri. Le poți șterge din Audience > Segments (ghidul, pasul 0.3) sau le poți lăsa; nu fac nimic singure.

| # | Nume | Id | Potrivire | Reguli | Email / SMS | De ce |
|---|---|---|---|---|---:|---|
| 36 | I · Interesați proteine (v2) | `6ad173e5cc6c8283940f2765` | any | viewed_category is [Pudre Proteice] · viewed_product is Prime Whey 2 kg `68552d1e830bb87b330ba089` · Prime Whey 1 kg `68552d1e830bb87b330ba088` · Pure Isolate 2 kg `68552d1e830bb87b330ba075` · Emperor Mass 3 kg `68552d1e830bb87b330ba073` · Prime Whey Go `68552d1e830bb87b330ba094` | 312 / 215 | Pe Shopify, produsele proteice au categoria principală „Suplimente”. „Pudre Proteice” e doar o categorie secundară, moștenită din WooCommerce, iar vizitele pe colecția de proteine nu ajung pe ea (0 membri). La creatină și la crema de orez merge, pentru că numele colecțiilor („Creatină”, „Cremă de orez”) coincid cu categoriile noi. Am adăugat produsele văzute, aceeași fereastră de 3 luni |
| 37 | I · Interesați vitamine (v2) | `6ad173e919d8a374fc0e183c` | any | viewed_category is [cele 3 categorii] · viewed_product is magneziu bisglicinat `68552d1e830bb87b330ba06f` · D3 + K2 `68552d1e830bb87b330ba05a` · Vitamina C 1000 `68552d1e830bb87b330ba067` · Daily Vitamin Formula `68552d1e830bb87b330ba070` · zinc `68552d1e830bb87b330ba066` · citrat de magneziu `68552d1e830bb87b330ba062` · Potassium Complex `68552d1e830bb87b330ba091` | 133 / 101 | Aceeași cauză (0 membri). **Doar vitamine și minerale propriu-zise.** Nu am pus produsele din plante sau cele cu nume care sugerează o afecțiune (Liver Protect, Cardio Calm, Testo Revive, silimarină, nattokinază, crom, bergamotă), ca segmentul să nu grupeze oameni după date de sănătate (§6.2, GDPR art. 9) |
| 38 | Reactivare 2026-10 · neconfirmați (v2) | `6ad173ec8aeb4a67c90dc231` | all | tag is „reactivare-2026-10” · segment is not „E · Implicați 30 zile” (`6ad1726b27f58d99080fa022`) (`skip_value_check`) | 1.038 / 0 | `newsletter_activity not_clicked any_sent_30_days` prinde doar contactele cărora li s-a **trimis** o campanie în ultimele 30 de zile. Reactivații n-au primit nimic de 3 luni, deci #23 avea 3 membri în loc de ~1.042, iar excluderea „din ziua 0” n-ar fi funcționat. Varianta nouă: au tagul și nu au dat click pe o campanie din ultimele 30 de zile și nu au comandat în 30 de zile. Partea „sau adăugat în 30 de zile” din E · 30 nu-i atinge: niciun contact reactivat nu e creat recent (`reactivation_report.md`: 0 contacte noi) |
| 39 | Reactivare 2026-10 · confirmați (v2) | `6ad173ef36c2a06946042af5` | all | tag is „reactivare-2026-10” · segment is „E · Implicați 30 zile” (`skip_value_check`) | 4 / 0 | Complementul lui #38: 1.038 + 4 = 1.042, adică toți cei cu tag |
| 40 | X · Checkout fără comandă, neconfirmați (v2) | `6ad173f2a097608aa90d1512` | all | subscribed_to is email · segment is `system-shopping-nonbuyers_lifetime` · **rating is 0** (niciun click, niciodată) · date_added within 180 days · aceleași 5 excluderi de tag (`skip_value_check`) | 17 / 0 | Aceeași problemă ca la #23: un abonat nou de la checkout, care încă n-a primit nicio campanie, nu era prins de `not_clicked any_sent_180_days`, deci ar fi primit prima campanie înainte să fie exclus. `rating is 0` îl prinde din prima zi. Azi, aceeași cifră (17), sub pragul de ~10–20 pe lună |

**Altă abatere de la reguli:** în #23 am pus, în locul lui `shopper_status did_not_buy_in_last 30 days`, `segment is not „Shopping - Buyers 30 days”`, pentru că `did_not_buy_in_last` nu e documentat pentru cei care n-au cumpărat niciodată (§6.1). În #38, aceeași condiție e acoperită de „E · Implicați 30 zile”.

## 2. Ce arată cifrele (pentru proprietar)

1. **Audiența de newsletter din plan („E · Implicați 180 zile”) are 697 de abonați email, nu ~1.600** cât presupune §2.2. Cu ea, newsletterul ar trece peste noapte de la ~1.300 de destinatari la ~700, fără să-i fi întrebat pe ceilalți. **Recomandare** (ghidul, pasul 0.2): newsletterul rămâne la „toți abonații email”, cu excluderile din plan, iar sunsetul lunar (§4.10) face triajul, cu întrebare înainte. „E · Implicați 180 zile” rămâne pentru raportare și campaniile de sezon. Scenariul de bază din §2.3 se apropie astfel de cel prudent până când clicurile cresc.
2. **„E · Candidați sunset” are deja 626 de abonați email.** Primul sunset (10.11) îi va întreba pe toți. La rata de click de azi, cei mai mulți vor primi tagul `email-inactiv`, iar newsletterul va ajunge apoi la ~700–800 de oameni implicați. E rezultatul corect („întâi întrebăm”), dar e bine să-l știi dinainte.
3. **Reactivarea a avansat față de §9.3** (jobul de reactivare, `reactivation_report.md`): 1.042 de contacte reabonate, două e-mailuri programate (20.10 și 27.10, nu 4 loturi cu un singur e-mail), iar curățarea din 10.11 îi **dezabonează** pe cei care nu reacționează. E-mailurile le spun „te scoatem din listă”, deci regula e consecventă cu ce li s-a spus, chiar dacă §3.4 propune suprimarea fără dezabonare. E-mailul 1 promite „o dată pe săptămână un singur e-mail, cu un ghid”: vezi ghidul, pasul 27.
4. **Newsletterele programate** (18.10, 25.10, 01.11, 08.11, 15.11, 22.11) merg la „toți abonații”, exclud „Reactivare 2026-10 · de confirmat (v2)” și au smart sending oprit. Lipsesc celelalte excluderi din §5. Newsletterul din 18.10 are încă subiectul și preheaderul vechi („Magneziul seara…”, „…ce spune UE despre somn”), pe care reviewul juridic a cerut să le schimbi (§5, săptămâna 0). Nu le-am atins: sunt ale jobului de newsletter. Ghidul, pașii 0.1 și 0.2.
5. **„C · Vitamine și minerale” include, după plan, și categoria „Prime Health”**, în care sunt și Liver Protect, Cardio Calm, Testo Revive și Water Out. Segmentul e amestecat (199 de abonați), nu e făcut pe o afecțiune, deci riscul GDPR e mic. Pentru campania din 28.10 (vitamine) e mai curat să folosești „I · Interesați vitamine (v2)” ∪ „C · Vitamine și minerale” și să nu adaugi alte segmente pe produse din plante.
6. **„Reactivare 2026-10 (de confirmat)”** (`6ad159700764df9f8d0b71f4`) are încă 3 membri la ultima evaluare (15.10, 23:04 UTC), dar nu mai e folosit de nicio campanie: e-mailul 1 pleacă la versiunea (v2), cu 1.042 de membri. E în regulă.

## 3. Ce urmează (după 24 de ore)

- `list_segments`: verific că toate cele 40 au `last_processed` din 17.10 și că numărătorile sunt stabile. Mă uit la cele goale prin construcție (#26, #29, #30, #31, #35) și la „X · Checkout fără comandă, neconfirmați (v2)” (alarmă dacă trece de ~40).
- **Ce nu am făcut și rămâne:**
  - audiența și excluderile pe newsletterele programate (`update_campaign`, interzis în acest pas: e al jobului de newsletter sau al tău, ghidul pasul 0.2);
  - verificarea acordului celor 581 de abonați importați și tagul `acord-nedovedit` (§9.2): atinge contacte, deci e un pas separat, cu aprobarea ta;
  - ciornele de campanii (§10.3 pasul 4): un pas separat.

## 4. Adăugiri 23.10.2026 – „e-mailul la treabă” (stoc revenit D3 + K2)

Context: D3 + K2 a vândut 5–10 comenzi/săptămână până pe 20.09, apoi 0 comenzi 5 săptămâni (produs indisponibil) și a fost reactivat pe 22.10, odată cu pachetele de iarnă. Stocul Shopify arată 1.023 din 15.09 (cifră de sistem; de confirmat de proprietar din Oblio înainte de trimitere).

| # | Segment / campanie | id | Reguli / audiență | Stare |
|---|---|---|---|---|
| 41 | S · D3 + K2 · cumpărat 6 luni sau văzut 3 luni | `6adaeecea7366b612c05e812` | any: purchased_product is D3 + K2 (`68552d1e830bb87b330ba05a`) · viewed_product is D3 + K2 | estimare 76 |
| 42 | X · Au comandat în ultimele 7 zile | `6adaeed03b9ce03f8c061983` | shopper_status bought_in_last 7 days | excludere pentru stoc revenit (§4.12) |
| 43 | S · D3 + K2 · VIP (primesc cu o zi înainte) | `6adaef082ba9f83f430a2979` | all: segment is #41 · segment is „L · VIP” | estimare 58 |
| C1 | Stoc revenit · Vitamina D3 + K2 · 24.10 (VIP, cu o zi înainte) | `6adaef8b1bd330adec0aa257` | #43; excluderile standard; smart sending; propus 24.10 10:00; utm promo-2026-10-24-stoc-d3-k2-vip | **ciornă**, neprogramată |
| C2 | Stoc revenit · Vitamina D3 + K2 · 25.10 (toți, fără VIP) | `6adaef0aa3c095d90d0db63e` | #41 fără „L · VIP”; excluderile standard + #42; smart sending; propus 25.10 10:00; utm promo-2026-10-25-stoc-d3-k2 | **ciornă**, test trimis la Marius și Adelina |

HTML: `email-marketing/campanii/2026-10-stoc-revenit-d3-k2.html` (fără preț tăiat, doar mențiuni UE din metafield-uri, cardul pachetului „Cura de Iarnă” la 149 lei). Programarea o face proprietarul din aplicație (sau o cere într-o sesiune) după ce confirmă stocul real.

**Automatizare nouă (cloud):** rutina „Stoc revenit – verificare zilnică și ciornă de campanie” (trig_01UbUT2hrNzgG86NSkFCLmFV), zilnic 09:00: compară stocul Shopify cu `data/stoc-revenit/snapshot.json`, pentru produsele revenite (0 → ≥10, cu vânzări în 180 de zile, fără pachete/haine) creează segment + campanie **ciornă** după șablonul de mai sus și trimite test proprietarului; nu trimite niciodată singură.

**Observație de verificat:** pe 22.10 fiecare contact nou a intrat de 3 ori în „Welcome series 2” (get_entered_automation). De văzut dacă e doar jurnalizare triplă sau trimiteri triple.
