// Lista de pinuri de produs din exportul GraphQL al produselor active (fără haine, doar în stoc).
import fs from 'fs';
const HAINE=process.argv[2]==='--haine'; const files=process.argv.slice(HAINE?3:2); const OUT=HAINE?'pinuri-haine':'pinuri-produse';
const n=files.flatMap(f=>JSON.parse(fs.readFileSync(f,'utf8')).data.products.nodes);
const clothes=/hanorac|maiou|tricou|îmbrăcăminte|pantalon|colan|bustier|șapc|geac/i;
const isClothes=p=>(clothes.test(p.productType||'')||/Set .*Hammer|Maiou|Tricou|MNX Hoodie|MNX Ribbed|Hanorac/i.test(p.title))&&p.productType!=='Shakere';
const sel=HAINE? n.filter(p=>isClothes(p)&&p.totalInventory>0&&p.featuredMedia?.image) : n.filter(p=>p.productType && !clothes.test(p.productType) && !/Set .*Hammer|Maiou|Tricou|MNX Hoodie|MNX Ribbed/i.test(p.title) && p.totalInventory>0 && p.featuredMedia?.image);
const prio=t=>HAINE?(/Prime/i.test(t)?0:/Hanorac/i.test(t)?1:/Tricou|Maiou/i.test(t)?2:3):/Cremă de orez|Oat Cream|Mic Dejun|Trio Cremă/i.test(t)?0:/Prime Whey|Pure Isolate|Starter/i.test(t)?1:/Creatin|Creapure/i.test(t)?2:3;
const strip=h=>(h||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const list=sel.map(p=>{const desc=(p.seo?.description||strip(p.descriptionHtml).slice(0,300)).trim().replace(/s*(Vezi detalii și comandă online|Comandă online|Comandă acum online).?$/i,'');
  return {handle:p.handle,title:p.title.slice(0,100),tag:(p.productType||'Haine de sală').toUpperCase(),img:p.featuredMedia.image.url,prio:prio(p.title),
   description:(desc+' Comandă pe primesupplements.ro, livrare în toată România.').slice(0,500),
   link:`https://primesupplements.ro/products/${p.handle}?utm_source=pinterest&utm_medium=social&utm_campaign=${HAINE?'pin-haine':'pin-produse'}`,
   keywords:HAINE?[(p.productType||'haine de sală').toLowerCase(),'haine de sală','îmbrăcăminte fitness','prime supplements']:[p.productType.toLowerCase(),'prime supplements','nutriție sportivă','suplimente'].join(', ')};});
list.sort((a,b)=>a.prio-b.prio);
list.forEach((a,i)=>a.file=(HAINE?'pinterest-haine-':'pinterest-produs-')+String(i+1).padStart(3,'0')+'.jpg');
fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(OUT+'/lista.json',JSON.stringify(list,null,1));
console.log(list.length, list.slice(0,8).map(x=>x.title).join(' | '));
