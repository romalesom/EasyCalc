import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Alle User abrufen
  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  // User nach ID abrufen
  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User mit ID ${id} nicht gefunden`);
    return user;
  }

  // User nach E-Mail abrufen
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new NotFoundException(`User mit Email ${email} nicht gefunden`);
    return user;
  }

  // Optional: User anlegen (für Admins oder automatisiert)
  async create(data: Partial<User>): Promise<User> {
    const newUser = this.userRepo.create(data);
    return this.userRepo.save(newUser);
  }

  // Optional: User aktualisieren
  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, data);
    return this.userRepo.save(user);
  }

  // Optional: User löschen
  async remove(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
}
