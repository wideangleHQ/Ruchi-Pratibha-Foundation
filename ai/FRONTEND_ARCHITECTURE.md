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

# Guiding Principle

The frontend should feel like a collection of independent business modules built on top of a shared platform.

Features may evolve independently, but the architecture should remain stable for years.

Always prefer clarity, consistency, and scalability over short-term convenience.