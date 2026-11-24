# Factură pe firmă: CUI obligatoriu (24.11.2026)

Cerut de Marius după comanda **Nr.9838** (GREEN 2 ENERGY SRL), facturată cu **PRS16248** pe numele firmei, dar fără CUI: pe site nu exista câmp pentru CUI.
Planul Shopify e Grow, nu Plus, deci în pagina de plată Shopify nu se pot adăuga câmpuri obligatorii. Soluția are două părți.

## 1. În coș (tema)
- Deasupra butonului „Finalizează comanda” apare căsuța **„Vreau factură pe firmă”**. Cine o bifează trebuie să scrie CUI-ul și să apese **Verifică**.
- CUI-ul se verifică întâi după cifra de control, apoi la ANAF, prin Total Admin (`/public/anaf`). Firma găsită apare cu verde, iar pe coș se salvează `Factura pe firma` = Da, `CUI` (cu RO la plătitorii de TVA), `Denumire firma` și `Nr. Reg. Com.`. Acestea ajung pe comandă.
- Cât timp căsuța e bifată și CUI-ul nu e verificat, „Finalizează comanda” nu merge: apare mesajul roșu și pagina sare la casetă. Dacă CUI-ul scris e valid, apăsarea pe buton îl verifică și apoi deschide singură plata.
- Fișiere: `snippets/prime-factura-firma-js.liquid` (nou) și `snippets/prime-afiliati-ref.liquid` (un rând adăugat la final, care încarcă snippet-ul de mai sus; afiliati-ref e randat deja în `layout/theme.liquid`). Fișierele mari ale temei nu au fost atinse: caseta se pune singură, din JS.
- Tema nepublicată: **„Prime – factură pe firmă CUI în coș (24.11)”**, `194442297719`, copie a temei live „Prime – schema articole + FAQ (24.11)”. Sumele de control (md5) ale fișierelor din temă sunt identice cu cele din acest folder.
- Testat 24.11 în previzualizare (`?preview_theme_id=194442297719`), fără intrare în checkout. Butonul e oprit fără CUI (0 trimiteri ale formularului). CUI greșit: „CUI-ul nu e corect”. CUI-ul Prime: găsit la ANAF și salvat pe coș. După CUI-ul verificat, butonul trece. Pe telefon nu există derulare laterală (`test-cos-telefon.jpg`). Magazinul nu folosește coșul lateral (coșul e pagină), dar caseta se pune și acolo dacă îl porniți.

## 2. În Total Admin (plasa de siguranță) – LIVE din 24.11
- Comanda cu firmă la „Firmă” (sau cu „Vreau factură pe firmă” bifat), dar fără CUI valid: **nu se facturează și nu primește AWB**. În Comenzi apare „⛔ nu e gata: factură pe firmă (…) fără CUI”.
- În coloana „Stare” e câmpul **CUI**. Colega sună clientul, scrie CUI-ul și apasă **„Caută la ANAF și salvează”**. Denumirea, sediul, Reg. Com. și plătitorul de TVA vin de la ANAF și intră pe factura Oblio. Butonul **„E persoană fizică”** deblochează fără CUI. Linkul „schimbă” anulează.
- Clienții care scriu CUI-ul direct la „Firmă” (ca la comenzile 10461 și 10477) nu mai sunt blocați: CUI-ul e recunoscut și firma se ia de la ANAF.
- Cod: repo `prime-expediere`, commit `5f4aafb` (`src/calc/billing.ts`, `src/integrations/anaf.ts`, `src/billing-fixes.ts`, migrarea `0020_billing_fixes.sql`), 234 de teste, versiunea Cloudflare `5e75719d`.

## Rămân
- **Marius publică tema** (publicarea e blocată pentru Claude): Shopify → Magazin online → Teme → „Prime – factură pe firmă CUI în coș (24.11)” → Publicare. Atenție: dacă între timp se publică altă temă, aceasta trebuie refăcută pe tema nouă (2 fișiere).
- Facturi deja emise greșit, de corectat în Oblio (storno + factură nouă cu CUI, doar cu acordul lui Marius / contabilei): **PRS16248** (9838, GREEN 2 ENERGY SRL, CUI necunoscut – îl cere colega), **PRS17068** (10461, la „Firmă” scris 39725098) și **PRS17078** (10477, la „Firmă” scris 48717841). Ultimele două au ca nume de client numărul CUI-ului și nu au CUI fiscal.
