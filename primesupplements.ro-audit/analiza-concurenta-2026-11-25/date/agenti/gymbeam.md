# GymBeam (gymbeam.ro) – analiză concurent

Date colectate pe 25.11.2026, doar din pagini publice (fără cont, coș sau formulare). Prețurile provin din datele structurate (JSON-LD `Offer`) ale paginilor de produs, la data colectării, în săptămâna de Black Friday. Unde scrie „negăsit”, informația nu a apărut în sursele verificate.

## 1. Cine sunt
- **Tip:** ambele. Au marcă proprie foarte mare (GymBeam, BeastPink, Moxy, STRIX) și revând și mărci terțe (Optimum Nutrition, Amix, PVL, Nutrend, The Protein Works, Weider, Blueprint). Sursă: https://gymbeam.ro/proteine-din-zer-whey
- **Firma:** GymBeam s.r.o. (Slovacia), fondată în 2016 după Compari. Sediul afișat în footer e în Kempen (DE). Depozitul de retur din România: Cargus depo, Oradea. Surse: https://gymbeam.ro/ , https://www.compari.ro/stores/gymbeam-ro-s126255/ , https://gymbeam.ro/content/procedura-de-reclamatii
- **Mărimea firmei:** pe blogul lor apar 224 mil. € venituri în 2024 și 6 milioane de clienți. Sursă: https://gymbeam.ro/blog/
- **Platformă:** frontend Astro (insule `astro-island` în HTML) peste backend Magento (URL-uri `catalog/product/view/id/...`, „Magento” în cod). Sursă: HTML-ul https://gymbeam.ro/
- **Curiozitate tehnică:** pe pagini rulează WebMCP (`navigator.modelContext`), adică unelte expuse pentru agenți AI (search_products, get_product). Endpoint-ul `/api/v1/mcp` a întors 0 rezultate la testele noastre. Sursă: HTML-ul https://gymbeam.ro/
- **Număr de produse:** „9000+ produse” pe site, „10.000+” în bio-ul de Instagram. Surse: https://gymbeam.ro/ , https://www.instagram.com/gymbeamro/
- **Magazine fizice în România:** negăsit. Compari spune că adresa din Oradea nu e punct de ridicare. Sursă: https://www.compari.ro/stores/gymbeam-ro-s126255/
- **Premii:** câștigătorul categoriei sport și fitness la „Magazinul Anului” Compari.ro, mai 2026. Sursă: https://www.revistabiz.ro/care-a-fost-cel-mai-bun-magazin-online-din-romania-din-perspectiva-compari-ro/

## 2. Ofertă și prețuri (coșul de referință)

| Produs din coș | GymBeam: produs | Gramaj | Preț (lei) | Lei/100 g | Prime (lei/100 g) | Sursă |
|---|---|---|---|---|---|---|
| Whey concentrat ~2 kg | Just Whey Grass-Fed (marcă proprie, cel mai sus listat, 4,8★/8.764) | 2000 g | 369,90 | **18,50** | 19,50 (390 lei/2 kg) | https://gymbeam.ro/proteine-just-whey-1000-g-gymbeam.html |
| Whey concentrat (alternativă) | True Whey (4,6★/8.268) | 2500 g / 1000 g | 439,90 / 179,90 | **17,60** / 17,99 | 19,50 | https://gymbeam.ro/proteine-true-whey-gymbeam.html |
| Izolat din zer ~2 kg | Pure IsoWhey | 2500 g / 1000 g | 599,90 / 259,90 | **24,00** / 25,99 | 25,50 (510/2 kg) | https://gymbeam.ro/proteine-pure-isowhey-gymbeam.html |
| Izolat (alternativă) | Protein IsoFue | 2000 g | 539,90 | 27,00 | 25,50 | https://gymbeam.ro/protein-isofue-gymbeam.html |
| Creatină monohidrat 300–500 g | 100% Creatină monohidrată micronizată (4,8★/9.397) | 500 g (și 250 g / 1 kg) | 69,90 (39,90 / 129,90) | **13,98** (15,96 / 12,99) | 32,67 (98/300 g) | https://gymbeam.ro/creatina-monohidrata-gymbeam.html |
| Creatină Creapure | 100% Creatină Creapure (4,8★/1.815) | 500 g (și 250 g / 1 kg) | 164,90 (90,90 / 305,90) | **32,98** (36,36 / 30,59) | 36,00 (180/500 g); 38,33 (115/300 g) | https://gymbeam.ro/creatina-creapure-gymbeam.html |
| Pre-workout | Veinz Pre-workout | 500 g | 93,90 | **18,78** | 38,00 (Nitrox 190/500 g) | https://gymbeam.ro/veinz-pre-workout-gymbeam.html |
| Pre-workout (vedetă) | Thor (4,5★/1.790) | – | doar mostra de 7 g apare în JSON-LD (6,90); prețul la gramaj mare negăsit | – | – | https://gymbeam.ro/stimulent-de-pre-antrenament-thor-gymbeam.html |
| Cremă de orez 1–2 kg | Terci de orez (4,7★/754) | 500 g (1–2 kg negăsit) | 30,90 | **6,18** | – | https://gymbeam.ro/terci-de-orez-gymbeam.html |
| Omega-3 | Omega 3 GymBeam (4,9★/4.449) | 120 caps (și 60/240/360/500) | 51,90 (28,90 / 96,90 / 138,90 / 187,90) | **0,43 lei/caps** (0,48–0,38) | 0,86 lei/caps (69/80) | https://gymbeam.ro/omega-3-gymbeam.html |
| EAA | EAA GymBeam (4,3★/1.204) | 500 g (și 250 g) | 99,90 (55,90) | **19,98** | 35,00 (175/500 g) | https://gymbeam.ro/eaa-gymbeam.html |

- **Prețuri tăiate / reduceri:** în categoria whey nu apar prețuri tăiate. Sursă: https://gymbeam.ro/proteine-din-zer-whey . Pe homepage apar „PÂNĂ LA -25%”, produse „+ cadou” și codul FOOD10 (-10% la produsele pentru copt). Sursă: https://gymbeam.ro/
- **Concluzie preț:** GymBeam e cu 5–10% mai ieftin decât Prime la whey și izolat, de peste 2 ori mai ieftin la creatina simplă, pre-workout, EAA și omega-3, și cu ~8% mai ieftin la Creapure.
- **Prețul unitar** (lei/kg) apare pe listări. Sursă: https://gymbeam.ro/proteine-din-zer-whey

## 3. Livrare și retur
- **Prag livrare gratuită:** 199 lei. Sursă: https://gymbeam.ro/content/livrarea-marfii
- **Cost sub prag:** curier Cargus sau Fan Courier 12 lei; punct sau locker Cargus Ship & Go 9 lei. Sursă: aceeași
- **Lockere:** Cargus Ship & Go da. Easybox: negăsit. Ridicare personală: negăsit.
- **Timp de livrare:** „livrare rapidă în 24 de ore” pe homepage. Ora limită: negăsit. Sursă: https://gymbeam.ro/
- **Alte țări:** livrează în Republica Moldova prin Fan Courier, cu posibile taxe vamale peste 150 €. Sursă: https://gymbeam.ro/content/livrarea-marfii
- **Retur:** pagina de retururi spune 30 de zile de la livrare (https://gymbeam.ro/returnari), iar procedura spune 14 zile calendaristice (https://gymbeam.ro/content/procedura-de-reclamatii). Cele două pagini se contrazic. Returul îl plătește clientul, prin Cargus la depozitul din Oradea. Produsul nepotrivit poate fi preluat gratuit de acasă (schimb). Garanție 24 de luni.
- **Plată:** pagina de livrare are doar logo-uri. În codul paginii de produs apar mesaje pentru Apple Pay, Google Pay și PayPal (https://gymbeam.ro/proteine-true-whey-gymbeam.html). Ramburs și rate: negăsit.

## 4. Fidelizare și creșterea coșului
- **Program de puncte** (din 8.2.2026): 1 punct la 5 lei pe site și **2 puncte la 5 lei în aplicație**. O recenzie aprobată aduce 10 puncte. Recompensele se aleg în coș la 250/450/700/1000 de puncte. Punctele devin active după 30 de zile și expiră după 90 de zile. Valoarea în lei: negăsit. Sursă: https://gymbeam.ro/content/program-de-loialitate
- **Aplicație mobilă** (iOS/Android): „oferte și cadouri exclusive”, puncte duble. Sursă: https://gymbeam.ro/content/aplicatie-mobila
- **Cupon de bun venit / popup newsletter:** negăsit. Niciun popup după 10 s în browser. Formularul din footer promite doar „motivație, sfaturi și oferte personalizate”. Sursă: https://gymbeam.ro/
- **Pachete și cadouri:** pachete cadou (https://gymbeam.ro/pachete-cadou), cadouri sub 50 lei, cadouri pentru el sau ea, produse „+ cadou” (inclusiv Thor „+ cadouri”), structură de bundle cu „Economisești X %” pe pagina de produs. Sursă: https://gymbeam.ro/proteine-true-whey-gymbeam.html
- **Card cadou:** da. Sursă: https://gymbeam.ro/carduri-cadou
- **Mostre:** da, variante de 30 g (whey) și 7 g (Thor) în JSON-LD.
- **Wishlist:** da, liste partajabile („Lista e vizibilă doar pentru tine”, „distribuită de {name}”) în codul paginii de produs.
- **Abonament:** în meniu apare eticheta „Abonament”, dar pagina sau detaliile nu au fost găsite.
- **En gros / B2B:** https://gymbeam.ro/content/angro

## 5. Încredere
- **Recenzii pe site** (sistem propriu, cu filtre „Achiziții verificate”, „Păreri România”, căutare în recenzii, recenzii traduse din alte țări): Just Whey 4,8★/8.764, True Whey 4,6★/8.268, creatina 4,8★/9.397. Sursă: JSON-LD de pe paginile de produs de mai sus
- **Trustpilot** (gymbeam.com, toate țările): **4,7 / 75.219 recenzii**. Câte sunt din România: negăsit. Widget Trustpilot pe site. Sursă: https://www.trustpilot.com/review/gymbeam.com
- **Compari:** profil cu recenzii, legat din footer. Sursă: https://www.compari.ro/stores/gymbeam-ro-s126255/
- **Google:** negăsit
- **Teste de laborator publice pe pagina de produs:** certificate „Microbiology & Heavy Metals” pe ani (2020–2026) și pe arome, plus „Anti-Doping (Cologne List) 2026” pentru True Whey, emise de „Independent Laboratory”. Sursă: https://gymbeam.ro/proteine-true-whey-gymbeam.html
- **Certificări ISO/HACCP/IFS:** negăsit în paginile citite
- **Telefon:** 0040 316 302 838, L–V 08–20. Chat: există un widget încărcat la interacțiune („Jim”, în cod), dar tipul lui (bot sau om) e negăsit. Sursă: https://gymbeam.ro/
- **Despre noi:** nu au pagină dedicată, doar „DESPRE GYMBEAM” cu contact. Sursă: https://gymbeam.ro/contacte

## 6. Conținut și comunitate
- **Blog:** „1310+ articole”, 8 categorii (inclusiv „Calculator Fitness”), hub „Ghidul proteinelor”. Ultimul articol e din 12.11.2026, cam unul la 2–4 săptămâni în ultimele luni. Articolele sunt traduse din rețeaua internațională (autori slovaci). Sursă: https://gymbeam.ro/blog/
- **Instagram @gymbeamro:** **88K urmăritori**, 8.942 postări. Sursă: https://www.instagram.com/gymbeamro/
- **TikTok @gymbeam.ro:** **26.200 urmăritori**, 374.200 aprecieri, 843 video. Sursă: https://www.tiktok.com/@gymbeam.ro
- **Facebook** (https://www.facebook.com/GymBeamRo) și **YouTube**: numărul de urmăritori negăsit
- **Ambasadori:** categoria de blog „Personalități și inspirație”. Sportivi români: negăsit.
- **Afiliere:** negăsit (doar En gros)
- **Alte țări:** rețea pan-europeană (SK, CZ, HU, RO, IT etc.)

## 7. Reclame
- **Meta Ad Library** (RO, active, cuvântul „gymbeam”): **~220 de rezultate**, aproape toate de pe pagina GymBeam. Câteva sunt potriviri străine. Sursă: https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=RO&q=gymbeam
  - Exemple (parafrazate): (1) creatina monohidrat e forma cea mai studiată, aduce mai multă forță și recuperare, „comandați acum” (video, 3 reclame); (2) „Luna vegană la GymBeam”, cu un pont despre fierul din linte și vitamina C (conținut educativ); (3) un articol de blog despre muzica la antrenament; (4) îmbrăcăminte de damă STRIX și costume de baie (catalog).
- **Compari:** listat, cu premiu „Magazinul Anului 2026”. Comparatorul Pazaruvaj e integrat în cod. Google Shopping și SupliScout: negăsit.

## 8. Marketplace-uri
- **eMAG:** negăsit
- **Trendyol.ro:** apar produse GymBeam, cu etichetă de comerciant oficial pe unele listări. Sursă: https://www.trendyol.com/ro/gym-beem-y-s803908
- **În alte țări:** Decathlon PL, Alza HU. Sursă: căutare web
- **Notino, farmacii, Amazon:** negăsit

## 9. Ce fac excepțional de bine și puncte slabe
**De copiat:**
1. **Buletine de laborator publice pe produs**, pe lot sau an și pe aromă (metale grele, microbiologie, Cologne List). Elimină îndoiala „e testat?” direct pe pagina de produs.
2. **Recenzii la scară, filtrabile** (verificate, România, după aromă, căutare în text). Peste 8.000 pe un singur produs.
3. **Puncte duble în aplicație și puncte pentru recenzie** (10 puncte). Asta alimentează și volumul de recenzii.
4. **Gramaje în trepte** (250/500/750/1000/1500 g la creatină; 30 g mostră la whey), cu prețul pe kg afișat. Gramajul mare devine un argument de cost.
5. **Conținut educativ pus și în reclame** (creatină, vegan, muzică). Reclama educă, nu doar vinde.

**Puncte slabe:**
1. Termen de retur contradictoriu: 30 de zile pe /returnari și 14 zile în procedură. Returul îl plătește clientul.
2. Fără magazin sau punct de ridicare în România. Livrarea vine din depozite străine, iar sediul e în Germania sau Slovacia, deci firma nu pare „locală”.
3. Blogul e tradus (autori străini) și a încetinit. Nu e făcut pentru publicul român.
4. Cupon de bun venit sau popup: negăsit. Punctele expiră după 90 de zile și nu au valoare declarată în lei.
5. Comunicarea e generică, de „supermarket” (îmbrăcăminte, costume de baie, vegan). Nu au poziționare de expert pentru sportivi.
