// Rescriere 16.11.2026: ceai-diuretic-sfatul-medicului-cauze-retentie-apa (oportunitate GSC: 4.323 afișări, poz. 9,7).
// Șablon și blocuri ca în rescrieri-pubmed-2026-11-13/build.mjs (GHID-REDACTIONAL.md §5).
// Fapte de produs: metafield-urile water-out-120-caps și water-out-500-ml (Admin API, 16.11.2026).
// Studii: verificate prin eutils (esummary + efetch, rezumat citit) pe 16.11.2026.
// Folosire: node build-ceai-diuretic.mjs → scrie <handle>.html și <handle>.meta.json lângă acest fișier.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const HANDLE = 'ceai-diuretic-sfatul-medicului-cauze-retentie-apa';

const pubmed = (pmid, text) => `<a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/" rel="noopener">${text}</a>`;
const REG = `<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>`;

function productBox(p) {
  return `<div style="margin: 30px 0; padding: 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
  <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
    <a href="/products/${p.handle}" style="flex-shrink: 0;"><img src="${p.img}&width=240" alt="${p.title}" loading="lazy" width="120" height="120" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px;"></a>
    <div style="flex: 1; min-width: 200px;">
      <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1e293b;">${p.title}</p>
      <p style="margin: 0 0 12px 0; color: #334155;">${p.line}</p>
      <a href="/products/${p.handle}" style="display: inline-block; background: #b65b5d; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">${p.cta} →</a>
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

// ---------- surse (toate verificate prin eutils pe 16.11.2026) ----------
const S = [
  { cite: 'Trayes KP, Studdiford JS, Pickle S, Tully AS. Edema: diagnosis and management. Am Fam Physician. 2013;88(2):102-10.', pmid: '23939641' },
  { cite: 'Wright CI, Van-Buren L, Kroner CI, Koning MM. Herbal medicines as diuretics: a review of the scientific evidence. J Ethnopharmacol. 2007;114(1):1-31.', pmid: '17804183', doi: '10.1016/j.jep.2007.07.023' },
  { cite: 'Clare BA, Conroy RS, Spelman K. The diuretic effect in human subjects of an extract of Taraxacum officinale folium over a single day. J Altern Complement Med. 2009;15(8):929-34.', pmid: '19678785', doi: '10.1089/acm.2008.0152' },
  { cite: 'Carneiro DM și colab. Randomized, Double-Blind Clinical Trial to Assess the Acute Diuretic Effect of Equisetum arvense (Field Horsetail) in Healthy Volunteers. Evid Based Complement Alternat Med. 2014;2014:760683.', pmid: '24723963', doi: '10.1155/2014/760683' },
  { cite: 'Kreydiyyeh SI, Usta J. Diuretic effect and mechanism of action of parsley. J Ethnopharmacol. 2002;79(3):353-7.', pmid: '11849841', doi: '10.1016/s0378-8741(01)00408-1' },
  { cite: 'Regulamentul (UE) nr. 432/2012 al Comisiei – lista mențiunilor de sănătate permise pentru alimente.', url: 'https://eur-lex.europa.eu/eli/reg/2012/432/oj', label: 'EUR-Lex' },
];

const CAPS = {
  handle: 'water-out-120-caps',
  img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_WATEROUT_120caps_front.jpg?v=1794828861',
  title: 'Water Out – 120 capsule cu extracte din plante',
  line: 'Per porție de 3 capsule: 2000 mg de extracte din 8 plante, 375 mg potasiu, 75 mg magneziu și 80 mg vitamina C; conține ceai verde și 6 mg sinefrină.',
  cta: 'Vezi produsul',
};
const TINCT = {
  handle: 'water-out-500-ml',
  img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_WATEROUT_500ml_front.jpg?v=1794828908',
  title: 'Water Out Prime Health – tinctură din plante, 500 ml',
  line: 'Tinctură din 8 plante, extract 1:6, 30% v/v alcool; 100 de porții de 5 ml, o porție pe zi.',
  cta: 'Vezi tinctura Water Out',
};

const RELATED = [
  { handle: 'water-out-capsule-tinctura-forma-alegi', title: 'Water Out capsule sau tinctură: ce formă alegi', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-water-out-capsule-tinctura-forma-alegi.jpg?v=1794573045', summary: 'Capsulele și tinctura au rețete diferite: ce conține fiecare și ce trebuie să eviți.' },
  { handle: 'bei-mai-multa-apa-7-trucuri-care-chiar-functioneaza', title: 'Cum bei mai multă apă: 7 trucuri care chiar funcționează', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-bei-mai-multa-apa-7-trucuri-care-chiar-functioneaza.jpg?v=1792210104', summary: 'Sticla la vedere, ore fixe și puțin gust: obiceiuri simple ca să bei apă suficientă.' },
  { handle: 'creatina-si-retentia-de-apa', title: 'Creatina și retenția de apă: cum te hidratezi corect', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-creatine-monohydrate-creatina-monohidrat-micronized-300g-fara-1775730078786.png?v=1776334804', summary: 'De unde vin kilogramele de apă din primele săptămâni cu creatină și cum te hidratezi.' },
];

const SHORT = [
  'Un ceai diuretic este o infuzie din plante folosite tradițional pentru urinare: păpădie, mesteacăn, coada-calului, pătrunjel, urzică.',
  'Pentru aceste plante nu există mențiuni de sănătate autorizate în UE; cererile depuse sunt încă în așteptare.',
  `Studiile pe oameni sunt puține și mici: o zi cu extract de păpădie la 17 voluntari (${pubmed('19678785', 'Clare și colab., 2009')}), 4 zile cu coada-calului la 36 de bărbați (${pubmed('24723963', 'Carneiro și colab., 2014')}).`,
  'Umflăturile care apar brusc sau nu trec se discută cu medicul: pot avea cauze la inimă, rinichi, vene sau medicamente.',
];

const BODY = `<p><strong>Un ceai diuretic este o infuzie din plante pe care medicina populară le folosește ca să crească cantitatea de urină, de exemplu păpădia, mesteacănul, coada-calului sau pătrunjelul.</strong> Este o băutură, nu un medicament: în UE plantele din ceaiurile diuretice nu au mențiuni de sănătate autorizate. Retenția de apă care nu trece în câteva zile se discută cu medicul.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#ce-este">Ce este un ceai diuretic</a></li>
  <li><a href="#plante">Ceaiuri diuretice: ce plante se folosesc</a></li>
  <li><a href="#studii">Ce au găsit studiile pe oameni</a></li>
  <li><a href="#cauze">Retenția de apă: cauze obișnuite și cauze medicale</a></li>
  <li><a href="#medic">Când mergi la medic în loc să bei ceai</a></li>
  <li><a href="#cum-folosesti">Cum folosești un ceai sau un supliment cu plante</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="ce-este">Ce este un ceai diuretic</h2>
<p>Un ceai diuretic este o infuzie din frunze, flori, rădăcini sau părți aeriene uscate ale unor plante numite tradițional „diuretice”. Diureticele adevărate sunt medicamente cu prescripție; un ceai nu le ține locul.</p>
<p>Cuvântul descrie folosirea tradițională a plantei, nu un efect promis. Pentru plante, mențiunile de sănătate depuse în UE sunt încă în așteptare, deci niciuna nu se află pe lista mențiunilor permise din ${REG}.</p>

<h2 id="plante">Ceaiuri diuretice: ce plante se folosesc</h2>
<p>Cele mai folosite plante în ceaiurile diuretice din Europa sunt păpădia, mesteacănul, coada-calului, pătrunjelul și frasinul. Tabelul arată partea folosită, folosirea tradițională și ce s-a cercetat.</p>
${table(['Planta', 'Ce parte se folosește', 'Folosire tradițională', 'Ce s-a cercetat'], [
  ['Păpădie (<em>Taraxacum officinale</em>)', 'frunze, rădăcină', 'infuzie din frunze sau rădăcină; frunzele tinere și în salate', `un studiu pilot de o zi, la 17 adulți, cu extract din frunze proaspete (${pubmed('19678785', 'Clare și colab., 2009')})`],
  ['Mesteacăn (<em>Betula pendula</em>)', 'frunze', 'ceai din frunze, des în amestecuri cu păpădie', `nu apare printre plantele cele mai promițătoare din recenzia din 2007 (${pubmed('17804183', 'Wright și colab., 2007')})`],
  ['Coada-calului (<em>Equisetum arvense</em>)', 'părți aeriene (tulpini verzi)', 'ceai din tulpinile uscate; planta e rudă cu ferigile', `un studiu dublu-orb de 4 zile, la 36 de bărbați sănătoși (${pubmed('24723963', 'Carneiro și colab., 2014')})`],
  ['Pătrunjel (<em>Petroselinum</em>)', 'frunze, rădăcină, semințe', 'ceai din rădăcină sau semințe; frunzele, în mâncare', `studii pe șobolani, cu extract din semințe (${pubmed('11849841', 'Kreydiyyeh și Usta, 2002')})`],
  ['Frasin european (<em>Fraxinus excelsior</em>)', 'frunze', 'ceai din frunze, mai rar folosit singur', `citat printre speciile promițătoare, pe puține studii (${pubmed('17804183', 'Wright și colab., 2007')})`],
])}


<h2 id="studii">Ce au găsit studiile pe oameni</h2>
<p>O recenzie din 2007 a adunat cercetările despre plante cu efect diuretic, măsurat prin urina și sodiul eliminate. Autorii au considerat promițătoare feniculul, frasinul, hibiscusul, pătrunjelul și câteva specii din genul coada-calului, dar pe puține studii, care trebuie confirmate (${pubmed('17804183', 'Wright și colab., 2007')}).</p>
<p><strong>Păpădia.</strong> În 2009, 17 voluntari au luat câte 8 ml de extract hidroetanolic din frunze proaspete de păpădie, de 3 ori într-o singură zi. Frecvența urinării a crescut în cele 5 ore de după prima doză; a treia doză nu a mai schimbat nimic. Limita: studiu pilot, fără grup placebo, comparat cu cele 2 zile dinainte (${pubmed('19678785', 'Clare și colab., 2009')}).</p>
<p><strong>Coada-calului.</strong> Un studiu randomizat, dublu-orb, a comparat la 36 de bărbați sănătoși 900 mg pe zi de extract uscat standardizat de <em>Equisetum arvense</em> cu un placebo (amidon de porumb) și cu un medicament diuretic, câte 4 zile. Extractul a crescut eliminarea de lichide față de placebo, fără schimbări importante la electroliți, cu efecte nedorite rare și minore (${pubmed('24723963', 'Carneiro și colab., 2014')}). Limita: bărbați tineri și sănătoși, 4 zile, capsule de extract, nu ceai.</p>
<p><strong>Pătrunjelul.</strong> Datele vin din experimente pe șobolani: cei care au băut extract apos din semințe de pătrunjel au eliminat mai multă urină în 24 de ore decât cu apă simplă (${pubmed('11849841', 'Kreydiyyeh și Usta, 2002')}). Un rezultat pe animale nu se transferă direct la o cană de ceai.</p>

${productBox(CAPS)}

<h2 id="cauze">Retenția de apă: cauze obișnuite și cauze medicale</h2>
<p>Retenția de apă (edemul) este acumularea de lichid în spațiul dintre celule, când lichidul care iese din capilare depășește ce poate drena sistemul limfatic (${pubmed('23939641', 'Trayes și colab., 2013')}). Se vede mai ales la glezne, picioare și mâini.</p>
<h3>Cauze obișnuite, legate de zi</h3>
<ul>
  <li><strong>Mâncare foarte sărată</strong> într-o zi sau două.</li>
  <li><strong>Statul mult în picioare sau pe scaun</strong>, drumurile lungi, căldura.</li>
  <li><strong>Ciclul menstrual</strong>, în anumite zile ale lunii.</li>
</ul>
<h3>Cauze medicale</h3>
<p>Aceeași recenzie arată că umflarea generalizată apărută repede însoțește boli ale întregului organism și cere diagnostic rapid, iar umflarea cronică a picioarelor indică des insuficiența venoasă; și apneea în somn poate umfla ambele picioare (${pubmed('23939641', 'Trayes și colab., 2013')}).</p>
<p>Printre cauzele medicale se numără și bolile de inimă și de rinichi și unele medicamente, de exemplu unele pentru tensiune sau antiinflamatoarele.</p>

<h2 id="medic">Când mergi la medic în loc să bei ceai</h2>
<p>Semnele care nu se amână:</p>
<ul>
  <li>un singur picior umflat, cu durere, roșeață sau căldură (mergi de urgență);</li>
  <li>umflare apărută brusc, la față sau pe tot corpul, ori respirație grea;</li>
  <li>umflături care persistă mai mult de câteva zile sau revin des;</li>
  <li>ai o boală de inimă sau de rinichi, ești însărcinată sau iei medicamente.</li>
</ul>
<p>Dacă iei diuretice prescrise, medicamente pentru tensiune sau litiu, nu începe un ceai sau un supliment din plante fără acordul medicului.</p>

<h2 id="cum-folosesti">Cum folosești un ceai sau un supliment cu plante</h2>
<p>Un ceai din plante se prepară după ambalaj, pentru că cantitatea și timpul de infuzare diferă. Ce recomandăm:</p>
<ul>
  <li><strong>Citește eticheta:</strong> numele plantei, partea folosită, cantitatea și cât timp se poate bea.</li>
  <li><strong>Bea apă în continuare:</strong> idei în <a href="/blogs/news/bei-mai-multa-apa-7-trucuri-care-chiar-functioneaza">cum bei mai multă apă</a>.</li>
  <li><strong>Nu cumula</strong> ceai, tinctură și capsule cu aceleași plante în aceeași zi.</li>
  <li><strong>Nu le folosi pentru cântar:</strong> la sportivii cu care lucrăm, apa „în plus” după o zi cu multă sare dispare de obicei când revin la mesele obișnuite; nu folosim ceaiuri ca să scădem pe cântar.</li>
</ul>
<p>Prime Supplements are două produse Water Out, cu rețete diferite și cantități declarate. <a href="/products/water-out-120-caps">Water Out în capsule</a> are, per porție de 3 capsule, 2000 mg de extracte din 8 plante (cel mai mult păpădie, 400 mg; apoi mesteacăn, sparanghel, ceai verde, coada-calului, frasin, ortosifon, <em>Citrus aurantium</em>), plus potasiu, magneziu și vitamina C. Conține 6 mg sinefrină, nu se ia pe stomacul gol și nu se combină în aceeași zi cu alte produse cu ceai verde, cafeină sau sinefrină.</p>
<p><a href="/products/water-out-500-ml">Tinctura Water Out</a> este un extract 1:6 din 8 plante, cu 30% v/v alcool, printre ele coada-calului, mesteacăn, ienupăr și păpădie. Se ia o porție de 5 ml pe zi, de preferat dimineața, deci sticla de 500 ml are 100 de porții. Diferențele sunt în <a href="/blogs/news/water-out-capsule-tinctura-forma-alegi">Water Out capsule sau tinctură</a>.</p>
<p>Ambele nu se recomandă copiilor, femeilor însărcinate sau care alăptează; capsulele nici celor sensibili la stimulente, tinctura nici celor care evită alcoolul.</p>

${productBox(TINCT)}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Care este cel mai bun ceai diuretic?</h3>
<p>Nu există un clasament sigur: recenzia din 2007 a găsit puține studii pe plantă (${pubmed('17804183', 'Wright și colab., 2007')}). Alege un ceai cu planta și cantitatea scrise pe ambalaj.</p>
<h3>Există ceaiuri pentru eliminarea apei din organism?</h3>
<p>Nu cu o promisiune autorizată: în UE nicio plantă nu are o mențiune de sănătate aprobată, iar studiile pe oameni au durat o zi (${pubmed('19678785', 'Clare și colab., 2009')}) sau 4 zile (${pubmed('24723963', 'Carneiro și colab., 2014')}). Dacă retenția de apă nu trece, cauza se caută la medic.</p>
<h3>Cât timp se poate bea ceai diuretic?</h3>
<p>Cât scrie pe ambalaj. Dacă vrei să bei zilnic, mai multe săptămâni, sau iei medicamente, întreabă întâi medicul.</p>
<h3>Se poate bea ceai diuretic seara?</h3>
<p>Se poate, dar orice cană de lichid băută seara poate însemna drumuri la toaletă noaptea. Mulți preferă dimineața; la tinctura Water Out, eticheta recomandă tot dimineața.</p>
<h3>Pot bea ceai diuretic dacă iau creatină?</h3>
<p>Da, dacă nu ai o contraindicație medicală, dar nu e nevoie: creatina reține apă în mușchi, nu sub piele. Detaliile sunt în <a href="/blogs/news/creatina-si-retentia-de-apa">articolul despre creatină și retenția de apă</a>.</p>

<p>Tinctura Water Out și celelalte produse din gama Prime Health le găsești în colecția <a href="/collections/prime-health">Prime Health</a>.</p>`;

const html = [shortBox(SHORT), BODY, sources(S), DISCLAIMER, AUTHOR, related(RELATED)].join('\n\n');
fs.writeFileSync(path.join(dir, `${HANDLE}.html`), html);

const meta = {
  handle: HANDLE,
  id: 'gid://shopify/Article/1023303844215',
  title: 'Ceai diuretic: ce plante se folosesc și când mergi la medic',
  seoTitle: 'Ceai diuretic: plante folosite și cauzele retenției de apă',
  seoDesc: 'Ceai diuretic din păpădie, mesteacăn, coada-calului sau pătrunjel: ce sunt plantele, ce au găsit studiile și când retenția de apă cere sfatul medicului.',
  summary: 'Un ceai diuretic este o infuzie din plante folosite tradițional pentru urinare, precum păpădia, mesteacănul sau coada-calului. În UE nu au mențiuni de sănătate autorizate, iar retenția de apă care nu trece se discută cu medicul.',
  keyword: 'ceai diuretic',
  imageAlt: 'Flacon de capsule din sticlă maro, înconjurat de frunze de mesteacăn, păpădie și alte plante uscate, pe fundal alb',
};
fs.writeFileSync(path.join(dir, `${HANDLE}.meta.json`), JSON.stringify(meta, null, 1));

const FORBIDDEN = ['vindec', 'tratează', 'previne boala', 'detox', 'arde grăsim', 'garantat', 'slăb', 'diabet', 'ficat', 'hepat', 'fără gluten', '<h1', '<script', 'energie', 'sursă de', 'target="_blank"', 'contribuie la', 'stomacul gol'];
const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
console.log('cuvinte', text.trim().split(' ').length, '| PubMed', new Set(html.match(/pubmed\.ncbi\.nlm\.nih\.gov\/\d+/g)).size);
console.log('de verificat:', FORBIDDEN.filter(w => html.toLowerCase().includes(w)).join(', ') || '-');
console.log('title', meta.title.length, '| seoTitle', meta.seoTitle.length, '| seoDesc', meta.seoDesc.length, '| ghilimele duble:', /"/.test(meta.title + meta.seoTitle + meta.seoDesc + meta.summary));
