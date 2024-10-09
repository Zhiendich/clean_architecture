import { Transaction } from 'sequelize';
import { User } from '../../entities/user.js';
import { RegistrationUser } from '../auth/interfaces/RegistrationUser.js';

export interface UserRepository {
  get(id: number): Promise<User>;
  getByField(field: keyof User, value: string | number): Promise<User>;
  update(id: number, data: Partial<User>, transaction?: Transaction): Promise<number[]>;
  findAndUpdate(id: number, data: Partial<User>, transaction?: Transaction): Promise<User>;
  create(user: RegistrationUser, transaction?: Transaction): Promise<User>;
}
