import { OTPRepository } from "../../domain/repositories/auth/otp.js";
import { authenticator } from "otplib";
import { SequelizeGenericRepository } from "../sequelize/generic.js";
import QRCode from "qrcode";
import { UserRepository } from "../../domain/repositories/user/user.js";
import { User } from "../../domain/entities/user.js";

class OTPImplementation implements OTPRepository {
  constructor(
    private OTPSequlize: SequelizeGenericRepository<any>,
    private userRepository: UserRepository
  ) {}
  async generateOTP(userId: number): Promise<string> {
    const otpToken = authenticator.generateSecret(20);
    const otpauthUrl = authenticator.keyuri(String(userId), "MyApp", otpToken);
    await this.OTPSequlize.create({ otpToken: otpToken, userId });
    const qrCode = await this.generateQRCode(otpauthUrl);
    return qrCode;
  }
  async generateQRCode(otpauthUrl: string): Promise<string> {
    const qrCode = await QRCode.toDataURL(otpauthUrl);
    return qrCode;
  }
  async verifyOTP(
    userId: number,
    token: string
  ): Promise<{ result: boolean; user?: User }> {
    const storedData = await this.OTPSequlize.findOne({ where: { userId } });
    if (!storedData) {
      return { result: false };
    }
    const secret = storedData.otpToken;
    const result = await authenticator.verify({
      token,
      secret,
    });
    if (result) {
      const updatedUser = await this.userRepository.findAndUpdate(userId, {
        isOtpVerified: result,
      });

      return { result, user: updatedUser };
    }
    return { result };
  }
  async deleteOTPToken(userId: number): Promise<number> {
    const id = await this.OTPSequlize.delete({ userId });
    return id;
  }
  async toggleTwoFactor(
    userId: number,
    isTwoFactorEnabled: boolean
  ): Promise<User> {
    const updatedUser = await this.userRepository.findAndUpdate(userId, {
      isTwoFactorEnabled,
      isOtpVerified: false,
    });
    await this.deleteOTPToken(userId);
    return updatedUser;
  }
}

export default OTPImplementation;
