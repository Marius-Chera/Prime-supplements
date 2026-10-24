# Audit SEO complet – primesupplements.ro (25.10.2026, doar citire)

**Nimic nu a fost modificat pe site, în Shopify sau în aplicații.** Auditul a citit site-ul live (curl, PageSpeed Insights, Google), datele din Shopify (209 produse active, 25 de colecții, blogul) și paginile principalilor concurenți (GymBeam, Nutriland, Pro Nutrition, Genius Nutrition).

Ce era deja în repo și nu se reia în detaliu: auditul mare din 12–13.10 (`FULL-AUDIT-REPORT.md`, `findings/`, `ACTION-PLAN.md`, `data/round2-status.md`), PageSpeed din 13.10 (`PAGESPEED-2026-10-13.md`), auditul de căutări Google/Bing/ChatGPT din 23.10 (`seo/AUDIT-CAUTARI-2026-10-23.md`), strategia de recenzii (`recenzii/`), Merchant Center (`google/`). Acest document spune **ce mai e deschis acum, ce e nou și ce contează cel mai mult**.

---

## 1. Pe scurt

| Zonă | Stare la 25.10 |
|---|---|
| Tehnic (indexare, canonice, redirecturi, sitemap, robots) | **Bun.** Un singur domeniu canonic, `/ro-hu`, `www` și `myshopify` fac 301, colecțiile-dublură sunt noindex, sitemap curat (210 produse, 18 colecții, 9 pagini, 149 articole), robots.txt cu Content-Signal pentru AI, JSON-LD valid pe toate paginile verificate. |
| On-page (titluri, meta, H1, alt) | **Bun pe suplimente, cu scăpări pe hainele adăugate recent** (6 produse MNX fără titlu SEO, meta și alt; 10 fără alt; 9 fără tip de produs), H1-uri de categorie cu denumiri vechi („Pudre Proteice”), homepage cu H1 = logo, Contact fără H1. |
| Viteză | **Acceptabil.** Date reale (Chrome UX Report): Core Web Vitals trecute (LCP 1,4 s, INP 125 ms, CLS 0). Laborator mobil: homepage 81/100, produs 77/100 (LCP 4,0–4,3 s, 2,7–3,3 MB, 70 de scripturi). SEO 100, Accesibilitate 100. |
| Conținut | **Mult mai bun decât în octombrie, dar încă „informativ”, nu „de vânzare”.** 92 din 105 produse (fără MNX) nu au întrebări frecvente; paginile de produs nu trimit la ghiduri; blogul (149 de articole, 1 pe zi) aduce trafic fără vânzări. |
| Autoritate și dovezi externe | **Punctul cel mai slab.** Recenziile (454, nota 4,88) sunt doar pe site; nu suntem pe Trustpilot, în comparatoare sau în articolele „cea mai bună proteină/creatină”; ChatGPT ne recomandă rar. |
| Dubluri | **Magazinul B2B e încă indexat în Google** (verificat 25.10: 3 pagini de rezultate, cu descrierile vechi ale agenției și afirmații de sănătate neautorizate). Problemă cunoscută din 12.10, nerezolvată. |

**Concluzie:** tehnic nu mai avem frâne mari. Diferența față de GymBeam, Nutriland, Pro Nutrition și farmacii este de **autoritate (recenzii și mențiuni externe), adâncime a paginilor care vând și claritate a categoriilor**. Cele 10 priorități de la secțiunea 6 sunt ordonate după acest diagnostic.

---

## 2. Ce s-a îmbunătățit în ultimele 10 zile (12–24.10.2026)

Sursa: `JURNAL.md`, istoricul git și verificările live de azi. Totul a respectat regula „fără schimbări de design fără aprobare”.

### Site și SEO
- **Audit complet pe 12–13.10** (17 specialiști, ~250 de constatări) și două runde de remediere.
- **Dublura `/ro-hu` eliminată**: 575 de pagini duplicate, cu prețuri fără TVA, acum fac 301 către pagina românească (verificat azi). URL-urile vechi din WooCommerce și `www` fac un singur 301.
- **Blog curățat**: din 355 de articole generate automat au rămas 121 (azi 149, cu cele noi), câte unul pe subiect; 234 de redirecturi; corpuri fără scripturi, fără linkuri `myshopify`, fără date false, fără afirmații medicale, cu disclaimer și pagină de autor; rezumate curate; o singură etichetă de temă pe articol.
- **Produse**: titluri în română cu diacritice (= H1), descrieri complete cu „Pe scurt / Ingrediente / Detalii produs”, doar mențiuni de sănătate autorizate UE, titlu SEO + meta descriere pe toate produsele și colecțiile, alt text pe 493 de imagini, tipuri de produs și vendor corecte (Frutilu pe băuturi).
- **Date structurate**: Product cu preț, stoc, GTIN valid, livrare, retur și rating Judge.me; Article cu autor legat de pagina lui; Organization + OnlineStore cu CUI, adresă, fondator; ContactPage/AboutPage/ProfilePage. Toate blocurile sunt JSON valid (verificat azi pe 17 pagini).
- **Teme publicate**: 12–16.10 (SEO + viteză: fonturi servite local, fără Fontify extern, CSS inline, zoom permis pe Android, ARIA), 22.10 (homepage fără text duplicat, diacritice, H1 pe Despre noi, og:title = titlu SEO), 23.10 (ghidurile de categorie afișate sub produse pe toate cele 17 categorii; Clarity doar după acord; banner cookie fără suprapuneri; Chat în stânga).
- **Colecții**: 17 ghiduri de categorie conforme (doar date de etichetă și mențiuni UE), titluri și meta noi pentru Pudră proteică și Cremă de orez („cream of rice”), preț pe porție în meta la Whey 2 kg, Whey 1 kg, Pure Isolate; Reduceri cu 15 pachete (12 + 3 de iarnă) cu descrieri, FAQ, linkuri interne.
- **Pagini**: autor (E-E-A-T complet, ProfilePage), Despre noi, Contact, termeni aliniați cu livrarea, politica de cookie-uri nouă (24.10).
- **Căutări și AI**: Bing Webmaster Tools configurat, sitemap trimis, 20 de adrese trimise, Site Scan pornit, IndexNow verificat; Google Search Console cu reindexare cerută pentru 9 pagini; Microsoft Merchant Center creat și importat din Google (337 de produse în verificare, 94 contestate); feedul Judge.me → Google Shopping corectat (https, fără produse scoase).
- **Măsurare**: audit de poziții Google/Bing/ChatGPT (23.10), raport săptămânal creatină, raport lunar „ce am lucrat”.

### Vânzări, e-mail, social (indirect SEO: marcă și recenzii)
- 15 pachete cu reducere, coduri curățate (43 șterse, plafon 20 %), e-mail obligatoriu la comandă, bara de livrare gratuită.
- theMarketer: design comun pentru toate e-mailurile, Welcome și coș abandonat refăcute, fluxul „Reaprovizionare 2026” pornit, campanii D3+K2 „din nou în stoc”.
- Calendar social 19.10–17.11 (50 de postări), campanie D3+K2, afiliați (raport lunar, kit foto).
- Conformitate: banner cookie cu „Refuz toate”, Clarity doar după acord, politica de cookie-uri nouă.

### Rezultat măsurabil până acum
- 13–19.10 față de media pe 90 de zile: comenzi +37 %, comenzi din Google +38 % (JURNAL). Datele Search Console există doar din 11.10, deci efectul SEO complet se vede după 4–8 săptămâni.

---

## 3. Ce este în regulă acum (verificat live 25.10)

- Redirecturi: `http://` → `https://`, `www` → fără www, `primesupplements1.myshopify.com` → domeniu, `/ro-hu/...` → `/...`. Pagina 404 răspunde corect 404.
- `robots.txt`: blochează coș/checkout/cont/filtre, permite restul, `Content-Signal: search=yes, ai-input=yes, ai-train=yes`, sitemap declarat. `/.well-known/ucp` și `/llms.txt` răspund 200 (fișierele standard Shopify pentru agenți AI).
- Sitemap: 210 produse (209 cu imagine), 18 colecții, 9 pagini, 149 de articole, toate cu imagini. `all`, `frontpage`, `cele-mai-vandute`, `lansate-recent`, `11-tva` sunt noindex și în afara sitemap-ului (dar rămân în meniu).
- Titluri și meta pe toate paginile cheie, în limite (home 60, colecții 54–63, produse ≤ 64 caractere); canonice corecte; `lang="ro"`; viewport corect; og:/twitter: complete.
- JSON-LD valid pe toate cele 17 pagini verificate: Product (7 oferte pe Whey 2 kg, GTIN, livrare, retur, AggregateRating 4,77 din 48), CollectionPage + ItemList + BreadcrumbList, Article (datePublished/dateModified, autor Person cu @id), Organization + OnlineStore, FAQPage pe homepage, ProfilePage pe autor.
- Imagini: `srcset` și `width/height` pe 48–51 din 52 de imagini ale paginii de produs, `loading="lazy"` pe 45; 0 imagini fără atribut alt.
- Accesibilitate 100, SEO 100, Best Practices 96 (Lighthouse mobil), „Agentic Browsing” 5/5 pe homepage.
- Date reale Chrome (28 de zile, telefon): LCP 1,4 s, INP 125 ms, CLS 0 → Core Web Vitals **trecute**.

---

## 4. Toate problemele găsite

Legendă: **NOU** = găsit azi; **CUNOSCUT** = în auditul din 12.10, încă deschis; **PROPRIETAR** = cere decizia sau accesul proprietarului. ID-urile vechi sunt din `findings/`.

### 4.1 Indexare și dubluri
1. **CUNOSCUT · PROPRIETAR · Magazinul B2B (`b2b.primesupplements.ro`) e indexabil și indexat în Google** (TECH-02, SXO-05, AUTHORITY-07). Verificat 25.10: `site:b2b.primesupplements.ro` dă 3 pagini de rezultate (batoane, Potassium Complex, Thermo Core, Magnesium Citrate, Zinc, Coenzima Q10, Vitamin C, colecția Batoane). E un magazin Shopify separat (`kuqr0h-en.myshopify.com`): 58 de produse, 20 de colecții, 10 pagini, propriul sitemap și robots, fără noindex, fără canonical spre site-ul principal, fără meta descriere, cu Google Fonts externe și cu **descrierile vechi ale agenției** („arderea grăsimilor”, „antioxidant natural cu rol crucial în producția de energie”), adică exact afirmațiile curățate de pe site-ul principal. Entitatea apare ca „PRIME SPORT SUPPLEMENTS SRL / 46260823”. Efect: împarte semnalele, poate afișa prețuri en-gros consumatorilor și expune firma la afirmații neconforme.
2. **CUNOSCUT · PROPRIETAR · Piața „Ungaria” e încă activă** (INTERNATIONAL-05): `?country=HU` răspunde 200 pe orice pagină. Dublura `/ro-hu` e rezolvată, dar selectorul și prețul net pot încă apărea. Dezactivarea se face din Setări → Piețe.
3. **NOU (minor) · Colecții ascunse în Admin**: `black-friday-special` (7 produse, titlu SEO „Black Friday Special – pachete Prime Supplements”) și `eligibile-coduri-reducere` (210 produse) există în Shopify; pe site dau 404 (nu sunt publicate), deci nu afectează Google. Prima contrazice regula „fără Black Friday”; de șters sau golit, la decizia proprietarului.
4. **CUNOSCUT · Google încă afișează uneori URL-uri vechi** (`www`, `/ro-hu`): azi căutarea `site:primesupplements.ro inurl:ro-hu` nu mai returnează rezultate, semn bun; se confirmă în Search Console peste 2–4 săptămâni.

### 4.2 On-page (titluri, H1, meta, alt, tipuri)
5. **NOU · 6 produse MNX adăugate recent nu au titlu SEO, meta descriere, alt text și tip de produs**: `mnx-hoodie-original-black`, `mnx-hoodie-original-red`, `mnx-ribbed-pants-hammer-3-0-light-black`, `-white`, `mnx-ribbed-pants-hammer-2-0-black`, `-white`. Alte 4 tricouri Prime (`tricou-sala-oversized-barbați-prime-turcoaz-intense`, `-galben-pastel`, `tricou-gym-supradimensionat-lejer-burgundy-prime`, `-roz-pastel-prime`) nu au alt text și tip de produs (iar handle-ul cu „ă” din „barbați” contrazice regula ASCII din runda 2). Total: 10 fără alt, 9 fără tip, 6 fără SEO. Aceleași 10 apar în sitemap-ul de imagini cu legenda goală.
6. **NOU · 3 titluri SEO peste 60 de caractere**: NAC (64), tricou turcoaz (63), Pachet Rutina Zilnică (61). Google le taie.
7. **NOU · H1-urile de categorie nu spun cuvântul căutat.** H1 = titlul colecției din Shopify, rămas de la agenție: „Pudre Proteice” (titlul SEO zice „Proteină whey din zer”), „Pre-Workout”, „Suplimente”, „Accesorii”, „Îmbrăcăminte”, „Intra-workout”, „Shoturi”. Concurenții au H1 = termenul exact („Creatină monohidrată”, „Izolat proteic din zer”, „Crema de orez”). Schimbarea titlului colecției e text, nu design, dar apare și în breadcrumb și în meniuri, deci cere acordul proprietarului.
8. **CUNOSCUT · PROPRIETAR · Homepage: H1 este logo-ul** (`<h1 class="header__logo">`, fără text) (SXO-07, ONPAGE-08). Singurul text vizibil deasupra produselor e bara „Livrare gratuită… Tehnologii de ultimă generație și ingrediente de cea mai înaltă calitate” (repetată de 10 ori în HTML, ca marquee). Un H1 românesc cu „suplimente, proteine, creatină” cere o modificare de temă (design).
9. **NOU · Pagina Contact nu are H1** (celelalte pagini au).
10. **NOU · 6 colecții au imaginea fără alt text**: alimente-sanatoase, accesorii-sala, echipament-sala, shot-pre-workout, haine-mnx, bauturi.
11. **CUNOSCUT · PROPRIETAR · Widgetul Judge.me e în engleză pe pagini**: „Customer Reviews”, „Write a review”, „Based on 48 reviews”, iar pe homepage „Let customers speak for us” (OWNER-HANDOVER pct. 7). Textele se traduc din aplicația Judge.me → Settings → Translations (panoul aplicației nu se poate citi de aici; text pentru extensie la final).
12. **CUNOSCUT · 121 de variante fără cod de bare**, din care 26 nu sunt MNX: șepci, tricouri Prime, shakere, prosop, centură și **cele 6 pachete native** (`pachet-*`). Pachetele fără GTIN pierd eligibilitatea completă în Google Shopping / Merchant Center (unde produsele sunt trimise prin Simprosys).

### 4.3 Conținut și conversie
13. **NOU · 92 din 105 produse fără MNX nu au o secțiune „Întrebări frecvente”** în descriere, inclusiv cele mai vândute: Prime Whey 2 kg, Prime Whey 1 kg, Creapure®, Pure Isolate, toate cremele de orez, toate băuturile Frutilu, vitaminele Prime Health. Pachetele (15) au FAQ, produsele de bază nu. FAQ-ul e exact pasajul pe care îl citează Google („Oamenii întreabă și”) și motoarele AI.
14. **NOU · Paginile de produs nu trimit la ghiduri.** Whey 2 kg, Creapure® și Q10: 0 linkuri către blog; Pure Isolate: 1. Blocul „Citește și” există doar pe pachete. Colecțiile trimit la 2–5 ghiduri, dar produsul (unde se ia decizia) nu. Invers, articolele trimit la produse (caseta de produs) – deci fluxul e doar într-un sens.
15. **CUNOSCUT · Blogul aduce trafic fără vânzări** (SXO-10, audit 23.10): articolele cele mai vizibile în Google sunt ceai diuretic, fat burner, spirulină, scorțișoară – subiecte fără legătură cu proteina și creatina, unde pierdem. 149 de articole publicate, 1 pe zi din 23.10; blogul are 400 de articole în total (inclusiv cele 234 depublicate și ciornele). Listarea are 7 articole pe pagină → ~22 de pagini de paginare (TECH-04 parțial): articolele vechi sunt la 10–20 de clicuri de homepage; paginile-hub pe temă (cele 11 etichete) nu există ca pagini de sine stătătoare.
16. **CUNOSCUT · Paginile de produs nu răspund la comparația de preț** (SXO-08, audit 23.10 §6): ChatGPT compară prețul pe 100 g și ne arată de 2 ori mai scumpi la whey decât GymBeam Just Whey. Pagina Whey 2 kg are prețul pe porție în meta, dar nu are un bloc vizibil „ce primești pentru preț” (proteină pe porție vs concurenți, origine UE, teste de lot, aromă, îndulcitori), nici tabel comparativ concentrat/izolat/Whey Go.
17. **CUNOSCUT · Textele ghidurilor de categorie sunt sub produse** (publicat 23.10): bun pentru design, dar Google vede 1.300 de cuvinte vizibile pe colecția de proteine față de 3.400–4.200 la GymBeam și Nutriland. Nu e nevoie de mai mult text generic, ci de **subcategorii pe intenție** (vezi 6.4).
18. **CUNOSCUT · PROPRIETAR · Revizie editorială a articolelor vechi** pentru mențiuni de sănătate (OWNER-HANDOVER 16, DE-FACUT 3): NAC „mucolitic/ficat/imunitate”, spirulină, ashwagandha, arzătoare.

### 4.4 Autoritate, marcă și motoare AI
19. **CUNOSCUT · Zero dovezi independente** (AUTHORITY-02, -09; audit 23.10 §7): 454 de recenzii Judge.me doar pe site (stelele ajung în Google Shopping prin feed din 10.04, de verificat ~02.11), niciun profil Trustpilot pe numele nostru (apare în schimb „Prime Sports Nutrition” din SUA), nu suntem în SupliScout/Compari/Skroutz, nu apărem în articolele „cea mai bună proteină/creatină” (Gold Nutrition, HyperFit, BigProtein, gym-stack), nu suntem în graful Common Crawl (AUTHORITY-01). Pro Nutrition are 685 de recenzii și Q&A pe un singur produs Creapure; GymBeam 67.000+ recenzii pe Trustpilot.
20. **CUNOSCUT · Marca nu e „stăpânită” în căutări** (SXO-03): rezumatul AI Google ne numește „brand relativ nou”, leagă marca de haine (MNX), Facebook spune „firmă nouă”; Organization are 4 profiluri `sameAs` (fără YouTube/TikTok verificate); nu există pagină de recenzii publică.
21. **CUNOSCUT · Pe Bing (sursa ChatGPT/Copilot) doar căutări de marcă**; Bing WMT și Microsoft Merchant Center sunt configurate din 23.10, în așteptare (94 de produse contestate, verificare ~28.10).
22. **NOU (minor) · `llms.txt` și `agents.md` sunt fișierele standard Shopify** (GEO-16): utile pentru agenți de cumpărare (UCP/WebMCP), nu pentru conținut. Google le ignoră; nu e o prioritate. „Agentic Browsing” pe pagina de produs: 3/4 (o schemă WebMCP invalidă și un formular neadnotat, ambele din aplicații, nu din temă).
23. **NOU · FAQPage pe homepage e despre comenzi** (stoc, retur, plată), nu despre produse – corect pentru clienți, inutil pentru căutările de produs. Pe produse și colecții nu există FAQPage (Google oricum nu mai afișează FAQ rich results pentru magazine, dar textul vizibil contează pentru AI).

### 4.5 Performanță
24. **CUNOSCUT · Paginile sunt grele** (TECH-11): HTML 714 KB homepage / 518 KB produs (96 / 88 KB comprimat), 69–71 de tag-uri `<script>`, ~240 KB JavaScript inline, 2,7–3,3 MB încărcate în total, peste 4 `preconnect`. Lighthouse mobil: homepage 81 (LCP 4,3 s, TBT 20 ms), produs 77 (LCP 4,0 s, **TBT 280 ms, execuție JS 1,6 s, fir principal 5,5 s, 6 task-uri lungi, DOM mare**). Sursele: aplicațiile Judge.me (widget + carusel + histogramă), Dondy WhatsApp, UpPromote, Pandectes, theMarketer, Shopify Inbox, Clarity, estimator. Datele reale ale utilizatorilor sunt însă bune (CWV trecute), deci e o problemă de rezervă, nu de clasare imediată. Comparativ: homepage GymBeam are 990 KB HTML, Nutriland 1,1 MB – nu suntem mai lenți decât liderii.
25. **NOU (minor) · Best Practices 96**: erori în consolă din aplicații, fără CSP/HSTS strict (standard Shopify; nu influențează SEO).

---

## 5. Unde suntem față de concurenți (25.10, pagini publice)

| Criteriu | Prime | GymBeam | Nutriland | Pro Nutrition | Genius |
|---|---|---|---|---|---|
| Pagină categorie creatină – cuvinte vizibile | ~1.300 (ghid sub produse) | ~3.500 | ~3.800 | – (blog pe categorie) | ~700 |
| Subcategorii pe intenție | nu (1 colecție Creatină cu 5 produse) | Creapure, monohidrat, multi-componentă, alte forme | monohidrată, HCL, cremă de orez, izolat | – | – |
| Produse în categoria creatină | 5 | 20+ (multe mărci) | zeci | 6 proprii | câteva |
| Recenzii pe produsul Creapure | 5,0 (puține; 48 pe Whey 2 kg) | mii pe site + 67k Trustpilot | sute | **685, cu Review + Q&A în schema, 3 tabele, 50 de specificații** | – |
| Date structurate categorie | CollectionPage + ItemList + Breadcrumb | Product × 20 în listă | Breadcrumb | – | Organization |
| FAQ vizibil pe produs | doar pe pachete | – | – | **da + schema** | – |
| Dovezi externe (Trustpilot, comparatoare, articole „cea mai bună”) | niciuna | toate | SupliScout, articole | SupliScout, articole, „26 ani producție proprie, ISO 22000” | marcă proprie puternică |
| Preț pe 100 g whey | ~19,5 lei | ~10 lei | ~8 lei | – | – |
| Core Web Vitals (date reale) | trecute | – | – | – | – |
| Titlu/H1 categorie | „Pudre Proteice” | „Creatină Creapure®” | „Izolat proteic din zer” | – | „Creatina” |
| Poziții Google (23.10) | locul 1 „crema de orez”; 15–24 la izolat/whey/Creapure; absent la „creatina”, „proteina” | peste tot | peste tot | nr. 1 Creapure | top 10 proteină/pre-workout |

Citire: GymBeam și Nutriland câștigă prin **catalog mare + autoritate + subcategorii**; Pro Nutrition câștigă la Creapure prin **pagina de produs cea mai completă din România** (recenzii, Q&A, specificații, origine). Noi avem catalog mic (nu se schimbă) și autoritate zero (se poate schimba), iar paginile noastre de produs sunt corecte, dar nu „cele mai complete”.

---

## 6. TOP 10 puncte de fixat (în ordinea efectului asupra creșterii organice, Google și motoare AI)

Pentru fiecare: problema, ce facem, ce ne apropie de concurenți, cine decide. Nicio acțiune nu a fost începută.

### 6.1 Scoatem magazinul B2B din Google (dublură + afirmații neconforme)
- **De ce primul:** e singura problemă tehnică mare rămasă; Google indexează 58 de produse-copie cu texte vechi, neconforme, și o a doua entitate a firmei. Concurenții au o singură entitate pe un singur domeniu.
- **Ce facem (decizia ta, 10 minute):** varianta recomandată – parolă pe storefront-ul B2B (Magazin online → Preferințe → Restricționează accesul); clienții B2B primesc parola sau folosesc contul. Alternativ: noindex pe tot magazinul B2B + canonical spre site-ul principal (modificare de temă pe B2B) și eliminarea temporară a subdomeniului din Search Console. După, ștergerea descrierilor vechi de pe B2B sau înlocuirea cu cele conforme.
- **Cum măsurăm:** `site:b2b.primesupplements.ro` → 0 rezultate în 2–6 săptămâni; Search Console (proprietatea de domeniu) → „Pagini” scad pe subdomeniu.

### 6.2 Dovezi independente: recenzii în afara site-ului și mențiuni (strategia 4, extinsă)
- **De ce:** exact ce citesc ChatGPT, Copilot și rezumatul AI Google; GymBeam și Pro Nutrition câștigă aici. ChatGPT ne descrie prudent („recenzii doar pe site-ul propriu”).
- **Ce facem:** (a) pornim fluxul de cerere de recenzie Judge.me (pregătit, test la Marius și Adelina), fără cupon; (b) profil Trustpilot gratuit pe primesupplements.ro (îl creezi tu) și invitații după livrare; (c) înscriere în SupliScout (e-mail pregătit în `recenzii/`), măcar pentru Creapure®, EAA și cremă de orez, unde prețul e competitiv; (d) program de mențiuni fără buget: 74 de afiliați – fiecare cu o pagină/postare care trimite la site; antrenorii și sălile partenere (Evo Gym) cu o pagină „parteneri”; presa locală Sibiu/Cisnădie (firmă locală, lector FRCF); profilul pe creapure.com (există) și cererea similară la Kyowa®; (e) o pagină publică de recenzii pe site (`/pages/recenzii`, Judge.me „All reviews page”) ca sursă citabilă.
- **Țintă:** 50+ recenzii Trustpilot și 3–5 mențiuni/linkuri externe de calitate până la Crăciun; apariție în SupliScout.

### 6.3 Paginile care vând devin „cele mai complete din România” (Whey 2 kg, Whey 1 kg, Pure Isolate, Creapure®, Cremă de orez, EAA)
- **De ce:** Prime Whey 2 kg = 105.000 lei în 90 de zile, dar poziția 7–15 și 138 de afișări; Pro Nutrition câștigă Creapure cu 685 de recenzii, Q&A, specificații și tabele.
- **Ce facem (texte, fără design):** pe fiecare din cele 6 produse: secțiune „Întrebări frecvente” (6–8 întrebări reale din Judge.me, WhatsApp și căutări: „câtă proteină are pe porție”, „e Creapure?”, „cum o prepar”, „cu lapte sau apă”, „are lactoză”, „de unde vine”), **tabel comparativ** (concentrat vs izolat vs Whey Go; Creapure vs micronizată vs plicuri; preț pe porție și pe 100 g), bloc „Ce primești pentru preț” (24 g proteină/porție, îndulcitori, origine UE, testare lot, 66 de porții), „Citește și” cu 3 ghiduri, și – când există – un răspuns public la fiecare recenzie negativă. În schema: Q&A rămâne ca text vizibil (FAQPage nu mai dă rich results pentru magazine, dar textul e citat de AI).
- **Țintă:** din top 15 în top 5 la „proteina whey 2kg”, „izolat proteic”, „creatina creapure” în 8–12 săptămâni; CTR pe Whey 2 kg peste 3 %.

### 6.4 Categoriile ca pagini-țintă: H1 pe cuvântul căutat și subcategorii pe intenție
- **De ce:** H1 „Pudre Proteice” nu e ce caută nimeni; GymBeam și Nutriland au câte o pagină pentru fiecare intenție (Creapure, monohidrată, izolat, cremă de orez). Colecția Pudră proteică are 1.623 de afișări și 0,7 % clicuri (23.10).
- **Ce facem (decizia ta pentru titluri, pentru că apar în meniu/breadcrumb):** redenumim titlurile colecțiilor: „Pudre Proteice” → „Proteine whey din zer”, „Pre-Workout” → „Pre-workout”, „Suplimente” → „Suplimente de sală”, „Accesorii” → „Accesorii de sală”, „Îmbrăcăminte” → „Haine de sală”, „Shoturi” → „Shoturi pre-workout”; creăm 4–6 colecții noi pe intenție, cu ghid propriu și 3–7 produse fiecare: „Creatină Creapure®”, „Creatină monohidrată”, „Izolat proteic din zer”, „Proteină whey 2 kg”, „Vitamina D3 + K2 / vitamine de iarnă”, „Suplimente pentru începători”; le legăm din ghidurile de categorie și din produse. Fără design nou: folosesc același șablon de colecție.
- **Țintă:** afișări pe colecțiile de proteină/creatină ×3; pozițiile din secțiunea 4 a auditului din 23.10 urcă în top 10.

### 6.5 Legături interne în ambele sensuri (produs ↔ ghid ↔ categorie)
- **De ce:** produsele nu trimit la niciun ghid, iar 149 de articole au 22 de pagini de paginare; Google și AI văd blogul și magazinul ca două insule.
- **Ce facem:** bloc „Citește și” cu 3 ghiduri pe fiecare produs (metafield `custom.related_articles` + afișare în temă – aprobarea ta, pentru că e o secțiune nouă, deși fără stil nou); pagini-hub pe cele 11 teme ale blogului (`/blogs/news/tagged/creatina` sunt noindex acum – fie le facem indexabile cu text, fie creăm 11 pagini „Ghid complet: creatină” care listează articolele și produsele); legături din primele 20 de articole după trafic spre colecțiile de proteină și creatină.
- **Țintă:** fiecare produs principal are ≥ 3 linkuri către ghiduri și ≥ 3 ghiduri care îl leagă; adâncimea maximă a unui articol ≤ 3 clicuri.

### 6.6 Blogul: de la 1 articol pe zi la articole care vând
- **De ce:** traficul din blog nu convertește; subiectele automate nu țintesc termenii mari pierduți („cea mai bună creatină”, „proteina whey 2 kg pret”, „creapure vs monohidrat”, „cream of rice vs ovăz”).
- **Ce facem:** calendarul automat primește 20 de subiecte comerciale/comparative legate direct de produse, cu caseta de produs sus; actualizăm (nu rescriem) cele 20 de articole cu cel mai mult trafic cu CTA spre colecție; verificăm calitatea celor 7 articole Sonnet pe ~30.10 (deja planificat); revizie editorială a afirmațiilor de sănătate pe articolele vechi (deschis din 13.10). Nu creștem volumul; 1/zi e deja mult pentru un catalog de 105 produse.
- **Țintă:** rata de conversie a sesiunilor cu intrare pe blog de la ~0 la 1 %; 5 articole comerciale în top 10.

### 6.7 Marca și entitatea firmei, consistente peste tot (pentru rezumatul AI și Knowledge Graph)
- **De ce:** AI ne numește „brand relativ nou” și ne leagă de haine; există confuzia cu „Prime Sports Nutrition” (Trustpilot SUA); Facebook spune „firmă nouă”.
- **Ce facem (tu, 1 oră):** descrierea paginilor Facebook/Instagram/TikTok/YouTube cu același text („Prime Supplements – brand românesc de suplimente sportive fondat în 2022 în Sibiu; Creapure®, Kyowa®; echipă de antrenori”), aceleași linkuri `sameAs` în Organization (adăugăm YouTube și TikTok oficiale după confirmarea ta); profil de firmă pe listadefirme/termene/Companii (date corecte, descriere nouă); pagina „Despre noi” primește cronologie, fotografii din depozit/echipă, certificatele (TUV/IFS/HALAL menționate în audit) – text, nu design nou.
- **Țintă:** rezumatul AI la „prime supplements pareri” fără „firmă nouă” și fără MNX în prim-plan; Knowledge Panel cu sigla și datele corecte.

### 6.8 Google Shopping și Bing Shopping (listări gratuite) – să apărem în caruselele de produse
- **De ce:** la „proteina whey” și „creatina creapure” caruselele arată GymBeam, Pro Nutrition, Allnutrition; noi avem 428 de produse aprobate și nu apărem. Caruselele favorizează recenzii, GTIN complet, titluri de feed cu termenul căutat și preț competitiv.
- **Ce facem:** titlurile din feedul Simprosys = titlul SEO (cu „proteină whey”, „creatină Creapure®”, gramaj, arome) – de verificat în Simprosys (fereastra Brave în față, deja în DE-FACUT ca E12); GTIN pe cele 26 de variante fără cod (pachete: fie cod propriu GS1, fie „identifier_exists = false”); verificarea stelelor Judge.me pe ~02.11; Microsoft Merchant Center – rezultatul contestațiilor pe ~28.10.
- **Țintă:** apariție în caruselul gratuit la cel puțin „creatina creapure” și „crema de orez” până în decembrie.

### 6.9 Igienă on-page (rapid, fără decizii, 1–2 ore)
- Titlu SEO + meta + alt + tip de produs pe cele 6 hanorace/pantaloni MNX și alt + tip pe cele 4 tricouri Prime; handle ASCII pentru cele 2 tricouri cu „barbați” (cu redirect automat); scurtarea celor 3 titluri > 60 de caractere; alt text pe imaginile celor 6 colecții; H1 pe pagina Contact (text); traducerea widgetului Judge.me în română (extensie: Judge.me → Settings → Translations); ștergerea/golirea colecției „Black Friday Special” din Admin (decizia ta); verificarea că toate produsele MNX epuizate de mult (25 fără stoc) merită să rămână active sau trec în Draft (stocul vine din Oblio – doar raportăm).

### 6.10 Performanță mobil și măsurare continuă
- **Performanță (prioritate medie, pentru că datele reale sunt bune):** pagina de produs are TBT 280 ms și 1,6 s execuție JS din aplicații; pașii fără design: amânarea scripturilor Judge.me (carusel/histogramă) până la scroll, Dondy și estimator după interacțiune, reducerea `preconnect` la 4, cache mai lung pe resursele temei. Țintă: Lighthouse mobil ≥ 85 pe produs, LCP de laborator < 3 s.
- **Măsurare lunară (GEO-18, propus din 23.10):** aceleași 18 căutări Google + Bing și 5 întrebări ChatGPT, salvate în repo; Search Console (clicuri, poziții pe cele 9 pagini reindexate), Bing WMT, CrUX; adăugat la raportul lunar din ziua 2, cu acordul tău.

---

## 7. Ce NU recomand acum
- Mai mult volum pe blog sau text generic pe categorii „ca să avem mai multe cuvinte”: GymBeam are 3.500 de cuvinte pentru că are 20 de produse și filtre, nu pentru că scrie mai mult. Noi câștigăm prin pagini de produs complete și dovezi.
- `llms.txt` personalizat sau FAQPage pe toate paginile: efect zero pe Google, mic pe AI; conținutul vizibil contează.
- Rescrierea temei pentru viteză: Core Web Vitals sunt trecute; schimbările de design cer aprobarea ta și nu sunt frâna principală.
- Eliminări de URL-uri vechi din Search Console (`www`, `/ro-hu`): fac 301 și dispar singure.

## 8. Metodă și limite
- Site live citit cu curl (17 pagini: homepage, 6 colecții, 4 produse, blog, articol, autor, despre, contact, 2 pagini B2B), robots.txt, toate sitemap-urile, redirecturi; JSON-LD validat cu Node; Shopify Admin (GraphQL, doar citire): 209 produse active, 25 de colecții, blog; PageSpeed Insights (pagespeed.web.dev, mobil) pe homepage și Prime Whey 2 kg; Google `site:` pentru B2B și `/ro-hu`; paginile concurenților cu curl (unele URL-uri ghicite au dat 404 și au fost înlocuite cu cele reale din meniurile lor).
- Pozițiile în Google nu au fost remăsurate azi (sunt din 23.10, cu limitele de acolo). API-ul PageSpeed a atins cota zilnică, de aceea rulările sunt din interfața web (2 pagini).
- Numărul de recenzii ale concurenților e cel afișat pe paginile lor; nu am verificat Trustpilot pentru fiecare.

## 9. Texte gata de lipit pentru extensia Chrome (acțiunile care nu se pot face de aici)

Judge.me, traducerea widgetului (pct. 6.9):
```
Deschide aplicația Judge.me din Shopify Admin → Settings → Translations (sau „Widget texts”). Setează limba widgetului pe română și tradu: „Customer Reviews” → „Recenziile clienților”; „Write a review” → „Scrie o recenzie”; „Based on {n} reviews” → „Pe baza a {n} recenzii”; „Let customers speak for us” → „Ce spun clienții noștri”; „Verified” → „Verificat”; „from {n} reviews” → „din {n} recenzii”. Salvează și raportează ce câmpuri existau și ce ai schimbat. Nu modifica alte setări (cupon, feed, e-mailuri).
```

Magazinul B2B, parolă pe storefront (pct. 6.1, după decizia proprietarului):
```
În Shopify Admin al magazinului B2B (kuqr0h-en.myshopify.com / b2b.primesupplements.ro) → Online Store → Preferences → „Restrict access to visitors with the password” → bifează, setează o parolă și un mesaj („Platforma B2B Prime Supplements. Parola o primești de la contact@primesupplements.ro.”). Salvează. Apoi raportează: parola e activă (pagina publică cere parolă), iar clienții B2B existenți se pot loga în continuare.
```
