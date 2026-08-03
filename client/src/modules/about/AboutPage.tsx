'use client';

import React, { useEffect } from 'react';
import Navigation from '../home/sections/Navigation';
import { AboutHero } from './sections/AboutHero';
import { WhoWeAre } from './sections/WhoWeAre';
import { MissionVision } from './sections/MissionVision';
import { Leadership } from './sections/Leadership';
import Timeline from '../home/sections/Timeline';
import { ChairmanMessage } from '../home/sections/StorySections/components/ChairmanMessage';
import { GovernanceTransparency } from './sections/GovernanceTransparency';
import Footer from '../home/sections/Footer';

export default function AboutPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-institutional-light dark:bg-institutional-dark text-institutional-dark dark:text-institutional-light overflow-x-hidden selection:bg-institutional-accent selection:text-white">
      {/* 01 Navigation */}
      <Navigation />

      {/* 01 Hero Section */}
      <AboutHero />

      {/* 02 About Foundation */}
      <WhoWeAre />

      {/* 03 Mission & Vision */}
      <MissionVision />

      {/* 04 Leadership */}
      <Leadership />

      {/* 05 Timeline & Archives */}
      <Timeline />

      {/* 06 Chairman's Message */}
      <ChairmanMessage />

      {/* 07 Governance Charter */}
      <GovernanceTransparency />

      {/* Footer */}
      <Footer />
    </main>
  );
}
