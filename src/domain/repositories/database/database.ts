import { Sequelize, Transaction } from 'sequelize';

export interface DatabaseRepository {
  authenticate(): Promise<void>;
  getInstance(): Sequelize;
}

export interface GenericRepository<T> {
  create(data: Partial<T>, transaction?: Transaction): Promise<Omit<T, 'id'>>;
  findById(id: number): Promise<T | null>;
  findOne(where: Record<string, string>): Promise<T | null>;
  findAndUpdate(id: number, updates: Partial<T>, transaction?: Transaction): Promise<T | null>;
  update(id: number, updates: Partial<T>, transaction?: Transaction): Promise<number[]>;
  delete(where: Record<string, any>, transaction?: Transaction): Promise<number>;
}
