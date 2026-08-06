# Graph Report - server  (2026-08-06)

## Corpus Check
- 310 files · ~61,851 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2357 nodes · 4969 edges · 191 communities (136 shown, 55 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5dc72e8a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Gallery & Media Module Hub
- Gallery Album DTOs
- Deployment Action DTOs
- Assets Controller
- Folders Controller
- Folders Repository Layer
- Documents Repository
- Participation Admin Controller
- Documents Controller
- Deployments Admin Controller
- Participation Service
- Folders Service Layer
- Deployments Service
- Folder Response DTOs
- Assets Repository
- Test Specifications
- Coordinator Remarks DTOs
- Asset Query DTOs
- Document Create DTOs
- Participation Bulk DTOs
- Assets Module Wiring
- Asset Operation DTOs
- Deployments Volunteer Controller
- Participation Volunteer Controller
- Documents Module Wiring
- Document Update DTOs
- Documents Query & List
- Folder Create DTOs
- Deployment Create DTOs
- Asset Service Operations
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 84
- Community 85
- Community 86
- Community 87
- Community 88
- Community 89
- Community 90
- Community 91
- Community 92
- Community 94
- Community 95
- Community 96
- Community 97
- Community 98
- Community 99
- Community 101
- Community 102
- Community 103
- Community 104
- Community 106
- Community 107
- Community 108
- Community 109
- Community 110
- Community 111
- Community 112
- Community 113
- Community 114
- Community 115
- Community 116
- Community 118
- Community 119
- Community 120
- Community 121
- Community 122
- Community 123
- Community 124
- Community 125
- Community 126
- Community 127
- Community 128
- Community 129
- Community 130
- Community 131
- Community 132
- Community 133
- Community 134
- Community 135
- Community 136
- Community 137
- Community 138
- Community 139
- Community 140
- Community 141
- Community 142
- Community 143
- Community 144
- Community 145
- Community 146
- Community 147
- Community 148
- Community 149
- Community 150
- Community 151
- Community 152
- Community 153
- Community 154
- Community 155
- Community 156
- Community 157
- Community 158
- Community 159
- Community 160
- Community 161
- Community 162
- Community 163
- Community 164
- Community 165
- Community 166
- Community 167
- Community 168
- Community 169
- Community 170
- Community 171
- Community 172
- Community 173
- Community 174
- Community 175
- Community 176
- Community 177
- Community 178
- Community 179
- Community 180
- Community 181
- Community 182
- Community 183
- Community 184
- Community 185
- Community 186
- Community 222
- Community 225

## God Nodes (most connected - your core abstractions)
1. `@nestjs/swagger` - 114 edges
2. `CurrentUser` - 96 edges
3. `Roles()` - 73 edges
4. `PaginationQueryDto` - 53 edges
5. `PrismaService` - 50 edges
6. `PaginationMeta` - 39 edges
7. `EntityNotFoundException` - 34 edges
8. `BusinessException` - 33 edges
9. `EventEditionsService` - 28 edges
10. `VolunteerParticipationService` - 26 edges

## Surprising Connections (you probably didn't know these)
- `bootstrap()` --indirect_call--> `AppModule`  [INFERRED]
  src/main.ts → src/app.module.ts
- `EditionsPublicController` --references--> `Public()`  [EXTRACTED]
  src/modules/community/event-editions/editions-public.controller.ts → src/common/decorators/public.decorator.ts
- `SchedulesPublicController` --references--> `Public()`  [EXTRACTED]
  src/modules/community/event-schedules/schedules-public.controller.ts → src/common/decorators/public.decorator.ts
- `SessionsPublicController` --references--> `Public()`  [EXTRACTED]
  src/modules/community/event-sessions/sessions-public.controller.ts → src/common/decorators/public.decorator.ts
- `SpeakersPublicController` --references--> `Public()`  [EXTRACTED]
  src/modules/community/event-speakers/speakers-public.controller.ts → src/common/decorators/public.decorator.ts

## Import Cycles
- None detected.

## Communities (191 total, 55 thin omitted)

### Community 0 - "Gallery & Media Module Hub"
Cohesion: 0.06
Nodes (34): ApiResponseDto, ApiProperty, ApiPropertyOptional, BusinessException, EntityConflictException, EntityNotFoundException, ForbiddenResourceException, PaginatedResult (+26 more)

### Community 1 - "Gallery Album DTOs"
Cohesion: 0.06
Nodes (33): ApiCookieAuth, HttpCode, Res, DASHBOARD_AUTH_CONSTANTS, DashboardAuthController, ApiBody, ApiOperation, ApiResponse (+25 more)

### Community 2 - "Deployment Action DTOs"
Cohesion: 0.06
Nodes (34): CreateDepartmentDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Matches, MaxLength (+26 more)

### Community 3 - "Assets Controller"
Cohesion: 0.15
Nodes (12): ApiConsumes, UploadedFiles, UseInterceptors, ApiPropertyOptional, IsArray, IsEnum, IsOptional, IsString (+4 more)

### Community 4 - "Folders Controller"
Cohesion: 0.05
Nodes (43): src/**/*, src/cache/*, src/common/*, src/config/*, src/database/*, src/modules/*, src/storage/*, compilerOptions (+35 more)

### Community 5 - "Folders Repository Layer"
Cohesion: 0.09
Nodes (8): ALLOWED_EXTENSIONS, ALLOWED_MIME_TYPES, BUCKET_MAP, FileValidationOptions, ImageMetadata, SupabaseStorageService, SupabaseUploadResult, Injectable

### Community 6 - "Documents Repository"
Cohesion: 0.06
Nodes (21): AppConfig, appSchema, AuthConfig, authSchema, CacheConfig, cacheSchema, DashboardAuthConfig, dashboardAuthSchema (+13 more)

### Community 7 - "Participation Admin Controller"
Cohesion: 0.06
Nodes (30): CommunityModule, Module, EventDepartmentsModule, Module, EventEditionsModule, Module, EventSchedulesModule, Module (+22 more)

### Community 8 - "Documents Controller"
Cohesion: 0.14
Nodes (11): FoldersController, ApiOperation, ApiTags, Body, Controller, Delete, Get, Param (+3 more)

### Community 9 - "Deployments Admin Controller"
Cohesion: 0.18
Nodes (14): CurrentUser, CoordinatorRemarksDto, ApiPropertyOptional, IsOptional, IsString, MaxLength, ParticipationAdminController, ApiOperation (+6 more)

### Community 10 - "Participation Service"
Cohesion: 0.15
Nodes (4): EventSpeakersRepository, Injectable, EventSpeakersService, Injectable

### Community 11 - "Folders Service Layer"
Cohesion: 0.15
Nodes (4): DocumentsRepository, Injectable, DocumentsService, Injectable

### Community 12 - "Deployments Service"
Cohesion: 0.17
Nodes (4): EventsRepository, Injectable, EventsService, Injectable

### Community 13 - "Folder Response DTOs"
Cohesion: 0.16
Nodes (4): PublicationCategoriesRepository, Injectable, PublicationCategoriesService, Injectable

### Community 14 - "Assets Repository"
Cohesion: 0.17
Nodes (11): EditionsAdminController, ApiOperation, ApiTags, Body, Controller, Delete, Get, Param (+3 more)

### Community 15 - "Test Specifications"
Cohesion: 0.09
Nodes (22): scripts, build, check-types, format, format:check, lint, lint:check, prisma:generate (+14 more)

### Community 16 - "Coordinator Remarks DTOs"
Cohesion: 0.24
Nodes (12): Roles(), GalleryController, ApiOperation, ApiTags, Body, Controller, Delete, Get (+4 more)

### Community 18 - "Document Create DTOs"
Cohesion: 0.13
Nodes (8): APP_CONSTANTS, CACHE_CONSTANTS, FILE_CONSTANTS, SortOrder, EntityStatus, ExceptionResponseBody, PrismaExceptionFilter, Catch

### Community 19 - "Participation Bulk DTOs"
Cohesion: 0.11
Nodes (5): PermissionsGuard, Injectable, RolesGuard, Injectable, AuthenticatedRequest

### Community 20 - "Assets Module Wiring"
Cohesion: 0.13
Nodes (5): SessionResponseDto, ApiProperty, ApiPropertyOptional, EventSessionsRepository, Injectable

### Community 21 - "Asset Operation DTOs"
Cohesion: 0.13
Nodes (11): EditionQueryDto, ApiPropertyOptional, IsEnum, IsInt, IsOptional, Min, Type, EditionListItemDto (+3 more)

### Community 22 - "Deployments Volunteer Controller"
Cohesion: 0.17
Nodes (11): EventsAdminController, ApiOperation, ApiTags, Body, Controller, Delete, Get, Param (+3 more)

### Community 23 - "Participation Volunteer Controller"
Cohesion: 0.18
Nodes (8): HealthController, ApiOperation, ApiTags, Controller, Get, HealthCheckResult, HealthService, Injectable

### Community 24 - "Documents Module Wiring"
Cohesion: 0.17
Nodes (11): PublicationCategoriesController, ApiOperation, ApiTags, Body, Controller, Delete, Get, Param (+3 more)

### Community 25 - "Document Update DTOs"
Cohesion: 0.17
Nodes (11): DocumentsController, ApiOperation, ApiTags, Body, Controller, Delete, Get, Param (+3 more)

### Community 26 - "Documents Query & List"
Cohesion: 0.11
Nodes (19): argon2, @aws-sdk/client-s3, class-validator, compression, helmet, @nestjs/config, @nestjs/core, dependencies (+11 more)

### Community 27 - "Folder Create DTOs"
Cohesion: 0.16
Nodes (5): RoleResponseDto, ApiProperty, ApiPropertyOptional, Injectable, VolunteerRolesRepository

### Community 28 - "Deployment Create DTOs"
Cohesion: 0.19
Nodes (11): AssetsController, ApiOperation, ApiTags, Body, Controller, Delete, Get, Param (+3 more)

### Community 30 - "Community 30"
Cohesion: 0.16
Nodes (11): SchedulesAdminController, ApiOperation, ApiTags, Body, Controller, Delete, Get, Param (+3 more)

### Community 31 - "Community 31"
Cohesion: 0.22
Nodes (4): EventShiftsRepository, Injectable, EventShiftsService, Injectable

### Community 34 - "Community 34"
Cohesion: 0.20
Nodes (8): AssetsService, Injectable, AssetQueryDto, ApiPropertyOptional, IsEnum, IsOptional, IsString, IsUUID

### Community 35 - "Community 35"
Cohesion: 0.15
Nodes (12): AppModule, Module, CorrelationIdMiddleware, Injectable, bootstrap(), DashboardAuthModule, Module, HealthModule (+4 more)

### Community 36 - "Community 36"
Cohesion: 0.12
Nodes (13): ApiPropertyOptional, IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, IsUrl (+5 more)

### Community 37 - "Community 37"
Cohesion: 0.16
Nodes (14): ApiParam, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Body, Controller (+6 more)

### Community 38 - "Community 38"
Cohesion: 0.18
Nodes (11): SessionsAdminController, ApiOperation, ApiTags, Body, Controller, Delete, Get, Param (+3 more)

### Community 39 - "Community 39"
Cohesion: 0.19
Nodes (11): EventShiftsController, ApiOperation, ApiTags, Body, Controller, Delete, Get, Param (+3 more)

### Community 40 - "Community 40"
Cohesion: 0.18
Nodes (11): SpeakersAdminController, ApiOperation, ApiTags, Body, Controller, Delete, Get, Param (+3 more)

### Community 41 - "Community 41"
Cohesion: 0.17
Nodes (3): Injectable, VolunteerApplicationsRepository, INELIGIBLE_EDITION_STATUSES

### Community 42 - "Community 42"
Cohesion: 0.20
Nodes (10): CertificatesAdminController, ApiOperation, ApiTags, Body, Controller, Delete, Get, Param (+2 more)

### Community 43 - "Community 43"
Cohesion: 0.13
Nodes (13): FolderResponseDto, ApiProperty, ApiPropertyOptional, MoveFolderDto, ApiPropertyOptional, IsEnum, IsInt, IsOptional (+5 more)

### Community 45 - "Community 45"
Cohesion: 0.23
Nodes (4): FoldersRepository, Injectable, FoldersService, Injectable

### Community 46 - "Community 46"
Cohesion: 0.13
Nodes (13): PaginationQueryDto, ApiPropertyOptional, IsEnum, IsInt, IsOptional, IsString, Max, Min (+5 more)

### Community 47 - "Community 47"
Cohesion: 0.21
Nodes (7): StrictParseUUIDPipe, Injectable, EventSessionsService, Injectable, SessionsPublicController, ApiTags, Controller

### Community 48 - "Community 48"
Cohesion: 0.15
Nodes (5): CertificatePdfService, Injectable, Injectable, VolunteerCertificatesRepository, ELIGIBLE_PARTICIPATION_STATUSES

### Community 51 - "Community 51"
Cohesion: 0.13
Nodes (15): CreateEditionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsEnum, IsInt, IsNotEmpty (+7 more)

### Community 53 - "Community 53"
Cohesion: 0.13
Nodes (10): ApiPropertyOptional, IsDateString, IsEnum, IsInt, IsOptional, IsString, IsUUID, MaxLength (+2 more)

### Community 54 - "Community 54"
Cohesion: 0.13
Nodes (15): CreateEventDto, ApiProperty, ApiPropertyOptional, IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty (+7 more)

### Community 55 - "Community 55"
Cohesion: 0.17
Nodes (8): EventQueryDto, ApiPropertyOptional, IsEnum, IsOptional, ApiOperation, Get, Param, Query

### Community 56 - "Community 56"
Cohesion: 0.13
Nodes (15): CreateVenueDto, ApiProperty, ApiPropertyOptional, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional (+7 more)

### Community 57 - "Community 57"
Cohesion: 0.19
Nodes (10): ApiOperation, ApiTags, Body, Controller, Delete, Get, Param, Patch (+2 more)

### Community 58 - "Community 58"
Cohesion: 0.18
Nodes (10): ApplicationsVolunteerController, ApiOperation, ApiTags, Body, Controller, Get, Param, Patch (+2 more)

### Community 59 - "Community 59"
Cohesion: 0.13
Nodes (15): CreateApplicationDto, ApiProperty, ApiPropertyOptional, IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional (+7 more)

### Community 61 - "Community 61"
Cohesion: 0.18
Nodes (9): SessionQueryDto, ApiPropertyOptional, IsEnum, IsOptional, IsUUID, ApiOperation, Get, Param (+1 more)

### Community 62 - "Community 62"
Cohesion: 0.18
Nodes (9): ScheduleQueryDto, ApiPropertyOptional, IsEnum, IsOptional, IsUUID, ApiOperation, Get, Param (+1 more)

### Community 63 - "Community 63"
Cohesion: 0.15
Nodes (10): ApiPropertyOptional, IsDateString, IsEnum, IsInt, IsOptional, IsString, IsUUID, MaxLength (+2 more)

### Community 64 - "Community 64"
Cohesion: 0.14
Nodes (14): CreateSpeakerDto, ApiProperty, ApiPropertyOptional, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString (+6 more)

### Community 65 - "Community 65"
Cohesion: 0.14
Nodes (14): CreateRoleDto, ApiProperty, ApiPropertyOptional, IsArray, IsInt, IsNotEmpty, IsOptional, IsString (+6 more)

### Community 66 - "Community 66"
Cohesion: 0.31
Nodes (3): Injectable, VolunteersRepository, VolunteerWithIdentities

### Community 67 - "Community 67"
Cohesion: 0.14
Nodes (14): RegisterVolunteerDto, ApiProperty, ApiPropertyOptional, IsArray, IsDateString, IsEmail, IsEnum, IsNotEmpty (+6 more)

### Community 68 - "Community 68"
Cohesion: 0.15
Nodes (13): CreateScheduleDto, ApiProperty, ApiPropertyOptional, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString (+5 more)

### Community 69 - "Community 69"
Cohesion: 0.15
Nodes (13): CreateSessionDto, ApiProperty, ApiPropertyOptional, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString (+5 more)

### Community 70 - "Community 70"
Cohesion: 0.15
Nodes (13): ApiPropertyOptional, IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, Matches (+5 more)

### Community 71 - "Community 71"
Cohesion: 0.15
Nodes (13): ApiPropertyOptional, IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUrl, Max (+5 more)

### Community 72 - "Community 72"
Cohesion: 0.27
Nodes (9): ApiOperation, Body, Param, Patch, AdminReviewDto, ApiPropertyOptional, IsOptional, IsString (+1 more)

### Community 73 - "Community 73"
Cohesion: 0.18
Nodes (7): Get, Query, ApplicationQueryDto, ApiPropertyOptional, IsEnum, IsOptional, IsUUID

### Community 74 - "Community 74"
Cohesion: 0.15
Nodes (9): CertificateResponseDto, ApiProperty, ApiPropertyOptional, GenerateCertificateDto, ApiProperty, ApiPropertyOptional, IsEnum, IsOptional (+1 more)

### Community 75 - "Community 75"
Cohesion: 0.18
Nodes (7): ParticipationQueryDto, ApiPropertyOptional, IsEnum, IsOptional, IsUUID, Get, Query

### Community 76 - "Community 76"
Cohesion: 0.15
Nodes (13): ApiPropertyOptional, IsArray, IsEnum, IsInt, IsOptional, IsString, IsUUID, Matches (+5 more)

### Community 77 - "Community 77"
Cohesion: 0.21
Nodes (8): ApiOperation, Body, Delete, Get, Param, Patch, Post, Query

### Community 78 - "Community 78"
Cohesion: 0.15
Nodes (13): CreatePublicationDto, ApiProperty, ApiPropertyOptional, IsArray, IsBoolean, IsDateString, IsEnum, IsInt (+5 more)

### Community 79 - "Community 79"
Cohesion: 0.15
Nodes (13): CreateDocumentDto, ApiProperty, ApiPropertyOptional, IsArray, IsBoolean, IsDateString, IsEnum, IsInt (+5 more)

### Community 80 - "Community 80"
Cohesion: 0.27
Nodes (4): Public(), EventsPublicController, ApiTags, Controller

### Community 81 - "Community 81"
Cohesion: 0.30
Nodes (7): EditionsPublicController, ApiOperation, ApiTags, Controller, Get, Param, Query

### Community 82 - "Community 82"
Cohesion: 0.17
Nodes (7): ShiftQueryDto, ApiPropertyOptional, IsEnum, IsOptional, ShiftResponseDto, ApiProperty, ApiPropertyOptional

### Community 83 - "Community 83"
Cohesion: 0.23
Nodes (4): SpeakerQueryDto, ApiPropertyOptional, IsEnum, IsOptional

### Community 84 - "Community 84"
Cohesion: 0.17
Nodes (12): ApiPropertyOptional, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString (+4 more)

### Community 85 - "Community 85"
Cohesion: 0.18
Nodes (10): AssetsModule, Module, DocumentsModule, Module, FoldersModule, Module, GalleryModule, Module (+2 more)

### Community 86 - "Community 86"
Cohesion: 0.23
Nodes (3): AssetResponseDto, ApiProperty, ApiPropertyOptional

### Community 87 - "Community 87"
Cohesion: 0.29
Nodes (11): BulkDeleteAssetsDto, CopyAssetDto, MoveAssetDto, ApiPropertyOptional, IsArray, IsEnum, IsOptional, IsString (+3 more)

### Community 88 - "Community 88"
Cohesion: 0.17
Nodes (12): CreateAlbumDto, ApiProperty, ApiPropertyOptional, IsArray, IsBoolean, IsEnum, IsInt, IsOptional (+4 more)

### Community 89 - "Community 89"
Cohesion: 0.27
Nodes (12): AddGalleryImageDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEnum, IsInt, IsOptional, IsString (+4 more)

### Community 90 - "Community 90"
Cohesion: 0.20
Nodes (3): Inject, CacheService, Injectable

### Community 91 - "Community 91"
Cohesion: 0.18
Nodes (10): build, builder, dockerfilePath, deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType (+2 more)

### Community 92 - "Community 92"
Cohesion: 0.18
Nodes (11): ApiPropertyOptional, IsEmail, IsEnum, IsInt, IsOptional, IsString, IsUrl, IsUUID (+3 more)

### Community 94 - "Community 94"
Cohesion: 0.18
Nodes (11): ApiPropertyOptional, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString (+3 more)

### Community 95 - "Community 95"
Cohesion: 0.18
Nodes (11): ApiPropertyOptional, IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUUID (+3 more)

### Community 96 - "Community 96"
Cohesion: 0.20
Nodes (4): LoggingInterceptor, Injectable, TimeoutInterceptor, Injectable

### Community 97 - "Community 97"
Cohesion: 0.36
Nodes (5): EventSchedulesService, Injectable, SchedulesPublicController, ApiTags, Controller

### Community 99 - "Community 99"
Cohesion: 0.20
Nodes (10): CreateShiftDto, ApiProperty, ApiPropertyOptional, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength (+2 more)

### Community 101 - "Community 101"
Cohesion: 0.24
Nodes (7): SpeakersPublicController, ApiOperation, ApiTags, Controller, Get, Param, Query

### Community 102 - "Community 102"
Cohesion: 0.36
Nodes (5): ApplicationsAdminController, ApiTags, Controller, Injectable, VolunteerApplicationsService

### Community 103 - "Community 103"
Cohesion: 0.36
Nodes (5): CertificatesVolunteerController, ApiTags, Controller, Injectable, VolunteerCertificatesService

### Community 104 - "Community 104"
Cohesion: 0.22
Nodes (5): CertificateQueryDto, ApiPropertyOptional, IsEnum, IsOptional, IsUUID

### Community 106 - "Community 106"
Cohesion: 0.36
Nodes (5): ParticipationVolunteerController, ApiTags, Controller, Injectable, VolunteerParticipationService

### Community 107 - "Community 107"
Cohesion: 0.20
Nodes (8): PublicationCategoryQueryDto, ApiPropertyOptional, IsBoolean, IsOptional, IsUUID, Type, PublicationCategoriesModule, Module

### Community 108 - "Community 108"
Cohesion: 0.20
Nodes (10): CreatePublicationCategoryDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsInt, IsOptional, IsString, IsUUID (+2 more)

### Community 110 - "Community 110"
Cohesion: 0.20
Nodes (10): CreateFolderDto, ApiProperty, ApiPropertyOptional, IsEnum, IsInt, IsOptional, IsString, IsUUID (+2 more)

### Community 111 - "Community 111"
Cohesion: 0.22
Nodes (9): ArrayMinSize, BulkParticipationDto, ApiProperty, ApiPropertyOptional, IsArray, IsOptional, IsString, IsUUID (+1 more)

### Community 112 - "Community 112"
Cohesion: 0.22
Nodes (9): eslint-config-prettier, devDependencies, eslint-config-prettier, @types/pdfkit, @types/supertest, @typescript-eslint/eslint-plugin, @types/pdfkit, @types/supertest (+1 more)

### Community 113 - "Community 113"
Cohesion: 0.22
Nodes (8): collection, compilerOptions, assets, deleteOutDir, plugins, watchAssets, $schema, sourceRoot

### Community 114 - "Community 114"
Cohesion: 0.22
Nodes (8): **/*.e2e-spec.ts, **/*.spec.ts, ./tsconfig.json, exclude, extends, dist, node_modules, test

### Community 115 - "Community 115"
Cohesion: 0.22
Nodes (9): ApiPropertyOptional, IsDateString, IsEnum, IsOptional, IsString, MaxLength, MinLength, Transform (+1 more)

### Community 116 - "Community 116"
Cohesion: 0.25
Nodes (5): ApiPropertyOptional, IsEnum, IsOptional, VenueQueryDto, Query

### Community 118 - "Community 118"
Cohesion: 0.36
Nodes (5): ApiTags, Controller, VolunteerRolesController, Injectable, VolunteerRolesService

### Community 119 - "Community 119"
Cohesion: 0.22
Nodes (9): ApiPropertyOptional, IsBoolean, IsInt, IsOptional, IsString, IsUUID, MaxLength, Min (+1 more)

### Community 120 - "Community 120"
Cohesion: 0.22
Nodes (3): PublicationResponseDto, ApiProperty, ApiPropertyOptional

### Community 121 - "Community 121"
Cohesion: 0.22
Nodes (7): DocumentQueryDto, ApiPropertyOptional, IsBoolean, IsEnum, IsOptional, IsString, Type

### Community 122 - "Community 122"
Cohesion: 0.39
Nodes (4): RedisCacheModule, Global, Module, redisProvider

### Community 123 - "Community 123"
Cohesion: 0.25
Nodes (3): ScheduleResponseDto, ApiProperty, ApiPropertyOptional

### Community 124 - "Community 124"
Cohesion: 0.25
Nodes (3): ApiProperty, ApiPropertyOptional, VenueResponseDto

### Community 125 - "Community 125"
Cohesion: 0.25
Nodes (3): ParticipationResponseDto, ApiProperty, ApiPropertyOptional

### Community 126 - "Community 126"
Cohesion: 0.25
Nodes (5): RoleQueryDto, ApiPropertyOptional, IsEnum, IsOptional, IsUUID

### Community 127 - "Community 127"
Cohesion: 0.25
Nodes (3): PublicationCategoryResponseDto, ApiProperty, ApiPropertyOptional

### Community 128 - "Community 128"
Cohesion: 0.25
Nodes (8): PublicationQueryDto, ApiPropertyOptional, IsBoolean, IsEnum, IsOptional, IsString, IsUUID, Type

### Community 129 - "Community 129"
Cohesion: 0.25
Nodes (3): DocumentResponseDto, ApiProperty, ApiPropertyOptional

### Community 130 - "Community 130"
Cohesion: 0.25
Nodes (8): AlbumQueryDto, ApiPropertyOptional, IsBoolean, IsEnum, IsOptional, IsString, IsUUID, Transform

### Community 131 - "Community 131"
Cohesion: 0.29
Nodes (3): DepartmentResponseDto, ApiProperty, ApiPropertyOptional

### Community 132 - "Community 132"
Cohesion: 0.33
Nodes (4): ApiOperation, Get, Param, Query

### Community 133 - "Community 133"
Cohesion: 0.29
Nodes (7): CreateVolunteerIdentityDto, ApiProperty, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength

### Community 134 - "Community 134"
Cohesion: 0.33
Nodes (5): engines, node, name, private, version

### Community 135 - "Community 135"
Cohesion: 0.40
Nodes (3): ResponseTransformInterceptor, Injectable, ApiResponseShape

### Community 136 - "Community 136"
Cohesion: 0.47
Nodes (4): EventListItemDto, EventResponseDto, ApiProperty, ApiPropertyOptional

### Community 137 - "Community 137"
Cohesion: 0.40
Nodes (4): ApiOperation, Get, Param, Query

### Community 138 - "Community 138"
Cohesion: 0.60
Nodes (4): AdminApplicationResponseDto, ApplicationResponseDto, ApiProperty, ApiPropertyOptional

### Community 139 - "Community 139"
Cohesion: 0.60
Nodes (4): AlbumResponseDto, GalleryImageResponseDto, ApiProperty, ApiPropertyOptional

### Community 140 - "Community 140"
Cohesion: 0.50
Nodes (3): Development, Production Build, Ruchi Prativa Foundation — Server Application

### Community 142 - "Community 142"
Cohesion: 0.50
Nodes (3): SpeakerResponseDto, ApiProperty, ApiPropertyOptional

### Community 222 - "Community 222"
Cohesion: 0.29
Nodes (8): Exclude, Expose, maskDocumentNumber(), ApiProperty, ApiPropertyOptional, VolunteerIdentityData, VolunteerIdentityResponseDto, VolunteerResponseDto

### Community 225 - "Community 225"
Cohesion: 0.06
Nodes (31): Req, ApproveVolunteerDto, ApiPropertyOptional, IsOptional, IsString, MaxLength, PendingVolunteersQueryDto, ApiPropertyOptional (+23 more)

## Knowledge Gaps
- **181 isolated node(s):** `config`, `$schema`, `collection`, `sourceRoot`, `deleteOutDir` (+176 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **55 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/swagger` connect `Community 50` to `Gallery & Media Module Hub`, `Gallery Album DTOs`, `Deployment Action DTOs`, `Community 131`, `Assets Controller`, `Community 129`, `Community 136`, `Community 138`, `Community 139`, `Community 142`, `Asset Query DTOs`, `Document Create DTOs`, `Participation Bulk DTOs`, `Asset Operation DTOs`, `Participation Volunteer Controller`, `Asset Service Operations`, `Community 31`, `Community 32`, `Community 34`, `Community 35`, `Community 36`, `Community 43`, `Community 45`, `Community 46`, `Community 47`, `Community 53`, `Community 66`, `Community 74`, `Community 80`, `Community 82`, `Community 83`, `Community 86`, `Community 87`, `Community 222`, `Community 97`, `Community 225`, `Community 102`, `Community 103`, `Community 106`, `Community 107`, `Community 113`, `Community 118`, `Community 120`, `Community 121`, `Community 123`, `Community 124`, `Community 125`, `Community 127`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `Deployments Admin Controller` to `Deployment Action DTOs`, `Assets Controller`, `Community 132`, `Documents Controller`, `Community 137`, `Assets Repository`, `Coordinator Remarks DTOs`, `Asset Query DTOs`, `Participation Bulk DTOs`, `Deployments Volunteer Controller`, `Documents Module Wiring`, `Document Update DTOs`, `Deployment Create DTOs`, `Asset Service Operations`, `Community 30`, `Community 31`, `Community 32`, `Community 34`, `Community 38`, `Community 39`, `Community 40`, `Community 42`, `Community 45`, `Community 47`, `Community 57`, `Community 58`, `Community 72`, `Community 77`, `Community 80`, `Community 83`, `Community 97`, `Community 225`, `Community 102`, `Community 103`, `Community 106`, `Community 107`, `Community 118`, `Community 121`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `Roles()` connect `Coordinator Remarks DTOs` to `Deployment Action DTOs`, `Assets Controller`, `Documents Controller`, `Deployments Admin Controller`, `Assets Repository`, `Asset Query DTOs`, `Participation Bulk DTOs`, `Deployments Volunteer Controller`, `Documents Module Wiring`, `Document Update DTOs`, `Deployment Create DTOs`, `Asset Service Operations`, `Community 30`, `Community 31`, `Community 32`, `Community 34`, `Community 38`, `Community 39`, `Community 40`, `Community 42`, `Community 45`, `Community 47`, `Community 57`, `Community 58`, `Community 80`, `Community 83`, `Community 97`, `Community 225`, `Community 102`, `Community 103`, `Community 106`, `Community 107`, `Community 118`, `Community 121`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **What connects `config`, `$schema`, `collection` to the rest of the system?**
  _181 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Gallery & Media Module Hub` be split into smaller, more focused modules?**
  _Cohesion score 0.0578790141896938 - nodes in this community are weakly interconnected._
- **Should `Gallery Album DTOs` be split into smaller, more focused modules?**
  _Cohesion score 0.06398730830248546 - nodes in this community are weakly interconnected._
- **Should `Deployment Action DTOs` be split into smaller, more focused modules?**
  _Cohesion score 0.05536723163841808 - nodes in this community are weakly interconnected._