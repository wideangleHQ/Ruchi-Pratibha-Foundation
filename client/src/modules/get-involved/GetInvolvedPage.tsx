'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../home/sections/Navigation';
import { GatewayHero } from './sections/GatewayHero';
import Footer from '../home/sections/Footer';

const JourneyCards = dynamic(() => import('./sections/JourneyCards').then((m) => m.JourneyCards), {
  loading: () => <div className="py-20 bg-institutional-light dark:bg-institutional-dark min-h-[350px]" />,
});
const OpportunitiesPreview = dynamic(() => import('./sections/OpportunitiesPreview').then((m) => m.OpportunitiesPreview), {
  loading: () => <div className="py-20 bg-institutional-light dark:bg-institutional-dark min-h-[400px]" />,
});
const UpcomingEventsPreview = dynamic(() => import('./sections/UpcomingEventsPreview').then((m) => m.UpcomingEventsPreview), {
  loading: () => <div className="py-20 bg-institutional-light dark:bg-institutional-dark min-h-[400px]" />,
});
const PartnerWithPurpose = dynamic(() => import('./sections/PartnerWithPurpose').then((m) => m.PartnerWithPurpose), {
  loading: () => <div className="py-20 bg-institutional-light dark:bg-institutional-dark min-h-[350px]" />,
});
const SupportAndGiving = dynamic(() => import('./sections/SupportAndGiving').then((m) => m.SupportAndGiving), {
  loading: () => <div className="py-20 bg-institutional-light dark:bg-institutional-dark min-h-[350px]" />,
});
const StoriesPreview = dynamic(() => import('./sections/StoriesPreview').then((m) => m.StoriesPreview), {
  loading: () => <div className="py-20 bg-institutional-light dark:bg-institutional-dark min-h-[350px]" />,
});
const FAQSection = dynamic(() => import('./sections/FAQSection').then((m) => m.FAQSection), {
  loading: () => <div className="py-20 bg-institutional-light dark:bg-institutional-dark min-h-[300px]" />,
});
const FinalCTA = dynamic(() => import('./sections/FinalCTA').then((m) => m.FinalCTA), {
  loading: () => <div className="py-20 bg-institutional-darker min-h-[250px]" />,
});

export default function GetInvolvedPage() {
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

      {/* Hero Section */}
      <GatewayHero />

      {/* Section 1: Choose Your Journey */}
      <JourneyCards />

      {/* Section 3: Featured Opportunities Preview */}
      <OpportunitiesPreview />

      {/* Section 4: Upcoming Events Preview */}
      <UpcomingEventsPreview />

      {/* Section 5: Partner With Purpose */}
      <PartnerWithPurpose />

      {/* Section 6: Support & Giving */}
      <SupportAndGiving />

      {/* Section 7: Stories From Our Community */}
      <StoriesPreview />

      {/* Section 8: Frequently Asked Questions */}
      <FAQSection />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
