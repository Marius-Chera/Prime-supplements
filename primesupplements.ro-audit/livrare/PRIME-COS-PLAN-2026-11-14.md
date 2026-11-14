# „Prime Coș”: înlocuitor pentru Delivery Estimator + coș mai mare (plan, 14.11.2026)

Cerut de Marius pe 14.11: Delivery Estimator făcut de noi, plus upsell / cross-sell și alte idei pentru coș mai mare, ca aplicație nouă de la zero.

## Ce exista deja (verificat înainte)
- `APLICATII-DE-CLONAT-2026-11-14.md`: Delivery Estimator e „ușor de înlocuit, snippet în temă, fără server”.
- `findings/ecommerce.md` ECOMMERCE-15: produsele complementare nu sunt setate în Search & Discovery, blocul „Merge perfect cu” e gol; titluri cu greșeli („S-ar putea să-ți placã”).
- Bara „Mai ai doar X până la livrare gratuită” (prag 300 lei, după reduceri) e activă din 19.10 (`JURNAL.md`).
- Pachetele din Reduceri sunt bundle-uri native Shopify (18.10, `backups/bundles-2026-10-18/`).
- Regula din `CLAUDE.md`: fără coduri de reducere noi → upsell-ul NU dă reduceri proprii; doar recomandă produse și pachetele existente.

## Ce face azi Delivery Estimator (citit live pe /products/creatina-creapure, 14.11)
- Bloc de aplicație sub buton: „📦 Comandã pânã la ora 12:00 (luni 16 noiembrie) şi va ajunge la tine marți 17 noiembrie, cel tarziu miercuri 18 noiembrie.”
- Încarcă 2 scripturi externe (`estimator-init.js`, `estimator.js`).
- Probleme: diacritice greșite (ã în loc de ă, ş cu sedilă, „tarziu” fără â); nu știe sărbătorile legale.
- Tema nu are coș lateral (drawer), doar pagina /cart.

## Recomandarea: nu o „aplicație” cu server, ci cod în temă
Pentru ce se cere aici un server nu aduce nimic: data de livrare se calculează în browser, iar recomandările le dă Shopify gratuit (Search & Discovery, deja instalat). Rezultat: 0 lei/lună, fără scripturi externe (site mai rapid), totul în repo.

### Modulul 1 – Estimare livrare (înlocuiește Delivery Estimator)
- Snippet Liquid + ~2 KB JS, același loc pe pagină, același mesaj, scris corect.
- Ora limită 12:00 (ora României), zile lucrătoare luni–vineri, Cargus 1–2 zile.
- Lista sărbătorilor legale din România 2026–2027 (inclusiv Paștele și Rusaliile ortodoxe).
- Produs fără stoc: „Produsul nu este în stoc.” (ca acum).
- Bonus: același mesaj scurt și în coș („Comanzi azi până la 12:00 → ajunge marți”).

### Modulul 2 – „Merge perfect cu” pe pagina de produs (cross-sell)
- Setăm produsele complementare în Search & Discovery pe linii de produs (creatină + shaker, whey + cremă de orez, pre-workout + glicerol etc. – lista o aprobi tu).
- Bloc cu 2–3 produse și buton „Adaugă” direct (fără să părăsești pagina).
- Corectăm titlurile secțiunilor („S-ar putea să-ți placă”).

### Modulul 3 – Coșul: „Completează până la livrare gratuită”
- Sub bara de 300 lei: 3 produse care închid diferența (cel mai ieftin care trece pragul primul), cu „Adaugă” într-un clic.
- Peste prag: 1–2 produse complementare celor din coș.

### Modulul 4 – Pachetul în locul produsului (upsell)
- Când în coș e un produs care face parte dintr-un pachet din Reduceri: „Îl iei în pachetul X și economisești Y lei” (folosește bundle-urile existente, fără cod nou).
- Variantă mai mare: la produsele cu gramaje (300/500 g) „Varianta de 500 g iese cu Z lei/100 g mai ieftin”.

### Modulul 5 – Măsurare
- Fiecare produs adăugat din blocurile noastre primește o proprietate ascunsă (`_sursa: cross-sell / prag / pachet`), vizibilă în comandă. Raport lunar: câți lei au adus blocurile (intră în raportul din ziua 2).

### Mai târziu (doar dacă merg primele)
- Pagina „Mulțumim” cu o ofertă de readăugare (extensie Shopify, cere app în Dev Dashboard).
- E-mail de reumplere la 25–30 de zile după creatină/whey (în theMarketer, design „Bine de știut”).

## Cum se lucrează (ca la celelalte modificări de temă)
1. Totul pe o copie a temei live, testat în browserul aplicației (desktop + mobil), cu capturi pentru Marius.
2. Design: aceleași fonturi/culori ca tema (Poppins, roșu #ec1e24 la butoane) – Marius aprobă înainte de publicare.
3. După publicare: dezactivăm blocul Delivery Estimator, apoi dezinstalăm aplicația.
4. Ordinea: Modulul 1 → 2 → 3 → 4 → 5. Modulul 1 nu depinde de nimic.

## De hotărât de Marius
- Start cu Modulul 1 (livrarea) singur sau toate 1–5 odată?
- Ora limită rămâne 12:00? Sâmbăta se predă ceva la Cargus?
- Lista perechilor „Merge perfect cu” (propun eu o listă, el o corectează).
