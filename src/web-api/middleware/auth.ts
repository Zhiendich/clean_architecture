import { Request, Response, NextFunction } from "express";
import ApiError from "../error/index.js";
import dotenv from "dotenv";
import { DIContainer } from "../../infrastructure/DIContainer.js";

dotenv.config();

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.unauthorize());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.unauthorize());
    }
    const jwtImplementation = DIContainer.getJwtRepository();
    const userData = await jwtImplementation.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.unauthorize());
    }

    req.body.id = userData.id;
    next();
  } catch (error) {
    return next(ApiError.unauthorize());
  }
}
