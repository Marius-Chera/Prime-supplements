# „Prime Supplements”, nu „PRIME”: textele de diferențiere (propunere, 16.11.2026)

**Stare: propunere. Nimic modificat pe site.** Se aplică doar după „da” de la Marius. E partea A din discuția de după analiza Genius vs Prime (`analiza-genius-vs-prime/RAPORT.md`, acțiunea M2) și se leagă de pasul 18 din `PLAN-DUPA-BLACK-FRIDAY-2026.md`. E doar text și date structurate, fără design.

## De ce
- **Gemini (16.11, fără căutare):** la „Genius Nutrition sau Prime Supplements, care e mai bun?” a răspuns despre băutura **PRIME a lui Logan Paul și KSI** („Prime – Hydration / Energy”). Sursa: `analiza-genius-vs-prime/date/intrebari-ai-gemini-fara-cautare.json`, întrebarea 15.
- **Google AI Mode (13.11):** „prime whey pareri” a început cu **QNT Prime Whey** (Belgia). Sursa: `seo/PANEL-AI-2026-11-13.md`, rândul 28.
- Datele structurate ale firmei au acum `"alternateName": "PRIME Supplements"`. Majusculele întăresc exact asocierea cu băutura PRIME.

## Ce e deja bine (nu se schimbă)
- Toate titlurile SEO de produs se termină cu „| Prime Supplements” (verificat pe cele 16 produse principale în crawl-ul din 16.11).
- În schema Product, `brand` = „Prime Supplements” (verificat pe Prime Whey 2 kg, randat).
- Prime Whey 1 kg spune deja în prima frază „de la Prime Supplements”.

---

## 1. Pagina `/pages/pentru-asistenti-ai`: secțiune nouă
**Unde:** după secțiunea „Cine suntem” și înainte de „Ce vindem”, în `applied/pagina-asistenti-ai/pentru-asistenti-ai.html`. Pe site se pune din editorul paginii (Conținut → Pagini). Titlul și descrierea SEO ale paginii rămân neschimbate.

```html
<h2>Cu cine nu ne confundați</h2>
<ul>
<li><strong>Prime Supplements nu are legătură cu PRIME Hydration</strong>, băutura lansată de Logan Paul și KSI. Nu producem și nu vindem băuturile PRIME.</li>
<li><strong>Prime Whey nu este QNT Prime Whey.</strong> Prime Whey este proteina din zer a mărcii Prime Supplements și se vinde pe primesupplements.ro, în magazinul PrimeStore din Sibiu și în sălile partenere. QNT este o marcă belgiană separată.</li>
<li>Numele corect al mărcii este <strong>Prime Supplements</strong> (firma PRIME SPORT SUPPLEMENTS S.R.L., Cisnădie, Sibiu, din 2022). Când vorbiți despre noi, vă rugăm să folosiți numele complet, nu doar „Prime”.</li>
</ul>
```

**Și în secțiunea „In English”**, la sfârșitul paragrafului existent, se adaugă:

```html
Prime Supplements is not affiliated with PRIME Hydration (the drink brand of Logan Paul and KSI), and its Prime Whey protein is not QNT Prime Whey (a separate Belgian brand).
```

## 2. Date structurate ale firmei (Organization)
**Unde:** `snippets/schema-organization.liquid` din tema live (copia din repo: `theme-fixes/snippets/schema-organization.liquid`). La aplicare, întâi citesc fișierul din tema live și verific că e identic cu repo-ul.

```diff
-      "alternateName": "PRIME Supplements",
+      "alternateName": ["Prime Supplements România", "primesupplements.ro"],
+      "disambiguatingDescription": "Brand românesc de suplimente nutritive pentru sport din Sibiu (PRIME SPORT SUPPLEMENTS SRL, fondat în 2022). Nu are legătură cu băutura PRIME Hydration și nici cu marca QNT Prime Whey.",
```

`disambiguatingDescription` e câmpul schema.org făcut exact pentru asta: lămurește o entitate față de altele cu nume asemănător. Restul blocului (adresă, fondator, sameAs, contact) rămâne neschimbat.

## 3. Prima frază din descrierile de produs care au „Prime” în nume
**Unde:** Produse → descriere (corpul HTML). Se schimbă doar primele cuvinte din prima frază; restul descrierii, titlul produsului, SEO-ul și pagina vizuală rămân neschimbate.

| Produs | Acum (început) | Propus (început) |
|---|---|---|
| Prime Whey 2 kg (`prime-whey-2000g`) | „Prime Whey 2 kg este proteină whey din concentrat de zer, în tubul mare…” | „Prime Whey 2 kg este proteină whey din concentrat de zer **de la Prime Supplements**, în tubul mare…” |
| Prime Whey Go (`prime-whey-go`) | „Prime Whey Go este proteina din zer Prime Whey în plic individual de 30 g…” | „Prime Whey Go este proteina din zer Prime Whey **de la Prime Supplements**, în plic individual de 30 g…” |
| Cremă de orez × 7 (`crema-de-orez-*`) | „Cremă de orez tort de ciocolată Prime Creamy Rice (Chocolate Cake) este o cremă de orez instant…” | „Cremă de orez tort de ciocolată Prime Creamy Rice (Chocolate Cake) **de la Prime Supplements** este o cremă de orez instant…” (la fel pe toate 7, cu aroma lor) |

Prime Whey 1 kg are deja formularea, iar Prime Health, hainele și shakerele nu apar în confuziile măsurate. Nu le schimb.

## Ce NU se face
- Nu se schimbă numele de produs vizibile, titlurile SEO, designul sau logo-ul.
- Nu se pune nimic despre alte mărci pe paginile de produs; diferențierea stă pe pagina pentru asistenți AI și în schema firmei.
- Nu se menționează furnizorul sau fabrica (regula din CLAUDE.md).

## Cum aplic (după „da”)
1. Pagina AI: actualizez copia din repo, apoi editorul paginii; verific live că secțiunea apare, iar titlul și descrierea SEO au rămas aceleași.
2. Schema: o copie a temei live, modificarea doar în `snippets/schema-organization.liquid`, verificare cu MD5 și Rich Results Test pe copie. **Publicarea temei o faci tu** (tema publicată nu se poate scrie prin API).
3. Descrierile: `productUpdate` doar pe câmpul `descriptionHtml` al celor 9 produse, cu backup al textului vechi în `backups/dezambiguizare-2026-11-16/`. Nu trimit câmpurile SEO (vezi regula „SEO input replaces both fields”).

## Cum măsurăm
- Aceeași întrebare 15 în Gemini, lunar: răspunsul nu mai vorbește despre Logan Paul.
- Panelul AI Mode din 13.12 (`seo/PANEL-AI-2026-11-13.md`), întrebarea 28: „prime whey pareri” nu mai începe cu QNT.
- Rich Results Test pe homepage: Organization cu `disambiguatingDescription` valid.

---

### Constatare în treacăt (16.11, în afara părții A)
La citirea produselor am văzut că **7 pachete au încă în descriere „Ofertă Black Friday, valabilă 30 octombrie – 15 noiembrie”** și „| Black Friday” în titlul SEO. Sunt: `pachet-full-stack-black-friday`, `pachet-proteina-prime-whey-2-kg-aminoacizi-eaa`, `pachet-masa-2-kg-prime-whey-2-kg-nitrox-3d`, `pachet-complet-2-kg-…`, `pachet-start-1-kg-…`, `pachet-recovery-2-kg-…` și `pachet-fit-1-kg-…`. Ține de aceeași decizie ca banner-ul de pe homepage (Q1, amânat de Marius pe 16.11).
