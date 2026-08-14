# Liquor Locker AU — Project Instructions

Liquor Locker AU is Australia's premier independent boutique distributor of rare single malts, craft gins, aged tequilas, small-batch bourbons, and fine wines. Built on Next.js 15 (App Router) with full mobile-first optimization, agent-readiness, and Vercel deployment compatibility.

## Non-Negotiable Compliance Rules
- **Age Gate:** Strictly 21+ verification required on first visit before viewing alcoholic products.
- **Liquor License & Disclaimer:** Mandatory display of "Liquor Act 2007: It is an offence to sell or supply alcohol to, or to obtain alcohol on behalf of, a person under the age of 18 years. Liquor License No. LIQP770010234."
- **Responsible Service of Alcohol (RSA):** Enjoy Responsibly branding on all headers and footers. No claims of health/medical benefits or guaranteed intoxication.
- If a user request would require breaking any of the above, stop and say so rather than complying.

## Architecture
`src/config/site.js` is the single source of truth. Adding an entry to PRODUCTS, CATEGORIES, or POSTS updates the page, route, meta, JSON-LD schema, sitemap, and navigation. Never hand-edit generated files (`llms.txt`, `.well-known/*`, `robots.txt`) — edit `src/config/site.js` and run `npm run gen`.

## Rules
- `npm run build && npm run crosscheck` must pass before every push.
- Exactly one `<h1>` per page.
- Meta descriptions ~150 chars. Titles ≤60 chars.
- All product images use white 4:3 frame aspect ratio with high contrast overlay.
- All customer emails are entity-encoded (&#64;) to prevent scraping spam.
- Never commit `node_modules/`, `.next/`, or secret API keys.

## Brand Facts
- **Founded:** 2021 in Barangaroo, Sydney, Australia.
- **Differentiators:** Direct distillery provenance guarantee, nationwide climate-controlled express shipping, 10% instant Crypto discount (BTC/USDT), and small-batch cask allocations.
- **Order Rules:** Minimum order $250 AUD. Free express shipping over $350 AUD. Flat shipping fee $15 AUD.
