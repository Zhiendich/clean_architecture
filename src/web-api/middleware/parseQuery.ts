import { Request, Response, NextFunction } from "express";
import ApiError from "../error/index.js";

export async function parseQueryMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const queryString = new URLSearchParams(
      req.query as Record<string, string>
    ).toString();
    req.body.queryParams = "?" + queryString;
    next();
  } catch (error) {
    return next(ApiError.badRequest());
  }
}
