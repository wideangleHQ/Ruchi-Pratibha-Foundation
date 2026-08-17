'use client';

import React, { createContext, useContext, useState, useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const PageTransitionContext = createContext<{
  startTransition: (targetHref: string) => void;
  isLoading: boolean;
} | null>(null);

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider');
  }
  return context;
};

const PHRASES = [
  "Preserving a Legacy.",
  "Honouring Excellence.",
  "Continuing the Journey.",
  "Stories Worth Remembering.",
  "Celebrating People. Preserving Heritage.",
  "Where Legacy Meets Tomorrow."
];

const SearchParamsHandler: React.FC<{ onChange: () => void }> = ({ onChange }) => {
  const searchParams = useSearchParams();
  useEffect(() => {
    onChange();
  }, [searchParams, onChange]);
  return null;
};

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const prefersReduced = useReducedMotion();

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phrase, setPhrase] = useState(PHRASES[0]);
  const isTransitioningRef = useRef(false);
  const targetPathnameRef = useRef<string | null>(null);

  const handleUrlChange = React.useCallback(() => {
    if (isTransitioningRef.current) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsLoading(false);
        isTransitioningRef.current = false;
        targetPathnameRef.current = null;
      }, 50); // Fast exit animation without artificial delay
      return () => clearTimeout(timer);
    }
  }, []);

  // End transition when pathname changes
  useEffect(() => {
    handleUrlChange();
  }, [pathname, handleUrlChange]);

  // Simulate progress loading (0% -> 90%)
  useEffect(() => {
    if (isLoading && progress < 90) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          // Exponential decay step for elegant slowing progress
          const remaining = 90 - prev;
          const step = Math.max(1, Math.floor(remaining / 6));
          return prev + step;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isLoading, progress]);

  // Rotate phrases if the loading takes longer
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setPhrase((prev) => {
          const currentIndex = PHRASES.indexOf(prev);
          const nextIndex = (currentIndex + 1) % PHRASES.length;
          return PHRASES[nextIndex];
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const startTransition = (targetHref: string) => {
    if (isTransitioningRef.current) return;

    try {
      const url = new URL(targetHref, window.location.origin);

      // Only intercept internal links
      if (url.origin !== window.location.origin) return;

      // Skip hash clicks on the current page
      if (url.pathname === pathname && (url.hash || targetHref.startsWith('#'))) {
        return;
      }

      // Initialize loader state
      const randomPhrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
      setPhrase(randomPhrase);
      setProgress(0);
      setIsLoading(true);
      isTransitioningRef.current = true;
      targetPathnameRef.current = url.pathname;

      // Navigate using Next.js client-side router
      router.push(targetHref);
    } catch (e) {
      // If parsing fails, fall back to default navigation
      router.push(targetHref);
    }
  };

  // Intercept standard click events in document (bubble phase)
  useEffect(() => {
    const handleGlobalClicks = (e: MouseEvent) => {
      // Ignore prevented events to allow custom onClick handlers to run first
      if (e.defaultPrevented) return;

      // Find nearest anchor tag ancestor
      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }

      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Skip modifier keys
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      // Skip target="_blank"
      if (target.getAttribute('target') === '_blank') return;
      // Skip download links
      if (target.hasAttribute('download')) return;

      try {
        const url = new URL(href, window.location.origin);

        // Skip external urls
        if (url.origin !== window.location.origin) return;

        // Skip other protocols
        if (href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          return;
        }

        // Skip hash scroll on the current page
        if (url.pathname === pathname && (url.hash || href.startsWith('#'))) {
          return;
        }

        // Intercept navigation
        e.preventDefault();
        startTransition(href);
      } catch (err) {
        // Ignore parsing errors
      }
    };

    document.addEventListener('click', handleGlobalClicks);
    return () => document.removeEventListener('click', handleGlobalClicks);
  }, [pathname, router]);

  // Prevent keyboard trapping
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isLoading && e.key === 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <PageTransitionContext.Provider value={{ startTransition, isLoading }}>
      <Suspense fallback={null}>
        <SearchParamsHandler onChange={handleUrlChange} />
      </Suspense>
      {children}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0.1 : 0.3, ease: 'easeInOut' }}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            aria-live="polite"
            aria-busy="true"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-institutional-light dark:bg-institutional-dark text-institutional-dark dark:text-white px-6 sm:px-8 overflow-hidden select-none"
          >
            {/* Archival radial background overlay */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none z-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(197, 160, 89, 0.25) 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
              {/* Eyebrow */}
              <motion.div
                initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <span className="h-[1px] w-8 bg-institutional-accent/40" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
                  Ruchi Prativa Foundation
                </span>
                <span className="h-[1px] w-8 bg-institutional-accent/40" />
              </motion.div>

              {/* Rotating Editorial Phrase */}
              <div className="h-20 sm:h-24 flex items-center justify-center mb-10 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={phrase}
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="font-cormorant text-2xl sm:text-3xl font-bold tracking-tight leading-relaxed max-w-xs sm:max-w-md text-institutional-dark dark:text-white"
                  >
                    &ldquo;{phrase}&rdquo;
                  </motion.h2>
                </AnimatePresence>
              </div>

              {/* Progress Line */}
              <div className="w-48 sm:w-64 h-[1px] bg-institutional-accent/15 dark:bg-white/10 relative overflow-hidden mb-4">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-institutional-accent"
                  style={{ width: `${progress}%` }}
                  transition={prefersReduced ? { duration: 0.05 } : { type: 'spring', stiffness: 80, damping: 15 }}
                />
              </div>

              {/* Percentage Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="text-[10px] sm:text-xs font-space uppercase tracking-widest text-institutional-accent"
              >
                Loading {progress}%
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
};
