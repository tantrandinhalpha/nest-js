import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filter/all-exception.filter';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class UserModule {}
