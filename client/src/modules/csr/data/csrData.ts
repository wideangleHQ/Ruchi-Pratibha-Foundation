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
    id: 'blood-donation-camp',
    title: 'Mega Blood Donation Camp',
    category: 'Healthcare',
    district: 'Cuttack',
    location: 'Cuttack Central Facility',
    year: 2025,
    dateStr: '2025 • Cuttack',
    summary:
      'Providing voluntary blood donation opportunities while promoting awareness about the importance of regular blood donation and community participation.',
    isFeatured: true,
  },
  {
    id: 'green-odisha-plantation',
    title: 'Green Odisha Plantation Drive',
    category: 'Environment',
    district: 'Khordha',
    location: 'Bhubaneswar & Suburbs',
    year: 2025,
    dateStr: '2025 • Khordha',
    summary:
      'Encouraging environmental sustainability through large-scale plantation drives involving volunteers, students, and local communities.',
    isFeatured: true,
  },
  {
    id: 'student-recognition-programme',
    title: 'Student Recognition Programme',
    category: 'Education',
    district: 'Cuttack',
    location: 'Odisha State Assembly Hall',
    year: 2024,
    dateStr: '2024 • Odisha State',
    summary:
      'Recognising meritorious students and encouraging academic excellence through appreciation certificates, books, and scholarship guidance.',
    isFeatured: true,
  },
  {
    id: 'community-health-camp',
    title: 'Rural Community Health Outreach',
    category: 'Healthcare',
    district: 'Puri',
    location: 'Rural Health Center, Puri District',
    year: 2024,
    dateStr: '2024 • Puri',
    summary:
      'Free medical consultation, diagnostic screening, and preventive medicine distribution for rural families in coastal clusters.',
    isFeatured: true,
  },
  {
    id: 'amaruchi-literary-symposium',
    title: 'Amaruchi Literary Heritage Symposium',
    category: 'Culture',
    district: 'Bhubaneswar',
    location: 'State Library Auditorium',
    year: 2023,
    dateStr: '2023 • Bhubaneswar',
    summary:
      'Celebrating Odia literature, essays, and regional scholarly archives published under the Amaruchi journal mandate.',
    isFeatured: true,
  },
  {
    id: 'youth-civic-leadership-workshop',
    title: 'Youth Civic Leadership Workshop',
    category: 'Youth Engagement',
    district: 'Khordha',
    location: 'Khordha Community Center',
    year: 2023,
    dateStr: '2023 • Khordha',
    summary:
      'Training young volunteers in emergency community response, eco-stewardship, and grassroots social organisation.',
    isFeatured: true,
  },
];

export const IMPACT_STORIES: CSRStory[] = [
  {
    id: 'story-student',
    title: 'Inspiring Academic Excellence in Young Minds',
    category: 'Education',
    role: 'Student',
    quote:
      'Receiving recognition from Ruchi Prativa Foundation gave me the confidence to pursue higher education with purpose and dedication.',
    storyPreview:
      'Through our annual academic recognition drives, high-performing students from modest backgrounds receive appreciation certificates, reference books, and mentorship encouragement.',
    personName: 'Meritorious Youth Achiever',
    location: 'Cuttack District',
  },
  {
    id: 'story-healthcare',
    title: 'Bringing Essential Care to Rural Clusters',
    category: 'Healthcare',
    role: 'Healthcare',
    quote:
      'The voluntary blood donation drive organised by the Foundation helped replenish critical blood bank supplies for regional emergency units.',
    storyPreview:
      'Working alongside medical teams and youth volunteers, our blood donation and preventive health camps ensure timely support for emergency patients.',
    personName: 'Volunteer Blood Donor',
    location: 'Central Red Cross Center, Cuttack',
  },
  {
    id: 'story-environment',
    title: 'Nurturing Green Canopies Across Odisha',
    category: 'Environment',
    role: 'Environment',
    quote:
      'Planting trees today ensures clean air, soil preservation, and a cooler habitat for our children tomorrow.',
    storyPreview:
      'Local communities, student volunteers, and municipal teams join hands during monsoon sapling drives to restore biodiversity across urban and rural belts.',
    personName: 'Eco-Volunteer Lead',
    location: 'Khordha Belt',
  },
  {
    id: 'story-community',
    title: 'Serving Communities During Crises',
    category: 'Community Welfare',
    role: 'Community',
    quote:
      'When relief materials and warm meals reached our village during monsoon flooding, it restored our hope and dignity.',
    storyPreview:
      'During regional natural distress, Foundation trustees and local volunteers coordinate immediate food, water, and essential welfare distribution.',
    personName: 'Community Representative',
    location: 'Coastal Odisha Cluster',
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
    id: 'gal-1',
    category: 'Healthcare' as CSRCategory,
    title: 'Voluntary Blood Donation Camp',
    location: 'Cuttack',
    caption: 'Volunteers and medical staff participating in annual blood donation drive.',
  },
  {
    id: 'gal-2',
    category: 'Environment' as CSRCategory,
    title: 'Green Odisha Tree Sapling Drive',
    location: 'Khordha',
    caption: 'Planting native saplings along educational campus corridors.',
  },
  {
    id: 'gal-3',
    category: 'Education' as CSRCategory,
    title: 'Student Merit Felicitations',
    location: 'Odisha State',
    caption: 'Awarding academic excellence certificates and book awards to meritorious students.',
  },
  {
    id: 'gal-4',
    category: 'Culture' as CSRCategory,
    title: 'Amaruchi Literary Gathering',
    location: 'Bhubaneswar',
    caption: 'Authors, scholars, and editors gathered for regional Odia literature discussion.',
  },
  {
    id: 'gal-5',
    category: 'Community Welfare' as CSRCategory,
    title: 'Community Welfare Distribution',
    location: 'Puri District',
    caption: 'Distributing relief kits and nutrition packs in rural clusters.',
  },
  {
    id: 'gal-6',
    category: 'Youth Engagement' as CSRCategory,
    title: 'Youth Volunteer Orientation',
    location: 'Cuttack',
    caption: 'Empowering young citizens for civic awareness and environmental stewardship.',
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
