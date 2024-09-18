import { Request, Response, NextFunction } from "express";
import ApiError from "../error/index.js";

export default function ErrorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  console.log("ErrorHandler", err);
  return res.status(500).json({ message: "Server error!" });
}
