import { Router } from "express";
import authRouter from "./authRoutes.js";
import ErrorHandler from "../middleware/errorHandling.js";
const router = Router();

router.use("/auth", authRouter);
router.use(ErrorHandler);

export default router;
