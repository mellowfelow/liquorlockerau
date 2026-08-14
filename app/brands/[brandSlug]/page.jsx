import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE, CATEGORIES, PRODUCTS } from '@/config/site';
import { BRANDS_DATA } from '@/config/brands';
import CategoryProductsClient from '@/components/CategoryProductsClient';
import JsonLd from '@/components/JsonLd';
import { Award, ShieldCheck, MapPin, Calendar, HelpCircle, ChevronRight, Sparkles, CheckCircle2, PackageCheck } from 'lucide-react';

export async function generateStaticParams() {
  return BRANDS_DATA.map((brand) => ({
    brandSlug: brand.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { brandSlug } = await params;
  const brand = BRANDS_DATA.find((b) => b.slug === brandSlug);

  if (!brand) return {};

  const canonicalUrl = `https://${SITE.domain}/brands/${brand.slug}/`;

  return {
    title: `Buy ${brand.name} Online Australia | Official Vault Allocations | Liquor Locker AU`,
    description: `Shop authenticated ${brand.name} ${brand.category} online in Australia. Direct cellar allocations, rare limited releases, and climate-controlled nationwide delivery.`,
    openGraph: {
      title: `${brand.name} Vault Allocations | Liquor Locker AU`,
      description: brand.description,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brand.name} Vault Allocations`,
      description: brand.description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function BrandLandingPage({ params }) {
  const { brandSlug } = await params;
  const brand = BRANDS_DATA.find((b) => b.slug === brandSlug);

  if (!brand) {
    notFound();
  }

  // Filter products by brand name or brand slug
  const brandProducts = PRODUCTS.filter((p) => {
    if (!p.brand) return false;
    const pBrand = p.brand.toLowerCase();
    const targetBrand = brand.name.toLowerCase();
    return pBrand.includes(targetBrand) || targetBrand.includes(pBrand);
  });

  // Fallback: If exact match count is low, also check category
  const displayProducts = brandProducts.length > 0
    ? brandProducts
    : PRODUCTS.filter((p) => p.primaryCategory === brand.category).slice(0, 6);

  const canonicalUrl = `https://${SITE.domain}/brands/${brand.slug}/`;
  const categoryObj = CATEGORIES.find((c) => c.slug === brand.category);
  const categoryName = categoryObj ? categoryObj.name : brand.category;

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
        name: 'Brands',
        item: `https://${SITE.domain}/brands/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: brand.name,
        item: canonicalUrl,
      },
    ],
  };

  const brandSchema = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: brand.name,
    description: brand.description,
    url: canonicalUrl,
  };

  const faqSchema = brand.faqs && brand.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: brand.faqs.map((faq) => ({
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
      <JsonLd data={brandSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <div className="bg-[#08140E] min-h-screen py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-400 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <Link href="/brands/" className="hover:text-white transition-colors">Brands</Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-[#D4AF37] font-semibold">{brand.name}</span>
          </nav>

          {/* Hero Banner Header with Single H1 */}
          <header className="relative rounded-2xl border border-[#1A3828] bg-gradient-to-br from-[#0E2017] via-[#0B1A12] to-[#08140E] p-6 sm:p-10 mb-10 overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A3828]/60 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono tracking-wider uppercase mb-3">
                <Sparkles className="w-3 h-3" />
                <span>OFFICIAL BRAND ALLOCATION VAULT</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                {brand.name} Vault Releases & Allocations Australia
              </h1>

              <p className="mt-2 text-base sm:text-lg text-[#D4AF37] font-medium">
                {brand.tagline}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
                {brand.description}
              </p>

              {/* Brand Meta Strip */}
              <div className="mt-6 pt-6 border-t border-[#1A3828] flex flex-wrap gap-6 text-xs text-gray-300">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span><strong>Origin:</strong> {brand.region}, {brand.country}</span>
                </div>
                {brand.founded && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    <span><strong>Heritage:</strong> Est. {brand.founded}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span><strong>Provenance:</strong> 100% Bonded Stock</span>
                </div>
              </div>
            </div>
          </header>

          {/* Brand Highlights Card */}
          {brand.highlights && brand.highlights.length > 0 && (
            <div className="mb-12 rounded-xl border border-[#1A3828] bg-[#0E2017] p-6 sm:p-8">
              <h2 className="text-base sm:text-lg font-serif font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4AF37]" />
                <span>Why {brand.name} Is Celebrated</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {brand.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Product Grid for Brand */}
          <section className="mb-14" aria-label="Brand products">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Available {brand.name} Allocations ({displayProducts.length} In Vault)
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Climate-controlled bonded bottles ready for immediate insured dispatch across Australia.
                </p>
              </div>
            </div>

            <CategoryProductsClient
              mainCategory={brand.category}
              subCategory=""
              categoryTitle={brand.name}
              initialProducts={displayProducts}
              subcategories={categoryObj?.subcategories || []}
            />
          </section>

          {/* Brand FAQs */}
          {brand.faqs && brand.faqs.length > 0 && (
            <section className="mb-14 rounded-2xl border border-[#1A3828] bg-[#0B1A12] p-6 sm:p-10" aria-label="Frequently Asked Questions">
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-mono uppercase tracking-wider mb-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6">
                  Questions About {brand.name}
                </h2>

                <div className="space-y-4">
                  {brand.faqs.map((faq, index) => (
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

          {/* Related Links */}
          <section className="rounded-2xl border border-[#1A3828] bg-[#0E2017] p-6 sm:p-8">
            <h2 className="text-lg font-serif font-bold text-white mb-4">
              Explore More in {categoryName}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href={`/${brand.category}/`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#1A3828] bg-[#08140E] px-4 py-2 text-xs font-medium text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
              >
                <span>All {categoryName} Vault</span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </Link>
              <Link
                href="/brands/"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#1A3828] bg-[#08140E] px-4 py-2 text-xs font-medium text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
              >
                <span>All Distillery & Winery Vaults</span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
