// Evaluarea gratuită: trimiterea prin formularul de contact Shopify nativ (cu hCaptcha) + copie pe e-mail prin FormSubmit.
// Se aplică pe assets/quiz.js (tema din repo) și pe live/assets/quiz.js (fișierul combinat din tema publicată).
// Rulare: node site/tools/patch-evaluare-captcha.mjs
import { readFileSync, writeFileSync } from "node:fs";
const theme = new URL("../../shopify-theme/", import.meta.url);
const files = ["assets/quiz.js", "live/assets/quiz.js"];

const oldContact = /\/\* fără receptor Google: trimit prin formularul de contact Shopify[\s\S]*?\n}\n/;
const newContact = `/* fără receptor Google: (1) copie pe e-mail prin FormSubmit (adresa din setarea secțiunii evaluare),
   (2) formularul de contact Shopify nativ, cu hCaptcha (fetch la /contact e refuzat de CAPTCHA). Pagina se reîncarcă și reafișează rezultatul. */
function contactParts(){
  const c=state.ctx, r=state.result;
  return {
    subject:\`Evaluare gratuită · PROFIL \${r.code} · \${c.name}\`,
    context:\`obiectiv: \${c.goal} · ani de sală: \${c.years} · somn: \${c.sleep} · cafea: \${c.caffeine} · antrenamente/săpt: \${c.days}\`,
    body:(state.summary||"")+\`\\n\\nScoruri natura D\${r.scoresA.D} A\${r.scoresA.A} G\${r.scoresA.G} S\${r.scoresA.S} · echilibru D\${r.scoresB.D} A\${r.scoresB.A} G\${r.scoresB.G} S\${r.scoresB.S}\`
  };
}
async function submitContact(st){
  const c=state.ctx, p=contactParts(), cf=$("ev-contact-form"), cfg=$("ev-cfg"), mail=cfg?(cfg.dataset.mail||"").trim():"";
  const channel=c.channel==="email"?"e-mail":"WhatsApp";
  st.textContent="Trimit rezultatul la mine…";
  if(mail){
    const fsBody=JSON.stringify({_subject:p.subject,_template:"box",_captcha:"false",_replyto:c.email,name:c.name,email:c.email,
      message:\`Telefon: \${c.phone}\\nOraș: \${c.city||"-"}\\nRăspuns pe: \${channel}\\n\${p.context}\\n\\n\${p.body}\`});
    try{ fetch("https://formsubmit.co/ajax/"+encodeURIComponent(mail),{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:fsBody,keepalive:fsBody.length<60000}).catch(()=>{}); }catch(e){}
  }
  if(!cf){ st.textContent="Nu am putut trimite rezultatul automat. Apasă butonul de mai jos și trimite-mi textul pe WhatsApp."; return; }
  const set=(id,v)=>{ const el=$(id); if(el) el.value=v; };
  set("ev-cf-email",c.email); set("ev-cf-name",c.name); set("ev-cf-phone",c.phone); set("ev-cf-city",c.city||"-");
  set("ev-cf-subject",p.subject); set("ev-cf-channel",channel); set("ev-cf-context",p.context); set("ev-cf-body",p.body);
  try{ sessionStorage.setItem("cp-neuro-sent","1"); }catch(e){}
  /* hCaptcha-ul Shopify se încarcă la primul focus pe un câmp al formularului */
  $("ev-cf-email").dispatchEvent(new FocusEvent("focusin",{bubbles:true}));
  for(let i=0;i<40 && !window.hcaptcha;i++) await new Promise(r=>setTimeout(r,250));
  await new Promise(r=>setTimeout(r,800));
  if(cf.requestSubmit) cf.requestSubmit(); else cf.submit();
}
`;

const oldResume = `if(state.result && state.ctx){ /* finished before: show intro, keep data */ }`;
const newResume = `/* întoarcerea după formularul de contact Shopify: reafișez rezultatul cu starea trimiterii */
let sentBack=false; try{ sentBack=sessionStorage.getItem("cp-neuro-sent")==="1"; }catch(e){}
const cfState=$("ev-cf-state"), cfPosted=(cfState&&cfState.dataset.ok==="1")||/[?&]contact_posted=true/.test(location.search), cfFailed=!!(cfState&&cfState.dataset.err==="1");
if(sentBack && state.result && state.ctx && (cfPosted||cfFailed)){
  try{ sessionStorage.removeItem("cp-neuro-sent"); history.replaceState(null,"",location.pathname); }catch(e){}
  buildResult(); show("result");
  $("r-sendstatus").textContent = cfPosted
    ? (state.ctx.channel==="email" ? "Rezultatul a ajuns la mine. Îți scriu pe e-mail cu planul de pornire în cel mult 24 de ore." : "Rezultatul a ajuns la mine. Îți scriu pe WhatsApp în cel mult 24 de ore.")
    : "Nu am putut trimite rezultatul automat. Apasă butonul de mai jos și trimite-mi textul pe WhatsApp.";
}
else if(state.result && state.ctx){ /* finished before: show intro, keep data */ }`;

for (const f of files) {
  const url = new URL(f, theme);
  let s = readFileSync(url, "utf8");
  if (s.includes("contactParts()")) { console.log(f, "deja modificat"); continue; }
  const rep = (a, b) => { const n = s.replace(a, b); if (n === s) throw new Error(f + ": nu găsesc " + String(a).slice(0, 60)); s = n; };
  rep("  save();\n  submit();\n}", "  save();\n}");
  rep(`$("btn-result").addEventListener("click",()=>{ if(!validateCtx()) return; buildResult(); show("result"); });`,
      `$("btn-result").addEventListener("click",()=>{ if(!validateCtx()) return; buildResult(); show("result"); submit(); });`);
  rep(oldContact, newContact);
  rep(oldResume, newResume);
  writeFileSync(url, s);
  console.log(f, "OK", s.length);
}
