import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  // @Post()
  // create(@Body() createChatDto: CreateChatDto) {
  //   return this.chatsService.create(createChatDto);
  // }

  @ApiOperation({ summary: 'Récupération de tous les chats' })
  @ApiQuery({
    name: 'associationName',
    required: false,
    description: "Nom de l'association pour filtrer les chats",
  })
  @Get()
  findAll(
    @Query('associationName') associationName?: string,
    @Query('take') take: number = 10,
    @Query('skip') skip: number = 0,
  ) {
    take > 10 ? (take = 10) : take;
    return this.chatsService.findAll({
      associationName,
      take,
      skip,
    });
  }

  @ApiOperation({ summary: "Récupération d'un chat par son id" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
  //   return this.chatsService.update(+id, updateChatDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(+id);
  }
}
