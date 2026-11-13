import fs from 'node:fs';
const hs = process.argv.slice(2);
const studyRe = /\b(studii(le)?|studiu(l)?|cercet[ăa]ri(le)?|cercet[ăa]tori(i)?|meta-analiz[ăa]|recenzi[ae] (sistematic|din))/i;
for (const h of hs) {
  const html = fs.readFileSync(`orig/${h}.html`,'utf8');
  const text = html.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  console.log(`\n===== ${h} (${text.split(' ').length} cuv)`);
  const afterBox = html.split('</div>').slice(1).join('</div>');
  const p1 = (html.match(/<\/div>\s*<p>([\s\S]*?)<\/p>/)||[])[1]||'?';
  console.log('P1:', p1.slice(0,400));
  console.log('H2:', [...html.matchAll(/<h2([^>]*)>([\s\S]*?)<\/h2>/g)].map(m=>(m[1].match(/id="([^"]+)"/)||[])[1]+'='+m[2].replace(/<[^>]+>/g,'').slice(0,50)).join(' | '));
  console.log('cuprins-faq:', /href="#intrebari-frecvente"/.test(html), 'disclaimer:', /<p><em>Informa/.test(html), 'colectie-p:', (html.match(/<p>[^<]*colec[^<]*<a href="\/collections[^>]*>[^<]*<\/a>[^<]*<\/p>/)||['-'])[0].slice(0,120));
  const paras=[...html.matchAll(/<(p|li)[^>]*>([\s\S]*?)<\/\1>/g)].map(m=>m[2]);
  paras.filter(p=>studyRe.test(p.replace(/<[^>]+>/g,''))&&!/pubmed\.ncbi|doi\.org|eur-lex/.test(p)&&!/href="#/.test(p)).forEach(p=>console.log('STUDIU-FARA-LINK:', p.replace(/<[^>]+>/g,'').slice(0,300)));
  const c = (text.match(/[^.]*contribuie la[^.]*\./g)||[]); console.log('contribuie:', c.length, c.slice(0,2).map(s=>s.slice(0,160)).join(' || '));
}
