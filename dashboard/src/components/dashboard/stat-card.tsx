'use client';

import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label?: string;
  };
  className?: string;
}

export function StatCard({ title, value, description, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn('rounded-[16px] border bg-card p-6 shadow-foundation-sm', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="font-manrope text-sm text-muted-foreground">{title}</p>
          <p className="font-space text-2xl font-bold tracking-tight">{value}</p>
        </div>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-primary/8">
            <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
          </div>
        )}
      </div>
      {(trend || description) && (
        <div className="mt-3 flex items-center gap-2 font-manrope text-xs">
          {trend && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 font-medium',
                trend.value >= 0 ? 'text-success' : 'text-destructive',
              )}
            >
              {trend.value >= 0 ? (
                <TrendingUp className="h-3 w-3" strokeWidth={1.75} />
              ) : (
                <TrendingDown className="h-3 w-3" strokeWidth={1.75} />
              )}
              <span className="font-space">{Math.abs(trend.value)}%</span>
            </span>
          )}
          {description && <span className="text-muted-foreground">{description}</span>}
        </div>
      )}
    </div>
  );
}
