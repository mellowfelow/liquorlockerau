'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS, POSTS, CATEGORIES } from '@/config/site';
import ProductCard from '@/components/ProductCard';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    const timer = setTimeout(() => setQuery(q), 0);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const q = query.toLowerCase().trim();

  const matchingProducts = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q))
      )
    : [];

  const matchingPosts = q
    ? POSTS.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="mx-auto max-w-7xl">
      {/* Search Input Box */}
      <div className="max-w-2xl mx-auto mb-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.history.pushState(null, '', `/search/?q=${encodeURIComponent(query)}`);
          }}
          className="relative"
        >
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#D4AF37]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rare whiskies, Tasmanian gins, tequilas, wines..."
            className="w-full rounded-xl border border-[#1A3828] bg-[#0E2017] pl-12 pr-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
          />
        </form>
      </div>

      {!q ? (
        <div className="text-center py-12 text-gray-400 space-y-4">
          <p className="text-sm">Type a search term above to explore rare allocations and journal articles.</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
            {['Yamazaki', 'Single Malt', 'Tasmanian Gin', 'Extra Añejo', 'Shiraz'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  window.history.pushState(null, '', `/search/?q=${encodeURIComponent(term)}`);
                }}
                className="rounded-full bg-[#050E0A] border border-[#1A3828] px-3 py-1 text-xs text-[#D4AF37] hover:border-[#D4AF37]"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Matching Products */}
          <div>
            <h2 className="text-lg font-serif font-bold text-white mb-4 flex items-center justify-between border-b border-[#1A3828] pb-2">
              <span>Matching Vault Products ({matchingProducts.length})</span>
              <span className="text-xs text-[#D4AF37] font-mono">Filter: &quot;{q}&quot;</span>
            </h2>

            {matchingProducts.length === 0 ? (
              <p className="text-xs text-gray-500 py-4">No spirit bottles found matching &quot;{q}&quot;.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {matchingProducts.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            )}
          </div>

          {/* Matching Posts */}
          {matchingPosts.length > 0 && (
            <div>
              <h2 className="text-lg font-serif font-bold text-white mb-4 border-b border-[#1A3828] pb-2">
                Matching Journal Articles ({matchingPosts.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {matchingPosts.map((post) => (
                  <div key={post.slug} className="rounded-xl border border-[#1A3828] bg-[#0E2017] p-4 space-y-2">
                    <span className="text-[10px] font-mono text-[#D4AF37]">{post.category}</span>
                    <h3 className="text-xs font-serif font-bold text-white line-clamp-1">{post.title}</h3>
                    <p className="text-[11px] text-gray-400 line-clamp-2">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="inline-block text-xs text-[#D4AF37] font-semibold hover:underline pt-2"
                    >
                      Read Article &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-[#08140E] min-h-screen py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            VAULT SEARCH ENGINE
          </span>
          <h1 className="text-3xl font-serif font-bold text-white">Search Vault Allocations</h1>
        </div>

        <Suspense fallback={<div className="text-center text-gray-500">Loading Search Results...</div>}>
          <SearchResultsContent />
        </Suspense>
      </div>
    </div>
  );
}
