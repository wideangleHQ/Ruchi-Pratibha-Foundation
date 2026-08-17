'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { usePageTransition } from '@/core/providers/page-transition-provider';
import { NAV_ITEMS } from '../constants';

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
      {NAV_ITEMS.map((item) => (
        <li key={item.label} className="flex-shrink-0">
          <a
            href={item.href}
            onClick={(e) => handleLinkClick(e, item.href)}
            className="whitespace-nowrap text-xs uppercase tracking-wider font-space font-medium text-gray-200 hover:text-institutional-accent transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-institutional-accent py-1 block"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};
