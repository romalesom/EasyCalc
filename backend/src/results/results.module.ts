import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { CalculationResult } from '../entities/calculation-result.entity';
import { CalculationInput } from '../entities/calculation-input.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalculationResult, CalculationInput])],
  providers: [ResultsService],
  controllers: [ResultsController],
})
export class ResultsModule {}
