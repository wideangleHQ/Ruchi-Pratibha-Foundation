import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import {
  AddGalleryImageDto,
  AlbumQueryDto,
  CreateAlbumDto,
  UpdateAlbumDto,
  UpdateGalleryImageDto,
} from './dto';
import { GalleryService } from './gallery.service';

@ApiTags('Media - Gallery')
@Controller('media/gallery')
export class GalleryController {
  constructor(private readonly service: GalleryService) {}

  @Post('albums')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'Create a gallery album' })
  createAlbum(@Body() dto: CreateAlbumDto, @CurrentUser('sub') userId: string) {
    return this.service.createAlbum(dto, userId);
  }

  @Get('albums')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'List gallery albums' })
  listAlbums(@Query() query: AlbumQueryDto) {
    return this.service.listAlbums(query);
  }

  @Get('albums/slug/:slug')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'Get album by slug' })
  findAlbumBySlug(@Param('slug') slug: string) {
    return this.service.findAlbumBySlug(slug);
  }

  @Get('albums/:code')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'Get album by code' })
  findAlbumByCode(@Param('code') code: string) {
    return this.service.findAlbumByCode(code);
  }

  @Patch('albums/:code')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'Update an album' })
  updateAlbum(
    @Param('code') code: string,
    @Body() dto: UpdateAlbumDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.service.updateAlbum(code, dto, userId);
  }

  @Delete('albums/:code')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Delete an album' })
  deleteAlbum(@Param('code') code: string, @CurrentUser('sub') userId: string) {
    return this.service.deleteAlbum(code, userId);
  }

  @Get('albums/:code/images')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'Get album images' })
  getAlbumImages(@Param('code') code: string) {
    return this.service.getAlbumImages(code);
  }

  @Post('albums/:code/images')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'Add image to album' })
  addImage(
    @Param('code') code: string,
    @Body() dto: AddGalleryImageDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.service.addImage(code, dto, userId);
  }

  @Patch('images/:imageId')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'Update gallery image' })
  updateImage(
    @Param('imageId') imageId: string,
    @Body() dto: UpdateGalleryImageDto,
  ) {
    return this.service.updateImage(imageId, dto);
  }

  @Delete('images/:imageId')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Remove image from album' })
  removeImage(@Param('imageId') imageId: string) {
    return this.service.removeImage(imageId);
  }
}
