import fs from 'node:fs'; import {execFileSync} from 'node:child_process';
import { fileURLToPath } from 'node:url';
const SC=fileURLToPath(new URL('../../scor-articol.mjs', import.meta.url));
const dir = process.argv[2]||'orig'; const only = process.argv[3];
const M=JSON.parse(fs.readFileSync('meta50.json','utf8'));
const res=[];
fs.mkdirSync('m',{recursive:true});
M.forEach(([id,h,title,tt,td,alt],i)=>{
  if (only && !only.split(',').includes(h)) return;
  if (!fs.existsSync(`${dir}/${h}.html`)) return;
  const mf=`m/${h}.json`;
  const ov = fs.existsSync(`over/${h}.json`)?JSON.parse(fs.readFileSync(`over/${h}.json`,'utf8')):{};
  const meta={title:ov.title||title,seoTitle:ov.seoTitle||tt,seoDesc:ov.seoDesc||td,imageAlt:ov.imageAlt||alt,keyword:ov.keyword};
  fs.writeFileSync(mf, JSON.stringify(meta));
  const r=JSON.parse(execFileSync('node',[SC,`${dir}/${h}.html`,mf]).toString());
  res.push({i:i+1,h,id,...r,meta});
  console.log(`${i+1}\t${r.seo}\t${r.ai}\t${r.cuvinte}\t${r.pubmed}\t${h}\t${[...r.lipsuri_seo,...r.lipsuri_ai].map(s=>s.slice(0,70)).join(' | ')}`);
});
if (!only) fs.writeFileSync(`scores-${dir}.json`,JSON.stringify(res,null,1));
