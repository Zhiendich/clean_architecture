import { OTPController } from "../controllers/otp.js";
import { authenticateMiddleware } from "../middleware/auth.js";
import { Router } from "express";

const router = Router();
const otpController = new OTPController();

router.post("/generateOTP", authenticateMiddleware, otpController.generateOTP);
router.post("/verify", authenticateMiddleware, otpController.verifyOTP);
router.post(
  "/generateQRCode",
  authenticateMiddleware,
  otpController.generateQRCode
);
router.post(
  "/toggleTwoFactor",
  authenticateMiddleware,
  otpController.toggleTwoFactorAuth
);
export default router;
