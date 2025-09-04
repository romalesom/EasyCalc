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
exports.CalculationsController = void 0;
const common_1 = require("@nestjs/common");
const calculations_service_1 = require("./calculations.service");
const roles_guard_1 = require("../auth/roles.guard");
const keycloak_auth_guard_1 = require("../auth/keycloak-auth.guard"); // ✅ Geändert
const roles_decorator_1 = require("../auth/roles.decorator"); // ✅ Geändert
let CalculationsController = class CalculationsController {
    constructor(calculationsService) {
        this.calculationsService = calculationsService;
    }
    // Neue Berechnung erstellen
    async createCalculation(req, body) {
        const userId = req.user.userId; // ✅ Geändert - aus JWT Strategy
        return this.calculationsService.createCalculation(userId, body);
    }
    // Alle Berechnungen des angemeldeten Users
    async getUserCalculations(req) {
        const userId = req.user.userId; // ✅ Geändert - aus JWT Strategy
        return this.calculationsService.getUserCalculations(userId);
    }
};
exports.CalculationsController = CalculationsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('user') // ✅ Vereinfacht - nur String-Array
    ,
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CalculationsController.prototype, "createCalculation", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CalculationsController.prototype, "getUserCalculations", null);
exports.CalculationsController = CalculationsController = __decorate([
    (0, common_1.Controller)('calculations'),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard, roles_guard_1.RolesGuard) // ✅ Geändert
    ,
    __metadata("design:paramtypes", [calculations_service_1.CalculationsService])
], CalculationsController);
