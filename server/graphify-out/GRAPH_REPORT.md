# Graph Report - src/modules/community  (2026-08-01)

## Corpus Check
- Corpus is ~20,727 words - fits in a single context window. You may not need a graph.

## Summary
- 739 nodes · 1379 edges · 47 communities (44 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Volunteer Verification
- Edition Query DTOs
- Edition Admin Controller
- Event Shifts Repository
- Volunteers Repository
- Community Module Wiring
- Event Shifts Controller
- Volunteer Upload API
- Edition Response DTOs
- Event Shifts DTOs
- Event Response DTOs
- Events Admin Controller
- Volunteer Identity DTOs
- Departments Repository
- Departments Controller
- Venues Controller
- Volunteer Roles Repository
- Volunteer Roles Controller
- Create Edition DTO
- Editions Public Controller
- Create Event DTO
- Create Venue DTO
- Register Volunteer DTO
- Shifts Module Tests
- Create Role DTO
- Venue Response DTOs
- Update Edition DTO
- Update Event DTO
- Events Public Controller
- Events Repository
- Update Venue DTO
- Update Role DTO
- Department Query DTO
- Department Response DTO
- Event Query DTO
- Role Query DTO
- Create Department DTO
- Create Shift DTO
- Volunteer Response DTO
- Venue Query DTO
- Update Shift DTO
- Venue DTOs Index
- Role DTOs Index
- Departments Module Tests

## God Nodes (most connected - your core abstractions)
1. `EventEditionsService` - 28 edges
2. `EventsService` - 22 edges
3. `EventEditionsRepository` - 20 edges
4. `RegisterVolunteerDto` - 20 edges
5. `CreateEditionDto` - 19 edges
6. `CreateEventDto` - 19 edges
7. `CreateVenueDto` - 19 edges
8. `EditionQueryDto` - 18 edges
9. `CreateRoleDto` - 18 edges
10. `UpdateEditionDto` - 17 edges

## Surprising Connections (you probably didn't know these)
- `EditionResponseDto` --references--> `ApiProperty`  [EXTRACTED]
  event-editions/dto/edition-response.dto.ts →   _Bridges community 8 → community 1_

## Import Cycles
- None detected.

## Communities (47 total, 3 thin omitted)

### Community 0 - "Volunteer Verification"
Cohesion: 0.05
Nodes (41): Req, ApproveVolunteerDto, ApiPropertyOptional, IsOptional, IsString, MaxLength, PendingVolunteersQueryDto, ApiPropertyOptional (+33 more)

### Community 1 - "Edition Query DTOs"
Cohesion: 0.11
Nodes (11): EditionQueryDto, ApiPropertyOptional, IsEnum, IsInt, IsOptional, Min, EditionListItemDto, ApiProperty (+3 more)

### Community 2 - "Edition Admin Controller"
Cohesion: 0.21
Nodes (13): EditionsAdminController, ApiOperation, ApiTags, Body, Controller, CurrentUser, Delete, Get (+5 more)

### Community 3 - "Event Shifts Repository"
Cohesion: 0.17
Nodes (4): EventShiftsRepository, Injectable, EventShiftsService, Injectable

### Community 4 - "Volunteers Repository"
Cohesion: 0.16
Nodes (4): Injectable, VolunteersRepository, Injectable, VolunteersService

### Community 5 - "Community Module Wiring"
Cohesion: 0.11
Nodes (18): CommunityModule, Module, EventDepartmentsModule, Module, EventEditionsModule, Module, EventShiftsModule, Module (+10 more)

### Community 6 - "Event Shifts Controller"
Cohesion: 0.18
Nodes (13): EventShiftsController, ApiOperation, ApiTags, Body, Controller, CurrentUser, Delete, Get (+5 more)

### Community 7 - "Volunteer Upload API"
Cohesion: 0.16
Nodes (14): ApiBody, ApiConsumes, ApiParam, ApiResponse, UploadedFiles, UseInterceptors, ApiOperation, ApiTags (+6 more)

### Community 8 - "Edition Response DTOs"
Cohesion: 0.20
Nodes (5): EditionResponseDto, ApiPropertyOptional, EventEditionsService, Injectable, VALID_TRANSITIONS

### Community 10 - "Event Shifts DTOs"
Cohesion: 0.16
Nodes (7): ShiftQueryDto, ApiPropertyOptional, IsEnum, IsOptional, ShiftResponseDto, ApiProperty, ApiPropertyOptional

### Community 11 - "Event Response DTOs"
Cohesion: 0.25
Nodes (6): EventListItemDto, EventResponseDto, ApiProperty, ApiPropertyOptional, EventsService, Injectable

### Community 12 - "Events Admin Controller"
Cohesion: 0.22
Nodes (11): EventsAdminController, ApiOperation, ApiTags, Body, Controller, CurrentUser, Delete, Param (+3 more)

### Community 13 - "Volunteer Identity DTOs"
Cohesion: 0.23
Nodes (8): CreateVolunteerIdentityDto, ApiProperty, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, VolunteerWithIdentities

### Community 14 - "Departments Repository"
Cohesion: 0.25
Nodes (4): EventDepartmentsRepository, Injectable, EventDepartmentsService, Injectable

### Community 15 - "Departments Controller"
Cohesion: 0.19
Nodes (11): EventDepartmentsController, ApiOperation, ApiTags, Body, Controller, CurrentUser, Delete, Param (+3 more)

### Community 16 - "Venues Controller"
Cohesion: 0.19
Nodes (11): ApiOperation, ApiTags, Body, Controller, CurrentUser, Delete, Param, Patch (+3 more)

### Community 18 - "Volunteer Roles Controller"
Cohesion: 0.19
Nodes (11): ApiOperation, ApiTags, Body, Controller, CurrentUser, Delete, Param, Patch (+3 more)

### Community 19 - "Create Edition DTO"
Cohesion: 0.13
Nodes (15): CreateEditionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsEnum, IsInt, IsNotEmpty (+7 more)

### Community 20 - "Editions Public Controller"
Cohesion: 0.22
Nodes (8): EditionsPublicController, ApiOperation, ApiTags, Controller, Get, Param, Public, Query

### Community 21 - "Create Event DTO"
Cohesion: 0.13
Nodes (15): CreateEventDto, ApiProperty, ApiPropertyOptional, IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty (+7 more)

### Community 22 - "Create Venue DTO"
Cohesion: 0.13
Nodes (15): CreateVenueDto, ApiProperty, ApiPropertyOptional, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional (+7 more)

### Community 23 - "Register Volunteer DTO"
Cohesion: 0.14
Nodes (14): IsEmail, RegisterVolunteerDto, ApiProperty, ApiPropertyOptional, IsArray, IsDateString, IsEnum, IsNotEmpty (+6 more)

### Community 24 - "Shifts Module Tests"
Cohesion: 0.29
Nodes (4): Injectable, VenuesRepository, Injectable, VenuesService

### Community 25 - "Create Role DTO"
Cohesion: 0.14
Nodes (14): CreateRoleDto, ApiProperty, ApiPropertyOptional, IsArray, IsInt, IsNotEmpty, IsOptional, IsString (+6 more)

### Community 26 - "Venue Response DTOs"
Cohesion: 0.15
Nodes (9): ApiPropertyOptional, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength, Transform (+1 more)

### Community 27 - "Update Edition DTO"
Cohesion: 0.15
Nodes (13): ApiPropertyOptional, IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, IsUrl (+5 more)

### Community 28 - "Update Event DTO"
Cohesion: 0.15
Nodes (13): ApiPropertyOptional, IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, Matches (+5 more)

### Community 29 - "Events Public Controller"
Cohesion: 0.18
Nodes (8): EventsPublicController, ApiOperation, ApiTags, Controller, Get, Param, Public, Query

### Community 31 - "Update Venue DTO"
Cohesion: 0.15
Nodes (13): ApiPropertyOptional, IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUrl, Max (+5 more)

### Community 32 - "Update Role DTO"
Cohesion: 0.15
Nodes (13): ApiPropertyOptional, IsArray, IsEnum, IsInt, IsOptional, IsString, IsUUID, Matches (+5 more)

### Community 33 - "Department Query DTO"
Cohesion: 0.20
Nodes (6): DepartmentQueryDto, ApiPropertyOptional, IsEnum, IsOptional, Get, Query

### Community 34 - "Department Response DTO"
Cohesion: 0.22
Nodes (3): DepartmentResponseDto, ApiProperty, ApiPropertyOptional

### Community 35 - "Event Query DTO"
Cohesion: 0.24
Nodes (6): EventQueryDto, ApiPropertyOptional, IsEnum, IsOptional, Get, Query

### Community 37 - "Role Query DTO"
Cohesion: 0.20
Nodes (7): RoleQueryDto, ApiPropertyOptional, IsEnum, IsOptional, IsUUID, Get, Query

### Community 38 - "Create Department DTO"
Cohesion: 0.20
Nodes (10): CreateDepartmentDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Matches, MaxLength (+2 more)

### Community 39 - "Create Shift DTO"
Cohesion: 0.20
Nodes (10): CreateShiftDto, ApiProperty, ApiPropertyOptional, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength (+2 more)

### Community 40 - "Volunteer Response DTO"
Cohesion: 0.29
Nodes (8): Exclude, Expose, maskDocumentNumber(), ApiProperty, ApiPropertyOptional, VolunteerIdentityData, VolunteerIdentityResponseDto, VolunteerResponseDto

### Community 41 - "Venue Query DTO"
Cohesion: 0.22
Nodes (6): ApiPropertyOptional, IsEnum, IsOptional, VenueQueryDto, Get, Query

### Community 42 - "Update Shift DTO"
Cohesion: 0.22
Nodes (9): ApiPropertyOptional, IsDateString, IsEnum, IsOptional, IsString, MaxLength, MinLength, Transform (+1 more)

### Community 44 - "Venue DTOs Index"
Cohesion: 0.25
Nodes (3): ApiProperty, ApiPropertyOptional, VenueResponseDto

### Community 45 - "Role DTOs Index"
Cohesion: 0.25
Nodes (3): RoleResponseDto, ApiProperty, ApiPropertyOptional

## Knowledge Gaps
- **4 isolated node(s):** `VALID_TRANSITIONS`, `VolunteerWithIdentitiesAndVerifications`, `PendingVolunteerRow`, `VolunteerIdentityData`
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `EventEditionsService` connect `Edition Response DTOs` to `Event Editions Repository`, `Editions Public Controller`, `Edition Query DTOs`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `EditionsAdminController` connect `Edition Admin Controller` to `Edition Response DTOs`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `EventsAdminController` connect `Events Admin Controller` to `Event Query DTO`, `Event Response DTOs`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `VALID_TRANSITIONS`, `VolunteerWithIdentitiesAndVerifications`, `PendingVolunteerRow` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Volunteer Verification` be split into smaller, more focused modules?**
  _Cohesion score 0.05261261261261261 - nodes in this community are weakly interconnected._
- **Should `Edition Query DTOs` be split into smaller, more focused modules?**
  _Cohesion score 0.1076923076923077 - nodes in this community are weakly interconnected._
- **Should `Community Module Wiring` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._