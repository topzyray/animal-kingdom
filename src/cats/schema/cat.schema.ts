import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type CatDocument = HydratedDocument<Cat>;

@Schema({ timestamps: true, versionKey: false })
export class Cat {
  @Prop()
  name: string;

  @Prop()
  breed: string;

  @Prop()
  color: string;

  @Prop()
  gender: string;

  @Prop()
  photoUrl: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  owner: Types.ObjectId;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
