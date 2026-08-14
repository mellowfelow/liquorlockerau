(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search Liquor Locker AU spirits, whiskies, gins, and wines by keyword, category, or price",
        inputSchema: { type: "object", properties: { query: { type: "string" }, category: { type: "string" }, max_price: { type: "number" } } },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', max_price);
          const res = await fetch(`https://liquorlocker.com.au/api/search?${params}`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse products by category in the liquor vault",
        inputSchema: { type: "object", properties: { category: { type: "string" } } },
        execute: async ({ category }) => {
          const url = category ? `https://liquorlocker.com.au/shop/${category}/` : `https://liquorlocker.com.au/shop/`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate a WhatsApp order with vault concierge. Minimum order $250 AUD. Age verification required.",
        inputSchema: { type: "object", properties: { message: { type: "string" } } },
        execute: async ({ message }) => {
          const url = message ? `https://wa.me/61400123456?text=${encodeURIComponent(message)}` : `https://wa.me/61400123456`;
          window.open(url, '_blank');
          return { url };
        }
      },
      {
        name: "get_wholesale_info",
        description: "Get wholesale pricing tiers for licensed venues",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://liquorlocker.com.au/wholesale/`;
          return { url: `https://liquorlocker.com.au/wholesale/` };
        }
      },
      {
        name: "contact",
        description: "Contact Liquor Locker AU vault support",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://liquorlocker.com.au/contact/`;
          return { url: `https://liquorlocker.com.au/contact/` };
        }
      }
    ]
  });
})();
