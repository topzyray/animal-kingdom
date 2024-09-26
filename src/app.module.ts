import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { OwnersModule } from './owners/owners.module';
import config from './confg/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      // isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    CatsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
