import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { keycloakConfig } from '../config/keycloak.config';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${keycloakConfig.serverUrl}/realms/${keycloakConfig.realm}/protocol/openid_connect/certs`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: keycloakConfig.clientId,
      issuer: `${keycloakConfig.serverUrl}/realms/${keycloakConfig.realm}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.realm_access?.roles || [],
      companyId: payload.company_id, // Falls du custom claims hast
      preferredUsername: payload.preferred_username,
    };
  }
}