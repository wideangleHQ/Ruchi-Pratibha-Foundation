export type CSRCategory =
  | 'Education'
  | 'Healthcare'
  | 'Environment'
  | 'Community Welfare'
  | 'Culture'
  | 'Youth Engagement';

export interface CSRActivity {
  id: string;
  title: string;
  category: CSRCategory;
  district: string;
  location: string;
  year: number;
  dateStr: string;
  summary: string;
  description?: string;
  coverImage?: string;
  isFeatured?: boolean;
  possibleActivities?: string[];
  objectives?: string[];
  partners?: string[];
}

export interface CSRStory {
  id: string;
  title: string;
  category: CSRCategory;
  quote: string;
  storyPreview: string;
  fullStory?: string;
  role: 'Volunteer' | 'Student' | 'Community' | 'Healthcare' | 'Environment';
  personName?: string;
  location?: string;
  imagePlaceholder?: string;
}

export interface CSRPartnerCategory {
  title: string;
  tag: string;
  description: string;
  examples: string[];
}

export interface CSRReport {
  id: string;
  title: string;
  category: 'Annual CSR Reports' | 'Event Reports' | 'Activity Brochures' | 'Media Coverage';
  year: string;
  summary: string;
  filename: string;
}

export interface CSRFilterState {
  category: string;
  year: string;
  district: string;
  search: string;
}
