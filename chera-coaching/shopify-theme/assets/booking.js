/* Chera Protocol – calendarul de rezervare pentru sesiuni.
   Fiecare variantă a produsului = un interval liber, cu titlul „AAAA-LL-ZZ OO:MM” (ex. 2026-11-06 18:00), stoc 1.
   După plată stocul devine 0 și intervalul dispare din calendar. Orele sunt ora României (și pentru clienții din alt fus orar);
   intervalele care încep în mai puțin de data-min-ore ore (implicit 12) nu se mai arată. */
(function () {
  var root = document.getElementById("booking");
  if (!root) return;
  var slots = [];
  try { slots = JSON.parse((document.getElementById("booking-slots") || {}).textContent || "[]"); } catch (e) {}
  var idInput = document.getElementById("booking-variant");
  var labelInput = document.getElementById("booking-label");
  var summary = document.getElementById("booking-summary");
  var submit = document.getElementById("booking-submit");
  var form = root.closest("form");
  var MONTHS = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];
  var DAYS = ["duminică","luni","marți","miercuri","joi","vineri","sâmbătă"];
  var WD = ["L","Ma","Mi","J","V","S","D"];
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function parse(t) {
    var m = String(t).match(/(\d{4})-(\d{1,2})-(\d{1,2})\D+(\d{1,2})[:.](\d{2})/);
    if (m) return new Date(+m[1], m[2] - 1, +m[3], +m[4], +m[5]);
    m = String(t).match(/(\d{1,2})\.(\d{1,2})\.(\d{4})\D+(\d{1,2})[:.](\d{2})/);
    if (m) return new Date(+m[3], m[2] - 1, +m[1], +m[4], +m[5]);
    return null;
  }
  function key(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function label(d) { return cap(DAYS[d.getDay()]) + ", " + d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear() + ", ora " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + " (ora României)"; }
  // ora curentă din România, ca dată „locală” comparabilă cu intervalele
  function nowRo() {
    try {
      var p = {};
      new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Bucharest", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
        .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
      return new Date(+p.year, p.month - 1, +p.day, +p.hour, +p.minute);
    } catch (e) { return new Date(); }
  }
  var minOre = Number(root.getAttribute("data-min-ore") || 12);
  var now = new Date(nowRo().getTime() + minOre * 3600000);
  var items = slots
    .filter(function (s) { return s.a !== false; })
    .map(function (s) { return { id: s.id, t: s.t, d: parse(s.t) }; })
    .filter(function (s) { return s.d && s.d > now; })
    .sort(function (a, b) { return a.d - b.d; });
  var byDay = {};
  items.forEach(function (s) { var k = key(s.d); (byDay[k] = byDay[k] || []).push(s); });

  if (!items.length) {
    root.innerHTML = '<p class="muted">Momentan nu am intervale libere. Revino în câteva zile sau scrie-mi pe Instagram.</p>';
    if (submit) submit.disabled = true;
    return;
  }

  var first = new Date(items[0].d.getFullYear(), items[0].d.getMonth(), 1);
  var last = new Date(items[items.length - 1].d.getFullYear(), items[items.length - 1].d.getMonth(), 1);
  var view = new Date(first);
  var selectedDay = key(items[0].d), selectedSlot = null;

  function render() {
    var y = view.getFullYear(), m = view.getMonth();
    var h = '<div class="cal"><div class="cal-head">' +
      '<button type="button" class="cal-nav" data-nav="-1" aria-label="Luna anterioară"' + (view <= first ? " disabled" : "") + '>‹</button>' +
      '<b>' + MONTHS[m] + " " + y + '</b>' +
      '<button type="button" class="cal-nav" data-nav="1" aria-label="Luna următoare"' + (view >= last ? " disabled" : "") + '>›</button></div><div class="cal-grid">';
    WD.forEach(function (w) { h += '<span class="cal-wd">' + w + "</span>"; });
    var start = (new Date(y, m, 1).getDay() + 6) % 7;
    for (var i = 0; i < start; i++) h += "<span></span>";
    var dim = new Date(y, m + 1, 0).getDate();
    for (var d = 1; d <= dim; d++) {
      var k = y + "-" + pad(m + 1) + "-" + pad(d);
      h += byDay[k]
        ? '<button type="button" class="cal-day has' + (selectedDay === k ? " on" : "") + '" data-day="' + k + '" aria-label="' + d + " " + MONTHS[m] + ', ' + byDay[k].length + ' intervale">' + d + "</button>"
        : '<span class="cal-day">' + d + "</span>";
    }
    h += "</div></div>";
    if (selectedDay && byDay[selectedDay]) {
      var dd = byDay[selectedDay][0].d;
      h += '<div class="cal-times"><p class="muted">' + cap(DAYS[dd.getDay()]) + ", " + dd.getDate() + " " + MONTHS[dd.getMonth()] + '</p><div class="row" style="gap:8px">';
      byDay[selectedDay].forEach(function (s) {
        h += '<button type="button" class="opt time' + (selectedSlot && selectedSlot.id === s.id ? " on" : "") + '" data-slot="' + s.id + '">' + pad(s.d.getHours()) + ":" + pad(s.d.getMinutes()) + "</button>";
      });
      h += "</div></div>";
    } else {
      h += '<p class="muted">Alege o zi marcată cu roșu.</p>';
    }
    root.innerHTML = h;
  }

  function update() {
    if (selectedSlot) {
      var l = label(selectedSlot.d);
      if (idInput) idInput.value = selectedSlot.id;
      if (labelInput) labelInput.value = l;
      if (summary) { summary.hidden = false; summary.textContent = "Ai ales: " + l + "."; }
      if (submit) { submit.disabled = false; submit.textContent = submit.getAttribute("data-ready") || "Rezervă și plătește"; }
    } else {
      if (idInput) idInput.value = "";
      if (labelInput) labelInput.value = "";
      if (summary) summary.hidden = true;
      if (submit) { submit.disabled = true; submit.textContent = submit.getAttribute("data-idle") || "Alege data și ora"; }
    }
  }

  root.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b || b.disabled) return;
    if (b.getAttribute("data-nav")) { view = new Date(view.getFullYear(), view.getMonth() + Number(b.getAttribute("data-nav")), 1); render(); return; }
    if (b.getAttribute("data-day")) { selectedDay = b.getAttribute("data-day"); selectedSlot = null; update(); render(); return; }
    if (b.getAttribute("data-slot")) {
      var id = b.getAttribute("data-slot");
      selectedSlot = items.filter(function (s) { return String(s.id) === id; })[0] || null;
      update(); render();
    }
  });

  if (form) form.addEventListener("submit", function (e) {
    if (!idInput || !idInput.value) { e.preventDefault(); return; }
    if (form.getAttribute("data-demo")) {
      e.preventDefault();
      if (summary) { summary.hidden = false; summary.textContent = "Demonstrație: în magazin, aici se deschide plata cu cardul pentru " + (labelInput ? labelInput.value : "intervalul ales") + ". După plată, intervalul dispare din calendar."; }
    }
  });

  update();
  render();
})();
