import { Optional } from '@nestjs/common';
import { IsInt, IsString, IsBoolean } from 'class-validator';

export class CreateMessageDto {
  @Optional()
  @IsInt()
  userId: number;

  @IsInt()
  associationId: number;

  @IsString()
  content: string;

  @IsBoolean()
  @Optional()
  isUserSender: boolean;
}
