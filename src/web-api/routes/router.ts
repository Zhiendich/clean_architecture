import { Router } from "express";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import otpRouter from "./otp.js";
import emailRouter from "./email.js";
import commentRouter from "./comment.js";
import ErrorHandler from "../middleware/errorHandling.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/otp", otpRouter);
router.use("/email", emailRouter);
router.use("/comments", commentRouter);
router.use(ErrorHandler);

export default router;
