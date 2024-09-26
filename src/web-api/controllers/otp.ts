import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer.js";
import { logger } from "../../infrastructure/logger/index.js";
import ApiError from "../error/index.js";

export class OTPController {
  private generateOTPCase = DIContainer.generateOTPUseCase();
  private verifyOTPCase = DIContainer.verifyOTPUseCase();
  private generateQRCodeCase = DIContainer.generateQRCodeUseCase();
  private toggleTwoFacorAuthCase = DIContainer.toggleTwoFactorUseCase();
  private redis = DIContainer.getRedisRepository();

  constructor() {
    this.generateOTP = this.generateOTP.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
    this.generateQRCode = this.generateQRCode.bind(this);
    this.toggleTwoFactorAuth = this.toggleTwoFactorAuth.bind(this);
  }

  async generateOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const qrCode = await this.generateOTPCase.execute(req.body.id);
      res.type("image/png");
      res.send(Buffer.from(qrCode.split(",")[1], "base64"));
    } catch (error: any) {
      logger.error("generate OTP error", error);
      next(ApiError.internal(error.message));
    }
  }

  async verifyOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { result, user } = await this.verifyOTPCase.execute(
        req.body.id,
        req.body.token
      );
      if (result === false) {
        next(ApiError.forbidden("Incorect input"));
        return;
      }
      if (user) {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
          const accessToken = authorizationHeader.split(" ")[1];
          await this.redis.setCache(accessToken, user);
        }
      }
      res.status(200).json({ verity: result });
    } catch (error: any) {
      logger.error("verify OTP error", error);
      next(ApiError.internal(error.message));
    }
  }

  async generateQRCode(req: Request, res: Response, next: NextFunction) {
    try {
      const qrCode = await this.generateQRCodeCase.execute(req.body.secret);
      res.type("image/png");
      res.send(Buffer.from(qrCode.split(",")[1], "base64"));
    } catch (error: any) {
      logger.error("validate OTP error", error);
      next(ApiError.internal(error.message));
    }
  }

  async toggleTwoFactorAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await this.toggleTwoFacorAuthCase.execute(
        req.body.id,
        req.body.isTwoFactorEnabled
      );
      const authorizationHeader = req.headers.authorization;
      if (authorizationHeader) {
        const accessToken = authorizationHeader.split(" ")[1];
        await this.redis.setCache(accessToken, updatedUser);
      }
      res
        .status(200)
        .json({ isTwoFactorEnabled: updatedUser.isTwoFactorEnabled });
    } catch (error: any) {
      logger.error("toggle two factor auth error", error);
      next(ApiError.internal(error.message));
    }
  }
}
