import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { CreatePublicationCategoryDto, PublicationCategoryQueryDto, UpdatePublicationCategoryDto } from './dto';
import { PublicationCategoriesService } from './publication-categories.service';

@ApiTags('Knowledge - Publication Categories')
@Controller('knowledge/publication-categories')
export class PublicationCategoriesController {
  constructor(private readonly service: PublicationCategoriesService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Create a publication category' })
  create(@Body() dto: CreatePublicationCategoryDto, @CurrentUser('sub') userId: string) {
    return this.service.create(dto, userId);
  }

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'List publication categories' })
  list(@Query() query: PublicationCategoryQueryDto) {
    return this.service.list(query);
  }

  @Get('tree')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'Get category tree' })
  getTree() {
    return this.service.getTree();
  }

  @Get('slug/:slug')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'Get category by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Get(':code')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBER')
  @ApiOperation({ summary: 'Get category by code' })
  findByCode(@Param('code') code: string) {
    return this.service.findByCode(code);
  }

  @Patch(':code')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Update a publication category' })
  update(
    @Param('code') code: string,
    @Body() dto: UpdatePublicationCategoryDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.service.update(code, dto, userId);
  }

  @Delete(':code')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Delete a publication category' })
  remove(@Param('code') code: string, @CurrentUser('sub') userId: string) {
    return this.service.remove(code, userId);
  }
}
