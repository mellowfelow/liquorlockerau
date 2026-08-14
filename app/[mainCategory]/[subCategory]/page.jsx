import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, PRODUCTS, SITE, getProductsForCategory } from '@/config/site';
import CategoryProductsClient from '@/components/CategoryProductsClient';
import JsonLd from '@/components/JsonLd';

export async function generateStaticParams() {
  const params = [];
  CATEGORIES.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      params.push({
        mainCategory: cat.slug,
        subCategory: sub.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { mainCategory, subCategory } = await params;
  const category = CATEGORIES.find((c) => c.slug === mainCategory);
  if (!category) return {};

  const sub = category.subcategories.find((s) => s.slug === subCategory);
  if (!sub) return {};

  return {
    title: `${sub.name} | ${category.name} | Liquor Locker AU Vault`,
    description: sub.description,
    openGraph: {
      title: `${sub.name} - ${category.name}`,
      description: sub.description,
      url: `https://${SITE.domain}/${category.slug}/${sub.slug}/`,
    },
    alternates: {
      canonical: `https://${SITE.domain}/${category.slug}/${sub.slug}/`,
    },
  };
}

export default async function SubCategoryPage({ params }) {
  const { mainCategory, subCategory } = await params;
  const category = CATEGORIES.find((c) => c.slug === mainCategory);

  if (!category) {
    notFound();
  }

  const sub = category.subcategories.find((s) => s.slug === subCategory);
  if (!sub) {
    notFound();
  }

  const subCategoryProducts = getProductsForCategory(mainCategory, subCategory);

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
            <Link href={`/${category.slug}/`} className="hover:text-white">{category.name}</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-semibold">{sub.name}</span>
          </nav>

          {/* Subcategory Banner */}
          <div className="relative rounded-2xl border border-[#1A3828] bg-[#0E2017] p-6 sm:p-8 mb-10 overflow-hidden shadow-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              {category.name} › SUBCATEGORY
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              {sub.name}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
              {sub.description}
            </p>

            {/* Other Subcategories Navigation */}
            <div className="mt-6 pt-4 border-t border-[#1A3828] flex flex-wrap gap-2 items-center text-xs">
              <span className="text-gray-400">Other {category.name} subcategories:</span>
              {category.subcategories
                .filter((s) => s.slug !== sub.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${category.slug}/${s.slug}/`}
                    className="rounded-lg bg-[#08140E] border border-[#1A3828] px-3 py-1 text-gray-300 hover:text-[#D4AF37] transition-all"
                  >
                    {s.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* Products Grid with Subcategory Filter Applied */}
          <CategoryProductsClient
            mainCategory={category.slug}
            subCategory={sub.slug}
            categoryTitle={sub.name}
            initialProducts={subCategoryProducts}
            subcategories={category.subcategories}
          />

        </div>
      </div>
    </>
  );
}
