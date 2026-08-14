'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Check, X, ArrowRight, RotateCcw } from 'lucide-react';
import { COMPLIANCE } from '@/config/site';
import Logo from '@/components/Logo';

export default function AgeGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [showYearCalc, setShowYearCalc] = useState(false);
  const [dobYear, setDobYear] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const verified = localStorage.getItem('liquor-locker-age-verified');
    if (!verified) {
      const timer = setTimeout(() => setIsOpen(true), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleYes = () => {
    localStorage.setItem('liquor-locker-age-verified', 'true');
    setIsOpen(false);
  };

  const handleNo = () => {
    setIsDenied(true);
  };

  const handleVerifyYear = (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const year = parseInt(dobYear, 10);

    if (!year || isNaN(year) || year < 1920 || year > currentYear) {
      setErrorMsg('Please enter a valid 4-digit birth year.');
      return;
    }

    if (currentYear - year < COMPLIANCE.ageMinimum) {
      setIsDenied(true);
      return;
    }

    localStorage.setItem('liquor-locker-age-verified', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-lg rounded-2xl border border-[#D4AF37]/40 bg-[#08140E] p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

        {/* Logo Header */}
        <div className="flex justify-center mb-6">
          <Logo size="md" />
        </div>

        {!isDenied ? (
          <div>
            <div className="inline-block rounded-full bg-[#0E2017] border border-[#D4AF37]/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">
              AGE VERIFICATION REQUIRED
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              ARE YOU OF LEGAL DRINKING AGE?
            </h2>

            <p className="mt-3 text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
              In accordance with Australian Liquor Licensing Laws (RSA Regulations), you must be at least <span className="text-[#D4AF37] font-bold">{COMPLIANCE.ageMinimum} years of age</span> to enter the vault and purchase fine spirits.
            </p>

            {/* YES and NO Option Buttons */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleYes}
                className="group relative flex items-center justify-center gap-2 rounded-xl gold-bg-gradient py-4 px-6 text-sm font-bold uppercase tracking-wider text-black shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <Check className="h-5 w-5 stroke-[2.5]" />
                <span>YES, I AM {COMPLIANCE.ageMinimum}+</span>
              </button>

              <button
                type="button"
                onClick={handleNo}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#1A3828] bg-[#0E2017] py-4 px-6 text-sm font-bold uppercase tracking-wider text-gray-300 hover:border-red-500/50 hover:bg-red-950/30 hover:text-red-300 active:scale-[0.98] transition-all"
              >
                <X className="h-5 w-5" />
                <span>NO, I AM UNDER {COMPLIANCE.ageMinimum}</span>
              </button>
            </div>

            {/* Toggle Birth Year Calculator */}
            <div className="mt-6 pt-4 border-t border-[#1A3828]">
              {!showYearCalc ? (
                <button
                  type="button"
                  onClick={() => setShowYearCalc(true)}
                  className="text-xs text-gray-400 hover:text-[#D4AF37] transition-colors underline underline-offset-4"
                >
                  Need to verify with birth year instead?
                </button>
              ) : (
                <form onSubmit={handleVerifyYear} className="mt-2 text-left bg-[#0E2017] p-3 rounded-xl border border-[#1A3828]">
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-1.5">
                    Enter Birth Year
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="e.g. 1995"
                      value={dobYear}
                      onChange={(e) => {
                        setDobYear(e.target.value);
                        setErrorMsg('');
                      }}
                      className="w-full rounded-lg border border-[#1A3828] bg-[#050E0A] px-3 py-2 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none text-sm"
                      min="1920"
                      max={new Date().getFullYear()}
                    />
                    <button
                      type="submit"
                      className="rounded-lg gold-bg-gradient px-4 py-2 font-bold text-black transition-opacity hover:opacity-90 text-xs uppercase tracking-wider whitespace-nowrap"
                    >
                      Verify
                    </button>
                  </div>
                  {errorMsg && (
                    <p className="mt-2 text-xs text-red-400">{errorMsg}</p>
                  )}
                </form>
              )}
            </div>

            <p className="mt-6 text-[10px] text-gray-500 leading-tight">
              Liquor Act 2007: It is an offence to sell or supply alcohol to, or to obtain alcohol on behalf of, a person under the age of 18 years. License No. LIQP770010234.
            </p>
          </div>
        ) : (
          /* DENIED VIEW */
          <div className="py-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-950/60 border border-red-800/80 text-red-400 shadow-inner">
              <ShieldAlert className="h-8 w-8" />
            </div>

            <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
              ACCESS RESTRICTED
            </h2>

            <p className="mt-3 text-sm text-gray-300 leading-relaxed max-w-sm mx-auto">
              We are sorry, but you must be at least {COMPLIANCE.ageMinimum} years of age to access Liquor Locker AU in accordance with Australian Liquor Laws.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="https://drinkwise.org.au"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-gray-800 py-3 px-6 text-xs font-bold uppercase tracking-wider text-white hover:bg-gray-700 transition-colors"
              >
                <span>Visit DrinkWise Australia</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsDenied(false)}
                className="flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-[#D4AF37] transition-colors py-2"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>I made a mistake, take me back</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
