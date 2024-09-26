import { OTPRepository } from "../../domain/repositories/auth/otp.js";

export class VerifyOTP {
  constructor(private otpRepository: OTPRepository) {}
  async execute(userId: number, userInputToken: string) {
    return await this.otpRepository.verifyOTP(userId, userInputToken);
  }
}
