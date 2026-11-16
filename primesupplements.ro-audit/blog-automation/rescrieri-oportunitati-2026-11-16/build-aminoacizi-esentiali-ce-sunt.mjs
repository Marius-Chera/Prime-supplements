// Rescriere 16.11.2026: aminoacizi-esentiali-ce-sunt (blog news), după GHID-REDACTIONAL.md §2b, 2c, 3, 4, 5, 6b.
// Aceleași blocuri HTML ca în rescrieri-pubmed-2026-11-13/build.mjs. Nu publică nimic.
// Fapte de produs: metafield-urile produsului eaa-aminoacizi-esentiali (ACTIVE), citite prin Admin API pe 16.11.2026.
// Studii: PMID-uri verificate pe 16.11.2026 cu eutils (esummary + efetch); 28852372 era deja în SURSE-PUBMED.md.
// Folosire: node build-aminoacizi-esentiali-ce-sunt.mjs → scrie aminoacizi-esentiali-ce-sunt.html și .meta.json
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
  { handle: 'leucina-aminoacidul-cheie-muschi', title: 'Leucina: ce este, unde se găsește și cum o iei', img: A + 'blog-leucina-aminoacidul-cheie-muschi.jpg?v=1792728425', summary: 'Ce este leucina, în ce alimente o găsești și cât are o porție de EAA Prime.' },
  { handle: 'eaa-vegetarieni-completezi-aminoacizii', title: 'EAA pentru vegetarieni: cum completezi aminoacizii', img: A + 'blog-eaa-vegetarieni-completezi-aminoacizii-din-sedinta-foto-sala-eaa-1.jpg?v=1794571429', summary: 'Cum acoperi aminoacizii esențiali dintr-o dietă vegetariană și ce lipsește des din farfurie.' },
  { handle: 'aminoacizi-esentiali-dozaj', title: 'Aminoacizi esențiali: dozaj și când se iau suplimentele EAA', img: A + 'blog-aminoacizi-suplimente-eaa-aminoacizi-esentiali-supplements-for-1780734717555.png?v=1780821009', summary: 'Câte porții de EAA scrie pe etichetă și în ce moment al zilei le iei.' },
];
const SRC = [
  { cite: 'Joint WHO/FAO/UNU Expert Consultation. Protein and amino acid requirements in human nutrition. World Health Organ Tech Rep Ser. 2007;(935):1-265.', pmid: '18330140' },
  { cite: 'Wolfe RR. Branched-chain amino acids and muscle protein synthesis in humans: myth or reality? J Int Soc Sports Nutr. 2017;14:30.', pmid: '28852372', doi: '10.1186/s12970-017-0184-9' },
  { cite: 'Moberg M și colab. Activation of mTORC1 by leucine is potentiated by branched-chain amino acids and even more so by essential amino acids following resistance exercise. Am J Physiol Cell Physiol. 2016;310(11):C874-84.', pmid: '27053525', doi: '10.1152/ajpcell.00374.2015' },
  { cite: 'Tipton KD și colab. Postexercise net protein synthesis in human muscle from orally administered amino acids. Am J Physiol. 1999;276(4):E628-34.', pmid: '10198297', doi: '10.1152/ajpendo.1999.276.4.E628' },
  { cite: 'Churchward-Venne TA și colab. Supplementation of a suboptimal protein dose with leucine or essential amino acids: effects on myofibrillar protein synthesis at rest and following resistance exercise in men. J Physiol. 2012;590(11):2751-65.', pmid: '22451437', doi: '10.1113/jphysiol.2012.228833' },
  { cite: 'Regulamentul (UE) nr. 432/2012 al Comisiei – lista mențiunilor de sănătate permise pentru alimente.', url: 'https://eur-lex.europa.eu/eli/reg/2012/432/oj', label: 'EUR-Lex' },
];

const META = {
  handle: 'aminoacizi-esentiali-ce-sunt',
  id: 'gid://shopify/Article/1023859458423',
  title: 'Aminoacizi esențiali (EAA): ce sunt, lista celor 9 și alimente',
  seoTitle: 'Aminoacizi esențiali (EAA): ce sunt, lista și alimente',
  seoDesc: 'Aminoacizii esențiali (EAA) sunt cei 9 pe care corpul nu îi produce. Vezi lista, alimentele, diferența față de BCAA și ce are o porție de EAA.',
  summary: 'Aminoacizii esențiali (EAA) sunt cei nouă aminoacizi pe care corpul nu îi poate produce: histidina, izoleucina, leucina, lizina, metionina, fenilalanina, treonina, triptofanul și valina. Îi iei din alimentele cu proteine; un supliment EAA îi aduce în formă liberă.',
  keyword: 'aminoacizi esențiali',
  imageAlt: 'Aminoacizi esențiali (EAA): recipient alb cu eticheta EAA lângă flacoane și capsule, pe fundal gri',
};

const SHORT = [
  'Aminoacizii esențiali (EAA) sunt 9 aminoacizi pe care corpul nu îi poate produce, deci îi iei din mâncare.',
  'BCAA sunt doar 3 dintre ei: leucina, izoleucina și valina.',
  'O porție de 6 g de EAA Prime are 5350 mg din 8 aminoacizi esențiali, dintre care 1070 mg L-leucină; histidina nu e în formulă.',
  'În UE nu există nicio mențiune de sănătate autorizată pentru EAA sau BCAA.',
];

const BODY = `<p><strong>Aminoacizii esențiali (EAA, de la „essential amino acids”) sunt cei nouă aminoacizi pe care corpul nu îi poate produce singur și pe care îi iei din alimentație: histidina, izoleucina, leucina, lizina, metionina, fenilalanina, treonina, triptofanul și valina.</strong> Se numesc „esențiali” pentru că trebuie să vină din mâncare, nu pentru că ar fi mai importanți decât ceilalți. Îi găsești în orice aliment bogat în proteine.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#ce-sunt">Ce sunt aminoacizii esențiali și de ce se numesc „esențiali”</a></li>
  <li><a href="#lista">Lista celor 9 aminoacizi esențiali și alimentele care îi conțin</a></li>
  <li><a href="#eaa-vs-bcaa">EAA vs BCAA: ce diferă și ce au comparat cercetătorii</a></li>
  <li><a href="#portie-eaa">Ce conține o porție de EAA aminoacizi esențiali Prime</a></li>
  <li><a href="#cum-folosesti">Cum folosești EAA și cui nu i se potrivește</a></li>
  <li><a href="#legislatie">Ce spune legislația UE despre aminoacizii esențiali</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="ce-sunt">Ce sunt aminoacizii esențiali și de ce se numesc „esențiali”</h2>
<p>Aminoacizii sunt piesele din care sunt construite proteinele, atât cele din mâncare, cât și cele din corp. Proteinele folosesc 20 de aminoacizi: 11 pot fi produși de organism (de exemplu glutamina sau glicina), iar 9 nu.</p>
<p>Necesarul de proteine și de aminoacizi esențiali pentru toate vârstele, inclusiv în sarcină și alăptare, este stabilit în raportul experților OMS, FAO și UNU din 2007, folosit ca referință pentru ghidurile de nutriție și pentru evaluarea calității proteinelor (${pubmed('18330140', 'WHO/FAO/UNU, 2007')}).</p>
<p>Un adult care mănâncă variat și suficiente proteine își ia aminoacizii esențiali din mese. Cât de multe proteine îți trebuie am calculat în ghidul <a href="/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv">Câtă proteină pe zi: calcul pe greutate și obiectiv</a>.</p>

<h2 id="lista">Lista celor 9 aminoacizi esențiali și alimentele care îi conțin</h2>
<p>Toți cei nouă aminoacizi esențiali se găsesc în proteinele complete: carne, pește, ouă, lactate și soia. Tabelul arată alimentele obișnuite care îi conțin și cât din fiecare are o porție de 6 g de EAA Prime, conform etichetei.</p>
${table(['Aminoacid esențial', 'Alimente care îl conțin', 'Într-o porție EAA Prime (6 g)'], [
  ['Leucină', 'lactate, proteină din zer, carne, ouă, soia', '1070 mg L-leucină'],
  ['Valină', 'lactate, carne, pește, ouă', '856 mg L-valină'],
  ['Izoleucină', 'carne, pește, ouă, lactate, soia', '803 mg L-izoleucină'],
  ['Lizină', 'carne, pește, ouă, lactate, leguminoase', '749 mg L-lizină HCl'],
  ['Fenilalanină', 'carne, lactate, ouă, soia', '700 mg L-fenilalanină'],
  ['Treonină', 'carne, pește, ouă, lactate, linte', '589 mg L-treonină'],
  ['Metionină', 'ouă, pește, carne, lactate', '375 mg L-metionină'],
  ['Triptofan', 'lapte, ouă, carne de pasăre, semințe', '214 mg L-triptofan'],
  ['Histidină', 'carne, pește, ouă, lactate', 'nu este în formulă'],
])}
<p>Proteinele din plante pot avea mai puțin din unul dintre ei: cerealele au de obicei mai puțină lizină, iar leguminoasele mai puțină metionină. De aceea, cine nu mănâncă carne combină sursele pe parcursul zilei; am explicat cum în <a href="/blogs/news/eaa-vegetarieni-completezi-aminoacizii">EAA pentru vegetarieni: cum completezi aminoacizii</a>.</p>

${productBox({ handle: 'eaa-aminoacizi-esentiali', img: EAA_IMG, title: 'Aminoacizi esențiali EAA – tub de 500 g', line: 'Pudră cu 8 aminoacizi esențiali: 5350 mg pe porția de 6 g (2 măsuri), dintre care 1070 mg L-leucină. Tub de 500 g cu 83 de porții, 4 arome. Nota 5 din 5, din 7 recenzii.', cta: 'Vezi produsul' })}

<h2 id="eaa-vs-bcaa">EAA vs BCAA: ce diferă și ce au comparat cercetătorii</h2>
<p>BCAA (aminoacizii cu catenă ramificată) sunt trei dintre cei nouă aminoacizi esențiali: leucina, izoleucina și valina. Un supliment EAA îi conține pe acești trei plus alți aminoacizi esențiali, deci BCAA sunt o parte din EAA. La sportivii cu care lucrăm vedem des confuzia dintre cele două.</p>
<p>O recenzie din 2017 a căutat studii pe oameni în care BCAA luați singuri, pe cale orală, să fi crescut sinteza proteinelor din mușchi și nu a găsit niciunul. Motivul: o proteină nouă are nevoie de toți aminoacizii esențiali, nu doar de trei; autorul declară interese în firme care fac amestecuri de aminoacizi (${pubmed('28852372', 'Wolfe, 2017')}).</p>
<p>Un studiu suedez a comparat la 8 sportivi antrenați placebo, leucină, BCAA și EAA, luate în timpul unui antrenament de forță. La 90 de minute, un semnal celular legat de sinteza proteinelor (enzima S6K1) a crescut cel mai mult cu EAA, de nouă ori față de repaus; la 180 de minute, diferența dintre EAA și BCAA dispăruse (${pubmed('27053525', 'Moberg și colab., 2016')}). Autorii notează că efectul pare să vină mai ales din BCAA; studiul e mic și a măsurat doar semnale din biopsii.</p>
<p>Un studiu mai vechi, pe 6 voluntari (3 bărbați și 3 femei), a dat după antrenament 40 g de aminoacizi esențiali, 40 g de aminoacizi amestecați sau placebo. Bilanțul proteic din mușchi a fost asemănător cu EAA și cu amestecul, deci aminoacizii neesențiali nu par necesari într-o astfel de formulă (${pubmed('10198297', 'Tipton și colab., 1999')}). Doza testată, 40 g, este de peste 7 ori mai mare decât cei 5350 mg dintr-o porție.</p>
<p>Alt studiu, pe 24 de bărbați, a comparat 25 g de proteină din zer cu 6,25 g de zer completat fie cu leucină, fie cu ceilalți aminoacizi esențiali. În primele 1–3 ore toate variantele au crescut la fel sinteza proteinelor din mușchi, dar la 3–5 ore după efort doar proteina din zer a menținut-o crescută; autorii consideră proteina completă cea mai potrivită după efort (${pubmed('22451437', 'Churchward-Venne și colab., 2012')}).</p>
<p>Concluzia practică pe care o dăm sportivilor: întâi totalul de proteine din mese și, dacă e nevoie, o proteină din zer precum <a href="/products/prime-whey-2000g">Prime Whey</a>. EAA rămâne o opțiune pentru cine preferă o băutură aromată cu 21,4 kcal pe porție, între mese sau la antrenament.</p>

<h2 id="portie-eaa">Ce conține o porție de EAA aminoacizi esențiali Prime</h2>
<p>O porție de <a href="${P}">EAA aminoacizi esențiali</a> de la Prime Supplements are 6 g (2 măsuri) și conține 5350 mg din 8 aminoacizi esențiali, conform tabelului nutrițional de pe tub. </p>
<ul>
  <li><strong>Cei 3 BCAA:</strong> 1070 mg L-leucină, 856 mg L-valină și 803 mg L-izoleucină, adică 2729 mg, aproximativ jumătate din amestec.</li>
  <li><strong>Ceilalți 5:</strong> 749 mg L-lizină HCl, 700 mg L-fenilalanină, 589 mg L-treonină, 375 mg L-metionină și 214 mg L-triptofan.</li>
  <li><strong>Histidina</strong>, al nouălea aminoacid esențial, nu face parte din formulă.</li>
  <li><strong>Valori nutriționale:</strong> 21,4 kcal, 5,4 g proteine (ca aminoacizi liberi) și 0,00 g carbohidrați, din care 0,00 g zaharuri.</li>
</ul>
<p>Aminoacizii din tub sunt liberi, adică nelegați în proteine; de aceea eticheta îi trece la „proteine (ca aminoacizi liberi)”. Leucina, valina și izoleucina au gust amar, de aceea pudra e aromată și îndulcită cu sucraloză și acesulfam de potasiu, în 4 arome: Peach Ice Tea, Blueberry, Strawberry &amp; Kiwi și Tropical.</p>

<h2 id="cum-folosesti">Cum folosești EAA și cui nu i se potrivește</h2>
<p>Eticheta indică 2 măsuri (aproximativ 6 g) amestecate cu cantitatea dorită de apă, de 1–3 ori pe zi, între mese, cu 30–45 de minute înainte de antrenament sau imediat după. Tubul de 500 g are 83 de porții: la o porție pe zi ține 83 de zile, iar la două porții pe zi aproximativ 41 de zile (calcul aproximativ).</p>
<p>Câte porții alegi și în ce moment al zilei am detaliat în ghidul separat <a href="/blogs/news/aminoacizi-esentiali-dozaj">Aminoacizi esențiali: dozaj și când se iau suplimentele EAA</a>. Pentru post intermitent: <a href="/blogs/news/eaa-post-intermitent-rupe-postul-nu">EAA în post intermitent: rupe postul sau nu?</a></p>
<ul>
  <li>Nu se administrează copiilor și femeilor în perioada de sarcină sau alăptare (atenționarea de pe etichetă).</li>
  <li>Conține fenilalanină, important pentru cine trebuie să o evite.</li>
  <li>Poate conține urme de lapte, ou, soia și gluten.</li>
  <li>Dacă ai o afecțiune sau urmezi un tratament, discută întâi cu medicul.</li>
</ul>

<h2 id="legislatie">Ce spune legislația UE despre aminoacizii esențiali</h2>
<p><strong>În Uniunea Europeană nu există nicio mențiune de sănătate autorizată pentru aminoacizii esențiali (EAA) sau pentru BCAA</strong> (${REG}). De aceea nu promitem niciun efect al produsului și îți dăm doar ce scrie pe etichetă.</p>
<p>Regulamentul are mențiuni pentru proteine, dar ele privesc proteinele, nu un amestec de aminoacizi esențiali, și nu le folosim pentru EAA. Lucrările citate mai sus au măsurat semnale și bilanțuri proteice pe termen scurt, în laborator, adesea cu doze mai mari decât o porție; nu dovedesc un efect al unui produs anume.</p>

${productBox({ handle: 'eaa-aminoacizi-esentiali', img: EAA_IMG, title: 'Aminoacizi esențiali EAA – tub de 500 g', line: '2 măsuri (6 g) în apă, de 1–3 ori pe zi, conform etichetei. Livrare gratuită la comenzi peste 300 de lei.', cta: 'Comandă EAA' })}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Care sunt cei 9 aminoacizi esențiali?</h3>
<p>Histidina, izoleucina, leucina, lizina, metionina, fenilalanina, treonina, triptofanul și valina. Corpul nu îi poate produce, deci îi iei din alimentele cu proteine.</p>
<h3>Care e diferența dintre EAA și BCAA?</h3>
<p>BCAA înseamnă doar 3 aminoacizi esențiali: leucina, izoleucina și valina. EAA îi include pe aceștia și pe ceilalți aminoacizi esențiali; EAA Prime are 8, fără histidină.</p>
<h3>Pot lua EAA în loc de proteine?</h3>
<p>Nu, un supliment EAA nu înlocuiește mesele. O porție are 5,4 g de proteine (ca aminoacizi liberi), mult sub o masă cu carne, ouă sau lactate. Prioritatea rămâne totalul de proteine din zi.</p>
<h3>Câte porții de EAA pe zi scrie pe etichetă?</h3>
<p>Între 1 și 3 porții pe zi, fiecare de 2 măsuri (aproximativ 6 g) în apă. Nu depăși doza zilnică recomandată.</p>
<h3>EAA Prime conține histidină?</h3>
<p>Nu. Formula are 8 aminoacizi esențiali; histidina nu este pe etichetă. O iei din alimentele cu proteine: carne, pește, ouă, lactate.</p>

<p>Mai mulți aminoacizi găsești în colecția <a href="/collections/aminoacizi">Aminoacizi</a>.</p>`;

const html = [shortBox(SHORT), BODY, sources(SRC), DISCLAIMER, AUTHOR, related(REL)].join('\n\n');
fs.writeFileSync(path.join(dir, `${META.handle}.html`), html);
fs.writeFileSync(path.join(dir, `${META.handle}.meta.json`), JSON.stringify(META, null, 1));

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const watch = ['refacere', 'recuperare', 'masă musculară', 'masa musculara', 'energie', 'ficat', 'beneficii', 'rezultat', 'face efect', 'sursă de', 'contribuie la', 'ş', 'ţ'];
console.log(`cuvinte ${text.split(' ').length}; title ${META.title.length}; seoTitle ${META.seoTitle.length}; seoDesc ${META.seoDesc.length}; pubmed ${new Set(html.match(/pubmed\.ncbi\.nlm\.nih\.gov\/\d+/g)).size}`);
console.log('de verificat:', watch.filter(w => text.toLowerCase().includes(w)).join(', ') || '-');
