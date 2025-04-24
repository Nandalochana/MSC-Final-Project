const RedisClient = require('../utils/redisClient');

class RedisController {
    async getCacheByKey(req, res) {
        try {
            const { key } = req.params;
            let data;
            if (key === '0' || key == 0) {
                data = await this.getAllCache(); 
                const value = JSON.stringify(data);
                return res.status(200).json({data:value});
            }
            data = await RedisClient.get(key);
            const value = JSON.stringify(data);
            return value
                ? res.status(200).json( {data:value})
                : res.status(404).json({ message: 'Key not found in cache' });
        } catch (error) {
            console.error('Error fetching cache:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    async deleteCacheByKey(req, res) {
        try {
            const { key } = req.params;
            await RedisClient.del(key);
            res.status(200).json({ message: `Cache for key "${key}" deleted` });
        } catch (error) {
            console.error('Error deleting cache:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    async getAllCache() {
        try {
            const keys = await RedisClient.client.keys('*');
            const cacheData = {};
            for (const key of keys) {
                const value = await RedisClient.get(key);
                cacheData[key] = value;
            }
            return cacheData; // Return data instead of sending a response
        } catch (error) {
            console.error('Error fetching all cache:', error);
            throw error; // Throw the error to be handled by the caller
        }
    }
}

module.exports = new RedisController();
