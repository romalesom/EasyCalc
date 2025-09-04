import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateCompanyNameSchemaAndTables1678881234567 implements MigrationInterface {
  private readonly schemaName = 'CompanyName';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Schema erstellen
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${this.schemaName}"`);

    // Tabelle 'users' erstellen
    await queryRunner.createTable(
      new Table({
        name: `${this.schemaName}.users`,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'email', type: 'varchar', isUnique: true, isNullable: false },
          { name: 'role', type: 'varchar', isNullable: false },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );

    // Tabelle 'master_data' erstellen
    await queryRunner.createTable(
      new Table({
        name: `${this.schemaName}.master_data`,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'salesRevenue', type: 'int', default: 0, isNullable: false },
          { name: 'materialCosts', type: 'int', default: 0, isNullable: false },
          { name: 'personnelCostsProduction', type: 'int', default: 0, isNullable: false },
          { name: 'personnelCostsAdministration', type: 'int', default: 0, isNullable: false },
          { name: 'productionHoursCapacity', type: 'int', default: 0, isNullable: false },
          { name: 'depreciation', type: 'int', default: 0, isNullable: true },
          { name: 'roomCosts', type: 'int', default: 0, isNullable: true },
          { name: 'insuranceFees', type: 'int', default: 0, isNullable: true },
          { name: 'advertisingAndTravelCosts', type: 'int', default: 0, isNullable: true },
          { name: 'vehicleCosts', type: 'int', default: 0, isNullable: true },
          { name: 'businessTaxes', type: 'int', default: 0, isNullable: true },
          { name: 'costOfGoodsSold', type: 'int', default: 0, isNullable: true },
          { name: 'leasing', type: 'int', default: 0, isNullable: true },
          { name: 'itCosts', type: 'int', default: 0, isNullable: true },
          { name: 'machineCosts', type: 'int', default: 0, isNullable: true },
          { name: 'repairs', type: 'int', default: 0, isNullable: true },
          { name: 'interestExpenses', type: 'int', default: 0, isNullable: true },
          { name: 'otherCosts', type: 'int', default: 0, isNullable: true },
          { name: 'plannedProfit', type: 'int', default: 0, isNullable: false },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
          { name: 'updatedAt', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );

    // Tabelle 'calculation_inputs' erstellen
    await queryRunner.createTable(
      new Table({
        name: `${this.schemaName}.calculation_inputs`,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'userId', type: 'uuid', isNullable: false },
          { name: 'hoursSpent', type: 'int', default: 0, isNullable: false },
          { name: 'materialsConsumed', type: 'int', default: 0, isNullable: false },
          { name: 'outsourcedServicesAndEquipment', type: 'int', default: 0, isNullable: false },
          { name: 'priceEstimate', type: 'decimal', precision: 10, scale: 2, isNullable: true },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );
    
    // Foreign Key für 'calculation_inputs' erstellen
    await queryRunner.createForeignKey(
      `${this.schemaName}.calculation_inputs`,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: `${this.schemaName}.users`,
        onDelete: 'CASCADE',
      }),
    );
    
    // Tabelle 'audit_log' erstellen
    await queryRunner.createTable(
      new Table({
        name: `${this.schemaName}.audit_log`,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'userId', type: 'uuid', isNullable: false },
          { name: 'action', type: 'varchar', isNullable: false },
          { name: 'details', type: 'jsonb', isNullable: true },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );

    // Foreign Key für 'audit_log' erstellen
    await queryRunner.createForeignKey(
      `${this.schemaName}.audit_log`,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: `${this.schemaName}.users`,
        onDelete: 'CASCADE',
      }),
    );
    
    // Tabelle 'calculation_results' erstellen
    await queryRunner.createTable(
      new Table({
        name: `${this.schemaName}.calculation_results`,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'calculationId', type: 'uuid', isNullable: false },
          { name: 'grossProfit', type: 'decimal', precision: 10, scale: 2, isNullable: true },
          { name: 'netProfit', type: 'decimal', precision: 10, scale: 2, isNullable: true },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );

    // Foreign Key für 'calculation_results' erstellen
    await queryRunner.createForeignKey(
      `${this.schemaName}.calculation_results`,
      new TableForeignKey({
        columnNames: ['calculationId'],
        referencedColumnNames: ['id'],
        referencedTableName: `${this.schemaName}.calculation_inputs`,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Foreign Keys entfernen
    await queryRunner.dropForeignKey(`${this.schemaName}.calculation_results`, new TableForeignKey({
        columnNames: ['calculationId'],
        referencedColumnNames: ['id'],
        referencedTableName: `${this.schemaName}.calculation_inputs`,
    }));
    await queryRunner.dropForeignKey(`${this.schemaName}.audit_log`, new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: `${this.schemaName}.users`,
    }));
    await queryRunner.dropForeignKey(`${this.schemaName}.calculation_inputs`, new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: `${this.schemaName}.users`,
    }));
    
    // Tabellen entfernen
    await queryRunner.dropTable(`${this.schemaName}.calculation_results`);
    await queryRunner.dropTable(`${this.schemaName}.audit_log`);
    await queryRunner.dropTable(`${this.schemaName}.calculation_inputs`);
    await queryRunner.dropTable(`${this.schemaName}.master_data`);
    await queryRunner.dropTable(`${this.schemaName}.users`);
    
    // Schema entfernen
    await queryRunner.query(`DROP SCHEMA IF EXISTS "${this.schemaName}" CASCADE;`);
  }
}
