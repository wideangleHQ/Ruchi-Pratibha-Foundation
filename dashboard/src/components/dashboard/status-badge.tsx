import { cn } from '@/lib/utils';

type StatusVariant = 'active' | 'inactive' | 'pending' | 'success' | 'error' | 'warning';

interface StatusBadgeProps {
  status: StatusVariant;
  label: string;
  className?: string;
}

const variants: Record<StatusVariant, { dot: string; bg: string; text: string }> = {
  active: { dot: 'bg-success', bg: 'bg-success/10', text: 'text-success' },
  success: { dot: 'bg-success', bg: 'bg-success/10', text: 'text-success' },
  inactive: { dot: 'bg-muted-foreground', bg: 'bg-muted', text: 'text-muted-foreground' },
  pending: { dot: 'bg-warning', bg: 'bg-warning/10', text: 'text-warning' },
  warning: { dot: 'bg-warning', bg: 'bg-warning/10', text: 'text-warning' },
  error: { dot: 'bg-destructive', bg: 'bg-destructive/10', text: 'text-destructive' },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const v = variants[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
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
