import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KeycloakStrategy } from './keycloak.strategy';
import { RolesGuard } from './roles.guard';

@Module({
  providers: [AuthService, KeycloakStrategy, RolesGuard],
  exports: [AuthService, KeycloakStrategy, RolesGuard],
})
export class AuthModule {}
