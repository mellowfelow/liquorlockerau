import React from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageCircle, Home, ShoppingBag, ShieldCheck } from 'lucide-react';
import { SITE, CONTACT, SHOP } from '@/config/site';

export const metadata = {
  title: `Order Inquiry Submitted | ${SITE.name}`,
  robots: { index: false, follow: true },
};

export default function ThankYouOrderPage() {
  return (
    <div className="bg-[#08140E] min-h-screen py-20 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-md w-full rounded-2xl border border-[#D4AF37]/40 bg-[#0E2017] p-8 text-center space-y-6 shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-500 text-emerald-400">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            ORDER RESERVATION DRAFT
          </span>
          <h1 className="text-2xl font-serif font-bold text-white">
            Order Submitted to Concierge
          </h1>
          <p className="text-xs text-gray-300 leading-relaxed">
            Your bottle allocation draft has been logged. Our Sydney team will verify inventory availability and issue a PayID or Crypto payment invoice.
          </p>
        </div>

        <div className="rounded-xl bg-[#050E0A] p-4 border border-[#1A3828] text-xs text-gray-400 space-y-2 text-left">
          <div className="flex items-center gap-2 text-[#D4AF37] font-bold">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Vault Allocation Terms</span>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-[11px] text-gray-300">
            <li>Minimum order requirement: ${SHOP.minOrder} AUD.</li>
            <li>Free climate express shipping applied over ${SHOP.freeShippingThreshold} AUD.</li>
            <li>RSA ID check (21+) conducted on courier handover.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded border border-emerald-500 bg-emerald-950/50 py-3 text-xs font-bold text-emerald-300 hover:bg-emerald-900/70 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-4 w-4" /> Finalize Immediately on WhatsApp Concierge
          </a>

          <Link
            href="/shop/"
            className="w-full rounded gold-bg-gradient py-3 text-xs font-bold text-black flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <ShoppingBag className="h-4 w-4" /> Return to Spirits Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
