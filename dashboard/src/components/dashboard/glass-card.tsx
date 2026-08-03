import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ className, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn('rounded-[18px] glass-card p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
}
