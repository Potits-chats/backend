import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { PrismaModule } from '../utils/prisma.module';

@Module({
  controllers: [AssociationsController],
  providers: [AssociationsService],
  imports: [PrismaModule],
})
export class AssociationsModule {}
