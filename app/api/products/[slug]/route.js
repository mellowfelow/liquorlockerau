import { PRODUCTS, SITE } from '@/config/site';

export async function GET(request, { params }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return Response.json(
      { error: 'Product bottle not found' },
      { status: 404, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  return Response.json(
    {
      ...product,
      currency: SITE.currency,
      url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
