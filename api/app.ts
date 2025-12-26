import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import handleResponse from './services/handleResponse.service';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import adminRouter from './routes/admin.route';
import loggerQueue from './queues/logger.queue';
import customRateLimiter from './services/rateLimiter.service';

const createServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use(async (req: Request, _: Response, next: NextFunction) => {
    let entry = `${Date.now()} - ${req.url} | ${req.method} | ${req.ip} | ${req.headers["user-agent"]}`
    await loggerQueue.add(`log:${req.ip}`, { filename: "trace.log", entry: entry });
    console.log(entry);
    next();
  });

  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/admin', adminRouter);

  app.get('/', customRateLimiter(10 * 60 * 1000, 100), (_, res) => {
    return res.json({
      success: true,
      message: "healthy",
      uptime: process.uptime(),
      worker: process.pid
    });
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`Unhandled error: ${err}`);
    handleResponse(res, 500, "Internal server error");
  });

  app.use((req: Request, res: Response) => {
    handleResponse(res, 404, "Service not found");
  });

  return app;
}

export default createServer;