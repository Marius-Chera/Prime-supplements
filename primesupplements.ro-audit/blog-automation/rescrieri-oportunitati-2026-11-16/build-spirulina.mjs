// Rescriere 16.11.2026: „Adevărul despre spirulină” (handle adevarul-despre-spirulina-90-zile-spirulina-evaluare-studii).
// Aceleași blocuri HTML ca în rescrieri-pubmed-2026-11-13/build.mjs (GHID-REDACTIONAL.md §5).
// Fapte de produs: produsul spirulina-80-caps (ACTIVE), descriere + metafield-uri citite prin Admin API pe 16.11.2026.
// Studii: Maddiboyina 2023 din bibliotecă; celelalte verificate pe 16.11.2026 cu eutils (esummary + efetch).
// Folosire: node build-spirulina.mjs  → scrie <handle>.html și <handle>.meta.json lângă acest fișier.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const HANDLE = 'adevarul-despre-spirulina-90-zile-spirulina-evaluare-studii';

const pm = (pmid, text) => `<a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/" rel="noopener">${text}</a>`;
const REG = `<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>`;

const S = {
  maddi: { cite: 'Maddiboyina B și colab. Food and drug industry applications of microalgae Spirulina platensis: A review. J Basic Microbiol. 2023;63(6):573-583.', pmid: '36720046', doi: '10.1002/jobm.202200704' },
  lak: { cite: 'Lak M și colab. Effects of spirulina supplementation on body composition in adults: a GRADE-assessed and dose-response meta-analysis of RCTs. Nutr Metab (Lond). 2025;22(1):61.', pmid: '40528207', doi: '10.1186/s12986-025-00959-4' },
  moradi: { cite: 'Moradi S și colab. Effects of Spirulina supplementation on obesity: A systematic review and meta-analysis of randomized clinical trials. Complement Ther Med. 2019;47:102211.', pmid: '31780031', doi: '10.1016/j.ctim.2019.102211' },
  marles: { cite: 'Marles RJ și colab. United States pharmacopeia safety evaluation of spirulina. Crit Rev Food Sci Nutr. 2011;51(7):593-604.', pmid: '21793723', doi: '10.1080/10408391003721719' },
  rhoades: { cite: 'Rhoades J și colab. Microbiota and Cyanotoxin Content of Retail Spirulina Supplements and Spirulina Supplemented Foods. Microorganisms. 2023;11(5):1175.', pmid: '37317149', doi: '10.3390/microorganisms11051175' },
  gross: { cite: 'Grosshagauer S, Kraemer K, Somoza V. The True Value of Spirulina. J Agric Food Chem. 2020;68(14):4109-4115.', pmid: '32133854', doi: '10.1021/acs.jafc.9b08251' },
  reg: { cite: 'Regulamentul (UE) nr. 432/2012 al Comisiei – lista mențiunilor de sănătate permise pentru alimente.', url: 'https://eur-lex.europa.eu/eli/reg/2012/432/oj', label: 'EUR-Lex' },
};

const PROD = {
  handle: 'spirulina-80-caps',
  title: 'Spirulină Prime – 80 de capsule',
  img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/ALL_MERCH5_1d54c4ef-a75d-49ff-8bb8-1df829824dae.png?v=1794828955',
};
const A = 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/';
const RELATED = [
  { handle: 'prospect-spirulina-cum-sa-alegi-spirulina-de', title: 'Cum alegi spirulina de calitate: prospect și puritate', img: A + 'blog-cum-sa-alegi-spirulina-de-calitate-2026-1779009665492.png?v=1781602226', summary: 'Ce cauți în prospectul unei spiruline: cultivarea, procesarea și analizele de puritate.' },
  { handle: 'proteina-din-zer-vs-vegetala', title: 'Proteina din zer vs vegetală: ce alegi pentru mușchi', img: A + 'blog-izolat-proteic-din-zer-prime-whey-2000g-plant-vs-1776429092286.png?v=1792129726', summary: 'Aminoacizi esențiali, leucină și cum combini proteinele vegetale între ele.' },
];

function productBox(line, cta) {
  return `<div style="margin: 30px 0; padding: 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
  <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
    <a href="/products/${PROD.handle}" style="flex-shrink: 0;"><img src="${PROD.img}&width=240" alt="${PROD.title}" loading="lazy" width="120" height="120" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px;"></a>
    <div style="flex: 1; min-width: 200px;">
      <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1e293b;">${PROD.title}</p>
      <p style="margin: 0 0 12px 0; color: #334155;">${line}</p>
      <a href="/products/${PROD.handle}" style="display: inline-block; background: #b65b5d; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">${cta} →</a>
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

const SHORT = [
  'Spirulina este biomasa uscată a unei cianobacterii (Spirulina platensis), folosită ca supliment pentru conținutul ei mare de proteine, minerale și pigmenți.',
  `În UE nu există nicio mențiune de sănătate autorizată pentru spirulină, deci nu i se poate promite niciun efect (${REG}).`,
  `La greutate, o meta-analiză din 2025 a găsit în medie o diferență de aproximativ 1 kg față de grupurile de control, cu limite clare (${pm('40528207', 'Lak și colab., 2025')}).`,
  'Eticheta Spirulinei Prime: 2 capsule pe zi (1200 mg), în timpul sau după masă; un flacon de 80 de capsule ajunge 40 de zile.',
];

const BODY = `<p><strong>Adevărul despre spirulină este simplu: e un aliment concentrat, bogat în proteine, nu un remediu.</strong> Spirulina este biomasa uscată a cianobacteriei Spirulina platensis (numită și Arthrospira platensis), iar în Uniunea Europeană nu are nicio mențiune de sănătate autorizată. O folosești pentru ce conține, în doza de pe etichetă, fără să aștepți efecte promise.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#ce-este-spirulina">Adevărul despre spirulină: ce este, de fapt</a></li>
  <li><a href="#ce-spun-studiile">Ce au găsit studiile și ce nu poți promite</a></li>
  <li><a href="#am-slabit-cu-spirulina">Am slăbit cu spirulina? Ce arată meta-analizele</a></li>
  <li><a href="#cat-dureaza-cura">Cât durează o cură cu spirulină</a></li>
  <li><a href="#cum-alegi-spirulina">Cum alegi o spirulină curată</a></li>
  <li><a href="#cui-nu-i-se-potriveste">Cui nu i se potrivește spirulina</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="ce-este-spirulina">Adevărul despre spirulină: ce este, de fapt</h2>
<p>Spirulina este o cianobacterie microscopică, numită popular „algă albastru-verde”, care face fotosinteză și crește în ape calde. Ca supliment se vinde ca pulbere uscată sau în capsule, cum este Spirulina Prime, cu 600 mg de pulbere de spirulină în fiecare capsulă.</p>
<p>Interesul pentru ea vine din compoziție: o recenzie despre utilizările ei în industria alimentară (${pm('36720046', 'Maddiboyina și colab., 2023')}) descrie o biomasă cu 55–70% proteine, 15–25% carbohidrați și 5–8% acizi grași, plus minerale, vitamine și pigmenți precum ficocianina, clorofila și carotenii. Aceeași recenzie amintește că NASA a folosit spirulina ca supliment nutritiv pentru astronauți.</p>
<p>Contează însă cantitatea. Porția de pe eticheta Spirulinei Prime are 1200 mg de pulbere, iar la 55–70% proteine asta înseamnă aproximativ 0,65–0,85 g de proteine pe zi (calcul aproximativ, pornind de la procentele din recenzie, nu de la etichetă). Proteinele zilei vin deci tot din mâncare; diferențele dintre surse le explicăm în ghidul <a href="/blogs/news/proteina-din-zer-vs-vegetala">proteina din zer vs proteina vegetală</a>.</p>

<h2 id="ce-spun-studiile">Ce au găsit studiile și ce nu poți promite</h2>
<p>Pentru spirulină nu există nicio mențiune de sănătate autorizată în UE: lista oficială din ${REG} nu o conține. De aceea, un produs cu spirulină nu poate fi prezentat prin efecte asupra organismului, oricât de des apar ele în reclame.</p>
<p>Spirulina a fost totuși cercetată mult, iar lucrările care contează pentru un cumpărător se împart în patru teme. Tabelul de mai jos rezumă ce au găsit sursele citate și unde se opresc ele.</p>
${table(['Ce s-a analizat', 'Ce s-a găsit', 'Limita'], [
  ['Compoziția', `55–70% proteine, 15–25% carbohidrați, 5–8% acizi grași, pigmenți (${pm('36720046', 'Maddiboyina și colab., 2023')})`, 'recenzie generală, nu analiza unui produs anume'],
  ['Greutatea corporală', `în medie –1,07 kg față de control, în 17 studii randomizate (${pm('40528207', 'Lak și colab., 2025')})`, 'diferență mică; nu există mențiune autorizată'],
  ['Siguranța', `clasa A de siguranță acordată de Farmacopeea SUA pentru S. platensis și S. maxima (${pm('21793723', 'Marles și colab., 2011')})`, 'evaluare din 2011, care poate fi revizuită la date noi'],
  ['Contaminarea', `microcistine în toate cele 5 produse din comerț analizate (${pm('37317149', 'Rhoades și colab., 2023')})`, 'doar 5 produse testate'],
])}
<p>La sportivii cu care lucrăm vedem des că așteptările nerealiste de la spirulină duc la dezamăgire; recomandăm să o privești strict ca pe un aliment concentrat.</p>

${productBox('Capsule cu 600 mg de pulbere de spirulină (Spirulina platensis) fiecare; porția de 2 capsule aduce 1200 mg, iar flaconul are 40 de porții.', 'Vezi produsul')}

<h2 id="am-slabit-cu-spirulina">Am slăbit cu spirulina? Ce arată meta-analizele</h2>
<p>Dacă ai slăbit în perioada în care ai luat spirulină, cel mai probabil a contat ce ai schimbat în alimentație și în mișcare, nu capsulele. Spirulina nu este un produs de slăbit, iar în UE nu are nicio mențiune legată de greutate.</p>
<p>Cea mai nouă meta-analiză pe subiect (${pm('40528207', 'Lak și colab., 2025')}) a adunat 17 studii randomizate la adulți. Față de grupurile de control, a găsit o scădere medie de 1,07 kg a greutății, de 0,40 puncte a indicelui de masă corporală și de 0,84 puncte procentuale a grăsimii corporale, fără o schimbare semnificativă a circumferinței taliei (–0,46 cm).</p>
<p>O meta-analiză mai veche (${pm('31780031', 'Moradi și colab., 2019')}) a avut doar 5 studii și a găsit în medie –1,56 kg, mai mult la persoanele cu obezitate (–2,06 kg) decât la cele supraponderale (–1,28 kg). În analiza respectivă, indicele de masă corporală nu s-a modificat semnificativ.</p>
<p>Limitele sunt importante: diferențele sunt de ordinul unui kilogram, studiile sunt puține, iar autorii din 2025 notează că efectul a variat cu doza, cu durata și cu tipul de participanți (${pm('40528207', 'Lak și colab., 2025')}). Greutatea o schimbă bilanțul caloric și antrenamentul, nu capsulele.</p>

<h2 id="cat-dureaza-cura">Cât durează o cură cu spirulină</h2>
<p>Eticheta Spirulinei Prime nu fixează o durată a curei: indică 2 capsule pe zi, preferabil în timpul sau după masă, fără să depășești doza recomandată pentru consumul zilnic. Un flacon de 80 de capsule are 40 de porții, deci ajunge 40 de zile.</p>
<p>Nu există o durată stabilită oficial; ca reper practic, gândește în flacoane.</p>
${table(['Perioada', 'Capsule necesare', 'Flacoane de 80 de capsule (calcul aproximativ)'], [
  ['30 de zile', '60 de capsule', '0,75'],
  ['40 de zile', '80 de capsule', '1'],
  ['60 de zile', '120 de capsule', '1,5'],
  ['90 de zile', '180 de capsule', '2,25'],
])}
<h3>Cum folosești Spirulina Prime</h3>
<ul>
  <li>Iei 2 capsule pe zi (1200 mg de spirulină), în timpul sau după masă, conform etichetei.</li>
  <li>Nu depăși doza recomandată pentru consumul zilnic.</li>
  <li>Capsulele sunt practice dacă nu-ți place gustul sau culoarea pulberii amestecate în băuturi.</li>
  <li>Păstrezi flaconul la loc răcoros, ferit de lumină, umiditate și căldură excesivă.</li>
</ul>

<h2 id="cum-alegi-spirulina">Cum alegi o spirulină curată</h2>
<p>La spirulină, puritatea contează mai mult decât la multe alte suplimente, pentru că ea crește adesea în bazine deschise. O analiză a produselor din comerț (${pm('37317149', 'Rhoades și colab., 2023')}) a găsit microcistine, toxine produse de alte cianobacterii, în toate cele 5 produse testate, la niveluri care puteau duce la depășirea limitelor zilnice recomandate.</p>
<p>O recenzie din 2020 (${pm('32133854', 'Grosshagauer și colab., 2020')}) observă că spirulina e promovată mai ales pentru vitamina B12, dar că datele despre contaminanți (cianotoxine, metale grele, pesticide, hidrocarburi aromatice policiclice) sunt puține. Autorii cer o monitorizare mai atentă a contaminanților.</p>
<p>Evaluarea de siguranță a Farmacopeei SUA (${pm('21793723', 'Marles și colab., 2011')}) a analizat studii clinice, studii pe animale și 31 de raportări de reacții adverse. La final, comitetul a acordat clasa A de siguranță speciilor S. platensis și S. maxima, cu mențiunea că poate revizui clasificarea dacă apar informații noi.</p>
<p>Pe etichetă verifici specia (Spirulina platensis), cantitatea pe capsulă și pe porție (la Spirulina Prime: 600 mg și 1200 mg), numărul de porții, ingredientele inactive și avertismentele. Spirulina Prime este fabricată în UE, într-o unitate certificată ISO și HACCP; ce mai poți urmări în prospect, de la cultivare la analize, găsești în ghidul nostru <a href="/blogs/news/prospect-spirulina-cum-sa-alegi-spirulina-de">cum alegi spirulina de calitate</a>.</p>

<h2 id="cui-nu-i-se-potriveste">Cui nu i se potrivește spirulina</h2>
<p>Conform etichetei, Spirulina Prime nu se recomandă persoanelor sub 18 ani și femeilor însărcinate sau care alăptează. Capsula este din gelatină, deci produsul nu este potrivit pentru vegani sau vegetarieni.</p>
<p>Produsul este fabricat într-o unitate care procesează și lapte, ou, soia, grâu și pește, lucru important dacă ai o alergie. Spirulina conține multe proteine, deci și fenilalanină, așa că persoanele cu fenilcetonurie discută cu medicul înainte.</p>
<p>La fel, discută cu medicul dacă ai o afecțiune sau iei medicamente.</p>

${productBox('Spirulină în capsule de 600 mg, 2 capsule pe zi, în timpul sau după masă; un flacon de 80 de capsule ajunge 40 de zile.', 'Comandă spirulina')}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Are spirulina mențiuni de sănătate aprobate în UE?</h3>
<p>Nu. Spirulina nu apare în lista mențiunilor de sănătate permise din ${REG}. De aceea nu i se poate atribui niciun efect pe ambalaj, pe site sau în reclame.</p>
<h3>Am slăbit cu spirulina: e meritul ei?</h3>
<p>Cel mai probabil nu în principal. Meta-analiza din 2025 a găsit o diferență medie de aproximativ 1 kg față de grupurile de control (${pm('40528207', 'Lak și colab., 2025')}), iar spirulina nu are în UE nicio mențiune legată de greutate. Alimentația și mișcarea cântăresc mult mai mult.</p>
<h3>Cât durează cura cu spirulina?</h3>
<p>Eticheta Spirulinei Prime nu fixează o durată, ci doar doza: 2 capsule pe zi. Un flacon ajunge 40 de zile, iar 90 de zile înseamnă 180 de capsule, adică 2,25 flacoane (calcul aproximativ).</p>
<h3>Câte capsule de spirulină iau pe zi?</h3>
<p>La Spirulina Prime iei 2 capsule pe zi, adică 1200 mg de spirulină, preferabil în timpul sau după masă. Nu depăși doza recomandată pentru consumul zilnic.</p>
<h3>Se poate lua spirulina seara?</h3>
<p>Da, dacă o iei la cină. Eticheta cere doar ca spirulina să fie luată în timpul sau după masă, fără să precizeze momentul zilei.</p>
<h3>Ce trebuie să știi despre spirulină înainte s-o iei?</h3>
<p>Că este o cianobacterie, nu o plantă, că nu are mențiuni de sănătate autorizate și că puritatea produsului contează. Citește eticheta și respectă doza.</p>

<p>Mai multe produse cu un singur ingredient activ găsești în colecția <a href="/collections/vitamine-si-minerale">Vitamine și Minerale</a>.</p>`;

const META = {
  handle: HANDLE,
  id: 'gid://shopify/Article/1024779878775',
  title: 'Adevărul despre spirulină: ce arată studiile și cât durează cura',
  seoTitle: 'Adevărul despre spirulină: studii, doză și cură',
  seoDesc: 'Adevărul despre spirulină: ce conține, ce au găsit meta-analizele despre greutate, ce doză scrie pe etichetă și cât durează o cură, cu surse PubMed.',
  summary: 'Adevărul despre spirulină: este o cianobacterie bogată în proteine, fără mențiuni de sănătate autorizate în UE. Eticheta Spirulinei Prime indică 2 capsule pe zi (1200 mg), iar un flacon ajunge 40 de zile.',
  keyword: 'adevărul despre spirulină',
  imageAlt: 'Borcan de sticlă cu capsule verzi de spirulină lângă o grămăjoară de pulbere de spirulină pe masă',
};

const html = [shortBox(SHORT), BODY, sources([S.maddi, S.lak, S.moradi, S.marles, S.rhoades, S.gross, S.reg]), DISCLAIMER, AUTHOR, related(RELATED)].join('\n\n');
fs.writeFileSync(path.join(dir, `${HANDLE}.html`), html);
fs.writeFileSync(path.join(dir, `${HANDLE}.meta.json`), JSON.stringify(META, null, 1));

const FORBIDDEN = ['vindecă', 'tratează', 'previne boala', 'detox', 'arde grăsim', 'garantat', 'fără gluten', '<h1', '<script', 'energie', 'sursă de', 'target="_blank"', 'ficat', 'imunit', 'imun', 'refacere', 'slăbi'];
const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const low = text.toLowerCase();
console.log('cuvinte', text.trim().split(' ').length, '| title', META.title.length, '| seoTitle', META.seoTitle.length, '| seoDesc', META.seoDesc.length);
console.log('de verificat:', FORBIDDEN.filter(w => low.includes(w) || html.toLowerCase().includes(w)).join(', ') || '-');
