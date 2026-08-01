# Technical Architecture

Version: 1.0
Status: Active

---

# Purpose

This document defines the overall system architecture of the Ruchi Prativa Foundation Digital Platform.

It describes how the Public Website, Admin Dashboard, Backend API, Database, Storage, Caching, and Infrastructure interact.

This document governs all technical decisions across the project.

---

# Platform Overview

The project consists of multiple independent applications working together.

```

Internet
│
├─────────────────────────────────────────────┐
│ │
▼ ▼
Public Website Admin Dashboard
(Vercel) (Vercel)
│ │
└───────────────┬─────────────────────────────┘
│
▼
API Server (Railway)
│
├──────────────┬───────────────┬──────────────┐
│ │ │ │
▼ ▼ ▼ ▼
PostgreSQL Redis Object Storage Email Service

```

The frontend applications are independent deployments.

Both communicate with a common backend API.

---

# Applications

## Public Website

Purpose

Present the Foundation to the public.

Responsibilities

- Institutional Information
- CSR
- Programs
- Publications
- Hall of Fame
- Gallery
- Events
- Contact
- Volunteer Forms

Deployment

Vercel

---

## Admin Dashboard

Purpose

Internal content management system.

Responsibilities

- Authentication
- Content Management
- Awardees
- Publications
- Media
- CSR
- Forms
- Users
- Settings

Deployment

Vercel

---

## Backend API

Purpose

Business Logic.

Responsibilities

Authentication

Authorization

CRUD

Validation

Media

File Upload

Search

Notifications

Email

Reporting

Deployment

Railway

---

# Database

Database

PostgreSQL

Purpose

Single source of truth.

Stores

Users

Roles

Foundation

CSR

Awards

Awardees

Events

Publications

Media

Forms

Volunteers

Partners

Settings

Logs

Never store business data inside the frontend.

---

# Cache

Redis

Purpose

Caching

Rate Limiting

Temporary State

Future Queue System

Never use Redis as the primary database.

---

# Object Storage

Cloudflare R2

Purpose

Store

Images

Videos

PDFs

Magazines

Reports

Downloads

Gallery Assets

Large files should never be stored inside PostgreSQL.

---

# Authentication

Authentication is dashboard-only.

Public visitors do not require login.

Authentication

JWT

Refresh Tokens

Role Based Access Control

Future 2FA Ready

---

# User Roles

Example

Super Admin

Foundation Admin

CSR Manager

Publication Editor

Media Manager

Event Manager

Viewer

Permissions should always be role based.

Never hardcode authorization.

---

# API Design

Architecture

REST API

Entity Based

Version Ready

Example

/api/foundation

/api/csr

/api/publications

/api/awards

/api/media

/api/events

/api/forms

Avoid page-based endpoints.

---

# Module Architecture

Backend modules should mirror business domains.

Foundation

Impact

Recognition

Knowledge

Community

Media

Authentication

Users

Settings

Search

Notifications

This keeps frontend and backend aligned.

---

# File Upload Flow

User

↓

Dashboard

↓

API

↓

Cloudflare R2

↓

Database Metadata

↓

Frontend

Only metadata belongs in PostgreSQL.

Files belong in Object Storage.

---

# Public Content Flow

Dashboard

↓

API

↓

Database

↓

Public Website

↓

Visitor

The Public Website is a consumer.

The Dashboard is the producer.

---

# Form Submission Flow

Visitor

↓

Website Form

↓

API

↓

Database

↓

Dashboard

↓

Administrator Review

↓

Email Notification

The dashboard manages all incoming submissions.

---

# Search Strategy

Version 1

Database Search

Version 2

Dedicated Search Engine

Search should eventually cover:

Awardees

Articles

Publications

CSR

Events

Media

Reports

---

# Performance Strategy

Server Rendering

Caching

Streaming

Lazy Loading

Image Optimization

CDN

Code Splitting

Minimal Client JavaScript

---

# Security Strategy

Validate every request.

Validate uploads.

Role Based Authorization.

Rate Limiting.

Input Sanitization.

Never expose secrets.

HTTPS everywhere.

Secure Cookies.

Least Privilege Principle.

---

# Logging

System Logs

Authentication Logs

Error Logs

Activity Logs

Future Audit Logs

Logs should be centralized.

---

# Deployment Strategy

Frontend

Vercel

Dashboard

Vercel

Backend

Railway

Database

PostgreSQL

Storage

Cloudflare R2

Cache

Redis

CDN

Cloudflare

---

# Environment Strategy

Separate environments.

Development

Staging

Production

Configuration should come only from environment variables.

Never hardcode secrets.

---

# Future Expansion

The architecture should support:

Donation Platform

Membership

Scholarships

AI Search

Digital Museum

Research Portal

Mobile Applications

Multilingual Support

Event Registration

Digital Certificates

without major architectural changes.

---

# Guiding Principle

The system should behave as one platform composed of independent services.

Every application has a single responsibility.

The backend owns business logic.

The dashboard owns content creation.

The public website owns presentation.

No responsibility should overlap.
