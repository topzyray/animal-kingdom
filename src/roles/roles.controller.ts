import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() role: CreateRoleDto) {
    return this.rolesService.createRole(role);
  }

  @Get(':id')
  async getRoleById(@Param('id') roleId: string) {
    return this.rolesService.getRoleById(roleId);
  }
}
