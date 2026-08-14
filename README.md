# Liquor Locker AU — Premium Online Spirits Boutique

Liquor Locker AU is Australia's premier online boutique and climate-controlled vault for rare single malt whiskies, small-batch craft gins, extra añejo tequilas, and iconic Australian wines.

## Key Features
- **Mobile-First Luxury UI:** Custom dark charcoal & warm gold aesthetic designed for mobile viewports up to ultra-wide displays.
- **Age Verification Gate:** 21+ compliance gate in accordance with Australian RSA standards and Liquor Act 2007.
- **Interactive Vault Cart & Checkout:** Live minimum order validation ($250 AUD), free shipping progress bar ($350 AUD threshold), 10% instant Crypto discount calculation, PayID & Bank Transfer support, and WhatsApp Concierge integration.
- **Agent-Ready Ecosystem:** Full implementation of MCP Streamable HTTP server (`/api/mcp`), ACP (`.well-known/acp.json`), UCP (`.well-known/ucp`), OpenAPI Linksets (`.well-known/api-catalog`), `llms.txt`, and `webmcp.js`.
- **Search & Filter:** Instant client-side search and category filtering with JSON-LD schema integration.

## Getting Started

```bash
# Install dependencies
npm install

# Generate agent static files
npm run gen

# Run development server
npm run dev

# Run pre-ship crosscheck verification
npm run crosscheck

# Build for production
npm run build
```

## Deployment to Vercel
1. Push code to GitHub repository.
2. Import repository in Vercel Dashboard.
3. Ensure **Framework Preset** is set to **Next.js**.
4. Deploy.
