import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CalculationInput } from './calculation-input.entity';
import { AuditLog } from './audit-log.entity';
import { IsEmail } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  role!: string; // 'admin' | 'user'

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
  
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(() => CalculationInput, (calculationInput) => calculationInput.user)
  calculationInputs!: CalculationInput[];

  @OneToMany(() => AuditLog, (auditLog) => auditLog.user)
  auditLogs!: AuditLog[];
}
