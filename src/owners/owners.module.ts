import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { ConfigModule } from '@nestjs/config';
import config from 'src/confg/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Owner, OwnerSchema } from './schema/owner.schema';

@Module({
  imports: [
    // ConfigModule.forFeature(config),
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
