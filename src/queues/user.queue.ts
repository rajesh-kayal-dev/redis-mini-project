import { Queue } from "bullmq";

export const userQueue = new Queue("userQueue", {
    
    connection:{
        url: process.env.REDIS_URL,
        port: 6379,
    },
})

