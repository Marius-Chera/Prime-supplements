# Tema Chera Protocol – instalare pe Shopify (fără temă de la Shopify)

Codul din acest folder e o temă Shopify completă (Online Store 2.0): pagina principală, evaluarea, blogul, produsele, coșul, contul clientului cu acces condiționat de plată, paginile legale. Se urcă ca arhivă .zip. Plata (Netopia) nu e în temă: se configurează din panoul Shopify, iar tema funcționează cu orice procesator.

## 1. Urcarea temei (5 minute)
1. Fă arhiva: în `chera-coaching/shopify-theme/` selectezi folderele `assets, config, layout, locales, sections, snippets, templates` → arhivă .zip (sau folosește `chera-protocol-theme.zip` din repo, generată automat).
2. Shopify admin → Online Store → Themes → Add theme → Upload zip file. Tema apare ca „Chera Protocol”. **Nu o publica încă.**
3. Customize → Theme settings → **Chera Protocol**: numărul de WhatsApp (format `40…`, fără +), URL-ul receptorului de evaluare (Apps Script, vezi `site/integrare/README.md`), URL-ul receptorului de check-in (poate fi același), zilele de grație, handle-urile produselor de coaching, CUI/J/sediul.
4. Customize → pagina principală: încarcă pozele (hero, galeria de rezultate: până la 80 de poze 4:5, mozaicul de la Despre, avatarul), verifică textele (sunt deja completate cu cele din prototip).

## 2. Conținutul de creat în admin (30 de minute)
- **Pagini** (Online Store → Pages): `Evaluare gratuită` cu template `page.evaluare` (handle `evaluare`); `Termeni și condiții`, `Politica de confidențialitate`, `Politica de retur`, `Contact` cu template `page` (textele le scriem înainte de lansare).
- **Meniuri** (Navigation): `Main menu`: Problema (/#problema), Cu cine lucrez (/#usi), Metoda (/#metoda), Rezultate (/#rezultate), Articole (/blogs/articole), Întrebări (/#intrebari). `Footer`: paginile legale.
- **Blog**: creează blogul „Articole” (handle `articole`). Articolele: Online Store → Blog posts → Add → lipește conținutul din `shopify-theme/content/articole/*.html` în editor în modul `<>`, etichete: Antrenament / Nutriție / Mindset / Suplimente / Competiție / Recuperare, poză de copertă, data.
- **Colecții**: `Coaching` (handle `coaching`) și `Programe` (handle `programe`).
- **Produse** (Products → Add):
  | Produs | Handle | Preț | Tip | Note |
  |---|---|---|---|---|
  | Chera Protocol Coaching · 1 lună | `chera-protocol-coaching-1-luna` | 990 lei | serviciu, fără expediere, cantitate 1 | metafield `chera.single_qty` = true |
  | Chera Protocol Coaching · 3 luni | `chera-protocol-coaching-3-luni` | 2.500 lei | serviciu | |
  | Pregătire de concurs · prima lună | `pregatire-de-concurs-prima-luna` | 1.500 lei | serviciu | descrierea: planul complet + video call 15 min |
  | Programele digitale (3–5) | `program-…` | 200–400 lei | digital, livrat cu Digital Downloads | |
  La fiecare: „This is a physical product” debifat; metafield-uri (opționale, afișate de temă): `chera.tag` (eyebrow), `chera.price_note`, `chera.includes` (text bogat), `chera.subtitle`.
- **Setări → Conturi de client**: „Obligatoriu” la checkout; conturi noi (cod pe e-mail). **Setări → Checkout**: telefonul obligatoriu.

## 3. Metafield-uri și Shopify Flow (accesul condiționat de plată)
1. Setări → Custom data → **Customers** → Add definition:
   - `chera.expira` – tip Date – „Expiră abonamentul”
   - `chera.pachet` – tip Single line text – „Pachet”
   - `chera.plan_url` – tip URL – „Linkul planului” (PDF din Files sau Digital Downloads)
   - `chera.profil` – tip Single line text – „Profil neuro” (ex. 2A-S)
2. Instalează **Shopify Flow** (gratuit). Workflow „Chera · acces la plată”:
   - Trigger: Order paid.
   - Condition: line item product handle ∈ {coaching-1-luna, coaching-3-luni, concurs-prima-luna}.
   - Actions: Update customer metafield `chera.pachet` = handle-ul; `chera.expira` = data comenzii + 30 de zile (coaching 1 lună, concurs) sau + 90 (3 luni); Add customer tag `chera-activ`.
   - Al doilea workflow „Chera · expirare”: Trigger Scheduled (zilnic 08:00) → pentru clienții cu `chera.expira` + zile de grație < azi → Remove tag `chera-activ`, Add tag `chera-expirat`, trimite e-mail intern.
   - Notificările D-7 / D-3 / D-1 / D0 către client: Flow „Scheduled” zilnic + acțiune „Send marketing email” (Shopify Email) sau webhook către furnizorul de WhatsApp (Respond.io/Wati) – vezi `ARHITECTURA-WHATSAPP-SITE-2026-10-27.md` §9.
   Până la Flow, tema calculează singură expirarea din ultima comandă plătită (snippet `chera-access.liquid`), deci zona clientului funcționează din prima zi.

## 4. Plata cu Netopia (după înrolare)
1. Netopia → contract pe Chera Coaching SRL → primești `Signature` și certificatele.
2. Shopify → Setări → Plăți → Add payment methods → caută „Netopia” (aplicația oficială) → instalează → introduce datele → Activează. Testează cu o comandă de 1 leu.
3. Dezactivează „Plată la livrare” și orice metodă manuală. Facturarea: aplicația de Oblio/SmartBill (vezi PAS-1).
4. Abonament cu reînnoire automată: Shopify Subscriptions merge doar cu procesatoare care suportă plăți recurente; întreabă Netopia la înrolare. Până atunci, reînnoirea e manuală: clientul primește linkul produsului în notificările de expirare.

## 5. Evaluarea și check-in-ul
- Pagina `/pages/evaluare` folosește `assets/quiz.js` (identic cu prototipul). Rezultatul pleacă la URL-ul din Theme settings; receptorul e `site/integrare/apps-script.gs` (e-mail către Marius + e-mail către client dacă a ales e-mail).
- Check-in-ul din cont trimite la URL-ul de check-in (același script primește `kind: "checkin"`; adaugă o foaie „Checkin” și un `if (p.kind === "checkin")` în `doPost` – 10 rânduri, le scriu la instalare) și deschide WhatsApp cu textul precompletat pentru poze.

## 6. Lansarea
1. Theme → Preview → verifică pe telefon: acasă, evaluare, un produs, coș, cont (cu o comandă de test plătită), blog.
2. Publică tema. Domeniul: Setări → Domains → Connect existing (cheraprotocol.ro / mariuschera.ro) → DNS A `23.227.38.65` + CNAME `shops.myshopify.com`.
3. Scoate parola din Online Store → Preferences.

## 7. Ce lipsește încă (de completat la lansare)
- Textele paginilor legale; datele firmei în Theme settings.
- Pozele originale (hero, galerie 50–60, mozaic, avatar).
- Produsele cu descrieri; programele digitale (fișierele).
- Receptorul Google instalat; furnizorul de WhatsApp (API) ales.

## 8. Sesiunile individuale și programul personalizat (27.10)
- **Magazinul:** bp66vh-bq.myshopify.com (creat pe 27.10 cu extensia; pașii 1–5 și 7–11 făcuți, vezi `EXTENSIE-CREARE-MAGAZIN-2026-10-27.md`). Partea 2: `EXTENSIE-PARTEA-2-SESIUNI-PROGRAME-2026-10-27.md`.
- **Sesiuni (calendar de rezervare, plată imediată):** produse cu template `product.sesiune`; fiecare variantă = un interval liber, titlul variantei în formatul `AAAA-LL-ZZ OO:MM`, stoc urmărit = 1, fără vânzare peste stoc. Pagina afișează un calendar (doar zilele cu intervale libere, viitoare), clientul alege ora, apasă „Rezervă și plătește” → coș → checkout direct. După plată stocul devine 0 și intervalul dispare. Programarea, telefonul WhatsApp și ce vrea să lucreze apar în comandă (line item properties). În cont, la „Sesiunile mele”, are buton „Adaugă în calendar” (Google Calendar).
  - Produse: `posing-live-sibiu` (400 lei), `posing-online` (250 lei, tag `online`), `consultatie-video` (400 lei, tag `online`). Durata: metafield produs `chera.durata` (implicit 30). Adresa din Sibiu: Theme settings → Chera Protocol.
  - Adăugarea intervalelor: în produs, Variants → Add value la „Data și ora” (ex. `2026-11-13 18:00`), stoc 1. Intervalele trecute nu se mai afișează, nu trebuie șterse imediat.
- **Program personalizat (formular înainte de plată):** produs cu template `product.program`, handle `program-personalizat`, colecția Programe. Formularul (vârstă, sex, înălțime, greutate, scop, ani de sală, zile, unde se antrenează, antrenamentul actual, accidentări, alimentație, suplimente, 3 poze, telefon, profil neuro, acord) se trimite cu produsul în coș și apoi direct la checkout; după plată toate datele și linkurile pozelor apar în comanda din admin și în e-mailul de comandă nouă. Marius construiește programul și pune linkul în metafield-ul clientului `chera.plan_url` → apare în contul clientului („Programul tău personalizat e gata”).
- **Telefonul la checkout:** la produsele fără livrare Shopify nu cere telefonul, așa că tema îl cere pe pagina produsului (coaching, sesiuni, program) și îl pune în comandă.
- **Template-urile** (`evaluare`, `sesiune`, `program`) se aleg la pagină/produs după publicarea temei.
- **De verificat la primul test:** încărcarea pozelor din formular (Shopify acceptă fișiere ca proprietăți de comandă; se testează cu o comandă de 1 leu după activarea Netopia).
