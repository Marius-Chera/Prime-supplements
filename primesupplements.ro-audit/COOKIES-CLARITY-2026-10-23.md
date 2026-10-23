# Cookie-uri și Microsoft Clarity (23.10.2026)

Sarcinile: D3 (bannerul Pandectes), D4 (scripturile care pornesc fără acord), A5 (politica de cookie-uri) și instalarea Clarity, proiectul nou „Prime Supplements” `z268w804fi` (contul contact@primesupplements.ro). Clarity se instalează doar după banner și politică.

## 1. Ce am găsit (verificat live pe 23.10, într-un browser curat, fără acord)

**Bannerul Pandectes** (configurație publicată pe 14.06.2025): fereastră în mijlocul ecranului cu doar „Accept” și „Preferințe”; „Respingeți toate” există doar în al doilea ecran. Fără iconiță de redeschidere (`revokableTrigger: false`). Blocarea automată e oprită (`blocker.isActive: false`, listele de blocare sunt goale). Google Consent Mode e pornit. Cookie-urile declarate în Pandectes sunt doar ale Shopify, scanate pe domeniul myshopify.

**Ce pornește ÎNAINTE de acord** (consimțământ Shopify: analytics = false, marketing = false):
| Serviciu | Ce se încarcă | Cookie-uri / stocare |
|---|---|---|
| **Microsoft Clarity – proiectul VECHI `tepopueyt5`** | www.clarity.ms/tag, scripts.clarity.ms, **u.clarity.ms/collect (trimite înregistrarea)** | fără cookie-uri (Clarity rulează fără cookie-uri până la acord), dar sesiunea e înregistrată |
| theMarketer | t.themarketer.com/t/j/WB4DZZXL, c3api.themarketer.com, Firebase (web push) | mktr_cart_data (365 zile), __sm__c (400 zile); local: mktr_c, mktr_popups_display |
| UpPromote (afiliați) | cdn.uppromote.com, **d1639lhkj5l89m.cloudfront.net/js/storefront/uppromote.js** | _up_clid (365 zile, și în local) |
| Dondy (WhatsApp) | widget-view.dondy.net | – |
| Pandectes | – | _pandectes_gdpr (365 zile, necesar) |

Corectură la D4: `d1639lhkj5l89m.cloudfront.net` NU e Pop Convert, ci scriptul UpPromote (programul de afiliere). Pop Convert e dezinstalat din 18.10, deci `sdk.pop-convert.com` nu mai apare.

**Ce pornește DUPĂ „Accept”** (în plus): _clck (365 zile) și _clsk (1 zi) de la Clarity; _ga și _ga_DX0F0N485Q (400 zile, GA4); _gcl_au (90 zile) și _gcl_ls (local) de la Google Ads; _fbp (90 zile) și connect.facebook.net de la Meta. Google și Meta respectă deja acordul (vin prin pixelii Shopify / Simprosys).

**Microsoft Clarity e deja instalat**: aplicația Shopify „Microsoft Clarity” (`microsoft-clarity-prod`), instalată pe 22.09.2025 de Marian Tanasie; proiectul `tepopueyt5` („Prime supplements”, https://primesupplements.ro) a fost creat din aplicația Shopify, echipa e „Shopify Store Admin” (marius.chera@outlook.com), masking „Balanced”. Înregistrează: 1.273 de sesiuni în ultimele 3 zile. Pixelul aplicației are „Data access: Always on” (`privacyPurposes: []`), iar blocul din temă încarcă scriptul imediat și trimite doar semnalul de acord (consentv2). Proiectul nou `z268w804fi` există pe clarity.microsoft.com și așteaptă „Install on Shopify”.

**Pandectes cere permisiuni noi** la deschidere (ecranul „Pandectes GDPR needs access to”: comenzi – tot istoricul, metaobiecte, setări de confidențialitate din admin, Markets). Fără „Update” nu se intră în setările bannerului. Acordarea permisiunilor o aprobă proprietarul.

## 2. Ce trebuie hotărât de proprietar
1. **Permisiunile noi Pandectes** – „Update” pe ecranul de permisiuni (necesar pentru orice modificare a bannerului).
2. **Proiectul Clarity**: A) treci pe proiectul nou `z268w804fi` („Install on Shopify” leagă aplicația existentă de el; istoricul din `tepopueyt5` rămâne în proiectul vechi) sau B) păstrezi `tepopueyt5` (istoric din septembrie 2025) și adaugi contact@primesupplements.ro în echipa lui.
3. **UpPromote la Marketing**: dacă îl blochez până la acord, comenzile venite prin linkul unui afiliat de la vizitatorii care refuză (sau nu apasă nimic) nu se mai atribuie afiliatului. Variantele: A) îl blochez (conform strict; afiliații pot pierde o parte din comisioane), B) îl las necesar (risc legal mic, atribuirea rămâne întreagă).
4. **theMarketer blocat până la acord** (D4 varianta B): pop-up-ul de abonare și urmărirea coșului nu mai pornesc la cei care refuză.
5. **Bannerul** (D3 varianta A) și **textul politicii** (`backups/cookies-clarity-2026-10-23/politica-de-cookies.propunere.html`) – aprobare înainte de publicare.

## 3. Ce urmează după aprobări
1. Pandectes: „Refuz toate” pe primul ecran (ordinea Preferințe · Refuz toate · Accept), iconița de redeschidere jos-stânga, bară jos; blocare automată pornită cu: clarity.ms (Analiză); t.themarketer.com, c3api.themarketer.com (Marketing); UpPromote după decizia 3; scanare nouă pe primesupplements.ro; publicare după aprobare.
2. Politica: copia veche e în `backups/cookies-clarity-2026-10-23/politica-de-cookies.before.html`; public textul aprobat prin API.
3. Clarity: după decizia 2; verificare într-un browser curat: înainte de acord nicio cerere spre clarity.ms; după „Accept” la Analiză, _clck/_clsk și u.clarity.ms/collect.

## 4. Făcut pe 23.10 (după aprobarea proprietarului)
- Permisiunile noi Pandectes acordate („Update”, aprobat de proprietar). Oferta „noul designer de banner” refuzată („Keep current banner”), ca să nu se schimbe designul.
- Bannerul salvat și publicat (aprobat de proprietar; `tsPublished` 23.10.2026 11:46 UTC): primul ecran „Accept toate” · „Refuz toate” (la fel de vizibile) · „Preferințe”; poziția „Bar at the bottom”; butonul de redeschidere pornit (iconiță cookie, jos-stânga, „Setări cookie”); linkul „Află mai multe” → `/pages/politica-de-cookies` (înainte → politica de confidențialitate); textul nou: „Folosim cookie-uri strict necesare pentru funcționarea magazinului și, doar cu acordul dumneavoastră, cookie-uri de analiză și de marketing. Vă puteți schimba alegerea oricând, din iconița din stânga-jos.”; în fereastra de preferințe: „Aproape” → „Închide”, „Acceptă tot” → „Accept toate”, „Refuzați toate” → „Refuz toate”. Regula strictă, culorile și fontul au rămas.
- Verificat live (telefon 375 px, browser curat): bara apare jos cu cele 3 butoane; „Refuz toate” setează analytics/marketing/preferences = „no” în Shopify; iconița de redeschidere apare jos-stânga; `Pandectes.fn.openPreferences()` funcționează pe planul actual (deci linkul din politică poate redeschide preferințele).
- Observație: bula WhatsApp (Dondy) acoperă colțul din dreapta al butonului „Refuz toate” pe telefon.

## 5. Blocajul rămas: blocarea automată e doar în Premium
- „Auto blocker” din Pandectes cere planul **Premium (29 $/lună; acum Plus, 9 $/lună)**; butonul „Enable” e inactiv pe Plus.
- Verificat după „Refuz toate”: **Clarity (www.clarity.ms, scripts.clarity.ms, r.clarity.ms), theMarketer și UpPromote pornesc în continuare**. Google și Meta nu pornesc.
- Variante: A) Premium (+20 $/lună): blocare automată pentru clarity.ms (Analiză), theMarketer și, după decizie, UpPromote (Marketing). B) Gratuit: opresc embed-ul aplicației Clarity din temă și încarc Clarity printr-un fragment de cod care așteaptă acordul la Analiză (pe o copie a temei, publicată de proprietar); theMarketer rămâne la D4 varianta A (e-mailul către iam@themarketer.com) până răspund. C) Lași Clarity în modul fără cookie-uri (nu e „pornește doar după acord”).

## 6. Clarity doar după acord – varianta gratuită (decizia proprietarului, 23.10)
- Proprietarul: „Varianta gratuită: oprește embed-ul Clarity și încarcă Clarity din temă doar după acord, pe o copie a temei pe care o public eu.” Pandectes rămâne pe Plus.
- Copie a temei live: **„Prime – Clarity după acord (23.10)”, ID 194009563511** (din „Prime – PROBĂ ghiduri categorie (23.10)”, 194006647159). Schimbări (fișierele în `theme-fixes/clarity-dupa-acord-2026-10-23/`):
  - `snippets/clarity-consent.liquid` (nou): încarcă `https://www.clarity.ms/tag/z268w804fi` doar când Shopify Customer Privacy spune că Analiza e permisă (la încărcare, pentru cei care au acceptat deja, sau la evenimentul `visitorConsentCollected`); la retragere trimite `consentv2` refuzat și `clarity('consent', false)`.
  - `layout/theme.liquid`: două rânduri după `{{ content_for_header }}` (comentariu + `render 'clarity-consent'`). Verificat MD5 identic cu fișierul local.
  - `config/settings_data.json`: embed-ul aplicației Microsoft Clarity `disabled: true`. Nimic altceva schimbat.
- Testat în previzualizare (`?preview_theme_id=194009563511`), browser curat: (1) fără alegere și după „Refuz toate”: zero cereri spre clarity.ms, fără _clck/_clsk; (2) după „Accept toate”: se încarcă imediat `clarity.ms/tag/z268w804fi`, _clck și _clsk, cereri `collect`; (3) „Refuz toate” din iconița de redeschidere: _clck/_clsk șterse; (4) reîncărcare după acceptare: Clarity pornește la încărcare.
- De observat în test: pop-up-ul theMarketer („Abonează-te și primește 5%…”) apare peste bara de cookie-uri și o face inaccesibilă până e închis.
- Rămâne după publicarea temei de către proprietar: legarea aplicației Clarity de proiectul `z268w804fi` („Install on Shopify” din clarity.microsoft.com), ca pixelul aplicației și panoul din Shopify să folosească proiectul nou; verificare live.
- Atenție la politica de cookie-uri: theMarketer și UpPromote încă pornesc înainte de acord, deci textul „toate celelalte pornesc doar după acord” nu se poate publica până nu se rezolvă D4 (e-mailul către theMarketer nu apare trimis în JURNAL) și decizia UpPromote.

## 7. După publicarea temei (23.10, ~15:05)
- Tema „Prime – Clarity după acord (23.10)” e MAIN (publicată de proprietar). Verificat live: cu acord, `window.clarity` există și rulează proiectul `z268w804fi`; după „Refuz toate” și reîncărcare, `window.clarity` nu există și nu se pun _clck/_clsk. Proiectul nou primește deja date de la vizitatorii care acceptă („6 users are online” în clarity.microsoft.com).
- „Install on Shopify” din proiectul nou deschide doar pagina aplicației din App Store; aplicația e deja instalată și nu are nicio opțiune de schimbare a proiectului (Settings → Overview/Setup arată doar `tepopueyt5`). Nu am reinstalat nimic.
- **Problemă găsită:** pixelul aplicației Microsoft Clarity (Customer events, „Always on”, fără scop de confidențialitate declarat) este un înregistrator complet de sesiuni pentru proiectul vechi `tepopueyt5`: preia prin evenimentele Shopify „advanced DOM” mișcările, clicurile, derularea, formularele și evenimentele de comandă (inclusiv checkout_started / checkout_completed) și le trimite către Clarity. Codul trimite doar semnalul de acord (consentv2), deci rulează fără cookie-uri, dar înregistrează și fără acord. În Customer events, meniul pixelului are doar Open app / View details / Test / View permissions / View customer privacy – nu se poate deconecta.
- Singura cale ca Clarity să pornească doar după acord: **dezinstalarea aplicației Microsoft Clarity** din Shopify (decizia proprietarului). Clarity rămâne pe site prin fragmentul din temă (proiectul `z268w804fi`, contul contact@primesupplements.ro); se pierde accesul la proiectul vechi `tepopueyt5`, creat de aplicație.

## 8. Cine a instalat Clarity și accesul fostei agenții (23.10)
- Aplicația Microsoft Clarity a fost instalată pe 22.09.2025 (14:06) de Marian Tanasie, care a acceptat și permisiunile noi pe 23.06.2026 (10:21). Proprietarul: Marian Tanasie era de la agenția de marketing și nu mai lucrează cu Prime.
- Setări → Utilizatori (doar citire, 23.10): Marian Tanasie NU mai apare. Utilizatori activi: Marius Chera (proprietar), CHERA ADELINA (Administrator) și **KEMO MANAGEMENT SRL – colaborator activ**, cu rol generat automat „Orders, Products, Finance, and more”. De confirmat de proprietar dacă acest colaborator mai trebuie să aibă acces.
- Dezinstalarea aplicației Clarity: proprietarul a întrebat „nu putem dezinstala și să ne conectăm la Clarity al nostru?”; pasul de dezinstalare a fost oprit de sistemul de permisiuni până la o confirmare explicită. Clarity-ul firmei (`z268w804fi`) e deja conectat prin temă.

## 9. Aplicația Microsoft Clarity dezinstalată (23.10, cu confirmarea explicită a proprietarului)
- Proprietarul: „Da, confirm: dezinstalează aplicația Microsoft Clarity din Shopify. Clarity-ul nostru rămâne prin temă, cu proiectul z268w804fi.” Dezinstalată din Setări → Aplicații (motiv: „Not satisfied with app features”); mesaj Shopify: „You've successfully uninstalled Microsoft Clarity”. Shopify trimite dezvoltatorului cererea de ștergere a datelor personale în 48 de ore.
- Verificat live după dezinstalare: `tepopueyt5` nu mai apare în pagină (nici embed, nici pixel); cu „Refuz toate”: zero cereri spre clarity.ms, fără _clck/_clsk; după „Accept toate”: `clarity.ms/tag/z268w804fi`, _clck, _clsk, `collect`. **Clarity pornește doar după acordul la Analiză.**
- Proiectul firmei: clarity.microsoft.com → „Prime Supplements” (`z268w804fi`), contul contact@primesupplements.ro; masking „Balanced” (implicit).
- Dacă se dorește din nou aplicația din Shopify: doar după ce pixelul ei declară scopul „ANALYTICS” (în pagină, `privacyPurposes` al pixelului Clarity să nu fie gol) – altfel înregistrează fără acord.
