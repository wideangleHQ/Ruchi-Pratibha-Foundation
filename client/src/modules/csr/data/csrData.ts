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
    id: 'covid-precaution',
    title: 'COVID Precaution & Community Safety Drive',
    category: 'Healthcare',
    district: 'Khordha',
    location: 'Bhubaneswar & Rural Odisha',
    year: 2021,
    dateStr: '2021 • Odisha',
    summary:
      'Community-focused precaution and awareness efforts during the COVID period.',
    isFeatured: true,
    coverImage: '/CSR Activites/Covid Precaution Shooting/DSC_1154.JPG',
    objectives: [
      'Conduct community safety and hygiene awareness drives across rural and semi-urban clusters.',
      'Distribute preventive care materials and safety guidelines to vulnerable households.',
      'Support local health workers with essential protective kits and safety information.'
    ],
    possibleActivities: [
      'Hygiene Awareness',
      'Community Safety Drives',
      'Health Guidance',
      'Preventive Support'
    ],
  },
  {
    id: 'bajpur-corona-warriors',
    title: 'Salute to Corona Warriors — Bajpur',
    category: 'Community Welfare',
    district: 'Jajpur',
    location: 'Bajpur, Jajpur',
    year: 2021,
    dateStr: '2021 • Bajpur',
    summary:
      'Salute and appreciation for frontline Corona warriors in Bajpur.',
    isFeatured: true,
    coverImage: '/CSR Activites/Jajpur salute to corona warrior/DSC_0874.JPG',
    objectives: [
      'Honor and express solidarity with frontline healthcare staff, sanitation workers, and volunteers.',
      'Provide encouragement, nutrition, and welfare support to pandemic first-responders.',
      'Strengthen grassroots community volunteer networks in Bajpur.'
    ],
    possibleActivities: [
      'Warrior Felicitations',
      'Frontline Support',
      'Community Solidarity',
      'Volunteer Mobilization'
    ],
  },
  {
    id: 'dhenkanal-corona-warriors',
    title: 'Salute to Corona Warriors — Dhenkanal',
    category: 'Community Welfare',
    district: 'Dhenkanal',
    location: 'Dhenkanal District',
    year: 2021,
    dateStr: '2021 • Dhenkanal',
    summary:
      'Salute and appreciation for Corona warriors in Dhenkanal.',
    isFeatured: true,
    coverImage: '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3162.JPG',
    objectives: [
      'Acknowledge the selfless service of healthcare teams and emergency civic personnel in Dhenkanal.',
      'Distribute safety essentials and health supplements to frontline workers.',
      'Promote public gratitude and civic responsibility during community health crises.'
    ],
    possibleActivities: [
      'Civic Felicitations',
      'Resource Support',
      'Community Awareness',
      'Frontline Outreach'
    ],
  },
  {
    id: 'our-work-csr',
    title: 'Foundation Community & CSR Portfolio',
    category: 'Community Welfare',
    district: 'Cuttack',
    location: 'Across Odisha',
    year: 2024,
    dateStr: '2024 • Across Odisha',
    summary:
      'A visual collection of the Foundation\'s community and CSR initiatives.',
    isFeatured: true,
    objectives: [
      'Empower students and youth through educational awareness and merit recognition drives.',
      'Promote sustainable environmental stewardship and rural community welfare programs.',
      'Build long-term partnerships with grassroots organizations across Odisha.'
    ],
    possibleActivities: [
      'Student Recognition',
      'Environmental Drives',
      'Community Outreach',
      'Grassroots Development'
    ],
  },
];

export const IMPACT_STORIES: CSRStory[] = [
  {
    id: 'story-covid-precaution',
    title: 'Spreading Lifesaving Awareness & Safety',
    category: 'Healthcare',
    role: 'Healthcare',
    quote:
      'During critical moments, prompt distribution of safety awareness materials and health kits gave families assurance and essential guidance.',
    storyPreview:
      'Our team organized localized precaution awareness campaigns and distributed safety kits to ensure community preparedness across regional clusters.',
    personName: 'Community Health Coordinator',
    location: 'Bhubaneswar & Rural Odisha',
  },
  {
    id: 'story-corona-warriors',
    title: 'Honoring Frontline Heroes Across Districts',
    category: 'Community Welfare',
    role: 'Volunteer',
    quote:
      'Standing together with frontline workers in Bajpur and Dhenkanal reminded us that community strength lies in recognizing selfless service.',
    storyPreview:
      'Through our Corona Warriors appreciation initiatives, Ruchi Prativa Foundation honored hundreds of frontline heroes across Bajpur and Dhenkanal.',
    personName: 'Foundation Volunteer Lead',
    location: 'Bajpur & Dhenkanal',
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
    id: 'gal-covid-1',
    category: 'Healthcare' as CSRCategory,
    title: 'Covid Precaution Shooting',
    location: 'Covid Precaution Shooting',
    caption: 'Covid Precaution Shooting',
    imageUrl: '/CSR/Covid Precaution Shooting/DSC_1187.JPG',
  },
  {
    id: 'gal-bajpur-1',
    category: 'Community Welfare' as CSRCategory,
    title: 'Jajpur salute to corona warrior',
    location: 'Jajpur salute to corona warrior',
    caption: 'Jajpur salute to corona warrior',
    imageUrl: '/CSR/Jajpur salute to corona warrior/DSC_0889.JPG',
  },
  {
    id: 'gal-dhenkanal-1',
    category: 'Community Welfare' as CSRCategory,
    title: 'Salute to corona warrioir Dhenkanal',
    location: 'Salute to corona warrioir Dhenkanal',
    caption: 'Salute to corona warrioir Dhenkanal',
    imageUrl: '/CSR/Salute to corona warrioir Dhenkanal/DSC_3201.JPG',
  },
  {
    id: 'gal-csr-odia-1',
    category: 'Community Welfare' as CSRCategory,
    title: 'Odia Bazar',
    location: 'Odia Bazar',
    caption: 'Odia Bazar',
    imageUrl: '/CSR/Odia Bazar/DSC05968.JPG',
  },
  {
    id: 'gal-csr-sutahat-1',
    category: 'Healthcare' as CSRCategory,
    title: 'Sutahat',
    location: 'Sutahat',
    caption: 'Sutahat',
    imageUrl: '/CSR/Sutahat/DSC05409.JPG',
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
