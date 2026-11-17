# Facturi duble Oblio, 16–17.11.2026 (aplicația veche + Total Admin)

## Ce s-a întâmplat
Din 16.11, de când Total Admin lucrează Live, fiecare comandă procesată primește 2 facturi PRS cu aceeași sumă:
- factura Total Admin, cu mențiunea „Comanda Nr…”;
- factura aplicației vechi „Primesupplements App” (KEMO), cu mențiunea „Factura emisa pentru comanda Nr…”.

## Cauza (dovada: istoricul comenzii Nr.10402 în Shopify)
- **13:20:07–13:20:10:** Total Admin emite PRS 16928, apoi marchează comanda expediată (fulfillment) și trimite e-mailul.
- **13:20:16–13:20:17:** „Primesupplements App edited the details of this order” → **PRS 16929**, cu INVOICE_CREATED_AT 13:20:16.

**Aplicația veche facturează automat orice comandă care devine expediată**, fără să verifice factura existentă. Total Admin își face verificările înainte de emitere și a emis primul, corect. Cât timp aplicația veche e instalată, dublurile continuă.

## Comenzile dublate (din analiza registrului Oblio adusă de Marius pe 17.11; fără nume de clienți)
- **6 comenzi plătite cu cardul** (o factură e încasată, cealaltă neîncasată):
  - Nr.10402 (PRS 16928/16929);
  - PRS 16930/16931;
  - Nr.10407 (16933/16934);
  - 16935/16936;
  - 16937/16939;
  - Nr.10416 (16938/16940).
- **7 comenzi din 17.11**, ambele facturi neîncasate. Lista exactă se scoate din Oblio după mențiuni.

Total până la analiză: 13 comenzi.

## Ce trebuie făcut
1. **Oprirea dublurilor:** Marius dezinstalează aplicația veche „Primesupplements App” (Setări → Aplicații); Claude nu umblă în ea (regulă). Total Admin face deja facturile, AWB-urile, expedierea și sincronizarea stocului. Până atunci nu se mai procesează comenzi în Total Admin, sau se revine temporar doar la aplicația veche.
2. **Curățenia în Oblio**, cu acordul lui Marius și eventual al contabilei:
   - câte o factură din fiecare pereche se anulează (dacă nu e transmisă în SPV) sau se stornează;
   - la comenzile cu cardul se păstrează cea potrivită pentru încasare;
   - **stocul:** fiecare factură dublă a scăzut a doua oară stocul din gestiunea online, iar sincronizarea Oblio → Shopify (la 30 de minute) a dus scăderea și în Shopify. Anularea sau stornarea readuce stocul.
3. **Pe comenzile Shopify**, atributele INVOICE_* arată acum factura aplicației vechi; se aliniază după ce se decide care factură rămâne.
