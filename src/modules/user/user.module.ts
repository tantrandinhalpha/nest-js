import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filter/all-exception.filter';
import { CustomEmailValidator } from 'src/common/validator/email.validator';
import { RolesGuard } from 'src/common/guard/role.guard';
import { TimeoutInterceptor } from 'src/common/interceptor/timeout.interceptor';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useValue: new TimeoutInterceptor(1000),
    },
    CustomEmailValidator,
  ],
})
export class UserModule {}
