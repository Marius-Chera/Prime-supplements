# Ghid redacțional pentru articolele automate (blogul „Ghiduri despre suplimente”)

Acest ghid îl urmează automatizarea zilnică (Routine-ul „Blog Prime Supplements 2 articole pe zi”) și oricine scrie pe blog. Scopul: articole educative, utile, care răspund la o întrebare reală căutată pe Google, care trimit spre produsele magazinului fără să fie reclame și care respectă regulile UE pentru suplimente.

## 1. Date fixe

- Blog: `news` (id `gid://shopify/Blog/116352287095`), adrese `https://primesupplements.ro/blogs/news/<handle>`.
- Autor: **Marius Chera** (câmpul author al articolului) și caseta de autor de la secțiunea 5.
- Limba: română, cu diacritice corecte (ș, ț cu virgulă dedesubt, nu ş/ţ cu sedilă).
- Programare: două articole pe zi, la **09:00** și **18:00** (ora României), cu `isPublished: true` și `publishDate` în viitor; Shopify le face vizibile singur la ora respectivă.

## 2. Alegerea subiectului (anti-canibalizare)

1. Subiectul vine din `calendar-luna-1.json` (144 de rânduri, 14 octombrie – 24 decembrie 2026: data, ora, handle, titlu, cuvânt-cheie, produse, colecție, etichete, `tip`: `principal` sau `acoperire`).
2. **Cele 15 produse principale (alese de proprietar):** Prime Whey (2 kg, 1 kg, Go), Cremă de orez Prime Creamy Rice, Creatină Creapure, Creatină monohidrat 300 g, Magneziu bisglicinat, Pure Isolate, EAA, Omega-3, Cluster Insulin Bomb, Vitamina C 1000, Vitamina D3+K2, Batoane proteice, L-glutamină Recovery Glutamin, Picolinat de crom, NAC. **Acoperire:** în primele 3 luni, fiecare supliment activ de pe site are cel puțin un articol (rândurile `acoperire` din calendar). Nu se scrie despre haine sau accesorii. Un produs care nu e `ACTIVE` (de exemplu Liver Protect, acum nelistat) se sare.
3. După ce calendarul se termină, automatizarea alege singură: unul dintre cele 15 produse principale (cel cu cele mai puține articole noi în ultimele 30 de zile) și un unghi încă nefolosit pentru el.
4. Înainte de scriere, verifică articolele existente (titluri, handle-uri, etichete `intent:`). Dacă o temă cu aceeași intenție de căutare există deja, schimbă unghiul (alt public, altă întrebare, altă combinație) sau sari peste și notează motivul. Nu scrie niciodată a doua oară același răspuns la aceeași întrebare.
5. Unghiuri permise: ce este / beneficii (doar mențiuni autorizate), când și cum se ia, doza, pentru cine (femei, vegetarieni, sportivi de anduranță, peste 40 de ani), combinații, comparații, cum alegi / cum citești eticheta, rețete, semne și cauze, mituri, ghid de produs.

## 2b. Ca să ajungă sus în Google și să fie citat de motoarele AI

- **Intenția de căutare pe primul loc:** prima secțiune răspunde exact la întrebarea din titlu; nu amâna răspunsul.
- **Definiție clară** în primele 100 de cuvinte („X este…”), cu cuvântul-cheie principal. Cuvântul-cheie apare și într-un H2, în title tag și în meta description, natural, fără repetări forțate.
- **Pasaje citabile:** fiecare H2 începe cu 1–2 propoziții care se pot cita singure (răspuns complet, fără „după cum am spus”). Paragrafe de maximum 3 propoziții, liste și un tabel atunci când compari sau dai doze.
- **Cifre concrete, doar din surse sigure:** doza de pe eticheta produsului, valorile de referință oficiale (EFSA), gramaje. Fără cifre inventate.
- **Întrebări frecvente** formulate exact cum caută oamenii („Se poate lua X seara?”, „Cât X pe zi?”), cu răspunsuri directe în primele cuvinte.
- **E-E-A-T:** autorul Marius Chera (antrenor de culturism, fondatorul Prime Supplements), sfaturi practice de antrenor la persoana întâi plural („recomandăm”, „la sportivii cu care lucrăm vedem des…”), formulate general, fără povești sau cazuri inventate, cu limitele clar spuse („discută cu medicul dacă…”).
- **Entități clare:** numele complet al produsului și al ingredientului (de exemplu „L-glutamină Kyowa®”, „creatină monohidrat Creapure®”), forma (capsule, pudră), gramajul.

## 2c. Ca să convingă la comandă (fără să devină reclamă)

- Caseta produsului apare de două ori: după secțiunea care răspunde la întrebare și la final, înainte de întrebările frecvente. Butonul are textul „Vezi produsul” sau „Comandă <nume scurt>”.
- O secțiune practică „Cum folosești <produs>”: doza și modul de administrare de pe eticheta produsului, momentul din zi, cu ce se combină, cât ține un ambalaj (calculat din gramaj și porție, fără preț).
- Răspunde la obiecțiile reale: gust, cum se dizolvă, efecte normale la început, cui nu i se potrivește.
- **Dovadă socială doar reală:** dacă produsul are recenzii Judge.me (metafield-urile `reviews.rating` și `reviews.rating_count`, citite prin Admin API), poți scrie „nota X din 5, din Y recenzii”. Altfel nu pomeni recenzii.
- Fapte de magazin care ajută la decizie: livrare gratuită la comenzi peste 300 de lei; produs al brandului Prime Supplements. Fără prețuri, fără reduceri inventate, fără urgență falsă („doar azi”).
- Un link spre un produs complementar, dacă e firesc (de exemplu proteină și cremă de orez, magneziu și vitamina D3+K2).

## 3. Reguli de conținut (obligatorii)

- **Fapte despre produs doar din pagina produsului** (titlu, descriere, ingrediente, doză recomandată, gramaj), citite prin Admin API înainte de scriere. Nu inventa ingrediente, doze, certificări, prețuri sau stocuri. Nu scrie prețuri.
- **Mențiuni de sănătate: doar cele autorizate de UE (Regulamentul 1924/2006 și Reg. 432/2012), la nutrientul care le are, formulate cu „contribuie la”.** Exemple: proteinele contribuie la creșterea și la menținerea masei musculare; magneziul contribuie la reducerea oboselii și extenuării și la funcționarea normală a mușchilor; vitamina C contribuie la funcționarea normală a sistemului imunitar și la formarea normală de colagen pentru funcționarea normală a pielii; vitamina C crește absorbția fierului; vitamina D contribuie la menținerea funcției musculare normale și a oaselor normale; EPA și DHA contribuie la funcționarea normală a inimii (aport zilnic de 250 mg); creatina crește performanța fizică în exerciții succesive, scurte, de intensitate mare (3 g pe zi); soluțiile carbohidrați-electroliți contribuie la menținerea performanței de anduranță în efortul prelungit. Pentru coenzima Q10 și extractele din plante (Liver Protect) **nu există mențiuni autorizate**: descrie ce sunt, cum se iau și ce cercetează studiile, fără promisiuni de efect.
- Interzise: „vindecă”, „tratează”, „previne boala”, „detoxifică”, „arde grăsimea”, „garantat”, procente de rezultat inventate, mărturii inventate. Nu da sfaturi medicale; pentru afecțiuni, sarcină, alăptare sau medicamente: „discută cu medicul”.
- **Studii:** citează doar ce știi sigur și formulează prudent („studiile arată că…”, „o meta-analiză din 2021 a găsit…”). Nu inventa titluri, autori, cifre sau linkuri. Fără linkuri externe, în afara surselor oficiale (EFSA, OMS), și doar dacă ești sigur că adresa există.
- **Lungime:** 1.200–1.800 de cuvinte de conținut util, fără umplutură; propoziții scurte; un răspuns direct de 40–60 de cuvinte la începutul articolului (bun pentru Google și pentru AI Overviews).
- **Structură:** fără H1 în corp (titlul articolului e H1); H2 pentru secțiuni (5–7), H3 pentru subsecțiuni; o listă sau un tabel unde ajută; secțiunea „Întrebări frecvente” cu 4–6 întrebări reale (H3 + răspuns de 2–4 propoziții).

## 4. SEO

- **Titlu:** cuvântul-cheie principal la început, maxim 65 de caractere. **Title tag** (metafield `global.title_tag`, tip `single_line_text_field`): maxim 60 de caractere. **Meta description** (metafield `global.description_tag`, tip `single_line_text_field`): 140–155 de caractere, cu cuvântul-cheie și un beneficiu concret, fără ghilimele duble.
- **Handle:** cel din calendar (ASCII, fără diacritice, cratime, maxim 60 de caractere). Dacă există deja, adaugă un cuvânt distinctiv, nu un număr.
- **Rezumat (summary):** 1–2 propoziții care răspund direct la întrebare (fără HTML complicat).
- **Etichete:** exact cele din calendar: categoria, `hub:<colecție>` (dacă există) și `intent:<tip>:<subiect>`.
- **Imagine principală:** imaginea principală a produsului principal (URL-ul `featuredImage.url` al produsului), cu text alternativ descriptiv în română, de forma „<produs> – <subiectul articolului>”.
- **Linkuri interne (obligatoriu, toate verificate prin Admin API că există și sunt publicate):**
  - pagina produsului principal: de 2–3 ori, inclusiv în caseta de produs; ancore descriptive, nu „click aici”;
  - pagina colecției din calendar: o dată;
  - 2–3 articole existente, relevante, din blog (în text și în „Articole similare”);
  - pagina autorului `/pages/autor-marius-chera` (în caseta de autor).
  Nu inventa adrese. Linkurile relative încep cu `/products/`, `/collections/`, `/blogs/news/`.

## 5. Șablon HTML (culori accesibile, aceeași familie vizuală ca articolele existente)

Fără `<h1>`, fără `<script>`, fără JSON-LD (tema generează schema Article). Toate imaginile cu `alt` și `loading="lazy"`.

```html
<div style="background: #ea8a8a15; border-left: 4px solid #ea8a8a; padding: 16px 20px; margin-bottom: 24px; border-radius: 4px;">
  <p style="margin: 0 0 12px 0; font-weight: 600; color: #a54f51;">Pe scurt</p>
  <ul style="margin: 0; padding-left: 20px; color: #334155;">
    <li style="margin-bottom: 8px;">3–4 idei principale, fiecare o propoziție.</li>
  </ul>
</div>

<p>Răspunsul direct la întrebare, 40–60 de cuvinte.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#sectiunea-1">Titlul secțiunii 1</a></li>
</ul>

<h2 id="sectiunea-1">Titlul secțiunii 1</h2>
<p>…</p>

<!-- Caseta de produs, o dată după primele două secțiuni -->
<div style="margin: 30px 0; padding: 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
  <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
    <a href="/products/HANDLE" style="flex-shrink: 0;"><img src="URL_IMAGINE_PRODUS&width=240" alt="TITLU PRODUS" loading="lazy" width="120" height="120" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px;"></a>
    <div style="flex: 1; min-width: 200px;">
      <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1e293b;">TITLU PRODUS</p>
      <p style="margin: 0 0 12px 0; color: #334155;">O propoziție despre ce este produsul (fapte din pagina produsului).</p>
      <a href="/products/HANDLE" style="display: inline-block; background: #b65b5d; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Vezi produsul →</a>
    </div>
  </div>
</div>

<!-- Tabel, unde ajută -->
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead><tr style="background-color: #b65b5d; color: #ffffff;"><th style="padding: 12px; text-align: left; border: 1px solid #ddd;">…</th></tr></thead>
  <tbody><tr><td style="padding: 10px; border: 1px solid #ddd;">…</td></tr></tbody>
</table>

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Întrebarea 1?</h3>
<p>Răspuns de 2–4 propoziții.</p>

<p>Mai multe produse găsești în colecția <a href="/collections/COLECTIE">NUME COLECȚIE</a>.</p>
<p><em>Informațiile din acest articol au caracter general și nu înlocuiesc sfatul medicului sau al unui specialist în nutriție. Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată. Consultați medicul înainte de a începe un supliment, mai ales în caz de sarcină, alăptare, afecțiuni sau tratament medicamentos.</em></p>

<div class="author author-box" style="margin-top: 40px; padding: 24px; background: #f8f9fa; border-radius: 8px; display: flex; gap: 20px; align-items: flex-start;" itemprop="author" itemscope itemtype="https://schema.org/Person">
  <img src="https://cdn.shopify.com/s/files/1/0917/5138/3415/files/author-photo-primesupplements1-myshopify-com.jpg?v=1773308575&amp;width=160" alt="Marius Chera, antrenor de culturism" loading="lazy" itemprop="image" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
  <div style="flex: 1;">
    <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1a1a1a;"><a href="/pages/autor-marius-chera" itemprop="url" style="color: #1a1a1a; text-decoration: none;"><span itemprop="name">Marius Chera</span></a></p>
    <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;" itemprop="description">Marius Chera – antrenor de culturism, fondatorul Prime Supplements (2022). Lector la cursurile de instructori din cadrul FRCF, a pregătit sportivi care au obținut carduri PRO și titluri europene și mondiale IFBB. Specializat în online coaching, îmbină experiența din competiții cu știința nutriției sportive.</p>
  </div>
</div>

<div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid #e2e8f0;">
  <h3 style="margin: 0 0 24px 0; font-size: 1.5rem; font-weight: 600; color: #a54f51;">Articole Similare</h3>
  <div class="related-posts-grid" style="display: flex; flex-wrap: wrap; gap: 24px;">
    <a href="/blogs/news/HANDLE_ARTICOL" class="related-post-card" style="text-decoration: none; color: inherit; display: block; flex: 1 1 calc(50% - 12px); min-width: 280px;">
      <div style="background: white; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); overflow: hidden; height: 100%;">
        <img src="URL_IMAGINE_ARTICOL&width=800" alt="TITLU ARTICOL" loading="lazy" style="width: 100%; height: 180px; object-fit: cover;">
        <div style="padding: 20px;">
          <h4 style="margin: 0 0 10px 0; font-size: 1.1rem; font-weight: 600; color: #1e293b; line-height: 1.4;">TITLU ARTICOL</h4>
          <p style="margin: 0; font-size: 0.9rem; color: #5f6e85; line-height: 1.6;">Rezumatul articolului, maxim 120 de caractere.</p>
        </div>
      </div>
    </a>
  </div>
</div>
```

Culorile: text de accent `#a54f51`, fundaluri cu text alb `#b65b5d`, nuanța deschisă `#ea8a8a15` doar ca fundal decorativ. Toate trec contrastul WCAG AA. Imaginea articolelor din „Articole similare” este imaginea principală a acelor articole (câmpul `image.url`), verificată că există.

## 6. Verificare înainte de publicare (automatizarea o face la fiecare articol)

1. Toate linkurile interne există (produs ACTIVE, colecție, articole publicate, prin Admin API).
2. Fără H1 în corp, fără `<script>`, fără linkuri inventate, fără prețuri, fără mențiuni de sănătate neautorizate (caută cuvintele interzise de la secțiunea 3).
3. Title tag ≤ 60 de caractere, meta description 140–155, handle unic, etichetele din calendar.
4. După creare: citește articolul înapoi și confirmă `isPublished: true`, `publishedAt` = ora programată, imaginea, metafield-urile SEO și etichetele.
