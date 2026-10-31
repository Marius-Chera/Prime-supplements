# Autentificare socială (Apple, Google, Samsung) – site-ul Chera Protocol + aplicația Chera Hub

Cererea lui Marius (31.10.2026, seara): butoane „Continuă cu Apple / Google / Samsung” pe site și în aplicația mobilă, un singur cont indiferent de unde intri, legare automată după e-mail, profil completat la primul login, delogare / ștergere cont / gestionarea metodelor de login. Fără parole stocate, fără token-uri în locuri nesigure. Explicații simple, fără cerere de parole.

Acest document = verificarea (cu surse), decizia recomandată, pașii exacți pentru Marius în consolele Apple/Google și ce construiește Claude. Se citește împreună cu `PLAN-APLICATIE-MOBILA-CHERA-HUB-2026-10-31.md` (aplicația) și `ARHITECTURA-CHAT-HUB-2026-10-29.md` (serverul).

## 0. Ce exista deja în repo (verificat înainte de a propune)
- **Site-ul = Shopify** (magazinul `bp66vh-bq`, viitor `mariuschera.ro`), cu **conturile noi de client Shopify**: login **fără parolă** (e-mail + cod de 6 cifre). Decizia din 29.10: contul de client Shopify e identitatea unică – e obligatoriu la plată, iar accesul la coaching (metafield-ul `chera.expira`) și chatul (Chera Hub) sunt legate de el.
- **Aplicația Chera Hub** (plan 31.10): login **cu contul de pe site**, prin Shopify „Customer Account API” (OAuth + PKCE). Codul Etapei 0 există (`chera-hub/src/app/auth.ts`, `chera-hub-app/src/lib/auth.ts`), sesiunile aplicației sunt în tabelul `app_sessions`, tokenul stă în SecureStore (Keychain / Keystore). Ștergerea contului și exportul (GDPR) există în Hub; consimțământul la prima intrare există.
- **Decizii anterioare pe care cererea de azi le schimbă:** pe 30.10 Marius propusese Expo + Supabase și Claude a recomandat **fără Supabase** (Hub-ul e serverul); planul din 31.10 scria explicit că **„Apple/Google Sign-In nu intră în prima versiune”**. Cererea de azi redeschide subiectul → decizia nouă se consemnează în `ISTORIC-DISCUTII.md`.

## 1. Răspunsul scurt
| Metodă | Site (mariuschera.ro) | Aplicația (iPhone + Android) | Cum |
|---|---|---|---|
| **Google** | DA, nativ Shopify | DA (aceeași pagină de login Shopify; mai târziu buton nativ) | Marius conectează Google în Shopify → Setări → Conturi clienți (§5A). **Zero cod.** |
| **Apple** | NU încă pe magazinul nostru (Shopify o are doar în „acces timpuriu” pentru anumite magazine; verificat în admin pe 31.10: apar doar Google și Facebook) | DA, **obligatoriu** pe iOS odată ce există Google (regula Apple 4.8) → o construim nativ în aplicație, iar Hub-ul o leagă de contul Shopify | După contul Apple Developer (deja în plan). Când Shopify deschide Apple, se conectează cu aceleași chei și pe site. |
| **Samsung** | NU | NU | Nu există „Sign in with Samsung” deschis oricărui dezvoltator (§2). Utilizatorii Samsung intră cu **Google** (contul Google e obligatoriu pe orice telefon Android). |
| **„Clasic”** | E-mail + cod (există) | E-mail + cod (există) | Conturile noi Shopify **nu au parolă** – e-mail + cod e varianta „clasică” și e mai sigură (nu există parole de stocat sau de furat). |
| **Shop** | DA (pornit automat cu Shop Pay) | DA | Nimic de făcut. |

**Recomandare:** NU Supabase, NU Firebase. Contul rămâne **contul de client Shopify** – un singur cont pentru cumpărături, site, chat și aplicație. Supabase/Firebase ar însemna un al doilea registru de utilizatori pe care Shopify **nu îl acceptă** pentru login la cumpărături (Multipass nu merge pe conturile noi, iar furnizorul propriu de identitate e doar pe Shopify Plus). Ar aduce dubluri, costuri și întreținere fără niciun câștig. Detalii în §9.

## 2. Samsung – verificarea cu surse (cerută explicit)
Ce am găsit în documentația oficială Samsung (31.10.2026):
- Există **Samsung Account Developer Console** (https://developer.account.samsung.com/) care spune că Samsung Account „supports OAuth 2.0 and OpenID Connect” și că dezvoltatorii pot „create, manage, edit and delete OAuth client IDs”. **Dar** singura documentație publică de integrare e **Samsung SignIn SDK** din secțiunea **Instant Plays (jocuri)**: https://developer.samsung.com/instant-plays/samsung-signin-sdk/get-started.html – client ID-ul se obține **printr-un formular de cerere**, Samsung răspunde pe e-mail („We will contact you via the email address associated with the account that submitted the form”), e **doar Android 10+**, iar configurarea cere **„Work with your Samsung representative”** și un „Disclaimer Agreement” per aplicație (https://developer.samsung.com/instant-plays/samsung-signin-sdk/use-the-sdk.html).
- **Nu există SDK pentru iPhone și nicio documentație publică pentru site-uri web.** Pe iPhone oricum nu ar avea sens (nu există Samsung Account pe iOS).
- Celelalte SDK-uri Samsung (Pay, Wallet, Health, Knox) sunt toate pe **parteneriat aprobat** (cont de firmă, D-U-N-S, aprobare Samsung): https://developer.samsung.com/pay/native/partner-onbarding.html, https://developer.samsung.com/wallet/onboarding.html, https://docs.samsungknox.com/dev/fundamentals/get-started.

**Concluzie:** confirmă bănuiala ta – nu e un login deschis ca Apple/Google; e un proces de cerere/aprobare, Android-only, orientat spre jocuri și parteneri. **Nu construim nimic improvizat.** Butonul pentru clienții Samsung este **„Continuă cu Google”**: orice telefon Samsung are cont Google (fără el nu există Play Store), deci acoperirea e 100 %.
**Merită să ceri acces de partener mai târziu?** Nu acum. Eventual după lansare, dacă vezi că mulți clienți cu Samsung cer explicit (puțin probabil: Google e deja pe telefon). Când/dacă Shopify sau Samsung oferă o integrare publică web + iOS, reevaluăm.

## 3. Cum funcționează (schema)
```
SITE + CHAT (mariuschera.ro)                       APLICAȚIA (Chera Hub, iPhone + Android)
pagina de login Shopify (aceeași pentru toți):     ecranul de login al aplicației:
  • E-mail + cod (există)                            • Continuă cu Apple  → nativ (iOS), Apple dă un token semnat
  • Shop (există)                                    • Continuă cu Google → nativ (build) / pagina Shopify (Expo Go)
  • Continuă cu Google (după §5A)                    • E-mail + cod → pagina Shopify (există, Etapa 0)
  • Continuă cu Apple (când Shopify o deschide)            │
        │                                                  ▼
        ▼                                          Hub: POST /app/auth/native  {provider, token, nonce}
  cont de client Shopify (customer_id)               1. verifică semnătura tokenului cu cheile publice Apple/Google
        │                                            2. verifică audiența (ro.mariuschera.hub) și nonce-ul
        ▼                                            3. e-mail verificat → caută legătura (provider, subject) în identity_links
  Chera Hub (același server, aceleași reguli)        4. dacă nu există: caută clientul Shopify după e-mail (Admin API)
                                                        – există → leagă și intră
                                                        – nu există → creează clientul Shopify → leagă și intră
                                                        – e-mail ascuns Apple (privaterelay) fără potrivire → cere e-mailul
                                                          de pe site + cod pe e-mail (o singură dată) → leagă
                                                     5. sesiune Hub ca azi (app_sessions, 30 zile, SecureStore)
```
- **Cheia unică rămâne `customer_id` Shopify.** Apple/Google sunt doar moduri de a dovedi cine ești; nu se creează niciun cont paralel.
- **Tabel nou în Hub:** `identity_links (provider, subject, customer_id, email, created_at, last_used_at)`. Se păstrează doar identificatorul stabil (`sub`) dat de Apple/Google – **niciun token Apple/Google nu se stochează** (se verifică și se aruncă).
- **Pe site** nu construim nimic: pagina de login e a lui Shopify; Google apare acolo imediat ce îl conectezi. Aceeași pagină o deschide și aplicația când alegi „E-mail + cod” sau „Google” în Expo Go, deci Google apare și acolo automat (de confirmat la primul test; pagina OAuth a Customer Account API e aceeași pagină de cont).

## 4. Cerințele tale, punct cu punct
1. **Trei butoane clare + varianta clasică.** În aplicație: „Continuă cu Apple” (doar iOS – Apple nu are buton pe Android), „Continuă cu Google”, „Intră cu e-mail (cod)”. Fără buton Samsung (ar fi o promisiune falsă; vezi §2). Pe site: butoanele sunt ale paginii Shopify (E-mail + cod, Shop, Google; Apple când Shopify o deschide); textul și ordinea le decide Shopify, în română dacă limba magazinului e română.
2. **Un singur cont pe site și în aplicație.** Da, prin construcție: totul se leagă de clientul Shopify.
3. **Legare automată după e-mail, cu verificare de siguranță.** Apple și Google trimit în token `email_verified`; Hub-ul leagă automat **doar** dacă e-mailul e marcat verificat și coincide exact cu al clientului Shopify. Dacă e-mailul diferă (ex. „Hide My Email” de la Apple sau alt Gmail), aplicația întreabă „Care e e-mailul contului tău de pe site?” și trimite un **cod pe acel e-mail** (prin Resend, ca azi); abia după cod se leagă. Fără duplicate: dacă nu există niciun client cu acel e-mail, se creează **unul singur** în Shopify și toate metodele ulterioare se leagă de el.
4. **Client nou – doar ce lipsește.** Shopify primește din login-ul social **doar e-mailul**. La prima intrare aplicația cere: numele (dacă Apple/Google nu l-au dat), telefonul, consimțământul GDPR (ecranul există deja în Hub). Numele și telefonul se scriu în profilul de client Shopify (Admin API), consimțământul în Hub, ca azi.
5. **Delogare / ștergere cont / metode.** Delogarea există (revocă sesiunea Hub). **„Șterge contul”** e deja în planul aplicației (obligatoriu App Store 5.1.1(v)) și folosește fluxul GDPR existent (confirmare pe e-mail, șterge D1 + R2 + Vectorize; în plus șterge rândurile din `identity_links`). Ecran nou **Setări → „Metode de conectare”**: listă (Apple ✓ / Google ✓ / E-mail + cod – mereu disponibil), **„Deconectează”** (șterge legătura) și **„Adaugă”** (faci login nativ cât ești deja logat → se leagă de contul curent). Limită Shopify: legătura Google făcută **pe site** (pagina Shopify) nu poate fi ruptă de client din contul lui – e același e-mail, deci nu creează probleme, dar o spunem în politică.

## 5. Ce faci tu, Marius – pas cu pas (fără parole; îmi dai doar ID-uri publice)
### 5A. Google – ACUM (gratuit, ~30 de minute, fără cod)
Folosește **contul Google al firmei Chera Coaching** (nu contul Prime Supplements – afacerile rămân separate). Dacă firma nu are încă un cont Google, îl faci întâi (gratuit).
1. Deschide în Shopify: **Settings → Customer accounts → Authentication → Manage → Google → Connect** (pagina `admin.shopify.com/store/bp66vh-bq/settings/customer_accounts/authentication/google`). Las-o deschisă.
2. În alt tab: **https://console.cloud.google.com** → sus, selectorul de proiect → **New project** → nume „Chera Protocol” → Create → selectează-l.
3. Meniul ☰ → **APIs & Services → OAuth consent screen** (sau „Google Auth platform”) → **Get started**: App name „Chera Protocol”; User support email = e-mailul firmei; Audience **External**; Contact email = e-mailul firmei; bifezi acordul → **Create**. La **Branding**: Application home page `https://mariuschera.ro`, Privacy policy `https://mariuschera.ro/pages/politica-de-confidentialitate-chat` (sau politica generală), Terms `https://mariuschera.ro/pages/termeni` (dacă există). Nu adăuga alte „scopes” (e-mailul și profilul de bază nu cer verificare Google).
4. **APIs & Services → Credentials → + Create credentials → OAuth client ID** → Application type **Web application** → Name „Shopify – conturi clienți”.
   - **Authorized JavaScript origins** → + Add URI, de două ori (copiate din pagina Shopify de la pasul 1; valorile de azi):
     `https://shopify.com`
     `https://bp66vh-bq.account.myshopify.com`
   - **Authorized redirect URIs** → + Add URI, de două ori:
     `https://shopify.com/authentication/109559906638/social/google/callback`
     `https://bp66vh-bq.account.myshopify.com/authentication/social/google/callback`
   - **Create**. Apare fereastra cu **Client ID** și **Client secret**.
5. Înapoi în Shopify, secțiunea **Credentials**: lipești Client ID și Client secret → **Save**. (Secretul stă doar în Shopify; nu mi-l trimite mie.)
6. În Google Cloud: **Audience → Publish app** (altfel merge doar pentru conturi de test). Nu e nevoie de „verificare” Google pentru e-mail + profil.
7. Test: deschide site-ul în fereastră privată → „Intră în cont” → ar trebui să apară „Continuă cu Google”. Intri cu un Gmail care **are deja cont** pe site (ex. al Adelinei) → trebuie să ajungi în același cont, cu același istoric. Apoi cu un Gmail nou → se creează client nou. Îmi spui rezultatul și îl trec în JURNAL.
8. **Când legăm mariuschera.ro la Shopify** (în planul de lansare): pagina Shopify de la pasul 1 va afișa adrese noi (`account.mariuschera.ro…`). Le adaugi în același client OAuth din Google **înainte** de a schimba domeniul contului în Shopify, altfel Google nu mai merge până le adaugi (regula Shopify din documentație).

### 5B. Google nativ în aplicație (mai târziu, după ce există build-uri EAS; îți spun eu când)
În același proiect Google Cloud, **Credentials → Create credentials → OAuth client ID**:
- tip **iOS**, Bundle ID `ro.mariuschera.hub` → îmi dai **Client ID**-ul (public);
- tip **Android**, Package name `ro.mariuschera.hub`, **SHA-1** din Google Play Console → Release → Setup → App integrity (ți-l citesc eu când există aplicația în Play) → Client ID;
- Client ID-ul **Web** de la 5A îl folosesc ca „audiență” la verificarea tokenului în Hub.
Până atunci, „Continuă cu Google” în aplicație deschide pagina Shopify (merge din prima zi după 5A).

### 5C. Apple – după contul Apple Developer (99 $/an, deja în plan; depinde de ANAF → D-U-N-S)
Totul în **developer.apple.com → Certificates, Identifiers & Profiles**:
1. **Identifiers → + → App IDs → App**: Description „Chera Hub”, Bundle ID **explicit** `ro.mariuschera.hub`, la Capabilities bifezi **Sign in with Apple** → Continue → Register. (Aplicația Expo activează capability-ul singură la build, prin `ios.usesAppleSignIn`.)
2. **Identifiers → + → Services IDs**: Description „Chera Protocol web”, Identifier `ro.mariuschera.hub.web` → Register → deschide-l → bifezi **Enabled** → **Configure**: Primary App ID = cel de la 1; **Domains** `mariuschera.ro` (și `account.mariuschera.ro` dacă Shopify o folosește); **Return URLs** = exact cele afișate de Shopify în **Customer accounts → Authentication → Apple → Connect** (apar doar când Shopify deschide Apple pentru magazinul nostru) → Save. Acest pas e **doar pentru site**; aplicația nu are nevoie de el.
3. **Keys → + → Sign in with Apple → Configure** → Primary App ID = Chera Hub → Register → **Download** fișierul `.p8` (**o singură dată** – îl păstrezi într-un loc sigur, ex. managerul de parole) și notezi **Key ID**. **Team ID** = la Membership details (10 caractere).
4. Când Shopify deschide „Apple” pe magazinul nostru: în pagina Shopify „Sign in with Apple” completezi **Services ID**, **Team ID**, **Key ID** și încarci `.p8` → Save. Plus **Hide My Email**: în Apple → Services → Sign in with Apple for Email Communication adaugi domeniul de e-mail verificat `mariuschera.ro` (domeniul de trimitere trebuie să fie al tău, nu `myshopify.com` – e deja în lista de lansare la Resend/Shopify).
5. Pentru **aplicație** nu-mi trebuie niciun secret Apple: Hub-ul verifică tokenul cu **cheile publice** Apple. Îmi dai doar **Team ID**-ul (public) și confirmarea că App ID-ul are capability-ul bifat.

### 5D. Samsung – nimic de făcut.

## 6. Dezvoltare vs producție (adrese, domenii, siguranță)
- **Site:** Shopify ține toate redirecturile; aceleași setări merg și acum (magazin cu parolă) și după lansare; la schimbarea domeniului contului – pasul 5A.8.
- **Aplicație:** în **Expo Go** (testele de acum) Apple dă tokenul cu audiența `host.exp.Exponent`, iar Google nativ **nu merge** (cere build propriu) → Google prin pagina Shopify. În **build-urile EAS** (TestFlight / Play) audiența e `ro.mariuschera.hub`. Hub-ul acceptă audiența Expo Go **doar cât** setarea `app_allow_expo_go` e pornită (există deja), deci în producție rămâne strict.
- **Server local vs live:** ca azi (`EXPO_PUBLIC_HUB_URL` către Worker-ul local sau live).
- **Stocare sigură:** în telefon stă **doar** tokenul de sesiune Hub, în **Keychain (iOS) / Keystore (Android)** prin SecureStore (există). Tokenul Apple/Google se trimite o dată la Hub și **nu se păstrează** nicăieri. În aplicație nu există niciun secret: Client ID-urile sunt publice prin definiție. Secretul Google și cheia Apple `.p8` stau **doar în Shopify** (pentru site); Hub-ul nu are nevoie de ele.
- **Fără parole:** nicăieri în sistem nu există parole de client (Shopify = cod pe e-mail; Apple/Google = token semnat; Hub = sesiune revocabilă).

## 7. Ce construiește Claude (după OK-ul tău pe acest plan)
| Etapă | Ce | Timp | Testabil |
|---|---|---|---|
| **A. Hub** (repo `chera-hub`) | migrația `0015_identity_links.sql`; `POST /app/auth/native` (verificare JWT Apple/Google cu JWKS, audiență, nonce, e-mail verificat); legarea după e-mail + crearea clientului Shopify (Admin API `customerCreate`); fluxul „e-mail diferit → cod” (Resend); `GET/DELETE /app/api/me/identities`, `POST /app/api/me/identities/add`; `POST /app/api/me/profile` (nume, telefon → Shopify `customerUpdate`); ștergerea legăturilor în fluxul GDPR; teste | 0,5 zi | local + live, cu tokenuri de test |
| **B. Aplicație** (repo `chera-hub-app`) | ecranul de login cu cele 3 variante (Apple doar pe iOS; Google nativ/pagina Shopify după mediu); ecranul „Completează profilul” (nume, telefon, consimțământ); Setări → „Metode de conectare” + Delogare + Șterge contul; textele în română | 0,5 zi | Apple în **Expo Go pe iPhone-ul tău** (merge fără cont Apple Developer); Google prin pagina Shopify după 5A |
| **C. După conturile Apple/Google** | build EAS cu `usesAppleSignIn`; Google nativ (clienții iOS/Android din 5B); test TestFlight; nota pentru reviewer Apple (4.8 e îndeplinit) | 0,5 zi | TestFlight |
| **Site** | nimic de construit – Shopify (5A acum, 5C.4 când Apple apare) | 0 | fereastră privată |

Cost nou: **0** (Google Cloud gratuit la acest volum; Apple Developer e deja în planul aplicației; Samsung nu există).

## 8. Riscuri și limite, spuse clar
- **Apple pe site** depinde de Shopify (acces timpuriu). Până atunci, pe site: e-mail + cod, Shop, Google. Nu încalcă nicio regulă: regula Apple 4.8 privește **doar aplicația iOS**, și acolo o îndeplinim nativ.
- **Google în fereastră „WebView”** dă eroare 403 (raportat de dezvoltatori Shopify). Aplicația noastră deschide login-ul într-o **fereastră de sistem** (ASWebAuthenticationSession pe iOS / Custom Tabs pe Android), nu în WebView → ar trebui să meargă; se confirmă la primul test după 5A.
- **Shopify primește doar e-mailul** din login-ul social → numele/telefonul le cerem noi (punctul 4).
- **„Hide My Email”** (Apple) → e-mail de releu diferit de cel de pe site → o singură dată i se cere e-mailul de pe site + cod. Fără asta ar apărea un client dublu – de aceea nu legăm „orbește”.
- **Pagina de login Shopify nu se poate personaliza** (ordinea și textul butoanelor sunt ale Shopify). În aplicație, ecranul e al nostru.
- **Decizie schimbată:** planul din 31.10 excludea Apple/Google Sign-In din prima versiune a aplicației; cu Google activ pe site, Apple devine obligatoriu în aplicația iOS → intră în prima versiune. Nu schimbă calendarul (Apple se testează oricum abia cu TestFlight).

## 9. Supabase vs Firebase (răspunsul la întrebare)
Dacă am porni **de la zero**, fără Shopify: **Supabase** ar fi alegerea mai potrivită pentru Expo + un site simplu – bază Postgres cu reguli de acces pe rând, ghid oficial Expo cu Apple și Google prin `signInWithIdToken`, plan gratuit generos, fără dependență de Google; Firebase e bun, dar te leagă de ecosistemul Google și facturarea e mai greu de prevăzut. **În cazul nostru însă** ambele ar fi greșite: identitatea clientului **trebuie** să fie contul Shopify (plată, `chera.expira`, chat), iar Shopify nu acceptă un login extern pentru cumpărături pe conturile noi (Multipass nu e suportat; furnizor propriu OIDC doar pe Plus). Am avea două registre de utilizatori, dubluri, o factură în plus și mai mult de întreținut – exact ce vrei să eviți. Hub-ul (Cloudflare, cost 0) face deja rolul de „server de sesiuni” al aplicației.

## 10. Surse (consultate 31.10.2026)
- Shopify – opțiuni de login pentru conturile de client: https://help.shopify.com/en/manual/customers/customer-accounts/sign-in-options
- Shopify – login social (Google și Facebook; „doar e-mailul se sincronizează”): https://help.shopify.com/en/manual/customers/customer-accounts/sign-in-options/social-sign-in
- Shopify – conectarea Google (pașii din §5A): https://help.shopify.com/en/manual/customers/customer-accounts/sign-in-options/social-sign-in/google
- Shopify – conectarea Apple („early access”, pașii din §5C): https://help.shopify.com/en/manual/customers/customer-accounts/sign-in-options/social-sign-in/apple
- Shopify – gestionarea login-ului social și schimbarea domeniului: https://help.shopify.com/en/manual/customers/customer-accounts/sign-in-options/social-sign-in/manage
- Shopify changelog, 13.08.2025 – login social pe conturile de client: https://changelog.shopify.com/posts/social-sign-in-options-now-available-on-customer-accounts
- Shopify – Customer Account API (PKCE, clienți publici): https://shopify.dev/docs/api/customer
- Shopify dev community, 06.02.2026 – Apple lipsă, Google 403 în WebView, Multipass nesuportat: https://community.shopify.dev/t/social-login-compliance-apple-requires-sign-in-with-apple-if-we-offer-google-facebook/29338
- Apple – App Review Guidelines 4.8 (Login Services) și 5.1.1(v) (ștergerea contului): https://developer.apple.com/app-store/review/guidelines/
- Expo – Apple Authentication (merge în Expo Go pe iOS; `usesAppleSignIn`): https://docs.expo.dev/versions/latest/sdk/apple-authentication/
- Expo – Google authentication (cere build propriu, SHA-1 din Play Console): https://docs.expo.dev/guides/google-authentication/
- Samsung Account Developer Console: https://developer.account.samsung.com/
- Samsung SignIn SDK (Instant Plays) – obținerea client ID-ului prin formular: https://developer.samsung.com/instant-plays/samsung-signin-sdk/get-started.html și https://developer.samsung.com/instant-plays/samsung-signin-sdk/use-the-sdk.html
- Samsung Pay / Wallet / Knox – programe de parteneri: https://developer.samsung.com/pay/native/partner-onbarding.html, https://developer.samsung.com/wallet/onboarding.html, https://docs.samsungknox.com/dev/fundamentals/get-started
- Supabase – Expo social sign-in quickstart: https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-sign-in
- Captură din adminul Chera Protocol (31.10): Authentication arată Shop (On), Google (Connect), Facebook (Connect); Apple nu apare.

## 11. Stare implementare (31.10 → 1.11.2026, noaptea; OK-ul lui Marius pe plan dat pe 31.10 seara)
**Hub (`chera-hub`, commit `d8adedf`, push făcut):**
- migrația `0015_identity_links.sql`: tabelele `identity_links` (provider, subject, customer_id, email) și `auth_codes` (codurile pe e-mail, 10 min, max 5 încercări, max 3 coduri/e-mail/15 min) + coloanele `clients.phone`, `clients.profile_done_at`;
- `src/app/oidc.ts`: verificarea tokenurilor Apple/Google cu cheile publice (JWKS, cache 1 h, reîncercare la rotirea cheilor), RS256, emitent, audiență, expirare, nonce (SHA-256), e-mail verificat / „Hide My Email”;
- `src/app/native.ts`: regula de legare `decideLink` (legătura existentă → e-mail verificat + client Shopify → client nou / e-mail diferit → cod), clienții Shopify (căutare după e-mail, `customerCreate`, `customerUpdate` nume + telefon), codurile pe e-mail (Resend), `finishLogin` (sesiune Hub 30 zile, audit);
- rute noi: `POST /app/auth/native`, `/app/auth/native/create`, `/app/auth/native/email`, `/app/auth/native/verify`; cu sesiune: `GET/POST /app/api/me/profile`, `GET/POST/DELETE /app/api/me/identities(/:provider)`, `POST /app/api/me/delete` (confirmare „STERG”; șterge tot din Hub și toate sesiunile; clientul Shopify rămâne, pentru comenzi); `GET /app/api/session` întoarce și `needsProfile`, `loginMethods`, `customer.phone`;
- GDPR: ștergerea curăță și `identity_links`, `app_sessions`, `device_tokens`, `auth_codes`; cron nocturn: curățarea codurilor expirate; scope nou în cod: `write_customers`;
- teste: `test/native.test.ts` (tokenuri semnate cu o cheie RSA de test: valid, audiență/nonce/expirare/emitent/cheie/semnătură greșite, `alg=none`, Google; regula de legare; normalizări) – 90 de teste trec, `tsc` curat. Audiențele acceptate: Apple = `app_apple_audiences` (implicit `ro.mariuschera.hub`) + `host.exp.Exponent` cât `app_allow_expo_go` e pornit; Google = setarea `app_google_client_ids` (goală → mesaj clar „neconfigurat”).
- **Deploy + migrația live:** limita zilnică D1 (plan gratuit) era depășită la 01:30; un proces din aplicația Claude aplică migrațiile 0014 + 0015 pe live și face `wrangler deploy` imediat după resetarea de la 02:00 (00:00 UTC); rezultatul în JURNAL.

**Aplicația (`chera-hub-app`, commit `1e290fc`, local – repo-ul GitHub privat nu e creat încă):**
- `expo-apple-authentication` + `expo-crypto` instalate; `app.json`: `ios.usesAppleSignIn: true` + pluginul;
- ecranul de login: **„ Continuă cu Apple”** (doar iPhone, nativ), **„G Continuă cu Google”** (deschide pagina de login a site-ului – Google apare acolo după §5A; nativ mai târziu, §5B), **„Intră cu e-mail (cod)”**; pe Android notă pentru Samsung → Google;
- pașii când Hub-ul nu poate lega singur: „Nu am găsit un cont cu …” → *Sunt client nou, creează contul* / *Am deja cont cu alt e-mail* → e-mail → cod de 6 cifre;
- `profile.tsx`: la prima intrare, prenume (obligatoriu), nume, telefon (07… → +40…), scrise și în Shopify; `settings.tsx`: profil, **Metode de conectare** (Apple: Adaugă / Deconectează; Google: „se leagă singur când intri cu Google pe pagina site-ului”), Descarcă datele mele (JSON, prin Share), politica, Ieși din cont, **Șterge contul** (scrii STERG); antetul chatului are „Setări” în loc de „Ieși”;
- `tsc`, `expo lint`, `expo export --platform web` curate. **Netestat încă pe telefon** (Expo Go) – pasul următor, cu Marius.

**Actualizare 1.11, 02:13:** migrațiile și deploy-ul sunt pe live (02:01); versiunea `v5-write-customers` e activă în Dev Dashboard și permisiunea `write_customers` e aprobată pe magazin (făcute de Claude din panoul browserului, după ce Marius a dat permisiunea explicit în chat – prima încercare fusese blocată de filtrul de siguranță al aplicației). Pasul 1 de mai jos e deci încheiat; rămân 2–4.

**Rămâne la Marius (în ordine):**
1. **Shopify Dev Dashboard → Apps → Chera Hub → Versions → Create version** (formularul vine completat din v4-app-login): la **Scopes** pune exact
   `read_customers,write_customers,read_orders,write_app_proxy,read_themes,write_themes,read_products,write_products,read_content,write_content,customer_read_customers`
   (am încercat eu, dar schimbarea permisiunilor unei aplicații e blocată din aplicația Claude – e o acordare de permisiune, o faci tu), Version name `v5-write-customers` → **Release**. Apoi deschide o dată `https://chera-hub.chera-hub.workers.dev/auth` (logat în admin) și apasă **Install**, ca aplicația să primească `write_customers` (fără el, contul nou din aplicație și salvarea numelui/telefonului în Shopify dau eroare; login-ul clienților existenți merge și fără).
2. **Google în Shopify** – §5A (independent de restul; ~30 min).
3. **Testul în Expo Go** pe iPhone: `npx expo start` din aplicația Claude → scanezi codul → „Continuă cu Apple” (merge în Expo Go, fără cont Apple Developer; audiența `host.exp.Exponent` e acceptată cât `app_allow_expo_go` e pornit) → ecranul de profil → chat → Setări.
4. Când vine contul Apple Developer: §5C; când ai clienții OAuth Google: §5B → Claude pune `app_google_client_ids` și activează Google nativ în aplicație.
