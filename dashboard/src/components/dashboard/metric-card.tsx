import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  className?: string;
}

export function MetricCard({ label, value, icon: Icon, variant = 'default', className }: MetricCardProps) {
  const variantStyles = {
    default: 'bg-card border',
    primary: 'bg-primary/5 border-primary/10',
    success: 'bg-success/5 border-success/10',
    warning: 'bg-warning/5 border-warning/10',
  };

  const iconStyles = {
    default: 'text-muted-foreground',
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
  };

  return (
    <div className={cn('rounded-[16px] border p-5 shadow-foundation-sm', variantStyles[variant], className)}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className={cn('h-4 w-4', iconStyles[variant])} strokeWidth={1.75} />}
        <span className="font-manrope text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="mt-2 font-space text-3xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
