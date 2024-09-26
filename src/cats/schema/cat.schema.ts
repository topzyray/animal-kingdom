import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema({ timestamps: true, versionKey: false })
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop()
  color: string;

  @Prop()
  weight: number;

  @Prop()
  gender: string;

  @Prop()
  adopted: boolean;

  @Prop()
  adoptedDate: Date;

  // @Prop()
  // vaccinations: [{ conditions: string; treatment: string; date: Date }];

  // @Prop()
  // medicalHistory: [{ condition: string; treatment: string; date: Date }];

  @Prop()
  photoUrl: string;

  @Prop()
  owner: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
