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

  // Activer le CORS
  app.enableCors();
  // app.enableCors({
  //   origin: [
  //     '*',
  //     'http://127.0.0.1:5500',
  //     // 'http://localhost:3000',
  //     // 'https://potits-chats.vercel.app/',
  //     // 'http://localhost:4200',
  //   ],
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  //   credentials: true,
  // });
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });

  // Lancement du serveur sur le port 3000
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
