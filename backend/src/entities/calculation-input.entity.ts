import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('calculation_inputs')
export class CalculationInput {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  hoursSpent!: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  materialsConsumed!: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  outsourcedServicesAndEquipment!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  priceEstimate: number = 0;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Column('uuid')
  userId!: string;

  @ManyToOne(() => User, user => user.calculationInputs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;
}
