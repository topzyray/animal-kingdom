import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schema/cat.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/confg/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('secrets.jwtSecret'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
