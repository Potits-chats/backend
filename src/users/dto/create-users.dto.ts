import { IsEmail, IsString, IsUrl } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  userId: string;

  @IsString()
  nom: string;

  @IsString()
  @IsUrl()
  img: string;
}
