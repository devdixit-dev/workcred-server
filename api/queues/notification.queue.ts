import { Queue } from 'bullmq';
import redisConnection from '../config/redis.config';

const notificationQueue = new Queue('notificationQueue', {
  connection: redisConnection
});

export default notificationQueue;