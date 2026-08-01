import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { APP_CONSTANTS } from '../constants';

interface ExceptionResponseBody {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, message, errorCode } = this.extractErrorInfo(exception);

    const correlationId = (request.headers[APP_CONSTANTS.CORRELATION_ID_HEADER] as string) ?? '';

    const errorResponse = {
      success: false,
      message,
      data: null,
      errorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      correlationId,
    };

    if (status >= 500) {
      this.logger.error(
        `[${correlationId}] ${request.method} ${request.url} - ${status}: ${message}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else {
      this.logger.warn(
        `[${correlationId}] ${request.method} ${request.url} - ${status}: ${message}`,
      );
    }

    response.status(status).json(errorResponse);
  }

  private extractErrorInfo(exception: unknown): {
    status: number;
    message: string;
    errorCode?: string;
  } {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        return { status, message: exceptionResponse };
      }

      const body = exceptionResponse as ExceptionResponseBody;
      const message = Array.isArray(body.message)
        ? body.message.join(', ')
        : body.message || 'An error occurred';

      return {
        status,
        message,
        errorCode: (exceptionResponse as Record<string, unknown>).errorCode as string | undefined,
      };
    }

    this.logger.error('Unhandled exception', exception instanceof Error ? exception.stack : String(exception));

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    };
  }
}
