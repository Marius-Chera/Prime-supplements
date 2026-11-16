// Rescrierea articolului taurina-doza-si-cand-se-ia (16.11.2026), după GHID-REDACTIONAL.md §2b, 2c, 3, 4, 5, 6b.
// Folosire: node build-taurina.mjs → scrie taurina-doza-si-cand-se-ia.html și .meta.json lângă acest fișier.
// Fapte de produs: produsul taurine-80-caps (ACTIVE), descriere + metafield-uri citite prin Admin API pe 16.11.2026.
// Studii: Kurtz 2021 (bibliotecă) + Shao 2008, Laidlaw 1988, Rana 1986, Ripps 2012 verificate azi cu esummary + efetch.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const pubmed = (pmid, text) => `<a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/" rel="noopener">${text}</a>`;
const REG = '<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>';

const P = {
  handle: 'taurine-80-caps',
  title: 'Taurină 1000 mg – 80 de capsule',
  img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_TAURINE_80caps_front.jpg?v=1794828861',
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

const SOURCES = [
  { cite: 'Kurtz JA, VanDusseldorp TA, Doyle JA, Otis JS. Taurine in sports and exercise. J Int Soc Sports Nutr. 2021;18(1):39.', pmid: '34039357', doi: '10.1186/s12970-021-00438-0' },
  { cite: 'Shao A, Hathcock JN. Risk assessment for the amino acids taurine, L-glutamine and L-arginine. Regul Toxicol Pharmacol. 2008;50(3):376-99.', pmid: '18325648', doi: '10.1016/j.yrtph.2008.01.004' },
  { cite: 'Ripps H, Shen W. Review: taurine: a „very essential” amino acid. Mol Vis. 2012;18:2673-86.', pmid: '23170060' },
  { cite: 'Laidlaw SA și colab. Plasma and urine taurine levels in vegans. Am J Clin Nutr. 1988;47(4):660-3.', pmid: '3354491', doi: '10.1093/ajcn/47.4.660' },
  { cite: 'Rana SK, Sanders TA. Taurine concentrations in the diet, plasma, urine and breast milk of vegans compared with omnivores. Br J Nutr. 1986;56(1):17-27.', pmid: '3676193', doi: '10.1079/bjn19860082' },
  { cite: 'Regulamentul (UE) nr. 432/2012 al Comisiei – lista mențiunilor de sănătate permise pentru alimente.', url: 'https://eur-lex.europa.eu/eli/reg/2012/432/oj', label: 'EUR-Lex' },
];

function sources(list) {
  const li = list.map(s => `<li style="margin-bottom: 8px;">${s.cite} <a href="${s.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/` : s.url}" rel="noopener">${s.pmid ? `PubMed ${s.pmid}` : s.label}</a>${s.doi ? ` · <a href="https://doi.org/${s.doi}" rel="noopener">doi:${s.doi}</a>` : ''}</li>`).join('\n  ');
  return `<h2 id="surse">Surse</h2>
<p>Lucrările de mai jos sunt citate în text; fiecare link duce la rezumatul de pe PubMed (Biblioteca Națională de Medicină a SUA) sau la textul oficial al legislației UE.</p>
<ol style="padding-left: 20px; color: #334155;">
  ${li}
</ol>`;
}

const DISCLAIMER = `<p><em>Informațiile din acest articol au caracter general și nu înlocuiesc sfatul medicului sau al unui specialist în nutriție. Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată. Consultați medicul înainte de a începe un supliment, mai ales în caz de sarcină, alăptare, afecțiuni sau tratament medicamentos.</em></p>`;

const AUTHOR = `<div class="author author-box" style="margin-top: 40px; padding: 24px; background: #f8f9fa; border-radius: 8px; display: flex; gap: 20px; align-items: flex-start;" itemprop="author" itemscope itemtype="https://schema.org/Person">
  <img src="https://cdn.shopify.com/s/files/1/0917/5138/3415/files/author-photo-primesupplements1-myshopify-com.jpg?v=1773308575&amp;width=160" alt="Marius Chera, antrenor de culturism" loading="lazy" itemprop="image" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
  <div style="flex: 1;">
    <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1a1a1a;"><a href="/pages/autor-marius-chera" itemprop="url" style="color: #1a1a1a; text-decoration: none;"><span itemprop="name">Marius Chera</span></a></p>
    <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;" itemprop="description">Marius Chera – antrenor de culturism, fondatorul Prime Supplements (2022). Lector la cursurile de instructori din cadrul FRCF, a pregătit sportivi care au obținut carduri PRO și titluri europene și mondiale IFBB. Specializat în online coaching, îmbină experiența din competiții cu știința nutriției sportive.</p>
  </div>
</div>`;

// Articole publicate (isPublished: true), imaginile lor reale (image.url), verificate prin Admin API pe 16.11.2026.
const A = 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/';
const RELATED = [
  { handle: 'taurina-efecte-secundare', title: 'Taurina: efecte secundare și ce spun evaluările de siguranță', img: A + 'blog-aminoacizi-taurine-80-caps-budget-smart-1779865351306.png?v=1779952206', summary: 'Ce efecte nedorite pot apărea la taurină și când întrebi medicul.' },
  { handle: 'bcaa-doza-si-cand-se-iau', title: 'BCAA: doza corectă, pragul de leucină și când se iau', img: A + 'blog-l-glutamina-recovery-bcaa-500g-bioavailability-why-1786550552683.png?v=1792128594', summary: 'Doza de BCAA de pe etichetă și ce înseamnă „pragul de leucină”.' },
  { handle: 'cand-se-ia-glutamina', title: 'Când se ia glutamina: dimineața, seara sau după antrenament', img: A + 'blog-cand-se-ia-glutamina.jpg?v=1794568320', summary: 'Eticheta nu fixează ora: o porție pe zi, în 200 ml de apă.' },
];

function related(list) {
  const cards = list.map(r => `    <a href="/blogs/news/${r.handle}" class="related-post-card" style="text-decoration: none; color: inherit; display: block; flex: 1 1 calc(50% - 12px); min-width: 280px;">
      <div style="background: white; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); overflow: hidden; height: 100%;">
        <img src="${r.img}&width=800" alt="${r.title}" loading="lazy" style="width: 100%; height: 180px; object-fit: cover;">
        <div style="padding: 20px;">
          <h4 style="margin: 0 0 10px 0; font-size: 1.1rem; font-weight: 600; color: #1e293b; line-height: 1.4;">${r.title}</h4>
          <p style="margin: 0; font-size: 0.9rem; color: #5f6e85; line-height: 1.6;">${r.summary}</p>
        </div>
      </div>
    </a>`).join('\n');
  return `<div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid #e2e8f0;">
  <h3 style="margin: 0 0 24px 0; font-size: 1.5rem; font-weight: 600; color: #a54f51;">Articole Similare</h3>
  <div class="related-posts-grid" style="display: flex; flex-wrap: wrap; gap: 24px;">
${cards}
  </div>
</div>`;
}

function shortBox(points) {
  return `<div style="background: #ea8a8a15; border-left: 4px solid #ea8a8a; padding: 16px 20px; margin-bottom: 24px; border-radius: 4px;">
  <p style="margin: 0 0 12px 0; font-weight: 600; color: #a54f51;">Pe scurt</p>
  <ul style="margin: 0; padding-left: 20px; color: #334155;">
    ${points.map(p => `<li style="margin-bottom: 8px;">${p}</li>`).join('\n    ')}
  </ul>
</div>`;
}

const META = {
  handle: 'taurina-doza-si-cand-se-ia',
  id: 'gid://shopify/Article/1024235962743',
  title: 'Taurina: ce este, doza zilnică, când se ia și contraindicații',
  seoTitle: 'Taurina: ce este, doza zilnică, când se ia, contraindicații',
  seoDesc: 'Taurina: ce este, doza de pe etichetă (500–2000 mg pe zi), când se ia, ce au găsit studiile și cine discută cu medicul înainte. Ghid cu surse PubMed.',
  summary: 'Taurina este un acid aminosulfonic pe care corpul îl produce singur și pe care îl primește din carne, pește și fructe de mare. Eticheta Prime indică 500–2000 mg pe zi (1–2 capsule de 1000 mg), cu sau fără mâncare; sarcina, alăptarea, afecțiunile și medicamentele zilnice se discută cu medicul.',
  keyword: 'taurina',
  imageAlt: 'Flacon de taurină Prime 1000 mg, 80 de capsule, lângă un pahar cu apă și un organizator de pastile',
};

const SHORT = [
  'Taurina este un acid aminosulfonic: corpul o produce singur, iar din mâncare vine aproape doar din carne, pește și fructe de mare.',
  'Doza de pe eticheta Prime: 500–2000 mg pe zi, adică 1–2 capsule de 1000 mg, cu sau fără mâncare.',
  'În UE nu există nicio mențiune de sănătate autorizată pentru taurină; o recenzie din 2021 a 19 studii nu a putut trage concluzii definitive (<a href="https://pubmed.ncbi.nlm.nih.gov/34039357/" rel="noopener">Kurtz și colab., 2021</a>).',
  'Sarcina, alăptarea, o afecțiune cronică sau medicamentele luate zilnic înseamnă o discuție cu medicul înainte de prima capsulă.',
];

const BODY = `<p><strong>Taurina este un acid aminosulfonic pe care organismul îl produce singur și pe care îl primește din carne, pește și fructe de mare.</strong> Ca supliment, se ia de obicei în capsule: eticheta Taurinei Prime indică 500–2000 mg pe zi, adică 1–2 capsule de 1000 mg, cu sau fără mâncare, la ora care îți convine. Pentru taurină nu există mențiuni de sănătate autorizate în UE.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#ce-este">Ce este taurina</a></li>
  <li><a href="#alimente">Taurina din alimente și producția proprie</a></li>
  <li><a href="#doza">Doza zilnică de taurină</a></li>
  <li><a href="#cand-se-ia">Când se ia taurina</a></li>
  <li><a href="#contraindicatii">Contraindicații și precauții</a></li>
  <li><a href="#studii">Ce au găsit studiile despre taurină</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="ce-este">Ce este taurina</h2>
<p>Taurina este o substanță cu sulf care se află în mod natural în corp, mai ales în creier, retină și mușchi. Chimic este un acid aminosulfonic, nu un aminoacid obișnuit: nu intră în lanțurile de proteine, ci stă liberă în țesuturi.</p>
<p>O recenzie publicată în 2012 o descrie ca pe una dintre substanțele de acest tip cele mai abundente din creier, retină și mușchi și notează că taurina participă la formarea sărurilor biliare și la reglarea volumului celulelor (${pubmed('23170060', 'Ripps și Shen, 2012')}).</p>
<p>Numele vine din latinescul <em>taurus</em> (taur): substanța a fost izolată prima dată, în secolul al XIX-lea, din bila de bou. Taurina din suplimente se obține astăzi prin sinteză.</p>

<h2 id="alimente">Taurina din alimente și producția proprie</h2>
<p>Corpul produce taurină din aminoacizii cu sulf, iar restul vine din mâncare de origine animală. Plantele nu aduc practic deloc taurină, de aceea dieta vegană este aproape lipsită de ea.</p>
<p>Un studiu britanic a măsurat taurina din dieta veganilor și a unor omnivori de aceeași vârstă și sex: în dieta vegană taurina lipsea, iar la omnivori cantitatea varia mult de la o persoană la alta (${pubmed('3676193', 'Rana și Sanders, 1986')}). Concentrația din sânge era doar puțin mai mică la vegani, în schimb taurina din urină era sub jumătate.</p>
<p>Un studiu american pe 12 bărbați vegani și 14 bărbați care mâncau carne a găsit valori medii în sânge de 45 față de 58 µmol/L și o eliminare prin urină de 266 față de 903 µmol pe zi (${pubmed('3354491', 'Laidlaw și colab., 1988')}). Limita lui: un grup foarte mic, doar bărbați.</p>

${productBox('Fiecare capsulă are 1000 mg de taurină; flaconul are 80 de capsule. Eticheta indică 500–2000 mg pe zi, cu sau fără alimente.', 'Vezi produsul')}

<h2 id="doza">Doza zilnică de taurină</h2>
<p>Doza zilnică de taurină se ia de pe eticheta produsului: la Taurina Prime, între 500 mg și 2000 mg pe zi. O capsulă are 1000 mg, deci în practică iei 1 capsulă sau cel mult 2 pe zi.</p>
${table(['Ce compari', 'Cantitatea de taurină', 'De unde vine cifra'], [
  ['O capsulă Taurină Prime', '1000 mg', 'eticheta produsului'],
  ['Doza zilnică de pe etichetă', '500–2000 mg (1–2 capsule)', 'eticheta produsului'],
  ['Cât ține un flacon de 80 de capsule', '80 de zile la 1 capsulă, 40 de zile la 2 capsule', 'calcul din eticheta produsului'],
  ['Nivelul observat ca sigur la adulți sănătoși', 'până la 3 g pe zi, ca supliment', `evaluare de risc, ${pubmed('18325648', 'Shao și Hathcock, 2008')}`],
  ['Dozele folosite în studiile pe sportivi', 'de sub 1 g până la 6 g pe zi', `recenzie, ${pubmed('34039357', 'Kurtz și colab., 2021')}`],
])}
<p>Evaluarea de risc din 2008 a strâns studiile pe oameni cu taurină administrată oral și nu a găsit un tipar de efecte adverse; datele erau solide pentru suplimente de până la 3 g pe zi (${pubmed('18325648', 'Shao și Hathcock, 2008')}). Au fost testate și cantități mai mari, dar autorii spun că datele nu ajung pentru o concluzie sigură pe termen lung. Doza de pe eticheta Prime, de cel mult 2000 mg, rămâne sub acest prag.</p>
<p>La sportivii cu care lucrăm recomandăm să înceapă cu o capsulă pe zi și să nu treacă de două. Mai mult nu înseamnă mai bine: limita zilnică de pe etichetă nu se depășește.</p>

<h2 id="cand-se-ia">Când se ia taurina</h2>
<p>Taurina se ia cu sau fără mâncare, la orice oră din zi: eticheta Prime nu fixează un moment anume. Ce contează este să iei doza zilnică, fără s-o depășești.</p>
<ul>
  <li><strong>Cu masa:</strong> dacă ai stomacul sensibil, ia capsula la micul dejun sau la prânz, cu un pahar cu apă.</li>
  <li><strong>În zilele de antrenament:</strong> mulți o iau la masa de dinainte de sală, ca să n-o uite; nu e o regulă de pe etichetă.</li>
  <li><strong>În zilele fără antrenament:</strong> aceeași doză, la ora obișnuită.</li>
</ul>
<p>În studiile adunate de recenzia din 2021, taurina a fost dată fie cu 10–15 minute până la 2 ore înainte de efort, fie zilnic, timp de 7 zile până la 8 săptămâni (${pubmed('34039357', 'Kurtz și colab., 2021')}). Autorii notează că momentul și tipul de efort diferă mult de la un studiu la altul, așa că din aceste date nu iese o oră „corectă”.</p>

<h2 id="contraindicatii">Contraindicații și precauții</h2>
<p>Taurina în capsule este un supliment pentru adulți, iar câteva situații cer o discuție cu medicul înainte de prima capsulă. Lista de mai jos urmează avertismentele de pe eticheta Prime.</p>
<ul>
  <li><strong>Sarcina și alăptarea:</strong> discută cu medicul înainte de orice supliment, inclusiv taurină.</li>
  <li><strong>Afecțiuni cronice:</strong> dacă ai o boală diagnosticată sau ești sub control medical, întreabă medicul dacă taurina ți se potrivește.</li>
  <li><strong>Medicamente luate zilnic:</strong> spune-i medicului sau farmacistului ce suplimente iei, ca să verifice combinația.</li>
  <li><strong>Copiii:</strong> produsul nu este pentru copii; flaconul se ține la îndemâna adulților, nu a copiilor mici.</li>
  <li><strong>Alergii sau intoleranțe:</strong> verifică lista de ingrediente de pe flacon înainte de prima capsulă.</li>
</ul>
<p>O precauție practică este cumulul de surse. Taurina apare și în multe băuturi energizante și în unele produse pre-workout, așa că aduni miligramele de pe toate etichetele și nu treci de doza zilnică a produsului pe care îl iei. Pentru efectele nedorite raportate, avem un ghid separat: <a href="/blogs/news/taurina-efecte-secundare">taurina: efecte secundare și ce spun evaluările de siguranță</a>.</p>

<h3>Ce conține o capsulă</h3>
<p>Pe lângă taurină, capsula conține doar ingrediente tehnologice: celuloză microcristalină ca agent de încărcare și ulei hidrogenat de bumbac, dioxid de siliciu și stearat de magneziu ca antiaglomeranți. Nu are arome, zahăr sau cafeină în lista de ingrediente.</p>

<h2 id="studii">Ce au găsit studiile despre taurină</h2>
<p>În Uniunea Europeană nu există nicio mențiune de sănătate autorizată pentru taurină: ea nu apare în lista din ${REG}. De aceea nu-i atribuim niciun efect și rezumăm doar ce au cercetat autorii.</p>
<p>Recenzia din 2021 din <em>Journal of the International Society of Sports Nutrition</em> a inclus 19 studii în care taurina a fost singurul ingredient testat, la adulți sănătoși sub 50 de ani, cu doze de sub 1 g până la 6 g (${pubmed('34039357', 'Kurtz și colab., 2021')}). Concluzia autorilor: rezultatele sunt limitate și variate și nu permit concluzii definitive, iar studiile viitoare trebuie să clarifice întrebările rămase deschise.</p>
<p>Pentru alți aminoacizi folosiți de sportivi, cu doze și reguli diferite, vezi ghidurile despre <a href="/blogs/news/bcaa-doza-si-cand-se-iau">doza de BCAA</a> și despre <a href="/blogs/news/cand-se-ia-glutamina">momentul în care se ia glutamina</a>.</p>

${productBox('1000 mg de taurină în fiecare capsulă, 80 de capsule. Nota 4 din 5, din 2 recenzii. Livrare gratuită la comenzile de peste 300 de lei.', 'Comandă Taurina Prime')}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Ce este taurina?</h3>
<p>Taurina este un acid aminosulfonic pe care organismul îl produce singur și pe care îl primește din carne, pește și fructe de mare. Nu intră în structura proteinelor; se găsește liberă în țesuturi, mai ales în creier, retină și mușchi.</p>
<h3>Câtă taurină pe zi?</h3>
<p>Eticheta Taurinei Prime indică între 500 mg și 2000 mg pe zi. O capsulă are 1000 mg, deci iei 1 sau cel mult 2 capsule pe zi și nu depășești doza recomandată.</p>
<h3>Se poate lua taurina pe stomacul gol?</h3>
<p>Da, eticheta spune că taurina se ia cu sau fără alimente. Dacă ai stomacul sensibil, ia capsula la o masă, cu un pahar cu apă.</p>
<h3>Taurina are contraindicații?</h3>
<p>Discută cu medicul înainte dacă ești însărcinată sau alăptezi, ai o afecțiune cronică sau iei medicamente zilnic. Produsul este pentru adulți; nu-l da copiilor și nu depăși doza zilnică de pe etichetă.</p>
<h3>Se poate lua taurina în fiecare zi?</h3>
<p>Da, doza de pe etichetă este una zilnică, de 1–2 capsule. Un flacon de 80 de capsule ține 80 de zile la o capsulă pe zi sau 40 de zile la două.</p>
<h3>Taurina se poate lua împreună cu un pre-workout?</h3>
<p>Verifică întâi eticheta pre-workout-ului: dacă are și el taurină, aduni cantitățile. Totalul zilnic nu trece de doza maximă de pe eticheta capsulelor, adică 2000 mg.</p>

<p>Mai multe produse găsești în colecția <a href="/collections/aminoacizi">Aminoacizi</a>.</p>`;

const html = [shortBox(SHORT), BODY, sources(SOURCES), DISCLAIMER, AUTHOR, related(RELATED)].join('\n\n');
fs.writeFileSync(path.join(dir, `${META.handle}.html`), html);
fs.writeFileSync(path.join(dir, `${META.handle}.meta.json`), JSON.stringify(META, null, 1));

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
const WATCH = ['tensiun', 'hepat', 'ficat', 'anxiet', 'somn', 'stres', 'energ', 'refacere', 'recuper', 'performan', 'rezultat', 'beneficii', 'sursă de', 'face efect', 'taur max', 'vindec', 'tratea', 'previne', 'detox', 'garantat'];
console.log(`title ${META.title.length}, seoTitle ${META.seoTitle.length}, seoDesc ${META.seoDesc.length}`);
console.log('de verificat:', WATCH.map(w => [w, text.split(w).length - 1]).filter(([, n]) => n).map(([w, n]) => `${w}×${n}`).join(', ') || '-');
