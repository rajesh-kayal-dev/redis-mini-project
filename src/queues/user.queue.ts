import { Queue } from "bullmq";

export const userQueue = new Queue("userQueue", {
    connection:{
        host: process.env.REDIS_HOST || "redis",
        port: 6379,
    },
})