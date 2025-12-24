import { Queue } from 'bullmq';
import redisConnection from '../config/redis.config';

const loggerQueue = new Queue('loggerQueue', {
  connection: redisConnection
});

export default loggerQueue;