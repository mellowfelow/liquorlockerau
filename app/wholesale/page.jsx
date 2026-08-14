import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Award, Building2, Truck, FileText } from 'lucide-react';
import { SITE, SHOP, BRAND } from '@/config/site';

export const metadata = {
  title: `Wholesale B2B & On-Premise Accounts | ${SITE.name}`,
  description: 'Licensed B2B wholesale pricing tiers for Australian hotels, private dining clubs, bars, and corporate gifting accounts.',
  alternates: { canonical: `https://${SITE.domain}/wholesale/` },
};

export default function WholesalePage() {
  return (
    <div className="bg-[#08140E] min-h-screen py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            LICENSED B2B ALLOCATIONS
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Wholesale & On-Premise Accounts
          </h1>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto">
            Direct cellar access for premium Australian venue operators, private dining clubs, luxury hotels, and corporate cellar programs.
          </p>
        </div>

        {/* Pricing Tiers Table */}
        <div className="rounded-2xl border border-[#1A3828] bg-[#0E2017] p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#1A3828] pb-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-white text-[#D4AF37]">
                Wholesale Allocation Tiers
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Prices exclude GST. Requires active Australian Business Number (ABN) & valid State Liquor License.
              </p>
            </div>
            <span className="rounded bg-[#050E0A] border border-[#D4AF37]/40 px-3 py-1 text-xs font-mono text-[#D4AF37]">
              LIQP770010234
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#050E0A] text-[#D4AF37] uppercase font-mono border-y border-[#1A3828]">
                <tr>
                  <th className="py-3 px-4">Tier Level</th>
                  <th className="py-3 px-4">Min Spend / Order</th>
                  <th className="py-3 px-4">Allocation Discount</th>
                  <th className="py-3 px-4">Freight & Terms</th>
                  <th className="py-3 px-4">Account Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A3828] font-mono">
                <tr>
                  <td className="py-4 px-4 font-bold text-white">Bronze Tier</td>
                  <td className="py-4 px-4">$1,000 AUD</td>
                  <td className="py-4 px-4 text-[#D4AF37]">12% Off Retail</td>
                  <td className="py-4 px-4">Flat $25 Express</td>
                  <td className="py-4 px-4 text-gray-400">Boutique Bars / Off-Premise</td>
                </tr>
                <tr className="bg-[#050E0A]/50">
                  <td className="py-4 px-4 font-bold text-white">Silver Tier</td>
                  <td className="py-4 px-4">$2,500 AUD</td>
                  <td className="py-4 px-4 text-[#D4AF37]">18% Off Retail</td>
                  <td className="py-4 px-4 text-emerald-400">FREE Climate Courier</td>
                  <td className="py-4 px-4 text-gray-400">Fine Dining & Hotels</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-white">Gold Cellar Tier</td>
                  <td className="py-4 px-4">$5,000+ AUD</td>
                  <td className="py-4 px-4 text-[#D4AF37]">25% Off Retail</td>
                  <td className="py-4 px-4 text-emerald-400">Priority Same-Day Sydney</td>
                  <td className="py-4 px-4 text-gray-400">Private Vaults & Resorts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-[#1A3828] bg-[#0E2017] p-6 space-y-2">
            <Building2 className="h-6 w-6 text-[#D4AF37]" />
            <h3 className="font-serif font-bold text-white text-base">Direct Distillery Allocations</h3>
            <p className="text-xs text-gray-400">
              Access guaranteed stock allocations of high-demand Japanese whiskies, aged Tasmanian single malts, and small-batch agave spirits.
            </p>
          </div>

          <div className="rounded-xl border border-[#1A3828] bg-[#0E2017] p-6 space-y-2">
            <Truck className="h-6 w-6 text-[#D4AF37]" />
            <h3 className="font-serif font-bold text-white text-base">Temperature-Gated Shipping</h3>
            <p className="text-xs text-gray-400">
              All wholesale shipments travel in dedicated climate-monitored vehicles to prevent thermal shock to corks and spirit clarity.
            </p>
          </div>

          <div className="rounded-xl border border-[#1A3828] bg-[#0E2017] p-6 space-y-2">
            <FileText className="h-6 w-6 text-[#D4AF37]" />
            <h3 className="font-serif font-bold text-white text-base">Simplified Tax Invoicing</h3>
            <p className="text-xs text-gray-400">
              Itemised tax invoices with GST breakdown, WET tax compliance calculations, and serial registration for luxury inventory audit.
            </p>
          </div>
        </div>

        {/* Account Application Form Box */}
        <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#0E2017] p-8 text-center space-y-4 shadow-xl">
          <h2 className="text-2xl font-serif font-bold text-white">
            Apply for a Wholesale Account
          </h2>
          <p className="text-xs text-gray-300 max-w-lg mx-auto">
            Contact our Barangaroo commercial desk with your ABN, Liquor License details, and estimated monthly volume to receive wholesale login access.
          </p>

          <div className="pt-2">
            <Link
              href="/contact/"
              className="inline-block rounded gold-bg-gradient px-8 py-3 text-xs font-bold text-black hover:opacity-90 transition-opacity"
            >
              Submit Wholesale Application &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
