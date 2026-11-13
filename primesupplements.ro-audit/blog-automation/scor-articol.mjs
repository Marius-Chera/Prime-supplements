// Punctaj automat pentru un articol de blog Prime Supplements (cerut de proprietar pe 13.11.2026).
// Două scoruri din 100: SEO (Google) și AI (cât de ușor îl citează ChatGPT, Gemini, Copilot, Perplexity).
// Folosire: node scor-articol.mjs articol.html meta.json
//   meta.json: {"title":"...","seoTitle":"...","seoDesc":"...","keyword":"...","imageAlt":"..."}
//   (keyword lipsă = partea titlului dinaintea „:”)
// Ieșire: JSON {seo, ai, lipsuri_seo:[...], lipsuri_ai:[...]} – fiecare lipsă spune câte puncte a pierdut.
import fs from 'node:fs';

const [, , htmlPath, metaPath] = process.argv;
const html = fs.readFileSync(htmlPath, 'utf8');
const meta = metaPath ? JSON.parse(fs.readFileSync(metaPath, 'utf8')) : {};
const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const words = text.split(' ').filter(Boolean);
const keyword = norm(meta.keyword || (meta.title || '').split(':')[0]).trim();
const first100 = norm(words.slice(0, 160).join(' '));
const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
const h2 = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1]);
const faqStart = html.search(/<h2[^>]*id="intrebari-frecvente"/);
const faqEnd = faqStart >= 0 ? html.indexOf('<h2', faqStart + 5) : -1;
const faq = faqStart >= 0 ? html.slice(faqStart, faqEnd > 0 ? faqEnd : undefined) : '';
const faqQ = [...faq.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
const pubmed = new Set((html.match(/pubmed\.ncbi\.nlm\.nih\.gov\/\d+/g) || []));
const paras = [...html.matchAll(/<(p|li)[^>]*>([\s\S]*?)<\/\1>/g)].map(m => m[2]);
const studyRe = /\b(studii(le)?|studiu(l)?|cercet[ăa]ri(le)?|cercet[ăa]tori(i)?|meta-analiz[ăa]|recenzi[ae] (sistematic|din))/i;
const unlinkedStudy = paras.filter(p => !/href="#/.test(p) && studyRe.test(p.replace(/<[^>]+>/g, '')) && !/pubmed\.ncbi|doi\.org|eur-lex/.test(p) && !/Lucr[ăa]rile de mai jos|mai sus|citat[ăe]? /.test(p));
const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
const forbidden = ['vindecă', 'tratează', 'previne boala', 'detox', 'arde grăsim', 'garantat', 'sursă de energie', 'sursă de carbohidrați', 'energie rapidă'];
const forbiddenHits = forbidden.filter(w => norm(text).includes(norm(w)));
const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
const badAnchors = anchors.filter(id => !html.includes(`id="${id}"`));
const numbers = (text.match(/\b\d+([.,]\d+)?\s?(%|g|mg|µg|ml|kcal|UI|zile|porții|capsule|de )/g) || []).length;

function score(rules) {
  let total = 0; const lipsuri = [];
  for (const [pts, ok, why] of rules) { if (ok) total += pts; else lipsuri.push(`-${pts}: ${why}`); }
  return { total, lipsuri };
}

const seo = score([
  [10, (meta.title || '').length > 0 && meta.title.length <= 65 && norm(meta.title).startsWith(keyword.slice(0, Math.min(keyword.length, 12))), 'titlul are peste 65 de caractere sau nu începe cu cuvântul-cheie'],
  [5, (meta.seoTitle || '').length > 0 && meta.seoTitle.length <= 60, 'title tag lipsă sau peste 60 de caractere'],
  [5, (meta.seoDesc || '').length >= 140 && meta.seoDesc.length <= 155, 'meta descrierea nu are 140–155 de caractere'],
  [5, !!keyword && first100.includes(keyword.split(' ').slice(0, 2).join(' ')), 'cuvântul-cheie lipsește din primele 100 de cuvinte'],
  [10, words.length >= 1200 && words.length <= 1900, `lungimea (${words.length} cuvinte) nu e 1.200–1.800`],
  [5, h2.length >= 5, `prea puține secțiuni H2 (${h2.length}, minim 5)`],
  [5, anchors.length >= 4 && badAnchors.length === 0, badAnchors.length ? `ancore din cuprins fără țintă: ${badAnchors.join(', ')}` : 'cuprinsul lipsește sau are sub 4 linkuri'],
  [5, !/<h1/i.test(html), 'corpul conține H1'],
  [5, hrefs.filter(h => h.startsWith('/products/')).length >= 2, 'sub 2 linkuri spre produs'],
  [5, hrefs.some(h => h.startsWith('/collections/')), 'lipsește linkul spre colecție'],
  [5, new Set(hrefs.filter(h => h.startsWith('/blogs/news/'))).size >= 2, 'sub 2 articole interne legate'],
  [5, imgs.length > 0 && imgs.every(i => /alt="[^"]{3,}"/.test(i)), 'există imagini fără text alternativ'],
  [5, (meta.imageAlt || '').length >= 20, 'imaginea principală nu are text alternativ descriptiv'],
  [5, /<table/i.test(html), 'lipsește un tabel'],
  [10, faqQ.length >= 4, `secțiunea „Întrebări frecvente” are ${faqQ.length} întrebări (minim 4)`],
  [5, /\/pages\/autor-marius-chera/.test(html), 'lipsește caseta de autor cu link'],
  [5, /Articole Similare/.test(html), 'lipsește secțiunea „Articole Similare”'],
]);

const ai = score([
  [10, /Pe scurt/.test(html), 'lipsește caseta „Pe scurt”'],
  [10, /<p><strong>[^<]{40,}<\/strong>/.test(html), 'primul paragraf nu începe cu un răspuns direct îngroșat'],
  [10, /\b(este|sunt|inseamna|se ia|se iau)\b/.test(first100), 'lipsește o definiție/răspuns clar („X este…”) la început'],
  [20, pubmed.size >= 3 && pubmed.size <= 6, `${pubmed.size} studii PubMed distincte (trebuie 3–6)`],
  [10, /id="surse"/.test(html), 'lipsește secțiunea „Surse”'],
  [10, unlinkedStudy.length === 0, `${unlinkedStudy.length} paragrafe vorbesc despre studii fără link`],
  [10, faqQ.length >= 4 && faqQ.every(q => q.endsWith('?')), 'întrebările frecvente nu sunt formulate ca întrebări reale'],
  [5, numbers >= 8, `prea puține cifre concrete (${numbers}, minim 8)`],
  [5, !/contribuie la/.test(html) || /eur-lex\.europa\.eu/.test(html), 'mențiune de sănătate fără link spre Regulamentul (UE) 432/2012'],
  [10, forbiddenHits.length === 0, `cuvinte interzise: ${forbiddenHits.join(', ')}`],
]);

console.log(JSON.stringify({ seo: seo.total, ai: ai.total, cuvinte: words.length, pubmed: pubmed.size, lipsuri_seo: seo.lipsuri, lipsuri_ai: ai.lipsuri }, null, 1));
