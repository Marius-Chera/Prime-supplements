// Rescriere 16.11.2026: aminoacizi-esentiali-dozaj (blog news), varianta (b) aprobată de Marius: strict „când se iau EAA”.
// După GHID-REDACTIONAL.md §2b, 2c, 3, 4, 5, 6b; blocuri HTML identice cu build-aminoacizi-esentiali-ce-sunt.mjs. Nu publică nimic.
// Fapte de produs: descrierea + metafield-urile produsului eaa-aminoacizi-esentiali (ACTIVE), citite prin Admin API pe 16.11.2026.
// Studii: 27053525 și 28642676 din SURSE-PUBMED.md; 11440894, 18535123, 10658002 verificate pe 16.11.2026 cu eutils (esummary/esearch + efetch).
// Folosire: node build-eaa-cand.mjs → scrie aminoacizi-esentiali-dozaj.html și .meta.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
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

// ── Date verificate ──
const P = '/products/eaa-aminoacizi-esentiali';
const EAA_IMG = 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_PRIME_EAA_Blueberry_500g_front_69ace7f5-a663-4032-97c8-c94138efaa5a.jpg?v=1794828862';
const A = 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/';
const REL = [
  { handle: 'aminoacizi-esentiali-ce-sunt', title: 'Aminoacizi esențiali (EAA): ce sunt, lista celor 9 și alimente', img: A + 'blog-aminoacizi-eaa-aminoacizi-esentiali-how-to-1778477544241.png?v=1792128221', summary: 'Care sunt cei 9 aminoacizi esențiali, în ce alimente îi găsești și ce diferă față de BCAA.' },
  { handle: 'eaa-post-intermitent-rupe-postul-nu', title: 'EAA în post intermitent: rupe postul sau nu?', img: A + 'blog-eaa-post-intermitent-rupe-postul-nu.jpg?v=1792059819', summary: 'Câte calorii are o porție de EAA și ce înseamnă asta pentru fereastra de post.' },
  { handle: 'leucina-aminoacidul-cheie-muschi', title: 'Leucina: ce este, unde se găsește și cum o iei', img: A + 'blog-leucina-aminoacidul-cheie-muschi.jpg?v=1792728425', summary: 'Ce este leucina, în ce alimente o găsești și cât are o porție de EAA Prime.' },
];
const SRC = [
  { cite: 'Tipton KD și colab. Timing of amino acid-carbohydrate ingestion alters anabolic response of muscle to resistance exercise. Am J Physiol Endocrinol Metab. 2001;281(2):E197-206.', pmid: '11440894', doi: '10.1152/ajpendo.2001.281.2.E197' },
  { cite: 'Fujita S și colab. Essential amino acid and carbohydrate ingestion before resistance exercise does not enhance postexercise muscle protein synthesis. J Appl Physiol. 2009;106(5):1730-9.', pmid: '18535123', doi: '10.1152/japplphysiol.90395.2008' },
  { cite: 'Rasmussen BB și colab. An oral essential amino acid-carbohydrate supplement enhances muscle protein anabolism after resistance exercise. J Appl Physiol. 2000;88(2):386-92.', pmid: '10658002', doi: '10.1152/jappl.2000.88.2.386' },
  { cite: 'Moberg M și colab. Activation of mTORC1 by leucine is potentiated by branched-chain amino acids and even more so by essential amino acids following resistance exercise. Am J Physiol Cell Physiol. 2016;310(11):C874-84.', pmid: '27053525', doi: '10.1152/ajpcell.00374.2015' },
  { cite: 'Jäger R și colab. International Society of Sports Nutrition Position Stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20.', pmid: '28642676', doi: '10.1186/s12970-017-0177-8' },
  { cite: 'Regulamentul (UE) nr. 432/2012 al Comisiei – lista mențiunilor de sănătate permise pentru alimente.', url: 'https://eur-lex.europa.eu/eli/reg/2012/432/oj', label: 'EUR-Lex' },
];

const META = {
  handle: 'aminoacizi-esentiali-dozaj',
  id: 'gid://shopify/Article/1024178159991',
  title: 'Când se iau EAA: înainte, în timpul sau după antrenament',
  seoTitle: 'Când se iau EAA: înainte, în timpul sau după antrenament',
  seoDesc: 'Când se iau EAA: ce scrie pe eticheta EAA Prime (între mese, înainte sau după antrenament), ce momente au testat studiile și câte porții iei pe zi.',
  summary: 'Eticheta EAA Prime recomandă 2 măsuri (aproximativ 6 g) în apă, de 1–3 ori pe zi, între mese, cu 30–45 de minute înainte de antrenament sau imediat după. Studiile au testat mai multe momente, pe loturi mici, fără un câștigător clar.',
  keyword: 'când se iau EAA',
  imageAlt: 'Când se iau EAA: tub alb cu eticheta EAA 500g lângă o linguriță cu pudră albă și o crenguță verde, pe o masă de lemn luminată',
};

const SHORT = [
  'Eticheta EAA Prime: 2 măsuri (aproximativ 6 g) în apă, de 1–3 ori pe zi.',
  'Momentele scrise pe etichetă: între mese, cu 30–45 de minute înainte de antrenament sau imediat după.',
  `Două lucrări au comparat înainte și după antrenament, pe 6 și pe 22 de oameni, cu concluzii diferite (${pubmed('11440894', 'Tipton, 2001')}; ${pubmed('18535123', 'Fujita, 2009')}).`,
  'În UE nu există nicio mențiune de sănătate autorizată pentru EAA, deci momentul îl alegi după program și toleranță.',
];

const BODY = `<p><strong>Când se iau EAA? Eticheta EAA aminoacizi esențiali Prime recomandă 2 măsuri (aproximativ 6 g) amestecate cu apă, de 1–3 ori pe zi, între mese, cu 30–45 de minute înainte de antrenament sau imediat după.</strong> Lucrările de laborator au testat aminoacizi esențiali înainte, în timpul și după efort, pe grupuri mici, fără un moment câștigător clar (${pubmed('11440894', 'Tipton și colab., 2001')}; ${pubmed('18535123', 'Fujita și colab., 2009')}).</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#eticheta">Când se iau EAA, conform etichetei</a></li>
  <li><a href="#tabel">Momentul, eticheta și studiile, pe scurt</a></li>
  <li><a href="#inainte">EAA înainte de antrenament: ce au comparat studiile</a></li>
  <li><a href="#in-timpul">EAA în timpul antrenamentului</a></li>
  <li><a href="#dupa">EAA după antrenament și între mese</a></li>
  <li><a href="#cum-folosesti">Cum folosești EAA aminoacizi esențiali Prime</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="eticheta">Când se iau EAA, conform etichetei</h2>
<p>EAA se iau între mese, cu 30–45 de minute înainte de antrenament sau imediat după, în total 1–3 porții pe zi, conform etichetei.</p>
<p>EAA (aminoacizii esențiali) sunt cei nouă aminoacizi pe care corpul nu îi poate produce. Ce sunt, lista lor și alimentele care îi conțin am explicat separat în <a href="/blogs/news/aminoacizi-esentiali-ce-sunt">Aminoacizi esențiali (EAA): ce sunt, lista celor 9 și alimente</a>; aici vorbim doar despre moment.</p>
<p>O porție de <a href="${P}">EAA aminoacizi esențiali</a> conține 5350 mg din 8 aminoacizi esențiali, dintre care 1070 mg L-leucină, și are 21,4 kcal, conform etichetei. Ora din zi nu e precizată, deci depinde de când te antrenezi și de când mănânci.</p>

<h2 id="tabel">Momentul, eticheta și studiile, pe scurt</h2>
<p>Tabelul pune alături fiecare moment, ce spune eticheta și ce au testat lucrările citate. Ele au folosit adesea aminoacizi esențiali cu zahăr, deci nu sunt identice cu o porție de EAA în apă.</p>
${table(['Momentul', 'Ce scrie pe etichetă', 'Ce au testat studiile'], [
  ['Cu 30–45 de minute înainte de antrenament', 'Da, este unul dintre momentele recomandate', `Imediat înainte vs imediat după: bilanț proteic mai mare înainte, 6 oameni (${pubmed('11440894', 'Tipton, 2001')}); cu 1 oră înainte: nicio diferență după efort față de post, 22 de oameni (${pubmed('18535123', 'Fujita, 2009')})`],
  ['În timpul antrenamentului', 'Nu este numit pe etichetă', `Băutură cu EAA pe durata unui antrenament de forță, 8 sportivi, doar semnale celulare (${pubmed('27053525', 'Moberg, 2016')})`],
  ['Imediat după antrenament', 'Da, este unul dintre momentele recomandate', `6 g EAA cu 35 g zahăr la 1 oră și la 3 ore după efort: răspuns asemănător, 6 oameni (${pubmed('10658002', 'Rasmussen, 2000')})`],
  ['Între mese', 'Da, este unul dintre momentele recomandate', `Poziția ISSN: porții de proteine la 3–4 ore, momentul față de antrenament ține de toleranța fiecăruia (${pubmed('28642676', 'Jäger, 2017')})`],
  ['Dimineața sau seara', 'Eticheta nu precizează ora din zi', 'Studiile citate nu au comparat ore ale zilei'],
])}

${productBox({ handle: 'eaa-aminoacizi-esentiali', img: EAA_IMG, title: 'Aminoacizi esențiali EAA – tub de 500 g', line: 'Pudră cu 8 aminoacizi esențiali: 5350 mg pe porția de 6 g (2 măsuri), dintre care 1070 mg L-leucină. Tub de 500 g cu 83 de porții, 4 arome. Nota 5 din 5, din 7 recenzii.', cta: 'Vezi produsul' })}

<h2 id="inainte">EAA înainte de antrenament: ce au comparat studiile</h2>
<p>Înainte de antrenament este un moment trecut pe etichetă, iar lucrările care l-au comparat cu „după” nu au ajuns la aceeași concluzie.</p>
<p>Într-un studiu din 2001, 6 voluntari au băut o soluție cu aminoacizi esențiali și carbohidrați fie imediat înainte de un antrenament de forță, fie imediat după. Preluarea de fenilalanină în picior a fost mai mare când băutura a fost luată înainte: 209 mg față de 81 mg (${pubmed('11440894', 'Tipton și colab., 2001')}). Lotul a fost foarte mic, iar băutura avea și carbohidrați.</p>
<p>Un studiu din 2009, pe 22 de tineri, a dat aceeași combinație cu o oră înainte de efort și a comparat-o cu un grup care nu a mâncat nimic. La 2 ore după antrenament, sinteza proteinelor din mușchi crescuse cu aproximativ 50% în ambele grupuri, fără diferență între ele (${pubmed('18535123', 'Fujita și colab., 2009')}). Autorii au concluzionat că băutura luată înainte nu a adus un plus față de antrenamentul pe stomacul gol.</p>
<p>Ambele lucrări au măsurat răspunsuri pe câteva ore, în laborator, nu efecte pe termen lung. Fereastra de 30–45 de minute de pe etichetă se potrivește celor care beau porția pe drum spre sală.</p>

<h2 id="in-timpul">EAA în timpul antrenamentului</h2>
<p>Eticheta EAA Prime nu numește momentul „în timpul antrenamentului”; ea vorbește de înainte, imediat după și între mese.</p>
<p>Un studiu suedez a dat la 8 sportivi antrenați placebo, leucină, BCAA sau EAA pe durata unui antrenament de forță și a măsurat semnale celulare legate de sinteza proteinelor, din biopsii (${pubmed('27053525', 'Moberg și colab., 2016')}). Ce a găsit, comparat cu BCAA, am detaliat în <a href="/blogs/news/aminoacizi-esentiali-ce-sunt">articolul despre ce sunt aminoacizii esențiali</a>. Studiul e mic și nu a comparat momentul „în timpul” cu „înainte” sau „după”.</p>
<p>La sportivii cu care lucrăm vedem des porția pusă în bidon și băută pe parcursul antrenamentului. Dacă o folosești așa, rămâi în limita de 1–3 porții pe zi și nu depăși doza zilnică recomandată.</p>

<h2 id="dupa">EAA după antrenament și între mese</h2>
<p>Imediat după antrenament și între mese sunt celelalte două momente trecute pe eticheta EAA Prime. Pentru „după”, intervalul nu pare foarte strict în lucrarea de mai jos.</p>
<p>Într-un studiu din 2000, 3 bărbați și 3 femei au băut 6 g de aminoacizi esențiali cu 35 g de zaharoză la 1 oră sau la 3 ore după un antrenament de forță. Bilanțul proteic din mușchi a crescut față de placebo în ambele variante, cu un răspuns asemănător la 1 și la 3 ore (${pubmed('10658002', 'Rasmussen și colab., 2000')}). Cantitatea de aminoacizi este apropiată de o porție de 6 g, dar băutura avea și zahăr, iar lotul a fost de doar 6 oameni.</p>
<p>Poziția Societății Internaționale de Nutriție Sportivă (ISSN) despre proteine spune că momentul optim față de antrenament ține probabil de toleranța fiecăruia, recomandă porții de proteine împărțite la 3–4 ore și pune pe primul loc alimentele care conțin toți aminoacizii esențiali (${pubmed('28642676', 'Jäger și colab., 2017')}). Poziția privește proteinele în general, nu un produs EAA anume.</p>
<p>Recomandăm întâi totalul de proteine din mese. Câte îți trebuie am calculat în <a href="/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv">Câtă proteină pe zi: calcul pe greutate și obiectiv</a>; o porție de EAA între mese este o băutură aromată care nu înlocuiește masa.</p>

<h2 id="cum-folosesti">Cum folosești EAA aminoacizi esențiali Prime</h2>
<p>Amesteci 2 măsuri (aproximativ 6 g) cu cantitatea dorită de apă și bei porția între mese, cu 30–45 de minute înainte de antrenament sau imediat după, de 1–3 ori pe zi. Așa scrie pe etichetă.</p>
<ul>
  <li><strong>O porție pe zi:</strong> o alegi în momentul care îți convine, de exemplu pe drum spre sală. Tubul de 500 g are 83 de porții, deci ține 83 de zile.</li>
  <li><strong>Două porții pe zi:</strong> de exemplu una înainte și una după antrenament; tubul ține aproximativ 41 de zile (calcul aproximativ).</li>
  <li><strong>Trei porții pe zi:</strong> maximul de pe etichetă; tubul ține aproximativ 27 de zile (calcul aproximativ).</li>
  <li><strong>Cu ce o combini:</strong> eticheta indică apă. O proteină din zer precum <a href="/products/prime-whey-2000g">Prime Whey</a> rămâne varianta pentru o porție mai mare de proteine.</li>
  <li><strong>Gust:</strong> 4 arome, îndulcite cu sucraloză și acesulfam de potasiu.</li>
</ul>
<p>Dacă ții post intermitent, ia în calcul cele 21,4 kcal ale unei porții; am explicat în <a href="/blogs/news/eaa-post-intermitent-rupe-postul-nu">EAA în post intermitent: rupe postul sau nu?</a></p>
<p>Cui nu i se potrivește: eticheta spune că nu se administrează copiilor și femeilor în perioada de sarcină sau alăptare. Produsul conține fenilalanină și poate conține urme de lapte, ou, soia și gluten. Dacă ai o afecțiune sau urmezi un tratament, discută întâi cu medicul.</p>
<p><strong>În Uniunea Europeană nu există nicio mențiune de sănătate autorizată pentru aminoacizii esențiali (EAA)</strong> (${REG}). De aceea nu legăm niciun moment de un efect: îți spunem doar ce scrie pe etichetă și ce au măsurat lucrările citate, pe termen scurt, în laborator.</p>

${productBox({ handle: 'eaa-aminoacizi-esentiali', img: EAA_IMG, title: 'Aminoacizi esențiali EAA – tub de 500 g', line: '2 măsuri (6 g) în apă, între mese, înainte sau după antrenament, de 1–3 ori pe zi, conform etichetei. Livrare gratuită la comenzi peste 300 de lei.', cta: 'Comandă EAA' })}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Când se iau EAA, înainte sau după antrenament?</h3>
<p>Ambele variante sunt pe etichetă: cu 30–45 de minute înainte de antrenament sau imediat după. Lucrările care au comparat cele două momente, pe grupuri mici, nu au ajuns la aceeași concluzie (${pubmed('11440894', 'Tipton, 2001')}; ${pubmed('18535123', 'Fujita, 2009')}).</p>
<h3>Se pot lua EAA în timpul antrenamentului?</h3>
<p>Eticheta EAA Prime nu numește acest moment. Dacă bei porția din bidon pe durata antrenamentului, rămâi în limita de 1–3 porții pe zi.</p>
<h3>Când se iau aminoacizii în zilele fără antrenament?</h3>
<p>Între mese, momentul trecut pe etichetă pentru orice zi. Prioritatea rămâne totalul de proteine din mesele zilei.</p>
<h3>Se pot lua EAA dimineața, pe stomacul gol?</h3>
<p>Eticheta nu precizează ora din zi, ci recomandă porția între mese. Dacă te antrenezi dimineața, o poți bea cu 30–45 de minute înainte; o porție are 21,4 kcal.</p>
<h3>Câte porții de EAA pe zi?</h3>
<p>Între 1 și 3 porții pe zi, fiecare de 2 măsuri (aproximativ 6 g) în apă. Nu depăși doza zilnică recomandată.</p>

<p>Mai mulți aminoacizi găsești în colecția <a href="/collections/aminoacizi">Aminoacizi</a>.</p>`;

const html = [shortBox(SHORT), BODY, sources(SRC), DISCLAIMER, AUTHOR, related(REL)].join('\n\n');
fs.writeFileSync(path.join(dir, `${META.handle}.html`), html);
fs.writeFileSync(path.join(dir, `${META.handle}.meta.json`), JSON.stringify(META, null, 1));

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const FORBIDDEN = ['vindec', 'tratează', 'previne boala', 'detox', 'arde grăsim', 'garantat', 'fără gluten', '<h1', '<script', 'target="_blank"', 'somn', 'stres ', 'refacere', 'recuperare', 'rezultat', 'face efect', 'energie', 'sursă de', 'beneficii', 'masă musculară', 'masa musculara', 'creștere musculară', 'anabolic', 'contribuie la', 'ş', 'ţ'];
console.log(`cuvinte ${text.split(' ').length} · title ${META.title.length} · seoTitle ${META.seoTitle.length} · seoDesc ${META.seoDesc.length} · pubmed ${new Set(html.match(/pubmed\.ncbi\.nlm\.nih\.gov\/\d+/g)).size} · interzise: ${FORBIDDEN.filter(w => (SHORT.join(" ") + BODY).replace(/<[^>]+>/g, " ").toLowerCase().includes(w)).join(',') || '-'}`);
