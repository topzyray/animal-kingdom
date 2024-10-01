import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from './schema/animals.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }])],
  controllers: [AnimalsController],
  providers: [AnimalsService, JwtService],
})
export class AnimalsModule {}
