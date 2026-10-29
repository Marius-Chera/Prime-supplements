# Lansarea chatului Chera Hub – ce mai e de făcut și cine face

Scris pe 30.10.2026. Etapele 0–5 sunt live (vezi JURNAL 29–30.10). Decizii: conturile noi Shopify rămân; clienții de pe WhatsApp își fac singuri cont (fără import); întâi promovare pentru clienți noi.

## A. Marius (nu se pot face din cod)

1. **Domeniul mariuschera.ro → Shopify.** Shopify admin → Settings → Domains → Connect existing domain → mariuschera.ro; la registrar pui exact înregistrările pe care le arată Shopify pe ecranul de conectare (o înregistrare A pentru `@` către IP-ul Shopify și CNAME `www` → shops.myshopify.com); Claude le poate verifica după ce le pui. Apoi primary domain = mariuschera.ro. După propagare, Claude schimbă `PUBLIC_SITE_URL` și `RENEW_URL` în `wrangler.jsonc` și App Proxy-ul merge automat pe noul domeniu.
2. **Resend: domeniul pentru e-mailuri.** resend.com → Domains → Add domain → mariuschera.ro (regiunea EU) → Resend afișează 3 înregistrări DNS (DKIM TXT, SPF/MX pentru `send`, opțional DMARC) → le pui la registrar → Verify. Apoi Claude schimbă `EMAIL_FROM` în `Marius Chera <marius@mariuschera.ro>` (sau `chat@`). Până atunci e-mailurile pleacă doar către marius.chera@yahoo.com.
3. **Scoate parola magazinului** (Online Store → Preferences → Password protection) când site-ul e gata de văzut. Până atunci fiecare client are nevoie și de parolă.
4. **Publică politica de confidențialitate** (`POLITICA-CONFIDENTIALITATE-CHAT-2026-10-30.md`, după ce o citești): Online Store → Pages → pagină nouă; leag-o în subsol (Content → Menus → Footer menu). Claude o poate urca din Chrome-ul tău când spui.
5. **Testul pe telefon**, cu Adelina: login cu cod → chat → poză → check-in → „Adaugă pe ecranul principal” → clopoțel (push) → Marius răspunde din panou → notificarea ajunge.
6. **Anunțul** (`ANUNT-CLIENTI-CHAT-2026-10-30.md`), după 1–5.

## B. Claude, la semnalul lui Marius

- Ștergerea datelor de test din producție: mesajul de test al Adelinei (conversația 1) și notița „TEST Principii nutritie” (id 1), înainte de primul client real.
- `PUBLIC_SITE_URL`, `RENEW_URL`, `EMAIL_FROM` după punctele A1–A2 + redeploy; verificarea App Proxy pe mariuschera.ro.
- Pagina politicii în Shopify (din Chrome-ul lui Marius) și linkul din subsol.
- Setarea `grace_days`, `accept_threshold` etc. dacă vrea altfel decât implicit.

## C. Gata (30.10)

- Export GDPR per client (admin: „⬇ Export”; client: linkul „descarcă tot ce e salvat despre tine”), ștergere completă (admin: „Șterge”, cu confirmare prin e-mailul clientului; șterge D1 + R2 + Vectorize), jurnal de audit vizibil în ⚙ → Audit.
- Memento-urile de expirare merg și pentru prelungirile manuale (clienții de pe WhatsApp cărora Marius le pune data din panou).
- Verificare de securitate a codului (raportul în JURNAL 30.10).
