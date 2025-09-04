import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterData } from '../entities/master-data.entity';
import { redisClient } from '../config/redis.config';

@Injectable()
export class MasterDataService {
  constructor(
    @InjectRepository(MasterData)
    private readonly masterDataRepo: Repository<MasterData>,
  ) {}

  private cacheKey = 'master-data:all';

  // Alle Stammdaten abrufen (mit Redis)
  async findAll(): Promise<MasterData[]> {
    // 1️⃣ Prüfen, ob Cache existiert
    const cached = await redisClient.get(this.cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // 2️⃣ Wenn nicht, aus DB abrufen
    const data = await this.masterDataRepo.find();

    // 3️⃣ In Redis speichern (TTL 1 Stunde)
    await redisClient.set(this.cacheKey, JSON.stringify(data), 'EX', 3600);

    return data;
  }

  // Ein MasterData-Item nach ID abrufen
  async findById(id: string): Promise<MasterData> {
    // Optional: Cache nur für alle Daten, einzelne Items direkt aus DB
    const data = await this.masterDataRepo.findOne({ where: { id } });
    if (!data) throw new NotFoundException(`MasterData mit ID ${id} nicht gefunden`);
    return data;
  }

  // Neues MasterData-Item erstellen
  async create(data: Partial<MasterData>): Promise<MasterData> {
    const newData = this.masterDataRepo.create(data);
    const saved = await this.masterDataRepo.save(newData);

    // Cache invalidieren
    await redisClient.del(this.cacheKey);

    return saved;
  }

  // Bestehendes MasterData-Item aktualisieren
  async update(id: string, data: Partial<MasterData>): Promise<MasterData> {
    const existing = await this.findById(id);
    Object.assign(existing, data);
    const saved = await this.masterDataRepo.save(existing);

    // Cache invalidieren
    await redisClient.del(this.cacheKey);

    return saved;
  }

  // MasterData löschen
  async remove(id: string): Promise<void> {
    await this.masterDataRepo.delete(id);

    // Cache invalidieren
    await redisClient.del(this.cacheKey);
  }
}
