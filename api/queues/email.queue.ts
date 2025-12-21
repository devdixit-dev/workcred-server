import { Queue } from 'bullmq';
import redisConnection from '../config/redis.config';

const emailQueue = new Queue('emailQueue', {
  connection: redisConnection
});

export default emailQueue;