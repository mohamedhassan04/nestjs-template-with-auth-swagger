import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './shared/swagger/setup';
import { configService } from './config/config.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { createDatabaseIfNotExists } from './config/create-database';
import { winstonLogger } from './shared/logger/logger.config';
import * as cookieParser from 'cookie-parser';
import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from './exceptions/Auth-middelware';

require('dotenv').config();
const port = process.env.PORT || 8080;

async function bootstrap() {
  await createDatabaseIfNotExists();

  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // enable cookies
  });

  // validation input
  app.useGlobalPipes(new ValidationPipe());

  //set global prefix for all routes
  app.setGlobalPrefix(configService.apiPrefix);

  // Use cookie-parser middleware
  app.use(cookieParser());

  // swagger
  setupSwagger(app, configService.swaggerConfig);
  // Apply AuthMiddleware only to Swagger routes
  app.use(
    '/docs/v1',
    new AuthMiddleware(new JwtService({ secret: process.env.JWT_SECRET })).use,
  );

  // start server
  await app.listen(port);

  // log
  Logger.log(`Server is running on port ${port}`);
}
bootstrap();
