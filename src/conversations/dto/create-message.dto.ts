import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Contenu du message',
    example: 'Hello World',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Nom du canal',
    example: 'presence-channel-1',
  })
  @IsString()
  channel: string;
}
