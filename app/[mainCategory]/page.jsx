import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, PRODUCTS, SITE, getProductsForCategory } from '@/config/site';
import CategoryProductsClient from '@/components/CategoryProductsClient';
import JsonLd from '@/components/JsonLd';

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ mainCategory: cat.slug }));
}

export async function generateMetadata({ params }) {
  const { mainCategory } = await params;
  const category = CATEGORIES.find((c) => c.slug === mainCategory);
  if (!category) return {};

  return {
    title: `${category.name} | Liquor Locker AU Vault`,
    description: category.description,
    openGraph: {
      title: `${category.name} Collection`,
      description: category.description,
      images: [{ url: category.image }],
      url: `https://${SITE.domain}/${category.slug}/`,
    },
    alternates: {
      canonical: `https://${SITE.domain}/${category.slug}/`,
    },
  };
}

export default async function MainCategoryPage({ params }) {
  const { mainCategory } = await params;
  const category = CATEGORIES.find((c) => c.slug === mainCategory);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsForCategory(mainCategory);

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
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-[#08140E] min-h-screen py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          
          {/* Breadcrumbs */}
          <nav className="mb-6 text-xs text-gray-400 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-semibold">{category.name}</span>
          </nav>

          {/* Hero Category Header */}
          <div className="relative rounded-2xl border border-[#1A3828] bg-[#0E2017] p-6 sm:p-10 mb-10 overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                LIQUOR LOCKER VAULT CATEGORY
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
                {category.name}
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Subcategory Pills Grid */}
            <div className="mt-6 pt-6 border-t border-[#1A3828] flex flex-wrap gap-2">
              <span className="text-xs font-bold text-[#D4AF37] uppercase self-center mr-2">
                Subcategories:
              </span>
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/${category.slug}/${sub.slug}/`}
                  className="rounded-full border border-[#1A3828] bg-[#08140E] px-3.5 py-1 text-xs font-medium text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Interactive Products Grid with Category Filters & Sorting */}
          <CategoryProductsClient
            mainCategory={category.slug}
            categoryTitle={category.name}
            initialProducts={categoryProducts}
            subcategories={category.subcategories}
          />

        </div>
      </div>
    </>
  );
}
