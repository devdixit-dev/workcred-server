import { Worker } from 'bullmq';
import redisConnection from '../config/redis.config';
import sendEmail from '../services/sendEmail.service';

const worker = new Worker(
  'emailQueue',
  async (job) => {
    console.log(`[worker] - job id: ${job.id} - job name: ${job.name}`);
    await sendEmail(job.data.to, job.data.subject, job.data.text);
    
    console.log(`Email sent successfully to: ${job.data.to}`);
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