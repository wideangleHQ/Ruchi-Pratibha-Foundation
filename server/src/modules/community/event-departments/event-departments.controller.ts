import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { StrictParseUUIDPipe } from '../../../common/pipes';
import { CreateDepartmentDto, DepartmentQueryDto, UpdateDepartmentDto } from './dto';
import { EventDepartmentsService } from './event-departments.service';

@ApiTags('Admin - Event Departments')
@Controller('admin/departments')
@Roles('SUPER_ADMIN', 'ADMIN')
export class EventDepartmentsController {
  constructor(private readonly service: EventDepartmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  create(@Body() dto: CreateDepartmentDto, @CurrentUser('sub') adminId: string) {
    return this.service.createDepartment(dto, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'List all departments' })
  findAll(@Query() query: DepartmentQueryDto) {
    return this.service.getDepartments(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get department detail' })
  findOne(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.service.getDepartmentById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a department' })
  update(
    @Param('id', StrictParseUUIDPipe) id: string,
    @Body() dto: UpdateDepartmentDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.updateDepartment(id, dto, adminId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a department' })
  remove(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.deleteDepartment(id, adminId);
  }
}
