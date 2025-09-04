import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CalculationResult } from '../entities/calculation-result.entity';
import { CalculationInput } from '../entities/calculation-input.entity';
import { redisClient } from '../config/redis.config'; // ✅ Redis import

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(CalculationResult)
    private readonly resultRepo: Repository<CalculationResult>,
    @InjectRepository(CalculationInput)
    private readonly inputRepo: Repository<CalculationInput>,
  ) {}

  // Alle Ergebnisse eines Users abrufen (mit Redis Cache)
  async getUserResults(userId: string): Promise<CalculationResult[]> {
    const cacheKey = `results:user:${userId}`;

    // 1️⃣ Prüfen, ob Ergebnisse im Cache vorhanden
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // 2️⃣ Wenn nicht im Cache, aus DB abrufen
    const inputs = await this.inputRepo.find({
      where: { userId },
      select: ['id'],
    });

    if (inputs.length === 0) return [];

    const inputIds = inputs.map(input => input.id);
    const results = await this.resultRepo.find({
      where: { calculationId: In(inputIds) },
      order: { createdAt: 'DESC' },
    });

    // 3️⃣ Ergebnisse in Redis speichern (TTL 1 Stunde)
    await redisClient.set(cacheKey, JSON.stringify(results), 'EX', 3600);

    return results;
  }

  // Zusammenfassung nach Traffic-Light System (mit Redis Cache)
  async getTrafficLightSummary(userId: string) {
    const cacheKey = `summary:user:${userId}`;

    // 1️⃣ Prüfen, ob Summary im Cache vorhanden
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // 2️⃣ Wenn nicht, Summary berechnen
    const results = await this.getUserResults(userId);

    const summary = {
      green: results.filter(r => r.trafficLight === 'green').length,
      yellow: results.filter(r => r.trafficLight === 'yellow').length,
      red: results.filter(r => r.trafficLight === 'red').length,
      total: results.length,
      lastCalculation: results.length > 0 ? results[0].createdAt : null,
    };

    // 3️⃣ Summary in Redis speichern (TTL 1 Stunde)
    await redisClient.set(cacheKey, JSON.stringify(summary), 'EX', 3600);

    return summary;
  }
}
