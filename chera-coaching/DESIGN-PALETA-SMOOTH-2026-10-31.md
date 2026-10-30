# Chera Protocol – paleta „smooth” (31.10.2026)

Cererea lui Marius (31.10): „vreau să modifici tot designul site-ului în culori mai smooth, să nu mai fie așa țipătoare, culorile să fie mai premium, așa mi-au recomandat deja câțiva clienți care au intrat pe platformă; poți să te duci în direcția nuanțelor de pe WhatsApp”.

Stadiu: **paleta e aplicată în repo (tema din `shopify-theme/`) și previzualizată pe site-ul real din browserul încorporat, fără să fie scrisă în tema live.** Publicarea se face doar după OK-ul lui Marius (regula „designul se schimbă doar cu aprobarea proprietarului”).

## 1. Paleta (variabilele din `assets/theme.css`, `:root`)

| Variabilă | Vechi (negru) | Nou (smooth) | Unde se vede |
|---|---|---|---|
| `--bg` | `#0e0d0d` | `#f3efe8` | fundalul paginii (același crem cald ca fundalul chatului) |
| `--bg-2` | `#181616` | `#fff` | carduri, câmpuri de formular, opțiunile chestionarului |
| `--bar` | – | `#f0f2f5` | antetul lipicios și subsolul (gri deschis WhatsApp) |
| `--fg` | `#f5f1ec` | `#111b21` | textul principal (ink WhatsApp) |
| `--fg-2` | `#b5aea6` | `#54656f` | text secundar (contrast 5,3:1 pe crem) |
| `--fg-3` | – | `#667781` | placeholder-e, meta foarte mic |
| `--line` | `#2d2a28` | `#dcd6cc` | linii pe fundal crem |
| `--red` | `#e1251b` | `#a8322b` | accent: butoane, eyebrow, cifre, borduri; roșu-cărămiziu temperat (contrast 6,7:1 cu alb) |
| `--red-dark` | `#b81d15` | `#8c2822` | hover pe butoane |
| `--red-soft` | – | `#fde3e1` | banda „Garanția” (fost roșu plin) – aceeași nuanță ca bulele „eu” din chat |
| `--red-fg` | `#fff` | `#fff` | text pe roșu |
| `--paper` / `--paper-fg` | `#fff` / `#141212` | `#fff` / `#111b21` | benzile albe (uși, testimoniale, evaluare-cta, sesiuni) |
| `--paper-2` / `--paper-line` | `#f4f1ee` / `#e2ddd7` | `#f0f2f5` / `#d1d7db` | cardurile „uși” pe banda albă |
| `--ok` / `--ok-text` | `#7fb57a` | `#00a884` / `#0b7a5e` | doar stări „ok” (verdele WhatsApp; varianta închisă pentru text mic) |
| `--warn` | `#e3a53a` | `#b7791f` | avertismente |
| `--shadow` | – | `0 1px 2px rgba(17,27,33,.05), 0 10px 30px rgba(17,27,33,.07)` | umbra fină a cardurilor |

Fonturile rămân Barlow / Barlow Condensed. `color-scheme: light`.

## 2. Ce s-a schimbat în afara variabilelor
- Benzile: implicit crem (`--bg`), `.band.paper` alb, `.band.red` → roz pal `--red-soft` cu text ink (roșul plin rămâne doar la îndemnul din subsol, `.ft-cta`).
- Carduri (`.card`, `.art`, `.cta-box`, `.door`, `.proof`, `.cal`, `.media-*`, cardurile de produs): fundal alb, colțuri 12–14 px, umbră `--shadow`; `.door.main` (ușa principală) nu mai e card negru, ci alb cu bordură roșie 2 px.
- Butoane: colțuri 8 px (erau 0), hover `--red-dark`, ghost cu fundal ușor la hover.
- Antet și subsol pe `--bar` (#f0f2f5); linia subsolului `#e9edef`; textul uriaș „CHERA PROTOCOL” din subsol are conturul `#d1d7db`.
- Hero: gradientele peste poză folosesc cremul (`rgba(243,239,232,…)`), filtrul pozei mai blând.
- Logo (`snippets/logo-stamp.liquid`, `logo-mark.liquid`): culorile fixe au devenit `var(--fg)` / `var(--red)` / `#fff`, deci ștampila se vede pe fundal deschis.
- `layout/theme.liquid`: s-a scos linia `<style>:root{--red:{{ settings.color_accent }}…}</style>` (suprascria paleta cu valorile din Customize) și cele trei setări de culoare din `config/settings_schema.json`; `theme-color` → `#f0f2f5`. Paleta are o singură sursă: `theme.css`.
- Secțiuni cu stiluri proprii: `header.liquid` (hover), `rezultate.liquid` (caseta Instagram albă), `analiza-concurs` / `distanta-scena` / `revizuire-progres` (suprapunerile de pe miniaturi în ink, colțuri 8 px), `sesiuni.liquid` (eticheta opțiunii „Negru” → „Crem”).
- Neschimbat: `sections/instrumente.liquid` și `main-product.liquid` (în lucru în altă sesiune), conținutul articolelor, chera-hub.

## 3. Fișierele de publicat (11) – după OK-ul lui Marius
`assets/theme.css`, `layout/theme.liquid`, `config/settings_schema.json`, `sections/header.liquid`, `sections/rezultate.liquid`, `sections/analiza-concurs.liquid`, `sections/distanta-scena.liquid`, `sections/revizuire-progres.liquid`, `sections/sesiuni.liquid`, `snippets/logo-mark.liquid`, `snippets/logo-stamp.liquid`.

`config/settings_data.json` NU se scrie în live (ar suprascrie setările lui Marius; cheile de culoare rămase acolo nu mai sunt citite).

Publicarea: din browserul încorporat, logat ca Marius la `https://bp66vh-bq.myshopify.com/apps/chat/admin`, cu fetch din consolă (ca pe 29–30.10):
1. `GET /apps/chat/admin/api/shopify/theme-files?names=<lista>` → compară cu versiunile din repo dinainte de schimbare (commit-ul părinte), ca să nu suprascrii nimic editat între timp în Shopify.
2. Ia fișierele noi de pe `https://raw.githubusercontent.com/Marius-Chera/Prime-supplements/claude/install-claude-seo-ttv3h6/chera-coaching/shopify-theme/<fișier>` după push.
3. `POST /apps/chat/admin/api/shopify/theme-files` cu `{ files: { "<fișier>": "<conținut>" } }` (max. 20 pe apel) → verifică `upserted` = 11, `errors` = [].
4. Verifică pe site (prima pagină, evaluare, un produs, subsol) la desktop și 375 px; Shopify minifică CSS-ul singur.

Rollback: aceleași 11 fișiere din commit-ul anterior (`git show <commit>^:chera-coaching/shopify-theme/<fișier>`), scrise la fel.

## 4. Rămâne (în chera-hub, nu în temă)
Pagina chatului (`/apps/chat`, randată de Worker ca `application/liquid` în layout-ul temei) își fixează singură în `client-page.ts` / `admin-page.ts` un `:root` negru (`--bg:#0e0d0d …`) peste `theme.css`; caseta de chat e deja „WhatsApp light”. După publicarea paletei, cadrul paginii de chat (în afara casetei) ar rămâne negru până se aliniază și acel `:root` la valorile de mai sus – de făcut în sesiunea Chera Hub.

## 5. Previzualizarea (cum s-a făcut)
Site-ul e cu parolă („În curând”), deci curl nu vede paginile; previzualizarea s-a făcut pe site-ul real din browserul încorporat: `theme.css` nou injectat ca `<style>` (CSS-ul ținut în `localStorage.cheraPreviewCss`, scriptul în `localStorage.cheraPreviewJs`), linia `:root` din layout scoasă, stilurile secțiunilor și culorile SVG ale logo-ului înlocuite în pagină. Capturile (desktop 1280 px și mobil 375 px) i-au fost trimise lui Marius în sesiune; nu se pun în repo (pozele sportivilor).
