# Politica de cookie-uri: UpPromote → Prime Afiliați (propunere, 14.11.2026)

**Stare: de aprobat de Marius. Nimic publicat.** Ultima versiune publicată: `backups/cookies-clarity-2026-10-23/politica-de-cookies.publicata-2026-10-28.html`.

Se schimbă doar două locuri, cu același sens ca textul aprobat pe 23–24.10 (atribuirea afiliatului merge de la prima vizită, într-o secțiune separată). Restul politicii rămâne identic.

## Când se publică
- **Varianta recomandată: odată cu scoaterea UpPromote** (după 1.12, înainte de 11.12). Până atunci pe site merg ambele scripturi.
- Dacă tema cu scriptul nostru se publică înainte de 1.12, se publică imediat varianta „Perioada de trecere” (ambele rânduri).

## 1. Fraza de la început (paragraful 2)
**Acum:** „… Singura excepție este cookie-ul programului nostru de afiliere (UpPromote), descris la punctul 4, care funcționează de la prima vizită. …”

**Devine:** „… Singura excepție este cookie-ul programului nostru de afiliere (Prime Afiliați), descris la punctul 4, care funcționează de la prima vizită. …”

## 2. Punctul 4
**Titlul rămâne:** „4. Cookie-ul programului de afiliere (de la prima vizită)”

**Textul devine:**
> Prime Supplements are un program de afiliere: partenerii (sportivi, antrenori, creatori de conținut) ne recomandă magazinul și primesc un comision pentru comenzile venite prin linkul lor. Ca să putem plăti corect acest comision, când intrați pe site prin linkul unui partener, salvăm în browser codul linkului acelui partener (nu un identificator al dumneavoastră), din prima vizită, inclusiv dacă refuzați cookie-urile de analiză și de marketing. Același cod se adaugă, ascuns, în coșul de cumpărături, ca să ajungă în comandă. Îl folosim doar ca să atribuim comanda partenerului care v-a recomandat, nu pentru reclame. Programul de afiliere îl administrăm chiar noi, în aplicația proprie Prime Afiliați.

| Serviciu | Exemple | Scop | Durată |
|---|---|---|---|
| Prime Afiliați (programul de afiliere) | prime_ref (cookie) și atributul ascuns al coșului `_prime_ref` | atribuie comanda partenerului care v-a recomandat magazinul, ca să-i putem plăti comisionul | 30 de zile |

**Paragraful de după tabel rămâne**, cu „identificator” înlocuit cu „cod”: „Dacă nu doriți acest cod, îl puteți șterge oricând din setările browserului (cookie-urile și datele site-ului primesupplements.ro). Comanda se poate plasa la fel, doar că nu va mai fi atribuită unui partener.”

## Perioada de trecere (doar dacă tema nouă e publicată cât UpPromote e încă instalat)
Fraza de la început spune „(Prime Afiliați și, până în decembrie 2026, UpPromote)”, iar tabelul are ambele rânduri:

| Serviciu | Exemple | Scop | Durată |
|---|---|---|---|
| Prime Afiliați (programul de afiliere) | prime_ref (cookie) și atributul ascuns al coșului `_prime_ref` | atribuie comanda partenerului care v-a recomandat magazinul | 30 de zile |
| UpPromote (platforma veche a programului, până în decembrie 2026) | _up_clid (cookie și stocare locală) | la fel | 1 an |

## De făcut după publicare
- **Pandectes:** o scanare nouă; `prime_ref` intră la „Strict necesare” (aceeași categorie ca `_up_clid`, decizia din 23.10). După dezinstalarea UpPromote dispar `_up_clid`, `_up_core_boosted`, `_up_pixel_cart_fi` și `__up_exposeActionContext`.
- **Durata de 30 de zile** = setarea „Câte zile ține minte site-ul linkul” din aplicație și `DAYS = 30` din `snippets/prime-afiliati-ref.liquid`. Dacă exportul UpPromote arată altă durată a cookie-ului (Settings → General → Cookie), le aliniem pe toate trei înainte de publicare, ca afiliații să nu piardă comenzi.
