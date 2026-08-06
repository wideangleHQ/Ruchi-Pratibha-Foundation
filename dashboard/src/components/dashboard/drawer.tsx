'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Drawer({ open, onClose, children }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        ref={drawerRef}
        className="relative z-10 flex w-full max-w-md flex-col bg-background shadow-lg animate-in slide-in-from-right duration-200"
      >
        {children}
      </div>
    </div>
  );
}

export function DrawerContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-1 flex-col overflow-y-auto', className)}>
      {children}
    </div>
  );
}

export function DrawerHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('border-b px-6 py-4', className)}>
      {children}
    </div>
  );
}

export function DrawerTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn('font-cormorant text-lg font-semibold', className)}>
      {children}
    </h2>
  );
}

export function DrawerFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('border-t p-4 space-y-2', className)}>
      {children}
    </div>
  );
}
