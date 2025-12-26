import { Router } from 'express';
import {
  authInit, forgotPassword, resetPassword, signIn, verify
} from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/auth-init', authInit);

authRouter.post('/signin', signIn);

authRouter.put('/verify', verify);

authRouter.patch('/forgot-password', forgotPassword);

authRouter.patch('/reset-password', resetPassword);

export default authRouter;