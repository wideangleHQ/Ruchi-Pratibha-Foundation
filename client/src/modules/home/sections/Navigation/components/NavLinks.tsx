'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { usePageTransition } from '@/core/providers/page-transition-provider';
import { NAV_ITEMS } from '../constants';
import dumdaarLogo from '@/assets/Dumdaar Odia Png.png';

export const NavLinks: React.FC = () => {
  const pathname = usePathname();
  const { startTransition } = usePageTransition();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (typeof window === 'undefined') return;

    const [path, hash] = href.includes('#') ? href.split('#') : [href, ''];
    const isHomePage = path === '' || path === '/';
    const isCurrentPath = isHomePage
      ? pathname === '/'
      : path === pathname;

    if (isCurrentPath) {
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
      e.preventDefault();
      startTransition(href);
    }
  };

  return (
    <ul className="hidden lg:flex items-center gap-5 lg:gap-6 xl:gap-8">
      {NAV_ITEMS.map((item) => {
        const isDumdaar = item.label.toLowerCase().includes('dumdaar');
        return (
          <li key={item.label} className="flex-shrink-0">
            <a
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs uppercase tracking-wider font-space font-medium text-gray-200 hover:text-institutional-accent transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-institutional-accent py-1 block"
            >
              {isDumdaar && (
                <Image
                  src={dumdaarLogo}
                  alt="Dumdaar Odia Logo"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0"
                />
              )}
              <span>{item.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};
