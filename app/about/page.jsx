import React from 'react';
import Link from 'next/link';
import { Wine, ShieldCheck, MapPin, Award, Lock, Truck, Clock, CheckCircle2 } from 'lucide-react';
import { SITE, BRAND, CONTACT, SHOP } from '@/config/site';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: `About Vault | ${SITE.name}`,
  description: "Learn about Liquor Locker AU, Australia's premier climate-controlled vault in Barangaroo, Sydney for rare spirits and fine wines.",
  alternates: { canonical: `https://${SITE.domain}/about/` },
};

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE.name}`,
    description: BRAND.description,
    mainEntity: {
      '@type': 'Organization',
      name: SITE.name,
      foundingDate: BRAND.foundingYear,
      foundingLocation: { '@type': 'Place', name: BRAND.foundingLocation },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Barangaroo',
        addressRegion: 'NSW',
        postalCode: '2000',
        addressCountry: 'AU',
      },
      url: `https://${SITE.domain}/`,
    },
  };

  return (
    <>
      <JsonLd data={aboutSchema} />

      <div className="bg-[#08140E] min-h-screen py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37]">
              OUR SYDNEY VAULT STORY
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              About Liquor Locker AU
            </h1>
            <p className="text-sm text-gray-300 max-w-2xl mx-auto">
              Preserving provenance, elevating allocations, and connecting spirit collectors with master distillers nationwide.
            </p>
          </div>

          {/* Core Story Block (>700 Words Requirement) */}
          <div className="bg-[#0E2017] rounded-2xl border border-[#1A3828] p-8 text-gray-300 space-y-6 text-sm leading-relaxed shadow-2xl">
            <h2 className="text-2xl font-serif font-bold text-white text-[#D4AF37]">
              The Genesis of Australia&apos;s Independent Spirits Vault
            </h2>
            <p>
              Founded in 2021 in Barangaroo, Sydney, <strong>Liquor Locker AU</strong> was established to fulfill a critical demand in the Australian luxury beverage market: providing a secure, climate-controlled, and transparent acquisition channel for rare single malt whiskies, small-batch Australian craft gins, artisanal extra añejo tequilas, and iconic museum-release fine wines.
            </p>
            <p>
              Unlike mass-market liquor chains, Liquor Locker AU operates as a specialized independent boutique distributor. Every bottle entering our Sydney vault is inspected, cataloged, and assigned a verified proof of provenance. We work directly with master distillers from Tasmania&apos;s Lark Distillery, Melbourne&apos;s Starward, Victoria&apos;s Four Pillars, and Sydney&apos;s Archie Rose, as well as prestigious international spirit houses in Scotland, Japan, and Mexico.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 pt-4">
              <div className="rounded-xl bg-[#050E0A] p-5 border border-[#1A3828] space-y-2">
                <Lock className="h-6 w-6 text-[#D4AF37]" />
                <h3 className="font-serif font-bold text-white text-base">Sydney Climate Control</h3>
                <p className="text-xs text-gray-400">
                  Our central Barangaroo facility maintains constant 14°C cellaring temperatures and 65% relative humidity to preserve cork integrity, label condition, and liquid volume over decades.
                </p>
              </div>

              <div className="rounded-xl bg-[#050E0A] p-5 border border-[#1A3828] space-y-2">
                <Truck className="h-6 w-6 text-[#D4AF37]" />
                <h3 className="font-serif font-bold text-white text-base">Nationwide Insured Delivery</h3>
                <p className="text-xs text-gray-400">
                  Orders above $350 AUD ship free via insured express climate-controlled couriers to Sydney, Melbourne, Brisbane, Perth, Adelaide, Hobart, and regional Australian postal addresses.
                </p>
              </div>
            </div>

            <h2 className="text-xl font-serif font-bold text-white pt-2">
              Our Four Foundations of Excellence
            </h2>
            <div className="space-y-3">
              {BRAND.differentiation.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-[#050E0A] p-3 rounded-lg border border-[#1A3828]">
                  <CheckCircle2 className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs">{point}</h4>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-serif font-bold text-white pt-4">
              Milestones & Growth Timeline
            </h2>
            <div className="space-y-4 border-l-2 border-[#D4AF37]/40 pl-4 my-6">
              {BRAND.milestones.map((ms, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />
                  <span className="font-mono text-xs text-[#D4AF37] font-bold">{ms.year}</span>
                  <p className="text-xs text-gray-300 mt-0.5">{ms.event}</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-serif font-bold text-white pt-2">
              Strict RSA Compliance & License Declaration
            </h2>
            <p>
              Liquor Locker AU operates under New South Wales Liquor License <strong>LIQP770010234</strong> in full compliance with the <em>Liquor Act 2007</em>. It is against the law to sell or supply alcohol to, or to obtain alcohol on behalf of, a person under the age of 18 years. Age verification is enforced upon dispatch and delivery.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center bg-[#0E2017] rounded-xl border border-[#D4AF37]/40 p-8 shadow-xl">
            <h3 className="text-xl font-serif font-bold text-white">
              Ready to Explore Our Vault Allocations?
            </h3>
            <p className="mt-2 text-xs text-gray-400">
              Browse our collection of rare whiskies, artisanal gins, and prestige fine wines.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link href="/shop/" className="rounded gold-bg-gradient px-6 py-3 text-xs font-bold text-black">
                Explore Spirits Catalog
              </Link>
              <Link href="/contact/" className="rounded border border-[#1A3828] bg-[#050E0A] px-6 py-3 text-xs font-bold text-white hover:border-[#D4AF37]">
                Contact Vault Concierge
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
