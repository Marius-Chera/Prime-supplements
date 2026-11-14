# Prime Coș – fișierele din temă (15.11.2026)

Înlocuiește aplicația **Delivery Estimator** și adaugă upsell / cross-sell, fără server și fără cost. Planul: `../../livrare/PRIME-COS-PLAN-2026-11-14.md`.

**Tema:** „Prime – Prime Coș: livrare + upsell (15.11)”, `gid://shopify/OnlineStoreTheme/194315026807`. E o copie a temei live „Prime – link afiliați Prime Afiliați (14.11)” din 15.11 și **nu e publicată**.
Previzualizare: https://primesupplements.ro/products/creatina-creapure?preview_theme_id=194315026807

Toate fișierele de aici sunt identice cu cele din temă (verificat cu MD5 prin Admin API). Cele 3 fișiere JSON modificate (`templates/product.json`, `templates/product.creatina2.json`, `config/settings_data.json`) nu sunt copiate aici: diferențele sunt descrise mai jos, iar conținutul se citește din temă.

## Fișiere noi
| Fișier | Ce face |
|---|---|
| `assets/prime-cos.js` (~6 KB) | Calculează data livrării: ora României, predare la Cargus până la 14:00, luni–vineri, fără sărbătorile legale 2026–2027. Butoanele din coș: „Adaugă”, „Ia pachetul”, „Ia 500 g / 2 kg / cutia”. |
| `assets/prime-cos.css` | Stilurile: culorile temei, roșu #e91d23, butoane rotunde, verde doar pentru economii; desktop + mobil. |
| `snippets/prime-livrare.liquid` | Modulul 1. Estimarea livrării: un card pe pagina de produs și un rând compact în coș. Se ascunde la variantele fără stoc. |
| `snippets/prime-cos-perechi.liquid` | Perechile „Merge perfect cu”, alese pe linii de produs. Fiecare listă are rezerve, pentru produsele fără stoc. |
| `snippets/prime-cos-card.liquid` | Cardul mic de produs: poză, titlu, alegerea variantei, preț și „+ Adaugă”. |
| `snippets/prime-cos-merge-cu.liquid` | Modulul 2. „Merge perfect cu” pe pagina de produs: 3 produse randate pe server (linkuri reale în HTML). |
| `snippets/prime-cos-cart.liquid` | Modulele 3 și 4: (a) produsele care închid diferența până la 300 lei sau, peste prag, cele potrivite cu ce e în coș; (b) „Ia pachetul”, cu pachetele existente din Reduceri; (c) varianta mai avantajoasă (creatină 500 g, Prime Whey 2 kg, cutie de fiole, batoane sau plicuri de la 3 bucăți în sus). |

## Fișiere modificate
- `sections/main-cart.liquid`: 2 rânduri noi, estimarea livrării sub bara de 300 lei și blocul Prime Coș sub lista de produse.
- `sections/variant-added.liquid`: fereastra „Adăugat în coș” are, sub butoane, 2 produse pentru livrarea gratuită.
- `templates/product.json` și `templates/product.creatina2.json`: blocul aplicației Delivery Estimator e înlocuit cu `{% render 'prime-livrare' %}`; blocul nou `{% render 'prime-cos-merge-cu' %}`; blocul gol „Merge perfect cu” (Search & Discovery) e dezactivat. Din `product.creatina2.json` a fost scoasă secțiunea dezactivată `custom_liquid_n6Tn8B`, o copie nefolosită a tabului „Despre produs”. Tabul vizibil a rămas identic (comparat HTML-ul randat, site vs copie).
- `config/settings_data.json`: embed-ul global al aplicației Delivery Estimator e oprit (`disabled: true`).

## Modulul 5 – măsurare
Fiecare produs adăugat din aceste blocuri primește proprietatea ascunsă `_sursa`, vizibilă în comandă, în admin:
`merge-cu` · `prag-livrare` · `potrivit-cos` · `pachet` · `varianta-mare`.

## Testat pe copie (15.11.2026, browserul aplicației, coș de test golit la final)
- Pagina de produs (desktop 1366 px și mobil 375 px): „Ajunge marți, 17 nov. – miercuri, 18 nov. / Comanzi acum și coletul pleacă mâine, luni.” 3 produse „Merge perfect cu”. Fără scripturi Delivery Estimator.
- „+ Adaugă” din „Merge perfect cu”: produs adăugat cu `_sursa: merge-cu`. Fereastra „Adăugat în coș” arată „Completează coșul până la livrarea gratuită · Mai ai 245,00 lei” + 2 produse.
- Coș cu Creatină 300 g + Magneziu: ofertă „Cu încă 110,00 lei iei Pachet Strength … economisești 70,00 lei”. După „Ia pachetul”, coșul conține doar pachetul, cu `_sursa: pachet`. Produsele din pachet nu mai sunt recomandate.
- Coș cu 3 fiole Energy Pump: „Cutia de 20 bucăți iese 6,65 lei/buc. în loc de 9,50 lei”. După „Ia cutia”, coșul conține cutia, cu `_sursa: varianta-mare`.
- Coș cu Creatină 300 g: „Cutia de 500 g iese 28,00 lei/100 g în loc de 30,00 lei/100 g”.

## La publicare (o face Marius sau Claude, cu „da”)
1. Dacă tema live s-a schimbat între timp (de ex. afiliații din 28.11), se reface copia și se urcă din nou fișierele de aici.
2. Se publică tema. Se verifică o pagină de produs și coșul.
3. Se dezinstalează Delivery Estimator din Shopify (Aplicații).

## Adăugat 15.11: bula WhatsApp proprie (înlocuiește Dondy)
- `snippets/prime-whatsapp.liquid` (nou): link simplu, fără JavaScript, identic ca aspect și mesaj cu bula Dondy (cerc verde 55 px, dreapta 10 px, jos 90 px; „Buna ziua, doresc mai multe informații.” + linkul paginii). Ascuns până la alegerea cookie-urilor.
- `layout/theme.liquid`: `{%- render 'prime-whatsapp' -%}` înainte de `</body>` (nu pe pagina cu parolă).
- `config/settings_data.json`: embed-ul Dondy oprit (`disabled: true`).
- Testat în previzualizare (desktop + 375 px): link identic cu Dondy, scriptul Dondy nu se mai încarcă, nu acoperă bara sticky.
- **La publicare:** pe lângă Delivery Estimator, Marius dezinstalează și **Dondy** din Aplicații.

## 15.11 (după-amiază) – golul de sub poză, pe desktop (cerut de Marius: „spațiul e cam gol… gândește-te ca cel mai tare designer”)
- **Galerie fixă:** pe ecrane de cel puțin 1000 × 920 px, poza produsului rămâne vizibilă cât timp derulezi coloana din dreapta, la fel ca bara de cumpărare a temei. Se oprește exact la capătul secțiunii (verificat: nu intră peste tab-uri).
- **Banda „Comanzi fără griji”** (4 garanții, toate reale): Expediere în aceeași zi (comenzile de până la 14:00, luni–vineri) · Retur în 14 zile (link la politica de retur) · Plătești cum vrei (card, ramburs sau transfer) · Întrebări? Scrie-ne pe WhatsApp. Pe desktop stă sub poză, în spațiul rezervat de sub galerie (`padding-bottom`, poziționată absolut), ca să nu se strice grila galeriei. Pe mobil stă sub cardul de livrare, compactă (iconiță + titlu, 2 × 2).
- Fișiere schimbate: `snippets/prime-livrare.liquid`, `assets/prime-cos.css`, `assets/prime-cos.js` (MD5 identic cu tema).

## 15.11 (seara) – fără „Retur în 14 zile” la vedere (cerut de Marius)
Marius: „nu aș vrea să afișăm chiar așa «la vedere» în pagina de produs” (returul rămâne doar în politica de retur). Banda are acum 3 garanții: Expediere în aceeași zi · Plătești cum vrei · Întrebări? Scrie-ne. Pe desktop, 3 coloane sub poză; pe mobil, 3 pătrățele pe un rând (iconiță + titlu). Pentru că tema publicată nu se poate scrie prin API, schimbarea e pe copia „Prime – fără retur la vedere (15.11)” (`gid://shopify/OnlineStoreTheme/194315223415`), făcută din tema live Prime Coș. **O publică Marius.** Fișiere: `snippets/prime-livrare.liquid`, `assets/prime-cos.css` (MD5 identic cu copia).
