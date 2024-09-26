import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomInterceptor } from './interceptors/custominterceptor.intercepor';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerInstance = app.get(Logger)
  const config = app.get(ConfigService)
  app.useGlobalFilters(new HttpExceptionFilter(loggerInstance))
  app.useGlobalInterceptors(new CustomInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  await app.listen(config.get('port'));
}
bootstrap();
