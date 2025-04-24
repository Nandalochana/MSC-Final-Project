const redis = require('redis');

class RedisClient {
    constructor() {
        const redisUrl = process.env.REDIS_CONNECTION_STRING; // Corrected variable name
        if (!redisUrl || (!redisUrl.startsWith('redis://') && !redisUrl.startsWith('rediss://'))) {
            throw new Error('REDIS_CONNECTION_STRING must start with "redis://" or "rediss://".');
        }

        this.client = redis.createClient({
            url: redisUrl,
            password: process.env.REDIS_PASSWORD
        });

        this.client.on('error', (err) => {
            console.error('Redis Client Error', err);
        });

        this.client.connect();
    }

    async set(key, value) {
        await this.client.set(key, JSON.stringify(value));
    }

    async get(key) {
        const data = await this.client.get(key);
        return JSON.parse(data);
    }

    async del(key) {
        await this.client.del(key);
    }
}

module.exports = new RedisClient();
