'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavLogo: React.FC = () => {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        heroEl.scrollIntoView({ behavior });
        window.history.pushState(null, '', '/#hero');
      } else {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        window.scrollTo({ top: 0, behavior });
      }
    }
  };

  return (
    <Link
      href="/"
      onClick={handleLogoClick}
      aria-label="Ruchi Prativa Foundation Home"
      className="group flex items-center gap-3 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm"
    >
      <div className="relative flex items-center justify-center flex-shrink-0">
        <Image
          src="/logo.svg"
          alt="Ruchi Prativa Foundation Logo"
          width={40}
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-10 xl:w-11 xl:h-11 object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="font-cormorant text-sm sm:text-lg lg:text-lg xl:text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-institutional-accent whitespace-nowrap">
          Ruchi Prativa Foundation
        </span>
        <span className="text-[8px] sm:text-[10px] tracking-widest uppercase font-space text-institutional-muted text-left whitespace-nowrap">
          Est. 1997
        </span>
      </div>
    </Link>
  );
};
