import { Router } from "express";
import { AuthController } from "../controllers/auth.js";
import { LoginUserDto } from "../dto/auth/LoginUserDto.js";
import validationMiddleware from "../middleware/validation.js";
import { RegisterUserDto } from "../dto/auth/RegisterUserDto.js";
import { authenticateMiddleware } from "../middleware/auth.js";
import { otpMiddleware } from "../middleware/otpMiddleware.js";

const router = Router();
const authController = new AuthController();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Logs in a user with provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.post("/login", validationMiddleware(LoginUserDto), authController.login);
/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: User registration
 *     description: Registers a new user with provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               name:
 *                 type: string
 *                 description: The user's name.
 *             required:
 *               - email
 *               - password
 *               - name
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.post(
  "/registration",
  validationMiddleware(RegisterUserDto),
  authController.registration
);
router.post(
  "/logout",
  authenticateMiddleware,
  otpMiddleware,
  authController.logout
);
router.get(
  "/refresh",
  authenticateMiddleware,
  otpMiddleware,
  authController.refresh
);
export default router;
