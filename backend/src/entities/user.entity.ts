import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CalculationInput } from './calculation-input.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  role!: string; // 'admin' | 'user'

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
  
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(() => CalculationInput, (calculationInput) => calculationInput.user)
  calculationInputs!: CalculationInput[];
}
