import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { StrictParseUUIDPipe } from '../../../common/pipes';
import { CreateRoleDto, RoleQueryDto, UpdateRoleDto } from './dto';
import { VolunteerRolesService } from './volunteer-roles.service';

@ApiTags('Admin - Volunteer Roles')
@Controller('admin/roles')
@Roles('SUPER_ADMIN', 'ADMIN')
export class VolunteerRolesController {
  constructor(private readonly service: VolunteerRolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new volunteer role' })
  create(@Body() dto: CreateRoleDto, @CurrentUser('sub') adminId: string) {
    return this.service.createRole(dto, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'List all volunteer roles' })
  findAll(@Query() query: RoleQueryDto) {
    return this.service.getRoles(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role detail' })
  findOne(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.service.getRoleById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a volunteer role' })
  update(
    @Param('id', StrictParseUUIDPipe) id: string,
    @Body() dto: UpdateRoleDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.updateRole(id, dto, adminId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a volunteer role' })
  remove(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.deleteRole(id, adminId);
  }
}
