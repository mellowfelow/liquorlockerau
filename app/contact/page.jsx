'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MapPin, MessageCircle, Send, ShieldCheck, Clock } from 'lucide-react';
import { SITE, CONTACT, FORMS } from '@/config/site';

export default function ContactPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    const form = e.target;
    const accessKey = FORMS.web3formsKey;

    // Key-pending fallback - if key is empty/placeholder, redirect directly to thank-you
    if (!accessKey || accessKey.startsWith('YOUR-') || accessKey === 'pending') {
      setTimeout(() => {
        router.push('/thank-you-contact/');
      }, 500);
      return;
    }

    try {
      const formData = new FormData(form);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json', // Accept header ONLY - NO Content-Type header
        },
        body: formData,
      });

      const data = await res.json();

      if (res.status === 200 && data.success) {
        router.push('/thank-you-contact/');
      } else {
        throw new Error(data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setErrorMessage('Unable to process inquiry right now. Please message us directly on WhatsApp or Email.');
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#08140E] min-h-screen py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            BARANGAROO VAULT CONCIERGE
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Contact Liquor Locker AU
          </h1>
          <p className="text-xs text-gray-400">
            Have questions about bottle availability, cellar storage, or crypto payments? Connect with our Sydney vault team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#1A3828] bg-[#0E2017] p-6 space-y-6">
              <h2 className="text-lg font-serif font-bold text-white text-[#D4AF37]">
                Sydney Headquarters & Vault
              </h2>

              <div className="space-y-4 text-xs text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Barangaroo Vault Facility</p>
                    <p className="text-gray-400">100 Barangaroo Avenue, Sydney NSW 2000, Australia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Concierge Operating Hours</p>
                    <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM AEST</p>
                    <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM AEST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Email Communications</p>
                    <p className="text-gray-400 font-mono">vault&#64;liquorlocker.com.au</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Telephone / WhatsApp</p>
                    <p className="text-gray-400 font-mono">+61 2 8000 7799</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1A3828]">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-lg border border-emerald-500 bg-emerald-950/50 py-3 px-4 text-xs font-bold text-emerald-300 hover:bg-emerald-900/70 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" /> Connect via WhatsApp Live Concierge
                </a>
              </div>
            </div>

            <div className="rounded-xl bg-[#050E0A] p-4 border border-[#1A3828] text-xs text-gray-400 space-y-1">
              <p className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#D4AF37]" /> RSA Compliance Notice
              </p>
              <p className="text-[11px]">
                Liquor License LIQP770010234. All inquiries regarding alcohol sales require confirmation that recipient is 21 years or older.
              </p>
            </div>
          </div>

          {/* Right Web3Forms Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#1A3828] bg-[#0E2017] p-6 sm:p-8 shadow-2xl">
              <h2 className="text-xl font-serif font-bold text-white mb-2">
                Send Vault Concierge Inquiry
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Fill out the form below. Our Sydney vault team will respond within 2 business hours.
              </p>

              {errorMessage && (
                <div className="mb-6 rounded-lg bg-red-950/50 border border-red-800 p-4 text-xs text-red-300">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Web3Forms Mandatory Hidden Inputs */}
                <input type="hidden" name="access_key" value={FORMS.web3formsKey} />
                <input type="hidden" name="subject" value="New Inquiry - Liquor Locker AU Vault" />
                <input type="hidden" name="from_name" value="Liquor Locker Contact Form" />
                <input type="text" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. James Montgomery"
                    className="w-full rounded-lg border border-[#1A3828] bg-[#050E0A] px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="james@example.com.au"
                      className="w-full rounded-lg border border-[#1A3828] bg-[#050E0A] px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-gray-300 mb-1">
                      Mobile / Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+61 400 000 000"
                      className="w-full rounded-lg border border-[#1A3828] bg-[#050E0A] px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry_type" className="block text-xs font-semibold text-gray-300 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    id="inquiry_type"
                    name="inquiry_type"
                    className="w-full rounded-lg border border-[#1A3828] bg-[#050E0A] px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="bottle_allocation">Rare Bottle Allocation Inquiry</option>
                    <option value="payment_crypto">Crypto Payment Assistance (BTC / USDT)</option>
                    <option value="cellar_storage">Barangaroo Vault Storage Query</option>
                    <option value="wholesale">B2B / Licensed Wholesale Account</option>
                    <option value="general">General Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-300 mb-1">
                    Your Message / Inquiry Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Please let us know which bottle or service you require..."
                    className="w-full rounded-lg border border-[#1A3828] bg-[#050E0A] px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="age_confirm"
                    name="age_confirm"
                    required
                    className="rounded border-[#1A3828] bg-[#050E0A] text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <label htmlFor="age_confirm" className="text-[11px] text-gray-400">
                    I confirm that I am at least 21 years of age in accordance with Australian RSA guidelines.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg gold-bg-gradient py-3.5 px-6 text-xs font-bold text-black hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? 'Transmitting Inquiry...' : 'Send Message to Vault'}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
