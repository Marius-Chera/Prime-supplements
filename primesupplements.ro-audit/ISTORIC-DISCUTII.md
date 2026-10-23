# Istoricul discuțiilor și deciziilor – Prime Supplements

Scop: un singur loc în care orice sesiune Claude (din aplicația de pe calculator sau din browser) găsește tot ce s-a discutat și s-a decis cu proprietarul (Marius), ca să nu se reia lucruri deja hotărâte și să nu se dubleze munca.

**Surse (versiunea 1, 23.10.2026):** JURNAL.md, DE-FACUT.md, CLAUDE.md, OWNER-HANDOVER.md, SETARI-VANZARI-2026-10-16.md, documentele din `email-marketing/`, istoricul commiturilor (12–23.10.2026) și sesiunea din aplicație din 23.10.2026.
**Ce NU e încă inclus cuvânt cu cuvânt:** conversația din prima sesiune din browser (claude.ai, 12–22.10.2026, `session_01PHApHSYZLG3YN4uAZqrTyd`). Rezultatele ei sunt în JURNAL.md și în fișierele din repo, dar nu fiecare mesaj. Decizie proprietar (23.10): NU se extrage integral – ajunge ce e în acest caiet.

**Regula de actualizare:** orice decizie nouă a proprietarului se adaugă la secțiunea 1, cu data; orice lucru făcut merge în JURNAL.md; ce rămâne deschis, în DE-FACUT.md.

---

## 1. Decizii și reguli ale proprietarului

### Permanente (CLAUDE.md)
- Stocul și statusul produselor nu se modifică fără cererea lui explicită; stocul vine din Oblio – se raportează, nu se corectează.
- Nu se umblă în Fluxsales și Primesupplements App; nu se intră în checkout pe site. Oblio: citire la cerere, modificări doar cu acordul lui.
- Nu se menționează furnizorul sau fabrica (excepție: mărcile de ingrediente din titlu, ex. Creapure®, Kyowa®).
- Doar mențiuni de sănătate autorizate în UE; fără promisiuni de slăbire sau vindecare.
- Designul nu se schimbă fără aprobarea lui.
- Fără Black Friday. Fără coduri de reducere noi (doar WELCOME5). Coduri existente: maximum 20% (18.10).
- Afiliații nu sunt împinși spre pachetele din Reduceri (fără comision acolo); fără haine MNX în kituri; nu se afișează numărul total de afiliați.
- Fără date personale ale clienților sau afiliaților în repo; nu se cer chei API sau parole; nu se șterg date din magazin fără să i se spună.
- E-mailurile de test merg la marius.chera@yahoo.com și adelina.chera@gmail.com.
- Răspunsuri în română; textele pentru extensia Chrome în bloc de cod.
- Orice îmbunătățire se trece în JURNAL.md.

### Pe date
- **18.10:** coduri de reducere inactive >90 de zile: 43 șterse, 5 reactivate; plafon 20%. Fost angajat scos din afiliați.
- **19.10:** e-mailul devine obligatoriu la comandă. Rapoarte lunare către Marius, Adelina, Ovidiu.
- **22.10:** NAC are 500 mg pe capsulă (confirmat de proprietar). Rapoartele lunare și blogul trec pe modelul mai ieftin (Sonnet). Blogul: 1 articol pe zi, verificare de calitate pe ~30.10. Headroom: doar instalat, fără proxy. Lucrul se mută în sesiuni noi, pe teme.
- **23.10 – repo:** se lucrează pe GitHub **Marius-Chera/Prime-supplements** (fork). Contul vechi `mariuschera` nu mai e folosit (parolă necunoscută). Aplicația Claude e instalată pe noul repo.
- **23.10 – rutine:** cele 8 sarcini din sesiunea veche au devenit rutine separate („Lista noilor rutine e bună”); vechile variante le șterge el manual din claude.ai/code/routines.
- **23.10 – plăți:** **NU Shopify Payments / Apple Pay / Google Pay.** Rămâne **Netopia** („desfășurătoarele cu încasările sunt mult mai clare”).
- **23.10 – strategii de vânzări fără buget (top 5):** 1) scurgerea din checkout (fără Shopify Payments), 2) lista de e-mail la treabă – **făcut**, 3) afiliații tăcuți, 4) recenziile, 5) Google gratuit. Cerința: „fă totul ca și cum ești cel mai bun expert din lume”.
- **23.10 – D3 + K2:** stocul e real. Campaniile „din nou în stoc”: VIP pe 24.10 la 10:00, restul pe 25.10 la 10:00.
- **23.10 – teste e-mail:** pentru ORICE automatizare sau campanie, test la el și la Adelina înainte de pornire.
- **23.10 – design e-mail (aprobat):** un singur design premium pentru absolut toate e-mailurile (clienți, flux, campanii, afiliați): antet negru cu logo-ul alb oficial și linie roșie, Poppins, titluri Impact, carduri gri deschis, butoane roșii, subsol negru cu datele firmei. Referința aleasă de el: e-mailul „Bine de știut înainte să comanzi”. Agenția anterioară a neglijat designul și „am avut de pierdut”. Ghid: `email-marketing/design/DESIGN-EMAIL-PRIME.md`.
- **23.10 – imagini în e-mailuri:** cam 50% fotografii reale din ședințe (din `D:\Prime Supplements`) și 50% imagini AI cu produsele (stilul blogului), fără să se repete aceleași persoane. **Afiliații primesc doar imagini AI**, nu poze din ședințe. Fostele colaboratoare din poza de grup Evo Gym (a doua din stânga, cu top verde, și ultima din dreapta) nu mai apar nicăieri. Totul trebuie să fie profesionist, fără defecte (ex. decupaje zimțate).
- **23.10 – voce:** Prime e prezentat ca o companie cu echipă și responsabilități, nu ca brandul unei persoane sau o afacere de familie. Semnătura e „Echipa Prime Supplements”. Fără linkul „Cunoaște-l pe Marius” în e-mailuri.
- **23.10 – cifre:** nu se afișează numărul de comenzi (8.600) – „nu afișa”; magazinul era înainte pe WooCommerce.
- **23.10 – pagina de autor:** refăcută, mai complexă, conform SEO (făcut).
- **23.10 – kit afiliați:** dacă scrie „7 produse”, trebuie să arate exact 7. „Să fii atent la toate aspectele.”
- **23.10 – reaprovizionare:** designul aprobat; fluxul pornit **fără comandă de test** (el nu poate face comanda acum).
- **23.10 – mod de lucru:** lucrul zilnic în aplicația de pe calculator, în folderul `D:\Proiecte Claude\Prime Supplements`; cloud (browser) doar pentru rutine. Vrea un loc cu absolut toate informațiile; când sesiunea se umple, i se spune cum se continuă fără să se piardă nimic.
- **Google:** nu se instalează Google & YouTube (Simprosys trimite deja feedul). Profil de firmă Google: nu (magazin doar online, neeligibil).

## 2. Cronologie pe scurt
Detaliile sunt în JURNAL.md (sursa principală).
- **12–13.10:** audit SEO complet; titluri și meta noi pentru produse, colecții, articole; temă optimizată; PageSpeed.
- **13–16.10:** curățenia blogului (121 de articole reparate, duplicate scoase, 301), pagini despre noi/contact/autor, politici; program SEO pentru top 48 de produse; audit și pauză pentru 7 automatizări theMarketer; 3.080 de abonați sincronizați; newsletter de duminică.
- **16.10:** SETARI-VANZARI: setări de vânzare și texte pentru extensie (E1–E20).
- **18.10:** 12 pachete Reduceri cu SEO; coduri curățate; Zernio (Facebook + Instagram) și calendar de postări; automatizarea lunară pentru afiliați.
- **19.10:** checkout (e-mail obligatoriu, bara de livrare gratuită), rapoarte lunare, analiza coșurilor abandonate.
- **19–21.10:** „Cart abandonment 2026” în locul fluxului vechi.
- **22.10:** colecția Reduceri vizibilă; tema „Prime – tema activă (22.10)” publicată; 3 pachete de iarnă; postări FB/IG; NAC 500 mg; modele mai ieftine; blog 1 articol pe zi.
- **23.10:** rutinele mutate; repo pe Marius-Chera; stoc revenit D3+K2 și rutina zilnică; bifa de abonare la checkout; designul comun pentru toate e-mailurile (Welcome, coș, reaprovizionare, campanii, afiliați); 7 poze din ședințe în Shopify Files; pagina de autor refăcută; Reaprovizionare 2026 pornit cu verificări automate pe 24.10 și 10.11; verificarea Merchant Center; mutarea în folderul de pe D:.

## 3. Discutat, dar nefăcut sau în așteptare
- Strategia 1 (checkout, fără Shopify Payments): taxa de livrare afișată devreme, ora-limită de expediere, rândul de încredere lângă butonul de comandă.
- Strategia 3 (afiliați): invitație personală pentru cei cu 0 comenzi; micro-afiliați dintre clienții cu peste 3 comenzi.
- Strategia 4 (recenzii): cerere Judge.me cu memento și poză; cele mai bune recenzii pe primele 10 produse. **23.10:** propunerile complete (flux Judge.me, stele în Google Shopping, Trustpilot, SupliScout, Microsoft Merchant Center) sunt în `recenzii/`; așteaptă aprobarea proprietarului.
- Strategia 5 (Google): paginile produselor epuizate (alternative + „anunță-mă când revine”); E12 – citirea setărilor Simprosys (Tracking Tags, GTIN, Campaigns) cu fereastra Brave în față; cele 45 de produse „găsite de Google”, netrimise; costul de retur în Merchant Center (decizia lui).
- Condiții generale: produsele care vindeau mult să nu rămână la 0 în stoc; oprirea campaniei Meta cu 0 comenzi în 13 luni (decizia lui).
- Welcome: seria completă de 4 e-mailuri + confirmare (SYSTEM.md §4.1); azi există 2 e-mailuri, refăcute în designul nou.
- Șablonul newsletterului automat (`email-marketing/newsletter-automat/`) trebuie mutat pe designul comun.
- Windsor.ai pentru datele de reclame (în așteptare din 19.10).
- Blog: verificarea calității pe ~30.10.
- Ștergerea manuală (de către el) a rutinelor vechi și a ciornelor vechi D3+K2.

## 4. Date utile
- Magazin: primesupplements.ro (Shopify `primesupplements1.myshopify.com`), PRIME SPORT SUPPLEMENTS SRL, CUI 46260823, J32/1155/2022, Str. Ioan Virgil Ispas nr. 17A, 555300 Cisnădie, jud. Sibiu, 0775 286 584, contact@primesupplements.ro.
- Repo: GitHub Marius-Chera/Prime-supplements, branch `claude/install-claude-seo-ttv3h6`; local: `D:\Proiecte Claude\Prime Supplements\Prime-supplements`.
- Rutine (cloud): mediul „Prime supplements” `env_01NYnUa9sog51igwQRnKoLZr`; lista e în claude.ai/code/routines.
- theMarketer: fluxuri active – Welcome series 2, Cart abandonment 2026, Reaprovizionare 2026 (`6adaf39ea7f42fa8c7051086`).
- Google Merchant Center: cont 5540809866, feed Simprosys (raport: `google/MERCHANT-CENTER-2026-10-23.md`).
- Fotografii: `D:\Prime Supplements` (ședințe Evo Gym, Ana Savici, Mihai Diaconu, Constanța).
- Teme: tema activă „Prime – tema activă (22.10)” ID 193996554615.

### Adăugat 23.10 (după auditul de căutări)
- **23.10 – căutări:** auditul `seo/AUDIT-CAUTARI-2026-10-23.md`. Bing Webmaster Tools a fost configurat pe contul Google **contact@primesupplements.ro**, care deține Search Console (nu primesupplementsro@gmail.com).
- **23.10 – ghiduri de categorie:** proprietarul a cerut ghiduri conforme „peste tot”, ca să urcăm în căutări ca și concurenții. Am scris ghiduri pentru 17 categorii, iar proprietarul a publicat tema „Prime – PROBĂ ghiduri categorie (23.10)”, care e acum tema activă.
