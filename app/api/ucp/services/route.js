import { SITE, SHOP } from '@/config/site';

export async function GET() {
  return Response.json(
    {
      ucp: '1.0',
      services: [
        {
          id: 'product-catalog',
          type: 'catalog',
          url: `https://${SITE.domain}/shop/`,
          description: 'Full spirits and wine vault catalog',
        },
        {
          id: 'mcp-server',
          type: 'mcp',
          url: `https://${SITE.domain}/api/mcp`,
          description: 'MCP Streamable HTTP server',
        },
        {
          id: 'wholesale',
          type: 'b2b',
          url: `https://${SITE.domain}/wholesale/`,
          description: 'Wholesale licensing and bulk pricing',
        },
      ],
      currency: SITE.currency,
      minimumOrder: SHOP.minOrder,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
