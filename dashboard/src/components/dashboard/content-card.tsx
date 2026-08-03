import { cn } from '@/lib/utils';

interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function ContentCard({ title, description, action, className, children, ...props }: ContentCardProps) {
  return (
    <div className={cn('rounded-[16px] border bg-card shadow-foundation-sm', className)} {...props}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            {title && <h3 className="font-cormorant text-lg font-semibold">{title}</h3>}
            {description && <p className="mt-0.5 font-manrope text-xs text-muted-foreground">{description}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
