'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Menu, Search, Sun, Moon, Globe } from 'lucide-react';
import { useScrollNavigation } from './hooks/useScrollNavigation';
import { NavLogo } from './components/NavLogo';
import { NavLinks } from './components/NavLinks';
import { NavActions } from './components/NavActions';
import { MegaNavPanel } from './components/MegaNavPanel';
import { MobileMenu } from './components/MobileMenu';

export const Navigation: React.FC = () => {
  const { mobileOpen, toggleMobileMenu, closeMobileMenu } = useScrollNavigation(50);
  const [megaOpen, setMegaOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'EN' | 'OR'>('EN');

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'EN' ? 'OR' : 'EN'));
  };

  const toggleMega = useCallback(() => {
    setMegaOpen((prev) => !prev);
  }, []);

  const closeMega = useCallback(() => {
    setMegaOpen(false);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full bg-institutional-dark border-b border-white/10 py-3 sm:py-3.5 shadow-xl"
    >
      {/* Fixed Header Content Container Aligned to Global Site Grid */}
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* 1. Left: Brand Logo */}
        <div className="flex items-center justify-start flex-shrink-0 z-50">
          <NavLogo />
        </div>

        {/* 2. Center: Desktop Primary Header Items */}
        <NavLinks />

        {/* 3. Right: Utility Controls (Search, Directory Hamburger, Theme, Lang, CTA) */}
        <div className="flex items-center justify-end flex-shrink-0 gap-1.5 sm:gap-2.5 z-50">
          <NavActions isMegaOpen={megaOpen} onToggleMega={toggleMega} />

          {/* Mobile Header Quick Utility Actions */}
          <div className="flex lg:hidden items-center gap-1.5">
            {/* Search Button */}
            <button
              aria-label="Search institutional platform"
              className="p-1.5 text-gray-300 hover:text-institutional-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-institutional-accent rounded-sm border border-white/15 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-institutional-accent" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              aria-label="Toggle theme mode"
              className="p-1.5 text-gray-300 hover:text-institutional-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-institutional-accent rounded-sm border border-white/15 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
            >
              {mounted && theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-institutional-accent" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-institutional-accent" />
              )}
            </button>

            {/* Language Selector */}
            <button
              onClick={toggleLang}
              aria-label={`Select language, currently ${lang}`}
              className="px-2 py-1 text-[10px] font-space font-semibold text-gray-300 hover:text-institutional-accent border border-white/15 rounded-sm min-h-[36px] flex items-center justify-center gap-1 cursor-pointer"
            >
              <Globe className="w-3 h-3 text-institutional-accent" />
              <span>{lang}</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle (Mobile Only) */}
          <button
            onClick={toggleMobileMenu}
            aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            className="lg:hidden p-2 text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer border border-white/15"
          >
            <Menu className="w-4 h-4 text-white" />
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
