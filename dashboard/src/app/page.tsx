'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumb } from '@/components/dashboard/breadcrumb';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ContentCard } from '@/components/dashboard/content-card';
import { GlassCard } from '@/components/dashboard/glass-card';
import { EmptyState } from '@/components/dashboard/empty-state';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Heart, FileText, Plus } from 'lucide-react';

export default function DashboardHome() {
  return (
    <DashboardLayout
      breadcrumb={<Breadcrumb items={[{ label: 'Dashboard', href: '/' }]} />}
    >
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Welcome back. Here is an overview of the foundation."
          action={
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Quick Action
            </Button>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Volunteers"
            value="1,284"
            icon={Users}
            trend={{ value: 12.5 }}
            description="from last month"
          />
          <StatCard
            title="Active Events"
            value="23"
            icon={Calendar}
            trend={{ value: 4.1 }}
            description="this quarter"
          />
          <StatCard
            title="Donations"
            value="$48,290"
            icon={Heart}
            trend={{ value: -2.3 }}
            description="from last month"
          />
          <StatCard
            title="Reports Filed"
            value="156"
            icon={FileText}
            trend={{ value: 8.7 }}
            description="this year"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <MetricCard label="New Registrations" value="42" variant="primary" icon={Users} />
          <MetricCard label="Completion Rate" value="94%" variant="success" icon={Calendar} />
          <MetricCard label="Pending Reviews" value="7" variant="warning" icon={FileText} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ContentCard
            title="Recent Activity"
            description="Latest updates across the foundation"
            action={<Button variant="ghost" size="sm">View all</Button>}
          >
            <div className="space-y-3">
              {[
                { name: 'Volunteer Registration', status: 'active' as const, label: 'Active' },
                { name: 'Annual Gala Planning', status: 'pending' as const, label: 'Pending' },
                { name: 'Q3 Report Filing', status: 'success' as const, label: 'Complete' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-[12px] border p-3">
                  <span className="text-sm">{item.name}</span>
                  <StatusBadge status={item.status} label={item.label} />
                </div>
              ))}
            </div>
          </ContentCard>

          <GlassCard>
            <h3 className="text-base font-semibold">Quick Stats</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              At-a-glance metrics with glass morphism styling.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-[12px] bg-background/60 p-3 text-center">
                <p className="text-2xl font-bold">89%</p>
                <p className="text-xs text-muted-foreground">Retention</p>
              </div>
              <div className="rounded-[12px] bg-background/60 p-3 text-center">
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-xs text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <ContentCard title="Upcoming Events">
          <EmptyState
            icon={Calendar}
            title="No upcoming events"
            description="Schedule your next event to see it here."
            action={<Button size="sm"><Plus className="h-4 w-4" />Create Event</Button>}
          />
        </ContentCard>
      </div>
    </DashboardLayout>
  );
}
