'use client';

import React from 'react';

export default function Logo({ size = 'md', className = '' }) {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Green & Gold Vault Monogram */}
      <div className={`relative flex ${iconSizes[size]} shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#12261C] via-[#0E2017] to-[#08140E] border border-[#D4AF37]/60 shadow-md shadow-black/80 group-hover:border-[#D4AF37] transition-all duration-300`}>
        {/* Subtle inner gold accent border */}
        <div className="absolute inset-0.5 rounded border border-[#E2C275]/20 pointer-events-none" />
        
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3/5 w-3/5 text-[#D4AF37] transition-transform duration-300 group-hover:scale-105"
        >
          {/* Shield Vault Crest */}
          <path
            d="M20 4L32 10V22C32 29 20 36 20 36C20 36 8 29 8 22V10L20 4Z"
            stroke="url(#goldGradientLogo)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Keyhole Vault Orifice */}
          <circle cx="20" cy="16" r="3.2" fill="url(#goldGradientLogo)" />
          <path
            d="M18.5 18.5L17.5 25H22.5L21.5 18.5H18.5Z"
            fill="url(#goldGradientLogo)"
          />
          <defs>
            <linearGradient id="goldGradientLogo" x1="8" y1="4" x2="32" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF0C2" />
              <stop offset="0.5" stopColor="#D4AF37" />
              <stop offset="1" stopColor="#B8860B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <span className={`font-serif font-bold tracking-wider text-white leading-tight ${isSmall ? 'text-base' : isLarge ? 'text-2xl' : 'text-lg'}`}>
          LIQUOR LOCKER <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#08140E] bg-gradient-to-r from-[#FFF0C2] via-[#D4AF37] to-[#C5A059] px-1.5 py-0.5 rounded inline-block ml-1 align-middle shadow-sm">AU</span>
        </span>
        <span className={`uppercase tracking-[0.25em] text-[#D4AF37] font-medium ${isSmall ? 'text-[9px]' : isLarge ? 'text-xs' : 'text-[10px]'}`}>
          FINE SPIRITS & VAULT
        </span>
      </div>
    </div>
  );
}

