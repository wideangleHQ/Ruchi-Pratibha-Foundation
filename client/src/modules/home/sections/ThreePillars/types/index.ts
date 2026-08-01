export interface PillarItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  href: string;
  aspectRatio: string;
}

export interface ThreePillarsProps {
  pillars?: PillarItem[];
}
