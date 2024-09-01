import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Logger Middleware: ', {
      url: req.url,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      method: req.method,
      timestamp: new Date().toISOString(),
    });
    next();
  }
}
