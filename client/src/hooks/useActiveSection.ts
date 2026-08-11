'use client';

import { useState, useEffect } from 'react';

const SECTION_IDS = [
  'about-hero',
  'foundation',
  'foundation-story',
  'founder',
  'mission',
  'timeline',
  'milestones',
  'leadership',
  'governance',
  'philosophy',
  'why-we-matter',
  'future',
  'join-journey',
  'gateway-hero',
  'events',
  'volunteer',
  'partners',
  'support',
];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('about-hero');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return activeSection;
}
