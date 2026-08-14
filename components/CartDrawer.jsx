'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';
import { SITE, SHOP, CONTACT } from '@/config/site';
import SmartImage from '@/components/SmartImage';

export default function CartDrawer({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMode, setPaymentMode] = useState('payid'); // 'payid' | 'crypto' | 'whatsapp'
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const loadCart = React.useCallback(() => {
    try {
      const stored = localStorage.getItem(SITE.cartKey);
      if (stored) {
        setCartItems(JSON.parse(stored));
      } else {
        setCartItems([]);
      }
    } catch (e) {
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => loadCart(), 0);
    const handleStorage = () => loadCart();
    window.addEventListener('liquor-locker-cart-update', handleStorage);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('liquor-locker-cart-update', handleStorage);
    };
  }, [loadCart]);

  const updateQuantity = (cartKeyOrSlug, delta) => {
    const updated = cartItems.map((item) => {
      const key = item.cartKey || item.slug;
      if (key === cartKeyOrSlug) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean);

    setCartItems(updated);
    localStorage.setItem(SITE.cartKey, JSON.stringify(updated));
    window.dispatchEvent(new Event('liquor-locker-cart-update'));
  };

  const removeItem = (cartKeyOrSlug) => {
    const updated = cartItems.filter((item) => (item.cartKey || item.slug) !== cartKeyOrSlug);
    setCartItems(updated);
    localStorage.setItem(SITE.cartKey, JSON.stringify(updated));
    window.dispatchEvent(new Event('liquor-locker-cart-update'));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isMinOrderMet = subtotal >= SHOP.minOrder;
  const isFreeShipping = subtotal >= SHOP.freeShippingThreshold;
  const shippingCost = isFreeShipping || subtotal === 0 ? 0 : SHOP.shippingFee;
  
  const isCrypto = paymentMode === 'crypto';
  const cryptoDiscount = isCrypto ? Math.round(subtotal * (SHOP.cryptoDiscount / 100)) : 0;
  const grandTotal = Math.max(0, subtotal - cryptoDiscount + shippingCost);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!isMinOrderMet) return;

    if (paymentMode === 'whatsapp') {
      const itemsList = cartItems.map(i => `• ${i.name} (x${i.quantity}) - $${i.price * i.quantity} AUD`).join('%0A');
      const msg = `Hello Liquor Locker Vault Concierge! I would like to place an order:%0A%0A${itemsList}%0A%0ASubtotal: $${subtotal} AUD%0AShipping: $${shippingCost} AUD%0AGrand Total: $${grandTotal} AUD%0A%0APlease assist me with payment details and age verification.`;
      window.open(`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${msg}`, '_blank');
      onClose();
      return;
    }

    // Direct Order Form Checkout
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      localStorage.removeItem(SITE.cartKey);
      window.dispatchEvent(new Event('liquor-locker-cart-update'));
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="flex h-full w-full max-w-md flex-col bg-[#08140E] text-white shadow-2xl border-l border-[#1A3828]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1A3828] p-4 bg-[#050E0A]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#D4AF37]" />
            <h2 className="text-lg font-serif font-bold text-white tracking-wide">
              YOUR VAULT CART
            </h2>
            <span className="rounded-full bg-[#0E2017] px-2 py-0.5 text-xs text-[#D4AF37] border border-[#1A3828]">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-[#0E2017] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        {orderComplete ? (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <CheckCircle2 className="h-16 w-16 text-[#D4AF37] mb-3" />
            <h3 className="text-xl font-serif font-bold text-white">ORDER DRAFT SUBMITTED</h3>
            <p className="mt-2 text-sm text-gray-300">
              Thank you! Your vault order draft has been logged. Our concierge team will send PayID / Bank Transfer details to your email shortly.
            </p>
            <div className="mt-6 rounded-lg bg-[#050E0A] p-4 text-xs text-left border border-[#D4AF37]/30 text-gray-300 w-full">
              <p className="font-semibold text-[#D4AF37] mb-1">PayID Instant Payment Info:</p>
              <p>PayID Identifier: <span className="text-white font-mono">payid@liquorlocker.com.au</span></p>
              <p className="mt-1">Bank: Macquarie Bank Australia</p>
              <p className="mt-1">Account Name: Liquor Locker Vault AU</p>
            </div>
            <button
              onClick={() => {
                setOrderComplete(false);
                onClose();
              }}
              className="mt-6 w-full rounded-md gold-bg-gradient py-3 text-sm font-semibold text-black hover:opacity-90 transition-opacity"
            >
              Continue Browsing Vault
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0E2017] border border-[#D4AF37]/20 text-[#D4AF37] mb-4">
              <ShoppingBag className="h-10 w-10 opacity-50" />
            </div>
            <p className="text-lg font-serif text-gray-300">Your vault cart is empty.</p>
            <p className="mt-1 text-xs text-gray-500">
              Browse our rare single malts, craft gins, and fine wines.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-md border border-[#D4AF37]/40 bg-[#0E2017] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:bg-[#1A3828]"
            >
              Explore Vault Collection
            </button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col overflow-y-auto p-4 space-y-4">
            {/* Free Shipping Progress */}
            <div className="rounded-lg bg-[#0E2017] p-3 border border-[#1A3828]">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">
                  {isFreeShipping
                    ? '🎉 You unlocked FREE Express Climate Delivery!'
                    : `Add $${SHOP.freeShippingThreshold - subtotal} AUD for FREE Express Delivery`}
                </span>
                <span className="font-mono text-[#D4AF37]">
                  ${subtotal} / ${SHOP.freeShippingThreshold}
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#050E0A] rounded-full overflow-hidden">
                <div
                  className="h-full gold-bg-gradient transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / SHOP.freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>

            {/* Min Order Notice */}
            {!isMinOrderMet && (
              <div className="rounded-md bg-amber-950/40 border border-amber-600/40 p-3 text-xs text-amber-200">
                ⚠️ Vault Minimum Order is <span className="font-bold">${SHOP.minOrder} AUD</span>. Add ${(SHOP.minOrder - subtotal).toFixed(0)} AUD more to enable checkout.
              </div>
            )}

            {/* Cart Items List */}
            <div className="space-y-3 flex-1">
              {cartItems.map((item) => {
                const itemKey = item.cartKey || item.slug;
                return (
                  <div
                    key={itemKey}
                    className="flex gap-3 rounded-lg border border-[#1A3828] bg-[#0E2017] p-2.5 items-center"
                  >
                    <SmartImage
                      src={item.image || 'https://picsum.photos/seed/liquorbottle/120/120'}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="h-16 w-16 rounded shrink-0 p-1 object-contain bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white line-clamp-1">{item.name}</h4>
                      {item.variantName && (
                        <span className="text-[10px] font-mono text-[#D4AF37] block mt-0.5">
                          Format: {item.variantName}
                        </span>
                      )}
                      <p className="text-xs text-white font-mono mt-0.5 font-bold">${item.price.toFixed(2)} AUD</p>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-[#1A3828] rounded bg-[#050E0A]">
                          <button
                            onClick={() => updateQuantity(itemKey, -1)}
                            className="px-2 py-0.5 text-gray-400 hover:text-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-xs font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(itemKey, 1)}
                            className="px-2 py-0.5 text-gray-400 hover:text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(itemKey)}
                          className="text-gray-500 hover:text-red-400 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs font-bold text-[#D4AF37] shrink-0">
                      ${(item.price * item.quantity).toFixed(2)} AUD
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payment Method Selector */}
            <div className="rounded-lg border border-[#1A3828] bg-[#0E2017] p-3 text-xs space-y-2">
              <span className="text-gray-400 font-medium block uppercase tracking-wider text-[10px]">
                Select Checkout Preference
              </span>

              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setPaymentMode('payid')}
                  className={`py-1.5 px-2 rounded text-[11px] font-medium border text-center transition-colors ${
                    paymentMode === 'payid'
                      ? 'border-[#D4AF37] bg-[#1A3828] text-white'
                      : 'border-[#1A3828] text-gray-400 hover:bg-[#050E0A]'
                  }`}
                >
                  PayID / Bank
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode('crypto')}
                  className={`py-1.5 px-2 rounded text-[11px] font-medium border text-center transition-colors ${
                    paymentMode === 'crypto'
                      ? 'border-[#D4AF37] bg-[#1A3828] text-[#D4AF37]'
                      : 'border-[#1A3828] text-gray-400 hover:bg-[#050E0A]'
                  }`}
                >
                  Crypto (10% OFF)
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode('whatsapp')}
                  className={`py-1.5 px-2 rounded text-[11px] font-medium border text-center transition-colors ${
                    paymentMode === 'whatsapp'
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                      : 'border-[#1A3828] text-gray-400 hover:bg-[#050E0A]'
                  }`}
                >
                  WhatsApp
                </button>
              </div>

              {isCrypto && (
                <div className="p-2 rounded bg-amber-950/30 border border-amber-600/30 text-[11px] text-amber-200">
                  ⚡ 10% Crypto Discount Applied! Save <span className="font-bold">${cryptoDiscount} AUD</span> with Bitcoin or USDT.
                </div>
              )}
            </div>

            {/* Totals Summary */}
            <div className="border-t border-[#1A3828] pt-3 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal} AUD</span>
              </div>

              {isCrypto && (
                <div className="flex justify-between text-[#D4AF37]">
                  <span>Crypto Discount (10%)</span>
                  <span>-${cryptoDiscount} AUD</span>
                </div>
              )}

              <div className="flex justify-between text-gray-400">
                <span>Express Climate Courier</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost} AUD`}</span>
              </div>

              <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-[#1A3828]">
                <span>Total (Inc. GST)</span>
                <span className="text-[#D4AF37]">${grandTotal} AUD</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckoutSubmit}
              disabled={!isMinOrderMet || isCheckingOut}
              className={`w-full rounded-md py-3 font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                isMinOrderMet
                  ? 'gold-bg-gradient text-black hover:opacity-90 shadow-lg cursor-pointer'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isCheckingOut ? (
                'Processing Order Vault...'
              ) : !isMinOrderMet ? (
                `Min Order $${SHOP.minOrder} AUD Required`
              ) : paymentMode === 'whatsapp' ? (
                <>Order via WhatsApp Concierge <ArrowRight className="h-4 w-4" /></>
              ) : (
                <>Proceed to PayID / Crypto Checkout <ArrowRight className="h-4 w-4" /></>
              )}
            </button>

            <p className="text-[10px] text-center text-gray-500 flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3 text-[#D4AF37]" /> RSA Age Verification Required Upon Dispatch
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
