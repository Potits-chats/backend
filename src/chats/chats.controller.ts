import { Controller, Get, Param, Delete } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  // @Post()
  // create(@Body() createChatDto: CreateChatDto) {
  //   return this.chatsService.create(createChatDto);
  // }

  @ApiOperation({ summary: 'Récupération de tous les chats' })
  @Get()
  findAll() {
    return this.chatsService.findAll();
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
