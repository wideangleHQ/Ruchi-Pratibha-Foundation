'use client';

import React, { useEffect } from 'react';
import { Navigation } from '@/modules/home/sections/Navigation';
import { Footer } from '@/modules/home/sections/Footer';
import dynamic from 'next/dynamic';
import { PublicationsHero } from './sections/PublicationsHero';

const CollectionOverview = dynamic(() => import('./sections/CollectionOverview').then(mod => mod.CollectionOverview), {
  loading: () => <div className="py-24 bg-institutional-light dark:bg-institutional-surface/10 min-h-[300px]" />,
});
const FeaturedBookshelf = dynamic(() => import('./sections/FeaturedBookshelf').then(mod => mod.FeaturedBookshelf), {
  loading: () => <div className="py-24 bg-institutional-cream dark:bg-institutional-surface/5 min-h-[400px]" />,
});
const DigitalReaderPreview = dynamic(() => import('./sections/DigitalReaderPreview').then(mod => mod.DigitalReaderPreview), {
  loading: () => <div className="py-24 bg-institutional-dark min-h-[500px]" />,
});
const PublicationTimeline = dynamic(() => import('./sections/PublicationTimeline').then(mod => mod.PublicationTimeline), {
  loading: () => <div className="py-24 bg-institutional-light dark:bg-institutional-surface/10 min-h-[400px]" />,
});
const EditorialArchive = dynamic(() => import('./sections/EditorialArchive').then(mod => mod.EditorialArchive), {
  loading: () => <div className="py-24 bg-institutional-cream dark:bg-institutional-surface/5 min-h-[400px]" />,
});
const InstitutionalReports = dynamic(() => import('./sections/InstitutionalReports').then(mod => mod.InstitutionalReports), {
  loading: () => <div className="py-24 bg-institutional-light dark:bg-institutional-surface/10 min-h-[350px]" />,
});
const KnowledgeSearchRepository = dynamic(() => import('./sections/KnowledgeSearchRepository').then(mod => mod.KnowledgeSearchRepository), {
  loading: () => <div className="py-24 bg-institutional-cream dark:bg-institutional-surface/5 min-h-[400px]" />,
});
const RelatedKnowledgeGraph = dynamic(() => import('./sections/RelatedKnowledgeGraph').then(mod => mod.RelatedKnowledgeGraph), {
  loading: () => <div className="py-24 bg-institutional-light dark:bg-institutional-surface/10 min-h-[400px]" />,
});
const PublicationsNewsletter = dynamic(() => import('./sections/PublicationsNewsletter').then(mod => mod.PublicationsNewsletter), {
  loading: () => <div className="py-20 bg-institutional-darker min-h-[250px]" />,
});

export default function PublicationsPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        const targetId = window.location.hash.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
            element.scrollIntoView({ behavior });
          }, 100);
        }
      } else {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        window.scrollTo({ top: 0, behavior });
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
