import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // Enable CORS
  app.enableCors();

  // Gestion des logs
  app.useLogger(app.get(Logger));

  // Listen to the specified port
  await app.listen(PORT, () => {
    Logger.log(` --- Listening at http://localhost:${PORT} ---`);
  });
}

bootstrap();
