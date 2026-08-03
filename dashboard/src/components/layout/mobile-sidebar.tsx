'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  X,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/use-sidebar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Volunteers', href: '/volunteers', icon: Users },
  { label: 'Events', href: '/events', icon: Calendar },
  { label: 'Reports', href: '/reports', icon: FileText },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function MobileSidebar() {
  const pathname = usePathname();
  const { isMobileOpen, closeMobile } = useSidebar();

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  return (
    <AnimatePresence>
      {isMobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={closeMobile}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-sidebar shadow-soft-lg lg:hidden"
          >
            <div className="flex h-[var(--topbar-height)] items-center justify-between border-b px-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary">
                  <Heart className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-bold tracking-tight">RPF Dashboard</span>
              </Link>
              <Button variant="ghost" size="icon-sm" onClick={closeMobile} aria-label="Close menu">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1 py-3">
              <nav className="space-y-1 px-3">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/50',
                      )}
                    >
                      <item.icon className={cn('h-4.5 w-4.5', isActive && 'text-sidebar-primary')} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </ScrollArea>

            <Separator />
            <div className="p-3">
              <div className="flex items-center gap-3 rounded-[12px] px-2 py-1.5">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-sidebar-accent text-sidebar-accent-foreground">AD</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-sidebar-foreground">Admin</p>
                  <p className="truncate text-xs text-sidebar-foreground/60">admin@rpf.org</p>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
