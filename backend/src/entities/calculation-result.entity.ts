import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('calculation_results')
export class CalculationResult {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  calculationId!: string;

  @Column('jsonb')
  resultValues: any;

  @Column()
  trafficLight!: string; // 'green' | 'yellow' | 'red'

  @Column({ type: 'numeric', nullable: true })
  score!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
