# Prime Afiliați – aplicația noastră în locul UpPromote (13.11.2026)

Cererea proprietarului: o aplicație proprie, cu aceleași funcții ca UpPromote, „100% a noastră”, ca să nu mai plătim abonamentul.
Codul e în repo-ul separat `prime-afiliati/`, lângă Prime-supplements; GitHub privat `Marius-Chera/prime-afiliati`, de creat de Marius. Aplicația e făcută după modelul Prime Expediere: Worker Cloudflare + D1 pe contul Cloudflare Prime, aplicație în Dev Dashboard pe contul lui Marius, mod umbră întâi.

## 1. Ce economisim (și ce NU)
- **Dispare abonamentul UpPromote:** planul Enterprise costă 199,99 $ pe lună plus 1% din vânzările afiliaților. Factura din 11.10.2026 a fost de 308,31 $, adică **~1.400 lei pe lună, ~17.000 lei pe an**.
- **Costul aplicației noastre: 0 lei.** Rulează pe planul gratuit Cloudflare: Workers + D1, cu sincronizarea o dată pe oră. Dacă depășim limitele gratuite, planul plătit costă 5 $ pe lună.
- **Comisioanele sportivilor NU dispar prin schimbarea aplicației.** Ele sunt plata afiliaților și vin din contracte (`contracte-sportivi/`). Aplicația doar le calculează și le plătește corect. Dacă vrei comisioane mai mici, o praguri, aceasta e o decizie de business pe care o iei tu. Aplicația o aplică imediat, pe afiliat sau pentru toți (Setări). Propunerea A din SETARI-VANZARI, plafonarea codurilor creatorilor la 10%, e încă nehotărâtă.

## 2. Cum lucrează UpPromote azi în magazin (verificat 13.11, doar citire)
- **Coduri de afiliat:**
  - reducere procentuală (de obicei 10%), fără limită de folosiri, pe colecția internă „Eligibile coduri reducere” (222 de produse; pachetele din Reduceri nu sunt în ea);
  - se combină cu reducerile de produs și cu transportul.
- **Comenzile atribuite** primesc eticheta `UpPromote_order`. Cele venite pe linkul de afiliat au și atributul de coș `_up_click_id`.
- **Plata ca voucher** (PF): cod `idAfiliatUpPromote.XXXXXX`, cu sumă fixă pe toată comanda, o singură folosire, care nu se combină cu alte coduri de produs. Exemple din noiembrie: 300–755 lei.
- **Voucherele lunare de sponsorizare** (ex. `NUME500NOIEMBRIE2026`) se fac de mână în Shopify, nu din UpPromote. Aplicația noastră nu le confundă cu codurile de afiliat.
- **Funcții UpPromote nefolosite:** embed-urile „Customer referral” și „Message bar” (SETARI-VANZARI A17).

## 3. Funcțiile, una câte una
| Funcție UpPromote | Prime Afiliați | Stare |
|---|---|---|
| Cod de reducere per afiliat | se preiau codurile existente din Shopify; codurile noi se creează din aplicație (modul live) | ✅ preluare / ✅ creare (live) |
| Atribuirea comenzii după cod | da, fără să conteze literele mari/mici | ✅ |
| Link de afiliat cu urmărirea vizitei (cookie) | `primesupplements.ro/?ref=nume`: scriptul din temă pune `_prime_ref` în coș; atribuirea după link e gata în aplicație | ⏳ etapa 2 (scriptul din temă) |
| Comision %, implicit și per afiliat | da | ✅ |
| Produse excluse de la comision | colecția „Eligibile coduri reducere” | ✅ |
| Comision după reducere, fără transport, minus retururi | da | ✅ |
| Anulare/rambursare → fără comision | automat | ✅ |
| Blocarea auto-comenzilor | după e-mail sau contul de client | ✅ |
| Aprobare automată după perioada de retur | după expediere + 14 zile (configurabil) | ✅ |
| Aprobare/respingere de mână | da, cu motiv | ✅ |
| Sold, prag minim de plată (500 lei) | da; „ignoră minimul” la încetarea contractului | ✅ |
| Plata PF ca voucher în magazin | cod cu sumă fixă, o folosire, creat de aplicație | ✅ (live) |
| Plata PFA/SRL pe factură | se înregistrează plata cu numărul facturii | ✅ |
| Rapoarte, top afiliați, export | tablou lunar, CSV pe afiliat | ✅ |
| Comparație cu UpPromote | tab dedicat (doar cât merg amândouă) | ✅ |
| Portal pentru afiliat (cod, link, comenzi, sold, „transformă în voucher”) | în site, prin App Proxy `/apps/afiliati`, cu logare de client Shopify (ca Chera Hub) | ⏳ etapa 2 |
| Formular de înscriere + aprobare | în portal; cererea apare în panou ca „în așteptare” | ⏳ etapa 2 |
| E-mailuri automate (bun venit, comision nou, voucher emis) | theMarketer tranzacțional, în designul comun; rămâne și e-mailul lunar | ⏳ etapa 3 |
| Customer referral / message bar | nefolosite azi, nu le refacem | – |

## 4. Etapele
1. **Etapa 1 – mod umbră (GATA 13.11):**
   - Worker live, D1, sincronizare din oră în oră, panou în Admin, 22 de teste.
   - Nu scrie nimic în Shopify: paza blochează orice mutație.
   - **Ce face Marius (≈5 minute):**
     - creează aplicația „Prime Afiliați” în Dev Dashboard, la fel ca Prime Expediere:
       - App URL: `https://prime-afiliati.prime-expediere.workers.dev`;
       - aplicație încorporată;
       - permisiuni `read_orders`, `read_products`, `read_discounts`;
     - lipește Client secret-ul în Cloudflare (`SHOPIFY_API_SECRET`) și apasă Install;
     - Claude trece Client ID-ul în `wrangler.jsonc` și urcă din nou aplicația.
   - **Apoi:** „Preia codurile din Shopify” → „Ultimele 60 de zile” → comparația cu UpPromote.
2. **Etapa 1b – datele din UpPromote:**
   - Marius exportă din UpPromote lista afiliaților (nume, e-mail, cod, comision %, tip de plată) și soldurile neplătite.
   - Claude le importă și verifică pe 2–3 afiliați că suma calculată de noi = cea din UpPromote.
   - **De aflat din export:** dacă UpPromote calculează cu sau fără TVA (DE-FACUT 21).
3. **Etapa 2 – linkuri și portal:**
   - **Scriptul din temă** (`?ref=` → cookie → `_prime_ref` în coș) e un fișier mic de temă. Marius îl previzualizează și publică.
   - **Portalul `/apps/afiliati`:** înscriere, statistici, cod, link, sold, cerere de voucher.
   - **Politica de cookie-uri:** UpPromote se înlocuiește cu „Prime Afiliați” (aceeași secțiune separată, aprobată 23.10).
4. **Etapa 3 – trecerea:**
   - Modul live: codurile noi și voucherele se fac din aplicație, comenzile primesc eticheta `Prime_afiliat`. Permisiuni în plus: `write_discounts`, `write_orders`.
   - **Anunț către afiliați:** pe e-mail, cu linkul noului portal. Codurile lor rămân aceleași.
   - **Soldurile din UpPromote** se plătesc sau se trec ca sold de pornire în aplicația noastră.
   - Abia apoi se dezinstalează UpPromote.
   - **Risc de verificat înainte:** dacă la dezinstalare UpPromote șterge codurile create de el. Măsura de siguranță: lista completă a codurilor e salvată în D1 și pot fi recreate din aplicație.

## 5. Decizii luate de Claude (de confirmat de proprietar)
- **Comisionul implicit e 10%**, aprobat după expediere + 14 zile, cu sold minim de 500 lei (din contract).
- **Cod contra link:** când pe o comandă apar codul unui afiliat și linkul altuia, câștigă codul (setabil).
- **Baza de calcul e cu TVA** până confirmă contabilul (bifa din Setări o schimbă).
- **Voucherele noi au forma** `AF-NUME-XXXXXX`, ca să se vadă în Shopify că vin din aplicația noastră.
- **Regula „Nu se creează coduri de reducere noi (doar WELCOME5)”** (CLAUDE.md) rămâne valabilă. Aplicația:
  - în modul umbră nu creează niciun cod;
  - în modul live preia exact ce face azi UpPromote: codul unui afiliat nou și voucherul de plată.
  
  Pornirea modului live se face numai cu „da”-ul proprietarului, iar fiecare cod sau voucher se creează doar la un clic al lui în panou.
- **Panoul din Admin arată câți afiliați sunt.** Afișarea e internă. Portalul public (etapa 2) nu va afișa numărul total de afiliați, conform regulii.
