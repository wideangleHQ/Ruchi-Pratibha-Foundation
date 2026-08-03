'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES, MegaCategoryItem } from './MegaNavPanel';
import { useActiveSection } from '@/hooks/useActiveSection';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const activeSection = useActiveSection();

  // Prevent background body scroll when mobile menu panel is open
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onClose();
    if (
      typeof window !== 'undefined' &&
      (window.location.pathname === '/about' || window.location.pathname === '/foundation') &&
      href.includes('#')
    ) {
      const targetId = href.split('#')[1];
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      }
    }
  };

  const isLinkActive = (href: string) => {
    if (!activeSection) return false;
    const hash = href.split('#')[1];
    return hash === activeSection;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Dim Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 top-[58px] sm:top-[64px] bg-black/60 backdrop-blur-xs z-30 lg:hidden"
            aria-hidden="true"
          />

          {/* Sticky Opaque Mobile Navigation Panel Attached Directly Beneath Header */}
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Directory"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[58px] sm:top-[64px] left-0 right-0 bottom-0 z-40 bg-institutional-dark border-b border-white/15 shadow-2xl lg:hidden flex flex-col pointer-events-auto overflow-hidden"
          >
            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto scrollbar-none p-5 sm:p-6 space-y-6 pb-12">
              {/* Accordion Navigation Groups */}
              <nav aria-label="Mobile Directory Navigation" className="w-full">
                <Accordion type="single" collapsible defaultValue="Foundation" className="w-full">
                  {CATEGORIES.map((item: MegaCategoryItem) => (
                    <AccordionItem key={item.label} value={item.label}>
                      <AccordionTrigger tag={item.tag}>{item.label}</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1">
                          {item.links.map((lnk) => {
                            const active = isLinkActive(lnk.href);
                            return (
                              <a
                                key={lnk.label}
                                href={lnk.href}
                                onClick={(e) => handleLinkClick(e, lnk.href)}
                                aria-label={lnk.ariaLabel}
                                className={`group/link flex items-center justify-between py-2 px-2.5 min-h-[44px] text-xs font-manrope rounded-sm transition-all duration-150 ${
                                  active
                                    ? 'text-institutional-accent bg-white/10 font-semibold'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <span className="flex items-center gap-2 group-hover/link:translate-x-1 transition-transform duration-150">
                                  {active && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-institutional-accent shrink-0 animate-pulse" />
                                  )}
                                  <span>{lnk.label}</span>
                                </span>
                                <ArrowUpRight className={`w-3.5 h-3.5 transition-all duration-150 ${active ? 'text-institutional-accent opacity-100' : 'text-institutional-accent opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'}`} />
                              </a>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </nav>

              {/* Primary CTA & Explore Section */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href="#volunteer"
                  onClick={onClose}
                  className="w-full text-center py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover rounded-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent shadow-md cursor-pointer whitespace-nowrap min-h-[48px] flex items-center justify-center"
                >
                  Become a Volunteer
                </a>

                <a
                  href="/about#about-hero"
                  onClick={(e) => handleLinkClick(e, '/about#about-hero')}
                  className="w-full text-center py-2.5 text-[11px] uppercase tracking-widest font-space font-semibold text-gray-300 hover:text-white border border-white/10 hover:border-institutional-accent/40 rounded-sm transition-colors duration-150 cursor-pointer min-h-[40px] flex items-center justify-center gap-1.5"
                >
                  <span>Explore Hero</span>
                  <span className="text-institutional-accent font-semibold">EXPLORE →</span>
                </a>
              </div>

              {/* Editorial Mobile Menu Footer Area */}
              <div className="pt-6 border-t border-white/10 space-y-2.5 font-manrope text-xs text-gray-400">
                <div className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold">
                  Ruchi Prativa Foundation
                </div>
                <p className="text-[11px] leading-relaxed text-gray-400">
                  Bhubaneswar, Odisha, India · Registered Public Charitable Trust
                </p>
                <div className="flex items-center justify-between text-[10px] font-space text-gray-500 pt-1">
                  <span>© {new Date().getFullYear()} Ruchi Prativa Foundation</span>
                  <span className="text-institutional-accent/80">Odisha Heritage & CSR</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
