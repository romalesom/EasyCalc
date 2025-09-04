"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_config_1 = require("./config/database.config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const master_data_module_1 = require("./master-data/master-data.module");
const calculations_module_1 = require("./calculations/calculations.module");
const results_module_1 = require("./results/results.module");
// Entities
const user_entity_1 = require("./entities/user.entity");
const master_data_entity_1 = require("./entities/master-data.entity");
const calculation_input_entity_1 = require("./entities/calculation-input.entity");
const calculation_result_entity_1 = require("./entities/calculation-result.entity");
const audit_log_entity_1 = require("./entities/audit-log.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            // TypeORM DB-Setup
            typeorm_1.TypeOrmModule.forRoot({
                ...database_config_1.databaseConfig,
                entities: [user_entity_1.User, master_data_entity_1.MasterData, calculation_input_entity_1.CalculationInput, calculation_result_entity_1.CalculationResult, audit_log_entity_1.AuditLog],
                synchronize: true, // ⚠️ Nur für Entwicklung
                autoLoadEntities: true, // Entities automatisch erkennen
                schema: 'public', // explizites Schema
            }),
            // Keycloak / Auth
            auth_module_1.AuthModule,
            // Module für die App-Domänen
            users_module_1.UsersModule,
            master_data_module_1.MasterDataModule,
            calculations_module_1.CalculationsModule,
            results_module_1.ResultsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
