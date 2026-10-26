# Curățenie B2B + piața Ungaria în Shopify (26.10.2026, cererea proprietarului)

Decizie: proprietarul vrea tot ce ține de B2B și de platforma Ungaria scos din magazinul principal; magazinul B2B (b2b.primesupplements.ro) îl șterge el ulterior.

## Inventar (înainte)
- Meniuri (main-menu, main-menu-desktop, footer „Pagini legale”, meniu-footer): fără linkuri B2B (scoase pe 17.10).
- Pagini: fără pagină B2B (ștearsă pe 17.10; redirectul `/pages/inregistrare-b2b` → `/pages/contact` rămâne).
- Redirecturi cu țintă b2b: 0. Colecții/produse/companii B2B: 0.
- Articole live (151): niciun link către b2b.primesupplements.ro.
- Temă (live „Prime – Chat în stânga (23.10)” și „Prime – BLACK FRIDAY (se publică 30.10)”, fișiere identice): atribute inerte `bss-b2b-*` de la aplicația BSS B2B (dezinstalată) în 8 fișiere, CSS-ul BSS inlinat în `layout/theme.liquid`, scriptul `assets/bss-custom.js` încărcat în `<head>`, fișierele `assets/bss-custom.css` și `assets/bss-custom.js`.
- Piața Ungaria: dezactivată din 22–23.10, dar încă existentă (gid://shopify/Market/97830830455, regiunea HU, fără prezență web); zona de livrare „Hungary” cu 2 tarife în HUF (Cargus Gyorsfutár 3900 HUF, Cargus Ingyenes szállítás 0 HUF) în profilul General; limba `hu` nepublicată în Shop locales.
- `/ro-hu/*`: 575 redirecturi 301 în tabelă (rămân, Google le mai folosește: 417 duplicate + 4 indexate în GSC pe 26.10).

## Ce s-a făcut (Admin API, 26.10)
1. `deliveryProfileUpdate` – zona de livrare Hungary (gid://shopify/DeliveryZone/646731989367) ștearsă; rămâne doar Romania.
2. `marketDelete` – piața Ungaria ștearsă.
3. `shopLocaleDisable("hu")` – limba maghiară scoasă din magazin.
4. Temă: 8 fișiere editate (diff-urile din acest folder): scoase toate atributele `bss-b2b-*`, div-ul `bss-b2b-qb-table`, blocul `<style>` BSS inlinat și `<script src="bss-custom.js">` din `layout/theme.liquid`; `assets/bss-custom.css` și `assets/bss-custom.js` golite (un comentariu; ștergerea fișierelor e blocată prin API – se pot șterge din Admin → Edit code). Aplicate pe „Prime – BLACK FRIDAY (se publică 30.10)” și pe copia „Prime – fără B2B (26.10)” a temei live. Tema live NU a fost atinsă (API-ul nu permite scrierea pe tema publicată); proprietarul publică copia sau așteaptă publicarea temei de Black Friday pe 30.10.
5. Nimic vizibil nu se schimbă: atributele erau inerte (aplicația nu mai există), CSS-ul se aplica doar elementelor cu acele atribute.

## Rămân la proprietar
- Ștergerea magazinului B2B (Shopify admin al magazinului B2B) și apoi a înregistrării DNS CNAME `b2b.primesupplements.ro` de la registrar.
- Publicarea temei „Prime – fără B2B (26.10)” (sau, de pe 30.10, tema de Black Friday, care conține deja curățenia).
- Opțional: ștergerea fișierelor goale `assets/bss-custom.css` / `assets/bss-custom.js` din Admin → Online Store → Edit code.
