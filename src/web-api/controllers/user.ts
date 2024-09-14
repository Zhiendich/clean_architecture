import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer.js";

export class UserController {
  private getUserCase = DIContainer.getUserUseCase();
  constructor() {
    this.getUser = this.getUser.bind(this);
  }
  async getUser(req: Request, res: Response, next: NextFunction) {
    const user = await this.getUserCase.execute(req.body.id);
    res.status(200).json(user);
  }
}
