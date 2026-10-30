# Chera Hub – aplicația din App Store și Google Play (plan pe etape, 31.10.2026)

Deciziile lui Marius (30–31.10.2026): aplicația se numește **Chera Hub**; conține **doar chatul** (comunicarea lui cu clienții + notificări, „ca un WhatsApp personal, doar cu clienții”); **fără cumpărături** în aplicație; clienții intră cu **contul creat pe site** (Shopify); **panoul lui Marius e tot în aplicație**; conturile de dezvoltator pe **Chera Coaching SRL** (Apple 99 $/an), după rezolvarea problemelor firmei la ANAF; **niciun telefon Android** la îndemână (Marius și Adelina au iPhone).

Serverul rămâne **Chera Hub** (Cloudflare Workers, repo privat `chera-hub`): aceleași conversații, aceiași clienți, aceleași drafturi AI. Aplicația e doar un al doilea „ecran” peste același server, lângă chatul din site (`/apps/chat`), care rămâne și el.

## 1. Ce înseamnă „doar chatul”, concret
Aplicația are două fețe, în funcție de cine intră:
- **Clientul:** conversația cu Marius (text, poze, fișiere, vocale când e gata Etapa 3 din Hub, răspuns la mesaj, reacții, ✓/✓✓), fila „Planul meu” și „Check-in” (fac parte din chat azi), consimțământul la prima intrare, politica de confidențialitate, **„Șterge contul”** (obligatoriu în App Store) și „descarcă datele mele”.
- **Marius:** inbox-ul (necitite, drafturi în așteptare, expiră curând), conversația cu panoul de draft (Trimite / Regenerează / Șterge), modul Auto/Manual, fișa clientului. Notițele (upload de PDF-uri) rămân pe web, în panoul de azi: nu au ce căuta pe telefon.
- **Notificări native** (Apple și Google), nu web-push: „mesaj nou de la X”, „draft gata”, memento de expirare. Web-push-ul PWA rămâne pentru cine folosește chatul din site.

Ce **nu** intră în prima versiune: plan de antrenament zi cu zi cu bife, grafice de progres, poze de progres ca modul separat, plăți, Apple/Google Sign-In, versiune web separată (chatul din site face deja rolul de „PWA”).

## 2. Cum se leagă de ce există
```
iPhone / Android (aplicația Expo „Chera Hub”)
   │  login: pagina de cont Shopify (cod pe e-mail), deschisă în aplicație
   │  → Hub primește identitatea clientului → aceeași regulă de acces (chera.expira)
   ▼
Chera Hub (Cloudflare Worker, același ca azi)
   ├─ API JSON pentru aplicație (/app/api/…): mesaje, fișiere, plan, check-in, inbox, drafturi
   ├─ WebSocket-ul existent (Durable Object) → mesajele apar instant și în aplicație
   ├─ tabel nou device_tokens → trimite push prin Expo Push Service (gratuit) către Apple/Google
   └─ restul neschimbat: D1, R2, Vectorize, AI, cron, e-mail Resend
```
- **Login-ul cu contul de pe site:** Shopify are „Customer Account API” cu OAuth. Aplicația deschide pagina de login Shopify (aceeași ca pe site: e-mail + cod), Shopify o trimite înapoi în aplicație cu un token, Hub-ul îl verifică și eliberează o sesiune proprie (JWT, 30 de zile, reînnoită automat). Nicio parolă, niciun cont nou. Dacă Shopify pune piedici tehnice la redirecționarea către aplicație, rezerva e la fel de simplă pentru client: codul pe e-mail îl trimite Hub-ul (prin Resend) și potrivește e-mailul cu clientul Shopify. Decizia se ia în Etapa 1, când o testăm.
- **Un singur cod, două platforme:** Expo (React Native, TypeScript, Expo Router). Build-urile se fac în cloud cu EAS Build (nu e nevoie de Mac).
- **Repo nou privat** `Marius-Chera/chera-hub-app`, local `D:\Proiecte Claude\Prime Supplements\chera-hub-app\` (lângă `chera-hub`). Jurnalul și deciziile rămân în `Prime-supplements/`.
- **Cerința Apple 4.2 (fără „site împachetat”):** chatul e construit nativ (ecrane, liste, cameră, push, cache offline al conversației), nu o fereastră web spre /apps/chat.

## 3. Etapele, timp, cum testezi

| Etapă | Ce face Claude | Cât durează (lucru efectiv) | Cum testezi tu |
|---|---|---|---|
| **0. Pregătire** | repo `chera-hub-app`, schelet Expo, API JSON în Hub (login + sesiune + mesaje), clientul Customer Account API în Shopify | 1 zi | nimic încă |
| **1. Chatul clientului** | login cu contul de pe site, conversația (text, poze, fișiere, răspuns la mesaj, reacții, ✓✓, timp real), Planul meu, Check-in, consimțământ, politică, Șterge contul, export | 2–3 zile | pe iPhone, cu aplicația gratuită **Expo Go** din App Store: scanezi un cod QR de pe ecranul meu și aplicația rulează pe telefonul tău, fără cont Apple Developer |
| **2. Panoul lui Marius** | inbox, conversație + draft AI, Auto/Manual, fișa clientului, acces manual | 2 zile | la fel, Expo Go; intri cu contul tău și vezi inbox-ul |
| **3. Notificări native** | device_tokens în Hub, trimitere prin Expo Push, setări (sunet, ore), badge | 1 zi | **abia după contul Apple Developer**: primul build „de dezvoltare” instalat pe iPhone prin TestFlight; Expo Go nu poate primi push |
| **4. Android** | același cod; verificare în emulatorul Android pe calculatorul meu (Android Studio, gratuit) | 0,5–1 zi | nu ai Android: emulatorul la mine + 1 client de încredere cu Android ca tester intern în Google Play înainte de publicare |
| **5. Publicarea** | icoană, capturi de ecran, texte RO (+ EN), politică de confidențialitate pe site, formularele de date (Apple „App Privacy”, Google „Data safety” + „Health apps”), build-uri de producție, TestFlight / testare internă, trimitere la review | 1–2 zile + review-ul Apple 1–3 zile, Google 1–7 zile | TestFlight pe iPhone înainte de trimitere; după aprobare, instalezi din App Store |
| **6. Site + mesaje** | pagina „Descarcă aplicația” cu butoanele App Store / Google Play + QR; bannerul inteligent în temă (iPhone → App Store, Android → Google Play); textul pentru mesaje; deep link `mariuschera.ro/app` | 0,5 zi | deschizi pagina de pe telefon și apeși butonul |

Total lucru Claude: **~8–10 zile de lucru**, întinse pe calendar după conturile de la §5. Etapele 0–2 pot începe **acum**, fără niciun cont nou. Etapele 3 și 5 așteaptă contul Apple (și Google).

## 4. Costuri – spus clar
| Ce | Cât | Când |
|---|---|---|
| Apple Developer Program (organizație: Chera Coaching SRL) | **99 $/an** | la înscriere, apoi anual |
| Google Play Console (organizație) | **25 $ o singură dată** | la înscriere |
| Număr D-U-N-S pentru firmă (cerut și de Apple, și de Google) | 0 (gratuit, prin Dun & Bradstreet) | durează 5–30 de zile |
| Expo / EAS Build (build-urile în cloud) | 0 la volumul nostru (planul gratuit are un număr limitat de build-uri pe lună, cu coadă de așteptare); 19 $/lună doar dacă într-o lună facem multe build-uri | – |
| Expo Push Service (notificările) | 0 | – |
| Găzduire, bază de date, fișiere, timp real, AI | neschimbate față de raportul din 30.10 (0 + API Claude plătit din contul lui Marius) | – |
| **Total recurent nou** | **99 $/an** (≈ 8,5 $/lună) | |

## 5. Ce faci tu, Marius – în ordine
**Acum (fără să aștepți ANAF):**
1. Instalează **Expo Go** pe iPhone (App Store, gratuit). Atât îți trebuie pentru Etapele 1–2.
2. Cont gratuit pe **expo.dev** cu e-mailul firmei (Sign up → e-mail + parolă). Apoi expo.dev → Account settings → **Access tokens → Create token** → copiezi tokenul și mi-l dai (e o cheie, nu parola; o pun în variabila `EXPO_TOKEN` pe calculator). Îmi trebuie abia la Etapa 3, dar poți face contul acum.
3. (Automat, Claude) clientul Customer Account API în Shopify Dev Dashboard, în aplicația „Chera Hub” existentă. Dacă Dev Dashboard cere o confirmare pe care doar proprietarul o poate da, îți spun exact unde apeși.

**Când firma e în regulă la ANAF:**
4. **D-U-N-S** pentru Chera Coaching SRL: developer.apple.com/enroll/duns-lookup → cauți firma; dacă nu există, ceri numărul (gratuit, formular cu datele firmei; vine pe e-mail în 5–30 de zile). Același număr îl folosești și la Google.
5. **Apple Developer Program** (developer.apple.com/programs/enroll): Apple ID pe e-mailul firmei (cu autentificare în doi pași), tip „Organization”, denumirea exactă din ONRC, D-U-N-S, site-ul (mariuschera.ro trebuie să fie live pe domeniu, nu pe `.myshopify.com` – vezi `LANSARE-CHAT-CHECKLIST` A1), telefonul tău: Apple sună sau scrie pentru verificare (trebuie să fii administratorul firmei sau să ai împuternicire). Plata: 99 $/an, cu cardul. Durează 1–7 zile după D-U-N-S.
6. **Google Play Console** (play.google.com/console/signup): cont Google pe e-mailul firmei, tip „Organization”, D-U-N-S, site, telefon, verificarea identității, 25 $. 1–3 zile.
7. După Apple: în **App Store Connect → Users and Access → Integrations → App Store Connect API → Team Keys → Generate** (rol „App Manager”): descarci fișierul `.p8` o singură dată și mi-l dai (cheie de publicare, nu parolă). Cu el fac build-urile și trimiterile fără să intru în contul tău.
8. După Google: prima încărcare a aplicației o faci tu manual în Play Console (Google cere asta o singură dată; îți dau fișierul și pașii), apoi îmi dai o cheie de serviciu (JSON) pentru următoarele.
9. **Un cont de test pentru Apple**: un client fictiv (ex. `test@mariuschera.ro`) cu `chera.expira` în viitor și câteva mesaje – Apple intră cu el la review. Îl pregătesc eu, tu doar confirmi că există adresa de e-mail.
10. Pentru Android: alegi **un client de încredere cu Android** care primește linkul de testare internă înainte de publicare.

## 6. Publicarea – ce pregătim și cum evităm respingerile
- **Nume:** „Chera Hub” (se rezervă când creăm aplicația în App Store Connect; dacă e luat, variantele: „Chera Hub – Coaching”, „Chera Protocol Hub”). Subtitlu: „Chatul tău cu antrenorul”. Identificator: `ro.mariuschera.hub`.
- **Icoană:** din logo-ul Chera Protocol (`chera-coaching/brand/`), fundal negru `#0e0d0d`, accent roșu `#e1251b`. **Capturi de ecran:** 6,7" și 6,5" (iPhone), telefon Android; le generez din aplicație (RO).
- **Descriere RO + EN**, cuvinte-cheie, categoria „Health & Fitness” (sau „Lifestyle”), vârstă 17+ (Apple) din cauza conținutului de sănătate, „adulți” la Google.
- **Politica de confidențialitate**: cea a chatului (`POLITICA-CONFIDENTIALITATE-CHAT-2026-10-30.md`, pagina `/pages/politica-de-confidentialitate-chat`) + un paragraf despre aplicație (push, cameră, galerie, ștergerea contului). Linkul public e obligatoriu în ambele magazine.
- **Formularele de date:** Apple „App Privacy” – colectăm: date de contact (e-mail, nume), sănătate și fitness (conținutul mesajelor, măsurători), fotografii, mesaje, identificatori (ID client); legate de utilizator, **fără tracking**, fără reclame. Google „Data safety” la fel + declarația **„Health apps”** (obligatorie din 2024 pentru date de sănătate) + criptare în tranzit + ștergere la cerere.
- **Respingeri frecvente și cum le evităm:**
  - *4.2 funcționalitate minimă / site împachetat* → aplicație nativă, push, cameră, offline, două roluri.
  - *5.1.1(v) ștergerea contului* → buton „Șterge contul” în aplicație, care pornește fluxul existent din Hub (confirmare pe e-mail, șterge D1 + R2 + Vectorize).
  - *Permisiuni nejustificate* → textele de permisiune (cameră: „pentru a trimite poze antrenorului”; galerie; microfon: „pentru mesaje vocale”; notificări) în RO și EN, cerute abia când apeși pe funcție.
  - *Cont fără înregistrare în aplicație* → notă pentru reviewer: „accesul se primește după achiziția coaching-ului pe mariuschera.ro; cont demo: …”; în aplicație, ecranul pentru cine nu are acces explică fără link de cumpărare („Accesul se activează de către antrenorul tău”).
  - *3.1.1 plăți* → zero linkuri de cumpărare, zero prețuri în aplicație.
  - *Date de sănătate* → consimțământ explicit la prima intrare (există), politica la un tap, export + ștergere.
  - *Google: cont nou* → contul de organizație nu are regula celor 12 testeri × 14 zile; testarea internă cu clientul Android e totuși necesară, nu avem dispozitiv.

## 7. Integrarea cu site-ul și mesajele (Etapa 6)
- **Pagina** `mariuschera.ro/pages/aplicatie`: titlu, 3 beneficii, butoanele oficiale „Download on the App Store” / „Get it on Google Play”, QR unic către `mariuschera.ro/app` (Hub-ul trimite automat către magazinul potrivit după telefon).
- **Bannerul** în temă (secțiune/snippet): pe iPhone bannerul nativ Safari (`apple-itunes-app`), pe Android un banner propriu „Instalează Chera Hub”; nu apare dacă ești deja în aplicație.
- **Text pentru mesaje:** „Am mutat discuțiile noastre în aplicația Chera Hub: mariuschera.ro/app – intri cu același cont ca pe site. Acolo primești notificare la fiecare răspuns.”
- **Deep link** (opțional, după lansare): `mariuschera.ro/app/chat` deschide direct aplicația dacă e instalată (Universal Links / App Links, fișierele de asociere servite de Worker).

## 8. Riscuri și ce amânăm
- **Blocajul real e administrativ:** ANAF → D-U-N-S → Apple/Google. Codul va fi gata înainte; publicarea depinde de aceste conturi.
- **Fără Android fizic:** emulatorul acoperă 95 %; notificările și camera pe Android le confirmă clientul-tester.
- **Login-ul Shopify în aplicație:** testat în Etapa 1; rezerva (cod pe e-mail trimis de Hub) e gata de implementat dacă e nevoie.
- **Amânate:** plan zi cu zi cu bife, grafice de progres, mesaje vocale în aplicație (vin odată cu Etapa 3 din Hub), versiune în engleză (textele sunt pregătite pentru traducere de la început).
