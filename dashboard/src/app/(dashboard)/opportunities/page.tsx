'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Search, Plus, Archive, Trash2, Send,
  ChevronRight, MapPin, Clock, Users, Zap, FileEdit,
  CheckCircle2, CircleDashed, CalendarClock,
} from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { EmptyState } from '@/components/dashboard/empty-state';
import { Pagination } from '@/components/dashboard/pagination';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { getOpportunities, bulkPublish, bulkArchive, bulkDelete } from '@/lib/api/opportunities';

const STATUS_MAP: Record<string, { status: 'pending' | 'success' | 'error' | 'active'; label: string }> = {
  DRAFT: { status: 'pending', label: 'Draft' },
  PUBLISHED: { status: 'active', label: 'Published' },
  UPCOMING: { status: 'active', label: 'Upcoming' },
  REGISTRATION_OPEN: { status: 'success', label: 'Reg. Open' },
  REGISTRATION_CLOSED: { status: 'pending', label: 'Reg. Closed' },
  ONGOING: { status: 'success', label: 'Ongoing' },
  COMPLETED: { status: 'success', label: 'Completed' },
  CANCELLED: { status: 'error', label: 'Cancelled' },
  ARCHIVED: { status: 'pending', label: 'Archived' },
};

const TYPE_LABELS: Record<string, string> = {
  EVENT_BASED: 'Event Based',
  CAMPAIGN: 'Campaign',
  LONG_TERM: 'Long Term',
  RECURRING: 'Recurring',
};

export default function OpportunitiesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const pageSize = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['admin-opportunities', page, search, statusFilter, typeFilter],
    queryFn: () =>
      getOpportunities({
        page,
        pageSize,
        search: search || undefined,
        opportunityStatus: statusFilter !== 'all' ? statusFilter : undefined,
        opportunityType: typeFilter !== 'all' ? typeFilter : undefined,
      }),
  });

  const opportunities = data?.data ?? [];
  const meta = data?.meta;

  // Compute stats from current data
  const stats = useMemo(() => {
    const all = opportunities;
    return {
      active: all.filter((o) => !['DRAFT', 'ARCHIVED', 'CANCELLED'].includes(o.opportunityStatus)).length,
      draft: all.filter((o) => o.opportunityStatus === 'DRAFT').length,
      regOpen: all.filter((o) => o.opportunityStatus === 'REGISTRATION_OPEN').length,
      completed: all.filter((o) => o.opportunityStatus === 'COMPLETED').length,
    };
  }, [opportunities]);

  const invalidateList = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-opportunities'] });
    setSelectedIds([]);
  };

  const bulkPublishMut = useMutation({
    mutationFn: () => bulkPublish(selectedIds),
    onSuccess: () => { toast.success('Opportunities published'); invalidateList(); },
    onError: () => toast.error('Bulk publish failed'),
  });

  const bulkArchiveMut = useMutation({
    mutationFn: () => bulkArchive(selectedIds),
    onSuccess: () => { toast.success('Opportunities archived'); invalidateList(); },
    onError: () => toast.error('Bulk archive failed'),
  });

  const bulkDeleteMut = useMutation({
    mutationFn: () => bulkDelete(selectedIds),
    onSuccess: () => { toast.success('Opportunities deleted'); invalidateList(); },
    onError: () => toast.error('Bulk delete failed'),
  });

  const anyBulkPending = bulkPublishMut.isPending || bulkArchiveMut.isPending || bulkDeleteMut.isPending;

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === opportunities.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(opportunities.map((o) => o.id));
    }
  };

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="CSR Opportunities"
          description="Manage volunteer opportunities, registrations and visibility."
          action={
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => router.push('/opportunities/archived')}>
                <Archive className="h-4 w-4" strokeWidth={1.75} />
                Archived
              </Button>
              <Button onClick={() => router.push('/opportunities/create')}>
                <Plus className="h-4 w-4" strokeWidth={1.75} />
                Create Opportunity
              </Button>
            </div>
          }
        />

        {/* Statistics Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Active" value={stats.active} icon={Zap} />
          <StatCard title="Drafts" value={stats.draft} icon={FileEdit} />
          <StatCard title="Registration Open" value={stats.regOpen} icon={CalendarClock} />
          <StatCard title="Completed" value={stats.completed} icon={CheckCircle2} />
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.75} />
            <Input
              placeholder="Search by title, code..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="UPCOMING">Upcoming</SelectItem>
              <SelectItem value="REGISTRATION_OPEN">Registration Open</SelectItem>
              <SelectItem value="ONGOING">Ongoing</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="EVENT_BASED">Event Based</SelectItem>
              <SelectItem value="CAMPAIGN">Campaign</SelectItem>
              <SelectItem value="LONG_TERM">Long Term</SelectItem>
              <SelectItem value="RECURRING">Recurring</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 rounded-[12px] border bg-muted/30 px-4 py-2.5"
            >
              <p className="flex-1 font-manrope text-sm text-muted-foreground">
                <span className="font-space font-medium text-foreground">{selectedIds.length}</span> selected
              </p>
              <Button size="sm" variant="outline" onClick={() => bulkPublishMut.mutate()} disabled={anyBulkPending}>
                <Send className="h-4 w-4" strokeWidth={1.75} />
                Publish
              </Button>
              <Button size="sm" variant="outline" onClick={() => bulkArchiveMut.mutate()} disabled={anyBulkPending}>
                <Archive className="h-4 w-4" strokeWidth={1.75} />
                Archive
              </Button>
              <Button size="sm" variant="outline" onClick={() => bulkDeleteMut.mutate()} disabled={anyBulkPending}>
                <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                Delete
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Opportunity Cards */}
        {isLoading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-[16px] bg-muted/40" />
            ))}
          </div>
        ) : opportunities.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No opportunities found"
            description={search ? 'Try adjusting your search or filters.' : 'Create your first CSR opportunity to get started.'}
            action={
              <Button onClick={() => router.push('/opportunities/create')}>
                <Plus className="h-4 w-4" strokeWidth={1.75} />
                Create Opportunity
              </Button>
            }
          />
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {opportunities.map((opp, index) => {
                  const badge = STATUS_MAP[opp.opportunityStatus] ?? { status: 'pending' as const, label: opp.opportunityStatus };
                  const isSelected = selectedIds.includes(opp.id);
                  return (
                    <motion.div
                      key={opp.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className={`group relative flex flex-col rounded-[16px] border bg-card shadow-foundation-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${isSelected ? 'ring-2 ring-primary ring-offset-1' : ''}`}
                      onClick={() => router.push(`/opportunities/${opp.id}`)}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between p-5 pb-0">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div
                            className="mt-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleSelect(opp.id)}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-manrope text-sm font-semibold text-foreground line-clamp-2 leading-snug">{opp.title}</p>
                            <p className="font-space text-[11px] text-muted-foreground mt-1">{opp.opportunityCode}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" strokeWidth={1.75} />
                      </div>

                      {/* Card Body */}
                      <div className="flex-1 px-5 py-3">
                        {opp.shortDescription && (
                          <p className="font-manrope text-xs text-muted-foreground line-clamp-2 leading-relaxed">{opp.shortDescription}</p>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="border-t px-5 py-3 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <StatusBadge status={badge.status} label={badge.label} />
                          <Badge variant="outline" className="font-manrope text-[10px]">
                            {TYPE_LABELS[opp.opportunityType] ?? opp.opportunityType}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          {opp.district && (
                            <span className="flex items-center gap-1 font-manrope text-[10px]">
                              <MapPin className="h-3 w-3" strokeWidth={1.75} />
                              {opp.district}
                            </span>
                          )}
                          {opp.registrationCloses && (
                            <span className="flex items-center gap-1 font-space text-[10px]">
                              <Clock className="h-3 w-3" strokeWidth={1.75} />
                              {new Date(opp.registrationCloses).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-between">
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
