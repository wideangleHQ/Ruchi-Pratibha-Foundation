export interface FooterLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}
