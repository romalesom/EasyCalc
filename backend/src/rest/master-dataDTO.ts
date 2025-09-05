import { IsNumber, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// DTO für die Erstellung eines neuen Datensatzes
export class CreateMasterDataDto {
  @IsNumber()
  @IsNotEmpty()
//   @ApiProperty({ description: 'Umsatzerlöse', example: 10000 })
  salesRevenue!: number;

  @IsNumber()
  @IsNotEmpty()
//   @ApiProperty({ description: 'Materialeinsatz', example: 2500 })
  materialCosts!: number;

  @IsNumber()
  @IsNotEmpty()
//   @ApiProperty({ description: 'Personalkosten Produktion', example: 3000 })
  personnelCostsProduction!: number;

  @IsNumber()
  @IsNotEmpty()
//   @ApiProperty({ description: 'Personalkosten Verwaltung', example: 1500 })
  personnelCostsAdministration!: number;

  @IsNumber()
  @IsNotEmpty()
//   @ApiProperty({ description: 'Produktionsstunden Kapazität', example: 200 })
  productionHoursCapacity!: number;

  @IsNumber()
  @IsOptional()
//   @ApiProperty({ description: 'Abschreibungen', example: 500 })
  depreciation: number = 0;

  @IsNumber()
  @IsOptional()
//@ApiProperty({ description: 'Raumkosten', example: 300 })
  roomCosts: number = 0;

  @IsNumber()
  @IsOptional()
//   @ApiProperty({ description: 'Versicherungsgebühren', example: 100 })
  insuranceFees: number = 0;

  @IsNumber()
  @IsOptional()
//   @ApiProperty({ description: 'Werbe- und Reisekosten', example: 200 })
  advertisingAndTravelCosts: number = 0;

  @IsNumber()
  @IsOptional()
//   @ApiProperty({ description: 'Fahrzeugkosten', example: 150 })
  vehicleCosts: number = 0;

  @IsNumber()
  @IsOptional()
//   @ApiProperty({ description: 'Betriebssteuern', example: 50 })
  businessTaxes: number = 0;

  @IsNumber()
  @IsOptional()
  //@ApiProperty({ description: 'Kosten der verkauften Waren', example: 1000 })
  costOfGoodsSold: number = 0;

  @IsNumber()
  @IsOptional()
  //@ApiProperty({ description: 'Leasingkosten', example: 250 })
  leasing: number = 0;

  @IsNumber()
  @IsOptional()
//   @ApiProperty({ description: 'IT-Kosten', example: 120 })
  itCosts: number = 0;

  @IsNumber()
  @IsOptional()
//   @ApiProperty({ description: 'Maschinenkosten', example: 400 })
  machineCosts: number = 0;

  @IsNumber()
  @IsOptional()
//   @ApiProperty({ description: 'Reparaturkosten', example: 80 })
  repairs: number = 0;

  @IsNumber()
  @IsOptional()
//   @ApiProperty({ description: 'Zinsaufwendungen', example: 60 })
  interestExpenses: number = 0;

  @IsNumber()
  @IsOptional()
//   @ApiProperty({ description: 'Sonstige Kosten', example: 90 })
  otherCosts: number = 0;

  @IsNumber()
  @IsNotEmpty()
//   @ApiProperty({ description: 'Geplanter Gewinn', example: 4000 })
  plannedProfit!: number;
}

// DTO für die Aktualisierung eines bestehenden Datensatzes
export class UpdateMasterDataDto extends CreateMasterDataDto {
  // Alle Felder sind hier optional, da der Patch-Befehl nicht alle Felder erfordert.
}

// DTO für die API-Antwort, die die vollständigen Daten zurückgibt
export class MasterDataDto extends CreateMasterDataDto {
  @IsUUID()
//   @ApiProperty({ description: 'Die eindeutige ID des Datensatzes', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  id!: string;
}
