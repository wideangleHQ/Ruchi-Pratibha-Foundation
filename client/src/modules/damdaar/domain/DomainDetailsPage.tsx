'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { Navigation } from '@/modules/home/sections/Navigation';
import dumdaarLogo from '@/assets/Dumdaar Odia Png.png';

interface DomainDetailsPageProps {
  slug: string;
}

const DOMAIN_DETAILS_MAP: Record<string, { title: string; subtitle: string; category: string; description: string; accentColor: string }> = {
  'art-culture': {
    title: 'ART & CULTURE',
    subtitle: 'Literary & Performing Arts Heritage',
    category: 'DUMDAAR ODIA • ART & CULTURE',
    description: 'Celebrating regional literature, Odia traditional performing arts, fine arts, and cultural heritage across Odisha. Registrations and category guidelines for Art & Culture will open soon.',
    accentColor: '#4D6B1F',
  },
  'entrepreneurship': {
    title: 'ENTREPRENEURSHIP',
    subtitle: 'Grassroots & Youth Business Innovation',
    category: 'DUMDAAR ODIA • ENTREPRENEURSHIP',
    description: 'Empowering rural and youth entrepreneurs with mentorship, institutional backing, and growth opportunities. Official submission guidelines and mentor registry will open soon.',
    accentColor: '#D55E33',
  },
};

export const DomainDetailsPage: React.FC<DomainDetailsPageProps> = ({ slug }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const details = DOMAIN_DETAILS_MAP[slug] || {
    title: slug.replace(/-/g, ' ').toUpperCase(),
    subtitle: 'Dumdaar Odia Campaign Domain',
    category: 'DUMDAAR ODIA',
    description: 'Official registrations and guidelines for this domain will open soon. Stay tuned for updates.',
    accentColor: '#CF8A12',
  };

  return (
    <div className="h-dvh max-h-dvh w-full bg-[#FDFBF7] text-[#343D0F] font-poppins relative overflow-hidden flex flex-col justify-between selection:bg-[#CF8A12] selection:text-white">
      {/* GLOBAL NAVIGATION HEADER */}
      <Navigation />

      {/* CENTERED MAIN CONTAINER (100VH VIEWPORT ON BEIGE BACKGROUND) */}
      <main className="relative flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 sm:pb-6 max-w-3xl mx-auto w-full z-10 my-auto">
        {/* Coming Soon Card Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-5 w-full my-auto"
        >
          {/* Eyebrow Category Pill */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase font-space shadow-sm"
            style={{ backgroundColor: details.accentColor }}
          >
            <Image src={dumdaarLogo} alt="Dumdaar Odia Logo" width={16} height={16} className="w-3.5 sm:w-4 h-3.5 sm:h-4 object-contain shrink-0" />
            <span>{details.category}</span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-1.5 select-none">
            <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#343D0F] leading-none uppercase">
              {details.title}
            </h1>
            <p className="font-playfair italic text-sm sm:text-lg font-bold text-[#CF8A12]">
              &ldquo;{details.subtitle}&rdquo;
            </p>
          </div>

          {/* Big Coming Soon Badge */}
          <div className="py-3 px-8 rounded-xl bg-[#343D0F] text-[#CF8A12] border border-[#CF8A12]/40 shadow-lg flex items-center justify-center gap-3">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            <span className="font-space font-extrabold text-xl sm:text-2xl uppercase tracking-widest">
              COMING SOON
            </span>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          {/* Description */}
          <p className="font-poppins text-xs sm:text-sm text-gray-700 max-w-lg leading-relaxed px-2">
            {details.description}
          </p>

          {/* Back to Dumdaar Odia Link */}
          <div className="pt-3">
            <Link
              href="/damdaar-odia#domains"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-[#343D0F] hover:text-[#CF8A12] bg-white/70 hover:bg-white border border-[#343D0F]/20 transition-all duration-300 font-space uppercase tracking-wider rounded-lg shadow-xs min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dumdaar Odia</span>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* MINIMAL FOOTER BAR */}
      <footer className="w-full py-2.5 px-4 text-center text-[10px] font-space text-gray-500 border-t border-black/5 bg-white/50 backdrop-blur-xs relative z-10">
        <span>© {new Date().getFullYear()} DUMDAAR ODIA • RUCHI PRATIVA FOUNDATION</span>
      </footer>
    </div>
  );
};

export default DomainDetailsPage;
