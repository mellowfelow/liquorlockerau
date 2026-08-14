import { PRODUCTS, CATEGORIES, SHOP, SITE, COMPLIANCE } from '@/config/site';

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id',
    },
  });
}

export async function GET() {
  return Response.json(
    {
      name: SITE.name,
      version: '1.0.0',
      transport: 'streamable-http',
      endpoint: `https://${SITE.domain}/api/mcp`,
      status: 'active',
      capabilities: ['tools/list', 'tools/call'],
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { jsonrpc, id, method, params } = body || {};

    if (jsonrpc !== '2.0') {
      return Response.json(
        { jsonrpc: '2.0', id: id || null, error: { code: -32600, message: 'Invalid Request: Must be JSON-RPC 2.0' } },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    if (method === 'initialize') {
      return Response.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            serverInfo: { name: SITE.name, version: '1.0.0' },
          },
        },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    if (method === 'tools/list') {
      return Response.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            tools: [
              {
                name: 'search_products',
                description: 'Search Australian craft beer, fine wine, spirits, RTDs, cider, and mixers by query, category, max_price',
                inputSchema: {
                  type: 'object',
                  properties: {
                    query: { type: 'string' },
                    category: { type: 'string' },
                    max_price: { type: 'number' },
                  },
                },
              },
              {
                name: 'get_product',
                description: 'Get full details of a specific bottle by slug',
                inputSchema: {
                  type: 'object',
                  required: ['slug'],
                  properties: { slug: { type: 'string' } },
                },
              },
              {
                name: 'list_categories',
                description: 'List all bottle shop 2-level main categories and subcategories',
                inputSchema: { type: 'object', properties: {} },
              },
              {
                name: 'get_policies',
                description: 'Get bottle shop shipping, minimum order, crypto discount, and RSA policies',
                inputSchema: { type: 'object', properties: {} },
              },
              {
                name: 'create_order_draft',
                description: 'Create prefilled order draft URL for human verification and payment',
                inputSchema: {
                  type: 'object',
                  properties: {
                    items: { type: 'array' },
                    notes: { type: 'string' },
                  },
                },
              },
            ],
          },
        },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    if (method === 'tools/call') {
      const { name, arguments: args } = params || {};

      if (name === 'search_products') {
        const { query = '', category = '', max_price } = args || {};
        let results = PRODUCTS;

        if (category) {
          results = results.filter((p) => p.primaryCategory === category || p.category === category);
        }
        if (query) {
          const q = query.toLowerCase();
          results = results.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              (p.brand || '').toLowerCase().includes(q) ||
              (p.description || '').toLowerCase().includes(q) ||
              (p.shortDescription || '').toLowerCase().includes(q)
          );
        }
        if (max_price) {
          results = results.filter((p) => p.price <= max_price);
        }

        return Response.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    results.map((p) => {
                      const catSlug = p.primaryCategory || p.category;
                      return {
                        slug: p.slug,
                        name: p.name,
                        brand: p.brand,
                        price: p.price,
                        currency: SITE.currency,
                        category: catSlug,
                        subcategory: p.primarySubcategory,
                        abv: p.attributes?.abv,
                        url: `https://${SITE.domain}/shop/${catSlug}/${p.slug}/`,
                      };
                    })
                  ),
                },
              ],
            },
          },
          { headers: { 'Access-Control-Allow-Origin': '*' } }
        );
      }

      if (name === 'get_product') {
        const { slug } = args || {};
        const product = PRODUCTS.find((p) => p.slug === slug);
        if (!product) {
          return Response.json(
            { jsonrpc: '2.0', id, error: { code: -32602, message: 'Product slug not found' } },
            { headers: { 'Access-Control-Allow-Origin': '*' } }
          );
        }
        const catSlug = product.primaryCategory || product.category;
        return Response.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    ...product,
                    currency: SITE.currency,
                    url: `https://${SITE.domain}/shop/${catSlug}/${product.slug}/`,
                  }),
                },
              ],
            },
          },
          { headers: { 'Access-Control-Allow-Origin': '*' } }
        );
      }

      if (name === 'list_categories') {
        return Response.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    CATEGORIES.map((c) => ({
                      slug: c.slug,
                      name: c.name,
                      description: c.description,
                      productCount: PRODUCTS.filter((p) => p.primaryCategory === c.slug || p.category === c.slug).length,
                      url: `https://${SITE.domain}/${c.slug}/`,
                      subcategories: c.subcategories.map((sub) => ({
                        slug: sub.slug,
                        name: sub.name,
                        description: sub.description,
                        url: `https://${SITE.domain}/${c.slug}/${sub.slug}/`,
                      })),
                    }))
                  ),
                },
              ],
            },
          },
          { headers: { 'Access-Control-Allow-Origin': '*' } }
        );
      }

      if (name === 'get_policies') {
        return Response.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    minOrder: SHOP.minOrder,
                    freeShippingThreshold: SHOP.freeShippingThreshold,
                    shippingFee: SHOP.shippingFee,
                    cryptoDiscountPercent: SHOP.cryptoDiscount,
                    paymentMethods: SHOP.paymentMethods,
                    currency: SITE.currency,
                    compliance: COMPLIANCE.disclaimer,
                  }),
                },
              ],
            },
          },
          { headers: { 'Access-Control-Allow-Origin': '*' } }
        );
      }

      if (name === 'create_order_draft') {
        const { items = [], notes = '' } = args || {};
        return Response.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    status: 'draft_created',
                    notes,
                    items,
                    minOrderRequired: SHOP.minOrder,
                    checkoutUrl: `https://${SITE.domain}/shop/`,
                    whatsappConciergeUrl: `https://wa.me/61400123456`,
                    instructions: 'Order draft logged. Complete payment & RSA age verification via WhatsApp or PayID.',
                  }),
                },
              ],
            },
          },
          { headers: { 'Access-Control-Allow-Origin': '*' } }
        );
      }
    }

    return Response.json(
      { jsonrpc: '2.0', id, error: { code: -32601, message: 'Method not found' } },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (error) {
    return Response.json(
      { jsonrpc: '2.0', id: null, error: { code: -32603, message: 'Internal Server Error' } },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
