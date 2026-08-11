export interface ArchivePhoto {
  id: string;
  title: string;
  year: number;
  location: string;
  category: string;
  caption: string;
  description: string;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide';
  peopleTagged?: string[];
  relatedAwardee?: string;
  relatedPublication?: string;
  relatedEventId?: string;
  downloadUrl?: string;
  imageUrl?: string;
}

export interface ArchiveCollection {
  id: string;
  title: string;
  category: string;
  count: number;
  description: string;
  coverImagePlaceholder: string;
  accentColor: string;
  featuredYears: string;
  tags: string[];
}

export interface EventArchiveFolder {
  id: string;
  year: number;
  title: string;
  subtitle: string;
  ceremonyName: string;
  location: string;
  distinguishedGuests: string[];
  honoreesCount: number;
  summary: string;
  keyMoments: string[];
  photosCount: number;
  videosCount: number;
  publicationsReleased: string[];
  mediaCoverageCount: number;
}

export interface DocumentaryItem {
  id: string;
  title: string;
  category: 'Foundation' | 'Award Ceremonies' | 'Community Stories' | 'Healthcare' | 'Education' | 'Publications';
  duration: string;
  year: number;
  directorNote: string;
  summary: string;
  videoUrlPlaceholder: string;
  thumbnailPlaceholder: string;
  tags: string[];
}

export interface HistoricalMoment {
  id: string;
  year: number;
  dateStr: string;
  title: string;
  milestoneType: string;
  summary: string;
  fullStory: string;
  impactNote: string;
  relatedPublication?: string;
  relatedAwardee?: string;
}

export interface MediaClipping {
  id: string;
  publicationName: string;
  headline: string;
  dateStr: string;
  edition: string;
  previewSnippet: string;
  articleSummary: string;
  language: 'Odia' | 'English';
}

export interface MemorySubmission {
  id: string;
  name: string;
  role: 'Past Volunteer' | 'Awardee' | 'Guest' | 'Family' | 'Partner' | 'Citizen';
  yearOfAssociation: string;
  location: string;
  memoryStory: string;
  hasPhoto: boolean;
  status: 'Moderated' | 'Pending';
}

export interface DistrictMemory {
  districtId: string;
  districtName: string;
  activitiesCount: number;
  photosCount: number;
  eventsCount: number;
  videosCount: number;
  highlightStory: string;
  initiatives: string[];
}

export interface MediaResource {
  id: string;
  title: string;
  category: 'Press Kit' | 'Logos & Brand' | 'Brand Assets' | 'B-Roll & Photos' | 'Media Release';
  fileFormat: string;
  fileSize: string;
  description: string;
  downloadUrlPlaceholder: string;
}

export interface SearchQueryResult {
  id: string;
  type: 'Photo' | 'Awardee' | 'Publication' | 'Event' | 'Documentary' | 'Article' | 'Memory';
  title: string;
  year: number | string;
  category: string;
  snippet: string;
  targetHash: string;
}
