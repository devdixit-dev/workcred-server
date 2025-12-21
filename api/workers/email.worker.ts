import { Worker } from 'bullmq';
import redisConnection from '../config/redis.config';

const worker = new Worker(
  'emailQueue',
  async (job) => {
    console.log(`[worker] - job id: ${job.id} - job name: ${job.name}`);
    setTimeout(() => {}, 3000);
    console.log(`Simulation of Email sent successfully`);
  },
  {
    connection: redisConnection,
    concurrency: 1
  }
);

worker.on("completed", (job) => {
  console.log(`[worker: ${job.id}] completed`);
});

worker.on("failed", (job, error) => {
  console.error(`[worker: ${job?.id}] failed, ${error.message}`);
});

worker.on("error", (error) => {
  console.error(`[worker] error: ${error}`);
});