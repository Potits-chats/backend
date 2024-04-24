import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Création d'un utilisateur" })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        userId: { type: 'string' },
      },
    },
  })
  @Post()
  create(@Body() createChatDto: any) {
    return this.usersService.create(createChatDto);
  }

  @ApiOperation({ summary: 'Récupération de tous les utilisateurs' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Récupération d'un utilisateur par son id" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
  //   return this.chatsService.update(+id, updateChatDto);
  // }
}
