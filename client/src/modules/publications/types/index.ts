export type PublicationCategory =
  | 'Amaruchi'
  | 'Prativayana'
  | 'Annual Reports'
  | 'Souvenirs'
  | 'Commemorative Monograph';

export interface Publication {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category: PublicationCategory;
  coverBg: string;
  coverTextColor: string;
  accentColor: string;
  spineColor: string;
  year: string;
  volume?: string;
  issue?: string;
  pages: number;
  language: string;
  description: string;
  flipbookUrl?: string;
  pdfUrl: string;
  articlesCount?: number;
  authors?: string[];
  tags: string[];
  isFeatured?: boolean;
}

export type ArticleCategory =
  | "Chairman's Messages"
  | 'Editorial Notes'
  | 'Guest Messages'
  | "Governor's Messages"
  | "Chief Minister's Messages"
  | 'Literary Essays'
  | 'Forewords';

export interface EditorialArticle {
  id: string;
  title: string;
  publicationId: string;
  publicationTitle: string;
  category: ArticleCategory;
  author: string;
  year: string;
  readingTime: string;
  preview: string;
  contentPlaceholder?: string;
}

export interface InstitutionalReport {
  id: string;
  title: string;
  category: 'Annual Reports' | 'Governance Reports' | 'Financial Summaries' | 'Institutional Impact';
  year: string;
  summary: string;
  pdfUrl: string;
  pages: number;
}

export interface KnowledgeNode {
  id: string;
  title: string;
  type: 'Publication' | 'Article' | 'Awardee Profile' | 'Timeline Milestone' | 'Leadership Message';
  category: string;
  summary: string;
  targetHash: string;
  relatedItems: { label: string; link: string }[];
}

export interface KnowledgeSearchFilterState {
  keyword: string;
  category: string;
  year: string;
  language: string;
  volume: string;
}
