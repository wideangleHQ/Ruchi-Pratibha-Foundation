import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { GlobalExceptionFilter, PrismaExceptionFilter } from './common/filters';
import { ResponseTransformInterceptor, LoggingInterceptor, TimeoutInterceptor } from './common/interceptors';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const port = configService.getOrThrow<number>('app.port');
  const apiPrefix = configService.getOrThrow<string>('app.apiPrefix');
  const apiVersion = configService.getOrThrow<string>('app.apiVersion');
  const corsOrigins = configService.getOrThrow<string[]>('app.corsOrigins');
  const nodeEnv = configService.getOrThrow<string>('app.nodeEnv');

  app.setGlobalPrefix(`${apiPrefix}/${apiVersion}`);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(helmet({
    contentSecurityPolicy: nodeEnv === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: nodeEnv === 'production',
  }));

  app.use(compression());
  app.use(cookieParser());

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-correlation-id', 'x-request-id'],
    exposedHeaders: ['x-correlation-id', 'x-request-id'],
    credentials: true,
    maxAge: 86400,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      disableErrorMessages: nodeEnv === 'production',
    }),
  );

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new PrismaExceptionFilter(),
  );

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseTransformInterceptor(),
    new TimeoutInterceptor(30000),
  );

  const swaggerEnabled = configService.get<boolean>('swagger.enabled', true);
  if (swaggerEnabled) {
    const swaggerTitle = configService.getOrThrow<string>('swagger.title');
    const swaggerDescription = configService.getOrThrow<string>('swagger.description');
    const swaggerPath = configService.getOrThrow<string>('swagger.path');

    const swaggerConfig = new DocumentBuilder()
      .setTitle(swaggerTitle)
      .setDescription(swaggerDescription)
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'Enter JWT token',
          in: 'header',
        },
        'access-token',
      )
      .addCookieAuth('rpf_dashboard_access', {
        type: 'apiKey',
        in: 'cookie',
        name: 'rpf_dashboard_access',
        description: 'Dashboard access token cookie',
      })
      .addTag('Health', 'Health check endpoints')
      .addTag('Volunteers', 'Volunteer registration and lookup')
      .addTag('Dashboard Auth', 'Dashboard access gateway')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(swaggerPath, app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'none',
        filter: true,
        showRequestDuration: true,
      },
    });

    logger.log(`Swagger documentation available at /${swaggerPath}`);
  }

  app.enableShutdownHooks();

  await app.listen(port);
  logger.log(`Application running on port ${port} [${nodeEnv}]`);
  logger.log(`API available at /${apiPrefix}/${apiVersion}`);
}

void bootstrap();
