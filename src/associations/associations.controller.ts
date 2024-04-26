import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AssociationsService } from './associations.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PermissionsGuard } from 'src/authorization/permissions.guard';
import { PermissionsEnum } from 'src/authorization/permissions';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { Associations } from '@prisma/client';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
  constructor(private readonly associationsService: AssociationsService) {}

  @ApiOperation({ summary: 'Récupération de toutes les associations' })
  @ApiQuery({
    name: 'chatId',
    required: false,
    description: 'id du chat pour filtrer les associations',
    type: Number,
  })
  @ApiQuery({
    name: 'take',
    required: false,
    description: "Nombre d'associations à récupérer",
    type: Number,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: "Nombre d'associations à sauter",
    type: Number,
  })
  @Get()
  findAll(
    @Query('chatId') chatId?: number,
    @Query('take') take?: number,
    @Query('skip') skip?: number,
  ) {
    take = Number(take) || 10;
    skip = Number(skip) || 0;
    if (chatId) {
      chatId = Number(chatId);
    }

    return this.associationsService.findAll({
      chatId,
      take,
      skip,
    });
  }

  @ApiOperation({ summary: "Récupération d'une association par son id" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.associationsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(PermissionsGuard([PermissionsEnum.UPDATE_ASSO]))
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateAsso: Associations) {
    return this.associationsService.update(+id, updateAsso);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard([PermissionsEnum.DELETE_ASSO]))
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.associationsService.remove(+id);
  }
}
