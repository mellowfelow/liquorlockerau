import { CATEGORIES, PRODUCTS, SITE } from '@/config/site';

export async function GET() {
  const enriched = CATEGORIES.map((cat) => {
    const mainCategoryProducts = PRODUCTS.filter(
      (p) => p.primaryCategory === cat.slug || p.category === cat.slug
    );

    const subcategoriesWithCount = cat.subcategories.map((sub) => ({
      ...sub,
      productCount: PRODUCTS.filter(
        (p) =>
          (p.primaryCategory === cat.slug || p.category === cat.slug) &&
          p.primarySubcategory === sub.slug
      ).length,
      url: `https://${SITE.domain}/${cat.slug}/${sub.slug}/`,
    }));

    return {
      slug: cat.slug,
      name: cat.name,
      description: cat.description,
      image: cat.image,
      productCount: mainCategoryProducts.length,
      url: `https://${SITE.domain}/${cat.slug}/`,
      subcategories: subcategoriesWithCount,
    };
  });

  return Response.json(
    { categories: enriched },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
