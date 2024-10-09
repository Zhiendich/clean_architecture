import { Request, Response, NextFunction } from 'express';
import { DIContainer } from '../../infrastructure/DIContainer.js';
import ApiError from '../error/index.js';
import { db } from '../../app.js';

export class UserController {
  private getUserCase = DIContainer.getUserUseCase();
  private updateUserCase = DIContainer.updateUserUseCase();
  constructor() {
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  async getUser(req: Request, res: Response, next: NextFunction) {
    const user = await this.getUserCase.execute(req.body.id);
    if (user) {
      return res.status(200).json(user);
    }
    throw ApiError.notFound();
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    // test work of transaction in sequilize
    const user = await db.database.getInstance().transaction(async (t) => {
      // return await this.updateUserCase.execute(req.body.id, '', t);
      return await this.updateUserCase.execute(req.body.id, req.body.newUserData, t);
    });
    if (user) {
      return res.status(200).json(user);
    }
    throw ApiError.notFound();
  }
}
