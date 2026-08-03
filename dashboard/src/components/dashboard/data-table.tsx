import { cn } from '@/lib/utils';

interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DataTable({ className, children, ...props }: DataTableProps) {
  return (
    <div className={cn('rounded-[16px] border bg-card shadow-foundation-sm overflow-hidden', className)} {...props}>
      <div className="overflow-x-auto">
        <table className="w-full font-manrope text-sm">
          {children}
        </table>
      </div>
    </div>
  );
}

export function DataTableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('border-b bg-muted/30', className)} {...props} />;
}

export function DataTableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

export function DataTableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn('border-b transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted', className)}
      {...props}
    />
  );
}

export function DataTableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'h-11 px-4 text-left align-middle text-xs font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}

export function DataTableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />
  );
}
