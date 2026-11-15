// Amprenta textelor afișate (pentru verificarea scrierii pe PILOT): același algoritm rulează în browser pe .ppv.
// Rulare: node pagina-produs-vizuala/scripts/amprente.mjs h1 h2 ...  → {handle: hash}
/* Partea din browser (pagina primesupplements.ro, javascript_tool), cu exp = rezultatul acestui script:
const n=s=>String(s).normalize('NFC').replace(/\s+/g,' ').trim(); const H=a=>{let x=5381;for(const c of a.map(n).join('|'))x=((x*33)^c.codePointAt(0))>>>0;return x.toString(36)};
const T=(r,s)=>[...r.querySelectorAll(s)].map(e=>e.textContent); const res={};
await Promise.all(Object.keys(exp).map(async h=>{const t=await (await fetch('/products/'+h+'?preview_theme_id=194315649399&_x='+Date.now())).text();
 const r=new DOMParser().parseFromString(t,'text/html').querySelector('.ppv'); if(!r){res[h]='LIPSA';return}
 const a=[r.querySelector('.ppv-hero h2').textContent, r.querySelector('.ppv-intro').textContent, ...T(r,'.ppv-checks li'),
  ...[...r.querySelectorAll('.ppv-ing')].flatMap(e=>[e.querySelector('h4').textContent,e.querySelector('p').textContent]),
  ...[...r.querySelectorAll('.ppv-flav li')].flatMap(e=>[e.querySelector('b').textContent,e.querySelector('span').textContent])];
 const c=r.querySelector('.ppv-cur'); if(c){a.push(c.querySelector('h2').textContent); const i=c.querySelector('.ppv-cur__intro'); if(i)a.push(i.textContent);
  c.querySelectorAll('.ppv-q').forEach(q=>{a.push(q.querySelector('h3').textContent); q.querySelectorAll('p').forEach(p=>a.push(p.textContent))})}
 res[h]=H(a.filter(v=>v!=null&&n(v)!==''))}));
Object.keys(exp).filter(h=>res[h]!==exp[h])   // = lista produselor cu diferențe
Pentru „Beneficii” (chei <handle>#ben): r=document-ul paginii; b=r.querySelector('.pb') →
 H([b.querySelector('.pb-t'),b.querySelector('.pb-intro'),b.querySelector('.pb-cond'),...b.querySelectorAll('.pb-stats li')].flatMap(e=>!e?[]:e.matches('li')?[e.querySelector('b').textContent,e.querySelector('span').textContent]:[e.textContent])
   .concat([...b.querySelectorAll('.pb-card')].flatMap(c=>[c.querySelector('h3').textContent,c.querySelector('p').textContent]))
   .concat([...b.querySelectorAll('.pb-box:not(.pb-box--dark) h3, .pb-list span')].map(e=>e.textContent))
   .concat([...b.querySelectorAll('.pb-steps strong, .pb-steps span')].map(e=>e.textContent)).filter(v=>n(v)!==''))
*/
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'date');
const n = s => String(s).normalize('NFC').replace(/\s+/g, ' ').trim();
const h = a => { let x = 5381; for (const c of a.map(n).join('|')) x = ((x * 33) ^ c.codePointAt(0)) >>> 0; return x.toString(36); };
const out = {};
for (const k of process.argv.slice(2)) {
  const d = JSON.parse(readFileSync(join(dir, k + '.json'), 'utf8'));
  const c = d.curiozitati || {};
  const a = [d.titlu, d.intro.replace(/\[\[|\]\]/g, ''), ...(d.card_puncte?.puncte || []),
    ...(d.carduri_ingrediente?.carduri || []).flatMap(x => [x.titlu, x.text]),
    ...(d.arome || []).flatMap(x => [x.nume, x.nota]),
    c.titlu, c.intro, ...(c.sectiuni || []).flatMap(s => [s.intrebare, ...String(s.raspuns).split(' ¶ ')])];
  out[k] = h(a.filter(v => v != null && v !== ''));
  const b = d.beneficii;
  if (b) out[k + '#ben'] = h([b.titlu, b.intro, b.conditie, ...(b.cifre || []).flatMap(c => [c.valoare + (c.unitate || ''), c.eticheta]),
    ...(b.carduri || []).flatMap(c => [c.titlu, c.text]), b.de_ce?.titlu, ...(b.de_ce?.puncte || []), ...(b.pasi || []).flatMap(p => [p.titlu, p.text])]
    .filter(v => v != null && v !== ''));
}
console.log(JSON.stringify(out));
