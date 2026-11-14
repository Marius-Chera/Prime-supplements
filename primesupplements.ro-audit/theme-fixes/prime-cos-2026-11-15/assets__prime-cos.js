/* Prime Coș – estimare livrare + acțiuni coș (cod propriu Prime Supplements, 15.11.2026) */
(function () {
  if (window.__primeCos) return;
  window.__primeCos = true;

  /* ---------- 1. Estimare livrare ---------- */
  var TZ = 'Europe/Bucharest';
  var CUTOFF_H = 14; // predare zilnică la Cargus, luni–vineri
  // Sărbători legale România 2026–2027 (Cargus nu ridică și nu livrează)
  var SARBATORI = {
    '2026-01-01': 1, '2026-01-02': 1, '2026-01-06': 1, '2026-01-07': 1, '2026-01-24': 1,
    '2026-04-10': 1, '2026-04-12': 1, '2026-04-13': 1, '2026-05-01': 1, '2026-05-31': 1,
    '2026-06-01': 1, '2026-08-15': 1, '2026-11-30': 1, '2026-12-01': 1, '2026-12-25': 1, '2026-12-26': 1,
    '2027-01-01': 1, '2027-01-02': 1, '2027-01-06': 1, '2027-01-07': 1, '2027-01-24': 1,
    '2027-04-30': 1, '2027-05-01': 1, '2027-05-02': 1, '2027-05-03': 1, '2027-06-01': 1,
    '2027-06-20': 1, '2027-06-21': 1, '2027-08-15': 1, '2027-11-30': 1, '2027-12-01': 1,
    '2027-12-25': 1, '2027-12-26': 1
  };
  var ZILE = ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'];
  var LUNI = ['ian.', 'feb.', 'mar.', 'apr.', 'mai', 'iun.', 'iul.', 'aug.', 'sept.', 'oct.', 'nov.', 'dec.'];

  function acumRo() {
    var o = {};
    new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
      .formatToParts(new Date()).forEach(function (x) { o[x.type] = x.value; });
    return { zi: new Date(Date.UTC(+o.year, +o.month - 1, +o.day)), h: (+o.hour) % 24, m: +o.minute };
  }
  function iso(d) { return d.toISOString().slice(0, 10); }
  function plus(d, n) { return new Date(d.getTime() + n * 864e5); }
  function lucratoare(d) { var w = d.getUTCDay(); return w > 0 && w < 6 && !SARBATORI[iso(d)]; }
  function urmatoarea(d) { do { d = plus(d, 1); } while (!lucratoare(d)); return d; }
  function fmt(d) { return ZILE[d.getUTCDay()] + ', ' + d.getUTCDate() + ' ' + LUNI[d.getUTCMonth()]; }

  function calcul() {
    var n = acumRo();
    var azi = lucratoare(n.zi) && n.h < CUTOFF_H;
    var pleaca = azi ? n.zi : urmatoarea(n.zi);
    var a = urmatoarea(pleaca), b = urmatoarea(a);
    var sub;
    if (azi) {
      var rest = CUTOFF_H * 60 - (n.h * 60 + n.m);
      var dur = rest >= 60 ? Math.floor(rest / 60) + ' h ' + (rest % 60) + ' min' : rest + ' min';
      sub = 'Comanzi în <b>' + dur + '</b> și coletul pleacă <b>azi</b>.';
    } else {
      var maine = iso(pleaca) === iso(plus(n.zi, 1));
      sub = 'Comanzi acum și coletul pleacă <b>' + (maine ? 'mâine, ' : '') + ZILE[pleaca.getUTCDay()] + '</b>.';
    }
    var scurt = 'ajunge ' + fmt(a);
    return { azi: azi, main: 'Ajunge ' + fmt(a) + ' – ' + fmt(b), scurt: scurt.replace(/\.$/, ''), sub: sub };
  }

  function randeaza() {
    var c = calcul();
    document.querySelectorAll('.pc-livrare').forEach(function (el) {
      var m = el.querySelector('[data-pc-main]'), s = el.querySelector('[data-pc-sub]');
      if (el.classList.contains('pc-livrare--compact')) {
        if (m) m.innerHTML = (c.azi ? 'Comanzi azi până la 14:00 și ' : 'Comanzi acum și ') + '<b>' + c.scurt + '</b>.';
      } else {
        if (m) m.textContent = c.main;
        if (s) s.innerHTML = c.sub;
      }
      el.classList.toggle('pc-livrare--azi', c.azi);
      el.removeAttribute('data-pc-pending');
    });
  }
  randeaza();
  document.addEventListener('DOMContentLoaded', randeaza);
  setInterval(randeaza, 60000);

  // Varianta fără stoc: ascundem estimarea (tema trimite variant:change pe formularul produsului)
  document.addEventListener('variant:change', function (e) {
    var v = e.detail && e.detail.variant;
    document.querySelectorAll('.pc-livrare[data-pc-product]').forEach(function (el) { el.hidden = !(v && v.available); });
  }, true);

  /* ---------- 2. Carduri: prețul urmează varianta aleasă ---------- */
  document.addEventListener('change', function (e) {
    var s = e.target.closest && e.target.closest('.pc-card__select');
    if (!s) return;
    var o = s.options[s.selectedIndex], p = s.form.querySelector('[data-pc-price]');
    if (o && p) p.textContent = o.getAttribute('data-price');
  });

  /* ---------- 3. Coș: adăugare + schimb (pachet / variantă mai mare) ---------- */
  function json(url, body) {
    return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { if (!r.ok) return r.json().then(function (j) { throw new Error(j.description || j.message || 'Eroare'); }); return r.json(); });
  }
  function ocupat(btn, on) { if (btn) { btn.disabled = on; btn.setAttribute('aria-busy', on ? 'true' : 'false'); } }
  function eroare(el, msg) {
    var box = el.closest('.pc-offer, .pc-card');
    var p = box && box.querySelector('.pc-err');
    if (!p && box) { p = document.createElement('p'); p.className = 'pc-err'; p.setAttribute('role', 'alert'); box.appendChild(p); }
    if (p) p.textContent = msg || 'Nu am putut actualiza coșul. Încearcă din nou.';
  }

  document.addEventListener('submit', function (e) {
    var f = e.target.closest && e.target.closest('form.pc-add-js');
    if (!f) return;
    e.preventDefault();
    var fd = new FormData(f), btn = f.querySelector('button[type=submit]');
    ocupat(btn, true);
    json('/cart/add.js', { items: [{ id: +fd.get('id'), quantity: 1, properties: { _sursa: fd.get('properties[_sursa]') } }] })
      .then(function () { location.reload(); })
      .catch(function (err) { ocupat(btn, false); eroare(f, err.message); });
  });

  function alegeVarianta(handle, titluri) {
    return fetch('/products/' + handle + '.js').then(function (r) { return r.json(); }).then(function (p) {
      var best = null, scor = -1;
      p.variants.forEach(function (v) {
        if (!v.available) return;
        var s = 0;
        (v.options || []).forEach(function (o) { if (titluri.some(function (t) { return t.indexOf(o) > -1; })) s++; });
        if (s > scor) { scor = s; best = v; }
      });
      if (!best) throw new Error('Pachetul nu mai are stoc.');
      return best.id;
    });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.pc-swap');
    if (!b) return;
    e.preventDefault();
    ocupat(b, true);
    var remove = JSON.parse(b.getAttribute('data-remove') || '[]');
    var titluri = JSON.parse(b.getAttribute('data-match') || '[]');
    var h = b.getAttribute('data-add-handle'), v = b.getAttribute('data-add-variant');
    (h ? alegeVarianta(h, titluri) : Promise.resolve(+v))
      .then(function (id) { return json('/cart/add.js', { items: [{ id: id, quantity: 1, properties: { _sursa: b.getAttribute('data-sursa') } }] }); })
      .then(function () {
        var upd = {};
        remove.forEach(function (r) { upd[r.key] = r.qty; });
        return Object.keys(upd).length ? json('/cart/update.js', { updates: upd }) : null;
      })
      .then(function () { location.reload(); })
      .catch(function (err) { ocupat(b, false); eroare(b, err.message); });
  });
})();
