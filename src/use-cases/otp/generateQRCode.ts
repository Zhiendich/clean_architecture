import { OTPRepository } from "../../domain/repositories/auth/otp.js";

export class GenerateQRCode {
  constructor(private otpRepository: OTPRepository) {}
  async execute(secret: string) {
    return await this.otpRepository.generateQRCode(secret);
  }
}
