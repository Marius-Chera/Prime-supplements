# Paginile 404 văzute de Google și redirecționările propuse (17.11.2026)

Cerut de Marius pe 17.11 („citește și propune”). **Sursa:** Ablestar nu s-a mai putut citi. Ca să deschidă panoul, cerea aprobarea planului Basic, de 10 $ la 30 de zile, cu 7 zile de probă. Claude NU a aprobat abonamentul. Apoi, la cererea lui Marius („atunci dezinstalează Ablestar”), Claude a dezinstalat aplicația; cele 1.169 de redirecționări native au rămas, verificat prin Admin API. Lista de mai jos vine din **Google Search Console → Indexarea paginilor → Nu a fost găsită (404)**: **87 de adrese**, verificate una câte una pe site pe 17.11.

## Ce am găsit
- **Rezolvate deja (circa 50):** 11 pachete existau din nou (200), iar articolele șterse în curățenia blogului, adresele vechi WooCommerce (`/despre-noi/`, `/contact`, `/politica-de-cookies/`, categoriile cu `?orderby=`), linkurile trunchiate (`/products/prime-whey-`, `/collections/crema-de-`, `/products/combat-pro-`) și produsele redenumite făceau deja 301 spre pagina corectă. Google le scoate singur din raport la următoarea trecere.
- **Gunoi tehnic, de ignorat (circa 15):** `/b`, `/cdn`, `/wpm`, `/${t}`, `/v1/produce`, `/api/event/collect`, `/wp-admin/admin-ajax.php`, `/wp-content/plugins/`, `/ro-hu/search`, `/ro-hu/cart`, `?add-to-cart=…`, `b2b.primesupplements.ro/…`. Sunt adrese de scripturi sau de boți, nu pagini. 404 e răspunsul corect.
- **Fără echivalent, rămân 404:** `/wishlist/`, `/megamenus/mega-menu-1/`, `/ana-maria-bugan/` (pagini vechi WooCommerce). O redirecționare spre homepage ar fi tratată de Google tot ca 404 („soft 404”).

## Redirecționările (14): CREATE pe 17.11 (Marius: „Da, creează-le”), verificate live (toate fac 301 spre țintă; varianta `/ro-hu/` a tricoului e acoperită, iar parola uitată duce la autentificarea Shopify)
| De la | La | De ce |
|---|---|---|
| `/products/tricou-sala-made-of-iron-bumbac-premium-negru` | `/products/tricou-sala-suffer-to-dominate-bumbac-premium-negru` | tricoul Made of Iron a fost șters; e cel mai apropiat tricou Prime negru (aceeași serie). Acoperă și `/ro-hu/…` |
| `/blogs/news/tagged/arderea-grasimilor` | `/collections/arzator-de-grasimi` | eticheta de blog nu mai există |
| `/blogs/news/tagged/preworkout` | `/collections/suplimente-pre-workout` | eticheta de blog nu mai există |
| `/categorie-produs/arzatoare-de-grasimi/feed` | `/collections/arzator-de-grasimi` | feed RSS vechi WooCommerce |
| `/categorie-produs/suplimente/vitamine-si-minerale/feed` | `/collections/vitamine-si-minerale` | idem |
| `/categorie-produs/pudre-proteice/feed` | `/collections/pudra-proteica` | idem |
| `/categorie-produs/batoane-proteice/feed` | `/collections/batoane-proteice` | idem |
| `/categorie-produs/alimente-sanatoase/feed` | `/collections/alimente-sanatoase` | idem |
| `/categorie-produs/suplimente/creatina/feed` | `/collections/creatina` | idem |
| `/product-category/suplimente/feed` | `/collections/suplimente-sala` | idem |
| `/produs/vitamin-c-1000-80-caps/feed` | `/products/vitamin-c-1000-80-caps` | idem |
| `/produs/ashwagandha-ksm-66/feed` | `/products/ashwagandha-ksm-66` | idem |
| `/my-account/lost-password` | `/account/login` | contul vechi WooCommerce; clientul ajunge la autentificare |
| `/products/prime-` | `/collections/all` | link extern trunchiat, din care nu se știe ce produs era |

Toate țintele răspund 200 (verificat pe 17.11). Redirecționările se creează în Shopify (Magazin online → Navigare → Redirecționări URL), prin Admin API, după „da”-ul lui Marius. Ele nu schimbă nimic din designul sau conținutul site-ului.
