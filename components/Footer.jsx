import React from 'react';
import Link from 'next/link';
import { Wine, ShieldCheck, MapPin, Mail, Phone, Lock, Award } from 'lucide-react';
import { SITE, CONTACT, BRAND, CATEGORIES } from '@/config/site';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-[#1A3828] bg-[#050E0A] text-gray-400 text-xs">
      {/* Upper RSA & Guarantee Banner */}
      <div className="border-b border-[#1A3828] bg-[#08140E] py-6 px-4">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0E2017] border border-[#D4AF37]/30 text-[#D4AF37]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-xs">DIRECT PROVENANCE GUARANTEE</h4>
              <p className="text-[11px] text-gray-400">100% authentic serial-numbered allocations.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0E2017] border border-[#D4AF37]/30 text-[#D4AF37]">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-xs">CLIMATE-CONTROLLED LOGISTICS</h4>
              <p className="text-[11px] text-gray-400">Insured express courier delivery nationwide.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0E2017] border border-[#D4AF37]/30 text-[#D4AF37]">
              <Wine className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-xs">RSA COMPLIANT VAULT</h4>
              <p className="text-[11px] text-gray-400">Liquor License LIQP770010234 (NSW).</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="inline-block group">
              <Logo size="sm" />
            </Link>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              {BRAND.description}
            </p>
            <div className="space-y-1 text-[11px] text-gray-300">
              <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#D4AF37]" /> {CONTACT.hq}</p>
              <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-[#D4AF37]" /> {CONTACT.phone}</p>
              <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-[#D4AF37]" /> orders&#64;liquorlocker.com.au</p>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37] border-b border-[#1A3828] pb-2 mb-3">
              Spirits & Wine Vault
            </h4>
            <ul className="space-y-2 text-[11px]">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}/`} className="hover:text-[#D4AF37] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/brands/" className="text-[#D4AF37] font-bold hover:underline">
                  All Brand Vaults →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Wholesale */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37] border-b border-[#1A3828] pb-2 mb-3">
              Vault Services
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li><Link href="/about/" className="hover:text-[#D4AF37]">About Liquor Locker AU</Link></li>
              <li><Link href="/blog/" className="hover:text-[#D4AF37]">Journal & Collector Guides</Link></li>
              <li><Link href="/faq/" className="hover:text-[#D4AF37]">Shipping & Vault Policies</Link></li>
              <li><Link href="/wholesale/" className="text-[#D4AF37] font-bold hover:underline">Wholesale B2B Program</Link></li>
              <li><Link href="/contact/" className="hover:text-[#D4AF37]">Contact Concierge</Link></li>
            </ul>
          </div>

          {/* Col 4: Payment Methods & Agent Ecosystem */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37] border-b border-[#1A3828] pb-2 mb-3">
              Payment & Agent Ready
            </h4>
            <p className="text-[11px] text-gray-400 mb-3">
              Accepted payment options: PayID, Bank Transfer, Bitcoin (BTC), Tether (USDT).
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="rounded bg-[#0E2017] border border-[#1A3828] px-2 py-1 text-[10px] text-white font-mono">PayID</span>
              <span className="rounded bg-[#0E2017] border border-[#1A3828] px-2 py-1 text-[10px] text-white font-mono">Bank Wire</span>
              <span className="rounded bg-[#0E2017] border border-[#D4AF37]/40 px-2 py-1 text-[10px] text-[#D4AF37] font-mono">Bitcoin (10% OFF)</span>
              <span className="rounded bg-[#0E2017] border border-[#D4AF37]/40 px-2 py-1 text-[10px] text-[#D4AF37] font-mono">USDT</span>
            </div>

            <div className="border-t border-[#1A3828] pt-3">
              <span className="text-[10px] uppercase font-semibold text-gray-500 block mb-1">Agent Ready Endpoints</span>
              <div className="flex flex-wrap gap-2 text-[10px] text-[#D4AF37]">
                <a href="/llms.txt" target="_blank" className="hover:underline">llms.txt</a>
                <span>•</span>
                <a href="/.well-known/api-catalog" target="_blank" className="hover:underline">API Catalog</a>
                <span>•</span>
                <a href="/.well-known/mcp/server-card.json" target="_blank" className="hover:underline">MCP Server</a>
                <span>•</span>
                <a href="/auth.md" target="_blank" className="hover:underline">auth.md</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-8 border-t border-[#1A3828] pt-6 text-center text-[11px] text-gray-500 space-y-2">
          <p className="max-w-3xl mx-auto leading-relaxed">
            <strong className="text-gray-400">LIQUOR ACT 2007:</strong> It is an offence to sell or supply alcohol to, or to obtain alcohol on behalf of, a person under the age of 18 years. Liquor License No. LIQP770010234. Enjoy Responsibly.
          </p>
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved. Sydney Vault HQ, Barangaroo NSW 2000, Australia.
          </p>
        </div>
      </div>
    </footer>
  );
}
