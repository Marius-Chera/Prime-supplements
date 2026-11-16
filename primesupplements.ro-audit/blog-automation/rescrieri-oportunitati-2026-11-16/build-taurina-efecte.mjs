// Rescrierea articolului taurina-efecte-secundare (16.11.2026), după GHID-REDACTIONAL.md §2b, 2c, 3, 4, 5, 6b și BRIEF-LOT2.
// Folosire: node build-taurina-efecte.mjs → scrie taurina-efecte-secundare.html și .meta.json lângă acest fișier.
// Diferențiere față de taurina-doza-si-cand-se-ia: aici doar efectele secundare (evaluări de siguranță, stomac, interacțiuni,
// cafeina din băuturile energizante vs taurina singură); „ce este”, doza și contraindicațiile generale stau în celălalt articol.
// Fapte de produs: taurine-80-caps (ACTIVE), descriere + metafield-uri custom.detalii_produs / custom.ingrediente + reviews.*, citite prin Admin API pe 16.11.2026.
// Studii: Shao 2008 și Kurtz 2021 (bibliotecă) + Jagim 2023 (ISSN, PMID 36862943) și Dobrek 2025 (PMID 40806020), verificate azi cu esummary + efetch.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const pubmed = (pmid, text) => `<a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/" rel="noopener">${text}</a>`;
const REG = '<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>';
const SHAO = pubmed('18325648', 'Shao și Hathcock, 2008');
const KURTZ = pubmed('34039357', 'Kurtz și colab., 2021');
const ISSN = pubmed('36862943', 'Jagim și colab., 2023');
const DOBREK = pubmed('40806020', 'Dobrek, 2025');

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
  { cite: 'Shao A, Hathcock JN. Risk assessment for the amino acids taurine, L-glutamine and L-arginine. Regul Toxicol Pharmacol. 2008;50(3):376-99.', pmid: '18325648', doi: '10.1016/j.yrtph.2008.01.004' },
  { cite: 'Kurtz JA, VanDusseldorp TA, Doyle JA, Otis JS. Taurine in sports and exercise. J Int Soc Sports Nutr. 2021;18(1):39.', pmid: '34039357', doi: '10.1186/s12970-021-00438-0' },
  { cite: 'Jagim AR și colab. International society of sports nutrition position stand: energy drinks and energy shots. J Int Soc Sports Nutr. 2023;20(1):2171314.', pmid: '36862943', doi: '10.1080/15502783.2023.2171314' },
  { cite: 'Dobrek L. The Review on Adverse Effects of Energy Drinks and Their Potential Drug Interactions. Nutrients. 2025;17(15):2435.', pmid: '40806020', doi: '10.3390/nu17152435' },
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
  { handle: 'taurina-doza-si-cand-se-ia', title: 'Taurina: ce este, doza zilnică, când se ia și contraindicații', img: A + 'blog-l-glutamina-contraindicatii-taurine-80-caps-most-common-1781430183614.png?v=1792129644', summary: 'Ce este taurina, doza de pe etichetă și momentul din zi în care o iei.' },
  { handle: 'ce-este-un-pre-workout-fara-cofeina', title: 'Ce este un pre-workout fără cofeină: ghid Nitrox NO-STIM', img: A + 'HILA_13_15_03_17_1447_cacea2eb-578a-4ba4-84b3-dfcef6abccc8.jpg?v=1791864534', summary: 'Ce conține un pre-workout fără cafeină și cum îl citești pe etichetă.' },
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
  handle: 'taurina-efecte-secundare',
  id: 'gid://shopify/Article/1024041091447',
  title: 'Taurina: efecte secundare și ce spun evaluările de siguranță',
  seoTitle: 'Taurina: efecte secundare și evaluările de siguranță',
  seoDesc: 'Taurina: efecte secundare raportate, nivelul de 3 g pe zi observat ca sigur, stomacul, interacțiunile de discutat cu medicul și cafeina din băuturi.',
  summary: 'O evaluare de siguranță din 2008 nu a găsit un tipar de efecte adverse la taurina luată pe gură și a considerat sigure suplimentele de până la 3 g pe zi la adulții sănătoși. Doza de pe eticheta Prime, de cel mult 2000 mg pe zi, rămâne sub acest nivel; medicamentele, sarcina și afecțiunile se discută cu medicul.',
  keyword: 'taurina: efecte secundare',
  imageAlt: 'Flacon alb de capsule pe o masă albă, lângă un flacon răsturnat din care s-au împrăștiat capsule albe, pe fundal albastru',
};

const SHORT = [
  `Taurina: efecte secundare rar raportate. O evaluare de risc din 2008 nu a găsit un tipar de efecte adverse la taurina luată pe gură; datele erau solide pentru suplimente de până la 3 g pe zi la adulții sănătoși (${SHAO}).`,
  'Doza de pe eticheta Taurinei Prime este de 500–2000 mg pe zi (1–2 capsule de 1000 mg), deci sub acest nivel.',
  'Dacă simți disconfort la stomac, ia capsula la masă, cu un pahar cu apă, și rămâi la o capsulă pe zi.',
  `Băuturile energizante conțin și cafeină și zahăr, iar efectele lor nu se pot pune doar pe seama taurinei (${ISSN}).`,
];

const BODY = `<p><strong>Efectele secundare ale taurinei sunt rar raportate la adulții sănătoși care rămân la doza de pe etichetă.</strong> O evaluare de risc din 2008 nu a găsit un tipar de efecte adverse și a considerat sigure suplimentele de până la 3 g pe zi (${SHAO}). Taurina Prime se ia în doză de 500–2000 mg pe zi, iar medicamentele, sarcina și afecțiunile se discută cu medicul.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#efecte-raportate">Taurina: efecte secundare raportate în studii</a></li>
  <li><a href="#evaluari">Ce spun evaluările de siguranță</a></li>
  <li><a href="#stomac">Disconfortul la stomac și ce faci</a></li>
  <li><a href="#interactiuni">Interacțiuni de discutat cu medicul</a></li>
  <li><a href="#cafeina">Cafeina din băuturile energizante vs taurina singură</a></li>
  <li><a href="#cum-folosesti">Cum folosești Taurina Prime fără neplăceri</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="efecte-raportate">Taurina: efecte secundare raportate în studii</h2>
<p>În studiile pe oameni cu taurină luată pe gură nu a apărut un tipar constant de efecte adverse. Așa conchide evaluarea de risc din 2008, care a strâns studiile clinice disponibile (${SHAO}).</p>
<p>Tocmai pentru că nu au găsit un efect advers care să apară sistematic, autorii nu au putut stabili un prag clasic de la care apar probleme. Au folosit în schimb „nivelul observat ca sigur”: cea mai mare cantitate pentru care datele arată clar lipsa efectelor adverse (${SHAO}).</p>
<p>Recenzia din 2021 despre taurină la sportivi a inclus 19 studii, la adulți sănătoși sub 50 de ani, cu doze de sub 1 g până la 6 g și durate de până la 8 săptămâni (${KURTZ}). Limita ei: a urmărit efectele asupra efortului, nu siguranța, iar rezumatul nu raportează efecte nedorite, așa că nu o folosim ca dovadă de siguranță.</p>

<h2 id="evaluari">Ce spun evaluările de siguranță</h2>
<p>Pentru taurina din suplimente, nivelul observat ca sigur la adulții sănătoși este de 3 g pe zi. Peste acest nivel s-au testat și cantități mai mari, fără efecte adverse, dar autorii scriu că datele nu ajung pentru o concluzie sigură pe termen lung (${SHAO}).</p>
${table(['Ce compari', 'Cifra', 'De unde vine'], [
  ['Doza zilnică de pe eticheta Taurinei Prime', '500–2000 mg (1–2 capsule)', 'eticheta produsului'],
  ['Nivelul observat ca sigur la adulți sănătoși', 'până la 3 g pe zi, ca supliment', `evaluare de risc, ${SHAO}`],
  ['Cantități mai mari testate', 'fără concluzie sigură pe termen lung', `aceeași evaluare, ${SHAO}`],
  ['Dozele din studiile pe sportivi', 'de sub 1 g până la 6 g pe zi', `recenzie, ${KURTZ}`],
  ['Mențiuni de sănătate autorizate în UE', 'niciuna pentru taurină', REG],
])}
<p>Doza maximă de pe eticheta Prime, de 2000 mg, rămâne cu o treime sub nivelul observat ca sigur.</p>
<p>Taurina nu are nicio mențiune de sănătate autorizată în UE și nu apare în lista din ${REG}. De aceea nu-i atribuim niciun efect: discutăm doar ce s-a raportat ca efect nedorit.</p>

<h2 id="stomac">Disconfortul la stomac și ce faci</h2>
<p>Disconfortul la stomac, de tipul senzației de greață, este neplăcerea pe care oamenii o pomenesc cel mai des după un supliment luat pe nemâncate, inclusiv după capsulele de taurină. Studiile citate aici nu au măsurat cât de des apare, așa că nu dăm procente.</p>
<ul>
  <li><strong>Ia capsula la masă:</strong> eticheta permite administrarea cu sau fără alimente, deci poți alege masa dacă ai stomacul sensibil.</li>
  <li><strong>Începe cu o capsulă:</strong> 1000 mg pe zi, apoi cel mult 2 capsule, cum scrie pe etichetă.</li>
  <li><strong>Verifică ce altceva iei:</strong> un pre-workout sau o băutură energizantă luate în aceeași zi pot fi ele cauza.</li>
</ul>
<p>Dacă disconfortul continuă, oprești capsulele și vorbești cu medicul. Orice reacție neobișnuită, de exemplu o erupție pe piele sau umflarea feței, înseamnă oprirea suplimentului și consult medical, ca la orice produs nou.</p>

${productBox('1000 mg de taurină în fiecare capsulă, 80 de capsule. Fără cafeină, zahăr sau arome în lista de ingrediente. Se ia cu sau fără mâncare.', 'Vezi produsul')}

<h2 id="interactiuni">Interacțiuni de discutat cu medicul</h2>
<p>Dacă iei medicamente zilnic, discuți cu medicul sau cu farmacistul înainte de prima capsulă de taurină. Asta include medicamentele pentru tensiunea arterială, pentru diabet sau cele pentru sistemul nervos: doar medicul care îți cunoaște tratamentul poate spune dacă suplimentul se potrivește.</p>
<p>Atenția la interacțiuni vine mai ales de la băuturile energizante, unde taurina stă lângă cafeină. O recenzie din 2025 notează că ingredientele acestor băuturi, în primul rând cafeina, pot interacționa cu medicamentele (${DOBREK}). Capsulele Prime nu au cafeină în lista de ingrediente.</p>
<p>Sarcina, alăptarea, afecțiunile cronice și copiii sunt tratate în ghidul despre <a href="/blogs/news/taurina-doza-si-cand-se-ia">doza de taurină și contraindicații</a>.</p>

<h2 id="cafeina">Cafeina din băuturile energizante vs taurina singură</h2>
<p>Multe dintre neplăcerile puse pe seama taurinei apar după băuturi energizante, care conțin și cafeină, zahăr și alte ingrediente. Poziția oficială ISSN din 2023 arată că aceste băuturi combină de obicei cafeina, taurina, ginsengul, guarana, vitaminele B și zaharurile, iar multe combinații nu au fost studiate împreună, nici pentru siguranță (${ISSN}).</p>
<ul>
  <li><strong>Băutura energizantă:</strong> taurină plus cafeină, zahăr sau îndulcitori și alte ingrediente, în cantități care diferă de la o marcă la alta.</li>
  <li><strong>Capsula Taurinei Prime:</strong> 1000 mg de taurină, celuloză microcristalină și antiaglomeranți; fără cafeină, zahăr sau arome în lista de ingrediente.</li>
</ul>
<p>Același document ISSN scrie că folosirea fără măsură a băuturilor energizante, mai ales mai multe porții pe zi sau împreună cu alte băuturi cu cafeină, poate duce la efecte nedorite (${ISSN}). Autorii nu le recomandă copiilor, femeilor însărcinate sau care alăptează și persoanelor sensibile la cafeină.</p>
<p>Recenzia din 2025 adaugă că o legătură clară cauză-efect este greu de dovedit, pentru că multe date vin din rapoarte de caz (${DOBREK}). Concluzia practică: o reacție după o băutură energizantă nu spune nimic sigur despre taurina luată singură. Pentru o variantă fără stimulente, vezi ghidul despre <a href="/blogs/news/ce-este-un-pre-workout-fara-cofeina">pre-workout-ul fără cofeină</a>.</p>

<h2 id="cum-folosesti">Cum folosești Taurina Prime fără neplăceri</h2>
<p>Taurina Prime se ia în doză de 500–2000 mg pe zi, adică 1–2 capsule de 1000 mg, cu sau fără alimente. Nu depășești doza zilnică recomandată de pe etichetă.</p>
<ol>
  <li><strong>Pornești cu o capsulă pe zi,</strong> la o masă, cu apă.</li>
  <li><strong>Aduni toată taurina din zi:</strong> pre-workout, băuturi energizante și capsule; totalul nu trece de 2000 mg.</li>
  <li><strong>Calculezi cât ține flaconul:</strong> 80 de capsule ajung 80 de zile la o capsulă pe zi sau 40 de zile la două.</li>
</ol>
<p>La sportivii cu care lucrăm recomandăm să rămână la o capsulă pe zi dacă iau și un pre-workout cu taurină. Momentul din zi și restul detaliilor de dozare sunt în ghidul despre <a href="/blogs/news/taurina-doza-si-cand-se-ia">cât și când se ia taurina</a>.</p>

${productBox('1000 mg de taurină în fiecare capsulă, 80 de capsule. Nota 4 din 5, din 2 recenzii. Livrare gratuită la comenzile de peste 300 de lei.', 'Comandă Taurina Prime')}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Ce efecte secundare are taurina?</h3>
<p>La adulții sănătoși, studiile pe oameni nu au arătat un tipar constant de efecte adverse la suplimentele de până la 3 g pe zi (${SHAO}). Neplăcerea pomenită cel mai des este disconfortul la stomac când capsula e luată pe nemâncate.</p>
<h3>Taurina face rău la stomac?</h3>
<p>La unele persoane poate da o senzație de disconfort, mai ales pe stomacul gol. Ia capsula la masă, cu un pahar cu apă, și rămâi la o capsulă pe zi; dacă disconfortul continuă, oprește-te și întreabă medicul.</p>
<h3>Câtă taurină pe zi este sigură?</h3>
<p>Evaluarea de risc din 2008 a considerat sigure suplimentele de până la 3 g pe zi la adulții sănătoși (${SHAO}). Eticheta Taurinei Prime indică cel mult 2000 mg pe zi, adică 2 capsule, iar această limită nu se depășește.</p>
<h3>Taurina are cafeină?</h3>
<p>Nu, taurina și cafeina sunt substanțe diferite, deși apar împreună în băuturile energizante. Capsulele Taurinei Prime nu au cafeină în lista de ingrediente.</p>
<h3>Se poate lua taurina cu medicamente?</h3>
<p>Doar după ce discuți cu medicul sau cu farmacistul, mai ales dacă iei medicamente zilnic. Spune-le ce suplimente iei, inclusiv băuturile energizante, ca să verifice combinația.</p>
<h3>Se poate lua taurina pe termen lung?</h3>
<p>Doza de pe etichetă este una zilnică, de 1–2 capsule. Pentru cantități peste 3 g pe zi, autorii evaluării de risc spun că datele nu ajung pentru o concluzie sigură pe termen lung (${SHAO}); dacă vrei să o iei luni la rând, întreabă medicul.</p>

<p>Mai multe produse găsești în colecția <a href="/collections/aminoacizi">Aminoacizi</a>.</p>`;

const html = [shortBox(SHORT), BODY, sources(SOURCES), DISCLAIMER, AUTHOR, related(RELATED)].join('\n\n');
fs.writeFileSync(path.join(dir, `${META.handle}.html`), html);
fs.writeFileSync(path.join(dir, `${META.handle}.meta.json`), JSON.stringify(META, null, 1));

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
const WATCH = ['tensiun', 'inim', 'hepat', 'ficat', 'anxiet', 'somn', 'stres', 'energ', 'refacere', 'recuper', 'performan', 'rezultat', 'beneficii', 'sursă de', 'face efect', 'semne de risc', 'taur max', 'vindec', 'tratea', 'previne', 'detox', 'garantat', 'fără gluten', '<h1', 'target="_blank"'];
console.log(`cuvinte ${text.split(' ').length} · title ${META.title.length}, seoTitle ${META.seoTitle.length}, seoDesc ${META.seoDesc.length}`);
console.log('de verificat:', WATCH.map(w => [w, (text + html).split(w).length - 1]).filter(([, n]) => n).map(([w, n]) => `${w}×${n}`).join(', ') || '-');
