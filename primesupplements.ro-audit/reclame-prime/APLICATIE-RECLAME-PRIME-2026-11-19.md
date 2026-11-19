# Reclame Prime – aplicația proprie pentru reclame (plan, 19.11.2026)

**Decizia lui Marius (19.11):** facem o aplicație Shopify separată, „Reclame Prime”, conectată direct, fără Windsor, la **Meta Ads**, **Google Ads** și **OpenAI (ChatGPT) Ads**. Din ea vedem tot și controlăm campaniile.

**De ce aplicație separată și nu o secțiune în Total Admin:** în Total Admin lucrează omul de la depozit. Bugetele, cheltuielile și butoanele de oprire a campaniilor nu trebuie să fie la el. În Shopify, fiecare membru al echipei primește acces doar la aplicațiile alese, așa că depozitul are Total Admin, iar Marius (și Adelina, dacă vrea) are Reclame Prime. Un deploy greșit la reclame nu poate strica nici AWB-urile și facturile.

## Arhitectura (la fel ca Prime Afiliați)
- Aplicație încorporată în Shopify Admin: Worker Cloudflare + baza de date D1, pe contul Cloudflare Prime (contact@). Cost: **0 lei**.
- Codul stă în `D:\Proiecte Claude\Prime Supplements\reclame-prime` (repo separat, ca `prime-afiliati`). Deploy-ul se face doar prin `scripts/wr.mjs`.
- Din Prime Afiliați refolosim: autentificarea Shopify (`src/shopify/auth.ts`), criptarea tokenurilor (`src/crypto.ts`), citirea comenzilor (`src/shopify/orders.ts`), paza pe operații (`src/guard.ts`) și stilul paginilor.
- Cheile de acces la Meta, Google și OpenAI stau ca secrete în Cloudflare, nu în cod și nu în chat.

## Ce permite fiecare API (verificat pe 19.11.2026, din documentația oficială)

| Platformă | Acces | Ce trebuie | Limite |
|---|---|---|---|
| **Meta Ads** | Marketing API, token de „system user” din Business Manager (nu expiră) | o aplicație Meta de tip Business + system user cu acces la contul 1805310243181962 | pentru contul propriu nu e nevoie de App Review |
| **Google Ads** | Google Ads API. **Din 09.09.2026 nu mai e nevoie de developer token și nici de cont de manager (MCC)**: nivelul de acces ține de proiectul Google Cloud | proiect Google Cloud **cu facturare activă** (nu trial), API-ul pornit, cerere pentru nivelul **Explorer** pe pagina „Google Ads API Overview” (aprobare automată, de obicei), client OAuth | Explorer: 2.880 de operații/zi pe conturi reale (ajunge pentru un cont). Ecranul OAuth trebuie publicat sau „Internal” (Workspace); altfel tokenul expiră la 7 zile |
| **OpenAI Ads** | Advertiser API, `https://api.ads.openai.com/v1` | cheie API creată în Ads Manager → Settings (legată de contul de reclame, diferită de cheile platform.openai.com) | 600 de cereri/min pe endpoint; Ads Manager e încă „Beta” |

Ce se poate face prin API (pe toate trei): lista campaniilor, grupurilor și reclamelor, pornire și oprire, schimbarea bugetului, rapoarte zilnice (afișări, clicuri, cost, conversii, valoarea conversiilor).
- **OpenAI:** `/campaigns/{id}/pause|activate`, `/ad_groups/{id}/pause|activate`, `/…/insights`, cu segmentare pe produs și dispozitiv.
- **Meta:** API-ul nu creează audiențe personalizate decât cu permisiuni în plus; cele 3 excluderi din `meta-ads/RECLAME-2026-11.md` le facem oricum în Ads Manager.

Surse:
- [Google Ads API – access levels](https://developers.google.com/google-ads/api/docs/access-levels?hl=en)
- [Google Ads API – dev token (sunset)](https://developers.google.com/google-ads/api/docs/first-call/dev-token)
- [OpenAI Ads API](https://developers.openai.com/ads)
- [OpenAI Ads – insights](https://developers.openai.com/ads/api-reference/insights.md)

## Etape

### Etapa 0 – accesele (le face Marius, cu textele mele; o singură dată)
1. **Shopify:** aplicația „Reclame Prime” în Dev Dashboard (Create app → Create version → Install), cu drepturi doar de citire: `read_orders`, `read_products`. Apoi, în Settings → Users, acces doar pentru Marius (și Adelina).
2. **Meta:**
   - business.facebook.com → Business settings → Users → **System users** → Add, rol Admin;
   - Assign assets: contul de reclame „Prime Supplements – Cont de publicitate”, cu control total;
   - Generate token cu `ads_management` și `ads_read`, prin aplicația Meta creată pe developers.facebook.com (tip Business).
   - Tokenul nu se lipește în chat: îl pune Marius direct cu `wr secret put META_TOKEN`, sau îl pun eu din terminalul lui.
3. **Google:**
   - console.cloud.google.com → proiect nou „reclame-prime” → cont de facturare atașat (costul rămâne 0, dar nivelul Explorer nu se dă proiectelor fără facturare);
   - APIs → **Google Ads API** → Enable → pe pagina Overview: **Apply for Explorer access**;
   - OAuth consent screen: „Internal” dacă contact@ e Google Workspace, altfel „External” + Publish;
   - Credentials → OAuth client (Web), cu adresa de întoarcere a Worker-ului;
   - în aplicație, Marius apasă o dată „Conectează Google Ads” și alege contul care vede 819-012-5727.
4. **OpenAI:** ads.openai.com → Settings → API keys → Create, pus apoi ca secret `OPENAI_ADS_KEY`.

### Etapa 1 – v0.1, doar citire
- Sincronizare zilnică, cron la 06:00 RO, plus un buton „Actualizează acum”: cost, afișări, clicuri, conversii și valoare, pe zi, campanie și platformă, salvate în D1.
- Din Shopify: comenzile pe sursă, după UTM/referrer (facebook/ig, google/gclid, chatgpt), deci **rentabilitatea reală** față de ce își atribuie fiecare platformă (la Meta: 359 raportate față de 75 „clic 1 zi” în raportul din 19.11).
- Ecranul principal:
  - cheltuiala lunii pe platformă, față de plafon (Meta 3.000 lei/lună);
  - ritmul de cheltuială;
  - campaniile active cu cost, comenzi reale și cost pe comandă.
- Un endpoint doar de citire, cu cheie, pentru Claude: analizele lunare se fac direct din aplicație, iar **Windsor nu mai e necesar** (trialul expiră pe ~19.12.2026).

### Etapa 2 – v0.2, control (FĂCUTĂ 19.11, commit 6c60203 în `reclame-prime`; prima modificare reală doar cu „da”)
- Butoane pentru oprit/pornit campanie, grup și reclamă, și pentru schimbat bugetul.
- Fiecare acțiune cere confirmare și se scrie într-un jurnal de modificări (cine, ce, când, valoarea dinainte).
- Paza din cod (ca `guard.ts`): sunt permise doar operațiile din listă, iar un buget care ar depăși plafonul lunar (regula Meta 3.000 lei) e refuzat.
- Crearea de campanii noi rămâne deocamdată în Ads Manager, unde se văd previzualizările.

### Etapa 3 – alerte
- E-mail către Marius când:
  - o platformă cheltuie peste ritm;
  - o campanie are cost fără nicio comandă reală 7 zile la rând;
  - o reclamă e respinsă;
  - un token expiră.

## Ce rămâne neschimbat până e gata v0.1
- Windsor rămâne conectat la Meta (trial). Regulile din `meta-ads/REGULI-META-ADS.md` și „da”-ul lui Marius pentru orice modificare se aplică și în aplicație.
