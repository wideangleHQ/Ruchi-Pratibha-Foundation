'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  label: string;
  description?: string;
}

interface WizardStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export function WizardStepper({ steps, currentStep, onStepClick, className }: WizardStepperProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="relative flex items-start justify-between">
        {/* Connecting line (background) */}
        <div className="absolute left-0 right-0 top-4 h-[2px] bg-border mx-8" />
        {/* Connecting line (progress) */}
        <motion.div
          className="absolute left-0 top-4 h-[2px] bg-primary mx-8"
          initial={false}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ maxWidth: 'calc(100% - 4rem)' }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;

          return (
            <button
              key={step.label}
              type="button"
              onClick={() => onStepClick?.(index)}
              className={cn(
                'relative z-10 flex flex-col items-center gap-2 bg-transparent border-0 cursor-pointer group min-w-0',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm',
                isPending && 'cursor-pointer',
              )}
              style={{ flex: '1 1 0%' }}
            >
              {/* Circle */}
              <div className="relative">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 1,
                    backgroundColor: isCompleted
                      ? 'hsl(var(--primary))'
                      : isActive
                        ? 'hsl(var(--primary))'
                        : 'hsl(var(--background))',
                    borderColor: isCompleted
                      ? 'hsl(var(--primary))'
                      : isActive
                        ? 'hsl(var(--primary))'
                        : 'hsl(var(--border))',
                  }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-shadow',
                    isActive && 'shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]',
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
                  ) : (
                    <span
                      className={cn(
                        'font-space text-xs font-bold',
                        isActive ? 'text-primary-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {index + 1}
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Label */}
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'font-manrope text-[11px] font-medium leading-tight text-center transition-colors duration-150',
                    isActive
                      ? 'text-primary font-semibold'
                      : isCompleted
                        ? 'text-foreground'
                        : 'text-muted-foreground',
                    'group-hover:text-foreground',
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="font-manrope text-[10px] text-muted-foreground mt-0.5 hidden sm:block">
                    {step.description}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
