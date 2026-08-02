import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import {
  AssetQueryDto,
  BulkDeleteAssetsDto,
  CopyAssetDto,
  MoveAssetDto,
  UpdateAssetDto,
  UploadAssetDto,
} from './dto';
import { AssetsService } from './assets.service';

@ApiTags('Media - Assets')
@Controller('media')
export class AssetsController {
  constructor(private readonly service: AssetsService) {}

  @Post('upload')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a single file' })
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadAssetDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.service.upload(file, dto, userId);
  }

  @Post('upload-multiple')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @UseInterceptors(FilesInterceptor('files', 20))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload multiple files' })
  uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: UploadAssetDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.service.uploadMultiple(files, dto, userId);
  }

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'List/search media assets' })
  findAll(@Query() query: AssetQueryDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'Get asset by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'Update asset metadata' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAssetDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.service.update(id, dto, userId);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Delete an asset' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('move')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'Move asset to a folder' })
  move(
    @Body() body: MoveAssetDto & { id: string },
  ) {
    return this.service.moveAsset(body.id, body);
  }

  @Post('copy')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'Copy an asset' })
  copy(
    @Body() body: CopyAssetDto & { id: string },
    @CurrentUser('sub') userId: string,
  ) {
    return this.service.copyAsset(body.id, body, userId);
  }

  @Post('delete-bulk')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Bulk delete assets' })
  bulkDelete(@Body() dto: BulkDeleteAssetsDto) {
    return this.service.bulkDelete(dto);
  }
}
