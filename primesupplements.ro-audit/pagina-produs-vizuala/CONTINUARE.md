# Cum continui paginile vizuale + „Curiozități” (pentru sesiunea următoare)

**Stare la 16.11.2026: 52/80 pe PILOT; rămân 28 (Cardio Calm, Water Out 500 ml, Energy Pump, Fat Burning Booster, unturile de arahide și caju, 3 batoane, 19 Frutilu), iar paginile de dinainte de 16.11 trebuie aduse la scorul SEO/AI 100/100.** Stare veche (15.11): vezi `TOATE-PRODUSELE.md` (generat de `scripts/inventar.mjs`).
- 23 de produse au pagină vizuală + „Curiozități”, scrise pe tema PILOT `194315649399` și verificate (desktop + 375 px).
- Lotul 3 (15.11): Ashwagandha, Recovery Glutamin, Complete Collagen, baton căpșuni – scrise pe PILOT.
- **Rămân 38 de produse fără pagină** (lotul 4 din 15.11 noaptea: Creamy Rice fără aromă + sirop de arțar, Combat Pro 2.0, Emperor Mass, Whey Go; Recovery BCAA are acum sportivă) (rândurile cu „**nu**” în coloana JSON), în ordinea din `inventar.json`: întâi top 40
  (Ashwagandha, Creamy Rice fără aromă și sirop de arțar, Combat Pro 2.0, Glutamin, Emperor Mass, Whey Go, Creatine Ready To Go,
  Oat Cream, Glycerol, NAC, L-carnitină, Q10, Potassium, zinc...), apoi capsulele Prime Health, tincturile, shot-urile,
  unturile, batoanele și cele 19 produse Frutilu.
- Recovery BCAA are în dreapta poza cu produsele, nu o sportivă: de generat (OpenArt) sau de ales o poză reală.

## Pașii pentru fiecare produs nou
1. Citește `custom.ingrediente`, `custom.detalii_produs`, `custom.beneficii_cheie` + variantele (Admin API, doar citire)
   → `date/<handle>.eticheta.txt` (vezi exemplele existente).
2. Scrie `date/<handle>.json` după `PROMPT-GENERARE.md` (doar din etichetă, mențiuni doar din `mentiuni-autorizate.json`),
   cu câmpul `curiozitati` inclus (300–400 de cuvinte, 3–6 întrebări H3 cu „?”, răspuns direct în prima frază,
   surse doar din `../blog-automation/SURSE-PUBMED.md` sau EUR-Lex/EFSA; texte diferite de la produs la produs).
   Pentru „Curiozități” poți scrie un fișier `{handle: {titlu, intro, sectiuni, surse}}` și să rulezi `scripts/adauga-curiozitati.mjs`.
3. `node scripts/valideaza-pagina-vizuala.mjs date --cere-curiozitati` → 0 erori, apoi `node scripts/scor-pagina-vizuala.mjs <handle>` → SEO 100 și AI 100 (cerut de Marius pe 16.11: toate textele de pe PILOT la 100/100; cuvântul-cheie al fiecărui produs e în harta CHEIE din script).
4. `imagine` = sportivă: poză reală (`../blog-automation/POZE-SEDINTE-FOTO.md`), apoi `poze/jpg/index.json` (`women: true`,
   unele sunt doar în repo: le urci întâi în Files), altfel OpenArt (`poze/POZE-PRODUSE.md`, `poze/rezultate.txt`).
   Galeriile produselor NU se ating.
5. `node scripts/variabile-metafields.mjs <handle> ...` → variabilele pentru `metafieldsSet` (scrie `prime.pagina_vizuala` fără
   curiozități + `prime.curiozitati` separat); 3–4 produse pe apel. Pentru cele care au deja pagina: `--doar-curiozitati`.
6. Produsele cu `templateSuffix` propriu: pe PILOT, blocul liquid din `templates/product.json` (ca la `product.creatina2`).
7. **Verificarea scrierii:** variabilele se copiază de mână în apel, deci pot apărea greșeli de tastare (s-a întâmplat la baton: „înghț”). Rulează `node scripts/amprente.mjs <handle>...` și compară în browser cu aceeași funcție pe `.ppv` din pagina PILOT (codul e în comentariul scriptului; 27/27 identice pe 15.11). Apoi verifică pe `?preview_theme_id=194315649399` (fetch: `ppv-cur__t` apare; la 375 px `scrollWidth == innerWidth`).
8. Actualizează `scrise-pilot.json`, rulează `scripts/inventar.mjs`, scrie în `JURNAL.md` și `DE-FACUT.md` pct. 34, commit + push.

Tehnic: snippet-ul (`liquid/snippets/prime-pagina-vizuala.liquid`) citește `prime.curiozitati` și, dacă lipsește, `d.curiozitati`.
Snippet-ul și CSS-ul de pe PILOT sunt identice cu cele din repo (urcate 15.11 cu `themeFilesUpsert`). Tema live nu e atinsă.

## Poze – direcția nouă (Marius, 15.11 noaptea)
- **Fără alte poze cu femei.** De acum: sportivi bărbați. La pre-workout-uri, sportivi foarte musculoși. La gainere, powerlifter sau strongman în off-season.
- **Întâi cadrele reale** din `D:Prime SupplementsShooting foto evo gymshooting evo gym` (planșă: `scripts/plansa.ps1 <folder> <regex> <ieșire.jpg> [coloane]`; decupaj 4:5: `scripts/crop.ps1 <sursă> <cx 0–1> <nume>`; PNG OpenArt → JPEG 2000 px: `scripts/conv-png-jpg.ps1 <folder cu png>`). Exemplu: la Glycerol, sportivul la helcometru. Evidența: `../blog-automation/POZE-SEDINTE-FOTO.md`. Abia apoi OpenArt, cu un sportiv bărbat.
- Scrierea pe PILOT: bulk mutation e blocată de conector; `metafieldsSet` se face de mână, 2 produse pe apel, apoi amprentele **obligatoriu** (la lotul 5 a ieșit o literă greșită).
