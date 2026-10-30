# Costurile chatului Chera Hub – raport (30.10.2026, după prima zi de teste)

## 1. Găzduire și servicii: 0 lei / lună
| Componentă | Plan | Cost |
|---|---|---|
| Cloudflare Workers (aplicația), D1 (baza de date), R2 (poze/fișiere), Vectorize (căutare în notițe), Workers AI (embeddings bge-m3), cron | Free | 0 |
| Shopify (contul de client = login, App Proxy = chatul în site) | planul existent al magazinului | 0 în plus |
| Resend (e-mailuri: „Marius ți-a răspuns”, memento-uri) | Free, 3.000/lună | 0 |
| Push pe telefon (web push, chei proprii) | – | 0 |
| GitHub (repo privat `chera-hub`) | Free | 0 |

Limitele planului gratuit Cloudflare care contează: 100.000 de cereri/zi la Worker (chatul face polling la 5–6 s pe pagină deschisă ≈ 600–700 de cereri/oră per pagină; la 100 de clienți activi simultan se apropie de limită doar dacă toți țin chatul deschis ore întregi – nerealist, dar de urmărit în dashboard), D1 5 GB și 5 milioane de citiri/zi, R2 10 GB (pozele comprimate ≈ 300 KB fiecare → ~30.000 de poze), Vectorize 30 milioane de dimensiuni stocate (≈ 29.000 de fragmente de notițe – avem 60).

## 2. Singurul cost real: API-ul Claude (Anthropic), plătit din contul lui Marius
Măsurat în prima zi (30.10, teste cu Adelina și Vlad, inclusiv planuri lungi):

| | Apeluri | Cost |
|---|---|---|
| Haiku 5.5 (triaj + fapte în fișă + decizii din răspunsuri) | 40 | 0,010 $ |
| Sonnet 5.5 (drafturile propriu-zise, planuri) | 21 | 0,912 $ |
| **Total zi** | 55 | **0,92 $ (≈ 4,3 lei)** |

Pe draft (Sonnet): minim 0,012 $ (răspuns scurt), mediu **0,044 $**, maxim 0,105 $ (plan complet de 6 zile + 5 mese, cu planurile lui ca exemple și effort ridicat). Un plan cerut cu „Cere AI-ului” costă 0,06–0,11 $.

De ce a crescut față de estimarea din plan (0,01–0,015 $/draft): promptul e acum mult mai bogat – fișa clientului, până la 8 răspunsuri de-ale lui Marius ca exemple, 8–14 fragmente din notițe, planurile lui întregi la cereri de plan, pozele clientului (fiecare poză ≈ 1.500 de tokeni), effort „high” la cereri. Cache-ul de prompt reduce partea stabilă (vocea, regulile) la 10 % din preț.

## 3. Proiecție lunară (la volumul din plan: ~100 de clienți, ~1.500 de mesaje de client/lună)
| Scenariu | Cost/lună |
|---|---|
| Ca acum (Sonnet la toate drafturile, ~0,044 $/draft, ~15 drafturi/zi/client vorbăreț) | **~65–70 $** |
| Sonnet doar la răspunsurile de fond, Haiku la confirmări/scurte (deja așa) + mai puține exemple/fragmente | ~40–50 $ |
| Haiku 5.5 la toate drafturile (calitate mai slabă la planuri) | ~5–7 $ |
| + planuri cerute cu „Cere AI-ului” | +0,10 $ fiecare |

Gardurile din aplicație: buget lunar setat la **25 $** (`ai_monthly_budget_usd`): la 20 $ (80 %) drafturile trec automat pe Haiku, la 25 $ se opresc până luna următoare (Marius răspunde manual). Cap zilnic: 20 de drafturi/client, 15 răspunsuri automate/client. Costurile se văd oricând în ⚙ → „Costuri AI luna asta”.

Recomandare: lasă-l așa două săptămâni cu clienți reali, apoi vedem cifra reală și alegem: ridici bugetul la 50–75 $ (un abonament de coaching acoperă luni întregi de AI pentru toți clienții) sau coborâm consumul (mai puține exemple/fragmente, Haiku pe clienții cu întrebări simple).

## 4. Ce NU costă nimic, dar merită știut
Chatul nu are limită de mesaje; notițele, fișele, exemplele și istoricul stau în D1/R2 fără cost; indexarea notițelor (embeddings) e pe Workers AI gratuit (10.000 de neuroni/zi – o indexare a tuturor notițelor consumă câteva sute).
