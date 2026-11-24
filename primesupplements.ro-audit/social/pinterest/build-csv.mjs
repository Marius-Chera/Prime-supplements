// CSV pentru Pinterest „Creează Pinuri în masă” din pinuri-articole/lista.json (pinurile sunt în Shopify Files).
import fs from 'fs';
const CDN='https://cdn.shopify.com/s/files/1/0917/5138/3415/files/';
const start=process.argv[2]||'2026-11-25'; const HOURS_UTC=[6,9,12,15,17,19]; // 08,11,14,17,19,21 ora României (UTC+2)
const list=JSON.parse(fs.readFileSync('pinuri-articole/lista.json','utf8'));
const prio=['Cremă de orez și ovăz – mic dejun','Proteine din zer – ghid','Creatină – ghid complet','Rețete cu proteine','Nutriție sportivă și suplimente','Vitamine și minerale','Antrenament la sală'];
const q=Object.fromEntries(prio.map(b=>[b,list.filter(x=>x.board===b).sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt))]));
const order=[]; while(order.length<list.length){ for(const b of prio){ const x=q[b].shift(); if(x) order.push(x); } }
const esc=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
const rows=[['Title','Media URL','Pinterest board','Thumbnail','Description','Link','Publish date','Keywords']];
order.forEach((a,i)=>{ const d=new Date(start+'T00:00:00Z'); d.setUTCDate(d.getUTCDate()+Math.floor(i/HOURS_UTC.length)); d.setUTCHours(HOURS_UTC[i%HOURS_UTC.length]);
  a.publish=d.toISOString().slice(0,19);
  rows.push([a.title,CDN+a.file,a.board,'',a.description,a.link,a.publish,a.keywords]); });
fs.writeFileSync('pinuri-articole/pinterest-articole.csv','\uFEFF'+rows.map(r=>r.map(esc).join(',')).join('\r\n'));
fs.writeFileSync('pinuri-articole/lista.json',JSON.stringify(list,null,1));
console.log(order.length,'pinuri;',order[0].publish,'→',order.at(-1).publish);
