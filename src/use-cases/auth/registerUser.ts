import { RegistrationUser } from "../../domain/repositories/auth/interfaces/RegistrationUser.js";
import { AuthRepository } from "../../domain/repositories/auth/auth.js";
export class RegisterUser {
  constructor(private authRepository: AuthRepository) {}
  async execute(registrUser: RegistrationUser) {
    return await this.authRepository.registration(registrUser);
  }
}
