"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = require("ioredis");
const env_1 = require("./env");
exports.redisClient = new ioredis_1.default({
    host: env_1.env.redis.host,
    port: env_1.env.redis.port,
    password: env_1.env.redis.password,
    maxRetriesPerRequest: null,
});
exports.redisClient.on('connect', () => {
    console.log('Redis verbunden');
});
exports.redisClient.on('error', (err) => {
    console.error('Redis Fehler:', err);
});
