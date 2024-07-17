import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { Utilisateurs } from '@prisma/client';
import { User } from '../utils/user.decorator';

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
        nom: { type: 'string' },
        img: { type: 'string' },
      },
    },
  })
  @Post()
  create(@Body() createChatDto: any) {
    return this.usersService.create(createChatDto);
  }

  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Récupération d'un utilisateur" })
  @Get('infos')
  findBySub(@User() user: Utilisateurs) {
    const userWithAssociationInfo = {
      ...user,
      isAssociation: !!user.associationId,
    };
    return userWithAssociationInfo;
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
