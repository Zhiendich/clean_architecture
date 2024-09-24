import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer.js";
import { LoginUserDto } from "../dto/auth/LoginUserDto.js";
import { RegisterUserDto } from "../dto/auth/RegisterUserDto.js";
import ApiError from "../error/index.js";
import { logger } from "../../infrastructure/logger/index.js";

export class AuthController {
  private loginUser = DIContainer.loginUserUseCase();
  private registerUser = DIContainer.registerUserUseCase();
  private logoutUser = DIContainer.logoutUserUseCase();
  private refreshToken = DIContainer.refreshTokenUseCase();
  private redis = DIContainer.getRedisRepository();

  constructor() {
    this.login = this.login.bind(this);
    this.registration = this.registration.bind(this);
    this.logout = this.logout.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = Object.assign(new LoginUserDto(), req.body);
      const { user, tokens } = await this.loginUser.execute(dto);
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json({ ...tokens, user });
    } catch (error: any) {
      logger.error("login error", error);
      next(ApiError.unauthorize(error.message));
    }
  }
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = Object.assign(new RegisterUserDto(), req.body);
      const newUser = await this.registerUser.execute(dto);
      res.status(200).json(newUser);
    } catch (error: any) {
      logger.error("registration error", error);
      next(ApiError.badRequest(error.message));
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.headers.authorization;
      if (authorizationHeader) {
        const accessToken = authorizationHeader.split(" ")[1];
        await this.redis.deleteCache(accessToken);
      }
      const { refreshToken } = req.cookies;
      await this.logoutUser.execute(refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logout" });
    } catch (error: any) {
      logger.error("logout error", error);
      next(ApiError.internal(error.message));
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.headers.authorization;
      if (authorizationHeader) {
        const accessToken = authorizationHeader.split(" ")[1];
        await this.redis.deleteCache(accessToken);
      }

      const { refreshToken } = req.cookies;
      const { user, tokens } = await this.refreshToken.execute(refreshToken);
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json({ ...tokens, user });
    } catch (error: any) {
      logger.error("refresh error", error);
      next(ApiError.unauthorize(error.message));
    }
  }
}
