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
exports.ResultsController = void 0;
const common_1 = require("@nestjs/common");
const results_service_1 = require("./results.service");
const roles_guard_1 = require("../auth/roles.guard");
const keycloak_auth_guard_1 = require("../auth/keycloak-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let ResultsController = class ResultsController {
    constructor(resultsService) {
        this.resultsService = resultsService;
    }
    // Alle Ergebnisse des angemeldeten Users
    async getUserResults(req) {
        const userId = req.user.userId;
        return this.resultsService.getUserResults(userId);
    }
    // Traffic-Light-Zusammenfassung
    async getTrafficLightSummary(req) {
        const userId = req.user.userId;
        return this.resultsService.getTrafficLightSummary(userId);
    }
};
exports.ResultsController = ResultsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('user') // ✅ Vereinfacht
    ,
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "getUserResults", null);
__decorate([
    (0, common_1.Get)('summary'),
    (0, roles_decorator_1.Roles)('user') // ✅ Vereinfacht
    ,
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "getTrafficLightSummary", null);
exports.ResultsController = ResultsController = __decorate([
    (0, common_1.Controller)('results'),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [results_service_1.ResultsService])
], ResultsController);
