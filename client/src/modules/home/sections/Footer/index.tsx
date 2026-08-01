import React from 'react';
import Image from 'next/image';
import { FooterLinksGrid } from './components/FooterLinksGrid';
import { ContactAndNewsletter } from './components/ContactAndNewsletter';
import { FooterBottomBar } from './components/FooterBottomBar';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-institutional-darker text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-10 border-b border-white/10 gap-6">
          <a
            href="#"
            className="group flex items-center gap-3.5 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm"
            aria-label="Ruchi Prativa Foundation Home"
          >
            <div className="relative flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.svg"
                alt="Ruchi Prativa Foundation Logo"
                width={48}
                height={48}
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-cormorant text-xl sm:text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-institutional-accent whitespace-nowrap">
                Ruchi Prativa Foundation
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-widest uppercase font-space text-institutional-muted whitespace-nowrap">
                Empowering Communities • Honoring Leaders • Since 1997
              </span>
            </div>
          </a>

          <div className="text-xs font-space text-gray-400 max-w-sm leading-relaxed">
            An institutional public trust dedicated to philanthropic excellence, cultural preservation, and grassroots community upliftment.
          </div>
        </div>

        {/* 6-Column Navigation Links */}
        <FooterLinksGrid />

        {/* Contact Information & Newsletter */}
        <ContactAndNewsletter />

        {/* Bottom Legal Bar */}
        <FooterBottomBar />
      </div>
    </footer>
  );
};

export default Footer;
