import { OTPRepository } from "../../domain/repositories/auth/otp.js";

export class GenerateOTP {
  constructor(private otpRepository: OTPRepository) {}
  async execute(userId: number) {
    return await this.otpRepository.generateOTP(userId);
  }
}
