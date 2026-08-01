export interface MilestoneCard {
  type: 'overview' | 'achievement' | 'legacy';
  title: string;
  subtitle: string;
  description: string;
  metricOrBadge?: string;
  ctaText?: string;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  impactMetric: string;
  cards: [MilestoneCard, MilestoneCard, MilestoneCard];
}

export interface TimelineProps {
  initialSelectedId?: string;
}
