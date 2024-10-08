import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaModule } from '../utils/prisma.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [PrismaModule],
})
export class FilesModule {}
