import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { ConfigModule } from '@nestjs/config';
import config from 'src/confg/config';

@Module({
  imports: [ConfigModule.forFeature(config)],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
