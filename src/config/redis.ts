import RedisStore from "connect-redis";
import { createClient } from "redis";

const redisClient = createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

export default redisStore;
