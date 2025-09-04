import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MasterDataService } from './master-data.service';
import { RolesGuard } from '../auth/roles.guard';           
import { KeycloakAuthGuard } from '../auth/keycloak-auth.guard';
import { Roles } from '../auth/roles.decorator';       

@Controller('master-data')
@UseGuards(KeycloakAuthGuard, RolesGuard) 
export class MasterDataController {
  constructor(private readonly masterDataService: MasterDataService) {}

  @Get()
  @Roles('superuser') 
  findAll() {
    return this.masterDataService.findAll();
  }

  @Get(':id')
  @Roles('superuser') 
  findOne(@Param('id') id: string) {
    return this.masterDataService.findById(id);
  }

  @Post()
  @Roles('superuser') 
  create(@Body() body: any) {
    return this.masterDataService.create(body);
  }

  @Put(':id')
  @Roles('superuser') 
  update(@Param('id') id: string, @Body() body: any) {
    return this.masterDataService.update(id, body);
  }

  @Delete(':id')
  @Roles('superuser') 
  remove(@Param('id') id: string) {
    return this.masterDataService.remove(id);
  }
}