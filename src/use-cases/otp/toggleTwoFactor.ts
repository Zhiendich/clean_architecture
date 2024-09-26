import { OTPRepository } from "../../domain/repositories/auth/otp.js";

export class ToggleTwoFactorAuthentication {
  constructor(private otpRepository: OTPRepository) {}
  async execute(userId: number, isTwoFactorEnabled: boolean) {
    return await this.otpRepository.toggleTwoFactor(userId, isTwoFactorEnabled);
  }
}
