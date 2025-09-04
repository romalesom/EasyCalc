import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ResultsService } from './results.service';
import { RolesGuard } from '../auth/roles.guard';           
import { KeycloakAuthGuard } from '../auth/keycloak-auth.guard'; 
import { Roles } from '../auth/roles.decorator';        

@Controller('results')
@UseGuards(KeycloakAuthGuard, RolesGuard) 
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  // Alle Ergebnisse des angemeldeten Users
  @Get()
  @Roles('user') // ✅ Vereinfacht
  async getUserResults(@Req() req: any) {
    const userId = req.user.userId; 
    return this.resultsService.getUserResults(userId);
  }

  // Traffic-Light-Zusammenfassung
  @Get('summary')
  @Roles('user') // ✅ Vereinfacht
  async getTrafficLightSummary(@Req() req: any) {
    const userId = req.user.userId;
    return this.resultsService.getTrafficLightSummary(userId);
  }
}