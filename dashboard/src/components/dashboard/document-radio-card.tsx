'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Fingerprint, Vote, Plane, Car } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface DocumentOption {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const DOCUMENT_OPTIONS: DocumentOption[] = [
  { id: 'AADHAAR', label: 'Aadhaar Card', description: 'UID issued by UIDAI', icon: Fingerprint },
  { id: 'PAN', label: 'PAN Card', description: 'Permanent Account Number', icon: CreditCard },
  { id: 'VOTER_ID', label: 'Voter ID', description: 'Election Commission ID', icon: Vote },
  { id: 'PASSPORT', label: 'Passport', description: 'Travel document', icon: Plane },
  { id: 'DRIVING_LICENCE', label: 'Driving Licence', description: 'RTO issued licence', icon: Car },
];

interface DocumentRadioCardProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export function DocumentRadioCard({ selected, onChange, className }: DocumentRadioCardProps) {
  const toggleDocument = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((d) => d !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2">
        <div className="h-1 w-1 rounded-full bg-primary" />
        <p className="font-manrope text-sm text-muted-foreground">
          Applicant may upload <span className="font-semibold text-foreground">ANY ONE</span> of the following
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DOCUMENT_OPTIONS.map((doc) => {
          const isSelected = selected.includes(doc.id);
          return (
            <motion.button
              key={doc.id}
              type="button"
              onClick={() => toggleDocument(doc.id)}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'relative flex items-start gap-3 rounded-[12px] border-2 p-4 text-left transition-all duration-200 cursor-pointer',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.2)]'
                  : 'border-border hover:border-primary/30 hover:bg-muted/30',
              )}
            >
              {/* Radio indicator */}
              <div
                className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200',
                  isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30',
                )}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15 }}
                    className="h-2 w-2 rounded-full bg-primary-foreground"
                  />
                )}
              </div>

              {/* Icon + Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <doc.icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-colors duration-150',
                      isSelected ? 'text-primary' : 'text-muted-foreground',
                    )}
                    strokeWidth={1.75}
                  />
                  <span className={cn('font-manrope text-sm font-medium', isSelected && 'text-primary')}>
                    {doc.label}
                  </span>
                </div>
                <p className="font-manrope text-xs text-muted-foreground">{doc.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
