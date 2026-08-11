'use client';

import React, { useEffect } from 'react';
import { Navigation } from '@/modules/home/sections/Navigation';
import { Footer } from '@/modules/home/sections/Footer';
import dynamic from 'next/dynamic';
import { CSRHero } from './sections/CSRHero';
import { CSRPhilosophy } from './sections/CSRPhilosophy';

const FocusAreas = dynamic(() => import('./sections/FocusAreas').then(mod => mod.FocusAreas), {
  loading: () => <div className="py-24 bg-institutional-light dark:bg-institutional-surface/10 min-h-[400px]" />,
});
const CSRArchive = dynamic(() => import('./sections/CSRArchive').then(mod => mod.CSRArchive), {
  loading: () => <div className="py-24 bg-institutional-cream dark:bg-institutional-surface/5 min-h-[400px]" />,
});
const FeaturedCSR = dynamic(() => import('./sections/FeaturedCSR').then(mod => mod.FeaturedCSR), {
  loading: () => <div className="py-24 bg-institutional-light dark:bg-institutional-surface/10 min-h-[400px]" />,
});
const StoriesOfImpact = dynamic(() => import('./sections/StoriesOfImpact').then(mod => mod.StoriesOfImpact), {
  loading: () => <div className="py-24 bg-institutional-cream dark:bg-institutional-surface/5 min-h-[400px]" />,
});
const CSRTimeline = dynamic(() => import('./sections/CSRTimeline').then(mod => mod.CSRTimeline), {
  loading: () => <div className="py-24 bg-institutional-light dark:bg-institutional-surface/10 min-h-[400px]" />,
});
const CSRPartners = dynamic(() => import('./sections/CSRPartners').then(mod => mod.CSRPartners), {
  loading: () => <div className="py-24 bg-institutional-cream dark:bg-institutional-surface/5 min-h-[400px]" />,
});
const CSRGallery = dynamic(() => import('./sections/CSRGallery').then(mod => mod.CSRGallery), {
  loading: () => <div className="py-24 bg-institutional-light dark:bg-institutional-surface/10 min-h-[400px]" />,
});
const CSRReports = dynamic(() => import('./sections/CSRReports').then(mod => mod.CSRReports), {
  loading: () => <div className="py-24 bg-institutional-cream dark:bg-institutional-surface/5 min-h-[400px]" />,
});
const CSRCTA = dynamic(() => import('./sections/CSRCTA').then(mod => mod.CSRCTA), {
  loading: () => <div className="py-20 bg-institutional-darker min-h-[250px]" />,
});

export default function CSRPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        const targetId = window.location.hash.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
            element.scrollIntoView({ behavior });
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
