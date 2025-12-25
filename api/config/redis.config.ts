import 'dotenv/config';
import Redis from "ioredis";

const redisConnection = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null
});

redisConnection.on("connect", () => {
  console.log(`Redis connected`);
});

redisConnection.on("error", (e) => {
  console.error(`Redis connection error: ${e}`);
});

export default redisConnection;