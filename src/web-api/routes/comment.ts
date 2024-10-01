import { Router } from "express";
import { parseQueryMiddleware } from "../middleware/parseQuery.js";
import { CommentController } from "../controllers/comment.js";

const router = Router();
const commentController = new CommentController();

router.get("/", parseQueryMiddleware, commentController.getPosts);
export default router;
