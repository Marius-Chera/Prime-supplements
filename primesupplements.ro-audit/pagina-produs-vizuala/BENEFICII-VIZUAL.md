# Tab-ul „Beneficii cheie” vizual – reguli (16.11.2026)

Cerut de Marius pe 16.11: tab-ul „Beneficii cheie” trebuie să fie vizual și prietenos pentru clienți, cu texte care au scor **SEO 100/100 și AI 100/100**. Testul la magneziu bisglicinat a fost aprobat, iar Marius a cerut extinderea la toate produsele. Lucrăm **doar pe tema PILOT** `194315649399`.

- Snippet: `liquid/snippets/prime-beneficii.liquid`. CSS: clasele `.pb-*` din `liquid/assets/prime-pagina-vizuala.css`. Tab-ul din `templates/product.json` (PILOT) randează snippet-ul; fără date, rămâne lista veche `custom.beneficii_cheie`.
- Datele: câmpul `beneficii` din `date/<handle>.json` → metafield-ul `prime.beneficii` (JSON). Exemplu complet: `date/magneziu-bisglicinat-80-caps.json`.

## Format
```json
"beneficii": {
  "titlu": "<H2, max 70 de caractere, cu cuvântul-cheie al produsului (harta CHEIE din scripts/scor-pagina-vizuala.mjs)>",
  "intro": "<2 fraze; prima numește produsul și are cel mult 30 de cuvinte>",
  "conditie": "<când se aplică: doza zilnică / porția, pentru cine>",
  "cifre": [EXACT 3 x {"valoare": "64,5", "unitate": "%", "eticheta": "..."}],
  "carduri": [3–6 x {"icon": "muschi|nerv|energie|echilibru|scut|frunza|capsula", "titlu": "<max 28 de caractere>", "text": "<max 160 de caractere>", "mentiune_autorizata": true|false}],
  "de_ce": {"titlu": "De ce <produs>?", "puncte": [3–4 fapte]},
  "pasi": [3 x {"titlu": "...", "text": "..."}],
  "nota": "<condiția de doză/porție; la suplimente: Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată.>",
  "surse": [{"text": "...", "url": "..."}]
}
```

## Reguli de conținut (le verifică validatorul și scorul)
1. **Mențiuni de sănătate:** DOAR textele din `mentiuni-autorizate.json`, copiate identic (sau două ale aceluiași nutrient unite cu „și la”), și doar dacă nutrientul atinge condiția **la doza zilnică de pe etichetă**: vitamine și minerale ≥ 15% VNR; proteine doar la produsele care sunt sursă de proteine; creatină doar la 3 g/zi. Cardul cu mențiune are `"mentiune_autorizata": true`, iar `surse` conține Regulamentul (UE) 432/2012.
2. **Produse fără mențiune autorizată** (BCAA, EAA, glutamină, plante, cafeină, unturi, creme de orez, batoane): cardurile spun **ce primești și cât** (cifre de pe etichetă, formă, gust, mod de folosire), nu ce face în corp. Toate cardurile au `"mentiune_autorizata": false`. Pentru ingredientele din `fara_mentiuni_autorizate` nu folosi verbe de efect (susține, ajută, crește, reduce, contribuie…).
3. Interzis: vindecă, tratează, previne, boală, slăbire, arde grăsimi, detox, anabolic, hormoni, testosteron, garantat, superior, „cel mai bun”, clinic, absorbție rapidă, recuperare rapidă, promisiuni de rezultat. Fără furnizor sau fabrică.
4. Cifrele vin de pe etichetă (`date/<handle>.eticheta.txt`); un calcul simplu (de ex. 3 × 300 mg) e permis, dacă e corect. Studiile vin doar din `../blog-automation/SURSE-PUBMED.md`, cu link PubMed în `surse`.
5. Textele trebuie să difere de la un produs la altul (fără fraze copiate) și de restul paginii (nu repeta intro-ul din „Despre produs”). Limba română cu diacritice, persoana a doua, fraze scurte.
6. Ton prietenos, ca pentru un client care nu știe suplimente: titlurile cardurilor sunt etichete clare („Sistemul muscular”, „7,1 g BCAA la porție”, „Fără zahăr adăugat”).

## Verificare înainte de scriere
- `node scripts/valideaza-pagina-vizuala.mjs date --cere-curiozitati` → 0 erori.
- `node scripts/scor-pagina-vizuala.mjs <handle>` → SEO 100 AI 100 **și** „Beneficii: SEO 100 AI 100”.

## Scriere pe PILOT
`node scripts/variabile-metafields.mjs --doar-beneficii h1 h2` → `metafieldsSet` (2 produse pe apel; bulk mutation e blocată), cu variabilele copiate exact. Apoi `node scripts/amprente.mjs h…` dă cheile `<handle>#ben`, iar codul pentru browser din comentariul scriptului trebuie să dea aceeași valoare.
