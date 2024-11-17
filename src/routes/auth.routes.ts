import { Router } from 'express';
import { AuthController } from '@/controllers/auth.controller';
import { validateRequest } from '@/middleware/validateRequest';
import { registerSchema, loginSchema } from '@/schemas/auth.schema';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/register', validateRequest(registerSchema), authController.register);
authRouter.post('/login', validateRequest(loginSchema), authController.login);

export { authRouter };
