import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';
import { APP_CONSTANTS } from '../constants';
import { ApiResponseShape } from '../interfaces';

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, ApiResponseShape<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponseShape<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const correlationId = (request.headers[APP_CONSTANTS.CORRELATION_ID_HEADER] as string) ?? '';

    return next.handle().pipe(
      map((data) => {
        const responseBody = data as unknown as Record<string, unknown>;
        const isAlreadyFormatted =
          responseBody !== null &&
          typeof responseBody === 'object' &&
          'success' in responseBody &&
          'message' in responseBody;

        if (isAlreadyFormatted) {
          return {
            ...(responseBody as unknown as ApiResponseShape<T>),
            timestamp: new Date().toISOString(),
            path: request.url,
            correlationId,
          };
        }

        return {
          success: true,
          message: 'Success',
          data,
          timestamp: new Date().toISOString(),
          path: request.url,
          correlationId,
        };
      }),
    );
  }
}
