import { IsInt, IsString, IsBoolean } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  userId: number;

  @IsInt()
  associationId: number;

  @IsString()
  content: string;

  @IsBoolean()
  isUserSender: boolean;
}
