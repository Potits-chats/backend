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
  create(@Body() createAsso: CreateAssociationDto) {
    return this.associationsService.create(createAsso);
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
