'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, ChevronRight, Search } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { EmptyState } from '@/components/dashboard/empty-state';
import { Pagination } from '@/components/dashboard/pagination';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Input } from '@/components/ui/input';
import { getArchivedOpportunities } from '@/lib/api/opportunities';

export default function ArchivedOpportunitiesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const pageSize = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['archived-opportunities', page, search],
    queryFn: () => getArchivedOpportunities({ page, pageSize, search: search || undefined }),
  });

  const opportunities = data?.data ?? [];
  const meta = data?.meta;

  return (
    <>
      <div className="space-y-6">
        <PageHeader 
          title="Archived Opportunities" 
          description="Review retained CSR opportunity records." 
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Archived" value={meta?.totalItems ?? 0} icon={Archive} />
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.75} />
          <Input 
            value={search} 
            onChange={(e) => { setSearch(e.target.value); setPage(1); }} 
            placeholder="Search archived opportunities..." 
            className="pl-9" 
          />
        </div>

        {isLoading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-[16px] bg-muted/40" />
            ))}
          </div>
        ) : opportunities.length === 0 ? (
          <EmptyState 
            icon={Archive} 
            title="No archived opportunities" 
            description="Archived CSR opportunities will appear here." 
          />
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {opportunities.map((opp, index) => (
                  <motion.div
                    key={opp.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="group flex flex-col rounded-[16px] border bg-muted/30 shadow-none transition-all duration-200 hover:bg-card hover:shadow-md cursor-pointer"
                    onClick={() => router.push(`/opportunities/${opp.id}`)}
                  >
                    <div className="flex items-start justify-between p-5">
                      <div className="min-w-0 flex-1">
                        <p className="font-manrope text-sm font-semibold text-foreground line-clamp-1">{opp.title}</p>
                        <p className="font-space text-[11px] text-muted-foreground mt-1">{opp.opportunityCode}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" strokeWidth={1.75} />
                    </div>
                    
                    <div className="border-t border-border/50 px-5 py-3 flex items-center justify-between gap-2 mt-auto">
                      <StatusBadge status="inactive" label="Archived" />
                      <span className="font-space text-[10px] text-muted-foreground">
                        {opp.registrationCloses ? `Closed ${new Date(opp.registrationCloses).getFullYear()}` : 'N/A'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="font-manrope text-sm text-muted-foreground">
                  Showing {(meta.page - 1) * meta.pageSize + 1}–{Math.min(meta.page * meta.pageSize, meta.totalItems)} of{' '}
                  <span className="font-space">{meta.totalItems.toLocaleString()}</span>
                </p>
                <Pagination currentPage={meta.page} totalPages={meta.totalPages} onPageChange={setPage} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
