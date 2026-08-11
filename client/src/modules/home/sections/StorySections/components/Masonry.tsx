'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ArrowUpRight, Camera } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height: number;
  title: string;
  category: string;
  badge: string;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'random';
  blurToFocus?: boolean;
}

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    const mqs = queries.map((q) => matchMedia(q));
    mqs.forEach((mq) => mq.addEventListener('change', handler));
    return () => mqs.forEach((mq) => mq.removeEventListener('change', handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = (): [React.RefObject<HTMLDivElement | null>, { width: number; height: number }] => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls: string[]) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  blurToFocus = true,
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    const urls = items.map((i) => i.img).filter(Boolean);
    if (urls.length > 0) {
      preloadImages(urls).then(() => setImagesReady(true));
    } else {
      setImagesReady(true);
    }
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const gap = 12; // Tight Pinterest-style grid gap
    const columnWidth = (width - gap * (columns - 1)) / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = (columnWidth + gap) * col;
      const height = child.height / 1.6;
      const y = colHeights[col];

      colHeights[col] += height + gap;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const totalContainerHeight = useMemo(() => {
    if (!grid.length) return 600;
    return Math.max(...grid.map((item) => item.y + item.h));
  }, [grid]);

  const getInitialPosition = (item: { x: number; y: number }) => {
    let direction = animateFrom;

    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: item.y + 160 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: item.x + 200, y: item.y };
      case 'center':
        return { x: item.x, y: item.y + 50 };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' }),
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: duration,
          ease: ease,
          delay: index * stagger,
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: 'auto',
        });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  return (
    <div
      ref={containerRef}
      className="relative w-full transition-all duration-300"
      style={{ height: `${totalContainerHeight}px` }}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute top-0 left-0 will-change-transform cursor-pointer"
          style={{ width: `${item.w}px`, height: `${item.h}px` }}
          onClick={() => window.open(item.url, '_blank', 'noopener')}
        >
          <InteractiveCard disableShadow className="group relative w-full h-full rounded-sm overflow-hidden border border-white/15 dark:border-white/10 p-0">
            {/* Full-Bleed Edge-to-Edge Image or Neutral Placeholder */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-sm">
              {item.img ? (
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover object-center transform group-hover:scale-105 group-hover:brightness-110 transition-all duration-500 ease-out"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-institutional-surface to-institutional-darker">
                  <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 1px 1px, rgba(197, 160, 89, 0.25) 1px, transparent 0)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                </div>
              )}
              {/* Soft Light Overlay in Light Mode & Rich Dark Gradient Overlay in Dark Mode */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent dark:from-black/95 dark:via-black/50 dark:to-transparent group-hover:from-black/85 transition-colors duration-300" />
            </div>

            {/* Content Overlay Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full p-5 sm:p-6">
              {/* Top Header Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-space tracking-widest uppercase font-semibold text-institutional-accent bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/15">
                  {item.category} Archive
                </span>
                <Camera className="w-3.5 h-3.5 text-white/80" />
              </div>

              {/* Bottom Title Meta */}
              <div className="mt-auto pt-4">
                <span className="text-[9px] font-space tracking-wider text-institutional-accent uppercase block mb-1">
                  {item.badge}
                </span>
                <h4 className="font-cormorant text-lg sm:text-xl font-bold text-white group-hover:text-institutional-accent transition-colors duration-300 leading-snug">
                  {item.title}
                </h4>

                <div className="pt-3 mt-3 border-t border-white/20 flex items-center justify-between text-[9px] font-space text-gray-300">
                  <span>Explore Moment</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-institutional-accent opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>
              </div>
            </div>
          </InteractiveCard>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
