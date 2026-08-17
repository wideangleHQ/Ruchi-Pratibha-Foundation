'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { usePageTransition } from '@/core/providers/page-transition-provider';
import { DIRECTORY_CATEGORIES, NavCategoryItem, NavLinkItem } from '../constants/navigationConfig';

export type { NavCategoryItem, NavLinkItem };
export const CATEGORIES = DIRECTORY_CATEGORIES;

interface MegaNavPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaNavPanel: React.FC<MegaNavPanelProps> = ({ isOpen, onClose }) => {
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
      const isHomePage = path === '' || path === '/';
      const isCurrentPage = isHomePage
        ? window.location.pathname === '/'
        : path === window.location.pathname;

      if (isCurrentPage) {
        e.preventDefault();
        if (isHomePage && (!hash || hash === 'hero')) {
          const heroEl = document.getElementById('hero');
          if (heroEl) {
            const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
            heroEl.scrollIntoView({ behavior });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          window.history.pushState(null, '', '/');
        } else if (hash) {
          const el = document.getElementById(hash);
          if (el) {
            const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
            el.scrollIntoView({ behavior });
            window.history.pushState(null, '', href);
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
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
      } hidden absolute top-full left-0 right-0 w-full bg-institutional-dark border-b border-white/15 shadow-2xl z-50 pointer-events-auto max-h-[50vh] min-h-[300px] overflow-y-auto scrollbar-none`}
    >
      <div className="max-w-[1450px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-6 lg:py-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {DIRECTORY_CATEGORIES.map((item, idx) => (
          <div
            key={item.label}
            ref={setCardRef(idx)}
            className="group/card relative flex flex-col justify-between p-6 rounded-sm bg-white/5 border border-white/10 hover:border-institutional-accent/50 transition-all duration-200 shadow-md"
            style={{ backgroundColor: item.bgColor }}
          >
            <div>
              <a
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="group/title block mb-3 focus:outline-none"
              >
                <h3 className="font-cormorant text-2xl font-bold tracking-tight text-white group-hover/card:text-institutional-accent group-hover/title:text-institutional-accent transition-colors duration-200">
                  {item.label}
                </h3>
              </a>

              <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
                {item.links.map((lnk) => {
                  const active = isLinkActive(lnk.href);
                  return (
                    <a
                      key={lnk.label}
                      href={lnk.href}
                      onClick={(e) => handleLinkClick(e, lnk.href)}
                      aria-label={lnk.ariaLabel}
                      className={`group/link flex items-center justify-between py-1 text-sm font-manrope transition-colors duration-150 ${
                        active
                          ? 'text-institutional-accent font-semibold'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2 group-hover/link:translate-x-1 transition-transform duration-150">
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-institutional-accent shrink-0 animate-pulse" />}
                        <span>{lnk.label}</span>
                      </span>
                      <ArrowUpRight className={`w-3.5 h-3.5 transition-all duration-150 ${active ? 'text-institutional-accent opacity-100' : 'text-institutional-accent opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'}`} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaNavPanel;
