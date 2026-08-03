import { FileQuestion } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] bg-muted">
          <FileQuestion className="h-6 w-6 text-muted-foreground" strokeWidth={1.75} />
        </div>
        <h2 className="font-cormorant text-2xl font-semibold">Page not found</h2>
        <p className="font-manrope text-sm text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Button asChild variant="outline" size="sm">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
