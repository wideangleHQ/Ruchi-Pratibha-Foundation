import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';

export interface SupabaseUploadResult {
  bucketName: string;
  objectPath: string;
  publicUrl: string;
  contentType: string;
  fileSize: number;
  checksum: string;
}

export interface FileValidationOptions {
  maxSizeBytes?: number;
  allowedMimeTypes?: string[];
  allowedExtensions?: string[];
}

export interface ImageMetadata {
  width?: number;
  height?: number;
}

const BUCKET_MAP: Record<string, string> = {
  image: 'foundation-images',
  gallery: 'gallery',
  publication: 'publications',
  document: 'documents',
  certificate: 'certificates',
  event: 'events',
  temporary: 'temporary',
};

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'video/mp4', 'video/quicktime', 'video/webm',
]);

const ALLOWED_EXTENSIONS = new Set([
  'jpg', 'jpeg', 'png', 'webp', 'avif', 'svg',
  'pdf', 'docx', 'xlsx', 'pptx', 'txt',
  'mp4', 'mov', 'webm',
]);

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

@Injectable()
export class SupabaseStorageService {
  private readonly logger = new Logger(SupabaseStorageService.name);
  private readonly client: SupabaseClient;
  private readonly defaultBucket: string;

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.getOrThrow<string>('supabase.url');
    const key = this.configService.getOrThrow<string>('supabase.serviceRoleKey');
    this.defaultBucket = this.configService.getOrThrow<string>('supabase.storageBucket');
    this.client = createClient(url, key);
  }

  resolveBucket(category: string): string {
    return BUCKET_MAP[category] ?? this.defaultBucket;
  }

  validateFile(
    filename: string,
    contentType: string,
    size: number,
    options?: FileValidationOptions,
  ): { valid: boolean; reason?: string } {
    const maxSize = options?.maxSizeBytes ?? MAX_FILE_SIZE;
    if (size > maxSize) {
      return { valid: false, reason: `File size ${size} exceeds maximum ${maxSize} bytes` };
    }

    const allowedMimes = options?.allowedMimeTypes
      ? new Set(options.allowedMimeTypes)
      : ALLOWED_MIME_TYPES;
    if (!allowedMimes.has(contentType)) {
      return { valid: false, reason: `Content type "${contentType}" is not allowed` };
    }

    const ext = this.extractExtension(filename);
    const allowedExts = options?.allowedExtensions
      ? new Set(options.allowedExtensions)
      : ALLOWED_EXTENSIONS;
    if (!allowedExts.has(ext)) {
      return { valid: false, reason: `Extension ".${ext}" is not allowed` };
    }

    return { valid: true };
  }

  sanitizeFilename(filename: string): string {
    return filename
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/\.{2,}/g, '.')
      .replace(/^\.+|\.+$/g, '')
      .substring(0, 255);
  }

  extractExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
  }

  generateStoredFilename(originalFilename: string): string {
    const ext = this.extractExtension(originalFilename);
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 10);
    return ext ? `${timestamp}-${random}.${ext}` : `${timestamp}-${random}`;
  }

  async upload(
    objectPath: string,
    buffer: Buffer,
    contentType: string,
    bucket?: string,
  ): Promise<SupabaseUploadResult> {
    const targetBucket = bucket ?? this.defaultBucket;
    const checksum = createHash('sha256').update(buffer).digest('hex');

    const { error } = await this.client.storage
      .from(targetBucket)
      .upload(objectPath, buffer, { contentType, upsert: true });

    if (error) {
      this.logger.error(`Upload failed for ${objectPath}: ${error.message}`);
      throw new Error(`Supabase upload failed: ${error.message}`);
    }

    const { data: urlData } = this.client.storage
      .from(targetBucket)
      .getPublicUrl(objectPath);

    this.logger.log(`Uploaded ${objectPath} to ${targetBucket} (${buffer.length} bytes)`);

    return {
      bucketName: targetBucket,
      objectPath,
      publicUrl: urlData.publicUrl,
      contentType,
      fileSize: buffer.length,
      checksum,
    };
  }

  async uploadMultiple(
    files: Array<{ objectPath: string; buffer: Buffer; contentType: string }>,
    bucket?: string,
  ): Promise<SupabaseUploadResult[]> {
    return Promise.all(
      files.map((f) => this.upload(f.objectPath, f.buffer, f.contentType, bucket)),
    );
  }

  async delete(objectPath: string, bucket?: string): Promise<void> {
    const targetBucket = bucket ?? this.defaultBucket;
    const { error } = await this.client.storage
      .from(targetBucket)
      .remove([objectPath]);

    if (error) {
      this.logger.error(`Delete failed for ${objectPath}: ${error.message}`);
      throw new Error(`Supabase delete failed: ${error.message}`);
    }
    this.logger.log(`Deleted ${objectPath} from ${targetBucket}`);
  }

  async deleteMultiple(objectPaths: string[], bucket?: string): Promise<void> {
    const targetBucket = bucket ?? this.defaultBucket;
    const { error } = await this.client.storage
      .from(targetBucket)
      .remove(objectPaths);

    if (error) {
      this.logger.error(`Bulk delete failed: ${error.message}`);
      throw new Error(`Supabase bulk delete failed: ${error.message}`);
    }
    this.logger.log(`Bulk deleted ${objectPaths.length} files from ${targetBucket}`);
  }

  async replace(
    objectPath: string,
    buffer: Buffer,
    contentType: string,
    bucket?: string,
  ): Promise<SupabaseUploadResult> {
    return this.upload(objectPath, buffer, contentType, bucket);
  }

  async move(
    sourcePath: string,
    destinationPath: string,
    bucket?: string,
  ): Promise<void> {
    const targetBucket = bucket ?? this.defaultBucket;
    const { error } = await this.client.storage
      .from(targetBucket)
      .move(sourcePath, destinationPath);

    if (error) {
      this.logger.error(`Move failed from ${sourcePath} to ${destinationPath}: ${error.message}`);
      throw new Error(`Supabase move failed: ${error.message}`);
    }
    this.logger.log(`Moved ${sourcePath} → ${destinationPath} in ${targetBucket}`);
  }

  async copy(
    sourcePath: string,
    destinationPath: string,
    bucket?: string,
  ): Promise<void> {
    const targetBucket = bucket ?? this.defaultBucket;
    const { error } = await this.client.storage
      .from(targetBucket)
      .copy(sourcePath, destinationPath);

    if (error) {
      this.logger.error(`Copy failed from ${sourcePath} to ${destinationPath}: ${error.message}`);
      throw new Error(`Supabase copy failed: ${error.message}`);
    }
    this.logger.log(`Copied ${sourcePath} → ${destinationPath} in ${targetBucket}`);
  }

  async getSignedUrl(objectPath: string, expiresIn = 3600, bucket?: string): Promise<string> {
    const targetBucket = bucket ?? this.defaultBucket;
    const { data, error } = await this.client.storage
      .from(targetBucket)
      .createSignedUrl(objectPath, expiresIn);

    if (error) {
      this.logger.error(`Signed URL failed for ${objectPath}: ${error.message}`);
      throw new Error(`Supabase signed URL failed: ${error.message}`);
    }
    return data.signedUrl;
  }

  getPublicUrl(objectPath: string, bucket?: string): string {
    const targetBucket = bucket ?? this.defaultBucket;
    const { data } = this.client.storage
      .from(targetBucket)
      .getPublicUrl(objectPath);
    return data.publicUrl;
  }

  async exists(objectPath: string, bucket?: string): Promise<boolean> {
    const targetBucket = bucket ?? this.defaultBucket;
    const dir = objectPath.substring(0, objectPath.lastIndexOf('/'));
    const file = objectPath.substring(objectPath.lastIndexOf('/') + 1);

    const { data, error } = await this.client.storage
      .from(targetBucket)
      .list(dir, { search: file });

    if (error) return false;
    return data.some((f) => f.name === file);
  }

  resolveMediaType(contentType: string): string {
    if (contentType.startsWith('image/')) return 'IMAGE';
    if (contentType.startsWith('video/')) return 'VIDEO';
    if (contentType.startsWith('audio/')) return 'AUDIO';
    if (
      contentType === 'application/pdf' ||
      contentType.startsWith('application/vnd.openxmlformats') ||
      contentType === 'text/plain'
    ) return 'DOCUMENT';
    return 'OTHER';
  }
}
