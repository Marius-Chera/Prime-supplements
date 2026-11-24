// CSV Pinterest pentru pinurile de produs (pinuri-produse/lista.json), panoul „Produse Prime Supplements”.
import fs from 'fs';
const CDN='https://cdn.shopify.com/s/files/1/0917/5138/3415/files/';
const start=process.argv[2]||'2026-11-25'; const SLOTS=[[8,0],[14,0],[18,30]]; // 10:00, 16:00, 20:30 ora României (UTC+2)
const list=JSON.parse(fs.readFileSync('pinuri-produse/lista.json','utf8'));
const groups=[0,1,2,3].map(p=>list.filter(x=>x.prio===p));
const order=[]; while(order.length<list.length){ for(const g of groups){ const x=g.shift(); if(x) order.push(x); } }
const esc=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
const rows=[['Title','Media URL','Pinterest board','Thumbnail','Description','Link','Publish date','Keywords']];
order.forEach((a,i)=>{ const d=new Date(start+'T00:00:00Z'); d.setUTCDate(d.getUTCDate()+Math.floor(i/SLOTS.length)); const [h,m]=SLOTS[i%SLOTS.length]; d.setUTCHours(h,m);
  a.publish=d.toISOString().slice(0,19); rows.push([a.title,CDN+a.file,'Produse Prime Supplements','',a.description,a.link,a.publish,a.keywords]); });
fs.writeFileSync('pinuri-produse/pinterest-produse.csv','\uFEFF'+rows.map(r=>r.map(esc).join(',')).join('\r\n'));
fs.writeFileSync('pinuri-produse/lista.json',JSON.stringify(list,null,1));
console.log(order.length,'pinuri;',order[0].publish,'→',order.at(-1).publish, '|', order.slice(0,6).map(x=>x.title.slice(0,30)).join(' / '));
