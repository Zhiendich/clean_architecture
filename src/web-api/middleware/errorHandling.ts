import { Request, Response, NextFunction } from "express";
import ApiError from "../error/index.js";
import { logger } from "../../infrastructure/logger/index.js";

export default function ErrorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  logger.error("ErrorHandler", err);
  return res.status(500).json({ message: "Server error!" });
}
