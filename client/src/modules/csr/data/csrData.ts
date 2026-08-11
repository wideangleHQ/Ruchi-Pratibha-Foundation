import {
  CSRCategory,
  CSRActivity,
  CSRStory,
  CSRPartnerCategory,
  CSRReport,
} from '../types';

export const FOCUS_AREAS = [
  {
    id: 'education',
    title: 'Education & Student Development',
    tagline: 'Empowering Future Generations',
    category: 'Education' as CSRCategory,
    iconName: 'GraduationCap',
    intro:
      'Supporting education through student recognition, educational awareness programmes, learning resources, academic encouragement, and initiatives that inspire future generations.',
    objectives: [
      'Encourage academic brilliance among school & college youth across Odisha.',
      'Reduce financial barriers through structured merit recognition and guidance.',
      'Promote career awareness, digital literacy, and value-oriented learning.',
    ],
    possibleActivities: [
      'Student Recognition Programmes',
      'Scholarship Support',
      'Educational Workshops',
      'Career Guidance',
      'School Outreach',
      'Digital Learning Initiatives',
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Wellness',
    tagline: 'Serving Communities with Care',
    category: 'Healthcare' as CSRCategory,
    iconName: 'HeartPulse',
    intro:
      'Promoting accessible healthcare through awareness campaigns, medical outreach, preventive healthcare initiatives, and community wellness programmes.',
    objectives: [
      'Facilitate free preventive health check-ups and diagnostic screening in rural clusters.',
      'Organise voluntary blood donation drives in partnership with major hospitals.',
      'Spread awareness regarding hygiene, nutrition, and preventive wellness.',
    ],
    possibleActivities: [
      'Health Camps',
      'Eye Check-up Camps',
      'Blood Donation Drives',
      'Health Awareness Programmes',
      'Medical Assistance',
      'Wellness Campaigns',
    ],
  },
  {
    id: 'environment',
    title: 'Environment & Sustainability',
    tagline: 'Protecting Nature Together',
    category: 'Environment' as CSRCategory,
    iconName: 'Trees',
    intro:
      'Encouraging environmental responsibility through plantation drives, awareness campaigns, biodiversity conservation, and sustainable community practices.',
    objectives: [
      'Expand green canopy across urban and rural districts of Odisha.',
      'Promote water conservation, plastic-free living, and community cleanliness.',
      'Engage youth and local bodies in eco-stewardship initiatives.',
    ],
    possibleActivities: [
      'Tree Plantation',
      'Environmental Awareness',
      'Cleanliness Drives',
      'Water Conservation',
      'Plastic-Free Campaigns',
      'Green Community Initiatives',
    ],
  },
  {
    id: 'welfare',
    title: 'Community Welfare',
    tagline: 'Strengthening Communities',
    category: 'Community Welfare' as CSRCategory,
    iconName: 'HandHeart',
    intro:
      'Supporting communities through social initiatives that improve quality of life and encourage inclusive development.',
    objectives: [
      'Provide relief and nutritional support during humanitarian crises or distress.',
      'Assist underprivileged rural communities with basic social development support.',
      'Foster inclusive community dialogues and grassroots empowerment.',
    ],
    possibleActivities: [
      'Community Outreach',
      'Food Distribution',
      'Rural Development',
      'Social Awareness Campaigns',
      'Community Support Programmes',
    ],
  },
  {
    id: 'culture',
    title: 'Culture & Heritage',
    tagline: "Preserving Odisha's Legacy",
    category: 'Culture' as CSRCategory,
    iconName: 'Palette',
    intro:
      "Preserving Odisha's rich cultural identity through programmes that celebrate literature, arts, traditions, and regional heritage.",
    objectives: [
      'Publish and distribute regional literary journals Amaruchi & Prativayana.',
      'Honour veteran scholars, authors, and traditional Odia artisans.',
      'Preserve regional art forms, folklore, and historical narratives.',
    ],
    possibleActivities: [
      'Cultural Programmes',
      'Heritage Conservation',
      'Literary Events',
      'Traditional Art Promotion',
      'Community Celebrations',
    ],
  },
  {
    id: 'youth',
    title: 'Youth & Volunteer Engagement',
    tagline: 'Inspiring Future Leaders',
    category: 'Youth Engagement' as CSRCategory,
    iconName: 'Users',
    intro:
      'Empowering young individuals to participate in meaningful social service while developing leadership, responsibility, and community values.',
    objectives: [
      'Mobilise youth volunteers for civic engagement and grassroots social work.',
      'Nurture ethical leadership, empathy, and social responsibility.',
      'Build a strong network of community changemakers across Odisha.',
    ],
    possibleActivities: [
      'Volunteer Programmes',
      'Youth Leadership',
      'Community Participation',
      'Social Awareness',
      'Civic Engagement',
    ],
  },
];

export const FEATURED_CSR_ACTIVITIES: CSRActivity[] = [
  {
    id: 'odia-bazar',
    title: 'Odia Bazar Community Welfare Initiative',
    category: 'Community Welfare',
    district: 'Cuttack',
    location: 'Odia Bazar, Cuttack',
    year: 2026,
    dateStr: '2026 • Cuttack',
    summary:
      'Empowering local communities in Cuttack through direct outreach, educational resources, and seasonal social support drives.',
    isFeatured: true,
    coverImage: '/Odia Bazar/DSC05968.JPG',
    objectives: [
      'Provide immediate social welfare and seasonal support to underprivileged families.',
      'Mobilize local youth volunteer networks for grassroots community service.',
      'Strengthen regional socio-economic resilience through direct resource sharing.'
    ],
    possibleActivities: [
      'Community Outreach',
      'Resource Distribution',
      'Youth Volunteering',
      'Socio-economic Support'
    ],
  },
  {
    id: 'sutahat',
    title: 'Sutahat Health & Wellness Outreach',
    category: 'Healthcare',
    district: 'Cuttack',
    location: 'Sutahat, Cuttack',
    year: 2025,
    dateStr: '2025 • Cuttack',
    summary:
      'Organizing free medical consultation camps, diagnostic check-ups, and wellness workshops for families in Sutahat.',
    isFeatured: true,
    coverImage: '/Sutahat/DSC05409.JPG',
    objectives: [
      'Deliver free diagnostic testing and professional health consultations.',
      'Raise awareness for child wellness, preventive care, and healthy nutrition.',
      'Facilitate voluntary blood donation drives in partnership with Cuttack health departments.'
    ],
    possibleActivities: [
      'Health Camp',
      'Medical Consultation',
      'Nutrition Distribution',
      'Blood Donation Camp'
    ],
  },
];

export const IMPACT_STORIES: CSRStory[] = [
  {
    id: 'story-odia-bazar',
    title: 'Mobilizing Grassroots Hope at Odia Bazar',
    category: 'Community Welfare',
    role: 'Community',
    quote:
      'When the Ruchi Prativa Foundation youth volunteers reached our neighborhood with supplies, it showed us the power of community solidarity.',
    storyPreview:
      'Through local resource distribution and youth volunteer drives, our Odia Bazar initiative has supported dozens of families with essential materials and social encouragement.',
    personName: 'Local Community Lead',
    location: 'Odia Bazar, Cuttack',
    imagePlaceholder: '/Odia Bazar/DSC05990.JPG',
  },
  {
    id: 'story-sutahat',
    title: 'Access to Essential Care at Sutahat',
    category: 'Healthcare',
    role: 'Healthcare',
    quote:
      'The healthcare drive at Sutahat brought professional medical consultation and diagnostic check-ups right to our doorstep.',
    storyPreview:
      'Our voluntary doctor teams and health coordinators worked in unison at Sutahat to provide diagnostic screenings, child wellness kits, and health education workshops.',
    personName: 'Health Camp Beneficiary',
    location: 'Sutahat, Cuttack',
    imagePlaceholder: '/Sutahat/DSC05413.JPG',
  },
];

export const PARTNER_CATEGORIES: CSRPartnerCategory[] = [
  {
    title: 'Educational Institutions',
    tag: 'SCHOOLS & COLLEGES',
    description:
      'Collaborating with regional schools, universities, and academic bodies to conduct merit awards and learning workshops.',
    examples: ['State Government Schools', 'District Education Offices', 'Regional Colleges'],
  },
  {
    title: 'Healthcare Organizations',
    tag: 'HOSPITALS & BLOOD BANKS',
    description:
      'Partnering with certified blood banks, medical associations, and doctors for health camps and donor drives.',
    examples: ['Red Cross Blood Center', 'Regional Government Hospitals', 'Eye Care Institutes'],
  },
  {
    title: 'Corporate & CSR Partners',
    tag: 'INDUSTRY COLLABORATORS',
    description:
      'Working alongside responsible corporate entities to channel corporate social responsibility resources effectively.',
    examples: ['Industrial Units in Odisha', 'CSR Trusts', 'Local Business Enterprises'],
  },
  {
    title: 'NGOs & Civil Society',
    tag: 'GRASSROOTS NETWORKS',
    description:
      'Joining hands with registered public trusts and non-profit welfare groups for community mobilization.',
    examples: ['Local Welfare Societies', 'Cultural Academies', 'Rural Development Groups'],
  },
  {
    title: 'Youth & Volunteers',
    tag: 'COMMUNITY CHANGEMAKERS',
    description:
      'Empowering university students, civic leaders, and passionate citizens to execute ground-level activities.',
    examples: ['NSS & NCC Volunteers', 'Student Clubs', 'District Volunteer Corps'],
  },
  {
    title: 'Local Communities',
    tag: 'GRASSROOTS PARTICIPATION',
    description:
      'Engaging village councils, panchayats, and neighborhood committees to identify real local needs.',
    examples: ['Gram Panchayats', 'Resident Associations', 'Women Self-Help Groups'],
  },
];

export const CSR_GALLERY_ITEMS = [
  {
    id: 'gal-odia-1',
    category: 'Community Welfare' as CSRCategory,
    title: 'Odia Bazar Direct Outreach',
    location: 'Odia Bazar, Cuttack',
    caption: 'Volunteers distributing essential packages and welfare kits to local families.',
    imageUrl: '/Odia Bazar/DSC05968.JPG',
  },
  {
    id: 'gal-odia-2',
    category: 'Community Welfare' as CSRCategory,
    title: 'Odia Bazar Youth Volunteer Mobilization',
    location: 'Odia Bazar, Cuttack',
    caption: 'Local youth volunteers participating in community support campaigns.',
    imageUrl: '/Odia Bazar/DSC05990.JPG',
  },
  {
    id: 'gal-odia-3',
    category: 'Community Welfare' as CSRCategory,
    title: 'Odia Bazar Resource Sharing',
    location: 'Odia Bazar, Cuttack',
    caption: 'Resource distribution camp organized by Ruchi Prativa Foundation.',
    imageUrl: '/Odia Bazar/DSC06000.JPG',
  },
  {
    id: 'gal-sutahat-1',
    category: 'Healthcare' as CSRCategory,
    title: 'Sutahat Medical Consultation',
    location: 'Sutahat, Cuttack',
    caption: 'Doctors conducting diagnostic screening and checkups at the free health camp.',
    imageUrl: '/Sutahat/DSC05409.JPG',
  },
  {
    id: 'gal-sutahat-2',
    category: 'Healthcare' as CSRCategory,
    title: 'Sutahat Health Check-up Camp',
    location: 'Sutahat, Cuttack',
    caption: 'Providing medical checkups and child health consultations to rural families.',
    imageUrl: '/Sutahat/DSC05413.JPG',
  },
  {
    id: 'gal-sutahat-3',
    category: 'Healthcare' as CSRCategory,
    title: 'Sutahat Wellness Outreach',
    location: 'Sutahat, Cuttack',
    caption: 'Volunteer healthcare workers distributing wellness supplies and medicine.',
    imageUrl: '/Sutahat/DSC05416.JPG',
  },
];

export const CSR_REPORTS: CSRReport[] = [
  {
    id: 'rep-1',
    title: 'Annual CSR & Public Welfare Report',
    category: 'Annual CSR Reports',
    year: '2024-2025',
    summary:
      'Comprehensive public summary of community welfare programs, health camps, and student recognition drives executed across Odisha.',
    filename: 'RPF_CSR_Annual_Report_2024-25.pdf',
  },
  {
    id: 'rep-2',
    title: 'Mega Blood Donation Drive Summary',
    category: 'Event Reports',
    year: '2025',
    summary:
      'Event documentation and donor statistics for the Cuttack voluntary blood donation drive.',
    filename: 'RPF_Blood_Donation_Report_2025.pdf',
  },
  {
    id: 'rep-3',
    title: 'Green Odisha Plantation Campaign Brochure',
    category: 'Activity Brochures',
    year: '2025',
    summary:
      'Informational guidelines and tree species selection guide for community plantation drives.',
    filename: 'RPF_Green_Odisha_Brochure.pdf',
  },
  {
    id: 'rep-4',
    title: 'Community Impact Media Archives',
    category: 'Media Coverage',
    year: '2024-2025',
    summary:
      'Published press clippings and public announcements documenting Ruchi Prativa Foundation community initiatives.',
    filename: 'RPF_Media_Coverage_Archive.pdf',
  },
];
