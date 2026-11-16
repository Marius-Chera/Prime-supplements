# Contul eMAG Marketplace: verificare și plan de refacere (16.11.2026)

Verificat de Claude în Chrome, doar citire, pe contul lui Marius (contact@primesupplements.ro, PRIME SPORT SUPPLEMENTS SRL, CIF 46260823).
Marius, pe 16.11: „nu sunt produsele incarcate pe cont nu e absolut nimic bine la el ,te rog fa tu de la zero tot si optimizeaza tot”.

## Ce am găsit
1. **Identitatea nu e confirmată (URGENT).**
   - Dashboard-ul afișează: „Termenul pentru verificarea datelor companiei și confirmarea identității a expirat… pentru a evita suspendarea plăților”.
   - Pasul se face doar de Marius: acte, eventual selfie sau video.
2. **Restanță de 65,34 RON** către eMAG (Dante International), cu scadența pe 15.11.2026.
   - Se reține automat la următorul payout, dacă încasările o acoperă. Altfel se plătește prin OP în contul eMAG indicat în cont, cu identificatorul 33347665.
   - Detaliul e la Financiar → Fișa de cont.
3. **Sănătatea contului: „Bună”.** Toți indicatorii sunt pe „prag de materialitate neîndeplinit” (sunt prea puține comenzi ca să se calculeze), iar reclamațiile sunt 0.
4. **Produse: 12 în cont, toate vechi.** Ofertele (9) nu sunt la vânzare: lista „Disponibil” e goală. Vânzări de la începutul anului: 181 (valoare raportată de eMAG).
   - Documentare aprobată, dar slabă (nivel basic/regular, 45–74 % completare): PRIME WHEY 2 kg, EAA 500 g, Nitrox 3D Cireșe și Ananas-Mango, Daily Vitamin Formula, Combat PRO Mojito etc.
   - **Respinse:** Pure Whey Isolate Caramel Sărat 2 kg și Pure Isolate Caffe Latte 2 kg (au erori de documentație, neatinse de ~2,7 ani).
   - Categoriile folosite: Proteine, Amino acizi, Alte suplimente nutriție sportivă.
5. **Integrarea tehnică.** IP-ul releului (92.5.53.134) a fost adăugat azi la Detalii tehnice, cu status Activ. URL-urile de callback sunt goale. Există un singur user (contact@), cu „Application status: Inactiv”.
6. **Campanii:** „Chillmas Deals” până pe 23.11, cu până la 70 % discount la comision (deadline-ul de încărcare a ofertelor e peste 7 zile).

## Planul „de la zero” (propus, așteaptă aprobarea lui Marius)
**Pasul 0 – deblocare (Marius):**
- confirmarea identității;
- verificarea restanței;
- semnarea anexelor de comision la categoriile de suplimente, dacă eMAG le cere.

**Pasul 1 – catalogul din Shopify, ca sursă:**
- **Ce se ia:** toate produsele ACTIVE de pe primesupplements.ro care au EAN valid (SKU = EAN-13). Excluse: hainele cu coduri interne 400…, pachetele și cadourile.
- **Ce primește fiecare produs:** titlu în formatul eMAG (Brand + produs + aromă + gramaj), descriere doar cu mențiuni de sănătate autorizate UE, fără furnizor sau fabrică, poze de pe CDN-ul Shopify, caracteristicile cerute de categorie, garanție 0.
- **Cele 12 produse vechi:** le actualizăm documentația (aceeași cheie PNK). Cele 2 respinse se refac sau se marchează EOL.

**Pasul 2 – prețuri și stoc:**
- **Prețul:** regula o decide Marius, de exemplu prețul de pe site + o marjă care acoperă comisionul eMAG pe categorie.
- **Stocul:** din gestiunea Oblio „PRIME SPORT SUPPLEMENTS ONLINE”, aceeași regulă ca în Shopify, sincronizat automat în aplicația Prime eMAG (`offer_stock`).
- **Termenul de livrare (handling time):** 1 zi.

**Pasul 3 – încărcarea prin API**, în loturi mici (`product_offer/save`):
- întâi un lot-pilot de 3–5 produse, verificat cu Marius;
- apoi restul;
- se urmăresc respingerile de documentație.

**Pasul 4 – optimizare:**
- campanii (Chillmas, Genius dacă merită);
- verificarea „best price” față de alți vânzători pe același EAN;
- recenzii;
- callback-urile pentru comenzi în aplicație (etapa b).

**Ce schimbă față de brief:** brief-ul aplicației spunea „nu atinge ofertele, prețurile, stocul”. Marius a cerut acum explicit refacerea contului, așa că se modifică doar cu aprobarea lui pe fiecare pas (lot-pilot, regula de preț).

## Decizia de preț (Marius, 16.11.2026: „Preț site + comision”)
- **Comisionul eMAG**, conform Anexei 3 „Commissions” din 30.09.2026 (documentul 9013585, „Avizat final”): **18 % din valoarea vânzării**, pentru Proteine (3593), Amino acizi (3594), Carbohidrați (3595), Creatină (3596), Alte suplimente nutriție sportivă (3597) și Alte suplimente alimentare (2617).
- **Formula:** preț eMAG (cu TVA) = preț site ÷ 0,82, rotunjit în sus la ,99. Exemple: 100 lei → 121,99 lei; 150 lei → 182,99 lei. Așa, după reținerea comisionului de 18 %, încasarea rămâne cel puțin cât prețul de pe site.
- **TVA-ul pe factura de comision** se recuperează, dacă firma e plătitoare de TVA. Marius trebuie să confirme.
- **Transportul pe eMAG** se setează separat, în Logistică, și nu intră în formulă.
- În eMAG se trimite prețul **fără TVA** (`sale_price`), adică prețul cu TVA ÷ 1,21 la 21 %. Se trimit și `min_sale_price` / `max_sale_price`, propuse ca preț −5 % / +30 %.
