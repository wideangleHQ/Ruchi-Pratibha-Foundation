import React from 'react';
import { BOTTOM_BAR_LINKS } from '../constants';

export const FooterBottomBar: React.FC = () => {
  return (
    <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-space text-gray-400">
      <span className="whitespace-nowrap text-center md:text-left">
        © 1997 - {new Date().getFullYear()} Ruchi Prativa Foundation. All Rights Reserved.
      </span>

      <div className="flex flex-wrap items-center justify-center gap-6">
        {BOTTOM_BAR_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hover:text-institutional-accent transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-institutional-accent whitespace-nowrap"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};
