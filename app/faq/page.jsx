import React from 'react';
import Link from 'next/link';
import { FAQ, SITE, SHOP } from '@/config/site';
import JsonLd from '@/components/JsonLd';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

export const metadata = {
  title: `Frequently Asked Questions | ${SITE.name}`,
  description: 'Answers to common questions regarding minimum order rules, crypto payments, climate controlled shipping, and RSA age verification.',
  alternates: { canonical: `https://${SITE.domain}/faq/` },
};

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />

      <div className="bg-[#08140E] min-h-screen py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37]">
              VAULT KNOWLEDGE BASE
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about ordering rare spirits, crypto payment discounts, climate-controlled shipping, and Australian RSA compliance.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ.map((item, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-[#1A3828] bg-[#0E2017] p-5 text-gray-300 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-serif font-bold text-white text-base hover:text-[#D4AF37] transition-colors">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-[#D4AF37] shrink-0" />
                    {item.question}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 transition duration-300 group-open:-rotate-180" />
                </summary>

                <div className="mt-4 pt-3 border-t border-[#1A3828] text-xs leading-relaxed text-gray-300 space-y-2">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>

          {/* Contact Support Prompt */}
          <div className="rounded-2xl bg-[#0E2017] border border-[#D4AF37]/30 p-8 text-center space-y-4">
            <h3 className="text-xl font-serif font-bold text-white">
              Still Have Questions for Our Vault Master?
            </h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Our Barangaroo concierge team is on standby to assist with custom allocations, corporate orders, or cellar storage queries.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/contact/"
                className="rounded gold-bg-gradient px-6 py-2.5 text-xs font-bold text-black"
              >
                Send Concierge Inquiry
              </Link>
              <a
                href={`https://wa.me/61280007799`}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-emerald-500 bg-emerald-950/50 px-6 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900/70 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" /> Message WhatsApp Concierge
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
