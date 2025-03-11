// const redis = require('redis');

// class RedisClient {
//     constructor() {
//         this.client = redis.createClient({
//             url: process.env.REDIS_URL,
//             password: process.env.REDIS_PASSWORD
//         });

//         this.client.on('error', (err) => {
//             console.error('Redis Client Error', err);
//         });

//         this.client.connect();
//     }

//     async set(key, value) {
//         await this.client.set(key, JSON.stringify(value));
//     }

//     async get(key) {
//         const data = await this.client.get(key);
//         return JSON.parse(data);
//     }

//     async del(key) {
//         await this.client.del(key);
//     }
// }

// module.exports = new RedisClient();
