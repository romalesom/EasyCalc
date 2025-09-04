"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const calculations_service_1 = require("./calculations.service");
const calculations_controller_1 = require("./calculations.controller");
const calculation_input_entity_1 = require("../entities/calculation-input.entity");
const calculation_result_entity_1 = require("../entities/calculation-result.entity");
const master_data_entity_1 = require("../entities/master-data.entity");
let CalculationsModule = class CalculationsModule {
};
exports.CalculationsModule = CalculationsModule;
exports.CalculationsModule = CalculationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([calculation_input_entity_1.CalculationInput, calculation_result_entity_1.CalculationResult, master_data_entity_1.MasterData]),
        ],
        providers: [calculations_service_1.CalculationsService],
        controllers: [calculations_controller_1.CalculationsController],
    })
], CalculationsModule);
