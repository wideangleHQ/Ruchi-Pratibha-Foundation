'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Calendar,
  HandHeart,
  FileText,
  ClipboardList,
  Settings,
  ChevronLeft,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/use-sidebar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { navigation } from '@/config/sidebar';

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggle } = useSidebar();

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)' }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-sidebar"
      >
        <div className={cn('flex h-[var(--topbar-height)] items-center border-b px-4', isCollapsed ? 'justify-center' : 'justify-between')}>
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            <Image
              src="/logo.svg"
              alt="Pratibha Foundation"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 object-contain"
            />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap font-cormorant text-sm font-semibold tracking-tight"
                >
                  Pratibha Foundation
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          {!isCollapsed && (
            <Button variant="ghost" size="icon-sm" onClick={toggle} aria-label="Collapse sidebar">
              <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
            </Button>
          )}
        </div>

        <ScrollArea className="flex-1 py-3">
          <nav className="space-y-5 px-3">
            {navigation.map((group) => (
              <div key={group.title}>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="mb-2 px-2 font-manrope text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/50"
                    >
                      {group.title}
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const linkContent = (
                      <Link
                        href={item.href}
                        prefetch={true}
                        className={cn(
                          'group relative flex items-center gap-3 rounded-[12px] px-2.5 py-2 font-manrope text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
                          isCollapsed && 'justify-center px-0',
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute inset-0 rounded-[12px] bg-sidebar-accent"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <item.icon className={cn('relative z-10 h-4.5 w-4.5 shrink-0', isActive && 'text-sidebar-primary')} strokeWidth={1.75} />
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.15 }}
                              className="relative z-10 whitespace-nowrap"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Link>
                    );

                    if (isCollapsed) {
                      return (
                        <Tooltip key={item.href}>
                          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                          <TooltipContent side="right" sideOffset={8}>
                            {item.label}
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return <div key={item.href}>{linkContent}</div>;
                  })}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>

        <Separator />
        <div className={cn('p-3', isCollapsed && 'flex justify-center')}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={toggle} className="focus:outline-none" aria-label="Expand sidebar">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="text-xs bg-sidebar-accent text-sidebar-accent-foreground">AD</AvatarFallback>
                  </Avatar>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>Expand sidebar</TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3 rounded-[12px] px-2 py-1.5">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-sidebar-accent text-sidebar-accent-foreground">AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-manrope text-sm font-medium text-sidebar-foreground">Admin</p>
                <p className="truncate font-manrope text-xs text-sidebar-foreground/60">admin@rpf.org</p>
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
