import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsPhoneNumber,
} from 'class-validator';

export class UpdateAssociationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  url?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ville: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsPhoneNumber('FR')
  @IsOptional()
  tel?: string;
}
