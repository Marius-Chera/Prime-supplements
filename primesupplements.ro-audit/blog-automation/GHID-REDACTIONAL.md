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
- **Imagine principală:** o fotografie nouă generată cu AI, după secțiunea 4b (produsul Prime real într-o scenă frumoasă, potrivită subiectului), cu text alternativ descriptiv în română. Doar dacă generarea nu reușește, se folosește imaginea principală a produsului (`featuredImage.url`).
- **Linkuri interne (obligatoriu, toate verificate prin Admin API că există și sunt publicate):**
  - pagina produsului principal: de 2–3 ori, inclusiv în caseta de produs; ancore descriptive, nu „click aici”;
  - pagina colecției din calendar: o dată;
  - 2–3 articole existente, relevante, din blog (în text și în „Articole similare”);
  - pagina autorului `/pages/autor-marius-chera` (în caseta de autor).
  Nu inventa adrese. Linkurile relative încep cu `/products/`, `/collections/`, `/blogs/news/`.

## 4b. Imaginea principală generată cu AI

Fiecare articol nou are ca imagine principală o fotografie generată cu AI în care apare **produsul Prime real**, într-o scenă frumoasă și potrivită subiectului. Pozele din casetele de produs rămân pozele oficiale ale produsului.

**Cum se face (procesul folosit și verificat la articolul de test):**

1. Cheia Google Gemini este în variabila de mediu `GEMINI_API_KEY` (proiect cu facturare activă; pe planul gratuit modelele de imagine au limita 0). Dacă lipsește sau Google răspunde 429, folosește imaginea produsului și scrie motivul în raport.
2. **Referința:** poza oficială a produsului principal la rezoluție mare (`featuredImage.url` + `&width=2048`). Deschide-o (Read) și **transcrie textul principal de pe etichetă** (nume, subtitlul de sub logo, gramaj și porții, mențiunile, aroma), ca să-l pui literă cu literă în prompt.
3. **Generează 3 variante în paralel** (scene diferite din tabelul de mai jos), cu scriptul `gen_image.py` de mai jos. Modelul ales automat este cel mai bun disponibil (acum `gemini-3-pro-image`, ~0,134 USD pe imagine la 2K); `GEMINI_IMAGE_MODEL` îl poate fixa.
4. **Verificarea vizuală e obligatorie și se face la zoom:** deschide fiecare variantă micșorată (≈1400 px) și apoi decupaje ale etichetei la rezoluție completă (Pillow, mărite de 3–5 ori). Respinge varianta dacă: orice text mare sau mediu de pe etichetă diferă de referință (litere stricate, cuvinte inventate, cifre greșite); produsul apare de două ori sau deformat; apare text, preț, număr, alt brand sau watermark adăugat; mâinile sau obiectele arată nenatural; scena arată artificial.
5. **Corectare:** dacă cea mai bună variantă are greșeli doar în text, fă **o singură** editare cu `--ref <imaginea aleasă> --ref <referința 2048>` și un prompt care cere să schimbe doar textul etichetei (restul identic), la aceeași rezoluție 2K. Nu repeta editarea și nu urca la 4K: editările repetate strică textul care era corect. Dacă rămâne greșit doar textul foarte mic (sub ~12 px înălțime în imaginea 2K, de exemplu subtitlul de sub logo), poți copia literele reale din poza oficială peste el cu Pillow (scalate, înclinate ca textul vecin, fundalul vechi curățat) și verifici la zoom 5x că nu se vede retușul. Dacă nu iese natural, alege altă variantă; după 2 runde fără rezultat bun, folosește imaginea produsului și spune în raport.
6. **Optimizare:** salvează varianta finală ca JPEG de 2400 px lățime, calitate 86 (Pillow), cu nume ASCII `blog-<handle>.jpg`.
7. **Urcare în Shopify:** `stagedUploadsCreate` (resource `IMAGE`, `httpMethod: PUT`, `mimeType: image/jpeg`, filename-ul de mai sus), `curl -X PUT -T fișier -H "Content-Type: image/jpeg" "<url>"` (fără antetul x-goog-acl), apoi `fileCreate` cu `originalSource` = `resourceUrl`, `contentType: IMAGE` și textul alternativ. Așteaptă `fileStatus: READY` și folosește `image.url` al fișierului ca imagine a articolului.
8. **Text alternativ** (română, 8–16 cuvinte): ce se vede + produsul + legătura cu subiectul, de exemplu „Prime Whey lângă un shake proteic și o masă cu pui, orez și legume”.

**Prompt (în engleză, modelele de imagine îl înțeleg mai bine):**

```text
Use the attached product photo as the exact reference for the product. Create a photorealistic editorial lifestyle photograph (16:9) for a sports-nutrition blog article about: <TOPIC IN ENGLISH>.
Scene: <SCENE>.
The <PRODUCT NAME> container from the reference appears exactly once, upright, in sharp focus, about one third of the frame, slightly off-centre; keep its shape, colours, logo and label exactly as in the reference (do not redraw, translate or invent label text).
The label text must read exactly as on the reference, letter for letter: <LABEL TEXT TRANSCRIBED FROM THE REFERENCE, e.g. "PRIME" logo with the subtitle "HARDCORE SPORTS NUTRITION"; big "PRIME" in red and "WHEY" in white; vertical text "2000g / 66 SERVINGS"; bullets "..."; flavour "...">. Do not invent, misspell or blur any of these words.
Look: premium fitness magazine photo, soft natural light, warm tones, shallow depth of field, clean uncluttered background, subtle red accents that match the brand.
Do not add any text, captions, numbers, prices, watermarks, other brands or logos. No medical settings, no pills spilling, no before/after bodies. If a person appears, show only natural-looking hands or a figure from behind, out of focus.
```

Prompt pentru editarea de corectare (pasul 5):

```text
The first image is a finished photograph. The second image is the exact reference of the product. Edit only the product label in the first image so that all of its printed text and graphics match the reference exactly; keep everything else in the first image identical (composition, lighting, objects, colours, camera angle, size and position of the product). <SAME LABEL TEXT AS ABOVE> Return the full edited photograph at the same framing (16:9).
```

**Scene potrivite (alege și variază, nu repeta aceeași scenă la articole apropiate; scena trebuie să aibă legătură cu subiectul articolului):**

| Linie de produs | Scene |
|---|---|
| Proteine, cremă de orez, gainer | blat de bucătărie cu pahar de shake, lingură-dozator cu pudră, farfurie echilibrată (pui, orez, legume) și un caiet; shaker, ovăz, banane; masă după antrenament |
| Creatină, pre-workout, EAA, BCAA, glutamină | bancă de sală cu gantere și sticlă de apă; sală luminoasă dimineața; prosop și shaker după antrenament |
| Vitamine, minerale, omega-3 | masă de mic dejun luminoasă cu fructe și un pahar cu apă; birou acasă, dimineață |
| Magneziu, somn, relaxare | noptieră cu lumină caldă de seară, carte, pahar cu apă |
| Colagen, articulații | pantofi de alergare, saltea de yoga, parc dimineața |
| Crom, L-carnitină, controlul greutății | caserole cu mâncare gătită (meal prep), farfurie echilibrată, bandă de alergare în fundal |

**Scriptul** (salvează-l ca `gen_image.py`; exemple: `python3 gen_image.py --ref "<url referință>&width=2048" --prompt prompt.txt --out varianta1` pentru generare, `python3 gen_image.py --ref varianta1.jpg --ref referinta.jpg --prompt fix.txt --out varianta1_fix` pentru corectare; extensia fișierului rezultat se pune automat după tipul imaginii):

```python
import argparse, base64, json, mimetypes, os, sys, urllib.request, urllib.error
ap = argparse.ArgumentParser()
ap.add_argument("--ref", action="append", required=True, help="reference image: URL or local file (repeatable)")
ap.add_argument("--prompt", required=True, help="text file with the prompt")
ap.add_argument("--out", required=True, help="output path without extension")
ap.add_argument("--aspect", default="16:9")
ap.add_argument("--size", default="2K")
a = ap.parse_args()
key = os.environ.get("GEMINI_API_KEY") or sys.exit("NO_KEY")
API = "https://generativelanguage.googleapis.com/v1beta"
def call(path, body=None):
    req = urllib.request.Request(API + path, data=json.dumps(body).encode() if body else None,
                                 headers={"x-goog-api-key": key, "Content-Type": "application/json"})
    return json.load(urllib.request.urlopen(req, timeout=300))
model = os.environ.get("GEMINI_IMAGE_MODEL")
if not model:
    names, tok = [], ""
    while True:
        r = call("/models?pageSize=1000" + ("&pageToken=" + tok if tok else ""))
        names += [m["name"] for m in r.get("models", [])
                  if "image" in m["name"] and "generateContent" in m.get("supportedGenerationMethods", [])]
        tok = r.get("nextPageToken")
        if not tok: break
    names.sort(key=lambda n: ("pro" in n, "preview" not in n, n), reverse=True)
    model = names[0] if names else sys.exit("NO_IMAGE_MODEL")
parts = [{"text": open(a.prompt, encoding="utf-8").read()}]
for ref in a.ref:
    if ref.startswith("http"):
        r = urllib.request.urlopen(ref, timeout=60); mime = r.headers.get_content_type(); data = r.read()
    else:
        mime = mimetypes.guess_type(ref)[0] or "image/jpeg"; data = open(ref, "rb").read()
    parts.append({"inline_data": {"mime_type": mime, "data": base64.b64encode(data).decode()}})
err = ""
for cfg in ({"aspectRatio": a.aspect, "imageSize": a.size}, {"aspectRatio": a.aspect}, None):
    gen = {"responseModalities": ["TEXT", "IMAGE"]}
    if cfg: gen["imageConfig"] = cfg
    try:
        r = call("/" + model + ":generateContent", {"contents": [{"parts": parts}], "generationConfig": gen}); break
    except urllib.error.HTTPError as e:
        err = e.read().decode()[:500]
        if e.code != 400: sys.exit(f"HTTP {e.code}: {err}")
else:
    sys.exit("REJECTED: " + err)
for part in r["candidates"][0]["content"]["parts"]:
    if "inlineData" in part:
        mime = part["inlineData"]["mimeType"]; out = a.out + (mimetypes.guess_extension(mime) or ".img").replace(".jpe", ".jpg")
        if out.endswith(".jpeg"): out = out[:-5] + ".jpg"
        open(out, "wb").write(base64.b64decode(part["inlineData"]["data"]))
        print(model, mime, out, os.path.getsize(out)); break
else:
    sys.exit("NO_IMAGE: " + json.dumps(r)[:500])
```

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
4. După creare: citește articolul înapoi și confirmă `isPublished: true`, `publishedAt` = ora programată, imaginea (cea generată cu AI, verificată vizual), metafield-urile SEO și etichetele.
