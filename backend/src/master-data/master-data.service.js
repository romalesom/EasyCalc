"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const master_data_entity_1 = require("../entities/master-data.entity");
const redis_config_1 = require("../config/redis.config");
let MasterDataService = class MasterDataService {
    constructor(masterDataRepo) {
        this.masterDataRepo = masterDataRepo;
        this.cacheKey = 'master-data:all';
    }
    // Alle Stammdaten abrufen (mit Redis)
    async findAll() {
        // 1️⃣ Prüfen, ob Cache existiert
        const cached = await redis_config_1.redisClient.get(this.cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        // 2️⃣ Wenn nicht, aus DB abrufen
        const data = await this.masterDataRepo.find();
        // 3️⃣ In Redis speichern (TTL 1 Stunde)
        await redis_config_1.redisClient.set(this.cacheKey, JSON.stringify(data), 'EX', 3600);
        return data;
    }
    // Ein MasterData-Item nach ID abrufen
    async findById(id) {
        // Optional: Cache nur für alle Daten, einzelne Items direkt aus DB
        const data = await this.masterDataRepo.findOne({ where: { id } });
        if (!data)
            throw new common_1.NotFoundException(`MasterData mit ID ${id} nicht gefunden`);
        return data;
    }
    // Neues MasterData-Item erstellen
    async create(data) {
        const newData = this.masterDataRepo.create(data);
        const saved = await this.masterDataRepo.save(newData);
        // Cache invalidieren
        await redis_config_1.redisClient.del(this.cacheKey);
        return saved;
    }
    // Bestehendes MasterData-Item aktualisieren
    async update(id, data) {
        const existing = await this.findById(id);
        Object.assign(existing, data);
        const saved = await this.masterDataRepo.save(existing);
        // Cache invalidieren
        await redis_config_1.redisClient.del(this.cacheKey);
        return saved;
    }
    // MasterData löschen
    async remove(id) {
        await this.masterDataRepo.delete(id);
        // Cache invalidieren
        await redis_config_1.redisClient.del(this.cacheKey);
    }
};
exports.MasterDataService = MasterDataService;
exports.MasterDataService = MasterDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(master_data_entity_1.MasterData)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MasterDataService);
