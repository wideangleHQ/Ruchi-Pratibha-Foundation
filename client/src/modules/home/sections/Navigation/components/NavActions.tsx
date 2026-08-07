'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Search, Sun, Moon, Laptop, Globe, Menu, X } from 'lucide-react';

interface NavActionsProps {
  isMegaOpen?: boolean;
  onToggleMega?: () => void;
}

export const NavActions: React.FC<NavActionsProps> = ({
  isMegaOpen = false,
  onToggleMega,
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'EN' | 'OR'>('EN');

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'EN' ? 'OR' : 'EN'));
  };

  return (
    <div className="hidden lg:flex items-center gap-1.5 lg:gap-2 xl:gap-3 2xl:gap-4 flex-shrink-0">
      {/* 1. Search Button */}
      <button
        aria-label="Search institutional platform"
        className="h-8 w-8 flex items-center justify-center text-gray-300 hover:text-institutional-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm border border-white/10 flex-shrink-0 cursor-pointer"
      >
        <Search className="w-3.5 h-3.5" />
      </button>

      {/* 2. Hamburger Menu Button (Positioned in Utility Section beside Search) */}
      <button
        onClick={onToggleMega}
        aria-label={isMegaOpen ? 'Close Navigation Directory' : 'Open Navigation Directory'}
        aria-expanded={isMegaOpen}
        title={isMegaOpen ? 'Close Directory' : 'Explore Directory'}
        className="h-8 px-2.5 flex items-center justify-center gap-1.5 text-gray-300 hover:text-institutional-accent border border-white/15 hover:border-institutional-accent/50 rounded-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent text-[11px] font-space tracking-wider whitespace-nowrap flex-shrink-0 cursor-pointer"
      >
        {isMegaOpen ? (
          <X className="w-3.5 h-3.5 text-institutional-accent" />
        ) : (
          <Menu className="w-3.5 h-3.5 text-institutional-accent" />
        )}
        <span className="font-semibold text-gray-200">Directory</span>
      </button>

      {/* 3. Theme Toggle (Light / Dark / System via next-themes) */}
      <button
        onClick={cycleTheme}
        aria-label="Cycle theme mode (Light, Dark, System)"
        title={`Theme: ${mounted ? theme : 'system'} (Click to switch)`}
        className="h-8 px-2 lg:px-2.5 flex items-center justify-center gap-1 text-gray-300 hover:text-institutional-accent border border-white/15 rounded-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent text-[10px] lg:text-[11px] font-space tracking-wider whitespace-nowrap flex-shrink-0 cursor-pointer"
      >
        {!mounted ? (
          <Laptop className="w-3.5 h-3.5" />
        ) : theme === 'light' ? (
          <Sun className="w-3.5 h-3.5 text-institutional-accent" />
        ) : theme === 'dark' ? (
          <Moon className="w-3.5 h-3.5 text-institutional-accent" />
        ) : (
          <Laptop className="w-3.5 h-3.5 text-institutional-accent" />
        )}
        <span className="capitalize">{mounted ? theme : 'Theme'}</span>
      </button>

      {/* 4. Language Selector */}
      <button
        onClick={toggleLang}
        aria-label={`Select language, currently ${lang}`}
        className="h-8 px-2 lg:px-2.5 flex items-center justify-center gap-1 text-[10px] lg:text-[11px] font-space tracking-wider text-gray-300 hover:text-institutional-accent border border-white/15 rounded-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent whitespace-nowrap flex-shrink-0 cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{lang}</span>
      </button>

      {/* 5. Volunteer CTA */}
      <a
        href="/get-involved/volunteer"
        className="h-8 px-2.5 lg:px-3.5 flex items-center justify-center text-[10px] lg:text-[11px] uppercase tracking-wider xl:tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent whitespace-nowrap flex-shrink-0"
      >
        Become a Volunteer
      </a>
    </div>
  );
};
