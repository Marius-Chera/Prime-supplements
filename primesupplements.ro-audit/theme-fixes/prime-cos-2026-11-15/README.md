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
