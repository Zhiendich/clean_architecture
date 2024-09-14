import { AuthRepository } from "../../domain/repositories/auth/auth.js";

export class RefreshToken {
  constructor(private authRepository: AuthRepository) {}
  async execute(refreshToken: string) {
    return await this.authRepository.refresh(refreshToken);
  }
}
