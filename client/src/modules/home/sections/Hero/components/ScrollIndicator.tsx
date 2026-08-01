'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const ScrollIndicator: React.FC = () => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
      <span className="text-[10px] uppercase tracking-widest font-space text-gray-400">
        Scroll To Explore
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="text-institutional-accent"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </div>
  );
};
