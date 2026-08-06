'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Edit, Send, Archive, Copy, Trash2, Eye,
  Mail, Phone, MapPin, Calendar, Clock, Users, Briefcase,
  Globe, Link2, Shield, FileText, BarChart3, Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/dashboard/page-header';
import { ContentCard } from '@/components/dashboard/content-card';
import { StatCard } from '@/components/dashboard/stat-card';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { EmptyState } from '@/components/dashboard/empty-state';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  getOpportunityById,
  getOpportunityStats,
  publishOpportunity,
  archiveOpportunity,
  deleteOpportunity,
  duplicateOpportunity,
} from '@/lib/api/opportunities';

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

const TABS = ['Overview', 'Description', 'Location', 'Coordinator', 'Timeline', 'Applications', 'Media'] as const;
type Tab = (typeof TABS)[number];

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-muted">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
      </div>
      <div>
        <p className="font-manrope text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-0.5 font-manrope text-sm font-medium leading-tight text-foreground">{value}</p>
      </div>
    </div>
  );
}

function formatDateTime(date: string | null | undefined) {
  if (!date) return null;
  return new Date(date).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>('Overview');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-opportunity', id],
    queryFn: () => getOpportunityById(id),
  });

  const { data: statsData } = useQuery({
    queryKey: ['admin-opportunity-stats', id],
    queryFn: () => getOpportunityStats(id),
  });

  const opp = data?.data;
  const stats = statsData?.data;

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-opportunity', id] });
    queryClient.invalidateQueries({ queryKey: ['admin-opportunities'] });
  };

  const publishMut = useMutation({
    mutationFn: () => publishOpportunity(id),
    onSuccess: () => { toast.success('Opportunity published'); invalidateAll(); },
    onError: () => toast.error('Failed to publish'),
  });

  const archiveMut = useMutation({
    mutationFn: () => archiveOpportunity(id),
    onSuccess: () => { toast.success('Opportunity archived'); invalidateAll(); },
    onError: () => toast.error('Failed to archive'),
  });

  const deleteMut = useMutation({
    mutationFn: () => deleteOpportunity(id),
    onSuccess: () => { toast.success('Opportunity deleted'); router.push('/opportunities'); },
    onError: () => toast.error('Failed to delete'),
  });

  const duplicateMut = useMutation({
    mutationFn: () => duplicateOpportunity(id),
    onSuccess: (res) => { toast.success('Opportunity duplicated'); router.push(`/opportunities/${res.data.id}`); },
    onError: () => toast.error('Failed to duplicate'),
  });

  const anyMutating = publishMut.isPending || archiveMut.isPending || deleteMut.isPending || duplicateMut.isPending;

  if (isLoading) {
    return (
      <>
        <div className="space-y-4">
          <div className="h-48 animate-pulse rounded-[16px] bg-muted/40" />
          <div className="flex gap-4">
            <div className="h-10 w-32 animate-pulse rounded-[10px] bg-muted/40" />
            <div className="h-10 w-32 animate-pulse rounded-[10px] bg-muted/40" />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="h-64 animate-pulse rounded-[16px] bg-muted/40" />
            <div className="h-64 animate-pulse rounded-[16px] bg-muted/40" />
          </div>
        </div>
      </>
    );
  }

  if (!opp) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mt-4 font-cormorant text-2xl font-semibold">Opportunity not found</h2>
          <Button variant="ghost" className="mt-4" onClick={() => router.back()}>Go back</Button>
        </div>
      </>
    );
  }

  const badge = STATUS_MAP[opp.opportunityStatus] ?? { status: 'pending' as const, label: opp.opportunityStatus };
  const isDraft = opp.opportunityStatus === 'DRAFT';

  return (
    <>
      <div className="space-y-6">
        {/* CRM-Style Hero Banner */}
        <div className="relative overflow-hidden rounded-[16px] border bg-background shadow-foundation-sm">
          {/* Decorative background if no banner key */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
          {/* Overlay pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative p-6 sm:p-8">
            <Button variant="ghost" size="icon-sm" className="mb-4 bg-background/50 backdrop-blur-sm hover:bg-background/80" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            </Button>
            
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={badge.status} label={badge.label} />
                  <Badge variant="outline" className="font-manrope text-[11px] font-medium bg-background/50 backdrop-blur-sm">
                    {TYPE_LABELS[opp.opportunityType] ?? opp.opportunityType}
                  </Badge>
                  {opp.isFeatured && (
                    <Badge variant="secondary" className="font-manrope text-[11px] font-medium bg-heritage-gold/20 text-heritage-bronze border-0">
                      Featured
                    </Badge>
                  )}
                </div>
                <div>
                  <h1 className="font-cormorant text-3xl font-semibold tracking-tight sm:text-4xl">{opp.title}</h1>
                  <p className="font-space text-sm text-muted-foreground mt-1">ID: {opp.opportunityCode}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant="outline" className="bg-background/50 backdrop-blur-sm" onClick={() => router.push(`/opportunities/${id}/preview`)} disabled={anyMutating}>
                  <Eye className="h-4 w-4 mr-1.5" strokeWidth={1.75} />
                  Preview
                </Button>
                <Button size="sm" onClick={() => router.push(`/opportunities/${id}/edit`)} disabled={anyMutating}>
                  <Edit className="h-4 w-4 mr-1.5" strokeWidth={1.75} />
                  Edit
                </Button>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-2 rounded-xl border bg-background/60 p-1.5 backdrop-blur-md sm:w-fit">
              {isDraft && (
                <Button size="sm" variant="ghost" className="h-8 text-muted-foreground hover:text-foreground" onClick={() => publishMut.mutate()} disabled={anyMutating}>
                  <Send className="h-4 w-4 mr-1.5" strokeWidth={1.75} /> Publish
                </Button>
              )}
              <Button size="sm" variant="ghost" className="h-8 text-muted-foreground hover:text-foreground" onClick={() => duplicateMut.mutate()} disabled={anyMutating}>
                <Copy className="h-4 w-4 mr-1.5" strokeWidth={1.75} /> Duplicate
              </Button>
              <div className="h-4 w-px bg-border mx-1" />
              <Button size="sm" variant="ghost" className="h-8 text-muted-foreground hover:text-foreground" onClick={() => archiveMut.mutate()} disabled={anyMutating}>
                <Archive className="h-4 w-4 mr-1.5" strokeWidth={1.75} /> Archive
              </Button>
              <Button size="sm" variant="ghost" className="h-8 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => deleteMut.mutate()} disabled={anyMutating}>
                <Trash2 className="h-4 w-4 mr-1.5" strokeWidth={1.75} /> Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs - Modern Pill Style */}
        <div className="overflow-x-auto pb-2">
          <div className="flex items-center gap-2 min-w-max">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 font-manrope text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'Overview' && (
              <div className="grid gap-4 lg:grid-cols-2">
                <ContentCard title="Essential Details">
                  <div className="divide-y">
                    <InfoRow icon={Briefcase} label="Opportunity Type" value={TYPE_LABELS[opp.opportunityType] ?? opp.opportunityType} />
                    <InfoRow icon={Globe} label="Execution Mode" value={opp.mode?.charAt(0) + opp.mode?.slice(1).toLowerCase()} />
                    <InfoRow icon={Users} label="Volunteers Required" value={String(opp.volunteersRequired || 'Not specified')} />
                    <InfoRow icon={Shield} label="Gender Restriction" value={opp.genderRestriction === 'ANY' ? 'Any Gender' : opp.genderRestriction} />
                    <InfoRow icon={Briefcase} label="Experience Required" value={opp.experienceRequired ? 'Yes' : 'No'} />
                  </div>
                </ContentCard>

                <ContentCard title="Schedule Constraints">
                  <div className="divide-y">
                    <InfoRow icon={Calendar} label="Registration Window" value={`${formatDateTime(opp.registrationOpens) || 'N/A'} - ${formatDateTime(opp.registrationCloses) || 'N/A'}`} />
                    <InfoRow icon={Calendar} label="Event Dates" value={`${formatDateTime(opp.eventStartDate) || 'N/A'} - ${formatDateTime(opp.eventEndDate) || 'N/A'}`} />
                    <InfoRow icon={Clock} label="Daily Timing" value={`${opp.reportingTime || 'N/A'} to ${opp.closingTime || 'N/A'} (${opp.timeZone})`} />
                  </div>
                </ContentCard>

                <ContentCard title="Visibility & Automation">
                  <div className="divide-y">
                    <InfoRow icon={Eye} label="Display Placement" value={[
                      opp.showOnHomepage ? 'Homepage' : null,
                      opp.showOnCsrPage ? 'CSR Page' : null
                    ].filter(Boolean).join(', ') || 'Hidden'} />
                    <InfoRow icon={Globe} label="Registration Acceptance" value={opp.acceptRegistrations ? 'Enabled' : 'Disabled'} />
                    <InfoRow icon={Shield} label="Approval Workflow" value={opp.workflowType === 'MANUAL' ? 'Manual Review' : 'Automatic Approval'} />
                  </div>
                </ContentCard>

                {opp.adminNotes && (
                  <ContentCard title="Administrative Notes" className="border-heritage-bronze/30 bg-heritage-gold/5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="border-heritage-bronze/50 text-heritage-bronze bg-background">Dashboard Only</Badge>
                    </div>
                    <p className="font-manrope text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">{opp.adminNotes}</p>
                  </ContentCard>
                )}
              </div>
            )}

            {activeTab === 'Description' && (
              <div className="space-y-4">
                <ContentCard title="Short Overview">
                  <p className="font-manrope text-sm leading-relaxed">{opp.shortDescription || 'No short description provided.'}</p>
                </ContentCard>
                {opp.detailedDescription && (
                  <ContentCard title="Full Details">
                    <div className="font-manrope text-sm leading-relaxed whitespace-pre-wrap">{opp.detailedDescription}</div>
                  </ContentCard>
                )}
                <ContentCard title="Volunteer Prerequisites">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="font-manrope text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Required Skills</p>
                      {(opp.requiredSkills ?? []).length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {opp.requiredSkills.map((s) => (
                            <Badge key={s} variant="secondary" className="font-manrope font-medium">{s}</Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="font-manrope text-sm text-muted-foreground">None specified.</p>
                      )}
                    </div>
                    <div>
                      <p className="font-manrope text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Physical Requirements</p>
                      <p className="font-manrope text-sm leading-relaxed text-muted-foreground">{opp.physicalRequirements || 'None specified.'}</p>
                    </div>
                  </div>
                </ContentCard>
              </div>
            )}

            {activeTab === 'Location' && (
              <ContentCard title="Logistics & Venue">
                <div className="divide-y">
                  <InfoRow icon={Globe} label="Mode" value={opp.mode?.charAt(0) + opp.mode?.slice(1).toLowerCase()} />
                  {(opp.mode === 'OFFLINE' || opp.mode === 'HYBRID') && (
                    <>
                      <InfoRow icon={MapPin} label="Venue" value={opp.venue} />
                      <InfoRow icon={MapPin} label="Full Address" value={[opp.address, opp.landmark, opp.district, opp.state, opp.pincode].filter(Boolean).join(', ')} />
                      {opp.googleMapsUrl && (
                        <div className="flex items-start gap-3 py-3">
                          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-muted">
                            <Link2 className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
                          </div>
                          <div>
                            <p className="font-manrope text-xs font-medium text-muted-foreground">Google Maps</p>
                            <a href={opp.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-0.5 inline-block font-manrope text-sm font-medium text-primary hover:underline">
                              Open in Maps ↗
                            </a>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {(opp.mode === 'ONLINE' || opp.mode === 'HYBRID') && (
                    <>
                      <InfoRow icon={Link2} label="Meeting Link" value={opp.meetingLink} />
                      <InfoRow icon={Globe} label="Platform" value={opp.platform} />
                    </>
                  )}
                </div>
              </ContentCard>
            )}

            {activeTab === 'Coordinator' && (
              <ContentCard title="Point of Contact">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="h-10 w-10" />
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div className="text-center sm:text-left">
                      <h3 className="font-cormorant text-2xl font-semibold">{opp.coordinatorName || 'Not Assigned'}</h3>
                      <p className="font-manrope text-sm text-muted-foreground">{opp.coordinatorDesignation || 'Coordinator'}</p>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2 pt-2 border-t">
                      <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="font-space text-sm">{opp.coordinatorEmail || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="font-space text-sm">{opp.coordinatorMobile || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ContentCard>
            )}

            {activeTab === 'Timeline' && (
              <div className="space-y-4">
                <ContentCard title="System Activity">
                  <div className="relative pl-6 border-l-2 border-muted space-y-8 py-2">
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />
                      <p className="font-manrope text-sm font-medium">Last Updated</p>
                      <p className="font-space text-xs text-muted-foreground mt-1">{formatDateTime(opp.updatedAt)}</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-muted-foreground bg-background" />
                      <p className="font-manrope text-sm font-medium">Opportunity Created</p>
                      <p className="font-space text-xs text-muted-foreground mt-1">{formatDateTime(opp.createdAt)}</p>
                    </div>
                  </div>
                </ContentCard>
              </div>
            )}

            {activeTab === 'Applications' && (
              <div className="space-y-4">
                {stats ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Total Received" value={stats.total} icon={Briefcase} />
                    {stats.applications.map((app) => (
                      <StatCard key={app.status} title={app.status.replace(/_/g, ' ')} value={app.count} />
                    ))}
                  </div>
                ) : (
                  <EmptyState icon={BarChart3} title="No Data" description="Statistics will be generated when applications begin." />
                )}
              </div>
            )}

            {activeTab === 'Media' && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <ContentCard title="Required Volunteer Documents">
                    {(opp.requiredDocuments ?? []).length > 0 ? (
                      <div className="space-y-3">
                        {opp.requiredDocuments.map((doc) => (
                          <div key={doc} className="flex items-center gap-3 rounded-[12px] border bg-muted/20 p-3">
                            <FileText className="h-5 w-5 text-primary" strokeWidth={1.5} />
                            <span className="font-manrope text-sm font-medium">{doc.replace(/_/g, ' ')}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="font-manrope text-sm text-muted-foreground">No documents requested.</p>
                    )}
                  </ContentCard>

                  <ContentCard title="Supporting Assets">
                    <div className="space-y-3">
                      {opp.brochureKey && (
                        <div className="flex items-center gap-3 rounded-[12px] border bg-muted/20 p-3">
                          <FileText className="h-5 w-5 text-primary" strokeWidth={1.5} />
                          <div className="min-w-0">
                            <p className="font-manrope text-sm font-medium">Brochure</p>
                            <p className="font-space text-[10px] text-muted-foreground truncate">{opp.brochureKey}</p>
                          </div>
                        </div>
                      )}
                      {(opp.supportingDocKeys ?? []).map((key) => (
                        <div key={key} className="flex items-center gap-3 rounded-[12px] border bg-muted/20 p-3">
                          <FileText className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                          <div className="min-w-0">
                            <p className="font-manrope text-sm font-medium">Supporting File</p>
                            <p className="font-space text-[10px] text-muted-foreground truncate">{key}</p>
                          </div>
                        </div>
                      ))}
                      {!opp.brochureKey && (opp.supportingDocKeys ?? []).length === 0 && (
                         <p className="font-manrope text-sm text-muted-foreground">No supporting files attached.</p>
                      )}
                    </div>
                  </ContentCard>
                </div>

                <ContentCard title="Gallery Images">
                  {(opp.galleryImageKeys ?? []).length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {opp.galleryImageKeys.map((key) => (
                        <div key={key} className="group relative aspect-square flex flex-col items-center justify-center rounded-[12px] border bg-muted/20 p-4 transition-colors hover:bg-muted/40">
                          <ImageIcon className="h-8 w-8 text-muted-foreground/50 mb-2" strokeWidth={1.5} />
                          <span className="font-space text-xs text-muted-foreground text-center line-clamp-2 break-all">{key}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-manrope text-sm text-muted-foreground">No gallery images added.</p>
                  )}
                </ContentCard>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
