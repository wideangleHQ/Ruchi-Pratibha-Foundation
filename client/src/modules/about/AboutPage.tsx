'use client';

import React, { useEffect } from 'react';
import Navigation from '../home/sections/Navigation';
import dynamic from 'next/dynamic';
import { AboutHero } from './sections/AboutHero';
import { WhoWeAre } from './sections/WhoWeAre';

const SignatureScrollQuote = dynamic(() => import('./sections/SignatureScrollQuote').then(mod => mod.SignatureScrollQuote), {
  loading: () => <div className="py-20 bg-institutional-cream min-h-[250px]" />,
});
const FoundationStory = dynamic(() => import('./sections/FoundationStory').then(mod => mod.FoundationStory), {
  loading: () => <div className="py-24 bg-institutional-light min-h-[400px]" />,
});
const ChairmanMessage = dynamic(() => import('../home/sections/StorySections/components/ChairmanMessage').then(mod => mod.ChairmanMessage), {
  loading: () => <div className="py-24 bg-institutional-cream min-h-[400px]" />,
});
const VisionMissionValues = dynamic(() => import('./sections/VisionMissionValues').then(mod => mod.VisionMissionValues), {
  loading: () => <div className="py-24 bg-institutional-light min-h-[400px]" />,
});
const Timeline = dynamic(() => import('../home/sections/Timeline'), {
  loading: () => <div className="py-28 bg-institutional-light min-h-[600px]" />,
});
const InstitutionalMilestones = dynamic(() => import('./sections/InstitutionalMilestones').then(mod => mod.InstitutionalMilestones), {
  loading: () => <div className="py-24 bg-institutional-light min-h-[400px]" />,
});
const Leadership = dynamic(() => import('./sections/Leadership').then(mod => mod.Leadership), {
  loading: () => <div className="py-24 bg-institutional-light min-h-[400px]" />,
});
const GovernanceTransparency = dynamic(() => import('./sections/GovernanceTransparency').then(mod => mod.GovernanceTransparency), {
  loading: () => <div className="py-24 bg-institutional-light min-h-[400px]" />,
});
const OurPhilosophy = dynamic(() => import('./sections/OurPhilosophy').then(mod => mod.OurPhilosophy), {
  loading: () => <div className="py-24 bg-institutional-light min-h-[400px]" />,
});
const WhyWeMatter = dynamic(() => import('./sections/WhyWeMatter').then(mod => mod.WhyWeMatter), {
  loading: () => <div className="py-24 bg-institutional-light min-h-[400px]" />,
});
const NextChapter = dynamic(() => import('./sections/NextChapter').then(mod => mod.NextChapter), {
  loading: () => <div className="py-24 bg-institutional-light min-h-[400px]" />,
});
const AboutCTA = dynamic(() => import('./sections/AboutCTA').then(mod => mod.AboutCTA), {
  loading: () => <div className="py-20 bg-institutional-darker min-h-[250px]" />,
});
import Footer from '../home/sections/Footer';

export default function AboutPage() {
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
