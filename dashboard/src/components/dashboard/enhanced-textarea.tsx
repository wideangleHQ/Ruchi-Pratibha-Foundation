'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface EnhancedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  maxChars?: number;
  badge?: string;
}

export function EnhancedTextarea({
  label,
  description,
  maxChars,
  badge,
  value,
  className,
  ...props
}: EnhancedTextareaProps) {
  const charCount = typeof value === 'string' ? value.length : 0;
  const isNearLimit = maxChars ? charCount > maxChars * 0.9 : false;
  const isOverLimit = maxChars ? charCount > maxChars : false;

  return (
    <div className="space-y-2">
      {(label || badge) && (
        <div className="flex items-center gap-2">
          {label && <label className="font-manrope text-sm font-medium text-foreground">{label}</label>}
          {badge && (
            <span className="inline-flex items-center rounded-full bg-heritage-bronze/10 px-2 py-0.5 font-space text-[10px] font-semibold uppercase tracking-wider text-heritage-bronze">
              {badge}
            </span>
          )}
        </div>
      )}
      {description && <p className="font-manrope text-xs text-muted-foreground -mt-0.5">{description}</p>}

      <textarea
        value={value}
        className={cn(
          'w-full rounded-[12px] border-2 bg-background px-4 py-3 font-manrope text-sm leading-relaxed',
          'placeholder:text-muted-foreground/50 resize-y min-h-[120px]',
          'transition-all duration-200',
          'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10',
          isOverLimit && 'border-destructive focus:border-destructive focus:ring-destructive/10',
          className,
        )}
        {...props}
      />

      {maxChars && (
        <div className="flex justify-end">
          <span
            className={cn(
              'font-space text-xs',
              isOverLimit ? 'text-destructive font-semibold' : isNearLimit ? 'text-heritage-bronze' : 'text-muted-foreground',
            )}
          >
            {charCount.toLocaleString()} / {maxChars.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
