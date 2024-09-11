import { AuthRepository } from "../../domain/repositories/auth/auth.js";
import { LoginUser } from "../../domain/repositories/auth/interfaces/LoginUser.js";
import { RegistrationUser } from "../../domain/repositories/auth/interfaces/RegistrationUser.js";

export class AuthImplementation implements AuthRepository {
  async login(dto: LoginUser) {
    const user = { ...dto, name: "Test", id: 1 };
    return user;
  }
  async registration(dto: RegistrationUser) {
    try {
      // const test = await UserModal.create(dto);
    } catch (error) {
      console.log("error", error);
    }
    return "Create";
  }
}
