'use client';

import React, { useState, useCallback } from 'react';
import { Menu } from 'lucide-react';
import { useScrollNavigation } from './hooks/useScrollNavigation';
import { NavLogo } from './components/NavLogo';
import { NavActions } from './components/NavActions';
import { MegaNavPanel } from './components/MegaNavPanel';
import { MobileMenu } from './components/MobileMenu';

export const Navigation: React.FC = () => {
  const { mobileOpen, toggleMobileMenu, closeMobileMenu } = useScrollNavigation(50);
  const [megaOpen, setMegaOpen] = useState(false);

  const toggleMega = useCallback(() => {
    setMegaOpen((prev) => !prev);
  }, []);

  const closeMega = useCallback(() => {
    setMegaOpen(false);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full bg-institutional-dark border-b border-white/10 py-3.5 sm:py-4 shadow-xl"
    >
      {/* Fixed Header Content Container Aligned to Global Site Grid */}
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-6">
        {/* 1. Left: Brand Logo */}
        <div className="flex items-center justify-start flex-shrink-0 z-50">
          <NavLogo />
        </div>

        {/* 2. Right: Utility Controls (Search, Directory Hamburger, Theme, Lang, CTA) */}
        <div className="flex items-center justify-end flex-shrink-0 gap-2.5 z-50">
          <NavActions isMegaOpen={megaOpen} onToggleMega={toggleMega} />

          {/* Mobile Hamburger Toggle (Mobile Only) */}
          <button
            onClick={toggleMobileMenu}
            aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            className="lg:hidden p-2.5 text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 4. Desktop Mega Navigation Panel (Drops down smoothly below fixed header) */}
      <MegaNavPanel isOpen={megaOpen} onClose={closeMega} />

      {/* 5. Mobile Navigation Drawer */}
      <MobileMenu isOpen={mobileOpen} onClose={closeMobileMenu} />
    </header>
  );
};

export default Navigation;
