// Rescrierea articolului vitamina-c-doza-pe-varste (16.11.2026), după GHID-REDACTIONAL.md §2b, 2c, 3, 4, 5, 6b și BRIEF-LOT2.
// Folosire: node build-vitamina-c.mjs → scrie vitamina-c-doza-pe-varste.html și .meta.json lângă acest fișier.
// Fapte de produs: vitamin-c-1000-80-caps (ACTIVE), descriere + metafield-uri custom.ingrediente / custom.detalii_produs citite prin Admin API pe 16.11.2026
//   (1000 mg vitamina C ca acid ascorbic per capsulă = 1250% VNR, VNR 80 mg; o capsulă pe zi, de preferat în timpul mesei; 80 de capsule, 91,2 g;
//    capsulă din gelatină; „supliment alimentar pentru adulți”; consultă medicul în sarcină, alăptare, afecțiuni, tratament). Fără recenzii (metafield reviews absent).
// Mențiuni: textul exact din versiunea consolidată RO a Reg. 432/2012 (CELEX 02012R0432-20210517), citit pe EUR-Lex pe 16.11.2026.
// Valori pe vârste: doar din rezumatul avizului EFSA 2013 (doi:10.2903/j.efsa.2013.3418), citit pe 16.11.2026.
// Studii: Levine 1996, Carr & Vissers 2013, Cook & Reddy 2001 (bibliotecă); Hathcock 2005, Carr & Lykkesfeldt 2021, (noi, verificate cu esummary + efetch azi).
// Imaginea principală rămâne cea actuală.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const pubmed = (pmid, text) => `<a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/" rel="noopener">${text}</a>`;
const REG = '<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>';
const REG1169 = '<a href="https://eur-lex.europa.eu/eli/reg/2011/1169/oj" rel="noopener">Regulamentul (UE) nr. 1169/2011</a>';
const EFSA = '<a href="https://doi.org/10.2903/j.efsa.2013.3418" rel="noopener">avizul EFSA din 2013 privind valorile de referință pentru vitamina C</a>';

const P = {
  handle: 'vitamin-c-1000-80-caps',
  title: 'Vitamina C 1000 mg – 80 de capsule',
  img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_VITAMINC_80caps_front.jpg?v=1794828862',
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
    <li style="margin-bottom: 8px;">Valoarea de pe etichete (VNR) pentru vitamina C este de 80 mg pe zi și e gândită pentru adulți.</li>
    <li style="margin-bottom: 8px;">EFSA propune 95 mg pe zi pentru femei și 110 mg pentru bărbați; la copii valorile sunt mai mici, în sarcină și alăptare mai mari.</li>
    <li style="margin-bottom: 8px;">Limita de 2000 mg pe zi des citată este cea stabilită în SUA.</li>
    <li style="margin-bottom: 8px;">O capsulă de Vitamina C 1000 Prime are 1000 mg (1250% VNR); eticheta spune o capsulă pe zi, la masă, pentru adulți.</li>
  </ul>
</div>`;

const BODY = `<p><strong>Doza zilnică de vitamina C de referință de pe etichete este de 80 mg pentru un adult (VNR), iar EFSA propune 95 mg pe zi pentru femei și 110 mg pentru bărbați.</strong> Vitamina C (acidul ascorbic) este o vitamină solubilă în apă, pe care organismul nu o produce, deci o iei din alimente sau din suplimente. La copii, în sarcină și în alăptare valorile diferă, iar doza o stabilește medicul.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#vnr">Doza zilnică de vitamina C: VNR de 80 mg</a></li>
  <li><a href="#pe-varste">Doza zilnică de vitamina C pe vârste</a></li>
  <li><a href="#doza-maxima">Doza maximă de vitamina C și efectele digestive</a></li>
  <li><a href="#mentiuni">Ce rol are vitamina C: mențiunile autorizate în UE</a></li>
  <li><a href="#cum-o-iei">Cum iei Vitamina C 1000 Prime</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="vnr">Doza zilnică de vitamina C: VNR de 80 mg</h2>
<p>Pe orice etichetă din UE, procentul „% VNR” la vitamina C se calculează față de 80 mg pe zi, valoarea nutrițională de referință pentru adulți din anexa XIII a ${REG1169}. VNR este un reper unic pentru etichetare, nu o doză personalizată.</p>
<p>Ca să poată purta mențiunile de sănătate, un supliment trebuie să aducă cel puțin 15% din VNR pe doza zilnică, adică 12 mg de vitamina C.</p>
${table(['Reper', 'Vitamina C pe zi', 'Ce înseamnă'], [
  ['VNR pentru adulți (Reg. 1169/2011)', '80 mg', 'valoarea de pe etichete, 100% VNR'],
  ['Pragul pentru mențiunile de sănătate', '12 mg', '15% din VNR pe doza zilnică'],
  ['Mențiunea pentru efort fizic intens (Reg. 432/2012)', '200 mg', 'consum zilnic, în plus față de aportul zilnic recomandat'],
  ['O capsulă de Vitamina C 1000 Prime', '1000 mg', '1250% VNR, doza zilnică de pe etichetă, pentru adulți'],
  ['Limita superioară stabilită în SUA', '2000 mg', 'pentru adulți, din toate sursele; nu este o valoare din legislația UE'],
])}

<h2 id="pe-varste">Doza zilnică de vitamina C pe vârste</h2>
<p>Valorile pe vârste nu sunt pe etichetă; ele vin din ${EFSA}, care a stabilit aportul de referință pentru populație (PRI). Tabelul de mai jos preia doar cifrele din rezumatul avizului.</p>
${table(['Grupă', 'Aport de referință EFSA (PRI)', 'Observații'], [
  ['Sugari 7–11 luni', '20 mg/zi', 'valoare păstrată de EFSA din 1993'],
  ['Copii 1–3 ani', '20 mg/zi', 'valorile cresc treptat cu vârsta până la adolescență'],
  ['Adolescenți 15–17 ani', '100 mg/zi (băieți), 90 mg/zi (fete)', 'extrapolate din valorile pentru adulți, după greutate'],
  ['Femei adulte', '95 mg/zi', 'necesar mediu 80 mg/zi'],
  ['Bărbați adulți', '110 mg/zi', 'necesar mediu 90 mg/zi'],
  ['Sarcină', '+10 mg/zi', 'peste valoarea femeilor adulte'],
  ['Alăptare', '+60 mg/zi', 'peste valoarea femeilor adulte'],
])}
<p>În rezumatul EFSA, valorile pentru adulți nu sunt împărțite pe decenii: aceeași cifră se aplică la 25 și la 65 de ani. Dacă iei medicamente, suplimentarea o discuți cu medicul.</p>
<p>O recenzie din 2021 arată că recomandările pentru vitamina C diferă de peste cinci ori între autoritățile lumii; sexul, vârsta, sarcina, alăptarea și fumatul sunt luate în calcul de multe, dar nu de toate (${pubmed('32223303', 'Carr și Lykkesfeldt, 2021')}).</p>

${productBox('1000 mg de vitamina C (acid ascorbic) într-o capsulă, 1250% VNR; o capsulă pe zi, de preferat în timpul mesei. Flaconul de 80 de capsule ajunge pentru 80 de zile.', 'Vezi produsul')}

<h2 id="doza-maxima">Doza maximă de vitamina C și efectele digestive</h2>
<p>Doza maximă de vitamina C de 2000 mg pe zi, pe care o găsești des pe internet, este limita superioară stabilită pentru adulți în SUA de Institute of Medicine. Nu este o valoare din legislația UE; pentru un supliment anume, doza maximă este cea de pe etichetă.</p>
<p>O recenzie a studiilor clinice cu vitamina C a concluzionat că suplimentele de până la 2000 mg pe zi sunt sigure pentru majoritatea adulților, iar singurele efecte nedorite constante au fost disconfortul digestiv ocazional și diareea ușoară, din cauza vitaminei C neabsorbite care atrage apă în intestin (${pubmed('15817846', 'Hathcock și colab., 2005')}). Limita: primul autor lucra pentru o asociație a industriei suplimentelor din SUA.</p>
<p>Un studiu pe 7 voluntari sănătoși, internați 4–6 luni, a testat doze zilnice de la 30 la 2500 mg: saturația completă a plasmei a apărut la 1000 mg pe zi. La doze unice de 500 mg sau mai mult, absorbția a scăzut și surplusul s-a eliminat prin urină, iar la 1000 mg pe zi a crescut eliminarea de oxalat în urină (${pubmed('8623000', 'Levine și colab., 1996')}). Limita: doar 7 persoane; autorii au considerat sigure dozele sub 1000 mg pe zi. Dacă ai avut pietre la rinichi sau o afecțiune renală, discută cu medicul înainte de orice supliment cu vitamina C.</p>

<h2 id="mentiuni">Ce rol are vitamina C: mențiunile autorizate în UE</h2>
<p>Mențiunile pentru vitamina C se pot folosi dacă doza zilnică aduce cel puțin 15% din VNR (12 mg); capsula Prime aduce 1250% VNR. Textul exact din ${REG}:</p>
<ul>
  <li>Vitamina C contribuie la funcționarea normală a sistemului imunitar.</li>
  <li>Vitamina C contribuie la formarea normală a colagenului pentru funcționarea normală a vaselor de sânge.</li>
  <li>Vitamina C contribuie la formarea normală a colagenului pentru funcționarea normală a sistemului osos.</li>
  <li>Vitamina C contribuie la formarea normală a colagenului pentru funcționarea normală a pielii.</li>
  <li>Vitamina C contribuie la metabolismul energetic normal.</li>
  <li>Vitamina C contribuie la protejarea celulelor împotriva stresului oxidativ.</li>
  <li>Vitamina C contribuie la reducerea oboselii și extenuării.</li>
  <li>Vitamina C crește absorbția fierului.</li>
  <li>Vitamina C contribuie la menținerea funcționării normale a sistemului imunitar în timpul exercițiilor fizice intense și după acestea. Efectul benefic se obține în condițiile unui consum zilnic de 200 mg, în plus față de aportul zilnic recomandat de vitamina C.</li>
</ul>
<p>Despre fier: într-un studiu pe 12 persoane, cu dietă completă timp de 5 zile, efectul vitaminei C asupra absorbției fierului din alimente vegetale a fost mult mai mic decât la o singură masă (${pubmed('11124756', 'Cook și Reddy, 2001')}). Detaliile le găsești în <a href="/blogs/news/vitamina-c-fierul-iei-impreuna">ghidul despre vitamina C și fier</a>, iar doza la sportivi în <a href="/blogs/news/vitamina-c-sportivi-doza-ce-spune-ue">articolul despre vitamina C pentru sportivi</a>.</p>

<h2 id="cum-o-iei">Cum iei Vitamina C 1000 Prime</h2>
<p>Vitamina C 1000 Prime se ia câte o capsulă pe zi, de preferat în timpul mesei, fără să depășești această doză. Capsula are 1000 mg de vitamina C sub formă de acid ascorbic, singurul ingredient activ.</p>
<ul>
  <li><strong>Doza:</strong> o capsulă pe zi = 1000 mg de vitamina C (1250% VNR).</li>
  <li><strong>Momentul:</strong> la oricare masă a zilei; contează să o iei în fiecare zi la aceeași oră.</li>
  <li><strong>Cât ține un flacon:</strong> 80 de capsule la o capsulă pe zi = 80 de zile.</li>
  <li><strong>Pentru cine:</strong> adulți; în sarcină, alăptare, afecțiuni sau tratament medicamentos, eticheta cere să consulți medicul.</li>
</ul>
<p>La sportivii cu care lucrăm, prima întrebare e câte porții de fructe și legume au pe zi; capsula vine peste o dietă variată, nu în locul ei. O recenzie nu a găsit diferențe de biodisponibilitate între vitamina C sintetică și cea din alimente (${pubmed('24169506', 'Carr și Vissers, 2013')}); detalii în <a href="/blogs/news/vitamina-c-naturala-sintetica-exista-diferente">articolul despre vitamina C naturală și sintetică</a>.</p>
<p>Alte vitamine și minerale în capsule găsești în colecția <a href="/collections/vitamine-si-minerale">Vitamine și minerale</a>.</p>

${productBox('Acid ascorbic în capsule de gelatină: 1000 mg de vitamina C pe capsulă, o capsulă pe zi, 80 de capsule. Livrare gratuită la comenzile de peste 300 de lei.', 'Comandă Vitamina C 1000')}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Care este doza zilnică de vitamina C pentru un adult?</h3>
<p>Valoarea de referință de pe etichete (VNR) este de 80 mg pe zi. EFSA propune 95 mg pe zi pentru femei și 110 mg pentru bărbați. La Vitamina C 1000 Prime, eticheta indică o capsulă de 1000 mg pe zi, la masă.</p>
<h3>Care este doza maximă de vitamina C pe zi?</h3>
<p>Limita des citată de 2000 mg pe zi pentru adulți este cea stabilită în SUA, nu în legislația UE. Pentru un supliment, doza maximă este cea de pe etichetă: la Vitamina C 1000 Prime, o capsulă pe zi.</p>
<h3>Ce se întâmplă dacă iei prea multă vitamina C?</h3>
<p>Cel mai des apar disconfort digestiv sau diaree ușoară, din cauza vitaminei C neabsorbite (${pubmed('15817846', 'Hathcock și colab., 2005')}). Dacă ai avut pietre la rinichi, discută cu medicul înainte să iei doze mari.</p>
<h3>Câtă vitamina C pe zi pentru copii?</h3>
<p>EFSA propune 20 mg pe zi la 1–3 ani, cu valori care cresc până la 90–100 mg la 15–17 ani. Vitamina C 1000 Prime este pentru adulți; la copii, doza o decide medicul pediatru.</p>
<h3>Se poate lua vitamina C în sarcină?</h3>
<p>Necesarul crește în sarcină cu 10 mg pe zi, iar în alăptare cu 60 mg, conform EFSA. Orice supliment în sarcină sau alăptare îl iei doar după ce discuți cu medicul.</p>`;

const SOURCES = `<h2 id="surse">Surse</h2>
<p>Lucrările de mai jos sunt citate în text; fiecare link duce la rezumatul de pe PubMed (Biblioteca Națională de Medicină a SUA), la avizul EFSA sau la textul oficial al legislației UE.</p>
<ol style="padding-left: 20px; color: #334155;">
  <li style="margin-bottom: 8px;">Levine M și colab. Vitamin C pharmacokinetics in healthy volunteers: evidence for a recommended dietary allowance. Proc Natl Acad Sci U S A. 1996;93(8):3704-9. <a href="https://pubmed.ncbi.nlm.nih.gov/8623000/" rel="noopener">PubMed 8623000</a> · <a href="https://doi.org/10.1073/pnas.93.8.3704" rel="noopener">doi:10.1073/pnas.93.8.3704</a></li>
  <li style="margin-bottom: 8px;">Hathcock JN și colab. Vitamins E and C are safe across a broad range of intakes. Am J Clin Nutr. 2005;81(4):736-45. <a href="https://pubmed.ncbi.nlm.nih.gov/15817846/" rel="noopener">PubMed 15817846</a> · <a href="https://doi.org/10.1093/ajcn/81.4.736" rel="noopener">doi:10.1093/ajcn/81.4.736</a></li>
  <li style="margin-bottom: 8px;">Carr AC, Lykkesfeldt J. Discrepancies in global vitamin C recommendations: a review of RDA criteria and underlying health perspectives. Crit Rev Food Sci Nutr. 2021;61(5):742-755. <a href="https://pubmed.ncbi.nlm.nih.gov/32223303/" rel="noopener">PubMed 32223303</a> · <a href="https://doi.org/10.1080/10408398.2020.1744513" rel="noopener">doi:10.1080/10408398.2020.1744513</a></li>
  <li style="margin-bottom: 8px;">Cook JD, Reddy MB. Effect of ascorbic acid intake on nonheme-iron absorption from a complete diet. Am J Clin Nutr. 2001;73(1):93-8. <a href="https://pubmed.ncbi.nlm.nih.gov/11124756/" rel="noopener">PubMed 11124756</a> · <a href="https://doi.org/10.1093/ajcn/73.1.93" rel="noopener">doi:10.1093/ajcn/73.1.93</a></li>
  <li style="margin-bottom: 8px;">Carr AC, Vissers MC. Synthetic or food-derived vitamin C – are they equally bioavailable? Nutrients. 2013;5(11):4284-304. <a href="https://pubmed.ncbi.nlm.nih.gov/24169506/" rel="noopener">PubMed 24169506</a> · <a href="https://doi.org/10.3390/nu5114284" rel="noopener">doi:10.3390/nu5114284</a></li>
  <li style="margin-bottom: 8px;">EFSA Panel on Dietetic Products, Nutrition and Allergies (NDA). Scientific Opinion on Dietary Reference Values for vitamin C. EFSA Journal. 2013;11(11):3418. <a href="https://doi.org/10.2903/j.efsa.2013.3418" rel="noopener">doi:10.2903/j.efsa.2013.3418</a></li>
  <li style="margin-bottom: 8px;">Regulamentul (UE) nr. 432/2012 al Comisiei – lista mențiunilor de sănătate permise pentru alimente. <a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">EUR-Lex</a></li>
  <li style="margin-bottom: 8px;">Regulamentul (UE) nr. 1169/2011 privind informarea consumatorilor cu privire la produsele alimentare (anexa XIII, valorile nutriționale de referință). <a href="https://eur-lex.europa.eu/eli/reg/2011/1169/oj" rel="noopener">EUR-Lex</a></li>
</ol>`;

const DISCLAIMER = `<p><em>Informațiile din acest articol au caracter general și nu înlocuiesc sfatul medicului sau al unui specialist în nutriție. Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată. Consultați medicul înainte de a începe un supliment, mai ales în caz de sarcină, alăptare, afecțiuni sau tratament medicamentos.</em></p>`;

const AUTHOR = `<div class="author author-box" style="margin-top: 40px; padding: 24px; background: #f8f9fa; border-radius: 8px; display: flex; gap: 20px; align-items: flex-start;" itemprop="author" itemscope itemtype="https://schema.org/Person">
  <img src="https://cdn.shopify.com/s/files/1/0917/5138/3415/files/author-photo-primesupplements1-myshopify-com.jpg?v=1773308575&amp;width=160" alt="Marius Chera, antrenor de culturism" loading="lazy" itemprop="image" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
  <div style="flex: 1;">
    <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1a1a1a;"><a href="/pages/autor-marius-chera" itemprop="url" style="color: #1a1a1a; text-decoration: none;"><span itemprop="name">Marius Chera</span></a></p>
    <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;" itemprop="description">Marius Chera – antrenor de culturism, fondatorul Prime Supplements (2022). Lector la cursurile de instructori din cadrul FRCF, a pregătit sportivi care au obținut carduri PRO și titluri europene și mondiale IFBB. Specializat în online coaching, îmbină experiența din competiții cu știința nutriției sportive.</p>
  </div>
</div>`;

const RELATED = [
  { handle: 'vitamina-c-sportivi-doza-ce-spune-ue', title: 'Vitamina C pentru sportivi: doza, momentul și ce spune UE', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-vitamina-c-sportivi-doza-ce-spune-ue.jpg?v=1792123819', summary: 'Cât vitamina C iei când te antrenezi intens și ce cere mențiunea pentru efort.' },
  { handle: 'vitamina-c-fierul-iei-impreuna', title: 'Vitamina C și fierul: de ce le iei împreună', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-vitamina-c-fierul-iei-impreuna-din-sedinta-foto-plaja-capsule-nac-vitamina-c-water-out-2.jpg?v=1793275561', summary: 'Cum crește vitamina C absorbția fierului și cum o combini la masă.' },
  { handle: 'vitamina-c-naturala-sintetica-exista-diferente', title: 'Vitamina C naturală sau sintetică: există diferențe?', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-vitamina-c-naturala-sintetica-exista-diferente.jpg?v=1794572717', summary: 'Acidul ascorbic din capsule și cel din fructe: ce diferă și ce nu.' },
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
  handle: 'vitamina-c-doza-pe-varste',
  id: 'gid://shopify/Article/1024013238647',
  title: 'Doza zilnică de vitamina C pe vârste: VNR și doza maximă',
  seoTitle: 'Doza zilnică de vitamina C pe vârste și doza maximă',
  seoDesc: 'Doza zilnică de vitamina C: VNR 80 mg, valorile EFSA pe vârste, ce înseamnă 1000 mg pe capsulă și ce știm despre doza maximă și efectele digestive.',
  summary: 'Doza zilnică de vitamina C de referință de pe etichete este de 80 mg pentru adulți, iar EFSA propune 95 mg pe zi pentru femei și 110 mg pentru bărbați. Limita de 2000 mg pe zi des citată este cea din SUA; la copii, în sarcină și în alăptare, doza o stabilește medicul.',
  keyword: 'doza zilnică de vitamina C',
  imageAlt: 'Doza zilnică de vitamina C: flacon Vitamin C 1000 cu 80 de capsule lângă o cutie de pastile pe zile și capsule portocalii, pe o masă de lemn în lumina soarelui',
};

const html = [SHORT, BODY, SOURCES, DISCLAIMER, AUTHOR, related].join('\n\n');
fs.writeFileSync(path.join(dir, `${META.handle}.html`), html);
fs.writeFileSync(path.join(dir, `${META.handle}.meta.json`), JSON.stringify(META, null, 1));

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const FORBIDDEN = ['vindec', 'tratează', 'previne boala', 'detox', 'arde grăsim', 'garantat', 'fără gluten', '<h1', '<script', 'target="_blank"', 'somn', 'stres ', 'refacere', 'rezultate', 'face efect', 'energie', 'sursă de', 'hepat'];
console.log(`cuvinte ${text.split(' ').length} · title ${META.title.length} · seoTitle ${META.seoTitle.length} · seoDesc ${META.seoDesc.length} · interzise: ${[...FORBIDDEN.filter(w => html.toLowerCase().includes(w)), ...(/ficat/i.test(text) ? ['ficat'] : [])].join(',') || '-'}`);
