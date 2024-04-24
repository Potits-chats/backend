import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('favoris')
@Controller('favoris')
export class FavorisController {
  constructor(private readonly favorisService: FavorisService) {}

  @Post()
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  create(
    @Body()
    favori: {
      id?: number;
      createdAt?: string;
      chatId: number;
      utilisateurId: number;
    },
  ) {
    return this.favorisService.create(favori);
  }

  @Get()
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  findAll() {
    return this.favorisService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.favorisService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.favorisService.remove(+id);
  }
}
