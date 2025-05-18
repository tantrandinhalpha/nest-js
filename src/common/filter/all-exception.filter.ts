import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { InternalErrorFilter } from './internal-error.filter';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return new HttpExceptionFilter().catch(exception, host);
    }

    new InternalErrorFilter().catch(exception, host);
  }
}
