import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type AnimalDocument = HydratedDocument<Animal>;

@Schema({ timestamps: true, versionKey: false })
export class Animal {
  @Prop()
  name: string;

  @Prop()
  family: string;

  @Prop()
  color: string;

  @Prop()
  gender: string;

  @Prop()
  photoUrl: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  user: Types.ObjectId;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
