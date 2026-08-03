'use client';

import { useState } from 'react';
import { useSidebar } from '@/hooks/use-sidebar';
import { Sidebar } from './sidebar';
import { MobileSidebar } from './mobile-sidebar';
import { Topbar } from './topbar';
import { SearchCommand } from '@/components/dashboard/search-command';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export function DashboardLayout({ children, breadcrumb }: DashboardLayoutProps) {
  const { isCollapsed } = useSidebar();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <MobileSidebar />

      <div
        className={cn(
          'flex min-h-screen flex-col transition-[margin] duration-200',
          isCollapsed ? 'lg:ml-[var(--sidebar-width-collapsed)]' : 'lg:ml-[var(--sidebar-width)]',
        )}
      >
        <Topbar onSearchClick={() => setSearchOpen(true)}>
          {breadcrumb}
        </Topbar>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>

      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
