import { Transaction } from 'sequelize';
import { User } from '../../domain/entities/user.js';
import { UserRepository } from '../../domain/repositories/user/user.js';

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}
  async execute(id: number, data: Partial<User>, transaction: Transaction) {
    return await this.userRepository.update(id, data, transaction);
  }
}
