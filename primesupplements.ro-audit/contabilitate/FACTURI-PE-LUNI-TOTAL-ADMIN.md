# Total Admin → Contabilitate → Cheltuieli + Facturi (construit pe 25.11.2026, unit cu Cheltuieli pe 26.11, pornește cu luna decembrie 2026)

**Din 26.11.2026 nu mai e o filă separată „Facturi”**: totul e în **Cheltuieli + Facturi** (Marius). Tabelul 1 = plățile lunii, cu coloana „Factura (găsită singur)” (sursa: e-mail contact@, SPV, eMAG, colegă) și „Document / ce lipsește” (unde e factura, e-mailuri cu aceeași sumă, 📎 Adaugă factura); tabelul 2 = facturi primite fără plată încă în extras; 3 = SPV; 4 = contracte; 5 = e-mailuri de verificat. Factura găsită se leagă și direct de plată (rămâne după închidere). Lunile se aleg din bara „Luna de lucru”.

Cererea lui Marius (25.11): „toate facturile aferente plăților firmei noastre, tot ce înseamnă ieșiri … o secțiune pentru octombrie, una pentru noiembrie și așa mai departe … absolut toate facturile pe luna decembrie să fie în aplicație”. Apoi: „și pentru facturile din eMAG să preiei direct din aplicația noastră să închizi automat plata” și „un buton de download … când caut o factură anume să o pot găsi aici”.

## Ce e pe pagină
- Butoanele de lună (Octombrie 2026, Noiembrie 2026, Decembrie 2026…) – luna aleasă cu **toate documentele ieșirilor de bani**, din toate sursele, fiecare cu plata din extras de care e legat.
- **Căutarea în toate lunile** (furnizor, număr, sumă, text) – găsește și documentele puse de mână la plăți în Cheltuieli.
- **📎 deschide** documentul în aplicație, **⬇ îl descarcă** (și în Cheltuieli).
- **Plăți fără factură**: plățile din extrasul BT (și cele cash) fără document, cu locul unde e factura (Shopify cu numărul facturii din extras, Google Ads, Meta, Anthropic, OpenArt, eMAG, SPV…) și „📎 Adaugă”.
- **De verificat** și **E-mailuri care nu par facturi** (strânse; „E factură” aduce atașamentele din e-mail).
- Un singur buton în plus: **+ Adaugă factură / bon** (pentru ce vine din alte părți).

## Sursele (toate intră singure)
| Sursa | Cum intră | Plata |
|---|---|---|
| E-mailul **contact@** | scriptul Google „Total Admin – facturi din e-mail” din contul contact@, la 10 minute (doar citire Gmail) | se leagă singur de extras (sumă, comerciant, număr; cardul în valută după suma în USD/EUR din extras) |
| Linkul „View invoice” din e-mail (OpenAI, Stripe) | aplicația ia singură PDF-ul de la link | idem |
| E-mail fără PDF (ex. „Your invoice…”) | e-mailul însuși se păstrează ca PDF | idem |
| Bonurile colegelor („BON …”) | același script; vezi `INSTRUCTIUNI-BONURI-PE-EMAIL.md` | cash → plată cash în Cheltuieli; card → extras |
| **SPV** (furnizorii români) | exportul Oblio „Documente din SPV” din Cheltuieli (deja existent) | deja legat de extras |
| **eMAG** (comisioanele Dante) | direct din baza aplicației **Prime eMAG** (facturile aduse din API-ul eMAG) | se leagă de plata din extras și **se marchează singură „plătită” în Prime eMAG** („Total Admin: plătită prin bancă – data (suma)”) |
| Documentele puse în **Cheltuieli** | apar și aici, pe luna plății | sunt chiar la plată |

Ce **nu** vine pe contact@ (verificat în Gmail pe 25.11): facturile Shopify (merg la proprietarul contului), Google Ads, Meta, Anthropic. Ele apar la „Plăți fără factură” cu locul exact. Ca să vină și ele singure, varianta e ca la fiecare serviciu adresa pentru facturi să fie contact@ (Marius, „orice plătim încercăm să punem la date de contact e-mailul contact@”):
- **Shopify**: facturile merg la proprietarul contului și la utilizatorii cu permisiunea „View billing and receive billing emails”.
- **Meta**: nu are câmp de e-mail pentru chitanțe (verificat 26.11, `META-CHITANTE-VERIFICARE-2026-11-26.md`). Chitanța se ia din Ads Manager → Facturare și plăți → Activități de plată → „Descarcă PDF”. Rândul plății din Total Admin arată referința (textul de după „FACEBK *” din extras). **Din 26.11 vin automat:** sarcina programată `meta-facturi-total-admin` (la 5 zile) le descarcă din Meta Billing și le pune la plată (`prime-expediere/scripts/meta-chitante.mjs`).
- **theMarketer** (26.11): contact@ adăugat la Settings → Billing details → Billing notifications. Factura vine oricum și în SPV.
- **Anthropic** (chitanțele vin pe marius.chera@yahoo.com; Yahoo gratuit nu redirecționează): aceeași sarcină ia PDF-ul din linkul „Download invoice” (Stripe, expiră în câteva săptămâni) și îl leagă de plata în valută (`scripts/anthropic-facturi.mjs`). Facturile vechi au fost pe persoană fizică: datele firmei se pun în claude.ai → Setări → Facturare.
- **Google Ads**: profilul de plăți → utilizatori → contact@ cu e-mailurile de plată (ca la Google Workspace, care vine deja cu PDF).

## Cum funcționează (tehnic)
- Repo `prime-expediere`: `src/inbox.ts` (ce e-mail e factură, suma, numărul, colegele, cardul în valută), `src/inbox-report.ts` (D1/R2, rutele `/inbox/*` și `/api/inv/*`), `src/google-id.ts` (tokenul Google), `src/emag-invoices.ts` (Prime eMAG), migrarea `0021_facturi_inbox.sql` (tabelul `inbox_docs`). Fișierele stau în R2 (`facturi/<luna>/…`, ținta `x:<id>`), ca documentele din Cheltuieli (`cheltuieli/<luna>/…`).
- Scriptul Google: sursa e în `prime-expediere/scripts/gmail-facturi/` (Code.gs + appsscript.json); proiectul e în contul contact@ (script.google.com). Ia e-mailurile de la 1.11.2026 (ca noiembrie să fie și el complet). Oprire: în proiect → Declanșatoare → șterge „ruleaza”.
- Fără parole sau chei: Total Admin verifică tokenul semnat de Google al contului contact@ și reține scriptul instalat (setarea `inbox_script` din D1). Alt script (ex. proiect refăcut) e refuzat până se șterge setarea.
- Datele din e-mailuri (expeditor, text) stau doar în D1/R2, nu în repo.
