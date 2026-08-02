import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { CreateDocumentDto, DocumentQueryDto, UpdateDocumentDto } from './dto';
import { DocumentsService } from './documents.service';

@ApiTags('Media - Documents')
@Controller('media/documents')
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'Create a document record' })
  create(@Body() dto: CreateDocumentDto, @CurrentUser('sub') userId: string) {
    return this.service.create(dto, userId);
  }

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'List documents' })
  list(@Query() query: DocumentQueryDto) {
    return this.service.list(query);
  }

  @Get('slug/:slug')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'Get document by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Get(':code')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'Get document by code' })
  findByCode(@Param('code') code: string) {
    return this.service.findByCode(code);
  }

  @Patch(':code')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'Update a document' })
  update(
    @Param('code') code: string,
    @Body() dto: UpdateDocumentDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.service.update(code, dto, userId);
  }

  @Delete(':code')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Delete a document' })
  remove(@Param('code') code: string, @CurrentUser('sub') userId: string) {
    return this.service.remove(code, userId);
  }

  @Post(':code/download')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'Track document download' })
  trackDownload(@Param('code') code: string) {
    return this.service.trackDownload(code);
  }
}
