import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Sexe, Taille } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
  Max,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
  IsUrl,
} from 'class-validator';

export class CreateCatDto {
  @ApiProperty({ example: 'Mimi', description: 'Nom du chat' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ example: 2, description: 'Âge du chat' })
  @IsInt()
  @Min(0)
  @Max(30)
  age: number;

  @ApiPropertyOptional({
    example: false,
    description: 'Annonce automatique activée ou non',
  })
  @IsBoolean()
  @IsOptional()
  automatiqueAnnonce?: boolean;

  @ApiProperty({
    example: 'Un chat très affectueux',
    description: 'Description du chat',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ example: 'Siamois', description: 'Race du chat' })
  @IsString()
  @IsOptional()
  race?: string;

  @ApiPropertyOptional({
    example: 'http://example.com/annonce',
    description: "URL de l'annonce",
  })
  @IsUrl()
  @IsOptional()
  annonceUrl?: string;

  @ApiPropertyOptional({ example: true, description: 'Chat stérilisé ou non' })
  @IsBoolean()
  @IsOptional()
  sterilise?: boolean;

  @ApiPropertyOptional({
    example: 'Vaccin anti-rabique',
    description: 'Détails des vaccinations du chat',
  })
  @IsString()
  @IsOptional()
  vaccinations?: string;

  @ApiPropertyOptional({ example: true, description: 'Chat adopté ou non' })
  @IsBoolean()
  @IsOptional()
  adopte?: boolean;

  @ApiPropertyOptional({
    example: 'Sauvé de la rue',
    description: 'Histoire du chat',
  })
  @IsString()
  @IsOptional()
  histoire?: string;

  @ApiPropertyOptional({ example: 'Européen', description: 'Type de chat' })
  @IsString()
  @IsOptional()
  type?: string = 'Européen';

  @ApiProperty({
    enum: Sexe,
    example: Sexe.FEMELLE,
    description: 'Sexe du chat',
  })
  @IsEnum(Sexe)
  sexe: Sexe;

  @ApiPropertyOptional({ example: 'Tigré', description: 'Couleur du chat' })
  @IsString()
  @IsOptional()
  couleur?: string = 'Tigré';

  @ApiProperty({
    enum: Taille,
    example: Taille.MOYEN,
    description: 'Taille du chat',
  })
  @IsEnum(Taille)
  taille: Taille;

  @ApiPropertyOptional({
    example: true,
    description: 'Compatibilité avec les chiens',
  })
  @IsBoolean()
  @IsOptional()
  ententeChien?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Compatibilité avec les chats',
  })
  @IsBoolean()
  @IsOptional()
  ententeChat?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Compatibilité avec les enfants',
  })
  @IsBoolean()
  @IsOptional()
  ententeEnfant?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Adapté pour un foyer en maison',
  })
  @IsBoolean()
  @IsOptional()
  typeFoyerMaison?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Adapté pour un foyer en appartement',
  })
  @IsBoolean()
  @IsOptional()
  typeFoyerAppartement?: boolean;

  @ApiPropertyOptional({
    example: 'contact@example.com',
    description: 'Email de contact pour le chat',
  })
  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @ApiPropertyOptional({
    example: '+33612345678',
    description: 'Téléphone de contact pour le chat',
  })
  @IsPhoneNumber(null)
  @IsOptional()
  contactTel?: string;

  @ApiPropertyOptional({
    example: 'http://example.com/contact',
    description: 'URL de contact pour le chat',
  })
  @IsUrl()
  @IsOptional()
  contactUrl?: string;
}
