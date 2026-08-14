'use client';

import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck, Coins, MessageSquare } from 'lucide-react';
import { SHOP, CONTACT } from '@/config/site';

export default function AnnouncementBar() {
  const slides = [
    {
      icon: <Truck className="h-3.5 w-3.5 text-[#D4AF37]" />,
      text: `FREE Express Climate-Controlled Delivery Nationwide on Orders Over $${SHOP.freeShippingThreshold} AUD`
    },
    {
      icon: <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />,
      text: `Liquor Locker Vault Minimum Order: $${SHOP.minOrder} AUD · Direct Provenance Guarantee`
    },
    {
      icon: <Coins className="h-3.5 w-3.5 text-[#D4AF37]" />,
      text: `10% INSTANT DISCOUNT when paying with Bitcoin (BTC) or Tether (USDT)`
    },
    {
      icon: <MessageSquare className="h-3.5 w-3.5 text-[#D4AF37]" />,
      text: `Need rare bottle allocations? WhatsApp Concierge: ${CONTACT.whatsapp}`
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-[#050E0A] border-b border-[#1A3828] py-2 px-4 text-xs font-medium text-gray-300 transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex w-full items-center justify-center gap-2 text-center sm:justify-start">
          {slides[currentIndex].icon}
          <span className="truncate text-[11px] sm:text-xs text-gray-200">
            {slides[currentIndex].text}
          </span>
        </div>

        <div className="hidden items-center gap-4 text-[11px] text-[#D4AF37] md:flex shrink-0 font-medium">
          <span className="hover:underline cursor-pointer">Sydney Vault HQ</span>
          <span>•</span>
          <a href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer" className="hover:underline">
            WhatsApp Concierge
          </a>
        </div>
      </div>
    </div>
  );
}
