# Prime Expediere – modul umbră pornit (13.11.2026)

Continuarea lui `PRELUARE-CONTROL-SI-APLICATIE-PROPRIE-2026-11-13.md` (§5, etapa 1). Codul e în repo-ul privat `Marius-Chera/prime-expediere` (branch `main`).

## Ce rulează
- **Server:** Cloudflare Worker `prime-expediere` pe contul Prime (contact@primesupplements.ro, `74fe61db11fe75bb1e697db61733e6bd`). Adresa: `https://prime-expediere.prime-expediere.workers.dev`. Bază de date D1 `prime-expediere` (`c0fb513c-dc6b-46c6-a73b-96b235d16274`). Cost: 0 (plan gratuit).
- **Aplicația Shopify:** Dev Dashboard → Prime Expediere (ID `447134171137`, Client ID `6f45f135df75486147a20e187d200b1e`), versiunea **`v1-mod-umbra`**, încorporată în admin. Permisiuni **doar de citire**: `read_orders`, `read_products`, `read_inventory`. Instalată de Marius pe 13.11, apare în Shopify Admin → Aplicații → **Prime Expediere**.
- **Secrete** (doar în Cloudflare, niciodată în cod sau chat): `SHOPIFY_API_SECRET` (lipit de Marius direct în terminal), `ENC_KEY` (generat aleator; criptează în D1 tokenul Shopify și cheile Oblio/Cargus).
- **Wrangler pentru Prime** e separat de Chera: `node scripts/wr.mjs <comandă>` (configurația în `%USERPROFILE%\.wrangler-prime`). `npm run deploy` publică pe contul Prime.

## Ce face (versiunea 0.1, mod umbră)
1. Citește ultimele 20 / 50 / 100 de comenzi.
2. Calculează **factura Oblio** pe care ar emite-o: seria PRS, descărcare din gestiune (`useStock 1`), pachetele Shopify deja desfăcute pe componente, prețul cu reducerea inclusă (dacă reducerea nu se împarte exact pe bucăți, linia se împarte în n-1 + 1 bucăți, ca totalul să fie la ban), transportul ca serviciu cu TVA 21 %, încasarea „Card” la comenzile plătite online, neîncasată la ramburs.
3. Calculează **AWB-ul Cargus**: ramburs = totalul la plata la livrare, 0 la card; valoarea declarată = totalul; plătitor expeditorul; fără deschidere colet, sâmbătă sau dimineața; verifică telefonul, localitatea, județul și codul poștal.
4. Le **compară** cu ce a făcut aplicația veche: atributele `INVOICE_*`, etichetele `FACTURA-<nr>` / `INVOICE_CREATED` / `oblio-invoiced` / `AWB_GENERATED`, metafield-urile `custom.*` și `shipping.*`, expedierea cu numărul Cargus, arhivarea. Când Oblio e conectat, compară și cu factura reală din Oblio (total, produse pe cod EAN, cantități, prețuri, TVA, gestiune, transport, încasare).
5. **Nu emite nimic.** Orice cerere care ar crea factură/AWB sau ar modifica Shopify e blocată în cod (`src/guard.ts`), verificat prin teste. Permisiunile Shopify sunt doar de citire.
6. Ecranul **Setări**: Oblio (e-mail + cheie API → firma, seria, gestiunea se aleg din listă) și Cargus (cheie API + utilizator + parolă → punctul de ridicare). Cheile le introduce Marius; se salvează criptat și nu se mai afișează.

## Rezultatul pe ultimele 50 de comenzi (13.11, 15:09, Oblio încă neconectat)
| | Comenzi |
|---|---|
| **Identice cu aplicația veche** | **46** |
| Cu diferențe | 0 |
| Neprocesate încă (fără factură/AWB) | 2 |
| Anulate | 2 |
| Greutate trimisă la Cargus subestimată cu ≥ 0,5 kg | **21** |

- Prima rulare a avut o diferență (Nr.10324: 612,01 față de 612,00): rotunjirea mea la o reducere care nu se împarte exact pe 2 bucăți. Reparat în aceeași oră; a doua rulare: 0 diferențe.
- Câmp cu câmp, aplicația veche e reprodusă exact: seria, totalul, numele clientului, etichetele, rambursul, valoarea declarată, greutatea, serviciul „ground”, `envelopes 1`, plătitorul, linkurile de urmărire.
- **Greutatea (confirmată):** aplicația veche trimite greutatea din Shopify, iar 19 produse au acolo 0 kg, deci coletul pleacă cu 0,1 kg. La 21 din 50 de comenzi diferența față de greutatea reală e de cel puțin 0,5 kg. Prime Expediere folosește greutatea din Shopify, iar unde lipsește o citește din titlu („1 kg”, „18 plicuri x 10 g”) sau pune 0,2 kg.

### Produsele fără greutate în Shopify (de completat de Marius în produs → Expediere → Greutate)
| SKU | Produs |
|---|---|
| 6421766064237 | Cremă de orez Prime Creamy Rice – tort de ciocolată, 1 kg |
| 6421766064220 | Cremă de orez Prime Creamy Rice – brioșă cu afine, 1 kg |
| 6421766064251 | Cremă de orez Prime Creamy Rice – biscuiți cu cremă, 1 kg |
| 6421766064244 | Cremă de orez Prime Creamy Rice – plăcintă cu cocos, 1 kg |
| 8594013599726 | Băutură instant Frutilu – lămâie, 10 g |
| 8594013599757 | Băutură instant Frutilu – portocale, 10 g |
| 8594013598101 | Băutură instant Frutilu – mango, 10 g |
| 8594013599900 | Băutură instant Frutilu cu aromă de ciocolată, 10 g |
| 8594013591126 | Băutură instant Frutilu – lămâie și lime, 10 g |
| SHAKER-01 | Shaker MNX 600 ml – negru transparent |
| PRIME-SHAKER-CUSTOMISED | Shaker Prime 600 ml – negru transparent |
| FRUTILU-18 | Băuturi instant Frutilu – set degustare, 18 plicuri x 10 g |
| 8594013599702 | Băutură instant Frutilu cu aromă de ceai cu piersici, 10 g |
| 8594013599696 | Băutură instant Frutilu cu aromă de cola, 10 g |
| 8594013598118 | Băutură instant Frutilu Sport – portocale roșii, 10 g |
| 8594013599924 | Băutură instant Frutilu cu aromă de caise, 10 g |
| 8594013599764 | Băutură instant Frutilu – fructe tropicale, 10 g |
| 50012905 | Hanorac MNX XForce 2.0 – negru |
| 70031304 | MNX Ribbed pants Hammer 2.0, white |

Doar cele din ultimele 50 de comenzi; restul catalogului poate avea aceeași problemă. Nu am modificat produsele (regula: produsele și stocul doar cu acordul lui Marius).

## Ce urmează
1. **Marius conectează Oblio** în Prime Expediere → Setări (e-mailul contului + cheia API din Oblio → Setări → Date cont), apoi rulăm din nou raportul: se compară și cu factura reală din Oblio, linie cu linie (coduri, prețuri, reducere pe linie separată sau nu, încasare). Abia atunci știm sigur că facturile ar ieși identice.
2. **Cargus**: când vin datele de la agent (cheie API + utilizator + parolă WebExpress), Marius le pune în Setări; verificăm punctul de ridicare și nomenclatorul de localități.
3. Greutățile: Marius completează cele 19 produse în Shopify (sau aprobă să le completez eu).
4. 15 minute cu cine procesează comenzile dimineața (ce butoane apasă, ce tipărește).
5. Etapa 2: emiterea reală, întâi pe o serie de test Oblio și cu AWB-uri anulate, verificate de Marius.

## Note tehnice
- API-ul Oblio: `https://www.oblio.eu/api` (token din `client_id` = e-mail, `client_secret` = cheia API; listă facturi `docs/invoice/list` cu `withProducts`). API-ul Cargus: `https://urgentcargus.azure-api.net/api` (`Ocp-Apim-Subscription-Key` + `LoginUser`; AWB prin `Awbs/WithgetAwb`, câmpurile din modulul oficial Cargus pentru WooCommerce). Forma produselor din lista Oblio nu e documentată public: se citește defensiv și se verifică la prima rulare cu Oblio conectat.
- Datele clienților din rulări stau doar în D1 (Cloudflare Prime), 60 de zile; în repo nu intră date personale (testele folosesc date inventate).
