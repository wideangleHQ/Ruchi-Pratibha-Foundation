import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    public readonly errorCode?: string,
  ) {
    super({ message, errorCode, statusCode }, statusCode);
  }
}

export class EntityNotFoundException extends BusinessException {
  constructor(entity: string, identifier: string) {
    super(`${entity} with identifier "${identifier}" not found`, HttpStatus.NOT_FOUND, 'ENTITY_NOT_FOUND');
  }
}

export class EntityConflictException extends BusinessException {
  constructor(entity: string, field: string) {
    super(`${entity} with this ${field} already exists`, HttpStatus.CONFLICT, 'ENTITY_CONFLICT');
  }
}

export class ForbiddenResourceException extends BusinessException {
  constructor(resource?: string) {
    super(
      resource ? `Access to ${resource} is forbidden` : 'Access forbidden',
      HttpStatus.FORBIDDEN,
      'FORBIDDEN_RESOURCE',
    );
  }
}
