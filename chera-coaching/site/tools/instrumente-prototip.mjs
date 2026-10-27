// Prototipuri locale pentru „Cât de departe ești de scenă” și „Revizuirea progresului”:
// ia secțiunile din temă, înlocuiește Liquid cu valorile implicite, leagă motorul assets/chera-instrument.js
// (inline, ca prototipul să meargă și deschis ca fișier) și simulează coșul, FormSubmit și formularul de contact (nimic nu pleacă). Rulare: node site/tools/instrumente-prototip.mjs
import { readFileSync, writeFileSync } from "node:fs";
const here = new URL("../../", import.meta.url);
const PROGRAME = ["Program Bikini · fesieri de 3 ori pe săptămână", "Program Classic Physique · avansați", "Program Men's Physique"];

for (const [sec, out] of [["distanta-scena", "cat-de-departe-de-scena.html"], ["revizuire-progres", "revizuire-progres.html"]]) {
  const src = readFileSync(new URL(`shopify-theme/sections/${sec}.liquid`, here), "utf8");
  const schema = JSON.parse(src.match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
  const def = Object.fromEntries(schema.settings.filter(s => "default" in s).map(s => [s.id, s.default]));
  let html = src
    .replace(/{% schema %}[\s\S]*?{% endschema %}/, "")
    .replace(/{%-? comment -?%}[\s\S]*?{%-? endcomment -?%}/g, "")
    .replace(/{%-? for p in collections\['programe'\]\.products -?%}[\s\S]*?{%-? endfor -?%}/, PROGRAME.map(t => `<option>${t}</option>`).join(""))
    .replace(/{%-? form 'contact'[^%]*%}/, `<form action="/contact" onsubmit="event.preventDefault();window.__POSTED=1">`)
    .replace(/{%-? endform -?%}/, "</form>")
    .replace(/{{ 'chera-instrument\.js' \| asset_url \| script_tag }}/, () => `<script>${readFileSync(new URL("shopify-theme/assets/chera-instrument.js", here), "utf8")}</script>`)
    .replace(/{%-?[\s\S]*?-?%}/g, "")
    .replace(/{{ section\.settings\.(\w+)(?: \| strip)? }}/g, (_, k) => def[k] ?? "")
    .replace(/{{ up\.selected_or_first_available_variant\.id }}/, "PROTOTIP");
  const mock = `<script>
/* simulare: coșul întoarce un link fals, FormSubmit răspunde OK (nimic nu pleacă) */
window.CHERA={whatsapp:"40757911908",customer:null};
const _f=window.fetch;window.fetch=async(u,o)=>{await new Promise(r=>setTimeout(r,200));
 if(u==="/cart/add.js"){const k=[...o.body.keys()].find(x=>x.startsWith("properties"));return new Response(JSON.stringify({key:"k"+Date.now(),properties:{[k.slice(11,-1)]:"https://cdn.shopify.com/prototip/"+o.body.get(k).name}}),{status:200});}
 if(String(u).startsWith("https://formsubmit.co/")){window.__LAST_MAIL=JSON.parse(o.body);return new Response(JSON.stringify({success:"true"}),{status:200});}
 if(u==="/cart/change.js")return new Response("{}",{status:200});
 return _f(u,o);};
</script>`;
  const page = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${def.title} – prototip</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap">
<style>${readFileSync(new URL("shopify-theme/assets/theme.css", here), "utf8")}</style>${mock}</head><body><main>${html}</main></body></html>`;
  writeFileSync(new URL(`site/${out}`, here), page);
  console.log(`site/${out}`, page.length, (page.match(/{%|{{/g) || []).length ? "LIQUID RĂMAS" : "ok");
}
