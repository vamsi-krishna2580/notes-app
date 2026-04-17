import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";
dotenv.config();

const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(1000, "20 s"),
});

export default rateLimit;