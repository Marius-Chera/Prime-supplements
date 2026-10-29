# Chera Hub – arhitectura chat-ului privat cu drafturi AI (plan aprobat de proprietar pe 29.10.2026)

Înlocuiește §8 și §10 din `ARHITECTURA-WHATSAPP-SITE-2026-10-27.md`: conversațiile de coaching NU mai merg pe WhatsApp, ci în chat-ul din site (`mariuschera.ro/apps/chat`). Codul aplicației stă în repo-ul privat `Marius-Chera/chera-hub` (local: `D:\Proiecte Claude\Prime Supplements\chera-hub\`). Jurnalul și deciziile rămân în `primesupplements.ro-audit/`.

## Context
Marius (Chera Coaching SRL, „Chera Protocol”) are ~100 de clienți de coaching și antrenează singur. Site-ul e magazinul Shopify `bp66vh-bq.myshopify.com`, cu temă proprie în `Prime-supplements/chera-coaching/shopify-theme/`; domeniul va fi **mariuschera.ro**. Zona clientului din `/account` există și e condiționată de plată prin metafield-ul `chera.expira` (snippet `chera-access.liquid`: fallback pe ultima comandă plătită + 30/90 zile, zile de grație din setările temei).

**Ce am găsit în repo (ca să nu dublăm):**
- 27.10: s-a ales WhatsApp Business ca canal (ARHITECTURA-WHATSAPP-SITE §10); Respond.io respins („80–160 pe lună e prea scump”); §8 amâna un „Chera Protocol Hub” propriu. **Planul de aici e acel Hub, în interiorul site-ului, plus asistentul AI.** Decizia de azi: chat-ul **înlocuiește WhatsApp**.
- Regulile pentru răspunsuri „în locul lui Marius” există: `chera-coaching/carte/GHID-CARTE-SI-VOCE.md` §2, §4 (fără medicamente pe rețetă – Metformin/Forxiga; medical/sarcină/minori → la medic + semnalat; fără prețuri/date în afara site-ului). Intră în promptul AI.
- Nimic despre RAG, embeddings, chat propriu sau API Claude până acum. Repo-ul `Prime-supplements` e **public** → codul aplicației merge într-un repo nou, privat.

**Cerințele lui Marius (29.10):** cost zero la găzduire; totul din cod, aplicație proprie **în interiorul site-ului**, potrivită cu implementarea Shopify; notificări e-mail + push; AI care recomandă **exact** mesele, antrenamentele și tot ce e în notițele lui, **învață din discuțiile cu fiecare client**, cunoaște istoricul tuturor, preia limbajul lui, și în 1–2 ani el doar **acceptă** răspunsul. Nimic nu pleacă vreodată automat.

## Costuri – spus clar
| Componentă | Cost |
|---|---|
| Găzduire + bază de date + fișiere + căutare vectorială + embeddings (Cloudflare Workers, D1, R2, Vectorize, Workers AI – plan gratuit, uz comercial permis) | **0** |
| Autentificare (contul de client Shopify, deja existent) | 0 |
| E-mail (Resend, 3.000/lună, 100/zi; rezervă Brevo 300/zi) | 0 |
| Push pe telefon (web-push, VAPID) | 0 |
| Repo privat GitHub, aplicația Shopify custom | 0 |
| **API Claude (drafturile)** – ~1.500 mesaje de client/lună | **~15–20 $/lună** cu Sonnet 5.5 + triaj Haiku + cache; **~2–3 $/lună** doar cu Haiku 5.5 (calitate mai slabă la planuri). Nu există variantă gratuită pentru modelul AI. Modelul se schimbă dintr-o setare, oricând. |
| Singurul cost de găzduire posibil | Workers Paid 5 $/lună, **doar dacă** PDF-urile mari de notițe depășesc limita de procesor a planului gratuit (10 ms/cerere). Alternativa gratuită: indexarea notițelor mari se face de pe calculatorul lui Marius, din aplicația Claude, cu un script local. |

## Arhitectura (totul sub mariuschera.ro)
```
Clientul, logat în contul Shopify ──▶ mariuschera.ro/apps/chat  (Shopify App Proxy → Cloudflare Worker)
                                      │  cererea vine semnată de Shopify, cu logged_in_customer_id
Marius ───────────────────────────────▶ mariuschera.ro/apps/chat/admin  (același Worker, doar customer_id-ul lui)
                                      ▼
                         Cloudflare Worker (Hono + TypeScript)
                          ├─ D1 (SQLite): clienți, conversații, mesaje, drafturi, profiluri, memorie, audit
                          ├─ R2: poze/PDF-uri (bucket privat, URL-uri semnate 10 min), documentele de notițe
                          ├─ Vectorize + Workers AI (bge-m3, multilingv): fragmentele din notițe + „memoria de răspunsuri”
                          ├─ Cron (zilnic 03:00): reconciliere acces din Shopify Admin GraphQL; (la 1 min) joburi reluate
                          ├─ Webhook-uri Shopify: orders/paid, customers/update (HMAC) → acces instant
                          └─ API Claude (@anthropic-ai/sdk): triaj Haiku 5.5, draft Sonnet 5.5, prompt caching
Notificări: Resend (e-mail) + web-push (PWA instalabilă din /apps/chat)
```
- **De ce App Proxy:** clientul nu părăsește site-ul, nu există a doua autentificare (folosește contul Shopify, obligatoriu la plată, cum s-a decis pe 27.10), Shopify semnează fiecare cerere și spune cine e clientul; accesul se citește din același `chera.expira` ca tema. Pagina de chat se randează cu antetul și subsolul temei (răspuns `application/liquid`) → arată ca restul site-ului.
- **Fără server de întreținut:** Worker-ul rulează doar la cerere; joburile (draft, indexare) pornesc cu `waitUntil` după răspuns, iar cron-ul de 1 minut reia ce s-a blocat. Realtime prin polling la 5 s (fără websocket prin proxy).
- **Repo nou privat** `Marius-Chera/chera-hub`, clonat în `D:\Proiecte Claude\Prime Supplements\chera-hub\` (lângă `Prime-supplements/`, nu în el). Deploy automat din GitHub în Cloudflare. Documentația, jurnalul și deciziile rămân în `Prime-supplements/` (JURNAL, ISTORIC, DE-FACUT, `chera-coaching/`).
- **Date de sănătate:** D1 și R2 criptate la repaus; notițele de profil criptate suplimentar (AES-256-GCM, cheie în secretele Worker-ului); fiecare interogare filtrată pe `customer_id` din semnătura Shopify; jurnal de audit la orice citire din admin; export/ștergere per client. Prelucrarea AI (Anthropic) e în SUA → notă de confidențialitate + consimțământ la prima intrare în chat.

## Cum „învață” sistemul (fără antrenarea modelului – Claude nu se antrenează; învață prin memorie + exemple + reguli)
1. **Notițele lui Marius = sursa adevărului.** Documentele (PDF/DOCX/TXT/MD) se fragmentează și se indexează; AI-ul recomandă mese, antrenamente, protocoale **doar** din ele. Dacă nu găsește → „nu am suficient în notițe despre asta” + ce lipsește (lista de lacune devine lista lui Marius de notițe de scris).
2. **Planul structurat per client** (mese pe zile, antrenamente, suplimente, cardio), cu versiuni. Draftul propune o versiune nouă (diferențe clare: ce masă, ce exercițiu, de la ce la ce, de ce). Marius aprobă → versiunea devine curentă și clientul o vede în chat la „Planul meu”. Așa AI-ul modifică „exact mesele și antrenamentele”, nu descrie vag.
3. **Fișa clientului care crește singură.** După fiecare schimb, Haiku extrage faptele noi (greutate, somn, aderență, dureri, preferințe, ce s-a schimbat în plan și de ce) în `client_memory`; Marius le vede și le poate corecta. La fiecare draft, AI-ul primește fișa completă + istoricul recent + rezumatul istoricului vechi → „cunoaște istoricul la toți”.
4. **Memoria de răspunsuri.** Fiecare mesaj trimis de Marius (fie scris de el, fie draft editat) se salvează ca exemplu: situația clientului + întrebarea → răspunsul lui final. La un caz asemănător, cele mai apropiate 3–5 exemple intră în prompt → AI-ul preia limbajul, exprimarea și deciziile lui, din ce în ce mai bine, pe măsură ce se adună răspunsuri.
5. **Învățare din corecturi.** Când Marius editează un draft, se salvează diferența. Săptămânal, Claude rezumă corecturile repetate în 3–5 „reguli de stil” propuse; Marius le aprobă în admin și intră în prompt. În plus, el poate scrie direct „instrucțiuni suplimentare”.
6. **Măsura progresului.** Admin arată rata de drafturi trimise fără modificări (pe client și pe tip de întrebare). Când trece de ~90 %, apare „Acceptă” cu un singur click. Trimiterea rămâne mereu acțiunea lui – niciodată automată.

## Modelul de date (D1, migrații în `migrations/`)
| Tabel | Coloane cheie |
|---|---|
| `clients` | `customer_id` (Shopify, PK), `email`, `name`, `role` `client\|coach`, `created_at` |
| `access_cache` | `customer_id`, `expires_at`, `package`, `source` `metafield\|order\|manual`, `manual_until`, `synced_at` |
| `client_profiles` | obiectiv, categorie (bikini/MP/CP/general), data concursului, greutate, restricții, profil neuro (din `chera.profil`), `notes_enc` |
| `client_memory` | `customer_id`, `fact`, `kind` (măsurătoare/preferință/decizie/problemă), `source_message_id`, `confirmed_by_coach`, `created_at` |
| `plans`, `plan_versions` | plan curent per client; versiuni jsonb {mese[], antrenamente[], suplimente[], cardio[], note}, `proposed_by` `coach\|ai`, `approved_at` |
| `conversations`, `messages` | una per client; `author` `client\|coach`, `body`, `sent_from_draft_id`, `read_at`; rândurile `coach` se scriu doar prin funcția de trimitere, cu `customer_id`-ul coach-ului verificat din semnătura Shopify |
| `attachments` | cheie R2, mime, mărime, tip |
| `drafts` | `trigger_message_ids`, `status` `pending\|edited\|sent\|discarded\|failed`, `reply_text`, `plan_changes` jsonb, `confidence`, `gaps`, `flags`, `citations` jsonb, model, tokeni, `cost_usd`, `edited_text`, `edit_diff`, `sent_message_id` |
| `reply_examples` | contextul rezumat + întrebarea + răspunsul final al lui Marius; vector în Vectorize (namespace `examples`) |
| `style_rules` | regulă, `status` `proposed\|approved\|rejected`, sursa (corecturile din săptămâna X) |
| `kb_documents`, `kb_chunks` | document (titlu, `kind` `notes\|style_exemplar`, cheie R2, status, nr. fragmente); fragment (conținut, `heading_path`, tokeni) + vector în Vectorize (namespace `kb`) și căutare full-text D1 (FTS5) |
| `jobs`, `push_subscriptions`, `notifications_log`, `audit_log`, `app_settings`, `ai_usage_daily` | ca în orice coadă simplă: tip, payload, status, încercări, `run_after`; abonamente push; dedupe notificări; audit (actor, acțiune, țintă, ip); setări (zile de grație, model, cap zilnic, buget lunar); costuri pe zi |

## Fluxurile cheie
1. **Intrare + acces:** clientul deschide `/apps/chat` logat în contul Shopify; Worker-ul verifică semnătura, citește `logged_in_customer_id`; dacă `access_cache` lipsește sau e > 24 h → Admin GraphQL (client, metafield-uri `chera.*`, etichete, ultimele comenzi plătite) → `expires_at = chera.expira ?? max(comandă + 30/90 zile)`, aceeași logică cu `chera-access.liquid`. Expirat → ecran „Abonamentul a expirat pe … Reînnoiește” cu linkul produsului. Nelogat → Shopify îl trimite la login.
2. **Clientul scrie** (text, poze, PDF – upload direct în R2 prin URL semnat, poze comprimate în browser): mesaj salvat → push imediat către Marius, e-mail grupat (5 min) → job `draft` cu `run_after = +3 min` (mesajele consecutive dau un singur draft).
3. **Jobul de draft:** cap zilnic → triaj Haiku (răspuns de fond? întrebări de căutare; fapte noi → `client_memory`) → căutare hibridă (Vectorize + FTS5, fuziune RRF, top-8 fragmente) + top-5 `reply_examples` asemănătoare + planul curent + fișa + istoric → apel Claude cu `system` cacheabil (vocea lui, liniile roșii, regulile de stil aprobate, exemplare de stil) + partea variabilă → `output_config.format` JSON: `{reply_text, plan_changes, confidence, used_chunk_ids, gaps, flags}`. Serverul validează citările și salvează draftul.
4. **Marius în admin:** lista clienți (necitite, drafturi în așteptare, expiră curând), conversația + panoul de draft (text editabil, citările cu previzualizare, `plan_changes` ca diferențe față de planul curent, banner pentru `flags`). **Trimite** / **Regenerează** (cu indicație) / **Șterge**; sau scrie liber. La trimitere: mesajul apare ca al lui, planul nou (dacă a aprobat) devine curent, clientul primește e-mail „Marius ți-a răspuns” (fără conținut) + push dacă are PWA.
5. **Notițe:** `/apps/chat/admin/notite`: upload → parsare (`unpdf`, `mammoth`, text) → fragmente ~800 tokeni, suprapunere 100 → embeddings Workers AI → Vectorize + FTS5. Ștergere/re-upload curat. Casetă de test „ce găsește pentru întrebarea X”. Documente mari → script local `node ingest.mjs` din aplicația Claude (gratuit, fără limită de procesor).
6. **Expirare:** cron 03:00 recalculează accesul pentru toți + rezumat pe e-mail lui Marius; webhook-urile `orders/paid`, `customers/update` schimbă instant un client. Prelungire manuală din admin (`manual_until`, pentru plăți prin transfer).

## Garduri
- Un singur drum din `drafts` în `messages`: butonul „Trimite”, cu `customer_id`-ul coach-ului verificat din semnătura Shopify la fiecare cerere. Codul clientului nu conține nicio rută sau componentă de draft (bundle separat `admin/`); orice cerere spre `/admin` fără coach-ul logat → 404.
- AI-ul scrie doar în `drafts`, `client_memory` (marcat „neconfirmat”) și `style_rules` (status `proposed`); nu are unelte care trimit.
- Linii roșii în prompt: fără medicamente pe rețetă/dopante; medical/sarcină/minor/tulburare alimentară → răspuns scurt spre medic + flag; „Trimite” cere confirmare la flag.
- Buget: cap zilnic de drafturi/client (8), `AI_MONTHLY_BUDGET_USD` (la 80 % trece pe Haiku + e-mail), model din setări. Rate limit pe upload. Audit complet.

## Etape
**Etapa 0 – Conturi (Marius, ~45 min; scurt, doar ce nu pot face eu).** Repo privat `chera-hub`; cont Cloudflare (gratuit) legat de GitHub; cont Resend; cheie Anthropic; aplicația Shopify custom (Dev Dashboard, gratuit) cu App Proxy `/apps/chat` → URL-ul Worker-ului, scopes `read_customers`, `read_orders`, webhook-uri; mariuschera.ro conectat la Shopify. Secretele le pune el în Cloudflare (Worker → Settings → Variables): `SHOPIFY_API_SECRET`, `SHOPIFY_ADMIN_TOKEN`, `SHOPIFY_STORE_DOMAIN`, `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `EMAIL_FROM`, `COACH_CUSTOMER_ID`, `PROFILE_ENC_KEY`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `RENEW_URL`. Claude: scheletul (Hono + TS, `wrangler.toml` cu D1/R2/Vectorize/AI/cron), `.dev.vars.example`, README, primul deploy. Verificare: `mariuschera.ro/apps/chat` răspunde cu o pagină în antetul temei.
**Etapa 1 – Acces + chat de bază (Claude).** Migrații v1, verificarea semnăturii App Proxy, `lib/access.ts` (oglindește `chera-access.liquid`), ecranul de expirat, mesaje text + poze + PDF, inbox admin, e-mailuri în ambele sensuri, push PWA. Marius: `chera.expira` pe cei doi clienți de test (marius.chera@yahoo.com, adelina.chera@gmail.com). Verificare: client cu dată viitoare → chat; dată trecută → expirat; A nu vede conversația lui B (test de URL); poze și PDF în ambele sensuri pe două telefoane; push ajunge.
**Etapa 2 – Shopify complet + temă (Claude).** Webhook-uri, cron de reconciliere, prelungire manuală; modificările temei (mai jos). Marius: verifică webhook-urile în aplicația Shopify, instalează PWA. Verificare: comandă de test (1 leu cu Netopia, altfel comandă manuală „plătită”) activează accesul într-un minut; editarea `chera.expira` revocă.
**Etapa 3 – Notițe + planul structurat (Claude).** Upload, parsare, fragmentare, embeddings, căutare hibridă, inspector; planul per client cu versiuni, vizibil clientului la „Planul meu”. Marius: urcă 5–10 documente reale + 2–3 planuri vechi marcate „stil”; introduce (sau importă din PDF) planurile curente ale câtorva clienți. Verificare: întrebare acoperită → fragmentele corecte; neacoperită → `insufficient`.
**Etapa 4 – Drafturi AI (Claude).** Joburi, triaj, prompt, output structurat, panoul de draft, `plan_changes` → versiune nouă la aprobare, flags, cost și buget. Marius: scrie „instrucțiunile suplimentare”, revizuiește 20 de drafturi. Verificare: mesaj → draft în 1–3 min; citări corecte; „nu am suficient în notițe” pe teme neacoperite; „Trimite” postează ca Marius; în Network/HTML-ul clientului nu există urme de draft; cap zilnic.
**Etapa 5 – Învățarea (Claude).** `client_memory` din fiecare schimb, `reply_examples` din fiecare trimitere, `edit_diff` + regulile de stil săptămânale, rata de acceptare pe dashboard, butonul „Acceptă” la ≥ 90 %. Verificare: după 10 răspunsuri ale lui Marius pe o temă, draftul următor pe aceeași temă folosește exemplele (vizibil în panou: „exemple folosite”); un fapt spus de client apare în fișă și în draftul următor.
**Etapa 6 – Întărire + migrare + lansare.** Export/ștergere GDPR per client, `/security-review`, consimțământ + politică de confidențialitate, import CSV al celor ~100 de clienți cu `chera.expira` completat manual, DKIM Resend pe mariuschera.ro, anunțul către clienți. Verificare: tur complet cu cele două conturi de test pe domeniul real; audit; export.

## Modificări în tema existentă (`Prime-supplements/chera-coaching/shopify-theme/`)
- `sections/main-account.liquid`: butonul WhatsApp (linia 14) → „Chat cu Marius” spre `/apps/chat`; textele de la liniile 26, 45–46, 55, 78 trecute pe chat / „video call”; „Planul meu” leagă spre planul structurat din chat (PDF-ul din `chera.plan_url` rămâne ca alternativă).
- `config/settings_schema.json`: `whatsapp_number` rămâne doar pentru sesiunile de posing pe video call.
- Marius, din admin Shopify: e-mailul de confirmare a comenzilor de coaching + pagina de mulțumire primesc „Intră în chat: mariuschera.ro/apps/chat (te loghezi cu e-mailul comenzii)”.
- Documentație: fișier nou `chera-coaching/ARHITECTURA-CHAT-HUB-2026-10-29.md` (planul de aici), ARHITECTURA-WHATSAPP-SITE §8/§10 marcate ca înlocuite, decizia în ISTORIC-DISCUTII, etapele în DE-FACUT, JURNAL la fiecare etapă, commit + push pe `claude/install-claude-seo-ttv3h6`.

## Riscuri și întrebări deschise
- **Costul AI nu poate fi zero** (~15–20 $/lună cu Sonnet, ~2–3 $ doar cu Haiku). Dacă Marius vrea 0 absolut, singura cale e fără drafturi AI (doar chat), ceea ce contrazice cerința principală.
- **Limita de procesor a planului gratuit Cloudflare** (10 ms/cerere): suficientă pentru chat și apelurile la Claude (așteptarea nu se numără), posibil insuficientă pentru PDF-uri mari → indexare locală sau Workers Paid 5 $.
- **Domeniul:** mariuschera.ro trebuie reconectat (DNS inexistent acum) la Shopify, înainte de teste cu clienți reali; până atunci totul merge pe `bp66vh-bq.myshopify.com/apps/chat`.
- **Push pe iPhone** doar cu PWA instalată din Safari; e-mailul rămâne garantat.
- **Migrarea celor ~100 de clienți de pe WhatsApp:** cont Shopify + `chera.expira` manual; istoricul vechi nu se importă (opțional, export de chat ca PDF în notițele clientului).
- **Calitatea „vocii”** crește cu exemplele; primele săptămâni Marius editează mult – e normal și e exact ce alimentează învățarea.
- **Deschise:** vede clientul „citit”? Check-in-ul săptămânal se mută în chat (recomandat, etapa 5)? Cui scrie clientul când Marius e în concediu (mesaj automat de absență, singurul automat, setat de el)?
