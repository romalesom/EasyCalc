import { IsEmail, IsNotEmpty, IsOptional, IsUUID, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// DTO für die Erstellung eines neuen Datensatzes
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
//   @ApiProperty({ description: 'Die E-Mail-Adresse des Benutzers', example: 'max.mustermann@example.com' })
  email!: string;

  @IsString()
  @IsNotEmpty()
//   @ApiProperty({ description: 'Die Rolle des Benutzers', example: 'user', enum: ['user', 'admin'] })
  role!: string;
}

// DTO für die Aktualisierung eines bestehenden Datensatzes
export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
//   @ApiProperty({ description: 'Die E-Mail-Adresse des Benutzers', example: 'max.mustermann@example.com' })
  email?: string;
  
  @IsString()
  @IsOptional()
//   @ApiProperty({ description: 'Die Rolle des Benutzers', example: 'user', enum: ['user', 'admin'] })
  role?: string;
}

// DTO für die API-Antwort, die die vollständigen Daten zurückgibt
export class UserDto extends CreateUserDto {
  @IsUUID()
//   @ApiProperty({ description: 'Die eindeutige ID des Benutzers', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  id!: string;
}
