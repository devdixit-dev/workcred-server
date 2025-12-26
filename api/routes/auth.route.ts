import { Router } from 'express';
import { authInit, forgotPassword, resetPassword, signIn, verify } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { companyRegisterSchema } from '../validators/auth.validator';
import customRateLimiter from '../services/rateLimiter.service';

const authRouter = Router();

authRouter.post('/auth-init', customRateLimiter(15 * 60 * 1000, 100), validate(companyRegisterSchema), authInit);

authRouter.post('/signin', signIn);

authRouter.put('/verify', verify);

authRouter.patch('/forgot-password', forgotPassword);

authRouter.patch('/reset-password', resetPassword);

export default authRouter;