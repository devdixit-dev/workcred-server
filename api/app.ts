import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import handleResponse from './services/handleResponse.service';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import adminRouter from './routes/admin.route';
import loggerQueue from './queues/logger.queue';
import customRateLimiter from './services/rateLimiter.service';

const createServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use(cors({
    origin: "http://localhost:5471",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
  }));

  app.use(async (req: Request, _: Response, next: NextFunction) => {
    let entry = `${Date.now()} - ${req.url} | ${req.method} | ${req.ip} | ${req.headers["user-agent"]}\n`
    await loggerQueue.add(`log:${req.ip}`, { filename: "trace.log", entry });
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

  app.use((err: any, _: Request, res: Response, next: NextFunction) => {
    console.error(`Unhandled error: ${err}`);
    handleResponse(res, 500, "Internal server error");
  });

  app.use((_: Request, res: Response) => {
    handleResponse(res, 404, "Service not found");
  });

  return app;
}

export default createServer;