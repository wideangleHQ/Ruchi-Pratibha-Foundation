'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { usePageTransition } from '@/core/providers/page-transition-provider';
import { FOOTER_SECTIONS } from '../constants';

export const FooterLinksGrid: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const pathname = usePathname();
  const { startTransition } = usePageTransition();

  const toggleAccordion = (title: string) => {
    setOpenAccordion((prev) => (prev === title ? null : title));
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (typeof window !== 'undefined') {
      const [path, hash] = href.includes('#') ? href.split('#') : [href, ''];
      const isCurrentPage =
        path === '' ||
        path === window.location.pathname;

      if (isCurrentPage && hash) {
        const el = document.getElementById(hash);
        if (el) {
          e.preventDefault();
          const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
          el.scrollIntoView({ behavior });
          window.history.pushState(null, '', href);
        }
      } else {
        // Intercept link click and route using client-side transition
        e.preventDefault();
        startTransition(href);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 py-12 border-b border-white/10 dark:border-white/10 border-black/10">
      {FOOTER_SECTIONS.map((section) => {
        const isOpen = openAccordion === section.title;
        return (
          <div key={section.title} className="flex flex-col">
            {/* Desktop Section Header */}
            <h4 className="hidden md:block font-space text-xs uppercase tracking-widest font-semibold text-institutional-accent mb-4 whitespace-nowrap">
              {section.title}
            </h4>

            {/* Mobile Accordion Toggle Header */}
            <button
              onClick={() => toggleAccordion(section.title)}
              className="md:hidden flex items-center justify-between py-3 border-b border-white/10 dark:border-white/10 border-black/10 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-institutional-accent"
              aria-expanded={isOpen}
            >
              <span className="font-space text-xs uppercase tracking-widest font-semibold text-institutional-accent whitespace-nowrap">
                {section.title}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 text-institutional-accent ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Links List */}
            <ul
              className={`${
                isOpen ? 'block pt-3' : 'hidden'
              } md:block space-y-2.5 transition-all duration-200`}
            >
              {section.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-manrope text-xs text-gray-300 dark:text-gray-300 hover:text-institutional-accent dark:hover:text-institutional-accent transition-colors duration-200 inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-institutional-accent whitespace-nowrap"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] font-space px-1.5 py-0.5 rounded bg-institutional-accent/20 text-institutional-accent border border-institutional-accent/30 font-medium">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
