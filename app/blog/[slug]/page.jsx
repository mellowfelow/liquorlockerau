import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, SITE } from '@/config/site';
import JsonLd from '@/components/JsonLd';
import SmartImage from '@/components/SmartImage';
import { ArrowLeft, Clock, Calendar, Share2, Wine } from 'lucide-react';

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Liquor Locker Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      url: `https://${SITE.domain}/blog/${post.slug}/`,
    },
    alternates: {
      canonical: `https://${SITE.domain}/blog/${post.slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: SITE.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: `https://${SITE.domain}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://${SITE.domain}/blog/${post.slug}/`,
    },
  };

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
        name: 'Journal',
        item: `https://${SITE.domain}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://${SITE.domain}/blog/${post.slug}/`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-[#08140E] min-h-screen py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Journal
          </Link>

          <div className="space-y-4">
            <span className="rounded bg-[#D4AF37]/20 px-3 py-1 text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/40">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-gray-400 font-mono border-b border-[#1A3828] pb-4">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-[#D4AF37]" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#D4AF37]" /> {post.readTime}</span>
              <span>By Liquor Locker Vault Master</span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#1A3828]">
            <SmartImage
              src={post.image}
              alt={post.title}
              width={1000}
              height={500}
              priority={true}
              className="w-full h-80"
            />
          </div>

          {/* Article Body Content */}
          <div className="bg-[#0E2017] rounded-2xl border border-[#1A3828] p-8 text-gray-300 text-sm leading-relaxed space-y-6">
            <p className="text-base font-serif text-white italic border-l-2 border-[#D4AF37] pl-4">
              {post.excerpt}
            </p>

            <h2 className="text-xl font-serif font-bold text-white text-[#D4AF37]">
              Understanding Australian Spirit Cellaring Standards
            </h2>
            <p>
              When evaluating high-proof spirits such as 58% ABV cask-strength single malt whiskies or navy-strength gins, environmental stability is paramount. Unlike wine, distilled spirits do not age further inside the bottle once sealed; however, improper exposure to sunlight, UV radiation, or temperature fluctuations can degrade aromatic volatile esters and compromise natural wood oils.
            </p>

            <h2 className="text-xl font-serif font-bold text-white text-[#D4AF37]">
              Vault Recommendations for Australian Collectors
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-xs text-gray-300">
              <li>Store bottles strictly upright to prevent high-proof alcohol from eroding natural cork stoppers.</li>
              <li>Maintain cellar temperatures between 12°C and 18°C with stable relative humidity.</li>
              <li>Record batch, bottle numbers, and fill levels in your personal vault collection ledger.</li>
              <li>Always verify official distributor holograms and security seals before purchase.</li>
            </ul>

            <div className="rounded-xl bg-[#050E0A] p-6 border border-[#D4AF37]/30 mt-8 space-y-3">
              <h3 className="font-serif font-bold text-white text-sm">
                Explore Allocations Featured in This Article
              </h3>
              <p className="text-xs text-gray-400">
                Interested in discovering authentic Lark, Archie Rose, or Yamazaki bottles? Visit our curated shop.
              </p>
              <Link
                href="/shop/"
                className="inline-block rounded gold-bg-gradient px-4 py-2 text-xs font-bold text-black"
              >
                Browse Shop Vault &rarr;
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
