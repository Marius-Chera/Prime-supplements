# Meta Ads – unde vin chitanțele (verificat 26.11.2026)

Cererea lui Marius (26.11): facturile Meta Ads să vină și ele pe contact@, ca să intre singure în Total Admin → Cheltuieli + Facturi.

## Raportul extensiei Claude din Chrome (contul de Facebook al Adelinei; lipit de Marius; nimic modificat)
- **Accesul la contul de reclame:** acces complet are doar Adelina. reclame-prime (aplicația Reclame Prime) are acces parțial (campanii, performanțe, machete). Butonul „Assign yourself full control” nu a apărut.
- **Pe ce adresă vin chitanțele:** singura adresă setată e **adelina.fagaras@gmail.com**, contactul Adelinei din portofoliul de afaceri.
  - În Setări → Notificări → „Actualizări privind contul de publicitate” (la nivel de afacere), e-mailul e pornit.
  - În Ads Manager → Setările notificărilor → „Facturare și plăți” (la nivel de cont de reclame), e-mailul e oprit. Sunt pornite doar notificările în Ads Manager și pe Messenger.
  - Meta spune că facturile se trimit oricum. Livrarea nu a fost confirmată.
- **Câmp separat pentru e-mailul chitanțelor:** nu există. S-a căutat în Setări de plată, Informații fiscale, Informații despre afacere și Facturi. Cel mai apropiat e Ads Manager → Setările contului de publicitate → „Date de contact” → „Adresă de e-mail”, acum gol („Niciuna”). Meta îl descrie ca e-mail general pentru notificări despre cont, nu pentru chitanțe. Probabil cere un cod de confirmare.
- **Descărcarea ca PDF:** în „Activități de plată” fiecare tranzacție are butonul **„Descarcă PDF”**. Același buton apare și în pagina tranzacției. Pe pagina contului mai e „Descarcă ultima chitanță”. Din pagina tranzacției chitanța nu se poate trimite pe e-mail.
  - Exemplu: plata din 3.11.2026, 06:47: **1.653,46 RON**, referința **USKDDEW6G4**, factura **FBADS-363-106842783**.

## Ce am verificat eu (Claude, 26.11)
- În extrasul BT, plata Meta apare ca „EPOS 03/11/2026 … **FACEBK *USKDDEW**”. Asta înseamnă că **textul de după „FACEBK *” e începutul referinței plății din Meta**, deci plata și chitanța se potrivesc exact.
- **Noiembrie e complet.** PDF-ul FBADS-363-106842783 (`facturi-online-2026-11/`) e deja legat de plata de 1.653,46 din 5.11.
- **Septembrie și octombrie:** în Total Admin, 5 plăți Meta nu au chitanța atașată:

  | Data | Sumă (lei) | Referința |
  |---|---|---|
  | 2.09 | 2.914 | 7EEG65S… |
  | 5.09 | 463,61 | YS3P75J… |
  | 22.09 | 2.914 | TV5A88W… |
  | 5.10 | 2.350,82 | W7Q8Z86… |
  | 24.10 | 4.323 | BGLDMBN… |
- **Inboxul nu l-am putut verifica.** În Chrome-ul lui Marius, Gmail are deschise doar primesupplementsro@, contact@, adelina.chera@ și marius.chera23@, nu și adelina.fagaras@. În primele trei nu e nicio chitanță Meta în ultimele 60 de zile. Contul de Facebook al Adelinei folosește adelina.chera@ doar pentru mesaje de securitate. Rămâne neverificat dacă e-mailul cu chitanța are PDF atașat.

## Ce am schimbat
- În Total Admin → Cheltuieli + Facturi, o plată Meta fără document arată acum referința și drumul exact: „Ads Manager → Facturare și plăți → Activități de plată → plata cu referința USKDDEW… → Descarcă PDF (contul Adelinei), apoi încarcă PDF-ul aici”. Modificarea e în prime-expediere, commit 7e87e2d, publicată.

## Variante ca chitanțele să vină singure (de ales de Marius; nimic făcut)
1. **Regulă în Gmail-ul adelina.fagaras@ (recomandat dacă e-mailul are PDF):** filtru „de la Meta, chitanță” → redirecționare pe contact@. O face Adelina din contul ei. Gmail trimite un cod de confirmare pe contact@. Aplicația ia apoi e-mailul și îl leagă după sumă și referință.
2. **Descărcare de mână (sigur, merge acum):** Meta încasează de 1–3 ori pe lună. Adelina apasă „Descarcă PDF” la fiecare plată și încarcă fișierul la rândul plății din Total Admin, unde e scrisă referința.
3. **„Date de contact” din contul de reclame = contact@:** e o setare de cont, deci doar cu „da”. Nu e sigur că aduce chitanțele (Meta o descrie pentru notificări).
