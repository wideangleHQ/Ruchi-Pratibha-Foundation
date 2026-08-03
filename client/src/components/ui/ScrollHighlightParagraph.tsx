'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollHighlightParagraphProps {
  text: string;
  className?: string;
}

export const ScrollHighlightParagraph: React.FC<ScrollHighlightParagraphProps> = ({
  text,
  className = '',
}) => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  return (
    <p className={`leading-relaxed ${className}`}>
      {sentences.map((sentence, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '-15% 0px -35% 0px' }}
          transition={{ duration: 0.3 }}
          className="inline font-manrope text-base sm:text-lg lg:text-xl text-institutional-dark dark:text-white transition-opacity duration-300 hover:opacity-100 mr-1.5 font-normal"
        >
          {sentence.trim()}{' '}
        </motion.span>
      ))}
    </p>
  );
};
