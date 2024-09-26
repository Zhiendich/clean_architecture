import { Request, Response, NextFunction } from "express";
import ApiError from "../error/index.js";

export async function otpMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req.body;
    if (user.isTwoFactorEnabled && !user.isOtpVerified) {
      return next(ApiError.unauthorize("OTP not verified"));
    }
    next();
  } catch (error) {
    return next(ApiError.unauthorize());
  }
}
