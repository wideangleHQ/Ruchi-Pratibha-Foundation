'use client';

import React, { useEffect } from 'react';
import { Navigation } from '@/modules/home/sections/Navigation';
import { Footer } from '@/modules/home/sections/Footer';
import { CSRHero } from './sections/CSRHero';
import { CSRPhilosophy } from './sections/CSRPhilosophy';
import { FocusAreas } from './sections/FocusAreas';
import { CSRArchive } from './sections/CSRArchive';
import { FeaturedCSR } from './sections/FeaturedCSR';
import { StoriesOfImpact } from './sections/StoriesOfImpact';
import { CSRTimeline } from './sections/CSRTimeline';
import { CSRPartners } from './sections/CSRPartners';
import { CSRGallery } from './sections/CSRGallery';
import { CSRReports } from './sections/CSRReports';
import { CSRCTA } from './sections/CSRCTA';

export default function CSRPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        const targetId = window.location.hash.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 150);
          return;
        }
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-institutional-light dark:bg-institutional-dark text-institutional-dark dark:text-institutional-light overflow-x-hidden selection:bg-institutional-accent selection:text-white">
      {/* Fixed Navigation */}
      <Navigation />

      {/* 01. Hero Section */}
      <CSRHero />

      {/* 02. Our CSR Philosophy */}
      <CSRPhilosophy />

      {/* 03. Focus Areas */}
      <FocusAreas />

      {/* 04. CSR Activity Archive */}
      <CSRArchive />

      {/* 05. Featured CSR Activities */}
      <FeaturedCSR />

      {/* 06. Stories of Community Impact */}
      <StoriesOfImpact />

      {/* 07. Service Timeline */}
      <CSRTimeline />

      {/* 08. Partners in Social Responsibility */}
      <CSRPartners />

      {/* 09. Moments from the Field Gallery */}
      <CSRGallery />

      {/* 10. Reports & Transparency Documentation */}
      <CSRReports />

      {/* 11. Call To Action */}
      <CSRCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
