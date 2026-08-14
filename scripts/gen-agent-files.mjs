import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read site config directly or import
const siteConfigPath = path.join(rootDir, 'src', 'config', 'site.js');
const siteConfigRaw = fs.readFileSync(siteConfigPath, 'utf8');

// Parse key values from site.js
const domainMatch = siteConfigRaw.match(/domain:\s*['"]([^'"]+)['"]/);
const domain = domainMatch ? domainMatch[1] : 'liquorlocker.com.au';

const nameMatch = siteConfigRaw.match(/name:\s*['"]([^'"]+)['"]/);
const siteName = nameMatch ? nameMatch[1] : 'Liquor Locker AU';

const taglineMatch = siteConfigRaw.match(/tagline:\s*['"]([^'"]+)['"]/);
const tagline = taglineMatch ? taglineMatch[1] : "Australia's Premier Vault for Fine Spirits, Rare Whiskies & Craft Liquors";

const indexNowMatch = siteConfigRaw.match(/indexNowKey:\s*['"]([^'"]+)['"]/);
const indexNowKey = indexNowMatch ? indexNowMatch[1] : 'liquorlocker2026indexnowkey';

const minOrderMatch = siteConfigRaw.match(/minOrder:\s*(\d+)/);
const minOrder = minOrderMatch ? minOrderMatch[1] : '250';

const freeShippingMatch = siteConfigRaw.match(/freeShippingThreshold:\s*(\d+)/);
const freeShipping = freeShippingMatch ? freeShippingMatch[1] : '350';

const publicDir = path.join(rootDir, 'public');
const wellKnownDir = path.join(publicDir, '.well-known');
const mcpDir = path.join(wellKnownDir, 'mcp');
const skillsDir = path.join(wellKnownDir, 'agent-skills');
const jsDir = path.join(publicDir, 'js');

[publicDir, wellKnownDir, mcpDir, skillsDir, jsDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// 1. IndexNow Verification File
fs.writeFileSync(path.join(publicDir, `${indexNowKey}.txt`), indexNowKey, 'utf8');

// 2. robots.txt
const robotsTxt = `User-agent: *
Disallow: /thank-you-contact/
Disallow: /thank-you-order/
Disallow: /thank-you-wholesale/
Sitemap: https://${domain}/sitemap.xml

Content-Signal: search=yes, ai-input=yes, ai-train=no

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: cohere-ai
Allow: /

# Agent-readable resources
# llms.txt: https://${domain}/llms.txt
# API Catalog: https://${domain}/.well-known/api-catalog
# Agent Skills: https://${domain}/.well-known/agent-skills/index.json
# MCP Server Card: https://${domain}/.well-known/mcp/server-card.json
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

// 3. llms.txt
const llmsTxt = `# ${siteName}
> ${tagline}

${siteName} is Australia's premier climate-controlled vault and online boutique for rare single malt whiskies, artisanal Australian craft gins, extra añejo tequilas, small-batch bourbon, and museum-release fine wines delivered nationwide across Australia.

- **Minimum Vault Order:** $${minOrder} AUD
- **Free Express Shipping:** Orders over $${freeShipping} AUD
- **10% Crypto Discount:** Automatic 10% discount for Bitcoin (BTC) & Tether (USDT)
- **Payment Options:** PayID, Bank Transfer, Bitcoin, USDT
- **HQ Location:** Sydney, NSW 2000, Australia
- **Contact Email:** orders@${domain}
- **WhatsApp Concierge:** +61400123456

## Product Categories
- [Single Malt & Fine Whisky](https://${domain}/shop/single-malt-whisky/): Rare Tasmanian single malts, prestige Scotch, and Japanese allocations.
- [Artisanal Gin & Botanical Spirits](https://${domain}/shop/craft-gin/): Award-winning Yarra Valley and Sydney craft gins.
- [Premium Agave & Tequila](https://${domain}/shop/tequila-agave/): Handcrafted Extra Añejo, Reposado decanters, and artisanal mezcal.
- [Small Batch Bourbon & Rum](https://${domain}/shop/bourbon-dark-rum/): Rare Kentucky straight bourbon and aged dark rums.
- [Boutique Wines & Champagne](https://${domain}/shop/fine-wines-champagne/): Iconic Penfolds Grange, Barossa Shiraz, and vintage Champagnes.

## Wholesale & Corporate
- [Wholesale Inquiries](https://${domain}/wholesale/): Tiered bulk pricing and dedicated account management for licensed venues.

## Educational Content
- [Spirits Journal & Guides](https://${domain}/blog/): Expert collector guides on whisky investment, gin botanicals, and wine cellaring.

## Optional Agent Resources
- [API Catalog](https://${domain}/.well-known/api-catalog): Service directory and API endpoints.
- [Agent Skills](https://${domain}/.well-known/agent-skills/index.json): Declarative skills catalog for AI assistants.
- [MCP Server Card](https://${domain}/.well-known/mcp/server-card.json): Streamable HTTP MCP capability definition.
- [Auth Documentation](https://${domain}/auth.md): Authentication policy declaration.
`;
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf8');

// 4. auth.md
const authMd = `# Auth.md

## Site: ${siteName} — E-Commerce Vault

## Agent Registration
No authentication required. All catalog and public resources are accessible to agents.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | https://${domain}/shop/ |
| Journal & Blog | https://${domain}/blog/ |
| FAQ & Policies | https://${domain}/faq/ |
| Wholesale Portal | https://${domain}/wholesale/ |
| Products API | https://${domain}/api/products/ |
| MCP Endpoint | https://${domain}/api/mcp/ |

## Authentication

\`\`\`json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
\`\`\`

## Ordering Policy
Human-in-the-loop required. AI agents may search, browse, and prepare prefilled draft orders.
Orders are finalized and age-verified by human buyers via PayID, Bank Transfer, or WhatsApp.
`;
fs.writeFileSync(path.join(publicDir, 'auth.md'), authMd, 'utf8');

// 5. .well-known/api-catalog
const apiCatalog = {
  linkset: [
    { anchor: `https://${domain}/`, "https://www.iana.org/assignments/link-relations/service-doc": [{ href: `https://${domain}/faq/` }], title: `${siteName} — ${tagline}` },
    { anchor: `https://${domain}/shop/`, type: "text/html", title: `${siteName} Product Catalog` },
    { anchor: `https://${domain}/wholesale/`, type: "text/html", title: `${siteName} Wholesale` },
    { anchor: `https://${domain}/api/products`, type: "application/json", title: `${siteName} Products API` },
    { anchor: `https://${domain}/api/categories`, type: "application/json", title: `${siteName} Categories API` },
    { anchor: `https://${domain}/api/search`, type: "application/json", title: `${siteName} Search API` },
    { anchor: `https://${domain}/api/mcp`, type: "application/json", "https://www.iana.org/assignments/link-relations/service-desc": [{ href: `https://${domain}/.well-known/mcp/server-card.json` }], title: `${siteName} MCP Server` }
  ]
};
fs.writeFileSync(path.join(wellKnownDir, 'api-catalog'), JSON.stringify(apiCatalog, null, 2), 'utf8');

// 6. .well-known/agent-skills/index.json
const agentSkills = {
  "$schema": "https://agentskills.io/schema/v0.2.0/index.json",
  "name": siteName,
  "url": `https://${domain}`,
  "description": tagline,
  "skills": [
    { "name": "search-products", "type": "commerce", "description": "Search spirits, whiskies, gins, and wines by keyword, category, or price", "url": `https://${domain}/api/mcp`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "browse-catalog", "type": "navigation", "description": "Browse full liquor vault catalog by category", "url": `https://${domain}/shop/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "order-draft", "type": "commerce", "description": "Create prefilled order draft. Human completes age verification and payment.", "url": `https://${domain}/api/mcp`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "wholesale-inquiry", "type": "commerce", "description": "Wholesale pricing tiers and bulk liquor ordering for licensed venues", "url": `https://${domain}/wholesale/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "spirits-education", "type": "content", "description": "Spirits journal and collector guides", "url": `https://${domain}/blog/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "contact", "type": "support", "description": "Contact vault concierge for product inquiries", "url": `https://${domain}/contact/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" }
  ]
};
fs.writeFileSync(path.join(skillsDir, 'index.json'), JSON.stringify(agentSkills, null, 2), 'utf8');

// 7. .well-known/mcp/server-card.json
const mcpServerCard = {
  "$schema": "https://modelcontextprotocol.io/schemas/server-card/v1.json",
  "serverInfo": { "name": siteName, "version": "1.0.0", "description": tagline, "homepage": `https://${domain}`, "contact": { "email": `orders@${domain}`, "whatsapp": "+61400123456" } },
  "transport": { "type": "streamable-http", "endpoint": `https://${domain}/api/mcp` },
  "capabilities": {
    "tools": [
      { "name": "search_products", "description": "Search products by keyword, category, max_price", "inputSchema": { "type": "object", "properties": { "query": { "type": "string" }, "category": { "type": "string" }, "max_price": { "type": "number" } } } },
      { "name": "get_product", "description": "Get full product details by slug", "inputSchema": { "type": "object", "required": ["slug"], "properties": { "slug": { "type": "string" } } } },
      { "name": "list_categories", "description": "List all product categories", "inputSchema": { "type": "object", "properties": {} } },
      { "name": "get_policies", "description": "Get shipping, payment, returns policies", "inputSchema": { "type": "object", "properties": {} } },
      { "name": "create_order_draft", "description": "Create prefilled order URL. Human completes — never captures payment.", "inputSchema": { "type": "object", "properties": { "items": { "type": "array" }, "notes": { "type": "string" } } } }
    ],
    "resources": [
      { "name": "product-catalog", "description": "Full product catalog", "uri": `https://${domain}/shop/` },
      { "name": "wholesale", "description": "Wholesale pricing", "uri": `https://${domain}/wholesale/` },
      { "name": "blog", "description": "Spirits journal and guides", "uri": `https://${domain}/blog/` }
    ],
    "commerce": { "ordering": "human-assisted-whatsapp-or-form", "payment": ["bank-transfer", "payid", "crypto-BTC", "crypto-USDT"], "currency": "AUD", "minimumOrder": Number(minOrder), "freeShipping": Number(freeShipping) }
  },
  "legal": { "ageRestriction": "21+", "productType": "Fine Spirits & Wine", "compliance": "Liquor Act 2007: LIQP770010234. Enjoy Responsibly." }
};
fs.writeFileSync(path.join(mcpDir, 'server-card.json'), JSON.stringify(mcpServerCard, null, 2), 'utf8');

// 8. .well-known/oauth-protected-resource
const oauthProtected = {
  "resource": `https://${domain}`,
  "resource_name": `${siteName} Public Vault Catalog`,
  "authorization_servers": [],
  "scopes_supported": [],
  "bearer_methods_supported": [],
  "resource_documentation": `https://${domain}/auth.md`,
  "resource_policy_uri": `https://${domain}/terms/`,
  "tls_client_certificate_bound_access_tokens": false,
  "note": `All resources on ${domain} are publicly accessible. No OAuth tokens required.`
};
fs.writeFileSync(path.join(wellKnownDir, 'oauth-protected-resource'), JSON.stringify(oauthProtected, null, 2), 'utf8');

// 9. .well-known/oauth-authorization-server
const oauthAuthServer = {
  "issuer": `https://${domain}`,
  "authorization_endpoint": null,
  "token_endpoint": null,
  "jwks_uri": null,
  "grant_types_supported": [],
  "response_types_supported": [],
  "scopes_supported": [],
  "note": `${siteName} has no protected APIs. All resources publicly accessible.`,
  "public_resources": [
    `https://${domain}/shop/`,
    `https://${domain}/blog/`,
    `https://${domain}/faq/`,
    `https://${domain}/wholesale/`,
    `https://${domain}/llms.txt`,
    `https://${domain}/.well-known/api-catalog`,
    `https://${domain}/.well-known/agent-skills/index.json`,
    `https://${domain}/.well-known/mcp/server-card.json`
  ],
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No registration required. All content publicly accessible to agents."
  }
};
fs.writeFileSync(path.join(wellKnownDir, 'oauth-authorization-server'), JSON.stringify(oauthAuthServer, null, 2), 'utf8');

// 10. .well-known/openid-configuration
const openidConfig = {
  "issuer": `https://${domain}`,
  "note": `${siteName} does not operate an OpenID Connect provider. All resources publicly accessible.`,
  "public_site": true,
  "authorization_endpoint": null,
  "token_endpoint": null,
  "userinfo_endpoint": null,
  "jwks_uri": null,
  "scopes_supported": [],
  "response_types_supported": [],
  "grant_types_supported": [],
  "subject_types_supported": [],
  "id_token_signing_alg_values_supported": []
};
fs.writeFileSync(path.join(wellKnownDir, 'openid-configuration'), JSON.stringify(openidConfig, null, 2), 'utf8');

// 11. .well-known/acp.json
const acpJson = {
  "protocol": { "name": "acp", "version": "0.1.0" },
  "name": siteName,
  "description": tagline,
  "api_base_url": `https://${domain}`,
  "homepage": `https://${domain}`,
  "transports": ["https"],
  "capabilities": {
    "services": ["product-catalog", "wholesale", "blog", "faq", "mcp-server"],
    "ordering": "human-assisted",
    "payment_methods": ["bank-transfer", "payid", "crypto-BTC", "crypto-USDT"],
    "currency": "AUD",
    "minimum_order_usd": Number(minOrder),
    "free_shipping_threshold_usd": Number(freeShipping)
  },
  "contact": { "whatsapp": "https://wa.me/61400123456", "email": `orders@${domain}` },
  "legal": { "age_restriction": "21+", "region": "Australia", "ships_to": "Nationwide Australia", "productType": "Spirits & Wine", "compliance": "LIQP770010234" }
};
fs.writeFileSync(path.join(wellKnownDir, 'acp.json'), JSON.stringify(acpJson, null, 2), 'utf8');

// 12. .well-known/ucp
const ucpJson = {
  "ucp": "1.0",
  "protocol_version": "1.0",
  "spec": "https://ucp.dev/specification/overview/",
  "schema": "https://ucp.dev/schema/v1.json",
  "site": `https://${domain}`,
  "name": siteName,
  "description": tagline,
  "services": [
    { "id": "product-catalog", "type": "catalog", "url": `https://${domain}/shop/`, "description": "Full product catalog" },
    { "id": "mcp-server", "type": "mcp", "url": `https://${domain}/api/mcp`, "description": "MCP Streamable HTTP server" },
    { "id": "order", "type": "commerce", "url": "https://wa.me/61400123456", "description": "Place orders via WhatsApp Concierge" },
    { "id": "wholesale", "type": "b2b", "url": `https://${domain}/wholesale/`, "description": "Wholesale pricing and bulk ordering" }
  ],
  "capabilities": ["browse", "search", "inquiry", "wholesale", "content", "mcp"],
  "endpoints": {
    "mcp": `https://${domain}/api/mcp`,
    "catalog": `https://${domain}/shop/`,
    "contact": `https://${domain}/contact/`,
    "agent_skills": `https://${domain}/.well-known/agent-skills/index.json`,
    "mcp_server_card": `https://${domain}/.well-known/mcp/server-card.json`,
    "api_catalog": `https://${domain}/.well-known/api-catalog`,
    "llms_txt": `https://${domain}/llms.txt`
  },
  "currency": "AUD",
  "minimum_order_usd": Number(minOrder),
  "payment_methods": ["bank-transfer", "payid", "crypto-BTC", "crypto-USDT"],
  "legal": { "age_restriction": "21+", "product_type": "Spirits & Wine", "compliance": "Liquor License LIQP770010234" }
};
fs.writeFileSync(path.join(wellKnownDir, 'ucp'), JSON.stringify(ucpJson, null, 2), 'utf8');

// 13. /js/webmcp.js
const webmcpJs = `(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search ${siteName} spirits, whiskies, gins, and wines by keyword, category, or price",
        inputSchema: { type: "object", properties: { query: { type: "string" }, category: { type: "string" }, max_price: { type: "number" } } },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', max_price);
          const res = await fetch(\`https://${domain}/api/search?\${params}\`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse products by category in the liquor vault",
        inputSchema: { type: "object", properties: { category: { type: "string" } } },
        execute: async ({ category }) => {
          const url = category ? \`https://${domain}/shop/\${category}/\` : \`https://${domain}/shop/\`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate a WhatsApp order with vault concierge. Minimum order $${minOrder} AUD. Age verification required.",
        inputSchema: { type: "object", properties: { message: { type: "string" } } },
        execute: async ({ message }) => {
          const url = message ? \`https://wa.me/61400123456?text=\${encodeURIComponent(message)}\` : \`https://wa.me/61400123456\`;
          window.open(url, '_blank');
          return { url };
        }
      },
      {
        name: "get_wholesale_info",
        description: "Get wholesale pricing tiers for licensed venues",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = \`https://${domain}/wholesale/\`;
          return { url: \`https://${domain}/wholesale/\` };
        }
      },
      {
        name: "contact",
        description: "Contact ${siteName} vault support",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = \`https://${domain}/contact/\`;
          return { url: \`https://${domain}/contact/\` };
        }
      }
    ]
  });
})();
`;
fs.writeFileSync(path.join(jsDir, 'webmcp.js'), webmcpJs, 'utf8');

console.log('Successfully generated all agent-ready files in public/ and .well-known/');
