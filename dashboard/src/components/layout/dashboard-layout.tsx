'use client';

import { useState } from 'react';
import { useSidebar } from '@/hooks/use-sidebar';
import { Sidebar } from './sidebar';
import { MobileSidebar } from './mobile-sidebar';
import { Topbar } from './topbar';
import dynamic from 'next/dynamic';
import { DynamicBreadcrumb } from './dynamic-breadcrumb';
import { cn } from '@/lib/utils';

const SearchCommand = dynamic(() => import('@/components/dashboard/search-command').then(mod => mod.SearchCommand), { ssr: false });

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
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
          'flex min-h-screen flex-col transition-[margin] duration-150',
          isCollapsed ? 'lg:ml-[var(--sidebar-width-collapsed)]' : 'lg:ml-[var(--sidebar-width)]',
        )}
      >
        <Topbar onSearchClick={() => setSearchOpen(true)}>
          <DynamicBreadcrumb />
        </Topbar>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>

      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
