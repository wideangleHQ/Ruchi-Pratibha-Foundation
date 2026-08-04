'use client';

import React, { useState } from 'react';
import Navigation from '@/modules/home/sections/Navigation';
import Footer from '@/modules/home/sections/Footer';
import { ArchiveHero } from './sections/ArchiveHero';
import { FeaturedStory } from './sections/FeaturedStory';
import { JourneyThroughTime } from './sections/JourneyThroughTime';
import { ExploreCollections } from './sections/ExploreCollections';
import { PhotoArchive } from './sections/PhotoArchive';
import { DocumentaryCentre } from './sections/DocumentaryCentre';
import { EventArchive } from './sections/EventArchive';
import { HistoricalMoments } from './sections/HistoricalMoments';
import { MediaCoverage } from './sections/MediaCoverage';
import { OdishaMemoryMap } from './sections/OdishaMemoryMap';
import { MediaResourceCentre } from './sections/MediaResourceCentre';
import { ShareYourMemory } from './sections/ShareYourMemory';
import { GlobalUniversalSearch } from './sections/GlobalUniversalSearch';

export const VisualArchivePage: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <main className="w-full bg-institutional-dark text-white min-h-screen">
      {/* Global Website Sticky Navigation Header (Shell) */}
      <Navigation />

      {/* Hero Section */}
      <ArchiveHero onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Section 01: Featured Archival Story */}
      <FeaturedStory />

      {/* Section 02: Journey Through Time (Interactive Year Timeline) */}
      <JourneyThroughTime />

      {/* Section 03: Explore Collections */}
      <ExploreCollections />

      {/* Section 04: Pinterest-Style Photo Archive (Masonry & Lightbox) */}
      <PhotoArchive />

      {/* Section 05: Documentary Streaming Centre */}
      <DocumentaryCentre />

      {/* Section 06: Physical Archival Vault Boxes */}
      <EventArchive />

      {/* Section 07: Historical Moments (Museum Exhibition Wall) */}
      <HistoricalMoments />

      {/* Section 08: Media Coverage & Newspaper Clippings */}
      <MediaCoverage />

      {/* Section 09: Odisha Memory Map */}
      <OdishaMemoryMap />

      {/* Section 10: Media Resource Centre */}
      <MediaResourceCentre />

      {/* Section 11: Share Your Memory (Community Submission) */}
      <ShareYourMemory />

      {/* Global Website Institutional Footer (Shell) */}
      <Footer />

      {/* Floating Universal Archive Search Modal */}
      <GlobalUniversalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </main>
  );
};

export default VisualArchivePage;
