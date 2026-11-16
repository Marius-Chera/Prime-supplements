// Rescrierea articolului unt-de-arahide-beneficii-sportivi (16.11.2026), după GHID-REDACTIONAL.md §2b, 2c, 3, 4, 5, 6b și BRIEF-LOT2.
// Folosire: node build-unt-arahide.mjs → scrie unt-de-arahide-beneficii-sportivi.html și .meta.json lângă acest fișier.
// Fapte de produs: unt-de-arahide (ACTIVE), descriere + metafield-uri (custom.ingrediente, custom.detalii_produs, reviews.*) citite prin Admin API pe 16.11.2026:
//   la 100 g: 2406 kJ / 581 kcal, 46 g grăsimi (6,1 g saturați), 12 g glucide (6,4 g zaharuri), 7 g fibre, 26 g proteine, 0 g sare;
//   100% unt de arahide din arahide prăjite; fără zahăr adăugat, sare, ulei de palmier, conservanți; conține arahide; borcan de sticlă 600 g; nota 5,0 din 4 recenzii.
//   Untul de migdale (produs complementar): 567 kcal, 49 g grăsimi (3,7 g saturați), 21,2 g proteine, 9,5 g glucide (3,9 g zaharuri), 3 g fibre la 100 g.
// Condiții Reg. 1924/2006 verificate cu cifrele de pe etichetă:
//   proteine 26 g × 4 kcal = 104 kcal = 17,9% din 581 kcal → „sursă de proteine” (≥12%), dar NU „bogat în proteine” (≥20%);
//   fibre 7 g/100 g → „bogat în fibre” (≥6 g); mențiunea pentru înlocuirea grăsimilor saturate NU se folosește
//   (eticheta nu declară acizii grași mononesaturați/polinesaturați, deci condiția nu se poate verifica).
// „Lingura” nu e definită pe etichetă: 16 g, calcul aproximativ (2 linguri = 32 g, ca în studiul Lilly 2019; studiul nu e citat).
// Studii: Jäger 2017 și Gebauer 2016 (bibliotecă); Moon 2026, Alper 2002, Arya 2016 – verificate azi cu esummary + efetch.
// Imaginea principală rămâne cea actuală (fără generare AI).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const pubmed = (pmid, text) => `<a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/" rel="noopener">${text}</a>`;
const REG = '<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>';
const REG1924 = '<a href="https://eur-lex.europa.eu/eli/reg/2006/1924/oj" rel="noopener">Regulamentul (CE) nr. 1924/2006</a>';

const P = {
  handle: 'unt-de-arahide',
  title: 'Unt de arahide Prime Health, 600 g',
  img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_UNTDEARAHIDE_600g_front.jpg?v=1794828908',
};

function productBox(line, cta) {
  return `<div style="margin: 30px 0; padding: 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
  <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
    <a href="/products/${P.handle}" style="flex-shrink: 0;"><img src="${P.img}&width=240" alt="${P.title}" loading="lazy" width="120" height="120" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px;"></a>
    <div style="flex: 1; min-width: 200px;">
      <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1e293b;">${P.title}</p>
      <p style="margin: 0 0 12px 0; color: #334155;">${line}</p>
      <a href="/products/${P.handle}" style="display: inline-block; background: #b65b5d; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">${cta} →</a>
    </div>
  </div>
</div>`;
}

function table(head, rows) {
  const th = head.map(h => `<th style="padding: 12px; text-align: left; border: 1px solid #ddd;">${h}</th>`).join('');
  const tr = rows.map(r => `<tr>${r.map(c => `<td style="padding: 10px; border: 1px solid #ddd;">${c}</td>`).join('')}</tr>`).join('\n    ');
  return `<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead><tr style="background-color: #b65b5d; color: #ffffff;">${th}</tr></thead>
  <tbody>
    ${tr}
  </tbody>
</table>`;
}

const SHORT = `<div style="background: #ea8a8a15; border-left: 4px solid #ea8a8a; padding: 16px 20px; margin-bottom: 24px; border-radius: 4px;">
  <p style="margin: 0 0 12px 0; font-weight: 600; color: #a54f51;">Pe scurt</p>
  <ul style="margin: 0; padding-left: 20px; color: #334155;">
    <li style="margin-bottom: 8px;">Untul de arahide Prime Health are, la 100 g, 581 kcal, 26 g de proteine, 46 g de grăsimi și 7 g de fibre, conform etichetei.</li>
    <li style="margin-bottom: 8px;">Proteinele dau 17,9% din valoarea energetică, peste pragul UE de 12%, deci produsul este sursă de proteine; cu 7 g de fibre la 100 g, este bogat în fibre.</li>
    <li style="margin-bottom: 8px;">O lingură de aproximativ 16 g înseamnă circa 93 kcal și 4,2 g de proteine (calcul aproximativ).</li>
    <li style="margin-bottom: 8px;">Un singur ingredient, 100% arahide prăjite, fără zahăr adăugat; conține arahide, deci nu e pentru cei alergici.</li>
  </ul>
</div>`;

const BODY = `<p><strong>Untul de arahide are beneficii concrete pe etichetă: untul de arahide natural Prime Health are 26 g de proteine și 7 g de fibre la 100 g, deci este sursă de proteine și bogat în fibre.</strong> Untul de arahide este pasta obținută din arahide prăjite și măcinate. Fiind dens caloric (581 kcal la 100 g), îl folosești cântărit, ca pe orice altă grăsime din dietă.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#valori-nutritionale">Unt de arahide: valori nutriționale la 100 g și pe lingură</a></li>
  <li><a href="#beneficii">Beneficiile untului de arahide, după etichetă și regulile UE</a></li>
  <li><a href="#proteine">Unt de arahide și proteine: cât contează la sportivi</a></li>
  <li><a href="#calorii">Caloriile din untul de arahide și ce arată studiile</a></li>
  <li><a href="#arahide-sau-unt">Arahide sau unt de arahide: ce diferă</a></li>
  <li><a href="#cum-il-folosesti">Cum folosești untul de arahide Prime Health</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="valori-nutritionale">Unt de arahide: valori nutriționale la 100 g și pe lingură</h2>
<p>Valorile de mai jos sunt cele din declarația nutrițională a borcanului de unt de arahide Prime Health. Eticheta dă valorile la 100 g și nu definește o lingură, așa că pentru coloana a doua am presupus o lingură de 16 g (calcul aproximativ, rotunjit).</p>
${table(['La', '100 g (eticheta)', '1 lingură ≈ 16 g (calcul aproximativ)'], [
  ['Valoare energetică', '2406 kJ / 581 kcal', '385 kJ / 93 kcal'],
  ['Grăsimi', '46 g', '7,4 g'],
  ['– din care acizi grași saturați', '6,1 g', '1,0 g'],
  ['Glucide', '12 g', '1,9 g'],
  ['– din care zaharuri', '6,4 g', '1,0 g'],
  ['Fibre', '7 g', '1,1 g'],
  ['Proteine', '26 g', '4,2 g'],
  ['Sare', '0 g', '0 g'],
])}
<p>O lingură cu vârf poate depăși 20 g, așa că, dacă îți numeri caloriile, cântărește porția. Zaharurile (6,4 g la 100 g) sunt prezente în mod natural: eticheta spune „fără zahăr adăugat”.</p>

<h2 id="beneficii">Beneficiile untului de arahide, după etichetă și regulile UE</h2>
<p>Beneficiile untului de arahide pe care le poți spune legal în UE țin de proteine și fibre, nu de promisiuni generale. Un aliment poate fi numit „sursă de proteine” dacă proteinele aduc cel puțin 12% din valoarea energetică, iar „bogat în fibre” dacă are cel puțin 6 g de fibre la 100 g (${REG1924}, anexa).</p>
<ul>
  <li><strong>Proteinele:</strong> 26 g × 4 kcal = 104 kcal, adică 17,9% din cele 581 kcal. Trece pragul de 12% pentru „sursă de proteine”, dar nu și pragul de 20% pentru „bogat în proteine”.</li>
  <li><strong>Fibrele:</strong> 7 g la 100 g, peste pragul de 6 g pentru „bogat în fibre”.</li>
  <li><strong>Grăsimile:</strong> din cele 46 g, 6,1 g sunt acizi grași saturați. Eticheta nu defalcă restul pe tipuri, așa că nu folosim nicio mențiune despre grăsimile nesaturate.</li>
</ul>
<p>Pentru că produsul este sursă de proteine, se aplică mențiunile autorizate din ${REG}: proteinele contribuie la creșterea masei musculare și proteinele contribuie la menținerea masei musculare. Ambele țin de aportul total de proteine din zi, nu de un singur aliment.</p>

${productBox('100% unt de arahide din arahide prăjite: 26 g de proteine și 7 g de fibre la 100 g, fără zahăr adăugat. Borcan de sticlă de 600 g.', 'Vezi produsul')}

<h2 id="proteine">Unt de arahide și proteine: cât contează la sportivi</h2>
<p>Untul de arahide aduce proteine, dar puține pe porție: o lingură de 16 g are aproximativ 4,2 g. Poziția oficială a Societății Internaționale de Nutriție Sportivă recomandă 1,4–2,0 g de proteine pe kilogram pe zi pentru majoritatea celor care se antrenează, în porții de 20–40 g la 3–4 ore (${pubmed('28642676', 'Jäger și colab., 2017')}).</p>
<p>Ca să iei 20 g de proteine doar din unt de arahide ți-ar trebui circa 77 g, adică aproape 450 kcal (calcul aproximativ). De aceea, la sportivii cu care lucrăm, untul de arahide completează o masă cu carne, ouă, lactate sau proteină din zer; nu o înlocuiește.</p>
<p>Într-un studiu randomizat, 17 adulți de 30–55 de ani au făcut 16 săptămâni de antrenament de forță și cardio și au primit după fiecare antrenament fie un smoothie cu unt de arahide, fie unul cu aceleași calorii, fără arahide. Masa slabă a crescut cu 4% în ambele grupuri, fără diferență între ele (${pubmed('42516258', 'Moon și colab., 2026')}). Limitele: puțini participanți, adulți de vârstă medie, nu sportivi.</p>

<h2 id="calorii">Caloriile din untul de arahide și ce arată studiile</h2>
<p>Caloriile din untul de arahide se numără integral: la forma de pastă, organismul absoarbe practic cât arată calculul de pe etichetă. Un studiu controlat pe 18 adulți a măsurat caloriile absorbite din migdale întregi, tocate și din unt de migdale: migdalele întregi au dat mai puțin decât calculul, iar untul (6,53 kcal/g) a fost apropiat de valoarea calculată (${pubmed('27713968', 'Gebauer și colab., 2016')}).</p>
<p>Lucrarea e pe migdale, nu pe arahide (${pubmed('27713968', 'Gebauer și colab., 2016')}), dar logica e aceeași pentru o pastă fin măcinată: cele 581 kcal la 100 g de pe borcan sunt o cifră reală.</p>
<p>Un studiu de 30 de săptămâni pe 15 adulți cu greutate normală le-a dat circa 505 kcal pe zi din arahide. Când arahidele au înlocuit alte grăsimi din dietă, aportul caloric și greutatea au rămas aceleași; când au fost doar adăugate, participanții au compensat spontan 66% din calorii, iar creșterea în greutate a fost de 1,0 kg, față de 3,6 kg cât s-ar fi așteptat (${pubmed('12119580', 'Alper și Mattes, 2002')}).</p>
<p>Limitele: grup mic, arahide întregi, nu unt. Pentru practică reținem înlocuirea: pui untul de arahide în locul altei grăsimi din masă, nu peste ea.</p>

<h2 id="arahide-sau-unt">Arahide sau unt de arahide: ce diferă</h2>
<p>Untul de arahide Prime Health este făcut doar din arahide prăjite, deci are compoziția arahidelor. Diferă forma: pasta se dozează ușor cu lingura și se amestecă în shake-uri.</p>
<p>O recenzie despre compoziția arahidelor notează că acestea conțin toți cei 20 de aminoacizi, cu arginina în cea mai mare cantitate, plus fibre, vitamine, minerale și compuși fenolici, iar prăjirea crește concentrația unora dintre acești compuși (${pubmed('26787930', 'Arya și colab., 2016')}). Recenzia descrie compoziția, nu efecte dovedite la oameni, așa că nu o folosim ca promisiune.</p>
${table(['La 100 g (etichete Prime Health)', 'Unt de arahide', 'Unt de migdale'], [
  ['Valoare energetică', '581 kcal', '567 kcal'],
  ['Proteine', '26 g', '21,2 g'],
  ['Grăsimi / din care saturați', '46 g / 6,1 g', '49 g / 3,7 g'],
  ['Glucide / din care zaharuri', '12 g / 6,4 g', '9,5 g / 3,9 g'],
  ['Fibre', '7 g', '3 g'],
])}
<p>Dacă vrei variație de gust, <a href="/products/unt-de-migdale">untul de migdale Prime Health</a> are tot un singur ingredient și 21,2 g de proteine la 100 g. Comparația completă, cu tot cu untul de caju, o găsești în articolul <a href="/blogs/news/unt-arahide-migdale-caju-comparatie-nutritionala">unt de arahide, migdale sau caju</a>.</p>

<h2 id="cum-il-folosesti">Cum folosești untul de arahide Prime Health</h2>
<p>Untul de arahide Prime Health este un aliment, nu un supliment, așa că eticheta nu dă o doză zilnică. Recomandarea noastră practică este o porție cântărită de 16–32 g (1–2 linguri), potrivită în caloriile zilei.</p>
<ul>
  <li><strong>Înainte de folosire:</strong> amestecă bine în borcan; uleiul natural al arahidelor se poate separa la suprafață.</li>
  <li><strong>Unde îl pui:</strong> pe pâine prăjită, clătite, în smoothie-uri, cremă de orez sau sosuri.</li>
  <li><strong>Înainte sau după antrenament:</strong> momentul ține de cum îl tolerezi. Grăsimile încetinesc digestia, așa că înainte de antrenament îl ținem la o lingură, cu 1–2 ore înainte.</li>
  <li><strong>Cât ține un borcan:</strong> 600 g la o lingură de 16 g pe zi = aproximativ 37 de zile (calcul aproximativ).</li>
  <li><strong>Alergeni:</strong> conține arahide; nu e potrivit pentru persoanele alergice la arahide.</li>
  <li><strong>Părerea clienților:</strong> nota 5 din 5, din 4 recenzii pe pagina produsului.</li>
</ul>
<p>Pentru restul proteinelor din zi, vezi <a href="/blogs/news/proteine-dupa-30-de-ani">ghidul despre proteine după 30 de ani</a>.</p>

${productBox('Unt de arahide natural 100%, fără zahăr adăugat, fără sare și fără ulei de palmier. Livrare gratuită la comenzile de peste 300 de lei.', 'Comandă untul de arahide')}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Câte proteine are untul de arahide?</h3>
<p>Untul de arahide Prime Health are 26 g de proteine la 100 g, conform etichetei. O lingură de aproximativ 16 g are circa 4,2 g de proteine (calcul aproximativ).</p>
<h3>Câte calorii are o lingură de unt de arahide?</h3>
<p>La 581 kcal la 100 g, o lingură de 16 g are aproximativ 93 kcal, iar două linguri (32 g) circa 186 kcal. Cântărește porția, pentru că o lingură cu vârf poate trece de 20 g.</p>
<h3>Este bun untul de arahide pentru masă musculară?</h3>
<p>Este sursă de proteine, iar proteinele contribuie la creșterea masei musculare (${REG}). Contează însă aportul total din zi: într-un studiu pe 17 adulți, smoothie-ul cu unt de arahide după antrenament nu a adus câștiguri mai mari decât unul cu aceleași calorii fără arahide (${pubmed('42516258', 'Moon și colab., 2026')}).</p>
<h3>Untul de arahide are zahăr?</h3>
<p>Untul de arahide Prime Health nu are zahăr adăugat. Are 6,4 g de zaharuri la 100 g, prezente în mod natural în arahide, conform etichetei.</p>

<p>Untul de migdale și alte alimente din aceeași gamă găsești în colecția <a href="/collections/prime-health">Prime Health</a>.</p>`;

const SOURCES = `<h2 id="surse">Surse</h2>
<p>Lucrările de mai jos sunt citate în text; fiecare link duce la rezumatul de pe PubMed (Biblioteca Națională de Medicină a SUA) sau la textul oficial al legislației UE.</p>
<ol style="padding-left: 20px; color: #334155;">
  <li style="margin-bottom: 8px;">Jäger R și colab. International Society of Sports Nutrition Position Stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20. <a href="https://pubmed.ncbi.nlm.nih.gov/28642676/" rel="noopener">PubMed 28642676</a> · <a href="https://doi.org/10.1186/s12970-017-0177-8" rel="noopener">doi:10.1186/s12970-017-0177-8</a></li>
  <li style="margin-bottom: 8px;">Moon Z și colab. Concurrent Exercise Training Adaptations Over 16 Weeks in Sedentary, Middle-Aged Adults With and Without Post-Exercise Peanut Butter Consumption. Int J Exerc Sci. 2026;19(2):2013. <a href="https://pubmed.ncbi.nlm.nih.gov/42516258/" rel="noopener">PubMed 42516258</a> · <a href="https://doi.org/10.70252/IJES2026213" rel="noopener">doi:10.70252/IJES2026213</a></li>
  <li style="margin-bottom: 8px;">Gebauer SK și colab. Food processing and structure impact the metabolizable energy of almonds. Food Funct. 2016;7(10):4231-4238. <a href="https://pubmed.ncbi.nlm.nih.gov/27713968/" rel="noopener">PubMed 27713968</a> · <a href="https://doi.org/10.1039/c6fo01076h" rel="noopener">doi:10.1039/c6fo01076h</a></li>
  <li style="margin-bottom: 8px;">Alper CM, Mattes RD. Effects of chronic peanut consumption on energy balance and hedonics. Int J Obes Relat Metab Disord. 2002;26(8):1129-37. <a href="https://pubmed.ncbi.nlm.nih.gov/12119580/" rel="noopener">PubMed 12119580</a> · <a href="https://doi.org/10.1038/sj.ijo.0802050" rel="noopener">doi:10.1038/sj.ijo.0802050</a></li>
  <li style="margin-bottom: 8px;">Arya SS, Salve AR, Chauhan S. Peanuts as functional food: a review. J Food Sci Technol. 2016;53(1):31-41. <a href="https://pubmed.ncbi.nlm.nih.gov/26787930/" rel="noopener">PubMed 26787930</a> · <a href="https://doi.org/10.1007/s13197-015-2007-9" rel="noopener">doi:10.1007/s13197-015-2007-9</a></li>
  <li style="margin-bottom: 8px;">Regulamentul (UE) nr. 432/2012 al Comisiei – lista mențiunilor de sănătate permise pentru alimente. <a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">EUR-Lex</a></li>
  <li style="margin-bottom: 8px;">Regulamentul (CE) nr. 1924/2006 privind mențiunile nutriționale și de sănătate (anexa: condițiile pentru „sursă de proteine” și „bogat în fibre”). <a href="https://eur-lex.europa.eu/eli/reg/2006/1924/oj" rel="noopener">EUR-Lex</a></li>
</ol>`;

const DISCLAIMER = `<p><em>Informațiile din acest articol au caracter general și nu înlocuiesc sfatul medicului sau al unui specialist în nutriție. Untul de arahide este un aliment și nu înlocuiește o dietă variată și echilibrată. Discută cu medicul dacă ai alergii alimentare, afecțiuni sau urmezi un tratament medicamentos.</em></p>`;

const AUTHOR = `<div class="author author-box" style="margin-top: 40px; padding: 24px; background: #f8f9fa; border-radius: 8px; display: flex; gap: 20px; align-items: flex-start;" itemprop="author" itemscope itemtype="https://schema.org/Person">
  <img src="https://cdn.shopify.com/s/files/1/0917/5138/3415/files/author-photo-primesupplements1-myshopify-com.jpg?v=1773308575&amp;width=160" alt="Marius Chera, antrenor de culturism" loading="lazy" itemprop="image" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
  <div style="flex: 1;">
    <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1a1a1a;"><a href="/pages/autor-marius-chera" itemprop="url" style="color: #1a1a1a; text-decoration: none;"><span itemprop="name">Marius Chera</span></a></p>
    <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;" itemprop="description">Marius Chera – antrenor de culturism, fondatorul Prime Supplements (2022). Lector la cursurile de instructori din cadrul FRCF, a pregătit sportivi care au obținut carduri PRO și titluri europene și mondiale IFBB. Specializat în online coaching, îmbină experiența din competiții cu știința nutriției sportive.</p>
  </div>
</div>`;

const RELATED = [
  { handle: 'unt-arahide-migdale-caju-comparatie-nutritionala', title: 'Unt de arahide, migdale sau caju: comparație nutrițională', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-unt-arahide-migdale-caju-comparatie-nutritionala-din-sedinta-foto-plaja-prime-bar-2.jpg?v=1793885810', summary: 'Proteine, glucide și calorii la 100 g pentru cele trei unturi Prime Health, puse alături.' },
  { handle: 'citesti-eticheta-unei-proteine-whey-verifici', title: 'Cum citești eticheta unei proteine whey: ce verifici', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-citesti-eticheta-unei-proteine-whey-verifici-din-sedinta-foto-sala-ramat-gantera-prime-whey-2.jpg?v=1792059948', summary: 'Procentul de proteine, ordinea ingredientelor, porția și alergenii, în patru pași.' },
  { handle: 'proteine-dupa-30-de-ani', title: 'Proteine după 30 de ani: izolat sau gainer, ce alegi?', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-gainer-mass-pure-isolate-2000g-future-of-1774008069248_53b7d8c0-b5c0-4d98-9c98-854a04d7577f.png?v=1774859373', summary: 'Cum alegi între izolat și gainer după obiectiv și după cât mănânci în restul zilei.' },
];

const related = `<div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid #e2e8f0;">
  <h3 style="margin: 0 0 24px 0; font-size: 1.5rem; font-weight: 600; color: #a54f51;">Articole Similare</h3>
  <div class="related-posts-grid" style="display: flex; flex-wrap: wrap; gap: 24px;">
${RELATED.map(r => `    <a href="/blogs/news/${r.handle}" class="related-post-card" style="text-decoration: none; color: inherit; display: block; flex: 1 1 calc(50% - 12px); min-width: 280px;">
      <div style="background: white; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); overflow: hidden; height: 100%;">
        <img src="${r.img}&width=800" alt="${r.title}" loading="lazy" style="width: 100%; height: 180px; object-fit: cover;">
        <div style="padding: 20px;">
          <h4 style="margin: 0 0 10px 0; font-size: 1.1rem; font-weight: 600; color: #1e293b; line-height: 1.4;">${r.title}</h4>
          <p style="margin: 0; font-size: 0.9rem; color: #5f6e85; line-height: 1.6;">${r.summary}</p>
        </div>
      </div>
    </a>`).join('\n')}
  </div>
</div>`;

const META = {
  handle: 'unt-de-arahide-beneficii-sportivi',
  id: 'gid://shopify/Article/1024059670903',
  title: 'Unt de arahide: beneficii, proteine și valori la 100 g',
  seoTitle: 'Unt de arahide: beneficii, proteine și valori nutriționale',
  seoDesc: 'Unt de arahide beneficii: 26 g proteine și 7 g fibre la 100 g, valori pe lingură, cum îl folosești la sală și ce arată studiile despre calorii.',
  summary: 'Untul de arahide natural Prime Health are 26 g de proteine și 7 g de fibre la 100 g, deci este sursă de proteine și bogat în fibre. O lingură de aproximativ 16 g are circa 93 kcal și 4,2 g de proteine, așa că îl folosești cântărit.',
  keyword: 'unt de arahide beneficii',
  imageAlt: 'Unt de arahide: borcan deschis cu arahide în coajă, lângă un măr, o ganteră, un shaker și o banană',
};

const html = [SHORT, BODY, SOURCES, DISCLAIMER, AUTHOR, related].join('\n\n');
fs.writeFileSync(path.join(dir, `${META.handle}.html`), html);
fs.writeFileSync(path.join(dir, `${META.handle}.meta.json`), JSON.stringify(META, null, 1));

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const low = html.toLowerCase();
const FORBIDDEN = ['vindec', 'tratează', 'previne boala', 'detox', 'arde grăsim', 'garantat', 'fără gluten', '<h1', '<script', 'target="_blank"', 'somn', 'stres ', 'refacere', 'rezultate', 'face efect', 'energie', 'grăsimi sănătoase', 'slăb', 'bogat în proteine</', 'colesterol'];
// „sursă de” e permis doar ca „sursă de proteine” (condiția Reg. 1924/2006 verificată: 17,9% din valoarea energetică).
const sursa = [...low.matchAll(/sursă de (\S+)/g)].map(m => m[1]).filter(w => !w.startsWith('proteine'));
console.log(`cuvinte ${text.split(' ').length} · title ${META.title.length} · seoTitle ${META.seoTitle.length} · seoDesc ${META.seoDesc.length} · interzise: ${FORBIDDEN.filter(w => low.includes(w)).join(',') || '-'} · „sursă de” altceva: ${sursa.join(',') || '-'}`);
