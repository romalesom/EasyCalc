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
exports.CalculationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const calculation_input_entity_1 = require("../entities/calculation-input.entity");
const calculation_result_entity_1 = require("../entities/calculation-result.entity");
const master_data_entity_1 = require("../entities/master-data.entity");
let CalculationsService = class CalculationsService {
    constructor(calculationInputRepo, calculationResultRepo, masterDataRepo) {
        this.calculationInputRepo = calculationInputRepo;
        this.calculationResultRepo = calculationResultRepo;
        this.masterDataRepo = masterDataRepo;
    }
    // Neue Berechnung erstellen
    async createCalculation(userId, inputValues) {
        // 1️⃣ Input speichern
        const input = this.calculationInputRepo.create({ userId, inputValues });
        await this.calculationInputRepo.save(input);
        // 2️⃣ Stammdaten abrufen
        const masterData = await this.masterDataRepo.find();
        // 3️⃣ Berechnung durchführen (Beispiel: Summe aller Zahlen)
        const total = Object.values(inputValues).reduce((sum, val) => sum + Number(val || 0), 0);
        // 4️⃣ Traffic-Light-System bestimmen
        let trafficLight = 'green';
        if (total > 1000)
            trafficLight = 'red';
        else if (total > 500)
            trafficLight = 'yellow';
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
    async getUserCalculations(userId) {
        const inputs = await this.calculationInputRepo.find({ where: { userId } });
        const inputIds = inputs.map(i => i.id);
        return this.calculationResultRepo.find({ where: { calculationId: (0, typeorm_2.In)(inputIds) } });
    }
};
exports.CalculationsService = CalculationsService;
exports.CalculationsService = CalculationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(calculation_input_entity_1.CalculationInput)),
    __param(1, (0, typeorm_1.InjectRepository)(calculation_result_entity_1.CalculationResult)),
    __param(2, (0, typeorm_1.InjectRepository)(master_data_entity_1.MasterData)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CalculationsService);
