import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div>
        <h2 className="font-cormorant text-xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="mt-0.5 font-manrope text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}
