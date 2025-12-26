import { Worker } from 'bullmq';
import redisConnection from '../config/redis.config';
import makeLogFile from '../utils/makeLogFile.util';

const worker = new Worker(
  'loggerQueue',
  async (job) => {
    console.log(`[worker] - job id: ${job.id} - job name: ${job.name}`);
    await makeLogFile(job.data.filename, job.data.entry);
    console.log(`${job.data.filename} file logged`);
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