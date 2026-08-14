import { PRODUCTS, SITE } from '@/config/site';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const brand = searchParams.get('brand');
  const q = searchParams.get('q');
  const limit = searchParams.get('limit');

  let results = PRODUCTS;

  if (category) {
    results = results.filter(
      (p) => p.primaryCategory === category || p.category === category
    );
  }

  if (subcategory) {
    results = results.filter((p) => p.primarySubcategory === subcategory);
  }

  if (brand) {
    results = results.filter((p) => p.brand?.toLowerCase() === brand.toLowerCase());
  }

  if (q) {
    const term = q.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.brand || '').toLowerCase().includes(term) ||
        (p.description || '').toLowerCase().includes(term) ||
        (p.shortDescription || '').toLowerCase().includes(term)
    );
  }

  if (limit) {
    const num = parseInt(limit, 10);
    if (!isNaN(num)) {
      results = results.slice(0, num);
    }
  }

  const enriched = results.map((p) => {
    const catSlug = p.primaryCategory || p.category;
    return {
      ...p,
      currency: SITE.currency,
      url: `https://${SITE.domain}/shop/${catSlug}/${p.slug}/`,
    };
  });

  return Response.json(
    { products: enriched, total: enriched.length },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
