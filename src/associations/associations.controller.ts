import {
  Controller,
  Get,
  Param,
  Delete,
  Put,
  Body,
  UseGuards,
  Post,
} from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '../authorization/permissions.guard';
import { PermissionsEnum } from '../authorization/permissions';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import {
  CreateAssociationDto,
  UpdateAssociationDto,
} from './dto/associations.dto';
import { Utilisateurs } from '@prisma/client';
import { User } from 'src/utils/user.decorator';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
  constructor(private readonly associationsService: AssociationsService) {}

  @ApiOperation({ summary: "Récupération d'une association par son id" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.associationsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Récupération de toutes les associations' })
  @Get()
  findAll() {
    return this.associationsService.findAll();
  }

  @ApiOperation({ summary: "Création d'une association" })
  @Post()
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  create(@User() user: Utilisateurs, @Body() createAsso: CreateAssociationDto) {
    return this.associationsService.create(createAsso, user);
  }

  @Put(':id')
  @UseGuards(PermissionsGuard([PermissionsEnum.UPDATE_ASSO]))
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateAsso: UpdateAssociationDto) {
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
