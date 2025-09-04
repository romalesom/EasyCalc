// src/entities/master-data.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('master_data')
export class MasterData {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  salesRevenue!: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  materialCosts!: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  personnelCostsProduction!: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  personnelCostsAdministration!: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  productionHoursCapacity!: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  depreciation: number = 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  roomCosts: number = 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  insuranceFees: number = 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  advertisingAndTravelCosts: number = 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  vehicleCosts: number = 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  businessTaxes: number = 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  costOfGoodsSold: number = 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  leasing: number = 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  itCosts: number = 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  machineCosts: number = 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  repairs: number = 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  interestExpenses: number = 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  otherCosts: number = 0;

  @Column({ type: 'int', nullable: false, default: 0 })
  plannedProfit!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}