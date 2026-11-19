# Reguli Meta Ads – stabilite de Marius pe 19.11.2026

Se aplică la orice modificare în contul „Prime Supplements – Cont de publicitate” (1805310243181962), din Ads Manager sau prin Windsor.ai. Orice pornire, oprire sau schimbare de buget se face doar cu „da”-ul lui Marius.

## Regulile

1. **Buget: maximum 3.000 lei cheltuiți pe lună** pe tot contul Meta Ads.
2. **Produse, în ordinea priorității:**
   1. Cremă de orez (Prime Creamy Rice)
   2. Prime Whey
   3. Creatină (Creapure® monohidrată)
3. **Poze frumoase, generate**, arătate cât mai des oamenilor care nu au intrat niciodată pe site. Scopul sunt clienții noi, nu cei care au mai cumpărat.
4. **Bugetul nu se consumă pe oameni care cunosc deja brandul.** Reclamele merg la public rece.

## Cum le aplicăm (propunerea din 19.11, de confirmat pas cu pas)

**Buget.** 96 lei/zi pe tot contul (× 31 de zile = 2.976 lei). Meta poate depăși bugetul zilnic într-o zi, dar pe o săptămână calendaristică nu cheltuie mai mult de 7 × bugetul zilnic. Ca plasă de siguranță, Marius pune o limită de cheltuieli pe cont în Ads Manager (Billing → Account spending limit) și o resetează lunar.

| Prioritate | Produs | Lei/zi | ≈ lei/lună |
|---|---|---|---|
| 1 | Cremă de orez | 40 | 1.240 |
| 2 | Prime Whey (2 kg și 1 kg) | 32 | 990 |
| 3 | Creatină Creapure® | 24 | 745 |

**Doar public nou.** Câte o campanie de vânzări pe produs, fiecare cu excluderi:
- vizitatorii site-ului din ultimele 180 de zile (pixel);
- cumpărătorii din ultimele 180 de zile (pixel, Purchase);
- cei care au interacționat cu pagina de Facebook sau cu contul de Instagram în ultimul an;
- lista de clienți Shopify, dacă se poate sincroniza din aplicația Meta din Shopify. Nu urcăm fișiere cu date personale din repo.

Dacă folosim campanii Advantage+ pentru vânzări: definim „clienți existenți” în setările contului și punem limita de buget pentru clienți existenți cât mai jos. Meta nu garantează că omul n-a auzit niciodată de brand, dar excluderile de mai sus scot aproape tot publicul cald.

**Ce oprim.** „[CL] Supplements General” (public restrâns, frecvență mare = public cald), „Campanie NAC” (0 comenzi din clic) și „Pachete – Vânzări” nu respectă regulile 2 și 4. Le oprim, nu le ștergem, ca să păstrăm istoricul.

**Poze.** Ambalajul produsului apare mereu din poza reală, pentru că trebuie să fie identic cu ce primește clientul. Generăm doar decorul, ca la splash-urile din 17.11 (OpenArt): cremă de orez cu desertul sau aroma, whey cu shake și sală, creatină cu sportiv. Oamenii din poze sunt sportivi bărbați sau cadre din ședințele foto (regula din 15.11: fără femei generate cu AI). Pregătim 3–4 variante pe produs, format 4:5 (1080×1350) pentru feed și 9:16 pentru Stories/Reels.

**Texte.** Doar mențiuni de sănătate autorizate în UE: creatina, cu doza de 3 g/zi, crește performanța fizică la efort scurt și intens; proteinele contribuie la creșterea masei musculare. Fără promisiuni de slăbire.

**Cum măsurăm.** Lunar: cheltuiala (Windsor), comenzile din clic în aceeași zi (Meta) și, în Shopify, clienții noi vs. cei care revin din sesiunile cu UTM facebook/ig. Toate reclamele noi primesc același șablon UTM: `utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}`.

## Atenție (din datele 21.10–18.11)

- Crema de orez a avut cel mai slab randament din clic (≈ 2,5 lei vânzări la 1 leu), iar „[CL] Supplements General” cel mai bun (≈ 10,8). Oprirea campaniei [CL] poate scădea vânzările atribuite Meta pe termen scurt. Marius a ales conștient clienții noi în locul randamentului imediat.
- Prime Whey 2 kg este cel mai vândut produs (45.760 lei în 29 de zile), creatina vine a doua ca număr de comenzi (106).
