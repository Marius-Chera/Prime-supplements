/* Chera Protocol – theme.js: galerie, formular check-in, mici utilitare. Evaluarea e în quiz.js. */
(function () {
  // Galeria de rezultate: 8 vizibile + "Vezi toate"
  document.querySelectorAll("[data-gallery]").forEach(function (g) {
    var btn = g.parentElement.querySelector("[data-gallery-more]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var hid = g.querySelectorAll("figure[hidden]");
      if (hid.length) { hid.forEach(function (f) { f.hidden = false; }); btn.textContent = btn.dataset.less || "Arată mai puține"; }
      else { g.querySelectorAll("figure").forEach(function (f, i) { if (i >= 8) f.hidden = true; }); btn.textContent = btn.dataset.more || "Vezi toate pozele"; }
    });
  });

  // Check-in săptămânal (zona clientului) → receptor Google (Apps Script) + text pentru WhatsApp
  var form = document.getElementById("checkin-form");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var st = document.getElementById("checkin-status");
      var data = Object.fromEntries(new FormData(form).entries());
      data.kind = "checkin"; data.ts = new Date().toISOString();
      if (window.CHERA && window.CHERA.customer) { data.customer_id = window.CHERA.customer.id; data.name = window.CHERA.customer.name; data.email = window.CHERA.customer.email; data.phone = window.CHERA.customer.phone; }
      var text = "Check-in " + new Date().toLocaleDateString("ro-RO") + "\nGreutate: " + (data.weight || "-") + " kg\nSomn: " + (data.sleep || "-") + "\nEnergie: " + (data.energy || "-") + "/10\nAderență: " + (data.adherence || "-") + "/10\nObservații: " + (data.notes || "-") + "\n(pozele le trimit aici, în WhatsApp)";
      var wa = document.getElementById("checkin-wa");
      if (wa && window.CHERA && window.CHERA.whatsapp) { wa.href = "https://wa.me/" + window.CHERA.whatsapp + "?text=" + encodeURIComponent(text); wa.hidden = false; }
      var endpoint = form.dataset.endpoint || (window.CHERA && window.CHERA.endpoint) || "";
      if (!endpoint) { st.textContent = "Check-in pregătit. Apasă butonul de WhatsApp ca să mi-l trimiți cu pozele."; st.className = "ok"; return; }
      try { await fetch(endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(data) }); st.textContent = "Check-in trimis. Pozele le trimiți pe WhatsApp cu butonul de mai jos."; st.className = "ok"; }
      catch (err) { st.textContent = "Nu am putut trimite automat. Apasă butonul de WhatsApp și trimite-mi check-in-ul acolo."; st.className = "err"; }
    });
  }
})();
