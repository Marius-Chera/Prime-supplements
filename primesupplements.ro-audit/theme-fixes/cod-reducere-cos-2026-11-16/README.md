# Caseta „Ai un cod de reducere?” în coș (16.11.2026)

**Problema (Marius):** mulți clienți de pe telefon se plâng că nu găsesc unde se scrie codul de reducere. Cauza: tema Impact nu are câmp de cod în coș, iar în checkout-ul Shopify de pe mobil câmpul e ascuns sub „Afișează sumarul comenzii”.

**Soluția:** o casetă la vedere în pagina coșului (`/cart`), imediat sub produse, înaintea blocului „Adaugă unul și livrarea e gratuită”. Modelul vine de la exemplul trimis de Marius.

- Clientul scrie codul (orice litere, se transformă în majuscule) și apasă „Aplică” (sau Enter).
- Codul se aplică prin `POST /cart/update.js {discount: "COD1,COD2"}`, iar codurile deja aplicate se păstrează.
- Dacă Shopify răspunde `applicable: false`, codul e scos din coș și apare mesajul „Codul X nu este valid sau nu se aplică produselor din coș”.
- Dacă e valid, pagina se reîncarcă și caseta arată „✓ Codul X e aplicat: economisești Y lei” + „Scoate”. Codul trece mai departe în checkout.
- Codurile aplicate se citesc din `cart.discount_applications` (type `discount_code`). `cart.discount_codes` nu există în Liquid, iar WELCOME5 e reducere pe produs, deci nu apare în `cart_level_discount_applications`.
- Linkurile `/discount/COD` (e-mailuri, afiliați) apar și ele în casetă ca aplicate.

**Fișiere** (MD5 identic cu tema):
- `snippets/prime-cod-reducere.liquid`: 5d20ea513a3e2ec2e17aa8938f1d92f8 (nou)
- `sections/main-cart.liquid`: 12acd84b33acb40ef1f2dd2ebe3619f4 (+ `render 'prime-cod-reducere'` după tabelul cu produse)

**Tema:** „Prime – cod reducere în coș (16.11)” `194329477495`, copie a temei live „Prime – PILOT pagină vizuală (15.11)” `194315649399`. Nepublicată: publicarea o face Marius.

**Test (16.11, browserul aplicației, 375 px):** coș de test cu 1 produs (200 lei). Cu GRESIT123 apare mesajul de eroare și codul nu rămâne în coș. Cu „welcome5” scris cu litere mici se aplică WELCOME5 (190 lei) și caseta arată economia de 10 lei. „Scoate” revine la 200 lei. Fără scroll orizontal. Coșul de test a fost golit.
