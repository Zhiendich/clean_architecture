import { AuthRepository } from "../../domain/repositories/auth/auth.js";

export class LogoutUser {
  constructor(private authRepository: AuthRepository) {}
  async execute(refreshToken: string) {
    return await this.authRepository.logout(refreshToken);
  }
}
