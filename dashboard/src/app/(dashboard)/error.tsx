'use client';

import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <div className="text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] bg-destructive/10">
          <AlertTriangle className="h-6 w-6 text-destructive" strokeWidth={1.75} />
        </div>
        <h2 className="font-cormorant text-2xl font-semibold">Something went wrong</h2>
        <p className="font-manrope text-sm text-muted-foreground max-w-sm">
          This page encountered an error. The rest of the dashboard is still available.
        </p>
        <Button onClick={reset} variant="outline" size="sm">
          Try again
        </Button>
      </div>
    </div>
  );
}
