'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES, MegaCategoryItem } from './MegaNavPanel';
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
            {/* Scrollable Content Container (Adapts to all Mobile Heights 320px–480px with Safe Area Bottom Padding) */}
            <div className="flex-1 overflow-y-auto scrollbar-none p-5 sm:p-6 space-y-6 pb-12">
              {/* Accordion Navigation Groups (Official shadcn/ui Accordion Base) */}
              <nav aria-label="Mobile Directory Navigation" className="w-full">
                <Accordion type="single" collapsible defaultValue="Foundation" className="w-full">
                  {CATEGORIES.map((item: MegaCategoryItem) => (
                    <AccordionItem key={item.label} value={item.label}>
                      <AccordionTrigger tag={item.tag}>{item.label}</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1">
                          {item.links.map((lnk) => (
                            <a
                              key={lnk.label}
                              href={lnk.href}
                              onClick={onClose}
                              aria-label={lnk.ariaLabel}
                              className="group/link flex items-center justify-between py-2 px-2.5 min-h-[44px] text-xs font-manrope text-gray-300 hover:text-white hover:bg-white/5 rounded-sm transition-all duration-150"
                            >
                              <span className="group-hover/link:translate-x-1 transition-transform duration-150">
                                {lnk.label}
                              </span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-institutional-accent opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-150" />
                            </a>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </nav>

              {/* Primary CTA Section */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="#volunteer"
                  onClick={onClose}
                  className="w-full text-center py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover rounded-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent shadow-md cursor-pointer whitespace-nowrap min-h-[48px] flex items-center justify-center"
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
