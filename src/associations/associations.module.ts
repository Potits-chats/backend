import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { PrismaModule } from '../utils/prisma.module';
import { WebhookService } from '../utils/webhook.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [AssociationsController],
  providers: [AssociationsService, WebhookService],
  imports: [PrismaModule, HttpModule],
})
export class AssociationsModule {}
