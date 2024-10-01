import { EmailController } from "../controllers/email.js";

import { authenticateMiddleware } from "../middleware/auth.js";
import { Router } from "express";

const router = Router();
const emailController = new EmailController();

router.post(
  "/sendEmail",
  authenticateMiddleware,
  emailController.sendActivationEmail
);
router.get("/activateEmail/:activationLink", emailController.activateEmail);
export default router;
