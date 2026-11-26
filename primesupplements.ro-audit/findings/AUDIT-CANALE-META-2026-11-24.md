# Audit canale de vânzare Meta (Facebook & Instagram) – 24.11.2026

Cerut de Marius: „fă un audit la sales channels, dacă Meta (Facebook și Instagram) e legat corect cu Shopify și la ce ajută”. Doar citire, nimic modificat.

Surse: Shopify Admin API (publicații, produse, comenzi), Shopify admin în Chrome (canalul Facebook & Instagram, Customer events, Simprosys), Meta Events Manager (pixelul 593997668868274).

## Canalele de vânzare din Shopify

| Canal | Stare |
|---|---|
| Online Store | activ |
| Facebook & Instagram | activ (publicația 294339936631) |
| Google & YouTube | activ |
| Pinterest | activ |
| Shop, Point of Sale, Inbox | active |

## Ce e legat corect la Facebook & Instagram

1. **Catalogul:** „Catalog in sync”, piața România (RON). Status produse: **Approved, 197 de produse**. Catalogul din Meta e „Prime Supplements – Catalog” (1152350635382402).
2. **Pixelul / datele:** canalul are conectat datasetul „Prime Supplements – Meta-pixel” (593997668868274), proprietar primesupplements_ro. În Shopify → Customer events apare „Facebook & Instagram: **Server + Web, Optimized**”, adică Pixel + Conversions API trimise direct de Shopify. (Pe 16.10 canalul nu avea pixel; între timp a fost conectat.)
3. **Termenii catalogului** sunt acceptați. Reclamele „Your ads on Facebook and Instagram” apar active.
4. În Events Manager: Integrations = **Conversions API + Meta Pixel**; calitatea potrivirii Purchase 8,2/10 (bună), PageView/ViewContent/AddToCart ~6,2–6,9, InitiateCheckout 5,7.

## Probleme găsite

### P1 (important) – Purchase numărat de ~2 ori
- Meta a primit **~1.300 de evenimente Purchase** în 27.10–23.11. Shopify are **577 de comenzi** în aceeași perioadă (576 de pe site). Raport ≈ 2,25.
- Cauza aproape sigură: **Meta Pixel e pornit în două locuri**: în canalul Facebook & Instagram (Server + Web) și în **Simprosys → Pixels and tracking → „Meta Pixel Event Tracking: Active”** (rulează prin pixelul personalizat „SIMPROSYS” din Customer events). Canalul Shopify își deduplică propriile evenimente (pixel + server), dar nu și pe cele trimise de Simprosys.
- Efect: Meta crede că reclamele aduc de 2 ori mai multe vânzări (ROAS umflat; vezi și `meta-ads/RAPORT-2026-11-19.md` și `RAPORT-2026-11-22.md`, unde aceeași dublare era suspectată). Algoritmul optimizează pe date greșite.
- Asta e exact regula deja decisă în `SETARI-VANZARI-2026-10-16.md` (D11): „nu porni niciodată două surse pentru Meta”. Varianta A de atunci (Meta prin canalul Facebook & Instagram) e deja făcută pe jumătate: canalul trimite Pixel + CAPI. Lipsește oprirea Meta în Simprosys.
- **Remediere (doar cu „da”):** Simprosys → Pixels and tracking → Meta Pixel Event Tracking → dezactivare. Pagina cere „Login with Facebook”, deci o face Marius (sau mă loghez cu el de față). Google Ads și GA4 din Simprosys rămân neatinse. Verificare după 3–7 zile: Purchase în Events Manager ≈ numărul de comenzi din Shopify.

### P2 – 12 pachete lipsesc din catalogul Meta
Active pe site, nepublicate pe canalul Facebook & Instagram (deci lipsesc din reclamele de catalog, inclusiv din campania „Pachete – Vânzări”): Pre-Workout Power, Daily Fit, Duo Capsule, Trio Cremă de orez, Rutina Zilnică, Starter Forță, Mic Dejun Proteic, Set Hammer 3.0, Set Antrenament Hammer, Recuperare, Mix 9 batoane, Starter Începător. Lipsesc și de pe Google & YouTube (222 de produse incluse pe ambele canale). Remediere: publicare pe ambele canale (modificare în magazin → cu „da”). De verificat înainte dacă pachetele sunt produse Shopify Bundles care se pot sincroniza corect în feed.

### P3 – 0 opțiuni de livrare în canal
„Shipping settings: 0 shipping options available”. Contează doar pentru checkout pe Facebook/Instagram, care oricum nu e disponibil în România. Fără acțiune.

### P4 – mesaje din Events Manager (fără urgență)
- „Connect to Conversions API with Meta” (CAPI gateway gestionat de Meta) – nu e nevoie, canalul Shopify trimite deja CAPI.
- „Confirm domains” – domenii noi care trimit date (meta.com, creapure.com, shop.app etc.). De pus pe allowlist doar primesupplements.ro (și checkout-ul Shopify), restul ignorate.
- „Core setup: On” – Meta restricționează parametri personalizați și părți din URL (categorie sănătate/suplimente). Normal pentru suplimente, nu se poate ocoli.

## La ce ajută legătura Meta ↔ Shopify
1. **Catalogul sincronizat:** prețurile, stocul și pozele din Shopify ajung automat în Meta. Pe el merg reclamele de catalog / Advantage+ (fiecare om vede produsele pe care le-a văzut pe site) și postările promovate cu „Cumpără acum”.
2. **Măsurarea vânzărilor:** Pixel + Conversions API spun Meta ce reclamă a adus o comandă. Fără ele Meta nu știe pe cine să targeteze; cu dublări (P1) învață greșit.
3. **Publicuri:** vizitatori, coș abandonat, cumpărători (de exclus din campaniile reci).
4. **Ce NU face în România:** shop pe Facebook/Instagram, etichete de produs, checkout în aplicație – indisponibile (Commerce Manager: „Shops isn't available in your country”, vezi `INSTAGRAM-SHOPPING-2026-11-24.md`).

## Verificare D11 – 26.11.2026 (după deconectarea pixelului SIMPROSYS din Customer events, 24.11)

**Dublarea NU a dispărut.** Comparat Purchase din Events Manager (pixelul 593997668868274, ora României) cu comenzile Shopify din aceeași zi:

| Zi | Purchase în Meta | Comenzi Shopify | Raport |
|---|---|---|---|
| 22.11 | 33 | 13 | 2,5 |
| 23.11 | 37 | 16 | 2,3 |
| 24.11 | 46 | 18 | 2,6 |
| 25.11 (prima zi întreagă după schimbare) | 50 | 20 | 2,5 |

Defalcarea pe 25.11: **server 18** (cât comenzile: Conversions API trimis de canalul Shopify, corect) + **browser 32**. Evenimentele din browser nu se deduplică cu cele de pe server. Deci mai există cel puțin încă o sursă de Purchase în browser. Pe site încă rulează embed-ul aplicației Simprosys (`simprosys-google-shopping-feed/blocks/core_settings_block`), iar în Simprosys „Meta Pixel Event Tracking” era „Active”. Aceasta e cauza cea mai probabilă.

**Pasul următor (planul din 24.11, doar cu „da” de la Marius):** Simprosys → Pixels and tracking → Meta Pixel Event Tracking → dezactivare. Pagina cere „Login with Facebook”, deci o face Marius sau o facem împreună, cu el de față. Google Ads și GA4 din Simprosys rămân neatinse. Verificare după 2–3 zile: Purchase în Meta ≈ comenzile Shopify (raport ~1,0).
