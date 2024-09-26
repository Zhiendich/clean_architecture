import { User } from "../../entities/user.js";

export interface OTPRepository {
  generateOTP(userId: number): Promise<string>;
  generateQRCode(secret: string): Promise<string>;
  verifyOTP(
    userId: number,
    userInputToken: string
  ): Promise<{ result: boolean; user?: User }>;
  toggleTwoFactor(userId: number, isTwoFactorEnabled: boolean): Promise<User>;
  deleteOTPToken(userId: number): Promise<number>;
}
