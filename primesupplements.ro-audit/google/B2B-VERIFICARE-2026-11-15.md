# Verificare închidere magazin B2B – 15.11.2026 (rutină programată, doar citire)

Context: `INCHIDERE-B2B-2026-10-26.md`. Magazinul B2B (`kuqr0h-en.myshopify.com`, `b2b.primesupplements.ro`) avea dezactivarea automată programată pe 14.11.2026. Decizia din 26.10: fără parolă și fără redirect, iar Marius șterge CNAME-ul `b2b` la furnizorul domeniului (kemo.services). Nu am modificat nimic în Shopify, DNS sau Google.

## Pe scurt

| Ce | Rezultat 15.11 (~17:00) | Stare |
|---|---|---|
| Magazinul B2B | **Dezactivat.** `kuqr0h-en.myshopify.com` → 404, pagina „Magazin indisponibil” („Acest magazin este momentan indisponibil.”) | ✅ |
| CNAME `b2b` | **Încă există:** `b2b.primesupplements.ro` → `shops.myshopify.com` (23.227.38.74) | ❌ de șters de Marius |
| `https://b2b…/products/creatina-creapure` | Nu răspunde: conexiunea HTTPS e refuzată (eroare TLS, Shopify nu mai are certificat pentru domeniu) | ✅ mort |
| `http://b2b…/products/creatina-creapure` | 409, „error code: 1001” (domeniul nu mai e legat de niciun magazin Shopify) | ✅ mort |
| `kuqr0h-en.myshopify.com/products.json` | 429 „local_rate_limited” la 3 încercări (14:58, 17:01); niciun produs returnat | ✅ nu mai expune prețurile |
| Google `site:b2b.primesupplements.ro` | **~2 rezultate:** `/products/combat-pro`, `/collections/pudra-proteica` | scade |
| GSC – pagini b2b indexate | 7 (datele de indexare nu s-au actualizat din 9.11; „Last update: 11/9/26”) | față de ~110 pe 26.10 |
| GSC – Performanță, filtru pagină `b2b.primesupplements.ro`, 7 zile | 1 pagină (`/collections/pudra-proteica`), 2 afișări, 0 clicuri | aproape zero |
| Proprietate GSC separată pentru b2b | Nu există (contact@ nu are acces la `https://b2b.primesupplements.ro/`) | nimic de șters |

## Detalii

### 1. DNS
```
nslookup -type=CNAME b2b.primesupplements.ro
b2b.primesupplements.ro  canonical name = shops.myshopify.com
```
Același rezultat prin 8.8.8.8 (Google DNS). Înregistrarea nu a fost ștearsă.

### 2. HTTP
- `curl -sI https://b2b.primesupplements.ro/products/creatina-creapure` → fără răspuns: `SEC_E_ILLEGAL_MESSAGE` (handshake TLS respins de Shopify).
- `http://` pe aceeași adresă → `409`, corp „error code: 1001”.
- `curl -sI https://kuqr0h-en.myshopify.com/` → `404`, titlul paginii „Magazin indisponibil”.
- `https://kuqr0h-en.myshopify.com/products.json` → `429 local_rate_limited` (nu returnează produse).

### 3. Google
- Search Console, proprietatea de domeniu `primesupplements.ro`: Indexed 601, Not indexed 2.8K. Datele de indexare sunt tot cele din 9.11 („Last update: 11/9/26”), deci numărul b2b rămâne cel de atunci: 7 (3 produse, 3 colecții, 1 pagină). Lista completă de 601 nu s-a putut afișa pe 500 de rânduri (fereastra aplicației era ascunsă); se recitește la 23.11.
- Performanță (Web, 7 zile, filtru pagină conține `b2b.primesupplements.ro`): 1 pagină, 2 afișări, poziția medie 16, 0 clicuri.
- google.com `site:b2b.primesupplements.ro`: „Aproximativ 2 rezultate”: Combat PRO și Pudră proteică.

## Concluzie și ce rămâne

Magazinul B2B s-a dezactivat și nu mai servește nimic: adresele vechi nu se mai deschid, iar prețurile vechi nu mai sunt publice. Din Google au ieșit aproape toate: ~110 → 7 în GSC (9.11) → 2 în `site:` (15.11).

**De făcut de Marius (eu nu am acces și nu modific nimic):** la furnizorul domeniului (kemo.services, același panou unde sunt înregistrările CNAME pentru e-mail) ștergi **doar** înregistrarea `CNAME b2b → shops.myshopify.com`. Nu atingi celelalte înregistrări (`@`, `www`, cele pentru e-mail). După ștergere, `nslookup b2b.primesupplements.ro` nu mai trebuie să răspundă, iar erorile robots.txt pentru b2b dispar din GSC.

Nu e nevoie de cereri de eliminare (Removals) în GSC: adresele moarte ies singure. Urmărirea până la 0 se face la „Verificare GSC 23.11”.
