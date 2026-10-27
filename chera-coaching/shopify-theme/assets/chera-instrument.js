/* Chera Protocol – motorul comun al instrumentelor gratuite cu răspuns în 48 h
   (Cât de departe ești de scenă, Revizuirea progresului). Analiza de concurs are codul ei, în secțiune.

   Pagina: un element [data-tool] cu
     data-prefix  cod de referință (ex. SC → SC-2810-K7QX)
     data-title   numele instrumentului (apare în subiectul e-mailului)
     data-variant varianta de produs pe care se încarcă pozele prin coș (linia se scoate imediat)
     data-mail    e-mailul (sau aliasul FormSubmit) care primește copia
   Pași: section[data-step="0..N"][data-name]; ultimul pas cu formular conține [data-send]; pasul N+1 = trimitere/gata.
   Câmpuri: input/select/textarea cu id și data-k (eticheta din e-mail); [required] = obligatoriu.
   Poze: .drop[data-zone][data-min][data-max][data-label] cu input[type=file], [data-thumbs=zonă], [data-info=zonă].
   Canal: .choice[data-channel] .opt[data-v]; acorduri: input[data-consent].
   Formularul de contact Shopify nativ: {% form 'contact' %} în [data-tool] (cu hCaptcha; fetch la /contact e refuzat), [data-cf-state].
   Calcule proprii: window.CHERA_TOOL_EXTRA = function(get){ return "text pentru e-mail"; } */
(function(){
  var root = document.querySelector("[data-tool]"); if(!root) return;
  var P = root.getAttribute("data-prefix") || "CP", TITLE = root.getAttribute("data-title") || "Instrument";
  var VARIANT = root.getAttribute("data-variant"), MAIL = (root.getAttribute("data-mail") || "").trim();
  var DRAFT = "chera-tool-" + P, SENT = "chera-tool-sent-" + P, MAX = 20 * 1048576;
  var q = function(s, el){ return (el || root).querySelector(s); }, qa = function(s, el){ return [].slice.call((el || root).querySelectorAll(s)); };
  var steps = qa("section[data-step]").sort(function(a, b){ return a.getAttribute("data-step") - b.getAttribute("data-step"); });
  var LAST = steps.length - 1, FORM_STEPS = LAST - 1; /* pasul 0 = intro, 1..FORM_STEPS = formular, LAST = trimitere */
  var cur = 0, channel = null, zones = {};
  var fields = qa("input[id],select[id],textarea[id]").filter(function(el){ return el.type !== "file" && el.type !== "checkbox" && !el.closest("form[action*='/contact']"); });
  var get = function(id){ var el = document.getElementById(id); return el ? String(el.value).trim() : ""; };

  /* ciornă locală (fără poze) */
  function saveDraft(){ try{ var d = {ch: channel}; fields.forEach(function(el){ if(el.value) d[el.id] = el.value; }); localStorage.setItem(DRAFT, JSON.stringify(d)); }catch(e){} }
  function loadDraft(){ try{ var d = JSON.parse(localStorage.getItem(DRAFT) || "null"); if(!d) return; fields.forEach(function(el){ if(d[el.id] != null) el.value = d[el.id]; }); if(d.ch) setChannel(d.ch); }catch(e){} }
  fields.forEach(function(el){ el.addEventListener("input", saveDraft); el.addEventListener("change", saveDraft); });
  if(window.CHERA && window.CHERA.customer){ var cu = window.CHERA.customer; var em = q("input[type=email]"), ph = q("input[type=tel]"); if(em && cu.email && !em.value) em.value = cu.email; if(ph && cu.phone && !ph.value) ph.value = cu.phone; }

  function setChannel(v){ channel = v; qa("[data-channel] .opt").forEach(function(o){ o.setAttribute("aria-checked", o.getAttribute("data-v") === v ? "true" : "false"); }); }
  qa("[data-channel] .opt").forEach(function(b){ b.addEventListener("click", function(){ setChannel(b.getAttribute("data-v")); saveDraft(); }); });

  /* hCaptcha-ul Shopify se încarcă la primul focus pe un câmp al formularului de contact */
  function warmCaptcha(){ var el = q("form[action*='/contact'] input[name='contact[email]']"); if(el) el.dispatchEvent(new FocusEvent("focusin", {bubbles: true})); }
  function captchaReady(){ return new Promise(function(res){ var t = 0; (function w(){ if(window.hcaptcha || t > 40) return res(); t++; setTimeout(w, 250); })(); }); }

  /* navigare */
  function show(n){
    cur = n;
    steps.forEach(function(s, i){ s.hidden = i !== n; });
    var p = q("[data-progress]");
    if(p){ p.hidden = !(n >= 1 && n <= FORM_STEPS);
      if(!p.hidden){ q("[data-step-name]", p).textContent = "Pasul " + n + " · " + steps[n].getAttribute("data-name"); q("[data-step-count]", p).textContent = n + " / " + FORM_STEPS; q("[data-fill]", p).style.width = Math.round((n - 0.5) / FORM_STEPS * 100) + "%"; } }
    if(n === FORM_STEPS) warmCaptcha();
    window.scrollTo({top: Math.max(0, root.getBoundingClientRect().top + window.scrollY - 90), behavior: "smooth"});
  }
  function err(n, list){ var el = q("[data-err]", steps[n]); if(!el) return !list.length; if(list.length){ el.hidden = false; el.textContent = "Mai trebuie: " + list.join(", ") + "."; return false; } el.hidden = true; return true; }
  function label(el){ var l = q("label[for='" + el.id + "']"); return l ? l.textContent.toLowerCase() : el.id; }
  function validate(n){
    var e = [];
    qa("[required]", steps[n]).forEach(function(el){ if(!String(el.value).trim()) e.push(label(el)); });
    qa("input[type=email]", steps[n]).forEach(function(el){ var v = el.value.trim(); if(v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) e.push("o adresă de e-mail validă"); });
    qa("input[type=tel]", steps[n]).forEach(function(el){ var v = el.value.replace(/[^\d+]/g, ""); if(v && !/^(\+?40|0)?7\d{8}$/.test(v) && !/^\+\d{8,15}$/.test(v)) e.push("un număr de telefon valid"); });
    qa(".drop[data-zone]", steps[n]).forEach(function(z){ var k = z.getAttribute("data-zone"), min = +(z.getAttribute("data-min") || 0), have = (zones[k] || []).length; if(have < min) e.push("cel puțin " + min + " poze la „" + z.getAttribute("data-label") + "” (ai " + have + ")"); });
    if(q("[data-channel]", steps[n]) && !channel) e.push("unde vrei răspunsul");
    if(qa("input[data-consent]", steps[n]).some(function(c){ return !c.checked; })) e.push("bifele de acord");
    return err(n, e);
  }
  qa("[data-go]").forEach(function(b){ b.addEventListener("click", function(){ show(+b.getAttribute("data-go")); }); });
  qa("[data-next]").forEach(function(b){ b.addEventListener("click", function(){ if(validate(cur)) show(+b.getAttribute("data-next")); }); });

  /* poze */
  function mb(n){ return (n / 1048576).toFixed(1).replace(".", ",") + " MB"; }
  qa(".drop[data-zone]").forEach(function(z){
    var k = z.getAttribute("data-zone"), max = +(z.getAttribute("data-max") || 8), min = +(z.getAttribute("data-min") || 0), input = q("input[type=file]", z);
    zones[k] = [];
    function render(){
      var box = q("[data-thumbs='" + k + "']"); box.innerHTML = "";
      zones[k].forEach(function(f, i){
        var d = document.createElement("div"); d.className = "thumb" + (f.size > MAX ? " big" : "");
        var img = document.createElement("img"); img.alt = "Poza " + (i + 1); img.src = URL.createObjectURL(f); img.onerror = function(){ img.remove(); };
        var s = document.createElement("small"); s.textContent = (i + 1) + " · " + mb(f.size) + (f.size > MAX ? " · prea mare" : "");
        var x = document.createElement("button"); x.type = "button"; x.setAttribute("aria-label", "Scoate poza " + (i + 1)); x.textContent = "×";
        x.addEventListener("click", function(){ zones[k].splice(i, 1); render(); });
        d.appendChild(img); d.appendChild(s); d.appendChild(x); box.appendChild(d);
      });
      var n = zones[k].length, big = zones[k].filter(function(f){ return f.size > MAX; }).length;
      q("[data-info='" + k + "']").textContent = n + (n === 1 ? " poză aleasă" : " poze alese") + (min ? " (minim " + min + ", maxim " + max + ")" : " (maxim " + max + ")") + "." + (big ? " " + (big === 1 ? "O poză depășește" : big + " poze depășesc") + " 20 MB: micșoreaz-o sau trimite-mi-o pe e-mail după ce trimiți formularul." : "");
    }
    function add(list){
      var e = [];
      [].slice.call(list).forEach(function(f){
        if(!/^image\//.test(f.type) && !/\.(jpe?g|png|heic|heif|webp)$/i.test(f.name)) return e.push(f.name + " nu e o poză");
        if(zones[k].length >= max) return e.push("maxim " + max + " poze");
        if(zones[k].some(function(g){ return g.name === f.name && g.size === f.size; })) return;
        zones[k].push(f);
      });
      render(); var st = steps.indexOf(z.closest("section[data-step]")); err(st, e.filter(function(v, i, a){ return a.indexOf(v) === i; }));
    }
    input.addEventListener("change", function(){ add(this.files); this.value = ""; });
    ["dragenter","dragover"].forEach(function(t){ z.addEventListener(t, function(e){ e.preventDefault(); z.classList.add("over"); }); });
    ["dragleave","drop"].forEach(function(t){ z.addEventListener(t, function(e){ e.preventDefault(); z.classList.remove("over"); }); });
    z.addEventListener("drop", function(e){ if(e.dataTransfer && e.dataTransfer.files) add(e.dataTransfer.files); });
    render();
  });

  /* o poză urcă pe serverul Shopify prin coș, apoi linia se scoate */
  function upload(f, key){
    var fd = new FormData(), prop = "_" + TITLE + " " + key;
    fd.append("id", VARIANT); fd.append("quantity", "1"); fd.append("properties[" + prop + "]", f, f.name || (key + ".jpg"));
    return fetch("/cart/add.js", {method: "POST", body: fd, headers: {"Accept": "application/json"}, credentials: "same-origin"})
      .then(function(r){ if(!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function(j){
        var url = j.properties && j.properties[prop];
        return fetch("/cart/change.js", {method: "POST", headers: {"Content-Type": "application/json", "Accept": "application/json"}, body: JSON.stringify({id: j.key, quantity: 0}), credentials: "same-origin"}).catch(function(){})
          .then(function(){ if(!url || !/^https?:/.test(url)) throw new Error("fără link"); return url; });
      });
  }

  function code(){ var c = "", a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; for(var i = 0; i < 4; i++) c += a[Math.floor(Math.random() * a.length)]; var d = new Date(); return P + "-" + String(d.getDate()).padStart(2, "0") + String(d.getMonth() + 1).padStart(2, "0") + "-" + c; }
  function blocks(){
    return steps.slice(1, LAST).map(function(s){
      var lines = qa("[data-k]", s).filter(function(el){ var h = el.closest("[hidden]"); return !h || h === s; }).map(function(el){ return el.getAttribute("data-k") + ": " + (String(el.value).trim() || "-"); });
      return lines.length ? "== " + s.getAttribute("data-name") + " ==\n" + lines.join("\n") : "";
    }).filter(Boolean).join("\n\n");
  }
  function nameOf(){ var el = q("[data-k][autocomplete=name]") || q("[data-k]"); return el ? el.value.trim() : ""; }
  function emailOf(){ var el = q("input[type=email][data-k]"); return el ? el.value.trim() : ""; }
  function phoneOf(){ var el = q("input[type=tel][data-k]"); return el ? el.value.trim() : ""; }

  q("[data-send]").addEventListener("click", function(){
    if(!validate(cur)) return;
    var btn = this; btn.disabled = true;
    var ref = code(), links = {}, bad = [], list = [];
    Object.keys(zones).forEach(function(k){ var lab = q(".drop[data-zone='" + k + "']").getAttribute("data-label"); links[lab] = []; zones[k].forEach(function(f, i){ if(f.size > MAX) bad.push(lab + " " + (i + 1) + " (" + mb(f.size) + ")"); else list.push({f: f, lab: lab, key: k + "-" + (i + 1)}); }); });
    show(LAST); q("[data-done]").hidden = true; q("[data-sending]").hidden = false;
    var msg = q("[data-sendmsg]"), fill = q("[data-upfill]"), chain = Promise.resolve();
    list.forEach(function(it, i){
      chain = chain.then(function(){
        msg.textContent = "Încarc poza " + (i + 1) + " din " + list.length + " (" + mb(it.f.size) + ")…"; fill.style.width = Math.round(i / (list.length + 1) * 100) + "%";
        return upload(it.f, it.key).then(function(u){ links[it.lab].push(u); }, function(){ bad.push(it.lab + " (" + (it.f.name || "poză") + ")"); });
      });
    });
    chain.then(function(){
      msg.textContent = "Trimit datele…"; fill.style.width = "92%";
      var extra = typeof window.CHERA_TOOL_EXTRA === "function" ? (function(){ try{ return window.CHERA_TOOL_EXTRA(get) || ""; }catch(e){ return ""; } })() : "";
      var photos = Object.keys(links).map(function(lab){ return lab + ":\n" + (links[lab].map(function(u, i){ return "  " + (i + 1) + ". " + u; }).join("\n") || "  -"); }).join("\n");
      var nPhotos = Object.keys(links).reduce(function(s, k){ return s + links[k].length; }, 0);
      var body = [TITLE.toUpperCase() + " · cod " + ref, "Răspuns pe: " + (channel || "-"), "", blocks(),
        Object.keys(links).length ? "\n== Poze (" + nPhotos + ") ==\n" + photos + (bad.length ? "\nNEURCATE (le trimite pe e-mail): " + bad.join(", ") : "") : "",
        extra ? "\n== Calculul automat (doar pentru tine, nu apare pe pagină) ==\n" + extra : ""].join("\n");
      var name = nameOf(), subject = TITLE + " · " + ref + " · " + name;
      var st = {ref: ref, first: name.split(" ")[0], channel: channel, n: nPhotos, bad: bad, subject: subject, body: body.slice(0, 1800), long: body.length > 1800};
      if(MAIL){ var fsBody = JSON.stringify({_subject: subject, _template: "box", _captcha: "false", _replyto: emailOf(), name: name, email: emailOf(), message: body});
        try{ fetch("https://formsubmit.co/ajax/" + encodeURIComponent(MAIL), {method: "POST", headers: {"Content-Type": "application/json", "Accept": "application/json"}, body: fsBody, keepalive: fsBody.length < 60000}).catch(function(){}); }catch(e){} }
      var cf = q("form[action*='/contact']");
      if(!cf){ done(st, false); return; }
      var set = function(n, v){ var el = q("[name='" + n + "']", cf); if(el) el.value = v; };
      set("contact[email]", emailOf()); set("contact[name]", name); set("contact[Telefon]", phoneOf()); set("contact[Subiect]", subject); set("contact[Răspuns pe]", channel || "-"); set("contact[body]", body);
      try{ sessionStorage.setItem(SENT, JSON.stringify(st)); }catch(e){}
      msg.textContent = "Aproape gata…"; fill.style.width = "96%";
      warmCaptcha();
      return captchaReady().then(function(){ return new Promise(function(r){ setTimeout(r, 800); }); }).then(function(){ if(cf.requestSubmit) cf.requestSubmit(); else cf.submit(); });
    });
  });

  function mailto(subject, text){ return "mailto:" + (/@/.test(MAIL) ? MAIL : "") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text); }
  function done(st, sent){
    show(LAST); q("[data-sending]").hidden = true; q("[data-done]").hidden = false; q("[data-code]").textContent = st.ref;
    var btn = q("[data-mailbtn]"), warn = q("[data-warn]");
    if(sent){
      try{ localStorage.removeItem(DRAFT); }catch(e){}
      q("[data-done-text]").textContent = (st.first ? st.first + ", am" : "Am") + " primit datele tale" + (st.n ? " și " + st.n + (st.n === 1 ? " poză" : " poze") : "") + ". Îți răspund " + (st.channel === "e-mail" ? "pe e-mail" : "pe WhatsApp") + " în maximum 48 de ore. Păstrează codul de mai sus.";
      if(st.bad && st.bad.length && btn){
        warn.hidden = false; warn.innerHTML = "<b>Unele poze n-au urcat: " + st.bad.join(", ") + ".</b><span>Trimite-mi-le pe e-mail ca atașament sau ca link, cu codul " + st.ref + " în subiect.</span>";
        btn.hidden = false; btn.textContent = "Trimite pozele lipsă pe e-mail"; btn.href = mailto(st.subject + " · poze lipsă", "Salut, Marius! Îți trimit pozele care n-au urcat pe site: " + st.bad.join(", ") + ".");
      }
    } else {
      q("[data-done-title]").textContent = "Mai e un pas: trimite-mi datele pe e-mail.";
      q("[data-done-text]").textContent = "Nu am putut trimite automat formularul. Apasă butonul de mai jos: se deschide aplicația de e-mail cu datele tale; trimite mesajul și îți răspund în maximum 48 de ore. Ce ai scris rămâne salvat pe acest dispozitiv.";
      if(btn){ btn.hidden = false; btn.textContent = "Trimite pe e-mail"; btn.href = mailto(st.subject, st.body); }
    }
    var f = q("[data-upfill]"); if(f) f.style.width = "100%";
  }

  loadDraft();
  var back = null; try{ back = JSON.parse(sessionStorage.getItem(SENT) || "null"); }catch(e){}
  var cs = q("[data-cf-state]"), posted = (cs && cs.getAttribute("data-ok") === "1") || /[?&]contact_posted=true/.test(location.search), failed = cs && cs.getAttribute("data-err") === "1";
  if(back && (posted || failed)){
    try{ sessionStorage.removeItem(SENT); history.replaceState(null, "", location.pathname); }catch(e){}
    done(back, posted);
    setTimeout(function(){ window.scrollTo({top: Math.max(0, root.getBoundingClientRect().top + window.scrollY - 90)}); }, 60);
  }
  else if(/[?&]start=1/.test(location.search)) show(1); else show(0);
})();
