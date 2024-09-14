import { authenticateToken } from "../middleware/auth.js";
import { UserController } from "./../controllers/user.js";
import { Router } from "express";

const router = Router();
const userController = new UserController();

router.get("/", authenticateToken, userController.getUser);
export default router;
