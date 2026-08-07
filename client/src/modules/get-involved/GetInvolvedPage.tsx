'use client';

import React, { useEffect } from 'react';
import Navigation from '../home/sections/Navigation';
import { GatewayHero } from './sections/GatewayHero';
import { JourneyCards } from './sections/JourneyCards';
import { OpportunitiesPreview } from './sections/OpportunitiesPreview';
import { UpcomingEventsPreview } from './sections/UpcomingEventsPreview';
import { PartnerWithPurpose } from './sections/PartnerWithPurpose';
import { SupportAndGiving } from './sections/SupportAndGiving';
import { StoriesPreview } from './sections/StoriesPreview';
import { FAQSection } from './sections/FAQSection';
import { FinalCTA } from './sections/FinalCTA';
import Footer from '../home/sections/Footer';

export default function GetInvolvedPage() {
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
