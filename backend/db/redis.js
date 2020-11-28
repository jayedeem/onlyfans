const Redis = require('ioredis');
// const redisClient = new Redis(process.env.REDIS_DB);
const redisClient = new Redis();

module.exports = redisClient;
