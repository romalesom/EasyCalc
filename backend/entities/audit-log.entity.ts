import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  entityName!: string;

  @Column()
  entityId!: string;

  @Column({ nullable: true })
  changedBy!: string;

  @Column()
  changeType!: string; // 'INSERT' | 'UPDATE' | 'DELETE'

  @Column('jsonb', { nullable: true })
  oldValue: any;

  @Column('jsonb', { nullable: true })
  newValue: any;

  @CreateDateColumn({ type: 'timestamptz' })
  changedAt!: Date;
}
