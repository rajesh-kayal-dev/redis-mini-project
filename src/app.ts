import express from "express";
import dotenv from "dotenv";
import { serverAdapter } from "./config/bullBoard"; 
import userRoutes from './routes/user.routes';
import morgan from "morgan";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// routes
app.use('/api', userRoutes);

// bull board
app.use("/admin/queues", serverAdapter.getRouter());

// root
app.get('/', (req, res) => {
    res.send('API is running...');
});

// error handler (always last)
app.use(errorHandler);

export default app;
