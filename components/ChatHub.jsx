'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Phone, Mail, MessageCircle, ExternalLink, Shield } from 'lucide-react';
import { CONTACT, CHAT } from '@/config/site';

export default function ChatHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Expanded Concierge Menu */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-xl border border-[#D4AF37]/40 bg-[#0E2017] p-4 text-white shadow-2xl gold-border-glow animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between border-b border-[#1A3828] pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#12261C] border border-[#D4AF37]/30 text-[#D4AF37]">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-serif font-bold text-white tracking-wide">
                  VAULT CONCIERGE
                </h3>
                <p className="text-[10px] text-[#D4AF37]">Sydney HQ • Online Now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-gray-400 hover:bg-[#12261C] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-3 text-xs text-gray-300 leading-relaxed">
            Need assistance with rare bottle allocations, corporate gifting, or PayID payment verification?
          </p>

          <div className="mt-4 space-y-2">
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-emerald-800/50 bg-emerald-950/40 p-2.5 text-xs text-emerald-200 transition-colors hover:bg-emerald-900/50"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span className="font-medium">WhatsApp Concierge</span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center justify-between rounded-lg border border-[#1A3828] bg-[#12261C] p-2.5 text-xs text-gray-200 transition-colors hover:border-[#D4AF37]/40"
            >
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#D4AF37]" />
                <span className="font-medium">VIP Support Email</span>
              </div>
              <span className="text-[10px] text-gray-400">Response &lt;2h</span>
            </a>

            <a
              href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-between rounded-lg border border-[#1A3828] bg-[#12261C] p-2.5 text-xs text-gray-200 transition-colors hover:border-[#D4AF37]/40"
            >
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                <span className="font-medium">{CONTACT.phone}</span>
              </div>
              <span className="text-[10px] text-gray-400">Direct Line</span>
            </a>
          </div>

          <p className="mt-4 text-[10px] text-center text-gray-500 border-t border-[#1A3828] pt-2">
            Liquor Locker AU • License LIQP770010234
          </p>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full gold-bg-gradient text-black shadow-xl transition-transform hover:scale-105 active:scale-95"
        aria-label="Toggle Vault Concierge"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </div>
  );
}
