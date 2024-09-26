import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    // console.log(
    //   'Inside the Interceptor',
    //   context.switchToHttp().getRequest().originalUrl,
    // );

    const request = context.switchToHttp().getRequest();
    request.headers['accept-language'] = 'yr';

    return next.handle().pipe(
      map((data) => ({
        success: true,
        status: 200,
        timestamp: new Date(),
        data,
      })),
    );
  }
}
