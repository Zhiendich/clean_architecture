import { UserRepository } from "../../domain/repositories/user/user.js";
import UserModal from "../postgresql/models/User.js";

export class UserImplementation implements UserRepository {
  async get(id: string) {
    const findUser = await UserModal.findOne({
      where: { id },
    });
    if (!findUser) {
      throw new Error("Can not find user");
    }
    const { password, ...userWithoutPassword } = findUser.dataValues;
    return userWithoutPassword;
  }
}
