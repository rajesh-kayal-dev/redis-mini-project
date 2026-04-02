import { Worker } from "bullmq";
console.log("▶️ Worker started..."); 

const worker = new Worker(
  "userQueue",
  async (job) => {
    console.log("🚀 Processing job:", job.name);

    if (job.name === "sendEmail") {
      const { email, name } = job.data;

      console.log(`📧 Sending email to ${name} (${email})`);

      // simulate delay
      await new Promise((res) => setTimeout(res, 2000));

      console.log("✅ Email sent");
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST || "redis",
      port: 6379,
    },
  }
);

export default worker;