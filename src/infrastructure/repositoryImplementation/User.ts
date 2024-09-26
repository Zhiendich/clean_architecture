import { User } from "../../domain/entities/user.js";
import { RegistrationUser } from "../../domain/repositories/auth/interfaces/RegistrationUser.js";
import { UserRepository } from "../../domain/repositories/user/user.js";

import { SequelizeGenericRepository } from "../sequelize/generic.js";

export class UserImplementation implements UserRepository {
  constructor(private userSequelizeGeneric: SequelizeGenericRepository<any>) {}
  async get(id: number) {
    const findUser = await this.userSequelizeGeneric.findOne({
      where: { id },
    });
    if (!findUser) {
      throw new Error("Can not find user");
    }
    const { password, ...userWithoutPassword } = findUser;
    return userWithoutPassword;
  }
  async update(id: number, data: Partial<User>): Promise<number[]> {
    const updatedUser = await this.userSequelizeGeneric.update(id, data);
    return updatedUser;
  }
  async getByField(field: keyof User, value: string | number): Promise<User> {
    const user = await this.userSequelizeGeneric.findOne({
      where: {
        [field]: value,
      },
    });
    return user;
  }
  async create(user: RegistrationUser): Promise<User> {
    const newUser = await this.userSequelizeGeneric.create(user);
    return newUser;
  }
  async findAndUpdate(id: number, data: Partial<User>): Promise<User> {
    const updatedUser = await this.userSequelizeGeneric.findAndUpdate(id, data);
    return updatedUser;
  }
}
