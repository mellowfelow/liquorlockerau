import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Building2, Home } from 'lucide-react';
import { SITE } from '@/config/site';

export const metadata = {
  title: `Wholesale Application Received | ${SITE.name}`,
  robots: { index: false, follow: true },
};

export default function ThankYouWholesalePage() {
  return (
    <div className="bg-[#08140E] min-h-screen py-20 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-md w-full rounded-2xl border border-[#D4AF37]/40 bg-[#0E2017] p-8 text-center space-y-6 shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-500 text-emerald-400">
          <Building2 className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            LICENSED B2B ACCOUNT
          </span>
          <h1 className="text-2xl font-serif font-bold text-white">
            Wholesale Inquiry Received
          </h1>
          <p className="text-xs text-gray-300 leading-relaxed">
            Thank you for applying for a Liquor Locker AU B2B wholesale account. Our compliance desk will verify your ABN and State Liquor License within 1 business day.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Link
            href="/wholesale/"
            className="w-full rounded gold-bg-gradient py-3 text-xs font-bold text-black hover:opacity-90 transition-opacity"
          >
            Review Wholesale Tiers
          </Link>

          <Link
            href="/"
            className="w-full rounded border border-[#1A3828] bg-[#050E0A] py-3 text-xs font-bold text-white hover:border-[#D4AF37] flex items-center justify-center gap-1.5"
          >
            <Home className="h-4 w-4" /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
