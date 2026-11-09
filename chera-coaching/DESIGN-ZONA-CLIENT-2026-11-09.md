# Chera Coaching – redesign zona de client (chat, meniu, „Planul actual”): analiză și paleta propusă (9.11.2026)

Cererea lui Marius (9.11.2026, brief în 5 pași): redesign complet al zonei de client – chatul, meniul și butoanele din chat, secțiunea „Planul actual” – în culori deschise, în ton cu site-ul, ușor de folosit zilnic de pe telefon. **Pasul 1 = analiză fără modificări, backup, rezumat + paletă, apoi așteaptă confirmarea.** Acest fișier e Pasul 1. Nimic din cod nu a fost schimbat.

---

## 1. Ce am găsit în repo înainte să propun (regula proprietarului)

- **Site-ul (tema Shopify) e deja deschis din 31.10.2026** – paleta „smooth” (`DESIGN-PALETA-SMOOTH-2026-10-31.md`): fundal crem `#f3efe8`, text ink `#111b21`, roșu temperat `#a8322b`. Pagina de chat din site (`/apps/chat`) se randează în layout-ul temei, deci **pe site chatul nu mai e negru** (verificat azi pe live: `body` = `rgb(243,239,232)`, caseta de chat = „WhatsApp light”, bule albe / roz pal).
- **Unde e negru acum (de aici vine cererea):**
  1. **Aplicația mobilă** `chera-hub-app` (Expo, iOS/Android, testată de Marius în Expo Go pe 1.11): `src/constants/theme.ts` spune „Doar mod întunecat”: fundal `#0e0d0d`, carduri `#161414`, bule proprii `#8f1a14`, bule celălalt `#262322`; `app.json` are `userInterfaceStyle: dark`, `backgroundColor: #0e0d0d` (splash, Android).
  2. **PWA-ul din site** (`chera-hub/src/ui/pwa.ts`): `theme_color` și `background_color` = `#0e0d0d` → bara de sus și ecranul de pornire sunt negre când chatul e adăugat pe ecranul principal al telefonului.
  3. **Previzualizarea locală** (`wrapForDev` în `client-page.ts`): `:root` negru vechi (`#0e0d0d`, roșu `#e1251b`) – doar pe `npm run dev`, nu pe live.
  4. **Butoanele „negre” din chat** = fila activă din rândul de file: `.ch-tabs button.on{background:var(--fg)}` → pastilă neagră (ink) pe crem; restul file-lor sunt pastile cu contur. În același rând stau și „Contul meu” / „Ieșire din cont” ca linkuri; pe telefon rândul se rupe pe două rânduri (văzut la 375 px).
- **„Planul actual” a fost implementat azi** (commit `9fabd3f`, 16:57, în `chera-hub`; plan în `PLANUL-ACTUAL-ANALIZA-SI-PLAN-2026-11-09.md`): fila „Planul actual” în chat + pagina dedicată `/apps/chat/plan` (`src/ui/plan-page.ts`), fișiere cu Deschide/Descarcă, „Actualizat la”, istoric opțional. E deployat (panoul live are bifa „Actualizează și „Planul actual””). Linkul „Planul actual” din antetul temei (`header.liquid`) e modificat local în repo, dar **nu e încă publicat pe live** (antetul live arată doar „Chat · Ieșire · Coș”) – ține de sesiunea „Planul actual”, nu de redesign.
- Admin-ul lui Marius (`/apps/chat/admin`, `admin-page.ts`) **folosește același `SHARED_CSS`** ca și clientul (bule, bară de scris, antet conversație). Orice schimbare la token-urile comune se vede și în panou; asta e de dorit (un singur sistem), dar panoul nu e în brief și nu îi schimbăm structura.
- Fără dubluri: nu există alt plan de redesign al zonei de client; brief-ul din 31.10 a acoperit doar site-ul (temă) și delimitarea casetei de chat.

## 2. Extras exact din site (sursa: `chera-coaching/shopify-theme/assets/theme.css`, `:root`)

| Rol | Variabilă | Valoare |
|---|---|---|
| Fundal pagină | `--bg` | `#f3efe8` (crem cald) |
| Carduri / câmpuri | `--bg-2`, `--paper` | `#ffffff` |
| Antet + subsol | `--bar` | `#f0f2f5` |
| Text principal | `--fg` | `#111b21` (ink, nu negru pur) |
| Text secundar | `--fg-2` | `#54656f` |
| Meta / placeholder | `--fg-3` | `#667781` |
| Linii | `--line` / `--paper-line` | `#dcd6cc` / `#d1d7db` |
| **Accent (brand)** | `--red` | `#a8322b` (roșu-cărămiziu) |
| Accent hover | `--red-dark` | `#8c2822` |
| Accent deschis | `--red-soft` | `#fde3e1` |
| OK / OK text | `--ok` / `--ok-text` | `#00a884` / `#0b7a5e` |
| Avertisment | `--warn` | `#b7791f` |
| Umbră carduri | `--shadow` | `0 1px 2px rgba(17,27,33,.05), 0 10px 30px rgba(17,27,33,.07)` |
| Fonturi | `--display` / `--body` | **Barlow Condensed** (titluri, 600–800, majuscule) / **Barlow** (text, 400–600), Google Fonts |
| Raze colțuri | – | butoane 4 px (`.btn`), carduri 12–14 px, note 6–8 px |
| Butoane | `.btn` | roșu plin, text alb, MAJUSCULE, `letter-spacing .08em`, 16/26 px; `.btn.ghost` contur 1,5 px; `.btn-sm` 12/18 px |

Chatul din site (`client-page.ts`, `SHARED_CSS`) adaugă: bule client `#fde3e1` / coach `#fff`, fundal chat `#efeae2` cu puncte fine, chenar `#c9c1b5`, bife `#53bdeb`, bulele cu colț 9 px și „codiță”.

## 3. Fișierele care controlează zona de client

| Ce | Fișier | Observații |
|---|---|---|
| Chatul (HTML + CSS comun + JS) | `chera-hub/src/ui/client-page.ts` (420 rânduri; `SHARED_CSS`, `renderClientPage`, `renderLoginPage`, `wrapForDev`) | CSS-ul comun e folosit și de admin |
| Comportament chat (grupare, „coboară”, tastatură) | `chera-hub/src/ui/chat-ux.ts` | fără schimbări vizuale mari |
| Răspuns la mesaj, timp real („scrie…”, ✓✓), media (poze, voce), acțiuni (reacții, editare) | `chera-hub/src/ui/reply-ux.ts`, `realtime-ux.ts`, `media-ux.ts`, `actions-ux.ts` | ~42 de culori scrise direct de trecut pe token-uri |
| Meniul din chat (filele Chat / Planul actual / Check-in / Contul meu / Ieșire) | `client-page.ts` – `.ch-tabs` + `showTab()` | aici intră bottom navigation + meniul lateral |
| „Planul actual” – fila din chat | `client-page.ts` – `.ch-plan`, `.ch-plan-files`, `showTab('plan')` | |
| „Planul actual” – pagina dedicată | `chera-hub/src/ui/plan-page.ts` (94 rânduri) + ruta `/plan` din `src/routes/client.ts` | |
| Check-in | `client-page.ts` – `.ch-ck` | |
| PWA (culoare bară, splash) | `chera-hub/src/ui/pwa.ts` | `#0e0d0d` → de trecut pe deschis |
| Aplicația mobilă | `chera-hub-app/src/constants/theme.ts` (token-urile) + 15 fișiere care le folosesc (`chat-view.tsx` 30 de referințe, `index.tsx` 18, `settings.tsx` 18, `inbox.tsx` 17, `message-bubble.tsx` 14, `plan-view.tsx` 14, `checkin-form.tsx` 14 …), `app.json` | toate culorile vin deja din `Colors` → schimbarea e în mare parte într-un singur fișier |
| Tema site-ului (sursa token-urilor) | `Prime-supplements/chera-coaching/shopify-theme/assets/theme.css` | nu se schimbă; chatul moștenește |

Reguli tehnice care rămân valabile (din memorie/JURNAL): paginile din site se randează ca Liquid → fără `{{` / `{%` în HTML/JS (test automat); nume de clase fără `ad-`/`banner` (blocatoare de reclame); nimic client-facing nu menționează AI; fără diacritice doar în textele „de la Marius” (interfața poate avea diacritice, ca azi); deploy `wrangler deploy` după `npm test` + `npm run typecheck`; aplicația mobilă se testează în Expo Go.

## 4. Backup (făcut azi, fără modificări de cod)

- `chera-hub`: tag `backup-pre-redesign-2026-11-09` pe `9fabd3f`, **împins pe GitHub** (`Marius-Chera/chera-hub`). Revenire: `git checkout backup-pre-redesign-2026-11-09 -- src/ui` sau `git revert`, apoi `wrangler deploy`.
- `chera-hub-app`: tag local `backup-pre-redesign-2026-11-09` pe `576dcb1` (repo-ul nu are încă remote – punct deschis în DE-FACUT: Marius creează repo-ul privat).
- Tema site-ului nu se atinge (e în `Prime-supplements`, cu istoric git).
- Lucrul se face pe o ramură nouă `redesign-client` în fiecare repo; `main` și live rămân neatinse până la OK-ul pe rezultat.

## 5. Paleta propusă (design tokens) – în ton cu site-ul, deschisă

Principiu: **aceeași paletă ca site-ul**, nu una nouă (brief: „în ton cu site-ul principal”). Fundalul brief-ului (`#F7F8FA`, gri rece) ar bate cu cremul cald al site-ului, deci propun **albul cald** al temei. Brandul (roșul) doar ca accent.

| Token | Hex | Folosire | Contrast |
|---|---|---|---|
| `--bg` | `#f3efe8` | fundal pagină (moștenit din temă) | – |
| `--surface` | `#ffffff` | carduri, bule coach, câmp de scris, meniu | – |
| `--surface-2` | `#f0f2f5` | antet conversație, bara de scris, fundal meniu lateral | – |
| `--chat-bg` | `#efeae2` | fundalul listei de mesaje (puțin mai închis decât pagina, ca azi) | ink 14,6:1 |
| `--text` | `#111b21` | text principal | 15,2:1 pe crem, 17,5:1 pe alb |
| `--text-2` | `#54656f` | subtitluri, status, meta | 5,3:1 pe crem, 6,1:1 pe alb |
| `--text-3` | `#667781` | ora din bule, placeholder | 4,65:1 pe alb (AA) |
| `--line` | `#dcd6cc` | borduri fine | – |
| `--line-strong` | `#c9c1b5` | chenarul casetei de chat | – |
| **`--brand`** | `#a8322b` | **bulele clientului (text alb)**, buton de trimitere, fila activă (text), badge necitite | alb pe brand 6,65:1 |
| `--brand-dark` | `#8c2822` | hover/apăsare | alb 8,6:1 |
| `--brand-soft` | `#fde3e1` | fundalul filei active, citatul din răspuns, separator „mesaje necitite” | text `#8c2822` 7,1:1 |
| `--ok` / `--ok-text` | `#00a884` / `#0b7a5e` | punctul „Online”, ✓✓ citit, „Trimis”, bară de progres | text 5,3:1 pe alb |
| `--warn-text` | `#8a5a12` | avertismente (textul `#b7791f` de azi are doar 3,9:1 → îl păstrăm pentru fundaluri, textul trece pe `#8a5a12`) | 5,9:1 |
| `--danger` | `#a8322b` | eroare la trimitere + „Reîncearcă” | – |
| `--shadow-sm` | `0 1px 2px rgba(17,27,33,.06)` | bule, pastile | – |
| `--shadow` | `0 1px 2px rgba(17,27,33,.05), 0 10px 30px rgba(17,27,33,.07)` | carduri (cea din temă) | – |
| `--r-sm / --r-md / --r-lg / --r-pill` | `8 / 12 / 16 / 999 px` | butoane / câmpuri / carduri / pastile, bule 18 px cu colțul dinspre autor 6 px | – |
| Spațieri | `4 / 8 / 12 / 16 / 24 / 32 px` | scara unică (ca `Space` din aplicație) | – |
| Fonturi | **Barlow** (text 16 px pe telefon, 1,45) + **Barlow Condensed** (titluri) | cele două fonturi ale site-ului, nimic nou | – |
| Iconițe | **Lucide** (SVG inline pe web, `lucide-react-native` în aplicație) | înlocuiesc emoji-urile 😊 📎 🎤 🔍 🔔 și iconițele de fișier 🖼️📄📝📊 | – |
| Zone de apăsare | min. **44 × 44 px** pe telefon | butoane, file, iconițe | – |

Schimbarea față de azi cu cel mai mare impact vizual: **bulele clientului trec din roz pal pe roșu brand cu text alb** (ca în brief); bulele lui Marius rămân albe cu bordură fină; fila activă nu mai e neagră, ci roz pal cu text roșu închis.

Pentru aplicația mobilă aceleași valori intră în `Colors` (`background #f3efe8`, `surface #fff`, `accent #a8322b`, `mine #a8322b` cu text alb, `theirs #fff`), `userInterfaceStyle: light`, `StatusBar dark`, splash crem.

## 6. Ce propun la Pașii 2–5 (rezumat; detaliile după OK)

- **Pasul 2 – sistem de design**: blocul de token-uri de mai sus la începutul `SHARED_CSS` (`.ch-wrap,.cp-wrap{…}`), toate culorile scrise direct din cele 6 fișiere UI trec pe `var(--…)`; un test automat care refuză hex-uri noi în afara blocului de token-uri (ca testul pentru `ad-`).
- **Pasul 3 – chatul**: antet cu poza lui Marius (fișier în Shopify Files, azi e litera „M”), nume, status „Online” / „Răspunde de obicei în câteva ore” (din `last_seen` existent); bule client brand/alb, coach alb cu bordură; separatoare „Azi / Ieri / dată” (există `ch-day` – doar stil + „Azi/Ieri”); ✓/✓✓ există; bara de scris există (câmp rotunjit, agrafă, microfon, trimitere) – se recolorează și primește iconițe Lucide; previzualizarea pozelor cu mărire există (`media-ux`) – se îmbunătățește; **stări noi**: skeleton la încărcare, eroare cu „Reîncearcă” (azi mesajul rămâne în „pending”), mesaj de bun venit cu card.
- **Pasul 4 – meniul**: pe telefon **bară jos** cu 4 intrări (Chat · Planul actual · Check-in · Contul meu), iconiță + text, activă pe `--brand-soft`; pe desktop **meniu lateral** stânga (aceleași intrări + „Ieșire din cont” jos). „Ieșire din cont” iese din rândul de file și intră în „Contul meu”. Păstrează toate opțiunile.
- **Pasul 5 – „Planul actual”**: card de rezumat sus (nume plan / versiune, „Actualizat la”, nota „ce s-a schimbat”, următorul check-in, bară de progres a abonamentului până la `expira`); secțiunile existente ale planului (`## Mese / Antrenament / Suplimente / Cardio / Note`) ca **tab-uri** sau acordeon; fișierele ca listă curată cu iconițe Lucide și „Descarcă”; PDF-ul în pagină pe desktop (există).

## 7. Întrebări pentru Marius (răspunde odată cu confirmarea)

1. **Unde aplicăm întâi?** Propun: (a) site-ul – chat + meniu + Planul actual (un set de token-uri, o sesiune de lucru), apoi (b) aplicația mobilă pe aceleași token-uri (a doua sesiune), plus PWA `theme_color`. Sau amândouă deodată?
2. **Paleta**: albul cald al site-ului (`#f3efe8` / `#fff`) – OK? Sau vrei fundalul gri-rece din brief (`#F7F8FA`), caz în care ar trebui schimbat și site-ul ca să nu bată?
3. **Bulele clientului pe roșu brand cu text alb** (ca în brief) sau rămân roz pal (`#fde3e1`), cum sunt azi?
4. **Poza ta în antetul chatului**: ce poză folosim (una din `chera-coaching/poze site/` sau alta)? Până atunci rămâne litera „M” pe roșu.
5. **Meniu**: ordinea Chat · Planul actual · Check-in · Contul meu și mutarea „Ieșire din cont” în „Contul meu” – OK? Vrei alt nume la vreo filă?
6. **Status în antet**: „Online” când ești în panou (există `last_seen`) și altfel „Răspunde de obicei în câteva ore” – textul e bun?

## 8. Ce nu se poate exact ca în brief (și alternativa)

- **Poză/logo coach în antet**: imaginea trebuie urcată în Shopify Files (prin Claude in Chrome, ca la hero) – nu pot genera eu poza; se folosește una existentă.
- **„Dark mode automat”** nu e în brief; dacă îl vrea mai târziu, token-urile îl fac ușor (`prefers-color-scheme`).
- **Meniul contului Shopify** (`/account`) rămâne al Shopify (conturi noi) – „Contul meu” din meniul nostru duce acolo, ca azi.

## 9. Implementat (9.11.2026, seara) – LIVE
Marius a confirmat „Da, site-ul întâi”; restul întrebărilor din §7 au rămas pe implicit (alb cald, bulele clientului pe roșu brand, litera „M” până la poză, ordinea Chat · Planul actual · Check-in · Contul meu cu „Ieșire din cont” în Contul meu și în meniul lateral, status „Online” / „Răspunde de obicei în câteva ore”). În plus, la cererea lui din sesiunea paralelă: **Aspect Auto / Zi / Noapte** în „Contul meu” (ca pe Telegram/WhatsApp) și **planul doar text** (fără fișiere). Codul: `chera-hub` main `ba0d4ff`, deploy `f4929ac1`; detalii în JURNAL (9.11, „redesign-ul zonei de client, LIVE”). Token-urile finale sunt în `src/ui/client-page.ts` (`DESIGN_TOKENS_CSS`), inclusiv setul pentru noapte (`html.ch-dark`). Neimplementat încă: poza în antet (lipsește URL-ul), aplicația mobilă, „obiectivul” în cardul planului (nu există câmp).
