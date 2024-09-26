import { authenticateMiddleware } from "../middleware/auth.js";
import { otpMiddleware } from "../middleware/OTPMiddleware.js";
import { UserController } from "./../controllers/user.js";
import { Router } from "express";

const router = Router();
const userController = new UserController();

router.get("/", authenticateMiddleware, otpMiddleware, userController.getUser);
export default router;
