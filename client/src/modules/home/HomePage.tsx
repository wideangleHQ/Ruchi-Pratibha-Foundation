import React, { Suspense } from 'react';
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

const ThreePillars = dynamic(() => import('./sections/ThreePillars'), {
  loading: () => <div className="py-28 bg-institutional-cream min-h-[600px]" />,
});

const FeaturedImpactStory = dynamic(() => import('./sections/StorySections').then(mod => mod.FeaturedImpactStory), {
  loading: () => <div className="py-24 bg-institutional-light min-h-[400px]" />,
});

const SanmanAndHallOfFame = dynamic(() => import('./sections/StorySections').then(mod => mod.SanmanAndHallOfFame), {
  loading: () => <div className="py-28 bg-institutional-darker min-h-[600px]" />,
});

const PhotoMosaic = dynamic(() => import('./sections/StorySections').then(mod => mod.PhotoMosaic), {
  loading: () => <div className="py-24 bg-institutional-cream min-h-[400px]" />,
});

const PublicationsAndMedia = dynamic(() => import('./sections/StorySections').then(mod => mod.PublicationsAndMedia), {
  loading: () => <div className="py-28 bg-institutional-light min-h-[500px]" />,
});

const SignatureQuote = dynamic(() => import('./sections/StorySections').then(mod => mod.SignatureQuote), {
  loading: () => <div className="py-20 bg-institutional-cream min-h-[250px]" />,
});

const VolunteerJourney = dynamic(() => import('./sections/StorySections').then(mod => mod.VolunteerJourney), {
  loading: () => <div className="py-24 bg-institutional-cream min-h-[400px]" />,
});

const TransparencyAndPartners = dynamic(() => import('./sections/StorySections').then(mod => mod.TransparencyAndPartners), {
  loading: () => <div className="py-24 bg-institutional-light min-h-[400px]" />,
});

const Footer = dynamic(() => import('./sections/Footer'), {
  loading: () => <div className="py-20 bg-institutional-darker min-h-[400px]" />,
});

export default function HomePage() {
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

        {/* 07 Three Pillars */}
        <ThreePillars />

        {/* 08 Featured Impact Story */}
        <FeaturedImpactStory />

        {/* 09 Ruchi Prativa Sanman & Hall of Fame Preview */}
        <SanmanAndHallOfFame />

        {/* 10 Moments in Time Photo Mosaic */}
        <PhotoMosaic />

        {/* 11 Publications & Video Documentary */}
        <PublicationsAndMedia />

        {/* 12 Signature Quote */}
        <SignatureQuote />

        {/* 13 Volunteer Journey */}
        <VolunteerJourney />

        {/* 14 Partners & Transparency */}
        <TransparencyAndPartners />

        {/* Institutional Footer */}
        <Footer />
      </Suspense>
    </main>
  );
}
