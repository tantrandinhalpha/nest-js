import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filter/all-exception.filter';
import { CustomEmailValidator } from 'src/common/validator/email.validator';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    CustomEmailValidator,
  ],
})
export class UserModule {}
