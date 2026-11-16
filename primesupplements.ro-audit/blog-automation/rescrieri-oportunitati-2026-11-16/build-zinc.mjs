// Rescrierea articolului zinc-citrat-dozaj-optim-zinc-imunitate-evaluare (16.11.2026), după GHID-REDACTIONAL.md §2b, 2c, 3, 4, 5, 6b.
// Folosire: node build-zinc.mjs → scrie zinc-citrat-dozaj-optim-zinc-imunitate-evaluare.html și .meta.json lângă acest fișier.
// Fapte de produs: produsul zinc-citrate-80-caps (ACTIVE), descriere + metafield-uri citite prin Admin API pe 16.11.2026
//   (40 mg zinc din citrat de zinc per capsulă = 400% VNR; o capsulă pe zi, înainte sau după masă; 80 de capsule; nu sub 18 ani, sarcină, alăptare).
// Mențiuni: textul exact din versiunea RO a Reg. 432/2012, citit pe EUR-Lex pe 16.11.2026.
// Studii (zinc nu era în bibliotecă): Wegmüller 2014, Schoofs 2024, Lönnerdal 2000, Roohani 2013 – verificate azi cu esummary + efetch.
// Imaginea principală rămâne cea actuală (fără generare AI).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const pubmed = (pmid, text) => `<a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/" rel="noopener">${text}</a>`;
const REG = '<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>';
const REG1169 = '<a href="https://eur-lex.europa.eu/eli/reg/2011/1169/oj" rel="noopener">Regulamentul (UE) nr. 1169/2011</a>';

const P = {
  handle: 'zinc-citrate-80-caps',
  title: 'Citrat de zinc 40 mg – 80 de capsule',
  img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_ZINC_80caps_front.jpg?v=1794828861',
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
    <li style="margin-bottom: 8px;">Doza zilnică de zinc de referință pentru adulți (VNR) este de 10 mg.</li>
    <li style="margin-bottom: 8px;">Limita superioară folosită în UE pentru adulți este de 25 mg pe zi, din toate sursele (alimente și suplimente).</li>
    <li style="margin-bottom: 8px;">O capsulă de citrat de zinc Prime are 40 mg de zinc (400% VNR); eticheta spune o capsulă pe zi, nu mai mult.</li>
    <li style="margin-bottom: 8px;">40 mg depășește limita de 25 mg: pentru utilizare îndelungată, discută cu medicul.</li>
  </ul>
</div>`;

const BODY = `<p><strong>Doza zilnică de zinc de referință pentru un adult este de 10 mg, iar limita superioară folosită în UE este de 25 mg pe zi, din toate sursele.</strong> Cât zinc se ia pe zi depinde de ce mănânci și de ce alte suplimente iei. Zincul citrat este zinc legat de acid citric, o formă organică. O capsulă de citrat de zinc Prime are 40 mg de zinc (400% VNR), iar eticheta recomandă o singură capsulă pe zi.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#doza-zilnica">Doza zilnică de zinc: valorile oficiale</a></li>
  <li><a href="#zinc-citrat">Ce este zincul citrat și cât se absoarbe</a></li>
  <li><a href="#40-mg">Ce înseamnă 40 mg de zinc pe capsulă</a></li>
  <li><a href="#mentiuni">Ce rol are zincul: mențiunile autorizate în UE</a></li>
  <li><a href="#alimente">Zincul din alimente și ce îi scade absorbția</a></li>
  <li><a href="#cum-il-iei">Cum iei citratul de zinc Prime</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="doza-zilnica">Doza zilnică de zinc: valorile oficiale</h2>
<p>Doza zilnică de zinc pe care o vezi pe etichete se raportează la valoarea nutrițională de referință (VNR) de 10 mg pe zi pentru adulți, stabilită în anexa XIII a ${REG1169}. Procentul „% VNR” de pe un flacon îți spune de câte ori acoperă o doză această valoare.</p>
<p>Limita superioară tolerabilă pentru adulți este de 25 mg de zinc pe zi. Valoarea a fost stabilită în 2003 de Comitetul Științific pentru Alimentație al UE și este cea folosită de Autoritatea Europeană pentru Siguranța Alimentară (EFSA); o recenzie din 2024 notează că în SUA limita admisă este de 40 mg pe zi (${pubmed('38999082', 'Schoofs și colab., 2024')}).</p>
${table(['Reper', 'Zinc pe zi', 'Ce înseamnă'], [
  ['VNR pentru adulți (Reg. 1169/2011)', '10 mg', 'valoarea de referință de pe etichete (100% VNR)'],
  ['Pragul pentru mențiunile de sănătate', '1,5 mg', '15% din VNR pe doza zilnică; de la acest prag un supliment poate purta mențiunile UE'],
  ['Limita superioară pentru adulți (UE)', '25 mg', 'din toate sursele: alimente, multivitamine, alte suplimente'],
  ['O capsulă de citrat de zinc Prime', '40 mg', '400% VNR, doza zilnică de pe etichetă; peste limita UE de 25 mg'],
])}
<p>Aceeași recenzie din 2024 arată că un aport de zinc mult peste necesar, menținut în timp, poate duce la anemie, la neutropenie și la deficit de cupru indus de zinc (${pubmed('38999082', 'Schoofs și colab., 2024')}). De aceea limita se calculează pe totalul zilei, nu pe un singur produs.</p>

<h2 id="zinc-citrat">Ce este zincul citrat și cât se absoarbe</h2>
<p>Zincul citrat (citratul de zinc) este zinc legat de acid citric, același acid din lămâi. În suplimente, zincul apare mereu legat de o altă moleculă: citrat, gluconat, sulfat, picolinat sau oxid.</p>
<p>Un studiu randomizat, dublu-orb, a dat la 15 adulți sănătoși câte 10 mg de zinc fără mâncare, din trei forme, pe rând. Absorbția mediană a fost de 61,3% din citrat, 60,9% din gluconat și 49,9% din oxid; la trei participanți, oxidul aproape nu s-a absorbit (${pubmed('24259556', 'Wegmüller și colab., 2014')}).</p>
<p>Limitele: doar 15 persoane, o doză de 10 mg, nu 40 mg, și administrare pe stomacul gol.</p>
<p>O recenzie despre alimentație notează că acizii organici precum citratul favorizează absorbția zincului (${pubmed('10801947', 'Lönnerdal, 2000')}).</p>

${productBox('40 mg de zinc din citrat de zinc într-o capsulă (400% VNR), o capsulă pe zi; flaconul de 80 de capsule ajunge pentru 80 de zile.', 'Vezi produsul')}

<h2 id="40-mg">Ce înseamnă 40 mg de zinc pe capsulă</h2>
<p>Pe eticheta citratului de zinc Prime, 40 mg este cantitatea de zinc, nu greutatea întregului compus. În dreptul ei scrie 400% VNR, adică de patru ori valoarea de referință de 10 mg.</p>
<p>Spunem lucrurilor pe nume: 40 mg pe zi depășește limita superioară de 25 mg folosită în UE pentru adulți. Eticheta cere să nu depășești o capsulă pe zi, iar pentru utilizare îndelungată recomandăm să discuți cu medicul, care poate decide și dacă e nevoie de analize.</p>
<ul>
  <li><strong>Adună tot zincul din zi:</strong> multivitamine, pre-workout-uri sau alte produse cu zinc se adaugă peste capsulă.</li>
  <li><strong>Nu dubla doza:</strong> o capsulă e deja de patru ori VNR.</li>
  <li><strong>Pentru adulți:</strong> conform etichetei, produsul nu se recomandă sub 18 ani, în sarcină și în alăptare.</li>
</ul>
<p>Cum citești forma, doza și procentul din VNR pe orice flacon de minerale am explicat pas cu pas în <a href="/blogs/news/magneziu-sportivi-cat-iei-eticheta">ghidul despre eticheta suplimentelor cu magneziu</a>; regula e aceeași la zinc.</p>

<h2 id="mentiuni">Ce rol are zincul: mențiunile autorizate în UE</h2>
<p>Un supliment poate folosi mențiunile UE pentru zinc doar dacă doza zilnică aduce cel puțin 15% din VNR (1,5 mg); capsula Prime aduce 400% VNR. Textul exact din ${REG}:</p>
<ul>
  <li>Zincul contribuie la funcționarea normală a sistemului imunitar.</li>
  <li>Zincul contribuie la menținerea concentrațiilor normale de testosteron din sânge.</li>
  <li>Zincul contribuie la menținerea sănătății pielii.</li>
  <li>Zincul contribuie la menținerea sănătății părului.</li>
  <li>Zincul contribuie la menținerea sănătății unghiilor.</li>
  <li>Zincul contribuie la sinteza normală a proteinelor.</li>
  <li>Zincul contribuie la metabolismul normal al macronutrienților.</li>
  <li>Zincul contribuie la funcția cognitivă normală.</li>
  <li>Zincul contribuie la protejarea celulelor împotriva stresului oxidativ.</li>
</ul>
<p>Mențiunile descriu rolul zincului într-o dietă variată; mai mult zinc nu înseamnă mai mult efect.</p>

<h2 id="alimente">Zincul din alimente și ce îi scade absorbția</h2>
<p>Zincul vine mai ales din carne, fructe de mare, ouă și lactate, iar în cantități mai mici din semințe, nuci și leguminoase. O recenzie integrativă arată că deficitul de zinc e mai frecvent acolo unde dieta are multe cereale și puține alimente de origine animală, iar acidul fitic este principalul inhibitor cunoscut al absorbției (${pubmed('23914218', 'Roohani și colab., 2013')}).</p>
<p>Aceeași recenzie notează că copiii, adolescenții, femeile însărcinate și cele care alăptează au nevoie de mai mult zinc decât adulții, iar un deficit ușor e greu de confirmat clinic (${pubmed('23914218', 'Roohani și colab., 2013')}). Concluzia: nu ghicești un deficit după semne, îl confirmă medicul.</p>
<ul>
  <li><strong>Fitații din cereale și leguminoase</strong> scad absorbția zincului din masă; înmuierea, germinarea și fermentarea îi reduc (${pubmed('10801947', 'Lönnerdal, 2000')}).</li>
  <li><strong>Fierul dat în același supliment</strong> poate scădea absorbția zincului, spre deosebire de fierul din alimente fortificate (${pubmed('10801947', 'Lönnerdal, 2000')}).</li>
  <li><strong>Proteinele din masă</strong> au un efect pozitiv asupra absorbției zincului, conform aceleiași recenzii (${pubmed('10801947', 'Lönnerdal, 2000')}).</li>
</ul>
<p>La sportivii cu care lucrăm, prima întrebare e „câte mese cu carne, ouă sau lactate ai pe zi?”. La o dietă săracă în ele sau vegetariană, merită o discuție cu medicul.</p>

<h2 id="cum-il-iei">Cum iei citratul de zinc Prime</h2>
<p>Citratul de zinc Prime se ia câte o capsulă pe zi, înainte sau după masă, fără să depășești această doză. Eticheta nu fixează o oră, așa că alegi un moment pe care îl repeți zilnic.</p>
<ul>
  <li><strong>Doza:</strong> o capsulă pe zi = 40 mg de zinc (400% VNR).</li>
  <li><strong>Momentul:</strong> înainte sau după masă; dacă simți disconfort la stomac, ia capsula după masă.</li>
  <li><strong>Cu alte minerale:</strong> dacă iei fier, separă-l de zinc (vezi mai sus) și întreabă farmacistul cum împarți suplimentele în zi.</li>
  <li><strong>Cât ține un flacon:</strong> 80 de capsule la o capsulă pe zi = 80 de zile.</li>
  <li><strong>Părerea clienților:</strong> nota 5 din 5, din 2 recenzii pe pagina produsului.</li>
</ul>
<p>Mulți îl iau în aceeași zi cu <a href="/products/magneziu-bisglicinat-80-caps">magneziul bisglicinat Prime Health</a>, fiecare în doza lui de pe etichetă. Pentru comparație, vezi și <a href="/blogs/news/vitamina-c-doza-pe-varste">ghidul despre doza zilnică de vitamina C</a>.</p>

${productBox('Citrat de zinc în capsule de gelatină: 40 mg de zinc pe capsulă, o capsulă pe zi. Livrare gratuită la comenzile de peste 300 de lei.', 'Comandă citratul de zinc')}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Cât zinc se ia pe zi?</h3>
<p>Valoarea de referință pentru un adult este de 10 mg de zinc pe zi, iar limita superioară folosită în UE este de 25 mg, din toate sursele. La citratul de zinc Prime, eticheta indică o capsulă pe zi (40 mg); pentru utilizare îndelungată, discută cu medicul.</p>
<h3>Care este doza zilnică de zinc recomandată pentru bărbați și femei?</h3>
<p>Pe etichete, VNR este același pentru adulți: 10 mg pe zi. Necesarul real diferă după sex, vârstă și dietă; femeile însărcinate și cele care alăptează au nevoi mai mari, stabilite de medic.</p>
<h3>Zinc citrat sau zinc oxid: care se absoarbe mai bine?</h3>
<p>Într-un studiu pe 15 adulți, absorbția a fost de 61,3% din citrat și de 49,9% din oxid, la 10 mg luate fără mâncare (${pubmed('24259556', 'Wegmüller și colab., 2014')}). Studiul e mic, dar diferența a fost semnificativă statistic.</p>
<h3>Se poate lua zincul seara?</h3>
<p>Da. Eticheta citratului de zinc Prime spune doar o capsulă pe zi, înainte sau după masă, deci poți alege și cina. Contează să nu iei două capsule în aceeași zi.</p>
<h3>Pot lua zinc 40 mg în fiecare zi, pe termen lung?</h3>
<p>40 mg depășește limita de 25 mg folosită în UE pentru adulți, iar excesul de zinc menținut în timp poate reduce cuprul din organism (${pubmed('38999082', 'Schoofs și colab., 2024')}). Pentru utilizare îndelungată, discută cu medicul.</p>

<p>Alte minerale și vitamine în capsule găsești în colecția <a href="/collections/vitamine-si-minerale">Vitamine și minerale</a>.</p>`;

const SOURCES = `<h2 id="surse">Surse</h2>
<p>Lucrările de mai jos sunt citate în text; fiecare link duce la rezumatul de pe PubMed (Biblioteca Națională de Medicină a SUA) sau la textul oficial al legislației UE.</p>
<ol style="padding-left: 20px; color: #334155;">
  <li style="margin-bottom: 8px;">Wegmüller R și colab. Zinc absorption by young adults from supplemental zinc citrate is comparable with that from zinc gluconate and higher than from zinc oxide. J Nutr. 2014;144(2):132-6. <a href="https://pubmed.ncbi.nlm.nih.gov/24259556/" rel="noopener">PubMed 24259556</a> · <a href="https://doi.org/10.3945/jn.113.181487" rel="noopener">doi:10.3945/jn.113.181487</a></li>
  <li style="margin-bottom: 8px;">Schoofs H, Schmit J, Rink L. Zinc Toxicity: Understanding the Limits. Molecules. 2024;29(13):3130. <a href="https://pubmed.ncbi.nlm.nih.gov/38999082/" rel="noopener">PubMed 38999082</a> · <a href="https://doi.org/10.3390/molecules29133130" rel="noopener">doi:10.3390/molecules29133130</a></li>
  <li style="margin-bottom: 8px;">Lönnerdal B. Dietary factors influencing zinc absorption. J Nutr. 2000;130(5S Suppl):1378S-83S. <a href="https://pubmed.ncbi.nlm.nih.gov/10801947/" rel="noopener">PubMed 10801947</a> · <a href="https://doi.org/10.1093/jn/130.5.1378S" rel="noopener">doi:10.1093/jn/130.5.1378S</a></li>
  <li style="margin-bottom: 8px;">Roohani N și colab. Zinc and its importance for human health: An integrative review. J Res Med Sci. 2013;18(2):144-57. <a href="https://pubmed.ncbi.nlm.nih.gov/23914218/" rel="noopener">PubMed 23914218</a></li>
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
  { handle: 'magneziu-sportivi-cat-iei-eticheta', title: 'Magneziul la sportivi: cât iei și ce verifici pe etichetă', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-magneziu-sportivi-cat-iei-eticheta.jpg?v=1792695730', summary: 'Cum citești forma de magneziu, doza zilnică și procentul din VNR pe etichetă.' },
  { handle: 'vitamina-c-doza-pe-varste', title: 'Vitamina C pe vârste: doza zilnică de la 20 la 60+ ani', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-magneziu-l-threonate-vitamin-c-1000-80-caps-1779519670450.png?v=1792128373', summary: 'Doza zilnică de vitamina C pe vârste și limita superioară pentru adulți.' },
  { handle: 'magneziu-bisglicinat-cum-iti-dai-seama-daca', title: 'Magneziu bisglicinat: ce este, cum îl iei și cui i se potrivește', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-cum-iti-dai-seama-daca-magneziul-bisglicinat-este-bun-pentru-tine-1773403893180_d8fa5520-dd4e-4ae6-8995-bfb62c2ad031.png?v=1794568598', summary: 'Ce este forma bisglicinat, cum iei capsulele și când întrebi medicul.' },
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
  handle: 'zinc-citrat-dozaj-optim-zinc-imunitate-evaluare',
  id: 'gid://shopify/Article/1025013711223',
  title: 'Doza zilnică de zinc: cât zinc pe zi și cum iei zinc citrat',
  seoTitle: 'Doza zilnică de zinc: cât zinc pe zi și zinc citrat',
  seoDesc: 'Doza zilnică de zinc: VNR 10 mg, limita UE 25 mg pe zi, ce înseamnă 40 mg de zinc citrat pe capsulă și ce arată studiile despre absorbția zincului.',
  summary: 'Doza zilnică de zinc de referință pentru adulți este de 10 mg, iar limita superioară folosită în UE este de 25 mg pe zi, din toate sursele. O capsulă de citrat de zinc Prime are 40 mg de zinc (400% VNR); eticheta recomandă o capsulă pe zi, iar pentru utilizare îndelungată discuți cu medicul.',
  keyword: 'doza zilnică de zinc',
  imageAlt: 'Doza zilnică de zinc: laborator cu aparatură și sticlărie, cu un model molecular luminos în prim-plan',
};

const html = [SHORT, BODY, SOURCES, DISCLAIMER, AUTHOR, related].join('\n\n');
fs.writeFileSync(path.join(dir, `${META.handle}.html`), html);
fs.writeFileSync(path.join(dir, `${META.handle}.meta.json`), JSON.stringify(META, null, 1));

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const FORBIDDEN = ['vindec', 'tratează', 'previne boala', 'detox', 'arde grăsim', 'garantat', 'fără gluten', '<h1', '<script', 'target="_blank"', 'somn', 'stres ', 'refacere', 'rezultate', 'face efect', 'energie', 'sursă de'];
console.log(`cuvinte ${text.split(' ').length} · title ${META.title.length} · seoTitle ${META.seoTitle.length} · seoDesc ${META.seoDesc.length} · interzise: ${FORBIDDEN.filter(w => html.toLowerCase().includes(w)).join(',') || '-'}`);
