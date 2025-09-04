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
exports.ResultsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const calculation_result_entity_1 = require("../entities/calculation-result.entity");
const calculation_input_entity_1 = require("../entities/calculation-input.entity");
const redis_config_1 = require("../config/redis.config"); // ✅ Redis import
let ResultsService = class ResultsService {
    constructor(resultRepo, inputRepo) {
        this.resultRepo = resultRepo;
        this.inputRepo = inputRepo;
    }
    // Alle Ergebnisse eines Users abrufen (mit Redis Cache)
    async getUserResults(userId) {
        const cacheKey = `results:user:${userId}`;
        // 1️⃣ Prüfen, ob Ergebnisse im Cache vorhanden
        const cached = await redis_config_1.redisClient.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        // 2️⃣ Wenn nicht im Cache, aus DB abrufen
        const inputs = await this.inputRepo.find({
            where: { userId },
            select: ['id'],
        });
        if (inputs.length === 0)
            return [];
        const inputIds = inputs.map(input => input.id);
        const results = await this.resultRepo.find({
            where: { calculationId: (0, typeorm_2.In)(inputIds) },
            order: { createdAt: 'DESC' },
        });
        // 3️⃣ Ergebnisse in Redis speichern (TTL 1 Stunde)
        await redis_config_1.redisClient.set(cacheKey, JSON.stringify(results), 'EX', 3600);
        return results;
    }
    // Zusammenfassung nach Traffic-Light System (mit Redis Cache)
    async getTrafficLightSummary(userId) {
        const cacheKey = `summary:user:${userId}`;
        // 1️⃣ Prüfen, ob Summary im Cache vorhanden
        const cached = await redis_config_1.redisClient.get(cacheKey);
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
        await redis_config_1.redisClient.set(cacheKey, JSON.stringify(summary), 'EX', 3600);
        return summary;
    }
};
exports.ResultsService = ResultsService;
exports.ResultsService = ResultsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(calculation_result_entity_1.CalculationResult)),
    __param(1, (0, typeorm_1.InjectRepository)(calculation_input_entity_1.CalculationInput)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ResultsService);
