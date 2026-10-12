# Visual / above-the-fold findings: primesupplements.ro (2026-10-12)

Category: Visual & mobile rendering (part of Technical/SXO weighting). Method: claude-seo `seo-visual` approach executed with a local Playwright (Chromium 1194) run through the sandbox proxy, 390x844 mobile viewport (iPhone UA, DPR 2) and 1366x900 desktop viewport, `load` event + 1.5 s settle, no cookie consent given. Screenshots: `scratchpad/visual/*.png` (home, collection creatina, product creatina-creapure, blog article), DOM probes (title, H1, scroll width, viewport meta, images without alt, CTAs above the fold).

## Scope & method
- Pages: `/`, `/collections/creatina`, `/products/creatina-creapure`, `/blogs/news/ce-este-un-pre-workout-fara-cofeina` (mobile + desktop where relevant).
- Probe results (all 200 except the article URL typed with the old `/blogs/blog/` path, which correctly returns 404): no horizontal overflow on any page (`scrollWidth == innerWidth` at 390 px and 1366 px), body font 14 px mobile / 16 px desktop, viewport meta present but with `maximum-scale=1.0` (fixed in the staging theme).
- Could not check: real-device rendering, Lighthouse/CWV lab metrics (no Chrome DevTools protocol quota in this environment), interaction after consent.

## Score
**48/100**. The theme renders cleanly and responsively, but on first visit the Pandectes cookie banner covers the whole viewport on mobile (full-screen modal) and the centre of the hero on desktop, hiding the H1, the hero CTA and the first products. Mobile product pages show no add-to-cart button above the fold; the sticky WhatsApp bubble overlaps the first product card.

## What works
- Responsive layout with no horizontal scrolling at 390 px; text is legible (14 px minimum) and tap targets are large.
- Collection pages render the H1 and the new collection description inside the banner (`/collections/creatina` shows "Creatina" + the first paragraph of the new copy), so the keyword-bearing text is visible without scrolling on desktop.
- Product page: title, rating stars, price, "Produs în Uniunea Europeană" badge and stock status are visible under the gallery; variant selector is clear.
- Announcement bar communicates free shipping ≥ 300 RON (matches the new shippingDetails markup).

## Findings

### VISUAL-01 [High] Cookie banner is a full-screen modal on mobile and hides the hero on desktop
- Evidence: `visual/home-mobile.png`, `visual/product-creapure-mobile.png`, `visual/collection-creatina-mobile.png`, `visual/home-desktop.png`: the Pandectes consent dialog ("Acest site web folosește cookie-uri…", Accept / Preferințe) covers 100% of the 390x844 viewport and the centre 30% of the desktop hero. No content is readable until the visitor acts.
- Affected scope: every page, every first visit (mobile ≈ 70% of traffic for this vertical).
- Why it matters: Google's intrusive-interstitial guidance applies to content that is hard to access on mobile; the overlay also inflates LCP (the dialog becomes the LCP element) and hides the CTA, increasing bounce.
- Recommendation: switch the Pandectes banner to a bottom sheet / compact bar (Pandectes → Banner → Layout "Bar" or "Box bottom-left"), keep "Accept"/"Reject" equal, and defer non-essential scripts until consent. Keep the H1 and hero CTA unobstructed.
- Falsifiability: a mobile screenshot of `/` on first visit shows the H1 and "Vezi produse" CTA without dismissing the banner.
- Leading indicator: mobile bounce rate on landing pages, LCP element in CrUX.
- Effort: S · Confidence: 0.95

### VISUAL-02 [Medium] Mobile product page has no add-to-cart CTA above the fold
- Evidence: DOM probe on `/products/creatina-creapure` at 390x844: `ctaAboveFold = []` (desktop shows "Adaugă în coș"). The gallery takes the first 530 px, then rating, price, badges, variant selector; the button appears only after scrolling.
- Recommendation: enable the Impact theme's sticky add-to-cart bar (Theme settings → Product page → "Show sticky add-to-cart"), reduce gallery height on mobile (aspect ratio "short"), or move the price + button block above the badges.
- Falsifiability: mobile screenshot shows the add-to-cart button inside the first viewport.
- Leading indicator: mobile add-to-cart rate.
- Effort: S · Confidence: 0.9

### VISUAL-03 [Medium] Homepage H1 is the brand name only; headline keyword is an image-styled heading
- Evidence: probe `h1 = ["Prime Supplements"]`; the visible headline "HARDCORE SPORTS NUTRITION" is a non-H1 element inside the hero. The homepage has no Romanian keyword in its H1.
- Recommendation: make the hero heading an H1 that reads "Suplimente nutritive pentru sport: creatină, proteine, pre-workout" (brand stays in the logo and title tag), demote "Prime Supplements" to a kicker.
- Falsifiability: `document.querySelector('h1').innerText` contains "Suplimente".
- Effort: S · Confidence: 0.85

### VISUAL-04 [Low] 24 images on the homepage render without alt text (theme/section images)
- Evidence: probe `imgsNoAlt = 24 of 127` on `/` after the product-image alt fix was applied (product images now carry alt). The remainder are hero/banner/section images and logo variants configured in theme sections.
- Recommendation: in Theme editor, set the alt text on each image picker (hero, category tiles, "Despre noi" banner, payment icons are decorative → empty alt is fine, but the logo must read "Prime Supplements").
- Effort: S · Confidence: 0.9

### VISUAL-05 [Low] Floating WhatsApp widget overlaps product cards on mobile
- Evidence: `home-mobile.png`, `collection-creatina-mobile.png`: the green bubble covers the lower-right product card and the "Filtrează și sortează" control area.
- Recommendation: reduce the bubble size on mobile or add a bottom offset above the sticky filter bar; hide it on the cart/checkout pages.
- Effort: S · Confidence: 0.8

## Limitations
- Screenshots were taken without consent interaction; the layout after "Accept" was not captured.
- No real-device or Lighthouse measurement; the findings are structural, not metric-based.
