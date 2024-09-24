import { ModelStatic } from "sequelize";
import { GenericRepository } from "../../domain/repositories/database/database.js";
import { Model, UpdateOptions, DestroyOptions } from "sequelize";

export class SequelizeGenericRepository<T extends Model<T, Omit<T, "id">>>
  implements GenericRepository<T>
{
  constructor(protected model: ModelStatic<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      return await this.model.create(data as any);
    } catch (error) {
      throw new Error("Can not create");
    }
  }

  async findById(id: number): Promise<T | null> {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      throw new Error("Can not findById");
    }
  }

  async findOne(where: Record<string, any>): Promise<T | null> {
    try {
      return await this.model.findOne(where);
    } catch (error) {
      throw new Error("Can not findOne");
    }
  }

  async update(id: number, updates: Partial<T>): Promise<number[]> {
    try {
      return await this.model.update(updates, {
        where: { id },
      } as UpdateOptions);
    } catch (error) {
      throw new Error("Can not update");
    }
  }

  async delete(where: Record<string, any>): Promise<number> {
    try {
      return await this.model.destroy({
        where,
      } as DestroyOptions);
    } catch (error) {
      throw new Error("Can not delete");
    }
  }
}
