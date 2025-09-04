import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('calculation_inputs')
export class CalculationInput {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @Column('jsonb')
  inputValues: any;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
