import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { userQueue } from "../queues/user.queue";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/"); 

createBullBoard({
  queues: [new BullMQAdapter(userQueue)],
  serverAdapter,
});

export { serverAdapter };
