import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer.js";
import ApiError from "../error/index.js";

export class UserController {
  private getUserCase = DIContainer.getUserUseCase();
  constructor() {
    this.getUser = this.getUser.bind(this);
  }
  async getUser(req: Request, res: Response, next: NextFunction) {
    const user = await this.getUserCase.execute(req.body.id);
    if (user) {
      return res.status(200).json(user);
    }
    throw ApiError.notFound();
  }
}
