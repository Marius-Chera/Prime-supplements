// Rescrierea articolului taurina-rezultate-30-de-zile (16.11.2026), după GHID-REDACTIONAL.md §2b, 2c, 3, 4, 5, 6b și BRIEF-LOT2.
// Folosire: node build-taurina-30-zile.mjs → scrie taurina-rezultate-30-de-zile.html și .meta.json lângă acest fișier.
// Handle-ul rămâne (taurina-rezultate-30-de-zile); titlul, title_tag și meta nu mai promit „rezultate”.
// Fapte de produs: taurine-80-caps (ACTIVE), descriere + metafield-uri (detalii_produs, ingrediente, reviews.*) citite prin Admin API pe 16.11.2026.
// Studii: Kurtz 2021, Shao 2008 (bibliotecă) + Galloway 2008, Spohr 2005, Ehlers 2019 verificate azi cu esummary + efetch.
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
  { cite: 'Galloway SD, Talanian JL, Shoveller AK, Heigenhauser GJ, Spriet LL. Seven days of oral taurine supplementation does not increase muscle taurine content or alter substrate metabolism during prolonged exercise in humans. J Appl Physiol (1985). 2008;105(2):643-51.', pmid: '18583380', doi: '10.1152/japplphysiol.90525.2008' },
  { cite: 'Spohr C, Brøns C, Winther K, Dyerberg J, Vaag A. No effect of taurine on platelet aggregation in men with a predisposition to type 2 diabetes mellitus. Platelets. 2005;16(5):301-5.', pmid: '16011981', doi: '10.1080/09537100400020575' },
  { cite: 'Shao A, Hathcock JN. Risk assessment for the amino acids taurine, L-glutamine and L-arginine. Regul Toxicol Pharmacol. 2008;50(3):376-99.', pmid: '18325648', doi: '10.1016/j.yrtph.2008.01.004' },
  { cite: 'Ehlers A, Marakis G, Lampen A, Hirsch-Ernst KI. Risk assessment of energy drinks with focus on cardiovascular parameters and energy drink consumption in Europe. Food Chem Toxicol. 2019;130:109-121.', pmid: '31112702', doi: '10.1016/j.fct.2019.05.028' },
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
  { handle: 'taurina-doza-si-cand-se-ia', title: 'Taurina: ce este, doza zilnică, când se ia și contraindicații', img: A + 'blog-l-glutamina-contraindicatii-taurine-80-caps-most-common-1781430183614.png?v=1792129644', summary: 'Ce este taurina, doza de pe etichetă și la ce oră o iei.' },
  { handle: 'taurina-efecte-secundare', title: 'Taurina: efecte secundare și ce spun evaluările de siguranță', img: A + 'blog-aminoacizi-taurine-80-caps-budget-smart-1779865351306.png?v=1779952206', summary: 'Ce efecte nedorite pot apărea la taurină și când întrebi medicul.' },
  { handle: 'bcaa-doza-si-cand-se-iau', title: 'BCAA: doza corectă, pragul de leucină și când se iau', img: A + 'blog-l-glutamina-recovery-bcaa-500g-bioavailability-why-1786550552683.png?v=1792128594', summary: 'Doza de BCAA de pe etichetă și ce înseamnă „pragul de leucină”.' },
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
  handle: 'taurina-rezultate-30-de-zile',
  id: 'gid://shopify/Article/1024013173111',
  title: 'Taurina 30 de zile: ce poți aștepta realist și cum o iei',
  seoTitle: 'Taurina 30 de zile: ce poți aștepta realist și cum o iei',
  seoDesc: 'Taurina 30 de zile: câte capsule iei după etichetă, cât ține flaconul, ce au măsurat studiile de câteva săptămâni și ce urmărești pe parcurs.',
  summary: 'O lună de taurină înseamnă, după eticheta Prime, 30–60 de capsule de 1000 mg, adică 1–2 pe zi. Taurina nu are mențiuni de sănătate autorizate în UE, iar studiile de câteva săptămâni au măsurat lucruri diferite, cu concluzii limitate, așa că nu există etape fixe.',
  keyword: 'taurina 30 de zile',
  imageAlt: 'Flacon alb de taurină în capsule pe o masă albă, cu capsule în față și într-un vas de sticlă, iar în fundal o sticlă de apă și aparate de sală',
};

const SHORT = [
  'O lună de taurină după eticheta Prime înseamnă 1–2 capsule de 1000 mg pe zi, adică 30–60 de capsule; flaconul de 80 ține 40–80 de zile.',
  'În UE nu există nicio mențiune de sănătate autorizată pentru taurină, deci nu există un calendar de efecte pe săptămâni.',
  'Studiile de câteva săptămâni au măsurat lucruri diferite și au concluzii limitate și variate (<a href="https://pubmed.ncbi.nlm.nih.gov/34039357/" rel="noopener">Kurtz și colab., 2021</a>).',
  'În cele 30 de zile urmărești cum tolerezi capsulele și câtă taurină mai iei din băuturi energizante sau pre-workout.',
];

const BODY = `<p><strong>Taurina 30 de zile înseamnă, după eticheta Taurinei Prime, 1–2 capsule de 1000 mg pe zi, cu sau fără mâncare, adică 30 până la 60 de capsule într-o lună.</strong> Taurina este un acid aminosulfonic fără mențiuni de sănătate autorizate în UE, așa că realist te aștepți la o rutină simplă, nu la efecte promise pe săptămâni.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#o-luna">Ce înseamnă taurina 30 de zile, în capsule</a></li>
  <li><a href="#studii">Ce au măsurat studiile de câteva săptămâni</a></li>
  <li><a href="#etape">De ce nu există „etape” fixe</a></li>
  <li><a href="#cum-folosesti">Cum folosești Taurina Prime 30 de zile</a></li>
  <li><a href="#ce-urmaresti">Ce urmărești în cele 30 de zile</a></li>
  <li><a href="#medic">Când discuți cu medicul</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="o-luna">Ce înseamnă taurina 30 de zile, în capsule</h2>
<p>O lună de taurină este, concret, un număr de capsule: eticheta Prime indică între 500 mg și 2000 mg pe zi, iar o capsulă are 1000 mg. În practică iei 1 capsulă sau cel mult 2 pe zi.</p>
${table(['Cât iei pe zi', 'Capsule în 30 de zile', 'Cât ține flaconul de 80 de capsule'], [
  ['1 capsulă (1000 mg)', '30 de capsule', '80 de zile, aproximativ 2 luni și jumătate'],
  ['2 capsule (2000 mg, maximul de pe etichetă)', '60 de capsule', '40 de zile'],
])}
<p>Calculul vine din eticheta produsului. Pentru o lună întreagă la doza maximă îți ajunge un singur flacon, cu 20 de capsule rămase.</p>
<p>Ce este taurina, din ce alimente vine și la ce oră o iei am explicat separat, în ghidul despre <a href="/blogs/news/taurina-doza-si-cand-se-ia">doza de taurină și când se ia</a>. Aici ne uităm doar la ce înseamnă o lună de folosire.</p>

<h2 id="studii">Ce au măsurat studiile de câteva săptămâni</h2>
<p>Studiile cu taurină pe durate de una până la opt săptămâni au măsurat lucruri foarte diferite, iar concluziile lor sunt limitate. Nicio cercetare nu descrie ce simte un om sănătos după exact 30 de zile (${pubmed('34039357', 'Kurtz și colab., 2021')}).</p>
<p>Recenzia din 2021 a adunat 19 studii în care taurina a fost singurul ingredient testat, la adulți sănătoși sub 50 de ani, cu doze de sub 1 g până la 6 g pe zi și cu durate de la o singură doză până la 8 săptămâni (${pubmed('34039357', 'Kurtz și colab., 2021')}). Autorii scriu că datele sunt limitate și variate și nu permit concluzii definitive.</p>
<p>Un studiu britanic pe 8 bărbați a dat 5 g de taurină pe zi timp de 7 zile și a măsurat taurina direct în mușchi, prin biopsie (${pubmed('18583380', 'Galloway și colab., 2008')}). Taurina din sânge a crescut de circa 13 ori la câteva ore după o doză, dar conținutul de taurină din mușchi a rămas același ca după placebo: 42 față de 44 mmol/kg. Limita: un grup foarte mic și doar o săptămână.</p>
<p>Un studiu danez, dublu-orb, a dat 1,5 g de taurină pe zi timp de 8 săptămâni la 20 de bărbați supraponderali (${pubmed('16011981', 'Spohr și colab., 2005')}). Taurina din sânge a ajuns la 131 µmol/L, față de 39 µmol/L după placebo, dar indicatorul urmărit de autori nu s-a schimbat. Limita: un grup mic, care nu era format din sportivi.</p>
${table(['Studiu', 'Durata și doza', 'Ce s-a măsurat', 'Ce s-a găsit'], [
  [pubmed('34039357', 'Kurtz 2021'), 'până la 8 săptămâni, sub 1 g – 6 g/zi', '19 studii pe sportivi', 'date limitate și variate'],
  [pubmed('18583380', 'Galloway 2008'), '7 zile, 5 g/zi', 'taurina din sânge și din mușchi', 'sângele crește, mușchiul nu se schimbă'],
  [pubmed('16011981', 'Spohr 2005'), '8 săptămâni, 1,5 g/zi', 'taurina din sânge, un indicator al sângelui', 'taurina crește, indicatorul nu'],
])}

${productBox('Fiecare capsulă are 1000 mg de taurină; flaconul are 80 de capsule, adică 40–80 de zile după doza de pe etichetă.', 'Vezi produsul')}

<h2 id="etape">De ce nu există „etape” fixe</h2>
<p>Un calendar de tipul „săptămânile 1–2 adaptare, săptămânile 3–4 progres” nu are acoperire legală și nici în cercetare. Taurina nu apare în lista mențiunilor de sănătate permise din ${REG}, deci nu i se poate atribui niciun efect.</p>
<p>Datele de mai sus arată și de ce un astfel de calendar nu se sprijină pe măsurători: o săptămână cu 5 g pe zi nu a schimbat taurina din mușchi (${pubmed('18583380', 'Galloway și colab., 2008')}), iar recenzia pe sportivi nu a găsit un tipar stabil între durate și doze (${pubmed('34039357', 'Kurtz și colab., 2021')}).</p>
<p>Ce poți aștepta realist după 30 de zile este simplu: ai o rutină de 1–2 capsule pe zi, știi cum le tolerezi și știi câtă taurină iei în total. Antrenamentul, mâncarea și odihna rămân lucrurile care contează.</p>

<h2 id="cum-folosesti">Cum folosești Taurina Prime 30 de zile</h2>
<p>Taurina Prime se ia între 500 mg și 2000 mg pe zi, adică 1–2 capsule, cu sau fără alimente, conform etichetei. Eticheta nu fixează o oră și nu cere o anumită durată.</p>
<ul>
  <li><strong>Începe cu o capsulă pe zi</strong>, la o masă, cu un pahar cu apă. La sportivii cu care lucrăm recomandăm să rămână așa primele zile.</li>
  <li><strong>Nu treci de 2 capsule pe zi:</strong> 2000 mg este maximul de pe etichetă.</li>
  <li><strong>Fără cafeină:</strong> lista de ingrediente are taurina și doar agenți tehnologici.</li>
</ul>
<p>Dacă iei și alți aminoacizi, fiecare are doza lui de pe etichetă; pentru BCAA vezi <a href="/blogs/news/bcaa-doza-si-cand-se-iau">doza corectă de BCAA</a>.</p>

<h2 id="ce-urmaresti">Ce urmărești în cele 30 de zile</h2>
<p>În luna de taurină urmărești două lucruri concrete: cum îți priesc capsulele și câtă taurină iei în total, din toate sursele.</p>
<h3>Toleranța digestivă</h3>
<p>Dacă simți disconfort la stomac când o iei pe stomacul gol, mut-o la masă. Dacă disconfortul continuă și cu mâncare, oprește capsulele și întreabă medicul. Lista completă de reacții nedorite raportate și semnele la care te oprești sunt în ghidul despre <a href="/blogs/news/taurina-efecte-secundare">efectele secundare ale taurinei</a>.</p>
<h3>Taurina din băuturi energizante și pre-workout</h3>
<p>Taurina apare și în multe băuturi energizante și în unele produse pre-workout, deci adună miligramele de pe toate etichetele din ziua respectivă. Totalul nu trece de 2000 mg, maximul de pe eticheta capsulelor.</p>
<p>O evaluare de risc europeană despre băuturile energizante a găsit că un consum moderat, cu până la 200 mg de cafeină, nu a dus la modificări cardiovasculare relevante la adulți tineri sănătoși, dar aproximativ 1 litru a fost asociat la unii participanți cu efecte adverse, precum palpitațiile (${pubmed('31112702', 'Ehlers și colab., 2019')}). Analiza privea băutura întreagă, mai ales cafeina, nu taurina separat. Capsulele Prime nu au cafeină în lista de ingrediente.</p>

<h2 id="medic">Când discuți cu medicul</h2>
<p>Discută cu medicul înainte de cele 30 de zile dacă ești însărcinată sau alăptezi, ai o afecțiune diagnosticată sau iei medicamente în fiecare zi. Produsul este pentru adulți și se ține departe de copiii mici, conform etichetei.</p>
<p>Pentru adulții sănătoși, o evaluare de risc a găsit date solide de siguranță pentru suplimente de taurină de până la 3 g pe zi (${pubmed('18325648', 'Shao și Hathcock, 2008')}). Doza maximă de pe eticheta Prime, 2000 mg, rămâne sub acest nivel. Dacă vrei să continui mai multe luni la rând, spune-i medicului ce suplimente iei.</p>

${productBox('1000 mg de taurină în fiecare capsulă, 80 de capsule. Nota 4 din 5, din 2 recenzii. Livrare gratuită la comenzile de peste 300 de lei.', 'Comandă Taurina Prime')}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Ce se întâmplă dacă iei taurină 30 de zile?</h3>
<p>Realist, iei 30–60 de capsule de 1000 mg, după eticheta Prime. Pentru taurină nu există mențiuni de sănătate autorizate în UE, deci nu se poate promite un efect anume după o lună.</p>
<h3>După cât timp se simte taurina?</h3>
<p>Nu există un termen fix. Într-un studiu, taurina din sânge a crescut în câteva ore după o doză, dar după 7 zile cea din mușchi nu se schimbase (${pubmed('18583380', 'Galloway și colab., 2008')}).</p>
<h3>Cât ține un flacon de taurină?</h3>
<p>Flaconul Prime are 80 de capsule de 1000 mg. Ține 80 de zile la o capsulă pe zi sau 40 de zile la două capsule pe zi.</p>
<h3>Taurina se ia în cure?</h3>
<p>Eticheta Prime indică o doză zilnică de 1–2 capsule și nu prevede o durată fixă sau pauze. Pentru folosirea mai multe luni la rând, discută cu medicul.</p>
<h3>Pot lua taurină și băuturi energizante în aceeași zi?</h3>
<p>Adună taurina din băutură cu cea din capsule și nu treci de 2000 mg pe zi. Ține cont și de cafeina din băutură, care nu există în capsulele Prime.</p>

<p>Mai multe produse găsești în colecția <a href="/collections/aminoacizi">Aminoacizi</a>.</p>`;

const html = [shortBox(SHORT), BODY, sources(SOURCES), DISCLAIMER, AUTHOR, related(RELATED)].join('\n\n');
fs.writeFileSync(path.join(dir, `${META.handle}.html`), html);
fs.writeFileSync(path.join(dir, `${META.handle}.meta.json`), JSON.stringify(META, null, 1));

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const low = text.toLowerCase();
const FORBIDDEN = ['vindec', 'tratea', 'previne', 'detox', 'arde grăsim', 'garantat', 'fără gluten', 'somn', 'stres', 'refacere', 'recuper', 'rezultat', 'face efect', 'energie', 'performan', 'tensiun', 'sursă de', 'beneficii', 'sinergi', 'antioxid', 'concentrare', 'crampe'];
const metaText = [META.title, META.seoTitle, META.seoDesc, META.summary, META.imageAlt].join(' ').toLowerCase();
console.log(`cuvinte ${text.split(' ').length} · title ${META.title.length} · seoTitle ${META.seoTitle.length} · seoDesc ${META.seoDesc.length}`);
console.log('în corp:', FORBIDDEN.map(w => [w, low.split(w).length - 1]).filter(([, n]) => n).map(([w, n]) => `${w}×${n}`).join(', ') || '-');
console.log('în meta:', FORBIDDEN.filter(w => metaText.includes(w)).join(', ') || '-');
console.log('tehnic:', ['<h1', '<script', 'target="_blank"', 'lei '].filter(w => html.includes(w)).join(', ') || '-');
