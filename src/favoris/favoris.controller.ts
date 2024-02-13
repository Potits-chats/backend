import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavorisService } from './favoris.service';

@Controller('favoris')
export class FavorisController {
  constructor(private readonly favorisService: FavorisService) {}

  @Post()
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
  findAll() {
    return this.favorisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favorisService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favorisService.remove(+id);
  }
}
