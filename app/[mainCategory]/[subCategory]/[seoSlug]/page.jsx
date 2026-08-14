import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE, CATEGORIES, PRODUCTS } from '@/config/site';
import { SEO_LANDING_PAGES, SEO_COMBINATION_PAGES } from '@/config/seoPages';
import CategoryProductsClient from '@/components/CategoryProductsClient';
import JsonLd from '@/components/JsonLd';
import { ShieldCheck, Award, Truck, HelpCircle, ChevronRight, Sparkles, BookOpen, Layers } from 'lucide-react';

// Pre-render all SEO Landing Pages & Combination Pages at build time
export async function generateStaticParams() {
  const allSeoPages = [...SEO_LANDING_PAGES, ...SEO_COMBINATION_PAGES];
  return allSeoPages.map((page) => ({
    mainCategory: page.mainCategory,
    subCategory: page.subCategory,
    seoSlug: page.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { mainCategory, subCategory, seoSlug } = await params;
  const allSeoPages = [...SEO_LANDING_PAGES, ...SEO_COMBINATION_PAGES];
  const page = allSeoPages.find(
    (p) => p.mainCategory === mainCategory && p.subCategory === subCategory && p.slug === seoSlug
  );

  if (!page) return {};

  const canonicalUrl = `https://${SITE.domain}/${page.mainCategory}/${page.subCategory}/${page.slug}/`;

  return {
    title: page.title || `${page.name} | Liquor Locker AU Vault`,
    description: page.metaDescription || page.intro,
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.metaDescription,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function SeoLandingPageRoute({ params }) {
  const { mainCategory, subCategory, seoSlug } = await params;
  const allSeoPages = [...SEO_LANDING_PAGES, ...SEO_COMBINATION_PAGES];
  const page = allSeoPages.find(
    (p) => p.mainCategory === mainCategory && p.subCategory === subCategory && p.slug === seoSlug
  );

  if (!page) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === mainCategory) || {
    name: mainCategory.replace('-', ' ').toUpperCase(),
    slug: mainCategory,
  };
  const sub = category.subcategories?.find((s) => s.slug === subCategory) || {
    name: subCategory.replace('-', ' ').toUpperCase(),
    slug: subCategory,
  };

  // Filter products matching this SEO landing page
  const matchedProducts = PRODUCTS.filter((product) => {
    // 1. Check primary category match
    if (product.primaryCategory && product.primaryCategory !== page.mainCategory) {
      return false;
    }
    
    // Strict Single Malt filter for single-malt-whisky collection page
    if (seoSlug === 'single-malt-whisky') {
      const isSM = (product.whiskyType === 'Single Malt' || product.styleOrVariety === 'Single Malt') && !product.name.toLowerCase().includes('blended');
      if (!isSM) return false;
    }

    // 2. Check criteria filters if provided
    if (product.primaryCategory && product.primaryCategory !== page.mainCategory) {
      return false;
    }

    // 2. Check criteria filters if provided
    const crit = page.filterCriteria;
    if (crit) {
      if (crit.subcategory && product.primarySubcategory && product.primarySubcategory !== crit.subcategory) {
        // Soft match if collections include it
      }
      if (crit.country && product.countryOfOrigin && !product.countryOfOrigin.toLowerCase().includes(crit.country.toLowerCase())) {
        return false;
      }
      if (crit.brand && product.brand && !product.brand.toLowerCase().includes(crit.brand.toLowerCase())) {
        return false;
      }
      if (crit.region && product.regionOrState && !product.regionOrState.toLowerCase().includes(crit.region.toLowerCase())) {
        return false;
      }
      if (crit.dietary && product.dietary && !product.dietary.some((d) => d.toLowerCase().includes(crit.dietary.toLowerCase()))) {
        return false;
      }
      if (crit.styleKeywords && crit.styleKeywords.length > 0) {
        const textToSearch = `${product.name} ${product.styleOrVariety || ''} ${product.description || ''} ${product.collections?.join(' ') || ''}`.toLowerCase();
        const matchesKeyword = crit.styleKeywords.some((kw) => textToSearch.includes(kw.toLowerCase()));
        if (!matchesKeyword) return false;
      }
    }

    // 3. Check direct collection tag or fallback category match
    if (product.collections && product.collections.includes(page.slug)) {
      return true;
    }

    return true;
  });

  // Fallback: If filtered list is small, show category products so user has items to purchase
  const displayProducts = matchedProducts.length > 0
    ? matchedProducts
    : PRODUCTS.filter((p) => p.primaryCategory === mainCategory);

  const canonicalUrl = `https://${SITE.domain}/${page.mainCategory}/${page.subCategory}/${page.slug}/`;

  // Structured Data (JSON-LD)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${SITE.domain}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: `https://${SITE.domain}/${category.slug}/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: sub.name,
        item: `https://${SITE.domain}/${category.slug}/${sub.slug}/`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: page.name,
        item: canonicalUrl,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: page.title || page.name,
    description: page.metaDescription || page.intro,
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: displayProducts.slice(0, 10).map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: p.name,
        url: `https://${SITE.domain}/shop/${p.primaryCategory || 'spirits'}/${p.slug}/`,
      })),
    },
  };

  const faqSchema = page.faqs && page.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <div className="bg-[#08140E] min-h-screen py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-400 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <Link href={`/${category.slug}/`} className="hover:text-white transition-colors">{category.name}</Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <Link href={`/${category.slug}/${sub.slug}/`} className="hover:text-white transition-colors">{sub.name}</Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-[#D4AF37] font-semibold">{page.name}</span>
          </nav>

          {/* Hero Banner Header with Single H1 */}
          <header className="relative rounded-2xl border border-[#1A3828] bg-gradient-to-br from-[#0E2017] via-[#0B1A12] to-[#08140E] p-6 sm:p-10 mb-10 overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A3828]/60 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono tracking-wider uppercase mb-3">
                <Sparkles className="w-3 h-3" />
                <span>INDEXED VAULT CATEGORY • {page.name}</span>
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                {page.h1 || page.name}
              </h1>

              <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                {page.intro}
              </p>

              {/* Trust Signal Badges */}
              <div className="mt-6 pt-6 border-t border-[#1A3828] flex flex-wrap gap-4 text-xs text-gray-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% Verified Authentic Stock</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Climate-Controlled Australia-Wide Transit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span>Bonded Vault Cellaring</span>
                </div>
              </div>
            </div>

            {/* Background Decorative Pattern */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37] via-transparent to-transparent"></div>
          </header>

          {/* Live Product Showcase with Full Filtering and Add to Cart */}
          <section className="mb-14" aria-label="Products in this collection">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#D4AF37]" />
                  <span>Available In Vault ({displayProducts.length} Bottles)</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Showing in-stock bottles and allocations matching {page.name}
                </p>
              </div>
            </div>

            <CategoryProductsClient
              mainCategory={category.slug}
              subCategory={sub.slug}
              categoryTitle={page.name}
              initialProducts={displayProducts}
              subcategories={category.subcategories || []}
            />
          </section>

          {/* Educational Buyer's Guide Section */}
          {page.buyersGuide && (
            <section className="mb-14 rounded-2xl border border-[#1A3828] bg-[#0E2017] p-6 sm:p-10 text-gray-300" aria-label="Buyer's Guide">
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-mono uppercase tracking-wider mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Sommelier & Vault Tasting Notes</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6">
                  {page.name} Buyer’s Guide & Cellaring Advice
                </h2>
                
                <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-4 text-gray-300 whitespace-pre-line">
                  {page.buyersGuide}
                </div>
              </div>
            </section>
          )}

          {/* Frequently Asked Questions (Structured FAQ) */}
          {page.faqs && page.faqs.length > 0 && (
            <section className="mb-14 rounded-2xl border border-[#1A3828] bg-[#0B1A12] p-6 sm:p-10" aria-label="Frequently Asked Questions">
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-mono uppercase tracking-wider mb-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6">
                  Questions About {page.name}
                </h2>

                <div className="space-y-4">
                  {page.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-[#1A3828] bg-[#08140E] p-5 sm:p-6 transition-all hover:border-[#D4AF37]/50"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-start gap-2">
                        <span className="text-[#D4AF37] font-mono text-sm">Q:</span>
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Explore Related Vaults & Internal Links */}
          {page.relatedLinks && page.relatedLinks.length > 0 && (
            <section className="rounded-2xl border border-[#1A3828] bg-[#0E2017] p-6 sm:p-8" aria-label="Related Categories">
              <h2 className="text-lg font-serif font-bold text-white mb-4">
                Explore Related Vaults & Styles
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {page.relatedLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#1A3828] bg-[#08140E] px-4 py-2 text-xs font-medium text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </>
  );
}
