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
      console.log("this.model", this.model);
      const newColumn = await this.model.create(data as any);
      console.log("newColumn.dataValues", newColumn.dataValues);
      return newColumn.dataValues;
    } catch (error) {
      throw new Error("Can not create");
    }
  }

  async findById(id: number): Promise<T | null> {
    try {
      const findColumn = await this.model.findByPk(id);
      if (!findColumn) {
        return null;
      }
      return findColumn.dataValues;
    } catch (error) {
      throw new Error("Can not findById");
    }
  }

  async findOne(where: Record<string, any>): Promise<T | null> {
    try {
      const findColumn = await this.model.findOne({ ...where });
      if (!findColumn) {
        return null;
      }
      return findColumn.dataValues;
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
  async findAndUpdate(id: number, updates: Partial<T>): Promise<T | null> {
    try {
      const findColumn = await this.model.findByPk(id);
      if (findColumn) {
        const updatedColumn = await findColumn.update({ ...updates });
        return updatedColumn.dataValues;
      }
      return null;
    } catch (error) {
      throw new Error("Can not update");
    }
  }
}
