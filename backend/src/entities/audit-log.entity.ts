import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  entityName!: string;

  @Column()
  entityId!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @Column()
  changeType!: string; // 'INSERT' | 'UPDATE' | 'DELETE'

  @Column('jsonb', { nullable: true })
  oldValue: any;

  @Column('jsonb', { nullable: true })
  newValue: any;

  @CreateDateColumn({ type: 'timestamptz' })
  changedAt!: Date;
  
  @ManyToOne(() => User, user => user.auditLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;
}
