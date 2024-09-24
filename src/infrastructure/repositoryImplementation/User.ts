import { Model, ModelStatic } from "sequelize";
import { User } from "../../domain/entities/user.js";
import { UserRepository } from "../../domain/repositories/user/user.js";
import { SequelizeGenericRepository } from "../sequelize/generic.js";
import UserModal from "../sequelize/models/user.js";

export class UserImplementation implements UserRepository {
  constructor(private userSequelizeGeneric: SequelizeGenericRepository<any>) {}
  async get(id: string) {
    const findUser = await this.userSequelizeGeneric.findOne({
      where: { id },
    });
    if (!findUser) {
      throw new Error("Can not find user");
    }
    const { password, ...userWithoutPassword } = findUser.dataValues;
    return userWithoutPassword;
  }
}
