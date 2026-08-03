'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface WordSpanProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const WordSpan: React.FC<WordSpanProps> = ({ word, index, total, progress }) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block mr-[0.25em] transition-opacity duration-150 text-institutional-dark dark:text-white"
    >
      {word}
    </motion.span>
  );
};

export const SignatureScrollQuote: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'start 0.3'],
  });

  const quoteText =
    "A society progresses not only through development, but by recognizing the individuals who dedicate their lives to its betterment.";
  const words = quoteText.split(' ');

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-32 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden"
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="inline-flex items-center gap-3 mb-8">
          <span className="h-[1px] w-8 bg-institutional-accent" />
          <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
            Institutional Philosophy
          </span>
          <span className="h-[1px] w-8 bg-institutional-accent" />
        </div>

        <blockquote className="font-cormorant text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.25] tracking-tight max-w-5xl mx-auto mb-8">
          &ldquo;
          {words.map((word, idx) => (
            <WordSpan
              key={idx}
              word={word}
              index={idx}
              total={words.length}
              progress={scrollYProgress}
            />
          ))}
          &rdquo;
        </blockquote>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center gap-1 font-space"
        >
          <span className="text-sm sm:text-base font-semibold text-institutional-accent uppercase tracking-widest">
            — Shri Sarat Kumar Sahoo
          </span>
          <span className="text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Founder &amp; Managing Trustee, Ruchi Prativa Foundation
          </span>
        </motion.div>
      </div>
    </section>
  );
};
