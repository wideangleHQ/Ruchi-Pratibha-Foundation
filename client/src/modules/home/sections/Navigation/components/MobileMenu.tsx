'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import dumdaarLogo from '@/assets/Dumdaar Odia Png.png';
import { DIRECTORY_CATEGORIES, NavCategoryItem } from '../constants/navigationConfig';
import { useActiveSection } from '@/hooks/useActiveSection';
import { usePageTransition } from '@/core/providers/page-transition-provider';
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
  const { startTransition } = usePageTransition();

  // Prevent background body scroll when mobile menu panel is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onClose();
    if (typeof window !== 'undefined') {
      const [path, hash] = href.includes('#') ? href.split('#') : [href, ''];
      const isHomePage = path === '' || path === '/';
      const isCurrentPage = isHomePage
        ? window.location.pathname === '/'
        : path === window.location.pathname;

      if (isCurrentPage) {
        e.preventDefault();
        if (isHomePage && (!hash || hash === 'hero')) {
          const heroEl = document.getElementById('hero');
          if (heroEl) {
            const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
            heroEl.scrollIntoView({ behavior });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          window.history.pushState(null, '', '/');
        } else if (hash) {
          const el = document.getElementById(hash);
          if (el) {
            const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
            el.scrollIntoView({ behavior });
            window.history.pushState(null, '', href);
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        // Intercept link click and route using client-side transition
        e.preventDefault();
        startTransition(href);
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
            className="fixed inset-0 top-[52px] sm:top-[58px] bg-black/60 backdrop-blur-xs z-30 lg:hidden"
            aria-hidden="true"
          />

          {/* Opaque Mobile Navigation Panel Attached Directly Beneath Header */}
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Directory"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[52px] sm:top-[58px] left-0 right-0 bottom-0 z-40 bg-institutional-dark border-b border-white/15 shadow-2xl lg:hidden flex flex-col pointer-events-auto overflow-hidden"
          >
            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto scrollbar-none p-4 sm:p-6 space-y-6 pb-12">
              {/* Accordion Navigation Groups */}
              <nav aria-label="Mobile Directory Navigation" className="w-full">
                <Accordion type="single" collapsible defaultValue="Foundation" className="w-full">
                  {DIRECTORY_CATEGORIES.map((item: NavCategoryItem) => (
                    <AccordionItem key={item.label} value={item.label}>
                      <AccordionTrigger className="text-white hover:text-institutional-accent text-lg font-bold font-cormorant">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1">
                          {item.links.map((lnk) => {
                            const active = isLinkActive(lnk.href);
                            const isDumdaar = lnk.label.toLowerCase().includes('dumdaar');
                            return (
                              <a
                                key={lnk.label}
                                href={lnk.href}
                                onClick={(e) => handleLinkClick(e, lnk.href)}
                                aria-label={lnk.ariaLabel}
                                className={`group/link flex items-center justify-between py-2 px-2.5 min-h-[44px] text-xs font-manrope rounded-sm transition-all duration-150 ${
                                  active
                                    ? 'text-institutional-accent bg-white/10 font-bold'
                                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                <span className="flex items-center gap-2 group-hover/link:translate-x-1 transition-transform duration-150">
                                  {active && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-institutional-accent shrink-0 animate-pulse" />
                                  )}
                                  {isDumdaar && (
                                    <Image
                                      src={dumdaarLogo}
                                      alt="Dumdaar Odia Logo"
                                      width={16}
                                      height={16}
                                      className="w-4 h-4 object-contain shrink-0"
                                    />
                                  )}
                                  <span className="text-white font-medium">{lnk.label}</span>
                                </span>
                                <ArrowUpRight className={`w-3.5 h-3.5 transition-all duration-150 ${active ? 'text-institutional-accent opacity-100' : 'text-institutional-accent opacity-80 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'}`} />
                              </a>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </nav>

              {/* Primary CTA Section */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href="/get-involved/volunteer"
                  onClick={onClose}
                  className="w-full text-center py-3 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover rounded-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent shadow-md cursor-pointer whitespace-nowrap min-h-[44px] flex items-center justify-center"
                >
                  Become a Volunteer
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
