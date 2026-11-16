---
name: search
description: Verifică lunar cum vede AI-ul Google (AI Mode / AI Overviews) magazinul primesupplements.ro – panelul de 29 de întrebări (GEO-18), verificări tehnice GEO în paralel, comparație cu luna trecută și lista de remedieri legată de planul SEO. Folosește când Marius scrie /search, /search primesupplements.ro, „cum ne vede AI-ul”, „panel AI”, „suntem în răspunsurile Google AI”.
argument-hint: "[domeniu, implicit primesupplements.ro]"
---

# /search – cum ne vede AI-ul Google

Răspunsurile sunt în română. Lucrezi în repo-ul `Prime-supplements/` (branch `claude/install-claude-seo-ttv3h6`), folderul `primesupplements.ro-audit/`.

Argument: `$ARGUMENTS` (implicit `primesupplements.ro`). Dacă e alt domeniu (de ex. Chera Coaching), NU folosi întrebările și fișierele Prime: fă 15–20 de întrebări potrivite acelui business, confirmă-le cu Marius și salvează separat (Chera stă în `Prime-supplements/chera-coaching/`, nu se amestecă cu Prime).

## 0. Context înainte de orice (obligatoriu)
1. Cel mai recent `seo/PANEL-AI-*.md` = baza de comparație.
2. `seo/PLAN-DUPA-BLACK-FRIDAY-2026.md` (cei 20 de pași), `findings/geo.md`, punctele GEO din `DE-FACUT.md`.
3. `intrebari.md` din folderul acestui skill = întrebările fixe + faptele confirmate despre marcă.
Spune-i pe scurt lui Marius ce a ieșit data trecută și ce s-a făcut de atunci (din `JURNAL.md`).

## 1. Panelul AI (browserul aplicației, secvențial)
- Arată-i panoul browserului (`show_pane` preview) – Marius vrea să vadă live.
- Pentru fiecare întrebare din `intrebari.md`:
  `https://www.google.com/search?q=<întrebarea, spații cu +>&udm=50&hl=ro&gl=ro`
  apoi citește cu `javascript_tool`:
  ```js
  await new Promise(r=>setTimeout(r,8000));
  const m=document.querySelector('[data-container-id="main-col"]')||document.querySelector('main')||document.body;
  const t=m.innerText;
  const hosts=[...new Set([...document.querySelectorAll('a[href^="http"]')]
    .map(a=>{try{return new URL(a.href).hostname.replace(/^www\./,'')}catch(e){return ''}})
    .filter(h=>h&&!/google\./.test(h)))];
  ({prime:/prime ?supplements|primesupplements|primestore/i.test(t), text:t.slice(0,3000), hosts})
  ```
  Dacă textul e gol sau scurt (<200 caractere), mai așteaptă 5 s și citește din nou; dacă apare CAPTCHA, oprește-te și spune-i lui Marius (nu îl rezolvi tu).
- Clasificare per întrebare (aceeași ca în 13.11):
  - **recomandat** = Prime/PrimeStore/un produs Prime e numit în răspuns ca opțiune (notează locul și produsul);
  - **sursă** = primesupplements.ro e printre linkuri, dar nu suntem numiți;
  - **–** = absent. Notează cine apare în loc (primele 5–8 nume/domenii).
- La întrebările de marcă (26–29): compară cu „Fapte confirmate” din `intrebari.md`; marchează orice afirmație greșită sau nouă.
- Limite de scris în raport: browserul e logat cu contul Google al firmei (rezultate posibil favorabile); AI Mode variază zilnic – contează tendința pe 2–3 luni. Nu folosi aplicația Gemini (cont personal).

## 2. Verificări tehnice GEO (în paralel, cât rulează panelul)
Pornește 3 subagenți (Agent, `general-purpose`) cu sarcini scurte, doar citire, fiecare cu rezultat în 10–15 rânduri:
1. **Acces roboți AI:** `robots.txt`; `curl -A` pe homepage și pe `/products/creatina-creapure` cu `OAI-SearchBot/1.0`, `Claude-SearchBot/1.0`, `PerplexityBot/1.0`, `Googlebot/2.1`, `Bingbot/2.0` (cod HTTP + dacă textul produsului e în HTML); `/llms.txt` există și e la zi; `/pages/pentru-asistenti-ai` live și conține faptele confirmate.
2. **Date structurate și marcă:** JSON-LD pe homepage, un produs de top și un articol de blog: `Organization` (name, logo, `sameAs` cu Instagram/Facebook/YouTube/TikTok), `Product` (brand = Prime Supplements, gtin, `aggregateRating`), `Article` (autor). Notează ce lipsește față de `findings/schema.md` și `findings/geo.md`.
3. **Dovezi externe:** câte recenzii are magazinul (Judge.me pe site), profil Trustpilot, prezență pe SupliScout / Compari / topurile care apar în panel (HyperFit, HighEnergy, gym-stack, BigProtein). Doar observații publice, fără conturi și fără formulare.

## 3. Comparație și concluzii
- Tabel: cele 29 de întrebări × (data trecută, acum) cu săgeată ↑/↓/=.
- Scor: recomandat / sursă / absent la 1–25 (număr și %), comparat cu data trecută.
- Pentru fiecare lipsă importantă: cine ne ia locul și **ce pas din planul de 20 de pași** o rezolvă. Nu propune ceva ce e deja în plan sau deja făcut (verifică `JURNAL.md`) – trimite la pasul existent.

## 4. Remedieri – doar cu „da” de la Marius
Skill-ul doar măsoară și propune. Nu modifica tema, produsele, colecțiile, metafield-urile sau paginile din proprie inițiativă. Planul SEO se aplică de la 1.12.2026 (decizia din 25.10). Excepție: dacă AI-ul afirmă ceva greșit despre marcă și corectura e doar pe `/pages/pentru-asistenti-ai`, propune textul exact și aplică după „da”.

## 5. Salvare (regulile proiectului)
1. Raport: `seo/PANEL-AI-AAAA-LL-ZZ.md`, același format ca `seo/PANEL-AI-2026-11-13.md` (rezultat pe scurt, tabel, fapte de confirmat, ce arată, data următoare = +1 lună) + secțiunea „Verificări tehnice” din pasul 2 + „Față de data trecută”.
2. `JURNAL.md` – o intrare pe ziua de azi; `DE-FACUT.md` – data următoarei rulări și ce așteaptă răspuns de la Marius; deciziile noi în `ISTORIC-DISCUTII.md`.
3. Commit + push pe `claude/install-claude-seo-ttv3h6` (cu `Co-Authored-By` din instrucțiunile sesiunii).
4. Rezumat pentru Marius în 5–8 rânduri: scorul, ce s-a schimbat, top 3 lipsuri, ce aștept de la el.

## Copii ale skill-ului
Sursa e în repo: `Prime-supplements/.claude/skills/search/`. O copie identică e în `D:\Proiecte Claude\Prime Supplements\.claude\skills\search\` ca să meargă `/search` din sesiunile deschise în folderul principal. Când modifici skill-ul, copiază-l în ambele locuri.
