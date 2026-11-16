# Prime Vizibilitate: aplicația noastră de creștere organică (16.11.2026)

Cerută de Marius pe 16.11: aplicație în Shopify, cu punctele 1–3 din cele 10 idei („Search Console, panel AI, articole pe social”). Apoi a cerut „toate punctele care consideri că sunt necesare” și 5 idei noi. Cod: `D:\Proiecte Claude\Prime Supplements\prime-indexare` (repo git local). Server: Cloudflare Worker `prime-indexare` pe contul Prime, fără cost. **Nu cere nicio permisiune pe magazin** și citește doar paginile publice și API-urile pentru care pui tu cheile.

## Ce face (tab-urile din aplicație)
| Tab | Ce face | Când | Ce cheie îi trebuie |
|---|---|---|---|
| **Indexare** | Trimite la Bing paginile noi, modificate sau șterse din sitemap. Prin Bing ajung și la Copilot, ChatGPT, Yahoo, DuckDuckGo și Ecosia | zilnic 06:00 | Bing, pusă |
| **Google** | (1) pagini pe pozițiile 8–20 = cel mai rapid câștig; (2) legături interne recomandate; (3) canibalizare; (4) titluri cu CTR slab, cu propuneri Gemini la un click; (5) idei de articole; (6) urmărirea pozițiilor pe 20 de cuvinte, cu alertă la scădere; (7) paginile noi verificate în indexul Google | luni 06:00; indexarea Google zilnic | contul de serviciu Google |
| **Asistenți AI** | Cele 20 de întrebări de client, puse în Gemini (cu căutare Google) și opțional în ChatGPT. Arată cine e menționat, evoluția și confuzia cu PRIME/QNT | luni 06:00 | Gemini nivel plătit; OpenAI opțional |
| **Social** | Fiecare articol nou de pe blog → postare pe Facebook (cu link) și Instagram („link în bio”), plus Pinterest dacă îl legi în Zernio. Mod: oprit / cu aprobare (un click) / automat | din oră în oră, 08–21 | Zernio |
| **Sănătate site** | Zilnic, 10 pagini-cheie (schema Product/Offer/stele, firma, H1). Săptămânal, toate paginile din sitemap: linkuri interne rupte (404) și spre redirecturi, pagini cu probleme, recenziile din schema, viteza reală (Chrome UX Report) | zilnic 05:00; complet duminică 02:00; viteza luni 07:00 | CrUX doar pentru viteză |
| **Concurență** | Pagini noi (produse, articole) apărute în sitemap-urile Genius, GymBeam, Nutriland și Pro Nutrition | duminică 12:00 | – |
| **Raport săptămânal** | Totul pe o pagină: clicuri și afișări față de săptămâna trecută, oportunități, poziții câștigate și pierdute, AI, social, site, recenzii, viteză, concurență | luni 09:00 | – |
| **Alerte** | Scăderi de poziție de cel puțin 3 locuri, pagini-cheie stricate de o temă nouă, linkuri rupte, LCP/INP peste prag, pagini noi neindexate, postări eșuate | imediat | – |

Ce **nu** se poate face automat: forțarea Google (Indexing API e doar pentru joburi și transmisiuni live) și IndexNow (Shopify nu permite fișierul cheie la rădăcina domeniului). Bing Shopping se face din Microsoft Merchant Center (`recenzii/04-MICROSOFT-MERCHANT-CENTER.md`), nu din aplicație.

## Pașii tăi (o singură dată)
### 1. Aplicația în Shopify Admin – FĂCUT 16.11
**Stare 16.11:** aplicația e creată (Dev Dashboard id 447981223937, versiunea `v1-fara-permisiuni`, Client ID în `wrangler.jsonc`), secretul e pus de Marius și aplicația e instalată. Dev Dashboard nu are „Install app” pentru magazinul real (doar „Test app”, pentru magazinele de dezvoltare), așa că instalarea se face din `https://admin.shopify.com/store/primesupplements1/oauth/install?client_id=<Client ID>`. Social: Zernio conectat, FB + IG bifate, mod „cu aprobare”. Gemini: cheia de pe proiectul plătit „Imagini blog shopify”.

1. https://dev.shopify.com → **Apps** → **Create app** → „Start from Dev Dashboard”, nume **Prime Vizibilitate**.
2. La versiune: **App URL** = `https://prime-indexare.prime-expediere.workers.dev/`, **Embed app in Shopify admin** = da. **Fără niciun scope** (nicio permisiune). **Release**.
3. Copiază **Client ID** și spune-mi-l (e public; îl pun eu în configurație).
4. **Client secret**: îl lipești tu în terminal, la comanda pe care ți-o deschid (`secret put SHOPIFY_API_SECRET`).
5. Din Dev Dashboard → **Install app** pe magazin. Aplicația apare apoi în Shopify → Aplicații.

Până atunci aplicația merge și direct, cu linkul de status (`…/?t=…`), care rămâne valabil.

### 2. Google: Search Console și viteza (circa 10 minute)
1. https://console.cloud.google.com cu contact@ → proiectul existent (sau unul nou, „Prime Vizibilitate”).
2. **APIs & Services → Library**: activează **Google Search Console API** și **Chrome UX Report API**.
3. **IAM & Admin → Service accounts → Create**, nume `prime-vizibilitate`, fără roluri → **Keys → Add key → JSON**. Se descarcă un fișier.
4. În **Search Console → Setări → Utilizatori și permisiuni → Adaugă utilizator**: adresa contului (`prime-vizibilitate@….iam.gserviceaccount.com`), permisiune **Restricționată**.
5. **APIs & Services → Credentials → Create credentials → API key**, restricționată la „Chrome UX Report API”.
6. În aplicație → **Setări**: lipește tot conținutul fișierului JSON și cheia API, apoi **Salvează**.

### 3. Asistenți AI
- **Gemini:** Google AI Studio → API keys. Căutarea Google în răspunsuri cere nivelul plătit; cheia gratuită de pe PC dă 429. Cost estimat: circa 20 de întrebări pe săptămână, câțiva lei pe lună.
- **ChatGPT** (opțional): cheie OpenAI. Modelul se schimbă în Setări (implicit `gpt-5-mini`).

### 4. Social
- Zernio → Settings → **API keys** → cheia în Setări. Apoi bifează conturile (Facebook `primesupplementsro`, Instagram `primesupplements_ro`) și alege modul. Recomand **cu aprobare** în prima săptămână, apoi automat.
- La pornire nu repostează articolele vechi; pleacă doar cele publicate de acum înainte.

## Siguranță
- Cheile stau criptate (AES-256-GCM, `ENC_KEY`), nu se mai afișează și nu sunt în repo.
- Accesul se face din Shopify Admin (token de sesiune verificat) sau cu linkul de status.
- Textele propuse pentru titluri respectă regulile: fără promisiuni de sănătate neautorizate, fără furnizor. Le aplici tu în Shopify, aplicația nu scrie nimic în magazin.
- Postările pe social folosesc titlul și rezumatul articolului, care trec deja prin regulile blogului.
