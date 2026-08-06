'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft, UserCheck, UserX, Mail, Phone, MapPin, Calendar,
  Briefcase, Heart, Shield, Languages, Clock,
} from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/dashboard/page-header';
import { ContentCard } from '@/components/dashboard/content-card';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { SectionHeader } from '@/components/dashboard/section-header';
import { Button } from '@/components/ui/button';
import { getVolunteerById, verifyVolunteer, rejectVolunteer } from '@/lib/api/volunteers';

const STATUS_MAP: Record<string, { status: 'pending' | 'success' | 'error'; label: string }> = {
  PENDING_VERIFICATION: { status: 'pending', label: 'Pending Verification' },
  VERIFIED: { status: 'success', label: 'Verified' },
  REJECTED: { status: 'error', label: 'Rejected' },
  SUSPENDED: { status: 'error', label: 'Suspended' },
  INACTIVE: { status: 'pending', label: 'Inactive' },
};

function InfoRow({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
      <div>
        <p className="font-manrope text-xs text-muted-foreground">{label}</p>
        <p className="font-manrope text-sm">{value}</p>
      </div>
    </div>
  );
}

export default function VolunteerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-volunteer', id],
    queryFn: () => getVolunteerById(id),
  });

  const volunteer = data?.data;

  const verifyMutation = useMutation({
    mutationFn: () => verifyVolunteer(id),
    onSuccess: () => {
      toast.success('Volunteer verified successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-volunteer', id] });
      queryClient.invalidateQueries({ queryKey: ['admin-volunteers'] });
    },
    onError: () => toast.error('Failed to verify volunteer'),
  });

  const rejectMutation = useMutation({
    mutationFn: () => rejectVolunteer(id),
    onSuccess: () => {
      toast.success('Volunteer rejected');
      queryClient.invalidateQueries({ queryKey: ['admin-volunteer', id] });
      queryClient.invalidateQueries({ queryKey: ['admin-volunteers'] });
    },
    onError: () => toast.error('Failed to reject volunteer'),
  });

  if (isLoading) {
    return (
      <>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-[16px] bg-muted/40" />
          ))}
        </div>
      </>
    );
  }

  if (!volunteer) {
    return (
      <>
        <div className="py-12 text-center">
          <p className="font-manrope text-muted-foreground">Volunteer not found.</p>
          <Button variant="ghost" className="mt-4" onClick={() => router.back()}>Go back</Button>
        </div>
      </>
    );
  }

  const badge = STATUS_MAP[volunteer.volunteerStatus] ?? { status: 'pending' as const, label: volunteer.volunteerStatus };
  const isPending = volunteer.volunteerStatus === 'PENDING_VERIFICATION';

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" onClick={() => router.back()} aria-label="Go back">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          </Button>
          <div className="flex-1">
            <PageHeader
              title={`${volunteer.firstName} ${volunteer.lastName}`}
              description={volunteer.volunteerCode}
              action={
                <div className="flex items-center gap-2">
                  <StatusBadge status={badge.status} label={badge.label} />
                  {isPending && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => verifyMutation.mutate()}
                        disabled={verifyMutation.isPending || rejectMutation.isPending}
                      >
                        <UserCheck className="h-4 w-4" strokeWidth={1.75} />
                        Verify
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => rejectMutation.mutate()}
                        disabled={verifyMutation.isPending || rejectMutation.isPending}
                      >
                        <UserX className="h-4 w-4" strokeWidth={1.75} />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              }
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ContentCard title="Personal Information">
            <div className="divide-y">
              <InfoRow icon={Mail} label="Email" value={volunteer.email} />
              <InfoRow icon={Phone} label="Phone" value={volunteer.phone} />
              <InfoRow icon={Calendar} label="Date of Birth" value={volunteer.dateOfBirth ? new Date(volunteer.dateOfBirth).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : null} />
              <InfoRow icon={Heart} label="Gender" value={volunteer.gender?.replace(/_/g, ' ')} />
              <InfoRow icon={Heart} label="Blood Group" value={volunteer.bloodGroup?.replace(/_/g, ' ')} />
            </div>
          </ContentCard>

          <ContentCard title="Address">
            <div className="divide-y">
              <InfoRow icon={MapPin} label="Address" value={[volunteer.addressLine1, volunteer.addressLine2].filter(Boolean).join(', ')} />
              <InfoRow icon={MapPin} label="City, State" value={`${volunteer.city}, ${volunteer.state}`} />
              <InfoRow icon={MapPin} label="Pincode" value={volunteer.pincode} />
              <InfoRow icon={MapPin} label="Country" value={volunteer.country} />
            </div>
          </ContentCard>

          <ContentCard title="Professional">
            <div className="divide-y">
              <InfoRow icon={Briefcase} label="Occupation" value={volunteer.occupation} />
              <InfoRow icon={Briefcase} label="Organization" value={volunteer.organization} />
              {volunteer.skills.length > 0 && (
                <div className="flex items-start gap-3 py-2">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                  <div>
                    <p className="font-manrope text-xs text-muted-foreground">Skills</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {volunteer.skills.map((s) => (
                        <span key={s} className="rounded-[10px] border bg-muted/30 px-2 py-0.5 font-manrope text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {volunteer.languages.length > 0 && (
                <div className="flex items-start gap-3 py-2">
                  <Languages className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                  <div>
                    <p className="font-manrope text-xs text-muted-foreground">Languages</p>
                    <p className="font-manrope text-sm">{volunteer.languages.join(', ')}</p>
                  </div>
                </div>
              )}
            </div>
          </ContentCard>

          <ContentCard title="Emergency Contact & Availability">
            <div className="divide-y">
              <InfoRow icon={Phone} label="Emergency Contact" value={volunteer.emergencyName} />
              <InfoRow icon={Phone} label="Emergency Phone" value={volunteer.emergencyPhone} />
              {volunteer.availableDays.length > 0 && (
                <div className="flex items-start gap-3 py-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                  <div>
                    <p className="font-manrope text-xs text-muted-foreground">Available Days</p>
                    <p className="font-manrope text-sm">{volunteer.availableDays.join(', ')}</p>
                  </div>
                </div>
              )}
              {volunteer.motivation && (
                <div className="py-2">
                  <p className="font-manrope text-xs text-muted-foreground">Motivation</p>
                  <p className="mt-1 font-manrope text-sm leading-relaxed">{volunteer.motivation}</p>
                </div>
              )}
            </div>
          </ContentCard>
        </div>

        {volunteer.identities && volunteer.identities.length > 0 && (
          <ContentCard title="Identity Documents">
            <div className="space-y-2">
              {volunteer.identities.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between rounded-[12px] border p-3">
                  <div>
                    <p className="font-manrope text-sm font-medium">{doc.documentType.replace(/_/g, ' ')}</p>
                    <p className="font-space text-xs text-muted-foreground">{doc.documentNumber}</p>
                  </div>
                  <StatusBadge
                    status={doc.verificationStatus === 'VERIFIED' ? 'success' : doc.verificationStatus === 'REJECTED' ? 'error' : 'pending'}
                    label={doc.verificationStatus}
                  />
                </div>
              ))}
            </div>
          </ContentCard>
        )}
      </div>
    </>
  );
}
