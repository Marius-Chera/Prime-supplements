// Adaugă secțiunea „Creatina și ficatul” în articolul existent creatina-contraindicatii-cine-nu-o-ia
// (NU rescrie articolul: citește body-ul din backup și inserează doar H2 nou, intrarea din Cuprins,
// o întrebare FAQ și 2 surse noi). Studii verificate cu eutils pe 16.11.2026 (rezumat citit).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const R = path.resolve(dir, '..', '..');
const backup = JSON.parse(fs.readFileSync(path.join(R, 'backups/blog-oportunitati-2026-11-16/creatina-contraindicatii-cine-nu-o-ia.json'), 'utf8'));
const node = backup.data.nodes[0];
let html = node.body;

const KIM = '<a href="https://pubmed.ncbi.nlm.nih.gov/21399917/" rel="noopener">Kim și colab., 2011</a>';
const GUINGAND = '<a href="https://pubmed.ncbi.nlm.nih.gov/32549301/" rel="noopener">de Guingand și colab., 2020</a>';

function replaceOnce(src, find, repl) {
  const i = src.indexOf(find);
  if (i < 0 || src.indexOf(find, i + 1) >= 0) throw new Error('ancoră negăsită sau ne-unică: ' + find.slice(0, 60));
  return src.slice(0, i) + repl + src.slice(i + find.length);
}

// 1) Cuprins: după intrarea despre rinichi
html = replaceOnce(html,
  '<li><a href="#rinichi">Creatina și rinichii: ce se știe și ce nu</a></li>\n',
  '<li><a href="#rinichi">Creatina și rinichii: ce se știe și ce nu</a></li>\n<li><a href="#creatina-ficat">Creatina și ficatul: ce spun studiile</a></li>\n');

// 2) H2 nou: imediat după secțiunea despre rinichi, înainte de cea despre analize
const SECTION = `<h2 id="creatina-ficat">Creatina și ficatul: ce spun studiile</h2>
<p>A doua întrebare frecventă este dacă creatina afectează ficatul. O recenzie despre siguranța creatinei a notat că, la persoanele sănătoase, tinere sau vârstnice, enzimele hepatice și ureea nu s-au modificat în timpul suplimentării, nici după câteva luni (${KIM}). Limita: recenzia se referă la persoane sănătoase și nu spune nimic despre cine are deja o boală de ficat.</p>
<p>La femei, o meta-analiză a 29 de studii, cu 951 de participante, nu a raportat diferențe semnificative statistic în măsurătorile funcției hepatice sau renale (${GUINGAND}). Autorii cer totuși ca studiile viitoare să urmărească și să raporteze mai complet efectele nedorite.</p>
<p>Concluzia practică: datele citate mai sus nu au arătat modificări ale analizelor de ficat la adulții sănătoși, ceea ce nu face suplimentul potrivit oricui. Dacă ai o boală de ficat, transaminaze crescute sau iei medicamente, discuți cu medicul înainte de prima porție și îi spui că iei creatină când îți faci analizele.</p>
`;
html = replaceOnce(html, '<h2 id="analize">', SECTION + '<h2 id="analize">');

// 3) FAQ: după întrebarea despre rinichi
const FAQ = `<h3>Creatina afectează ficatul?</h3>
<p>La persoanele sănătoase, studiile adunate într-o recenzie de siguranță nu au arătat modificări ale enzimelor hepatice în timpul suplimentării, nici după câteva luni (${KIM}). Datele vin însă de la persoane fără boli de ficat, așa că, dacă ai o afecțiune hepatică sau urmezi un tratament, întrebi medicul înainte să începi.</p>
`;
html = replaceOnce(html, '<h3>Pot lua creatină dacă urmez un tratament?</h3>', FAQ + '<h3>Pot lua creatină dacă urmez un tratament?</h3>');

// 4) Surse: la finalul listei id="surse", în același format
const SRC = `<li style="margin-bottom: 8px;">Kim HJ și colab. Studies on the safety of creatine supplementation. Amino Acids. 2011;40(5):1409-18. <a href="https://pubmed.ncbi.nlm.nih.gov/21399917/" rel="noopener">PubMed 21399917</a> · <a href="https://doi.org/10.1007/s00726-011-0878-2" rel="noopener">doi:10.1007/s00726-011-0878-2</a>
</li>
<li style="margin-bottom: 8px;">de Guingand DL și colab. Risk of Adverse Outcomes in Females Taking Oral Creatine Monohydrate: A Systematic Review and Meta-Analysis. Nutrients. 2020;12(6):1780. <a href="https://pubmed.ncbi.nlm.nih.gov/32549301/" rel="noopener">PubMed 32549301</a> · <a href="https://doi.org/10.3390/nu12061780" rel="noopener">doi:10.3390/nu12061780</a>
</li>
`;
const surseIdx = html.indexOf('<h2 id="surse">');
const olEnd = html.indexOf('</ol>', surseIdx);
if (surseIdx < 0 || olEnd < 0) throw new Error('lista de surse negăsită');
html = html.slice(0, olEnd) + SRC + html.slice(olEnd);
// Corectura gramaticala (16.11, publicata pe site): „împărți” -> „împarți” (persoana a II-a).
html = replaceOnce(html, "faza de încărcare, împărți doza", "faza de încărcare, împarți doza");

const META = {
  handle: 'creatina-contraindicatii-cine-nu-o-ia',
  id: 'gid://shopify/Article/1025321632119',
  title: node.title,
  seoTitle: node.seo_t.value,
  seoDesc: node.seo_d.value,
  summary: node.summary,
  keyword: 'creatina',
  imageAlt: 'Tub Prime Creatine made of Creapure lângă un pahar cu apă, un shaker, o măsură cu pudră și un caiet pe o masă de bucătărie',
};

fs.writeFileSync(path.join(dir, `${META.handle}.html`), html);
fs.writeFileSync(path.join(dir, `${META.handle}.meta.json`), JSON.stringify(META, null, 1));

// Verificare: restul textului identic (scoatem inserțiile și comparăm cu backup-ul)
const stripped = html.replace(SECTION, '').replace(FAQ, '').replace(SRC, '')
  .replace('<li><a href="#creatina-ficat">Creatina și ficatul: ce spun studiile</a></li>\n', '');
console.log('restul identic cu backup:', stripped === node.body);

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const FORBIDDEN = ['vindec', 'tratează', 'previne boala', 'detox', 'arde grăsim', 'garantat', 'fără gluten', '<h1', '<script', 'target="_blank"', 'somn', 'stres ', 'refacere', 'rezultate', 'face efect', 'energie', 'sursă de', 'protejează', '100%  sigur', 'complet sigur'];
const newText = (SECTION + FAQ).toLowerCase();
console.log(`cuvinte ${text.split(' ').length} · title ${META.title.length} · seoTitle ${META.seoTitle.length} · seoDesc ${META.seoDesc.length} · interzise (text nou): ${FORBIDDEN.filter(w => newText.includes(w)).join(',') || '-'} · interzise (tot): ${FORBIDDEN.filter(w => html.toLowerCase().includes(w)).join(',') || '-'}`);
