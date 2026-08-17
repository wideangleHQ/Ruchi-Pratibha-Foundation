'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/modules/home/sections/Navigation';
import Footer from '@/modules/home/sections/Footer';
import { ArchiveHero } from './sections/ArchiveHero';

const FeaturedStory = dynamic(() => import('./sections/FeaturedStory').then((m) => m.FeaturedStory), {
  loading: () => <div className="py-24 bg-institutional-dark min-h-[400px]" />,
});
const JourneyThroughTime = dynamic(() => import('./sections/JourneyThroughTime').then((m) => m.JourneyThroughTime), {
  loading: () => <div className="py-24 bg-institutional-dark min-h-[450px]" />,
});
const ExploreCollections = dynamic(() => import('./sections/ExploreCollections').then((m) => m.ExploreCollections), {
  loading: () => <div className="py-24 bg-institutional-dark min-h-[400px]" />,
});
const PhotoArchive = dynamic(() => import('./sections/PhotoArchive').then((m) => m.PhotoArchive), {
  loading: () => <div className="py-24 bg-institutional-dark min-h-[500px]" />,
});
const DocumentaryCentre = dynamic(() => import('./sections/DocumentaryCentre').then((m) => m.DocumentaryCentre), {
  loading: () => <div className="py-24 bg-institutional-dark min-h-[400px]" />,
});
const EventArchive = dynamic(() => import('./sections/EventArchive').then((m) => m.EventArchive), {
  loading: () => <div className="py-24 bg-institutional-dark min-h-[400px]" />,
});
const HistoricalMoments = dynamic(() => import('./sections/HistoricalMoments').then((m) => m.HistoricalMoments), {
  loading: () => <div className="py-24 bg-institutional-dark min-h-[400px]" />,
});
const MediaCoverage = dynamic(() => import('./sections/MediaCoverage').then((m) => m.MediaCoverage), {
  loading: () => <div className="py-24 bg-institutional-dark min-h-[400px]" />,
});
const OdishaMemoryMap = dynamic(() => import('./sections/OdishaMemoryMap').then((m) => m.OdishaMemoryMap), {
  loading: () => <div className="py-24 bg-institutional-dark min-h-[400px]" />,
});
const MediaResourceCentre = dynamic(() => import('./sections/MediaResourceCentre').then((m) => m.MediaResourceCentre), {
  loading: () => <div className="py-24 bg-institutional-dark min-h-[300px]" />,
});
const ShareYourMemory = dynamic(() => import('./sections/ShareYourMemory').then((m) => m.ShareYourMemory), {
  loading: () => <div className="py-24 bg-institutional-dark min-h-[400px]" />,
});
const GlobalUniversalSearch = dynamic(() => import('./sections/GlobalUniversalSearch').then((m) => m.GlobalUniversalSearch));

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
