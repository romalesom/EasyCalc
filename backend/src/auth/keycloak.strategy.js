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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const jwks_rsa_1 = require("jwks-rsa");
const keycloak_config_1 = require("../config/keycloak.config");
let KeycloakStrategy = class KeycloakStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor() {
        super({
            secretOrKeyProvider: (0, jwks_rsa_1.passportJwtSecret)({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${keycloak_config_1.keycloakConfig.serverUrl}/realms/${keycloak_config_1.keycloakConfig.realm}/protocol/openid_connect/certs`,
            }),
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: keycloak_config_1.keycloakConfig.clientId,
            issuer: `${keycloak_config_1.keycloakConfig.serverUrl}/realms/${keycloak_config_1.keycloakConfig.realm}`,
            algorithms: ['RS256'],
        });
    }
    async validate(payload) {
        return {
            userId: payload.sub,
            email: payload.email,
            roles: payload.realm_access?.roles || [],
            companyId: payload.company_id, // Falls du custom claims hast
            preferredUsername: payload.preferred_username,
        };
    }
};
exports.KeycloakStrategy = KeycloakStrategy;
exports.KeycloakStrategy = KeycloakStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KeycloakStrategy);
