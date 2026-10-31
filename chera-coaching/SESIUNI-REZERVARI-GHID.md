# Sesiuni cu rezervare – ghid pentru Marius (27.10.2026)

Pe site sunt 4 sesiuni cu calendar și plată (prețuri din 1.11.2026 – toate 300 lei, decizia lui Marius): **Posing live · Sibiu** (300 lei / 30 min), **Antrenament 1 la 1 · Sibiu** (300 lei / 90 min), **Posing online** (300 lei / 30 min, video call în chat), **Consultație video** (300 lei / 30 min). Sesiunile live sunt la **Evo Gym Health and Spa, Strada Sălajului, Sibiu**.
Pagini: `/products/posing-live-sibiu`, `/products/antrenament-1-la-1-sibiu`, `/products/posing-online`, `/products/consultatie-video` și cele 4 carduri din „Sesiuni individuale” de pe prima pagină. Prețul de pe carduri vine direct din produs: îl schimbi doar în produs (sau în `program-sesiuni.json` + import cu `--complet`).

## Cum funcționează
- Fiecare oră liberă e o **variantă** a produsului, cu titlul „AAAA-LL-ZZ OO:MM” (ex. `2026-11-03 10:00`) și **stoc 1**.
- Clientul alege ziua și ora în calendar, lasă telefonul de WhatsApp și ce vrea să lucrați, apasă „Rezervă și plătește” și ajunge direct la plată.
- După plată stocul devine 0 și ora **dispare din calendar** (nimeni altcineva nu o mai poate lua). Pagina nu mai arată orele care încep în mai puțin de 12 ore și nici pe cele trecute.
- Orele sunt **ora României** (scrie și pe pagină, util pentru clienții din diaspora).

## Programul implicit (îl poți schimba)
Ferestrele nu se suprapun, ca să nu poți fi rezervat la aceeași oră pe două sesiuni:

| Sesiune | Zile | Ore de început | Pe 5 săptămâni |
|---|---|---|---|
| Posing live · Sibiu | marți, joi 17:00–19:00 · sâmbătă 10:00–12:00 | 17:00, 17:30, 18:00, 18:30 / 10:00 … 11:30 | 56 |
| Antrenament 1 la 1 · Sibiu (90 min) | luni, miercuri, vineri 17:00–20:00 · sâmbătă 12:00–13:30 | 17:00, 18:30 / 12:00 | 33 |
| Posing online | luni–vineri 10:00–13:00 | 10:00 … 12:30 | 138 |
| Consultație video | luni–vineri 14:00–17:00 | 14:00 … 16:30 | 138 |

Zile libere sărite automat: 30.11, 1.12, 24–26.12, 1–2.01. Intervalele create acum: **29.10 – 2.12.2026**.
Programul stă în `chera-coaching/sesiuni/program-sesiuni.json` (zile `l, ma, mi, j, v, s, d`; „10:00-13:00” = sesiuni care încep la 10:00 … 12:30; la antrenament durata și pasul sunt 90 de minute). Tot acolo sunt prețul, descrierea, durata (metafield `chera.durata`) și întrebarea din formular (`chera.intrebare`), care intră în produs la importul cu `--complet`. SKU-uri: `PLS-` posing live, `ANT-` antrenament, `PON-` posing online, `CON-` consultație.

## Unde vezi programările
- **Admin → Orders**: la fiecare comandă, pe linia produsului apar data și ora (titlul variantei, ex. „Posing online · 2026-11-03 10:00”) plus:
  - `Programare: Marți, 3 noiembrie 2026, ora 10:00 (ora României)`
  - `Telefon WhatsApp: …`
  - `Ce vrei să discutăm: …` (sau „Categoria, data concursului…” la posing)
- **Notificare**: la fiecare comandă nouă primești e-mail pe marius.chera@outlook.com și notificare pe iPhone (Settings → Notifications → Staff notifications).
- **Lista tuturor orelor ocupate**: Admin → Products → Inventory, caută „PON-” (posing online), „PLS-” (Sibiu) sau „CON-” (consultație): rândurile cu „Available 0” sunt ocupate sau blocate de tine. SKU-ul conține data și ora (ex. `PON-202611031000` = 3.11.2026, 10:00).
- **Clientul**: în contul lui de pe site, „Sesiunile mele” arată fiecare sesiune plătită cu data și ora și butonul „Adaugă în calendar” (Google Calendar, ora României).

## Cum blochezi o oră (ești ocupat, concediu)
Admin → Products → Inventory → caută SKU-ul (ex. `PON-202611031000`) → clic pe „Available” → Set to **0** → Save. Ora dispare din calendar în 1–2 minute.
Pentru o zi întreagă: caută `PON-20261103` (toate orele din 3.11) și pune 0 pe fiecare.
Ca s-o deschizi din nou: același loc, Set to **1**.

## Cum muți o programare
1. Te înțelegi cu clientul pe WhatsApp pe noua oră (una liberă din calendar).
2. Inventory: ora nouă → **0** (o ocupi), ora veche → **1** (o eliberezi, dacă vrei să o mai vândă cineva).
3. În comandă (Admin → Orders → comanda) scrii în **Timeline** sau în **Notes**: „Mutat pe 2026-11-05 11:00”. În contul clientului rămâne data inițială; noua oră i-o confirmi pe WhatsApp.

## Cum adaugi o oră izolată
Admin → Products → produsul → la Variants, „Add variant” / „Add another value” la opțiunea „Data și ora”, scrii exact `AAAA-LL-ZZ OO:MM` (ex. `2026-11-07 09:00`), apoi la variantă: preț, „Track quantity” bifat, cantitate 1, fără „Continue selling when out of stock”. Save.

## Cum adaugi săptămâni noi (recomandat o dată pe lună)
Pe calculator, în folderul `Prime-supplements`:
1. Admin → Products → Inventory → **Export** (toate produsele, CSV) – fișierul păstrează orele deja vândute/blocate.
2. Rulează (înlocuiește calea cu fișierul descărcat; `--saptamani` = câte săptămâni de azi înainte):
   ```
   node chera-coaching/sesiuni/genereaza-intervale.mjs --export "C:\Users\mariu\Downloads\inventory_export.csv" --saptamani 5
   ```
   Scriptul: șterge din listă orele trecute, păstrează orele vândute/blocate pe 0, păstrează orele adăugate de mână, adaugă orele noi din program și scrie `chera-coaching/sesiuni/import/sesiuni-variante-<data>.csv`.
3. Admin → Products → **Import** → fișierul → bifezi **„Overwrite products with matching handles”** → Upload → verifici numărul de produse/variante → Import.
4. Verifici pe site că apar zilele noi și că orele vândute nu au reapărut.

Testat pe 27.10.2026 pe „Posing online”: ora 30.10 10:00 pusă pe 0, reimport cu Overwrite și o săptămână în plus → 138 de ore, 137 libere, ora de test a rămas 0; descrierea, poza, eticheta, tipul și șablonul `sesiune` au rămas neschimbate; celelalte produse neatinse. Apoi ora de test a fost repusă pe 1.

Dacă schimbi programul (alte zile/ore), modifici întâi `program-sesiuni.json`, apoi pașii 1–4.
Prima creare (deja făcută) s-a făcut cu `--complet` (titlu, descriere, poză, SEO); pentru săptămâni noi NU folosi `--complet`, ca să nu-ți rescrie textele modificate în admin.

## Limite și ce s-ar putea face gratuit mai târziu
- **Maxim ~240 de ore pe produs**: pagina produsului (Liquid) citește cel mult 250 de variante. De aceea intervalele se țin pe 4–5 săptămâni înainte și se completează lunar (scriptul oprește generarea peste 240). Shopify în sine permite până la 2.048 de variante.
- **Rezervarea ține din momentul plății**: dacă doi clienți aleg aceeași oră în același timp, primul care plătește o ia; al doilea primește la plată mesajul că nu mai e disponibilă.
- **Fără suprapuneri între produse**: o oră vândută la „Posing online” nu se blochează automat la „Consultație video”. De aceea programul are ferestre separate. Dacă vrei aceleași ore pentru ambele, blochezi manual ora în celălalt produs (Inventory → 0) după fiecare comandă, sau facem gratuit o automatizare în Shopify Flow la nevoie.
- O aplicație de programări (Calendly-like în Shopify) nu e necesară acum; dacă volumul crește mult, alegem una doar cu acordul tău.

## Înainte de lansare (de făcut de tine)
- Adresa sălii (Evo Gym Health and Spa, Strada Sălajului, Sibiu) e pusă în setările temei (Customize → Theme settings → „Adresa pentru sesiunile live din Sibiu”), pe 28.10.2026.
- **Intrarea la sală** pentru client (abonament/bilet la Evo Gym) nu e menționată pe site; spune-mi dacă e inclusă în preț sau trebuie scrisă.
- Reimportul cu Overwrite a fost testat (vezi mai sus).
- **Plata reală (Netopia)** nu e încă activă. Pentru un test cap-coadă cu plată de test: Settings → Payments → „See all other providers” → **(for testing) Bogus Gateway** → Activate. La checkout: card `1`, nume oarecare, dată viitoare, CVV `111` (numere de test publicate de Shopify, nu un card real). Dezactivezi Bogus Gateway după test.
- La checkout magazinul cere **contul clientului** (login cu e-mail); e bine așa, pentru că „Sesiunile mele” apare în cont.
- După testul tău: Orders → comanda de test → **Cancel order** cu „Restock items” bifat, ca ora să reapară în calendar.
- Ciorna de test **#D1** (Drafts) a rămas nefinalizată: Shopify nu permite „Mark as paid” pe magazinul în perioada de probă. Nu ține stocul; o poți șterge din Drafts.
