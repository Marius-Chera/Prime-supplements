// Prototip local pentru Analiza de concurs: ia secțiunea din temă, înlocuiește Liquid cu valorile implicite
// și simulează coșul + formularul de contact (fără Shopify). Rulare: node site/tools/analiza-prototip.mjs
import { readFileSync, writeFileSync } from "node:fs";
const here = new URL("../../", import.meta.url);
const src = readFileSync(new URL("shopify-theme/sections/analiza-concurs.liquid", here), "utf8");
const schema = JSON.parse(src.match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
const def = Object.fromEntries(schema.settings.filter(s => "default" in s).map(s => [s.id, s.default]));
let html = src
  .replace(/{% schema %}[\s\S]*?{% endschema %}/, "")
  .replace(/{%-? comment -?%}[\s\S]*?{%-? endcomment -?%}/g, "")
  .replace(/{%-?[\s\S]*?-?%}/g, "")
  .replace(/{{ section\.settings\.(\w+)(?: \| strip)? }}/g, (_, k) => def[k] ?? "")
  .replace(/{{ up\.selected_or_first_available_variant\.id }}/, "PROTOTIP");
const mock = `<script>
/* simulare: coșul întoarce un link fals, FormSubmit și formularul de contact răspund OK (nimic nu pleacă) */
window.CHERA={whatsapp:"40757911908",customer:null};
const _f=window.fetch;window.fetch=async(u,o)=>{await new Promise(r=>setTimeout(r,300));
 if(u==="/cart/add.js"){const k=[...o.body.keys()].find(x=>x.startsWith("properties"));return new Response(JSON.stringify({key:"k"+Date.now(),properties:{[k.slice(11,-1)]:"https://cdn.shopify.com/prototip/"+o.body.get(k).name}}),{status:200});}
 if(String(u).startsWith("https://formsubmit.co/")){window.__LAST_MAIL=JSON.parse(o.body);return new Response(JSON.stringify({success:"true"}),{status:200});}
 if(u==="/cart/change.js")return new Response("{}",{status:200});
 if(u==="/contact"){window.__LAST_CONTACT=Object.fromEntries(o.body.entries());return new Response("ok",{status:200});}
 return _f(u,o);};
</script>`;
const page = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Analiza de concurs – prototip</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap">
<link rel="stylesheet" href="../shopify-theme/assets/theme.css">${mock}</head><body><main>${html}</main></body></html>`;
writeFileSync(new URL("site/analiza-concurs.html", here), page);
console.log("site/analiza-concurs.html", page.length);
