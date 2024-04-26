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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../utils/user.decorator';
import { Utilisateurs } from '@prisma/client';

@ApiTags('favoris')
@Controller('favoris')
export class FavorisController {
  constructor(private readonly favorisService: FavorisService) {}

  @ApiOperation({ summary: "Création d'un favori" })
  @Post()
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  create(
    @Body()
    favori: {
      id?: number;
      createdAt?: string;
      chatId: number;
    },
    @User() user: Utilisateurs,
  ) {
    return this.favorisService.create(favori, user);
  }

  @ApiOperation({ summary: 'Récupération de tous les favoris par utilisateur' })
  @Get()
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  findByUser(@User() user: Utilisateurs) {
    return this.favorisService.findByUser(user);
  }

  @ApiOperation({ summary: 'Suppression d un favori' })
  @Delete(':id')
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  removeByCat(@Param('id') id: number, @User() user: Utilisateurs) {
    return this.favorisService.removeByCat(+id, user);
  }
}
