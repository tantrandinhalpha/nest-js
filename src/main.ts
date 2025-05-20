import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
  });

  app.use(
    rateLimit({
      windowMs: 1000,
      max: 10,
      message: 'Too many requests, try again later.',
    }),
  );

  // app.useGlobalInterceptors(new TimeoutInterceptor(1000));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
