

export interface DomainItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  focus: string;
  colorClass: string;
  colorHex: string;
  hoverBgClass: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  whoCanParticipate: string[];
  stagesInfo: string[];
  rules: string[];
}

export const DAMDAAR_DOMAINS: DomainItem[] = [
  {
    id: 'art-culture',
    slug: 'art-culture',
    title: 'Art & Culture',
    tagline: 'Preserving Heritage, Inspiring Expression.',
    focus: 'Creativity + Heritage',
    colorClass: 'text-damdaar-freshGreen border-damdaar-freshGreen',
    colorHex: '#4D6B1F',
    hoverBgClass: 'hover:bg-damdaar-freshGreen/5',
    iconName: 'Palette',
    shortDescription: 'Dedicated to traditional crafts, performance arts, fine arts, classical dance, folklore, and literature that celebrate the soul of Odisha.',
    fullDescription: 'Odisha holds an ancestral legacy of art forms that have crossed centuries. The Art & Culture domain of DUMDAAR ODIA provides a stage for traditional artists, contemporary painters, writers, weavers, classical dancers, and folk performers to showcase their craftsmanship and express the state\'s timeless cultural narrative to a global audience.',
    whoCanParticipate: [
      'Classical & folk dancers (individual or troupes)',
      'Traditional handicraftsmen, painters, and sculptors',
      'Odia writers, poets, and cultural historians',
      'Contemporary artists fusing modern styles with heritage themes'
    ],
    stagesInfo: [
      'Portfolio & video submission of past or proposed work',
      'Regional live showcasing and interaction with cultural exponents',
      'Grand finale exhibition and presentation of excellence awards'
    ],
    rules: [
      'Submissions must reflect traditional Odia heritage or authentic creative synthesis.',
      'Group performances must register under a lead coordinator.',
      'All physical artworks must be original and cataloged with high-resolution photographs.'
    ]
  },
  {
    id: 'technology',
    slug: 'technology',
    title: 'Technology',
    tagline: 'Fostering Innovation, Shaping Tomorrow.',
    focus: 'Innovation + Progress',
    colorClass: 'text-damdaar-deepGreen border-damdaar-deepGreen',
    colorHex: '#343D0F',
    hoverBgClass: 'hover:bg-damdaar-deepGreen/5',
    iconName: 'Cpu',
    shortDescription: 'A platform for technological innovations, software applications, hardware prototypes, green tech, and developmental ideas.',
    fullDescription: 'The next chapter of Odisha is written in code, silicon, and sustainable design. The Technology domain empowers tech visionaries, engineers, and digital creators who are building solutions for local challenge areas, civic improvements, agricultural progress, and state-of-the-art software systems.',
    whoCanParticipate: [
      'Software developers, student coders, and UI/UX designers',
      'Hardware builders, IoT practitioners, and roboticists',
      'Agri-tech, green-tech, and health-tech solution creators',
      'Research teams and technology enthusiasts from academic institutions'
    ],
    stagesInfo: [
      'Problem statement pitch and dynamic system prototype submission',
      'Interactive virtual sandbox testing and code walkthrough with the tech jury',
      'Live Hackathon and final project demonstration before leading industry CTOs'
    ],
    rules: [
      'Open-source or proprietary software prototypes must be functional.',
      'Team size is limited to 4 members max.',
      'All source repositories must be made accessible to the validation panel.'
    ]
  },
  {
    id: 'entrepreneurship',
    slug: 'entrepreneurship',
    title: 'Entrepreneurship',
    tagline: 'Leading Ventures, Generating Impact.',
    focus: 'Leadership + Growth',
    colorClass: 'text-damdaar-warmOrange border-damdaar-warmOrange',
    colorHex: '#D55E33',
    hoverBgClass: 'hover:bg-damdaar-warmOrange/5',
    iconName: 'Landmark',
    shortDescription: 'Supporting startup models, scalable social ventures, grassroots entrepreneurship, and visionary business designs.',
    fullDescription: 'Unlocking potential requires leadership, scalability, and economic value creation. The Entrepreneurship domain is tailored for founders, social enterprise builders, and micro-entrepreneurs who are creating high-impact businesses that generate employment and empower local supply chains across Odisha.',
    whoCanParticipate: [
      'Early-stage startup founders and co-founders',
      'Social entrepreneurs building rural development models',
      'Handloom and handicraft micro-business scaling teams',
      'Students with validated business plans and MVP validation'
    ],
    stagesInfo: [
      'Business model canvas submission and market validation pitch deck',
      'One-on-one mentorship sessions and financial viability stress test',
      'Shark-tank style final investor pitch before corporate leaders and VCs'
    ],
    rules: [
      'The startup must be registered or propose incorporation in Odisha.',
      'Must demonstrate scalability or a clear path to social sustainability.',
      'Financial projections and customer metrics must be verified.'
    ]
  },
  {
    id: 'culinary-excellence',
    slug: 'culinary-excellence',
    title: 'Culinary Excellence',
    tagline: 'Reviving Flavours, Celebrating Taste.',
    focus: 'Passion + Hospitality',
    colorClass: 'text-damdaar-burntOrange border-damdaar-burntOrange',
    colorHex: '#B1320A',
    hoverBgClass: 'hover:bg-damdaar-burntOrange/5',
    iconName: 'Utensils',
    shortDescription: 'Honouring Odia home cooks, professional chefs, traditional recipe preservationists, and modern culinary innovators.',
    fullDescription: 'The heritage of Odisha is deeply embedded in its temple kitchens, coastal recipes, and forest ingredients. The Culinary Excellence domain celebrates cooks and recipe conservators who are reviving ancient Odia delicacies, innovating contemporary culinary methods, and promoting traditional nutritional wisdom.',
    whoCanParticipate: [
      'Home cooks and culinary traditionalists keeping ancient family recipes alive',
      'Professional chefs showcasing fusion Odia gastronomy',
      'Culinary bloggers and recipe documentalists',
      'Sweets, bakery, and beverage innovators using regional grains and ingredients'
    ],
    stagesInfo: [
      'Recipe documentation submission with high-quality media showcase',
      'Regional cook-off rounds under standard kitchen guidelines',
      'Live Masterclass cook-off and plating test before national culinary experts'
    ],
    rules: [
      'Dishes must incorporate traditional ingredients, millets, or classic Odia techniques.',
      'Strict adherence to culinary safety and kitchen hygiene during live cook-offs.',
      'Commercial chefs and home cooks will be evaluated under separate categories.'
    ]
  }
];

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  status: 'past' | 'current' | 'future';
}

export const DAMDAAR_TIMELINE: TimelineEvent[] = [
  {
    id: 't-1',
    title: 'DUMDAAR ODIA CAMPAIGN LAUNCH',
    date: '17 August 2026',
    description: 'Official launch of the Dumdaar Odia campaign and the beginning of the Project NIRMAN and Kitchen Queen journey.',
    status: 'current'
  },
  {
    id: 't-2',
    title: 'APPLICATION & REGISTRATION PERIOD',
    date: '17–27 August 2026',
    description: 'Project NIRMAN applications circulate across colleges and digital channels while participants begin their submissions.',
    status: 'future'
  },
  {
    id: 't-3',
    title: 'PROJECT NIRMAN APPLICATION CLOSING',
    date: '27 August 2026',
    description: 'Project NIRMAN applications close with the campaign targeting up to 150 applications.',
    status: 'future'
  },
  {
    id: 't-4',
    title: 'SCREENING & EVALUATION',
    date: '28–29 August 2026',
    description: 'Submitted Project NIRMAN applications undergo internal screening and evaluation.',
    status: 'future'
  },
  {
    id: 't-5',
    title: 'PROJECT NIRMAN WINNER & KITCHEN QUEEN DEADLINE',
    date: '30 August 2026',
    description: 'The Project NIRMAN winner is announced, while Global Odia Kitchen Queen entries close at 11:59 PM.',
    status: 'future'
  },
  {
    id: 't-6',
    title: 'RUCHI PRATIVA SAMMAN SAMAROH',
    date: '12 September 2026',
    description: 'Winners and recognised talent are felicitated at the Ruchi Prativa Samman Samaroh at Saheed Bhawan, Cuttack.',
    status: 'future'
  }
];
