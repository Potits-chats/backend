import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './utils/logger.middleware';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ChatsModule } from './chats/chats.module';
import { UsersModule } from './users/users.module';
import { FavorisModule } from './favoris/favoris.module';
import { MessagesModule } from './messages/messages.module';
import { AssociationsModule } from './associations/associations.module';
import { PrismaService } from './utils/prisma.service';
import { ContactModule } from './contact/contact.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ContactService } from './contact/contact.service';
import { ContactController } from './contact/contact.controller';
import { PusherService } from './pusher/pusher.service';
import { WebhookService } from './utils/webhook.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),

    // Rate Limit : 50 requêtes par minute
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
    ChatsModule,
    UsersModule,
    FavorisModule,
    MessagesModule,
    ContactModule,
    MailerModule.forRoot({
      transport: {
        host: String(process.env.EMAIL_HOST),
        secure: false,
        auth: {
          user: String(process.env.EMAIL_USER),
          pass: String(process.env.EMAIL_PASSWORD),
        },
      },
      defaults: {
        from: '"No Reply" <noreply@potits-chats.com>',
      },
    }),
    AssociationsModule,
  ],
  controllers: [AppController, ContactController],
  providers: [
    Logger,
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    PrismaService,
    ContactService,
    PusherService,
    WebhookService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
