# Dezinstalarea Product Migration și Ablestar Link Manager (pași pentru Marius, 17.11.2026)

Cerut de Marius pe 17.11 („Da, pregătește pașii”). Dezinstalarea o face Marius, pentru că e o acțiune în magazin care nu se poate anula. Claude verifică după.

**Stare la 17.11, citită prin Admin API:** 19 aplicații instalate și **1.169 de redirecționări URL native** în Shopify. Redirecționările făcute cu Ablestar stau în Shopify, nu în aplicație.

## 0. Înainte (2 minute): copia redirecționărilor
Shopify Admin → **Magazin online → Navigare** → **Redirecționări URL** (sus dreapta „Vezi redirecționările URL”) → **Exportă** → „Toate redirecționările” → CSV. Fișierul vine pe e-mail; îl păstrezi ca rezervă.

## 1. Product Migration (aplicație custom veche, de la mutarea de pe WooCommerce)
1. Shopify Admin → **Setări** (jos stânga) → **Aplicații** → **Dezvoltă aplicații** (butonul de sus dreapta; poate apărea ca „Dezvoltare aplicații”).
2. Deschizi **Product Migration**. **Nu atinge Primesupplements App și nici Oblio din aceeași listă.**
3. Apeși **Dezinstalează aplicația** (jos în pagină sau din meniul „…”) și confirmi.
4. Produsele, clienții și comenzile importate rămân. Se taie doar accesul aplicației la magazin.

## 2. Ablestar Link Manager
1. Shopify Admin → **Setări → Aplicații** → la **Ablestar Link Manager**, meniul **„…”** → **Dezinstalează** → confirmi.
2. Dacă aplicația avea un abonament plătit, se oprește odată cu dezinstalarea. Poți verifica în **Setări → Facturare → Abonamente**.

## 3. După (le face Claude, doar citire)
- verifică dacă numărul de redirecționări a rămas 1.169;
- testează câteva adrese vechi (WooCommerce), care trebuie să facă în continuare 301;
- verifică lista de aplicații;
- trece totul în JURNAL.

Linkurile rupte de pe site le verifică de acum Prime Vizibilitate, în fiecare duminică (tab-ul „Sănătate site”).
