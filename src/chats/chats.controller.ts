import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  Put,
  Body,
  UseGuards,
  Post,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Chats, Utilisateurs } from '@prisma/client';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { PermissionsGuard } from '../authorization/permissions.guard';
import { PermissionsEnum } from '../authorization/permissions';
import { User } from '../utils/user.decorator';
import { CreateCatDto } from './dto/chats.dto';
import { UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @ApiOperation({ summary: "Création d'un chat" })
  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  create(
    @UploadedFiles() photos: Express.Multer.File[],
    @Body('chat') chatData: string,
    @User() user: Utilisateurs,
  ) {
    const createChatDto: CreateCatDto = JSON.parse(chatData);
    return this.chatsService.create(createChatDto, photos, user);
  }
  @ApiOperation({ summary: 'Récupération de tous les chats' })
  @ApiQuery({
    name: 'associationId',
    required: false,
    description: "id de l'association pour filtrer les chats",
    type: Number,
  })
  @ApiQuery({
    name: 'take',
    required: false,
    description: 'Nombre de chats à récupérer',
    type: Number,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: 'Nombre de chats à sauter',
    type: Number,
  })
  @ApiQuery({
    name: 'ville',
    required: false,
    description: 'Ville pour filtrer les chats',
    type: String,
  })
  @ApiQuery({
    name: 'race',
    required: false,
    description: 'Race des chats pour filtrer',
    type: String,
  })
  @Get()
  findAll(
    @Query('associationId') associationId?: number,
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('ville') ville?: string,
    @Query('race') race?: string,
  ) {
    take = Number(take) || 10;
    skip = Number(skip) || 0;
    if (associationId) {
      associationId = Number(associationId);
    }

    return this.chatsService.findAll({
      associationId,
      take,
      skip,
      ville,
      race,
    });
  }

  @ApiOperation({
    summary: "Récupération des chats favoris de l'utilisateur connecté",
  })
  @Get('/favoris')
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  findByFavoris(@User() user: Utilisateurs) {
    return this.chatsService.findByFavoris(user);
  }

  @ApiOperation({ summary: "Récupération d'un chat par son id" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(+id);
  }

  @ApiOperation({ summary: "Mise à jour d'un chat par son id" })
  @Put(':id')
  @UseGuards(PermissionsGuard([PermissionsEnum.UPDATE_CHAT]))
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @UploadedFiles() photos: Express.Multer.File[],
    @Body('chat') chatData: string,
  ) {
    const updateChatDto: Chats = JSON.parse(chatData);
    return this.chatsService.update(+id, updateChatDto, photos);
  }

  @ApiOperation({ summary: "Suppression d'un chat par son id" })
  @Delete(':id')
  @UseGuards(PermissionsGuard([PermissionsEnum.DELETE_CHAT]))
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.chatsService.remove(+id);
  }
}
