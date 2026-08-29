'use client';

import React, { useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';

// Lazy loading below-the-fold storytelling sections for maximum performance
const Legacy = dynamic(() => import('./sections/Legacy'), {
  loading: () => <div className="py-24 bg-institutional-light min-h-[400px]" />,
});

const ChairmanMessage = dynamic(() => import('./sections/StorySections').then(mod => mod.ChairmanMessage), {
  loading: () => <div className="py-24 bg-institutional-cream min-h-[400px]" />,
});

const Introduction = dynamic(() => import('./sections/Introduction'), {
  loading: () => <div className="py-28 bg-institutional-cream min-h-[500px]" />,
});

const Timeline = dynamic(() => import('./sections/Timeline'), {
  loading: () => <div className="py-28 bg-institutional-light min-h-[600px]" />,
});

const PhotoMosaic = dynamic(() => import('./sections/StorySections').then(mod => mod.PhotoMosaic), {
  loading: () => <div className="py-24 bg-institutional-cream min-h-[400px]" />,
});

const PublicationsAndMedia = dynamic(() => import('./sections/StorySections').then(mod => mod.PublicationsAndMedia), {
  loading: () => <div className="py-28 bg-institutional-light min-h-[500px]" />,
});

const VolunteerJourney = dynamic(() => import('./sections/StorySections').then(mod => mod.VolunteerJourney), {
  loading: () => <div className="py-24 bg-institutional-cream min-h-[400px]" />,
});

const SignatureQuote = dynamic(() => import('./sections/StorySections').then(mod => mod.SignatureQuote), {
  loading: () => <div className="py-20 bg-institutional-cream min-h-[250px]" />,
});

const Footer = dynamic(() => import('./sections/Footer'), {
  loading: () => <div className="py-20 bg-institutional-darker min-h-[400px]" />,
});

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'auto' });
      }
    }
  }, []);
  return (
    <main className="relative min-h-screen w-full bg-institutional-light dark:bg-institutional-dark text-institutional-dark dark:text-institutional-light overflow-x-hidden selection:bg-institutional-accent selection:text-white">
      {/* 01 Navigation */}
      <Navigation />

      {/* 02 Hero */}
      <Hero />

      {/* Below-the-fold storytelling sections lazy loaded */}
      <Suspense fallback={<div className="py-24 bg-institutional-light min-h-[400px]" />}>
        {/* 03 Trust & Statistics */}
        <Legacy />

        {/* 04 Chairman's Message */}
        <ChairmanMessage />

        {/* 05 Our Legacy (Who We Are Editorial Narrative) */}
        <Introduction />

        {/* 06 Interactive Journey Through Time */}
        <Timeline />

        {/* 08 Moments in Time Photo Mosaic */}
        <PhotoMosaic />

        {/* 10 Publications & Digital Library */}
        <PublicationsAndMedia />

        {/* 11 Volunteer Journey (Relocated immediately after Publications) */}
        <VolunteerJourney />

        {/* 12 Signature Quote */}
        <SignatureQuote />

        {/* Institutional Footer */}
        <Footer />
      </Suspense>
    </main>
  );
}
