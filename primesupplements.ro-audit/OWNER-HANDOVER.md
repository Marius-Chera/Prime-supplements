# Prime Supplements – ce s-a făcut și ce rămâne de făcut (12 octombrie 2026)

Acest document este rezumatul practic pentru proprietar. Raportul complet este în `FULL-AUDIT-REPORT.md`, planul în `ACTION-PLAN.md`.

## 1. Aplicat deja pe magazinul live (nu necesită nicio acțiune)

| Zonă | Ce s-a schimbat | Cum verifici |
|---|---|---|
| Produse (195) | Titlu SEO + meta description noi în română, sufix " \| Prime Supplements", fără afirmații de sănătate interzise; vendor corectat ("Prime Supplements" / "MNX", nu "primesupplements1"); tip de produs completat; categorie din taxonomia Shopify setată | Admin → Produse → orice produs → secțiunea "Previzualizare listare motor de căutare" |
| Colecții (23) | Titlu SEO + meta description; 17 colecții de categorie au acum descriere de 3 paragrafe | Admin → Produse → Colecții |
| Articole blog (354) | Titlu SEO + meta description rescrise (un subiect clar per articol); 17 articole trecute de pe contul "primesupplements1" pe autorul real | Admin → Conținut → Postări blog |
| Imagini produse (493) | Text alternativ descriptiv în română pentru fiecare imagine | Admin → Conținut → Fișiere, sau pagina produsului → imagine → "Editare text alternativ" |

## 2. Pregătit pe tema de test – trebuie publicată de tine (5 minute)

Tema `Impact – SEO fixes 2026-10-12 (Claude, nepublicată)` conține toate corecțiile de cod: șablon de titlu cu brand, noindex pe colecțiile utilitare (all, cele-mai-vandute, lansate-recent, 11-tva, reduceri, vendors, types) și pe paginile cart/search/thank-you, viewport fără blocarea zoom-ului, date structurate valide (Product cu prețuri numerice, retur 14 zile, livrare 20 RON / gratuită ≥ 300 RON, rating Judge.me; Article cu autor; Organization cu CUI, telefon, adresă, rețele sociale; breadcrumb), og:image pe https, și neutralizarea la afișare a scripturilor/link-urilor BlogGenAuto din articole.

Pași: Admin → Magazin online → Teme → la tema de test apasă "Previzualizare" (verifică pagina principală, o colecție, un produs, un articol) → "Publică". Tema actuală rămâne în listă ca rezervă.

## 3. Decizii pe care doar tu le poți lua

1. **Piața Ungaria (`/ro-hu/`)** dublează tot site-ul (575 URL-uri identice în română, cu RON). Dacă nu vinzi efectiv în Ungaria cu conținut maghiar: Admin → Setări → Piețe → Ungaria → Domenii și limbi → elimină subfolderul `/ro-hu` (sau șterge piața). Este cea mai mare problemă de indexare rămasă.
2. **Magazinul B2B** publică 58 de pagini de produs identice pe alt domeniu. Pune-i parolă (Magazin online → Preferințe → Restricționează accesul) sau noindex.
3. **Corpul articolelor**: cele 355 de articole curățate sunt în `blog-cleanup/cleaned-bodies.tar.gz` (fără scripturi, fără JSON-LD invalid, fără link-uri myshopify, fără prețuri hard-codate, fără "Powered by BlogGenAuto"). Import: aplicația Matrixify (foaia "Blog Posts", coloanele ID + Body HTML) sau un script scurt de Admin API; eu nu am putut rula importul în masă din acest mediu.
4. **Consolidarea articolelor duplicate**: ~190 de articole generate automat se bat pe aceleași cuvinte-cheie (47 de grupuri). Harta de consolidare (ce rămâne, ce se redirecționează 301) este în `findings/cluster.md` și `findings/content.md`. Este o decizie editorială.
5. **Bannerul de cookie-uri** (Pandectes) acoperă tot ecranul pe mobil. Setează-l ca bară jos (Pandectes → Banner → Layout "Bar").
6. **BlogGenAuto**: oprește generarea automată sau setează-i să nu mai insereze scripturi, JSON-LD și link-uri externe în corpul articolelor.

## 4. Următoarele 30 de zile (ordinea recomandată)

1. Publică tema de test (ziua 1).
2. Elimină `/ro-hu` și protejează B2B (ziua 1-2).
3. Importă corpurile curățate ale articolelor (săptămâna 1).
4. Google Search Console: trimite din nou `sitemap.xml`, cere indexarea paginilor principale de colecții, urmărește raportul "Pagini" (dublurile ar trebui să scadă în 2-4 săptămâni).
5. Google Merchant Center: re-sincronizează canalul Google & YouTube (brand, tip, categorie acum completate; GTIN-urile lipsesc încă pe majoritatea produselor – adaugă-le în Admin → Produse → Variante → Cod de bare).
6. Consolidează articolele duplicate pe baza hărții din raport (luna 2).

## 5. Fișiere livrate
- `FULL-AUDIT-REPORT.md`, `ACTION-PLAN.md`, `audit-data.json`, `FULL-AUDIT-REPORT.pdf`
- `findings/` – rapoartele celor 17 specialiști (dovezi, ID-uri)
- `applied/` – exact ce s-a scris în magazin (produse, colecții, articole, alt text) + loguri
- `theme-fixes/` – fișierele Liquid urcate pe tema de test
- `blog-cleanup/` – scriptul, raportul și corpurile curățate ale articolelor
- `screenshots/` – capturi mobil/desktop
