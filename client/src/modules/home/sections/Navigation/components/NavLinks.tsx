import React from 'react';
import { NAV_ITEMS } from '../constants';

export const NavLinks: React.FC = () => {
  return (
    <ul className="hidden lg:flex items-center gap-1.5 lg:gap-2 xl:gap-4.5 2xl:gap-7">
      {NAV_ITEMS.map((item) => (
        <li key={item.href} className="flex-shrink-0">
          <a
            href={item.href}
            className="whitespace-nowrap text-[10px] lg:text-[10.5px] xl:text-xs uppercase tracking-wider xl:tracking-widest font-medium text-gray-200 hover:text-institutional-accent transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-institutional-accent py-1 block"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};
