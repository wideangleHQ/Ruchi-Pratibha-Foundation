'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { useScrollNavigation } from './hooks/useScrollNavigation';
import { NavLogo } from './components/NavLogo';
import { NavLinks } from './components/NavLinks';
import { NavActions } from './components/NavActions';
import { MobileMenu } from './components/MobileMenu';

export const Navigation: React.FC = () => {
  const { isScrolled, mobileOpen, toggleMobileMenu, closeMobileMenu } = useScrollNavigation(50);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full overflow-hidden ${
        isScrolled
          ? 'bg-institutional-dark/95 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-4 lg:py-5'
      }`}
    >
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-4 xl:px-8 2xl:px-12 flex items-center justify-between gap-2 lg:gap-3 xl:gap-6 2xl:gap-10">
        <NavLogo />
        <NavLinks />
        <NavActions />

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={toggleMobileMenu}
          aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-drawer"
          className="lg:hidden p-2.5 text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={closeMobileMenu} />
    </header>
  );
};

export default Navigation;
