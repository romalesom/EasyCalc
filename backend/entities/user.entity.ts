import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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
}
