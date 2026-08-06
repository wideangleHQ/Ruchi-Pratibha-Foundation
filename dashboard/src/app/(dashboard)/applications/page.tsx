'use client';

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FileText, Search, ChevronRight, CheckCircle2, XCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { EmptyState } from '@/components/dashboard/empty-state';
import { Pagination } from '@/components/dashboard/pagination';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/dashboard/drawer';
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
import { Label } from '@/components/ui/label';
import { getApplications, getApplicationByCode, reviewApplication, approveApplication, rejectApplication, type ApplicationListItem } from '@/lib/api/applications';

const APP_STATUS_MAP: Record<string, { status: 'pending' | 'success' | 'error' | 'active'; label: string }> = {
  DRAFT: { status: 'pending', label: 'Draft' },
  SUBMITTED: { status: 'active', label: 'Submitted' },
  UNDER_REVIEW: { status: 'pending', label: 'Under Review' },
  APPROVED: { status: 'success', label: 'Approved' },
  REJECTED: { status: 'error', label: 'Rejected' },
  WITHDRAWN: { status: 'pending', label: 'Withdrawn' },
  EXPIRED: { status: 'error', label: 'Expired' },
};

export default function ApplicationsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [remarks, setRemarks] = useState('');
  const pageSize = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['admin-applications', page, search, statusFilter],
    queryFn: () =>
      getApplications({
        page,
        pageSize,
        search: search || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      }),
  });

  const { data: detailData, isLoading: detailLoading } = useQuery({
    queryKey: ['admin-application', selectedCode],
    queryFn: () => getApplicationByCode(selectedCode!),
    enabled: !!selectedCode,
  });

  const detail = detailData?.data;
  const applications = data?.data ?? [];
  const meta = data?.meta;

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-applications'] });
    if (selectedCode) queryClient.invalidateQueries({ queryKey: ['admin-application', selectedCode] });
  };

  const reviewMut = useMutation({
    mutationFn: (code: string) => reviewApplication(code, remarks || undefined),
    onSuccess: () => { toast.success('Moved to review'); invalidateAll(); setRemarks(''); },
    onError: () => toast.error('Action failed'),
  });

  const approveMut = useMutation({
    mutationFn: (code: string) => approveApplication(code, remarks || undefined),
    onSuccess: () => { toast.success('Application approved'); invalidateAll(); setRemarks(''); },
    onError: () => toast.error('Action failed'),
  });

  const rejectMut = useMutation({
    mutationFn: (code: string) => rejectApplication(code, remarks || undefined),
    onSuccess: () => { toast.success('Application rejected'); invalidateAll(); setRemarks(''); },
    onError: () => toast.error('Action failed'),
  });

  const anyMutating = reviewMut.isPending || approveMut.isPending || rejectMut.isPending;

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Applications"
          description="Review and manage volunteer event applications."
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.75} />
            <Input
              placeholder="Search by code, volunteer..."
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
              <SelectItem value="SUBMITTED">Submitted</SelectItem>
              <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="WITHDRAWN">Withdrawn</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 animate-pulse rounded-[12px] bg-muted/40" />
            ))}
          </div>
        ) : applications.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No applications found"
            description={search ? 'Try adjusting your search or filters.' : 'No applications have been submitted yet.'}
          />
        ) : (
          <>
            <DataTable>
              <DataTableHeader>
                <DataTableRow>
                  <DataTableHead>Volunteer</DataTableHead>
                  <DataTableHead className="hidden md:table-cell">Event</DataTableHead>
                  <DataTableHead>Status</DataTableHead>
                  <DataTableHead className="hidden sm:table-cell">Submitted</DataTableHead>
                  <DataTableHead className="w-10" />
                </DataTableRow>
              </DataTableHeader>
              <DataTableBody>
                {applications.map((app) => {
                  const badge = APP_STATUS_MAP[app.applicationStatus] ?? { status: 'pending' as const, label: app.applicationStatus };
                  return (
                    <DataTableRow
                      key={app.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedCode(app.applicationCode)}
                    >
                      <DataTableCell>
                        <div>
                          <p className="font-manrope font-medium">{app.volunteerName ?? 'Unknown'}</p>
                          <p className="font-space text-xs text-muted-foreground">{app.applicationCode}</p>
                        </div>
                      </DataTableCell>
                      <DataTableCell className="hidden md:table-cell">
                        <div>
                          <p className="font-manrope text-sm">{app.eventTitle ?? '—'}</p>
                          <p className="font-manrope text-xs text-muted-foreground">{app.editionName ?? ''}</p>
                        </div>
                      </DataTableCell>
                      <DataTableCell>
                        <StatusBadge status={badge.status} label={badge.label} />
                      </DataTableCell>
                      <DataTableCell className="hidden sm:table-cell">
                        <span className="font-space text-xs text-muted-foreground">
                          {app.submittedAt
                            ? new Date(app.submittedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                            : '—'}
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

      <Drawer open={!!selectedCode} onClose={() => { setSelectedCode(null); setRemarks(''); }}>
        <DrawerContent>
          {detailLoading ? (
            <div className="space-y-3 p-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 animate-pulse rounded-[10px] bg-muted/40" />
              ))}
            </div>
          ) : detail ? (
            <>
              <DrawerHeader>
                <DrawerTitle>{detail.volunteerName ?? 'Application Detail'}</DrawerTitle>
                <p className="font-space text-sm text-muted-foreground">{detail.applicationCode}</p>
              </DrawerHeader>

              <div className="space-y-4 px-6 pb-4">
                <div className="flex items-center gap-2">
                  <StatusBadge
                    status={(APP_STATUS_MAP[detail.applicationStatus] ?? { status: 'pending' as const }).status}
                    label={(APP_STATUS_MAP[detail.applicationStatus] ?? { label: detail.applicationStatus }).label}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="font-manrope text-xs text-muted-foreground">Event</p>
                    <p className="font-manrope text-sm font-medium">{detail.eventTitle ?? '—'}</p>
                  </div>
                  <div>
                    <p className="font-manrope text-xs text-muted-foreground">Edition</p>
                    <p className="font-manrope text-sm">{detail.editionName ?? '—'} {detail.editionYear ? `(${detail.editionYear})` : ''}</p>
                  </div>
                  <div>
                    <p className="font-manrope text-xs text-muted-foreground">Volunteer</p>
                    <p className="font-manrope text-sm">{detail.volunteerEmail ?? '—'}</p>
                  </div>
                  <div>
                    <p className="font-manrope text-xs text-muted-foreground">Location</p>
                    <p className="font-manrope text-sm">{detail.volunteerCity ?? '—'}{detail.volunteerState ? `, ${detail.volunteerState}` : ''}</p>
                  </div>
                </div>

                {detail.motivation && (
                  <div>
                    <p className="font-manrope text-xs text-muted-foreground">Motivation</p>
                    <p className="mt-1 font-manrope text-sm leading-relaxed">{detail.motivation}</p>
                  </div>
                )}

                {detail.relevantExperience && (
                  <div>
                    <p className="font-manrope text-xs text-muted-foreground">Relevant Experience</p>
                    <p className="mt-1 font-manrope text-sm leading-relaxed">{detail.relevantExperience}</p>
                  </div>
                )}

                {detail.skills.length > 0 && (
                  <div>
                    <p className="font-manrope text-xs text-muted-foreground">Skills</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {detail.skills.map((s) => (
                        <span key={s} className="rounded-[10px] border bg-muted/30 px-2 py-0.5 font-manrope text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="font-manrope text-xs text-muted-foreground">Emergency Contact</p>
                    <p className="font-manrope text-sm">{detail.emergencyContactName}</p>
                    <p className="font-manrope text-xs text-muted-foreground">{detail.emergencyContactPhone}</p>
                  </div>
                  {detail.expectedHours && (
                    <div>
                      <p className="font-manrope text-xs text-muted-foreground">Expected Hours</p>
                      <p className="font-space text-sm">{detail.expectedHours}h</p>
                    </div>
                  )}
                </div>

                {detail.adminRemarks && (
                  <div className="rounded-[12px] border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
                    <p className="font-manrope text-xs font-medium text-amber-700 dark:text-amber-400">Admin Remarks</p>
                    <p className="mt-1 font-manrope text-sm">{detail.adminRemarks}</p>
                  </div>
                )}

                {(detail.applicationStatus === 'SUBMITTED' || detail.applicationStatus === 'UNDER_REVIEW') && (
                  <div className="space-y-2">
                    <Label htmlFor="remarks" className="font-manrope text-sm">Remarks (optional)</Label>
                    <textarea
                      id="remarks"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      className="w-full rounded-[12px] border bg-background px-3 py-2 font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      rows={2}
                      placeholder="Add admin remarks..."
                    />
                  </div>
                )}
              </div>

              <DrawerFooter>
                {detail.applicationStatus === 'SUBMITTED' && (
                  <Button
                    onClick={() => reviewMut.mutate(detail.applicationCode)}
                    disabled={anyMutating}
                  >
                    <Eye className="h-4 w-4" strokeWidth={1.75} />
                    Move to Review
                  </Button>
                )}
                {detail.applicationStatus === 'UNDER_REVIEW' && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => approveMut.mutate(detail.applicationCode)}
                      disabled={anyMutating}
                      className="flex-1"
                    >
                      <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => rejectMut.mutate(detail.applicationCode)}
                      disabled={anyMutating}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4" strokeWidth={1.75} />
                      Reject
                    </Button>
                  </div>
                )}
                <Button variant="ghost" onClick={() => { setSelectedCode(null); setRemarks(''); }}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          ) : null}
        </DrawerContent>
      </Drawer>
    </>
  );
}
