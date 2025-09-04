import Redis from 'ioredis';
import { env } from './env';

export const redisClient = new Redis({
  host: env.redis.host,
  port: env.redis.port,
  password: env.redis.password,
  maxRetriesPerRequest: null,
});

redisClient.on('connect', () => {
  console.log('Redis verbunden');
});

redisClient.on('error', (err) => {
  console.error('Redis Fehler:', err);
});