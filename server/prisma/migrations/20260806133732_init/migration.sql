-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER');

-- CreateEnum
CREATE TYPE "EntityStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED', 'PENDING');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "IdentityDocumentType" AS ENUM ('AADHAAR', 'PAN', 'VOTER_ID', 'DRIVING_LICENSE', 'PASSPORT');

-- CreateEnum
CREATE TYPE "IdentityVerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VolunteerStatus" AS ENUM ('PENDING_VERIFICATION', 'VERIFIED', 'REJECTED', 'SUSPENDED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "VerificationAction" AS ENUM ('APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('AWARD', 'CULTURAL', 'COMMUNITY', 'CSR', 'HEALTHCARE', 'EDUCATION', 'ENVIRONMENT', 'SOCIAL', 'VOLUNTEER', 'WORKSHOP', 'OTHER');

-- CreateEnum
CREATE TYPE "EditionStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'ONGOING', 'COMPLETED', 'CANCELLED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "EditionVisibility" AS ENUM ('PUBLIC', 'PRIVATE', 'INVITE_ONLY');

-- CreateEnum
CREATE TYPE "VenueType" AS ENUM ('INDOOR', 'OUTDOOR', 'HYBRID');

-- CreateEnum
CREATE TYPE "VenueStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'UNDER_MAINTENANCE');

-- CreateEnum
CREATE TYPE "ShiftStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "SpeakerStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('DRAFT', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'WITHDRAWN', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ParticipationStatus" AS ENUM ('NOT_STARTED', 'ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CertificateType" AS ENUM ('PARTICIPATION', 'APPRECIATION', 'EXCELLENCE', 'SPECIAL');

-- CreateEnum
CREATE TYPE "CertificateStatus" AS ENUM ('DRAFT', 'ISSUED', 'REVOKED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'DOCUMENT', 'VIDEO', 'AUDIO', 'OTHER');

-- CreateEnum
CREATE TYPE "MediaVisibility" AS ENUM ('PUBLIC', 'PRIVATE', 'INTERNAL');

-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'PROCESSING', 'FAILED');

-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('PUBLICATION', 'ANNUAL_REPORT', 'POLICY', 'CERTIFICATE', 'PRESS_RELEASE', 'DOWNLOAD', 'OTHER');

-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "ContributorRole" AS ENUM ('PRIMARY_AUTHOR', 'CO_AUTHOR', 'EDITOR', 'DESIGNER', 'PHOTOGRAPHER', 'CONTRIBUTOR', 'TRANSLATOR', 'REVIEWER');

-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('DOWNLOAD', 'VIEW', 'READ');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "status" "EntityStatus" NOT NULL DEFAULT 'ACTIVE',
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,
    "deleted_by" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteers" (
    "id" UUID NOT NULL,
    "volunteer_code" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "gender" "Gender" NOT NULL,
    "blood_group" "BloodGroup" NOT NULL DEFAULT 'UNKNOWN',
    "occupation" TEXT,
    "organization" TEXT,
    "address_line_1" TEXT NOT NULL,
    "address_line_2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "profile_photo_key" TEXT,
    "emergency_name" TEXT,
    "emergency_phone" TEXT,
    "motivation" TEXT,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "available_days" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "volunteer_status" "VolunteerStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "status" "EntityStatus" NOT NULL DEFAULT 'PENDING',
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,
    "deleted_by" UUID,

    CONSTRAINT "volunteers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_identities" (
    "id" UUID NOT NULL,
    "volunteer_id" UUID NOT NULL,
    "document_type" "IdentityDocumentType" NOT NULL,
    "document_number" TEXT NOT NULL,
    "document_file_key" TEXT,
    "verification_status" "IdentityVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "verified_at" TIMESTAMP(3),
    "verified_by" UUID,
    "rejection_reason" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "volunteer_identities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_verifications" (
    "id" UUID NOT NULL,
    "volunteer_id" UUID NOT NULL,
    "action" "VerificationAction" NOT NULL,
    "previous_status" "VolunteerStatus" NOT NULL,
    "current_status" "VolunteerStatus" NOT NULL,
    "remarks" TEXT,
    "verified_by_id" UUID NOT NULL,
    "verification_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "volunteer_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL,
    "event_code" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "short_description" VARCHAR(500) NOT NULL,
    "detailed_description" TEXT,
    "event_type" "EventType" NOT NULL,
    "logo_asset_key" TEXT,
    "default_banner_key" TEXT,
    "primary_color" VARCHAR(7),
    "secondary_color" VARCHAR(7),
    "theme_config" JSONB,
    "is_recurring" BOOLEAN NOT NULL DEFAULT true,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" VARCHAR(70),
    "seo_description" VARCHAR(160),
    "seo_keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by_id" UUID,
    "updated_by" UUID,
    "deleted_by" UUID,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_editions" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "edition_code" TEXT NOT NULL,
    "edition_name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "edition_number" INTEGER NOT NULL DEFAULT 1,
    "slug" TEXT NOT NULL,
    "theme" TEXT,
    "short_description" VARCHAR(500) NOT NULL,
    "detailed_description" TEXT,
    "venue" TEXT NOT NULL,
    "venue_address" TEXT,
    "google_maps_url" TEXT,
    "registration_opens" TIMESTAMP(3),
    "registration_closes" TIMESTAMP(3),
    "event_starts" TIMESTAMP(3) NOT NULL,
    "event_ends" TIMESTAMP(3) NOT NULL,
    "volunteer_capacity" INTEGER NOT NULL DEFAULT 0,
    "max_registrations" INTEGER NOT NULL DEFAULT 0,
    "banner_image_key" TEXT,
    "cover_image_key" TEXT,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "visibility" "EditionVisibility" NOT NULL DEFAULT 'PUBLIC',
    "edition_status" "EditionStatus" NOT NULL DEFAULT 'DRAFT',
    "registration_enabled" BOOLEAN NOT NULL DEFAULT false,
    "attendance_enabled" BOOLEAN NOT NULL DEFAULT false,
    "certificate_enabled" BOOLEAN NOT NULL DEFAULT false,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by_id" UUID,
    "updated_by" UUID,
    "deleted_by" UUID,
    "venue_id" UUID,

    CONSTRAINT "event_editions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venues" (
    "id" UUID NOT NULL,
    "venue_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "district" TEXT,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "google_maps_url" TEXT,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "venue_type" "VenueType" NOT NULL DEFAULT 'INDOOR',
    "accessibility_details" TEXT,
    "parking_info" TEXT,
    "emergency_contact" TEXT,
    "venue_status" "VenueStatus" NOT NULL DEFAULT 'ACTIVE',
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,
    "deleted_by" UUID,

    CONSTRAINT "venues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_departments" (
    "id" UUID NOT NULL,
    "department_code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "color" VARCHAR(7),
    "status" "EntityStatus" NOT NULL DEFAULT 'ACTIVE',
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,
    "deleted_by" UUID,

    CONSTRAINT "event_departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_roles" (
    "id" UUID NOT NULL,
    "role_code" TEXT NOT NULL,
    "department_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "required_skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "min_volunteers" INTEGER NOT NULL DEFAULT 1,
    "max_volunteers" INTEGER NOT NULL DEFAULT 10,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "color" VARCHAR(7),
    "icon_asset_key" TEXT,
    "status" "EntityStatus" NOT NULL DEFAULT 'ACTIVE',
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,
    "deleted_by" UUID,

    CONSTRAINT "volunteer_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_shifts" (
    "id" UUID NOT NULL,
    "shift_code" TEXT NOT NULL,
    "edition_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "status" "ShiftStatus" NOT NULL DEFAULT 'ACTIVE',
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,
    "deleted_by" UUID,

    CONSTRAINT "event_shifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_speakers" (
    "id" UUID NOT NULL,
    "speaker_code" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" TEXT NOT NULL,
    "designation" VARCHAR(255),
    "organization" VARCHAR(255),
    "biography" TEXT,
    "short_bio" VARCHAR(500),
    "photo_asset_id" UUID,
    "email" VARCHAR(255),
    "phone" VARCHAR(20),
    "website" TEXT,
    "linkedin_url" TEXT,
    "twitter_url" TEXT,
    "speaker_status" "SpeakerStatus" NOT NULL DEFAULT 'ACTIVE',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "event_speakers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_sessions" (
    "id" UUID NOT NULL,
    "session_code" TEXT NOT NULL,
    "edition_id" UUID NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "session_type" VARCHAR(100),
    "speaker_id" UUID,
    "venue_id" UUID,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "capacity" INTEGER,
    "session_status" "SessionStatus" NOT NULL DEFAULT 'DRAFT',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "event_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_schedules" (
    "id" UUID NOT NULL,
    "schedule_code" TEXT NOT NULL,
    "edition_id" UUID NOT NULL,
    "session_id" UUID,
    "speaker_id" UUID,
    "venue_id" UUID,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "schedule_status" "ScheduleStatus" NOT NULL DEFAULT 'DRAFT',
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "event_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_applications" (
    "id" UUID NOT NULL,
    "application_code" TEXT NOT NULL,
    "volunteer_id" UUID NOT NULL,
    "edition_id" UUID NOT NULL,
    "application_status" "ApplicationStatus" NOT NULL DEFAULT 'DRAFT',
    "motivation" TEXT,
    "relevant_experience" TEXT,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "medical_conditions" TEXT,
    "emergency_contact_name" TEXT NOT NULL,
    "emergency_contact_phone" TEXT NOT NULL,
    "availability_notes" TEXT,
    "preferred_shift_id" UUID,
    "preferred_department_id" UUID,
    "preferred_role_id" UUID,
    "expected_hours" INTEGER,
    "terms_accepted" BOOLEAN NOT NULL DEFAULT false,
    "admin_remarks" TEXT,
    "submitted_at" TIMESTAMP(3),
    "reviewed_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,
    "deleted_by" UUID,

    CONSTRAINT "volunteer_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_participations" (
    "id" UUID NOT NULL,
    "participation_code" TEXT NOT NULL,
    "application_id" UUID NOT NULL,
    "volunteer_id" UUID NOT NULL,
    "edition_id" UUID NOT NULL,
    "participation_status" "ParticipationStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "coordinator_remarks" TEXT,
    "completion_notes" TEXT,
    "certificate_eligible" BOOLEAN NOT NULL DEFAULT false,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "volunteer_participations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_certificates" (
    "id" UUID NOT NULL,
    "certificate_number" TEXT NOT NULL,
    "volunteer_id" UUID NOT NULL,
    "participation_id" UUID NOT NULL,
    "edition_id" UUID NOT NULL,
    "certificate_type" "CertificateType" NOT NULL DEFAULT 'PARTICIPATION',
    "certificate_status" "CertificateStatus" NOT NULL DEFAULT 'DRAFT',
    "issue_date" TIMESTAMP(3),
    "issued_by" UUID,
    "verification_token" TEXT NOT NULL,
    "bucket_name" TEXT,
    "object_path" TEXT,
    "public_url" TEXT,
    "content_type" TEXT,
    "file_size" INTEGER,
    "checksum" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "volunteer_certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_folders" (
    "id" UUID NOT NULL,
    "folder_code" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "parent_id" UUID,
    "path" TEXT NOT NULL,
    "depth" INTEGER NOT NULL DEFAULT 0,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "visibility" "MediaVisibility" NOT NULL DEFAULT 'PUBLIC',
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "media_folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_assets" (
    "id" UUID NOT NULL,
    "media_code" TEXT NOT NULL,
    "original_filename" VARCHAR(500) NOT NULL,
    "stored_filename" VARCHAR(500) NOT NULL,
    "bucket_name" VARCHAR(100) NOT NULL,
    "object_path" TEXT NOT NULL,
    "public_url" TEXT,
    "content_type" VARCHAR(100) NOT NULL,
    "extension" VARCHAR(20) NOT NULL,
    "file_size" INTEGER NOT NULL,
    "media_type" "MediaType" NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "duration" DOUBLE PRECISION,
    "checksum" VARCHAR(128) NOT NULL,
    "uploaded_by" UUID NOT NULL,
    "folder_id" UUID,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "description" TEXT,
    "alt_text" VARCHAR(500),
    "visibility" "MediaVisibility" NOT NULL DEFAULT 'PUBLIC',
    "asset_status" "AssetStatus" NOT NULL DEFAULT 'ACTIVE',
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_albums" (
    "id" UUID NOT NULL,
    "album_code" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "cover_image_id" UUID,
    "category" VARCHAR(100),
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "visibility" "MediaVisibility" NOT NULL DEFAULT 'PUBLIC',
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "event_edition_id" UUID,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "gallery_albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_images" (
    "id" UUID NOT NULL,
    "album_id" UUID NOT NULL,
    "asset_id" UUID NOT NULL,
    "caption" VARCHAR(500),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "visibility" "MediaVisibility" NOT NULL DEFAULT 'PUBLIC',
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,

    CONSTRAINT "gallery_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" UUID NOT NULL,
    "document_code" TEXT NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "slug" TEXT NOT NULL,
    "asset_id" UUID NOT NULL,
    "category" "DocumentCategory" NOT NULL DEFAULT 'OTHER',
    "summary" TEXT,
    "author" VARCHAR(255),
    "publish_date" TIMESTAMP(3),
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "visibility" "MediaVisibility" NOT NULL DEFAULT 'PUBLIC',
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "download_count" INTEGER NOT NULL DEFAULT 0,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publication_categories" (
    "id" UUID NOT NULL,
    "category_code" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "parent_id" UUID,
    "icon_url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "publication_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publications" (
    "id" UUID NOT NULL,
    "publication_code" TEXT NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" VARCHAR(500),
    "description" TEXT,
    "summary" TEXT,
    "category_id" UUID NOT NULL,
    "language" VARCHAR(10) NOT NULL DEFAULT 'en',
    "isbn" VARCHAR(20),
    "issn" VARCHAR(20),
    "publication_date" TIMESTAMP(3),
    "release_date" TIMESTAMP(3),
    "reading_time" INTEGER,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "PublicationStatus" NOT NULL DEFAULT 'DRAFT',
    "visibility" "MediaVisibility" NOT NULL DEFAULT 'PUBLIC',
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "cover_image_id" UUID,
    "pdf_asset_id" UUID,
    "thumbnail_id" UUID,
    "seo_title" VARCHAR(255),
    "seo_description" TEXT,
    "seo_keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "canonical_url" TEXT,
    "download_count" INTEGER NOT NULL DEFAULT 0,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 1,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publication_editions" (
    "id" UUID NOT NULL,
    "edition_code" TEXT NOT NULL,
    "publication_id" UUID NOT NULL,
    "edition_number" INTEGER NOT NULL,
    "volume_number" INTEGER,
    "issue_number" INTEGER,
    "title" VARCHAR(500),
    "description" TEXT,
    "publication_date" TIMESTAMP(3),
    "cover_image_id" UUID,
    "pdf_asset_id" UUID,
    "page_count" INTEGER,
    "status" "PublicationStatus" NOT NULL DEFAULT 'DRAFT',
    "visibility" "MediaVisibility" NOT NULL DEFAULT 'PUBLIC',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 1,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "publication_editions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publication_contributors" (
    "id" UUID NOT NULL,
    "publication_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "bio" TEXT,
    "avatar_url" TEXT,
    "role" "ContributorRole" NOT NULL DEFAULT 'CONTRIBUTOR',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "publication_contributors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publication_tags" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" TEXT NOT NULL,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "publication_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publication_tag_links" (
    "publication_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "publication_tag_links_pkey" PRIMARY KEY ("publication_id","tag_id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" UUID NOT NULL,
    "article_code" TEXT NOT NULL,
    "publication_id" UUID,
    "title" VARCHAR(500) NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" VARCHAR(500),
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "author_name" VARCHAR(255) NOT NULL,
    "author_bio" TEXT,
    "author_avatar_url" TEXT,
    "featured_image_id" UUID,
    "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "reading_time" INTEGER,
    "status" "ArticleStatus" NOT NULL DEFAULT 'DRAFT',
    "visibility" "MediaVisibility" NOT NULL DEFAULT 'PUBLIC',
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "seo_title" VARCHAR(255),
    "seo_description" TEXT,
    "seo_keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 1,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "download_history" (
    "id" UUID NOT NULL,
    "publication_id" UUID NOT NULL,
    "user_id" UUID,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "device_type" VARCHAR(50),
    "interaction_type" "InteractionType" NOT NULL DEFAULT 'DOWNLOAD',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "download_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading_history" (
    "id" UUID NOT NULL,
    "publication_id" UUID NOT NULL,
    "user_id" UUID,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "last_read_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reading_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archives" (
    "id" UUID NOT NULL,
    "archive_code" TEXT NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "year" INTEGER NOT NULL,
    "volume_number" INTEGER,
    "issue_number" INTEGER,
    "category_id" UUID,
    "cover_image_id" UUID,
    "pdf_asset_id" UUID,
    "collection_name" VARCHAR(255),
    "visibility" "MediaVisibility" NOT NULL DEFAULT 'PUBLIC',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "archives_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_deleted_at_idx" ON "users"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "volunteers_volunteer_code_key" ON "volunteers"("volunteer_code");

-- CreateIndex
CREATE UNIQUE INDEX "volunteers_email_key" ON "volunteers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "volunteers_phone_key" ON "volunteers"("phone");

-- CreateIndex
CREATE INDEX "volunteers_volunteer_code_idx" ON "volunteers"("volunteer_code");

-- CreateIndex
CREATE INDEX "volunteers_email_idx" ON "volunteers"("email");

-- CreateIndex
CREATE INDEX "volunteers_phone_idx" ON "volunteers"("phone");

-- CreateIndex
CREATE INDEX "volunteers_status_idx" ON "volunteers"("status");

-- CreateIndex
CREATE INDEX "volunteers_volunteer_status_idx" ON "volunteers"("volunteer_status");

-- CreateIndex
CREATE INDEX "volunteers_city_state_idx" ON "volunteers"("city", "state");

-- CreateIndex
CREATE INDEX "volunteers_deleted_at_idx" ON "volunteers"("deleted_at");

-- CreateIndex
CREATE INDEX "volunteer_identities_volunteer_id_idx" ON "volunteer_identities"("volunteer_id");

-- CreateIndex
CREATE INDEX "volunteer_identities_document_type_idx" ON "volunteer_identities"("document_type");

-- CreateIndex
CREATE INDEX "volunteer_identities_verification_status_idx" ON "volunteer_identities"("verification_status");

-- CreateIndex
CREATE INDEX "volunteer_identities_deleted_at_idx" ON "volunteer_identities"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_identities_volunteer_id_document_type_key" ON "volunteer_identities"("volunteer_id", "document_type");

-- CreateIndex
CREATE INDEX "volunteer_verifications_volunteer_id_idx" ON "volunteer_verifications"("volunteer_id");

-- CreateIndex
CREATE INDEX "volunteer_verifications_verified_by_id_idx" ON "volunteer_verifications"("verified_by_id");

-- CreateIndex
CREATE INDEX "volunteer_verifications_action_idx" ON "volunteer_verifications"("action");

-- CreateIndex
CREATE INDEX "volunteer_verifications_verification_date_idx" ON "volunteer_verifications"("verification_date");

-- CreateIndex
CREATE UNIQUE INDEX "events_event_code_key" ON "events"("event_code");

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE INDEX "events_event_code_idx" ON "events"("event_code");

-- CreateIndex
CREATE INDEX "events_slug_idx" ON "events"("slug");

-- CreateIndex
CREATE INDEX "events_event_type_idx" ON "events"("event_type");

-- CreateIndex
CREATE INDEX "events_is_active_idx" ON "events"("is_active");

-- CreateIndex
CREATE INDEX "events_sort_order_idx" ON "events"("sort_order");

-- CreateIndex
CREATE INDEX "events_deleted_at_idx" ON "events"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "event_editions_edition_code_key" ON "event_editions"("edition_code");

-- CreateIndex
CREATE UNIQUE INDEX "event_editions_slug_key" ON "event_editions"("slug");

-- CreateIndex
CREATE INDEX "event_editions_event_id_idx" ON "event_editions"("event_id");

-- CreateIndex
CREATE INDEX "event_editions_edition_code_idx" ON "event_editions"("edition_code");

-- CreateIndex
CREATE INDEX "event_editions_slug_idx" ON "event_editions"("slug");

-- CreateIndex
CREATE INDEX "event_editions_year_idx" ON "event_editions"("year");

-- CreateIndex
CREATE INDEX "event_editions_edition_status_idx" ON "event_editions"("edition_status");

-- CreateIndex
CREATE INDEX "event_editions_is_featured_idx" ON "event_editions"("is_featured");

-- CreateIndex
CREATE INDEX "event_editions_visibility_idx" ON "event_editions"("visibility");

-- CreateIndex
CREATE INDEX "event_editions_event_starts_idx" ON "event_editions"("event_starts");

-- CreateIndex
CREATE INDEX "event_editions_registration_opens_registration_closes_idx" ON "event_editions"("registration_opens", "registration_closes");

-- CreateIndex
CREATE INDEX "event_editions_venue_id_idx" ON "event_editions"("venue_id");

-- CreateIndex
CREATE INDEX "event_editions_deleted_at_idx" ON "event_editions"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "venues_venue_code_key" ON "venues"("venue_code");

-- CreateIndex
CREATE INDEX "venues_venue_code_idx" ON "venues"("venue_code");

-- CreateIndex
CREATE INDEX "venues_venue_status_idx" ON "venues"("venue_status");

-- CreateIndex
CREATE INDEX "venues_venue_type_idx" ON "venues"("venue_type");

-- CreateIndex
CREATE INDEX "venues_deleted_at_idx" ON "venues"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "event_departments_department_code_key" ON "event_departments"("department_code");

-- CreateIndex
CREATE INDEX "event_departments_department_code_idx" ON "event_departments"("department_code");

-- CreateIndex
CREATE INDEX "event_departments_status_idx" ON "event_departments"("status");

-- CreateIndex
CREATE INDEX "event_departments_deleted_at_idx" ON "event_departments"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_roles_role_code_key" ON "volunteer_roles"("role_code");

-- CreateIndex
CREATE INDEX "volunteer_roles_role_code_idx" ON "volunteer_roles"("role_code");

-- CreateIndex
CREATE INDEX "volunteer_roles_department_id_idx" ON "volunteer_roles"("department_id");

-- CreateIndex
CREATE INDEX "volunteer_roles_status_idx" ON "volunteer_roles"("status");

-- CreateIndex
CREATE INDEX "volunteer_roles_priority_idx" ON "volunteer_roles"("priority");

-- CreateIndex
CREATE INDEX "volunteer_roles_deleted_at_idx" ON "volunteer_roles"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "event_shifts_shift_code_key" ON "event_shifts"("shift_code");

-- CreateIndex
CREATE INDEX "event_shifts_shift_code_idx" ON "event_shifts"("shift_code");

-- CreateIndex
CREATE INDEX "event_shifts_edition_id_idx" ON "event_shifts"("edition_id");

-- CreateIndex
CREATE INDEX "event_shifts_status_idx" ON "event_shifts"("status");

-- CreateIndex
CREATE INDEX "event_shifts_start_time_end_time_idx" ON "event_shifts"("start_time", "end_time");

-- CreateIndex
CREATE INDEX "event_shifts_deleted_at_idx" ON "event_shifts"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "event_speakers_speaker_code_key" ON "event_speakers"("speaker_code");

-- CreateIndex
CREATE UNIQUE INDEX "event_speakers_slug_key" ON "event_speakers"("slug");

-- CreateIndex
CREATE INDEX "event_speakers_speaker_code_idx" ON "event_speakers"("speaker_code");

-- CreateIndex
CREATE INDEX "event_speakers_slug_idx" ON "event_speakers"("slug");

-- CreateIndex
CREATE INDEX "event_speakers_speaker_status_idx" ON "event_speakers"("speaker_status");

-- CreateIndex
CREATE INDEX "event_speakers_sort_order_idx" ON "event_speakers"("sort_order");

-- CreateIndex
CREATE INDEX "event_speakers_deleted_at_idx" ON "event_speakers"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "event_sessions_session_code_key" ON "event_sessions"("session_code");

-- CreateIndex
CREATE INDEX "event_sessions_session_code_idx" ON "event_sessions"("session_code");

-- CreateIndex
CREATE INDEX "event_sessions_edition_id_idx" ON "event_sessions"("edition_id");

-- CreateIndex
CREATE INDEX "event_sessions_speaker_id_idx" ON "event_sessions"("speaker_id");

-- CreateIndex
CREATE INDEX "event_sessions_venue_id_idx" ON "event_sessions"("venue_id");

-- CreateIndex
CREATE INDEX "event_sessions_session_status_idx" ON "event_sessions"("session_status");

-- CreateIndex
CREATE INDEX "event_sessions_start_time_idx" ON "event_sessions"("start_time");

-- CreateIndex
CREATE INDEX "event_sessions_sort_order_idx" ON "event_sessions"("sort_order");

-- CreateIndex
CREATE INDEX "event_sessions_deleted_at_idx" ON "event_sessions"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "uq_edition_session_slug" ON "event_sessions"("edition_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "event_schedules_schedule_code_key" ON "event_schedules"("schedule_code");

-- CreateIndex
CREATE INDEX "event_schedules_schedule_code_idx" ON "event_schedules"("schedule_code");

-- CreateIndex
CREATE INDEX "event_schedules_edition_id_idx" ON "event_schedules"("edition_id");

-- CreateIndex
CREATE INDEX "event_schedules_session_id_idx" ON "event_schedules"("session_id");

-- CreateIndex
CREATE INDEX "event_schedules_speaker_id_idx" ON "event_schedules"("speaker_id");

-- CreateIndex
CREATE INDEX "event_schedules_venue_id_idx" ON "event_schedules"("venue_id");

-- CreateIndex
CREATE INDEX "event_schedules_start_time_idx" ON "event_schedules"("start_time");

-- CreateIndex
CREATE INDEX "event_schedules_display_order_idx" ON "event_schedules"("display_order");

-- CreateIndex
CREATE INDEX "event_schedules_schedule_status_idx" ON "event_schedules"("schedule_status");

-- CreateIndex
CREATE INDEX "event_schedules_deleted_at_idx" ON "event_schedules"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_applications_application_code_key" ON "volunteer_applications"("application_code");

-- CreateIndex
CREATE INDEX "volunteer_applications_application_code_idx" ON "volunteer_applications"("application_code");

-- CreateIndex
CREATE INDEX "volunteer_applications_volunteer_id_idx" ON "volunteer_applications"("volunteer_id");

-- CreateIndex
CREATE INDEX "volunteer_applications_edition_id_idx" ON "volunteer_applications"("edition_id");

-- CreateIndex
CREATE INDEX "volunteer_applications_application_status_idx" ON "volunteer_applications"("application_status");

-- CreateIndex
CREATE INDEX "volunteer_applications_submitted_at_idx" ON "volunteer_applications"("submitted_at");

-- CreateIndex
CREATE INDEX "volunteer_applications_preferred_department_id_idx" ON "volunteer_applications"("preferred_department_id");

-- CreateIndex
CREATE INDEX "volunteer_applications_preferred_role_id_idx" ON "volunteer_applications"("preferred_role_id");

-- CreateIndex
CREATE INDEX "volunteer_applications_preferred_shift_id_idx" ON "volunteer_applications"("preferred_shift_id");

-- CreateIndex
CREATE INDEX "volunteer_applications_deleted_at_idx" ON "volunteer_applications"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "uq_volunteer_edition_application" ON "volunteer_applications"("volunteer_id", "edition_id");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_participations_participation_code_key" ON "volunteer_participations"("participation_code");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_participations_application_id_key" ON "volunteer_participations"("application_id");

-- CreateIndex
CREATE INDEX "volunteer_participations_participation_code_idx" ON "volunteer_participations"("participation_code");

-- CreateIndex
CREATE INDEX "volunteer_participations_application_id_idx" ON "volunteer_participations"("application_id");

-- CreateIndex
CREATE INDEX "volunteer_participations_volunteer_id_idx" ON "volunteer_participations"("volunteer_id");

-- CreateIndex
CREATE INDEX "volunteer_participations_edition_id_idx" ON "volunteer_participations"("edition_id");

-- CreateIndex
CREATE INDEX "volunteer_participations_participation_status_idx" ON "volunteer_participations"("participation_status");

-- CreateIndex
CREATE INDEX "volunteer_participations_started_at_idx" ON "volunteer_participations"("started_at");

-- CreateIndex
CREATE INDEX "volunteer_participations_completed_at_idx" ON "volunteer_participations"("completed_at");

-- CreateIndex
CREATE INDEX "volunteer_participations_certificate_eligible_idx" ON "volunteer_participations"("certificate_eligible");

-- CreateIndex
CREATE UNIQUE INDEX "uq_volunteer_edition_participation" ON "volunteer_participations"("volunteer_id", "edition_id");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_certificates_certificate_number_key" ON "volunteer_certificates"("certificate_number");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_certificates_verification_token_key" ON "volunteer_certificates"("verification_token");

-- CreateIndex
CREATE INDEX "volunteer_certificates_certificate_number_idx" ON "volunteer_certificates"("certificate_number");

-- CreateIndex
CREATE INDEX "volunteer_certificates_volunteer_id_idx" ON "volunteer_certificates"("volunteer_id");

-- CreateIndex
CREATE INDEX "volunteer_certificates_participation_id_idx" ON "volunteer_certificates"("participation_id");

-- CreateIndex
CREATE INDEX "volunteer_certificates_edition_id_idx" ON "volunteer_certificates"("edition_id");

-- CreateIndex
CREATE INDEX "volunteer_certificates_certificate_type_idx" ON "volunteer_certificates"("certificate_type");

-- CreateIndex
CREATE INDEX "volunteer_certificates_certificate_status_idx" ON "volunteer_certificates"("certificate_status");

-- CreateIndex
CREATE INDEX "volunteer_certificates_verification_token_idx" ON "volunteer_certificates"("verification_token");

-- CreateIndex
CREATE INDEX "volunteer_certificates_issue_date_idx" ON "volunteer_certificates"("issue_date");

-- CreateIndex
CREATE INDEX "volunteer_certificates_deleted_at_idx" ON "volunteer_certificates"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "media_folders_folder_code_key" ON "media_folders"("folder_code");

-- CreateIndex
CREATE INDEX "media_folders_folder_code_idx" ON "media_folders"("folder_code");

-- CreateIndex
CREATE INDEX "media_folders_parent_id_idx" ON "media_folders"("parent_id");

-- CreateIndex
CREATE INDEX "media_folders_path_idx" ON "media_folders"("path");

-- CreateIndex
CREATE INDEX "media_folders_depth_idx" ON "media_folders"("depth");

-- CreateIndex
CREATE INDEX "media_folders_visibility_idx" ON "media_folders"("visibility");

-- CreateIndex
CREATE INDEX "media_folders_deleted_at_idx" ON "media_folders"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "uq_folder_parent_slug" ON "media_folders"("parent_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "media_assets_media_code_key" ON "media_assets"("media_code");

-- CreateIndex
CREATE INDEX "media_assets_media_code_idx" ON "media_assets"("media_code");

-- CreateIndex
CREATE INDEX "media_assets_bucket_name_idx" ON "media_assets"("bucket_name");

-- CreateIndex
CREATE INDEX "media_assets_content_type_idx" ON "media_assets"("content_type");

-- CreateIndex
CREATE INDEX "media_assets_media_type_idx" ON "media_assets"("media_type");

-- CreateIndex
CREATE INDEX "media_assets_uploaded_by_idx" ON "media_assets"("uploaded_by");

-- CreateIndex
CREATE INDEX "media_assets_folder_id_idx" ON "media_assets"("folder_id");

-- CreateIndex
CREATE INDEX "media_assets_visibility_idx" ON "media_assets"("visibility");

-- CreateIndex
CREATE INDEX "media_assets_asset_status_idx" ON "media_assets"("asset_status");

-- CreateIndex
CREATE INDEX "media_assets_checksum_idx" ON "media_assets"("checksum");

-- CreateIndex
CREATE INDEX "media_assets_deleted_at_idx" ON "media_assets"("deleted_at");

-- CreateIndex
CREATE INDEX "media_assets_tags_idx" ON "media_assets"("tags");

-- CreateIndex
CREATE UNIQUE INDEX "gallery_albums_album_code_key" ON "gallery_albums"("album_code");

-- CreateIndex
CREATE UNIQUE INDEX "gallery_albums_slug_key" ON "gallery_albums"("slug");

-- CreateIndex
CREATE INDEX "gallery_albums_album_code_idx" ON "gallery_albums"("album_code");

-- CreateIndex
CREATE INDEX "gallery_albums_slug_idx" ON "gallery_albums"("slug");

-- CreateIndex
CREATE INDEX "gallery_albums_category_idx" ON "gallery_albums"("category");

-- CreateIndex
CREATE INDEX "gallery_albums_visibility_idx" ON "gallery_albums"("visibility");

-- CreateIndex
CREATE INDEX "gallery_albums_is_featured_idx" ON "gallery_albums"("is_featured");

-- CreateIndex
CREATE INDEX "gallery_albums_event_edition_id_idx" ON "gallery_albums"("event_edition_id");

-- CreateIndex
CREATE INDEX "gallery_albums_deleted_at_idx" ON "gallery_albums"("deleted_at");

-- CreateIndex
CREATE INDEX "gallery_albums_tags_idx" ON "gallery_albums"("tags");

-- CreateIndex
CREATE INDEX "gallery_images_album_id_idx" ON "gallery_images"("album_id");

-- CreateIndex
CREATE INDEX "gallery_images_asset_id_idx" ON "gallery_images"("asset_id");

-- CreateIndex
CREATE INDEX "gallery_images_is_featured_idx" ON "gallery_images"("is_featured");

-- CreateIndex
CREATE INDEX "gallery_images_sort_order_idx" ON "gallery_images"("sort_order");

-- CreateIndex
CREATE INDEX "gallery_images_deleted_at_idx" ON "gallery_images"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "uq_album_asset" ON "gallery_images"("album_id", "asset_id");

-- CreateIndex
CREATE UNIQUE INDEX "documents_document_code_key" ON "documents"("document_code");

-- CreateIndex
CREATE UNIQUE INDEX "documents_slug_key" ON "documents"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "documents_asset_id_key" ON "documents"("asset_id");

-- CreateIndex
CREATE INDEX "documents_document_code_idx" ON "documents"("document_code");

-- CreateIndex
CREATE INDEX "documents_slug_idx" ON "documents"("slug");

-- CreateIndex
CREATE INDEX "documents_asset_id_idx" ON "documents"("asset_id");

-- CreateIndex
CREATE INDEX "documents_category_idx" ON "documents"("category");

-- CreateIndex
CREATE INDEX "documents_visibility_idx" ON "documents"("visibility");

-- CreateIndex
CREATE INDEX "documents_is_featured_idx" ON "documents"("is_featured");

-- CreateIndex
CREATE INDEX "documents_publish_date_idx" ON "documents"("publish_date");

-- CreateIndex
CREATE INDEX "documents_deleted_at_idx" ON "documents"("deleted_at");

-- CreateIndex
CREATE INDEX "documents_tags_idx" ON "documents"("tags");

-- CreateIndex
CREATE UNIQUE INDEX "publication_categories_category_code_key" ON "publication_categories"("category_code");

-- CreateIndex
CREATE UNIQUE INDEX "publication_categories_slug_key" ON "publication_categories"("slug");

-- CreateIndex
CREATE INDEX "publication_categories_category_code_idx" ON "publication_categories"("category_code");

-- CreateIndex
CREATE INDEX "publication_categories_slug_idx" ON "publication_categories"("slug");

-- CreateIndex
CREATE INDEX "publication_categories_parent_id_idx" ON "publication_categories"("parent_id");

-- CreateIndex
CREATE INDEX "publication_categories_is_active_idx" ON "publication_categories"("is_active");

-- CreateIndex
CREATE INDEX "publication_categories_deleted_at_idx" ON "publication_categories"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "publications_publication_code_key" ON "publications"("publication_code");

-- CreateIndex
CREATE UNIQUE INDEX "publications_slug_key" ON "publications"("slug");

-- CreateIndex
CREATE INDEX "publications_publication_code_idx" ON "publications"("publication_code");

-- CreateIndex
CREATE INDEX "publications_slug_idx" ON "publications"("slug");

-- CreateIndex
CREATE INDEX "publications_category_id_idx" ON "publications"("category_id");

-- CreateIndex
CREATE INDEX "publications_status_idx" ON "publications"("status");

-- CreateIndex
CREATE INDEX "publications_visibility_idx" ON "publications"("visibility");

-- CreateIndex
CREATE INDEX "publications_is_featured_idx" ON "publications"("is_featured");

-- CreateIndex
CREATE INDEX "publications_publication_date_idx" ON "publications"("publication_date");

-- CreateIndex
CREATE INDEX "publications_release_date_idx" ON "publications"("release_date");

-- CreateIndex
CREATE INDEX "publications_language_idx" ON "publications"("language");

-- CreateIndex
CREATE INDEX "publications_download_count_idx" ON "publications"("download_count");

-- CreateIndex
CREATE INDEX "publications_view_count_idx" ON "publications"("view_count");

-- CreateIndex
CREATE INDEX "publications_published_at_idx" ON "publications"("published_at");

-- CreateIndex
CREATE INDEX "publications_deleted_at_idx" ON "publications"("deleted_at");

-- CreateIndex
CREATE INDEX "publications_keywords_idx" ON "publications"("keywords");

-- CreateIndex
CREATE UNIQUE INDEX "publication_editions_edition_code_key" ON "publication_editions"("edition_code");

-- CreateIndex
CREATE INDEX "publication_editions_edition_code_idx" ON "publication_editions"("edition_code");

-- CreateIndex
CREATE INDEX "publication_editions_publication_id_idx" ON "publication_editions"("publication_id");

-- CreateIndex
CREATE INDEX "publication_editions_edition_number_idx" ON "publication_editions"("edition_number");

-- CreateIndex
CREATE INDEX "publication_editions_volume_number_idx" ON "publication_editions"("volume_number");

-- CreateIndex
CREATE INDEX "publication_editions_issue_number_idx" ON "publication_editions"("issue_number");

-- CreateIndex
CREATE INDEX "publication_editions_status_idx" ON "publication_editions"("status");

-- CreateIndex
CREATE INDEX "publication_editions_publication_date_idx" ON "publication_editions"("publication_date");

-- CreateIndex
CREATE INDEX "publication_editions_deleted_at_idx" ON "publication_editions"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "uq_pub_edition" ON "publication_editions"("publication_id", "edition_number");

-- CreateIndex
CREATE INDEX "publication_contributors_publication_id_idx" ON "publication_contributors"("publication_id");

-- CreateIndex
CREATE INDEX "publication_contributors_name_idx" ON "publication_contributors"("name");

-- CreateIndex
CREATE INDEX "publication_contributors_role_idx" ON "publication_contributors"("role");

-- CreateIndex
CREATE INDEX "publication_contributors_deleted_at_idx" ON "publication_contributors"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "publication_tags_name_key" ON "publication_tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "publication_tags_slug_key" ON "publication_tags"("slug");

-- CreateIndex
CREATE INDEX "publication_tags_name_idx" ON "publication_tags"("name");

-- CreateIndex
CREATE INDEX "publication_tags_slug_idx" ON "publication_tags"("slug");

-- CreateIndex
CREATE INDEX "publication_tags_usage_count_idx" ON "publication_tags"("usage_count");

-- CreateIndex
CREATE INDEX "publication_tag_links_publication_id_idx" ON "publication_tag_links"("publication_id");

-- CreateIndex
CREATE INDEX "publication_tag_links_tag_id_idx" ON "publication_tag_links"("tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "articles_article_code_key" ON "articles"("article_code");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_article_code_idx" ON "articles"("article_code");

-- CreateIndex
CREATE INDEX "articles_slug_idx" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_publication_id_idx" ON "articles"("publication_id");

-- CreateIndex
CREATE INDEX "articles_author_name_idx" ON "articles"("author_name");

-- CreateIndex
CREATE INDEX "articles_status_idx" ON "articles"("status");

-- CreateIndex
CREATE INDEX "articles_visibility_idx" ON "articles"("visibility");

-- CreateIndex
CREATE INDEX "articles_is_featured_idx" ON "articles"("is_featured");

-- CreateIndex
CREATE INDEX "articles_published_at_idx" ON "articles"("published_at");

-- CreateIndex
CREATE INDEX "articles_view_count_idx" ON "articles"("view_count");

-- CreateIndex
CREATE INDEX "articles_deleted_at_idx" ON "articles"("deleted_at");

-- CreateIndex
CREATE INDEX "articles_categories_idx" ON "articles"("categories");

-- CreateIndex
CREATE INDEX "articles_tags_idx" ON "articles"("tags");

-- CreateIndex
CREATE INDEX "download_history_publication_id_idx" ON "download_history"("publication_id");

-- CreateIndex
CREATE INDEX "download_history_user_id_idx" ON "download_history"("user_id");

-- CreateIndex
CREATE INDEX "download_history_interaction_type_idx" ON "download_history"("interaction_type");

-- CreateIndex
CREATE INDEX "download_history_created_at_idx" ON "download_history"("created_at");

-- CreateIndex
CREATE INDEX "reading_history_publication_id_idx" ON "reading_history"("publication_id");

-- CreateIndex
CREATE INDEX "reading_history_user_id_idx" ON "reading_history"("user_id");

-- CreateIndex
CREATE INDEX "reading_history_last_read_at_idx" ON "reading_history"("last_read_at");

-- CreateIndex
CREATE UNIQUE INDEX "uq_reading_user" ON "reading_history"("publication_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "archives_archive_code_key" ON "archives"("archive_code");

-- CreateIndex
CREATE UNIQUE INDEX "archives_slug_key" ON "archives"("slug");

-- CreateIndex
CREATE INDEX "archives_archive_code_idx" ON "archives"("archive_code");

-- CreateIndex
CREATE INDEX "archives_slug_idx" ON "archives"("slug");

-- CreateIndex
CREATE INDEX "archives_year_idx" ON "archives"("year");

-- CreateIndex
CREATE INDEX "archives_volume_number_idx" ON "archives"("volume_number");

-- CreateIndex
CREATE INDEX "archives_issue_number_idx" ON "archives"("issue_number");

-- CreateIndex
CREATE INDEX "archives_category_id_idx" ON "archives"("category_id");

-- CreateIndex
CREATE INDEX "archives_collection_name_idx" ON "archives"("collection_name");

-- CreateIndex
CREATE INDEX "archives_visibility_idx" ON "archives"("visibility");

-- CreateIndex
CREATE INDEX "archives_deleted_at_idx" ON "archives"("deleted_at");

-- AddForeignKey
ALTER TABLE "volunteer_identities" ADD CONSTRAINT "volunteer_identities_volunteer_id_fkey" FOREIGN KEY ("volunteer_id") REFERENCES "volunteers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_verifications" ADD CONSTRAINT "volunteer_verifications_volunteer_id_fkey" FOREIGN KEY ("volunteer_id") REFERENCES "volunteers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_verifications" ADD CONSTRAINT "volunteer_verifications_verified_by_id_fkey" FOREIGN KEY ("verified_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_editions" ADD CONSTRAINT "event_editions_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_editions" ADD CONSTRAINT "event_editions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_editions" ADD CONSTRAINT "event_editions_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_roles" ADD CONSTRAINT "volunteer_roles_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "event_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_shifts" ADD CONSTRAINT "event_shifts_edition_id_fkey" FOREIGN KEY ("edition_id") REFERENCES "event_editions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_sessions" ADD CONSTRAINT "event_sessions_edition_id_fkey" FOREIGN KEY ("edition_id") REFERENCES "event_editions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_sessions" ADD CONSTRAINT "event_sessions_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "event_speakers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_sessions" ADD CONSTRAINT "event_sessions_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_schedules" ADD CONSTRAINT "event_schedules_edition_id_fkey" FOREIGN KEY ("edition_id") REFERENCES "event_editions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_schedules" ADD CONSTRAINT "event_schedules_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "event_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_schedules" ADD CONSTRAINT "event_schedules_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "event_speakers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_schedules" ADD CONSTRAINT "event_schedules_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_applications" ADD CONSTRAINT "volunteer_applications_volunteer_id_fkey" FOREIGN KEY ("volunteer_id") REFERENCES "volunteers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_applications" ADD CONSTRAINT "volunteer_applications_edition_id_fkey" FOREIGN KEY ("edition_id") REFERENCES "event_editions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_applications" ADD CONSTRAINT "volunteer_applications_preferred_shift_id_fkey" FOREIGN KEY ("preferred_shift_id") REFERENCES "event_shifts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_applications" ADD CONSTRAINT "volunteer_applications_preferred_department_id_fkey" FOREIGN KEY ("preferred_department_id") REFERENCES "event_departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_applications" ADD CONSTRAINT "volunteer_applications_preferred_role_id_fkey" FOREIGN KEY ("preferred_role_id") REFERENCES "volunteer_roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_participations" ADD CONSTRAINT "volunteer_participations_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "volunteer_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_participations" ADD CONSTRAINT "volunteer_participations_volunteer_id_fkey" FOREIGN KEY ("volunteer_id") REFERENCES "volunteers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_participations" ADD CONSTRAINT "volunteer_participations_edition_id_fkey" FOREIGN KEY ("edition_id") REFERENCES "event_editions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_certificates" ADD CONSTRAINT "volunteer_certificates_volunteer_id_fkey" FOREIGN KEY ("volunteer_id") REFERENCES "volunteers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_certificates" ADD CONSTRAINT "volunteer_certificates_participation_id_fkey" FOREIGN KEY ("participation_id") REFERENCES "volunteer_participations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_certificates" ADD CONSTRAINT "volunteer_certificates_edition_id_fkey" FOREIGN KEY ("edition_id") REFERENCES "event_editions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_folders" ADD CONSTRAINT "media_folders_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "media_folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "media_folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "gallery_albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "media_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "media_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication_categories" ADD CONSTRAINT "publication_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "publication_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "publication_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication_editions" ADD CONSTRAINT "publication_editions_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication_contributors" ADD CONSTRAINT "publication_contributors_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication_tag_links" ADD CONSTRAINT "publication_tag_links_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication_tag_links" ADD CONSTRAINT "publication_tag_links_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "publication_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "download_history" ADD CONSTRAINT "download_history_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_history" ADD CONSTRAINT "reading_history_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
