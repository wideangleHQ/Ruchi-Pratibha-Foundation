import React from 'react';
import { FooterLinksGrid } from './components/FooterLinksGrid';
import { ContactAndNewsletter } from './components/ContactAndNewsletter';
import { FooterBottomBar } from './components/FooterBottomBar';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-institutional-darker text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-10 border-b border-white/10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-institutional-accent/15 border border-institutional-accent/40 flex items-center justify-center">
              <span className="font-cormorant text-xl font-bold text-institutional-accent tracking-tighter">
                RPF
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-cormorant text-xl font-bold tracking-tight text-white whitespace-nowrap">
                Ruchi Prativa Foundation
              </span>
              <span className="text-[10px] tracking-widest uppercase font-space text-institutional-muted whitespace-nowrap">
                Empowering Communities • Honoring Leaders • Since 1997
              </span>
            </div>
          </div>

          <div className="text-xs font-space text-gray-400 max-w-sm">
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
