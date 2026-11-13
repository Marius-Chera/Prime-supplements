// Completează un articol: răspuns îngroșat, secțiunea de studii (+cuprins), „Surse”, înlocuiri punctuale.
// Folosire: node complete.mjs <handle> [<handle>...]  → new/<handle>.html (+ over/<handle>.json cu meta noi)
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { S } from './sources.mjs';
const hs = process.argv.slice(2);
fs.mkdirSync('new', { recursive: true }); fs.mkdirSync('over', { recursive: true });
function sourcesHtml(keys) {
  const li = keys.map(k => { const s = S[k]; if (!s) throw new Error('sursă necunoscută ' + k); return `<li style="margin-bottom: 8px;">${s.cite} <a href="${s.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/` : s.url}" rel="noopener">${s.pmid ? `PubMed ${s.pmid}` : s.label}</a>${s.doi ? ` · <a href="https://doi.org/${s.doi}" rel="noopener">doi:${s.doi}</a>` : ''}</li>`; }).join('\n  ');
  return `<h2 id="surse">Surse</h2>
<p>Lucrările de mai jos sunt citate în text; fiecare link duce la rezumatul de pe PubMed (Biblioteca Națională de Medicină a SUA) sau la textul oficial al legislației UE.</p>
<ol style="padding-left: 20px; color: #334155;">
  ${li}
</ol>`;
}
for (const h of hs) {
  const spec = (await import(pathToFileURL(`specs/${h}.mjs`).href + `?t=${Date.now()}`)).default;
  let html = fs.readFileSync(`orig/${h}.html`, 'utf8');
  const must = (cond, msg) => { if (!cond) throw new Error(`${h}: ${msg}`); };
  for (const [a, b] of (spec.rep || [])) { must(html.includes(a), 'rep negăsit: ' + a.slice(0, 90)); html = html.replace(a, b); }
  const plain = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const findEl = (prefix, tags = 'p|li|h3') => {
    for (const m of html.matchAll(new RegExp(`[ \\t]*<(${tags})(\\s[^>]*)?>([\\s\\S]*?)<\\/\\1>\\n?`, 'g'))) if (plain(m[3]).startsWith(prefix)) return m;
    return null;
  };
  // cut: șterge elementul (p/li/h3) care începe cu textul dat
  for (const pre of (spec.cut || [])) { const m = findEl(pre); must(m, 'cut negăsit: ' + pre); html = html.replace(m[0], ''); }
  // cutFaq: șterge întrebarea (h3) și răspunsul (p) următor
  for (const pre of (spec.cutFaq || [])) { const m = findEl(pre, 'h3'); must(m, 'cutFaq negăsit: ' + pre); const i = html.indexOf(m[0]); const rest = html.slice(i + m[0].length); const p = rest.match(/^\s*<p[^>]*>[\s\S]*?<\/p>\n?/); must(p, 'cutFaq fără răspuns'); html = html.slice(0, i) + rest.slice(p[0].length); }
  // tw: înlocuiește conținutul elementului care începe cu textul dat
  for (const [pre, inner] of (spec.tw || [])) { const m = findEl(pre); must(m, 'tw negăsit: ' + pre); html = html.replace(m[0], m[0].replace(m[3], inner)); }
  if (!spec.noBold) {
    // dacă primul paragraf începe cu un <strong> scurt (sub 40 de caractere), îl scoatem și îngroșăm toată prima propoziție
    const s0 = html.match(/(<\/div>\s*<p>)<strong>([^<]{1,39})<\/strong>/);
    if (s0) html = html.replace(s0[0], `${s0[1]}${s0[2]}`);
    const m = html.match(/(<\/div>\s*<p>)([^<]*?[.?!])(\s|<\/p>)/);
    must(m && m[2].length >= 40, 'prima propoziție nu poate fi îngroșată');
    html = html.replace(m[0], `${m[1]}<strong>${m[2]}</strong>${m[3]}`);
  }
  if (spec.studies) {
    const { id, title, html: body } = spec.studies;
    const faq = html.indexOf('<h2 id="intrebari-frecvente"'); must(faq > 0, 'fără FAQ');
    let at = faq;
    const box = html.lastIndexOf('<div style="margin: 30px 0; padding: 20px; background: #ffffff;', faq);
    if (box > 0 && faq - box < 1500 && /^\s*$/.test(html.slice(html.lastIndexOf('</div>', faq) + 6, faq))) at = box;
    if (spec.studiesBefore) { at = html.indexOf(spec.studiesBefore); must(at > 0, 'studiesBefore negăsit'); }
    html = html.slice(0, at) + `<h2 id="${id}">${title}</h2>\n${body.trim()}\n\n` + html.slice(at);
    const li = html.match(/<li[^>]*>\s*<a href="#intrebari-frecvente"/);
    if (li) html = html.replace(li[0], `<li><a href="#${id}">${title}</a></li>\n  ${li[0]}`);
    else { const c = html.indexOf('</ul>', html.indexOf('>Cuprins</h2>')); must(c > 0, 'fără cuprins'); html = html.slice(0, c) + `  <li><a href="#${id}">${title}</a></li>\n` + html.slice(c); }
  }
  if (spec.sources) {
    must(!html.includes('id="surse"'), 'are deja surse');
    const d = html.indexOf('<p><em>Informa'); must(d > 0, 'fără disclaimer');
    html = html.slice(0, d) + sourcesHtml(spec.sources) + '\n\n' + html.slice(d);
  }
  fs.writeFileSync(`new/${h}.html`, html);
  if (spec.over) fs.writeFileSync(`over/${h}.json`, JSON.stringify(spec.over));
  else if (fs.existsSync(`over/${h}.json`)) fs.rmSync(`over/${h}.json`);
  console.log('ok', h);
}
