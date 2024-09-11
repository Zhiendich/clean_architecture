import { AuthRepository } from "../../domain/repositories/auth/auth.js";
import { LoginUser as LoginUserInterface } from "../../domain/repositories/auth/interfaces/LoginUser.js";

export class LoginUser {
  constructor(private authRepository: AuthRepository) {}
  async execute(loginUser: LoginUserInterface) {
    return await this.authRepository.login(loginUser);
  }
}
