import { Publication, EditorialArticle, InstitutionalReport, KnowledgeNode } from '../types';

export const FEATURED_PUBLICATIONS: Publication[] = [];

export const EDITORIAL_ARTICLES: EditorialArticle[] = [];

export const INSTITUTIONAL_REPORTS: InstitutionalReport[] = [];

export const KNOWLEDGE_NODES: KnowledgeNode[] = [
  {
    id: 'kn-1',
    title: 'Amaruchi Literary Archive',
    type: 'Publication',
    category: 'Literary Journal',
    summary: 'Connects to 42 published essays, 15 guest editorial forewords, and historical Odia literary collections.',
    targetHash: '#collection',
    relatedItems: [
      { label: 'Prativayana Gazette', link: '#collection' },
      { label: 'Chairman Message', link: '#editorial' },
      { label: 'Awardee Archive', link: '/about#leadership' },
    ],
  },
  {
    id: 'kn-2',
    title: 'Prativayana Commemorative Volume',
    type: 'Publication',
    category: 'Institutional Record',
    summary: 'Directly linked with the 1997-2025 Foundation Timeline, Founder reflections, and Silver Jubilee award archives.',
    targetHash: '#featured-publications',
    relatedItems: [
      { label: 'Publication Timeline', link: '#publication-timeline' },
      { label: 'Annual Reports', link: '#reports' },
      { label: 'Founder Story', link: '/about#foundation-story' },
    ],
  },
  {
    id: 'kn-3',
    title: 'Shri Sarat Kumar Sahoo Essays',
    type: 'Leadership Message',
    category: 'Founding Vision',
    summary: 'Key addresses delivered at annual Ruchi Prativa Puraskar ceremonies detailing social reform and youth empowerment.',
    targetHash: '#editorial',
    relatedItems: [
      { label: 'Editorial Notes', link: '#editorial' },
      { label: 'CSR Activities', link: '/work' },
      { label: 'About Foundation', link: '/about' },
    ],
  },
];
