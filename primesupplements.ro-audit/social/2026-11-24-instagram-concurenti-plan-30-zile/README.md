# Instagram: ce merge la concurenți + plan pe 30 de zile (24.11.2026)

Cerut de Marius pe 24.11, pornind de la reel-ul @aisocialmastery (https://www.instagram.com/reel/DdyajgmqU0_/): „5 skill-uri în Claude care îți construiesc calendarul pe 30 de zile” (1. separă reach-ul de conversie, 2. extrage structura, 3. alege formatul, 4. unde se pierde publicul, 5. calendarul). Răspunsul lui Marius: „Da, pornește”.

Am lucrat cu skill-ul `/ig-viral` din plugin-ul Instagram Growth Studio, în browserul din aplicație (logat ca @primesupplements_ro). Am făcut doar citire: niciun like, follow sau mesaj. Interogarea directă a API-ului intern Instagram a fost refuzată de sistemul de permisiuni, așa că am citit doar paginile publice, ca un om.

Fișiere: `captured.tsv` (datele brute), `swipe.md` + `viral.json` (clasamentul făcut de `swipe.py`; o copie e și în `C:\Users\mariu\IGStudio`, ca `/ig-plan` și `/ig-reel` să lucreze pe ea). Planul anterior pe 30 de zile (`social/cal30.json`, 19.10–17.11) avea mai ales poze; acesta îl continuă, cu reel-uri.

## 1. Ce am citit

Ultimele ~12–18 reel-uri din fiecare cont, cu vizualizări. Mediana e „ziua normală” a contului; un reel contează doar dacă o depășește de mult (multiplul).

| Cont | Tip | Urmăritori | Mediana vizualizări/reel |
|---|---|---|---|
| @primesupplements_ro | noi | 4.614 | 4.000 |
| @geniusnutrition | concurent | 51,1 mii | 5.796 |
| @gymbeamro | concurent | 88,4 mii | 9.366 |
| @nutriland.ro | concurent | 8.812 | 1.774 |
| @pronutritionro | concurent | 8.137 | 1.481 |
| @miruna.fitness | antrenoare RO (adiacent) | 1.626 | 2.897 |
| @alex_panek_ | sportivul nostru (cod APT) | 73,9 mii | 7.194 |
| @myprotein | mare, doar pentru format | 1,2 mil. | 39.900 |

**Concluzie rapidă:** mediana noastră (4.000) e aproape cât a Genius (5.800), deși Genius are de 11 ori mai mulți urmăritori. Nu stăm prost la vizualizări. Ne lipsesc reel-urile care „explodează”.

## 2. Pasul 1: reach „orb” față de conversie

- Multe reel-uri de la concurenți au vizualizări mari și aprecieri foarte puține. Nutriland „Noi suntem NUTRILAND”: 135 mii de vizualizări, 237 de aprecieri. GymBeam: 32,8 mii de vizualizări, 133 de aprecieri. **Asta e aproape sigur reclamă plătită** (vizualizări cumpărate, oameni care nu reacționează). Nu le copiem ca rețetă organică.
- Semnalul real e raportul aprecieri + comentarii + distribuiri / vizualizări. Cele mai bune la conversie (comentarii, distribuiri): miruna.fitness (întrebare + 👇) și postările cu sportivi sau la evenimente.

## 3. Pasul 2: ce structură au clipurile care au ieșit peste medie

20 de reel-uri peste 2× media contului, deschise unul câte unul. Se grupează în 5 tipare (clasificatorul din plugin știe doar hook-uri în engleză, așa că le-am grupat de mână):

| # | Tipar | Exemple (multiplu față de mediană) | Durată |
|---|---|---|---|
| A | **Colaborare cu un sportiv sau antrenor** (postare „collab”, apare la ambele conturi) | GymBeam: 3 din 3 reel-uri de top sunt colaborări (3,5×, 3,1×, 2,8×); Pro Nutrition cu Fabius Antal (4,5×); Myprotein (4,5×, 3,5×) | 18–40 s |
| B | **Eveniment / concurs / provocare** | **noi, la Valahia: 6,6× și 5,8×** (cele mai bune reel-uri ale noastre); Nutriland, record la aparatul de box (5×); Myprotein, interviu după concurs | 15–50 s |
| C | **Comparație greșit/corect** (ecran împărțit, X roșu / bifă verde) | miruna: „Ea pune masă musculară / Ea pierde timpul” (81×, 236 mii); „5 detalii la care să fii atent” (14×) | 10–24 s |
| D | **Întrebare cu număr pe ecran + 👇 în descriere** | miruna: „Cât trebuie să…?” (3,5×); Pro Nutrition: „Ce greșeală vezi cel mai des…?” (4,5×); GymBeam: „3 greșeli care vă împiedică să puneți masă” (3,1×) | 10–40 s |
| E | **Umor / POV / auto-ironie**, un singur cadru, text mare | miruna: „Da frate, am pus 30g de fructe de pădure” (10×, 7 s); Nutriland „Mesajul de marți” (4,9×); Genius „POV: …breakfast” cu proteină în rețetă (2,4×) | 7–16 s |

Ce au în comun reel-urile de top și le lipsesc celor slabe:
- **textul de pe ecran din prima secundă** spune tot hook-ul (nu logo, nu intro);
- **un om în cadru** (sportiv, antrenor, client), nu produsul singur pe masă: reel-urile Genius/GymBeam doar cu produs stau la mediană;
- **scurt**: tiparele C și E au 7–10 s și se reiau în buclă;
- **îndemn la comentariu** (👇, „scrie…”, „dă tag”), nu „cumpără acum”.

Numărul de clipuri ajunge pentru tipare, nu pentru certitudini: 19 reel-uri peste medie din 8 conturi (~140 citite). Tiparele A și B se repetă la 5 conturi diferite, deci sunt solide. C și E vin mai ales de la un singur cont (miruna), deci sunt de testat, nu sigure.

## 4. Pasul 3: formatul pentru nișa noastră

1. **Reel cu om + text din prima secundă**, 7–25 s. Format principal: 3 pe săptămână.
2. **Colaborare (collab)** cu sportivi: Alex Panek (sponsorizat, cod APT, 73,9 mii de urmăritori), Kara (am mai făcut o colaborare pe 3.11), afiliații. Le dublează audiența fără bani.
3. **Carusel** doar pentru informație salvabilă (o dată pe săptămână).
4. Stories zilnic, din ce se filmează oricum.

Nu facem: reel-uri doar cu produsul, intro cu logo, clipuri de peste 40 s fără un om care vorbește. Nu facem nici subiecte de slăbit (regula: fără promisiuni de slăbire), chiar dacă la miruna merg.

## 5. Pasul 4: unde se pierde publicul

Retenția (graficul „unde au plecat oamenii”) o arată Instagram **doar pentru reel-urile noastre**, în aplicație: reel → „Vezi statistici”. Pentru concurenți nu se poate vedea. Pas pentru Marius: după fiecare reel din plan, la 3 zile, o captură cu graficul de retenție. Claude o trece prin `/ig-perf` și spune ce tăiem la următorul.

## 6. Pasul 5: programul Instagram 25.11 – 1.01.2027 (refăcut în Zernio pe 24.11)

Marius, 24.11: „programează în Zernio după noua strategie … să nu se bată cap în cap cu cele programate … refă programul până la 1 ianuarie”.

**Regula:** o singură postare pe zi în feed. Pozele și caruselele rămân la 18:00, reel-urile merg la 19:30, în zilele fără altă postare. Facebook-ul nu s-a schimbat.

**Ce am schimbat în Zernio (Instagram):**
- **nou:** carusel K1 „Câtă proteină ai în farfurie?” pe 1.12, 18:00 (post `6b04e2327db4eedb29dd6fdb`, imaginile `carusel-k1-proteina-0x.jpg` în Shopify Files);
- **21.12:** postarea cu creatina (`6af38cd317b9bcfe4f8f70b0`) e acum caruselul K2 „Creatina: 5 întrebări”, cu text nou (aceeași oră);
- **mutate**, ca să elibereze zilele de reel: Nitrox 3D 7.12 → 8.12 (textul începe acum cu „Marți”), Pure Isolate 9.12 → 10.12, Emperor Mass 11.12 → 12.12;
- **șters: nimic.** K3 (cadouri) nu se mai face: 13.12 și 18.12 au deja postări cu idei de cadouri.

| Zi | Instagram feed | Tip |
|---|---|---|
| Mie 25.11 | Late Black Friday (carusel) | programat |
| Joi 26.11 | Pachet Cura de Iarnă | programat |
| Vin 27.11 | **R1** cremă de orez „doar 2 linguri” | reel – video de la Marius |
| Sâm 28.11 | Pachet Duo Magneziu | programat |
| Dum 29.11 | **R2** creatină „Așa NU / Așa DA” | reel – video |
| Mar 1.12 | **K1** carusel proteină | programat (nou) |
| Mie 2.12 | Creatină Creapure (poză) | programat |
| Joi 3.12 | **R3** collab Alex Panek | reel – video |
| Vin 4.12 | Prime Whey (poză) | programat |
| Sâm 5.12 | **R4** POV shake | reel – video |
| Dum 6.12 | Sf. Nicolae | programat |
| Lun 7.12 | **R5** „3 greșeli cu creatina” | reel – video |
| Mar 8.12 | Nitrox 3D | programat (mutat) |
| Mie 9.12 | **R6** mic dejun greșit/corect | reel – video |
| Joi 10.12 | Pure Isolate | programat (mutat) |
| Vin 11.12 | **R7** provocarea de la sală (collab) | reel – video |
| Sâm 12.12 | Emperor Mass | programat (mutat) |
| Dum 13.12 | Idee de cadou | programat |
| Lun 14.12 | EAA | programat |
| Mar 15.12 | **R8** „light” de sărbători | reel – video |
| Mie 16.12 | Combat Pro 2.0 | programat |
| Joi 17.12 | **R9** „Câtă proteină după sală?” | reel – video |
| Vin 18.12 | Cadouri mici | programat |
| Sâm 19.12 | **R10** collab afiliat / Kara | reel – video |
| Dum 20.12 | Glutamină | programat |
| Lun 21.12 | **K2** carusel creatină | programat (înlocuit) |
| Mie 23.12 | Daily Vitamin | programat |
| Vin 25.12 | Crăciun fericit | programat |
| Dum 27.12 | Cluster Bomb | programat |
| Lun 28.12 | Energy Pump Shot | programat |
| Mar 29.12 | **R12** „POV: a 3-a zi de sarmale, prima zi de sală” | reel – video |
| Mie 30.12 | Obiective 2027 | programat |
| Joi 31.12 | **R11** 2026 pe scurt | reel – montaj din filmări existente |
| Vin 1.01 | Ziua 1 din 365 | programat |

Reel-urile se programează pe măsură ce sosesc video-urile: Marius le trimite cu cel puțin 2 zile înainte; Claude pune textul pe ecran, descrierea, coperta și le urcă în Zernio (Instagram + Facebook Reels). Dacă un video nu vine la timp, ziua rămâne doar cu stories.

**R12 (nou, tipar E, 8 s):** un cadru, Marius intră pe ușa sălii cu shakerul în mână. Text: „POV: a 3-a zi de sarmale, prima zi de sală”. Descriere: „Cine e cu noi? 👇”.

### Scripturile (hook 0–3 s → problemă 3–12 s → dovadă → îndemn)

**R1 – „Am pus doar 2 linguri” (E, 10 s).** Un singur cadru: mâna pune a treia, a patra lingură de cremă de orez în bol. Text sus: „«am pus doar 2 linguri» 🙂”. Final: bolul plin, aroma pe ecran. Descriere: „Câte linguri pui tu? 👇”.

**R2 – „Așa NU / Așa DA” la creatină (C, 15 s).** Ecran împărțit. Stânga (X roșu): „o iau doar în zilele de sală, cât îmi amintesc”. Dreapta (bifă verde): „3 g în fiecare zi, cu orice masă”. Final: „Creatina crește performanța fizică în exerciții scurte, de intensitate mare, repetate (3 g/zi).” Descriere: „Tu cum o iei? 👇”.

**R3 – Collab cu Alex Panek (A, 25 s).** Text din prima secundă: „Ce mănâncă un IFBB Pro după antrenament”. Alex își face shake-ul cu Prime Whey în sala lui, spune o frază despre ce urmărește la proteină. Postare collab @primesupplements_ro + @alex_panek_. Îndemn: „Codul APT e în bio-ul lui Alex.”

**R4 – „POV: ți-ai zis că sari peste shake azi” (E, 8 s).** Cadru: mâna care se întoarce după shaker. Buclă. Descriere: „Dă tag cuiva care face asta 👇”.

**R5 – „3 greșeli cu creatina” (D, 20 s).** Marius în cadru, text mare: „3 greșeli cu creatina pe care le văd la sală”. 1. „O iei doar când te antrenezi.” 2. „Crezi că trebuie «încărcare».” 3. „Te sperii de apa din mușchi.” Fiecare cu o propoziție de răspuns. Fără mențiuni medicale. Îndemn: „Care a fost a ta? 👇”.

**R6 – Micul dejun greșit / corect (C, 12 s).** Ecran împărțit: stânga, cornul și cafeaua de pe drum (X); dreapta, crema de orez gata în 2 minute + shake (bifă). Text: „Același timp. Altă dimineață.” Fără promisiuni de slăbire.

**R7 – Eveniment / provocare (B, 30 s).** Ce a mers cel mai bine la noi (6,6× la Valahia). Varianta din decembrie: provocare la Evo Gym, „Câte flotări faci într-un minut?”, cu sportivi și clienți. Câștigătorul primește un produs Prime (premiu, nu cod de reducere). Collab cu sala. Îndemn: „Dă tag cuiva care te bate 👇”.

**R8 – „Când zici că mănânci «light» de sărbători” (E, 10 s).** Auto-ironie, un cadru, cu bolul de cremă de orez cu topping de sărbătoare.

**R9 – „Câtă proteină îți trebuie după sală?” (D, 20 s).** Text cu numărul pe ecran din prima secundă: „20–40 g”. Marius explică în 3 propoziții, arată o măsură de Prime Whey. Mențiune: „Proteinele contribuie la creșterea masei musculare.” Îndemn: „Tu cât iei? 👇”.

**R10 – Collab cu un afiliat sau cu Kara (A, 25 s).** „Rutina mea de dimineață înainte de sală”, cu creatina pusă în shake. Postare collab. Îndemn spre codul afiliatului.

**R11 – Recapitularea anului (B, 15 s).** Cele mai bune cadre din 2026: standuri, concursuri, sportivi, Marius. Text: „2026 pe scurt. Mulțumim.” Fără vânzare.

**K1 – „Câtă proteină ai în farfurie?” (carusel).** 6 alimente obișnuite cu gramele de proteină, ultimul slide e shake-ul Prime Whey. Bun de salvat.
**K2 – „Creatina: 5 întrebări, 5 răspunsuri scurte”.** Doar mențiunea autorizată.
**K3 – renunțat (24.11):** 13.12 și 18.12 au deja postări cu idei de cadouri.

## 7. Ce face fiecare

- **Marius:** filmează R2, R5, R9 (el în cadru) și R1, R4, R6, R8 (doar mâini și produs, telefonul ajunge); îi scrie lui Alex Panek pentru R3 și unui afiliat sau Karei pentru R10; alege sala pentru R7; trimite capturile cu retenția.
- **Claude:** subtitrări și text pe ecran pentru fiecare reel (`/ig-direct`), descrieri, caruselele K1–K3 ca imagini, programarea în Zernio **doar după „da”**, apoi `/ig-perf` pe fiecare reel și ajustarea planului la jumătate (~10.12).
- **Opțional (nu e pornit):** DM automat la un cuvânt din comentarii, prin Zernio (discutat tot pe 24.11, înainte de acest plan). S-ar potrivi la R5 și R9 („scrie CREATINĂ și îți trimit ghidul”). Doar cu acordul lui Marius și după ce verificăm costul în Zernio.

## 8. Video-urile de pregătit (Marius) – fișa completă, cu textele exacte: `FILMARI.md`

Format pentru toate: telefon **vertical**, 1080×1920, lumină bună (fereastră sau sala luminată), fără text pus de tine (textul îl pun eu). Trimite-mi clipurile brute; dacă vorbești, vorbește clar, 1–2 propoziții.

| Reel | Pentru | Trimite până la | Cine e în cadru | Ce filmezi (durată brută) |
|---|---|---|---|---|
| R1 | 27.11 | **26.11** | doar mâini | bolul, 4–5 linguri de cremă de orez puse una după alta, apoi bolul plin cu topping (15 s) |
| R2 | 29.11 | 27.11 | doar mâini | două cadre separate: (1) borcanul de creatină pus înapoi în dulap, neatins; (2) o măsură de 3 g în shaker, dimineața, lângă cafea (2 × 6 s) |
| R4 | 5.12 | 3.12 | mâini / din spate | pleci din cadru, te oprești, te întorci după shaker și îl iei (8 s) |
| R5 | 7.12 | 5.12 | **Marius** | față în cameră, la sală: „3 greșeli cu creatina pe care le văd la sală” + cele 3 răspunsuri (30 s) |
| R6 | 9.12 | 7.12 | doar mâini | (1) corn + cafea pe masă; (2) crema de orez făcută în 2 minute + shake (2 × 8 s) |
| R8 | 15.12 | 13.12 | doar mâini | bolul de cremă de orez cu topping „de sărbători” (scorțișoară, nucă, fructe), filmat de sus (10 s) |
| R9 | 17.12 | 15.12 | **Marius** | față în cameră: „Câtă proteină îți trebuie după sală?” 3 propoziții + măsura de Prime Whey în shaker (25 s) |
| R12 | 29.12 | 27.12 | **Marius** | intri pe ușa sălii cu shakerul în mână, privești în cameră (8 s) |
| R11 | 31.12 | – | – | nimic de filmat: montez eu din `video ecran valahia 2026`, `reeluri evo gym shooting` și pozele din 2026 |
| R3 | 3.12 | 1.12 | **Alex Panek** | vezi colaborările mai jos |
| R7 | 11.12 | 9.12 | sportivi + clienți | provocarea de la Evo Gym, vezi mai jos |
| R10 | 19.12 | 17.12 | afiliat / Kara | vezi mai jos |

**Cel mai simplu:** o singură sesiune de filmare (o oră, la Evo Gym + bucătărie) acoperă R1, R2, R4, R5, R6, R8, R9 și R12.

## 9. Colaborările, pe scurt

**Ce e o „colaborare” (collab) pe Instagram:** un singur reel publicat de **două conturi deodată**. Noi îl publicăm și îl invităm pe sportiv ca „colaborator”. După ce el acceptă invitația din aplicație, reel-ul apare **și pe profilul lui, și pe al nostru**. Îl văd și urmăritorii lui, și ai noștri, iar aprecierile și vizualizările se adună într-un singur loc. Nu e reclamă plătită și nu costă nimic.

**De ce contează:** la GymBeam, toate cele 3 reel-uri de top din ultima lună au fost colaborări cu antrenori. Și la Pro Nutrition, cel mai bun reel e un collab (cu Fabius Antal). Alex Panek are 73,9 mii de urmăritori, de 16 ori mai mulți decât noi. Un collab cu el ajunge la publicul lui fără un leu.

**Cum se face, pas cu pas:**
1. Sportivul filmează (sau filmăm noi cu el) clipul după script și ți-l trimite.
2. Eu îl programez în Zernio cu numele lui la „colaboratori” (până la 3 conturi).
3. La ora publicării, Instagram îi trimite o invitație. **El trebuie să apese „Acceptă”** în aplicație. Până acceptă, reel-ul apare doar la noi.
4. Ideal: scrie-i cu o zi înainte, ca să știe că vine invitația.

**Cele 3 colaborări din plan:**
- **R3 (3.12) – Alex Panek:** „Ce mănâncă un IFBB Pro după antrenament”. El, în sala lui (APT GYM), își face shake-ul cu Prime Whey și spune ce urmărește la proteină. 20–30 s, față în cameră. Codul lui, APT, apare în descriere.
- **R7 (11.12) – Evo Gym (contul sălii):** provocarea „Câte flotări faci într-un minut?” cu 3–5 oameni din sală. Câștigătorul primește un produs Prime ca premiu (nu cod de reducere). Collab cu contul sălii.
- **R10 (19.12) – un afiliat sau Kara** (am mai făcut o colaborare cu Kara pe 3.11): „Rutina mea de dimineață înainte de sală”, cu creatina pusă în shake. Fără pachetele din Reduceri (regula afiliaților).

**Mesaj gata de trimis lui Alex (WhatsApp):**
> Salut Alex! Vrem să facem un reel împreună pe 3.12, publicat pe ambele conturi (collab). Ideea: „Ce mănâncă un IFBB Pro după antrenament”: tu în sală, îți faci shake-ul cu Prime Whey și spui în 2–3 propoziții ce urmărești la proteină. 20–30 de secunde, telefon vertical. Dacă poți să mi-l trimiți până pe 1.12, îl programăm noi și îți vine invitația de colaborare pe Instagram; doar o accepți. Mersi!
