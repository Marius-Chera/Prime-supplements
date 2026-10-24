# Plan SEO după Black Friday – top 20 puncte, pas cu pas (decizie proprietar 25.10.2026)

**Decizie:** nimic din lista de mai jos nu se face înainte de **1 decembrie 2026**. Până atunci site-ul rămâne așa cum e (rulează doar rutinele existente: blog zilnic, rapoarte, e-mailuri). Prime nu face Black Friday (regulă din CLAUDE.md), dar perioada e cea mai aglomerată de vânzări, deci nu schimbăm nimic structural în ea.

Sursa problemelor: `seo/AUDIT-SEO-COMPLET-2026-10-25.md` (toate constatările, §4; top 10, §6). Acest plan le desface în 20 de pași, **în ordinea în care îi luăm**, câte unul, fiecare terminat și verificat înainte de următorul. Ordinea ține cont de: (1) ce blochează alte lucruri, (2) efect pe vânzări, (3) risc – în decembrie facem doar texte și setări; schimbările de structură (colecții, temă) vin din ianuarie, după sărbători.

Reguli pe tot parcursul: fără schimbări de design fără aprobarea ta; stocul și statusul produselor nu se ating; doar mențiuni UE autorizate; backup în `backups/` înainte de orice rescriere; totul trecut în `JURNAL.md`.

## Calendarul pe scurt

| Perioada | Pașii | Caracter |
|---|---|---|
| 1–7 decembrie | 1–5 | pregătire și curățenie: măsurătoare de referință, igienă, B2B, Ungaria |
| 8–23 decembrie | 6–10 | paginile de produs care vând (doar texte) |
| 24 decembrie – 6 ianuarie | pauză | doar rutinele; nu publicăm nimic nou |
| 7–31 ianuarie | 11–14 | categorii, colecții noi, legături interne (cer o modificare mică de temă) |
| 1 decembrie – februarie, în paralel cu restul | 15–18 | autoritate: recenzii externe, comparatoare, mențiuni, marcă (aici pașii sunt ai tăi, eu pregătesc) |
| ianuarie–februarie | 19–20 | Shopping și blog |
| lunar, din 1 decembrie | măsurare | aceleași căutări și întrebări AI, salvate în repo |

Responsabili: **Claude** (din aplicația de pe calculator), **tu** (decizii, conturi, parole, Shopify Admin unde API-ul nu ajunge), **extensie** (text gata de lipit pentru panourile de aplicații care nu se pot citi de aici).

---

## Faza 0 · 1–7 decembrie · pregătire și curățenie

### Pasul 1 · Măsurătoarea de referință (ca să vedem ce schimbă fiecare pas)
- **Ce:** salvăm în repo starea de plecare: Search Console (clicuri, afișări, poziții pe cele 9 pagini principale și pe cele 18 căutări din auditul din 23.10, perioada 1.11–30.11), Bing Webmaster (căutări + citări Copilot), Chrome UX Report (LCP/INP/CLS), cele 5 întrebări în ChatGPT, lista cu `site:b2b.primesupplements.ro` și `site:primesupplements.ro`.
- **Cine:** Claude (citire). Tu: nimic.
- **Aprobare:** nu.
- **Verificare:** fișier `seo/masuratori/2026-12-01-referinta.md` cu toate cifrele; de aici încolo, același fișier lunar (ziua 1).
- **Efort:** 1 oră.

### Pasul 2 · Igienă on-page (tot ce se face fără nicio decizie)
- **Ce, în ordine:** (a) titlu SEO, meta descriere, alt text și tip de produs pe cele 6 produse MNX fără ele (`mnx-hoodie-original-black/red`, `mnx-ribbed-pants-hammer-3-0-light-black/white`, `mnx-ribbed-pants-hammer-2-0-black/white`); (b) alt text și tip de produs pe cele 4 tricouri Prime (turcoaz, galben pastel, burgundy, roz pastel); (c) handle ASCII pentru cele 2 tricouri cu „barbați” în URL (Shopify face redirectul automat); (d) scurtarea celor 3 titluri SEO peste 60 de caractere (NAC, tricou turcoaz, Pachet Rutina Zilnică) – trimise împreună cu meta descrierea, altfel se șterge una din ele; (e) alt text pe imaginea celor 6 colecții (alimente-sanatoase, accesorii-sala, echipament-sala, shot-pre-workout, haine-mnx, bauturi); (f) H1 pe pagina Contact (textul paginii, nu tema); (g) verificăm că niciun produs nu mai are câmpuri goale (titlu SEO, meta, alt, tip) – raport.
- **Cine:** Claude.
- **Aprobare:** nu (texte și atribute, nu design).
- **Verificare:** interogarea Shopify arată 0 produse fără titlu SEO/meta/alt/tip; sitemap-ul de imagini fără legende goale; `curl` pe Contact arată un `<h1>`.
- **Efort:** 2 ore.

### Pasul 3 · Recenziile în română și o pagină publică de recenzii
- **Ce:** (a) traducerea widgetului Judge.me („Customer Reviews” → „Recenziile clienților”, „Write a review” → „Scrie o recenzie”, „Based on 48 reviews” → „Pe baza a 48 de recenzii”, „Let customers speak for us” → „Ce spun clienții noștri”) – se face din panoul Judge.me, deci prin extensie (textul e în audit §9); (b) pagina publică „Toate recenziile” a Judge.me activată și legată din footer (`/pages/recenzii` sau pagina generată de aplicație) – e sursa pe care o pot cita Google și AI.
- **Cine:** tu cu extensia (a); Claude pregătește pagina și linkul (b), tu aprobi linkul din footer (e meniu, nu design).
- **Verificare:** pe o pagină de produs textele apar în română; pagina de recenzii răspunde 200, e în sitemap, are titlu SEO.
- **Efort:** 30 de minute.

### Pasul 4 · Magazinul B2B scos din Google
- **Ce:** decizia ta între: **(A) parolă pe storefront-ul B2B** (Online Store → Preferences → Restrict access; recomandat, 5 minute, clienții B2B primesc parola sau se loghează) sau **(B)** noindex pe toate paginile B2B + canonical spre site-ul principal (modificare de temă pe magazinul B2B). Apoi: ștergerea descrierilor vechi ale agenției de pe produsele B2B (sau înlocuirea cu cele conforme de pe site-ul principal), eliminarea temporară a subdomeniului din Search Console (aici e permisă, pentru că nu e redirect) și verificarea că linkurile de pe site-ul principal spre B2B duc doar la pagina de înregistrare.
- **Cine:** tu (A sau B în Admin-ul B2B, textul e în audit §9); Claude verifică și cere eliminarea din Search Console (cont Google al firmei, prin browser).
- **Aprobare:** da (decizia A/B).
- **Verificare:** `curl -I https://b2b.primesupplements.ro/products/creatina-creapure` → parolă (302 spre /password) sau `noindex`; peste 2–6 săptămâni `site:b2b.primesupplements.ro` → 0 rezultate.
- **Efort:** 15 minute tu, 1 oră Claude.

### Pasul 5 · Piața Ungaria și colecțiile moarte din Admin
- **Ce:** (a) Setări → Piețe → Ungaria → dezactivare; Setări → Livrare → zona Ungaria (tarife HUF) ștearsă; (b) colecția „Black Friday Special” (7 produse, nepublicată) ștearsă sau golită; colecția „eligibile-coduri-reducere” (210 produse) rămâne dacă e folosită de coduri – verificăm înainte; (c) raport cu cele 25 de produse MNX fără stoc de mult timp – tu decizi dacă rămân active (stocul și statusul nu le schimb eu).
- **Cine:** tu (a, b – sunt setări de piață și reduceri), Claude raportul (c).
- **Aprobare:** da.
- **Verificare:** `?country=HU` nu mai schimbă prețul; selectorul de țară fără Ungaria; colecția BF nu mai există.
- **Efort:** 20 de minute.

---

## Faza 1 · 8–23 decembrie · paginile de produs care vând (doar texte)

Model: pagina Creapure de la Pro Nutrition (685 de recenzii, întrebări și răspunsuri, 3 tabele, 50 de specificații, origine și certificare). Noi punem aceleași elemente în descriere (HTML în Shopify, fără temă nouă): **„Pe scurt” → tabel cu valorile pe porție și pe 100 g → „Ce primești pentru preț” → mod de utilizare → „Întrebări frecvente” (6–8) → „Citește și” (3 ghiduri)**. Doar date de pe etichetă și mențiuni UE. Backup în `backups/` înainte.

### Pasul 6 · Prime Whey 2 kg (produsul cu cele mai mari vânzări)
- **Ce:** tabel aromă/porție (proteine 24,4 g, kcal, zahăr, sare), tabel „pe 100 g” față de Pure Isolate și Whey Go; bloc „ce primești pentru preț” (66 de porții, ~5,91 lei/porție, concentrat UE, 7 arome, îndulcitori declarați, testare lot dacă există document); 8 întrebări frecvente luate din recenziile Judge.me, din WhatsApp și din „Oamenii întreabă și” (cu lapte sau apă, câtă lactoză, când o iau, e bună pentru slăbit? – răspuns conform, fără promisiuni); „Citește și” cu „Câtă proteină pe zi”, „Izolat vs concentrat”, „Când se ia proteina”. Meta descrierea rămâne cu prețul pe porție (verificăm prețul).
- **Cine:** Claude; tu citești textul înainte de publicare (10 minute).
- **Verificare:** pagina are tabelul și FAQ-ul vizibile; JSON-LD valid; Search Console: CTR și poziția pe „proteina whey 2kg” la 4 și 8 săptămâni.

### Pasul 7 · Creatină Creapure® 300 / 500 g
- **Ce:** același model, cu accent pe ce ne diferențiază: un singur ingredient, Creapure® (listați pe creapure.com), preț pe porție 300 g vs 500 g, comparație Creapure® vs monohidrată micronizată vs plicuri Ready To Go; FAQ: „de ce Creapure”, „faza de încărcare”, „cu ce o iau”, „în zilele fără antrenament”, „retenție de apă” (răspuns pe mențiunea UE); „Citește și” cu ghidurile din programul creatină (`seo/creatina/`).
- **Verificare:** poziția pe „creatina creapure” (azi 20) la 4 și 8 săptămâni; raportul săptămânal creatină o urmărește deja.

### Pasul 8 · Pure Isolate 2 kg, Prime Whey 1 kg și Whey Go – tabelul comparativ comun
- **Ce:** un singur tabel „Care proteină ți se potrivește” (concentrat 1 kg / 2 kg, izolat, plicuri: proteine pe porție, pe 100 g, lactoză, preț pe porție, pentru cine), pus pe toate cele 4 pagini și în ghidul colecției Pudră proteică; FAQ pe fiecare; „Citește și”.
- **Verificare:** „izolat proteic” (azi 15, cu un articol) – ținta e ca pagina de produs sau colecția să fie cea care apare, nu articolul.

### Pasul 9 · Cremă de orez (7 produse), EAA și L-glutamină Kyowa®
- **Ce:** pe cele 7 creme: aceleași 6 întrebări (cum se prepară, cu apă sau lapte, câte porții, aromă vs fără aromă, „cream of rice” în text, diferența față de ovăz) + tabel pe 100 g + „Citește și” (rețete, „cum se prepară”, „dimineața”); pe EAA și glutamină: FAQ (EAA vs BCAA, când, doză de pe etichetă) + tabel.
- **Verificare:** păstrăm locul 1 pe „crema de orez” și intrăm pe „cream of rice” (azi absenți); EAA e deja locul 5 pe Bing – urmărim Google.

### Pasul 10 · FAQ pe restul suplimentelor (~80 de produse), în loturi de 10
- **Ce:** întrebări reale pe fiecare produs (din recenzii, WhatsApp, „Oamenii întreabă și”), 4–6 pe produs, răspunsuri doar cu date de etichetă și mențiuni UE autorizate; ordinea loturilor: vitamine și minerale (D3+K2, magneziu, zinc, C), Prime Health, pre-workout, batoane, băuturi Frutilu, arzătoare (atenție la mențiuni), unturi, gainer. Un lot pe zi lucrătoare, cu backup.
- **Cine:** Claude; tu verifici primul lot, apoi doar prin sondaj.
- **Verificare:** interogarea Shopify arată 0 produse fără „Întrebări frecvente” (azi 92 din 105); nicio frază interzisă (verificare automată pe lista de termeni din ghidul de conținut).

---

## Faza 2 · 7–31 ianuarie · categorii, colecții noi, legături (cer o modificare mică de temă)

### Pasul 11 · Titlurile colecțiilor (H1) pe cuvântul căutat
- **Ce:** redenumim titlul colecției (devine H1 și breadcrumb; URL-ul și titlul SEO rămân): „Pudre Proteice” → „Proteine whey din zer”, „Pre-Workout” → „Pre-workout”, „Suplimente” → „Suplimente de sală”, „Accesorii” → „Accesorii de sală”, „Îmbrăcăminte” → „Haine de sală”, „Shoturi” → „Shoturi pre-workout”, „Intra-workout” → „Intra-workout: aminoacizi și carbohidrați”. Meniurile le lăsăm scurte (ele au text propriu).
- **Cine:** Claude, după lista aprobată de tine.
- **Aprobare:** da (se vede în breadcrumb și în titlul paginii).
- **Verificare:** H1 live = termenul; afișările pe colecții în Search Console la 4 săptămâni.

### Pasul 12 · Colecții noi pe intenție (cum au GymBeam și Nutriland)
- **Ce:** 6 colecții noi, fiecare cu ghid propriu de 250–400 de cuvinte, titlu SEO, meta, imagine cu alt și 3–7 produse: „Creatină Creapure®”, „Creatină monohidrată”, „Izolat proteic din zer”, „Proteină whey 2 kg”, „Vitamine pentru iarnă (D3 + K2, magneziu, zinc, C)”, „Suplimente pentru începători”. Le legăm din ghidurile categoriilor-părinte, din meniul „Suplimente” (sub-nivel) și din produse. Șablonul de colecție existent, deci fără design nou.
- **Cine:** Claude; tu aprobi lista și pozițiile din meniu.
- **Verificare:** 6 URL-uri noi în sitemap, indexate în 2–4 săptămâni (Search Console); poziții pe „creatina monohidrata”, „izolat proteic”, „creatina creapure” la 8 săptămâni.

### Pasul 13 · Blocul „Citește și” pe toate produsele (produs → ghid)
- **Ce:** metafield `custom.related_articles` pe fiecare produs (3 ghiduri alese după temă) și un bloc mic în șablonul de produs care îl afișează sub descriere, în același stil cu restul paginii (copie de temă, previzualizare, publicare după aprobare). Pentru cele 6 produse din faza 1, linkurile sunt deja în text; blocul le pune pe toate 105 fără să mai scriem manual.
- **Cine:** Claude (temă de probă + metafield-uri); tu previzualizezi și publici.
- **Aprobare:** da (secțiune nouă, deși fără stil nou).
- **Verificare:** fiecare produs are ≥ 3 linkuri spre blog (azi 0–1); Clarity: clicuri pe bloc.

### Pasul 14 · Pagini-hub pe cele 11 teme ale blogului și paginare mai mică
- **Ce:** câte o pagină „Ghid complet: creatină / proteine / aminoacizi / vitamine…” (11), fiecare cu introducere, lista articolelor temei, produsele temei și linkul la colecție; legate din indexul blogului și din ghidurile colecțiilor; paginile `/blogs/news/tagged/...` rămân noindex. Indexul blogului trece de la 7 la 12–16 articole pe pagină (setare de temă, fără schimbare vizuală majoră – aprobare).
- **Cine:** Claude; tu aprobi textele hub-urilor și setarea de paginare.
- **Verificare:** orice articol la ≤ 3 clicuri de homepage; 11 pagini noi indexate.

---

## Faza 3 · 1 decembrie – februarie, în paralel · autoritate și marcă (pașii tăi, eu pregătesc)

### Pasul 15 · Fluxul de cerere de recenzii Judge.me pornit
- **Ce:** fluxul pregătit pe 23.10 (`recenzii/`): cererea la 10 zile după expediere, un memento la 7 zile, cererea de poză, **fără cupon**, în designul comun al e-mailurilor; test la Marius și Adelina, apoi pornire. Evaluarea cuponului de 12 % (programată ~15.11) se închide odată cu asta.
- **Cine:** Claude pregătește și trimite testul; tu aprobi și pornești (sau îmi spui „pornește”).
- **Verificare:** ritmul de recenzii verificate (azi 7 în 11 zile) → ținta 30+ pe lună; raport lunar.

### Pasul 16 · Trustpilot și SupliScout (recenziile și prețurile în afara site-ului)
- **Ce:** (a) profil Trustpilot gratuit pe primesupplements.ro (îl creezi tu cu contact@primesupplements.ro), link din footer, invitații prin e-mail după livrare (din theMarketer, cu același design) – rezolvă și confuzia cu „Prime Sports Nutrition”; (b) e-mailul către SupliScout (pregătit în `recenzii/`) pentru includerea în comparator, măcar Creapure®, EAA, cremă de orez; (c) decizia ta pentru Compari/Skroutz (au cost).
- **Verificare:** 50+ recenzii Trustpilot până la Crăciun 2026 e nerealist dacă pornim la 1.12; ținta reală: 50 până la 1 martie; apariție în SupliScout în ianuarie; ChatGPT la „părere despre Prime Supplements” menționează recenzii independente.

### Pasul 17 · Mențiuni și linkuri fără buget
- **Ce, în ordine:** (a) pagina „Parteneri și sportivi” pe site (text + fotografii existente din ședințele foto), cu linkuri spre paginile publice ale celor care acceptă; cerere către cei 74 de afiliați să pună linkul în bio/pagina lor (prin e-mailul lunar, fără să fie împinși spre pachete); (b) sălile partenere (Evo Gym) și antrenorii – o pagină despre colaborare pe site-ul lor cu link; (c) presa locală Sibiu/Cisnădie: comunicat despre firma locală, lector FRCF, Creapure® (text pregătit de Claude, trimis de tine); (d) listările de producător/partener: creapure.com (există), cerere la Kyowa® (Recovery Glutamin), registrele de firme cu descriere corectă; (e) 3–5 ghiduri „cea mai bună creatină / proteină din România” de la site-urile de fitness – le scriem noi un e-mail scurt cu datele produsului, fără plată, fără promisiuni.
- **Cine:** Claude pregătește toate textele; tu trimiți (sunt de la firmă).
- **Verificare:** 5+ domenii noi care ne leagă, până în martie (Search Console → Linkuri; Bing WMT → Backlinks).

### Pasul 18 · Marca și entitatea firmei, identice peste tot
- **Ce:** (a) o descriere oficială de 2 fraze (fondată în 2022, Cisnădie/Sibiu, echipă de antrenori, Creapure®, Kyowa®, fără „firmă nouă”) pusă pe Facebook, Instagram, TikTok, YouTube, LinkedIn-ul firmei, Trustpilot, registre; (b) `sameAs` în Organization completat cu YouTube și TikTok oficiale (îmi confirmi care sunt); (c) „Despre noi” extins: cronologie 2022–2026, echipa, depozitul, certificatele (TUV/IFS/HALAL – dacă există documente), „cum alegem ingredientele” – texte și fotografii existente, fără design nou; (d) pagina de autor legată din fiecare articol (există) și din Despre noi.
- **Cine:** Claude textele și schema; tu descrierile pe rețele (conturi).
- **Verificare:** rezumatul AI Google la „prime supplements pareri” fără „firmă nouă” și fără MNX în prim-plan (măsurătoarea lunară); Knowledge Panel cu sigla și datele corecte.

---

## Faza 4 · ianuarie–februarie · Shopping și blog

### Pasul 19 · Caruselele de produse Google și Bing Shopping (listări gratuite)
- **Ce:** (a) în Simprosys: titlul din feed = titlul SEO (cu „proteină whey”, „creatină Creapure®”, gramaj) și descrierea = „Pe scurt” – se citește doar cu fereastra Brave în față (E12, text pentru extensie); (b) GTIN pe cele 26 de variante fără cod care nu sunt MNX: pachetele (fie coduri proprii GS1, fie „identifier_exists = false” în feed), shakere, șepci, tricouri Prime – tu spui dacă ai coduri; (c) verificarea stelelor Judge.me pe Google Shopping (programată ~02.11) și a contestațiilor Microsoft (~28.10); (d) dacă Microsoft aprobă, listările gratuite Bing active pe toate suplimentele.
- **Cine:** tu cu extensia (a), tu codurile (b), Claude restul.
- **Verificare:** apariție în caruselul gratuit la „creatina creapure” și „crema de orez” până în martie (căutare lunară).

### Pasul 20 · Blogul vinde, nu doar informează
- **Ce:** (a) calendarul automat primește 20 de subiecte comerciale legate de produse („cea mai bună creatină pentru începători: ce verifici pe etichetă”, „proteină whey 2 kg: cât te costă pe porție”, „Creapure® vs monohidrată obișnuită”, „cream of rice vs ovăz”, „ce suplimente iau ca începător”), cu caseta de produs sus și link la colecția nouă; (b) cele 20 de articole cu cel mai mult trafic (ceai diuretic, fat burner, spirulină, scorțișoară…) primesc o casetă clară spre colecția potrivită și o actualizare de dată reală; (c) revizia editorială a afirmațiilor de sănătate pe articolele vechi (NAC, spirulină, ashwagandha, arzătoare) – listă de corecturi, aprobată de tine; (d) volumul rămâne 1 articol pe zi sau scade la 4 pe săptămână dacă verificarea calității din 30.10 arată probleme.
- **Cine:** Claude; tu aprobi lista de subiecte și corecturile.
- **Verificare:** conversia sesiunilor cu intrare pe blog de la ~0 la 1 %; 5 articole comerciale în top 10 la 8 săptămâni.

---

## Continuu, din 1 decembrie
- **Măsurare lunară (ziua 1):** fișierul din pasul 1, completat cu aceleași cifre; rezultatul pe scurt intră în raportul lunar „Ce am lucrat” din ziua 2 (cu acordul tău).
- **Performanță (când ajungem la temă, în ianuarie, în același deploy cu pasul 13):** amânarea scripturilor Judge.me (carusel, histogramă) până la scroll, Dondy și estimator după interacțiune, maximum 4 `preconnect`; ținta Lighthouse mobil ≥ 85 pe produs. Nu e urgent: datele reale sunt bune.
- **Regula de siguranță:** un singur pas deschis la un moment dat; după fiecare pas, verificare live și o linie în `JURNAL.md`; la orice scădere de vânzări sau de poziții după un pas, ne întoarcem la backup.

## Ce aștept de la tine înainte de 1 decembrie (ca să nu pierdem zile atunci)
1. Pasul 4: A (parolă) sau B (noindex) pentru B2B.
2. Pasul 11: lista cu noile titluri de colecții – aprobare sau corecturi.
3. Pasul 12: cele 6 colecții noi – da/nu și unde intră în meniu.
4. Pasul 16: contul Trustpilot (îl creezi tu) și decizia pentru Compari/Skroutz.
5. Pasul 18: linkurile oficiale YouTube și TikTok; dacă există documente pentru TUV/IFS/HALAL.
6. Pasul 19: dacă există coduri de bare pentru pachete, shakere, șepci, tricouri Prime.

Memento: pe 1 decembrie 2026 există deja un memento pentru e-mailul video al afiliaților; planul de față pornește în aceeași zi cu pasul 1.
