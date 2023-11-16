import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

// Prisma error handling for the client
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;
    switch (exception.code) {
      case 'P2020':
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message,
        });
        break;
      //TODO add exception for prisma client db errors
      //INFO Prisma error -  https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
      //case '': ...

      default:
        super.catch(exception, host);
    }
  }
}
