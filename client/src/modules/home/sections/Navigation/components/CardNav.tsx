'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import dumdaarLogo from '@/assets/Dumdaar Odia Png.png';

export interface NavLinkItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface CardNavItem {
  label: string;
  tag: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  links: NavLinkItem[];
}

interface CardNavProps {
  items?: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const DEFAULT_ITEMS: CardNavItem[] = [
  {
    label: 'Foundation',
    tag: 'GOVERNANCE & HISTORY',
    bgColor: 'rgba(18, 24, 36, 0.96)',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.25)',
    links: [
      { label: 'About Foundation', href: '#who-we-are', ariaLabel: 'About Ruchi Prativa Foundation' },
      { label: 'Mission & Vision', href: '#who-we-are', ariaLabel: 'Our Mission and Vision' },
      { label: 'Leadership', href: '#chairman-message', ariaLabel: 'Foundation Leadership' },
      { label: 'Timeline Archives', href: '#timeline', ariaLabel: 'Historical Journey Timeline' },
      { label: "Chairman's Message", href: '#chairman-message', ariaLabel: "Message from Chairman" },
      { label: 'Governance Charter', href: '#transparency', ariaLabel: 'Governance and Transparency' },
    ],
  },
  {
    label: 'Awards',
    tag: 'RECOGNITION',
    bgColor: 'rgba(24, 30, 44, 0.96)',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.25)',
    links: [
      { label: 'Pratibha Sanman', href: '/pratibha-sanman', ariaLabel: 'Pratibha Sanman' },
      { label: 'Dumdaar Odia', href: '/damdaar-odia', ariaLabel: 'Dumdaar Odia' },
    ],
  },
  {
    label: 'Impact & Community',
    tag: 'CSR & GRASSROOTS',
    bgColor: 'rgba(18, 24, 36, 0.96)',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.25)',
    links: [
      { label: 'CSR Commitments', href: '#three-pillars', ariaLabel: 'CSR and Community Commitments' },
      { label: 'Grassroots Projects', href: '#impact-story', ariaLabel: 'Featured Grassroots Projects' },
      { label: 'Key Statistics', href: '#legacy', ariaLabel: 'Impact Statistics' },
      { label: 'Events & Workshops', href: '#moments', ariaLabel: 'Events and Activities' },
      { label: 'Volunteer Journey', href: '/get-involved/volunteer', ariaLabel: 'Join as a Volunteer' },
    ],
  },
  {
    label: 'Knowledge & Media',
    tag: 'JOURNALS & GALLERY',
    bgColor: 'rgba(24, 30, 44, 0.96)',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.25)',
    links: [
      { label: 'Amaruchi Journal', href: '#publications', ariaLabel: 'Amaruchi Flagship Journal' },
      { label: 'Prativayana', href: '#publications', ariaLabel: 'Prativayana Special Edition' },
      { label: 'Articles & Downloads', href: '#publications', ariaLabel: 'Publications and Downloads' },
      { label: 'Photo & Video Gallery', href: '#moments', ariaLabel: 'Photo Mosaic and Video Media' },
      { label: 'Press & Transparency', href: '#transparency', ariaLabel: 'Press Releases and Audit Compliance' },
    ],
  },
];

export const CardNav: React.FC<CardNavProps> = ({
  items = DEFAULT_ITEMS,
  className = '',
  ease = 'power3.out',
  baseColor = 'rgba(11, 15, 23, 0.92)',
  menuColor = '#C5A059',
  buttonBgColor = '#C5A059',
  buttonTextColor = '#0B0F17',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 340;

    const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
    if (contentEl) {
      const wasVisible = contentEl.style.visibility;
      const wasPointerEvents = contentEl.style.pointerEvents;
      const wasPosition = contentEl.style.position;
      const wasHeight = contentEl.style.height;

      contentEl.style.visibility = 'visible';
      contentEl.style.pointerEvents = 'auto';
      contentEl.style.position = 'static';
      contentEl.style.height = 'auto';

      const topBar = 50;
      const padding = 12;
      const contentHeight = contentEl.scrollHeight;

      contentEl.style.visibility = wasVisible;
      contentEl.style.pointerEvents = wasPointerEvents;
      contentEl.style.position = wasPosition;
      contentEl.style.height = wasHeight;

      return topBar + contentHeight + padding;
    }
    return 340;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 50, overflow: 'hidden' });
    gsap.set(cardsRef.current.filter(Boolean), { y: 30, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.38,
      ease,
    });

    tl.to(
      cardsRef.current.filter(Boolean),
      { y: 0, opacity: 1, duration: 0.35, ease, stagger: 0.06 },
      '-=0.2'
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsExpanded(true);
      tl.play(0);
    } else {
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`relative w-full max-w-[820px] xl:max-w-[940px] mx-auto ${className}`}>
      <nav
        ref={navRef}
        className={`relative w-full rounded-sm border border-white/15 dark:border-white/10 shadow-2xl backdrop-blur-md transition-colors duration-300 overflow-hidden ${
          isExpanded ? 'bg-institutional-dark/98' : 'bg-institutional-dark/90'
        }`}
        style={{ backgroundColor: baseColor }}
      >
        {/* Top Control Bar */}
        <div className="h-[50px] px-4 flex items-center justify-between gap-4 z-20 relative">
          {/* Left: Interactive Menu Button */}
          <button
            onClick={toggleMenu}
            aria-label={isExpanded ? 'Close institutional navigation directory' : 'Open institutional navigation directory'}
            aria-expanded={isExpanded}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent group cursor-pointer"
          >
            <div
              className="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ color: menuColor }}
            >
              {isExpanded ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </div>
            <span className="font-space text-xs tracking-wider uppercase font-semibold text-gray-200 group-hover:text-institutional-accent transition-colors duration-200">
              Explore Directory
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-institutional-accent transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Center: Quick Link Labels */}
          <div className="hidden xl:flex items-center gap-6 text-xs font-space tracking-wider uppercase">
            {items.map((cat) => (
              <button
                key={cat.label}
                onClick={() => {
                  if (!isExpanded) toggleMenu();
                }}
                className="text-gray-300 hover:text-institutional-accent transition-colors duration-200 font-medium cursor-pointer"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right: CTA Button */}
          <a
            href="/get-involved/volunteer"
            className="h-8 px-3.5 flex items-center justify-center text-[11px] uppercase tracking-widest font-space font-bold rounded-sm shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Become a Volunteer
          </a>
        </div>

        {/* Expandable Navigation Card Content */}
        <div
          className="card-nav-content w-full p-3 pt-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 z-10 relative"
          aria-hidden={!isExpanded}
          style={{
            visibility: isExpanded ? 'visible' : 'hidden',
            pointerEvents: isExpanded ? 'auto' : 'none',
          }}
        >
          {items.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              ref={setCardRef(idx)}
              className="relative flex flex-col justify-between p-4 rounded-sm border border-white/10 transition-all duration-300 hover:border-institutional-accent/50 group/card shadow-md"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              {/* Card Category Header */}
              <div>
                <span className="text-[9px] uppercase tracking-widest font-space font-semibold text-institutional-accent mb-1 block">
                  {item.tag}
                </span>
                <h4 className="font-cormorant text-xl font-bold tracking-tight text-white mb-3 group-hover/card:text-institutional-accent transition-colors duration-200">
                  {item.label}
                </h4>

                {/* Card Links List */}
                <div className="flex flex-col gap-1.5 pt-1 border-t border-white/10">
                  {item.links.map((lnk, i) => {
                    const isDumdaar = lnk.label.toLowerCase().includes('dumdaar');
                    return (
                      <a
                        key={`${lnk.label}-${i}`}
                        href={lnk.href}
                        onClick={() => {
                          if (isExpanded) toggleMenu();
                        }}
                        aria-label={lnk.ariaLabel}
                        className="group/link flex items-center justify-between py-1 text-xs font-manrope text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        <span className="group-hover/link:translate-x-1 transition-transform duration-200 flex items-center gap-1.5">
                          {isDumdaar && (
                            <Image
                              src={dumdaarLogo}
                              alt="Dumdaar Odia Logo"
                              width={16}
                              height={16}
                              className="w-4 h-4 object-contain shrink-0"
                            />
                          )}
                          <span>{lnk.label}</span>
                        </span>
                        <ArrowUpRight className="w-3 h-3 text-institutional-accent opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-200" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer Tag */}
              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-space tracking-wider uppercase text-gray-400">
                <span>Ruchi Prativa</span>
                <span className="text-institutional-accent font-semibold">Explore →</span>
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
