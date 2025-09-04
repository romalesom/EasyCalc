import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/roles.guard';           // ✅ Geändert
import { KeycloakAuthGuard } from '../auth/keycloak-auth.guard'; // ✅ Geändert
import { Roles } from '../auth/roles.decorator';        // ✅ Geändert

@Controller('users')
@UseGuards(KeycloakAuthGuard, RolesGuard) // ✅ Geändert
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Alle User abrufen (nur Superuser)
  @Get()
  @Roles('superuser') // ✅ Vereinfacht - nur Superuser für User-Management
  async findAll() {
    return this.usersService.findAll();
  }

  // User nach ID abrufen (nur Superuser)
  @Get(':id')
  @Roles('superuser') // ✅ Vereinfacht
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
