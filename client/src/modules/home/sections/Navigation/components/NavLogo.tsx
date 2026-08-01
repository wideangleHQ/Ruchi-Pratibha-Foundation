import React from 'react';
import Image from 'next/image';

export const NavLogo: React.FC = () => {
  return (
    <a
      href="#"
      aria-label="Ruchi Prativa Foundation Home"
      className="group flex items-center gap-3 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm"
    >
      <div className="relative flex items-center justify-center flex-shrink-0">
        <Image
          src="/logo.svg"
          alt="Ruchi Prativa Foundation Logo"
          width={40}
          height={40}
          className="w-9 h-9 sm:w-10 sm:h-10 lg:w-10 lg:h-10 xl:w-11 xl:h-11 object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="font-cormorant text-base sm:text-lg lg:text-lg xl:text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-institutional-accent whitespace-nowrap">
          Ruchi Prativa Foundation
        </span>
        <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-space text-institutional-muted text-left whitespace-nowrap">
          Est. 1997
        </span>
      </div>
    </a>
  );
};
