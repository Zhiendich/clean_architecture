import { Request, Response, NextFunction } from "express";
import ApiError from "../error/index.js";
import { DIContainer } from "../../infrastructure/DIContainer.js";

export async function authenticateMiddleware(
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
    req.body.user = userData;
    next();
  } catch (error) {
    return next(ApiError.unauthorize());
  }
}
