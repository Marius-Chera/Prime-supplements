# Raport săptămânal: trafic pe blog și de unde vine (cerut de proprietar pe 13.11.2026)

Rutina cloud „Raport săptămânal trafic blog – de unde vin vizitatorii (AI / Google / social)” (`trig_01E8PPY84dLiASkjPVypgq2M`) rulează în fiecare **luni la 09:30** (ora României), cu notificare push + e-mail. Prima rulare: 16.11.2026. Ea scrie aici `<data de luni>.md`, adaugă o linie în `JURNAL.md` și face commit + push. Administrare: https://claude.ai/code/routines/trig_01E8PPY84dLiASkjPVypgq2M

## Metoda

- Sursa: Shopify Analytics (ShopifyQL, tabelul `sessions`), vizitele care **intră pe site printr-un articol** (`landing_page_path` începe cu `/blogs/news`), săptămâna luni–duminică, comparată cu săptămâna anterioară.
- Câmpuri: vizite (sessions), vizitatori (online_store_visitors), vizite cu produs pus în coș, vizite cu comandă finalizată.
- Clasificarea surselor:
  - **Asistenți AI:** `referrer_name` sau `utm_source` conține chatgpt, openai, gemini, bard, perplexity, copilot, claude, anthropic, you.com, poe. ChatGPT trimite de obicei `utm_source=chatgpt.com`; `utm_source=chatgpt` poate fi și campania plătită ChatGPT Ads (2–15.11.2026).
  - **Google organic:** search / google fără UTM. Google cu `utm_source=google` = linkuri din Google Shopping/reclame (raportate separat).
  - **Bing și alte motoare:** search / bing, duckduckgo etc. (Copilot folosește indexul Bing, dar clicurile din Copilot apar ca AI doar dacă au referrer sau UTM).
  - **Social:** facebook, instagram, tiktok, youtube, linkedin, threads. **E-mail:** theMarketer, gmail. **Direct / necunoscut:** restul.
- Limite: vizitatorii „noi” vs „care revin” nu se pot separa direct în ShopifyQL pe intrarea în blog (rutina încearcă și spune dacă nu există câmpul); multe asistente AI nu trimit referrer, deci o parte din vizitele din AI apare ca „direct”.

## Punctul de plecare (măsurat pe 13.11.2026, ultimele 30 de zile)

| Sursa (intrări pe blog) | Vizite | Vizitatori | Coș | Comenzi |
|---|---|---|---|---|
| Google organic | 715 | 679 | 7 | 2 |
| Direct | 277 | 262 | 2 | 0 |
| Facebook | 32 | 29 | 1 | 1 |
| aocr (necunoscut) | 28 | 28 | 0 | 0 |
| Bing | 11 | 11 | 0 | 0 |
| LinkedIn | 7 | 7 | 0 | 0 |
| Alte surse | 12 | 12 | 0 | 0 |
| **Asistenți AI** | **0** | **0** | **0** | **0** |
| **Total** | **1.082** | | **10** | **3** |

Pe tot site-ul, în aceeași perioadă, ChatGPT apare cu ~121 de vizite (`utm_source` chatgpt / chatgpt.com, inclusiv reclama ChatGPT), toate pe pagini de produs, niciuna pe blog. Gemini, Perplexity și Copilot nu apar încă.

## Scorurile articolelor (adăugat 13.11.2026, la cererea proprietarului)

În raportul de luni adaugi și o secțiune **„Scorurile articolelor din săptămână”**: pentru fiecare articol publicat în săptămâna raportată, citește metafield-urile `custom.scor_seo`, `custom.scor_ai` și `custom.scor_lipsuri` (articles(first: 20, sortKey: ID, reverse: true) { nodes { handle title publishedAt scorSeo: metafield(namespace:"custom", key:"scor_seo"){value} scorAi: metafield(namespace:"custom", key:"scor_ai"){value} lipsuri: metafield(namespace:"custom", key:"scor_lipsuri"){value} } }) și pune un tabel: articol, Scor SEO /100, Scor AI /100, ce a lipsit, vizite în săptămână. Spune media pe săptămână și dacă a crescut față de săptămâna anterioară (ținta e 100/100). Articolele fără metafield-uri (create înainte de 14.11.2026) apar cu „—”. Scriptul de punctaj e `blog-automation/scor-articol.mjs`.
