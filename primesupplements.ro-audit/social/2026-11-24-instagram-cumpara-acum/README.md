# Instagram „Cumpără acum”, story cu link, linkuri pe profil (24.11.2026)

Cerut de Marius pe 24.11: „1. fă așa, dar să te încadrezi în buget; 2. fă și asta; 3. da, fă și asta; 4. e ok cu link în bio”.
Context: Instagram Shopping (etichetele de produs) nu e disponibil în România, vezi `findings/INSTAGRAM-SHOPPING-2026-11-24.md`.

## 1. Postare cu bara „Cumpără acum” (fără buget în plus)
- **Postarea organică:** https://www.instagram.com/p/DgGo-W4iD0i/, publicată pe 24.11 la 02:13 prin Zernio (post 6b04d67a7be7a3c95528934f, media IG 18119844805825279). Poza e `meta-nou-crema-orez-mic-dejun.png`, iar textul e cel aprobat pentru reclame pe 19.11, cu „🛒 Linkul e în bio.” la final.
- **Reclama:** în Reclame Prime, tabul „Creare”, **propunerea #16**: postarea ca reclamă nouă, cu buton „Cumpără acum” spre `/products/crema-de-orez-tort-de-ciocolata`.
  - Intră în ad set-ul existent „Crema de orez – RO 18-55 – public rece” (120251693918550615), deci păstrează **bugetul de 40 lei/zi** și publicul nou, cu excluderile.
  - Proiecția lunii rămâne 1.981,66 lei din 3.000. Meta a validat creativul.
  - Pornirea o face Marius, cu „Acceptă și pornește”.
- **Cum apare bara:** cât rulează reclama, postarea din profil arată „Cumpără acum” jos, ca la Genius. De verificat pe telefon după pornire.
- **Cod:** reclame-prime commits c04174b, 1bcca9f. Reclamele Meta acceptă acum `ig_post` (+ `ig_user_id`, `ig_media_id`), adică o postare existentă, cu buton. Tokenul system user-ului nu are `pages_read_engagement`, de aceea id-urile vin din Zernio (`posts_get_post` → platformPostId; contul IG 17841457260903173).

## 2. Story cu autocolant Link
- Poza: `story-crema-orez.jpg` (1080×1920; jos e un loc liber pentru autocolant). Online, pentru telefon: https://cdn.shopify.com/s/files/1/0917/5138/3415/files/story-crema-orez-link-2026-11-24.jpg?v=1795479446
- API-ul Instagram (Zernio) nu poate pune autocolantul Link, așa că story-ul îl postează Marius din aplicație:
  1. Deschide linkul pe telefon, ține apăsat pe poză și alege „Salvează”.
  2. În Instagram: + → Story → alege poza → autocolant „Link”.
  3. Linkul: `https://primesupplements.ro/collections/crema-de-orez?utm_source=instagram&utm_medium=story&utm_campaign=story-link`. Textul autocolantului: „Vezi aromele”.
  4. Pune autocolantul pe zona neagră de sub „APASĂ PE LINK ↓”.
- Generator: `make-story.ps1` (se rulează cu PowerShell, salvat ca UTF-8 cu BOM).

## 3. Linkuri pe profil (doar din aplicația de pe telefon)
Instagram web: „Editing your links is only available on mobile”. Din aplicație: Profil → Editează profilul → Linkuri → Adaugă link extern.
| Titlu | URL |
|---|---|
| Cremă de orez | `https://primesupplements.ro/collections/crema-de-orez?utm_source=instagram&utm_medium=bio&utm_campaign=link-bio` |
| Prime Whey 2 kg | `https://primesupplements.ro/products/prime-whey-2000g?utm_source=instagram&utm_medium=bio&utm_campaign=link-bio` |
| Creatină Creapure® | `https://primesupplements.ro/products/creatina-creapure?utm_source=instagram&utm_medium=bio&utm_campaign=link-bio` |
Rămâne și `www.primesupplements.ro`. Ordinea pe profil e cea din tabel (prima apare cea mai vizibilă).

## 4. „Link în bio”
Decizie 24.11: postările de vânzare de pe Instagram se termină cu „🛒 Linkul e în bio.” (prima aplicare: postarea de mai sus).

## Făcut de Claude din browser (24.11, după „da, pornește #16” și „fă tu tot, ai aprobarea mea”)
- **#16 pornită** din Reclame Prime → Creare: „Da, creează oprit” → „Da, pornește”. Pornește doar reclama nouă (creative 1663597361841123, ad 120251765591340615), cu ad set-ul neschimbat la 40 lei/zi. Proiecția lunii: 1.981,66 / 3.000. Trecută în Jurnalul aplicației. Bara „Cumpără acum” apare după aprobarea Meta a reclamei.
- **Story publicat pe Instagram** din Meta Business Suite → Create story, doar @primesupplements_ro. Autocolantul Link e pus prin Edit → More stickers → Link, cu textul „Vezi aromele”, spre colecția cremă de orez (UTM story-link). Autocolantul a rămas între tub și bol; mutarea prin tragere nu a funcționat în editor. Truc pentru urcare: inputul de fișier se creează la clic, așa că `HTMLInputElement.prototype.click` a fost deviat ca să rămână în pagină, apoi `file_upload`.
- **Linkurile de pe profil: NEFĂCUTE.** Instagram web (și în modul mobil) spune „only available on mobile”, iar Business Suite → Edit Instagram Profile cere „Verify account”, adică verificarea contului de către Marius. Rămân de pus din aplicația de telefon (tabelul de mai sus).
- De știut: Business Suite anunță că **din 26.11.2026 Meta adaugă „product browsing” la reclamele existente** (la atingerea pozei apar produse și sugestii pe Facebook/Instagram). Se poate refuza („Opt out”) până pe 26.11. E decizia lui Marius; nu am apăsat nimic.
