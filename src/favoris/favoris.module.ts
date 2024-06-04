import { Module } from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { FavorisController } from './favoris.controller';
import { PrismaModule } from '../utils/prisma.module';

@Module({
  controllers: [FavorisController],
  providers: [FavorisService],
  imports: [PrismaModule],
})
export class FavorisModule {}
