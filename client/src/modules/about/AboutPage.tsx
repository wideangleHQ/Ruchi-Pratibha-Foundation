'use client';

import React, { useEffect } from 'react';
import Navigation from '../home/sections/Navigation';
import { AboutHero } from './sections/AboutHero';
import { WhoWeAre } from './sections/WhoWeAre';
import { FoundationStory } from './sections/FoundationStory';
import { ChairmanMessage } from '../home/sections/StorySections/components/ChairmanMessage';
import { VisionMissionValues } from './sections/VisionMissionValues';
import Timeline from '../home/sections/Timeline';
import { InstitutionalMilestones } from './sections/InstitutionalMilestones';
import { Leadership } from './sections/Leadership';
import { GovernanceTransparency } from './sections/GovernanceTransparency';
import { OurPhilosophy } from './sections/OurPhilosophy';
import { WhyWeMatter } from './sections/WhyWeMatter';
import { NextChapter } from './sections/NextChapter';
import { SignatureScrollQuote } from './sections/SignatureScrollQuote';
import { AboutCTA } from './sections/AboutCTA';
import Footer from '../home/sections/Footer';

export default function AboutPage() {
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

      {/* 01. Hero */}
      <AboutHero />

      {/* Signature Scroll Experience */}
      <SignatureScrollQuote />

      {/* 02. Who We Are */}
      <WhoWeAre />

      {/* 03. Our Foundation Story */}
      <FoundationStory />

      {/* 04. Founder's Message */}
      <ChairmanMessage />

      {/* 05. Vision • Mission • Values */}
      <VisionMissionValues />

      {/* 06. The Journey of an Institution */}
      <Timeline />

      {/* 07. Institutional Milestones */}
      <InstitutionalMilestones />

      {/* 08. Leadership */}
      <Leadership />

      {/* 09. Governance Charter */}
      <GovernanceTransparency />

      {/* 10. Our Philosophy */}
      <OurPhilosophy />

      {/* 11. Why We Matter */}
      <WhyWeMatter />

      {/* 12. Building the Next Chapter */}
      <NextChapter />

      {/* 13. Call To Action */}
      <AboutCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
