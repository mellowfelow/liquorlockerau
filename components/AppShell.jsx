'use client';

import React, { useState } from 'react';
import AnnouncementBar from './AnnouncementBar';
import Nav from './Nav';
import CartDrawer from './CartDrawer';
import ChatHub from './ChatHub';
import AgeGate from './AgeGate';
import Footer from './Footer';

export default function AppShell({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#08140E] text-[#F5F5F7] selection:bg-[#D4AF37] selection:text-black">
      <AgeGate />
      <AnnouncementBar />
      <Nav onOpenCart={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      <main id="main" className="flex-1">
        {children}
      </main>

      <ChatHub />
      <Footer />
    </div>
  );
}
