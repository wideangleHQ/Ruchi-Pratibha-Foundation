'use client';

import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/hooks/use-sidebar';
import { ThemeToggle } from './theme-toggle';
import { NotificationBell } from './notification-bell';
import { ProfileDropdown } from './profile-dropdown';

interface TopbarProps {
  children?: React.ReactNode;
  onSearchClick?: () => void;
}

export function Topbar({ children, onSearchClick }: TopbarProps) {
  const { isCollapsed, toggle, openMobile } = useSidebar();

  return (
    <header
      className="sticky top-0 z-30 flex h-[var(--topbar-height)] items-center border-b bg-background/95"
    >
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={openMobile}
            aria-label="Open menu"
          >
            <Menu className="h-4.5 w-4.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden lg:inline-flex"
            onClick={toggle}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu className="h-4.5 w-4.5" />
          </Button>
          {children}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="hidden gap-2 text-muted-foreground sm:inline-flex"
            onClick={onSearchClick}
          >
            <Search className="h-4 w-4" />
            <span className="text-xs">Search...</span>
            <kbd className="pointer-events-none ml-2 hidden select-none rounded-md border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
              Ctrl K
            </kbd>
          </Button>
          <NotificationBell />
          <ThemeToggle />
          <div className="ml-1">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
