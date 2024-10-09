import { DatabaseRepository } from '../../domain/repositories/database/database.js';

export class DatabaseContext {
  constructor(readonly database: DatabaseRepository) {}
  async connect() {
    await this.database.authenticate();
  }
  getInstance() {
    return this.database.getInstance();
  }
}
