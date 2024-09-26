import { AuthRepository } from "../../domain/repositories/auth/auth.js";

export class LogoutUser {
  constructor(private authRepository: AuthRepository) {}
  async execute(userId: number, refreshToken: string) {
    return await this.authRepository.logout(userId, refreshToken);
  }
}
