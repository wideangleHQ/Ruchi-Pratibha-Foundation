ALTER TYPE "ApplicationStatus" ADD VALUE IF NOT EXISTS 'WAITLISTED';

CREATE TYPE "OpportunityType" AS ENUM ('EVENT_BASED', 'CAMPAIGN', 'LONG_TERM', 'RECURRING');
CREATE TYPE "OpportunityStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'UPCOMING', 'REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'ONGOING', 'COMPLETED', 'CANCELLED', 'ARCHIVED');
CREATE TYPE "OpportunityMode" AS ENUM ('OFFLINE', 'ONLINE', 'HYBRID');
CREATE TYPE "WorkflowType" AS ENUM ('MANUAL', 'AUTOMATIC');

CREATE TABLE "csr_opportunities" (
    "id" UUID NOT NULL,
    "opportunity_code" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" VARCHAR(300) NOT NULL,
    "event_id" UUID,
    "edition_id" UUID,
    "opportunity_type" "OpportunityType" NOT NULL,
    "opportunity_status" "OpportunityStatus" NOT NULL DEFAULT 'DRAFT',
    "short_description" VARCHAR(500) NOT NULL,
    "detailed_description" TEXT,
    "featured_image_key" TEXT,
    "banner_image_key" TEXT,
    "registration_opens" TIMESTAMP(3),
    "registration_closes" TIMESTAMP(3),
    "event_start_date" TIMESTAMP(3),
    "event_end_date" TIMESTAMP(3),
    "reporting_time" VARCHAR(10),
    "closing_time" VARCHAR(10),
    "time_zone" VARCHAR(50) NOT NULL DEFAULT 'Asia/Kolkata',
    "mode" "OpportunityMode" NOT NULL DEFAULT 'OFFLINE',
    "venue" VARCHAR(300),
    "address" TEXT,
    "landmark" VARCHAR(200),
    "district" VARCHAR(100),
    "state" VARCHAR(100),
    "pincode" VARCHAR(10),
    "google_maps_url" TEXT,
    "meeting_link" TEXT,
    "platform" VARCHAR(100),
    "volunteers_required" INTEGER NOT NULL DEFAULT 0,
    "max_applications" INTEGER NOT NULL DEFAULT 0,
    "min_age" INTEGER,
    "max_age" INTEGER,
    "gender_restriction" VARCHAR(20) NOT NULL DEFAULT 'ANY',
    "experience_required" BOOLEAN NOT NULL DEFAULT false,
    "required_skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "physical_requirements" TEXT,
    "coordinator_name" VARCHAR(200),
    "coordinator_designation" VARCHAR(200),
    "coordinator_email" VARCHAR(255),
    "coordinator_mobile" VARCHAR(15),
    "coordinator_alt_mobile" VARCHAR(15),
    "form_config" JSONB,
    "required_documents" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "gallery_image_keys" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "brochure_key" TEXT,
    "supporting_doc_keys" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "show_on_homepage" BOOLEAN NOT NULL DEFAULT false,
    "show_on_csr_page" BOOLEAN NOT NULL DEFAULT true,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "accept_registrations" BOOLEAN NOT NULL DEFAULT false,
    "show_countdown" BOOLEAN NOT NULL DEFAULT false,
    "meta_title" VARCHAR(70),
    "meta_description" VARCHAR(160),
    "og_image_key" TEXT,
    "workflow_type" "WorkflowType" NOT NULL DEFAULT 'MANUAL',
    "notify_registration" BOOLEAN NOT NULL DEFAULT true,
    "notify_approval" BOOLEAN NOT NULL DEFAULT true,
    "notify_rejection" BOOLEAN NOT NULL DEFAULT true,
    "notify_reminder" BOOLEAN NOT NULL DEFAULT false,
    "admin_notes" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by_id" UUID,
    "updated_by" UUID,
    "deleted_by" UUID,
    CONSTRAINT "csr_opportunities_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "csr_opportunities_opportunity_code_key" ON "csr_opportunities"("opportunity_code");
CREATE UNIQUE INDEX "csr_opportunities_slug_key" ON "csr_opportunities"("slug");
CREATE UNIQUE INDEX "csr_opportunities_edition_id_key" ON "csr_opportunities"("edition_id");
CREATE INDEX "csr_opportunities_opportunity_code_idx" ON "csr_opportunities"("opportunity_code");
CREATE INDEX "csr_opportunities_slug_idx" ON "csr_opportunities"("slug");
CREATE INDEX "csr_opportunities_event_id_idx" ON "csr_opportunities"("event_id");
CREATE INDEX "csr_opportunities_edition_id_idx" ON "csr_opportunities"("edition_id");
CREATE INDEX "csr_opportunities_opportunity_type_idx" ON "csr_opportunities"("opportunity_type");
CREATE INDEX "csr_opportunities_opportunity_status_idx" ON "csr_opportunities"("opportunity_status");
CREATE INDEX "csr_opportunities_mode_idx" ON "csr_opportunities"("mode");
CREATE INDEX "csr_opportunities_district_state_idx" ON "csr_opportunities"("district", "state");
CREATE INDEX "csr_opportunities_is_featured_idx" ON "csr_opportunities"("is_featured");
CREATE INDEX "csr_opportunities_show_on_homepage_idx" ON "csr_opportunities"("show_on_homepage");
CREATE INDEX "csr_opportunities_show_on_csr_page_idx" ON "csr_opportunities"("show_on_csr_page");
CREATE INDEX "csr_opportunities_accept_registrations_idx" ON "csr_opportunities"("accept_registrations");
CREATE INDEX "csr_opportunities_registration_opens_registration_closes_idx" ON "csr_opportunities"("registration_opens", "registration_closes");
CREATE INDEX "csr_opportunities_event_start_date_idx" ON "csr_opportunities"("event_start_date");
CREATE INDEX "csr_opportunities_deleted_at_idx" ON "csr_opportunities"("deleted_at");

ALTER TABLE "csr_opportunities" ADD CONSTRAINT "csr_opportunities_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "csr_opportunities" ADD CONSTRAINT "csr_opportunities_edition_id_fkey" FOREIGN KEY ("edition_id") REFERENCES "event_editions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
