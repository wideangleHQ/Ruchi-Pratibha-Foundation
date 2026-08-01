'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Search, Sun, Moon, Laptop, Globe } from 'lucide-react';

export const NavActions: React.FC = () => {
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
    <div className="hidden lg:flex items-center space-x-2 lg:space-x-2.5 xl:space-x-4 flex-shrink-0">
      {/* Search Button */}
      <button
        aria-label="Search institutional platform"
        className="h-8 w-8 flex items-center justify-center text-gray-300 hover:text-institutional-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm border border-white/10 flex-shrink-0"
      >
        <Search className="w-3.5 h-3.5" />
      </button>

      {/* Theme Toggle (Light / Dark / System via next-themes) */}
      <button
        onClick={cycleTheme}
        aria-label="Cycle theme mode (Light, Dark, System)"
        title={`Theme: ${mounted ? theme : 'system'} (Click to switch)`}
        className="h-8 px-2 lg:px-2.5 flex items-center justify-center gap-1 text-gray-300 hover:text-institutional-accent border border-white/15 rounded-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent text-[10px] lg:text-[11px] font-space tracking-wider whitespace-nowrap flex-shrink-0"
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

      {/* Language Selector */}
      <button
        onClick={toggleLang}
        aria-label={`Select language, currently ${lang}`}
        className="h-8 px-2 lg:px-2.5 flex items-center justify-center gap-1 text-[10px] lg:text-[11px] font-space tracking-wider text-gray-300 hover:text-institutional-accent border border-white/15 rounded-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent whitespace-nowrap flex-shrink-0"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{lang}</span>
      </button>

      {/* Volunteer CTA */}
      <a
        href="#volunteer"
        className="h-8 px-2.5 lg:px-3.5 flex items-center justify-center text-[10px] lg:text-[11px] uppercase tracking-wider xl:tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent whitespace-nowrap flex-shrink-0"
      >
        Become a Volunteer
      </a>
    </div>
  );
};
