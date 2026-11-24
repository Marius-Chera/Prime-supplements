# Judge.me – raportul extensiei, rularea 2 (24.11.2026)

Raportul a fost lipit de Marius în chat. Extensia a rulat textul din `09-TEXT-EXTENSIE-JUDGEME-RULAREA-2.md`.

## Pasul 1 – setările de dinainte (rezervă)
- **Prima cerere:**
  - comenzile din România: 10 zile după Fulfilled;
  - comenzile internaționale: 14 zile;
  - comenzile POS: 7 zile.
- **Memento:** niciunul.
- **Cererea de poză (Media reminder):** oprită. Formularul are totuși „Ask for review images”.
- **Celelalte produse din comandă:** pornit. Maximum 3 produse pe comandă, întâi cele cu cele mai puține recenzii, **câte un e-mail separat pentru fiecare produs, la 5 zile distanță**.
- **Store review după cea de produs:** oprit. „Store Review Fallback” e pornit (când produsul nu mai există sau comanda nu are produs).
- **Limita pe client:** „Limit by frequency”, cererea se sare dacă s-a trimis una în ultimele **130 de zile**.
- **Alte setări:** trimite și la cumpărarea repetată a aceluiași produs; nu pe fiecare variantă; orice zi, la ora implicită; trimite și clienților dezabonați de la marketingul Shopify.
- **Șablonul activ:**
  - subiect: „⭐ {{ buyer_first_name }}, ce părere ai despre {{ product_title }}”;
  - blocuri: logo, titlul „Spune-ne ce crezi!”, „Salut {{ buyer_first_name }}… acum {{ n_days_ago }} zile…”, caseta „12% – Lasă o recenzie sinceră și primești un cod de 12% reducere la următoarea comandă, indiferent de nota acordată”, formularul clasic (stele #EC1E24, buton „Trimite Recenzie Verificată”), „Mulțumim, Echipa {{ shop_name }}”, dezabonarea;
  - fundal #F5F5F5, text #525252, Segoe UI, 600 px.
- **Expeditorul:** „Prime Supplements” <requests+primesupplements.ro@judge.me>. Adresa contact@ cere configurarea domeniului („Custom sender email”, oprit).
- **Cuponul:** prefix RECENZIE-, 12 % la orice notă, doar cumpărători verificați, unul pe comandă, valabil 30 de zile, cu memento cu 5 zile înainte de expirare.

## Pasul 2 – făcut până la oprire
- Comenzile din România: **un memento la 7 zile** (înainte nu exista), plus bifa „Send reminders to customers who haven't opened…”. Salvat.
- Prima cerere a rămas la 10 zile.
- Neschimbate: cererea de poză oprită, celelalte produse pornite, store review oprit, cuponul de 12 %.
- **Oprit la jumătate:** Chrome nu mai dădea capturi de ecran. Nefăcute încă:
  - limita 130 → 30 de zile;
  - textele E1 și E2;
  - testele.
  - Până atunci memento-ul folosește textul actual; primul ar pleca cel mai devreme la ~17 zile după expediere.

## Ce a semnalat extensia
1. Expeditorul contact@ cere configurarea domeniului în afara Judge.me.
2. Antetul negru cu logo alb ar avea nevoie de un logo alb (există `afiliati/tools/logo-white.png`).
3. „Salut!” fără prenume: Judge.me pune „Customer”. Extensia încearcă o condiție în text.

## Observația lui Claude
Setarea multi-produs trimite **câte un e-mail separat pentru fiecare produs** (până la 3, la 5 zile distanță). Cu memento-ul nou, un client cu 3 produse ar putea primi până la ~6 e-mailuri. Asta contrazice decizia lui Marius din 16.11 („prea stresăm clienții”, maximum 2 e-mailuri). Recomandarea: un singur e-mail cu toate produsele, dacă setarea există; altfel maximum 1 produs pe comandă.
