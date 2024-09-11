import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer.js";
import { LoginUserDto } from "../dto/auth/LoginUserDto.js";
import { RegisterUserDto } from "../dto/auth/RegisterUserDto.js";
import ApiError from "../ApiError.js";

export class AuthController {
  private loginUser = DIContainer.loginUserUseCase();
  private registerUser = DIContainer.registerUserUseCase();

  constructor() {
    this.login = this.login.bind(this);
    this.registration = this.registration.bind(this);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = Object.assign(new LoginUserDto(), req.body);
      const user = await this.loginUser.execute(dto);
      res.status(200).json(user);
    } catch (error) {
      next(ApiError.unauthorize());
    }
  }
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = Object.assign(new RegisterUserDto(), req.body);
      const newUser = await this.registerUser.execute(dto);
      res.status(200).json({ user: newUser });
    } catch (error) {
      next(ApiError.notFound());
    }
  }
  //   async isUserAuth(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const typedReq = req as RequestUser;
  //       const getUser = typedReq.user;
  //       const user = await userService.getUser(getUser.id);
  //       if (user.name === "Error") {
  //         throw new Error();
  //       }
  //       res.status(200).json(user);
  //     } catch (error) {
  //       next(ApiError.forbidden());
  //     }
  //   }
}
