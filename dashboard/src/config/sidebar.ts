import {
  LayoutDashboard,
  Users,
  Calendar,
  HandHeart,
  FileText,
  ClipboardList,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Volunteers', href: '/volunteers', icon: Users },
      { label: 'Applications', href: '/applications', icon: ClipboardList },
      { label: 'CSR Opportunities', href: '/opportunities', icon: HandHeart },
      { label: 'Events', href: '/events', icon: Calendar },
      { label: 'Reports', href: '/reports', icon: FileText },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];
