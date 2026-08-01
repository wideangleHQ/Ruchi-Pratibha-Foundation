'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { X, Search, Globe, Sun, Moon, Laptop } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 top-0 left-0 w-full h-screen bg-institutional-darker/98 backdrop-blur-xl text-white z-50 flex flex-col p-6 sm:p-8 overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.svg"
                alt="Ruchi Prativa Foundation Logo"
                width={36}
                height={36}
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
              />
              <span className="font-cormorant text-xl sm:text-2xl font-bold text-institutional-accent whitespace-nowrap">
                Ruchi Prativa Foundation
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 text-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 my-8 flex flex-col justify-center space-y-5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="font-cormorant text-2xl sm:text-3xl font-semibold tracking-wide text-gray-200 hover:text-institutional-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent transition-colors duration-200 py-1 whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-col space-y-4">
            <div className="flex items-center justify-between gap-3">
              <button
                aria-label="Search"
                className="flex items-center gap-2 text-xs font-space text-gray-300 hover:text-institutional-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent p-2"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>

              {/* Theme Cycle Button */}
              <button
                onClick={() => {
                  if (theme === 'light') setTheme('dark');
                  else if (theme === 'dark') setTheme('system');
                  else setTheme('light');
                }}
                aria-label="Cycle theme mode"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-space text-gray-300 border border-white/10 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent capitalize"
              >
                {mounted && theme === 'light' ? (
                  <Sun className="w-3.5 h-3.5 text-institutional-accent" />
                ) : mounted && theme === 'dark' ? (
                  <Moon className="w-3.5 h-3.5 text-institutional-accent" />
                ) : (
                  <Laptop className="w-3.5 h-3.5 text-institutional-accent" />
                )}
                <span>{mounted ? theme : 'System'}</span>
              </button>

              <button
                aria-label="Select Language"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-space text-gray-300 border border-white/10 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent"
              >
                <Globe className="w-4 h-4" />
                <span>EN | OR</span>
              </button>
            </div>
            <a
              href="#volunteer"
              onClick={onClose}
              className="w-full text-center py-3.5 text-xs uppercase tracking-widest font-space font-medium text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover rounded-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent whitespace-nowrap"
            >
              Become a Volunteer
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
