# Corectarea faptelor din articole față de etichete (15.10.2026, noaptea, ora României 16.10 02:30)

Sursa listei: `themarketer/newsletter/review.md`, secțiunea 2, punctul 1. Faptele vin din `top50/label_facts.md` și din conținutul revizuit `top50/final/*.json`, verificate și cu metafieldurile live `custom.ingrediente` / `custom.detalii_produs`.

**Metodă:** am citit fiecare articol din Shopify Admin, am salvat corpul în `primesupplements.ro-audit/backups/seo-creatina-2026-10-15/articles/<handle>.before-facts.html` (plus `.before-facts.meta.json` cu titlu, rezumat, isPublished, publishedAt, etichete și imagine) și am făcut doar înlocuiri de text cu `python3 -I` (`fixfacts_scripts/edits.py`, `apply_edits.py`). Am rulat verificările (`fixfacts_scripts/checks.py`), apoi `articleUpdate` doar cu `body` (și `summary` acolo unde rezumatul avea o cifră greșită). Versiunile noi sunt salvate ca `<handle>.after-facts.html`.

**Verificări:** nu există ș/ț cu sedilă, secvența de taguri HTML este identică înainte și după, toate ancorele interne există, 22 de linkuri și 17 imagini răspund cu 200, nu a rămas nicio cifră veche, iar editările nu au introdus cuvinte interzise. Am recitit după update: isPublished și publishedAt sunt **identice** la toate cele 5 articole (cele 3 programate au rămas programate). Corpul recitit este identic cu versiunea locală: EAA prin Admin (comparație exactă, 15 894 de caractere), cele 2 articole publicate pe site-ul live (comparație exactă), iar crema și whey prin citire din Admin.

| Articol | Stare (neschimbată) | isPublished / publishedAt după update |
|---|---|---|
| EAA în post intermitent: rupe postul sau nu? (`eaa-post-intermitent-rupe-postul-nu`) | programat 16.10.2026 09:00 (06:00Z) | false / 2026-10-16T06:00:00Z |
| Crema de orez înainte de antrenament: când și cât mănânci (`crema-orez-inainte-antrenament-cand-cat-mananci`) | programat 16.10.2026 13:00 (10:00Z) | false / 2026-10-16T10:00:00Z |
| Cum citești eticheta unei proteine whey: ce verifici (`citesti-eticheta-unei-proteine-whey-verifici`) | programat 17.10.2026 13:00 (10:00Z) | false / 2026-10-17T10:00:00Z |
| Câtă proteină pe zi: calcul pe greutate și obiectiv (`cata-proteina-trebuie-zi-calcul-greutate-obiectiv`) | publicat 13.10.2026 | true / 2026-10-13T17:21:00Z |
| Magneziul seara: cum îl iei, ce doză și ce spune UE despre somn (`magneziu-seara-somn-il-iei-doza`) | publicat 15.10.2026 | true / 2026-10-15T15:00:03Z |

## EAA în post intermitent: rupe postul sau nu?
`eaa-post-intermitent-rupe-postul-nu` · gid://shopify/Article/1025275167095 · programat 16.10.2026 09:00 (06:00Z)

**Sursa faptelor:** Eticheta Prime EAA (Peach Ice Tea; custom.ingrediente): 21,4 kcal la porția de 6 g (2 măsuri), 0 g carbohidrați, 5350 mg aminoacizi esențiali.

**Ce s-a schimbat:** Înlocuit toate cele 4 afirmații „cel mult 24 kcal, calculat de noi” din corp și cea din rezumat cu valoarea declarată pe etichetă (21,4 kcal). Paragraful cu estimarea maximă a fost redus la valoarea de pe etichetă.

**Înainte → după (corp):**

1. Înainte: „Dacă toată doza ar fi aminoacizi, ar ieși în jur de 24 kcal, valoare calculată de noi, nu declarată pe pagina produsului. Pudra conține însă și acidifianți, arome și îndulcitori, așa că 24 kcal este o estimare maximă, iar aportul real este ceva mai mic. Pentru valorile exacte, verifică eticheta.”
   După: „Eticheta declară 21,4 kcal la porția de 6 g (2 măsuri), cu 0 g carbohidrați și 5350 mg de aminoacizi esențiali. Pentru valorile exacte, verifică eticheta.”
2. Înainte: „o doză de cel mult 24 kcal contează foarte puțin în bilanț.”
   După: „o doză de 21,4 kcal contează foarte puțin în bilanț.”
3. Înainte: „Aport mic de calorii, cel mult circa 24 kcal calculate”
   După: „Aport mic de calorii, 21,4 kcal la o doză, conform etichetei”
4. Înainte: „EAA furnizează calorii, cel mult aproximativ 24 kcal la o doză de 6 g, după calculul nostru, deci întrerup un post strict.”
   După: „EAA furnizează calorii, 21,4 kcal la o doză de 6 g, conform etichetei, deci întrerup un post strict.”

**Rezumat (summary):**

- Înainte: „o doză Prime EAA are aproximativ 6 g, adică cel mult circa 24 kcal, după calculul nostru.”
- După: „o doză Prime EAA are aproximativ 6 g, adică 21,4 kcal, conform etichetei.”

## Crema de orez înainte de antrenament: când și cât mănânci
`crema-orez-inainte-antrenament-cand-cat-mananci` · gid://shopify/Article/1025275199863 · programat 16.10.2026 13:00 (10:00Z)

**Sursa faptelor:** Fișa tehnică tort de ciocolată (label_facts.md) + custom.ingrediente / custom.detalii_produs: per 45 g (1 măsură): 155,8 kcal, grăsimi 0,65 g (sat. 0,25 g), glucide 32,6 g (zaharuri 0,3 g), fibre 1,4 g, proteine 4,2 g, sare 0,15 g; 346,1 kcal/100 g; ingrediente: făină de orez pregelatinizată, cacao cu conținut redus de grăsimi, arome, sare, îndulcitori; preparare: 45 g cu 150–200 ml apă sau lapte rece; 22 porții/1 kg. Prime Whey 2 kg Bourbon Vanilla: 81,5 g proteine/100 g.

**Ce s-a schimbat:** Toate cifrele vechi (78,1 g glucide/100 g, 8,0 g proteine, 0,6 g grăsimi, 1,5 g fibre, 0,6 g zaharuri, „circa 35 g carbohidrați / 160 kcal”, 35–70 g) înlocuite cu valorile de pe etichetă; scos „Pagina produsului nu indică gramajul unei cupe” (pagina spune 1 măsură = 45 g); „cupă/cupe” → „măsură/măsuri”; modul de preparare atribuit greșit paginii produsului („cea mai fină textură… apă ușor călduță”, „cald sau rece”) înlocuit cu cel de pe etichetă; lista de ingrediente din „Are zahăr?” corectată (avea doar făină de orez și îndulcitori); la „fără zahăr adăugat” din cele 2 carduri de produs s-a adăugat mențiunea obligatorie „conține zaharuri prezente în mod natural” (Reg. 1924/2006, anexă), ca pe pagina produsului; whey 82 g → 81,5 g. Rezumatul: 35–70 g → 33–65 g.

**Înainte → după (corp):**

1. Înainte: „O porție de Prime Creamy Rice (aproximativ 45 g) aduce în jur de 35 g de carbohidrați și circa 160 kcal.”
   După: „O porție de Prime Creamy Rice tort de ciocolată (45 g, adică 1 măsură) aduce 32,6 g de carbohidrați și 155,8 kcal, conform etichetei.”
2. Înainte: „de obicei în 1–2 porții de aproximativ 45 g amestecate cu apă sau lapte (circa 35–70 g de carbohidrați, adică 0,5–1 g/kg pentru o persoană de 70 kg).”
   După: „de obicei în 1–2 porții de aproximativ 45 g amestecate cu apă sau lapte (circa 33–65 g de carbohidrați, adică aproximativ 0,5–1 g/kg pentru o persoană de 70 kg).”
3. Înainte: „așa că pudra se amestecă direct cu lichidul, cald sau rece. La 100 g de pudră, eticheta indică 78,1 g de glucide, 8,0 g de proteine, 0,6 g de grăsimi și 1,5 g de fibre.”
   După: „așa că pudra se amestecă direct cu apa sau laptele rece. La o porție de 45 g (1 măsură), eticheta aromei tort de ciocolată indică 32,6 g de glucide, 4,2 g de proteine, 0,65 g de grăsimi și 1,4 g de fibre.”
4. Înainte: „fără zahăr adăugat; tub de 1 kg cu 22 de porții.”
   După: „fără zahăr adăugat (conține zaharuri prezente în mod natural); tub de 1 kg cu 22 de porții.”
5. Înainte: „Tubul de 1 kg are 22 de porții, deci o porție înseamnă aproximativ 45 g de pudră (1000 g împărțit la 22). Pagina produsului nu indică gramajul unei cupe, așa că primele dăți merită să cântărești pudra. La o porție de acest fel, calculat din valorile la 100 g, ajungi la circa 35 g de carbohidrați, 3–4 g de proteine și aproximativ 160 kcal.”
   După: „Tubul de 1 kg are 22 de porții, iar pagina produsului precizează că o porție înseamnă 45 g de pudră (1 măsură). Primele dăți merită totuși să cântărești pudra. La o porție de 45 g, eticheta aromei tort de ciocolată declară 32,6 g de carbohidrați, 4,2 g de proteine și 155,8 kcal.”
6. Înainte: „pui 1–2 cupe de pudră într-un bol, în funcție de necesarul tău caloric, adaugi apă sau lapte și amestecezi cu un tel până obții consistența dorită. Poți folosi lichid cald, rece sau la temperatura camerei, fără fierbere. Cea mai fină textură se obține, conform paginii produsului, cu apă la temperatura camerei sau ușor călduță.”
   După: „pui 1–2 măsuri de pudră (45 g fiecare) într-un bol, în funcție de necesarul tău caloric, adaugi 150–200 ml de apă sau lapte rece la fiecare măsură și amestecezi cu un tel până obții o consistență cremoasă, fără fierbere. Conform etichetei, o poți consuma ca atare sau adăugată în smoothie-uri ori shake-uri proteice.”
7. Înainte: „un concentrat de zer cu 82 g de proteine la 100 g de produs.”
   După: „un concentrat de zer cu 81,5 g de proteine la 100 g de produs (aroma Bourbon Vanilla).”
8. Înainte: „începe cu o cupă și mărește treptat cantitatea de apă.”
   După: „începe cu o măsură și mărește treptat cantitatea de apă.”
9. Înainte: „Lista de ingrediente nu conține zahăr (doar făină de orez pregelatinizată și îndulcitori), iar eticheta arată 0,6 g de zaharuri la 100 g. Totuși, conține 78,1 g de glucide la 100 g, în principal amidon din orez.”
   După: „Lista de ingrediente nu conține zahăr (făină de orez pregelatinizată, cacao cu conținut redus de grăsimi, arome, sare și îndulcitori), iar eticheta arată 0,3 g de zaharuri, prezente în mod natural, la porția de 45 g. Totuși, o porție conține 32,6 g de glucide, în principal amidon din orez.”
10. Înainte: „Tub de 1 kg cu 22 de porții, fără zahăr adăugat, se prepară fără fierbere cu apă sau lapte.”
   După: „Tub de 1 kg cu 22 de porții, fără zahăr adăugat (conține zaharuri prezente în mod natural), se prepară fără fierbere cu apă sau lapte.”
11. Înainte: „De obicei 1–2 porții de aproximativ 45 g (circa 35–70 g de carbohidrați, adică 0,5–1 g/kg pentru o persoană de 70 kg)”
   După: „De obicei 1–2 porții de aproximativ 45 g (circa 33–65 g de carbohidrați, adică aproximativ 0,5–1 g/kg pentru o persoană de 70 kg)”
12. Înainte: „Crema de orez conține puține fibre (1,5 g la 100 g)”
   După: „Crema de orez conține puține fibre (1,4 g la porția de 45 g)”

**Rezumat (summary):**

- Înainte: „(circa 35–70 g de carbohidrați, adică 0,5–1 g/kg pentru o persoană de 70 kg)”
- După: „(circa 33–65 g de carbohidrați, adică aproximativ 0,5–1 g/kg pentru o persoană de 70 kg)”

## Cum citești eticheta unei proteine whey: ce verifici
`citesti-eticheta-unei-proteine-whey-verifici` · gid://shopify/Article/1025275265399 · programat 17.10.2026 13:00 (10:00Z)

**Sursa faptelor:** Eticheta Prime Whey 2 kg, Bourbon Vanilla (prime-whey-2000g, custom.ingrediente): 81,5 g proteine/100 g, 24,4 g la porția de 30 g; alte arome între 79,0 și 81,4 g/100 g („valori apropiate”); mod de administrare: 1 măsură (30 g) cu 150–200 ml apă sau lapte.

**Ce s-a schimbat:** 82 g → 81,5 g (6 locuri, inclusiv rezumatul), 24,6 g → 24,4 g, 30 × 0,82 → 30 × 0,815, 1640 g → 1630 g, rest 18 g → 18,5 g; la „După antrenament” 250–300 ml → 150–200 ml (cantitatea de pe etichetă).

**Înainte → după (corp):**

1. Înainte: „Prime Whey 2 kg declară 82 g de proteine la 100 g; la o porție de aproximativ 30 g, asta înseamnă circa 24,6 g de proteine.”
   După: „Prime Whey 2 kg declară 81,5 g de proteine la 100 g și 24,4 g la porția de 30 g (aroma Bourbon Vanilla; celelalte arome au valori apropiate).”
2. Înainte: „Prime Whey 2 kg declară 82 g de proteine la 100 g de produs. Ambalajul are 2000 g și 66 de porții de aproximativ 30 g. Restul pudrei (aproximativ 18 g la 100 g)”
   După: „Prime Whey 2 kg declară 81,5 g de proteine la 100 g de produs (aroma Bourbon Vanilla; celelalte arome au valori apropiate). Ambalajul are 2000 g și 66 de porții de aproximativ 30 g. Restul pudrei (aproximativ 18,5 g la 100 g)”
3. Înainte: „Concentrat de zer Prime Supplements cu 82 g de proteine la 100 g; tub de 2000 g”
   După: „Concentrat de zer Prime Supplements cu 81,5 g de proteine la 100 g (aroma Bourbon Vanilla); tub de 2000 g”
4. Înainte: „Pentru Prime Whey, 30 g de pudră cu 82 g de proteine la 100 g înseamnă aproximativ 24,6 g de proteine per porție (30 × 0,82).”
   După: „Pentru Prime Whey Bourbon Vanilla, 30 g de pudră cu 81,5 g de proteine la 100 g înseamnă aproximativ 24,4 g de proteine per porție (30 × 0,815), cât declară și eticheta.”
5. Înainte: „la Prime Whey, 2000 g × 0,82 = 1640 g de proteine.”
   După: „la Prime Whey Bourbon Vanilla, 2000 g × 0,815 = 1630 g de proteine.”
6. Înainte: „După antrenament: o porție cu 250–300 ml de apă sau lapte.”
   După: „După antrenament: o porție cu 150–200 ml de apă sau lapte, cum indică eticheta.”
7. Înainte: „Prime Whey 2 kg declară 82 g de proteine la 100 g de produs.”
   După: „Prime Whey 2 kg declară 81,5 g de proteine la 100 g de produs la aroma Bourbon Vanilla, iar celelalte arome au valori apropiate.”
8. Înainte: „La 30 g de Prime Whey, cu 82 g de proteine la 100 g, rezultă aproximativ 24,6 g de proteine.”
   După: „La 30 g de Prime Whey Bourbon Vanilla, cu 81,5 g de proteine la 100 g, rezultă aproximativ 24,4 g de proteine.”

**Rezumat (summary):**

- Înainte: „Prime Whey 2 kg declară 82 g de proteine la 100 g.”
- După: „Prime Whey 2 kg declară 81,5 g de proteine la 100 g (aroma Bourbon Vanilla).”

## Câtă proteină pe zi: calcul pe greutate și obiectiv
`cata-proteina-trebuie-zi-calcul-greutate-obiectiv` · gid://shopify/Article/1025262748023 · publicat 13.10.2026

**Sursa faptelor:** Aceeași etichetă Prime Whey 2 kg Bourbon Vanilla: 81,5 g/100 g, 24,4 g / 30 g.

**Ce s-a schimbat:** 82 g → 81,5 g (2 locuri), „în jur de 25 g” → 24,4 g / „aproximativ 24 g” / „în jur de 24 g” (3 locuri). Rezumatul nu avea cifre de produs: neschimbat.

**Înainte → după (corp):**

1. Înainte: „din concentrat de zer Prime Supplements, cu 82 g de proteine la 100 g de produs, 66 de porții și șapte arome.”
   După: „din concentrat de zer Prime Supplements, cu 81,5 g de proteine la 100 g de produs (aroma Bourbon Vanilla), 66 de porții și șapte arome.”
2. Înainte: „conține 82 g de proteine la 100 g de produs, adică în jur de 25 g de proteine într-o porție de aproximativ 30 g.”
   După: „conține 81,5 g de proteine la 100 g de produs (aroma Bourbon Vanilla; celelalte arome au valori apropiate), adică 24,4 g de proteine într-o porție de 30 g.”
3. Înainte: „un shake de 30 g aduce în jur de 25 g și închide diferența.”
   După: „un shake de 30 g aduce aproximativ 24 g și închide diferența.”
4. Înainte: „o porție de aproximativ 30 g de Prime Whey adaugă în jur de 25 g de proteine”
   După: „o porție de aproximativ 30 g de Prime Whey adaugă în jur de 24 g de proteine”

## Magneziul seara: cum îl iei, ce doză și ce spune UE despre somn
`magneziu-seara-somn-il-iei-doza` · gid://shopify/Article/1025275134327 · publicat 15.10.2026

**Sursa faptelor:** Eticheta Magneziu bisglicinat Prime Health (label_facts.md, custom.detalii_produs): 3 capsule pe zi; 80 de capsule ≈ 26 de zile; magneziu bisglicinat 300 mg (21,52% VNR) per capsulă ≈ 64,5% VNR la 3 capsule; magneziu malat 100 mg.

**Ce s-a schimbat:** „80 de capsule, cu 80 de porții declarate” și citatul vechi „urmați doza zilnică indicată pe ambalaj” → 3 capsule pe zi, ≈ 26 de zile; paragraful despre doză rescris: VNR 375 mg, doza zilnică de 3 capsule și 21,52% VNR per capsulă (≈ 64,5% la 3 capsule), „urmezi doza de pe etichetă și nu depăși 3 capsule pe zi”, iar dacă mai iei alte suplimente cu magneziu întrebi medicul. Nu mai apare nicio comparație cu nivelul EFSA de 250 mg (nici în cele 2 răspunsuri din FAQ care spuneau „nu depășești 250 mg… EFSA”). „O doză pe zi” → „O doză pe zi (3 capsule)”; „capsula” → „capsulele” în jurnal; „fără să dublezi doza” → „fără să iei doza de două ori” (cuvânt interzis). Rezumatul nu avea cifre: neschimbat.

**Înainte → după (corp):**

1. Înainte: „Pe pagina produsului scrie: „urmați doza zilnică indicată pe ambalaj”, iar flaconul conține 80 de capsule, cu 80 de porții declarate.”
   După: „Eticheta și pagina produsului indică 3 capsule pe zi, iar flaconul conține 80 de capsule, adică aproximativ 26 de zile la această doză.”
2. Înainte: „Pentru context, valoarea de referință pentru adulți este de 375 mg de magneziu pe zi, iar Autoritatea Europeană pentru Siguranța Alimentară (EFSA) a stabilit un nivel maxim tolerabil de 250 mg pe zi pentru magneziul din suplimente, din apă și din alimentele îmbogățite. Magneziul prezent în mod natural în alimente nu intră în această limită. De aceea, verifică pe etichetă cantitatea de magneziu elementar pe doză și adună tot ce iei din suplimente, inclusiv multivitaminele și băuturile cu electroliți.”
   După: „Pentru context, valoarea nutrițională de referință (VNR) pentru adulți este de 375 mg de magneziu pe zi. Eticheta Magneziu bisglicinat Prime Health indică o doză zilnică de 3 capsule și declară, pentru magneziul bisglicinat, 21,52% din VNR per capsulă, adică aproximativ 64,5% la cele 3 capsule. Urmezi doza de pe etichetă și nu depăși 3 capsule pe zi. Dacă mai iei și alte suplimente cu magneziu, inclusiv multivitamine sau băuturi cu electroliți, întreabă medicul înainte să le combini.”
3. Înainte: „O doză pe zi, la aceeași oră, conform ambalajului.”
   După: „O doză pe zi (3 capsule), la aceeași oră, conform ambalajului.”
4. Înainte: „fără să dublezi doza dacă ai uitat o zi.”
   După: „fără să iei doza de două ori dacă ai uitat o zi.”
5. Înainte: „ora la care iei capsula, dacă ai luat-o cu mâncare și dacă ai sărit vreo zi.”
   După: „ora la care iei capsulele, dacă le-ai luat cu mâncare și dacă ai sărit vreo zi.”
6. Înainte: „dacă stomacul tolerează bine capsula.”
   După: „dacă stomacul tolerează bine capsulele.”
7. Înainte: „Urmezi doza de pe ambalaj. Pentru context, valoarea de referință pentru adulți este de 375 mg pe zi, iar EFSA a stabilit un nivel maxim tolerabil de 250 mg pe zi pentru magneziul din suplimente.”
   După: „Urmezi doza de pe etichetă: 3 capsule pe zi, cu 21,52% din valoarea nutrițională de referință per capsulă pentru magneziul bisglicinat. Dacă mai iei și alte suplimente cu magneziu, întreabă medicul.”
8. Înainte: „Da, dacă respecți doza de pe ambalaj și nu depășești 250 mg pe zi de magneziu din suplimente (nivelul maxim tolerabil stabilit de EFSA). Dacă ai afecțiuni sau iei medicamente, cere sfatul medicului.”
   După: „Da, dacă respecți doza de pe etichetă, 3 capsule pe zi. Dacă mai iei și alte suplimente cu magneziu, ai afecțiuni sau iei medicamente, cere sfatul medicului.”

## Observații în afara listei (nu am modificat, decide Marius)

1. **EAA:** articolul spune „Culoarea provine din riboflavină”. Eticheta Peach Ice Tea are însă „roșu sfeclă, extract de paprika”, iar pagina produsului le menționează pe amândouă. În plus, „se amestecă cu apă sau cu o altă băutură” și „înainte, în timpul sau după antrenament” nu se potrivesc cu eticheta, care spune „cu apă”, „între mese, cu 30–45 min înainte sau imediat după”. Ambele sunt detalii mici. Le-am lăsat așa, pentru că nu erau pe listă.
2. **Whey (ambele articole):** fraza „Proteinele contribuie la creșterea și la menținerea masei musculare” unește două mențiuni autorizate. Pagina produsului le are separat, în forma oficială, iar „…descrie proteinele în general, nu un brand anume” este o formulare discutabilă. În „Câtă proteină”, textul „Eticheta recomandă… O iei după antrenament sau ca gustare între mese” nu apare pe etichetă. Pe etichetă scrie 150–200 ml și 1–4 porții pe zi.
3. **Magneziu:** în „Pe scurt” a rămas „deci nu promitem că adormi mai repede”. Review-ul newsletterului a considerat formularea o mențiune implicită și a scos-o din e-mail, dar sarcina cerea să păstrez restul articolului. Imaginea principală (flaconul pe noptieră) rămâne la fel.
4. **Cremă de orez:** alt textul imaginii principale („Prime Creamy Rice cu tort de ciocolată…”) sugerează un tort. Nu l-am schimbat, pentru că sarcina permitea doar corpul și rezumatul. Nota „5 din 5, din 33 de recenzii” nu a fost verificată.
5. **Superlative editoriale existente:** EAA are „cele mai bune alternative sunt cele fără calorii” și „Cea mai simplă soluție/variantă”. Nu sunt mențiuni despre produs, așa că le-am lăsat.
6. Linkurile din articole spre cele 3 articole programate dau 404 până la publicare. Nu au existat astfel de linkuri în aceste 5 corpuri: toate linkurile au răspuns cu 200.
