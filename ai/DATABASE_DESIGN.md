# Database Design

Version: 1.0

Status: Active

---

# Purpose

This document defines the business entities, relationships, ownership, and future scalability of the Ruchi Prativa Foundation platform.

This is NOT a database schema.

This is the conceptual data model.

Database implementation (Prisma, SQL, PostgreSQL) must always follow this document.

Never create tables before defining the business entity.

---

# Design Principles

The database should represent the Foundation's business domains.

Every table must represent a real-world entity.

Avoid duplicated data.

Avoid storing presentation data.

Prefer normalized structures.

Support future expansion.

Maintain referential integrity.

Soft delete wherever appropriate.

Track creation and update timestamps.

---

# Core Domains

The platform consists of the following primary domains.

Foundation

Recognition

Impact

Knowledge

Community

Media

Administration

Settings

Audit

Every future module should belong to one of these domains.

---

# Foundation Domain

Represents the institution itself.

Entities

Foundation

Leadership

Board Member

Timeline Event

Mission

Vision

Core Value

Chairman's Message

History Section

Office Location

Contact Information

Relationships

Foundation

├── Leadership

├── Timeline

├── Mission

├── Vision

├── Values

---

# Recognition Domain

Represents Ruchi Prativa Sanman.

Entities

Award

Award Category

Award Year

Awardee

Ceremony

Nomination (Future)

Jury Member (Future)

Speech (Future)

Award Gallery

Award Video

Relationships

Award

├── Category

├── Year

├── Awardee

├── Gallery

├── Video

Awardee

↓

One Category

↓

One Year

↓

Multiple Media

---

# Impact Domain

Represents social work.

Entities

CSR Program

CSR Category

Project

Beneficiary

Impact Story

Report

Statistics

Location

Partner Organization

Relationships

CSR Program

├── Projects

├── Reports

├── Statistics

├── Beneficiaries

├── Success Stories

---

# Knowledge Domain

Represents publications.

Entities

Magazine

Magazine Issue

Publication

Article

Editorial

Author

Download

Research

Category

Relationships

Magazine

↓

Multiple Issues

↓

Multiple Articles

↓

Multiple Downloads

---

# Community Domain

Represents participation.

Entities

Volunteer

Volunteer Application

Partner

CSR Partner

Contact Inquiry

Event Registration

Newsletter (Future)

Donation (Future)

Relationships

Volunteer

↓

Application

↓

Status

Partner

↓

Organization

↓

Partnership

---

# Media Domain

Centralized media management.

Entities

Media

Folder

Album

Gallery

Video

Document

PDF

Magazine File

Image

Every business module references Media.

Never duplicate uploaded files.

---

# Event Domain

Entities

Event

Venue

Speaker

Gallery

Registration

Schedule

Announcement

Future:

Live Stream

Attendance

Certificates

---

# Forms Domain

Every public form is stored centrally.

Entities

Contact Submission

Volunteer Submission

CSR Submission

Partnership Inquiry

General Inquiry

Each submission has:

Status

Assigned User

Notes

Created Date

Response History

---

# Users & Roles

Entities

User

Role

Permission

Session

Activity Log

Relationships

User

↓

Role

↓

Permissions

Never hardcode permissions.

---

# Settings

Entities

Site Settings

SEO

Social Links

Homepage Settings

Navigation

Footer

Contact Information

Theme Settings

These should be editable from the dashboard.

---

# Audit

Entities

Activity Log

Login Log

Error Log

Future Audit Trail

Every important administrative action should be traceable.

---

# Shared Entities

The following entities are shared across modules.

Media

SEO

Tags

Categories

Location

Files

Author

User

Avoid duplicating these structures.

---

# Entity Ownership

Foundation Module

↓

Foundation Data

Recognition Module

↓

Awards

Impact Module

↓

CSR

Knowledge Module

↓

Publications

Community Module

↓

Volunteers

Media Module

↓

Media Assets

Administration Module

↓

Users

Settings Module

↓

Configuration

Ownership should always be clear.

---

# Soft Delete Strategy

Use soft delete for:

Articles

Awards

CSR

Publications

Media

Users

Never permanently delete institutional records unless explicitly required.

---

# Timestamp Strategy

Every entity should include:

Created At

Updated At

Created By

Updated By

Deleted At (where applicable)

Maintain historical traceability.

---

# Future Ready

The database should support future entities without redesign.

Examples

Donation

Membership

Scholarship

Digital Museum

Research Repository

AI Knowledge

Multilingual Content

Mobile Applications

Event Ticketing

Digital Certificates

Volunteer Management

The architecture should accommodate these naturally.

---

# Business Rule

Every table must answer one question:

"What real-world institutional object does this represent?"

If the answer is unclear,

the entity should not exist.