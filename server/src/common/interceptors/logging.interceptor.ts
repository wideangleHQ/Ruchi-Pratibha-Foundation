import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { APP_CONSTANTS } from '../constants';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;
    const correlationId = (request.headers[APP_CONSTANTS.CORRELATION_ID_HEADER] as string) ?? '';
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const responseTime = Date.now() - startTime;
          this.logger.log(
            `[${correlationId}] ${method} ${url} - ${responseTime}ms`,
          );
        },
        error: () => {
          const responseTime = Date.now() - startTime;
          this.logger.error(
            `[${correlationId}] ${method} ${url} - ${responseTime}ms [ERROR]`,
          );
        },
      }),
    );
  }
}
