import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UserController } from './modules/user/user.controller';
import helmet from 'helmet';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, helmet())
      .exclude({ path: '/user', method: RequestMethod.GET })
      .forRoutes(UserController);
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
