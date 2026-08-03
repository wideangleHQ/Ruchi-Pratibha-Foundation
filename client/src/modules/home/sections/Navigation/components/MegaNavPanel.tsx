'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

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
      { label: 'About Foundation', href: '/about#about-foundation', ariaLabel: 'About Ruchi Prativa Foundation' },
      { label: 'Mission & Vision', href: '/about#mission-vision', ariaLabel: 'Our Mission and Vision' },
      { label: 'Leadership', href: '/about#leadership', ariaLabel: 'Foundation Leadership' },
      { label: 'Timeline Archives', href: '/about#timeline-archives', ariaLabel: 'Historical Journey Timeline' },
      { label: "Chairman's Message", href: '/about#chairmans-message', ariaLabel: "Message from Chairman" },
      { label: 'Governance Charter', href: '/about#governance-charter', ariaLabel: 'Governance and Transparency' },
    ],
  },
  {
    label: 'Our Work',
    tag: 'CSR & IMPACT',
    bgColor: '#151C2B',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'CSR Initiatives', href: '#impact-story', ariaLabel: 'CSR Initiatives and Commitments' },
      { label: 'Grassroots Projects', href: '#impact-story', ariaLabel: 'Grassroots Projects' },
      { label: 'Beneficiaries', href: '#impact-story', ariaLabel: 'Community Beneficiaries' },
      { label: 'Key Statistics', href: '#legacy', ariaLabel: 'Impact Statistics' },
      { label: 'Success Stories', href: '#impact-story', ariaLabel: 'Featured Success Stories' },
    ],
  },
  {
    label: 'Sanman Awards',
    tag: 'HONOR & HALL OF FAME',
    bgColor: '#121824',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'About Award', href: '#sanman', ariaLabel: 'Ruchi Prativa Sanman Overview' },
      { label: 'Award Categories', href: '#sanman', ariaLabel: 'Sanman Award Categories' },
      { label: 'Laureates & Awardees', href: '#sanman', ariaLabel: 'Honored Laureates and Awardees' },
      { label: 'Hall of Fame', href: '#sanman', ariaLabel: 'Hall of Fame Gallery' },
      { label: 'Selection Jury', href: '#sanman', ariaLabel: 'Jury and Selection Committee' },
    ],
  },
  {
    label: 'Publications',
    tag: 'JOURNALS & REPORTS',
    bgColor: '#151C2B',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'Amaruchi Journal', href: '#publications', ariaLabel: 'Amaruchi Flagship Journal' },
      { label: 'Prativayana', href: '#publications', ariaLabel: 'Prativayana Special Edition' },
      { label: 'Annual Reports', href: '#publications', ariaLabel: 'Institutional Annual Reports' },
      { label: 'Downloads', href: '#publications', ariaLabel: 'Publications and Downloads' },
    ],
  },
  {
    label: 'Media Gallery',
    tag: 'PHOTO & VIDEO ARCHIVES',
    bgColor: '#121824',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'Photo Gallery', href: '#moments', ariaLabel: 'Moments in Time Photo Mosaic' },
      { label: 'Video Documentaries', href: '#publications', ariaLabel: 'Video Media and Documentaries' },
      { label: 'Press Releases', href: '#transparency', ariaLabel: 'Press Releases and Statements' },
      { label: 'Media Kit & Assets', href: '#transparency', ariaLabel: 'Official Brand & Media Assets' },
    ],
  },
  {
    label: 'Get Involved',
    tag: 'VOLUNTEERS & COMMUNITY',
    bgColor: '#151C2B',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'Events & Workshops', href: '#moments', ariaLabel: 'Upcoming Events and Workshops' },
      { label: 'Volunteers', href: '#volunteer', ariaLabel: 'Become a Foundation Volunteer' },
      { label: 'Institutional Partners', href: '#transparency', ariaLabel: 'Governance & Institutional Partners' },
      { label: 'Contact Us', href: '#volunteer', ariaLabel: 'Contact Foundation Office' },
      { label: 'Support & Giving', href: '#volunteer', ariaLabel: 'Support Foundation Programs' },
    ],
  },
];

interface MegaNavPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaNavPanel: React.FC<MegaNavPanelProps> = ({ isOpen, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const activeSection = useActiveSection();

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
    if (typeof window !== 'undefined' && window.location.pathname === '/about' && href.includes('#')) {
      const targetId = href.split('#')[1];
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `/about#${targetId}`);
        }
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
      className="hidden lg:block absolute top-full left-0 right-0 w-full bg-institutional-dark border-b border-white/15 shadow-2xl z-50 pointer-events-auto"
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
