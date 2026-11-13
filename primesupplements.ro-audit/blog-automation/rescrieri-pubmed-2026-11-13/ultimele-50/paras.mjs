import fs from 'node:fs';
const [h, min] = [process.argv[2], +(process.argv[3]||0)];
const html = fs.readFileSync(`orig/${h}.html`,'utf8');
let i=0; for (const m of html.matchAll(/<(p|li|h2|h3|td)[^>]*>([\s\S]*?)<\/\1>/g)) { const t=m[2].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim(); const w=t.split(' ').length; if (w>=min || /h2|h3/.test(m[1])) console.log(`${i++} [${m[1]} ${w}] ${t}`); }
