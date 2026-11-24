// Construiește lista de pinuri din articolele blogului (2 fișiere JSON exportate din Shopify Admin GraphQL).
import fs from 'fs';
const [f1,f2]=process.argv.slice(2);
const nodes=[...JSON.parse(fs.readFileSync(f1,'utf8')).data.articles.nodes, ...JSON.parse(fs.readFileSync(f2,'utf8')).data.articles.nodes];
const board=a=>{const t=a.tags.join(' ').toLowerCase(), ti=a.title.toLowerCase();
  if(/retete|rețet|desert|budinc|gustări|cum se prepară/.test(t+' '+ti)) return 'Rețete cu proteine';
  if(/crema-de-orez|cremă de orez|crema de orez|ovăz/.test(t+' '+ti)) return 'Cremă de orez și ovăz – mic dejun';
  if(/creatin/.test(t+ti)) return 'Creatină – ghid complet';
  if(/pudra-proteica|whey|izolat|gainer/.test(t+' '+ti)) return 'Proteine din zer – ghid';
  if(/vitamine|sănătate/.test(t)) return 'Vitamine și minerale';
  if(/antrenament|cardio|alerg/.test(ti) && !/supliment/.test(ti)) return 'Antrenament la sală';
  return 'Nutriție sportivă și suplimente';};
const tag=a=>{const c=a.tags.find(x=>!x.includes(':'));return (c||'Ghid').toUpperCase();};
const kw=a=>{const s=new Set();a.tags.filter(x=>x.startsWith('intent:')).forEach(x=>x.split(':').pop().split('-').join(' ').length>3&&s.add(x.split(':').pop().replace(/-/g,' ')));a.tags.filter(x=>!x.includes(':')).forEach(x=>s.add(x.toLowerCase()));s.add('nutriție sportivă');s.add('suplimente');return [...s].slice(0,6).join(', ');};
const seen=new Set();const list=[];
for(const a of nodes){ if(seen.has(a.handle)||!a.image) continue; seen.add(a.handle);
  const desc=(a.seo?.value||a.summary||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
  list.push({handle:a.handle,title:a.title.slice(0,100),board:board(a),tag:tag(a),img:a.image.url,w:a.image.width,h:a.image.height,
   description:(desc+' Citește ghidul complet pe primesupplements.ro.').slice(0,500),
   link:`https://primesupplements.ro/blogs/${a.blog.handle}/${a.handle}?utm_source=pinterest&utm_medium=social&utm_campaign=pin-articole`,
   keywords:kw(a),publishedAt:a.publishedAt});
}
fs.writeFileSync('pinuri-articole/lista.json',JSON.stringify(list,null,1));
const c={};list.forEach(x=>c[x.board]=(c[x.board]||0)+1);console.log(list.length,c);
