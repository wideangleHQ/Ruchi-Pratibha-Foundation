'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, MapPin, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getOpportunityById } from '@/lib/api/opportunities';

const TYPE_LABELS: Record<string, string> = {
  EVENT_BASED: 'Event Based',
  CAMPAIGN: 'Campaign',
  LONG_TERM: 'Long Term',
  RECURRING: 'Recurring',
};

export default function OpportunityPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const { data, isLoading } = useQuery({ 
    queryKey: ['admin-opportunity-preview', id], 
    queryFn: () => getOpportunityById(id) 
  });
  
  const opp = data?.data;

  return (
    <>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-muted-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" strokeWidth={1.75} />
            Back to Dashboard
          </Button>
          <Badge variant="secondary" className="bg-primary/10 text-primary font-manrope font-medium">Website Preview</Badge>
        </div>

        {isLoading || !opp ? (
          <div className="h-[600px] animate-pulse rounded-[20px] bg-muted/40" />
        ) : (
          <div className="overflow-hidden rounded-[20px] border border-border/50 bg-background shadow-2xl">
            {/* Cinematic Hero */}
            <div className="relative min-h-[40vh] w-full flex items-end justify-start bg-zinc-950 p-8 sm:p-16">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
              <div className="relative z-10 max-w-4xl space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white/10 px-3 py-1 font-space text-[11px] font-medium tracking-wide text-white backdrop-blur-md uppercase">
                    {TYPE_LABELS[opp.opportunityType] ?? opp.opportunityType}
                  </span>
                  {opp.isFeatured && (
                    <span className="rounded-full bg-heritage-gold/90 px-3 py-1 font-space text-[11px] font-bold tracking-wide text-zinc-900 uppercase">
                      Featured
                    </span>
                  )}
                </div>
                
                <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white leading-tight">
                  {opp.title}
                </h1>
                
                <p className="max-w-2xl font-manrope text-base sm:text-lg leading-relaxed text-zinc-300">
                  {opp.shortDescription}
                </p>
              </div>
            </div>

            {/* Content Layout */}
            <div className="mx-auto grid max-w-6xl gap-10 p-6 sm:p-12 lg:grid-cols-[1fr_360px]">
              
              {/* Left Column: Details */}
              <article className="space-y-12">
                <section>
                  <h2 className="font-cormorant text-3xl font-semibold tracking-tight text-foreground">Overview</h2>
                  <div className="mt-6 font-manrope text-[15px] leading-relaxed text-muted-foreground whitespace-pre-wrap">
                    {opp.detailedDescription || opp.shortDescription}
                  </div>
                </section>

                {(opp.requiredSkills ?? []).length > 0 && (
                  <section>
                    <h2 className="font-cormorant text-2xl font-semibold tracking-tight text-foreground">Skills Required</h2>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {opp.requiredSkills.map((skill) => (
                        <div key={skill} className="rounded-[10px] border bg-muted/30 px-4 py-2 font-manrope text-sm font-medium">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {opp.physicalRequirements && (
                  <section>
                    <h2 className="font-cormorant text-2xl font-semibold tracking-tight text-foreground">Physical Requirements</h2>
                    <p className="mt-4 font-manrope text-[15px] leading-relaxed text-muted-foreground">
                      {opp.physicalRequirements}
                    </p>
                  </section>
                )}
              </article>

              {/* Right Column: Sticky Sidebar Action Card */}
              <aside className="relative">
                <div className="sticky top-6 overflow-hidden rounded-[16px] border bg-card shadow-foundation-sm">
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Calendar className="h-4 w-4 text-primary" strokeWidth={1.75} />
                        </div>
                        <div>
                          <p className="font-manrope text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                          <p className="mt-1 font-manrope text-sm font-medium">
                            {opp.eventStartDate ? new Date(opp.eventStartDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'To be announced'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <MapPin className="h-4 w-4 text-primary" strokeWidth={1.75} />
                        </div>
                        <div>
                          <p className="font-manrope text-xs text-muted-foreground uppercase tracking-wider">Location</p>
                          <p className="mt-1 font-manrope text-sm font-medium">
                            {[opp.venue, opp.district, opp.state].filter(Boolean).join(', ') || opp.platform || 'To be announced'}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Users className="h-4 w-4 text-primary" strokeWidth={1.75} />
                        </div>
                        <div>
                          <p className="font-manrope text-xs text-muted-foreground uppercase tracking-wider">Volunteers</p>
                          <p className="mt-1 font-manrope text-sm font-medium">
                            {opp.volunteersRequired || 'Any number'} required
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <Button 
                        size="lg" 
                        className="w-full font-manrope text-base h-12 rounded-[12px] transition-all hover:scale-[1.02]" 
                        disabled={!opp.acceptRegistrations}
                      >
                        {opp.acceptRegistrations ? 'Apply for this Opportunity' : 'Registrations Closed'}
                        <ChevronRight className="ml-2 h-4 w-4" strokeWidth={2} />
                      </Button>
                      {!opp.acceptRegistrations && (
                         <p className="mt-3 text-center font-manrope text-xs text-muted-foreground">
                           This opportunity is not currently accepting applications.
                         </p>
                      )}
                    </div>
                  </div>
                </div>
              </aside>
              
            </div>
          </div>
        )}
      </div>
    </>
  );
}
