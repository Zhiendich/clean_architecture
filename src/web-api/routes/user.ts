import { authenticateMiddleware } from '../middleware/auth.js';
import { otpMiddleware } from '../middleware/otpMiddleware.js';
import { UserController } from './../controllers/user.js';
import { Router } from 'express';

const router = Router();
const userController = new UserController();

router.get('/', authenticateMiddleware, otpMiddleware, userController.getUser);
router.patch('/', authenticateMiddleware, userController.updateUser);
export default router;
