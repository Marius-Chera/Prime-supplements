// Rescrierea articolului crom-picolinat-beneficii (16.11.2026), după GHID-REDACTIONAL.md §2b, 2c, 3, 4, 5, 6b și BRIEF-LOT2.
// Folosire: node build-crom.mjs → scrie crom-picolinat-beneficii.html și .meta.json lângă acest fișier.
// Fapte de produs: supliment-alimentar-chromium-picolinate-80-caps (ACTIVE), descriere + metafield-uri custom.ingrediente /
//   custom.detalii_produs citite prin Admin API pe 16.11.2026: 1,6 mg picolinat de crom = 200 µg crom (500% VNR; VNR 40 µg),
//   o capsulă pe zi, de preferat în timpul mesei; 80 de capsule (34,2 g); gelatină, maltodextrină, oxid de zinc; reviews 5.0 / 1.
// Mențiuni: textul exact din versiunea RO a Reg. 432/2012 (publications.europa.eu, CELEX 32012R0432, citit 16.11.2026);
//   condiția: „cel puțin o sursă de crom trivalent” (15% VNR = 6 µg; capsula are 200 µg).
// Studii: din bibliotecă 24293292, 29021369, 8644693; noi, verificate azi cu esummary + efetch: 18715218 (Anton 2008), 23495911 (Onakpoya 2013).
// Scos din textul vechi: „pofta de dulce” ca efect, „scăderi de energie”, cronologia „rezultatelor”, „potența efectul insulinei”,
//   comparația cu magneziu L-treonat, linkurile spre arzătoare de grăsimi. Imaginea principală rămâne cea actuală.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const pubmed = (pmid, text) => `<a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/" rel="noopener">${text}</a>`;
const REG = '<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>';
const REG1169 = '<a href="https://eur-lex.europa.eu/eli/reg/2011/1169/oj" rel="noopener">Regulamentul (UE) nr. 1169/2011</a>';

const P = {
  handle: 'supliment-alimentar-chromium-picolinate-80-caps',
  title: 'Picolinat de crom – 80 capsule',
  img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_CHROMIUMPICOLINATE_80cabs_front.jpg?v=1794828861',
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
    <li style="margin-bottom: 8px;">Cromul picolinat este crom trivalent legat de acidul picolinic, una dintre formele de crom folosite în suplimente.</li>
    <li style="margin-bottom: 8px;">În UE, cromul are două mențiuni autorizate: metabolismul normal al macronutrienților și menținerea concentrațiilor normale ale glucozei din sânge.</li>
    <li style="margin-bottom: 8px;">O capsulă de picolinat de crom Prime are 200 µg de crom (500% VNR); eticheta spune o capsulă pe zi, la masă.</li>
    <li style="margin-bottom: 8px;">Studiile despre poftă de mâncare și greutate au găsit efecte mici sau neconcludente (${pubmed('23495911', 'Onakpoya și colab., 2013')}); dacă iei medicamente pentru glicemie, discută întâi cu medicul.</li>
  </ul>
</div>`;

const BODY = `<p><strong>Crom picolinat este denumirea uzuală a picolinatului de crom, adică crom trivalent legat de acidul picolinic, folosit în suplimente alimentare.</strong> În UE, cromul contribuie la metabolismul normal al macronutrienților și la menținerea concentrațiilor normale ale glucozei din sânge. O capsulă Prime are 200 µg de crom, iar cine ia medicamente pentru glicemie vorbește întâi cu medicul.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#ce-este">Ce este cromul picolinat</a></li>
  <li><a href="#mentiuni">Ce face cromul: beneficiile autorizate în UE</a></li>
  <li><a href="#pofta-studii">Cromul și pofta de mâncare: ce au găsit studiile</a></li>
  <li><a href="#contraindicatii">Crom picolinat: contraindicații și precauții</a></li>
  <li><a href="#cum-il-iei">Cum iei picolinatul de crom Prime</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="ce-este">Ce este cromul picolinat</h2>
<p>Cromul picolinat este o combinație între crom trivalent, forma de crom din alimente, și acidul picolinic, o moleculă mică pe care corpul o produce singur din triptofan. Pe etichete îl vei găsi scris „picolinat de crom” sau „chromium picolinate”.</p>
<p>Cromul este un mineral de care e nevoie în cantități foarte mici, de aceea se măsoară în micrograme (µg sau mcg, aceeași unitate). Valoarea nutrițională de referință (VNR) pentru adulți este de 40 µg pe zi, conform anexei XIII a ${REG1169}.</p>
<p>Pe eticheta unui picolinat de crom apar două cifre care se confundă ușor. La produsul Prime, 1,6 mg este greutatea întregului compus, iar 200 µg este cromul pe care îl furnizează; doar a doua cifră se compară cu VNR.</p>
${table(['Ce scrie pe eticheta Prime', 'Valoare', 'Ce înseamnă'], [
  ['Picolinat de crom', '1,6 mg pe capsulă', 'greutatea compusului (1.600 µg)'],
  ['din care crom', '200 µg pe capsulă', 'cantitatea de crom propriu-zis'],
  ['VNR crom (adulți)', '40 µg pe zi', 'valoarea de referință de pe etichete'],
  ['% VNR pe doza zilnică', '500%', '200 µg ÷ 40 µg; pragul pentru mențiuni este 15% (6 µg)'],
  ['Doza zilnică', '1 capsulă', 'de preferat în timpul mesei, fără să o depășești'],
  ['Flacon', '80 de capsule (34,2 g)', '80 de zile la o capsulă pe zi'],
])}

<h2 id="mentiuni">Ce face cromul: beneficiile autorizate în UE</h2>
<p>Singurele beneficii pe care un supliment cu crom are voie să le afirme în UE sunt cele două mențiuni din ${REG}. Textul exact, din versiunea în limba română:</p>
<ul>
  <li>Cromul contribuie la metabolismul normal al macronutrienților.</li>
  <li>Cromul contribuie la menținerea concentrațiilor normale ale glucozei din sânge.</li>
</ul>
<p>Condiția din regulament este ca produsul să aducă crom trivalent într-o cantitate semnificativă, adică cel puțin 15% din VNR pe doza zilnică (6 µg). Capsula Prime aduce 200 µg, deci 500% VNR, iar condiția e îndeplinită.</p>
<p>Mențiunea despre glucoză vorbește despre menținerea unor valori normale, nu despre scăderea lor și nu despre vreo boală. Am explicat diferența pe larg în articolul <a href="/blogs/news/cromul-glicemia-spune-mentiunea-aprobata-ue">crom și glicemie: ce spune mențiunea aprobată în UE</a>.</p>

${productBox('O capsulă are 1,6 mg de picolinat de crom, care furnizează 200 µg de crom (500% VNR). O capsulă pe zi, la masă; flaconul de 80 de capsule ajunge 80 de zile.', 'Vezi produsul')}

<h2 id="pofta-studii">Cromul și pofta de mâncare: ce au găsit studiile</h2>
<p>Mulți caută dacă cromul reduce pofta de dulce. Răspunsul cinstit: în UE nu există nicio mențiune autorizată despre crom și pofta de mâncare, iar studiile au găsit efecte mici sau neconcludente (${pubmed('24293292', 'Tian și colab., 2013')}), așa că nu promitem așa ceva.</p>
<p>Cel mai citat studiu pe această temă a inclus 42 de femei supraponderale care declarau pofte de carbohidrați, împărțite aleatoriu între picolinat de crom și placebo, timp de 8 săptămâni. Față de placebo, grupul cu crom a mâncat mai puțin și a raportat mai puțină foame și mai puțină poftă de grăsimi, iar la greutate diferența nu a fost semnificativă statistic (${pubmed('18715218', 'Anton și colab., 2008')}).</p>
<p>Limitele lui: doar 42 de participante, numai femei, 8 săptămâni și o doză diferită de cea de pe eticheta Prime. Partea a doua a lucrării a fost făcută pe șobolani, nu pe oameni (${pubmed('18715218', 'Anton și colab., 2008')}).</p>
<p>Pentru greutate, imaginea de ansamblu e mai prudentă. O meta-analiză a 11 studii randomizate a găsit doar o diferență foarte mică față de placebo, cu relevanță clinică incertă și cu diferențe mari între studii (${pubmed('23495911', 'Onakpoya și colab., 2013')}).</p>
<p>Recenzia Cochrane a studiilor cu picolinat de crom la adulții supraponderali nu a găsit dovezi actuale și sigure pe care să se poată lua o decizie (${pubmed('24293292', 'Tian și colab., 2013')}). O recenzie din 2017 merge mai departe și notează că efectele benefice ale cromului la oameni nu au fost stabilite fără echivoc (${pubmed('29021369', 'Vincent, 2017')}).</p>
<p>La sală, datele sunt la fel de reci. Un studiu dublu-orb pe 36 de bărbați care s-au antrenat cu greutăți 8 săptămâni nu a găsit niciun efect al cromului asupra forței sau a compoziției corporale (${pubmed('8644693', 'Lukaski și colab., 1996')}).</p>
<p>La sportivii cu care lucrăm spunem la fel: poftele se gestionează cu mese regulate, suficientă proteină și un plan pe care îl poți ține. Un supliment cu crom completează alimentația, nu o înlocuiește.</p>

<h2 id="contraindicatii">Crom picolinat: contraindicații și precauții</h2>
<p>Picolinatul de crom este un supliment alimentar, nu un medicament, deci nu are prospect; atenționările sunt cele de pe etichetă. Ele cer să nu depășești doza zilnică, să ții produsul departe de copii și să consulți medicul în caz de sarcină, alăptare, afecțiuni sau tratament medicamentos.</p>
<ul>
  <li><strong>Dacă iei medicamente pentru glicemie</strong> (inclusiv insulină) sau ai diabet: discută cu medicul înainte să iei orice supliment cu crom. Planul tău de tratament îl ajustează doar medicul, nu un supliment început pe cont propriu.</li>
  <li><strong>Sarcină și alăptare:</strong> discută cu medicul înainte de utilizare, conform etichetei.</li>
  <li><strong>Alte afecțiuni sau tratamente:</strong> spune-i medicului sau farmacistului tot ce iei, inclusiv suplimentele.</li>
  <li><strong>Adolescenți și copii:</strong> produsul este pentru adulți.</li>
  <li><strong>Alte produse cu crom:</strong> dacă iei un multivitamin, verifică dacă are deja crom și adună cantitățile.</li>
</ul>
<p>În studiile randomizate analizate de o meta-analiză din 2013, efectele adverse raportate au fost scaune moi, amețeală, dureri de cap și urticarie (${pubmed('23495911', 'Onakpoya și colab., 2013')}). Dacă apare ceva neobișnuit, oprești suplimentul și discuți cu medicul.</p>
<p>Capsula Prime e din gelatină, deci nu e potrivită dacă eviți produsele de origine animală.</p>

<h2 id="cum-il-iei">Cum iei picolinatul de crom Prime</h2>
<p>Picolinatul de crom Prime se ia câte o capsulă pe zi, de preferat în timpul mesei, fără să depășești această doză. Eticheta nu fixează o anumită masă, așa că alegi una pe care o repeți zilnic, de exemplu prânzul.</p>
<ul>
  <li><strong>Doza:</strong> o capsulă pe zi = 200 µg de crom (500% VNR).</li>
  <li><strong>Momentul:</strong> la masă, cu un pahar de apă.</li>
  <li><strong>Ce conține capsula:</strong> picolinat de crom, maltodextrină ca agent de încărcare, înveliș din gelatină cu oxid de zinc.</li>
  <li><strong>Cât ține un flacon:</strong> 80 de capsule la o capsulă pe zi = 80 de zile, aproape trei luni.</li>
  <li><strong>Părerea clienților:</strong> nota 5 din 5, dintr-o recenzie pe pagina produsului.</li>
</ul>
<p>Despre momentul din zi și doză găsești mai multe detalii în ghidul <a href="/blogs/news/picolinat-crom-cand-se-ia-doza">picolinat de crom: când se ia și ce doză</a>. Dacă vrei și alt mineral din gamă, <a href="/products/zinc-citrate-80-caps">citratul de zinc Prime</a> este un produs separat, cu doza lui pe etichetă.</p>

${productBox('Picolinat de crom în capsule de gelatină: 200 µg de crom pe capsulă, o capsulă pe zi. Livrare gratuită la comenzile de peste 300 de lei.', 'Comandă picolinatul de crom')}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Cromul reduce pofta de dulce?</h3>
<p>Nu există o mențiune autorizată în UE care să spună asta, așa că nu o promitem. Un studiu pe 42 de femei a găsit mai puțină foame și mai puțină poftă de grăsimi față de placebo, dar e mic și scurt (${pubmed('18715218', 'Anton și colab., 2008')}).</p>
<h3>Care sunt beneficiile cromului picolinat?</h3>
<p>Beneficiile autorizate în UE sunt două: cromul contribuie la metabolismul normal al macronutrienților și la menținerea concentrațiilor normale ale glucozei din sânge. Se aplică la o doză zilnică de cel puțin 6 µg de crom; capsula Prime are 200 µg.</p>
<h3>Ce contraindicații are cromul picolinat?</h3>
<p>Eticheta cere consultarea medicului în caz de sarcină, alăptare, afecțiuni sau tratament medicamentos. Dacă iei medicamente pentru glicemie, discută cu medicul înainte de orice supliment cu crom.</p>
<h3>Cât crom picolinat se ia pe zi?</h3>
<p>La produsul Prime, o capsulă pe zi, la masă: 1,6 mg de picolinat de crom, adică 200 µg de crom. Nu depăși doza zilnică recomandată.</p>
<h3>Pot lua crom picolinat dacă iau medicamente pentru glicemie?</h3>
<p>Doar după ce ai vorbit cu medicul. Un supliment nu se adaugă pe cont propriu la un tratament stabilit de specialist.</p>

<p>Alte minerale și vitamine în capsule găsești în colecția <a href="/collections/vitamine-si-minerale">Vitamine și minerale</a>.</p>`;

const SOURCES = `<h2 id="surse">Surse</h2>
<p>Lucrările de mai jos sunt citate în text; fiecare link duce la rezumatul de pe PubMed (Biblioteca Națională de Medicină a SUA) sau la textul oficial al legislației UE.</p>
<ol style="padding-left: 20px; color: #334155;">
  <li style="margin-bottom: 8px;">Anton SD și colab. Effects of chromium picolinate on food intake and satiety. Diabetes Technol Ther. 2008;10(5):405-12. <a href="https://pubmed.ncbi.nlm.nih.gov/18715218/" rel="noopener">PubMed 18715218</a> · <a href="https://doi.org/10.1089/dia.2007.0292" rel="noopener">doi:10.1089/dia.2007.0292</a></li>
  <li style="margin-bottom: 8px;">Onakpoya I, Posadzki P, Ernst E. Chromium supplementation in overweight and obesity: a systematic review and meta-analysis of randomized clinical trials. Obes Rev. 2013;14(6):496-507. <a href="https://pubmed.ncbi.nlm.nih.gov/23495911/" rel="noopener">PubMed 23495911</a> · <a href="https://doi.org/10.1111/obr.12026" rel="noopener">doi:10.1111/obr.12026</a></li>
  <li style="margin-bottom: 8px;">Tian H și colab. Chromium picolinate supplementation for overweight or obese adults. Cochrane Database Syst Rev. 2013;(11):CD010063. <a href="https://pubmed.ncbi.nlm.nih.gov/24293292/" rel="noopener">PubMed 24293292</a> · <a href="https://doi.org/10.1002/14651858.CD010063.pub2" rel="noopener">doi:10.1002/14651858.CD010063.pub2</a></li>
  <li style="margin-bottom: 8px;">Vincent JB. New Evidence against Chromium as an Essential Trace Element. J Nutr. 2017;147(12):2212-2219. <a href="https://pubmed.ncbi.nlm.nih.gov/29021369/" rel="noopener">PubMed 29021369</a> · <a href="https://doi.org/10.3945/jn.117.255901" rel="noopener">doi:10.3945/jn.117.255901</a></li>
  <li style="margin-bottom: 8px;">Lukaski HC și colab. Chromium supplementation and resistance training: effects on body composition, strength, and trace element status of men. Am J Clin Nutr. 1996;63(6):954-65. <a href="https://pubmed.ncbi.nlm.nih.gov/8644693/" rel="noopener">PubMed 8644693</a> · <a href="https://doi.org/10.1093/ajcn/63.6.954" rel="noopener">doi:10.1093/ajcn/63.6.954</a></li>
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
  { handle: 'cromul-glicemia-spune-mentiunea-aprobata-ue', title: 'Crom și glicemie: ce spune mențiunea aprobată în UE', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-cromul-glicemia-spune-mentiunea-aprobata-ue-din-sedinta-foto-sala-produse-potassium-complex-l-carnitina-1.jpg?v=1794373523', summary: 'Ce înseamnă mențiunea UE despre crom și glucoza din sânge și ce nu promite.' },
  { handle: 'picolinat-crom-cand-se-ia-doza', title: 'Picolinat de crom: când se ia și ce doză', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-picolinat-crom-cand-se-ia-doza.jpg?v=1792667287', summary: 'O capsulă pe zi, de preferat în timpul mesei: doza și durata unui flacon de 80 de capsule.' },
  { handle: 'crema-orez-glicemia-inseamna-indicele-glicemic', title: 'Crema de orez și indicele glicemic: ce spune eticheta', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-crema-orez-glicemia-inseamna-indicele-glicemic-din-sedinta-foto-produse-prime-health-instant-oats-1.jpg?v=1793885808', summary: 'Ce înseamnă indicele glicemic și cum citești glucidele per porție pe etichetă.' },
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
  handle: 'crom-picolinat-beneficii',
  id: 'gid://shopify/Article/1024760217975',
  title: 'Crom picolinat: ce face cromul, doza și contraindicații',
  seoTitle: 'Crom picolinat: ce face cromul, doza și contraindicații',
  seoDesc: 'Crom picolinat: ce face cromul conform mențiunilor UE, cât crom are o capsulă de 200 µg, ce spun studiile și ce contraindicații discuți cu medicul.',
  summary: 'Crom picolinat este crom trivalent legat de acidul picolinic; în UE, cromul contribuie la metabolismul normal al macronutrienților și la menținerea concentrațiilor normale ale glucozei din sânge. O capsulă Prime are 200 µg de crom, iar dacă iei medicamente sau ai o afecțiune, discuți întâi cu medicul.',
  keyword: 'crom picolinat',
  imageAlt: 'Crom picolinat: flacon alb de 80 de capsule pe o masă albă, cu capsule roșiatice în jur și un caiet deschis cu pix în fundal',
};

const html = [SHORT, BODY, SOURCES, DISCLAIMER, AUTHOR, related].join('\n\n');
fs.writeFileSync(path.join(dir, `${META.handle}.html`), html);
fs.writeFileSync(path.join(dir, `${META.handle}.meta.json`), JSON.stringify(META, null, 1));

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const FORBIDDEN = ['vindec', 'tratează', 'previne boala', 'detox', 'arde grăsim', 'garantat', 'fără gluten', '<h1', '<script', 'target="_blank"', 'somn', 'stres ', 'refacere', 'rezultate', 'face efect', 'energie', 'sursă de', 'slăbi'];
const metaText = [META.title, META.seoTitle, META.seoDesc, META.summary, META.imageAlt].join(' ').toLowerCase();
const META_FORBIDDEN = ['pofta', 'poftă', 'dulce', 'slăb', 'diabet', 'greutate'];
console.log(`cuvinte ${text.split(' ').length} · title ${META.title.length} · seoTitle ${META.seoTitle.length} · seoDesc ${META.seoDesc.length} · interzise: ${FORBIDDEN.filter(w => html.toLowerCase().includes(w)).join(',') || '-'} · meta interzise: ${META_FORBIDDEN.filter(w => metaText.includes(w)).join(',') || '-'}`);
