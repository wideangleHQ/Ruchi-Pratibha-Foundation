import React from 'react';

export const NavLogo: React.FC = () => {
  return (
    <a
      href="#"
      className="group flex items-center gap-2.5 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm"
    >
      <div className="w-8 h-8 rounded-sm bg-institutional-accent/15 border border-institutional-accent/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <span className="font-cormorant text-lg font-bold text-institutional-accent tracking-tighter">
          RPF
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-cormorant text-base lg:text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-institutional-accent whitespace-nowrap">
          Ruchi Prativa Foundation
        </span>
        <span className="text-[9px] tracking-widest uppercase font-space text-institutional-muted text-left whitespace-nowrap">
          Est. 1997
        </span>
      </div>
    </a>
  );
};
