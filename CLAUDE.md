PraJá.studio is a **fictional** landing page (study prototype) for a studio that ships startup pages in one day. All brand names, prices, guarantees and the WhatsApp number `(00) 00000-0000` are invented — keep it that way; don't add real contact data or claims.
The results dashboard is the one exception: it shows real, anonymous counts of this page from `/api/stats`. Never put invented numbers back in it, and label it as this page's data, not client results. Tracking stores daily totals only: no cookies, IP, user agent or briefing text.
```bash
npx serve .
```
- Design rules for anything visual are in @DESIGN.md
- That file says what the page should be: if the CSS disagrees, the file wins. Don't copy styles from the existing code.
- Visual language derives from the bolt logo: skewed parallelograms for buttons, markers and dividers. 
- The gallery examples (Grana, Torra, Fluxo, Sprint Zero) intentionally use their own colors/fonts.
- Delivery ETA (`eta()`) is computed in **Brasília time** via `toBRT()` (`America/Sao_Paulo`), not the visitor's clock: before 15h on a weekday the 24h starts now; otherwise at 9h of the next business day. The 15h cutoff is also stated in the cutoff card copy and the FAQ — change all three together.
assets/og.png` (1200×630 Open Graph image) is a screenshot of `assets/og.html` — edit the HTML and recapture rather than editing the PNG. `assets/preview.png` is the README screenshot. If the brand/name changes, update `<title>`, meta tags, the header logo SVG, the inline favicon and `assets/og.html`.