import { SITE, CATEGORIES, PRODUCTS, POSTS, COLLECTIONS } from '@/config/site';
import { BRANDS_DATA } from '@/config/brands';
import { SEO_LANDING_PAGES, SEO_COMBINATION_PAGES } from '@/config/seoPages';

export default async function sitemap() {
  const baseUrl = `https://${SITE.domain}`;
  const now = new Date().toISOString();

  // Static core pages
  const staticPages = [
    '',
    '/shop/',
    '/shop/specials/',
    '/shop/gifts/',
    '/brands/',
    '/about/',
    '/blog/',
    '/contact/',
    '/faq/',
    '/wholesale/',
    '/search/',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Brand Pages
  const brandPages = BRANDS_DATA.map((brand) => ({
    url: `${baseUrl}/brands/${brand.slug}/`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // Collections
  const collectionPages = COLLECTIONS.map((col) => ({
    url: `${baseUrl}/shop/collections/${col.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Main Categories & Subcategories (2-Level Permanent Taxonomy)
  const categoryPages = [];
  CATEGORIES.forEach((cat) => {
    // Level 1: Main Category
    categoryPages.push({
      url: `${baseUrl}/${cat.slug}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    });

    // Level 2: Subcategory
    cat.subcategories?.forEach((sub) => {
      categoryPages.push({
        url: `${baseUrl}/${cat.slug}/${sub.slug}/`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.85,
      });
    });
  });

  // SEO Landing Pages & Combination Pages (Controlled Indexation System)
  const allSeoPages = [...SEO_LANDING_PAGES, ...SEO_COMBINATION_PAGES];
  const seoLandingPages = allSeoPages.map((page) => ({
    url: `${baseUrl}/${page.mainCategory}/${page.subCategory}/${page.slug}/`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // Products with Image metadata
  const productPages = PRODUCTS.map((p) => {
    const catSlug = p.primaryCategory || p.category || 'spirits';
    return {
      url: `${baseUrl}/shop/${catSlug}/${p.slug}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
      images: p.images ? p.images.map((img) => (img.startsWith('http') ? img : `${baseUrl}${img}`)) : [],
    };
  });

  // Blog Posts
  const blogPages = POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...brandPages,
    ...collectionPages,
    ...categoryPages,
    ...seoLandingPages,
    ...productPages,
    ...blogPages,
  ];
}
