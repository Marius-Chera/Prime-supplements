# Judge.me și recenziile în Google – verificare (doar citire, 23.10.2026)

Strategia 4 „recenziile”, pasul 1. Nu am modificat nimic în Judge.me, Shopify sau Merchant Center.

**Surse:** setările publice Judge.me salvate în Shopify (metafield-urile `judgeme.*` ale magazinului, citite prin API), Google Merchant Center 5540809866 (pagina de suplimente), pagina live a produsului Prime Whey 2 kg (date structurate), Trustpilot și pagina publică Judge.me.
**Ce nu am putut citi:** panoul Judge.me din Shopify Admin (cadrul aplicației rămâne alb când fereastra Brave nu e în față, aceeași problemă ca la E12 Simprosys). Pentru setările de e-mail (zile, memento, cerere de poză, plan) e textul pentru extensie de la final.

## 1. Ce am găsit

| Ce | Situația | Ce înseamnă |
|---|---|---|
| Recenzii totale | 454, nota medie 4,88: 329 de recenzii la produse și 125 la magazin (4,91). 255 sunt de la cumpărători verificați, cu media 4,9 | Baza e bună: peste pragul de 50 de recenzii cerut de Google pentru stele în Shopping |
| Ritmul recent | 25 de recenzii în 12–23.10, dintre care doar **7 de la cumpărători verificați** și **2 cu poză** | Cererile după comandă aduc puține recenzii: ~7 în 11 zile, la ~18 comenzi pe zi. O cerere bună ar trebui să aducă 5–10 % din comenzi |
| **Cuponul de 12 % pentru recenzie** | **Pornit** (`enable_coupons: true`, 12 %, „orice recenzie”, doar pentru cei invitați prin e-mail) | Contravine regulii „doar WELCOME5”: fiecare recenzie creează un cod nou. E decizia **D10** din 16.10, încă deschisă. Insigna „Recenzia a câștigat o recompensă” e pornită, deci recenziile cu cupon sunt marcate public |
| Cerere de recenzie la magazin după cea de produs | Oprită (`request_store_review_after_product_review: false`) | Corect: recenzia de magazin o mutăm pe Trustpilot (vezi 03) |
| Cerere pentru celelalte produse din comandă | Oprită (`request_review_other_products_in_order: false`) | De pornit: o comandă cu 3 produse poate aduce 3 recenzii din același e-mail |
| Galeria de poze a clienților | Pornită pe pagina de produs | Avem unde arăta pozele, dar aproape nu primim poze |
| Limba widgetului | Magazinul pe română; o parte din texte sunt încă traduceri automate („Upload Pictures”, „Trimite Recenzie Verificată”) | Textele E10 se completează odată cu fluxul nou |
| Date structurate pe produs | Pagina Prime Whey 2 kg are `AggregateRating` 4,77 (din tema noastră, din câmpurile Judge.me); JSON-LD-ul propriu Judge.me pentru produse e oprit | Corect, fără dublură. Stelele pot apărea la rezultatele de produs din Google |
| **Stele în Google Shopping** | **Nu.** În Merchant Center, „Evaluările produselor” apare la „Descoperă suplimente”, cu nota „Necesar înainte de a adăuga: trimite formularul de exprimare a interesului” | Notele Judge.me **nu ajung** în Google Shopping. De aceea caruselele de produse nu ne arată stelele |
| Google Customer Reviews | Neactivat în Merchant Center | Ar pune un sondaj pe pagina de mulțumire de la checkout; regula „nu intra în checkout” → doar cu acordul proprietarului, nu e în propunere |
| Insigna „recenzii verificate” Judge.me | Oprită (`trust_badge.enabled: false`) | Poate rămâne oprită (nu schimbăm designul) |
| Pagina publică Judge.me a magazinului | `judge.me/reviews/stores/prime-supplements` dă 404 | Profilul public Judge.me nu e activ |
| Trustpilot pe primesupplements.ro | Nu există pagină („Whoops! The page … could not be found”) | Profilul îl creează proprietarul (vezi 03) |

## 2. Stelele în Google Shopping – ce trebuie făcut
Conform ajutorului Judge.me, trimiterea în Google cere:
1. **Planul Judge.me Awesome.** Cupoanele sunt pornite, iar ele sunt o funcție Awesome, deci planul e probabil deja Awesome. Se confirmă cu textul de la §3.
2. **Minimum 50 de recenzii eligibile la produse.** Avem 329.
3. **Feedul de produse deja în Merchant Center.** Îl avem: Simprosys, 428 de produse aprobate.
4. **Formularul Google „exprimarea interesului” pentru Evaluările produselor**, trimis din Merchant Center → Suplimente → „Evaluările produselor”. Îl trimite proprietarul, pentru că acceptă condițiile programului Google.
5. În Judge.me: **Integrations → Google Shopping**, varianta prin API (recomandată de Judge.me). Recenziile sunt trimise automat printr-un cont Merchant Center administrat de Judge.me.
6. După aprobare (de obicei câteva săptămâni), recenziile apar în Merchant Center → Analiză → Recenzii despre produse. Abia apoi apar stelele în Shopping.

Potrivirea produselor se face după GTIN. Codurile EAN ale produselor Prime sunt deja completate în Shopify (ex. 6421766015437), deci potrivirea ar trebui să meargă.

## 3. Text pentru extensia Chrome (doar citire), pentru ce n-am putut vedea

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com → Aplicații → Judge.me Reviews. Sarcina: DOAR CITIRE. Nu schimba, nu salva și nu trimite nimic. Nu deschide și nu modifica Fluxsales sau Primesupplements App. Nu intra în checkout pe site.

1. Planul: ce plan Judge.me e activ (Free sau Awesome) și de când.
2. Requests (sau Settings → Review requests / Emails): notează
   a) dacă cererea de recenzie automată e pornită;
   b) când pleacă: câte zile și după ce eveniment (fulfillment / delivery / order);
   c) dacă există memento (reminder): pornit sau oprit, după câte zile, câte mementouri;
   d) dacă există cerere de poză după recenzie (picture reminder / media request): pornită sau oprită, după câte zile;
   e) dacă se cere recenzie pentru toate produsele din comandă sau doar pentru unul;
   f) pentru ce clienți pleacă: toți / doar cei cu acord de marketing / excluderi;
   g) expeditorul (nume și adresă) și limba e-mailului.
3. Emails → Review request: deschide șablonul (fără să-l modifici). Notează subiectul, textul complet, dacă editorul permite HTML propriu sau doar culori, logo și texte, și ce variabile apar (de ex. formularul de stele din e-mail). Fă o captură de ecran.
4. Același lucru pentru e-mailul de memento și pentru cel de cerere de poză, dacă există.
5. Coupons / Review incentives: notează doar valoarea și condiția. Nu schimba nimic (decizia D10 e a proprietarului).
6. Integrations → Google Shopping (sau Google): notează starea (neconectat / în curs / conectat), varianta (API sau XML) și orice mesaj.
7. Statistici (Analytics sau Requests): câte cereri s-au trimis în ultimele 30 de zile, câte au fost deschise și câte recenzii au adus.
8. Raportează toate valorile de mai sus, cu capturile de ecran.
```

Rezultatul raportului se salvează în acest folder, ca `01b-JUDGEME-SETARI-EXTENSIE.md`.
