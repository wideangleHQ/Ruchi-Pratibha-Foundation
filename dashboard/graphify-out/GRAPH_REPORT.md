# Graph Report - dashboard  (2026-08-07)

## Corpus Check
- 82 files · ~22,914 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 455 nodes · 863 edges · 52 communities (18 shown, 34 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5dc72e8a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- utils.ts
- cn
- page.tsx
- page.tsx
- devDependencies
- page.tsx
- compilerOptions
- command.tsx
- components.json
- access-form.tsx
- layout.tsx
- dependencies
- breadcrumb.tsx
- card.tsx
- middleware.ts
- axios
- class-variance-authority
- cmdk
- framer-motion
- @hookform/resolvers
- next
- next.config.ts
- next-themes
- @radix-ui/react-checkbox
- @radix-ui/react-collapsible
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-label
- @radix-ui/react-navigation-menu
- @radix-ui/react-popover
- @radix-ui/react-scroll-area
- @radix-ui/react-select
- @radix-ui/react-separator
- @radix-ui/react-slot
- @radix-ui/react-switch
- @radix-ui/react-tabs
- @radix-ui/react-toggle
- @radix-ui/react-toggle-group
- @radix-ui/react-tooltip
- react
- react-dom
- react-hook-form
- sonner
- tailwind-merge
- @tanstack/react-query
- zod
- zustand
- postcss.config.mjs
- tailwind.config.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 75 edges
2. `Button` - 19 edges
3. `compilerOptions` - 16 edges
4. `PageHeader()` - 11 edges
5. `StatusBadge()` - 9 edges
6. `useSidebar` - 9 edges
7. `OpportunityDetailPage()` - 8 edges
8. `EmptyState()` - 8 edges
9. `Input` - 8 edges
10. `ContentCard()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `CommandShortcut()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/command.tsx → src/lib/utils.ts
- `DialogHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts
- `DialogFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts
- `DropdownMenuShortcut()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dropdown-menu.tsx → src/lib/utils.ts
- `OpportunityPreviewPage()` --calls--> `getOpportunityById()`  [EXTRACTED]
  src/app/(dashboard)/opportunities/[id]/preview/page.tsx → src/lib/api/opportunities.ts

## Import Cycles
- None detected.

## Communities (52 total, 34 thin omitted)

### Community 0 - "utils.ts"
Cohesion: 0.05
Nodes (45): DashboardLayout(), DashboardLayoutProps, SearchCommand, MobileSidebar(), navItems, NotificationBell(), NotificationBellProps, ProfileDropdown() (+37 more)

### Community 1 - "cn"
Cohesion: 0.09
Nodes (44): APP_STATUS_MAP, ArchivedOpportunitiesPage(), STATUS_MAP, TYPE_LABELS, STATUS_MAP, DataTable(), DataTableBody(), DataTableCell() (+36 more)

### Community 2 - "page.tsx"
Cohesion: 0.09
Nodes (28): CreateOpportunityPage(), FormData, getInitialFormData(), SKILL_OPTIONS, slideVariants, WIZARD_STEPS, FormData, SKILL_OPTIONS (+20 more)

### Community 3 - "page.tsx"
Cohesion: 0.11
Nodes (27): EditOpportunityPage(), formatDateTime(), OpportunityDetailPage(), STATUS_MAP, Tab, TABS, TYPE_LABELS, OpportunityPreviewPage() (+19 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (30): autoprefixer, eslint, eslint-config-next, devDependencies, autoprefixer, eslint, eslint-config-next, postcss (+22 more)

### Community 5 - "page.tsx"
Cohesion: 0.11
Nodes (22): ApplicationsPage(), STATUS_MAP, VolunteerDetailPage(), VolunteersPage(), SectionHeader(), SectionHeaderProps, ApplicationListItem, approveApplication() (+14 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 7 - "command.tsx"
Cohesion: 0.15
Nodes (16): SearchCommandProps, Command, CommandDialog(), CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList (+8 more)

### Community 8 - "components.json"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 9 - "access-form.tsx"
Cohesion: 0.18
Nodes (10): AccessForm(), AccessFormValues, accessSchema, metadata, AccessResponse, dashboardAccess(), dashboardLogout(), dashboardVerify() (+2 more)

### Community 10 - "layout.tsx"
Cohesion: 0.23
Nodes (7): metadata, cormorantGaramond, manrope, spaceGrotesk, Providers(), QueryProvider(), ThemeProvider()

### Community 11 - "dependencies"
Cohesion: 0.22
Nodes (9): clsx, lucide-react, dependencies, clsx, lucide-react, @radix-ui/react-accordion, @radix-ui/react-avatar, @radix-ui/react-accordion (+1 more)

### Community 12 - "breadcrumb.tsx"
Cohesion: 0.38
Nodes (5): Breadcrumb(), BreadcrumbItem, BreadcrumbProps, DynamicBreadcrumb(), generateBreadcrumbs()

### Community 13 - "card.tsx"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 14 - "middleware.ts"
Cohesion: 0.67
Nodes (3): config, middleware(), PUBLIC_PATHS

## Knowledge Gaps
- **180 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+175 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `utils.ts`, `page.tsx`, `page.tsx`, `page.tsx`, `command.tsx`, `breadcrumb.tsx`, `card.tsx`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`, `axios`, `class-variance-authority`, `cmdk`, `framer-motion`, `@hookform/resolvers`, `next`, `next-themes`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-label`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-popover`, `@radix-ui/react-scroll-area`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`, `react`, `react-dom`, `react-hook-form`, `sonner`, `tailwind-merge`, `@tanstack/react-query`, `zod`, `zustand`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `Button` connect `utils.ts` to `cn`, `page.tsx`, `page.tsx`, `page.tsx`, `access-form.tsx`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _180 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `utils.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05432595573440644 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.08743169398907104 - nodes in this community are weakly interconnected._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08819345661450925 - nodes in this community are weakly interconnected._