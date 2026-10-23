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
