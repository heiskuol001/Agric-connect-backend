import { createClient } from 'redis'

const redisClient = createClient({
    url: process.env.REDIS_URL,
})

redisClient.on("connect", () => {
    console.log("Redis client connected");
})

redisClient.on("error", (err) => {
    console.log("Redis client error:", err);
})

await redisClient.connect();

await redisClient.set('test_key', 'Hello, Redis!');
const value = await redisClient.get('test_key')
console.log("Retrieved value:", value);

export default redisClient;