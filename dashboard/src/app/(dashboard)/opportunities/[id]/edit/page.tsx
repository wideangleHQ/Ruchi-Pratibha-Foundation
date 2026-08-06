'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/dashboard/page-header';
import { ContentCard } from '@/components/dashboard/content-card';
import { WizardStepper } from '@/components/dashboard/wizard-stepper';
import { UploadCard } from '@/components/dashboard/upload-card';
import { DocumentRadioCard } from '@/components/dashboard/document-radio-card';
import { EnhancedTextarea } from '@/components/dashboard/enhanced-textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getOpportunityById, updateOpportunity, type OpportunityDetail } from '@/lib/api/opportunities';

const WIZARD_STEPS = [
  { label: 'General' },
  { label: 'Schedule' },
  { label: 'Location' },
  { label: 'Requirements' },
  { label: 'Coordinator' },
  { label: 'Documents' },
  { label: 'Media' },
  { label: 'Notes' },
];

const SKILL_OPTIONS = [
  'Photography', 'Videography', 'Teaching', 'Medical', 'Driving',
  'Event Management', 'Social Media', 'Administration',
  'Public Speaking', 'First Aid', 'Other',
];

type FormData = Partial<OpportunityDetail>;

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

export default function EditOpportunityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [form, setForm] = useState<FormData>({});
  const [initialized, setInitialized] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-opportunity', id],
    queryFn: () => getOpportunityById(id),
  });

  useEffect(() => {
    if (data?.data && !initialized) {
      setForm(data.data);
      setInitialized(true);
    }
  }, [data, initialized]);

  const updateMut = useMutation({
    mutationFn: () => updateOpportunity(id, form),
    onSuccess: () => {
      toast.success('Opportunity updated');
      queryClient.invalidateQueries({ queryKey: ['admin-opportunity', id] });
      queryClient.invalidateQueries({ queryKey: ['admin-opportunities'] });
      router.push(`/opportunities/${id}`);
    },
    onError: () => toast.error('Failed to update opportunity'),
  });

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateFormConfig = (key: string, value: boolean) => {
    setForm((prev) => ({
      ...prev,
      formConfig: { ...(prev.formConfig ?? {}), [key]: value },
    }));
  };

  const toggleSkill = (skill: string) => {
    setForm((prev) => {
      const current = prev.requiredSkills ?? [];
      return {
        ...prev,
        requiredSkills: current.includes(skill) ? current.filter((s) => s !== skill) : [...current, skill],
      };
    });
  };

  const goNext = () => { setDirection(1); setStep((s) => Math.min(s + 1, WIZARD_STEPS.length - 1)); };
  const goPrev = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 0)); };
  const goToStep = (i: number) => { setDirection(i > step ? 1 : -1); setStep(i); };

  const canGoNext = step < WIZARD_STEPS.length - 1;
  const canGoPrev = step > 0;

  if (isLoading || !initialized) {
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

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" onClick={() => router.back()} aria-label="Go back">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          </Button>
          <PageHeader title="Edit Opportunity" description="Update the details for this CSR opportunity." />
        </div>

        {/* Stepper */}
        <WizardStepper steps={WIZARD_STEPS} currentStep={step} onStepClick={goToStep} />

        {/* Step Content */}
        <div className="min-h-[420px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Step 0: General */}
              {step === 0 && (
                <ContentCard title="General Information">
                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="title" className="font-manrope text-sm">Title *</Label>
                      <Input id="title" value={form.title ?? ''} onChange={(e) => updateField('title', e.target.value)} placeholder="Enter opportunity title" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="type" className="font-manrope text-sm">Type *</Label>
                      <Select value={form.opportunityType ?? 'EVENT_BASED'} onValueChange={(v) => updateField('opportunityType', v)}>
                        <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EVENT_BASED">Event Based</SelectItem>
                          <SelectItem value="CAMPAIGN">Campaign</SelectItem>
                          <SelectItem value="LONG_TERM">Long Term</SelectItem>
                          <SelectItem value="RECURRING">Recurring</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <EnhancedTextarea
                      label="Short Description *"
                      description="Brief description shown in listings"
                      value={form.shortDescription ?? ''}
                      onChange={(e) => updateField('shortDescription', (e.target as HTMLTextAreaElement).value)}
                      placeholder="Describe this opportunity in a few sentences..."
                      maxChars={300}
                      rows={3}
                    />
                    <EnhancedTextarea
                      label="Detailed Description"
                      description="Full description with rich details"
                      value={form.detailedDescription ?? ''}
                      onChange={(e) => updateField('detailedDescription', (e.target as HTMLTextAreaElement).value || null)}
                      placeholder="Provide comprehensive details about the opportunity, expectations, and impact..."
                      maxChars={5000}
                      rows={6}
                    />
                    <div>
                      <Label htmlFor="eventId" className="font-manrope text-sm">Event ID (optional)</Label>
                      <Input id="eventId" value={form.eventId ?? ''} onChange={(e) => updateField('eventId', e.target.value || null)} placeholder="Link to an existing event" className="mt-1.5" />
                    </div>
                    <UploadCard
                      label="Banner Image"
                      description="16:9 aspect ratio recommended for best display"
                      value={form.bannerImageKey ?? null}
                      onChange={(v) => updateField('bannerImageKey', v)}
                      variant="hero"
                      accept="JPG, PNG, WebP"
                      maxSize="5 MB"
                    />
                    <UploadCard
                      label="Featured Image"
                      value={form.featuredImageKey ?? null}
                      onChange={(v) => updateField('featuredImageKey', v)}
                      accept="JPG, PNG, WebP"
                      maxSize="2 MB"
                    />
                  </div>
                </ContentCard>
              )}

              {/* Step 1: Schedule */}
              {step === 1 && (
                <ContentCard title="Schedule & Timing">
                  <div className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="regOpens" className="font-manrope text-sm">Registration Opens</Label>
                        <Input id="regOpens" type="datetime-local" value={form.registrationOpens ? new Date(form.registrationOpens).toISOString().slice(0, 16) : ''} onChange={(e) => updateField('registrationOpens', e.target.value ? new Date(e.target.value).toISOString() : null)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="regCloses" className="font-manrope text-sm">Registration Closes</Label>
                        <Input id="regCloses" type="datetime-local" value={form.registrationCloses ? new Date(form.registrationCloses).toISOString().slice(0, 16) : ''} onChange={(e) => updateField('registrationCloses', e.target.value ? new Date(e.target.value).toISOString() : null)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="eventStart" className="font-manrope text-sm">Event Start Date</Label>
                        <Input id="eventStart" type="datetime-local" value={form.eventStartDate ? new Date(form.eventStartDate).toISOString().slice(0, 16) : ''} onChange={(e) => updateField('eventStartDate', e.target.value ? new Date(e.target.value).toISOString() : null)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="eventEnd" className="font-manrope text-sm">Event End Date</Label>
                        <Input id="eventEnd" type="datetime-local" value={form.eventEndDate ? new Date(form.eventEndDate).toISOString().slice(0, 16) : ''} onChange={(e) => updateField('eventEndDate', e.target.value ? new Date(e.target.value).toISOString() : null)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="reportingTime" className="font-manrope text-sm">Reporting Time</Label>
                        <Input id="reportingTime" type="time" value={form.reportingTime ?? ''} onChange={(e) => updateField('reportingTime', e.target.value || null)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="closingTime" className="font-manrope text-sm">Closing Time</Label>
                        <Input id="closingTime" type="time" value={form.closingTime ?? ''} onChange={(e) => updateField('closingTime', e.target.value || null)} className="mt-1.5" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="timezone" className="font-manrope text-sm">Time Zone</Label>
                      <Select value={form.timeZone ?? 'Asia/Kolkata'} onValueChange={(v) => updateField('timeZone', v)}>
                        <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                          <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </ContentCard>
              )}

              {/* Step 2: Location */}
              {step === 2 && (
                <ContentCard title="Location & Mode">
                  <div className="space-y-5">
                    <div>
                      <Label className="font-manrope text-sm">Mode *</Label>
                      <div className="mt-2 flex gap-3">
                        {(['OFFLINE', 'ONLINE', 'HYBRID'] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => updateField('mode', m)}
                            className={`rounded-[10px] border-2 px-5 py-2.5 font-manrope text-sm font-medium transition-all duration-200 ${
                              form.mode === m
                                ? 'border-primary bg-primary/5 text-primary shadow-[0_0_0_1px_hsl(var(--primary)/0.2)]'
                                : 'border-border text-muted-foreground hover:bg-muted/50 hover:border-primary/30'
                            }`}
                          >
                            {m.charAt(0) + m.slice(1).toLowerCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                    {(form.mode === 'OFFLINE' || form.mode === 'HYBRID') && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="venue" className="font-manrope text-sm">Venue</Label>
                          <Input id="venue" value={form.venue ?? ''} onChange={(e) => updateField('venue', e.target.value || null)} placeholder="Venue name" className="mt-1.5" />
                        </div>
                        <div>
                          <Label htmlFor="address" className="font-manrope text-sm">Address</Label>
                          <EnhancedTextarea value={form.address ?? ''} onChange={(e) => updateField('address', (e.target as HTMLTextAreaElement).value || null)} placeholder="Full address" rows={2} />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div>
                            <Label htmlFor="landmark" className="font-manrope text-sm">Landmark</Label>
                            <Input id="landmark" value={form.landmark ?? ''} onChange={(e) => updateField('landmark', e.target.value || null)} className="mt-1.5" />
                          </div>
                          <div>
                            <Label htmlFor="district" className="font-manrope text-sm">District</Label>
                            <Input id="district" value={form.district ?? ''} onChange={(e) => updateField('district', e.target.value || null)} className="mt-1.5" />
                          </div>
                          <div>
                            <Label htmlFor="state" className="font-manrope text-sm">State</Label>
                            <Input id="state" value={form.state ?? ''} onChange={(e) => updateField('state', e.target.value || null)} className="mt-1.5" />
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="pincode" className="font-manrope text-sm">Pincode</Label>
                            <Input id="pincode" value={form.pincode ?? ''} onChange={(e) => updateField('pincode', e.target.value || null)} className="mt-1.5" />
                          </div>
                          <div>
                            <Label htmlFor="mapsUrl" className="font-manrope text-sm">Google Maps URL</Label>
                            <Input id="mapsUrl" value={form.googleMapsUrl ?? ''} onChange={(e) => updateField('googleMapsUrl', e.target.value || null)} className="mt-1.5" />
                          </div>
                        </div>
                      </div>
                    )}
                    {(form.mode === 'ONLINE' || form.mode === 'HYBRID') && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="meetingLink" className="font-manrope text-sm">Meeting Link</Label>
                          <Input id="meetingLink" value={form.meetingLink ?? ''} onChange={(e) => updateField('meetingLink', e.target.value || null)} placeholder="https://..." className="mt-1.5" />
                        </div>
                        <div>
                          <Label htmlFor="platform" className="font-manrope text-sm">Platform</Label>
                          <Input id="platform" value={form.platform ?? ''} onChange={(e) => updateField('platform', e.target.value || null)} placeholder="Zoom, Google Meet, etc." className="mt-1.5" />
                        </div>
                      </div>
                    )}
                  </div>
                </ContentCard>
              )}

              {/* Step 3: Requirements */}
              {step === 3 && (
                <ContentCard title="Volunteer Requirements">
                  <div className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="volRequired" className="font-manrope text-sm">Volunteers Required</Label>
                        <Input id="volRequired" type="number" min={0} value={form.volunteersRequired ?? 0} onChange={(e) => updateField('volunteersRequired', parseInt(e.target.value) || 0)} className="mt-1.5 font-space" />
                      </div>
                      <div>
                        <Label htmlFor="maxApps" className="font-manrope text-sm">Max Applications</Label>
                        <Input id="maxApps" type="number" min={0} value={form.maxApplications ?? 0} onChange={(e) => updateField('maxApplications', parseInt(e.target.value) || 0)} className="mt-1.5 font-space" />
                      </div>
                      <div>
                        <Label htmlFor="minAge" className="font-manrope text-sm">Min Age</Label>
                        <Input id="minAge" type="number" min={0} value={form.minAge ?? ''} onChange={(e) => updateField('minAge', e.target.value ? parseInt(e.target.value) : null)} className="mt-1.5 font-space" />
                      </div>
                      <div>
                        <Label htmlFor="maxAge" className="font-manrope text-sm">Max Age</Label>
                        <Input id="maxAge" type="number" min={0} value={form.maxAge ?? ''} onChange={(e) => updateField('maxAge', e.target.value ? parseInt(e.target.value) : null)} className="mt-1.5 font-space" />
                      </div>
                    </div>
                    <div>
                      <Label className="font-manrope text-sm">Gender Restriction</Label>
                      <Select value={form.genderRestriction ?? 'ANY'} onValueChange={(v) => updateField('genderRestriction', v)}>
                        <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ANY">Any</SelectItem>
                          <SelectItem value="MALE">Male Only</SelectItem>
                          <SelectItem value="FEMALE">Female Only</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-3 rounded-[12px] border p-3">
                      <Switch checked={form.experienceRequired ?? false} onCheckedChange={(v) => updateField('experienceRequired', v)} />
                      <Label className="font-manrope text-sm">Experience Required</Label>
                    </div>
                    <div>
                      <Label className="font-manrope text-sm">Required Skills</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {SKILL_OPTIONS.map((skill) => (
                          <label key={skill} className="flex items-center gap-2 rounded-[10px] border px-3 py-1.5 cursor-pointer hover:bg-muted/50 transition-colors">
                            <Checkbox checked={(form.requiredSkills ?? []).includes(skill)} onCheckedChange={() => toggleSkill(skill)} />
                            <span className="font-manrope text-xs">{skill}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <EnhancedTextarea
                      label="Physical Requirements"
                      value={form.physicalRequirements ?? ''}
                      onChange={(e) => updateField('physicalRequirements', (e.target as HTMLTextAreaElement).value || null)}
                      placeholder="Describe any physical requirements for volunteers (e.g., ability to walk long distances, carry heavy items)..."
                      maxChars={1000}
                      rows={3}
                    />
                  </div>
                </ContentCard>
              )}

              {/* Step 4: Coordinator */}
              {step === 4 && (
                <ContentCard title="Coordinator Details">
                  <div className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="coordName" className="font-manrope text-sm">Coordinator Name</Label>
                        <Input id="coordName" value={form.coordinatorName ?? ''} onChange={(e) => updateField('coordinatorName', e.target.value || null)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="coordDesig" className="font-manrope text-sm">Designation</Label>
                        <Input id="coordDesig" value={form.coordinatorDesignation ?? ''} onChange={(e) => updateField('coordinatorDesignation', e.target.value || null)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="coordEmail" className="font-manrope text-sm">Email</Label>
                        <Input id="coordEmail" type="email" value={form.coordinatorEmail ?? ''} onChange={(e) => updateField('coordinatorEmail', e.target.value || null)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="coordMobile" className="font-manrope text-sm">Mobile</Label>
                        <Input id="coordMobile" value={form.coordinatorMobile ?? ''} onChange={(e) => updateField('coordinatorMobile', e.target.value || null)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="coordAlt" className="font-manrope text-sm">Alt. Mobile</Label>
                        <Input id="coordAlt" value={form.coordinatorAltMobile ?? ''} onChange={(e) => updateField('coordinatorAltMobile', e.target.value || null)} className="mt-1.5" />
                      </div>
                    </div>
                  </div>
                </ContentCard>
              )}

              {/* Step 5: Documents */}
              {step === 5 && (
                <ContentCard title="Documents & Form Config">
                  <div className="space-y-6">
                    <DocumentRadioCard
                      selected={form.requiredDocuments ?? []}
                      onChange={(docs) => updateField('requiredDocuments', docs)}
                    />
                    <div className="border-t pt-6">
                      <p className="font-manrope text-sm font-medium mb-4">Registration Form Fields</p>
                      <p className="font-manrope text-xs text-muted-foreground mb-3">Configure which fields appear on the volunteer registration form.</p>
                      <div className="space-y-2">
                        {['motivation', 'experience', 'skills', 'availability'].map((field) => (
                          <div key={field} className="flex items-center justify-between rounded-[12px] border p-3">
                            <Label className="font-manrope text-sm capitalize">{field}</Label>
                            <Switch
                              checked={(form.formConfig ?? {})[field] ?? false}
                              onCheckedChange={(v) => updateFormConfig(field, v)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ContentCard>
              )}

              {/* Step 6: Media */}
              {step === 6 && (
                <ContentCard title="Media & Assets">
                  <div className="space-y-6">
                    <p className="font-manrope text-sm text-muted-foreground">Upload media assets for this opportunity. Use file keys from the Media module.</p>
                    <div className="grid gap-6 lg:grid-cols-3">
                      <UploadCard
                        label="Brochure"
                        description="PDF or image brochure"
                        value={form.brochureKey ?? null}
                        onChange={(v) => updateField('brochureKey', v)}
                        accept="PDF, JPG, PNG"
                        maxSize="10 MB"
                      />
                      <UploadCard
                        label="Gallery Images"
                        description="Key for gallery images"
                        value={(form.galleryImageKeys ?? []).join(', ') || null}
                        onChange={(v) => updateField('galleryImageKeys', v ? v.split(',').map((s) => s.trim()).filter(Boolean) : [])}
                        accept="JPG, PNG, WebP"
                        maxSize="5 MB each"
                      />
                      <UploadCard
                        label="Supporting Documents"
                        description="Additional documents"
                        value={(form.supportingDocKeys ?? []).join(', ') || null}
                        onChange={(v) => updateField('supportingDocKeys', v ? v.split(',').map((s) => s.trim()).filter(Boolean) : [])}
                        accept="PDF, DOC, JPG"
                        maxSize="10 MB"
                      />
                    </div>
                  </div>
                </ContentCard>
              )}

              {/* Step 7: Notes (consolidated) */}
              {step === 7 && (
                <div className="space-y-6">
                  <ContentCard title="Admin Notes">
                    <EnhancedTextarea
                      label="Internal Notes"
                      badge="Dashboard Only"
                      description="These notes are only visible to administrators and will not appear on the website."
                      value={form.adminNotes ?? ''}
                      onChange={(e) => updateField('adminNotes', (e.target as HTMLTextAreaElement).value || null)}
                      placeholder="Add internal notes, reminders, or context about this opportunity..."
                      maxChars={5000}
                      rows={6}
                    />
                  </ContentCard>

                  <ContentCard title="Visibility & Display">
                    <div className="space-y-2">
                      {([
                        { key: 'showOnHomepage' as const, label: 'Show on Homepage' },
                        { key: 'showOnCsrPage' as const, label: 'Show on CSR Page' },
                        { key: 'showCountdown' as const, label: 'Show Countdown Timer' },
                        { key: 'isFeatured' as const, label: 'Featured Opportunity' },
                        { key: 'acceptRegistrations' as const, label: 'Accept Registrations' },
                      ]).map(({ key, label }) => (
                        <div key={key} className="flex items-center justify-between rounded-[12px] border p-3">
                          <Label className="font-manrope text-sm">{label}</Label>
                          <Switch checked={(form[key] as boolean) ?? false} onCheckedChange={(v) => updateField(key, v)} />
                        </div>
                      ))}
                    </div>
                  </ContentCard>

                  <ContentCard title="Application Workflow">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        {(['MANUAL', 'AUTOMATIC'] as const).map((w) => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => updateField('workflowType', w)}
                            className={`rounded-[10px] border-2 px-5 py-2.5 font-manrope text-sm font-medium transition-all duration-200 ${
                              form.workflowType === w
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border text-muted-foreground hover:bg-muted/50'
                            }`}
                          >
                            {w.charAt(0) + w.slice(1).toLowerCase()}
                          </button>
                        ))}
                      </div>
                      <div className="rounded-[12px] border bg-muted/20 p-4">
                        <p className="font-manrope text-sm">
                          {form.workflowType === 'MANUAL'
                            ? 'Manual: Applications will be reviewed by an admin before approval.'
                            : 'Automatic: Applications are automatically approved upon submission.'}
                        </p>
                      </div>
                    </div>
                  </ContentCard>

                  <ContentCard title="Notifications">
                    <div className="space-y-2">
                      {([
                        { key: 'notifyRegistration' as const, label: 'Registration Confirmation' },
                        { key: 'notifyApproval' as const, label: 'Application Approval' },
                        { key: 'notifyRejection' as const, label: 'Application Rejection' },
                        { key: 'notifyReminder' as const, label: 'Event Reminder' },
                      ]).map(({ key, label }) => (
                        <div key={key} className="flex items-center justify-between rounded-[12px] border p-3">
                          <Label className="font-manrope text-sm">{label}</Label>
                          <Switch checked={(form[key] as boolean) ?? false} onCheckedChange={(v) => updateField(key, v)} />
                        </div>
                      ))}
                    </div>
                  </ContentCard>

                  <ContentCard title="SEO">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="metaTitle" className="font-manrope text-sm">Meta Title</Label>
                        <Input id="metaTitle" value={form.metaTitle ?? ''} onChange={(e) => updateField('metaTitle', e.target.value || null)} placeholder="SEO title" className="mt-1.5" />
                      </div>
                      <EnhancedTextarea
                        label="Meta Description"
                        value={form.metaDescription ?? ''}
                        onChange={(e) => updateField('metaDescription', (e.target as HTMLTextAreaElement).value || null)}
                        placeholder="SEO description"
                        maxChars={160}
                        rows={3}
                      />
                      <UploadCard
                        label="OG Image"
                        value={form.ogImageKey ?? null}
                        onChange={(v) => updateField('ogImageKey', v)}
                        accept="JPG, PNG"
                        maxSize="2 MB"
                      />
                    </div>
                  </ContentCard>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t pt-5">
          <Button variant="outline" onClick={goPrev} disabled={!canGoPrev}>
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {canGoNext ? (
              <Button onClick={goNext}>
                Next
                <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
              </Button>
            ) : (
              <Button onClick={() => updateMut.mutate()} disabled={updateMut.isPending || !form.title}>
                <Save className="h-4 w-4" strokeWidth={1.75} />
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
