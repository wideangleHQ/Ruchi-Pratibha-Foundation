'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useRouter } from 'next/navigation';
import { usePageTransition } from '@/core/providers/page-transition-provider';

export interface NavLinkItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface MegaCategoryItem {
  label: string;
  tag: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  links: NavLinkItem[];
}

export const CATEGORIES: MegaCategoryItem[] = [
  {
    label: 'Foundation',
    tag: 'GOVERNANCE & HISTORY',
    bgColor: '#121824',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'About Foundation', href: '/about#foundation', ariaLabel: 'About Ruchi Prativa Foundation' },
      { label: 'Story Behind the Foundation', href: '/about#foundation-story', ariaLabel: 'The Story Behind the Foundation' },
      { label: "Founder's Words", href: '/about#founder', ariaLabel: "Founder's Words" },
      { label: 'Vision • Mission • Values', href: '/about#mission', ariaLabel: 'Vision Mission Values' },
      { label: 'Journey of an Institution', href: '/about#timeline', ariaLabel: 'Journey of an Institution' },
      { label: 'Institutional Milestones', href: '/about#milestones', ariaLabel: 'Institutional Milestones' },
      { label: 'Leadership', href: '/about#leadership', ariaLabel: 'Foundation Leadership' },
      { label: 'Governance Charter', href: '/about#governance', ariaLabel: 'Governance Charter' },
      { label: 'Our Philosophy', href: '/about#philosophy', ariaLabel: 'Our Philosophy' },
      { label: 'Why We Matter', href: '/about#why-we-matter', ariaLabel: 'Why We Matter' },
      { label: 'Future Vision', href: '/about#future', ariaLabel: 'Future Vision' },
    ],
  },
  {
    label: 'Our Work',
    tag: 'CSR & IMPACT',
    bgColor: '#151C2B',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'CSR Initiatives Overview', href: '/work#csr-hero', ariaLabel: 'CSR Initiatives Overview' },
      { label: 'Our CSR Philosophy', href: '/work#csr-philosophy', ariaLabel: 'Our CSR Philosophy' },
      { label: 'Focus Areas & Pillars', href: '/work#focus-areas', ariaLabel: 'Areas of Social Responsibility' },
      { label: 'Activity Archive', href: '/work#csr-archive', ariaLabel: 'Search Activity Archive' },
      { label: 'Featured Initiatives', href: '/work#featured-csr', ariaLabel: 'Featured Community Initiatives' },
      { label: 'Stories of Impact', href: '/work#stories-of-impact', ariaLabel: 'Stories of Community Impact' },
      { label: 'Service Timeline', href: '/work#csr-timeline', ariaLabel: 'Journey of Service' },
      { label: 'Social Partners', href: '/work#csr-partners', ariaLabel: 'Partners in Social Responsibility' },
      { label: 'Moments Gallery', href: '/work#csr-gallery', ariaLabel: 'Moments from the Field Gallery' },
      { label: 'Transparency Reports', href: '/work#csr-reports', ariaLabel: 'Reports and Documentation' },
    ],
  },
  {
    label: 'Awards',
    tag: 'RECOGNITION',
    bgColor: '#121824',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'Pratibha Sanman', href: '/pratibha-sanman', ariaLabel: 'Pratibha Sanman' },
      { label: 'Dumdaar Odia', href: '/damdaar-odia', ariaLabel: 'Dumdaar Odia' },
    ],
  },
  {
    label: 'Publications',
    tag: 'DIGITAL KNOWLEDGE CENTRE',
    bgColor: '#151C2B',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'Knowledge Centre Overview', href: '/publications#pub-hero', ariaLabel: 'Knowledge Centre Overview' },
      { label: 'Our Collection (Amaruchi & Prativayana)', href: '/publications#collection', ariaLabel: 'Our Collection' },
      { label: 'Featured Publications Bookshelf', href: '/publications#featured-publications', ariaLabel: 'Featured Publications' },
      { label: 'Digital Reader Interface', href: '/publications#digital-reader', ariaLabel: 'Digital Reader Interface' },
      { label: 'Publication Timeline', href: '/publications#publication-timeline', ariaLabel: 'Publication Timeline' },
      { label: 'Editorial Archive & Articles', href: '/publications#editorial', ariaLabel: 'Editorial Archive' },
      { label: 'Institutional Reports', href: '/publications#reports', ariaLabel: 'Institutional Reports' },
      { label: 'Knowledge Search Repository', href: '/publications#search', ariaLabel: 'Knowledge Search' },
    ],
  },
  {
    label: 'Visual Archive',
    tag: 'LIVING MUSEUM & PHOTO VAULT',
    bgColor: '#121824',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'Living Visual Archive Overview', href: '/visual-archive#archive', ariaLabel: 'Visual Archive Overview' },
      { label: 'Spotlight Archival Story', href: '/visual-archive#featured-story', ariaLabel: 'Spotlight Archival Story' },
      { label: 'Journey Through Time (1997-2026)', href: '/visual-archive#timeline', ariaLabel: 'Journey Through Time' },
      { label: 'Explore Collections', href: '/visual-archive#collections', ariaLabel: 'Explore Curated Collections' },
      { label: 'Photo Archive & Lightbox', href: '/visual-archive#gallery', ariaLabel: 'Photo Archive' },
      { label: 'Documentary Streaming Centre', href: '/visual-archive#documentaries', ariaLabel: 'Documentary Centre' },
      { label: 'Annual Convocation Folders', href: '/visual-archive#event-archive', ariaLabel: 'Annual Event Folders' },
      { label: 'Museum Milestone Wall', href: '/visual-archive#historical-moments', ariaLabel: 'Museum Milestone Wall' },
      { label: 'Newspaper Press Clippings', href: '/visual-archive#media-coverage', ariaLabel: 'Media Coverage' },
      { label: 'Odisha Memory Map', href: '/visual-archive#odisha-memory-map', ariaLabel: 'Odisha Memory Map' },
      { label: 'Media Resource Centre', href: '/visual-archive#media-resource', ariaLabel: 'Media Resource Centre' },
      { label: 'Share Your Memory', href: '/visual-archive#share-memory', ariaLabel: 'Share Your Memory' },
    ],
  },
  {
    label: 'Get Involved',
    tag: 'VOLUNTEERS & COMMUNITY',
    bgColor: '#151C2B',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'Events & Workshops', href: '/get-involved#events', ariaLabel: 'Upcoming Events and Workshops' },
      { label: 'Volunteers', href: '/get-involved/volunteer', ariaLabel: 'Become a Foundation Volunteer' },
      { label: 'Institutional Partners', href: '/get-involved#partners', ariaLabel: 'Governance & Institutional Partners' },
      { label: 'Contact Us', href: '/#contact', ariaLabel: 'Contact Foundation Office' },
      { label: 'Support & Giving', href: '/get-involved#support', ariaLabel: 'Support Foundation Programs' },
    ],
  },
];

interface MegaNavPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaNavPanel: React.FC<MegaNavPanelProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const activeSection = useActiveSection();
  const { startTransition } = usePageTransition();

  useLayoutEffect(() => {
    const panelEl = panelRef.current;
    if (!panelEl) return;

    gsap.set(panelEl, { opacity: 0, y: -10, display: 'none' });
    gsap.set(cardsRef.current.filter(Boolean), { y: 15, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(panelEl, {
      display: 'block',
      opacity: 1,
      y: 0,
      duration: 0.22,
      ease: 'power3.out',
    });

    tl.to(
      cardsRef.current.filter(Boolean),
      { y: 0, opacity: 1, duration: 0.2, ease: 'power3.out', stagger: 0.03 },
      '-=0.15'
    );

    tlRef.current = tl;

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (isOpen) {
      tl.play(0);
    } else {
      tl.reverse();
    }
  }, [isOpen]);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onClose();
    if (typeof window !== 'undefined') {
      const [path, hash] = href.includes('#') ? href.split('#') : [href, ''];
      const isCurrentPage =
        path === '' ||
        path === window.location.pathname;

      if (isCurrentPage && hash) {
        const el = document.getElementById(hash);
        if (el) {
          e.preventDefault();
          const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
          el.scrollIntoView({ behavior });
          window.history.pushState(null, '', href);
        }
      } else {
        // Intercept link click and route using client-side transition
        e.preventDefault();
        startTransition(href);
      }
    }
  };

  const isLinkActive = (href: string) => {
    if (!activeSection) return false;
    const hash = href.split('#')[1];
    return hash === activeSection;
  };

  return (
    <div
      ref={panelRef}
      aria-hidden={!isOpen}
      className={`${
        isOpen ? 'lg:block' : 'lg:hidden'
      } hidden absolute top-full left-0 right-0 w-full bg-institutional-dark border-b border-white/15 shadow-2xl z-50 pointer-events-auto`}
    >
      <div className="max-w-[1550px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-8 lg:py-12 xl:py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 items-stretch">
        {CATEGORIES.map((item, idx) => (
          <div
            key={item.label}
            ref={setCardRef(idx)}
            className="group/card relative flex flex-col justify-between p-6 sm:p-6 lg:p-7 rounded-sm bg-white/5 border border-white/10 hover:border-institutional-accent/50 transition-all duration-200 shadow-md"
            style={{ backgroundColor: item.bgColor }}
          >
            <div>
              <span className="text-[9px] uppercase tracking-widest font-space font-semibold text-institutional-accent mb-1 block">
                {item.tag}
              </span>
              <h3 className="font-cormorant text-xl font-bold tracking-tight text-white mb-3 group-hover/card:text-institutional-accent transition-colors duration-200">
                {item.label}
              </h3>

              <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
                {item.links.map((lnk) => {
                  const active = isLinkActive(lnk.href);
                  return (
                    <a
                      key={lnk.label}
                      href={lnk.href}
                      onClick={(e) => handleLinkClick(e, lnk.href)}
                      aria-label={lnk.ariaLabel}
                      className={`group/link flex items-center justify-between py-0.5 text-xs font-manrope transition-colors duration-150 ${
                        active
                          ? 'text-institutional-accent font-semibold'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 group-hover/link:translate-x-1 transition-transform duration-150">
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-institutional-accent shrink-0 animate-pulse" />}
                        <span>{lnk.label}</span>
                      </span>
                      <ArrowUpRight className={`w-3 h-3 transition-all duration-150 ${active ? 'text-institutional-accent opacity-100' : 'text-institutional-accent opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'}`} />
                    </a>
                  );
                })}
              </div>
            </div>

            <a
              href="/about#about-hero"
              onClick={(e) => handleLinkClick(e, '/about#about-hero')}
              aria-label="Scroll to About Hero section"
              className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-space tracking-wider uppercase text-gray-400 hover:text-white transition-colors duration-150 cursor-pointer"
            >
              <span>Ruchi Prativa</span>
              <span className="text-institutional-accent font-semibold group-hover/card:translate-x-0.5 transition-transform duration-150">
                EXPLORE →
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaNavPanel;
