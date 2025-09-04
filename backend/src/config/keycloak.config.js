"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keycloakConfig = void 0;
exports.keycloakConfig = {
    serverUrl: process.env.KEYCLOAK_SERVER || 'http://localhost:8080',
    realm: process.env.KEYCLOAK_REALM || 'my-company-realm',
    clientId: process.env.KEYCLOAK_CLIENT_ID || 'backend-client',
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || 'supersecret',
};
