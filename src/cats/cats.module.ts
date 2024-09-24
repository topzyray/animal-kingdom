import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schema/cat.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    JwtModule.register({
      global: true,
      secret: 'JEPIOATPOII9VIAF9PEWOIVOCWRIVIHJKVV',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
