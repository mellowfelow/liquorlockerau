import React from 'react';
import Link from 'next/link';
import { POSTS, SITE } from '@/config/site';
import SmartImage from '@/components/SmartImage';

export const metadata = {
  title: `Spirits Journal & Australian Tasting Guides | ${SITE.name}`,
  description: 'Expert guides on rare Japanese whisky collecting, Tasmanian single malt tasting, artisanal gin botanicals, and tequila grading.',
  alternates: { canonical: `https://${SITE.domain}/blog/` },
};

export default function BlogIndexPage() {
  return (
    <div className="bg-[#08140E] min-h-screen py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37]">
            EXPERT KNOWLEDGE & GUIDES
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            The Liquor Locker AU Journal
          </h1>
          <p className="text-sm text-gray-400">
            Insights on rare whisky cellaring, Tasmanian single malts, craft gin botanicals, and prestige wine investments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-2xl border border-[#1A3828] bg-[#0E2017] overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}/`} className="block overflow-hidden relative">
                <SmartImage
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="h-48 w-full"
                />
                <span className="absolute top-3 left-3 z-10 rounded bg-black/80 backdrop-blur px-2.5 py-1 text-[10px] font-mono text-[#D4AF37] border border-[#D4AF37]/40">
                  {post.category}
                </span>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-500 font-mono mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}/`}>
                    <h2 className="text-base font-serif font-bold text-white hover:text-[#D4AF37] leading-snug">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="mt-2 text-xs text-gray-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1A3828] flex items-center justify-between">
                  <span className="text-[11px] text-[#D4AF37] font-semibold">Read Full Article</span>
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="rounded bg-[#050E0A] border border-[#1A3828] px-3 py-1.5 text-xs text-white hover:border-[#D4AF37]"
                  >
                    Read &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
