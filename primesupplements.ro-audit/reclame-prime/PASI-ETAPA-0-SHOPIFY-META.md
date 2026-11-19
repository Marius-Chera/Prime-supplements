# Reclame Prime – etapa 0: Shopify și Meta (19.11.2026)

Aplicația e pe Cloudflare: `https://reclame-prime.prime-expediere.workers.dev`. Baza de date D1 `reclame-prime` (72080c41-…) e creată, iar cheile `ENC_KEY` și `CLAUDE_KEY` sunt puse. Rămâne de legat Shopify și Meta.

## A. Shopify – aplicația „Reclame Prime” (Marius, ~5 minute)
1. dev.shopify.com/dashboard → **Apps** → **Create app** → numele **Reclame Prime**.
2. Prima versiune (**Create version**):
   - **App URL:** `https://reclame-prime.prime-expediere.workers.dev`
   - **Embed app in Shopify admin:** da
   - **Scopes:** doar `read_orders`
   - **Release**.
3. **Settings** → copiezi **Client ID**. E public, îl poți trimite în chat; îl trec eu în aplicație.
4. **Client secret:** NU în chat. Îl pui tu, din PowerShell:
   ```powershell
   cd "D:\Proiecte Claude\Prime Supplements\reclame-prime"; node scripts/wr.mjs secret put SHOPIFY_API_SECRET
   ```
   Lipești secretul când îl cere și apeși Enter.
5. **Install app** → alegi magazinul Prime Supplements.
6. Acces doar pentru tine (și Adelina): în Shopify, **Settings → Users** → omul de la depozit → la aplicații, **debifezi Reclame Prime**.

## B. Meta – tokenul de „system user” (Marius sau Adelina, cine e admin în Business Manager)
1. **developers.facebook.com** → My Apps → **Create app** → „Other” → tipul **Business** → numele „Reclame Prime”, legată de portofoliul de business Prime Supplements. Aplicația rămâne în modul Development: pentru contul nostru nu e nevoie de App Review.
2. **business.facebook.com** → Settings → Users → **System users** → **Add**: numele `reclame-prime`, rolul **Admin**.
3. La system user → **Assign assets**:
   - **Ad accounts** → „Prime Supplements – Cont de publicitate”, cu **control total** (Manage ad account);
   - **Apps** → „Reclame Prime”.
4. **Generate new token**:
   - aplicația „Reclame Prime”;
   - expirarea **Never**;
   - permisiunile **ads_read** și **ads_management**.
   - ads_management e pentru butoanele de pornit/oprit din v0.2; până atunci aplicația doar citește.
5. Tokenul NU în chat. Îl pui din PowerShell:
   ```powershell
   cd "D:\Proiecte Claude\Prime Supplements\reclame-prime"; node scripts/wr.mjs secret put META_TOKEN
   ```
6. Îmi spui „gata” și pornesc prima citire. Verific cifrele față de raportul Windsor din 19.11 (`meta-ads/RAPORT-2026-11-19.md`).
