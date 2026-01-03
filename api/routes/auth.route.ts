import { Router } from 'express';
import { authInit, forgotPassword, resendEmailVerification, resetPassword, signIn, verify } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { companyRegisterSchema } from '../validators/auth.validator';
import customRateLimiter from '../services/rateLimiter.service';
import isAuthenticated from '../middlewares/isAuth.middleware';

const authRouter = Router();

authRouter.post('/init', customRateLimiter(15 * 60 * 1000, 100), validate(companyRegisterSchema), authInit);

authRouter.post('/signin', signIn);

authRouter.post('/verify', verify);

authRouter.post('/resend-verification', resendEmailVerification);

authRouter.get('/is-token', );

authRouter.put('/forgot-password', forgotPassword);

authRouter.post('/reset-password', resetPassword);

export default authRouter;