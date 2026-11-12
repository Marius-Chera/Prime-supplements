# Product Marketing Context – Prime Supplements

**Document version:** v1
**Last updated:** 2026-11-13
**Valabil doar pentru:** primesupplements.ro. NU se folosește pentru Chera Coaching / Chera Hub (afacere separată).

Fiecare cifră are data și fișierul din care vine (căi relative la `primesupplements.ro-audit/`). Cifrele sunt interne: nu se pun în texte publice fără verificare la zi. Regulile din `primesupplements.ro-audit/CLAUDE.md` au întâietate față de orice recomandare a unui skill.

## Product Overview
**One-liner:** Suplimente sportive și alimente funcționale românești, formulate din culturismul de performanță („Hardcore Sports Nutrition”).
**What it does:** Magazin online propriu (Shopify) + magazin fizic în Cisnădie, jud. Sibiu; vinde marca Prime și, în magazinul fizic, și alte branduri.
**Product category:** proteine și gainer, cremă de orez și ovăz, creatină, aminoacizi, pre/intra-workout, vitamine și minerale, batoane, unturi, shoturi, băuturi Frutilu, accesorii, haine (MNX și Prime).
**Product type:** e-commerce B2C cu produse fizice; canal secundar B2B (săli, distribuitori).
**Business model:** vânzare directă, comandă unică (fără abonamente); fondat în 2022; fabricat în UE (`distribuitori/build-portfolio-distributors.mjs`).
**Linii:** Prime (sport), Prime Health (gamă pentru farmacii, în pregătire), Frutilu, haine.
**Cele mai vândute** (bucăți, 12 luni până la 10.11.2026): Prime Whey 2 kg, Prime Whey 1 kg, batonul cu căpșuni, Creapure®, Creamy Rice tort de ciocolată și plăcintă cu cocos; 6 din 7 arome de cremă de orez sunt în top 20 (`distribuitori/…`).
**Prețuri de reper:** Prime Whey 2 kg 390 lei; Creapure® 300 g 115 lei (23.10, `seo/AUDIT-CAUTARI-2026-10-23.md`); cremă de orez 63–68 lei/kg (13.11). De verificat pe site înainte de folosire.

## Target Audience
**Cine cumpără:** practicanți de sală și culturism din România. Profilul detaliat (vârstă, gen, motivații) NU e documentat; în theMarketer genul e necunoscut la toate contactele.
**Ce se știe din cifre** (30 de zile până la 16.10.2026, `SETARI-VANZARI-2026-10-16.md`): 566 comenzi; coș mediu 249,64 lei; conversie 4,21 %; 88 % din trafic pe mobil; 66,8 % plată ramburs; clienții care revin fac 58 % din comenzi (coș 296 lei față de 211 lei la cei noi); primul județ e Sibiu (15 %).
**Liste:** 2.388 destinatari e-mail și 435 SMS (12.11, `LATE-BLACK-FRIDAY-2026-11-24.md`).
**Jobs to be done:**
- Să-și atingă necesarul de proteine și carbohidrați comod (whey, cremă de orez la rece, fără fierbere).
- Să ia creatină de încredere (Creapure®).
- Să cumpere ce folosește sportivul sau antrenorul pe care îl urmărește (cod de afiliat).

## Personas
Nu se aplică (B2C). Pentru B2B: proprietari de săli (prin agent), distribuitori, lanțuri de retail/farmacii – vezi `agenti/` și `distribuitori/`.

## Problems & Pain Points
Nu sunt documentate din vocea clientului. De completat din recenziile Judge.me (skillul `customer-research`) înainte de a scrie texte bazate pe „durerile” clientului.

## Competitive Landscape
**Direct:** GymBeam, Nutriland, Pro Nutrition, Genius, Myprotein. Sunt mai ieftini la whey: Prime ~19,5 lei/100 g, GymBeam ~10 lei, Nutriland ~8 lei (25.10, `seo/AUDIT-SEO-COMPLET-2026-10-25.md`). La cremă de orez diferența e mică: Prime 63 lei/kg, GymBeam 61,80 lei/kg (13.11).
**Secondary:** Decathlon, Farmacia Tei, Dr. Max.
**Dovezi sociale:** GymBeam are zeci de mii de recenzii; Prime are 454 (vezi Proof Points). Prime nu e pe Trustpilot și nici în comparatoare (SupliScout, Compari, Skroutz).
**Concluzie:** Prime nu câștigă la preț pe 100 g; trebuie să câștige prin ingrediente de marcă, gust/arome, încredere și comunitatea de sportivi.

## Differentiation
**Key differentiators:**
- Ingrediente de marcă declarate pe etichetă: Creapure® (Prime e listat pe creapure.com ca partener pentru România), Kyowa®, KSM-66®, Cluster Dextrin®, Bergamonte®, Peptan®, DigeZyme®.
- Formule făcute de un antrenor de culturism cu sportivi profesioniști; etichete transparente.
- Cremă de orez: locul 1 pe Google la „crema de orez” (23.10); 7 arome; aliment, nu supliment; se prepară la rece.
- Fabricat în UE; brand românesc, cu magazin fizic și telefon/WhatsApp (0775 286 584).
**De NU afirmat fără documente:** teste de laborator și certificări (TÜV, IFS, HALAL, Cologne List apar în pagina „Despre noi”, dar nu există documente în repo – de confirmat cu proprietarul).

## Objections
| Obiecție | Răspuns |
|---|---|
| „E mai scump decât GymBeam” | Ingrediente de marcă, formulă, gust; nu concurăm la prețul pe 100 g |
| „Am 300 lei în coș, dar codul mă scoate sub transport gratuit” | Pragul de 300 lei se aplică după reducere (documentat în `SETARI-VANZARI`, D15) |
| Altele | Nedocumentate – de scos din recenzii și din mesajele de pe WhatsApp |

**Anti-persona:** vânătorul de cel mai mic preț pe kilogram.

## Switching Dynamics
Nedocumentat. Ipoteză (a asistentului, neverificată): clientul vine de la un brand mai ieftin, atras de recomandarea unui sportiv și de ingredientele de marcă; îl rețin obiceiul și prețul.

## Customer Language
Nedocumentat. Termeni de căutare confirmați: „crema de orez”, „creatina creapure”, „whey 2 kg”. De completat cu citate din recenzii.

## Brand Voice
**Tone:** direct, sobru, de companie cu echipă – nu brandul unei persoane. Semnătura: „Echipa Prime Supplements”.
**Limbă:** română, cu diacritice (SMS: fără diacritice, sub 160 de caractere).
**Never use (și de ce):**
- Mențiuni de sănătate neautorizate în UE, promisiuni de slăbire sau vindecare (lege + regula proprietarului).
- Numele furnizorului sau al fabricii (excepție: mărcile de ingrediente).
- În e-mailuri: preț tăiat, cuvântul „ofertă”, urgență falsă, superlative, cifre neverificabile (`email-marketing/design/DESIGN-EMAIL-PRIME.md`).
- Numărul total de afiliați sau de comenzi.
- La alimente (cremă de orez): subsolul „Aliment, nu supliment alimentar…”, nu cel de supliment.
**Design e-mail:** antet negru cu logo alb și linie roșie #ec1e24, text Poppins, un singur buton roșu cu majuscule, subsol negru. Designul site-ului nu se schimbă fără aprobare.
**Imagini:** ce merge pe rețele sunt clipurile cu sportivi reali, nu conținutul generat (13.11, `JURNAL.md`).

## Proof Points
**Recenzii:** Judge.me – 454 recenzii, nota 4,88, 255 verificate (23.10.2026).
**Autoritate:** fondatorul, antrenor de culturism cu sportivi care au obținut cardul PRO; Creapure® partener listat.
**Sportivi și săli partenere:** există, dar se numesc public doar cu acordul lor.
**Lipsesc:** Trustpilot, presă, documente de certificare.

## Goals
**Business goal:** creștere a vânzărilor lună de lună începând cu decembrie 2026 (cerința proprietarului, 13.11). Ținta în lei nu e fixată.
**Conversion action:** comandă pe site.
**Ținte documentate:** e-mail – 50 de comenzi pe lună (măsurat ~5); recenzii – peste 30 pe lună și 50 pe Trustpilot până la 1.03.2027.
**Decembrie 2026:** 4 newslettere (29.11–20.12, pachetele de iarnă), planul SEO în 20 de pași de la 1.12 (`seo/PLAN-DUPA-BLACK-FRIDAY-2026.md`), fluxul de cerere de recenzie, Christmas sale cu afiliații.
**Reper de pornire:** 1.622 comenzi și 408.840 lei vânzări nete în 90 de zile până la 23.10.2026.

## Canale și unelte
- **E-mail și SMS:** theMarketer. Fluxuri active: Welcome series 2, Cart abandonment 2026, Reaprovizionare 2026; newsletter duminica; rutina „stoc revenit”. Pop-up cu WELCOME5 (2,2 % înscrieri).
- **Afiliați:** UpPromote. Canalul cel mai mare: 62 % din comenzi și 74 % din venit (08.09–18.10); coș 362 lei față de 215 lei fără cod. Codurile dau clientului 10 %. Afiliații nu sunt împinși spre pachete.
- **Social:** Facebook și Instagram prin Zernio, postare zilnică la 18:00.
- **Blog:** 1 articol pe zi, automat.
- **Google:** Shopping prin feed Simprosys (28 de zile până la 26.10: cost 4,73 mii lei, conversii 37,88 mii lei).
- **Recenzii:** Judge.me (cupon 12 % la recenzie).
- **Livrare:** Cargus 24–72 h, 20 lei, gratuit peste 300 lei după reducere; retur 14 zile. Plată: ramburs, card (Netopia), transfer.

## Reduceri (reguli)
- Fără coduri noi fără cererea proprietarului; maximum 20 %. Coduri existente: WELCOME5, codurile de afiliat (10 %), cuponul Judge.me (12 %), `LATEBF20` (20 %, 25–27.11.2026, o folosire per client, fără pachete).
- 69 % din comenzi au deja un cod, iar reducerile fac 21,5 % din vânzările brute (16.10) – orice ofertă nouă se judecă față de acest nivel.
- Skillul `offers` propune bonusuri, garanții și pachete: se propun proprietarului, nu se aplică.

## Paid Ads
**Google Ads Shopping:** activ. **Meta Ads:** 18,8 % din sesiuni, 26 de comenzi în 90 de zile; o campanie a adus 10.289 sesiuni și 0 comenzi în 13 luni. **ChatGPT Ads:** test 2–15.11.2026, 420 lei; suplimentele sunt respinse în afara SUA, eligibil doar anunțul cu crema de orez.
**Bugete, ROAS țintă:** nedocumentate.
**Agent may:** citi, compara, semnala, pregăti ciorne, recomanda.
**Agent may not (fără aprobare):** schimba bugete, porni/opri campanii, publica reclame.

## Learnings
- **15.10.2026 – e-mail:** theMarketer raportează de ~15 ori mai multe comenzi decât cele reale. Măsurabil vinde doar anunțul de stoc nou la crema de orez (9 din 14 comenzi din click). Sursa: `email-marketing/themarketer/audit_campaigns.md`.
- **16.10.2026 – automatizări:** 7 fluxuri oprite (72 % din trimiteri, 3 comenzi în 12 luni); Cross sell: 840 de e-mailuri, 0 comenzi. Mai puține fluxuri, mai bune.
- **16.10.2026 – WELCOME5:** folosit de 10 ori din 346 de înscrieri; 5 % nu convinge.
- **16.10.2026 – stoc:** rupturile de stoc la crema de orez au costat ~70 de comenzi; stocul produselor de top contează mai mult decât orice campanie.
- **30.10.2026 – SMS:** 444 trimise, 110 clickuri, 6 comenzi, 3.498 lei.
- **23.10.2026 – căutări AI:** ChatGPT recomandă Prime o dată din 4 întrebări de cumpărare.
- **13.11.2026 – conținut:** reel-urile cu sportivi reali merg; clipurile generate cu AI nu se potrivesc.
- **În curs:** raportul săptămânal de creatină (prima săptămână peste maxim: 2–8.11, neconfirmată); cuponul de 12 % pentru recenzii (evaluare ~15.11).

## Ce nu are voie asistentul
Nu modifică stocul sau statusul produselor; nu umblă în Fluxsales și Primesupplements App; nu intră în checkout; în Oblio doar citește; nu schimbă designul; nu creează coduri; nu salvează date personale în repo. Orice e-mail se testează întâi la cele două adrese din `primesupplements.ro-audit/CLAUDE.md`. Modificările structurale pe site: doar de la 1.12.2026.

## De completat
Profilul clientului și citate din recenzii; comisionul afiliaților; bugetele și ROAS-ul la reclame; rezultatele complete ale Black Friday 30.10–15.11 și ale testului ChatGPT Ads; ținta de venit pentru 2027; documentele de certificare.
