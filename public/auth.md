# Auth.md

## Site: Liquor Locker AU — E-Commerce Vault

## Agent Registration
No authentication required. All catalog and public resources are accessible to agents.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | https://liquorlocker.com.au/shop/ |
| Journal & Blog | https://liquorlocker.com.au/blog/ |
| FAQ & Policies | https://liquorlocker.com.au/faq/ |
| Wholesale Portal | https://liquorlocker.com.au/wholesale/ |
| Products API | https://liquorlocker.com.au/api/products/ |
| MCP Endpoint | https://liquorlocker.com.au/api/mcp/ |

## Authentication

```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
```

## Ordering Policy
Human-in-the-loop required. AI agents may search, browse, and prepare prefilled draft orders.
Orders are finalized and age-verified by human buyers via PayID, Bank Transfer, or WhatsApp.
