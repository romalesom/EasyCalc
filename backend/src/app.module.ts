import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MasterDataModule } from './master-data/master-data.module';
import { CalculationsModule } from './calculations/calculations.module';
import { ResultsModule } from './results/results.module';

// Entities
import { User } from './entities/user.entity';
import { MasterData } from './entities/master-data.entity';
import { CalculationInput } from './entities/calculation-input.entity';
import { CalculationResult } from './entities/calculation-result.entity';
import { AuditLog } from './entities/audit-log.entity';

@Module({
  imports: [
    // TypeORM DB-Setup
    TypeOrmModule.forRoot({
      ...databaseConfig,
      entities: [User, MasterData, CalculationInput, CalculationResult, AuditLog],
      synchronize: false,        // ⚠️ Nur für Entwicklung
      autoLoadEntities: true,   // Entities automatisch erkennen
      schema: 'CompanyName',         // explizites Schema
    }),

    // Keycloak / Auth
    AuthModule,

    // Module für die App-Domänen
    UsersModule,
    MasterDataModule,
    CalculationsModule,
    ResultsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
