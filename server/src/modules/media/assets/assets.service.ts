import { Injectable, Logger } from '@nestjs/common';
import { AssetStatus, MediaType, MediaVisibility } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { SupabaseStorageService } from '../../../supabase-storage/supabase-storage.service';
import {
  AssetQueryDto,
  AssetResponseDto,
  BulkDeleteAssetsDto,
  CopyAssetDto,
  MoveAssetDto,
  UpdateAssetDto,
  UploadAssetDto,
} from './dto';
import { AssetsRepository } from './assets.repository';

@Injectable()
export class AssetsService {
  private readonly logger = new Logger(AssetsService.name);

  constructor(
    private readonly repository: AssetsRepository,
    private readonly storageService: SupabaseStorageService,
  ) {}

  async upload(
    file: { originalname: string; buffer: Buffer; mimetype: string; size: number },
    dto: UploadAssetDto,
    userId: string,
  ) {
    const validation = this.storageService.validateFile(file.originalname, file.mimetype, file.size);
    if (!validation.valid) throw new BusinessException(validation.reason!);

    const checksum = (await import('crypto')).createHash('sha256').update(file.buffer).digest('hex');
    const duplicate = await this.repository.findByChecksum(checksum);
    if (duplicate) throw new EntityConflictException('MediaAsset', 'checksum (duplicate file)');

    const bucketCategory = dto.bucketCategory ?? 'image';
    const bucket = this.storageService.resolveBucket(bucketCategory);
    const ext = this.storageService.extractExtension(file.originalname);
    const storedFilename = this.storageService.generateStoredFilename(file.originalname);
    const sanitizedOriginal = this.storageService.sanitizeFilename(file.originalname);
    const objectPath = dto.folderId
      ? `assets/${dto.folderId}/${storedFilename}`
      : `assets/${storedFilename}`;

    const uploadResult = await this.storageService.upload(objectPath, file.buffer, file.mimetype, bucket);
    const mediaCode = await this.generateCode();
    const mediaType = this.storageService.resolveMediaType(file.mimetype) as MediaType;

    const asset = await this.repository.create({
      mediaCode,
      originalFilename: sanitizedOriginal,
      storedFilename,
      bucketName: uploadResult.bucketName,
      objectPath: uploadResult.objectPath,
      publicUrl: uploadResult.publicUrl,
      contentType: file.mimetype,
      extension: ext,
      fileSize: file.size,
      mediaType,
      checksum: uploadResult.checksum,
      uploadedBy: userId,
      folderId: dto.folderId ?? null,
      tags: dto.tags ?? [],
      description: dto.description ?? null,
      altText: dto.altText ?? null,
      visibility: dto.visibility ?? MediaVisibility.PUBLIC,
      assetStatus: AssetStatus.ACTIVE,
    });

    this.logger.log(`Asset ${mediaCode} uploaded: ${sanitizedOriginal} (${file.size} bytes)`);
    return ApiResponseDto.success(AssetResponseDto.fromEntity(asset), 'Asset uploaded');
  }

  async uploadMultiple(
    files: Array<{ originalname: string; buffer: Buffer; mimetype: string; size: number }>,
    dto: UploadAssetDto,
    userId: string,
  ) {
    const results = [];
    for (const file of files) {
      const result = await this.upload(file, dto, userId);
      results.push(result.data);
    }
    return ApiResponseDto.success(results, `${results.length} assets uploaded`);
  }

  async update(id: string, dto: UpdateAssetDto, userId: string) {
    const asset = await this.repository.findById(id);
    if (!asset) throw new EntityNotFoundException('MediaAsset', id);

    const updateData: Record<string, unknown> = { updatedBy: userId, version: { increment: 1 } };

    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.altText !== undefined) updateData.altText = dto.altText;
    if (dto.tags !== undefined) updateData.tags = dto.tags;
    if (dto.visibility !== undefined) updateData.visibility = dto.visibility;
    if (dto.folderId !== undefined) updateData.folderId = dto.folderId;

    const updated = await this.repository.update(asset.id, updateData);
    this.logger.log(`Asset ${id} updated`);
    return ApiResponseDto.success(AssetResponseDto.fromEntity(updated), 'Asset updated');
  }

  async remove(id: string) {
    const asset = await this.repository.findById(id);
    if (!asset) throw new EntityNotFoundException('MediaAsset', id);

    await this.storageService.delete(asset.objectPath, asset.bucketName).catch((err) => {
      this.logger.warn(`Failed to delete file for asset ${id}: ${err.message}`);
    });

    await this.repository.update(asset.id, {
      deletedAt: new Date(),
      assetStatus: AssetStatus.ARCHIVED,
    });

    this.logger.log(`Asset ${id} deleted`);
    return ApiResponseDto.success(null, 'Asset deleted');
  }

  async bulkDelete(dto: BulkDeleteAssetsDto) {
    const assets = await this.repository.findByIds(dto.ids);
    if (assets.length !== dto.ids.length) {
      throw new BusinessException('Some assets were not found');
    }

    const deletePaths = assets.map((a) => ({ path: a.objectPath, bucket: a.bucketName }));
    for (const { path, bucket } of deletePaths) {
      await this.storageService.delete(path, bucket).catch((err) => {
        this.logger.warn(`Failed to delete ${path}: ${err.message}`);
      });
    }

    const count = await this.repository.softDeleteMany(dto.ids);
    this.logger.log(`Bulk deleted ${count} assets`);
    return ApiResponseDto.success({ count }, `${count} assets deleted`);
  }

  async moveAsset(id: string, dto: MoveAssetDto) {
    const asset = await this.repository.findById(id);
    if (!asset) throw new EntityNotFoundException('MediaAsset', id);

    await this.repository.update(asset.id, {
      folderId: dto.folderId ?? null,
      version: { increment: 1 },
    });

    const updated = await this.repository.findById(asset.id);
    this.logger.log(`Asset ${id} moved to folder ${dto.folderId ?? 'root'}`);
    return ApiResponseDto.success(AssetResponseDto.fromEntity(updated!), 'Asset moved');
  }

  async copyAsset(id: string, dto: CopyAssetDto, userId: string) {
    const asset = await this.repository.findById(id);
    if (!asset) throw new EntityNotFoundException('MediaAsset', id);

    const newStoredFilename = this.storageService.generateStoredFilename(asset.originalFilename);
    const newObjectPath = dto.folderId
      ? `assets/${dto.folderId}/${newStoredFilename}`
      : `assets/${newStoredFilename}`;

    await this.storageService.copy(asset.objectPath, newObjectPath, asset.bucketName);
    const publicUrl = this.storageService.getPublicUrl(newObjectPath, asset.bucketName);
    const mediaCode = await this.generateCode();

    const copy = await this.repository.create({
      mediaCode,
      originalFilename: asset.originalFilename,
      storedFilename: newStoredFilename,
      bucketName: asset.bucketName,
      objectPath: newObjectPath,
      publicUrl,
      contentType: asset.contentType,
      extension: asset.extension,
      fileSize: asset.fileSize,
      mediaType: asset.mediaType,
      width: asset.width,
      height: asset.height,
      duration: asset.duration,
      checksum: asset.checksum + '-copy',
      uploadedBy: userId,
      folderId: dto.folderId ?? null,
      tags: asset.tags,
      description: asset.description,
      altText: asset.altText,
      visibility: asset.visibility,
      assetStatus: AssetStatus.ACTIVE,
    });

    this.logger.log(`Asset ${id} copied as ${mediaCode}`);
    return ApiResponseDto.success(AssetResponseDto.fromEntity(copy), 'Asset copied');
  }

  async findById(id: string) {
    const asset = await this.repository.findById(id);
    if (!asset) throw new EntityNotFoundException('MediaAsset', id);
    return ApiResponseDto.success(AssetResponseDto.fromEntity(asset), 'Asset retrieved');
  }

  async findAll(query: AssetQueryDto) {
    const { data, total } = await this.repository.findMany({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      mediaType: query.mediaType,
      visibility: query.visibility,
      folderId: query.folderId,
      contentType: query.contentType,
      tag: query.tag,
      uploadedBy: query.uploadedBy,
    });
    const items = data.map((a) => AssetResponseDto.fromEntity(a));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Assets retrieved');
  }

  private async generateCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-MDA-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
