import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/roles/dtos/create-role.dto';

export const Permissions = (permission: Permission) =>
  SetMetadata('permissions', permission);
