# Prime Expediere – planul de produs (13.11.2026)

Cererea lui Marius: „gândește ca și cum e magazinul tău: ce funcționalități mai putem adăuga ca să fie cea mai completă aplicație de acest fel pentru utilizatorii Shopify; întâi să ne ajute pe noi, apoi s-o vindem și altora”.
Stare la 13.11: modul umbră merge (44/44 facturi identice cu aplicația veche), versiunea 1 (emitere) e construită și publicată, în mod umbră. Detalii tehnice: `PRIME-EXPEDIERE-MOD-UMBRA-2026-11-13.md`.

## 1. Ce are acum (versiunea 1, 13.11)
- Ecranul **Comenzi**: comenzile neexpediate, cu avertizări (lipsă cod poștal, telefon greșit, produs fără SKU, greutate); bifezi → **Factură + AWB** sau **Doar factură**; rezultatul pe fiecare comandă, cu linkul facturii.
- **Trei moduri**: umbră (doar calcul) → test (proforme Oblio + verificarea adresei și a prețului la Cargus, nimic în Shopify) → live (factură PRS, AWB, expediere cu e-mail către client, etichete, arhivare – exact ca aplicația veche). Live cere scrierea „EMITE”.
- **Protecție la dubluri**: o comandă facturată nu se refacturează; o emitere întreruptă nu se reia orbește; cheie de idempotență la Oblio.
- **Paza în cod**: în live sunt permise doar 5 mutații Shopify (atribute, etichete, metafield-uri, expediere, arhivare) – niciodată produse, stoc, clienți sau rambursări; testat.
- **Verificarea adresei** în nomenclatorul Cargus înainte de AWB, cu sugestii.
- **Greutatea reală** (din produs, din titlu sau implicită), nu 0,1 kg.
- **Etichete AWB într-un singur PDF** (10×14 sau A4) pentru toate AWB-urile zilei.
- **Jurnal** pe comandă (ce s-a trimis, ce a răspuns Oblio/Cargus, erori clare).
- **Raportul de comparație** cu aplicația veche (rămâne util până la trecere).

## 2. Ce adăugăm pentru Prime (ordinea propusă)
**A. Trecerea completă (săptămânile 1–2)**
1. Cheia Cargus → test pe 5–10 comenzi (proforme + preț) → 3–5 comenzi live verificate de Marius → trecerea echipei.
2. **Webhook „comandă nouă”**: comenzile apar singure, cu avertizările deja calculate; opțional procesare automată pentru comenzile plătite cu cardul fără avertizări (dimineața, la ora aleasă).
3. **Urmărirea coletelor** (Cargus AwbStatus, de 2 ori pe zi): livrat / refuzat / returnat, vizibil în listă și ca etichetă pe comandă.
4. **Ramburs încasat → comanda marcată „plătită”** (D28 din SETARI-VANZARI), din decontul Cargus (cont colector).
5. **Colet refuzat/returnat → propunere de storno** în Oblio (doar cu confirmare) + readucerea în stoc prin Oblio.
6. **Raport săptămânal** pe e-mail: comenzi expediate, cost transport real (factura Cargus), refuzuri pe județ, ramburs neîncasat.

**B. Mai bine decât aplicația veche (lunile 1–2)**
7. **Al doilea curier** (Sameday cu easybox, sau FAN cu FANbox) + **reguli de alegere**: easybox ales → Sameday; greutate > X → curierul ieftin; județ → curierul cu livrare mai rapidă.
8. **Comparator de preț pe comandă** (calcul la fiecare curier) – alegi curierul cel mai ieftin cu un click.
9. **Lockere**: alegerea lockerului după comandă (pagina de mulțumire / e-mail), pentru că extensiile în checkout cer Shopify Plus.
10. **Corectarea adresei** (ce făcea Fluxsales la 3 % din comenzi): județ/localitate/cod poștal din nomenclator, propuse cu un click.
11. **Listă de pregătire (picking)**: produsele de scos din raft pentru lotul zilei, grupate pe SKU – PDF lângă etichete.
12. **Comenzi suspecte** înainte de AWB: client cu refuzuri anterioare, telefon invalid, adresă incompletă, ramburs mare la client nou → semnalate, nu blocate.
13. ~~Confirmare prin SMS/e-mail înainte de expediere pentru rambursuri mari~~ – **renunțat (Marius, 13.11)**: comenzile se confirmă deja pe WhatsApp.
14. **Retururi**: AWB de retur din aplicație + factură storno.
15. **e-Factura**: starea SPV a fiecărei facturi vizibilă în listă; alertă dacă una e respinsă.
16. **Tablou de bord**: comenzi pe zi, timp până la expediere, cost transport/comandă, rata de refuz, ramburs în drum.

## 3. Ca produs pentru alte magazine Shopify (după ce merge stabil la noi)
**Piața**: magazinele Shopify din România folosesc azi Fluxsales, aplicațiile facturatorilor (SmartBill, Oblio, FGO), Innoship sau programe custom ca al nostru. Durerile reale (le-am trăit): dependență de un programator, greutăți greșite, pachete Shopify nefacturate pe componente, adrese respinse de curier, ramburs nemarcat ca plătit, fără control.

**Diferențiatorii noștri**
- Factură + AWB + urmărire + ramburs + retur într-o singură aplicație, nu trei.
- **Mod umbră și mod test** la instalare: magazinul vede exact ce ar face aplicația pe comenzile lui, fără niciun risc.
- Pachetele Shopify (Bundles) desfăcute corect pe componente, cu reducerea pe linie, ca în contabilitate.
- Mai mulți facturatori (Oblio, SmartBill, FGO) și curieri (Cargus, Sameday, FAN, DPD, GLS) prin aceeași interfață.
- Paza în cod: aplicația nu poate atinge produsele, stocul sau clienții – argument de încredere.

**Ce trebuie schimbat tehnic pentru vânzare**
1. **Multi-magazin**: toate tabelele și setările pe `shop_domain` (azi un singur magazin); token-uri și chei per magazin; izolarea datelor.
2. **Aplicație publică în Shopify App Store**: webhook-urile GDPR obligatorii (customers/data_request, customers/redact, shop/redact), cererea de acces la datele protejate ale clienților (nivel 2), politică de confidențialitate, interfață Polaris, recenzia Shopify (câteva săptămâni).
3. **Facturare prin Shopify Billing API** (abonament în factura Shopify a magazinului).
4. **Plan Cloudflare plătit** (~5 $/lună) pentru limite mai mari și cozi (loturi mari în fundal).
5. **Asistență**: documentație în română, ghid de instalare, pagină de stare.
6. **Firmă și contract**: cine vinde (Prime Supplements SRL sau firmă separată), termeni de utilizare, contract de procesare a datelor pentru magazine.

**Prețuri orientative** (Fluxsales: gratuit 30 comenzi, 19,99 $ / 500, 29,99 $ nelimitat): Gratuit (umbră + test, 30 comenzi/lună), Standard ~99 lei/lună (500 comenzi, 1 facturator + 1 curier), Pro ~199 lei/lună (nelimitat, mai mulți curieri, reguli, urmărire + ramburs + retururi, rapoarte). De validat cu magazinele pilot.

**Etapele de vânzare**
1. Stabil la Prime 1–2 luni (etapele 3–4 din planul de preluare).
2. 3–5 magazine pilot gratuite (afiliați, distribuitori B2B, magazine prietene), feedback.
3. Multi-magazin + App Store + facturare; listare publică.
4. Marketing: comparație cu alternativele, studiu de caz Prime (greutăți corectate, timp economisit, refuzuri reduse), parteneriate cu facturatorii și curierii.

## 4. Decizii care îi aparțin lui Marius
- Când trecem pe **test** (după cheia Cargus) și pe **live**.
- Al doilea curier: Sameday sau FAN.
- Dacă vrem procesarea automată a comenzilor plătite cu cardul.
- Dacă și când facem pasul spre vânzare (firmă, preț, piloți).
