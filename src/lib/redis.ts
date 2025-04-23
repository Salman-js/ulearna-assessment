// lib/redis.ts
import { createClient, RedisClientType } from 'redis';
import * as Sentry from '@sentry/nextjs';

let redisInstance: RedisClientType | null = null;

export async function getRedis(): Promise<RedisClientType> {
  if (!redisInstance) {
    redisInstance = createClient({
      url: process.env.REDIS_URL,
    });

    redisInstance.on('error', (err) => {
      console.error('Redis connection error:', err);
      Sentry.captureException(err);
    });

    await redisInstance.connect();
    console.log('Redis connected');
  }

  return redisInstance;
}

// Optional: Graceful shutdown (for non-serverless environments)
export async function disconnectRedis() {
  if (redisInstance) {
    await redisInstance.disconnect();
    redisInstance = null;
    console.log('Redis disconnected');
  }
}
