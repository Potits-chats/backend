import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Username',
    example: 'Léo',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Contenu du message',
    example: 'Hello World',
  })
  @IsString()
  message: string;
}
