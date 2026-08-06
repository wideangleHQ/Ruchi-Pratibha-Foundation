# Graph Report - src  (2026-08-06)

## Corpus Check
- 67 files · ~19,383 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 277 nodes · 710 edges · 12 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5dc72e8a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dashboard-layout.tsx
- page.tsx
- command.tsx
- access-form.tsx
- select.tsx
- layout.tsx
- drawer.tsx
- card.tsx
- badge.tsx
- middleware.ts
- section-header.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 67 edges
2. `Button` - 18 edges
3. `DashboardLayout()` - 13 edges
4. `Breadcrumb()` - 12 edges
5. `PageHeader()` - 11 edges
6. `useSidebar` - 9 edges
7. `OpportunityDetailPage()` - 8 edges
8. `StatusBadge()` - 8 edges
9. `Input` - 8 edges
10. `ContentCard()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `CommandShortcut()` --calls--> `cn()`  [EXTRACTED]
  components/ui/command.tsx → lib/utils.ts
- `DialogHeader()` --calls--> `cn()`  [EXTRACTED]
  components/ui/dialog.tsx → lib/utils.ts
- `DialogFooter()` --calls--> `cn()`  [EXTRACTED]
  components/ui/dialog.tsx → lib/utils.ts
- `DropdownMenuShortcut()` --calls--> `cn()`  [EXTRACTED]
  components/ui/dropdown-menu.tsx → lib/utils.ts
- `OpportunityPreviewPage()` --calls--> `getOpportunityById()`  [EXTRACTED]
  app/(dashboard)/opportunities/[id]/preview/page.tsx → lib/api/opportunities.ts

## Import Cycles
- None detected.

## Communities (12 total, 0 thin omitted)

### Community 0 - "dashboard-layout.tsx"
Cohesion: 0.08
Nodes (36): DashboardLayoutProps, MobileSidebar(), navItems, NotificationBell(), NotificationBellProps, ProfileDropdown(), ProfileDropdownProps, NavGroup (+28 more)

### Community 1 - "page.tsx"
Cohesion: 0.12
Nodes (33): APP_STATUS_MAP, ArchivedOpportunitiesPage(), STATUS_MAP, TYPE_LABELS, DashboardHome(), STATUS_MAP, VolunteersPage(), Breadcrumb() (+25 more)

### Community 3 - "command.tsx"
Cohesion: 0.15
Nodes (17): SearchCommand(), SearchCommandProps, Command, CommandDialog(), CommandEmpty, CommandGroup, CommandInput, CommandItem (+9 more)

### Community 4 - "access-form.tsx"
Cohesion: 0.18
Nodes (10): AccessForm(), AccessFormValues, accessSchema, metadata, AccessResponse, dashboardAccess(), dashboardLogout(), dashboardVerify() (+2 more)

### Community 7 - "select.tsx"
Cohesion: 0.10
Nodes (25): CreateOpportunityPage(), DOCUMENT_OPTIONS, FormData, getInitialFormData(), SKILL_OPTIONS, STEPS, DOCUMENT_OPTIONS, FormData (+17 more)

### Community 8 - "layout.tsx"
Cohesion: 0.23
Nodes (7): metadata, cormorantGaramond, manrope, spaceGrotesk, Providers(), QueryProvider(), ThemeProvider()

### Community 9 - "drawer.tsx"
Cohesion: 0.11
Nodes (18): Drawer(), DrawerContent(), DrawerFooter(), DrawerHeader(), DrawerProps, DrawerTitle(), MetricCard(), MetricCardProps (+10 more)

### Community 10 - "card.tsx"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 13 - "badge.tsx"
Cohesion: 0.11
Nodes (26): EditOpportunityPage(), formatDateTime(), OpportunityDetailPage(), STATUS_MAP, Tab, TABS, TYPE_LABELS, OpportunityPreviewPage() (+18 more)

### Community 15 - "middleware.ts"
Cohesion: 0.67
Nodes (3): config, middleware(), PUBLIC_PATHS

### Community 16 - "section-header.tsx"
Cohesion: 0.12
Nodes (20): ApplicationsPage(), STATUS_MAP, VolunteerDetailPage(), SectionHeader(), SectionHeaderProps, ApplicationListItem, approveApplication(), getApplicationByCode() (+12 more)

## Knowledge Gaps
- **79 isolated node(s):** `APP_STATUS_MAP`, `STEPS`, `SKILL_OPTIONS`, `DOCUMENT_OPTIONS`, `FormData` (+74 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `drawer.tsx` to `dashboard-layout.tsx`, `page.tsx`, `command.tsx`, `select.tsx`, `card.tsx`, `badge.tsx`, `section-header.tsx`?**
  _High betweenness centrality (0.264) - this node is a cross-community bridge._
- **Why does `Button` connect `dashboard-layout.tsx` to `page.tsx`, `access-form.tsx`, `select.tsx`, `badge.tsx`, `section-header.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `DashboardLayout()` connect `page.tsx` to `dashboard-layout.tsx`, `select.tsx`, `drawer.tsx`, `badge.tsx`, `section-header.tsx`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `APP_STATUS_MAP`, `STEPS`, `SKILL_OPTIONS` to the rest of the system?**
  _79 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dashboard-layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07597402597402597 - nodes in this community are weakly interconnected._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12424242424242424 - nodes in this community are weakly interconnected._
- **Should `command.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14736842105263157 - nodes in this community are weakly interconnected._