# Frontend Architecture

Version: 1.0

Status: Active

---

# Purpose

This document defines the complete frontend architecture for the Ruchi Prativa Foundation platform.

The architecture is designed to support long-term scalability, maintainability, performance, accessibility, and developer productivity.

Every frontend implementation must follow this document.

---

# Technology Stack

Framework

- Next.js 16 (App Router)

Language

- TypeScript

Styling

- Tailwind CSS

UI Foundation

- shadcn/ui

Animation

- Framer Motion

Data Fetching

- TanStack Query

State Management

- Zustand

Forms

- React Hook Form
- Zod

Icons

- Lucide React

---

# Frontend Philosophy

The frontend is built around the following principles.

- Server Components by default.
- Client Components only when required.
- Feature-first organization.
- Reusable UI.
- Modular architecture.
- Minimal bundle size.
- Strong typing.
- High performance.
- Accessibility.
- SEO first.

---

# Source Structure

All application source code should live inside `/src`.

```
src/
│
├── app/
├── modules/
├── components/
├── core/
├── styles/
└── types/
```

Avoid placing application code directly in the project root.

---

# App Router

The application uses Next.js App Router exclusively.

Example:

```
src/app/

(public)/

(dashboard)/

(auth)/

api/

layout.tsx

loading.tsx

error.tsx

not-found.tsx
```

Route Groups should be used to separate experiences.

---

# Public vs Dashboard

Public Website

Responsible for:

- SEO
- Visitors
- Institutional Content
- Articles
- Publications
- CSR
- Events
- Gallery

Dashboard

Responsible for:

- Authentication
- Content Management
- Media
- Forms
- Publications
- Awardees
- CSR
- Administration

Both applications share the same design system but remain logically separated.

---

# Module Architecture

The project is organized by business domains rather than technical layers.

Example:

```
modules/

foundation/

impact/

recognition/

knowledge/

community/

media/

shared/
```

Each module owns its own implementation.

Never scatter module code throughout the project.

---

# Module Structure

Every module should follow the same structure.

Example:

```
foundation/

components/

hooks/

api/

schemas/

types/

constants/

services/

utils/

index.ts
```

Every module is self-contained.

---

# Core Folder

The `core` directory contains application-wide infrastructure.

```
core/

api/

auth/

config/

providers/

hooks/

lib/

store/

constants/

utils/

types/
```

Business logic should never live inside `core`.

---

# Components

The components directory should only contain reusable UI.

```
components/

ui/

layout/

common/
```

Examples:

Button

Input

Modal

Card

Container

Section

Navbar

Footer

Breadcrumb

PageHeader

Skeleton

Loader

Toast

Business-specific components belong inside modules.

---

# Routing Strategy

Every page should remain as thin as possible.

Pages should compose modules.

Avoid implementing business logic directly inside route files.

---

# Providers

Global providers belong inside `core/providers`.

Examples:

Query Provider

Theme Provider

Toast Provider

Future Auth Provider

Keep provider nesting minimal.

---

# API Layer

Never perform API requests directly inside components.

All communication should flow through:

```
core/api/
```

Example:

```
api/

client.ts

foundation.ts

csr.ts

publication.ts

media.ts

forms.ts
```

---

# TanStack Query

Separate concerns.

```
queries/

mutations/

queryKeys/
```

Never mix them together.

Server state belongs to TanStack Query.

---

# Zustand

Use only for UI state.

Allowed examples:

Theme

Sidebar

Filters

Search

Modal

Wizard Step

Never store server data inside Zustand.

---

# Forms

Every form must use:

React Hook Form

Zod

Reusable Field Components

Shared Validation

No custom validation logic inside pages.

---

# Type Safety

Shared types belong in:

```
core/types
```

Module-specific types belong inside the module.

Avoid duplicate interfaces.

Never use `any`.

---

# Import Strategy

Use path aliases.

Examples:

```
@/core

@/modules

@/components

@/styles

@/types
```

Avoid deep relative imports.

---

# Styling

Tailwind only.

Spacing

Typography

Colors

Radius

Shadows

Containers

must come from the design system.

Avoid custom CSS unless absolutely necessary.

---

# Performance Strategy

Server Components first.

Dynamic imports for heavy features.

Lazy load below-the-fold content.

Image optimization.

Code splitting.

Streaming.

Partial prerendering.

Keep JavaScript bundles minimal.

---

# SEO Strategy

Every public page should support:

Metadata API

Open Graph

Twitter Cards

Canonical URLs

Structured Data

Semantic HTML

Readable URLs

Breadcrumbs

---

# Accessibility

Every component should support:

Keyboard navigation

ARIA

Semantic HTML

Focus states

Color contrast

Screen readers

Accessibility is mandatory.

---

# Naming Conventions

Components

```
AwardCard.tsx
```

Hooks

```
useAwards.ts
```

Schemas

```
award.schema.ts
```

Types

```
award.types.ts
```

API

```
award.api.ts
```

Store

```
sidebar.store.ts
```

Maintain consistent naming throughout the project.

---

# Folder Ownership

Every file should have a clear owner.

Example:

Award components

↓

Recognition module

Volunteer forms

↓

Community module

Media gallery

↓

Media module

Do not place business code inside shared folders.

---

# Future Expansion

The architecture should support future additions without restructuring.

Examples:

- AI Search
- Donations
- Digital Museum
- Research Portal
- Membership
- Scholarship Management
- Multi-language Support
- Mobile Applications

The current architecture should remain valid as these features are introduced.

---

# Graphify Asset Relationships & Component Hierarchy

## Primary Brand Asset
- **Source Asset**: `/assets/logo.svg`
- **Public URL**: `/logo.svg` (`client/public/logo.svg`)
- **Module Asset**: `@/assets/logo.svg` (`client/src/assets/logo.svg`)
- **Aspect Ratio**: 1:1 (Vector SVG, crisp scaling on high-density displays)

## Component Hierarchy & Usage
- **Header (`modules/home/sections/Navigation`)**:
  - `index.tsx`: 100% stationary, ultra-minimal fixed header row with inner content constrained to the site's global grid (`max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16`) rendering `<NavLogo />` on the left and right-aligned utility controls `<NavActions />`.
  - `NavActions.tsx`: Utility section rendering Search, Hamburger Directory Toggle (`Directory`), Theme Switcher (Light/Dark/System via `next-themes`), Language Switcher (`EN`/`OR`), and "Become a Volunteer" primary CTA.
  - `MegaNavPanel.tsx`: GSAP-animated 6-column mega navigation panel with a **100vw full-bleed edge-to-edge opaque background** (`bg-institutional-dark`) that visually merges into one continuous navigation surface with the Header. Houses an inner content grid (`max-w-[1550px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-8 lg:py-12 xl:py-14`) with refined luxury dashboard card grid gaps (`gap-5 lg:gap-6 xl:gap-7 2xl:gap-8`) and card padding (`p-6 sm:p-6 lg:p-7`) aligning 6 directory categories 100% flush with the website grid.
  - `NavLogo.tsx`: Renders `/logo.svg` via Next.js `<Image>` with priority loading and smooth hover scaling (`group-hover:scale-105`).
  - `MobileMenu.tsx`: Native-app style mobile navigation panel attached directly beneath the fixed header row (`fixed top-[58px] sm:top-[64px] left-0 right-0 bottom-0 z-40 bg-institutional-dark`). Integrates shadcn/ui Accordion (`components/ui/accordion.tsx`) organizing 6 directory categories (`Foundation`, `Our Work`, `Recognition`, `Publications`, `Media`, `Get Involved`) with smooth 180° chevron rotations, thin `border-white/10` dividers, primary volunteer CTA, and editorial footer snippet. `Accordion` explicitly destructures non-standard DOM props (`type`, `collapsible`, `defaultValue`, `value`, `onValueChange`), guaranteeing zero React DOM attribute warnings while supporting both controlled and uncontrolled usage.
- **Who We Are / Introduction (`modules/home/sections/Introduction`)**:
  - `index.tsx`: Balanced editorial section container with standard grid alignment (`max-w-[1500px] w-full mx-auto px-6 sm:px-10 lg:px-12 xl:px-16`).
  - `EditorialContent.tsx`: Preserves existing section heading, narrative paragraphs, and primary CTA button.
  - `EditorialImageContainer.tsx`: Replaces placeholder icon emblem block with a high-resolution featured Next.js `<Image>` component (`/founder_portrait.png`) wrapped in `InteractiveImage` with living archive badges, glare sheen sweep, and floating caption overlay.
- **Interactive Journey Through Time (`modules/home/sections/Timeline`)**:
  - `index.tsx`: Compact section container with optimized padding (`py-12 sm:py-16`) and tight vertical rhythm.
  - `TimelineTrack.tsx`: Desktop horizontal timeline track with 100% mathematically centered indicator circles (`top-[42px]` geometric alignment), enhanced typography contrast (`font-semibold text-institutional-dark dark:text-gray-200`), and smooth progress bar transitions.
  - `TimelineDetail.tsx`: Tabbed milestone cards wrapped in `InteractiveCard` with concentric circle icon containers, smooth tab height adaptation, and entrance stagger animations.
- **Featured Impact Story (`modules/home/sections/StorySections/components/FeaturedImpactStory.tsx`)**:
  - `FeaturedImpactStory.tsx`: Editorial horizontal slider contained within `~100vh` viewport height (`lg:min-h-[85vh] lg:max-h-[920px] py-12 lg:py-20`) showcasing 5 full-card background impact story cards inspired by premium editorial design.
  - `Sharp Architectural Corners`: Sharp border radius (`rounded-sm` 4-8px) eliminating oversized rounded edges and aligning perfectly with Apple × Stripe design standards.
  - `Zero White Frame Edge-to-Edge Image`: Card container uses `p-0`, allowing the background image (`object-cover`) to touch all 4 edges (top, bottom, left, right) from 0 to 100% with absolutely zero white frame or padding around the image.
  - `Expanded 32px Left & Bottom Overlay Padding`: Internal overlay content layer (`p-7 sm:p-8 lg:p-9`) provides generous 32px left/bottom grid alignment for category badges, person name, narrative summary, and `Read Story →` CTA.
  - `Flush Transparent Edge Fade`: Viewport-edge flush transparent gradient masks (`w-16 sm:w-28 lg:w-36 bg-gradient-to-r/l from-institutional-light dark:from-institutional-dark to-transparent`) creating a luxury "content continues" effect without gaps.
- **Moments in Time Gallery (`modules/home/sections/StorySections/components/PhotoMosaic.tsx`, `Masonry.tsx`)**:
  - `Masonry.tsx`: Integrated React Bits Masonry gallery layout component powered by GSAP (`stagger: 0.04`, `duration: 0.6`, `animateFrom: 'bottom'`, `blurToFocus: true`) with tight 12px Pinterest-style grid gaps (`gap = 12`) and 5-to-1 dynamic column breakpoints (`1500px`: 5 cols, `1000px`: 4 cols, `600px`: 3 cols, `400px`: 2 cols, default: 1 col).
  - `Shadow-Free Editorial Cards`: Each masonry card wraps in `<InteractiveCard disableShadow>` with sharp `rounded-sm` corners, edge-to-edge images (`Image fill object-cover`), soft theme-adaptive dark gradient overlays, mouse spotlight specular lighting, image zoom (`scale-105`), micro 3D tilt ($\pm 2.5^\circ$), and zero hover box shadow.
  - `Refined Higher Gradient Fade & Compact Spacing`: Gradual 450px vertical gradient fade-out (`h-80 sm:h-[380px] lg:h-[450px] bg-gradient-to-t from-institutional-cream via-institutional-cream/85 dark:from-[#0B0F17] dark:via-[#0B0F17]/85 to-transparent`) starting 200px higher up in the gallery, paired with reduced bottom padding (`pb-10 sm:pb-12 lg:pb-14`).
- **Flagship Publications Digital Library (`modules/home/sections/StorySections/components/PublicationsAndMedia.tsx`, `PublicationBook.tsx`, `BookShelf.tsx`, `BookPreview.tsx`)**:
  - `PublicationsAndMedia.tsx`: Dedicated digital library section (`lg:min-h-[80vh] flex flex-col justify-center py-12 lg:py-20`) showcasing section heading, description, 3D hardcover bookshelf, and `View All Publications` primary CTA button.
  - `PublicationBook.tsx`: 3D hardcover book component featuring front cover with gold foil border, 3D left spine fold (`BookSpine`), layered page stack right edge, `perspective: 1200px` 3D hover tilt (`rotateY(-12deg)`, `rotateX(3deg)`, `translateY(-10px)`), specular glare sweep, and ambient shelf drop shadow.
  - `BookShelf.tsx`: Horizontal digital library shelf holding 6 flagship publication editions standing upright on a luxury shelf plank with smooth horizontal scroll navigation (`ChevronLeft`/`ChevronRight`) and touch swipe support.
  - `BookPreview.tsx`: Interactive book-opening detail modal (`rotateY(-160deg)` cover unfold) displaying full publication metadata, 3D hardcover mockup, editorial summary, and action CTAs (`Read Online`, `Download PDF`, `View Archive`).
- **About the Foundation — Museum Storytelling Experience (`app/about/page.tsx`, `app/foundation/page.tsx`, `modules/about/AboutPage.tsx`)**:
  - `AboutPage.tsx`: Single-page museum editorial experience following the 13-step storytelling flow: `#about-hero` (Hero) → `SignatureScrollQuote` → `#about-foundation` (About Foundation) → `#foundation-story` (Story Behind the Foundation) → `#founders-words` (Founder's Words) → `#vision-mission-values` (Vision • Mission • Values) → `#journey` (Journey of an Institution) → `#milestones` (Institutional Milestones) → `#leadership` (Leadership) → `#governance` (Governance Charter) → `#philosophy` (Our Philosophy) → `#why-we-matter` (Why We Matter) → `#future` (Building the Next Chapter) → `#join-journey` (Call To Action).
  - `Route Aliasing`: Configured both `/about` and `/foundation` page routes in Next.js App Router so links formatted as `/foundation#<id>` or `/about#<id>` render seamlessly with zero 404s.
  - `SignatureScrollQuote.tsx`: Signature progressive scroll experience positioned immediately below the Hero section. Configured with a ~35% faster scroll trigger (`offset: ['start 0.85', 'start 0.3']`) so the quote *"A society progresses not only through development, but by recognizing the individuals who dedicate their lives to its betterment." — Shri Sarat Kumar Sahoo* completes its left-to-right highlight earlier while scrolling. This progressive text highlight effect is **exclusively scoped** to this signature section.
  - `Smooth Editorial Fade Reveals`: Major editorial narrative sections (`WhoWeAre.tsx`, `FoundationStory.tsx`, `OurPhilosophy.tsx`, `ChairmanMessage.tsx`) use subtle Framer Motion fade-up reveal animations (`initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}`) to maintain a calm, premium reading experience.
  - `Interactive Discovery Cards & Click-to-Reveal`: Enhances `WhoWeAre.tsx`, `FoundationStory.tsx`, `WhyWeMatter.tsx`, `Leadership.tsx`, and `GovernanceTransparency.tsx` with expandable archival note disclosures, 4 interactive "Why We Matter" discovery cards, interactive biography modals, and certified audit document panels.
  - `useActiveSection.ts`: Custom `IntersectionObserver` hook tracking all 13 semantic section IDs and dynamically highlighting active navigation items in `MegaNavPanel.tsx` (Desktop) and `MobileMenu.tsx` (Mobile) with a gold pulsing indicator dot and gold typography state (`text-institutional-accent font-semibold`).
  - `Smooth In-Page Scroll & Header Offset`: Every section uses `scroll-mt-24 sm:scroll-mt-28` guaranteeing section headers remain fully visible below the fixed navigation bar. Clicking links or the `EXPLORE →` button automatically closes mobile drawers (`onClose()`), scrolls smoothly to target element, and updates URL hash without page reload.
- **Your Volunteer Journey (`modules/home/sections/StorySections/components/VolunteerJourney.tsx`)**:
  - Relocated to sit **immediately below the Publications section**, transitioning visitors naturally from exploring knowledge into active community participation.
- **Dedicated Mobile Experience System (320px – 480px Viewports)**:
  - *Default Theme System*: Light Mode is configured as the application-wide default theme (`defaultTheme="light" enableSystem={false}` in `app/layout.tsx`), persisting user preferences while dark mode remains togglable with zero hydration flickering.
  - *Hero Section 90vh Mobile Height*: Mobile Hero section (`Hero/index.tsx`, `HeroContent.tsx`) is configured to `h-[90vh] min-h-[90vh] sm:min-h-screen sm:h-auto` in Mobile View Only so it fits the whole screen comfortably while keeping eyebrow, heading, paragraph, CTAs, and scroll indicator 100% vertically and horizontally centered with ~65-70% content width constraint.
  - *Mobile Header Utility Actions & Compact Logo*: Mobile Header (`Navigation/index.tsx`, `NavLogo.tsx`) integrates Search, Theme Toggle (Light/Dark), and Language Selector (`EN`/`OR`) beside the mobile hamburger menu with touch-friendly 36px targets, while decreasing logo text size in Mobile View Only (`text-sm sm:text-lg`) for a clean, non-cramped header layout.
  - *Legacy Counts 15–25% Font Size Increase*: Stat numbers (`StatCounter.tsx`) feature 15–25% larger numerical values on mobile (`text-4xl` for compact stats, `text-6xl` for `2 Lakhs+` centerpiece) emphasizing institutional impact.
  - *Message From The Founder*: Founder section (`ChairmanMessage.tsx`) enforces consistent 24px side padding (`px-6 sm:px-6`), centered mobile typography alignment, refined quote spacing, and subtle institutional hover borders (`hover:border-institutional-accent/50`) and image zoom (`group-hover:scale-105 duration-700`).
  - *Full Homepage Mobile Alignment*: Enforced 24px side padding (`px-6 sm:px-6`), centered text headers, proportioned card heights, and comfortable touch targets across `FeaturedImpactStory`, `PhotoMosaic`, `PublicationsAndMedia`, `VolunteerJourney`, `SignatureQuote`, `Timeline` (`Timeline/index.tsx`), and `Footer` in Mobile View Only (320px–480px viewports).
  - *Unified Timeline Tracker & Mobile Order*: Timeline section (`TimelineTrack.tsx`, `TimelineDetail.tsx`) inherits the identical desktop tracker design on mobile with horizontal swipeable scrolling (`overflow-x-auto min-w-[660px]`), gold active rings, and continuous lines. On mobile view, content follows a strict editorial vertical order: Text Box 1 (Description Box) -> Text Box 2 (Highlight Box) -> Image Container (Historical Archive Container placed below text blocks).
  - *Full-Bleed Mobile Carousel (100vw)*: Elevated `ChairmanMessage.tsx` and `FeaturedImpactStory.tsx` headers to bold Cormorant Garamond font weight (`font-bold text-3xl sm:text-4xl lg:text-5xl`), matching primary section hierarchy. On mobile view, `FeaturedImpactStory.tsx` breaks out to full `100vw` width (`w-[100vw] -ml-6 sm:w-full sm:ml-0`) with 72vw card width (`w-[72vw] h-[420px] sm:w-[320px] sm:h-[520px]`), showing ~20-25% peeks of previous and next cards with soft ambient edge gradient fades.

## Reusable Interaction System
- **`InteractiveCard` (`components/ui/InteractiveCard.tsx`)**:
  - Refined React Bits inspired card interaction component adapted for Apple × Foundation Premium Editorial design across Light Mode (`#F8F6F0`) and Dark Mode (`#0B0F17`).
  - *Refined Interaction Parameters*:
    - **Immediate Hover Lift & Elevation**: High-velocity cubic-bezier easing (`duration: 0.22`, `ease: [0.16, 1, 0.3, 1]`) ensuring zero delay when cursor enters card (`y: -5`, `scale: 1.006`).
    - **Subtle Subconscious Micro 3D Tilt**: Micro mouse-following 3D rotation ($\pm 2.5^\circ$ `rotateX`/`rotateY` with `perspective: 1000px`) that smoothly interpolates cursor movement and returns gracefully to rest position on mouse leave.
    - **Warm Luxury Ivory Light Mode Surface**: Light Mode hover surface transitions to a warm ivory cream tint (`#FFFDF9`) with soft gold specular highlight (`rgba(197, 160, 89, 0.14)`), leaving Dark Mode (`#121824`) untouched.
    - **Dynamic Illuminated Border Mask**: Masked radial border overlay (`maskImage: radial-gradient(220px circle...)`) that dynamically illuminates a deep graphite charcoal (`#0B0F17`) border in Light Mode and gold accent (`#C5A059`) border in Dark Mode right at cursor coordinates.
    - **Touch Device Safety**: Disables mouse coordinate tracking and 3D tilt automatically on touch devices (`'ontouchstart' in window`), preserving lift, border glow, and shadow elevation without performance degradation.
  - *Consumers*:
    - **Trust Cards (`Legacy/components/CredentialsGrid.tsx`)**: Government Recognition, Foundation Registration, CSR Commitment, National Presence.
    - **Three Pillars (`ThreePillars/components/PillarCard.tsx`)**: Recognition, Community, Knowledge.
    - **Timeline Milestone Cards (`Timeline/components/TimelineDetail.tsx`)**: Epoch Overview, Key Achievements, Long-term Legacy.
    - **Sanman & Hall of Fame (`StorySections/components/SanmanAndHallOfFame.tsx`)**: Featured Laureate & Hall of Fame Honorees.
    - **Impact & Publications (`StorySections/components/FeaturedImpactStory.tsx`, `PublicationsAndMedia.tsx`)**: Impact Narratives & Flagship Journals.
    - **Transparency & Volunteer Journey (`StorySections/components/TransparencyAndPartners.tsx`, `VolunteerJourney.tsx`)**: Governance Audit Cards, Partner Cards, Volunteer Steps.
    - **Visual Mosaic (`StorySections/components/PhotoMosaic.tsx`)**: Photo Archive Mosaic Cards.
- **`InteractiveImage` (`components/ui/InteractiveImage.tsx`)**:
  - Unified photography & media wrapper component used across all featured images and portraits.
  - *Interactions*: Smooth zoom-in (`scale-105`), glare sheen sweep overlay (`group-hover:translate-x-full`), lighting reflection vignette, hardware accelerated transitions.

---

# Guiding Principle

The frontend should feel like a collection of independent business modules built on top of a shared platform.

Features may evolve independently, but the architecture should remain stable for years.

Always prefer clarity, consistency, and scalability over short-term convenience.