import React from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageCircle, Home, ShoppingBag } from 'lucide-react';
import { SITE, CONTACT } from '@/config/site';

export const metadata = {
  title: `Inquiry Received | ${SITE.name}`,
  robots: { index: false, follow: true },
};

export default function ThankYouContactPage() {
  return (
    <div className="bg-[#08140E] min-h-screen py-20 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-md w-full rounded-2xl border border-[#D4AF37]/40 bg-[#0E2017] p-8 text-center space-y-6 shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-500 text-emerald-400">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            MESSAGE RECEIVED
          </span>
          <h1 className="text-2xl font-serif font-bold text-white">
            Thank You for Contacting Vault
          </h1>
          <p className="text-xs text-gray-300 leading-relaxed">
            Your inquiry has been logged with our Barangaroo concierge desk. A spirits specialist will review your request and reply within 2 business hours.
          </p>
        </div>

        <div className="rounded-xl bg-[#050E0A] p-4 border border-[#1A3828] text-xs text-gray-400 space-y-2">
          <p className="font-bold text-white">Require Urgent Allocation Confirmation?</p>
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline font-bold"
          >
            <MessageCircle className="h-4 w-4" /> Connect directly on WhatsApp
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/shop/"
            className="flex-1 rounded gold-bg-gradient py-2.5 text-xs font-bold text-black flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <ShoppingBag className="h-4 w-4" /> Continue Shopping
          </Link>

          <Link
            href="/"
            className="flex-1 rounded border border-[#1A3828] bg-[#050E0A] py-2.5 text-xs font-bold text-white hover:border-[#D4AF37] flex items-center justify-center gap-1.5"
          >
            <Home className="h-4 w-4" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
