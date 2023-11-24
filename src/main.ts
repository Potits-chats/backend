import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION || 'v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // Activer le CORS
  app.enableCors();

  // Activer le versioning URL
  app.setGlobalPrefix(VERSION);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Gestion des logs
  app.useLogger(app.get(Logger));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API Potits Chats')
    .setDescription('Documentation Swagger API Potits Chats')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${VERSION}/swagger`, app, document);

  // Helmet
  app.use(helmet());

  // Lancement du serveur
  await app.listen(PORT, () => {});
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    Logger.log(' --- Prisma Studio is running at http://localhost:5555');
  }

  Logger.log(
    ` --- L'application fonctionne sur : ${
      (await app.getUrl()) == `http://[::1]:${PORT}`
        ? `http://localhost:${PORT}/${VERSION}`
        : (await app.getUrl()) + `/${VERSION}`
    }`,
  );

  Logger.log(
    ` --- Swagger fonctionne sur : ${
      (await app.getUrl()) == `http://[::1]:${PORT}`
        ? `http://localhost:${PORT}/${VERSION}/swagger`
        : (await app.getUrl()) + `/${VERSION}/swagger`
    }`,
  );
}

bootstrap();
