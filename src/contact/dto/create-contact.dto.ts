import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty()
  nom: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  message: string;
}
