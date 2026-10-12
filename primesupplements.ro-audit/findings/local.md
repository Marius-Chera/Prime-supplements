# Local SEO findings: primesupplements.ro (DRAFT, first pass)

## Scope & method
- Business type: online-only retailer. Shopify Admin (read-only GraphQL) shows one location "Shop location" with NO street address (only country RO) and localPickupSettingsV2 = null; no "ridicare"/"pickup"/"showroom"/"magazin fizic" text on home, product or contact pages. T&C: "Livrarea Produselor se poate efectua doar pe teritoriul României".
- NAP sources compared: footer (34 local HTML copies), /pages/contact, 6 legal pages (shopify/pages.json), Organization JSON-LD (snippets__schema-organization.liquid), Shopify shop billing address, B2B store, ANAF public registry (webservicesp.anaf.ro, CUI 46260823).
- Social handle verification: TikTok (both handles, embedded JSON), YouTube; Facebook/Instagram inconclusive (login wall / 429).
- gbp_deprecation_lint.py on contact + home: 0 findings.
- Draft only; final version follows.

## Score
28/100 (draft)

## Findings (draft list, details in final)
- LOCAL-01 Organization schema lacks address/telephone/email/legalName/vatID (High)
- LOCAL-02 sameAs points to wrong TikTok account; FB/IG handles differ from footer; YouTube missing (High)
- LOCAL-03 Footer address linked to https://www.primesupplements.ro/cart/# (Medium)
- LOCAL-04 NAP variants: 6 name forms incl. non-existent "Prime Supplements S.R.L.", 4 address forms, 3 phone forms, no postal code (Medium)
- LOCAL-05 Shopify shop profile: city empty, street without number; location address null (Medium)
- LOCAL-06 B2B store: store name = legal name + CUI, no NAP, Shopify default social links (Medium)
- LOCAL-07 Reviews: Judge.me counts rendered but no aggregateRating; single platform (Medium)
- LOCAL-08 Contact page: no H1/meta, no hours, no map, hours only in homepage FAQ (Low)
- LOCAL-09 foundingDate 2020 vs registry 2022-06-07 (Low)
- LOCAL-10 availableLanguage Hungarian / no areaServed vs RO-only delivery (Low)
- LOCAL-11 GBP: not eligible as online-only; do not create; use Merchant Center + Organization (Info)
- LOCAL-12 No local authority signals; lint clean (Info)
