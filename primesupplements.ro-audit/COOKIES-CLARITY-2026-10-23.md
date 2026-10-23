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

## 10. Bara de cookie-uri fără suprapuneri (23.10, cerut de proprietar: „fixează asta”)
- Problema (telefon 375 px): pop-up-ul theMarketer (`#theMarketer-popup-backdrop`, tot ecranul) și bula WhatsApp Dondy (`#chat-bubble`, dreapta-jos, peste „Refuz toate”) aveau același z-index maxim ca bara Pandectes și stăteau peste ea.
- Remedierea: copie a temei live **„Prime – banner fără suprapuneri (23.10)”, ID 194010055031** (din „Prime – Clarity după acord (23.10)”). `snippets/consent-overlays.liquid` (nou): cât timp vizitatorul nu a ales la cookie-uri (Shopify Customer Privacy: analytics = ""), elementul html primește clasa `consent-pending`, iar pop-up-ul theMarketer și bula WhatsApp stau ascunse; la `visitorConsentCollected` clasa dispare și ele apar ca înainte. `layout/theme.liquid`: un rând `render 'consent-overlays'` după `render 'clarity-consent'`. MD5 verificat (theme.liquid e3a37b0d…, snippet 83e0f022…). Fișierele: `theme-fixes/banner-fara-suprapuneri-2026-10-23/`.
- Testat în previzualizare pe telefon: cu starea „în așteptare”, bula WhatsApp ascunsă și „Refuz toate” liber; după alegere, bula și pop-up-ul (display flex) revin. Vizitatorii care au ales deja nu sunt afectați. Nu am putut reproduce în browser un vizitator complet nou (cookie-ul de acord Shopify e HttpOnly), așa că starea „nu a ales” a fost simulată; detectarea ei folosește același API ca fragmentul Clarity, verificat la începutul zilei (analytics = "").
- Așteaptă publicarea temei de către proprietar.
- **Publicată de proprietar pe 23.10 (~15:39) și verificată live** (MAIN = 194010055031; MD5 identice: theme.liquid e3a37b0d…, clarity-consent 8f2d1810…, consent-overlays 83e0f022…). Pe telefon: cu bara deschisă și starea „nu a ales”, bula WhatsApp e ascunsă și „Refuz toate”/„Preferințe” sunt libere; după „Refuz toate”: bula WhatsApp și iconița de cookie (stânga-jos) apar, Clarity nu se încarcă (zero cereri). Vizitatorii care au ales deja văd site-ul ca înainte.

## 11. Text pentru extensie: theMarketer doar după acord (23.10, cerut de proprietar)
Verificat live pe 23.10, înainte de acord: embed-ul `mktr_core` încarcă `t.themarketer.com/t/j/WB4DZZXL`, apelează `c3api.themarketer.com`, setează cookie-urile `mktr_cart_data` (365 de zile) și `__sm__c` (400 de zile), scrie `mktr_c` și `mktr_popups_display` în stocarea locală și încarcă Firebase (web push) de pe www.gstatic.com. Pixelul theMarketer din Customer events („Optimized”) respectă deja acordul; problema e doar embed-ul din temă.

```text
Lucrezi în Shopify Admin (magazinul primesupplements1) și în app.themarketer.com, contul Prime Supplements. Sarcina: theMarketer să pornească pe primesupplements.ro doar după ce vizitatorul acceptă cookie-urile de marketing. Nu schimba fluxurile de e-mail, campaniile, formularele sau designul pop-up-urilor.

1. Shopify Admin → Aplicații → theMarketer. Deschide aplicația și caută în toate setările ei o opțiune despre GDPR, consimțământ, cookie-uri sau „Customer Privacy” (de ex. „Cookie consent”, „Wait for consent”, „Respect customer privacy”, „GDPR mode”). Notează toate opțiunile găsite și starea lor, fără să schimbi nimic încă.
2. app.themarketer.com → Settings (și secțiunile Tracking, Integrations / Shopify, Website, GDPR, dacă există). Caută aceeași opțiune. Notează ce găsești.
3. Dacă găsești o opțiune care face ca scriptul de tracking și cookie-urile theMarketer să pornească doar după acordul la cookie-uri (marketing): pornește-o și salvează. Nu schimba nimic altceva.
4. Tot în app.themarketer.com → Settings: caută „Web push notifications” / „Push notifications” / „Browser notifications”. Dacă e pornit, notează starea și oprește-l (nu avem abonați la web push).
5. Dacă nu există nicio opțiune de consimțământ: deschide suportul din app.themarketer.com (chat sau „Support” / ticket). Dacă nu există, scrie un e-mail către iam@themarketer.com de pe contact@primesupplements.ro. Trimite exact acest mesaj, fără alte date:
   „Bună ziua, pe magazinul primesupplements.ro (Shopify, tracking key WB4DZZXL), embed-ul theMarketer din temă (mktr_core) pornește înainte de acordul vizitatorului la cookie-uri: încarcă t.themarketer.com/t/j/WB4DZZXL, apelează c3api.themarketer.com, setează cookie-urile mktr_cart_data și __sm__c și scrie mktr_c în stocarea locală, chiar și pentru vizitatorii care apasă «Refuz toate» în bannerul nostru (Pandectes, conectat la Shopify Customer Privacy API). Legea 506/2004 și GDPR ne cer să pornim aceste tehnologii doar după acord. Vă rog să ne spuneți dacă există o setare prin care embed-ul să aștepte acordul de marketing (window.Shopify.customerPrivacy.marketingAllowed() / evenimentul visitorConsentCollected), la fel ca pixelul vostru web din Shopify, iar formularele de abonare să rămână afișate. Dacă nu există, vă rog să o activați pentru contul nostru sau să ne spuneți când va fi disponibilă. Mulțumim, Echipa Prime Supplements”
6. Raportează: opțiunile găsite la pașii 1–2 (cu starea înainte și după), ce ai schimbat la pașii 3–4 și, dacă ai trimis mesajul de la pasul 5, pe ce canal, la ce oră și orice număr de ticket sau răspuns primit.

Nu deschide și nu modifica Fluxsales sau Primesupplements App. Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```
După raport: verific live (vizitator care refuză → fără cereri spre t.themarketer.com / c3api.themarketer.com și fără mktr_cart_data). Dacă theMarketer nu oferă setarea în ~2 săptămâni, varianta din temă: embed-ul `mktr_core` oprit și scriptul theMarketer încărcat doar după acordul de marketing (ca la Clarity), cu dezavantajul că pop-up-ul de abonare nu mai apare celor care refuză (D4 varianta B).

## 12. theMarketer: fără setare de consimțământ – e-mail către suport (23.10)
- Proprietarul: extensia nu a găsit în theMarketer nicio opțiune de consimțământ. Trimite el e-mailul către suport (iam@themarketer.com) cu textul de mai jos. Politica de cookie-uri (aprobată) se publică după ce theMarketer pornește doar după acord; dacă nu rezolvă în ~2 săptămâni (până pe ~06.11.2026), varianta din temă (embed `mktr_core` oprit, script încărcat după acordul de marketing).
- Subiect: „primesupplements.ro (WB4DZZXL) – scriptul theMarketer pornește înainte de acordul la cookie-uri”
- Textul trimis e cel din răspunsul din sesiune (aceleași fapte ca la §11, pasul 5, plus întrebările concrete și termenul).

## 13. Butonul „Chat” (asistentul AI Shopify Inbox) peste WhatsApp (23.10, semnalat de proprietar cu o captură de pe telefon)
- Cauza: butonul Chat (Shopify Inbox, setat „bottom_right / highest”) și bula WhatsApp Dondy (dreapta, `bottom: 90px`) stăteau ambele în dreapta-jos; pe telefonul proprietarului se suprapuneau.
- Remedierea: copie a temei live **„Prime – Chat în stânga (23.10)”, ID 194013069687** (din „Prime – banner fără suprapuneri (23.10)”); în `config/settings_data.json`, la blocul Shopify Inbox, doar `button_horizontal_position`: `bottom_right` → `bottom_left`. Restul setărilor identice (Shopify scosese deja din fișier blocurile aplicațiilor dezinstalate Fontify și Pop Convert). Diff: `theme-fixes/chat-in-stanga-2026-10-23/changes.diff`.
- Testat în previzualizare pe telefon (375 px), pe colecția Creatină și pe pagina Creatină Creapure®: Chat în stânga (x 39, y 584), WhatsApp în dreapta (x 310, y 667), iconița de cookie jos-stânga (y 749), fără suprapuneri. Așteaptă publicarea de către proprietar.
- **Publicată de proprietar pe 23.10 (~19:36) și verificată live** (MAIN = 194013069687; theme.liquid, clarity-consent și consent-overlays cu aceleași MD5). Pe telefon, pe colecția Creatină: Chat în stânga (x 39, y 584), WhatsApp în dreapta (x 310, y 667), iconița de cookie jos-stânga (y 749); Clarity respectă în continuare refuzul.

## 14. Răspunsul theMarketer (primit 23.10, 16:24) și starea pe 24.10
- Suportul theMarketer: au transmis problema cookie-urilor dezvoltatorului care se ocupă acum de pluginul Shopify (fără termen). Notificările push sunt dezactivate din setările contului theMarketer; se pot dezactiva și din setările modulului theMarketer din Shopify.
- Verificat live pe 24.10 (vizitator care a refuzat): Firebase / web push nu se mai încarcă (nicio cerere spre gstatic.com). theMarketer încă pornește înainte de acord: `t.themarketer.com/t/j/WB4DZZXL`, `t.themarketer.com/t/r`, `c3api.themarketer.com/p/u` și `/p/s`.
- Ce urmează: termenul rămâne 06.11.2026. Dacă până atunci pluginul nu așteaptă acordul, varianta din temă (embed `mktr_core` oprit, scriptul încărcat după acordul de marketing; pop-up-ul de abonare nu mai apare celor care refuză). Politica de cookie-uri aprobată se publică după aceea.

## 15. Scanarea Pandectes (E5) – 24.10
- Textul pentru extensie a fost lipit de proprietar într-o conversație Claude fără acces la browser (nu în panoul extensiei din Brave), deci scanarea nu s-a făcut. Varianta îmbunătățită a textului (oprire dacă alegerea domeniului cere salvare, fără schimbarea frecvenței scanării, comparație cu scanarea veche) e cea de folosit.
- Încercare din sesiunea de pe PC: setările Pandectes s-au deschis, dar după clicul pe „Cookie scanner” capturile din Brave s-au blocat din nou (fereastra aplicației). Nu s-a pornit nicio scanare și nu s-a modificat nimic. Rămâne pentru extensie.
