# Graph Report - dashboard\src  (2026-08-03)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 201 nodes · 255 edges · 22 communities (16 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `97df36c4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dashboard-layout.tsx
- page.tsx
- cn
- command.tsx
- access-form.tsx
- dropdown-menu.tsx
- data-table.tsx
- select.tsx
- layout.tsx
- drawer.tsx
- card.tsx
- index.tsx
- accordion.tsx
- badge.tsx
- tabs.tsx
- middleware.ts
- section-header.tsx
- checkbox.tsx
- textarea.tsx
- api-client.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 12 edges
2. `Button` - 11 edges
3. `Pagination()` - 3 edges
4. `DashboardLayout()` - 3 edges
5. `useSidebar` - 3 edges
6. `DropdownMenuContent` - 3 edges
7. `DropdownMenuItem` - 3 edges
8. `generatePageNumbers()` - 2 edges
9. `SearchCommand()` - 2 edges
10. `NotificationBell()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `DashboardLayout()` --calls--> `cn()`  [EXTRACTED]
  components/layout/dashboard-layout.tsx → lib/utils.ts
- `NotificationBell()` --calls--> `cn()`  [EXTRACTED]
  components/layout/notification-bell.tsx → lib/utils.ts
- `Pagination()` --calls--> `cn()`  [EXTRACTED]
  components/dashboard/pagination.tsx → lib/utils.ts
- `DashboardLayout()` --calls--> `useSidebar`  [EXTRACTED]
  components/layout/dashboard-layout.tsx → hooks/use-sidebar.ts

## Import Cycles
- None detected.

## Communities (22 total, 6 thin omitted)

### Community 0 - "dashboard-layout.tsx"
Cohesion: 0.11
Nodes (17): DashboardLayout(), DashboardLayoutProps, MobileSidebar(), navItems, ProfileDropdown(), NavGroup, navigation, NavItem (+9 more)

### Community 1 - "page.tsx"
Cohesion: 0.10
Nodes (17): Breadcrumb(), BreadcrumbItem, BreadcrumbProps, ContentCard(), ContentCardProps, EmptyState(), EmptyStateProps, MetricCard() (+9 more)

### Community 2 - "cn"
Cohesion: 0.12
Nodes (16): generatePageNumbers(), Pagination(), PaginationProps, NotificationBell(), NotificationBellProps, Avatar, AvatarFallback, AvatarImage (+8 more)

### Community 3 - "command.tsx"
Cohesion: 0.15
Nodes (14): SearchCommand(), SearchCommandProps, Command, CommandDialog(), CommandEmpty, CommandGroup, CommandInput, CommandItem (+6 more)

### Community 4 - "access-form.tsx"
Cohesion: 0.16
Nodes (11): AccessForm(), AccessFormValues, accessSchema, metadata, Input, AccessResponse, dashboardAccess(), dashboardLogout() (+3 more)

### Community 5 - "dropdown-menu.tsx"
Cohesion: 0.21
Nodes (9): ProfileDropdownProps, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent (+1 more)

### Community 7 - "select.tsx"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 8 - "layout.tsx"
Cohesion: 0.43
Nodes (4): metadata, cormorantGaramond, manrope, spaceGrotesk

### Community 9 - "drawer.tsx"
Cohesion: 0.29
Nodes (3): DrawerContent, DrawerContentProps, DrawerOverlay

### Community 10 - "card.tsx"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 12 - "accordion.tsx"
Cohesion: 0.50
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

### Community 13 - "badge.tsx"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 14 - "tabs.tsx"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

### Community 15 - "middleware.ts"
Cohesion: 0.67
Nodes (3): config, middleware(), PUBLIC_PATHS

## Knowledge Gaps
- **75 isolated node(s):** `PaginationProps`, `SearchCommandProps`, `DashboardLayoutProps`, `NotificationBellProps`, `Avatar` (+70 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Button` connect `dashboard-layout.tsx` to `page.tsx`, `cn`, `access-form.tsx`, `dropdown-menu.tsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `dashboard-layout.tsx`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `PaginationProps`, `SearchCommandProps`, `DashboardLayoutProps` to the rest of the system?**
  _75 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dashboard-layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10582010582010581 - nodes in this community are weakly interconnected._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09846153846153846 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.11666666666666667 - nodes in this community are weakly interconnected._
- **Should `command.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14736842105263157 - nodes in this community are weakly interconnected._