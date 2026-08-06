'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Users, Search, ChevronRight, UserCheck, UserX, Clock } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { EmptyState } from '@/components/dashboard/empty-state';
import { Pagination } from '@/components/dashboard/pagination';
import {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableHead,
  DataTableCell,
} from '@/components/dashboard/data-table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { getVolunteers } from '@/lib/api/volunteers';

const STATUS_MAP: Record<string, { status: 'pending' | 'success' | 'error' | 'active'; label: string }> = {
  PENDING_VERIFICATION: { status: 'pending', label: 'Pending' },
  VERIFIED: { status: 'success', label: 'Verified' },
  REJECTED: { status: 'error', label: 'Rejected' },
  SUSPENDED: { status: 'error', label: 'Suspended' },
  INACTIVE: { status: 'pending', label: 'Inactive' },
};

export default function VolunteersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const pageSize = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['admin-volunteers', page, search, statusFilter],
    queryFn: () =>
      getVolunteers({
        page,
        pageSize,
        search: search || undefined,
        volunteerStatus: statusFilter !== 'all' ? statusFilter : undefined,
      }),
  });

  const volunteers = data?.data ?? [];
  const meta = data?.meta;

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Volunteers"
          description="Manage registered volunteers and their verification status."
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.75} />
            <Input
              placeholder="Search by name, email, code..."
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
              <SelectItem value="PENDING_VERIFICATION">Pending</SelectItem>
              <SelectItem value="VERIFIED">Verified</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 animate-pulse rounded-[12px] bg-muted/40" />
            ))}
          </div>
        ) : volunteers.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No volunteers found"
            description={search ? 'Try adjusting your search or filters.' : 'No volunteers have registered yet.'}
          />
        ) : (
          <>
            <DataTable>
              <DataTableHeader>
                <DataTableRow>
                  <DataTableHead>Volunteer</DataTableHead>
                  <DataTableHead className="hidden md:table-cell">Code</DataTableHead>
                  <DataTableHead className="hidden lg:table-cell">Location</DataTableHead>
                  <DataTableHead>Status</DataTableHead>
                  <DataTableHead className="hidden sm:table-cell">Registered</DataTableHead>
                  <DataTableHead className="w-10" />
                </DataTableRow>
              </DataTableHeader>
              <DataTableBody>
                {volunteers.map((vol) => {
                  const badge = STATUS_MAP[vol.volunteerStatus] ?? { status: 'pending' as const, label: vol.volunteerStatus };
                  return (
                    <DataTableRow
                      key={vol.id}
                      className="cursor-pointer"
                      onClick={() => router.push(`/volunteers/${vol.id}`)}
                    >
                      <DataTableCell>
                        <div>
                          <p className="font-manrope font-medium">{vol.firstName} {vol.lastName}</p>
                          <p className="font-manrope text-xs text-muted-foreground">{vol.email}</p>
                        </div>
                      </DataTableCell>
                      <DataTableCell className="hidden md:table-cell">
                        <span className="font-space text-xs">{vol.volunteerCode}</span>
                      </DataTableCell>
                      <DataTableCell className="hidden lg:table-cell">
                        <span className="font-manrope text-sm">{vol.city}, {vol.state}</span>
                      </DataTableCell>
                      <DataTableCell>
                        <StatusBadge status={badge.status} label={badge.label} />
                      </DataTableCell>
                      <DataTableCell className="hidden sm:table-cell">
                        <span className="font-space text-xs text-muted-foreground">
                          {new Date(vol.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </DataTableCell>
                      <DataTableCell>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                      </DataTableCell>
                    </DataTableRow>
                  );
                })}
              </DataTableBody>
            </DataTable>

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
