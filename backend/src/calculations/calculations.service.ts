import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CalculationInput } from '../entities/calculation-input.entity';
import { CalculationResult } from '../entities/calculation-result.entity';
import { MasterData } from '../entities/master-data.entity';

@Injectable()
export class CalculationsService {
  constructor(
    @InjectRepository(CalculationInput)
    private readonly calculationInputRepo: Repository<CalculationInput>,
    @InjectRepository(CalculationResult)
    private readonly calculationResultRepo: Repository<CalculationResult>,
    @InjectRepository(MasterData)
    private readonly masterDataRepo: Repository<MasterData>,
  ) {}

  // Neue Berechnung erstellen
  async createCalculation(userId: string, inputValues: any): Promise<CalculationResult> {
    // 1️⃣ Input speichern
    const input = this.calculationInputRepo.create({ userId, hoursSpent: inputValues.hoursSpent, materialsConsumed: inputValues.materialsConsumed, outsourcedServicesAndEquipment: inputValues.outsourcedServicesAndEquipment, priceEstimate: inputValues.priceEstimate });
    await this.calculationInputRepo.save(input);

    // 2️⃣ Stammdaten abrufen
    const masterData = await this.masterDataRepo.find();
    
    // 3️⃣ Berechnung durchführen (Beispiel: Summe aller Zahlen)
    const total = Object.values(inputValues).reduce((sum: number, val: any) => sum + Number(val || 0), 0);

    // 4️⃣ Traffic-Light-System bestimmen
    let trafficLight = 'green';
    if (total > 1000) trafficLight = 'red';
    else if (total > 500) trafficLight = 'yellow';

    // 5️⃣ Ergebnis speichern
    const result = this.calculationResultRepo.create({
      calculationId: input.id,
      resultValues: { total },
      trafficLight,
      score: total,
    });
    await this.calculationResultRepo.save(result);

    return result;
  }

  // Alle Berechnungen eines Users abrufen
  async getUserCalculations(userId: string): Promise<CalculationResult[]> {
    const inputs = await this.calculationInputRepo.find({ where: { userId } });
    const inputIds = inputs.map(i => i.id);
    return this.calculationResultRepo.find({ where: { calculationId: In(inputIds) } });
  }
}
