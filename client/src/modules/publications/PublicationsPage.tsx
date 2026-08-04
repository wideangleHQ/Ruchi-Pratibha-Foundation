'use client';

import React, { useEffect } from 'react';
import { Navigation } from '@/modules/home/sections/Navigation';
import { Footer } from '@/modules/home/sections/Footer';
import { PublicationsHero } from './sections/PublicationsHero';
import { CollectionOverview } from './sections/CollectionOverview';
import { FeaturedBookshelf } from './sections/FeaturedBookshelf';
import { DigitalReaderPreview } from './sections/DigitalReaderPreview';
import { PublicationTimeline } from './sections/PublicationTimeline';
import { EditorialArchive } from './sections/EditorialArchive';
import { InstitutionalReports } from './sections/InstitutionalReports';
import { KnowledgeSearchRepository } from './sections/KnowledgeSearchRepository';
import { RelatedKnowledgeGraph } from './sections/RelatedKnowledgeGraph';
import { PublicationsNewsletter } from './sections/PublicationsNewsletter';

export default function PublicationsPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        const targetId = window.location.hash.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white flex flex-col font-manrope selection:bg-institutional-accent selection:text-institutional-dark">
      {/* Navigation Header */}
      <Navigation />

      {/* Main 10-Section Digital Knowledge Centre Flow */}
      <main className="flex-grow">
        {/* 01. Hero */}
        <PublicationsHero />

        {/* 02. Our Collection */}
        <CollectionOverview />

        {/* 03. Featured Publications Digital Bookshelf */}
        <FeaturedBookshelf />

        {/* 04. Digital Reader Interface */}
        <DigitalReaderPreview />

        {/* 05. Publication Timeline */}
        <PublicationTimeline />

        {/* 06. Editorial Archive */}
        <EditorialArchive />

        {/* 07. Institutional Reports */}
        <InstitutionalReports />

        {/* 08. Knowledge Search Repository */}
        <KnowledgeSearchRepository />

        {/* 09. Related Reading & Knowledge Ecosystem */}
        <RelatedKnowledgeGraph />

        {/* 10. Newsletter Subscription */}
        <PublicationsNewsletter />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
