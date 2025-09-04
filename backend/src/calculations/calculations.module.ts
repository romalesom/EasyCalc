import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculationsService } from './calculations.service';
import { CalculationsController } from './calculations.controller';
import { CalculationInput } from '../entities/calculation-input.entity';
import { CalculationResult } from '../entities/calculation-result.entity';
import { MasterData } from '../entities/master-data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CalculationInput, CalculationResult, MasterData]),
  ],
  providers: [CalculationsService],
  controllers: [CalculationsController],
})
export class CalculationsModule {}
