import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { CalculationsService } from './calculations.service';
import { RolesGuard } from '../auth/roles.guard';
import { KeycloakAuthGuard } from '../auth/keycloak-auth.guard';  // ✅ Geändert
import { Roles } from '../auth/roles.decorator';                 // ✅ Geändert

@Controller('calculations')
@UseGuards(KeycloakAuthGuard, RolesGuard) // ✅ Geändert
export class CalculationsController {
  constructor(private readonly calculationsService: CalculationsService) {}

  // Neue Berechnung erstellen
  @Post()
  @Roles('user') // ✅ Vereinfacht - nur String-Array
  async createCalculation(@Req() req: any, @Body() body: any) {
    const userId = req.user.userId; // ✅ Geändert - aus JWT Strategy
    return this.calculationsService.createCalculation(userId, body);
  }

  // Alle Berechnungen des angemeldeten Users
  @Get()
  @Roles('user')
  async getUserCalculations(@Req() req: any) {
    const userId = req.user.userId; // ✅ Geändert - aus JWT Strategy
    return this.calculationsService.getUserCalculations(userId);
  }
}
