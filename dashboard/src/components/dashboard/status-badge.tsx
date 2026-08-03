import { cn } from '@/lib/utils';

type StatusVariant = 'active' | 'inactive' | 'pending' | 'success' | 'error' | 'warning';

interface StatusBadgeProps {
  status: StatusVariant;
  label: string;
  className?: string;
}

const variants: Record<StatusVariant, { dot: string; bg: string; text: string }> = {
  active: { dot: 'bg-forest-green', bg: 'bg-forest-green/10', text: 'text-forest-green' },
  success: { dot: 'bg-forest-green', bg: 'bg-forest-green/10', text: 'text-forest-green' },
  inactive: { dot: 'bg-muted-foreground', bg: 'bg-muted', text: 'text-muted-foreground' },
  pending: { dot: 'bg-heritage-bronze', bg: 'bg-heritage-bronze/10', text: 'text-heritage-bronze' },
  warning: { dot: 'bg-heritage-bronze', bg: 'bg-heritage-bronze/10', text: 'text-heritage-bronze' },
  error: { dot: 'bg-foundation-red', bg: 'bg-foundation-red/10', text: 'text-foundation-red' },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const v = variants[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-manrope text-xs font-medium',
        v.bg,
        v.text,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', v.dot)} />
      {label}
    </span>
  );
}
