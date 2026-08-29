export interface NavLinkItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface NavCategoryItem {
  label: string;
  href: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  links: NavLinkItem[];
}

export interface HeaderNavItem {
  label: string;
  href: string;
}

export const HEADER_NAV_ITEMS: HeaderNavItem[] = [
  { label: 'Home', href: '/#hero' },
  { label: 'About Us', href: '/about' },
  { label: 'Dumdaar Odia', href: '/damdaar-odia' },
];

export const DIRECTORY_CATEGORIES: NavCategoryItem[] = [
  {
    label: 'Foundation',
    href: '/about',
    bgColor: '#121824',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'About Foundation', href: '/about', ariaLabel: 'About Ruchi Prativa Foundation' },
      { label: 'Our Legacy', href: '/about#foundation-story', ariaLabel: 'Our Legacy' },
      { label: 'Governance', href: '/about#governance', ariaLabel: 'Governance Charter' },
    ],
  },
  {
    label: 'Our Work',
    href: '/work',
    bgColor: '#151C2B',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'CSR Activities', href: '/work', ariaLabel: 'CSR Activities Overview' },
      { label: 'DUMDAAR ODIA', href: '/damdaar-odia', ariaLabel: 'DUMDAAR ODIA Initiative' },
      { label: 'Publications', href: '/publications', ariaLabel: 'Publications & Digital Knowledge Centre' },
    ],
  },
  {
    label: 'Explore',
    href: '/visual-archive',
    bgColor: '#121824',
    textColor: '#FFFFFF',
    borderColor: 'rgba(197, 160, 89, 0.3)',
    links: [
      { label: 'Visual Archive', href: '/visual-archive', ariaLabel: 'Living Visual Archive' },
      { label: 'Get Involved', href: '/get-involved', ariaLabel: 'Get Involved and Volunteer' },
      { label: 'Volunteer Impact', href: '/get-involved/volunteer', ariaLabel: 'Volunteer Impact & Initiatives' },
    ],
  },
];
