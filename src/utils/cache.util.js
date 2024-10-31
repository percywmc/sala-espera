import redis from 'redis';
import config from './config.js';

const clientRedis = redis.createClient({
    ...config.redis
});

export default clientRedis;