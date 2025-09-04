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
exports.MasterDataController = void 0;
const common_1 = require("@nestjs/common");
const master_data_service_1 = require("./master-data.service");
const roles_guard_1 = require("../auth/roles.guard");
const keycloak_auth_guard_1 = require("../auth/keycloak-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let MasterDataController = class MasterDataController {
    constructor(masterDataService) {
        this.masterDataService = masterDataService;
    }
    findAll() {
        return this.masterDataService.findAll();
    }
    findOne(id) {
        return this.masterDataService.findById(id);
    }
    create(body) {
        return this.masterDataService.create(body);
    }
    update(id, body) {
        return this.masterDataService.update(id, body);
    }
    remove(id) {
        return this.masterDataService.remove(id);
    }
};
exports.MasterDataController = MasterDataController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('superuser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MasterDataController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('superuser'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MasterDataController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('superuser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MasterDataController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('superuser'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MasterDataController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('superuser'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MasterDataController.prototype, "remove", null);
exports.MasterDataController = MasterDataController = __decorate([
    (0, common_1.Controller)('master-data'),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [master_data_service_1.MasterDataService])
], MasterDataController);
