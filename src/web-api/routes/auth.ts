import { Router } from "express";
import { AuthController } from "../controllers/auth.js";
import { LoginUserDto } from "../dto/auth/LoginUserDto.js";
import validationMiddleware from "../middleware/validation.js";
import { RegisterUserDto } from "../dto/auth/RegisterUserDto.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();
const authController = new AuthController();

router.post("/login", validationMiddleware(LoginUserDto), authController.login);
router.post(
  "/registration",
  validationMiddleware(RegisterUserDto),
  authController.registration
);
router.post("/logout", authenticateToken, authController.logout);
router.get("/refresh", authenticateToken, authController.refresh);
export default router;
