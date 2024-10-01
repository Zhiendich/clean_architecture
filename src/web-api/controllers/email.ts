import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../infrastructure/DIContainer.js";
import { logger } from "../../infrastructure/logger/index.js";
import ApiError from "../error/index.js";

export class EmailController {
  private sendActivationEmailUseCase = DIContainer.sendEmailUseCase();
  private activateEmailUseCase = DIContainer.activateEmailUseCase();

  constructor() {
    this.sendActivationEmail = this.sendActivationEmail.bind(this);
    this.activateEmail = this.activateEmail.bind(this);
  }

  async sendActivationEmail(req: Request, res: Response, next: NextFunction) {
    try {
      await this.sendActivationEmailUseCase.execute(
        req.body.activationLink,
        req.body.recipient
      );
      res.status(200).json("Success");
    } catch (error: any) {
      logger.error("Sending email error", error);
      next(ApiError.internal(error.message));
    }
  }
  async activateEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const activation = await this.activateEmailUseCase.execute(
        req.params.activationLink
      );
      res.status(200).json(`Email activation is ${activation}`);
    } catch (error: any) {
      logger.error("Activating email error", error);
      next(ApiError.internal(error.message));
    }
  }
}
