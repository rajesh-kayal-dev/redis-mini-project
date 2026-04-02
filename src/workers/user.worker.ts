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
      url: process.env.REDIS_URL,
      port: 6379,
    },
  }
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed successfully`);
});

worker.on("failed", (job, err) => {
  console.log(`❌ Job ${job?.id} failed after all retries: ${err.message}`);
});

export default worker;