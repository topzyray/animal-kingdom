import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schemas/roles.schema';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async createRole(roleData: CreateRoleDto) {
    // TODO Validate unique names
    const newRole = await this.roleModel.create(roleData);
    if (!newRole) {
      throw new NotImplementedException('Error creating role!');
    }
    return newRole;
  }

  async getRoleById(roleId: string) {
    const role = await this.roleModel.findById(roleId);
    if (!role) {
      throw new NotFoundException('Role with the specified ID not found!');
    }
    return role;
  }
}
