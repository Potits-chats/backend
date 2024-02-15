import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createChatDto: CreateChatDto) {
  //   return this.chatsService.create(createChatDto);
  // }

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
