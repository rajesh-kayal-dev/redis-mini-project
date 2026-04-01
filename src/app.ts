import express from "express";
import dotenv from "dotenv";
import userRoutes from './routes/user.routes';


dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;