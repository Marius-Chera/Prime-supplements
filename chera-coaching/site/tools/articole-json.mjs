// Extrage cele 10 articole din site/articole în articole-shopify.json (titlu, handle, tag, rezumat, body HTML)
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
const dir = "site/articole", out = [];
for (const f of readdirSync(dir).filter(f => f.endsWith(".html"))) {
  const h = readFileSync(`${dir}/${f}`, "utf8");
  const title = h.match(/<h1>([\s\S]*?)<\/h1>/)[1].trim();
  const eyebrow = h.match(/<p class="eyebrow">([\s\S]*?)<\/p>/)[1].trim();
  const tag = eyebrow.split("·")[0].trim();
  let body = h.match(/<article>([\s\S]*?)<\/article>/)[1].trim()
    .replace(/\.\.\/index\.html#evaluare/g, "/pages/evaluare")
    .replace(/\.\.\/evaluare\.html/g, "/pages/evaluare")
    .replace(/\.\.\/index\.html#programe/g, "/collections/programe")
    .replace(/\.\.\/index\.html#usi/g, "/#usi")
    .replace(/\.\.\/index\.html(#[\w-]+)?/g, (m, a) => "/" + (a || ""))
    .replace(/href="([\w-]+)\.html"/g, 'href="/blogs/articole/$1"')
    .replace(/ style="justify-self:start"/g, "");
  const first = body.match(/<p>([\s\S]*?)<\/p>/)[1].replace(/<[^>]+>/g, "");
  const summary = first.length > 220 ? first.slice(0, first.lastIndexOf(" ", 217)) + "…" : first;
  out.push({ handle: f.replace(".html", ""), title, tag, eyebrow, summary, body });
}
writeFileSync("articole-shopify.json", JSON.stringify(out, null, 1));
console.log(out.map(a => `${a.handle} | ${a.tag} | ${a.body.length}`).join("\n"));
