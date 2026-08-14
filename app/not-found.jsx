import React from 'react';
import Link from 'next/link';
import { Wine, ArrowLeft, Home, Search } from 'lucide-react';
import { SITE } from '@/config/site';

export const metadata = {
  title: `404 - Page Not Found | ${SITE.name}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="bg-[#08140E] min-h-screen py-24 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-md w-full rounded-2xl border border-[#1A3828] bg-[#0E2017] p-8 text-center space-y-6 shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#050E0A] border border-[#D4AF37]/40 text-[#D4AF37]">
          <Wine className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            ERROR 404
          </span>
          <h1 className="text-2xl font-serif font-bold text-white">
            Allocation Not Found
          </h1>
          <p className="text-xs text-gray-300 leading-relaxed">
            The vault page or bottle allocation you requested could not be located. It may have been moved, renamed, or exhausted from cellars.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/shop/"
            className="flex-1 rounded gold-bg-gradient py-3 text-xs font-bold text-black flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <Search className="h-4 w-4" /> Browse Shop Vault
          </Link>

          <Link
            href="/"
            className="flex-1 rounded border border-[#1A3828] bg-[#050E0A] py-3 text-xs font-bold text-white hover:border-[#D4AF37] flex items-center justify-center gap-1.5"
          >
            <Home className="h-4 w-4" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
