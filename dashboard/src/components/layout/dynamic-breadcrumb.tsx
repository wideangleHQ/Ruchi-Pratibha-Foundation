'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumb } from '@/components/dashboard/breadcrumb';

function generateBreadcrumbs(pathname: string) {
  const paths = pathname.split('/').filter(Boolean);
  
  if (paths.length === 0) {
    return [{ label: 'Dashboard', href: '/' }];
  }

  const items: { label: string; href?: string }[] = [{ label: 'Dashboard', href: '/' }];
  
  let currentPath = '';
  
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    currentPath += `/${path}`;
    
    let label = path.charAt(0).toUpperCase() + path.slice(1);
    
    if (path === 'csr-opportunities' || path === 'opportunities') label = 'Opportunities';
    if (path === 'create') label = 'Create';
    if (path === 'edit') label = 'Edit';
    if (path === 'archived') label = 'Archived';
    if (path.length > 20) label = 'Detail'; 
    
    const isLast = i === paths.length - 1;
    
    items.push({
      label,
      href: isLast ? undefined : currentPath,
    });
  }
  
  return items;
}

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const items = generateBreadcrumbs(pathname);
  
  return <Breadcrumb items={items} />;
}
