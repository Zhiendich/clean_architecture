import { Request, Response, NextFunction } from "express";
import { logger } from "../../infrastructure/logger/index.js";
import ApiError from "../error/index.js";
import fetch from "node-fetch";

export class CommentController {
  constructor() {
    this.getPosts = this.getPosts.bind(this);
  }

  async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await fetch(
        `https://jsonplaceholder.typicode.com/comments${req.body.queryParams}`
      ).then((response) => response.json());
      res.status(200).json(posts);
    } catch (error: any) {
      logger.error("Sending email error", error);
      next(ApiError.internal(error.message));
    }
  }
}
