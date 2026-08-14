import { PRODUCTS, POSTS, SITE } from '@/config/site';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category');
  const max_price = searchParams.get('max_price');

  const term = q.toLowerCase();

  let matchingProducts = PRODUCTS;
  if (category) {
    matchingProducts = matchingProducts.filter((p) => p.category === category);
  }
  if (term) {
    matchingProducts = matchingProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term)
    );
  }
  if (max_price) {
    const maxP = parseFloat(max_price);
    if (!isNaN(maxP)) {
      matchingProducts = matchingProducts.filter((p) => p.price <= maxP);
    }
  }

  let matchingPosts = POSTS;
  if (term) {
    matchingPosts = matchingPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term)
    );
  }

  return Response.json(
    {
      query: q,
      products: matchingProducts.map((p) => ({
        ...p,
        currency: SITE.currency,
        url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
      })),
      posts: matchingPosts.map((post) => ({
        ...post,
        url: `https://${SITE.domain}/blog/${post.slug}/`,
      })),
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60',
      },
    }
  );
}
