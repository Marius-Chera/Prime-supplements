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

## 6. Pasul 5: calendarul 25.11 – 24.12.2026

Deja programate (nu se schimbă): 25.11 carusel Late Black Friday; 26.11 și 28.11 postările cu pachete (Cura de Iarnă, Duo Magneziu). Mențiuni de sănătate doar cele autorizate în UE. Sportivi bărbați în cadru; ca locații, Evo Gym și ședințele foto din `D:\Prime Supplements`.

| Zi | Format | Tipar | Produs | Script |
|---|---|---|---|---|
| Joi 27.11 | Reel 10 s | E | Cremă de orez | R1 |
| Sâm 29.11 | Reel 15 s | C | Creatină | R2 |
| Lun 1.12 | Carusel | D | Prime Whey | K1 |
| Mie 3.12 | Reel collab 25 s | A | Prime Whey | R3 |
| Vin 5.12 | Reel 8 s | E | Prime Whey | R4 |
| Dum 7.12 | Reel 20 s | D | Creatină | R5 |
| Mar 9.12 | Reel 12 s | C | Cremă de orez | R6 |
| Joi 11.12 | Reel collab 30 s | B | toate | R7 |
| Sâm 13.12 | Carusel | D | Creatină | K2 |
| Lun 15.12 | Reel 10 s | E | Cremă de orez | R8 |
| Mie 17.12 | Reel 20 s | D | Prime Whey | R9 |
| Vin 19.12 | Reel collab 25 s | A | Creatină | R10 |
| Dum 21.12 | Carusel | – | idei de cadouri (fără reducere nouă) | K3 |
| Mar 23.12 | Reel 15 s | B | toate | R11 |

Total: 11 reel-uri + 3 caruseluri. Ora: 19:00–20:00 (seara, după sală). Toate se termină cu „🛒 Linkul e în bio.” acolo unde e vorba de vânzare.

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
**K3 – „Ce îi iei de Crăciun unuia care merge la sală”.** Produsele noastre la prețul normal, fără cod nou (regula: doar WELCOME5).

## 7. Ce face fiecare

- **Marius:** filmează R2, R5, R9 (el în cadru) și R1, R4, R6, R8 (doar mâini și produs, telefonul ajunge); îi scrie lui Alex Panek pentru R3 și unui afiliat sau Karei pentru R10; alege sala pentru R7; trimite capturile cu retenția.
- **Claude:** subtitrări și text pe ecran pentru fiecare reel (`/ig-direct`), descrieri, caruselele K1–K3 ca imagini, programarea în Zernio **doar după „da”**, apoi `/ig-perf` pe fiecare reel și ajustarea planului la jumătate (~10.12).
- **Opțional (nu e pornit):** DM automat la un cuvânt din comentarii, prin Zernio (discutat tot pe 24.11, înainte de acest plan). S-ar potrivi la R5 și R9 („scrie CREATINĂ și îți trimit ghidul”). Doar cu acordul lui Marius și după ce verificăm costul în Zernio.
