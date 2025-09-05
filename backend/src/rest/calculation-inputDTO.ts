import { IsNumber, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// DTO für die Erstellung eines neuen Datensatzes
export class CreateCalculationInputDto {
  @IsNumber()
  @IsNotEmpty()
//   @ApiProperty({ description: 'Aufgewendete Stunden', example: 120 })
  hoursSpent!: number;

  @IsNumber()
  @IsNotEmpty()
//   @ApiProperty({ description: 'Verbrauchtes Material', example: 50 })
  materialsConsumed!: number;

  @IsNumber()
  @IsNotEmpty()
//   @ApiProperty({ description: 'Fremdleistungen und Ausrüstung', example: 25 })
  outsourcedServicesAndEquipment!: number;

  @IsNumber()
  @IsOptional()
//   @ApiProperty({ description: 'Preis Einschätzung', example: 150.75 })
  priceEstimate: number = 0;

  @IsUUID()
  @IsNotEmpty()
//   @ApiProperty({ description: 'ID des Benutzers', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  userId!: string;
}

// DTO für die Aktualisierung eines bestehenden Datensatzes
export class UpdateCalculationInputDto extends CreateCalculationInputDto {
  // Alle Felder sind hier optional, da der Patch-Befehl nicht alle Felder erfordert.
}

// DTO für die API-Antwort, die die vollständigen Daten zurückgibt
export class CalculationInputDto extends CreateCalculationInputDto {
  @IsUUID()
//   @ApiProperty({ description: 'Die eindeutige ID des Datensatzes', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  id!: string;
}
