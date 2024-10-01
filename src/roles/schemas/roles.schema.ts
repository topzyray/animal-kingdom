import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Resource } from '../enums/resource.enum';
import { Action } from '../enums/action.enum';

@Schema()
class Permission {
  @Prop({ required: true, enum: Resource })
  resource: Resource;

  @Prop({ type: [{ type: String, enum: Action }] })
  action: Action[];
}

@Schema()
export class Role {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: [Permission] })
  permission: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
