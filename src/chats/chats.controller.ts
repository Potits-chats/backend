import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  Put,
  Body,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Chats } from '@prisma/client';

@ApiTags('chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  // @Post()
  // create(@Body() createChatDto: CreateChatDto) {
  //   return this.chatsService.create(createChatDto);
  // }

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
  @Get()
  findAll(
    @Query('associationId') associationId?: number,
    @Query('take') take?: number,
    @Query('skip') skip?: number,
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
    });
  }

  @ApiOperation({ summary: "Récupération d'un chat par son id" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateChat: Chats) {
    return this.chatsService.update(+id, updateChat);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(+id);
  }
}
