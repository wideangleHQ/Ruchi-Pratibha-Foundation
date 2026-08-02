import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { PaginationQueryDto } from '../../../common/dto';
import { CreateFolderDto, MoveFolderDto, UpdateFolderDto } from './dto';
import { FoldersService } from './folders.service';

@ApiTags('Media - Folders')
@Controller('media/folders')
@Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
export class FoldersController {
  constructor(private readonly service: FoldersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a folder' })
  create(@Body() dto: CreateFolderDto, @CurrentUser('sub') userId: string) {
    return this.service.create(dto, userId);
  }

  @Get('tree')
  @ApiOperation({ summary: 'Get full folder tree' })
  getTree() {
    return this.service.getTree();
  }

  @Get('children')
  @ApiOperation({ summary: 'Get root-level folders' })
  getRootChildren() {
    return this.service.getChildren(null);
  }

  @Get('children/:parentId')
  @ApiOperation({ summary: 'Get child folders of a parent' })
  getChildren(@Param('parentId') parentId: string) {
    return this.service.getChildren(parentId);
  }

  @Get(':code/breadcrumb')
  @ApiOperation({ summary: 'Get folder breadcrumb' })
  getBreadcrumb(@Param('code') code: string) {
    return this.service.getBreadcrumb(code);
  }

  @Get(':code/stats')
  @ApiOperation({ summary: 'Get folder statistics' })
  getStats(@Param('code') code: string) {
    return this.service.getStatistics(code);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get folder by code' })
  findByCode(@Param('code') code: string) {
    return this.service.findByCode(code);
  }

  @Get()
  @ApiOperation({ summary: 'List folders' })
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.list(query);
  }

  @Patch(':code')
  @ApiOperation({ summary: 'Update a folder' })
  update(
    @Param('code') code: string,
    @Body() dto: UpdateFolderDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.service.update(code, dto, userId);
  }

  @Post(':code/move')
  @ApiOperation({ summary: 'Move a folder' })
  move(
    @Param('code') code: string,
    @Body() dto: MoveFolderDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.service.move(code, dto, userId);
  }

  @Delete(':code')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Delete a folder' })
  remove(@Param('code') code: string, @CurrentUser('sub') userId: string) {
    return this.service.remove(code, userId);
  }
}
